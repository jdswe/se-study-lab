import type { Localized } from '../content/types';
import { evaluate, holds, parseExpression, parseSystem, type Ineq, type Node } from './inequality';

/** A ready-made view for the Graph Lab. */
export interface GraphPreset {
  id: string;
  title: Localized;
  note: Localized;
  /** Expressions as typed by a learner: "y = x^2 - 1", "y >= 2x + 1", "12x + 7y <= 84". */
  items: string[];
  /** Coefficients for the parabola explorer, when the preset uses it. */
  parabola?: { a: number; b: number; c: number };
  /** Colour the x-axis where the parabola is positive or negative. */
  showSign?: boolean;
  view?: { xmin: number; xmax: number; ymin: number; ymax: number };
}

/**
 * One line of the Graph Lab:
 * - curve: y = f(x), drawn as a line;
 * - region: an inequality in x and y, shaded where it holds. When it has the
 *   form y ≤ f(x) (or similar), f is its boundary, solid or dashed.
 */
export type GraphItem =
  | { kind: 'curve'; f: Node }
  | { kind: 'region'; system: Ineq[]; boundary?: Node; strict: boolean };

/** Read one line typed in the Graph Lab. Throws InequalityError when it cannot. */
export function parseGraphItem(src: string): GraphItem {
  const text = src.trim().replace(/≤/g, '<=').replace(/≥/g, '>=');
  // "y = …", "f(x) = …", or a bare expression in x: a curve.
  const eq = /^(?:y|f\s*\(\s*x\s*\))\s*=\s*([^<>=]+)$/i.exec(text);
  if (eq) return { kind: 'curve', f: parseExpression(eq[1]) };
  if (!/[<>]/.test(text)) return { kind: 'curve', f: parseExpression(text) };
  const system = parseSystem(text, true);
  // A boundary exists when one side is exactly y and the other has no y.
  let boundary: Node | undefined;
  let strict = false;
  if (system.length === 1) {
    const q = system[0];
    const usesY = (n: Node): boolean => n.k === 'y' || ('a' in n && usesY(n.a)) || ('b' in n && usesY((n as { b: Node }).b));
    if (q.lhs.k === 'y' && !usesY(q.rhs)) boundary = q.rhs;
    else if (q.rhs.k === 'y' && !usesY(q.lhs)) boundary = q.lhs;
    strict = q.rel === '<' || q.rel === '>';
  }
  return { kind: 'region', system, boundary, strict };
}

/** Whether a point is inside a region item. */
export function inRegion(item: Extract<GraphItem, { kind: 'region' }>, x: number, y: number): boolean {
  return item.system.every((q) => holds(q, x, y));
}

export function valueAt(f: Node, x: number): number {
  return evaluate(f, x);
}

/** Everything the parabola explorer shows for y = ax² + bx + c. */
export interface ParabolaFacts {
  opensUp: boolean;
  vertex: { x: number; y: number };
  discriminant: number;
  roots: number[];
  yIntercept: number;
}

export function parabolaFacts(a: number, b: number, c: number): ParabolaFacts | null {
  if (a === 0) return null;
  const d = b * b - 4 * a * c;
  const h = -b / (2 * a);
  const roots = d > 1e-12 ? [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((p, q) => p - q) : Math.abs(d) <= 1e-12 ? [h] : [];
  return { opensUp: a > 0, vertex: { x: h, y: -d / (4 * a) }, discriminant: d, roots, yIntercept: c };
}

/** A tick step of 1, 2, or 5 × 10ⁿ that gives roughly `target` ticks across `span`. */
export function niceStep(span: number, target = 8): number {
  const raw = span / target;
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

/** Short number for labels: 2.5, −0.33, 47. */
export function short(v: number): string {
  if (!Number.isFinite(v)) return '—';
  const r = Math.round(v * 100) / 100;
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−');
}
