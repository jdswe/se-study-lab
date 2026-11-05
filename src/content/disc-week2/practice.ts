import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 2. */
export const discWeek2Flashcards: Flashcard[] = [
  { id: 'disc2-fc-1', lessonId: 'disc2-l1-sets', kind: 'concept',
    front: L('What makes a collection a set?', '¿Qué hace que una colección sea un conjunto?', 'O que faz uma coleção ser um conjunto?'),
    back: L('It is well defined: for every object x you can decide whether x ∈ A or x ∉ A.', 'Está bien definida: para todo objeto x se puede decidir si x ∈ A o x ∉ A.', 'É bem definida: para todo objeto x dá para decidir se x ∈ A ou x ∉ A.') },
  { id: 'disc2-fc-2', lessonId: 'disc2-l1-sets', kind: 'distinction',
    front: L('Roster form vs set-builder form', 'Extensión vs comprensión', 'Extensão vs compreensão'),
    back: L('Roster lists every element: {a, e, i, o, u}. Set-builder gives a rule: {x ∈ ℤ | x is even}.', 'La extensión lista todos los elementos: {a, e, i, o, u}. La comprensión da una regla: {x ∈ ℤ | x es par}.', 'A extensão lista todos os elementos: {a, e, i, o, u}. A compreensão dá uma regra: {x ∈ ℤ | x é par}.') },
  { id: 'disc2-fc-3', lessonId: 'disc2-l1-sets', kind: 'concept',
    front: L('|∅|, |{∅}|, |{0}|', '|∅|, |{∅}|, |{0}|', '|∅|, |{∅}|, |{0}|'),
    back: L('0, 1, and 1. The empty set has no elements; the other two are singletons.', '0, 1 y 1. El vacío no tiene elementos; los otros dos son unitarios.', '0, 1 e 1. O vazio não tem elementos; os outros dois são unitários.') },
  { id: 'disc2-fc-4', lessonId: 'disc2-l2-subsets', kind: 'concept',
    front: L('A ⊆ B means…', 'A ⊆ B significa…', 'A ⊆ B significa…'),
    back: L('Every element of A is an element of B. Equality needs both A ⊆ B and B ⊆ A.', 'Todo elemento de A es elemento de B. La igualdad necesita A ⊆ B y B ⊆ A.', 'Todo elemento de A é elemento de B. A igualdade precisa de A ⊆ B e B ⊆ A.') },
  { id: 'disc2-fc-5', lessonId: 'disc2-l2-subsets', kind: 'concept',
    front: L('How many subsets does an n-element set have?', '¿Cuántos subconjuntos tiene un conjunto de n elementos?', 'Quantos subconjuntos tem um conjunto de n elementos?'),
    back: L('2ⁿ, since each element is either in or out. P(A) includes ∅ and A.', '2ⁿ, porque cada elemento está dentro o fuera. P(A) incluye ∅ y A.', '2ⁿ, pois cada elemento está dentro ou fora. P(A) inclui ∅ e A.') },
  { id: 'disc2-fc-6', lessonId: 'disc2-l3-operations', kind: 'concept',
    front: L('∪, ∩, −, △ in words', '∪, ∩, −, △ en palabras', '∪, ∩, −, △ em palavras'),
    back: L('or · and · in the first but not the second · in exactly one of the two.', 'o · y · en el primero pero no en el segundo · en exactamente uno de los dos.', 'ou · e · no primeiro mas não no segundo · em exatamente um dos dois.') },
  { id: 'disc2-fc-7', lessonId: 'disc2-l3-operations', kind: 'distinction',
    front: L('A − B vs B − A', 'A − B vs B − A', 'A − B vs B − A'),
    back: L('Different in general: A = {1, 2}, B = {2, 3} gives A − B = {1} and B − A = {3}.', 'En general son distintos: A = {1, 2}, B = {2, 3} da A − B = {1} y B − A = {3}.', 'Em geral são diferentes: A = {1, 2}, B = {2, 3} dá A − B = {1} e B − A = {3}.') },
  { id: 'disc2-fc-8', lessonId: 'disc2-l4-laws', kind: 'concept',
    front: L('De Morgan for sets', 'De Morgan para conjuntos', 'De Morgan para conjuntos'),
    back: L('(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ and (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ. The complement swaps ∪ and ∩.', '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ y (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ. El complemento intercambia ∪ y ∩.', '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ e (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ. O complemento troca ∪ e ∩.') },
  { id: 'disc2-fc-9', lessonId: 'disc2-l4-laws', kind: 'command',
    front: L('Rewrite a difference as an intersection', 'Reescribe una diferencia como intersección', 'Reescreva uma diferença como interseção'),
    back: L('A − B = A ∩ Bᶜ.', 'A − B = A ∩ Bᶜ.', 'A − B = A ∩ Bᶜ.') },
  { id: 'disc2-fc-10', lessonId: 'disc2-l5-partitions-counting', kind: 'concept',
    front: L('What three conditions define a partition?', '¿Qué tres condiciones definen una partición?', 'Que três condições definem uma partição?'),
    back: L('Non-empty blocks, pairwise disjoint, and their union is the whole set.', 'Bloques no vacíos, disjuntos dos a dos y cuya unión es todo el conjunto.', 'Blocos não vazios, disjuntos dois a dois e cuja união é o conjunto todo.') },
  { id: 'disc2-fc-11', lessonId: 'disc2-l5-partitions-counting', kind: 'command',
    front: L('|A ∪ B| and |A ∪ B ∪ C|', '|A ∪ B| y |A ∪ B ∪ C|', '|A ∪ B| e |A ∪ B ∪ C|'),
    back: L('|A| + |B| − |A ∩ B|; add singles, subtract pairs, add the triple.', '|A| + |B| − |A ∩ B|; suma individuales, resta parejas, suma el trío.', '|A| + |B| − |A ∩ B|; some individuais, subtraia pares, some o trio.') },
  { id: 'disc2-fc-12', lessonId: 'disc2-l5-partitions-counting', kind: 'command',
    front: L('Fill a three-set Venn diagram: which number goes first?', 'Llenar un Venn de tres conjuntos: ¿qué número va primero?', 'Preencher um Venn de três conjuntos: que número vai primeiro?'),
    back: L('The centre |A ∩ B ∩ C|, then the pair-only regions, then the single-only regions, then "none".', 'El centro |A ∩ B ∩ C|, luego las regiones de solo parejas, luego las de solo uno y al final "ninguno".', 'O centro |A ∩ B ∩ C|, depois as regiões só de pares, depois as só de um e por fim "nenhum".') },
];

