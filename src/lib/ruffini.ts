import type { Localized } from '../content/types';

/**
 * Ruffini's rule (synthetic division) for polynomials in x.
 * Polynomials are arrays of coefficients from the highest power down to the constant,
 * so x³ − 13x − 12 is [1, 0, −13, −12].
 */

export interface RuffiniProblem {
  id: string;
  level: 1 | 2 | 3;
  /** The polynomial, as typed: "x^3 - 13x - 12". Read as P(x) = 0. */
  poly: string;
  title: Localized;
  hint: Localized;
  context?: Localized;
}

export type RuffiniErrorCode = 'empty' | 'equation' | 'syntax' | 'degree' | 'noX';

export class RuffiniError extends Error {
  constructor(public code: RuffiniErrorCode, message: string) { super(message); }
}

const EPS = 1e-9;
const SUPERSCRIPTS: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
export const MAX_DEGREE = 8;

/** Reads "2x^3 - 3x² + x - 6 = 0" (also "P(x) = …", "y = …") into coefficients. */
export function parsePoly(source: string): number[] {
  let s = source
    .replace(/[−–]/g, '-')
    .replace(/·|×/g, '*')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => SUPERSCRIPTS[c]).join(''))
    .replace(/\s+/g, '')
    .toLowerCase();
  s = s.replace(/^(?:[a-z]\(x\)|y)=/, '');
  const eq = s.split('=');
  if (eq.length > 2) throw new RuffiniError('equation', 'Use at most one "=".');
  if (eq.length === 2) {
    if (!/^[+-]?0(?:\.0*)?$/.test(eq[1])) throw new RuffiniError('equation', 'Write the equation as P(x) = 0.');
    s = eq[0];
  }
  if (!s) throw new RuffiniError('empty', 'Type a polynomial in x, such as x^3 - 13x - 12.');

  const coef: number[] = [];
  let pos = 0;
  let first = true;
  while (pos < s.length) {
    let sign = 1;
    if (s[pos] === '+' || s[pos] === '-') { if (s[pos] === '-') sign = -1; pos++; }
    else if (!first) throw new RuffiniError('syntax', `Unexpected "${s[pos]}".`);
    first = false;
    const num = /^(\d+(?:\.\d+)?|\.\d+)(?:\/(\d+(?:\.\d+)?))?/.exec(s.slice(pos));
    let value = 1;
    if (num) {
      value = Number(num[1]) / (num[2] ? Number(num[2]) : 1);
      if (!Number.isFinite(value)) throw new RuffiniError('syntax', 'Division by zero in a coefficient.');
      pos += num[0].length;
      if (s[pos] === '*') pos++;
    }
    let exp = 0;
    if (s[pos] === 'x') {
      pos++;
      exp = 1;
      const pow = /^\^(\d+)/.exec(s.slice(pos));
      if (pow) { exp = Number(pow[1]); pos += pow[0].length; }
    } else if (!num) {
      throw new RuffiniError('syntax', pos < s.length ? `Unexpected "${s[pos]}".` : 'The expression ends too early.');
    }
    if (exp > MAX_DEGREE) throw new RuffiniError('degree', `Keep the degree at ${MAX_DEGREE} or less.`);
    coef[exp] = (coef[exp] ?? 0) + sign * value;
  }
  const out: number[] = [];
  for (let e = coef.length - 1; e >= 0; e--) out.push(clean(coef[e] ?? 0));
  while (out.length > 1 && Math.abs(out[0]) < EPS) out.shift();
  if (out.length < 2) throw new RuffiniError('noX', 'The polynomial needs an x term.');
  return out;
}

/** Rounds away floating-point noise so that 0.1 + 0.2 shows as 0.3. */
function clean(v: number): number {
  const r = Math.round(v * 1e9) / 1e9;
  return Object.is(r, -0) ? 0 : r;
}

/** P(r) by Horner's rule (which is exactly what the bottom row of Ruffini's table computes). */
export function evaluatePoly(coeffs: number[], x: number): number {
  return clean(coeffs.reduce((acc, c) => acc * x + c, 0));
}

export interface SyntheticResult {
  /** Middle row: products[i] = bottom[i − 1] · r; products[0] is empty. */
  products: (number | null)[];
  /** Bottom row: the quotient's coefficients followed by the remainder. */
  bottom: number[];
  quotient: number[];
  remainder: number;
}

