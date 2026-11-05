import type { Activity, ExternalResource, Flashcard, Lab, Localized, Question, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { os1Week5Lessons } from './lessons';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

const l1 = 'os1w5-l1-devices';
const l2 = 'os1w5-l2-hdd-performance';
const l3 = 'os1w5-l3-fcfs-sstf';
const l4 = 'os1w5-l4-elevator';
const l5 = 'os1w5-l5-partitions';
const l6 = 'os1w5-l6-raid';

const flashcards: Flashcard[] = [
  { id: 'os1w5-c1', lessonId: l1, kind: 'distinction', front: L('HDD vs SSD', 'HDD vs SSD', 'HDD vs SSD'), back: L('Spinning platters and a moving head vs NAND flash with no moving parts.', 'Platos que giran y un cabezal móvil vs NAND flash sin partes móviles.', 'Pratos girando e cabeça móvel vs NAND flash sem partes móveis.') },
  { id: 'os1w5-c2', lessonId: l1, kind: 'concept', front: L('Wear leveling', 'Nivelación de desgaste', 'Nivelamento de desgaste'), back: L('The SSD controller spreads writes so no cells wear out early.', 'La controladora del SSD reparte las escrituras para que ninguna celda se gaste antes.', 'A controladora do SSD espalha as escritas para nenhuma célula se gastar antes.') },
  { id: 'os1w5-c3', lessonId: l2, kind: 'concept', front: L('Disk access time', 'Tiempo de acceso a disco', 'Tempo de acesso ao disco'), back: L('Seek + rotational latency + transfer; average latency is half a turn.', 'Búsqueda + latencia rotacional + transferencia; la latencia promedio es media vuelta.', 'Busca + latência rotacional + transferência; a latência média é meia volta.') },
  { id: 'os1w5-c4', lessonId: l2, kind: 'concept', front: L('Cylinder', 'Cilindro', 'Cilindro'), back: L('The tracks at the same arm position on every platter surface.', 'Las pistas en la misma posición del brazo en todas las superficies.', 'As trilhas na mesma posição do braço em todas as superfícies.') },
  { id: 'os1w5-c5', lessonId: l3, kind: 'concept', front: L('SSTF', 'SSTF', 'SSTF'), back: L('Serve the closest request next; short movement, possible starvation.', 'Atender la petición más cercana; poco movimiento, posible inanición.', 'Atender o pedido mais próximo; pouco movimento, possível inanição.') },
  { id: 'os1w5-c6', lessonId: l4, kind: 'distinction', front: L('SCAN vs LOOK', 'SCAN vs LOOK', 'SCAN vs LOOK'), back: L('SCAN goes to the disk edge before reversing; LOOK reverses at the last request.', 'SCAN llega al borde del disco antes de girar; LOOK gira en la última petición.', 'SCAN vai até a borda do disco antes de virar; LOOK vira no último pedido.') },
  { id: 'os1w5-c7', lessonId: l4, kind: 'concept', front: L('C-SCAN', 'C-SCAN', 'C-SCAN'), back: L('Serve in one direction, jump back to the start, repeat: more uniform waits.', 'Atender en una dirección, saltar al inicio y repetir: esperas más parejas.', 'Atender em um sentido, saltar para o início e repetir: esperas mais uniformes.') },
  { id: 'os1w5-c8', lessonId: l5, kind: 'distinction', front: L('MBR vs GPT', 'MBR vs GPT', 'MBR vs GPT'), back: L('MBR: 4 primary, 2 TiB, BIOS. GPT: 128 partitions, huge disks, UEFI, backup header.', 'MBR: 4 primarias, 2 TiB, BIOS. GPT: 128 particiones, discos enormes, UEFI, encabezado de respaldo.', 'MBR: 4 primárias, 2 TiB, BIOS. GPT: 128 partições, discos enormes, UEFI, cabeçalho de reserva.') },
  { id: 'os1w5-c9', lessonId: l5, kind: 'command', front: L('`lsblk -f`, `df -h`', '`lsblk -f`, `df -h`', '`lsblk -f`, `df -h`'), back: L('Disks, partitions, and file systems as a tree; space used and free per mounted volume.', 'Discos, particiones y sistemas de archivos en árbol; espacio usado y libre por volumen montado.', 'Discos, partições e sistemas de arquivos em árvore; espaço usado e livre por volume montado.') },
  { id: 'os1w5-c10', lessonId: l6, kind: 'concept', front: L('RAID 5', 'RAID 5', 'RAID 5'), back: L('Striping with rotating XOR parity: $(n-1)C$ usable, survives one disk failure.', 'Franjas con paridad XOR rotada: $(n-1)C$ útil, sobrevive a la falla de un disco.', 'Faixas com paridade XOR rotativa: $(n-1)C$ útil, sobrevive à falha de um disco.') },
  { id: 'os1w5-c11', lessonId: l6, kind: 'concept', front: L('RAID is not a backup', 'El RAID no es un respaldo', 'RAID não é backup'), back: L('It survives dead disks, not deletions, corruption, or ransomware.', 'Sobrevive a discos muertos, no a borrados, corrupción ni secuestro de datos.', 'Sobrevive a discos mortos, não a exclusões, corrupção nem sequestro de dados.') },
];

const questions: Question[] = [
  { id: 'os1w5-q1', type: 'multiple-choice', lessonId: l1,
    prompt: L('Which SSD controller task tells the drive which blocks the file system no longer uses?', '¿Qué tarea de la controladora del SSD le dice qué bloques ya no usa el sistema de archivos?', 'Qual tarefa da controladora do SSD diz quais blocos o sistema de arquivos não usa mais?'),
    options: [L('TRIM', 'TRIM', 'TRIM'), L('ECC', 'ECC', 'ECC'), L('Wear leveling', 'Nivelación de desgaste', 'Nivelamento de desgaste')],
    answer: 0,
    explanation: L('TRIM marks freed blocks so garbage collection can clean them ahead of time.', 'TRIM marca bloques liberados para que la recolección de basura los limpie con anticipación.', 'TRIM marca blocos liberados para a coleta de lixo limpá-los com antecedência.') },
  { id: 'os1w5-q2', type: 'fill-blank', lessonId: l2,
    prompt: L('At 6,000 RPM the average rotational latency is ___ ms.', 'A 6.000 RPM la latencia rotacional promedio es ___ ms.', 'A 6.000 RPM a latência rotacional média é ___ ms.'),
    accepted: ['5'],
    explanation: L('One turn is $\\frac{60}{6000} = 10$ ms; half is 5 ms.', 'Una vuelta es $\\frac{60}{6000} = 10$ ms; la mitad, 5 ms.', 'Uma volta é $\\frac{60}{6000} = 10$ ms; a metade, 5 ms.') },
  { id: 'os1w5-q3', type: 'fill-blank', lessonId: l3,
    prompt: L('Head at 100; FCFS queue 120, 90, 150. Total head movement = ___.', 'Cabezal en 100; cola FCFS 120, 90, 150. Movimiento total = ___.', 'Cabeça em 100; fila FCFS 120, 90, 150. Movimento total = ___.'),
    accepted: ['110'],
    explanation: L('$20 + 30 + 60 = 110$.', '$20 + 30 + 60 = 110$.', '$20 + 30 + 60 = 110$.') },
  { id: 'os1w5-q4', type: 'true-false', lessonId: l3,
    prompt: L('True or false: SSTF always gives the shortest possible total head movement.', 'Verdadero o falso: SSTF siempre da el menor movimiento total posible.', 'Verdadeiro ou falso: o SSTF sempre dá o menor movimento total possível.'),
    options: TF, answer: 1,
    explanation: L('False: it is greedy. In the second lesson queue LOOK gave 116 and SSTF 133.', 'Falso: es voraz. Con la segunda cola de la lección, LOOK dio 116 y SSTF 133.', 'Falso: é guloso. Com a segunda fila da lição, LOOK deu 116 e SSTF 133.') },
  { id: 'os1w5-q5', type: 'matching', lessonId: l4,
    prompt: L('Head 60 going up, 0–199, queue 92 18 140 35 176 70 8. Match each algorithm with its movement.', 'Cabezal 60 subiendo, 0–199, cola 92 18 140 35 176 70 8. Une cada algoritmo con su movimiento.', 'Cabeça 60 subindo, 0–199, fila 92 18 140 35 176 70 8. Ligue cada algoritmo a seu movimento.'),
    left: [L('FCFS', 'FCFS', 'FCFS'), L('SCAN', 'SCAN', 'SCAN'), L('C-SCAN', 'C-SCAN', 'C-SCAN'), L('C-LOOK', 'C-LOOK', 'C-LOOK')],
    right: [L('642', '642', '642'), L('330', '330', '330'), L('373', '373', '373'), L('311', '311', '311')],
    answer: [0, 1, 2, 3],
    explanation: L('Circular variants count the return jump here.', 'Aquí las variantes circulares cuentan el salto de regreso.', 'Aqui as variantes circulares contam o salto de volta.') },
  { id: 'os1w5-q6', type: 'scenario', lessonId: l4,
    prompt: L('Requests at the outer edge of a busy HDD wait much longer than those in the middle under SCAN. Which change evens out the waits?', 'Con SCAN, las peticiones en el borde exterior de un HDD ocupado esperan mucho más que las del medio. ¿Qué cambio empareja las esperas?', 'Com SCAN, os pedidos na borda externa de um HDD ocupado esperam muito mais que os do meio. Que mudança iguala as esperas?'),
    options: [L('C-SCAN', 'C-SCAN', 'C-SCAN'), L('FCFS', 'FCFS', 'FCFS'), L('SSTF', 'SSTF', 'SSTF')],
    answer: 0,
    explanation: L('Serving in one direction only treats every cylinder the same.', 'Atender en una sola dirección trata igual a todos los cilindros.', 'Atender em um só sentido trata todos os cilindros igualmente.') },
  { id: 'os1w5-q7', type: 'multiple-choice', lessonId: l5,
    prompt: L('How many partitions can an MBR disk have without an extended partition?', '¿Cuántas particiones puede tener un disco MBR sin partición extendida?', 'Quantas partições um disco MBR pode ter sem partição estendida?'),
    options: [L('4', '4', '4'), L('128', '128', '128'), L('2', '2', '2')],
    answer: 0,
    explanation: L('Four primary slots; more needs an extended partition with logical ones.', 'Cuatro lugares primarios; más requiere una extendida con lógicas.', 'Quatro lugares primários; mais exige uma estendida com lógicas.') },
  { id: 'os1w5-q8', type: 'fill-blank', lessonId: l6,
    prompt: L('Eight 2 TB disks in RAID 6 give ___ TB usable.', 'Ocho discos de 2 TB en RAID 6 dan ___ TB útiles.', 'Oito discos de 2 TB em RAID 6 dão ___ TB úteis.'),
    accepted: ['12'],
    explanation: L('$(8 - 2) \\times 2 = 12$.', '$(8 - 2) \\times 2 = 12$.', '$(8 - 2) \\times 2 = 12$.') },
  { id: 'os1w5-q9', type: 'troubleshooting', lessonId: l6,
    prompt: L('A server with RAID 1 is hit by ransomware that encrypts every file. Why does RAID not save the data?', 'Un servidor con RAID 1 sufre un secuestro de datos que cifra todos los archivos. ¿Por qué el RAID no salva los datos?', 'Um servidor com RAID 1 sofre um sequestro de dados que cifra todos os arquivos. Por que o RAID não salva os dados?'),
    options: [L('The mirror copies the encryption to both disks', 'El espejo copia el cifrado a ambos discos', 'O espelho copia a cifragem para os dois discos'), L('RAID 1 has no parity', 'RAID 1 no tiene paridad', 'RAID 1 não tem paridade'), L('The disks were too small', 'Los discos eran muy pequeños', 'Os discos eram pequenos demais')],
    answer: 0,
    explanation: L('RAID repeats every write faithfully; only an offline or versioned backup helps.', 'El RAID repite fielmente cada escritura; solo ayuda un respaldo desconectado o con versiones.', 'O RAID repete fielmente cada escrita; só ajuda um backup desconectado ou com versões.') },
];

const activities: Activity[] = [
  { id: 'os1w5-act-sstf', kind: 'order', lessonId: l3,
    title: L('Follow SSTF', 'Sigue a SSTF', 'Siga o SSTF'),
    prompt: L('Head at 60; queue 92 18 140 35 176 70 8. Order the visits.', 'Cabezal en 60; cola 92 18 140 35 176 70 8. Ordena las visitas.', 'Cabeça em 60; fila 92 18 140 35 176 70 8. Ordene as visitas.'),
    items: [L('70', '70', '70'), L('92', '92', '92'), L('140', '140', '140'), L('176', '176', '176'), L('35', '35', '35'), L('18', '18', '18'), L('8', '8', '8')],
    explanation: L('Always the nearest: total 284.', 'Siempre el más cercano: total 284.', 'Sempre o mais próximo: total 284.') },
  { id: 'os1w5-act-raid', kind: 'classify', lessonId: l6,
    title: L('Survives a failure?', '¿Sobrevive a una falla?', 'Sobrevive a uma falha?'),
    prompt: L('Sort each RAID level by whether it survives one dead disk.', 'Clasifica cada nivel RAID según sobreviva o no a un disco muerto.', 'Classifique cada nível RAID conforme sobreviva ou não a um disco morto.'),
    buckets: [L('Survives', 'Sobrevive', 'Sobrevive'), L('Loses data', 'Pierde datos', 'Perde dados')],
    items: [
      { text: L('RAID 0', 'RAID 0', 'RAID 0'), bucket: 1 },
      { text: L('RAID 1', 'RAID 1', 'RAID 1'), bucket: 0 },
      { text: L('RAID 5', 'RAID 5', 'RAID 5'), bucket: 0 },
      { text: L('RAID 6', 'RAID 6', 'RAID 6'), bucket: 0 },
      { text: L('RAID 10', 'RAID 10', 'RAID 10'), bucket: 0 },
    ],
    explanation: L('Only RAID 0 has no redundancy at all.', 'Solo RAID 0 no tiene ninguna redundancia.', 'Só o RAID 0 não tem nenhuma redundância.') },
  { id: 'os1w5-act-fill', kind: 'code-fill', lessonId: l2,
    title: L('One random read', 'Una lectura aleatoria', 'Uma leitura aleatória'),
    prompt: L('A 10,000 RPM disk with a 4 ms seek; ignore transfer.', 'Un disco de 10.000 RPM con búsqueda de 4 ms; ignora la transferencia.', 'Um disco de 10.000 RPM com busca de 4 ms; ignore a transferência.'),
    template: 'turn    = 60000 / 10000 = {0} ms\nlatency = turn / 2 = {1} ms\ntotal   = 4 + latency = {2} ms',
    blanks: ['6', '3', '7'],
    explanation: L('$\\frac{60000}{10000} = 6$ ms per turn, half is 3, plus 4 ms seek: 7 ms.', '$\\frac{60000}{10000} = 6$ ms por vuelta, la mitad es 3, más 4 ms de búsqueda: 7 ms.', '$\\frac{60000}{10000} = 6$ ms por volta, a metade é 3, mais 4 ms de busca: 7 ms.') },
];

const labs: Lab[] = [
  { id: 'os1w5-lab1', kind: 'shell', level: 1, minutes: 35,
    title: L('Explore your disks and partitions', 'Explora tus discos y particiones', 'Explore seus discos e partições'),
    goal: L('List disks, partitions, file systems, free space, and the I/O scheduler, read-only, on Linux and Windows.', 'Listar discos, particiones, sistemas de archivos, espacio libre y el planificador de E/S, en solo lectura, en Linux y Windows.', 'Listar discos, partições, sistemas de arquivos, espaço livre e o escalonador de E/S, somente leitura, no Linux e no Windows.'),
    steps: [
      { id: 'os1w5-lab1-s1', title: L('Disks and partitions', 'Discos y particiones', 'Discos e partições'),
        commands: ['lsblk -f', 'cat /proc/partitions', '# Windows: Get-Disk ; Get-Partition ; Get-Volume'],
        expected: L('A tree such as `nvme0n1` → `nvme0n1p1` (vfat, `/boot/efi`), `nvme0n1p2` (ext4, `/`). `Get-Disk` shows `PartitionStyle` GPT or MBR.', 'Un árbol como `nvme0n1` → `nvme0n1p1` (vfat, `/boot/efi`), `nvme0n1p2` (ext4, `/`). `Get-Disk` muestra `PartitionStyle` GPT o MBR.', 'Uma árvore como `nvme0n1` → `nvme0n1p1` (vfat, `/boot/efi`), `nvme0n1p2` (ext4, `/`). `Get-Disk` mostra `PartitionStyle` GPT ou MBR.') },
      { id: 'os1w5-lab1-s2', title: L('Partition table type', 'Tipo de tabla de particiones', 'Tipo de tabela de partições'),
        commands: ['sudo fdisk -l | grep -i "disklabel type"', '# Windows (admin): diskpart  then  list disk   (a * in the Gpt column means GPT)'],
        expected: L('`Disklabel type: gpt` (or `dos` for MBR). `fdisk -l` only lists; it changes nothing.', '`Disklabel type: gpt` (o `dos` para MBR). `fdisk -l` solo lista; no cambia nada.', '`Disklabel type: gpt` (ou `dos` para MBR). `fdisk -l` só lista; não altera nada.') },
      { id: 'os1w5-lab1-s3', title: L('Free space and big folders', 'Espacio libre y carpetas grandes', 'Espaço livre e pastas grandes'),
        commands: ['df -h', 'du -sh ~/* 2>/dev/null | sort -h | tail -5', '# Windows: Get-PSDrive -PSProvider FileSystem'],
        expected: L('`df -h` shows size, used, available, and use% per mounted volume; `du` lists your five largest folders.', '`df -h` muestra tamaño, usado, disponible y porcentaje de uso por volumen; `du` lista tus cinco carpetas más grandes.', '`df -h` mostra tamanho, usado, disponível e porcentagem de uso por volume; `du` lista suas cinco maiores pastas.') },
      { id: 'os1w5-lab1-s4', title: L('Disk type and scheduler', 'Tipo de disco y planificador', 'Tipo de disco e escalonador'),
        commands: ['cat /sys/block/*/queue/rotational', 'cat /sys/block/*/queue/scheduler', '# Windows: Get-PhysicalDisk | Select FriendlyName,MediaType,BusType'],
        expected: L('`rotational` is 1 for an HDD and 0 for an SSD. The scheduler line shows the active one in brackets, for example `[none] mq-deadline` on an NVMe SSD.', '`rotational` es 1 en un HDD y 0 en un SSD. La línea del planificador muestra el activo entre corchetes, por ejemplo `[none] mq-deadline` en un SSD NVMe.', '`rotational` é 1 em um HDD e 0 em um SSD. A linha do escalonador mostra o ativo entre colchetes, por exemplo `[none] mq-deadline` em um SSD NVMe.') },
    ] },
  { id: 'os1w5-lab2', kind: 'math', level: 2, minutes: 45,
    title: L('Disk scheduling and RAID by hand', 'Planificación de disco y RAID a mano', 'Escalonamento de disco e RAID à mão'),
    goal: L('Cylinders 0–99, head at 45 moving down, queue 23, 89, 12, 67, 51, 30, 95. Compute every algorithm (circular ones count the jump), then two RAID problems.', 'Cilindros 0–99, cabezal en 45 bajando, cola 23, 89, 12, 67, 51, 30, 95. Calcula cada algoritmo (los circulares cuentan el salto) y luego dos problemas de RAID.', 'Cilindros 0–99, cabeça em 45 descendo, fila 23, 89, 12, 67, 51, 30, 95. Calcule cada algoritmo (os circulares contam o salto) e depois dois problemas de RAID.'),
    steps: [
      { id: 'os1w5-lab2-s1', title: L('FCFS and SSTF', 'FCFS y SSTF', 'FCFS e SSTF'),
        commands: ['FCFS: 45 23 89 12 67 51 30 95', 'SSTF: always the closest'],
        expected: L('FCFS: $22 + 66 + 77 + 55 + 16 + 21 + 65 = 322$. SSTF: 51 67 89 95 30 23 12, total 133.', 'FCFS: $22 + 66 + 77 + 55 + 16 + 21 + 65 = 322$. SSTF: 51 67 89 95 30 23 12, total 133.', 'FCFS: $22 + 66 + 77 + 55 + 16 + 21 + 65 = 322$. SSTF: 51 67 89 95 30 23 12, total 133.') },
      { id: 'os1w5-lab2-s2', title: L('SCAN and LOOK', 'SCAN y LOOK', 'SCAN e LOOK'),
        commands: ['SCAN: down to 0, then up', 'LOOK: down to 12, then up'],
        expected: L('SCAN: $45 + 95 = 140$. LOOK: $33 + 83 = 116$, the best here.', 'SCAN: $45 + 95 = 140$. LOOK: $33 + 83 = 116$, el mejor aquí.', 'SCAN: $45 + 95 = 140$. LOOK: $33 + 83 = 116$, o melhor aqui.') },
      { id: 'os1w5-lab2-s3', title: L('C-SCAN and C-LOOK', 'C-SCAN y C-LOOK', 'C-SCAN e C-LOOK'),
        commands: ['C-SCAN: down to 0, jump to 99, continue down', 'C-LOOK: down to 12, jump to 95, continue down'],
        expected: L('C-SCAN: $45 + 99 + 48 = 192$. C-LOOK: $33 + 83 + 44 = 160$.', 'C-SCAN: $45 + 99 + 48 = 192$. C-LOOK: $33 + 83 + 44 = 160$.', 'C-SCAN: $45 + 99 + 48 = 192$. C-LOOK: $33 + 83 + 44 = 160$.') },
      { id: 'os1w5-lab2-s4', title: L('RAID capacity and rebuild', 'Capacidad RAID y reconstrucción', 'Capacidade RAID e reconstrução'),
        commands: ['5 disks of 4 TB: RAID 0, 5, 6?', 'stripe: D1=1011 D2=0110 D3=1100; disk 2 dies'],
        expected: L('20, 16, and 12 TB. $P = 1011 \\oplus 0110 \\oplus 1100 = 0001$; $D_2 = 1011 \\oplus 1100 \\oplus 0001 = 0110$.', '20, 16 y 12 TB. $P = 1011 \\oplus 0110 \\oplus 1100 = 0001$; $D_2 = 1011 \\oplus 1100 \\oplus 0001 = 0110$.', '20, 16 e 12 TB. $P = 1011 \\oplus 0110 \\oplus 1100 = 0001$; $D_2 = 1011 \\oplus 1100 \\oplus 0001 = 0110$.') },
    ] },
];

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lessons 1–2: devices and access time.', 'Lecciones 1–2: dispositivos y tiempo de acceso.', 'Lições 1–2: dispositivos e tempo de acesso.'), minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 3: FCFS and SSTF.', 'Lección 3: FCFS y SSTF.', 'Lição 3: FCFS e SSTF.'), minutes: 30, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 4 and Lab 2, steps 1–3.', 'Lección 4 y Laboratorio 2, pasos 1–3.', 'Lição 4 e Laboratório 2, passos 1–3.'), minutes: 60, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 5 and Lab 1.', 'Lección 5 y Laboratorio 1.', 'Lição 5 e Laboratório 1.'), minutes: 55, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 6 and the RAID step of Lab 2.', 'Lección 6 y el paso de RAID del Laboratorio 2.', 'Lição 6 e o passo de RAID do Laboratório 2.'), minutes: 35, kind: 'practice' },
  { day: 'Day 6', focus: L('Flashcards and activities.', 'Tarjetas y actividades.', 'Cartões e atividades.'), minutes: 25, kind: 'review' },
  { day: 'Day 7', focus: L('Quiz.', 'Cuestionario.', 'Questionário.'), minutes: 25, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'os1w5-r-io', title: 'Wikipedia: I/O scheduling', url: 'https://en.wikipedia.org/wiki/I/O_scheduling', kind: 'article', verifiedOn: '2026-11-04', note: L('Disk scheduling algorithms.', 'Algoritmos de planificación de disco.', 'Algoritmos de escalonamento de disco.') },
  { id: 'os1w5-r-raid', title: 'Wikipedia: Standard RAID levels', url: 'https://en.wikipedia.org/wiki/Standard_RAID_levels', kind: 'article', verifiedOn: '2026-11-04', note: L('RAID 0 to 6 with diagrams.', 'RAID 0 a 6 con diagramas.', 'RAID 0 a 6 com diagramas.') },
  { id: 'os1w5-r-gpt', title: 'Wikipedia: GUID Partition Table', url: 'https://en.wikipedia.org/wiki/GUID_Partition_Table', kind: 'article', verifiedOn: '2026-11-04', note: L('GPT compared with MBR.', 'GPT comparado con MBR.', 'GPT comparado com MBR.') },
  { id: 'os1w5-r-lsblk', title: 'man7.org: lsblk(8)', url: 'https://man7.org/linux/man-pages/man8/lsblk.8.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Listing block devices.', 'Listar dispositivos de bloque.', 'Listar dispositivos de bloco.') },
  { id: 'os1w5-r-md', title: 'Linux kernel docs: RAID arrays (md)', url: 'https://docs.kernel.org/admin-guide/md.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Software RAID on Linux.', 'RAID por software en Linux.', 'RAID por software no Linux.') },
  { id: 'os1w5-r-ms', title: 'Microsoft Learn: Overview of Disk Management', url: 'https://learn.microsoft.com/en-us/windows-server/storage/disk-management/overview-of-disk-management', kind: 'article', verifiedOn: '2026-11-04', note: L('Partitions and volumes on Windows.', 'Particiones y volúmenes en Windows.', 'Partições e volumes no Windows.') },
];

