import { describe, expect, it } from 'vitest';
import initSqlJs from 'sql.js';
import { STORE_SEED_SQL, sameResult } from './storeDb';
import { sqlTasks } from '../content/db1-week1/sqlTasks';
import { dbWeek1Labs } from '../content/db1-week1/labs';

async function fresh() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.exec(STORE_SEED_SQL);
  return db;
}

describe('campus store database', () => {
  it('loads with four tables and sample rows', async () => {
    const db = await fresh();
    const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")[0].values.flat();
    expect(tables).toEqual(['customer', 'order_item', 'orders', 'product']);
    expect(db.exec('SELECT COUNT(*) FROM product')[0].values[0][0]).toBe(5);
  });

  it('enforces foreign keys and CHECK constraints', async () => {
    const db = await fresh();
    expect(() => db.exec("INSERT INTO orders VALUES (200, 99, '2026-03-01')")).toThrow(/FOREIGN KEY/);
    expect(() => db.exec('UPDATE product SET price = -5 WHERE product_id = 10')).toThrow(/CHECK/);
  });

  it('can solve every SQL Lab task with its reference solution', async () => {
    for (const task of sqlTasks) {
      const db = await fresh();
      const res = db.exec(task.solution);
      if (task.verify) {
        expect(db.exec(task.verify)[0].values[0][0], task.id).toBe(1);
      } else {
        expect(res.length, task.id).toBeGreaterThan(0);
        expect(sameResult(res[res.length - 1], res[res.length - 1], task.ordered)).toBe(true);
      }
    }
  });

  it('runs every SQL lab step without errors except the ones meant to fail', async () => {
    const meantToFail = new Set(['db1-l3-s1', 'db1-l3-s2']);
    for (const lab of dbWeek1Labs.filter((l) => l.kind === 'sql')) {
      for (const step of lab.steps) {
        const db = await fresh();
        const run = () => db.exec(step.commands.join('\n'));
        if (meantToFail.has(step.id)) expect(run, step.id).toThrow();
        else expect(run, step.id).not.toThrow();
      }
    }
  });
});
