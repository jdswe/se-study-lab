import type { Lesson } from '../types';

/**
 * Two additional Week 1 lessons: requirements engineering and modelling.
 * Fully bilingual, with exercises and analogies inline.
 */
export const requirementsLesson: Lesson = {
  id: 'w1-l7-requirements-engineering',
  title: { en: 'Requirements engineering: from wishes to specifications', es: 'Ingeniería de requisitos: de deseos a especificaciones' },
  minutes: 25,
  diagram: 'requirements',
  body: [
    {
      en: 'A requirement is a capability or condition a system must have to be accepted by its users, its customer, or a standard. Requirements engineering turns a business wish into precise, checkable statements that analysts, designers, programmers, and testers all share. Mistakes here are the most expensive kind, because every later phase is built on top of them.',
      es: 'Un requisito es una capacidad o condición que un sistema debe tener para ser aceptado por sus usuarios, su cliente o una norma. La ingeniería de requisitos convierte un deseo de negocio en enunciados precisos y comprobables que comparten analistas, diseñadores, programadores y testers. Los errores aquí son los más caros, porque todas las fases posteriores se construyen sobre ellos.',
    },
    {
      en: 'The work flows through seven activities that often overlap. Inception identifies the need and a high-level solution. Elicitation gathers needs from stakeholders. Elaboration refines them into scenarios, business rules, and main and alternative flows. Negotiation reconciles conflicting views and weighs risk, cost, and time. Specification writes everything down in a standard template, often with diagrams and prototypes. Validation reviews the specification with users and fixes problems before building. Management tracks every change to the requirements for the whole project.',
      es: 'El trabajo pasa por siete actividades que a menudo se solapan. El inicio identifica la necesidad y una solución de alto nivel. La obtención (elicitación) recoge las necesidades de los interesados. La elaboración las refina en escenarios, reglas de negocio y flujos principales y alternativos. La negociación concilia visiones en conflicto y evalúa riesgo, costo y plazo. La especificación lo pone todo por escrito en una plantilla estándar, a menudo con diagramas y prototipos. La validación revisa la especificación con los usuarios y corrige problemas antes de construir. La gestión registra cada cambio de los requisitos durante todo el proyecto.',
    },
    {
      en: 'Elicitation is hard for three reasons. Scope problems: the system boundaries are unclear, so the analyst writes assumptions and constraints that say what is in and what is out. Understanding problems: users may not know what they need, or describe it at too high a level. Volatility: requirements change from one meeting to the next, so teams record agreements in written minutes and work with one representative user.',
      es: 'La obtención es difícil por tres motivos. Problemas de alcance: los límites del sistema no están claros, así que el analista escribe supuestos y restricciones que dicen qué entra y qué no. Problemas de comprensión: los usuarios pueden no saber lo que necesitan o describirlo a un nivel demasiado alto. Volatilidad: los requisitos cambian de una reunión a otra, así que los equipos registran los acuerdos en actas y trabajan con un usuario representativo.',
    },
    {
      en: 'Requirements come in layers. Business requirements state the organisation\'s goals. Stakeholder requirements describe the needs of a group of users. Solution requirements say what the system must do, and split into functional requirements (behaviour: "the system emails a receipt after payment") and non-functional requirements (qualities: "a page loads in under 2 seconds with 500 users online"). Transition requirements are temporary capabilities to move from the old situation to the new one, such as migrating old data.',
      es: 'Los requisitos tienen capas. Los requisitos de negocio expresan los objetivos de la organización. Los requisitos de los interesados describen las necesidades de un grupo de usuarios. Los requisitos de la solución dicen qué debe hacer el sistema y se dividen en funcionales (comportamiento: "el sistema envía un recibo por correo tras el pago") y no funcionales (cualidades: "una página carga en menos de 2 segundos con 500 usuarios conectados"). Los requisitos de transición son capacidades temporales para pasar de la situación anterior a la nueva, como migrar datos antiguos.',
    },
  ],
  analogy: {
    en: 'A tailor measures twice and cuts once. Requirements are the measurements: if they are wrong, no amount of careful sewing (coding) will make the suit fit.',
    es: 'Un sastre mide dos veces y corta una. Los requisitos son las medidas: si están mal, ninguna costura cuidadosa (programación) hará que el traje quede bien.',
  },
  takeaways: [
    { en: 'A requirement must be checkable: someone should be able to say "met" or "not met".', es: 'Un requisito debe ser comprobable: alguien debe poder decir "se cumple" o "no se cumple".' },
    { en: 'Seven activities: inception, elicitation, elaboration, negotiation, specification, validation, management.', es: 'Siete actividades: inicio, obtención, elaboración, negociación, especificación, validación y gestión.' },
    { en: 'Functional = what the system does. Non-functional = how well it does it.', es: 'Funcional = qué hace el sistema. No funcional = qué tan bien lo hace.' },
  ],
  check: {
    question: { en: '"The app must support 1,000 users at the same time without slowing down." What type of requirement is this?', es: '"La app debe soportar 1.000 usuarios a la vez sin volverse lenta." ¿Qué tipo de requisito es?' },
    options: [
      { en: 'Non-functional (performance quality)', es: 'No funcional (calidad de rendimiento)' },
      { en: 'Functional (a behaviour)', es: 'Funcional (un comportamiento)' },
      { en: 'Transition requirement', es: 'Requisito de transición' },
    ],
    answer: 0,
    explanation: { en: 'It describes how well the system performs, not a new behaviour, so it is non-functional.', es: 'Describe qué tan bien funciona el sistema, no un comportamiento nuevo, así que es no funcional.' },
  },
  pitfalls: [
    { mistake: { en: 'Writing "the system should be fast and easy".', es: 'Escribir "el sistema debe ser rápido y fácil".' }, fix: { en: 'Add a measure: "search results appear in under 1 second".', es: 'Añade una medida: "los resultados de búsqueda aparecen en menos de 1 segundo".' } },
    { mistake: { en: 'Changing requirements by chat with no record.', es: 'Cambiar requisitos por chat sin dejar registro.' }, fix: { en: 'Record each agreement and its approver; that is requirements management.', es: 'Registra cada acuerdo y quién lo aprueba; eso es gestión de requisitos.' } },
  ],
  exercises: [
    {
      id: 'ex-l7-1', level: 1,
      title: { en: 'Find the boundary', es: 'Encuentra el límite' },
      prompt: { en: 'A library asks for "a system for books". Write two assumptions or constraints that set the scope.', es: 'Una biblioteca pide "un sistema para libros". Escribe dos supuestos o restricciones que fijen el alcance.' },
      hint: { en: 'Say what is included and what is explicitly out.', es: 'Di qué se incluye y qué queda explícitamente fuera.' },
      solution: { en: 'Example: "Includes loans and returns for members." "Excludes buying new books and paying staff salaries." Clear limits prevent scope problems.', es: 'Ejemplo: "Incluye préstamos y devoluciones para socios." "Excluye la compra de libros nuevos y el pago de salarios." Los límites claros evitan problemas de alcance.' },
    },
    {
      id: 'ex-l7-2', level: 2,
      title: { en: 'Split the layers', es: 'Separa las capas' },
      prompt: { en: 'For an online pharmacy, write one business, one functional, one non-functional, and one transition requirement.', es: 'Para una farmacia en línea, escribe un requisito de negocio, uno funcional, uno no funcional y uno de transición.' },
      hint: { en: 'Business = goal; functional = action; non-functional = quality with a number; transition = temporary.', es: 'Negocio = objetivo; funcional = acción; no funcional = cualidad con un número; transición = temporal.' },
      solution: { en: 'Business: "increase online sales by 20% this year." Functional: "customers upload a prescription photo." Non-functional: "orders are confirmed within 5 seconds." Transition: "import 10 years of customer records from the old system."', es: 'Negocio: "aumentar las ventas en línea un 20% este año." Funcional: "los clientes suben una foto de la receta." No funcional: "los pedidos se confirman en menos de 5 segundos." Transición: "importar 10 años de registros de clientes del sistema anterior."' },
    },
  ],
};

