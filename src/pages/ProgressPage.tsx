import { useI18n } from '../i18n';
import { weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProgressBar } from '../components/Progress';
import { emptyState, updateState, useProgress } from '../lib/store';
import { lessonStatuses, streakOf } from '../lib/stats';

export function ProgressPage() {
  const { t } = useI18n();
  const progress = useProgress();
  const now = new Date();

  const lessonsTotal = weeks.reduce((n, w) => n + w.lessons.length, 0);
  const lessonsDone = Object.keys(progress.lessonsDone).length;
  const cardsReviewed = Object.values(progress.cards).reduce((n, c) => n + c.reps + c.incorrect, 0);
  const quizzesTaken = Object.keys(progress.quizzes).length;
  const labsTotal = weeks.reduce((n, w) => n + w.labs.length, 0);
  const labsDone = weeks.flatMap((w) => w.labs).filter((lab) => lab.steps.every((s) => progress.stepsDone[s.id])).length;

  const statuses = weeks.flatMap((w) => lessonStatuses(w, progress));
  const mastered = statuses.filter((s) => s.mastered).map((s) => s.title);
  const needReview = statuses.filter((s) => s.needsReview).map((s) => s.title);
  const hasAny = lessonsDone > 0 || cardsReviewed > 0 || quizzesTaken > 0 || labsDone > 0;

  function exportJson() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'se-study-lab-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    if (window.confirm(t('progress.clearConfirm'))) updateState(() => ({ ...emptyState(), locale: progress.locale, theme: progress.theme }));
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('progress.title') }]} />
      <div className="page-head">
        <h1>{t('progress.title')}</h1>
        <p>{t('progress.subtitle')}</p>
      </div>
      {!hasAny && <p className="empty">{t('progress.empty')}</p>}
      <section className="grid" style={{ marginBottom: 24 }}>
        <div className="card stat">
          <strong>{lessonsDone}/{lessonsTotal}</strong>
          <span>{t('progress.lessons')}</span>
          <ProgressBar value={lessonsDone} max={lessonsTotal} label={t('progress.lessons')} />
        </div>
        <div className="card stat"><strong>{cardsReviewed}</strong><span>{t('progress.cards')}</span></div>
        <div className="card stat"><strong>{quizzesTaken}</strong><span>{t('progress.quizzes')}</span></div>
        <div className="card stat">
          <strong>{labsDone}/{labsTotal}</strong>
          <span>{t('progress.labs')}</span>
        </div>
        <div className="card stat"><strong>{streakOf(progress, now)}</strong><span>{t('progress.streak')} · {t('progress.days', { n: streakOf(progress, now) })}</span></div>
      </section>
      <div className="two-col">
        <section className="card">
          <h2>{t('progress.mastered')}</h2>
          {mastered.length ? <ul>{mastered.map((m) => <li key={m}>{m}</li>)}</ul> : <p className="faint">—</p>}
          <h2 style={{ marginTop: 20 }}>{t('progress.needReview')}</h2>
          {needReview.length ? <ul>{needReview.map((m) => <li key={m}>{m}</li>)}</ul> : <p className="faint">—</p>}
        </section>
        <aside className="stack" style={{ alignSelf: 'start' }}>
          <button type="button" className="btn" onClick={exportJson}>{t('progress.export')}</button>
          <button type="button" className="btn btn-bad" onClick={clearAll}>{t('progress.clear')}</button>
        </aside>
      </div>
    </div>
  );
}
