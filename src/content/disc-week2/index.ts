import type { ExternalResource, Localized, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { discWeek2Lessons } from './lessons';
import { discWeek2Activities, discWeek2Flashcards, discWeek2Labs, discWeek2Questions } from './practice';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: set notation, cardinality, and special sets. Do its exercises.', 'Lección 1: notación de conjuntos, cardinalidad y conjuntos especiales. Haz sus ejercicios.', 'Lição 1: notação de conjuntos, cardinalidade e conjuntos especiais. Faça os exercícios.'), minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: subsets, power sets, and families. Check the 2ⁿ count on paper.', 'Lección 2: subconjuntos, conjunto potencia y familias. Comprueba el conteo 2ⁿ en papel.', 'Lição 2: subconjuntos, conjunto das partes e famílias. Confira a contagem 2ⁿ no papel.'), minutes: 45, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3: operations and Venn regions. Then Lab 1.', 'Lección 3: operaciones y regiones de Venn. Luego el Laboratorio 1.', 'Lição 3: operações e regiões de Venn. Depois o Laboratório 1.'), minutes: 55, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4: identities, De Morgan, and the three proof methods.', 'Lección 4: identidades, De Morgan y los tres métodos de demostración.', 'Lição 4: identidades, De Morgan e os três métodos de demonstração.'), minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and Lab 2: partitions, inclusion–exclusion, and survey diagrams.', 'Lección 5 y Laboratorio 2: particiones, inclusión–exclusión y diagramas de encuesta.', 'Lição 5 e Laboratório 2: partições, inclusão–exclusão e diagramas de pesquisa.'), minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: L('Activities, due flashcards, and the full quiz. Redo every missed region by hand.', 'Actividades, tarjetas pendientes y el cuestionario completo. Rehaz a mano cada región fallada.', 'Atividades, cartões pendentes e o questionário completo. Refaça à mão cada região errada.'), minutes: 40, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'disc2-r-levin', title: 'Oscar Levin: Discrete Mathematics, An Open Introduction (Sets)', url: 'https://discrete.openmathbooks.org/dmoi3/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open textbook; its sets chapter covers notation, subsets, operations, and identities with exercises.', 'Libro abierto y gratuito; su capítulo de conjuntos trata notación, subconjuntos, operaciones e identidades con ejercicios (en inglés).', 'Livro aberto e gratuito; o capítulo de conjuntos trata notação, subconjuntos, operações e identidades com exercícios (em inglês).') },
  { id: 'disc2-r-wiki-set', title: 'Wikipedia: Set (mathematics)', url: 'https://en.wikipedia.org/wiki/Set_(mathematics)', kind: 'article', verifiedOn: '2026-11-04', note: L('Definitions, notation, and a careful account of Russell\'s paradox.', 'Definiciones, notación y una explicación cuidadosa de la paradoja de Russell (en inglés).', 'Definições, notação e uma explicação cuidadosa do paradoxo de Russell (em inglês).') },
  { id: 'disc2-r-wiki-es', title: 'Wikipedia (ES): Conjunto', url: 'https://es.wikipedia.org/wiki/Conjunto', kind: 'article', verifiedOn: '2026-11-04', note: L('The same topic in Spanish, including operations and Venn diagrams.', 'El mismo tema en español, con operaciones y diagramas de Venn.', 'O mesmo tema em espanhol, com operações e diagramas de Venn.') },
  { id: 'disc2-r-khan', title: 'Khan Academy: Basic set notation', url: 'https://www.khanacademy.org/math/statistics-probability/probability-library/basic-set-ops', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short lessons and practice on union, intersection, complement, and Venn diagrams.', 'Lecciones cortas y práctica sobre unión, intersección, complemento y diagramas de Venn; el sitio está en varios idiomas.', 'Lições curtas e prática sobre união, interseção, complemento e diagramas de Venn; o site está em vários idiomas.') },
  { id: 'disc2-r-openstax', title: 'OpenStax Contemporary Mathematics: Sets', url: 'https://openstax.org/books/contemporary-mathematics/pages/1-2-sets', kind: 'book', verifiedOn: '2026-11-04', note: L('Open textbook section on set notation, subsets, and set operations.', 'Sección de un libro abierto sobre notación de conjuntos, subconjuntos y operaciones (en inglés).', 'Seção de um livro aberto sobre notação de conjuntos, subconjuntos e operações (em inglês).') },
  { id: 'disc2-r-olp', title: 'Open Logic Project: Sets, Logic, Computation', url: 'https://slc.openlogicproject.org/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open text with a formal chapter on sets, relations, and functions.', 'Texto abierto y gratuito con un capítulo formal sobre conjuntos, relaciones y funciones (en inglés).', 'Texto aberto e gratuito com um capítulo formal sobre conjuntos, relações e funções (em inglês).') },
];

