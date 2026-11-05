import { describe, expect, it } from 'vitest';
import { plainRich, tokenizeRich } from './richText';

describe('automatic code formatting', () => {
  const codes = (src: string) => tokenizeRich(src).filter((t) => t.kind === 'code').map((t) => t.value);
  it('finds git commands with their flags and quoted messages', () => {
    expect(codes('Run git commit -m "Add login" to save.')).toEqual(['git commit -m "Add login"']);
    expect(codes('Then git push origin main.')).toEqual(['git push origin main']);
    expect(codes('Use git add . first')).toEqual(['git add .']);
  });
  it('finds SQL statements, calls, flags, paths and file names', () => {
    expect(codes('Try SELECT name FROM product WHERE price < 10; and see.')).toEqual(['SELECT name FROM product WHERE price < 10;']);
    expect(codes('Use abs() and main() here')).toEqual(['abs()', 'main()']);
    expect(codes('Pass --force or -m to it')).toEqual(['--force', '-m']);
    expect(codes('Open /etc/passwd and Main.java now')).toEqual(['/etc/passwd', 'Main.java']);
    expect(codes('Call Integer.parseInt(args[0])')).toEqual(['Integer.parseInt', 'args[0]']);
  });
  it('leaves ordinary prose alone', () => {
    expect(codes('We commit to git as a tool, and/or use 1/2 of it - and update the report.')).toEqual([]);
    expect(codes('See https://example.com/a/b for more.')).toEqual([]);
    expect(codes('The value is -5 or x - y.')).toEqual([]);
  });
});

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
