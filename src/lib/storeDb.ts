/**
 * The campus-store sample database used by the SQL Lab, with real constraints
 * so learners can see integrity rules fire. SQLite dialect.
 */
export const STORE_SEED_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE customer (
  customer_id INTEGER PRIMARY KEY,
  name        VARCHAR(60) NOT NULL,
  city        VARCHAR(40)
);

CREATE TABLE product (
  product_id INTEGER PRIMARY KEY,
  name       VARCHAR(60) NOT NULL,
  price      INTEGER NOT NULL CHECK (price >= 0),
  stock      INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE orders (
  order_id    INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customer(customer_id),
  order_date  DATE NOT NULL
);

CREATE TABLE order_item (
  order_id   INTEGER NOT NULL REFERENCES orders(order_id),
  product_id INTEGER NOT NULL REFERENCES product(product_id),
  quantity   INTEGER NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO customer VALUES (1, 'Ana', 'Bogotá'), (2, 'Luis', 'Lima'), (3, 'Sofía', 'Santiago'), (4, 'Mateo', 'Ciudad de México');
INSERT INTO product VALUES (10, 'Notebook', 8000, 40), (20, 'USB drive', 35000, 6), (30, 'Water bottle', 18000, 15), (40, 'Backpack', 95000, 3), (50, 'Headphones', 60000, 0);
INSERT INTO orders VALUES (101, 1, '2026-03-02'), (102, 2, '2026-03-03'), (103, 1, '2026-03-05'), (104, 3, '2026-03-06');
INSERT INTO order_item VALUES (101, 10, 2), (101, 20, 1), (102, 30, 1), (103, 40, 1), (104, 10, 5), (104, 30, 2);
`;

export type Cell = string | number | null | Uint8Array;

export interface ResultSet {
  columns: string[];
  values: Cell[][];
}

/** Normalises a result set for comparison: values as strings, optional row sorting. */
function canon(rs: ResultSet, ordered: boolean): string[] {
  const rows = rs.values.map((r) => JSON.stringify(r.map((v) => (v === null ? null : String(v)))));
  return ordered ? rows : [...rows].sort();
}

/** True when two result sets hold the same rows (in the same order if `ordered`). Column names are ignored. */
export function sameResult(a: ResultSet | undefined, b: ResultSet | undefined, ordered = false): boolean {
  if (!a || !b) return false;
  if (a.columns.length !== b.columns.length) return false;
  const x = canon(a, ordered);
  const y = canon(b, ordered);
  return x.length === y.length && x.every((v, i) => v === y[i]);
}

/** Splits a script into statements for display purposes; the engine itself runs the full script. */
export function isWriteStatement(sql: string): boolean {
  return /^\s*(insert|update|delete|create|drop|alter|begin|commit|rollback)/i.test(sql);
}
