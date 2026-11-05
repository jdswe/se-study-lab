import type { Localized } from '../types';
import type { SqlTask } from '../db1-week1/sqlTasks';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** SQL that checks a column belongs to the primary key of a table. */
const pkCol = (table: string, col: string) => `(SELECT COUNT(*) FROM pragma_table_info('${table}') WHERE name = '${col}' AND pk > 0) = 1`;
/** SQL that checks the number of primary-key columns of a table. */
const pkSize = (table: string, n: number) => `(SELECT COUNT(*) FROM pragma_table_info('${table}') WHERE pk > 0) = ${n}`;
/** SQL that checks a column is NOT NULL. */
const notNull = (table: string, col: string) => `(SELECT COUNT(*) FROM pragma_table_info('${table}') WHERE name = '${col}' AND "notnull" = 1) = 1`;
/** SQL that checks a foreign key from table.col to target(col). A bare REFERENCES target is also accepted. */
const fk = (table: string, col: string, target: string) =>
  `(SELECT COUNT(*) FROM pragma_foreign_key_list('${table}') WHERE "from" = '${col}' AND "table" = '${target}' AND ("to" = '${col}' OR "to" IS NULL)) = 1`;
/** SQL that checks a single column has a UNIQUE index. */
const unique = (table: string, col: string) =>
  `(SELECT COUNT(*) FROM pragma_index_list('${table}') l WHERE l."unique" = 1 AND (SELECT COUNT(*) FROM pragma_index_info(l.name)) = 1 AND (SELECT name FROM pragma_index_info(l.name)) = '${col}') >= 1`;
const all = (...parts: string[]) => `SELECT ${parts.join(' AND ')};`;

/**
 * Self-checking SQL Lab tasks for Databases 1, Week 2. Tasks 1–6 read the
 * bakery store database the SQL Lab loads (keys, junction table, NULL).
 * Tasks 7–12 build a small music-streaming schema next to it with DDL, so they
 * are checked by inspecting the schema the learner created. Task 14 is another
 * store query; tasks 13, 15, and 16 change the streaming schema built in 7–12.
 */
