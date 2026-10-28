import { Link, Navigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { findModule, findTerm, weekId } from '../content/curriculum';
import { findWeek } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeroDemo } from '../components/HeroDemo';
import { useProgress } from '../lib/store';

/** One module (subject): its weeks, published and planned, with the subject's own visual theme. */
export function ModulePage() {
  const { term: tp = '', module: mp = '' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const term = findTerm(Number(tp));
  const mod = findModule(Number(tp), Number(mp));
  if (!term || !mod || !mod.subject) return <Navigate to={term ? `/term/${term.number}` : '/'} replace />;

  const slots = Array.from({ length: mod.plannedWeeks }, (_, i) => i + 1);

  return (
    <div className={`module-page theme-${mod.theme}`} style={{ ['--term-hue' as string]: term.hue }}>
      <Breadcrumbs items={[
        { label: t('nav.home'), to: '/' },
        { label: t('curriculum.term', { n: term.number }), to: `/term/${term.number}` },
        { label: pick(mod.subject).text },
      ]} />
      <header className="hero module-hero">
        <div className="hero-copy">
          <p className="eyebrow">{t('curriculum.term', { n: term.number })} · {t('curriculum.module', { n: mod.number })}</p>
          <h1>{pick(mod.subject).text}</h1>
          <p>{t('module.subtitle', { n: mod.plannedWeeks })}</p>
        </div>
        {mod.theme === 'version-control' && <HeroDemo />}
      </header>

      <section aria-labelledby="weeks-title" style={{ marginTop: 32 }}>
        <h2 id="weeks-title">{t('module.weeksTitle')}</h2>
        <ol className="week-grid">
          {slots.map((n) => {
            const meta = mod.weeks.find((w) => w.number === n);
            const content = meta ? findWeek(weekId(term, mod.number, n)) : undefined;
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
      </section>
    </div>
  );
}
