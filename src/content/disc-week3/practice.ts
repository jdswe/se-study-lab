import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 3. */
export const discWeek3Flashcards: Flashcard[] = [
  { id: 'disc3-fc-1', lessonId: 'disc3-l1-relations', kind: 'concept',
    front: L('When are (a, b) and (c, d) equal?', '¿Cuándo son iguales (a, b) y (c, d)?', 'Quando (a, b) e (c, d) são iguais?'),
    back: L('Exactly when a = c and b = d. Order matters: (1, 2) ≠ (2, 1).', 'Exactamente cuando a = c y b = d. El orden importa: (1, 2) ≠ (2, 1).', 'Exatamente quando a = c e b = d. A ordem importa: (1, 2) ≠ (2, 1).') },
  { id: 'disc3-fc-2', lessonId: 'disc3-l1-relations', kind: 'concept',
    front: L('Size of A × B', 'Tamaño de A × B', 'Tamanho de A × B'),
    back: L('|A|·|B| for finite sets. A relation is any subset of A × B, so there are 2^{|A||B|} of them.', '|A|·|B| para conjuntos finitos. Una relación es cualquier subconjunto de A × B, así que hay 2^{|A||B|}.', '|A|·|B| para conjuntos finitos. Uma relação é qualquer subconjunto de A × B, então há 2^{|A||B|}.') },
  { id: 'disc3-fc-3', lessonId: 'disc3-l2-domain-digraphs', kind: 'distinction',
    front: L('Domain, range, codomain', 'Dominio, rango, codominio', 'Domínio, imagem, contradomínio'),
    back: L('Domain: first coordinates used. Range: second coordinates used. Codomain: the declared target set B.', 'Dominio: primeras coordenadas usadas. Rango: segundas coordenadas usadas. Codominio: el conjunto destino declarado B.', 'Domínio: primeiras coordenadas usadas. Imagem: segundas coordenadas usadas. Contradomínio: o conjunto destino declarado B.') },
  { id: 'disc3-fc-4', lessonId: 'disc3-l2-domain-digraphs', kind: 'concept',
    front: L('Digraph and Boolean matrix of a relation', 'Digrafo y matriz booleana de una relación', 'Digrafo e matriz booleana de uma relação'),
    back: L('One vertex per element; one arrow per pair. Matrix: 1 in row a, column b exactly when a R b.', 'Un vértice por elemento; una flecha por par. Matriz: 1 en la fila a y columna b exactamente cuando a R b.', 'Um vértice por elemento; uma seta por par. Matriz: 1 na linha a e coluna b exatamente quando a R b.') },
  { id: 'disc3-fc-5', lessonId: 'disc3-l3-inverse-composition', kind: 'concept',
    front: L('Inverse relation R⁻¹', 'Relación inversa R⁻¹', 'Relação inversa R⁻¹'),
    back: L('Swap each pair: R⁻¹ = {(b, a) | (a, b) ∈ R}. Dom(R⁻¹) = Ran(R).', 'Intercambia cada par: R⁻¹ = {(b, a) | (a, b) ∈ R}. Dom(R⁻¹) = Ran(R).', 'Troca cada par: R⁻¹ = {(b, a) | (a, b) ∈ R}. Dom(R⁻¹) = Ran(R).') },
  { id: 'disc3-fc-6', lessonId: 'disc3-l3-inverse-composition', kind: 'command',
    front: L('(a, c) ∈ S ∘ R when…', '(a, c) ∈ S ∘ R cuando…', '(a, c) ∈ S ∘ R quando…'),
    back: L('There is some b with a R b and b S c. Apply R first, then S.', 'Existe algún b con a R b y b S c. Primero se aplica R y luego S.', 'Existe algum b com a R b e b S c. Aplica-se R primeiro e depois S.') },
  { id: 'disc3-fc-7', lessonId: 'disc3-l4-properties', kind: 'concept',
    front: L('The four basic relation properties', 'Las cuatro propiedades básicas de una relación', 'As quatro propriedades básicas de uma relação'),
    back: L('Reflexive: a R a. Symmetric: a R b ⇒ b R a. Antisymmetric: a R b and b R a ⇒ a = b. Transitive: a R b and b R c ⇒ a R c.', 'Reflexiva: a R a. Simétrica: a R b ⇒ b R a. Antisimétrica: a R b y b R a ⇒ a = b. Transitiva: a R b y b R c ⇒ a R c.', 'Reflexiva: a R a. Simétrica: a R b ⇒ b R a. Antissimétrica: a R b e b R a ⇒ a = b. Transitiva: a R b e b R c ⇒ a R c.') },
  { id: 'disc3-fc-8', lessonId: 'disc3-l4-properties', kind: 'distinction',
    front: L('Antisymmetric vs not symmetric', 'Antisimétrica vs no simétrica', 'Antissimétrica vs não simétrica'),
    back: L('Antisymmetric forbids two-way arrows between distinct elements but allows loops. A relation can be both symmetric and antisymmetric, like equality.', 'La antisimetría prohíbe flechas de ida y vuelta entre elementos distintos pero permite bucles. Una relación puede ser simétrica y antisimétrica a la vez, como la igualdad.', 'A antissimetria proíbe setas de ida e volta entre elementos distintos mas permite laços. Uma relação pode ser simétrica e antissimétrica ao mesmo tempo, como a igualdade.') },
  { id: 'disc3-fc-9', lessonId: 'disc3-l5-equivalence-orders', kind: 'concept',
    front: L('Equivalence relation', 'Relación de equivalencia', 'Relação de equivalência'),
    back: L('Reflexive + symmetric + transitive. Its equivalence classes partition the set.', 'Reflexiva + simétrica + transitiva. Sus clases de equivalencia particionan el conjunto.', 'Reflexiva + simétrica + transitiva. Suas classes de equivalência particionam o conjunto.') },
  { id: 'disc3-fc-10', lessonId: 'disc3-l5-equivalence-orders', kind: 'concept',
    front: L('Partial order vs total order', 'Orden parcial vs orden total', 'Ordem parcial vs ordem total'),
    back: L('Partial: reflexive, antisymmetric, transitive; some pairs may be incomparable. Total: every two elements are comparable.', 'Parcial: reflexiva, antisimétrica, transitiva; algunas parejas pueden ser incomparables. Total: dos elementos cualesquiera son comparables.', 'Parcial: reflexiva, antissimétrica, transitiva; alguns pares podem ser incomparáveis. Total: dois elementos quaisquer são comparáveis.') },
  { id: 'disc3-fc-11', lessonId: 'disc3-l5-equivalence-orders', kind: 'concept',
    front: L('Congruence classes modulo 3 on {0, …, 8}', 'Clases de congruencia módulo 3 sobre {0, …, 8}', 'Classes de congruência módulo 3 sobre {0, …, 8}'),
    back: L('{0, 3, 6}, {1, 4, 7}, {2, 5, 8}.', '{0, 3, 6}, {1, 4, 7}, {2, 5, 8}.', '{0, 3, 6}, {1, 4, 7}, {2, 5, 8}.') },
  { id: 'disc3-fc-12', lessonId: 'disc3-l3-inverse-composition', kind: 'command',
    front: L('What is R²?', '¿Qué es R²?', 'O que é R²?'),
    back: L('R ∘ R: pairs (a, c) joined by a two-step chain a R b R c.', 'R ∘ R: pares (a, c) unidos por una cadena de dos pasos a R b R c.', 'R ∘ R: pares (a, c) ligados por uma corrente de dois passos a R b R c.') },
];

