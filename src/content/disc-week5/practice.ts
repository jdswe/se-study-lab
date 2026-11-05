import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 5. */
export const discWeek5Flashcards: Flashcard[] = [
  { id: 'disc5-fc-1', lessonId: 'disc5-l1-rules', kind: 'distinction',
    front: L('Sum rule vs product rule', 'Regla de la suma vs regla del producto', 'Regra da soma vs regra do produto'),
    back: L('Sum: disjoint alternatives, |A ∪ B| = |A| + |B|. Product: sequential stages, |A × B| = |A|·|B|.', 'Suma: alternativas disjuntas, |A ∪ B| = |A| + |B|. Producto: etapas secuenciales, |A × B| = |A|·|B|.', 'Soma: alternativas disjuntas, |A ∪ B| = |A| + |B|. Produto: etapas sequenciais, |A × B| = |A|·|B|.') },
  { id: 'disc5-fc-2', lessonId: 'disc5-l1-rules', kind: 'command',
    front: L('Overlapping cases', 'Casos que se solapan', 'Casos sobrepostos'),
    back: L('Subtract the intersection: |A ∪ B| = |A| + |B| − |A ∩ B|.', 'Resta la intersección: |A ∪ B| = |A| + |B| − |A ∩ B|.', 'Subtraia a interseção: |A ∪ B| = |A| + |B| − |A ∩ B|.') },
  { id: 'disc5-fc-3', lessonId: 'disc5-l2-permutations', kind: 'concept',
    front: L('P(n, k)', 'P(n, k)', 'P(n, k)'),
    back: L('Ordered selection of k from n: n!/(n − k)! = n(n − 1)…(n − k + 1).', 'Selección ordenada de k entre n: n!/(n − k)! = n(n − 1)…(n − k + 1).', 'Seleção ordenada de k entre n: n!/(n − k)! = n(n − 1)…(n − k + 1).') },
  { id: 'disc5-fc-4', lessonId: 'disc5-l2-permutations', kind: 'concept',
    front: L('Circular arrangements and repeated symbols', 'Ordenaciones circulares y símbolos repetidos', 'Arranjos circulares e símbolos repetidos'),
    back: L('n around a circle: (n − 1)!. Repeated letters: n!/(n₁!·…·nᵣ!).', 'n en círculo: (n − 1)!. Letras repetidas: n!/(n₁!·…·nᵣ!).', 'n em círculo: (n − 1)!. Letras repetidas: n!/(n₁!·…·nᵣ!).') },
  { id: 'disc5-fc-5', lessonId: 'disc5-l3-combinations', kind: 'concept',
    front: L('C(n, k)', 'C(n, k)', 'C(n, k)'),
    back: L('Unordered selection: n!/(k!(n − k)!). It counts subsets of size k.', 'Selección no ordenada: n!/(k!(n − k)!). Cuenta subconjuntos de tamaño k.', 'Seleção não ordenada: n!/(k!(n − k)!). Conta subconjuntos de tamanho k.') },
  { id: 'disc5-fc-6', lessonId: 'disc5-l3-combinations', kind: 'concept',
    front: L('Pascal and binomial coefficients', 'Pascal y coeficientes binomiales', 'Pascal e coeficientes binomiais'),
    back: L('C(n, k) = C(n − 1, k − 1) + C(n − 1, k), and (x + y)ⁿ = Σ C(n, k)x^{n−k}yᵏ.', 'C(n, k) = C(n − 1, k − 1) + C(n − 1, k), y (x + y)ⁿ = Σ C(n, k)x^{n−k}yᵏ.', 'C(n, k) = C(n − 1, k − 1) + C(n − 1, k), e (x + y)ⁿ = Σ C(n, k)x^{n−k}yᵏ.') },
  { id: 'disc5-fc-7', lessonId: 'disc5-l4-inclusion-pigeonhole', kind: 'command',
    front: L('Three-set inclusion–exclusion', 'Inclusión–exclusión de tres conjuntos', 'Inclusão–exclusão de três conjuntos'),
    back: L('|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.', '|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.', '|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.') },
  { id: 'disc5-fc-8', lessonId: 'disc5-l4-inclusion-pigeonhole', kind: 'concept',
    front: L('Pigeonhole principle', 'Principio del palomar', 'Princípio da casa dos pombos'),
    back: L('n objects in k boxes force some box to hold at least ⌈n/k⌉ objects.', 'n objetos en k cajas obligan a que alguna caja tenga al menos ⌈n/k⌉ objetos.', 'n objetos em k caixas forçam alguma caixa a ter pelo menos ⌈n/k⌉ objetos.') },
  { id: 'disc5-fc-9', lessonId: 'disc5-l5-probability', kind: 'concept',
    front: L('Probability of an event', 'Probabilidad de un evento', 'Probabilidade de um evento'),
    back: L('For equally likely finite outcomes, P(E) = |E|/|S|.', 'Para resultados finitos igualmente probables, P(E) = |E|/|S|.', 'Para resultados finitos igualmente prováveis, P(E) = |E|/|S|.') },
  { id: 'disc5-fc-10', lessonId: 'disc5-l5-probability', kind: 'command',
    front: L('P(at least one)', 'P(al menos uno)', 'P(pelo menos um)'),
    back: L('1 − P(none). Use the complement unless the direct count is simpler.', '1 − P(ninguno). Usa el complemento salvo que el conteo directo sea más simple.', '1 − P(nenhum). Use o complemento a menos que a contagem direta seja mais simples.') },
  { id: 'disc5-fc-11', lessonId: 'disc5-l5-probability', kind: 'concept',
    front: L('Conditional probability', 'Probabilidad condicional', 'Probabilidade condicional'),
    back: L('P(E | F) = P(E ∩ F)/P(F), with P(F) > 0. It restricts the sample space to F.', 'P(E | F) = P(E ∩ F)/P(F), con P(F) > 0. Restringe el espacio muestral a F.', 'P(E | F) = P(E ∩ F)/P(F), com P(F) > 0. Restringe o espaço amostral a F.') },
  { id: 'disc5-fc-12', lessonId: 'disc5-l5-probability', kind: 'concept',
    front: L('Expected value', 'Valor esperado', 'Valor esperado'),
    back: L('E[X] = Σ x·P(X = x): the long-run average, not the next outcome.', 'E[X] = Σ x·P(X = x): el promedio a largo plazo, no el próximo resultado.', 'E[X] = Σ x·P(X = x): a média de longo prazo, não o próximo resultado.') },
];