export const modellingLesson: Lesson = {
  id: 'w1-l8-modelling-software',
  title: { en: 'Modelling software: from context diagrams to UML', es: 'Modelar software: de los diagramas de contexto a UML' },
  minutes: 25,
  diagram: 'context',
  body: [
    {
      en: 'A model is a simplified representation of a system that helps you reason about it. Good models have five qualities: they are abstract (they leave out what does not matter), understandable, precise (faithful to the system), predictive (they support correct conclusions), and cheaper than building and studying the real thing. Models become the shared language between users, analysts, and developers.',
      es: 'Un modelo es una representación simplificada de un sistema que ayuda a razonar sobre él. Los buenos modelos tienen cinco cualidades: son abstractos (dejan fuera lo que no importa), comprensibles, precisos (fieles al sistema), predictivos (permiten conclusiones correctas) y más baratos que construir y estudiar el sistema real. Los modelos se convierten en el lenguaje común entre usuarios, analistas y desarrolladores.',
    },
    {
      en: 'Analysis models describe the problem in the real world: what the business does. Design models describe the software solution: how the system will do it. Forward engineering goes from a model to working code; reverse engineering rebuilds a model from an existing product or code base, which is common when documentation is missing.',
      es: 'Los modelos de análisis describen el problema en el mundo real: qué hace el negocio. Los modelos de diseño describen la solución de software: cómo lo hará el sistema. La ingeniería directa va de un modelo a código funcional; la ingeniería inversa reconstruye un modelo a partir de un producto o código existente, algo común cuando falta documentación.',
    },
    {
      en: 'Early in a project, a context diagram draws the system as a single box surrounded by the external actors and the data that flows in and out; it fixes the boundaries. A data flow diagram then breaks the process into steps with inputs and outputs. For data, an entity-relationship model shows entities, their attributes, and relationships with cardinality: one-to-one, one-to-many, or many-to-many. In a table, a primary key identifies each row, and a foreign key stores another table\'s primary key to link them. A state machine shows the states a component can be in, such as Draft, Paid, and Shipped, and the events that move it between them. A data dictionary defines every data item, so everyone uses the same meaning.',
      es: 'Al inicio de un proyecto, un diagrama de contexto dibuja el sistema como una sola caja rodeada de los actores externos y los datos que entran y salen; fija los límites. Después, un diagrama de flujo de datos divide el proceso en pasos con entradas y salidas. Para los datos, un modelo entidad-relación muestra entidades, sus atributos y relaciones con cardinalidad: uno a uno, uno a muchos o muchos a muchos. En una tabla, la clave primaria identifica cada fila y una clave foránea guarda la clave primaria de otra tabla para relacionarlas. Una máquina de estados muestra los estados que puede tener un componente, como Borrador, Pagado y Enviado, y los eventos que lo hacen cambiar. Un diccionario de datos define cada dato, para que todos usen el mismo significado.',
    },
    {
      en: 'UML, the Unified Modeling Language, standardises diagrams for object-oriented development. Structure diagrams show the parts of a system: class, component, object, package, and deployment diagrams. Behaviour and interaction diagrams show how it acts: use case, activity, state, and sequence diagrams. You rarely need all of them. Pick the diagram that answers the question your team is asking right now.',
      es: 'UML, el Lenguaje Unificado de Modelado, estandariza diagramas para el desarrollo orientado a objetos. Los diagramas de estructura muestran las partes de un sistema: clases, componentes, objetos, paquetes y despliegue. Los diagramas de comportamiento e interacción muestran cómo actúa: casos de uso, actividades, estados y secuencia. Rara vez necesitas todos. Elige el diagrama que responde la pregunta que tu equipo se hace en ese momento.',
    },
  ],
  analogy: {
    en: 'A city map is a model. It ignores the colour of each house (abstract) but gets the streets right (precise), so you can plan a route before walking (predictive and cheap).',
    es: 'El mapa de una ciudad es un modelo. Ignora el color de cada casa (abstracto) pero acierta con las calles (preciso), así que puedes planear una ruta antes de caminar (predictivo y barato).',
  },
  takeaways: [
    { en: 'A model is useful when it is simpler than the system but still correct about what matters.', es: 'Un modelo es útil cuando es más simple que el sistema pero sigue siendo correcto en lo que importa.' },
    { en: 'Context diagram = boundaries; ER model = data; state machine = lifecycle of one thing.', es: 'Diagrama de contexto = límites; modelo ER = datos; máquina de estados = ciclo de vida de una cosa.' },
    { en: 'UML has structure diagrams and behaviour diagrams; choose by the question you need answered.', es: 'UML tiene diagramas de estructura y de comportamiento; elige según la pregunta que necesitas responder.' },
  ],
  check: {
    question: { en: 'Table Orders has a column customer_id that stores the id of a row in Customers. What is customer_id in Orders?', es: 'La tabla Pedidos tiene una columna customer_id que guarda el id de una fila de Clientes. ¿Qué es customer_id en Pedidos?' },
    options: [
      { en: 'A foreign key', es: 'Una clave foránea' },
      { en: 'The primary key of Orders', es: 'La clave primaria de Pedidos' },
      { en: 'A state transition', es: 'Una transición de estado' },
    ],
    answer: 0,
    explanation: { en: 'It references another table\'s primary key, which is what a foreign key does. One customer can have many orders: a one-to-many relationship.', es: 'Hace referencia a la clave primaria de otra tabla, que es lo que hace una clave foránea. Un cliente puede tener muchos pedidos: una relación uno a muchos.' },
  },
  pitfalls: [
    { mistake: { en: 'Drawing every UML diagram "to be complete".', es: 'Dibujar todos los diagramas UML "para estar completo".' }, fix: { en: 'Draw the one diagram that answers the current question.', es: 'Dibuja el diagrama que responde la pregunta actual.' } },
  ],
  exercises: [
    {
      id: 'ex-l8-1', level: 1,
      title: { en: 'Draw a context diagram in words', es: 'Dibuja un diagrama de contexto con palabras' },
      prompt: { en: 'For a food delivery app, list the external actors and one data flow in and out for each.', es: 'Para una app de comida a domicilio, enumera los actores externos y un flujo de datos de entrada y salida para cada uno.' },
      hint: { en: 'Think of customers, restaurants, couriers, and the payment provider.', es: 'Piensa en clientes, restaurantes, repartidores y la pasarela de pago.' },
      solution: { en: 'Customer: order in, status out. Restaurant: menu in, order out. Courier: location in, pickup task out. Payment provider: confirmation in, charge request out.', es: 'Cliente: pedido entra, estado sale. Restaurante: menú entra, pedido sale. Repartidor: ubicación entra, tarea de recogida sale. Pasarela de pago: confirmación entra, solicitud de cobro sale.' },
    },
    {
      id: 'ex-l8-2', level: 3,
      title: { en: 'Design a state machine', es: 'Diseña una máquina de estados' },
      prompt: { en: 'List the states of an online order and the event for each transition.', es: 'Enumera los estados de un pedido en línea y el evento de cada transición.' },
      hint: { en: 'Start at Created; end at Delivered or Cancelled.', es: 'Empieza en Creado; termina en Entregado o Cancelado.' },
      solution: { en: 'Created --pay--> Paid --pack--> Packed --ship--> Shipped --deliver--> Delivered. Created or Paid --cancel--> Cancelled. Each arrow is an event; each box is a state.', es: 'Creado --pagar--> Pagado --empacar--> Empacado --enviar--> Enviado --entregar--> Entregado. Creado o Pagado --cancelar--> Cancelado. Cada flecha es un evento; cada caja es un estado.' },
    },
  ],
};
