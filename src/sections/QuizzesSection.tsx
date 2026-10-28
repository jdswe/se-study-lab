import { Link } from 'react-router-dom';
import type { WeekContent } from '../content/weekContent';
import { useI18n } from '../i18n';
import { useProgress } from '../lib/store';

/** One card per week quiz in the subject; each opens the week's quiz tab. */
export function QuizzesSection({ weeks }: { weeks: WeekContent[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  return (
    <div className="grid">
      {weeks.map((w) => {
        const attempt = progress.quizzes[w.id];
        return (
          <Link key={w.id} to={`/week/${w.id}/quiz`} className="week-link">
            <article className="card">
              <p className="eyebrow">{t('module.weekN', { n: w.week })}</p>
              <h3>{pick(w.title).text}</h3>
              <p className="muted">{t('quiz.questionsCount', { n: w.questions.length })}</p>
              <p>{attempt ? t('quiz.bestScore', { s: attempt.score, t: attempt.total }) : t('quiz.notTaken')}</p>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
