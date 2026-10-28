import type { Question } from '../content/types';

/** Normalises free text for comparison: lower case, collapsed spaces, no accents. */
export function normalise(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Fill-blank: exact match against any accepted answer. */
export function gradeFillBlank(accepted: string[], response: string): boolean {
  const r = normalise(response);
  return accepted.some((a) => normalise(a) === r);
}

/**
 * Short-answer: each entry is a "|"-separated keyword group. The response is
 * correct when every group has at least one keyword present.
 */
export function gradeShortAnswer(groups: string[], response: string): boolean {
  const r = normalise(response);
  return groups.every((group) =>
    group.split('|').some((kw) => r.includes(normalise(kw))),
  );
}

/** Matching: every left item must be paired with its correct right item. */
export function gradeMatching(answer: number[], pairs: number[]): boolean {
  return answer.length === pairs.length && answer.every((v, i) => v === pairs[i]);
}

/** Type guard used by the quiz UI to pick the right control. */
export function isChoice(q: Question): q is Extract<Question, { options: unknown }> {
  return 'options' in q;
}
