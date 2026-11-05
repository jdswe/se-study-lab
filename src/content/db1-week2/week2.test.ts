import { describe, expect, it } from 'vitest';
import initSqlJs from 'sql.js';
import { STORE_SEED_SQL, sameResult } from '../../lib/storeDb';
import { checkDesign, solutionDesign } from '../../lib/erDesign';
import { sqlTasks as week1Tasks } from '../db1-week1/sqlTasks';
import { studioScenarios as week1Scenarios } from '../db1-week1/studio';
import { dbWeek2SqlTasks } from './sqlTasks';
import { dbWeek2StudioScenarios } from './studio';
import { dbWeek2Labs } from './labs';

async function fresh() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.exec(STORE_SEED_SQL);
  return db;
}

describe('Databases 1, Week 2: SQL Lab tasks', () => {
  it('uses task ids that do not clash with Week 1 (progress is stored per task id)', () => {
    const ids = [...week1Tasks, ...dbWeek2SqlTasks].map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('computes every query task\'s expected result on one shared database, as the SQL Lab does', async () => {
    const db = await fresh();
    for (const task of dbWeek2SqlTasks.filter((t) => !t.verify)) {
      const res = db.exec(task.solution);
      expect(res.length, task.id).toBeGreaterThan(0);
      expect(res[res.length - 1].values.length, task.id).toBeGreaterThan(0);
    }
  });

  it('gives the expected answers for the store queries', async () => {
    const db = await fresh();
    const rows = (id: string) => db.exec(dbWeek2SqlTasks.find((t) => t.id === id)!.solution)[0].values.map((r) => r.join('|')).sort();
    expect(rows('db2-sql-1')).toEqual(['order_id', 'product_id']);
    expect(rows('db2-sql-2')).toEqual(['order_id|orders|order_id', 'product_id|product|product_id']);
    expect(rows('db2-sql-4')).toEqual(['Elena', 'Inés']);
    expect(rows('db2-sql-5')).toEqual(['Tomás']);
    expect(rows('db2-sql-6')).toEqual(['Oat cookie']);
    const top = db.exec(dbWeek2SqlTasks.find((t) => t.id === 'db2-sql-14')!.solution)[0];
    expect(top.columns).toEqual(['item', 'cost']);
    expect(top.values.map((r) => r[0])).toEqual(['Lemon tart', 'Sourdough loaf', 'Rye baguette']);
  });

  it('accepts every self-contained reference solution on a fresh database', async () => {
    // Tasks 13, 15, and 16 change rows and columns created in tasks 7–12; they are checked in order below.
    const dependsOnEarlier = new Set(['db2-sql-13', 'db2-sql-15', 'db2-sql-16']);
    for (const task of dbWeek2SqlTasks.filter((t) => !dependsOnEarlier.has(t.id))) {
      const db = await fresh();
      const res = db.exec(task.solution);
      if (task.verify) expect(db.exec(task.verify)[0].values[0][0], task.id).toBe(1);
      else expect(sameResult(res[res.length - 1], res[res.length - 1], task.ordered), task.id).toBe(true);
    }
  });

  it('accepts the DDL tasks when done in order in one session, as a learner would', async () => {
    const db = await fresh();
    for (const task of dbWeek2SqlTasks.filter((t) => t.verify)) {
      db.exec(task.solution);
      expect(db.exec(task.verify!)[0].values[0][0], task.id).toBe(1);
    }
  });

  it('rejects DDL that misses the asked-for keys', async () => {
    const verifyOf = (id: string) => dbWeek2SqlTasks.find((t) => t.id === id)!.verify!;
    const cases: [string, string][] = [
      ['db2-sql-8', 'CREATE TABLE song (song_id INTEGER PRIMARY KEY, title TEXT NOT NULL, duration_s INTEGER, artist_id INTEGER NOT NULL);'],
      ['db2-sql-9', 'CREATE TABLE listener (listener_id INTEGER PRIMARY KEY, email TEXT NOT NULL);'],
      ['db2-sql-10', 'CREATE TABLE saved_song (listener_id INTEGER REFERENCES listener(listener_id), song_id INTEGER REFERENCES song(song_id), saved_on TEXT, PRIMARY KEY (listener_id));'],
      ['db2-sql-11', 'CREATE TABLE profile (profile_id INTEGER PRIMARY KEY, listener_id INTEGER REFERENCES listener(listener_id), bio TEXT);'],
    ];
    for (const [id, ddl] of cases) {
      const db = await fresh();
      db.exec(ddl);
      expect(db.exec(verifyOf(id))[0].values[0][0], id).toBe(0);
    }
  });

  it('accepts a bare REFERENCES without a column name', async () => {
    const db = await fresh();
    db.exec('CREATE TABLE song (song_id INTEGER PRIMARY KEY, title TEXT NOT NULL, duration_s INTEGER, artist_id INTEGER NOT NULL REFERENCES artist);');
    expect(db.exec(dbWeek2SqlTasks.find((t) => t.id === 'db2-sql-8')!.verify!)[0].values[0][0]).toBe(1);
  });
});

describe('Databases 1, Week 2: SQL labs', () => {
  it('runs the streaming lab in order in one session, and only the last step fails', async () => {
    const lab = dbWeek2Labs.find((l) => l.id === 'db2-lab-1-streaming')!;
    const db = await fresh();
    for (const step of lab.steps) {
      const run = () => db.exec(step.commands.join('\n'));
      if (step.id === 'db2-l1-s6') expect(run, step.id).toThrow(/UNIQUE/);
      else expect(run, step.id).not.toThrow();
    }
    const joined = db.exec(lab.steps.find((s) => s.id === 'db2-l1-s5')!.commands.join('\n'))[0];
    expect(joined.values).toHaveLength(3);
  });

  it('runs each integrity lab step on a fresh store, failing only where intended', async () => {
    const lab = dbWeek2Labs.find((l) => l.id === 'db2-lab-2-integrity')!;
    const meantToFail = new Set(['db2-l2-s1', 'db2-l2-s2', 'db2-l2-s3']);
    for (const step of lab.steps) {
      const db = await fresh();
      const run = () => db.exec(step.commands.join('\n'));
      if (meantToFail.has(step.id)) expect(run, step.id).toThrow();
      else expect(run, step.id).not.toThrow();
    }
    const db = await fresh();
    const cascade = db.exec(lab.steps.find((s) => s.id === 'db2-l2-s5')!.commands.join('\n'));
    expect(cascade[cascade.length - 1].values[0][0]).toBe(0);
  });
});

describe('Databases 1, Week 2: Design Studio scenarios', () => {
  it('uses scenario ids that do not clash with Week 1', () => {
    const ids = [...week1Scenarios, ...dbWeek2StudioScenarios].map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('accepts the model solution of every scenario', () => {
    for (const s of dbWeek2StudioScenarios) {
      expect(checkDesign(solutionDesign(s), s).every((i) => i.ok), s.id).toBe(true);
    }
  });

  it('has valid primary keys and relations that point at real entities', () => {
    for (const s of dbWeek2StudioScenarios) {
      const ids = new Set(s.entities.map((e) => e.id));
      for (const e of s.entities) expect((e.keyOptions ?? e.attributes).includes(e.pk), `${s.id}.${e.id}`).toBe(true);
      for (const r of s.solution) {
        expect(ids.has(r.from) && ids.has(r.to), `${s.id} ${r.from}-${r.to}`).toBe(true);
        expect(s.entities.find((e) => e.id === r.from)?.distractor, r.from).toBeUndefined();
      }
    }
  });

  it('covers 1:1 and suggests a junction table for a direct N:M', () => {
    expect(dbWeek2StudioScenarios.some((s) => s.solution.some((r) => r.card === '1:1'))).toBe(true);
    const streaming = dbWeek2StudioScenarios.find((s) => s.id === 'streaming')!;
    const d = solutionDesign(streaming);
    d.entities = d.entities.filter((e) => e !== 'saved_song');
    d.relations = [{ from: 'artist', to: 'album', card: '1:N' }, { from: 'album', to: 'song', card: '1:N' }, { from: 'listener', to: 'song', card: 'N:M' }];
    expect(checkDesign(d, streaming).some((i) => i.kind === 'needsJunction' && i.entity === 'saved_song')).toBe(true);
  });
});
