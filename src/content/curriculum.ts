import type { Localized, ModuleMeta, SubjectMeta, TermMeta } from './types';
import { addPortuguese } from './localize';

/** The program shown on the home page. */
export const program: { title: Localized; tagline: Localized } = {
  title: { en: 'Software Engineering', es: 'Ingeniería de Software' },
  tagline: {
    en: 'Eight terms, three modules each. Every subject has its own lessons, practice, and tools.',
    es: 'Ocho términos, tres módulos en cada uno. Cada materia tiene sus propias lecciones, práctica y herramientas.',
  },
};

/** Muted hues, one per term, so each term has its own colour. */
const TERM_HUES = [186, 18, 262, 145, 38, 215, 330, 95];

const emptyModule = (number: number): ModuleMeta => ({ number, subjects: [] });

/**
 * Term → Module → Subject → Week. Terms are numbered 1–8 across four years.
 * To add a subject, append it to its module here and register its weeks in index.ts.
 */
export const terms: TermMeta[] = TERM_HUES.map((hue, i) => ({
  number: i + 1,
  year: Math.floor(i / 2) + 1,
  hue,
  modules: [emptyModule(1), emptyModule(2), emptyModule(3)],
}));

terms[0].modules[0].subjects = [
  {
    slug: 'logic',
    title: { en: 'Logic', es: 'Lógica', pt: 'Lógica' },
    theme: 'logic',
    plannedWeeks: 8,
    tools: [],
    weeks: [
      { id: 'y1-t1-m1-logic-w1', number: 1, status: 'published', title: { en: 'Why logic matters for software engineering', es: '¿Por qué la lógica es importante para la ingeniería de software?', pt: 'Por que a lógica é importante para a engenharia de software?' } },
      { id: 'y1-t1-m1-logic-w2', number: 2, status: 'published', title: { en: 'Syntax and semantics of propositional logic', es: 'Sintaxis y semántica de la lógica proposicional', pt: 'Sintaxe e semântica da lógica proposicional' } },
      { id: 'y1-t1-m1-logic-w3', number: 3, status: 'published', title: { en: 'Properties and relations of propositional formulas', es: 'Propiedades y relaciones de las fórmulas proposicionales', pt: 'Propriedades e relações das fórmulas proposicionais' } },
      { id: 'y1-t1-m1-logic-w4', number: 4, status: 'published', title: { en: 'Logical modelling of language', es: 'Modelamiento lógico del lenguaje', pt: 'Modelagem lógica da linguagem' } },
      { id: 'y1-t1-m1-logic-w5', number: 5, status: 'published', title: { en: 'SAT solving and normal forms', es: 'SAT-solving y formas normales', pt: 'SAT-solving e formas normais' } },
      { id: 'y1-t1-m1-logic-w6', number: 6, status: 'published', title: { en: 'The resolution method', es: 'El método de resolución', pt: 'O método de resolução' } },
      { id: 'y1-t1-m1-logic-w7', number: 7, status: 'published', title: { en: 'Introduction to first-order predicate logic', es: 'Introducción al cálculo de predicados de primer orden', pt: 'Introdução ao cálculo de predicados de primeira ordem' } },
      { id: 'y1-t1-m1-logic-w8', number: 8, status: 'published', title: { en: 'Final review', es: 'Repaso final', pt: 'Revisão final' } },
    ],
  },
  {
    slug: 'programming-1',
    title: { en: 'Programming 1', es: 'Programación 1', pt: 'Programação 1' },
    theme: 'programming',
    plannedWeeks: 8,
    tools: [],
    weeks: [
      { id: 'y1-t1-m1-prog-w1', number: 1, status: 'planned', title: { en: 'Introduction to programming', es: 'Introducción a la programación', pt: 'Introdução à programação' } },
      { id: 'y1-t1-m1-prog-w2', number: 2, status: 'planned', title: { en: 'Programming elements I', es: 'Elementos de programación I', pt: 'Elementos de programação I' } },
      { id: 'y1-t1-m1-prog-w3', number: 3, status: 'planned', title: { en: 'Programming elements II', es: 'Elementos de programación II', pt: 'Elementos de programação II' } },
      { id: 'y1-t1-m1-prog-w4', number: 4, status: 'planned', title: { en: 'Programming elements III', es: 'Elementos de programación III', pt: 'Elementos de programação III' } },
      { id: 'y1-t1-m1-prog-w5', number: 5, status: 'planned', title: { en: 'Programming elements IV', es: 'Elementos de programación IV', pt: 'Elementos de programação IV' } },
      { id: 'y1-t1-m1-prog-w6', number: 6, status: 'planned', title: { en: 'Introduction to object-oriented programming', es: 'Introducción a la programación orientada a objetos', pt: 'Introdução à programação orientada a objetos' } },
      { id: 'y1-t1-m1-prog-w7', number: 7, status: 'planned', title: { en: 'Course recap', es: 'Recapitulación del curso', pt: 'Recapitulação do curso' } },
      { id: 'y1-t1-m1-prog-w8', number: 8, status: 'planned', title: { en: 'Final project', es: 'Proyecto final', pt: 'Projeto final' } },
    ],
  },
  {
    slug: 'history-of-software-engineering',
    title: { en: 'History of Software Engineering', es: 'Historia de la Ingeniería de Software', pt: 'História da Engenharia de Software' },
    theme: 'history',
    plannedWeeks: 8,
    tools: [],
    weeks: [
      { id: 'y1-t1-m1-hist-w1', number: 1, status: 'published', title: { en: 'The evolution of computing', es: 'Evolución de la computación', pt: 'Evolução da computação' } },
      { id: 'y1-t1-m1-hist-w2', number: 2, status: 'published', title: { en: 'Introduction to software engineering', es: 'Introducción a la ingeniería de software', pt: 'Introdução à engenharia de software' } },
      { id: 'y1-t1-m1-hist-w3', number: 3, status: 'published', title: { en: 'Software pioneers and innovators', es: 'Pioneros e innovadores del software', pt: 'Pioneiros e inovadores do software' } },
      { id: 'y1-t1-m1-hist-w4', number: 4, status: 'published', title: { en: 'The evolution of programming languages', es: 'Evolución de los lenguajes de programación', pt: 'Evolução das linguagens de programação' } },
      { id: 'y1-t1-m1-hist-w5', number: 5, status: 'published', title: { en: 'The evolution of the software industry', es: 'Evolución de la industria del software', pt: 'Evolução da indústria de software' } },
      { id: 'y1-t1-m1-hist-w6', number: 6, status: 'published', title: { en: 'The evolution of development methodologies', es: 'Evolución de las metodologías de desarrollo', pt: 'Evolução das metodologias de desenvolvimento' } },
      { id: 'y1-t1-m1-hist-w7', number: 7, status: 'published', title: { en: 'Modern trends', es: 'Tendencias modernas', pt: 'Tendências modernas' } },
      { id: 'y1-t1-m1-hist-w8', number: 8, status: 'published', title: { en: 'Final project', es: 'Proyecto final', pt: 'Projeto final' } },
    ],
  },
];

