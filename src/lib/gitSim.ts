/**
 * A small, pure Git simulator for the playground. It models files in the
 * working directory, the staging area (index), commits with snapshots,
 * branches, HEAD, fast-forward and three-way merges, and conflicts. Messages
 * imitate real Git output, so what learners see here matches their terminal.
 */

export type Tree = Record<string, string>;

export interface SimCommit {
  id: string;
  parents: string[];
  message: string;
  /** Branch that was checked out when the commit was made; used for the lane. */
  branch: string;
  seq: number;
  tree: Tree;
}

export interface RepoState {
  commits: SimCommit[];
  branches: Record<string, string>;
  /** Name of the checked-out branch. */
  head: string;
  /** Lane index per branch, assigned when the branch is created. */
  lanes: Record<string, number>;
  /** Files as they are on disk. */
  work: Tree;
  /** Files as they will go into the next commit. */
  index: Tree;
  /** Set while a merge waits for conflicts to be resolved. */
  merging?: { theirs: string; branch: string; conflicts: string[] };
  /** Every command typed, used by missions. */
  history: string[];
}

export interface RunResult {
  state: RepoState;
  output: string[];
  ok: boolean;
}

/** Deterministic short hash, so the same sequence of commands gives the same ids. */
function shortId(seq: number, message: string): string {
  // FNV-1a over the message, then mix in the sequence number and avalanche,
  // so a different position or message always changes every hex digit.
  let h = 2166136261;
  for (const ch of message) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  h = Math.imul(h ^ Math.imul(seq + 1, 0x9e3779b1), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

const INITIAL_TREE: Tree = {
  'README.md': '# Campus app\n',
  'app.js': 'console.log("hello");\n',
};

export function initRepo(): RepoState {
  const root: SimCommit = { id: shortId(0, 'initial commit'), parents: [], message: 'initial commit', branch: 'main', seq: 0, tree: { ...INITIAL_TREE } };
  return {
    commits: [root],
    branches: { main: root.id },
    head: 'main',
    lanes: { main: 0 },
    work: { ...INITIAL_TREE },
    index: { ...INITIAL_TREE },
    history: [],
  };
}

export const byId = (state: RepoState, id: string): SimCommit | undefined => state.commits.find((c) => c.id === id);
export const headTree = (state: RepoState): Tree => byId(state, state.branches[state.head])?.tree ?? {};

/** True when `ancestor` is reachable from `from` by following parents. */
export function isAncestor(state: RepoState, ancestor: string, from: string): boolean {
  const stack = [from];
  const seen = new Set<string>();
  while (stack.length) {
    const id = stack.pop()!;
    if (id === ancestor) return true;
    if (seen.has(id)) continue;
    seen.add(id);
    stack.push(...(byId(state, id)?.parents ?? []));
  }
  return false;
}

/** Commits reachable from a branch tip, newest first. */
export function logOf(state: RepoState, branch: string): SimCommit[] {
  const tip = state.branches[branch];
  if (!tip) return [];
  return state.commits.filter((c) => isAncestor(state, c.id, tip)).sort((a, b) => b.seq - a.seq);
}

export interface FileStatus {
  staged: string[];
  unstaged: string[];
  untracked: string[];
  conflicted: string[];
}

/** Compares HEAD, the index, and the working directory, like `git status`. */
export function fileStatus(state: RepoState): FileStatus {
  const head = headTree(state);
  const names = new Set([...Object.keys(head), ...Object.keys(state.index), ...Object.keys(state.work)]);
  const out: FileStatus = { staged: [], unstaged: [], untracked: [], conflicted: [] };
  for (const f of [...names].sort()) {
    if (state.merging?.conflicts.includes(f)) { out.conflicted.push(f); continue; }
    const inIndex = f in state.index;
    if (!inIndex && f in state.work && !(f in head)) { out.untracked.push(f); continue; }
    if (state.index[f] !== head[f]) out.staged.push(f);
    if (inIndex && state.work[f] !== state.index[f]) out.unstaged.push(f);
  }
  return out;
}

/** Splits a command line, keeping quoted strings together. */
export function tokenize(input: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

const VALID_NAME = /^[A-Za-z0-9._/-]+$/;
const sameTree = (a: Tree, b: Tree) => {
  const ka = Object.keys(a);
  return ka.length === Object.keys(b).length && ka.every((k) => a[k] === b[k]);
};

function newCommit(state: RepoState, message: string, parents: string[]): RepoState {
  const seq = state.commits.length;
  const c: SimCommit = { id: shortId(seq, message), parents, message, branch: state.head, seq, tree: { ...state.index } };
  return { ...state, commits: [...state.commits, c], branches: { ...state.branches, [state.head]: c.id }, merging: undefined };
}

function createBranch(state: RepoState, name: string): RepoState {
  const lanes = { ...state.lanes };
  if (lanes[name] === undefined) lanes[name] = Math.max(...Object.values(lanes)) + 1;
  return { ...state, branches: { ...state.branches, [name]: state.branches[state.head] }, lanes };
}

/** Finds the most recent common ancestor of two commits. */
function mergeBase(state: RepoState, a: string, b: string): string | undefined {
  const ancestors = state.commits.filter((c) => isAncestor(state, c.id, a)).map((c) => c.id);
  return state.commits.filter((c) => ancestors.includes(c.id) && isAncestor(state, c.id, b)).sort((x, y) => y.seq - x.seq)[0]?.id;
}

function statusLines(state: RepoState): string[] {
  const s = fileStatus(state);
  const out = [`On branch ${state.head}`];
  if (state.merging) out.push('You have unmerged paths.', '  (fix conflicts and run "git commit")');
  if (s.conflicted.length) out.push('Unmerged paths:', ...s.conflicted.map((f) => `\tboth modified:   ${f}`));
  if (s.staged.length) out.push('Changes to be committed:', ...s.staged.map((f) => `\t${f in state.index ? 'modified' : 'deleted'}:   ${f}`));
  if (s.unstaged.length) out.push('Changes not staged for commit:', ...s.unstaged.map((f) => `\tmodified:   ${f}`));
  if (s.untracked.length) out.push('Untracked files:', ...s.untracked.map((f) => `\t${f}`));
  if (!s.staged.length && !s.unstaged.length && !s.untracked.length && !s.conflicted.length) out.push('nothing to commit, working tree clean');
  return out;
}

function shell(state: RepoState, t: string[]): RunResult | undefined {
  const fail = (msg: string): RunResult => ({ state, output: [msg], ok: false });
  const [cmd, file, ...rest] = t;
  if (cmd === 'echo') {
    // echo "text" >> file  (append)   ·   echo "text" > file  (overwrite)
    const op = t.findIndex((x) => x === '>>' || x === '>');
    if (op < 0) return { state, ok: true, output: [t.slice(1).join(' ')] };
    const target = t[op + 1];
    if (!target || !VALID_NAME.test(target)) return fail('echo: missing or invalid file name');
    const text = `${t.slice(1, op).join(' ')}\n`;
    const content = t[op] === '>>' ? `${state.work[target] ?? ''}${text}` : text;
    return { state: { ...state, work: { ...state.work, [target]: content } }, ok: true, output: [] };
  }
  switch (cmd) {
    case 'help':
      return {
        state, ok: true,
        output: [
          'ls · cat <file> · touch <file> · echo "text" >> <file> · edit <file> [text] · resolve <file>',
          'git status · git add <file>|. · git restore [--staged] <file>',
          'git commit -m "message" · git commit -am "message" · git log · git branch [name]',
          'git switch [-c] <branch> · git merge <branch> · reset',
        ],
      };
    case 'ls':
      return { state, ok: true, output: [Object.keys(state.work).sort().join('  ')] };
    case 'cat':
      if (!file) return fail('cat: missing file name');
      if (!(file in state.work)) return fail(`cat: ${file}: No such file or directory`);
      return { state, ok: true, output: state.work[file].replace(/\n$/, '').split('\n') };
    case 'touch':
      if (!file || !VALID_NAME.test(file)) return fail('touch: missing or invalid file name');
      if (file in state.work) return { state, ok: true, output: [] };
      return { state: { ...state, work: { ...state.work, [file]: '' } }, ok: true, output: [] };
    case 'edit': {
      if (!file) return fail('edit: missing file name');
      const before = state.work[file] ?? '';
      const line = rest.length ? rest.join(' ') : `change ${state.history.length}`;
      return { state: { ...state, work: { ...state.work, [file]: `${before}${line}\n` } }, ok: true, output: [`${file}: added "${line}"`] };
    }
    case 'resolve': {
      if (!file) return fail('resolve: missing file name');
      if (!state.merging?.conflicts.includes(file)) return fail(`resolve: ${file} has no conflict`);
      // Keep both sides and drop the markers, as a person would in an editor.
      const clean = state.work[file].split('\n').filter((l) => !/^(<<<<<<<|=======|>>>>>>>)/.test(l)).join('\n');
      return {
        state: { ...state, work: { ...state.work, [file]: clean }, merging: { ...state.merging, conflicts: state.merging.conflicts.filter((f) => f !== file) } },
        ok: true,
        output: [`${file}: markers removed, both versions kept. Now run git add ${file}.`],
      };
    }
    default:
      return undefined;
  }
}

/** Runs one command line against the state. Never throws; errors come back as output. */
export function run(prev: RepoState, input: string): RunResult {
  const line = input.trim();
  const t = tokenize(line);
  if (t.length === 0) return { state: prev, output: [], ok: true };
  const state = { ...prev, history: [...prev.history, line] };
  const fail = (msg: string | string[]): RunResult => ({ state, output: Array.isArray(msg) ? msg : [msg], ok: false });

  const sh = shell(state, t);
  if (sh) return sh;
  if (t[0] !== 'git') return fail(`command not found: ${t[0]} (try "help")`);
  const [, cmd, ...args] = t;

  switch (cmd) {
    case 'status':
      return { state, ok: true, output: statusLines(state) };

    case 'add': {
      const target = args[0];
      if (!target) return fail('Nothing specified, nothing added.');
      const files = target === '.' ? Object.keys(state.work) : [target];
      if (target !== '.' && !(target in state.work)) return fail(`fatal: pathspec '${target}' did not match any files`);
      const index = { ...state.index };
      for (const f of files) index[f] = state.work[f];
      const conflicts = state.merging ? state.merging.conflicts.filter((f) => !files.includes(f) || /^(<<<<<<<|=======|>>>>>>>)/m.test(state.work[f])) : undefined;
      return { state: { ...state, index, merging: state.merging && { ...state.merging, conflicts: conflicts ?? [] } }, ok: true, output: [] };
    }

    case 'restore': {
      const staged = args[0] === '--staged';
      const f = staged ? args[1] : args[0];
      if (!f) return fail('fatal: you must specify path(s) to restore');
      if (staged) {
        const head = headTree(state);
        const index = { ...state.index };
        if (f in head) index[f] = head[f];
        else delete index[f];
        return { state: { ...state, index }, ok: true, output: [] };
      }
      if (!(f in state.index)) return fail(`error: pathspec '${f}' did not match any file(s) known to git`);
      return { state: { ...state, work: { ...state.work, [f]: state.index[f] } }, ok: true, output: [] };
    }

    case 'commit': {
      const mi = args.findIndex((a) => a === '-m' || a === '--message' || a === '-am');
      const message = mi >= 0 ? args[mi + 1] : undefined;
      if (args.includes('-a') || args.includes('-am')) {
        // -a stages every tracked file that changed, like real Git.
        const index = { ...state.index };
        for (const f of Object.keys(state.index)) if (f in state.work) index[f] = state.work[f];
        state.index = index;
      }
      if (!message) return fail('Aborting commit due to empty commit message. Use git commit -m "message".');
      if (state.merging) {
        if (state.merging.conflicts.length) return fail(['error: Committing is not possible because you have unmerged files.', 'hint: Fix them up in the work tree, and then use git add.']);
        const next = newCommit(state, message, [state.branches[state.head], state.merging.theirs]);
        return { state: next, ok: true, output: [`[${state.head} ${next.branches[state.head]}] ${message}`] };
      }
      if (sameTree(state.index, headTree(state))) {
        const s = fileStatus(state);
        const msg = s.unstaged.length || s.untracked.length
          ? ['no changes added to commit (use "git add" and/or "git commit -a")']
          : ['nothing to commit, working tree clean'];
        return fail([`On branch ${state.head}`, ...msg]);
      }
      const next = newCommit(state, message, [state.branches[state.head]]);
      const n = fileStatus(state).staged.length;
      return { state: next, ok: true, output: [`[${state.head} ${next.branches[state.head]}] ${message}`, ` ${n} file${n === 1 ? '' : 's'} changed`] };
    }

    case 'branch': {
      if (args.length === 0) return { state, ok: true, output: Object.keys(state.branches).map((b) => `${b === state.head ? '*' : ' '} ${b}`) };
      const name = args[0];
      if (!VALID_NAME.test(name)) return fail(`fatal: '${name}' is not a valid branch name`);
      if (state.branches[name]) return fail(`fatal: a branch named '${name}' already exists`);
      return { state: createBranch(state, name), ok: true, output: [] };
    }

    case 'switch':
    case 'checkout': {
      const create = (cmd === 'switch' ? ['-c', '--create'] : ['-b']).includes(args[0]);
      const name = create ? args[1] : args[0];
      if (!name || !VALID_NAME.test(name)) return fail('fatal: missing or invalid branch name');
      if (create && state.branches[name]) return fail(`fatal: a branch named '${name}' already exists`);
      if (!create && !state.branches[name]) return fail(`fatal: invalid reference: ${name}`);
      if (!create && name === state.head) return { state, ok: true, output: [`Already on '${name}'`] };
      const s = fileStatus(state);
      if (state.merging || s.staged.length || s.unstaged.length || s.conflicted.length) {
        return fail(['error: Your local changes to the following files would be overwritten by checkout:', ...[...s.staged, ...s.unstaged, ...s.conflicted].map((f) => `\t${f}`), 'Please commit your changes or stash them before you switch branches.']);
      }
      const base = create ? createBranch(state, name) : state;
      const tree = byId(base, base.branches[name])?.tree ?? {};
      // Untracked files stay in the working directory, as in Git.
      const untracked = Object.fromEntries(s.untracked.map((f) => [f, state.work[f]]));
      return {
        state: { ...base, head: name, work: { ...tree, ...untracked }, index: { ...tree } },
        ok: true,
        output: [create ? `Switched to a new branch '${name}'` : `Switched to branch '${name}'`],
      };
    }

    case 'merge': {
      const name = args[0];
      if (!name) return fail('fatal: no branch to merge');
      const theirs = state.branches[name];
      if (!theirs) return fail(`merge: ${name} - not something we can merge`);
      const s = fileStatus(state);
      if (s.staged.length || s.unstaged.length) return fail('error: Your local changes would be overwritten by merge. Commit them first.');
      const ours = state.branches[state.head];
      if (name === state.head || isAncestor(state, theirs, ours)) return { state, ok: true, output: ['Already up to date.'] };
      const theirTree = byId(state, theirs)!.tree;
      if (isAncestor(state, ours, theirs)) {
        return {
          state: { ...state, branches: { ...state.branches, [state.head]: theirs }, work: { ...theirTree }, index: { ...theirTree } },
          ok: true,
          output: [`Updating ${ours}..${theirs}`, 'Fast-forward'],
        };
      }
      const base = byId(state, mergeBase(state, ours, theirs) ?? '')?.tree ?? {};
      const ourTree = byId(state, ours)!.tree;
      const merged: Tree = {};
      const conflicts: string[] = [];
      for (const f of new Set([...Object.keys(base), ...Object.keys(ourTree), ...Object.keys(theirTree)])) {
        const b = base[f], o = ourTree[f], th = theirTree[f];
        if (o === th) { if (o !== undefined) merged[f] = o; }
        else if (o === b) { if (th !== undefined) merged[f] = th; }
        else if (th === b) { if (o !== undefined) merged[f] = o; }
        else {
          conflicts.push(f);
          merged[f] = `<<<<<<< HEAD\n${o ?? ''}=======\n${th ?? ''}>>>>>>> ${name}\n`;
        }
      }
      if (conflicts.length) {
        const index = { ...merged };
        for (const f of conflicts) index[f] = ourTree[f];
        return {
          state: { ...state, work: merged, index, merging: { theirs, branch: name, conflicts } },
          ok: false,
          output: [...conflicts.map((f) => `CONFLICT (content): Merge conflict in ${f}`), 'Automatic merge failed; fix conflicts and then commit the result.'],
        };
      }
      const withIndex = { ...state, work: merged, index: merged, merging: { theirs, branch: name, conflicts: [] } };
      const next = newCommit(withIndex, `Merge branch '${name}' into ${state.head}`, [ours, theirs]);
      return { state: next, ok: true, output: ["Merge made by the 'ort' strategy."] };
    }

    case 'log':
      return { state, ok: true, output: logOf(state, state.head).map((c) => `${c.id} ${c.message}`) };

    default:
      return fail(`git: '${cmd ?? ''}' is not a git command in this playground. Try "help".`);
  }
}
