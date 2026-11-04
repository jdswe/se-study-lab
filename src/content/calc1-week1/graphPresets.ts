import type { Localized } from '../types';
import type { GraphPreset } from '../../lib/graph';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Ready-made views for the Graph Lab, one per idea of the week. */
export const graphPresets: GraphPreset[] = [
  {
    id: 'gp-explorer', parabola: { a: -1, b: 2, c: 3 }, showSign: true, items: [],
    title: L('Parabola explorer', 'Explorador de parábolas', 'Explorador de parábolas'),
    note: L('Move a, b, and c. Watch the vertex, the axis, and the roots move, and see where y is positive (green) or negative (red).', 'Mueve a, b y c. Mira cómo se mueven el vértice, el eje y las raíces, y dónde y es positiva (verde) o negativa (rojo).', 'Mova a, b e c. Veja como o vértice, o eixo e as raízes se movem, e onde y é positivo (verde) ou negativo (vermelho).'),
  },
  {
    id: 'gp-degrees', items: ['y = x - 1', 'y = x^2 - 1', 'y = (x^3 - 4x)/2'],
    title: L('Degree and number of roots', 'Grado y número de raíces', 'Grau e número de raízes'),
    note: L('A line crosses the x-axis once, a parabola up to twice, a cubic up to three times.', 'Una recta corta el eje x una vez, una parábola hasta dos y una cúbica hasta tres.', 'Uma reta corta o eixo x uma vez, uma parábola até duas e uma cúbica até três.'),
  },
  {
    id: 'gp-ball', items: ['y = -5x^2 + 30x + 2'], view: { xmin: -1, xmax: 8, ymin: -8, ymax: 55 },
    title: L('A kicked ball', 'Una pelota pateada', 'Uma bola chutada'),
    note: L('h(t) = −5t² + 30t + 2. Hover over the top: the vertex (3, 47) is the maximum height.', 'h(t) = −5t² + 30t + 2. Pasa el cursor por la cima: el vértice (3, 47) es la altura máxima.', 'h(t) = −5t² + 30t + 2. Passe o cursor pelo topo: o vértice (3, 47) é a altura máxima.'),
  },
  {
    id: 'gp-sign', parabola: { a: 1, b: 2, c: -8 }, showSign: true, items: [],
    title: L('Sign table on the graph', 'La tabla de signos en la gráfica', 'O quadro de sinais no gráfico'),
    note: L('x² + 2x − 8 ≤ 0 is exactly where the parabola is on or below the x-axis: [−4, 2].', 'x² + 2x − 8 ≤ 0 es justo donde la parábola está sobre el eje x o debajo de él: [−4, 2].', 'x² + 2x − 8 ≤ 0 é exatamente onde a parábola está sobre o eixo x ou abaixo dele: [−4, 2].'),
  },
  {
    id: 'gp-abs', items: ['y = abs(x - 1) + abs(x + 3)', 'y = 6'],
    title: L('Two absolute values', 'Dos valores absolutos', 'Dois valores absolutos'),
    note: L('|x − 1| + |x + 3| is flat (equal to 4) between −3 and 1. It meets y = 6 at x = −4 and x = 2.', '|x − 1| + |x + 3| es plana (vale 4) entre −3 y 1. Corta y = 6 en x = −4 y x = 2.', '|x − 1| + |x + 3| é plana (vale 4) entre −3 e 1. Corta y = 6 em x = −4 e x = 2.'),
  },
  {
    id: 'gp-region', items: ['y >= x^2 - 4', 'y < 2x + 1'],
    title: L('A system in two variables', 'Un sistema en dos variables', 'Um sistema em duas variáveis'),
    note: L('The darker overlap satisfies both. The parabola is solid (≥ includes it); the line is dashed (< excludes it).', 'La superposición más oscura cumple ambas. La parábola es continua (≥ la incluye); la recta es punteada (< la excluye).', 'A sobreposição mais escura satisfaz as duas. A parábola é contínua (≥ a inclui); a reta é tracejada (< a exclui).'),
  },
  {
    id: 'gp-budget', items: ['12x + 7y <= 84', 'x >= 0', 'y >= 0'], view: { xmin: -1, xmax: 10, ymin: -1, ymax: 14 },
    title: L('A ticket budget', 'Un presupuesto de entradas', 'Um orçamento de ingressos'),
    note: L('x adult tickets at 12, y child tickets at 7, at most 84. Hover over (3, 6): inside. (4, 6): outside.', 'x entradas de adulto a 12, y de niño a 7, como máximo 84. Pasa el cursor por (3, 6): dentro. (4, 6): fuera.', 'x ingressos de adulto a 12, y de criança a 7, no máximo 84. Passe o cursor por (3, 6): dentro. (4, 6): fora.'),
  },
];
