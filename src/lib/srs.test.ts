import { describe, expect, it } from 'vitest';
import { isDue, newCardProgress, reviewCard } from './srs';

const DAY = 24 * 60 * 60 * 1000;
const t0 = new Date('2026-01-01T12:00:00Z');

describe('reviewCard', () => {
  it('shows a failed card again soon and does not advance the interval', () => {
    const next = reviewCard(newCardProgress(), 'again', t0);
    expect(next.state).toBe('learning');
    expect(next.intervalDays).toBe(0);
    expect(new Date(next.due).getTime() - t0.getTime()).toBeLessThan(DAY);
    expect(next.incorrect).toBe(1);
  });

  it('schedules a first good review one day later', () => {
    const next = reviewCard(newCardProgress(), 'good', t0);
    expect(next.intervalDays).toBe(1);
    expect(next.reps).toBe(1);
    expect(next.correct).toBe(1);
  });

  it('grows intervals across repeated successful reviews', () => {
    let p = newCardProgress();
    const intervals: number[] = [];
    for (let i = 0; i < 5; i++) {
      p = reviewCard(p, 'good', t0);
      intervals.push(p.intervalDays);
    }
    for (let i = 1; i < intervals.length; i++) {
      expect(intervals[i]).toBeGreaterThan(intervals[i - 1]);
    }
  });

  it('never lets ease drop below the minimum', () => {
    let p = newCardProgress();
    for (let i = 0; i < 20; i++) p = reviewCard(p, 'again', t0);
    expect(p.ease).toBeGreaterThanOrEqual(1.3);
  });

  it('marks a card mastered once its interval reaches three weeks', () => {
    let p = newCardProgress();
    for (let i = 0; i < 6; i++) p = reviewCard(p, 'easy', t0);
    expect(p.state).toBe('mastered');
  });
});

describe('isDue', () => {
  it('treats new cards as due', () => {
    expect(isDue(undefined, t0)).toBe(true);
    expect(isDue(newCardProgress(), t0)).toBe(true);
  });

  it('is false until the due time passes', () => {
    const p = reviewCard(newCardProgress(), 'good', t0);
    expect(isDue(p, t0)).toBe(false);
    expect(isDue(p, new Date(t0.getTime() + 2 * DAY))).toBe(true);
  });
});
