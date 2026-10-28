// Generates the downloadable study documents for every published week, in
// English and Spanish, from the same content the website uses:
//   study-guide.pdf, study-guide.docx, cheat-sheet.pdf, lab-workbook.pdf, slides.pptx
// PDFs are printed from HTML with headless Chrome; diagrams for Word and
// PowerPoint are rendered to PNG the same way. Run with `npm run docs`.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  AlignmentType, BorderStyle, Document, HeadingLevel, ImageRun, Packer, PageBreak, Paragraph,
  ShadingType, Table, TableCell, TableRow, TextRun, WidthType,
} from 'docx';
import PptxGenJS from 'pptxgenjs';

const ROOT = resolve(import.meta.dirname, '..');
const CACHE = join(ROOT, 'node_modules/.cache/docs');
const OUT = join(ROOT, 'public/downloads');
const CHROME = process.env.CHROME_BIN || 'google-chrome';
const LOCALES = ['en', 'es'];

// Palette shared with the website (see src/styles/tokens.css).
const C = {
  ink: '1F2A36', soft: '4E5A66', faint: '7A828C', cream: 'F6F2EA', paper: 'FFFDF8', sand: 'EEE7D8', line: 'DDD3C0',
  teal: '2F6F73', sage: '5E8C7A', terracotta: 'C0704F', mauve: '7A6A8C', ochre: 'B98A3E', navy: '3A4E74',
};
const LESSON_COLORS = [C.teal, C.terracotta, C.navy, C.mauve, C.sage, C.ochre, C.teal, C.terracotta];

const T = {
  en: {
    guide: 'Study Guide', cheat: 'Git Cheat Sheet', labs: 'Lab Workbook', slides: 'Slides',
    independent: 'SE Study Lab · Study material',
    weekLabel: (w) => `Year ${w.year} · Term ${w.term} · Module ${w.module} · Week ${w.week}`,
    contents: 'Contents', objectives: 'Learning objectives', lesson: 'Lesson', lessons: 'lessons', minutes: 'min',
    analogy: 'Think of it like this', takeaways: 'Key takeaways', mistakes: 'Common mistakes', fix: 'Fix',
    exercises: 'Exercises', hint: 'Hint', solutions: 'Worked solutions', glossary: 'Glossary',
    term: 'Question', meaning: 'Answer', practice: 'Practice quiz', answers: 'Answer key',
    match: 'Match each item on the left with one on the right.', blank: 'Answer: ______________________',
    goal: 'Goal', level: 'Level', expected: 'Expected result', reflect: 'Reflect',
    reflectText: 'What changed in git status after this step, and why?',
    safety: 'Safety rule: run every command only inside ~/se-lab-sandbox or ~/se-lab-remote.git. Read each command before running it.',
    troubleshooting: 'Troubleshooting', symptom: 'Symptom', cause: 'Likely cause',
    agenda: 'Agenda', checkpoint: 'Checkpoint', practiceSlide: 'Practise it', closing: 'Keep going',
    closingText: 'Review your flashcards when they are due, finish the Git Playground missions, and retake the quiz until you score 80% or more.',
    workflow: 'A change, from branch to main', missions: 'Git Playground missions', labsList: 'Sandbox labs',
    answerIs: 'Answer', diagram: 'Diagram',
  },
  es: {
    guide: 'Guía de estudio', cheat: 'Hoja de referencia de Git', labs: 'Cuaderno de laboratorio', slides: 'Diapositivas',
    independent: 'SE Study Lab · Material de estudio',
    weekLabel: (w) => `Año ${w.year} · Término ${w.term} · Módulo ${w.module} · Semana ${w.week}`,
    contents: 'Contenido', objectives: 'Objetivos de aprendizaje', lesson: 'Lección', lessons: 'lecciones', minutes: 'min',
    analogy: 'Piénsalo así', takeaways: 'Ideas clave', mistakes: 'Errores comunes', fix: 'Solución',
    exercises: 'Ejercicios', hint: 'Pista', solutions: 'Soluciones resueltas', glossary: 'Glosario',
    term: 'Pregunta', meaning: 'Respuesta', practice: 'Cuestionario de práctica', answers: 'Clave de respuestas',
    match: 'Relaciona cada elemento de la izquierda con uno de la derecha.', blank: 'Respuesta: ______________________',
    goal: 'Objetivo', level: 'Nivel', expected: 'Resultado esperado', reflect: 'Reflexiona',
    reflectText: '¿Qué cambió en git status después de este paso y por qué?',
    safety: 'Regla de seguridad: ejecuta cada comando solo dentro de ~/se-lab-sandbox o ~/se-lab-remote.git. Lee cada comando antes de ejecutarlo.',
    troubleshooting: 'Diagnóstico de problemas', symptom: 'Síntoma', cause: 'Causa probable',
    agenda: 'Agenda', checkpoint: 'Punto de control', practiceSlide: 'Ponlo en práctica', closing: 'Sigue adelante',
    closingText: 'Repasa tus tarjetas cuando toque, termina las misiones del simulador de Git y repite el cuestionario hasta lograr 80% o más.',
    workflow: 'Un cambio, de la rama a main', missions: 'Misiones del simulador de Git', labsList: 'Laboratorios en carpeta de prueba',
    answerIs: 'Respuesta', diagram: 'Diagrama',
  },
};

