import type { ExternalResource, Localized, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { discWeek1Lessons } from './lessons';
import { discWeek1Activities, discWeek1Flashcards, discWeek1Labs, discWeek1Questions } from './practice';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: sigma notation, sum rules, factorials, and logarithms. Do its exercises on paper.', 'Lección 1: notación sigma, reglas de las sumas, factoriales y logaritmos. Haz sus ejercicios en papel.', 'Lição 1: notação sigma, regras das somas, fatoriais e logaritmos. Faça os exercícios no papel.'), minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: the principle of induction. Rewrite the model proof without looking, then Lab 1.', 'Lección 2: el principio de inducción. Reescribe la demostración modelo sin mirar y luego el Laboratorio 1.', 'Lição 2: o princípio da indução. Reescreva a demonstração modelo sem olhar e depois o Laboratório 1.'), minutes: 60, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3: divisibility, inequalities, and shifted bases. Tabulate before choosing n₀.', 'Lección 3: divisibilidad, desigualdades y bases desplazadas. Tabula antes de elegir n₀.', 'Lição 3: divisibilidade, desigualdades e bases deslocadas. Tabele antes de escolher n₀.'), minutes: 50, kind: 'practice' },
  { day: 'Day 4', focus: L('Lessons 4–5: strong induction, recursion, and geometric sums. Lab 2.', 'Lecciones 4–5: inducción fuerte, recursión y sumas geométricas. Laboratorio 2.', 'Lições 4–5: indução forte, recursão e somas geométricas. Laboratório 2.'), minutes: 60, kind: 'practice' },
  { day: 'Day 5', focus: L('Activities and the flashcards that are due. Redo one proof of each kind from memory.', 'Actividades y tarjetas pendientes. Rehaz de memoria una demostración de cada tipo.', 'Atividades e cartões pendentes. Refaça de memória uma demonstração de cada tipo.'), minutes: 40, kind: 'review' },
  { day: 'Day 6', focus: L('Full quiz. For every miss, find the step of the proof where it went wrong.', 'Cuestionario completo. En cada fallo, busca el paso de la demostración donde se torció.', 'Questionário completo. Em cada erro, encontre o passo da demonstração em que deu errado.'), minutes: 40, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'disc1-r-levin', title: 'Oscar Levin: Discrete Mathematics, An Open Introduction (Mathematical induction)', url: 'https://discrete.openmathbooks.org/dmoi3/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open textbook; the chapter on sequences covers induction, strong induction, and recurrences with exercises.', 'Libro abierto y gratuito; el capítulo de sucesiones trata inducción, inducción fuerte y recurrencias con ejercicios (en inglés).', 'Livro aberto e gratuito; o capítulo de sequências trata indução, indução forte e recorrências com exercícios (em inglês).') },
  { id: 'disc1-r-wiki-induction', title: 'Wikipedia: Mathematical induction', url: 'https://en.wikipedia.org/wiki/Mathematical_induction', kind: 'article', verifiedOn: '2026-11-04', note: L('Overview with the dominoes picture, strong induction, and classic examples.', 'Panorama con la imagen del dominó, la inducción fuerte y ejemplos clásicos (en inglés).', 'Panorama com a imagem do dominó, a indução forte e exemplos clássicos (em inglês).') },
  { id: 'disc1-r-wiki-es', title: 'Wikipedia (ES): Inducción matemática', url: 'https://es.wikipedia.org/wiki/Inducci%C3%B3n_matem%C3%A1tica', kind: 'article', verifiedOn: '2026-11-04', note: L('The same topic in Spanish.', 'El mismo tema en español.', 'O mesmo tema em espanhol.') },
  { id: 'disc1-r-khan', title: 'Khan Academy: Series and induction', url: 'https://www.khanacademy.org/math/algebra-home/alg-series-and-induction', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short videos on sigma notation, arithmetic and geometric series, and induction.', 'Videos cortos sobre notación sigma, series aritméticas y geométricas e inducción; el sitio está en varios idiomas.', 'Vídeos curtos sobre notação sigma, séries aritméticas e geométricas e indução; o site está em vários idiomas.') },
  { id: 'disc1-r-openstax', title: 'OpenStax College Algebra 2e: Sequences and their notations', url: 'https://openstax.org/books/college-algebra-2e/pages/9-1-sequences-and-their-notations', kind: 'book', verifiedOn: '2026-11-04', note: L('Open textbook section on recursive and explicit formulas, factorials, and sigma notation.', 'Sección de un libro abierto sobre fórmulas recursivas y explícitas, factoriales y notación sigma (en inglés).', 'Seção de um livro aberto sobre fórmulas recursivas e explícitas, fatoriais e notação sigma (em inglês).') },
  { id: 'disc1-r-olp', title: 'Open Logic Project: Sets, Logic, Computation', url: 'https://slc.openlogicproject.org/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open text; its proof chapter explains how to write induction proofs clearly.', 'Texto abierto y gratuito; su capítulo de demostraciones explica cómo escribir con claridad pruebas por inducción (en inglés).', 'Texto aberto e gratuito; o capítulo de demonstrações explica como escrever com clareza provas por indução (em inglês).') },
];

