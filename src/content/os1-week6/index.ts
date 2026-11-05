import type { Activity, ExternalResource, Flashcard, Lab, Localized, Question, StudyPlanDay } from '../types';
import type { WeekContent } from '../weekContent';
import { os1Week6Lessons } from './lessons';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

const l1 = 'os1w6-l1-files';
const l2 = 'os1w6-l2-directories';
const l3 = 'os1w6-l3-allocation';
const l4 = 'os1w6-l4-types';
const l5 = 'os1w6-l5-permissions';

const flashcards: Flashcard[] = [
  { id: 'os1w6-c1', lessonId: l1, kind: 'concept', front: L('Three access methods', 'Tres métodos de acceso', 'Três métodos de acesso'), back: L('Sequential (start to end), direct (jump to a position), indexed (look up a key first).', 'Secuencial (de principio a fin), directo (saltar a una posición), indexado (buscar primero una clave).', 'Sequencial (do início ao fim), direto (saltar para uma posição), indexado (procurar primeiro uma chave).') },
  { id: 'os1w6-c2', lessonId: l1, kind: 'command', front: L('`stat file`', '`stat archivo`', '`stat arquivo`'), back: L('Shows size, inode, links, permissions, owner, and timestamps.', 'Muestra tamaño, inodo, enlaces, permisos, dueño y fechas.', 'Mostra tamanho, inode, links, permissões, dono e datas.') },
  { id: 'os1w6-c3', lessonId: l2, kind: 'distinction', front: L('Hard vs symbolic link', 'Enlace duro vs simbólico', 'Link físico vs simbólico'), back: L('Hard: another name for the same inode. Symbolic: a file holding a path; it breaks if the target goes.', 'Duro: otro nombre para el mismo inodo. Simbólico: un archivo con una ruta; se rompe si el destino desaparece.', 'Físico: outro nome para o mesmo inode. Simbólico: um arquivo com um caminho; quebra se o destino some.') },
  { id: 'os1w6-c4', lessonId: l2, kind: 'concept', front: L('Mounting', 'Montaje', 'Montagem'), back: L('Attaching a file system to a folder of the tree.', 'Enganchar un sistema de archivos a una carpeta del árbol.', 'Ligar um sistema de arquivos a uma pasta da árvore.') },
  { id: 'os1w6-c5', lessonId: l3, kind: 'distinction', front: L('Contiguous, linked, indexed', 'Contigua, enlazada, indexada', 'Contígua, encadeada, indexada'), back: L('Consecutive blocks; a chain of pointers; an index block listing every block.', 'Bloques consecutivos; una cadena de punteros; un bloque índice con todos los bloques.', 'Blocos consecutivos; uma cadeia de ponteiros; um bloco índice com todos os blocos.') },
  { id: 'os1w6-c6', lessonId: l3, kind: 'concept', front: L('Inode', 'Inodo', 'Inode'), back: L('Stores a file\'s attributes and block pointers, but not its name.', 'Guarda los atributos y punteros a bloques de un archivo, pero no su nombre.', 'Guarda os atributos e ponteiros de blocos de um arquivo, mas não o nome.') },
  { id: 'os1w6-c7', lessonId: l4, kind: 'concept', front: L('Journaling', 'Registro por diario', 'Registro em diário'), back: L('Log the change first, then apply it, so a crash can be recovered quickly.', 'Anotar el cambio primero y luego aplicarlo, para recuperar rápido tras una falla.', 'Anotar a mudança primeiro e depois aplicá-la, para recuperar rápido após uma falha.') },
  { id: 'os1w6-c8', lessonId: l4, kind: 'distinction', front: L('FAT32 vs exFAT vs NTFS', 'FAT32 vs exFAT vs NTFS', 'FAT32 vs exFAT vs NTFS'), back: L('Universal but < 4 GiB files; big files on cards; journal, ACLs, encryption.', 'Universal pero archivos < 4 GiB; archivos grandes en tarjetas; diario, ACL, cifrado.', 'Universal, mas arquivos < 4 GiB; arquivos grandes em cartões; diário, ACLs, cifragem.') },
  { id: 'os1w6-c9', lessonId: l5, kind: 'concept', front: L('Octal permissions', 'Permisos octales', 'Permissões octais'), back: L('$r = 4$, $w = 2$, $x = 1$ per set: `rwxr-x---` = 750.', '$r = 4$, $w = 2$, $x = 1$ por conjunto: `rwxr-x---` = 750.', '$r = 4$, $w = 2$, $x = 1$ por conjunto: `rwxr-x---` = 750.') },
  { id: 'os1w6-c10', lessonId: l5, kind: 'distinction', front: L('Permissions on a folder', 'Permisos en una carpeta', 'Permissões em uma pasta'), back: L('r lists names, w creates or deletes entries, x enters the folder.', 'r lista nombres, w crea o borra entradas, x permite entrar.', 'r lista nomes, w cria ou apaga entradas, x permite entrar.') },
  { id: 'os1w6-c11', lessonId: l5, kind: 'command', front: L('`chmod`, `chown`, `setfacl`, `chattr`', '`chmod`, `chown`, `setfacl`, `chattr`', '`chmod`, `chown`, `setfacl`, `chattr`'), back: L('Change mode; change owner; set an ACL entry; set attributes such as immutable.', 'Cambiar modo; cambiar dueño; fijar una entrada ACL; fijar atributos como inmutable.', 'Alterar modo; alterar dono; definir uma entrada de ACL; definir atributos como imutável.') },
];

