import type { Lab, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/**
 * Paper-and-pencil labs for Calculus 1, Week 1, in the same families as the
 * week's class work but with new numbers. Steps with an inequality can be
 * checked in the Inequality Lab; regions in two variables in the Graph Lab.
 */
export const calcWeek1Labs: Lab[] = [
  {
    id: 'calc1-lab-1-equations', kind: 'math', level: 1, minutes: 40,
    title: L('Equations of every type', 'Ecuaciones de todo tipo', 'Equações de todo tipo'),
    goal: L('Classify each equation, solve it, and check every root in the original.', 'Clasificar cada ecuación, resolverla y comprobar cada raíz en la original.', 'Classificar cada equação, resolvê-la e conferir cada raiz na original.'),
    steps: [
      { id: 'calc1-lab1-s1', title: L('First degree', 'Primer grado', 'Primeiro grau'), commands: ['4(x - 2) + 3 = 2x + 9'],
        expected: L('x = 7. Check: 4·5 + 3 = 23 = 14 + 9.', 'x = 7. Comprobación: 4·5 + 3 = 23 = 14 + 9.', 'x = 7. Conferência: 4·5 + 3 = 23 = 14 + 9.') },
      { id: 'calc1-lab1-s2', title: L('Second degree with a radical to simplify', 'Segundo grado con una raíz para simplificar', 'Segundo grau com uma raiz para simplificar'), commands: ['3x^2 - 6x - 1 = 0'],
        expected: L('Δ = 48 = 16·3, √48 = 4√3, x = (6 ± 4√3)/6 = 1 ± 2√3/3 (about 2.15 and −0.15).', 'Δ = 48 = 16·3, √48 = 4√3, x = (6 ± 4√3)/6 = 1 ± 2√3/3 (aprox. 2,15 y −0,15).', 'Δ = 48 = 16·3, √48 = 4√3, x = (6 ± 4√3)/6 = 1 ± 2√3/3 (aprox. 2,15 e −0,15).') },
      { id: 'calc1-lab1-s3', title: L('A radical equation', 'Una ecuación con raíz', 'Uma equação com raiz'), commands: ['sqrt(2x + 7) = x + 2'],
        expected: L('x² + 2x − 3 = 0 gives 1 or −3; only x = 1 checks (√9 = 3). x = −3 gives √1 = 1 ≠ −1.', 'x² + 2x − 3 = 0 da 1 o −3; solo x = 1 se cumple (√9 = 3). x = −3 da √1 = 1 ≠ −1.', 'x² + 2x − 3 = 0 dá 1 ou −3; só x = 1 confere (√9 = 3). x = −3 dá √1 = 1 ≠ −1.') },
      { id: 'calc1-lab1-s4', title: L('Absolute value and fractions', 'Valor absoluto y fracciones', 'Valor absoluto e frações'), commands: ['|2x - 3| = 7', '4/(x - 2) + 1 = 6/(x - 2)'],
        expected: L('x = 5 or x = −2. For the fraction (x ≠ 2): 4 + x − 2 = 6, so x = 4.', 'x = 5 o x = −2. Para la fracción (x ≠ 2): 4 + x − 2 = 6, así que x = 4.', 'x = 5 ou x = −2. Para a fração (x ≠ 2): 4 + x − 2 = 6, então x = 4.') },
    ],
  },
  {
    id: 'calc1-lab-2-parabola-ruffini', kind: 'math', level: 2, minutes: 40,
    title: L('The parabola and Ruffini\'s rule', 'La parábola y la regla de Ruffini', 'A parábola e a regra de Briot–Ruffini'),
    goal: L('Read a parabola from its formula and factor higher-degree polynomials.', 'Leer una parábola a partir de su fórmula y factorizar polinomios de grado mayor.', 'Ler uma parábola a partir da fórmula e fatorar polinômios de grau maior.'),
    steps: [
      { id: 'calc1-lab2-s1', title: L('Everything about one parabola', 'Todo sobre una parábola', 'Tudo sobre uma parábola'), commands: ['y = 2x^2 - 8x + 3'],
        expected: L('Opens up; vertex (2, −5), a minimum; axis x = 2; y-intercept 3; roots 2 ± √10/2 (about 3.58 and 0.42). Draw it in the Graph Lab to compare.', 'Abre hacia arriba; vértice (2, −5), un mínimo; eje x = 2; corte con y en 3; raíces 2 ± √10/2 (aprox. 3,58 y 0,42). Dibújala en el Laboratorio de gráficas para comparar.', 'Abre para cima; vértice (2, −5), um mínimo; eixo x = 2; corte com y em 3; raízes 2 ± √10/2 (aprox. 3,58 e 0,42). Desenhe no Laboratório de gráficos para comparar.') },
      { id: 'calc1-lab2-s2', title: L('A water fountain', 'Una fuente de agua', 'Um chafariz'), commands: ['h(x) = -0.5x^2 + 3x', 'max height?  where does it land?'],
        expected: L('Vertex at x = 3 with h = 4.5 m; it lands where h = 0: x = 6 m from the nozzle.', 'Vértice en x = 3 con h = 4,5 m; cae donde h = 0: x = 6 m de la boquilla.', 'Vértice em x = 3 com h = 4,5 m; cai onde h = 0: x = 6 m do bico.') },
      { id: 'calc1-lab2-s3', title: L('A cubic with Ruffini', 'Una cúbica con Ruffini', 'Uma cúbica com Briot–Ruffini'), commands: ['x^3 - 2x^2 - 5x + 6 = 0'],
        expected: L('x = 1 is a root; the quotient x² − x − 6 = (x − 3)(x + 2). Roots 1, 3, −2.', 'x = 1 es raíz; el cociente x² − x − 6 = (x − 3)(x + 2). Raíces 1, 3, −2.', 'x = 1 é raiz; o quociente x² − x − 6 = (x − 3)(x + 2). Raízes 1, 3, −2.') },
      { id: 'calc1-lab2-s4', title: L('A fourth-degree equation', 'Una ecuación de cuarto grado', 'Uma equação de quarto grau'), commands: ['x^4 - 13x^2 + 36 = 0'],
        expected: L('With Ruffini (x = 2, then x = −2) or by treating x² as one unknown: (x² − 4)(x² − 9) = 0, so x = ±2, ±3.', 'Con Ruffini (x = 2 y luego x = −2) o tratando x² como una sola incógnita: (x² − 4)(x² − 9) = 0, así que x = ±2, ±3.', 'Com Briot–Ruffini (x = 2 e depois x = −2) ou tratando x² como uma só incógnita: (x² − 4)(x² − 9) = 0, então x = ±2, ±3.') },
    ],
  },
  {
    id: 'calc1-lab-3-signtables', kind: 'math', level: 2, minutes: 40,
    title: L('Inequalities and sign tables', 'Desigualdades y tablas de signos', 'Desigualdades e quadros de sinais'),
    goal: L('Write the interval, draw it, and justify each endpoint.', 'Escribir el intervalo, dibujarlo y justificar cada extremo.', 'Escrever o intervalo, desenhá-lo e justificar cada extremidade.'),
    steps: [
      { id: 'calc1-lab3-s1', title: L('Flip the sign', 'Invierte el signo', 'Inverta o sinal'), commands: ['5 - 3x <= 11'],
        expected: L('x ≥ −2: [−2, ∞).', 'x ≥ −2: [−2, ∞).', 'x ≥ −2: [−2, ∞).') },
      { id: 'calc1-lab3-s2', title: L('A quadratic', 'Una cuadrática', 'Uma quadrática'), commands: ['x^2 - 3x - 10 > 0'],
        expected: L('(x − 5)(x + 2) > 0: (−∞, −2) ∪ (5, ∞), where the parabola is above the x-axis.', '(x − 5)(x + 2) > 0: (−∞, −2) ∪ (5, ∞), donde la parábola está sobre el eje x.', '(x − 5)(x + 2) > 0: (−∞, −2) ∪ (5, ∞), onde a parábola está acima do eixo x.') },
      { id: 'calc1-lab3-s3', title: L('A cubic', 'Una cúbica', 'Uma cúbica'), commands: ['x^3 - x^2 - 6x <= 0'],
        expected: L('x(x − 3)(x + 2) ≤ 0: (−∞, −2] ∪ [0, 3].', 'x(x − 3)(x + 2) ≤ 0: (−∞, −2] ∪ [0, 3].', 'x(x − 3)(x + 2) ≤ 0: (−∞, −2] ∪ [0, 3].') },
      { id: 'calc1-lab3-s4', title: L('Fractions', 'Fracciones', 'Frações'), commands: ['(x - 4)/(x + 1) <= 0', '(2x + 1)/(x - 1) > 1'],
        expected: L('(−1, 4]. For the second, subtract 1: (x + 2)/(x − 1) > 0, so (−∞, −2) ∪ (1, ∞).', '(−1, 4]. Para la segunda, resta 1: (x + 2)/(x − 1) > 0, así que (−∞, −2) ∪ (1, ∞).', '(−1, 4]. Para a segunda, subtraia 1: (x + 2)/(x − 1) > 0, então (−∞, −2) ∪ (1, ∞).') },
    ],
  },
  {
    id: 'calc1-lab-4-systems', kind: 'math', level: 3, minutes: 45,
    title: L('Systems, cases, parameters, and regions', 'Sistemas, casos, parámetros y regiones', 'Sistemas, casos, parâmetros e regiões'),
    goal: L('Combine conditions, split absolute values into cases, and read regions in the plane.', 'Combinar condiciones, separar valores absolutos en casos y leer regiones del plano.', 'Combinar condições, separar valores absolutos em casos e ler regiões do plano.'),
    steps: [
      { id: 'calc1-lab4-s1', title: L('A system', 'Un sistema', 'Um sistema'), commands: ['3x - 1 >= 2; x^2 < 16'],
        expected: L('x ≥ 1 and −4 < x < 4: [1, 4).', 'x ≥ 1 y −4 < x < 4: [1, 4).', 'x ≥ 1 e −4 < x < 4: [1, 4).') },
      { id: 'calc1-lab4-s2', title: L('Two absolute values', 'Dos valores absolutos', 'Dois valores absolutos'), commands: ['|x + 2| - |x - 1| = 1'],
        expected: L('x < −2 gives −3 = 1, no; −2 ≤ x < 1 gives 2x + 1 = 1, so x = 0 ✓; x ≥ 1 gives 3 = 1, no. Solution {0}.', 'x < −2 da −3 = 1, no; −2 ≤ x < 1 da 2x + 1 = 1, así que x = 0 ✓; x ≥ 1 da 3 = 1, no. Solución {0}.', 'x < −2 dá −3 = 1, não; −2 ≤ x < 1 dá 2x + 1 = 1, então x = 0 ✓; x ≥ 1 dá 3 = 1, não. Solução {0}.') },
      { id: 'calc1-lab4-s3', title: L('An equation with a parameter', 'Una ecuación con parámetro', 'Uma equação com parâmetro'), commands: ['k x^2 - 4x + 1 = 0,  k in R'],
        expected: L('k = 0: linear, x = 1/4. Otherwise Δ = 16 − 4k: two roots if k < 4 (k ≠ 0), one (x = 1/2) if k = 4, none if k > 4.', 'k = 0: lineal, x = 1/4. Si no, Δ = 16 − 4k: dos raíces si k < 4 (k ≠ 0), una (x = 1/2) si k = 4, ninguna si k > 4.', 'k = 0: linear, x = 1/4. Caso contrário, Δ = 16 − 4k: duas raízes se k < 4 (k ≠ 0), uma (x = 1/2) se k = 4, nenhuma se k > 4.') },
      { id: 'calc1-lab4-s4', title: L('A region in the plane', 'Una región del plano', 'Uma região do plano'), commands: ['y <= -x^2 + 4', 'y >= x - 2'],
        expected: L('The overlap lies under the parabola and above the line, between x = −3 and x = 2 (where −x² + 4 = x − 2). (0, 0) is inside. Check it in the Graph Lab.', 'La superposición está bajo la parábola y sobre la recta, entre x = −3 y x = 2 (donde −x² + 4 = x − 2). (0, 0) está dentro. Compruébalo en el Laboratorio de gráficas.', 'A sobreposição fica abaixo da parábola e acima da reta, entre x = −3 e x = 2 (onde −x² + 4 = x − 2). (0, 0) está dentro. Confira no Laboratório de gráficos.') },
    ],
  },
];
