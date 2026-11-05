import type { Localized } from '../types';
import { addPortuguese } from '../localize';

const L = (en: string, es: string): Localized => ({ en, es });

export interface SqlTask {
  id: string;
  title: Localized;
  prompt: Localized;
  hint: Localized;
  /** Reference query: the learner's last result must match its result. */
  solution: string;
  /** Rows must be in the same order (for ORDER BY tasks). */
  ordered?: boolean;
  /** For tasks that change data: a query returning 1 when the change is correct. */
  verify?: string;
}

/** Self-checking SQL Lab exercises on the Willow Lane Bakery database. */
export const sqlTasks: SqlTask[] = addPortuguese([
  { id: 'sql-t1', title: L('All products', 'Todos los productos'),
    prompt: L('Show the name and price of every product.', 'Muestra el nombre y el precio de todos los productos.'),
    hint: L('SELECT two columns FROM product.', 'SELECT dos columnas FROM product.'),
    solution: 'SELECT name, price FROM product;' },
  { id: 'sql-t2', title: L('Expensive products', 'Productos caros'),
    prompt: L('Show the name and price of products that cost more than 10,000 pesos.', 'Muestra el nombre y el precio de los productos que cuestan más de 10.000 pesos.'),
    hint: L('Add WHERE price > 10000.', 'Agrega WHERE price > 10000.'),
    solution: 'SELECT name, price FROM product WHERE price > 10000;' },
  { id: 'sql-t3', title: L('Most expensive first', 'Del más caro al más barato'),
    prompt: L('Show every product\'s name and price, from the highest price to the lowest.', 'Muestra el nombre y el precio de todos los productos, del precio más alto al más bajo.'),
    hint: L('ORDER BY price DESC.', 'ORDER BY price DESC.'),
    solution: 'SELECT name, price FROM product ORDER BY price DESC;', ordered: true },
  { id: 'sql-t4', title: L('Out of stock', 'Sin inventario'),
    prompt: L('Show the names of products with no stock left.', 'Muestra los nombres de los productos que se quedaron sin inventario.'),
    hint: L('stock = 0', 'stock = 0'),
    solution: 'SELECT name FROM product WHERE stock = 0;' },
  { id: 'sql-t5', title: L('Customers and their orders', 'Clientes y sus pedidos'),
    prompt: L('Show each customer\'s name next to the id of every order they placed.', 'Muestra el nombre de cada cliente junto al id de cada pedido que hizo.'),
    hint: L('JOIN orders ON customer.customer_id = orders.customer_id.', 'JOIN orders ON customer.customer_id = orders.customer_id.'),
    solution: 'SELECT c.name, o.order_id FROM customer c JOIN orders o ON c.customer_id = o.customer_id;' },
  { id: 'sql-t6', title: L('What did Elena order?', '¿Qué pidió Elena?'),
    prompt: L('Show the product names and quantities in Elena\'s orders.', 'Muestra los nombres de los productos y las cantidades de los pedidos de Elena.'),
    hint: L('Join customer → orders → order_item → product, then WHERE c.name = \'Elena\'.', 'Une customer → orders → order_item → product y luego WHERE c.name = \'Elena\'.'),
    solution: "SELECT p.name, oi.quantity FROM customer c JOIN orders o ON o.customer_id = c.customer_id JOIN order_item oi ON oi.order_id = o.order_id JOIN product p ON p.product_id = oi.product_id WHERE c.name = 'Elena';" },
  { id: 'sql-t7', title: L('Add a baked good', 'Agrega un producto de panadería'),
    prompt: L('Insert a product with id 616, name Almond croissant, price 6200, and stock 14.', 'Inserta un producto con id 616, nombre Croissant de almendra, precio 6200 e inventario 14.'),
    hint: L('INSERT INTO product (product_id, name, price, stock) VALUES (…);', 'INSERT INTO product (product_id, name, price, stock) VALUES (…);'),
    solution: "INSERT INTO product (product_id, name, price, stock) VALUES (616, 'Almond croissant', 6200, 14);",
    verify: "SELECT COUNT(*) = 1 FROM product WHERE product_id = 616 AND name = 'Almond croissant' AND price = 6200 AND stock = 14;" },
  { id: 'sql-t8', title: L('Raise one price safely', 'Sube un precio con cuidado'),
    prompt: L('Change only the Cinnamon roll price to 5000. Every other price must stay the same.', 'Cambia solo el precio del rollito de canela a 5000. Los demás precios deben quedar iguales.'),
    hint: L('UPDATE … SET … WHERE product_id = 612.', 'UPDATE … SET … WHERE product_id = 612.'),
    solution: 'UPDATE product SET price = 5000 WHERE product_id = 612;',
    verify: 'SELECT (SELECT price FROM product WHERE product_id = 611) = 12000 AND (SELECT price FROM product WHERE product_id = 612) = 5000 AND (SELECT price FROM product WHERE product_id = 613) = 8500 AND (SELECT price FROM product WHERE product_id = 614) = 16000 AND (SELECT price FROM product WHERE product_id = 615) = 7000;' },
  { id: 'sql-t9', title: { en: 'Create a table', es: 'Crea una tabla', pt: 'Crie uma tabela' },
    prompt: { en: 'Create a table supplier with supplier_id (integer primary key), name (required text), and email (text that cannot repeat).', es: 'Crea una tabla supplier con supplier_id (clave primaria entera), name (texto obligatorio) y email (texto que no se puede repetir).', pt: 'Crie uma tabela supplier com supplier_id (chave primária inteira), name (texto obrigatório) e email (texto que não pode se repetir).' },
    hint: { en: 'CREATE TABLE supplier (supplier_id INTEGER PRIMARY KEY, name … NOT NULL, email … UNIQUE);', es: 'CREATE TABLE supplier (supplier_id INTEGER PRIMARY KEY, name … NOT NULL, email … UNIQUE);', pt: 'CREATE TABLE supplier (supplier_id INTEGER PRIMARY KEY, name … NOT NULL, email … UNIQUE);' },
    solution: 'CREATE TABLE supplier (supplier_id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(150) UNIQUE);',
    verify: "SELECT (SELECT COUNT(*) FROM pragma_table_info('supplier') WHERE name = 'supplier_id' AND pk = 1) = 1 AND (SELECT COUNT(*) FROM pragma_table_info('supplier') WHERE name = 'name' AND \"notnull\" = 1) = 1 AND (SELECT COUNT(*) FROM pragma_index_list('supplier') l JOIN pragma_index_info(l.name) i WHERE l.\"unique\" = 1 AND i.name = 'email') = 1;" },
  { id: 'sql-t10', title: { en: 'Add a column', es: 'Agrega una columna', pt: 'Adicione uma coluna' },
    prompt: { en: 'Customers now give a phone number. Add a text column phone to customer without losing any row.', es: 'Ahora los clientes dan un teléfono. Agrega una columna de texto phone a customer sin perder ninguna fila.', pt: 'Agora os clientes informam um telefone. Adicione uma coluna de texto phone a customer sem perder nenhuma linha.' },
    hint: { en: 'ALTER TABLE customer ADD COLUMN …', es: 'ALTER TABLE customer ADD COLUMN …', pt: 'ALTER TABLE customer ADD COLUMN …' },
    solution: 'ALTER TABLE customer ADD COLUMN phone VARCHAR(20);',
    verify: "SELECT (SELECT COUNT(*) FROM pragma_table_info('customer') WHERE name = 'phone') = 1 AND (SELECT COUNT(*) FROM customer) = 4;" },
]);