const questions: Question[] = [
  { id: 'os1w6-q1', type: 'multiple-choice', lessonId: l1,
    prompt: L('Where is a file\'s name stored?', '¿Dónde se guarda el nombre de un archivo?', 'Onde fica guardado o nome de um arquivo?'),
    options: [L('In the directory entry', 'En la entrada del directorio', 'Na entrada do diretório'), L('In the inode', 'En el inodo', 'No inode'), L('In the data blocks', 'En los bloques de datos', 'Nos blocos de dados')],
    answer: 0,
    explanation: L('Directories map names to inode numbers; the inode holds attributes and block pointers.', 'Los directorios asocian nombres con números de inodo; el inodo guarda atributos y punteros.', 'Os diretórios associam nomes a números de inode; o inode guarda atributos e ponteiros.') },
  { id: 'os1w6-q2', type: 'fill-blank', lessonId: l1,
    prompt: L('Fixed records of 200 bytes: record number 40 (from 0) starts at byte ___.', 'Registros fijos de 200 bytes: el registro número 40 (desde 0) empieza en el byte ___.', 'Registros fixos de 200 bytes: o registro número 40 (a partir de 0) começa no byte ___.'),
    accepted: ['8000'],
    explanation: L('$40 \\times 200 = 8000$.', '$40 \\times 200 = 8000$.', '$40 \\times 200 = 8000$.') },
  { id: 'os1w6-q3', type: 'code', lessonId: l2,
    prompt: L('After these commands, what does `cat b` print?', 'Tras estos comandos, ¿qué imprime `cat b`?', 'Depois destes comandos, o que `cat b` imprime?'),
    code: 'echo hello > a\nln a b\nrm a\ncat b',
    options: [L('hello', 'hello', 'hello'), L('An error: no such file', 'Un error: no existe el archivo', 'Um erro: arquivo inexistente'), L('Nothing', 'Nada', 'Nada')],
    answer: 0,
    explanation: L('`b` is a hard link to the same inode, so the data lives on. With `ln -s` it would fail.', '`b` es un enlace duro al mismo inodo, así que los datos siguen. Con `ln -s` fallaría.', '`b` é um link físico para o mesmo inode, então os dados continuam. Com `ln -s` falharia.') },
  { id: 'os1w6-q4', type: 'fill-blank', lessonId: l3,
    prompt: L('Blocks of 2 KB, 4-byte pointers, 10 direct pointers and 1 single indirect. The largest file is ___ KB.', 'Bloques de 2 KB, punteros de 4 bytes, 10 directos y 1 indirecto simple. El archivo más grande es de ___ KB.', 'Blocos de 2 KB, ponteiros de 4 bytes, 10 diretos e 1 indireto simples. O maior arquivo é de ___ KB.'),
    accepted: ['1044'],
    explanation: L('An indirect block holds $\\frac{2048}{4} = 512$ pointers: $(10 + 512) \\times 2 = 1044$ KB.', 'Un bloque indirecto tiene $\\frac{2048}{4} = 512$ punteros: $(10 + 512) \\times 2 = 1044$ KB.', 'Um bloco indireto tem $\\frac{2048}{4} = 512$ ponteiros: $(10 + 512) \\times 2 = 1044$ KB.') },
  { id: 'os1w6-q5', type: 'scenario', lessonId: l3,
    prompt: L('A video editor appends to huge files all day and the disk fills with gaps that nothing can use. Which allocation scheme is the likely culprit?', 'Un editor de video agrega datos a archivos enormes todo el día y el disco se llena de huecos inservibles. ¿Qué esquema de asignación es el probable culpable?', 'Um editor de vídeo acrescenta dados a arquivos enormes o dia todo e o disco se enche de buracos inúteis. Qual esquema de alocação é o provável culpado?'),
    options: [L('Contiguous allocation', 'La asignación contigua', 'A alocação contígua'), L('Indexed allocation', 'La asignación indexada', 'A alocação indexada'), L('FAT', 'FAT', 'FAT')],
    answer: 0,
    explanation: L('Growing files need relocating, leaving external fragmentation behind.', 'Los archivos que crecen deben reubicarse y dejan fragmentación externa.', 'Arquivos que crescem precisam ser realocados e deixam fragmentação externa.') },
  { id: 'os1w6-q6', type: 'matching', lessonId: l4,
    prompt: L('Match each need with the best file system.', 'Une cada necesidad con el mejor sistema de archivos.', 'Ligue cada necessidade ao melhor sistema de arquivos.'),
    left: [L('Windows system disk', 'Disco del sistema Windows', 'Disco do sistema Windows'), L('Linux root disk', 'Disco raíz de Linux', 'Disco raiz do Linux'), L('SD card with 8 GB videos', 'Tarjeta SD con videos de 8 GB', 'Cartão SD com vídeos de 8 GB'), L('Tiny stick for an old TV', 'Memoria pequeña para un televisor viejo', 'Pendrive pequeno para uma TV antiga')],
    right: [L('NTFS', 'NTFS', 'NTFS'), L('ext4', 'ext4', 'ext4'), L('exFAT', 'exFAT', 'exFAT'), L('FAT32', 'FAT32', 'FAT32')],
    answer: [0, 1, 2, 3],
    explanation: L('Match native system, native system, large files, and maximum compatibility.', 'Sistema nativo, sistema nativo, archivos grandes y máxima compatibilidad.', 'Sistema nativo, sistema nativo, arquivos grandes e máxima compatibilidade.') },
  { id: 'os1w6-q7', type: 'multiple-choice', lessonId: l5,
    prompt: L('Which `chmod` mode gives the owner read and write, the group read, others nothing?', '¿Qué modo de `chmod` da al dueño lectura y escritura, al grupo lectura y a otros nada?', 'Qual modo de `chmod` dá ao dono leitura e escrita, ao grupo leitura e a outros nada?'),
    options: [L('640', '640', '640'), L('604', '604', '604'), L('460', '460', '460')],
    answer: 0,
    explanation: L('$6 = rw-$, $4 = r--$, $0 = ---$.', '$6 = rw-$, $4 = r--$, $0 = ---$.', '$6 = rw-$, $4 = r--$, $0 = ---$.') },
  { id: 'os1w6-q8', type: 'troubleshooting', lessonId: l5,
    prompt: L('Lucía can read `/srv/team/report.txt` (mode 644) but gets "Permission denied" when listing `/srv/team`. Folder mode is `drwx------`, owner Mateo. What is wrong?', 'Lucía puede leer `/srv/team/report.txt` (modo 644) pero recibe "Permission denied" al listar `/srv/team`. La carpeta es `drwx------`, dueño Mateo. ¿Qué falla?', 'Lucía consegue ler `/srv/team/report.txt` (modo 644) mas recebe "Permission denied" ao listar `/srv/team`. A pasta é `drwx------`, dono Mateo. O que está errado?'),
    options: [L('The folder gives her no r or x', 'La carpeta no le da ni r ni x', 'A pasta não dá a ela nem r nem x'), L('The file lacks w', 'Al archivo le falta w', 'Falta w no arquivo'), L('The umask is 022', 'La umask es 022', 'A umask é 022')],
    answer: 0,
    explanation: L('To reach a file you need x on every folder in the path; to list it you need r. Fix with `chmod g+rx` and a shared group.', 'Para llegar a un archivo necesitas x en cada carpeta de la ruta; para listarla, r. Se corrige con `chmod g+rx` y un grupo compartido.', 'Para chegar a um arquivo você precisa de x em cada pasta do caminho; para listar, r. Corrige-se com `chmod g+rx` e um grupo compartilhado.') },
  { id: 'os1w6-q9', type: 'short-answer', lessonId: l4,
    prompt: L('Which technique logs a change before applying it, so a crash can be recovered quickly?', '¿Qué técnica anota un cambio antes de aplicarlo para recuperar rápido tras una falla?', 'Qual técnica anota uma mudança antes de aplicá-la para recuperar rápido após uma falha?'),
    accepted: ['journal|diario|diário'],
    explanation: L('Journaling, used by NTFS and ext4.', 'El registro por diario (journaling), usado por NTFS y ext4.', 'O registro em diário (journaling), usado por NTFS e ext4.') },
];