/** Quiz for Discrete Mathematics, Week 5. */
export const discWeek5Questions: Question[] = [
  {
    id: 'disc5-q-fill-pin', type: 'fill-blank', lessonId: 'disc5-l2-permutations',
    prompt: L('How many 4-digit PINs have all distinct digits? ___', '¿Cuántos PIN de 4 dígitos tienen todos los dígitos distintos? ___', 'Quantos PINs de 4 dígitos têm todos os dígitos distintos? ___'),
    accepted: ['5040'],
    explanation: L('10·9·8·7 = 5040, or P(10, 4).', '10·9·8·7 = 5040, o P(10, 4).', '10·9·8·7 = 5040, ou P(10, 4).'),
  },
  {
    id: 'disc5-q-mc-podium', type: 'multiple-choice', lessonId: 'disc5-l2-permutations',
    prompt: L('Eight runners compete. In how many ways can the three medals be awarded?', 'Ocho corredores compiten. ¿De cuántas formas se pueden dar las tres medallas?', 'Oito corredores competem. De quantas formas as três medalhas podem ser dadas?'),
    options: [S('56'), S('336'), S('512')],
    answer: 1,
    explanation: L('Order matters: P(8, 3) = 8·7·6 = 336. The value 56 is C(8, 3), which ignores medal order.', 'El orden importa: P(8, 3) = 8·7·6 = 336. El valor 56 es C(8, 3), que ignora el orden de las medallas.', 'A ordem importa: P(8, 3) = 8·7·6 = 336. O valor 56 é C(8, 3), que ignora a ordem das medalhas.'),
  },
  {
    id: 'disc5-q-tf-combination', type: 'true-false', lessonId: 'disc5-l3-combinations',
    prompt: L('True or false: C(n, k) = P(n, k)/k!.', 'Verdadero o falso: C(n, k) = P(n, k)/k!.', 'Verdadeiro ou falso: C(n, k) = P(n, k)/k!.'),
    options: TF, answer: 0,
    explanation: L('True. Every unordered selection has k! orderings, so divide the ordered count by k!.', 'Verdadero. Cada selección no ordenada tiene k! ordenaciones, así que divide el conteo ordenado por k!.', 'Verdadeiro. Cada seleção não ordenada tem k! ordenações, então divida a contagem ordenada por k!.'),
  },
  {
    id: 'disc5-q-fill-banana', type: 'fill-blank', lessonId: 'disc5-l2-permutations',
    prompt: L('How many distinct arrangements does BANANA have? ___', '¿Cuántas ordenaciones distintas tiene BANANA? ___', 'Quantos arranjos distintos BANANA tem? ___'),
    accepted: ['60'],
    explanation: L('6!/(3!·2!·1!) = 720/12 = 60.', '6!/(3!·2!·1!) = 720/12 = 60.', '6!/(3!·2!·1!) = 720/12 = 60.'),
  },
  {
    id: 'disc5-q-match-formula', type: 'matching', lessonId: 'disc5-l3-combinations',
    prompt: L('Match each situation with its count.', 'Une cada situación con su cuenta.', 'Ligue cada situação à sua contagem.'),
    left: [L('Choose 3 of 8 committee members', 'Elegir 3 de 8 miembros de un comité', 'Escolher 3 de 8 membros de um comitê'), L('Arrange 5 distinct books', 'Ordenar 5 libros distintos', 'Organizar 5 livros distintos'), L('Seat 5 people around a round table', 'Sentar 5 personas en una mesa redonda', 'Sentar 5 pessoas em uma mesa redonda')],
    right: [S('5!'), S('C(8, 3)'), S('(5 − 1)!')],
    answer: [1, 0, 2],
    explanation: L('A committee is unordered; books in a row use 5!; a circle removes rotations, giving 4!.', 'Un comité no está ordenado; los libros en fila usan 5!; el círculo elimina rotaciones y da 4!.', 'Um comitê não é ordenado; livros em fila usam 5!; o círculo remove rotações, dando 4!.'),
  },
  {
    id: 'disc5-q-mc-complement', type: 'multiple-choice', lessonId: 'disc5-l5-probability',
    prompt: L('A fair coin is flipped 3 times. What is P(at least one head)?', 'Se lanza una moneda justa 3 veces. ¿Cuál es P(al menos una cara)?', 'Uma moeda justa é lançada 3 vezes. Qual é P(pelo menos uma cara)?'),
    options: [S('1/8'), S('3/8'), S('7/8')],
    answer: 2,
    explanation: L('P(no heads) = 1/8, so P(at least one) = 1 − 1/8 = 7/8.', 'P(ninguna cara) = 1/8, así que P(al menos una) = 1 − 1/8 = 7/8.', 'P(nenhuma cara) = 1/8, então P(pelo menos uma) = 1 − 1/8 = 7/8.'),
  },
  {
    id: 'disc5-q-troubleshoot-union', type: 'troubleshooting', lessonId: 'disc5-l5-probability',
    prompt: L('A student computes P(A ∪ B) = P(A) + P(B) = 0.5 + 0.4 = 0.9, but A and B can happen together. What is missing?', 'Un estudiante calcula P(A ∪ B) = P(A) + P(B) = 0,5 + 0,4 = 0,9, pero A y B pueden ocurrir juntos. ¿Qué falta?', 'Um estudante calcula P(A ∪ B) = P(A) + P(B) = 0,5 + 0,4 = 0,9, mas A e B podem ocorrer juntos. O que falta?'),
    options: [
      L('Subtract P(A ∩ B); the events are not disjoint.', 'Restar P(A ∩ B); los eventos no son disjuntos.', 'Subtrair P(A ∩ B); os eventos não são disjuntos.'),
      L('Add P(A ∩ B) again.', 'Sumar P(A ∩ B) otra vez.', 'Somar P(A ∩ B) novamente.'),
      L('Nothing; the formula is always valid.', 'Nada; la fórmula siempre es válida.', 'Nada; a fórmula é sempre válida.'),
    ],
    answer: 0,
    explanation: L('The correct rule is P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Without the subtraction, the overlap is counted twice.', 'La regla correcta es P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Sin la resta, el solapamiento se cuenta dos veces.', 'A regra correta é P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Sem a subtração, a sobreposição é contada duas vezes.'),
  },
  {
    id: 'disc5-q-fill-survey', type: 'fill-blank', lessonId: 'disc5-l4-inclusion-pigeonhole',
    prompt: L('Of 100 people, 78 read at least one of three magazines. How many read none? ___', 'De 100 personas, 78 leen al menos una de tres revistas. ¿Cuántas no leen ninguna? ___', 'De 100 pessoas, 78 leem pelo menos uma de três revistas. Quantas não leem nenhuma? ___'),
    accepted: ['22'],
    explanation: L('The complement has 100 − 78 = 22 people.', 'El complemento tiene 100 − 78 = 22 personas.', 'O complemento tem 100 − 78 = 22 pessoas.'),
  },
  {
    id: 'disc5-q-scenario-pigeonhole', type: 'scenario', lessonId: 'disc5-l4-inclusion-pigeonhole',
    prompt: L('Thirty students each choose one weekday for a presentation. What can you guarantee?', 'Treinta estudiantes eligen cada uno un día de la semana para una presentación. ¿Qué puedes garantizar?', 'Trinta estudantes escolhem cada um um dia da semana para uma apresentação. O que você pode garantir?'),
    options: [
      L('Some weekday has at least 5 students.', 'Algún día tiene al menos 5 estudiantes.', 'Algum dia tem pelo menos 5 estudantes.'),
      L('Every weekday has exactly 4 students.', 'Cada día tiene exactamente 4 estudiantes.', 'Cada dia tem exatamente 4 estudantes.'),
      L('Some weekday has exactly 30 students.', 'Algún día tiene exactamente 30 estudiantes.', 'Algum dia tem exatamente 30 estudantes.'),
    ],
    answer: 0,
    explanation: L('⌈30/7⌉ = 5, so at least one weekday holds 5 or more. Pigeonhole proves existence, not exact distribution.', '⌈30/7⌉ = 5, así que al menos un día tiene 5 o más. El palomar prueba existencia, no una distribución exacta.', '⌈30/7⌉ = 5, então pelo menos um dia tem 5 ou mais. A casa dos pombos prova existência, não uma distribuição exata.'),
  },
  {
    id: 'disc5-q-mc-aces', type: 'multiple-choice', lessonId: 'disc5-l5-probability',
    prompt: L('Two cards are drawn without replacement from a standard 52-card deck. What is P(both are aces)?', 'Se sacan dos cartas sin reemplazo de una baraja estándar de 52. ¿Cuál es P(ambas son ases)?', 'Duas cartas são retiradas sem reposição de um baralho padrão de 52. Qual é P(ambas são ases)?'),
    options: [S('1/169'), S('1/221'), S('1/26')],
    answer: 1,
    explanation: L('(4/52)·(3/51) = 12/2652 = 1/221. With replacement it would be (4/52)² = 1/169.', '(4/52)·(3/51) = 12/2652 = 1/221. Con reemplazo sería (4/52)² = 1/169.', '(4/52)·(3/51) = 12/2652 = 1/221. Com reposição seria (4/52)² = 1/169.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 5. */
export const discWeek5Activities: Activity[] = [
  {
    id: 'disc5-act-order-count', kind: 'order', lessonId: 'disc5-l3-combinations',
    title: L('Solve a counting problem in order', 'Resolver un problema de conteo en orden', 'Resolver um problema de contagem em ordem'),
    prompt: L('Order the steps for counting a selection.', 'Ordena los pasos para contar una selección.', 'Ordene os passos para contar uma seleção.'),
    items: [
      L('Decide whether the order of the selection matters', 'Decide si el orden de la selección importa', 'Decida se a ordem da seleção importa'),
      L('Decide whether repetition is allowed', 'Decide si se permite repetir', 'Decida se a repetição é permitida'),
      L('Choose the formula: nᵏ, P(n,k), or C(n,k)', 'Elige la fórmula: nᵏ, P(n,k) o C(n,k)', 'Escolha a fórmula: nᵏ, P(n,k) ou C(n,k)'),
      L('Substitute n and k and compute', 'Sustituye n y k y calcula', 'Substitua n e k e calcule'),
      L('Check that no case is counted twice', 'Comprueba que ningún caso se cuenta dos veces', 'Verifique se nenhum caso é contado duas vezes'),
    ],
    explanation: L('Order and repetition determine the formula; the final check catches the most common overcount.', 'El orden y la repetición determinan la fórmula; la comprobación final detecta el exceso más común.', 'Ordem e repetição determinam a fórmula; a verificação final detecta a contagem excessiva mais comum.'),
  },
  {
    id: 'disc5-act-fill-combination', kind: 'code-fill', lessonId: 'disc5-l3-combinations',
    title: L('Complete the combination formula', 'Completa la fórmula de combinación', 'Complete a fórmula de combinação'),
    prompt: L('C(9, 4) counts unordered selections. Fill the blanks.', 'C(9, 4) cuenta selecciones no ordenadas. Completa los huecos.', 'C(9, 4) conta seleções não ordenadas. Complete as lacunas.'),
    template: 'C(9,4) = 9! / ({0}! · {1}!) = 126',
    blanks: ['4', '5'],
    explanation: L('The denominator uses k! and (n − k)!: 4! and 5!. 9!/(4!·5!) = 126.', 'El denominador usa k! y (n − k)!: 4! y 5!. 9!/(4!·5!) = 126.', 'O denominador usa k! e (n − k)!: 4! e 5!. 9!/(4!·5!) = 126.'),
  },
  {
    id: 'disc5-act-scramble-import', kind: 'scramble', lessonId: 'disc5-l3-combinations',
    title: L('Import a combinations helper', 'Importa una ayuda de combinaciones', 'Importe um auxiliar de combinações'),
    prompt: L('Rebuild the Python import for math.comb.', 'Reconstruye el import de Python para math.comb.', 'Reconstrua o import Python para math.comb.'),
    tokens: ['from', 'math', 'import', 'comb'],
    explanation: L('Python ships combinations in the standard math module, so no third-party package is needed.', 'Python incluye las combinaciones en el módulo estándar math, así que no hace falta un paquete externo.', 'Python inclui combinações no módulo padrão math, então nenhum pacote externo é necessário.'),
  },
  {
    id: 'disc5-act-classify-order', kind: 'classify', lessonId: 'disc5-l2-permutations',
    title: L('Ordered or unordered?', '¿Ordenado o no ordenado?', 'Ordenado ou não ordenado?'),
    prompt: L('Sort each situation by whether order matters.', 'Clasifica cada situación según si importa el orden.', 'Classifique cada situação conforme a ordem importa.'),
    buckets: [L('Order matters', 'Importa el orden', 'A ordem importa'), L('Order does not matter', 'No importa el orden', 'A ordem não importa')],
    items: [
      { text: L('Awarding gold, silver, and bronze', 'Dar oro, plata y bronce', 'Dar ouro, prata e bronze'), bucket: 0 },
      { text: L('Choosing a 3-person committee', 'Elegir un comité de 3 personas', 'Escolher um comitê de 3 pessoas'), bucket: 1 },
      { text: L('Creating a 6-character password', 'Crear una contraseña de 6 caracteres', 'Criar uma senha de 6 caracteres'), bucket: 0 },
      { text: L('Drawing a 5-card poker hand', 'Sacar una mano de póker de 5 cartas', 'Tirar uma mão de pôquer de 5 cartas'), bucket: 1 },
      { text: L('Seating 5 people in a row', 'Sentar 5 personas en fila', 'Sentar 5 pessoas em fila'), bucket: 0 },
    ],
    explanation: L('Podiums, passwords, and rows are ordered; committees and hands are sets, so their order is irrelevant.', 'Podios, contraseñas y filas están ordenados; comités y manos son conjuntos, así que su orden es irrelevante.', 'Pódios, senhas e filas são ordenados; comitês e mãos são conjuntos, então sua ordem é irrelevante.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 5, with worked answers. */
export const discWeek5Labs: Lab[] = [
  {
    id: 'disc5-lab-1-counting', kind: 'math', level: 1, minutes: 40,
    title: L('A counting case file', 'Un expediente de conteo', 'Um dossiê de contagem'),
    goal: L('Choose the right rule for menus, codes, committees, and anagrams, and check each count.', 'Elegir la regla correcta para menús, códigos, comités y anagramas, y comprobar cada cuenta.', 'Escolher a regra certa para menus, códigos, comitês e anagramas, e conferir cada contagem.'),
    steps: [
      { id: 'disc5-lab1-s1', title: L('Menu', 'Menú', 'Menu'), commands: ['3 starters, 5 mains, 2 desserts; one of each'],
        expected: L('Product rule: 3·5·2 = 30 meals.', 'Regla del producto: 3·5·2 = 30 menús.', 'Regra do produto: 3·5·2 = 30 refeições.') },
      { id: 'disc5-lab1-s2', title: L('Code', 'Código', 'Código'), commands: ['4 characters, 26 letters then 10 digits, repetition allowed'],
        expected: L('36⁴ = 1,679,616 codes. With no repeated character: 36·35·34·33 = 1,413,720.', '36⁴ = 1.679.616 códigos. Sin repetir caracteres: 36·35·34·33 = 1.413.720.', '36⁴ = 1.679.616 códigos. Sem repetir caracteres: 36·35·34·33 = 1.413.720.') },
      { id: 'disc5-lab1-s3', title: L('Committee', 'Comité', 'Comitê'), commands: ['Choose 4 of 15, then a chair among the 4'],
        expected: L('C(15,4) = 1365 committees; 1365·4 = 5460 chair choices.', 'C(15,4) = 1365 comités; 1365·4 = 5460 elecciones de presidente.', 'C(15,4) = 1365 comitês; 1365·4 = 5460 escolhas de presidente.') },
      { id: 'disc5-lab1-s4', title: L('Anagram', 'Anagrama', 'Anagrama'), commands: ['Distinct arrangements of COMMITTEE'],
        expected: L('9 letters: 1 C, 1 O, 2 Ms, 2 Ts, 3 Es. 9!/(2!·2!·3!) = 362,880/24 = 15,120.', '9 letras: 1 C, 1 O, 2 M, 2 T, 3 E. 9!/(2!·2!·3!) = 362.880/24 = 15.120.', '9 letras: 1 C, 1 O, 2 Ms, 2 Ts, 3 Es. 9!/(2!·2!·3!) = 362.880/24 = 15.120.') },
    ],
  },
  {
    id: 'disc5-lab-2-probability', kind: 'math', level: 2, minutes: 45,
    title: L('Probability by counting', 'Probabilidad por conteo', 'Probabilidade por contagem'),
    goal: L('Compute probabilities from sample spaces, complements, and conditional draws.', 'Calcular probabilidades a partir de espacios muestrales, complementos y extracciones condicionales.', 'Calcular probabilidades a partir de espaços amostrais, complementos e retiradas condicionais.'),
    steps: [
      { id: 'disc5-lab2-s1', title: L('Two dice', 'Dos dados', 'Dois dados'), commands: ['P(sum is 8)'],
        expected: L('Favorable: (2,6), (3,5), (4,4), (5,3), (6,2), so 5/36.', 'Favorables: (2,6), (3,5), (4,4), (5,3), (6,2), así que 5/36.', 'Favoráveis: (2,6), (3,5), (4,4), (5,3), (6,2), então 5/36.') },
      { id: 'disc5-lab2-s2', title: L('Birthday boxes', 'Cajas de cumpleaños', 'Caixas de aniversário'), commands: ['23 people, 365 days; guarantee?'],
        expected: L('Pigeonhole only guarantees ⌈23/365⌉ = 1, which is trivial. The famous birthday coincidence needs a probability calculation, not pigeonhole.', 'El palomar solo garantiza ⌈23/365⌉ = 1, que es trivial. La famosa coincidencia de cumpleaños requiere un cálculo de probabilidad, no el palomar.', 'A casa dos pombos garante apenas ⌈23/365⌉ = 1, o que é trivial. A famosa coincidência de aniversários exige cálculo de probabilidade, não a casa dos pombos.') },
      { id: 'disc5-lab2-s3', title: L('At least one', 'Al menos uno', 'Pelo menos um'), commands: ['4 rolls of a fair die, P(at least one 6)'],
        expected: L('1 − (5/6)⁴ = 1 − 625/1296 = 671/1296 ≈ 0.518.', '1 − (5/6)⁴ = 1 − 625/1296 = 671/1296 ≈ 0,518.', '1 − (5/6)⁴ = 1 − 625/1296 = 671/1296 ≈ 0,518.') },
      { id: 'disc5-lab2-s4', title: L('Expected value', 'Valor esperado', 'Valor esperado'), commands: ['Fair die, and a game paying 10 on a 6, 0 otherwise'],
        expected: L('Fair die: 3.5. Game: 10·(1/6) + 0·(5/6) = 5/3 ≈ 1.67, so a 2-unit ticket is a loss in the long run.', 'Dado justo: 3,5. Juego: 10·(1/6) + 0·(5/6) = 5/3 ≈ 1,67, así que un boleto de 2 unidades pierde a largo plazo.', 'Dado justo: 3,5. Jogo: 10·(1/6) + 0·(5/6) = 5/3 ≈ 1,67, então um bilhete de 2 unidades dá prejuízo a longo prazo.') },
    ],
  },
];
