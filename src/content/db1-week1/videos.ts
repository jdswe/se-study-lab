import type { Localized, Video } from '../types';

const L = (en: string, es: string): Localized => ({ en, es });

/** One-minute concept videos for Databases 1, Week 1. */
export const dbWeek1Videos: Video[] = [
  {
    id: 'video-why-databases', lessonId: 'db1-l1-files-to-databases',
    title: L('Why databases exist', 'Por qué existen las bases de datos'),
    summary: L('From scattered files to one shared, protected source of truth.', 'De archivos dispersos a una sola fuente de verdad, compartida y protegida.'),
    scenes: [
      { visual: { kind: 'title' }, onScreen: L('Why databases?', '¿Por qué bases de datos?'),
        narration: L('Imagine a bakery where the counter, kitchen, and delivery team each keep their own list of customers. It works, until something changes.', 'Imagina una panadería donde el mostrador, la cocina y el equipo de entregas guardan listas de clientes separadas. Funciona, hasta que algo cambia.') },
      { visual: { kind: 'files', step: 0 }, onScreen: L('One file per program', 'Un archivo por programa'),
        narration: L('The counter has a file, the kitchen has a file, and delivery has a file. Elena appears in all three.', 'El mostrador tiene un archivo, la cocina tiene otro y entregas tiene un tercero. Elena aparece en los tres.') },
      { visual: { kind: 'files', step: 1 }, onScreen: L('Copies drift apart', 'Las copias se desincronizan'),
        narration: L('Elena changes her phone number. The counter updates its file, but the delivery list never gets the change. Now the files disagree.', 'Elena cambia su número de teléfono. El mostrador actualiza su archivo, pero la lista de entregas no recibe el cambio. Ahora los archivos no coinciden.') },
      { visual: { kind: 'files', step: 2 }, onScreen: L('Store it once', 'Guárdalo una vez'),
        narration: L('A database management system keeps Elena\'s data in one place. Every bakery program asks the same system, so everyone sees the same answer.', 'Un sistema de gestión de bases de datos guarda los datos de Elena en un solo lugar. Todos los programas de la panadería consultan el mismo sistema, así todos ven la misma respuesta.') },
      { visual: { kind: 'files', step: 2 }, onScreen: L('Shared, safe, recoverable', 'Compartido, seguro, recuperable'),
        narration: L('The DBMS also decides who can see what, recovers data after a failure, and lets many people work at once.', 'El SGBD además decide quién puede ver qué, recupera los datos tras un fallo y permite que muchas personas trabajen a la vez.') },
      { visual: { kind: 'title' }, onScreen: L('One source of truth', 'Una sola fuente de verdad'),
        narration: L('That is the idea to keep: one shared, well-described source of truth for the whole organisation.', 'Esa es la idea para recordar: una sola fuente de verdad, compartida y bien descrita, para toda la organización.') },
    ],
  },
  {
    id: 'video-keys', lessonId: 'db1-l6-keys-relationships',
    title: L('Keys and relationships', 'Claves y relaciones'),
    summary: L('Primary keys, foreign keys, and the junction table for many-to-many.', 'Claves primarias, claves foráneas y la tabla intermedia para muchos a muchos.'),
    scenes: [
      { visual: { kind: 'tables', step: 0 }, onScreen: L('A table of customers', 'Una tabla de clientes'),
        narration: L('In a relational database, each table holds one kind of thing. Here, customers: one row per customer.', 'En una base de datos relacional, cada tabla guarda un tipo de cosa. Aquí, clientes: una fila por cliente.') },
      { visual: { kind: 'tables', step: 1 }, onScreen: L('Primary key', 'Clave primaria'),
        narration: L('The primary key identifies each row. It is unique and never empty, so customer 301 is always Elena, and only Elena.', 'La clave primaria identifica cada fila. Es única y nunca está vacía, así que el cliente 301 siempre es Elena, y solo Elena.') },
      { visual: { kind: 'tables', step: 2 }, onScreen: L('Foreign key', 'Clave foránea'),
        narration: L('Orders store the customer\'s id in a foreign key. One customer can have many orders: a one-to-many relationship.', 'Los pedidos guardan el id del cliente en una clave foránea. Un cliente puede tener muchos pedidos: una relación uno a muchos.') },
      { visual: { kind: 'tables', step: 2 }, onScreen: L('Integrity for free', 'Integridad incluida'),
        narration: L('The database can refuse an order for a customer that does not exist. That is referential integrity.', 'La base de datos puede rechazar un pedido de un cliente que no existe. Eso es integridad referencial.') },
      { visual: { kind: 'tables', step: 3 }, onScreen: L('Many-to-many', 'Muchos a muchos'),
        narration: L('An order has many products, and a product appears in many orders. A junction table, with both foreign keys, connects them.', 'Un pedido tiene muchos productos y un producto aparece en muchos pedidos. Una tabla intermedia, con ambas claves foráneas, los conecta.') },
      { visual: { kind: 'tables', step: 3 }, onScreen: L('Keys connect everything', 'Las claves lo conectan todo'),
        narration: L('Primary keys identify, foreign keys connect. With just these two ideas, you can model most of the real world.', 'Las claves primarias identifican y las foráneas conectan. Con solo estas dos ideas puedes modelar gran parte del mundo real.') },
    ],
  },
  {
    id: 'video-transactions', lessonId: 'db1-l7-integrity-transactions',
    title: L('Transactions: all or nothing', 'Transacciones: todo o nada'),
    summary: L('Why a sale is one unit of work, and what COMMIT and ROLLBACK do.', 'Por qué una venta es una unidad de trabajo y qué hacen COMMIT y ROLLBACK.'),
    scenes: [
      { visual: { kind: 'transaction', step: 0 }, onScreen: L('One sale, three steps', 'Una venta, tres pasos'),
        narration: L('Selling a sourdough loaf takes three steps: create the order, add the item, and reduce the stock.', 'Vender una hogaza de masa madre lleva tres pasos: crear el pedido, agregar el artículo y descontar el inventario.') },
      { visual: { kind: 'transaction', step: 2 }, onScreen: L('Halfway is dangerous', 'A medias es peligroso'),
        narration: L('If the system stops halfway, you could have an order with no stock change. The data would lie.', 'Si el sistema se detiene a la mitad, podrías tener un pedido sin descontar inventario. Los datos mentirían.') },
      { visual: { kind: 'transaction', step: 3, failed: true }, onScreen: L('ROLLBACK', 'ROLLBACK'),
        narration: L('So the steps run inside a transaction. If any step fails, the database rolls back, and it is as if nothing happened.', 'Por eso los pasos se ejecutan dentro de una transacción. Si alguno falla, la base de datos revierte todo, y es como si nada hubiera pasado.') },
      { visual: { kind: 'transaction', step: 4 }, onScreen: L('COMMIT', 'COMMIT'),
        narration: L('If every step succeeds, the transaction commits, and all the changes become permanent together.', 'Si todos los pasos funcionan, la transacción se confirma y todos los cambios se vuelven permanentes juntos.') },
      { visual: { kind: 'transaction', step: 4 }, onScreen: L('Never half a sale', 'Nunca media venta'),
        narration: L('All or nothing. That simple rule keeps your data consistent, even when things go wrong.', 'Todo o nada. Esa regla sencilla mantiene tus datos consistentes, incluso cuando algo sale mal.') },
    ],
  },
];
