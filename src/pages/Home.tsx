import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { weeks } from '../content/index';
import { program, terms } from '../content/curriculum';
import { JourneyArt } from '../components/JourneyArt';
import { TermArt } from '../components/TermArt';
import { SearchBox } from '../components/SearchBox';
import { useProgress } from '../lib/store';
import { bestQuiz, dueCount, scopeProgress, streakOf } from '../lib/stats';

/** Program home: the whole degree as eight terms, plus where to continue. */
export function Home() {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const now = new Date();
  // The current term is the first one with published content that is not finished.
  const current = terms.find((term) => {
    const p = scopeProgress(weeks, progress, term.number);
    return p.total > 0 && p.done < p.total;
  }) ?? terms[0];
  const nextWeek = weeks.find((w) => w.term === current.number) ?? weeks[0];
  const due = weeks.reduce((n, w) => n + dueCount(w, progress, now), 0);
  const best = bestQuiz(progress, nextWeek.id);

  return (
    <div className="stack" style={{ gap: 36 }}>
      <section className="hero program-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{t('home.kicker')}</p>
          <h1 id="hero-title">{pick(program.title).text}</h1>
          <p>{pick(program.tagline).text}</p>
          <SearchBox />
          <div className="hero-actions">
            <Link className="btn btn-primary" to={`/week/${nextWeek.id}`}>{t('home.continue')}</Link>
            <Link className="btn" to="/playground">{t('playground.open')}</Link>
          </div>
        </div>
        <JourneyArt current={current.number} />
      </section>

      <section className="grid stats-row" aria-label={t('progress.title')}>
        <div className="card stat"><strong>{Object.keys(progress.lessonsDone).length}</strong><span>{t('home.statLessons')}</span></div>
        <div className="card stat"><strong>{due}</strong><span>{t('home.statCards')}</span></div>
        <div className="card stat"><strong>{streakOf(progress, now)}</strong><span>{t('home.statStreak')}</span></div>
        <div className="card stat"><strong>{best ? `${best.score}/${best.total}` : '—'}</strong><span>{t('home.statQuiz')}</span></div>
      </section>

      <section aria-labelledby="terms-title">
        <div className="section-head">
          <h2 id="terms-title">{t('home.termsTitle')}</h2>
          <p className="muted">{t('home.termsText')}</p>
        </div>
        <div className="term-grid">
          {terms.map((term) => {
            const p = scopeProgress(weeks, progress, term.number);
            const subjects = term.modules.filter((m) => m.subject).length;
            const status = term.number === current.number ? 'now' : subjects > 0 ? 'open' : 'soon';
            return (
              <Link key={term.number} to={`/term/${term.number}`} className={`term-card status-${status}`} style={{ ['--term-hue' as string]: term.hue }}>
                <TermArt term={term.number} hue={term.hue} />
                <div className="term-card-body">
                  <span className="term-year">{t('curriculum.year', { n: term.year })}</span>
                  <h3>{t('curriculum.term', { n: term.number })}</h3>
                  <p className="faint">{t('home.modulesCount', { n: term.modules.length })} · {subjects > 0 ? t('home.subjectsReady', { n: subjects }) : t('common.comingSoon')}</p>
                  {p.total > 0 && (
                    <div className="term-progress"><span style={{ width: `${p.pct}%` }} /></div>
                  )}
                  {status === 'now' && <span className="badge badge-good">{t('home.inProgress')}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