/** Divides by (x − r) with Ruffini's rule. */
export function synthetic(coeffs: number[], r: number): SyntheticResult {
  const products: (number | null)[] = [null];
  const bottom: number[] = [coeffs[0]];
  for (let i = 1; i < coeffs.length; i++) {
    const p = clean(bottom[i - 1] * r);
    products.push(p);
    bottom.push(clean(coeffs[i] + p));
  }
  return { products, bottom, quotient: bottom.slice(0, -1), remainder: bottom[bottom.length - 1] };
}

function divisors(n: number): number[] {
  const out: number[] = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) { out.push(d); if (d * d !== n) out.push(n / d); }
  }
  return out.sort((a, b) => a - b);
}

/**
 * Rational root candidates ±p/q, with p dividing the constant term and q dividing the leading
 * coefficient. Includes 0 when the constant term is 0. Empty when a coefficient is not an integer
 * or the numbers are too large to list.
 */
export function rationalCandidates(coeffs: number[]): number[] {
  if (coeffs.some((c) => !Number.isInteger(c))) return [];
  const c = [...coeffs];
  let hasZero = false;
  while (c.length > 1 && c[c.length - 1] === 0) { c.pop(); hasZero = true; }
  const lead = Math.abs(c[0]);
  const constant = Math.abs(c[c.length - 1]);
  if (lead > 1e6 || constant > 1e6) return [];
  const set = new Map<string, number>();
  if (hasZero) set.set('0', 0);
  if (c.length > 1) {
    for (const p of divisors(constant)) {
      for (const q of divisors(lead)) {
        const v = p / q;
        set.set(String(v), v);
        set.set(String(-v), -v);
      }
    }
  }
  return [...set.values()].sort((a, b) => Math.abs(a) - Math.abs(b) || b - a);
}

/** Real roots of a polynomial of degree 1 or 2; empty when Δ < 0. */
export function smallRoots(coeffs: number[]): number[] {
  if (coeffs.length === 2) return [clean(-coeffs[1] / coeffs[0])];
  if (coeffs.length !== 3) return [];
  const [a, b, c] = coeffs;
  const d = clean(b * b - 4 * a * c);
  if (d < 0) return [];
  if (d === 0) return [clean(-b / (2 * a))];
  const s = Math.sqrt(d);
  return [clean((-b - s) / (2 * a)), clean((-b + s) / (2 * a))].sort((x, y) => x - y);
}

export interface Factorization {
  /** Rational roots found with Ruffini's rule, in the order they were divided out (with repeats). */
  ruffiniRoots: number[];
  /** What is left after dividing them out. */
  rest: number[];
  /** Every distinct real root, sorted, when the rest has degree 2 or less; otherwise only the rational ones. */
  realRoots: number[];
  /** True when every real root is known (the rest has degree 2 or less). */
  complete: boolean;
}

/** Divides out rational roots one by one until a quadratic (or a polynomial with no rational roots) is left. */
export function factorize(coeffs: number[]): Factorization {
  let rest = [...coeffs];
  const ruffiniRoots: number[] = [];
  while (rest.length > 3) {
    const r = rationalCandidates(rest).find((v) => Math.abs(evaluatePoly(rest, v)) < 1e-7);
    if (r === undefined) break;
    ruffiniRoots.push(r);
    rest = synthetic(rest, r).quotient;
  }
  const complete = rest.length <= 3;
  const all = [...ruffiniRoots, ...(complete ? smallRoots(rest) : [])];
  const realRoots: number[] = [];
  for (const v of all.sort((a, b) => a - b)) if (!realRoots.some((w) => Math.abs(w - v) < 1e-7)) realRoots.push(v);
  return { ruffiniRoots, rest, realRoots, complete };
}

/** Reads one number typed by a learner: "−3", "1/2", "-0.5", "3/-2". Null when it is not a number. */
export function parseNumber(text: string): number | null {
  const s = text.replace(/[−–]/g, '-').replace(/,/g, '.').replace(/\s+/g, '');
  const m = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:\/([+-]?(?:\d+(?:\.\d*)?|\.\d+)))?$/.exec(s);
  if (!m) return null;
  const v = Number(m[1]) / (m[2] !== undefined ? Number(m[2]) : 1);
  return Number.isFinite(v) ? v : null;
}

