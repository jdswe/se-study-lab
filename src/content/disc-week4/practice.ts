import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 4. */
export const discWeek4Flashcards: Flashcard[] = [
  { id: 'disc4-fc-1', lessonId: 'disc4-l1-definition', kind: 'concept',
    front: L('When is a relation $f \\subseteq A \\times B$ a function?', '¿Cuándo una relación $f \\subseteq A \\times B$ es función?', 'Quando uma relação $f \\subseteq A \\times B$ é função?'),
    back: L('Every $x \\in A$ has exactly one $y$ with $(x, y) \\in f$.', 'Todo $x \\in A$ tiene exactamente un $y$ con $(x, y) \\in f$.', 'Todo $x \\in A$ tem exatamente um $y$ com $(x, y) \\in f$.') },
  { id: 'disc4-fc-2', lessonId: 'disc4-l1-definition', kind: 'distinction',
    front: L('Codomain vs range', 'Codominio vs rango', 'Contradomínio vs imagem'),
    back: L('Codomain: where outputs may land ($B$). Range: outputs actually reached.', 'Codominio: donde pueden caer las salidas ($B$). Rango: salidas alcanzadas de verdad.', 'Contradomínio: onde as saídas podem cair ($B$). Imagem: saídas realmente atingidas.') },
  { id: 'disc4-fc-3', lessonId: 'disc4-l1-definition', kind: 'concept',
    front: L('Preimage $f^{-1}(D)$', 'Preimagen $f^{-1}(D)$', 'Pré-imagem $f^{-1}(D)$'),
    back: L('$\\{x \\in A \\mid f(x) \\in D\\}$; it exists for every function.', '$\\{x \\in A \\mid f(x) \\in D\\}$; existe para toda función.', '$\\{x \\in A \\mid f(x) \\in D\\}$; existe para toda função.') },
  { id: 'disc4-fc-4', lessonId: 'disc4-l2-injective-surjective', kind: 'concept',
    front: L('Injective', 'Inyectiva', 'Injetora'),
    back: S('$f(a) = f(b) \\Rightarrow a = b$') },
  { id: 'disc4-fc-5', lessonId: 'disc4-l2-injective-surjective', kind: 'concept',
    front: L('Surjective', 'Sobreyectiva', 'Sobrejetora'),
    back: L('$\\operatorname{Im}(f) = B$: every $y \\in B$ has a preimage.', '$\\operatorname{Im}(f) = B$: todo $y \\in B$ tiene preimagen.', '$\\operatorname{Im}(f) = B$: todo $y \\in B$ tem pré-imagem.') },
  { id: 'disc4-fc-6', lessonId: 'disc4-l2-injective-surjective', kind: 'distinction',
    front: L('Vertical vs horizontal line test', 'Prueba de la recta vertical vs horizontal', 'Teste da reta vertical vs horizontal'),
    back: L('Vertical: is it a function? Horizontal: is it injective?', 'Vertical: ¿es función? Horizontal: ¿es inyectiva?', 'Vertical: é função? Horizontal: é injetora?') },
  { id: 'disc4-fc-7', lessonId: 'disc4-l3-composition-inverse', kind: 'concept',
    front: S('$(g \\circ f)(x)$'),
    back: L('$g(f(x))$: first $f$, then $g$.', '$g(f(x))$: primero $f$, luego $g$.', '$g(f(x))$: primeiro $f$, depois $g$.') },
  { id: 'disc4-fc-8', lessonId: 'disc4-l3-composition-inverse', kind: 'concept',
    front: L('When does $f^{-1}$ exist?', '¿Cuándo existe $f^{-1}$?', 'Quando existe $f^{-1}$?'),
    back: L('Exactly when $f$ is bijective. Also $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.', 'Exactamente cuando $f$ es biyectiva. Además $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.', 'Exatamente quando $f$ é bijetora. Também $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.') },
  { id: 'disc4-fc-9', lessonId: 'disc4-l4-special', kind: 'concept',
    front: L('Characteristic function $\\chi_A$', 'Función característica $\\chi_A$', 'Função característica $\\chi_A$'),
    back: L('$1$ on $A$, $0$ outside: a subset stored as bits.', '$1$ en $A$, $0$ fuera: un subconjunto guardado como bits.', '$1$ em $A$, $0$ fora: um subconjunto guardado como bits.') },
  { id: 'disc4-fc-10', lessonId: 'disc4-l5-growth', kind: 'command',
    front: L('Number of functions $A \\to B$', 'Número de funciones $A \\to B$', 'Número de funções $A \\to B$'),
    back: S('$|B|^{|A|}$') },
];