export const dbWeek2SqlTasks: SqlTask[] = [
  { id: 'db2-sql-1', title: L('Which columns form the key?', '¿Qué columnas forman la clave?', 'Quais colunas formam a chave?'),
    prompt: L('order_item is a junction table. List the names of the columns that make up its primary key.', 'order_item es una tabla intermedia. Lista los nombres de las columnas que forman su clave primaria.', 'order_item é uma tabela de junção. Liste os nomes das colunas que formam sua chave primária.'),
    hint: L("SELECT name FROM pragma_table_info('order_item') WHERE pk > 0;", "SELECT name FROM pragma_table_info('order_item') WHERE pk > 0;", "SELECT name FROM pragma_table_info('order_item') WHERE pk > 0;"),
    solution: "SELECT name FROM pragma_table_info('order_item') WHERE pk > 0;" },
  { id: 'db2-sql-2', title: L('Where do the foreign keys point?', '¿A dónde apuntan las claves foráneas?', 'Para onde apontam as chaves estrangeiras?'),
    prompt: L('For each foreign key of order_item, show the local column, the referenced table, and the referenced column (in that order).', 'Para cada clave foránea de order_item, muestra la columna local, la tabla referenciada y la columna referenciada (en ese orden).', 'Para cada chave estrangeira de order_item, mostre a coluna local, a tabela referenciada e a coluna referenciada (nessa ordem).'),
    hint: L('pragma_foreign_key_list(\'order_item\') has the columns "from", "table", and "to". Quote them with double quotes.', 'pragma_foreign_key_list(\'order_item\') tiene las columnas "from", "table" y "to". Escríbelas entre comillas dobles.', 'pragma_foreign_key_list(\'order_item\') tem as colunas "from", "table" e "to". Escreva-as entre aspas duplas.'),
    solution: 'SELECT "from", "table", "to" FROM pragma_foreign_key_list(\'order_item\');' },
  { id: 'db2-sql-3', title: L('Through the junction table', 'A través de la tabla intermedia', 'Pela tabela de junção'),
    prompt: L('For every row of order_item, show the order id, the product name, and the quantity.', 'Para cada fila de order_item, muestra el id del pedido, el nombre del producto y la cantidad.', 'Para cada linha de order_item, mostre o id do pedido, o nome do produto e a quantidade.'),
    hint: L('JOIN product ON product.product_id = order_item.product_id.', 'JOIN product ON product.product_id = order_item.product_id.', 'JOIN product ON product.product_id = order_item.product_id.'),
    solution: 'SELECT oi.order_id, p.name, oi.quantity FROM order_item oi JOIN product p ON p.product_id = oi.product_id;' },
  { id: 'db2-sql-4', title: L('Both sides of N:M', 'Ambos lados de N:M', 'Os dois lados de N:M'),
    prompt: L('Show the names of the customers who bought a Sourdough loaf, each name once.', 'Muestra los nombres de los clientes que compraron una Sourdough loaf, cada nombre una vez.', 'Mostre os nomes dos clientes que compraram uma Sourdough loaf, cada nome uma vez.'),
    hint: L('customer → orders → order_item → product, WHERE p.name = \'Sourdough loaf\', and SELECT DISTINCT.', 'customer → orders → order_item → product, WHERE p.name = \'Sourdough loaf\' y SELECT DISTINCT.', 'customer → orders → order_item → product, WHERE p.name = \'Sourdough loaf\' e SELECT DISTINCT.'),
    solution: "SELECT DISTINCT c.name FROM customer c JOIN orders o ON o.customer_id = c.customer_id JOIN order_item oi ON oi.order_id = o.order_id JOIN product p ON p.product_id = oi.product_id WHERE p.name = 'Sourdough loaf';" },
  { id: 'db2-sql-5', title: L('Customers with no orders', 'Clientes sin pedidos', 'Clientes sem pedidos'),
    prompt: L('Partial participation in action: show the names of customers who have never placed an order.', 'Participación parcial en acción: muestra los nombres de los clientes que nunca hicieron un pedido.', 'Participação parcial em ação: mostre os nomes dos clientes que nunca fizeram um pedido.'),
    hint: L('LEFT JOIN orders, then keep the rows where o.order_id IS NULL.', 'LEFT JOIN orders y luego conserva las filas donde o.order_id IS NULL.', 'LEFT JOIN orders e depois mantenha as linhas onde o.order_id IS NULL.'),
    solution: 'SELECT c.name FROM customer c LEFT JOIN orders o ON o.customer_id = c.customer_id WHERE o.order_id IS NULL;' },
  { id: 'db2-sql-6', title: L('Products never sold', 'Productos nunca vendidos', 'Produtos nunca vendidos'),
    prompt: L('Show the names of products that appear in no order_item row.', 'Muestra los nombres de los productos que no aparecen en ninguna fila de order_item.', 'Mostre os nomes dos produtos que não aparecem em nenhuma linha de order_item.'),
    hint: L('product LEFT JOIN order_item … WHERE oi.order_id IS NULL.', 'product LEFT JOIN order_item … WHERE oi.order_id IS NULL.', 'product LEFT JOIN order_item … WHERE oi.order_id IS NULL.'),
    solution: 'SELECT p.name FROM product p LEFT JOIN order_item oi ON oi.product_id = p.product_id WHERE oi.order_id IS NULL;' },
  { id: 'db2-sql-7', title: L('Create the artist table', 'Crea la tabla de artistas', 'Crie a tabela de artistas'),
    prompt: L('Start a music-streaming schema. Create artist with artist_id (integer primary key), name (required text), and country (optional text).', 'Empieza un esquema de streaming de música. Crea artist con artist_id (clave primaria entera), name (texto obligatorio) y country (texto opcional).', 'Comece um esquema de streaming de música. Crie artist com artist_id (chave primária inteira), name (texto obrigatório) e country (texto opcional).'),
    hint: L('CREATE TABLE artist (artist_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT);', 'CREATE TABLE artist (artist_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT);', 'CREATE TABLE artist (artist_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT);'),
    solution: 'CREATE TABLE artist (artist_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT);',
    verify: all(pkCol('artist', 'artist_id'), pkSize('artist', 1), notNull('artist', 'name'), "(SELECT COUNT(*) FROM pragma_table_info('artist') WHERE name = 'country') = 1") },
  { id: 'db2-sql-8', title: L('1:N with a foreign key', '1:N con una clave foránea', '1:N com uma chave estrangeira'),
    prompt: L('Each song is by exactly one artist; an artist has many songs. Create song with song_id (integer primary key), title (required), duration_s (integer), and artist_id: required, and a foreign key to artist.', 'Cada canción es de exactamente un artista; un artista tiene muchas canciones. Crea song con song_id (clave primaria entera), title (obligatorio), duration_s (entero) y artist_id: obligatorio y clave foránea a artist.', 'Cada música é de exatamente um artista; um artista tem muitas músicas. Crie song com song_id (chave primária inteira), title (obrigatório), duration_s (inteiro) e artist_id: obrigatório e chave estrangeira para artist.'),
    hint: L('artist_id INTEGER NOT NULL REFERENCES artist(artist_id)', 'artist_id INTEGER NOT NULL REFERENCES artist(artist_id)', 'artist_id INTEGER NOT NULL REFERENCES artist(artist_id)'),
    solution: 'CREATE TABLE song (song_id INTEGER PRIMARY KEY, title TEXT NOT NULL, duration_s INTEGER, artist_id INTEGER NOT NULL REFERENCES artist(artist_id));',
    verify: all(pkCol('song', 'song_id'), pkSize('song', 1), notNull('song', 'title'), notNull('song', 'artist_id'), fk('song', 'artist_id', 'artist')) },
  { id: 'db2-sql-9', title: L('An alternate key', 'Una clave alternativa', 'Uma chave alternativa'),
    prompt: L('Create listener with listener_id (integer primary key) and email, which is required and must be unique: it is an alternate key.', 'Crea listener con listener_id (clave primaria entera) y email, que es obligatorio y único: es una clave alternativa.', 'Crie listener com listener_id (chave primária inteira) e email, que é obrigatório e único: é uma chave alternativa.'),
    hint: L('email TEXT NOT NULL UNIQUE', 'email TEXT NOT NULL UNIQUE', 'email TEXT NOT NULL UNIQUE'),
    solution: 'CREATE TABLE listener (listener_id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);',
    verify: all(pkCol('listener', 'listener_id'), pkSize('listener', 1), notNull('listener', 'email'), unique('listener', 'email')) },
  { id: 'db2-sql-10', title: L('N:M with a junction table', 'N:M con una tabla intermedia', 'N:M com uma tabela de junção'),
    prompt: L('Listeners save many songs and a song is saved by many listeners. Create saved_song with listener_id and song_id (foreign keys to listener and song), saved_on (text), and a composite primary key on the pair.', 'Los oyentes guardan muchas canciones y una canción la guardan muchos oyentes. Crea saved_song con listener_id y song_id (claves foráneas a listener y song), saved_on (texto) y una clave primaria compuesta sobre la pareja.', 'Ouvintes salvam muitas músicas e uma música é salva por muitos ouvintes. Crie saved_song com listener_id e song_id (chaves estrangeiras para listener e song), saved_on (texto) e uma chave primária composta sobre o par.'),
    hint: L('… REFERENCES listener(listener_id), … REFERENCES song(song_id), …, PRIMARY KEY (listener_id, song_id)', '… REFERENCES listener(listener_id), … REFERENCES song(song_id), …, PRIMARY KEY (listener_id, song_id)', '… REFERENCES listener(listener_id), … REFERENCES song(song_id), …, PRIMARY KEY (listener_id, song_id)'),
    solution: 'CREATE TABLE saved_song (listener_id INTEGER REFERENCES listener(listener_id), song_id INTEGER REFERENCES song(song_id), saved_on TEXT, PRIMARY KEY (listener_id, song_id));',
    verify: all(pkSize('saved_song', 2), pkCol('saved_song', 'listener_id'), pkCol('saved_song', 'song_id'), fk('saved_song', 'listener_id', 'listener'), fk('saved_song', 'song_id', 'song')) },
  { id: 'db2-sql-11', title: L('1:1 with a shared key', '1:1 con una clave compartida', '1:1 com uma chave compartilhada'),
    prompt: L('Each listener has at most one profile, and each profile belongs to one listener. Create profile whose primary key listener_id is also a foreign key to listener, plus bio (text).', 'Cada oyente tiene a lo sumo un perfil y cada perfil pertenece a un oyente. Crea profile cuya clave primaria listener_id sea también clave foránea a listener, más bio (texto).', 'Cada ouvinte tem no máximo um perfil e cada perfil pertence a um ouvinte. Crie profile cuja chave primária listener_id seja também chave estrangeira para listener, mais bio (texto).'),
    hint: L('listener_id INTEGER PRIMARY KEY REFERENCES listener(listener_id)', 'listener_id INTEGER PRIMARY KEY REFERENCES listener(listener_id)', 'listener_id INTEGER PRIMARY KEY REFERENCES listener(listener_id)'),
    solution: 'CREATE TABLE profile (listener_id INTEGER PRIMARY KEY REFERENCES listener(listener_id), bio TEXT);',
    verify: all(pkSize('profile', 1), pkCol('profile', 'listener_id'), fk('profile', 'listener_id', 'listener')) },
  { id: 'db2-sql-12', title: L('Fill the schema in the right order', 'Llena el esquema en el orden correcto', 'Preencha o esquema na ordem certa'),
    prompt: L('Insert artist 1 "Nina Ríos"; songs 10 "Río abajo" (214 s) and 11 "Luz de mayo" (198 s), both by artist 1; listener 1 with email mia@example.com; and save both songs for listener 1. Do tasks 7–10 first. Parents first, or the foreign keys will refuse the rows.', 'Inserta el artista 1 "Nina Ríos"; las canciones 10 "Río abajo" (214 s) y 11 "Luz de mayo" (198 s), ambas del artista 1; el oyente 1 con correo mia@example.com; y guarda ambas canciones para el oyente 1. Haz antes las tareas 7–10. Primero los padres, o las claves foráneas rechazarán las filas.', 'Insira o artista 1 "Nina Ríos"; as músicas 10 "Río abajo" (214 s) e 11 "Luz de mayo" (198 s), ambas do artista 1; o ouvinte 1 com e-mail mia@example.com; e salve as duas músicas para o ouvinte 1. Faça antes as tarefas 7–10. Primeiro os pais, ou as chaves estrangeiras vão recusar as linhas.'),
    hint: L('Order: artist → song → listener → saved_song. Name the columns: INSERT INTO song (song_id, title, duration_s, artist_id) VALUES …', 'Orden: artist → song → listener → saved_song. Nombra las columnas: INSERT INTO song (song_id, title, duration_s, artist_id) VALUES …', 'Ordem: artist → song → listener → saved_song. Nomeie as colunas: INSERT INTO song (song_id, title, duration_s, artist_id) VALUES …'),
    solution: "CREATE TABLE IF NOT EXISTS artist (artist_id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT);\nCREATE TABLE IF NOT EXISTS song (song_id INTEGER PRIMARY KEY, title TEXT NOT NULL, duration_s INTEGER, artist_id INTEGER NOT NULL REFERENCES artist(artist_id));\nCREATE TABLE IF NOT EXISTS listener (listener_id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);\nCREATE TABLE IF NOT EXISTS saved_song (listener_id INTEGER REFERENCES listener(listener_id), song_id INTEGER REFERENCES song(song_id), saved_on TEXT, PRIMARY KEY (listener_id, song_id));\nINSERT INTO artist (artist_id, name) VALUES (1, 'Nina Ríos');\nINSERT INTO song (song_id, title, duration_s, artist_id) VALUES (10, 'Río abajo', 214, 1), (11, 'Luz de mayo', 198, 1);\nINSERT INTO listener (listener_id, email) VALUES (1, 'mia@example.com');\nINSERT INTO saved_song (listener_id, song_id, saved_on) VALUES (1, 10, '2026-11-01'), (1, 11, '2026-11-02');",
    verify: "SELECT (SELECT COUNT(*) FROM saved_song ss JOIN listener l ON l.listener_id = ss.listener_id JOIN song s ON s.song_id = ss.song_id JOIN artist a ON a.artist_id = s.artist_id WHERE l.email = 'mia@example.com' AND a.name = 'Nina Ríos' AND s.song_id IN (10, 11)) = 2 AND (SELECT COUNT(*) FROM song WHERE song_id = 10 AND title = 'Río abajo' AND duration_s = 214) = 1 AND (SELECT COUNT(*) FROM song WHERE song_id = 11 AND title = 'Luz de mayo' AND duration_s = 198) = 1;" },
  { id: 'db2-sql-13', title: L('Change the structure', 'Cambia la estructura', 'Altere a estrutura'),
    prompt: L('The service now tags songs with a genre. Add a text column genre to song without losing any row.', 'El servicio ahora etiqueta las canciones con un género. Agrega una columna de texto genre a song sin perder ninguna fila.', 'O serviço agora marca as músicas com um gênero. Adicione uma coluna de texto genre a song sem perder nenhuma linha.'),
    hint: L('ALTER TABLE song ADD COLUMN …', 'ALTER TABLE song ADD COLUMN …', 'ALTER TABLE song ADD COLUMN …'),
    solution: 'ALTER TABLE song ADD COLUMN genre TEXT;',
    verify: "SELECT (SELECT COUNT(*) FROM pragma_table_info('song') WHERE name = 'genre') = 1 AND (SELECT COUNT(*) FROM song) >= 2;" },
  { id: 'db2-sql-14', title: L('Aliases, order, and a limit', 'Alias, orden y un límite', 'Apelidos, ordem e um limite'),
    prompt: L('From the store, show the three most expensive products, most expensive first, with the columns renamed to item and cost.', 'De la tienda, muestra los tres productos más caros, el más caro primero, con las columnas renombradas como item y cost.', 'Da loja, mostre os três produtos mais caros, o mais caro primeiro, com as colunas renomeadas para item e cost.'),
    hint: L('SELECT name AS item, price AS cost FROM product ORDER BY … DESC LIMIT 3;', 'SELECT name AS item, price AS cost FROM product ORDER BY … DESC LIMIT 3;', 'SELECT name AS item, price AS cost FROM product ORDER BY … DESC LIMIT 3;'),
    solution: 'SELECT name AS item, price AS cost FROM product ORDER BY price DESC LIMIT 3;', ordered: true },
  { id: 'db2-sql-15', title: L('Update two fields of one row', 'Actualiza dos campos de una fila', 'Atualize dois campos de uma linha'),
    prompt: L('Song 11 was remastered: set its title to "Luz de mayo (remaster)" and its duration_s to 205. Song 10 must not change.', 'La canción 11 fue remasterizada: cambia su título a "Luz de mayo (remaster)" y su duration_s a 205. La canción 10 no debe cambiar.', 'A música 11 foi remasterizada: mude o título para "Luz de mayo (remaster)" e duration_s para 205. A música 10 não pode mudar.'),
    hint: L("UPDATE song SET title = '…', duration_s = 205 WHERE song_id = 11;", "UPDATE song SET title = '…', duration_s = 205 WHERE song_id = 11;", "UPDATE song SET title = '…', duration_s = 205 WHERE song_id = 11;"),
    solution: "UPDATE song SET title = 'Luz de mayo (remaster)', duration_s = 205 WHERE song_id = 11;",
    verify: "SELECT (SELECT COUNT(*) FROM song WHERE song_id = 11 AND title = 'Luz de mayo (remaster)' AND duration_s = 205) = 1 AND (SELECT COUNT(*) FROM song WHERE song_id = 10 AND title = 'Río abajo' AND duration_s = 214) = 1;" },
  { id: 'db2-sql-16', title: L('Delete only what you mean', 'Borra solo lo que quieres', 'Apague só o que você quer'),
    prompt: L('Mia (listener 1) un-saves song 10. Delete only that row; her save of song 11 must stay.', 'Mia (oyente 1) deja de guardar la canción 10. Borra solo esa fila; su guardado de la canción 11 debe quedar.', 'Mia (ouvinte 1) deixa de salvar a música 10. Apague só essa linha; o salvamento da música 11 precisa ficar.'),
    hint: L('DELETE FROM saved_song WHERE listener_id = 1 AND song_id = 10;', 'DELETE FROM saved_song WHERE listener_id = 1 AND song_id = 10;', 'DELETE FROM saved_song WHERE listener_id = 1 AND song_id = 10;'),
    solution: 'DELETE FROM saved_song WHERE listener_id = 1 AND song_id = 10;',
    verify: 'SELECT (SELECT COUNT(*) FROM saved_song WHERE listener_id = 1 AND song_id = 10) = 0 AND (SELECT COUNT(*) FROM saved_song WHERE listener_id = 1 AND song_id = 11) = 1;' },
];
