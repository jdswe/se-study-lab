import type { StudyPlanDay } from '../types';

/** A one-week plan for Databases 1, Week 1. */
export const dbWeek1Plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: { en: 'Lessons 1–2: from files to databases; data and information. Watch the Elena story.', es: 'Lecciones 1–2: de los archivos a las bases de datos; dato e información. Mira la historia de Elena.' }, minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: { en: 'Lessons 3–4: DBMS responsibilities, tradeoffs, and choosing and installing a system. Do their activities.', es: 'Lecciones 3–4: responsabilidades y ventajas y límites de un SGBD, y cómo elegir e instalar uno. Haz sus actividades.' }, minutes: 55, kind: 'read' },
  { day: 'Day 3', focus: { en: 'Lessons 5–7: database roles, relational tables, keys, and relationships. Design Studio: Willow Lane Bakery.', es: 'Lecciones 5–7: roles de bases de datos, tablas relacionales, claves y relaciones. Estudio de diseño: panadería Willow Lane.' }, minutes: 65, kind: 'practice' },
  { day: 'Day 4', focus: { en: 'Lesson 8: integrity and transactions. SQL Lab 3.', es: 'Lección 8: integridad y transacciones. Laboratorio SQL 3.' }, minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: { en: 'Lessons 9–10: architecture and first SQL. SQL Labs 1 and 2.', es: 'Lecciones 9–10: arquitectura y primeras consultas SQL. Laboratorios SQL 1 y 2.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: { en: 'Lessons 11–13: ER design, mapping, and DDL. Design the library and clinic; review due flashcards.', es: 'Lecciones 11–13: diseño ER, transformación y DDL. Diseña la biblioteca y la clínica; repasa las tarjetas pendientes.' }, minutes: 70, kind: 'review' },
  { day: 'Day 7', focus: { en: 'Full quiz, then review every missed question.', es: 'Cuestionario completo y revisión de cada pregunta fallada.' }, minutes: 45, kind: 'quiz' },
];
