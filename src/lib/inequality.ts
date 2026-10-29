import type { Localized } from '../content/types';

/** A practice problem for the Inequality Lab. */
export interface InequalityProblem {
  id: string;
  title: Localized;
  /** The inequality in x, e.g. "x^2 - 5x + 6 <= 0". Several separated by ";" form a system. */
  inequality: string;
  hint: Localized;
  /** A short word problem shown above the inequality. */
  context?: Localized;
  /** Factors of (left − right), one sign-chart row each, e.g. ["x - 2", "x - 3"]. */
  factors?: string[];
  level: 1 | 2 | 3;
}

/* ------------------------------------------------------------------ */
/* Expressions                                                         */
/* ------------------------------------------------------------------ */

export type Node =
  | { k: 'num'; v: number }
  | { k: 'x' }
  | { k: 'neg'; a: Node }
  | { k: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: Node; b: Node }
  | { k: 'abs'; a: Node }
  | { k: 'sqrt'; a: Node };

export type Rel = '<' | '<=' | '>' | '>=';

export interface Ineq {
  lhs: Node;
  rel: Rel;
  rhs: Node;
}

/** Parse errors carry a code the UI translates. */
export class InequalityError extends Error {
  constructor(public code: 'empty' | 'relation' | 'syntax' | 'paren') {
    super(code);
  }
}

type Tok = { t: 'num'; v: number } | { t: 'x' } | { t: 'fn'; v: 'abs' | 'sqrt' } | { t: 'op'; v: string };

function normalize(src: string): string {
  return src
    .replace(/[−–]/g, '-')
    .replace(/[·×⋅]/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁴/g, '^4')
    .replace(/≤|=</g, '<=')
    .replace(/≥|=>/g, '>=')
    .replace(/√/g, 'sqrt')
    .replace(/,(?=\d)/g, '.');
}

function tokenize(src: string): Tok[] {
  const s = normalize(src);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (num) { out.push({ t: 'num', v: Number(num[1]) }); i += num[1].length; continue; }
    const word = /^[a-z]+/i.exec(s.slice(i));
    if (word) {
      const w = word[0].toLowerCase();
      if (w === 'x') out.push({ t: 'x' });
      else if (w === 'abs' || w === 'sqrt') out.push({ t: 'fn', v: w });
      else throw new InequalityError('syntax');
      i += w.length;
      continue;
    }
    const two = s.slice(i, i + 2);
    if (two === '<=' || two === '>=') { out.push({ t: 'op', v: two }); i += 2; continue; }
    if ('+-*/^()|<>;'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
    throw new InequalityError('syntax');
  }
  return out;
}

/** Recursive-descent parser with implicit multiplication (2x, 3(x+1), x(x-1)). */
class Parser {
  private i = 0;
  private absDepth = 0;
  constructor(private toks: Tok[]) {}

  peek(): Tok | undefined { return this.toks[this.i]; }
  isOp(v: string) { const p = this.peek(); return p?.t === 'op' && p.v === v; }
  done() { return this.i >= this.toks.length; }

  expr(): Node {
    let n = this.term();
    while (this.isOp('+') || this.isOp('-')) {
      const op = (this.toks[this.i++] as { v: '+' | '-' }).v;
      n = { k: 'bin', op, a: n, b: this.term() };
    }
    return n;
  }

  private startsAtom(): boolean {
    const p = this.peek();
    if (!p) return false;
    if (p.t === 'x' || p.t === 'fn') return true;
    if (p.t === 'op' && p.v === '(') return true;
    return p.t === 'op' && p.v === '|' && this.absDepth === 0;
  }

  term(): Node {
    let n = this.unary();
    for (;;) {
      if (this.isOp('*') || this.isOp('/')) {
        const op = (this.toks[this.i++] as { v: '*' | '/' }).v;
        n = { k: 'bin', op, a: n, b: this.unary() };
      } else if (this.startsAtom()) {
        n = { k: 'bin', op: '*', a: n, b: this.power() };
      } else return n;
    }
  }

  unary(): Node {
    if (this.isOp('-')) {
      this.i++;
      // "-2x" reads as (−2)·x, but "-2^2" stays −(2²).
      const p = this.peek();
      const q = this.toks[this.i + 1];
      if (p?.t === 'num' && !(q?.t === 'op' && q.v === '^')) { this.i++; return { k: 'num', v: -p.v }; }
      return { k: 'neg', a: this.unary() };
    }
    if (this.isOp('+')) { this.i++; return this.unary(); }
    return this.power();
  }

