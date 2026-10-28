/**
 * A small decorative pattern per term. Each of the eight terms has its own
 * motif (rings, waves, grid, and so on) in its own hue, so cards and headers
 * are recognisable at a glance. Purely visual: hidden from assistive tech.
 */
export function TermArt({ term, hue, className = '' }: { term: number; hue: number; className?: string }) {
  const c1 = `hsl(${hue} 38% 46%)`;
  const c2 = `hsl(${(hue + 32) % 360} 34% 58%)`;
  const c3 = `hsl(${hue} 30% 80%)`;
  const motif = (term - 1) % 8;
  return (
    <svg className={`term-art ${className}`} viewBox="0 0 200 120" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="120" fill={`hsl(${hue} 32% 94%)`} className="term-art-bg" />
      {motif === 0 && [70, 50, 30].map((r, i) => <circle key={r} cx="150" cy="40" r={r} fill="none" stroke={[c1, c2, c3][i]} strokeWidth="6" />)}
      {motif === 1 && [0, 1, 2, 3].map((i) => <path key={i} d={`M -10 ${40 + i * 22} Q 40 ${20 + i * 22}, 90 ${40 + i * 22} T 210 ${40 + i * 22}`} fill="none" stroke={[c1, c2, c3, c1][i]} strokeWidth="5" />)}
      {motif === 2 && Array.from({ length: 24 }, (_, i) => <rect key={i} x={20 + (i % 8) * 22} y={20 + Math.floor(i / 8) * 28} width="14" height="14" rx="3" fill={i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3} />)}
      {motif === 3 && [0, 1, 2].map((i) => <polygon key={i} points={`${40 + i * 55},100 ${70 + i * 55},40 ${100 + i * 55},100`} fill={[c3, c2, c1][i]} />)}
      {motif === 4 && Array.from({ length: 7 }, (_, i) => <line key={i} x1={i * 34 - 20} y1="130" x2={i * 34 + 60} y2="-10" stroke={i % 2 ? c2 : c1} strokeWidth="9" strokeLinecap="round" />)}
      {motif === 5 && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={30 + i * 36} cy={60 + (i % 2 ? -18 : 18)} r={14} fill={[c1, c2, c3, c2, c1][i]} />)}
      {motif === 6 && [0, 1, 2].map((i) => <rect key={i} x={110 - i * 18} y={20 + i * 14} width={70 + i * 36} height={70 - i * 14} rx="14" fill="none" stroke={[c1, c2, c3][i]} strokeWidth="6" />)}
      {motif === 7 && Array.from({ length: 5 }, (_, i) => <path key={i} d={`M ${20 + i * 40} 110 C ${20 + i * 40} 60, ${60 + i * 40} 60, ${60 + i * 40} 10`} fill="none" stroke={[c1, c2, c3, c2, c1][i]} strokeWidth="5" />)}
    </svg>
  );
}
