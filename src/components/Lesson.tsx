import { useId, useState } from 'react';
import type { KnowledgeCheck as CheckType, Lesson as LessonType } from '../content/types';
import { ExerciseList } from './Exercises';
import { ActivityList } from './Activities';
import type { Activity, Story, Video } from '../content/types';
import { VideoPlayer } from './VideoPlayer';
import { StoryPlayer } from './StoryPlayer';
import { useI18n } from '../i18n';
import { touchStudyDay, updateState, useProgress } from '../lib/store';
import { CodeBlock } from './CodeBlock';
import { Diagram } from './Diagrams';
import { Rich } from './Rich';

/** Renders one lesson: body, diagram, code, takeaways, check, pitfalls, and completion. */
export function Lesson({ lesson, index, activities = [], stories = [], videos = [] }: {
  lesson: LessonType;
  index: number;
  activities?: Activity[];
  stories?: Story[];
  videos?: Video[];
}) {
  const { t, pick, locale } = useI18n();
  const progress = useProgress();
  const done = Boolean(progress.lessonsDone[lesson.id]);
  const title = pick(lesson.title);
  const usesEnglishBody = locale !== 'en' && lesson.body.some((p) => !p[locale]);

  function toggleDone() {
    updateState((s) => {
      const next = { ...s, lessonsDone: { ...s.lessonsDone } };
      if (next.lessonsDone[lesson.id]) delete next.lessonsDone[lesson.id];
      else next.lessonsDone[lesson.id] = true;
      return touchStudyDay(next, new Date());
    });
  }

  return (
    <article className="lesson" id={lesson.id} aria-labelledby={`${lesson.id}-title`} style={{ ['--hue' as string]: hueFor(index) }}>
      <header className="lesson-band">
        <span className="lesson-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <p className="eyebrow">{t('week.lessonN', { n: index + 1 })}</p>
          <h2 id={`${lesson.id}-title`}><Rich text={title.text} /></h2>
        </div>
      </header>
      <div className="lesson-meta">
        <span>{t('common.minutes', { n: lesson.minutes })}</span>
        {done && <span className="badge badge-good">{t('common.done')}</span>}
      </div>
      {(title.fallback || usesEnglishBody) && <span className="translation-note">{t('common.translationMissing')}</span>}

      <section className="takeaways lesson-brief" aria-label={t('week.takeaways')}>
        <h3>{t('week.inShort')}</h3>
        <ul>
          {lesson.takeaways.map((item, i) => (
            <li key={i}><Rich text={pick(item).text} /></li>
          ))}
        </ul>
      </section>

      {lesson.diagram && <Diagram kind={lesson.diagram} />}

      {lesson.code && (
        <figure className="lesson-code">
          <CodeBlock code={lesson.code.source} label={lesson.code.language} />
          <figcaption className="faint"><Rich text={pick(lesson.code.caption).text} /></figcaption>
        </figure>
      )}

      {videos.map((v) => <VideoPlayer key={v.id} video={v} />)}

      <div className="lesson-body">
        {lesson.body.slice(0, 2).map((p, i) => (
          <p key={i}><Rich text={pick(p).text} /></p>
        ))}
        {lesson.body.length > 2 && (
          <details className="fold">
            <summary>{t('week.readMore', { n: lesson.body.length - 2 })}</summary>
            {lesson.body.slice(2).map((p, i) => (
              <p key={i}><Rich text={pick(p).text} /></p>
            ))}
          </details>
        )}
      </div>

      {lesson.analogy && (
        <aside className="analogy" aria-label={t('week.analogy')}>
          <strong>{t('week.analogy')}</strong>
          <p><Rich text={pick(lesson.analogy).text} /></p>
        </aside>
      )}

      {stories.map((story) => <StoryPlayer key={story.id} story={story} />)}

      {lesson.check && <KnowledgeCheck check={lesson.check} />}

      {lesson.pitfalls && lesson.pitfalls.length > 0 && (
        <details className="fold fold-card" aria-label={t('week.commonMistakes')}>
          <summary>{t('week.commonMistakes')} <span className="faint">({lesson.pitfalls.length})</span></summary>
          {lesson.pitfalls.map((p, i) => (
            <div className="pitfall" key={i}>
              <p><strong>✗</strong> <Rich text={pick(p.mistake).text} /></p>
              <p><strong>✓ {t('week.fix')}:</strong> <Rich text={pick(p.fix).text} /></p>
            </div>
          ))}
        </details>
      )}

      {lesson.exercises && lesson.exercises.length > 0 && (
        <details className="fold fold-card">
          <summary>{t('week.exercises')} <span className="faint">({lesson.exercises.length})</span></summary>
          <ExerciseList exercises={lesson.exercises} bare />
        </details>
      )}

      <ActivityList activities={activities} />

      <div style={{ marginTop: 20 }}>
        <button type="button" className={done ? 'btn' : 'btn btn-primary'} onClick={toggleDone} aria-pressed={done}>
          {done ? t('common.markUndone') : t('common.markDone')}
        </button>
      </div>
    </article>
  );
}

/** Each lesson gets its own hue, so the week reads as a colourful sequence rather than one block. */
export function hueFor(index: number): number {
  return (190 + index * 47) % 360;
}

function KnowledgeCheck({ check }: { check: CheckType }) {
  const { t, pick } = useI18n();
  const groupId = useId();
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = submitted && choice === check.answer;

  return (
    <section className="check" aria-label={t('week.knowledgeCheck')}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (choice !== null) setSubmitted(true);
        }}
      >
        <fieldset>
          <legend>{t('week.knowledgeCheck')}: <Rich text={pick(check.question).text} /></legend>
          {check.options.map((opt, i) => {
            const state = submitted ? (i === check.answer ? 'is-correct' : i === choice ? 'is-wrong' : '') : '';
            return (
              <label className={`option ${state}`} key={i}>
                <input
                  type="radio"
                  name={groupId}
                  value={i}
                  checked={choice === i}
                  onChange={() => {
                    setChoice(i);
                    setSubmitted(false);
                  }}
                />
                <span><Rich text={pick(opt).text} /></span>
              </label>
            );
          })}
        </fieldset>
        <button type="submit" className="btn" disabled={choice === null}>{t('week.check')}</button>
      </form>
      {submitted && (
        <>
          <p className={`feedback ${correct ? 'good' : 'bad'}`} role="status">
            {correct ? t('week.correct') : t('week.incorrect')}
          </p>
          <p className="explain"><Rich text={pick(check.explanation).text} /></p>
        </>
      )}
    </section>
  );
}
