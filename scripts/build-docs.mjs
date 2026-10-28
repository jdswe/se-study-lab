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
const LOCALES = ['en', 'es', 'pt'];

// Palette shared with the website (see src/styles/tokens.css).
const C = {
  ink: '1F2A36', soft: '4E5A66', faint: '7A828C', cream: 'F6F2EA', paper: 'FFFDF8', sand: 'EEE7D8', line: 'DDD3C0',
  teal: '2F6F73', sage: '5E8C7A', terracotta: 'C0704F', mauve: '7A6A8C', ochre: 'B98A3E', navy: '3A4E74',
};
const LESSON_COLORS = [C.teal, C.terracotta, C.navy, C.mauve, C.sage, C.ochre, C.teal, C.terracotta];

const T = {
  en: {
    guide: 'Study Guide', cheat: 'Cheat Sheet', labs: 'Lab Workbook', slides: 'Slides',
    independent: 'SE Study Lab · Study material',
    weekLabel: (w) => `Year ${w.year} · Term ${w.term} · Module ${w.module} · Week ${w.week}`,
    contents: 'Contents', objectives: 'Learning objectives', lesson: 'Lesson', lessons: 'lessons', minutes: 'min',
    analogy: 'Think of it like this', takeaways: 'Key takeaways', mistakes: 'Common mistakes', fix: 'Fix',
    exercises: 'Exercises', hint: 'Hint', solutions: 'Worked solutions', glossary: 'Glossary',
    term: 'Question', meaning: 'Answer', practice: 'Practice quiz', answers: 'Answer key',
    match: 'Match each item on the left with one on the right.', blank: 'Answer: ______________________',
    goal: 'Goal', level: 'Level', expected: 'Expected result', reflect: 'Reflect',
    reflectText: 'What changed after this step, and why?',
    safety: 'Safety rule: run every command only inside ~/se-lab-sandbox or ~/se-lab-remote.git. Read each command before running it.',
    troubleshooting: 'Troubleshooting', symptom: 'Symptom', cause: 'Likely cause',
    agenda: 'Agenda', checkpoint: 'Checkpoint', practiceSlide: 'Practise it', closing: 'Keep going',
    closingText: 'Review your flashcards when they are due, use the subject\'s tools, and retake the quiz until you score 80% or more.',
    workflow: 'Step by step', missions: 'Subject tools', labsList: 'Labs',
    answerIs: 'Answer', diagram: 'Diagram',
    sqlNote: 'Run these queries in the subject\'s SQL Lab: a real database in your browser, with a button to reset the data.',
    designNote: 'Do this lab in the subject\'s Design Studio, then export the diagram to draw.io.',
  },
  pt: {
    guide: 'Guia de estudo', cheat: 'Folha de referência', labs: 'Caderno de laboratório', slides: 'Slides',
    independent: 'SE Study Lab · Material de estudo',
    weekLabel: (w) => `Ano ${w.year} · Período ${w.term} · Módulo ${w.module} · Semana ${w.week}`,
    contents: 'Conteúdo', objectives: 'Objetivos de aprendizagem', lesson: 'Lição', lessons: 'lições', minutes: 'min',
    analogy: 'Pense assim', takeaways: 'Ideias-chave', mistakes: 'Erros comuns', fix: 'Solução',
    exercises: 'Exercícios', hint: 'Dica', solutions: 'Soluções comentadas', glossary: 'Glossário',
    term: 'Pergunta', meaning: 'Resposta', practice: 'Questionário de prática', answers: 'Gabarito',
    match: 'Associe cada item da esquerda a um da direita.', blank: 'Resposta: ______________________',
    goal: 'Objetivo', level: 'Nível', expected: 'Resultado esperado', reflect: 'Reflita',
    reflectText: 'O que mudou depois deste passo, e por quê?',
    safety: 'Regra de segurança: execute cada comando apenas dentro de ~/se-lab-sandbox ou ~/se-lab-remote.git. Leia cada comando antes de executá-lo.',
    troubleshooting: 'Diagnóstico de problemas', symptom: 'Sintoma', cause: 'Causa provável',
    agenda: 'Agenda', checkpoint: 'Ponto de verificação', practiceSlide: 'Coloque em prática', closing: 'Continue',
    closingText: 'Revise seus cartões quando estiverem pendentes, use as ferramentas da disciplina e refaça o questionário até chegar a 80% ou mais.',
    workflow: 'Passo a passo', missions: 'Ferramentas da disciplina', labsList: 'Laboratórios',
    answerIs: 'Resposta', diagram: 'Diagrama',
    sqlNote: 'Execute estas consultas no Laboratório SQL da disciplina: um banco de dados real no seu navegador, com botão para reiniciar os dados.',
    designNote: 'Faça este laboratório no Estúdio de design da disciplina e depois exporte o diagrama para o draw.io.',
  },
  es: {
    guide: 'Guía de estudio', cheat: 'Hoja de referencia', labs: 'Cuaderno de laboratorio', slides: 'Diapositivas',
    independent: 'SE Study Lab · Material de estudio',
    weekLabel: (w) => `Año ${w.year} · Término ${w.term} · Módulo ${w.module} · Semana ${w.week}`,
    contents: 'Contenido', objectives: 'Objetivos de aprendizaje', lesson: 'Lección', lessons: 'lecciones', minutes: 'min',
    analogy: 'Piénsalo así', takeaways: 'Ideas clave', mistakes: 'Errores comunes', fix: 'Solución',
    exercises: 'Ejercicios', hint: 'Pista', solutions: 'Soluciones resueltas', glossary: 'Glosario',
    term: 'Pregunta', meaning: 'Respuesta', practice: 'Cuestionario de práctica', answers: 'Clave de respuestas',
    match: 'Relaciona cada elemento de la izquierda con uno de la derecha.', blank: 'Respuesta: ______________________',
    goal: 'Objetivo', level: 'Nivel', expected: 'Resultado esperado', reflect: 'Reflexiona',
    reflectText: '¿Qué cambió después de este paso y por qué?',
    safety: 'Regla de seguridad: ejecuta cada comando solo dentro de ~/se-lab-sandbox o ~/se-lab-remote.git. Lee cada comando antes de ejecutarlo.',
    troubleshooting: 'Diagnóstico de problemas', symptom: 'Síntoma', cause: 'Causa probable',
    agenda: 'Agenda', checkpoint: 'Punto de control', practiceSlide: 'Ponlo en práctica', closing: 'Sigue adelante',
    closingText: 'Repasa tus tarjetas cuando toque, usa las herramientas de la materia y repite el cuestionario hasta lograr 80% o más.',
    workflow: 'Paso a paso', missions: 'Herramientas de la materia', labsList: 'Laboratorios',
    answerIs: 'Respuesta', diagram: 'Diagrama',
    sqlNote: 'Ejecuta estas consultas en el Laboratorio SQL de la materia: una base de datos real en tu navegador, con un botón para reiniciar los datos.',
    designNote: 'Haz este laboratorio en el Estudio de diseño de la materia y luego exporta el diagrama a draw.io.',
  },
};

