import type { Localized } from '../types';
import type { WeekContent } from '../weekContent';
import { sd1Week2Lessons } from './lessons';
import { sd1Week2Flashcards } from './flashcards';
import { sd1Week2Questions } from './questions';
import { sd1Week2Activities } from './activities';
import { sd1Week2Stories } from './stories';
import { sd1Week2Labs } from './labs';
import { sd1Week2Plan } from './plan';
import { sd1Week2Resources } from './resources';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Software Development 1, Week 2: requirements engineering and user stories. */
export const sd1Week2: WeekContent = {
  id: 'y1-t1-m3-w2',
  year: 1,
  term: 1,
  module: 3,
  week: 2,
  subject: 'software-development-1',
  title: L('Requirements engineering', 'Ingeniería de requisitos', 'Engenharia de requisitos'),
  intro: L(
    'Before anyone writes code, someone has to decide what to build. This week you learn how: turning a client\'s complaint into causes and requirements, telling functional from non-functional requirements, running the requirements process with the right stakeholders, writing requirements people can test, keeping them under control when they change, and expressing them the agile way as user stories with INVEST and Given–When–Then acceptance criteria. Every example is an everyday product: a public library, a gym, a food-delivery app.',
    'Antes de que alguien escriba código, alguien tiene que decidir qué construir. Esta semana aprendes cómo: convertir la queja de un cliente en causas y requisitos, distinguir requisitos funcionales de no funcionales, llevar el proceso de requisitos con los interesados adecuados, escribir requisitos que se puedan probar, mantenerlos bajo control cuando cambian y expresarlos al estilo ágil como historias de usuario con INVEST y criterios de aceptación Dado–Cuando–Entonces. Cada ejemplo es un producto cotidiano: una biblioteca pública, un gimnasio, una app de domicilios.',
    'Antes de alguém escrever código, alguém precisa decidir o que construir. Nesta semana você aprende como: transformar a reclamação de um cliente em causas e requisitos, diferenciar requisitos funcionais de não funcionais, conduzir o processo de requisitos com os stakeholders certos, escrever requisitos que dá para testar, mantê-los sob controle quando mudam e expressá-los do jeito ágil como histórias de usuário com INVEST e critérios de aceite Dado–Quando–Então. Cada exemplo é um produto do dia a dia: uma biblioteca pública, uma academia, um app de delivery.',
  ),
  objectives: [
    L('Explain what a requirement is and derive requirements from the causes of a problem.', 'Explicar qué es un requisito y derivar requisitos de las causas de un problema.', 'Explicar o que é um requisito e derivar requisitos das causas de um problema.'),
    L('Classify requirements as functional or non-functional, and user or system, with measurable qualities.', 'Clasificar requisitos como funcionales o no funcionales, y de usuario o del sistema, con cualidades medibles.', 'Classificar requisitos como funcionais ou não funcionais, e de usuário ou de sistema, com qualidades mensuráveis.'),
    L('Describe the requirements process: feasibility, elicitation, analysis, specification, validation, management.', 'Describir el proceso de requisitos: factibilidad, elicitación, análisis, especificación, validación, gestión.', 'Descrever o processo de requisitos: viabilidade, elicitação, análise, especificação, validação, gestão.'),
    L('Choose elicitation techniques and surface business policies during analysis.', 'Elegir técnicas de elicitación y descubrir políticas de negocio durante el análisis.', 'Escolher técnicas de elicitação e revelar políticas de negócio durante a análise.'),
    L('Review requirements for quality and trace them to sources, design, and tests.', 'Revisar la calidad de los requisitos y rastrearlos hasta sus fuentes, el diseño y las pruebas.', 'Revisar a qualidade dos requisitos e rastreá-los até as fontes, o design e os testes.'),
    L('Write user stories that pass INVEST, with Given–When–Then acceptance criteria, and split epics into stories.', 'Escribir historias de usuario que cumplan INVEST, con criterios de aceptación Dado–Cuando–Entonces, y dividir épicas en historias.', 'Escrever histórias de usuário que passem no INVEST, com critérios de aceite Dado–Quando–Então, e dividir épicos em histórias.'),
  ],
  prerequisites: [
    L('Week 1: the software lifecycle and the idea of a development process.', 'Semana 1: el ciclo de vida del software y la idea de un proceso de desarrollo.', 'Semana 1: o ciclo de vida do software e a ideia de um processo de desenvolvimento.'),
    L('Paper or a text editor to write and rewrite requirements.', 'Papel o un editor de texto para escribir y reescribir requisitos.', 'Papel ou um editor de texto para escrever e reescrever requisitos.'),
  ],
  keyConcepts: [
    L('Requirement (what, not how)', 'Requisito (qué, no cómo)', 'Requisito (o quê, não como)'), L('Functional vs non-functional', 'Funcional vs no funcional', 'Funcional vs não funcional'),
    L('Stakeholder', 'Interesado (stakeholder)', 'Stakeholder'), L('Elicitation techniques', 'Técnicas de elicitación', 'Técnicas de elicitação'),
    L('Validation and quality attributes', 'Validación y atributos de calidad', 'Validação e atributos de qualidade'), L('Traceability', 'Rastreabilidad', 'Rastreabilidade'),
    L('User story and INVEST', 'Historia de usuario e INVEST', 'História de usuário e INVEST'), L('Given–When–Then', 'Dado–Cuando–Entonces', 'Dado–Quando–Então'),
    L('Epic and MoSCoW', 'Épica y MoSCoW', 'Épico e MoSCoW'),
  ],
  estimatedMinutes: 330,
  sequence: [
    L('Lessons 1–2: what a requirement is and its types.', 'Lecciones 1–2: qué es un requisito y sus tipos.', 'Lições 1–2: o que é um requisito e seus tipos.'),
    L('Lessons 3–4 and Lab 1: the process, stakeholders, elicitation, and analysis.', 'Lecciones 3–4 y Laboratorio 1: el proceso, los interesados, la elicitación y el análisis.', 'Lições 3–4 e Laboratório 1: o processo, os stakeholders, a elicitação e a análise.'),
    L('Lessons 5–6 and Lab 2: specification, validation, change, and traceability.', 'Lecciones 5–6 y Laboratorio 2: especificación, validación, cambio y rastreabilidad.', 'Lições 5–6 e Laboratório 2: especificação, validação, mudança e rastreabilidade.'),
    L('Lessons 7–8 and Lab 3: user stories, acceptance criteria, and splitting. Then the quiz.', 'Lecciones 7–8 y Laboratorio 3: historias de usuario, criterios de aceptación y división. Luego el cuestionario.', 'Lições 7–8 e Laboratório 3: histórias de usuário, critérios de aceite e divisão. Depois o questionário.'),
  ],
  outcomes: [
    L('You can turn a vague complaint into clear, testable requirements.', 'Puedes convertir una queja vaga en requisitos claros y comprobables.', 'Você consegue transformar uma reclamação vaga em requisitos claros e testáveis.'),
    L('You spot ambiguous, inconsistent, or design-laden requirements and fix them.', 'Detectas requisitos ambiguos, inconsistentes o cargados de diseño y los corriges.', 'Você identifica requisitos ambíguos, inconsistentes ou cheios de design e os corrige.'),
    L('You write user stories with acceptance criteria a tester could run.', 'Escribes historias de usuario con criterios de aceptación que un tester podría ejecutar.', 'Você escreve histórias de usuário com critérios de aceite que um testador poderia executar.'),
  ],
  checklist: [
    L('Read all eight lessons and watch the three mini stories', 'Leer las ocho lecciones y ver las tres mini historias', 'Ler as oito lições e ver as três mini-histórias'),
    L('Complete the activities in each lesson', 'Completar las actividades de cada lección', 'Completar as atividades de cada lição'),
    L('Finish Labs 1–3 and compare with the expected answers', 'Terminar los Laboratorios 1–3 y comparar con las respuestas esperadas', 'Terminar os Laboratórios 1–3 e comparar com as respostas esperadas'),
    L('Review every flashcard once', 'Repasar cada tarjeta una vez', 'Revisar cada cartão uma vez'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Writing how to build it (database, framework) instead of what the user needs.', 'Escribir cómo construirlo (base de datos, framework) en lugar de qué necesita el usuario.', 'Escrever como construir (banco de dados, framework) em vez do que o usuário precisa.'),
      fix: L('Ask "what can the user do or rely on?" and move technology choices to design.', 'Pregunta "¿qué puede hacer el usuario o con qué puede contar?" y pasa las decisiones de tecnología al diseño.', 'Pergunte "o que o usuário pode fazer ou com o que pode contar?" e leve as escolhas de tecnologia para o design.') },
    { mistake: L('Non-functional requirements without numbers ("fast", "secure").', 'Requisitos no funcionales sin números ("rápido", "seguro").', 'Requisitos não funcionais sem números ("rápido", "seguro").'),
      fix: L('Add a measure and a target that a test can check.', 'Agrega una medida y una meta que una prueba pueda comprobar.', 'Acrescente uma medida e uma meta que um teste possa conferir.') },
    { mistake: L('User stories without the "so that" or without acceptance criteria.', 'Historias de usuario sin el "para" o sin criterios de aceptación.', 'Histórias de usuário sem o "para" ou sem critérios de aceite.'),
      fix: L('Always write the benefit, and agree Given–When–Then scenarios, edge cases included, before work starts.', 'Escribe siempre el beneficio y acuerda escenarios Dado–Cuando–Entonces, incluidos los casos límite, antes de empezar.', 'Sempre escreva o benefício e combine cenários Dado–Quando–Então, incluindo os casos-limite, antes de começar.') },
  ],
  lessons: sd1Week2Lessons,
  flashcards: sd1Week2Flashcards,
  questions: sd1Week2Questions,
  labs: sd1Week2Labs,
  plan: sd1Week2Plan,
  resources: sd1Week2Resources,
  activities: sd1Week2Activities,
  stories: sd1Week2Stories,
  tools: [],
  videos: [],
  documents: [
    { title: { en: 'Week summary', es: 'Resumen de la semana', pt: 'Resumo da semana' }, file: 'summary.pdf', kind: 'pdf' },
    { title: { en: 'Requirements cheat sheet', es: 'Hoja de referencia de requisitos', pt: 'Folha de referência de requisitos' }, file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet with answers', es: 'Hoja de ejercicios con respuestas', pt: 'Folha de exercícios com respostas' }, file: 'worksheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet (editable)', es: 'Hoja de ejercicios (editable)', pt: 'Folha de exercícios (editável)' }, file: 'worksheet.docx', kind: 'docx', preview: 'worksheet.pdf' },
    { title: { en: 'Slides', es: 'Diapositivas', pt: 'Slides' }, file: 'slides.pptx', kind: 'pptx', preview: 'slides.pdf' },
  ],
};
