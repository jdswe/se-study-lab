import type { Localized, ModuleMeta, TermMeta } from './types';

/** The program shown on the home page. */
export const program: { title: Localized; tagline: Localized } = {
  title: { en: 'Software Engineering', es: 'Ingeniería de Software' },
  tagline: {
    en: 'Eight terms, three modules each. Lessons, practice, and labs for every week.',
    es: 'Ocho términos, tres módulos en cada uno. Lecciones, práctica y laboratorios para cada semana.',
  },
};

/** Muted hues, one per term, so each term has its own colour. */
const TERM_HUES = [186, 18, 262, 145, 38, 215, 330, 95];

function planned(number: number): ModuleMeta {
  return { number, theme: 'default', plannedWeeks: 8, weeks: [] };
}

/**
 * Term → Module → Week. Terms are numbered 1–8 across four years.
 * To add a subject, fill in its module here and register its weeks in index.ts.
 */
export const terms: TermMeta[] = TERM_HUES.map((hue, i) => ({
  number: i + 1,
  year: Math.floor(i / 2) + 1,
  hue,
  modules: [planned(1), planned(2), planned(3)],
}));

terms[0].modules[2] = {
  number: 3,
  subject: { en: 'Software Development 1', es: 'Desarrollo de Software 1' },
  theme: 'version-control',
  plannedWeeks: 8,
  weeks: [
    {
      number: 1,
      slug: 'week-1',
      title: {
        en: 'Introduction to Software Engineering Management',
        es: 'Introducción a la gestión de la ingeniería de software',
      },
      status: 'published',
    },
  ],
};

export function findTerm(n: number): TermMeta | undefined {
  return terms.find((t) => t.number === n);
}

export function findModule(term: number, module: number): ModuleMeta | undefined {
  return findTerm(term)?.modules.find((m) => m.number === module);
}

/** Id convention shared by content and progress records: y1-t1-m3-w1. */
export function weekId(term: TermMeta, module: number, week: number): string {
  return `y${term.year}-t${term.number}-m${module}-w${week}`;
}
