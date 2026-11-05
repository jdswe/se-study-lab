import type { WeekContent } from './weekContent';
import type { SubjectMeta } from './types';
import { week1 } from './week1';
import { dbWeek1 } from './db1-week1';
import { dbWeek2 } from './db1-week2';
import { calcWeek1 } from './calc1-week1';
import { calcWeek2 } from './calc1-week2';
import { logicWeek1 } from './logic-week1';
import { logicWeek2 } from './logic-week2';
import { logicWeek3 } from './logic-week3';
import { logicWeek4 } from './logic-week4';
import { logicWeek5 } from './logic-week5';
import { logicWeek6 } from './logic-week6';
import { logicWeek7 } from './logic-week7';
import { logicWeek8 } from './logic-week8';
import { sd1Week2 } from './sd1-week2';
import { addPortuguese } from './localize';

/**
 * Registry of all published weeks. To add a week, create its folder with the
 * same shape as week1 and register it here.
 */
export const weeks: WeekContent[] = [week1, sd1Week2, dbWeek1, dbWeek2, calcWeek1, calcWeek2, logicWeek1, logicWeek2, logicWeek3, logicWeek4, logicWeek5, logicWeek6, logicWeek7, logicWeek8].map(addPortuguese);

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