// Cheat sheets and troubleshooting tables, one per subject.
const R = (cmd, en, es, pt) => [cmd, { en, es, pt }];
const H = (en, es, pt) => ({ en, es, pt });
const CHEATS = {
  'software-development-1': {
    diagram: 'git-areas',
    sections: [
      { title: H('Set up once', 'Configura una vez', 'Configure uma vez'), rows: [
        R('git config --global user.name "Your Name"', 'Name stored in every commit', 'Nombre guardado en cada commit', 'Nome guardado em cada commit'),
        R('git config --global user.email "you@example.com"', 'Email stored in every commit', 'Correo guardado en cada commit', 'E-mail guardado em cada commit'),
        R('git init -b main', 'Start a repository with main as the branch', 'Crear un repositorio con main como rama', 'Criar um repositório com main como branch'),
      ] },
      { title: H('Daily loop', 'Ciclo diario', 'Ciclo diário'), rows: [
        R('git status', 'What changed, what is staged', 'Qué cambió y qué está preparado', 'O que mudou e o que está preparado'),
        R('git diff', 'Unstaged changes', 'Cambios sin preparar', 'Mudanças não preparadas'),
        R('git add <file>', 'Stage a file', 'Preparar un archivo', 'Preparar um arquivo'),
        R('git diff --staged', 'What the next commit will contain', 'Lo que tendrá el siguiente commit', 'O que o próximo commit vai conter'),
        R('git commit -m "add sum"', 'Record staged changes (imperative message)', 'Registrar lo preparado (mensaje imperativo)', 'Registrar o que foi preparado (mensagem imperativa)'),
        R('git restore --staged <file>', 'Unstage without losing edits', 'Quitar de preparación sin perder cambios', 'Tirar da preparação sem perder edições'),
      ] },
      { title: H('Reading history', 'Leer el historial', 'Ler o histórico'), rows: [
        R('git log --oneline', 'One commit per line', 'Un commit por línea', 'Um commit por linha'),
        R('git log --oneline --graph --all', 'Branch structure of every branch', 'Estructura de todas las ramas', 'Estrutura de todas as branches'),
        R('git show <hash>', 'Message and diff of one commit', 'Mensaje y diff de un commit', 'Mensagem e diff de um commit'),
      ] },
      { title: H('Branches and merges', 'Ramas y fusiones', 'Branches e merges'), rows: [
        R('git branch', 'List branches (* = current)', 'Listar ramas (* = actual)', 'Listar branches (* = atual)'),
        R('git switch -c feature-x', 'Create and switch to a branch', 'Crear una rama y cambiar a ella', 'Criar uma branch e mudar para ela'),
        R('git switch main', 'Switch to an existing branch', 'Cambiar a una rama existente', 'Mudar para uma branch existente'),
        R('git merge feature-x', 'Merge feature-x into the current branch', 'Fusionar feature-x en la rama actual', 'Fazer merge de feature-x na branch atual'),
      ] },
      { title: H('Remotes', 'Remotos', 'Remotos'), rows: [
        R('git remote add origin <url>', 'Name a remote "origin"', 'Nombrar un remoto "origin"', 'Nomear um remoto "origin"'),
        R('git push -u origin main', 'Upload main and set upstream', 'Subir main y configurar upstream', 'Enviar main e definir o upstream'),
        R('git fetch origin', 'Download commits; your files do not change', 'Descargar commits; tus archivos no cambian', 'Baixar commits; seus arquivos não mudam'),
        R('git pull origin main', 'Fetch and integrate', 'Descargar e integrar', 'Baixar e integrar'),
      ] },
    ],
    trouble: [
      [H('Author identity unknown', 'Author identity unknown', 'Author identity unknown'), H('Name or email not configured', 'Nombre o correo sin configurar', 'Nome ou e-mail não configurado'), H('git config --global user.name / user.email', 'git config --global user.name / user.email', 'git config --global user.name / user.email')],
      [H('Conflict markers in a file', 'Marcadores de conflicto en un archivo', 'Marcadores de conflito em um arquivo'), H('A merge stopped', 'Una fusión se detuvo', 'Um merge parou'), H('Edit, remove markers, git add, git commit', 'Editar, quitar marcadores, git add, git commit', 'Editar, remover marcadores, git add, git commit')],
      [H('Push rejected (non-fast-forward)', 'Push rechazado (non-fast-forward)', 'Push rejeitado (non-fast-forward)'), H('The remote has commits you lack', 'El remoto tiene commits que no tienes', 'O remoto tem commits que você não tem'), H('git fetch, integrate, push again. Never --force on shared branches.', 'git fetch, integra y vuelve a hacer push. Nunca --force en ramas compartidas.', 'git fetch, integre e envie de novo. Nunca --force em branches compartilhadas.')],
    ],
  },
  'database-1': {
    diagram: 'er-store',
    sections: [
      { title: H('Read data', 'Leer datos', 'Ler dados'), rows: [
        R('SELECT name, price FROM product;', 'Choose columns from a table', 'Elegir columnas de una tabla', 'Escolher colunas de uma tabela'),
        R('… WHERE price > 20000', 'Keep only rows that match', 'Quedarse solo con las filas que cumplen', 'Manter só as linhas que atendem'),
        R('… WHERE price >= 8000 AND price <= 20000', 'Combine conditions', 'Combinar condiciones', 'Combinar condições'),
        R('… ORDER BY price DESC', 'Sort, highest first', 'Ordenar, el mayor primero', 'Ordenar, o maior primeiro'),
        R('SELECT COUNT(*) FROM orders;', 'Count rows', 'Contar filas', 'Contar linhas'),
      ] },
      { title: H('Combine tables', 'Combinar tablas', 'Combinar tabelas'), rows: [
        R('FROM customer c JOIN orders o ON c.customer_id = o.customer_id', 'Rows whose keys match', 'Filas cuyas claves coinciden', 'Linhas cujas chaves coincidem'),
        R('CREATE VIEW cheap AS SELECT … ;', 'Save a query with a name', 'Guardar una consulta con nombre', 'Guardar uma consulta com nome'),
      ] },
      { title: H('Change data', 'Modificar datos', 'Alterar dados'), rows: [
        R("INSERT INTO product (product_id, name, price) VALUES (60, 'Pencil', 2000);", 'Add a row', 'Agregar una fila', 'Adicionar uma linha'),
        R('UPDATE product SET price = 9000 WHERE product_id = 10;', 'Change rows (always with WHERE)', 'Cambiar filas (siempre con WHERE)', 'Alterar linhas (sempre com WHERE)'),
        R('DELETE FROM product WHERE product_id = 60;', 'Remove rows (always with WHERE)', 'Eliminar filas (siempre con WHERE)', 'Remover linhas (sempre com WHERE)'),
      ] },
      { title: H('Define structure and rules', 'Definir estructura y reglas', 'Definir estrutura e regras'), rows: [
        R('product_id INTEGER PRIMARY KEY', 'Unique, non-null identifier', 'Identificador único y no nulo', 'Identificador único e não nulo'),
        R('customer_id INTEGER REFERENCES customer(customer_id)', 'Foreign key to another table', 'Clave foránea hacia otra tabla', 'Chave estrangeira para outra tabela'),
        R('name VARCHAR(60) NOT NULL', 'A value is required', 'Se exige un valor', 'Um valor é obrigatório'),
        R('price INTEGER CHECK (price >= 0)', 'Validate a condition', 'Validar una condición', 'Validar uma condição'),
      ] },
      { title: H('Transactions', 'Transacciones', 'Transações'), rows: [
        R('BEGIN; … COMMIT;', 'Apply all steps together', 'Aplicar todos los pasos juntos', 'Aplicar todos os passos juntos'),
        R('BEGIN; … ROLLBACK;', 'Undo everything since BEGIN', 'Deshacer todo desde BEGIN', 'Desfazer tudo desde o BEGIN'),
      ] },
    ],
    trouble: [
      [H('FOREIGN KEY constraint failed', 'FOREIGN KEY constraint failed', 'FOREIGN KEY constraint failed'), H('The referenced row does not exist', 'La fila referenciada no existe', 'A linha referenciada não existe'), H('Insert the parent row first (for example, the customer)', 'Inserta primero la fila padre (por ejemplo, el cliente)', 'Insira primeiro a linha pai (por exemplo, o cliente)')],
      [H('CHECK constraint failed', 'CHECK constraint failed', 'CHECK constraint failed'), H('A value breaks a rule, such as a negative price', 'Un valor rompe una regla, como un precio negativo', 'Um valor quebra uma regra, como um preço negativo'), H('Fix the value or the rule', 'Corrige el valor o la regla', 'Corrija o valor ou a regra')],
      [H('Every row changed', 'Cambiaron todas las filas', 'Todas as linhas mudaram'), H('UPDATE or DELETE without WHERE', 'UPDATE o DELETE sin WHERE', 'UPDATE ou DELETE sem WHERE'), H('Test the condition with SELECT first; work inside a transaction', 'Prueba la condición con SELECT primero; trabaja dentro de una transacción', 'Teste a condição com SELECT primeiro; trabalhe dentro de uma transação')],
    ],
  },
};

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const L = (loc) => (text) => (text && (text[loc] ?? text.en)) ?? '';
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
  const l = (en, es, pt) => ({ en, es, pt })[loc] ?? en;
  const text = (x, y, s, opts = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Poppins, Arial" ${opts}>${esc(s)}</text>`;
  const head = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520"><defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="#' + C.teal + '"/></marker></defs>';
  if (kind === 'git-areas') {
    const boxes = [[30, l('Working directory', 'Directorio de trabajo', 'Diretório de trabalho'), l('files you edit', 'archivos que editas', 'arquivos que você edita'), C.teal], [460, l('Staging area', 'Área de preparación', 'Área de preparação'), l('the index', 'el índice', 'o índice'), C.terracotta], [890, l('Repository', 'Repositorio', 'Repositório'), '.git', C.navy]];
    return head + boxes.map(([x, t1, t2, c]) => `<rect x="${x}" y="150" width="280" height="160" rx="26" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>${text(x + 140, 225, t1, `font-size="22" font-weight="700" fill="#${C.ink}"`)}${text(x + 140, 268, t2, `font-size="22" fill="#${C.soft}"`)}`).join('')
      + `<path d="M320 250 L450 250" stroke="#${C.teal}" stroke-width="5" marker-end="url(#a)"/><path d="M750 250 L880 250" stroke="#${C.teal}" stroke-width="5" marker-end="url(#a)"/>`
      + text(385, 225, 'git add', `font-size="21" font-family="monospace" font-weight="700" fill="#${C.ink}"`) + text(815, 225, 'git commit', `font-size="21" font-family="monospace" font-weight="700" fill="#${C.ink}"`)
      + `<path d="M1030 320 C 1030 440, 170 440, 170 320" fill="none" stroke="#${C.faint}" stroke-width="3" stroke-dasharray="10 10" marker-end="url(#a)"/>`
      + text(600, 470, l('git restore brings a file back from history', 'git restore recupera un archivo del historial', 'git restore recupera um arquivo do histórico'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'branch-merge') {
    const y1 = 180, y2 = 360;
    const dots = [[120, y1, C.teal], [270, y1, C.teal], [480, y2, C.terracotta], [660, y2, C.terracotta], [840, y2, C.terracotta], [1060, y1, C.teal]];
    return head + `<path d="M120 ${y1} L1060 ${y1}" stroke="#${C.teal}" stroke-width="7" fill="none"/>`
      + `<path d="M270 ${y1} C 360 ${y1}, 380 ${y2}, 480 ${y2} L 840 ${y2} C 940 ${y2}, 960 ${y1}, 1060 ${y1}" stroke="#${C.terracotta}" stroke-width="7" fill="none"/>`
      + dots.map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="22" fill="#${C.paper}" stroke="#${c}" stroke-width="7"/>`).join('')
      + `<rect x="1000" y="100" width="150" height="44" rx="22" fill="#${C.teal}"/>` + text(1075, 130, 'main', `font-size="22" font-weight="700" fill="#${C.paper}"`)
      + `<rect x="740" y="400" width="200" height="44" rx="22" fill="#${C.paper}" stroke="#${C.terracotta}" stroke-width="3"/>` + text(840, 430, 'feature', `font-size="22" font-weight="700" fill="#${C.terracotta}"`)
      + text(600, 80, l('Branch, commit, merge back', 'Crear rama, hacer commits, fusionar', 'Criar branch, fazer commits, fazer merge'), `font-size="30" font-weight="700" fill="#${C.ink}"`)
      + text(600, 500, l('Each circle is a commit. A branch is a pointer. Merging joins histories.', 'Cada círculo es un commit. Una rama es un puntero. Fusionar une historiales.', 'Cada círculo é um commit. Uma branch é um ponteiro. O merge une históricos.'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'lifecycle') {
    const phases = [l('Requirements', 'Requisitos', 'Requisitos'), l('Design', 'Diseño', 'Design'), l('Implementation', 'Implementación', 'Implementação'), l('Testing', 'Pruebas', 'Testes'), l('Deployment', 'Despliegue', 'Implantação'), l('Maintenance', 'Mantenimiento', 'Manutenção')];
    const cx = 600, cy = 270, r = 190;
    return head + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#${C.line}" stroke-width="5" stroke-dasharray="14 12"/>`
      + phases.map((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / phases.length;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        const c = LESSON_COLORS[i];
        return `<circle cx="${x}" cy="${y}" r="62" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>` + text(x, y + 8, p, `font-size="19" font-weight="600" fill="#${C.ink}"`);
      }).join('')
      + text(cx, cy - 6, l('Feedback', 'Retroalimentación', 'Feedback'), `font-size="28" font-weight="700" fill="#${C.teal}"`)
      + text(cx, cy + 30, l('each loop = a baseline', 'cada vuelta = una línea base', 'cada volta = uma linha de base'), `font-size="20" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'requirements') {
    const steps = [l('Inception', 'Inicio', 'Concepção'), l('Elicitation', 'Obtención', 'Elicitação'), l('Elaboration', 'Elaboración', 'Elaboração'), l('Negotiation', 'Negociación', 'Negociação'), l('Specification', 'Especificación', 'Especificação'), l('Validation', 'Validación', 'Validação')];
    return head + steps.map((s, i) => {
      const x = 30 + i * 192, c = LESSON_COLORS[i];
      return `<rect x="${x}" y="120" width="172" height="130" rx="22" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>` + text(x + 86, 180, s, `font-size="21" font-weight="700" fill="#${C.ink}"`) + text(x + 86, 220, String(i + 1), `font-size="24" fill="#${c}" font-weight="700"`);
    }).join('')
      + `<rect x="30" y="300" width="1140" height="80" rx="20" fill="#${C.sand}"/>`
      + text(600, 350, l('7 · Requirements management: every change recorded and approved', '7 · Gestión de requisitos: cada cambio registrado y aprobado', '7 · Gestão de requisitos: cada mudança registrada e aprovada'), `font-size="24" font-weight="700" fill="#${C.ink}"`)
      + text(600, 450, l('Errors caught here are the cheapest to fix.', 'Los errores detectados aquí son los más baratos de corregir.', 'Erros encontrados aqui são os mais baratos de corrigir.'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
  }
  if (kind === 'files-vs-dbms') {
    const progs = [l('Sales', 'Ventas', 'Vendas'), l('Billing', 'Facturación', 'Faturamento'), l('Shipping', 'Envíos', 'Entregas')];
    let out = text(300, 60, l('Before: one file per program', 'Antes: un archivo por programa', 'Antes: um arquivo por programa'), `font-size="26" font-weight="700" fill="#${C.ink}"`)
      + text(900, 60, l('With a DBMS: stored once', 'Con un SGBD: se guarda una vez', 'Com um SGBD: guardado uma vez'), `font-size="26" font-weight="700" fill="#${C.ink}"`)
      + `<line x1="600" y1="40" x2="600" y2="490" stroke="#${C.line}" stroke-width="4" stroke-dasharray="12 12"/>`;
    progs.forEach((p, i) => {
      const y = 110 + i * 130;
      out += `<rect x="40" y="${y}" width="200" height="80" rx="20" fill="#${C.paper}" stroke="#${C.teal}" stroke-width="4"/>` + text(140, y + 50, p, `font-size="24" font-weight="600" fill="#${C.ink}"`);
      out += `<path d="M240 ${y + 40} L320 ${y + 40}" stroke="#${C.faint}" stroke-width="4"/>`;
      out += `<rect x="320" y="${y}" width="230" height="80" rx="8" fill="#${C.paper}" stroke="#${C.terracotta}" stroke-width="4"/>` + text(435, y + 34, `${l('file', 'archivo', 'arquivo')} ${i + 1}`, `font-size="22" fill="#${C.ink}"`) + text(435, y + 64, 'Ana · Ana · Ana', `font-size="20" fill="#${C.terracotta}"`);
      out += `<rect x="640" y="${y}" width="200" height="80" rx="20" fill="#${C.paper}" stroke="#${C.teal}" stroke-width="4"/>` + text(740, y + 50, p, `font-size="24" font-weight="600" fill="#${C.ink}"`);
      out += `<path d="M840 ${y + 40} C 900 ${y + 40}, 900 280, 940 280" fill="none" stroke="#${C.teal}" stroke-width="4"/>`;
    });
    out += `<rect x="940" y="210" width="220" height="140" rx="28" fill="#${C.sand}" stroke="#${C.teal}" stroke-width="5"/>` + text(1050, 275, l('DBMS', 'SGBD', 'SGBD'), `font-size="34" font-weight="800" fill="#${C.ink}"`) + text(1050, 315, 'Ana × 1', `font-size="24" fill="#${C.teal}"`);
    return head + out + '</svg>';
  }
  if (kind === 'er-store') {
    const tables = [
      [40, 60, l('CUSTOMER', 'CLIENTE', 'CLIENTE'), ['PK customer_id', 'name', 'city']],
      [440, 60, l('ORDERS', 'PEDIDO', 'PEDIDO'), ['PK order_id', 'FK customer_id', 'order_date']],
      [840, 60, l('ORDER_ITEM', 'DETALLE_PEDIDO', 'ITEM_PEDIDO'), ['PK FK order_id', 'PK FK product_id', 'quantity']],
      [840, 300, l('PRODUCT', 'PRODUCTO', 'PRODUTO'), ['PK product_id', 'name', 'price', 'stock']],
    ];
    let out = `<path d="M360 130 L440 130" stroke="#${C.terracotta}" stroke-width="5"/><path d="M760 130 L840 130" stroke="#${C.terracotta}" stroke-width="5"/><path d="M1000 300 L1000 230" stroke="#${C.terracotta}" stroke-width="5"/>`
      + text(375, 118, '1', `font-size="22" font-weight="700" fill="#${C.terracotta}"`) + text(425, 118, 'N', `font-size="22" font-weight="700" fill="#${C.terracotta}"`)
      + text(775, 118, '1', `font-size="22" font-weight="700" fill="#${C.terracotta}"`) + text(825, 118, 'N', `font-size="22" font-weight="700" fill="#${C.terracotta}"`)
      + text(1020, 290, '1', `font-size="22" font-weight="700" fill="#${C.terracotta}"`) + text(1020, 248, 'N', `font-size="22" font-weight="700" fill="#${C.terracotta}"`);
    for (const [x, y, name, cols] of tables) {
      const h = 56 + cols.length * 36;
      out += `<rect x="${x}" y="${y}" width="320" height="${h}" rx="18" fill="#${C.paper}" stroke="#${C.teal}" stroke-width="4"/><rect x="${x}" y="${y}" width="320" height="50" rx="18" fill="#${C.teal}"/><rect x="${x}" y="${y + 30}" width="320" height="20" fill="#${C.teal}"/>`
        + text(x + 160, y + 34, name, `font-size="22" font-weight="700" fill="#${C.paper}"`)
        + cols.map((c, j) => `<text x="${x + 22}" y="${y + 86 + j * 36}" font-size="20" font-family="monospace" fill="#${C.ink}" ${c.startsWith('PK') ? 'font-weight="700"' : ''}>${esc(c)}</text>`).join('');
    }
    return head + out + '</svg>';
  }
  if (kind === 'three-schema') {
    const levels = [
      [l('External level', 'Nivel externo', 'Nível externo'), l('views per user group', 'vistas por grupo de usuarios', 'visões por grupo de usuários'), C.terracotta],
      [l('Conceptual level', 'Nivel conceptual', 'Nível conceitual'), l('the whole logical model', 'todo el modelo lógico', 'todo o modelo lógico'), C.teal],
      [l('Internal level', 'Nivel interno', 'Nível interno'), l('files, pages, indexes', 'archivos, páginas, índices', 'arquivos, páginas, índices'), C.navy],
    ];
    let out = '';
    levels.forEach(([name, sub, c], i) => {
      const y = 40 + i * 150;
      out += `<rect x="180" y="${y}" width="840" height="120" rx="26" fill="#${C.paper}" stroke="#${c}" stroke-width="5"/>` + text(600, y + 55, name, `font-size="32" font-weight="800" fill="#${c}"`) + text(600, y + 95, sub, `font-size="24" fill="#${C.soft}"`);
      if (i < 2) out += `<path d="M600 ${y + 120} L600 ${y + 150}" stroke="#${C.faint}" stroke-width="4" marker-end="url(#a)"/>`;
    });
    out += text(600, 505, l('Data independence: one level changes without breaking the others.', 'Independencia de datos: un nivel cambia sin romper los demás.', 'Independência de dados: um nível muda sem quebrar os outros.'), `font-size="22" fill="#${C.soft}"`);
    return head + out + '</svg>';
  }
  // context
  const actors = [[200, 110, l('Customer', 'Cliente', 'Cliente'), l('order', 'pedido', 'pedido')], [1000, 110, l('Restaurant', 'Restaurante', 'Restaurante'), l('menu', 'menú', 'cardápio')], [200, 420, l('Courier', 'Repartidor', 'Entregador'), l('location', 'ubicación', 'localização')], [1000, 420, l('Payments', 'Pagos', 'Pagamentos'), l('confirmation', 'confirmación', 'confirmação')]];
  return head + actors.map(([x, y, n, f]) => `<path d="M${x} ${y} L600 265" stroke="#${C.teal}" stroke-width="4" stroke-dasharray="12 8"/><rect x="${x - 120}" y="${y - 38}" width="240" height="76" rx="38" fill="#${C.paper}" stroke="#${C.mauve}" stroke-width="4"/>` + text(x, y + 10, n, `font-size="26" font-weight="700" fill="#${C.ink}"`) + text((x + 600) / 2, (y + 265) / 2 - 12, f, `font-size="20" fill="#${C.soft}"`)).join('')
    + `<rect x="440" y="195" width="320" height="140" rx="30" fill="#${C.sand}" stroke="#${C.teal}" stroke-width="5"/>`
    + text(600, 258, l('Delivery app', 'App de domicilios', 'App de entregas'), `font-size="32" font-weight="800" fill="#${C.ink}"`) + text(600, 298, l('the system', 'el sistema', 'o sistema'), `font-size="22" fill="#${C.soft}"`) + '</svg>';
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
  const cheat = CHEATS[week.subject];
  html += `<figure>${diagramSvg(cheat.diagram, loc)}</figure>`;
  html += cheat.sections.map((sec) => `<h3>${esc(pick(sec.title))}</h3><table>${sec.rows.map(([cmd, d]) => `<tr><td style="width:52%"><code>${esc(cmd)}</code></td><td>${esc(pick(d))}</td></tr>`).join('')}</table>`).join('');
  html += `<h3>${esc(t.troubleshooting)}</h3><table><tr><th>${esc(t.symptom)}</th><th>${esc(t.cause)}</th><th>${esc(t.fix)}</th></tr>${cheat.trouble.map((r) => `<tr>${r.map((c) => `<td>${esc(pick(c))}</td>`).join('')}</tr>`).join('')}</table>`;
  html += `<p class="footer-note">${esc(t.independent)}</p>`;
  return htmlShell(t.cheat, html, loc);
}

function labWorkbookHtml(week, loc) {
  const t = T[loc], pick = L(loc);
  let html = cover(t.weekLabel(week), t.labs, pick(week.title), week.labs.map((l) => `${t.level} ${l.level} · ${l.minutes} ${t.minutes}`), t.independent);
  if (week.labs.some((l) => (l.kind ?? 'shell') === 'shell')) html += `<div class="analogy" style="border-color:#${C.terracotta}"><b>⚠</b>${esc(t.safety)}</div>`;
  if (week.labs.some((l) => l.kind === 'sql')) html += `<div class="analogy" style="border-color:#${C.teal}"><b>▦</b>${esc(t.sqlNote)}</div>`;
  if (week.labs.some((l) => l.kind === 'design')) html += `<div class="analogy" style="border-color:#${C.mauve}"><b>◇</b>${esc(t.designNote)}</div>`;
  week.labs.forEach((lab, i) => {
    const color = LESSON_COLORS[i % LESSON_COLORS.length];
    html += `<section class="${i ? 'section' : ''}"><div class="band" style="background:#${color}"><span class="num">${i + 1}</span><div><div class="meta">${t.level} ${lab.level} · ${lab.minutes} ${t.minutes}</div><h2>${esc(pick(lab.title))}</h2></div></div>`;
    html += `<p><b>${esc(t.goal)}:</b> ${esc(pick(lab.goal))}</p>`;
    lab.steps.forEach((s, j) => {
      html += `<div class="ex"><b>${j + 1}. ${esc(pick(s.title))}</b>${s.commands.length ? `<pre>${esc(s.commands.join('\n'))}</pre>` : ''}<p><b>${esc(t.expected)}:</b> ${esc(pick(s.expected))}</p><p class="hint">${esc(t.reflect)}: ${esc(t.reflectText)}</p></div>`;
    });
    html += '</section>';
  });
  html += `<section class="section"><h2>${esc(t.troubleshooting)}</h2><table><tr><th>${esc(t.symptom)}</th><th>${esc(t.cause)}</th><th>${esc(t.fix)}</th></tr>${CHEATS[week.subject].trouble.map((r) => `<tr>${r.map((c) => `<td>${esc(pick(c))}</td>`).join('')}</tr>`).join('')}</table></section>`;
  return htmlShell(t.labs, html, loc);
}

function slidesHtml(week, loc) {
  const t = T[loc], pick = L(loc);
  const page = (inner, cls = '') => `<section class="slide ${cls}">${inner}<footer>SE Study Lab · ${esc(t.weekLabel(week))}</footer></section>`;
  let html = page(`<div class="kicker">${esc(t.weekLabel(week))}</div><h1>${esc(pick(week.title))}</h1><p class="lead">${esc(pick(week.intro))}</p>`, 'title');
  html += page(`<h2>${esc(t.objectives)}</h2><ul class="big">${week.objectives.map((o) => `<li>${esc(pick(o))}</li>`).join('')}</ul>`);
  html += page(`<h2>${esc(t.agenda)}</h2><div class="tiles">${week.lessons.map((l, i) => `<div class="tile" style="border-color:#${LESSON_COLORS[i % LESSON_COLORS.length]}"><b style="color:#${LESSON_COLORS[i % LESSON_COLORS.length]}">${String(i + 1).padStart(2, '0')}</b><span>${esc(pick(l.title))}</span></div>`).join('')}</div>`);
  week.lessons.forEach((l, i) => {
    const c = LESSON_COLORS[i % LESSON_COLORS.length];
    html += page(`<div class="band" style="background:#${c}"></div><div class="kicker" style="color:#${c}">${esc(t.lesson)} ${i + 1}</div><h2>${esc(pick(l.title))}</h2>
      <div class="cols ${l.diagram ? '' : 'single'}"><div><h3 style="color:#${c}">${esc(t.takeaways)}</h3><ul>${l.takeaways.map((k) => `<li>${esc(pick(k))}</li>`).join('')}</ul></div>${l.diagram ? `<div class="fig">${diagramSvg(l.diagram, loc)}</div>` : ''}</div>
      ${l.analogy ? `<div class="analogy" style="border-color:#${c}"><b style="color:#${c}">${esc(t.analogy)}</b> ${esc(pick(l.analogy))}</div>` : ''}`);
  });
  const cps = week.questions.filter((q) => q.options && q.options.length > 2).slice(0, 3);
  html += page(`<h2>${esc(t.checkpoint)}</h2>${cps.map((q, i) => `<div class="q"><b>${i + 1}. ${esc(pick(q.prompt))}</b><div>${q.options.map((o, j) => `${letter(j)}. ${esc(pick(o))}`).join(' &nbsp; · &nbsp; ')}</div></div>`).join('')}`);
  html += page(`<h1>${esc(t.closing)}</h1><p class="lead">${esc(t.closingText)}</p>`, 'title closing');
  const css = `@page { size: 13.333in 7.5in; margin: 0; }
  body { margin: 0; font-family: Poppins, Arial, sans-serif; color: #${C.ink}; }
  .slide { width: 13.333in; height: 7.5in; box-sizing: border-box; padding: 0.6in 0.75in; position: relative; page-break-after: always; background: #${C.cream}; overflow: hidden; }
  .slide.title { background: #${C.ink}; color: #${C.paper}; display: flex; flex-direction: column; justify-content: center; }
  .slide.closing { background: #${C.teal}; }
  .slide.title::after { content: ""; position: absolute; right: -1.5in; top: -1.5in; width: 6in; height: 6in; border-radius: 50%; background: rgba(47,111,115,0.45); }
  .kicker { font-size: 14pt; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #${C.ochre}; margin-bottom: 10px; position: relative; z-index: 1; }
  h1 { font-size: 40pt; margin: 0 0 18px; max-width: 9.5in; position: relative; z-index: 1; }
  h2 { font-size: 28pt; margin: 0 0 18px; }
  h3 { font-size: 15pt; margin: 0 0 8px; }
  .lead { font-size: 16pt; line-height: 1.5; max-width: 9in; opacity: 0.9; position: relative; z-index: 1; }
  ul { margin: 0; padding-left: 22px; font-size: 15pt; line-height: 1.5; } ul.big { font-size: 17pt; }
  .tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .tile { background: #${C.paper}; border: 2.5px solid; border-radius: 16px; padding: 14px 16px; min-height: 1.6in; display: flex; flex-direction: column; gap: 8px; font-size: 13pt; font-weight: 600; }
  .tile b { font-size: 24pt; }
  .band { position: absolute; left: 0; top: 0; bottom: 0; width: 0.28in; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; } .cols.single { grid-template-columns: 1fr; }
  .fig svg { width: 100%; height: auto; border: 1px solid #${C.line}; border-radius: 12px; background: #${C.paper}; }
  .analogy { position: absolute; left: 0.75in; right: 0.75in; bottom: 0.75in; background: #${C.sand}; border-left: 6px solid; border-radius: 12px; padding: 14px 18px; font-size: 13pt; }
  .q { margin-bottom: 18px; font-size: 14pt; } .q div { color: #${C.soft}; margin-top: 6px; font-size: 12.5pt; }
  footer { position: absolute; left: 0.75in; bottom: 0.25in; font-size: 9pt; color: #${C.faint}; }
  .slide.title footer { color: rgba(255,253,248,0.6); }`;
  return `<!doctype html><html lang="${loc}"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=block" rel="stylesheet"><style>${css}</style></head><body>${html}</body></html>`;
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
  const wf = week.activities.find((a) => a.kind === 'order' && a.items.length <= 6 && a.lessonId === week.lessons[week.lessons.length - 1].id) ?? week.activities.find((a) => a.kind === 'order');
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
  const practiceImage = images[CHEATS[week.subject].diagram === 'git-areas' ? 'branch-merge' : 'er-store'];
  if (practiceImage) s.addImage({ path: practiceImage, x: 6.9, y: 1.4, w: 5.9, h: 2.56 });
  s.addText(t.missions, { ...font, x: 6.9, y: 4.2, w: 6, h: 0.4, fontSize: 15, bold: true, color: C.terracotta });
  s.addText(week.subject === 'database-1' ? 'SQL Lab · Design Studio · draw.io' : 'Git Playground · git commit · git switch -c · git merge', { x: 6.9, y: 4.6, w: 6, h: 0.5, fontFace: 'Courier New', fontSize: 13, color: C.ink });

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
    // One folder per week, so documents of different subjects never collide.
    const dir = join(OUT, loc, week.id);
    mkdirSync(dir, { recursive: true });
    const images = {};
    for (const kind of ['git-areas', 'branch-merge', 'lifecycle', 'requirements', 'context', 'files-vs-dbms', 'er-store', 'three-schema']) {
      images[kind] = svgToPng(diagramSvg(kind, loc), join(CACHE, `${week.id}-${loc}-${kind}.png`));
    }
    htmlToPdf(studyGuideHtml(week, loc), join(dir, 'study-guide.pdf'));
    htmlToPdf(cheatSheetHtml(week, loc), join(dir, 'cheat-sheet.pdf'));
    htmlToPdf(labWorkbookHtml(week, loc), join(dir, 'lab-workbook.pdf'));
    writeFileSync(join(dir, 'study-guide.docx'), await Packer.toBuffer(studyGuideDocx(week, loc, images)));
    await slidesPptx(week, loc, images, join(dir, 'slides.pptx'));
    htmlToPdf(slidesHtml(week, loc), join(dir, 'slides.pdf'));
    console.log(`${week.id} [${loc}] documents written to public/downloads/${loc}/${week.id}/`);
  }
}
