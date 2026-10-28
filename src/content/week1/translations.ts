/**
 * Spanish overlay for Week 1. English is the source; these entries supply the
 * Spanish text that index.ts merges into the content objects.
 */

/** Full Spanish paragraphs for each lesson body. */
export const lessonBodyEs: Record<string, string[]> = {
  'w1-l1-what-is-software-engineering': [
    'Programar es escribir instrucciones que una computadora puede ejecutar. La ingeniería de software añade la disciplina necesaria para entregar un sistema que funcione, que pueda cambiarse y que las personas que dependen de él entiendan. La diferencia importa porque la mayoría de los fallos de software no son errores de tecleo: vienen de requisitos poco claros, mala planificación, documentación ausente y falta de comunicación entre el cliente y quienes construyen el sistema.',
    'Una forma útil de ver la brecha es una cadena de traducciones. El cliente tiene una necesidad real. La describe de forma imperfecta. Ventas promete algo. Los analistas escriben requisitos. Los diseñadores proponen una estructura. Los programadores escriben código. Cada paso puede perder significado. La ingeniería de software intenta que cada paso sea explícito y comprobable, con especificaciones escritas, revisiones y pruebas.',
    'El software además es un producto especial. Es intangible, cambia con frecuencia y casi nunca está terminado. Por eso los ingenieros trabajan con modelos: descripciones simplificadas de un sistema, como un diagrama de flujo de datos o una lista de casos de uso. Un buen modelo es lo bastante abstracto para ser simple, lo bastante preciso para confiar en él y lo bastante barato para cambiarlo antes de escribir código.',
  ],
  'w1-l2-lifecycle-and-process': [
    'Un proceso de desarrollo de software define qué se hace, quién lo hace, cuándo y cómo. Todo proceso realiza cuatro actividades generales: especificar el software, desarrollarlo, validarlo y evolucionarlo después de la entrega. El ciclo de vida es la secuencia de fases por las que pasa un producto: análisis de requisitos, diseño, implementación, pruebas, despliegue y mantenimiento.',
    'Un proceso en cascada ejecuta estas fases una sola vez, en orden. Es fácil de planificar, pero lento para reaccionar al cambio, y los problemas descubiertos en las pruebas son caros de corregir. Un proceso iterativo e incremental divide el proyecto en iteraciones. Cada iteración planifica, analiza, diseña, construye y prueba una parte pequeña, y produce una línea base: una versión funcional y parcialmente completa del sistema. La diferencia entre dos líneas base es un incremento.',
    'Los procesos de tipo unificado organizan las iteraciones en fases: inicio (objetivos y alcance), elaboración (arquitectura y riesgos principales), construcción (creación del sistema) y transición (entrega). Los métodos adaptativos, como Scrum, aplican la misma idea con ciclos cortos y retroalimentación frecuente de los usuarios. En todos los casos, la pregunta clave es cuán pronto el equipo aprende algo que sería caro descubrir tarde.',
  ],
  'w1-l3-configuration-management': [
    'La gestión de la configuración del software (GCS) controla cómo cambian las partes de un sistema con el tiempo. Sus elementos no son solo código fuente: los documentos de requisitos, los diseños, los scripts de prueba, los archivos de compilación y los manuales son elementos de configuración. El objetivo es saber exactamente qué versión de cada elemento pertenece a qué versión del producto.',
    'La GCS se apoya en cuatro ideas. La identificación nombra cada elemento y cada versión. El control de versiones registra cada cambio. El control de cambios decide qué cambios se aprueban y cuándo. La contabilidad de estado informa qué hay en cada línea base. Después, una auditoría comprueba que la línea base coincide con lo que se pretendía.',
    'Sin GCS, los equipos tienen dificultades con preguntas como "¿qué compilación está en producción?" o "¿por qué esta prueba pasó ayer?". Mantener una línea base estable permite que las personas sigan trabajando en paralelo sin sobrescribir el trabajo de otros.',
  ],
  'w1-l4-version-control': [
    'Un sistema de control de versiones (VCS) registra los cambios de los archivos a lo largo del tiempo. Ofrece un historial de qué cambió, cuándo y quién lo cambió; la posibilidad de recuperar versiones anteriores; y una forma para que varias personas trabajen en el mismo proyecto sin perder el trabajo de las demás.',
    'Los sistemas centralizados mantienen un repositorio maestro en un servidor. Los sistemas distribuidos, como Git, dan a cada desarrollador una copia local completa del repositorio y de su historial. Puedes hacer commits, crear ramas y consultar el historial sin conexión, y compartir cambios cuando estés conectado. Git es un VCS distribuido. GitHub, GitLab y servicios similares alojan repositorios Git y añaden funciones de colaboración; no son Git en sí.',
    'Un commit es una instantánea del proyecto con un mensaje. Los buenos commits representan un solo cambio lógico, y sus mensajes dicen qué cambió en modo imperativo, por ejemplo "add sum functionality" o "fix off-by-one in pagination". Los commits pequeños y frecuentes hacen que el historial sea más fácil de leer y de revertir.',
  ],
  'w1-l5-git-fundamentals': [
    'Git tiene tres áreas. El directorio de trabajo contiene los archivos que editas. El área de preparación (también llamada índice) contiene los cambios que elegiste para el siguiente commit. El repositorio, guardado en la carpeta oculta .git, contiene el historial confirmado. La mayoría de los comandos mueven cambios entre estas áreas: git add lleva el trabajo a la preparación, y git commit lleva lo preparado al repositorio.',
    'El ciclo diario es: editar, revisar, preparar, confirmar. Ejecuta git status con frecuencia; muestra qué archivos están modificados, cuáles están preparados y cuáles no tienen seguimiento. Usa git log --oneline --graph para leer el historial. Usa git diff para ver los cambios no preparados y git diff --staged para ver lo que contendrá el siguiente commit.',
    'Una rama es un puntero móvil a un commit. Crear una rama no copia archivos. Te permite desarrollar una funcionalidad sin cambiar main. Cuando la funcionalidad está lista, la fusionas de vuelta. Si ambas ramas cambiaron las mismas líneas, Git se detiene y marca un conflicto: el archivo contiene marcadores <<<<<<<, ======= y >>>>>>> que muestran las dos versiones. Editas el archivo hasta el resultado deseado, lo preparas y haces commit.',
  ],
  'w1-l6-github-and-collaboration': [
    'Un remoto es un enlace con nombre a otro repositorio, que por convención se llama origin. git remote add origin <url> lo registra. git push -u origin main sube tu rama main y configura el upstream. git fetch descarga commits nuevos sin cambiar tus archivos; git pull hace fetch y luego integra esos commits en tu rama actual.',
    'Un flujo de trabajo habitual en equipo usa ramas de funcionalidad con solicitudes de cambio (llamadas merge requests en GitLab). Creas una rama, la subes y abres una solicitud. Quienes revisan leen el diff, comentan y aprueban. Solo después de la aprobación la rama se fusiona con main. El paso de revisión es donde los equipos detectan defectos y comparten conocimiento.',
    'La buena colaboración también significa mantener main estable, actualizar tu copia local antes de empezar a trabajar y escribir commits que quien revisa pueda entender uno por uno.',
  ],
};

