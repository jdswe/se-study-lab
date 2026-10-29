// Generates the downloadable documents for every published week, in English,
// Spanish, and Portuguese. They are short, print-first companions to the site,
// not copies of it:
//   summary.pdf      the week on one or two pages: core ideas and what to watch out for
//   cheat-sheet.pdf  commands or formulas to keep next to you
//   worksheet.pdf    exercises with space to write, a quick check, and an answer key
//   worksheet.docx   the same worksheet, editable
//   slides.pptx      one idea per slide, with diagrams (slides.pdf is its preview twin)
// Diagrams are the website's own components rendered to SVG, so both always match.
// PDFs are printed from HTML with headless Chrome. Run with `npm run docs`.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  BorderStyle, Document, Packer, PageBreak, Paragraph, TabStopType, TextRun,
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
  good: '3E7D5A', bad: 'A9473D',
};
// Subject accent, as on the website (src/lib/subjectStyle.ts).
const ACCENT = { 'software-development-1': C.teal, 'database-1': C.navy, 'calculus-1': C.mauve };
const SUBJECT_NAME = {
  'software-development-1': { en: 'Software Development 1', es: 'Desarrollo de Software 1', pt: 'Desenvolvimento de Software 1' },
  'database-1': { en: 'Databases 1', es: 'Bases de Datos 1', pt: 'Bancos de Dados 1' },
  'calculus-1': { en: 'Calculus 1', es: 'Cálculo 1', pt: 'Cálculo 1' },
};

const T = {
  en: {
    brand: 'SE Study Lab', week: 'Week', lesson: 'Lesson',
    summary: 'Week summary', cheat: 'Cheat sheet', worksheet: 'Worksheet', slides: 'Slides',
    coreIdeas: 'Core ideas, lesson by lesson', watchOut: 'Watch out', mistake: 'Mistake', fix: 'Fix',
    keyTerms: 'Key terms', troubleshooting: 'When something goes wrong', symptom: 'Symptom', cause: 'Likely cause',
    name: 'Name', date: 'Date', partA: 'Exercises', partAHint: 'Show your work. Each exercise has a hint at the end: try without it first.',
    partB: 'Quick check', partBHint: 'Circle one answer.', answerKey: 'Answer key', level: ['Warm-up', 'Practice', 'Challenge'],
    hint: 'Hint', matchHint: 'Match each item on the left with one on the right.', blank: 'Answer',
    thinkOfIt: 'Think of it like this', checkYourself: 'Check yourself', answersInNotes: 'Answers are in the speaker notes.',
    nextSteps: 'Practise next', labs: 'Labs', tools: 'On the site',
    toolNames: { 'git-playground': 'Git Playground', 'sql-lab': 'SQL Lab', 'design-studio': 'Design Studio', 'inequality-lab': 'Inequality Lab' },
    alsoOnline: 'Flashcards, the quiz, and interactive tools are on the site.',
    stepByStep: 'Step by step',
  },
  es: {
    brand: 'SE Study Lab', week: 'Semana', lesson: 'Lección',
    summary: 'Resumen de la semana', cheat: 'Hoja de referencia', worksheet: 'Hoja de ejercicios', slides: 'Diapositivas',
    coreIdeas: 'Ideas clave, lección por lección', watchOut: 'Cuidado con esto', mistake: 'Error', fix: 'Solución',
    keyTerms: 'Términos clave', troubleshooting: 'Cuando algo sale mal', symptom: 'Síntoma', cause: 'Causa probable',
    name: 'Nombre', date: 'Fecha', partA: 'Ejercicios', partAHint: 'Muestra tu procedimiento. Cada ejercicio trae una pista al final: intenta primero sin ella.',
    partB: 'Comprobación rápida', partBHint: 'Encierra una respuesta.', answerKey: 'Respuestas', level: ['Calentamiento', 'Práctica', 'Desafío'],
    hint: 'Pista', matchHint: 'Relaciona cada elemento de la izquierda con uno de la derecha.', blank: 'Respuesta',
    thinkOfIt: 'Piénsalo así', checkYourself: 'Ponte a prueba', answersInNotes: 'Las respuestas están en las notas del orador.',
    nextSteps: 'Practica después', labs: 'Laboratorios', tools: 'En el sitio',
    toolNames: { 'git-playground': 'Simulador de Git', 'sql-lab': 'Laboratorio SQL', 'design-studio': 'Estudio de diseño', 'inequality-lab': 'Laboratorio de desigualdades' },
    alsoOnline: 'Las tarjetas, el cuestionario y las herramientas interactivas están en el sitio.',
    stepByStep: 'Paso a paso',
  },
  pt: {
    brand: 'SE Study Lab', week: 'Semana', lesson: 'Lição',
    summary: 'Resumo da semana', cheat: 'Folha de referência', worksheet: 'Folha de exercícios', slides: 'Slides',
    coreIdeas: 'Ideias-chave, lição por lição', watchOut: 'Cuidado com isto', mistake: 'Erro', fix: 'Solução',
    keyTerms: 'Termos-chave', troubleshooting: 'Quando algo dá errado', symptom: 'Sintoma', cause: 'Causa provável',
    name: 'Nome', date: 'Data', partA: 'Exercícios', partAHint: 'Mostre seu raciocínio. Cada exercício traz uma dica no final: tente primeiro sem ela.',
    partB: 'Verificação rápida', partBHint: 'Circule uma resposta.', answerKey: 'Respostas', level: ['Aquecimento', 'Prática', 'Desafio'],
    hint: 'Dica', matchHint: 'Associe cada item da esquerda a um da direita.', blank: 'Resposta',
    thinkOfIt: 'Pense assim', checkYourself: 'Teste-se', answersInNotes: 'As respostas estão nas notas do apresentador.',
    nextSteps: 'Pratique depois', labs: 'Laboratórios', tools: 'No site',
    toolNames: { 'git-playground': 'Simulador de Git', 'sql-lab': 'Laboratório SQL', 'design-studio': 'Estúdio de design', 'inequality-lab': 'Laboratório de desigualdades' },
    alsoOnline: 'Os cartões, o questionário e as ferramentas interativas estão no site.',
    stepByStep: 'Passo a passo',
  },
};

