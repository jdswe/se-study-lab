import { useEffect } from 'react';
import { NavLink, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { findWeek } from '../content/index';
import { findModule } from '../content/curriculum';
import type { Activity, Lesson as LessonType, Story } from '../content/types';
import { StoryPlayer } from '../components/StoryPlayer';
import { DocumentCard, LinkCard } from '../components/ResourceCards';
import { useI18n } from '../i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Lesson, hueFor } from '../components/Lesson';
import { Deck } from '../components/Deck';
import { QuizRunner } from '../components/QuizRunner';
import { LabList } from '../components/LabList';
import { ProgressBar } from '../components/Progress';
import { WeekMap } from '../components/WeekMap';
import { useProgress } from '../lib/store';
import { lessonStatuses } from '../lib/stats';

const TABS = ['overview', 'lessons', 'flashcards', 'quiz', 'labs', 'resources'] as const;
type Tab = (typeof TABS)[number];

/** One week: overview, lessons, flashcards, quiz, labs, and resources, as separate tabs. */
export function WeekPage() {
  const { weekId = '', tab = 'overview' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const week = findWeek(weekId);

  if (!week) return <Navigate to="/" replace />;
  if (!TABS.includes(tab as Tab)) return <Navigate to={`/week/${weekId}`} replace />;

  const doneCount = lessonStatuses(week, progress).filter((s) => s.done).length;
  const subject = findModule(week.term, week.module)?.subject;
  const percent = week.lessons.length ? Math.round((doneCount / week.lessons.length) * 100) : 0;
  const title = pick(week.title).text;
  const accent = `hsl(${hueFor(0)} 34% 48%)`;

  return (
    <div className="week-shell" style={{ ['--accent-week' as string]: accent }}>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: '/' },
          { label: t('curriculum.term', { n: week.term }), to: `/term/${week.term}` },
          { label: subject ? pick(subject).text : t('curriculum.module', { n: week.module }), to: `/term/${week.term}/module/${week.module}` },
          { label: t('module.weekN', { n: week.week }) },
        ]}
      />

      <header className="week-hero">
        <div>
          <p className="eyebrow">{t('module.weekN', { n: week.week })}</p>
          <h1>{title}</h1>
          {pick(week.intro).fallback && <span className="translation-note">{t('common.translationMissing')}</span>}
          <p className="week-intro">{pick(week.intro).text}</p>
        </div>
        <div className="week-ring" role="img" aria-label={t('week.lessonProgress', { done: doneCount, total: week.lessons.length })}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="50" className="ring-bg" />
            <circle cx="60" cy="60" r="50" className="ring-fg" strokeDasharray={`${(percent / 100) * 314} 314`} />
          </svg>
          <strong>{percent}%</strong>
        </div>
      </header>

      <p className="faint">{t('week.lessonProgress', { done: doneCount, total: week.lessons.length })}</p>
      <ProgressBar value={doneCount} max={week.lessons.length} label={t('common.progress')} />

      <nav className="week-tabs" aria-label={t('week.sections')}>
        {TABS.map((item) => (
          <NavLink key={item} to={item === 'overview' ? `/week/${week.id}` : `/week/${week.id}/${item}`} end={item === 'overview'}>
            {t(`week.${item}`)}
          </NavLink>
        ))}
      </nav>

      {tab === 'overview' && <Overview weekId={week.id} />}
      {tab === 'lessons' && <LessonsWithAnchor lessons={week.lessons} activities={week.activities} stories={week.stories} />}
      {tab === 'flashcards' && <Deck cards={week.flashcards} />}
      {tab === 'quiz' && (
        <QuizRunner
          quizId={week.id}
          weekId={week.id}
          questions={week.questions}
          lessonTitles={Object.fromEntries(week.lessons.map((l) => [l.id, pick(l.title).text]))}
        />
      )}
      {tab === 'labs' && <LabList labs={week.labs} />}
      {tab === 'resources' && <Resources weekId={week.id} />}
    </div>
  );
}

