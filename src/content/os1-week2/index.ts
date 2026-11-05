import type { Activity, ExternalResource, Flashcard, Lab, Localized, Question, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { os1Week2Lessons } from './lessons';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

const l1 = 'os1w2-l1-process-and-pcb';
const l2 = 'os1w2-l2-life-of-a-process';
const l3 = 'os1w2-l3-queues-and-schedulers';
const l4 = 'os1w2-l4-ipc';
const l5 = 'os1w2-l5-client-server';

const flashcards: Flashcard[] = [
  { id: 'os1w2-c1', lessonId: l1, kind: 'distinction', front: L('Program vs process', 'Programa vs proceso', 'Programa vs processo'), back: L('A program is a passive file; a process is that program running.', 'Un programa es un archivo pasivo; un proceso es ese programa en ejecución.', 'Um programa é um arquivo passivo; um processo é esse programa rodando.') },
  { id: 'os1w2-c2', lessonId: l1, kind: 'concept', front: L('PCB', 'PCB', 'PCB'), back: L('State, PID, program counter, registers, memory limits, open files, priority, CPU time.', 'Estado, PID, contador de programa, registros, límites de memoria, archivos abiertos, prioridad, tiempo de CPU.', 'Estado, PID, contador de programa, registradores, limites de memória, arquivos abertos, prioridade, tempo de CPU.') },
  { id: 'os1w2-c3', lessonId: l1, kind: 'concept', front: L('Text, data, heap, stack', 'Texto, datos, montículo, pila', 'Texto, dados, heap, pilha'), back: L('Code; globals; dynamic memory (grows up); calls and locals (grows down).', 'Código; globales; memoria dinámica (crece hacia arriba); llamadas y locales (crece hacia abajo).', 'Código; globais; memória dinâmica (cresce para cima); chamadas e locais (cresce para baixo).') },
  { id: 'os1w2-c4', lessonId: l2, kind: 'concept', front: L('Five process states', 'Cinco estados de un proceso', 'Cinco estados de um processo'), back: L('New, ready, running, waiting, terminated.', 'Nuevo, listo, ejecutando, esperando, terminado.', 'Novo, pronto, executando, esperando, terminado.') },
  { id: 'os1w2-c5', lessonId: l2, kind: 'command', front: L('`fork` / `exec` / `wait`', '`fork` / `exec` / `wait`', '`fork` / `exec` / `wait`'), back: L('Copy the process; load a new program into it; let the parent collect the exit code.', 'Copiar el proceso; cargarle un programa nuevo; que el padre recoja el código de salida.', 'Copiar o processo; carregar nele um programa novo; o pai recolher o código de saída.') },
  { id: 'os1w2-c6', lessonId: l2, kind: 'distinction', front: L('Zombie vs orphan', 'Zombi vs huérfano', 'Zumbi vs órfão'), back: L('Zombie: finished, parent has not waited. Orphan: running, parent died; PID 1 adopts it.', 'Zombi: terminó y el padre no esperó. Huérfano: corre y el padre murió; lo adopta el PID 1.', 'Zumbi: terminou e o pai não esperou. Órfão: roda e o pai morreu; o PID 1 o adota.') },
  { id: 'os1w2-c7', lessonId: l3, kind: 'concept', front: L('Context switch', 'Cambio de contexto', 'Troca de contexto'), back: L('Save one process\'s registers in its PCB and load another\'s; pure overhead.', 'Guardar los registros de un proceso en su PCB y cargar los de otro; puro costo.', 'Salvar os registradores de um processo no PCB e carregar os de outro; puro custo.') },
  { id: 'os1w2-c8', lessonId: l3, kind: 'concept', front: L('SMP', 'SMP', 'SMP'), back: L('One shared OS that any core can run, guarded by locks.', 'Un SO compartido que cualquier núcleo puede ejecutar, protegido con candados.', 'Um SO compartilhado que qualquer núcleo pode rodar, protegido por travas.') },
  { id: 'os1w2-c9', lessonId: l4, kind: 'distinction', front: L('Anonymous pipe vs FIFO', 'Tubería anónima vs FIFO', 'Pipe anônimo vs FIFO'), back: L('Anonymous: related processes, `pipe()`. FIFO: has a name, `mkfifo`, anyone can open it.', 'Anónima: procesos emparentados, `pipe()`. FIFO: tiene nombre, `mkfifo`, cualquiera la abre.', 'Anônimo: processos aparentados, `pipe()`. FIFO: tem nome, `mkfifo`, qualquer um abre.') },
  { id: 'os1w2-c10', lessonId: l4, kind: 'command', front: L('`kill -15` vs `kill -9`', '`kill -15` vs `kill -9`', '`kill -15` vs `kill -9`'), back: L('`SIGTERM` asks politely; `SIGKILL` ends at once and cannot be caught.', '`SIGTERM` pide con amabilidad; `SIGKILL` termina de inmediato y no se puede atrapar.', '`SIGTERM` pede com educação; `SIGKILL` encerra na hora e não pode ser capturado.') },
  { id: 'os1w2-c11', lessonId: l5, kind: 'concept', front: L('RPC stub', 'Stub de RPC', 'Stub de RPC'), back: L('Code that packs a call into a message on one side and unpacks it on the other.', 'Código que empaqueta una llamada en un mensaje de un lado y la desempaqueta del otro.', 'Código que empacota uma chamada em mensagem de um lado e desempacota do outro.') },
];

const questions: Question[] = [
  { id: 'os1w2-q1', type: 'multiple-choice', lessonId: l1,
    prompt: L('Which item is NOT stored in a PCB?', '¿Qué elemento NO se guarda en un PCB?', 'Qual item NÃO fica no PCB?'),
    options: [L('The program\'s source code', 'El código fuente del programa', 'O código-fonte do programa'), L('The program counter', 'El contador de programa', 'O contador de programa'), L('The open files', 'Los archivos abiertos', 'Os arquivos abertos')],
    answer: 0,
    explanation: L('The PCB holds the state to resume; the code lives in the text region.', 'El PCB guarda el estado para reanudar; el código vive en la región de texto.', 'O PCB guarda o estado para retomar; o código fica na região de texto.') },
  { id: 'os1w2-q2', type: 'true-false', lessonId: l2,
    prompt: L('True or false: when its disk read finishes, a waiting process goes straight to running.', 'Verdadero o falso: cuando termina su lectura de disco, un proceso en espera pasa directo a ejecutando.', 'Verdadeiro ou falso: quando a leitura de disco termina, um processo esperando vai direto para executando.'),
    options: TF, answer: 1,
    explanation: L('False: it goes to ready and waits for the scheduler.', 'Falso: pasa a listo y espera al planificador.', 'Falso: vai para pronto e espera o escalonador.') },
  { id: 'os1w2-q3', type: 'code', lessonId: l2,
    prompt: L('How many times is "hi" printed?', '¿Cuántas veces se imprime "hi"?', 'Quantas vezes "hi" é impresso?'),
    code: 'int main(void) {\n    fork();\n    fork();\n    printf("hi\\n");\n    return 0;\n}',
    options: [L('4', '4', '4'), L('2', '2', '2'), L('3', '3', '3')],
    answer: 0,
    explanation: L('$2^2 = 4$ processes, each printing once.', '$2^2 = 4$ procesos, cada uno imprime una vez.', '$2^2 = 4$ processos, cada um imprime uma vez.') },
  { id: 'os1w2-q4', type: 'matching', lessonId: l2,
    prompt: L('Match each event with how the process ends.', 'Une cada evento con la forma en que termina el proceso.', 'Ligue cada evento à forma como o processo termina.'),
    left: [L('`main` returns 0', '`main` devuelve 0', '`main` retorna 0'), L('No config file: exits with code 2', 'Sin archivo de configuración: sale con código 2', 'Sem arquivo de configuração: sai com código 2'), L('Segmentation fault', 'Violación de segmento', 'Falha de segmentação'), L('`kill -9` from an admin', '`kill -9` de un administrador', '`kill -9` de um administrador')],
    right: [L('Normal exit', 'Salida normal', 'Saída normal'), L('Error exit', 'Salida por error', 'Saída por erro'), L('Fatal error', 'Error fatal', 'Erro fatal'), L('Killed', 'Matado', 'Morto')],
    answer: [0, 1, 2, 3],
    explanation: L('The first two are voluntary; the last two are imposed.', 'Las dos primeras son voluntarias; las dos últimas, impuestas.', 'As duas primeiras são voluntárias; as duas últimas, impostas.') },
  { id: 'os1w2-q5', type: 'fill-blank', lessonId: l3,
    prompt: L('With slices of 8 ms and switches of 2 ms, the fraction of time lost is ___ %.', 'Con porciones de 8 ms y cambios de 2 ms, la fracción de tiempo perdida es ___ %.', 'Com fatias de 8 ms e trocas de 2 ms, a fração de tempo perdida é ___ %.'),
    accepted: ['20', '20%'],
    explanation: L('$\\frac{2}{8 + 2} = 0{.}2 = 20\\%$.', '$\\frac{2}{8 + 2} = 0{,}2 = 20\\%$.', '$\\frac{2}{8 + 2} = 0{,}2 = 20\\%$.') },
  { id: 'os1w2-q6', type: 'scenario', lessonId: l3,
    prompt: L('In a master/slave multiprocessor, everything slows down when many system calls happen. Why?', 'En un multiprocesador maestro/esclavo, todo se vuelve lento cuando hay muchas llamadas al sistema. ¿Por qué?', 'Em um multiprocessador mestre/escravo, tudo fica lento quando há muitas chamadas de sistema. Por quê?'),
    options: [L('Every request passes through the one master CPU', 'Cada petición pasa por la única CPU maestra', 'Todo pedido passa pela única CPU mestre'), L('Slaves run too many OS copies', 'Los esclavos corren demasiadas copias del SO', 'Os escravos rodam cópias demais do SO'), L('Shared memory is off', 'La memoria compartida está apagada', 'A memória compartilhada está desligada')],
    answer: 0,
    explanation: L('Only the master runs OS code, so it is the bottleneck; SMP removes it.', 'Solo el maestro ejecuta código del SO, así que es el cuello de botella; SMP lo elimina.', 'Só o mestre roda código do SO, então é o gargalo; o SMP o elimina.') },
  { id: 'os1w2-q7', type: 'troubleshooting', lessonId: l4,
    prompt: L('A reader on a pipe never finishes, though the writer sent everything. Most likely bug?', 'Un lector de una tubería nunca termina aunque el escritor ya envió todo. ¿Error más probable?', 'Um leitor de um pipe nunca termina, embora o escritor tenha enviado tudo. Erro mais provável?'),
    options: [L('A write end is still open somewhere', 'Algún extremo de escritura sigue abierto', 'Alguma ponta de escrita continua aberta'), L('The buffer is too big', 'El búfer es demasiado grande', 'O buffer é grande demais'), L('The reader used `read`', 'El lector usó `read`', 'O leitor usou `read`')],
    answer: 0,
    explanation: L('`read` returns 0 only when every write end, including inherited copies, is closed.', '`read` devuelve 0 solo cuando todos los extremos de escritura, incluidas las copias heredadas, están cerrados.', '`read` retorna 0 só quando todas as pontas de escrita, incluindo cópias herdadas, estão fechadas.') },
  { id: 'os1w2-q8', type: 'multiple-choice', lessonId: l4,
    prompt: L('Which IPC is fastest for large, frequent exchanges, and what does it require?', '¿Qué IPC es la más rápida para intercambios grandes y frecuentes, y qué exige?', 'Qual IPC é a mais rápida para trocas grandes e frequentes, e o que exige?'),
    options: [L('Shared memory, plus synchronisation', 'Memoria compartida, más sincronización', 'Memória compartilhada, mais sincronização'), L('Pipes, plus administrator rights', 'Tuberías, más permisos de administrador', 'Pipes, mais permissão de administrador'), L('Signals, plus a network', 'Señales, más una red', 'Sinais, mais uma rede')],
    answer: 0,
    explanation: L('No kernel copy per message, but processes must coordinate access themselves.', 'Sin copia por el núcleo en cada mensaje, pero los procesos coordinan el acceso ellos mismos.', 'Sem cópia pelo núcleo a cada mensagem, mas os processos coordenam o acesso sozinhos.') },
  { id: 'os1w2-q9', type: 'short-answer', lessonId: l5,
    prompt: L('In RPC, what is the piece of code that packs and unpacks messages on each side called?', 'En RPC, ¿cómo se llama la pieza de código que empaqueta y desempaqueta mensajes en cada lado?', 'Em RPC, como se chama o trecho de código que empacota e desempacota mensagens em cada lado?'),
    accepted: ['stub'],
    explanation: L('The client stub and the server stub hide the network.', 'El stub del cliente y el del servidor esconden la red.', 'O stub do cliente e o do servidor escondem a rede.') },
];

const activities: Activity[] = [
  { id: 'os1w2-act-states', kind: 'order', lessonId: l2,
    title: L('One process, start to end', 'Un proceso, de principio a fin', 'Um processo, do início ao fim'),
    prompt: L('Order the states of a process that reads a file once and finishes.', 'Ordena los estados de un proceso que lee un archivo una vez y termina.', 'Ordene os estados de um processo que lê um arquivo uma vez e termina.'),
    items: [L('New', 'Nuevo', 'Novo'), L('Ready', 'Listo', 'Pronto'), L('Running: asks for the file', 'Ejecutando: pide el archivo', 'Executando: pede o arquivo'), L('Waiting for the disk', 'Esperando el disco', 'Esperando o disco'), L('Ready again', 'Listo otra vez', 'Pronto de novo'), L('Running until exit', 'Ejecutando hasta salir', 'Executando até sair'), L('Terminated', 'Terminado', 'Terminado')],
    explanation: L('After I/O, a process returns to ready, not to running.', 'Después de la E/S el proceso vuelve a listo, no a ejecutando.', 'Depois da E/S o processo volta para pronto, não para executando.') },
  { id: 'os1w2-act-queues', kind: 'classify', lessonId: l3,
    title: L('Which queue?', '¿Qué cola?', 'Qual fila?'),
    prompt: L('Sort each process into the queue where it waits.', 'Clasifica cada proceso en la cola donde espera.', 'Classifique cada processo na fila onde espera.'),
    buckets: [L('Job queue', 'Cola de trabajos', 'Fila de trabalhos'), L('Ready queue', 'Cola de listos', 'Fila de prontos'), L('Device wait queue', 'Cola de espera', 'Fila de espera')],
    items: [
      { text: L('A nightly report not yet in memory', 'Un informe nocturno aún no en memoria', 'Um relatório noturno ainda fora da memória'), bucket: 0 },
      { text: L('A spreadsheet whose slice ended', 'Una hoja de cálculo cuya porción terminó', 'Uma planilha cuja fatia acabou'), bucket: 1 },
      { text: L('A chat app waiting for a message', 'Una app de chat esperando un mensaje', 'Um app de bate-papo esperando uma mensagem'), bucket: 2 },
      { text: L('A backup waiting for the disk', 'Un respaldo esperando el disco', 'Um backup esperando o disco'), bucket: 2 },
      { text: L('A game just loaded, ready to start', 'Un juego recién cargado, listo para empezar', 'Um jogo recém-carregado, pronto para começar'), bucket: 1 },
    ],
    explanation: L('Not admitted → job queue; only needs a CPU → ready queue; needs a device → its wait queue.', 'No admitido → cola de trabajos; solo necesita CPU → cola de listos; necesita un dispositivo → su cola de espera.', 'Não admitido → fila de trabalhos; só precisa de CPU → fila de prontos; precisa de dispositivo → a fila de espera dele.') },
  { id: 'os1w2-act-scramble', kind: 'scramble', lessonId: l4,
    title: L('Build a pipeline', 'Arma una tubería', 'Monte um pipeline'),
    prompt: L('Rebuild the command that shows the 5 processes using the most memory.', 'Reconstruye el comando que muestra los 5 procesos que más memoria usan.', 'Reconstrua o comando que mostra os 5 processos que mais usam memória.'),
    tokens: ['ps', 'aux', '--sort=-%mem', '|', 'head', '-6'],
    explanation: L('`ps` sorts by memory, descending; `head -6` keeps the header plus 5 lines.', '`ps` ordena por memoria de mayor a menor; `head -6` deja el encabezado más 5 líneas.', '`ps` ordena por memória do maior para o menor; `head -6` mantém o cabeçalho mais 5 linhas.') },
];

const labs: Lab[] = [
  { id: 'os1w2-lab1', kind: 'shell', level: 1, minutes: 45,
    title: L('Watch, pause, and end processes', 'Observa, pausa y termina procesos', 'Observe, pause e encerre processos'),
    goal: L('Start harmless test processes, find them with `ps`, `top`, and `pstree`, change their state with signals, and end them. Windows equivalents follow each step.', 'Iniciar procesos de prueba inofensivos, encontrarlos con `ps`, `top` y `pstree`, cambiar su estado con señales y terminarlos. Cada paso trae su equivalente en Windows.', 'Iniciar processos de teste inofensivos, encontrá-los com `ps`, `top` e `pstree`, mudar seu estado com sinais e encerrá-los. Cada passo traz o equivalente no Windows.'),
    steps: [
      { id: 'os1w2-lab1-s1', title: L('Start two sleepers', 'Inicia dos procesos dormidos', 'Inicie dois processos dormindo'),
        commands: ['sleep 600 &', 'sleep 900 &', 'jobs -l', 'echo "shell PID: $$"', '# Windows (PowerShell): Start-Process notepad; Start-Process notepad'],
        expected: L('Each `&` prints a job number and PID, such as `[1] 5120`; `jobs -l` lists both as Running. `sleep` only waits, so it is safe.', 'Cada `&` imprime un número de trabajo y un PID, como `[1] 5120`; `jobs -l` lista ambos como Running. `sleep` solo espera, así que es seguro.', 'Cada `&` imprime um número de job e um PID, como `[1] 5120`; `jobs -l` lista os dois como Running. `sleep` só espera, então é seguro.') },
      { id: 'os1w2-lab1-s2', title: L('Find them and their parent', 'Encuéntralos y a su padre', 'Encontre-os e o pai'),
        commands: ['ps -o pid,ppid,stat,etime,cmd --ppid $$', 'pstree -p $$', '# Windows: Get-Process notepad | Select Id,StartTime'],
        expected: L('Both `sleep` lines show `PPID` equal to your shell PID and `STAT` `S` (sleeping). `pstree` draws `bash(PID)─┬─sleep` twice.', 'Ambas líneas de `sleep` muestran `PPID` igual al PID de tu intérprete y `STAT` `S` (durmiendo). `pstree` dibuja `bash(PID)─┬─sleep` dos veces.', 'As duas linhas de `sleep` mostram `PPID` igual ao PID do seu interpretador e `STAT` `S` (dormindo). `pstree` desenha `bash(PID)─┬─sleep` duas vezes.') },
      { id: 'os1w2-lab1-s3', title: L('Pause and resume', 'Pausa y reanuda', 'Pause e retome'),
        commands: ['kill -STOP %1', 'ps -o pid,stat,cmd --ppid $$', 'kill -CONT %1', '# Windows: resmon > CPU tab > right click the process > Suspend Process / Resume Process'],
        expected: L('After `SIGSTOP` the first `sleep` shows `T` (stopped); after `SIGCONT` it returns to `S`.', 'Tras `SIGSTOP` el primer `sleep` muestra `T` (detenido); tras `SIGCONT` vuelve a `S`.', 'Depois do `SIGSTOP` o primeiro `sleep` mostra `T` (parado); depois do `SIGCONT` volta a `S`.') },
      { id: 'os1w2-lab1-s4', title: L('Watch live', 'Observa en vivo', 'Observe ao vivo'),
        commands: ['top -u $USER', '# inside top: P sorts by CPU, M by memory, q quits', '# Windows: Ctrl+Shift+Esc > Details'],
        expected: L('The header shows uptime, load average, task counts (running, sleeping, stopped, zombie), CPU and memory; each row shows `PID`, `PR`, `NI`, `%CPU`, `%MEM`, `COMMAND`.', 'El encabezado muestra tiempo encendido, carga promedio, conteo de tareas (running, sleeping, stopped, zombie), CPU y memoria; cada fila muestra `PID`, `PR`, `NI`, `%CPU`, `%MEM`, `COMMAND`.', 'O cabeçalho mostra tempo ligado, carga média, contagem de tarefas (running, sleeping, stopped, zombie), CPU e memória; cada linha mostra `PID`, `PR`, `NI`, `%CPU`, `%MEM`, `COMMAND`.') },
      { id: 'os1w2-lab1-s5', title: L('End them', 'Termínalos', 'Encerre-os'),
        commands: ['kill %1', 'kill -9 %2', 'jobs -l', '# Windows: Stop-Process -Name notepad   (or: taskkill /im notepad.exe /f)'],
        expected: L('`kill` sends `SIGTERM` and the job shows Terminated; `kill -9` sends `SIGKILL` and shows Killed. Try `SIGTERM` first so programs can save.', '`kill` envía `SIGTERM` y el trabajo muestra Terminated; `kill -9` envía `SIGKILL` y muestra Killed. Prueba primero `SIGTERM` para que los programas guarden.', '`kill` envia `SIGTERM` e o job mostra Terminated; `kill -9` envia `SIGKILL` e mostra Killed. Tente primeiro `SIGTERM` para os programas salvarem.') },
    ] },
  { id: 'os1w2-lab2', kind: 'shell', level: 2, minutes: 45,
    title: L('Processes that talk', 'Procesos que conversan', 'Processos que conversam'),
    goal: L('Use pipes in the shell, connect two terminals with a FIFO, compile the pipe program from Lesson 4, and watch one HTTP request. Work in `~/os-lab/week2`.', 'Usar tuberías en el intérprete, conectar dos terminales con una FIFO, compilar el programa de la Lección 4 y observar una petición HTTP. Trabaja en `~/os-lab/week2`.', 'Usar pipes no interpretador, ligar dois terminais com uma FIFO, compilar o programa da Lição 4 e observar um pedido HTTP. Trabalhe em `~/os-lab/week2`.'),
    steps: [
      { id: 'os1w2-lab2-s1', title: L('Pipes in the shell', 'Tuberías en el intérprete', 'Pipes no interpretador'),
        commands: ['mkdir -p ~/os-lab/week2 && cd ~/os-lab/week2', 'ps -eo comm | sort | uniq -c | sort -nr | head -5', '# Windows: Get-Process | Group-Object Name | Sort-Object Count -Descending | Select -First 5'],
        expected: L('The 5 program names with the most processes, such as `14 kworker`. Each `|` connects one process\'s output to the next one\'s input.', 'Los 5 nombres de programa con más procesos, como `14 kworker`. Cada `|` conecta la salida de un proceso con la entrada del siguiente.', 'Os 5 nomes de programa com mais processos, como `14 kworker`. Cada `|` liga a saída de um processo à entrada do seguinte.') },
      { id: 'os1w2-lab2-s2', title: L('A FIFO between two terminals', 'Una FIFO entre dos terminales', 'Uma FIFO entre dois terminais'),
        commands: ['mkfifo scores', 'ls -l scores', '# terminal A:  cat scores', '# terminal B:  cd ~/os-lab/week2 && echo "final: 3-1" > scores'],
        expected: L('`ls -l` starts with `p` (pipe). In A, `cat` blocks until B writes; then the line appears and `cat` ends.', '`ls -l` empieza con `p` (tubería). En A, `cat` se bloquea hasta que B escribe; entonces aparece la línea y `cat` termina.', '`ls -l` começa com `p` (pipe). Em A, `cat` bloqueia até B escrever; então a linha aparece e `cat` termina.') },
      { id: 'os1w2-lab2-s3', title: L('fork and pipe in C', 'fork y tubería en C', 'fork e pipe em C'),
        commands: ['nano pipe_demo.c    # paste the program from Lesson 4', 'gcc pipe_demo.c -o pipe_demo && ./pipe_demo', '# Windows: run it inside WSL; native Windows uses CreateProcess and CreatePipe instead'],
        expected: L('It prints `child got: goal in minute 90`. If `gcc` is missing: `sudo apt install gcc`.', 'Imprime `child got: goal in minute 90`. Si falta `gcc`: `sudo apt install gcc`.', 'Imprime `child got: goal in minute 90`. Se faltar `gcc`: `sudo apt install gcc`.') },
      { id: 'os1w2-lab2-s4', title: L('One request, one response', 'Una petición, una respuesta', 'Um pedido, uma resposta'),
        commands: ['curl -sI https://example.com', '# Windows: Invoke-WebRequest https://example.com -Method Head'],
        expected: L('Only the headers: `HTTP/2 200` and `content-type: text/html`. Your shell is the client process.', 'Solo los encabezados: `HTTP/2 200` y `content-type: text/html`. Tu intérprete es el proceso cliente.', 'Só os cabeçalhos: `HTTP/2 200` e `content-type: text/html`. Seu interpretador é o processo cliente.') },
      { id: 'os1w2-lab2-s5', title: L('Clean up', 'Limpia', 'Limpe'),
        commands: ['rm scores pipe_demo', 'ls'],
        expected: L('Only `pipe_demo.c` remains; a FIFO stores nothing on disk.', 'Solo queda `pipe_demo.c`; una FIFO no guarda nada en disco.', 'Só sobra `pipe_demo.c`; uma FIFO não guarda nada no disco.') },
    ] },
];

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lesson 1: process, memory regions, PCB.', 'Lección 1: proceso, regiones de memoria, PCB.', 'Lição 1: processo, regiões de memória, PCB.'), minutes: 25, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 2 and Lab 1.', 'Lección 2 y Laboratorio 1.', 'Lição 2 e Laboratório 1.'), minutes: 70, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3: queues and context switches.', 'Lección 3: colas y cambios de contexto.', 'Lição 3: filas e trocas de contexto.'), minutes: 25, kind: 'read' },
  { day: 'Day 4', focus: L('Lesson 4 and Lab 2, steps 1–3.', 'Lección 4 y Laboratorio 2, pasos 1–3.', 'Lição 4 e Laboratório 2, passos 1–3.'), minutes: 60, kind: 'practice' },
  { day: 'Day 5', focus: L('Lesson 5 and the rest of Lab 2.', 'Lección 5 y el resto del Laboratorio 2.', 'Lição 5 e o resto do Laboratório 2.'), minutes: 40, kind: 'practice' },
  { day: 'Day 6', focus: L('Flashcards and activities.', 'Tarjetas y actividades.', 'Cartões e atividades.'), minutes: 25, kind: 'review' },
  { day: 'Day 7', focus: L('Quiz.', 'Cuestionario.', 'Questionário.'), minutes: 25, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'os1w2-r-wiki', title: 'Wikipedia: Process (computing)', url: 'https://en.wikipedia.org/wiki/Process_(computing)', kind: 'article', verifiedOn: '2026-11-04', note: L('Processes, states, and the PCB.', 'Procesos, estados y el PCB.', 'Processos, estados e o PCB.') },
  { id: 'os1w2-r-ps', title: 'man7.org: ps(1)', url: 'https://man7.org/linux/man-pages/man1/ps.1.html', kind: 'article', verifiedOn: '2026-11-04', note: L('All `ps` options and the `STAT` codes.', 'Todas las opciones de `ps` y los códigos `STAT`.', 'Todas as opções do `ps` e os códigos `STAT`.') },
  { id: 'os1w2-r-fork', title: 'man7.org: fork(2)', url: 'https://man7.org/linux/man-pages/man2/fork.2.html', kind: 'article', verifiedOn: '2026-11-04', note: L('What a child inherits.', 'Qué hereda un hijo.', 'O que um filho herda.') },
  { id: 'os1w2-r-pipe', title: 'man7.org: pipe(7)', url: 'https://man7.org/linux/man-pages/man7/pipe.7.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Pipes and FIFOs on Linux.', 'Tuberías y FIFO en Linux.', 'Pipes e FIFOs no Linux.') },
  { id: 'os1w2-r-signal', title: 'man7.org: signal(7)', url: 'https://man7.org/linux/man-pages/man7/signal.7.html', kind: 'article', verifiedOn: '2026-11-04', note: L('The list of signals.', 'La lista de señales.', 'A lista de sinais.') },
  { id: 'os1w2-r-ms', title: 'Microsoft Learn: About processes and threads', url: 'https://learn.microsoft.com/en-us/windows/win32/procthread/about-processes-and-threads', kind: 'article', verifiedOn: '2026-11-04', note: L('How Windows models processes.', 'Cómo modela Windows los procesos.', 'Como o Windows modela processos.') },
  { id: 'os1w2-r-grpc', title: 'gRPC: Introduction', url: 'https://grpc.io/docs/what-is-grpc/introduction/', kind: 'article', verifiedOn: '2026-11-04', note: L('A modern RPC system with stubs.', 'Un sistema RPC moderno con stubs.', 'Um sistema RPC moderno com stubs.') },
];