terms[0].modules[1].subjects = [
  {
    slug: 'operating-systems-1',
    title: { en: 'Operating Systems 1', es: 'Sistemas Operativos 1', pt: 'Sistemas Operacionais 1' },
    theme: 'systems',
    plannedWeeks: 7,
    tools: [],
    weeks: [
      { id: 'y1-t1-m2-os-w1', number: 1, status: 'planned', title: { en: 'Operating system overview', es: 'Descripción general del sistema operativo', pt: 'Visão geral do sistema operacional' } },
      { id: 'y1-t1-m2-os-w2', number: 2, status: 'planned', title: { en: 'Process management', es: 'Gestión de procesos', pt: 'Gerenciamento de processos' } },
      { id: 'y1-t1-m2-os-w3', number: 3, status: 'planned', title: { en: 'Threads and CPU scheduling', es: 'Hilos y planificación de CPU', pt: 'Threads e escalonamento de CPU' } },
      { id: 'y1-t1-m2-os-w4', number: 4, status: 'planned', title: { en: 'Memory management', es: 'Gestión de memoria', pt: 'Gerenciamento de memória' } },
      { id: 'y1-t1-m2-os-w5', number: 5, status: 'planned', title: { en: 'Mass-storage structure', es: 'Estructura de almacenamiento masivo', pt: 'Estrutura de armazenamento em massa' } },
      { id: 'y1-t1-m2-os-w6', number: 6, status: 'planned', title: { en: 'File systems', es: 'Sistemas de archivos', pt: 'Sistemas de arquivos' } },
      { id: 'y1-t1-m2-os-w7', number: 7, status: 'planned', title: { en: 'Protection and security', es: 'Protección y seguridad', pt: 'Proteção e segurança' } },
    ],
  },
  {
    slug: 'discrete-mathematics',
    title: { en: 'Discrete Mathematics', es: 'Matemática Discreta', pt: 'Matemática Discreta' },
    theme: 'discrete',
    plannedWeeks: 8,
    tools: [],
    weeks: [
      { id: 'y1-t1-m2-disc-w1', number: 1, status: 'published', title: { en: 'The principle of induction', es: 'El principio de inducción', pt: 'O princípio da indução' } },
      { id: 'y1-t1-m2-disc-w2', number: 2, status: 'published', title: { en: 'Sets', es: 'Conjuntos', pt: 'Conjuntos' } },
      { id: 'y1-t1-m2-disc-w3', number: 3, status: 'published', title: { en: 'Relations', es: 'Relaciones', pt: 'Relações' } },
      { id: 'y1-t1-m2-disc-w4', number: 4, status: 'published', title: { en: 'Functions', es: 'Funciones', pt: 'Funções' } },
      { id: 'y1-t1-m2-disc-w5', number: 5, status: 'published', title: { en: 'Counting, combinatorics, and probability', es: 'Conteo, combinatoria y probabilidad', pt: 'Contagem, combinatória e probabilidade' } },
      { id: 'y1-t1-m2-disc-w6', number: 6, status: 'published', title: { en: 'Number theory', es: 'Teoría de números', pt: 'Teoria dos números' } },
      { id: 'y1-t1-m2-disc-w7', number: 7, status: 'planned', title: { en: 'Graphs and trees', es: 'Grafos y árboles', pt: 'Grafos e árvores' } },
      { id: 'y1-t1-m2-disc-w8', number: 8, status: 'planned', title: { en: 'General review and wrap-up', es: 'Repaso general y finalización', pt: 'Revisão geral e encerramento' } },
    ],
  },
];