/** Overview split into labelled sections, each with its own accent colour. */
function Overview({ weekId }: { weekId: string }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const week = findWeek(weekId);
  if (!week) return null;

  const jump = (id: string) => {
    window.location.hash = `#/week/${week.id}/lessons?lesson=${id}`;
  };

  return (
    <div className="overview">
      <section className="section-card" style={{ ['--hue' as string]: 200 }}>
        <h2><span className="section-icon" aria-hidden="true">◎</span> {t('week.whatYouBuild')}</h2>
        <ol className="objective-cards">
          {week.objectives.map((o, i) => (
            <li key={i}><span className="badge">{i + 1}</span> {pick(o).text}</li>
          ))}
        </ol>
      </section>

      <section className="section-card" style={{ ['--hue' as string]: 265 }}>
        <h2><span className="section-icon" aria-hidden="true">⌘</span> {t('week.keyConcepts')}</h2>
        <div className="concept-chips">
          {week.keyConcepts.map((c, i) => (
            <span className="concept" key={i} style={{ ['--hue' as string]: hueFor(i) }}>{pick(c).text}</span>
          ))}
        </div>
      </section>

      <section className="section-card" style={{ ['--hue' as string]: 25 }} aria-labelledby="story-title">
        <h2 id="story-title"><span className="section-icon" aria-hidden="true">▶</span> {t('story.section')}</h2>
        <p className="muted">{t('story.sectionText')}</p>
        <div className="story-grid">
          {week.stories.map((story) => <StoryPlayer key={story.id} story={story} />)}
        </div>
      </section>

      <section className="section-card" style={{ ['--hue' as string]: 150 }} aria-labelledby="map-title">
        <h2 id="map-title"><span className="section-icon" aria-hidden="true">⇢</span> {t('week.weekMap')}</h2>
        <p className="muted">{t('week.jumpTo')}</p>
        <WeekMap lessons={week.lessons} done={progress.lessonsDone} onJump={jump} />
      </section>

      <div className="two-col">
        <section className="section-card" style={{ ['--hue' as string]: 35 }}>
          <h2><span className="section-icon" aria-hidden="true">✓</span> {t('week.sequence')}</h2>
          <ol className="steps-list">{week.sequence.map((s, i) => <li key={i}>{pick(s).text}</li>)}</ol>
          <h3>{t('week.outcomes')}</h3>
          <ul>{week.outcomes.map((o, i) => <li key={i}>{pick(o).text}</li>)}</ul>
        </section>
        <aside className="stack" style={{ gap: 16, alignSelf: 'start' }}>
          <section className="section-card" style={{ ['--hue' as string]: 320 }}>
            <h3>{t('week.estimate')}</h3>
            <p className="big-number">{t('common.minutes', { n: week.estimatedMinutes })}</p>
            <h3>{t('week.prerequisites')}</h3>
            <ul>{week.prerequisites.map((p, i) => <li key={i}>{pick(p).text}</li>)}</ul>
          </section>
          <section className="section-card" style={{ ['--hue' as string]: 15 }}>
            <h3>{t('week.checklist')}</h3>
            <ul className="checklist">
              {week.checklist.map((c, i) => (
                <li key={i}><label><input type="checkbox" /> {pick(c).text}</label></li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section className="section-card warn-card" style={{ ['--hue' as string]: 0 }}>
        <h2><span className="section-icon" aria-hidden="true">!</span> {t('week.commonMistakes')}</h2>
        <div className="mistakes">
          {week.commonMistakes.map((m, i) => (
            <div className="pitfall" key={i}>
              <p><strong>✗</strong> {pick(m.mistake).text}</p>
              <p><strong>✓ {t('week.fix')}:</strong> {pick(m.fix).text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LessonsWithAnchor({ lessons, activities, stories }: { lessons: LessonType[]; activities: Activity[]; stories: Story[] }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const [params] = useSearchParams();
  const target = params.get('lesson');

  useEffect(() => {
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [target]);

  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="lessons-layout">
      <nav className="lesson-jump" aria-label={t('week.jumpTo')}>
        <p className="eyebrow">{t('week.jumpTo')}</p>
        {lessons.map((l, i) => (
          <button
            type="button"
            key={l.id}
            className={`jump-item ${progress.lessonsDone[l.id] ? 'is-done' : ''}`}
            style={{ ['--hue' as string]: hueFor(i) }}
            onClick={() => jump(l.id)}
          >
            <span className="map-dot" aria-hidden="true">{progress.lessonsDone[l.id] ? '✓' : i + 1}</span>
            <span>{pick(l.title).text}</span>
          </button>
        ))}
      </nav>
      <div className="stack" style={{ gap: 0, minWidth: 0 }}>
        {lessons.map((lesson, i) => (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            index={i}
            activities={activities.filter((a) => a.lessonId === lesson.id)}
            stories={stories.filter((s) => s.lessonId === lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Resources({ weekId }: { weekId: string }) {
  const { t, pick } = useI18n();
  const week = findWeek(weekId);
  if (!week) return null;
  return (
    <div className="stack" style={{ gap: 24 }}>
      <section>
        <h2>{t('resources.originals')}</h2>
        <p className="muted">{t('resources.previewNote')}</p>
        <div className="res-grid">
          {week.documents.map((d) => (
            <DocumentCard key={d.file} title={pick(d.title).text} file={d.file} kind={d.kind} />
          ))}
        </div>
      </section>
      <section>
        <h2>{t('resources.external')}</h2>
        <div className="res-grid">
          {week.resources.map((r) => (
            <LinkCard
              key={r.id}
              resource={r}
              note={pick(r.note).text}
              verified={r.verifiedOn ? t('resources.verified', { date: r.verifiedOn }) : t('resources.unverified')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
