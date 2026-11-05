import type { ExternalResource, Localized, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { discWeek4Lessons } from './lessons';
import { discWeek4Activities, discWeek4Flashcards, discWeek4Labs, discWeek4Questions } from './practice';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: domain, codomain, image, preimage, and the vertical line test. Do the exercises.', 'Lección 1: dominio, codominio, imagen, preimagen y la prueba de la recta vertical. Haz los ejercicios.', 'Lição 1: domínio, contradomínio, imagem, pré-imagem e o teste da reta vertical. Faça os exercícios.'), minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: classify functions as injective, surjective, or bijective. Check the finite-size rules.', 'Lección 2: clasifica funciones como inyectivas, suprayectivas o biyectivas. Revisa las reglas de tamaños finitos.', 'Lição 2: classifique funções como injetivas, sobrejetivas ou bijetivas. Revise as regras de tamanhos finitos.'), minutes: 50, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3 and Lab 1: composition in both orders, domains that connect, and inverse functions.', 'Lección 3 y Laboratorio 1: composición en ambos órdenes, dominios que conectan y funciones inversas.', 'Lição 3 e Laboratório 1: composição nas duas ordens, domínios que se conectam e funções inversas.'), minutes: 55, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4: find inverses, check both directions, and use (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.', 'Lección 4: halla inversas, comprueba ambos sentidos y usa (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.', 'Lição 4: encontre inversas, confira os dois sentidos e use (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.'), minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and Lab 2: identity, constant, and characteristic functions, floor/ceiling, and growth.', 'Lección 5 y Laboratorio 2: funciones identidad, constante y característica, piso/techo y crecimiento.', 'Lição 5 e Laboratório 2: funções identidade, constante e característica, piso/teto e crescimento.'), minutes: 55, kind: 'practice' },
  { day: 'Day 6', focus: L('Activities, due flashcards, and the full quiz. Redo one inverse and one classification from memory.', 'Actividades, tarjetas pendientes y el cuestionario completo. Rehaz de memoria una inversa y una clasificación.', 'Atividades, cartões pendentes e o questionário completo. Refaça de memória uma inversa e uma classificação.'), minutes: 40, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'disc4-r-levin', title: 'Oscar Levin: Discrete Mathematics, An Open Introduction (Functions)', url: 'https://discrete.openmathbooks.org/dmoi3/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open textbook with chapters on functions, injections, surjections, and inverses.', 'Libro abierto y gratuito con capítulos sobre funciones, inyecciones, suprayecciones e inversas (en inglés).', 'Livro aberto e gratuito com capítulos sobre funções, injeções, sobrejeções e inversas (em inglês).') },
  { id: 'disc4-r-wiki-function', title: 'Wikipedia: Function (mathematics)', url: 'https://en.wikipedia.org/wiki/Function_(mathematics)', kind: 'article', verifiedOn: '2026-11-04', note: L('Formal definition, domain, codomain, image, and the history of the notation.', 'Definición formal, dominio, codominio, imagen e historia de la notación (en inglés).', 'Definição formal, domínio, contradomínio, imagem e história da notação (em inglês).') },
  { id: 'disc4-r-wiki-es', title: 'Wikipedia (ES): Función matemática', url: 'https://es.wikipedia.org/wiki/Funci%C3%B3n_matem%C3%A1tica', kind: 'article', verifiedOn: '2026-11-04', note: L('The same topic in Spanish, with graphs and classification examples.', 'El mismo tema en español, con gráficas y ejemplos de clasificación.', 'O mesmo tema em espanhol, com gráficos e exemplos de classificação.') },
  { id: 'disc4-r-khan', title: 'Khan Academy: Functions', url: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Videos and practice on domain, range, composition, and inverse functions.', 'Videos y práctica sobre dominio, rango, composición y funciones inversas; el sitio está en varios idiomas.', 'Vídeos e prática sobre domínio, imagem, composição e funções inversas; o site está em vários idiomas.') },
  { id: 'disc4-r-openstax', title: 'OpenStax Contemporary Mathematics: Functions', url: 'https://openstax.org/books/contemporary-mathematics/pages/1-4-functions', kind: 'book', verifiedOn: '2026-11-04', note: L('Open textbook section connecting relations, functions, and function notation.', 'Sección de un libro abierto que conecta relaciones, funciones y notación de funciones (en inglés).', 'Seção de um livro aberto que liga relações, funções e notação de funções (em inglês).') },
  { id: 'disc4-r-olp', title: 'Open Logic Project: Sets, Logic, Computation', url: 'https://slc.openlogicproject.org/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open text with formal treatments of functions, injections, and bijections.', 'Texto abierto y gratuito con tratamientos formales de funciones, inyecciones y biyecciones (en inglés).', 'Texto aberto e gratuito com tratamentos formais de funções, injeções e bijeções (em inglês).') },
];