  power(): Node {
    const base = this.atom();
    if (this.isOp('^')) { this.i++; return { k: 'bin', op: '^', a: base, b: this.unary() }; }
    return base;
  }

  atom(): Node {
    const p = this.toks[this.i++];
    if (!p) throw new InequalityError('syntax');
    if (p.t === 'num') return { k: 'num', v: p.v };
    if (p.t === 'x') return { k: 'x' };
    if (p.t === 'fn') {
      const a = this.isOp('(') ? this.atom() : this.power();
      return { k: p.v, a };
    }
    if (p.v === '(') {
      const n = this.expr();
      if (!this.isOp(')')) throw new InequalityError('paren');
      this.i++;
      return n;
    }
    if (p.v === '|') {
      this.absDepth++;
      const n = this.expr();
      this.absDepth--;
      if (!this.isOp('|')) throw new InequalityError('paren');
      this.i++;
      return { k: 'abs', a: n };
    }
    throw new InequalityError('syntax');
  }
}

export function parseExpression(src: string): Node {
  const toks = tokenize(src);
  if (!toks.length) throw new InequalityError('empty');
  const p = new Parser(toks);
  const n = p.expr();
  if (!p.done()) throw new InequalityError('syntax');
  return n;
}

/**
 * Parse one inequality, a chain such as "-1 < 2x + 3 <= 5", or a system
 * separated by ";". Returns the inequalities that must all hold.
 */
export function parseSystem(src: string): Ineq[] {
  const parts = normalize(src).split(/;|\n/).map((s) => s.trim()).filter(Boolean);
  if (!parts.length) throw new InequalityError('empty');
  const out: Ineq[] = [];
  for (const part of parts) {
    const pieces = part.split(/(<=|>=|<|>)/).map((s) => s.trim());
    if (pieces.length < 3 || pieces.length % 2 === 0) throw new InequalityError('relation');
    const exprs = pieces.filter((_, i) => i % 2 === 0).map(parseExpression);
    const rels = pieces.filter((_, i) => i % 2 === 1) as Rel[];
    rels.forEach((rel, i) => out.push({ lhs: exprs[i], rel, rhs: exprs[i + 1] }));
  }
  return out;
}

export function evaluate(n: Node, x: number): number {
  switch (n.k) {
    case 'num': return n.v;
    case 'x': return x;
    case 'neg': return -evaluate(n.a, x);
    case 'abs': return Math.abs(evaluate(n.a, x));
    case 'sqrt': { const v = evaluate(n.a, x); return v < 0 ? NaN : Math.sqrt(v); }
    case 'bin': {
      const a = evaluate(n.a, x);
      const b = evaluate(n.b, x);
      if (n.op === '+') return a + b;
      if (n.op === '-') return a - b;
      if (n.op === '*') return a * b;
      if (n.op === '/') return b === 0 ? NaN : a / b;
      return Math.pow(a, b);
    }
  }
}

function nearZero(d: number, scale: number): boolean {
  return Math.abs(d) <= 1e-9 * Math.max(1, scale);
}

/** Whether x satisfies one inequality. Undefined values never satisfy it. */
export function holds(q: Ineq, x: number): boolean {
  const l = evaluate(q.lhs, x);
  const r = evaluate(q.rhs, x);
  if (!Number.isFinite(l) || !Number.isFinite(r)) return false;
  const d = l - r;
  const zero = nearZero(d, Math.max(Math.abs(l), Math.abs(r)));
  if (q.rel === '<') return !zero && d < 0;
  if (q.rel === '>') return !zero && d > 0;
  if (q.rel === '<=') return zero || d < 0;
  return zero || d > 0;
}

/** Sign of left − right at x: -1, 0, 1, or null when undefined. */
export function signAt(q: Ineq, x: number): -1 | 0 | 1 | null {
  const l = evaluate(q.lhs, x);
  const r = evaluate(q.rhs, x);
  if (!Number.isFinite(l) || !Number.isFinite(r)) return null;
  const d = l - r;
  if (nearZero(d, Math.max(Math.abs(l), Math.abs(r)))) return 0;
  return d < 0 ? -1 : 1;
}