/** Spanish text for question fields. Only the provided fields are replaced. */
export const questionEs: Record<string, {
  prompt?: string;
  options?: string[];
  explanation?: string;
  whyWrong?: string[];
  left?: string[];
  right?: string[];
  code?: string;
}> = {
  'q-mc-ci': {
    prompt: '¿Qué elemento es un elemento de configuración en la gestión de la configuración del software?',
    options: ['Un documento de requisitos', 'La cafetera de la oficina', 'Un calendario personal'],
    explanation: 'Cualquier artefacto que forme parte del producto o de su documentación puede ser un elemento de configuración. Los requisitos son un ejemplo central.',
    whyWrong: ['Es la respuesta correcta.', 'No forma parte del producto ni de su documentación.', 'Los datos de planificación personal están fuera del producto.'],
  },
  'q-mc-dist': {
    prompt: '¿Qué afirmación sobre Git es correcta?',
    options: [
      'Git es un sistema de control de versiones distribuido; cada clon contiene el historial completo.',
      'Git no puede registrar un commit sin una conexión a internet a GitHub.',
      'Git y GitHub son dos nombres para la misma herramienta.',
    ],
    explanation: 'Cada clon tiene el repositorio y el historial completos, así que puedes hacer commits sin conexión.',
    whyWrong: ['Los commits son locales; la red solo hace falta para compartirlos.', 'GitHub es un servicio de alojamiento, no es Git en sí.'],
  },
  'q-mc-baseline': {
    prompt: 'En un proceso iterativo e incremental, ¿qué representa la diferencia entre dos líneas base sucesivas?',
    options: ['Un incremento', 'Un registro de riesgos', 'Solo la entrega final'],
    explanation: 'Por definición, la diferencia entre dos líneas base es un incremento.',
  },
  'q-tf-git-github': {
    prompt: 'Verdadero o falso: Git y GitHub son el mismo producto.',
    options: ['Verdadero', 'Falso'],
    explanation: 'Falso. Git es la herramienta de control de versiones. GitHub aloja repositorios Git y añade funciones de colaboración.',
  },
  'q-tf-add': {
    prompt: 'Verdadero o falso: git add crea un commit en el historial del repositorio.',
    options: ['Verdadero', 'Falso'],
    explanation: 'Falso. git add solo prepara los cambios. git commit los registra.',
  },
  'q-tf-branch': {
    prompt: 'Verdadero o falso: crear una rama de Git copia todos los archivos del proyecto.',
    options: ['Verdadero', 'Falso'],
    explanation: 'Falso. Una rama es un puntero a un commit. Git no copia los archivos al crear una.',
  },
  'q-fill-staging': {
    prompt: 'Los cambios elegidos para el siguiente commit esperan en el área de ____. (Pista: también se llama índice.)',
    explanation: 'El área de preparación, también llamada índice, contiene los cambios que irán en el siguiente commit.',
  },
  'q-fill-branch-cmd': {
    prompt: 'Escribe un comando que cree y cambie a una rama llamada feature-login (sintaxis moderna).',
    explanation: 'git switch -c crea y cambia de rama. git checkout -b hace lo mismo con la sintaxis anterior.',
  },
  'q-short-fetch-pull': {
    prompt: 'En dos frases, explica la diferencia entre git fetch y git pull.',
    explanation: 'fetch descarga los commits remotos sin cambiar tu rama de trabajo. pull hace fetch y luego los integra en tu rama actual.',
  },
  'q-short-small-commits': {
    prompt: 'Menciona un beneficio de los commits pequeños y enfocados.',
    explanation: 'Los commits pequeños son más fáciles de revisar, entender y revertir si un solo cambio rompe algo.',
  },
  'q-match-commands': {
    prompt: 'Relaciona cada comando con su propósito.',
    left: ['git add', 'git commit', 'git status', 'git fetch'],
    right: ['Muestra archivos modificados, preparados y sin seguimiento', 'Mueve los cambios al área de preparación', 'Descarga commits remotos sin fusionarlos', 'Registra los cambios preparados como un commit nuevo'],
    explanation: 'add prepara, commit registra, status informa y fetch descarga commits remotos sin cambiar tus archivos.',
  },
  'q-match-process': {
    prompt: 'Relaciona cada modelo de proceso con su característica principal.',
    left: ['Cascada', 'Iterativo e incremental', 'Adaptativo (por ejemplo, Scrum)'],
    right: ['Ciclos cortos con retroalimentación frecuente de los usuarios', 'Las fases se ejecutan una vez, en orden', 'Iteraciones repetidas que producen líneas base'],
    explanation: 'Cascada es secuencial; el trabajo iterativo produce líneas base; los métodos adaptativos hacen ciclos cortos de retroalimentación.',
  },
  'q-code-status': {
    prompt: 'Interpreta los comandos. ¿Qué informa git status sobre notes.txt?',
    options: [
      'notes.txt aparece en "Changes to be committed"',
      'notes.txt ya está en el historial del repositorio',
      'notes.txt no ha cambiado',
    ],
    explanation: 'El cambio se prepara con git add, así que git status lo lista como listo para commit. Nada entra al historial hasta que se ejecuta git commit.',
  },
  'q-code-log': {
    prompt: 'Interpreta el comando. ¿Qué mostrará la salida?',
    options: [
      'Los tres commits más recientes, uno por línea, con hashes cortos y mensajes',
      'Los tres archivos más antiguos del proyecto',
      'Las tres ramas con más conflictos',
    ],
    explanation: '--oneline muestra un commit por línea, y -3 limita la salida a tres commits, del más reciente al más antiguo.',
  },
  'q-scenario-baseline': {
    prompt: 'Un compañero dice que la última versión se comporta incorrectamente. ¿Qué pregunta harías primero?',
    options: [
      '¿Qué elementos de configuración y versiones están en esa línea base?',
      '¿Quién tiene la computadora más rápida?',
      '¿Podemos borrar el repositorio y empezar de nuevo?',
    ],
    explanation: 'Antes de depurar, identifica exactamente qué versiones se publicaron. La GCS hace que esto sea trazable.',
  },
  'q-scenario-review': {
    prompt: 'Quieres que un compañero revise tu cambio de inicio de sesión antes de que llegue a main. ¿Qué haces?',
    options: [
      'Subo una rama de funcionalidad y abro una solicitud de cambio para revisión',
      'Subo directamente a main y pido comentarios después',
      'Envío por correo un zip del proyecto',
    ],
    explanation: 'Una rama de funcionalidad con solicitud de cambio permite que quien revisa vea el diff y apruebe antes de fusionar.',
  },
  'q-scenario-merge': {
    prompt: 'Dos ramas cambiaron la misma línea de app.js. La fusión se detiene. ¿Qué pasó?',
    options: [
      'Un conflicto de fusión; una persona debe elegir el contenido final',
      'Git borró el repositorio',
      'El remoto está desconectado',
    ],
    explanation: 'Git no puede elegir entre dos ediciones distintas de las mismas líneas, así que marca el conflicto para que lo resuelvas.',
  },
  'q-trouble-push': {
    prompt: 'git push es rechazado porque el remoto tiene commits que no tienes localmente. ¿Cuál es la solución más segura?',
    options: [
      'Ejecutar git fetch, integrar los cambios remotos (merge o rebase) y luego volver a hacer push',
      'Ejecutar git push --force para sobrescribir el remoto',
      'Borrar tu repositorio local y clonar de nuevo',
    ],
    explanation: 'Integra primero el trabajo remoto. Un push forzado puede borrar los commits de un compañero y debe evitarse en ramas compartidas.',
    whyWrong: ['Es correcto.', 'Sobrescribe el historial remoto y puede destruir el trabajo de compañeros.', 'Innecesario, y pierdes tus commits no subidos.'],
  },
  'q-trouble-identity': {
    prompt: 'git commit falla con "Author identity unknown". ¿Qué debes hacer?',
    options: [
      'Configurar tu nombre y correo con git config --global user.name y user.email',
      'Borrar la carpeta .git',
      'Hacer commit con git add -f',
    ],
    explanation: 'Git guarda el nombre y el correo del autor en cada commit, así que ambos deben configurarse primero.',
  },
  'q-trouble-conflict': {
    prompt: 'Después de una fusión, un archivo todavía contiene líneas <<<<<<< HEAD. ¿Cuál es la resolución correcta?',
    options: [
      'Editar el archivo con el contenido deseado, quitar las líneas de marcador, hacer git add del archivo y luego commit',
      'Dejar los marcadores y hacer commit de todos modos',
      'Ejecutar git merge --abort después de hacer commit',
    ],
    explanation: 'Los marcadores no son código válido. Elige el contenido final, quita todos los marcadores, prepara el archivo y completa la fusión con un commit.',
  },
};
