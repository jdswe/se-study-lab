import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { updateState, useProgress } from '../lib/store';
import {
  evaluatePoly, factorize, fmt, formatFactor, formatFactored, formatPoly, parseNumber, parsePoly, parseRootList,
  rationalCandidates, RuffiniError, sameRoots, synthetic, type RuffiniProblem, type SyntheticResult,
} from '../lib/ruffini';
import { Rich } from '../components/Rich';

const near = (a: number, b: number) => Math.abs(a - b) < 1e-7;

/**
 * Ruffini Lab: factor a polynomial by hand with Ruffini's rule (synthetic division).
 * Test candidates, fill each table cell with instant feedback, keep dividing the
 * quotient, and finish by writing every real root.
 */
export default function RuffiniLab({ problems }: { problems: RuffiniProblem[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [params] = useSearchParams();
  const linked = params.get('q');
  const [id, setId] = useState<string | undefined>(linked ? undefined : problems[0]?.id);
  const [own, setOwn] = useState(linked ?? '');
  const [ownPoly, setOwnPoly] = useState<string | null>(null);
  const [ownError, setOwnError] = useState<string | null>(null);
  const ownBox = useRef<HTMLElement>(null);
  const solved = (pid: string) => Boolean(progress.stepsDone[`ruffini:${pid}`]);
  const count = problems.filter((p) => solved(p.id)).length;
  const problem = id ? problems.find((p) => p.id === id) : undefined;

  function loadOwn(text: string) {
    try {
      const coeffs = parsePoly(text);
      if (coeffs.length < 3) throw new RuffiniError('degree', 'Degree 2 or more');
      setOwnPoly(text);
      setOwnError(null);
      setId(undefined);
      return true;
    } catch (err) {
      setOwnError(t(`ruffini.err.${err instanceof RuffiniError ? err.code : 'syntax'}`));
      return false;
    }
  }

  useEffect(() => {
    // Labs link here with ?q=<polynomial> so a step can be worked in one click.
    if (linked && loadOwn(linked)) ownBox.current?.scrollIntoView({ block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linked]);

  function submitOwn(e: FormEvent) {
    e.preventDefault();
    loadOwn(own);
  }

  return (
    <div className="ineq ruffini">
      <p className="muted">{t('ruffini.subtitle')}</p>
      <div className="ineq-grid">
        <aside className="ineq-problems" aria-label={t('ruffini.problems')}>
          <div className="ineq-problems-head">
            <h3>{t('ruffini.problems')}</h3>
            <span className="faint">{t('ruffini.solved', { n: count, total: problems.length })}</span>
          </div>
          {[1, 2, 3].map((level) => (
            <div key={level} className="ineq-level">
              <p className="ineq-level-name">{t(`ineq.level${level}`)}</p>
              <ol>
                {problems.filter((p) => p.level === level).map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`ineq-pick${p.id === id ? ' is-current' : ''}${solved(p.id) ? ' is-solved' : ''}`}
                      aria-pressed={p.id === id}
                      onClick={() => { setId(p.id); setOwnPoly(null); }}
                    >
                      <span className="ineq-pick-num" aria-hidden="true">{solved(p.id) ? '✓' : problems.indexOf(p) + 1}</span>
                      <span className="ineq-pick-title"><Rich text={pick(p.title).text} /></span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          {count === problems.length && problems.length > 0 && <p className="celebrate">{t('ruffini.allDone')}</p>}
        </aside>

        {problem ? (
          <Workbench key={problem.id} source={problem.poly} problem={problem} solved={solved(problem.id)} />
        ) : ownPoly ? (
          <Workbench key={`own:${ownPoly}`} source={ownPoly} solved={false} />
        ) : (
          <p className="faint">{t('ruffini.pick')}</p>
        )}
      </div>

      <section className="ineq-own" ref={ownBox}>
        <h3>{t('ruffini.ownTitle')}</h3>
        <p className="faint">{t('ruffini.ownHelp')}</p>
        <form className="ineq-answer-row" onSubmit={submitOwn}>
          <input
            value={own}
            onChange={(e) => setOwn(e.target.value)}
            placeholder="x^3 - 6x^2 + 11x - 6"
            aria-label={t('ruffini.ownTitle')}
            spellCheck={false}
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">{t('ruffini.load')}</button>
        </form>
        {ownError && <p className="feedback bad" role="status">{ownError}</p>}
      </section>
    </div>
  );
}

interface Division {
  poly: number[];
  r: number;
  result: SyntheticResult;
}

/** One polynomial worked from candidates to the final roots. */
function Workbench({ source, problem, solved }: { source: string; problem?: RuffiniProblem; solved: boolean }) {
  const { t, pick } = useI18n();
  const original = useMemo(() => parsePoly(source), [source]);
  const full = useMemo(() => factorize(original), [original]);
  const [done, setDone] = useState<Division[]>([]);
  const current = done.length ? done[done.length - 1].result.quotient : original;
  const [tested, setTested] = useState<Record<string, number>>({});
  const [rText, setRText] = useState('');
  const [active, setActive] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<'good' | 'bad' | 'format' | null>(solved ? 'good' : null);
  const candidates = useMemo(() => rationalCandidates(current), [current]);

  function test(v: number) {
    setTested((m) => ({ ...m, [String(v)]: evaluatePoly(current, v) }));
  }

  function startDivision(v: number) {
    setActive(v);
    setRText(fmt(v).replace('−', '-'));
  }

  function submitR(e: FormEvent) {
    e.preventDefault();
    const v = parseNumber(rText);
    if (v !== null) setActive(v);
  }

  function finishDivision(result: SyntheticResult) {
    if (active === null || !near(result.remainder, 0)) return;
    setDone((d) => [...d, { poly: current, r: active, result }]);
    setActive(null);
    setTested({});
    setRText('');
  }

  function checkRoots(e: FormEvent) {
    e.preventDefault();
    const roots = parseRootList(answer);
    if (!roots) { setVerdict('format'); return; }
    const ok = full.complete && sameRoots(roots, full.realRoots);
    setVerdict(ok ? 'good' : 'bad');
    if (ok && problem) updateState((s) => ({ ...s, stepsDone: { ...s.stepsDone, [`ruffini:${problem.id}`]: true } }));
  }

  const degree = current.length - 1;

  return (
    <section className="ineq-main">
      <div className="ineq-problem">
        <p className="ineq-problem-title">
          {problem ? pick(problem.title).text : t('ruffini.ownTitle')}
          {verdict === 'good' && <span className="badge badge-good">✓ {t('activity.solved')}</span>}
        </p>
        {problem?.context && <p className="ineq-context"><Rich text={pick(problem.context).text} /></p>}
        <p className="ineq-expr"><span>{formatPoly(original)} = 0</span></p>
        {problem && (
          <div className="ineq-tools">
            <button type="button" className="btn btn-small" aria-expanded={showHint} onClick={() => setShowHint((v) => !v)}>{t('week.hint')}</button>
          </div>
        )}
        {showHint && problem && <p className="explain"><Rich text={pick(problem.hint).text} /></p>}
      </div>

      {done.length > 0 && (
        <div className="rf-history" aria-label={t('ruffini.history')}>
          {done.map((d, i) => (
            <div key={i} className="rf-history-item">
              <RuffiniTable poly={d.poly} r={d.r} readOnly />
              <p className="faint">{formatFactor(d.r)} · {t('ruffini.quotient')}: <strong className="rf-mono">{formatPoly(d.result.quotient)}</strong></p>
            </div>
          ))}
        </div>
      )}

      {degree >= 2 && (
        <div className="rf-step">
          <h4>{t('ruffini.step1', { poly: formatPoly(current) })}</h4>
          {candidates.length ? (
            <>
              <p className="faint">{t('ruffini.candidatesHelp')}</p>
              <div className="rf-cands" role="group" aria-label={t('ruffini.candidates')}>
                {candidates.map((v) => {
                  const value = tested[String(v)];
                  const state = value === undefined ? '' : near(value, 0) ? ' is-root' : ' is-not';
                  return (
                    <button key={v} type="button" className={`token rf-cand${state}`} onClick={() => test(v)}>
                      {fmt(v)}
                    </button>
                  );
                })}
              </div>
              {Object.keys(tested).length > 0 && (
                <ul className="rf-tests" aria-live="polite">
                  {Object.entries(tested).map(([k, value]) => {
                    const v = Number(k);
                    const root = near(value, 0);
                    return (
                      <li key={k} className={root ? 'is-root' : ''}>
                        <span className="rf-mono">P({fmt(v)}) = {fmt(value)}</span>
                        {root ? (
                          <button type="button" className="btn btn-small btn-primary" onClick={() => startDivision(v)}>
                            {t('ruffini.divideBy', { factor: formatFactor(v) })}
                          </button>
                        ) : <span className="faint">{t('ruffini.notRoot')}</span>}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          ) : <p className="faint">{t('ruffini.noCandidates')}</p>}

          <form className="rf-r" onSubmit={submitR}>
            <label>
              {t('ruffini.rLabel')}
              <input value={rText} onChange={(e) => setRText(e.target.value)} inputMode="text" spellCheck={false} autoComplete="off" />
            </label>
            <button type="submit" className="btn btn-small">{t('ruffini.buildTable')}</button>
          </form>
        </div>
      )}

      {active !== null && degree >= 1 && (
        <div className="rf-step">
          <h4>{t('ruffini.step2', { factor: formatFactor(active) })}</h4>
          <p className="faint">{t('ruffini.tableHelp')}</p>
          <RuffiniTable key={`${done.length}:${active}`} poly={current} r={active} onFinish={finishDivision} />
        </div>
      )}

      {(done.length > 0 || degree <= 2) && (
        <form className="rf-step ineq-answer" onSubmit={checkRoots}>
          <h4>{t('ruffini.step3')}</h4>
          {degree <= 2 && done.length > 0 && (
            <p className="faint">{t('ruffini.quadraticLeft', { poly: formatPoly(current) })}</p>
          )}
          <div className="ineq-answer-row">
            <input
              value={answer}
              onChange={(e) => { setAnswer(e.target.value); if (verdict !== 'good') setVerdict(null); }}
              placeholder="-1, 2, 1/2"
              aria-label={t('ruffini.rootsLabel')}
              spellCheck={false}
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary">{t('ineq.check')}</button>
          </div>
          <p className="faint ineq-help">{t('ruffini.rootsHelp')}</p>
          {verdict === 'format' && <p className="feedback bad" role="status">{t('ruffini.rootsFormat')}</p>}
          {verdict === 'bad' && <p className="feedback bad" role="status">{full.complete ? t('ruffini.rootsWrong') : t('ruffini.incomplete')}</p>}
          {verdict === 'good' && (
            <div className="feedback good" role="status">
              <p>{t('ruffini.rootsRight')}</p>
              <p className="rf-mono">{formatPoly(original)} = {formatFactored(full)}</p>
              <p className="rf-mono">x ∈ {'{'}{full.realRoots.map(fmt).join(', ')}{'}'}</p>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

/** The Ruffini table. Interactive cells check themselves; read-only tables show the finished division. */
function RuffiniTable({ poly, r, readOnly, onFinish }: { poly: number[]; r: number; readOnly?: boolean; onFinish?: (res: SyntheticResult) => void }) {
  const { t } = useI18n();
  const res = useMemo(() => synthetic(poly, r), [poly, r]);
  const n = poly.length;
  // Order a learner fills the cells in: bring down, then multiply and add, column by column.
  const order = useMemo(() => {
    const o: string[] = ['b0'];
    for (let i = 1; i < n; i++) o.push(`p${i}`, `b${i}`);
    return o;
  }, [n]);
  const expected = (key: string) => (key[0] === 'p' ? res.products[Number(key.slice(1))]! : res.bottom[Number(key.slice(1))]);
  const [cells, setCells] = useState<Record<string, string>>({});
  const ok = (key: string) => readOnly || (parseNumber(cells[key] ?? '') !== null && near(parseNumber(cells[key]!)!, expected(key)));
  const next = order.find((k) => !ok(k));
  const finished = !next;

  useEffect(() => {
    if (finished && !readOnly) onFinish?.(res);
    // Only when the table becomes complete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function fillNext() {
    if (next) setCells((c) => ({ ...c, [next]: fmt(expected(next)).replace('−', '-') }));
  }

  function cell(key: string) {
    if (readOnly) return <span className="rf-num">{fmt(expected(key))}</span>;
    const value = cells[key] ?? '';
    const parsed = parseNumber(value);
    const state = value === '' ? '' : parsed === null || !near(parsed, expected(key)) ? ' is-bad' : ' is-ok';
    return (
      <input
        className={`rf-cell${state}${key === next ? ' is-next' : ''}`}
        value={value}
        onChange={(e) => setCells((c) => ({ ...c, [key]: e.target.value }))}
        aria-label={key[0] === 'p' ? t('ruffini.cellProduct', { n: Number(key.slice(1)) + 1 }) : t('ruffini.cellSum', { n: Number(key.slice(1)) + 1 })}
        aria-invalid={state === ' is-bad'}
        inputMode="text"
        spellCheck={false}
        autoComplete="off"
      />
    );
  }

  const remainderClass = finished ? (near(res.remainder, 0) ? ' is-zero' : ' is-nonzero') : '';

  return (
    <div className="rf-table-wrap">
      <table className={`rf-table${readOnly ? ' is-readonly' : ''}`}>
        <caption className="sr-only">{t('ruffini.tableCaption', { factor: formatFactor(r) })}</caption>
        <tbody>
          <tr>
            <th scope="row" className="rf-r-cell" />
            {poly.map((c, i) => <td key={i} className="rf-coef"><span className="rf-num">{fmt(c)}</span></td>)}
          </tr>
          <tr className="rf-mid">
            <th scope="row" className="rf-r-cell">{fmt(r)}</th>
            <td />
            {poly.slice(1).map((_, i) => <td key={i}>{cell(`p${i + 1}`)}</td>)}
          </tr>
          <tr className="rf-bottom">
            <th scope="row" className="rf-r-cell" />
            {poly.map((_, i) => (
              <td key={i} className={i === n - 1 ? `rf-rem${remainderClass}` : ''}>{cell(`b${i}`)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {!readOnly && (
        <div className="ineq-tools">
          {!finished && <button type="button" className="btn btn-small" onClick={fillNext}>{t('ruffini.fillNext')}</button>}
          {!finished && next && <span className="faint">{next === 'b0' ? t('ruffini.tipBring') : next[0] === 'p' ? t('ruffini.tipMultiply') : t('ruffini.tipAdd')}</span>}
        </div>
      )}
      {!readOnly && finished && (
        near(res.remainder, 0)
          ? <p className="feedback good" role="status">{t('ruffini.isRoot', { r: fmt(r), quotient: formatPoly(res.quotient) })}</p>
          : <p className="feedback bad" role="status">{t('ruffini.remainderNotZero', { r: fmt(r), rem: fmt(res.remainder) })}</p>
      )}
    </div>
  );
}
