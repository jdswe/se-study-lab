import { Link, Navigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { findModule, findSubject, findTerm } from '../content/curriculum';
import { weeksOf } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroDemo } from '../components/HeroDemo';
import { DataHeroDemo } from '../components/DataHeroDemo';
import { MathHeroDemo } from '../components/MathHeroDemo';
import { useProgress } from '../lib/store';
import { progressOf } from '../lib/stats';
import { SUBJECT_ACCENT } from '../lib/subjectStyle';

/**
 * A subject: its weeks. Every study section (cards, quiz, labs, tools, plan)
 * lives inside each week, with that week's own topics.
 */
export function SubjectPage() {
  const { term: tp = '', module: mp = '', subject: sp = '' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const term = findTerm(Number(tp));
  const mod = findModule(Number(tp), Number(mp));
  const subject = findSubject(Number(tp), Number(mp), sp);
  if (!term || !mod || !subject) return <Navigate to={term ? `/term/${term.number}` : '/'} replace />;

  const weeks = weeksOf(subject);
  const p = progressOf(weeks, progress);

  return (
    <div className={`subject-page theme-${subject.theme}`} style={{ ['--subject' as string]: SUBJECT_ACCENT[subject.theme], ['--term-hue' as string]: term.hue }}>
      <Breadcrumbs items={[
        { label: t('nav.home'), to: '/' },
        { label: t('curriculum.term', { n: term.number }), to: `/term/${term.number}` },
        { label: t('curriculum.module', { n: mod.number }), to: `/term/${term.number}/module/${mod.number}` },
        { label: pick(subject.title).text },
      ]} />

      <header className="hero module-hero">
        <div className="hero-copy">
          <h1>{pick(subject.title).text}</h1>
          <p>{t('module.subtitle', { n: subject.plannedWeeks })}</p>
          <p className="faint">{t('week.lessonProgress', { done: p.done, total: p.total })}</p>
        </div>
        {subject.theme === 'version-control' && <HeroDemo />}
        {subject.theme === 'databases' && <DataHeroDemo />}
        {subject.theme === 'math' && <MathHeroDemo />}
      </header>

      <section aria-labelledby="weeks-title" className="subject-weeks">
        <h2 id="weeks-title">{t('module.weeksTitle')}</h2>
        <ol className="week-grid">
          {Array.from({ length: subject.plannedWeeks }, (_, i) => i + 1).map((n) => {
            const meta = subject.weeks.find((w) => w.number === n);
            const content = weeks.find((w) => w.week === n);
            if (!meta || !content) {
              return (
                <li key={n} className="week-card is-soon">
                  <span className="week-num">{n}</span>
                  <h3>{t('module.weekN', { n })}</h3>
                  <p className="faint">{t('common.comingSoon')}</p>
                </li>
              );
            }
            const done = content.lessons.filter((l) => progress.lessonsDone[l.id]).length;
            return (
              <li key={n}>
                <Link to={`/week/${content.id}`} className="week-card is-ready">
                  <span className="week-num">{n}</span>
                  <h3>{pick(meta.title).text}</h3>
                  <p className="faint">{t('module.weekMeta', { lessons: content.lessons.length, min: content.estimatedMinutes })}</p>
                  <ol className="lesson-strip small" aria-hidden="true">
                    {content.lessons.map((l) => <li key={l.id} className={progress.lessonsDone[l.id] ? 'is-done' : ''} />)}
                  </ol>
                  <span className="module-next">{done > 0 ? t('home.continue') : t('module.start')}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
