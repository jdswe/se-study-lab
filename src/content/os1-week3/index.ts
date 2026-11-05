import type { Activity, ExternalResource, Flashcard, Lab, Localized, Question, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { os1Week3Lessons } from './lessons';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

const l1 = 'os1w3-l1-threads';
const l2 = 'os1w3-l2-scheduling-basics';
const l3 = 'os1w3-l3-fcfs-sjf';
const l4 = 'os1w3-l4-priority-rr-srtf';
const l5 = 'os1w3-l5-linux-windows';
const l6 = 'os1w3-l6-critical-sections';

const flashcards: Flashcard[] = [
  { id: 'os1w3-c1', lessonId: l1, kind: 'distinction', front: L('Process vs thread', 'Proceso vs hilo', 'Processo vs thread'), back: L('A process owns memory and files; its threads share them and each has its own stack and registers.', 'Un proceso posee memoria y archivos; sus hilos los comparten y cada uno tiene su pila y registros.', 'Um processo possui memória e arquivos; suas threads os compartilham e cada uma tem sua pilha e registradores.') },
  { id: 'os1w3-c2', lessonId: l1, kind: 'concept', front: L('One-to-one model', 'Modelo uno a uno', 'Modelo um para um'), back: L('Each user thread is a kernel thread (Linux, Windows): true parallelism, no global freeze.', 'Cada hilo de usuario es un hilo de núcleo (Linux, Windows): paralelismo real, sin congelamiento global.', 'Cada thread de usuário é uma thread de núcleo (Linux, Windows): paralelismo real, sem congelamento global.') },
  { id: 'os1w3-c3', lessonId: l2, kind: 'distinction', front: L('Preemptive vs non-preemptive', 'Expropiativo vs no expropiativo', 'Preemptivo vs não preemptivo'), back: L('Preemptive may take the CPU away; non-preemptive waits until the job blocks or ends.', 'El expropiativo puede quitar la CPU; el no expropiativo espera a que el trabajo se bloquee o termine.', 'O preemptivo pode tirar a CPU; o não preemptivo espera o trabalho bloquear ou terminar.') },
  { id: 'os1w3-c4', lessonId: l2, kind: 'concept', front: L('Turnaround and waiting', 'Retorno y espera', 'Retorno e espera'), back: L('$\\text{TAT} = \\text{completion} - \\text{arrival}$; $\\text{WT} = \\text{TAT} - \\text{burst}$.', '$\\text{retorno} = \\text{fin} - \\text{llegada}$; $\\text{espera} = \\text{retorno} - \\text{ráfaga}$.', '$\\text{retorno} = \\text{término} - \\text{chegada}$; $\\text{espera} = \\text{retorno} - \\text{rajada}$.') },
  { id: 'os1w3-c5', lessonId: l3, kind: 'concept', front: L('Convoy effect', 'Efecto convoy', 'Efeito comboio'), back: L('In FCFS one long job at the front makes all short ones wait.', 'En FCFS un trabajo largo al frente hace esperar a todos los cortos.', 'No FCFS um trabalho longo na frente faz todos os curtos esperarem.') },
  { id: 'os1w3-c6', lessonId: l3, kind: 'concept', front: L('SJF', 'SJF', 'SJF'), back: L('Shortest burst first: minimum average waiting, but long jobs may starve.', 'La ráfaga más corta primero: espera promedio mínima, pero los largos pueden sufrir inanición.', 'A menor rajada primeiro: menor espera média, mas os longos podem sofrer inanição.') },
  { id: 'os1w3-c7', lessonId: l4, kind: 'concept', front: L('Aging', 'Envejecimiento', 'Envelhecimento'), back: L('Raising a waiting job\'s priority over time so it cannot starve.', 'Subir con el tiempo la prioridad de un trabajo que espera para que no sufra inanición.', 'Aumentar com o tempo a prioridade de um trabalho que espera para ele não sofrer inanição.') },
  { id: 'os1w3-c8', lessonId: l4, kind: 'concept', front: L('Round Robin quantum', 'Quantum de Round Robin', 'Quantum do Round Robin'), back: L('Huge $q$ = FCFS; tiny $q$ = all overhead; most bursts should fit in one $q$.', '$q$ enorme = FCFS; $q$ mínimo = puro costo; la mayoría de las ráfagas debería caber en un $q$.', '$q$ enorme = FCFS; $q$ minúsculo = puro custo; a maioria das rajadas deve caber em um $q$.') },
  { id: 'os1w3-c9', lessonId: l5, kind: 'command', front: L('`nice`, `renice`, `chrt`, `taskset`', '`nice`, `renice`, `chrt`, `taskset`', '`nice`, `renice`, `chrt`, `taskset`'), back: L('Start with a nice value; change it; show or set the policy; set CPU affinity.', 'Iniciar con un valor nice; cambiarlo; ver o fijar la política; fijar la afinidad de CPU.', 'Iniciar com um valor nice; alterá-lo; ver ou definir a política; definir a afinidade de CPU.') },
  { id: 'os1w3-c10', lessonId: l6, kind: 'distinction', front: L('Mutex vs semaphore', 'Mutex vs semáforo', 'Mutex vs semáforo'), back: L('A mutex lets one thread in; a counting semaphore lets up to $N$.', 'Un mutex deja entrar a un hilo; un semáforo contador deja entrar hasta $N$.', 'Um mutex deixa entrar uma thread; um semáforo contador deixa entrar até $N$.') },
  { id: 'os1w3-c11', lessonId: l6, kind: 'concept', front: L('Deadlock', 'Interbloqueo', 'Impasse'), back: L('Threads wait forever for each other\'s resources; prevent by a fixed lock order.', 'Hilos que esperan para siempre los recursos del otro; se evita con un orden fijo de candados.', 'Threads esperando para sempre os recursos uma da outra; evita-se com ordem fixa de travas.') },
];

const questions: Question[] = [
  { id: 'os1w3-q1', type: 'multiple-choice', lessonId: l1,
    prompt: L('Which is shared by all threads of a process?', '¿Qué comparten todos los hilos de un proceso?', 'O que todas as threads de um processo compartilham?'),
    options: [L('The heap', 'El montículo', 'O heap'), L('The stack', 'La pila', 'A pilha'), L('The program counter', 'El contador de programa', 'O contador de programa')],
    answer: 0,
    explanation: L('Heap, code, globals, and files are shared; stack and registers are per thread.', 'El montículo, el código, los globales y los archivos se comparten; la pila y los registros son de cada hilo.', 'Heap, código, globais e arquivos são compartilhados; pilha e registradores são de cada thread.') },
  { id: 'os1w3-q2', type: 'fill-blank', lessonId: l3,
    prompt: L('All arrive at 0 with bursts 5, 2, 8 (in that order). The FCFS average waiting time is ___.', 'Todos llegan en 0 con ráfagas 5, 2, 8 (en ese orden). La espera promedio con FCFS es ___.', 'Todos chegam em 0 com rajadas 5, 2, 8 (nessa ordem). A espera média com FCFS é ___.'),
    accepted: ['4'],
    explanation: L('Waits 0, 5, 7: $\\frac{12}{3} = 4$.', 'Esperas 0, 5, 7: $\\frac{12}{3} = 4$.', 'Esperas 0, 5, 7: $\\frac{12}{3} = 4$.') },
  { id: 'os1w3-q3', type: 'fill-blank', lessonId: l3,
    prompt: L('Same jobs (5, 2, 8, all at 0) under SJF: the average waiting time is ___.', 'Mismos trabajos (5, 2, 8, todos en 0) con SJF: la espera promedio es ___.', 'Mesmos trabalhos (5, 2, 8, todos em 0) com SJF: a espera média é ___.'),
    accepted: ['3'],
    explanation: L('Order 2, 5, 8: waits 0, 2, 7, so $\\frac{9}{3} = 3$.', 'Orden 2, 5, 8: esperas 0, 2, 7, así que $\\frac{9}{3} = 3$.', 'Ordem 2, 5, 8: esperas 0, 2, 7, então $\\frac{9}{3} = 3$.') },
  { id: 'os1w3-q4', type: 'true-false', lessonId: l4,
    prompt: L('True or false: Round Robin always gives a lower average waiting time than SJF.', 'Verdadero o falso: Round Robin siempre da menor espera promedio que SJF.', 'Verdadeiro ou falso: o Round Robin sempre dá menor espera média que o SJF.'),
    options: TF, answer: 1,
    explanation: L('False. In the lesson RR gave 7.5 and SJF 3.5; RR wins on response time, not on waiting.', 'Falso. En la lección RR dio 7,5 y SJF 3,5; RR gana en respuesta, no en espera.', 'Falso. Na lição o RR deu 7,5 e o SJF 3,5; o RR ganha na resposta, não na espera.') },
  { id: 'os1w3-q5', type: 'scenario', lessonId: l4,
    prompt: L('On a busy server, a low-priority report has not run for two days. What happened and what fixes it?', 'En un servidor ocupado, un informe de baja prioridad lleva dos días sin correr. ¿Qué pasó y qué lo corrige?', 'Em um servidor ocupado, um relatório de baixa prioridade não roda há dois dias. O que aconteceu e o que corrige?'),
    options: [L('Starvation; aging', 'Inanición; envejecimiento', 'Inanição; envelhecimento'), L('Deadlock; more RAM', 'Interbloqueo; más RAM', 'Impasse; mais RAM'), L('Convoy effect; FCFS', 'Efecto convoy; FCFS', 'Efeito comboio; FCFS')],
    answer: 0,
    explanation: L('Higher-priority work keeps winning; aging raises the report\'s priority as it waits.', 'El trabajo de mayor prioridad siempre gana; el envejecimiento sube la prioridad del informe mientras espera.', 'O trabalho de prioridade maior sempre vence; o envelhecimento aumenta a prioridade do relatório enquanto espera.') },
  { id: 'os1w3-q6', type: 'matching', lessonId: l4,
    prompt: L('Match each algorithm with its property.', 'Une cada algoritmo con su propiedad.', 'Ligue cada algoritmo à sua propriedade.'),
    left: [L('FCFS', 'FCFS', 'FCFS'), L('SJF', 'SJF', 'SJF'), L('Round Robin', 'Round Robin', 'Round Robin'), L('SRTF', 'SRTF', 'SRTF')],
    right: [L('Convoy effect', 'Efecto convoy', 'Efeito comboio'), L('Minimum average wait, non-preemptive', 'Espera promedio mínima, no expropiativo', 'Menor espera média, não preemptivo'), L('Quantum and good response', 'Quantum y buena respuesta', 'Quantum e boa resposta'), L('Preemptive by remaining time', 'Expropiativo por tiempo restante', 'Preemptivo pelo tempo restante')],
    answer: [0, 1, 2, 3],
    explanation: L('Each algorithm trades simplicity, waiting, and response differently.', 'Cada algoritmo equilibra distinto la simplicidad, la espera y la respuesta.', 'Cada algoritmo equilibra de um jeito simplicidade, espera e resposta.') },
  { id: 'os1w3-q7', type: 'multiple-choice', lessonId: l5,
    prompt: L('What does Linux CFS always run next?', '¿Qué ejecuta siempre después el CFS de Linux?', 'O que o CFS do Linux sempre roda em seguida?'),
    options: [L('The task with the smallest virtual runtime', 'La tarea con menor tiempo virtual', 'A tarefa com menor tempo virtual'), L('The newest task', 'La tarea más nueva', 'A tarefa mais nova'), L('The task with the biggest PID', 'La tarea con el PID más grande', 'A tarefa com o maior PID')],
    answer: 0,
    explanation: L('The task that has had the least weighted CPU time goes next.', 'La tarea que menos tiempo de CPU ponderado recibió va primero.', 'A tarefa que recebeu menos tempo de CPU ponderado vai primeiro.') },
  { id: 'os1w3-q8', type: 'code', lessonId: l6,
    prompt: L('Two threads run this function once each, with `count` starting at 0. Which final values are possible?', 'Dos hilos ejecutan esta función una vez cada uno, con `count` empezando en 0. ¿Qué valores finales son posibles?', 'Duas threads rodam esta função uma vez cada, com `count` começando em 0. Quais valores finais são possíveis?'),
    code: 'void add(void) {\n    int tmp = count;   /* read  */\n    tmp = tmp + 1;     /* add   */\n    count = tmp;       /* write */\n}',
    options: [L('1 or 2', '1 o 2', '1 ou 2'), L('Always 2', 'Siempre 2', 'Sempre 2'), L('0, 1, or 2', '0, 1 o 2', '0, 1 ou 2')],
    answer: 0,
    explanation: L('If both read 0 before either writes, the result is 1; otherwise 2. A mutex makes it always 2.', 'Si ambos leen 0 antes de que alguno escriba, queda 1; si no, 2. Un mutex lo deja siempre en 2.', 'Se as duas leem 0 antes de alguma escrever, fica 1; senão 2. Um mutex deixa sempre 2.') },
  { id: 'os1w3-q9', type: 'short-answer', lessonId: l6,
    prompt: L('Which lock keeps a waiting thread looping instead of sleeping?', '¿Qué candado mantiene a un hilo que espera dando vueltas en lugar de dormir?', 'Qual trava mantém uma thread que espera girando em vez de dormir?'),
    accepted: ['spin'],
    explanation: L('A spinlock: useful only for very short waits on multicore.', 'Un cerrojo de giro (spinlock): útil solo para esperas muy cortas en multinúcleo.', 'Uma trava giratória (spinlock): útil só para esperas muito curtas em multinúcleo.') },
];

const activities: Activity[] = [
  { id: 'os1w3-act-classify', kind: 'classify', lessonId: l4,
    title: L('Preemptive or not?', '¿Expropiativo o no?', 'Preemptivo ou não?'),
    prompt: L('Sort each algorithm.', 'Clasifica cada algoritmo.', 'Classifique cada algoritmo.'),
    buckets: [L('Non-preemptive', 'No expropiativo', 'Não preemptivo'), L('Preemptive', 'Expropiativo', 'Preemptivo')],
    items: [
      { text: L('FCFS', 'FCFS', 'FCFS'), bucket: 0 },
      { text: L('SJF', 'SJF', 'SJF'), bucket: 0 },
      { text: L('Round Robin', 'Round Robin', 'Round Robin'), bucket: 1 },
      { text: L('SRTF', 'SRTF', 'SRTF'), bucket: 1 },
      { text: L('Linux CFS', 'CFS de Linux', 'CFS do Linux'), bucket: 1 },
    ],
    explanation: L('RR, SRTF, and CFS can interrupt a running job; FCFS and plain SJF cannot.', 'RR, SRTF y CFS pueden interrumpir un trabajo en marcha; FCFS y SJF simple no.', 'RR, SRTF e CFS podem interromper um trabalho em andamento; FCFS e SJF simples não.') },
  { id: 'os1w3-act-fill', kind: 'code-fill', lessonId: l2,
    title: L('Compute one row', 'Calcula una fila', 'Calcule uma linha'),
    prompt: L('A job arrives at 4, needs 3, and ends at 15. Fill in the numbers.', 'Un trabajo llega en 4, necesita 3 y termina en 15. Completa los números.', 'Um trabalho chega em 4, precisa de 3 e termina em 15. Complete os números.'),
    template: 'TAT = 15 - 4 = {0}\nWT  = TAT - 3 = {1}',
    blanks: ['11', '8'],
    explanation: L('$15 - 4 = 11$ and $11 - 3 = 8$.', '$15 - 4 = 11$ y $11 - 3 = 8$.', '$15 - 4 = 11$ e $11 - 3 = 8$.') },
  { id: 'os1w3-act-order', kind: 'order', lessonId: l3,
    title: L('SJF order', 'Orden SJF', 'Ordem SJF'),
    prompt: L('All arrive at 0. Order them as SJF runs them.', 'Todos llegan en 0. Ordénalos como los ejecuta SJF.', 'Todos chegam em 0. Ordene como o SJF os roda.'),
    items: [L('Q (burst 1)', 'Q (ráfaga 1)', 'Q (rajada 1)'), L('R (burst 2)', 'R (ráfaga 2)', 'R (rajada 2)'), L('S (burst 4)', 'S (ráfaga 4)', 'S (rajada 4)'), L('T (burst 6)', 'T (ráfaga 6)', 'T (rajada 6)'), L('U (burst 9)', 'U (ráfaga 9)', 'U (rajada 9)')],
    explanation: L('Shortest first: waits 0, 1, 3, 7, 13, average $\\frac{24}{5} = 4.8$.', 'El más corto primero: esperas 0, 1, 3, 7, 13, promedio $\\frac{24}{5} = 4{,}8$.', 'O mais curto primeiro: esperas 0, 1, 3, 7, 13, média $\\frac{24}{5} = 4{,}8$.') },
  { id: 'os1w3-act-scramble', kind: 'scramble', lessonId: l5,
    title: L('Lower a priority', 'Baja una prioridad', 'Baixe uma prioridade'),
    prompt: L('Set nice value 12 on the running PID 2048.', 'Pon el valor nice 12 al PID 2048 en ejecución.', 'Defina o valor nice 12 no PID 2048 em execução.'),
    tokens: ['renice', '-n', '12', '-p', '2048'],
    explanation: L('`renice` changes a running process; `nice` only applies at start.', '`renice` cambia un proceso en marcha; `nice` solo se aplica al iniciar.', '`renice` altera um processo em execução; `nice` só vale no início.') },
];

const labs: Lab[] = [
  { id: 'os1w3-lab1', kind: 'math', level: 2, minutes: 50,
    title: L('Scheduling by hand: five algorithms, one job set', 'Planificación a mano: cinco algoritmos, un conjunto', 'Escalonamento à mão: cinco algoritmos, um conjunto'),
    goal: L('Draw the Gantt chart and compute waiting and turnaround for each algorithm. Jobs: $P_1$ (arrives 0, burst 5, priority 2), $P_2$ (1, 3, 1), $P_3$ (2, 8, 4), $P_4$ (3, 2, 3); lower number = higher priority; ties go to the earlier arrival; in RR new arrivals join before the preempted job.', 'Dibujar el Gantt y calcular espera y retorno para cada algoritmo. Trabajos: $P_1$ (llega 0, ráfaga 5, prioridad 2), $P_2$ (1, 3, 1), $P_3$ (2, 8, 4), $P_4$ (3, 2, 3); número menor = más prioridad; los empates los gana quien llegó antes; en RR las llegadas nuevas entran antes que el expropiado.', 'Desenhar o Gantt e calcular espera e retorno para cada algoritmo. Trabalhos: $P_1$ (chega 0, rajada 5, prioridade 2), $P_2$ (1, 3, 1), $P_3$ (2, 8, 4), $P_4$ (3, 2, 3); número menor = mais prioridade; empates vão para quem chegou antes; no RR as chegadas novas entram antes do preemptado.'),
    steps: [
      { id: 'os1w3-lab1-s1', title: L('FCFS', 'FCFS', 'FCFS'), commands: ['| P1 0-5 | P2 5-8 | P3 8-16 | P4 16-18 |'],
        expected: L('Waits 0, 4, 6, 13: $\\frac{23}{4} = 5.75$. Turnarounds 5, 7, 14, 15: $\\frac{41}{4} = 10.25$.', 'Esperas 0, 4, 6, 13: $\\frac{23}{4} = 5{,}75$. Retornos 5, 7, 14, 15: $\\frac{41}{4} = 10{,}25$.', 'Esperas 0, 4, 6, 13: $\\frac{23}{4} = 5{,}75$. Retornos 5, 7, 14, 15: $\\frac{41}{4} = 10{,}25$.') },
      { id: 'os1w3-lab1-s2', title: L('SJF (non-preemptive)', 'SJF (no expropiativo)', 'SJF (não preemptivo)'), commands: ['| P1 0-5 | P4 5-7 | P2 7-10 | P3 10-18 |'],
        expected: L('Only $P_1$ exists at 0. Waits $P_1$ 0, $P_2$ 6, $P_3$ 8, $P_4$ 2: $\\frac{16}{4} = 4$.', 'En 0 solo existe $P_1$. Esperas $P_1$ 0, $P_2$ 6, $P_3$ 8, $P_4$ 2: $\\frac{16}{4} = 4$.', 'Em 0 só existe $P_1$. Esperas $P_1$ 0, $P_2$ 6, $P_3$ 8, $P_4$ 2: $\\frac{16}{4} = 4$.') },
      { id: 'os1w3-lab1-s3', title: L('SRTF', 'SRTF', 'SRTF'), commands: ['| P1 0-1 | P2 1-4 | P4 4-6 | P1 6-10 | P3 10-18 |'],
        expected: L('At 1, $P_2$ (3) beats $P_1$\'s remaining 4. Waits 5, 0, 8, 1: $\\frac{14}{4} = 3.5$, the best of the set.', 'En 1, $P_2$ (3) le gana a los 4 que le quedan a $P_1$. Esperas 5, 0, 8, 1: $\\frac{14}{4} = 3{,}5$, la mejor del conjunto.', 'Em 1, $P_2$ (3) vence os 4 que restam a $P_1$. Esperas 5, 0, 8, 1: $\\frac{14}{4} = 3{,}5$, a melhor do conjunto.') },
      { id: 'os1w3-lab1-s4', title: L('Priority (non-preemptive)', 'Prioridad (no expropiativa)', 'Prioridade (não preemptiva)'), commands: ['| P1 0-5 | P2 5-8 | P4 8-10 | P3 10-18 |'],
        expected: L('Waits 0, 4, 8, 5: $\\frac{17}{4} = 4.25$.', 'Esperas 0, 4, 8, 5: $\\frac{17}{4} = 4{,}25$.', 'Esperas 0, 4, 8, 5: $\\frac{17}{4} = 4{,}25$.') },
      { id: 'os1w3-lab1-s5', title: L('Round Robin, q = 2', 'Round Robin, q = 2', 'Round Robin, q = 2'), commands: ['| P1 0-2 | P2 2-4 | P3 4-6 | P1 6-8 | P4 8-10 | P2 10-11 | P3 11-13 | P1 13-14 | P3 14-18 |'],
        expected: L('Completions 14, 11, 18, 10. Waits 9, 7, 8, 5: $\\frac{29}{4} = 7.25$. Compare: RR waits longest but no job waits more than 5 units to start.', 'Finales 14, 11, 18, 10. Esperas 9, 7, 8, 5: $\\frac{29}{4} = 7{,}25$. Compara: RR espera más, pero ningún trabajo tarda más de 5 unidades en empezar.', 'Términos 14, 11, 18, 10. Esperas 9, 7, 8, 5: $\\frac{29}{4} = 7{,}25$. Compare: o RR espera mais, mas nenhum trabalho leva mais de 5 unidades para começar.') },
    ] },
  { id: 'os1w3-lab2', kind: 'shell', level: 2, minutes: 40,
    title: L('Threads and priorities on a real system', 'Hilos y prioridades en un sistema real', 'Threads e prioridades em um sistema real'),
    goal: L('Count threads, watch two CPU-hungry processes share one core under different nice values, and read the policy. Windows lines start with `#`.', 'Contar hilos, ver cómo dos procesos que consumen CPU comparten un núcleo con distintos valores nice y leer la política. Las líneas de Windows empiezan con `#`.', 'Contar threads, ver dois processos famintos de CPU dividirem um núcleo com valores nice diferentes e ler a política. As linhas do Windows começam com `#`.'),
    steps: [
      { id: 'os1w3-lab2-s1', title: L('Count threads', 'Cuenta hilos', 'Conte threads'),
        commands: ['ps -eo pid,nlwp,comm --sort=-nlwp | head -6', 'top -H -p $(pgrep -n bash)', '# Windows: Get-Process | Sort-Object {$_.Threads.Count} -Descending | Select -First 5 Name,@{n="Threads";e={$_.Threads.Count}}'],
        expected: L('`NLWP` is the number of threads; browsers and databases often show dozens. `top -H` lists threads instead of processes.', '`NLWP` es la cantidad de hilos; navegadores y bases de datos suelen mostrar decenas. `top -H` lista hilos en lugar de procesos.', '`NLWP` é o número de threads; navegadores e bancos de dados costumam mostrar dezenas. `top -H` lista threads em vez de processos.') },
      { id: 'os1w3-lab2-s2', title: L('Two busy loops on one core', 'Dos bucles ocupados en un núcleo', 'Dois laços ocupados em um núcleo'),
        commands: ['taskset -c 0 nice -n 0 yes > /dev/null &', 'taskset -c 0 nice -n 10 yes > /dev/null &', 'top   # press 1 to see each core'],
        expected: L('Both `yes` run on core 0. `top` shows about 90% and 10% CPU, matching $\\frac{1024}{1134}$ and $\\frac{110}{1134}$.', 'Ambos `yes` corren en el núcleo 0. `top` muestra cerca de 90% y 10% de CPU, como $\\frac{1024}{1134}$ y $\\frac{110}{1134}$.', 'Os dois `yes` rodam no núcleo 0. `top` mostra cerca de 90% e 10% de CPU, como $\\frac{1024}{1134}$ e $\\frac{110}{1134}$.') },
      { id: 'os1w3-lab2-s3', title: L('Change a priority live', 'Cambia una prioridad en vivo', 'Mude uma prioridade ao vivo'),
        commands: ['renice -n 0 -p $(pgrep -n yes)', 'ps -o pid,ni,%cpu,cmd -C yes', '# Windows: Task Manager > Details > right click > Set priority > Below normal'],
        expected: L('With both at nice 0 the split becomes about 50% and 50%.', 'Con ambos en nice 0 el reparto pasa a ser cerca de 50% y 50%.', 'Com os dois em nice 0 a divisão fica perto de 50% e 50%.') },
      { id: 'os1w3-lab2-s4', title: L('Read the policy and clean up', 'Lee la política y limpia', 'Leia a política e limpe'),
        commands: ['chrt -p $(pgrep -n yes)', 'kill $(pgrep yes)', '# Windows: start /low notepad   (starts a program with low priority)'],
        expected: L('`chrt` prints `SCHED_OTHER` with priority 0. `kill` ends both loops; check with `pgrep yes` (no output).', '`chrt` imprime `SCHED_OTHER` con prioridad 0. `kill` termina ambos bucles; compruébalo con `pgrep yes` (sin salida).', '`chrt` imprime `SCHED_OTHER` com prioridade 0. `kill` encerra os dois laços; confira com `pgrep yes` (sem saída).') },
    ] },
];

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lessons 1–2: threads and scheduling criteria.', 'Lecciones 1–2: hilos y criterios de planificación.', 'Lições 1–2: threads e critérios de escalonamento.'), minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 3: FCFS and SJF with Gantt charts.', 'Lección 3: FCFS y SJF con diagramas de Gantt.', 'Lição 3: FCFS e SJF com diagramas de Gantt.'), minutes: 35, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 4 and Lab 1 on paper.', 'Lección 4 y Laboratorio 1 en papel.', 'Lição 4 e Laboratório 1 no papel.'), minutes: 75, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 5 and Lab 2.', 'Lección 5 y Laboratorio 2.', 'Lição 5 e Laboratório 2.'), minutes: 60, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 6: critical sections.', 'Lección 6: secciones críticas.', 'Lição 6: seções críticas.'), minutes: 30, kind: 'read' },
  { day: 'Day 6', focus: L('Flashcards and activities.', 'Tarjetas y actividades.', 'Cartões e atividades.'), minutes: 25, kind: 'review' },
  { day: 'Day 7', focus: L('Quiz.', 'Cuestionario.', 'Questionário.'), minutes: 30, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'os1w3-r-wiki', title: 'Wikipedia: Scheduling (computing)', url: 'https://en.wikipedia.org/wiki/Scheduling_(computing)', kind: 'article', verifiedOn: '2026-11-04', note: L('Overview of scheduling algorithms.', 'Panorama de algoritmos de planificación.', 'Panorama dos algoritmos de escalonamento.') },
  { id: 'os1w3-r-sched', title: 'man7.org: sched(7)', url: 'https://man7.org/linux/man-pages/man7/sched.7.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Linux policies, priorities, and nice.', 'Políticas, prioridades y nice en Linux.', 'Políticas, prioridades e nice no Linux.') },
  { id: 'os1w3-r-cfs', title: 'Linux kernel docs: CFS scheduler', url: 'https://docs.kernel.org/scheduler/sched-design-CFS.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Virtual runtime and the red-black tree.', 'Tiempo virtual y el árbol rojo-negro.', 'Tempo virtual e a árvore rubro-negra.') },
  { id: 'os1w3-r-pthreads', title: 'man7.org: pthreads(7)', url: 'https://man7.org/linux/man-pages/man7/pthreads.7.html', kind: 'article', verifiedOn: '2026-11-04', note: L('POSIX threads on Linux.', 'Hilos POSIX en Linux.', 'Threads POSIX no Linux.') },
  { id: 'os1w3-r-ms', title: 'Microsoft Learn: Scheduling priorities', url: 'https://learn.microsoft.com/en-us/windows/win32/procthread/scheduling-priorities', kind: 'article', verifiedOn: '2026-11-04', note: L('The 32 Windows priority levels.', 'Los 32 niveles de prioridad de Windows.', 'Os 32 níveis de prioridade do Windows.') },
];

