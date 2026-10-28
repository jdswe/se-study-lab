import { useI18n } from '../i18n';
import type { Lesson } from '../content/types';

type DiagramKey = NonNullable<Lesson['diagram']>;

/** Lesson diagrams. Each one shows a mechanism, and animates only through CSS that reduced-motion turns off. */
export function Diagram({ kind }: { kind: DiagramKey }) {
  const { locale } = useI18n();
  const es = locale === 'es';
  const label = (en: string, esText: string) => (es ? esText : en);

  if (kind === 'lifecycle') {
    const phases = [
      label('Requirements', 'Requisitos'),
      label('Design', 'Diseño'),
      label('Implementation', 'Implementación'),
      label('Testing', 'Pruebas'),
      label('Deployment', 'Despliegue'),
      label('Maintenance', 'Mantenimiento'),
    ];
    const cx = 360, cy = 160, r = 115;
    return (
      <svg className="diagram" viewBox="0 0 720 320" role="img" aria-label={label(
        'Software lifecycle as a loop: requirements, design, implementation, testing, deployment, maintenance, and back to requirements.',
        'Ciclo de vida del software como bucle: requisitos, diseño, implementación, pruebas, despliegue, mantenimiento y de nuevo requisitos.')}>
        <circle cx={cx} cy={cy} r={r} className="edge-soft" />
        {phases.map((name, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / phases.length;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <g key={name}>
              <circle cx={x} cy={y} r={34} className={i === 0 ? 'node-accent glow' : 'node'} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="12">{name}</text>
            </g>
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontWeight="600">{label('Feedback', 'Retroalimentación')}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="sub">{label('loops back', 'vuelve atrás')}</text>
        <text x={600} y={60} className="sub">{label('Iterative: each loop', 'Iterativo: cada vuelta')}</text>
        <text x={600} y={78} className="sub">{label('produces a baseline', 'produce una línea base')}</text>
      </svg>
    );
  }

  if (kind === 'git-areas') {
    const boxes = [
      { x: 20, title: label('Working directory', 'Directorio de trabajo'), sub: label('files you edit', 'archivos que editas') },
      { x: 270, title: label('Staging area', 'Área de preparación'), sub: label('the index', 'el índice') },
      { x: 520, title: label('Repository', 'Repositorio'), sub: '.git' },
    ];
    return (
      <svg className="diagram" viewBox="0 0 720 200" role="img" aria-label={label(
        'Three Git areas: working directory, staging area, repository. git add moves changes to staging; git commit moves them into the repository.',
        'Tres áreas de Git: directorio de trabajo, área de preparación y repositorio. git add mueve cambios a preparación; git commit los pasa al repositorio.')}>
        {boxes.map((b) => (
          <g key={b.title}>
            <rect x={b.x} y={50} width={180} height={90} rx={14} className="node-accent" />
            <text x={b.x + 90} y={92} textAnchor="middle" fontWeight="600">{b.title}</text>
            <text x={b.x + 90} y={114} textAnchor="middle" className="sub">{b.sub}</text>
          </g>
        ))}
        <path d="M204 95 L266 95" className="edge pulse" markerEnd="url(#arrow)" />
        <path d="M454 95 L516 95" className="edge pulse" markerEnd="url(#arrow)" />
        <text x={235} y={80} textAnchor="middle" className="sub">git add</text>
        <text x={485} y={80} textAnchor="middle" className="sub">git commit</text>
        <path d="M610 150 C 610 185, 110 185, 110 150" className="edge-soft" markerEnd="url(#arrow)" />
        <text x={360} y={190} textAnchor="middle" className="sub">git restore --staged / git checkout</text>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" style={{ color: 'var(--accent)' }} />
          </marker>
        </defs>
      </svg>
    );
  }

  if (kind === 'requirements') {
    const steps = [
      label('Inception', 'Inicio'), label('Elicitation', 'Obtención'), label('Elaboration', 'Elaboración'),
      label('Negotiation', 'Negociación'), label('Specification', 'Especificación'), label('Validation', 'Validación'),
    ];
    const colors = ['#2F6F73', '#5E8C7A', '#3A4E74', '#7A6A8C', '#C0704F', '#B98A3E'];
    return (
      <svg className="diagram" viewBox="0 0 720 220" role="img" aria-label={label(
        'Requirements engineering: inception, elicitation, elaboration, negotiation, specification, and validation in sequence, with requirements management running underneath the whole time.',
        'Ingeniería de requisitos: inicio, obtención, elaboración, negociación, especificación y validación en secuencia, con la gestión de requisitos por debajo todo el tiempo.')}>
        {steps.map((name, i) => {
          const x = 14 + i * 117;
          return (
            <g key={name} className="glow" style={{ animationDelay: `${i * 250}ms` }}>
              <rect x={x} y={40} width={106} height={64} rx={14} fill="var(--panel)" stroke={colors[i]} strokeWidth={2.5} />
              <text x={x + 53} y={68} textAnchor="middle" fontSize="12" fontWeight="600">{name}</text>
              <text x={x + 53} y={88} textAnchor="middle" className="sub">{i + 1}</text>
              {i < steps.length - 1 && <path d={`M ${x + 108} 72 L ${x + 116} 72`} stroke="var(--ink-faint)" strokeWidth={2} />}
            </g>
          );
        })}
        <rect x={14} y={130} width={692} height={44} rx={12} fill="var(--panel-2)" stroke="var(--line)" />
        <path d="M 30 152 L 690 152" className="edge pulse" />
        <text x={360} y={157} textAnchor="middle" fontWeight="600">{label('7 · Requirements management: every change is recorded and approved', '7 · Gestión de requisitos: cada cambio se registra y se aprueba')}</text>
        <text x={360} y={204} textAnchor="middle" className="sub">{label('Errors caught here are the cheapest to fix.', 'Los errores detectados aquí son los más baratos de corregir.')}</text>
      </svg>
    );
  }

  if (kind === 'context') {
    const actors = [
      { x: 90, y: 50, name: label('Customer', 'Cliente'), flow: label('order →', 'pedido →') },
      { x: 630, y: 50, name: label('Restaurant', 'Restaurante'), flow: label('← menu', '← menú') },
      { x: 90, y: 210, name: label('Courier', 'Repartidor'), flow: label('location →', 'ubicación →') },
      { x: 630, y: 210, name: label('Payments', 'Pagos'), flow: label('← confirmation', '← confirmación') },
    ];
    return (
      <svg className="diagram" viewBox="0 0 720 260" role="img" aria-label={label(
        'Context diagram: a delivery app in the centre exchanges data with four external actors: customer, restaurant, courier, and payment provider.',
        'Diagrama de contexto: una app de domicilios en el centro intercambia datos con cuatro actores externos: cliente, restaurante, repartidor y pasarela de pago.')}>
        {actors.map((a) => (
          <g key={a.name}>
            <path d={`M ${a.x} ${a.y} L 360 130`} className="edge pulse" stroke="var(--accent)" />
            <rect x={a.x - 70} y={a.y - 22} width={140} height={44} rx={22} fill="var(--panel)" stroke="var(--accent-2)" strokeWidth={2} />
            <text x={a.x} y={a.y + 5} textAnchor="middle" fontWeight="600">{a.name}</text>
            <text x={(a.x + 360) / 2} y={(a.y + 130) / 2 - 8} textAnchor="middle" className="sub">{a.flow}</text>
          </g>
        ))}
        <rect x={270} y={95} width={180} height={70} rx={16} className="node-accent" />
        <text x={360} y={126} textAnchor="middle" fontWeight="700">{label('Delivery app', 'App de domicilios')}</text>
        <text x={360} y={146} textAnchor="middle" className="sub">{label('the system', 'el sistema')}</text>
      </svg>
    );
  }

  // branch-merge: two branches diverge from a shared commit, then merge.
  return (
    <svg className="diagram" viewBox="0 0 720 260" role="img" aria-label={label(
      'Branch diagram: main and feature branches split from one commit, the feature branch gets two commits, then merges back into main.',
      'Diagrama de ramas: main y una rama de funcionalidad se separan de un commit, la rama recibe dos commits y luego se fusiona con main.')}>
      <path d="M80 80 L640 80" className="edge branch-a draw" />
      <path d="M160 80 C 200 80, 220 180, 280 180 L 520 180 C 580 180, 600 80, 640 80" className="edge branch-b draw" />
      <circle cx={80} cy={80} r={10} className="commit" stroke="var(--accent)" />
      <circle cx={160} cy={80} r={10} className="commit" stroke="var(--accent)" />
      <circle cx={280} cy={180} r={10} className="commit" stroke="var(--accent-2)" />
      <circle cx={400} cy={180} r={10} className="commit" stroke="var(--accent-2)" />
      <circle cx={520} cy={180} r={10} className="commit" stroke="var(--accent-2)" />
      <circle cx={640} cy={80} r={10} className="commit" stroke="var(--accent)" />
      <text x={80} y={56} textAnchor="middle" className="sub">{label('shared commit', 'commit compartido')}</text>
      <text x={400} y={212} textAnchor="middle" className="sub">feature: add sum</text>
      <text x={640} y={56} textAnchor="middle" className="sub">main</text>
      <text x={400} y={40} textAnchor="middle" className="sub">{label('merge: feature → main', 'fusión: feature → main')}</text>
      <text x={24} y={250} className="sub">{label('Each dot is a commit. Branches are pointers; merging combines history.', 'Cada punto es un commit. Las ramas son punteros; fusionar combina el historial.')}</text>
    </svg>
  );
}

/** Decorative commit history for the home hero. Purely visual, so it is hidden from assistive tech. */
export function CommitHero() {
  const nodes = [
    [40, 150], [110, 150], [180, 150], [250, 150],
  ];
  return (
    <svg viewBox="0 0 420 260" aria-hidden="true" focusable="false">
      <path d="M40 150 L250 150" className="edge branch-a draw" />
      <path d="M180 150 C 210 150, 220 60, 260 60 L 360 60" className="edge branch-b draw" style={{ animationDelay: '600ms' }} />
      <path d="M180 150 C 210 150, 220 220, 260 220 L 360 220" className="edge-soft draw" style={{ animationDelay: '900ms' }} />
      <path d="M360 60 C 390 60, 390 150, 360 150" className="edge branch-a draw" style={{ animationDelay: '1500ms' }} />
      {nodes.map(([x, y], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={9} className="commit glow" style={{ animationDelay: `${i * 300}ms`, stroke: 'var(--accent)' }} />
      ))}
      <circle cx={260} cy={60} r={9} className="commit glow" style={{ stroke: 'var(--accent-2)' }} />
      <circle cx={360} cy={60} r={9} className="commit glow" style={{ stroke: 'var(--accent-2)' }} />
      <circle cx={260} cy={220} r={9} className="commit glow" style={{ stroke: 'var(--ink-faint)' }} />
      <circle cx={360} cy={220} r={9} className="commit glow" style={{ stroke: 'var(--ink-faint)' }} />
      <circle cx={360} cy={150} r={9} className="commit glow" style={{ stroke: 'var(--accent)' }} />
      <text x={40} y={185} className="sub" fill="currentColor">main</text>
    </svg>
  );
}
