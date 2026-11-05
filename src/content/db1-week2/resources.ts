import type { ExternalResource, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const checked = '2026-11-04';

/** External resources for Databases 1, Week 2. `verifiedOn` = the link answered on that date. */
export const dbWeek2Resources: ExternalResource[] = [
  { id: 'db2-r-ibm-history', title: 'IBM: The relational database (history)', url: 'https://www.ibm.com/history/relational-database', kind: 'article', verifiedOn: checked,
    note: L('How Codd\'s 1970 idea went from research to products, told by the company where he worked.', 'Cómo la idea de Codd de 1970 pasó de la investigación a los productos, contado por la empresa donde trabajaba.', 'Como a ideia de Codd de 1970 passou da pesquisa aos produtos, contado pela empresa onde ele trabalhava.') },
  { id: 'db2-r-ibm-rdb', title: 'IBM: What is a relational database?', url: 'https://www.ibm.com/think/topics/relational-databases', kind: 'article', verifiedOn: checked,
    note: L('A plain overview of tables, keys, and relationships.', 'Un panorama sencillo de tablas, claves y relaciones.', 'Um panorama simples de tabelas, chaves e relacionamentos.') },
  { id: 'db2-r-wiki-relational', title: 'Wikipedia: Relational model', url: 'https://en.wikipedia.org/wiki/Relational_model', kind: 'article', verifiedOn: checked,
    note: L('Relations, tuples, attributes, domains, and keys, with the formal terms.', 'Relaciones, tuplas, atributos, dominios y claves, con los términos formales.', 'Relações, tuplas, atributos, domínios e chaves, com os termos formais.') },
  { id: 'db2-r-wiki-relational-es', title: 'Wikipedia: Modelo relacional', url: 'https://es.wikipedia.org/wiki/Modelo_relacional', kind: 'article', verifiedOn: checked,
    note: L('The same topic in Spanish.', 'El mismo tema en español.', 'O mesmo tema em espanhol.') },
  { id: 'db2-r-wiki-relational-pt', title: 'Wikipedia: Modelo relacional (português)', url: 'https://pt.wikipedia.org/wiki/Modelo_relacional', kind: 'article', verifiedOn: checked,
    note: L('The same topic in Portuguese.', 'El mismo tema en portugués.', 'O mesmo tema em português.') },
  { id: 'db2-r-wiki-er', title: 'Wikipedia: Entity–relationship model', url: 'https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model', kind: 'article', verifiedOn: checked,
    note: L('Chen notation, crow\'s foot, cardinality, and participation side by side.', 'Notación de Chen, pata de gallo, cardinalidad y participación lado a lado.', 'Notação de Chen, pé de galinha, cardinalidade e participação lado a lado.') },
  { id: 'db2-r-wiki-candidate', title: 'Wikipedia: Candidate key', url: 'https://en.wikipedia.org/wiki/Candidate_key', kind: 'article', verifiedOn: checked,
    note: L('Superkeys and minimal keys, with small examples.', 'Superclaves y claves mínimas, con ejemplos pequeños.', 'Superchaves e chaves mínimas, com exemplos pequenos.') },
  { id: 'db2-r-wiki-hierarchical', title: 'Wikipedia: Hierarchical database model', url: 'https://en.wikipedia.org/wiki/Hierarchical_database_model', kind: 'article', verifiedOn: checked,
    note: L('The tree-shaped model that came before relational databases.', 'El modelo en forma de árbol anterior a las bases relacionales.', 'O modelo em forma de árvore anterior aos bancos relacionais.') },
  { id: 'db2-r-wiki-network', title: 'Wikipedia: Network model', url: 'https://en.wikipedia.org/wiki/Network_model', kind: 'article', verifiedOn: checked,
    note: L('The pointer-based model standardised by CODASYL.', 'El modelo basado en punteros estandarizado por CODASYL.', 'O modelo baseado em ponteiros padronizado pelo CODASYL.') },
  { id: 'db2-r-sqlite-fk', title: 'SQLite: Foreign key support', url: 'https://www.sqlite.org/foreignkeys.html', kind: 'tutorial', verifiedOn: checked,
    note: L('Foreign keys, ON DELETE actions, and why SQLite needs PRAGMA foreign_keys = ON.', 'Claves foráneas, acciones ON DELETE y por qué SQLite necesita PRAGMA foreign_keys = ON.', 'Chaves estrangeiras, ações ON DELETE e por que o SQLite precisa de PRAGMA foreign_keys = ON.') },
  { id: 'db2-r-sqlite-create', title: 'SQLite: CREATE TABLE', url: 'https://www.sqlite.org/lang_createtable.html', kind: 'tutorial', verifiedOn: checked,
    note: L('The full syntax of PRIMARY KEY, UNIQUE, NOT NULL, CHECK, and REFERENCES.', 'La sintaxis completa de PRIMARY KEY, UNIQUE, NOT NULL, CHECK y REFERENCES.', 'A sintaxe completa de PRIMARY KEY, UNIQUE, NOT NULL, CHECK e REFERENCES.') },
  { id: 'db2-r-pg-constraints', title: 'PostgreSQL documentation: Constraints', url: 'https://www.postgresql.org/docs/current/ddl-constraints.html', kind: 'tutorial', verifiedOn: checked,
    note: L('Clear examples of every constraint, including RESTRICT, CASCADE, and SET NULL.', 'Ejemplos claros de cada restricción, incluidas RESTRICT, CASCADE y SET NULL.', 'Exemplos claros de cada restrição, incluindo RESTRICT, CASCADE e SET NULL.') },
  { id: 'db2-r-drawio', title: 'draw.io (diagrams.net)', url: 'https://app.diagrams.net/', kind: 'tutorial', verifiedOn: checked,
    note: L('Free diagram editor with Chen and crow\'s-foot shapes; opens the Design Studio export.', 'Editor de diagramas gratuito con formas de Chen y pata de gallo; abre lo exportado desde el Estudio de diseño.', 'Editor de diagramas gratuito com formas de Chen e pé de galinha; abre a exportação do Estúdio de projeto.') },
];
