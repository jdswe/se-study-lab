import type { ExternalResource, Localized, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { discWeek3Lessons } from './lessons';
import { discWeek3Activities, discWeek3Flashcards, discWeek3Labs, discWeek3Questions } from './practice';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: ordered pairs, Cartesian products, and the definition of a relation. Do the exercises.', 'Lección 1: pares ordenados, productos cartesianos y la definición de relación. Haz los ejercicios.', 'Lição 1: pares ordenados, produtos cartesianos e a definição de relação. Faça os exercícios.'), minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: domain, range, digraphs, and Boolean matrices. Convert one relation three ways.', 'Lección 2: dominio, rango, digrafos y matrices booleanas. Convierte una relación de tres formas.', 'Lição 2: domínio, imagem, digrafos e matrizes booleanas. Converta uma relação de três formas.'), minutes: 50, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3 and Lab 1: inverse relations, composition, and powers.', 'Lección 3 y Laboratorio 1: relaciones inversas, composición y potencias.', 'Lição 3 e Laboratório 1: relações inversas, composição e potências.'), minutes: 55, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4: test reflexivity, symmetry, antisymmetry, and transitivity on small examples.', 'Lección 4: prueba reflexividad, simetría, antisimetría y transitividad en ejemplos pequeños.', 'Lição 4: teste reflexividade, simetria, antissimetria e transitividade em exemplos pequenos.'), minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and Lab 2: equivalence classes, partitions, partial orders, and Hasse diagrams.', 'Lección 5 y Laboratorio 2: clases de equivalencia, particiones, órdenes parciales y diagramas de Hasse.', 'Lição 5 e Laboratório 2: classes de equivalência, partições, ordens parciais e diagramas de Hasse.'), minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: L('Activities, due flashcards, and the full quiz. Redraw one digraph and one Hasse diagram from memory.', 'Actividades, tarjetas pendientes y el cuestionario completo. Redibuja de memoria un digrafo y un diagrama de Hasse.', 'Atividades, cartões pendentes e o questionário completo. Redesenhe de memória um digrafo e um diagrama de Hasse.'), minutes: 40, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'disc3-r-levin', title: 'Oscar Levin: Discrete Mathematics, An Open Introduction (Relations)', url: 'https://discrete.openmathbooks.org/dmoi3/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open textbook with chapters on relations, equivalence classes, and partial orders.', 'Libro abierto y gratuito con capítulos sobre relaciones, clases de equivalencia y órdenes parciales (en inglés).', 'Livro aberto e gratuito com capítulos sobre relações, classes de equivalência e ordens parciais (em inglês).') },
  { id: 'disc3-r-wiki-relation', title: 'Wikipedia: Binary relation', url: 'https://en.wikipedia.org/wiki/Binary_relation', kind: 'article', verifiedOn: '2026-11-04', note: L('Formal definitions of domain, range, inverse, composition, and the standard properties.', 'Definiciones formales de dominio, rango, inversa, composición y las propiedades estándar (en inglés).', 'Definições formais de domínio, imagem, inversa, composição e as propriedades padrão (em inglês).') },
  { id: 'disc3-r-wiki-es', title: 'Wikipedia (ES): Relación binaria', url: 'https://es.wikipedia.org/wiki/Relaci%C3%B3n_binaria', kind: 'article', verifiedOn: '2026-11-04', note: L('The same topic in Spanish, with examples and diagrams.', 'El mismo tema en español, con ejemplos y diagramas.', 'O mesmo tema em espanhol, com exemplos e diagramas.') },
  { id: 'disc3-r-khan', title: 'Khan Academy: Relations and functions', url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Videos and practice on relations, domain, range, and the vertical line test.', 'Videos y práctica sobre relaciones, dominio, rango y la prueba de la recta vertical; el sitio está en varios idiomas.', 'Vídeos e prática sobre relações, domínio, imagem e o teste da reta vertical; o site está em vários idiomas.') },
  { id: 'disc3-r-openstax', title: 'OpenStax Contemporary Mathematics: Relations and functions', url: 'https://openstax.org/books/contemporary-mathematics/pages/1-3-sets-and-relations', kind: 'book', verifiedOn: '2026-11-04', note: L('Open textbook section connecting sets, relations, and functions.', 'Sección de un libro abierto que conecta conjuntos, relaciones y funciones (en inglés).', 'Seção de um livro aberto que liga conjuntos, relações e funções (em inglês).') },
  { id: 'disc3-r-olp', title: 'Open Logic Project: Sets, Logic, Computation', url: 'https://slc.openlogicproject.org/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open text with formal treatments of relations, orders, and equivalence.', 'Texto abierto y gratuito con tratamientos formales de relaciones, órdenes y equivalencia (en inglés).', 'Texto aberto e gratuito com tratamentos formais de relações, ordens e equivalência (em inglês).') },
];

