import type { Localized, Story } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Animated mini stories for Calculus 1, Week 1. */
export const calcWeek1Stories: Story[] = [
  {
    id: 'calc1-story-parabola', lessonId: 'calc1-l2-quadratic-parabola',
    title: L('The flight of a ball', 'El vuelo de una pelota', 'O voo de uma bola'),
    stations: [
      { label: L('Kick', 'Patada', 'Chute'), glyph: '↗' },
      { label: L('Rising', 'Subiendo', 'Subindo'), glyph: '↑' },
      { label: L('Vertex', 'Vértice', 'Vértice'), glyph: 'V' },
      { label: L('Falling', 'Bajando', 'Descendo'), glyph: '↓' },
      { label: L('Landing', 'Aterrizaje', 'Aterrissagem'), glyph: '0' },
    ],
    scenes: [
      { at: 0, caption: L('h(t) = −5t² + 30t + 2. At t = 0 the ball is at 2 m: that is c, the y-intercept.', 'h(t) = −5t² + 30t + 2. En t = 0 la pelota está a 2 m: eso es c, el corte con el eje y.', 'h(t) = −5t² + 30t + 2. Em t = 0 a bola está a 2 m: isso é c, o corte com o eixo y.') },
      { at: 1, caption: L('a = −5 is negative, so the parabola opens down: the ball rises and then falls.', 'a = −5 es negativo, así que la parábola abre hacia abajo: la pelota sube y luego baja.', 'a = −5 é negativo, então a parábola abre para baixo: a bola sobe e depois desce.') },
      { at: 2, caption: L('The vertex: t = −b/2a = 3 s and h(3) = 47 m. That is the maximum height.', 'El vértice: t = −b/2a = 3 s y h(3) = 47 m. Esa es la altura máxima.', 'O vértice: t = −b/2a = 3 s e h(3) = 47 m. Essa é a altura máxima.'), mood: 'ok' },
      { at: 3, caption: L('After the vertex the path mirrors itself: at t = 2 and t = 4 the height is the same, 42 m.', 'Después del vértice la trayectoria se refleja: en t = 2 y t = 4 la altura es la misma, 42 m.', 'Depois do vértice a trajetória se espelha: em t = 2 e t = 4 a altura é a mesma, 42 m.') },
      { at: 4, caption: L('It lands when h(t) = 0: the positive root of −5t² + 30t + 2 = 0, about 6.07 s.', 'Aterriza cuando h(t) = 0: la raíz positiva de −5t² + 30t + 2 = 0, aproximadamente 6,07 s.', 'Ela aterrissa quando h(t) = 0: a raiz positiva de −5t² + 30t + 2 = 0, cerca de 6,07 s.') },
    ],
  },
  {
    id: 'calc1-story-flip', lessonId: 'calc1-l6-intervals-linear',
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
    id: 'calc1-story-signchart', lessonId: 'calc1-l7-sign-tables',
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
