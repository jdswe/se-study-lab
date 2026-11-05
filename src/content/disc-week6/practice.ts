import type { Activity, Flashcard, Lab, Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const S = (s: string): Localized => ({ en: s, es: s, pt: s });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

/** Flashcards for Discrete Mathematics, Week 6. */
export const discWeek6Flashcards: Flashcard[] = [
  { id: 'disc6-fc-1', lessonId: 'disc6-l1-divisibility', kind: 'concept',
    front: L('What does a | b mean?', '¿Qué significa a | b?', 'O que significa a | b?'),
    back: L('b = a·k for some integer k. It is exact division with remainder 0.', 'b = a·k para algún entero k. Es división exacta con resto 0.', 'b = a·k para algum inteiro k. É divisão exata com resto 0.') },
  { id: 'disc6-fc-2', lessonId: 'disc6-l1-divisibility', kind: 'command',
    front: L('Quotient–remainder theorem', 'Teorema del cociente y el resto', 'Teorema do quociente e resto'),
    back: L('For d > 0, every a is uniquely a = q·d + r with 0 ≤ r < d.', 'Para d > 0, todo a es de forma única a = q·d + r con 0 ≤ r < d.', 'Para d > 0, todo a é unicamente a = q·d + r com 0 ≤ r < d.') },
  { id: 'disc6-fc-3', lessonId: 'disc6-l2-modular', kind: 'concept',
    front: L('a ≡ b (mod m)', 'a ≡ b (mod m)', 'a ≡ b (mod m)'),
    back: L('m | (a − b): the two numbers leave the same remainder modulo m.', 'm | (a − b): los dos números dejan el mismo resto módulo m.', 'm | (a − b): os dois números deixam o mesmo resto módulo m.') },
  { id: 'disc6-fc-4', lessonId: 'disc6-l2-modular', kind: 'concept',
    front: L('When does a have an inverse modulo m?', '¿Cuándo tiene a un inverso módulo m?', 'Quando a tem inverso módulo m?'),
    back: L('Exactly when gcd(a, m) = 1. The inverse is unique modulo m.', 'Exactamente cuando gcd(a, m) = 1. El inverso es único módulo m.', 'Exatamente quando gcd(a, m) = 1. O inverso é único módulo m.') },
  { id: 'disc6-fc-5', lessonId: 'disc6-l2-modular', kind: 'command',
    front: L('Solutions of ax ≡ b (mod m)', 'Soluciones de ax ≡ b (mod m)', 'Soluções de ax ≡ b (mod m)'),
    back: L('Let d = gcd(a, m). If d ∤ b there are none; if d | b there are d solutions modulo m.', 'Sea d = gcd(a, m). Si d ∤ b no hay ninguna; si d | b hay d soluciones módulo m.', 'Seja d = gcd(a, m). Se d ∤ b não há nenhuma; se d | b há d soluções módulo m.') },
  { id: 'disc6-fc-6', lessonId: 'disc6-l3-gcd-euclid', kind: 'concept',
    front: L('gcd and lcm for positive integers', 'gcd y lcm para enteros positivos', 'gcd e lcm para inteiros positivos'),
    back: L('gcd(a, b)·lcm(a, b) = a·b. Compute the gcd by Euclid, then divide.', 'gcd(a, b)·lcm(a, b) = a·b. Calcula el gcd por Euclides y luego divide.', 'gcd(a, b)·lcm(a, b) = a·b. Calcule o gcd por Euclides e depois divida.') },
  { id: 'disc6-fc-7', lessonId: 'disc6-l3-gcd-euclid', kind: 'command',
    front: L('Euclidean algorithm', 'Algoritmo de Euclides', 'Algoritmo de Euclides'),
    back: L('gcd(a, b) = gcd(b, a mod b); stop when the remainder is 0. The last non-zero remainder is the gcd.', 'gcd(a, b) = gcd(b, a mod b); para cuando el resto es 0. El último resto distinto de cero es el gcd.', 'gcd(a, b) = gcd(b, a mod b); pare quando o resto é 0. O último resto não nulo é o gcd.') },
  { id: 'disc6-fc-8', lessonId: 'disc6-l3-gcd-euclid', kind: 'concept',
    front: L('Bézout’s identity', 'Identidad de Bézout', 'Identidade de Bézout'),
    back: L('There exist integers x, y with ax + by = gcd(a, b). This proves modular inverses exist when gcd = 1.', 'Existen enteros x, y con ax + by = gcd(a, b). Esto prueba que hay inversos modulares cuando gcd = 1.', 'Existem inteiros x, y com ax + by = gcd(a, b). Isso prova que há inversos modulares quando gcd = 1.') },
  { id: 'disc6-fc-9', lessonId: 'disc6-l4-diophantine-crt', kind: 'concept',
    front: L('When does ax + by = c have integer solutions?', '¿Cuándo tiene ax + by = c soluciones enteras?', 'Quando ax + by = c tem soluções inteiras?'),
    back: L('Exactly when gcd(a, b) | c. The general solution adds (b/d)t, −(a/d)t to one particular solution.', 'Exactamente cuando gcd(a, b) | c. La solución general suma (b/d)t, −(a/d)t a una solución particular.', 'Exatamente quando gcd(a, b) | c. A solução geral soma (b/d)t, −(a/d)t a uma solução particular.') },
  { id: 'disc6-fc-10', lessonId: 'disc6-l4-diophantine-crt', kind: 'command',
    front: L('Chinese remainder theorem', 'Teorema chino del resto', 'Teorema chinês do resto'),
    back: L('If the moduli are pairwise coprime, a system of congruences has one solution modulo their product.', 'Si los módulos son coprimos por parejas, un sistema de congruencias tiene una solución módulo su producto.', 'Se os módulos são coprimos dois a dois, um sistema de congruências tem uma solução módulo seu produto.') },
  { id: 'disc6-fc-11', lessonId: 'disc6-l5-fermat-rsa', kind: 'concept',
    front: L('Fermat’s little theorem', 'Pequeño teorema de Fermat', 'Pequeno teorema de Fermat'),
    back: L('If p is prime and p ∤ a, then a^{p−1} ≡ 1 (mod p). Reduce exponents modulo p − 1.', 'Si p es primo y p ∤ a, entonces a^{p−1} ≡ 1 (mod p). Reduce exponentes módulo p − 1.', 'Se p é primo e p ∤ a, então a^{p−1} ≡ 1 (mod p). Reduza expoentes módulo p − 1.') },
  { id: 'disc6-fc-12', lessonId: 'disc6-l5-fermat-rsa', kind: 'concept',
    front: L('RSA key steps', 'Pasos de una clave RSA', 'Passos de uma chave RSA'),
    back: L('n = pq, φ(n) = (p − 1)(q − 1), ed ≡ 1 (mod φ(n)), c = mᵉ mod n, m = cᵈ mod n.', 'n = pq, φ(n) = (p − 1)(q − 1), ed ≡ 1 (mod φ(n)), c = mᵉ mod n, m = cᵈ mod n.', 'n = pq, φ(n) = (p − 1)(q − 1), ed ≡ 1 (mod φ(n)), c = mᵉ mod n, m = cᵈ mod n.') },
];

/** Quiz for Discrete Mathematics, Week 6. */
export const discWeek6Questions: Question[] = [
  {
    id: 'disc6-q-fill-gcd', type: 'fill-blank', lessonId: 'disc6-l3-gcd-euclid',
    prompt: L('gcd(252, 105) = ___', 'gcd(252, 105) = ___', 'gcd(252, 105) = ___'),
    accepted: ['21'],
    explanation: L('252 = 2·105 + 42; 105 = 2·42 + 21; 42 = 2·21 + 0, so the gcd is 21.', '252 = 2·105 + 42; 105 = 2·42 + 21; 42 = 2·21 + 0, así que el gcd es 21.', '252 = 2·105 + 42; 105 = 2·42 + 21; 42 = 2·21 + 0, então o gcd é 21.'),
  },
  {
    id: 'disc6-q-mc-remainder', type: 'multiple-choice', lessonId: 'disc6-l1-divisibility',
    prompt: L('What is −47 mod 7, using the non-negative remainder?', '¿Cuál es −47 mod 7, usando el resto no negativo?', 'Qual é −47 mod 7, usando o resto não negativo?'),
    options: [S('2'), S('5'), S('−5')],
    answer: 0,
    explanation: L('−47 = (−7)·7 + 2, so the remainder is 2.', '−47 = (−7)·7 + 2, así que el resto es 2.', '−47 = (−7)·7 + 2, então o resto é 2.'),
  },
  {
    id: 'disc6-q-tf-inverse', type: 'true-false', lessonId: 'disc6-l2-modular',
    prompt: L('True or false: 5 has an inverse modulo 15.', 'Verdadero o falso: 5 tiene inverso módulo 15.', 'Verdadeiro ou falso: 5 tem inverso módulo 15.'),
    options: TF, answer: 1,
    explanation: L('False. gcd(5, 15) = 5 ≠ 1, so no x satisfies 5x ≡ 1 (mod 15).', 'Falso. gcd(5, 15) = 5 ≠ 1, así que ningún x cumple 5x ≡ 1 (mod 15).', 'Falso. gcd(5, 15) = 5 ≠ 1, então nenhum x satisfaz 5x ≡ 1 (mod 15).'),
  },
  {
    id: 'disc6-q-fill-power', type: 'fill-blank', lessonId: 'disc6-l2-modular',
    prompt: L('3¹⁰⁰ mod 7 = ___', '3¹⁰⁰ mod 7 = ___', '3¹⁰⁰ mod 7 = ___'),
    accepted: ['4'],
    explanation: L('3⁶ ≡ 1 and 100 ≡ 4 (mod 6), so 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4.', '3⁶ ≡ 1 y 100 ≡ 4 (mod 6), así que 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4.', '3⁶ ≡ 1 e 100 ≡ 4 (mod 6), então 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4.'),
  },
  {
    id: 'disc6-q-mc-inverse', type: 'multiple-choice', lessonId: 'disc6-l2-modular',
    prompt: L('What is 7⁻¹ modulo 26?', '¿Cuál es 7⁻¹ módulo 26?', 'Qual é 7⁻¹ módulo 26?'),
    options: [S('15'), S('17'), S('23')],
    answer: 0,
    explanation: L('7·15 = 105 = 4·26 + 1, so 7·15 ≡ 1 (mod 26).', '7·15 = 105 = 4·26 + 1, así que 7·15 ≡ 1 (mod 26).', '7·15 = 105 = 4·26 + 1, então 7·15 ≡ 1 (mod 26).'),
  },
  {
    id: 'disc6-q-match-values', type: 'matching', lessonId: 'disc6-l3-gcd-euclid',
    prompt: L('Match each quantity with its value.', 'Une cada cantidad con su valor.', 'Ligue cada quantidade ao seu valor.'),
    left: [S('gcd(84, 36)'), S('lcm(84, 36)'), S('φ(15)')],
    right: [S('8'), S('12'), S('252')],
    answer: [1, 2, 0],
    explanation: L('Euclid gives gcd 12; lcm = 84·36/12 = 252; φ(15) = 2·4 = 8.', 'Euclides da gcd 12; lcm = 84·36/12 = 252; φ(15) = 2·4 = 8.', 'Euclides dá gcd 12; lcm = 84·36/12 = 252; φ(15) = 2·4 = 8.'),
  },
  {
    id: 'disc6-q-fill-diophantine', type: 'fill-blank', lessonId: 'disc6-l4-diophantine-crt',
    prompt: L('The general solution of 2x + 3y = 5 is x = 1 + 3t, y = 1 − ___t.', 'La solución general de 2x + 3y = 5 es x = 1 + 3t, y = 1 − ___t.', 'A solução geral de 2x + 3y = 5 é x = 1 + 3t, y = 1 − ___t.'),
    accepted: ['2'],
    explanation: L('The homogeneous solutions of 2x + 3y = 0 are (3t, −2t).', 'Las soluciones homogéneas de 2x + 3y = 0 son (3t, −2t).', 'As soluções homogêneas de 2x + 3y = 0 são (3t, −2t).'),
  },
  {
    id: 'disc6-q-mc-crt', type: 'multiple-choice', lessonId: 'disc6-l4-diophantine-crt',
    prompt: L('Solve x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).', 'Resuelve x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).', 'Resolva x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7).'),
    options: [S('x ≡ 8 (mod 105)'), S('x ≡ 23 (mod 105)'), S('x ≡ 68 (mod 105)')],
    answer: 1,
    explanation: L('23 leaves 2 mod 3, 3 mod 5, and 2 mod 7. The solution is unique modulo 105.', '23 deja 2 mod 3, 3 mod 5 y 2 mod 7. La solución es única módulo 105.', '23 deixa 2 mod 3, 3 mod 5 e 2 mod 7. A solução é única módulo 105.'),
  },
  {
    id: 'disc6-q-troubleshoot-cancel', type: 'troubleshooting', lessonId: 'disc6-l2-modular',
    prompt: L('A student writes: "2·3 ≡ 2·8 (mod 10), so 3 ≡ 8 (mod 10)." What is wrong?', 'Un estudiante escribe: "2·3 ≡ 2·8 (mod 10), así que 3 ≡ 8 (mod 10)". ¿Qué está mal?', 'Um estudante escreve: "2·3 ≡ 2·8 (mod 10), então 3 ≡ 8 (mod 10)". O que está errado?'),
    options: [
      L('The factor 2 is not invertible modulo 10, so it cannot be cancelled.', 'El factor 2 no es invertible módulo 10, así que no se puede cancelar.', 'O fator 2 não é invertível módulo 10, então não pode ser cancelado.'),
      L('The original congruence is false.', 'La congruencia original es falsa.', 'A congruência original é falsa.'),
      L('Cancelling is always allowed in modular arithmetic.', 'Cancelar siempre está permitido en aritmética modular.', 'Cancelar é sempre permitido em aritmética modular.'),
    ],
    answer: 0,
    explanation: L('Both products are 6 and 16, which are congruent mod 10, but 2 has gcd 2 with 10. Division requires an inverse.', 'Ambos productos son 6 y 16, congruentes módulo 10, pero 2 tiene gcd 2 con 10. La división requiere un inverso.', 'Ambos os produtos são 6 e 16, congruentes módulo 10, mas 2 tem gcd 2 com 10. A divisão exige um inverso.'),
  },
  {
    id: 'disc6-q-fill-phi', type: 'fill-blank', lessonId: 'disc6-l5-fermat-rsa',
    prompt: L('φ(100) = ___', 'φ(100) = ___', 'φ(100) = ___'),
    accepted: ['40'],
    explanation: L('100 = 2²·5², so φ(100) = 100·(1/2)·(4/5) = 40.', '100 = 2²·5², así que φ(100) = 100·(1/2)·(4/5) = 40.', '100 = 2²·5², então φ(100) = 100·(1/2)·(4/5) = 40.'),
  },
];

/** Interactive activities for Discrete Mathematics, Week 6. */
export const discWeek6Activities: Activity[] = [
  {
    id: 'disc6-act-order-euclid', kind: 'order', lessonId: 'disc6-l3-gcd-euclid',
    title: L('Run the Euclidean algorithm', 'Ejecuta el algoritmo de Euclides', 'Execute o algoritmo de Euclides'),
    prompt: L('Order the steps for computing gcd(252, 105).', 'Ordena los pasos para calcular gcd(252, 105).', 'Ordene os passos para calcular gcd(252, 105).'),
    items: [
      L('Divide the larger number by the smaller and record the remainder', 'Divide el número mayor por el menor y anota el resto', 'Divida o número maior pelo menor e registre o resto'),
      L('252 = 2·105 + 42', '252 = 2·105 + 42', '252 = 2·105 + 42'),
      L('105 = 2·42 + 21', '105 = 2·42 + 21', '105 = 2·42 + 21'),
      L('42 = 2·21 + 0', '42 = 2·21 + 0', '42 = 2·21 + 0'),
      L('The last non-zero remainder, 21, is the gcd', 'El último resto distinto de cero, 21, es el gcd', 'O último resto não nulo, 21, é o gcd'),
    ],
    explanation: L('Euclid replaces (a, b) by (b, a mod b) until the remainder is 0.', 'Euclides reemplaza (a, b) por (b, a mod b) hasta que el resto es 0.', 'Euclides substitui (a, b) por (b, a mod b) até o resto ser 0.'),
  },
  {
    id: 'disc6-act-fill-division', kind: 'code-fill', lessonId: 'disc6-l1-divisibility',
    title: L('Complete the division identity', 'Completa la identidad de división', 'Complete a identidade da divisão'),
    prompt: L('For a = 47 and d = 7, fill the quotient and remainder.', 'Para a = 47 y d = 7, completa el cociente y el resto.', 'Para a = 47 e d = 7, complete o quociente e o resto.'),
    template: '47 = {0} · 7 + {1}\n0 <= {1} < 7',
    blanks: ['6', '5'],
    explanation: L('47 = 6·7 + 5, and 5 is between 0 and 6.', '47 = 6·7 + 5, y 5 está entre 0 y 6.', '47 = 6·7 + 5, e 5 está entre 0 e 6.'),
  },
  {
    id: 'disc6-act-scramble-pow', kind: 'scramble', lessonId: 'disc6-l2-modular',
    title: L('Rebuild the modular power call', 'Reconstruye la llamada de potencia modular', 'Reconstrua a chamada de potência modular'),
    prompt: L('Rebuild the Python expression for 3¹⁰⁰ mod 7.', 'Reconstruye la expresión de Python para 3¹⁰⁰ mod 7.', 'Reconstrua a expressão Python para 3¹⁰⁰ mod 7.'),
    tokens: ['pow(3,', '100,', '7)'],
    explanation: L('pow(base, exponent, modulus) computes the modular power efficiently.', 'pow(base, exponente, módulo) calcula la potencia modular de forma eficiente.', 'pow(base, expoente, módulo) calcula a potência modular de forma eficiente.'),
  },
  {
    id: 'disc6-act-classify-residue', kind: 'classify', lessonId: 'disc6-l2-modular',
    title: L('Sort by remainder modulo 3', 'Clasifica por resto módulo 3', 'Classifique por resto módulo 3'),
    prompt: L('Sort each integer into its residue class modulo 3.', 'Clasifica cada entero en su clase de resto módulo 3.', 'Classifique cada inteiro em sua classe de resto módulo 3.'),
    buckets: [S('0'), S('1'), S('2')],
    items: [
      { text: S('9'), bucket: 0 },
      { text: S('10'), bucket: 1 },
      { text: S('11'), bucket: 2 },
      { text: S('−3'), bucket: 0 },
      { text: S('−2'), bucket: 1 },
      { text: S('−1'), bucket: 2 },
    ],
    explanation: L('The residue is the non-negative remainder, so −2 ≡ 1 and −1 ≡ 2 modulo 3.', 'El resto es el residuo no negativo, así que −2 ≡ 1 y −1 ≡ 2 módulo 3.', 'O resto é o resíduo não negativo, então −2 ≡ 1 e −1 ≡ 2 módulo 3.'),
  },
];

/** Paper labs for Discrete Mathematics, Week 6, with worked answers. */
export const discWeek6Labs: Lab[] = [
  {
    id: 'disc6-lab-1-euclid-bezout', kind: 'math', level: 1, minutes: 40,
    title: L('Euclid, Bézout, and a Diophantine equation', 'Euclides, Bézout y una ecuación diofántica', 'Euclides, Bézout e uma equação diofantina'),
    goal: L('Run Euclid forwards and backwards, then use the result to solve an integer equation.', 'Ejecutar Euclides hacia delante y hacia atrás, y usar el resultado para resolver una ecuación entera.', 'Executar Euclides para frente e para trás, e usar o resultado para resolver uma equação inteira.'),
    steps: [
      { id: 'disc6-lab1-s1', title: L('Euclid', 'Euclides', 'Euclides'), commands: ['gcd(240, 46)'],
        expected: L('240 = 5·46 + 10; 46 = 4·10 + 6; 10 = 1·6 + 4; 6 = 1·4 + 2; 4 = 2·2 + 0. gcd = 2.', '240 = 5·46 + 10; 46 = 4·10 + 6; 10 = 1·6 + 4; 6 = 1·4 + 2; 4 = 2·2 + 0. gcd = 2.', '240 = 5·46 + 10; 46 = 4·10 + 6; 10 = 1·6 + 4; 6 = 1·4 + 2; 4 = 2·2 + 0. gcd = 2.') },
      { id: 'disc6-lab1-s2', title: L('Bézout', 'Bézout', 'Bézout'), commands: ['Write 2 as 240x + 46y'],
        expected: L('2 = 47·46 − 9·240, so x = −9, y = 47.', '2 = 47·46 − 9·240, así que x = −9, y = 47.', '2 = 47·46 − 9·240, então x = −9, y = 47.') },
      { id: 'disc6-lab1-s3', title: L('Scale a solution', 'Escala una solución', 'Escale uma solução'), commands: ['Solve 240x + 46y = 20'],
        expected: L('Multiply the Bézout identity by 10: x = −90, y = 470 is one solution.', 'Multiplica la identidad de Bézout por 10: x = −90, y = 470 es una solución.', 'Multiplique a identidade de Bézout por 10: x = −90, y = 470 é uma solução.') },
      { id: 'disc6-lab1-s4', title: L('General solution', 'Solución general', 'Solução geral'), commands: ['Write all solutions of 240x + 46y = 20'],
        expected: L('With d = 2, add (46/2)t = 23t and −(240/2)t = −120t: x = −90 + 23t, y = 470 − 120t.', 'Con d = 2, suma (46/2)t = 23t y −(240/2)t = −120t: x = −90 + 23t, y = 470 − 120t.', 'Com d = 2, some (46/2)t = 23t e −(240/2)t = −120t: x = −90 + 23t, y = 470 − 120t.') },
    ],
  },
  {
    id: 'disc6-lab-2-rsa', kind: 'math', level: 2, minutes: 45,
    title: L('A tiny RSA round trip', 'Un viaje RSA diminuto', 'Uma viagem RSA minúscula'),
    goal: L('Build a small key, encrypt one number, decrypt it, and verify the arithmetic.', 'Construir una clave pequeña, cifrar un número, descifrarlo y verificar la aritmética.', 'Construir uma chave pequena, cifrar um número, decifrá-lo e verificar a aritmética.'),
    steps: [
      { id: 'disc6-lab2-s1', title: L('Key generation', 'Generación de clave', 'Geração de chave'), commands: ['p = 61, q = 53, e = 17'],
        expected: L('n = 3233, φ(n) = 60·52 = 3120, d = 2753 because 17·2753 ≡ 1 (mod 3120).', 'n = 3233, φ(n) = 60·52 = 3120, d = 2753 porque 17·2753 ≡ 1 (mod 3120).', 'n = 3233, φ(n) = 60·52 = 3120, d = 2753 porque 17·2753 ≡ 1 (mod 3120).') },
      { id: 'disc6-lab2-s2', title: L('Encrypt', 'Cifra', 'Cifre'), commands: ['m = 65, c = m^17 mod 3233'],
        expected: L('c = 2790.', 'c = 2790.', 'c = 2790.') },
      { id: 'disc6-lab2-s3', title: L('Decrypt', 'Descifra', 'Decifre'), commands: ['m = 2790^2753 mod 3233'],
        expected: L('The result is 65, the original message.', 'El resultado es 65, el mensaje original.', 'O resultado é 65, a mensagem original.') },
      { id: 'disc6-lab2-s4', title: L('Why it works', 'Por qué funciona', 'Por que funciona'), commands: ['Check ed ≡ 1 (mod φ(n))'],
        expected: L('17·2753 = 46,801 = 15·3120 + 1. Euler’s theorem then makes (mᵉ)ᵈ ≡ m (mod n) for messages coprime to n; padding handles the rest.', '17·2753 = 46.801 = 15·3120 + 1. El teorema de Euler hace entonces (mᵉ)ᵈ ≡ m (mod n) para mensajes coprimos con n; el relleno maneja el resto.', '17·2753 = 46.801 = 15·3120 + 1. O teorema de Euler então faz (mᵉ)ᵈ ≡ m (mod n) para mensagens coprimas com n; o preenchimento trata o resto.') },
    ],
  },
];
