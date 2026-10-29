import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { GitGraph } from '../components/GitGraph';
import { fileStatus, headTree, initRepo, run, type RepoState } from '../lib/gitSim';
import type { GitMission } from '../lib/gitMissions';
import { updateState, useProgress } from '../lib/store';

interface Line {
  kind: 'cmd' | 'out' | 'err';
  text: string;
}

/**
 * Git Playground: a practical sandbox with real files. Type commands, watch
 * files move between the working directory, the staging area, and the
 * repository, and complete the week's missions.
 */
export default function GitPlayground({ missions }: { missions: GitMission[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [state, setState] = useState<RepoState>(initRepo);
  const [lines, setLines] = useState<Line[]>([{ kind: 'out', text: t('playground.welcome') }]);
  const [input, setInput] = useState('');
  const [cursor, setCursor] = useState(-1);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  // Record newly completed missions so the week shows progress.
  useEffect(() => {
    const newly = missions.filter((m) => m.done(state) && !progress.stepsDone[`gitpg:${m.id}`]);
    if (newly.length) updateState((s) => ({ ...s, stepsDone: { ...s.stepsDone, ...Object.fromEntries(newly.map((m) => [`gitpg:${m.id}`, true as const])) } }));
  }, [state, missions, progress.stepsDone]);

  function execute(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setCursor(-1);
    if (trimmed === 'reset' || trimmed === 'clear') {
      setState(initRepo());
      setLines([{ kind: 'out', text: t('playground.welcome') }]);
      return;
    }
    const result = run(state, trimmed);
    setState(result.state);
    const added: Line[] = [
      { kind: 'cmd', text: trimmed },
      ...result.output.map((text): Line => ({ kind: result.ok ? 'out' : 'err', text })),
    ];
    setLines((l) => [...l, ...added].slice(-120));
  }

  const done = (m: GitMission) => m.done(state) || Boolean(progress.stepsDone[`gitpg:${m.id}`]);
  const next = missions.find((m) => !done(m));
  const completed = missions.filter(done).length;
  const status = fileStatus(state);
  const head = headTree(state);
  const files = [...new Set([...Object.keys(state.work), ...Object.keys(state.index), ...Object.keys(head)])].sort();
  const history = state.history;
  const tipId = state.branches[state.head];

  const workBadge = (f: string) =>
    status.conflicted.includes(f) ? ['conflict', t('playground.badgeConflict')]
      : status.untracked.includes(f) ? ['new', t('playground.badgeNew')]
        : status.unstaged.includes(f) ? ['modified', t('playground.badgeModified')]
          : null;

  return (
    <div className="gitpg">
      <section className="gitpg-mission" aria-live="polite">
        <div className="gitpg-mission-head">
          <h3>{t('playground.scenario')}</h3>
          <span className="faint">{t('playground.missionProgress', { done: completed, total: missions.length })}</span>
        </div>
        {next ? (
          <div className="gitpg-current">
            <p className="gitpg-current-title">{pick(next.title).text}</p>
            <div className="gitpg-hints">
              {next.hint.split(' · ').map((h) => (
                <button key={h} type="button" className="token" onClick={() => { setInput(h); inputRef.current?.focus(); }}>{h}</button>
              ))}
            </div>
          </div>
        ) : (
          <p className="celebrate">{t('playground.allDone')}</p>
        )}
        <ol className="gitpg-steps">
          {missions.map((m) => (
            <li key={m.id} className={done(m) ? 'is-done' : next?.id === m.id ? 'is-next' : ''}>{pick(m.title).text}</li>
          ))}
        </ol>
      </section>

      <div className="gitpg-main">
        <section className="terminal gitpg-terminal" aria-label={t('playground.terminal')}>
          <div className="terminal-bar"><span /><span /><span /><em>~/campus-app ({state.head})</em></div>
          <div className="terminal-body" ref={outRef}>
            {lines.map((l, i) => (
              <div key={i} className={`term-line ${l.kind}`}>{l.kind === 'cmd' && <b>$ </b>}{l.text}</div>
            ))}
          </div>
          <form className="term-input" onSubmit={(e) => { e.preventDefault(); execute(input); setInput(''); }}>
            <label htmlFor="pg-input"><b>$</b><span className="sr-only">{t('playground.inputLabel')}</span></label>
            <input
              id="pg-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' && history.length) {
                  e.preventDefault();
                  const c = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
                  setCursor(c);
                  setInput(history[c]);
                } else if (e.key === 'ArrowDown' && cursor >= 0) {
                  e.preventDefault();
                  const c = cursor + 1;
                  if (c >= history.length) { setCursor(-1); setInput(''); } else { setCursor(c); setInput(history[c]); }
                }
              }}
              placeholder="git status"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        </section>

        <section className="gitpg-repo" aria-label={t('playground.repoState')}>
          <div className="gitpg-areas">
            <div className="gitpg-area">
              <h4>{t('playground.areaWork')}</h4>
              <ul>
                {Object.keys(state.work).sort().map((f) => {
                  const badge = workBadge(f);
                  return <li key={f} className={badge ? `is-${badge[0]}` : ''}><code>{f}</code>{badge && <small>{badge[1]}</small>}</li>;
                })}
              </ul>
            </div>
            <div className="gitpg-area">
              <h4>{t('playground.areaStage')}</h4>
              <ul>
                {files.filter((f) => status.staged.includes(f)).map((f) => <li key={f} className="is-staged"><code>{f}</code><small>{t('playground.badgeStaged')}</small></li>)}
                {status.staged.length === 0 && <li className="faint">{t('playground.empty')}</li>}
              </ul>
            </div>
            <div className="gitpg-area">
              <h4>{t('playground.areaRepo')} <code className="faint">{tipId}</code></h4>
              <ul>
                {Object.keys(head).sort().map((f) => <li key={f}><code>{f}</code></li>)}
              </ul>
            </div>
          </div>
          <div className="gitpg-graph">
            <GitGraph state={state} natural label={t('playground.graphLabel', { n: state.commits.length })} />
          </div>
        </section>
      </div>
    </div>
  );
}