/** Operating Systems 1, Week 3: threads and CPU scheduling. */
export const os1Week3: WeekContent = {
  id: 'y1-t1-m2-os-w3', year: 1, term: 1, module: 2, week: 3, subject: 'operating-systems-1',
  title: L('Threads and CPU scheduling', 'Hilos y planificación de CPU', 'Threads e escalonamento de CPU'),
  intro: L('Who gets the CPU next? This week: threads inside a process, the criteria for judging a scheduler, FCFS, SJF, priority, Round Robin, and SRTF worked out with Gantt charts, how Linux and Windows really decide, and how to keep shared data safe with mutexes and semaphores.',
    '¿Quién usa la CPU después? Esta semana: hilos dentro de un proceso, los criterios para juzgar un planificador, FCFS, SJF, prioridad, Round Robin y SRTF resueltos con diagramas de Gantt, cómo deciden de verdad Linux y Windows, y cómo proteger los datos compartidos con mutex y semáforos.',
    'Quem usa a CPU em seguida? Nesta semana: threads dentro de um processo, os critérios para julgar um escalonador, FCFS, SJF, prioridade, Round Robin e SRTF resolvidos com diagramas de Gantt, como Linux e Windows decidem de verdade, e como proteger dados compartilhados com mutex e semáforos.'),
  objectives: [
    L('Explain threads and the threading models.', 'Explicar los hilos y los modelos de hilos.', 'Explicar threads e os modelos de threads.'),
    L('Compute waiting, turnaround, and response from a Gantt chart.', 'Calcular espera, retorno y respuesta con un diagrama de Gantt.', 'Calcular espera, retorno e resposta com um diagrama de Gantt.'),
    L('Apply FCFS, SJF, priority, RR, and SRTF and compare them.', 'Aplicar FCFS, SJF, prioridad, RR y SRTF y compararlos.', 'Aplicar FCFS, SJF, prioridade, RR e SRTF e compará-los.'),
    L('Describe the Linux and Windows schedulers and use `nice`.', 'Describir los planificadores de Linux y Windows y usar `nice`.', 'Descrever os escalonadores do Linux e do Windows e usar `nice`.'),
    L('Protect critical sections and avoid deadlock.', 'Proteger secciones críticas y evitar el interbloqueo.', 'Proteger seções críticas e evitar impasse.'),
  ],
  prerequisites: [L('Week 2: processes, states, and the ready queue.', 'Semana 2: procesos, estados y la cola de listos.', 'Semana 2: processos, estados e a fila de prontos.')],
  keyConcepts: [
    L('Thread', 'Hilo', 'Thread'), L('Preemption', 'Expropiación', 'Preempção'), L('Gantt chart', 'Diagrama de Gantt', 'Diagrama de Gantt'),
    L('Round Robin', 'Round Robin', 'Round Robin'), L('Aging', 'Envejecimiento', 'Envelhecimento'), L('Mutex and semaphore', 'Mutex y semáforo', 'Mutex e semáforo'),
  ],
  estimatedMinutes: 295,
  sequence: [
    L('Lessons 1–2: threads and how to measure a scheduler.', 'Lecciones 1–2: hilos y cómo medir un planificador.', 'Lições 1–2: threads e como medir um escalonador.'),
    L('Lessons 3–4 and Lab 1: the algorithms by hand.', 'Lecciones 3–4 y Laboratorio 1: los algoritmos a mano.', 'Lições 3–4 e Laboratório 1: os algoritmos à mão.'),
    L('Lesson 5 and Lab 2: real schedulers. Lesson 6, then the quiz.', 'Lección 5 y Laboratorio 2: planificadores reales. Lección 6 y luego el cuestionario.', 'Lição 5 e Laboratório 2: escalonadores reais. Lição 6 e depois o questionário.'),
  ],
  outcomes: [
    L('You can schedule any small job set by hand and check the averages.', 'Puedes planificar a mano cualquier conjunto pequeño y comprobar los promedios.', 'Você consegue escalonar à mão qualquer conjunto pequeno e conferir as médias.'),
    L('You can spot a race condition and fix it with a lock.', 'Puedes detectar una condición de carrera y corregirla con un candado.', 'Você consegue achar uma condição de corrida e corrigi-la com uma trava.'),
  ],
  checklist: [
    L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'),
    L('Solve Lab 1 on paper and check every step', 'Resolver el Laboratorio 1 en papel y revisar cada paso', 'Resolver o Laboratório 1 no papel e conferir cada passo'),
    L('Finish Lab 2', 'Terminar el Laboratorio 2', 'Terminar o Laboratório 2'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Forgetting that a job cannot run before it arrives.', 'Olvidar que un trabajo no puede correr antes de llegar.', 'Esquecer que um trabalho não pode rodar antes de chegar.'), fix: L('At each decision, list the jobs that have arrived and nothing else.', 'En cada decisión, lista los trabajos que ya llegaron y nada más.', 'Em cada decisão, liste os trabalhos que já chegaram e nada mais.') },
  ],
  lessons: os1Week3Lessons, flashcards, questions, labs, plan, resources, activities,
  stories: [], tools: [], videos: [], documents: [],
};
