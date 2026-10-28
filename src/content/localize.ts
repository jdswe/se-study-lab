import type { Localized } from './types';
import { PT } from './pt';

/**
 * Portuguese is added as an overlay: content is written in English and Spanish,
 * and src/content/pt/ maps each English string to its Portuguese translation.
 * A test fails if any content string is missing from the map.
 */
function isLocalized(v: unknown): v is Localized {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return typeof (v as Localized).en === 'string' && keys.every((k) => k === 'en' || k === 'es' || k === 'pt');
}

function walk(v: unknown, visit: (l: Localized) => void, seen = new Set<unknown>()): void {
  if (!v || typeof v !== 'object' || seen.has(v)) return;
  seen.add(v);
  if (isLocalized(v)) {
    visit(v);
    return;
  }
  for (const child of Array.isArray(v) ? v : Object.values(v)) walk(child, visit, seen);
}

/** Fills `pt` on every Localized string inside `value` (in place) and returns it. */
export function addPortuguese<T>(value: T): T {
  walk(value, (l) => {
    if (!l.pt && PT[l.en]) l.pt = PT[l.en];
  });
  return value;
}

/** English strings inside `value` that still have no Portuguese translation. */
export function missingPortuguese(value: unknown): string[] {
  const out = new Set<string>();
  walk(value, (l) => {
    if (!l.pt) out.add(l.en);
  });
  return [...out];
}
