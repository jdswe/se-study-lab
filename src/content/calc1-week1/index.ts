import type { Localized } from '../types';
import type { WeekContent } from '../weekContent';
import { calcWeek1Lessons } from './lessons';
import { calcWeek1Flashcards } from './flashcards';
import { calcWeek1Questions } from './questions';
import { calcWeek1Activities } from './activities';
import { calcWeek1Stories } from './stories';
import { calcWeek1Labs } from './labs';
import { calcWeek1Plan } from './plan';
import { calcWeek1Resources } from './resources';
import { inequalityProblems } from './inequalityProblems';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Calculus 1, Week 1: introduction, equations, and inequalities. */
export const calcWeek1: WeekContent = {
  id: 'y1-t1-m3-calc-w1',
  year: 1,
  term: 1,
  module: 3,
  week: 1,
  subject: 'calculus-1',
  title: L('Introduction and inequalities', 'Introducción y desigualdades', 'Introdução e desigualdades'),
  intro: L(
    'Calculus is built on the real numbers and on knowing exactly where an expression is positive, negative, or zero. This week you review equations of every degree, then learn to solve inequalities: linear, polynomial, rational, and with absolute value. You will write answers in interval notation and check them on a live number line.',
    'El cálculo se apoya en los números reales y en saber exactamente dónde una expresión es positiva, negativa o cero. Esta semana repasas ecuaciones de todo grado y luego aprendes a resolver desigualdades: lineales, polinómicas, racionales y con valor absoluto. Escribirás las respuestas en notación de intervalos y las comprobarás en una recta numérica interactiva.',
    'O cálculo se apoia nos números reais e em saber exatamente onde uma expressão é positiva, negativa ou zero. Nesta semana você revisa equações de todo grau e depois aprende a resolver desigualdades: lineares, polinomiais, racionais e com valor absoluto. Você vai escrever as respostas em notação de intervalos e conferi-las em uma reta numérica interativa.',
  ),
  objectives: [
    L('Place real numbers on the number line and read |a − b| as a distance.', 'Ubicar números reales en la recta y leer |a − b| como una distancia.', 'Localizar números reais na reta e ler |a − b| como uma distância.'),
    L('Find the degree and the roots of an equation, and check them.', 'Encontrar el grado y las raíces de una ecuación, y comprobarlas.', 'Encontrar o grau e as raízes de uma equação, e conferi-las.'),
    L('Solve linear, quadratic, and higher-degree equations, discarding extraneous answers.', 'Resolver ecuaciones lineales, cuadráticas y de grado mayor, descartando respuestas extrañas.', 'Resolver equações lineares, quadráticas e de grau maior, descartando respostas estranhas.'),
    L('Write solution sets in interval notation, with unions and intersections.', 'Escribir conjuntos solución en notación de intervalos, con uniones e intersecciones.', 'Escrever conjuntos solução em notação de intervalos, com uniões e interseções.'),
    L('Solve polynomial and rational inequalities with a sign chart.', 'Resolver desigualdades polinómicas y racionales con una tabla de signos.', 'Resolver desigualdades polinomiais e racionais com um quadro de sinais.'),
    L('Solve absolute value inequalities and systems of inequalities.', 'Resolver desigualdades con valor absoluto y sistemas de desigualdades.', 'Resolver desigualdades com valor absoluto e sistemas de desigualdades.'),
  ],
  prerequisites: [
    L('Operations with fractions, powers, and simple factoring.', 'Operaciones con fracciones, potencias y factorización sencilla.', 'Operações com frações, potências e fatoração simples.'),
    L('Paper and pencil: write each step before checking it here.', 'Papel y lápiz: escribe cada paso antes de comprobarlo aquí.', 'Papel e lápis: escreva cada passo antes de conferi-lo aqui.'),
  ],
  keyConcepts: [
    L('Real numbers ℝ', 'Números reales ℝ', 'Números reais ℝ'), L('Degree and roots', 'Grado y raíces', 'Grau e raízes'),
    L('Discriminant', 'Discriminante', 'Discriminante'), L('Interval notation', 'Notación de intervalos', 'Notação de intervalos'),
    L('Sign chart', 'Tabla de signos', 'Quadro de sinais'), L('Absolute value', 'Valor absoluto', 'Valor absoluto'),
    L('Systems of inequalities', 'Sistemas de desigualdades', 'Sistemas de desigualdades'),
  ],
  estimatedMinutes: 480,
  sequence: [
    L('Read lessons 1–4 and do Lab 1: numbers and equations.', 'Lee las lecciones 1–4 y haz el Laboratorio 1: números y ecuaciones.', 'Leia as lições 1–4 e faça o Laboratório 1: números e equações.'),
    L('Read lessons 5–6, do Lab 2, and solve the warm-ups in the Inequality Lab.', 'Lee las lecciones 5–6, haz el Laboratorio 2 y resuelve los calentamientos del Laboratorio de desigualdades.', 'Leia as lições 5–6, faça o Laboratório 2 e resolva os aquecimentos do Laboratório de desigualdades.'),
    L('Read lesson 7, do Lab 3, and solve the practice problems.', 'Lee la lección 7, haz el Laboratorio 3 y resuelve los problemas de práctica.', 'Leia a lição 7, faça o Laboratório 3 e resolva os problemas de prática.'),
    L('Read lesson 8, do Lab 4 and the challenges, then take the quiz.', 'Lee la lección 8, haz el Laboratorio 4 y los desafíos, y luego el cuestionario.', 'Leia a lição 8, faça o Laboratório 4 e os desafios, e depois o questionário.'),
  ],
  outcomes: [
    L('You can solve any inequality of this week with a clear method.', 'Puedes resolver cualquier desigualdad de esta semana con un método claro.', 'Você consegue resolver qualquer desigualdade desta semana com um método claro.'),
    L('You write and read interval notation without hesitation.', 'Escribes y lees notación de intervalos sin dudar.', 'Você escreve e lê notação de intervalos sem hesitar.'),
    L('You check answers by testing values instead of guessing.', 'Compruebas respuestas probando valores en lugar de adivinar.', 'Você confere respostas testando valores em vez de adivinhar.'),
  ],
  checklist: [
    L('Read all eight lessons', 'Leer las ocho lecciones', 'Ler as oito lições'),
    L('Complete the activities in each lesson', 'Completar las actividades de cada lección', 'Completar as atividades de cada lição'),
    L('Finish Labs 1–4 on paper', 'Terminar en papel los Laboratorios 1–4', 'Terminar no papel os Laboratórios 1–4'),
    L('Solve every problem in the Inequality Lab', 'Resolver todos los problemas del Laboratorio de desigualdades', 'Resolver todos os problemas do Laboratório de desigualdades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Forgetting to flip the sign when dividing by a negative number.', 'Olvidar invertir el signo al dividir entre un número negativo.', 'Esquecer de inverter o sinal ao dividir por um número negativo.'), fix: L('Circle every negative divisor before dividing.', 'Encierra en un círculo cada divisor negativo antes de dividir.', 'Circule cada divisor negativo antes de dividir.') },
    { mistake: L('Including a zero of the denominator in the answer.', 'Incluir un cero del denominador en la respuesta.', 'Incluir um zero do denominador na resposta.'), fix: L('Mark those points with a hollow dot from the start.', 'Marca esos puntos con un punto hueco desde el principio.', 'Marque esses pontos com um ponto vazio desde o início.') },
  ],
  lessons: calcWeek1Lessons,
  flashcards: calcWeek1Flashcards,
  questions: calcWeek1Questions,
  labs: calcWeek1Labs,
  plan: calcWeek1Plan,
  resources: calcWeek1Resources,
  activities: calcWeek1Activities,
  stories: calcWeek1Stories,
  tools: ['inequality-lab'],
  toolData: { inequalityProblems },
  videos: [],
  // Files live in public/downloads/<locale>/<week id>/ and are generated by `npm run docs`.
  documents: [
    { title: { en: 'Week summary', es: 'Resumen de la semana', pt: 'Resumo da semana' }, file: 'summary.pdf', kind: 'pdf' },
    { title: { en: 'Formula sheet', es: 'Hoja de fórmulas', pt: 'Folha de fórmulas' }, file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet with answers', es: 'Hoja de ejercicios con respuestas', pt: 'Folha de exercícios com respostas' }, file: 'worksheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet (editable)', es: 'Hoja de ejercicios (editable)', pt: 'Folha de exercícios (editável)' }, file: 'worksheet.docx', kind: 'docx', preview: 'worksheet.pdf' },
    { title: { en: 'Slides', es: 'Diapositivas', pt: 'Slides' }, file: 'slides.pptx', kind: 'pptx', preview: 'slides.pdf' },
  ],
};
