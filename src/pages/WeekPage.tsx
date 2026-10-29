import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Link, NavLink, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { findWeek } from '../content/index';
import { placeOfWeek, subjectPath } from '../content/curriculum';
import type { Activity, Lesson as LessonType, Story, SubjectTool, Video } from '../content/types';
import type { WeekContent } from '../content/weekContent';
import { renderedVideos } from '../components/VideoPlayer';
import { DocumentCard, LinkCard } from '../components/ResourceCards';
import { useI18n } from '../i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Lesson } from '../components/Lesson';
import { Deck } from '../components/Deck';
import { QuizRunner } from '../components/QuizRunner';
import { LabList } from '../components/LabList';
import { PlannerSection } from '../sections/PlannerSection';
import { ProgressSection } from '../sections/ProgressSection';
import { useProgress, type ProgressState } from '../lib/store';
import { dueCount } from '../lib/stats';
import { SUBJECT_ACCENT } from '../lib/subjectStyle';

// Tools load only when opened.
const GitPlayground = lazy(() => import('../tools/GitPlayground'));
const DesignStudio = lazy(() => import('../tools/DesignStudio'));
const SqlLab = lazy(() => import('../tools/SqlLab'));
const InequalityLab = lazy(() => import('../tools/InequalityLab'));

const TOOL_LABEL: Record<SubjectTool, string> = {
  'git-playground': 'playground.title',
  'design-studio': 'studio.title',
  'sql-lab': 'sqllab.title',
  'inequality-lab': 'ineq.title',
};

interface NavItem {
  id: string;
  label: string;
  /** Short status shown next to the label, such as "3/8" or "12 due". */
  status?: string;
}

/** Sections of one week, grouped as Learn, Practise, and Organise. */
function weekSections(week: WeekContent, tools: SubjectTool[], s: ProgressState, t: (k: string, v?: Record<string, string | number>) => string): { group: string; items: NavItem[] }[] {
  const lessonsDone = week.lessons.filter((l) => s.lessonsDone[l.id]).length;
  const due = dueCount(week, s, new Date());
  const quiz = s.quizzes[week.id];
  const labsDone = week.labs.filter((lab) => lab.steps.every((st) => s.stepsDone[st.id])).length;
  const planDone = week.plan.filter((_, i) => s.planStatus[`${week.id}:${i}`] === 'done').length;
  const toolStatus = (tool: SubjectTool): string | undefined => {
    const prefix = { 'git-playground': 'gitpg:', 'sql-lab': 'sqllab:', 'design-studio': 'studio:', 'inequality-lab': 'ineq:' }[tool];
    const n = Object.keys(s.stepsDone).filter((k) => k.startsWith(prefix)).length;
    return n ? t('week.solvedN', { n }) : undefined;
  };
  return [
    { group: t('week.groupLearn'), items: [
      { id: 'overview', label: t('week.overview') },
      { id: 'lessons', label: t('week.lessons'), status: `${lessonsDone}/${week.lessons.length}` },
    ] },
    { group: t('week.groupPractise'), items: [
      { id: 'flashcards', label: t('week.flashcards'), status: due ? t('week.dueN', { n: due }) : undefined },
      { id: 'quiz', label: t('week.quiz'), status: quiz ? `${quiz.score}/${quiz.total}` : undefined },
      { id: 'labs', label: t('week.labs'), status: week.labs.length ? `${labsDone}/${week.labs.length}` : undefined },
      ...tools.map((tool) => ({ id: tool, label: t(TOOL_LABEL[tool]), status: toolStatus(tool) })),
    ] },
    { group: t('week.groupOrganise'), items: [
      { id: 'plan', label: t('week.plan'), status: `${planDone}/${week.plan.length}` },
      { id: 'progress', label: t('week.progress') },
      { id: 'resources', label: t('week.resources') },
    ] },
  ];
}

