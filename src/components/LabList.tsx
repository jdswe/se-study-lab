import { useI18n } from '../i18n';
import type { Lab } from '../content/types';
import { updateState, useProgress } from '../lib/store';
import { CodeBlock } from './CodeBlock';

/** Lab instructions with copyable steps. Step completion is saved in local progress. */
export function LabList({ labs }: { labs: Lab[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();

  function toggleStep(id: string) {
    updateState((s) => {
      const stepsDone = { ...s.stepsDone };
      if (stepsDone[id]) delete stepsDone[id];
      else stepsDone[id] = true;
      return { ...s, stepsDone };
    });
  }

  return (
    <div className="stack">
      <p className="warning">{t('labs.sandboxWarning')}</p>
      {labs.map((lab) => {
        const doneSteps = lab.steps.filter((s) => progress.stepsDone[s.id]).length;
        return (
          <section className="card" key={lab.id} aria-labelledby={`${lab.id}-title`}>
            <div className="toolbar" style={{ justifyContent: 'space-between' }}>
              <h2 id={`${lab.id}-title`} style={{ margin: 0 }}>{pick(lab.title).text}</h2>
              <span className="badge">{t('labs.level', { n: lab.level })} · {t('common.minutes', { n: lab.minutes })}</span>
            </div>
            <p className="muted"><strong>{t('labs.goal')}:</strong> {pick(lab.goal).text}</p>
            <p className="faint">{doneSteps}/{lab.steps.length} {t('labs.steps').toLowerCase()}</p>
            {lab.steps.map((step, i) => {
              const done = Boolean(progress.stepsDone[step.id]);
              return (
                <article key={step.id} className={`step ${done ? 'is-done' : ''}`}>
                  <div className="step-head">
                    <h3 style={{ margin: 0 }}>{i + 1}. {pick(step.title).text}</h3>
                    <label>
                      <input type="checkbox" checked={done} onChange={() => toggleStep(step.id)} /> {t('labs.stepDone')}
                    </label>
                  </div>
                  <CodeBlock code={step.commands.join('\n')} label={`${lab.id} step ${i + 1}`} />
                  <p className="explain"><strong>{t('labs.expected')}:</strong> {pick(step.expected).text}</p>
                </article>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
