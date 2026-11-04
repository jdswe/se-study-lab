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
import { graphPresets } from './graphPresets';
import { ruffiniProblems } from './ruffiniProblems';

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
    'This week reviews equations of every degree and then moves to inequalities, the tool calculus uses to say where an expression is positive, negative, or zero. You will classify equations by degree, solve second-degree equations and read their parabolas (vertex, axis, roots, maximum and minimum), handle radicals, absolute values, and fractions, factor with Ruffini\'s rule, and solve inequalities with sign tables, including systems and two variables.',
    'Esta semana repasa las ecuaciones de todo grado y pasa a las desigualdades, la herramienta que usa el cálculo para decir dónde una expresión es positiva, negativa o cero. Clasificarás ecuaciones por grado, resolverás ecuaciones de segundo grado y leerás sus parábolas (vértice, eje, raíces, máximo y mínimo), tratarás raíces, valores absolutos y fracciones, factorizarás con la regla de Ruffini y resolverás desigualdades con tablas de signos, incluidos sistemas y dos variables.',
    'Esta semana revisa as equações de todo grau e passa às desigualdades, a ferramenta que o cálculo usa para dizer onde uma expressão é positiva, negativa ou zero. Você vai classificar equações pelo grau, resolver equações de segundo grau e ler suas parábolas (vértice, eixo, raízes, máximo e mínimo), tratar raízes, valores absolutos e frações, fatorar com a regra de Briot–Ruffini e resolver desigualdades com quadros de sinais, incluindo sistemas e duas variáveis.',
  ),
  objectives: [
    L('Classify an equation by its degree and check its roots by substitution.', 'Clasificar una ecuación por su grado y comprobar sus raíces sustituyendo.', 'Classificar uma equação pelo grau e conferir suas raízes substituindo.'),
    L('Solve second-degree equations and read the parabola: vertex, axis, roots, maximum or minimum.', 'Resolver ecuaciones de segundo grado y leer la parábola: vértice, eje, raíces, máximo o mínimo.', 'Resolver equações de segundo grau e ler a parábola: vértice, eixo, raízes, máximo ou mínimo.'),
    L('Solve radical, absolute value, and fraction equations, discarding false answers.', 'Resolver ecuaciones con raíces, valor absoluto y fracciones, descartando respuestas falsas.', 'Resolver equações com raízes, valor absoluto e frações, descartando respostas falsas.'),
    L('Turn real situations into equations and interpret the answer.', 'Convertir situaciones reales en ecuaciones e interpretar la respuesta.', 'Transformar situações reais em equações e interpretar a resposta.'),
    L('Factor higher-degree polynomials with Ruffini\'s rule.', 'Factorizar polinomios de grado mayor con la regla de Ruffini.', 'Fatorar polinômios de grau maior com a regra de Briot–Ruffini.'),
    L('Write the eight types of interval and solve inequalities with sign tables, systems, and absolute values by cases.', 'Escribir los ocho tipos de intervalo y resolver desigualdades con tablas de signos, sistemas y valores absolutos por casos.', 'Escrever os oito tipos de intervalo e resolver desigualdades com quadros de sinais, sistemas e valores absolutos por casos.'),
  ],
  prerequisites: [
    L('Operations with fractions, powers, and simple factoring.', 'Operaciones con fracciones, potencias y factorización sencilla.', 'Operações com frações, potências e fatoração simples.'),
    L('Paper and pencil: write each step before checking it here.', 'Papel y lápiz: escribe cada paso antes de comprobarlo aquí.', 'Papel e lápis: escreva cada passo antes de conferi-lo aqui.'),
  ],
  keyConcepts: [
    L('Degree of an equation', 'Grado de una ecuación', 'Grau de uma equação'), L('Discriminant', 'Discriminante', 'Discriminante'),
    L('Parabola and vertex', 'Parábola y vértice', 'Parábola e vértice'), L('Ruffini\'s rule', 'Regla de Ruffini', 'Regra de Briot–Ruffini'),
    L('Types of interval', 'Tipos de intervalo', 'Tipos de intervalo'), L('Sign table', 'Tabla de signos', 'Quadro de sinais'),
    L('Absolute value by cases', 'Valor absoluto por casos', 'Valor absoluto por casos'), L('Systems of inequalities', 'Sistemas de desigualdades', 'Sistemas de desigualdades'),
  ],
  estimatedMinutes: 540,
  sequence: [
    L('Lessons 1–2 with the Graph Lab: degree, roots, and the parabola.', 'Lecciones 1–2 con el Laboratorio de gráficas: grado, raíces y la parábola.', 'Lições 1–2 com o Laboratório de gráficos: grau, raízes e a parábola.'),
    L('Lessons 3–5 and Labs 1–2: special equations, word problems, Ruffini.', 'Lecciones 3–5 y Laboratorios 1–2: ecuaciones especiales, problemas de texto, Ruffini.', 'Lições 3–5 e Laboratórios 1–2: equações especiais, problemas com texto, Briot–Ruffini.'),
    L('Lessons 6–7, Lab 3, and the Inequality Lab: intervals and sign tables.', 'Lecciones 6–7, Laboratorio 3 y el Laboratorio de desigualdades: intervalos y tablas de signos.', 'Lições 6–7, Laboratório 3 e o Laboratório de desigualdades: intervalos e quadros de sinais.'),
    L('Lesson 8 and Lab 4: systems, cases, regions. Then the quiz.', 'Lección 8 y Laboratorio 4: sistemas, casos, regiones. Luego el cuestionario.', 'Lição 8 e Laboratório 4: sistemas, casos, regiões. Depois o questionário.'),
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
    L('Explore every preset in the Graph Lab', 'Explorar cada ejemplo del Laboratorio de gráficas', 'Explorar cada exemplo do Laboratório de gráficos'),
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
  tools: ['graph-lab', 'ruffini-lab', 'inequality-lab'],
  toolData: { inequalityProblems, graphPresets, ruffiniProblems },
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
