import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import { formatPieces, prettySource, solve } from '../lib/inequality';

const EXAMPLES = ['x^2 - 5x + 6 <= 0', 'abs(x - 1) > 2', '(x + 1)/(x - 3) >= 0', '2x + 3 >= -5'];
const LO = -6;
const HI = 6;

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
  } catch {
    return false;
  }
}

/**
 * Calculus hero: an inequality and its solution drawn on the number line,
 * cycling through four kinds. With reduced motion it stays on one and the
 * dots let the learner step through them.
 */
export function MathHeroDemo() {
  const { locale } = useI18n();
  const w = (en: string, es: string, pt: string) => ({ en, es, pt })[locale];
  const reduced = useMemo(reducedMotion, []);
  const solved = useMemo(() => EXAMPLES.map((src) => ({ text: prettySource(src).join('; '), pieces: solve(src).pieces })), []);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % EXAMPLES.length), 4200);
    return () => window.clearTimeout(id);
  }, [i, reduced]);

  const sx = (x: number) => 20 + ((Math.min(Math.max(x, LO), HI) - LO) / (HI - LO)) * 320;
  const { text, pieces } = solved[i];
  return (
    <figure className="math-demo" aria-label={w('Demo: inequalities and their solutions on the number line', 'Demostración: desigualdades y sus soluciones en la recta numérica', 'Demonstração: desigualdades e suas soluções na reta numérica')}>
      <p className="math-demo-expr" key={`t${i}`}>{text}</p>
      <svg viewBox="0 0 360 76" role="img" aria-label={`${text}: ${formatPieces(pieces)}`}>
        <line className="nl-axis" x1={14} x2={346} y1={44} y2={44} />
        {Array.from({ length: HI - LO + 1 }, (_, k) => LO + k).map((v) => (
          <g key={v}>
            <line className="nl-tick" x1={sx(v)} x2={sx(v)} y1={40} y2={48} />
            {v % 2 === 0 && <text className="nl-tick-label" x={sx(v)} y={66} textAnchor="middle">{v < 0 ? `−${-v}` : v}</text>}
          </g>
        ))}
        <g className="math-demo-sol" key={`s${i}`}>
          {pieces.map((p, j) => (
            <g key={j}>
              <line className="math-demo-seg" pathLength={1} x1={sx(p.lo)} x2={sx(p.hi)} y1={44} y2={44} />
              {p.lo === -Infinity && <path className="nl-arrow" d={`M${12},44 l9,-6 v12 z`} />}
              {p.hi === Infinity && <path className="nl-arrow" d={`M${348},44 l-9,-6 v12 z`} />}
              {Number.isFinite(p.lo) && <circle className={p.loIn ? 'nl-dot is-closed' : 'nl-dot'} cx={sx(p.lo)} cy={44} r={5.5} />}
              {Number.isFinite(p.hi) && <circle className={p.hiIn ? 'nl-dot is-closed' : 'nl-dot'} cx={sx(p.hi)} cy={44} r={5.5} />}
            </g>
          ))}
        </g>
      </svg>
      <figcaption>
        <strong key={`a${i}`}>{formatPieces(pieces)}</strong>
        <span className="math-demo-dots">
          {EXAMPLES.map((src, k) => (
            <button key={src} type="button" aria-label={solved[k].text} aria-pressed={k === i} onClick={() => setI(k)} />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
