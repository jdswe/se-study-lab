import type { Localized, Story } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Animated mini stories for Databases 1, Week 2. */
export const dbWeek2Stories: Story[] = [
  {
    id: 'db2-story-orphan', lessonId: 'db2-l4-integrity',
    title: L('The bike that did not exist', 'La bicicleta que no existía', 'A bicicleta que não existia'),
    stations: [
      { label: L('Rider app', 'App del ciclista', 'App do ciclista'), glyph: '◉' },
      { label: L('TRIP table', 'Tabla TRIP', 'Tabela TRIP'), glyph: '▤' },
      { label: L('DBMS check', 'Control del SGBD', 'Verificação do SGBD'), glyph: '✓' },
      { label: L('BIKE table', 'Tabla BIKE', 'Tabela BIKE'), glyph: '▦' },
    ],
    scenes: [
      { at: 0, caption: L('Leo scans a sticker that says bike 57 and taps "Start trip".', 'Leo escanea una etiqueta que dice bicicleta 57 y toca "Iniciar viaje".', 'Leo escaneia um adesivo que diz bicicleta 57 e toca em "Iniciar viagem".') },
      { at: 1, caption: L('The app tries to insert a trip with bike_id = 57.', 'La app intenta insertar un viaje con bike_id = 57.', 'O app tenta inserir uma viagem com bike_id = 57.') },
      { at: 2, caption: L('Before saving, the DBMS checks the foreign key.', 'Antes de guardar, el SGBD revisa la clave foránea.', 'Antes de salvar, o SGBD confere a chave estrangeira.') },
      { at: 3, caption: L('There is no bike 57: the sticker was a prank. The insert is refused.', 'No hay bicicleta 57: la etiqueta era una broma. La inserción se rechaza.', 'Não existe bicicleta 57: o adesivo era uma pegadinha. A inserção é recusada.'), mood: 'alert' },
      { at: 0, caption: L('Leo sees "Unknown bike" and scans the real one. No orphan trip was ever stored.', 'Leo ve "Bicicleta desconocida" y escanea la real. Nunca se guardó un viaje huérfano.', 'Leo vê "Bicicleta desconhecida" e escaneia a verdadeira. Nenhuma viagem órfã foi guardada.'), mood: 'ok' },
    ],
  },
  {
    id: 'db2-story-junction', lessonId: 'db2-l5-relationships',
    title: L('One song, many playlists', 'Una canción, muchas listas', 'Uma música, muitas playlists'),
    stations: [
      { label: L('LISTENER', 'LISTENER', 'LISTENER'), glyph: '☺' },
      { label: L('SAVED_SONG', 'SAVED_SONG', 'SAVED_SONG'), glyph: '⇄' },
      { label: L('SONG', 'SONG', 'SONG'), glyph: '♪' },
    ],
    scenes: [
      { at: 0, caption: L('Mia saves "Luz de mayo". So do 4,000 other listeners.', 'Mia guarda "Luz de mayo". También otros 4.000 oyentes.', 'Mia salva "Luz de mayo". Outros 4.000 ouvintes também.') },
      { at: 2, caption: L('The song row cannot hold 4,000 listener ids: a cell holds one value.', 'La fila de la canción no puede guardar 4.000 ids de oyentes: una celda guarda un valor.', 'A linha da música não pode guardar 4.000 ids de ouvintes: uma célula guarda um valor.'), mood: 'alert' },
      { at: 1, caption: L('Instead, each save is one row in the junction table: (listener_id, song_id, saved_on).', 'En cambio, cada guardado es una fila de la tabla intermedia: (listener_id, song_id, saved_on).', 'Em vez disso, cada salvamento é uma linha da tabela de junção: (listener_id, song_id, saved_on).') },
      { at: 1, caption: L('The composite key stops Mia from saving the same song twice.', 'La clave compuesta impide que Mia guarde la misma canción dos veces.', 'A chave composta impede que Mia salve a mesma música duas vezes.'), mood: 'ok' },
    ],
  },
];
