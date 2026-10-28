import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Localized, Question } from '../content/types';
import { useI18n } from '../i18n';
import { gradeQuestion, summarise, weakLessons, type Response } from '../lib/quizScore';
import { updateState, useProgress } from '../lib/store';
import { isChoice } from '../lib/grading';

/** Runs one quiz: answer everything, submit, then review each answer with its explanation. */
export function QuizRunner({ quizId, weekId, questions, lessonTitles }: {
  quizId: string;
  weekId: string;
  questions: Question[];
  lessonTitles: Record<string, string>;
}) {
  const { t, pick } = useI18n();
  const [responses, setResponses] = useState<Record<string, Response>>({});
  const [result, setResult] = useState<ReturnType<typeof summarise> | null>(null);
  const progress = useProgress();
  const attempt = progress.quizzes[quizId];

  const unanswered = questions.filter((q) => responses[q.id] === undefined || responses[q.id] === null || responses[q.id] === '').length;

  function set(id: string, value: Response) {
    setResponses((r) => ({ ...r, [id]: value }));
  }

  function submit() {
    const summary = summarise(questions, responses);
    setResult(summary);
    updateState((s) => {
      const best = s.quizzes[quizId];
      const keepBest = !best || summary.score > best.score;
      return {
        ...s,
        quizzes: keepBest ? { ...s.quizzes, [quizId]: { score: summary.score, total: summary.total, at: new Date().toISOString() } } : s.quizzes,
        missed: { ...s.missed, [quizId]: summary.missed },
      };
    });
  }

  function reset() {
    setResponses({});
    setResult(null);
  }

  const weak = useMemo(
    () => (result ? weakLessons(questions, result.missed) : []),
    [questions, result],
  );

  return (
    <div>
      {attempt && !result && (
        <p className="muted">{t('quiz.bestScore', { s: attempt.score, t: attempt.total })}</p>
      )}

      {result && (
        <section className="card" aria-live="polite" style={{ marginBottom: 24 }}>
          <p className="score-ring">{t('quiz.score', { s: result.score, t: result.total })}</p>
          {weak.length > 0 && (
            <>
              <h3>{t('quiz.weakAreas')}</h3>
              <ul className="weak">
                {weak.map((w) => (
                  <li key={w.lessonId}>
                    <Link to={lessonLink(weekId, w.lessonId)}>{lessonTitles[w.lessonId] ?? w.lessonId}</Link> · {w.count}
                  </li>
                ))}
              </ul>
            </>
          )}
          <button type="button" className="btn" onClick={reset}>{t('quiz.retry')}</button>
        </section>
      )}

      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {questions.map((q, n) => {
          const graded = result ? gradeQuestion(q, responses[q.id] ?? null) : null;
          return (
            <li key={q.id} className="question" id={q.id}>
              <div className="question-meta">
                <span className="badge">{n + 1} / {questions.length}</span>
                <span className="badge">{t(`quiz.typeLabels.${q.type}`)}</span>
                <Link className="faint" to={lessonLink(weekId, q.lessonId)}>{lessonTitles[q.lessonId] ?? ''}</Link>
                {graded !== null && (
                  <span className={`badge ${graded ? 'badge-good' : 'badge-bad'}`}>{graded ? '✓' : '✗'}</span>
                )}
              </div>
              <p><strong>{pick(q.prompt).text}</strong></p>
              <QuestionInput q={q} value={responses[q.id]} onChange={(v) => set(q.id, v)} disabled={result !== null} />
              {result && (
                <div className="explain">
                  <p>{pick(q.explanation).text}</p>
                  {isChoice(q) && q.whyWrong && (
                    <details>
                      <summary>{t('quiz.whyWrong')}</summary>
                      <ul>
                        {q.options.map((opt, i) => (
                          <li key={i}><strong>{pick(opt).text}:</strong> {q.whyWrong?.[i] ? pick(q.whyWrong[i]).text : '—'}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!result && (
        <div className="toolbar">
          <button type="button" className="btn btn-primary" onClick={submit} disabled={unanswered > 0}>
            {t('quiz.submit')}
          </button>
          {unanswered > 0 && <span className="faint">{t('quiz.selectAll')}</span>}
        </div>
      )}
    </div>
  );
}

/** Deep link to a lesson inside a week; the week page scrolls to it. */
export function lessonLink(weekId: string, lessonId: string): string {
  return `/week/${weekId}/lessons?lesson=${lessonId}`;
}

function QuestionInput({ q, value, onChange, disabled }: {
  q: Question;
  value: Response | undefined;
  onChange: (v: Response) => void;
  disabled: boolean;
}) {
  const { t, pick } = useI18n();
  const name = `q-${q.id}`;

  if (isChoice(q)) {
    return (
      <>
        {q.code && <pre className="code"><code>{q.code}</code></pre>}
        <div role="radiogroup" aria-label={pick(q.prompt).text}>
          {q.options.map((opt, i) => (
            <label key={i} className="option">
              <input type="radio" name={name} checked={value === i} disabled={disabled} onChange={() => onChange(i)} />
              <span>{pick(opt).text}</span>
            </label>
          ))}
        </div>
      </>
    );
  }

  if (q.type === 'matching') {
    const current = Array.isArray(value) ? value : q.left.map(() => -1);
    return (
      <div>
        {q.left.map((left, i) => (
          <div className="match-row" key={i}>
            <span>{pick(left).text}</span>
            <select
              aria-label={`${t('quiz.matchLeft')}: ${pick(left).text}`}
              value={current[i]}
              disabled={disabled}
              onChange={(e) => {
                const next = [...current];
                next[i] = Number(e.target.value);
                onChange(next);
              }}
            >
              <option value={-1}>—</option>
              {q.right.map((r, j) => (
                <option key={j} value={j}>{pick(r).text}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }

  // Fill-blank and short-answer: plain text input.
  const text = typeof value === 'string' ? value : '';
  const isShort = q.type === 'short-answer';
  return isShort ? (
    <textarea
      id={name}
      aria-label={pick(q.prompt as Localized).text}
      rows={3}
      value={text}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%' }}
    />
  ) : (
    <input
      id={name}
      type="text"
      aria-label={t('quiz.yourAnswer')}
      value={text}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
