import { lazy, Suspense } from 'react';
import { Link, NavLink, Navigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { findModule, findSubject, findTerm, subjectPath } from '../content/curriculum';
import type { SubjectTool } from '../content/types';
import { weeksOf } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroDemo } from '../components/HeroDemo';
import { DataHeroDemo } from '../components/DataHeroDemo';
import { Deck } from '../components/Deck';
import { LabList } from '../components/LabList';
import { QuizzesSection } from '../sections/QuizzesSection';
import { PlannerSection } from '../sections/PlannerSection';
import { ProgressSection } from '../sections/ProgressSection';
import { ResourcesSection } from '../sections/ResourcesSection';
import { GitPlayground } from '../sections/GitPlayground';
import { useProgress } from '../lib/store';
import { progressOf } from '../lib/stats';

// Heavy tools load only when opened.
const DesignStudio = lazy(() => import('../tools/DesignStudio'));
const SqlLab = lazy(() => import('../tools/SqlLab'));

const TOOL_KEYS: Record<SubjectTool, string> = {
  'git-playground': 'playground.title',
  'design-studio': 'studio.title',
  'sql-lab': 'sqllab.title',
};

/**
 * A subject: its weeks plus every study section, all scoped to this subject.
 * URL: /term/:term/module/:module/:subject/:section?
 */
export function SubjectPage() {
  const { term: tp = '', module: mp = '', subject: sp = '', section = 'weeks' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const term = findTerm(Number(tp));
  const mod = findModule(Number(tp), Number(mp));
  const subject = findSubject(Number(tp), Number(mp), sp);
  if (!term || !mod || !subject) return <Navigate to={term ? `/term/${term.number}` : '/'} replace />;

  const place = { term, module: mod, subject };
  const weeks = weeksOf(subject);
  const sections = ['weeks', 'flashcards', 'quizzes', 'labs', ...subject.tools, 'planner', 'progress', 'resources'];
  if (!sections.includes(section)) return <Navigate to={subjectPath(place)} replace />;
  const label = (s: string) => (s in TOOL_KEYS ? t(TOOL_KEYS[s as SubjectTool]) : t(`subject.${s}`));
  const p = progressOf(weeks, progress);

  return (
    <div className={`subject-page theme-${subject.theme}`} style={{ ['--term-hue' as string]: term.hue }}>
      <Breadcrumbs items={[
        { label: t('nav.home'), to: '/' },
        { label: t('curriculum.term', { n: term.number }), to: `/term/${term.number}` },
        { label: t('curriculum.module', { n: mod.number }), to: `/term/${term.number}/module/${mod.number}` },
        { label: pick(subject.title).text },
      ]} />

      <header className="hero module-hero">
        <div className="hero-copy">
          <p className="eyebrow">{t('curriculum.term', { n: term.number })} · {t('curriculum.module', { n: mod.number })}</p>
          <h1>{pick(subject.title).text}</h1>
          <p>{t('module.subtitle', { n: subject.plannedWeeks })}</p>
          <div className="term-progress" style={{ maxWidth: 320 }}><span style={{ width: `${p.pct}%` }} /></div>
          <p className="faint">{t('week.lessonProgress', { done: p.done, total: p.total })}</p>
        </div>
        {subject.theme === 'version-control' && <HeroDemo />}
        {subject.theme === 'databases' && <DataHeroDemo />}
      </header>

      <nav className="subject-nav" aria-label={t('subject.sections')}>
        {sections.map((s) => (
          <NavLink key={s} to={subjectPath(place, s === 'weeks' ? undefined : s)} end={s === 'weeks'}>
            {label(s)}
          </NavLink>
        ))}
      </nav>

      <section className="subject-section" aria-label={label(section)}>
        {section === 'weeks' && (
          <ol className="week-grid">
            {Array.from({ length: subject.plannedWeeks }, (_, i) => i + 1).map((n) => {
              const meta = subject.weeks.find((w) => w.number === n);
              const content = weeks.find((w) => w.week === n);
              if (!meta || !content) {
                return (
                  <li key={n} className="week-card is-soon">
                    <span className="week-num">{String(n).padStart(2, '0')}</span>
                    <h3>{t('module.weekN', { n })}</h3>
                    <p className="faint">{t('common.comingSoon')}</p>
                  </li>
                );
              }
              const done = content.lessons.filter((l) => progress.lessonsDone[l.id]).length;
              const pct = Math.round((done / content.lessons.length) * 100);
              return (
                <li key={n}>
                  <Link to={`/week/${content.id}`} className="week-card is-ready">
                    <span className="week-num">{String(n).padStart(2, '0')}</span>
                    <h3>{pick(meta.title).text}</h3>
                    <p className="faint">{t('module.weekMeta', { lessons: content.lessons.length, min: content.estimatedMinutes })}</p>
                    <div className="term-progress"><span style={{ width: `${pct}%` }} /></div>
                    <span className="module-next">{done > 0 ? t('home.continue') : t('module.start')} →</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
        {section === 'flashcards' && <Deck cards={weeks.flatMap((w) => w.flashcards)} />}
        {section === 'quizzes' && <QuizzesSection weeks={weeks} />}
        {section === 'labs' && <LabList labs={weeks.flatMap((w) => w.labs)} sqlLabPath={subject.tools.includes('sql-lab') ? subjectPath(place, 'sql-lab') : undefined} />}
        {section === 'git-playground' && <GitPlayground />}
        {section === 'design-studio' && <Suspense fallback={<p className="faint">{t('common.loading')}</p>}><DesignStudio /></Suspense>}
        {section === 'sql-lab' && <Suspense fallback={<p className="faint">{t('common.loading')}</p>}><SqlLab /></Suspense>}
        {section === 'planner' && <PlannerSection weeks={weeks} />}
        {section === 'progress' && <ProgressSection weeks={weeks} />}
        {section === 'resources' && <ResourcesSection weeks={weeks} />}
      </section>
    </div>
  );
}