const activities: Activity[] = [
  { id: 'os1w6-act-perm', kind: 'classify', lessonId: l5,
    title: L('Octal or letters?', '¿Octal o letras?', 'Octal ou letras?'),
    prompt: L('Sort each mode by who may write the file.', 'Clasifica cada modo según quién puede escribir el archivo.', 'Classifique cada modo conforme quem pode escrever no arquivo.'),
    buckets: [L('Only the owner', 'Solo el dueño', 'Só o dono'), L('Owner and group', 'Dueño y grupo', 'Dono e grupo'), L('Everyone', 'Todos', 'Todos')],
    items: [
      { text: L('644', '644', '644'), bucket: 0 },
      { text: L('664', '664', '664'), bucket: 1 },
      { text: L('666', '666', '666'), bucket: 2 },
      { text: L('`rwxr-xr-x`', '`rwxr-xr-x`', '`rwxr-xr-x`'), bucket: 0 },
      { text: L('`rw-rw----`', '`rw-rw----`', '`rw-rw----`'), bucket: 1 },
    ],
    explanation: L('Look at the w in each of the three sets.', 'Mira la w en cada uno de los tres conjuntos.', 'Olhe o w em cada um dos três conjuntos.') },
  { id: 'os1w6-act-fill', kind: 'code-fill', lessonId: l5,
    title: L('Set the permissions', 'Fija los permisos', 'Defina as permissões'),
    prompt: L('Owner full, group read and execute, others nothing.', 'Dueño todo, grupo lectura y ejecución, otros nada.', 'Dono tudo, grupo leitura e execução, outros nada.'),
    template: 'chmod {0} deploy.sh\nchmod g+{1} deploy.sh',
    blanks: ['750', 'w'],
    explanation: L('750 is `rwxr-x---`; the second line would then also let the group write.', '750 es `rwxr-x---`; la segunda línea además dejaría escribir al grupo.', '750 é `rwxr-x---`; a segunda linha ainda deixaria o grupo escrever.') },
  { id: 'os1w6-act-order', kind: 'order', lessonId: l4,
    title: L('Journaled write', 'Escritura con diario', 'Escrita com diário'),
    prompt: L('Order the steps of a journaled update.', 'Ordena los pasos de una actualización con diario.', 'Ordene os passos de uma atualização com diário.'),
    items: [L('Write "transaction begin" in the journal', 'Escribir "inicio de transacción" en el diario', 'Escrever "início de transação" no diário'), L('Write the new data to the journal', 'Escribir los datos nuevos en el diario', 'Escrever os dados novos no diário'), L('Write "transaction end" (commit)', 'Escribir "fin de transacción" (confirmación)', 'Escrever "fim de transação" (confirmação)'), L('Copy the data to its final place', 'Copiar los datos a su lugar final', 'Copiar os dados para o lugar final'), L('Mark the entry as done', 'Marcar la entrada como terminada', 'Marcar a entrada como concluída')],
    explanation: L('After a crash, entries without a commit are discarded and committed ones are replayed.', 'Tras una falla, las entradas sin confirmación se descartan y las confirmadas se repiten.', 'Após uma falha, entradas sem confirmação são descartadas e as confirmadas são refeitas.') },
  { id: 'os1w6-act-scramble', kind: 'scramble', lessonId: l2,
    title: L('Build a link', 'Arma un enlace', 'Monte um link'),
    prompt: L('Create a symbolic link `short` pointing to `/data/archive/2026`.', 'Crea un enlace simbólico `short` que apunte a `/data/archive/2026`.', 'Crie um link simbólico `short` apontando para `/data/archive/2026`.'),
    tokens: ['ln', '-s', '/data/archive/2026', 'short'],
    explanation: L('The target comes first, then the link name.', 'Primero va el destino y luego el nombre del enlace.', 'Primeiro vai o destino e depois o nome do link.') },
];

