// Scans the build output, public files, and source for institutional or
// personal identifiers. PDFs, Word, and PowerPoint files are checked through
// their extracted text. Exits non-zero if anything forbidden is found.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, relative } from 'node:path';

const roots = ['dist', 'public', 'src', 'index.html', 'scripts/build-docs.mjs'];
// Identifiers of the institution, its systems, and its source files. Generic
// academic words (course, teacher, enrolment) are allowed: the content uses
// them in its own examples.
const forbidden = [
  /jala/i, /universidad/i, /\buniversity\b/i,
  /\bsection\s*b\b/i, /\.edu\b/i, /\bmoodle\b/i, /\blms\b/i,
  /carranza/i, /jdca/i, /jdswe/i,
  /Master_Class/i, /Sistemas de control de versiones/i, /Lab 1_/i, /Introduccion_Bases_de_Datos/i,
  /\bSD1\b/,
];
// Only example addresses are allowed in content.
const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const allowedEmail = /@(example\.com|users\.noreply\.github\.com)$/;

const failures = [];
let scanned = 0;

function extract(path) {
  try {
    if (/\.pdf$/i.test(path)) return execFileSync('pdftotext', [path, '-'], { encoding: 'utf8' });
    if (/\.(docx|pptx)$/i.test(path)) {
      // Office files are zip archives of XML; strip tags to get the text.
      // Only the XML parts: embedded images would add random bytes.
      return execFileSync('unzip', ['-p', path, '*.xml'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).replace(/<[^>]+>/g, ' ');
    }
    return readFileSync(path, 'utf8');
  } catch (err) {
    failures.push(`${path}: could not be read for checking (${err.message.split('\n')[0]})`);
    return '';
  }
}

function check(path) {
  if (!/\.(html|js|mjs|css|ts|tsx|json|svg|md|txt|pdf|docx|pptx)$/i.test(path)) return;
  const text = extract(path).replace(/\0/g, '');
  scanned += 1;
  const rel = relative(process.cwd(), path);
  for (const rx of forbidden) {
    if (rel.endsWith('check-privacy.mjs')) break;
    const m = text.match(rx);
    if (m) failures.push(`${rel}: forbidden term "${m[0]}"`);
  }
  // Emails are checked in sources and documents. dist/ only repeats them next to
  // minified third-party code, whose random strings can look like addresses.
  if (rel.startsWith('dist/')) return;
  for (const m of text.matchAll(emailPattern)) {
    if (!allowedEmail.test(m[0])) failures.push(`${rel}: email "${m[0]}"`);
  }
}

function walk(path) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const entry of readdirSync(path)) {
      if (entry === 'node_modules') continue;
      walk(join(path, entry));
    }
  } else {
    check(path);
  }
}

for (const root of roots) {
  try {
    walk(root);
  } catch {
    // Missing folders (for example dist before a build) are skipped.
  }
}

if (failures.length) {
  console.error('Privacy check failed:\n' + failures.join('\n'));
  process.exit(1);
}
console.log(`Privacy check passed: ${scanned} files scanned, no institutional or personal identifiers found.`);
