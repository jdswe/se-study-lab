import { useEffect, useMemo, useState } from 'react';
import type { Flashcard } from '../content/types';
import { useI18n } from '../i18n';
import { updateState, useProgress, touchStudyDay } from '../lib/store';
import { isDue, reviewCard, type Rating } from '../lib/srs';

export type DeckFilter = 'all' | 'due' | 'weak';

/**
 * A spaced-repetition session over the given cards. Keyboard: Space or Enter
 * reveals, then 1–4 rate (again, hard, good, easy).
 */
export function Deck({ cards, initialFilter = 'all' }: { cards: Flashcard[]; initialFilter?: DeckFilter }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [filter, setFilter] = useState<DeckFilter>(initialFilter);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [session, setSession] = useState({ correct: 0, missed: 0 });

  const now = useMemo(() => new Date(), [progress.cards]);

  const queue = useMemo(() => {
    const filtered = cards.filter((c) => {
      const p = progress.cards[c.id];
      if (filter === 'due') return isDue(p, now);
      if (filter === 'weak') return p?.state === 'learning' || (p ? p.incorrect > p.correct : false);
      return true;
    });
    // Due and new cards first, then the rest in declared order.
    return [...filtered].sort((a, b) => Number(isDue(progress.cards[b.id], now)) - Number(isDue(progress.cards[a.id], now)));
  }, [cards, filter, progress.cards, now]);

  const current = queue[index];
  const total = queue.length;

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [filter, cards]);

  function rate(rating: Rating) {
    if (!current) return;
    updateState((s) => {
      const prev = s.cards[current.id];
      const base = prev ?? { ease: 2.5, intervalDays: 0, due: '', reps: 0, correct: 0, incorrect: 0, state: 'new' as const };
      const next = reviewCard(base, rating, new Date());
      return touchStudyDay({ ...s, cards: { ...s.cards, [current.id]: next } }, new Date());
    });
    const good = rating === 'good' || rating === 'easy';
    setSession((v) => ({ correct: v.correct + (good ? 1 : 0), missed: v.missed + (good ? 0 : 1) }));
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!current || (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName))) return;
      if (!revealed && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed) {
        const map: Record<string, Rating> = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy' };
        const r = map[e.key];
        if (r) rate(r);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // rate depends on current; re-binding on each card keeps keys in sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, revealed]);

  const filters: { value: DeckFilter; label: string }[] = [
    { value: 'all', label: t('flashcards.filterAll') },
    { value: 'due', label: t('flashcards.filterDue') },
    { value: 'weak', label: t('flashcards.filterWeak') },
  ];

  const dueNow = cards.filter((c) => isDue(progress.cards[c.id], now)).length;

  return (
    <section aria-label={t('flashcards.title')} className="deck">
      <div className="toolbar" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div className="chips" role="group" aria-label="Filter">
          {filters.map((f) => (
            <button key={f.value} type="button" className="chip" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <span className="badge">{t('flashcards.dueToday', { n: dueNow })}</span>
      </div>

      {!current ? (
        <div className="empty" style={{ width: '100%' }}>
          <p>{t('flashcards.finished')}</p>
          <p className="faint">
            {t('flashcards.correctCount', { n: session.correct })} · {t('flashcards.incorrectCount', { n: session.missed })}
          </p>
          <button type="button" className="btn" onClick={() => { setIndex(0); setSession({ correct: 0, missed: 0 }); }}>
            {t('common.reset')}
          </button>
        </div>
      ) : (
        <>
          <p className="faint" aria-live="polite">{t('flashcards.session', { i: index + 1, n: total })}</p>
          <div className={`flashcard ${revealed ? 'is-flipped' : ''}`}>
            <div className="flashcard-inner">
              <div className="face" aria-hidden={revealed}>
                <span className="badge">{current.kind}</span>
                <p>{pick(current.front).text}</p>
                {!revealed && (
                  <button type="button" className="btn btn-primary" onClick={() => setRevealed(true)}>
                    {t('flashcards.reveal')}
                  </button>
                )}
              </div>
              <div className="face face-back" aria-hidden={!revealed}>
                <p>{pick(current.back).text}</p>
              </div>
            </div>
          </div>
          {revealed && (
            <div className="rating" role="group" aria-label="Self-assessment">
              <button type="button" className="btn btn-bad" onClick={() => rate('again')}>{t('flashcards.again')} · 1</button>
              <button type="button" className="btn" onClick={() => rate('hard')}>{t('flashcards.hard')} · 2</button>
              <button type="button" className="btn btn-good" onClick={() => rate('good')}>{t('flashcards.good')} · 3</button>
              <button type="button" className="btn btn-primary" onClick={() => rate('easy')}>{t('flashcards.easy')} · 4</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
