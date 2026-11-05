import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 5. */
export const discWeek5Flashcards: Flashcard[] = [
  { id: 'disc5-fc-1', lessonId: 'disc5-l1-rules', kind: 'distinction',
    front: L('Product rule vs sum rule', 'Regla del producto vs de la suma', 'Regra do produto vs da soma'),
    back: L('Steps in sequence multiply; disjoint alternatives add.', 'Los pasos en secuencia se multiplican; las alternativas disjuntas se suman.', 'Passos em sequência se multiplicam; alternativas disjuntas se somam.') },
  { id: 'disc5-fc-2', lessonId: 'disc5-l2-permutations', kind: 'concept',
    front: S('$P(n, r)$'),
    back: L('Ordered choices of $r$ from $n$, no repeats: $\\frac{n!}{(n-r)!}$.', 'Elecciones ordenadas de $r$ entre $n$, sin repetir: $\\frac{n!}{(n-r)!}$.', 'Escolhas ordenadas de $r$ entre $n$, sem repetir: $\\frac{n!}{(n-r)!}$.') },
  { id: 'disc5-fc-3', lessonId: 'disc5-l2-permutations', kind: 'concept',
    front: L('Arrangements around a circle', 'Ordenaciones en círculo', 'Arranjos em círculo'),
    back: S('$(n - 1)!$') },
  { id: 'disc5-fc-4', lessonId: 'disc5-l2-permutations', kind: 'concept',
    front: L('Arrangements with identical items', 'Ordenaciones con elementos repetidos', 'Arranjos com elementos repetidos'),
    back: S('$\\frac{n!}{n_1!\\,n_2! \\cdots n_k!}$') },
  { id: 'disc5-fc-5', lessonId: 'disc5-l3-combinations', kind: 'concept',
    front: S('$\\binom{n}{k}$'),
    back: L('Unordered choices of $k$ from $n$: $\\frac{n!}{k!\\,(n-k)!}$.', 'Elecciones sin orden de $k$ entre $n$: $\\frac{n!}{k!\\,(n-k)!}$.', 'Escolhas sem ordem de $k$ entre $n$: $\\frac{n!}{k!\\,(n-k)!}$.') },
  { id: 'disc5-fc-6', lessonId: 'disc5-l3-combinations', kind: 'concept',
    front: L('Combinations with repetition', 'Combinaciones con repetición', 'Combinações com repetição'),
    back: L('$\\binom{n + k - 1}{k}$: $k$ items from $n$ kinds (stars and bars).', '$\\binom{n + k - 1}{k}$: $k$ objetos de $n$ tipos (estrellas y barras).', '$\\binom{n + k - 1}{k}$: $k$ objetos de $n$ tipos (estrelas e barras).') },
  { id: 'disc5-fc-7', lessonId: 'disc5-l4-binomial', kind: 'concept',
    front: L('Binomial theorem', 'Teorema del binomio', 'Teorema binomial'),
    back: S('$(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k$') },
  { id: 'disc5-fc-8', lessonId: 'disc5-l4-binomial', kind: 'concept',
    front: L('Pascal\'s identity', 'Identidad de Pascal', 'Identidade de Pascal'),
    back: S('$\\binom{n}{k} + \\binom{n}{k+1} = \\binom{n+1}{k+1}$') },
  { id: 'disc5-fc-9', lessonId: 'disc5-l5-pigeonhole', kind: 'concept',
    front: L('Generalised pigeonhole principle', 'Principio del palomar generalizado', 'Princípio da casa dos pombos generalizado'),
    back: L('$N$ objects in $k$ boxes: some box has at least $\\lceil N/k \\rceil$.', '$N$ objetos en $k$ cajas: alguna tiene al menos $\\lceil N/k \\rceil$.', '$N$ objetos em $k$ caixas: alguma tem pelo menos $\\lceil N/k \\rceil$.') },
  { id: 'disc5-fc-10', lessonId: 'disc5-l6-probability', kind: 'concept',
    front: L('Classical probability and complement', 'Probabilidad clásica y complemento', 'Probabilidade clássica e complemento'),
    back: S('$P(E) = \\frac{|E|}{|S|}$, $P(E^c) = 1 - P(E)$') },
  { id: 'disc5-fc-11', lessonId: 'disc5-l6-probability', kind: 'concept',
    front: L('Exactly $k$ successes in $n$ trials', 'Exactamente $k$ éxitos en $n$ ensayos', 'Exatamente $k$ sucessos em $n$ ensaios'),
    back: S('$\\binom{n}{k} p^k (1 - p)^{n-k}$') },
];

