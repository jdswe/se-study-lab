import type { ExternalResource, Localized, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { discWeek6Lessons } from './lessons';
import { discWeek6Activities, discWeek6Flashcards, discWeek6Labs, discWeek6Questions } from './practice';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: divisibility, linear combinations, and the quotient–remainder theorem. Do the exercises.', 'Lección 1: divisibilidad, combinaciones lineales y el teorema del cociente y el resto. Haz los ejercicios.', 'Lição 1: divisibilidade, combinações lineares e o teorema do quociente e resto. Faça os exercícios.'), minutes: 45, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: congruences, modular powers, inverses, and linear congruences.', 'Lección 2: congruencias, potencias modulares, inversos y congruencias lineales.', 'Lição 2: congruências, potências modulares, inversos e congruências lineares.'), minutes: 50, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3 and Lab 1: gcd, lcm, Euclid forwards and backwards, and Bézout.', 'Lección 3 y Laboratorio 1: gcd, lcm, Euclides hacia delante y atrás, y Bézout.', 'Lição 3 e Laboratório 1: gcd, lcm, Euclides para frente e para trás, e Bézout.'), minutes: 55, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4: linear Diophantine equations, general solutions, and the Chinese remainder theorem.', 'Lección 4: ecuaciones diofánticas lineales, soluciones generales y el teorema chino del resto.', 'Lição 4: equações diofantinas lineares, soluções gerais e o teorema chinês do resto.'), minutes: 50, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and Lab 2: Fermat, Euler’s totient, and a complete RSA round trip.', 'Lección 5 y Laboratorio 2: Fermat, la función totiente de Euler y un viaje RSA completo.', 'Lição 5 e Laboratório 2: Fermat, a totiente de Euler e uma viagem RSA completa.'), minutes: 55, kind: 'practice' },
  { day: 'Day 6', focus: L('Activities, due flashcards, and the full quiz. Re-run one Euclidean algorithm and one modular power by hand.', 'Actividades, tarjetas pendientes y el cuestionario completo. Rehaz a mano un algoritmo de Euclides y una potencia modular.', 'Atividades, cartões pendentes e o questionário completo. Refaça à mão um algoritmo de Euclides e uma potência modular.'), minutes: 40, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'disc6-r-levin', title: 'Oscar Levin: Discrete Mathematics, An Open Introduction (Number Theory)', url: 'https://discrete.openmathbooks.org/dmoi3/', kind: 'book', verifiedOn: '2026-11-04', note: L('Free open textbook with chapters on divisibility, modular arithmetic, and number theory.', 'Libro abierto y gratuito con capítulos sobre divisibilidad, aritmética modular y teoría de números (en inglés).', 'Livro aberto e gratuito com capítulos sobre divisibilidade, aritmética modular e teoria dos números (em inglês).') },
  { id: 'disc6-r-wiki-modular', title: 'Wikipedia: Modular arithmetic', url: 'https://en.wikipedia.org/wiki/Modular_arithmetic', kind: 'article', verifiedOn: '2026-11-04', note: L('Congruence notation, residue classes, inverses, and applications.', 'Notación de congruencias, clases de resto, inversos y aplicaciones (en inglés).', 'Notação de congruências, classes de resto, inversos e aplicações (em inglês).') },
  { id: 'disc6-r-wiki-euclid', title: 'Wikipedia: Euclidean algorithm', url: 'https://en.wikipedia.org/wiki/Euclidean_algorithm', kind: 'article', verifiedOn: '2026-11-04', note: L('The algorithm, its proof, the extended version, and Bézout’s identity.', 'El algoritmo, su demostración, la versión extendida y la identidad de Bézout (en inglés).', 'O algoritmo, sua prova, a versão estendida e a identidade de Bézout (em inglês).') },
  { id: 'disc6-r-wiki-es', title: 'Wikipedia (ES): Aritmética modular', url: 'https://es.wikipedia.org/wiki/Aritm%C3%A9tica_modular', kind: 'article', verifiedOn: '2026-11-04', note: L('The same topic in Spanish, with congruence examples and inverses.', 'El mismo tema en español, con ejemplos de congruencias e inversos.', 'O mesmo tema em espanhol, com exemplos de congruências e inversos.') },
  { id: 'disc6-r-khan', title: 'Khan Academy: Modular arithmetic and cryptography', url: 'https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short videos and practice on remainders, congruences, and RSA.', 'Videos cortos y práctica sobre restos, congruencias y RSA; el sitio está en varios idiomas.', 'Vídeos curtos e prática sobre restos, congruências e RSA; o site está em vários idiomas.') },
  { id: 'disc6-r-wiki-rsa', title: 'Wikipedia: RSA (cryptosystem)', url: 'https://en.wikipedia.org/wiki/RSA_(cryptosystem)', kind: 'article', verifiedOn: '2026-11-04', note: L('Key generation, encryption, decryption, and the security assumptions behind RSA.', 'Generación de claves, cifrado, descifrado y los supuestos de seguridad de RSA (en inglés).', 'Geração de chaves, cifra, decifração e os pressupostos de segurança do RSA (em inglês).') },
];

