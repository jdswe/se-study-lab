import { describe, expect, it } from 'vitest';
import { compareAnswer, formatNumber, formatPieces, parseAnswer, prettySource, signChart, solve, parseSystem } from './inequality';
import { inequalityProblems } from '../content/calc1-week1/inequalityProblems';

const sol = (src: string) => formatPieces(solve(src).pieces);

describe('solving inequalities', () => {
  it.each([
    ['2x + 3 >= -5', '[−4, ∞)'],
    ['3(x + 1) - 2 <= 5(x - 1) - 3(2x - 1)', '(−∞, −3/4]'],
    ['5 + 0.25x < 2 + 0.5x', '(12, ∞)'],
    ['x^2 - 5x + 6 <= 0', '[2, 3]'],
    ['x^2 - 3x >= x + 21', '(−∞, −3] ∪ [7, ∞)'],
    ['x^4 - 5x^2 + 4 > 0', '(−∞, −2) ∪ (−1, 1) ∪ (2, ∞)'],
    ['(2x - 5)/(x - 4) <= 1', '[1, 4)'],
    ['abs(x - 4) > 6', '(−∞, −2) ∪ (10, ∞)'],
    ['|-2x + 5| < 6', '(−1/2, 11/2)'],
    ['3x - 2 > 4x + 1; 5x + 1 <= 2x - 5', '(−∞, −3)'],
    ['3x - 6 < 9; x^2 - 9x >= 10', '(−∞, −1]'],
    ['x^2 + 1 > 0', 'ℝ'],
    ['x^2 + 4 < 0', '∅'],
    ['(x - 2)^2 <= 0', '{2}'],
    ['(x - 1)^2 > 0', '(−∞, 1) ∪ (1, ∞)'],
    ['x^2 < 2', '(−√2, √2)'],
    ['-1 < 2x + 3 <= 5', '(−2, 1]'],
    ['1/(x - 1)^2 > 0', '(−∞, 1) ∪ (1, ∞)'],
    ['sqrt(x) <= 3', '[0, 9]'],
  ])('%s → %s', (src, expected) => {
    expect(sol(src)).toBe(expected);
  });

  it('formats simple fractions and roots', () => {
    expect(formatNumber(2.5)).toBe('5/2');
    expect(formatNumber(-0.75)).toBe('−3/4');
    expect(formatNumber(Math.sqrt(3))).toBe('√3');
  });

  it('prints inequalities the way they are written on paper', () => {
    expect(prettySource('3(x+1) - 2 <= 5x')).toEqual(['3(x + 1) − 2 ≤ 5x']);
    expect(prettySource('(2x-5)/(x-4) >= 1')).toEqual(['(2x − 5)/(x − 4) ≥ 1']);
    expect(prettySource('abs(-2x + 5) < 6')).toEqual(['|−2x + 5| < 6']);
    expect(prettySource('x^2 - 3x >= x + 21')).toEqual(['x² − 3x ≥ x + 21']);
    expect(prettySource('(x+1)(x-2) > 0')).toEqual(['(x + 1)(x − 2) > 0']);
  });

  it('rejects text that is not an inequality', () => {
    expect(() => parseSystem('x^2 - 1')).toThrow();
    expect(() => parseSystem('x + y > 2')).toThrow();
    expect(() => parseSystem('(x + 1 > 2')).toThrow();
  });
});

describe('reading answers', () => {
  const truth = solve('x^2 - 3x >= x + 21').pieces;

  it.each([
    '(-inf, -3] U [7, inf)',
    '(-∞,-3]∪[7,∞)',
    'x <= -3 or x >= 7',
    'x ≤ −3 o x ≥ 7',
  ])('accepts %s', (answer) => {
    const parsed = parseAnswer(answer);
    expect(parsed).not.toBeNull();
    expect(compareAnswer(parsed!, truth)).toEqual({ ok: true });
  });

  it('names an endpoint that should be included', () => {
    const r = compareAnswer(parseAnswer('(-inf, -3) U [7, inf)')!, truth);
    expect(r).toEqual({ ok: false, x: -3, inAnswer: false });
  });

  it('names a value that should not be there', () => {
    const r = compareAnswer(parseAnswer('(-inf, -3] U [0, inf)')!, truth);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r).toMatchObject({ inAnswer: true, x: 4 });
  });

  it('reads ℝ, ∅, single points, chains, fractions, and roots', () => {
    expect(compareAnswer(parseAnswer('R')!, solve('x^2 + 1 > 0').pieces).ok).toBe(true);
    expect(compareAnswer(parseAnswer('∅')!, solve('x^2 + 4 < 0').pieces).ok).toBe(true);
    expect(compareAnswer(parseAnswer('{2}')!, solve('(x - 2)^2 <= 0').pieces).ok).toBe(true);
    expect(compareAnswer(parseAnswer('-1/2 < x < 11/2')!, solve('abs(-2x + 5) < 6').pieces).ok).toBe(true);
    expect(compareAnswer(parseAnswer('(-sqrt(2), √2)')!, solve('x^2 < 2').pieces).ok).toBe(true);
    expect(compareAnswer(parseAnswer('R \\ {1}')!, solve('(x - 1)^2 > 0').pieces).ok).toBe(true);
  });

  it('returns null for unreadable answers', () => {
    expect(parseAnswer('between 2 and 3')).toBeNull();
    expect(parseAnswer('[3, 2]')).toBeNull();
    expect(parseAnswer('')).toBeNull();
  });
});

describe('sign chart', () => {
  it('shows factor signs and where the inequality holds', () => {
    const s = solve('x^2 - 5x + 6 <= 0');
    const chart = signChart(s.system[0], s.points, ['x - 2', 'x - 3']);
    expect(chart.columns.map((c) => c.label)).toEqual(['(−∞, 2)', '2', '(2, 3)', '3', '(3, ∞)']);
    expect(chart.rows[0].signs).toEqual([-1, 0, 1, 1, 1]);
    expect(chart.rows[2].signs).toEqual([1, 0, -1, 0, 1]);
    expect(chart.holds).toEqual([false, true, true, true, false]);
  });

  it('marks where a rational expression is undefined', () => {
    const s = solve('(x + 1)/(x - 3) >= 0');
    const chart = signChart(s.system[0], s.points);
    expect(chart.rows[0].signs).toEqual([1, 0, -1, null, 1]);
  });
});

describe('Calculus 1 Week 1 problems', () => {
  it.each(inequalityProblems.map((p) => [p.id, p] as const))('%s parses, solves, and has a sign chart', (_, p) => {
    const s = solve(p.inequality);
    expect(s.points.length).toBeLessThan(10);
    if (s.system.length === 1) expect(() => signChart(s.system[0], s.points, p.factors)).not.toThrow();
    // The printed solution must read back as the same set.
    expect(compareAnswer(parseAnswer(formatPieces(s.pieces))!, s.pieces)).toEqual({ ok: true });
  });
});
