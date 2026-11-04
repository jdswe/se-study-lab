import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { updateState } from '../lib/store';
import { InequalityError, evaluate, type Node } from '../lib/inequality';
import { inRegion, niceStep, parabolaFacts, parseGraphItem, short, type GraphItem, type GraphPreset } from '../lib/graph';

interface View { xmin: number; xmax: number; ymin: number; ymax: number }
interface Row { id: number; text: string; on: boolean }

const COLORS = ['#2F6F73', '#C0704F', '#3A4E74', '#B98A3E', '#5E8C7A'];
const DEFAULT_VIEW: View = { xmin: -6, xmax: 6, ymin: -6, ymax: 7 };
const MAX_ROWS = 5;
let nextId = 1;
const row = (text: string): Row => ({ id: nextId++, text, on: true });

/**
 * Graph Lab: a small graphing calculator for the week. Plot functions,
 * shade inequalities in two variables, and explore y = ax² + bx + c with
 * sliders that show the vertex, axis, roots, and sign. Drag to move the view;
 * Ctrl/⌘ + scroll or the buttons to zoom.
 */
export default function GraphLab({ presets }: { presets: GraphPreset[] }) {
  const { t, pick } = useI18n();
  const [params] = useSearchParams();
  const linked = params.get('q');
  const first = presets[0];
  const [presetId, setPresetId] = useState<string | null>(linked ? null : first?.id ?? null);
  const [rows, setRows] = useState<Row[]>(() => (linked ? linked.split(';').map((s) => row(s.trim())) : (first?.items ?? []).map(row)));
  const [parabola, setParabola] = useState(linked ? null : first?.parabola ?? null);
  const [showSign, setShowSign] = useState(Boolean(!linked && first?.showSign));
  const [view, setView] = useState<View>((!linked && first?.view) || DEFAULT_VIEW);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ w: 640, h: 420 });
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ px: number; py: number; view: View } | null>(null);

  const parsed = useMemo(() => rows.map((r) => {
    try {
      return { row: r, item: parseGraphItem(r.text) as GraphItem | null, error: null as string | null };
    } catch (e) {
      return { row: r, item: null, error: r.text.trim() ? t(`ineq.err.${e instanceof InequalityError ? e.code : 'syntax'}`) : null };
    }
  }), [rows, t]);

  const facts = parabola ? parabolaFacts(parabola.a, parabola.b, parabola.c) : null;

  function loadPreset(p: GraphPreset) {
    setPresetId(p.id);
    setRows(p.items.map(row));
    setParabola(p.parabola ?? null);
    setShowSign(Boolean(p.showSign));
    setView(p.view ?? DEFAULT_VIEW);
    updateState((s) => ({ ...s, stepsDone: { ...s.stepsDone, [`graph:${p.id}`]: true } }));
  }

  // The first preset counts as explored once the lab is opened on it.
  useEffect(() => {
    if (presetId) updateState((s) => (s.stepsDone[`graph:${presetId}`] ? s : { ...s, stepsDone: { ...s.stepsDone, [`graph:${presetId}`]: true } }));
    // Only on first open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Size follows the tool's column, measured now and on every resize.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = (w: number) => setSize({ w: Math.max(260, Math.round(w)), h: Math.round(Math.min(460, Math.max(260, w * 0.62))) });
    measure(el.clientWidth);
    const ro = new ResizeObserver(([e]) => measure(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toPx = useCallback((x: number) => ((x - view.xmin) / (view.xmax - view.xmin)) * size.w, [view, size.w]);
  const toPy = useCallback((y: number) => size.h - ((y - view.ymin) / (view.ymax - view.ymin)) * size.h, [view, size.h]);
  const toX = useCallback((px: number) => view.xmin + (px / size.w) * (view.xmax - view.xmin), [view, size.w]);
  const toY = useCallback((py: number) => view.ymin + ((size.h - py) / size.h) * (view.ymax - view.ymin), [view, size.h]);

  // ---- drawing ----
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = size.w * dpr;
    c.height = size.h * dpr;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const css = getComputedStyle(c);
    const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const ink = v('--ink', '#1F2A36');
    const soft = v('--ink-faint', '#7A828C');
    const line = v('--line', '#DDD3C0');
    const panel = v('--panel', '#FFFDF8');
    const accent = v('--subject', '#7A6A8C');
    const good = v('--good', '#3E7D5A');
    const bad = v('--bad', '#A9473D');
    const { w, h } = size;

    ctx.fillStyle = panel;
    ctx.fillRect(0, 0, w, h);

    // Grid and axes.
    const sx = niceStep(view.xmax - view.xmin, Math.max(4, w / 70));
    const sy = niceStep(view.ymax - view.ymin, Math.max(4, h / 50));
    ctx.lineWidth = 1;
    ctx.strokeStyle = line;
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = soft;
    const x0 = Math.min(Math.max(toPx(0), 0), w);
    const y0 = Math.min(Math.max(toPy(0), 0), h);
    for (let gx = Math.ceil(view.xmin / sx) * sx; gx <= view.xmax; gx += sx) {
      const px = Math.round(toPx(gx)) + 0.5;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
      if (Math.abs(gx) > sx / 2) ctx.fillText(short(gx), px + 3, Math.min(h - 4, Math.max(12, y0 + 13)));
    }
    for (let gy = Math.ceil(view.ymin / sy) * sy; gy <= view.ymax; gy += sy) {
      const py = Math.round(toPy(gy)) + 0.5;
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
      if (Math.abs(gy) > sy / 2) ctx.fillText(short(gy), Math.min(w - 30, Math.max(3, x0 + 4)), py - 3);
    }
    ctx.strokeStyle = soft;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, toPy(0)); ctx.lineTo(w, toPy(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toPx(0), 0); ctx.lineTo(toPx(0), h); ctx.stroke();

    const curve = (f: Node, color: string, width: number, dash: number[] = []) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.beginPath();
      let pen = false;
      let lastPy = 0;
      for (let px = 0; px <= w; px += 1) {
        const yv = evaluate(f, toX(px));
        const py = toPy(yv);
        if (!Number.isFinite(yv) || Math.abs(py) > h * 20 || (pen && Math.abs(py - lastPy) > h * 3)) { pen = false; continue; }
        if (pen) ctx.lineTo(px, py); else { ctx.moveTo(px, py); pen = true; }
        lastPy = py;
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Regions first, so curves sit on top.
    parsed.forEach(({ row: r, item }, i) => {
      if (!r.on || item?.kind !== 'region') return;
      ctx.fillStyle = COLORS[i % COLORS.length] + '2E';
      const cell = 5;
      for (let py = 0; py < h; py += cell) {
        for (let px = 0; px < w; px += cell) {
          if (inRegion(item, toX(px + cell / 2), toY(py + cell / 2))) ctx.fillRect(px, py, cell, cell);
        }
      }
    });
    parsed.forEach(({ row: r, item }, i) => {
      if (!r.on || !item) return;
      const color = COLORS[i % COLORS.length];
      if (item.kind === 'curve') curve(item.f, color, 2.5);
      else if (item.boundary) curve(item.boundary, color, 2, item.strict ? [7, 6] : []);
    });

    // Parabola explorer.
    if (parabola) {
      const { a, b, c: cc } = parabola;
      const node: Node = { k: 'bin', op: '+', a: { k: 'bin', op: '+', a: { k: 'bin', op: '*', a: { k: 'num', v: a }, b: { k: 'bin', op: '^', a: { k: 'x' }, b: { k: 'num', v: 2 } } }, b: { k: 'bin', op: '*', a: { k: 'num', v: b }, b: { k: 'x' } } }, b: { k: 'num', v: cc } };
      if (showSign && facts) {
        const cuts = [view.xmin, ...facts.roots.filter((r) => r > view.xmin && r < view.xmax), view.xmax];
        for (let i = 0; i < cuts.length - 1; i++) {
          const mid = (cuts[i] + cuts[i + 1]) / 2;
          const val = a * mid * mid + b * mid + cc;
          ctx.strokeStyle = val > 0 ? good : bad;
          ctx.lineWidth = 6;
          ctx.globalAlpha = 0.75;
          ctx.beginPath(); ctx.moveTo(toPx(cuts[i]), toPy(0)); ctx.lineTo(toPx(cuts[i + 1]), toPy(0)); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      curve(node, accent, 3.5);
      if (facts) {
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(toPx(facts.vertex.x), 0); ctx.lineTo(toPx(facts.vertex.x), h); ctx.stroke();
        ctx.setLineDash([]);
        const dot = (x: number, y: number, fill: string, hollow = false) => {
          ctx.beginPath(); ctx.arc(toPx(x), toPy(y), 5.5, 0, Math.PI * 2);
          ctx.fillStyle = hollow ? panel : fill; ctx.fill();
          ctx.lineWidth = 2; ctx.strokeStyle = fill; ctx.stroke();
        };
        facts.roots.forEach((r) => dot(r, 0, bad));
        dot(0, facts.yIntercept, ink, true);
        dot(facts.vertex.x, facts.vertex.y, accent);
        ctx.fillStyle = ink;
        ctx.font = '600 12px Poppins, sans-serif';
        ctx.fillText(`V(${short(facts.vertex.x)}, ${short(facts.vertex.y)})`, toPx(facts.vertex.x) + 8, toPy(facts.vertex.y) + (facts.opensUp ? 18 : -10));
      }
    }

    // Hover readout.
    if (hover && !drag.current) {
      const hx = toPx(hover.x);
      const hy = toPy(hover.y);
      ctx.strokeStyle = soft;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(hx, 0); ctx.lineTo(hx, h); ctx.moveTo(0, hy); ctx.lineTo(w, hy); ctx.stroke();
      ctx.setLineDash([]);
      const label = `(${short(hover.x)}, ${short(hover.y)})`;
      ctx.font = '12px "JetBrains Mono", monospace';
      const tw = ctx.measureText(label).width + 12;
      const bx = Math.min(w - tw - 4, hx + 8);
      const by = Math.max(4, hy - 26);
      ctx.fillStyle = panel;
      ctx.strokeStyle = line;
      ctx.fillRect(bx, by, tw, 20);
      ctx.strokeRect(bx + 0.5, by + 0.5, tw, 20);
      ctx.fillStyle = ink;
      ctx.fillText(label, bx + 6, by + 14);
    }
  }, [parsed, parabola, facts, showSign, view, size, hover, toPx, toPy, toX, toY]);

  // ---- interaction ----
  function zoom(factor: number, cx = (view.xmin + view.xmax) / 2, cy = (view.ymin + view.ymax) / 2) {
    setView((vw) => ({
      xmin: cx - (cx - vw.xmin) * factor, xmax: cx + (vw.xmax - cx) * factor,
      ymin: cy - (cy - vw.ymin) * factor, ymax: cy + (vw.ymax - cy) * factor,
    }));
  }

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const onWheel = (e: WheelEvent) => {
      // Plain scrolling keeps scrolling the page; Ctrl/⌘ (and trackpad pinch) zooms.
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = c.getBoundingClientRect();
      zoom(e.deltaY > 0 ? 1.15 : 1 / 1.15, toX(e.clientX - rect.left), toY(e.clientY - rect.top));
    };
    c.addEventListener('wheel', onWheel, { passive: false });
    return () => c.removeEventListener('wheel', onWheel);
  });

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, view };
  }
  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const d = drag.current;
    if (d) {
      const dx = ((e.clientX - d.px) / size.w) * (d.view.xmax - d.view.xmin);
      const dy = ((e.clientY - d.py) / size.h) * (d.view.ymax - d.view.ymin);
      setView({ xmin: d.view.xmin - dx, xmax: d.view.xmax - dx, ymin: d.view.ymin + dy, ymax: d.view.ymax + dy });
    } else {
      setHover({ x: toX(e.clientX - rect.left), y: toY(e.clientY - rect.top) });
    }
  }
  function onKey(e: React.KeyboardEvent) {
    const stepX = (view.xmax - view.xmin) / 10;
    const stepY = (view.ymax - view.ymin) / 10;
    const pan: Record<string, [number, number]> = { ArrowLeft: [-stepX, 0], ArrowRight: [stepX, 0], ArrowUp: [0, stepY], ArrowDown: [0, -stepY] };
    if (pan[e.key]) {
      e.preventDefault();
      const [dx, dy] = pan[e.key];
      setView((vw) => ({ xmin: vw.xmin + dx, xmax: vw.xmax + dx, ymin: vw.ymin + dy, ymax: vw.ymax + dy }));
    } else if (e.key === '+' || e.key === '=') zoom(1 / 1.25);
    else if (e.key === '-') zoom(1.25);
  }

  // What the hovered x gives on the first visible curve, for the readout.
  const firstCurve = parsed.find((p) => p.row.on && p.item?.kind === 'curve')?.item as Extract<GraphItem, { kind: 'curve' }> | undefined;
  const preset = presets.find((p) => p.id === presetId);
  const formula = parabola ? `y = ${short(parabola.a)}x² ${parabola.b < 0 ? '−' : '+'} ${short(Math.abs(parabola.b))}x ${parabola.c < 0 ? '−' : '+'} ${short(Math.abs(parabola.c))}` : '';

  return (
    <div className="graphlab">
      <p className="muted">{t('graph.subtitle')}</p>

      <div className="graphlab-presets" role="group" aria-label={t('graph.presets')}>
        {presets.map((p) => (
          <button key={p.id} type="button" className={`token${p.id === presetId ? ' is-current' : ''}`} aria-pressed={p.id === presetId} onClick={() => loadPreset(p)}>{pick(p.title).text}</button>
        ))}
      </div>
      {preset && <p className="graphlab-note">{pick(preset.note).text}</p>}

      <div className="graphlab-grid">
        <section className="graphlab-panel" aria-label={t('graph.expressions')}>
          <h3>{t('graph.expressions')}</h3>
          <ul className="graphlab-rows">
            {parsed.map(({ row: r, error }, i) => (
              <li key={r.id}>
                <span className="graphlab-swatch" style={{ background: COLORS[i % COLORS.length] }} aria-hidden="true" />
                <input
                  value={r.text}
                  aria-label={`${t('graph.expression')} ${i + 1}`}
                  placeholder="y = x^2 - 4"
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => { const text = e.target.value; setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, text } : x))); setPresetId(null); }}
                />
                <button type="button" className="icon-btn" aria-pressed={r.on} aria-label={t(r.on ? 'graph.hide' : 'graph.show')} title={t(r.on ? 'graph.hide' : 'graph.show')} onClick={() => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))}>{r.on ? '●' : '○'}</button>
                <button type="button" className="icon-btn" aria-label={t('graph.remove')} title={t('graph.remove')} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}>✕</button>
                {error && <p className="graphlab-error">{error}</p>}
              </li>
            ))}
          </ul>
          {rows.length < MAX_ROWS && <button type="button" className="btn btn-small" onClick={() => setRows((rs) => [...rs, row('')])}>+ {t('graph.add')}</button>}
          <p className="faint graphlab-help">{t('graph.help')}</p>

          <label className="graphlab-toggle">
            <input type="checkbox" checked={Boolean(parabola)} onChange={(e) => setParabola(e.target.checked ? { a: 1, b: 0, c: -4 } : null)} />
            {t('graph.explorer')}
          </label>
          {parabola && (
            <div className="graphlab-explorer">
              <p className="graphlab-formula">{formula}</p>
              {(['a', 'b', 'c'] as const).map((k) => (
                <label key={k} className="graphlab-slider">
                  <span>{k} = <b>{short(parabola[k])}</b></span>
                  <input type="range" min={k === 'a' ? -3 : -10} max={k === 'a' ? 3 : 10} step={k === 'a' ? 0.1 : 0.5} value={parabola[k]}
                    onChange={(e) => { const val = Number(e.target.value); setParabola((p) => (p ? { ...p, [k]: val } : p)); setPresetId(null); }} />
                </label>
              ))}
              <label className="graphlab-toggle">
                <input type="checkbox" checked={showSign} onChange={(e) => setShowSign(e.target.checked)} />
                {t('graph.sign')}
              </label>
              {facts ? (
                <dl className="graphlab-facts">
                  <div><dt>{t('graph.opens')}</dt><dd>{t(facts.opensUp ? 'graph.up' : 'graph.down')}</dd></div>
                  <div><dt>{t('graph.vertex')}</dt><dd>({short(facts.vertex.x)}, {short(facts.vertex.y)}) · {t(facts.opensUp ? 'graph.min' : 'graph.max')}</dd></div>
                  <div><dt>{t('graph.axis')}</dt><dd>x = {short(facts.vertex.x)}</dd></div>
                  <div><dt>Δ</dt><dd>{short(facts.discriminant)}</dd></div>
                  <div><dt>{t('graph.roots')}</dt><dd>{facts.roots.length ? facts.roots.map(short).join(', ') : t('graph.noRoots')}</dd></div>
                  <div><dt>{t('graph.yIntercept')}</dt><dd>(0, {short(facts.yIntercept)})</dd></div>
                </dl>
              ) : <p className="faint">{t('graph.aZero')}</p>}
            </div>
          )}
        </section>

        <section className="graphlab-stage">
          <div className="graphlab-canvas" ref={wrap}>
            <canvas
              ref={canvas}
              style={{ width: size.w, height: size.h }}
              tabIndex={0}
              role="img"
              aria-label={t('graph.canvasLabel', { n: rows.filter((r) => r.on).length + (parabola ? 1 : 0) })}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={() => { drag.current = null; }}
              onPointerLeave={() => { if (!drag.current) setHover(null); }}
              onKeyDown={onKey}
            />
          </div>
          <div className="graphlab-bar">
            <span className="faint graphlab-readout" aria-live="polite">
              {hover ? `x = ${short(hover.x)}, y = ${short(hover.y)}${firstCurve ? ` · f(x) = ${short(evaluate(firstCurve.f, hover.x))}` : ''}` : t('graph.hint')}
            </span>
            <span className="graphlab-zoom">
              <button type="button" className="btn btn-small" aria-label={t('graph.zoomIn')} onClick={() => zoom(1 / 1.25)}>+</button>
              <button type="button" className="btn btn-small" aria-label={t('graph.zoomOut')} onClick={() => zoom(1.25)}>−</button>
              <button type="button" className="btn btn-small" onClick={() => setView(preset?.view ?? DEFAULT_VIEW)}>{t('graph.reset')}</button>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
