import type { Localized } from '../types';
import type { WeekContent } from '../weekContent';
import { dbWeek2LessonsA } from './lessons';
import { dbWeek2LessonsB } from './lessonsModel';
import { dbModellingMethodLesson, dbSpecializationLesson } from './lessonsMethod';
import { dbWeek2LessonsC } from './lessonsSql';
import { dbWeek2Flashcards } from './flashcards';
import { dbWeek2Questions } from './questions';
import { dbWeek2Activities } from './activities';
import { dbWeek2Stories } from './stories';
import { dbWeek2Labs } from './labs';
import { dbWeek2Plan } from './plan';
import { dbWeek2Resources } from './resources';
import { dbWeek2SqlTasks } from './sqlTasks';
import { dbWeek2StudioScenarios } from './studio';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const [lessonRelationships, lessonEr, lessonNotation, lessonMapping] = dbWeek2LessonsB;

/** Databases 1, Week 2: the relational model and ER modelling. */
export const dbWeek2: WeekContent = {
  id: 'y1-t1-m3-db-w2',
  year: 1,
  term: 1,
  module: 3,
  week: 2,
  subject: 'database-1',
  title: L('The relational model: ER modelling', 'El modelo relacional: modelado ER', 'O modelo relacional: modelagem ER'),
  intro: L(
    'In 1970 Ted Codd proposed storing data as plain tables linked by values; by the early 1980s that idea had beaten the pointer-based databases before it. This week you learn its vocabulary (relation, tuple, attribute, domain, degree, cardinality, NULL), every kind of key, and the integrity rules that keep related tables honest. Then you represent 1:1, 1:N, and N:M relationships with foreign keys and junction tables, model in depth with ER diagrams in Chen and crow\'s-foot notation, and turn a real scenario into a logical model step by step, using a music-streaming service, a bike-sharing system, a vet clinic, and a school timetable. You also model supertypes and subtypes, and finish by writing the design in SQL for MySQL and PostgreSQL with DDL and basic DML.',
    'En 1970 Ted Codd propuso guardar los datos como tablas simples unidas por valores; a comienzos de los 80 esa idea había vencido a las bases de datos de punteros que la precedieron. Esta semana aprenderás su vocabulario (relación, tupla, atributo, dominio, grado, cardinalidad, NULL), todos los tipos de clave y las reglas de integridad que mantienen coherentes las tablas relacionadas. Luego representarás relaciones 1:1, 1:N y N:M con claves foráneas y tablas intermedias, modelarás en profundidad con diagramas ER en notación de Chen y de pata de gallo, y convertirás un escenario real en un modelo lógico paso a paso, con un servicio de streaming de música, un sistema de bicicletas compartidas, una clínica veterinaria y un horario escolar. También modelarás supertipos y subtipos, y terminarás escribiendo el diseño en SQL para MySQL y PostgreSQL con DDL y DML básico.',
    'Em 1970 Ted Codd propôs guardar os dados como tabelas simples ligadas por valores; no início dos anos 80 essa ideia já tinha vencido os bancos de dados de ponteiros que vieram antes. Nesta semana você aprende seu vocabulário (relação, tupla, atributo, domínio, grau, cardinalidade, NULL), todos os tipos de chave e as regras de integridade que mantêm coerentes as tabelas relacionadas. Depois você representa relacionamentos 1:1, 1:N e N:M com chaves estrangeiras e tabelas de junção, modela em profundidade com diagramas ER nas notações de Chen e pé de galinha, e transforma um cenário real em um modelo lógico passo a passo, com um serviço de streaming de música, um sistema de bicicletas compartilhadas, uma clínica veterinária e um horário escolar. Você também modela supertipos e subtipos e termina escrevendo o projeto em SQL para MySQL e PostgreSQL com DDL e DML básico.',
  ),
  objectives: [
    L('Explain why the relational model replaced hierarchical and network databases and became practical in the early 1980s.', 'Explicar por qué el modelo relacional reemplazó a las bases jerárquicas y en red y se volvió práctico a comienzos de los 80.', 'Explicar por que o modelo relacional substituiu os bancos hierárquicos e em rede e se tornou prático no início dos anos 80.'),
    L('Define relation, tuple, attribute, domain, degree, cardinality, and NULL.', 'Definir relación, tupla, atributo, dominio, grado, cardinalidad y NULL.', 'Definir relação, tupla, atributo, domínio, grau, cardinalidade e NULL.'),
    L('Tell apart superkeys, candidate, primary, alternate, composite, and foreign keys.', 'Diferenciar superclaves y claves candidatas, primarias, alternativas, compuestas y foráneas.', 'Diferenciar superchaves e chaves candidatas, primárias, alternativas, compostas e estrangeiras.'),
    L('Apply entity and referential integrity, and choose RESTRICT, CASCADE, or SET NULL.', 'Aplicar la integridad de entidad y referencial, y elegir RESTRICT, CASCADE o SET NULL.', 'Aplicar a integridade de entidade e referencial, e escolher RESTRICT, CASCADE ou SET NULL.'),
    L('Represent 1:1, 1:N, and N:M relationships with keys and junction tables.', 'Representar relaciones 1:1, 1:N y N:M con claves y tablas intermedias.', 'Representar relacionamentos 1:1, 1:N e N:M com chaves e tabelas de junção.'),
    L('Draw ER diagrams with degree, participation, and weak entities in Chen and crow\'s-foot notation.', 'Dibujar diagramas ER con grado, participación y entidades débiles en notación de Chen y de pata de gallo.', 'Desenhar diagramas ER com grau, participação e entidades fracas nas notações de Chen e pé de galinha.'),
    L('Model supertypes and subtypes (disjoint or overlapping, total or partial) and map them to tables.', 'Modelar supertipos y subtipos (disjuntos o solapados, totales o parciales) y transformarlos en tablas.', 'Modelar supertipos e subtipos (disjuntos ou sobrepostos, totais ou parciais) e transformá-los em tabelas.'),
    L('Model a problem from a written description with a five-step method, spotting derived values.', 'Modelar un problema a partir de una descripción escrita con un método de cinco pasos, detectando valores derivados.', 'Modelar um problema a partir de uma descrição escrita com um método de cinco passos, identificando valores derivados.'),
    L('Map an ER diagram to a logical relational model step by step.', 'Transformar un diagrama ER en un modelo lógico relacional paso a paso.', 'Transformar um diagrama ER em um modelo lógico relacional passo a passo.'),
    L('Write it in SQL for MySQL and PostgreSQL (types, CREATE, ALTER, DROP, TRUNCATE) and use INSERT, SELECT, UPDATE, and DELETE.', 'Escribirlo en SQL para MySQL y PostgreSQL (tipos, CREATE, ALTER, DROP, TRUNCATE) y usar INSERT, SELECT, UPDATE y DELETE.', 'Escrevê-lo em SQL para MySQL e PostgreSQL (tipos, CREATE, ALTER, DROP, TRUNCATE) e usar INSERT, SELECT, UPDATE e DELETE.'),
  ],
  prerequisites: [
    L('Week 1: what a DBMS is, tables, and basic SELECT … FROM … WHERE.', 'Semana 1: qué es un SGBD, tablas y SELECT … FROM … WHERE básico.', 'Semana 1: o que é um SGBD, tabelas e SELECT … FROM … WHERE básico.'),
    L('Paper and pencil for drawing diagrams before checking them in the Design Studio.', 'Papel y lápiz para dibujar diagramas antes de verificarlos en el Estudio de diseño.', 'Papel e lápis para desenhar diagramas antes de verificá-los no Estúdio de projeto.'),
  ],
  keyConcepts: [
    L('Relation, tuple, attribute', 'Relación, tupla, atributo', 'Relação, tupla, atributo'), L('Domain', 'Dominio', 'Domínio'),
    L('Degree and cardinality', 'Grado y cardinalidad', 'Grau e cardinalidade'), L('NULL', 'NULL', 'NULL'),
    L('Superkey and candidate key', 'Superclave y clave candidata', 'Superchave e chave candidata'), L('Primary, alternate, and foreign keys', 'Claves primaria, alternativa y foránea', 'Chaves primária, alternativa e estrangeira'),
    L('Entity and referential integrity', 'Integridad de entidad y referencial', 'Integridade de entidade e referencial'), L('Junction table', 'Tabla intermedia', 'Tabela de junção'),
    L('Participation and weak entities', 'Participación y entidades débiles', 'Participação e entidades fracas'), L('Chen vs crow\'s foot', 'Chen vs pata de gallo', 'Chen vs pé de galinha'),
    L('Generalisation and specialisation', 'Generalización y especialización', 'Generalização e especialização'), L('DDL and DML', 'DDL y DML', 'DDL e DML'),
  ],
  estimatedMinutes: 780,
  sequence: [
    L('Lessons 1–2: history and vocabulary of the relational model.', 'Lecciones 1–2: historia y vocabulario del modelo relacional.', 'Lições 1–2: história e vocabulário do modelo relacional.'),
    L('Lessons 3–4 with SQL Lab tasks 1–2 and Lab 2: keys and integrity.', 'Lecciones 3–4 con las tareas 1–2 del Laboratorio SQL y el Laboratorio 2: claves e integridad.', 'Lições 3–4 com as tarefas 1–2 do Laboratório SQL e o Laboratório 2: chaves e integridade.'),
    L('Lesson 5 with SQL Lab tasks 3–12 and Lab 1: 1:1, 1:N, N:M in real tables.', 'Lección 5 con las tareas 3–12 del Laboratorio SQL y el Laboratorio 1: 1:1, 1:N, N:M en tablas reales.', 'Lição 5 com as tarefas 3–12 do Laboratório SQL e o Laboratório 1: 1:1, 1:N, N:M em tabelas reais.'),
    L('Lessons 6–10 with the Design Studio and Labs 3–4: ER in depth, specialisation, notation, the modelling method, and mapping.', 'Lecciones 6–10 con el Estudio de diseño y los Laboratorios 3–4: ER en profundidad, especialización, notación, el método de modelado y la transformación.', 'Lições 6–10 com o Estúdio de projeto e os Laboratórios 3–4: ER em profundidade, especialização, notação, o método de modelagem e a transformação.'),
    L('Lessons 11–12 with SQL Lab tasks 13–16: data types, DDL, and DML in MySQL and PostgreSQL.', 'Lecciones 11–12 con las tareas 13–16 del Laboratorio SQL: tipos de datos, DDL y DML en MySQL y PostgreSQL.', 'Lições 11–12 com as tarefas 13–16 do Laboratório SQL: tipos de dados, DDL e DML em MySQL e PostgreSQL.'),
    L('Review your cards and take the quiz.', 'Repasa tus tarjetas y haz el cuestionario.', 'Revise seus cartões e faça o questionário.'),
  ],
  outcomes: [
    L('You can read any relational schema and name its keys and constraints.', 'Puedes leer cualquier esquema relacional y nombrar sus claves y restricciones.', 'Você consegue ler qualquer esquema relacional e nomear suas chaves e restrições.'),
    L('You can turn a written scenario into an ER diagram and then into tables.', 'Puedes convertir un escenario escrito en un diagrama ER y luego en tablas.', 'Você consegue transformar um cenário escrito em um diagrama ER e depois em tabelas.'),
    L('You can create related tables in SQL and join them through junction tables.', 'Puedes crear tablas relacionadas en SQL y unirlas a través de tablas intermedias.', 'Você consegue criar tabelas relacionadas em SQL e juntá-las por tabelas de junção.'),
  ],
  checklist: [
    L('Read all twelve lessons', 'Leer las doce lecciones', 'Ler as doze lições'),
    L('Complete the activities in each lesson', 'Completar las actividades de cada lección', 'Completar as atividades de cada lição'),
    L('Solve the sixteen SQL Lab tasks', 'Resolver las dieciséis tareas del Laboratorio SQL', 'Resolver as dezesseis tarefas do Laboratório SQL'),
    L('Design all four scenarios in the Design Studio', 'Diseñar los cuatro escenarios en el Estudio de diseño', 'Projetar os quatro cenários no Estúdio de projeto'),
    L('Finish Labs 1–4', 'Terminar los Laboratorios 1–4', 'Terminar os Laboratórios 1–4'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Putting the foreign key on the "one" side of a 1:N relationship.', 'Poner la clave foránea en el lado "uno" de una relación 1:N.', 'Colocar a chave estrangeira no lado "um" de um relacionamento 1:N.'),
      fix: L('The foreign key lives with the many: each song stores its album_id.', 'La clave foránea vive con los muchos: cada canción guarda su album_id.', 'A chave estrangeira mora com os muitos: cada música guarda seu album_id.') },
    { mistake: L('Forgetting UNIQUE on the foreign key of a 1:1 relationship.', 'Olvidar UNIQUE en la clave foránea de una relación 1:1.', 'Esquecer UNIQUE na chave estrangeira de um relacionamento 1:1.'),
      fix: L('Without UNIQUE, a 1:1 silently becomes 1:N.', 'Sin UNIQUE, un 1:1 se convierte en 1:N sin avisar.', 'Sem UNIQUE, um 1:1 vira 1:N sem avisar.') },
    { mistake: L('Giving a weak entity only its partial key.', 'Darle a una entidad débil solo su clave parcial.', 'Dar a uma entidade fraca só a chave parcial.'),
      fix: L('Its key is the owner\'s key plus the partial key: (pet_id, dose_no).', 'Su clave es la de la dueña más la clave parcial: (pet_id, dose_no).', 'Sua chave é a da dona mais a chave parcial: (pet_id, dose_no).') },
  ],
  // Order: relational model (1–4), relationships and ER (5–6), specialisation (7), notation (8),
  // modelling method (9), mapping (10), SQL for the physical model (11–12).
  lessons: [...dbWeek2LessonsA, lessonRelationships, lessonEr, dbSpecializationLesson, lessonNotation, dbModellingMethodLesson, lessonMapping, ...dbWeek2LessonsC],
  flashcards: dbWeek2Flashcards,
  questions: dbWeek2Questions,
  labs: dbWeek2Labs,
  plan: dbWeek2Plan,
  resources: dbWeek2Resources,
  activities: dbWeek2Activities,
  stories: dbWeek2Stories,
  tools: ['design-studio', 'sql-lab'],
  toolData: { sqlTasks: dbWeek2SqlTasks, studioScenarios: dbWeek2StudioScenarios },
  videos: [],
  documents: [
    { title: { en: 'Week summary', es: 'Resumen de la semana', pt: 'Resumo da semana' }, file: 'summary.pdf', kind: 'pdf' },
    { title: { en: 'SQL and ER cheat sheet', es: 'Hoja de referencia de SQL y ER', pt: 'Folha de referência de SQL e ER' }, file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet with answers', es: 'Hoja de ejercicios con respuestas', pt: 'Folha de exercícios com respostas' }, file: 'worksheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet (editable)', es: 'Hoja de ejercicios (editable)', pt: 'Folha de exercícios (editável)' }, file: 'worksheet.docx', kind: 'docx', preview: 'worksheet.pdf' },
    { title: { en: 'Slides', es: 'Diapositivas', pt: 'Slides' }, file: 'slides.pptx', kind: 'pptx', preview: 'slides.pdf' },
  ],
};
