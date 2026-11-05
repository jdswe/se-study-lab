import type { Localized, Story } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Animated mini stories for Calculus 1, Week 2. */
export const calcWeek2Stories: Story[] = [
  {
    id: 'calc2-story-roundtrip', lessonId: 'calc2-l7-composition-inverse',
    title: L('A round trip through f and f⁻¹', 'Ida y vuelta por f y f⁻¹', 'Ida e volta por f e f⁻¹'),
    stations: [
      { label: L('25 °C', '25 °C', '25 °C'), glyph: 'x' },
      { label: L('× 1.8', '× 1,8', '× 1,8'), glyph: '×' },
      { label: L('+ 32', '+ 32', '+ 32'), glyph: '+' },
      { label: L('77 °F', '77 °F', '77 °F'), glyph: 'f' },
      { label: L('Back to 25 °C', 'De vuelta a 25 °C', 'De volta a 25 °C'), glyph: '↺' },
    ],
    scenes: [
      { at: 0, caption: L('Start with an input: 25 degrees Celsius.', 'Empieza con una entrada: 25 grados Celsius.', 'Comece com uma entrada: 25 graus Celsius.') },
      { at: 1, caption: L('f(C) = 1.8C + 32 first multiplies by 1.8: 45.', 'f(C) = 1,8C + 32 primero multiplica por 1,8: 45.', 'f(C) = 1,8C + 32 primeiro multiplica por 1,8: 45.') },
      { at: 2, caption: L('Then it adds 32: 77. Two machines in a row are a composition.', 'Luego suma 32: 77. Dos máquinas seguidas son una composición.', 'Depois soma 32: 77. Duas máquinas seguidas são uma composição.') },
      { at: 3, caption: L('The output is 77 °F. To go back, undo the steps in reverse order.', 'La salida es 77 °F. Para volver, deshaz los pasos en orden inverso.', 'A saída é 77 °F. Para voltar, desfaça os passos na ordem inversa.') },
      { at: 4, caption: L('f⁻¹(F) = (F − 32)/1.8: subtract 32, divide by 1.8, and 25 °C comes back. f⁻¹(f(x)) = x.', 'f⁻¹(F) = (F − 32)/1,8: resta 32, divide entre 1,8 y vuelve 25 °C. f⁻¹(f(x)) = x.', 'f⁻¹(F) = (F − 32)/1,8: subtraia 32, divida por 1,8 e volta 25 °C. f⁻¹(f(x)) = x.'), mood: 'ok' },
    ],
  },
  {
    id: 'calc2-story-halving', lessonId: 'calc2-l9-exp-log',
    title: L('A dose that halves', 'Una dosis que se reduce a la mitad', 'Uma dose que cai pela metade'),
    stations: [
      { label: L('0 h · 200 mg', '0 h · 200 mg', '0 h · 200 mg'), glyph: '●' },
      { label: L('6 h · 100 mg', '6 h · 100 mg', '6 h · 100 mg'), glyph: '½' },
      { label: L('12 h · 50 mg', '12 h · 50 mg', '12 h · 50 mg'), glyph: '¼' },
      { label: L('18 h · 25 mg', '18 h · 25 mg', '18 h · 25 mg'), glyph: '⅛' },
      { label: L('How long?', '¿Cuánto tiempo?', 'Quanto tempo?'), glyph: 'log' },
    ],
    scenes: [
      { at: 0, caption: L('A 200 mg dose enters the body. M(t) = 200·(1/2)^(t/6), with t in hours.', 'Entra al cuerpo una dosis de 200 mg. M(t) = 200·(1/2)^(t/6), con t en horas.', 'Uma dose de 200 mg entra no corpo. M(t) = 200·(1/2)^(t/6), com t em horas.') },
      { at: 1, caption: L('Every 6 hours the amount halves: equal steps in time multiply by the same factor.', 'Cada 6 horas la cantidad se reduce a la mitad: pasos iguales de tiempo multiplican por el mismo factor.', 'A cada 6 horas a quantidade cai pela metade: passos iguais de tempo multiplicam pelo mesmo fator.') },
      { at: 2, caption: L('The base 1/2 is between 0 and 1, so the function decreases: this is decay.', 'La base 1/2 está entre 0 y 1, así que la función decrece: es decaimiento.', 'A base 1/2 está entre 0 e 1, então a função decresce: é decaimento.') },
      { at: 3, caption: L('After 18 hours, three halvings: 200/8 = 25 mg. It never reaches exactly 0.', 'Después de 18 horas, tres mitades: 200/8 = 25 mg. Nunca llega exactamente a 0.', 'Depois de 18 horas, três metades: 200/8 = 25 mg. Nunca chega exatamente a 0.'), mood: 'alert' },
      { at: 4, caption: L('When is 10 mg left? (1/2)^(t/6) = 1/20, so t = 6·ln 20 / ln 2 ≈ 25.9 h. A logarithm finds the exponent.', '¿Cuándo quedan 10 mg? (1/2)^(t/6) = 1/20, así que t = 6·ln 20 / ln 2 ≈ 25,9 h. Un logaritmo encuentra el exponente.', 'Quando restam 10 mg? (1/2)^(t/6) = 1/20, então t = 6·ln 20 / ln 2 ≈ 25,9 h. Um logaritmo encontra o expoente.'), mood: 'ok' },
    ],
  },
  {
    id: 'calc2-story-ferris', lessonId: 'calc2-l8-trigonometric',
    title: L('One turn of a Ferris wheel', 'Una vuelta en la rueda de la fortuna', 'Uma volta na roda-gigante'),
    stations: [
      { label: L('Bottom · 2 m', 'Abajo · 2 m', 'Embaixo · 2 m'), glyph: '↓' },
      { label: L('Quarter · 20 m', 'Un cuarto · 20 m', 'Um quarto · 20 m'), glyph: '→' },
      { label: L('Top · 38 m', 'Arriba · 38 m', 'Topo · 38 m'), glyph: '↑' },
      { label: L('Three quarters · 20 m', 'Tres cuartos · 20 m', 'Três quartos · 20 m'), glyph: '←' },
      { label: L('Bottom again', 'Abajo otra vez', 'Embaixo de novo'), glyph: '↺' },
    ],
    scenes: [
      { at: 0, caption: L('h(t) = 20 − 18 cos(πt/5). At t = 0, cos 0 = 1, so h = 2 m: you board at the bottom.', 'h(t) = 20 − 18 cos(πt/5). En t = 0, cos 0 = 1, así que h = 2 m: subes abajo.', 'h(t) = 20 − 18 cos(πt/5). Em t = 0, cos 0 = 1, então h = 2 m: você embarca embaixo.') },
      { at: 1, caption: L('At t = 2.5 min the angle is π/2 and cos is 0: h = 20 m, the midline.', 'En t = 2,5 min el ángulo es π/2 y el coseno vale 0: h = 20 m, la línea media.', 'Em t = 2,5 min o ângulo é π/2 e o cosseno vale 0: h = 20 m, a linha média.') },
      { at: 2, caption: L('At t = 5 min the angle is π and cos is −1: h = 38 m, the top. The amplitude is 18.', 'En t = 5 min el ángulo es π y el coseno vale −1: h = 38 m, arriba. La amplitud es 18.', 'Em t = 5 min o ângulo é π e o cosseno vale −1: h = 38 m, o topo. A amplitude é 18.'), mood: 'ok' },
      { at: 3, caption: L('On the way down the heights repeat in reverse: 20 m again at t = 7.5 min.', 'Al bajar las alturas se repiten al revés: 20 m de nuevo en t = 7,5 min.', 'Na descida as alturas se repetem ao contrário: 20 m de novo em t = 7,5 min.') },
      { at: 4, caption: L('At t = 10 min you are back at 2 m: the period is 2π/(π/5) = 10 minutes.', 'En t = 10 min vuelves a 2 m: el período es 2π/(π/5) = 10 minutos.', 'Em t = 10 min você volta a 2 m: o período é 2π/(π/5) = 10 minutos.') },
    ],
  },
];