const labs: Lab[] = [
  { id: 'os1w6-lab1', kind: 'shell', level: 1, minutes: 40,
    title: L('Files, links, and permissions in practice', 'Archivos, enlaces y permisos en la práctica', 'Arquivos, links e permissões na prática'),
    goal: L('In a disposable folder, create files, hard and symbolic links, change permissions, and watch the effect. Windows lines start with `#`.', 'En una carpeta desechable, crear archivos, enlaces duros y simbólicos, cambiar permisos y ver el efecto. Las líneas de Windows empiezan con `#`.', 'Em uma pasta descartável, criar arquivos, links físicos e simbólicos, mudar permissões e ver o efeito. As linhas do Windows começam com `#`.'),
    steps: [
      { id: 'os1w6-lab1-s1', title: L('Create the workspace', 'Crea el espacio de trabajo', 'Crie o espaço de trabalho'),
        commands: ['mkdir -p ~/os-lab/week6/docs && cd ~/os-lab/week6', 'echo "first draft" > docs/notes.txt', 'ls -l docs', 'stat docs/notes.txt', '# Windows: mkdir $HOME\\os-lab\\week6\\docs ; "first draft" | Out-File docs\\notes.txt'],
        expected: L('`ls -l` shows `-rw-r--r--` (mode 644 with `umask 022`), your user as owner, and size 12. `stat` shows an inode number and `Links: 1`.', '`ls -l` muestra `-rw-r--r--` (modo 644 con `umask 022`), tu usuario como dueño y tamaño 12. `stat` muestra un número de inodo y `Links: 1`.', '`ls -l` mostra `-rw-r--r--` (modo 644 com `umask 022`), seu usuário como dono e tamanho 12. `stat` mostra um número de inode e `Links: 1`.') },
      { id: 'os1w6-lab1-s2', title: L('Hard and symbolic links', 'Enlaces duros y simbólicos', 'Links físicos e simbólicos'),
        commands: ['ln docs/notes.txt docs/hard.txt', 'ln -s notes.txt docs/soft.txt', 'ls -li docs', 'rm docs/notes.txt', 'cat docs/hard.txt ; cat docs/soft.txt', '# Windows (admin): New-Item -ItemType HardLink -Path hard.txt -Target notes.txt ; New-Item -ItemType SymbolicLink -Path soft.txt -Target notes.txt'],
        expected: L('`notes.txt` and `hard.txt` show the same inode and link count 2; `soft.txt` has its own inode and `->`. After `rm`, `hard.txt` still prints `first draft` and `soft.txt` fails with "No such file or directory".', '`notes.txt` y `hard.txt` muestran el mismo inodo y contador 2; `soft.txt` tiene su propio inodo y `->`. Tras `rm`, `hard.txt` sigue imprimiendo `first draft` y `soft.txt` falla con "No such file or directory".', '`notes.txt` e `hard.txt` mostram o mesmo inode e contagem 2; `soft.txt` tem seu próprio inode e `->`. Depois do `rm`, `hard.txt` ainda imprime `first draft` e `soft.txt` falha com "No such file or directory".') },
      { id: 'os1w6-lab1-s3', title: L('Change permissions', 'Cambia permisos', 'Mude permissões'),
        commands: ['chmod 600 docs/hard.txt && ls -l docs/hard.txt', 'chmod g+r,o+r docs/hard.txt && ls -l docs/hard.txt', 'chmod 000 docs ; ls docs ; chmod 755 docs', '# Windows: icacls docs\\hard.txt /deny "Everyone:(R)" ; icacls docs\\hard.txt /remove:d Everyone'],
        expected: L('`-rw-------`, then `-rw-r--r--`. With mode 000 on the folder, `ls docs` prints "Permission denied"; mode 755 fixes it. Folder permissions gate everything inside.', '`-rw-------` y luego `-rw-r--r--`. Con modo 000 en la carpeta, `ls docs` imprime "Permission denied"; el modo 755 lo arregla. Los permisos de la carpeta controlan todo lo de adentro.', '`-rw-------` e depois `-rw-r--r--`. Com modo 000 na pasta, `ls docs` imprime "Permission denied"; o modo 755 conserta. As permissões da pasta controlam tudo o que está dentro.') },
      { id: 'os1w6-lab1-s4', title: L('Immutable files and the umask', 'Archivos inmutables y la umask', 'Arquivos imutáveis e a umask'),
        commands: ['sudo chattr +i docs/hard.txt ; rm docs/hard.txt ; lsattr docs/hard.txt', 'sudo chattr -i docs/hard.txt', 'umask ; umask 077 ; touch private.txt ; ls -l private.txt ; umask 022'],
        expected: L('`rm` fails with "Operation not permitted" while `i` shows in `lsattr`. The umask prints `0022`; with `077` the new file is `-rw-------`.', '`rm` falla con "Operation not permitted" mientras `lsattr` muestra `i`. La umask imprime `0022`; con `077` el archivo nuevo queda `-rw-------`.', '`rm` falha com "Operation not permitted" enquanto o `lsattr` mostra `i`. A umask imprime `0022`; com `077` o arquivo novo fica `-rw-------`.') },
      { id: 'os1w6-lab1-s5', title: L('See the file system', 'Mira el sistema de archivos', 'Veja o sistema de arquivos'),
        commands: ['df -hT .', 'findmnt -T .', 'sudo tune2fs -l $(findmnt -no SOURCE -T .) | grep -E "Block size|Inode count|Filesystem features"', '# Windows: Get-Volume ; fsutil fsinfo volumeinfo C:'],
        expected: L('`df -hT` lists the type (for example `ext4`); `findmnt` shows the mount point; `tune2fs` (ext4 only) prints block size 4096, the inode count, and features such as `has_journal` and `extent`.', '`df -hT` lista el tipo (por ejemplo `ext4`); `findmnt` muestra el punto de montaje; `tune2fs` (solo ext4) imprime tamaño de bloque 4096, la cantidad de inodos y características como `has_journal` y `extent`.', '`df -hT` lista o tipo (por exemplo `ext4`); `findmnt` mostra o ponto de montagem; `tune2fs` (só ext4) imprime tamanho de bloco 4096, a quantidade de inodes e recursos como `has_journal` e `extent`.') },
    ] },
  { id: 'os1w6-lab2', kind: 'math', level: 2, minutes: 40,
    title: L('Allocation and permissions by hand', 'Asignación y permisos a mano', 'Alocação e permissões à mão'),
    goal: L('Work out disk allocation and permission problems on paper.', 'Resolver problemas de asignación en disco y de permisos en papel.', 'Resolver problemas de alocação em disco e de permissões no papel.'),
    steps: [
      { id: 'os1w6-lab2-s1', title: L('First, best, and worst fit', 'Primer, mejor y peor ajuste', 'Primeiro, melhor e pior ajuste'),
        commands: ['free runs (in blocks): 6, 14, 3, 9, 20', 'files to store, in order: 8, 3, 12, 5'],
        expected: L('First fit: 8→14 (6 left), 3→6 (3 left), 12→20 (8 left), 5→the first run of 6 (1 left): runs 3, 1, 3, 9, 8 afterwards. Best fit: 8→9, 3→3, 12→14, 5→6: runs 1, 2, 0, 1, 20. Worst fit: 8→20, 3→14, 12→the 12 left of the 20, 5→the 11: runs 6, 6, 3, 9, 0.', 'Primer ajuste: 8→14 (quedan 6), 3→6 (quedan 3), 12→20 (quedan 8), 5→la primera racha de 6 (queda 1): rachas 3, 1, 3, 9, 8 al final. Mejor ajuste: 8→9, 3→3, 12→14, 5→6: rachas 1, 2, 0, 1, 20. Peor ajuste: 8→20, 3→14, 12→los 12 que quedan del 20, 5→el 11: rachas 6, 6, 3, 9, 0.', 'Primeiro ajuste: 8→14 (sobram 6), 3→6 (sobram 3), 12→20 (sobram 8), 5→a primeira sequência de 6 (sobra 1): sequências 3, 1, 3, 9, 8 no fim. Melhor ajuste: 8→9, 3→3, 12→14, 5→6: sequências 1, 2, 0, 1, 20. Pior ajuste: 8→20, 3→14, 12→os 12 que sobram do 20, 5→o 11: sequências 6, 6, 3, 9, 0.') },
      { id: 'os1w6-lab2-s2', title: L('Reach of an inode', 'Alcance de un inodo', 'Alcance de um inode'),
        commands: ['block 4 KB, pointer 4 B, 12 direct + 1 single + 1 double indirect', 'largest file?'],
        expected: L('$12 \\times 4 = 48$ KB; single: $1024 \\times 4 = 4096$ KB; double: $1024^2 \\times 4$ KB $= 4$ GB. Total about $4$ GB $+ 4$ MB $+ 48$ KB.', '$12 \\times 4 = 48$ KB; simple: $1024 \\times 4 = 4096$ KB; doble: $1024^2 \\times 4$ KB $= 4$ GB. Total cerca de $4$ GB $+ 4$ MB $+ 48$ KB.', '$12 \\times 4 = 48$ KB; simples: $1024 \\times 4 = 4096$ KB; duplo: $1024^2 \\times 4$ KB $= 4$ GB. Total cerca de $4$ GB $+ 4$ MB $+ 48$ KB.') },
      { id: 'os1w6-lab2-s3', title: L('Reading cost', 'Costo de lectura', 'Custo de leitura'),
        commands: ['read block 150 of a file with: contiguous, linked, indexed with a 1-level index', 'count disk reads (the index block counts as one)'],
        expected: L('Contiguous: 1. Linked: 151. Indexed: 2.', 'Contigua: 1. Enlazada: 151. Indexada: 2.', 'Contígua: 1. Encadeada: 151. Indexada: 2.') },
      { id: 'os1w6-lab2-s4', title: L('Permission puzzles', 'Acertijos de permisos', 'Quebra-cabeças de permissões'),
        commands: ['(a) `rwxr-x--x` in octal? (b) 640 in letters? (c) umask 027: mode of a new file and a new folder?', '(d) Who can delete `/shared/old.txt` if `/shared` is `drwxr-xr-x` owned by ana and the file is `-rw-rw-rw-` owned by tomas?'],
        expected: L('(a) 751. (b) `rw-r-----`. (c) file $666 - 027 = 640$, folder $777 - 027 = 750$. (d) Only ana (and root): deleting needs w on the folder, not on the file.', '(a) 751. (b) `rw-r-----`. (c) archivo $666 - 027 = 640$, carpeta $777 - 027 = 750$. (d) Solo ana (y root): borrar requiere w en la carpeta, no en el archivo.', '(a) 751. (b) `rw-r-----`. (c) arquivo $666 - 027 = 640$, pasta $777 - 027 = 750$. (d) Só ana (e root): apagar exige w na pasta, não no arquivo.') },
    ] },
];

