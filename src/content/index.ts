import type { WeekContent } from './weekContent';
import type { SubjectMeta } from './types';
import { week1 } from './week1';
import { dbWeek1 } from './db1-week1';
import { dbWeek2 } from './db1-week2';
import { calcWeek1 } from './calc1-week1';
import { calcWeek2 } from './calc1-week2';
import { sd1Week2 } from './sd1-week2';
import { histWeek1 } from './hist-week1';
import { histWeek2 } from './hist-week2';
import { histWeek3 } from './hist-week3';
import { histWeek4 } from './hist-week4';
import { histWeek5 } from './hist-week5';
import { histWeek6 } from './hist-week6';
import { histWeek7 } from './hist-week7';
import { histWeek8 } from './hist-week8';
import { addPortuguese } from './localize';

/**
 * Registry of all published weeks. To add a week, create its folder with the
 * same shape as week1 and register it here.
 */
export const weeks: WeekContent[] = [week1, sd1Week2, dbWeek1, dbWeek2, calcWeek1, calcWeek2, histWeek1, histWeek2, histWeek3, histWeek4, histWeek5, histWeek6, histWeek7, histWeek8].map(addPortuguese);

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
