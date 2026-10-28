import { describe, expect, it } from 'vitest';
import { weeks } from './index';
import { placeOfWeek, terms } from './curriculum';

/**
 * Content integrity checks. These fail loudly when a lesson, card, question,
 * or lab is malformed, so new weeks cannot ship broken references.
 */
describe('week content integrity', () => {
  for (const week of weeks) {
    describe(week.id, () => {
      const lessonIds = new Set(week.lessons.map((l) => l.id));

      it('has unique ids for lessons, cards, questions, labs, and steps', () => {
        const ids = [
          ...week.lessons.map((l) => l.id),
          ...week.flashcards.map((c) => c.id),
          ...week.questions.map((q) => q.id),
          ...week.labs.map((l) => l.id),
          ...week.labs.flatMap((l) => l.steps.map((s) => s.id)),
        ];
        expect(new Set(ids).size).toBe(ids.length);
      });

      it('points every card and question at an existing lesson', () => {
        for (const c of week.flashcards) expect(lessonIds.has(c.lessonId)).toBe(true);
        for (const q of week.questions) expect(lessonIds.has(q.lessonId)).toBe(true);
      });

      it('keeps choice answers inside the option range', () => {
        for (const q of week.questions) {
          if ('options' in q) {
            expect(q.answer).toBeGreaterThanOrEqual(0);
            expect(q.answer).toBeLessThan(q.options.length);
          }
          if (q.type === 'matching') {
            expect(q.answer.length).toBe(q.left.length);
            expect(q.answer.every((i) => i >= 0 && i < q.right.length)).toBe(true);
          }
        }
      });

      it('gives every question an explanation and every lesson a takeaway', () => {
        for (const q of week.questions) expect(q.explanation.en.length).toBeGreaterThan(0);
        for (const l of week.lessons) expect(l.takeaways.length).toBeGreaterThan(0);
      });

      it('has a check-in question whose answer is in range', () => {
        for (const l of week.lessons) {
          if (l.check) expect(l.check.answer).toBeLessThan(l.check.options.length);
        }
      });
    });
  }
});

describe('curriculum', () => {
  it('has eight terms with three modules each', () => {
    expect(terms).toHaveLength(8);
    for (const t of terms) expect(t.modules).toHaveLength(3);
  });

  it('lists every published week exactly once, and every week has a curriculum entry', () => {
    const published = terms.flatMap((t) =>
      t.modules.flatMap((m) => m.subjects.flatMap((s) => s.weeks.filter((w) => w.status === 'published').map((w) => w.id))),
    );
    expect(new Set(published).size).toBe(published.length);
    expect([...published].sort()).toEqual(weeks.map((w) => w.id).sort());
  });

  it('places each week in the subject its content declares', () => {
    for (const w of weeks) expect(placeOfWeek(w.id)?.subject.slug).toBe(w.subject);
  });
});

describe('Portuguese coverage', () => {
  it('translates every content string', async () => {
    const { missingPortuguese } = await import('./localize');
    const { program } = await import('./curriculum');
    const { sqlTasks } = await import('./db1-week1/sqlTasks');
    const { studioScenarios } = await import('./db1-week1/studio');
    const missing = missingPortuguese([program, terms, weeks, sqlTasks, studioScenarios]);
    expect(missing, `${missing.length} strings without Portuguese, e.g.: ${missing.slice(0, 5).join(' | ')}`).toEqual([]);
  });
});
