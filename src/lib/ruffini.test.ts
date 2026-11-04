import { describe, expect, it } from 'vitest';
import {
  evaluatePoly, factorize, fmt, formatFactored, formatPoly, parseNumber, parsePoly, parseRootList,
  rationalCandidates, RuffiniError, sameRoots, smallRoots, synthetic,
} from './ruffini';
import { ruffiniProblems } from '../content/calc1-week1/ruffiniProblems';

describe('parsePoly', () => {
  it('reads coefficients from the highest power down, filling missing powers with 0', () => {
    expect(parsePoly('x^3 - 13x - 12')).toEqual([1, 0, -13, -12]);
    expect(parsePoly('2x³ − 3x² − 11x + 6 = 0')).toEqual([2, -3, -11, 6]);
    expect(parsePoly('P(x) = -x^2 + 4')).toEqual([-1, 0, 4]);
    expect(parsePoly('x^4 - 13x^2 + 36')).toEqual([1, 0, -13, 0, 36]);
    expect(parsePoly('0.5x^2 + 1/2x')).toEqual([0.5, 0.5, 0]);
  });
  it('collects repeated powers and drops a zero leading term', () => {
    expect(parsePoly('x^2 + 2x + 3x - x^2 + x^3')).toEqual([1, 0, 5, 0]);
  });
  it('rejects input that is not a polynomial equation', () => {
    expect(() => parsePoly('')).toThrow(RuffiniError);
    expect(() => parsePoly('7')).toThrow(RuffiniError);
    expect(() => parsePoly('x^2 = 4')).toThrow(RuffiniError);
    expect(() => parsePoly('x^2 + y')).toThrow(RuffiniError);
    expect(() => parsePoly('x^12 + 1')).toThrow(RuffiniError);
  });
});

describe('synthetic division', () => {
  it('builds the middle and bottom rows of the table', () => {
    const r = synthetic([1, -4, 1, 6], -1);
    expect(r.products).toEqual([null, -1, 5, -6]);
    expect(r.bottom).toEqual([1, -5, 6, 0]);
    expect(r.quotient).toEqual([1, -5, 6]);
    expect(r.remainder).toBe(0);
  });
  it('gives P(r) as the remainder when r is not a root (remainder theorem)', () => {
    const p = [1, 0, -13, -12];
    expect(synthetic(p, 2).remainder).toBe(evaluatePoly(p, 2));
    expect(synthetic(p, 2).remainder).toBe(-30);
  });
  it('works with a fractional root', () => {
    expect(synthetic([2, 3, -2], 0.5)).toMatchObject({ quotient: [2, 4], remainder: 0 });
  });
});

describe('rational candidates', () => {
  it('lists ±p/q', () => {
    expect(rationalCandidates([1, 0, -13, -12])).toEqual([1, -1, 2, -2, 3, -3, 4, -4, 6, -6, 12, -12]);
    expect(rationalCandidates([2, -3, -11, 6])).toEqual(expect.arrayContaining([0.5, -0.5, 1.5, -1.5, 3, -6]));
  });
  it('adds 0 when the constant term is 0, and gives up on non-integers', () => {
    expect(rationalCandidates([1, -1, 0])).toContain(0);
    expect(rationalCandidates([0.5, 1, 2])).toEqual([]);
  });
});

describe('factorize', () => {
  it('finds every real root of a cubic with integer roots', () => {
    const f = factorize([1, 2, -5, -6]);
    expect(f.complete).toBe(true);
    expect(f.realRoots).toEqual([-3, -1, 2]);
    expect(formatFactored(f)).toBe('(x + 1)(x + 3)(x − 2)');
  });
  it('keeps the leading coefficient and fractional roots', () => {
    const f = factorize([2, -3, -11, 6]);
    expect(f.realRoots).toEqual([-2, 0.5, 3]);
    expect(formatFactored(f)).toMatch(/^2/);
  });
  it('groups a repeated root', () => {
    const f = factorize([1, -3, 0, 4]);
    expect(f.realRoots).toEqual([-1, 2]);
    expect(formatFactored(f)).toBe('(x + 1)(x − 2)²');
  });
  it('leaves a quadratic with no real roots as a factor', () => {
    const f = factorize([1, 1, 1, -3]);
    expect(f.realRoots).toEqual([1]);
    expect(formatFactored(f)).toBe('(x − 1)(x² + 2x + 3)');
  });
  it('stops when no rational root is left', () => {
    const f = factorize([1, 0, 0, -2]);
    expect(f.complete).toBe(false);
    expect(f.realRoots).toEqual([]);
  });
  it('solves quadratics and lines directly', () => {
    expect(smallRoots([1, -5, 6])).toEqual([2, 3]);
    expect(smallRoots([1, 0, 1])).toEqual([]);
    expect(smallRoots([2, -1])).toEqual([0.5]);
  });
});

describe('reading answers', () => {
  it('reads single numbers and lists', () => {
    expect(parseNumber('−3')).toBe(-3);
    expect(parseNumber('1/2')).toBe(0.5);
    expect(parseNumber('abc')).toBeNull();
    expect(parseRootList('x = -2, x = 1/2; 3')).toEqual([-2, 0.5, 3]);
    expect(parseRootList('- 1  4 -3')).toEqual([-1, 4, -3]);
    expect(parseRootList('two')).toBeNull();
  });
  it('compares root sets without order or repeats', () => {
    expect(sameRoots([3, -1, -1, 2], [-1, 2, 3])).toBe(true);
    expect(sameRoots([0.414], [Math.SQRT2 - 1])).toBe(true);
    expect(sameRoots([1, 2], [1, 2, 3])).toBe(false);
  });
  it('formats numbers and polynomials with real minus signs', () => {
    expect(fmt(-1.5)).toBe('−3/2');
    expect(formatPoly([1, 0, -13, -12])).toBe('x³ − 13x − 12');
    expect(formatPoly([-1, 0.5, 0])).toBe('−x² + (1/2)x');
  });
});

describe('Ruffini Lab problems', () => {
  it('parse, factor completely, and have unique ids', () => {
    expect(new Set(ruffiniProblems.map((p) => p.id)).size).toBe(ruffiniProblems.length);
    for (const p of ruffiniProblems) {
      const f = factorize(parsePoly(p.poly));
      expect(f.complete, p.id).toBe(true);
      expect(f.realRoots.length, p.id).toBeGreaterThan(0);
      expect(parsePoly(p.poly).length, p.id).toBeGreaterThanOrEqual(4);
    }
  });
});
