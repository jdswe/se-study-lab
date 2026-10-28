import type { Cardinality, StudioRelation, StudioScenario } from '../content/db1-week1/studio';

/** What the learner has built in the Design Studio. */
export interface Design {
  entities: string[];
  pks: Record<string, string>;
  relations: StudioRelation[];
}

export type IssueKind =
  | 'entityOk' | 'missingEntity' | 'distractor'
  | 'pkOk' | 'missingPk' | 'wrongPk'
  | 'relationOk' | 'missingRelation' | 'wrongCard' | 'reversed' | 'needsJunction' | 'extraRelation';

export interface Issue {
  kind: IssueKind;
  ok: boolean;
  entity?: string;
  a?: string;
  b?: string;
  card?: Cardinality;
}

export const emptyDesign = (): Design => ({ entities: [], pks: {}, relations: [] });

const samePair = (r: StudioRelation, x: string, y: string) => (r.from === x && r.to === y) || (r.from === y && r.to === x);

/**
 * Compares a design with the scenario's model solution. Returns one item per
 * check, positive or negative, so the feedback also confirms what is right.
 */
export function checkDesign(design: Design, scenario: StudioScenario): Issue[] {
  const issues: Issue[] = [];
  const chosen = new Set(design.entities);

  for (const e of scenario.entities) {
    if (e.distractor) {
      if (chosen.has(e.id)) issues.push({ kind: 'distractor', ok: false, entity: e.id });
      continue;
    }
    if (!chosen.has(e.id)) {
      issues.push({ kind: 'missingEntity', ok: false, entity: e.id });
      continue;
    }
    issues.push({ kind: 'entityOk', ok: true, entity: e.id });
    const pk = design.pks[e.id];
    if (!pk) issues.push({ kind: 'missingPk', ok: false, entity: e.id });
    else if (pk !== e.pk) issues.push({ kind: 'wrongPk', ok: false, entity: e.id });
    else issues.push({ kind: 'pkOk', ok: true, entity: e.id });
  }

  const matched = new Set<StudioRelation>();
  // A direct N:M between two entities that the solution links through a junction entity.
  const junctionHints = new Set<string>();
  for (const r of design.relations) {
    if (r.card !== 'N:M') continue;
    const junction = scenario.entities.find((j) =>
      scenario.solution.some((s) => s.to === j.id && s.from === r.from) && scenario.solution.some((s) => s.to === j.id && s.from === r.to));
    if (junction) {
      issues.push({ kind: 'needsJunction', ok: false, a: r.from, b: r.to, entity: junction.id });
      matched.add(r);
      junctionHints.add(`${junction.id}:${r.from}`).add(`${junction.id}:${r.to}`);
    }
  }

  for (const s of scenario.solution) {
    const found = design.relations.find((r) => samePair(r, s.from, s.to));
    if (!found) {
      if (!junctionHints.has(`${s.to}:${s.from}`)) issues.push({ kind: 'missingRelation', ok: false, a: s.from, b: s.to, card: s.card });
      continue;
    }
    matched.add(found);
    if (found.card !== s.card) issues.push({ kind: 'wrongCard', ok: false, a: s.from, b: s.to, card: s.card });
    else if (s.card === '1:N' && found.from !== s.from) issues.push({ kind: 'reversed', ok: false, a: s.from, b: s.to, card: s.card });
    else issues.push({ kind: 'relationOk', ok: true, a: s.from, b: s.to, card: s.card });
  }

  for (const r of design.relations) {
    if (!matched.has(r)) issues.push({ kind: 'extraRelation', ok: false, a: r.from, b: r.to, card: r.card });
  }
  return issues;
}

/** The model solution as a design, for "Show solution". */
export function solutionDesign(scenario: StudioScenario): Design {
  const real = scenario.entities.filter((e) => !e.distractor);
  return {
    entities: real.map((e) => e.id),
    pks: Object.fromEntries(real.map((e) => [e.id, e.pk])),
    relations: scenario.solution.map((r) => ({ ...r })),
  };
}

/** Columns that point to another chosen entity's primary key (shown as FK). */
export function foreignKeys(design: Design, scenario: StudioScenario, entityId: string): Set<string> {
  const entity = scenario.entities.find((e) => e.id === entityId);
  const out = new Set<string>();
  if (!entity) return out;
  for (const other of design.entities) {
    if (other === entityId) continue;
    const pk = design.pks[other];
    if (pk && !pk.includes('+') && entity.attributes.includes(pk)) out.add(pk);
  }
  return out;
}

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Exports a design as a draw.io (diagrams.net) file: one table per entity with
 * PK/FK markers, and crow's-foot edges for the relationships.
 */
export function toDrawio(design: Design, scenario: StudioScenario, nameOf: (id: string) => string, title: string): string {
  const cells: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];
  const width = 200;
  const row = 26;
  design.entities.forEach((id, i) => {
    const e = scenario.entities.find((x) => x.id === id);
    if (!e) return;
    const x = 40 + (i % 3) * 280;
    const y = 40 + Math.floor(i / 3) * 240;
    const fks = foreignKeys(design, scenario, id);
    const pk = design.pks[id] ?? '';
    const pkCols = pk.split(' + ');
    cells.push(`<mxCell id="${id}" value="${xml(nameOf(id))}" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=${row + 4};horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=0;marginBottom=0;rounded=1;arcSize=8;fillColor=#2F6F73;fontColor=#FFFDF8;strokeColor=#2F6F73;swimlaneFillColor=#FFFDF8;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${row + 4 + e.attributes.length * row}" as="geometry"/></mxCell>`);
    e.attributes.forEach((a, j) => {
      const tags = [pkCols.includes(a) ? 'PK' : '', fks.has(a) ? 'FK' : ''].filter(Boolean).join(',');
      const label = tags ? `${tags}  ${a}` : a;
      const style = `text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=8;fontFamily=Courier New;${pkCols.includes(a) ? 'fontStyle=5;' : ''}`;
      cells.push(`<mxCell id="${id}-${j}" value="${xml(label)}" style="${style}" vertex="1" parent="${id}"><mxGeometry y="${row + 4 + j * row}" width="${width}" height="${row}" as="geometry"/></mxCell>`);
    });
  });
  const arrows: Record<Cardinality, [string, string]> = { '1:1': ['ERmandOne', 'ERmandOne'], '1:N': ['ERmandOne', 'ERmany'], 'N:M': ['ERmany', 'ERmany'] };
  design.relations.forEach((r, i) => {
    const [start, end] = arrows[r.card];
    cells.push(`<mxCell id="rel-${i}" value="${r.card}" style="edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;startArrow=${start};endArrow=${end};startFill=0;endFill=0;strokeColor=#C0704F;strokeWidth=2;" edge="1" parent="1" source="${r.from}" target="${r.to}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  });
  return `<mxfile host="SE Study Lab"><diagram name="${xml(title)}" id="${scenario.id}"><mxGraphModel grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" page="1" pageScale="1" pageWidth="1100" pageHeight="850"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
}
