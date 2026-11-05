import type { Localized, Question } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

const l1 = 'sd1w2-l1-what-is-a-requirement';
const l2 = 'sd1w2-l2-types-of-requirements';
const l3 = 'sd1w2-l3-process-and-people';
const l4 = 'sd1w2-l4-elicitation-analysis';
const l5 = 'sd1w2-l5-specification-validation';
const l6 = 'sd1w2-l6-change-traceability';
const l7 = 'sd1w2-l7-user-stories';
const l8 = 'sd1w2-l8-acceptance-criteria-splitting';

/** Week 2 quiz: every question type, every lesson, new scenarios. */
export const sd1Week2Questions: Question[] = [
  {
    id: 'sd1w2-q-mc-design', type: 'multiple-choice', lessonId: l1,
    prompt: L('A client writes: "Store each order in PostgreSQL with a UUID key." What is it?', 'Un cliente escribe: "Guardar cada pedido en PostgreSQL con una clave UUID." ¿Qué es?', 'Um cliente escreve: "Guardar cada pedido no PostgreSQL com uma chave UUID." O que é isso?'),
    options: [
      L('A design decision, not a requirement', 'Una decisión de diseño, no un requisito', 'Uma decisão de design, não um requisito'),
      L('A functional requirement', 'Un requisito funcional', 'Um requisito funcional'),
      L('A business requirement', 'Un requisito de negocio', 'Um requisito de negócio'),
    ],
    answer: 0,
    explanation: L('It says how to build something (database and key type), not what the user needs. Unless the client imposes PostgreSQL as an organisational constraint, it belongs to design.', 'Dice cómo construir algo (base de datos y tipo de clave), no qué necesita el usuario. Salvo que el cliente imponga PostgreSQL como restricción organizacional, pertenece al diseño.', 'Diz como construir algo (banco de dados e tipo de chave), não o que o usuário precisa. A menos que o cliente imponha o PostgreSQL como restrição organizacional, isso é design.'),
    whyWrong: [
      L('Correct.', 'Correcta.', 'Correta.'),
      L('It describes no user-visible behaviour.', 'No describe ningún comportamiento visible para el usuario.', 'Não descreve nenhum comportamento visível para o usuário.'),
      L('Business requirements are goals such as "cut delivery time by 20%".', 'Los requisitos de negocio son objetivos como "reducir el tiempo de entrega un 20%".', 'Requisitos de negócio são objetivos como "reduzir o tempo de entrega em 20%".'),
    ],
  },
  {
    id: 'sd1w2-q-tf-wishes', type: 'true-false', lessonId: l1,
    prompt: L('True or false: requirements are simply the wishes of the client, written down exactly as said.', 'Verdadero o falso: los requisitos son simplemente los deseos del cliente, escritos tal como los dijo.', 'Verdadeiro ou falso: requisitos são simplesmente os desejos do cliente, escritos exatamente como foram ditos.'),
    options: TF, answer: 1,
    explanation: L('False. Requirements are wishes adjusted to real constraints (physical, legal, financial, social) and threats, after the causes of the problem are understood.', 'Falso. Los requisitos son deseos ajustados a restricciones reales (físicas, legales, económicas, sociales) y amenazas, después de entender las causas del problema.', 'Falso. Requisitos são desejos ajustados a restrições reais (físicas, legais, financeiras, sociais) e ameaças, depois de entender as causas do problema.'),
  },
  {
    id: 'sd1w2-q-matching-nfr', type: 'matching', lessonId: l2,
    prompt: L('Match each requirement of a food-delivery app with its non-functional category.', 'Une cada requisito de una app de domicilios con su categoría no funcional.', 'Ligue cada requisito de um app de delivery à sua categoria não funcional.'),
    left: [
      L('The restaurant list loads in under 2 s.', 'La lista de restaurantes carga en menos de 2 s.', 'A lista de restaurantes carrega em menos de 2 s.'),
      L('Card numbers are never stored by the app.', 'La app nunca guarda los números de tarjeta.', 'O app nunca guarda os números de cartão.'),
      L('A new user places a first order in under 3 minutes without help.', 'Un usuario nuevo hace su primer pedido en menos de 3 minutos sin ayuda.', 'Um usuário novo faz o primeiro pedido em menos de 3 minutos sem ajuda.'),
      L('Ordering is available 99.9% of each month.', 'Hacer pedidos está disponible el 99,9% de cada mes.', 'Fazer pedidos fica disponível 99,9% de cada mês.'),
      L('Works on Android 10 and later and iOS 15 and later.', 'Funciona en Android 10 o superior e iOS 15 o superior.', 'Funciona no Android 10 ou superior e no iOS 15 ou superior.'),
      L('Serves 20,000 customers at once during the Friday dinner peak.', 'Atiende a 20.000 clientes a la vez en el pico de la cena del viernes.', 'Atende 20.000 clientes ao mesmo tempo no pico do jantar de sexta.'),
    ],
    right: [
      L('Availability', 'Disponibilidad', 'Disponibilidade'),
      L('Performance', 'Rendimiento', 'Desempenho'),
      L('Portability', 'Portabilidad', 'Portabilidade'),
      L('Security', 'Seguridad', 'Segurança'),
      L('Usability', 'Usabilidad', 'Usabilidade'),
      L('Scalability', 'Escalabilidad', 'Escalabilidade'),
    ],
    answer: [1, 3, 4, 0, 2, 5],
    explanation: L('Load time is performance, not storing cards is security, time to first order is usability, uptime is availability, supported platforms are portability, and many users at once is scalability.', 'El tiempo de carga es rendimiento, no guardar tarjetas es seguridad, el tiempo hasta el primer pedido es usabilidad, el tiempo en línea es disponibilidad, las plataformas soportadas son portabilidad y muchos usuarios a la vez es escalabilidad.', 'Tempo de carregamento é desempenho, não guardar cartões é segurança, tempo até o primeiro pedido é usabilidade, tempo no ar é disponibilidade, plataformas suportadas são portabilidade e muitos usuários ao mesmo tempo é escalabilidade.'),
  },
  {
    id: 'sd1w2-q-fill-nfr', type: 'fill-blank', lessonId: l2,
    prompt: L('"Login completes in under 3 seconds" is a ___ requirement (functional or non-functional).', '"El inicio de sesión termina en menos de 3 segundos" es un requisito ___ (funcional o no funcional).', '"O login termina em menos de 3 segundos" é um requisito ___ (funcional ou não funcional).'),
    accepted: ['non-functional', 'nonfunctional', 'non functional', 'no funcional', 'no-funcional', 'nao funcional', 'não funcional', 'não-funcional', 'nao-funcional'],
    explanation: L('It does not add behaviour; it sets how fast an existing behaviour must be (performance).', 'No agrega comportamiento; fija qué tan rápido debe ser un comportamiento existente (rendimiento).', 'Não acrescenta comportamento; define quão rápido um comportamento existente deve ser (desempenho).'),
  },
  {
    id: 'sd1w2-q-mc-user-system', type: 'multiple-choice', lessonId: l2,
    prompt: L('Which statement is a system requirement rather than a user requirement?', '¿Qué enunciado es un requisito del sistema y no un requisito de usuario?', 'Qual enunciado é um requisito de sistema e não um requisito de usuário?'),
    options: [
      L('A returned copy that someone reserved waits 3 days on the hold shelf, then passes to the next reader in the queue.', 'Un ejemplar devuelto que alguien reservó espera 3 días en el estante de reservas y luego pasa al siguiente lector de la fila.', 'Um exemplar devolvido que alguém reservou espera 3 dias na estante de reservas e depois passa ao próximo leitor da fila.'),
      L('Readers can reserve books online.', 'Los lectores pueden reservar libros en línea.', 'Leitores podem reservar livros online.'),
      L('The library wants shorter waits for popular books.', 'La biblioteca quiere esperas más cortas para los libros populares.', 'A biblioteca quer esperas menores pelos livros populares.'),
    ],
    answer: 0,
    explanation: L('The first gives developers precise detail. The second is a user requirement in plain language, and the third is a business goal.', 'La primera da a los desarrolladores un detalle preciso. La segunda es un requisito de usuario en lenguaje sencillo y la tercera es un objetivo de negocio.', 'A primeira dá aos desenvolvedores um detalhe preciso. A segunda é um requisito de usuário em linguagem simples e a terceira é um objetivo de negócio.'),
  },
  {
    id: 'sd1w2-q-scenario-stakeholder', type: 'scenario', lessonId: l3,
    prompt: L('A gym app goes live. A week later, the city\'s consumer-protection office says members must be able to cancel online as easily as they signed up. Which step was weak?', 'Una app de gimnasio sale a producción. Una semana después, la oficina de protección al consumidor de la ciudad dice que los socios deben poder cancelar en línea tan fácil como se inscribieron. ¿Qué paso fue débil?', 'Um app de academia entra no ar. Uma semana depois, o Procon da cidade diz que os alunos precisam poder cancelar online tão fácil quanto se matricularam. Qual etapa foi fraca?'),
    options: [
      L('Stakeholder identification and elicitation: a regulator was missed', 'La identificación de interesados y la elicitación: se olvidó a un regulador', 'A identificação de stakeholders e a elicitação: um órgão regulador foi esquecido'),
      L('Coding: the developers typed too slowly', 'La programación: los desarrolladores escribieron muy lento', 'A programação: os desenvolvedores digitaram devagar'),
      L('Nothing: laws are not requirements', 'Nada: las leyes no son requisitos', 'Nada: leis não são requisitos'),
    ],
    answer: 0,
    explanation: L('External bodies are stakeholders and laws produce external non-functional requirements. Missing them early forces an expensive change after release.', 'Los organismos externos son interesados y las leyes producen requisitos no funcionales externos. Olvidarlos al inicio obliga a un cambio caro después de publicar.', 'Órgãos externos são stakeholders e leis geram requisitos não funcionais externos. Esquecê-los no início obriga a uma mudança cara depois do lançamento.'),
  },
  {
    id: 'sd1w2-q-short-process', type: 'short-answer', lessonId: l3,
    prompt: L('Which activity checks, together with the client, that the written requirements are what they really need? One word.', '¿Qué actividad verifica, junto con el cliente, que los requisitos escritos son lo que realmente necesita? Una palabra.', 'Qual atividade confere, junto com o cliente, que os requisitos escritos são o que ele realmente precisa? Uma palavra.'),
    accepted: ['valid|validación|validação|validacao|validacion'],
    explanation: L('Validation: reviews, prototypes, and early tests with the client confirm the requirements describe the real need.', 'Validación: revisiones, prototipos y pruebas tempranas con el cliente confirman que los requisitos describen la necesidad real.', 'Validação: revisões, protótipos e testes antecipados com o cliente confirmam que os requisitos descrevem a necessidade real.'),
  },
  {
    id: 'sd1w2-q-mc-technique', type: 'multiple-choice', lessonId: l4,
    prompt: L('Librarians cannot picture how a new self-service loan kiosk should work. Which elicitation technique helps most?', 'Los bibliotecarios no logran imaginar cómo debe funcionar un nuevo quiosco de préstamo de autoservicio. ¿Qué técnica de elicitación ayuda más?', 'Os bibliotecários não conseguem imaginar como deve funcionar um novo totem de empréstimo de autoatendimento. Qual técnica de elicitação ajuda mais?'),
    options: [
      L('A clickable prototype they can try', 'Un prototipo navegable que puedan probar', 'Um protótipo clicável que eles possam experimentar'),
      L('A questionnaire with 40 questions', 'Un cuestionario de 40 preguntas', 'Um questionário de 40 perguntas'),
      L('Reading the library\'s tax forms', 'Leer los formularios de impuestos de la biblioteca', 'Ler os formulários de impostos da biblioteca'),
    ],
    answer: 0,
    explanation: L('People react to something concrete more easily than they describe a need from nothing. A prototype also helps validation later.', 'Las personas reaccionan ante algo concreto con más facilidad que describiendo una necesidad desde cero. Un prototipo también ayuda luego en la validación.', 'As pessoas reagem a algo concreto com mais facilidade do que descrevendo uma necessidade do zero. Um protótipo também ajuda depois na validação.'),
  },
  {
    id: 'sd1w2-q-troubleshoot-policy', type: 'troubleshooting', lessonId: l4,
    prompt: L('In production, gym members are locked out after 2 wrong PINs, and the owner is angry: she wanted 5. The developer "picked a safe number". What went wrong?', 'En producción, los socios del gimnasio quedan bloqueados tras 2 PIN incorrectos y la dueña está molesta: ella quería 5. El desarrollador "eligió un número seguro". ¿Qué salió mal?', 'Em produção, os alunos da academia são bloqueados após 2 PINs errados e a dona está brava: ela queria 5. O desenvolvedor "escolheu um número seguro". O que deu errado?'),
    options: [
      L('A business policy was decided by the programmer instead of being made explicit for the client', 'Una política de negocio la decidió el programador en lugar de hacerla explícita para el cliente', 'Uma política de negócio foi decidida pelo programador em vez de ficar explícita para o cliente'),
      L('The PIN screen used the wrong colour', 'La pantalla del PIN usó el color equivocado', 'A tela do PIN usou a cor errada'),
      L('Lockouts should never exist', 'Los bloqueos nunca deberían existir', 'Bloqueios nunca deveriam existir'),
    ],
    answer: 0,
    explanation: L('The number of attempts is a business policy. Analysis should surface it as a question for the client, and the code should keep it configurable.', 'El número de intentos es una política de negocio. El análisis debe plantearla como pregunta al cliente y el código debe mantenerla configurable.', 'O número de tentativas é uma política de negócio. A análise deve levantá-la como pergunta ao cliente e o código deve mantê-la configurável.'),
  },
  {
    id: 'sd1w2-q-mc-quality', type: 'multiple-choice', lessonId: l5,
    prompt: L('Which requirement is verifiable?', '¿Qué requisito es verificable?', 'Qual requisito é verificável?'),
    options: [
      L('The courier\'s position on the map refreshes at least every 15 seconds.', 'La posición del repartidor en el mapa se actualiza al menos cada 15 segundos.', 'A posição do entregador no mapa atualiza pelo menos a cada 15 segundos.'),
      L('Tracking should feel smooth.', 'El seguimiento debe sentirse fluido.', 'O rastreamento deve parecer fluido.'),
      L('The map should be as accurate as possible.', 'El mapa debe ser lo más preciso posible.', 'O mapa deve ser o mais preciso possível.'),
    ],
    answer: 0,
    explanation: L('Only the first has a measurable target a test can pass or fail. "Smooth" and "as accurate as possible" have no limit.', 'Solo la primera tiene una meta medible que una prueba puede aprobar o reprobar. "Fluido" y "lo más preciso posible" no tienen límite.', 'Só a primeira tem uma meta mensurável que um teste pode aprovar ou reprovar. "Fluido" e "o mais preciso possível" não têm limite.'),
  },
  {
    id: 'sd1w2-q-tf-validation', type: 'true-false', lessonId: l5,
    prompt: L('True or false: requirements reviews should include both the client and the development team.', 'Verdadero o falso: las revisiones de requisitos deben incluir tanto al cliente como al equipo de desarrollo.', 'Verdadeiro ou falso: as revisões de requisitos devem incluir tanto o cliente quanto a equipe de desenvolvimento.'),
    options: TF, answer: 0,
    explanation: L('True. The client knows whether it is the right need; developers know whether it is clear, consistent, and feasible.', 'Verdadero. El cliente sabe si es la necesidad correcta; los desarrolladores saben si es claro, consistente y factible.', 'Verdadeiro. O cliente sabe se é a necessidade certa; os desenvolvedores sabem se está claro, consistente e viável.'),
  },
  {
    id: 'sd1w2-q-fill-trace', type: 'fill-blank', lessonId: l6,
    prompt: L('A table that links each requirement to its source, dependencies, design, and tests is a ___ matrix.', 'Una tabla que vincula cada requisito con su fuente, dependencias, diseño y pruebas es una matriz de ___.', 'Uma tabela que liga cada requisito à sua fonte, dependências, design e testes é uma matriz de ___.'),
    accepted: ['traceability', 'rastreabilidad', 'trazabilidad', 'rastreabilidade', 'rastreo'],
    explanation: L('A traceability matrix makes impact analysis possible when a requirement changes.', 'Una matriz de rastreabilidad (o trazabilidad) hace posible el análisis de impacto cuando cambia un requisito.', 'Uma matriz de rastreabilidade torna possível a análise de impacto quando um requisito muda.'),
  },
  {
    id: 'sd1w2-q-scenario-volatile', type: 'scenario', lessonId: l6,
    prompt: L('After the library introduces self-service kiosks, desk staff ask for a screen to fix loans the kiosks recorded wrongly, because the kiosks changed how lending works. What kind of requirement is this?', 'Después de que la biblioteca instala quioscos de autoservicio, el personal de mostrador pide una pantalla para corregir préstamos que los quioscos registraron mal, porque los quioscos cambiaron cómo se presta. ¿Qué tipo de requisito es?', 'Depois que a biblioteca instala totens de autoatendimento, os atendentes do balcão pedem uma tela para corrigir empréstimos que os totens registraram errado, porque os totens mudaram o jeito de emprestar. Que tipo de requisito é esse?'),
    options: [
      L('Consequential (volatile): it exists because the system was introduced', 'De consecuencia (volátil): existe porque se introdujo el sistema', 'Consequente (volátil): existe porque o sistema foi introduzido'),
      L('Enduring: it was always part of the business', 'Perdurable: siempre fue parte del negocio', 'Duradouro: sempre fez parte do negócio'),
      L('Compatibility: it depends on another company\'s software', 'De compatibilidad: depende del software de otra empresa', 'De compatibilidade: depende do software de outra empresa'),
    ],
    answer: 0,
    explanation: L('The need appeared as a consequence of introducing the system itself. It should go through change management like any other change.', 'La necesidad apareció como consecuencia de introducir el propio sistema. Debe pasar por la gestión de cambios como cualquier otro cambio.', 'A necessidade surgiu como consequência da introdução do próprio sistema. Deve passar pela gestão de mudanças como qualquer outra mudança.'),
  },
  {
    id: 'sd1w2-q-code-story', type: 'code', lessonId: l7,
    prompt: L('Which part of this story is missing?', '¿Qué parte de esta historia falta?', 'Qual parte desta história está faltando?'),
    code: 'As a courier,\nI want to mark an order as picked up.',
    options: [
      L('The benefit ("so that ...")', 'El beneficio ("para ...")', 'O benefício ("para ...")'),
      L('The role ("As a ...")', 'El rol ("Como ...")', 'O papel ("Como ...")'),
      L('Nothing: it is complete', 'Nada: está completa', 'Nada: está completa'),
    ],
    answer: 0,
    explanation: L('The why is missing, for example "so that the customer knows the food is on its way". Without it, the team cannot judge the value or look for a better solution.', 'Falta el porqué, por ejemplo "para que el cliente sepa que la comida va en camino". Sin él, el equipo no puede juzgar el valor ni buscar una solución mejor.', 'Falta o porquê, por exemplo "para que o cliente saiba que a comida está a caminho". Sem ele, a equipe não consegue avaliar o valor nem buscar uma solução melhor.'),
  },
  {
    id: 'sd1w2-q-matching-invest', type: 'matching', lessonId: l7,
    prompt: L('Match each problem with the INVEST letter it breaks.', 'Une cada problema con la letra de INVEST que incumple.', 'Ligue cada problema à letra do INVEST que ele quebra.'),
    left: [
      L('"Build the whole loyalty programme" in one sprint', '"Construir todo el programa de fidelidad" en un sprint', '"Construir todo o programa de fidelidade" em um sprint'),
      L('"The app should be pleasant"', '"La app debe ser agradable"', '"O app deve ser agradável"'),
      L('Cannot start until three other stories are done', 'No puede empezar hasta terminar otras tres historias', 'Não pode começar até outras três histórias ficarem prontas'),
      L('"Upgrade the logging library" with no user effect', '"Actualizar la biblioteca de logs" sin efecto para el usuario', '"Atualizar a biblioteca de logs" sem efeito para o usuário'),
    ],
    right: [
      L('Independent', 'Independiente', 'Independente'),
      L('Valuable', 'Valiosa', 'Valiosa'),
      L('Small', 'Pequeña', 'Pequena'),
      L('Testable', 'Testeable', 'Testável'),
    ],
    answer: [2, 3, 0, 1],
    explanation: L('A whole programme is an epic (not Small), "pleasant" cannot be tested, a chain of prerequisites breaks Independence, and a purely technical change shows no Value to users.', 'Un programa completo es una épica (no es Pequeña), "agradable" no se puede probar, una cadena de requisitos previos rompe la Independencia y un cambio puramente técnico no muestra Valor para los usuarios.', 'Um programa inteiro é um épico (não é Pequena), "agradável" não dá para testar, uma cadeia de pré-requisitos quebra a Independência e uma mudança puramente técnica não mostra Valor para os usuários.'),
  },
  {
    id: 'sd1w2-q-mc-moscow', type: 'multiple-choice', lessonId: l7,
    prompt: L('In MoSCoW, what does "Won\'t have (this time)" mean?', 'En MoSCoW, ¿qué significa "Won\'t have (this time)"?', 'No MoSCoW, o que significa "Won\'t have (this time)"?'),
    options: [
      L('Agreed to be out of this release, but it may come later', 'Se acordó que queda fuera de esta versión, pero puede venir después', 'Combinado que fica fora desta versão, mas pode vir depois'),
      L('Rejected forever', 'Rechazado para siempre', 'Rejeitado para sempre'),
      L('Will be done only if the team works overtime', 'Se hará solo si el equipo trabaja horas extra', 'Será feito só se a equipe fizer hora extra'),
    ],
    answer: 0,
    explanation: L('It makes scope explicit for now; it is not a permanent rejection. That clarity protects the release.', 'Hace explícito el alcance por ahora; no es un rechazo permanente. Esa claridad protege la versión.', 'Deixa o escopo explícito por enquanto; não é uma rejeição permanente. Essa clareza protege a versão.'),
  },
  {
    id: 'sd1w2-q-code-gwt', type: 'code', lessonId: l8,
    prompt: L('What is wrong with this scenario?', '¿Qué está mal en este escenario?', 'O que está errado neste cenário?'),
    code: 'Scenario: Tip the courier\n  Given the order was delivered\n  When I add a tip\n  Then it works well',
    options: [
      L('The Then is not verifiable: it needs a concrete result', 'El Then no es verificable: necesita un resultado concreto', 'O Then não é verificável: precisa de um resultado concreto'),
      L('Scenarios cannot start with Given', 'Los escenarios no pueden empezar con Given', 'Cenários não podem começar com Given'),
      L('There should be no When', 'No debería haber When', 'Não deveria haver When'),
    ],
    answer: 0,
    explanation: L('"It works well" cannot pass or fail. Better: "When I add a $3 tip, Then $3 is charged with the order And the courier sees a $3 tip". The When should also use a concrete value.', '"Funciona bien" no puede aprobar ni reprobar. Mejor: "When agrego una propina de $3, Then se cobran $3 con el pedido And el repartidor ve una propina de $3". El When también debería usar un valor concreto.', '"Funciona bem" não pode passar nem falhar. Melhor: "When adiciono uma gorjeta de R$ 5, Then R$ 5 são cobrados com o pedido And o entregador vê uma gorjeta de R$ 5". O When também deveria usar um valor concreto.'),
  },
  {
    id: 'sd1w2-q-short-split', type: 'short-answer', lessonId: l8,
    prompt: L('A story "pay for my order" is split into "pay with a saved card", "card declined: choose another method", and "payment service not responding: retry later". Which splitting pattern is this? (Name the two kinds of path.)', 'Una historia "pagar mi pedido" se divide en "pagar con una tarjeta guardada", "tarjeta rechazada: elegir otro método" y "servicio de pago sin respuesta: reintentar más tarde". ¿Qué patrón de división es? (Nombra los dos tipos de camino.)', 'Uma história "pagar meu pedido" é dividida em "pagar com um cartão salvo", "cartão recusado: escolher outro método" e "serviço de pagamento sem resposta: tentar mais tarde". Qual padrão de divisão é esse? (Diga os dois tipos de caminho.)'),
    accepted: ['happy|feliz', 'unhappy|infeliz|sad|triste'],
    explanation: L('Happy path versus unhappy paths: first the case where everything goes right, then each deviation as its own story.', 'Camino feliz frente a caminos infelices: primero el caso en que todo sale bien y luego cada desviación como su propia historia.', 'Caminho feliz versus caminhos infelizes: primeiro o caso em que tudo dá certo e depois cada desvio como sua própria história.'),
  },
  {
    id: 'sd1w2-q-tf-ac-limit', type: 'true-false', lessonId: l8,
    prompt: L('True or false: if a story needs many more than five acceptance criteria, it is often a sign it should be split.', 'Verdadero o falso: si una historia necesita muchos más de cinco criterios de aceptación, suele ser señal de que conviene dividirla.', 'Verdadeiro ou falso: se uma história precisa de muito mais do que cinco critérios de aceite, costuma ser sinal de que deve ser dividida.'),
    options: TF, answer: 0,
    explanation: L('True. Many criteria usually mean several behaviours in one story; splitting makes each piece easier to estimate, build, and test.', 'Verdadero. Muchos criterios suelen indicar varios comportamientos en una historia; dividirla hace que cada parte sea más fácil de estimar, construir y probar.', 'Verdadeiro. Muitos critérios costumam indicar vários comportamentos numa história; dividi-la torna cada parte mais fácil de estimar, construir e testar.'),
  },
];
