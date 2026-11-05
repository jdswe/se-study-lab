import { describe, expect, it } from 'vitest';
import { plainRich, tokenizeRich } from './richText';

describe('rich text', () => {
  it('passes plain text through', () => {
    expect(tokenizeRich('Just words.')).toEqual([{ kind: 'text', value: 'Just words.' }]);
  });
  it('finds inline and display math', () => {
    expect(tokenizeRich('Solve $x^2 - 4 = 0$ now.')).toEqual([
      { kind: 'text', value: 'Solve ' }, { kind: 'math', value: 'x^2 - 4 = 0' }, { kind: 'text', value: ' now.' },
    ]);
    expect(tokenizeRich('$$\\frac{a}{b}$$')).toEqual([{ kind: 'display', value: '\\frac{a}{b}' }]);
  });
  it('leaves prices alone', () => {
    expect(tokenizeRich('It costs $12 or $15 today.')).toEqual([{ kind: 'text', value: 'It costs $12 or $15 today.' }]);
    expect(tokenizeRich('Pay \\$5 now')).toEqual([{ kind: 'text', value: 'Pay $5 now' }]);
  });
  it('reads code and bold', () => {
    expect(tokenizeRich('Run `git add` **first**')).toEqual([
      { kind: 'text', value: 'Run ' }, { kind: 'code', value: 'git add' }, { kind: 'text', value: ' ' }, { kind: 'bold', value: 'first' },
    ]);
  });
  it('keeps escaped dollars inside math', () => {
    expect(tokenizeRich('$a \\$ b$')).toEqual([{ kind: 'math', value: 'a \\$ b' }]);
  });
  it('strips markup and turns math into Unicode for plain contexts', () => {
    expect(plainRich('If $p \\to q$ and **p**')).toBe('If p → q and p');
    expect(plainRich('$x^2 - 5x + 6 \\le 0$')).toBe('x² − 5x + 6 ≤ 0');
    expect(plainRich('$\\frac{a+1}{2}$, $\\sqrt{x+7}$, $x \\in \\mathbb{R}$')).toBe('(a+1)/2, √(x+7), x ∈ ℝ');
    expect(plainRich('$a_{n+1} = 2a_n$')).toBe('aₙ₊₁ = 2aₙ');
    expect(plainRich('$\\neg(p \\lor q) \\leftrightarrow (\\neg p \\land \\neg q)$')).toBe('¬(p ∨ q) ↔ (¬p ∧ ¬q)');
  });
});
