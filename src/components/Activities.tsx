import { useMemo, useState } from 'react';
import type { Activity } from '../content/types';
import { useI18n } from '../i18n';
import { normalise } from '../lib/grading';

/** Interactive puzzles: order steps, fill in code, or rebuild a command from tokens. */
export function ActivityList({ activities }: { activities: Activity[] }) {
  const { t } = useI18n();
  if (activities.length === 0) return null;
  return (
    <section className="activities" aria-label={t('week.activities')}>
      <h3>{t('week.activities')}</h3>
      <div className="activity-grid">
        {activities.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </div>
    </section>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const { t, pick } = useI18n();
  const [done, setDone] = useState<null | boolean>(null);
  const kindLabel = { order: t('activity.order'), 'code-fill': t('activity.codeFill'), scramble: t('activity.scramble'), classify: t('activity.classify') }[activity.kind];

  return (
    <article className={`activity kind-${activity.kind} ${done === true ? 'is-solved' : ''}`}>
      <header className="activity-head">
        <span className="badge">{kindLabel}</span>
        {done === true && <span className="badge badge-good">✓ {t('activity.solved')}</span>}
      </header>
      <h4>{pick(activity.title).text}</h4>
      <p className="muted">{pick(activity.prompt).text}</p>
      {activity.kind === 'order' && <OrderPuzzle items={activity.items.map((i) => pick(i).text)} onSolved={setDone} />}
      {activity.kind === 'code-fill' && <CodeFill template={activity.template} blanks={activity.blanks} onSolved={setDone} />}
      {activity.kind === 'scramble' && <Scramble tokens={activity.tokens} onSolved={setDone} />}
      {activity.kind === 'classify' && (
        <Classify
          buckets={activity.buckets.map((b) => pick(b).text)}
          items={activity.items.map((i) => ({ text: pick(i.text).text, bucket: i.bucket }))}
          onSolved={setDone}
        />
      )}
      {done !== null && <p className={`feedback ${done ? 'good' : 'bad'}`} role="status">{done ? t('activity.correct') : t('activity.tryAgain')}</p>}
      {done === true && <p className="explain">{pick(activity.explanation).text}</p>}
    </article>
  );
}

/**
 * The correct order is the order of `items`. State holds item indices, so the
 * puzzle keeps its arrangement when the language (and so the text) changes.
 */
function OrderPuzzle({ items, onSolved }: { items: string[]; onSolved: (ok: boolean) => void }) {
  const { t } = useI18n();
  const [order, setOrder] = useState<number[]>(() => {
    const idx = items.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx.every((v, i) => v === i) ? [...idx].reverse() : idx;
  });

  function move(from: number, to: number) {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
    onSolved(false);
  }

  return (
    <div>
      <ol className="order-list">
        {order.map((itemIndex, i) => (
          <li key={itemIndex} className="order-item">
            <span className="order-num">{i + 1}</span>
            <span className="order-text">{items[itemIndex]}</span>
            <span className="order-moves">
              <button type="button" className="btn btn-small btn-ghost" aria-label={`${t('activity.moveUp')}: ${items[itemIndex]}`} onClick={() => move(i, i - 1)} disabled={i === 0}>↑</button>
              <button type="button" className="btn btn-small btn-ghost" aria-label={`${t('activity.moveDown')}: ${items[itemIndex]}`} onClick={() => move(i, i + 1)} disabled={i === order.length - 1}>↓</button>
            </span>
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn-primary" onClick={() => onSolved(order.every((v, i) => v === i))}>{t('activity.check')}</button>
    </div>
  );
}

/** Each {n} placeholder is replaced by a text input. Accepts "|"-separated alternatives. */
function CodeFill({ template, blanks, onSolved }: { template: string; blanks: string[]; onSolved: (ok: boolean) => void }) {
  const { t } = useI18n();
  const [values, setValues] = useState<string[]>(blanks.map(() => ''));
  const parts = useMemo(() => template.split(/(\{\d+\})/), [template]);

  function check() {
    const ok = blanks.every((b, i) => b.split('|').some((alt) => normalise(alt) === normalise(values[i] ?? '')));
    onSolved(ok);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <pre className="code code-fill">
        <code>
          {parts.map((part, i) => {
            const m = part.match(/^\{(\d+)\}$/);
            if (!m) return <span key={i}>{part}</span>;
            const idx = Number(m[1]);
            return (
              <input
                key={i}
                className="blank"
                aria-label={`${t('activity.blank')} ${idx + 1}`}
                value={values[idx]}
                onChange={(e) => {
                  const next = [...values];
                  next[idx] = e.target.value;
                  setValues(next);
                  onSolved(false);
                }}
                size={Math.max(6, (values[idx] ?? '').length + 2)}
                autoComplete="off"
                spellCheck={false}
              />
            );
          })}
        </code>
      </pre>
      <button type="submit" className="btn btn-primary">{t('activity.check')}</button>
    </form>
  );
}

/** Tap tokens in order to rebuild the command. Tokens shuffle on mount. */
function Scramble({ tokens, onSolved }: { tokens: string[]; onSolved: (ok: boolean) => void }) {
  const { t } = useI18n();
  const [pool, setPool] = useState<{ id: number; text: string }[]>(() =>
    tokens.map((text, id) => ({ id, text })).sort(() => Math.random() - 0.5),
  );
  const [picked, setPicked] = useState<{ id: number; text: string }[]>([]);

  function pick(item: { id: number; text: string }) {
    setPicked((p) => [...p, item]);
    setPool((p) => p.filter((x) => x.id !== item.id));
    onSolved(false);
  }

  function undo() {
    const last = picked[picked.length - 1];
    if (!last) return;
    setPicked((p) => p.slice(0, -1));
    setPool((p) => [...p, last]);
    onSolved(false);
  }

  function check() {
    onSolved(picked.length === tokens.length && picked.every((x, i) => x.text === tokens[i]));
  }

  return (
    <div>
      <div className="scramble-line" aria-live="polite">
        {picked.length === 0 ? <span className="faint">{t('activity.empty')}</span> : picked.map((x) => (
          <span key={x.id} className="token token-picked">{x.text}</span>
        ))}
      </div>
      <div className="scramble-pool">
        {pool.map((x) => (
          <button key={x.id} type="button" className="token" onClick={() => pick(x)}>{x.text}</button>
        ))}
      </div>
      <div className="toolbar">
        <button type="button" className="btn btn-small" onClick={undo} disabled={picked.length === 0}>{t('activity.undo')}</button>
        <button type="button" className="btn btn-small btn-primary" onClick={check} disabled={pool.length > 0}>{t('activity.check')}</button>
      </div>
    </div>
  );
}

/** Each item gets one button per bucket; all must be placed correctly. */
function Classify({ buckets, items, onSolved }: {
  buckets: string[];
  items: { text: string; bucket: number }[];
  onSolved: (ok: boolean) => void;
}) {
  const { t } = useI18n();
  const [choice, setChoice] = useState<(number | null)[]>(() => items.map(() => null));
  const [checked, setChecked] = useState(false);

  function check() {
    setChecked(true);
    onSolved(items.every((it, i) => choice[i] === it.bucket));
  }

  return (
    <div>
      <ul className="classify-list">
        {items.map((it, i) => {
          const state = checked && choice[i] !== null ? (choice[i] === it.bucket ? 'is-right' : 'is-wrong') : '';
          return (
            <li key={i} className={`classify-item ${state}`}>
              <span>{it.text}</span>
              <span className="classify-buttons" role="group" aria-label={it.text}>
                {buckets.map((b, j) => (
                  <button
                    key={j}
                    type="button"
                    className="chip"
                    aria-pressed={choice[i] === j}
                    onClick={() => {
                      const next = [...choice];
                      next[i] = j;
                      setChoice(next);
                      setChecked(false);
                      onSolved(false);
                    }}
                  >
                    {b}
                  </button>
                ))}
              </span>
            </li>
          );
        })}
      </ul>
      <button type="button" className="btn btn-primary" onClick={check} disabled={choice.some((c) => c === null)}>
        {t('activity.check')}
      </button>
    </div>
  );
}