const CHEAT = [
  {
    title: { en: 'Set up once', es: 'Configura una vez' },
    rows: [
      ['git config --global user.name "Your Name"', { en: 'Name stored in every commit', es: 'Nombre guardado en cada commit' }],
      ['git config --global user.email "you@example.com"', { en: 'Email stored in every commit', es: 'Correo guardado en cada commit' }],
      ['git init -b main', { en: 'Start a repository with main as the branch', es: 'Crear un repositorio con main como rama' }],
    ],
  },
  {
    title: { en: 'Daily loop', es: 'Ciclo diario' },
    rows: [
      ['git status', { en: 'What changed, what is staged', es: 'Qué cambió y qué está preparado' }],
      ['git diff', { en: 'Unstaged changes', es: 'Cambios sin preparar' }],
      ['git add <file>', { en: 'Stage a file', es: 'Preparar un archivo' }],
      ['git diff --staged', { en: 'What the next commit will contain', es: 'Lo que tendrá el siguiente commit' }],
      ['git commit -m "add sum"', { en: 'Record staged changes (imperative message)', es: 'Registrar lo preparado (mensaje imperativo)' }],
      ['git restore --staged <file>', { en: 'Unstage without losing edits', es: 'Quitar de preparación sin perder cambios' }],
    ],
  },
  {
    title: { en: 'Reading history', es: 'Leer el historial' },
    rows: [
      ['git log --oneline', { en: 'One commit per line', es: 'Un commit por línea' }],
      ['git log --oneline --graph --all', { en: 'Branch structure of every branch', es: 'Estructura de todas las ramas' }],
      ['git show <hash>', { en: 'Message and diff of one commit', es: 'Mensaje y diff de un commit' }],
    ],
  },
  {
    title: { en: 'Branches and merges', es: 'Ramas y fusiones' },
    rows: [
      ['git branch', { en: 'List branches (* = current)', es: 'Listar ramas (* = actual)' }],
      ['git switch -c feature-x', { en: 'Create and switch to a branch', es: 'Crear una rama y cambiar a ella' }],
      ['git switch main', { en: 'Switch to an existing branch', es: 'Cambiar a una rama existente' }],
      ['git merge feature-x', { en: 'Merge feature-x into the current branch', es: 'Fusionar feature-x en la rama actual' }],
    ],
  },
  {
    title: { en: 'Remotes', es: 'Remotos' },
    rows: [
      ['git remote add origin <url>', { en: 'Name a remote "origin"', es: 'Nombrar un remoto "origin"' }],
      ['git push -u origin main', { en: 'Upload main and set upstream', es: 'Subir main y configurar upstream' }],
      ['git fetch origin', { en: 'Download commits; your files do not change', es: 'Descargar commits; tus archivos no cambian' }],
      ['git pull origin main', { en: 'Fetch and integrate', es: 'Descargar e integrar' }],
    ],
  },
];

const TROUBLE = [
  [{ en: 'Author identity unknown', es: 'Author identity unknown' }, { en: 'Name or email not configured', es: 'Nombre o correo sin configurar' }, { en: 'git config --global user.name / user.email', es: 'git config --global user.name / user.email' }],
  [{ en: 'Conflict markers in a file', es: 'Marcadores de conflicto en un archivo' }, { en: 'A merge stopped', es: 'Una fusión se detuvo' }, { en: 'Edit, remove markers, git add, git commit', es: 'Editar, quitar marcadores, git add, git commit' }],
  [{ en: 'Push rejected (non-fast-forward)', es: 'Push rechazado (non-fast-forward)' }, { en: 'The remote has commits you lack', es: 'El remoto tiene commits que no tienes' }, { en: 'git fetch, integrate, push again. Never --force on shared branches.', es: 'git fetch, integra y vuelve a hacer push. Nunca --force en ramas compartidas.' }],
];

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const L = (loc) => (text) => (text && (loc === 'es' && text.es ? text.es : text.en)) ?? '';
const letter = (i) => String.fromCharCode(65 + i);

