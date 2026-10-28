import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { GitGraph } from '../components/GitGraph';
import { initRepo, run, type RepoState } from '../lib/gitSim';
import { MISSIONS } from '../lib/missions';

interface Line {
  kind: 'cmd' | 'out' | 'err';
  text: string;
}

const QUICK = ['git commit -m "update"', 'git switch -c feature', 'git switch main', 'git merge feature', 'git log', 'help'];

/** Interactive Git sandbox: type commands, watch the graph, complete missions. */
export function GitPlayground() {
  const { t, pick } = useI18n();
  const [state, setState] = useState<RepoState>(initRepo);
  const [lines, setLines] = useState<Line[]>([{ kind: 'out', text: t('playground.welcome') }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  function execute(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setHistory((h) => [...h, trimmed]);
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
    setLines((l) => [...l, ...added].slice(-80));
  }

  const completed = MISSIONS.filter((m) => m.done(state)).length;
  const next = MISSIONS.find((m) => !m.done(state));

  return (
    <div>
      <p className="muted" style={{ marginBottom: 18 }}>{t('playground.subtitle')}</p>
      <div className="playground">
        <section className="pg-graph card" aria-label={t('playground.graph')}>
          <h2>{t('playground.graph')}</h2>
          <div className="pg-graph-scroll">
            <GitGraph state={state} label={t('playground.graphLabel', { n: state.commits.length })} />
          </div>
        </section>

        <section className="terminal pg-terminal" aria-label={t('playground.terminal')}>
          <div className="terminal-bar"><span /><span /><span /><em>{t('playground.terminal')}</em></div>
          <div className="terminal-body" ref={outRef} aria-live="polite">
            {lines.map((l, i) => (
              <div key={i} className={`term-line ${l.kind}`}>
                {l.kind === 'cmd' && <b>$ </b>}{l.text}
              </div>
            ))}
          </div>
          <form
            className="term-input"
            onSubmit={(e) => {
              e.preventDefault();
              execute(input);
              setInput('');
            }}
          >
            <label htmlFor="pg-input"><b>$</b><span className="sr-only">{t('playground.inputLabel')}</span></label>
            <input
              id="pg-input"
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
              placeholder='git commit -m "add README"'
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
          <div className="quick">
            {QUICK.map((q) => (
              <button key={q} type="button" className="token" onClick={() => execute(q)}>{q}</button>
            ))}
          </div>
        </section>

        <aside className="card pg-missions" aria-label={t('playground.missions')}>
          <h2>{t('playground.missions')}</h2>
          <p className="faint">{t('playground.missionProgress', { done: completed, total: MISSIONS.length })}</p>
          <div className="bar" aria-hidden="true"><span style={{ width: `${(completed / MISSIONS.length) * 100}%` }} /></div>
          <ol className="mission-list">
            {MISSIONS.map((m) => {
              const ok = m.done(state);
              return (
                <li key={m.id} className={`mission ${ok ? 'is-done' : ''} ${next?.id === m.id ? 'is-next' : ''}`}>
                  <span className="mission-check" aria-hidden="true">{ok ? '✓' : ''}</span>
                  <div>
                    <strong>{pick(m.title).text}</strong>
                    {next?.id === m.id && <code className="mission-hint">{m.hint}</code>}
                  </div>
                </li>
              );
            })}
          </ol>
          {completed === MISSIONS.length && <p className="celebrate" role="status">{t('playground.allDone')}</p>}
        </aside>
      </div>
    </div>
  );
}
