import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 3. */
export const discWeek3Flashcards: Flashcard[] = [
  { id: 'disc3-fc-1', lessonId: 'disc3-l1-pairs', kind: 'concept',
    front: L('Cartesian product and its size', 'Producto cartesiano y su tamaño', 'Produto cartesiano e seu tamanho'),
    back: S('$A \\times B = \\{(x, y) \\mid x \\in A, y \\in B\\}$, $|A \\times B| = |A|\\,|B|$') },
  { id: 'disc3-fc-2', lessonId: 'disc3-l1-pairs', kind: 'concept',
    front: L('What is a relation from $A$ to $B$?', '¿Qué es una relación de $A$ en $B$?', 'O que é uma relação de $A$ em $B$?'),
    back: L('Any subset $R \\subseteq A \\times B$.', 'Cualquier subconjunto $R \\subseteq A \\times B$.', 'Qualquer subconjunto $R \\subseteq A \\times B$.') },
  { id: 'disc3-fc-3', lessonId: 'disc3-l2-representations', kind: 'distinction',
    front: L('Domain vs range of $R$', 'Dominio vs rango de $R$', 'Domínio vs imagem de $R$'),
    back: L('First components that appear vs second components that appear.', 'Primeras componentes que aparecen vs segundas componentes que aparecen.', 'Primeiras componentes que aparecem vs segundas componentes que aparecem.') },
  { id: 'disc3-fc-4', lessonId: 'disc3-l3-inverse-composition', kind: 'concept',
    front: L('Inverse relation', 'Relación inversa', 'Relação inversa'),
    back: L('$R^{-1} = \\{(y, x) \\mid (x, y) \\in R\\}$: the transposed matrix.', '$R^{-1} = \\{(y, x) \\mid (x, y) \\in R\\}$: la matriz traspuesta.', '$R^{-1} = \\{(y, x) \\mid (x, y) \\in R\\}$: a matriz transposta.') },
  { id: 'disc3-fc-5', lessonId: 'disc3-l3-inverse-composition', kind: 'concept',
    front: L('Composition $S \\circ R$', 'Composición $S \\circ R$', 'Composição $S \\circ R$'),
    back: L('$(x, z)$ such that $x \\, R \\, y$ and $y \\, S \\, z$ for some $y$: first $R$, then $S$.', '$(x, z)$ tales que $x \\, R \\, y$ e $y \\, S \\, z$ para algún $y$: primero $R$, luego $S$.', '$(x, z)$ tais que $x \\, R \\, y$ e $y \\, S \\, z$ para algum $y$: primeiro $R$, depois $S$.') },
  { id: 'disc3-fc-6', lessonId: 'disc3-l4-properties', kind: 'command',
    front: L('Matrix tests for the properties', 'Pruebas en la matriz para las propiedades', 'Testes na matriz para as propriedades'),
    back: L('Reflexive: diagonal of 1s. Symmetric: $M = M^T$. Antisymmetric: no mirror 1s off the diagonal.', 'Reflexiva: diagonal de 1. Simétrica: $M = M^T$. Antisimétrica: sin 1 espejo fuera de la diagonal.', 'Reflexiva: diagonal de 1. Simétrica: $M = M^T$. Antissimétrica: sem 1 espelhados fora da diagonal.') },
  { id: 'disc3-fc-7', lessonId: 'disc3-l4-properties', kind: 'concept',
    front: L('Transitive closure', 'Clausura transitiva', 'Fecho transitivo'),
    back: L('Add shortcuts $x \\to z$ for every path $x \\to y \\to z$ until none is missing.', 'Agregar atajos $x \\to z$ para cada camino $x \\to y \\to z$ hasta que no falte ninguno.', 'Acrescentar atalhos $x \\to z$ para cada caminho $x \\to y \\to z$ até não faltar nenhum.') },
  { id: 'disc3-fc-8', lessonId: 'disc3-l5-equivalence', kind: 'concept',
    front: L('Equivalence relation', 'Relación de equivalencia', 'Relação de equivalência'),
    back: L('Reflexive, symmetric, transitive. Its classes partition the set.', 'Reflexiva, simétrica, transitiva. Sus clases forman una partición.', 'Reflexiva, simétrica, transitiva. Suas classes formam uma partição.') },
  { id: 'disc3-fc-9', lessonId: 'disc3-l5-equivalence', kind: 'concept',
    front: S('$a \\equiv b \\pmod{n}$'),
    back: L('$n \\mid a - b$: same remainder when divided by $n$.', '$n \\mid a - b$: mismo resto al dividir entre $n$.', '$n \\mid a - b$: mesmo resto na divisão por $n$.') },
  { id: 'disc3-fc-10', lessonId: 'disc3-l6-orders', kind: 'distinction',
    front: L('Partial vs total order', 'Orden parcial vs total', 'Ordem parcial vs total'),
    back: L('Both reflexive, antisymmetric, transitive; total also makes every pair comparable.', 'Ambos reflexivos, antisimétricos y transitivos; el total además hace comparable todo par.', 'Ambas reflexivas, antissimétricas e transitivas; a total também torna todo par comparável.') },
];

