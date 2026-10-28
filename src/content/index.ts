import type { WeekContent } from './weekContent';
import type { SubjectMeta } from './types';
import { week1 } from './week1';
import { dbWeek1 } from './db1-week1';
import { addPortuguese } from './localize';

/**
 * Registry of all published weeks. To add a week, create its folder with the
 * same shape as week1 and register it here.
 */
export const weeks: WeekContent[] = [week1, dbWeek1].map(addPortuguese);

export function findWeek(id: string): WeekContent | undefined {
  return weeks.find((w) => w.id === id);
}

/** Published weeks of a subject, in week order. */
export function weeksOf(subject: SubjectMeta): WeekContent[] {
  return subject.weeks
    .map((w) => findWeek(w.id))
    .filter((w): w is WeekContent => Boolean(w))
    .sort((a, b) => a.week - b.week);
}