const plan: StudyPlanDay[] = [
  { day: 'Day 1', focus: L('Lessons 1–2: files, directories, and links.', 'Lecciones 1–2: archivos, directorios y enlaces.', 'Lições 1–2: arquivos, diretórios e links.'), minutes: 40, kind: 'read' },
  { day: 'Day 2', focus: L('Lab 1, steps 1–2.', 'Laboratorio 1, pasos 1–2.', 'Laboratório 1, passos 1–2.'), minutes: 30, kind: 'practice' },
  { day: 'Day 3', focus: L('Lesson 3: allocation, and Lab 2, steps 1–3.', 'Lección 3: asignación, y Laboratorio 2, pasos 1–3.', 'Lição 3: alocação, e Laboratório 2, passos 1–3.'), minutes: 55, kind: 'practice' },
  { day: 'Day 4', focus: L('Lesson 4: real file systems; Lab 1, step 5.', 'Lección 4: sistemas de archivos reales; Laboratorio 1, paso 5.', 'Lição 4: sistemas de arquivos reais; Laboratório 1, passo 5.'), minutes: 40, kind: 'read' },
  { day: 'Day 5', focus: L('Lesson 5: permissions, Lab 1 steps 3–4, Lab 2 step 4.', 'Lección 5: permisos, Laboratorio 1 pasos 3–4, Laboratorio 2 paso 4.', 'Lição 5: permissões, Laboratório 1 passos 3–4, Laboratório 2 passo 4.'), minutes: 55, kind: 'practice' },
  { day: 'Day 6', focus: L('Flashcards and activities.', 'Tarjetas y actividades.', 'Cartões e atividades.'), minutes: 25, kind: 'review' },
  { day: 'Day 7', focus: L('Quiz.', 'Cuestionario.', 'Questionário.'), minutes: 25, kind: 'quiz' },
];

