import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { useI18n } from '../i18n';
import type { SqlTask } from '../content/db1-week1/sqlTasks';
import { STORE_SEED_SQL, sameResult, type ResultSet } from '../lib/storeDb';
import { updateState, useProgress } from '../lib/store';

let sqlPromise: Promise<SqlJsStatic> | null = null;
/** Loads the SQLite engine once per page. */
function loadSql(): Promise<SqlJsStatic> {
  sqlPromise ??= initSqlJs({ locateFile: () => wasmUrl });
  return sqlPromise;
}

function freshDb(SQL: SqlJsStatic): Database {
  const db = new SQL.Database();
  db.exec(STORE_SEED_SQL);
  return db;
}

interface RunOutput {
  results: ResultSet[];
  changed: number;
  error?: string;
  ms: number;
}


/**
 * SQL Lab: a real SQLite database running in the browser, preloaded with the
 * campus store. Learners run queries, see results, and solve self-checking tasks.
 */
export default function SqlLab({ tasks: TASKS }: { tasks: SqlTask[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [params] = useSearchParams();
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null);
  const [loadError, setLoadError] = useState('');
  const db = useRef<Database | null>(null);
  const [query, setQuery] = useState(params.get('q') ?? 'SELECT * FROM product;');
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const [showHint, setShowHint] = useState(false);
  const [version, setVersion] = useState(0); // bumps when the data changes, to refresh the schema panel

  useEffect(() => {
    let alive = true;
    loadSql()
      .then((S) => {
        if (!alive) return;
        db.current = freshDb(S);
        setSQL(S);
      })
      .catch((e: Error) => setLoadError(e.message));
    return () => {
      alive = false;
      db.current?.close();
      db.current = null;
    };
  }, []);

  useEffect(() => {
    const q = params.get('q');
    if (q) setQuery(q);
  }, [params]);

  const task = TASKS.find((x) => x.id === taskId) ?? TASKS[0];
  const solved = (id: string) => Boolean(progress.stepsDone[`sqllab:${id}`]);

  const expected = useMemo(() => {
    if (!SQL) return new Map<string, ResultSet | undefined>();
    const ref = freshDb(SQL);
    const map = new Map<string, ResultSet | undefined>();
    for (const tk of TASKS) {
      if (tk.verify) continue;
      const res = ref.exec(tk.solution);
      map.set(tk.id, res[res.length - 1] ?? { columns: [], values: [] });
    }
    ref.close();
    return map;
  }, [SQL]);

  const run = useCallback(() => {
    if (!db.current) return;
    const start = performance.now();
    try {
      const results = db.current.exec(query) as ResultSet[];
      const changed = db.current.getRowsModified();
      setOutput({ results, changed, ms: Math.round(performance.now() - start) });
      setVersion((v) => v + 1);
      // Check the selected task.
      let ok = false;
      if (task.verify) {
        const v = db.current.exec(task.verify);
        ok = Boolean(v[0]?.values[0]?.[0]);
      } else {
        ok = sameResult(results[results.length - 1], expected.get(task.id), task.ordered);
      }
      if (ok && !solved(task.id)) {
        updateState((s) => ({ ...s, stepsDone: { ...s.stepsDone, [`sqllab:${task.id}`]: true } }));
      }
    } catch (e) {
      setOutput({ results: [], changed: 0, error: (e as Error).message, ms: Math.round(performance.now() - start) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, task, expected]);

  function resetDb() {
    if (!SQL) return;
    db.current?.close();
    db.current = freshDb(SQL);
    setOutput(null);
    setVersion((v) => v + 1);
  }

  const schema = useMemo(() => {
    if (!db.current) return [];
    const tables = db.current.exec("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")[0]?.values.map((r) => String(r[0])) ?? [];
    return tables.map((name) => ({
      name,
      columns: (db.current!.exec(`PRAGMA table_info(${name})`)[0]?.values ?? []).map((r) => ({ name: String(r[1]), type: String(r[2]), pk: Number(r[5]) > 0 })),
      count: Number(db.current!.exec(`SELECT COUNT(*) FROM ${name}`)[0]?.values[0]?.[0] ?? 0),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SQL, version]);

  if (loadError) return <p className="warning">{t('sqllab.loadError')} ({loadError})</p>;
  if (!SQL) return <p className="faint">{t('sqllab.loading')}</p>;

  const solvedCount = TASKS.filter((x) => solved(x.id)).length;
  const last = output?.results[output.results.length - 1];

  return (
    <div className="sqllab">
      <p className="muted">{t('sqllab.subtitle')}</p>
      <div className="sqllab-grid">
        <aside className="card sqllab-tasks">
          <h2>{t('sqllab.tasks')}</h2>
          <p className="faint">{t('sqllab.solved', { n: solvedCount, total: TASKS.length })}</p>
          <ol className="mission-list">
            {TASKS.map((tk) => (
              <li key={tk.id} className={`mission ${solved(tk.id) ? 'is-done' : ''} ${tk.id === taskId ? 'is-next' : ''}`}>
                <span className="mission-check" aria-hidden="true">{solved(tk.id) ? '✓' : ''}</span>
                <button type="button" className="task-button" onClick={() => { setTaskId(tk.id); setShowHint(false); }} aria-pressed={tk.id === taskId}>
                  <strong>{pick(tk.title).text}</strong>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <section className="sqllab-main">
          <div className="card sqllab-task">
            <p className="eyebrow">{t('sqllab.currentTask')}</p>
            <h3>{pick(task.title).text} {solved(task.id) && <span className="badge badge-good">✓ {t('activity.solved')}</span>}</h3>
            <p>{pick(task.prompt).text}</p>
            <button type="button" className="btn btn-small" onClick={() => setShowHint((v) => !v)}>{t('week.hint')}</button>
            {showHint && <p className="explain">{pick(task.hint).text}</p>}
          </div>

          <div className="terminal sqllab-editor">
            <div className="terminal-bar"><span /><span /><span /><em>campus_store.sqlite</em></div>
            <textarea
              aria-label={t('sqllab.editor')}
              value={query}
              spellCheck={false}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  run();
                }
              }}
              rows={6}
            />
            <div className="sqllab-actions">
              <button type="button" className="btn btn-small btn-primary" onClick={run}>▶ {t('sqllab.run')} <kbd>Ctrl+Enter</kbd></button>
              <button type="button" className="btn btn-small" onClick={resetDb}>{t('sqllab.reset')}</button>
            </div>
          </div>

          <div className="card sqllab-output" aria-live="polite">
            {!output && <p className="faint">{t('sqllab.empty')}</p>}
            {output?.error && <p className="feedback bad">{t('sqllab.error')}: {output.error}</p>}
            {output && !output.error && !last && <p className="feedback good">{t('sqllab.changed', { n: output.changed })}</p>}
            {last && (
              <>
                <p className="faint">{t('sqllab.rows', { n: last.values.length, ms: output!.ms })}</p>
                <div className="sqllab-table-wrap">
                  <table className="data-table sqllab-table">
                    <thead><tr>{last.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
                    <tbody>{last.values.map((row, i) => <tr key={i}>{row.map((v, j) => <td key={j}>{v === null ? <em className="faint">NULL</em> : String(v)}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </>
            )}
            {output && !output.error && solved(task.id) && <p className="feedback good">✓ {t('sqllab.taskSolved')}</p>}
          </div>
        </section>

        <aside className="card sqllab-schema">
          <h2>{t('sqllab.schema')}</h2>
          {schema.map((tb) => (
            <details key={tb.name} open>
              <summary><code>{tb.name}</code> <span className="faint">({tb.count})</span></summary>
              <ul>
                {tb.columns.map((c) => (
                  <li key={c.name}>
                    <button type="button" className="token" onClick={() => setQuery((q) => `${q}${q.endsWith(' ') || q.endsWith('\n') ? '' : ' '}${c.name}`)}>
                      {c.pk ? '🔑 ' : ''}{c.name}
                    </button>
                    <span className="faint"> {c.type}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </aside>
      </div>
    </div>
  );
}
