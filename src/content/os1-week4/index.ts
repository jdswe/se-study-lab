import type { Activity, ExternalResource, Flashcard, Lab, Localized, Question, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { os1Week4Lessons } from './lessons';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

const l1 = 'os1w4-l1-hierarchy';
const l2 = 'os1w4-l2-contiguous';
const l3 = 'os1w4-l3-paging';
const l4 = 'os1w4-l4-virtual-memory';
const l5 = 'os1w4-l5-page-replacement';

const flashcards: Flashcard[] = [
  { id: 'os1w4-c1', lessonId: l1, kind: 'concept', front: L('Cache hit and miss', 'Acierto y fallo de caché', 'Acerto e falha de cache'), back: L('Hit: data found in cache, fast. Miss: load it from RAM, slower.', 'Acierto: el dato está en caché, rápido. Fallo: traerlo de la RAM, más lento.', 'Acerto: dado no cache, rápido. Falha: buscar na RAM, mais lento.') },
  { id: 'os1w4-c2', lessonId: l1, kind: 'distinction', front: L('Von Neumann vs Harvard', 'Von Neumann vs Harvard', 'Von Neumann vs Harvard'), back: L('One shared memory for code and data, or two separate memories read at once.', 'Una memoria compartida para código y datos, o dos memorias separadas que se leen a la vez.', 'Uma memória compartilhada para código e dados, ou duas memórias separadas lidas ao mesmo tempo.') },
  { id: 'os1w4-c3', lessonId: l2, kind: 'distinction', front: L('Logical vs physical address', 'Dirección lógica vs física', 'Endereço lógico vs físico'), back: L('What the program uses vs the real place in RAM; the MMU translates.', 'La que usa el programa vs el lugar real en la RAM; la MMU traduce.', 'O que o programa usa vs o lugar real na RAM; a MMU traduz.') },
  { id: 'os1w4-c4', lessonId: l2, kind: 'concept', front: L('First, best, worst fit', 'Primer, mejor, peor ajuste', 'Primeiro, melhor, pior ajuste'), back: L('First hole big enough; smallest big enough; largest.', 'El primer hueco que alcanza; el más pequeño que alcanza; el más grande.', 'O primeiro buraco que cabe; o menor que cabe; o maior.') },
  { id: 'os1w4-c5', lessonId: l2, kind: 'distinction', front: L('External vs internal fragmentation', 'Fragmentación externa vs interna', 'Fragmentação externa vs interna'), back: L('Unusable holes between blocks vs waste inside a block.', 'Huecos inútiles entre bloques vs desperdicio dentro de un bloque.', 'Buracos inúteis entre blocos vs desperdício dentro de um bloco.') },
  { id: 'os1w4-c6', lessonId: l3, kind: 'concept', front: L('Page translation', 'Traducción de páginas', 'Tradução de páginas'), back: L('$p = \\lfloor A/S \\rfloor$, $d = A \\bmod S$, physical $= f \\cdot S + d$.', '$p = \\lfloor A/S \\rfloor$, $d = A \\bmod S$, física $= f \\cdot S + d$.', '$p = \\lfloor A/S \\rfloor$, $d = A \\bmod S$, físico $= f \\cdot S + d$.') },
  { id: 'os1w4-c7', lessonId: l3, kind: 'concept', front: L('TLB', 'TLB', 'TLB'), back: L('A small hardware cache of recent page translations.', 'Una pequeña caché de hardware con traducciones de página recientes.', 'Um pequeno cache de hardware com traduções de página recentes.') },
  { id: 'os1w4-c8', lessonId: l4, kind: 'concept', front: L('Page fault', 'Fallo de página', 'Falta de página'), back: L('Access to a page not in RAM: block, load it from disk, update the table, retry.', 'Acceso a una página fuera de la RAM: bloquear, traerla del disco, actualizar la tabla, reintentar.', 'Acesso a uma página fora da RAM: bloquear, trazê-la do disco, atualizar a tabela, repetir.') },
  { id: 'os1w4-c9', lessonId: l4, kind: 'concept', front: L('Thrashing', 'Hiperpaginación', 'Ultrapaginação'), back: L('Constant page faults because processes have fewer frames than they need.', 'Fallos de página constantes porque los procesos tienen menos marcos de los que necesitan.', 'Faltas de página constantes porque os processos têm menos quadros do que precisam.') },
  { id: 'os1w4-c10', lessonId: l4, kind: 'command', front: L('`free -h`, `swapon --show`, `vmstat 1`', '`free -h`, `swapon --show`, `vmstat 1`', '`free -h`, `swapon --show`, `vmstat 1`'), back: L('RAM and swap summary; swap areas; live stats with swap-in/out (`si`/`so`).', 'Resumen de RAM e intercambio; áreas de intercambio; estadísticas en vivo con entradas y salidas (`si`/`so`).', 'Resumo de RAM e troca; áreas de troca; estatísticas ao vivo com entradas e saídas (`si`/`so`).') },
  { id: 'os1w4-c11', lessonId: l5, kind: 'concept', front: L('Belady\'s anomaly', 'Anomalía de Belady', 'Anomalia de Belady'), back: L('FIFO may cause more faults with more frames; LRU and OPT never do.', 'FIFO puede causar más fallos con más marcos; LRU y OPT nunca.', 'FIFO pode causar mais faltas com mais quadros; LRU e OPT nunca.') },
];

const questions: Question[] = [
  { id: 'os1w4-q1', type: 'fill-blank', lessonId: l1,
    prompt: L('Hit rate 0.8, cache 2 ns, RAM 50 ns. The effective access time is ___ ns.', 'Tasa de aciertos 0,8, caché 2 ns, RAM 50 ns. El tiempo efectivo de acceso es ___ ns.', 'Taxa de acerto 0,8, cache 2 ns, RAM 50 ns. O tempo efetivo de acesso é ___ ns.'),
    accepted: ['12'],
    explanation: L('$0.8 \\times 2 + 0.2 \\times 52 = 1.6 + 10.4 = 12$.', '$0{,}8 \\times 2 + 0{,}2 \\times 52 = 1{,}6 + 10{,}4 = 12$.', '$0{,}8 \\times 2 + 0{,}2 \\times 52 = 1{,}6 + 10{,}4 = 12$.') },
  { id: 'os1w4-q2', type: 'multiple-choice', lessonId: l2,
    prompt: L('Holes 100, 500, 200, 300 KB. A 210 KB request under best fit goes to:', 'Huecos 100, 500, 200, 300 KB. Un pedido de 210 KB con mejor ajuste va a:', 'Buracos 100, 500, 200, 300 KB. Um pedido de 210 KB com melhor ajuste vai para:'),
    options: [L('the 300 KB hole', 'el hueco de 300 KB', 'o buraco de 300 KB'), L('the 500 KB hole', 'el hueco de 500 KB', 'o buraco de 500 KB'), L('the 200 KB hole', 'el hueco de 200 KB', 'o buraco de 200 KB')],
    answer: 0,
    explanation: L('300 is the smallest hole $\\ge 210$; 200 is too small, 500 is what first fit and worst fit pick.', '300 es el hueco más pequeño $\\ge 210$; 200 no alcanza y 500 es el que eligen primer y peor ajuste.', '300 é o menor buraco $\\ge 210$; 200 não cabe e 500 é o que primeiro e pior ajuste escolhem.') },
  { id: 'os1w4-q3', type: 'code', lessonId: l3,
    prompt: L('Page size 2048. What is the physical address?', 'Tamaño de página 2048. ¿Cuál es la dirección física?', 'Tamanho de página 2048. Qual é o endereço físico?'),
    code: 'logical address = 4500\npage table: page 0 -> frame 6\n            page 1 -> frame 3\n            page 2 -> frame 8',
    options: [L('16788', '16788', '16788'), L('12692', '12692', '12692'), L('4504', '4504', '4504')],
    answer: 0,
    explanation: L('$\\lfloor 4500/2048 \\rfloor = 2$, offset $4500 - 4096 = 404$; frame 8: $8 \\times 2048 + 404 = 16788$.', '$\\lfloor 4500/2048 \\rfloor = 2$, desplazamiento $4500 - 4096 = 404$; marco 8: $8 \\times 2048 + 404 = 16788$.', '$\\lfloor 4500/2048 \\rfloor = 2$, deslocamento $4500 - 4096 = 404$; quadro 8: $8 \\times 2048 + 404 = 16788$.') },
  { id: 'os1w4-q4', type: 'true-false', lessonId: l3,
    prompt: L('True or false: paging has no fragmentation of any kind.', 'Verdadero o falso: la paginación no tiene ningún tipo de fragmentación.', 'Verdadeiro ou falso: a paginação não tem nenhum tipo de fragmentação.'),
    options: TF, answer: 1,
    explanation: L('False: no external fragmentation, but the last page of a process is usually partly empty (internal).', 'Falso: no hay fragmentación externa, pero la última página de un proceso suele quedar a medias (interna).', 'Falso: não há fragmentação externa, mas a última página de um processo costuma ficar pela metade (interna).') },
  { id: 'os1w4-q5', type: 'scenario', lessonId: l4,
    prompt: L('A video editor on an 8 GB PC slows to a crawl while the disk light stays on. `vmstat` shows `si` and `so` in the thousands. Best explanation?', 'Un editor de video en una PC de 8 GB se arrastra con la luz del disco siempre encendida. `vmstat` muestra `si` y `so` en miles. ¿Mejor explicación?', 'Um editor de vídeo em um PC de 8 GB fica lentíssimo com a luz do disco sempre acesa. `vmstat` mostra `si` e `so` na casa dos milhares. Melhor explicação?'),
    options: [L('Thrashing: too little RAM for the working set', 'Hiperpaginación: poca RAM para el conjunto de trabajo', 'Ultrapaginação: pouca RAM para o conjunto de trabalho'), L('The CPU cache is full', 'La caché de CPU está llena', 'O cache da CPU está cheio'), L('A deadlock', 'Un interbloqueo', 'Um impasse')],
    answer: 0,
    explanation: L('Pages are constantly swapped in and out; more RAM or a smaller workload fixes it.', 'Las páginas entran y salen del intercambio sin parar; más RAM o menos carga lo corrigen.', 'As páginas entram e saem da troca sem parar; mais RAM ou menos carga resolvem.') },
  { id: 'os1w4-q6', type: 'matching', lessonId: l5,
    prompt: L('Match each algorithm with whom it evicts.', 'Une cada algoritmo con a quién expulsa.', 'Ligue cada algoritmo a quem ele expulsa.'),
    left: [L('FIFO', 'FIFO', 'FIFO'), L('LRU', 'LRU', 'LRU'), L('OPT', 'OPT', 'OPT')],
    right: [L('The page loaded longest ago', 'La página cargada hace más tiempo', 'A página carregada há mais tempo'), L('The page used longest ago', 'La página usada hace más tiempo', 'A página usada há mais tempo'), L('The page needed furthest in the future', 'La página que se necesitará más tarde', 'A página que será necessária mais tarde')],
    answer: [0, 1, 2],
    explanation: L('Loaded vs used is the key difference between FIFO and LRU.', 'Cargada vs usada es la diferencia clave entre FIFO y LRU.', 'Carregada vs usada é a diferença-chave entre FIFO e LRU.') },
  { id: 'os1w4-q7', type: 'fill-blank', lessonId: l5,
    prompt: L('String 1 2 3 1 4 2 with 3 frames. FIFO causes ___ faults.', 'Cadena 1 2 3 1 4 2 con 3 marcos. FIFO causa ___ fallos.', 'Cadeia 1 2 3 1 4 2 com 3 quadros. FIFO causa ___ faltas.'),
    accepted: ['4'],
    explanation: L('1, 2, 3 fault; 1 hits; 4 faults and evicts 1 (the oldest); 2 hits. Total 4.','1, 2, 3 fallan; 1 acierta; 4 expulsa a 1 (fallo); 2 acierta. Total 4.', '1, 2, 3 falham; 1 acerta; 4 expulsa o 1 (falta); 2 acerta. Total 4.') },
];

const activities: Activity[] = [
  { id: 'os1w4-act-fault', kind: 'order', lessonId: l4,
    title: L('Handling a page fault', 'Atender un fallo de página', 'Tratando uma falta de página'),
    prompt: L('Order the steps.', 'Ordena los pasos.', 'Ordene os passos.'),
    items: [L('The CPU finds the valid bit off and traps', 'La CPU ve el bit de validez apagado y lanza una trampa', 'A CPU vê o bit de validade desligado e dispara uma armadilha'), L('The OS picks a free frame or evicts a page', 'El SO elige un marco libre o expulsa una página', 'O SO escolhe um quadro livre ou expulsa uma página'), L('The page is read from disk', 'La página se lee del disco', 'A página é lida do disco'), L('The page table is updated', 'Se actualiza la tabla de páginas', 'A tabela de páginas é atualizada'), L('The instruction is restarted', 'Se reinicia la instrucción', 'A instrução é reiniciada')],
    explanation: L('The process waits during the disk read, so the CPU runs others meanwhile.', 'El proceso espera durante la lectura del disco, así que la CPU atiende a otros mientras tanto.', 'O processo espera durante a leitura do disco, então a CPU atende outros enquanto isso.') },
  { id: 'os1w4-act-fill', kind: 'code-fill', lessonId: l3,
    title: L('Translate an address', 'Traduce una dirección', 'Traduza um endereço'),
    prompt: L('Page size 1024; logical 3100; page 3 is in frame 5.', 'Tamaño de página 1024; lógica 3100; la página 3 está en el marco 5.', 'Tamanho de página 1024; lógico 3100; a página 3 está no quadro 5.'),
    template: 'page   = 3100 / 1024 = {0}\noffset = 3100 - 3072 = {1}\nphys   = 5 * 1024 + offset = {2}',
    blanks: ['3', '28', '5148'],
    explanation: L('$5 \\times 1024 + 28 = 5148$.', '$5 \\times 1024 + 28 = 5148$.', '$5 \\times 1024 + 28 = 5148$.') },
  { id: 'os1w4-act-classify', kind: 'classify', lessonId: l2,
    title: L('Which fragmentation?', '¿Qué fragmentación?', 'Qual fragmentação?'),
    prompt: L('Sort each situation.', 'Clasifica cada situación.', 'Classifique cada situação.'),
    buckets: [L('External', 'Externa', 'Externa'), L('Internal', 'Interna', 'Interna')],
    items: [
      { text: L('Many small holes between processes', 'Muchos huecos pequeños entre procesos', 'Muitos buracos pequenos entre processos'), bucket: 0 },
      { text: L('A half-empty last page', 'Una última página a medio llenar', 'Uma última página pela metade'), bucket: 1 },
      { text: L('Enough free memory in total, but no hole big enough', 'Hay memoria libre total suficiente, pero ningún hueco alcanza', 'Há memória livre total suficiente, mas nenhum buraco cabe'), bucket: 0 },
      { text: L('A 64 KB block given for a 40 KB request', 'Un bloque de 64 KB para un pedido de 40 KB', 'Um bloco de 64 KB para um pedido de 40 KB'), bucket: 1 },
    ],
    explanation: L('External is between blocks; internal is inside one.', 'La externa está entre bloques; la interna, dentro de uno.', 'A externa fica entre blocos; a interna, dentro de um.') },
];

const labs: Lab[] = [
  { id: 'os1w4-lab1', kind: 'shell', level: 1, minutes: 35,
    title: L('Read memory on a live system', 'Lee la memoria de un sistema en vivo', 'Leia a memória de um sistema ao vivo'),
    goal: L('Inspect RAM, swap, page size, per-process memory, and page faults, on Linux and on Windows.', 'Inspeccionar RAM, intercambio, tamaño de página, memoria por proceso y fallos de página, en Linux y en Windows.', 'Inspecionar RAM, troca, tamanho de página, memória por processo e faltas de página, no Linux e no Windows.'),
    steps: [
      { id: 'os1w4-lab1-s1', title: L('RAM and swap', 'RAM e intercambio', 'RAM e troca'),
        commands: ['free -h', 'swapon --show', 'getconf PAGESIZE', '# Windows: Get-CimInstance Win32_OperatingSystem | Select TotalVisibleMemorySize,FreePhysicalMemory ; Get-CimInstance Win32_PageFileUsage'],
        expected: L('`free -h` shows Mem and Swap rows; `swapon` shows a swap file or partition (or nothing if there is none); `getconf PAGESIZE` prints 4096 on most PCs. Windows shows sizes in KB and the page file in MB.', '`free -h` muestra las filas Mem y Swap; `swapon` muestra un archivo o partición de intercambio (o nada si no hay); `getconf PAGESIZE` imprime 4096 en casi todas las PC. Windows muestra tamaños en KB y el archivo de paginación en MB.', '`free -h` mostra as linhas Mem e Swap; `swapon` mostra um arquivo ou partição de troca (ou nada se não houver); `getconf PAGESIZE` imprime 4096 na maioria dos PCs. O Windows mostra tamanhos em KB e o arquivo de paginação em MB.') },
      { id: 'os1w4-lab1-s2', title: L('Virtual vs resident size', 'Tamaño virtual vs residente', 'Tamanho virtual vs residente'),
        commands: ['ps -eo pid,vsz,rss,comm --sort=-rss | head -6', '# Windows: Get-Process | Sort-Object WS -Descending | Select -First 5 Name,VM,WS'],
        expected: L('`VSZ` (virtual size) is always larger than `RSS` (pages actually in RAM): a process reserves far more address space than it touches.', '`VSZ` (tamaño virtual) siempre es mayor que `RSS` (páginas realmente en RAM): un proceso reserva mucho más espacio de direcciones del que toca.', '`VSZ` (tamanho virtual) é sempre maior que `RSS` (páginas realmente na RAM): um processo reserva muito mais espaço de endereçamento do que usa.') },
      { id: 'os1w4-lab1-s3', title: L('Count page faults', 'Cuenta fallos de página', 'Conte faltas de página'),
        commands: ['ps -o pid,min_flt,maj_flt,comm -p $$', '/usr/bin/time -v ls /usr/bin > /dev/null 2> faults.txt; grep -i "page faults" faults.txt'],
        expected: L('Minor faults (page already in RAM, just mapped) are many; major faults (read from disk) are few, often 0 when files are cached.', 'Los fallos menores (la página ya estaba en RAM, solo se mapea) son muchos; los mayores (lectura de disco) son pocos, a menudo 0 si los archivos están en caché.', 'As faltas menores (página já na RAM, só mapeada) são muitas; as maiores (leitura do disco) são poucas, muitas vezes 0 quando os arquivos estão em cache.') },
      { id: 'os1w4-lab1-s4', title: L('Watch swapping live', 'Observa el intercambio en vivo', 'Observe a troca ao vivo'),
        commands: ['vmstat 1 5', '# Windows: perfmon > add counter "Memory\\Pages/sec"'],
        expected: L('Five lines, one per second. On a healthy machine `si` and `so` stay at 0; constant non-zero values mean memory pressure.', 'Cinco líneas, una por segundo. En una máquina sana `si` y `so` quedan en 0; valores distintos de cero constantes indican presión de memoria.', 'Cinco linhas, uma por segundo. Em uma máquina saudável `si` e `so` ficam em 0; valores diferentes de zero constantes indicam pressão de memória.') },
    ] },
  { id: 'os1w4-lab2', kind: 'math', level: 2, minutes: 50,
    title: L('Memory by hand: fits, translation, replacement', 'Memoria a mano: ajustes, traducción, reemplazo', 'Memória à mão: ajustes, tradução, substituição'),
    goal: L('Solve each part on paper, then compare with the expected result.', 'Resolver cada parte en papel y luego comparar con el resultado esperado.', 'Resolver cada parte no papel e depois comparar com o resultado esperado.'),
    steps: [
      { id: 'os1w4-lab2-s1', title: L('Three placement policies', 'Tres políticas de ubicación', 'Três políticas de colocação'),
        commands: ['holes:    250 700 180 420 90 KB', 'requests: 170, 400, 260, 85 KB, then 430 KB'],
        expected: L('All three place the first four. Holes left: first fit 80 40 95 420 90; best fit 250 440 10 20 5; worst fit 165 130 180 160 90. Only best fit can still place 430 (in the 440 hole).', 'Las tres ubican los cuatro primeros. Huecos que quedan: primer ajuste 80 40 95 420 90; mejor ajuste 250 440 10 20 5; peor ajuste 165 130 180 160 90. Solo el mejor ajuste puede ubicar aún 430 (en el hueco de 440).', 'As três colocam os quatro primeiros. Buracos restantes: primeiro ajuste 80 40 95 420 90; melhor ajuste 250 440 10 20 5; pior ajuste 165 130 180 160 90. Só o melhor ajuste ainda consegue colocar 430 (no buraco de 440).') },
      { id: 'os1w4-lab2-s2', title: L('Translate four addresses', 'Traduce cuatro direcciones', 'Traduza quatro endereços'),
        commands: ['page size 1024; page table: 0->5, 1->2, 2->7, 3->not in RAM', 'logical addresses: 1500, 2100, 300, 3500'],
        expected: L('1500 → page 1, offset 476 → $2 \\times 1024 + 476 = 2524$. 2100 → page 2, offset 52 → 7220. 300 → page 0 → 5420. 3500 → page 3, offset 428 → page fault.', '1500 → página 1, desplazamiento 476 → $2 \\times 1024 + 476 = 2524$. 2100 → página 2, desplazamiento 52 → 7220. 300 → página 0 → 5420. 3500 → página 3, desplazamiento 428 → fallo de página.', '1500 → página 1, deslocamento 476 → $2 \\times 1024 + 476 = 2524$. 2100 → página 2, deslocamento 52 → 7220. 300 → página 0 → 5420. 3500 → página 3, deslocamento 428 → falta de página.') },
      { id: 'os1w4-lab2-s3', title: L('Replacement with 4 frames', 'Reemplazo con 4 marcos', 'Substituição com 4 quadros'),
        commands: ['string: 5 3 5 1 2 5 3 4 5 3 2 1', 'frames: 4'],
        expected: L('FIFO 8 faults, LRU 6, OPT 6. With 3 frames they were 9, 8, and 7: one extra frame helps every algorithm here.', 'FIFO 8 fallos, LRU 6, OPT 6. Con 3 marcos eran 9, 8 y 7: un marco extra ayuda a todos aquí.', 'FIFO 8 faltas, LRU 6, OPT 6. Com 3 quadros eram 9, 8 e 7: um quadro extra ajuda todos aqui.') },
      { id: 'os1w4-lab2-s4', title: L('See Belady\'s anomaly', 'Observa la anomalía de Belady', 'Veja a anomalia de Belady'),
        commands: ['string: 1 2 3 4 1 2 5 1 2 3 4 5', 'FIFO with 3 frames, then with 4 frames'],
        expected: L('3 frames: 9 faults; 4 frames: 10 faults. More memory, more faults, only because FIFO ignores use.', '3 marcos: 9 fallos; 4 marcos: 10 fallos. Más memoria, más fallos, solo porque FIFO ignora el uso.', '3 quadros: 9 faltas; 4 quadros: 10 faltas. Mais memória, mais faltas, só porque o FIFO ignora o uso.') },
    ] },
];

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: hierarchy and effective access time.', 'Lección 1: jerarquía y tiempo efectivo de acceso.', 'Lição 1: hierarquia e tempo efetivo de acesso.'), minutes: 25, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2: allocation and fragmentation.', 'Lección 2: asignación y fragmentación.', 'Lição 2: alocação e fragmentação.'), minutes: 30, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3: paging and translation.', 'Lección 3: paginación y traducción.', 'Lição 3: paginação e tradução.'), minutes: 35, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4 and Lab 1.', 'Lección 4 y Laboratorio 1.', 'Lição 4 e Laboratório 1.'), minutes: 55, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and Lab 2 on paper.', 'Lección 5 y Laboratorio 2 en papel.', 'Lição 5 e Laboratório 2 no papel.'), minutes: 75, kind: 'practice' },
  { day: 'Day 6', focus: L('Flashcards and activities.', 'Tarjetas y actividades.', 'Cartões e atividades.'), minutes: 25, kind: 'review' },
  { day: 'Day 7', focus: L('Quiz.', 'Cuestionario.', 'Questionário.'), minutes: 25, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'os1w4-r-paging', title: 'Wikipedia: Memory paging', url: 'https://en.wikipedia.org/wiki/Memory_paging', kind: 'article', verifiedOn: '2026-11-04', note: L('Pages, frames, and page tables.', 'Páginas, marcos y tablas de páginas.', 'Páginas, quadros e tabelas de páginas.') },
  { id: 'os1w4-r-replace', title: 'Wikipedia: Page replacement algorithm', url: 'https://en.wikipedia.org/wiki/Page_replacement_algorithm', kind: 'article', verifiedOn: '2026-11-04', note: L('FIFO, LRU, optimal, and more.', 'FIFO, LRU, óptimo y otros.', 'FIFO, LRU, ótimo e outros.') },
  { id: 'os1w4-r-free', title: 'man7.org: free(1)', url: 'https://man7.org/linux/man-pages/man1/free.1.html', kind: 'article', verifiedOn: '2026-11-04', note: L('What each column of `free` means.', 'Qué significa cada columna de `free`.', 'O que significa cada coluna do `free`.') },
  { id: 'os1w4-r-vmstat', title: 'man7.org: vmstat(8)', url: 'https://man7.org/linux/man-pages/man8/vmstat.8.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Reading `si`, `so`, and other columns.', 'Cómo leer `si`, `so` y otras columnas.', 'Como ler `si`, `so` e outras colunas.') },
  { id: 'os1w4-r-ms', title: 'Microsoft Learn: About memory management', url: 'https://learn.microsoft.com/en-us/windows/win32/memory/about-memory-management', kind: 'article', verifiedOn: '2026-11-04', note: L('Virtual memory on Windows.', 'Memoria virtual en Windows.', 'Memória virtual no Windows.') },
];

