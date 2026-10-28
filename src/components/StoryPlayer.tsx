import { useEffect, useMemo, useState } from 'react';
import type { Story } from '../content/types';
import { useI18n } from '../i18n';
import { LANE_COLORS } from './GitGraph';

const SCENE_MS = 4200;

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
  } catch {
    return false;
  }
}

/**
 * A short animated story. A token glides between stations, each scene has a
 * caption, and the viewer can play, pause, or step. Autoplay is off when the
 * user prefers reduced motion.
 */
export function StoryPlayer({ story }: { story: Story }) {
  const { t, pick } = useI18n();
  const reduced = useMemo(reducedMotion, []);
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const total = story.scenes.length;
  const current = story.scenes[scene];

  useEffect(() => {
    if (!playing) return;
    if (scene >= total - 1) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setScene((s) => s + 1), SCENE_MS);
    return () => window.clearTimeout(id);
  }, [playing, scene, total]);

  const n = story.stations.length;
  const width = 640;
  const gap = (width - 120) / Math.max(1, n - 1);
  const xOf = (i: number) => 60 + i * gap;
  const y = 70;
  const visited = new Set(story.scenes.slice(0, scene + 1).map((s) => s.at));
  const moodColor = current.mood === 'alert' ? '#C0704F' : current.mood === 'ok' ? '#5E8C7A' : '#2F6F73';

  return (
    <figure className="story" aria-roledescription="animated story">
      <header className="story-head">
        <span className="story-badge">▶ {t('story.label')}</span>
        <h3>{pick(story.title).text}</h3>
      </header>

      <svg className="story-stage" viewBox={`0 0 ${width} 150`} role="img" aria-label={pick(current.caption).text}>
        <line x1={xOf(0)} y1={y} x2={xOf(n - 1)} y2={y} className="story-track" />
        {story.stations.map((st, i) => {
          const active = i === current.at;
          const color = LANE_COLORS[i % LANE_COLORS.length];
          return (
            <g key={i} className={`story-station ${active ? 'is-active' : ''} ${visited.has(i) ? 'is-visited' : ''}`}>
              <circle cx={xOf(i)} cy={y} r={active ? 28 : 24} fill="var(--panel)" stroke={color} strokeWidth={active ? 4 : 2.5} />
              <text x={xOf(i)} y={y + 6} textAnchor="middle" className="story-glyph" fill={color}>{st.glyph}</text>
              <text x={xOf(i)} y={y + 52} textAnchor="middle" className="story-label">{pick(st.label).text}</text>
            </g>
          );
        })}
        <g className="story-token" style={{ transform: `translate(${xOf(current.at)}px, ${y - 44}px)`, transition: reduced ? 'none' : undefined }}>
          <circle r={10} fill={moodColor} />
          <circle r={16} fill="none" stroke={moodColor} strokeOpacity={0.35} strokeWidth={4} className="story-ring" />
        </g>
      </svg>

      <figcaption className={`story-caption mood-${current.mood ?? 'neutral'}`} aria-live="polite">
        <span className="story-step">{scene + 1}/{total}</span> {pick(current.caption).text}
      </figcaption>

      <div className="story-progress" aria-hidden="true">
        {story.scenes.map((_, i) => (
          <span key={i} className={i < scene ? 'is-past' : i === scene ? (playing ? 'is-now playing' : 'is-now') : ''} style={{ ['--ms' as string]: `${SCENE_MS}ms` }} />
        ))}
      </div>

      <div className="story-controls">
        <button type="button" className="btn btn-small" onClick={() => { setPlaying(false); setScene((s) => Math.max(0, s - 1)); }} disabled={scene === 0}>
          ← {t('common.previous')}
        </button>
        <button
          type="button"
          className="btn btn-small btn-primary"
          onClick={() => {
            if (scene >= total - 1) { setScene(0); setPlaying(!reduced); return; }
            setPlaying((p) => !p);
          }}
        >
          {scene >= total - 1 ? `↺ ${t('story.replay')}` : playing ? `❚❚ ${t('story.pause')}` : `▶ ${t('story.play')}`}
        </button>
        <button type="button" className="btn btn-small" onClick={() => { setPlaying(false); setScene((s) => Math.min(total - 1, s + 1)); }} disabled={scene >= total - 1}>
          {t('common.next')} →
        </button>
      </div>
    </figure>
  );
}
