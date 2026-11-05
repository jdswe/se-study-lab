import type { StudyPlanDay } from '../types';

/** A one-week plan for Databases 1, Week 1. */
export const dbWeek1Plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: { en: 'Lessons 1–2: from files to databases; data and information. Watch the Elena story.', es: 'Lecciones 1–2: de los archivos a las bases de datos; dato e información. Mira la historia de Elena.' }, minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: { en: 'Lessons 3–4: what a DBMS does and who uses it. Do their activities.', es: 'Lecciones 3–4: qué hace un SGBD y quién lo usa. Haz sus actividades.' }, minutes: 40, kind: 'read' },
  { day: 'Day 3', focus: { en: 'Lessons 5–6: relational tables, keys, and relationships. Design Studio: Willow Lane Bakery.', es: 'Lecciones 5–6: tablas relacionales, claves y relaciones. Estudio de diseño: panadería Willow Lane.' }, minutes: 65, kind: 'practice' },
  { day: 'Day 4', focus: { en: 'Lesson 7: integrity and transactions. SQL Lab 3.', es: 'Lección 7: integridad y transacciones. Laboratorio SQL 3.' }, minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: { en: 'Lessons 8–9: architecture and first SQL. SQL Labs 1 and 2.', es: 'Lecciones 8–9: arquitectura y primeras consultas SQL. Laboratorios SQL 1 y 2.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: { en: 'Design the makerspace (Lab 4), compare MySQL and PostgreSQL, and install one local server; review due cards.', es: 'Diseña el taller maker (Laboratorio 4), compara MySQL y PostgreSQL e instala un servidor local; repasa las tarjetas pendientes.', pt: 'Projete a oficina maker (Laboratório 4), compare MySQL e PostgreSQL e instale um servidor local; revise os cartões pendentes.' }, minutes: 70, kind: 'practice' },
  { day: 'Day 7', focus: { en: 'Full quiz, then review every missed question.', es: 'Cuestionario completo y revisión de cada pregunta fallada.' }, minutes: 45, kind: 'quiz' },
];
