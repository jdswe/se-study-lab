import type { ExternalResource, Localized, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { discWeek5Lessons } from './lessons';
import { discWeek5Activities, discWeek5Flashcards, discWeek5Labs, discWeek5Questions } from './practice';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: sum and product rules, decision trees, and overlaps. Do the exercises.', 'Lección 1: reglas de la suma y del producto, árboles de decisión y solapamientos. Haz los ejercicios.', 'Lição 1: regras da soma e do produto, árvores de decisão e sobreposições. Faça os exercícios.'), minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: permutations, circular arrangements, and repeated symbols.', 'Lección 2: permutaciones, ordenaciones circulares y símbolos repetidos.', 'Lição 2: permutações, arranjos circulares e símbolos repetidos.'), minutes: 50, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3 and Lab 1: combinations, Pascal, binomial theorem, and multinomials.', 'Lección 3 y Laboratorio 1: combinaciones, Pascal, teorema del binomio y multinomiales.', 'Lição 3 e Laboratório 1: combinações, Pascal, teorema binomial e multinomiais.'), minutes: 55, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4: inclusion–exclusion in two and three sets, complements, and pigeonhole.', 'Lección 4: inclusión–exclusión en dos y tres conjuntos, complementos y palomar.', 'Lição 4: inclusão–exclusão em dois e três conjuntos, complementos e casa dos pombos.'), minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and Lab 2: finite probability, complements, conditional probability, and expected value.', 'Lección 5 y Laboratorio 2: probabilidad finita, complementos, probabilidad condicional y valor esperado.', 'Lição 5 e Laboratório 2: probabilidade finita, complementos, probabilidade condicional e valor esperado.'), minutes: 55, kind: 'practice' },
  { day: 'Day 6', focus: L('Activities, due flashcards, and the full quiz. Re-solve one counting and one probability problem from scratch.', 'Actividades, tarjetas pendientes y el cuestionario completo. Resuelve de nuevo un problema de conteo y uno de probabilidad.', 'Atividades, cartões pendentes e o questionário completo. Resolva de novo um problema de contagem e um de probabilidade.'), minutes: 40, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'disc5-r-levin', title: 'Oscar Levin: Discrete Mathematics, An Open Introduction (Counting)', url: 'https://discrete.openmathbooks.org/dmoi3/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open textbook with chapters on counting, permutations, combinations, and probability.', 'Libro abierto y gratuito con capítulos sobre conteo, permutaciones, combinaciones y probabilidad (en inglés).', 'Livro aberto e gratuito com capítulos sobre contagem, permutações, combinações e probabilidade (em inglês).') },
  { id: 'disc5-r-wiki-permutation', title: 'Wikipedia: Permutation', url: 'https://en.wikipedia.org/wiki/Permutation', kind: 'article', verifiedOn: '2026-11-04', note: L('Formal definitions, notation, and the distinction between permutations and combinations.', 'Definiciones formales, notación y la distinción entre permutaciones y combinaciones (en inglés).', 'Definições formais, notação e a distinção entre permutações e combinações (em inglês).') },
  { id: 'disc5-r-wiki-es', title: 'Wikipedia (ES): Combinatoria', url: 'https://es.wikipedia.org/wiki/Combinatoria', kind: 'article', verifiedOn: '2026-11-04', note: L('The same area in Spanish, including counting rules and binomial coefficients.', 'La misma área en español, con reglas de conteo y coeficientes binomiales.', 'A mesma área em espanhol, com regras de contagem e coeficientes binomiais.') },
  { id: 'disc5-r-khan', title: 'Khan Academy: Counting, permutations, and combinations', url: 'https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Videos and practice on the multiplication rule, permutations, combinations, and probability.', 'Videos y práctica sobre la regla de multiplicación, permutaciones, combinaciones y probabilidad; el sitio está en varios idiomas.', 'Vídeos e prática sobre a regra de multiplicação, permutações, combinações e probabilidade; o site está em vários idiomas.') },
  { id: 'disc5-r-openstax', title: 'OpenStax Contemporary Mathematics: Counting', url: 'https://openstax.org/books/contemporary-mathematics/pages/1-5-counting', kind: 'book', verifiedOn: '2026-11-04', note: L('Open textbook section on counting principles, permutations, and combinations.', 'Sección de un libro abierto sobre principios de conteo, permutaciones y combinaciones (en inglés).', 'Seção de um livro aberto sobre princípios de contagem, permutações e combinações (em inglês).') },
  { id: 'disc5-r-wiki-probability', title: 'Wikipedia: Probability', url: 'https://en.wikipedia.org/wiki/Probability', kind: 'article', verifiedOn: '2026-11-04', note: L('Definitions, axioms, conditional probability, and worked examples.', 'Definiciones, axiomas, probabilidad condicional y ejemplos resueltos (en inglés).', 'Definições, axiomas, probabilidade condicional e exemplos resolvidos (em inglês).') },
];

