import { useI18n } from '../i18n';
import type { Lesson } from '../content/types';
import { hueFor } from './Lesson';

/** Visual path through the week: one coloured node per lesson, filled when done. */
export function WeekMap({ lessons, done, onJump }: {
  lessons: Lesson[];
  done: Record<string, true>;
  onJump: (id: string) => void;
}) {
  const { t, pick } = useI18n();
  return (
    <ol className="week-map" aria-label={t('week.weekMap')}>
      {lessons.map((lesson, i) => {
        const isDone = Boolean(done[lesson.id]);
        return (
          <li key={lesson.id} style={{ ['--hue' as string]: hueFor(i) }}>
            <button type="button" className={`map-node ${isDone ? 'is-done' : ''}`} onClick={() => onJump(lesson.id)}>
              <span className="map-dot" aria-hidden="true">{isDone ? '✓' : i + 1}</span>
              <span className="map-label">{pick(lesson.title).text}</span>
              <span className="faint">{t('common.minutes', { n: lesson.minutes })}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
