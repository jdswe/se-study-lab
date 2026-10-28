import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { findWeek, weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuizRunner } from '../components/QuizRunner';
import { useProgress } from '../lib/store';

/** Quiz index, or a single quiz when a week is selected. */
export function Quizzes() {
  const { weekId } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const week = weekId ? findWeek(weekId) : undefined;

  if (week) {
    return (
      <div>
        <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('nav.quizzes'), to: '/quizzes' }, { label: pick(week.title).text }]} />
        <div className="page-head">
          <h1>{pick(week.title).text}</h1>
          <p>{t('quiz.subtitle')}</p>
        </div>
        <QuizRunner
          quizId={week.id}
          weekId={week.id}
          questions={week.questions}
          lessonTitles={Object.fromEntries(week.lessons.map((l) => [l.id, pick(l.title).text]))}
        />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('quiz.title') }]} />
      <div className="page-head">
        <h1>{t('quiz.title')}</h1>
        <p>{t('quiz.subtitle')}</p>
      </div>
      <div className="grid">
        {weeks.map((w) => {
          const attempt = progress.quizzes[w.id];
          return (
            <Link key={w.id} to={`/quizzes/${w.id}`} className="week-link">
              <article className="card">
                <h3>{pick(w.title).text}</h3>
                <p className="muted">{w.questions.length} · {t('quiz.title')}</p>
                <p>{attempt ? t('quiz.bestScore', { s: attempt.score, t: attempt.total }) : t('quiz.notTaken')}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