// Cheat sheets and troubleshooting tables, one per subject. `math: true`
// sections show formulas in a math face instead of monospace.
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
      { title: H('Design: ER → tables', 'Diseño: ER → tablas', 'Projeto: ER → tabelas'), rows: [
        R('Entity → table', 'Attributes become columns, key becomes PK', 'Los atributos pasan a columnas y la clave a PK', 'Os atributos viram colunas e a chave vira PK'),
        R('1:N → FK on the N side', 'order.customer_id REFERENCES customer', 'order.customer_id REFERENCES customer', 'order.customer_id REFERENCES customer'),
        R('N:M → junction table', 'Both keys as FKs, often a composite PK', 'Ambas claves como FK, a menudo PK compuesta', 'As duas chaves como FK, muitas vezes PK composta'),
        R('Multivalued → new table', 'One row per value (patient_phone)', 'Una fila por valor (patient_phone)', 'Uma linha por valor (patient_phone)'),
        R('Weak entity → PK = owner + discriminator', 'room(ward_id, room_no)', 'room(ward_id, room_no)', 'room(ward_id, room_no)'),
        R('Derived → not stored', 'Calculate it in queries (age)', 'Se calcula en consultas (edad)', 'Calcule nas consultas (idade)'),
      ] },
      { title: H('DDL: build the structure', 'DDL: construir la estructura', 'DDL: construir a estrutura'), rows: [
        R('CREATE TABLE t (id INTEGER PRIMARY KEY, …);', 'Create a table', 'Crear una tabla', 'Criar uma tabela'),
        R('ALTER TABLE t ADD COLUMN phone VARCHAR(20);', 'Add a column', 'Agregar una columna', 'Adicionar uma coluna'),
        R('TRUNCATE TABLE t;', 'Empty it, keep the table', 'Vaciarla y conservar la tabla', 'Esvaziar e manter a tabela'),
        R('DROP TABLE t;', 'Remove the table and its data', 'Eliminar la tabla y sus datos', 'Remover a tabela e seus dados'),
        R('… ON DELETE CASCADE | RESTRICT | SET NULL', 'What happens to children when a parent goes', 'Qué pasa con las hijas cuando se va el padre', 'O que acontece com as filhas quando o pai sai'),
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
  'calculus-1': {
    diagram: 'sign-chart',
    sections: [
      { math: true, title: H('Intervals', 'Intervalos', 'Intervalos'), rows: [
        R('[a, b]  ⇔  a ≤ x ≤ b', 'Both ends included', 'Ambos extremos incluidos', 'As duas extremidades incluídas'),
        R('(a, b)  ⇔  a < x < b', 'Both ends excluded', 'Ambos extremos excluidos', 'As duas extremidades excluídas'),
        R('[a, ∞)  ⇔  x ≥ a', '∞ always takes a parenthesis', '∞ siempre lleva paréntesis', '∞ sempre leva parêntese'),
        R('A ∪ B  /  A ∩ B', '"or" (either) / "and" (overlap)', '"o" (alguno) / "y" (parte común)', '"ou" (algum) / "e" (parte comum)'),
        R('ℝ = (−∞, ∞),  ∅', 'All reals / no solution', 'Todos los reales / sin solución', 'Todos os reais / sem solução'),
      ] },
      { math: true, title: H('Equations', 'Ecuaciones', 'Equações'), rows: [
        R('ax + b = 0  →  x = −b/a', 'Linear: one root', 'Lineal: una raíz', 'Linear: uma raiz'),
        R('x = (−b ± √(b² − 4ac)) / 2a', 'Quadratic formula', 'Fórmula cuadrática', 'Fórmula quadrática'),
        R('Δ = b² − 4ac', '> 0: two roots, = 0: one, < 0: none', '> 0: dos raíces, = 0: una, < 0: ninguna', '> 0: duas raízes, = 0: uma, < 0: nenhuma'),
        R('A·B = 0  ⇔  A = 0 or B = 0', 'Zero product rule', 'Regla del producto cero', 'Regra do produto zero'),
        R('p/q:  p | a₀,  q | aₙ', 'Rational root candidates', 'Candidatos a raíz racional', 'Candidatos a raiz racional'),
      ] },
      { math: true, title: H('Inequality rules', 'Reglas de las desigualdades', 'Regras das desigualdades'), rows: [
        R('a < b  ⇒  a + c < b + c', 'Adding keeps the sign', 'Sumar mantiene el signo', 'Somar mantém o sinal'),
        R('c > 0:  a < b  ⇒  ac < bc', 'Positive factor keeps it', 'Un factor positivo lo mantiene', 'Um fator positivo o mantém'),
        R('c < 0:  a < b  ⇒  ac > bc', 'Negative factor flips it', 'Un factor negativo lo invierte', 'Um fator negativo o inverte'),
        R('P(x)/Q(x) ≥ 0', 'Never multiply by Q(x): use a sign chart', 'Nunca multipliques por Q(x): usa una tabla de signos', 'Nunca multiplique por Q(x): use um quadro de sinais'),
      ] },
      { math: true, title: H('Absolute value', 'Valor absoluto', 'Valor absoluto'), rows: [
        R('|x − a|', 'Distance from x to a', 'Distancia de x a a', 'Distância de x até a'),
        R('|x − a| < r  ⇔  a − r < x < a + r', 'One interval', 'Un intervalo', 'Um intervalo'),
        R('|x − a| > r  ⇔  x < a − r or x > a + r', 'Two pieces', 'Dos trozos', 'Dois pedaços'),
      ] },
      { title: H('Sign chart in five steps', 'Tabla de signos en cinco pasos', 'Quadro de sinais em cinco passos'), rows: [
        R('1. … ≥ 0', 'Move everything to one side', 'Pasa todo a un lado', 'Passe tudo para um lado'),
        R('2. (x − r₁)(x − r₂)…', 'Factor', 'Factoriza', 'Fatore'),
        R('3. r₁, r₂, …', 'Critical points: zeros and undefined points', 'Puntos críticos: ceros y puntos no definidos', 'Pontos críticos: zeros e pontos não definidos'),
        R('4. one test value per interval', 'The sign is constant between them', 'El signo es constante entre ellos', 'O sinal é constante entre eles'),
        R('5. ∪ of the right intervals', 'Endpoints: [ ] for ≤ ≥, ( ) for < > and denominators', 'Extremos: [ ] con ≤ ≥, ( ) con < > y denominadores', 'Extremidades: [ ] com ≤ ≥, ( ) com < > e denominadores'),
      ] },
    ],
    trouble: [
      [H('Answer is the mirror of the right one', 'La respuesta es el reflejo de la correcta', 'A resposta é o reflexo da certa'), H('Divided by a negative without flipping', 'Dividiste entre un negativo sin invertir', 'Dividiu por um negativo sem inverter'), H('Test one value from your answer in the original', 'Prueba un valor de tu respuesta en la original', 'Teste um valor da sua resposta na original')],
      [H('A point makes the expression undefined', 'Un punto deja la expresión sin definir', 'Um ponto deixa a expressão indefinida'), H('A zero of the denominator was included', 'Se incluyó un cero del denominador', 'Um zero do denominador foi incluído'), H('Always use ( ) at denominator zeros', 'Usa siempre ( ) en los ceros del denominador', 'Use sempre ( ) nos zeros do denominador')],
      [H('x² < 9 solved as x < 3', 'x² < 9 resuelto como x < 3', 'x² < 9 resolvido como x < 3'), H('Took a square root like an equation', 'Se sacó raíz como en una ecuación', 'Tirou a raiz como numa equação'), H('Factor (x − 3)(x + 3) and use a sign chart: (−3, 3)', 'Factoriza (x − 3)(x + 3) y usa una tabla de signos: (−3, 3)', 'Fatore (x − 3)(x + 3) e use um quadro de sinais: (−3, 3)')],
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

// The website's tokens (light theme) and diagram rules, with animation off for print.
const TOKENS = readFileSync(join(ROOT, 'src/styles/tokens.css'), 'utf8').split('@media')[0];
const DIAGRAM_CSS = readFileSync(join(ROOT, 'src/styles/app.css'), 'utf8').split('\n').filter((l) => l.startsWith('.diagram')).join('\n')
  + '\n.diagram, .diagram * { animation: none !important; } .diagram .draw { stroke-dashoffset: 0 !important; } .diagram { margin: 0; max-width: none; }';
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">';

/** Width/height ratio from an SVG's viewBox. */
function svgRatio(svg) {
  const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  return m ? Number(m[2]) / Number(m[1]) : 0.4;
}

function svgToPng(svg, accent, outFile, width = 1440) {
  const height = Math.round(width * svgRatio(svg));
  const tmp = join(CACHE, `svg-${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${TOKENS}:root{--subject:#${accent}}${DIAGRAM_CSS}html,body{margin:0;background:#${C.paper}}svg{display:block;width:${width}px;height:${height}px}.diagram text{font-size:14px}</style></head><body>${svg}</body></html>`);
  chrome(['--virtual-time-budget=8000', `--window-size=${width},${height}`, `--screenshot=${outFile}`, pathToFileURL(tmp).href]);
  return { path: outFile, ratio: height / width };
}

// ---------- shared print styles ----------
function printCss(accent) {
  return `${TOKENS}
:root { --subject: #${accent}; }
${DIAGRAM_CSS}
@page { size: A4; margin: 14mm 15mm 16mm; }
* { box-sizing: border-box; }
body { font-family: Poppins, Arial, sans-serif; color: #${C.ink}; font-size: 9.6pt; line-height: 1.5; margin: 0; }
h1, h2, h3 { line-height: 1.2; margin: 0; }
p { margin: 0 0 6px; }
code, .mono { font-family: "JetBrains Mono", monospace; font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; font-size: 0.92em; }
.math { font-family: "Cambria Math", "STIX Two Math", "Latin Modern Math", Georgia, serif; font-size: 1.08em; }
.head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #${accent}; padding-bottom: 6px; margin-bottom: 14px; font-size: 8.5pt; color: #${C.faint}; }
.head b { color: #${accent}; font-weight: 700; }
.title { display: grid; grid-template-columns: auto 1fr; gap: 0 14px; align-items: end; margin-bottom: 14px; }
.title .num { font-size: 54pt; font-weight: 800; line-height: 0.85; color: #${accent}; }
.title h1 { font-size: 20pt; font-weight: 700; }
.title .kind { grid-column: 2; font-size: 10pt; color: #${C.soft}; font-weight: 600; }
h2 { font-size: 11.5pt; font-weight: 700; color: #${accent}; margin: 14px 0 8px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; }
.card { break-inside: avoid; border-top: 1.5px solid #${C.line}; padding-top: 6px; }
.card h3 { font-size: 9.8pt; font-weight: 700; margin-bottom: 4px; display: flex; gap: 6px; }
.card h3 span { color: #${accent}; }
.card ul { margin: 0; padding-left: 14px; }
.card li { margin-bottom: 2px; }
table { width: 100%; border-collapse: collapse; font-size: 8.8pt; }
th { text-align: left; font-weight: 600; color: #${C.soft}; border-bottom: 1.5px solid #${accent}; padding: 4px 6px; }
td { border-bottom: 1px solid #${C.line}; padding: 4px 6px; vertical-align: top; }
figure { margin: 4px 0 10px; break-inside: avoid; }
figure svg { width: 100%; height: auto; display: block; }
.foot { margin-top: 12px; font-size: 7.5pt; color: #${C.faint}; }
`;
}

function page(week, loc, kind, body) {
  const t = T[loc], pick = L(loc);
  const accent = ACCENT[week.subject] ?? C.teal;
  return `<!doctype html><html lang="${loc}"><head><meta charset="utf-8"><title>${esc(kind)} · ${esc(pick(week.title))}</title>${FONTS}<style>${printCss(accent)}</style></head><body>
<div class="head"><span><b>${esc(t.brand)}</b> · ${esc(pick(SUBJECT_NAME[week.subject]))}</span><span>${esc(kind)}</span></div>
<div class="title"><span class="num">${week.week}</span><h1>${esc(pick(week.title))}</h1><span class="kind">${esc(t.week)} ${week.week} · ${esc(kind)}</span></div>
${body}
<p class="foot">${esc(t.brand)} · ${esc(t.alsoOnline)}</p></body></html>`;
}

// ---------- summary ----------
function summaryHtml(week, loc, svgs) {
  const t = T[loc], pick = L(loc);
  let body = `<h2>${esc(t.coreIdeas)}</h2><div class="grid2">`;
  body += week.lessons.map((l, i) => `<div class="card"><h3><span>${i + 1}</span>${esc(pick(l.title))}</h3><ul>${l.takeaways.map((k) => `<li>${esc(pick(k))}</li>`).join('')}</ul></div>`).join('');
  body += '</div>';
  const cheat = CHEATS[week.subject];
  if (cheat?.diagram && svgs[cheat.diagram]) body += `<figure>${svgs[cheat.diagram]}</figure>`;
  const pitfalls = [...week.commonMistakes, ...week.lessons.flatMap((l) => l.pitfalls ?? [])].slice(0, 8);
  body += `<h2>${esc(t.watchOut)}</h2><table><tr><th style="width:50%">${esc(t.mistake)}</th><th>${esc(t.fix)}</th></tr>${pitfalls.map((p) => `<tr><td>${esc(pick(p.mistake))}</td><td>${esc(pick(p.fix))}</td></tr>`).join('')}</table>`;
  return page(week, loc, t.summary, body);
}

// ---------- cheat sheet ----------
function cheatHtml(week, loc, svgs) {
  const t = T[loc], pick = L(loc);
  const cheat = CHEATS[week.subject];
  let body = '';
  if (cheat.diagram && svgs[cheat.diagram]) body += `<figure>${svgs[cheat.diagram]}</figure>`;
  body += `<div class="grid2">${cheat.sections.map((sec) => `<div class="card"><h3>${esc(pick(sec.title))}</h3><table>${sec.rows.map(([cmd, d]) => `<tr><td style="width:56%" class="${sec.math ? 'math' : 'mono'}">${esc(cmd)}</td><td>${esc(pick(d))}</td></tr>`).join('')}</table></div>`).join('')}</div>`;
  body += `<h2>${esc(t.troubleshooting)}</h2><table><tr><th>${esc(t.symptom)}</th><th>${esc(t.cause)}</th><th>${esc(t.fix)}</th></tr>${cheat.trouble.map((r) => `<tr>${r.map((c) => `<td>${esc(pick(c))}</td>`).join('')}</tr>`).join('')}</table>`;
  return page(week, loc, t.cheat, body);
}

// ---------- worksheet ----------
/** Exercises and quick-check questions, numbered once for the PDF and the Word file. */
function worksheetItems(week) {
  const exercises = week.lessons.flatMap((l, li) => (l.exercises ?? []).map((e) => ({ ...e, lesson: li + 1 })));
  const quick = week.questions.filter((q) => q.options && q.options.length >= 3 && !q.code).slice(0, 8);
  return { exercises, quick };
}

function worksheetHtml(week, loc) {
  const t = T[loc], pick = L(loc);
  const { exercises, quick } = worksheetItems(week);
  const lines = (n) => `<div class="lines">${'<i></i>'.repeat(n)}</div>`;
  let body = `<div class="who"><span>${esc(t.name)}</span><span>${esc(t.date)}</span></div>`;
  body += `<h2>${esc(t.partA)}</h2><p class="note">${esc(t.partAHint)}</p>`;
  body += exercises.map((e, i) => `<div class="ex"><p><b>${i + 1}. ${esc(pick(e.title))}</b> <span class="lvl">${esc(t.level[e.level - 1])} · ${esc(t.lesson)} ${e.lesson}</span></p><p>${esc(pick(e.prompt))}</p>${lines(e.level + 1)}<p class="hint">${esc(t.hint)}: ${esc(pick(e.hint))}</p></div>`).join('');
  body += `<h2>${esc(t.partB)}</h2><p class="note">${esc(t.partBHint)}</p>`;
  body += quick.map((q, i) => `<div class="ex"><p><b>${exercises.length + i + 1}. ${esc(pick(q.prompt))}</b></p><p class="opts">${q.options.map((o, j) => `<span>${letter(j)}) ${esc(pick(o))}</span>`).join('')}</p></div>`).join('');
  body += `<div class="key"><h2>${esc(t.answerKey)}</h2><ol>`;
  body += exercises.map((e) => `<li>${esc(pick(e.solution))}</li>`).join('');
  body += quick.map((q) => `<li><b>${letter(q.answer)}</b> — ${esc(pick(q.explanation))}</li>`).join('');
  body += '</ol></div>';
  const extra = `<style>
.who { display: flex; gap: 24px; margin-bottom: 4px; } .who span { flex: 1; border-bottom: 1px solid #${C.faint}; padding-bottom: 2px; color: #${C.faint}; font-size: 8.5pt; }
.note { color: #${C.soft}; font-size: 8.8pt; }
.ex { break-inside: avoid; margin-bottom: 10px; }
.lvl { font-size: 7.8pt; color: #${C.faint}; font-weight: 500; }
.lines i { display: block; height: 7.5mm; border-bottom: 1px dotted #${C.line}; }
.hint { font-size: 8.2pt; color: #${C.faint}; margin-top: 3px; }
.opts { display: flex; flex-wrap: wrap; gap: 4px 18px; }
.key { break-before: page; } .key ol { padding-left: 18px; } .key li { margin-bottom: 4px; }
</style>`;
  return page(week, loc, t.worksheet, extra + body);
}

function worksheetDocx(week, loc) {
  const t = T[loc], pick = L(loc);
  const accent = ACCENT[week.subject] ?? C.teal;
  const { exercises, quick } = worksheetItems(week);
  const run = (text, o = {}) => new TextRun({ text, font: 'Arial', size: 21, ...o });
  const p = (children, o = {}) => new Paragraph({ spacing: { after: 100, line: 290 }, children, ...o });
  const rule = () => new Paragraph({ spacing: { after: 0 }, border: { bottom: { style: BorderStyle.DOTTED, size: 6, color: C.line, space: 14 } }, children: [run(' ')] });
  const children = [
    p([run(`${t.brand} · ${pick(SUBJECT_NAME[week.subject])}`, { color: C.faint, size: 18 })], { border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: accent, space: 4 } } }),
    p([run(`${week.week}  `, { bold: true, size: 64, color: accent }), run(pick(week.title), { bold: true, size: 36, color: C.ink })], { spacing: { before: 200, after: 60 } }),
    p([run(`${t.week} ${week.week} · ${t.worksheet}`, { color: C.soft, bold: true })]),
    p([run(`${t.name}: ____________________________     ${t.date}: ______________`, { color: C.faint })], { spacing: { before: 200, after: 240 }, tabStops: [{ type: TabStopType.RIGHT, position: 9000 }] }),
    p([run(t.partA, { bold: true, size: 26, color: accent })], { spacing: { before: 120, after: 60 } }),
    p([run(t.partAHint, { color: C.soft, size: 19 })]),
  ];
  exercises.forEach((e, i) => {
    children.push(p([run(`${i + 1}. ${pick(e.title)}`, { bold: true }), run(`   ${t.level[e.level - 1]} · ${t.lesson} ${e.lesson}`, { color: C.faint, size: 17 })], { spacing: { before: 200, after: 60 } }));
    children.push(p([run(pick(e.prompt))]));
    for (let k = 0; k < e.level + 1; k++) children.push(rule());
    children.push(p([run(`${t.hint}: ${pick(e.hint)}`, { color: C.faint, italics: true, size: 18 })], { spacing: { before: 80, after: 100 } }));
  });
  children.push(p([run(t.partB, { bold: true, size: 26, color: accent })], { spacing: { before: 300, after: 60 } }));
  children.push(p([run(t.partBHint, { color: C.soft, size: 19 })]));
  quick.forEach((q, i) => {
    children.push(p([run(`${exercises.length + i + 1}. ${pick(q.prompt)}`, { bold: true })], { spacing: { before: 160, after: 60 } }));
    children.push(p([run(q.options.map((o, j) => `${letter(j)}) ${pick(o)}`).join('      '))]));
  });
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(p([run(t.answerKey, { bold: true, size: 26, color: accent })]));
  exercises.forEach((e, i) => children.push(p([run(`${i + 1}. `, { bold: true }), run(pick(e.solution))])));
  quick.forEach((q, i) => children.push(p([run(`${exercises.length + i + 1}. ${letter(q.answer)} — `, { bold: true }), run(pick(q.explanation))])));
  return new Document({
    creator: t.brand,
    title: `${t.worksheet} · ${pick(week.title)}`,
    styles: { default: { document: { run: { font: 'Arial' } } } },
    sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children }],
  });
}