/* ------------------------------------------------------------------ */
/* Critical points and solution sets                                   */
/* ------------------------------------------------------------------ */

const RANGE = 120;
const STEPS = 240; // grid of 1/240 hits integers, halves, thirds, quarters... exactly

/** Snap to a simple fraction when the number is one, so 0.4999999999 becomes 1/2. */
function snap(c: number): number {
  for (let q = 1; q <= 60; q++) {
    const p = Math.round(c * q);
    if (Math.abs(p / q - c) < 1e-9 * Math.max(1, Math.abs(c))) return p / q;
  }
  return c;
}

function bisect(f: (x: number) => boolean, a: number, b: number): number {
  // f(a) !== f(b); find the switch point.
  const fa = f(a);
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2;
    if (f(m) === fa) a = m; else b = m;
  }
  return (a + b) / 2;
}

/** Points where left − right is zero, undefined, or changes sign. */
export function criticalPoints(q: Ineq): number[] {
  const n = 2 * RANGE * STEPS;
  const xs = new Float64Array(n + 1);
  const ss = new Int8Array(n + 1); // -1, 0, 1, or 2 for undefined
  for (let k = 0; k <= n; k++) {
    const x = (k - RANGE * STEPS) / STEPS;
    xs[k] = x;
    const s = signAt(q, x);
    ss[k] = s === null ? 2 : s;
  }
  const pts: number[] = [];
  const defined = (x: number) => signAt(q, x) !== null;
  const positive = (x: number) => (signAt(q, x) ?? 0) > 0;
  for (let k = 1; k < n; k++) {
    const s = ss[k];
    const prev = ss[k - 1];
    const next = ss[k + 1];
    // Undefined at a single grid point (a hole such as x = 4 in 1/(x − 4)).
    if (s === 2) { if (prev !== 2 && next !== 2) pts.push(xs[k]); continue; }
    // Zero: keep isolated roots and the ends of runs, not every point of a run.
    if (s === 0) { if (prev !== 0 || next !== 0) pts.push(xs[k]); continue; }
    if (prev === 2) continue; // handled when the undefined run ended
    if (prev !== 0 && prev !== s) pts.push(snap(bisect(positive, xs[k - 1], xs[k])));
    if (next === 2) pts.push(snap(bisect(defined, xs[k], xs[k + 1])));
  }
  // An undefined run that ends between grid points: find where values start.
  for (let k = 1; k < n; k++) {
    if (ss[k] === 2 && ss[k + 1] !== 2 && ss[k + 1] !== 0) pts.push(snap(bisect(defined, xs[k], xs[k + 1])));
  }
  return uniq(pts);
}

function uniq(pts: number[]): number[] {
  const sorted = [...pts].sort((a, b) => a - b);
  return sorted.filter((p, i) => i === 0 || Math.abs(p - sorted[i - 1]) > 1e-7);
}

export interface Piece {
  lo: number;
  hi: number;
  loIn: boolean;
  hiIn: boolean;
}

export interface Solution {
  system: Ineq[];
  points: number[];
  pieces: Piece[];
}

/** Every x that satisfies all the inequalities, as a union of intervals. */
export function solveSystem(system: Ineq[]): Solution {
  const points = uniq(system.flatMap(criticalPoints));
  const ok = (x: number) => system.every((q) => holds(q, x));
  return { system, points, pieces: piecesFrom(points, ok) };
}

export function solve(src: string): Solution {
  return solveSystem(parseSystem(src));
}

/** Test one point inside each gap and each critical point, then merge neighbours. */
function piecesFrom(points: number[], ok: (x: number) => boolean): Piece[] {
  const items: { lo: number; hi: number; in: boolean; point: boolean }[] = [];
  if (!points.length) return ok(0) ? [{ lo: -Infinity, hi: Infinity, loIn: false, hiIn: false }] : [];
  const bounds = [-Infinity, ...points, Infinity];
  for (let i = 0; i < bounds.length - 1; i++) {
    const a = bounds[i];
    const b = bounds[i + 1];
    const mid = a === -Infinity ? b - 1 : b === Infinity ? a + 1 : (a + b) / 2;
    items.push({ lo: a, hi: b, in: ok(mid), point: false });
    if (b !== Infinity) items.push({ lo: b, hi: b, in: ok(b), point: true });
  }
  const pieces: Piece[] = [];
  let cur: Piece | null = null;
  for (const it of items) {
    if (!it.in) { if (cur) { pieces.push(cur); cur = null; } continue; }
    if (!cur) cur = { lo: it.lo, hi: it.hi, loIn: it.point, hiIn: it.point };
    else { cur.hi = it.hi; cur.hiIn = it.point; }
  }
  if (cur) pieces.push(cur);
  return pieces;
}

