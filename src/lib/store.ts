import { useSyncExternalStore } from 'react';
import { type CardProgress } from './srs';
import type { Locale } from '../content/types';

/**
 * Local-only progress persistence. Nothing leaves the browser.
 * Every storage access is wrapped, because private windows, blocked storage,
 * and quota errors must never crash the app.
 */

export interface QuizAttempt {
  score: number;
  total: number;
  at: string;
}

export interface ProgressState {
  version: 1;
  locale: Locale;
  theme: 'system' | 'light' | 'dark';
  /** Turns animations off, in addition to the operating system setting. */
  reduceMotion: boolean;
  /** 'auto' follows the browser time zone; otherwise an ISO country code. */
  country: string;
  lessonsDone: Record<string, true>;
  cards: Record<string, CardProgress>;
  quizzes: Record<string, QuizAttempt>;
  /** Missed question ids per quiz id, used for areas needing improvement. */
  missed: Record<string, string[]>;
  /** Plan day status keyed by `${weekId}:${dayIndex}`. */
  planStatus: Record<string, 'done' | 'skipped'>;
  /** Lab step completion keyed by step id. */
  stepsDone: Record<string, true>;
  /** Study days as YYYY-MM-DD strings, used for the streak. */
  studyDays: string[];
}

const KEY = 'se-study-lab:v1';

export function emptyState(): ProgressState {
  return {
    version: 1,
    locale: 'en',
    theme: 'system',
    reduceMotion: false,
    country: 'auto',
    lessonsDone: {},
    cards: {},
    quizzes: {},
    missed: {},
    planStatus: {},
    stepsDone: {},
    studyDays: [],
  };
}

export function loadState(): ProgressState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (parsed.version !== 1) return emptyState();
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
}

function saveState(state: ProgressState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: progress stays in memory for this session only.
  }
}

let current: ProgressState = loadState();
const listeners = new Set<() => void>();

export function getState(): ProgressState {
  return current;
}

/** Applies a pure update, persists it, and notifies subscribers. */
export function updateState(fn: (s: ProgressState) => ProgressState): void {
  current = fn(current);
  saveState(current);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getState, getState);
}

/** Records today as a study day, so the streak counter can grow. */
export function touchStudyDay(s: ProgressState, now: Date): ProgressState {
  const day = now.toISOString().slice(0, 10);
  return s.studyDays.includes(day) ? s : { ...s, studyDays: [...s.studyDays, day].slice(-400) };
}

/** Consecutive study days ending today or yesterday. */
export function currentStreak(days: string[], now: Date): number {
  const set = new Set(days);
  let streak = 0;
  const cursor = new Date(now);
  if (!set.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}
