import { useI18n } from '../i18n';
import type { Lesson } from '../content/types';

type DiagramKey = NonNullable<Lesson['diagram']>;

/** Lesson diagrams. Each one shows a mechanism, and animates only through CSS that reduced-motion turns off. */
export function Diagram({ kind }: { kind: DiagramKey }) {
  const { locale } = useI18n();
  const label = (en: string, esText: string, ptText?: string) => (locale === 'es' ? esText : locale === 'pt' ? ptText ?? en : en);

  if (kind === 'lifecycle') {
    const phases = [
      label('Requirements', 'Requisitos', 'Requisitos'),
      label('Design', 'Diseño', 'Design'),
      label('Implementation', 'Implementación', 'Implementação'),
      label('Testing', 'Pruebas', 'Testes'),
      label('Deployment', 'Despliegue', 'Implantação'),
      label('Maintenance', 'Mantenimiento', 'Manutenção'),
    ];
    const cx = 360, cy = 160, r = 115;
    return (
      <svg className="diagram" viewBox="0 0 720 320" role="img" aria-label={label('Software lifecycle as a loop: requirements, design, implementation, testing, deployment, maintenance, and back to requirements.', 'Ciclo de vida del software como bucle: requisitos, diseño, implementación, pruebas, despliegue, mantenimiento y de nuevo requisitos.', 'Ciclo de vida do software como um laço: requisitos, design, implementação, testes, implantação, manutenção e de volta aos requisitos.')}>
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
        <text x={cx} y={cy - 4} textAnchor="middle" fontWeight="600">{label('Feedback', 'Retroalimentación', 'Feedback')}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="sub">{label('loops back', 'vuelve atrás', 'volta ao início')}</text>
        <text x={600} y={60} className="sub">{label('Iterative: each loop', 'Iterativo: cada vuelta', 'Iterativo: cada volta')}</text>
        <text x={600} y={78} className="sub">{label('produces a baseline', 'produce una línea base', 'gera uma linha de base')}</text>
      </svg>
    );
  }

  if (kind === 'git-areas') {
    const boxes = [
      { x: 20, title: label('Working directory', 'Directorio de trabajo', 'Diretório de trabalho'), sub: label('files you edit', 'archivos que editas', 'arquivos que você edita') },
      { x: 270, title: label('Staging area', 'Área de preparación', 'Área de preparação'), sub: label('the index', 'el índice', 'o índice') },
      { x: 520, title: label('Repository', 'Repositorio', 'Repositório'), sub: '.git' },
    ];
    return (
      <svg className="diagram" viewBox="0 0 720 200" role="img" aria-label={label('Three Git areas: working directory, staging area, repository. git add moves changes to staging; git commit moves them into the repository.', 'Tres áreas de Git: directorio de trabajo, área de preparación y repositorio. git add mueve cambios a preparación; git commit los pasa al repositorio.', 'Três áreas do Git: diretório de trabalho, área de preparação e repositório. git add leva as mudanças para a preparação; git commit as leva para o repositório.')}>
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

  if (kind === 'files-vs-dbms') {
    const progs = [label('Sales', 'Ventas', 'Vendas'), label('Billing', 'Facturación', 'Faturamento'), label('Shipping', 'Envíos', 'Entregas')];
    return (
      <svg className="diagram" viewBox="0 0 720 300" role="img" aria-label={label(
        'Left: three programs, each with its own file holding a copy of the customer. Right: the same programs sharing one DBMS that stores the customer once.',
        'Izquierda: tres programas, cada uno con su propio archivo y una copia del cliente. Derecha: los mismos programas comparten un SGBD que guarda al cliente una sola vez.',
        'Esquerda: três programas, cada um com seu próprio arquivo e uma cópia do cliente. Direita: os mesmos programas compartilham um SGBD que guarda o cliente uma única vez.')}>
        <text x={170} y={26} textAnchor="middle" fontWeight="700">{label('Before: files', 'Antes: archivos', 'Antes: arquivos')}</text>
        <text x={540} y={26} textAnchor="middle" fontWeight="700">{label('With a DBMS', 'Con un SGBD', 'Com um SGBD')}</text>
        {progs.map((p, i) => (
          <g key={p}>
            <rect x={20} y={50 + i * 80} width={120} height={46} rx={12} className="node" />
            <text x={80} y={78 + i * 80} textAnchor="middle" fontSize="13">{p}</text>
            <path d={`M 140 ${73 + i * 80} L 190 ${73 + i * 80}`} className="edge-soft" />
            <rect x={190} y={50 + i * 80} width={130} height={46} rx={6} fill="var(--panel)" stroke="#C0704F" strokeWidth={2} />
            <text x={255} y={70 + i * 80} textAnchor="middle" fontSize="12">{label('file', 'archivo', 'arquivo')} {i + 1}</text>
            <text x={255} y={86 + i * 80} textAnchor="middle" className="sub">Ana · Ana · Ana</text>
          </g>
        ))}
        <line x1={360} y1={40} x2={360} y2={280} stroke="var(--line)" strokeWidth={2} strokeDasharray="6 8" />
        {progs.map((p, i) => (
          <g key={`r-${p}`}>
            <rect x={390} y={50 + i * 80} width={110} height={46} rx={12} className="node" />
            <text x={445} y={78 + i * 80} textAnchor="middle" fontSize="13">{p}</text>
            <path d={`M 500 ${73 + i * 80} C 540 ${73 + i * 80}, 540 153, 570 153`} className="edge pulse" />
          </g>
        ))}
        <rect x={570} y={110} width={130} height={86} rx={16} className="node-accent" />
        <text x={635} y={146} textAnchor="middle" fontWeight="700">{label('DBMS', 'SGBD', 'SGBD')}</text>
        <text x={635} y={168} textAnchor="middle" className="sub">Ana × 1</text>
      </svg>
    );
  }

  if (kind === 'er-store') {
    const tables = [
      { x: 30, y: 40, name: label('CUSTOMER', 'CLIENTE', 'CLIENTE'), cols: ['🔑 customer_id', 'name'] },
      { x: 270, y: 40, name: label('ORDERS', 'PEDIDO', 'PEDIDO'), cols: ['🔑 order_id', '↗ customer_id', 'order_date'] },
      { x: 510, y: 40, name: label('ORDER_ITEM', 'DETALLE_PEDIDO', 'ITEM_PEDIDO'), cols: ['🔑↗ order_id', '🔑↗ product_id', 'quantity'] },
      { x: 510, y: 190, name: label('PRODUCT', 'PRODUCTO', 'PRODUTO'), cols: ['🔑 product_id', 'name', 'price'] },
    ];
    return (
      <svg className="diagram" viewBox="0 0 720 320" role="img" aria-label={label(
        'Campus store model: Customer 1 to many Orders; Orders 1 to many Order_Item; Product 1 to many Order_Item. Order_Item resolves the many-to-many between orders and products.',
        'Modelo de la tienda: Cliente 1 a muchos Pedidos; Pedido 1 a muchos Detalle_Pedido; Producto 1 a muchos Detalle_Pedido. Detalle_Pedido resuelve la relación muchos a muchos entre pedidos y productos.',
        'Modelo da loja: Cliente 1 para muitos Pedidos; Pedido 1 para muitos Item_Pedido; Produto 1 para muitos Item_Pedido. Item_Pedido resolve a relação muitos para muitos entre pedidos e produtos.')}>
        <path d="M 210 80 L 270 80" className="edge" /><text x={222} y={72} className="sub">1</text><text x={252} y={72} className="sub">N</text>
        <path d="M 450 80 L 510 80" className="edge" /><text x={462} y={72} className="sub">1</text><text x={492} y={72} className="sub">N</text>
        <path d="M 600 190 L 600 152" className="edge" /><text x={608} y={185} className="sub">1</text><text x={608} y={162} className="sub">N</text>
        {tables.map((tb) => (
          <g key={tb.name}>
            <rect x={tb.x} y={tb.y} width={180} height={34 + tb.cols.length * 26} rx={12} className="node" />
            <rect x={tb.x} y={tb.y} width={180} height={32} rx={12} fill="var(--accent)" />
            <text x={tb.x + 90} y={tb.y + 21} textAnchor="middle" fontWeight="700" fontSize="13" style={{ fill: 'var(--accent-ink)' }}>{tb.name}</text>
            {tb.cols.map((c, i) => <text key={c} x={tb.x + 14} y={tb.y + 54 + i * 26} fontSize="12.5" fontFamily="var(--font-mono)">{c}</text>)}
          </g>
        ))}
        <text x={30} y={300} className="sub">{label('🔑 primary key · ↗ foreign key', '🔑 clave primaria · ↗ clave foránea', '🔑 chave primária · ↗ chave estrangeira')}</text>
      </svg>
    );
  }

  if (kind === 'three-schema') {
    const levels = [
      { name: label('External level', 'Nivel externo', 'Nível externo'), sub: label('views per user group', 'vistas por grupo de usuarios', 'visões por grupo de usuários'), c: '#C0704F' },
      { name: label('Conceptual level', 'Nivel conceptual', 'Nível conceitual'), sub: label('the whole logical model', 'todo el modelo lógico', 'todo o modelo lógico'), c: '#2F6F73' },
      { name: label('Internal level', 'Nivel interno', 'Nível interno'), sub: label('files, pages, indexes', 'archivos, páginas, índices', 'arquivos, páginas, índices'), c: '#3A4E74' },
    ];
    return (
      <svg className="diagram" viewBox="0 0 720 300" role="img" aria-label={label(
        'Three-schema architecture: external views on top, the conceptual model in the middle, internal storage at the bottom; mappings between levels give data independence.',
        'Arquitectura de tres esquemas: vistas externas arriba, el modelo conceptual en el medio y el almacenamiento interno abajo; las correspondencias entre niveles dan independencia de datos.',
        'Arquitetura de três esquemas: visões externas no topo, o modelo conceitual no meio e o armazenamento interno embaixo; os mapeamentos entre níveis dão independência de dados.')}>
        {[0, 1, 2].map((i) => <rect key={i} x={40 + i * 150} y={20} width={130} height={50} rx={12} fill="var(--panel)" stroke="#C0704F" strokeWidth={2} />)}
        {[label('Cashier', 'Cajero', 'Caixa'), label('Manager', 'Gerente', 'Gerente'), label('Customer', 'Cliente', 'Cliente')].map((v, i) => <text key={v} x={105 + i * 150} y={50} textAnchor="middle" fontSize="13">{v}</text>)}
        {levels.map((lv, i) => (
          <g key={lv.name}>
            <rect x={520} y={20 + i * 95} width={180} height={60} rx={14} fill="var(--panel-2)" stroke={lv.c} strokeWidth={2.5} />
            <text x={610} y={46 + i * 95} textAnchor="middle" fontWeight="700" fontSize="13">{lv.name}</text>
            <text x={610} y={64 + i * 95} textAnchor="middle" className="sub">{lv.sub}</text>
          </g>
        ))}
        {[0, 1, 2].map((i) => <path key={i} d={`M ${105 + i * 150} 70 L 245 130`} className="edge-soft" />)}
        <rect x={140} y={130} width={210} height={60} rx={14} className="node-accent" />
        <text x={245} y={165} textAnchor="middle" fontWeight="700">{label('Customer · Order · Product', 'Cliente · Pedido · Producto', 'Cliente · Pedido · Produto')}</text>
        <path d="M 245 190 L 245 225" className="edge pulse" />
        <rect x={140} y={225} width={210} height={56} rx={10} fill="var(--panel)" stroke="#3A4E74" strokeWidth={2} />
        <text x={245} y={258} textAnchor="middle" fontSize="13">{label('files · pages · indexes', 'archivos · páginas · índices', 'arquivos · páginas · índices')}</text>
      </svg>
    );
  }

  if (kind === 'requirements') {
    const steps = [
      label('Inception', 'Inicio', 'Concepção'), label('Elicitation', 'Obtención', 'Elicitação'), label('Elaboration', 'Elaboración', 'Elaboração'),
      label('Negotiation', 'Negociación', 'Negociação'), label('Specification', 'Especificación', 'Especificação'), label('Validation', 'Validación', 'Validação'),
    ];
    const colors = ['#2F6F73', '#5E8C7A', '#3A4E74', '#7A6A8C', '#C0704F', '#B98A3E'];
    return (
      <svg className="diagram" viewBox="0 0 720 220" role="img" aria-label={label('Requirements engineering: inception, elicitation, elaboration, negotiation, specification, and validation in sequence, with requirements management running underneath the whole time.', 'Ingeniería de requisitos: inicio, obtención, elaboración, negociación, especificación y validación en secuencia, con la gestión de requisitos por debajo todo el tiempo.', 'Engenharia de requisitos: concepção, elicitação, elaboração, negociação, especificação e validação em sequência, com a gestão de requisitos acompanhando o tempo todo.')}>
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
        <text x={360} y={157} textAnchor="middle" fontWeight="600">{label('7 · Requirements management: every change is recorded and approved', '7 · Gestión de requisitos: cada cambio se registra y se aprueba', '7 · Gestão de requisitos: cada mudança é registrada e aprovada')}</text>
        <text x={360} y={204} textAnchor="middle" className="sub">{label('Errors caught here are the cheapest to fix.', 'Los errores detectados aquí son los más baratos de corregir.', 'Erros encontrados aqui são os mais baratos de corrigir.')}</text>
      </svg>
    );
  }

  if (kind === 'context') {
    const actors = [
      { x: 90, y: 50, name: label('Customer', 'Cliente', 'Cliente'), flow: label('order →', 'pedido →', 'pedido →') },
      { x: 630, y: 50, name: label('Restaurant', 'Restaurante', 'Restaurante'), flow: label('← menu', '← menú', '← cardápio') },
      { x: 90, y: 210, name: label('Courier', 'Repartidor', 'Entregador'), flow: label('location →', 'ubicación →', 'localização →') },
      { x: 630, y: 210, name: label('Payments', 'Pagos', 'Pagamentos'), flow: label('← confirmation', '← confirmación', '← confirmação') },
    ];
    return (
      <svg className="diagram" viewBox="0 0 720 260" role="img" aria-label={label('Context diagram: a delivery app in the centre exchanges data with four external actors: customer, restaurant, courier, and payment provider.', 'Diagrama de contexto: una app de domicilios en el centro intercambia datos con cuatro actores externos: cliente, restaurante, repartidor y pasarela de pago.', 'Diagrama de contexto: um app de entregas no centro troca dados com quatro atores externos: cliente, restaurante, entregador e provedor de pagamento.')}>
        {actors.map((a) => (
          <g key={a.name}>
            <path d={`M ${a.x} ${a.y} L 360 130`} className="edge pulse" stroke="var(--accent)" />
            <rect x={a.x - 70} y={a.y - 22} width={140} height={44} rx={22} fill="var(--panel)" stroke="var(--accent-2)" strokeWidth={2} />
            <text x={a.x} y={a.y + 5} textAnchor="middle" fontWeight="600">{a.name}</text>
            <text x={(a.x + 360) / 2} y={(a.y + 130) / 2 - 8} textAnchor="middle" className="sub">{a.flow}</text>
          </g>
        ))}
        <rect x={270} y={95} width={180} height={70} rx={16} className="node-accent" />
        <text x={360} y={126} textAnchor="middle" fontWeight="700">{label('Delivery app', 'App de domicilios', 'App de entregas')}</text>
        <text x={360} y={146} textAnchor="middle" className="sub">{label('the system', 'el sistema', 'o sistema')}</text>
      </svg>
    );
  }

  // branch-merge: two branches diverge from a shared commit, then merge.
  return (
    <svg className="diagram" viewBox="0 0 720 260" role="img" aria-label={label('Branch diagram: main and feature branches split from one commit, the feature branch gets two commits, then merges back into main.', 'Diagrama de ramas: main y una rama de funcionalidad se separan de un commit, la rama recibe dos commits y luego se fusiona con main.', 'Diagrama de branches: main e feature se separam a partir de um commit, a branch feature recebe dois commits e depois é mesclada de volta em main.')}>
      <path d="M80 80 L640 80" className="edge branch-a draw" />
      <path d="M160 80 C 200 80, 220 180, 280 180 L 520 180 C 580 180, 600 80, 640 80" className="edge branch-b draw" />
      <circle cx={80} cy={80} r={10} className="commit" stroke="var(--accent)" />
      <circle cx={160} cy={80} r={10} className="commit" stroke="var(--accent)" />
      <circle cx={280} cy={180} r={10} className="commit" stroke="var(--accent-2)" />
      <circle cx={400} cy={180} r={10} className="commit" stroke="var(--accent-2)" />
      <circle cx={520} cy={180} r={10} className="commit" stroke="var(--accent-2)" />
      <circle cx={640} cy={80} r={10} className="commit" stroke="var(--accent)" />
      <text x={80} y={56} textAnchor="middle" className="sub">{label('shared commit', 'commit compartido', 'commit compartilhado')}</text>
      <text x={400} y={212} textAnchor="middle" className="sub">feature: add sum</text>
      <text x={640} y={56} textAnchor="middle" className="sub">main</text>
      <text x={400} y={40} textAnchor="middle" className="sub">{label('merge: feature → main', 'fusión: feature → main', 'merge: feature → main')}</text>
      <text x={24} y={250} className="sub">{label('Each dot is a commit. Branches are pointers; merging combines history.', 'Cada punto es un commit. Las ramas son punteros; fusionar combina el historial.', 'Cada ponto é um commit. Branches são ponteiros; o merge combina históricos.')}</text>
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
