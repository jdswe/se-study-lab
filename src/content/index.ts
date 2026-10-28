import type { WeekContent } from './weekContent';
import { week1 } from './week1';

/**
 * Registry of all published weeks. To add a week, create its folder with the
 * same shape as week1 and register it here.
 */
export const weeks: WeekContent[] = [week1];

export function findWeek(id: string): WeekContent | undefined {
  return weeks.find((w) => w.id === id);
}
