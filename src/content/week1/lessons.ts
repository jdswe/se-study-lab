import type { Lesson } from '../types';
import { modellingLesson, requirementsLesson } from './lessonsExtra';

/**
 * Week 1 lessons. Written from scratch for this site, using concepts from the
 * course topics (software process, configuration management, version control).
 * Body text is English; titles, takeaways, and checks have Spanish where noted.
 */
export const week1Lessons: Lesson[] = [
  {
    id: 'w1-l1-what-is-software-engineering',
    title: {
      en: 'What software engineering is',
      es: 'Qué es la ingeniería de software',
    },
    minutes: 15,
    body: [
      {
        en: 'Programming is the act of writing instructions a computer can run. Software engineering adds the discipline needed to deliver a system that works, can be changed, and is understood by the people who depend on it. The difference matters because most software failures are not coding typos. They come from unclear requirements, poor planning, missing documentation, and communication gaps between the customer and the builders.',
        es: 'Programar es escribir instrucciones que una computadora puede ejecutar. La ingeniería de software añade la disciplina necesaria para entregar un sistema que funcione, pueda cambiarse y sea comprendido por quienes dependen de él.',
      },
      {
        en: 'A useful way to see the gap is a chain of translations. The customer has a real need. They describe it imperfectly. Sales promises something. Analysts write requirements. Designers propose a structure. Programmers write code. Each handoff can lose meaning. Software engineering tries to make each handoff explicit and checkable, with written specifications, reviews, and tests.',
      },
      {
        en: 'Software is also special as a product. It is intangible, it changes often, and it is rarely finished. Engineers therefore work with models: simplified descriptions of a system, such as a diagram of the data flow or a list of use cases. A good model is abstract enough to be simple, precise enough to be trusted, and cheap enough to change before code is written.',
      },
    ],
    takeaways: [
      {
        en: 'Software engineering is a discipline about delivering and maintaining software, not only writing it.',
        es: 'La ingeniería de software trata de entregar y mantener software, no solo de escribirlo.',
      },
      {
        en: 'Most project problems come from communication and planning gaps.',
        es: 'La mayoría de los problemas de proyecto vienen de brechas de comunicación y planificación.',
      },
      {
        en: 'Models let teams discuss and check a system before building it.',
        es: 'Los modelos permiten discutir y verificar un sistema antes de construirlo.',
      },
    ],
    check: {
      question: {
        en: 'Which problem is most typical of a software project that is "a lot of development with little engineering discipline"?',
        es: '¿Qué problema es más típico de un proyecto con mucho desarrollo y poca disciplina de ingeniería?',
      },
      options: [
        { en: 'The program does not do what the customer really needed', es: 'El programa no hace lo que el cliente realmente necesitaba' },
        { en: 'The compiler is too fast', es: 'El compilador es demasiado rápido' },
        { en: 'The keyboard layout changed', es: 'Cambió la distribución del teclado' },
      ],
      answer: 0,
      explanation: {
        en: 'Requirements that were never written or validated are the classic cause. The other two options are not software engineering problems.',
        es: 'Los requisitos que nunca se escribieron ni validaron son la causa clásica. Las otras dos opciones no son problemas de ingeniería de software.',
      },
    },
    pitfalls: [
      {
        mistake: { en: 'Treating "it compiles" as "it meets the need".', es: 'Creer que "compila" significa "cumple la necesidad".' },
        fix: { en: 'Compare the result with written requirements and tests.', es: 'Compara el resultado con requisitos escritos y pruebas.' },
      },
    ],
  },
  {
    id: 'w1-l2-lifecycle-and-process',
    title: {
      en: 'The development lifecycle and process models',
      es: 'El ciclo de vida de desarrollo y los modelos de proceso',
    },
    minutes: 20,
    diagram: 'lifecycle',
    body: [
      {
        en: 'A software development process defines what is done, by whom, when, and how. Every process performs four broad activities: specifying the software, developing it, validating it, and evolving it after release. The lifecycle is the sequence of phases a product moves through: requirements analysis, design, implementation, testing, deployment, and maintenance.',
      },
      {
        en: 'A waterfall process runs these phases once, in order. It is easy to plan but slow to react to change, and problems discovered in testing are expensive to fix. An iterative and incremental process divides the project into iterations. Each iteration plans, analyses, designs, builds, and tests a small part, and produces a baseline: a working, partially complete version of the system. The difference between two baselines is an increment.',
      },
      {
        en: 'Unified-style processes organise iterations into phases: inception (goals and scope), elaboration (architecture and main risks), construction (building the system), and transition (delivery). Adaptive methods such as Scrum apply the same idea with short cycles and frequent feedback from users. In each case, the key question is how early the team learns something that would be expensive to learn late.',
      },
    ],
    takeaways: [
      {
        en: 'A process model is a simplified description of how real teams work.',
        es: 'Un modelo de proceso es una descripción simplificada de cómo trabajan los equipos reales.',
      },
      {
        en: 'Iterative work produces baselines; the difference between baselines is an increment.',
        es: 'El trabajo iterativo produce líneas base; la diferencia entre ellas es un incremento.',
      },
      {
        en: 'Choose a process by how much change you expect and how costly late mistakes are.',
        es: 'Elige un proceso según cuánto cambio esperas y cuán costosos son los errores tardíos.',
      },
    ],
    check: {
      question: {
        en: 'In an iterative and incremental process, what is a baseline?',
        es: 'En un proceso iterativo e incremental, ¿qué es una línea base?',
      },
      options: [
        { en: 'A partially complete, working version of the system with its documentation', es: 'Una versión parcial pero funcional del sistema con su documentación' },
        { en: 'The first meeting with the customer', es: 'La primera reunión con el cliente' },
        { en: 'The list of bugs found in production', es: 'La lista de errores encontrados en producción' },
      ],
      answer: 0,
      explanation: {
        en: 'Each iteration ends with a baseline. Later baselines build on earlier ones until the final system is complete.',
        es: 'Cada iteración termina con una línea base. Las siguientes se construyen sobre las anteriores hasta completar el sistema.',
      },
    },
    pitfalls: [
      {
        mistake: { en: 'Calling a waterfall project "agile" because it has meetings.', es: 'Llamar "ágil" a un proyecto en cascada solo porque tiene reuniones.' },
        fix: { en: 'Ask whether feedback changes the plan during the project.', es: 'Pregunta si la retroalimentación cambia el plan durante el proyecto.' },
      },
    ],
  },
  requirementsLesson,
  modellingLesson,
  {
    id: 'w1-l3-configuration-management',
    title: {
      en: 'Software configuration management',
      es: 'Gestión de la configuración del software',
    },
    minutes: 15,
    body: [
      {
        en: 'Software configuration management (SCM) controls how the parts of a system change over time. Its items are not only source code: requirements documents, designs, test scripts, build files, and manuals are all configuration items. The goal is to know exactly which version of each item belongs to which version of the product.',
      },
      {
        en: 'SCM rests on four ideas. Identification names each item and version. Version control records every change. Change control decides which changes are approved and when. Status accounting reports what is currently in each baseline. An audit then checks that the baseline matches what was intended.',
      },
      {
        en: 'Without SCM, teams struggle with questions like "which build is in production?" or "why did this test pass yesterday?". Keeping a stable baseline lets people keep working in parallel without overwriting each other.',
      },
    ],
    takeaways: [
      {
        en: 'Configuration items include everything that makes up the product, not only code.',
        es: 'Los elementos de configuración incluyen todo lo que forma el producto, no solo el código.',
      },
      {
        en: 'SCM answers: which version, which change, approved by whom, and in which baseline.',
        es: 'La GCS responde: qué versión, qué cambio, aprobado por quién y en qué línea base.',
      },
    ],
    check: {
      question: {
        en: 'Which SCM activity decides whether a proposed change is approved?',
        es: '¿Qué actividad de la GCS decide si un cambio propuesto se aprueba?',
      },
      options: [
        { en: 'Change control', es: 'Control de cambios' },
        { en: 'Status accounting', es: 'Contabilidad de estado' },
        { en: 'Identification', es: 'Identificación' },
      ],
      answer: 0,
      explanation: {
        en: 'Change control governs approval. Status accounting reports state, and identification names items and versions.',
        es: 'El control de cambios gobierna la aprobación. La contabilidad de estado informa el estado, y la identificación nombra elementos y versiones.',
      },
    },
  },
  {
    id: 'w1-l4-version-control',
    title: {
      en: 'Version control systems',
      es: 'Control de versiones',
    },
    minutes: 20,
    body: [
      {
        en: 'A version control system (VCS) records changes to files over time. It gives you a history of what changed, when, and by whom; the ability to recover earlier versions; and a way for several people to work on the same project without losing each other\'s work.',
      },
      {
        en: 'Centralised systems keep one master repository on a server. Distributed systems, such as Git, give every developer a full local copy of the repository and its history. You can commit, branch, and browse history offline, and share changes when you are connected. Git is a distributed VCS. GitHub, GitLab, and similar services host Git repositories and add collaboration features; they are not Git itself.',
      },
      {
        en: 'A commit is a snapshot of the project with a message. Good commits represent one logical change, and their messages say what changed in the imperative mood, for example "add sum functionality" or "fix off-by-one in pagination". Small, frequent commits make history easier to read and to revert.',
      },
    ],
    takeaways: [
      {
        en: 'A VCS stores history, supports recovery, and shows who changed what and when.',
        es: 'Un VCS guarda el historial, permite recuperar versiones y muestra quién cambió qué y cuándo.',
      },
      {
        en: 'Git is distributed; GitHub is a hosting service for Git repositories.',
        es: 'Git es distribuido; GitHub es un servicio de alojamiento para repositorios Git.',
      },
      {
        en: 'One commit should hold one logical change with a clear message.',
        es: 'Un commit debe contener un solo cambio lógico con un mensaje claro.',
      },
    ],
    check: {
      question: {
        en: 'What is the best description of Git compared with GitHub?',
        es: '¿Cuál es la mejor descripción de Git frente a GitHub?',
      },
      options: [
        { en: 'Git is the version control tool; GitHub hosts Git repositories', es: 'Git es la herramienta de control de versiones; GitHub aloja repositorios Git' },
        { en: 'GitHub is a local tool and Git is a website', es: 'GitHub es una herramienta local y Git es un sitio web' },
        { en: 'They are the same product with different names', es: 'Son el mismo producto con nombres distintos' },
      ],
      answer: 0,
      explanation: {
        en: 'Git runs on your machine and tracks history. GitHub is a service that hosts repositories and adds review and collaboration tools.',
        es: 'Git se ejecuta en tu equipo y registra el historial. GitHub es un servicio que aloja repositorios y añade revisión y colaboración.',
      },
    },
    pitfalls: [
      {
        mistake: { en: 'Writing commit messages like "stuff" or "changes".', es: 'Escribir mensajes como "cosas" o "cambios".' },
        fix: { en: 'Describe the change in an imperative line of about 50 characters.', es: 'Describe el cambio en una línea imperativa de unos 50 caracteres.' },
      },
    ],
  },
  {
    id: 'w1-l5-git-fundamentals',
    title: {
      en: 'Git fundamentals: areas, commits, and branches',
      es: 'Fundamentos de Git: áreas, commits y ramas',
    },
    minutes: 30,
    diagram: 'git-areas',
    body: [
      {
        en: 'Git has three areas. The working directory holds the files you edit. The staging area (also called the index) holds the changes you have chosen for the next commit. The repository, stored in the hidden .git folder, holds the committed history. Most commands move changes between these areas: git add moves work into staging, and git commit moves staged work into the repository.',
      },
      {
        en: 'The everyday loop is: edit, check, stage, commit. Run git status often; it shows which files are modified, which are staged, and which are untracked. Use git log --oneline --graph to read history. Use git diff to see unstaged changes and git diff --staged to see what the next commit will contain.',
      },
      {
        en: 'A branch is a movable pointer to a commit. Creating a branch does not copy files. It lets you develop a feature without changing main. When the feature is ready, you merge it back. If both branches changed the same lines, Git stops and marks a conflict: the file contains markers <<<<<<<, =======, and >>>>>>> showing both versions. You edit the file to the intended result, stage it, and commit.',
      },
    ],
    takeaways: [
      {
        en: 'Edit in the working directory, stage with git add, and record with git commit.',
        es: 'Edita en el directorio de trabajo, prepara con git add y registra con git commit.',
      },
      {
        en: 'git status and git log show where you are; use them before and after each step.',
        es: 'git status y git log muestran dónde estás; úsalos antes y después de cada paso.',
      },
      {
        en: 'A branch is a pointer. Merging combines history; conflicts require a human decision.',
        es: 'Una rama es un puntero. Fusionar combina historiales; los conflictos requieren una decisión humana.',
      },
    ],
    check: {
      question: {
        en: 'You ran git add notes.md but have not committed. Where is notes.md now?',
        es: 'Ejecutaste git add notes.md pero no has hecho commit. ¿Dónde está notes.md ahora?',
      },
      options: [
        { en: 'In the staging area, waiting for the next commit', es: 'En el área de preparación, esperando el siguiente commit' },
        { en: 'In the repository history', es: 'En el historial del repositorio' },
        { en: 'Deleted from the disk', es: 'Borrado del disco' },
      ],
      answer: 0,
      explanation: {
        en: 'git add stages the change. Only git commit records it in the repository history.',
        es: 'git add prepara el cambio. Solo git commit lo registra en el historial del repositorio.',
      },
      },
    pitfalls: [
      {
        mistake: { en: 'Committing without checking git status, so unrelated files get included.', es: 'Hacer commit sin revisar git status, incluyendo archivos no relacionados.' },
        fix: { en: 'Run git status and git diff --staged before each commit.', es: 'Ejecuta git status y git diff --staged antes de cada commit.' },
      },
      {
        mistake: { en: 'Deleting conflict markers without choosing the right content.', es: 'Borrar los marcadores de conflicto sin elegir el contenido correcto.' },
        fix: { en: 'Decide the final content for the lines, remove all three marker lines, then stage and commit.', es: 'Decide el contenido final, quita las tres líneas de marcador, luego prepara y haz commit.' },
      },
    ],
  },
  {
    id: 'w1-l6-github-and-collaboration',
    title: {
      en: 'GitHub, remotes, and collaboration workflows',
      es: 'GitHub, remotos y flujos de colaboración',
    },
    minutes: 25,
    diagram: 'branch-merge',
    body: [
      {
        en: 'A remote is a named link to another repository, conventionally called origin. git remote add origin <url> registers it. git push -u origin main uploads your main branch and sets the upstream. git fetch downloads new commits without changing your files; git pull fetches and then integrates them into your current branch.',
      },
      {
        en: 'A common team workflow is feature branches with pull requests (called merge requests on GitLab). You create a branch, push it, and open a request. Reviewers read the diff, comment, and approve. Only after approval is the branch merged into main. The review step is where teams catch defects and share knowledge.',
      },
      {
        en: 'Good collaboration also means keeping main stable, updating your local copy before you start work, and writing commits that a reviewer can understand one at a time.',
      },
    ],
    takeaways: [
      {
        en: 'origin is the conventional name for the remote you cloned or connected.',
        es: 'origin es el nombre habitual del remoto que clonaste o conectaste.',
      },
      {
        en: 'fetch downloads; pull downloads and integrates; push uploads.',
        es: 'fetch descarga; pull descarga e integra; push sube.',
      },
      {
        en: 'Pull requests make review a planned step before code reaches main.',
        es: 'Las solicitudes de cambio hacen de la revisión un paso planificado antes de llegar a main.',
      },
    ],
    check: {
      question: {
        en: 'Which command downloads new commits from origin without changing your working files?',
        es: '¿Qué comando descarga commits nuevos desde origin sin cambiar tus archivos de trabajo?',
      },
      options: [
        { en: 'git fetch origin', es: 'git fetch origin' },
        { en: 'git push origin', es: 'git push origin' },
        { en: 'git commit --amend', es: 'git commit --amend' },
      ],
      answer: 0,
      explanation: {
        en: 'fetch updates remote-tracking branches only. push uploads your commits, and amend rewrites the last local commit.',
        es: 'fetch solo actualiza las ramas de seguimiento remoto. push sube tus commits y amend reescribe el último commit local.',
      },
    },
    pitfalls: [
      {
        mistake: { en: 'Pushing directly to main on a shared project.', es: 'Subir cambios directamente a main en un proyecto compartido.' },
        fix: { en: 'Work on a feature branch and open a pull request for review.', es: 'Trabaja en una rama de funcionalidad y abre una solicitud de cambio para revisión.' },
      },
    ],
  },
];