/** Operating Systems 1, Week 2: process management. */
export const os1Week2: WeekContent = {
  id: 'y1-t1-m2-os-w2', year: 1, term: 1, module: 2, week: 2, subject: 'operating-systems-1',
  title: L('Process management', 'Gestión de procesos', 'Gerenciamento de processos'),
  intro: L('A process is a program in execution, the basic unit of work of every OS. This week: what a process is made of, how it is born and dies, how the OS queues and switches processes, how they talk through pipes and shared memory, and how processes on different machines talk through requests and remote calls.',
    'Un proceso es un programa en ejecución, la unidad básica de trabajo de todo SO. Esta semana: de qué está hecho un proceso, cómo nace y muere, cómo el SO lo pone en colas y lo cambia, cómo se comunican los procesos con tuberías y memoria compartida, y cómo hablan procesos en máquinas distintas con peticiones y llamadas remotas.',
    'Um processo é um programa em execução, a unidade básica de trabalho de todo SO. Nesta semana: do que um processo é feito, como nasce e morre, como o SO o coloca em filas e o troca, como os processos se comunicam por pipes e memória compartilhada, e como processos em máquinas diferentes conversam por pedidos e chamadas remotas.'),
  objectives: [
    L('Tell a program from a process and describe the PCB.', 'Distinguir programa de proceso y describir el PCB.', 'Distinguir programa de processo e descrever o PCB.'),
    L('Trace states, creation (`fork`/`exec`), and termination.', 'Seguir estados, creación (`fork`/`exec`) y terminación.', 'Acompanhar estados, criação (`fork`/`exec`) e término.'),
    L('Describe queues, schedulers, context switches, and SMP.', 'Describir colas, planificadores, cambios de contexto y SMP.', 'Descrever filas, escalonadores, trocas de contexto e SMP.'),
    L('Compare pipes, FIFOs, and shared memory.', 'Comparar tuberías, FIFO y memoria compartida.', 'Comparar pipes, FIFOs e memória compartilhada.'),
    L('Explain request/response and RPC.', 'Explicar petición/respuesta y RPC.', 'Explicar pedido/resposta e RPC.'),
  ],
  prerequisites: [L('Week 1: kernel, user mode, system calls, the terminal.', 'Semana 1: núcleo, modo usuario, llamadas al sistema, la terminal.', 'Semana 1: núcleo, modo usuário, chamadas de sistema, o terminal.')],
  keyConcepts: [
    L('Process', 'Proceso', 'Processo'), L('PCB', 'PCB', 'PCB'), L('Process states', 'Estados del proceso', 'Estados do processo'),
    L('Context switch', 'Cambio de contexto', 'Troca de contexto'), L('Pipes and shared memory', 'Tuberías y memoria compartida', 'Pipes e memória compartilhada'), L('RPC', 'RPC', 'RPC'),
  ],
  estimatedMinutes: 270,
  sequence: [
    L('Lessons 1–2 and Lab 1: what a process is and how it lives.', 'Lecciones 1–2 y Laboratorio 1: qué es un proceso y cómo vive.', 'Lições 1–2 e Laboratório 1: o que é um processo e como vive.'),
    L('Lesson 3: queues and multicore.', 'Lección 3: colas y multinúcleo.', 'Lição 3: filas e multinúcleo.'),
    L('Lessons 4–5 and Lab 2: processes that communicate. Then the quiz.', 'Lecciones 4–5 y Laboratorio 2: procesos que se comunican. Luego el cuestionario.', 'Lições 4–5 e Laboratório 2: processos que se comunicam. Depois o questionário.'),
  ],
  outcomes: [
    L('You can find any process, read its state, and stop it safely.', 'Puedes encontrar cualquier proceso, leer su estado y detenerlo con seguridad.', 'Você consegue achar qualquer processo, ler seu estado e pará-lo com segurança.'),
    L('You can choose an IPC mechanism and justify it.', 'Puedes elegir un mecanismo de IPC y justificarlo.', 'Você consegue escolher um mecanismo de IPC e justificá-lo.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Using `kill -9` first.', 'Usar `kill -9` de entrada.', 'Usar `kill -9` logo de cara.'), fix: L('Send `SIGTERM` first so the program can save and clean up.', 'Envía primero `SIGTERM` para que el programa guarde y limpie.', 'Envie primeiro `SIGTERM` para o programa salvar e limpar.') },
  ],
  lessons: os1Week2Lessons, flashcards, questions, labs, plan, resources, activities,
  stories: [], tools: [], videos: [], documents: [],
};
