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
