import { Link, Navigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { findModule, findTerm, subjectPath } from '../content/curriculum';
import { weeksOf } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TermArt } from '../components/TermArt';
import { useProgress } from '../lib/store';
import { progressOf } from '../lib/stats';

const THEME_GLYPH: Record<string, string> = { 'version-control': '⑂', databases: '▦', default: '◆' };

/** A module: the subjects taught in it, each with its own weeks and tools. */
export function ModulePage() {
  const { term: tp = '', module: mp = '' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const term = findTerm(Number(tp));
  const mod = findModule(Number(tp), Number(mp));
  if (!term || !mod) return <Navigate to="/" replace />;
  if (mod.subjects.length === 0) return <Navigate to={`/term/${term.number}`} replace />;

  return (
    <div className="term-page" style={{ ['--term-hue' as string]: term.hue }}>
      <Breadcrumbs items={[
        { label: t('nav.home'), to: '/' },
        { label: t('curriculum.term', { n: term.number }), to: `/term/${term.number}` },
        { label: t('curriculum.module', { n: mod.number }) },
      ]} />
      <header className="level-hero">
        <div>
          <p className="eyebrow">{t('curriculum.term', { n: term.number })}</p>
          <h1>{t('curriculum.module', { n: mod.number })}</h1>
          <p className="muted">{t('module.subjectsIntro', { n: mod.subjects.length })}</p>
        </div>
        <TermArt term={term.number + mod.number} hue={(term.hue + mod.number * 18) % 360} className="level-art" />
      </header>
      <div className="module-grid">
        {mod.subjects.map((s) => {
          const weeks = weeksOf(s);
          const p = progressOf(weeks, progress);
          return (
            <Link key={s.slug} to={subjectPath({ term, module: mod, subject: s })} className={`module-card is-ready subject-card theme-${s.theme}`}>
              <span className="module-num" aria-hidden="true">{THEME_GLYPH[s.theme]}</span>
              <span className="term-year">{t('subject.label')}</span>
              <h3>{pick(s.title).text}</h3>
              <p className="faint">{t('module.weeksReady', { done: s.weeks.filter((w) => w.status === 'published').length, total: s.plannedWeeks })}</p>
              <div className="term-progress"><span style={{ width: `${p.pct}%` }} /></div>
              <span className="module-next">{t('subject.open')}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
