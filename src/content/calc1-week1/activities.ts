import type { Activity, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Interactive puzzles for Calculus 1, Week 1. */
export const calcWeek1Activities: Activity[] = [
  {
    id: 'calc1-act-classify-sets', kind: 'classify', lessonId: 'calc1-l1-real-numbers',
    title: L('Rational or irrational?', '¿Racional o irracional?', 'Racional ou irracional?'),
    prompt: L('Sort each number.', 'Clasifica cada número.', 'Classifique cada número.'),
    buckets: [L('Rational', 'Racional', 'Racional'), L('Irrational', 'Irracional', 'Irracional')],
    items: [
      { text: L('−4', '−4', '−4'), bucket: 0 },
      { text: L('0.125', '0,125', '0,125'), bucket: 0 },
      { text: L('√3', '√3', '√3'), bucket: 1 },
      { text: L('√16', '√16', '√16'), bucket: 0 },
      { text: L('π', 'π', 'π'), bucket: 1 },
      { text: L('2/7', '2/7', '2/7'), bucket: 0 },
    ],
    explanation: L('√16 = 4 and 0.125 = 1/8 are fractions in disguise. √3 and π are not.', '√16 = 4 y 0,125 = 1/8 son fracciones disfrazadas. √3 y π no lo son.', '√16 = 4 e 0,125 = 1/8 são frações disfarçadas. √3 e π não são.'),
  },
  {
    id: 'calc1-act-classify-flip', kind: 'classify', lessonId: 'calc1-l6-linear-inequalities',
    title: L('Does the sign flip?', '¿Se invierte el signo?', 'O sinal se inverte?'),
    prompt: L('For each step applied to both sides of an inequality, decide whether the sign stays or flips.', 'Para cada paso aplicado a ambos lados de una desigualdad, decide si el signo se mantiene o se invierte.', 'Para cada passo aplicado aos dois lados de uma desigualdade, decida se o sinal se mantém ou se inverte.'),
    buckets: [L('Sign stays', 'El signo se mantiene', 'O sinal se mantém'), L('Sign flips', 'El signo se invierte', 'O sinal se inverte')],
    items: [
      { text: L('Add −5', 'Sumar −5', 'Somar −5'), bucket: 0 },
      { text: L('Multiply by 3', 'Multiplicar por 3', 'Multiplicar por 3'), bucket: 0 },
      { text: L('Divide by −2', 'Dividir entre −2', 'Dividir por −2'), bucket: 1 },
      { text: L('Subtract 7', 'Restar 7', 'Subtrair 7'), bucket: 0 },
      { text: L('Multiply by −1', 'Multiplicar por −1', 'Multiplicar por −1'), bucket: 1 },
      { text: L('Divide by 1/2', 'Dividir entre 1/2', 'Dividir por 1/2'), bucket: 0 },
    ],
    explanation: L('Only multiplying or dividing by a negative number flips the sign. Adding a negative does not.', 'Solo multiplicar o dividir por un número negativo invierte el signo. Sumar un negativo no.', 'Só multiplicar ou dividir por um número negativo inverte o sinal. Somar um negativo não.'),
  },
  {
    id: 'calc1-act-order-signchart', kind: 'order', lessonId: 'calc1-l7-sign-chart',
    title: L('Steps of a sign chart', 'Pasos de una tabla de signos', 'Passos de um quadro de sinais'),
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
    id: 'calc1-act-fill-linear', kind: 'code-fill', lessonId: 'calc1-l6-linear-inequalities',
    title: L('Finish the steps', 'Completa los pasos', 'Complete os passos'),
    prompt: L('Fill in the blanks to solve 3 − 4x < 15.', 'Completa los espacios para resolver 3 − 4x < 15.', 'Preencha as lacunas para resolver 3 − 4x < 15.'),
    template: '3 - 4x < 15\n-4x < {0}\nx {1} -3',
    blanks: ['12', '>'],
    explanation: L('Subtract 3: −4x < 12. Divide by −4 and flip: x > −3.', 'Resta 3: −4x < 12. Divide entre −4 e invierte: x > −3.', 'Subtraia 3: −4x < 12. Divida por −4 e inverta: x > −3.'),
  },
  {
    id: 'calc1-act-scramble-interval', kind: 'scramble', lessonId: 'calc1-l5-intervals',
    title: L('Build the interval', 'Arma el intervalo', 'Monte o intervalo'),
    prompt: L('Write "x ≤ −1 or x > 3" in interval notation.', 'Escribe "x ≤ −1 o x > 3" en notación de intervalos.', 'Escreva "x ≤ −1 ou x > 3" em notação de intervalos.'),
    tokens: ['(-∞,', '-1]', '∪', '(3,', '∞)'],
    explanation: L('−1 is included, so a bracket; 3 is excluded, so a parenthesis; ∞ always takes a parenthesis.', '−1 se incluye, así que corchete; 3 se excluye, así que paréntesis; ∞ siempre lleva paréntesis.', '−1 é incluído, então colchete; 3 é excluído, então parêntese; ∞ sempre leva parêntese.'),
  },
  {
    id: 'calc1-act-classify-abs', kind: 'classify', lessonId: 'calc1-l8-absolute-systems',
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
  {
    id: 'calc1-act-order-ruffini', kind: 'order', lessonId: 'calc1-l4-higher-degree',
    title: L('Solve a cubic', 'Resuelve una cúbica', 'Resolva uma cúbica'),
    prompt: L('Order the steps for solving x³ − 6x² + 11x − 6 = 0.', 'Ordena los pasos para resolver x³ − 6x² + 11x − 6 = 0.', 'Ordene os passos para resolver x³ − 6x² + 11x − 6 = 0.'),
    items: [
      L('List candidates: ±1, ±2, ±3, ±6', 'Listar candidatos: ±1, ±2, ±3, ±6', 'Listar candidatos: ±1, ±2, ±3, ±6'),
      L('Try x = 1: 1 − 6 + 11 − 6 = 0', 'Probar x = 1: 1 − 6 + 11 − 6 = 0', 'Testar x = 1: 1 − 6 + 11 − 6 = 0'),
      L('Divide by (x − 1): x² − 5x + 6', 'Dividir entre (x − 1): x² − 5x + 6', 'Dividir por (x − 1): x² − 5x + 6'),
      L('Factor the quotient: (x − 2)(x − 3)', 'Factorizar el cociente: (x − 2)(x − 3)', 'Fatorar o quociente: (x − 2)(x − 3)'),
      L('Roots: 1, 2, 3', 'Raíces: 1, 2, 3', 'Raízes: 1, 2, 3'),
    ],
    explanation: L('Find one root, divide it out, and repeat until a quadratic is left.', 'Encuentra una raíz, divídela y repite hasta que quede una cuadrática.', 'Encontre uma raiz, divida por ela e repita até sobrar uma quadrática.'),
  },
];
