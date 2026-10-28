import type { WeekContent } from '../content/weekContent';
import type { ProgressState } from './store';
import { currentStreak } from './store';
import { isDue } from './srs';
import { weakLessons } from './quizScore';

export interface LessonStatus {
  lessonId: string;
  title: string;
  done: boolean;
  mastered: boolean;
  needsReview: boolean;
}

/** Derives per-lesson state from flashcards, quiz misses, and lesson completion. */
export function lessonStatuses(week: WeekContent, s: ProgressState): LessonStatus[] {
  const weak = new Set(
    weakLessons(week.questions, Object.values(s.missed).flat()).map((w) => w.lessonId),
  );
  return week.lessons.map((lesson) => {
    const cards = week.flashcards.filter((c) => c.lessonId === lesson.id);
    const cardStates = cards.map((c) => s.cards[c.id]?.state ?? 'new');
    const mastered = cards.length > 0 && cardStates.every((st) => st === 'mastered' || st === 'review');
    const needsReview = weak.has(lesson.id) || cardStates.includes('learning');
    return {
      lessonId: lesson.id,
      title: lesson.title.en,
      done: Boolean(s.lessonsDone[lesson.id]),
      mastered,
      needsReview,
    };
  });
}

export function dueCount(week: WeekContent, s: ProgressState, now: Date): number {
  return week.flashcards.filter((c) => isDue(s.cards[c.id], now)).length;
}

export function bestQuiz(s: ProgressState, weekId: string): { score: number; total: number } | undefined {
  const a = s.quizzes[weekId];
  return a ? { score: a.score, total: a.total } : undefined;
}

export function streakOf(s: ProgressState, now: Date): number {
  return currentStreak(s.studyDays, now);
}

/** Lessons done and total across a set of weeks (a subject, a module, or a term). */
export function progressOf(scope: WeekContent[], s: ProgressState) {
  const total = scope.reduce((n, w) => n + w.lessons.length, 0);
  const done = scope.reduce((n, w) => n + w.lessons.filter((l) => s.lessonsDone[l.id]).length, 0);
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
