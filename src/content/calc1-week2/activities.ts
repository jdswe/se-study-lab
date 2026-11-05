import type { Activity, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Interactive puzzles for Calculus 1, Week 2. */
export const calcWeek2Activities: Activity[] = [
  {
    id: 'calc2-act-classify-function', kind: 'classify', lessonId: 'calc2-l1-functions',
    title: L('Function or not?', '¿Función o no?', 'Função ou não?'),
    prompt: L('Sort each relation: does every input have exactly one output?', 'Clasifica cada relación: ¿cada entrada tiene exactamente una salida?', 'Classifique cada relação: cada entrada tem exatamente uma saída?'),
    buckets: [L('Function of x', 'Función de x', 'Função de x'), L('Not a function of x', 'No es función de x', 'Não é função de x')],
    items: [
      { text: L('y = 3x − 7', 'y = 3x − 7', 'y = 3x − 7'), bucket: 0 },
      { text: L('x² + y² = 9', 'x² + y² = 9', 'x² + y² = 9'), bucket: 1 },
      { text: L('y = √(x + 1)', 'y = √(x + 1)', 'y = √(x + 1)'), bucket: 0 },
      { text: L('x = y² − 4', 'x = y² − 4', 'x = y² − 4'), bucket: 1 },
      { text: L('y = |x| + 2', 'y = |x| + 2', 'y = |x| + 2'), bucket: 0 },
      { text: L('Each song → the playlists that contain it', 'Cada canción → las listas que la contienen', 'Cada música → as playlists que a contêm'), bucket: 1 },
      { text: L('Each book → its number of pages', 'Cada libro → su número de páginas', 'Cada livro → seu número de páginas'), bucket: 0 },
    ],
    explanation: L('The circle and the sideways parabola give two values of y for some x; a song can be in many playlists. The rest give one output each.', 'La circunferencia y la parábola acostada dan dos valores de y para algunos x; una canción puede estar en muchas listas. Las demás dan una salida cada una.', 'A circunferência e a parábola deitada dão dois valores de y para alguns x; uma música pode estar em muitas playlists. As demais dão uma saída cada.'),
  },
  {
    id: 'calc2-act-fill-domain', kind: 'code-fill', lessonId: 'calc2-l2-domain-range',
    title: L('Find the domain step by step', 'Halla el dominio paso a paso', 'Encontre o domínio passo a passo'),
    prompt: L('Complete the domain of f(x) = √(x + 3)/(x − 1).', 'Completa el dominio de f(x) = √(x + 3)/(x − 1).', 'Complete o domínio de f(x) = √(x + 3)/(x − 1).'),
    template: 'root:        x + 3 >= 0   ->  x >= {0}\ndenominator: x - 1 != 0    ->  x != {1}\ndomain:      [-3, 1) U ({2}, oo)',
    blanks: ['-3|−3', '1', '1'],
    explanation: L('The root needs x ≥ −3 and the denominator removes x = 1, so the domain is [−3, 1) ∪ (1, ∞).', 'La raíz necesita x ≥ −3 y el denominador quita x = 1, así que el dominio es [−3, 1) ∪ (1, ∞).', 'A raiz precisa de x ≥ −3 e o denominador tira x = 1, então o domínio é [−3, 1) ∪ (1, ∞).'),
  },
  {
    id: 'calc2-act-classify-symmetry', kind: 'classify', lessonId: 'calc2-l3-reading-graphs',
    title: L('Even, odd, or neither', 'Par, impar o ninguna', 'Par, ímpar ou nenhuma'),
    prompt: L('Replace x by −x in your head and sort each function.', 'Cambia x por −x mentalmente y clasifica cada función.', 'Troque x por −x de cabeça e classifique cada função.'),
    buckets: [L('Even', 'Par', 'Par'), L('Odd', 'Impar', 'Ímpar'), L('Neither', 'Ninguna', 'Nenhuma')],
    items: [
      { text: L('x² − 4', 'x² − 4', 'x² − 4'), bucket: 0 },
      { text: L('x³ + 5x', 'x³ + 5x', 'x³ + 5x'), bucket: 1 },
      { text: L('x² + x', 'x² + x', 'x² + x'), bucket: 2 },
      { text: L('cos x', 'cos x', 'cos x'), bucket: 0 },
      { text: L('sin x', 'sen x', 'sen x'), bucket: 1 },
      { text: L('eˣ', 'eˣ', 'eˣ'), bucket: 2 },
      { text: L('|x| − 1', '|x| − 1', '|x| − 1'), bucket: 0 },
    ],
    explanation: L('Even functions keep the same value at −x; odd ones change only the sign. x² + x and eˣ do neither: e⁻ˣ is neither eˣ nor −eˣ.', 'Las funciones pares mantienen el mismo valor en −x; las impares solo cambian de signo. x² + x y eˣ no hacen ninguna de las dos cosas: e⁻ˣ no es eˣ ni −eˣ.', 'Funções pares mantêm o mesmo valor em −x; as ímpares só mudam de sinal. x² + x e eˣ não fazem nenhuma das duas coisas: e⁻ˣ não é eˣ nem −eˣ.'),
  },
  {
    id: 'calc2-act-order-transform', kind: 'order', lessonId: 'calc2-l6-transformations',
    title: L('Build y = −2(x + 1)² + 4', 'Construye y = −2(x + 1)² + 4', 'Construa y = −2(x + 1)² + 4'),
    prompt: L('Order the moves that turn y = x² into y = −2(x + 1)² + 4.', 'Ordena los movimientos que convierten y = x² en y = −2(x + 1)² + 4.', 'Ordene os movimentos que transformam y = x² em y = −2(x + 1)² + 4.'),
    items: [
      L('Start with y = x², vertex (0, 0)', 'Empezar con y = x², vértice (0, 0)', 'Começar com y = x², vértice (0, 0)'),
      L('Move left 1: y = (x + 1)²', 'Mover 1 a la izquierda: y = (x + 1)²', 'Mover 1 para a esquerda: y = (x + 1)²'),
      L('Stretch vertically by 2: y = 2(x + 1)²', 'Estirar verticalmente por 2: y = 2(x + 1)²', 'Esticar verticalmente por 2: y = 2(x + 1)²'),
      L('Reflect across the x-axis: y = −2(x + 1)²', 'Reflejar respecto al eje x: y = −2(x + 1)²', 'Refletir em relação ao eixo x: y = −2(x + 1)²'),
      L('Move up 4: vertex (−1, 4)', 'Subir 4: vértice (−1, 4)', 'Subir 4: vértice (−1, 4)'),
    ],
    explanation: L('Inside changes first (horizontal), then the outside: stretch, reflect, and finally shift vertically.', 'Primero los cambios de adentro (horizontales), luego los de afuera: estirar, reflejar y por último desplazar verticalmente.', 'Primeiro as mudanças de dentro (horizontais), depois as de fora: esticar, refletir e por último deslocar verticalmente.'),
  },
  {
    id: 'calc2-act-order-inverse', kind: 'order', lessonId: 'calc2-l7-composition-inverse',
    title: L('Find an inverse', 'Halla una inversa', 'Encontre uma inversa'),
    prompt: L('Order the steps to invert f(x) = (x − 1)/3.', 'Ordena los pasos para invertir f(x) = (x − 1)/3.', 'Ordene os passos para inverter f(x) = (x − 1)/3.'),
    items: [
      L('Check it is one-to-one: a line with slope 1/3', 'Comprobar que es inyectiva: una recta de pendiente 1/3', 'Conferir que é injetora: uma reta de inclinação 1/3'),
      L('Write y = (x − 1)/3', 'Escribir y = (x − 1)/3', 'Escrever y = (x − 1)/3'),
      L('Solve for x: x = 3y + 1', 'Despejar x: x = 3y + 1', 'Isolar x: x = 3y + 1'),
      L('Rename: f⁻¹(x) = 3x + 1', 'Renombrar: f⁻¹(x) = 3x + 1', 'Renomear: f⁻¹(x) = 3x + 1'),
      L('Check: f(f⁻¹(x)) = (3x + 1 − 1)/3 = x', 'Comprobar: f(f⁻¹(x)) = (3x + 1 − 1)/3 = x', 'Conferir: f(f⁻¹(x)) = (3x + 1 − 1)/3 = x'),
    ],
    explanation: L('Solving for x undoes the steps of f in reverse order: f subtracts 1 then divides by 3, so f⁻¹ multiplies by 3 then adds 1.', 'Despejar x deshace los pasos de f en orden inverso: f resta 1 y luego divide entre 3, así que f⁻¹ multiplica por 3 y luego suma 1.', 'Isolar x desfaz os passos de f na ordem inversa: f subtrai 1 e depois divide por 3, então f⁻¹ multiplica por 3 e depois soma 1.'),
  },
  {
    id: 'calc2-act-fill-wave', kind: 'code-fill', lessonId: 'calc2-l8-trigonometric',
    title: L('Read a wave', 'Lee una onda', 'Leia uma onda'),
    prompt: L('Complete the facts for y = 4 sin(3x) − 1.', 'Completa los datos de y = 4 sen(3x) − 1.', 'Complete os dados de y = 4 sen(3x) − 1.'),
    template: 'amplitude = {0}\nperiod    = 2pi / 3\nmidline   y = {1}\nrange     [{2}, 3]',
    blanks: ['4', '-1|−1', '-5|−5'],
    explanation: L('Amplitude |A| = 4, midline y = D = −1, range [−1 − 4, −1 + 4] = [−5, 3].', 'Amplitud |A| = 4, línea media y = D = −1, rango [−1 − 4, −1 + 4] = [−5, 3].', 'Amplitude |A| = 4, linha média y = D = −1, imagem [−1 − 4, −1 + 4] = [−5, 3].'),
  },
  {
    id: 'calc2-act-scramble-log', kind: 'scramble', lessonId: 'calc2-l9-exp-log',
    title: L('Expand a logarithm', 'Desarrolla un logaritmo', 'Desenvolva um logaritmo'),
    prompt: L('Rebuild the expansion of log(x²y/10).', 'Arma el desarrollo de log(x²y/10).', 'Monte o desenvolvimento de log(x²y/10).'),
    tokens: ['2', 'log x', '+', 'log y', '−', '1'],
    explanation: L('Product → sum, power → factor, quotient → difference, and log 10 = 1.', 'Producto → suma, potencia → factor, cociente → resta, y log 10 = 1.', 'Produto → soma, potência → fator, quociente → diferença, e log 10 = 1.'),
  },
  {
    id: 'calc2-act-classify-growth', kind: 'classify', lessonId: 'calc2-l9-exp-log',
    title: L('Growth or decay?', '¿Crecimiento o decaimiento?', 'Crescimento ou decaimento?'),
    prompt: L('Sort each function by what happens as x grows.', 'Clasifica cada función según lo que pasa cuando x crece.', 'Classifique cada função pelo que acontece quando x cresce.'),
    buckets: [L('Increasing', 'Creciente', 'Crescente'), L('Decreasing', 'Decreciente', 'Decrescente')],
    items: [
      { text: L('3ˣ', '3ˣ', '3ˣ'), bucket: 0 },
      { text: L('(0.8)ˣ', '(0,8)ˣ', '(0,8)ˣ'), bucket: 1 },
      { text: L('e⁻ˣ', 'e⁻ˣ', 'e⁻ˣ'), bucket: 1 },
      { text: L('ln x', 'ln x', 'ln x'), bucket: 0 },
      { text: L('log_{1/2} x', 'log_{1/2} x', 'log_{1/2} x'), bucket: 1 },
      { text: L('200·(1.05)ˣ', '200·(1,05)ˣ', '200·(1,05)ˣ'), bucket: 0 },
    ],
    explanation: L('A base above 1 gives growth and a base between 0 and 1 gives decay; e⁻ˣ = (1/e)ˣ has base below 1. Logarithms follow their base the same way.', 'Una base mayor que 1 da crecimiento y una base entre 0 y 1 da decaimiento; e⁻ˣ = (1/e)ˣ tiene base menor que 1. Los logaritmos siguen a su base de la misma forma.', 'Uma base maior que 1 dá crescimento e uma base entre 0 e 1 dá decaimento; e⁻ˣ = (1/e)ˣ tem base menor que 1. Os logaritmos seguem sua base do mesmo jeito.'),
  },
];
