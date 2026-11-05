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
import { histWeek1 } from './hist-week1';
import { histWeek2 } from './hist-week2';
import { histWeek3 } from './hist-week3';
import { histWeek4 } from './hist-week4';
import { histWeek5 } from './hist-week5';
import { histWeek6 } from './hist-week6';
import { histWeek7 } from './hist-week7';
import { histWeek8 } from './hist-week8';
import { prog1Week1 } from './prog1-week1';
import { prog1Week2 } from './prog1-week2';
import { prog1Week3 } from './prog1-week3';
import { prog1Week4 } from './prog1-week4';
import { prog1Week5 } from './prog1-week5';
import { prog1Week6 } from './prog1-week6';
import { os1Week1 } from './os1-week1';
import { os1Week2 } from './os1-week2';
import { os1Week3 } from './os1-week3';
import { os1Week4 } from './os1-week4';
import { os1Week5 } from './os1-week5';
import { os1Week6 } from './os1-week6';
import { addPortuguese } from './localize';

/**
 * Registry of all published weeks. To add a week, create its folder with the
 * same shape as week1 and register it here.
 */
export const weeks: WeekContent[] = [] = [week1, sd1Week2, dbWeek1, dbWeek2, calcWeek1, calcWeek2, logicWeek1, logicWeek2, logicWeek3, logicWeek4, logicWeek5, logicWeek6, logicWeek7, logicWeek8, histWeek1, histWeek2, histWeek3, histWeek4, histWeek5, histWeek6, histWeek7, histWeek8, prog1Week1, prog1Week2, prog1Week3, prog1Week4, prog1Week5, prog1Week6, os1Week1, os1Week2, os1Week3, os1Week4, os1Week5, os1Week6].map(addPortuguese);

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
