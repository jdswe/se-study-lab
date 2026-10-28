import type { Localized, Story } from '../types';

const L = (en: string, es: string): Localized => ({ en, es });

/** Animated mini stories for Databases 1, Week 1. */
export const dbWeek1Stories: Story[] = [
  {
    id: 'db1-story-files', lessonId: 'db1-l1-files-to-databases',
    title: L('Ana changes her phone number', 'Ana cambia su número de teléfono'),
    stations: [
      { label: L('Ana', 'Ana'), glyph: 'A' },
      { label: L('Sales file', 'Archivo de ventas'), glyph: '▤' },
      { label: L('Billing file', 'Archivo de facturación'), glyph: '▤' },
      { label: L('DBMS', 'SGBD'), glyph: '▦' },
    ],
    scenes: [
      { at: 0, caption: L('Ana tells the store she has a new phone number.', 'Ana le dice a la tienda que tiene un número nuevo.') },
      { at: 1, caption: L('Sales updates its own file. Billing never hears about it.', 'Ventas actualiza su propio archivo. Facturación nunca se entera.') },
      { at: 2, caption: L('Billing still calls the old number. The files now disagree.', 'Facturación sigue llamando al número viejo. Los archivos ya no coinciden.'), mood: 'alert' },
      { at: 3, caption: L('With a DBMS, Ana\'s phone is stored once. Every program reads the same value.', 'Con un SGBD, el teléfono de Ana se guarda una vez. Todos los programas leen el mismo valor.'), mood: 'ok' },
    ],
  },
  {
    id: 'db1-story-transaction', lessonId: 'db1-l7-integrity-transactions',
    title: L('All or nothing', 'Todo o nada'),
    stations: [
      { label: L('BEGIN', 'BEGIN'), glyph: '▶' },
      { label: L('Order', 'Pedido'), glyph: '#' },
      { label: L('Item', 'Artículo'), glyph: '+' },
      { label: L('Stock', 'Inventario'), glyph: '−' },
      { label: L('COMMIT', 'COMMIT'), glyph: '✓' },
    ],
    scenes: [
      { at: 0, caption: L('Luis buys a USB drive. The sale starts a transaction.', 'Luis compra una memoria USB. La venta inicia una transacción.') },
      { at: 1, caption: L('Order 104 is created.', 'Se crea el pedido 104.') },
      { at: 2, caption: L('The USB drive is added to the order.', 'Se agrega la memoria USB al pedido.') },
      { at: 3, caption: L('Stock update fails: the disk is full. Everything rolls back.', 'Falla la actualización del inventario: el disco está lleno. Todo se revierte.'), mood: 'alert' },
      { at: 0, caption: L('The cashier retries once space is freed.', 'El cajero reintenta cuando se libera espacio.') },
      { at: 4, caption: L('All three steps succeed together: COMMIT. Never half a sale.', 'Los tres pasos funcionan juntos: COMMIT. Nunca media venta.'), mood: 'ok' },
    ],
  },
  {
    id: 'db1-story-concurrency', lessonId: 'db1-l7-integrity-transactions',
    title: L('Two cashiers, one USB drive', 'Dos cajeros, una memoria USB'),
    stations: [
      { label: L('Cashier A', 'Cajero A'), glyph: 'A' },
      { label: L('DBMS', 'SGBD'), glyph: '▦' },
      { label: L('Cashier B', 'Cajero B'), glyph: 'B' },
    ],
    scenes: [
      { at: 0, caption: L('Stock shows 1 USB drive. Cashier A starts a sale.', 'El inventario muestra 1 memoria USB. El cajero A inicia una venta.') },
      { at: 2, caption: L('At the same moment, Cashier B starts a sale of the same drive.', 'En el mismo instante, el cajero B inicia una venta de la misma memoria.') },
      { at: 1, caption: L('The DBMS locks the row: A goes first, B waits.', 'El SGBD bloquea la fila: A va primero y B espera.') },
      { at: 0, caption: L('A commits. Stock is now 0.', 'A confirma. El inventario queda en 0.'), mood: 'ok' },
      { at: 2, caption: L('B continues and sees 0 in stock: the sale is refused, not doubled.', 'B continúa y ve 0 en inventario: la venta se rechaza, no se duplica.'), mood: 'alert' },
    ],
  },
];
