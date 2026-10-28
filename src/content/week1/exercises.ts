import type { Exercise } from '../types';

/** Exercises and analogies per lesson, keyed by lesson id. Merged into lessons in index.ts. */
export const week1Exercises: Record<string, Exercise[]> = {
  'w1-l1-what-is-software-engineering': [
    {
      id: 'ex-l1-1', level: 1,
      title: { en: 'Spot the gap', es: 'Encuentra la brecha' },
      prompt: { en: 'A client says "make the report faster". List two questions you would ask before writing any code.', es: 'Un cliente dice "haz el reporte más rápido". Escribe dos preguntas que harías antes de programar.' },
      hint: { en: 'Ask what "faster" means for them: seconds, minutes, or a different data set?', es: '¿Qué significa "más rápido" para ellos: segundos, minutos o otro conjunto de datos?' },
      solution: { en: 'Example: "Which report, and how slow is it now versus the target?" and "Who uses it, and how often?" Each answer turns a vague wish into a requirement you can test.', es: 'Ejemplo: "¿Qué reporte, y cuánto tarda hoy frente a la meta?" y "¿Quién lo usa y con qué frecuencia?". Cada respuesta convierte un deseo vago en un requisito comprobable.' },
    },
    {
      id: 'ex-l1-2', level: 2,
      title: { en: 'Write a testable requirement', es: 'Escribe un requisito comprobable' },
      prompt: { en: 'Rewrite "the login should be secure" as a requirement with a measurable condition.', es: 'Reescribe "el inicio de sesión debe ser seguro" como un requisito con una condición medible.' },
      hint: { en: 'Name the condition, the actor, and the expected result.', es: 'Nombra la condición, el actor y el resultado esperado.' },
      solution: { en: 'Example: "After 5 failed logins within 10 minutes, the account is locked for 15 minutes and the user receives an email." A tester can now check it.', es: 'Ejemplo: "Tras 5 intentos fallidos en 10 minutos, la cuenta se bloquea 15 minutos y el usuario recibe un correo." Ahora un tester puede comprobarlo.' },
    },
  ],
  'w1-l2-lifecycle-and-process': [
    {
      id: 'ex-l2-1', level: 1,
      title: { en: 'Pick a model', es: 'Elige un modelo' },
      prompt: { en: 'A government form has fixed legal rules that will not change for two years. Which process model fits best, and why?', es: 'Un formulario oficial tiene reglas legales fijas que no cambiarán en dos años. ¿Qué modelo encaja mejor y por qué?' },
      hint: { en: 'Think about how much change you expect after the requirements are signed.', es: 'Piensa cuánto cambio esperas después de firmar los requisitos.' },
      solution: { en: 'A sequential (waterfall-style) process can fit, because requirements are stable and early mistakes would be expensive. An iterative process would also work if the team wants early feedback on the interface.', es: 'Puede encajar un proceso secuencial (tipo cascada), porque los requisitos son estables y los errores tempranos serían caros. Un proceso iterativo también sirve si el equipo quiere retroalimentación temprana de la interfaz.' },
    },
    {
      id: 'ex-l2-2', level: 2,
      title: { en: 'Draw your own baseline history', es: 'Dibuja tu propio historial de líneas base' },
      prompt: { en: 'A team builds a chat app in three iterations: login, messages, and notifications. Name the baseline and increment after iteration 2.', es: 'Un equipo construye una app de chat en tres iteraciones: inicio de sesión, mensajes y notificaciones. Nombra la línea base y el incremento tras la iteración 2.' },
      hint: { en: 'A baseline is a working version; the increment is the difference from the previous one.', es: 'Una línea base es una versión funcional; el incremento es la diferencia con la anterior.' },
      solution: { en: 'Baseline 2 is login plus messages, working and documented. The increment is the messaging feature compared with baseline 1.', es: 'La línea base 2 es inicio de sesión más mensajes, funcional y documentada. El incremento es la función de mensajes comparada con la línea base 1.' },
    },
  ],
  'w1-l3-configuration-management': [
    {
      id: 'ex-l3-1', level: 1,
      title: { en: 'Inventory the configuration items', es: 'Inventaría los elementos de configuración' },
      prompt: { en: 'List five configuration items for a mobile app that are not source code.', es: 'Enumera cinco elementos de configuración de una app móvil que no sean código fuente.' },
      hint: { en: 'Think about documents, tests, build settings, and releases.', es: 'Piensa en documentos, pruebas, configuración de compilación y versiones.' },
      solution: { en: 'Examples: requirements specification, UI design files, test plan and test scripts, build configuration files, release notes, user manual.', es: 'Ejemplos: especificación de requisitos, archivos de diseño de la interfaz, plan y scripts de prueba, archivos de configuración de compilación, notas de versión, manual de usuario.' },
    },
    {
      id: 'ex-l3-2', level: 3,
      title: { en: 'Trace a bug to a baseline', es: 'Rastrea un error hasta una línea base' },
      prompt: { en: 'Production shows a bug that was not in the test build. Describe the four SCM questions you would answer to find the cause.', es: 'Producción muestra un error que no estaba en la compilación de prueba. Describe las cuatro preguntas de la GCS que responderías para hallar la causa.' },
      hint: { en: 'Identification, version control, change control, status accounting.', es: 'Identificación, control de versiones, control de cambios, contabilidad de estado.' },
      solution: { en: 'Which exact versions are in production (identification)? What changed between the test build and production (version control)? Which changes were approved and by whom (change control)? Is the production build the one recorded in the baseline (status accounting)?', es: '¿Qué versiones exactas están en producción (identificación)? ¿Qué cambió entre la compilación de prueba y producción (control de versiones)? ¿Qué cambios se aprobaron y quién (control de cambios)? ¿La compilación de producción es la registrada en la línea base (contabilidad de estado)?' },
    },
  ],
  'w1-l4-version-control': [
    {
      id: 'ex-l4-1', level: 1,
      title: { en: 'Fix the commit message', es: 'Corrige el mensaje de commit' },
      prompt: { en: 'Rewrite these messages in the imperative style: "stuff", "Fixed the bug.", "Added a new function for sums".', es: 'Reescribe estos mensajes en estilo imperativo: "cosas", "Fixed the bug.", "Added a new function for sums".' },
      hint: { en: 'Start with a verb, lower-case, no final full stop, about 50 characters.', es: 'Empieza con un verbo, en minúscula, sin punto final, unos 50 caracteres.' },
      solution: { en: 'fix login redirect loop | fix bug where ... (name the bug) | add sum function. Specific verbs help reviewers scan history quickly.', es: 'fix login redirect loop | fix bug ... (nombra el error) | add sum function. Los verbos específicos ayudan a leer el historial rápido.' },
    },
    {
      id: 'ex-l4-2', level: 2,
      title: { en: 'Split a commit', es: 'Divide un commit' },
      prompt: { en: 'One commit mixes a bug fix, a rename, and a new test. Describe how you would split it into three logical commits.', es: 'Un commit mezcla una corrección, un cambio de nombre y una prueba nueva. Describe cómo lo dividirías en tres commits lógicos.' },
      hint: { en: 'Stage related files together and commit each group in turn.', es: 'Prepara los archivos relacionados juntos y haz commit de cada grupo por turno.' },
      solution: { en: 'Stage the bug fix files, commit; stage the renamed files, commit; stage the test, commit. Each commit can now be reviewed or reverted alone.', es: 'Prepara los archivos de la corrección y haz commit; prepara los archivos renombrados y haz commit; prepara la prueba y haz commit. Ahora cada commit se puede revisar o revertir por separado.' },
    },
  ],
  'w1-l5-git-fundamentals': [
    {
      id: 'ex-l5-1', level: 1,
      title: { en: 'Predict the status', es: 'Predice el estado' },
      prompt: { en: 'You edit a.txt, then run git add a.txt, then edit a.txt again. Is the second edit staged? What does git status show?', es: 'Editas a.txt, ejecutas git add a.txt y luego editas a.txt otra vez. ¿La segunda edición está preparada? ¿Qué muestra git status?' },
      hint: { en: 'Staging captures the file at the moment you run git add.', es: 'La preparación captura el archivo en el momento de ejecutar git add.' },
      solution: { en: 'No: the second edit is not staged. git status lists a.txt under both "Changes to be committed" (the first version) and "Changes not staged for commit" (the newer edit).', es: 'No: la segunda edición no está preparada. git status muestra a.txt en "Changes to be committed" (la primera versión) y en "Changes not staged for commit" (la edición nueva).' },
    },
    {
      id: 'ex-l5-2', level: 2,
      title: { en: 'Read the graph', es: 'Lee el grafo' },
      prompt: { en: 'Run git log --oneline --graph --all in a sandbox after Lab 2. Explain in one sentence why main and feature-sum point to the same commit.', es: 'Ejecuta git log --oneline --graph --all en la carpeta de prueba tras el Laboratorio 2. Explica en una frase por qué main y feature-sum apuntan al mismo commit.' },
      hint: { en: 'What happens when the branch you merge into has no new commits?', es: '¿Qué pasa cuando la rama destino no tiene commits nuevos?' },
      solution: { en: 'main had no new commits since feature-sum split, so Git moved the pointer forward (fast-forward) instead of creating a merge commit.', es: 'main no tenía commits nuevos desde que se separó feature-sum, así que Git movió el puntero hacia adelante (fast-forward) en lugar de crear un commit de fusión.' },
    },
    {
      id: 'ex-l5-3', level: 3,
      title: { en: 'Resolve by intent', es: 'Resuelve según la intención' },
      prompt: { en: 'Two branches changed the same function: one renamed a parameter, the other added validation. Describe the resolution you want and the commands.', es: 'Dos ramas cambiaron la misma función: una renombró un parámetro y la otra añadió validación. Describe la resolución que quieres y los comandos.' },
      hint: { en: 'Keep both intents, then stage and commit.', es: 'Conserva ambas intenciones, luego prepara y haz commit.' },
      solution: { en: 'Edit the function so it uses the new parameter name and includes the validation. Remove all markers, run git add on the file, then git commit to finish the merge.', es: 'Edita la función para usar el nuevo nombre del parámetro e incluir la validación. Quita todos los marcadores, ejecuta git add sobre el archivo y luego git commit para terminar la fusión.' },
    },
  ],
  'w1-l6-github-and-collaboration': [
    {
      id: 'ex-l6-1', level: 1,
      title: { en: 'Order the workflow', es: 'Ordena el flujo de trabajo' },
      prompt: { en: 'Put these in order: merge, open pull request, push feature branch, review and approve, create branch.', es: 'Ordena estos pasos: fusionar, abrir solicitud de cambio, subir la rama, revisar y aprobar, crear la rama.' },
      hint: { en: 'You cannot open a request before the branch exists on the remote.', es: 'No puedes abrir una solicitud antes de que la rama exista en el remoto.' },
      solution: { en: 'Create branch → push feature branch → open pull request → review and approve → merge.', es: 'Crear la rama → subir la rama → abrir la solicitud de cambio → revisar y aprobar → fusionar.' },
    },
    {
      id: 'ex-l6-2', level: 3,
      title: { en: 'Recover from a rejected push', es: 'Recupérate de un push rechazado' },
      prompt: { en: 'A teammate pushed to main while you were working. Your git push is rejected. Write the safe sequence of commands.', es: 'Un compañero subió cambios a main mientras trabajabas. Tu git push fue rechazado. Escribe la secuencia segura de comandos.' },
      hint: { en: 'Fetch first, integrate, then push. Never force.', es: 'Primero fetch, luego integra y luego push. Nunca fuerces.' },
      solution: { en: 'git fetch origin, then git pull origin main (or git rebase origin/main), resolve any conflicts, run tests, then git push origin main.', es: 'git fetch origin, luego git pull origin main (o git rebase origin/main), resuelve conflictos, ejecuta pruebas y luego git push origin main.' },
    },
  ],
};