/** Discrete Mathematics, Week 2: sets and set algebra. */
export const discWeek2: WeekContent = {
  id: 'y1-t1-m2-disc-w2',
  year: 1,
  term: 1,
  module: 2,
  week: 2,
  subject: 'discrete-mathematics',
  title: L('Sets', 'Conjuntos', 'Conjuntos'),
  intro: L(
    'A set is the simplest mathematical object: a collection of distinct things, with no order and no repeats. Almost everything later in discrete mathematics is built from sets: relations are sets of pairs, functions are special relations, graphs are sets of vertices and edges, and counting counts the elements of sets. This week you will read and write set notation, decide membership and inclusion, build power sets and families, combine sets with union, intersection, difference, and complement, prove identities with De Morgan\'s laws, and use partitions and inclusion–exclusion to solve survey problems.',
    'Un conjunto es el objeto matemático más simple: una colección de cosas distintas, sin orden ni repeticiones. Casi todo lo que viene después en matemática discreta se construye con conjuntos: las relaciones son conjuntos de pares, las funciones son relaciones especiales, los grafos son conjuntos de vértices y aristas, y contar es contar los elementos de conjuntos. Esta semana leerás y escribirás notación de conjuntos, decidirás pertenencia e inclusión, construirás conjuntos potencia y familias, combinarás conjuntos con unión, intersección, diferencia y complemento, demostrarás identidades con las leyes de De Morgan y usarás particiones e inclusión–exclusión para resolver encuestas.',
    'Um conjunto é o objeto matemático mais simples: uma coleção de coisas distintas, sem ordem nem repetições. Quase tudo o que vem depois na matemática discreta é construído com conjuntos: relações são conjuntos de pares, funções são relações especiais, grafos são conjuntos de vértices e arestas, e contar é contar os elementos de conjuntos. Nesta semana você vai ler e escrever notação de conjuntos, decidir pertinência e inclusão, construir conjuntos das partes e famílias, combinar conjuntos com união, interseção, diferença e complemento, provar identidades com as leis de De Morgan e usar partições e inclusão–exclusão para resolver pesquisas.',
  ),
  objectives: [
    L('Write sets by extension and by comprehension, and compute cardinalities.', 'Escribir conjuntos por extensión y por comprensión, y calcular cardinalidades.', 'Escrever conjuntos por extensão e por compreensão, e calcular cardinalidades.'),
    L('Distinguish ∈ from ⊆, and list power sets and indexed families.', 'Distinguir ∈ de ⊆, y listar conjuntos potencia y familias indexadas.', 'Distinguir ∈ de ⊆, e listar conjuntos das partes e famílias indexadas.'),
    L('Compute unions, intersections, differences, complements, and symmetric differences.', 'Calcular uniones, intersecciones, diferencias, complementos y diferencias simétricas.', 'Calcular uniões, interseções, diferenças, complementos e diferenças simétricas.'),
    L('Prove set identities by element chasing, algebra, or a membership table.', 'Demostrar identidades de conjuntos siguiendo elementos, con álgebra o con una tabla de pertenencia.', 'Provar identidades de conjuntos seguindo elementos, com álgebra ou com uma tabela de pertinência.'),
    L('Use partitions and inclusion–exclusion, including three-set survey diagrams.', 'Usar particiones e inclusión–exclusión, incluidos los diagramas de encuesta de tres conjuntos.', 'Usar partições e inclusão–exclusão, incluindo diagramas de pesquisa de três conjuntos.'),
  ],
  prerequisites: [
    L('Basic algebra and the idea of a number set such as ℕ, ℤ, or ℝ.', 'Álgebra básica y la idea de conjunto numérico como ℕ, ℤ o ℝ.', 'Álgebra básica e a ideia de conjunto numérico como ℕ, ℤ ou ℝ.'),
    L('Propositional connectives: and, or, not, and if–then.', 'Conectivos proposicionales: y, o, no, y si–entonces.', 'Conectivos proposicionais: e, ou, não, e se–então.'),
  ],
  keyConcepts: [
    L('Set and element', 'Conjunto y elemento', 'Conjunto e elemento'),
    L('Roster and set-builder form', 'Extensión y comprensión', 'Extensão e compreensão'),
    L('Cardinality', 'Cardinalidad', 'Cardinalidade'),
    L('Subset and power set', 'Subconjunto y conjunto potencia', 'Subconjunto e conjunto das partes'),
    L('Union and intersection', 'Unión e intersección', 'União e interseção'),
    L('Complement and difference', 'Complemento y diferencia', 'Complemento e diferença'),
    L('De Morgan\'s laws', 'Leyes de De Morgan', 'Leis de De Morgan'),
    L('Partition', 'Partición', 'Partição'),
    L('Inclusion–exclusion', 'Inclusión–exclusión', 'Inclusão–exclusão'),
  ],
  estimatedMinutes: 430,
  sequence: [
    L('Lesson 1: what a set is, roster and set-builder notation, and cardinality.', 'Lección 1: qué es un conjunto, notación por extensión y comprensión, y cardinalidad.', 'Lição 1: o que é um conjunto, notação por extensão e compreensão, e cardinalidade.'),
    L('Lesson 2: subsets, power sets, and families.', 'Lección 2: subconjuntos, conjuntos potencia y familias.', 'Lição 2: subconjuntos, conjuntos das partes e famílias.'),
    L('Lesson 3 and Lab 1: operations and Venn regions.', 'Lección 3 y Laboratorio 1: operaciones y regiones de Venn.', 'Lição 3 e Laboratório 1: operações e regiões de Venn.'),
    L('Lesson 4: identities and the three ways to prove them.', 'Lección 4: identidades y las tres formas de demostrarlas.', 'Lição 4: identidades e as três formas de prová-las.'),
    L('Lesson 5 and Lab 2: partitions, inclusion–exclusion, and surveys. Then the quiz.', 'Lección 5 y Laboratorio 2: particiones, inclusión–exclusión y encuestas. Luego el cuestionario.', 'Lição 5 e Laboratório 2: partições, inclusão–exclusão e pesquisas. Depois o questionário.'),
  ],
  outcomes: [
    L('You can read any set expression and compute its elements inside a stated universe.', 'Puedes leer cualquier expresión de conjuntos y calcular sus elementos dentro de un universo dado.', 'Você consegue ler qualquer expressão de conjuntos e calcular seus elementos dentro de um universo dado.'),
    L('You can prove a set identity without guessing, and refute a false one with a counterexample.', 'Puedes demostrar una identidad de conjuntos sin adivinar y refutar una falsa con un contraejemplo.', 'Você consegue provar uma identidade de conjuntos sem adivinhar e refutar uma falsa com um contraexemplo.'),
    L('You can fill a three-set Venn diagram from the centre out and check the total.', 'Puedes llenar un diagrama de Venn de tres conjuntos desde el centro hacia fuera y comprobar el total.', 'Você consegue preencher um diagrama de Venn de três conjuntos do centro para fora e conferir o total.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Write each exercise solution with the universe stated', 'Escribir cada solución de ejercicio indicando el universo', 'Escrever cada solução de exercício indicando o universo'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Complete the activities', 'Completar las actividades', 'Completar as atividades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Confusing ∈ (element) with ⊆ (subset).', 'Confundir ∈ (elemento) con ⊆ (subconjunto).', 'Confundir ∈ (elemento) com ⊆ (subconjunto).'), fix: L('Write the braces explicitly: 3 ∈ A but {3} ⊆ A.', 'Escribe las llaves explícitamente: 3 ∈ A pero {3} ⊆ A.', 'Escreva as chaves explicitamente: 3 ∈ A mas {3} ⊆ A.') },
    { mistake: L('Computing Aᶜ without fixing a universe.', 'Calcular Aᶜ sin fijar un universo.', 'Calcular Aᶜ sem fixar um universo.'), fix: L('State U first; the complement changes when U changes.', 'Indica U primero; el complemento cambia cuando cambia U.', 'Indique U primeiro; o complemento muda quando U muda.') },
    { mistake: L('Using the pair counts directly in a Venn diagram without subtracting the triple.', 'Usar directamente las cuentas de pareja en un Venn sin restar el trío.', 'Usar diretamente as contagens de par num Venn sem subtrair o trio.'), fix: L('Fill the centre first, then subtract it from each pair.', 'Llena primero el centro y luego réstalo de cada pareja.', 'Preencha o centro primeiro e depois subtraia-o de cada par.') },
  ],
  lessons: discWeek2Lessons,
  flashcards: discWeek2Flashcards,
  questions: discWeek2Questions,
  labs: discWeek2Labs,
  plan,
  resources,
  activities: discWeek2Activities,
  stories: [],
  tools: [],
  videos: [],
  documents: [],
};
