import type { Localized } from '../types';
import { addPortuguese } from '../localize';

const L = (en: string, es: string): Localized => ({ en, es });

export type Cardinality = '1:1' | '1:N' | 'N:M';

export interface StudioEntity {
  id: string;
  name: Localized;
  /** Column names, written as SQL identifiers. */
  attributes: string[];
  /** Choices offered for the primary key; defaults to the attributes. */
  keyOptions?: string[];
  /** The correct primary key choice. */
  pk: string;
  /** Set for entities that do not belong in the model, with the reason. */
  distractor?: Localized;
}

export interface StudioRelation {
  /** For 1:N, `from` is the "one" side and `to` is the "many" side. */
  from: string;
  to: string;
  card: Cardinality;
}

export interface StudioScenario {
  id: string;
  title: Localized;
  brief: Localized;
  entities: StudioEntity[];
  solution: StudioRelation[];
}

/** Preset design scenarios for the Design Studio. */
export const studioScenarios: StudioScenario[] = addPortuguese([
  {
    id: 'library',
    title: L('Library', 'Biblioteca'),
    brief: L(
      'A library lends books to its members. For each member it stores a code, name, and email. For each book, a code, title, author, and year. Each loan records which member took which book, the loan date, and the return date. A member can have many loans, and a book can be lent many times.',
      'Una biblioteca presta libros a sus socios. De cada socio guarda un código, nombre y correo. De cada libro, un código, título, autor y año. Cada préstamo registra qué socio llevó qué libro, la fecha del préstamo y la fecha de devolución. Un socio puede tener muchos préstamos y un libro puede prestarse muchas veces.',
    ),
    entities: [
      { id: 'member', name: L('Member', 'Socio'), attributes: ['member_id', 'name', 'email'], pk: 'member_id' },
      { id: 'book', name: L('Book', 'Libro'), attributes: ['book_id', 'title', 'author', 'year'], pk: 'book_id' },
      { id: 'loan', name: L('Loan', 'Préstamo'), attributes: ['loan_id', 'member_id', 'book_id', 'loan_date', 'return_date'], pk: 'loan_id' },
      { id: 'building', name: L('Library building', 'Edificio de la biblioteca'), attributes: ['building_id', 'address'], pk: 'building_id',
        distractor: L('There is only one library: it is the mini-world itself, not something stored row by row.', 'Solo hay una biblioteca: es el propio minimundo, no algo que se guarde fila por fila.') },
      { id: 'weather', name: L('Weather', 'Clima'), attributes: ['day', 'temperature'], pk: 'day',
        distractor: L('The brief never mentions weather. Model only what the library needs to track.', 'El enunciado nunca menciona el clima. Modela solo lo que la biblioteca necesita registrar.') },
    ],
    solution: [
      { from: 'member', to: 'loan', card: '1:N' },
      { from: 'book', to: 'loan', card: '1:N' },
    ],
  },
  {
    id: 'store',
    title: L('Campus store', 'Tienda del campus'),
    brief: L(
      'The campus store sells products to customers. Customers have an id, name, and city. Products have an id, name, price, and stock. Each order belongs to one customer and has a date. An order can include several products, each with a quantity, and a product can appear in many orders.',
      'La tienda del campus vende productos a clientes. Los clientes tienen id, nombre y ciudad. Los productos tienen id, nombre, precio e inventario. Cada pedido pertenece a un cliente y tiene una fecha. Un pedido puede incluir varios productos, cada uno con una cantidad, y un producto puede aparecer en muchos pedidos.',
    ),
    entities: [
      { id: 'customer', name: L('Customer', 'Cliente'), attributes: ['customer_id', 'name', 'city'], pk: 'customer_id' },
      { id: 'order', name: L('Order', 'Pedido'), attributes: ['order_id', 'customer_id', 'order_date'], pk: 'order_id' },
      { id: 'product', name: L('Product', 'Producto'), attributes: ['product_id', 'name', 'price', 'stock'], pk: 'product_id' },
      { id: 'order_item', name: L('Order item', 'Detalle de pedido'), attributes: ['order_id', 'product_id', 'quantity'],
        keyOptions: ['order_id', 'product_id', 'quantity', 'order_id + product_id'], pk: 'order_id + product_id' },
      { id: 'register', name: L('Cash register', 'Caja registradora'), attributes: ['register_id', 'model'], pk: 'register_id',
        distractor: L('The brief asks about customers, orders, and products, not the store\'s devices.', 'El enunciado pide clientes, pedidos y productos, no los equipos de la tienda.') },
    ],
    solution: [
      { from: 'customer', to: 'order', card: '1:N' },
      { from: 'order', to: 'order_item', card: '1:N' },
      { from: 'product', to: 'order_item', card: '1:N' },
    ],
  },
  {
    id: 'school',
    title: L('School enrolment', 'Inscripciones de un colegio'),
    brief: L(
      'A school records students (id, name, birth date), courses (id, title, credits), and teachers (id, name). Each course is taught by one teacher, and a teacher can teach several courses. Students enrol in many courses, and each course has many students; each enrolment stores the final grade.',
      'Un colegio registra estudiantes (id, nombre, fecha de nacimiento), cursos (id, título, créditos) y profesores (id, nombre). Cada curso lo dicta un profesor y un profesor puede dictar varios cursos. Los estudiantes se inscriben en muchos cursos y cada curso tiene muchos estudiantes; cada inscripción guarda la nota final.',
    ),
    entities: [
      { id: 'student', name: L('Student', 'Estudiante'), attributes: ['student_id', 'name', 'birth_date'], pk: 'student_id' },
      { id: 'course', name: L('Course', 'Curso'), attributes: ['course_id', 'title', 'credits', 'teacher_id'], pk: 'course_id' },
      { id: 'teacher', name: L('Teacher', 'Profesor'), attributes: ['teacher_id', 'name'], pk: 'teacher_id' },
      { id: 'enrolment', name: L('Enrolment', 'Inscripción'), attributes: ['student_id', 'course_id', 'grade'],
        keyOptions: ['student_id', 'course_id', 'grade', 'student_id + course_id'], pk: 'student_id + course_id' },
      { id: 'menu', name: L('Cafeteria menu', 'Menú de la cafetería'), attributes: ['dish_id', 'dish'], pk: 'dish_id',
        distractor: L('Lunch is not part of enrolments. Keep the model focused on the brief.', 'El almuerzo no forma parte de las inscripciones. Mantén el modelo enfocado en el enunciado.') },
    ],
    solution: [
      { from: 'teacher', to: 'course', card: '1:N' },
      { from: 'student', to: 'enrolment', card: '1:N' },
      { from: 'course', to: 'enrolment', card: '1:N' },
    ],
  },
]);
