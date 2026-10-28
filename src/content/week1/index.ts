import type { Lesson, Localized, Question } from '../types';
import type { WeekContent as WeekContentType } from '../weekContent';
import { week1Lessons } from './lessons';
import { week1Exercises, week1Analogies } from './exercises';
import { week1Flashcards } from './flashcards';
import { week1Questions } from './questions';
import { week1Labs } from './labs';
import { week1Plan } from './plan';
import { week1Resources } from './resources';
import { week1Activities } from './activities';
import { week1Stories } from './stories';
import { lessonBodyEs, questionEs } from './translations';

/** Adds Spanish paragraphs to each lesson body and merges exercises and analogies. */
function localiseLesson(l: Lesson): Lesson {
  const bodyEs = lessonBodyEs[l.id];
  return {
    ...l,
    body: bodyEs ? l.body.map((p, i) => ({ en: p.en, es: bodyEs[i] })) : l.body,
    exercises: week1Exercises[l.id] ?? l.exercises ?? [],
    analogy: week1Analogies[l.id] ?? l.analogy,
  };
}

/** Fills Spanish fields for each question; English stays the source of truth. */
function localiseQuestion(q: Question): Question {
  const o = questionEs[q.id];
  if (!o) return q;
  const withEs = (base: Localized, es?: string): Localized => (es ? { en: base.en, es } : base);
  const merged: Record<string, unknown> = {
    ...q,
    prompt: withEs(q.prompt, o.prompt),
    explanation: withEs(q.explanation, o.explanation),
  };
  if ('options' in q && o.options) {
    merged.options = q.options.map((opt, i) => withEs(opt, o.options?.[i]));
  }
  if ('whyWrong' in q && q.whyWrong && o.whyWrong) {
    merged.whyWrong = q.whyWrong.map((w, i) => withEs(w, o.whyWrong?.[i]));
  }
  if (q.type === 'matching' && o.left && o.right) {
    merged.left = q.left.map((x, i) => withEs(x, o.left?.[i]));
    merged.right = q.right.map((x, i) => withEs(x, o.right?.[i]));
  }
  return merged as unknown as Question;
}

