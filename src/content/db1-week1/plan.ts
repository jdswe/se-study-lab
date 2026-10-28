import type { StudyPlanDay } from '../types';

/** A one-week plan for Databases 1, Week 1. */
export const dbWeek1Plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: { en: 'Lessons 1–2: from files to databases; data and information. Watch the "Ana" story.', es: 'Lecciones 1–2: de los archivos a las bases de datos; dato e información. Mira la historia de Ana.' }, minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: { en: 'Lessons 3–4: what a DBMS does and who uses it. Do their activities.', es: 'Lecciones 3–4: qué hace un SGBD y quién lo usa. Haz sus actividades.' }, minutes: 40, kind: 'read' },
  { day: 'Day 3', focus: { en: 'Lessons 5–6: tables, keys, and relationships. Design Studio: campus store.', es: 'Lecciones 5–6: tablas, claves y relaciones. Estudio de diseño: tienda del campus.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 4', focus: { en: 'Lesson 7: integrity and transactions. SQL Lab 3.', es: 'Lección 7: integridad y transacciones. Laboratorio SQL 3.' }, minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: { en: 'Lessons 8–9: architecture and first SQL. SQL Labs 1 and 2.', es: 'Lecciones 8–9: arquitectura y primeras consultas SQL. Laboratorios SQL 1 y 2.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: { en: 'Design the library (Lab 4); review flashcards that are due.', es: 'Diseña la biblioteca (Laboratorio 4); repasa las tarjetas pendientes.' }, minutes: 50, kind: 'review' },
  { day: 'Day 7', focus: { en: 'Full quiz, then review every missed question.', es: 'Cuestionario completo y revisión de cada pregunta fallada.' }, minutes: 45, kind: 'quiz' },
];
