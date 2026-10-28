import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
  } catch {
    return false;
  }
}

/**
 * Databases hero: a flat file with repeated customer data, then the same data
 * split by a DBMS into two related tables joined by a key. Loops gently; with
 * reduced motion it shows the final, related tables.
 */
export function DataHeroDemo() {
  const { locale } = useI18n();
  const w = (en: string, es: string, pt: string) => ({ en, es, pt })[locale];
  const reduced = useMemo(reducedMotion, []);
  const [phase, setPhase] = useState(reduced ? 2 : 0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setPhase((p) => (p + 1) % 3), phase === 2 ? 5200 : 3200);
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  const rows = [
    ['101', 'Ana', 'ana@example.com', w('Notebook', 'Cuaderno', 'Caderno')],
    ['102', 'Luis', 'luis@example.com', 'USB'],
    ['103', 'Ana', 'ana@example.com', w('Bottle', 'Botella', 'Garrafa')],
  ];

  return (
    <figure className="data-demo" aria-label={w('Demo: from a flat file to related tables', 'Demostración: de un archivo plano a tablas relacionadas', 'Demonstração: de um arquivo plano a tabelas relacionadas')}>
      <div className={`data-panel flat ${phase === 0 ? 'is-on' : phase === 1 ? 'is-fading' : ''}`}>
        <p className="data-cap">{w('Flat file: repeated data', 'Archivo plano: datos repetidos', 'Arquivo plano: dados repetidos')}</p>
        <table className="data-table">
          <thead><tr><th>{w('order', 'pedido', 'pedido')}</th><th>{w('customer', 'cliente', 'cliente')}</th><th>email</th><th>{w('product', 'producto', 'produto')}</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                <td className={r[1] === 'Ana' ? 'dup' : ''}>{r[1]}</td>
                <td className={r[1] === 'Ana' ? 'dup' : ''}>{r[2]}</td>
                <td>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`data-panel related ${phase === 2 ? 'is-on' : ''}`}>
        <p className="data-cap">{w('DBMS: tables related by a key', 'SGBD: tablas relacionadas por una clave', 'SGBD: tabelas relacionadas por uma chave')}</p>
        <div className="data-pair">
          <table className="data-table">
            <caption>{w('CUSTOMER', 'CLIENTE', 'CLIENTE')}</caption>
            <thead><tr><th className="pk">id 🔑</th><th>{w('name', 'nombre', 'nome')}</th></tr></thead>
            <tbody><tr><td className="pk">1</td><td>Ana</td></tr><tr><td className="pk">2</td><td>Luis</td></tr></tbody>
          </table>
          <span className="data-link" aria-hidden="true">1 ── N</span>
          <table className="data-table">
            <caption>{w('ORDER', 'PEDIDO', 'PEDIDO')}</caption>
            <thead><tr><th>id</th><th className="fk">{w('customer_id', 'id_cliente', 'id_cliente')} ↗</th></tr></thead>
            <tbody><tr><td>101</td><td className="fk">1</td></tr><tr><td>102</td><td className="fk">2</td></tr><tr><td>103</td><td className="fk">1</td></tr></tbody>
          </table>
        </div>
      </div>
      <figcaption className="faint">{w('Live demo: the DBMS stores Ana only once.', 'Demo en vivo: el SGBD guarda a Ana una sola vez.', 'Demo ao vivo: o SGBD guarda a Ana uma única vez.')}</figcaption>
    </figure>
  );
}
