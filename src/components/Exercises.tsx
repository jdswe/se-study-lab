import { useI18n } from '../i18n';
import type { Exercise } from '../content/types';

const LEVEL_NAMES = {
  en: ['Warm-up', 'Practice', 'Challenge'],
  es: ['Calentamiento', 'Práctica', 'Desafío'],
  pt: ['Aquecimento', 'Prática', 'Desafio'],
} as const;

/** Exercises with a hidden hint and solution, so learners can try first. */
export function ExerciseList({ exercises }: { exercises: Exercise[] }) {
  const { t, pick, locale } = useI18n();
  const names = LEVEL_NAMES[locale];
  return (
    <section className="exercises" aria-label={t('week.exercises')}>
      <h3>{t('week.exercises')}</h3>
      <ol className="exercise-list">
        {exercises.map((ex, i) => (
          <li key={ex.id} className={`exercise level-${ex.level}`}>
            <div className="exercise-head">
              <span className="badge">{i + 1}</span>
              <strong>{pick(ex.title).text}</strong>
              <span className={`badge level-badge level-${ex.level}`}>{names[ex.level - 1]}</span>
            </div>
            <p>{pick(ex.prompt).text}</p>
            <details>
              <summary>{t('week.hint')}</summary>
              <p className="explain">{pick(ex.hint).text}</p>
            </details>
            <details>
              <summary>{t('week.solution')}</summary>
              <p className="explain">{pick(ex.solution).text}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