/** Discrete Mathematics, Week 4: functions and their properties. */
export const discWeek4: WeekContent = {
  id: 'y1-t1-m2-disc-w4',
  year: 1,
  term: 1,
  module: 2,
  week: 4,
  subject: 'discrete-mathematics',
  title: L('Functions', 'Funciones', 'Funções'),
  intro: L(
    'A function is a relation with a promise: every input has exactly one output. That small restriction produces the central language of computer science, from type signatures and hash functions to transformations and algorithms. This week you will separate domain, codomain, and image; test functions for injectivity, surjectivity, and bijectivity; compose functions and check that their types connect; build inverse functions and prove when they cannot exist; and use identity, constant, and characteristic functions to translate sets into arithmetic. You will finish with the growth notation O and Θ, the bridge from counting to algorithm analysis.',
    'Una función es una relación con una promesa: cada entrada tiene exactamente una salida. Esa pequeña restricción produce el lenguaje central de la informática, desde las firmas de tipos y las funciones hash hasta las transformaciones y los algoritmos. Esta semana separarás dominio, codominio e imagen; probarás funciones para inyectividad, suprayectividad y biyectividad; compondrás funciones y comprobarás que sus tipos conectan; construirás funciones inversas y demostrarás cuándo no pueden existir; y usarás funciones identidad, constante y característica para traducir conjuntos a aritmética. Terminarás con la notación de crecimiento O y Θ, el puente del conteo al análisis de algoritmos.',
    'Uma função é uma relação com uma promessa: cada entrada tem exatamente uma saída. Essa pequena restrição produz a linguagem central da computação, desde assinaturas de tipos e funções hash até transformações e algoritmos. Nesta semana você vai separar domínio, contradomínio e imagem; testar funções para injetividade, sobrejetividade e bijetividade; compor funções e conferir se seus tipos se conectam; construir funções inversas e provar quando elas não podem existir; e usar funções identidade, constante e característica para traduzir conjuntos em aritmética. Você terminará com a notação de crescimento O e Θ, a ponte da contagem para a análise de algoritmos.',
  ),
  objectives: [
    L('Identify the domain, codomain, image, and preimage of a function.', 'Identificar el dominio, codominio, imagen y preimagen de una función.', 'Identificar o domínio, contradomínio, imagem e pré-imagem de uma função.'),
    L('Decide whether a relation is a function and apply the vertical line test.', 'Decidir si una relación es una función y aplicar la prueba de la recta vertical.', 'Decidir se uma relação é uma função e aplicar o teste da reta vertical.'),
    L('Classify functions as injective, surjective, or bijective, including finite-size arguments.', 'Clasificar funciones como inyectivas, suprayectivas o biyectivas, incluidos los argumentos de tamaños finitos.', 'Classificar funções como injetivas, sobrejetivas ou bijetivas, incluindo argumentos de tamanhos finitos.'),
    L('Compose functions in either order and invert bijections, using (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.', 'Componer funciones en cualquier orden e invertir biyecciones, usando (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.', 'Compor funções em qualquer ordem e inverter bijeções, usando (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.'),
    L('Use characteristic functions, floor, ceiling, and O/Θ growth comparisons.', 'Usar funciones características, piso, techo y comparaciones de crecimiento O/Θ.', 'Usar funções características, piso, teto e comparações de crescimento O/Θ.'),
  ],
  prerequisites: [
    L('Sets, Cartesian products, and relations from Weeks 2 and 3.', 'Conjuntos, productos cartesianos y relaciones de las Semanas 2 y 3.', 'Conjuntos, produtos cartesianos e relações das Semanas 2 e 3.'),
    L('Basic algebra: solving linear equations and working with exponents.', 'Álgebra básica: resolver ecuaciones lineales y trabajar con exponentes.', 'Álgebra básica: resolver equações lineares e trabalhar com expoentes.'),
  ],
  keyConcepts: [
    L('Function, domain, and codomain', 'Función, dominio y codominio', 'Função, domínio e contradomínio'),
    L('Image and preimage', 'Imagen y preimagen', 'Imagem e pré-imagem'),
    L('Injectivity', 'Inyectividad', 'Injetividade'),
    L('Surjectivity', 'Suprayectividad', 'Sobrejetividade'),
    L('Bijection', 'Biyección', 'Bijeção'),
    L('Composition', 'Composición', 'Composição'),
    L('Inverse function', 'Función inversa', 'Função inversa'),
    L('Characteristic function', 'Función característica', 'Função característica'),
    L('Asymptotic growth', 'Crecimiento asintótico', 'Crescimento assintótico'),
  ],
  estimatedMinutes: 430,
  sequence: [
    L('Lesson 1: definition, domain, codomain, image, preimage, and the vertical line test.', 'Lección 1: definición, dominio, codominio, imagen, preimagen y la prueba de la recta vertical.', 'Lição 1: definição, domínio, contradomínio, imagem, pré-imagem e o teste da reta vertical.'),
    L('Lesson 2: injective, surjective, bijective, and finite-size counting arguments.', 'Lección 2: inyectiva, suprayectiva, biyectiva y argumentos de conteo con tamaños finitos.', 'Lição 2: injetiva, sobrejetiva, bijetiva e argumentos de contagem com tamanhos finitos.'),
    L('Lesson 3 and Lab 1: composition, associativity, and order.', 'Lección 3 y Laboratorio 1: composición, asociatividad y orden.', 'Lição 3 e Laboratório 1: composição, associatividade e ordem.'),
    L('Lesson 4: inverse functions, bijections, and inverse of a composition.', 'Lección 4: funciones inversas, biyecciones e inversa de una composición.', 'Lição 4: funções inversas, bijeções e inversa de uma composição.'),
    L('Lesson 5 and Lab 2: identity, constant, characteristic functions, floor/ceiling, and growth. Then the quiz.', 'Lección 5 y Laboratorio 2: identidad, constante, funciones características, piso/techo y crecimiento. Luego el cuestionario.', 'Lição 5 e Laboratório 2: identidade, constante, funções características, piso/teto e crescimento. Depois o questionário.'),
  ],
  outcomes: [
    L('You can read a function’s signature and immediately say what must be checked for it to be invertible.', 'Puedes leer la firma de una función y decir de inmediato qué hay que comprobar para que sea invertible.', 'Você consegue ler a assinatura de uma função e dizer imediatamente o que deve ser verificado para ela ser invertível.'),
    L('You can produce a counterexample that breaks injectivity or surjectivity, not just guess.', 'Puedes producir un contraejemplo que rompa la inyectividad o la suprayectividad, no solo adivinar.', 'Você consegue produzir um contraexemplo que quebre a injetividade ou a sobrejetividade, não apenas adivinhar.'),
    L('You can compose, invert, and compare functions, and explain why the order matters.', 'Puedes componer, invertir y comparar funciones, y explicar por qué importa el orden.', 'Você consegue compor, inverter e comparar funções, e explicar por que a ordem importa.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Classify at least six functions as injective, surjective, or bijective', 'Clasificar al menos seis funciones como inyectivas, suprayectivas o biyectivas', 'Classificar pelo menos seis funções como injetivas, sobrejetivas ou bijetivas'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Complete the activities', 'Completar las actividades', 'Completar as atividades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Calling the codomain the image.', 'Llamar imagen al codominio.', 'Chamar a imagem de contradomínio.'), fix: L('The image is only the set of values actually produced; it may be smaller than the codomain.', 'La imagen es solo el conjunto de valores que se producen; puede ser menor que el codominio.', 'A imagem é apenas o conjunto de valores realmente produzidos; pode ser menor que o contradomínio.') },
    { mistake: L('Writing f⁻¹(x) for 1/f(x).', 'Escribir f⁻¹(x) por 1/f(x).', 'Escrever f⁻¹(x) para 1/f(x).'), fix: L('f⁻¹ is the inverse function: it undoes f, so f⁻¹(f(x)) = x. The reciprocal is a different function.', 'f⁻¹ es la función inversa: deshace f, así que f⁻¹(f(x)) = x. El recíproco es otra función.', 'f⁻¹ é a função inversa: desfaz f, então f⁻¹(f(x)) = x. O recíproco é outra função.') },
    { mistake: L('Assuming every function has an inverse.', 'Suponer que toda función tiene inversa.', 'Supor que toda função tem inversa.'), fix: L('An inverse function exists only for bijections; a relation inverse always exists.', 'Una función inversa existe solo para biyecciones; la inversa como relación siempre existe.', 'Uma função inversa existe só para bijeções; a inversa como relação sempre existe.') },
  ],
  lessons: discWeek4Lessons,
  flashcards: discWeek4Flashcards,
  questions: discWeek4Questions,
  labs: discWeek4Labs,
  plan,
  resources,
  activities: discWeek4Activities,
  stories: [],
  tools: [],
  videos: [],
  documents: [],
};
