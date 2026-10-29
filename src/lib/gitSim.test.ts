import { describe, expect, it } from 'vitest';
import { fileStatus, initRepo, isAncestor, logOf, run, tokenize, type RepoState } from './gitSim';
import { week1GitMissions } from '../content/week1/gitMissions';

function exec(lines: string[], from: RepoState = initRepo()) {
  let state = from;
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

describe('files and the staging area', () => {
  it('starts clean with two tracked files', () => {
    const s = initRepo();
    expect(Object.keys(s.work).sort()).toEqual(['README.md', 'app.js']);
    expect(run(s, 'git status').output).toContain('nothing to commit, working tree clean');
  });

  it('shows modified, staged, and untracked files like git status', () => {
    const { state } = exec(['edit README.md hello', 'touch notes.txt']);
    expect(fileStatus(state)).toMatchObject({ unstaged: ['README.md'], untracked: ['notes.txt'], staged: [] });
    const staged = run(state, 'git add README.md').state;
    expect(fileStatus(staged).staged).toEqual(['README.md']);
  });

  it('refuses to commit when nothing is staged', () => {
    const r = run(run(initRepo(), 'edit README.md x').state, 'git commit -m "x"');
    expect(r.ok).toBe(false);
    expect(r.output.join(' ')).toMatch(/no changes added to commit/);
  });

  it('commits a snapshot of the index, not of the working directory', () => {
    const { state } = exec(['edit README.md one', 'git add README.md', 'edit README.md two', 'git commit -m "one"']);
    const tip = state.commits.find((c) => c.id === state.branches.main)!;
    expect(tip.tree['README.md']).toContain('one');
    expect(tip.tree['README.md']).not.toContain('two');
    expect(fileStatus(state).unstaged).toEqual(['README.md']);
  });

  it('unstages with git restore --staged', () => {
    const { state } = exec(['edit app.js x', 'git add app.js', 'git restore --staged app.js']);
    expect(fileStatus(state)).toMatchObject({ staged: [], unstaged: ['app.js'] });
  });
});

describe('branches and merges', () => {
  it('blocks switching branches with uncommitted changes', () => {
    const r = run(run(initRepo(), 'edit app.js x').state, 'git switch -c feature');
    expect(r.ok).toBe(false);
    expect(r.output[0]).toMatch(/would be overwritten/);
  });

  it('fast-forwards and brings the files along', () => {
    const { state, outputs } = exec(['git switch -c feature', 'touch notes.txt', 'git add notes.txt', 'git commit -m "notes"', 'git switch main', 'git merge feature']);
    expect(outputs[5]).toContain('Fast-forward');
    expect(state.work['notes.txt']).toBe('');
    expect(isAncestor(state, state.branches.feature, state.branches.main)).toBe(true);
  });

  it('merges different files automatically with a merge commit', () => {
    const { state } = exec([
      'git branch feature', 'edit README.md main-side', 'git add .', 'git commit -m "readme"',
      'git switch feature', 'edit app.js feature-side', 'git add .', 'git commit -m "app"',
      'git switch main', 'git merge feature',
    ]);
    const tip = state.commits.find((c) => c.id === state.branches.main)!;
    expect(tip.parents).toHaveLength(2);
    expect(tip.tree['README.md']).toContain('main-side');
    expect(tip.tree['app.js']).toContain('feature-side');
  });

  it('stops on a real conflict, then completes after resolve, add, and commit', () => {
    const conflict = exec([
      'git branch feature', 'edit app.js from-main', 'git add .', 'git commit -m "main edit"',
      'git switch feature', 'edit app.js from-feature', 'git add .', 'git commit -m "feature edit"',
      'git switch main', 'git merge feature',
    ]);
    expect(conflict.outputs[9][0]).toMatch(/CONFLICT/);
    expect(conflict.state.work['app.js']).toMatch(/<<<<<<< HEAD/);
    expect(run(conflict.state, 'git commit -m "merge"').ok).toBe(false);
    const done = exec(['resolve app.js', 'git add app.js', 'git commit -m "merge feature"'], conflict.state);
    const tip = done.state.commits.find((c) => c.id === done.state.branches.main)!;
    expect(tip.parents).toHaveLength(2);
    expect(tip.tree['app.js']).not.toMatch(/<<<<<<<|>>>>>>>/);
    expect(done.state.merging).toBeUndefined();
  });

  it('gives every commit a unique id', () => {
    const lines = ['a', 'b', 'c', 'd', 'e'].flatMap((m) => [`edit app.js ${m}`, 'git add .', `git commit -m "${m}"`]);
    const { state } = exec(lines);
    expect(new Set(state.commits.map((c) => c.id)).size).toBe(state.commits.length);
    expect(logOf(state, 'main')).toHaveLength(6);
  });
});

describe('Week 1 Git missions', () => {
  it('are all completed by the reference walkthrough, in order', () => {
    const script = [
      'git status',
      'edit README.md "Setup steps"', 'git add README.md', 'git commit -m "add setup steps"',
      'git switch -c feature', 'touch notes.txt', 'git add notes.txt', 'git commit -m "add notes"',
      'edit app.js feature-side', 'git add app.js', 'git commit -m "feature app"',
      'git switch main', 'edit app.js main-side', 'git add app.js', 'git commit -m "main app"',
      'git merge feature', 'resolve app.js', 'git add app.js', 'git commit -m "merge feature"',
    ];
    const { state } = exec(script);
    expect(week1GitMissions.map((m) => [m.id, m.done(state)])).toEqual(week1GitMissions.map((m) => [m.id, true]));
  });

  it('none is complete on a fresh repository', () => {
    expect(week1GitMissions.some((m) => m.done(initRepo()))).toBe(false);
  });
});

describe('shortcuts', () => {
  it('supports echo >> and git commit -am like a real terminal', () => {
    const { state } = exec(['echo "Setup" >> README.md', 'git commit -am "setup"']);
    const tip = state.commits.find((c) => c.id === state.branches.main)!;
    expect(tip.tree['README.md']).toContain('Setup');
    expect(fileStatus(state).unstaged).toEqual([]);
  });

  it('runs the home demo script to a merge commit', () => {
    const script = ['echo "Setup steps" >> README.md', 'git commit -am "add setup steps"', 'git switch -c feature', 'echo "login()" >> app.js', 'git commit -am "add login"', 'git switch main', 'echo "Fix typo" >> README.md', 'git commit -am "fix typo"', 'git merge feature'];
    const { state } = exec(script);
    expect(state.commits.find((c) => c.id === state.branches.main)!.parents).toHaveLength(2);
  });
});
