import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 1. */
export const discWeek1Flashcards: Flashcard[] = [
  { id: 'disc1-fc-1', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: L('What does $\\sum_{i=m}^{n} a_i$ mean?', '¿Qué significa $\\sum_{i=m}^{n} a_i$?', 'O que significa $\\sum_{i=m}^{n} a_i$?'),
    back: L('$a_m + a_{m+1} + \\dots + a_n$; the index letter is a placeholder.', '$a_m + a_{m+1} + \\dots + a_n$; la letra del índice es solo un marcador.', '$a_m + a_{m+1} + \\dots + a_n$; a letra do índice é só um marcador.') },
  { id: 'disc1-fc-2', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: S('$\\sum_{i=1}^{n} c$'),
    back: L('$nc$: the constant is added once per index value.', '$nc$: la constante se suma una vez por cada valor del índice.', '$nc$: a constante é somada uma vez para cada valor do índice.') },
  { id: 'disc1-fc-3', lessonId: 'disc1-l1-sigma', kind: 'concept',
    front: L('$0!$ and $(k+1)!$', '$0!$ y $(k+1)!$', '$0!$ e $(k+1)!$'),
    back: L('$0! = 1$ and $(k+1)! = (k+1)\\,k!$.', '$0! = 1$ y $(k+1)! = (k+1)\\,k!$.', '$0! = 1$ e $(k+1)! = (k+1)\\,k!$.') },
  { id: 'disc1-fc-4', lessonId: 'disc1-l2-induction', kind: 'concept',
    front: L('The two steps of induction', 'Los dos pasos de la inducción', 'Os dois passos da indução'),
    back: L('Base: prove $P(n_0)$. Step: assume $P(k)$ and prove $P(k+1)$.', 'Base: probar $P(n_0)$. Paso: suponer $P(k)$ y probar $P(k+1)$.', 'Base: provar $P(n_0)$. Passo: supor $P(k)$ e provar $P(k+1)$.') },
  { id: 'disc1-fc-5', lessonId: 'disc1-l2-induction', kind: 'distinction',
    front: L('Hypothesis vs goal', 'Hipótesis vs objetivo', 'Hipótese vs alvo'),
    back: L('Hypothesis: $P(k)$, assumed. Goal: $P(k+1)$, proved with the hypothesis.', 'Hipótesis: $P(k)$, se supone. Objetivo: $P(k+1)$, se prueba con la hipótesis.', 'Hipótese: $P(k)$, suposta. Alvo: $P(k+1)$, provado com a hipótese.') },
  { id: 'disc1-fc-6', lessonId: 'disc1-l2-induction', kind: 'concept',
    front: L('Loop invariant', 'Invariante de bucle', 'Invariante de laço'),
    back: L('True before the loop and kept by every iteration: induction applied to a loop.', 'Cierto antes del bucle y mantenido por cada iteración: inducción aplicada a un bucle.', 'Verdadeiro antes do laço e mantido por cada iteração: indução aplicada a um laço.') },
  { id: 'disc1-fc-7', lessonId: 'disc1-l3-divisibility-inequalities', kind: 'concept',
    front: L('Shifted induction', 'Inducción desplazada', 'Indução deslocada'),
    back: L('The base is $n_0 > 1$ because the claim fails before it; assume $k \\ge n_0$.', 'La base es $n_0 > 1$ porque la afirmación falla antes; se supone $k \\ge n_0$.', 'A base é $n_0 > 1$ porque a afirmação falha antes; supõe-se $k \\ge n_0$.') },
  { id: 'disc1-fc-8', lessonId: 'disc1-l3-divisibility-inequalities', kind: 'command',
    front: L('Rewrite $a^{k+1} - 1$ for a divisibility step', 'Reescribir $a^{k+1} - 1$ en un paso de divisibilidad', 'Reescrever $a^{k+1} - 1$ num passo de divisibilidade'),
    back: S('$a^{k+1} - 1 = a(a^k - 1) + (a - 1)$') },
  { id: 'disc1-fc-9', lessonId: 'disc1-l4-strong-induction', kind: 'distinction',
    front: L('Ordinary vs strong induction', 'Inducción ordinaria vs fuerte', 'Indução comum vs forte'),
    back: L('Ordinary assumes $P(k)$; strong assumes $P(n_0), \\dots, P(k)$ and needs one base per place the step reaches back.', 'La ordinaria supone $P(k)$; la fuerte supone $P(n_0), \\dots, P(k)$ y necesita una base por cada lugar que el paso mira atrás.', 'A comum supõe $P(k)$; a forte supõe $P(n_0), \\dots, P(k)$ e precisa de uma base para cada lugar que o passo olha para trás.') },
  { id: 'disc1-fc-10', lessonId: 'disc1-l5-recursion', kind: 'concept',
    front: L('Geometric sum, $r \\neq 1$', 'Suma geométrica, $r \\neq 1$', 'Soma geométrica, $r \\neq 1$'),
    back: S('$a + ar + \\dots + ar^n = \\frac{a(r^{n+1} - 1)}{r - 1}$') },
  { id: 'disc1-fc-11', lessonId: 'disc1-l5-recursion', kind: 'distinction',
    front: L('Recursive vs closed formula', 'Fórmula recursiva vs cerrada', 'Fórmula recursiva vs fechada'),
    back: L('Recursive: $a_0 = 5$, $a_n = a_{n-1} + 3$. Closed: $a_n = 5 + 3n$.', 'Recursiva: $a_0 = 5$, $a_n = a_{n-1} + 3$. Cerrada: $a_n = 5 + 3n$.', 'Recursiva: $a_0 = 5$, $a_n = a_{n-1} + 3$. Fechada: $a_n = 5 + 3n$.') },
];

