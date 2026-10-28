import { useI18n } from '../i18n';
import { weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updateState, useProgress } from '../lib/store';

/** Adjustable plan: mark a day done or skipped; skipped days leave the total. */
export function Planner() {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const week = weeks[0];

  function setStatus(key: string, status: 'done' | 'skipped' | null) {
    updateState((s) => {
      const planStatus = { ...s.planStatus };
      if (status === null || planStatus[key] === status) delete planStatus[key];
      else planStatus[key] = status;
      return { ...s, planStatus };
    });
  }

  const planned = week.plan.filter((_, i) => progress.planStatus[`${week.id}:${i}`] !== 'skipped');
  const total = planned.reduce((sum, d) => sum + d.minutes, 0);

  function reset() {
    updateState((s) => {
      const planStatus = Object.fromEntries(Object.entries(s.planStatus).filter(([k]) => !k.startsWith(`${week.id}:`)));
      return { ...s, planStatus };
    });
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('planner.title') }]} />
      <div className="page-head">
        <h1>{t('planner.title')}</h1>
        <p>{t('planner.subtitle')}</p>
      </div>
      <p className="muted">{t('planner.totalMinutes', { n: total })}</p>
      {week.plan.map((day, i) => {
        const key = `${week.id}:${i}`;
        const status = progress.planStatus[key];
        return (
          <div key={key} className={`day ${status === 'done' ? 'is-done' : ''} ${status === 'skipped' ? 'is-skipped' : ''}`}>
            <span className="day-num">{day.day}</span>
            <div>
              <strong>{pick(day.focus).text}</strong>
              <div className="faint">{t(`planner.kinds.${day.kind}`)} · {t('common.minutes', { n: day.minutes })}</div>
            </div>
            <div className="chips">
              <button type="button" className="btn btn-small" aria-pressed={status === 'done'} onClick={() => setStatus(key, 'done')}>
                {t('planner.done')}
              </button>
              <button type="button" className="btn btn-small" aria-pressed={status === 'skipped'} onClick={() => setStatus(key, 'skipped')}>
                {t('planner.skip')}
              </button>
            </div>
          </div>
        );
      })}
      <button type="button" className="btn" onClick={reset}>{t('planner.reset')}</button>
    </div>
  );
}
