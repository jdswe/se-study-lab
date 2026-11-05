import { describe, expect, it } from 'vitest';
import { inRegion, niceStep, parabolaFacts, parseGraphItem, valueAt } from './graph';
import { graphPresets } from '../content/calc1-week1/graphPresets';
import { graphPresets as week2Presets } from '../content/calc1-week2/graphPresets';
import { calcWeek2Labs } from '../content/calc1-week2/labs';

describe('Graph Lab items', () => {
  it('reads curves written with or without y =', () => {
    const a = parseGraphItem('y = x^2 - 1');
    const b = parseGraphItem('x^2 - 1');
    expect(a.kind).toBe('curve');
    expect(b.kind).toBe('curve');
    if (a.kind === 'curve') expect(valueAt(a.f, 3)).toBe(8);
  });

  it('reads regions and finds their boundary', () => {
    const r = parseGraphItem('y >= x^2 - 4');
    expect(r.kind).toBe('region');
    if (r.kind !== 'region') return;
    expect(r.boundary).toBeDefined();
    expect(r.strict).toBe(false);
    expect(inRegion(r, 0, 0)).toBe(true);
    expect(inRegion(r, 0, -5)).toBe(false);
  });

  it('marks strict inequalities as dashed and supports general regions', () => {
    const r = parseGraphItem('y < 2x + 1');
    expect(r.kind === 'region' && r.strict).toBe(true);
    const g = parseGraphItem('12x + 7y <= 84');
    expect(g.kind === 'region' && g.boundary === undefined).toBe(true);
    if (g.kind === 'region') {
      expect(inRegion(g, 3, 6)).toBe(true);
      expect(inRegion(g, 4, 6)).toBe(false);
    }
  });

  it('rejects text it cannot read', () => {
    expect(() => parseGraphItem('y = = 2')).toThrow();
    expect(() => parseGraphItem('z > 1')).toThrow();
  });

  it('parses every preset', () => {
    for (const p of graphPresets) for (const item of p.items) expect(() => parseGraphItem(item), `${p.id}: ${item}`).not.toThrow();
  });
});

describe('parabola explorer', () => {
  it('finds vertex, roots, and opening', () => {
    const f = parabolaFacts(-1, 2, 3)!;
    expect(f.opensUp).toBe(false);
    expect(f.vertex).toEqual({ x: 1, y: 4 });
    expect(f.roots).toEqual([-1, 3]);
    expect(f.yIntercept).toBe(3);
  });

  it('handles one root, no roots, and a = 0', () => {
    expect(parabolaFacts(1, -2, 1)!.roots).toEqual([1]);
    expect(parabolaFacts(1, 0, 4)!.roots).toEqual([]);
    expect(parabolaFacts(0, 1, 1)).toBeNull();
  });

  it('chooses readable tick steps', () => {
    expect(niceStep(20)).toBe(2);
    expect(niceStep(60)).toBe(10);
    expect(niceStep(4)).toBe(0.5);
  });
});

describe('Calculus 1 Week 2 graphs', () => {
  it('parses every preset', () => {
    for (const p of week2Presets) for (const item of p.items) expect(() => parseGraphItem(item), `${p.id}: ${item}`).not.toThrow();
  });

  it('parses every lab line that links to the Graph Lab', () => {
    const lines = calcWeek2Labs.flatMap((l) => l.steps.flatMap((s) => s.commands)).filter((c) => /^\s*y\s*=/.test(c));
    expect(lines.length).toBeGreaterThan(5);
    for (const line of lines) for (const part of line.split(';')) expect(() => parseGraphItem(part), line).not.toThrow();
  });

  it('draws trig, exponential, log, and piecewise curves', () => {
    const at = (src: string, x: number) => { const g = parseGraphItem(src); return g.kind === 'curve' ? valueAt(g.f, x) : NaN; };
    expect(at('y = 3sin(2x)', Math.PI / 4)).toBeCloseTo(3);
    expect(at('y = 22 + 68e^(-0.08x)', 0)).toBeCloseTo(90);
    expect(at('y = ln(x)/ln(2)', 8)).toBeCloseTo(3);
    // A piece restricted with 0·sqrt(…) is undefined outside its interval.
    expect(at('y = 4 + 0sqrt(x - 2)', 3)).toBe(4);
    expect(at('y = 4 + 0sqrt(x - 2)', 1)).toBeNaN();
  });

  it('uses preset ids that do not collide with week 1', () => {
    const ids = [...graphPresets, ...week2Presets].map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
