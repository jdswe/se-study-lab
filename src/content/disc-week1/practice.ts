import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 1. */
export const discWeek1Flashcards: Flashcard[] = [
  { id: 'disc1-fc-1', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: L('What does Σ_{i=m}^{n} a_i mean?', '¿Qué significa Σ_{i=m}^{n} a_i?', 'O que significa Σ_{i=m}^{n} a_i?'),
    back: L('a_m + a_{m+1} + … + a_n. The index letter is a placeholder.', 'a_m + a_{m+1} + … + a_n. La letra del índice es solo un marcador.', 'a_m + a_{m+1} + … + a_n. A letra do índice é só um marcador.') },
  { id: 'disc1-fc-2', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: L('Σ_{i=1}^{n} c (c a constant)', 'Σ_{i=1}^{n} c (c constante)', 'Σ_{i=1}^{n} c (c constante)'),
    back: L('n·c: the constant is added once per index value.', 'n·c: la constante se suma una vez por cada valor del índice.', 'n·c: a constante é somada uma vez para cada valor do índice.') },
  { id: 'disc1-fc-3', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: L('0!, and n! in terms of (n − 1)!', '0!, y n! en función de (n − 1)!', '0!, e n! em função de (n − 1)!'),
    back: L('0! = 1 and n! = n·(n − 1)!.', '0! = 1 y n! = n·(n − 1)!.', '0! = 1 e n! = n·(n − 1)!.') },
  { id: 'disc1-fc-4', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: L('ln(xy), ln(x/y), ln(xʸ)', 'ln(xy), ln(x/y), ln(xʸ)', 'ln(xy), ln(x/y), ln(xʸ)'),
    back: L('ln x + ln y · ln x − ln y · y·ln x', 'ln x + ln y · ln x − ln y · y·ln x', 'ln x + ln y · ln x − ln y · y·ln x') },
  { id: 'disc1-fc-5', lessonId: 'disc1-l2-induction', kind: 'concept',
    front: L('The two steps of induction', 'Los dos pasos de la inducción', 'Os dois passos da indução'),
    back: L('Base: prove P(n₀). Step: assume P(k) (hypothesis) and prove P(k + 1).', 'Base: demostrar P(n₀). Paso: suponer P(k) (hipótesis) y demostrar P(k + 1).', 'Base: provar P(n₀). Passo: supor P(k) (hipótese) e provar P(k + 1).') },
  { id: 'disc1-fc-6', lessonId: 'disc1-l2-induction', kind: 'distinction',
    front: L('Induction hypothesis vs goal', 'Hipótesis de inducción vs objetivo', 'Hipótese de indução vs objetivo'),
    back: L('Hypothesis: P(k), assumed. Goal: P(k + 1), proved using the hypothesis.', 'Hipótesis: P(k), se supone. Objetivo: P(k + 1), se demuestra usando la hipótesis.', 'Hipótese: P(k), suposta. Objetivo: P(k + 1), provado usando a hipótese.') },
  { id: 'disc1-fc-7', lessonId: 'disc1-l2-induction', kind: 'concept',
    front: L('Loop invariant', 'Invariante de bucle', 'Invariante de laço'),
    back: L('A statement true before the loop and preserved by each iteration: an induction proof about a loop.', 'Una afirmación cierta antes del bucle y que cada iteración conserva: una demostración por inducción sobre un bucle.', 'Uma afirmação verdadeira antes do laço e preservada por cada iteração: uma demonstração por indução sobre um laço.') },
  { id: 'disc1-fc-8', lessonId: 'disc1-l3-divisibility-inequalities', kind: 'concept',
    front: L('Shifted induction', 'Inducción desplazada', 'Indução deslocada'),
    back: L('The base is some n₀ > 1 because the claim is false before it; the hypothesis assumes k ≥ n₀.', 'La base es algún n₀ > 1 porque la afirmación es falsa antes; la hipótesis supone k ≥ n₀.', 'A base é algum n₀ > 1 porque a afirmação é falsa antes; a hipótese supõe k ≥ n₀.') },
  { id: 'disc1-fc-9', lessonId: 'disc1-l3-divisibility-inequalities', kind: 'command',
    front: L('Divisibility step trick for aⁿ − 1', 'Truco del paso de divisibilidad para aⁿ − 1', 'Truque do passo de divisibilidade para aⁿ − 1'),
    back: L('a^{k+1} − 1 = a(a^k − 1) + (a − 1).', 'a^{k+1} − 1 = a(a^k − 1) + (a − 1).', 'a^{k+1} − 1 = a(a^k − 1) + (a − 1).') },
  { id: 'disc1-fc-10', lessonId: 'disc1-l4-strong-induction', kind: 'distinction',
    front: L('Ordinary vs strong induction', 'Inducción ordinaria vs fuerte', 'Indução comum vs forte'),
    back: L('Ordinary assumes only P(k). Strong assumes P(n₀), …, P(k) and needs as many bases as the step reaches back.', 'La ordinaria supone solo P(k). La fuerte supone P(n₀), …, P(k) y necesita tantas bases como lugares mira atrás el paso.', 'A comum supõe só P(k). A forte supõe P(n₀), …, P(k) e precisa de tantas bases quantos lugares o passo olha para trás.') },
  { id: 'disc1-fc-11', lessonId: 'disc1-l5-recursion', kind: 'concept',
    front: L('Geometric sum a + ar + … + arⁿ (r ≠ 1)', 'Suma geométrica a + ar + … + arⁿ (r ≠ 1)', 'Soma geométrica a + ar + … + arⁿ (r ≠ 1)'),
    back: L('a(r^{n+1} − 1)/(r − 1). Special case: 1 + 2 + … + 2^{n−1} = 2ⁿ − 1.', 'a(r^{n+1} − 1)/(r − 1). Caso especial: 1 + 2 + … + 2^{n−1} = 2ⁿ − 1.', 'a(r^{n+1} − 1)/(r − 1). Caso especial: 1 + 2 + … + 2^{n−1} = 2ⁿ − 1.') },
  { id: 'disc1-fc-12', lessonId: 'disc1-l5-recursion', kind: 'distinction',
    front: L('Recursive definition vs closed formula', 'Definición recursiva vs fórmula cerrada', 'Definição recursiva vs fórmula fechada'),
    back: L('Recursive: a₀ = 5, a_n = a_{n−1} + 3. Closed: a_n = 5 + 3n, computed directly from n.', 'Recursiva: a₀ = 5, a_n = a_{n−1} + 3. Cerrada: a_n = 5 + 3n, se calcula directamente a partir de n.', 'Recursiva: a₀ = 5, a_n = a_{n−1} + 3. Fechada: a_n = 5 + 3n, calculada diretamente a partir de n.') },
];

