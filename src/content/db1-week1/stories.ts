import type { Localized, Story } from '../types';

const L = (en: string, es: string): Localized => ({ en, es });

/** Animated mini stories for Databases 1, Week 1. */
export const dbWeek1Stories: Story[] = [
  {
    id: 'db1-story-files', lessonId: 'db1-l1-files-to-databases',
    title: L('Elena changes her phone number', 'Elena cambia su número de teléfono'),
    stations: [
      { label: L('Elena', 'Elena'), glyph: 'E' },
      { label: L('Bakery counter file', 'Archivo del mostrador de la panadería'), glyph: '▤' },
      { label: L('Delivery file', 'Archivo de entregas'), glyph: '▤' },
      { label: L('DBMS', 'SGBD'), glyph: '▦' },
    ],
    scenes: [
      { at: 0, caption: L('Elena tells the bakery she has a new phone number.', 'Elena le informa a la panadería que tiene un número nuevo.') },
      { at: 1, caption: L('The counter updates its file. The delivery list never gets the change.', 'El mostrador actualiza su archivo. La lista de entregas no recibe el cambio.') },
      { at: 2, caption: L('A delivery driver still calls the old number. The files now disagree.', 'Un repartidor sigue llamando al número anterior. Los archivos ya no coinciden.'), mood: 'alert' },
      { at: 3, caption: L('With a DBMS, Elena\'s phone is stored once. Every bakery program reads the same value.', 'Con un SGBD, el teléfono de Elena se guarda una sola vez. Todos los programas de la panadería leen el mismo valor.'), mood: 'ok' },
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
      { at: 0, caption: L('Rafael orders two cinnamon rolls. The sale starts a transaction.', 'Rafael pide dos rollitos de canela. La venta inicia una transacción.') },
      { at: 1, caption: L('Order 205 is created.', 'Se crea el pedido 205.') },
      { at: 2, caption: L('The two cinnamon rolls are added to the order.', 'Se agregan los dos rollitos de canela al pedido.') },
      { at: 3, caption: L('Stock update fails: the disk is full. Everything rolls back.', 'Falla la actualización del inventario: el disco está lleno. Todo se revierte.'), mood: 'alert' },
      { at: 0, caption: L('The cashier retries once space is freed.', 'El cajero reintenta cuando se libera espacio.') },
      { at: 4, caption: L('All three steps succeed together: COMMIT. Never half a sale.', 'Los tres pasos funcionan juntos: COMMIT. Nunca media venta.'), mood: 'ok' },
    ],
  },
  {
    id: 'db1-story-concurrency', lessonId: 'db1-l7-integrity-transactions',
    title: L('Two bakers, one sourdough loaf', 'Dos panaderos, una hogaza de masa madre'),
    stations: [
      { label: L('Cashier A', 'Cajero A'), glyph: 'A' },
      { label: L('DBMS', 'SGBD'), glyph: '▦' },
      { label: L('Cashier B', 'Cajero B'), glyph: 'B' },
    ],
    scenes: [
      { at: 0, caption: L('Stock shows 1 sourdough loaf. Baker A starts a sale.', 'El inventario muestra 1 hogaza de masa madre. El panadero A inicia una venta.') },
      { at: 2, caption: L('At the same moment, Baker B starts a sale of the same loaf.', 'En el mismo instante, el panadero B inicia una venta de la misma hogaza.') },
      { at: 1, caption: L('The DBMS locks the row: Baker A goes first, Baker B waits.', 'El SGBD bloquea la fila: el panadero A va primero y el panadero B espera.') },
      { at: 0, caption: L('Baker A commits. Stock is now 0.', 'El panadero A confirma. El inventario queda en 0.'), mood: 'ok' },
      { at: 2, caption: L('Baker B continues and sees 0 in stock: the sale is refused, not doubled.', 'El panadero B continúa y ve 0 en inventario: la venta se rechaza, no se duplica.'), mood: 'alert' },
    ],
  },
];
