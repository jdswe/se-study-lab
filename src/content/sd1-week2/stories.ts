import type { Localized, Story } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Animated mini stories for Software Development 1, Week 2. */
export const sd1Week2Stories: Story[] = [
  {
    id: 'sd1w2-story-complaint', lessonId: 'sd1w2-l1-what-is-a-requirement',
    title: L('From a complaint to a requirement', 'De una queja a un requisito', 'De uma reclamação a um requisito'),
    stations: [
      { label: L('Complaint', 'Queja', 'Reclamação'), glyph: '!' },
      { label: L('Causes', 'Causas', 'Causas'), glyph: '?' },
      { label: L('Constraints', 'Restricciones', 'Restrições'), glyph: '#' },
      { label: L('Requirement', 'Requisito', 'Requisito'), glyph: '✓' },
    ],
    scenes: [
      { at: 0, caption: L('The gym owner: "Members keep leaving after two months." That is a problem, not yet a requirement.', 'La dueña del gimnasio: "Los socios se van a los dos meses." Es un problema, todavía no un requisito.', 'A dona da academia: "Os alunos vão embora depois de dois meses." Isso é um problema, ainda não um requisito.'), mood: 'alert' },
      { at: 1, caption: L('Why? Exit surveys show: classes are always full (cause A) and nobody notices when a member stops coming (cause B).', '¿Por qué? Las encuestas de salida muestran: las clases siempre están llenas (causa A) y nadie nota cuando un socio deja de venir (causa B).', 'Por quê? As pesquisas de saída mostram: as aulas estão sempre lotadas (causa A) e ninguém percebe quando um aluno para de vir (causa B).') },
      { at: 2, caption: L('Constraints: a small budget, member data must stay private, and trainers have no time for extra paperwork.', 'Restricciones: un presupuesto pequeño, los datos de los socios deben ser privados y los entrenadores no tienen tiempo para más papeleo.', 'Restrições: orçamento pequeno, os dados dos alunos precisam ser privados e os instrutores não têm tempo para mais papelada.') },
      { at: 3, caption: L('Requirement for cause B: "If a member has not checked in for 14 days, the owner gets a list with their name and last visit."', 'Requisito para la causa B: "Si un socio no registra entrada en 14 días, la dueña recibe una lista con su nombre y su última visita."', 'Requisito para a causa B: "Se um aluno não faz check-in há 14 dias, a dona recebe uma lista com o nome e a última visita."'), mood: 'ok' },
    ],
  },
  {
    id: 'sd1w2-story-three-cs', lessonId: 'sd1w2-l7-user-stories',
    title: L('Card, Conversation, Confirmation', 'Tarjeta, Conversación, Confirmación', 'Cartão, Conversa, Confirmação'),
    stations: [
      { label: L('Card', 'Tarjeta', 'Cartão'), glyph: '▭' },
      { label: L('Conversation', 'Conversación', 'Conversa'), glyph: '…' },
      { label: L('Confirmation', 'Confirmación', 'Confirmação'), glyph: '✓' },
      { label: L('Done', 'Hecho', 'Pronto'), glyph: '★' },
    ],
    scenes: [
      { at: 0, caption: L('Card: "As a customer, I want to schedule a delivery for later, so that dinner arrives when I get home."', 'Tarjeta: "Como cliente, quiero programar un pedido para más tarde, para que la cena llegue cuando yo llegue a casa."', 'Cartão: "Como cliente, quero agendar uma entrega para mais tarde, para que o jantar chegue quando eu chegar em casa."') },
      { at: 1, caption: L('Conversation: how far ahead? What if the restaurant closes early? The team and product owner agree: up to 6 hours, only during opening hours.', 'Conversación: ¿con cuánta anticipación? ¿Y si el restaurante cierra antes? El equipo y el dueño del producto acuerdan: hasta 6 horas, solo en horario de atención.', 'Conversa: com quanta antecedência? E se o restaurante fechar mais cedo? A equipe e o dono do produto combinam: até 6 horas, só no horário de funcionamento.') },
      { at: 2, caption: L('Confirmation: Given the restaurant closes at 22:00, When I schedule for 22:30, Then I see "Choose a time before 21:30".', 'Confirmación: Dado que el restaurante cierra a las 22:00, Cuando programo para las 22:30, Entonces veo "Elige una hora antes de las 21:30".', 'Confirmação: Dado que o restaurante fecha às 22:00, Quando agendo para 22:30, Então vejo "Escolha um horário antes das 21:30".'), mood: 'alert' },
      { at: 3, caption: L('Every criterion passes in the review, so the product owner accepts the story as done.', 'Todos los criterios pasan en la revisión, así que el dueño del producto acepta la historia como terminada.', 'Todos os critérios passam na revisão, então o dono do produto aceita a história como pronta.'), mood: 'ok' },
    ],
  },
  {
    id: 'sd1w2-story-change', lessonId: 'sd1w2-l6-change-traceability',
    title: L('A change request travels', 'El viaje de una solicitud de cambio', 'A viagem de um pedido de mudança'),
    stations: [
      { label: L('Request', 'Solicitud', 'Pedido'), glyph: '✉' },
      { label: L('Impact', 'Impacto', 'Impacto'), glyph: '⇄' },
      { label: L('Decision', 'Decisión', 'Decisão'), glyph: '⚖' },
      { label: L('New version', 'Nueva versión', 'Nova versão'), glyph: '2' },
    ],
    scenes: [
      { at: 0, caption: L('The head librarian asks: "Let readers renew twice instead of once." It is logged as CR-14.', 'La bibliotecaria jefa pide: "Que los lectores puedan renovar dos veces en lugar de una." Se registra como CR-14.', 'A bibliotecária-chefe pede: "Deixem os leitores renovarem duas vezes em vez de uma." Fica registrado como CR-14.') },
      { at: 1, caption: L('The traceability matrix shows RQ-07 (renew a loan) depends on RQ-02, and tests T-07a and T-07b check the renewal limit.', 'La matriz de rastreabilidad muestra que RQ-07 (renovar un préstamo) depende de RQ-02 y que las pruebas T-07a y T-07b verifican el límite de renovaciones.', 'A matriz de rastreabilidade mostra que o RQ-07 (renovar empréstimo) depende do RQ-02 e que os testes T-07a e T-07b verificam o limite de renovações.') },
      { at: 2, caption: L('Cost: half a day. Librarians worry popular books will circulate more slowly; the head librarian approves, as long as reserved titles cannot be renewed.', 'Costo: medio día. A los bibliotecarios les preocupa que los libros populares circulen más lento; la jefa lo aprueba, siempre que los títulos reservados no se puedan renovar.', 'Custo: meio dia. Os bibliotecários temem que os livros populares circulem mais devagar; a chefe aprova, desde que títulos reservados não possam ser renovados.'), mood: 'alert' },
      { at: 3, caption: L('RQ-07 becomes version 1.1, the code and tests change together, and everyone reads the same truth.', 'RQ-07 pasa a la versión 1.1, el código y las pruebas cambian juntos y todos leen la misma verdad.', 'O RQ-07 vira a versão 1.1, o código e os testes mudam juntos e todos leem a mesma verdade.'), mood: 'ok' },
    ],
  },
];