/**
 * One week is the unit of study: everything for its topics lives here, in a
 * left-hand table of contents (a scrollable strip on small screens).
 */
export function WeekPage() {
  const { weekId = '', tab = 'overview' } = useParams();
  const { t, pick } = useI18n();
  const progress = useProgress();
  const week = findWeek(weekId);
  if (!week) return <Navigate to="/" replace />;

  const place = placeOfWeek(week.id);
  const tools = week.tools;
  const data = week.toolData ?? {};
  const groups = weekSections(week, tools, progress, t);
  const ids = groups.flatMap((g) => g.items.map((i) => i.id));
  if (!ids.includes(tab)) return <Navigate to={`/week/${weekId}`} replace />;

  const accent = SUBJECT_ACCENT[place?.subject.theme ?? 'default'];
  const path = (id: string) => (id === 'overview' ? `/week/${week.id}` : `/week/${week.id}/${id}`);
  const lessonTitles = Object.fromEntries(week.lessons.map((l) => [l.id, pick(l.title).text]));
  const loading = <p className="faint">{t('common.loading')}</p>;

  let body: ReactNode = null;
  if (tab === 'overview') body = <Overview week={week} />;
  else if (tab === 'lessons') body = <LessonsWithAnchor lessons={week.lessons} activities={week.activities} stories={week.stories} videos={renderedVideos(week.videos)} />;
  else if (tab === 'flashcards') body = <Deck cards={week.flashcards} />;
  else if (tab === 'quiz') body = <QuizRunner quizId={week.id} weekId={week.id} questions={week.questions} lessonTitles={lessonTitles} />;
  else if (tab === 'labs') body = <LabList labs={week.labs} sqlLabPath={tools.includes('sql-lab') ? path('sql-lab') : undefined} ineqLabPath={tools.includes('inequality-lab') ? path('inequality-lab') : undefined} />;
  else if (tab === 'git-playground') body = <Suspense fallback={loading}><GitPlayground missions={data.gitMissions ?? []} /></Suspense>;
  else if (tab === 'design-studio') body = <Suspense fallback={loading}><DesignStudio scenarios={data.studioScenarios ?? []} /></Suspense>;
  else if (tab === 'sql-lab') body = <Suspense fallback={loading}><SqlLab tasks={data.sqlTasks ?? []} /></Suspense>;
  else if (tab === 'inequality-lab') body = <Suspense fallback={loading}><InequalityLab problems={data.inequalityProblems ?? []} /></Suspense>;
  else if (tab === 'plan') body = <PlannerSection weeks={[week]} />;
  else if (tab === 'progress') body = <ProgressSection weeks={[week]} />;
  else if (tab === 'resources') body = <Resources week={week} />;

  const current = groups.flatMap((g) => g.items).find((i) => i.id === tab);

  return (
    <div className="week-page" style={{ ['--subject' as string]: accent }}>
      <Breadcrumbs
        items={[
          { label: t('nav.home'), to: '/' },
          { label: t('curriculum.term', { n: week.term }), to: `/term/${week.term}` },
          { label: t('curriculum.module', { n: week.module }), to: `/term/${week.term}/module/${week.module}` },
          ...(place ? [{ label: pick(place.subject.title).text, to: subjectPath(place) }] : []),
          { label: t('module.weekN', { n: week.week }) },
        ]}
      />

      <header className="week-head">
        <span className="week-numeral" aria-hidden="true">{week.week}</span>
        <div className="week-head-text">
          <p className="week-kicker">{place ? pick(place.subject.title).text : ''} — {t('module.weekN', { n: week.week })}</p>
          <h1>{pick(week.title).text}</h1>
          <ol className="lesson-strip" aria-label={t('week.lessonProgress', { done: week.lessons.filter((l) => progress.lessonsDone[l.id]).length, total: week.lessons.length })}>
            {week.lessons.map((l, i) => (
              <li key={l.id} className={progress.lessonsDone[l.id] ? 'is-done' : ''}>
                <Link to={`/week/${week.id}/lessons?lesson=${l.id}`} title={`${i + 1}. ${pick(l.title).text}`}>
                  <span className="sr-only">{i + 1}. {pick(l.title).text}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <div className="week-layout">
        <nav className="week-nav" aria-label={t('week.sections')}>
          {groups.map((g) => (
            <div key={g.group} className="week-nav-group">
              <p className="week-nav-title">{g.group}</p>
              <ul>
                {g.items.map((item) => (
                  <li key={item.id}>
                    <NavLink to={path(item.id)} end>
                      <span>{item.label}</span>
                      {item.status && <small>{item.status}</small>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <section className="week-content" aria-label={current?.label}>
          {tab !== 'overview' && tab !== 'lessons' && <h2 className="week-section-title">{current?.label}</h2>}
          {body}
        </section>
      </div>
    </div>
  );
}

/** A short orientation: why this week matters, what you will be able to do, and the path through it. */
function Overview({ week }: { week: WeekContent }) {
  const { t, pick } = useI18n();
  const progress = useProgress();
  return (
    <div className="overview">
      <p className="overview-intro">{pick(week.intro).text}</p>

      <section>
        <h2>{t('week.objectives')}</h2>
        <ul className="objective-list">
          {week.objectives.map((o, i) => <li key={i}>{pick(o).text}</li>)}
        </ul>
      </section>

      <section>
        <h2>{t('week.path')}</h2>
        <ol className="lesson-path">
          {week.lessons.map((l, i) => (
            <li key={l.id} className={progress.lessonsDone[l.id] ? 'is-done' : ''}>
              <Link to={`/week/${week.id}/lessons?lesson=${l.id}`}>
                <span className="lp-num">{i + 1}</span>
                <span className="lp-title">{pick(l.title).text}</span>
                <span className="lp-min">{t('common.minutes', { n: l.minutes })}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <dl className="week-facts">
        <div><dt>{t('week.estimate')}</dt><dd>{t('week.hours', { n: Math.round(week.estimatedMinutes / 60) })}</dd></div>
        <div><dt>{t('week.prerequisites')}</dt><dd>{week.prerequisites.map((p) => pick(p).text).join(' ')}</dd></div>
        <div><dt>{t('week.keyConcepts')}</dt><dd>{week.keyConcepts.map((c) => pick(c).text).join(', ')}</dd></div>
      </dl>
    </div>
  );
}

function LessonsWithAnchor({ lessons, activities, stories, videos }: { lessons: LessonType[]; activities: Activity[]; stories: Story[]; videos: Video[] }) {
  const [params] = useSearchParams();
  const target = params.get('lesson');

  useEffect(() => {
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [target]);

  return (
    <div className="lessons">
      {lessons.map((lesson, i) => (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          index={i}
          activities={activities.filter((a) => a.lessonId === lesson.id)}
          stories={stories.filter((s) => s.lessonId === lesson.id)}
          videos={videos.filter((v) => v.lessonId === lesson.id)}
        />
      ))}
    </div>
  );
}

function Resources({ week }: { week: WeekContent }) {
  const { t, pick } = useI18n();
  return (
    <div className="stack" style={{ gap: 28 }}>
      <section>
        <h3>{t('resources.originals')}</h3>
        <div className="res-grid">
          {week.documents.map((d) => (
            <DocumentCard key={d.file} weekId={week.id} title={pick(d.title).text} file={d.file} kind={d.kind} preview={d.preview} />
          ))}
        </div>
      </section>
      <section>
        <h3>{t('resources.external')}</h3>
        <div className="res-grid">
          {week.resources.map((r) => (
            <LinkCard key={r.id} resource={r} note={pick(r.note).text}
              verified={r.verifiedOn ? t('resources.verified', { date: r.verifiedOn }) : t('resources.unverified')} />
          ))}
        </div>
      </section>
    </div>
  );
}
