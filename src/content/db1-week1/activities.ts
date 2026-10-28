import type { Activity, Localized } from '../types';

const L = (en: string, es: string): Localized => ({ en, es });

/** Interactive puzzles for Databases 1, Week 1. */
export const dbWeek1Activities: Activity[] = [
  {
    id: 'db1-act-classify-files', kind: 'classify', lessonId: 'db1-l1-files-to-databases',
    title: L('Files or DBMS?', '¿Archivos o SGBD?'),
    prompt: L('Sort each statement: does it describe file-based systems or a DBMS?', 'Clasifica cada afirmación: ¿describe sistemas de archivos o un SGBD?'),
    buckets: [L('File-based system', 'Sistema de archivos'), L('DBMS', 'SGBD')],
    items: [
      { text: L('Each program keeps its own copy of customers', 'Cada programa guarda su propia copia de los clientes'), bucket: 0 },
      { text: L('Data are stored once and shared', 'Los datos se guardan una vez y se comparten'), bucket: 1 },
      { text: L('A layout change forces code rewrites', 'Un cambio de estructura obliga a reescribir código'), bucket: 0 },
      { text: L('Access rules per user and table', 'Reglas de acceso por usuario y tabla'), bucket: 1 },
      { text: L('A damaged file often cannot be rebuilt', 'Un archivo dañado a menudo no se puede reconstruir'), bucket: 0 },
      { text: L('Backups and recovery after failures', 'Respaldos y recuperación tras fallos'), bucket: 1 },
    ],
    explanation: L('Files duplicate data and tie programs to layouts. A DBMS centralises data with sharing, security, and recovery.', 'Los archivos duplican datos y atan los programas a su estructura. Un SGBD centraliza los datos con compartición, seguridad y recuperación.'),
  },
  {
    id: 'db1-act-classify-data', kind: 'classify', lessonId: 'db1-l2-data-information-database',
    title: L('Data or information?', '¿Dato o información?'),
    prompt: L('Decide whether each item is a bare value or a value with context.', 'Decide si cada elemento es un valor suelto o un valor con contexto.'),
    buckets: [L('Data', 'Dato'), L('Information', 'Información')],
    items: [
      { text: L('"18000"', '"18000"'), bucket: 0 },
      { text: L('"The bottle costs 18,000"', '"La botella cuesta 18.000"'), bucket: 1 },
      { text: L('"F"', '"F"'), bucket: 0 },
      { text: L('"Order 101 belongs to Ana"', '"El pedido 101 es de Ana"'), bucket: 1 },
    ],
    explanation: L('Context turns data into information.', 'El contexto convierte los datos en información.'),
  },
  {
    id: 'db1-act-classify-users', kind: 'classify', lessonId: 'db1-l4-database-users',
    title: L('Who does it?', '¿Quién lo hace?'),
    prompt: L('Assign each task to the role that owns it.', 'Asigna cada tarea al rol responsable.'),
    buckets: [L('DBA', 'DBA'), L('Designer', 'Diseñador'), L('End user', 'Usuario final')],
    items: [
      { text: L('Grants a new employee read access', 'Da acceso de lectura a un empleado nuevo'), bucket: 0 },
      { text: L('Decides that Order needs a customer_id column', 'Decide que Pedido necesita una columna id_cliente'), bucket: 1 },
      { text: L('Records a sale at the cash register', 'Registra una venta en la caja'), bucket: 2 },
      { text: L('Investigates why queries became slow', 'Investiga por qué las consultas se volvieron lentas'), bucket: 0 },
      { text: L('Defines the rule "price must be positive"', 'Define la regla "el precio debe ser positivo"'), bucket: 1 },
    ],
    explanation: L('DBAs run and protect the database, designers shape it, end users use it.', 'Los DBA operan y protegen la base, los diseñadores le dan forma y los usuarios finales la usan.'),
  },
  {
    id: 'db1-act-fill-pk', kind: 'code-fill', lessonId: 'db1-l6-keys-relationships',
    title: L('Complete the table', 'Completa la tabla'),
    prompt: L('Make order_id the primary key and customer_id a foreign key to customer.', 'Haz que order_id sea la clave primaria y customer_id una clave foránea hacia customer.'),
    template: 'CREATE TABLE orders (\n  order_id    INTEGER {0} KEY,\n  customer_id INTEGER {1} REFERENCES customer(customer_id)\n);',
    blanks: ['primary', 'not null'],
    explanation: L('PRIMARY KEY identifies each order. REFERENCES makes customer_id a foreign key; NOT NULL makes every order belong to someone.', 'PRIMARY KEY identifica cada pedido. REFERENCES convierte customer_id en clave foránea; NOT NULL hace que todo pedido pertenezca a alguien.'),
  },
  {
    id: 'db1-act-order-transaction', kind: 'order', lessonId: 'db1-l7-integrity-transactions',
    title: L('Put the sale in order', 'Ordena la venta'),
    prompt: L('Arrange the steps of a safe sale.', 'Ordena los pasos de una venta segura.'),
    items: [
      L('BEGIN the transaction', 'Iniciar la transacción (BEGIN)'),
      L('Insert the new order', 'Insertar el nuevo pedido'),
      L('Insert the order item', 'Insertar el artículo del pedido'),
      L('Reduce the product stock', 'Descontar el inventario del producto'),
      L('COMMIT if every step worked', 'Confirmar (COMMIT) si todo funcionó'),
    ],
    explanation: L('Everything between BEGIN and COMMIT is one unit; any failure means ROLLBACK.', 'Todo lo que está entre BEGIN y COMMIT es una unidad; cualquier fallo implica ROLLBACK.'),
  },
  {
    id: 'db1-act-scramble-select', kind: 'scramble', lessonId: 'db1-l9-first-sql',
    title: L('Rebuild the query', 'Reconstruye la consulta'),
    prompt: L('Tap the pieces to list products that cost more than 20,000.', 'Toca las piezas para listar los productos que cuestan más de 20.000.'),
    tokens: ['SELECT', 'name,', 'price', 'FROM', 'product', 'WHERE', 'price', '>', '20000;'],
    explanation: L('SELECT what, FROM where, WHERE which rows.', 'SELECT qué, FROM de dónde y WHERE qué filas.'),
  },
  {
    id: 'db1-act-fill-join', kind: 'code-fill', lessonId: 'db1-l9-first-sql',
    title: L('Finish the join', 'Termina el JOIN'),
    prompt: L('Show each customer with their orders.', 'Muestra cada cliente con sus pedidos.'),
    template: 'SELECT c.name, o.order_id\nFROM customer AS c\n{0} orders AS o\n{1} c.customer_id = o.customer_id;',
    blanks: ['join|inner join', 'on'],
    explanation: L('JOIN names the second table, and ON gives the matching key columns.', 'JOIN nombra la segunda tabla y ON indica las columnas clave que deben coincidir.'),
  },
  {
    id: 'db1-act-order-sql', kind: 'order', lessonId: 'db1-l9-first-sql',
    title: L('Clause order', 'Orden de las cláusulas'),
    prompt: L('Put the clauses of a query in the order you write them.', 'Pon las cláusulas de una consulta en el orden en que se escriben.'),
    items: [L('SELECT', 'SELECT'), L('FROM', 'FROM'), L('JOIN … ON', 'JOIN … ON'), L('WHERE', 'WHERE'), L('ORDER BY', 'ORDER BY')],
    explanation: L('SQL is written SELECT, FROM, JOIN, WHERE, ORDER BY.', 'SQL se escribe SELECT, FROM, JOIN, WHERE, ORDER BY.'),
  },
];
