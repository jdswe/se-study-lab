import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 4. */
export const discWeek4Flashcards: Flashcard[] = [
  { id: 'disc4-fc-1', lessonId: 'disc4-l1-functions', kind: 'distinction',
    front: L('Function vs general relation', 'Función vs relación general', 'Função vs relação geral'),
    back: L('A function assigns exactly one output to every input. A relation may assign none or several.', 'Una función asigna exactamente una salida a cada entrada. Una relación puede asignar ninguna o varias.', 'Uma função associa exatamente uma saída a cada entrada. Uma relação pode associar nenhuma ou várias.') },
  { id: 'disc4-fc-2', lessonId: 'disc4-l1-functions', kind: 'distinction',
    front: L('Image vs codomain', 'Imagen vs codominio', 'Imagem vs contradomínio'),
    back: L('The codomain is the declared target set; the image is the subset of values actually produced.', 'El codominio es el conjunto destino declarado; la imagen es el subconjunto de valores que se producen de verdad.', 'O contradomínio é o conjunto destino declarado; a imagem é o subconjunto de valores realmente produzidos.') },
  { id: 'disc4-fc-3', lessonId: 'disc4-l2-injective-surjective', kind: 'concept',
    front: L('Injective, surjective, bijective', 'Inyectiva, suprayectiva, biyectiva', 'Injetiva, sobrejetiva, bijetiva'),
    back: L('Injective: f(a₁) = f(a₂) ⇒ a₁ = a₂. Surjective: Im(f) = B. Bijective: both.', 'Inyectiva: f(a₁) = f(a₂) ⇒ a₁ = a₂. Suprayectiva: Im(f) = B. Biyectiva: ambas.', 'Injetiva: f(a₁) = f(a₂) ⇒ a₁ = a₂. Sobrejetiva: Im(f) = B. Bijetiva: ambas.') },
  { id: 'disc4-fc-4', lessonId: 'disc4-l2-injective-surjective', kind: 'command',
    front: L('Finite size test', 'Prueba de tamaños finitos', 'Teste de tamanhos finitos'),
    back: L('If |A| > |B|, no injection A → B exists. If |A| < |B|, no surjection A → B exists. If |A| = |B|, injective ⇔ surjective ⇔ bijective.', 'Si |A| > |B|, no hay inyección A → B. Si |A| < |B|, no hay suprayección A → B. Si |A| = |B|, inyectiva ⇔ suprayectiva ⇔ biyectiva.', 'Se |A| > |B|, não há injeção A → B. Se |A| < |B|, não há sobrejeção A → B. Se |A| = |B|, injetiva ⇔ sobrejetiva ⇔ bijetiva.') },
  { id: 'disc4-fc-5', lessonId: 'disc4-l2-injective-surjective', kind: 'distinction',
    front: L('x² on ℝ vs on [0, ∞)', 'x² sobre ℝ vs sobre [0, ∞)', 'x² sobre ℝ vs sobre [0, ∞)'),
    back: L('On ℝ → ℝ it is neither injective nor surjective. On [0, ∞) → [0, ∞) it is bijective, with inverse √x.', 'Sobre ℝ → ℝ no es inyectiva ni suprayectiva. Sobre [0, ∞) → [0, ∞) es biyectiva, con inversa √x.', 'Sobre ℝ → ℝ não é injetiva nem sobrejetiva. Sobre [0, ∞) → [0, ∞) é bijetiva, com inversa √x.') },
  { id: 'disc4-fc-6', lessonId: 'disc4-l3-composition', kind: 'command',
    front: L('(g ∘ f)(x)', '(g ∘ f)(x)', '(g ∘ f)(x)'),
    back: L('g(f(x)): apply f first, then g. The codomain of f must fit inside the domain of g.', 'g(f(x)): primero f y luego g. El codominio de f debe caber en el dominio de g.', 'g(f(x)): primeiro f e depois g. O contradomínio de f precisa caber no domínio de g.') },
  { id: 'disc4-fc-7', lessonId: 'disc4-l3-composition', kind: 'concept',
    front: L('Composition of bijections', 'Composición de biyecciones', 'Composição de bijeções'),
    back: L('A composition of bijections is a bijection, and (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.', 'Una composición de biyecciones es una biyección, y (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.', 'Uma composição de bijeções é uma bijeção, e (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.') },
  { id: 'disc4-fc-8', lessonId: 'disc4-l3-composition', kind: 'distinction',
    front: L('g ∘ f vs f ∘ g', 'g ∘ f vs f ∘ g', 'g ∘ f vs f ∘ g'),
    back: L('Usually different. With f(x) = x + 1 and g(x) = x²: g ∘ f = (x + 1)², f ∘ g = x² + 1.', 'Normalmente distintas. Con f(x) = x + 1 y g(x) = x²: g ∘ f = (x + 1)², f ∘ g = x² + 1.', 'Normalmente diferentes. Com f(x) = x + 1 e g(x) = x²: g ∘ f = (x + 1)², f ∘ g = x² + 1.') },
  { id: 'disc4-fc-9', lessonId: 'disc4-l4-inverse', kind: 'concept',
    front: L('When does f⁻¹ exist?', '¿Cuándo existe f⁻¹?', 'Quando f⁻¹ existe?'),
    back: L('Exactly when f is bijective, with f⁻¹ ∘ f = id_A and f ∘ f⁻¹ = id_B.', 'Exactamente cuando f es biyectiva, con f⁻¹ ∘ f = id_A y f ∘ f⁻¹ = id_B.', 'Exatamente quando f é bijetiva, com f⁻¹ ∘ f = id_A e f ∘ f⁻¹ = id_B.') },
  { id: 'disc4-fc-10', lessonId: 'disc4-l4-inverse', kind: 'command',
    front: L('Inverse of a composition', 'Inversa de una composición', 'Inversa de uma composição'),
    back: L('(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹: undo the last step first.', '(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹: deshaz primero el último paso.', '(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹: desfaça primeiro o último passo.') },
  { id: 'disc4-fc-11', lessonId: 'disc4-l5-special-growth', kind: 'concept',
    front: L('Characteristic function χ_S', 'Función característica χ_S', 'Função característica χ_S'),
    back: L('χ_S(x) = 1 if x ∈ S and 0 otherwise. For a finite universe, |S| = Σ χ_S(x).', 'χ_S(x) = 1 si x ∈ S y 0 si no. Para un universo finito, |S| = Σ χ_S(x).', 'χ_S(x) = 1 se x ∈ S e 0 caso contrário. Para um universo finito, |S| = Σ χ_S(x).') },
  { id: 'disc4-fc-12', lessonId: 'disc4-l5-special-growth', kind: 'distinction',
    front: L('O, Θ, and growth', 'O, Θ y crecimiento', 'O, Θ e crescimento'),
    back: L('O is an eventual upper bound, Θ a two-sided bound. 2ⁿ outgrows every polynomial, so 2ⁿ ≠ O(n²).', 'O es una cota superior eventual y Θ una cota por ambos lados. 2ⁿ supera a todo polinomio, así que 2ⁿ ≠ O(n²).', 'O é uma cota superior eventual e Θ uma cota pelos dois lados. 2ⁿ supera todo polinômio, então 2ⁿ ≠ O(n²).') },
];

