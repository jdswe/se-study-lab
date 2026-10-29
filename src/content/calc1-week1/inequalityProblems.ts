import type { Localized } from '../types';
import type { InequalityProblem } from '../../lib/inequality';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Inequality Lab problems for Calculus 1, Week 1, from warm-up to challenge. */
export const inequalityProblems: InequalityProblem[] = [
  {
    id: 'iq1', level: 1, inequality: '3x - 7 >= 5',
    title: L('A first linear inequality', 'Una primera desigualdad lineal', 'Uma primeira desigualdade linear'),
    hint: L('Add 7 to both sides, then divide by 3. Dividing by a positive number keeps the sign.', 'Suma 7 a ambos lados y divide entre 3. Dividir entre un número positivo mantiene el signo.', 'Some 7 aos dois lados e divida por 3. Dividir por um número positivo mantém o sinal.'),
  },
  {
    id: 'iq2', level: 1, inequality: '2(x - 1) - 5 < 4x + 3',
    title: L('Brackets on one side', 'Paréntesis en un lado', 'Parênteses de um lado'),
    hint: L('Expand, collect x on one side. You will divide by a negative number: flip the sign.', 'Desarrolla y junta la x en un lado. Vas a dividir entre un negativo: invierte el signo.', 'Expanda e junte o x de um lado. Você vai dividir por um negativo: inverta o sinal.'),
  },
  {
    id: 'iq3', level: 1, inequality: '20 + 0.1x < 12 + 0.3x',
    title: L('Which phone plan is cheaper?', '¿Qué plan de celular es más barato?', 'Qual plano de celular é mais barato?'),
    context: L('Plan A costs 20 a month plus 0.10 per minute. Plan B costs 12 a month plus 0.30 per minute. For how many minutes x is plan A cheaper?', 'El plan A cuesta 20 al mes más 0,10 por minuto. El plan B cuesta 12 al mes más 0,30 por minuto. ¿Para cuántos minutos x es más barato el plan A?', 'O plano A custa 20 por mês mais 0,10 por minuto. O plano B custa 12 por mês mais 0,30 por minuto. Para quantos minutos x o plano A é mais barato?'),
    hint: L('Move the x terms to the right and the numbers to the left: 8 < 0.2x.', 'Pasa los términos con x a la derecha y los números a la izquierda: 8 < 0,2x.', 'Passe os termos com x para a direita e os números para a esquerda: 8 < 0,2x.'),
  },
  {
    id: 'iq4', level: 1, inequality: '-1 < 2x + 3 <= 5',
    title: L('Two inequalities at once', 'Dos desigualdades a la vez', 'Duas desigualdades ao mesmo tempo'),
    hint: L('Do the same thing to all three parts: subtract 3, then divide by 2.', 'Haz lo mismo en las tres partes: resta 3 y luego divide entre 2.', 'Faça o mesmo nas três partes: subtraia 3 e depois divida por 2.'),
  },
  {
    id: 'iq5', level: 2, inequality: 'x^2 - x - 6 <= 0', factors: ['x + 2', 'x - 3'],
    title: L('A quadratic below zero', 'Una cuadrática bajo cero', 'Uma quadrática abaixo de zero'),
    hint: L('Factor: (x + 2)(x − 3). The roots split the line into three intervals; test one value in each.', 'Factoriza: (x + 2)(x − 3). Las raíces dividen la recta en tres intervalos; prueba un valor en cada uno.', 'Fatore: (x + 2)(x − 3). As raízes dividem a reta em três intervalos; teste um valor em cada um.'),
  },
  {
    id: 'iq6', level: 2, inequality: 'x^2 + 2x >= 8', factors: ['x + 4', 'x - 2'],
    title: L('Move everything to one side', 'Pasa todo a un lado', 'Passe tudo para um lado'),
    hint: L('First get zero on the right: x² + 2x − 8 ≥ 0. Then factor.', 'Primero deja cero a la derecha: x² + 2x − 8 ≥ 0. Luego factoriza.', 'Primeiro deixe zero à direita: x² + 2x − 8 ≥ 0. Depois fatore.'),
  },
  {
    id: 'iq7', level: 2, inequality: 'x^3 - 4x > 0', factors: ['x + 2', 'x', 'x - 2'],
    title: L('A cubic with three roots', 'Una cúbica con tres raíces', 'Uma cúbica com três raízes'),
    hint: L('Take x out: x(x² − 4) = x(x − 2)(x + 2). Four intervals, four test values.', 'Saca x factor común: x(x² − 4) = x(x − 2)(x + 2). Cuatro intervalos, cuatro valores de prueba.', 'Coloque x em evidência: x(x² − 4) = x(x − 2)(x + 2). Quatro intervalos, quatro valores de teste.'),
  },
  {
    id: 'iq8', level: 2, inequality: 'abs(x - 3) < 5',
    title: L('Distance less than 5', 'Distancia menor que 5', 'Distância menor que 5'),
    hint: L('|x − 3| < 5 means x is less than 5 away from 3: −5 < x − 3 < 5.', '|x − 3| < 5 significa que x está a menos de 5 de 3: −5 < x − 3 < 5.', '|x − 3| < 5 significa que x está a menos de 5 de 3: −5 < x − 3 < 5.'),
  },
  {
    id: 'iq9', level: 2, inequality: 'abs(2x + 1) >= 7',
    title: L('Distance at least 7', 'Distancia de al menos 7', 'Distância de pelo menos 7'),
    hint: L('Split into two cases: 2x + 1 ≥ 7 or 2x + 1 ≤ −7. The answer is a union.', 'Divide en dos casos: 2x + 1 ≥ 7 o 2x + 1 ≤ −7. La respuesta es una unión.', 'Divida em dois casos: 2x + 1 ≥ 7 ou 2x + 1 ≤ −7. A resposta é uma união.'),
  },
  {
    id: 'iq10', level: 2, inequality: 'abs(x - 25) <= 0.2',
    title: L('A part within tolerance', 'Una pieza dentro de la tolerancia', 'Uma peça dentro da tolerância'),
    context: L('A machine cuts bolts that should be 25 mm long. A bolt passes inspection when its length x is at most 0.2 mm away from 25 mm. Which lengths pass?', 'Una máquina corta tornillos que deben medir 25 mm. Un tornillo pasa la inspección si su longitud x está a lo sumo a 0,2 mm de 25 mm. ¿Qué longitudes pasan?', 'Uma máquina corta parafusos que devem medir 25 mm. Um parafuso passa na inspeção se seu comprimento x está no máximo a 0,2 mm de 25 mm. Quais comprimentos passam?'),
    hint: L('−0.2 ≤ x − 25 ≤ 0.2. Add 25 to all three parts.', '−0,2 ≤ x − 25 ≤ 0,2. Suma 25 a las tres partes.', '−0,2 ≤ x − 25 ≤ 0,2. Some 25 às três partes.'),
  },
  {
    id: 'iq11', level: 3, inequality: '(x + 1)/(x - 3) >= 0', factors: ['x + 1', 'x - 3'],
    title: L('A fraction that is never divided by zero', 'Una fracción que nunca divide entre cero', 'Uma fração que nunca divide por zero'),
    hint: L('Critical points: the numerator is 0 at −1, the denominator at 3. Include −1, never 3.', 'Puntos críticos: el numerador vale 0 en −1 y el denominador en 3. Incluye −1, nunca 3.', 'Pontos críticos: o numerador vale 0 em −1 e o denominador em 3. Inclua −1, nunca 3.'),
  },
  {
    id: 'iq12', level: 3, inequality: '(3x - 1)/(x + 2) < 2', factors: ['x - 5', 'x + 2'],
    title: L('Do not multiply by the denominator', 'No multipliques por el denominador', 'Não multiplique pelo denominador'),
    hint: L('Its sign is unknown. Subtract 2 instead and combine: (x − 5)/(x + 2) < 0.', 'Su signo es desconocido. Mejor resta 2 y combina: (x − 5)/(x + 2) < 0.', 'O sinal dele é desconhecido. Em vez disso, subtraia 2 e combine: (x − 5)/(x + 2) < 0.'),
  },
  {
    id: 'iq13', level: 3, inequality: 'x^4 - 10x^2 + 9 < 0', factors: ['x + 3', 'x + 1', 'x - 1', 'x - 3'],
    title: L('A quartic in disguise', 'Una cuártica disfrazada', 'Uma quártica disfarçada'),
    hint: L('Treat x² as one unknown: (x² − 1)(x² − 9). Four roots: ±1 and ±3.', 'Trata x² como una sola incógnita: (x² − 1)(x² − 9). Cuatro raíces: ±1 y ±3.', 'Trate x² como uma única incógnita: (x² − 1)(x² − 9). Quatro raízes: ±1 e ±3.'),
  },
  {
    id: 'iq14', level: 3, inequality: '2x + 1 > x - 3; 4 - x >= 2x - 5',
    title: L('A system: both must hold', 'Un sistema: ambas deben cumplirse', 'Um sistema: as duas devem valer'),
    hint: L('Solve each one, then keep only the overlap (the intersection).', 'Resuelve cada una y quédate solo con la parte común (la intersección).', 'Resolva cada uma e fique só com a parte comum (a interseção).'),
  },
  {
    id: 'iq15', level: 3, inequality: 'x^2 - 4 <= 0; 2x - 1 > 0',
    title: L('A system with a quadratic', 'Un sistema con una cuadrática', 'Um sistema com uma quadrática'),
    hint: L('The first gives [−2, 2], the second x > 1/2. Intersect them.', 'La primera da [−2, 2] y la segunda x > 1/2. Intersécalas.', 'A primeira dá [−2, 2] e a segunda x > 1/2. Faça a interseção.'),
  },
  {
    id: 'iq16', level: 3, inequality: '(x - 1)^2 > 0', factors: ['x - 1', 'x - 1'],
    title: L('A square is almost always positive', 'Un cuadrado casi siempre es positivo', 'Um quadrado quase sempre é positivo'),
    hint: L('A square is never negative. When is it exactly zero?', 'Un cuadrado nunca es negativo. ¿Cuándo vale exactamente cero?', 'Um quadrado nunca é negativo. Quando ele vale exatamente zero?'),
  },
];
