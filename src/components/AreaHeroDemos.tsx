import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useI18n } from '../i18n';

/**
 * Hero demos for subjects outside the original three: logic, programming,
 * operating systems, history, and discrete mathematics. Each one cycles
 * through a few short examples, like the calculus demo, and stays still
 * (with dots to step through) when the learner prefers reduced motion.
 */

type Locale = 'en' | 'es' | 'pt';
type Text = Record<Locale, string>;
const T = (en: string, es: string, pt: string): Text => ({ en, es, pt });

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
  } catch {
    return false;
  }
}

/** Shared frame: a title line, a body, a caption, and dots to pick an example. */
function Cycler({ label, count, delay = 4600, render }: {
  label: Text;
  count: number;
  delay?: number;
  render: (i: number, locale: Locale) => { title: ReactNode; body: ReactNode; caption: ReactNode; names: string[] };
}) {
  const { locale } = useI18n();
  const loc = locale as Locale;
  const reduced = useMemo(reducedMotion, []);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % count), delay);
    return () => window.clearTimeout(id);
  }, [i, reduced, count, delay]);
  const view = render(i, loc);
  return (
    <figure className="math-demo area-demo" aria-label={label[loc]}>
      <p className="math-demo-expr area-demo-title" key={`t${i}`}>{view.title}</p>
      <div className="area-demo-body" key={`b${i}`}>{view.body}</div>
      <figcaption>
        <strong key={`c${i}`}>{view.caption}</strong>
        <span className="math-demo-dots">
          {view.names.map((n, k) => (
            <button key={k} type="button" aria-label={n} aria-pressed={k === i} onClick={() => setI(k)} />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- Logic: a truth table that fills in row by row ---------- */

interface Formula { text: string; vars: string[]; f: (v: boolean[]) => boolean }
const imp = (a: boolean, b: boolean) => !a || b;
const FORMULAS: Formula[] = [
  { text: 'p ∧ q', vars: ['p', 'q'], f: ([p, q]) => p && q },
  { text: 'p → q', vars: ['p', 'q'], f: ([p, q]) => imp(p, q) },
  { text: '¬(p ∨ q) ↔ (¬p ∧ ¬q)', vars: ['p', 'q'], f: ([p, q]) => !(p || q) === (!p && !q) },
  { text: '(p → q) ∧ (q → r) → (p → r)', vars: ['p', 'q', 'r'], f: ([p, q, r]) => imp(imp(p, q) && imp(q, r), imp(p, r)) },
  { text: '(p ∨ q) ∧ ¬r', vars: ['p', 'q', 'r'], f: ([p, q, r]) => (p || q) && !r },
];

function rows(n: number): boolean[][] {
  return Array.from({ length: 2 ** n }, (_, k) => Array.from({ length: n }, (_, j) => !((k >> (n - 1 - j)) & 1)));
}

export function LogicHeroDemo() {
  return (
    <Cycler
      label={T('Demo: truth tables for propositional formulas', 'Demostración: tablas de verdad de fórmulas proposicionales', 'Demonstração: tabelas-verdade de fórmulas proposicionais')}
      count={FORMULAS.length}
      delay={5200}
      render={(i, loc) => {
        const F = FORMULAS[i];
        const tv = (b: boolean) => (b ? (loc === 'en' ? 'T' : 'V') : 'F');
        const table = rows(F.vars.length);
        const results = table.map(F.f);
        const kind = results.every(Boolean)
          ? T('Tautology: true in every row', 'Tautología: verdadera en todas las filas', 'Tautologia: verdadeira em todas as linhas')
          : results.some(Boolean)
            ? T('Contingency: true in some rows', 'Contingencia: verdadera en algunas filas', 'Contingência: verdadeira em algumas linhas')
            : T('Contradiction: false in every row', 'Contradicción: falsa en todas las filas', 'Contradição: falsa em todas as linhas');
        return {
          title: F.text,
          body: (
            <table className="area-truth">
              <thead>
                <tr>{F.vars.map((v) => <th key={v}>{v}</th>)}<th className="is-result">{F.text}</th></tr>
              </thead>
              <tbody>
                {table.map((r, k) => (
                  <tr key={k} style={{ animationDelay: `${120 + k * 160}ms` }}>
                    {r.map((b, j) => <td key={j} className={b ? 'is-t' : 'is-f'}>{tv(b)}</td>)}
                    <td className={`is-result ${results[k] ? 'is-t' : 'is-f'}`}>{tv(results[k])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ),
          caption: kind[loc],
          names: FORMULAS.map((x) => x.text),
        };
      }}
    />
  );
}

/* ---------- Programming: a Java snippet and what it prints ---------- */

const PROGRAMS: { name: Text; code: string[]; output: string }[] = [
  { name: T('Hello, world', 'Hola, mundo', 'Olá, mundo'),
    code: ['public class Main {', '  public static void main(String[] args) {', '    System.out.println("Hello, world!");', '  }', '}'], output: 'Hello, world!' },
  { name: T('Command-line arguments', 'Argumentos de línea de comandos', 'Argumentos de linha de comando'),
    code: ['// java Main 3 4', 'int a = Integer.parseInt(args[0]);', 'int b = Integer.parseInt(args[1]);', 'System.out.println(a + b);'], output: '7' },
  { name: T('Variables and output', 'Variables y salida', 'Variáveis e saída'),
    code: ['int apples = 7;', 'double price = 1.5;', 'System.out.println(apples * price);'], output: '10.5' },
  { name: T('A decision', 'Una decisión', 'Uma decisão'),
    code: ['int score = 74;', 'if (score >= 60) {', '  System.out.println("Pass");', '} else {', '  System.out.println("Try again");', '}'], output: 'Pass' },
  { name: T('A loop', 'Un ciclo', 'Um laço'),
    code: ['int total = 0;', 'for (int i = 1; i <= 4; i++) {', '  total += i;', '}', 'System.out.println(total);'], output: '10' },
  { name: T('A method', 'Un método', 'Um método'),
    code: ['static int square(int n) {', '  return n * n;', '}', '', 'System.out.println(square(9));'], output: '81' },
  { name: T('An object', 'Un objeto', 'Um objeto'),
    code: ['Counter c = new Counter();', 'c.increment();', 'c.increment();', 'System.out.println(c.value());'], output: '2' },
];

export function CodeHeroDemo() {
  return (
    <Cycler
      label={T('Demo: short Java programs and their output', 'Demostración: programas cortos en Java y su salida', 'Demonstração: programas curtos em Java e sua saída')}
      count={PROGRAMS.length}
      delay={5000}
      render={(i, loc) => {
        const P = PROGRAMS[i];
        return {
          title: P.name[loc],
          body: (
            <pre className="area-code" aria-label="Java">
              {P.code.map((line, k) => (
                <span key={k} className="area-code-line" style={{ animationDelay: `${k * 260}ms` }}>{line || ' '}{'\n'}</span>
              ))}
            </pre>
          ),
          caption: <>{'> '}{P.output}</>,
          names: PROGRAMS.map((p) => p.name[loc]),
        };
      }}
    />
  );
}

/* ---------- Operating systems: CPU scheduling as a Gantt chart ---------- */

interface Proc { id: string; arrival: number; burst: number }
const PROCS: Proc[] = [
  { id: 'P1', arrival: 0, burst: 5 },
  { id: 'P2', arrival: 1, burst: 3 },
  { id: 'P3', arrival: 2, burst: 1 },
  { id: 'P4', arrival: 3, burst: 2 },
];

type Slice = { id: string; start: number; end: number };

function fcfs(ps: Proc[]): Slice[] {
  let t = 0;
  return [...ps].sort((a, b) => a.arrival - b.arrival).map((p) => {
    t = Math.max(t, p.arrival);
    const s = { id: p.id, start: t, end: t + p.burst };
    t += p.burst;
    return s;
  });
}

function sjf(ps: Proc[]): Slice[] {
  const left = [...ps];
  const out: Slice[] = [];
  let t = 0;
  while (left.length) {
    const ready = left.filter((p) => p.arrival <= t);
    if (!ready.length) { t = Math.min(...left.map((p) => p.arrival)); continue; }
    const p = ready.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival)[0];
    out.push({ id: p.id, start: t, end: t + p.burst });
    t += p.burst;
    left.splice(left.indexOf(p), 1);
  }
  return out;
}

function roundRobin(ps: Proc[], q: number): Slice[] {
  const rem = new Map(ps.map((p) => [p.id, p.burst]));
  const sorted = [...ps].sort((a, b) => a.arrival - b.arrival);
  const queue: Proc[] = [];
  const out: Slice[] = [];
  let t = 0;
  let next = 0;
  const admit = () => { while (next < sorted.length && sorted[next].arrival <= t) queue.push(sorted[next++]); };
  admit();
  while (queue.length || next < sorted.length) {
    if (!queue.length) { t = sorted[next].arrival; admit(); continue; }
    const p = queue.shift()!;
    const run = Math.min(q, rem.get(p.id)!);
    out.push({ id: p.id, start: t, end: t + run });
    t += run;
    rem.set(p.id, rem.get(p.id)! - run);
    admit();
    if (rem.get(p.id)! > 0) queue.push(p);
  }
  return out;
}

/** Average waiting time = average of (finish − arrival − burst). */
function avgWait(ps: Proc[], slices: Slice[]): number {
  const total = ps.reduce((sum, p) => {
    const finish = Math.max(...slices.filter((s) => s.id === p.id).map((s) => s.end));
    return sum + (finish - p.arrival - p.burst);
  }, 0);
  return total / ps.length;
}

const POLICIES: { name: Text; slices: Slice[] }[] = [
  { name: T('FCFS: first come, first served', 'FCFS: primero en llegar, primero en ser atendido', 'FCFS: primeiro a chegar, primeiro a ser atendido'), slices: fcfs(PROCS) },
  { name: T('SJF: shortest job first', 'SJF: el trabajo más corto primero', 'SJF: o trabalho mais curto primeiro'), slices: sjf(PROCS) },
  { name: T('Round Robin, quantum 2', 'Round Robin, quantum 2', 'Round Robin, quantum 2'), slices: roundRobin(PROCS, 2) },
];

export function SystemsHeroDemo() {
  const total = Math.max(...POLICIES[0].slices.map((s) => s.end));
  const sx = (t: number) => 8 + (t / total) * 344;
  return (
    <Cycler
      label={T('Demo: CPU scheduling policies as Gantt charts', 'Demostración: políticas de planificación de CPU como diagramas de Gantt', 'Demonstração: políticas de escalonamento de CPU como diagramas de Gantt')}
      count={POLICIES.length}
      delay={5200}
      render={(i, loc) => {
        const P = POLICIES[i];
        const w = avgWait(PROCS, P.slices);
        const words = T('Average waiting time', 'Tiempo de espera promedio', 'Tempo médio de espera');
        return {
          title: P.name[loc],
          body: (
            <svg viewBox="0 0 360 70" role="img" aria-label={P.slices.map((s) => `${s.id} ${s.start}–${s.end}`).join(', ')}>
              {P.slices.map((s, k) => (
                <g key={k} className="area-gantt-slice" style={{ animationDelay: `${k * 220}ms` }}>
                  <rect className={`area-gantt-${s.id}`} x={sx(s.start)} y={8} width={sx(s.end) - sx(s.start)} height={30} rx={4} />
                  <text x={(sx(s.start) + sx(s.end)) / 2} y={28} textAnchor="middle">{s.id}</text>
                </g>
              ))}
              {Array.from({ length: total + 1 }, (_, t) => (
                <text key={t} className="nl-tick-label" x={sx(t)} y={58} textAnchor="middle">{t}</text>
              ))}
            </svg>
          ),
          caption: `${words[loc]}: ${w.toFixed(2).replace(/\.?0+$/, '')}`,
          names: POLICIES.map((p) => p.name[loc]),
        };
      }}
    />
  );
}

/* ---------- History of software engineering: a moving timeline ---------- */

const EVENTS: { year: number; text: Text }[] = [
  { year: 1843, text: T('Ada Lovelace publishes the first algorithm meant for a machine', 'Ada Lovelace publica el primer algoritmo pensado para una máquina', 'Ada Lovelace publica o primeiro algoritmo pensado para uma máquina') },
  { year: 1945, text: T('The stored-program idea: code lives in memory like data', 'La idea del programa almacenado: el código vive en memoria como los datos', 'A ideia do programa armazenado: o código vive na memória como os dados') },
  { year: 1968, text: T('A conference names the "software crisis" and "software engineering"', 'Una conferencia nombra la "crisis del software" y la "ingeniería de software"', 'Uma conferência nomeia a "crise do software" e a "engenharia de software"') },
  { year: 1970, text: T('A paper describes the sequential, phase-by-phase model later called waterfall', 'Un artículo describe el modelo secuencial por fases que luego se llamó cascada', 'Um artigo descreve o modelo sequencial por fases depois chamado de cascata') },
  { year: 1991, text: T('Linux starts as a hobby project and grows through open collaboration', 'Linux nace como proyecto personal y crece con colaboración abierta', 'O Linux nasce como projeto pessoal e cresce com colaboração aberta') },
  { year: 2001, text: T('The Agile Manifesto values working software and collaboration', 'El Manifiesto Ágil valora el software que funciona y la colaboración', 'O Manifesto Ágil valoriza software funcionando e colaboração') },
  { year: 2005, text: T('Git is created to manage the Linux kernel', 'Se crea Git para gestionar el núcleo de Linux', 'O Git é criado para gerenciar o núcleo do Linux') },
];

export function HistoryHeroDemo() {
  const lo = 1830;
  const hi = 2020;
  const sx = (y: number) => 14 + ((y - lo) / (hi - lo)) * 332;
  return (
    <Cycler
      label={T('Demo: milestones in the history of software', 'Demostración: hitos en la historia del software', 'Demonstração: marcos na história do software')}
      count={EVENTS.length}
      delay={4200}
      render={(i, loc) => ({
        title: String(EVENTS[i].year),
        body: (
          <svg viewBox="0 0 360 50" role="img" aria-label={EVENTS.map((e) => e.year).join(', ')}>
            <line className="nl-axis" x1={10} x2={350} y1={22} y2={22} />
            {EVENTS.map((e, k) => (
              <g key={e.year}>
                <circle className={k === i ? 'nl-dot is-closed area-tl-now' : k < i ? 'nl-dot is-closed' : 'nl-dot'} cx={sx(e.year)} cy={22} r={k === i ? 7 : 5} />
                {(k === i || k === 0 || k === EVENTS.length - 1) && <text className="nl-tick-label" x={sx(e.year)} y={44} textAnchor="middle">{e.year}</text>}
              </g>
            ))}
          </svg>
        ),
        caption: EVENTS[i].text[loc],
        names: EVENTS.map((e) => String(e.year)),
      })}
    />
  );
}

/* ---------- Discrete mathematics: a graph explored step by step ---------- */

const NODES: Record<string, [number, number]> = { A: [40, 30], B: [130, 14], C: [130, 66], D: [220, 30], E: [310, 14], F: [310, 66] };
const EDGES: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'D'], ['C', 'D'], ['D', 'E'], ['D', 'F'], ['E', 'F']];

function bfs(start: string): string[] {
  const seen = [start];
  for (let k = 0; k < seen.length; k++) {
    const nbrs = EDGES.filter((e) => e.includes(seen[k])).map((e) => (e[0] === seen[k] ? e[1] : e[0])).sort();
    for (const n of nbrs) if (!seen.includes(n)) seen.push(n);
  }
  return seen;
}

const degree = (n: string) => EDGES.filter((e) => e.includes(n)).length;

const GRAPH_VIEWS: { name: Text; order: string[]; caption: (loc: Locale) => string }[] = [
  { name: T('Breadth-first search from A', 'Búsqueda en anchura desde A', 'Busca em largura a partir de A'), order: bfs('A'),
    caption: () => bfs('A').join(' → ') },
  { name: T('Degrees of the vertices', 'Grados de los vértices', 'Graus dos vértices'), order: Object.keys(NODES),
    caption: (loc) => `${Object.keys(NODES).map((n) => `${n}:${degree(n)}`).join(' ')} · Σ = ${2 * EDGES.length} = 2·|${loc === 'en' ? 'E' : 'A'}|` },
  { name: T('Breadth-first search from E', 'Búsqueda en anchura desde E', 'Busca em largura a partir de E'), order: bfs('E'),
    caption: () => bfs('E').join(' → ') },
];

export function DiscreteHeroDemo() {
  return (
    <Cycler
      label={T('Demo: exploring a graph', 'Demostración: explorar un grafo', 'Demonstração: explorando um grafo')}
      count={GRAPH_VIEWS.length}
      delay={5200}
      render={(i, loc) => {
        const V = GRAPH_VIEWS[i];
        return {
          title: V.name[loc],
          body: (
            <svg viewBox="0 0 360 82" role="img" aria-label={V.caption(loc)}>
              {EDGES.map(([a, b]) => (
                <line key={a + b} className="area-graph-edge" x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
              ))}
              {V.order.map((n, k) => (
                <g key={n} className="area-graph-node" style={{ animationDelay: `${150 + k * 300}ms` }}>
                  <circle cx={NODES[n][0]} cy={NODES[n][1]} r={11} />
                  <text x={NODES[n][0]} y={NODES[n][1] + 4} textAnchor="middle">{n}</text>
                </g>
              ))}
            </svg>
          ),
          caption: V.caption(loc),
          names: GRAPH_VIEWS.map((g) => g.name[loc]),
        };
      }}
    />
  );
}