function chrome(args) {
  execFileSync(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', ...args], { stdio: 'ignore' });
}

function htmlToPdf(html, outFile) {
  const tmp = join(CACHE, `page-${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(tmp, html);
  chrome(['--no-pdf-header-footer', '--virtual-time-budget=10000', `--print-to-pdf=${outFile}`, pathToFileURL(tmp).href]);
}

function svgToPng(svg, outFile, width = 1200, height = 520) {
  const tmp = join(CACHE, `svg-${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=block" rel="stylesheet"><style>html,body{margin:0;background:#${C.paper};font-family:Poppins,Arial,sans-serif}svg{display:block;width:${width}px;height:${height}px}</style></head><body>${svg}</body></html>`);
  chrome(['--virtual-time-budget=8000', `--window-size=${width},${height}`, `--screenshot=${outFile}`, pathToFileURL(tmp).href]);
  return outFile;
}

// ---------- diagrams (SVG strings, localised) ----------
function diagramSvg(kind, loc) {
  const l = (en, es) => (loc === 'es' ? es : en);
  const text = (x, y, s, opts = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Poppins, Arial" ${opts}>${esc(s)}</text>`;
  const head = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520"><defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="#' + C.teal + '"/></marker></defs>';
  if (kind === 'git-areas') {
    const boxes = [[30, l('Working directory', 'Directorio de trabajo'), l('files you edit', 'archivos que editas'), C.teal], [460, l('Staging area', 'Área de preparación'), l('the index', 'el índice'), C.terracotta], [890, l('Repository', 'Repositorio'), '.git', C.navy]];
    return head + boxes.map(([x, t1, t2, c]) => `<rect x="${x}" y="150" width="280" height="160" rx="26" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>${text(x + 140, 225, t1, `font-size="22" font-weight="700" fill="#${C.ink}"`)}${text(x + 140, 268, t2, `font-size="22" fill="#${C.soft}"`)}`).join('')
      + `<path d="M320 250 L450 250" stroke="#${C.teal}" stroke-width="5" marker-end="url(#a)"/><path d="M750 250 L880 250" stroke="#${C.teal}" stroke-width="5" marker-end="url(#a)"/>`
      + text(385, 225, 'git add', `font-size="21" font-family="monospace" font-weight="700" fill="#${C.ink}"`) + text(815, 225, 'git commit', `font-size="21" font-family="monospace" font-weight="700" fill="#${C.ink}"`)
      + `<path d="M1030 320 C 1030 440, 170 440, 170 320" fill="none" stroke="#${C.faint}" stroke-width="3" stroke-dasharray="10 10" marker-end="url(#a)"/>`
      + text(600, 470, l('git restore brings a file back from history', 'git restore recupera un archivo del historial'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'branch-merge') {
    const y1 = 180, y2 = 360;
    const dots = [[120, y1, C.teal], [270, y1, C.teal], [480, y2, C.terracotta], [660, y2, C.terracotta], [840, y2, C.terracotta], [1060, y1, C.teal]];
    return head + `<path d="M120 ${y1} L1060 ${y1}" stroke="#${C.teal}" stroke-width="7" fill="none"/>`
      + `<path d="M270 ${y1} C 360 ${y1}, 380 ${y2}, 480 ${y2} L 840 ${y2} C 940 ${y2}, 960 ${y1}, 1060 ${y1}" stroke="#${C.terracotta}" stroke-width="7" fill="none"/>`
      + dots.map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="22" fill="#${C.paper}" stroke="#${c}" stroke-width="7"/>`).join('')
      + `<rect x="1000" y="100" width="150" height="44" rx="22" fill="#${C.teal}"/>` + text(1075, 130, 'main', `font-size="22" font-weight="700" fill="#${C.paper}"`)
      + `<rect x="740" y="400" width="200" height="44" rx="22" fill="#${C.paper}" stroke="#${C.terracotta}" stroke-width="3"/>` + text(840, 430, 'feature', `font-size="22" font-weight="700" fill="#${C.terracotta}"`)
      + text(600, 80, l('Branch, commit, merge back', 'Crear rama, hacer commits, fusionar'), `font-size="30" font-weight="700" fill="#${C.ink}"`)
      + text(600, 500, l('Each circle is a commit. A branch is a pointer. Merging joins histories.', 'Cada círculo es un commit. Una rama es un puntero. Fusionar une historiales.'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'lifecycle') {
    const phases = [l('Requirements', 'Requisitos'), l('Design', 'Diseño'), l('Implementation', 'Implementación'), l('Testing', 'Pruebas'), l('Deployment', 'Despliegue'), l('Maintenance', 'Mantenimiento')];
    const cx = 600, cy = 270, r = 190;
    return head + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#${C.line}" stroke-width="5" stroke-dasharray="14 12"/>`
      + phases.map((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / phases.length;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        const c = LESSON_COLORS[i];
        return `<circle cx="${x}" cy="${y}" r="62" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>` + text(x, y + 8, p, `font-size="19" font-weight="600" fill="#${C.ink}"`);
      }).join('')
      + text(cx, cy - 6, l('Feedback', 'Retroalimentación'), `font-size="28" font-weight="700" fill="#${C.teal}"`)
      + text(cx, cy + 30, l('each loop = a baseline', 'cada vuelta = una línea base'), `font-size="20" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'requirements') {
    const steps = [l('Inception', 'Inicio'), l('Elicitation', 'Obtención'), l('Elaboration', 'Elaboración'), l('Negotiation', 'Negociación'), l('Specification', 'Especificación'), l('Validation', 'Validación')];
    return head + steps.map((s, i) => {
      const x = 30 + i * 192, c = LESSON_COLORS[i];
      return `<rect x="${x}" y="120" width="172" height="130" rx="22" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>` + text(x + 86, 180, s, `font-size="21" font-weight="700" fill="#${C.ink}"`) + text(x + 86, 220, String(i + 1), `font-size="24" fill="#${c}" font-weight="700"`);
    }).join('')
      + `<rect x="30" y="300" width="1140" height="80" rx="20" fill="#${C.sand}"/>`
      + text(600, 350, l('7 · Requirements management: every change recorded and approved', '7 · Gestión de requisitos: cada cambio registrado y aprobado'), `font-size="24" font-weight="700" fill="#${C.ink}"`)
      + text(600, 450, l('Errors caught here are the cheapest to fix.', 'Los errores detectados aquí son los más baratos de corregir.'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
  }
  // context
  const actors = [[200, 110, l('Customer', 'Cliente'), l('order', 'pedido')], [1000, 110, l('Restaurant', 'Restaurante'), l('menu', 'menú')], [200, 420, l('Courier', 'Repartidor'), l('location', 'ubicación')], [1000, 420, l('Payments', 'Pagos'), l('confirmation', 'confirmación')]];
  return head + actors.map(([x, y, n, f]) => `<path d="M${x} ${y} L600 265" stroke="#${C.teal}" stroke-width="4" stroke-dasharray="12 8"/><rect x="${x - 120}" y="${y - 38}" width="240" height="76" rx="38" fill="#${C.paper}" stroke="#${C.mauve}" stroke-width="4"/>` + text(x, y + 10, n, `font-size="26" font-weight="700" fill="#${C.ink}"`) + text((x + 600) / 2, (y + 265) / 2 - 12, f, `font-size="20" fill="#${C.soft}"`)).join('')
    + `<rect x="440" y="195" width="320" height="140" rx="30" fill="#${C.sand}" stroke="#${C.teal}" stroke-width="5"/>`
    + text(600, 258, l('Delivery app', 'App de domicilios'), `font-size="32" font-weight="800" fill="#${C.ink}"`) + text(600, 298, l('the system', 'el sistema'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
}

// ---------- HTML documents ----------
const BASE_CSS = `
@page { size: A4; margin: 16mm 16mm 18mm; }
* { box-sizing: border-box; }
body { font-family: Poppins, Arial, sans-serif; color: #${C.ink}; font-size: 10.2pt; line-height: 1.55; margin: 0; }
h1, h2, h3 { line-height: 1.2; margin: 0 0 8px; }
h2 { font-size: 17pt; } h3 { font-size: 12pt; margin-top: 14px; }
p { margin: 0 0 8px; }
code, pre { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
pre { background: #${C.ink}; color: #${C.cream}; padding: 10px 12px; border-radius: 8px; font-size: 8.8pt; white-space: pre-wrap; margin: 6px 0 8px; }
.cover { height: 263mm; display: flex; flex-direction: column; justify-content: space-between; padding: 22mm 16mm; color: #${C.paper};
  background: radial-gradient(120mm 90mm at 85% 15%, rgba(255,253,248,0.18), transparent 70%), linear-gradient(140deg, #${C.teal} 0%, #${C.sage} 55%, #${C.ochre} 100%); border-radius: 6mm; page-break-after: always; }
.cover .kicker { letter-spacing: 0.18em; text-transform: uppercase; font-size: 9pt; opacity: 0.9; font-weight: 600; }
.cover h1 { font-size: 34pt; font-weight: 800; margin: 10px 0 12px; }
.cover .sub { font-size: 14pt; opacity: 0.95; max-width: 140mm; }
.cover .chips span { display: inline-block; margin: 0 6px 6px 0; padding: 4px 12px; border-radius: 999px; background: rgba(255,253,248,0.2); font-size: 9.5pt; }
.cover .note { font-size: 9pt; opacity: 0.9; border-top: 1px solid rgba(255,253,248,0.5); padding-top: 8px; }
.section { page-break-before: always; }
.band { display: flex; gap: 14px; align-items: center; padding: 12px 16px; border-radius: 12px; color: #${C.paper}; margin-bottom: 12px; }
.band .num { font-size: 26pt; font-weight: 800; opacity: 0.85; }
.band h2 { margin: 0; color: #${C.paper}; }
.band .meta { font-size: 9pt; opacity: 0.9; }
.analogy { border-left: 5px solid; background: #${C.sand}; padding: 8px 12px; border-radius: 8px; margin: 10px 0; }
.analogy b { display: block; margin-bottom: 2px; }
.box { background: #${C.cream}; border: 1px solid #${C.line}; border-radius: 10px; padding: 8px 14px; margin: 10px 0; }
.box ul { margin: 4px 0; padding-left: 16px; }
figure { margin: 8px 0 10px; } figure svg { width: 100%; height: auto; display: block; border: 1px solid #${C.line}; border-radius: 10px; background: #${C.paper}; }
figcaption { font-size: 8.5pt; color: #${C.faint}; text-align: center; margin-top: 4px; }
.ex { border: 1px solid #${C.line}; border-radius: 10px; padding: 8px 12px; margin: 6px 0; page-break-inside: avoid; }
.ex .lvl { font-size: 8pt; font-weight: 700; color: #${C.paper}; padding: 1px 8px; border-radius: 999px; margin-left: 6px; }
.hint { color: #${C.soft}; font-style: italic; font-size: 9pt; }
table { width: 100%; border-collapse: collapse; margin: 6px 0 10px; font-size: 9.2pt; }
th { background: #${C.teal}; color: #${C.paper}; text-align: left; padding: 6px 8px; }
td { border-bottom: 1px solid #${C.line}; padding: 5px 8px; vertical-align: top; }
tr:nth-child(even) td { background: #${C.cream}; }
.toc li { margin-bottom: 3px; }
.q { page-break-inside: avoid; margin-bottom: 10px; }
.q ol { margin: 4px 0 0; padding-left: 18px; list-style: upper-alpha; }
.footer-note { margin-top: 14px; font-size: 8.5pt; color: #${C.faint}; }
`;

function htmlShell(title, body, lang) {
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">
<style>${BASE_CSS}</style></head><body>${body}</body></html>`;
}

function cover(kicker, title, sub, chips, note) {
  return `<section class="cover"><div><div class="kicker">${esc(kicker)}</div><h1>${esc(title)}</h1><div class="sub">${esc(sub)}</div></div>
<div><div class="chips">${chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div><p class="note">${esc(note)}</p></div></section>`;
}

function questionHtml(q, i, pick, t) {
  let body = '';
  if (q.options) body = `${q.code ? `<pre>${esc(q.code)}</pre>` : ''}<ol>${q.options.map((o) => `<li>${esc(pick(o))}</li>`).join('')}</ol>`;
  else if (q.type === 'matching') body = `<p class="hint">${esc(t.match)}</p><table><tr><td>${q.left.map((x, j) => `${j + 1}. ${esc(pick(x))}`).join('<br>')}</td><td>${q.right.map((x, j) => `${letter(j)}. ${esc(pick(x))}`).join('<br>')}</td></tr></table>`;
  else body = `<p class="hint">${esc(t.blank)}</p>`;
  return `<div class="q"><b>${i + 1}. ${esc(pick(q.prompt))}</b>${body}</div>`;
}

function answerText(q, pick) {
  if (q.options) return `${letter(q.answer)} — ${pick(q.explanation)}`;
  if (q.type === 'matching') return `${q.answer.map((r, j) => `${j + 1}→${letter(r)}`).join(', ')} — ${pick(q.explanation)}`;
  return pick(q.explanation);
}

function studyGuideHtml(week, loc) {
  const t = T[loc], pick = L(loc);
  const lessons = week.lessons;
  let html = cover(t.weekLabel(week), pick(week.title), pick(week.intro), [t.guide, `${lessons.length} ${t.lessons}`, `${week.estimatedMinutes} ${t.minutes}`], t.independent);
  html += `<section><h2>${esc(t.contents)}</h2><ol class="toc">${lessons.map((l) => `<li>${esc(pick(l.title))}</li>`).join('')}<li>${esc(t.solutions)}</li><li>${esc(t.glossary)}</li><li>${esc(t.practice)}</li></ol>
<h3>${esc(t.objectives)}</h3><ul>${week.objectives.map((o) => `<li>${esc(pick(o))}</li>`).join('')}</ul></section>`;
  lessons.forEach((l, i) => {
    const color = LESSON_COLORS[i % LESSON_COLORS.length];
    html += `<section class="section"><div class="band" style="background:#${color}"><span class="num">${String(i + 1).padStart(2, '0')}</span><div><div class="meta">${esc(t.lesson)} ${i + 1} · ${l.minutes} ${t.minutes}</div><h2>${esc(pick(l.title))}</h2></div></div>`;
    html += l.body.map((p) => `<p>${esc(pick(p))}</p>`).join('');
    if (l.analogy) html += `<div class="analogy" style="border-color:#${color}"><b>${esc(t.analogy)}</b>${esc(pick(l.analogy))}</div>`;
    if (l.diagram) html += `<figure>${diagramSvg(l.diagram, loc)}<figcaption>${esc(t.diagram)} · ${esc(pick(l.title))}</figcaption></figure>`;
    html += `<div class="box"><b>${esc(t.takeaways)}</b><ul>${l.takeaways.map((k) => `<li>${esc(pick(k))}</li>`).join('')}</ul></div>`;
    if (l.pitfalls?.length) html += `<h3>${esc(t.mistakes)}</h3><ul>${l.pitfalls.map((p) => `<li>✗ ${esc(pick(p.mistake))} <br>✓ <b>${esc(t.fix)}:</b> ${esc(pick(p.fix))}</li>`).join('')}</ul>`;
    if (l.exercises?.length) {
      html += `<h3>${esc(t.exercises)}</h3>` + l.exercises.map((e, j) => `<div class="ex"><b>${i + 1}.${j + 1} ${esc(pick(e.title))}</b><span class="lvl" style="background:#${[C.sage, C.navy, C.terracotta][e.level - 1]}">${t.level} ${e.level}</span><p>${esc(pick(e.prompt))}</p><p class="hint">${esc(t.hint)}: ${esc(pick(e.hint))}</p></div>`).join('');
    }
    html += '</section>';
  });
  html += `<section class="section"><h2>${esc(t.solutions)}</h2>`;
  lessons.forEach((l, i) => (l.exercises ?? []).forEach((e, j) => { html += `<p><b>${i + 1}.${j + 1} ${esc(pick(e.title))}.</b> ${esc(pick(e.solution))}</p>`; }));
  html += `</section><section class="section"><h2>${esc(t.glossary)}</h2><table><tr><th>${esc(t.term)}</th><th>${esc(t.meaning)}</th></tr>${week.flashcards.map((c) => `<tr><td>${esc(pick(c.front))}</td><td>${esc(pick(c.back))}</td></tr>`).join('')}</table></section>`;
  html += `<section class="section"><h2>${esc(t.practice)}</h2>${week.questions.map((q, i) => questionHtml(q, i, pick, t)).join('')}</section>`;
  html += `<section class="section"><h2>${esc(t.answers)}</h2><ol>${week.questions.map((q) => `<li>${esc(answerText(q, pick))}</li>`).join('')}</ol><p class="footer-note">${esc(t.independent)}</p></section>`;
  return htmlShell(`${t.guide} · ${pick(week.title)}`, html, loc);
}

function cheatSheetHtml(week, loc) {
  const t = T[loc], pick = L(loc);
  let html = `<div class="band" style="background:linear-gradient(120deg,#${C.teal},#${C.sage})"><div><div class="meta">${esc(t.weekLabel(week))}</div><h2 style="font-size:22pt">${esc(t.cheat)}</h2></div></div>`;
  html += `<figure>${diagramSvg('git-areas', loc)}</figure>`;
  html += CHEAT.map((sec) => `<h3>${esc(pick(sec.title))}</h3><table>${sec.rows.map(([cmd, d]) => `<tr><td style="width:52%"><code>${esc(cmd)}</code></td><td>${esc(pick(d))}</td></tr>`).join('')}</table>`).join('');
  html += `<h3>${esc(t.troubleshooting)}</h3><table><tr><th>${esc(t.symptom)}</th><th>${esc(t.cause)}</th><th>${esc(t.fix)}</th></tr>${TROUBLE.map((r) => `<tr>${r.map((c) => `<td>${esc(pick(c))}</td>`).join('')}</tr>`).join('')}</table>`;
  html += `<p class="footer-note">${esc(t.independent)}</p>`;
  return htmlShell(t.cheat, html, loc);
}

function labWorkbookHtml(week, loc) {
  const t = T[loc], pick = L(loc);
  let html = cover(t.weekLabel(week), t.labs, pick(week.title), week.labs.map((l) => `${t.level} ${l.level} · ${l.minutes} ${t.minutes}`), t.independent);
  html += `<div class="analogy" style="border-color:#${C.terracotta}"><b>⚠</b>${esc(t.safety)}</div>`;
  week.labs.forEach((lab, i) => {
    const color = LESSON_COLORS[i % LESSON_COLORS.length];
    html += `<section class="${i ? 'section' : ''}"><div class="band" style="background:#${color}"><span class="num">${i + 1}</span><div><div class="meta">${t.level} ${lab.level} · ${lab.minutes} ${t.minutes}</div><h2>${esc(pick(lab.title))}</h2></div></div>`;
    html += `<p><b>${esc(t.goal)}:</b> ${esc(pick(lab.goal))}</p>`;
    lab.steps.forEach((s, j) => {
      html += `<div class="ex"><b>${j + 1}. ${esc(pick(s.title))}</b><pre>${esc(s.commands.join('\n'))}</pre><p><b>${esc(t.expected)}:</b> ${esc(pick(s.expected))}</p><p class="hint">${esc(t.reflect)}: ${esc(t.reflectText)}</p></div>`;
    });
    html += '</section>';
  });
  html += `<section class="section"><h2>${esc(t.troubleshooting)}</h2><table><tr><th>${esc(t.symptom)}</th><th>${esc(t.cause)}</th><th>${esc(t.fix)}</th></tr>${TROUBLE.map((r) => `<tr>${r.map((c) => `<td>${esc(pick(c))}</td>`).join('')}</tr>`).join('')}</table></section>`;
  return htmlShell(t.labs, html, loc);
}

// ---------- Word ----------
function studyGuideDocx(week, loc, images) {
  const t = T[loc], pick = L(loc);
  const run = (text, o = {}) => new TextRun({ text, font: 'Arial', ...o });
  const para = (text, o = {}) => new Paragraph({ spacing: { after: 120, line: 300 }, children: [run(text, o)] });
  const heading = (text, color, size = 34) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 160 }, children: [run(text, { bold: true, color, size })] });
  const sub = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 80 }, children: [run(text, { bold: true, color: C.ink, size: 26 })] });
  const bullet = (text) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 60 }, children: [run(text)] });
  const shaded = (title, text, color) => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ children: [new TableCell({
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.sand },
      borders: { left: { style: BorderStyle.SINGLE, size: 24, color }, top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: [new Paragraph({ children: [run(title, { bold: true, color })] }), new Paragraph({ children: [run(text)] })],
    })] })],
  });
  const children = [
    new Paragraph({ spacing: { before: 2400, after: 200 }, children: [run(t.weekLabel(week).toUpperCase(), { color: C.teal, bold: true, size: 20 })] }),
    new Paragraph({ spacing: { after: 300 }, children: [run(pick(week.title), { bold: true, size: 56, color: C.ink })] }),
    new Paragraph({ spacing: { after: 300 }, children: [run(`${t.guide} · SE Study Lab`, { size: 28, color: C.terracotta, bold: true })] }),
    para(pick(week.intro), { size: 24, color: C.soft }),
    new Paragraph({ spacing: { before: 1200 }, children: [run(t.independent, { italics: true, size: 18, color: C.faint })] }),
    new Paragraph({ children: [new PageBreak()] }),
    heading(t.objectives, C.teal),
    ...week.objectives.map((o) => bullet(pick(o))),
  ];
  week.lessons.forEach((l, i) => {
    const color = LESSON_COLORS[i % LESSON_COLORS.length];
    children.push(new Paragraph({ children: [new PageBreak()] }));
    children.push(new Paragraph({ spacing: { after: 40 }, children: [run(`${t.lesson.toUpperCase()} ${i + 1} · ${l.minutes} ${t.minutes}`, { color, bold: true, size: 20 })] }));
    children.push(heading(pick(l.title), color, 36));
    l.body.forEach((p) => children.push(para(pick(p))));
    if (l.analogy) { children.push(shaded(t.analogy, pick(l.analogy), color)); children.push(para('')); }
    if (l.diagram && images[l.diagram]) {
      children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [new ImageRun({ type: 'png', data: readFileSync(images[l.diagram]), transformation: { width: 600, height: 260 } })] }));
    }
    children.push(sub(t.takeaways));
    l.takeaways.forEach((k) => children.push(bullet(pick(k))));
    if (l.pitfalls?.length) {
      children.push(sub(t.mistakes));
      l.pitfalls.forEach((p) => children.push(bullet(`${pick(p.mistake)} → ${t.fix}: ${pick(p.fix)}`)));
    }
    if (l.exercises?.length) {
      children.push(sub(t.exercises));
      l.exercises.forEach((e, j) => {
        children.push(new Paragraph({ spacing: { before: 120, after: 40 }, children: [run(`${i + 1}.${j + 1} ${pick(e.title)}  `, { bold: true }), run(`${t.level} ${e.level}`, { color: C.paper, bold: true, size: 16, shading: { type: ShadingType.CLEAR, color: 'auto', fill: [C.sage, C.navy, C.terracotta][e.level - 1] } })] }));
        children.push(para(pick(e.prompt)));
        children.push(para(`${t.hint}: ${pick(e.hint)}`, { italics: true, color: C.soft }));
      });
    }
  });
  children.push(new Paragraph({ children: [new PageBreak()] }), heading(t.solutions, C.teal));
  week.lessons.forEach((l, i) => (l.exercises ?? []).forEach((e, j) => children.push(new Paragraph({ spacing: { after: 120 }, children: [run(`${i + 1}.${j + 1} ${pick(e.title)}. `, { bold: true }), run(pick(e.solution))] }))));
  children.push(new Paragraph({ children: [new PageBreak()] }), heading(t.glossary, C.teal));
  children.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ tableHeader: true, children: [t.term, t.meaning].map((h) => new TableCell({ shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.teal }, children: [new Paragraph({ children: [run(h, { bold: true, color: C.paper })] })] })) }),
      ...week.flashcards.map((c, i) => new TableRow({ children: [pick(c.front), pick(c.back)].map((x) => new TableCell({ shading: i % 2 ? { type: ShadingType.CLEAR, color: 'auto', fill: C.cream } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [run(x, { size: 20 })] })] })) })),
    ],
  }));
  children.push(new Paragraph({ children: [new PageBreak()] }), heading(t.practice, C.teal));
  week.questions.forEach((q, i) => {
    children.push(new Paragraph({ spacing: { before: 160, after: 60 }, children: [run(`${i + 1}. ${pick(q.prompt)}`, { bold: true })] }));
    if (q.code) children.push(new Paragraph({ shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.sand }, children: [run(q.code.replace(/\n/g, '  ·  '), { font: 'Courier New', size: 18 })] }));
    if (q.options) q.options.forEach((o, j) => children.push(para(`${letter(j)}. ${pick(o)}`)));
    else if (q.type === 'matching') {
      q.left.forEach((x, j) => children.push(para(`${j + 1}. ${pick(x)}`)));
      q.right.forEach((x, j) => children.push(para(`${letter(j)}. ${pick(x)}`, { color: C.soft })));
    } else children.push(para(t.blank, { color: C.faint }));
  });
  children.push(new Paragraph({ children: [new PageBreak()] }), heading(t.answers, C.teal));
  week.questions.forEach((q, i) => children.push(para(`${i + 1}. ${answerText(q, pick)}`)));

  return new Document({
    creator: 'SE Study Lab',
    title: `${t.guide} · ${pick(week.title)}`,
    styles: { default: { document: { run: { font: 'Arial', size: 22, color: C.ink } } } },
    sections: [{ properties: { page: { margin: { top: 1100, bottom: 1100, left: 1200, right: 1200 } } }, children }],
  });
}