/** Quiz for Discrete Mathematics, Week 4. */
export const discWeek4Questions: Question[] = [
  {
    id: 'disc4-q-fill-image', type: 'fill-blank', lessonId: 'disc4-l1-functions',
    prompt: L('f : {−2, −1, 0, 1, 2} → ℤ, f(x) = x². How many elements are in the image? ___', 'f : {−2, −1, 0, 1, 2} → ℤ, f(x) = x². ¿Cuántos elementos tiene la imagen? ___', 'f : {−2, −1, 0, 1, 2} → ℤ, f(x) = x². Quantos elementos tem a imagem? ___'),
    accepted: ['3'],
    explanation: L('The image is {0, 1, 4}, so it has 3 elements.', 'La imagen es {0, 1, 4}, así que tiene 3 elementos.', 'A imagem é {0, 1, 4}, então tem 3 elementos.'),
  },
  {
    id: 'disc4-q-mc-preimage', type: 'multiple-choice', lessonId: 'disc4-l1-functions',
    prompt: L('f : ℝ → ℝ, f(x) = x². What is the preimage of {4}?', 'f : ℝ → ℝ, f(x) = x². ¿Cuál es la preimagen de {4}?', 'f : ℝ → ℝ, f(x) = x². Qual é a pré-imagem de {4}?'),
    options: [S('{2}'), S('{−2, 2}'), S('{16}')],
    answer: 1,
    explanation: L('Both 2 and −2 square to 4. The preimage of a set can contain several inputs.', 'Tanto 2 como −2 elevados al cuadrado dan 4. La preimagen de un conjunto puede tener varias entradas.', 'Tanto 2 quanto −2 ao quadrado dão 4. A pré-imagem de um conjunto pode ter várias entradas.'),
    whyWrong: [L('This misses the negative solution.', 'Falta la solución negativa.', 'Falta a solução negativa.'), L('Correct.', 'Correcto.', 'Correto.'), L('16 is 4², not an input whose square is 4.', '16 es 4², no una entrada cuyo cuadrado sea 4.', '16 é 4², não uma entrada cujo quadrado seja 4.')],
  },
  {
    id: 'disc4-q-tf-function', type: 'true-false', lessonId: 'disc4-l1-functions',
    prompt: L('True or false: a function may send one input to two different outputs.', 'Verdadero o falso: una función puede enviar una entrada a dos salidas diferentes.', 'Verdadeiro ou falso: uma função pode enviar uma entrada para duas saídas diferentes.'),
    options: TF, answer: 1,
    explanation: L('False. "Exactly one output per input" is the defining condition of a function.', 'Falso. "Exactamente una salida por entrada" es la condición que define una función.', 'Falso. "Exatamente uma saída por entrada" é a condição que define uma função.'),
  },
  {
    id: 'disc4-q-mc-bijection', type: 'multiple-choice', lessonId: 'disc4-l2-injective-surjective',
    prompt: L('Which function ℤ → ℤ is bijective?', '¿Qué función ℤ → ℤ es biyectiva?', 'Qual função ℤ → ℤ é bijetiva?'),
    options: [S('f(n) = n + 3'), S('f(n) = 2n'), S('f(n) = n²')],
    answer: 0,
    explanation: L('n ↦ n + 3 has inverse n ↦ n − 3. 2n misses the odd integers, and n² is not injective.', 'n ↦ n + 3 tiene inversa n ↦ n − 3. 2n deja fuera los impares, y n² no es inyectiva.', 'n ↦ n + 3 tem inversa n ↦ n − 3. 2n deixa de fora os ímpares, e n² não é injetiva.'),
  },
  {
    id: 'disc4-q-match-classify', type: 'matching', lessonId: 'disc4-l2-injective-surjective',
    prompt: L('Match each function ℤ → ℤ with its classification.', 'Une cada función ℤ → ℤ con su clasificación.', 'Ligue cada função ℤ → ℤ à sua classificação.'),
    left: [S('f(n) = 2n'), S('f(n) = n + 3'), S('f(n) = n²')],
    right: [L('Neither injective nor surjective', 'Ni inyectiva ni suprayectiva', 'Nem injetiva nem sobrejetiva'), L('Injective but not surjective', 'Inyectiva pero no suprayectiva', 'Injetiva mas não sobrejetiva'), L('Bijective', 'Biyectiva', 'Bijetiva')],
    answer: [1, 2, 0],
    explanation: L('Doubling is injective and misses odd numbers; n + 3 is a bijection; squaring repeats values and misses negatives.', 'Duplicar es inyectiva y deja fuera los impares; n + 3 es biyección; elevar al cuadrado repite valores y deja fuera los negativos.', 'Dobrar é injetiva e deixa de fora os ímpares; n + 3 é bijeção; elevar ao quadrado repete valores e deixa de fora os negativos.'),
  },
  {
    id: 'disc4-q-fill-inverse', type: 'fill-blank', lessonId: 'disc4-l4-inverse',
    prompt: L('f(x) = 5x + 2. f⁻¹(12) = ___', 'f(x) = 5x + 2. f⁻¹(12) = ___', 'f(x) = 5x + 2. f⁻¹(12) = ___'),
    accepted: ['2'],
    explanation: L('Solve 5x + 2 = 12: x = 2. Equivalently f⁻¹(x) = (x − 2)/5.', 'Resuelve 5x + 2 = 12: x = 2. Equivalentemente f⁻¹(x) = (x − 2)/5.', 'Resolva 5x + 2 = 12: x = 2. Equivalentemente f⁻¹(x) = (x − 2)/5.'),
  },
  {
    id: 'disc4-q-troubleshoot-inverse', type: 'troubleshooting', lessonId: 'disc4-l4-inverse',
    prompt: L('A student writes: "f(x) = 2x, so f⁻¹(x) = 1/(2x)." What is wrong?', 'Un estudiante escribe: "f(x) = 2x, así que f⁻¹(x) = 1/(2x)". ¿Qué está mal?', 'Um estudante escreve: "f(x) = 2x, então f⁻¹(x) = 1/(2x)". O que está errado?'),
    options: [
      L('The inverse is x/2, not the reciprocal 1/(2x).', 'La inversa es x/2, no el recíproco 1/(2x).', 'A inversa é x/2, não o recíproco 1/(2x).'),
      L('Nothing; f⁻¹ always means 1/f.', 'Nada; f⁻¹ siempre significa 1/f.', 'Nada; f⁻¹ sempre significa 1/f.'),
      L('f has no inverse because it is not surjective.', 'f no tiene inversa porque no es suprayectiva.', 'f não tem inversa porque não é sobrejetiva.'),
    ],
    answer: 0,
    explanation: L('f⁻¹ is the function that undoes f. y = 2x gives x = y/2, so f⁻¹(x) = x/2. The notation f⁻¹ is not a power.', 'f⁻¹ es la función que deshace f. y = 2x da x = y/2, así que f⁻¹(x) = x/2. La notación f⁻¹ no es una potencia.', 'f⁻¹ é a função que desfaz f. y = 2x dá x = y/2, então f⁻¹(x) = x/2. A notação f⁻¹ não é uma potência.'),
  },
  {
    id: 'disc4-q-scenario-compose', type: 'scenario', lessonId: 'disc4-l3-composition',
    prompt: L('f(x) = 2x and g(x) = x + 3. A program needs (g ∘ f)(4). Which computation is right?', 'f(x) = 2x y g(x) = x + 3. Un programa necesita (g ∘ f)(4). ¿Qué cálculo es correcto?', 'f(x) = 2x e g(x) = x + 3. Um programa precisa de (g ∘ f)(4). Qual cálculo está correto?'),
    options: [S('g(8) = 11'), S('f(7) = 14'), S('g(4) + f(4) = 15')],
    answer: 0,
    explanation: L('g ∘ f applies f first: f(4) = 8, then g(8) = 11. The second option is (f ∘ g)(4).', 'g ∘ f aplica f primero: f(4) = 8 y luego g(8) = 11. La segunda opción es (f ∘ g)(4).', 'g ∘ f aplica f primeiro: f(4) = 8 e depois g(8) = 11. A segunda opção é (f ∘ g)(4).'),
  },
  {
    id: 'disc4-q-fill-growth', type: 'fill-blank', lessonId: 'disc4-l5-special-growth',
    prompt: L('3n² + 5n + 2 = Θ(nᵏ). k = ___', '3n² + 5n + 2 = Θ(nᵏ). k = ___', '3n² + 5n + 2 = Θ(nᵏ). k = ___'),
    accepted: ['2'],
    explanation: L('The highest-degree term dominates, so the growth is quadratic: k = 2.', 'Domina el término de mayor grado, así que el crecimiento es cuadrático: k = 2.', 'Domina o termo de maior grau, então o crescimento é quadrático: k = 2.'),
  },
  {
    id: 'disc4-q-mc-characteristic', type: 'multiple-choice', lessonId: 'disc4-l5-special-growth',
    prompt: L('A = {1, 2, 3, 4, 5}, S = {2, 4}. What is Σ_{x∈A} χ_S(x)?', 'A = {1, 2, 3, 4, 5}, S = {2, 4}. ¿Cuánto es Σ_{x∈A} χ_S(x)?', 'A = {1, 2, 3, 4, 5}, S = {2, 4}. Quanto é Σ_{x∈A} χ_S(x)?'),
    options: [S('2'), S('4'), S('5')],
    answer: 0,
    explanation: L('χ_S is 0, 1, 0, 1, 0 across A, so the sum is 2 = |S|.', 'χ_S es 0, 1, 0, 1, 0 sobre A, así que la suma es 2 = |S|.', 'χ_S é 0, 1, 0, 1, 0 sobre A, então a soma é 2 = |S|.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 4. */
export const discWeek4Activities: Activity[] = [
  {
    id: 'disc4-act-order-classify', kind: 'order', lessonId: 'disc4-l2-injective-surjective',
    title: L('Classify a function in order', 'Clasifica una función en orden', 'Classifique uma função em ordem'),
    prompt: L('Order the steps for classifying a function A → B.', 'Ordena los pasos para clasificar una función A → B.', 'Ordene os passos para classificar uma função A → B.'),
    items: [
      L('State the domain A and the codomain B', 'Indica el dominio A y el codominio B', 'Indique o domínio A e o contradomínio B'),
      L('Check that every input has exactly one output', 'Comprueba que cada entrada tiene exactamente una salida', 'Verifique se cada entrada tem exatamente uma saída'),
      L('Find the image by collecting all outputs', 'Halla la imagen reuniendo todas las salidas', 'Encontre a imagem reunindo todas as saídas'),
      L('For injectivity, look for two inputs with the same output', 'Para la inyectividad, busca dos entradas con la misma salida', 'Para a injetividade, procure duas entradas com a mesma saída'),
      L('For surjectivity, compare the image with the codomain', 'Para la suprayectividad, compara la imagen con el codominio', 'Para a sobrejetividade, compare a imagem com o contradomínio'),
    ],
    explanation: L('Domain and codomain come first; then single-valuedness, image, injectivity, and surjectivity.', 'Primero dominio y codominio; luego univalencia, imagen, inyectividad y suprayectividad.', 'Primeiro domínio e contradomínio; depois univalência, imagem, injetividade e sobrejetividade.'),
  },
  {
    id: 'disc4-act-fill-inverse', kind: 'code-fill', lessonId: 'disc4-l4-inverse',
    title: L('Complete the inverse formula', 'Completa la fórmula de la inversa', 'Complete a fórmula da inversa'),
    prompt: L('f(x) = 3x − 6. Fill the blanks in its inverse.', 'f(x) = 3x − 6. Completa los huecos de su inversa.', 'f(x) = 3x − 6. Complete as lacunas de sua inversa.'),
    template: 'y = 3x - 6\n3x = y + {0}\nx = (y + 6) / {1}\nf⁻¹(x) = (x + 6) / {1}',
    blanks: ['6', '3'],
    explanation: L('Add 6 to both sides, then divide by 3. Check f⁻¹(6) = 4 and f(4) = 6.', 'Suma 6 a ambos lados y divide por 3. Comprueba f⁻¹(6) = 4 y f(4) = 6.', 'Some 6 aos dois lados e divida por 3. Confira f⁻¹(6) = 4 e f(4) = 6.'),
  },
  {
    id: 'disc4-act-scramble-compose', kind: 'scramble', lessonId: 'disc4-l3-composition',
    title: L('Rebuild the composition', 'Reconstruye la composición', 'Reconstrua a composição'),
    prompt: L('Rebuild the Python definition of composition.', 'Reconstruye la definición de composición en Python.', 'Reconstrua a definição de composição em Python.'),
    tokens: ['compose', '=', 'lambda', 'f,', 'g:', 'lambda', 'x:', 'g(f(x))'],
    explanation: L('The inner lambda applies f, and the outer lambda applies g to that result.', 'La lambda interna aplica f y la externa aplica g a ese resultado.', 'A lambda interna aplica f e a externa aplica g a esse resultado.'),
  },
  {
    id: 'disc4-act-classify-growth', kind: 'classify', lessonId: 'disc4-l5-special-growth',
    title: L('Sort by growth', 'Clasifica por crecimiento', 'Classifique por crescimento'),
    prompt: L('Sort each function into its growth class.', 'Clasifica cada función en su clase de crecimiento.', 'Classifique cada função em sua classe de crescimento.'),
    buckets: [L('Θ(n)', 'Θ(n)', 'Θ(n)'), L('Θ(n²)', 'Θ(n²)', 'Θ(n²)'), L('Exponential', 'Exponencial', 'Exponencial')],
    items: [
      { text: S('n + 5'), bucket: 0 },
      { text: S('3n² + 2n'), bucket: 1 },
      { text: S('2ⁿ'), bucket: 2 },
      { text: S('n²/2'), bucket: 1 },
      { text: S('100n'), bucket: 0 },
    ],
    explanation: L('Constant factors do not change Θ; the dominant term does. Exponential growth forms its own class.', 'Los factores constantes no cambian Θ; el término dominante sí. El crecimiento exponencial forma su propia clase.', 'Fatores constantes não mudam Θ; o termo dominante sim. O crescimento exponencial forma sua própria classe.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 4, with worked answers. */
export const discWeek4Labs: Lab[] = [
  {
    id: 'disc4-lab-1-function-zoo', kind: 'math', level: 1, minutes: 40,
    title: L('A zoo of functions', 'Un zoológico de funciones', 'Um zoológico de funções'),
    goal: L('Classify functions by injectivity and surjectivity, and build inverses where they exist.', 'Clasificar funciones por inyectividad y suprayectividad, y construir inversas cuando existan.', 'Classificar funções por injetividade e sobrejetividade, e construir inversas quando existirem.'),
    steps: [
      { id: 'disc4-lab1-s1', title: L('Three classifications', 'Tres clasificaciones', 'Três classificações'), commands: ['f : ℝ → ℝ, f(x) = 4x − 1; g : ℝ → ℝ, g(x) = x² + 1; h : {1,2,3} → {a,b,c}, h(1)=b, h(2)=c, h(3)=a'],
        expected: L('f is bijective. g is neither: g(1) = g(−1), and no value below 1 is reached. h is bijective.', 'f es biyectiva. g no es ninguna: g(1) = g(−1) y no alcanza valores menores que 1. h es biyectiva.', 'f é bijetiva. g não é nenhuma: g(1) = g(−1) e não atinge valores abaixo de 1. h é bijetiva.') },
      { id: 'disc4-lab1-s2', title: L('Inverse of f', 'Inversa de f', 'Inversa de f'), commands: ['Solve y = 4x − 1'],
        expected: L('x = (y + 1)/4, so f⁻¹(x) = (x + 1)/4. Check f⁻¹(3) = 1 and f(1) = 3.', 'x = (y + 1)/4, así que f⁻¹(x) = (x + 1)/4. Comprueba f⁻¹(3) = 1 y f(1) = 3.', 'x = (y + 1)/4, então f⁻¹(x) = (x + 1)/4. Confira f⁻¹(3) = 1 e f(1) = 3.') },
      { id: 'disc4-lab1-s3', title: L('Restrict and invert g', 'Restringe e invierte g', 'Restrinja e inverta g'), commands: ['g : [0, ∞) → [1, ∞), g(x) = x² + 1'],
        expected: L('On this domain g is bijective, with inverse g⁻¹(x) = √(x − 1).', 'En este dominio g es biyectiva, con inversa g⁻¹(x) = √(x − 1).', 'Neste domínio g é bijetiva, com inversa g⁻¹(x) = √(x − 1).') },
      { id: 'disc4-lab1-s4', title: L('Compose and invert', 'Compón e invierte', 'Componha e inverta'), commands: ['g ∘ f and (g ∘ f)⁻¹ for f(x) = x + 2, g(x) = 3x'],
        expected: L('(g ∘ f)(x) = 3x + 6, inverse (x − 6)/3. Also f⁻¹ ∘ g⁻¹ = x/3 − 2 = (x − 6)/3.', '(g ∘ f)(x) = 3x + 6, inversa (x − 6)/3. También f⁻¹ ∘ g⁻¹ = x/3 − 2 = (x − 6)/3.', '(g ∘ f)(x) = 3x + 6, inversa (x − 6)/3. Também f⁻¹ ∘ g⁻¹ = x/3 − 2 = (x − 6)/3.') },
    ],
  },
  {
    id: 'disc4-lab-2-counting-growth', kind: 'math', level: 2, minutes: 45,
    title: L('Counting functions and comparing growth', 'Contar funciones y comparar crecimiento', 'Contar funções e comparar crescimento'),
    goal: L('Count functions, injections, and bijections between finite sets, then compare asymptotic growth.', 'Contar funciones, inyecciones y biyecciones entre conjuntos finitos, y comparar el crecimiento asintótico.', 'Contar funções, injeções e bijeções entre conjuntos finitos, e comparar o crescimento assintótico.'),
    steps: [
      { id: 'disc4-lab2-s1', title: L('All functions', 'Todas las funciones', 'Todas as funções'), commands: ['|A| = 4, |B| = 6'],
        expected: L('6⁴ = 1296 functions from A to B.', '6⁴ = 1296 funciones de A en B.', '6⁴ = 1296 funções de A em B.') },
      { id: 'disc4-lab2-s2', title: L('Injections', 'Inyecciones', 'Injeções'), commands: ['Count injective A → B'],
        expected: L('6·5·4·3 = 360: the first input has 6 choices, the next 5, and so on.', '6·5·4·3 = 360: la primera entrada tiene 6 opciones, la siguiente 5, etc.', '6·5·4·3 = 360: a primeira entrada tem 6 opções, a seguinte 5, e assim por diante.') },
      { id: 'disc4-lab2-s3', title: L('Bijections', 'Biyecciones', 'Bijeções'), commands: ['|A| = |B| = 4'],
        expected: L('4! = 24 bijections: every permutation of B is one.', '4! = 24 biyecciones: cada permutación de B es una.', '4! = 24 bijeções: cada permutação de B é uma.') },
      { id: 'disc4-lab2-s4', title: L('Growth order', 'Orden de crecimiento', 'Ordem de crescimento'), commands: ['Order 100n, n log n, n², 2ⁿ, n! for large n'],
        expected: L('100n < n log n < n² < 2ⁿ < n!. Constants do not matter; the class does.', '100n < n log n < n² < 2ⁿ < n!. Las constantes no importan; la clase sí.', '100n < n log n < n² < 2ⁿ < n!. As constantes não importam; a classe sim.') },
    ],
  },
];
