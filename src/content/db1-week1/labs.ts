import type { Lab, Localized } from '../types';

const L = (en: string, es: string): Localized => ({ en, es });

/** Practice for Databases 1, Week 1: SQL in the in-browser SQL Lab and design in the Design Studio. */
export const dbWeek1Labs: Lab[] = [
  {
    id: 'db1-lab-1-select', kind: 'sql', level: 1, minutes: 25,
    title: L('First queries in the SQL Lab', 'Primeras consultas en el Laboratorio SQL'),
    goal: L('Run SELECT, WHERE, and ORDER BY on the campus store database.', 'Ejecutar SELECT, WHERE y ORDER BY sobre la base de datos de la tienda del campus.'),
    steps: [
      { id: 'db1-l1-s1', title: L('List every product', 'Lista todos los productos'), commands: ['SELECT * FROM product;'],
        expected: L('Five products with their id, name, price, and stock.', 'Cinco productos con su id, nombre, precio e inventario.') },
      { id: 'db1-l1-s2', title: L('Filter by price', 'Filtra por precio'), commands: ['SELECT name, price FROM product WHERE price > 20000;'],
        expected: L('Only products that cost more than 20,000.', 'Solo los productos que cuestan más de 20.000.') },
      { id: 'db1-l1-s3', title: L('Sort the result', 'Ordena el resultado'), commands: ['SELECT name, price FROM product ORDER BY price DESC;'],
        expected: L('All products, from the most to the least expensive.', 'Todos los productos, del más caro al más barato.') },
    ],
  },
  {
    id: 'db1-lab-2-join', kind: 'sql', level: 2, minutes: 30,
    title: L('Join customers and orders', 'Une clientes y pedidos'),
    goal: L('Use JOIN to answer "what did Ana buy?"', 'Usar JOIN para responder "¿qué compró Ana?"'),
    steps: [
      { id: 'db1-l2-s1', title: L('Customers with their orders', 'Clientes con sus pedidos'), commands: ['SELECT c.name, o.order_id\nFROM customer AS c\nJOIN orders AS o ON c.customer_id = o.customer_id;'],
        expected: L('Ana appears twice because she has two orders.', 'Ana aparece dos veces porque tiene dos pedidos.') },
      { id: 'db1-l2-s2', title: L('What did Ana buy?', '¿Qué compró Ana?'), commands: ["SELECT p.name, oi.quantity\nFROM customer AS c\nJOIN orders AS o ON o.customer_id = c.customer_id\nJOIN order_item AS oi ON oi.order_id = o.order_id\nJOIN product AS p ON p.product_id = oi.product_id\nWHERE c.name = 'Ana';"],
        expected: L('The products in Ana\'s orders, with quantities.', 'Los productos de los pedidos de Ana, con sus cantidades.') },
    ],
  },
  {
    id: 'db1-lab-3-integrity', kind: 'sql', level: 2, minutes: 25,
    title: L('See integrity and transactions at work', 'Observa la integridad y las transacciones'),
    goal: L('Trigger constraint errors on purpose, and undo a change with ROLLBACK.', 'Provocar errores de restricción a propósito y deshacer un cambio con ROLLBACK.'),
    steps: [
      { id: 'db1-l3-s1', title: L('Break the foreign key', 'Rompe la clave foránea'), commands: ['INSERT INTO orders (order_id, customer_id, order_date) VALUES (200, 99, \'2026-03-01\');'],
        expected: L('An error: customer 99 does not exist (FOREIGN KEY constraint failed).', 'Un error: el cliente 99 no existe (falla la restricción FOREIGN KEY).') },
      { id: 'db1-l3-s2', title: L('Break the CHECK rule', 'Rompe la regla CHECK'), commands: ['UPDATE product SET price = -5 WHERE product_id = 10;'],
        expected: L('An error: the CHECK constraint forbids negative prices.', 'Un error: la restricción CHECK prohíbe precios negativos.') },
      { id: 'db1-l3-s3', title: L('Undo with ROLLBACK', 'Deshaz con ROLLBACK'), commands: ['BEGIN;\nDELETE FROM order_item;\nSELECT COUNT(*) FROM order_item;\nROLLBACK;\nSELECT COUNT(*) FROM order_item;'],
        expected: L('The count drops to 0 inside the transaction, then returns to its original value after ROLLBACK.', 'El conteo baja a 0 dentro de la transacción y vuelve a su valor original después de ROLLBACK.') },
    ],
  },
  {
    id: 'db1-lab-4-design', kind: 'design', level: 3, minutes: 40,
    title: L('Design a library in the Design Studio', 'Diseña una biblioteca en el Estudio de diseño'),
    goal: L('Build the library model, check it, then open it in draw.io to polish the diagram.', 'Construir el modelo de la biblioteca, verificarlo y abrirlo en draw.io para pulir el diagrama.'),
    steps: [
      { id: 'db1-l4-s1', title: L('Choose the entities', 'Elige las entidades'), commands: [],
        expected: L('In the Design Studio, pick the Library scenario and add Member, Book, and Loan. Leave out the distractors.', 'En el Estudio de diseño, elige el escenario Biblioteca y agrega Socio, Libro y Préstamo. Deja fuera los distractores.') },
      { id: 'db1-l4-s2', title: L('Set keys and relationships', 'Define claves y relaciones'), commands: [],
        expected: L('Mark one primary key per entity, and connect Member 1:N Loan and Book 1:N Loan.', 'Marca una clave primaria por entidad y conecta Socio 1:N Préstamo y Libro 1:N Préstamo.') },
      { id: 'db1-l4-s3', title: L('Check and export', 'Verifica y exporta'), commands: [],
        expected: L('Press Check design until every item is green, then Export to draw.io and open the file at app.diagrams.net.', 'Pulsa Verificar diseño hasta que todo esté en verde, luego Exportar a draw.io y abre el archivo en app.diagrams.net.') },
    ],
  },
];
