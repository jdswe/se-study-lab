// Lists content strings that still lack a Portuguese translation, grouped by
// area, as JSON skeletons ready to translate. Output: .cache/i18n/missing-<area>.json
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, '.cache/i18n');
mkdirSync(OUT, { recursive: true });
const entry = join(OUT, 'entry.ts');
writeFileSync(entry, `
export { weeks } from '../../src/content/index';
export { program, terms } from '../../src/content/curriculum';
export { sqlTasks } from '../../src/content/db1-week1/sqlTasks';
export { studioScenarios } from '../../src/content/db1-week1/studio';
export { missingPortuguese } from '../../src/content/localize';
`);
await build({ entryPoints: [entry], bundle: true, platform: 'node', format: 'esm', outfile: join(OUT, 'bundle.mjs'), logLevel: 'error' });
const m = await import(pathToFileURL(join(OUT, 'bundle.mjs')).href + `?t=${Date.now()}`);
const areas = {
  common: [m.program, m.terms],
  'sd1-week1': m.weeks.filter((w) => w.subject === 'software-development-1'),
  'db1-week1': [m.weeks.filter((w) => w.subject === 'database-1'), m.sqlTasks, m.studioScenarios],
};
const seen = new Set();
for (const [area, value] of Object.entries(areas)) {
  const missing = m.missingPortuguese(value).filter((s) => !seen.has(s));
  missing.forEach((s) => seen.add(s));
  writeFileSync(join(OUT, `missing-${area}.json`), JSON.stringify(missing, null, 1));
  const chars = missing.reduce((n, s) => n + s.length, 0);
  console.log(`${area}: ${missing.length} strings, ${chars} characters`);
}
