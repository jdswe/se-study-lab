import type { Localized } from '../types';
import type { WeekContent } from '../weekContent';
import { calcWeek2Lessons } from './lessons';
import { calcWeek2Flashcards } from './flashcards';
import { calcWeek2Questions } from './questions';
import { calcWeek2Activities } from './activities';
import { calcWeek2Stories } from './stories';
import { calcWeek2Labs } from './labs';
import { calcWeek2Plan } from './plan';
import { calcWeek2Resources } from './resources';
import { graphPresets } from './graphPresets';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Calculus 1, Week 2: functions and graphs. */
export const calcWeek2: WeekContent = {
  id: 'y1-t1-m3-calc-w2',
  year: 1,
  term: 1,
  module: 3,
  week: 2,
  subject: 'calculus-1',
  title: L('Functions and graphs', 'Funciones y gráficas', 'Funções e gráficos'),
  intro: L(
    'Calculus is the study of how functions change, so this week builds the toolbox of functions you will use for the rest of the course. You will define functions and evaluate them, find domains and ranges, read graphs (growth, symmetry, extremes), meet the basic families (linear, polynomial, rational, root, piecewise, absolute value), move graphs with transformations, compose and invert functions, and finish with trigonometric, exponential, and logarithmic functions.',
    'El cálculo estudia cómo cambian las funciones, así que esta semana arma la caja de herramientas de funciones que usarás el resto del curso. Definirás funciones y las evaluarás, hallarás dominios y rangos, leerás gráficas (crecimiento, simetría, extremos), conocerás las familias básicas (lineal, polinómica, racional, con raíz, por tramos, valor absoluto), moverás gráficas con transformaciones, compondrás e invertirás funciones y terminarás con las funciones trigonométricas, exponenciales y logarítmicas.',
    'O cálculo estuda como as funções mudam, então esta semana monta a caixa de ferramentas de funções que você vai usar no resto do curso. Você vai definir funções e avaliá-las, encontrar domínios e imagens, ler gráficos (crescimento, simetria, extremos), conhecer as famílias básicas (linear, polinomial, racional, com raiz, por partes, valor absoluto), mover gráficos com transformações, compor e inverter funções e terminar com as funções trigonométricas, exponenciais e logarítmicas.',
  ),
  objectives: [
    L('Decide whether a rule or a curve is a function, and evaluate functions at numbers and expressions.', 'Decidir si una regla o una curva es una función y evaluar funciones en números y expresiones.', 'Decidir se uma regra ou uma curva é uma função e avaliar funções em números e expressões.'),
    L('Find the domain and range of functions with fractions, roots, and logarithms.', 'Hallar el dominio y el rango de funciones con fracciones, raíces y logaritmos.', 'Encontrar o domínio e a imagem de funções com frações, raízes e logaritmos.'),
    L('Read a graph: intervals of increase and decrease, extremes, and even or odd symmetry.', 'Leer una gráfica: intervalos de crecimiento y decrecimiento, extremos y simetría par o impar.', 'Ler um gráfico: intervalos de crescimento e decrescimento, extremos e simetria par ou ímpar.'),
    L('Recognise and graph linear, polynomial, rational, root, piecewise, and absolute value functions.', 'Reconocer y graficar funciones lineales, polinómicas, racionales, con raíz, por tramos y de valor absoluto.', 'Reconhecer e traçar funções lineares, polinomiais, racionais, com raiz, por partes e de valor absoluto.'),
    L('Apply shifts, stretches, and reflections; combine, compose, and invert functions.', 'Aplicar desplazamientos, estiramientos y reflexiones; combinar, componer e invertir funciones.', 'Aplicar deslocamentos, esticamentos e reflexões; combinar, compor e inverter funções.'),
    L('Work with radians, sine, cosine, tangent, exponentials, and logarithms, and solve simple exponential and log equations.', 'Trabajar con radianes, seno, coseno, tangente, exponenciales y logaritmos, y resolver ecuaciones exponenciales y logarítmicas sencillas.', 'Trabalhar com radianos, seno, cosseno, tangente, exponenciais e logaritmos, e resolver equações exponenciais e logarítmicas simples.'),
  ],
  prerequisites: [
    L('Week 1: solving equations and inequalities, and the parabola.', 'Semana 1: resolver ecuaciones y desigualdades, y la parábola.', 'Semana 1: resolver equações e desigualdades, e a parábola.'),
    L('Powers, roots, and fractions; paper and pencil for every exercise.', 'Potencias, raíces y fracciones; papel y lápiz para cada ejercicio.', 'Potências, raízes e frações; papel e lápis para cada exercício.'),
  ],
  keyConcepts: [
    L('Function and notation', 'Función y notación', 'Função e notação'), L('Domain and range', 'Dominio y rango', 'Domínio e imagem'),
    L('Even and odd functions', 'Funciones pares e impares', 'Funções pares e ímpares'), L('Piecewise functions', 'Funciones por tramos', 'Funções por partes'),
    L('Transformations', 'Transformaciones', 'Transformações'), L('Composition and inverse', 'Composición e inversa', 'Composição e inversa'),
    L('Radians and the unit circle', 'Radianes y circunferencia unitaria', 'Radianos e circunferência unitária'), L('Exponentials and logarithms', 'Exponenciales y logaritmos', 'Exponenciais e logaritmos'),
  ],
  estimatedMinutes: 600,
  sequence: [
    L('Lessons 1–3 and Lab 1: functions, domain and range, reading graphs.', 'Lecciones 1–3 y Laboratorio 1: funciones, dominio y rango, leer gráficas.', 'Lições 1–3 e Laboratório 1: funções, domínio e imagem, ler gráficos.'),
    L('Lessons 4–6 and Lab 2 with the Graph Lab: families, pieces, transformations.', 'Lecciones 4–6 y Laboratorio 2 con el Laboratorio de gráficas: familias, tramos, transformaciones.', 'Lições 4–6 e Laboratório 2 com o Laboratório de gráficos: famílias, partes, transformações.'),
    L('Lessons 7–8 and Lab 3: composition, inverses, trigonometric functions.', 'Lecciones 7–8 y Laboratorio 3: composición, inversas, funciones trigonométricas.', 'Lições 7–8 e Laboratório 3: composição, inversas, funções trigonométricas.'),
    L('Lesson 9 and Lab 4: exponentials and logarithms. Then the quiz.', 'Lección 9 y Laboratorio 4: exponenciales y logaritmos. Luego el cuestionario.', 'Lição 9 e Laboratório 4: exponenciais e logaritmos. Depois o questionário.'),
  ],
  outcomes: [
    L('You can sketch the main families of functions from their formulas without a table of 20 points.', 'Puedes bosquejar las principales familias de funciones a partir de su fórmula sin una tabla de 20 puntos.', 'Você consegue esboçar as principais famílias de funções a partir da fórmula sem uma tabela de 20 pontos.'),
    L('You find domains with week 1\'s inequalities and check them on a graph.', 'Hallas dominios con las desigualdades de la semana 1 y los compruebas en una gráfica.', 'Você encontra domínios com as desigualdades da semana 1 e os confere num gráfico.'),
    L('You solve exponential and logarithmic equations and discard invalid answers.', 'Resuelves ecuaciones exponenciales y logarítmicas y descartas las respuestas inválidas.', 'Você resolve equações exponenciais e logarítmicas e descarta as respostas inválidas.'),
  ],
  checklist: [
    L('Read all nine lessons', 'Leer las nueve lecciones', 'Ler as nove lições'),
    L('Complete the activities in each lesson', 'Completar las actividades de cada lección', 'Completar as atividades de cada lição'),
    L('Finish Labs 1–4 on paper', 'Terminar en papel los Laboratorios 1–4', 'Terminar no papel os Laboratórios 1–4'),
    L('Explore every example in the Graph Lab', 'Explorar cada ejemplo del Laboratorio de gráficas', 'Explorar cada exemplo do Laboratório de gráficos'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Moving y = f(x − 3) to the left.', 'Mover y = f(x − 3) hacia la izquierda.', 'Mover y = f(x − 3) para a esquerda.'), fix: L('Inside changes go against the sign: x − 3 means right 3.', 'Los cambios de adentro van contra el signo: x − 3 significa 3 a la derecha.', 'As mudanças de dentro vão contra o sinal: x − 3 significa 3 para a direita.') },
    { mistake: L('Forgetting the domain when simplifying or composing.', 'Olvidar el dominio al simplificar o componer.', 'Esquecer o domínio ao simplificar ou compor.'), fix: L('Write the domain first, before any cancelling or substituting.', 'Escribe el dominio primero, antes de cancelar o sustituir.', 'Escreva o domínio primeiro, antes de cancelar ou substituir.') },
    { mistake: L('Using degrees where radians are expected.', 'Usar grados donde se esperan radianes.', 'Usar graus onde se esperam radianos.'), fix: L('In calculus and in the Graph Lab, angles are in radians: 180° = π.', 'En cálculo y en el Laboratorio de gráficas, los ángulos van en radianes: 180° = π.', 'No cálculo e no Laboratório de gráficos, os ângulos ficam em radianos: 180° = π.') },
  ],
  lessons: calcWeek2Lessons,
  flashcards: calcWeek2Flashcards,
  questions: calcWeek2Questions,
  labs: calcWeek2Labs,
  plan: calcWeek2Plan,
  resources: calcWeek2Resources,
  activities: calcWeek2Activities,
  stories: calcWeek2Stories,
  tools: ['graph-lab'],
  toolData: { graphPresets },
  videos: [],
  documents: [
    { title: { en: 'Week summary', es: 'Resumen de la semana', pt: 'Resumo da semana' }, file: 'summary.pdf', kind: 'pdf' },
    { title: { en: 'Formula sheet', es: 'Hoja de fórmulas', pt: 'Folha de fórmulas' }, file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet with answers', es: 'Hoja de ejercicios con respuestas', pt: 'Folha de exercícios com respostas' }, file: 'worksheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet (editable)', es: 'Hoja de ejercicios (editable)', pt: 'Folha de exercícios (editável)' }, file: 'worksheet.docx', kind: 'docx', preview: 'worksheet.pdf' },
    { title: { en: 'Slides', es: 'Diapositivas', pt: 'Slides' }, file: 'slides.pptx', kind: 'pptx', preview: 'slides.pdf' },
  ],
};
