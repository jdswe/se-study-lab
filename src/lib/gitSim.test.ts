import { describe, expect, it } from 'vitest';
import { initRepo, isAncestor, logOf, run, tokenize } from './gitSim';

function exec(lines: string[]) {
  let state = initRepo();
  const outputs: string[][] = [];
  for (const l of lines) {
    const r = run(state, l);
    state = r.state;
    outputs.push(r.output);
  }
  return { state, outputs };
}

describe('tokenize', () => {
  it('keeps quoted messages together', () => {
    expect(tokenize('git commit -m "add sum function"')).toEqual(['git', 'commit', '-m', 'add sum function']);
  });
});

describe('git simulator', () => {
  it('starts with one commit on main', () => {
    const s = initRepo();
    expect(s.commits).toHaveLength(1);
    expect(s.head).toBe('main');
  });

  it('commits move the current branch forward', () => {
    const { state } = exec(['git commit -m "one"', 'git commit -m "two"']);
    expect(state.commits).toHaveLength(3);
    expect(logOf(state, 'main').map((c) => c.message)).toEqual(['two', 'one', 'initial commit']);
  });

  it('creates and switches branches without moving main', () => {
    const { state } = exec(['git switch -c feature', 'git commit -m "feat"']);
    expect(state.head).toBe('feature');
    expect(state.branches.main).not.toBe(state.branches.feature);
    expect(isAncestor(state, state.branches.main, state.branches.feature)).toBe(true);
  });

  it('fast-forwards when main has no new commits', () => {
    const { state, outputs } = exec(['git switch -c feature', 'git commit -m "feat"', 'git switch main', 'git merge feature']);
    expect(outputs[3]).toContain('Fast-forward');
    expect(state.branches.main).toBe(state.branches.feature);
  });

  it('creates a merge commit with two parents when histories diverge', () => {
    const { state } = exec([
      'git branch feature', 'git commit -m "on main"', 'git switch feature', 'git commit -m "on feature"', 'git switch main', 'git merge feature',
    ]);
    const tip = state.commits.find((c) => c.id === state.branches.main)!;
    expect(tip.parents).toHaveLength(2);
    expect(tip.message).toBe("Merge branch 'feature' into main");
  });

  it('reports errors without changing state', () => {
    const s = initRepo();
    const r = run(s, 'git switch nope');
    expect(r.ok).toBe(false);
    expect(r.state).toBe(s);
    expect(run(s, 'git branch main').ok).toBe(false);
    expect(run(s, 'ls').ok).toBe(false);
  });

  it('gives every commit a unique id, even for short similar messages', () => {
    const { state } = exec(['git commit -m "a"', 'git commit -m "b"', 'git commit -m "c"', 'git commit -m "d"', 'git commit -m "e"']);
    expect(new Set(state.commits.map((c) => c.id)).size).toBe(state.commits.length);
  });

  it('gives each new branch its own lane', () => {
    const { state } = exec(['git branch a', 'git branch b']);
    expect(new Set(Object.values(state.lanes)).size).toBe(3);
  });
});