/** Quiz for Discrete Mathematics, Week 2. */
export const discWeek2Questions: Question[] = [
  {
    id: 'disc2-q-fill-card', type: 'fill-blank', lessonId: 'disc2-l1-sets',
    prompt: L('The distinct letters of "mississippi" form a set of cardinality ___.', 'Las letras distintas de "mississippi" forman un conjunto de cardinalidad ___.', 'As letras distintas de "mississippi" formam um conjunto de cardinalidade ___.'),
    accepted: ['4'],
    explanation: L('The letters are {m, i, s, p}: four distinct elements, even though the word has eleven letters.', 'Las letras son {m, i, s, p}: cuatro elementos distintos, aunque la palabra tiene once letras.', 'As letras são {m, i, s, p}: quatro elementos distintos, embora a palavra tenha onze letras.'),
  },
  {
    id: 'disc2-q-mc-empty', type: 'multiple-choice', lessonId: 'disc2-l1-sets',
    prompt: L('Which statement is true?', '¿Qué afirmación es verdadera?', 'Qual afirmação é verdadeira?'),
    options: [S('∅ ∈ {∅}'), S('∅ = {∅}'), S('{∅} = { }')],
    answer: 0,
    explanation: L('{∅} is a singleton whose only element is ∅. It is not empty, so it is not equal to ∅.', '{∅} es un conjunto unitario cuyo único elemento es ∅. No es vacío, así que no es igual a ∅.', '{∅} é um conjunto unitário cujo único elemento é ∅. Não é vazio, então não é igual a ∅.'),
    whyWrong: [L('Correct: the empty set is listed as an element.', 'Correcto: el conjunto vacío aparece como elemento.', 'Correto: o conjunto vazio aparece como elemento.'), L('They have different cardinalities: 0 and 1.', 'Tienen cardinalidades distintas: 0 y 1.', 'Têm cardinalidades diferentes: 0 e 1.'), L('{∅} has one element; { } has none.', '{∅} tiene un elemento; { } no tiene ninguno.', '{∅} tem um elemento; { } não tem nenhum.')],
  },
  {
    id: 'disc2-q-tf-subset', type: 'true-false', lessonId: 'disc2-l2-subsets',
    prompt: L('True or false: if A ⊆ B and B ⊆ C, then A ⊆ C.', 'Verdadero o falso: si A ⊆ B y B ⊆ C, entonces A ⊆ C.', 'Verdadeiro ou falso: se A ⊆ B e B ⊆ C, então A ⊆ C.'),
    options: TF, answer: 0,
    explanation: L('True. Any x ∈ A is in B, and any element of B is in C, so x ∈ C. Subset inclusion is transitive.', 'Verdadero. Todo x ∈ A está en B, y todo elemento de B está en C, así que x ∈ C. La inclusión es transitiva.', 'Verdadeiro. Todo x ∈ A está em B, e todo elemento de B está em C, então x ∈ C. A inclusão é transitiva.'),
  },
  {
    id: 'disc2-q-mc-power', type: 'multiple-choice', lessonId: 'disc2-l2-subsets',
    prompt: L('A set has 64 subsets. How many elements does it have?', 'Un conjunto tiene 64 subconjuntos. ¿Cuántos elementos tiene?', 'Um conjunto tem 64 subconjuntos. Quantos elementos tem?'),
    options: [S('6'), S('8'), S('64')],
    answer: 0,
    explanation: L('|P(A)| = 2ⁿ, and 2⁶ = 64, so |A| = 6.', '|P(A)| = 2ⁿ y 2⁶ = 64, así que |A| = 6.', '|P(A)| = 2ⁿ e 2⁶ = 64, então |A| = 6.'),
  },
  {
    id: 'disc2-q-fill-symdiff', type: 'fill-blank', lessonId: 'disc2-l3-operations',
    prompt: L('A = {1, 2, 3, 4}, B = {3, 4, 5}. A △ B = ___', 'A = {1, 2, 3, 4}, B = {3, 4, 5}. A △ B = ___', 'A = {1, 2, 3, 4}, B = {3, 4, 5}. A △ B = ___'),
    accepted: ['{1,2,5}', '{1, 2, 5}', '1,2,5'],
    explanation: L('Remove the shared elements 3 and 4: only 1, 2, and 5 remain.', 'Quita los elementos compartidos 3 y 4: solo quedan 1, 2 y 5.', 'Remova os elementos compartilhados 3 e 4: sobram apenas 1, 2 e 5.'),
  },
  {
    id: 'disc2-q-matching-ops', type: 'matching', lessonId: 'disc2-l3-operations',
    prompt: L('Match each expression with the elements it keeps.', 'Une cada expresión con los elementos que conserva.', 'Ligue cada expressão aos elementos que ela mantém.'),
    left: [S('A ∪ B'), S('A ∩ B'), S('A − B'), S('A △ B')],
    right: [L('in A and in B', 'en A y en B', 'em A e em B'), L('in A or in B or both', 'en A o en B o en ambos', 'em A ou em B ou nos dois'), L('in exactly one of A and B', 'en exactamente uno de A y B', 'em exatamente um de A e B'), L('in A but not in B', 'en A pero no en B', 'em A mas não em B')],
    answer: [1, 0, 3, 2],
    explanation: L('Union is inclusive or, intersection is and, difference removes B, and symmetric difference keeps exactly one side.', 'La unión es el "o" inclusivo, la intersección es "y", la diferencia quita B y la diferencia simétrica conserva exactamente un lado.', 'A união é o "ou" inclusivo, a interseção é "e", a diferença remove B e a diferença simétrica mantém exatamente um lado.'),
  },
  {
    id: 'disc2-q-mc-demorgan', type: 'multiple-choice', lessonId: 'disc2-l4-laws',
    prompt: L('Which set equals (A ∪ B)ᶜ?', '¿Qué conjunto es igual a (A ∪ B)ᶜ?', 'Qual conjunto é igual a (A ∪ B)ᶜ?'),
    options: [L('Aᶜ ∪ Bᶜ', 'Aᶜ ∪ Bᶜ', 'Aᶜ ∪ Bᶜ'), L('Aᶜ ∩ Bᶜ', 'Aᶜ ∩ Bᶜ', 'Aᶜ ∩ Bᶜ'), L('A ∩ B', 'A ∩ B', 'A ∩ B')],
    answer: 1,
    explanation: L('De Morgan: not being in A or B means being outside both, so x ∈ Aᶜ and x ∈ Bᶜ.', 'De Morgan: no estar en A o B significa estar fuera de ambos, así que x ∈ Aᶜ y x ∈ Bᶜ.', 'De Morgan: não estar em A ou B significa estar fora dos dois, então x ∈ Aᶜ e x ∈ Bᶜ.'),
    whyWrong: [L('That is the complement of A ∩ B.', 'Ese es el complemento de A ∩ B.', 'Esse é o complemento de A ∩ B.'), L('Correct.', 'Correcto.', 'Correto.'), L('That is the intersection, not its complement.', 'Esa es la intersección, no su complemento.', 'Essa é a interseção, não o complemento.')],
  },
  {
    id: 'disc2-q-troubleshoot-law', type: 'troubleshooting', lessonId: 'disc2-l4-laws',
    prompt: L('A student simplifies (A ∪ B) ∩ (A ∪ Bᶜ) as follows. Where is the error?', 'Un estudiante simplifica (A ∪ B) ∩ (A ∪ Bᶜ) así. ¿Dónde está el error?', 'Um estudante simplifica (A ∪ B) ∩ (A ∪ Bᶜ) assim. Onde está o erro?'),
    code: '(A ∪ B) ∩ (A ∪ Bᶜ)\n= A ∪ (B ∩ Bᶜ)      distributive\n= A ∪ ∅              complement\n= A                  identity',
    options: [
      L('Nothing is wrong.', 'No hay nada mal.', 'Não há nada errado.'),
      L('The distributive step should give A ∩ (B ∪ Bᶜ).', 'El paso distributivo debería dar A ∩ (B ∪ Bᶜ).', 'O passo distributivo deveria dar A ∩ (B ∪ Bᶜ).'),
      L('B ∩ Bᶜ should be U, not ∅.', 'B ∩ Bᶜ debería ser U, no ∅.', 'B ∩ Bᶜ deveria ser U, não ∅.'),
    ],
    answer: 0,
    explanation: L('The work is correct: factor out A, then use B ∩ Bᶜ = ∅. The result is A.', 'El trabajo es correcto: se saca factor A y luego se usa B ∩ Bᶜ = ∅. El resultado es A.', 'O trabalho está correto: coloca-se A em evidência e depois se usa B ∩ Bᶜ = ∅. O resultado é A.'),
  },
  {
    id: 'disc2-q-fill-union', type: 'fill-blank', lessonId: 'disc2-l5-partitions-counting',
    prompt: L('Of 50 students, 30 study French, 25 study German, and 12 study both. How many study at least one? ___', 'De 50 estudiantes, 30 estudian francés, 25 alemán y 12 ambos. ¿Cuántos estudian al menos uno? ___', 'De 50 estudantes, 30 estudam francês, 25 alemão e 12 ambos. Quantos estudam pelo menos um? ___'),
    accepted: ['43'],
    explanation: L('|F ∪ G| = 30 + 25 − 12 = 43. The other 7 study neither.', '|F ∪ G| = 30 + 25 − 12 = 43. Los otros 7 no estudian ninguno.', '|F ∪ G| = 30 + 25 − 12 = 43. Os outros 7 não estudam nenhum.'),
  },
  {
    id: 'disc2-q-scenario-partition', type: 'scenario', lessonId: 'disc2-l5-partitions-counting',
    prompt: L('A team sorts 100 tickets into the lists "open", "in progress", and "closed", and every ticket appears in exactly one list. What have they built?', 'Un equipo clasifica 100 tickets en las listas "abierto", "en curso" y "cerrado", y cada ticket aparece en exactamente una lista. ¿Qué han construido?', 'Uma equipe classifica 100 tickets nas listas "aberto", "em andamento" e "fechado", e cada ticket aparece em exatamente uma lista. O que eles construíram?'),
    options: [L('A partition of the tickets', 'Una partición de los tickets', 'Uma partição dos tickets'), L('A power set of the tickets', 'El conjunto potencia de los tickets', 'O conjunto das partes dos tickets'), L('The complement of the tickets', 'El complemento de los tickets', 'O complemento dos tickets')],
    answer: 0,
    explanation: L('The lists are non-empty, disjoint, and cover all tickets: a partition into three blocks.', 'Las listas no están vacías, son disjuntas y cubren todos los tickets: una partición en tres bloques.', 'As listas não são vazias, são disjuntas e cobrem todos os tickets: uma partição em três blocos.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 2. */
export const discWeek2Activities: Activity[] = [
  {
    id: 'disc2-act-order-venn', kind: 'order', lessonId: 'disc2-l5-partitions-counting',
    title: L('Fill a Venn diagram from the centre out', 'Llena un Venn desde el centro hacia fuera', 'Preencha um Venn do centro para fora'),
    prompt: L('Put the steps for a three-set survey in the right order.', 'Ordena los pasos de una encuesta de tres conjuntos.', 'Coloque em ordem os passos de uma pesquisa de três conjuntos.'),
    items: [
      L('Write the number in all three sets in the centre', 'Escribe en el centro el número de los tres conjuntos', 'Escreva no centro o número dos três conjuntos'),
      L('Subtract the centre from each given pair to get pair-only regions', 'Resta el centro a cada pareja dada para obtener las regiones de solo pareja', 'Subtraia o centro de cada par dado para obter as regiões só de par'),
      L('Subtract the pair regions and centre from each single total', 'Resta las regiones de pareja y el centro a cada total individual', 'Subtraia as regiões de par e o centro de cada total individual'),
      L('Add the seven regions to check the union', 'Suma las siete regiones para comprobar la unión', 'Some as sete regiões para conferir a união'),
      L('Subtract the union from the universe to get "none"', 'Resta la unión al universo para obtener "ninguno"', 'Subtraia a união do universo para obter "nenhum"'),
    ],
    explanation: L('The centre is the only region every pair count contains, so it must be handled first.', 'El centro es la única región que todas las cuentas de pareja contienen, así que debe resolverse primero.', 'O centro é a única região que toda contagem de par contém, então precisa ser resolvido primeiro.'),
  },
  {
    id: 'disc2-act-fill-python', kind: 'code-fill', lessonId: 'disc2-l3-operations',
    title: L('Set operations in Python', 'Operaciones de conjuntos en Python', 'Operações de conjuntos em Python'),
    prompt: L('Complete the expressions: exactly one day, both days, and only yesterday.', 'Completa las expresiones: exactamente un día, ambos días y solo ayer.', 'Complete as expressões: exatamente um dia, ambos os dias e só ontem.'),
    template: 'yesterday = {"u1", "u2", "u3", "u5"}\ntoday = {"u2", "u4", "u5", "u6"}\nexactly_one = yesterday {0} today\nboth = yesterday {1} today\nonly_yesterday = yesterday {2} today',
    blanks: ['^', '&', '-'],
    explanation: L('^ is symmetric difference, & is intersection, and - is difference.', '^ es la diferencia simétrica, & la intersección y - la diferencia.', '^ é a diferença simétrica, & a interseção e - a diferença.'),
  },
  {
    id: 'disc2-act-scramble-power', kind: 'scramble', lessonId: 'disc2-l2-subsets',
    title: L('Build a subset check', 'Construye una comprobación de subconjunto', 'Monte uma verificação de subconjunto'),
    prompt: L('Rebuild the Python expression that decides whether A is a subset of B.', 'Reconstruye la expresión de Python que decide si A es subconjunto de B.', 'Reconstrua a expressão Python que decide se A é subconjunto de B.'),
    tokens: ['A', '<=', 'B'],
    explanation: L('In Python, a <= b tests a ⊆ b.', 'En Python, a <= b comprueba a ⊆ b.', 'Em Python, a <= b testa a ⊆ b.'),
  },
  {
    id: 'disc2-act-classify-law', kind: 'classify', lessonId: 'disc2-l4-laws',
    title: L('Name the law', 'Nombra la ley', 'Nomeie a lei'),
    prompt: L('Sort each identity by the law that justifies it.', 'Clasifica cada identidad según la ley que la justifica.', 'Classifique cada identidade pela lei que a justifica.'),
    buckets: [L('De Morgan', 'De Morgan', 'De Morgan'), L('Distributive', 'Distributiva', 'Distributiva'), L('Complement', 'Complemento', 'Complemento')],
    items: [
      { text: S('(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ'), bucket: 0 },
      { text: S('A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)'), bucket: 1 },
      { text: S('A ∪ Aᶜ = U'), bucket: 2 },
      { text: S('(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ'), bucket: 0 },
      { text: S('A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)'), bucket: 1 },
      { text: S('A ∩ Aᶜ = ∅'), bucket: 2 },
    ],
    explanation: L('De Morgan swaps ∪ and ∩ under a complement; distributive factors; complement laws use A and Aᶜ together.', 'De Morgan intercambia ∪ y ∩ bajo un complemento; la distributiva factoriza; las leyes de complemento usan A y Aᶜ juntos.', 'De Morgan troca ∪ e ∩ sob um complemento; a distributiva fatora; as leis de complemento usam A e Aᶜ juntos.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 2, with worked answers. */
export const discWeek2Labs: Lab[] = [
  {
    id: 'disc2-lab-1-operations', kind: 'math', level: 1, minutes: 40,
    title: L('Set algebra by hand', 'Álgebra de conjuntos a mano', 'Álgebra de conjuntos à mão'),
    goal: L('Compute unions, intersections, differences, and complements, then check a law with a membership table.', 'Calcular uniones, intersecciones, diferencias y complementos, y comprobar una ley con una tabla de pertenencia.', 'Calcular uniões, interseções, diferenças e complementos, e conferir uma lei com uma tabela de pertinência.'),
    steps: [
      { id: 'disc2-lab1-s1', title: L('Basic operations', 'Operaciones básicas', 'Operações básicas'), commands: ['U = {1,...,12}, A = {2,4,6,8,10}, B = {3,6,9,12}'],
        expected: L('A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}; A ∩ B = {6}; A − B = {2, 4, 8, 10}; A △ B = {2, 3, 4, 8, 9, 10, 12}; (A ∪ B)ᶜ = {1, 5, 7, 11}.', 'A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}; A ∩ B = {6}; A − B = {2, 4, 8, 10}; A △ B = {2, 3, 4, 8, 9, 10, 12}; (A ∪ B)ᶜ = {1, 5, 7, 11}.', 'A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}; A ∩ B = {6}; A − B = {2, 4, 8, 10}; A △ B = {2, 3, 4, 8, 9, 10, 12}; (A ∪ B)ᶜ = {1, 5, 7, 11}.') },
      { id: 'disc2-lab1-s2', title: L('Power set size', 'Tamaño del conjunto potencia', 'Tamanho do conjunto das partes'), commands: ['|P({a,b,c,d,e})|'],
        expected: L('2⁵ = 32 subsets, including ∅ and the whole set.', '2⁵ = 32 subconjuntos, incluidos ∅ y el conjunto completo.', '2⁵ = 32 subconjuntos, incluindo ∅ e o conjunto completo.') },
      { id: 'disc2-lab1-s3', title: L('Membership table', 'Tabla de pertenencia', 'Tabela de pertinência'), commands: ['Show A − (B ∪ C) = (A − B) ∩ (A − C)'],
        expected: L('Both sides are in A and outside B and outside C. In words: x ∈ A and x ∉ B ∪ C ⇔ x ∈ A, x ∉ B, and x ∉ C.', 'Ambos lados están en A y fuera de B y de C. En palabras: x ∈ A y x ∉ B ∪ C ⇔ x ∈ A, x ∉ B y x ∉ C.', 'Ambos os lados estão em A e fora de B e de C. Em palavras: x ∈ A e x ∉ B ∪ C ⇔ x ∈ A, x ∉ B e x ∉ C.') },
      { id: 'disc2-lab1-s4', title: L('Simplify', 'Simplifica', 'Simplifique'), commands: ['(A ∪ B) ∩ (A ∪ Bᶜ)', '(A ∩ B) ∪ (A ∩ Bᶜ)'],
        expected: L('A ∪ (B ∩ Bᶜ) = A ∪ ∅ = A. A ∩ (B ∪ Bᶜ) = A ∩ U = A.', 'A ∪ (B ∩ Bᶜ) = A ∪ ∅ = A. A ∩ (B ∪ Bᶜ) = A ∩ U = A.', 'A ∪ (B ∩ Bᶜ) = A ∪ ∅ = A. A ∩ (B ∪ Bᶜ) = A ∩ U = A.') },
    ],
  },
  {
    id: 'disc2-lab-2-survey', kind: 'math', level: 2, minutes: 45,
    title: L('A three-set survey and a partition count', 'Una encuesta de tres conjuntos y un conteo de particiones', 'Uma pesquisa de três conjuntos e uma contagem de partições'),
    goal: L('Fill a three-set Venn diagram, use inclusion–exclusion, and count partitions by block shape.', 'Llenar un diagrama de Venn de tres conjuntos, usar inclusión–exclusión y contar particiones por forma de bloque.', 'Preencher um diagrama de Venn de três conjuntos, usar inclusão–exclusão e contar partições por formato de bloco.'),
    steps: [
      { id: 'disc2-lab2-s1', title: L('The union', 'La unión', 'A união'), commands: ['|A|=40, |B|=35, |C|=30; |A∩B|=15, |A∩C|=12, |B∩C|=10; |A∩B∩C|=5'],
        expected: L('|A ∪ B ∪ C| = 40 + 35 + 30 − 15 − 12 − 10 + 5 = 73.', '|A ∪ B ∪ C| = 40 + 35 + 30 − 15 − 12 − 10 + 5 = 73.', '|A ∪ B ∪ C| = 40 + 35 + 30 − 15 − 12 − 10 + 5 = 73.') },
      { id: 'disc2-lab2-s2', title: L('The regions', 'Las regiones', 'As regiões'), commands: ['Centre, pair-only, single-only'],
        expected: L('Centre 5; A∩B only 10; A∩C only 7; B∩C only 5; A only 40 − 10 − 7 − 5 = 18; B only 35 − 10 − 5 − 5 = 15; C only 30 − 7 − 5 − 5 = 13. Check: 18 + 15 + 13 + 10 + 7 + 5 + 5 = 73.', 'Centro 5; solo A∩B 10; solo A∩C 7; solo B∩C 5; solo A 40 − 10 − 7 − 5 = 18; solo B 35 − 10 − 5 − 5 = 15; solo C 30 − 7 − 5 − 5 = 13. Comprobación: 18 + 15 + 13 + 10 + 7 + 5 + 5 = 73.', 'Centro 5; só A∩B 10; só A∩C 7; só B∩C 5; só A 40 − 10 − 7 − 5 = 18; só B 35 − 10 − 5 − 5 = 15; só C 30 − 7 − 5 − 5 = 13. Conferência: 18 + 15 + 13 + 10 + 7 + 5 + 5 = 73.') },
      { id: 'disc2-lab2-s3', title: L('None', 'Ninguno', 'Nenhum'), commands: ['|U| = 100'],
        expected: L('100 − 73 = 27 elements are in none of the three sets.', '100 − 73 = 27 elementos no están en ninguno de los tres conjuntos.', '100 − 73 = 27 elementos não estão em nenhum dos três conjuntos.') },
      { id: 'disc2-lab2-s4', title: L('Partitions of four', 'Particiones de cuatro', 'Partições de quatro'), commands: ['List by block shapes: 4, 3+1, 2+2, 2+1+1, 1+1+1+1'],
        expected: L('1 + 4 + 3 + 6 + 1 = 15 partitions of a 4-element set.', '1 + 4 + 3 + 6 + 1 = 15 particiones de un conjunto de 4 elementos.', '1 + 4 + 3 + 6 + 1 = 15 partições de um conjunto de 4 elementos.') },
    ],
  },
];