/** Quiz for Discrete Mathematics, Week 4. */
export const discWeek4Questions: Question[] = [
  {
    id: 'disc4-q-mc-isfunction', type: 'multiple-choice', lessonId: 'disc4-l1-definition',
    prompt: L('Which rule defines a function from $\\mathbb{R}$ to $\\mathbb{R}$?', '¿Qué regla define una función de $\\mathbb{R}$ en $\\mathbb{R}$?', 'Qual regra define uma função de $\\mathbb{R}$ em $\\mathbb{R}$?'),
    options: [S('$f(x) = \\sqrt{x}$'), S('$f(x) = \\frac{1}{x}$'), S('$f(x) = x^3 - x$')],
    answer: 2,
    explanation: L('$\\sqrt{x}$ fails for $x < 0$ and $\\frac{1}{x}$ fails at $0$; $x^3 - x$ gives one value for every real.', '$\\sqrt{x}$ falla para $x < 0$ y $\\frac{1}{x}$ falla en $0$; $x^3 - x$ da un valor para cada real.', '$\\sqrt{x}$ falha para $x < 0$ e $\\frac{1}{x}$ falha em $0$; $x^3 - x$ dá um valor para cada real.'),
  },
  {
    id: 'disc4-q-fill-preimage', type: 'fill-blank', lessonId: 'disc4-l1-definition',
    prompt: L('$f(x) = x \\bmod 4$ on $\\{0, \\dots, 11\\}$. How many elements does $f^{-1}(\\{1\\})$ have? ___', '$f(x) = x \\bmod 4$ en $\\{0, \\dots, 11\\}$. ¿Cuántos elementos tiene $f^{-1}(\\{1\\})$? ___', '$f(x) = x \\bmod 4$ em $\\{0, \\dots, 11\\}$. Quantos elementos tem $f^{-1}(\\{1\\})$? ___'),
    accepted: ['3'],
    explanation: L('$\\{1, 5, 9\\}$.', '$\\{1, 5, 9\\}$.', '$\\{1, 5, 9\\}$.'),
  },
  {
    id: 'disc4-q-matching-types', type: 'matching', lessonId: 'disc4-l2-injective-surjective',
    prompt: L('Match each function with its type.', 'Une cada función con su tipo.', 'Ligue cada função ao seu tipo.'),
    left: [S('$x \\mapsto 3x - 1$, $\\mathbb{R} \\to \\mathbb{R}$'), S('$x \\mapsto x^2$, $\\mathbb{R} \\to \\mathbb{R}$'), S('$n \\mapsto 2n$, $\\mathbb{Z} \\to \\mathbb{Z}$'), S('$x \\mapsto \\lfloor x \\rfloor$, $\\mathbb{R} \\to \\mathbb{Z}$')],
    right: [L('surjective only', 'solo sobreyectiva', 'só sobrejetora'), L('bijective', 'biyectiva', 'bijetora'), L('neither', 'ninguna', 'nenhuma'), L('injective only', 'solo inyectiva', 'só injetora')],
    answer: [1, 2, 3, 0],
    explanation: L('Floor reaches every integer but $\\lfloor 0.2 \\rfloor = \\lfloor 0.7 \\rfloor$; $2n$ misses odd numbers.', 'El piso alcanza todo entero pero $\\lfloor 0{,}2 \\rfloor = \\lfloor 0{,}7 \\rfloor$; $2n$ no alcanza los impares.', 'O piso atinge todo inteiro mas $\\lfloor 0{,}2 \\rfloor = \\lfloor 0{,}7 \\rfloor$; $2n$ não atinge os ímpares.'),
  },
  {
    id: 'disc4-q-tf-finite', type: 'true-false', lessonId: 'disc4-l2-injective-surjective',
    prompt: L('True or false: there is an injective function from a 6-element set to a 5-element set.', 'Verdadero o falso: existe una función inyectiva de un conjunto de 6 elementos en uno de 5.', 'Verdadeiro ou falso: existe uma função injetora de um conjunto de 6 elementos em um de 5.'),
    options: TF, answer: 1,
    explanation: L('False: 6 inputs and only 5 outputs force a repeat (pigeonhole).', 'Falso: 6 entradas y solo 5 salidas obligan a repetir (palomar).', 'Falso: 6 entradas e só 5 saídas obrigam a repetir (casa dos pombos).'),
  },
  {
    id: 'disc4-q-mc-compose', type: 'multiple-choice', lessonId: 'disc4-l3-composition-inverse',
    prompt: L('$f(x) = x - 4$, $g(x) = 2x^2$. What is $(g \\circ f)(x)$?', '$f(x) = x - 4$, $g(x) = 2x^2$. ¿Cuánto es $(g \\circ f)(x)$?', '$f(x) = x - 4$, $g(x) = 2x^2$. Quanto é $(g \\circ f)(x)$?'),
    options: [S('$2x^2 - 4$'), S('$2(x - 4)^2$'), S('$2x^2 - 8$')],
    answer: 1,
    explanation: L('$f$ first: $g(x - 4) = 2(x - 4)^2$. The first option is $f \\circ g$.', 'Primero $f$: $g(x - 4) = 2(x - 4)^2$. La primera opción es $f \\circ g$.', 'Primeiro $f$: $g(x - 4) = 2(x - 4)^2$. A primeira opção é $f \\circ g$.'),
  },
  {
    id: 'disc4-q-fill-inverse', type: 'fill-blank', lessonId: 'disc4-l3-composition-inverse',
    prompt: L('$f(x) = 4x + 6$. $f^{-1}(18) = $ ___', '$f(x) = 4x + 6$. $f^{-1}(18) = $ ___', '$f(x) = 4x + 6$. $f^{-1}(18) = $ ___'),
    accepted: ['3'],
    explanation: L('$4x + 6 = 18$ gives $x = 3$.', '$4x + 6 = 18$ da $x = 3$.', '$4x + 6 = 18$ dá $x = 3$.'),
  },
  {
    id: 'disc4-q-sc-pages', type: 'scenario', lessonId: 'disc4-l4-special',
    prompt: L('A gallery shows 12 photos per page. Which formula gives the page of photo number $k$ (counting from 1)?', 'Una galería muestra 12 fotos por página. ¿Qué fórmula da la página de la foto número $k$ (contando desde 1)?', 'Uma galeria mostra 12 fotos por página. Que fórmula dá a página da foto número $k$ (contando a partir de 1)?'),
    options: [S('$\\lceil k/12 \\rceil$'), S('$\\lfloor k/12 \\rfloor$'), S('$k \\bmod 12$')],
    answer: 0,
    explanation: L('Photos 1–12 are on page 1, 13–24 on page 2: round up. Floor would put photo 1 on page 0.', 'Las fotos 1–12 van en la página 1, 13–24 en la 2: se redondea hacia arriba. El piso pondría la foto 1 en la página 0.', 'As fotos 1–12 ficam na página 1, 13–24 na 2: arredonda-se para cima. O piso poria a foto 1 na página 0.'),
  },
  {
    id: 'disc4-q-mc-growth', type: 'multiple-choice', lessonId: 'disc4-l5-growth',
    prompt: L('Which grows fastest as $n$ becomes large?', '¿Cuál crece más rápido cuando $n$ es grande?', 'Qual cresce mais rápido quando $n$ fica grande?'),
    options: [S('$100n^2$'), S('$2^n$'), S('$n \\log_2 n$')],
    answer: 1,
    explanation: L('Any exponential $2^n$ eventually beats any polynomial, whatever the constant.', 'Toda exponencial $2^n$ termina superando a cualquier polinomio, sea cual sea la constante.', 'Toda exponencial $2^n$ acaba superando qualquer polinômio, seja qual for a constante.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 4. */
export const discWeek4Activities: Activity[] = [
  {
    id: 'disc4-act-classify-types', kind: 'classify', lessonId: 'disc4-l2-injective-surjective',
    title: L('Which kind of function?', '¿Qué tipo de función?', 'Que tipo de função?'),
    prompt: L('Sort each function by its type.', 'Clasifica cada función según su tipo.', 'Classifique cada função pelo tipo.'),
    buckets: [L('Bijective', 'Biyectiva', 'Bijetora'), L('Injective only', 'Solo inyectiva', 'Só injetora'), L('Surjective only', 'Solo sobreyectiva', 'Só sobrejetora'), L('Neither', 'Ninguna', 'Nenhuma')],
    items: [
      { text: S('$x \\mapsto x^3$, $\\mathbb{R} \\to \\mathbb{R}$'), bucket: 0 },
      { text: S('$n \\mapsto n + 1$, $\\mathbb{N} \\to \\mathbb{N}$'), bucket: 1 },
      { text: S('$x \\mapsto |x|$, $\\mathbb{R} \\to [0, \\infty)$'), bucket: 2 },
      { text: S('$x \\mapsto x^2$, $\\mathbb{Z} \\to \\mathbb{Z}$'), bucket: 3 },
      { text: S('$x \\mapsto 3x \\bmod 7$ on $\\{0, \\dots, 6\\}$'), bucket: 0 },
    ],
    explanation: L('$|x|$ reaches every non-negative number but $|-1| = |1|$.', '$|x|$ alcanza todo número no negativo pero $|-1| = |1|$.', '$|x|$ atinge todo número não negativo mas $|-1| = |1|$.'),
  },
  {
    id: 'disc4-act-order-inverse', kind: 'order', lessonId: 'disc4-l3-composition-inverse',
    title: L('Find an inverse', 'Halla una inversa', 'Ache uma inversa'),
    prompt: L('Order the steps for $f(x) = \\frac{x + 1}{x - 2}$ on $\\mathbb{R} - \\{2\\} \\to \\mathbb{R} - \\{1\\}$.', 'Ordena los pasos para $f(x) = \\frac{x + 1}{x - 2}$ de $\\mathbb{R} - \\{2\\}$ en $\\mathbb{R} - \\{1\\}$.', 'Ordene os passos para $f(x) = \\frac{x + 1}{x - 2}$ de $\\mathbb{R} - \\{2\\}$ em $\\mathbb{R} - \\{1\\}$.'),
    items: [
      L('Write $y = \\frac{x + 1}{x - 2}$', 'Escribir $y = \\frac{x + 1}{x - 2}$', 'Escrever $y = \\frac{x + 1}{x - 2}$'),
      L('Multiply: $yx - 2y = x + 1$', 'Multiplicar: $yx - 2y = x + 1$', 'Multiplicar: $yx - 2y = x + 1$'),
      L('Group: $x(y - 1) = 2y + 1$', 'Agrupar: $x(y - 1) = 2y + 1$', 'Agrupar: $x(y - 1) = 2y + 1$'),
      L('Solve: $f^{-1}(y) = \\frac{2y + 1}{y - 1}$', 'Despejar: $f^{-1}(y) = \\frac{2y + 1}{y - 1}$', 'Isolar: $f^{-1}(y) = \\frac{2y + 1}{y - 1}$'),
      L('Check: $f(3) = 4$ and $f^{-1}(4) = 3$', 'Comprobar: $f(3) = 4$ y $f^{-1}(4) = 3$', 'Conferir: $f(3) = 4$ e $f^{-1}(4) = 3$'),
    ],
    explanation: L('$y = 1$ is excluded, which is why the codomain is $\\mathbb{R} - \\{1\\}$.', 'Se excluye $y = 1$, por eso el codominio es $\\mathbb{R} - \\{1\\}$.', 'Exclui-se $y = 1$, por isso o contradomínio é $\\mathbb{R} - \\{1\\}$.'),
  },
  {
    id: 'disc4-act-fill-mod', kind: 'code-fill', lessonId: 'disc4-l2-injective-surjective',
    title: L('A table of remainders', 'Una tabla de restos', 'Uma tabela de restos'),
    prompt: L('Complete $f(x) = 5x \\bmod 6$ on $\\{0, \\dots, 5\\}$. Is it a bijection?', 'Completa $f(x) = 5x \\bmod 6$ en $\\{0, \\dots, 5\\}$. ¿Es biyección?', 'Complete $f(x) = 5x \\bmod 6$ em $\\{0, \\dots, 5\\}$. É bijeção?'),
    template: 'x      : 0 1 2 3 4 5\n5x mod 6: 0 5 {0} {1} 2 {2}\nbijective? {3}',
    blanks: ['4', '3', '1', 'yes|si|sí|sim'],
    explanation: L('Every value 0–5 appears once, so it is a bijection (it is its own inverse).', 'Cada valor de 0 a 5 aparece una vez, así que es biyección (es su propia inversa).', 'Cada valor de 0 a 5 aparece uma vez, então é bijeção (é sua própria inversa).'),
  },
];

/** Paper labs for Discrete Mathematics, Week 4, with worked answers. */
export const discWeek4Labs: Lab[] = [
  {
    id: 'disc4-lab-1-functions', kind: 'math', level: 1, minutes: 45,
    title: L('Is it a function, and of which kind?', '¿Es función, y de qué tipo?', 'É função, e de que tipo?'),
    goal: L('Decide whether relations are functions, compute images and preimages, and classify functions with proofs.', 'Decidir si relaciones son funciones, calcular imágenes y preimágenes y clasificar funciones con demostraciones.', 'Decidir se relações são funções, calcular imagens e pré-imagens e classificar funções com demonstrações.'),
    steps: [
      { id: 'disc4-lab1-s1', title: L('Arrow diagrams as pairs', 'Diagramas de flechas como pares', 'Diagramas de setas como pares'), commands: ['From $A = \\{-2, 0, 1, 3\\}$ to $B = \\{0, 1, 2, 4, 9\\}$:', '(a) $\\{(-2, 4), (0, 0), (1, 1), (3, 9)\\}$', '(b) $\\{(-2, 4), (0, 0), (3, 9)\\}$', '(c) $\\{(-2, 4), (0, 0), (1, 1), (1, 2), (3, 9)\\}$'],
        expected: L('(a) function; (b) not, 1 has no image; (c) not, 1 has two images.', '(a) función; (b) no, el 1 no tiene imagen; (c) no, el 1 tiene dos imágenes.', '(a) função; (b) não, o 1 não tem imagem; (c) não, o 1 tem duas imagens.') },
      { id: 'disc4-lab1-s2', title: L('Images and preimages', 'Imágenes y preimágenes', 'Imagens e pré-imagens'), commands: ['$g = \\{(1, a), (2, b), (3, a), (4, c)\\}$: $g(\\{1, 2\\})$, $g(\\{1, 3\\})$, $g^{-1}(\\{a\\})$, $g^{-1}(\\{b, c\\})$'],
        expected: S('$\\{a, b\\}$; $\\{a\\}$; $\\{1, 3\\}$; $\\{2, 4\\}$.') },
      { id: 'disc4-lab1-s3', title: L('Prove injective', 'Prueba que es inyectiva', 'Prove que é injetora'), commands: ['$f: \\mathbb{Z}^+ \\to \\mathbb{Z}^+$, $f(n) = 5n + 3$. Injective? Surjective?'],
        expected: L('$5a + 3 = 5b + 3 \\Rightarrow a = b$: injective. Not surjective: $f(n) \\ge 8$, so 1 is never reached.', '$5a + 3 = 5b + 3 \\Rightarrow a = b$: inyectiva. No sobreyectiva: $f(n) \\ge 8$, así que el 1 no se alcanza.', '$5a + 3 = 5b + 3 \\Rightarrow a = b$: injetora. Não sobrejetora: $f(n) \\ge 8$, então o 1 não é atingido.') },
      { id: 'disc4-lab1-s4', title: L('A function with mod', 'Una función con mod', 'Uma função com mod'), commands: ['$h(x) = (x^2 + 2) \\bmod 7$ on $\\{0, \\dots, 6\\}$: table, injective?, surjective?'],
        expected: L('$2, 3, 6, 4, 4, 6, 3$: neither (repeats, and 0, 1, 5 are missed).', '$2, 3, 6, 4, 4, 6, 3$: ninguna (repite, y no alcanza 0, 1, 5).', '$2, 3, 6, 4, 4, 6, 3$: nenhuma (repete, e não atinge 0, 1, 5).') },
      { id: 'disc4-lab1-s5', title: L('Is it a function? Find its inverse', '¿Es función? Halla su inversa', 'É função? Ache sua inversa'), commands: ['$f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3 + 1$', '$g: \\mathbb{R} \\to \\mathbb{R}$, $g(x) = \\frac{1}{x - 2}$'],
        expected: L('$f$ is bijective, $f^{-1}(y) = \\sqrt[3]{y - 1}$. $g$ is not a function on $\\mathbb{R}$ (undefined at 2); on $\\mathbb{R} - \\{2\\} \\to \\mathbb{R} - \\{0\\}$ it is bijective with $g^{-1}(y) = 2 + \\frac{1}{y}$.', '$f$ es biyectiva, $f^{-1}(y) = \\sqrt[3]{y - 1}$. $g$ no es función en $\\mathbb{R}$ (no está definida en 2); de $\\mathbb{R} - \\{2\\}$ en $\\mathbb{R} - \\{0\\}$ es biyectiva con $g^{-1}(y) = 2 + \\frac{1}{y}$.', '$f$ é bijetora, $f^{-1}(y) = \\sqrt[3]{y - 1}$. $g$ não é função em $\\mathbb{R}$ (não está definida em 2); de $\\mathbb{R} - \\{2\\}$ em $\\mathbb{R} - \\{0\\}$ é bijetora com $g^{-1}(y) = 2 + \\frac{1}{y}$.') },
    ],
  },
  {
    id: 'disc4-lab-2-composition', kind: 'math', level: 2, minutes: 45,
    title: L('Composition, inverses, domains, and counting', 'Composición, inversas, dominios y conteo', 'Composição, inversas, domínios e contagem'),
    goal: L('Compose in both orders, invert, find natural domains and ranges, and count functions.', 'Componer en ambos órdenes, invertir, hallar dominios naturales y rangos, y contar funciones.', 'Compor nas duas ordens, inverter, achar domínios naturais e imagens, e contar funções.'),
    steps: [
      { id: 'disc4-lab2-s1', title: L('Both orders', 'Ambos órdenes', 'Ambas as ordens'), commands: ['$f(x) = x + 5$, $g(x) = x^2 - 1$: $f \\circ g$, $g \\circ f$, $g \\circ g$'],
        expected: S('$x^2 + 4$; $x^2 + 10x + 24$; $x^4 - 2x^2$.') },
      { id: 'disc4-lab2-s2', title: L('A rational inverse', 'Una inversa racional', 'Uma inversa racional'), commands: ['$f: \\mathbb{R} - \\{\\frac{1}{2}\\} \\to \\mathbb{R} - \\{2\\}$, $f(x) = \\frac{4x + 1}{2x - 1}$'],
        expected: L('$y(2x - 1) = 4x + 1 \\Rightarrow x(2y - 4) = y + 1 \\Rightarrow f^{-1}(y) = \\frac{y + 1}{2y - 4}$. Check: $f(1) = 5$, $f^{-1}(5) = \\frac{6}{6} = 1$.', '$y(2x - 1) = 4x + 1 \\Rightarrow x(2y - 4) = y + 1 \\Rightarrow f^{-1}(y) = \\frac{y + 1}{2y - 4}$. Comprobación: $f(1) = 5$, $f^{-1}(5) = \\frac{6}{6} = 1$.', '$y(2x - 1) = 4x + 1 \\Rightarrow x(2y - 4) = y + 1 \\Rightarrow f^{-1}(y) = \\frac{y + 1}{2y - 4}$. Conferência: $f(1) = 5$, $f^{-1}(5) = \\frac{6}{6} = 1$.') },
      { id: 'disc4-lab2-s3', title: L('Domains of compositions', 'Dominios de composiciones', 'Domínios de composições'), commands: ['$f(x) = \\sqrt{x}$, $g(x) = x - 9$: domain of $f \\circ g$ and of $g \\circ f$'],
        expected: L('$f(g(x)) = \\sqrt{x - 9}$, domain $[9, \\infty)$; $g(f(x)) = \\sqrt{x} - 9$, domain $[0, \\infty)$.', '$f(g(x)) = \\sqrt{x - 9}$, dominio $[9, \\infty)$; $g(f(x)) = \\sqrt{x} - 9$, dominio $[0, \\infty)$.', '$f(g(x)) = \\sqrt{x - 9}$, domínio $[9, \\infty)$; $g(f(x)) = \\sqrt{x} - 9$, domínio $[0, \\infty)$.') },
      { id: 'disc4-lab2-s4', title: L('Polynomial roots and range', 'Raíces y rango de un polinomio', 'Raízes e imagem de um polinômio'), commands: ['$p(x) = x^2 + 2x - 8$: roots and range on $\\mathbb{R}$'],
        expected: L('$(x + 4)(x - 2)$: roots $-4$ and $2$. Vertex at $x = -1$, $p(-1) = -9$: range $[-9, \\infty)$.', '$(x + 4)(x - 2)$: raíces $-4$ y $2$. Vértice en $x = -1$, $p(-1) = -9$: rango $[-9, \\infty)$.', '$(x + 4)(x - 2)$: raízes $-4$ e $2$. Vértice em $x = -1$, $p(-1) = -9$: imagem $[-9, \\infty)$.') },
      { id: 'disc4-lab2-s5', title: L('Counting functions', 'Contar funciones', 'Contar funções'), commands: ['From $\\{1, 2, 3\\}$ to $\\{a, b, c, d\\}$: all, injective, bijective'],
        expected: L('$4^3 = 64$; $4 \\cdot 3 \\cdot 2 = 24$; $0$ (sizes differ).', '$4^3 = 64$; $4 \\cdot 3 \\cdot 2 = 24$; $0$ (los tamaños difieren).', '$4^3 = 64$; $4 \\cdot 3 \\cdot 2 = 24$; $0$ (os tamanhos diferem).') },
    ],
  },
];