/** Discrete Mathematics, Week 1: the principle of induction. */
export const discWeek1: WeekContent = {
  id: 'y1-t1-m2-disc-w1',
  year: 1,
  term: 1,
  module: 2,
  week: 1,
  subject: 'discrete-mathematics',
  title: L('The principle of induction', 'El principio de inducción', 'O princípio da indução'),
  intro: L(
    'Discrete mathematics studies things you can count one by one: integers, sets, steps of an algorithm. Its first great tool is induction, the way to prove that a statement holds for every natural number without checking them all. This week you will read and write sigma notation, use factorials and logarithm rules, prove sum formulas, divisibility facts, and inequalities by induction, start at a shifted base when needed, use strong induction, and connect all of it to recursion and loop invariants in programs.',
    'La matemática discreta estudia cosas que se pueden contar una a una: enteros, conjuntos, pasos de un algoritmo. Su primera gran herramienta es la inducción, la forma de demostrar que una afirmación vale para todo número natural sin comprobarlos todos. Esta semana leerás y escribirás notación sigma, usarás factoriales y reglas de logaritmos, demostrarás por inducción fórmulas de sumas, hechos de divisibilidad y desigualdades, empezarás en una base desplazada cuando haga falta, usarás la inducción fuerte y lo conectarás todo con la recursión y los invariantes de bucle en los programas.',
    'A matemática discreta estuda coisas que podem ser contadas uma a uma: inteiros, conjuntos, passos de um algoritmo. Sua primeira grande ferramenta é a indução, a forma de provar que uma afirmação vale para todo número natural sem conferir todos. Nesta semana você vai ler e escrever notação sigma, usar fatoriais e regras de logaritmos, provar por indução fórmulas de somas, fatos de divisibilidade e desigualdades, começar numa base deslocada quando preciso, usar a indução forte e ligar tudo isso à recursão e aos invariantes de laço nos programas.',
  ),
  objectives: [
    L('Read, write, and evaluate sums in sigma notation, and use its properties.', 'Leer, escribir y calcular sumas en notación sigma y usar sus propiedades.', 'Ler, escrever e calcular somas em notação sigma e usar suas propriedades.'),
    L('Write a complete induction proof: base case, hypothesis, and inductive step.', 'Escribir una demostración por inducción completa: caso base, hipótesis y paso inductivo.', 'Escrever uma demonstração por indução completa: caso base, hipótese e passo indutivo.'),
    L('Prove divisibility statements and inequalities, choosing the right base n₀.', 'Demostrar afirmaciones de divisibilidad y desigualdades, eligiendo la base n₀ correcta.', 'Provar afirmações de divisibilidade e desigualdades, escolhendo a base n₀ certa.'),
    L('Use strong induction when the step depends on earlier cases.', 'Usar la inducción fuerte cuando el paso depende de casos anteriores.', 'Usar a indução forte quando o passo depende de casos anteriores.'),
    L('Find closed formulas for simple recurrences and prove them.', 'Encontrar fórmulas cerradas para recurrencias sencillas y demostrarlas.', 'Encontrar fórmulas fechadas para recorrências simples e prová-las.'),
  ],
  prerequisites: [
    L('Algebra: expanding, factoring, and working with fractions and powers.', 'Álgebra: desarrollar, factorizar y trabajar con fracciones y potencias.', 'Álgebra: desenvolver, fatorar e trabalhar com frações e potências.'),
    L('Basic logic: "if P then Q" and what it means to prove it.', 'Lógica básica: "si P entonces Q" y qué significa demostrarlo.', 'Lógica básica: "se P então Q" e o que significa prová-lo.'),
  ],
  keyConcepts: [
    L('Sigma notation', 'Notación sigma', 'Notação sigma'), L('Factorial', 'Factorial', 'Fatorial'),
    L('Base case', 'Caso base', 'Caso base'), L('Induction hypothesis', 'Hipótesis de inducción', 'Hipótese de indução'),
    L('Inductive step', 'Paso inductivo', 'Passo indutivo'), L('Shifted induction', 'Inducción desplazada', 'Indução deslocada'),
    L('Strong induction', 'Inducción fuerte', 'Indução forte'), L('Recursion and recurrences', 'Recursión y recurrencias', 'Recursão e recorrências'),
  ],
  estimatedMinutes: 420,
  sequence: [
    L('Lesson 1: the language of sums, factorials, and logarithms.', 'Lección 1: el lenguaje de las sumas, los factoriales y los logaritmos.', 'Lição 1: a linguagem das somas, dos fatoriais e dos logaritmos.'),
    L('Lesson 2 and Lab 1: the principle of induction on sum formulas.', 'Lección 2 y Laboratorio 1: el principio de inducción en fórmulas de sumas.', 'Lição 2 e Laboratório 1: o princípio da indução em fórmulas de somas.'),
    L('Lesson 3: divisibility, inequalities, and shifted bases.', 'Lección 3: divisibilidad, desigualdades y bases desplazadas.', 'Lição 3: divisibilidade, desigualdades e bases deslocadas.'),
    L('Lessons 4–5 and Lab 2: strong induction and recursion. Then the quiz.', 'Lecciones 4–5 y Laboratorio 2: inducción fuerte y recursión. Luego el cuestionario.', 'Lições 4–5 e Laboratório 2: indução forte e recursão. Depois o questionário.'),
  ],
  outcomes: [
    L('You can prove a sum, divisibility, or inequality statement by induction from scratch.', 'Puedes demostrar desde cero por inducción una suma, una divisibilidad o una desigualdad.', 'Você consegue provar do zero por indução uma soma, uma divisibilidade ou uma desigualdade.'),
    L('You can tell when a proof needs a shifted base or strong induction.', 'Sabes cuándo una demostración necesita una base desplazada o inducción fuerte.', 'Você sabe quando uma demonstração precisa de base deslocada ou indução forte.'),
    L('You see the same structure in recursive code and loop invariants.', 'Ves la misma estructura en el código recursivo y en los invariantes de bucle.', 'Você vê a mesma estrutura no código recursivo e nos invariantes de laço.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Write every exercise proof on paper with base, hypothesis, and step labelled', 'Escribir en papel cada demostración de los ejercicios con base, hipótesis y paso marcados', 'Escrever no papel cada demonstração dos exercícios com base, hipótese e passo marcados'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Complete the activities', 'Completar las actividades', 'Completar as atividades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Assuming P(k + 1) instead of proving it.', 'Suponer P(k + 1) en lugar de demostrarlo.', 'Supor P(k + 1) em vez de prová-lo.'), fix: L('Start from one side of P(k + 1) and reach the other side, using P(k) on the way.', 'Parte de un lado de P(k + 1) y llega al otro, usando P(k) por el camino.', 'Parta de um lado de P(k + 1) e chegue ao outro, usando P(k) no caminho.') },
    { mistake: L('Forgetting or mis-choosing the base case.', 'Olvidar o elegir mal el caso base.', 'Esquecer ou escolher mal o caso base.'), fix: L('Tabulate small values; the base is the first n where the claim holds and keeps holding.', 'Tabula valores pequeños; la base es el primer n donde la afirmación se cumple y se sigue cumpliendo.', 'Tabele valores pequenos; a base é o primeiro n em que a afirmação vale e continua valendo.') },
    { mistake: L('Losing the leftover term when rewriting a^{k+1} in divisibility proofs.', 'Perder el término sobrante al reescribir a^{k+1} en demostraciones de divisibilidad.', 'Perder o termo que sobra ao reescrever a^{k+1} em demonstrações de divisibilidade.'), fix: L('Expand your rewrite and check it equals the original before using the hypothesis.', 'Desarrolla tu reescritura y comprueba que es igual al original antes de usar la hipótesis.', 'Desenvolva sua reescrita e confira que é igual ao original antes de usar a hipótese.') },
  ],
  lessons: discWeek1Lessons,
  flashcards: discWeek1Flashcards,
  questions: discWeek1Questions,
  labs: discWeek1Labs,
  plan,
  resources,
  activities: discWeek1Activities,
  stories: [],
  tools: [],
  videos: [],
  documents: [],
};