/** Quiz for Discrete Mathematics, Week 1. */
export const discWeek1Questions: Question[] = [
  {
    id: 'disc1-q-fill-sigma', type: 'fill-blank', lessonId: 'disc1-l1-sigma',
    prompt: L('Σ_{k=1}^{4} (3k − 1) = ___', 'Σ_{k=1}^{4} (3k − 1) = ___', 'Σ_{k=1}^{4} (3k − 1) = ___'),
    accepted: ['26'],
    explanation: L('2 + 5 + 8 + 11 = 26, or 3·10 − 4 = 26.', '2 + 5 + 8 + 11 = 26, o bien 3·10 − 4 = 26.', '2 + 5 + 8 + 11 = 26, ou 3·10 − 4 = 26.'),
  },
  {
    id: 'disc1-q-mc-factorial', type: 'multiple-choice', lessonId: 'disc1-l1-sigma',
    prompt: L('Which expression equals 9!/7!?', '¿Qué expresión es igual a 9!/7!?', 'Qual expressão é igual a 9!/7!?'),
    options: [S('2'), S('72'), S('9/7')],
    answer: 1,
    explanation: L('9!/7! = 9·8·7!/7! = 72.', '9!/7! = 9·8·7!/7! = 72.', '9!/7! = 9·8·7!/7! = 72.'),
    whyWrong: [L('Factorials do not cancel like that: 9!/7! ≠ (9 − 7)!.', 'Los factoriales no se cancelan así: 9!/7! ≠ (9 − 7)!.', 'Fatoriais não se cancelam assim: 9!/7! ≠ (9 − 7)!.'), L('Correct.', 'Correcto.', 'Correto.'), L('The ! cannot be dropped.', 'El ! no se puede quitar.', 'O ! não pode ser retirado.')],
  },
  {
    id: 'disc1-q-tf-base', type: 'true-false', lessonId: 'disc1-l2-induction',
    prompt: L('True or false: if the inductive step P(k) ⇒ P(k + 1) is valid, the base case can be skipped.', 'Verdadero o falso: si el paso inductivo P(k) ⇒ P(k + 1) es válido, se puede omitir el caso base.', 'Verdadeiro ou falso: se o passo indutivo P(k) ⇒ P(k + 1) é válido, o caso base pode ser omitido.'),
    options: TF, answer: 1,
    explanation: L('False. 1 + … + n = (n² + n + 1)/2 has a valid step but is false for every n, because the base fails.', 'Falso. 1 + … + n = (n² + n + 1)/2 tiene un paso válido pero es falsa para todo n, porque la base falla.', 'Falso. 1 + … + n = (n² + n + 1)/2 tem um passo válido mas é falsa para todo n, porque a base falha.'),
  },
  {
    id: 'disc1-q-mc-step', type: 'multiple-choice', lessonId: 'disc1-l2-induction',
    prompt: L('To prove 1 + 2 + … + n = n(n + 1)/2, after assuming the formula for k you must show:', 'Para demostrar 1 + 2 + … + n = n(n + 1)/2, tras suponer la fórmula para k hay que mostrar:', 'Para provar 1 + 2 + … + n = n(n + 1)/2, depois de supor a fórmula para k é preciso mostrar:'),
    options: [
      L('k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2', 'k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2', 'k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2'),
      L('k(k + 1)/2 + k = (k + 1)(k + 2)/2', 'k(k + 1)/2 + k = (k + 1)(k + 2)/2', 'k(k + 1)/2 + k = (k + 1)(k + 2)/2'),
      L('1 = 1·2/2', '1 = 1·2/2', '1 = 1·2/2'),
    ],
    answer: 0,
    explanation: L('The new term for n = k + 1 is k + 1, and the target is the formula with k + 1.', 'El término nuevo para n = k + 1 es k + 1, y el objetivo es la fórmula con k + 1.', 'O termo novo para n = k + 1 é k + 1, e o alvo é a fórmula com k + 1.'),
  },
  {
    id: 'disc1-q-matching-parts', type: 'matching', lessonId: 'disc1-l2-induction',
    prompt: L('Match each line of a proof of 3 + 6 + … + 3n = 3n(n + 1)/2 with its role.', 'Une cada línea de una demostración de 3 + 6 + … + 3n = 3n(n + 1)/2 con su papel.', 'Ligue cada linha de uma demonstração de 3 + 6 + … + 3n = 3n(n + 1)/2 ao seu papel.'),
    left: [S('3 = 3·1·2/2'), S('3 + … + 3k = 3k(k + 1)/2'), S('3k(k + 1)/2 + 3(k + 1) = 3(k + 1)(k + 2)/2')],
    right: [L('Inductive step', 'Paso inductivo', 'Passo indutivo'), L('Base case', 'Caso base', 'Caso base'), L('Hypothesis', 'Hipótesis', 'Hipótese')],
    answer: [1, 2, 0],
    explanation: L('Base checks n = 1, the hypothesis states P(k), and the step reaches P(k + 1).', 'La base comprueba n = 1, la hipótesis enuncia P(k) y el paso llega a P(k + 1).', 'A base confere n = 1, a hipótese enuncia P(k) e o passo chega a P(k + 1).'),
  },
  {
    id: 'disc1-q-fill-base', type: 'fill-blank', lessonId: 'disc1-l3-divisibility-inequalities',
    prompt: L('What is the smallest base n₀ for the claim n! > 2ⁿ (true for every n ≥ n₀)? n₀ = ___', '¿Cuál es la base n₀ más pequeña para la afirmación n! > 2ⁿ (cierta para todo n ≥ n₀)? n₀ = ___', 'Qual é a menor base n₀ para a afirmação n! > 2ⁿ (verdadeira para todo n ≥ n₀)? n₀ = ___'),
    accepted: ['4'],
    explanation: L('3! = 6 < 8, but 4! = 24 > 16, and (k + 1)! = (k + 1)k! > 2·2^k from there on.', '3! = 6 < 8, pero 4! = 24 > 16, y desde ahí (k + 1)! = (k + 1)k! > 2·2^k.', '3! = 6 < 8, mas 4! = 24 > 16, e daí em diante (k + 1)! = (k + 1)k! > 2·2^k.'),
  },
  {
    id: 'disc1-q-troubleshoot-div', type: 'troubleshooting', lessonId: 'disc1-l3-divisibility-inequalities',
    prompt: L('A student proves "5ⁿ + 3 is divisible by 4" with this step. What is wrong?', 'Un estudiante demuestra "5ⁿ + 3 es divisible por 4" con este paso. ¿Qué está mal?', 'Um estudante prova "5ⁿ + 3 é divisível por 4" com este passo. O que está errado?'),
    code: '5^(k+1) + 3 = 5(5^k + 3)\n             = 5·4m          (hypothesis)\n             = 4(5m)  ✓',
    options: [
      L('Nothing; the proof is correct.', 'Nada; la demostración es correcta.', 'Nada; a demonstração está correta.'),
      L('5(5^k + 3) = 5^{k+1} + 15, not 5^{k+1} + 3; it should be 5(5^k + 3) − 12.', '5(5^k + 3) = 5^{k+1} + 15, no 5^{k+1} + 3; debería ser 5(5^k + 3) − 12.', '5(5^k + 3) = 5^{k+1} + 15, não 5^{k+1} + 3; deveria ser 5(5^k + 3) − 12.'),
      L('The hypothesis cannot be used in a divisibility proof.', 'La hipótesis no se puede usar en una demostración de divisibilidad.', 'A hipótese não pode ser usada numa demonstração de divisibilidade.'),
    ],
    answer: 1,
    explanation: L('With the correction: 5^{k+1} + 3 = 5(5^k + 3) − 12 = 20m − 12 = 4(5m − 3). The claim is true; the algebra was not.', 'Con la corrección: 5^{k+1} + 3 = 5(5^k + 3) − 12 = 20m − 12 = 4(5m − 3). La afirmación es cierta; el álgebra no.', 'Com a correção: 5^{k+1} + 3 = 5(5^k + 3) − 12 = 20m − 12 = 4(5m − 3). A afirmação é verdadeira; a álgebra não.'),
  },
  {
    id: 'disc1-q-mc-strong', type: 'scenario', lessonId: 'disc1-l4-strong-induction',
    prompt: L('You want to prove that every amount n ≥ 10 can be paid with 3-coins and 5-coins (with the hypothesis applied to n − 3). Which base cases are needed?', 'Quieres demostrar que toda cantidad n ≥ 10 se puede pagar con monedas de 3 y de 5 (aplicando la hipótesis a n − 3). ¿Qué casos base hacen falta?', 'Você quer provar que toda quantia n ≥ 10 pode ser paga com moedas de 3 e de 5 (aplicando a hipótese a n − 3). Quais casos base são necessários?'),
    options: [S('10'), S('10, 11, 12'), S('10, 11, 12, 13, 14')],
    answer: 1,
    explanation: L('The step reaches back 3, so three consecutive bases: 10 = 5 + 5, 11 = 3 + 3 + 5, 12 = 3·4. (In fact 8 and 9 also work.)', 'El paso mira 3 atrás, así que tres bases consecutivas: 10 = 5 + 5, 11 = 3 + 3 + 5, 12 = 3·4. (De hecho 8 y 9 también funcionan.)', 'O passo olha 3 para trás, então três bases consecutivas: 10 = 5 + 5, 11 = 3 + 3 + 5, 12 = 3·4. (Na verdade 8 e 9 também funcionam.)'),
  },
  {
    id: 'disc1-q-fill-hanoi', type: 'fill-blank', lessonId: 'disc1-l5-recursion',
    prompt: L('T(1) = 1, T(n) = 2T(n − 1) + 1. T(8) = ___', 'T(1) = 1, T(n) = 2T(n − 1) + 1. T(8) = ___', 'T(1) = 1, T(n) = 2T(n − 1) + 1. T(8) = ___'),
    accepted: ['255'],
    explanation: L('T(n) = 2ⁿ − 1, so T(8) = 256 − 1 = 255.', 'T(n) = 2ⁿ − 1, así que T(8) = 256 − 1 = 255.', 'T(n) = 2ⁿ − 1, então T(8) = 256 − 1 = 255.'),
  },
  {
    id: 'disc1-q-mc-geometric', type: 'multiple-choice', lessonId: 'disc1-l5-recursion',
    prompt: L('What is 2 + 6 + 18 + 54 + 162 (= Σ_{i=0}^{4} 2·3^i)?', '¿Cuánto vale 2 + 6 + 18 + 54 + 162 (= Σ_{i=0}^{4} 2·3^i)?', 'Quanto vale 2 + 6 + 18 + 54 + 162 (= Σ_{i=0}^{4} 2·3^i)?'),
    options: [S('242'), S('486'), S('162')],
    answer: 0,
    explanation: L('a(r^{n+1} − 1)/(r − 1) = 2(3⁵ − 1)/2 = 243 − 1 = 242.', 'a(r^{n+1} − 1)/(r − 1) = 2(3⁵ − 1)/2 = 243 − 1 = 242.', 'a(r^{n+1} − 1)/(r − 1) = 2(3⁵ − 1)/2 = 243 − 1 = 242.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 1. */
export const discWeek1Activities: Activity[] = [
  {
    id: 'disc1-act-order-proof', kind: 'order', lessonId: 'disc1-l2-induction',
    title: L('Assemble an induction proof', 'Arma una demostración por inducción', 'Monte uma demonstração por indução'),
    prompt: L('Put the lines of the proof of 1 + 3 + … + (2n − 1) = n² in order.', 'Ordena las líneas de la demostración de 1 + 3 + … + (2n − 1) = n².', 'Coloque em ordem as linhas da demonstração de 1 + 3 + … + (2n − 1) = n².'),
    items: [
      L('Base: for n = 1, 1 = 1²', 'Base: para n = 1, 1 = 1²', 'Base: para n = 1, 1 = 1²'),
      L('Hypothesis: 1 + 3 + … + (2k − 1) = k²', 'Hipótesis: 1 + 3 + … + (2k − 1) = k²', 'Hipótese: 1 + 3 + … + (2k − 1) = k²'),
      L('Goal: 1 + 3 + … + (2k + 1) = (k + 1)²', 'Objetivo: 1 + 3 + … + (2k + 1) = (k + 1)²', 'Objetivo: 1 + 3 + … + (2k + 1) = (k + 1)²'),
      L('Split off the last term: [1 + … + (2k − 1)] + (2k + 1)', 'Separar el último término: [1 + … + (2k − 1)] + (2k + 1)', 'Separar o último termo: [1 + … + (2k − 1)] + (2k + 1)'),
      L('Use the hypothesis: k² + 2k + 1 = (k + 1)²', 'Usar la hipótesis: k² + 2k + 1 = (k + 1)²', 'Usar a hipótese: k² + 2k + 1 = (k + 1)²'),
      L('Conclude: true for every n ≥ 1', 'Concluir: cierto para todo n ≥ 1', 'Concluir: verdadeiro para todo n ≥ 1'),
    ],
    explanation: L('State the goal before the algebra so you know where it must land.', 'Enuncia el objetivo antes del álgebra para saber dónde tiene que llegar.', 'Enuncie o objetivo antes da álgebra para saber onde ela precisa chegar.'),
  },
  {
    id: 'disc1-act-fill-sigma', kind: 'code-fill', lessonId: 'disc1-l1-sigma',
    title: L('Expand and add', 'Desarrolla y suma', 'Desenvolva e some'),
    prompt: L('Complete the terms and the total of Σ_{i=1}^{4} (2i + 1).', 'Completa los términos y el total de Σ_{i=1}^{4} (2i + 1).', 'Complete os termos e o total de Σ_{i=1}^{4} (2i + 1).'),
    template: 'i = 1 -> 3\ni = 2 -> {0}\ni = 3 -> 7\ni = 4 -> {1}\ntotal = {2}',
    blanks: ['5', '9', '24'],
    explanation: L('3 + 5 + 7 + 9 = 24. Check with the rules: 2·Σi + Σ1 = 2·10 + 4 = 24.', '3 + 5 + 7 + 9 = 24. Comprueba con las reglas: 2·Σi + Σ1 = 2·10 + 4 = 24.', '3 + 5 + 7 + 9 = 24. Confira com as regras: 2·Σi + Σ1 = 2·10 + 4 = 24.'),
  },
  {
    id: 'disc1-act-classify-base', kind: 'classify', lessonId: 'disc1-l3-divisibility-inequalities',
    title: L('Where does the base go?', '¿Dónde va la base?', 'Onde fica a base?'),
    prompt: L('Sort each claim by the smallest n from which it holds forever.', 'Clasifica cada afirmación según el menor n desde el que se cumple para siempre.', 'Classifique cada afirmação pelo menor n a partir do qual vale para sempre.'),
    buckets: [L('From n = 1', 'Desde n = 1', 'A partir de n = 1'), L('From n = 4', 'Desde n = 4', 'A partir de n = 4'), L('From n = 5 or later', 'Desde n = 5 o más', 'A partir de n = 5 ou depois')],
    items: [
      { text: S('2ⁿ ≥ n + 1'), bucket: 0 },
      { text: S('n! > 2ⁿ'), bucket: 1 },
      { text: S('2ⁿ > n²'), bucket: 2 },
      { text: S('2ⁿ > 3n'), bucket: 1 },
      { text: S('3ⁿ < n!'), bucket: 2 },
      { text: L('7ⁿ − 1 divisible by 6', '7ⁿ − 1 divisible por 6', '7ⁿ − 1 divisível por 6'), bucket: 0 },
    ],
    explanation: L('Tabulate: 4! = 24 > 16; 2⁴ = 16 > 12; 2⁵ = 32 > 25 (but 16 = 16 at n = 4); 3ⁿ < n! only from n = 7.', 'Tabula: 4! = 24 > 16; 2⁴ = 16 > 12; 2⁵ = 32 > 25 (pero 16 = 16 en n = 4); 3ⁿ < n! solo desde n = 7.', 'Tabele: 4! = 24 > 16; 2⁴ = 16 > 12; 2⁵ = 32 > 25 (mas 16 = 16 em n = 4); 3ⁿ < n! só a partir de n = 7.'),
  },
  {
    id: 'disc1-act-classify-kind', kind: 'classify', lessonId: 'disc1-l4-strong-induction',
    title: L('Ordinary or strong?', '¿Ordinaria o fuerte?', 'Comum ou forte?'),
    prompt: L('Which kind of induction fits each proof most naturally?', '¿Qué tipo de inducción encaja de forma más natural en cada demostración?', 'Que tipo de indução combina mais naturalmente com cada demonstração?'),
    buckets: [L('Ordinary', 'Ordinaria', 'Comum'), L('Strong', 'Fuerte', 'Forte')],
    items: [
      { text: L('A formula for 1 + 2 + … + n', 'Una fórmula para 1 + 2 + … + n', 'Uma fórmula para 1 + 2 + … + n'), bucket: 0 },
      { text: L('Every n ≥ 2 is a product of primes', 'Todo n ≥ 2 es producto de primos', 'Todo n ≥ 2 é produto de primos'), bucket: 1 },
      { text: L('Fibonacci: F_n < 2ⁿ', 'Fibonacci: F_n < 2ⁿ', 'Fibonacci: F_n < 2ⁿ'), bucket: 1 },
      { text: L('4ⁿ + 2 divisible by 3', '4ⁿ + 2 divisible por 3', '4ⁿ + 2 divisível por 3'), bucket: 0 },
      { text: L('Paying any amount ≥ 12 with 4s and 5s', 'Pagar cualquier cantidad ≥ 12 con 4 y 5', 'Pagar qualquer quantia ≥ 12 com 4 e 5'), bucket: 1 },
    ],
    explanation: L('Strong induction is used when the step needs a case further back than k.', 'La inducción fuerte se usa cuando el paso necesita un caso más atrás que k.', 'A indução forte é usada quando o passo precisa de um caso mais atrás do que k.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 1, with worked answers. */
export const discWeek1Labs: Lab[] = [
  {
    id: 'disc1-lab-1-sums', kind: 'math', level: 1, minutes: 45,
    title: L('Sigma notation and first induction proofs', 'Notación sigma y primeras demostraciones por inducción', 'Notação sigma e primeiras demonstrações por indução'),
    goal: L('Compute sums, rewrite them with sigma, and write complete induction proofs with base, hypothesis, and step.', 'Calcular sumas, reescribirlas con sigma y escribir demostraciones por inducción completas con base, hipótesis y paso.', 'Calcular somas, reescrevê-las com sigma e escrever demonstrações por indução completas com base, hipótese e passo.'),
    steps: [
      { id: 'disc1-lab1-s1', title: L('Evaluate', 'Calcula', 'Calcule'), commands: ['Σ_{i=1}^{6} (2i − 1)', 'Σ_{j=0}^{3} (j + 2)²', 'Σ_{k=3}^{6} 4'],
        expected: L('1 + 3 + 5 + 7 + 9 + 11 = 36. 4 + 9 + 16 + 25 = 54. Four terms of 4: 16.', '1 + 3 + 5 + 7 + 9 + 11 = 36. 4 + 9 + 16 + 25 = 54. Cuatro términos de 4: 16.', '1 + 3 + 5 + 7 + 9 + 11 = 36. 4 + 9 + 16 + 25 = 54. Quatro termos de 4: 16.') },
      { id: 'disc1-lab1-s2', title: L('Write with sigma', 'Escribe con sigma', 'Escreva com sigma'), commands: ['4 + 7 + 10 + ... + 31', '1/2 + 1/4 + 1/8 + ... + 1/64'],
        expected: L('Σ_{i=1}^{10} (3i + 1) (i = 10 gives 31); Σ_{i=1}^{6} 1/2^i.', 'Σ_{i=1}^{10} (3i + 1) (i = 10 da 31); Σ_{i=1}^{6} 1/2^i.', 'Σ_{i=1}^{10} (3i + 1) (i = 10 dá 31); Σ_{i=1}^{6} 1/2^i.') },
      { id: 'disc1-lab1-s3', title: L('Prove a sum formula', 'Demuestra una fórmula de suma', 'Prove uma fórmula de soma'), commands: ['Σ_{i=1}^{n} (2i + 3) = n(n + 4)'],
        expected: L('Base: 5 = 1·5. Step: k(k + 4) + 2(k + 1) + 3 = k² + 6k + 5 = (k + 1)(k + 5). ∎', 'Base: 5 = 1·5. Paso: k(k + 4) + 2(k + 1) + 3 = k² + 6k + 5 = (k + 1)(k + 5). ∎', 'Base: 5 = 1·5. Passo: k(k + 4) + 2(k + 1) + 3 = k² + 6k + 5 = (k + 1)(k + 5). ∎') },
      { id: 'disc1-lab1-s4', title: L('Sum of squares', 'Suma de cuadrados', 'Soma de quadrados'), commands: ['Σ_{i=1}^{n} i² = n(n + 1)(2n + 1)/6'],
        expected: L('Base: 1 = 1·2·3/6. Step: k(k + 1)(2k + 1)/6 + (k + 1)² = (k + 1)[k(2k + 1) + 6(k + 1)]/6 = (k + 1)(2k² + 7k + 6)/6 = (k + 1)(k + 2)(2k + 3)/6. ∎', 'Base: 1 = 1·2·3/6. Paso: k(k + 1)(2k + 1)/6 + (k + 1)² = (k + 1)[k(2k + 1) + 6(k + 1)]/6 = (k + 1)(2k² + 7k + 6)/6 = (k + 1)(k + 2)(2k + 3)/6. ∎', 'Base: 1 = 1·2·3/6. Passo: k(k + 1)(2k + 1)/6 + (k + 1)² = (k + 1)[k(2k + 1) + 6(k + 1)]/6 = (k + 1)(2k² + 7k + 6)/6 = (k + 1)(k + 2)(2k + 3)/6. ∎') },
      { id: 'disc1-lab1-s5', title: L('Factorials in a sum', 'Factoriales en una suma', 'Fatoriais numa soma'), commands: ['Σ_{i=1}^{n} i/(i + 1)! = 1 − 1/(n + 1)!'],
        expected: L('Base: 1/2! = 1/2 = 1 − 1/2!. Step: 1 − 1/(k + 1)! + (k + 1)/(k + 2)! = 1 − [(k + 2) − (k + 1)]/(k + 2)! = 1 − 1/(k + 2)!. ∎', 'Base: 1/2! = 1/2 = 1 − 1/2!. Paso: 1 − 1/(k + 1)! + (k + 1)/(k + 2)! = 1 − [(k + 2) − (k + 1)]/(k + 2)! = 1 − 1/(k + 2)!. ∎', 'Base: 1/2! = 1/2 = 1 − 1/2!. Passo: 1 − 1/(k + 1)! + (k + 1)/(k + 2)! = 1 − [(k + 2) − (k + 1)]/(k + 2)! = 1 − 1/(k + 2)!. ∎') },
    ],
  },
  {
    id: 'disc1-lab-2-shifted-strong', kind: 'math', level: 2, minutes: 50,
    title: L('Divisibility, inequalities, strong induction, and recursion', 'Divisibilidad, desigualdades, inducción fuerte y recursión', 'Divisibilidade, desigualdades, indução forte e recursão'),
    goal: L('Choose the right base, the right kind of induction, and finish each proof.', 'Elegir la base correcta, el tipo de inducción adecuado y terminar cada demostración.', 'Escolher a base certa, o tipo certo de indução e terminar cada demonstração.'),
    steps: [
      { id: 'disc1-lab2-s1', title: L('Divisibility', 'Divisibilidad', 'Divisibilidade'), commands: ['9^n − 1 is divisible by 8,  n ≥ 1'],
        expected: L('Base: 8. Step: 9^{k+1} − 1 = 9(9^k − 1) + 8 = 9·8m + 8 = 8(9m + 1). ∎', 'Base: 8. Paso: 9^{k+1} − 1 = 9(9^k − 1) + 8 = 9·8m + 8 = 8(9m + 1). ∎', 'Base: 8. Passo: 9^{k+1} − 1 = 9(9^k − 1) + 8 = 9·8m + 8 = 8(9m + 1). ∎') },
      { id: 'disc1-lab2-s2', title: L('Find the base, then prove', 'Encuentra la base y demuestra', 'Encontre a base e prove'), commands: ['3^n > 2n + 5'],
        expected: L('n = 1: 3 > 7 no; n = 2: 9 > 9 no; n = 3: 27 > 11 yes. Step (k ≥ 3): 3^{k+1} = 3·3^k > 6k + 15 > 2k + 7. ∎', 'n = 1: 3 > 7 no; n = 2: 9 > 9 no; n = 3: 27 > 11 sí. Paso (k ≥ 3): 3^{k+1} = 3·3^k > 6k + 15 > 2k + 7. ∎', 'n = 1: 3 > 7 não; n = 2: 9 > 9 não; n = 3: 27 > 11 sim. Passo (k ≥ 3): 3^{k+1} = 3·3^k > 6k + 15 > 2k + 7. ∎') },
      { id: 'disc1-lab2-s3', title: L('Bernoulli\'s inequality', 'Desigualdad de Bernoulli', 'Desigualdade de Bernoulli'), commands: ['(1 + x)^n ≥ 1 + nx,  x ≥ −1,  n ≥ 1'],
        expected: L('Base: 1 + x ≥ 1 + x. Step: (1 + x)^{k+1} = (1 + x)^k(1 + x) ≥ (1 + kx)(1 + x) (valid because 1 + x ≥ 0) = 1 + (k + 1)x + kx² ≥ 1 + (k + 1)x. ∎', 'Base: 1 + x ≥ 1 + x. Paso: (1 + x)^{k+1} = (1 + x)^k(1 + x) ≥ (1 + kx)(1 + x) (válido porque 1 + x ≥ 0) = 1 + (k + 1)x + kx² ≥ 1 + (k + 1)x. ∎', 'Base: 1 + x ≥ 1 + x. Passo: (1 + x)^{k+1} = (1 + x)^k(1 + x) ≥ (1 + kx)(1 + x) (válido porque 1 + x ≥ 0) = 1 + (k + 1)x + kx² ≥ 1 + (k + 1)x. ∎') },
      { id: 'disc1-lab2-s4', title: L('Strong induction with coins', 'Inducción fuerte con monedas', 'Indução forte com moedas'), commands: ['Every n ≥ 18 is 4a + 7b  (a, b ≥ 0)'],
        expected: L('Bases: 18 = 4 + 7·2, 19 = 4·3 + 7, 20 = 4·5, 21 = 7·3. Step: n ≥ 22 ⇒ n − 4 ≥ 18 works; add a 4. (17 is impossible.)', 'Bases: 18 = 4 + 7·2, 19 = 4·3 + 7, 20 = 4·5, 21 = 7·3. Paso: n ≥ 22 ⇒ n − 4 ≥ 18 funciona; se agrega un 4. (17 es imposible.)', 'Bases: 18 = 4 + 7·2, 19 = 4·3 + 7, 20 = 4·5, 21 = 7·3. Passo: n ≥ 22 ⇒ n − 4 ≥ 18 funciona; acrescenta-se um 4. (17 é impossível.)') },
      { id: 'disc1-lab2-s5', title: L('A telescoping log sum', 'Una suma de logaritmos telescópica', 'Uma soma de logaritmos telescópica'), commands: ['Σ_{i=1}^{n} ln((i + 2)/(i + 1)) = ln((n + 2)/2)'],
        expected: L('Base: ln(3/2). Step: ln((k + 2)/2) + ln((k + 3)/(k + 2)) = ln((k + 2)/2 · (k + 3)/(k + 2)) = ln((k + 3)/2). ∎', 'Base: ln(3/2). Paso: ln((k + 2)/2) + ln((k + 3)/(k + 2)) = ln((k + 2)/2 · (k + 3)/(k + 2)) = ln((k + 3)/2). ∎', 'Base: ln(3/2). Passo: ln((k + 2)/2) + ln((k + 3)/(k + 2)) = ln((k + 2)/2 · (k + 3)/(k + 2)) = ln((k + 3)/2). ∎') },
    ],
  },
];
