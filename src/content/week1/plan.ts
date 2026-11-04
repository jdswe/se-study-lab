import type { StudyPlanDay } from '../types';

/** A one-week plan. Each day is a suggestion; the planner lets you move or skip days. */
export const week1Plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: { en: 'Lessons 1–2: software engineering; lifecycle and process models. Watch the lifecycle story.', es: 'Lecciones 1–2: ingeniería de software; ciclo de vida y modelos de proceso. Mira la historia del ciclo de vida.' }, minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: { en: 'Lessons 3–4: configuration management and version control. Do Lab 1.', es: 'Lecciones 3–4: gestión de configuración y control de versiones. Haz el Laboratorio 1.' }, minutes: 55, kind: 'read' },
  { day: 'Day 3', focus: { en: 'Lessons 5–6: Git fundamentals and working with a remote. Complete the Git Playground missions.', es: 'Lecciones 5–6: fundamentos de Git y trabajo con un remoto. Completa las misiones del simulador de Git.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 4', focus: { en: 'Labs 2 and 3: branches, merges, and conflicts in a sandbox.', es: 'Laboratorios 2 y 3: ramas, fusiones y conflictos en una carpeta de prueba.' }, minutes: 55, kind: 'practice' },
  { day: 'Day 5', focus: { en: 'Lab 4: connect a remote and rehearse the review workflow.', es: 'Laboratorio 4: conecta un remoto y practica el flujo de revisión.' }, minutes: 60, kind: 'practice' },
  { day: 'Day 6', focus: { en: 'Review flashcards that are due and revisit any Git step that felt unclear.', es: 'Repasa las tarjetas pendientes y vuelve a practicar el paso de Git que no haya quedado claro.' }, minutes: 55, kind: 'review' },
  { day: 'Day 7', focus: { en: 'Full quiz, then review every missed question', es: 'Cuestionario completo y revisión de cada pregunta fallada' }, minutes: 45, kind: 'quiz' },
];
