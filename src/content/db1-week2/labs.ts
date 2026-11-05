import type { Lab, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/**
 * Labs for Databases 1, Week 2. Steps of the first lab build on each other in
 * one SQL Lab session; the second lab's steps each start from the campus store.
 */
export const dbWeek2Labs: Lab[] = [
  {
    id: 'db2-lab-1-streaming', kind: 'sql', level: 2, minutes: 40,
    title: L('Build a streaming schema with 1:N and N:M', 'Construye un esquema de streaming con 1:N y N:M', 'Construa um esquema de streaming com 1:N e N:M'),
    goal: L('Create related tables with primary and foreign keys, fill them parents first, and join them through a junction table. Run the steps in order without resetting.', 'Crear tablas relacionadas con claves primarias y foráneas, llenarlas empezando por los padres y unirlas a través de una tabla intermedia. Ejecuta los pasos en orden sin reiniciar.', 'Criar tabelas relacionadas com chaves primárias e estrangeiras, preenchê-las começando pelos pais e juntá-las por uma tabela de junção. Execute os passos em ordem sem reiniciar.'),
    steps: [
      { id: 'db2-l1-s1', title: L('Parent tables', 'Tablas padre', 'Tabelas pai'),
        commands: ['CREATE TABLE artist (\n  artist_id INTEGER PRIMARY KEY,\n  name      TEXT NOT NULL\n);', 'CREATE TABLE listener (\n  listener_id INTEGER PRIMARY KEY,\n  email       TEXT NOT NULL UNIQUE\n);'],
        expected: L('Two new tables appear in the schema panel next to the store tables.', 'Aparecen dos tablas nuevas en el panel del esquema junto a las de la tienda.', 'Duas tabelas novas aparecem no painel do esquema ao lado das tabelas da loja.') },
      { id: 'db2-l1-s2', title: L('1:N: songs point to artists', '1:N: las canciones apuntan a los artistas', '1:N: as músicas apontam para os artistas'),
        commands: ['CREATE TABLE song (\n  song_id    INTEGER PRIMARY KEY,\n  title      TEXT NOT NULL,\n  duration_s INTEGER CHECK (duration_s BETWEEN 1 AND 3600),\n  artist_id  INTEGER NOT NULL REFERENCES artist(artist_id)\n);'],
        expected: L('song has a foreign key on the "many" side and a CHECK that enforces the domain of duration_s.', 'song tiene una clave foránea en el lado "muchos" y un CHECK que impone el dominio de duration_s.', 'song tem uma chave estrangeira no lado "muitos" e um CHECK que impõe o domínio de duration_s.') },
      { id: 'db2-l1-s3', title: L('N:M: the junction table', 'N:M: la tabla intermedia', 'N:M: a tabela de junção'),
        commands: ['CREATE TABLE saved_song (\n  listener_id INTEGER REFERENCES listener(listener_id) ON DELETE CASCADE,\n  song_id     INTEGER REFERENCES song(song_id) ON DELETE CASCADE,\n  saved_on    TEXT NOT NULL,\n  PRIMARY KEY (listener_id, song_id)\n);'],
        expected: L('A table of pairs with a composite primary key. Deleting a listener or a song removes their saves.', 'Una tabla de parejas con clave primaria compuesta. Borrar un oyente o una canción elimina sus guardados.', 'Uma tabela de pares com chave primária composta. Apagar um ouvinte ou uma música remove seus salvamentos.') },
      { id: 'db2-l1-s4', title: L('Fill parents first', 'Llena primero los padres', 'Preencha primeiro os pais'),
        commands: ["INSERT INTO artist VALUES (1, 'Nina Ríos'), (2, 'Los Faros');", "INSERT INTO song VALUES (10, 'Río abajo', 214, 1), (11, 'Luz de mayo', 198, 1), (12, 'Puerto viejo', 251, 2);", "INSERT INTO listener VALUES (1, 'mia@example.com'), (2, 'teo@example.com');", "INSERT INTO saved_song VALUES (1, 10, '2026-11-01'), (1, 12, '2026-11-02'), (2, 10, '2026-11-03');"],
        expected: L('All rows go in because every foreign key already has its parent.', 'Todas las filas entran porque cada clave foránea ya tiene su padre.', 'Todas as linhas entram porque cada chave estrangeira já tem seu pai.') },
      { id: 'db2-l1-s5', title: L('Join through the junction', 'Une a través de la tabla intermedia', 'Junte pela tabela de junção'),
        commands: ['SELECT l.email, s.title, a.name AS artist\nFROM saved_song ss\nJOIN listener l ON l.listener_id = ss.listener_id\nJOIN song s     ON s.song_id = ss.song_id\nJOIN artist a   ON a.artist_id = s.artist_id\nORDER BY l.email, s.title;'],
        expected: L('Three rows: Mia saved two songs, Teo saved one. "Río abajo" appears for both listeners: that is N:M.', 'Tres filas: Mia guardó dos canciones y Teo una. "Río abajo" aparece para ambos oyentes: eso es N:M.', 'Três linhas: Mia salvou duas músicas e Teo uma. "Río abajo" aparece para os dois ouvintes: isso é N:M.') },
      { id: 'db2-l1-s6', title: L('Try to break it', 'Intenta romperlo', 'Tente quebrar'),
        commands: ["INSERT INTO saved_song VALUES (1, 10, '2026-11-09');"],
        expected: L('An error: UNIQUE constraint failed. The composite key stops Mia from saving the same song twice.', 'Un error: falla la restricción UNIQUE. La clave compuesta impide que Mia guarde dos veces la misma canción.', 'Um erro: falha a restrição UNIQUE. A chave composta impede que Mia salve a mesma música duas vezes.') },
    ],
  },
  {
    id: 'db2-lab-2-integrity', kind: 'sql', level: 2, minutes: 30,
    title: L('Integrity rules in action', 'Reglas de integridad en acción', 'Regras de integridade em ação'),
    goal: L('Watch the DBMS refuse orphans and duplicates, find optional relationships with NULL, and see CASCADE at work. Reset the database before each step.', 'Ver cómo el SGBD rechaza huérfanos y duplicados, encontrar relaciones opcionales con NULL y ver CASCADE en acción. Reinicia la base de datos antes de cada paso.', 'Ver o SGBD recusar órfãos e duplicados, encontrar relacionamentos opcionais com NULL e ver o CASCADE em ação. Reinicie o banco de dados antes de cada passo.'),
    steps: [
      { id: 'db2-l2-s1', title: L('An orphan line', 'Una línea huérfana', 'Uma linha órfã'),
        commands: ['INSERT INTO order_item (order_id, product_id, quantity) VALUES (101, 999, 1);'],
        expected: L('An error: FOREIGN KEY constraint failed, because product 999 does not exist (referential integrity).', 'Un error: falla la restricción FOREIGN KEY, porque el producto 999 no existe (integridad referencial).', 'Um erro: falha a restrição FOREIGN KEY, porque o produto 999 não existe (integridade referencial).') },
      { id: 'db2-l2-s2', title: L('Delete a parent with children', 'Borra un padre con hijos', 'Apague um pai com filhos'),
        commands: ['DELETE FROM customer WHERE customer_id = 1;'],
        expected: L('An error: Ana has orders, and the default rule refuses to leave them orphaned (like RESTRICT).', 'Un error: Ana tiene pedidos y la regla predeterminada se niega a dejarlos huérfanos (como RESTRICT).', 'Um erro: Ana tem pedidos e a regra padrão se recusa a deixá-los órfãos (como RESTRICT).') },
      { id: 'db2-l2-s3', title: L('A duplicate pair', 'Una pareja duplicada', 'Um par duplicado'),
        commands: ['INSERT INTO order_item (order_id, product_id, quantity) VALUES (101, 10, 3);'],
        expected: L('An error: UNIQUE constraint failed. Order 101 already has a line for product 10; change its quantity instead.', 'Un error: falla la restricción UNIQUE. El pedido 101 ya tiene una línea del producto 10; cambia su cantidad en su lugar.', 'Um erro: falha a restrição UNIQUE. O pedido 101 já tem uma linha do produto 10; altere a quantidade em vez disso.') },
      { id: 'db2-l2-s4', title: L('Optional participation', 'Participación opcional', 'Participação opcional'),
        commands: ['SELECT c.name, o.order_id\nFROM customer c\nLEFT JOIN orders o ON o.customer_id = c.customer_id\nORDER BY c.name;'],
        expected: L('Mateo shows NULL for order_id: a customer may exist without orders (partial participation).', 'Mateo muestra NULL en order_id: un cliente puede existir sin pedidos (participación parcial).', 'Mateo mostra NULL em order_id: um cliente pode existir sem pedidos (participação parcial).') },
      { id: 'db2-l2-s5', title: L('CASCADE at work', 'CASCADE en acción', 'CASCADE em ação'),
        commands: ['CREATE TABLE playlist (playlist_id INTEGER PRIMARY KEY, name TEXT NOT NULL);', 'CREATE TABLE playlist_entry (\n  playlist_id INTEGER REFERENCES playlist(playlist_id) ON DELETE CASCADE,\n  position    INTEGER,\n  title       TEXT NOT NULL,\n  PRIMARY KEY (playlist_id, position)\n);', "INSERT INTO playlist VALUES (1, 'Road trip');", "INSERT INTO playlist_entry VALUES (1, 1, 'Río abajo'), (1, 2, 'Puerto viejo');", 'DELETE FROM playlist WHERE playlist_id = 1;', 'SELECT COUNT(*) AS entries_left FROM playlist_entry;'],
        expected: L('entries_left = 0: deleting the playlist also deleted its entries. playlist_entry is a weak entity: (playlist_id, position).', 'entries_left = 0: borrar la lista también borró sus entradas. playlist_entry es una entidad débil: (playlist_id, position).', 'entries_left = 0: apagar a playlist também apagou suas entradas. playlist_entry é uma entidade fraca: (playlist_id, position).') },
    ],
  },
  {
    id: 'db2-lab-3-model', kind: 'design', level: 3, minutes: 50,
    title: L('From a real scenario to a logical model', 'De un escenario real a un modelo lógico', 'De um cenário real a um modelo lógico'),
    goal: L('Model the vet clinic in the Design Studio, then write its full logical model by hand with the seven mapping steps.', 'Modelar la clínica veterinaria en el Estudio de diseño y luego escribir a mano su modelo lógico completo con los siete pasos de transformación.', 'Modelar a clínica veterinária no Estúdio de projeto e depois escrever à mão o modelo lógico completo com os sete passos de transformação.'),
    steps: [
      { id: 'db2-l3-s1', title: L('Read the brief like a designer', 'Lee el enunciado como diseñador', 'Leia o enunciado como projetista'),
        commands: [],
        expected: L('In the Design Studio, open Vet clinic. Underline nouns (entity candidates), circle verbs (relationships), and mark derived facts such as age.', 'En el Estudio de diseño, abre Clínica veterinaria. Subraya los sustantivos (candidatos a entidad), encierra los verbos (relaciones) y marca los datos derivados como la edad.', 'No Estúdio de projeto, abra Clínica veterinária. Sublinhe os substantivos (candidatos a entidade), circule os verbos (relacionamentos) e marque os dados derivados, como a idade.') },
      { id: 'db2-l3-s2', title: L('Build and check the design', 'Construye y verifica el diseño', 'Construa e verifique o projeto'),
        commands: [],
        expected: L('Add Owner, Pet, Vet, Visit, and the weak Dose; choose keys (Dose: pet_id + dose_no); connect the 1:N relationships. Check until all items are green.', 'Agrega Dueño, Mascota, Veterinario, Visita y la débil Dosis; elige claves (Dosis: pet_id + dose_no); conecta las relaciones 1:N. Verifica hasta que todo esté en verde.', 'Adicione Tutor, Pet, Veterinário, Visita e a fraca Dose; escolha as chaves (Dose: pet_id + dose_no); ligue os relacionamentos 1:N. Verifique até tudo ficar verde.') },
      { id: 'db2-l3-s3', title: L('Write the logical model', 'Escribe el modelo lógico', 'Escreva o modelo lógico'),
        commands: [],
        expected: L('On paper, write each relation with PK, FK, UNIQUE, and NOT NULL. Then extend it: owners give several phones, and each vet has one consulting room (1:1). Compare with the code in lesson 10.', 'En papel, escribe cada relación con PK, FK, UNIQUE y NOT NULL. Luego amplíalo: los dueños dan varios teléfonos y cada veterinario tiene un consultorio (1:1). Compara con el código de la lección 10.', 'No papel, escreva cada relação com PK, FK, UNIQUE e NOT NULL. Depois amplie: tutores informam vários telefones e cada veterinário tem um consultório (1:1). Compare com o código da lição 10.') },
      { id: 'db2-l3-s4', title: L('Export and redraw', 'Exporta y vuelve a dibujar', 'Exporte e redesenhe'),
        commands: [],
        expected: L('Export to draw.io, check the crow\'s-foot ends, and fix the minimums (Pet must have an Owner: || next to Owner). Then try Bike sharing and School timetable, which include 1:1 relationships.', 'Exporta a draw.io, revisa los extremos de pata de gallo y corrige los mínimos (Mascota debe tener Dueño: || junto a Dueño). Luego prueba Bicicletas compartidas y Horario escolar, que incluyen relaciones 1:1.', 'Exporte para o draw.io, confira as pontas de pé de galinha e corrija os mínimos (Pet precisa ter Tutor: || junto a Tutor). Depois tente Bicicletas compartilhadas e Horário escolar, que incluem relacionamentos 1:1.') },
    ],
  },
  {
    id: 'db2-lab-4-method', kind: 'design', level: 3, minutes: 45,
    title: L('Model a community garden from its description', 'Modela una huerta comunitaria a partir de su descripción', 'Modele uma horta comunitária a partir da descrição'),
    goal: L('Apply the five-step method to an original scenario, including a derived monthly value and a specialisation.', 'Aplicar el método de cinco pasos a un escenario original, con un valor mensual derivado y una especialización.', 'Aplicar o método de cinco passos a um cenário original, com um valor mensal derivado e uma especialização.'),
    steps: [
      { id: 'db2-l4-s1', title: L('Context and requirements', 'Contexto y requisitos', 'Contexto e requisitos'),
        commands: [],
        expected: L('Scenario: "A community garden rents plots, numbered within each zone, to members (id, name, several phones). Each rental records member, plot, start date, and monthly fee. Members are gardeners, volunteers, or both; a volunteer also logs hours. Tools (id, name) are lent to members, each loan with a date. The board wants the rent collected each month." Write the context in one sentence and at least five numbered requirements.', 'Escenario: "Una huerta comunitaria alquila parcelas, numeradas dentro de cada zona, a socios (id, nombre, varios teléfonos). Cada alquiler registra socio, parcela, fecha de inicio y cuota mensual. Los socios son hortelanos, voluntarios o ambos; un voluntario además registra horas. Las herramientas (id, nombre) se prestan a los socios, cada préstamo con una fecha. La directiva quiere lo recaudado por alquileres cada mes." Escribe el contexto en una frase y al menos cinco requisitos numerados.', 'Cenário: "Uma horta comunitária aluga canteiros, numerados dentro de cada zona, a sócios (id, nome, vários telefones). Cada aluguel registra sócio, canteiro, data de início e mensalidade. Os sócios são hortelões, voluntários ou ambos; um voluntário também registra horas. Ferramentas (id, nome) são emprestadas aos sócios, cada empréstimo com uma data. A diretoria quer o valor arrecadado com aluguéis a cada mês." Escreva o contexto em uma frase e pelo menos cinco requisitos numerados.') },
      { id: 'db2-l4-s2', title: L('Entities and attributes', 'Entidades y atributos', 'Entidades e atributos'),
        commands: [],
        expected: L('Entities: ZONE, PLOT (weak: zone_id + plot_no), MEMBER (phones multivalued) with subtypes GARDENER and VOLUNTEER (overlapping, total), RENTAL, TOOL, TOOL_LOAN. The rent collected each month is derived: the SUM of the fees of the rentals active that month, never stored.', 'Entidades: ZONE, PLOT (débil: zone_id + plot_no), MEMBER (phones multivaluado) con subtipos GARDENER y VOLUNTEER (solapada, total), RENTAL, TOOL, TOOL_LOAN. Lo recaudado cada mes es derivado: la SUM de las cuotas de los alquileres activos ese mes, nunca se guarda.', 'Entidades: ZONE, PLOT (fraca: zone_id + plot_no), MEMBER (phones multivalorado) com subtipos GARDENER e VOLUNTEER (sobreposta, total), RENTAL, TOOL, TOOL_LOAN. O valor arrecadado a cada mês é derivado: a SUM das mensalidades dos aluguéis ativos naquele mês, nunca guardado.') },
      { id: 'db2-l4-s3', title: L('Relationships and tables', 'Relaciones y tablas', 'Relacionamentos e tabelas'),
        commands: [],
        expected: L('Draw it in crow\'s foot: ZONE ||—o< PLOT, MEMBER ||—o< RENTAL >o—|| PLOT, MEMBER ||—o< TOOL_LOAN >o—|| TOOL. Map it with the seven rules plus option A for the hierarchy, then tick off every requirement.', 'Dibújalo en pata de gallo: ZONE ||—o< PLOT, MEMBER ||—o< RENTAL >o—|| PLOT, MEMBER ||—o< TOOL_LOAN >o—|| TOOL. Transfórmalo con las siete reglas más la opción A para la jerarquía y luego marca cada requisito.', 'Desenhe em pé de galinha: ZONE ||—o< PLOT, MEMBER ||—o< RENTAL >o—|| PLOT, MEMBER ||—o< TOOL_LOAN >o—|| TOOL. Transforme com as sete regras mais a opção A para a hierarquia e depois marque cada requisito.') },
    ],
  },
];