/** Operating Systems 1, Week 5: mass-storage structure. */
export const os1Week5: WeekContent = {
  id: 'y1-t1-m2-os-w5', year: 1, term: 1, module: 2, week: 5, subject: 'operating-systems-1',
  title: L('Mass-storage structure', 'Estructura de almacenamiento masivo', 'Estrutura de armazenamento em massa'),
  intro: L('Where data lives when the power is off. This week: tapes, hard disks, SSDs, optical discs, and flash; what makes a disk read slow; the classic disk scheduling algorithms worked out by hand; partitions with MBR and GPT; and RAID for speed and safety.',
    'Dónde viven los datos cuando se apaga la máquina. Esta semana: cintas, discos duros, SSD, discos ópticos y flash; qué hace lenta una lectura de disco; los algoritmos clásicos de planificación de disco resueltos a mano; particiones con MBR y GPT; y RAID para ganar velocidad y seguridad.',
    'Onde os dados vivem quando a máquina desliga. Nesta semana: fitas, discos rígidos, SSDs, discos ópticos e flash; o que deixa lenta uma leitura de disco; os algoritmos clássicos de escalonamento de disco resolvidos à mão; partições com MBR e GPT; e RAID para ganhar velocidade e segurança.'),
  objectives: [
    L('Compare storage devices and their trade-offs.', 'Comparar dispositivos de almacenamiento y sus compromisos.', 'Comparar dispositivos de armazenamento e seus compromissos.'),
    L('Compute HDD access time.', 'Calcular el tiempo de acceso de un HDD.', 'Calcular o tempo de acesso de um HDD.'),
    L('Apply FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK.', 'Aplicar FCFS, SSTF, SCAN, C-SCAN, LOOK y C-LOOK.', 'Aplicar FCFS, SSTF, SCAN, C-SCAN, LOOK e C-LOOK.'),
    L('Explain partitions, volumes, MBR, and GPT.', 'Explicar particiones, volúmenes, MBR y GPT.', 'Explicar partições, volumes, MBR e GPT.'),
    L('Compute RAID capacity and rebuild a parity block.', 'Calcular capacidad RAID y reconstruir un bloque de paridad.', 'Calcular capacidade RAID e reconstruir um bloco de paridade.'),
  ],
  prerequisites: [L('Week 4: the memory hierarchy and swap.', 'Semana 4: la jerarquía de memoria y el intercambio.', 'Semana 4: a hierarquia de memória e a troca.')],
  keyConcepts: [
    L('SSD and NAND', 'SSD y NAND', 'SSD e NAND'), L('Seek and latency', 'Búsqueda y latencia', 'Busca e latência'), L('SSTF', 'SSTF', 'SSTF'),
    L('SCAN and LOOK', 'SCAN y LOOK', 'SCAN e LOOK'), L('GPT', 'GPT', 'GPT'), L('RAID', 'RAID', 'RAID'),
  ],
  estimatedMinutes: 270,
  sequence: [
    L('Lessons 1–2: devices and why disks are slow.', 'Lecciones 1–2: dispositivos y por qué los discos son lentos.', 'Lições 1–2: dispositivos e por que discos são lentos.'),
    L('Lessons 3–4 and Lab 2: disk scheduling by hand.', 'Lecciones 3–4 y Laboratorio 2: planificación de disco a mano.', 'Lições 3–4 e Laboratório 2: escalonamento de disco à mão.'),
    L('Lessons 5–6 and Lab 1: partitions and RAID. Then the quiz.', 'Lecciones 5–6 y Laboratorio 1: particiones y RAID. Luego el cuestionario.', 'Lições 5–6 e Laboratório 1: partições e RAID. Depois o questionário.'),
  ],
  outcomes: [
    L('You can compute head movement for any algorithm and queue.', 'Puedes calcular el movimiento del cabezal con cualquier algoritmo y cola.', 'Você consegue calcular o movimento da cabeça com qualquer algoritmo e fila.'),
    L('You can read your own disk layout and pick a RAID level.', 'Puedes leer la distribución de tu disco y elegir un nivel RAID.', 'Você consegue ler o layout do seu disco e escolher um nível RAID.'),
  ],
  checklist: [
    L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Forgetting to say whether C-SCAN counts the return jump.', 'Olvidar decir si C-SCAN cuenta el salto de regreso.', 'Esquecer de dizer se o C-SCAN conta o salto de volta.'), fix: L('Write the convention next to your answer; both are common.', 'Escribe la convención junto a tu respuesta; ambas son comunes.', 'Escreva a convenção ao lado da resposta; as duas são comuns.') },
  ],
  lessons: os1Week5Lessons, flashcards, questions, labs, plan, resources, activities,
  stories: [], tools: [], videos: [], documents: [],
};