/** Quiz for Discrete Mathematics, Week 3. */
export const discWeek3Questions: Question[] = [
  {
    id: 'disc3-q-fill-product', type: 'fill-blank', lessonId: 'disc3-l1-relations',
    prompt: L('A has 4 elements and B has 6. |A × B| = ___', 'A tiene 4 elementos y B tiene 6. |A × B| = ___', 'A tem 4 elementos e B tem 6. |A × B| = ___'),
    accepted: ['24'],
    explanation: L('Every first coordinate pairs with every second: 4·6 = 24.', 'Cada primera coordenada se empareja con cada segunda: 4·6 = 24.', 'Cada primeira coordenada se emparelha com cada segunda: 4·6 = 24.'),
  },
  {
    id: 'disc3-q-mc-count-relations', type: 'multiple-choice', lessonId: 'disc3-l1-relations',
    prompt: L('How many relations are there on a 2-element set?', '¿Cuántas relaciones hay sobre un conjunto de 2 elementos?', 'Quantas relações existem sobre um conjunto de 2 elementos?'),
    options: [S('4'), S('16'), S('8')],
    answer: 1,
    explanation: L('A × A has 4 pairs and every subset is a relation: 2⁴ = 16.', 'A × A tiene 4 pares y todo subconjunto es una relación: 2⁴ = 16.', 'A × A tem 4 pares e todo subconjunto é uma relação: 2⁴ = 16.'),
  },
  {
    id: 'disc3-q-tf-function', type: 'true-false', lessonId: 'disc3-l1-relations',
    prompt: L('True or false: every function is a relation, but not every relation is a function.', 'Verdadero o falso: toda función es una relación, pero no toda relación es una función.', 'Verdadeiro ou falso: toda função é uma relação, mas nem toda relação é uma função.'),
    options: TF, answer: 0,
    explanation: L('True. A function is a relation with exactly one output for each input; a general relation may have several or none.', 'Verdadero. Una función es una relación con exactamente una salida por entrada; una relación general puede tener varias o ninguna.', 'Verdadeiro. Uma função é uma relação com exatamente uma saída por entrada; uma relação geral pode ter várias ou nenhuma.'),
  },
  {
    id: 'disc3-q-mc-range', type: 'multiple-choice', lessonId: 'disc3-l2-domain-digraphs',
    prompt: L('R = {(1, a), (3, b), (3, c)} from {1, 2, 3} to {a, b, c, d}. What are Dom(R) and Ran(R)?', 'R = {(1, a), (3, b), (3, c)} de {1, 2, 3} a {a, b, c, d}. ¿Cuáles son Dom(R) y Ran(R)?', 'R = {(1, a), (3, b), (3, c)} de {1, 2, 3} para {a, b, c, d}. Quais são Dom(R) e Ran(R)?'),
    options: [L('{1, 3} and {a, b, c}', '{1, 3} y {a, b, c}', '{1, 3} e {a, b, c}'), L('{1, 2, 3} and {a, b, c, d}', '{1, 2, 3} y {a, b, c, d}', '{1, 2, 3} e {a, b, c, d}'), L('{1, 3} and {a, b, c, d}', '{1, 3} y {a, b, c, d}', '{1, 3} e {a, b, c, d}')],
    answer: 0,
    explanation: L('Only 1 and 3 appear first; only a, b, and c appear second. 2 and d are in the declared sets but unused.', 'Solo 1 y 3 aparecen primero; solo a, b y c aparecen segundos. 2 y d están en los conjuntos declarados pero no se usan.', 'Só 1 e 3 aparecem primeiro; só a, b e c aparecem segundos. 2 e d estão nos conjuntos declarados mas não são usados.'),
  },
  {
    id: 'disc3-q-matching-rep', type: 'matching', lessonId: 'disc3-l2-domain-digraphs',
    prompt: L('Match each representation with what it shows for the pair (2, 5).', 'Une cada representación con lo que muestra para el par (2, 5).', 'Ligue cada representação com o que ela mostra para o par (2, 5).'),
    left: [L('Set of pairs', 'Conjunto de pares', 'Conjunto de pares'), L('Digraph', 'Digrafo', 'Digrafo'), L('Matrix', 'Matriz', 'Matriz')],
    right: [L('A 1 in row 2, column 5', 'Un 1 en la fila 2, columna 5', 'Um 1 na linha 2, coluna 5'), L('The pair (2, 5) is listed', 'El par (2, 5) aparece listado', 'O par (2, 5) aparece listado'), L('An arrow 2 → 5', 'Una flecha 2 → 5', 'Uma seta 2 → 5')],
    answer: [1, 2, 0],
    explanation: L('Pairs list the relation, digraphs draw arrows, and matrices mark the cell.', 'Los pares listan la relación, los digrafos dibujan flechas y las matrices marcan la celda.', 'Os pares listam a relação, os digrafos desenham setas e as matrizes marcam a célula.'),
  },
  {
    id: 'disc3-q-fill-composition', type: 'fill-blank', lessonId: 'disc3-l3-inverse-composition',
    prompt: L('R = {(1, 2), (2, 3)}, S = {(2, 4)}. S ∘ R = ___', 'R = {(1, 2), (2, 3)}, S = {(2, 4)}. S ∘ R = ___', 'R = {(1, 2), (2, 3)}, S = {(2, 4)}. S ∘ R = ___'),
    accepted: ['{(1,4)}', '{(1, 4)}', '(1,4)'],
    explanation: L('Only 1 R 2 and 2 S 4 chain: (1, 4). The pair (2, 3) cannot continue because S has no arrow from 3.', 'Solo 1 R 2 y 2 S 4 encadenan: (1, 4). El par (2, 3) no puede continuar porque S no tiene flecha desde 3.', 'Só 1 R 2 e 2 S 4 encadeiam: (1, 4). O par (2, 3) não pode continuar porque S não tem seta a partir de 3.'),
  },
  {
    id: 'disc3-q-troubleshoot-compose', type: 'troubleshooting', lessonId: 'disc3-l3-inverse-composition',
    prompt: L('A student computes S ∘ R for R = {(1, a)} and S = {(a, x)} as follows. What is wrong?', 'Un estudiante calcula S ∘ R para R = {(1, a)} y S = {(a, x)} así. ¿Qué está mal?', 'Um estudante calcula S ∘ R para R = {(1, a)} e S = {(a, x)} assim. O que está errado?'),
    code: 'R = {(1, a)}, S = {(a, x)}\nS ∘ R = {(a, 1)}   because we reverse the pairs',
    options: [
      L('Nothing; composition reverses pairs like an inverse.', 'Nada; la composición invierte pares como una inversa.', 'Nada; a composição inverte pares como uma inversa.'),
      L('Composition applies R then S, giving (1, x); reversing pairs is inversion, not composition.', 'La composición aplica R y luego S, dando (1, x); invertir pares es la inversa, no la composición.', 'A composição aplica R e depois S, dando (1, x); inverter pares é a inversa, não a composição.'),
      L('The result should be (x, 1) because S comes first.', 'El resultado debería ser (x, 1) porque S va primero.', 'O resultado deveria ser (x, 1) porque S vem primeiro.'),
    ],
    answer: 1,
    explanation: L('S ∘ R = {(1, x)}. The student described (S ∘ R)⁻¹ = R⁻¹ ∘ S⁻¹.', 'S ∘ R = {(1, x)}. El estudiante describió (S ∘ R)⁻¹ = R⁻¹ ∘ S⁻¹.', 'S ∘ R = {(1, x)}. O estudante descreveu (S ∘ R)⁻¹ = R⁻¹ ∘ S⁻¹.'),
  },
  {
    id: 'disc3-q-mc-properties', type: 'multiple-choice', lessonId: 'disc3-l4-properties',
    prompt: L('R = {(1,1), (1,2), (2,1), (2,2)} on {1, 2, 3}. Which property fails?', 'R = {(1,1), (1,2), (2,1), (2,2)} sobre {1, 2, 3}. ¿Qué propiedad falla?', 'R = {(1,1), (1,2), (2,1), (2,2)} sobre {1, 2, 3}. Qual propriedade falha?'),
    options: [L('Reflexive', 'Reflexiva', 'Reflexiva'), L('Symmetric', 'Simétrica', 'Simétrica'), L('Transitive', 'Transitiva', 'Transitiva')],
    answer: 0,
    explanation: L('3 has no loop, so R is not reflexive. It is symmetric and transitive on the part it covers.', '3 no tiene bucle, así que R no es reflexiva. Es simétrica y transitiva en la parte que cubre.', '3 não tem laço, então R não é reflexiva. É simétrica e transitiva na parte que cobre.'),
    whyWrong: [L('Correct: (3,3) is missing.', 'Correcto: falta (3,3).', 'Correto: falta (3,3).'), L('Every arrow has its reverse.', 'Toda flecha tiene su inversa.', 'Toda seta tem sua inversa.'), L('All chains of two stay inside {1,2} and have shortcuts.', 'Todas las cadenas de dos quedan en {1,2} y tienen atajo.', 'Todas as correntes de dois ficam em {1,2} e têm atalho.')],
  },
  {
    id: 'disc3-q-fill-classes', type: 'fill-blank', lessonId: 'disc3-l5-equivalence-orders',
    prompt: L('On {0, 1, 2, 3, 4, 5}, congruence modulo 3 has ___ equivalence classes.', 'Sobre {0, 1, 2, 3, 4, 5}, la congruencia módulo 3 tiene ___ clases de equivalencia.', 'Sobre {0, 1, 2, 3, 4, 5}, a congruência módulo 3 tem ___ classes de equivalência.'),
    accepted: ['3'],
    explanation: L('{0, 3}, {1, 4}, {2, 5}: one class per possible remainder 0, 1, 2.', '{0, 3}, {1, 4}, {2, 5}: una clase por cada resto posible 0, 1, 2.', '{0, 3}, {1, 4}, {2, 5}: uma classe para cada resto possível 0, 1, 2.'),
  },
  {
    id: 'disc3-q-scenario-order', type: 'scenario', lessonId: 'disc3-l5-equivalence-orders',
    prompt: L('A build system says task A must run before B, and B before C, but A and C may run in either order once B is done. What kind of order is this?', 'Un sistema de compilación dice que la tarea A debe correr antes que B, y B antes que C, pero A y C pueden correr en cualquier orden una vez hecho B. ¿Qué tipo de orden es?', 'Um sistema de build diz que a tarefa A deve rodar antes de B, e B antes de C, mas A e C podem rodar em qualquer ordem depois de B. Que tipo de ordem é essa?'),
    options: [L('A total order', 'Un orden total', 'Uma ordem total'), L('A partial order', 'Un orden parcial', 'Uma ordem parcial'), L('An equivalence relation', 'Una relación de equivalencia', 'Uma relação de equivalência')],
    answer: 1,
    explanation: L('Some pairs are comparable and some are not: a partial order. A total order would rank every pair.', 'Algunas parejas son comparables y otras no: un orden parcial. Un orden total clasificaría toda pareja.', 'Alguns pares são comparáveis e outros não: uma ordem parcial. Uma ordem total classificaria todo par.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 3. */
export const discWeek3Activities: Activity[] = [
  {
    id: 'disc3-act-order-compose', kind: 'order', lessonId: 'disc3-l3-inverse-composition',
    title: L('Build a composition', 'Construye una composición', 'Monte uma composição'),
    prompt: L('Order the steps to compute S ∘ R.', 'Ordena los pasos para calcular S ∘ R.', 'Ordene os passos para calcular S ∘ R.'),
    items: [
      L('Pick a first element a from the domain of R', 'Elige un primer elemento a del dominio de R', 'Escolha um primeiro elemento a do domínio de R'),
      L('Find every b with a R b', 'Encuentra todos los b con a R b', 'Encontre todos os b com a R b'),
      L('For each b, find every c with b S c', 'Para cada b, encuentra todos los c con b S c', 'Para cada b, encontre todos os c com b S c'),
      L('Add each pair (a, c) to S ∘ R', 'Añade cada par (a, c) a S ∘ R', 'Acrescente cada par (a, c) a S ∘ R'),
      L('Repeat for every a in the domain of R', 'Repite para cada a del dominio de R', 'Repita para cada a do domínio de R'),
    ],
    explanation: L('Composition is a double lookup: from a to every hub b, then from each hub to every destination c.', 'La composición es una doble búsqueda: de a a cada centro b, y de cada centro a cada destino c.', 'A composição é uma busca dupla: de a para cada hub b, e de cada hub para cada destino c.'),
  },
  {
    id: 'disc3-act-fill-matrix', kind: 'code-fill', lessonId: 'disc3-l2-domain-digraphs',
    title: L('Complete the Boolean matrix', 'Completa la matriz booleana', 'Complete a matriz booleana'),
    prompt: L('R = {(1,2), (2,2), (2,3), (3,1)} on {1, 2, 3}. Fill the missing entries.', 'R = {(1,2), (2,2), (2,3), (3,1)} sobre {1, 2, 3}. Completa las entradas que faltan.', 'R = {(1,2), (2,2), (2,3), (3,1)} sobre {1, 2, 3}. Complete as entradas que faltam.'),
    template: '      1 2 3\n  1 | 0 {0} 0\n  2 | 0 1 {1}\n  3 | {2} 0 0',
    blanks: ['1', '1', '1'],
    explanation: L('Row 1 marks 2; row 2 marks 2 and 3; row 3 marks 1. A 1 is placed exactly at each pair.', 'La fila 1 marca 2; la fila 2 marca 2 y 3; la fila 3 marca 1. Se pone un 1 exactamente en cada par.', 'A linha 1 marca 2; a linha 2 marca 2 e 3; a linha 3 marca 1. Coloca-se um 1 exatamente em cada par.'),
  },
  {
    id: 'disc3-act-scramble-inverse', kind: 'scramble', lessonId: 'disc3-l3-inverse-composition',
    title: L('Rebuild the inverse relation', 'Reconstruye la relación inversa', 'Reconstrua a relação inversa'),
    prompt: L('Rebuild the Python expression that builds R⁻¹ from R.', 'Reconstruye la expresión de Python que construye R⁻¹ a partir de R.', 'Reconstrua a expressão Python que constrói R⁻¹ a partir de R.'),
    tokens: ['R_inv', '=', '{(b,', 'a)', 'for', '(a,', 'b)', 'in', 'R}'],
    explanation: L('A set comprehension swaps the coordinates of every pair in R.', 'Una comprensión de conjuntos intercambia las coordenadas de cada par de R.', 'Uma compreensão de conjuntos troca as coordenadas de cada par de R.'),
  },
  {
    id: 'disc3-act-classify-properties', kind: 'classify', lessonId: 'disc3-l4-properties',
    title: L('Which property is broken?', '¿Qué propiedad se rompe?', 'Qual propriedade é quebrada?'),
    prompt: L('Each example breaks one property. Sort it into the right bucket.', 'Cada ejemplo rompe una propiedad. Clasifícalo en el grupo correcto.', 'Cada exemplo quebra uma propriedade. Classifique-o no grupo certo.'),
    buckets: [L('Not reflexive', 'No reflexiva', 'Não reflexiva'), L('Not symmetric', 'No simétrica', 'Não simétrica'), L('Not transitive', 'No transitiva', 'Não transitiva')],
    items: [
      { text: L('"Is taller than" on people', '"Es más alto que" sobre personas', '"É mais alto que" sobre pessoas'), bucket: 0 },
      { text: L('"Is a parent of" on people', '"Es padre/madre de" sobre personas', '"É pai/mãe de" sobre pessoas'), bucket: 1 },
      { text: L('"Is a friend of" on social media', '"Es amigo de" en redes sociales', '"É amigo de" em redes sociais'), bucket: 2 },
      { text: L('"Is a sibling of" on people', '"Es hermano/a de" sobre personas', '"É irmão/irmã de" sobre pessoas'), bucket: 0 },
      { text: L('"Divides" on positive integers', '"Divide a" sobre enteros positivos', '"Divide" sobre inteiros positivos'), bucket: 1 },
    ],
    explanation: L('Taller-than is irreflexive; parent and divides are not symmetric; friendship is not transitive (your friend\'s friend may not be yours).', 'Ser más alto es irreflexiva; ser padre/madre y dividir no son simétricas; la amistad no es transitiva (el amigo de tu amigo puede no ser tuyo).', 'Ser mais alto é irreflexiva; ser pai/mãe e dividir não são simétricas; a amizade não é transitiva (o amigo do seu amigo pode não ser seu).'),
  },
];

/** Paper labs for Discrete Mathematics, Week 3, with worked answers. */
export const discWeek3Labs: Lab[] = [
  {
    id: 'disc3-lab-1-relations', kind: 'math', level: 1, minutes: 40,
    title: L('Relations in three representations', 'Relaciones en tres representaciones', 'Relações em três representações'),
    goal: L('Move between pairs, a digraph, and a matrix, and read domain and range from each.', 'Pasar entre pares, digrafo y matriz, y leer dominio y rango en cada uno.', 'Passar entre pares, digrafo e matriz, e ler domínio e imagem em cada um.'),
    steps: [
      { id: 'disc3-lab1-s1', title: L('Pairs to matrix', 'De pares a matriz', 'De pares para matriz'), commands: ['A = {1,2,3,4}, R = {(1,1), (1,3), (2,4), (3,2), (4,4)}'],
        expected: L('Rows 1–4: [1 0 1 0], [0 0 0 1], [0 1 0 0], [0 0 0 1].', 'Filas 1–4: [1 0 1 0], [0 0 0 1], [0 1 0 0], [0 0 0 1].', 'Linhas 1–4: [1 0 1 0], [0 0 0 1], [0 1 0 0], [0 0 0 1].') },
      { id: 'disc3-lab1-s2', title: L('Domain and range', 'Dominio y rango', 'Domínio e imagem'), commands: ['Dom(R), Ran(R)'],
        expected: L('Dom = {1, 2, 3, 4}; Ran = {1, 2, 3, 4}.', 'Dom = {1, 2, 3, 4}; Ran = {1, 2, 3, 4}.', 'Dom = {1, 2, 3, 4}; Ran = {1, 2, 3, 4}.') },
      { id: 'disc3-lab1-s3', title: L('Inverse', 'Inversa', 'Inversa'), commands: ['R⁻¹'],
        expected: L('{(1,1), (3,1), (4,2), (2,3), (4,4)}; the matrix is the transpose.', '{(1,1), (3,1), (4,2), (2,3), (4,4)}; la matriz es la traspuesta.', '{(1,1), (3,1), (4,2), (2,3), (4,4)}; a matriz é a transposta.') },
      { id: 'disc3-lab1-s4', title: L('A composition', 'Una composición', 'Uma composição'), commands: ['S = {(1,2), (2,3), (3,4)}; compute S ∘ R'],
        expected: L('1 R 1 S 2 gives (1,2); 1 R 3 S 4 gives (1,4); 3 R 2 S 3 gives (3,3). Other starts have no S arrow. S ∘ R = {(1,2), (1,4), (3,3)}.', '1 R 1 S 2 da (1,2); 1 R 3 S 4 da (1,4); 3 R 2 S 3 da (3,3). Los demás inicios no tienen flecha S. S ∘ R = {(1,2), (1,4), (3,3)}.', '1 R 1 S 2 dá (1,2); 1 R 3 S 4 dá (1,4); 3 R 2 S 3 dá (3,3). Os demais inícios não têm seta S. S ∘ R = {(1,2), (1,4), (3,3)}.') },
    ],
  },
  {
    id: 'disc3-lab-2-equivalence-order', kind: 'math', level: 2, minutes: 45,
    title: L('Classes, partitions, and Hasse diagrams', 'Clases, particiones y diagramas de Hasse', 'Classes, partições e diagramas de Hasse'),
    goal: L('Prove that a relation is an equivalence relation, list its classes, and draw a small partial order.', 'Demostrar que una relación es de equivalencia, listar sus clases y dibujar un orden parcial pequeño.', 'Provar que uma relação é de equivalência, listar suas classes e desenhar uma ordem parcial pequena.'),
    steps: [
      { id: 'disc3-lab2-s1', title: L('Prove the three properties', 'Demuestra las tres propiedades', 'Prove as três propriedades'), commands: ['On ℤ: a R b ⇔ a − b is even'],
        expected: L('Reflexive: a − a = 0 is even. Symmetric: if a − b is even, b − a = −(a − b) is even. Transitive: if a − b and b − c are even, a − c = (a − b) + (b − c) is even. ∎', 'Reflexiva: a − a = 0 es par. Simétrica: si a − b es par, b − a = −(a − b) es par. Transitiva: si a − b y b − c son pares, a − c = (a − b) + (b − c) es par. ∎', 'Reflexiva: a − a = 0 é par. Simétrica: se a − b é par, b − a = −(a − b) é par. Transitiva: se a − b e b − c são pares, a − c = (a − b) + (b − c) é par. ∎') },
      { id: 'disc3-lab2-s2', title: L('Classes', 'Clases', 'Classes'), commands: ['Classes on {0,1,2,3,4,5}'],
        expected: L('{0, 2, 4} and {1, 3, 5}: the evens and the odds.', '{0, 2, 4} y {1, 3, 5}: los pares y los impares.', '{0, 2, 4} e {1, 3, 5}: os pares e os ímpares.') },
      { id: 'disc3-lab2-s3', title: L('A partition', 'Una partición', 'Uma partição'), commands: ['{{1,2},{3,4,5}} on {1,...,5}'],
        expected: L('Non-empty, disjoint, and the union is the whole set: a partition. The induced relation has two classes.', 'No vacíos, disjuntos y la unión es todo el conjunto: una partición. La relación inducida tiene dos clases.', 'Não vazios, disjuntos e a união é o conjunto todo: uma partição. A relação induzida tem duas classes.') },
      { id: 'disc3-lab2-s4', title: L('Hasse diagram', 'Diagrama de Hasse', 'Diagrama de Hasse'), commands: ['Divisibility on {1,2,3,4,6,12}'],
        expected: L('1 at the bottom; 2, 3, 4 above 1; 6 above 2 and 3; 12 above 4 and 6. 4 and 6 are incomparable. Least 1, greatest 12.', '1 abajo; 2, 3, 4 encima de 1; 6 encima de 2 y 3; 12 encima de 4 y 6. 4 y 6 son incomparables. Mínimo 1, máximo 12.', '1 embaixo; 2, 3, 4 acima de 1; 6 acima de 2 e 3; 12 acima de 4 e 6. 4 e 6 são incomparáveis. Mínimo 1, máximo 12.') },
    ],
  },
];