/** Quiz for Discrete Mathematics, Week 5. */
export const discWeek5Questions: Question[] = [
  {
    id: 'disc5-q-fill-product', type: 'fill-blank', lessonId: 'disc5-l1-rules',
    prompt: L('A menu offers 3 starters, 5 mains, and 2 desserts. How many 3-course meals? ___', 'Un menú ofrece 3 entradas, 5 platos de fondo y 2 postres. ¿Cuántas comidas de 3 tiempos? ___', 'Um cardápio oferece 3 entradas, 5 pratos principais e 2 sobremesas. Quantas refeições de 3 etapas? ___'),
    accepted: ['30'],
    explanation: S('$3 \\cdot 5 \\cdot 2 = 30$.'),
  },
  {
    id: 'disc5-q-matching-formula', type: 'matching', lessonId: 'disc5-l3-combinations',
    prompt: L('Match each situation with its count.', 'Une cada situación con su conteo.', 'Ligue cada situação à sua contagem.'),
    left: [
      L('Gold, silver, bronze among 10 runners', 'Oro, plata y bronce entre 10 corredores', 'Ouro, prata e bronze entre 10 corredores'),
      L('3 flavours (all different) from 10', '3 sabores (distintos) de 10', '3 sabores (diferentes) de 10'),
      L('3-character code from 10 digits', 'Código de 3 caracteres con 10 dígitos', 'Código de 3 caracteres com 10 dígitos'),
      L('3 scoops from 10 flavours, repeats allowed', '3 bolas de 10 sabores, con repetición', '3 bolas de 10 sabores, com repetição'),
    ],
    right: [S('1000'), S('220'), S('720'), S('120')],
    answer: [2, 3, 0, 1],
    explanation: L('$P(10, 3) = 720$, $\\binom{10}{3} = 120$, $10^3 = 1000$, $\\binom{12}{3} = 220$.', '$P(10, 3) = 720$, $\\binom{10}{3} = 120$, $10^3 = 1000$, $\\binom{12}{3} = 220$.', '$P(10, 3) = 720$, $\\binom{10}{3} = 120$, $10^3 = 1000$, $\\binom{12}{3} = 220$.'),
  },
  {
    id: 'disc5-q-mc-word', type: 'multiple-choice', lessonId: 'disc5-l2-permutations',
    prompt: L('How many distinct arrangements does the word ARROZ have?', '¿Cuántas ordenaciones distintas tiene la palabra ARROZ?', 'Quantos arranjos distintos tem a palavra ARROZ?'),
    options: [S('$120$'), S('$60$'), S('$24$')],
    answer: 1,
    explanation: L('Two R: $\\frac{5!}{2!} = 60$.', 'Dos R: $\\frac{5!}{2!} = 60$.', 'Dois R: $\\frac{5!}{2!} = 60$.'),
  },
  {
    id: 'disc5-q-tf-symmetry', type: 'true-false', lessonId: 'disc5-l4-binomial',
    prompt: L('True or false: $\\binom{20}{17} = \\binom{20}{3}$.', 'Verdadero o falso: $\\binom{20}{17} = \\binom{20}{3}$.', 'Verdadeiro ou falso: $\\binom{20}{17} = \\binom{20}{3}$.'),
    options: TF, answer: 0,
    explanation: L('Choosing 17 to keep is choosing 3 to leave out: both are 1140.', 'Elegir 17 para quedarte es elegir 3 para dejar: ambos valen 1140.', 'Escolher 17 para ficar é escolher 3 para deixar: ambos valem 1140.'),
  },
  {
    id: 'disc5-q-fill-binom', type: 'fill-blank', lessonId: 'disc5-l4-binomial',
    prompt: L('Coefficient of $x^2y^2$ in $(x + y)^4$: ___', 'Coeficiente de $x^2y^2$ en $(x + y)^4$: ___', 'Coeficiente de $x^2y^2$ em $(x + y)^4$: ___'),
    accepted: ['6'],
    explanation: S('$\\binom{4}{2} = 6$.'),
  },
  {
    id: 'disc5-q-sc-pigeon', type: 'scenario', lessonId: 'disc5-l5-pigeonhole',
    prompt: L('A server assigns each of 50 requests to one of 7 workers. What is the most you can guarantee about the busiest worker?', 'Un servidor asigna cada una de 50 solicitudes a uno de 7 procesos. ¿Qué es lo máximo que puedes garantizar del proceso más ocupado?', 'Um servidor atribui cada uma de 50 requisições a um de 7 processos. O que se pode garantir, no máximo, sobre o processo mais ocupado?'),
    options: [L('At least 7 requests', 'Al menos 7 solicitudes', 'Pelo menos 7 requisições'), L('At least 8 requests', 'Al menos 8 solicitudes', 'Pelo menos 8 requisições'), L('Exactly 50/7 requests', 'Exactamente 50/7 solicitudes', 'Exatamente 50/7 requisições')],
    answer: 1,
    explanation: L('$\\lceil 50/7 \\rceil = 8$, because $7 \\cdot 7 = 49 < 50$.', '$\\lceil 50/7 \\rceil = 8$, porque $7 \\cdot 7 = 49 < 50$.', '$\\lceil 50/7 \\rceil = 8$, porque $7 \\cdot 7 = 49 < 50$.'),
  },
  {
    id: 'disc5-q-mc-prob', type: 'multiple-choice', lessonId: 'disc5-l6-probability',
    prompt: L('Two cards are drawn from a 52-card deck. What is the probability both are hearts?', 'Se sacan dos cartas de un mazo de 52. ¿Cuál es la probabilidad de que ambas sean corazones?', 'Tiram-se duas cartas de um baralho de 52. Qual é a probabilidade de ambas serem copas?'),
    options: [S('$\\frac{1}{16}$'), S('$\\frac{1}{17}$'), S('$\\frac{1}{4}$')],
    answer: 1,
    explanation: L('$\\frac{\\binom{13}{2}}{\\binom{52}{2}} = \\frac{78}{1326} = \\frac{1}{17}$. $\\frac{1}{16}$ would be with replacement.', '$\\frac{\\binom{13}{2}}{\\binom{52}{2}} = \\frac{78}{1326} = \\frac{1}{17}$. $\\frac{1}{16}$ sería con reposición.', '$\\frac{\\binom{13}{2}}{\\binom{52}{2}} = \\frac{78}{1326} = \\frac{1}{17}$. $\\frac{1}{16}$ seria com reposição.'),
  },
  {
    id: 'disc5-q-troubleshoot-indep', type: 'troubleshooting', lessonId: 'disc5-l6-probability',
    prompt: L('A student computes "at least one 6 in 3 rolls" as $\\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} = \\frac{1}{2}$. What is wrong?', 'Un estudiante calcula "al menos un 6 en 3 tiradas" como $\\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} = \\frac{1}{2}$. ¿Qué está mal?', 'Um estudante calcula "pelo menos um 6 em 3 lançamentos" como $\\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} = \\frac{1}{2}$. O que está errado?'),
    options: [
      L('Nothing.', 'Nada.', 'Nada.'),
      L('The events overlap; the answer is $1 - \\left(\\frac{5}{6}\\right)^3 = \\frac{91}{216}$.', 'Los eventos se solapan; la respuesta es $1 - \\left(\\frac{5}{6}\\right)^3 = \\frac{91}{216}$.', 'Os eventos se sobrepõem; a resposta é $1 - \\left(\\frac{5}{6}\\right)^3 = \\frac{91}{216}$.'),
      L('It should be $\\left(\\frac{1}{6}\\right)^3$.', 'Debería ser $\\left(\\frac{1}{6}\\right)^3$.', 'Deveria ser $\\left(\\frac{1}{6}\\right)^3$.'),
    ],
    answer: 1,
    explanation: L('Adding counts the cases with two or three sixes more than once; the complement avoids that.', 'Sumar cuenta más de una vez los casos con dos o tres seises; el complemento lo evita.', 'Somar conta mais de uma vez os casos com dois ou três seis; o complemento evita isso.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 5. */
export const discWeek5Activities: Activity[] = [
  {
    id: 'disc5-act-classify-technique', kind: 'classify', lessonId: 'disc5-l3-combinations',
    title: L('Which technique?', '¿Qué técnica?', 'Que técnica?'),
    prompt: L('Sort each problem by the formula it needs.', 'Clasifica cada problema según la fórmula que necesita.', 'Classifique cada problema pela fórmula que ele precisa.'),
    buckets: [S('$P(n, k)$'), S('$\\binom{n}{k}$'), S('$n^k$'), S('$\\binom{n+k-1}{k}$')],
    items: [
      { text: L('President and treasurer of a club of 20', 'Presidente y tesorero de un club de 20', 'Presidente e tesoureiro de um clube de 20'), bucket: 0 },
      { text: L('4 books to take from a shelf of 15', '4 libros para llevar de un estante de 15', '4 livros para levar de uma estante de 15'), bucket: 1 },
      { text: L('A 6-digit lock code', 'Un código de candado de 6 dígitos', 'Um código de cadeado de 6 dígitos'), bucket: 2 },
      { text: L('A dozen donuts from 5 kinds', 'Una docena de donas de 5 tipos', 'Uma dúzia de donuts de 5 tipos'), bucket: 3 },
      { text: L('The first 3 places of a 12-team league', 'Los 3 primeros puestos de una liga de 12 equipos', 'Os 3 primeiros lugares de uma liga de 12 times'), bucket: 0 },
      { text: L('A 5-question true/false answer sheet', 'Una hoja de respuestas de 5 preguntas verdadero/falso', 'Uma folha de respostas de 5 questões verdadeiro/falso'), bucket: 2 },
    ],
    explanation: L('Order? Repetition? Those two answers pick the formula.', '¿Orden? ¿Repetición? Esas dos respuestas eligen la fórmula.', 'Ordem? Repetição? Essas duas respostas escolhem a fórmula.'),
  },
  {
    id: 'disc5-act-fill-pascal', kind: 'code-fill', lessonId: 'disc5-l4-binomial',
    title: L('Complete Pascal\'s triangle', 'Completa el triángulo de Pascal', 'Complete o triângulo de Pascal'),
    prompt: L('Fill in the missing entries of rows 6 and 7.', 'Completa las entradas que faltan de las filas 6 y 7.', 'Complete as entradas que faltam das linhas 6 e 7.'),
    template: 'row 6: 1  6  15  {0}  15  6  1\nrow 7: 1  7  {1}  35  {2}  21  7  1',
    blanks: ['20', '21', '35'],
    explanation: L('Each entry is the sum of the two above: $15 + 20 = 35$, $6 + 15 = 21$.', 'Cada entrada es la suma de las dos de arriba: $15 + 20 = 35$, $6 + 15 = 21$.', 'Cada entrada é a soma das duas de cima: $15 + 20 = 35$, $6 + 15 = 21$.'),
  },
  {
    id: 'disc5-act-order-prob', kind: 'order', lessonId: 'disc5-l6-probability',
    title: L('Solve a probability problem', 'Resuelve un problema de probabilidad', 'Resolva um problema de probabilidade'),
    prompt: L('Order the steps for "the probability that a 5-card hand has exactly 2 aces".', 'Ordena los pasos para "la probabilidad de que una mano de 5 cartas tenga exactamente 2 ases".', 'Ordene os passos para "a probabilidade de uma mão de 5 cartas ter exatamente 2 ases".'),
    items: [
      L('Sample space: $|S| = \\binom{52}{5} = 2\\,598\\,960$', 'Espacio muestral: $|S| = \\binom{52}{5} = 2\\,598\\,960$', 'Espaço amostral: $|S| = \\binom{52}{5} = 2\\,598\\,960$'),
      L('Choose the aces: $\\binom{4}{2} = 6$', 'Elegir los ases: $\\binom{4}{2} = 6$', 'Escolher os ases: $\\binom{4}{2} = 6$'),
      L('Choose the rest: $\\binom{48}{3} = 17\\,296$', 'Elegir el resto: $\\binom{48}{3} = 17\\,296$', 'Escolher o resto: $\\binom{48}{3} = 17\\,296$'),
      L('Multiply: $|E| = 103\\,776$', 'Multiplicar: $|E| = 103\\,776$', 'Multiplicar: $|E| = 103\\,776$'),
      L('Divide: $P \\approx 0.040$', 'Dividir: $P \\approx 0{,}040$', 'Dividir: $P \\approx 0{,}040$'),
    ],
    explanation: L('Count the space, count the event with the product rule, then divide.', 'Cuenta el espacio, cuenta el evento con la regla del producto y divide.', 'Conte o espaço, conte o evento com a regra do produto e divida.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 5, with worked answers. */
export const discWeek5Labs: Lab[] = [
  {
    id: 'disc5-lab-1-counting', kind: 'math', level: 1, minutes: 50,
    title: L('Selections of every type', 'Selecciones de todo tipo', 'Seleções de todo tipo'),
    goal: L('Decide whether order and repetition matter, then count: variations, permutations, and combinations with and without repetition.', 'Decidir si importan el orden y la repetición y luego contar: variaciones, permutaciones y combinaciones con y sin repetición.', 'Decidir se importam a ordem e a repetição e depois contar: arranjos, permutações e combinações com e sem repetição.'),
    steps: [
      { id: 'disc5-lab1-s1', title: L('Sum and product', 'Suma y producto', 'Soma e produto'), commands: ['License codes: 3 letters (26) then 3 digits, letters not repeated', 'How many 5-bit strings start with 1 or end with 11?'],
        expected: L('$26 \\cdot 25 \\cdot 24 \\cdot 10^3 = 15\\,600\\,000$. $16 + 8 - 4 = 20$.', '$26 \\cdot 25 \\cdot 24 \\cdot 10^3 = 15\\,600\\,000$. $16 + 8 - 4 = 20$.', '$26 \\cdot 25 \\cdot 24 \\cdot 10^3 = 15\\,600\\,000$. $16 + 8 - 4 = 20$.') },
      { id: 'disc5-lab1-s2', title: L('Variations', 'Variaciones', 'Arranjos'), commands: ['4-digit numbers with distinct digits from $\\{1, \\dots, 9\\}$ that start with 5', 'A playlist of 4 songs chosen and ordered from 12'],
        expected: S('$8 \\cdot 7 \\cdot 6 = 336$; $P(12, 4) = 11\\,880$.') },
      { id: 'disc5-lab1-s3', title: L('Permutations', 'Permutaciones', 'Permutações'), commands: ['Arrange the letters of PAPAYA', 'Seat 8 people at a round table'],
        expected: L('$\\frac{6!}{3!\\,2!} = 60$ (three A, two P); $7! = 5040$.', '$\\frac{6!}{3!\\,2!} = 60$ (tres A, dos P); $7! = 5040$.', '$\\frac{6!}{3!\\,2!} = 60$ (três A, dois P); $7! = 5040$.') },
      { id: 'disc5-lab1-s4', title: L('Combinations', 'Combinaciones', 'Combinações'), commands: ['A 6-person jury from 9 women and 7 men with 3 of each', 'A 5-card hand that is a flush (all one suit, straights included)'],
        expected: S('$\\binom{9}{3}\\binom{7}{3} = 84 \\cdot 35 = 2940$; $4\\binom{13}{5} = 4 \\cdot 1287 = 5148$.') },
      { id: 'disc5-lab1-s5', title: L('With repetition', 'Con repetición', 'Com repetição'), commands: ['Integer solutions of $a + b + c + d = 8$ with $a, b, c, d \\ge 0$', 'Same, with every variable $\\ge 1$'],
        expected: L('$\\binom{11}{3} = 165$. Give 1 to each first: $\\binom{7}{3} = 35$.', '$\\binom{11}{3} = 165$. Primero se da 1 a cada una: $\\binom{7}{3} = 35$.', '$\\binom{11}{3} = 165$. Primeiro dá-se 1 a cada uma: $\\binom{7}{3} = 35$.') },
    ],
  },
  {
    id: 'disc5-lab-2-binomial-prob', kind: 'math', level: 2, minutes: 50,
    title: L('Binomial, multinomial, pigeonhole, and probability', 'Binomio, multinomio, palomar y probabilidad', 'Binômio, multinômio, casa dos pombos e probabilidade'),
    goal: L('Use the binomial and multinomial theorems, the pigeonhole principle, and counting-based probability.', 'Usar los teoremas del binomio y multinomial, el palomar y la probabilidad basada en conteo.', 'Usar os teoremas binomial e multinomial, a casa dos pombos e a probabilidade baseada em contagem.'),
    steps: [
      { id: 'disc5-lab2-s1', title: L('Binomial expansion', 'Desarrollo del binomio', 'Desenvolvimento do binômio'), commands: ['Expand $(a + 2b)^4$'],
        expected: S('$a^4 + 8a^3b + 24a^2b^2 + 32ab^3 + 16b^4$.') },
      { id: 'disc5-lab2-s2', title: L('Multinomial', 'Multinomial', 'Multinomial'), commands: ['Coefficient of $x^2 y^3 z$ in $(x + y + z)^6$', 'Split 8 players into labelled groups of 3, 3, 2'],
        expected: S('$\\frac{6!}{2!\\,3!\\,1!} = 60$; $\\frac{8!}{3!\\,3!\\,2!} = 560$.') },
      { id: 'disc5-lab2-s3', title: L('Pigeonhole', 'Palomar', 'Casa dos pombos'), commands: ['Prove: among any 6 integers, two have the same remainder mod 5'],
        expected: L('There are 5 remainders (boxes) and 6 integers (objects), so two share a box.', 'Hay 5 restos (cajas) y 6 enteros (objetos), así que dos comparten caja.', 'Há 5 restos (caixas) e 6 inteiros (objetos), então dois dividem uma caixa.') },
      { id: 'disc5-lab2-s4', title: L('Inclusion–exclusion', 'Inclusión–exclusión', 'Inclusão–exclusão'), commands: ['Integers in $1, \\dots, 500$ divisible by 2, 3, or 5'],
        expected: S('$250 + 166 + 100 - 83 - 50 - 33 + 16 = 366$.') },
      { id: 'disc5-lab2-s5', title: L('Probability', 'Probabilidad', 'Probabilidade'), commands: ['A bag has 4 green and 6 yellow marbles; draw 3. $P(\\text{exactly 2 green})$?', 'A coin is tossed 6 times. $P(\\text{at least one head})$?'],
        expected: S('$\\frac{\\binom{4}{2}\\binom{6}{1}}{\\binom{10}{3}} = \\frac{36}{120} = \\frac{3}{10}$; $1 - \\frac{1}{64} = \\frac{63}{64}$.') },
    ],
  },
];