const resources: ExternalResource[] = [
  { id: 'os1w6-r-inode', title: 'man7.org: inode(7)', url: 'https://man7.org/linux/man-pages/man7/inode.7.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Fields of an inode and file types.', 'Campos de un inodo y tipos de archivo.', 'Campos de um inode e tipos de arquivo.') },
  { id: 'os1w6-r-chmod', title: 'man7.org: chmod(1)', url: 'https://man7.org/linux/man-pages/man1/chmod.1.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Symbolic and octal modes.', 'Modos simbólicos y octales.', 'Modos simbólicos e octais.') },
  { id: 'os1w6-r-ln', title: 'man7.org: ln(1)', url: 'https://man7.org/linux/man-pages/man1/ln.1.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Hard and symbolic links.', 'Enlaces duros y simbólicos.', 'Links físicos e simbólicos.') },
  { id: 'os1w6-r-ext4', title: 'Linux kernel docs: ext4 general information', url: 'https://docs.kernel.org/admin-guide/ext4.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Features of ext4: extents, journal.', 'Características de ext4: extensiones, diario.', 'Recursos do ext4: extensões, diário.') },
  { id: 'os1w6-r-ntfs', title: 'Microsoft Learn: NTFS overview', url: 'https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview', kind: 'article', verifiedOn: '2026-11-04', note: L('What NTFS adds to FAT.', 'Qué agrega NTFS a FAT.', 'O que o NTFS acrescenta à FAT.') },
  { id: 'os1w6-r-fs', title: 'Wikipedia: Comparison of file systems', url: 'https://en.wikipedia.org/wiki/Comparison_of_file_systems', kind: 'article', verifiedOn: '2026-11-04', note: L('Limits of every major file system.', 'Límites de los sistemas de archivos principales.', 'Limites dos principais sistemas de arquivos.') },
];