/** Quiz for Discrete Mathematics, Week 1. */
export const discWeek1Questions: Question[] = [
  {
    id: 'disc1-q-fill-sigma', type: 'fill-blank', lessonId: 'disc1-l1-sigma',
    prompt: S('$\\sum_{k=1}^{4} (3k - 1) = $ ___'),
    accepted: ['26'],
    explanation: L('$2 + 5 + 8 + 11 = 26$.', '$2 + 5 + 8 + 11 = 26$.', '$2 + 5 + 8 + 11 = 26$.'),
  },
  {
    id: 'disc1-q-mc-factorial', type: 'multiple-choice', lessonId: 'disc1-l1-sigma',
    prompt: L('What is $\\frac{9!}{7!}$?', '¿Cuánto es $\\frac{9!}{7!}$?', 'Quanto é $\\frac{9!}{7!}$?'),
    options: [S('$2$'), S('$72$'), S('$\\frac{9}{7}$')],
    answer: 1,
    explanation: L('$\\frac{9 \\cdot 8 \\cdot 7!}{7!} = 72$. Factorials do not cancel to $(9-7)!$.', '$\\frac{9 \\cdot 8 \\cdot 7!}{7!} = 72$. Los factoriales no se cancelan como $(9-7)!$.', '$\\frac{9 \\cdot 8 \\cdot 7!}{7!} = 72$. Fatoriais não se cancelam como $(9-7)!$.'),
  },
  {
    id: 'disc1-q-tf-base', type: 'true-false', lessonId: 'disc1-l2-induction',
    prompt: L('True or false: if the step $P(k) \\Rightarrow P(k+1)$ is valid, the base case can be skipped.', 'Verdadero o falso: si el paso $P(k) \\Rightarrow P(k+1)$ es válido, se puede omitir el caso base.', 'Verdadeiro ou falso: se o passo $P(k) \\Rightarrow P(k+1)$ é válido, o caso base pode ser omitido.'),
    options: TF, answer: 1,
    explanation: L('False. $1 + \\dots + n = \\frac{n^2 + n + 1}{2}$ has a valid step but is never true.', 'Falso. $1 + \\dots + n = \\frac{n^2 + n + 1}{2}$ tiene un paso válido pero nunca es cierta.', 'Falso. $1 + \\dots + n = \\frac{n^2 + n + 1}{2}$ tem um passo válido mas nunca é verdadeira.'),
  },
  {
    id: 'disc1-q-mc-step', type: 'multiple-choice', lessonId: 'disc1-l2-induction',
    prompt: L('To prove $1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$, after the hypothesis you must show:', 'Para probar $1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$, tras la hipótesis hay que mostrar:', 'Para provar $1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$, depois da hipótese é preciso mostrar:'),
    options: [S('$\\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$'), S('$\\frac{k(k+1)}{2} + k = \\frac{(k+1)(k+2)}{2}$'), S('$1 = \\frac{1 \\cdot 2}{2}$')],
    answer: 0,
    explanation: L('The new term for $n = k+1$ is $k+1$, and the target is the formula with $k+1$.', 'El término nuevo para $n = k+1$ es $k+1$, y el objetivo es la fórmula con $k+1$.', 'O termo novo para $n = k+1$ é $k+1$, e o alvo é a fórmula com $k+1$.'),
  },
  {
    id: 'disc1-q-fill-base', type: 'fill-blank', lessonId: 'disc1-l3-divisibility-inequalities',
    prompt: L('Smallest $n_0$ such that $n! > 2^n$ for every $n \\ge n_0$: $n_0 = $ ___', 'Menor $n_0$ tal que $n! > 2^n$ para todo $n \\ge n_0$: $n_0 = $ ___', 'Menor $n_0$ tal que $n! > 2^n$ para todo $n \\ge n_0$: $n_0 = $ ___'),
    accepted: ['4'],
    explanation: L('$3! = 6 < 8$ but $4! = 24 > 16$, and the step keeps it.', '$3! = 6 < 8$ pero $4! = 24 > 16$, y el paso lo mantiene.', '$3! = 6 < 8$ mas $4! = 24 > 16$, e o passo o mantém.'),
  },
  {
    id: 'disc1-q-troubleshoot-div', type: 'troubleshooting', lessonId: 'disc1-l3-divisibility-inequalities',
    prompt: L('A step for "$4 \\mid 5^n + 3$" reads $5^{k+1} + 3 = 5(5^k + 3) = 5 \\cdot 4m$. What is wrong?', 'Un paso para "$4 \\mid 5^n + 3$" dice $5^{k+1} + 3 = 5(5^k + 3) = 5 \\cdot 4m$. ¿Qué está mal?', 'Um passo para "$4 \\mid 5^n + 3$" diz $5^{k+1} + 3 = 5(5^k + 3) = 5 \\cdot 4m$. O que está errado?'),
    options: [
      L('Nothing; it is correct.', 'Nada; es correcto.', 'Nada; está correto.'),
      L('$5(5^k + 3) = 5^{k+1} + 15$; it should be $5(5^k + 3) - 12$.', '$5(5^k + 3) = 5^{k+1} + 15$; debería ser $5(5^k + 3) - 12$.', '$5(5^k + 3) = 5^{k+1} + 15$; deveria ser $5(5^k + 3) - 12$.'),
      L('The hypothesis cannot be used for divisibility.', 'La hipótesis no se puede usar en divisibilidad.', 'A hipótese não pode ser usada em divisibilidade.'),
    ],
    answer: 1,
    explanation: L('Corrected: $20m - 12 = 4(5m - 3)$. The claim is true; the algebra was not.', 'Corregido: $20m - 12 = 4(5m - 3)$. La afirmación es cierta; el álgebra no.', 'Corrigido: $20m - 12 = 4(5m - 3)$. A afirmação é verdadeira; a álgebra não.'),
  },
  {
    id: 'disc1-q-sc-strong', type: 'scenario', lessonId: 'disc1-l4-strong-induction',
    prompt: L('To prove that every amount $n \\ge 10$ can be paid with coins of 3 and 5, applying the hypothesis to $n - 3$, which bases are needed?', 'Para probar que todo monto $n \\ge 10$ se paga con monedas de 3 y 5, aplicando la hipótesis a $n - 3$, ¿qué bases hacen falta?', 'Para provar que todo valor $n \\ge 10$ se paga com moedas de 3 e 5, aplicando a hipótese a $n - 3$, quais bases são necessárias?'),
    options: [S('10'), S('10, 11, 12'), S('10, 11, 12, 13, 14')],
    answer: 1,
    explanation: L('The step reaches back 3: $10 = 5 + 5$, $11 = 3 + 3 + 5$, $12 = 3 \\cdot 4$.', 'El paso mira 3 atrás: $10 = 5 + 5$, $11 = 3 + 3 + 5$, $12 = 3 \\cdot 4$.', 'O passo olha 3 para trás: $10 = 5 + 5$, $11 = 3 + 3 + 5$, $12 = 3 \\cdot 4$.'),
  },
  {
    id: 'disc1-q-fill-hanoi', type: 'fill-blank', lessonId: 'disc1-l5-recursion',
    prompt: L('$T(1) = 1$, $T(n) = 2T(n-1) + 1$. $T(8) = $ ___', '$T(1) = 1$, $T(n) = 2T(n-1) + 1$. $T(8) = $ ___', '$T(1) = 1$, $T(n) = 2T(n-1) + 1$. $T(8) = $ ___'),
    accepted: ['255'],
    explanation: L('$T(n) = 2^n - 1$, so $T(8) = 255$.', '$T(n) = 2^n - 1$, así que $T(8) = 255$.', '$T(n) = 2^n - 1$, então $T(8) = 255$.'),
  },
  {
    id: 'disc1-q-mc-geometric', type: 'multiple-choice', lessonId: 'disc1-l5-recursion',
    prompt: L('What is $\\sum_{i=0}^{4} 2 \\cdot 3^i$?', '¿Cuánto vale $\\sum_{i=0}^{4} 2 \\cdot 3^i$?', 'Quanto vale $\\sum_{i=0}^{4} 2 \\cdot 3^i$?'),
    options: [S('$242$'), S('$486$'), S('$162$')],
    answer: 0,
    explanation: L('$\\frac{2(3^5 - 1)}{3 - 1} = 242$, that is $2 + 6 + 18 + 54 + 162$.', '$\\frac{2(3^5 - 1)}{3 - 1} = 242$, es decir $2 + 6 + 18 + 54 + 162$.', '$\\frac{2(3^5 - 1)}{3 - 1} = 242$, ou seja $2 + 6 + 18 + 54 + 162$.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 1. */
export const discWeek1Activities: Activity[] = [
  {
    id: 'disc1-act-order-proof', kind: 'order', lessonId: 'disc1-l2-induction',
    title: L('Assemble an induction proof', 'Arma una demostración por inducción', 'Monte uma demonstração por indução'),
    prompt: L('Order the lines of the proof of $1 + 3 + \\dots + (2n-1) = n^2$.', 'Ordena las líneas de la demostración de $1 + 3 + \\dots + (2n-1) = n^2$.', 'Ordene as linhas da demonstração de $1 + 3 + \\dots + (2n-1) = n^2$.'),
    items: [
      L('Base: $1 = 1^2$', 'Base: $1 = 1^2$', 'Base: $1 = 1^2$'),
      L('Hypothesis: $1 + \\dots + (2k-1) = k^2$', 'Hipótesis: $1 + \\dots + (2k-1) = k^2$', 'Hipótese: $1 + \\dots + (2k-1) = k^2$'),
      L('Goal: $1 + \\dots + (2k+1) = (k+1)^2$', 'Objetivo: $1 + \\dots + (2k+1) = (k+1)^2$', 'Alvo: $1 + \\dots + (2k+1) = (k+1)^2$'),
      L('Use the hypothesis: $k^2 + (2k+1)$', 'Usar la hipótesis: $k^2 + (2k+1)$', 'Usar a hipótese: $k^2 + (2k+1)$'),
      L('Simplify: $(k+1)^2$, so it holds for all $n \\ge 1$', 'Simplificar: $(k+1)^2$, así que vale para todo $n \\ge 1$', 'Simplificar: $(k+1)^2$, então vale para todo $n \\ge 1$'),
    ],
    explanation: L('State the goal before the algebra, so you know where it must land.', 'Enuncia el objetivo antes del álgebra, así sabes dónde debe llegar.', 'Enuncie o alvo antes da álgebra, para saber onde ela precisa chegar.'),
  },
  {
    id: 'disc1-act-fill-sigma', kind: 'code-fill', lessonId: 'disc1-l1-sigma',
    title: L('Expand and add', 'Desarrolla y suma', 'Desenvolva e some'),
    prompt: L('Complete the terms and the total of $\\sum_{i=1}^{4} (2i + 1)$.', 'Completa los términos y el total de $\\sum_{i=1}^{4} (2i + 1)$.', 'Complete os termos e o total de $\\sum_{i=1}^{4} (2i + 1)$.'),
    template: 'i = 1 -> 3\ni = 2 -> {0}\ni = 3 -> 7\ni = 4 -> {1}\ntotal = {2}',
    blanks: ['5', '9', '24'],
    explanation: L('$3 + 5 + 7 + 9 = 24$; with the rules, $2 \\cdot 10 + 4 = 24$.', '$3 + 5 + 7 + 9 = 24$; con las reglas, $2 \\cdot 10 + 4 = 24$.', '$3 + 5 + 7 + 9 = 24$; com as regras, $2 \\cdot 10 + 4 = 24$.'),
  },
  {
    id: 'disc1-act-classify-base', kind: 'classify', lessonId: 'disc1-l3-divisibility-inequalities',
    title: L('Where does the base go?', '¿Dónde va la base?', 'Onde fica a base?'),
    prompt: L('Sort each claim by the smallest $n$ from which it holds forever.', 'Clasifica cada afirmación según el menor $n$ desde el que vale para siempre.', 'Classifique cada afirmação pelo menor $n$ a partir do qual vale para sempre.'),
    buckets: [L('From $n = 1$', 'Desde $n = 1$', 'A partir de $n = 1$'), L('From $n = 4$', 'Desde $n = 4$', 'A partir de $n = 4$'), L('From $n = 5$ or later', 'Desde $n = 5$ o después', 'A partir de $n = 5$ ou depois')],
    items: [
      { text: S('$2^n \\ge n + 1$'), bucket: 0 },
      { text: S('$n! > 2^n$'), bucket: 1 },
      { text: S('$2^n > n^2$'), bucket: 2 },
      { text: S('$2^n > 3n$'), bucket: 1 },
      { text: S('$3^n < n!$'), bucket: 2 },
      { text: S('$6 \\mid 7^n - 1$'), bucket: 0 },
    ],
    explanation: L('$4! = 24 > 16$; $2^4 = 16 > 12$; $2^5 = 32 > 25$; $3^n < n!$ only from $n = 7$.', '$4! = 24 > 16$; $2^4 = 16 > 12$; $2^5 = 32 > 25$; $3^n < n!$ solo desde $n = 7$.', '$4! = 24 > 16$; $2^4 = 16 > 12$; $2^5 = 32 > 25$; $3^n < n!$ só a partir de $n = 7$.'),
  },
  {
    id: 'disc1-act-classify-kind', kind: 'classify', lessonId: 'disc1-l4-strong-induction',
    title: L('Ordinary or strong?', '¿Ordinaria o fuerte?', 'Comum ou forte?'),
    prompt: L('Which kind of induction fits each proof best?', '¿Qué tipo de inducción encaja mejor en cada demostración?', 'Que tipo de indução combina melhor com cada demonstração?'),
    buckets: [L('Ordinary', 'Ordinaria', 'Comum'), L('Strong', 'Fuerte', 'Forte')],
    items: [
      { text: L('A formula for $1 + 2 + \\dots + n$', 'Una fórmula para $1 + 2 + \\dots + n$', 'Uma fórmula para $1 + 2 + \\dots + n$'), bucket: 0 },
      { text: L('Every $n \\ge 2$ is a product of primes', 'Todo $n \\ge 2$ es producto de primos', 'Todo $n \\ge 2$ é produto de primos'), bucket: 1 },
      { text: S('$F_n < 2^n$ (Fibonacci)'), bucket: 1 },
      { text: S('$3 \\mid 4^n + 2$'), bucket: 0 },
    ],
    explanation: L('Strong induction is for steps that need a case further back than $k$.', 'La inducción fuerte es para pasos que necesitan un caso más atrás que $k$.', 'A indução forte é para passos que precisam de um caso mais atrás que $k$.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 1, with worked answers. */
export const discWeek1Labs: Lab[] = [
  {
    id: 'disc1-lab-1-sums', kind: 'math', level: 1, minutes: 45,
    title: L('Sigma notation and first induction proofs', 'Notación sigma y primeras demostraciones', 'Notação sigma e primeiras demonstrações'),
    goal: L('Compute sums, rewrite them with sigma, and write complete proofs with base, hypothesis, and step.', 'Calcular sumas, escribirlas con sigma y redactar demostraciones completas con base, hipótesis y paso.', 'Calcular somas, escrevê-las com sigma e redigir demonstrações completas com base, hipótese e passo.'),
    steps: [
      { id: 'disc1-lab1-s1', title: L('Evaluate', 'Calcula', 'Calcule'), commands: ['$\\sum_{i=1}^{6} (2i - 1)$', '$\\sum_{j=0}^{3} (j + 2)^2$', '$\\sum_{k=3}^{6} 4$'],
        expected: L('$36$; $4 + 9 + 16 + 25 = 54$; four terms of 4: $16$.', '$36$; $4 + 9 + 16 + 25 = 54$; cuatro términos de 4: $16$.', '$36$; $4 + 9 + 16 + 25 = 54$; quatro termos de 4: $16$.') },
      { id: 'disc1-lab1-s2', title: L('Write with sigma', 'Escribe con sigma', 'Escreva com sigma'), commands: ['$4 + 7 + 10 + \\dots + 31$', '$\\frac{1}{2} + \\frac{1}{4} + \\dots + \\frac{1}{64}$'],
        expected: S('$\\sum_{i=1}^{10} (3i + 1)$; $\\sum_{i=1}^{6} \\frac{1}{2^i}$.') },
      { id: 'disc1-lab1-s3', title: L('Prove a sum formula', 'Demuestra una fórmula de suma', 'Prove uma fórmula de soma'), commands: ['$\\sum_{i=1}^{n} (2i + 3) = n(n + 4)$'],
        expected: L('Base: $5 = 1 \\cdot 5$. Step: $k(k+4) + 2k + 5 = k^2 + 6k + 5 = (k+1)(k+5)$. ∎', 'Base: $5 = 1 \\cdot 5$. Paso: $k(k+4) + 2k + 5 = k^2 + 6k + 5 = (k+1)(k+5)$. ∎', 'Base: $5 = 1 \\cdot 5$. Passo: $k(k+4) + 2k + 5 = k^2 + 6k + 5 = (k+1)(k+5)$. ∎') },
      { id: 'disc1-lab1-s4', title: L('Sum of squares', 'Suma de cuadrados', 'Soma de quadrados'), commands: ['$\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}$'],
        expected: L('Base: $1 = \\frac{6}{6}$. Step: $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \\frac{(k+1)(2k^2 + 7k + 6)}{6} = \\frac{(k+1)(k+2)(2k+3)}{6}$. ∎', 'Base: $1 = \\frac{6}{6}$. Paso: $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \\frac{(k+1)(2k^2 + 7k + 6)}{6} = \\frac{(k+1)(k+2)(2k+3)}{6}$. ∎', 'Base: $1 = \\frac{6}{6}$. Passo: $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \\frac{(k+1)(2k^2 + 7k + 6)}{6} = \\frac{(k+1)(k+2)(2k+3)}{6}$. ∎') },
      { id: 'disc1-lab1-s5', title: L('Factorials in a sum', 'Factoriales en una suma', 'Fatoriais numa soma'), commands: ['$\\sum_{i=1}^{n} \\frac{i}{(i+1)!} = 1 - \\frac{1}{(n+1)!}$'],
        expected: L('Base: $\\frac{1}{2} = 1 - \\frac{1}{2}$. Step: $1 - \\frac{1}{(k+1)!} + \\frac{k+1}{(k+2)!} = 1 - \\frac{(k+2) - (k+1)}{(k+2)!} = 1 - \\frac{1}{(k+2)!}$. ∎', 'Base: $\\frac{1}{2} = 1 - \\frac{1}{2}$. Paso: $1 - \\frac{1}{(k+1)!} + \\frac{k+1}{(k+2)!} = 1 - \\frac{(k+2) - (k+1)}{(k+2)!} = 1 - \\frac{1}{(k+2)!}$. ∎', 'Base: $\\frac{1}{2} = 1 - \\frac{1}{2}$. Passo: $1 - \\frac{1}{(k+1)!} + \\frac{k+1}{(k+2)!} = 1 - \\frac{(k+2) - (k+1)}{(k+2)!} = 1 - \\frac{1}{(k+2)!}$. ∎') },
    ],
  },
  {
    id: 'disc1-lab-2-shifted-strong', kind: 'math', level: 2, minutes: 50,
    title: L('Divisibility, inequalities, strong induction, and logarithms', 'Divisibilidad, desigualdades, inducción fuerte y logaritmos', 'Divisibilidade, desigualdades, indução forte e logaritmos'),
    goal: L('Choose the right base and the right kind of induction, then finish each proof.', 'Elegir la base y el tipo de inducción correctos y terminar cada demostración.', 'Escolher a base e o tipo de indução certos e terminar cada demonstração.'),
    steps: [
      { id: 'disc1-lab2-s1', title: L('Divisibility', 'Divisibilidad', 'Divisibilidade'), commands: ['$8 \\mid 9^n - 1$, $n \\ge 1$'],
        expected: L('Base: $8$. Step: $9^{k+1} - 1 = 9(9^k - 1) + 8 = 8(9m + 1)$. ∎', 'Base: $8$. Paso: $9^{k+1} - 1 = 9(9^k - 1) + 8 = 8(9m + 1)$. ∎', 'Base: $8$. Passo: $9^{k+1} - 1 = 9(9^k - 1) + 8 = 8(9m + 1)$. ∎') },
      { id: 'disc1-lab2-s2', title: L('Find the base, then prove', 'Halla la base y demuestra', 'Ache a base e prove'), commands: ['$3^n > 2n + 5$'],
        expected: L('$n = 1$: $3 > 7$ no; $n = 2$: $9 > 9$ no; $n = 3$: $27 > 11$ yes. Step ($k \\ge 3$): $3^{k+1} > 3(2k + 5) = 6k + 15 > 2k + 7$. ∎', '$n = 1$: $3 > 7$ no; $n = 2$: $9 > 9$ no; $n = 3$: $27 > 11$ sí. Paso ($k \\ge 3$): $3^{k+1} > 3(2k + 5) = 6k + 15 > 2k + 7$. ∎', '$n = 1$: $3 > 7$ não; $n = 2$: $9 > 9$ não; $n = 3$: $27 > 11$ sim. Passo ($k \\ge 3$): $3^{k+1} > 3(2k + 5) = 6k + 15 > 2k + 7$. ∎') },
      { id: 'disc1-lab2-s3', title: L('Bernoulli\'s inequality', 'Desigualdad de Bernoulli', 'Desigualdade de Bernoulli'), commands: ['$(1 + x)^n \\ge 1 + nx$, $x \\ge -1$, $n \\ge 1$'],
        expected: L('Base: equality. Step: $(1+x)^{k+1} \\ge (1 + kx)(1 + x)$ because $1 + x \\ge 0$, and that is $1 + (k+1)x + kx^2 \\ge 1 + (k+1)x$. ∎', 'Base: igualdad. Paso: $(1+x)^{k+1} \\ge (1 + kx)(1 + x)$ porque $1 + x \\ge 0$, y eso es $1 + (k+1)x + kx^2 \\ge 1 + (k+1)x$. ∎', 'Base: igualdade. Passo: $(1+x)^{k+1} \\ge (1 + kx)(1 + x)$ porque $1 + x \\ge 0$, e isso é $1 + (k+1)x + kx^2 \\ge 1 + (k+1)x$. ∎') },
      { id: 'disc1-lab2-s4', title: L('Strong induction with coins', 'Inducción fuerte con monedas', 'Indução forte com moedas'), commands: ['$n = 4a + 7b$ for every $n \\ge 18$, $a, b \\ge 0$'],
        expected: L('Bases: $18 = 4 + 14$, $19 = 12 + 7$, $20 = 4 \\cdot 5$, $21 = 7 \\cdot 3$. Step: $n \\ge 22$ uses $n - 4 \\ge 18$ plus one 4. (17 is impossible.)', 'Bases: $18 = 4 + 14$, $19 = 12 + 7$, $20 = 4 \\cdot 5$, $21 = 7 \\cdot 3$. Paso: $n \\ge 22$ usa $n - 4 \\ge 18$ más un 4. (17 es imposible.)', 'Bases: $18 = 4 + 14$, $19 = 12 + 7$, $20 = 4 \\cdot 5$, $21 = 7 \\cdot 3$. Passo: $n \\ge 22$ usa $n - 4 \\ge 18$ mais um 4. (17 é impossível.)') },
      { id: 'disc1-lab2-s5', title: L('A telescoping log sum', 'Una suma de logaritmos telescópica', 'Uma soma de logaritmos telescópica'), commands: ['$\\sum_{i=1}^{n} \\ln\\frac{i+2}{i+1} = \\ln\\frac{n+2}{2}$'],
        expected: L('Base: $\\ln\\frac{3}{2}$. Step: $\\ln\\frac{k+2}{2} + \\ln\\frac{k+3}{k+2} = \\ln\\frac{k+3}{2}$. ∎', 'Base: $\\ln\\frac{3}{2}$. Paso: $\\ln\\frac{k+2}{2} + \\ln\\frac{k+3}{k+2} = \\ln\\frac{k+3}{2}$. ∎', 'Base: $\\ln\\frac{3}{2}$. Passo: $\\ln\\frac{k+2}{2} + \\ln\\frac{k+3}{k+2} = \\ln\\frac{k+3}{2}$. ∎') },
    ],
  },
];
