/**
 * A tiny, pure Git simulator for the playground. It models commits, branches,
 * HEAD, fast-forward merges, and merge commits. No files, no remotes: just the
 * history graph, which is what learners need to see.
 */

export interface SimCommit {
  id: string;
  parents: string[];
  message: string;
  /** Branch that was checked out when the commit was made; used for the lane. */
  branch: string;
  seq: number;
}

export interface RepoState {
  commits: SimCommit[];
  branches: Record<string, string>;
  /** Name of the checked-out branch. */
  head: string;
  /** Lane index per branch, assigned when the branch is created. */
  lanes: Record<string, number>;
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

export function initRepo(): RepoState {
  const root: SimCommit = { id: shortId(0, 'initial commit'), parents: [], message: 'initial commit', branch: 'main', seq: 0 };
  return { commits: [root], branches: { main: root.id }, head: 'main', lanes: { main: 0 } };
}

function byId(state: RepoState, id: string): SimCommit | undefined {
  return state.commits.find((c) => c.id === id);
}

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

/** Splits a command line, keeping quoted strings together. */
export function tokenize(input: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

const VALID_NAME = /^[A-Za-z0-9._/-]+$/;

function commit(state: RepoState, message: string): RepoState {
  const seq = state.commits.length;
  const parent = state.branches[state.head];
  const c: SimCommit = { id: shortId(seq, message), parents: [parent], message, branch: state.head, seq };
  return { ...state, commits: [...state.commits, c], branches: { ...state.branches, [state.head]: c.id } };
}

function createBranch(state: RepoState, name: string): RepoState {
  const lanes = { ...state.lanes };
  if (lanes[name] === undefined) lanes[name] = Math.max(...Object.values(lanes)) + 1;
  return { ...state, branches: { ...state.branches, [name]: state.branches[state.head] }, lanes };
}

/** Runs one command line against the state. Never throws; errors come back as output. */
export function run(state: RepoState, input: string): RunResult {
  const t = tokenize(input.trim());
  const fail = (msg: string): RunResult => ({ state, output: [msg], ok: false });
  if (t.length === 0) return { state, output: [], ok: true };
  if (t[0] === 'help') {
    return {
      state, ok: true,
      output: [
        'git commit -m "message"   record a new commit',
        'git branch <name>         create a branch',
        'git switch <name>         move HEAD to a branch',
        'git switch -c <name>      create and switch',
        'git merge <name>          merge a branch into the current one',
        'git log                   show history',
        'git status                show the current branch',
        'reset                     start again',
      ],
    };
  }
  if (t[0] !== 'git') return fail(`command not found: ${t[0]} (try "help")`);
  const [, cmd, ...args] = t;

  switch (cmd) {
    case 'commit': {
      const mi = args.findIndex((a) => a === '-m' || a === '--message');
      const message = mi >= 0 ? args[mi + 1] : undefined;
      if (mi >= 0 && !message) return fail('error: switch `m\' requires a value');
      const msg = message ?? `update ${state.commits.length}`;
      const next = commit(state, msg);
      const c = next.commits[next.commits.length - 1];
      return { state: next, ok: true, output: [`[${state.head} ${c.id}] ${msg}`] };
    }
    case 'branch': {
      if (args.length === 0) {
        return { state, ok: true, output: Object.keys(state.branches).map((b) => `${b === state.head ? '*' : ' '} ${b}`) };
      }
      const name = args[0];
      if (!VALID_NAME.test(name)) return fail(`fatal: '${name}' is not a valid branch name`);
      if (state.branches[name]) return fail(`fatal: a branch named '${name}' already exists`);
      return { state: createBranch(state, name), ok: true, output: [] };
    }
    case 'switch':
    case 'checkout': {
      const createFlag = cmd === 'switch' ? ['-c', '--create'] : ['-b'];
      if (createFlag.includes(args[0])) {
        const name = args[1];
        if (!name || !VALID_NAME.test(name)) return fail('fatal: missing or invalid branch name');
        if (state.branches[name]) return fail(`fatal: a branch named '${name}' already exists`);
        const created = createBranch(state, name);
        return { state: { ...created, head: name }, ok: true, output: [`Switched to a new branch '${name}'`] };
      }
      const name = args[0];
      if (!name) return fail('fatal: missing branch name');
      if (!state.branches[name]) return fail(`fatal: invalid reference: ${name}`);
      if (name === state.head) return { state, ok: true, output: [`Already on '${name}'`] };
      return { state: { ...state, head: name }, ok: true, output: [`Switched to branch '${name}'`] };
    }
    case 'merge': {
      const name = args[0];
      if (!name) return fail('fatal: no branch to merge');
      const theirs = state.branches[name];
      if (!theirs) return fail(`merge: ${name} - not something we can merge`);
      const ours = state.branches[state.head];
      if (name === state.head || isAncestor(state, theirs, ours)) return { state, ok: true, output: ['Already up to date.'] };
      if (isAncestor(state, ours, theirs)) {
        return {
          state: { ...state, branches: { ...state.branches, [state.head]: theirs } },
          ok: true,
          output: [`Updating ${ours}..${theirs}`, 'Fast-forward'],
        };
      }
      const seq = state.commits.length;
      const msg = `Merge branch '${name}' into ${state.head}`;
      const c: SimCommit = { id: shortId(seq, msg), parents: [ours, theirs], message: msg, branch: state.head, seq };
      return {
        state: { ...state, commits: [...state.commits, c], branches: { ...state.branches, [state.head]: c.id } },
        ok: true,
        output: ["Merge made by the 'ort' strategy."],
      };
    }
    case 'log': {
      return { state, ok: true, output: logOf(state, state.head).map((c) => `${c.id} ${c.message}`) };
    }
    case 'status':
      return { state, ok: true, output: [`On branch ${state.head}`, 'nothing to commit, working tree clean'] };
    default:
      return fail(`git: '${cmd ?? ''}' is not a git command in this playground. Try "help".`);
  }
}