// ---------- PowerPoint ----------
async function slidesPptx(week, loc, images, outFile) {
  const t = T[loc], pick = L(loc);
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
  pptx.title = `${pick(week.title)} · SE Study Lab`;
  pptx.defineSlideMaster({
    title: 'CONTENT',
    background: { color: C.cream },
    objects: [
      { rect: { x: 0, y: 0, w: 13.33, h: 0.14, fill: { color: C.teal } } },
      { text: { text: `SE Study Lab · ${t.weekLabel(week)}`, options: { x: 0.5, y: 7.0, w: 9, h: 0.3, fontFace: 'Arial', fontSize: 10, color: C.faint } } },
    ],
    slideNumber: { x: 12.4, y: 7.0, fontFace: 'Arial', fontSize: 10, color: C.faint },
  });
  const font = { fontFace: 'Arial' };

  // Title slide
  let s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addShape(pptx.ShapeType.ellipse, { x: 9.2, y: -1.6, w: 6, h: 6, fill: { color: C.teal, transparency: 35 }, line: { color: C.teal, transparency: 100 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 10.8, y: 3.8, w: 4, h: 4, fill: { color: C.terracotta, transparency: 45 }, line: { color: C.terracotta, transparency: 100 } });
  s.addText(t.weekLabel(week).toUpperCase(), { ...font, x: 0.7, y: 1.4, w: 9, h: 0.4, fontSize: 14, bold: true, color: C.ochre, charSpacing: 3 });
  s.addText(pick(week.title), { ...font, x: 0.7, y: 1.9, w: 9.2, h: 2.2, fontSize: 40, bold: true, color: C.paper, valign: 'top' });
  s.addText(pick(week.intro), { ...font, x: 0.7, y: 4.2, w: 8.6, h: 1.6, fontSize: 15, color: 'C6C0B3', valign: 'top' });
  s.addText(t.independent, { ...font, x: 0.7, y: 6.6, w: 10, h: 0.4, fontSize: 10, italic: true, color: C.faint });

  // Objectives
  s = pptx.addSlide({ masterName: 'CONTENT' });
  s.addText(t.objectives, { ...font, x: 0.6, y: 0.4, w: 12, h: 0.8, fontSize: 30, bold: true, color: C.ink });
  s.addText(week.objectives.map((o) => ({ text: pick(o), options: { bullet: { code: '25CF' }, breakLine: true } })), { ...font, x: 0.8, y: 1.4, w: 11.6, h: 5.2, fontSize: 18, color: C.ink, paraSpaceAfter: 10, valign: 'top' });

  // Agenda as coloured tiles
  s = pptx.addSlide({ masterName: 'CONTENT' });
  s.addText(t.agenda, { ...font, x: 0.6, y: 0.4, w: 12, h: 0.8, fontSize: 30, bold: true, color: C.ink });
  week.lessons.forEach((l, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.6 + col * 3.1, y = 1.5 + row * 2.6;
    const color = LESSON_COLORS[i % LESSON_COLORS.length];
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.9, h: 2.3, rectRadius: 0.15, fill: { color: C.paper }, line: { color, width: 2 } });
    s.addText(String(i + 1).padStart(2, '0'), { ...font, x: x + 0.2, y: y + 0.15, w: 1.2, h: 0.6, fontSize: 26, bold: true, color });
    s.addText(pick(l.title), { ...font, x: x + 0.2, y: y + 0.8, w: 2.5, h: 1.3, fontSize: 13, bold: true, color: C.ink, valign: 'top' });
  });

  // One slide per lesson
  week.lessons.forEach((l, i) => {
    const color = LESSON_COLORS[i % LESSON_COLORS.length];
    const sl = pptx.addSlide({ masterName: 'CONTENT' });
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0.14, w: 0.28, h: 7.36, fill: { color } });
    sl.addText(`${t.lesson.toUpperCase()} ${i + 1}`, { ...font, x: 0.6, y: 0.35, w: 6, h: 0.4, fontSize: 12, bold: true, color, charSpacing: 2 });
    sl.addText(pick(l.title), { ...font, x: 0.6, y: 0.75, w: 12, h: 1.0, fontSize: 26, bold: true, color: C.ink, valign: 'top' });
    const hasImage = l.diagram && images[l.diagram];
    const textW = hasImage ? 6.2 : 12;
    sl.addText(t.takeaways, { ...font, x: 0.6, y: 1.9, w: textW, h: 0.4, fontSize: 14, bold: true, color });
    sl.addText(l.takeaways.map((k) => ({ text: pick(k), options: { bullet: { code: '25CF' }, breakLine: true } })), { ...font, x: 0.6, y: 2.3, w: textW, h: 2.8, fontSize: 15, color: C.ink, paraSpaceAfter: 8, valign: 'top' });
    if (hasImage) sl.addImage({ path: images[l.diagram], x: 7.0, y: 1.9, w: 5.9, h: 2.56 });
    if (l.analogy) {
      sl.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 5.2, w: 12.1, h: 1.55, rectRadius: 0.12, fill: { color: C.sand }, line: { color: C.sand } });
      sl.addShape(pptx.ShapeType.rect, { x: 0.6, y: 5.2, w: 0.1, h: 1.55, fill: { color } });
      sl.addText([{ text: `${t.analogy}  `, options: { bold: true, color } }, { text: pick(l.analogy), options: { color: C.ink } }], { ...font, x: 0.85, y: 5.25, w: 11.7, h: 1.45, fontSize: 13.5, valign: 'middle' });
    }
    sl.addNotes(l.body.map((p) => pick(p)).join('\n\n'));
  });

  // Workflow drawn with shapes
  const wf = week.activities.find((a) => a.id === 'act-order-workflow');
  if (wf) {
    s = pptx.addSlide({ masterName: 'CONTENT' });
    s.addText(t.workflow, { ...font, x: 0.6, y: 0.4, w: 12, h: 0.8, fontSize: 28, bold: true, color: C.ink });
    wf.items.forEach((it, i) => {
      const x = 0.5 + i * 2.1;
      const color = LESSON_COLORS[i % LESSON_COLORS.length];
      s.addShape(pptx.ShapeType.ellipse, { x: x + 0.55, y: 2.0, w: 0.8, h: 0.8, fill: { color }, line: { color } });
      s.addText(String(i + 1), { ...font, x: x + 0.55, y: 2.0, w: 0.8, h: 0.8, align: 'center', valign: 'middle', fontSize: 18, bold: true, color: C.paper });
      s.addText(pick(it), { ...font, x, y: 3.0, w: 1.9, h: 1.3, align: 'center', valign: 'top', fontSize: 13, color: C.ink });
      if (i < wf.items.length - 1) s.addShape(pptx.ShapeType.rightArrow, { x: x + 1.5, y: 2.25, w: 0.5, h: 0.3, fill: { color: C.line }, line: { color: C.line } });
    });
    s.addText(pick(wf.explanation), { ...font, x: 0.6, y: 5.0, w: 12, h: 1.0, fontSize: 15, italic: true, color: C.soft });
  }

  // Checkpoint quiz: three choice questions, answers in the notes
  const cps = week.questions.filter((q) => q.options && q.options.length > 2).slice(0, 3);
  s = pptx.addSlide({ masterName: 'CONTENT' });
  s.addText(t.checkpoint, { ...font, x: 0.6, y: 0.4, w: 12, h: 0.8, fontSize: 28, bold: true, color: C.ink });
  cps.forEach((q, i) => {
    const y = 1.4 + i * 1.8;
    s.addText(`${i + 1}. ${pick(q.prompt)}`, { ...font, x: 0.6, y, w: 12, h: 0.6, fontSize: 15, bold: true, color: C.ink });
    s.addText(q.options.map((o, j) => `${letter(j)}. ${pick(o)}`).join('     '), { ...font, x: 0.9, y: y + 0.6, w: 11.8, h: 0.9, fontSize: 12.5, color: C.soft, valign: 'top' });
  });
  s.addNotes(cps.map((q, i) => `${i + 1}. ${t.answerIs}: ${answerText(q, pick)}`).join('\n'));

  // Practice slide
  s = pptx.addSlide({ masterName: 'CONTENT' });
  s.addText(t.practiceSlide, { ...font, x: 0.6, y: 0.4, w: 12, h: 0.8, fontSize: 28, bold: true, color: C.ink });
  s.addText(t.labsList, { ...font, x: 0.6, y: 1.4, w: 6, h: 0.4, fontSize: 15, bold: true, color: C.teal });
  s.addText(week.labs.map((l) => ({ text: `${pick(l.title)} (${t.level} ${l.level})`, options: { bullet: true, breakLine: true } })), { ...font, x: 0.6, y: 1.8, w: 6, h: 3.5, fontSize: 14, color: C.ink, valign: 'top' });
  if (images['branch-merge']) s.addImage({ path: images['branch-merge'], x: 6.9, y: 1.4, w: 5.9, h: 2.56 });
  s.addText(t.missions, { ...font, x: 6.9, y: 4.2, w: 6, h: 0.4, fontSize: 15, bold: true, color: C.terracotta });
  s.addText('git commit · git switch -c feature · git merge feature', { x: 6.9, y: 4.6, w: 6, h: 0.5, fontFace: 'Courier New', fontSize: 13, color: C.ink });

  // Closing
  s = pptx.addSlide();
  s.background = { color: C.teal };
  s.addText(t.closing, { ...font, x: 0.8, y: 2.2, w: 11.5, h: 1.2, fontSize: 40, bold: true, color: C.paper });
  s.addText(t.closingText, { ...font, x: 0.8, y: 3.5, w: 10.5, h: 1.6, fontSize: 18, color: C.paper, valign: 'top' });
  s.addText(t.independent, { ...font, x: 0.8, y: 6.6, w: 11, h: 0.4, fontSize: 10, italic: true, color: 'DDE8E6' });

  await pptx.writeFile({ fileName: outFile });
}

