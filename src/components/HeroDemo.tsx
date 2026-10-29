import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import { initRepo, run, type RepoState } from '../lib/gitSim';
import { GitGraph } from './GitGraph';

const SCRIPT = [
  'echo "Setup steps" >> README.md',
  'git commit -am "add setup steps"',
  'git switch -c feature',
  'echo "login()" >> app.js',
  'git commit -am "add login"',
  'git switch main',
  'echo "Fix typo" >> README.md',
  'git commit -am "fix typo"',
  'git merge feature',
];

function stateAfter(steps: number): RepoState {
  return SCRIPT.slice(0, steps).reduce((s, cmd) => run(s, cmd).state, initRepo());
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
  } catch {
    return false;
  }
}

/**
 * Self-explaining hero: a terminal types Git commands and the commit graph
 * grows beside it. Loops gently; with reduced motion it shows the final state.
 */
export function HeroDemo() {
  const { t } = useI18n();
  const reduced = useMemo(prefersReducedMotion, []);
  const [step, setStep] = useState(reduced ? SCRIPT.length : 0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let timer: number;
    if (step >= SCRIPT.length) {
      timer = window.setTimeout(() => { setStep(0); setTyped(0); }, 4500);
    } else if (typed < SCRIPT[step].length) {
      timer = window.setTimeout(() => setTyped((n) => n + 1), document.hidden ? 400 : 38);
    } else {
      timer = window.setTimeout(() => { setStep((s) => s + 1); setTyped(0); }, 900);
    }
    return () => window.clearTimeout(timer);
  }, [step, typed, reduced]);

  const state = stateAfter(step);
  const done = SCRIPT.slice(0, step);
  const current = step < SCRIPT.length ? SCRIPT[step].slice(0, typed) : '';

  return (
    <figure className="hero-demo">
      <div className="terminal" aria-hidden="true">
        <div className="terminal-bar"><span /><span /><span /><em>{t('playground.terminal')}</em></div>
        <div className="terminal-body">
          {done.slice(-4).map((cmd, i) => (
            <div key={`${step}-${i}`} className="term-line done"><b>$</b> {cmd}</div>
          ))}
          {step < SCRIPT.length && (
            <div className="term-line"><b>$</b> {current}<i className="caret" /></div>
          )}
        </div>
      </div>
      <GitGraph state={state} compact label={t('playground.graphLabel', { n: state.commits.length })} />
      <figcaption className="faint">{t('playground.heroCaption')}</figcaption>
    </figure>
  );
}