export const week1: WeekContentType = {
  id: 'y1-t1-m3-w1',
  year: 1,
  term: 1,
  module: 3,
  week: 1,
  title: {
    en: 'Introduction to Software Engineering Management',
    es: 'Introducción a la gestión de la ingeniería de software',
  },
  intro: {
    en: 'Software is built by teams, changes constantly, and must be traceable. This week you learn how development is organised as a process, how configuration management keeps the product under control, and how Git and GitHub let people work on the same code without losing each other\'s changes.',
    es: 'El software lo construyen equipos, cambia constantemente y debe ser trazable. Esta semana aprendes cómo se organiza el desarrollo como proceso, cómo la gestión de configuración mantiene el producto bajo control y cómo Git y GitHub permiten trabajar sobre el mismo código sin perder cambios.',
  },
  objectives: [
    { en: 'Explain the difference between programming and software engineering.', es: 'Explicar la diferencia entre programar e ingeniería de software.' },
    { en: 'Describe a software development lifecycle and two process models.', es: 'Describir un ciclo de vida de desarrollo y dos modelos de proceso.' },
    { en: 'Write checkable requirements and tell functional from non-functional ones.', es: 'Escribir requisitos comprobables y distinguir los funcionales de los no funcionales.' },
    { en: 'Read and sketch basic models: context diagram, ER model, state machine.', es: 'Leer y bosquejar modelos básicos: diagrama de contexto, modelo ER y máquina de estados.' },
    { en: 'Define software configuration management and its main activities.', es: 'Definir la gestión de configuración del software y sus actividades principales.' },
    { en: 'Use basic Git commands to initialise, stage, commit, branch, and merge.', es: 'Usar comandos básicos de Git para inicializar, preparar, confirmar, crear ramas y fusionar.' },
    { en: 'Connect a local repository to a remote and describe a pull request workflow.', es: 'Conectar un repositorio local con un remoto y describir un flujo con solicitudes de cambio.' },
  ],
  prerequisites: [
    { en: 'Comfortable using a terminal or command prompt.', es: 'Cómodo usando una terminal o consola de comandos.' },
    { en: 'A free GitHub account (optional, needed only for the remote steps).', es: 'Una cuenta gratuita de GitHub (opcional; solo para los pasos con remoto).' },
  ],
  keyConcepts: [
    { en: 'Software process', es: 'Proceso de software' },
    { en: 'Lifecycle and baseline', es: 'Ciclo de vida y línea base' },
    { en: 'Functional vs non-functional', es: 'Funcional frente a no funcional' },
    { en: 'Models and UML', es: 'Modelos y UML' },
    { en: 'Configuration item', es: 'Elemento de configuración' },
    { en: 'Repository, commit, branch', es: 'Repositorio, commit, rama' },
    { en: 'Staging area', es: 'Área de preparación' },
    { en: 'Remote and pull request', es: 'Remoto y solicitud de cambio' },
  ],
  estimatedMinutes: 600,
  sequence: [
    { en: 'Read lessons 1–4 for the engineering context: process, requirements, and models.', es: 'Lee las lecciones 1–4 para el contexto de ingeniería: proceso, requisitos y modelos.' },
    { en: 'Read lessons 5–8, practise in the Git Playground, and do Labs 1–3 in order.', es: 'Lee las lecciones 5–8, practica en el simulador de Git y haz los Laboratorios 1–3 en orden.' },
    { en: 'Connect a remote with Lab 4, then take the quiz.', es: 'Conecta un remoto con el Laboratorio 4 y luego haz el cuestionario.' },
    { en: 'Review cards until each reaches the Review or Mastered state.', es: 'Repasa las tarjetas hasta que cada una llegue a Repaso o Dominada.' },
  ],
  outcomes: [
    { en: 'You can explain why process and configuration control reduce project risk.', es: 'Puedes explicar por qué el control de procesos y configuración reduce el riesgo.' },
    { en: 'You can take a folder from nothing to a tracked, branched, and merged Git repository.', es: 'Puedes pasar una carpeta de cero a un repositorio Git con ramas y fusiones.' },
    { en: 'You can resolve a simple conflict and describe a review workflow.', es: 'Puedes resolver un conflicto simple y describir un flujo de revisión.' },
  ],
  checklist: [
    { en: 'Read all eight lessons and watch the three mini stories', es: 'Leer las ocho lecciones y ver las tres mini historias' },
    { en: 'Complete the lesson checks', es: 'Completar las comprobaciones de cada lección' },
    { en: 'Complete Labs 1–4 in the sandbox', es: 'Completar los Laboratorios 1–4 en la carpeta de prueba' },
    { en: 'Review every flashcard once', es: 'Repasar cada tarjeta una vez' },
    { en: 'Complete the five Git Playground missions', es: 'Completar las cinco misiones del simulador de Git' },
    { en: 'Score at least 80% on the quiz', es: 'Obtener al menos 80% en el cuestionario' },
  ],
  commonMistakes: [
    { mistake: { en: 'Confusing Git with GitHub.', es: 'Confundir Git con GitHub.' }, fix: { en: 'Git is the tool on your machine; GitHub hosts repositories.', es: 'Git es la herramienta de tu equipo; GitHub aloja repositorios.' } },
    { mistake: { en: 'Forgetting to read git status before committing.', es: 'Olvidar leer git status antes de hacer commit.' }, fix: { en: 'Make git status a habit before and after every commit.', es: 'Haz de git status un hábito antes y después de cada commit.' } },
  ],
  lessons: week1Lessons.map(localiseLesson),
  flashcards: week1Flashcards,
  questions: week1Questions.map(localiseQuestion),
  labs: week1Labs,
  plan: week1Plan,
  resources: week1Resources,
  activities: week1Activities,
  stories: week1Stories,
  // Files live in public/downloads/<locale>/ and are generated by `npm run docs`.
  documents: [
    { title: { en: 'Study guide', es: 'Guía de estudio' }, file: 'study-guide.pdf', kind: 'pdf' },
    { title: { en: 'Study guide (editable)', es: 'Guía de estudio (editable)' }, file: 'study-guide.docx', kind: 'docx' },
    { title: { en: 'Slides', es: 'Diapositivas' }, file: 'slides.pptx', kind: 'pptx' },
    { title: { en: 'Git cheat sheet', es: 'Hoja de referencia de Git' }, file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: { en: 'Lab workbook', es: 'Cuaderno de laboratorio' }, file: 'lab-workbook.pdf', kind: 'pdf' },
  ],
};