// ---------- main ----------
rmSync(CACHE, { recursive: true, force: true });
mkdirSync(CACHE, { recursive: true });
await build({ entryPoints: [join(ROOT, 'src/content/index.ts')], bundle: true, platform: 'node', format: 'esm', outfile: join(CACHE, 'content.mjs'), logLevel: 'error' });
const { weeks } = await import(pathToFileURL(join(CACHE, 'content.mjs')).href);

for (const week of weeks) {
  for (const loc of LOCALES) {
    const dir = join(OUT, loc);
    mkdirSync(dir, { recursive: true });
    const images = {};
    for (const kind of ['git-areas', 'branch-merge', 'lifecycle', 'requirements', 'context']) {
      images[kind] = svgToPng(diagramSvg(kind, loc), join(CACHE, `${week.id}-${loc}-${kind}.png`));
    }
    htmlToPdf(studyGuideHtml(week, loc), join(dir, 'study-guide.pdf'));
    htmlToPdf(cheatSheetHtml(week, loc), join(dir, 'cheat-sheet.pdf'));
    htmlToPdf(labWorkbookHtml(week, loc), join(dir, 'lab-workbook.pdf'));
    writeFileSync(join(dir, 'study-guide.docx'), await Packer.toBuffer(studyGuideDocx(week, loc, images)));
    await slidesPptx(week, loc, images, join(dir, 'slides.pptx'));
    console.log(`${week.id} [${loc}] documents written to public/downloads/${loc}/`);
  }
}
