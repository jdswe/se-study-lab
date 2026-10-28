// Merges numbered translation blocks (.cache/i18n/pt-<area>-*.tsv, lines "N<TAB>text")
// with the matching missing-<area>.json source list into src/content/pt/<area>.json.
// Fails loudly if a number is missing, duplicated, or out of range.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const CACHE = join(ROOT, '.cache/i18n');
const areas = { common: 'c', 'sd1-week1': '', 'db1-week1': '' };
let errors = 0;

function blocks(prefix) {
  return readdirSync(CACHE).filter((f) => f.startsWith(prefix) && f.endsWith('.tsv')).sort();
}

const lines = new Map(); // area -> Map(key -> text)
for (const file of [...blocks('pt-sd1-'), ...blocks('pt-db1-')]) {
  const area = file.startsWith('pt-sd1-') ? 'sd1-week1' : 'db1-week1';
  for (const raw of readFileSync(join(CACHE, file), 'utf8').split('\n')) {
    if (!raw.trim()) continue;
    const tab = raw.indexOf('\t');
    const key = raw.slice(0, tab);
    const text = raw.slice(tab + 1).replace(/\\n/g, '\n');
    const target = key.startsWith('c') ? 'common' : area;
    const map = lines.get(target) ?? new Map();
    if (map.has(key)) { console.error(`${file}: duplicate number ${key}`); errors++; }
    map.set(key, text);
    lines.set(target, map);
  }
}

for (const area of Object.keys(areas)) {
  const srcFile = join(CACHE, `missing-${area}.json`);
  if (!existsSync(srcFile)) continue;
  const source = JSON.parse(readFileSync(srcFile, 'utf8'));
  const map = lines.get(area) ?? new Map();
  const outFile = join(ROOT, 'src/content/pt', `${area}.json`);
  const out = existsSync(outFile) ? JSON.parse(readFileSync(outFile, 'utf8')) : {};
  source.forEach((en, i) => {
    const key = area === 'common' ? `c${i}` : String(i);
    const pt = map.get(key);
    if (!pt) { console.error(`${area}: missing translation for #${key}: ${en.slice(0, 60)}`); errors++; return; }
    out[en] = pt;
  });
  for (const key of map.keys()) {
    const i = Number(key.replace(/^c/, ''));
    if (!(i >= 0 && i < source.length)) { console.error(`${area}: number ${key} is out of range`); errors++; }
  }
  writeFileSync(outFile, JSON.stringify(out, null, 1) + '\n');
  console.log(`${area}: ${Object.keys(out).length} translations`);
}
if (errors) process.exit(1);