export function contains(pieces: Piece[], x: number): boolean {
  return pieces.some((p) => (x > p.lo || (p.loIn && x === p.lo)) && (x < p.hi || (p.hiIn && x === p.hi)));
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : Math.abs(a); }

/** 2.5 → "5/2", 1.4142… → "√2", ∞ → "∞". */
export function formatNumber(c: number): string {
  if (c === Infinity) return '∞';
  if (c === -Infinity) return '−∞';
  const sign = c < 0 ? '−' : '';
  const a = Math.abs(c);
  for (let q = 1; q <= 60; q++) {
    const p = Math.round(a * q);
    if (Math.abs(p / q - a) < 1e-9 * Math.max(1, a)) {
      const g = gcd(p, q);
      return q / g === 1 ? `${sign}${p / g}` : `${sign}${p / g}/${q / g}`;
    }
  }
  const sq = Math.round(a * a);
  if (Math.abs(a * a - sq) < 1e-7) return `${sign}√${sq}`;
  return `${sign}${Number(a.toFixed(3))}`;
}

export function formatPieces(pieces: Piece[]): string {
  if (!pieces.length) return '∅';
  if (pieces.length === 1 && pieces[0].lo === -Infinity && pieces[0].hi === Infinity) return 'ℝ';
  return pieces
    .map((p) => p.lo === p.hi
      ? `{${formatNumber(p.lo)}}`
      : `${p.loIn ? '[' : '('}${formatNumber(p.lo)}, ${formatNumber(p.hi)}${p.hiIn ? ']' : ')'}`)
    .join(' ∪ ');
}

const PREC: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, neg: 3, '^': 4 };
const SUP: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };

function precOf(n: Node): number {
  if (n.k === 'bin') return PREC[n.op];
  if (n.k === 'neg') return PREC.neg;
  if (n.k === 'num' && n.v < 0) return PREC.neg;
  return 5;
}

/** Print an expression the way it is written on paper: 3(x + 1), x², |2x − 5|. */
export function printNode(n: Node): string {
  const wrap = (c: Node, min: number) => (precOf(c) < min ? `(${printNode(c)})` : printNode(c));
  switch (n.k) {
    case 'num': return n.v < 0 ? `−${-n.v}` : String(n.v);
    case 'x': return 'x';
    case 'abs': return `|${printNode(n.a)}|`;
    case 'sqrt': return n.a.k === 'num' || n.a.k === 'x' ? `√${printNode(n.a)}` : `√(${printNode(n.a)})`;
    case 'neg': return `−${wrap(n.a, PREC.neg)}`;
    case 'bin': {
      const { op, a, b } = n;
      if (op === '+') {
        if (b.k === 'neg') return `${printNode(a)} − ${wrap(b.a, 2)}`;
        if (b.k === 'num' && b.v < 0) return `${printNode(a)} − ${-b.v}`;
        return `${printNode(a)} + ${wrap(b, 1)}`;
      }
      if (op === '-') return `${printNode(a)} − ${wrap(b, 2)}`;
      if (op === '^') {
        const exp = b.k === 'num' && Number.isInteger(b.v) && b.v >= 0 && b.v < 10 ? SUP[b.v] : `^(${printNode(b)})`;
        return `${wrap(a, 5)}${exp}`;
      }
      if (op === '/') return `${wrap(a, 3)}/${wrap(b, 3)}`;
      // Multiplication is written by juxtaposition: 2x, 3(x + 1), (x + 1)(x − 2).
      const juxtapose = b.k !== 'num' && b.k !== 'neg' && !(a.k === 'x' && b.k === 'x');
      const left = a.k === 'bin' && a.op === '/' ? `(${printNode(a)})` : wrap(a, 2);
      return juxtapose ? `${left}${wrap(b, 4)}` : `${left}·${wrap(b, 3)}`;
    }
  }
}

const REL_SIGN: Record<Rel, string> = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
export const relSign = (r: Rel) => REL_SIGN[r];