/** Short analogies that make the core idea concrete. */
export const week1Analogies: Record<string, { en: string; es: string }> = {
  'w1-l1-what-is-software-engineering': {
    en: 'Building a house needs blueprints before bricks. Software needs plans and models before code, because changing a wall on paper costs far less than tearing it down.',
    es: 'Construir una casa necesita planos antes que ladrillos. El software necesita planes y modelos antes que código, porque cambiar un muro en el papel cuesta mucho menos que derribarlo.',
  },
  'w1-l2-lifecycle-and-process': {
    en: 'Think of a cooking class. Waterfall is following a recipe from start to finish without tasting. Iterative work is tasting the sauce after each step and adjusting the next one.',
    es: 'Piensa en una clase de cocina. Cascada es seguir una receta de principio a fin sin probar. El trabajo iterativo es probar la salsa después de cada paso y ajustar el siguiente.',
  },
  'w1-l3-configuration-management': {
    en: 'A library keeps a catalogue of every edition and who borrowed it. SCM does the same for a product: every item, version, and change has a record you can check.',
    es: 'Una biblioteca mantiene un catálogo de cada edición y de quién la prestó. La GCS hace lo mismo con un producto: cada elemento, versión y cambio tiene un registro que puedes consultar.',
  },
  'w1-l4-version-control': {
    en: 'Version control is like a video game with save points. You can go back to any save, see what changed between two saves, and let friends play from their own copy.',
    es: 'El control de versiones es como un videojuego con puntos de guardado. Puedes volver a cualquier punto, ver qué cambió entre dos y dejar que tus amigos jueguen desde su propia copia.',
  },
  'w1-l5-git-fundamentals': {
    en: 'Git is a photo studio. The working directory is the set, staging is choosing which photos go in the album, and commit is printing the album page. A branch is a second album you can build without touching the first.',
    es: 'Git es un estudio fotográfico. El directorio de trabajo es el set, la preparación es elegir qué fotos van al álbum, y el commit es imprimir la página del álbum. Una rama es un segundo álbum que puedes armar sin tocar el primero.',
  },
  'w1-l6-github-and-collaboration': {
    en: 'A pull request is like a draft essay sent to a classmate before handing it in. The reviewer does not write it for you, but catches mistakes while they are cheap to fix.',
    es: 'Una solicitud de cambio es como un borrador enviado a un compañero antes de entregar el trabajo. El revisor no lo escribe por ti, pero detecta errores mientras son fáciles de corregir.',
  },
};
