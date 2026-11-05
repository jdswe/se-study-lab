import type { Lab, Localized } from '../types';

const L = (en: string, es: string): Localized => ({ en, es });

/** Practice for Databases 1, Week 1: SQL in the in-browser SQL Lab and design in the Design Studio. */
export const dbWeek1Labs: Lab[] = [
  {
    id: 'db1-lab-1-select', kind: 'sql', level: 1, minutes: 25,
    title: L('First queries in the SQL Lab', 'Primeras consultas en el Laboratorio SQL'),
    goal: L('Run SELECT, WHERE, and ORDER BY on the Willow Lane Bakery database.', 'Ejecutar SELECT, WHERE y ORDER BY sobre la base de datos de la panadería Willow Lane.'),
    steps: [
      { id: 'db1-l1-s1', title: L('List every product', 'Lista todos los productos'), commands: ['SELECT * FROM product;'],
        expected: L('Five bakery products with their id, name, price, and stock.', 'Cinco productos de panadería con su id, nombre, precio e inventario.') },
      { id: 'db1-l1-s2', title: L('Filter by price', 'Filtra por precio'), commands: ['SELECT name, price FROM product WHERE price > 10000;'],
        expected: L('Only products that cost more than 10,000 pesos.', 'Solo los productos que cuestan más de 10.000 pesos.') },
      { id: 'db1-l1-s3', title: L('Sort the result', 'Ordena el resultado'), commands: ['SELECT name, price FROM product ORDER BY price DESC;'],
        expected: L('All products, from the most to the least expensive.', 'Todos los productos, del más caro al más barato.') },
    ],
  },
  {
    id: 'db1-lab-2-join', kind: 'sql', level: 2, minutes: 30,
    title: L('Join customers and orders', 'Une clientes y pedidos'),
    goal: L('Use JOIN to answer "what did Elena order?"', 'Usar JOIN para responder "¿qué pidió Elena?"'),
    steps: [
      { id: 'db1-l2-s1', title: L('Customers with their orders', 'Clientes con sus pedidos'), commands: ['SELECT c.name, o.order_id\nFROM customer AS c\nJOIN orders AS o ON c.customer_id = o.customer_id;'],
        expected: L('Elena appears twice because she has two orders.', 'Elena aparece dos veces porque tiene dos pedidos.') },
      { id: 'db1-l2-s2', title: L('What did Elena order?', '¿Qué pidió Elena?'), commands: ["SELECT p.name, oi.quantity\nFROM customer AS c\nJOIN orders AS o ON o.customer_id = c.customer_id\nJOIN order_item AS oi ON oi.order_id = o.order_id\nJOIN product AS p ON p.product_id = oi.product_id\nWHERE c.name = 'Elena';"],
        expected: L('The products in Elena\'s orders, with quantities.', 'Los productos de los pedidos de Elena, con sus cantidades.') },
    ],
  },
  {
    id: 'db1-lab-3-integrity', kind: 'sql', level: 2, minutes: 25,
    title: L('See integrity and transactions at work', 'Observa la integridad y las transacciones'),
    goal: L('Trigger constraint errors on purpose, and undo a change with ROLLBACK.', 'Provocar errores de restricción a propósito y deshacer un cambio con ROLLBACK.'),
    steps: [
      { id: 'db1-l3-s1', title: L('Break the foreign key', 'Rompe la clave foránea'), commands: ['INSERT INTO orders (order_id, customer_id, order_date) VALUES (299, 999, \'2026-03-01\');'],
        expected: L('An error: customer 999 does not exist (FOREIGN KEY constraint failed).', 'Un error: el cliente 999 no existe (falla la restricción FOREIGN KEY).') },
      { id: 'db1-l3-s2', title: L('Break the CHECK rule', 'Rompe la regla CHECK'), commands: ['UPDATE product SET price = -5 WHERE product_id = 611;'],
        expected: L('An error: the CHECK constraint forbids negative prices.', 'Un error: la restricción CHECK prohíbe precios negativos.') },
      { id: 'db1-l3-s3', title: L('Undo with ROLLBACK', 'Deshaz con ROLLBACK'), commands: ['BEGIN;\nDELETE FROM order_item;\nSELECT COUNT(*) FROM order_item;\nROLLBACK;\nSELECT COUNT(*) FROM order_item;'],
        expected: L('The count drops to 0 inside the transaction, then returns to its original value after ROLLBACK.', 'El conteo baja a 0 dentro de la transacción y vuelve a su valor original después de ROLLBACK.') },
    ],
  },
  {
    id: 'db1-lab-4-design', kind: 'design', level: 3, minutes: 40,
    title: L('Design the bakery in the Design Studio', 'Diseña la panadería en el Estudio de diseño'),
    goal: L('Build the bakery model, check it, then open it in draw.io to polish the diagram.', 'Construir el modelo de la panadería, verificarlo y abrirlo en draw.io para pulir el diagrama.'),
    steps: [
      { id: 'db1-l4-s1', title: L('Choose the entities', 'Elige las entidades'), commands: [],
        expected: L('In the Design Studio, pick the Willow Lane Bakery scenario and add Customer, Product, Order, and Order item. Leave out the distractor.', 'En el Estudio de diseño, elige el escenario de la panadería Willow Lane y agrega Cliente, Producto, Pedido y Detalle de pedido. Deja fuera el distractor.') },
      { id: 'db1-l4-s2', title: L('Set keys and relationships', 'Define claves y relaciones'), commands: [],
        expected: L('Mark one primary key per entity, then connect Customer 1:N Order, Order 1:N Order item, and Product 1:N Order item.', 'Marca una clave primaria por entidad y conecta Cliente 1:N Pedido, Pedido 1:N Detalle de pedido y Producto 1:N Detalle de pedido.') },
      { id: 'db1-l4-s3', title: L('Check and export', 'Verifica y exporta'), commands: [],
        expected: L('Press Check design until every item is green, then Export to draw.io and open the file at app.diagrams.net.', 'Pulsa Verificar diseño hasta que todo esté en verde, luego Exportar a draw.io y abre el archivo en app.diagrams.net.') },
    ],
  },
];
