import type { Activity, ExternalResource, Flashcard, Lab, Localized, Question, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { os1Week1Lessons } from './lessons';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

const l1 = 'os1w1-l1-what-is-an-os';
const l2 = 'os1w1-l2-history-and-kinds';
const l3 = 'os1w1-l3-services';
const l4 = 'os1w1-l4-structure-and-boot';
const l5 = 'os1w1-l5-tree-and-interfaces';

const flashcards: Flashcard[] = [
  { id: 'os1w1-c1', lessonId: l1, kind: 'concept', front: L('Operating system', 'Sistema operativo', 'Sistema operacional'), back: L('The layer between hardware and programs: hides details and shares resources.', 'La capa entre el hardware y los programas: esconde detalles y reparte recursos.', 'A camada entre o hardware e os programas: esconde detalhes e divide recursos.') },
  { id: 'os1w1-c2', lessonId: l1, kind: 'concept', front: L('Kernel', 'Núcleo', 'Núcleo'), back: L('The core of the OS, running in kernel mode: CPU, memory, devices.', 'El centro del SO, en modo núcleo: CPU, memoria, dispositivos.', 'O centro do SO, em modo núcleo: CPU, memória, dispositivos.') },
  { id: 'os1w1-c3', lessonId: l1, kind: 'distinction', front: L('User mode vs kernel mode', 'Modo usuario vs modo núcleo', 'Modo usuário vs modo núcleo'), back: L('User mode blocks privileged instructions; programs cross into kernel mode only by system calls.', 'El modo usuario bloquea instrucciones privilegiadas; los programas pasan al modo núcleo solo con llamadas al sistema.', 'O modo usuário bloqueia instruções privilegiadas; os programas passam ao modo núcleo só por chamadas de sistema.') },
  { id: 'os1w1-c4', lessonId: l1, kind: 'concept', front: L('Interrupt', 'Interrupción', 'Interrupção'), back: L('A device signal to the CPU: "an event happened".', 'Una señal de un dispositivo a la CPU: "ocurrió un evento".', 'Um sinal de um dispositivo para a CPU: "aconteceu um evento".') },
  { id: 'os1w1-c5', lessonId: l2, kind: 'concept', front: L('Multiprogramming', 'Multiprogramación', 'Multiprogramação'), back: L('Several jobs in memory so the CPU switches when one waits for I/O.', 'Varios trabajos en memoria para que la CPU cambie cuando uno espera E/S.', 'Vários trabalhos na memória para a CPU trocar quando um espera E/S.') },
  { id: 'os1w1-c6', lessonId: l2, kind: 'concept', front: L('GPL', 'GPL', 'GPL'), back: L('Free licence: run, study and change, share, share improvements; copies keep those freedoms.', 'Licencia libre: ejecutar, estudiar y modificar, compartir, compartir mejoras; las copias conservan esas libertades.', 'Licença livre: executar, estudar e modificar, compartilhar, compartilhar melhorias; as cópias mantêm essas liberdades.') },
  { id: 'os1w1-c7', lessonId: l3, kind: 'concept', front: L('System call', 'Llamada al sistema', 'Chamada de sistema'), back: L('A program\'s request to the kernel (`open`, `read`, `fork`) through a controlled trap.', 'La petición de un programa al núcleo (`open`, `read`, `fork`) mediante una trampa controlada.', 'O pedido de um programa ao núcleo (`open`, `read`, `fork`) por uma armadilha controlada.') },
  { id: 'os1w1-c8', lessonId: l4, kind: 'distinction', front: L('Monolithic vs microkernel', 'Monolítico vs micronúcleo', 'Monolítico vs micronúcleo'), back: L('Monolithic: all in kernel mode, fast, fragile. Microkernel: minimum inside, drivers as processes, isolated, slower.', 'Monolítico: todo en modo núcleo, rápido, frágil. Micronúcleo: lo mínimo adentro, controladores como procesos, aislado, más lento.', 'Monolítico: tudo em modo núcleo, rápido, frágil. Micronúcleo: o mínimo dentro, drivers como processos, isolado, mais lento.') },
  { id: 'os1w1-c9', lessonId: l4, kind: 'concept', front: L('Boot sequence', 'Secuencia de arranque', 'Sequência de inicialização'), back: L('Firmware (UEFI) → boot loader (GRUB) → kernel → `systemd` (PID 1) → login.', 'Firmware (UEFI) → cargador (GRUB) → núcleo → `systemd` (PID 1) → inicio de sesión.', 'Firmware (UEFI) → carregador (GRUB) → núcleo → `systemd` (PID 1) → acesso.') },
  { id: 'os1w1-c10', lessonId: l5, kind: 'command', front: L('`/etc`, `/var/log`, `/proc`, `/dev`', '`/etc`, `/var/log`, `/proc`, `/dev`', '`/etc`, `/var/log`, `/proc`, `/dev`'), back: L('Configuration; logs; live kernel data; device files.', 'Configuración; registros; datos en vivo del núcleo; archivos de dispositivo.', 'Configuração; registros; dados ao vivo do núcleo; arquivos de dispositivo.') },
  { id: 'os1w1-c11', lessonId: l5, kind: 'distinction', front: L('Shell vs terminal', 'Intérprete vs terminal', 'Interpretador vs terminal'), back: L('The shell (`bash`) interprets commands; the terminal is the window that shows them.', 'El intérprete (`bash`) entiende los comandos; la terminal es la ventana que los muestra.', 'O interpretador (`bash`) entende os comandos; o terminal é a janela que os mostra.') },
];

const questions: Question[] = [
  { id: 'os1w1-q1', type: 'multiple-choice', lessonId: l1,
    prompt: L('Which is the best description of an operating system?', '¿Cuál es la mejor descripción de un sistema operativo?', 'Qual é a melhor descrição de um sistema operacional?'),
    options: [L('Software that manages hardware and offers services to programs', 'Software que gestiona el hardware y ofrece servicios a los programas', 'Software que gerencia o hardware e oferece serviços aos programas'), L('The graphical desktop', 'El escritorio gráfico', 'A área de trabalho gráfica'), L('The motherboard firmware', 'El firmware de la placa madre', 'O firmware da placa-mãe')],
    answer: 0,
    explanation: L('The desktop is one utility, and firmware only starts the machine.', 'El escritorio es un utilitario y el firmware solo arranca la máquina.', 'A área de trabalho é um utilitário e o firmware só inicia a máquina.') },
  { id: 'os1w1-q2', type: 'true-false', lessonId: l1,
    prompt: L('True or false: a normal program can switch the CPU to kernel mode whenever it wants.', 'Verdadero o falso: un programa normal puede pasar la CPU a modo núcleo cuando quiera.', 'Verdadeiro ou falso: um programa normal pode passar a CPU para o modo núcleo quando quiser.'),
    options: TF, answer: 1,
    explanation: L('False: only through system calls, at entry points the kernel controls.', 'Falso: solo mediante llamadas al sistema, en puntos de entrada que controla el núcleo.', 'Falso: só por chamadas de sistema, em pontos de entrada que o núcleo controla.') },
  { id: 'os1w1-q3', type: 'matching', lessonId: l2,
    prompt: L('Match each device with the kind of OS it needs.', 'Une cada dispositivo con el tipo de SO que necesita.', 'Ligue cada dispositivo ao tipo de SO de que precisa.'),
    left: [L('Anti-lock brakes', 'Frenos ABS', 'Freios ABS'), L('A national payment network', 'Una red nacional de pagos', 'Uma rede nacional de pagamentos'), L('A phone', 'Un teléfono', 'Um celular'), L('A smart washing machine', 'Una lavadora inteligente', 'Uma máquina de lavar inteligente')],
    right: [L('Real-time', 'Tiempo real', 'Tempo real'), L('Large central system', 'Gran sistema central', 'Grande sistema central'), L('Mobile', 'Móvil', 'Móvel'), L('Embedded', 'Embebido', 'Embarcado')],
    answer: [0, 1, 2, 3],
    explanation: L('Brakes react in milliseconds; payments need huge reliability; phones run mobile systems; appliances run small embedded ones.', 'Los frenos reaccionan en milisegundos; los pagos exigen enorme confiabilidad; los teléfonos usan sistemas móviles; los electrodomésticos, embebidos pequeños.', 'Os freios reagem em milissegundos; pagamentos exigem enorme confiabilidade; celulares usam sistemas móveis; eletrodomésticos, embarcados pequenos.') },
  { id: 'os1w1-q4', type: 'code', lessonId: l3,
    prompt: L('How many of these calls are system calls?', '¿Cuántas de estas llamadas son llamadas al sistema?', 'Quantas destas chamadas são chamadas de sistema?'),
    code: 'int fd = open("log.txt", O_RDONLY);\nint n  = strlen(name);\nread(fd, buf, 100);\nclose(fd);',
    options: [L('3', '3', '3'), L('4', '4', '4'), L('1', '1', '1')],
    answer: 0,
    explanation: L('`open`, `read`, and `close` enter the kernel; `strlen` stays in user mode.', '`open`, `read` y `close` entran al núcleo; `strlen` se queda en modo usuario.', '`open`, `read` e `close` entram no núcleo; `strlen` fica no modo usuário.') },
  { id: 'os1w1-q5', type: 'multiple-choice', lessonId: l4,
    prompt: L('Linux adds a driver for a new USB device without rebooting. What makes that possible?', 'Linux agrega un controlador para un dispositivo USB nuevo sin reiniciar. ¿Qué lo hace posible?', 'O Linux adiciona um driver para um dispositivo USB novo sem reiniciar. O que torna isso possível?'),
    options: [L('Loadable kernel modules', 'Los módulos cargables del núcleo', 'Os módulos carregáveis do núcleo'), L('A layered design', 'Un diseño por capas', 'Um projeto em camadas'), L('The boot loader', 'El cargador de arranque', 'O carregador de inicialização')],
    answer: 0,
    explanation: L('Modules are loaded into the running kernel; `lsmod` lists them.', 'Los módulos se cargan en el núcleo en marcha; `lsmod` los lista.', 'Os módulos são carregados no núcleo em funcionamento; `lsmod` os lista.') },
  { id: 'os1w1-q6', type: 'troubleshooting', lessonId: l4,
    prompt: L('After an update a laptop shows the maker logo and then "No bootable device". Which stage failed?', 'Tras una actualización, una portátil muestra el logo y luego "No bootable device". ¿Qué etapa falló?', 'Depois de uma atualização, um notebook mostra o logo e depois "No bootable device". Qual etapa falhou?'),
    options: [L('Firmware found no boot loader', 'El firmware no encontró un cargador', 'O firmware não encontrou um carregador'), L('PID 1 could not start the network', 'El PID 1 no pudo iniciar la red', 'O PID 1 não conseguiu iniciar a rede'), L('The desktop crashed', 'El escritorio falló', 'A área de trabalho travou')],
    answer: 0,
    explanation: L('The logo means the firmware ran; it found no disk with a boot loader, so the relay stopped there.', 'El logo indica que el firmware corrió; no halló un disco con cargador, así que el relevo se detuvo ahí.', 'O logo indica que o firmware rodou; ele não achou um disco com carregador, então o revezamento parou ali.') },
  { id: 'os1w1-q7', type: 'short-answer', lessonId: l5,
    prompt: L('Which top-level folder holds live kernel data such as `cpuinfo`?', '¿Qué carpeta de primer nivel guarda datos en vivo del núcleo como `cpuinfo`?', 'Qual pasta de primeiro nível guarda dados ao vivo do núcleo como `cpuinfo`?'),
    accepted: ['proc'],
    explanation: L('`/proc` is a virtual file system that the kernel fills on the fly.', '`/proc` es un sistema de archivos virtual que el núcleo llena al momento.', '`/proc` é um sistema de arquivos virtual que o núcleo preenche na hora.') },
  { id: 'os1w1-q8', type: 'multiple-choice', lessonId: l5,
    prompt: L('You type `ls` in a terminal window. Which program interprets it?', 'Escribes `ls` en una ventana de terminal. ¿Qué programa lo interpreta?', 'Você digita `ls` em uma janela de terminal. Qual programa o interpreta?'),
    options: [L('The shell, such as `bash`', 'El intérprete, como `bash`', 'O interpretador, como `bash`'), L('The terminal window', 'La ventana de la terminal', 'A janela do terminal'), L('The firmware', 'El firmware', 'O firmware')],
    answer: 0,
    explanation: L('The terminal only shows text; the shell parses the command and asks the kernel to run `ls`.', 'La terminal solo muestra texto; el intérprete analiza el comando y pide al núcleo ejecutar `ls`.', 'O terminal só mostra texto; o interpretador analisa o comando e pede ao núcleo para rodar `ls`.') },
];

const activities: Activity[] = [
  { id: 'os1w1-act-boot', kind: 'order', lessonId: l4,
    title: L('Boot relay', 'Relevo de arranque', 'Revezamento de inicialização'),
    prompt: L('Put the boot stages in order.', 'Ordena las etapas del arranque.', 'Ordene as etapas da inicialização.'),
    items: [L('Firmware tests the hardware', 'El firmware prueba el hardware', 'O firmware testa o hardware'), L('Boot loader shows its menu', 'El cargador muestra su menú', 'O carregador mostra seu menu'), L('Kernel loads drivers and mounts /', 'El núcleo carga controladores y monta /', 'O núcleo carrega drivers e monta /'), L('PID 1 starts the services', 'El PID 1 inicia los servicios', 'O PID 1 inicia os serviços'), L('Login screen appears', 'Aparece la pantalla de inicio de sesión', 'Aparece a tela de acesso')],
    explanation: L('Each stage loads the next; if one fails, the later ones never run.', 'Cada etapa carga la siguiente; si una falla, las demás nunca corren.', 'Cada etapa carrega a seguinte; se uma falha, as outras nunca rodam.') },
  { id: 'os1w1-act-folders', kind: 'classify', lessonId: l5,
    title: L('Where does it live?', '¿Dónde vive?', 'Onde fica?'),
    prompt: L('Sort each item into its folder.', 'Clasifica cada elemento en su carpeta.', 'Classifique cada item em sua pasta.'),
    buckets: [L('/etc', '/etc', '/etc'), L('/var', '/var', '/var'), L('/home', '/home', '/home'), L('/dev', '/dev', '/dev')],
    items: [
      { text: L('The machine name settings', 'La configuración del nombre del equipo', 'A configuração do nome da máquina'), bucket: 0 },
      { text: L('System log files', 'Archivos de registro del sistema', 'Arquivos de registro do sistema'), bucket: 1 },
      { text: L('Sofía\'s music', 'La música de Sofía', 'As músicas da Sofía'), bucket: 2 },
      { text: L('The first SSD', 'El primer SSD', 'O primeiro SSD'), bucket: 3 },
      { text: L('The list of user accounts', 'La lista de cuentas de usuario', 'A lista de contas de usuário'), bucket: 0 },
      { text: L('The printer queue', 'La cola de impresión', 'A fila de impressão'), bucket: 1 },
    ],
    explanation: L('`/etc` = configuration, `/var` = changing data, `/home` = user files, `/dev` = devices.', '`/etc` = configuración, `/var` = datos que cambian, `/home` = archivos de usuario, `/dev` = dispositivos.', '`/etc` = configuração, `/var` = dados que mudam, `/home` = arquivos de usuário, `/dev` = dispositivos.') },
  { id: 'os1w1-act-fill', kind: 'code-fill', lessonId: l5,
    title: L('Ask the system', 'Pregúntale al sistema', 'Pergunte ao sistema'),
    prompt: L('Show the current folder, the distribution file, and the kernel version.', 'Muestra la carpeta actual, el archivo de la distribución y la versión del núcleo.', 'Mostre a pasta atual, o arquivo da distribuição e a versão do núcleo.'),
    template: '{0}\ncat /etc/{1}\nuname {2}',
    blanks: ['pwd', 'os-release', '-r|-a'],
    explanation: L('`pwd` prints the working folder; `/etc/os-release` names the distribution; `uname -r` prints the kernel release.', '`pwd` imprime la carpeta actual; `/etc/os-release` nombra la distribución; `uname -r` imprime la versión del núcleo.', '`pwd` imprime a pasta atual; `/etc/os-release` nomeia a distribuição; `uname -r` imprime a versão do núcleo.') },
];

const labs: Lab[] = [
  { id: 'os1w1-lab1', kind: 'shell', level: 1, minutes: 40,
    title: L('Meet your operating system', 'Conoce tu sistema operativo', 'Conheça seu sistema operacional'),
    goal: L('Identify the OS, kernel, shell, hardware, and boot mode of your machine with read-only commands. Use a Linux virtual machine, WSL on Windows, or a bootable USB; Windows lines start with `#`.', 'Identificar el SO, el núcleo, el intérprete, el hardware y el modo de arranque de tu máquina con comandos de solo lectura. Usa una máquina virtual con Linux, WSL en Windows o una memoria USB de arranque; las líneas de Windows empiezan con `#`.', 'Identificar o SO, o núcleo, o interpretador, o hardware e o modo de inicialização da sua máquina com comandos somente leitura. Use uma máquina virtual com Linux, o WSL no Windows ou um pendrive inicializável; as linhas do Windows começam com `#`.'),
    steps: [
      { id: 'os1w1-lab1-s1', title: L('Which system and kernel?', '¿Qué sistema y qué núcleo?', 'Qual sistema e qual núcleo?'),
        commands: ['cat /etc/os-release', 'uname -a', '# Windows (PowerShell): Get-ComputerInfo -Property OsName,OsVersion,OsArchitecture'],
        expected: L('`os-release` shows `NAME` and `VERSION` (for example Ubuntu 24.04). `uname -a` prints Linux, the machine name, the kernel release such as `6.8.0-45-generic`, and the architecture (`x86_64` or `aarch64`).', '`os-release` muestra `NAME` y `VERSION` (por ejemplo Ubuntu 24.04). `uname -a` imprime Linux, el nombre del equipo, la versión del núcleo como `6.8.0-45-generic` y la arquitectura (`x86_64` o `aarch64`).', '`os-release` mostra `NAME` e `VERSION` (por exemplo Ubuntu 24.04). `uname -a` imprime Linux, o nome da máquina, a versão do núcleo como `6.8.0-45-generic` e a arquitetura (`x86_64` ou `aarch64`).') },
      { id: 'os1w1-lab1-s2', title: L('Which shell?', '¿Qué intérprete?', 'Qual interpretador?'),
        commands: ['echo $SHELL', 'ps -p $$', 'cat /etc/shells', '# Windows: $PSVersionTable.PSVersion'],
        expected: L('`$SHELL` is your login shell (often `/bin/bash`); `ps -p $$` shows the shell running now with its PID; `/etc/shells` lists every installed shell.', '`$SHELL` es tu intérprete de inicio (a menudo `/bin/bash`); `ps -p $$` muestra el intérprete que corre ahora con su PID; `/etc/shells` lista todos los instalados.', '`$SHELL` é seu interpretador de acesso (muitas vezes `/bin/bash`); `ps -p $$` mostra o interpretador rodando agora com seu PID; `/etc/shells` lista todos os instalados.') },
      { id: 'os1w1-lab1-s3', title: L('What hardware does the kernel see?', '¿Qué hardware ve el núcleo?', 'Que hardware o núcleo vê?'),
        commands: ['nproc', 'grep -m1 "model name" /proc/cpuinfo', 'free -h', 'lsblk', '# Windows: Get-CimInstance Win32_Processor | Select Name,NumberOfCores'],
        expected: L('`nproc` prints the logical CPUs (for example 8); `free -h` shows total, used, and available RAM and swap; `lsblk` draws disks and partitions as a tree (`nvme0n1` with `nvme0n1p1`, `nvme0n1p2`).', '`nproc` imprime las CPU lógicas (por ejemplo 8); `free -h` muestra la RAM y el área de intercambio total, usada y disponible; `lsblk` dibuja discos y particiones como árbol (`nvme0n1` con `nvme0n1p1`, `nvme0n1p2`).', '`nproc` imprime as CPUs lógicas (por exemplo 8); `free -h` mostra RAM e área de troca total, usada e disponível; `lsblk` desenha discos e partições como árvore (`nvme0n1` com `nvme0n1p1`, `nvme0n1p2`).') },
      { id: 'os1w1-lab1-s4', title: L('How did it boot?', '¿Cómo arrancó?', 'Como inicializou?'),
        commands: ['[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS', 'ps -p 1 -o pid,comm', 'uptime', 'systemd-analyze', '# Windows: msinfo32 (look at "BIOS Mode")'],
        expected: L('The first line prints UEFI or BIOS. PID 1 is `systemd`. `uptime` gives the time since boot and the load averages. `systemd-analyze` splits boot time into firmware, loader, kernel, and user space, for example "Startup finished in 6.1s (firmware) + 2.3s (loader) + 1.9s (kernel) + 8.4s (userspace)".', 'La primera línea imprime UEFI o BIOS. El PID 1 es `systemd`. `uptime` da el tiempo desde el arranque y los promedios de carga. `systemd-analyze` divide el arranque en firmware, cargador, núcleo y espacio de usuario, por ejemplo "Startup finished in 6.1s (firmware) + 2.3s (loader) + 1.9s (kernel) + 8.4s (userspace)".', 'A primeira linha imprime UEFI ou BIOS. O PID 1 é o `systemd`. `uptime` dá o tempo desde a inicialização e as médias de carga. `systemd-analyze` divide a inicialização em firmware, carregador, núcleo e espaço de usuário, por exemplo "Startup finished in 6.1s (firmware) + 2.3s (loader) + 1.9s (kernel) + 8.4s (userspace)".') },
    ] },
  { id: 'os1w1-lab2', kind: 'shell', level: 1, minutes: 35,
    title: L('Walk the directory tree', 'Recorre el árbol de directorios', 'Percorra a árvore de diretórios'),
    goal: L('Navigate the FHS folders, read configuration and live kernel files, compare with Windows, and save a report in `~/os-lab/week1`.', 'Navegar las carpetas del FHS, leer configuración y archivos en vivo del núcleo, comparar con Windows y guardar un informe en `~/os-lab/week1`.', 'Navegar pelas pastas do FHS, ler configuração e arquivos ao vivo do núcleo, comparar com o Windows e salvar um relatório em `~/os-lab/week1`.'),
    steps: [
      { id: 'os1w1-lab2-s1', title: L('Move around', 'Muévete', 'Movimente-se'),
        commands: ['cd / && ls', 'cd /etc && pwd', 'cd ~ && pwd', '# Windows: cd C:\\ ; dir ; cd $HOME'],
        expected: L('`ls /` lists `bin`, `boot`, `etc`, `home`, `proc`, `usr`, `var` and others; `cd ~` always returns to `/home/<you>`. On Windows the top is a drive letter.', '`ls /` lista `bin`, `boot`, `etc`, `home`, `proc`, `usr`, `var` y otras; `cd ~` siempre vuelve a `/home/<tú>`. En Windows la cima es una letra de unidad.', '`ls /` lista `bin`, `boot`, `etc`, `home`, `proc`, `usr`, `var` e outras; `cd ~` sempre volta para `/home/<você>`. No Windows o topo é uma letra de unidade.') },
      { id: 'os1w1-lab2-s2', title: L('Read configuration', 'Lee configuración', 'Leia configuração'),
        commands: ['cat /etc/hostname', 'head -3 /etc/passwd', 'ls -l /etc/hostname'],
        expected: L('Each `passwd` line is `user:x:UID:GID:description:home:shell`, for example `root:x:0:0:root:/root:/bin/bash`. `ls -l` shows the owner is `root`: you may read but not change it.', 'Cada línea de `passwd` es `usuario:x:UID:GID:descripción:carpeta:intérprete`, por ejemplo `root:x:0:0:root:/root:/bin/bash`. `ls -l` muestra que el dueño es `root`: puedes leer pero no cambiar.', 'Cada linha de `passwd` é `usuário:x:UID:GID:descrição:pasta:interpretador`, por exemplo `root:x:0:0:root:/root:/bin/bash`. `ls -l` mostra que o dono é `root`: você pode ler, mas não alterar.') },
      { id: 'os1w1-lab2-s3', title: L('Peek at /proc and /dev', 'Mira /proc y /dev', 'Espie /proc e /dev'),
        commands: ['cat /proc/version', 'cat /proc/uptime', 'ls /proc | head', 'ls -l /dev/null'],
        expected: L('Numbered folders in `/proc` are running processes. `/dev/null` starts with `c`: a character device; disks start with `b` (block).', 'Las carpetas numeradas en `/proc` son procesos en ejecución. `/dev/null` empieza con `c`: dispositivo de caracteres; los discos empiezan con `b` (bloque).', 'As pastas numeradas em `/proc` são processos em execução. `/dev/null` começa com `c`: dispositivo de caractere; os discos começam com `b` (bloco).') },
      { id: 'os1w1-lab2-s4', title: L('Save a report', 'Guarda un informe', 'Salve um relatório'),
        commands: ['mkdir -p ~/os-lab/week1 && cd ~/os-lab/week1', 'uname -a > my-system.txt && free -h >> my-system.txt', 'cat my-system.txt', '# Windows: mkdir $HOME\\os-lab\\week1 ; systeminfo > my-system.txt'],
        expected: L('`>` creates or overwrites the file and `>>` appends. Keep `~/os-lab` for the coming weeks.', '`>` crea o sobrescribe el archivo y `>>` agrega al final. Conserva `~/os-lab` para las próximas semanas.', '`>` cria ou sobrescreve o arquivo e `>>` acrescenta ao final. Guarde `~/os-lab` para as próximas semanas.') },
    ] },
];

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lessons 1–2: what an OS is and where it came from.', 'Lecciones 1–2: qué es un SO y de dónde viene.', 'Lições 1–2: o que é um SO e de onde ele veio.'), minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: L('Lesson 3: services and system calls.', 'Lección 3: servicios y llamadas al sistema.', 'Lição 3: serviços e chamadas de sistema.'), minutes: 30, kind: 'read' },
  { day: 'Day 3', focus: L('Lesson 4 and Lab 1.', 'Lección 4 y Laboratorio 1.', 'Lição 4 e Laboratório 1.'), minutes: 60, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 5 and Lab 2.', 'Lección 5 y Laboratorio 2.', 'Lição 5 e Laboratório 2.'), minutes: 55, kind: 'practice' },
  { day: 'Day 5', focus: L('Activities and exercises you missed.', 'Actividades y ejercicios que fallaste.', 'Atividades e exercícios que você errou.'), minutes: 30, kind: 'practice' },
  { day: 'Day 6', focus: L('Flashcards.', 'Tarjetas.', 'Cartões.'), minutes: 20, kind: 'review' },
  { day: 'Day 7', focus: L('Quiz, then review each explanation.', 'Cuestionario y luego repasa cada explicación.', 'Questionário e depois revise cada explicação.'), minutes: 30, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'os1w1-r-wiki', title: 'Wikipedia: Operating system', url: 'https://en.wikipedia.org/wiki/Operating_system', kind: 'article', verifiedOn: '2026-11-04', note: L('History, kinds, and components of operating systems.', 'Historia, tipos y componentes de los sistemas operativos.', 'História, tipos e componentes dos sistemas operacionais.') },
  { id: 'os1w1-r-hier', title: 'man7.org: hier(7)', url: 'https://man7.org/linux/man-pages/man7/hier.7.html', kind: 'article', verifiedOn: '2026-11-04', note: L('What each top-level Linux folder is for.', 'Para qué sirve cada carpeta de primer nivel de Linux.', 'Para que serve cada pasta de primeiro nível do Linux.') },
  { id: 'os1w1-r-fhs', title: 'Filesystem Hierarchy Standard 3.0', url: 'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html', kind: 'book', verifiedOn: '2026-11-04', note: L('The standard itself.', 'El estándar completo.', 'O padrão completo.') },
  { id: 'os1w1-r-syscalls', title: 'man7.org: syscalls(2)', url: 'https://man7.org/linux/man-pages/man2/syscalls.2.html', kind: 'article', verifiedOn: '2026-11-04', note: L('The list of Linux system calls.', 'La lista de llamadas al sistema de Linux.', 'A lista de chamadas de sistema do Linux.') },
  { id: 'os1w1-r-gnu', title: 'GNU: What is Free Software?', url: 'https://www.gnu.org/philosophy/free-sw.html', kind: 'article', verifiedOn: '2026-11-04', note: L('The four freedoms, in many languages.', 'Las cuatro libertades, en muchos idiomas.', 'As quatro liberdades, em vários idiomas.') },
];

/** Operating Systems 1, Week 1: operating system overview. */
export const os1Week1: WeekContent = {
  id: 'y1-t1-m2-os-w1', year: 1, term: 1, module: 2, week: 1, subject: 'operating-systems-1',
  title: L('Operating system overview', 'Descripción general del sistema operativo', 'Visão geral do sistema operacional'),
  intro: L('Every program you use runs on an operating system. This week: what that layer is, how it grew from punched cards to phones, the services it offers through system calls, how it is built and boots, and how to find your way around the Linux tree and the shell.',
    'Todo programa que usas corre sobre un sistema operativo. Esta semana: qué es esa capa, cómo creció de las tarjetas perforadas a los teléfonos, qué servicios ofrece con llamadas al sistema, cómo se construye y arranca, y cómo moverte por el árbol de Linux y el intérprete de comandos.',
    'Todo programa que você usa roda sobre um sistema operacional. Nesta semana: o que é essa camada, como ela evoluiu dos cartões perfurados aos celulares, que serviços oferece por chamadas de sistema, como é construída e inicializada, e como se orientar na árvore do Linux e no interpretador de comandos.'),
  objectives: [
    L('Describe the parts of an OS and the two CPU modes.', 'Describir las partes de un SO y los dos modos de la CPU.', 'Descrever as partes de um SO e os dois modos da CPU.'),
    L('Place the main kinds of OS in history and in today\'s devices.', 'Ubicar los principales tipos de SO en la historia y en los dispositivos de hoy.', 'Situar os principais tipos de SO na história e nos dispositivos de hoje.'),
    L('Explain OS services and how system calls reach them.', 'Explicar los servicios del SO y cómo llegan a ellos las llamadas al sistema.', 'Explicar os serviços do SO e como as chamadas de sistema chegam a eles.'),
    L('Compare kernel designs and describe the boot sequence.', 'Comparar diseños de núcleo y describir la secuencia de arranque.', 'Comparar projetos de núcleo e descrever a sequência de inicialização.'),
    L('Navigate the Linux tree and tell shell, terminal, and desktop apart.', 'Navegar el árbol de Linux y distinguir intérprete, terminal y escritorio.', 'Navegar pela árvore do Linux e distinguir interpretador, terminal e ambiente gráfico.'),
  ],
  prerequisites: [
    L('Basic computer use: files, folders, installing an app.', 'Uso básico de la computadora: archivos, carpetas, instalar una app.', 'Uso básico do computador: arquivos, pastas, instalar um app.'),
    L('A Linux terminal: a virtual machine, WSL on Windows, or a bootable USB.', 'Una terminal Linux: máquina virtual, WSL en Windows o memoria USB de arranque.', 'Um terminal Linux: máquina virtual, WSL no Windows ou pendrive inicializável.'),
  ],
  keyConcepts: [
    L('Kernel', 'Núcleo', 'Núcleo'), L('User and kernel mode', 'Modo usuario y núcleo', 'Modo usuário e núcleo'), L('System call', 'Llamada al sistema', 'Chamada de sistema'),
    L('Microkernel', 'Micronúcleo', 'Micronúcleo'), L('Boot sequence', 'Secuencia de arranque', 'Sequência de inicialização'), L('FHS tree', 'Árbol FHS', 'Árvore FHS'),
  ],
  estimatedMinutes: 265,
  sequence: [
    L('Lessons 1–3: what an OS is, where it came from, and what it offers.', 'Lecciones 1–3: qué es un SO, de dónde viene y qué ofrece.', 'Lições 1–3: o que é um SO, de onde veio e o que oferece.'),
    L('Lesson 4 and Lab 1: designs and booting on your own machine.', 'Lección 4 y Laboratorio 1: diseños y arranque en tu propia máquina.', 'Lição 4 e Laboratório 1: projetos e inicialização na sua própria máquina.'),
    L('Lesson 5 and Lab 2: the directory tree. Then the quiz.', 'Lección 5 y Laboratorio 2: el árbol de directorios. Luego el cuestionario.', 'Lição 5 e Laboratório 2: a árvore de diretórios. Depois o questionário.'),
  ],
  outcomes: [
    L('You can explain what happens between pressing power and seeing the login screen.', 'Puedes explicar qué pasa entre encender y ver la pantalla de inicio de sesión.', 'Você consegue explicar o que acontece entre ligar e ver a tela de acesso.'),
    L('You know where Linux keeps configuration, logs, devices, and user files.', 'Sabes dónde guarda Linux la configuración, los registros, los dispositivos y los archivos de usuario.', 'Você sabe onde o Linux guarda configuração, registros, dispositivos e arquivos de usuário.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Running unknown commands with `sudo` while exploring.', 'Ejecutar comandos desconocidos con `sudo` mientras exploras.', 'Rodar comandos desconhecidos com `sudo` enquanto explora.'), fix: L('This week\'s labs only read; if a step asks for `sudo`, stop and check it.', 'Los laboratorios de esta semana solo leen; si un paso pide `sudo`, detente y revísalo.', 'Os laboratórios desta semana só leem; se um passo pedir `sudo`, pare e confira.') },
  ],
  lessons: os1Week1Lessons, flashcards, questions, labs, plan, resources, activities,
  stories: [], tools: [], videos: [], documents: [],
};
