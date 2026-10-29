import type { RepoState } from '../lib/gitSim';

/** Muted lane colours from the site palette, one per branch lane. */
export const LANE_COLORS = ['#2F6F73', '#C0704F', '#7A6A8C', '#5E8C7A', '#B98A3E', '#3A4E74'];

const DX = 64;
const DY = 58;
const PAD_X = 36;
const PAD_Y = 34;

/**
 * Draws a commit graph: one row (lane) per branch, commits left to right in
 * creation order, branch labels at each tip, and HEAD on the current branch.
 * New commits animate in; existing ones stay put because they are keyed by id.
 */
export function GitGraph({ state, label, compact = false, natural = false }: { state: RepoState; label: string; compact?: boolean; natural?: boolean }) {
  const laneOf = (branch: string) => state.lanes[branch] ?? 0;
  const pos = new Map(state.commits.map((c) => [c.id, { x: PAD_X + c.seq * DX, y: PAD_Y + laneOf(c.branch) * DY, lane: laneOf(c.branch) }]));
  const maxLane = Math.max(0, ...Object.values(state.lanes));
  // Compact graphs (the hero demo) keep a fixed canvas so the scale never jumps as commits appear.
  const width = Math.max(compact ? 640 : 0, PAD_X * 2 + Math.max(4, state.commits.length - 1) * DX + 110);
  const height = Math.max(compact ? 150 : 0, PAD_Y * 2 + maxLane * DY + 30);

  // Group branch names by tip commit, so labels on the same commit stack.
  const tips = new Map<string, string[]>();
  for (const [name, id] of Object.entries(state.branches)) tips.set(id, [...(tips.get(id) ?? []), name]);

  return (
    <svg
      className={`git-graph ${compact ? 'is-compact' : ''}`}
      viewBox={`0 0 ${width} ${height}`}
      // Natural size scrolls inside its box instead of shrinking as history grows.
      style={natural ? { width: `${width}px`, height: `${height}px`, maxWidth: 'none' } : undefined}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Edges first, so nodes sit on top. */}
      {state.commits.flatMap((c) =>
        c.parents.map((pid, i) => {
          const p = pos.get(pid);
          const q = pos.get(c.id);
          if (!p || !q) return null;
          const color = LANE_COLORS[(i === 0 ? q.lane : p.lane) % LANE_COLORS.length];
          const d = p.y === q.y
            ? `M ${p.x} ${p.y} L ${q.x} ${q.y}`
            : `M ${p.x} ${p.y} C ${p.x + DX * 0.6} ${p.y}, ${q.x - DX * 0.6} ${q.y}, ${q.x} ${q.y}`;
          return <path key={`${pid}-${c.id}`} d={d} className="gg-edge" stroke={color} />;
        }),
      )}

      {state.commits.map((c) => {
        const p = pos.get(c.id)!;
        const color = LANE_COLORS[p.lane % LANE_COLORS.length];
        const isMerge = c.parents.length > 1;
        return (
          <g key={c.id} className="gg-node">
            <title>{`${c.id} ${c.message}`}</title>
            <circle cx={p.x} cy={p.y} r={isMerge ? 11 : 9} className="gg-dot" stroke={color} />
            {isMerge && <circle cx={p.x} cy={p.y} r={4} fill={color} />}
            {!compact && (
              <text x={p.x} y={p.y + 26} textAnchor="middle" className="gg-id">{c.id.slice(0, 5)}</text>
            )}
          </g>
        );
      })}

      {[...tips.entries()].flatMap(([id, names]) => {
        const p = pos.get(id);
        if (!p) return [];
        return names.map((name, i) => {
          const isHead = name === state.head;
          const color = LANE_COLORS[laneOf(name) % LANE_COLORS.length];
          const text = isHead ? `HEAD → ${name}` : name;
          const w = text.length * 7.2 + 18;
          const x = p.x + 16;
          const y = p.y - 12 - i * 24;
          return (
            <g key={`${name}-label`} className="gg-label">
              <rect x={x} y={y - 9} width={w} height={20} rx={10} fill={isHead ? color : 'var(--panel)'} stroke={color} strokeWidth={1.5} />
              <text x={x + w / 2} y={y + 5} textAnchor="middle" className="gg-label-text" fill={isHead ? '#FFFDF8' : color}>{text}</text>
            </g>
          );
        });
      })}
    </svg>
  );
}
