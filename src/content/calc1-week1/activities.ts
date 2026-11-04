import type { Activity, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Interactive puzzles for Calculus 1, Week 1. */
export const calcWeek1Activities: Activity[] = [
  {
    id: 'calc1-act-classify-degree', kind: 'classify', lessonId: 'calc1-l1-equations',
    title: L('What degree is it?', '¿De qué grado es?', 'Qual é o grau?'),
    prompt: L('Simplify in your head, then sort each equation by its degree.', 'Simplifica mentalmente y luego clasifica cada ecuación por su grado.', 'Simplifique de cabeça e depois classifique cada equação pelo grau.'),
    buckets: [L('First degree', 'Primer grado', 'Primeiro grau'), L('Second degree', 'Segundo grado', 'Segundo grau'), L('Third degree', 'Tercer grado', 'Terceiro grau')],
    items: [
      { text: L('4x + 1 = 9', '4x + 1 = 9', '4x + 1 = 9'), bucket: 0 },
      { text: L('x² − 5x = 0', 'x² − 5x = 0', 'x² − 5x = 0'), bucket: 1 },
      { text: L('x³ + 2 = x', 'x³ + 2 = x', 'x³ + 2 = x'), bucket: 2 },
      { text: L('(x + 2)² = x² + 1', '(x + 2)² = x² + 1', '(x + 2)² = x² + 1'), bucket: 0 },
      { text: L('x(x − 1)(x + 4) = 0', 'x(x − 1)(x + 4) = 0', 'x(x − 1)(x + 4) = 0'), bucket: 2 },
      { text: L('3x(x + 2) = 7', '3x(x + 2) = 7', '3x(x + 2) = 7'), bucket: 1 },
    ],
    explanation: L('(x + 2)² = x² + 1 loses its x² terms and becomes 4x + 3 = 0. A product of three factors with x gives degree 3.', '(x + 2)² = x² + 1 pierde sus términos x² y queda 4x + 3 = 0. Un producto de tres factores con x da grado 3.', '(x + 2)² = x² + 1 perde os termos x² e vira 4x + 3 = 0. Um produto de três fatores com x dá grau 3.'),
  },
  {
    id: 'calc1-act-fill-vertex', kind: 'code-fill', lessonId: 'calc1-l2-quadratic-parabola',
    title: L('Find the vertex', 'Encuentra el vértice', 'Encontre o vértice'),
    prompt: L('Complete the steps for y = 2x² − 12x + 7.', 'Completa los pasos para y = 2x² − 12x + 7.', 'Complete os passos para y = 2x² − 12x + 7.'),
    template: 'a = 2, b = -12\nx_v = -b / 2a = {0}\ny_v = 2(3)^2 - 12(3) + 7 = {1}\nopens: {2}',
    blanks: ['3', '-11|−11', 'up|arriba|cima'],
    explanation: L('x = 12/4 = 3 and y = 18 − 36 + 7 = −11. Since a = 2 > 0 it opens up, so (3, −11) is a minimum.', 'x = 12/4 = 3 e y = 18 − 36 + 7 = −11. Como a = 2 > 0 abre hacia arriba, así que (3, −11) es un mínimo.', 'x = 12/4 = 3 e y = 18 − 36 + 7 = −11. Como a = 2 > 0 abre para cima, então (3, −11) é um mínimo.'),
  },
  {
    id: 'calc1-act-order-ruffini', kind: 'order', lessonId: 'calc1-l5-ruffini',
    title: L('Solve a cubic', 'Resuelve una cúbica', 'Resolva uma cúbica'),
    prompt: L('Order the steps for solving x³ − 6x² + 11x − 6 = 0.', 'Ordena los pasos para resolver x³ − 6x² + 11x − 6 = 0.', 'Ordene os passos para resolver x³ − 6x² + 11x − 6 = 0.'),
    items: [
      L('List candidates: ±1, ±2, ±3, ±6', 'Listar candidatos: ±1, ±2, ±3, ±6', 'Listar candidatos: ±1, ±2, ±3, ±6'),
      L('Try x = 1: 1 − 6 + 11 − 6 = 0', 'Probar x = 1: 1 − 6 + 11 − 6 = 0', 'Testar x = 1: 1 − 6 + 11 − 6 = 0'),
      L('Ruffini by (x − 1): quotient x² − 5x + 6', 'Ruffini entre (x − 1): cociente x² − 5x + 6', 'Briot–Ruffini por (x − 1): quociente x² − 5x + 6'),
      L('Factor the quotient: (x − 2)(x − 3)', 'Factorizar el cociente: (x − 2)(x − 3)', 'Fatorar o quociente: (x − 2)(x − 3)'),
      L('Roots: 1, 2, 3', 'Raíces: 1, 2, 3', 'Raízes: 1, 2, 3'),
    ],
    explanation: L('Find one root, divide it out, and repeat until a quadratic is left.', 'Encuentra una raíz, divídela y repite hasta que quede una cuadrática.', 'Encontre uma raiz, divida por ela e repita até sobrar uma quadrática.'),
  },
  {
    id: 'calc1-act-scramble-interval', kind: 'scramble', lessonId: 'calc1-l6-intervals-linear',
    title: L('Build the interval', 'Arma el intervalo', 'Monte o intervalo'),
    prompt: L('Write "x ≤ −1 or x > 3" in interval notation.', 'Escribe "x ≤ −1 o x > 3" en notación de intervalos.', 'Escreva "x ≤ −1 ou x > 3" em notação de intervalos.'),
    tokens: ['(-∞,', '-1]', '∪', '(3,', '∞)'],
    explanation: L('−1 is included, so a bracket; 3 is excluded, so a parenthesis; ∞ always takes a parenthesis.', '−1 se incluye, así que corchete; 3 se excluye, así que paréntesis; ∞ siempre lleva paréntesis.', '−1 é incluído, então colchete; 3 é excluído, então parêntese; ∞ sempre leva parêntese.'),
  },
  {
    id: 'calc1-act-classify-flip', kind: 'classify', lessonId: 'calc1-l6-intervals-linear',
    title: L('Does the sign flip?', '¿Se invierte el signo?', 'O sinal se inverte?'),
    prompt: L('For each step applied to both sides of an inequality, decide whether the sign stays or flips.', 'Para cada paso aplicado a ambos lados de una desigualdad, decide si el signo se mantiene o se invierte.', 'Para cada passo aplicado aos dois lados de uma desigualdade, decida se o sinal se mantém ou se inverte.'),
    buckets: [L('Sign stays', 'El signo se mantiene', 'O sinal se mantém'), L('Sign flips', 'El signo se invierte', 'O sinal se inverte')],
    items: [
      { text: L('Add −5', 'Sumar −5', 'Somar −5'), bucket: 0 },
      { text: L('Multiply by 3', 'Multiplicar por 3', 'Multiplicar por 3'), bucket: 0 },
      { text: L('Divide by −2', 'Dividir entre −2', 'Dividir por −2'), bucket: 1 },
      { text: L('Subtract 7', 'Restar 7', 'Subtrair 7'), bucket: 0 },
      { text: L('Multiply by −1/3', 'Multiplicar por −1/3', 'Multiplicar por −1/3'), bucket: 1 },
      { text: L('Divide by 1/2', 'Dividir entre 1/2', 'Dividir por 1/2'), bucket: 0 },
    ],
    explanation: L('Only multiplying or dividing by a negative number flips the sign. Adding a negative does not.', 'Solo multiplicar o dividir por un número negativo invierte el signo. Sumar un negativo no.', 'Só multiplicar ou dividir por um número negativo inverte o sinal. Somar um negativo não.'),
  },
  {
    id: 'calc1-act-order-signtable', kind: 'order', lessonId: 'calc1-l7-sign-tables',
    title: L('Steps of a sign table', 'Pasos de una tabla de signos', 'Passos de um quadro de sinais'),
    prompt: L('Put the steps for solving x² + 2x > 3 in order.', 'Ordena los pasos para resolver x² + 2x > 3.', 'Coloque em ordem os passos para resolver x² + 2x > 3.'),
    items: [
      L('Move everything to one side: x² + 2x − 3 > 0', 'Pasar todo a un lado: x² + 2x − 3 > 0', 'Passar tudo para um lado: x² + 2x − 3 > 0'),
      L('Factor: (x + 3)(x − 1) > 0', 'Factorizar: (x + 3)(x − 1) > 0', 'Fatorar: (x + 3)(x − 1) > 0'),
      L('Mark the critical points −3 and 1', 'Marcar los puntos críticos −3 y 1', 'Marcar os pontos críticos −3 e 1'),
      L('Test −4, 0, and 2 in the factors', 'Probar −4, 0 y 2 en los factores', 'Testar −4, 0 e 2 nos fatores'),
      L('Keep the positive intervals: (−∞, −3) ∪ (1, ∞)', 'Quedarse con los intervalos positivos: (−∞, −3) ∪ (1, ∞)', 'Ficar com os intervalos positivos: (−∞, −3) ∪ (1, ∞)'),
    ],
    explanation: L('Without 0 on one side the signs of the factors mean nothing, so that step always comes first.', 'Sin 0 en un lado, los signos de los factores no significan nada, por eso ese paso siempre va primero.', 'Sem 0 de um lado, os sinais dos fatores não significam nada, por isso esse passo sempre vem primeiro.'),
  },
  {
    id: 'calc1-act-classify-abs', kind: 'classify', lessonId: 'calc1-l8-systems-cases',
    title: L('One interval or two pieces?', '¿Un intervalo o dos trozos?', 'Um intervalo ou dois pedaços?'),
    prompt: L('Decide the shape of each solution set.', 'Decide la forma de cada conjunto solución.', 'Decida a forma de cada conjunto solução.'),
    buckets: [L('One interval', 'Un intervalo', 'Um intervalo'), L('Two pieces (a union)', 'Dos trozos (una unión)', 'Dois pedaços (uma união)')],
    items: [
      { text: L('|x − 2| < 5', '|x − 2| < 5', '|x − 2| < 5'), bucket: 0 },
      { text: L('|x| ≥ 1', '|x| ≥ 1', '|x| ≥ 1'), bucket: 1 },
      { text: L('|3x + 1| ≤ 4', '|3x + 1| ≤ 4', '|3x + 1| ≤ 4'), bucket: 0 },
      { text: L('|x + 6| > 2', '|x + 6| > 2', '|x + 6| > 2'), bucket: 1 },
    ],
    explanation: L('"Less than" keeps x close to the centre: one interval. "Greater than" pushes it away on both sides: two pieces.', '"Menor que" mantiene x cerca del centro: un intervalo. "Mayor que" lo aleja hacia ambos lados: dos trozos.', '"Menor que" mantém x perto do centro: um intervalo. "Maior que" o afasta para os dois lados: dois pedaços.'),
  },
];
