import type { Localized, Story } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Animated mini stories for Calculus 1, Week 1. */
export const calcWeek1Stories: Story[] = [
  {
    id: 'calc1-story-flip', lessonId: 'calc1-l6-linear-inequalities',
    title: L('Why the sign flips', 'Por qué se invierte el signo', 'Por que o sinal se inverte'),
    stations: [
      { label: L('−2 < 3', '−2 < 3', '−2 < 3'), glyph: '<' },
      { label: L('× (−1)', '× (−1)', '× (−1)'), glyph: '±' },
      { label: L('2 ? −3', '2 ? −3', '2 ? −3'), glyph: '?' },
      { label: L('2 > −3', '2 > −3', '2 > −3'), glyph: '>' },
    ],
    scenes: [
      { at: 0, caption: L('Start with something true: −2 is to the left of 3.', 'Empieza con algo verdadero: −2 está a la izquierda de 3.', 'Comece com algo verdadeiro: −2 está à esquerda de 3.') },
      { at: 1, caption: L('Multiply both sides by −1. Every number jumps to its mirror image across 0.', 'Multiplica ambos lados por −1. Cada número salta a su reflejo al otro lado del 0.', 'Multiplique os dois lados por −1. Cada número salta para seu reflexo do outro lado do 0.') },
      { at: 2, caption: L('Now 2 is on the right and −3 on the left. Keeping < would say 2 < −3, which is false.', 'Ahora 2 está a la derecha y −3 a la izquierda. Mantener < diría 2 < −3, que es falso.', 'Agora 2 está à direita e −3 à esquerda. Manter < diria 2 < −3, o que é falso.'), mood: 'alert' },
      { at: 3, caption: L('The order reversed, so the sign must reverse too: 2 > −3.', 'El orden se invirtió, así que el signo también: 2 > −3.', 'A ordem se inverteu, então o sinal também: 2 > −3.'), mood: 'ok' },
    ],
  },
  {
    id: 'calc1-story-signchart', lessonId: 'calc1-l7-sign-chart',
    title: L('A sign chart in four stops', 'Una tabla de signos en cuatro paradas', 'Um quadro de sinais em quatro paradas'),
    stations: [
      { label: L('= 0', '= 0', '= 0'), glyph: '0' },
      { label: L('Factor', 'Factorizar', 'Fatorar'), glyph: '×' },
      { label: L('Critical points', 'Puntos críticos', 'Pontos críticos'), glyph: '•' },
      { label: L('Test values', 'Valores de prueba', 'Valores de teste'), glyph: '±' },
      { label: L('Answer', 'Respuesta', 'Resposta'), glyph: '∪' },
    ],
    scenes: [
      { at: 0, caption: L('x² − x ≤ 6 becomes x² − x − 6 ≤ 0: zero on the right.', 'x² − x ≤ 6 se convierte en x² − x − 6 ≤ 0: cero a la derecha.', 'x² − x ≤ 6 vira x² − x − 6 ≤ 0: zero à direita.') },
      { at: 1, caption: L('Factor it: (x + 2)(x − 3) ≤ 0.', 'Factoriza: (x + 2)(x − 3) ≤ 0.', 'Fatore: (x + 2)(x − 3) ≤ 0.') },
      { at: 2, caption: L('The factors vanish at −2 and 3. These cut the line into three intervals.', 'Los factores se anulan en −2 y 3. Estos cortan la recta en tres intervalos.', 'Os fatores se anulam em −2 e 3. Eles cortam a reta em três intervalos.') },
      { at: 3, caption: L('Test −3: positive. Test 0: negative. Test 4: positive.', 'Prueba −3: positivo. Prueba 0: negativo. Prueba 4: positivo.', 'Teste −3: positivo. Teste 0: negativo. Teste 4: positivo.') },
      { at: 4, caption: L('We need ≤ 0: the middle interval with its ends, [−2, 3].', 'Necesitamos ≤ 0: el intervalo del medio con sus extremos, [−2, 3].', 'Precisamos de ≤ 0: o intervalo do meio com suas extremidades, [−2, 3].'), mood: 'ok' },
    ],
  },
];