/** Operating Systems 1, Week 6: file systems. */
export const os1Week6: WeekContent = {
  id: 'y1-t1-m2-os-w6', year: 1, term: 1, module: 2, week: 6, subject: 'operating-systems-1',
  title: L('File systems', 'Sistemas de archivos', 'Sistemas de arquivos'),
  intro: L('How a pile of blocks becomes files and folders. This week: files and access methods, directories and links, how disk space is allocated, the real file systems you meet every day, and the permission model that protects them.',
    'Cómo una pila de bloques se vuelve archivos y carpetas. Esta semana: archivos y métodos de acceso, directorios y enlaces, cómo se asigna el espacio en disco, los sistemas de archivos reales que ves a diario y el modelo de permisos que los protege.',
    'Como uma pilha de blocos vira arquivos e pastas. Nesta semana: arquivos e métodos de acesso, diretórios e links, como o espaço em disco é alocado, os sistemas de arquivos reais que você vê todo dia e o modelo de permissões que os protege.'),
  objectives: [
    L('Describe files, attributes, and access methods.', 'Describir archivos, atributos y métodos de acceso.', 'Descrever arquivos, atributos e métodos de acesso.'),
    L('Use directories, hard links, symbolic links, and mounts.', 'Usar directorios, enlaces duros y simbólicos, y montajes.', 'Usar diretórios, links físicos e simbólicos e montagens.'),
    L('Compare contiguous, linked, and indexed allocation and compute inode reach.', 'Comparar la asignación contigua, enlazada e indexada y calcular el alcance de un inodo.', 'Comparar a alocação contígua, encadeada e indexada e calcular o alcance de um inode.'),
    L('Choose a file system for a job.', 'Elegir un sistema de archivos para una tarea.', 'Escolher um sistema de arquivos para uma tarefa.'),
    L('Set and read Unix permissions in octal and letters.', 'Fijar y leer permisos Unix en octal y en letras.', 'Definir e ler permissões Unix em octal e em letras.'),
  ],
  prerequisites: [L('Weeks 1 and 5: the directory tree, partitions, and blocks.', 'Semanas 1 y 5: el árbol de directorios, las particiones y los bloques.', 'Semanas 1 e 5: a árvore de diretórios, as partições e os blocos.')],
  keyConcepts: [
    L('Inode', 'Inodo', 'Inode'), L('Hard and symbolic links', 'Enlaces duros y simbólicos', 'Links físicos e simbólicos'), L('Allocation methods', 'Métodos de asignación', 'Métodos de alocação'),
    L('Journaling', 'Registro por diario', 'Registro em diário'), L('ext4 and NTFS', 'ext4 y NTFS', 'ext4 e NTFS'), L('Octal permissions', 'Permisos octales', 'Permissões octais'),
  ],
  estimatedMinutes: 250,
  sequence: [
    L('Lessons 1–2 and Lab 1: files, folders, and links on your machine.', 'Lecciones 1–2 y Laboratorio 1: archivos, carpetas y enlaces en tu máquina.', 'Lições 1–2 e Laboratório 1: arquivos, pastas e links na sua máquina.'),
    L('Lessons 3–4 and Lab 2: allocation by hand and real file systems.', 'Lecciones 3–4 y Laboratorio 2: asignación a mano y sistemas reales.', 'Lições 3–4 e Laboratório 2: alocação à mão e sistemas reais.'),
    L('Lesson 5: permissions. Then the quiz.', 'Lección 5: permisos. Luego el cuestionario.', 'Lição 5: permissões. Depois o questionário.'),
  ],
  outcomes: [
    L('You can read `ls -l` and `stat` output fluently.', 'Lees con fluidez la salida de `ls -l` y `stat`.', 'Você lê com fluência a saída de `ls -l` e `stat`.'),
    L('You can set the minimum permissions a task needs.', 'Puedes fijar los permisos mínimos que necesita una tarea.', 'Você consegue definir as permissões mínimas de que uma tarefa precisa.'),
  ],
  checklist: [
    L('Read the five lessons', 'Leer las cinco lecciones', 'Ler as cinco lições'),
    L('Finish Labs 1 and 2', 'Terminar los Laboratorios 1 y 2', 'Terminar os Laboratórios 1 e 2'),
    L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário'),
  ],
  commonMistakes: [
    { mistake: L('Using `chmod -R 777` to "fix" things.', 'Usar `chmod -R 777` para "arreglar" cosas.', 'Usar `chmod -R 777` para "consertar" coisas.'), fix: L('Find which set lacks which bit and grant only that.', 'Descubre qué conjunto carece de qué bit y da solo ese.', 'Descubra qual conjunto não tem qual bit e dê só esse.') },
  ],
  lessons: os1Week6Lessons, flashcards, questions, labs, plan, resources, activities,
  stories: [], tools: [], videos: [], documents: [],
};
