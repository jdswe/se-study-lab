import type { StudyPlanDay } from '../types';

/** A one-week plan for Calculus 1, Week 1. */
export const calcWeek1Plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: { en: 'Lessons 1–2: real numbers, equations, degree, and roots.', es: 'Lecciones 1–2: números reales, ecuaciones, grado y raíces.', pt: 'Lições 1–2: números reais, equações, grau e raízes.' }, minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: { en: 'Lessons 3–4: linear, quadratic, and higher-degree equations. Lab 1.', es: 'Lecciones 3–4: ecuaciones lineales, cuadráticas y de grado mayor. Laboratorio 1.', pt: 'Lições 3–4: equações lineares, quadráticas e de grau maior. Laboratório 1.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 3', focus: { en: 'Lessons 5–6: intervals and linear inequalities. Lab 2 and Inequality Lab warm-ups.', es: 'Lecciones 5–6: intervalos y desigualdades lineales. Laboratorio 2 y calentamientos del Laboratorio de desigualdades.', pt: 'Lições 5–6: intervalos e desigualdades lineares. Laboratório 2 e aquecimentos do Laboratório de desigualdades.' }, minutes: 50, kind: 'practice' },
  { day: 'Day 4', focus: { en: 'Lesson 7: sign charts. Lab 3 and the practice problems in the Inequality Lab.', es: 'Lección 7: tablas de signos. Laboratorio 3 y los problemas de práctica del Laboratorio de desigualdades.', pt: 'Lição 7: quadros de sinais. Laboratório 3 e os problemas de prática do Laboratório de desigualdades.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 5', focus: { en: 'Lesson 8: absolute value and systems. Lab 4 and the challenge problems.', es: 'Lección 8: valor absoluto y sistemas. Laboratorio 4 y los problemas de desafío.', pt: 'Lição 8: valor absoluto e sistemas. Laboratório 4 e os problemas de desafio.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: { en: 'Review the flashcards that are due and redo any exercise you missed.', es: 'Repasa las tarjetas pendientes y rehaz los ejercicios que fallaste.', pt: 'Revise os cartões pendentes e refaça os exercícios que errou.' }, minutes: 40, kind: 'review' },
  { day: 'Day 7', focus: { en: 'Full quiz, then check every missed answer on the number line.', es: 'Cuestionario completo y comprueba cada respuesta fallada en la recta numérica.', pt: 'Questionário completo e confira cada resposta errada na reta numérica.' }, minutes: 45, kind: 'quiz' },
];
