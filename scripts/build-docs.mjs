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
import katex from 'katex';

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
const ACCENT = {
  'software-development-1': C.teal,
  'database-1': C.navy,
  'calculus-1': C.mauve,
  logic: '8A5A6E',
  'programming-1': 'B0652F',
  'operating-systems-1': '4F6B4A',
  'history-of-software-engineering': '8C6D3F',
  'discrete-mathematics': '5B5F97',
};
const SUBJECT_NAME = {
  'software-development-1': { en: 'Software Development 1', es: 'Desarrollo de Software 1', pt: 'Desenvolvimento de Software 1' },
  'database-1': { en: 'Databases 1', es: 'Bases de Datos 1', pt: 'Bancos de Dados 1' },
  'calculus-1': { en: 'Calculus 1', es: 'Cálculo 1', pt: 'Cálculo 1' },
  logic: { en: 'Logic', es: 'Lógica', pt: 'Lógica' },
  'programming-1': { en: 'Programming 1', es: 'Programación 1', pt: 'Programação 1' },
  'operating-systems-1': { en: 'Operating Systems 1', es: 'Sistemas Operativos 1', pt: 'Sistemas Operacionais 1' },
  'history-of-software-engineering': { en: 'History of Software Engineering', es: 'Historia de la Ingeniería de Software', pt: 'História da Engenharia de Software' },
  'discrete-mathematics': { en: 'Discrete Mathematics', es: 'Matemática Discreta', pt: 'Matemática Discreta' },
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
    toolNames: { 'git-playground': 'Git Playground', 'sql-lab': 'SQL Lab', 'design-studio': 'Design Studio', 'inequality-lab': 'Inequality Lab', 'graph-lab': 'Graph Lab', 'ruffini-lab': 'Ruffini Lab' },
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
    toolNames: { 'git-playground': 'Simulador de Git', 'sql-lab': 'Laboratorio SQL', 'design-studio': 'Estudio de diseño', 'inequality-lab': 'Laboratorio de desigualdades', 'graph-lab': 'Laboratorio de gráficas', 'ruffini-lab': 'Laboratorio de Ruffini' },
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
    toolNames: { 'git-playground': 'Simulador de Git', 'sql-lab': 'Laboratório SQL', 'design-studio': 'Estúdio de design', 'inequality-lab': 'Laboratório de desigualdades', 'graph-lab': 'Laboratório de gráficos', 'ruffini-lab': 'Laboratório de Briot–Ruffini' },
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
  logic: {
    sections: [
      { math: true, title: H('Connectives', 'Conectivas', 'Conectivos'), rows: [
        R('¬p', '"not p": true when p is false', '"no p": verdadero cuando p es falso', '"não p": verdadeiro quando p é falso'),
        R('p ∧ q', '"p and q": true only when both are true', '"p y q": verdadero solo si ambos son verdaderos', '"p e q": verdadeiro só se ambos forem verdadeiros'),
        R('p ∨ q', '"p or q": true when at least one is true', '"p o q": verdadero si al menos uno es verdadero', '"p ou q": verdadeiro se ao menos um for verdadeiro'),
        R('p → q', '"if p then q": false only when p is true and q is false', '"si p entonces q": falso solo si p es verdadero y q falso', '"se p então q": falso só se p for verdadeiro e q falso'),
        R('p ↔ q', '"p if and only if q": both have the same truth value', '"p si y solo si q": ambos tienen el mismo valor de verdad', '"p se e somente se q": ambos têm o mesmo valor de verdade'),
      ] },
      { math: true, title: H('Truth tables', 'Tablas de verdad', 'Tabelas-verdade'), rows: [
        R('2ⁿ rows', 'n propositional variables', 'n variables proposicionales', 'n variáveis proposicionais'),
        R('¬ > ∧ > ∨ > → > ↔', 'Precedence, from tightest to loosest; use parentheses when unsure', 'Precedencia, de mayor a menor; usa paréntesis si dudas', 'Precedência, da maior para a menor; use parênteses se houver dúvida'),
        R('tautology', 'True in every row', 'Verdadera en todas las filas', 'Verdadeira em todas as linhas'),
        R('contradiction', 'False in every row', 'Falsa en todas las filas', 'Falsa em todas as linhas'),
        R('contingency', 'True in some rows and false in others', 'Verdadera en unas filas y falsa en otras', 'Verdadeira em algumas linhas e falsa em outras'),
      ] },
      { math: true, title: H('Useful equivalences', 'Equivalencias útiles', 'Equivalências úteis'), rows: [
        R('¬(p ∧ q) ≡ ¬p ∨ ¬q', 'De Morgan', 'De Morgan', 'De Morgan'),
        R('¬(p ∨ q) ≡ ¬p ∧ ¬q', 'De Morgan', 'De Morgan', 'De Morgan'),
        R('p → q ≡ ¬p ∨ q', 'Rewrite an implication', 'Reescribir una implicación', 'Reescrever uma implicação'),
        R('p → q ≡ ¬q → ¬p', 'Contrapositive', 'Contrarrecíproca', 'Contrapositiva'),
        R('p ↔ q ≡ (p → q) ∧ (q → p)', 'A biconditional is two implications', 'Un bicondicional son dos implicaciones', 'Um bicondicional são duas implicações'),
        R('p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)', 'Distributivity', 'Distributividad', 'Distributividade'),
      ] },
      { math: true, title: H('Normal forms and resolution', 'Formas normales y resolución', 'Formas normais e resolução'), rows: [
        R('literal', 'A variable or its negation', 'Una variable o su negación', 'Uma variável ou sua negação'),
        R('CNF: (p ∨ ¬q) ∧ (r ∨ s)', 'AND of OR-clauses', 'AND de cláusulas OR', 'AND de cláusulas OR'),
        R('DNF: (p ∧ q) ∨ (¬r ∧ s)', 'OR of AND-terms', 'OR de términos AND', 'OR de termos AND'),
        R('(p ∨ q), (¬q ∨ r) ⊢ (p ∨ r)', 'Resolvent on q', 'Resolvente sobre q', 'Resolvente sobre q'),
        R('□', 'Empty clause: a contradiction was derived', 'Cláusula vacía: se derivó una contradicción', 'Cláusula vazia: derivou-se uma contradição'),
      ] },
      { math: true, title: H('Predicate logic', 'Lógica de predicados', 'Lógica de predicados'), rows: [
        R('∀x P(x)', 'True for every x in the domain', 'Verdadero para todo x del dominio', 'Verdadeiro para todo x do domínio'),
        R('∃x P(x)', 'True for at least one x', 'Verdadero para al menos un x', 'Verdadeiro para ao menos um x'),
        R('¬∀x P(x) ≡ ∃x ¬P(x)', 'Negate a universal', 'Negar un universal', 'Negar um universal'),
        R('¬∃x P(x) ≡ ∀x ¬P(x)', 'Negate an existential', 'Negar un existencial', 'Negar um existencial'),
        R('∀x (P(x) → Q(x))', 'Every P is a Q', 'Todo P es un Q', 'Todo P é um Q'),
      ] },
    ],
    trouble: [
      [H('An implication feels backwards', 'Una implicación parece al revés', 'Uma implicação parece invertida'), H('Reading p → q as causation', 'Leer p → q como causalidad', 'Ler p → q como causalidade'), H('p → q is false only when p is true and q is false', 'p → q es falsa solo si p es verdadera y q falsa', 'p → q é falsa só se p for verdadeira e q falsa')],
      [H('The negation of "all" came out as "none"', 'La negación de "todos" salió como "ninguno"', 'A negação de "todos" saiu como "nenhum"'), H('Wrote ¬∀ as ∀¬ and stopped there', 'Se escribió ¬∀ como ∀¬ y se paró ahí', 'Escreveu ¬∀ como ∀¬ e parou aí'), H('Swap the quantifier too: ¬∀x P(x) ≡ ∃x ¬P(x)', 'Cambia también el cuantificador: ¬∀x P(x) ≡ ∃x ¬P(x)', 'Troque também o quantificador: ¬∀x P(x) ≡ ∃x ¬P(x)')],
      [H('The truth table has too few rows', 'La tabla de verdad tiene pocas filas', 'A tabela-verdade tem poucas linhas'), H('Forgot that each variable doubles the rows', 'Se olvidó que cada variable duplica las filas', 'Esqueceu que cada variável dobra as linhas'), H('Rows = 2ⁿ; for three variables write all 8 combinations', 'Filas = 2ⁿ; con tres variables escribe las 8 combinaciones', 'Linhas = 2ⁿ; com três variáveis escreva as 8 combinações')],
    ],
  },
  'programming-1': {
    sections: [
      { title: H('Program skeleton', 'Esqueleto del programa', 'Esqueleto do programa'), rows: [
        R('public class Main { … }', 'One public class per file; the name matches the file', 'Una clase pública por archivo; el nombre coincide con el archivo', 'Uma classe pública por arquivo; o nome coincide com o arquivo'),
        R('public static void main(String[] args)', 'Entry point of the program', 'Punto de entrada del programa', 'Ponto de entrada do programa'),
        R('System.out.println("Hi");', 'Print a line', 'Imprimir una línea', 'Imprimir uma linha'),
        R('// comment', 'Ignored by the compiler', 'El compilador lo ignora', 'O compilador ignora'),
      ] },
      { title: H('Variables and types', 'Variables y tipos', 'Variáveis e tipos'), rows: [
        R('int age = 20;', 'Whole numbers', 'Números enteros', 'Números inteiros'),
        R('double price = 9.99;', 'Decimal numbers', 'Números decimales', 'Números decimais'),
        R('boolean ok = true;', 'true or false', 'true o false', 'true ou false'),
        R("char grade = 'A';", 'One character, single quotes', 'Un carácter, comillas simples', 'Um caractere, aspas simples'),
        R('String name = "Ana";', 'Text, double quotes, an object', 'Texto, comillas dobles, un objeto', 'Texto, aspas duplas, um objeto'),
        R('(int) 3.9', 'Cast: truncates to 3', 'Conversión: trunca a 3', 'Conversão: trunca para 3'),
      ] },
      { title: H('Operators', 'Operadores', 'Operadores'), rows: [
        R('+  -  *  /  %', 'Arithmetic; % is the remainder', 'Aritmética; % es el resto', 'Aritmética; % é o resto'),
        R('7 / 2 → 3', 'Integer division drops the decimals', 'La división entera descarta los decimales', 'A divisão inteira descarta os decimais'),
        R('7 % 2 → 1', 'Remainder', 'Resto', 'Resto'),
        R('==  !=  <  >  <=  >=', 'Comparison, produces a boolean', 'Comparación, produce un booleano', 'Comparação, produz um booleano'),
        R('&&  ||  !', 'and / or / not', 'y / o / no', 'e / ou / não'),
        R('count++   count += 2', 'Increment / compound assignment', 'Incremento / asignación compuesta', 'Incremento / atribuição composta'),
      ] },
      { title: H('Input and output', 'Entrada y salida', 'Entrada e saída'), rows: [
        R('Scanner in = new Scanner(System.in);', 'Read from the keyboard', 'Leer del teclado', 'Ler do teclado'),
        R('in.nextInt()   in.nextDouble()', 'Read a number', 'Leer un número', 'Ler um número'),
        R('in.nextLine()', 'Read a whole line', 'Leer una línea completa', 'Ler uma linha inteira'),
        R('in.nextLine()', 'Call it after nextInt() to consume the leftover newline', 'Llámala tras nextInt() para consumir el salto pendiente', 'Chame-a depois de nextInt() para consumir a quebra pendente'),
        R('System.out.printf("%.2f%n", x);', 'Format with two decimals', 'Formatear con dos decimales', 'Formatar com duas casas decimais'),
      ] },
      { title: H('Decisions and loops', 'Decisiones y ciclos', 'Decisões e laços'), rows: [
        R('if (x > 0) { … } else { … }', 'Two branches', 'Dos ramas', 'Dois ramos'),
        R('switch (day) { case 1: … break; default: … }', 'Many exact cases', 'Muchos casos exactos', 'Muitos casos exatos'),
        R('while (condition) { … }', 'Check first; may run zero times', 'Comprueba primero; puede ejecutarse cero veces', 'Verifica primeiro; pode executar zero vezes'),
        R('do { … } while (condition);', 'Run once, then check', 'Ejecuta una vez y luego comprueba', 'Executa uma vez e depois verifica'),
        R('for (int i = 0; i < n; i++) { … }', 'Counted loop', 'Ciclo contado', 'Laço contado'),
        R('break;   continue;', 'Leave the loop / skip to the next iteration', 'Salir del ciclo / pasar a la siguiente iteración', 'Sair do laço / pular para a próxima iteração'),
      ] },
      { title: H('Classes and objects', 'Clases y objetos', 'Classes e objetos'), rows: [
        R('class Student { … }', 'A blueprint for objects', 'Un molde para objetos', 'Um molde para objetos'),
        R('new Student("Ana", 20)', 'Create an object with the constructor', 'Crear un objeto con el constructor', 'Criar um objeto com o construtor'),
        R('this.name = name;', 'Distinguish the field from the parameter', 'Distinguir el campo del parámetro', 'Distinguir o campo do parâmetro'),
        R('private int age;', 'Encapsulation: hide the field', 'Encapsulación: ocultar el campo', 'Encapsulamento: ocultar o campo'),
        R('public int getAge() { return age; }', 'Controlled read access', 'Acceso de lectura controlado', 'Acesso de leitura controlado'),
        R('static int count;', 'One copy shared by the whole class', 'Una copia compartida por toda la clase', 'Uma cópia compartilhada por toda a classe'),
      ] },
    ],
    trouble: [
      [H('String comparison fails', 'La comparación de String falla', 'A comparação de String falha'), H('Used == instead of equals', 'Se usó == en vez de equals', 'Usou == em vez de equals'), H('Write name.equals("Ana"); == compares references', 'Escribe name.equals("Ana"); == compara referencias', 'Escreva name.equals("Ana"); == compara referências')],
      [H('A division returns 0 or 1 unexpectedly', 'Una división devuelve 0 o 1 sin esperarlo', 'Uma divisão retorna 0 ou 1 inesperadamente'), H('Both operands are integers', 'Ambos operandos son enteros', 'Os dois operandos são inteiros'), H('Make one a double: 7.0 / 2 or (double) total / n', 'Haz uno double: 7.0 / 2 o (double) total / n', 'Faça um deles double: 7.0 / 2 ou (double) total / n')],
      [H('Input skips a line', 'La entrada se salta una línea', 'A entrada pula uma linha'), H('nextInt() left the newline in the buffer', 'nextInt() dejó el salto de línea en el búfer', 'nextInt() deixou a quebra de linha no buffer'), H('Add an extra in.nextLine() before reading text', 'Agrega un in.nextLine() extra antes de leer texto', 'Adicione um in.nextLine() extra antes de ler texto')],
      [H('The loop never ends', 'El ciclo nunca termina', 'O laço nunca termina'), H('The condition never becomes false', 'La condición nunca se vuelve falsa', 'A condição nunca se torna falsa'), H('Update the control variable inside the loop and trace a few iterations', 'Actualiza la variable de control dentro del ciclo y traza algunas iteraciones', 'Atualize a variável de controle dentro do laço e trace algumas iterações')],
    ],
  },
  'operating-systems-1': {
    diagram: 'files-vs-dbms',
    sections: [
      { title: H('Processes and threads', 'Procesos e hilos', 'Processos e threads'), rows: [
        R('new → ready → running → waiting → terminated', 'Process states', 'Estados del proceso', 'Estados do processo'),
        R('PCB', 'Per-process data: id, state, registers, memory, open files', 'Datos por proceso: id, estado, registros, memoria, archivos abiertos', 'Dados por processo: id, estado, registradores, memória, arquivos abertos'),
        R('fork()', 'Create a child process; returns 0 in the child', 'Crear un proceso hijo; devuelve 0 en el hijo', 'Criar um processo filho; retorna 0 no filho'),
        R('thread', 'Shares code, data, and files with its process', 'Comparte código, datos y archivos con su proceso', 'Compartilha código, dados e arquivos com seu processo'),
        R('context switch', 'Save one context and restore another; pure overhead', 'Guardar un contexto y restaurar otro; puro sobrecosto', 'Salvar um contexto e restaurar outro; puro overhead'),
      ] },
      { title: H('CPU scheduling', 'Planificación de CPU', 'Escalonamento de CPU'), rows: [
        R('FCFS', 'First come, first served; suffers the convoy effect', 'Primero en llegar, primero en servirse; sufre el efecto convoy', 'Primeiro a chegar, primeiro a ser atendido; sofre o efeito comboio'),
        R('SJF', 'Shortest job first; optimal average wait when all arrive together', 'Trabajo más corto primero; espera media óptima si todos llegan juntos', 'Trabalho mais curto primeiro; espera média ótima se todos chegam juntos'),
        R('Priority', 'Highest priority runs first; starvation is possible', 'Mayor prioridad primero; puede haber inanición', 'Maior prioridade primeiro; pode haver inanição'),
        R('Round Robin', 'Fixed quantum, rotate; good response time', 'Quantum fijo, rotación; buen tiempo de respuesta', 'Quantum fixo, rotação; bom tempo de resposta'),
        R('Wait = start − arrival; turnaround = finish − arrival', 'Formulas', 'Fórmulas', 'Fórmulas'),
        R('Average = total waiting ÷ number of processes', 'Never forget the division', 'Nunca olvides la división', 'Nunca esqueça a divisão'),
      ] },
      { title: H('Memory and paging', 'Memoria y paginación', 'Memória e paginação'), rows: [
        R('logical address', 'The address the program sees', 'La dirección que ve el programa', 'O endereço que o programa vê'),
        R('physical address', 'The address in RAM', 'La dirección en la RAM', 'O endereço na RAM'),
        R('page = address ÷ page size', 'High bits of the address', 'Bits altos de la dirección', 'Bits altos do endereço'),
        R('offset = address mod page size', 'Low bits of the address', 'Bits bajos de la dirección', 'Bits baixos do endereço'),
        R('page table', 'Maps page number to frame number', 'Asigna número de página a marco', 'Mapeia número de página para quadro'),
        R('page fault', 'The page is not in memory', 'La página no está en memoria', 'A página não está na memória'),
      ] },
      { title: H('Page replacement', 'Reemplazo de páginas', 'Substituição de páginas'), rows: [
        R('FIFO', 'Evict the oldest loaded page', 'Expulsar la página cargada hace más tiempo', 'Expulsar a página carregada há mais tempo'),
        R('LRU', 'Evict the least recently used page', 'Expulsar la página usada menos recientemente', 'Expulsar a página usada menos recentemente'),
        R('Optimal', 'Evict the page used farthest in the future; a benchmark only', 'Expulsar la página usada más lejos en el futuro; solo referencia', 'Expulsar a página usada mais longe no futuro; apenas referência'),
        R('Belady’s anomaly', 'More frames can mean more faults under FIFO', 'Más marcos pueden significar más fallos con FIFO', 'Mais quadros podem significar mais faltas com FIFO'),
      ] },
      { title: H('Disks and RAID', 'Discos y RAID', 'Discos e RAID'), rows: [
        R('seek + rotation + transfer', 'Disk access time', 'Tiempo de acceso al disco', 'Tempo de acesso ao disco'),
        R('FCFS', 'Serve requests in arrival order', 'Atender solicitudes en orden de llegada', 'Atender requisições na ordem de chegada'),
        R('SSTF', 'Closest request next; starvation possible', 'La solicitud más cercana primero; puede haber inanición', 'A requisição mais próxima primeiro; pode haver inanição'),
        R('SCAN / C-SCAN', 'Sweep like an elevator / wrap around', 'Barrido como un ascensor / vuelta circular', 'Varredura como um elevador / volta circular'),
        R('RAID 0 / 1 / 5', 'Striping / mirroring / striping with parity', 'Fragmentación / espejo / fragmentación con paridad', 'Fragmentação / espelhamento / fragmentação com paridade'),
      ] },
      { title: H('File systems and protection', 'Sistemas de archivos y protección', 'Sistemas de arquivos e proteção'), rows: [
        R('inode', 'Metadata: owner, size, permissions, block pointers', 'Metadatos: dueño, tamaño, permisos, punteros a bloques', 'Metadados: dono, tamanho, permissões, ponteiros para blocos'),
        R('contiguous / linked / indexed', 'File allocation methods', 'Métodos de asignación de archivos', 'Métodos de alocação de arquivos'),
        R('bitmap / free list', 'Free-space tracking', 'Seguimiento del espacio libre', 'Rastreamento do espaço livre'),
        R('journaling', 'Write the intent first so a crash can be repaired', 'Escribir la intención primero para reparar tras un fallo', 'Escrever a intenção primeiro para reparar após uma falha'),
        R('chmod 754 file', 'rwx r-x r--', 'rwx r-x r--', 'rwx r-x r--'),
        R('4 2 1', 'Read / write / execute in octal', 'Lectura / escritura / ejecución en octal', 'Leitura / escrita / execução em octal'),
      ] },
    ],
    trouble: [
      [H('The average waiting time looks wrong', 'El tiempo medio de espera parece incorrecto', 'O tempo médio de espera parece errado'), H('Averaged over the wrong count or ignored arrival time', 'Se promedió con el conteo equivocado o se ignoró la llegada', 'Foi calculada com a contagem errada ou ignorou a chegada'), H('List arrival, start, and finish for every process, then divide by n', 'Anota llegada, inicio y fin de cada proceso y divide entre n', 'Anote chegada, início e fim de cada processo e divida por n')],
      [H('The page-fault count is too high', 'El conteo de fallos de página es demasiado alto', 'A contagem de faltas de página é alta demais'), H('A hit was counted as a fault', 'Se contó un acierto como fallo', 'Um acerto foi contado como falta'), H('Count only when the page is not already in a frame', 'Cuenta solo cuando la página no está ya en un marco', 'Conte apenas quando a página não está já em um quadro')],
      [H('The octal permission is wrong', 'El permiso octal está mal', 'A permissão octal está errada'), H('Digits were added instead of converting each triad', 'Se sumaron los dígitos en vez de convertir cada tríada', 'Os dígitos foram somados em vez de converter cada tríade'), H('rwx = 4+2+1 = 7, r-x = 4+0+1 = 5, r-- = 4', 'rwx = 4+2+1 = 7, r-x = 4+0+1 = 5, r-- = 4', 'rwx = 4+2+1 = 7, r-x = 4+0+1 = 5, r-- = 4')],
    ],
  },
  'history-of-software-engineering': {
    diagram: 'lifecycle',
    sections: [
      { title: H('Timeline', 'Línea de tiempo', 'Linha do tempo'), rows: [
        R('1940s', 'Stored-program computers: programs live in memory like data', 'Computadoras de programa almacenado: los programas viven en memoria como datos', 'Computadores de programa armazenado: os programas vivem na memória como dados'),
        R('1950s', 'Assembly and the first high-level languages; compilers appear', 'Ensamblador y los primeros lenguajes de alto nivel; aparecen los compiladores', 'Assembly e as primeiras linguagens de alto nível; surgem os compiladores'),
        R('1960s', 'Software crisis: late projects, overruns, unreliable systems', 'Crisis del software: proyectos tardíos, sobrecostos, sistemas poco fiables', 'Crise do software: projetos atrasados, estouros de custo, sistemas não confiáveis'),
        R('1968', 'The term "software engineering" is proposed as a call for discipline', 'Se propone el término "ingeniería de software" como llamado a la disciplina', 'O termo "engenharia de software" é proposto como chamado à disciplina'),
        R('1970s', 'Structured programming, the waterfall model, relational databases', 'Programación estructurada, modelo en cascada, bases de datos relacionales', 'Programação estruturada, modelo cascata, bancos de dados relacionais'),
        R('1980s', 'Personal computers, graphical interfaces, object orientation', 'Computadoras personales, interfaces gráficas, orientación a objetos', 'Computadores pessoais, interfaces gráficas, orientação a objetos'),
        R('1990s', 'The web, client–server systems, open source, rapid development', 'La web, sistemas cliente–servidor, código abierto, desarrollo rápido', 'A web, sistemas cliente–servidor, código aberto, desenvolvimento rápido'),
        R('2001', 'Agile values: people, working software, collaboration, response to change', 'Valores ágiles: personas, software funcionando, colaboración, respuesta al cambio', 'Valores ágeis: pessoas, software funcionando, colaboração, resposta à mudança'),
        R('2010s–', 'Cloud, containers, continuous delivery, DevOps', 'Nube, contenedores, entrega continua, DevOps', 'Nuvem, contêineres, entrega contínua, DevOps'),
      ] },
      { title: H('Ideas that keep returning', 'Ideas que vuelven', 'Ideias que retornam'), rows: [
        R('software crisis', 'Demand grew faster than the ability to build reliable systems', 'La demanda creció más rápido que la capacidad de construir sistemas fiables', 'A demanda cresceu mais rápido que a capacidade de construir sistemas confiáveis'),
        R('process', 'A repeatable way to organise work, not a guarantee of quality', 'Una forma repetible de organizar el trabajo, no una garantía de calidad', 'Uma forma repetível de organizar o trabalho, não uma garantia de qualidade'),
        R('lifecycle model', 'Waterfall, iterative, spiral, agile: different risk strategies', 'Cascada, iterativo, espiral, ágil: distintas estrategias de riesgo', 'Cascata, iterativo, espiral, ágil: diferentes estratégias de risco'),
        R('technical debt', 'A shortcut today costs more later', 'Un atajo hoy cuesta más después', 'Um atalho hoje custa mais depois'),
        R('open source', 'Shared code and distributed collaboration', 'Código compartido y colaboración distribuida', 'Código compartilhado e colaboração distribuída'),
        R('DevOps', 'Development and operations share responsibility for delivery', 'Desarrollo y operaciones comparten la responsabilidad de entregar', 'Desenvolvimento e operações compartilham a responsabilidade pela entrega'),
      ] },
      { title: H('Reading history critically', 'Leer la historia con criterio', 'Ler a história com critério'), rows: [
        R('date', 'Ask what problem the technique solved at that moment', 'Pregunta qué problema resolvía la técnica en ese momento', 'Pergunte que problema a técnica resolvia naquele momento'),
        R('context', 'Hardware, market, and team size shaped each method', 'El hardware, el mercado y el tamaño del equipo moldearon cada método', 'O hardware, o mercado e o tamanho da equipe moldaram cada método'),
        R('no single inventor', 'Most changes are gradual and shared', 'Casi todos los cambios son graduales y compartidos', 'Quase todas as mudanças são graduais e compartilhadas'),
        R('hype cycle', 'A new label often renames an older idea', 'Una etiqueta nueva a menudo renombra una idea vieja', 'Um rótulo novo muitas vezes renomeia uma ideia antiga'),
      ] },
    ],
    trouble: [
      [H('One date explains everything', 'Una fecha lo explica todo', 'Uma data explica tudo'), H('Treating history as a list of isolated inventions', 'Tratar la historia como una lista de inventos aislados', 'Tratar a história como uma lista de invenções isoladas'), H('Connect each change to a problem: cost, reliability, scale, or speed', 'Conecta cada cambio con un problema: costo, fiabilidad, escala o velocidad', 'Conecte cada mudança a um problema: custo, confiabilidade, escala ou velocidade')],
      [H('Agile means no planning', 'Ágil significa no planificar', 'Ágil significa não planejar'), H('Confusing agility with improvisation', 'Confundir agilidad con improvisación', 'Confundir agilidade com improvisação'), H('Agile plans in short cycles and adapts; it still plans', 'Lo ágil planifica en ciclos cortos y adapta; igual planifica', 'O ágil planeja em ciclos curtos e adapta; ainda planeja')],
      [H('Waterfall is always wrong', 'La cascada siempre está mal', 'A cascata está sempre errada'), H('Judging a model outside its context', 'Juzgar un modelo fuera de su contexto', 'Julgar um modelo fora de seu contexto'), H('Stable requirements and heavy regulation can favour a sequential model', 'Requisitos estables y mucha regulación pueden favorecer un modelo secuencial', 'Requisitos estáveis e forte regulação podem favorecer um modelo sequencial')],
    ],
  },
  'discrete-mathematics': {
    diagram: 'real-sets',
    sections: [
      { math: true, title: H('Sets', 'Conjuntos', 'Conjuntos'), rows: [
        R('A ∪ B', 'Elements in A or B', 'Elementos en A o B', 'Elementos em A ou B'),
        R('A ∩ B', 'Elements in both', 'Elementos en ambos', 'Elementos em ambos'),
        R('A − B', 'In A but not in B', 'En A pero no en B', 'Em A mas não em B'),
        R('A × B', 'Ordered pairs (a, b)', 'Pares ordenados (a, b)', 'Pares ordenados (a, b)'),
        R('|A|', 'Number of elements', 'Número de elementos', 'Número de elementos'),
        R('P(A)', 'All subsets; |P(A)| = 2^|A|', 'Todos los subconjuntos; |P(A)| = 2^|A|', 'Todos os subconjuntos; |P(A)| = 2^|A|'),
        R('∅', 'The empty set; ∅ ⊆ every set', 'El conjunto vacío; ∅ ⊆ todo conjunto', 'O conjunto vazio; ∅ ⊆ todo conjunto'),
      ] },
      { math: true, title: H('Relations and functions', 'Relaciones y funciones', 'Relações e funções'), rows: [
        R('R ⊆ A × B', 'A relation from A to B', 'Una relación de A en B', 'Uma relação de A em B'),
        R('reflexive / symmetric / transitive', 'The three properties of an equivalence relation', 'Las tres propiedades de una relación de equivalencia', 'As três propriedades de uma relação de equivalência'),
        R('equivalence class [a]', 'Everything related to a', 'Todo lo relacionado con a', 'Tudo o que se relaciona com a'),
        R('partial order', 'Reflexive, antisymmetric, transitive', 'Reflexiva, antisimétrica, transitiva', 'Reflexiva, antissimétrica, transitiva'),
        R('injective', 'Different inputs give different outputs', 'Entradas distintas dan salidas distintas', 'Entradas distintas dão saídas distintas'),
        R('surjective', 'Every element of the codomain is hit', 'Todo elemento del codominio es alcanzado', 'Todo elemento do contradomínio é atingido'),
        R('bijective', 'Both; an inverse exists', 'Ambas; existe inversa', 'Ambas; existe inversa'),
      ] },
      { math: true, title: H('Counting', 'Conteo', 'Contagem'), rows: [
        R('n!', 'Orderings of n distinct items', 'Ordenaciones de n elementos distintos', 'Ordenações de n elementos distintos'),
        R('P(n, k) = n! / (n − k)!', 'Ordered selection without repetition', 'Selección ordenada sin repetición', 'Seleção ordenada sem repetição'),
        R('C(n, k) = n! / (k!(n − k)!)', 'Unordered selection', 'Selección sin orden', 'Seleção sem ordem'),
        R('n^k', 'Ordered selection with repetition', 'Selección ordenada con repetición', 'Seleção ordenada com repetição'),
        R('|A ∪ B| = |A| + |B| − |A ∩ B|', 'Inclusion–exclusion', 'Inclusión–exclusión', 'Inclusão–exclusão'),
        R('pigeonhole', 'More items than boxes → some box has at least two', 'Más objetos que cajas → alguna caja tiene al menos dos', 'Mais itens que caixas → alguma caixa tem ao menos dois'),
      ] },
      { math: true, title: H('Probability', 'Probabilidad', 'Probabilidade'), rows: [
        R('P(E) = |E| / |S|', 'Equally likely outcomes', 'Resultados igualmente probables', 'Resultados igualmente prováveis'),
        R('P(Eᶜ) = 1 − P(E)', 'Complement', 'Complemento', 'Complemento'),
        R('P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'Union', 'Unión', 'União'),
        R('P(A | B) = P(A ∩ B) / P(B)', 'Conditional probability', 'Probabilidad condicional', 'Probabilidade condicional'),
        R('independent: P(A ∩ B) = P(A)P(B)', 'Independence test', 'Prueba de independencia', 'Teste de independência'),
      ] },
      { math: true, title: H('Number theory', 'Teoría de números', 'Teoria dos números'), rows: [
        R('a | b', 'a divides b', 'a divide a b', 'a divide b'),
        R('gcd(a, b) = gcd(b, a mod b)', 'Euclid’s algorithm', 'Algoritmo de Euclides', 'Algoritmo de Euclides'),
        R('a ≡ b (mod m)', 'm divides a − b', 'm divide a − b', 'm divide a − b'),
        R('(a + b) mod m', '= ((a mod m) + (b mod m)) mod m; reduce early', '= ((a mod m) + (b mod m)) mod m; reduce temprano', '= ((a mod m) + (b mod m)) mod m; reduza cedo'),
        R('a·x ≡ 1 (mod m)', 'An inverse exists when gcd(a, m) = 1', 'Hay inversa cuando gcd(a, m) = 1', 'Há inversa quando gcd(a, m) = 1'),
      ] },
      { math: true, title: H('Graphs and trees', 'Grafos y árboles', 'Grafos e árvores'), rows: [
        R('Σ deg(v) = 2|E|', 'Handshake lemma', 'Lema del apretón de manos', 'Lema do aperto de mãos'),
        R('tree: n − 1 edges, connected, acyclic', 'Three equivalent views', 'Tres vistas equivalentes', 'Três visões equivalentes'),
        R('Euler path', 'Uses every edge once; 0 or 2 odd-degree vertices', 'Usa cada arista una vez; 0 o 2 vértices de grado impar', 'Usa cada aresta uma vez; 0 ou 2 vértices de grau ímpar'),
        R('BFS / DFS', 'Queue / stack traversal', 'Recorrido con cola / pila', 'Percurso com fila / pilha'),
        R('Kruskal / Prim', 'Minimum spanning tree', 'Árbol de expansión mínimo', 'Árvore geradora mínima'),
      ] },
    ],
    trouble: [
      [H('Combinations and permutations get mixed up', 'Se confunden combinaciones y permutaciones', 'Confundem-se combinações e permutações'), H('Order matters but C(n, k) was used', 'El orden importa pero se usó C(n, k)', 'A ordem importa mas usou-se C(n, k)'), H('Ask: would (a, b) and (b, a) count as different? If yes, use P', 'Pregunta: ¿(a, b) y (b, a) cuentan como distintos? Si sí, usa P', 'Pergunte: (a, b) e (b, a) contam como diferentes? Se sim, use P')],
      [H('The empty set is missing', 'Falta el conjunto vacío', 'Falta o conjunto vazio'), H('Only non-empty subsets were counted', 'Solo se contaron subconjuntos no vacíos', 'Apenas subconjuntos não vazios foram contados'), H('P(A) always includes ∅ and A; its size is 2^n', 'P(A) siempre incluye ∅ y A; su tamaño es 2^n', 'P(A) sempre inclui ∅ e A; seu tamanho é 2^n')],
      [H('Relation properties tested on the wrong pairs', 'Se probaron las propiedades en los pares equivocados', 'As propriedades foram testadas nos pares errados'), H('Only a few convenient pairs were checked', 'Solo se revisaron unos pocos pares cómodos', 'Apenas alguns pares convenientes foram verificados'), H('Write the matrix or the full set of pairs and check every case', 'Escribe la matriz o el conjunto completo de pares y revisa cada caso', 'Escreva a matriz ou o conjunto completo de pares e verifique cada caso')],
    ],
  },
};

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Content markup ($math$, $$display$$, `code`, **bold**), typeset with KaTeX for HTML and PDF.
// tokenizeRich / plainRich come from src/lib/richText.ts, bundled in main below.
let tokenizeRich, plainRich;
const rich = (s) => tokenizeRich(String(s)).map((t) => {
  if (t.kind === 'math' || t.kind === 'display') return katex.renderToString(t.value, { displayMode: t.kind === 'display', throwOnError: false, output: 'html', strict: 'ignore' });
  if (t.kind === 'code') return `<code>${esc(t.value)}</code>`;
  if (t.kind === 'bold') return `<b>${esc(t.value)}</b>`;
  return esc(t.value);
}).join('');
const KATEX_DIR = join(ROOT, 'node_modules/katex/dist');
const KATEX_CSS = readFileSync(join(KATEX_DIR, 'katex.min.css'), 'utf8').replace(/url\(fonts\//g, `url(${pathToFileURL(join(KATEX_DIR, 'fonts')).href}/`);
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
  return `<!doctype html><html lang="${loc}"><head><meta charset="utf-8"><title>${esc(kind)} · ${esc(plainRich(pick(week.title)))}</title>${FONTS}<style>${KATEX_CSS}${printCss(accent)}</style></head><body>
<div class="head"><span><b>${esc(t.brand)}</b> · ${rich(pick(SUBJECT_NAME[week.subject]))}</span><span>${esc(kind)}</span></div>
<div class="title"><span class="num">${week.week}</span><h1>${rich(pick(week.title))}</h1><span class="kind">${esc(t.week)} ${week.week} · ${esc(kind)}</span></div>
${body}
<p class="foot">${esc(t.brand)} · ${esc(t.alsoOnline)}</p></body></html>`;
}

// ---------- summary ----------
function summaryHtml(week, loc, svgs) {
  const t = T[loc], pick = L(loc);
  let body = `<h2>${esc(t.coreIdeas)}</h2><div class="grid2">`;
  body += week.lessons.map((l, i) => `<div class="card"><h3><span>${i + 1}</span>${rich(pick(l.title))}</h3><ul>${l.takeaways.map((k) => `<li>${rich(pick(k))}</li>`).join('')}</ul></div>`).join('');
  body += '</div>';
  const cheat = CHEATS[week.subject];
  if (cheat?.diagram && svgs[cheat.diagram]) body += `<figure>${svgs[cheat.diagram]}</figure>`;
  const pitfalls = [...week.commonMistakes, ...week.lessons.flatMap((l) => l.pitfalls ?? [])].slice(0, 8);
  body += `<h2>${esc(t.watchOut)}</h2><table><tr><th style="width:50%">${esc(t.mistake)}</th><th>${esc(t.fix)}</th></tr>${pitfalls.map((p) => `<tr><td>${rich(pick(p.mistake))}</td><td>${rich(pick(p.fix))}</td></tr>`).join('')}</table>`;
  return page(week, loc, t.summary, body);
}

// ---------- cheat sheet ----------
function cheatHtml(week, loc, svgs) {
  const t = T[loc], pick = L(loc);
  const cheat = CHEATS[week.subject];
  let body = '';
  if (cheat.diagram && svgs[cheat.diagram]) body += `<figure>${svgs[cheat.diagram]}</figure>`;
  body += `<div class="grid2">${cheat.sections.map((sec) => `<div class="card"><h3>${rich(pick(sec.title))}</h3><table>${sec.rows.map(([cmd, d]) => `<tr><td style="width:56%" class="${sec.math ? 'math' : 'mono'}">${esc(cmd)}</td><td>${rich(pick(d))}</td></tr>`).join('')}</table></div>`).join('')}</div>`;
  body += `<h2>${esc(t.troubleshooting)}</h2><table><tr><th>${esc(t.symptom)}</th><th>${esc(t.cause)}</th><th>${esc(t.fix)}</th></tr>${cheat.trouble.map((r) => `<tr>${r.map((c) => `<td>${rich(pick(c))}</td>`).join('')}</tr>`).join('')}</table>`;
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
  body += exercises.map((e, i) => `<div class="ex"><p><b>${i + 1}. ${rich(pick(e.title))}</b> <span class="lvl">${esc(t.level[e.level - 1])} · ${esc(t.lesson)} ${e.lesson}</span></p><p>${rich(pick(e.prompt))}</p>${lines(e.level + 1)}<p class="hint">${esc(t.hint)}: ${rich(pick(e.hint))}</p></div>`).join('');
  body += `<h2>${esc(t.partB)}</h2><p class="note">${esc(t.partBHint)}</p>`;
  body += quick.map((q, i) => `<div class="ex"><p><b>${exercises.length + i + 1}. ${rich(pick(q.prompt))}</b></p><p class="opts">${q.options.map((o, j) => `<span>${letter(j)}) ${rich(pick(o))}</span>`).join('')}</p></div>`).join('');
  body += `<div class="key"><h2>${esc(t.answerKey)}</h2><ol>`;
  body += exercises.map((e) => `<li>${rich(pick(e.solution))}</li>`).join('');
  body += quick.map((q) => `<li><b>${letter(q.answer)}</b> — ${rich(pick(q.explanation))}</li>`).join('');
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
  const t = T[loc], pick = (x) => plainRich(L(loc)(x));
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
  const foot = `<footer><span>${esc(t.brand)} · ${rich(pick(SUBJECT_NAME[week.subject]))} · ${esc(t.week)} ${week.week}</span></footer>`;
  const slide = (inner, cls = '') => `<section class="slide ${cls}">${inner}${foot}</section>`;
  let html = slide(`<div class="big-num">${week.week}</div><div><p class="kicker">${rich(pick(SUBJECT_NAME[week.subject]))} · ${esc(t.week)} ${week.week}</p><h1>${rich(pick(week.title))}</h1></div>`, 'cover');
  week.lessons.forEach((l, i) => {
    const svg = l.diagram ? svgs[l.diagram] : '';
    html += slide(`<p class="kicker">${esc(t.lesson)} ${i + 1} · ${rich(pick(l.title))}</p>
      <div class="idea ${svg ? 'with-fig' : ''}"><h2>${rich(pick(l.takeaways[0]))}</h2>${svg ? `<div class="fig">${svg}</div>` : `<ul>${l.takeaways.slice(1).map((k) => `<li>${rich(pick(k))}</li>`).join('')}</ul>`}</div>
      ${l.analogy ? `<p class="quote"><b>${esc(t.thinkOfIt)}.</b> ${rich(pick(l.analogy))}</p>` : ''}`);
  });
  if (workflow) {
    html += slide(`<p class="kicker">${esc(t.stepByStep)}</p><h2>${rich(pick(workflow.title))}</h2><ol class="flow">${workflow.items.map((it) => `<li>${rich(pick(it))}</li>`).join('')}</ol>`);
  }
  html += slide(`<p class="kicker">${esc(t.checkYourself)}</p>${checks.map((q, i) => `<div class="q"><b>${i + 1}. ${rich(pick(q.prompt))}</b><p>${q.options.map((o, j) => `${letter(j)}) ${rich(pick(o))}`).join('&emsp;')}</p></div>`).join('')}<p class="small">${esc(t.answersInNotes)}</p>`);
  html += slide(`<p class="kicker">${esc(t.nextSteps)}</p><div class="next"><div><h3>${esc(t.labs)}</h3><ul>${week.labs.map((l) => `<li>${rich(pick(l.title))}</li>`).join('')}</ul></div><div><h3>${esc(t.tools)}</h3><ul>${week.tools.map((k) => `<li>${esc(t.toolNames[k])}</li>`).join('')}</ul></div></div>`);
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
  return `<!doctype html><html lang="${loc}"><head><meta charset="utf-8">${FONTS}<style>${KATEX_CSS}${css}</style></head><body>${html}</body></html>`;
}

async function slidesPptx(week, loc, images, outFile) {
  const t = T[loc], pick = (x) => plainRich(L(loc)(x));
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
await build({ entryPoints: [join(ROOT, 'src/lib/richText.ts')], bundle: true, platform: 'node', format: 'esm', outfile: join(CACHE, 'rich.mjs'), logLevel: 'error' });
({ tokenizeRich, plainRich } = await import(pathToFileURL(join(CACHE, 'rich.mjs')).href));
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