/** Discrete Mathematics, Week 3: relations and orders. */
export const discWeek3: WeekContent = {
  id: 'y1-t1-m2-disc-w3',
  year: 1,
  term: 1,
  module: 2,
  week: 3,
  subject: 'discrete-mathematics',
  title: L('Relations', 'Relaciones', 'Relações'),
  intro: L(
    'A relation records which elements are connected to which: user to role, city to city, number to divisor. Formally, a relation from A to B is just a subset of A × B, which means everything you learned about sets now applies to connections. This week you will build relations from ordered pairs, read their domain and range, draw them as directed graphs, store them as Boolean matrices, reverse and compose them, and classify them as reflexive, symmetric, antisymmetric, or transitive. Those four properties then split into the two structures that organise all of mathematics: equivalence relations, which partition a set into classes, and partial orders, which rank it.',
    'Una relación registra qué elementos están conectados con cuáles: usuario con rol, ciudad con ciudad, número con divisor. Formalmente, una relación de A en B es solo un subconjunto de A × B, así que todo lo aprendido sobre conjuntos se aplica ahora a conexiones. Esta semana construirás relaciones a partir de pares ordenados, leerás su dominio y rango, las dibujarás como grafos dirigidos, las guardarás como matrices booleanas, las invertirás y compondrás, y las clasificarás como reflexivas, simétricas, antisimétricas o transitivas. Esas cuatro propiedades se separan luego en las dos estructuras que organizan toda la matemática: las relaciones de equivalencia, que particionan un conjunto en clases, y los órdenes parciales, que lo ordenan.',
    'Uma relação registra quais elementos estão conectados com quais: usuário com papel, cidade com cidade, número com divisor. Formalmente, uma relação de A em B é apenas um subconjunto de A × B, então tudo o que você aprendeu sobre conjuntos agora se aplica a conexões. Nesta semana você vai construir relações a partir de pares ordenados, ler seu domínio e imagem, desenhá-las como grafos dirigidos, armazená-las como matrizes booleanas, invertê-las e compô-las, e classificá-las como reflexivas, simétricas, antissimétricas ou transitivas. Essas quatro propriedades então se separam nas duas estruturas que organizam toda a matemática: as relações de equivalência, que particionam um conjunto em classes, e as ordens parciais, que o ordenam.',
  ),
  objectives: [
    L('Form Cartesian products and relations from pairs, rules, tables, and databases.', 'Formar productos cartesianos y relaciones a partir de pares, reglas, tablas y bases de datos.', 'Formar produtos cartesianos e relações a partir de pares, regras, tabelas e bancos de dados.'),
    L('Find domain and range, and move between pairs, digraphs, and Boolean matrices.', 'Hallar dominio y rango, y pasar entre pares, digrafos y matrices booleanas.', 'Encontrar domínio e imagem, e passar entre pares, digrafos e matrizes booleanas.'),
    L('Compute inverse relations, compositions, and powers of a relation.', 'Calcular relaciones inversas, composiciones y potencias de una relación.', 'Calcular relações inversas, composições e potências de uma relação.'),
    L('Test relations for reflexivity, symmetry, antisymmetry, and transitivity.', 'Probar relaciones para reflexividad, simetría, antisimetría y transitividad.', 'Testar relações para reflexividade, simetria, antissimetria e transitividade.'),
    L('Recognise equivalence relations, partitions, partial orders, and total orders.', 'Reconocer relaciones de equivalencia, particiones, órdenes parciales y órdenes totales.', 'Reconhecer relações de equivalência, partições, ordens parciais e ordens totais.'),
  ],
  prerequisites: [
    L('Sets, subsets, and Cartesian products from Week 2.', 'Conjuntos, subconjuntos y productos cartesianos de la Semana 2.', 'Conjuntos, subconjuntos e produtos cartesianos da Semana 2.'),
    L('Basic integer arithmetic, including remainders.', 'Aritmética básica con enteros, incluidos los restos.', 'Aritmética básica com inteiros, incluindo restos.'),
  ],
  keyConcepts: [
    L('Ordered pair', 'Par ordenado', 'Par ordenado'),
    L('Cartesian product', 'Producto cartesiano', 'Produto cartesiano'),
    L('Binary relation', 'Relación binaria', 'Relação binária'),
    L('Domain and range', 'Dominio y rango', 'Domínio e imagem'),
    L('Digraph and matrix', 'Digrafo y matriz', 'Digrafo e matriz'),
    L('Inverse and composition', 'Inversa y composición', 'Inversa e composição'),
    L('Reflexive, symmetric, antisymmetric, transitive', 'Reflexiva, simétrica, antisimétrica, transitiva', 'Reflexiva, simétrica, antissimétrica, transitiva'),
    L('Equivalence relation and class', 'Relación y clase de equivalencia', 'Relação e classe de equivalência'),
    L('Partial and total order', 'Orden parcial y total', 'Ordem parcial e total'),
  ],
  estimatedMinutes: 440,
  sequence: [
    L('Lesson 1: ordered pairs, Cartesian products, and binary relations.', 'Lección 1: pares ordenados, productos cartesianos y relaciones binarias.', 'Lição 1: pares ordenados, produtos cartesianos e relações binárias.'),
    L('Lesson 2: domain, range, digraphs, and matrices.', 'Lección 2: dominio, rango, digrafos y matrices.', 'Lição 2: domínio, imagem, digrafos e matrizes.'),
    L('Lesson 3 and Lab 1: inverse relations and composition.', 'Lección 3 y Laboratorio 1: relaciones inversas y composición.', 'Lição 3 e Laboratório 1: relações inversas e composição.'),
    L('Lesson 4: the four basic properties.', 'Lección 4: las cuatro propiedades básicas.', 'Lição 4: as quatro propriedades básicas.'),
    L('Lesson 5 and Lab 2: equivalence relations, partitions, and partial orders. Then the quiz.', 'Lección 5 y Laboratorio 2: relaciones de equivalencia, particiones y órdenes parciales. Luego el cuestionario.', 'Lição 5 e Laboratório 2: relações de equivalência, partições e ordens parciais. Depois o questionário.'),
  ],
  outcomes: [
    L('You can translate any relation between its pair, arrow, and matrix forms and answer questions in all three.', 'Puedes traducir cualquier relación entre sus formas de pares, flechas y matriz y responder preguntas en las tres.', 'Você consegue traduzir qualquer relação entre suas formas de pares, setas e matriz e responder perguntas nas três.'),
    L('You can decide whether a relation has each of the four properties and justify it with a counterexample.', 'Puedes decidir si una relación tiene cada una de las cuatro propiedades y justificarlo con un contraejemplo.', 'Você consegue decidir se uma relação tem cada uma das quatro propriedades e justificar com um contraexemplo.'),
    L('You can turn an equivalence relation into its partition, and a partial order into a Hasse diagram.', 'Puedes convertir una relación de equivalencia en su partición y un orden parcial en un diagrama de Hasse.', 'Você consegue converter uma relação de equivalência em sua partição, e uma ordem parcial em um diagrama de Hasse.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Draw the digraph and matrix for at least three relations', 'Dibujar el digrafo y la matriz de al menos tres relaciones', 'Desenhar o digrafo e a matriz de pelo menos três relações'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Complete the activities', 'Completar las actividades', 'Completar as atividades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Writing the inverse by reversing the order of the symbols without swapping the coordinates.', 'Escribir la inversa invirtiendo el orden de los símbolos sin intercambiar las coordenadas.', 'Escrever a inversa invertendo a ordem dos símbolos sem trocar as coordenadas.'), fix: L('R⁻¹ contains (b, a) for each (a, b) in R; swap inside each pair.', 'R⁻¹ contiene (b, a) por cada (a, b) en R; intercambia dentro de cada par.', 'R⁻¹ contém (b, a) para cada (a, b) em R; troque dentro de cada par.') },
    { mistake: L('Reading S ∘ R from left to right.', 'Leer S ∘ R de izquierda a derecha.', 'Ler S ∘ R da esquerda para a direita.'), fix: L('R acts first, then S: think "R then S".', 'R actúa primero y luego S: piensa "R y luego S".', 'R age primeiro e depois S: pense "R e depois S".') },
    { mistake: L('Assuming a symmetric relation must also be reflexive.', 'Suponer que una relación simétrica también debe ser reflexiva.', 'Supor que uma relação simétrica também precisa ser reflexiva.'), fix: L('Symmetry is about pairs of distinct elements; reflexivity is about loops. They are independent.', 'La simetría trata de parejas de elementos distintos; la reflexividad, de bucles. Son independientes.', 'A simetria trata de pares de elementos distintos; a reflexividade, de laços. São independentes.') },
  ],
  lessons: discWeek3Lessons,
  flashcards: discWeek3Flashcards,
  questions: discWeek3Questions,
  labs: discWeek3Labs,
  plan,
  resources,
  activities: discWeek3Activities,
  stories: [],
  tools: [],
  videos: [],
  documents: [],
};
