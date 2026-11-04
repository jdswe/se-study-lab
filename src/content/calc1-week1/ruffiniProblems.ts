import type { Localized } from '../types';
import type { RuffiniProblem } from '../../lib/ruffini';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Ruffini Lab problems for Calculus 1, Week 1, from warm-up to challenge. */
export const ruffiniProblems: RuffiniProblem[] = [
  {
    id: 'rf1', level: 1, poly: 'x^3 + 2x^2 - 5x - 6',
    title: L('A first cubic', 'Una primera cúbica', 'Uma primeira cúbica'),
    hint: L('The candidates are the divisors of −6. Try x = −1: −1 + 2 + 5 − 6 = 0.', 'Los candidatos son los divisores de −6. Prueba x = −1: −1 + 2 + 5 − 6 = 0.', 'Os candidatos são os divisores de −6. Teste x = −1: −1 + 2 + 5 − 6 = 0.'),
  },
  {
    id: 'rf2', level: 1, poly: 'x^3 - 13x - 12',
    title: L('A missing power', 'Una potencia que falta', 'Uma potência que falta'),
    hint: L('There is no x² term: write a 0 in its column, or every product lands in the wrong place.', 'No hay término en x²: escribe un 0 en su columna, o cada producto cae en el lugar equivocado.', 'Não há termo em x²: escreva um 0 na coluna dele, ou cada produto cai no lugar errado.'),
  },
  {
    id: 'rf3', level: 2, poly: '2x^3 - 3x^2 - 11x + 6',
    title: L('Leading coefficient 2', 'Coeficiente principal 2', 'Coeficiente principal 2'),
    hint: L('Now q can be 1 or 2, so ±1/2 and ±3/2 are candidates too. x = 3 works; the quotient 2x² + 3x − 2 hides a fraction.', 'Ahora q puede ser 1 o 2, así que ±1/2 y ±3/2 también son candidatos. x = 3 funciona; el cociente 2x² + 3x − 2 esconde una fracción.', 'Agora q pode ser 1 ou 2, então ±1/2 e ±3/2 também são candidatos. x = 3 funciona; o quociente 2x² + 3x − 2 esconde uma fração.'),
  },
  {
    id: 'rf4', level: 2, poly: 'x^3 - 3x^2 + 4',
    title: L('A root that appears twice', 'Una raíz que aparece dos veces', 'Uma raiz que aparece duas vezes'),
    hint: L('After dividing by (x + 1), the quotient is a perfect square. A repeated root is written once in the answer.', 'Después de dividir entre (x + 1), el cociente es un cuadrado perfecto. Una raíz repetida se escribe una vez en la respuesta.', 'Depois de dividir por (x + 1), o quociente é um quadrado perfeito. Uma raiz repetida é escrita uma vez na resposta.'),
  },
  {
    id: 'rf5', level: 2, poly: 'x^3 - 5x^2 + 2x + 8',
    title: L('Box volume', 'El volumen de una caja', 'O volume de uma caixa'),
    context: L('An engineer models the extra volume of a box as V(x) = x³ − 5x² + 2x + 8 when each side changes by x cm. For which values of x is V(x) = 0?', 'Una ingeniera modela el volumen extra de una caja como V(x) = x³ − 5x² + 2x + 8 cuando cada lado cambia x cm. ¿Para qué valores de x es V(x) = 0?', 'Uma engenheira modela o volume extra de uma caixa como V(x) = x³ − 5x² + 2x + 8 quando cada lado muda x cm. Para quais valores de x V(x) = 0?'),
    hint: L('Try the small candidates first: ±1, ±2. One negative value works.', 'Prueba primero los candidatos pequeños: ±1, ±2. Funciona un valor negativo.', 'Teste primeiro os candidatos pequenos: ±1, ±2. Um valor negativo funciona.'),
  },
  {
    id: 'rf6', level: 3, poly: 'x^4 - 2x^3 - 7x^2 + 8x + 12',
    title: L('Two divisions in a row', 'Dos divisiones seguidas', 'Duas divisões seguidas'),
    hint: L('Divide once (x = −1 works), then keep going with the cubic quotient. Stop when a quadratic is left.', 'Divide una vez (x = −1 funciona) y sigue con el cociente cúbico. Para cuando quede una cuadrática.', 'Divida uma vez (x = −1 funciona) e continue com o quociente cúbico. Pare quando sobrar uma quadrática.'),
  },
  {
    id: 'rf7', level: 3, poly: 'x^3 + x^2 + x - 3',
    title: L('When the quadratic has no roots', 'Cuando la cuadrática no tiene raíces', 'Quando a quadrática não tem raízes'),
    hint: L('x = 1 is a root. Check the discriminant of the quotient: if Δ < 0, it adds no real roots.', 'x = 1 es raíz. Revisa el discriminante del cociente: si Δ < 0, no añade raíces reales.', 'x = 1 é raiz. Confira o discriminante do quociente: se Δ < 0, ele não acrescenta raízes reais.'),
  },
];