/** Reads a list of roots: "−2, 1/2, 3" or "x = 1; x = -2". Returns null if any item is not a number. */
export function parseRootList(text: string): number[] | null {
  // Commas separate roots here, so decimals use a point (or a fraction).
  const parts = text
    .replace(/x\s*=/gi, '')
    .replace(/([+\-−–])\s+/g, '$1')
    .replace(/\s*\/\s*/g, '/')
    .split(/[;,\s]+/)
    .filter(Boolean);
  if (!parts.length) return null;
  const out: number[] = [];
  for (const p of parts) {
    const v = parseNumber(p);
    if (v === null) return null;
    out.push(v);
  }
  return out;
}

/** Compares two root sets, ignoring order and repeats. Decimals within 0.005 count as equal. */
export function sameRoots(given: number[], expected: number[]): boolean {
  const near = (a: number, b: number) => Math.abs(a - b) < 0.005 + 1e-9;
  const uniq = (xs: number[]) => xs.filter((v, i) => xs.findIndex((w) => near(w, v)) === i);
  const g = uniq(given);
  const e = uniq(expected);
  return g.length === e.length && e.every((v) => g.some((w) => near(w, v)));
}

const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

/** A number as a short fraction or decimal, with a real minus sign: −3, 1/2, −2.5. */
export function fmt(v: number): string {
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  for (let q = 1; q <= 24; q++) {
    const p = Math.round(a * q);
    if (Math.abs(p / q - a) < 1e-9 * Math.max(1, a)) {
      let g = p; let h = q;
      while (h) [g, h] = [h, g % h];
      return q / g === 1 ? `${sign}${p / g}` : `${sign}${p / g}/${q / g}`;
    }
  }
  return `${sign}${Number(a.toFixed(4))}`;
}

/** Pretty polynomial: x³ − 13x − 12. */
export function formatPoly(coeffs: number[]): string {
  const deg = coeffs.length - 1;
  const terms: string[] = [];
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const e = deg - i;
    const a = Math.abs(c);
    const num = e > 0 && a === 1 ? '' : fmt(a);
    const needsParens = e > 0 && num.includes('/');
    const body = (needsParens ? `(${num})` : num) + (e === 0 ? '' : e === 1 ? 'x' : `x${[...String(e)].map((d) => SUP[Number(d)]).join('')}`);
    terms.push(terms.length === 0 ? (c < 0 ? `−${body}` : body) : `${c < 0 ? '−' : '+'} ${body}`);
  });
  return terms.length ? terms.join(' ') : '0';
}

/** The factor (x − r): (x + 2), (x − 1/2), x. */
export function formatFactor(r: number): string {
  if (r === 0) return 'x';
  return r < 0 ? `(x + ${fmt(-r)})` : `(x − ${fmt(r)})`;
}

/** P(x) written as a product: 2(x − 3)(x + 2)(x − 1/2), keeping any part with no real roots. */
export function formatFactored(f: Factorization): string {
  const rest = f.rest;
  const smalls = f.complete ? smallRoots(rest) : [];
  const roots = [...f.ruffiniRoots];
  let tail = '';
  let lead = rest[0];
  if (f.complete && rest.length === 3 && smalls.length === 0) {
    lead = 1;
    tail = `(${formatPoly(rest)})`;
  } else if (f.complete) {
    if (rest.length === 3 && smalls.length === 1) roots.push(smalls[0], smalls[0]);
    else roots.push(...smalls);
  } else {
    lead = 1;
    tail = `(${formatPoly(rest)})`;
  }
  // Group repeated factors as powers.
  const groups: { r: number; n: number }[] = [];
  for (const r of roots) {
    const g = groups.find((x) => Math.abs(x.r - r) < 1e-7);
    if (g) g.n++;
    else groups.push({ r, n: 1 });
  }
  const factors = groups.map(({ r, n }) => formatFactor(r) + (n > 1 ? SUP[n] ?? `^${n}` : '')).join('');
  const leadText = lead === 1 ? '' : lead === -1 ? '−' : fmt(lead);
  return `${leadText}${factors}${tail}` || formatPoly(f.rest);
}
