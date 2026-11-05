import type { Lab, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/**
 * Paper-and-pencil labs for Calculus 1, Week 2, in the same families as the
 * week's class work but with new numbers. Lines that start with "y =" open in
 * the Graph Lab, so every answer can be checked against a picture.
 */
export const calcWeek2Labs: Lab[] = [
  {
    id: 'calc2-lab-1-domain', kind: 'math', level: 1, minutes: 40,
    title: L('Evaluate, find domains, and read graphs', 'Evaluar, hallar dominios y leer gráficas', 'Avaliar, encontrar domínios e ler gráficos'),
    goal: L('Evaluate functions, find domains and ranges, and check them against the graph.', 'Evaluar funciones, hallar dominios y rangos y compararlos con la gráfica.', 'Avaliar funções, encontrar domínios e imagens e compará-los com o gráfico.'),
    steps: [
      { id: 'calc2-lab1-s1', title: L('Evaluate', 'Evaluar', 'Avaliar'), commands: ['f(x) = x^2 - 2x + 4', 'f(-1), f(3), f(1/2), f(a + 2)'],
        expected: L('7, 7, 13/4, and a² + 2a + 4. Notice f(−1) = f(3): the parabola is symmetric about x = 1.', '7, 7, 13/4 y a² + 2a + 4. Fíjate en que f(−1) = f(3): la parábola es simétrica respecto a x = 1.', '7, 7, 13/4 e a² + 2a + 4. Repare que f(−1) = f(3): a parábola é simétrica em relação a x = 1.') },
      { id: 'calc2-lab1-s2', title: L('A fraction', 'Una fracción', 'Uma fração'), commands: ['y = (x + 2)/(x^2 - x - 12)'],
        expected: L('x² − x − 12 = (x − 4)(x + 3), so the domain is ℝ \\ {−3, 4}. Draw it: two vertical asymptotes.', 'x² − x − 12 = (x − 4)(x + 3), así que el dominio es ℝ \\ {−3, 4}. Dibújala: dos asíntotas verticales.', 'x² − x − 12 = (x − 4)(x + 3), então o domínio é ℝ \\ {−3, 4}. Desenhe: duas assíntotas verticais.') },
      { id: 'calc2-lab1-s3', title: L('A root over a line', 'Una raíz sobre una recta', 'Uma raiz sobre uma reta'), commands: ['y = sqrt(8 - 2x)/(x + 1)'],
        expected: L('8 − 2x ≥ 0 gives x ≤ 4, and x ≠ −1: domain (−∞, −1) ∪ (−1, 4].', '8 − 2x ≥ 0 da x ≤ 4, y x ≠ −1: dominio (−∞, −1) ∪ (−1, 4].', '8 − 2x ≥ 0 dá x ≤ 4, e x ≠ −1: domínio (−∞, −1) ∪ (−1, 4].') },
      { id: 'calc2-lab1-s4', title: L('A logarithm', 'Un logaritmo', 'Um logaritmo'), commands: ['y = ln(9 - x^2)'],
        expected: L('9 − x² > 0 gives (−3, 3). The graph has vertical asymptotes at both ends and its highest point is ln 9 ≈ 2.2 at x = 0, so the range is (−∞, ln 9].', '9 − x² > 0 da (−3, 3). La gráfica tiene asíntotas verticales en ambos extremos y su punto más alto es ln 9 ≈ 2,2 en x = 0, así que el rango es (−∞, ln 9].', '9 − x² > 0 dá (−3, 3). O gráfico tem assíntotas verticais nas duas pontas e seu ponto mais alto é ln 9 ≈ 2,2 em x = 0, então a imagem é (−∞, ln 9].') },
      { id: 'calc2-lab1-s5', title: L('Symmetry and growth', 'Simetría y crecimiento', 'Simetria e crescimento'), commands: ['y = x^3 - 3x'],
        expected: L('Odd (f(−x) = −f(x)). Increasing on (−∞, −1] and [1, ∞), decreasing on [−1, 1]; local max f(−1) = 2, local min f(1) = −2.', 'Impar (f(−x) = −f(x)). Creciente en (−∞, −1] y [1, ∞), decreciente en [−1, 1]; máximo local f(−1) = 2, mínimo local f(1) = −2.', 'Ímpar (f(−x) = −f(x)). Crescente em (−∞, −1] e [1, ∞), decrescente em [−1, 1]; máximo local f(−1) = 2, mínimo local f(1) = −2.') },
    ],
  },
  {
    id: 'calc2-lab-2-families', kind: 'math', level: 2, minutes: 45,
    title: L('Families, pieces, and transformations', 'Familias, tramos y transformaciones', 'Famílias, partes e transformações'),
    goal: L('Graph each family from its formula and predict transformations before drawing them.', 'Graficar cada familia a partir de su fórmula y predecir las transformaciones antes de dibujarlas.', 'Traçar cada família a partir da fórmula e prever as transformações antes de desenhá-las.'),
    steps: [
      { id: 'calc2-lab2-s1', title: L('A line from a story', 'Una recta a partir de una historia', 'Uma reta a partir de uma história'), commands: ['A delivery van: 18,000 new, worth 6,000 after 8 years (linear)'],
        expected: L('Slope (6000 − 18000)/8 = −1500 per year: V(t) = 18000 − 1500t. It reaches 0 at t = 12 years.', 'Pendiente (6000 − 18000)/8 = −1500 por año: V(t) = 18000 − 1500t. Llega a 0 en t = 12 años.', 'Inclinação (6000 − 18000)/8 = −1500 por ano: V(t) = 18000 − 1500t. Chega a 0 em t = 12 anos.') },
      { id: 'calc2-lab2-s2', title: L('A rational function', 'Una función racional', 'Uma função racional'), commands: ['y = (3x - 6)/(x + 1)'],
        expected: L('Domain x ≠ −1; vertical asymptote x = −1, horizontal asymptote y = 3; zero at x = 2; y-intercept −6.', 'Dominio x ≠ −1; asíntota vertical x = −1, asíntota horizontal y = 3; cero en x = 2; corte con y en −6.', 'Domínio x ≠ −1; assíntota vertical x = −1, assíntota horizontal y = 3; zero em x = 2; corte com y em −6.') },
      { id: 'calc2-lab2-s3', title: L('A root function', 'Una función con raíz', 'Uma função com raiz'), commands: ['y = -sqrt(x + 1) + 3'],
        expected: L('Domain [−1, ∞), starts at (−1, 3), passes (0, 2), (3, 1), (8, 0), and keeps falling: range (−∞, 3].', 'Dominio [−1, ∞), empieza en (−1, 3), pasa por (0, 2), (3, 1), (8, 0) y sigue bajando: rango (−∞, 3].', 'Domínio [−1, ∞), começa em (−1, 3), passa por (0, 2), (3, 1), (8, 0) e continua descendo: imagem (−∞, 3].') },
      { id: 'calc2-lab2-s4', title: L('A piecewise function', 'Una función por tramos', 'Uma função por partes'), commands: ['f(x) = -1 if x < 0;  x^2 - 1 if 0 <= x <= 2;  x + 1 if x > 2'],
        expected: L('At x = 0 there is no break (−1 and −1); at x = 2 both sides give 3. Range: {−1} ∪ [−1, 3] ∪ (3, ∞) = [−1, ∞).', 'En x = 0 no hay corte (−1 y −1); en x = 2 ambos lados dan 3. Rango: {−1} ∪ [−1, 3] ∪ (3, ∞) = [−1, ∞).', 'Em x = 0 não há quebra (−1 e −1); em x = 2 os dois lados dão 3. Imagem: {−1} ∪ [−1, 3] ∪ (3, ∞) = [−1, ∞).') },
      { id: 'calc2-lab2-s5', title: L('Predict, then draw', 'Predice y luego dibuja', 'Preveja e depois desenhe'), commands: ['y = 2abs(x - 3) - 4'],
        expected: L('|x| moved right 3, stretched by 2, moved down 4: vertex (3, −4), zeros at x = 1 and x = 5, range [−4, ∞).', '|x| movida 3 a la derecha, estirada por 2 y bajada 4: vértice (3, −4), ceros en x = 1 y x = 5, rango [−4, ∞).', '|x| movida 3 para a direita, esticada por 2 e descida 4: vértice (3, −4), zeros em x = 1 e x = 5, imagem [−4, ∞).') },
    ],
  },
  {
    id: 'calc2-lab-3-composition-trig', kind: 'math', level: 2, minutes: 45,
    title: L('Composition, inverses, and waves', 'Composición, inversas y ondas', 'Composição, inversas e ondas'),
    goal: L('Compose and invert functions, then read amplitude, period, and range from trigonometric formulas.', 'Componer e invertir funciones y luego leer amplitud, período y rango en fórmulas trigonométricas.', 'Compor e inverter funções e depois ler amplitude, período e imagem em fórmulas trigonométricas.'),
    steps: [
      { id: 'calc2-lab3-s1', title: L('Compose in both orders', 'Compón en ambos órdenes', 'Componha nas duas ordens'), commands: ['f(x) = sqrt(x)   g(x) = 2x - 6', 'f(g(x)) = ?   g(f(x)) = ?'],
        expected: L('f(g(x)) = √(2x − 6), domain [3, ∞). g(f(x)) = 2√x − 6, domain [0, ∞).', 'f(g(x)) = √(2x − 6), dominio [3, ∞). g(f(x)) = 2√x − 6, dominio [0, ∞).', 'f(g(x)) = √(2x − 6), domínio [3, ∞). g(f(x)) = 2√x − 6, domínio [0, ∞).') },
      { id: 'calc2-lab3-s2', title: L('An inverse and its mirror', 'Una inversa y su reflejo', 'Uma inversa e seu espelho'), commands: ['f(x) = (x + 5)/4', 'y = (x + 5)/4;  y = 4x - 5;  y = x'],
        expected: L('f⁻¹(x) = 4x − 5. Draw all three: the two lines are mirror images across y = x and meet on it at (5/3, 5/3).', 'f⁻¹(x) = 4x − 5. Dibuja las tres: las dos rectas son reflejo una de la otra respecto a y = x y se cortan sobre ella en (5/3, 5/3).', 'f⁻¹(x) = 4x − 5. Desenhe as três: as duas retas são espelho uma da outra em relação a y = x e se cortam sobre ela em (5/3, 5/3).') },
      { id: 'calc2-lab3-s3', title: L('A trigonometric value', 'Un valor trigonométrico', 'Um valor trigonométrico'), commands: ['h(x) = 3cos(x)^2 - 2sin(x)', 'h(pi/6) = ?   h(pi) = ?'],
        expected: L('h(π/6) = 3·(3/4) − 2·(1/2) = 9/4 − 1 = 5/4. h(π) = 3·1 − 0 = 3.', 'h(π/6) = 3·(3/4) − 2·(1/2) = 9/4 − 1 = 5/4. h(π) = 3·1 − 0 = 3.', 'h(π/6) = 3·(3/4) − 2·(1/2) = 9/4 − 1 = 5/4. h(π) = 3·1 − 0 = 3.') },
      { id: 'calc2-lab3-s4', title: L('A wave', 'Una onda', 'Uma onda'), commands: ['y = 2sin(3x) + 1'],
        expected: L('Amplitude 2, period 2π/3 ≈ 2.09, midline y = 1, range [−1, 3]. Hover over two consecutive peaks in the Graph Lab to measure the period.', 'Amplitud 2, período 2π/3 ≈ 2,09, línea media y = 1, rango [−1, 3]. Pasa el cursor por dos picos seguidos en el Laboratorio de gráficas para medir el período.', 'Amplitude 2, período 2π/3 ≈ 2,09, linha média y = 1, imagem [−1, 3]. Passe o cursor por dois picos seguidos no Laboratório de gráficos para medir o período.') },
      { id: 'calc2-lab3-s5', title: L('Count the crossings', 'Cuenta los cruces', 'Conte os cruzamentos'), commands: ['y = sin(x);  y = 0.5', 'how many solutions in [0, 4pi]?'],
        expected: L('sin x = 1/2 at π/6 and 5π/6 in each turn: π/6, 5π/6, 13π/6, 17π/6. Four crossings.', 'sen x = 1/2 en π/6 y 5π/6 en cada vuelta: π/6, 5π/6, 13π/6, 17π/6. Cuatro cruces.', 'sen x = 1/2 em π/6 e 5π/6 em cada volta: π/6, 5π/6, 13π/6, 17π/6. Quatro cruzamentos.') },
    ],
  },
  {
    id: 'calc2-lab-4-exp-log', kind: 'math', level: 3, minutes: 45,
    title: L('Exponentials and logarithms at work', 'Exponenciales y logaritmos en acción', 'Exponenciais e logaritmos na prática'),
    goal: L('Model growth and decay, solve exponential and log equations, and verify each answer on a graph.', 'Modelar crecimiento y decaimiento, resolver ecuaciones exponenciales y logarítmicas y verificar cada respuesta en una gráfica.', 'Modelar crescimento e decaimento, resolver equações exponenciais e logarítmicas e verificar cada resposta num gráfico.'),
    steps: [
      { id: 'calc2-lab4-s1', title: L('Same base', 'Misma base', 'Mesma base'), commands: ['9^(x - 1) = 27^x'],
        expected: L('3^(2x − 2) = 3^(3x), so 2x − 2 = 3x and x = −2. Check: 9⁻³ = 3⁻⁶ = 27⁻².', '3^(2x − 2) = 3^(3x), así que 2x − 2 = 3x y x = −2. Comprobación: 9⁻³ = 3⁻⁶ = 27⁻².', '3^(2x − 2) = 3^(3x), então 2x − 2 = 3x e x = −2. Conferência: 9⁻³ = 3⁻⁶ = 27⁻².') },
      { id: 'calc2-lab4-s2', title: L('A cooling cup of tea', 'Una taza de té que se enfría', 'Uma xícara de chá esfriando'), commands: ['y = 22 + 68e^(-0.08x)', 'when is the tea at 50 degrees?'],
        expected: L('68e^(−0.08x) = 28 → x = ln(68/28)/0.08 ≈ 11.1 minutes. The curve approaches the room temperature 22 but never reaches it.', '68e^(−0,08x) = 28 → x = ln(68/28)/0,08 ≈ 11,1 minutos. La curva se acerca a la temperatura ambiente 22 pero nunca la alcanza.', '68e^(−0,08x) = 28 → x = ln(68/28)/0,08 ≈ 11,1 minutos. A curva se aproxima da temperatura ambiente 22 mas nunca a alcança.') },
      { id: 'calc2-lab4-s3', title: L('An exponential and its inverse', 'Una exponencial y su inversa', 'Uma exponencial e sua inversa'), commands: ['y = 2^x;  y = ln(x)/ln(2);  y = x'],
        expected: L('log₂ x = ln x / ln 2 is the inverse of 2ˣ: the curves mirror each other across y = x, through (0, 1) and (1, 0).', 'log₂ x = ln x / ln 2 es la inversa de 2ˣ: las curvas se reflejan respecto a y = x, por (0, 1) y (1, 0).', 'log₂ x = ln x / ln 2 é a inversa de 2ˣ: as curvas se espelham em relação a y = x, por (0, 1) e (1, 0).') },
      { id: 'calc2-lab4-s4', title: L('A log equation', 'Una ecuación logarítmica', 'Uma equação logarítmica'), commands: ['log(x) + log(x - 15) = 2'],
        expected: L('x(x − 15) = 100 → x² − 15x − 100 = 0 → (x − 20)(x + 5) = 0. x = −5 is not allowed, so x = 20.', 'x(x − 15) = 100 → x² − 15x − 100 = 0 → (x − 20)(x + 5) = 0. x = −5 no está permitido, así que x = 20.', 'x(x − 15) = 100 → x² − 15x − 100 = 0 → (x − 20)(x + 5) = 0. x = −5 não é permitido, então x = 20.') },
      { id: 'calc2-lab4-s5', title: L('Earthquake energy', 'Energía de un sismo', 'Energia de um terremoto'), commands: ['magnitude M = log(A/A0)', 'compare M = 6.2 with M = 8.0'],
        expected: L('The amplitudes differ by 10^(8.0 − 6.2) = 10^1.8 ≈ 63 times. Each unit of magnitude multiplies the amplitude by 10.', 'Las amplitudes difieren en 10^(8,0 − 6,2) = 10^1,8 ≈ 63 veces. Cada unidad de magnitud multiplica la amplitud por 10.', 'As amplitudes diferem 10^(8,0 − 6,2) = 10^1,8 ≈ 63 vezes. Cada unidade de magnitude multiplica a amplitude por 10.') },
    ],
  },
];
