import { useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import type { Cardinality, StudioScenario } from '../content/db1-week1/studio';
import { checkDesign, emptyDesign, foreignKeys, solutionDesign, toDrawio, type Design, type Issue } from '../lib/erDesign';
import { updateState, useProgress } from '../lib/store';

const CARDS: Cardinality[] = ['1:N', '1:1', 'N:M'];
const BOX_W = 200;
const ROW_H = 22;

/**
 * Design Studio: pick the entities a scenario needs, choose primary keys, draw
 * relationships with their cardinality, check the design against a model
 * solution, and export it to draw.io.
 */
export default function DesignStudio({ scenarios: SCENARIOS }: { scenarios: StudioScenario[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [designs, setDesigns] = useState<Record<string, Design>>({});
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [rel, setRel] = useState<{ from: string; to: string; card: Cardinality }>({ from: '', to: '', card: '1:N' });

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];
  const design = designs[scenario.id] ?? emptyDesign();
  const nameOf = (id: string) => pick(scenario.entities.find((e) => e.id === id)?.name ?? { en: id }).text;

  function update(fn: (d: Design) => Design) {
    setDesigns((all) => ({ ...all, [scenario.id]: fn(all[scenario.id] ?? emptyDesign()) }));
    setIssues(null);
  }

  function toggleEntity(id: string) {
    update((d) => d.entities.includes(id)
      ? { entities: d.entities.filter((e) => e !== id), pks: Object.fromEntries(Object.entries(d.pks).filter(([k]) => k !== id)), relations: d.relations.filter((r) => r.from !== id && r.to !== id) }
      : { ...d, entities: [...d.entities, id] });
  }

  function addRelation() {
    if (!rel.from || !rel.to || rel.from === rel.to) return;
    update((d) => ({ ...d, relations: [...d.relations.filter((r) => !((r.from === rel.from && r.to === rel.to) || (r.from === rel.to && r.to === rel.from))), { ...rel }] }));
  }

  function check() {
    const result = checkDesign(design, scenario);
    setIssues(result);
    if (result.every((i) => i.ok)) {
      updateState((s) => ({ ...s, stepsDone: { ...s.stepsDone, [`studio:${scenario.id}`]: true } }));
    }
  }

  function exportDrawio() {
    const xmlText = toDrawio(design.entities.length ? design : solutionDesign(scenario), scenario, nameOf, pick(scenario.title).text);
    const blob = new Blob([xmlText], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scenario.id}.drawio`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Simple grid layout for the canvas.
  const layout = useMemo(() => {
    const pos = new Map<string, { x: number; y: number; h: number }>();
    design.entities.forEach((id, i) => {
      const e = scenario.entities.find((x) => x.id === id);
      const h = 34 + (e?.attributes.length ?? 0) * ROW_H;
      pos.set(id, { x: 20 + (i % 3) * 250, y: 20 + Math.floor(i / 3) * 200, h });
    });
    return pos;
  }, [design.entities, scenario]);
  const canvasH = Math.max(240, ...[...layout.values()].map((p) => p.y + p.h + 30));

  const message = (i: Issue): string => {
    const vars = { entity: i.entity ? nameOf(i.entity) : '', a: i.a ? nameOf(i.a) : '', b: i.b ? nameOf(i.b) : '', card: i.card ?? '' };
    const base = t(`studio.issue.${i.kind}`, vars);
    if (i.kind === 'distractor') {
      const why = scenario.entities.find((e) => e.id === i.entity)?.distractor;
      return why ? `${base} ${pick(why).text}` : base;
    }
    if (i.kind === 'wrongPk') {
      const e = scenario.entities.find((x) => x.id === i.entity);
      return `${base} (${design.pks[i.entity ?? '']})`.replace(' ()', '') + (e ? '' : '');
    }
    return base;
  };

  const score = issues ? Math.round((issues.filter((i) => i.ok).length / Math.max(1, issues.length)) * 100) : 0;
  const allOk = issues !== null && issues.every((i) => i.ok);

  return (
    <div className="studio">
      <p className="muted">{t('studio.subtitle')}</p>

      <div className="chips studio-scenarios" role="group" aria-label={t('studio.scenario')}>
        {SCENARIOS.map((s) => (
          <button key={s.id} type="button" className="chip" aria-pressed={s.id === scenario.id} onClick={() => { setScenarioId(s.id); setIssues(null); setRel({ from: '', to: '', card: '1:N' }); }}>
            {progress.stepsDone[`studio:${s.id}`] ? '✓ ' : ''}{pick(s.title).text}
          </button>
        ))}
      </div>

      <section className="card studio-brief">
        <p className="eyebrow">{t('studio.brief')}</p>
        <p>{pick(scenario.brief).text}</p>
      </section>

      <div className="studio-grid">
        <aside className="card studio-palette" aria-label={t('studio.palette')}>
          <h2>{t('studio.palette')}</h2>
          <p className="faint">{t('studio.paletteHelp')}</p>
          {scenario.entities.map((e) => {
            const on = design.entities.includes(e.id);
            return (
              <div key={e.id} className={`studio-entity ${on ? 'is-on' : ''}`}>
                <div className="studio-entity-head">
                  <strong>{pick(e.name).text}</strong>
                  <button type="button" className={`btn btn-small ${on ? '' : 'btn-primary'}`} onClick={() => toggleEntity(e.id)}>
                    {on ? t('studio.remove') : t('studio.add')}
                  </button>
                </div>
                <div className="studio-attrs">
                  {(e.keyOptions ?? e.attributes).map((a) => (
                    <button
                      key={a}
                      type="button"
                      className="token"
                      disabled={!on}
                      aria-pressed={design.pks[e.id] === a}
                      title={t('studio.setKey')}
                      onClick={() => update((d) => ({ ...d, pks: { ...d.pks, [e.id]: a } }))}
                    >
                      {design.pks[e.id] === a ? '🔑 ' : ''}{a}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </aside>

        <section className="studio-main">
          <div className="card studio-canvas-card">
            <h2>{t('studio.canvas')}</h2>
            {design.entities.length === 0 ? (
              <p className="empty">{t('studio.canvasEmpty')}</p>
            ) : (
              <div className="studio-canvas-scroll">
                <svg className="studio-canvas" viewBox={`0 0 780 ${canvasH}`} role="img" aria-label={t('studio.canvas')}>
                  {design.relations.map((r, i) => {
                    const a = layout.get(r.from);
                    const b = layout.get(r.to);
                    if (!a || !b) return null;
                    const ax = a.x + BOX_W / 2, ay = a.y + a.h / 2, bx = b.x + BOX_W / 2, by = b.y + b.h / 2;
                    const [la, lb] = r.card === '1:1' ? ['1', '1'] : r.card === '1:N' ? ['1', 'N'] : ['N', 'M'];
                    return (
                      <g key={i} className={`studio-rel card-${r.card.replace(':', '')}`}>
                        <line x1={ax} y1={ay} x2={bx} y2={by} />
                        <text x={ax + (bx - ax) * 0.3} y={ay + (by - ay) * 0.3 - 6}>{la}</text>
                        <text x={ax + (bx - ax) * 0.7} y={ay + (by - ay) * 0.7 - 6}>{lb}</text>
                      </g>
                    );
                  })}
                  {design.entities.map((id) => {
                    const p = layout.get(id)!;
                    const e = scenario.entities.find((x) => x.id === id)!;
                    const pkCols = (design.pks[id] ?? '').split(' + ');
                    const fks = foreignKeys(design, scenario, id);
                    return (
                      <g key={id} className={`studio-table ${e.distractor ? 'is-distractor' : ''}`}>
                        <rect x={p.x} y={p.y} width={BOX_W} height={p.h} rx={12} className="st-body" />
                        <rect x={p.x} y={p.y} width={BOX_W} height={30} rx={12} className="st-head" />
                        <rect x={p.x} y={p.y + 18} width={BOX_W} height={12} className="st-head" />
                        <text x={p.x + BOX_W / 2} y={p.y + 20} textAnchor="middle" className="st-title">{pick(e.name).text}</text>
                        {e.attributes.map((a, j) => (
                          <text key={a} x={p.x + 12} y={p.y + 50 + j * ROW_H} className={`st-attr ${pkCols.includes(a) ? 'is-pk' : ''}`}>
                            {pkCols.includes(a) ? '🔑 ' : fks.has(a) ? '↗ ' : ''}{a}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          <div className="card studio-relations">
            <h2>{t('studio.relations')}</h2>
            <div className="studio-rel-builder">
              <select aria-label={t('studio.from')} value={rel.from} onChange={(e) => setRel((r) => ({ ...r, from: e.target.value }))}>
                <option value="">{t('studio.from')}</option>
                {design.entities.map((id) => <option key={id} value={id}>{nameOf(id)}</option>)}
              </select>
              <select aria-label={t('studio.cardinality')} value={rel.card} onChange={(e) => setRel((r) => ({ ...r, card: e.target.value as Cardinality }))}>
                {CARDS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select aria-label={t('studio.to')} value={rel.to} onChange={(e) => setRel((r) => ({ ...r, to: e.target.value }))}>
                <option value="">{t('studio.to')}</option>
                {design.entities.map((id) => <option key={id} value={id}>{nameOf(id)}</option>)}
              </select>
              <button type="button" className="btn btn-small btn-primary" onClick={addRelation} disabled={!rel.from || !rel.to || rel.from === rel.to}>{t('studio.addRelation')}</button>
            </div>
            <p className="faint">{t('studio.cardHelp')}</p>
            <ul className="studio-rel-list">
              {design.relations.map((r, i) => (
                <li key={i}>
                  <span><strong>{nameOf(r.from)}</strong> <code>{r.card}</code> <strong>{nameOf(r.to)}</strong></span>
                  <button type="button" className="btn btn-small btn-ghost" aria-label={t('studio.remove')} onClick={() => update((d) => ({ ...d, relations: d.relations.filter((_, j) => j !== i) }))}>✕</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="toolbar">
            <button type="button" className="btn btn-primary" onClick={check} disabled={design.entities.length === 0}>{t('studio.check')}</button>
            <button type="button" className="btn" onClick={() => { update(() => solutionDesign(scenario)); }}>{t('studio.showSolution')}</button>
            <button type="button" className="btn" onClick={() => update(() => emptyDesign())}>{t('studio.clear')}</button>
            <button type="button" className="btn" onClick={exportDrawio}>⬇ {t('studio.export')}</button>
            <a className="btn btn-ghost" href="https://app.diagrams.net/" target="_blank" rel="noopener noreferrer">draw.io ↗</a>
          </div>

          {issues && (
            <section className={`card studio-feedback ${allOk ? 'is-ok' : ''}`} aria-live="polite">
              <h2>{allOk ? t('studio.allGood') : t('studio.feedback')}</h2>
              <div className="bar" aria-hidden="true"><span style={{ width: `${score}%` }} /></div>
              <ul>
                {issues.map((i, k) => (
                  <li key={k} className={i.ok ? 'ok' : 'bad'}>{i.ok ? '✓' : '✗'} {message(i)}</li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