export function printIneq(q: Ineq): string {
  return `${printNode(q.lhs)} ${REL_SIGN[q.rel]} ${printNode(q.rhs)}`;
}

/** Pretty-print the source of a problem, keeping chains together. */
export function prettySource(src: string): string[] {
  return normalize(src).split(/;|\n/).map((s) => s.trim()).filter(Boolean).map((part) => {
    const pieces = part.split(/(<=|>=|<|>)/).map((s) => s.trim());
    return pieces.map((p, i) => (i % 2 ? REL_SIGN[p as Rel] : printNode(parseExpression(p)))).join(' ');
  });
}

/* ------------------------------------------------------------------ */
/* Learner answers                                                     */
/* ------------------------------------------------------------------ */

const ALL = /^(r|ℝ|reals?|all reals?|all real numbers|todos los (números )?reales|todos os (números )?reais|\(-∞,\+?∞\))$/;
const NONE = /^(∅|\{\}|empty|empty set|no solution|vacío|vacio|conjunto vacío|sin solución|sin solucion|vazio|conjunto vazio|sem solução|sem solucao)$/;

function value(src: string): number {
  const s = src.trim();
  if (/^\+?∞$/.test(s)) return Infinity;
  if (/^-∞$/.test(s)) return -Infinity;
  const v = evaluate(parseExpression(s), 0);
  if (!Number.isFinite(v)) throw new InequalityError('syntax');
  return v;
}

/**
 * Read an answer written as intervals ("(-∞, -3] ∪ [7, ∞)", "{2}", "ℝ", "∅")
 * or as inequalities in x ("x <= -3 or x >= 7", "-1/2 < x < 11/2").
 * Returns null when it cannot be read.
 */
export function parseAnswer(src: string): Piece[] | null {
  const s = src.trim().toLowerCase()
    .replace(/[−–]/g, '-')
    .replace(/\binfinity\b|\binf\b|\boo\b/g, '∞')
    .replace(/\s+/g, ' ')
    .replace(/^x\s*(∈|in|=)\s*/, '')
    .replace(/(?:sqrt|√)\(\s*([\d.]+)\s*\)/g, '√$1');
  if (!s) return null;
  const compact = s.replace(/\s/g, '');
  if (ALL.test(s) || ALL.test(compact)) return [{ lo: -Infinity, hi: Infinity, loIn: false, hiIn: false }];
  if (NONE.test(s)) return [];
  try {
    if (s.includes('x')) {
      const parts = s.split(/\bor\b|\bou\b|\bo\b|∨|∪/).map((p) => p.trim()).filter(Boolean);
      return normalizePieces(parts.flatMap((p) => solve(p).pieces));
    }
    // ℝ \ {a, b}
    const minus = /^(?:r|ℝ)\s*[\\-]\s*\{(.+)\}$/.exec(s);
    if (minus) {
      const holes = uniq(minus[1].split(/[,;]/).map(value));
      return piecesFrom(holes, (x) => !holes.some((h) => Math.abs(h - x) < 1e-12));
    }
    const re = /([[(])\s*([^,;\])]+?)\s*[,;]\s*([^,;\])]+?)\s*([\])])|\{([^}]*)\}/g;
    const pieces: Piece[] = [];
    let rest = s;
    for (const m of s.matchAll(re)) {
      rest = rest.replace(m[0], ' ');
      if (m[5] !== undefined) {
        for (const v of m[5].split(/[,;]/).filter((t) => t.trim())) { const x = value(v); pieces.push({ lo: x, hi: x, loIn: true, hiIn: true }); }
        continue;
      }
      const lo = value(m[2]);
      const hi = value(m[3]);
      if (!(lo < hi)) return null;
      pieces.push({ lo, hi, loIn: m[1] === '[' && lo !== -Infinity, hiIn: m[4] === ']' && hi !== Infinity });
    }
    if (rest.replace(/∪|\bu\b|\bor\b|\bo\b|\bou\b|,|;/g, '').trim()) return null;
    if (!pieces.length) return null;
    return normalizePieces(pieces);
  } catch {
    return null;
  }
}

