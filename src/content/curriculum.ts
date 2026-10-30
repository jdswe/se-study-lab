import type { Localized, ModuleMeta, SubjectMeta, TermMeta } from './types';
import { addPortuguese } from './localize';

/** The program shown on the home page. */
export const program: { title: Localized; tagline: Localized } = {
  title: { en: 'Software Engineering', es: 'Ingeniería de Software' },
  tagline: {
    en: 'Eight terms, three modules each. Every subject has its own lessons, practice, and tools.',
    es: 'Ocho términos, tres módulos en cada uno. Cada materia tiene sus propias lecciones, práctica y herramientas.',
  },
};

/** Muted hues, one per term, so each term has its own colour. */
const TERM_HUES = [186, 18, 262, 145, 38, 215, 330, 95];

const emptyModule = (number: number): ModuleMeta => ({ number, subjects: [] });

/**
 * Term → Module → Subject → Week. Terms are numbered 1–8 across four years.
 * To add a subject, append it to its module here and register its weeks in index.ts.
 */
export const terms: TermMeta[] = TERM_HUES.map((hue, i) => ({
  number: i + 1,
  year: Math.floor(i / 2) + 1,
  hue,
  modules: [emptyModule(1), emptyModule(2), emptyModule(3)],
}));

terms[0].modules[2].subjects = [
  {
    slug: 'software-development-1',
    title: { en: 'Software Development 1', es: 'Desarrollo de Software 1' },
    theme: 'version-control',
    plannedWeeks: 8,
    tools: ['git-playground'],
    weeks: [
      {
        id: 'y1-t1-m3-w1',
        number: 1,
        title: { en: 'Introduction to Software Engineering Management', es: 'Introducción a la gestión de la ingeniería de software' },
        status: 'published',
      },
      { id: 'y1-t1-m3-w2', number: 2, status: 'planned', title: { en: 'Requirements engineering', es: 'Ingeniería de requerimientos', pt: 'Engenharia de requisitos' } },
      { id: 'y1-t1-m3-w3', number: 3, status: 'planned', title: { en: 'Agile methodology', es: 'Metodología ágil', pt: 'Metodologia ágil' } },
      { id: 'y1-t1-m3-w4', number: 4, status: 'planned', title: { en: 'Agile estimation', es: 'Estimación ágil', pt: 'Estimativa ágil' } },
      { id: 'y1-t1-m3-w5', number: 5, status: 'planned', title: { en: 'Use cases', es: 'Casos de uso', pt: 'Casos de uso' } },
      { id: 'y1-t1-m3-w6', number: 6, status: 'planned', title: { en: 'Code review', es: 'Revisión de código', pt: 'Revisão de código' } },
      { id: 'y1-t1-m3-w7', number: 7, status: 'planned', title: { en: 'Software metrics', es: 'Métricas de software', pt: 'Métricas de software' } },
      { id: 'y1-t1-m3-w8', number: 8, status: 'planned', title: { en: 'Final project', es: 'Proyecto final', pt: 'Projeto final' } },
    ],
  },
  {
    slug: 'database-1',
    title: { en: 'Databases 1', es: 'Bases de Datos 1' },
    theme: 'databases',
    plannedWeeks: 8,
    tools: ['design-studio', 'sql-lab'],
    weeks: [
      {
        id: 'y1-t1-m3-db-w1',
        number: 1,
        title: { en: 'Database management systems', es: 'Sistemas de gestión de bases de datos' },
        status: 'published',
      },
      { id: 'y1-t1-m3-db-w2', number: 2, status: 'planned', title: { en: 'The relational model: ER modelling', es: 'El modelo relacional: modelado ER', pt: 'O modelo relacional: modelagem ER' } },
      { id: 'y1-t1-m3-db-w3', number: 3, status: 'planned', title: { en: 'Normalisation', es: 'Normalización', pt: 'Normalização' } },
      { id: 'y1-t1-m3-db-w4', number: 4, status: 'planned', title: { en: 'Basic SQL 1', es: 'SQL básico 1', pt: 'SQL básico 1' } },
      { id: 'y1-t1-m3-db-w5', number: 5, status: 'planned', title: { en: 'Basic SQL 2', es: 'SQL básico 2', pt: 'SQL básico 2' } },
      { id: 'y1-t1-m3-db-w6', number: 6, status: 'planned', title: { en: 'Relational algebra', es: 'Álgebra relacional', pt: 'Álgebra relacional' } },
      { id: 'y1-t1-m3-db-w7', number: 7, status: 'planned', title: { en: 'NoSQL databases', es: 'Bases de datos NoSQL', pt: 'Bancos de dados NoSQL' } },
      { id: 'y1-t1-m3-db-w8', number: 8, status: 'planned', title: { en: 'Final project', es: 'Proyecto final', pt: 'Projeto final' } },
    ],
  },
  {
    slug: 'calculus-1',
    title: { en: 'Calculus 1', es: 'Cálculo 1', pt: 'Cálculo 1' },
    theme: 'math',
    plannedWeeks: 8,
    tools: ['inequality-lab'],
    weeks: [
      {
        id: 'y1-t1-m3-calc-w1',
        number: 1,
        title: { en: 'Introduction and inequalities', es: 'Introducción y desigualdades', pt: 'Introdução e desigualdades' },
        status: 'published',
      },
      { id: 'y1-t1-m3-calc-w2', number: 2, status: 'planned', title: { en: 'Functions and graphs', es: 'Funciones y gráficas', pt: 'Funções e gráficos' } },
      { id: 'y1-t1-m3-calc-w3', number: 3, status: 'planned', title: { en: 'Limits', es: 'Límites', pt: 'Limites' } },
      { id: 'y1-t1-m3-calc-w4', number: 4, status: 'planned', title: { en: 'Derivatives', es: 'Derivadas', pt: 'Derivadas' } },
      { id: 'y1-t1-m3-calc-w5', number: 5, status: 'planned', title: { en: 'Applications of the derivative', es: 'Aplicaciones de la derivada', pt: 'Aplicações da derivada' } },
      { id: 'y1-t1-m3-calc-w6', number: 6, status: 'planned', title: { en: 'The (Riemann) integral', es: 'Integral (de Riemann)', pt: 'Integral (de Riemann)' } },
      { id: 'y1-t1-m3-calc-w7', number: 7, status: 'planned', title: { en: 'Applications of the integral', es: 'Aplicaciones de la integral', pt: 'Aplicações da integral' } },
      { id: 'y1-t1-m3-calc-w8', number: 8, status: 'planned', title: { en: 'General review and wrap-up', es: 'Repaso general y finalización', pt: 'Revisão geral e encerramento' } },
    ],
  },
];

addPortuguese(program);
addPortuguese(terms);

export function findTerm(n: number): TermMeta | undefined {
  return terms.find((t) => t.number === n);
}

export function findModule(term: number, module: number): ModuleMeta | undefined {
  return findTerm(term)?.modules.find((m) => m.number === module);
}

export function findSubject(term: number, module: number, slug: string): SubjectMeta | undefined {
  return findModule(term, module)?.subjects.find((s) => s.slug === slug);
}

export interface SubjectPlace {
  term: TermMeta;
  module: ModuleMeta;
  subject: SubjectMeta;
}

/** Where a week lives in the program, so pages can build breadcrumbs and links. */
export function placeOfWeek(weekId: string): SubjectPlace | undefined {
  for (const term of terms) {
    for (const module of term.modules) {
      for (const subject of module.subjects) {
        if (subject.weeks.some((w) => w.id === weekId)) return { term, module, subject };
      }
    }
  }
  return undefined;
}

export function subjectPath(place: { term: TermMeta; module: ModuleMeta; subject: SubjectMeta }, section?: string): string {
  const base = `/term/${place.term.number}/module/${place.module.number}/${place.subject.slug}`;
  return section ? `${base}/${section}` : base;
}