/** Discrete Mathematics, Week 6: number theory. */
export const discWeek6: WeekContent = {
  id: 'y1-t1-m2-disc-w6',
  year: 1,
  term: 1,
  module: 2,
  week: 6,
  subject: 'discrete-mathematics',
  title: L('Number theory', 'Teoría de números', 'Teoria dos números'),
  intro: L(
    'Number theory studies the integers and the hidden structure of division. This week you will move from the definition of divisibility to the quotient–remainder theorem, then enter modular arithmetic, where numbers wrap around a modulus and huge powers become small calculations. You will compute gcds with Euclid, express them with Bézout, solve linear Diophantine equations, and combine congruences with the Chinese remainder theorem. The week ends with Fermat’s little theorem, Euler’s totient, and RSA, the algorithm that shows how a theorem about remainders becomes the security layer of the internet.',
    'La teoría de números estudia los enteros y la estructura oculta de la división. Esta semana pasarás de la definición de divisibilidad al teorema del cociente y el resto, y luego a la aritmética modular, donde los números dan vueltas alrededor de un módulo y las potencias enormes se vuelven cálculos pequeños. Calcularás gcd con Euclides, los expresarás con Bézout, resolverás ecuaciones diofánticas lineales y combinarás congruencias con el teorema chino del resto. La semana termina con el pequeño teorema de Fermat, la función totiente de Euler y RSA, el algoritmo que muestra cómo un teorema sobre restos se convierte en la capa de seguridad de internet.',
    'A teoria dos números estuda os inteiros e a estrutura oculta da divisão. Nesta semana você passará da definição de divisibilidade ao teorema do quociente e resto, e depois à aritmética modular, onde os números dão voltas em torno de um módulo e potências enormes se tornam cálculos pequenos. Você calculará gcds com Euclides, os expressará com Bézout, resolverá equações diofantinas lineares e combinará congruências com o teorema chinês do resto. A semana termina com o pequeno teorema de Fermat, a totiente de Euler e RSA, o algoritmo que mostra como um teorema sobre restos se torna a camada de segurança da internet.',
  ),
  objectives: [
    L('Use divisibility, linear combinations, and the quotient–remainder theorem.', 'Usar divisibilidad, combinaciones lineales y el teorema del cociente y el resto.', 'Usar divisibilidade, combinações lineares e o teorema do quociente e resto.'),
    L('Compute with congruences, modular powers, and modular inverses.', 'Calcular con congruencias, potencias modulares e inversos modulares.', 'Calcular com congruências, potências modulares e inversos modulares.'),
    L('Compute gcd and lcm with Euclid and express the gcd with Bézout.', 'Calcular gcd y lcm con Euclides y expresar el gcd con Bézout.', 'Calcular gcd e lcm com Euclides e expressar o gcd com Bézout.'),
    L('Solve linear Diophantine equations and systems of congruences.', 'Resolver ecuaciones diofánticas lineales y sistemas de congruencias.', 'Resolver equações diofantinas lineares e sistemas de congruências.'),
    L('Apply Fermat, Euler’s totient, and the RSA scheme.', 'Aplicar Fermat, la función totiente de Euler y el esquema RSA.', 'Aplicar Fermat, a totiente de Euler e o esquema RSA.'),
  ],
  prerequisites: [
    L('Integer arithmetic, signs, and the idea of a remainder.', 'Aritmética entera, signos y la idea de resto.', 'Aritmética inteira, sinais e a ideia de resto.'),
    L('Relations and equivalence classes from Week 3.', 'Relaciones y clases de equivalencia de la Semana 3.', 'Relações e classes de equivalência da Semana 3.'),
  ],
  keyConcepts: [
    L('Divisibility', 'Divisibilidad', 'Divisibilidade'),
    L('Quotient and remainder', 'Cociente y resto', 'Quociente e resto'),
    L('Congruence', 'Congruencia', 'Congruência'),
    L('Modular inverse', 'Inverso modular', 'Inverso modular'),
    L('GCD and LCM', 'MCD y MCM', 'MDC e MMC'),
    L('Euclidean algorithm', 'Algoritmo de Euclides', 'Algoritmo de Euclides'),
    L('Bézout identity', 'Identidad de Bézout', 'Identidade de Bézout'),
    L('Diophantine equation', 'Ecuación diofántica', 'Equação diofantina'),
    L('Chinese remainder theorem', 'Teorema chino del resto', 'Teorema chinês do resto'),
    L('Fermat, Euler, and RSA', 'Fermat, Euler y RSA', 'Fermat, Euler e RSA'),
  ],
  estimatedMinutes: 450,
  sequence: [
    L('Lesson 1: divisibility, linear combinations, quotients, and remainders.', 'Lección 1: divisibilidad, combinaciones lineales, cocientes y restos.', 'Lição 1: divisibilidade, combinações lineares, quocientes e restos.'),
    L('Lesson 2: congruences, modular powers, inverses, and linear congruences.', 'Lección 2: congruencias, potencias modulares, inversos y congruencias lineales.', 'Lição 2: congruências, potências modulares, inversos e congruências lineares.'),
    L('Lesson 3 and Lab 1: gcd, lcm, Euclid, and Bézout.', 'Lección 3 y Laboratorio 1: gcd, lcm, Euclides y Bézout.', 'Lição 3 e Laboratório 1: gcd, lcm, Euclides e Bézout.'),
    L('Lesson 4: linear Diophantine equations and the Chinese remainder theorem.', 'Lección 4: ecuaciones diofánticas lineales y el teorema chino del resto.', 'Lição 4: equações diofantinas lineares e o teorema chinês do resto.'),
    L('Lesson 5 and Lab 2: Fermat, Euler’s totient, and RSA. Then the quiz.', 'Lección 5 y Laboratorio 2: Fermat, la totiente de Euler y RSA. Luego el cuestionario.', 'Lição 5 e Laboratório 2: Fermat, a totiente de Euler e RSA. Depois o questionário.'),
  ],
  outcomes: [
    L('You can reduce a large modular power without computing the power itself.', 'Puedes reducir una potencia modular grande sin calcular la potencia completa.', 'Você consegue reduzir uma potência modular grande sem calcular a potência completa.'),
    L('You can find and verify a modular inverse with Euclid and Bézout.', 'Puedes hallar y verificar un inverso modular con Euclides y Bézout.', 'Você consegue encontrar e verificar um inverso modular com Euclides e Bézout.'),
    L('You can set up and check a small RSA key, and explain why factoring n breaks it.', 'Puedes montar y comprobar una clave RSA pequeña, y explicar por qué factorizar n la rompe.', 'Você consegue montar e conferir uma chave RSA pequena, e explicar por que fatorar n a quebra.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Run Euclid by hand on at least three pairs', 'Ejecutar Euclides a mano con al menos tres parejas', 'Executar Euclides à mão em pelo menos três pares'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Complete the activities', 'Completar las actividades', 'Completar as atividades'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Using a negative remainder for a negative dividend.', 'Usar un resto negativo para un dividendo negativo.', 'Usar resto negativo para um dividendo negativo.'), fix: L('Adjust the quotient so that 0 ≤ r < d.', 'Ajusta el cociente para que 0 ≤ r < d.', 'Ajuste o quociente para que 0 ≤ r < d.') },
    { mistake: L('Cancelling a factor in a congruence without checking coprimality.', 'Cancelar un factor en una congruencia sin comprobar coprimalidad.', 'Cancelar um fator em uma congruência sem verificar coprimalidade.'), fix: L('Only invertible factors can be cancelled; otherwise divide the modulus and keep all solutions.', 'Solo se pueden cancelar factores invertibles; si no, divide el módulo y conserva todas las soluciones.', 'Apenas fatores invertíveis podem ser cancelados; caso contrário, divida o módulo e mantenha todas as soluções.') },
    { mistake: L('Giving only one solution to a Diophantine equation.', 'Dar solo una solución de una ecuación diofántica.', 'Dar apenas uma solução de uma equação diofantina.'), fix: L('Add the homogeneous family (b/d)t, −(a/d)t.', 'Añade la familia homogénea (b/d)t, −(a/d)t.', 'Adicione a família homogênea (b/d)t, −(a/d)t.') },
  ],
  lessons: discWeek6Lessons,
  flashcards: discWeek6Flashcards,
  questions: discWeek6Questions,
  labs: discWeek6Labs,
  plan,
  resources,
  activities: discWeek6Activities,
  stories: [],
  tools: [],
  videos: [],
  documents: [],
};
