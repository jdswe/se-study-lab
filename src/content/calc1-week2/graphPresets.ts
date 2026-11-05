import type { Localized } from '../types';
import type { GraphPreset } from '../../lib/graph';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Ready-made views for the Graph Lab, one per idea of the week. */
export const graphPresets: GraphPreset[] = [
  {
    id: 'gp2-families', items: ['y = 2x - 1', 'y = x^2 - 3', 'y = (x^3 - 4x)/3', 'y = sqrt(x)', 'y = 1/x'],
    title: L('Basic families', 'Las familias básicas', 'As famílias básicas'),
    note: L('A line, a parabola, a cubic, a square root, and 1/x. Hide all but one (●) to study each shape: the root starts at 0, and 1/x has two branches with asymptotes on both axes.', 'Una recta, una parábola, una cúbica, una raíz cuadrada y 1/x. Oculta todas menos una (●) para estudiar cada forma: la raíz empieza en 0 y 1/x tiene dos ramas con asíntotas en ambos ejes.', 'Uma reta, uma parábola, uma cúbica, uma raiz quadrada e 1/x. Esconda todas menos uma (●) para estudar cada forma: a raiz começa em 0 e 1/x tem dois ramos com assíntotas nos dois eixos.'),
  },
  {
    id: 'gp2-domain', items: ['y = sqrt(x + 2)', 'y = 1/(x - 3)', 'y = ln(x - 1)'],
    title: L('Where a formula lives', 'Dónde vive una fórmula', 'Onde uma fórmula vive'),
    note: L('Each curve exists only on its domain: the root from x = −2 on, the fraction everywhere except x = 3, the logarithm only for x > 1.', 'Cada curva existe solo en su dominio: la raíz desde x = −2, la fracción en todas partes menos x = 3, el logaritmo solo para x > 1.', 'Cada curva existe só no seu domínio: a raiz a partir de x = −2, a fração em todo lugar menos x = 3, o logaritmo só para x > 1.'),
  },
  {
    id: 'gp2-symmetry', items: ['y = x^4 - 3x^2', 'y = x^3 - 2x'], view: { xmin: -3, xmax: 3, ymin: -4, ymax: 4 },
    title: L('Even and odd', 'Par e impar', 'Par e ímpar'),
    note: L('x⁴ − 3x² is even: the y-axis is a mirror. x³ − 2x is odd: a half-turn about the origin leaves it unchanged. Hover over x = 1 and x = −1 to compare the values.', 'x⁴ − 3x² es par: el eje y es un espejo. x³ − 2x es impar: media vuelta alrededor del origen la deja igual. Pasa el cursor por x = 1 y x = −1 para comparar los valores.', 'x⁴ − 3x² é par: o eixo y é um espelho. x³ − 2x é ímpar: meia volta em torno da origem a deixa igual. Passe o cursor por x = 1 e x = −1 para comparar os valores.'),
  },
  {
    id: 'gp2-piecewise', items: ['y = x + 3 + 0sqrt(-1 - x)', 'y = x^2 + 0sqrt((x + 1)(2 - x))', 'y = 4 + 0sqrt(x - 2)'], view: { xmin: -5, xmax: 5, ymin: -2, ymax: 6 },
    title: L('A function in three pieces', 'Una función de tres tramos', 'Uma função de três partes'),
    note: L('x + 3 for x < −1, x² for −1 ≤ x ≤ 2, and 4 for x > 2. The added 0·sqrt(…) is a trick that keeps each piece on its own interval. See the jump at x = −1 and the smooth join at x = 2.', 'x + 3 para x < −1, x² para −1 ≤ x ≤ 2 y 4 para x > 2. El 0·sqrt(…) agregado es un truco que deja cada tramo en su propio intervalo. Mira el salto en x = −1 y la unión sin corte en x = 2.', 'x + 3 para x < −1, x² para −1 ≤ x ≤ 2 e 4 para x > 2. O 0·sqrt(…) acrescentado é um truque que mantém cada parte no seu intervalo. Veja o salto em x = −1 e a junção sem quebra em x = 2.'),
  },
  {
    id: 'gp2-abs', items: ['y = abs(x)', 'y = abs(x - 2) - 1', 'y = abs(x^2 - 4)'], view: { xmin: -5, xmax: 5, ymin: -2, ymax: 7 },
    title: L('Absolute value', 'Valor absoluto', 'Valor absoluto'),
    note: L('|x| is a V. |x − 2| − 1 is the same V with its vertex at (2, −1). |x² − 4| flips the part of the parabola that was below the x-axis.', '|x| es una V. |x − 2| − 1 es la misma V con vértice en (2, −1). |x² − 4| da vuelta la parte de la parábola que estaba debajo del eje x.', '|x| é um V. |x − 2| − 1 é o mesmo V com vértice em (2, −1). |x² − 4| vira para cima a parte da parábola que estava abaixo do eixo x.'),
  },
  {
    id: 'gp2-shifts', items: ['y = x^2', 'y = (x - 3)^2 + 1', 'y = -2(x + 1)^2 + 4'], view: { xmin: -6, xmax: 7, ymin: -6, ymax: 8 },
    title: L('Shifts, stretches, reflections', 'Desplazamientos, estiramientos, reflexiones', 'Deslocamentos, esticamentos, reflexões'),
    note: L('The same parabola, moved: vertex (3, 1) for the second; left 1, stretched by 2, flipped, and up 4 for the third, with vertex (−1, 4). Edit the numbers and predict before you look.', 'La misma parábola, movida: vértice (3, 1) en la segunda; 1 a la izquierda, estirada por 2, dada vuelta y subida 4 en la tercera, con vértice (−1, 4). Cambia los números y predice antes de mirar.', 'A mesma parábola, movida: vértice (3, 1) na segunda; 1 para a esquerda, esticada por 2, virada e subida 4 na terceira, com vértice (−1, 4). Mude os números e preveja antes de olhar.'),
  },
  {
    id: 'gp2-roots', items: ['y = sqrt(x)', 'y = 2sqrt(x)', 'y = sqrt(-x)', 'y = -sqrt(x - 1)'], view: { xmin: -6, xmax: 6, ymin: -4, ymax: 5 },
    title: L('Reflections of a root', 'Reflejos de una raíz', 'Reflexos de uma raiz'),
    note: L('2√x stretches upward, √(−x) mirrors across the y-axis (it lives on x ≤ 0), and −√(x − 1) moves right 1 and flips below the x-axis.', '2√x se estira hacia arriba, √(−x) se refleja en el eje y (vive en x ≤ 0) y −√(x − 1) se mueve 1 a la derecha y se da vuelta bajo el eje x.', '2√x se estica para cima, √(−x) se espelha no eixo y (vive em x ≤ 0) e −√(x − 1) se move 1 para a direita e vira abaixo do eixo x.'),
  },
  {
    id: 'gp2-inverse', items: ['y = 2x + 3', 'y = (x - 3)/2', 'y = x'], view: { xmin: -6, xmax: 6, ymin: -6, ymax: 6 },
    title: L('A function and its inverse', 'Una función y su inversa', 'Uma função e sua inversa'),
    note: L('f(x) = 2x + 3 and f⁻¹(x) = (x − 3)/2 are mirror images across y = x. The point (1, 5) on f matches (5, 1) on f⁻¹.', 'f(x) = 2x + 3 y f⁻¹(x) = (x − 3)/2 son reflejo una de la otra respecto a y = x. El punto (1, 5) de f corresponde a (5, 1) de f⁻¹.', 'f(x) = 2x + 3 e f⁻¹(x) = (x − 3)/2 são espelho uma da outra em relação a y = x. O ponto (1, 5) de f corresponde a (5, 1) de f⁻¹.'),
  },
  {
    id: 'gp2-trig', items: ['y = sin(x)', 'y = cos(x)', 'y = tan(x)'], view: { xmin: -7, xmax: 7, ymin: -3, ymax: 3 },
    title: L('Sine, cosine, tangent', 'Seno, coseno, tangente', 'Seno, cosseno, tangente'),
    note: L('x is in radians. Sine and cosine repeat every 2π ≈ 6.28 and stay between −1 and 1; tangent repeats every π and has asymptotes at ±π/2 ≈ ±1.57.', 'x está en radianes. El seno y el coseno se repiten cada 2π ≈ 6,28 y quedan entre −1 y 1; la tangente se repite cada π y tiene asíntotas en ±π/2 ≈ ±1,57.', 'x está em radianos. Seno e cosseno se repetem a cada 2π ≈ 6,28 e ficam entre −1 e 1; a tangente se repete a cada π e tem assíntotas em ±π/2 ≈ ±1,57.'),
  },
  {
    id: 'gp2-amplitude', items: ['y = sin(x)', 'y = 3sin(2x)', 'y = 2cos(x) + 1'], view: { xmin: -7, xmax: 7, ymin: -4, ymax: 4 },
    title: L('Amplitude, period, midline', 'Amplitud, período, línea media', 'Amplitude, período, linha média'),
    note: L('3 sin(2x) is three times taller and twice as fast (period π). 2 cos x + 1 has amplitude 2 around the midline y = 1, so its range is [−1, 3].', '3 sen(2x) es tres veces más alta y el doble de rápida (período π). 2 cos x + 1 tiene amplitud 2 alrededor de la línea media y = 1, así que su rango es [−1, 3].', '3 sen(2x) é três vezes mais alta e duas vezes mais rápida (período π). 2 cos x + 1 tem amplitude 2 em torno da linha média y = 1, então sua imagem é [−1, 3].'),
  },
  {
    id: 'gp2-exp', items: ['y = 2^x', 'y = (1/2)^x', 'y = e^x'], view: { xmin: -4, xmax: 4, ymin: -1, ymax: 8 },
    title: L('Exponential growth and decay', 'Crecimiento y decaimiento exponencial', 'Crescimento e decaimento exponencial'),
    note: L('All three pass through (0, 1) and stay above the x-axis. 2ˣ and eˣ grow; (1/2)ˣ is the mirror image of 2ˣ and decays.', 'Las tres pasan por (0, 1) y quedan por encima del eje x. 2ˣ y eˣ crecen; (1/2)ˣ es el reflejo de 2ˣ y decrece.', 'As três passam por (0, 1) e ficam acima do eixo x. 2ˣ e eˣ crescem; (1/2)ˣ é o espelho de 2ˣ e decresce.'),
  },
  {
    id: 'gp2-log', items: ['y = e^x', 'y = ln(x)', 'y = x', 'y = log(x)'], view: { xmin: -4, xmax: 8, ymin: -4, ymax: 6 },
    title: L('Logarithms as inverses', 'Logaritmos como inversas', 'Logaritmos como inversas'),
    note: L('ln x is the mirror of eˣ across y = x: it passes through (1, 0), lives on x > 0, and grows slowly. log x (base 10) grows even more slowly.', 'ln x es el reflejo de eˣ respecto a y = x: pasa por (1, 0), vive en x > 0 y crece despacio. log x (base 10) crece todavía más despacio.', 'ln x é o espelho de eˣ em relação a y = x: passa por (1, 0), vive em x > 0 e cresce devagar. log x (base 10) cresce mais devagar ainda.'),
  },
  {
    id: 'gp2-cooling', items: ['y = 22 + 68e^(-0.08x)', 'y = 22', 'y = 50'], view: { xmin: -2, xmax: 45, ymin: -5, ymax: 100 },
    title: L('A cup of tea cooling down', 'Una taza de té que se enfría', 'Uma xícara de chá esfriando'),
    note: L('Temperature after x minutes in a 22 °C room. It falls fast at first, then ever more slowly toward 22. Hover where it meets y = 50: about 11 minutes.', 'Temperatura después de x minutos en una sala a 22 °C. Baja rápido al principio y luego cada vez más lento hacia 22. Pasa el cursor donde corta y = 50: unos 11 minutos.', 'Temperatura depois de x minutos numa sala a 22 °C. Cai rápido no começo e depois cada vez mais devagar rumo a 22. Passe o cursor onde corta y = 50: cerca de 11 minutos.'),
  },
];
