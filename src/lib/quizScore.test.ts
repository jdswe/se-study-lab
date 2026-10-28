import { describe, expect, it } from 'vitest';
import { gradeQuestion, summarise, weakLessons } from './quizScore';
import { week1Questions } from '../content/week1/questions';
import type { Question } from '../content/types';
import { isChoice } from './grading';

const fill: Question = {
  id: 'f', type: 'fill-blank', lessonId: 'l', prompt: { en: '' }, explanation: { en: '' },
  accepted: ['staging', 'index'],
};
const shortQ: Question = {
  id: 's', type: 'short-answer', lessonId: 'l', prompt: { en: '' }, explanation: { en: '' },
  accepted: ['fetch|download', 'merge|integrat'],
};
const match: Question = {
  id: 'm', type: 'matching', lessonId: 'l', prompt: { en: '' }, explanation: { en: '' },
  left: [{ en: 'a' }, { en: 'b' }], right: [{ en: '1' }, { en: '2' }], answer: [1, 0],
};

describe('gradeQuestion', () => {
  it('treats unanswered as incorrect', () => {
    expect(gradeQuestion(fill, null)).toBe(false);
    expect(gradeQuestion(fill, '')).toBe(false);
  });

  it('grades choice questions by index', () => {
    const choice = week1Questions.find((q) => q.type === 'multiple-choice')!;
    expect(isChoice(choice) && gradeQuestion(choice, choice.answer)).toBe(true);
    expect(gradeQuestion(choice, 2)).toBe(false);
  });

  it('ignores case, spacing, and accents for fill-in answers', () => {
    expect(gradeQuestion(fill, '  STAGING ')).toBe(true);
    expect(gradeQuestion(fill, 'Index')).toBe(true);
    expect(gradeQuestion(fill, 'commit')).toBe(false);
  });

  it('requires every keyword group in a short answer', () => {
    expect(gradeQuestion(shortQ, 'fetch downloads; pull also merges')).toBe(true);
    expect(gradeQuestion(shortQ, 'fetch downloads only')).toBe(false);
  });

  it('requires an exact matching permutation', () => {
    expect(gradeQuestion(match, [1, 0])).toBe(true);
    expect(gradeQuestion(match, [0, 1])).toBe(false);
    expect(gradeQuestion(match, [1])).toBe(false);
  });
});

describe('summarise and weakLessons', () => {
  it('scores all responses and lists misses', () => {
    const result = summarise([fill, shortQ], { f: 'staging' });
    expect(result.score).toBe(1);
    expect(result.total).toBe(2);
    expect(result.missed).toEqual(['s']);
  });

  it('ranks lessons by number of misses', () => {
    const questions = [
      { ...fill, id: 'a', lessonId: 'x' },
      { ...fill, id: 'b', lessonId: 'y' },
      { ...fill, id: 'c', lessonId: 'y' },
    ];
    expect(weakLessons(questions, ['a', 'b', 'c'])).toEqual([
      { lessonId: 'y', count: 2 },
      { lessonId: 'x', count: 1 },
    ]);
  });
});
