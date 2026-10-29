import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { updateState, useProgress } from '../lib/store';
import {
  compareAnswer, evaluate, formatNumber, formatPieces, holds, InequalityError, parseAnswer, parseExpression, prettySource,
  printIneq, relSign, signChart, solve, solveSystem, type Ineq, type InequalityProblem, type Piece, type Solution,
} from '../lib/inequality';

/**
 * Inequality Lab: solve an inequality, write the answer in interval notation,
 * and test values on a live number line. A sign chart is there when you need it,
 * and the free area below solves any inequality you type.
 */
export default function InequalityLab({ problems }: { problems: InequalityProblem[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [id, setId] = useState(problems[0]?.id);
  const problem = problems.find((p) => p.id === id) ?? problems[0];
  const solved = (pid: string) => Boolean(progress.stepsDone[`ineq:${pid}`]);
  const count = problems.filter((p) => solved(p.id)).length;

  if (!problem) return null;
  return (
    <div className="ineq">
      <p className="muted">{t('ineq.subtitle')}</p>
      <div className="ineq-grid">
        <aside className="ineq-problems" aria-label={t('ineq.problems')}>
          <div className="ineq-problems-head">
            <h3>{t('ineq.problems')}</h3>
            <span className="faint">{t('ineq.solved', { n: count, total: problems.length })}</span>
          </div>
          {[1, 2, 3].map((level) => (
            <div key={level} className="ineq-level">
              <p className="ineq-level-name">{t(`ineq.level${level}`)}</p>
              <ol>
                {problems.filter((p) => p.level === level).map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`ineq-pick${p.id === problem.id ? ' is-current' : ''}${solved(p.id) ? ' is-solved' : ''}`}
                      aria-pressed={p.id === problem.id}
                      title={pick(p.title).text}
                      onClick={() => setId(p.id)}
                    >
                      <span className="ineq-pick-num" aria-hidden="true">{solved(p.id) ? '✓' : problems.indexOf(p) + 1}</span>
                      <span className="ineq-pick-title">{pick(p.title).text}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          {count === problems.length && <p className="celebrate">{t('ineq.allDone')}</p>}
        </aside>

        <ProblemView key={problem.id} problem={problem} solved={solved(problem.id)} />
      </div>

      <OwnInequality />
    </div>
  );
}

function ProblemView({ problem, solved }: { problem: InequalityProblem; solved: boolean }) {
  const { t, pick } = useI18n();
  const solution = useMemo(() => solve(problem.inequality), [problem.inequality]);
  const lines = useMemo(() => prettySource(problem.inequality), [problem.inequality]);
  const parts = useMemo(() => solution.system.map((q) => solveSystem([q]).pieces), [solution]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ tone: 'good' | 'bad'; text: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [probe, setProbe] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const parsed = useMemo(() => (answer.trim() ? parseAnswer(answer) : null), [answer]);
  const showTruth = revealed || solved;
  const single = solution.system.length === 1;

  function check(e: FormEvent) {
    e.preventDefault();
    if (!parsed) { setFeedback({ tone: 'bad', text: t('ineq.unreadable') }); return; }
    const r = compareAnswer(parsed, solution.pieces);
    if (r.ok) {
      setFeedback({ tone: 'good', text: t('ineq.correct') });
      updateState((s) => ({ ...s, stepsDone: { ...s.stepsDone, [`ineq:${problem.id}`]: true } }));
    } else {
      setProbe(r.x);
      const why = explain(solution.system, r.x, t);
      setFeedback({ tone: 'bad', text: `${t(r.inAnswer ? 'ineq.extra' : 'ineq.missing', { x: `x = ${formatNumber(r.x)}` })} ${why}` });
    }
  }

  function insert(sym: string) {
    const el = inputRef.current;
    const start = el?.selectionStart ?? answer.length;
    const end = el?.selectionEnd ?? answer.length;
    const next = answer.slice(0, start) + sym + answer.slice(end);
    setAnswer(next);
    requestAnimationFrame(() => { el?.focus(); el?.setSelectionRange(start + sym.length, start + sym.length); });
  }

  const rows: LineRow[] = [];
  if (!single) solution.system.forEach((q, i) => rows.push({ label: printIneq(q), pieces: parts[i], tone: 'part' }));
  if (parsed) rows.push({ label: t('ineq.yourAnswer'), pieces: parsed, tone: 'answer' });
  if (showTruth) rows.push({ label: t('ineq.solution'), pieces: solution.pieces, tone: 'truth' });

  return (
    <section className="ineq-main">
      <div className="ineq-problem">
        <p className="ineq-problem-title">
          {pick(problem.title).text}
          {solved && <span className="badge badge-good">✓ {t('activity.solved')}</span>}
        </p>
        {problem.context && <p className="ineq-context">{pick(problem.context).text}</p>}
        <div className={`ineq-expr${lines.length > 1 ? ' is-system' : ''}`} aria-label={lines.join('; ')}>
          {lines.map((l) => <span key={l}>{l}</span>)}
        </div>
        <div className="ineq-tools">
          <button type="button" className="btn btn-small" aria-expanded={showHint} onClick={() => setShowHint((v) => !v)}>{t('week.hint')}</button>
          {single && <button type="button" className="btn btn-small" aria-expanded={showChart} onClick={() => setShowChart((v) => !v)}>{t('ineq.chart')}</button>}
          {!showTruth && <button type="button" className="btn btn-small" onClick={() => setRevealed(true)}>{t('ineq.reveal')}</button>}
        </div>
        {showHint && <p className="explain">{pick(problem.hint).text}</p>}
        {showChart && single && <SignChartTable q={solution.system[0]} points={solution.points} factors={problem.factors} />}
      </div>

      <form className="ineq-answer" onSubmit={check}>
        <label htmlFor={`ineq-${problem.id}`}>{t('ineq.answerLabel')}</label>
        <div className="ineq-answer-row">
          <input
            id={`ineq-${problem.id}`}
            ref={inputRef}
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setFeedback(null); }}
            placeholder={t('ineq.answerPlaceholder')}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="text"
          />
          <button type="submit" className="btn btn-primary">{t('ineq.check')}</button>
        </div>
        <div className="ineq-keys" role="group" aria-label={t('ineq.keys')}>
          {['−∞', '∞', '∪', '[', ']', '(', ')', '√', 'ℝ', '∅'].map((k) => (
            <button key={k} type="button" className="token" onClick={() => insert(k === '−∞' ? '-∞' : k)}>{k}</button>
          ))}
        </div>
        <p className="faint ineq-help">{t('ineq.answerHelp')}</p>
        {feedback && <p className={`feedback ${feedback.tone}`} role="status">{feedback.text}</p>}
        {showTruth && <p className="ineq-solution"><span className="faint">{t('ineq.solution')}:</span> <strong>{formatPieces(solution.pieces)}</strong></p>}
      </form>

      <NumberLine rows={rows} points={solution.points} probe={probe} onProbe={setProbe} />
      <Probe system={solution.system} value={probe} onChange={setProbe} />
    </section>
  );
}

function fmtValue(v: number): string {
  if (!Number.isFinite(v)) return '—';
  const f = formatNumber(v);
  return f.length > 8 ? String(Number(v.toFixed(3))).replace('-', '−') : f;
}

/** "4² − 4 − 6 = 6, and 6 ≤ 0 is false." for each inequality at x. */
function explain(system: Ineq[], x: number, t: (k: string, v?: Record<string, string | number>) => string): string {
  return system.map((q) => {
    const l = evaluate(q.lhs, x);
    const r = evaluate(q.rhs, x);
    if (!Number.isFinite(l) || !Number.isFinite(r)) return t('ineq.undefinedAt');
    return `${fmtValue(l)} ${relSign(q.rel)} ${fmtValue(r)} ${t(holds(q, x) ? 'ineq.isTrue' : 'ineq.isFalse')}.`;
  }).join(' ');
}

function Probe({ system, value, onChange }: { system: Ineq[]; value: number | null; onChange: (x: number | null) => void }) {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const typing = useRef(false);
  // Show values picked on the number line, but never rewrite what is being typed.
  useEffect(() => {
    if (typing.current) { typing.current = false; return; }
    if (value !== null) setText(fmtValue(value).replace('−', '-'));
  }, [value]);
  return (
    <div className="ineq-probe">
      <label>
        <span>{t('ineq.probe')}</span>
        <input
          value={text}
          inputMode="decimal"
          placeholder="x"
          onChange={(e) => {
            setText(e.target.value);
            try {
              const v = evaluate(parseExpression(e.target.value), 0);
              if (Number.isFinite(v)) { typing.current = true; onChange(v); }
            } catch { /* keep the last value while typing */ }
          }}
        />
      </label>
      {value === null ? (
        <p className="faint">{t('ineq.probeHelp')}</p>
      ) : (
        <ul>
          {system.map((q, i) => {
            const l = evaluate(q.lhs, value);
            const r = evaluate(q.rhs, value);
            const ok = holds(q, value);
            const defined = Number.isFinite(l) && Number.isFinite(r);
            return (
              <li key={i} className={ok ? 'is-true' : 'is-false'}>
                <span className="ineq-probe-mark" aria-hidden="true">{ok ? '✓' : '✗'}</span>
                <span>
                  <code>{printIneq(q)}</code>{' '}
                  {defined
                    ? <>→ <code>{fmtValue(l)} {relSign(q.rel)} {fmtValue(r)}</code> {t(ok ? 'ineq.isTrue' : 'ineq.isFalse')}</>
                    : <>→ {t('ineq.undefinedAt')}</>}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SignChartTable({ q, points, factors }: { q: Ineq; points: number[]; factors?: string[] }) {
  const { t } = useI18n();
  const chart = useMemo(() => signChart(q, points, factors), [q, points, factors]);
  const sign = (s: -1 | 0 | 1 | null) => (s === null ? '∄' : s === 0 ? '0' : s > 0 ? '+' : '−');
  return (
    <div className="ineq-chart-wrap">
      <table className="ineq-chart">
        <caption className="sr-only">{t('ineq.chart')}</caption>
        <thead>
          <tr>
            <th scope="col">x</th>
            {chart.columns.map((c, i) => <th key={i} scope="col" className={c.kind === 'point' ? 'is-point' : ''}>{c.label}</th>)}
          </tr>
          <tr className="ineq-chart-test">
            <th scope="row">{t('ineq.test')}</th>
            {chart.columns.map((c, i) => <td key={i} className={c.kind === 'point' ? 'is-point' : ''}>{c.kind === 'gap' ? fmtValue(c.x) : ''}</td>)}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((r, i) => (
            <tr key={i} className={i === chart.rows.length - 1 ? 'is-total' : ''}>
              <th scope="row"><code>{r.label}</code></th>
              {r.signs.map((s, j) => <td key={j} className={`${chart.columns[j].kind === 'point' ? 'is-point ' : ''}sign-${s === null ? 'none' : s}`}>{sign(s)}</td>)}
            </tr>
          ))}
          <tr className="ineq-chart-holds">
            <th scope="row">{t('ineq.holds')}</th>
            {chart.holds.map((h, i) => <td key={i} className={`${chart.columns[i].kind === 'point' ? 'is-point ' : ''}${h ? 'is-yes' : 'is-no'}`}>{h ? '✓' : '✗'}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

interface LineRow {
  label: string;
  pieces: Piece[];
  tone: 'answer' | 'truth' | 'part';
}

const STEPS = [0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50, 100, 200];

/** A number line that draws each row's intervals; click or drag to test a value. */
function NumberLine({ rows, points, probe, onProbe }: { rows: LineRow[]; points: number[]; probe: number | null; onProbe: (x: number) => void }) {
  const { t } = useI18n();
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    // Measure now, then follow resizes (observers can be late in background tabs).
    setWidth(Math.max(260, Math.round(el.clientWidth)));
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const finite = [...points, ...rows.flatMap((r) => r.pieces.flatMap((p) => [p.lo, p.hi]))].filter(Number.isFinite);
  let lo = finite.length ? Math.min(...finite) : -4;
  let hi = finite.length ? Math.max(...finite) : 4;
  if (hi - lo < 2) { lo -= 2; hi += 2; }
  const pad = Math.max(1, (hi - lo) * 0.2);
  lo -= pad;
  hi += pad;
  const maxTicks = Math.max(4, Math.floor(width / 70));
  const step = STEPS.find((s) => (hi - lo) / s <= maxTicks) ?? 500;

  const left = 16;
  const right = width - 16;
  const sx = (x: number) => left + ((Math.min(Math.max(x, lo), hi) - lo) / (hi - lo)) * (right - left);
  const axisY = 34;
  const rowH = 46;
  const height = axisY + 26 + rows.length * rowH + 6;

  const ticks: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));

  function pick(clientX: number) {
    const el = box.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = lo + ((clientX - rect.left - left) / (right - left)) * (hi - lo);
    const snapTo = step / 4;
    // Snap to a critical point when close, so its exact value can be tested.
    const near = points.find((p) => Math.abs(p - x) < snapTo / 2);
    onProbe(near ?? Math.round(x / snapTo) * snapTo);
  }

  return (
    <div
      className="numline"
      ref={box}
      onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); pick(e.clientX); }}
      onPointerMove={(e) => { if (e.buttons) pick(e.clientX); }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={rows.map((r) => `${r.label}: ${formatPieces(r.pieces)}`).join('; ') || t('ineq.probeHelp')}>
        <line className="nl-axis" x1={left} x2={right} y1={axisY} y2={axisY} />
        {ticks.map((v) => (
          <g key={v}>
            <line className="nl-tick" x1={sx(v)} x2={sx(v)} y1={axisY - 4} y2={axisY + 4} />
            <text className="nl-tick-label" x={sx(v)} y={axisY - 10} textAnchor="middle">{String(v).replace('-', '−')}</text>
          </g>
        ))}
        {points.filter((p) => p > lo && p < hi).map((p) => (
          <g key={p}>
            <line className="nl-guide" x1={sx(p)} x2={sx(p)} y1={axisY} y2={height - 4} />
            <text className="nl-crit" x={sx(p)} y={axisY + 18} textAnchor="middle">{formatNumber(p)}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = axisY + 26 + i * rowH + 26;
          return (
            <g key={`${r.tone}-${i}`} className={`nl-row tone-${r.tone}`}>
              <text className="nl-row-label" x={left} y={y - 12}>{r.label}</text>
              <line className="nl-base" x1={left} x2={right} y1={y} y2={y} />
              {r.pieces.map((p, j) => (
                <g key={j}>
                  {p.lo !== p.hi && <line className="nl-seg" x1={sx(p.lo)} x2={sx(p.hi)} y1={y} y2={y} />}
                  {p.lo === -Infinity && <path className="nl-arrow" d={`M${left - 2},${y} l9,-6 v12 z`} />}
                  {p.hi === Infinity && <path className="nl-arrow" d={`M${right + 2},${y} l-9,-6 v12 z`} />}
                  {Number.isFinite(p.lo) && <circle className={p.loIn ? 'nl-dot is-closed' : 'nl-dot'} cx={sx(p.lo)} cy={y} r={5.5} />}
                  {Number.isFinite(p.hi) && p.hi !== p.lo && <circle className={p.hiIn ? 'nl-dot is-closed' : 'nl-dot'} cx={sx(p.hi)} cy={y} r={5.5} />}
                </g>
              ))}
            </g>
          );
        })}
        {probe !== null && probe >= lo && probe <= hi && (
          <g className="nl-probe">
            <line x1={sx(probe)} x2={sx(probe)} y1={axisY - 2} y2={height - 2} />
            <circle cx={sx(probe)} cy={axisY} r={4} />
          </g>
        )}
      </svg>
    </div>
  );
}

/** Free area: type any inequality and see its solution, line, and sign chart. */
function OwnInequality() {
  const { t } = useI18n();
  // Labs link here with ?q=<inequality> so a step can be checked in one click.
  const [params] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [src, setSrc] = useState(initial);
  const [result, setResult] = useState<{ solution: Solution } | { error: string } | null>(null);
  const [probe, setProbe] = useState<number | null>(null);
  const box = useRef<HTMLElement>(null);

  function solveText(text: string) {
    try {
      setResult({ solution: solve(text) });
      setProbe(null);
    } catch (err) {
      setResult({ error: err instanceof InequalityError ? t(`ineq.err.${err.code}`) : t('ineq.err.syntax') });
    }
  }

  useEffect(() => {
    if (!initial) return;
    solveText(initial);
    box.current?.scrollIntoView({ block: 'start' });
    // Run once for the linked inequality.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  function run(e: FormEvent) {
    e.preventDefault();
    solveText(src);
  }

  const solution = result && 'solution' in result ? result.solution : null;
  return (
    <section className="ineq-own" ref={box}>
      <h3>{t('ineq.own')}</h3>
      <p className="faint">{t('ineq.ownHelp')}</p>
      <form className="ineq-answer-row" onSubmit={run}>
        <input value={src} onChange={(e) => setSrc(e.target.value)} placeholder={t('ineq.ownPlaceholder')} aria-label={t('ineq.own')} autoComplete="off" spellCheck={false} />
        <button type="submit" className="btn btn-primary">{t('ineq.solve')}</button>
      </form>
      {result && 'error' in result && <p className="feedback bad" role="status">{result.error}</p>}
      {solution && (
        <>
          <p className="ineq-solution" role="status">
            <span className="faint">{t('ineq.solution')}:</span> <strong>{formatPieces(solution.pieces)}</strong>
            <span className="faint"> · {t('ineq.critical')}: {solution.points.length ? solution.points.map(formatNumber).join(', ') : t('ineq.none')}</span>
          </p>
          <NumberLine rows={[{ label: t('ineq.solution'), pieces: solution.pieces, tone: 'truth' }]} points={solution.points} probe={probe} onProbe={setProbe} />
          <Probe system={solution.system} value={probe} onChange={setProbe} />
          {solution.system.length === 1 && solution.points.length <= 8 && <SignChartTable q={solution.system[0]} points={solution.points} />}
        </>
      )}
    </section>
  );
}
