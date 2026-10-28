import type { WeekContent } from '../content/weekContent';
import { useI18n } from '../i18n';
import { ProgressBar } from '../components/Progress';
import { useProgress } from '../lib/store';
import { lessonStatuses, progressOf, streakOf } from '../lib/stats';

/** Progress for one subject: lessons, cards, quizzes, labs, and topics to revisit. */
export function ProgressSection({ weeks }: { weeks: WeekContent[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const lessons = progressOf(weeks, progress);
  const cards = weeks.flatMap((w) => w.flashcards).map((c) => progress.cards[c.id]).filter(Boolean);
  const reviewed = cards.reduce((n, c) => n + c.reps + c.incorrect, 0);
  const quizzes = weeks.filter((w) => progress.quizzes[w.id]).length;
  const labs = weeks.flatMap((w) => w.labs);
  const labsDone = labs.filter((lab) => lab.steps.every((s) => progress.stepsDone[s.id])).length;
  const statuses = weeks.flatMap((w) => lessonStatuses(w, progress).map((s, i) => ({ ...s, title: pick(w.lessons[i].title).text })));
  const mastered = statuses.filter((s) => s.mastered);
  const review = statuses.filter((s) => s.needsReview);

  return (
    <div className="stack" style={{ gap: 24 }}>
      <section className="grid">
        <div className="card stat">
          <strong>{lessons.done}/{lessons.total}</strong>
          <span>{t('progress.lessons')}</span>
          <ProgressBar value={lessons.done} max={lessons.total} label={t('progress.lessons')} />
        </div>
        <div className="card stat"><strong>{reviewed}</strong><span>{t('progress.cards')}</span></div>
        <div className="card stat"><strong>{quizzes}/{weeks.length}</strong><span>{t('progress.quizzes')}</span></div>
        <div className="card stat"><strong>{labsDone}/{labs.length}</strong><span>{t('progress.labs')}</span></div>
        <div className="card stat"><strong>{streakOf(progress, new Date())}</strong><span>{t('progress.streak')}</span></div>
      </section>
      <div className="two-col">
        <section className="card">
          <h2>{t('progress.mastered')}</h2>
          {mastered.length ? <ul>{mastered.map((m) => <li key={m.lessonId}>{m.title}</li>)}</ul> : <p className="faint">—</p>}
        </section>
        <section className="card">
          <h2>{t('progress.needReview')}</h2>
          {review.length ? <ul>{review.map((m) => <li key={m.lessonId}>{m.title}</li>)}</ul> : <p className="faint">—</p>}
        </section>
      </div>
    </div>
  );
}
