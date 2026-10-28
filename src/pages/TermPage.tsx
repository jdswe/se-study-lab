import { Link, Navigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { findTerm } from '../content/curriculum';
import { weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TermArt } from '../components/TermArt';
import { useProgress } from '../lib/store';
import { scopeProgress } from '../lib/stats';

/** One term: its three modules as cards. */
export function TermPage() {
  const { term: termParam = '' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const term = findTerm(Number(termParam));
  if (!term) return <Navigate to="/" replace />;

  return (
    <div className="term-page" style={{ ['--term-hue' as string]: term.hue }}>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('curriculum.term', { n: term.number }) }]} />
      <header className="level-hero">
        <div>
          <p className="eyebrow">{t('curriculum.year', { n: term.year })}</p>
          <h1>{t('curriculum.term', { n: term.number })}</h1>
          <p className="muted">{t('term.subtitle')}</p>
        </div>
        <TermArt term={term.number} hue={term.hue} className="level-art" />
      </header>

      <div className="module-grid">
        {term.modules.map((m) => {
          const p = scopeProgress(weeks, progress, term.number, m.number);
          const first = m.weeks[0];
          const ready = Boolean(m.subject);
          const body = (
            <>
              <span className="module-num">{String(m.number).padStart(2, '0')}</span>
              <span className="term-year">{t('curriculum.module', { n: m.number })}</span>
              <h3>{m.subject ? pick(m.subject).text : t('module.placeholder')}</h3>
              <p className="faint">
                {ready ? t('module.weeksReady', { done: m.weeks.length, total: m.plannedWeeks }) : t('module.addMaterials')}
              </p>
              {ready && <div className="term-progress"><span style={{ width: `${p.pct}%` }} /></div>}
              {ready && first && <span className="module-next">{t('module.startAt', { n: first.number })} →</span>}
            </>
          );
          return ready ? (
            <Link key={m.number} to={`/term/${term.number}/module/${m.number}`} className="module-card is-ready">{body}</Link>
          ) : (
            <div key={m.number} className="module-card is-soon" aria-disabled="true">{body}</div>
          );
        })}
      </div>
    </div>
  );
}
