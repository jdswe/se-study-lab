import type { Localized, StudyPlanDay } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** A one-week plan for Databases 1, Week 2. */
export const dbWeek2Plan: StudyPlanDay[] = [
  { day: 'Day 1', minutes: 50, kind: 'read',
    focus: L('Lessons 1–3: why the relational model won, its vocabulary (domain, degree, cardinality, NULL), and keys.', 'Lecciones 1–3: por qué ganó el modelo relacional, su vocabulario (dominio, grado, cardinalidad, NULL) y las claves.', 'Lições 1–3: por que o modelo relacional venceu, seu vocabulário (domínio, grau, cardinalidade, NULL) e as chaves.') },
  { day: 'Day 2', minutes: 60, kind: 'practice',
    focus: L('Lessons 4–5: integrity and 1:1, 1:N, N:M. SQL Lab tasks 1–12, then Labs 1 and 2.', 'Lecciones 4–5: integridad y 1:1, 1:N, N:M. Tareas 1–12 del Laboratorio SQL y luego los Laboratorios 1 y 2.', 'Lições 4–5: integridade e 1:1, 1:N, N:M. Tarefas 1–12 do Laboratório SQL e depois os Laboratórios 1 e 2.') },
  { day: 'Day 3', minutes: 60, kind: 'read',
    focus: L('Lessons 6–8: ER in depth, generalisation and specialisation, Chen vs crow\'s foot. Redraw one diagram in both notations.', 'Lecciones 6–8: ER en profundidad, generalización y especialización, Chen vs pata de gallo. Vuelve a dibujar un diagrama en ambas notaciones.', 'Lições 6–8: ER em profundidade, generalização e especialização, Chen vs pé de galinha. Redesenhe um diagrama nas duas notações.') },
  { day: 'Day 4', minutes: 70, kind: 'practice',
    focus: L('Lessons 9–10: the modelling method and mapping. Design Studio scenarios, Lab 3, and Lab 4.', 'Lecciones 9–10: el método de modelado y la transformación. Escenarios del Estudio de diseño, Laboratorio 3 y Laboratorio 4.', 'Lições 9–10: o método de modelagem e a transformação. Cenários do Estúdio de projeto, Laboratório 3 e Laboratório 4.') },
  { day: 'Day 5', minutes: 55, kind: 'practice',
    focus: L('Lessons 11–12: MySQL vs PostgreSQL types, DDL, and DML. SQL Lab tasks 13–16.', 'Lecciones 11–12: tipos de MySQL vs PostgreSQL, DDL y DML. Tareas 13–16 del Laboratorio SQL.', 'Lições 11–12: tipos do MySQL vs PostgreSQL, DDL e DML. Tarefas 13–16 do Laboratório SQL.') },
  { day: 'Day 6', minutes: 35, kind: 'review',
    focus: L('Review the flashcards that are due and redo any exercise you missed.', 'Repasa las tarjetas pendientes y rehaz los ejercicios que fallaste.', 'Revise os cartões pendentes e refaça os exercícios que errou.') },
  { day: 'Day 7', minutes: 35, kind: 'quiz',
    focus: L('Take the full quiz, then explain every wrong answer in one sentence.', 'Haz el cuestionario completo y explica cada respuesta incorrecta en una frase.', 'Faça o questionário completo e explique cada resposta errada em uma frase.') },
];
