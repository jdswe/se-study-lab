import type { Localized } from '../types';
import type { WeekContent } from '../weekContent';
import { dbWeek1Lessons } from './lessons';
import { dbWeek1Flashcards } from './flashcards';
import { dbWeek1Questions } from './questions';
import { dbWeek1Activities } from './activities';
import { dbWeek1Stories } from './stories';
import { dbWeek1Labs } from './labs';
import { dbWeek1Plan } from './plan';
import { dbWeek1Resources } from './resources';
import { dbWeek1Videos } from './videos';

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
  intro: L(
    'Organisations run on data. This week you see why scattered files failed, what a database and a DBMS are, who works with them, and how the relational model organises data in tables linked by keys. You will protect data with constraints and transactions, and write your first SQL queries in a real database inside your browser.',
    'Las organizaciones funcionan con datos. Esta semana verás por qué fallaron los archivos dispersos, qué son una base de datos y un SGBD, quién trabaja con ellos y cómo el modelo relacional organiza los datos en tablas vinculadas por claves. Protegerás los datos con restricciones y transacciones, y escribirás tus primeras consultas SQL en una base de datos real dentro de tu navegador.',
  ),
  objectives: [
    L('Explain the problems of file-based systems and how a DBMS solves them.', 'Explicar los problemas de los sistemas de archivos y cómo los resuelve un SGBD.'),
    L('Distinguish data, information, database, DBMS, and database system.', 'Distinguir dato, información, base de datos, SGBD y sistema de base de datos.'),
    L('Identify the roles that work with a database.', 'Identificar los roles que trabajan con una base de datos.'),
    L('Read and design tables with primary keys, foreign keys, and N:M junction tables.', 'Leer y diseñar tablas con claves primarias, claves foráneas y tablas intermedias N:M.'),
    L('Explain integrity constraints, transactions, and the three-schema architecture.', 'Explicar las restricciones de integridad, las transacciones y la arquitectura de tres esquemas.'),
    L('Write SELECT queries with WHERE, ORDER BY, and JOIN.', 'Escribir consultas SELECT con WHERE, ORDER BY y JOIN.'),
  ],
  prerequisites: [
    L('No previous database experience is needed.', 'No se necesita experiencia previa con bases de datos.'),
    L('A modern browser: the SQL Lab runs entirely on your device.', 'Un navegador moderno: el Laboratorio SQL se ejecuta por completo en tu dispositivo.'),
  ],
  keyConcepts: [
    L('DBMS', 'SGBD'), L('Metadata', 'Metadatos'), L('Table, row, column', 'Tabla, fila, columna'),
    L('Primary and foreign keys', 'Claves primaria y foránea'), L('Transaction', 'Transacción'),
    L('Three-schema architecture', 'Arquitectura de tres esquemas'), L('SELECT … FROM … WHERE', 'SELECT … FROM … WHERE'),
  ],
  estimatedMinutes: 540,
  sequence: [
    L('Read lessons 1–4: why databases, what a DBMS is, and who uses it.', 'Lee las lecciones 1–4: por qué las bases de datos, qué es un SGBD y quién lo usa.'),
    L('Read lessons 5–6 and build the campus store in the Design Studio.', 'Lee las lecciones 5–6 y construye la tienda del campus en el Estudio de diseño.'),
    L('Read lessons 7–9 and do the three SQL Lab exercises.', 'Lee las lecciones 7–9 y haz los tres ejercicios del Laboratorio SQL.'),
    L('Design the library, review your cards, and take the quiz.', 'Diseña la biblioteca, repasa tus tarjetas y haz el cuestionario.'),
  ],
  outcomes: [
    L('You can explain why organisations use a DBMS instead of files.', 'Puedes explicar por qué las organizaciones usan un SGBD en lugar de archivos.'),
    L('You can design a small relational model with correct keys.', 'Puedes diseñar un modelo relacional pequeño con claves correctas.'),
    L('You can query related tables with SQL.', 'Puedes consultar tablas relacionadas con SQL.'),
  ],
  checklist: [
    L('Read all nine lessons', 'Leer las nueve lecciones'),
    L('Complete the activities in each lesson', 'Completar las actividades de cada lección'),
    L('Finish SQL Labs 1–3', 'Terminar los Laboratorios SQL 1–3'),
    L('Design the library and the store in the Design Studio', 'Diseñar la biblioteca y la tienda en el Estudio de diseño'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario'),
  ],
  commonMistakes: [
    { mistake: L('Confusing the database with the DBMS.', 'Confundir la base de datos con el SGBD.'), fix: L('The DBMS is the software; the database is the data it manages.', 'El SGBD es el software; la base de datos son los datos que administra.') },
    { mistake: L('Modelling many-to-many with a single foreign key.', 'Modelar muchos a muchos con una sola clave foránea.'), fix: L('Add a junction table with both foreign keys.', 'Agrega una tabla intermedia con ambas claves foráneas.') },
  ],
  lessons: dbWeek1Lessons,
  flashcards: dbWeek1Flashcards,
  questions: dbWeek1Questions,
  labs: dbWeek1Labs,
  plan: dbWeek1Plan,
  resources: dbWeek1Resources,
  activities: dbWeek1Activities,
  stories: dbWeek1Stories,
  videos: dbWeek1Videos,
  // Files live in public/downloads/<locale>/<week id>/ and are generated by `npm run docs`.
  documents: [
    { title: L('Study guide', 'Guía de estudio'), file: 'study-guide.pdf', kind: 'pdf' },
    { title: L('Study guide (editable)', 'Guía de estudio (editable)'), file: 'study-guide.docx', kind: 'docx', preview: 'study-guide.pdf' },
    { title: L('Slides', 'Diapositivas'), file: 'slides.pptx', kind: 'pptx', preview: 'slides.pdf' },
    { title: L('SQL cheat sheet', 'Hoja de referencia de SQL'), file: 'cheat-sheet.pdf', kind: 'pdf' },
    { title: L('Lab workbook', 'Cuaderno de laboratorio'), file: 'lab-workbook.pdf', kind: 'pdf' },
  ],
};
