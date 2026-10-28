import type { StudyPlanDay } from '../types';

/** A one-week plan. Each day is a suggestion; the planner lets you move or skip days. */
export const week1Plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: { en: 'Lessons 1–2: software engineering; lifecycle and process models. Watch the lifecycle story.', es: 'Lecciones 1–2: ingeniería de software; ciclo de vida y modelos de proceso. Mira la historia del ciclo de vida.' }, minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: { en: 'Lessons 3–4: requirements engineering and modelling. Do their activities.', es: 'Lecciones 3–4: ingeniería de requisitos y modelado. Haz sus actividades.' }, minutes: 55, kind: 'read' },
  { day: 'Day 3', focus: { en: 'Lessons 5–6: configuration management and version control. Lab 1.', es: 'Lecciones 5–6: gestión de configuración y control de versiones. Laboratorio 1.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 4', focus: { en: 'Lesson 7: Git fundamentals. Complete the Git Playground missions.', es: 'Lección 7: fundamentos de Git. Completa las misiones del simulador de Git.' }, minutes: 55, kind: 'practice' },
  { day: 'Day 5', focus: { en: 'Labs 2 and 3: branches, merges, and conflicts in a sandbox', es: 'Laboratorios 2 y 3: ramas, fusiones y conflictos en una carpeta de prueba' }, minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: { en: 'Lesson 8 and Lab 4; review flashcards that are due', es: 'Lección 8 y Laboratorio 4; repasa las tarjetas pendientes' }, minutes: 55, kind: 'review' },
  { day: 'Day 7', focus: { en: 'Full quiz, then review every missed question', es: 'Cuestionario completo y revisión de cada pregunta fallada' }, minutes: 45, kind: 'quiz' },
];
