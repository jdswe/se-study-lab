import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 2. */
export const discWeek2Flashcards: Flashcard[] = [
  { id: 'disc2-fc-1', lessonId: 'disc2-l1-sets', kind: 'concept',
    front: L('What makes a collection a set?', '¿Qué hace que una colección sea un conjunto?', 'O que faz uma coleção ser um conjunto?'),
    back: L('It is well defined: for every $x$ you can decide whether $x \\in A$ or $x \\notin A$.', 'Está bien definida: para todo $x$ se puede decidir si $x \\in A$ o $x \\notin A$.', 'É bem definida: para todo $x$ dá para decidir se $x \\in A$ ou $x \\notin A$.') },
  { id: 'disc2-fc-2', lessonId: 'disc2-l1-sets', kind: 'distinction',
    front: L('Extension vs comprehension', 'Extensión vs comprensión', 'Extensão vs compreensão'),
    back: L('Extension lists: $\\{a, e, i, o, u\\}$. Comprehension gives a rule: $\\{x \\in \\mathbb{Z} \\mid x \\text{ even}\\}$.', 'Extensión lista: $\\{a, e, i, o, u\\}$. Comprensión da una regla: $\\{x \\in \\mathbb{Z} \\mid x \\text{ par}\\}$.', 'Extensão lista: $\\{a, e, i, o, u\\}$. Compreensão dá uma regra: $\\{x \\in \\mathbb{Z} \\mid x \\text{ par}\\}$.') },
  { id: 'disc2-fc-3', lessonId: 'disc2-l1-sets', kind: 'concept',
    front: S('$|\\varnothing|$, $|\\{\\varnothing\\}|$, $|\\{0\\}|$'),
    back: L('$0$, $1$, and $1$.', '$0$, $1$ y $1$.', '$0$, $1$ e $1$.') },
  { id: 'disc2-fc-4', lessonId: 'disc2-l2-subsets', kind: 'distinction',
    front: L('$\\in$ vs $\\subseteq$', '$\\in$ vs $\\subseteq$', '$\\in$ vs $\\subseteq$'),
    back: L('$3 \\in \\{1, 2, 3\\}$ (element); $\\{3\\} \\subseteq \\{1, 2, 3\\}$ (subset).', '$3 \\in \\{1, 2, 3\\}$ (elemento); $\\{3\\} \\subseteq \\{1, 2, 3\\}$ (subconjunto).', '$3 \\in \\{1, 2, 3\\}$ (elemento); $\\{3\\} \\subseteq \\{1, 2, 3\\}$ (subconjunto).') },
  { id: 'disc2-fc-5', lessonId: 'disc2-l2-subsets', kind: 'concept',
    front: L('Size of the power set', 'Tamaño del conjunto potencia', 'Tamanho do conjunto das partes'),
    back: L('$|\\mathcal{P}(A)| = 2^{|A|}$, including $\\varnothing$ and $A$.', '$|\\mathcal{P}(A)| = 2^{|A|}$, incluidos $\\varnothing$ y $A$.', '$|\\mathcal{P}(A)| = 2^{|A|}$, incluindo $\\varnothing$ e $A$.') },
  { id: 'disc2-fc-6', lessonId: 'disc2-l3-operations', kind: 'concept',
    front: L('$\\cup$, $\\cap$, $-$, $\\triangle$ in words', '$\\cup$, $\\cap$, $-$, $\\triangle$ en palabras', '$\\cup$, $\\cap$, $-$, $\\triangle$ em palavras'),
    back: L('Or · and · in the first, not the second · in exactly one.', 'O · y · en el primero, no en el segundo · en exactamente uno.', 'Ou · e · no primeiro, não no segundo · em exatamente um.') },
  { id: 'disc2-fc-7', lessonId: 'disc2-l3-operations', kind: 'command',
    front: L('Set operations in Python', 'Operaciones de conjuntos en Python', 'Operações de conjuntos em Python'),
    back: L('`a | b`, `a & b`, `a - b`, `a ^ b`; `a <= b` tests $a \\subseteq b$.', '`a | b`, `a & b`, `a - b`, `a ^ b`; `a <= b` prueba $a \\subseteq b$.', '`a | b`, `a & b`, `a - b`, `a ^ b`; `a <= b` testa $a \\subseteq b$.') },
  { id: 'disc2-fc-8', lessonId: 'disc2-l4-laws', kind: 'concept',
    front: L('De Morgan for sets', 'De Morgan para conjuntos', 'De Morgan para conjuntos'),
    back: S('$(A \\cup B)^c = A^c \\cap B^c$, $(A \\cap B)^c = A^c \\cup B^c$') },
  { id: 'disc2-fc-9', lessonId: 'disc2-l4-laws', kind: 'command',
    front: L('Difference as an intersection', 'Diferencia como intersección', 'Diferença como interseção'),
    back: S('$A - B = A \\cap B^c$') },
  { id: 'disc2-fc-10', lessonId: 'disc2-l5-partitions-counting', kind: 'concept',
    front: L('The three conditions of a partition', 'Las tres condiciones de una partición', 'As três condições de uma partição'),
    back: L('Non-empty blocks, pairwise disjoint, union equal to the whole set.', 'Bloques no vacíos, disjuntos dos a dos, cuya unión es todo el conjunto.', 'Blocos não vazios, disjuntos dois a dois, cuja união é o conjunto todo.') },
  { id: 'disc2-fc-11', lessonId: 'disc2-l5-partitions-counting', kind: 'command',
    front: L('Inclusion–exclusion for two sets', 'Inclusión–exclusión para dos conjuntos', 'Inclusão–exclusão para dois conjuntos'),
    back: S('$|A \\cup B| = |A| + |B| - |A \\cap B|$') },
];

