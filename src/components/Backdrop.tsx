import { useMemo } from 'react';
import { findSubject, findTerm, placeOfWeek } from '../content/curriculum';
import type { SubjectTheme } from '../content/types';

export type BackdropVariant = 'program' | 'term' | 'commits' | 'data' | 'cards' | 'quiz' | 'terminal' | 'calm';

/** Seeded pseudo-random numbers, so the backdrop looks the same on every visit. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const PALETTE = ['#2F6F73', '#5E8C7A', '#C0704F', '#7A6A8C', '#B98A3E', '#3A4E74'];

/**
 * A quiet animated background that matches the section's subject. It sits
 * behind the content, is hidden from assistive tech, and stops moving when the
 * user prefers reduced motion.
 */
export function Backdrop({ variant, hue }: { variant: BackdropVariant; hue?: number }) {
  const shapes = useMemo(() => {
    const rnd = seeded(variant.length * 97 + 13);
    return Array.from({ length: 9 }, (_, i) => ({
      x: rnd() * 100,
      y: rnd() * 100,
      size: 18 + rnd() * 46,
      delay: -rnd() * 30,
      duration: 26 + rnd() * 26,
      color: PALETTE[i % PALETTE.length],
      glyph: ['{ }', '</>', '$ git', '⑂', '✓', '#', '( )'][i % 7],
    }));
  }, [variant]);

  return (
    <div className={`backdrop backdrop-${variant}`} aria-hidden="true">
      {variant === 'commits' && (
        <svg className="bd-commits" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[160, 360, 560].map((y, row) => (
            <g key={y} className="bd-row">
              <path d={`M -200 ${y} L 1400 ${y}`} stroke={PALETTE[row]} />
              {Array.from({ length: 12 }, (_, i) => (
                <circle key={i} cx={-150 + i * 140 + row * 40} cy={y} r={7} fill="var(--bg)" stroke={PALETTE[row]} />
              ))}
              <path d={`M ${300 + row * 120} ${y} C ${380 + row * 120} ${y}, ${400 + row * 120} ${y + 100}, ${480 + row * 120} ${y + 100}`} stroke={PALETTE[row + 2]} />
            </g>
          ))}
        </svg>
      )}
      {variant === 'program' && (
        <svg className="bd-commits bd-program" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {shapes.map((s, i) => {
            const next = shapes[(i + 3) % shapes.length];
            return (
              <g key={i}>
                <line x1={s.x * 12} y1={s.y * 8} x2={next.x * 12} y2={next.y * 8} stroke={s.color} />
                <circle cx={s.x * 12} cy={s.y * 8} r={4 + (i % 3) * 2} fill={s.color} />
              </g>
            );
          })}
        </svg>
      )}
      {variant === 'data' && (
        <svg className="bd-commits bd-data" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[[120, 140], [520, 90], [900, 220], [260, 480], [700, 520], [1020, 600]].map(([x, y], i) => (
            <g key={i} stroke={PALETTE[i % PALETTE.length]}>
              {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={x + c * 52} y={y + r * 26} width="52" height="26" fill={r === 0 ? 'currentColor' : 'none'} />))}
            </g>
          ))}
          {[[430, 330], [1080, 380], [140, 700]].map(([x, y], i) => (
            <g key={`c${i}`} stroke={PALETTE[(i + 2) % PALETTE.length]} fill="none">
              <ellipse cx={x} cy={y} rx="46" ry="14" />
              <path d={`M ${x - 46} ${y} L ${x - 46} ${y + 70} A 46 14 0 0 0 ${x + 46} ${y + 70} L ${x + 46} ${y}`} />
            </g>
          ))}
        </svg>
      )}
      {variant !== 'commits' && variant !== 'program' && variant !== 'data' && shapes.map((s, i) => (
        <span
          key={i}
          className="bd-shape"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: variant === 'calm' || variant === 'term' ? s.size * 4 : undefined,
            height: variant === 'calm' || variant === 'term' ? s.size * 4 : undefined,
            fontSize: variant === 'terminal' ? `${0.7 + s.size / 60}rem` : undefined,
            color: variant === 'term' && hue !== undefined ? `hsl(${(hue + i * 14) % 360} 38% 50%)` : s.color,
            borderColor: s.color,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          {variant === 'terminal' ? s.glyph : variant === 'quiz' ? (i % 2 ? '?' : '✓') : ''}
        </span>
      ))}
    </div>
  );
}

const THEME_VARIANT: Record<SubjectTheme, BackdropVariant> = { 'version-control': 'commits', databases: 'data', default: 'calm' };

/**
 * Picks the backdrop for a route: the program on the home page, the term's
 * colour on term and module pages, and inside a subject the subject's own
 * theme, with a different mood for cards, quizzes, and planning sections.
 */
export function backdropForPath(path: string): { variant: BackdropVariant; hue?: number } {
  if (path === '/') return { variant: 'program' };
  const week = path.match(/^\/week\/([^/]+)/);
  if (week) {
    const place = placeOfWeek(week[1]);
    return { variant: place ? THEME_VARIANT[place.subject.theme] : 'calm', hue: place?.term.hue };
  }
  const m = path.match(/^\/term\/(\d+)(?:\/module\/(\d+)(?:\/([^/]+)(?:\/([^/]+))?)?)?/);
  if (!m) return { variant: 'calm' };
  const hue = findTerm(Number(m[1]))?.hue;
  if (!m[3]) return { variant: 'term', hue };
  const subject = findSubject(Number(m[1]), Number(m[2]), m[3]);
  const section = m[4] ?? 'weeks';
  if (section === 'flashcards') return { variant: 'cards', hue };
  if (section === 'quizzes') return { variant: 'quiz', hue };
  if (['planner', 'progress', 'resources'].includes(section)) return { variant: 'calm', hue };
  if (section === 'git-playground' || section === 'labs') return { variant: subject?.theme === 'databases' ? 'data' : 'terminal', hue };
  return { variant: subject ? THEME_VARIANT[subject.theme] : 'calm', hue };
}