/** Operating Systems 1, Week 4: memory management. */
export const os1Week4: WeekContent = {
  id: 'y1-t1-m2-os-w4', year: 1, term: 1, module: 2, week: 4, subject: 'operating-systems-1',
  title: L('Memory management', 'Gestión de memoria', 'Gerenciamento de memória'),
  intro: L('Every program believes it owns a big, private memory. This week you see how the OS makes that true: the memory hierarchy, allocating blocks and the fragmentation it causes, paging and address translation, virtual memory and swap, and how FIFO, LRU, and the optimal algorithm choose which page to evict.',
    'Cada programa cree que tiene una memoria grande y privada. Esta semana ves cómo el SO lo hace realidad: la jerarquía de memoria, la asignación de bloques y la fragmentación que causa, la paginación y la traducción de direcciones, la memoria virtual y el intercambio, y cómo FIFO, LRU y el algoritmo óptimo eligen qué página expulsar.',
    'Cada programa acredita ter uma memória grande e privada. Nesta semana você vê como o SO torna isso verdade: a hierarquia de memória, a alocação de blocos e a fragmentação que ela causa, a paginação e a tradução de endereços, a memória virtual e a troca, e como FIFO, LRU e o algoritmo ótimo escolhem qual página expulsar.'),
  objectives: [
    L('Describe the hierarchy and compute effective access time.', 'Describir la jerarquía y calcular el tiempo efectivo de acceso.', 'Descrever a hierarquia e calcular o tempo efetivo de acesso.'),
    L('Apply first, best, and worst fit and name the fragmentation.', 'Aplicar primer, mejor y peor ajuste y nombrar la fragmentación.', 'Aplicar primeiro, melhor e pior ajuste e nomear a fragmentação.'),
    L('Translate logical to physical addresses with paging.', 'Traducir direcciones lógicas a físicas con paginación.', 'Traduzir endereços lógicos em físicos com paginação.'),
    L('Explain page faults, swap, and thrashing.', 'Explicar fallos de página, intercambio e hiperpaginación.', 'Explicar faltas de página, troca e ultrapaginação.'),
    L('Count faults for FIFO, LRU, and OPT.', 'Contar fallos con FIFO, LRU y OPT.', 'Contar faltas com FIFO, LRU e OPT.'),
  ],
  prerequisites: [L('Week 2: processes and their memory regions; powers of two.', 'Semana 2: procesos y sus regiones de memoria; potencias de dos.', 'Semana 2: processos e suas regiões de memória; potências de dois.')],
  keyConcepts: [
    L('Cache', 'Caché', 'Cache'), L('Fragmentation', 'Fragmentación', 'Fragmentação'), L('Paging', 'Paginación', 'Paginação'),
    L('Page fault', 'Fallo de página', 'Falta de página'), L('Swap', 'Intercambio', 'Troca'), L('LRU', 'LRU', 'LRU'),
  ],
  estimatedMinutes: 270,
  sequence: [
    L('Lessons 1–2: hierarchy and allocation.', 'Lecciones 1–2: jerarquía y asignación.', 'Lições 1–2: hierarquia e alocação.'),
    L('Lessons 3–4 and Lab 1: paging and virtual memory on your machine.', 'Lecciones 3–4 y Laboratorio 1: paginación y memoria virtual en tu máquina.', 'Lições 3–4 e Laboratório 1: paginação e memória virtual na sua máquina.'),
    L('Lesson 5 and Lab 2: replacement by hand. Then the quiz.', 'Lección 5 y Laboratorio 2: reemplazo a mano. Luego el cuestionario.', 'Lição 5 e Laboratório 2: substituição à mão. Depois o questionário.'),
  ],
  outcomes: [
    L('You can translate an address and count page faults without a computer.', 'Puedes traducir una dirección y contar fallos de página sin computadora.', 'Você consegue traduzir um endereço e contar faltas de página sem computador.'),
    L('You can tell from `free` and `vmstat` whether a machine lacks RAM.', 'Puedes saber con `free` y `vmstat` si a una máquina le falta RAM.', 'Você consegue dizer com `free` e `vmstat` se falta RAM a uma máquina.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Treating FIFO and LRU as the same.', 'Tratar FIFO y LRU como si fueran iguales.', 'Tratar FIFO e LRU como iguais.'), fix: L('FIFO looks at load time; LRU looks at last use. A hit changes LRU, never FIFO.', 'FIFO mira cuándo se cargó; LRU, cuándo se usó por última vez. Un acierto cambia LRU, nunca FIFO.', 'FIFO olha quando carregou; LRU, quando foi usada pela última vez. Um acerto muda o LRU, nunca o FIFO.') },
  ],
  lessons: os1Week4Lessons, flashcards, questions, labs, plan, resources, activities,
  stories: [], tools: [], videos: [], documents: [],
};