/** Quiz for Discrete Mathematics, Week 2. */
export const discWeek2Questions: Question[] = [
  {
    id: 'disc2-q-fill-card', type: 'fill-blank', lessonId: 'disc2-l1-sets',
    prompt: L('$|\\{x \\in \\mathbb{Z} \\mid -3 < x \\le 2\\}| = $ ___', '$|\\{x \\in \\mathbb{Z} \\mid -3 < x \\le 2\\}| = $ ___', '$|\\{x \\in \\mathbb{Z} \\mid -3 < x \\le 2\\}| = $ ___'),
    accepted: ['5'],
    explanation: L('The set is $\\{-2, -1, 0, 1, 2\\}$.', 'El conjunto es $\\{-2, -1, 0, 1, 2\\}$.', 'O conjunto é $\\{-2, -1, 0, 1, 2\\}$.'),
  },
  {
    id: 'disc2-q-tf-order', type: 'true-false', lessonId: 'disc2-l1-sets',
    prompt: L('True or false: $\\{1, 2, 2, 3\\} = \\{3, 2, 1\\}$.', 'Verdadero o falso: $\\{1, 2, 2, 3\\} = \\{3, 2, 1\\}$.', 'Verdadeiro ou falso: $\\{1, 2, 2, 3\\} = \\{3, 2, 1\\}$.'),
    options: TF, answer: 0,
    explanation: L('True: order and repeats do not matter.', 'Verdadero: el orden y las repeticiones no importan.', 'Verdadeiro: ordem e repetições não importam.'),
  },
  {
    id: 'disc2-q-mc-power', type: 'multiple-choice', lessonId: 'disc2-l2-subsets',
    prompt: L('How many subsets of $\\{a, b, c, d\\}$ contain $a$?', '¿Cuántos subconjuntos de $\\{a, b, c, d\\}$ contienen a $a$?', 'Quantos subconjuntos de $\\{a, b, c, d\\}$ contêm $a$?'),
    options: [S('$4$'), S('$8$'), S('$16$')],
    answer: 1,
    explanation: L('$a$ is fixed in; each of $b, c, d$ is in or out: $2^3 = 8$.', '$a$ queda fija dentro; cada uno de $b, c, d$ entra o no: $2^3 = 8$.', '$a$ fica fixo dentro; cada um de $b, c, d$ entra ou não: $2^3 = 8$.'),
  },
  {
    id: 'disc2-q-mc-member', type: 'multiple-choice', lessonId: 'disc2-l2-subsets',
    prompt: L('$A = \\{\\varnothing, \\{1\\}\\}$. Which statement is true?', '$A = \\{\\varnothing, \\{1\\}\\}$. ¿Qué afirmación es verdadera?', '$A = \\{\\varnothing, \\{1\\}\\}$. Qual afirmação é verdadeira?'),
    options: [S('$1 \\in A$'), S('$\\{1\\} \\subseteq A$'), S('$\\varnothing \\in A$ and $\\varnothing \\subseteq A$')],
    answer: 2,
    explanation: L('$\\varnothing$ is listed as an element, and it is a subset of every set. $1$ itself is not an element.', '$\\varnothing$ aparece como elemento, y es subconjunto de todo conjunto. El $1$ no es elemento.', '$\\varnothing$ aparece como elemento, e é subconjunto de todo conjunto. O $1$ não é elemento.'),
  },
  {
    id: 'disc2-q-matching-ops', type: 'matching', lessonId: 'disc2-l3-operations',
    prompt: L('With $A = \\{1, 2, 3, 4\\}$ and $B = \\{3, 4, 5\\}$, match each operation with its result.', 'Con $A = \\{1, 2, 3, 4\\}$ y $B = \\{3, 4, 5\\}$, une cada operación con su resultado.', 'Com $A = \\{1, 2, 3, 4\\}$ e $B = \\{3, 4, 5\\}$, ligue cada operação ao resultado.'),
    left: [S('$A \\cap B$'), S('$A - B$'), S('$A \\triangle B$'), S('$B - A$')],
    right: [S('{1, 2}'), S('{5}'), S('{3, 4}'), S('{1, 2, 5}')],
    answer: [2, 0, 3, 1],
    explanation: L('Common part $\\{3, 4\\}$; only in $A$: $\\{1, 2\\}$; only in $B$: $\\{5\\}$; exactly one: $\\{1, 2, 5\\}$.', 'Parte común $\\{3, 4\\}$; solo en $A$: $\\{1, 2\\}$; solo en $B$: $\\{5\\}$; en exactamente uno: $\\{1, 2, 5\\}$.', 'Parte comum $\\{3, 4\\}$; só em $A$: $\\{1, 2\\}$; só em $B$: $\\{5\\}$; em exatamente um: $\\{1, 2, 5\\}$.'),
  },
  {
    id: 'disc2-q-code-python', type: 'code', lessonId: 'disc2-l3-operations',
    prompt: L('What does this print (as a set)?', '¿Qué imprime (como conjunto)?', 'O que isto imprime (como conjunto)?'),
    code: 'a = {"rock", "jazz", "pop"}\nb = {"pop", "salsa"}\nprint(a - b)',
    options: [S('{"rock", "jazz"}'), S('{"salsa"}'), S('{"pop"}')],
    answer: 0,
    explanation: L('`a - b` keeps what is in `a` and not in `b`.', '`a - b` guarda lo que está en `a` y no en `b`.', '`a - b` guarda o que está em `a` e não em `b`.'),
  },
  {
    id: 'disc2-q-mc-demorgan', type: 'multiple-choice', lessonId: 'disc2-l4-laws',
    prompt: L('Which expression equals $(A \\cup B^c)^c$?', '¿Qué expresión es igual a $(A \\cup B^c)^c$?', 'Qual expressão é igual a $(A \\cup B^c)^c$?'),
    options: [S('$A^c \\cup B$'), S('$A^c \\cap B$'), S('$A \\cap B^c$')],
    answer: 1,
    explanation: L('De Morgan: $A^c \\cap (B^c)^c = A^c \\cap B = B - A$.', 'De Morgan: $A^c \\cap (B^c)^c = A^c \\cap B = B - A$.', 'De Morgan: $A^c \\cap (B^c)^c = A^c \\cap B = B - A$.'),
  },
  {
    id: 'disc2-q-sc-survey', type: 'scenario', lessonId: 'disc2-l5-partitions-counting',
    prompt: L('In a class of 40, 25 play football, 18 basketball, and 7 both. How many play neither?', 'En un curso de 40, 25 juegan fútbol, 18 básquet y 7 ambos. ¿Cuántos no juegan ninguno?', 'Numa turma de 40, 25 jogam futebol, 18 basquete e 7 os dois. Quantos não jogam nenhum?'),
    options: [S('$4$'), S('$0$'), S('$11$')],
    answer: 0,
    explanation: L('$|F \\cup B| = 25 + 18 - 7 = 36$, so $40 - 36 = 4$.', '$|F \\cup B| = 25 + 18 - 7 = 36$, así que $40 - 36 = 4$.', '$|F \\cup B| = 25 + 18 - 7 = 36$, então $40 - 36 = 4$.'),
  },
  {
    id: 'disc2-q-tf-partition', type: 'true-false', lessonId: 'disc2-l5-partitions-counting',
    prompt: L('True or false: $\\{\\{1, 2\\}, \\varnothing, \\{3\\}\\}$ is a partition of $\\{1, 2, 3\\}$.', 'Verdadero o falso: $\\{\\{1, 2\\}, \\varnothing, \\{3\\}\\}$ es una partición de $\\{1, 2, 3\\}$.', 'Verdadeiro ou falso: $\\{\\{1, 2\\}, \\varnothing, \\{3\\}\\}$ é uma partição de $\\{1, 2, 3\\}$.'),
    options: TF, answer: 1,
    explanation: L('False: blocks must be non-empty.', 'Falso: los bloques deben ser no vacíos.', 'Falso: os blocos precisam ser não vazios.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 2. */
export const discWeek2Activities: Activity[] = [
  {
    id: 'disc2-act-classify-member', kind: 'classify', lessonId: 'disc2-l2-subsets',
    title: L('Element or subset?', '¿Elemento o subconjunto?', 'Elemento ou subconjunto?'),
    prompt: L('With $A = \\{1, \\{2\\}, 3\\}$, sort each statement.', 'Con $A = \\{1, \\{2\\}, 3\\}$, clasifica cada afirmación.', 'Com $A = \\{1, \\{2\\}, 3\\}$, classifique cada afirmação.'),
    buckets: [L('True', 'Verdadera', 'Verdadeira'), L('False', 'Falsa', 'Falsa')],
    items: [
      { text: S('$1 \\in A$'), bucket: 0 },
      { text: S('$\\{1\\} \\subseteq A$'), bucket: 0 },
      { text: S('$2 \\in A$'), bucket: 1 },
      { text: S('$\\{2\\} \\in A$'), bucket: 0 },
      { text: S('$\\{2\\} \\subseteq A$'), bucket: 1 },
      { text: S('$\\{\\{2\\}, 3\\} \\subseteq A$'), bucket: 0 },
    ],
    explanation: L('$\\in$ asks "is it listed?"; $\\subseteq$ asks "is every element of it listed?".', '$\\in$ pregunta "¿está en la lista?"; $\\subseteq$ pregunta "¿están en la lista todos sus elementos?".', '$\\in$ pergunta "está na lista?"; $\\subseteq$ pergunta "todos os seus elementos estão na lista?".'),
  },
  {
    id: 'disc2-act-fill-ops', kind: 'code-fill', lessonId: 'disc2-l3-operations',
    title: L('Python set operators', 'Operadores de conjuntos en Python', 'Operadores de conjuntos em Python'),
    prompt: L('Fill in the results for `a = {1, 2, 3, 4}` and `b = {3, 4, 5}`.', 'Completa los resultados para `a = {1, 2, 3, 4}` y `b = {3, 4, 5}`.', 'Complete os resultados para `a = {1, 2, 3, 4}` e `b = {3, 4, 5}`.'),
    template: 'a & b  -> {{0}}\na - b  -> {{1}}\na ^ b  -> {{2}}\nlen(a | b) -> {3}',
    blanks: ['3, 4|3,4', '1, 2|1,2', '1, 2, 5|1,2,5', '5'],
    explanation: L('Intersection, difference, symmetric difference, and $|A \\cup B| = 4 + 3 - 2 = 5$.', 'Intersección, diferencia, diferencia simétrica y $|A \\cup B| = 4 + 3 - 2 = 5$.', 'Interseção, diferença, diferença simétrica e $|A \\cup B| = 4 + 3 - 2 = 5$.'),
  },
  {
    id: 'disc2-act-order-survey', kind: 'order', lessonId: 'disc2-l5-partitions-counting',
    title: L('Fill a three-set Venn diagram', 'Llena un Venn de tres conjuntos', 'Preencha um Venn de três conjuntos'),
    prompt: L('Put the steps in order.', 'Ordena los pasos.', 'Ordene os passos.'),
    items: [
      L('Write the triple intersection in the centre', 'Escribir la intersección triple en el centro', 'Escrever a interseção tripla no centro'),
      L('Subtract it from each pair to get the "pair only" regions', 'Restarla de cada pareja para obtener las regiones "solo pareja"', 'Subtraí-la de cada par para obter as regiões "só par"'),
      L('Subtract the pair regions and the centre from each set', 'Restar a cada conjunto sus regiones de pareja y el centro', 'Subtrair de cada conjunto suas regiões de par e o centro'),
      L('Add all seven regions to get the union', 'Sumar las siete regiones para obtener la unión', 'Somar as sete regiões para obter a união'),
      L('Subtract the union from $|U|$ to get "none"', 'Restar la unión de $|U|$ para obtener "ninguno"', 'Subtrair a união de $|U|$ para obter "nenhum"'),
    ],
    explanation: L('Working from the centre out avoids counting anyone twice.', 'Trabajar desde el centro hacia afuera evita contar dos veces a alguien.', 'Trabalhar do centro para fora evita contar alguém duas vezes.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 2, with worked answers. */
export const discWeek2Labs: Lab[] = [
  {
    id: 'disc2-lab-1-sets', kind: 'math', level: 1, minutes: 45,
    title: L('Sets, membership, power sets, and operations', 'Conjuntos, pertenencia, conjunto potencia y operaciones', 'Conjuntos, pertinência, conjunto das partes e operações'),
    goal: L('Write sets both ways, decide membership and inclusion, and compute every operation.', 'Escribir conjuntos de las dos formas, decidir pertenencia e inclusión y calcular cada operación.', 'Escrever conjuntos das duas formas, decidir pertinência e inclusão e calcular cada operação.'),
    steps: [
      { id: 'disc2-lab1-s1', title: L('Both notations', 'Las dos notaciones', 'As duas notações'), commands: ['$\\{x \\in \\mathbb{N} \\mid x^2 < 30\\}$ (with $0 \\notin \\mathbb{N}$)', '$\\{5, 10, 15, 20, 25\\}$ by comprehension'],
        expected: S('$\\{1, 2, 3, 4, 5\\}$; $\\{5k \\mid k \\in \\mathbb{Z},\\ 1 \\le k \\le 5\\}$.') },
      { id: 'disc2-lab1-s2', title: L('Membership and inclusion', 'Pertenencia e inclusión', 'Pertinência e inclusão'), commands: ['$B = \\{a, \\{b\\}, \\{a, c\\}\\}$: $\\ a \\in B$? $\\{b\\} \\subseteq B$? $\\{a\\} \\subseteq B$? $|\\mathcal{P}(B)|$?'],
        expected: L('Yes; no ($b \\notin B$); yes; $2^3 = 8$.', 'Sí; no ($b \\notin B$); sí; $2^3 = 8$.', 'Sim; não ($b \\notin B$); sim; $2^3 = 8$.') },
      { id: 'disc2-lab1-s3', title: L('Operations in a universe', 'Operaciones en un universo', 'Operações num universo'), commands: ['$U = \\{1, \\dots, 10\\}$, $A = \\{1, 2, 3, 4, 5\\}$, $B = \\{4, 5, 6, 7\\}$, $C = \\{2, 4, 8, 10\\}$', '$A \\cup C$, $B^c$, $(A \\triangle B) - C$, $A^c \\cap (B \\cup C)$'],
        expected: S('$\\{1, 2, 3, 4, 5, 8, 10\\}$; $\\{1, 2, 3, 8, 9, 10\\}$; $\\{1, 2, 3, 6, 7\\} - C = \\{1, 3, 6, 7\\}$; $\\{6, \\dots, 10\\} \\cap \\{2, 4, 5, 6, 7, 8, 10\\} = \\{6, 7, 8, 10\\}$.') },
      { id: 'disc2-lab1-s4', title: L('Families', 'Familias', 'Famílias'), commands: ['$F = \\{\\{a, b, c, d\\}, \\{b, c, e\\}, \\{c, d, e\\}\\}$: $\\bigcup F$, $\\bigcap F$'],
        expected: S('$\\{a, b, c, d, e\\}$; $\\{c\\}$.') },
      { id: 'disc2-lab1-s5', title: L('Python check', 'Comprobación en Python', 'Conferência em Python'), commands: ['`A = {1,2,3,4,5}; B = {4,5,6,7}; print(A ^ B, A & B, B <= A)`'],
        expected: L('`{1, 2, 3, 6, 7} {4, 5} False` (the printed order of elements may vary).', '`{1, 2, 3, 6, 7} {4, 5} False` (el orden impreso de los elementos puede variar).', '`{1, 2, 3, 6, 7} {4, 5} False` (a ordem impressa dos elementos pode variar).') },
    ],
  },
  {
    id: 'disc2-lab-2-venn', kind: 'math', level: 2, minutes: 50,
    title: L('Venn diagrams, identities, partitions, and surveys', 'Venn, identidades, particiones y encuestas', 'Venn, identidades, partições e pesquisas'),
    goal: L('Shade regions, prove or refute identities, check partitions, and solve a survey.', 'Sombrear regiones, probar o refutar identidades, revisar particiones y resolver una encuesta.', 'Sombrear regiões, provar ou refutar identidades, conferir partições e resolver uma pesquisa.'),
    steps: [
      { id: 'disc2-lab2-s1', title: L('Shade with region numbers', 'Sombrea con números de región', 'Sombreie com números de região'), commands: ['$C - (A \\cup B)$', '$(A \\cap C) \\cup (B \\cap C)$', '$A^c \\cap (B \\triangle C)$'],
        expected: S('R3; R5, R6, R7; R2, R3.') },
      { id: 'disc2-lab2-s2', title: L('Draw a configuration', 'Dibuja una configuración', 'Desenhe uma configuração'), commands: ['Non-empty $A, B, C$ with $B \\subseteq A$, $C \\cap A \\neq \\varnothing$, $C \\not\\subseteq A$, $B \\cap C = \\varnothing$'],
        expected: L('Draw $B$ inside $A$; draw $C$ crossing the edge of $A$ but away from $B$. Example: $A = \\{1, 2, 3\\}$, $B = \\{1\\}$, $C = \\{3, 4\\}$.', 'Dibuja $B$ dentro de $A$; dibuja $C$ cruzando el borde de $A$ pero lejos de $B$. Ejemplo: $A = \\{1, 2, 3\\}$, $B = \\{1\\}$, $C = \\{3, 4\\}$.', 'Desenhe $B$ dentro de $A$; desenhe $C$ cruzando a borda de $A$ mas longe de $B$. Exemplo: $A = \\{1, 2, 3\\}$, $B = \\{1\\}$, $C = \\{3, 4\\}$.') },
      { id: 'disc2-lab2-s3', title: L('Prove an identity', 'Demuestra una identidad', 'Prove uma identidade'), commands: ['$A - (B \\cup C) = (A - B) \\cap (A - C)$'],
        expected: L('$A \\cap (B \\cup C)^c = A \\cap B^c \\cap C^c = (A \\cap B^c) \\cap (A \\cap C^c)$ by De Morgan and idempotence. ∎', '$A \\cap (B \\cup C)^c = A \\cap B^c \\cap C^c = (A \\cap B^c) \\cap (A \\cap C^c)$ por De Morgan e idempotencia. ∎', '$A \\cap (B \\cup C)^c = A \\cap B^c \\cap C^c = (A \\cap B^c) \\cap (A \\cap C^c)$ por De Morgan e idempotência. ∎') },
      { id: 'disc2-lab2-s4', title: L('Is it a partition?', '¿Es una partición?', 'É uma partição?'), commands: ['$\\{1, \\dots, 9\\}$ split as $\\{\\{1, 4, 7\\}, \\{2, 5, 8\\}, \\{3, 6, 9\\}\\}$ (remainder mod 3)'],
        expected: L('Yes: non-empty, disjoint, and the union is all nine numbers.', 'Sí: no vacíos, disjuntos y la unión son los nueve números.', 'Sim: não vazios, disjuntos e a união são os nove números.') },
      { id: 'disc2-lab2-s5', title: L('A language survey', 'Una encuesta de idiomas', 'Uma pesquisa de idiomas'), commands: ['100 people: 40 English, 35 French, 30 Italian; 15 E and F, 12 E and I, 10 F and I; 5 all three'],
        expected: L('Union $= 105 - 37 + 5 = 73$, none $= 27$. Only English $= 40 - 10 - 7 - 5 = 18$; only French $= 35 - 10 - 5 - 5 = 15$; only Italian $= 30 - 7 - 5 - 5 = 13$.', 'Unión $= 105 - 37 + 5 = 73$, ninguno $= 27$. Solo inglés $= 40 - 10 - 7 - 5 = 18$; solo francés $= 35 - 10 - 5 - 5 = 15$; solo italiano $= 30 - 7 - 5 - 5 = 13$.', 'União $= 105 - 37 + 5 = 73$, nenhum $= 27$. Só inglês $= 40 - 10 - 7 - 5 = 18$; só francês $= 35 - 10 - 5 - 5 = 15$; só italiano $= 30 - 7 - 5 - 5 = 13$.') },
    ],
  },
];
