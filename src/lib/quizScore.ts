import type { Question } from '../content/types';
import { gradeFillBlank, gradeMatching, gradeShortAnswer, isChoice } from './grading';

/** A learner's response to one question. */
export type Response = number | string | number[] | null;

/** Grades one response. Unanswered (null, empty) is always incorrect. */
export function gradeQuestion(q: Question, response: Response): boolean {
  if (response === null || response === '' ) return false;
  if (isChoice(q)) return typeof response === 'number' && response === q.answer;
  if (q.type === 'matching') {
    return Array.isArray(response) && gradeMatching(response, q.answer);
  }
  if (typeof response !== 'string') return false;
  return q.type === 'short-answer'
    ? gradeShortAnswer(q.accepted, response)
    : gradeFillBlank(q.accepted, response);
}

/** Summarises a set of graded responses. */
export function summarise(questions: Question[], responses: Record<string, Response>) {
  const missed: string[] = [];
  let score = 0;
  for (const q of questions) {
    if (gradeQuestion(q, responses[q.id] ?? null)) score += 1;
    else missed.push(q.id);
  }
  return { score, total: questions.length, missed };
}

/**
 * Groups missed question ids by lesson, so the UI can say which topics need
 * review. Returns lessons sorted by number of misses, most missed first.
 */
export function weakLessons(questions: Question[], missed: string[]): { lessonId: string; count: number }[] {
  const byId = new Map(questions.map((q) => [q.id, q.lessonId]));
  const counts = new Map<string, number>();
  for (const id of missed) {
    const lesson = byId.get(id);
    if (lesson) counts.set(lesson, (counts.get(lesson) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([lessonId, count]) => ({ lessonId, count }))
    .sort((a, b) => b.count - a.count);
}
