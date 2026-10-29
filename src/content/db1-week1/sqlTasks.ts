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

/** Self-checking SQL Lab exercises on the campus-store database. */
export const sqlTasks: SqlTask[] = addPortuguese([
  { id: 'sql-t1', title: L('All products', 'Todos los productos'),
    prompt: L('Show the name and price of every product.', 'Muestra el nombre y el precio de todos los productos.'),
    hint: L('SELECT two columns FROM product.', 'SELECT dos columnas FROM product.'),
    solution: 'SELECT name, price FROM product;' },
  { id: 'sql-t2', title: L('Expensive products', 'Productos caros'),
    prompt: L('Show the name and price of products that cost more than 20,000.', 'Muestra el nombre y el precio de los productos que cuestan más de 20.000.'),
    hint: L('Add WHERE price > 20000.', 'Agrega WHERE price > 20000.'),
    solution: 'SELECT name, price FROM product WHERE price > 20000;' },
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
  { id: 'sql-t6', title: L('What did Ana buy?', '¿Qué compró Ana?'),
    prompt: L('Show the product names and quantities in Ana\'s orders.', 'Muestra los nombres de los productos y las cantidades de los pedidos de Ana.'),
    hint: L('Join customer → orders → order_item → product, then WHERE c.name = \'Ana\'.', 'Une customer → orders → order_item → product y luego WHERE c.name = \'Ana\'.'),
    solution: "SELECT p.name, oi.quantity FROM customer c JOIN orders o ON o.customer_id = c.customer_id JOIN order_item oi ON oi.order_id = o.order_id JOIN product p ON p.product_id = oi.product_id WHERE c.name = 'Ana';" },
  { id: 'sql-t7', title: L('Add a product', 'Agrega un producto'),
    prompt: L('Insert a product with id 60, name Pencil, price 2000, and stock 100.', 'Inserta un producto con id 60, nombre Pencil, precio 2000 e inventario 100.'),
    hint: L('INSERT INTO product (product_id, name, price, stock) VALUES (…);', 'INSERT INTO product (product_id, name, price, stock) VALUES (…);'),
    solution: "INSERT INTO product (product_id, name, price, stock) VALUES (60, 'Pencil', 2000, 100);",
    verify: "SELECT COUNT(*) = 1 FROM product WHERE product_id = 60 AND name = 'Pencil' AND price = 2000 AND stock = 100;" },
  { id: 'sql-t8', title: L('Raise one price safely', 'Sube un precio con cuidado'),
    prompt: L('Change only the Notebook\'s price to 9000. Every other price must stay the same.', 'Cambia solo el precio del Notebook a 9000. Los demás precios deben quedar iguales.'),
    hint: L('UPDATE … SET … WHERE product_id = 10.', 'UPDATE … SET … WHERE product_id = 10.'),
    solution: 'UPDATE product SET price = 9000 WHERE product_id = 10;',
    verify: 'SELECT (SELECT price FROM product WHERE product_id = 10) = 9000 AND (SELECT price FROM product WHERE product_id = 20) = 35000 AND (SELECT price FROM product WHERE product_id = 30) = 18000 AND (SELECT price FROM product WHERE product_id = 40) = 95000 AND (SELECT price FROM product WHERE product_id = 50) = 60000;' },
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
