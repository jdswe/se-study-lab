import type { Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Calculus 1, Week 2 assessment: functions, families, transformations, trig, exp and log. */
export const calcWeek2Questions: Question[] = [
  {
    id: 'calc2-q-mc-function', type: 'multiple-choice', lessonId: 'calc2-l1-functions',
    prompt: L('Which rule is NOT a function?', '¿Qué regla NO es una función?', 'Qual regra NÃO é uma função?'),
    options: [
      L('Each person → their date of birth', 'Cada persona → su fecha de nacimiento', 'Cada pessoa → sua data de nascimento'),
      L('Each date → the people born that day', 'Cada fecha → las personas nacidas ese día', 'Cada data → as pessoas nascidas nesse dia'),
      L('Each product → its price today', 'Cada producto → su precio de hoy', 'Cada produto → seu preço de hoje'),
    ],
    answer: 1,
    explanation: L('Many people are born on the same day, so one date would have many outputs.', 'Muchas personas nacen el mismo día, así que una fecha tendría muchas salidas.', 'Muitas pessoas nascem no mesmo dia, então uma data teria muitas saídas.'),
    whyWrong: [L('Each person has exactly one birth date.', 'Cada persona tiene exactamente una fecha de nacimiento.', 'Cada pessoa tem exatamente uma data de nascimento.'), L('Correct.', 'Correcto.', 'Correto.'), L('Each product has one price at a given moment.', 'Cada producto tiene un precio en un momento dado.', 'Cada produto tem um preço em um dado momento.')],
  },
  {
    id: 'calc2-q-fill-evaluate', type: 'fill-blank', lessonId: 'calc2-l1-functions',
    prompt: L('If f(x) = 2x² − 5x, then f(−3) = ___', 'Si f(x) = 2x² − 5x, entonces f(−3) = ___', 'Se f(x) = 2x² − 5x, então f(−3) = ___'),
    accepted: ['33'],
    explanation: L('2(−3)² − 5(−3) = 18 + 15 = 33.', '2(−3)² − 5(−3) = 18 + 15 = 33.', '2(−3)² − 5(−3) = 18 + 15 = 33.'),
  },
  {
    id: 'calc2-q-matching-domain', type: 'matching', lessonId: 'calc2-l2-domain-range',
    prompt: L('Match each function with its domain.', 'Une cada función con su dominio.', 'Ligue cada função ao seu domínio.'),
    left: [L('√(x − 2)', '√(x − 2)', '√(x − 2)'), L('1/(x − 2)', '1/(x − 2)', '1/(x − 2)'), L('ln(x − 2)', 'ln(x − 2)', 'ln(x − 2)'), L('(x − 2)³', '(x − 2)³', '(x − 2)³')],
    right: [L('ℝ', 'ℝ', 'ℝ'), L('[2, ∞)', '[2, ∞)', '[2, ∞)'), L('(2, ∞)', '(2, ∞)', '(2, ∞)'), L('ℝ \\ {2}', 'ℝ \\ {2}', 'ℝ \\ {2}')],
    answer: [1, 3, 2, 0],
    explanation: L('The root allows 0 inside, the logarithm does not, the fraction only loses x = 2, and a polynomial accepts everything.', 'La raíz permite 0 adentro, el logaritmo no, la fracción solo pierde x = 2 y un polinomio acepta todo.', 'A raiz permite 0 dentro, o logaritmo não, a fração só perde x = 2 e um polinômio aceita tudo.'),
  },
  {
    id: 'calc2-q-mc-range', type: 'multiple-choice', lessonId: 'calc2-l2-domain-range',
    prompt: L('What is the range of f(x) = 5 − x²?', '¿Cuál es el rango de f(x) = 5 − x²?', 'Qual é a imagem de f(x) = 5 − x²?'),
    options: [L('(−∞, 5]', '(−∞, 5]', '(−∞, 5]'), L('[5, ∞)', '[5, ∞)', '[5, ∞)'), L('ℝ', 'ℝ', 'ℝ')],
    answer: 0,
    explanation: L('x² ≥ 0, so 5 − x² ≤ 5, and every value below 5 is reached.', 'x² ≥ 0, así que 5 − x² ≤ 5, y se alcanza todo valor por debajo de 5.', 'x² ≥ 0, então 5 − x² ≤ 5, e todo valor abaixo de 5 é atingido.'),
  },
  {
    id: 'calc2-q-tf-even', type: 'true-false', lessonId: 'calc2-l3-reading-graphs',
    prompt: L('True or false: f(x) = x⁴ − 2x² + 7 is an even function.', 'Verdadero o falso: f(x) = x⁴ − 2x² + 7 es una función par.', 'Verdadeiro ou falso: f(x) = x⁴ − 2x² + 7 é uma função par.'),
    options: TF, answer: 0,
    explanation: L('True. Only even powers and a constant appear, so f(−x) = f(x).', 'Verdadero. Solo aparecen potencias pares y una constante, así que f(−x) = f(x).', 'Verdadeiro. Só aparecem potências pares e uma constante, então f(−x) = f(x).'),
  },
  {
    id: 'calc2-q-scenario-increasing', type: 'scenario', lessonId: 'calc2-l3-reading-graphs',
    prompt: L('A café\'s daily profit is P(t) = −2t² + 24t − 40 (t = hours after opening). On which interval is profit rising?', 'La ganancia diaria de un café es P(t) = −2t² + 24t − 40 (t = horas desde la apertura). ¿En qué intervalo sube la ganancia?', 'O lucro diário de um café é P(t) = −2t² + 24t − 40 (t = horas desde a abertura). Em qual intervalo o lucro sobe?'),
    options: [L('[0, 6]', '[0, 6]', '[0, 6]'), L('[6, 12]', '[6, 12]', '[6, 12]'), L('[0, 32]', '[0, 32]', '[0, 32]')],
    answer: 0,
    explanation: L('The parabola opens down with vertex t = −24/(2·(−2)) = 6, so it rises until t = 6 (P(6) = 32) and falls after.', 'La parábola abre hacia abajo con vértice t = −24/(2·(−2)) = 6, así que sube hasta t = 6 (P(6) = 32) y baja después.', 'A parábola abre para baixo com vértice t = −24/(2·(−2)) = 6, então sobe até t = 6 (P(6) = 32) e desce depois.'),
    whyWrong: [L('Correct.', 'Correcto.', 'Correto.'), L('After the vertex the profit falls.', 'Después del vértice la ganancia baja.', 'Depois do vértice o lucro desce.'), L('32 is the maximum profit (a y value), not a time.', '32 es la ganancia máxima (un valor de y), no un tiempo.', '32 é o lucro máximo (um valor de y), não um tempo.')],
  },
  {
    id: 'calc2-q-fill-slope', type: 'fill-blank', lessonId: 'calc2-l4-families',
    prompt: L('The line through (2, 1) and (6, 13) has slope m = ___', 'La recta por (2, 1) y (6, 13) tiene pendiente m = ___', 'A reta por (2, 1) e (6, 13) tem inclinação m = ___'),
    accepted: ['3'],
    explanation: L('(13 − 1)/(6 − 2) = 12/4 = 3. The line is y = 3x − 5.', '(13 − 1)/(6 − 2) = 12/4 = 3. La recta es y = 3x − 5.', '(13 − 1)/(6 − 2) = 12/4 = 3. A reta é y = 3x − 5.'),
  },
  {
    id: 'calc2-q-troubleshoot-hole', type: 'troubleshooting', lessonId: 'calc2-l4-families',
    prompt: L('A student writes: "(x² − 9)/(x − 3) = x + 3, so its graph is the whole line y = x + 3." What is wrong?', 'Un estudiante escribe: "(x² − 9)/(x − 3) = x + 3, así que su gráfica es toda la recta y = x + 3". ¿Qué está mal?', 'Um estudante escreve: "(x² − 9)/(x − 3) = x + 3, então seu gráfico é toda a reta y = x + 3". O que está errado?'),
    options: [
      L('The point (3, 6) is missing: x = 3 is not in the domain', 'Falta el punto (3, 6): x = 3 no está en el dominio', 'Falta o ponto (3, 6): x = 3 não está no domínio'),
      L('It simplifies to x − 3, not x + 3', 'Se simplifica a x − 3, no a x + 3', 'Simplifica para x − 3, não x + 3'),
      L('There is a vertical asymptote at x = 3', 'Hay una asíntota vertical en x = 3', 'Há uma assíntota vertical em x = 3'),
    ],
    answer: 0,
    explanation: L('The factor x − 3 cancels, which leaves a hole at (3, 6), not an asymptote.', 'El factor x − 3 se cancela, lo que deja un hueco en (3, 6), no una asíntota.', 'O fator x − 3 se cancela, o que deixa um buraco em (3, 6), não uma assíntota.'),
  },
  {
    id: 'calc2-q-mc-piecewise', type: 'multiple-choice', lessonId: 'calc2-l5-piecewise',
    prompt: L('A parking garage charges 4 for the first hour or part of it, then 2 for each extra started hour. What do you pay for 3 h 10 min?', 'Un estacionamiento cobra 4 por la primera hora o fracción y luego 2 por cada hora extra iniciada. ¿Cuánto pagas por 3 h 10 min?', 'Um estacionamento cobra 4 pela primeira hora ou fração e depois 2 por cada hora extra iniciada. Quanto você paga por 3 h 10 min?'),
    options: [L('10', '10', '10'), L('8', '8', '8'), L('10.33', '10,33', '10,33')],
    answer: 0,
    explanation: L('3 h 10 min starts 4 hours: 4 + 3·2 = 10. A step function never gives fractions of a step.', '3 h 10 min inicia 4 horas: 4 + 3·2 = 10. Una función escalonada nunca da fracciones de escalón.', '3 h 10 min inicia 4 horas: 4 + 3·2 = 10. Uma função escada nunca dá frações de degrau.'),
  },
  {
    id: 'calc2-q-short-abs', type: 'short-answer', lessonId: 'calc2-l5-piecewise',
    prompt: L('Write |x − 5| without absolute value bars, using two cases.', 'Escribe |x − 5| sin barras de valor absoluto, con dos casos.', 'Escreva |x − 5| sem barras de valor absoluto, com dois casos.'),
    accepted: ['x - 5|x−5|x-5', '5 - x|5−x|5-x|-x + 5|−x + 5|-x+5|−x+5', '<|>|≥|≤'],
    explanation: L('|x − 5| = x − 5 if x ≥ 5, and 5 − x if x < 5. The split is where the inside is zero.', '|x − 5| = x − 5 si x ≥ 5, y 5 − x si x < 5. Se separa donde lo de adentro vale cero.', '|x − 5| = x − 5 se x ≥ 5, e 5 − x se x < 5. Separa-se onde o de dentro vale zero.'),
  },
  {
    id: 'calc2-q-mc-shift', type: 'multiple-choice', lessonId: 'calc2-l6-transformations',
    prompt: L('Where is the vertex of y = −(x + 2)² − 3?', '¿Dónde está el vértice de y = −(x + 2)² − 3?', 'Onde está o vértice de y = −(x + 2)² − 3?'),
    options: [L('(−2, −3), opening down', '(−2, −3), abre hacia abajo', '(−2, −3), abre para baixo'), L('(2, −3), opening down', '(2, −3), abre hacia abajo', '(2, −3), abre para baixo'), L('(−2, 3), opening up', '(−2, 3), abre hacia arriba', '(−2, 3), abre para cima')],
    answer: 0,
    explanation: L('x + 2 inside moves left 2; −3 outside moves down 3; the minus in front flips it.', 'x + 2 adentro mueve 2 a la izquierda; −3 afuera baja 3; el menos de adelante la da vuelta.', 'x + 2 dentro move 2 para a esquerda; −3 fora desce 3; o menos na frente a vira.'),
  },
  {
    id: 'calc2-q-tf-composition', type: 'true-false', lessonId: 'calc2-l7-composition-inverse',
    prompt: L('True or false: for f(x) = x + 1 and g(x) = 2x, f(g(x)) = g(f(x)).', 'Verdadero o falso: para f(x) = x + 1 y g(x) = 2x, f(g(x)) = g(f(x)).', 'Verdadeiro ou falso: para f(x) = x + 1 e g(x) = 2x, f(g(x)) = g(f(x)).'),
    options: TF, answer: 1,
    explanation: L('False. f(g(x)) = 2x + 1 but g(f(x)) = 2x + 2. Order matters.', 'Falso. f(g(x)) = 2x + 1 pero g(f(x)) = 2x + 2. El orden importa.', 'Falso. f(g(x)) = 2x + 1 mas g(f(x)) = 2x + 2. A ordem importa.'),
  },
  {
    id: 'calc2-q-code-inverse', type: 'code', lessonId: 'calc2-l7-composition-inverse',
    prompt: L('A converter uses this rule. Which function undoes it?', 'Un convertidor usa esta regla. ¿Qué función la deshace?', 'Um conversor usa esta regra. Qual função a desfaz?'),
    code: 'F = 1.8 * C + 32',
    options: [L('C = (F − 32)/1.8', 'C = (F − 32)/1,8', 'C = (F − 32)/1,8'), L('C = F/1.8 − 32', 'C = F/1,8 − 32', 'C = F/1,8 − 32'), L('C = 1/(1.8F + 32)', 'C = 1/(1,8F + 32)', 'C = 1/(1,8F + 32)')],
    answer: 0,
    explanation: L('Undo the steps in reverse order: first subtract 32, then divide by 1.8. The third option is 1/f, not the inverse.', 'Deshaz los pasos en orden inverso: primero resta 32 y luego divide entre 1,8. La tercera opción es 1/f, no la inversa.', 'Desfaça os passos na ordem inversa: primeiro subtraia 32 e depois divida por 1,8. A terceira opção é 1/f, não a inversa.'),
  },
  {
    id: 'calc2-q-matching-trig', type: 'matching', lessonId: 'calc2-l8-trigonometric',
    prompt: L('Match each function with its period.', 'Une cada función con su período.', 'Ligue cada função ao seu período.'),
    left: [L('sin x', 'sen x', 'sen x'), L('tan x', 'tan x', 'tg x'), L('cos(4x)', 'cos(4x)', 'cos(4x)'), L('sin(x/2)', 'sen(x/2)', 'sen(x/2)')],
    right: [L('π', 'π', 'π'), L('2π', '2π', '2π'), L('4π', '4π', '4π'), L('π/2', 'π/2', 'π/2')],
    answer: [1, 0, 3, 2],
    explanation: L('Period 2π/|B| for sine and cosine, π/|B| for tangent: 2π/4 = π/2 and 2π/(1/2) = 4π.', 'Período 2π/|B| para seno y coseno, π/|B| para tangente: 2π/4 = π/2 y 2π/(1/2) = 4π.', 'Período 2π/|B| para seno e cosseno, π/|B| para tangente: 2π/4 = π/2 e 2π/(1/2) = 4π.'),
  },
  {
    id: 'calc2-q-fill-radians', type: 'fill-blank', lessonId: 'calc2-l8-trigonometric',
    prompt: L('sin(π/6) = ___ (write it as a fraction or a decimal)', 'sen(π/6) = ___ (escríbelo como fracción o decimal)', 'sen(π/6) = ___ (escreva como fração ou decimal)'),
    accepted: ['1/2', '0.5', '0,5', '.5'],
    explanation: L('π/6 is 30°, and sin 30° = 1/2.', 'π/6 son 30°, y sen 30° = 1/2.', 'π/6 são 30°, e sen 30° = 1/2.'),
  },
  {
    id: 'calc2-q-mc-solve-exp', type: 'multiple-choice', lessonId: 'calc2-l9-exp-log',
    prompt: L('Solve 3e^(2x) = 12.', 'Resuelve 3e^(2x) = 12.', 'Resolva 3e^(2x) = 12.'),
    options: [L('x = ln(4)/2 ≈ 0.69', 'x = ln(4)/2 ≈ 0,69', 'x = ln(4)/2 ≈ 0,69'), L('x = ln(12)/6', 'x = ln(12)/6', 'x = ln(12)/6'), L('x = 2', 'x = 2', 'x = 2')],
    answer: 0,
    explanation: L('Divide by 3 first: e^(2x) = 4, so 2x = ln 4 and x = ln(4)/2 = ln 2 ≈ 0.69.', 'Primero divide entre 3: e^(2x) = 4, así que 2x = ln 4 y x = ln(4)/2 = ln 2 ≈ 0,69.', 'Primeiro divida por 3: e^(2x) = 4, então 2x = ln 4 e x = ln(4)/2 = ln 2 ≈ 0,69.'),
    whyWrong: [L('Correct.', 'Correcto.', 'Correto.'), L('The 3 multiplies the power; it is not part of the exponent.', 'El 3 multiplica la potencia; no es parte del exponente.', 'O 3 multiplica a potência; não faz parte do expoente.'), L('3e⁴ ≈ 164, far from 12.', '3e⁴ ≈ 164, lejos de 12.', '3e⁴ ≈ 164, longe de 12.')],
  },
  {
    id: 'calc2-q-troubleshoot-log', type: 'troubleshooting', lessonId: 'calc2-l9-exp-log',
    prompt: L('A student simplifies log(x + 10) as log x + 1. Where is the error?', 'Un estudiante simplifica log(x + 10) como log x + 1. ¿Dónde está el error?', 'Um estudante simplifica log(x + 10) como log x + 1. Onde está o erro?'),
    options: [
      L('Logs split products, not sums: log(10x) = log x + 1, but log(x + 10) does not split', 'Los log separan productos, no sumas: log(10x) = log x + 1, pero log(x + 10) no se separa', 'Os log separam produtos, não somas: log(10x) = log x + 1, mas log(x + 10) não se separa'),
      L('log 10 is 10, not 1', 'log 10 es 10, no 1', 'log 10 é 10, não 1'),
      L('There is no error', 'No hay ningún error', 'Não há erro'),
    ],
    answer: 0,
    explanation: L('log(xy) = log x + log y is about products. Try x = 10: log 20 ≈ 1.30, but log 10 + 1 = 2.', 'log(xy) = log x + log y habla de productos. Prueba x = 10: log 20 ≈ 1,30, pero log 10 + 1 = 2.', 'log(xy) = log x + log y fala de produtos. Teste x = 10: log 20 ≈ 1,30, mas log 10 + 1 = 2.'),
  },
  {
    id: 'calc2-q-scenario-decibels', type: 'scenario', lessonId: 'calc2-l9-exp-log',
    prompt: L('Sound level is L = 10·log(I/I₀) dB. A blender at 90 dB is how many times more intense than a library at 40 dB?', 'El nivel de sonido es L = 10·log(I/I₀) dB. ¿Cuántas veces más intensa es una licuadora de 90 dB que una biblioteca de 40 dB?', 'O nível sonoro é L = 10·log(I/I₀) dB. Quantas vezes mais intenso é um liquidificador de 90 dB que uma biblioteca de 40 dB?'),
    options: [L('100,000 times', '100.000 veces', '100.000 vezes'), L('50 times', '50 veces', '50 vezes'), L('2.25 times', '2,25 veces', '2,25 vezes')],
    answer: 0,
    explanation: L('A difference of 50 dB means 10^(50/10) = 10⁵ times the intensity.', 'Una diferencia de 50 dB significa 10^(50/10) = 10⁵ veces la intensidad.', 'Uma diferença de 50 dB significa 10^(50/10) = 10⁵ vezes a intensidade.'),
  },
];