// ---------- slides ----------
/** The slide plan, shared by the PowerPoint file and its PDF twin. */
function slidePlan(week) {
  const workflow = week.activities.find((a) => a.kind === 'order' && a.items.length <= 6);
  const checks = week.questions.filter((q) => q.options && q.options.length >= 3 && !q.code).slice(0, 3);
  return { workflow, checks };
}

function slidesHtml(week, loc, svgs) {
  const t = T[loc], pick = L(loc);
  const accent = ACCENT[week.subject] ?? C.teal;
  const { workflow, checks } = slidePlan(week);
  const foot = `<footer><span>${esc(t.brand)} · ${esc(pick(SUBJECT_NAME[week.subject]))} · ${esc(t.week)} ${week.week}</span></footer>`;
  const slide = (inner, cls = '') => `<section class="slide ${cls}">${inner}${foot}</section>`;
  let html = slide(`<div class="big-num">${week.week}</div><div><p class="kicker">${esc(pick(SUBJECT_NAME[week.subject]))} · ${esc(t.week)} ${week.week}</p><h1>${esc(pick(week.title))}</h1></div>`, 'cover');
  week.lessons.forEach((l, i) => {
    const svg = l.diagram ? svgs[l.diagram] : '';
    html += slide(`<p class="kicker">${esc(t.lesson)} ${i + 1} · ${esc(pick(l.title))}</p>
      <div class="idea ${svg ? 'with-fig' : ''}"><h2>${esc(pick(l.takeaways[0]))}</h2>${svg ? `<div class="fig">${svg}</div>` : `<ul>${l.takeaways.slice(1).map((k) => `<li>${esc(pick(k))}</li>`).join('')}</ul>`}</div>
      ${l.analogy ? `<p class="quote"><b>${esc(t.thinkOfIt)}.</b> ${esc(pick(l.analogy))}</p>` : ''}`);
  });
  if (workflow) {
    html += slide(`<p class="kicker">${esc(t.stepByStep)}</p><h2>${esc(pick(workflow.title))}</h2><ol class="flow">${workflow.items.map((it) => `<li>${esc(pick(it))}</li>`).join('')}</ol>`);
  }
  html += slide(`<p class="kicker">${esc(t.checkYourself)}</p>${checks.map((q, i) => `<div class="q"><b>${i + 1}. ${esc(pick(q.prompt))}</b><p>${q.options.map((o, j) => `${letter(j)}) ${esc(pick(o))}`).join('&emsp;')}</p></div>`).join('')}<p class="small">${esc(t.answersInNotes)}</p>`);
  html += slide(`<p class="kicker">${esc(t.nextSteps)}</p><div class="next"><div><h3>${esc(t.labs)}</h3><ul>${week.labs.map((l) => `<li>${esc(pick(l.title))}</li>`).join('')}</ul></div><div><h3>${esc(t.tools)}</h3><ul>${week.tools.map((k) => `<li>${esc(t.toolNames[k])}</li>`).join('')}</ul></div></div>`);
  const css = `${TOKENS}:root{--subject:#${accent}}${DIAGRAM_CSS}
  @page { size: 13.333in 7.5in; margin: 0; }
  body { margin: 0; font-family: Poppins, Arial, sans-serif; color: #${C.ink}; }
  .slide { width: 13.333in; height: 7.5in; box-sizing: border-box; padding: 0.7in 0.85in 0.8in 1.05in; position: relative; break-after: page; background: #${C.cream}; overflow: hidden; display: flex; flex-direction: column; }
  .slide::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 0.22in; background: #${accent}; }
  .kicker { font-size: 13pt; font-weight: 600; color: #${accent}; margin: 0 0 14px; }
  h1 { font-size: 44pt; line-height: 1.1; margin: 0; max-width: 10in; }
  h2 { font-size: 30pt; line-height: 1.2; margin: 0 0 18px; font-weight: 700; }
  h3 { font-size: 15pt; margin: 0 0 8px; color: #${accent}; }
  .cover { flex-direction: row; align-items: center; gap: 0.5in; }
  .big-num { font-size: 200pt; font-weight: 800; line-height: 0.8; color: #${accent}; }
  .idea { flex: 1; display: grid; grid-template-columns: 1fr; gap: 0.4in; align-content: center; padding-bottom: 0.3in; }
  .idea.with-fig { grid-template-columns: 1fr 1.25fr; align-items: center; }
  .idea.with-fig h2 { font-size: 26pt; }
  .fig svg { width: 100%; height: auto; display: block; background: #${C.paper}; border-radius: 10px; }
  ul { margin: 0; padding-left: 24px; font-size: 17pt; line-height: 1.55; color: #${C.soft}; }
  .quote { margin: 0; padding: 12px 16px; border-left: 4px solid #${accent}; background: #${C.paper}; font-size: 13pt; color: #${C.soft}; border-radius: 0 10px 10px 0; }
  .flow { list-style: none; counter-reset: s; display: flex; gap: 14px; padding: 0; margin: 0.3in 0 0; }
  .flow li { counter-increment: s; flex: 1; font-size: 13.5pt; line-height: 1.4; padding-top: 0.75in; position: relative; }
  .flow li::before { content: counter(s); position: absolute; top: 0; left: 0; width: 0.55in; height: 0.55in; border-radius: 50%; background: #${accent}; color: #${C.paper}; font-weight: 700; font-size: 18pt; display: grid; place-items: center; }
  .q { margin-bottom: 22px; font-size: 16pt; } .q p { color: #${C.soft}; margin: 6px 0 0; font-size: 14pt; }
  .small { font-size: 11pt; color: #${C.faint}; margin-top: auto; }
  .next { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6in; }
  footer { position: absolute; left: 1.05in; bottom: 0.3in; font-size: 9pt; color: #${C.faint}; }`;
  return `<!doctype html><html lang="${loc}"><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body>${html}</body></html>`;
}

