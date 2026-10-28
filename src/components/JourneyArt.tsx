import { useI18n } from '../i18n';
import { terms } from '../content/curriculum';

/**
 * Home illustration: the eight terms as stations on one path. The current
 * term pulses; finished stretches of the path are solid.
 */
export function JourneyArt({ current }: { current: number }) {
  const { locale } = useI18n();
  const pts = terms.map((t, i) => ({ x: 40 + i * 62, y: 150 + Math.sin(i * 0.9) * 55, t }));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  return (
    <svg className="journey" viewBox="0 0 520 280" role="img" aria-label={{ en: `An eight-term journey; you are in term ${current}`, es: `Recorrido de 8 términos; estás en el término ${current}`, pt: `Uma jornada de 8 períodos; você está no período ${current}` }[locale]}>
      <path d={d} className="journey-path" />
      <path d={pts.slice(0, current).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} className="journey-done" />
      {pts.map(({ x, y, t }) => {
        const isNow = t.number === current;
        return (
          <g key={t.number} className={isNow ? 'journey-now' : ''}>
            {isNow && <circle cx={x} cy={y} r="24" className="journey-halo" style={{ stroke: `hsl(${t.hue} 40% 45%)` }} />}
            <circle cx={x} cy={y} r={isNow ? 17 : 13} fill="var(--panel)" stroke={`hsl(${t.hue} 38% ${t.number <= current ? 45 : 70}%)`} strokeWidth={isNow ? 5 : 3.5} />
            <text x={x} y={y + 5} textAnchor="middle" className="journey-num">{t.number}</text>
            {isNow && <text x={x} y={y - 34} textAnchor="middle" className="journey-label">{{ en: 'You are here', es: 'Estás aquí', pt: 'Você está aqui' }[locale]}</text>}
          </g>
        );
      })}
    </svg>
  );
}
