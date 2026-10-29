import type { Lab, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Paper-and-pencil labs for Calculus 1, Week 1. Each step can be checked in the Inequality Lab. */
export const calcWeek1Labs: Lab[] = [
  {
    id: 'calc1-lab-1-equations', kind: 'math', level: 1, minutes: 30,
    title: L('Equations warm-up', 'Calentamiento con ecuaciones', 'Aquecimento com equações'),
    goal: L('Solve linear, quadratic, and cubic equations by hand and check every root.', 'Resolver a mano ecuaciones lineales, cuadráticas y cúbicas, y comprobar cada raíz.', 'Resolver à mão equações lineares, quadráticas e cúbicas, e conferir cada raiz.'),
    steps: [
      { id: 'calc1-lab1-s1', title: L('A linear equation', 'Una ecuación lineal', 'Uma equação linear'), commands: ['4(x - 2) + 3 = 2x + 9'],
        expected: L('x = 7. Check: 4·5 + 3 = 23 = 14 + 9.', 'x = 7. Comprobación: 4·5 + 3 = 23 = 14 + 9.', 'x = 7. Conferência: 4·5 + 3 = 23 = 14 + 9.') },
      { id: 'calc1-lab1-s2', title: L('A quadratic by factoring', 'Una cuadrática por factorización', 'Uma quadrática por fatoração'), commands: ['x^2 + x - 20 = 0'],
        expected: L('(x + 5)(x − 4) = 0, so x = −5 or x = 4.', '(x + 5)(x − 4) = 0, así que x = −5 o x = 4.', '(x + 5)(x − 4) = 0, então x = −5 ou x = 4.') },
      { id: 'calc1-lab1-s3', title: L('A quadratic with the formula', 'Una cuadrática con la fórmula', 'Uma quadrática com a fórmula'), commands: ['x^2 - 4x + 2 = 0'],
        expected: L('Δ = 8, x = 2 ± √2 (about 3.41 and 0.59).', 'Δ = 8, x = 2 ± √2 (aprox. 3,41 y 0,59).', 'Δ = 8, x = 2 ± √2 (aprox. 3,41 e 0,59).') },
      { id: 'calc1-lab1-s4', title: L('A cubic with synthetic division', 'Una cúbica con división sintética', 'Uma cúbica com divisão sintética'), commands: ['2x^3 - 3x^2 - 3x + 2 = 0'],
        expected: L('x = 2 is a root; the quotient 2x² + x − 1 = (2x − 1)(x + 1). Roots: 2, 1/2, −1.', 'x = 2 es raíz; el cociente 2x² + x − 1 = (2x − 1)(x + 1). Raíces: 2, 1/2, −1.', 'x = 2 é raiz; o quociente 2x² + x − 1 = (2x − 1)(x + 1). Raízes: 2, 1/2, −1.') },
    ],
  },
  {
    id: 'calc1-lab-2-linear', kind: 'math', level: 1, minutes: 25,
    title: L('Linear inequalities and intervals', 'Desigualdades lineales e intervalos', 'Desigualdades lineares e intervalos'),
    goal: L('Solve, draw on the number line, and write the interval.', 'Resolver, dibujar en la recta y escribir el intervalo.', 'Resolver, desenhar na reta e escrever o intervalo.'),
    steps: [
      { id: 'calc1-lab2-s1', title: L('Flip the sign', 'Invierte el signo', 'Inverta o sinal'), commands: ['5 - 3x <= 11'],
        expected: L('x ≥ −2: [−2, ∞).', 'x ≥ −2: [−2, ∞).', 'x ≥ −2: [−2, ∞).') },
      { id: 'calc1-lab2-s2', title: L('Fractions', 'Fracciones', 'Frações'), commands: ['x/2 - 1 > x/3'],
        expected: L('Multiply by 6: 3x − 6 > 2x, so x > 6: (6, ∞).', 'Multiplica por 6: 3x − 6 > 2x, así que x > 6: (6, ∞).', 'Multiplique por 6: 3x − 6 > 2x, então x > 6: (6, ∞).') },
      { id: 'calc1-lab2-s3', title: L('A double inequality', 'Una desigualdad doble', 'Uma desigualdade dupla'), commands: ['-4 <= 3x + 2 < 11'],
        expected: L('−2 ≤ x < 3: [−2, 3).', '−2 ≤ x < 3: [−2, 3).', '−2 ≤ x < 3: [−2, 3).') },
    ],
  },
  {
    id: 'calc1-lab-3-signchart', kind: 'math', level: 2, minutes: 35,
    title: L('Sign charts', 'Tablas de signos', 'Quadros de sinais'),
    goal: L('Build a full sign chart for polynomial and rational inequalities.', 'Construir una tabla de signos completa para desigualdades polinómicas y racionales.', 'Montar um quadro de sinais completo para desigualdades polinomiais e racionais.'),
    steps: [
      { id: 'calc1-lab3-s1', title: L('A quadratic', 'Una cuadrática', 'Uma quadrática'), commands: ['x^2 - 3x - 10 > 0'],
        expected: L('(x − 5)(x + 2) > 0: (−∞, −2) ∪ (5, ∞).', '(x − 5)(x + 2) > 0: (−∞, −2) ∪ (5, ∞).', '(x − 5)(x + 2) > 0: (−∞, −2) ∪ (5, ∞).') },
      { id: 'calc1-lab3-s2', title: L('A cubic', 'Una cúbica', 'Uma cúbica'), commands: ['x^3 - x^2 - 6x <= 0'],
        expected: L('x(x − 3)(x + 2) ≤ 0: (−∞, −2] ∪ [0, 3].', 'x(x − 3)(x + 2) ≤ 0: (−∞, −2] ∪ [0, 3].', 'x(x − 3)(x + 2) ≤ 0: (−∞, −2] ∪ [0, 3].') },
      { id: 'calc1-lab3-s3', title: L('A rational inequality', 'Una desigualdad racional', 'Uma desigualdade racional'), commands: ['(x - 4)/(x + 1) <= 0'],
        expected: L('(−1, 4]: −1 is excluded, 4 is included.', '(−1, 4]: −1 se excluye, 4 se incluye.', '(−1, 4]: −1 fica de fora, 4 entra.') },
      { id: 'calc1-lab3-s4', title: L('Subtract before you combine', 'Resta antes de combinar', 'Subtraia antes de combinar'), commands: ['(2x + 1)/(x - 1) > 1'],
        expected: L('(x + 2)/(x − 1) > 0: (−∞, −2) ∪ (1, ∞).', '(x + 2)/(x − 1) > 0: (−∞, −2) ∪ (1, ∞).', '(x + 2)/(x − 1) > 0: (−∞, −2) ∪ (1, ∞).') },
    ],
  },
  {
    id: 'calc1-lab-4-abs', kind: 'math', level: 3, minutes: 35,
    title: L('Absolute value, systems, and a model', 'Valor absoluto, sistemas y un modelo', 'Valor absoluto, sistemas e um modelo'),
    goal: L('Turn distances and conditions into inequalities and solve them.', 'Convertir distancias y condiciones en desigualdades y resolverlas.', 'Transformar distâncias e condições em desigualdades e resolvê-las.'),
    steps: [
      { id: 'calc1-lab4-s1', title: L('Within a distance', 'Dentro de una distancia', 'Dentro de uma distância'), commands: ['abs(2x - 7) <= 3'],
        expected: L('4 ≤ 2x ≤ 10: [2, 5].', '4 ≤ 2x ≤ 10: [2, 5].', '4 ≤ 2x ≤ 10: [2, 5].') },
      { id: 'calc1-lab4-s2', title: L('Beyond a distance', 'Más allá de una distancia', 'Além de uma distância'), commands: ['abs(x + 1) > 4'],
        expected: L('(−∞, −5) ∪ (3, ∞).', '(−∞, −5) ∪ (3, ∞).', '(−∞, −5) ∪ (3, ∞).') },
      { id: 'calc1-lab4-s3', title: L('A system', 'Un sistema', 'Um sistema'), commands: ['3x - 1 >= 2; x^2 < 16'],
        expected: L('x ≥ 1 and −4 < x < 4: [1, 4).', 'x ≥ 1 y −4 < x < 4: [1, 4).', 'x ≥ 1 e −4 < x < 4: [1, 4).') },
      { id: 'calc1-lab4-s4', title: L('Model: a fruit stand', 'Modelo: un puesto de frutas', 'Modelo: uma banca de frutas'), commands: ['revenue 3x, costs 40 + 1.4x', '3x > 40 + 1.4x'],
        expected: L('1.6x > 40, so x > 25: the stand makes a profit from 26 kilos on.', '1,6x > 40, así que x > 25: el puesto gana desde 26 kilos.', '1,6x > 40, então x > 25: a banca tem lucro a partir de 26 quilos.') },
    ],
  },
];