async function slidesPptx(week, loc, images, outFile) {
  const t = T[loc], pick = L(loc);
  const accent = ACCENT[week.subject] ?? C.teal;
  const { workflow, checks } = slidePlan(week);
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
  pptx.title = `${pick(week.title)} · ${t.brand}`;
  const font = { fontFace: 'Arial' };
  pptx.defineSlideMaster({
    title: 'IDEA',
    background: { color: C.cream },
    objects: [
      { rect: { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: accent } } },
      { text: { text: `${t.brand} · ${pick(SUBJECT_NAME[week.subject])} · ${t.week} ${week.week}`, options: { x: 1.05, y: 7.0, w: 9, h: 0.3, fontFace: 'Arial', fontSize: 10, color: C.faint } } },
    ],
    slideNumber: { x: 12.4, y: 7.0, fontFace: 'Arial', fontSize: 10, color: C.faint },
  });
  const kicker = (s, text) => s.addText(text, { ...font, x: 1.05, y: 0.55, w: 11.5, h: 0.45, fontSize: 14, bold: true, color: accent });

  // Cover: the week number is the visual.
  let s = pptx.addSlide({ masterName: 'IDEA' });
  s.addText(String(week.week), { ...font, x: 0.9, y: 1.2, w: 3.2, h: 4.4, fontSize: 220, bold: true, color: accent, valign: 'middle' });
  s.addText(`${pick(SUBJECT_NAME[week.subject])} · ${t.week} ${week.week}`, { ...font, x: 4.3, y: 2.6, w: 8.5, h: 0.5, fontSize: 16, bold: true, color: accent });
  s.addText(pick(week.title), { ...font, x: 4.3, y: 3.1, w: 8.5, h: 2.0, fontSize: 40, bold: true, color: C.ink, valign: 'top' });

  // One idea per lesson: the core statement, with its diagram when there is one.
  week.lessons.forEach((l, i) => {
    const sl = pptx.addSlide({ masterName: 'IDEA' });
    kicker(sl, `${t.lesson} ${i + 1} · ${pick(l.title)}`);
    const img = l.diagram && images[l.diagram];
    if (img) {
      sl.addText(pick(l.takeaways[0]), { ...font, x: 1.05, y: 1.4, w: 4.6, h: 3.6, fontSize: 26, bold: true, color: C.ink, valign: 'top' });
      const w = 6.6, h = Math.min(4.6, w * img.ratio);
      sl.addImage({ path: img.path, x: 6.1, y: 1.4, w, h });
    } else {
      sl.addText(pick(l.takeaways[0]), { ...font, x: 1.05, y: 1.4, w: 11.4, h: 1.9, fontSize: 30, bold: true, color: C.ink, valign: 'top' });
      sl.addText(l.takeaways.slice(1).map((k) => ({ text: pick(k), options: { bullet: { code: '25CF' }, breakLine: true } })), { ...font, x: 1.05, y: 3.4, w: 11.4, h: 2.2, fontSize: 18, color: C.soft, paraSpaceAfter: 8, valign: 'top' });
    }
    if (l.analogy) {
      sl.addShape(pptx.ShapeType.rect, { x: 1.05, y: 5.75, w: 0.06, h: 0.95, fill: { color: accent }, line: { color: accent } });
      sl.addText([{ text: `${t.thinkOfIt}. `, options: { bold: true, color: C.ink } }, { text: pick(l.analogy), options: { color: C.soft } }], { ...font, x: 1.25, y: 5.7, w: 11.2, h: 1.05, fontSize: 13, valign: 'middle' });
    }
    sl.addNotes([...l.takeaways.map((k) => `• ${pick(k)}`), '', ...l.body.map((p) => pick(p))].join('\n'));
  });

  // A process drawn as numbered steps.
  if (workflow) {
    s = pptx.addSlide({ masterName: 'IDEA' });
    kicker(s, t.stepByStep);
    s.addText(pick(workflow.title), { ...font, x: 1.05, y: 1.0, w: 11.4, h: 0.8, fontSize: 28, bold: true, color: C.ink });
    const n = workflow.items.length;
    const colW = 11.4 / n;
    workflow.items.forEach((it, i) => {
      const x = 1.05 + i * colW;
      s.addShape(pptx.ShapeType.ellipse, { x, y: 2.3, w: 0.6, h: 0.6, fill: { color: accent }, line: { color: accent } });
      s.addText(String(i + 1), { ...font, x, y: 2.3, w: 0.6, h: 0.6, align: 'center', valign: 'middle', fontSize: 18, bold: true, color: C.paper });
      if (i < n - 1) s.addShape(pptx.ShapeType.line, { x: x + 0.7, y: 2.6, w: colW - 0.8, h: 0, line: { color: C.line, width: 1.5 } });
      s.addText(pick(it), { ...font, x, y: 3.1, w: colW - 0.2, h: 2.4, fontSize: 14, color: C.ink, valign: 'top' });
    });
    s.addNotes(pick(workflow.explanation));
  }

  // Check yourself: answers in the notes.
  s = pptx.addSlide({ masterName: 'IDEA' });
  kicker(s, t.checkYourself);
  checks.forEach((q, i) => {
    const y = 1.2 + i * 1.75;
    s.addText(`${i + 1}. ${pick(q.prompt)}`, { ...font, x: 1.05, y, w: 11.4, h: 0.75, fontSize: 17, bold: true, color: C.ink, valign: 'top' });
    s.addText(q.options.map((o, j) => `${letter(j)}) ${pick(o)}`).join('      '), { ...font, x: 1.05, y: y + 0.75, w: 11.4, h: 0.7, fontSize: 14, color: C.soft, valign: 'top' });
  });
  s.addText(t.answersInNotes, { ...font, x: 1.05, y: 6.45, w: 11, h: 0.35, fontSize: 11, color: C.faint });
  s.addNotes(checks.map((q, i) => `${i + 1}. ${letter(q.answer)} — ${pick(q.explanation)}`).join('\n'));

  // Practise next.
  s = pptx.addSlide({ masterName: 'IDEA' });
  kicker(s, t.nextSteps);
  s.addText(t.labs, { ...font, x: 1.05, y: 1.3, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: accent });
  s.addText(week.labs.map((l) => ({ text: pick(l.title), options: { bullet: true, breakLine: true } })), { ...font, x: 1.05, y: 1.85, w: 5.5, h: 4, fontSize: 17, color: C.ink, valign: 'top', paraSpaceAfter: 6 });
  s.addText(t.tools, { ...font, x: 7.0, y: 1.3, w: 5.5, h: 0.5, fontSize: 18, bold: true, color: accent });
  s.addText(week.tools.map((k) => ({ text: t.toolNames[k], options: { bullet: true, breakLine: true } })), { ...font, x: 7.0, y: 1.85, w: 5.5, h: 4, fontSize: 17, color: C.ink, valign: 'top', paraSpaceAfter: 6 });

  await pptx.writeFile({ fileName: outFile });
}

