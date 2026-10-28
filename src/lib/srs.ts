/**
 * A small SM-2-style spaced-repetition scheduler.
 * Pure functions only, so the scheduling rules are easy to test.
 */

export type Rating = 'again' | 'hard' | 'good' | 'easy';

export type ReviewState = 'new' | 'learning' | 'review' | 'mastered';

export interface CardProgress {
  ease: number;
  intervalDays: number;
  /** ISO timestamp for the next review. Empty for new cards. */
  due: string;
  reps: number;
  correct: number;
  incorrect: number;
  state: ReviewState;
}

export const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;

export function newCardProgress(): CardProgress {
  return {
    ease: DEFAULT_EASE,
    intervalDays: 0,
    due: '',
    reps: 0,
    correct: 0,
    incorrect: 0,
    state: 'new',
  };
}

/** Maps a self-assessment button to an SM-2 quality score. */
const QUALITY: Record<Rating, number> = { again: 1, hard: 3, good: 4, easy: 5 };

/**
 * Returns the card's progress after one review.
 * `now` is injected so tests and scheduling stay deterministic.
 */
export function reviewCard(prev: CardProgress, rating: Rating, now: Date): CardProgress {
  const q = QUALITY[rating];
  const passed = q >= 3;
  const ease = Math.max(MIN_EASE, prev.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

  let intervalDays: number;
  if (!passed) {
    intervalDays = 0; // see again today
  } else if (prev.reps === 0) {
    intervalDays = rating === 'easy' ? 4 : 1;
  } else if (prev.reps === 1) {
    intervalDays = rating === 'easy' ? 7 : 3;
  } else {
    const multiplier = rating === 'hard' ? 1.2 : rating === 'easy' ? ease * 1.3 : ease;
    intervalDays = Math.max(1, Math.round(prev.intervalDays * multiplier));
  }

  const dueMs = now.getTime() + (passed ? intervalDays * DAY_MS : 10 * 60 * 1000);
  const reps = passed ? prev.reps + 1 : 0;
  let state: ReviewState;
  if (!passed) state = 'learning';
  else if (intervalDays >= 21) state = 'mastered';
  else state = 'review';

  return {
    ease: Number(ease.toFixed(2)),
    intervalDays,
    due: new Date(dueMs).toISOString(),
    reps,
    correct: prev.correct + (passed ? 1 : 0),
    incorrect: prev.incorrect + (passed ? 0 : 1),
    state,
  };
}

/** A card is due when it has never been reviewed or its due time has passed. */
export function isDue(progress: CardProgress | undefined, now: Date): boolean {
  if (!progress || progress.state === 'new') return true;
  return new Date(progress.due).getTime() <= now.getTime();
}
