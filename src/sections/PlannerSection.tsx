import type { WeekContent } from '../content/weekContent';
import { useI18n } from '../i18n';
import { updateState, useProgress } from '../lib/store';

/** Adjustable plan for each week of the subject: mark days done or skipped. */
export function PlannerSection({ weeks }: { weeks: WeekContent[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();

  function setStatus(key: string, status: 'done' | 'skipped') {
    updateState((s) => {
      const planStatus = { ...s.planStatus };
      if (planStatus[key] === status) delete planStatus[key];
      else planStatus[key] = status;
      return { ...s, planStatus };
    });
  }

  function reset(weekId: string) {
    updateState((s) => ({ ...s, planStatus: Object.fromEntries(Object.entries(s.planStatus).filter(([k]) => !k.startsWith(`${weekId}:`))) }));
  }

  return (
    <div className="stack" style={{ gap: 28 }}>
      <p className="muted">{t('planner.subtitle')}</p>
      {weeks.map((week) => {
        const total = week.plan.filter((_, i) => progress.planStatus[`${week.id}:${i}`] !== 'skipped').reduce((n, d) => n + d.minutes, 0);
        return (
          <section key={week.id}>
            <h2>{t('module.weekN', { n: week.week })} · {pick(week.title).text}</h2>
            <p className="faint">{t('planner.totalMinutes', { n: total })}</p>
            {week.plan.map((day, i) => {
              const key = `${week.id}:${i}`;
              const status = progress.planStatus[key];
              return (
                <div key={key} className={`day ${status === 'done' ? 'is-done' : ''} ${status === 'skipped' ? 'is-skipped' : ''}`}>
                  <span className="day-num">{t('planner.dayN', { n: i + 1 })}</span>
                  <div>
                    <strong>{pick(day.focus).text}</strong>
                    <div className="faint">{t(`planner.kinds.${day.kind}`)} · {t('common.minutes', { n: day.minutes })}</div>
                  </div>
                  <div className="chips">
                    <button type="button" className="btn btn-small" aria-pressed={status === 'done'} onClick={() => setStatus(key, 'done')}>{t('planner.done')}</button>
                    <button type="button" className="btn btn-small" aria-pressed={status === 'skipped'} onClick={() => setStatus(key, 'skipped')}>{t('planner.skip')}</button>
                  </div>
                </div>
              );
            })}
            <button type="button" className="btn btn-small" onClick={() => reset(week.id)}>{t('planner.reset')}</button>
          </section>
        );
      })}
    </div>
  );
}