// ---------- main ----------
rmSync(CACHE, { recursive: true, force: true });
mkdirSync(CACHE, { recursive: true });
await build({ entryPoints: [join(ROOT, 'src/content/index.ts')], bundle: true, platform: 'node', format: 'esm', outfile: join(CACHE, 'content.mjs'), logLevel: 'error' });
await build({ entryPoints: [join(ROOT, 'scripts/diagram-entry.tsx')], bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic', outfile: join(CACHE, 'diagrams.mjs'), logLevel: 'error' });
const { weeks } = await import(pathToFileURL(join(CACHE, 'content.mjs')).href);
const { renderDiagram } = await import(pathToFileURL(join(CACHE, 'diagrams.mjs')).href);

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
for (const week of weeks) {
  if (only.length && !only.includes(week.id)) continue;
  const accent = ACCENT[week.subject] ?? C.teal;
  const kinds = [...new Set([...week.lessons.map((l) => l.diagram).filter(Boolean), CHEATS[week.subject]?.diagram].filter(Boolean))];
  for (const loc of LOCALES) {
    // One folder per week; old files are removed so only the current set is published.
    const dir = join(OUT, loc, week.id);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const svgs = Object.fromEntries(kinds.map((k) => [k, renderDiagram(k, loc)]));
    const images = Object.fromEntries(kinds.map((k) => [k, svgToPng(svgs[k], accent, join(CACHE, `${week.id}-${loc}-${k}.png`))]));
    htmlToPdf(summaryHtml(week, loc, svgs), join(dir, 'summary.pdf'));
    htmlToPdf(cheatHtml(week, loc, svgs), join(dir, 'cheat-sheet.pdf'));
    htmlToPdf(worksheetHtml(week, loc), join(dir, 'worksheet.pdf'));
    writeFileSync(join(dir, 'worksheet.docx'), await Packer.toBuffer(worksheetDocx(week, loc)));
    await slidesPptx(week, loc, images, join(dir, 'slides.pptx'));
    htmlToPdf(slidesHtml(week, loc, svgs), join(dir, 'slides.pdf'));
    console.log(`${week.id} [${loc}] → public/downloads/${loc}/${week.id}/`);
  }
}