terms[0].modules[2].subjects = [
  {
    slug: 'software-development-1',
    title: { en: 'Software Development 1', es: 'Desarrollo de Software 1' },
    theme: 'version-control',
    plannedWeeks: 8,
    tools: ['git-playground'],
    weeks: [
      {
        id: 'y1-t1-m3-w1',
        number: 1,
        title: { en: 'Introduction to Software Engineering Management', es: 'Introducción a la gestión de la ingeniería de software' },
        status: 'published',
      },
      { id: 'y1-t1-m3-w2', number: 2, status: 'published', title: { en: 'Requirements engineering', es: 'Ingeniería de requerimientos', pt: 'Engenharia de requisitos' } },
      { id: 'y1-t1-m3-w3', number: 3, status: 'planned', title: { en: 'Agile methodology', es: 'Metodología ágil', pt: 'Metodologia ágil' } },
      { id: 'y1-t1-m3-w4', number: 4, status: 'planned', title: { en: 'Agile estimation', es: 'Estimación ágil', pt: 'Estimativa ágil' } },
      { id: 'y1-t1-m3-w5', number: 5, status: 'planned', title: { en: 'Use cases', es: 'Casos de uso', pt: 'Casos de uso' } },
      { id: 'y1-t1-m3-w6', number: 6, status: 'planned', title: { en: 'Code review', es: 'Revisión de código', pt: 'Revisão de código' } },
      { id: 'y1-t1-m3-w7', number: 7, status: 'planned', title: { en: 'Software metrics', es: 'Métricas de software', pt: 'Métricas de software' } },
      { id: 'y1-t1-m3-w8', number: 8, status: 'planned', title: { en: 'Final project', es: 'Proyecto final', pt: 'Projeto final' } },
    ],
  },
  {
    slug: 'database-1',
    title: { en: 'Databases 1', es: 'Bases de Datos 1' },
    theme: 'databases',
    plannedWeeks: 8,
    tools: ['design-studio', 'sql-lab'],
    weeks: [
      {
        id: 'y1-t1-m3-db-w1',
        number: 1,
        title: { en: 'Database management systems', es: 'Sistemas de gestión de bases de datos' },
        status: 'published',
      },
      { id: 'y1-t1-m3-db-w2', number: 2, status: 'published', title: { en: 'The relational model: ER modelling', es: 'El modelo relacional: modelado ER', pt: 'O modelo relacional: modelagem ER' } },
      { id: 'y1-t1-m3-db-w3', number: 3, status: 'planned', title: { en: 'Normalisation', es: 'Normalización', pt: 'Normalização' } },
      { id: 'y1-t1-m3-db-w4', number: 4, status: 'planned', title: { en: 'Basic SQL 1', es: 'SQL básico 1', pt: 'SQL básico 1' } },
      { id: 'y1-t1-m3-db-w5', number: 5, status: 'planned', title: { en: 'Basic SQL 2', es: 'SQL básico 2', pt: 'SQL básico 2' } },
      { id: 'y1-t1-m3-db-w6', number: 6, status: 'planned', title: { en: 'Relational algebra', es: 'Álgebra relacional', pt: 'Álgebra relacional' } },
      { id: 'y1-t1-m3-db-w7', number: 7, status: 'planned', title: { en: 'NoSQL databases', es: 'Bases de datos NoSQL', pt: 'Bancos de dados NoSQL' } },
      { id: 'y1-t1-m3-db-w8', number: 8, status: 'planned', title: { en: 'Final project', es: 'Proyecto final', pt: 'Projeto final' } },
    ],
  },
  {
    slug: 'calculus-1',
    title: { en: 'Calculus 1', es: 'Cálculo 1', pt: 'Cálculo 1' },
    theme: 'math',
    plannedWeeks: 8,
    tools: ['graph-lab', 'ruffini-lab', 'inequality-lab'],
    weeks: [
      {
        id: 'y1-t1-m3-calc-w1',
        number: 1,
        title: { en: 'Introduction and inequalities', es: 'Introducción y desigualdades', pt: 'Introdução e desigualdades' },
        status: 'published',
      },
      { id: 'y1-t1-m3-calc-w2', number: 2, status: 'published', title: { en: 'Functions and graphs', es: 'Funciones y gráficas', pt: 'Funções e gráficos' } },
      { id: 'y1-t1-m3-calc-w3', number: 3, status: 'planned', title: { en: 'Limits', es: 'Límites', pt: 'Limites' } },
      { id: 'y1-t1-m3-calc-w4', number: 4, status: 'planned', title: { en: 'Derivatives', es: 'Derivadas', pt: 'Derivadas' } },
      { id: 'y1-t1-m3-calc-w5', number: 5, status: 'planned', title: { en: 'Applications of the derivative', es: 'Aplicaciones de la derivada', pt: 'Aplicações da derivada' } },
      { id: 'y1-t1-m3-calc-w6', number: 6, status: 'planned', title: { en: 'The (Riemann) integral', es: 'Integral (de Riemann)', pt: 'Integral (de Riemann)' } },
      { id: 'y1-t1-m3-calc-w7', number: 7, status: 'planned', title: { en: 'Applications of the integral', es: 'Aplicaciones de la integral', pt: 'Aplicações da integral' } },
      { id: 'y1-t1-m3-calc-w8', number: 8, status: 'planned', title: { en: 'General review and wrap-up', es: 'Repaso general y finalización', pt: 'Revisão geral e encerramento' } },
    ],
  },
];

addPortuguese(program);
addPortuguese(terms);

export function findTerm(n: number): TermMeta | undefined {
  return terms.find((t) => t.number === n);
}

export function findModule(term: number, module: number): ModuleMeta | undefined {
  return findTerm(term)?.modules.find((m) => m.number === module);
}

export function findSubject(term: number, module: number, slug: string): SubjectMeta | undefined {
  return findModule(term, module)?.subjects.find((s) => s.slug === slug);
}

export interface SubjectPlace {
  term: TermMeta;
  module: ModuleMeta;
  subject: SubjectMeta;
}

/** Where a week lives in the program, so pages can build breadcrumbs and links. */
export function placeOfWeek(weekId: string): SubjectPlace | undefined {
  for (const term of terms) {
    for (const module of term.modules) {
      for (const subject of module.subjects) {
        if (subject.weeks.some((w) => w.id === weekId)) return { term, module, subject };
      }
    }
  }
  return undefined;
}

export function subjectPath(place: { term: TermMeta; module: ModuleMeta; subject: SubjectMeta }, section?: string): string {
  const base = `/term/${place.term.number}/module/${place.module.number}/${place.subject.slug}`;
  return section ? `${base}/${section}` : base;
}
