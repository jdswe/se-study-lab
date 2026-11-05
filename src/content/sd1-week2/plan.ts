import type { Localized, StudyPlanDay } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** A one-week plan for Software Development 1, Week 2. */
export const sd1Week2Plan: StudyPlanDay[] = [
  { day: 'Day 1', kind: 'read', minutes: 45,
    focus: L('Lessons 1–2: what a requirement is, problems versus causes, functional and non-functional requirements. Do the classify activities.', 'Lecciones 1–2: qué es un requisito, problemas frente a causas, requisitos funcionales y no funcionales. Haz las actividades de clasificar.', 'Lições 1–2: o que é um requisito, problemas versus causas, requisitos funcionais e não funcionais. Faça as atividades de classificar.') },
  { day: 'Day 2', kind: 'read', minutes: 45,
    focus: L('Lessons 3–4: the process, stakeholders, elicitation techniques, and business policies.', 'Lecciones 3–4: el proceso, los interesados, las técnicas de elicitación y las políticas de negocio.', 'Lições 3–4: o processo, os stakeholders, as técnicas de elicitação e as políticas de negócio.') },
  { day: 'Day 3', kind: 'practice', minutes: 50,
    focus: L('Lab 1 (library). Then Lessons 5–6: specification, quality attributes, validation, change, and traceability.', 'Laboratorio 1 (biblioteca). Luego Lecciones 5–6: especificación, atributos de calidad, validación, cambio y rastreabilidad.', 'Laboratório 1 (biblioteca). Depois Lições 5–6: especificação, atributos de qualidade, validação, mudança e rastreabilidade.') },
  { day: 'Day 4', kind: 'practice', minutes: 45,
    focus: L('Lab 2: review and fix a weak specification, and build a traceability matrix.', 'Laboratorio 2: revisar y corregir una especificación débil y construir una matriz de rastreabilidad.', 'Laboratório 2: revisar e corrigir uma especificação fraca e montar uma matriz de rastreabilidade.') },
  { day: 'Day 5', kind: 'read', minutes: 50,
    focus: L('Lessons 7–8: user stories, INVEST, epics, MoSCoW, acceptance criteria, and splitting.', 'Lecciones 7–8: historias de usuario, INVEST, épicas, MoSCoW, criterios de aceptación y división.', 'Lições 7–8: histórias de usuário, INVEST, épicos, MoSCoW, critérios de aceite e divisão.') },
  { day: 'Day 6', kind: 'practice', minutes: 50,
    focus: L('Lab 3: a gym backlog with stories, Given–When–Then scenarios, and MoSCoW. Then review the flashcards that are due.', 'Laboratorio 3: un backlog de gimnasio con historias, escenarios Dado–Cuando–Entonces y MoSCoW. Luego repasa las tarjetas pendientes.', 'Laboratório 3: um backlog de academia com histórias, cenários Dado–Quando–Então e MoSCoW. Depois revise os cartões pendentes.') },
  { day: 'Day 7', kind: 'quiz', minutes: 30,
    focus: L('Full quiz. For each miss, reread the lesson it points to and redo one of its exercises.', 'Cuestionario completo. Por cada error, relee la lección a la que apunta y rehaz uno de sus ejercicios.', 'Questionário completo. Para cada erro, releia a lição indicada e refaça um dos exercícios dela.') },
];