/** Quiz for Discrete Mathematics, Week 3. */
export const discWeek3Questions: Question[] = [
  {
    id: 'disc3-q-fill-count', type: 'fill-blank', lessonId: 'disc3-l1-pairs',
    prompt: L('How many relations are there from a 2-element set to a 2-element set? ___', '¿Cuántas relaciones hay de un conjunto de 2 elementos en otro de 2 elementos? ___', 'Quantas relações existem de um conjunto de 2 elementos em outro de 2 elementos? ___'),
    accepted: ['16'],
    explanation: L('$A \\times B$ has 4 pairs, so $2^4 = 16$ subsets.', '$A \\times B$ tiene 4 pares, así que hay $2^4 = 16$ subconjuntos.', '$A \\times B$ tem 4 pares, então há $2^4 = 16$ subconjuntos.'),
  },
  {
    id: 'disc3-q-mc-domain', type: 'multiple-choice', lessonId: 'disc3-l2-representations',
    prompt: L('$R = \\{(1, a), (3, a), (3, c)\\}$ from $\\{1, 2, 3\\}$ to $\\{a, b, c\\}$. What are its domain and range?', '$R = \\{(1, a), (3, a), (3, c)\\}$ de $\\{1, 2, 3\\}$ en $\\{a, b, c\\}$. ¿Cuáles son su dominio y su rango?', '$R = \\{(1, a), (3, a), (3, c)\\}$ de $\\{1, 2, 3\\}$ em $\\{a, b, c\\}$. Quais são seu domínio e sua imagem?'),
    options: [S('$\\{1, 3\\}$, $\\{a, c\\}$'), S('$\\{1, 2, 3\\}$, $\\{a, b, c\\}$'), S('$\\{a, c\\}$, $\\{1, 3\\}$')],
    answer: 0,
    explanation: L('Only the components that appear count.', 'Solo cuentan las componentes que aparecen.', 'Só contam as componentes que aparecem.'),
  },
  {
    id: 'disc3-q-mc-compose', type: 'multiple-choice', lessonId: 'disc3-l3-inverse-composition',
    prompt: L('$R = \\{(1, 2), (2, 2)\\}$ and $S = \\{(2, 5)\\}$. What is $S \\circ R$?', '$R = \\{(1, 2), (2, 2)\\}$ y $S = \\{(2, 5)\\}$. ¿Cuánto es $S \\circ R$?', '$R = \\{(1, 2), (2, 2)\\}$ e $S = \\{(2, 5)\\}$. Quanto é $S \\circ R$?'),
    options: [S('$\\{(1, 5), (2, 5)\\}$'), S('$\\{(2, 5)\\}$'), S('$\\varnothing$')],
    answer: 0,
    explanation: L('$1 \\to 2 \\to 5$ and $2 \\to 2 \\to 5$.', '$1 \\to 2 \\to 5$ y $2 \\to 2 \\to 5$.', '$1 \\to 2 \\to 5$ e $2 \\to 2 \\to 5$.'),
  },
  {
    id: 'disc3-q-matching-props', type: 'matching', lessonId: 'disc3-l4-properties',
    prompt: L('Match each relation with the list of properties it has.', 'Une cada relación con la lista de propiedades que tiene.', 'Ligue cada relação à lista de propriedades que ela tem.'),
    left: [L('$<$ on $\\mathbb{Z}$', '$<$ en $\\mathbb{Z}$', '$<$ em $\\mathbb{Z}$'), L('$\\le$ on $\\mathbb{Z}$', '$\\le$ en $\\mathbb{Z}$', '$\\le$ em $\\mathbb{Z}$'), L('"same remainder mod 5"', '"mismo resto mod 5"', '"mesmo resto mod 5"'), L('"is a friend of"', '"es amigo de"', '"é amigo de"')],
    right: [L('reflexive, antisymmetric, transitive', 'reflexiva, antisimétrica, transitiva', 'reflexiva, antissimétrica, transitiva'), L('symmetric only', 'solo simétrica', 'só simétrica'), L('irreflexive, asymmetric, transitive', 'irreflexiva, asimétrica, transitiva', 'irreflexiva, assimétrica, transitiva'), L('reflexive, symmetric, transitive', 'reflexiva, simétrica, transitiva', 'reflexiva, simétrica, transitiva')],
    answer: [2, 0, 3, 1],
    explanation: L('$<$ is a strict order, $\\le$ a partial (in fact total) order, "same remainder" an equivalence; friendship is symmetric but not transitive (and nobody is their own friend in this sense).', '$<$ es un orden estricto, $\\le$ un orden parcial (de hecho total), "mismo resto" una equivalencia; la amistad es simétrica pero no transitiva.', '$<$ é uma ordem estrita, $\\le$ uma ordem parcial (de fato total), "mesmo resto" uma equivalência; a amizade é simétrica mas não transitiva.'),
  },
  {
    id: 'disc3-q-tf-symanti', type: 'true-false', lessonId: 'disc3-l4-properties',
    prompt: L('True or false: a relation can be both symmetric and antisymmetric.', 'Verdadero o falso: una relación puede ser simétrica y antisimétrica a la vez.', 'Verdadeiro ou falso: uma relação pode ser simétrica e antissimétrica ao mesmo tempo.'),
    options: TF, answer: 0,
    explanation: L('True: $\\{(1, 1), (2, 2)\\}$ is both, since it has no pairs with $x \\neq y$.', 'Verdadero: $\\{(1, 1), (2, 2)\\}$ es ambas, porque no tiene pares con $x \\neq y$.', 'Verdadeiro: $\\{(1, 1), (2, 2)\\}$ é as duas, porque não tem pares com $x \\neq y$.'),
  },
  {
    id: 'disc3-q-troubleshoot-trans', type: 'troubleshooting', lessonId: 'disc3-l4-properties',
    prompt: L('A student claims $R = \\{(1, 2), (2, 1)\\}$ on $\\{1, 2\\}$ is transitive. What is the problem?', 'Un estudiante afirma que $R = \\{(1, 2), (2, 1)\\}$ en $\\{1, 2\\}$ es transitiva. ¿Cuál es el problema?', 'Um estudante afirma que $R = \\{(1, 2), (2, 1)\\}$ em $\\{1, 2\\}$ é transitiva. Qual é o problema?'),
    options: [
      L('None; it is transitive.', 'Ninguno; es transitiva.', 'Nenhum; é transitiva.'),
      L('$1 \\to 2 \\to 1$ needs $(1, 1)$, which is missing.', '$1 \\to 2 \\to 1$ necesita $(1, 1)$, que falta.', '$1 \\to 2 \\to 1$ precisa de $(1, 1)$, que falta.'),
      L('Transitivity needs three different elements.', 'La transitividad necesita tres elementos distintos.', 'A transitividade precisa de três elementos distintos.'),
    ],
    answer: 1,
    explanation: L('$x, y, z$ need not be different; adding $(1, 1)$ and $(2, 2)$ fixes it.', '$x, y, z$ no tienen por qué ser distintos; agregar $(1, 1)$ y $(2, 2)$ lo arregla.', '$x, y, z$ não precisam ser distintos; acrescentar $(1, 1)$ e $(2, 2)$ resolve.'),
  },
  {
    id: 'disc3-q-fill-class', type: 'fill-blank', lessonId: 'disc3-l5-equivalence',
    prompt: L('On $\\{1, \\dots, 20\\}$ with congruence mod 5, how many elements does $[3]$ have? ___', 'En $\\{1, \\dots, 20\\}$ con congruencia mod 5, ¿cuántos elementos tiene $[3]$? ___', 'Em $\\{1, \\dots, 20\\}$ com congruência mod 5, quantos elementos tem $[3]$? ___'),
    accepted: ['4'],
    explanation: L('$[3] = \\{3, 8, 13, 18\\}$.', '$[3] = \\{3, 8, 13, 18\\}$.', '$[3] = \\{3, 8, 13, 18\\}$.'),
  },
  {
    id: 'disc3-q-sc-order', type: 'scenario', lessonId: 'disc3-l6-orders',
    prompt: L('Courses: Algebra before Calculus, Algebra before Statistics, Calculus before Physics. Which pair is incomparable in this prerequisite order?', 'Cursos: Álgebra antes de Cálculo, Álgebra antes de Estadística, Cálculo antes de Física. ¿Qué par es incomparable en este orden de prerrequisitos?', 'Disciplinas: Álgebra antes de Cálculo, Álgebra antes de Estatística, Cálculo antes de Física. Que par é incomparável nessa ordem de pré-requisitos?'),
    options: [L('Algebra and Physics', 'Álgebra y Física', 'Álgebra e Física'), L('Statistics and Physics', 'Estadística y Física', 'Estatística e Física'), L('Algebra and Calculus', 'Álgebra y Cálculo', 'Álgebra e Cálculo')],
    answer: 1,
    explanation: L('Algebra precedes Physics by transitivity, but nothing links Statistics and Physics.', 'Álgebra precede a Física por transitividad, pero nada une Estadística con Física.', 'Álgebra precede Física por transitividade, mas nada liga Estatística a Física.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 3. */
export const discWeek3Activities: Activity[] = [
  {
    id: 'disc3-act-classify-props', kind: 'classify', lessonId: 'disc3-l4-properties',
    title: L('Equivalence, order, or neither?', '¿Equivalencia, orden o ninguna?', 'Equivalência, ordem ou nenhuma?'),
    prompt: L('Sort each relation.', 'Clasifica cada relación.', 'Classifique cada relação.'),
    buckets: [L('Equivalence', 'Equivalencia', 'Equivalência'), L('Partial order', 'Orden parcial', 'Ordem parcial'), L('Neither', 'Ninguna', 'Nenhuma')],
    items: [
      { text: L('Same file extension', 'Misma extensión de archivo', 'Mesma extensão de arquivo'), bucket: 0 },
      { text: L('$\\subseteq$ on folders of a disk', '$\\subseteq$ en carpetas de un disco', '$\\subseteq$ em pastas de um disco'), bucket: 1 },
      { text: L('$x < y$ on $\\mathbb{Z}$', '$x < y$ en $\\mathbb{Z}$', '$x < y$ em $\\mathbb{Z}$'), bucket: 2 },
      { text: L('$a \\equiv b \\pmod{7}$', '$a \\equiv b \\pmod{7}$', '$a \\equiv b \\pmod{7}$'), bucket: 0 },
      { text: L('Divisibility on positive integers', 'Divisibilidad en enteros positivos', 'Divisibilidade em inteiros positivos'), bucket: 1 },
      { text: L('"Follows" on a social app', '"Sigue a" en una red social', '"Segue" numa rede social'), bucket: 2 },
    ],
    explanation: L('$<$ fails reflexivity; "follows" is neither symmetric nor antisymmetric in general.', '$<$ no es reflexiva; "sigue a" en general no es simétrica ni antisimétrica.', '$<$ não é reflexiva; "segue" em geral não é simétrica nem antissimétrica.'),
  },
  {
    id: 'disc3-act-fill-matrix', kind: 'code-fill', lessonId: 'disc3-l2-representations',
    title: L('Fill the relation matrix', 'Completa la matriz de la relación', 'Complete a matriz da relação'),
    prompt: L('$R = \\{(1, 1), (1, 3), (2, 3), (3, 2)\\}$ on $\\{1, 2, 3\\}$.', '$R = \\{(1, 1), (1, 3), (2, 3), (3, 2)\\}$ en $\\{1, 2, 3\\}$.', '$R = \\{(1, 1), (1, 3), (2, 3), (3, 2)\\}$ em $\\{1, 2, 3\\}$.'),
    template: '    1 2 3\n1 [ 1 0 {0} ]\n2 [ 0 {1} 1 ]\n3 [ 0 {2} 0 ]',
    blanks: ['1', '0', '1'],
    explanation: L('Row = first component, column = second component.', 'Fila = primera componente, columna = segunda componente.', 'Linha = primeira componente, coluna = segunda componente.'),
  },
  {
    id: 'disc3-act-order-equiv', kind: 'order', lessonId: 'disc3-l5-equivalence',
    title: L('Prove an equivalence', 'Demuestra una equivalencia', 'Prove uma equivalência'),
    prompt: L('Order the steps to show $a \\equiv b \\pmod{n}$ is an equivalence and find its classes.', 'Ordena los pasos para mostrar que $a \\equiv b \\pmod{n}$ es una equivalencia y hallar sus clases.', 'Ordene os passos para mostrar que $a \\equiv b \\pmod{n}$ é uma equivalência e achar suas classes.'),
    items: [
      L('Reflexive: $n \\mid a - a = 0$', 'Reflexiva: $n \\mid a - a = 0$', 'Reflexiva: $n \\mid a - a = 0$'),
      L('Symmetric: $n \\mid a - b \\Rightarrow n \\mid b - a$', 'Simétrica: $n \\mid a - b \\Rightarrow n \\mid b - a$', 'Simétrica: $n \\mid a - b \\Rightarrow n \\mid b - a$'),
      L('Transitive: $a - c = (a - b) + (b - c)$', 'Transitiva: $a - c = (a - b) + (b - c)$', 'Transitiva: $a - c = (a - b) + (b - c)$'),
      L('Group integers by remainder', 'Agrupar los enteros por resto', 'Agrupar os inteiros pelo resto'),
      L('Conclude: $n$ classes $[0], \\dots, [n-1]$', 'Concluir: $n$ clases $[0], \\dots, [n-1]$', 'Concluir: $n$ classes $[0], \\dots, [n-1]$'),
    ],
    explanation: L('Prove the three properties first; only then do the classes form a partition.', 'Primero se prueban las tres propiedades; solo entonces las clases forman una partición.', 'Primeiro provam-se as três propriedades; só então as classes formam uma partição.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 3, with worked answers. */
export const discWeek3Labs: Lab[] = [
  {
    id: 'disc3-lab-1-relations', kind: 'math', level: 1, minutes: 45,
    title: L('Products, relations, and their representations', 'Productos, relaciones y sus representaciones', 'Produtos, relações e suas representações'),
    goal: L('Build relations from rules and move between pairs, matrices, and digraphs; compute inverses and compositions.', 'Construir relaciones a partir de reglas y pasar entre pares, matrices y digrafos; calcular inversas y composiciones.', 'Construir relações a partir de regras e passar entre pares, matrizes e digrafos; calcular inversas e composições.'),
    steps: [
      { id: 'disc3-lab1-s1', title: L('A product', 'Un producto', 'Um produto'), commands: ['$A = \\{0, 1\\}$, $B = \\{x, y, z\\}$: list $A \\times B$ and $|B \\times A \\times A|$'],
        expected: S('$\\{(0,x), (0,y), (0,z), (1,x), (1,y), (1,z)\\}$; $3 \\cdot 2 \\cdot 2 = 12$.') },
      { id: 'disc3-lab1-s2', title: L('From a rule', 'A partir de una regla', 'A partir de uma regra'), commands: ['On $\\{1, \\dots, 6\\}$: $x \\, R \\, y \\iff x + y = 8$'],
        expected: L('$\\{(2,6), (3,5), (4,4), (5,3), (6,2)\\}$; domain and range $\\{2, 3, 4, 5, 6\\}$.', '$\\{(2,6), (3,5), (4,4), (5,3), (6,2)\\}$; dominio y rango $\\{2, 3, 4, 5, 6\\}$.', '$\\{(2,6), (3,5), (4,4), (5,3), (6,2)\\}$; domínio e imagem $\\{2, 3, 4, 5, 6\\}$.') },
      { id: 'disc3-lab1-s3', title: L('Matrix and digraph', 'Matriz y digrafo', 'Matriz e digrafo'), commands: ['$R = \\{(a,b), (b,c), (c,a), (c,c)\\}$ on $\\{a, b, c\\}$'],
        expected: L('Rows $a: 0\\,1\\,0$, $b: 0\\,0\\,1$, $c: 1\\,0\\,1$. Digraph: a cycle $a \\to b \\to c \\to a$ plus a loop at $c$.', 'Filas $a: 0\\,1\\,0$, $b: 0\\,0\\,1$, $c: 1\\,0\\,1$. Digrafo: un ciclo $a \\to b \\to c \\to a$ y un lazo en $c$.', 'Linhas $a: 0\\,1\\,0$, $b: 0\\,0\\,1$, $c: 1\\,0\\,1$. Digrafo: um ciclo $a \\to b \\to c \\to a$ e um laço em $c$.') },
      { id: 'disc3-lab1-s4', title: L('Inverse', 'Inversa', 'Inversa'), commands: ['$R$ from $\\{2, 3, 4\\}$ to $\\{4, 6, 8, 9\\}$: $x \\, R \\, y \\iff x \\mid y$. Find $R$ and $R^{-1}$.'],
        expected: L('$R = \\{(2,4), (2,6), (2,8), (3,6), (3,9), (4,4), (4,8)\\}$; $R^{-1}$ flips each pair, with domain $\\{4, 6, 8, 9\\}$.', '$R = \\{(2,4), (2,6), (2,8), (3,6), (3,9), (4,4), (4,8)\\}$; $R^{-1}$ invierte cada par, con dominio $\\{4, 6, 8, 9\\}$.', '$R = \\{(2,4), (2,6), (2,8), (3,6), (3,9), (4,4), (4,8)\\}$; $R^{-1}$ inverte cada par, com domínio $\\{4, 6, 8, 9\\}$.') },
      { id: 'disc3-lab1-s5', title: L('Composition', 'Composición', 'Composição'), commands: ['$R = \\{(1,x), (2,x), (2,y)\\}$, $S = \\{(x, \\alpha), (y, \\beta), (y, \\gamma)\\}$: find $S \\circ R$'],
        expected: S('$\\{(1, \\alpha), (2, \\alpha), (2, \\beta), (2, \\gamma)\\}$.') },
    ],
  },
  {
    id: 'disc3-lab-2-properties', kind: 'math', level: 2, minutes: 50,
    title: L('Properties, closures, equivalences, and orders', 'Propiedades, clausuras, equivalencias y órdenes', 'Propriedades, fechos, equivalências e ordens'),
    goal: L('Decide each property with a reason, build closures, find classes, and draw Hasse diagrams.', 'Decidir cada propiedad con una razón, construir clausuras, hallar clases y dibujar diagramas de Hasse.', 'Decidir cada propriedade com uma justificativa, construir fechos, achar classes e desenhar diagramas de Hasse.'),
    steps: [
      { id: 'disc3-lab2-s1', title: L('Four properties', 'Cuatro propiedades', 'Quatro propriedades'), commands: ['On $\\{1, 2, 3, 4\\}$: $R = \\{(1,1), (2,2), (3,3), (4,4), (1,2), (2,3), (1,3)\\}$'],
        expected: L('Reflexive yes; symmetric no; antisymmetric yes; transitive yes (the only chain $1 \\to 2 \\to 3$ has $1 \\to 3$). It is a partial order.', 'Reflexiva sí; simétrica no; antisimétrica sí; transitiva sí (la única cadena $1 \\to 2 \\to 3$ tiene $1 \\to 3$). Es un orden parcial.', 'Reflexiva sim; simétrica não; antissimétrica sim; transitiva sim (a única cadeia $1 \\to 2 \\to 3$ tem $1 \\to 3$). É uma ordem parcial.') },
      { id: 'disc3-lab2-s2', title: L('Is it an equivalence?', '¿Es una equivalencia?', 'É uma equivalência?'), commands: ['On $\\{1, \\dots, 5\\}$: $R = \\{(1,1), (2,2), (3,3), (4,4), (5,5), (1,4), (4,1), (2,5), (5,2)\\}$'],
        expected: L('Yes. Classes: $\\{1, 4\\}$, $\\{2, 5\\}$, $\\{3\\}$.', 'Sí. Clases: $\\{1, 4\\}$, $\\{2, 5\\}$, $\\{3\\}$.', 'Sim. Classes: $\\{1, 4\\}$, $\\{2, 5\\}$, $\\{3\\}$.') },
      { id: 'disc3-lab2-s3', title: L('Closures', 'Clausuras', 'Fechos'), commands: ['On $\\{a, b, c, d\\}$: $R = \\{(a,b), (b,c), (c,d)\\}$, transitive closure'],
        expected: L('Add $(a,c)$, $(b,d)$, then $(a,d)$: $\\{(a,b), (b,c), (c,d), (a,c), (b,d), (a,d)\\}$.', 'Agregar $(a,c)$, $(b,d)$ y luego $(a,d)$: $\\{(a,b), (b,c), (c,d), (a,c), (b,d), (a,d)\\}$.', 'Acrescentar $(a,c)$, $(b,d)$ e depois $(a,d)$: $\\{(a,b), (b,c), (c,d), (a,c), (b,d), (a,d)\\}$.') },
      { id: 'disc3-lab2-s4', title: L('A class by a rule', 'Una clase por regla', 'Uma classe por regra'), commands: ['On $\\{-4, \\dots, 4\\}$: $x \\sim y \\iff |x| = |y|$. Find $[-3]$ and all classes'],
        expected: L('$[-3] = \\{-3, 3\\}$. Classes $\\{0\\}, \\{\\pm 1\\}, \\{\\pm 2\\}, \\{\\pm 3\\}, \\{\\pm 4\\}$: five.', '$[-3] = \\{-3, 3\\}$. Clases $\\{0\\}, \\{\\pm 1\\}, \\{\\pm 2\\}, \\{\\pm 3\\}, \\{\\pm 4\\}$: cinco.', '$[-3] = \\{-3, 3\\}$. Classes $\\{0\\}, \\{\\pm 1\\}, \\{\\pm 2\\}, \\{\\pm 3\\}, \\{\\pm 4\\}$: cinco.') },
      { id: 'disc3-lab2-s5', title: L('Hasse diagram and totality', 'Hasse y orden total', 'Hasse e ordem total'), commands: ['Divisibility on $\\{1, 2, 5, 10, 20\\}$', 'Divisibility on $\\{1, 7, 49, 343\\}$'],
        expected: L('Edges $1$–$2$, $1$–$5$, $2$–$10$, $5$–$10$, $10$–$20$; not total (2 and 5 incomparable). The second is a chain, so total.', 'Aristas $1$–$2$, $1$–$5$, $2$–$10$, $5$–$10$, $10$–$20$; no es total (2 y 5 incomparables). El segundo es una cadena: total.', 'Arestas $1$–$2$, $1$–$5$, $2$–$10$, $5$–$10$, $10$–$20$; não é total (2 e 5 incomparáveis). O segundo é uma cadeia: total.') },
    ],
  },
];
