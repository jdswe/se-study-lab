import { describe, expect, it } from 'vitest';
import { studioScenarios } from '../content/db1-week1/studio';
import { checkDesign, emptyDesign, solutionDesign, toDrawio } from './erDesign';

const store = studioScenarios.find((s) => s.id === 'store')!;

describe('Design Studio checks', () => {
  it('accepts the model solution of every scenario', () => {
    for (const s of studioScenarios) {
      const issues = checkDesign(solutionDesign(s), s);
      expect(issues.every((i) => i.ok), s.id).toBe(true);
    }
  });

  it('reports missing entities on an empty design', () => {
    const issues = checkDesign(emptyDesign(), store);
    expect(issues.filter((i) => i.kind === 'missingEntity').map((i) => i.entity).sort()).toEqual(['customer', 'order', 'order_item', 'product']);
  });

  it('flags distractors, wrong keys, and reversed 1:N', () => {
    const d = solutionDesign(store);
    d.entities.push('register');
    d.pks.order = 'order_date';
    d.relations[0] = { from: 'order', to: 'customer', card: '1:N' };
    const kinds = checkDesign(d, store).filter((i) => !i.ok).map((i) => i.kind);
    expect(kinds).toEqual(expect.arrayContaining(['distractor', 'wrongPk', 'reversed']));
  });

  it('suggests a junction entity for a direct many-to-many', () => {
    const d = solutionDesign(store);
    d.entities = d.entities.filter((e) => e !== 'order_item');
    d.relations = [{ from: 'customer', to: 'order', card: '1:N' }, { from: 'order', to: 'product', card: 'N:M' }];
    const issues = checkDesign(d, store);
    expect(issues.some((i) => i.kind === 'needsJunction' && i.entity === 'order_item')).toBe(true);
    expect(issues.some((i) => i.kind === 'extraRelation')).toBe(false);
  });

  it('exports a draw.io file with one table per entity and one edge per relationship', () => {
    const xml = toDrawio(solutionDesign(store), store, (id) => id, 'Store');
    expect(xml.startsWith('<mxfile')).toBe(true);
    expect((xml.match(/style="swimlane;/g) ?? []).length).toBe(4);
    expect((xml.match(/edge="1"/g) ?? []).length).toBe(3);
    expect(xml).toContain('PK  customer_id');
    expect(xml).toContain('FK  customer_id');
  });
});
