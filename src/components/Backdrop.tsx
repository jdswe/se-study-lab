import { useMemo } from 'react';

export type BackdropVariant = 'program' | 'term' | 'commits' | 'cards' | 'quiz' | 'terminal' | 'calm';

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
      {variant !== 'commits' && variant !== 'program' && shapes.map((s, i) => (
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

/** Picks the backdrop for a route, so each section has its own atmosphere. */
export function variantForPath(path: string): BackdropVariant {
  if (path === '/') return 'program';
  if (/^\/term\/\d+$/.test(path)) return 'term';
  if (path.startsWith('/term/') || path.startsWith('/week')) return 'commits';
  if (path.startsWith('/flashcards')) return 'cards';
  if (path.startsWith('/quizzes')) return 'quiz';
  if (path.startsWith('/labs') || path.startsWith('/playground')) return 'terminal';
  return 'calm';
}