/** Sort and merge overlapping or touching pieces. */
export function normalizePieces(pieces: Piece[]): Piece[] {
  const sorted = [...pieces].sort((a, b) => a.lo - b.lo || Number(b.loIn) - Number(a.loIn));
  const out: Piece[] = [];
  for (const p of sorted) {
    const last = out[out.length - 1];
    if (last && (p.lo < last.hi || (p.lo === last.hi && (last.hiIn || p.loIn)))) {
      if (p.hi > last.hi || (p.hi === last.hi && p.hiIn)) { last.hi = p.hi; last.hiIn = p.hiIn || (p.hi === last.hi && last.hiIn); }
    } else out.push({ ...p });
  }
  return out;
}

function close(a: number, b: number) {
  return a === b || Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(a));
}

/** Membership that treats endpoints within rounding error as the endpoint. */
function member(pieces: Piece[], x: number): boolean {
  return pieces.some((p) => {
    if (close(x, p.lo)) return p.loIn;
    if (close(x, p.hi)) return p.hiIn;
    return x > p.lo && x < p.hi;
  });
}

export function samePieces(a: Piece[], b: Piece[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((p, i) => {
    const q = b[i];
    return close(p.lo, q.lo) && close(p.hi, q.hi) && p.loIn === q.loIn && p.hiIn === q.hiIn;
  });
}

/** A simple number between a and b, preferring integers, then halves. */
function niceBetween(a: number, b: number): number {
  if (a === -Infinity) return Math.floor(b) - 1;
  if (b === Infinity) return Math.ceil(a) + 1;
  for (const step of [1, 0.5, 0.25, 0.1]) {
    const mid = (a + b) / 2;
    const c = Math.round(mid / step) * step;
    if (c > a && c < b) return c;
    const c2 = Math.ceil((a + 1e-12) / step) * step;
    if (c2 > a && c2 < b) return c2;
  }
  return (a + b) / 2;
}

/**
 * Compare a learner's answer with the true solution. When they differ, give
 * one value that shows the difference.
 */
export function compareAnswer(answer: Piece[], truth: Piece[]): { ok: true } | { ok: false; x: number; inAnswer: boolean } {
  // One probe inside every gap between endpoints, plus each endpoint itself:
  // if all agree, the two sets are equal.
  const ends = uniq([...answer, ...truth].flatMap((p) => [p.lo, p.hi]).filter(Number.isFinite));
  const gaps = [-Infinity, ...ends, Infinity];
  const probes = [...gaps.slice(0, -1).map((a, i) => niceBetween(a, gaps[i + 1])), ...ends];
  for (const x of probes) {
    const inA = member(answer, x);
    if (inA !== member(truth, x)) return { ok: false, x, inAnswer: inA };
  }
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Sign chart                                                          */
/* ------------------------------------------------------------------ */

export interface SignChart {
  /** Alternating columns: an open interval (with a test value), then a critical point. */
  columns: { kind: 'gap' | 'point'; x: number; label: string }[];
  rows: { label: string; signs: (-1 | 0 | 1 | null)[] }[];
  holds: boolean[];
}

/** Sign chart of one inequality: its factors (when given) and left − right. */
export function signChart(q: Ineq, points: number[], factors: string[] = []): SignChart {
  const columns: SignChart['columns'] = [];
  const bounds = [-Infinity, ...points, Infinity];
  for (let i = 0; i < bounds.length - 1; i++) {
    const a = bounds[i];
    const b = bounds[i + 1];
    const test = niceBetween(a, b);
    columns.push({ kind: 'gap', x: test, label: `${a === -Infinity ? '(−∞' : `(${formatNumber(a)}`}, ${b === Infinity ? '∞)' : `${formatNumber(b)})`}` });
    if (b !== Infinity) columns.push({ kind: 'point', x: b, label: formatNumber(b) });
  }
  const zero: Node = { k: 'num', v: 0 };
  const rows = factors.map((f) => {
    const node = parseExpression(f);
    const fq: Ineq = { lhs: node, rel: '>', rhs: zero };
    return { label: printNode(node), signs: columns.map((c) => signAt(fq, c.x)) };
  });
  const isZero = q.rhs.k === 'num' && q.rhs.v === 0;
  const diff: Node = isZero ? q.lhs : { k: 'bin', op: '-', a: q.lhs, b: q.rhs };
  rows.push({ label: printNode(diff), signs: columns.map((c) => signAt({ lhs: diff, rel: '>', rhs: zero }, c.x)) });
  return { columns, rows, holds: columns.map((c) => holds(q, c.x)) };
}