/** Discrete Mathematics, Week 5: counting and probability. */
export const discWeek5: WeekContent = {
  id: 'y1-t1-m2-disc-w5',
  year: 1,
  term: 1,
  module: 2,
  week: 5,
  subject: 'discrete-mathematics',
  title: L('Counting, combinatorics, and probability', 'Conteo, combinatoria y probabilidad', 'Contagem, combinatória e probabilidade'),
  intro: L(
    'Counting is how discrete mathematics measures possibility. This week you will decide when to add and when to multiply, build decision trees, and count arrangements with and without order or repetition. You will meet permutations, combinations, Pascal’s identity, the binomial theorem, and multinomial coefficients, then use inclusion–exclusion to correct overlaps and the pigeonhole principle to prove that collisions must happen. The week closes with finite probability: sample spaces, complements, conditional probability, and expected value. Every formula here is a tool for answering "how many?" and "how likely?" without listing every case.',
    'El conteo es la forma en que la matemática discreta mide lo posible. Esta semana decidirás cuándo sumar y cuándo multiplicar, construirás árboles de decisión y contarás ordenaciones con y sin orden o repetición. Conocerás permutaciones, combinaciones, la identidad de Pascal, el teorema del binomio y los coeficientes multinomiales; luego usarás inclusión–exclusión para corregir solapamientos y el principio del palomar para demostrar que las colisiones deben ocurrir. La semana cierra con probabilidad finita: espacios muestrales, complementos, probabilidad condicional y valor esperado. Cada fórmula aquí es una herramienta para responder "¿cuántos?" y "¿qué tan probable?" sin enumerar todos los casos.',
    'A contagem é como a matemática discreta mede o possível. Nesta semana você vai decidir quando somar e quando multiplicar, construir árvores de decisão e contar arranjos com e sem ordem ou repetição. Você conhecerá permutações, combinações, a identidade de Pascal, o teorema binomial e coeficientes multinomiais; depois usará inclusão–exclusão para corrigir sobreposições e o princípio da casa dos pombos para provar que colisões devem acontecer. A semana termina com probabilidade finita: espaços amostrais, complementos, probabilidade condicional e valor esperado. Cada fórmula aqui é uma ferramenta para responder "quantos?" e "qual a chance?" sem listar todos os casos.',
  ),
  objectives: [
    L('Apply the sum and product rules and draw decision trees.', 'Aplicar las reglas de la suma y del producto y dibujar árboles de decisión.', 'Aplicar as regras da soma e do produto e desenhar árvores de decisão.'),
    L('Count arrangements with P(n, k), repetition, circular order, and repeated symbols.', 'Contar ordenaciones con P(n, k), repetición, orden circular y símbolos repetidos.', 'Contar arranjos com P(n, k), repetição, ordem circular e símbolos repetidos.'),
    L('Count unordered selections with C(n, k) and use the binomial theorem.', 'Contar selecciones no ordenadas con C(n, k) y usar el teorema del binomio.', 'Contar seleções não ordenadas com C(n, k) e usar o teorema binomial.'),
    L('Use inclusion–exclusion, complements, and the pigeonhole principle.', 'Usar inclusión–exclusión, complementos y el principio del palomar.', 'Usar inclusão–exclusão, complementos e o princípio da casa dos pombos.'),
    L('Compute finite probabilities, conditional probabilities, and expected values.', 'Calcular probabilidades finitas, condicionales y valores esperados.', 'Calcular probabilidades finitas, condicionais e valores esperados.'),
  ],
  prerequisites: [
    L('Sets, cardinality, and De Morgan’s laws from Week 2.', 'Conjuntos, cardinalidad y leyes de De Morgan de la Semana 2.', 'Conjuntos, cardinalidade e leis de De Morgan da Semana 2.'),
    L('Functions and finite-size arguments from Week 4.', 'Funciones y argumentos de tamaños finitos de la Semana 4.', 'Funções e argumentos de tamanhos finitos da Semana 4.'),
  ],
  keyConcepts: [
    L('Sum and product rules', 'Reglas de la suma y del producto', 'Regras da soma e do produto'),
    L('Permutation', 'Permutación', 'Permutação'),
    L('Combination', 'Combinación', 'Combinação'),
    L('Binomial coefficient', 'Coeficiente binomial', 'Coeficiente binomial'),
    L('Multinomial coefficient', 'Coeficiente multinomial', 'Coeficiente multinomial'),
    L('Inclusion–exclusion', 'Inclusión–exclusión', 'Inclusão–exclusão'),
    L('Pigeonhole principle', 'Principio del palomar', 'Princípio da casa dos pombos'),
    L('Sample space and event', 'Espacio muestral y evento', 'Espaço amostral e evento'),
    L('Conditional probability', 'Probabilidad condicional', 'Probabilidade condicional'),
  ],
  estimatedMinutes: 450,
  sequence: [
    L('Lesson 1: sum and product rules, decision trees, and overlaps.', 'Lección 1: reglas de la suma y del producto, árboles de decisión y solapamientos.', 'Lição 1: regras da soma e do produto, árvores de decisão e sobreposições.'),
    L('Lesson 2: permutations, circular arrangements, and repeated symbols.', 'Lección 2: permutaciones, ordenaciones circulares y símbolos repetidos.', 'Lição 2: permutações, arranjos circulares e símbolos repetidos.'),
    L('Lesson 3 and Lab 1: combinations, Pascal, binomial theorem, and multinomials.', 'Lección 3 y Laboratorio 1: combinaciones, Pascal, teorema del binomio y multinomiales.', 'Lição 3 e Laboratório 1: combinações, Pascal, teorema binomial e multinomiais.'),
    L('Lesson 4: inclusion–exclusion, complements, and pigeonhole.', 'Lección 4: inclusión–exclusión, complementos y palomar.', 'Lição 4: inclusão–exclusão, complementos e casa dos pombos.'),
    L('Lesson 5 and Lab 2: finite probability and expected value. Then the quiz.', 'Lección 5 y Laboratorio 2: probabilidad finita y valor esperado. Luego el cuestionario.', 'Lição 5 e Laboratório 2: probabilidade finita e valor esperado. Depois o questionário.'),
  ],
  outcomes: [
    L('You can read a counting problem and choose between a sum, a product, a permutation, a combination, or a complement.', 'Puedes leer un problema de conteo y elegir entre suma, producto, permutación, combinación o complemento.', 'Você consegue ler um problema de contagem e escolher entre soma, produto, permutação, combinação ou complemento.'),
    L('You can justify a count with a decision tree or a disjoint-case split instead of guessing a formula.', 'Puedes justificar una cuenta con un árbol de decisión o una separación en casos disjuntos en vez de adivinar una fórmula.', 'Você consegue justificar uma contagem com uma árvore de decisão ou uma divisão em casos disjuntos em vez de adivinhar uma fórmula.'),
    L('You can turn a probability question into a ratio of counted outcomes and check it with a complement.', 'Puedes convertir una pregunta de probabilidad en una razón de resultados contados y comprobarla con un complemento.', 'Você consegue transformar uma pergunta de probabilidade em uma razão de resultados contados e conferi-la com um complemento.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Draw a decision tree for at least two counting problems', 'Dibujar un árbol de decisión para al menos dos problemas de conteo', 'Desenhar uma árvore de decisão para pelo menos dois problemas de contagem'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Complete the activities', 'Completar las actividades', 'Completar as atividades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Multiplying counts for alternatives that cannot happen together.', 'Multiplicar cuentas de alternativas que no pueden ocurrir juntas.', 'Multiplicar contagens de alternativas que não podem ocorrer juntas.'), fix: L('Use the sum rule for "one of these" and the product rule for "one from each stage".', 'Usa la regla de la suma para "uno de estos" y la del producto para "uno de cada etapa".', 'Use a regra da soma para "um destes" e a do produto para "um de cada etapa".') },
    { mistake: L('Using P(n, k) when the selection is unordered.', 'Usar P(n, k) cuando la selección no está ordenada.', 'Usar P(n, k) quando a seleção não é ordenada.'), fix: L('Divide by k! to get C(n, k) when order is irrelevant.', 'Divide por k! para obtener C(n, k) cuando el orden es irrelevante.', 'Divida por k! para obter C(n, k) quando a ordem é irrelevante.') },
    { mistake: L('Adding P(A) + P(B) for events that can overlap.', 'Sumar P(A) + P(B) para eventos que pueden solaparse.', 'Somar P(A) + P(B) para eventos que podem se sobrepor.'), fix: L('Subtract P(A ∩ B), or count the complement.', 'Resta P(A ∩ B) o cuenta el complemento.', 'Subtraia P(A ∩ B) ou conte o complemento.') },
  ],
  lessons: discWeek5Lessons,
  flashcards: discWeek5Flashcards,
  questions: discWeek5Questions,
  labs: discWeek5Labs,
  plan,
  resources,
  activities: discWeek5Activities,
  stories: [],
  tools: [],
  videos: [],
  documents: [],
};
