import type { Localized } from '../types';
import type { WeekContent } from '../weekContent';
import { dbWeek1Lessons } from './lessons';
import { dbDesignLessons } from './lessonsDesign';
import { dbDesignActivities, dbDesignFlashcards, dbDesignQuestions } from './designPractice';
import { dbWeek1Flashcards } from './flashcards';
import { dbWeek1Questions } from './questions';
import { dbWeek1Activities } from './activities';
import { dbWeek1Stories } from './stories';
import { dbWeek1Labs } from './labs';
import { dbWeek1Plan } from './plan';
import { dbWeek1Resources } from './resources';
import { dbWeek1Videos } from './videos';
import { sqlTasks } from './sqlTasks';
import { studioScenarios } from './studio';

const L = (en: string, es: string): Localized => ({ en, es });

/** Databases 1, Week 1: database management systems. */
export const dbWeek1: WeekContent = {
  id: 'y1-t1-m3-db-w1',
  year: 1,
  term: 1,
  module: 3,
  week: 1,
  subject: 'database-1',
  title: L('Database management systems', 'Sistemas de gestión de bases de datos'),
  intro: {
    en: 'Organisations run on data. This week you see why scattered files failed, what a database and a DBMS are, who works with them, and how relational and other data models organise information. You will compare and install common DBMSs, then design a database from an ER diagram to tables and SQL, protect data with constraints and transactions, and run real queries in your browser.',
    es: 'Las organizaciones funcionan con datos. Esta semana verás por qué fallaron los archivos dispersos, qué son una base de datos y un SGBD, quién trabaja con ellos y cómo los modelos relacional y otros organizan la información. Compararás e instalarás SGBD comunes; luego diseñarás una base de datos desde un diagrama ER hasta las tablas y SQL, protegerás los datos con restricciones y transacciones, y ejecutarás consultas reales en tu navegador.',
    pt: 'As organizações funcionam com dados. Nesta semana você verá por que os arquivos dispersos falharam, o que são um banco de dados e um SGBD, quem trabalha com eles e como os modelos relacional e outros organizam as informações. Você comparará e instalará SGBDs comuns; depois projetará um banco de dados do diagrama ER às tabelas e ao SQL, protegerá os dados com restrições e transações e executará consultas reais no navegador.',
  },
  objectives: [
    L('Explain the problems of file-based systems, the benefits and tradeoffs of a DBMS, and when a DBMS may be unnecessary.', 'Explicar los problemas de los sistemas de archivos, las ventajas y los límites de un SGBD, y cuándo puede no ser necesario.'),
    L('Distinguish data, information, database, DBMS, and database system.', 'Distinguir dato, información, base de datos, SGBD y sistema de base de datos.'),
    L('Identify the roles that work with a database.', 'Identificar los roles que trabajan con una base de datos.'),
    L('Compare MySQL, PostgreSQL, and SQLite, then install, connect to, and create a database with a DBMS.', 'Comparar MySQL, PostgreSQL y SQLite; luego instalar un SGBD, conectarse a él y crear una base de datos.'),
    L('Read and design tables with primary keys, foreign keys, and N:M junction tables.', 'Leer y diseñar tablas con claves primarias, claves foráneas y tablas intermedias N:M.'),
    L('Explain integrity constraints, transactions, and the three-schema architecture.', 'Explicar las restricciones de integridad, las transacciones y la arquitectura de tres esquemas.'),
    L('Write SELECT queries with WHERE, ORDER BY, and JOIN.', 'Escribir consultas SELECT con WHERE, ORDER BY y JOIN.'),
    { en: 'Draw an ER diagram with attribute types and weak entities, and map it to tables.', es: 'Dibujar un diagrama ER con tipos de atributos y entidades débiles, y transformarlo en tablas.', pt: 'Desenhar um diagrama ER com tipos de atributos e entidades fracas, e transformá-lo em tabelas.' },
    { en: 'Create and change tables with DDL, and rows with DML.', es: 'Crear y cambiar tablas con DDL, y filas con DML.', pt: 'Criar e alterar tabelas com DDL, e linhas com DML.' },
    { en: 'Compare MySQL and PostgreSQL, and install and connect to one local server.', es: 'Comparar MySQL y PostgreSQL e instalar y conectarse a un servidor local.', pt: 'Comparar MySQL e PostgreSQL e instalar e conectar-se a um servidor local.' },
  ],
  prerequisites: [
    L('No previous database experience is needed.', 'No se necesita experiencia previa con bases de datos.'),
    L('A modern browser: the SQL Lab runs entirely on your device.', 'Un navegador moderno: el Laboratorio SQL se ejecuta por completo en tu dispositivo.'),
  ],
  keyConcepts: [
    L('DBMS', 'SGBD'), L('Metadata', 'Metadatos'), L('Table, row, column', 'Tabla, fila, columna'),
    L('Primary and foreign keys', 'Claves primaria y foránea'), L('Transaction', 'Transacción'),
    L('Three-schema architecture', 'Arquitectura de tres esquemas'), L('Data models', 'Modelos de datos'),
    L('DBMS tradeoffs', 'Ventajas y límites de un SGBD'), L('SELECT … FROM … WHERE', 'SELECT … FROM … WHERE'),
    { en: 'SQL dialect and RDBMS', es: 'Dialectos SQL y SGBDR', pt: 'Dialeto SQL e SGBDR' },
  ],
  estimatedMinutes: 720,
  sequence: [
    L('Read lessons 1–4: why databases, data and information, what a DBMS does, and who uses it.', 'Lee las lecciones 1–4: por qué las bases de datos, dato e información, qué hace un SGBD y quién lo usa.'),
    L('Read lessons 5–6 and build Willow Lane Bakery in the Design Studio.', 'Lee las lecciones 5–6 y construye la panadería Willow Lane en el Estudio de diseño.'),
    L('Read lessons 7–9 and do the three SQL Lab exercises.', 'Lee las lecciones 7–9 y haz los tres ejercicios del Laboratorio SQL.'),
    { en: 'Read lessons 10–12: ER model, mapping, and DDL. Design the makerspace and do SQL Lab tasks 9–10.', es: 'Lee las lecciones 10–12: modelo ER, transformación y DDL. Diseña el taller maker y haz las tareas 9–10 del Laboratorio SQL.', pt: 'Leia as lições 10–12: modelo ER, transformação e DDL. Projete a oficina maker e faça as tarefas 9–10 do Laboratório SQL.' },
    { en: 'Read lessons 13–14: compare MySQL, PostgreSQL, and SQLite, install one on your system, and create study_lab.', es: 'Lee las lecciones 13–14: compara MySQL, PostgreSQL y SQLite, instala uno en tu sistema y crea study_lab.', pt: 'Leia as lições 13–14: compare MySQL, PostgreSQL e SQLite, instale um no seu sistema e crie study_lab.' },
    L('Design the library, review your cards, and take the quiz.', 'Diseña la biblioteca, repasa tus tarjetas y haz el cuestionario.'),
  ],
  outcomes: [
    L('You can explain why organisations use a DBMS instead of files.', 'Puedes explicar por qué las organizaciones usan un SGBD en lugar de archivos.'),
    L('You can design a small relational model with correct keys.', 'Puedes diseñar un modelo relacional pequeño con claves correctas.'),
    L('You can query related tables with SQL.', 'Puedes consultar tablas relacionadas con SQL.'),
  ],
  checklist: [
    { en: 'Read all fourteen lessons', es: 'Leer las catorce lecciones', pt: 'Ler as catorce lições' },
    L('Complete the activities in each lesson', 'Completar las actividades de cada lección'),
    { en: 'Install one local database server and create study_lab', es: 'Instalar un servidor local de bases de datos y crear study_lab', pt: 'Instalar um servidor local de banco de dados e criar study_lab' },
    L('Finish SQL Labs 1–3', 'Terminar los Laboratorios SQL 1–3'),
    L('Design the library and Willow Lane Bakery in the Design Studio', 'Diseñar la biblioteca y la panadería Willow Lane en el Estudio de diseño'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario'),
  ],
  commonMistakes: [
    { mistake: L('Confusing the database with the DBMS.', 'Confundir la base de datos con el SGBD.'), fix: L('The DBMS is the software; the database is the data it manages.', 'El SGBD es el software; la base de datos son los datos que administra.') },
    { mistake: L('Modelling many-to-many with a single foreign key.', 'Modelar muchos a muchos con una sola clave foránea.'), fix: L('Add a junction table with both foreign keys.', 'Agrega una tabla intermedia con ambas claves foráneas.') },
  ],
  lessons: [...dbWeek1Lessons, ...dbDesignLessons],
  flashcards: [...dbWeek1Flashcards, ...dbDesignFlashcards],
  questions: [...dbWeek1Questions, ...dbDesignQuestions],
  labs: dbWeek1Labs,
  plan: dbWeek1Plan,
  resources: dbWeek1Resources,
  activities: [...dbWeek1Activities, ...dbDesignActivities],
  stories: dbWeek1Stories,
  tools: ['design-studio', 'sql-lab'],
  toolData: { sqlTasks, studioScenarios },
  videos: dbWeek1Videos,
  // Files live in public/downloads/<locale>/<week id>/ and are generated by `npm run docs`.
  documents: [
    { title: { en: 'Week summary', es: 'Resumen de la semana', pt: 'Resumo da semana' }, file: 'summary.pdf', kind: 'pdf' },
    { title: { en: 'SQL and design cheat sheet', es: 'Hoja de referencia de SQL y diseño', pt: 'Folha de referência de SQL e projeto' }, file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet with answers', es: 'Hoja de ejercicios con respuestas', pt: 'Folha de exercícios com respostas' }, file: 'worksheet.pdf', kind: 'pdf' },
    { title: { en: 'Worksheet (editable)', es: 'Hoja de ejercicios (editable)', pt: 'Folha de exercícios (editável)' }, file: 'worksheet.docx', kind: 'docx', preview: 'worksheet.pdf' },
    { title: { en: 'Slides', es: 'Diapositivas', pt: 'Slides' }, file: 'slides.pptx', kind: 'pptx', preview: 'slides.pdf' },
  ],
};
