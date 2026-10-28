import { describe, expect, it } from 'vitest';
import { initRepo, run } from './gitSim';
import { MISSIONS } from './missions';

describe('playground missions', () => {
  it('are all completed by the reference solution, in order', () => {
    const script = [
      'git commit -m "a"', 'git commit -m "b"',
      'git switch -c feature', 'git commit -m "c"', 'git commit -m "d"',
      'git switch main', 'git commit -m "e"', 'git merge feature',
    ];
    let s = initRepo();
    for (const line of script) s = run(s, line).state;
    expect(MISSIONS.map((m) => m.done(s))).toEqual([true, true, true, true, true]);
  });

  it('none is complete on a fresh repository', () => {
    expect(MISSIONS.some((m) => m.done(initRepo()))).toBe(false);
  });
});
