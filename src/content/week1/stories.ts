import type { Story } from '../types';

/** Animated mini-stories for Week 1. Each scene moves the token to a station. */
export const week1Stories: Story[] = [
  {
    id: 'story-lifecycle', lessonId: 'w1-l2-lifecycle-and-process',
    title: { en: 'From an idea to working software', es: 'De una idea a software que funciona' },
    stations: [
      { label: { en: 'Need', es: 'Necesidad' }, glyph: '?' },
      { label: { en: 'Requirements', es: 'Requisitos' }, glyph: '≡' },
      { label: { en: 'Design', es: 'Diseño' }, glyph: '◇' },
      { label: { en: 'Code', es: 'Código' }, glyph: '{ }' },
      { label: { en: 'Tests', es: 'Pruebas' }, glyph: '✓' },
      { label: { en: 'Release', es: 'Entrega' }, glyph: '↑' },
    ],
    scenes: [
      { at: 0, caption: { en: 'A café owner says: "customers wait too long to pay."', es: 'La dueña de un café dice: "los clientes esperan demasiado para pagar".' } },
      { at: 1, caption: { en: 'Requirements turn the wish into something testable: "pay in under 30 seconds".', es: 'Los requisitos convierten el deseo en algo comprobable: "pagar en menos de 30 segundos".' } },
      { at: 2, caption: { en: 'Design decides the parts: a QR menu, a payment screen, a receipt.', es: 'El diseño decide las partes: un menú QR, una pantalla de pago y un recibo.' } },
      { at: 3, caption: { en: 'Developers build one small piece per iteration and commit often.', es: 'El equipo construye una pieza pequeña por iteración y hace commits frecuentes.' } },
      { at: 4, caption: { en: 'Tests check the requirement. 45 seconds? Back to code.', es: 'Las pruebas verifican el requisito. ¿45 segundos? De vuelta al código.' }, mood: 'alert' },
      { at: 3, caption: { en: 'A faster payment flow is committed: a new increment.', es: 'Se confirma un flujo de pago más rápido: un nuevo incremento.' } },
      { at: 4, caption: { en: '25 seconds. The test passes.', es: '25 segundos. La prueba pasa.' }, mood: 'ok' },
      { at: 5, caption: { en: 'The baseline is released. Feedback starts the next loop.', es: 'Se entrega la línea base. La retroalimentación inicia la siguiente vuelta.' }, mood: 'ok' },
    ],
  },
  {
    id: 'story-commit-journey', lessonId: 'w1-l5-git-fundamentals',
    title: { en: 'The journey of a change', es: 'El viaje de un cambio' },
    stations: [
      { label: { en: 'Working dir', es: 'Directorio' }, glyph: '✎' },
      { label: { en: 'Staging', es: 'Preparación' }, glyph: '▣' },
      { label: { en: 'Repository', es: 'Repositorio' }, glyph: '◉' },
      { label: { en: 'origin', es: 'origin' }, glyph: '☁' },
    ],
    scenes: [
      { at: 0, caption: { en: 'You edit README.md. Git notices: "modified".', es: 'Editas README.md. Git lo nota: "modified".' } },
      { at: 1, caption: { en: 'git add README.md puts this exact version in staging.', es: 'git add README.md pone esta versión exacta en preparación.' } },
      { at: 2, caption: { en: 'git commit -m "update intro" records a snapshot in history.', es: 'git commit -m "update intro" registra una instantánea en el historial.' }, mood: 'ok' },
      { at: 3, caption: { en: 'git push sends the commit to origin, so the team can see it.', es: 'git push envía el commit a origin para que el equipo lo vea.' }, mood: 'ok' },
    ],
  },
  {
    id: 'story-conflict', lessonId: 'w1-l6-github-and-collaboration',
    title: { en: 'Two teammates, one line', es: 'Dos compañeros, una línea' },
    stations: [
      { label: { en: 'Ana', es: 'Ana' }, glyph: 'A' },
      { label: { en: 'main', es: 'main' }, glyph: '⑂' },
      { label: { en: 'Luis', es: 'Luis' }, glyph: 'L' },
      { label: { en: 'Review', es: 'Revisión' }, glyph: '✓' },
    ],
    scenes: [
      { at: 0, caption: { en: 'Ana changes the greeting on line 3 to "Hello".', es: 'Ana cambia el saludo de la línea 3 a "Hello".' } },
      { at: 2, caption: { en: 'Luis changes the same line to "Hi there".', es: 'Luis cambia la misma línea a "Hi there".' } },
      { at: 1, caption: { en: 'Both merge into main. Git stops: CONFLICT. It cannot choose for them.', es: 'Ambos fusionan en main. Git se detiene: CONFLICT. No puede elegir por ellos.' }, mood: 'alert' },
      { at: 1, caption: { en: 'They agree on "Hello there", remove the markers, git add, git commit.', es: 'Acuerdan "Hello there", quitan los marcadores, git add, git commit.' } },
      { at: 3, caption: { en: 'A pull request review confirms the result before it ships.', es: 'Una revisión del pull request confirma el resultado antes de publicarlo.' }, mood: 'ok' },
    ],
  },
];
