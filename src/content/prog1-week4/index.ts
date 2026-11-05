import type { Activity, ExternalResource, Lab, Lesson, Question } from '../types';
import type { WeekContent } from '../weekContent';
import { L, chk, day, ex, fc, fill, heredoc, java, lesson, match, mc, pf, same, text, tf } from '../prog1-week1/h';

const TEMPS = `public class Temps {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java Temps <t1> <t2> ...");
            return;
        }
        double[] t = new double[args.length];
        for (int i = 0; i < args.length; i++) {
            t[i] = Double.parseDouble(args[i]);
        }
        double sum = 0, max = t[0], min = t[0];
        for (double v : t) {
            sum += v;
            if (v > max) {
                max = v;
            }
            if (v < min) {
                min = v;
            }
        }
        double avg = sum / t.length;
        int above = 0;
        for (double v : t) {
            if (v > avg) {
                above++;
            }
        }
        System.out.printf("days=%d min=%.1f max=%.1f avg=%.1f above=%d%n", t.length, min, max, avg, above);
    }
}`;

const CINEMA = `public class Cinema {
    public static void main(String[] args) {
        String map = args.length > 0 ? args[0] : "0110#2002#0330";
        String[] rows = map.split("#", -1);              // -1 keeps empty rows
        int height = rows.length;
        int width = 0;
        for (String r : rows) {
            width = Math.max(width, r.length());
        }
        int[][] seats = new int[height][width];          // missing cells stay 0
        for (int r = 0; r < height; r++) {
            for (int c = 0; c < rows[r].length(); c++) {
                seats[r][c] = rows[r].charAt(c) - '0';   // '2' -> 2
            }
        }
        char[] symbol = {'.', 'X', 'R', '-'};            // free, taken, reserved, broken
        int free = 0;
        for (int r = 0; r < height; r++) {
            for (int c = 0; c < width; c++) {
                System.out.print(symbol[seats[r][c]] + " ");
                if (seats[r][c] == 0) {
                    free++;
                }
            }
            System.out.println();
        }
        System.out.println(free + " free seats");
    }
}`;

const lessons: Lesson[] = [
  lesson('p1w4-l1-arrays', L('Arrays: many values under one name', 'Arreglos: muchos valores con un nombre', 'Arrays: muitos valores com um nome'), 20,
    java(L('A week of steps, with indexes from 0 to 6.', 'Una semana de pasos, con índices de 0 a 6.', 'Uma semana de passos, com índices de 0 a 6.'),
      `public class Steps {
    public static void main(String[] args) {
        int[] steps = {6200, 8100, 7400, 10200, 5300, 9900, 12000};
        System.out.println("Days: " + steps.length);      // 7
        System.out.println("Monday: " + steps[0]);        // first
        System.out.println("Sunday: " + steps[steps.length - 1]); // last
        steps[4] = 7000;                                   // change Friday

        double[] km = new double[3];                       // 0.0, 0.0, 0.0
        km[1] = 4.5;
        System.out.println(km[0] + " " + km[1]);           // 0.0 4.5
    }
}`),
    [
      L('An **array** stores a fixed number of values of one type in consecutive memory cells. Create it with values (`int[] steps = {6200, 8100};`) or with a size (`new double[3]`). New cells start at 0, `false`, or `null`, depending on the type.',
        'Un **arreglo** guarda una cantidad fija de valores de un tipo en celdas de memoria consecutivas. Se crea con valores (`int[] steps = {6200, 8100};`) o con un tamaño (`new double[3]`). Las celdas nuevas empiezan en 0, `false` o `null`, según el tipo.',
        'Um **array** guarda um número fixo de valores de um tipo em células de memória consecutivas. Crie com valores (`int[] steps = {6200, 8100};`) ou com um tamanho (`new double[3]`). Células novas começam em 0, `false` ou `null`, conforme o tipo.'),
      L('Elements are numbered from **0**: `steps[0]` is the first and `steps[steps.length - 1]` the last. `length` is a field, without parentheses. Reading `steps[7]` in a 7-element array throws `ArrayIndexOutOfBoundsException`.',
        'Los elementos se numeran desde **0**: `steps[0]` es el primero y `steps[steps.length - 1]` el último. `length` es un campo, sin paréntesis. Leer `steps[7]` en un arreglo de 7 elementos lanza `ArrayIndexOutOfBoundsException`.',
        'Os elementos são numerados a partir de **0**: `steps[0]` é o primeiro e `steps[steps.length - 1]` o último. `length` é um campo, sem parênteses. Ler `steps[7]` num array de 7 elementos lança `ArrayIndexOutOfBoundsException`.'),
      L('You already used one: `args` is a `String[]`. A common start is to turn every argument into a number: `int[] nums = new int[args.length];` then fill `nums[i] = Integer.parseInt(args[i]);` in a loop.',
        'Ya usaste uno: `args` es un `String[]`. Un comienzo habitual es convertir cada argumento en número: `int[] nums = new int[args.length];` y luego llenar `nums[i] = Integer.parseInt(args[i]);` en un ciclo.',
        'Você já usou um: `args` é um `String[]`. Um começo comum é transformar cada argumento em número: `int[] nums = new int[args.length];` e depois preencher `nums[i] = Integer.parseInt(args[i]);` num laço.'),
    ],
    L('An array is a row of numbered lockers at a gym: one name for the whole row, and a number (starting at 0) to open each locker.',
      'Un arreglo es una fila de casilleros numerados en un gimnasio: un nombre para toda la fila y un número (desde 0) para abrir cada casillero.',
      'Um array é uma fileira de armários numerados numa academia: um nome para a fileira toda e um número (a partir de 0) para abrir cada armário.'),
    [L('Indexes go from 0 to `length - 1`.', 'Los índices van de 0 a `length - 1`.', 'Os índices vão de 0 a `length - 1`.'),
      L('Size is fixed at creation; `args` is an array.', 'El tamaño se fija al crearlo; `args` es un arreglo.', 'O tamanho é fixo na criação; `args` é um array.')],
    chk(L('`int[] a = new int[4];` What is `a[3]`, and what is `a[4]`?', '`int[] a = new int[4];` ¿Cuánto vale `a[3]` y qué pasa con `a[4]`?', '`int[] a = new int[4];` Quanto vale `a[3]` e o que acontece com `a[4]`?'),
      [L('0, and `a[4]` throws an exception', '0, y `a[4]` lanza una excepción', '0, e `a[4]` lança uma exceção'), L('4, and `a[4]` is 0', '4, y `a[4]` vale 0', '4, e `a[4]` vale 0'), L('Both are 0', 'Ambos valen 0', 'Os dois valem 0')], 0,
      L('Valid indexes are 0–3 and new `int` cells hold 0.', 'Los índices válidos son 0–3 y las celdas `int` nuevas valen 0.', 'Os índices válidos são 0–3 e células `int` novas valem 0.')),
    [pf(L('Looping with `i <= a.length`.', 'Recorrer con `i <= a.length`.', 'Percorrer com `i <= a.length`.'),
      L('Use `i < a.length`; the last index is `length - 1`.', 'Usa `i < a.length`; el último índice es `length - 1`.', 'Use `i < a.length`; o último índice é `length - 1`.'))],
    [ex('p1w4-ex-1-1', 1, L('Index practice', 'Práctica de índices', 'Prática de índices'),
      L('For `char[] grade = {\'B\', \'A\', \'C\'};` give `grade.length`, `grade[1]`, and the expression for the last element.', 'Para `char[] grade = {\'B\', \'A\', \'C\'};` da `grade.length`, `grade[1]` y la expresión del último elemento.', 'Para `char[] grade = {\'B\', \'A\', \'C\'};` dê `grade.length`, `grade[1]` e a expressão do último elemento.'),
      L('Count from 0.', 'Cuenta desde 0.', 'Conte a partir de 0.'), same("3, 'A', `grade[grade.length - 1]`.")),
    ex('p1w4-ex-1-2', 2, L('Arguments to numbers', 'Argumentos a números', 'Argumentos para números'),
      L('Turn `java Scores 7 9 4` into an `int[]` and print it with `Arrays.toString`.', 'Convierte `java Scores 7 9 4` en un `int[]` e imprímelo con `Arrays.toString`.', 'Transforme `java Scores 7 9 4` num `int[]` e imprima com `Arrays.toString`.'),
      L('`import java.util.Arrays;`', '`import java.util.Arrays;`', '`import java.util.Arrays;`'),
      same('`int[] s = new int[args.length]; for (int i = 0; i < args.length; i++) { s[i] = Integer.parseInt(args[i]); } System.out.println(Arrays.toString(s));` → `[7, 9, 4]`'))]),

  lesson('p1w4-l2-traversal', L('Traversal patterns: sum, max, search, count', 'Recorridos: suma, máximo, búsqueda, conteo', 'Percursos: soma, máximo, busca, contagem'), 20,
    java(L('Four patterns over the same array of monthly electricity bills.', 'Cuatro patrones sobre el mismo arreglo de recibos de luz mensuales.', 'Quatro padrões sobre o mesmo array de contas de luz mensais.'),
      `public class Bills {
    public static void main(String[] args) {
        double[] bills = {41.2, 38.9, 55.0, 61.3, 47.8, 39.5};
        double sum = 0;
        for (double b : bills) {                 // 1. accumulate
            sum += b;
        }
        int maxAt = 0;
        for (int i = 1; i < bills.length; i++) { // 2. best so far
            if (bills[i] > bills[maxAt]) {
                maxAt = i;
            }
        }
        int found = -1;
        for (int i = 0; i < bills.length; i++) { // 3. linear search
            if (bills[i] > 60) {
                found = i;
                break;
            }
        }
        int cheap = 0;
        for (double b : bills) {                 // 4. conditional count
            if (b < 40) {
                cheap++;
            }
        }
        System.out.printf("avg=%.2f max=%.1f (month %d) first>60 at %d cheap=%d%n",
                sum / bills.length, bills[maxAt], maxAt + 1, found, cheap);
    }
}`),
    [
      L('Most array work is one of a few **traversal patterns**. Accumulate (sum, then average), keep the best so far (max or min), search (find the first match and stop), and count the elements that meet a condition.',
        'Casi todo el trabajo con arreglos es uno de unos pocos **patrones de recorrido**. Acumular (suma y luego promedio), guardar el mejor hasta ahora (máximo o mínimo), buscar (hallar la primera coincidencia y parar) y contar los elementos que cumplen una condición.',
        'Quase todo trabalho com arrays é um de poucos **padrões de percurso**. Acumular (soma e depois média), guardar o melhor até agora (máximo ou mínimo), buscar (achar a primeira ocorrência e parar) e contar os elementos que cumprem uma condição.'),
      L('For max and min, start from the **first element**, not 0: with all-negative values a start of 0 would be wrong. Keep the index (`maxAt`) when you also need the position, such as “which month”.',
        'Para máximo y mínimo, empieza desde el **primer elemento**, no desde 0: con valores todos negativos, empezar en 0 sería un error. Guarda el índice (`maxAt`) cuando también necesites la posición, como “qué mes”.',
        'Para máximo e mínimo, comece pelo **primeiro elemento**, não por 0: com valores todos negativos, começar em 0 seria um erro. Guarde o índice (`maxAt`) quando também precisar da posição, como “que mês”.'),
      L('A **linear search** returns −1 when nothing matches; that is a common convention. Use for-each when you only read values, and an index loop when you need positions or want to change elements.',
        'Una **búsqueda lineal** devuelve −1 cuando nada coincide; es una convención común. Usa for-each cuando solo lees valores y un ciclo con índice cuando necesitas posiciones o quieres cambiar elementos.',
        'Uma **busca linear** devolve −1 quando nada bate; é uma convenção comum. Use for-each quando só lê valores e um laço com índice quando precisa de posições ou quer mudar elementos.'),
    ],
    L('Finding the max is a talent show judge who keeps only the best act so far and compares each new act with it.',
      'Encontrar el máximo es como un jurado de concurso que solo recuerda la mejor actuación hasta ahora y compara cada nueva con ella.',
      'Achar o máximo é como um jurado de show de talentos que só guarda a melhor apresentação até agora e compara cada nova com ela.'),
    [L('Sum, best so far, search, count: four patterns.', 'Suma, mejor hasta ahora, búsqueda, conteo: cuatro patrones.', 'Soma, melhor até agora, busca, contagem: quatro padrões.'),
      L('Start max/min at the first element; search returns −1 if not found.', 'Empieza máximo/mínimo en el primer elemento; la búsqueda devuelve −1 si no encuentra.', 'Comece máximo/mínimo no primeiro elemento; a busca devolve −1 se não achar.')],
    chk(L('In `Bills`, which month has the highest bill?', 'En `Bills`, ¿qué mes tiene el recibo más alto?', 'Em `Bills`, que mês tem a conta mais alta?'),
      [L('Month 3', 'Mes 3', 'Mês 3'), L('Month 4', 'Mes 4', 'Mês 4'), L('Month 6', 'Mes 6', 'Mês 6')], 1,
      L('61.3 is at index 3, which is month 4.', '61,3 está en el índice 3, que es el mes 4.', '61,3 está no índice 3, que é o mês 4.')),
    [pf(L('`int max = 0;` with negative data.', '`int max = 0;` con datos negativos.', '`int max = 0;` com dados negativos.'),
      L('Start with `max = a[0]` and loop from index 1.', 'Empieza con `max = a[0]` y recorre desde el índice 1.', 'Comece com `max = a[0]` e percorra a partir do índice 1.'))],
    [ex('p1w4-ex-2-1', 1, L('Count passes', 'Cuenta aprobados', 'Conte aprovados'),
      L('Count the grades of at least 51 in `int[] g = {45, 80, 51, 30, 99};`.', 'Cuenta las notas de al menos 51 en `int[] g = {45, 80, 51, 30, 99};`.', 'Conte as notas de pelo menos 51 em `int[] g = {45, 80, 51, 30, 99};`.'),
      L('Conditional counter.', 'Contador condicional.', 'Contador condicional.'),
      same('`int pass = 0; for (int x : g) { if (x >= 51) { pass++; } }` → 3')),
    ex('p1w4-ex-2-2', 2, L('Is it there?', '¿Está?', 'Está lá?'),
      L('Return the index of the word `"jazz"` in `String[] genres`, or −1.', 'Devuelve el índice de la palabra `"jazz"` en `String[] genres`, o −1.', 'Devolva o índice da palavra `"jazz"` em `String[] genres`, ou −1.'),
      L('Compare with `equals`.', 'Compara con `equals`.', 'Compare com `equals`.'),
      same('`int at = -1; for (int i = 0; i < genres.length; i++) { if (genres[i].equals("jazz")) { at = i; break; } }`')),
    ex('p1w4-ex-2-3', 3, L('Two best', 'Los dos mejores', 'Os dois melhores'),
      L('Find the largest and second largest values in one pass.', 'Encuentra el mayor y el segundo mayor en un solo recorrido.', 'Ache o maior e o segundo maior numa única passada.'),
      L('When a new max appears, the old max becomes second.', 'Cuando aparece un nuevo máximo, el anterior pasa a segundo.', 'Quando aparece um novo máximo, o anterior vira o segundo.'),
      same('`int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE; for (int x : a) { if (x > first) { second = first; first = x; } else if (x > second) { second = x; } }`'))]),

  lesson('p1w4-l3-insert-delete', L('Inserting and deleting in an array', 'Insertar y eliminar en un arreglo', 'Inserir e remover num array'), 20,
    java(L('A clinic waiting line with capacity 5 and a `size` counter.', 'Una fila de espera de una clínica con capacidad 5 y un contador `size`.', 'Uma fila de espera de clínica com capacidade 5 e um contador `size`.'),
      `import java.util.Arrays;

public class WaitingLine {
    public static void main(String[] args) {
        String[] line = new String[5];   // capacity
        int size = 0;                    // slots in use
        line[size] = "Ana";   size++;
        line[size] = "Tomas"; size++;
        line[size] = "Lucia"; size++;

        for (int i = size; i > 1; i--) { // insert at 1: shift right
            line[i] = line[i - 1];
        }
        line[1] = "Mateo";
        size++;
        System.out.println(Arrays.toString(Arrays.copyOf(line, size)));
        // [Ana, Mateo, Tomas, Lucia]

        for (int i = 0; i < size - 1; i++) { // delete at 0: shift left
            line[i] = line[i + 1];
        }
        size--;
        line[size] = null;
        System.out.println(Arrays.toString(Arrays.copyOf(line, size)));
        // [Mateo, Tomas, Lucia]
    }
}`),
    [
      L('An array cannot grow or shrink. To use it like a list, give it spare **capacity** and keep a separate `size` counter: cells `0` to `size - 1` are in use, the rest are free.',
        'Un arreglo no puede crecer ni encogerse. Para usarlo como lista, dale **capacidad** de sobra y lleva un contador `size` aparte: las celdas de `0` a `size - 1` están en uso y el resto libres.',
        'Um array não cresce nem encolhe. Para usá-lo como lista, dê **capacidade** de sobra e mantenha um contador `size` separado: as células de `0` a `size - 1` estão em uso e o resto livre.'),
      L('To **insert** at position `p`, shift elements one step right, starting from the end so nothing is overwritten, then write the new value and add 1 to `size`. To **delete** at `p`, shift the following elements one step left and subtract 1.',
        'Para **insertar** en la posición `p`, mueve los elementos un lugar a la derecha empezando por el final, para no pisar nada, luego escribe el valor nuevo y suma 1 a `size`. Para **eliminar** en `p`, mueve los siguientes un lugar a la izquierda y resta 1.',
        'Para **inserir** na posição `p`, desloque os elementos uma casa para a direita começando pelo fim, para não sobrescrever nada, depois escreva o valor novo e some 1 a `size`. Para **remover** em `p`, desloque os seguintes uma casa para a esquerda e subtraia 1.'),
      L('`java.util.Arrays` helps: `Arrays.toString(a)` prints, `Arrays.copyOf(a, n)` copies the first `n` (or grows into a bigger array), and `Arrays.sort(a)` sorts. When you need a list that grows by itself, Java offers `ArrayList`; here you learn what it does inside.',
        '`java.util.Arrays` ayuda: `Arrays.toString(a)` imprime, `Arrays.copyOf(a, n)` copia los primeros `n` (o crece a un arreglo mayor) y `Arrays.sort(a)` ordena. Cuando necesites una lista que crezca sola, Java ofrece `ArrayList`; aquí aprendes lo que hace por dentro.',
        '`java.util.Arrays` ajuda: `Arrays.toString(a)` imprime, `Arrays.copyOf(a, n)` copia os primeiros `n` (ou cresce para um array maior) e `Arrays.sort(a)` ordena. Quando precisar de uma lista que cresce sozinha, Java oferece `ArrayList`; aqui você aprende o que ela faz por dentro.'),
    ],
    L('Inserting is letting someone into a cinema row: everyone to the right shuffles one seat along, starting with the person at the end.',
      'Insertar es dejar que alguien entre a una fila del cine: todos los de la derecha se corren un asiento, empezando por el del extremo.',
      'Inserir é deixar alguém entrar numa fileira do cinema: todos à direita chegam uma cadeira para o lado, começando pelo da ponta.'),
    [L('Capacity + `size` counter turn an array into a list.', 'Capacidad + contador `size` convierten un arreglo en una lista.', 'Capacidade + contador `size` transformam um array numa lista.'),
      L('Insert: shift right from the end. Delete: shift left.', 'Insertar: mover a la derecha desde el final. Eliminar: mover a la izquierda.', 'Inserir: deslocar à direita desde o fim. Remover: deslocar à esquerda.')],
    chk(L('Why does the insert loop go from the end towards `p`?', '¿Por qué el ciclo de inserción va desde el final hacia `p`?', 'Por que o laço de inserção vai do fim até `p`?'),
      [L('It is faster', 'Es más rápido', 'É mais rápido'), L('Going forward would overwrite values before moving them', 'Ir hacia adelante pisaría valores antes de moverlos', 'Ir para frente sobrescreveria valores antes de movê-los'), L('Java requires it', 'Java lo exige', 'Java exige')], 1,
      L('Copying `line[1]` into `line[2]` first would destroy `line[2]` before it moved.', 'Copiar primero `line[1]` en `line[2]` destruiría `line[2]` antes de moverlo.', 'Copiar primeiro `line[1]` em `line[2]` destruiria `line[2]` antes de movê-lo.')),
    [pf(L('Inserting when `size == line.length`.', 'Insertar cuando `size == line.length`.', 'Inserir quando `size == line.length`.'),
      L('Check for space first, or grow with `Arrays.copyOf(line, line.length * 2)`.', 'Revisa primero si hay espacio o crece con `Arrays.copyOf(line, line.length * 2)`.', 'Confira primeiro se há espaço ou cresça com `Arrays.copyOf(line, line.length * 2)`.'))],
    [ex('p1w4-ex-3-1', 1, L('Trace a delete', 'Recorre una eliminación', 'Percorra uma remoção'),
      L('`{3, 8, 5, 9}` with `size` 4; delete position 1. Write the array and `size` afterwards.', '`{3, 8, 5, 9}` con `size` 4; elimina la posición 1. Escribe el arreglo y `size` después.', '`{3, 8, 5, 9}` com `size` 4; remova a posição 1. Escreva o array e `size` depois.'),
      L('Shift 5 and 9 left.', 'Mueve 5 y 9 a la izquierda.', 'Desloque 5 e 9 para a esquerda.'),
      L('`{3, 5, 9, 9}` with `size` 3 (the last cell is now unused; set it to 0 for tidiness).', '`{3, 5, 9, 9}` con `size` 3 (la última celda queda sin uso; ponla en 0 para que quede limpia).', '`{3, 5, 9, 9}` com `size` 3 (a última célula fica sem uso; zere para ficar limpo).')),
    ex('p1w4-ex-3-2', 2, L('Sorted insert', 'Inserción ordenada', 'Inserção ordenada'),
      L('Insert 6 into the sorted `{2, 4, 7, 9, _}` (`size` 4) so it stays sorted.', 'Inserta 6 en el arreglo ordenado `{2, 4, 7, 9, _}` (`size` 4) para que siga ordenado.', 'Insira 6 no array ordenado `{2, 4, 7, 9, _}` (`size` 4) para que continue ordenado.'),
      L('Shift right while the element on the left is bigger than 6.', 'Mueve a la derecha mientras el elemento de la izquierda sea mayor que 6.', 'Desloque para a direita enquanto o elemento à esquerda for maior que 6.'),
      same('`int i = size; while (i > 0 && a[i - 1] > 6) { a[i] = a[i - 1]; i--; } a[i] = 6; size++;` → `{2, 4, 6, 7, 9}`'))]),

  lesson('p1w4-l4-matrices', L('Two-dimensional arrays: grids', 'Arreglos bidimensionales: cuadrículas', 'Arrays bidimensionais: grades'), 25,
    java(L('Build a cinema seat map from one argument: `#` ends each row. Run: `java Cinema "0110#2002#0330"`.', 'Arma un mapa de asientos de cine desde un argumento: `#` cierra cada fila. Ejecuta: `java Cinema "0110#2002#0330"`.', 'Monte um mapa de poltronas de cinema a partir de um argumento: `#` fecha cada linha. Rode: `java Cinema "0110#2002#0330"`.'), CINEMA),
    [
      L('A **2D array** is an array of rows: `int[][] seats = new int[3][4];` has 3 rows and 4 columns, and `seats[r][c]` is row `r`, column `c`. `seats.length` gives the rows and `seats[0].length` the columns.',
        'Un **arreglo 2D** es un arreglo de filas: `int[][] seats = new int[3][4];` tiene 3 filas y 4 columnas, y `seats[r][c]` es la fila `r`, columna `c`. `seats.length` da las filas y `seats[0].length` las columnas.',
        'Um **array 2D** é um array de linhas: `int[][] seats = new int[3][4];` tem 3 linhas e 4 colunas, e `seats[r][c]` é a linha `r`, coluna `c`. `seats.length` dá as linhas e `seats[0].length` as colunas.'),
      L('Traverse with nested loops: the outer one over rows, the inner one over columns, exactly like last week’s patterns. Rows can even have different lengths (a **jagged** array), which is why the safe inner limit is `grid[r].length`.',
        'Se recorre con ciclos anidados: el externo sobre filas y el interno sobre columnas, igual que los patrones de la semana pasada. Las filas incluso pueden tener largos distintos (arreglo **irregular**), por eso el límite interno seguro es `grid[r].length`.',
        'Percorra com laços aninhados: o externo nas linhas e o interno nas colunas, igual aos padrões da semana passada. As linhas podem até ter tamanhos diferentes (array **irregular**), por isso o limite interno seguro é `grid[r].length`.'),
      L('A grid often arrives as text in one argument. `split("#", -1)` gives the rows (the `-1` keeps empty trailing rows, which `split` would otherwise drop), and `row.charAt(c) - \'0\'` turns the digit character `\'2\'` into the number 2. Short rows simply leave zeros.',
        'Una cuadrícula a menudo llega como texto en un argumento. `split("#", -1)` da las filas (el `-1` conserva las filas vacías del final, que `split` descartaría) y `row.charAt(c) - \'0\'` convierte el carácter `\'2\'` en el número 2. Las filas cortas simplemente dejan ceros.',
        'Uma grade muitas vezes chega como texto num argumento. `split("#", -1)` dá as linhas (o `-1` mantém as linhas vazias do fim, que o `split` descartaria) e `row.charAt(c) - \'0\'` transforma o caractere `\'2\'` no número 2. Linhas curtas simplesmente deixam zeros.'),
    ],
    L('A 2D array is a spreadsheet: the first index chooses the row, the second the column.',
      'Un arreglo 2D es una hoja de cálculo: el primer índice elige la fila y el segundo la columna.',
      'Um array 2D é uma planilha: o primeiro índice escolhe a linha e o segundo a coluna.'),
    [L('`grid[row][col]`; rows = `grid.length`, columns = `grid[r].length`.', '`grid[fila][col]`; filas = `grid.length`, columnas = `grid[r].length`.', '`grid[linha][col]`; linhas = `grid.length`, colunas = `grid[r].length`.'),
      L('Text to grid: `split("#", -1)` and `charAt(c) - \'0\'`.', 'De texto a cuadrícula: `split("#", -1)` y `charAt(c) - \'0\'`.', 'De texto para grade: `split("#", -1)` e `charAt(c) - \'0\'`.')],
    chk(L('How many free seats does the default map `0110#2002#0330` have?', '¿Cuántos asientos libres tiene el mapa por defecto `0110#2002#0330`?', 'Quantas poltronas livres tem o mapa padrão `0110#2002#0330`?'),
      [same('4'), same('6'), same('5')], 1,
      L('Zeros: 2 in row 0, 2 in row 1, 2 in row 2.', 'Ceros: 2 en la fila 0, 2 en la fila 1 y 2 en la fila 2.', 'Zeros: 2 na linha 0, 2 na linha 1 e 2 na linha 2.')),
    [pf(L('Swapping indexes: `grid[c][r]`.', 'Invertir índices: `grid[c][r]`.', 'Trocar os índices: `grid[c][r]`.'),
      L('Always row first, column second; name the variables `r` and `c`.', 'Siempre fila primero y columna después; llama a las variables `r` y `c`.', 'Sempre linha primeiro e coluna depois; chame as variáveis de `r` e `c`.'))],
    [ex('p1w4-ex-4-1', 1, L('Row sums', 'Sumas por fila', 'Somas por linha'),
      L('Print the sum of each row of `int[][] sales = {{3, 5}, {2, 2}, {7, 1}};`.', 'Imprime la suma de cada fila de `int[][] sales = {{3, 5}, {2, 2}, {7, 1}};`.', 'Imprima a soma de cada linha de `int[][] sales = {{3, 5}, {2, 2}, {7, 1}};`.'),
      L('Reset the sum at the start of each row.', 'Reinicia la suma al empezar cada fila.', 'Zere a soma no começo de cada linha.'),
      L('`for (int[] row : sales) { int s = 0; for (int v : row) { s += v; } System.out.println(s); }` → 8, 4, 8.', '`for (int[] row : sales) { int s = 0; for (int v : row) { s += v; } System.out.println(s); }` → 8, 4, 8.', '`for (int[] row : sales) { int s = 0; for (int v : row) { s += v; } System.out.println(s); }` → 8, 4, 8.')),
    ex('p1w4-ex-4-2', 2, L('Parse a map', 'Lee un mapa', 'Leia um mapa'),
      L('What grid does `"12#3##"` give with `split("#", -1)` and width 2? And with plain `split("#")`?', '¿Qué cuadrícula da `"12#3##"` con `split("#", -1)` y ancho 2? ¿Y con `split("#")` a secas?', 'Que grade `"12#3##"` dá com `split("#", -1)` e largura 2? E com `split("#")` simples?'),
      L('Count the pieces between the `#`.', 'Cuenta los trozos entre los `#`.', 'Conte os pedaços entre os `#`.'),
      L('With `-1`: 4 rows `{1,2}`, `{3,0}`, `{0,0}`, `{0,0}`. Plain `split` drops the empty trailing rows: only 2 rows.', 'Con `-1`: 4 filas `{1,2}`, `{3,0}`, `{0,0}`, `{0,0}`. El `split` simple descarta las filas vacías finales: solo 2 filas.', 'Com `-1`: 4 linhas `{1,2}`, `{3,0}`, `{0,0}`, `{0,0}`. O `split` simples descarta as linhas vazias do fim: só 2 linhas.'))]),

  lesson('p1w4-l5-neighbours', L('Neighbours and generations on a grid', 'Vecinos y generaciones en una cuadrícula', 'Vizinhos e gerações numa grade'), 25,
    java(L('Mould spreads on a slice of bread: an empty cell with 2 or more mouldy neighbours becomes mouldy.', 'El moho se extiende en una rebanada de pan: una celda vacía con 2 o más vecinas con moho pasa a tener moho.', 'O mofo se espalha numa fatia de pão: uma célula vazia com 2 ou mais vizinhas com mofo fica com mofo.'),
      `import java.util.Arrays;

public class Mould {
    public static void main(String[] args) {
        int[][] bread = {
            {0, 0, 0, 0},
            {0, 1, 1, 0},
            {0, 0, 0, 0},
        };
        int rows = bread.length, cols = bread[0].length;
        int[][] next = new int[rows][cols];            // never update in place
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int around = 0;
                for (int dr = -1; dr <= 1; dr++) {     // the 8 neighbours
                    for (int dc = -1; dc <= 1; dc++) {
                        int nr = r + dr, nc = c + dc;
                        boolean inside = nr >= 0 && nr < rows && nc >= 0 && nc < cols;
                        if (inside && !(dr == 0 && dc == 0) && bread[nr][nc] == 1) {
                            around++;
                        }
                    }
                }
                next[r][c] = (bread[r][c] == 1 || around >= 2) ? 1 : 0;
            }
        }
        for (int[] row : next) {
            System.out.println(Arrays.toString(row));
        }
    }
}`),
    [
      L('Many simulations update a grid step by step, in **generations**, using rules about each cell’s neighbours. The 8 cells around `(r, c)` are found with two offsets, `dr` and `dc`, each from −1 to 1, skipping `(0, 0)`, which is the cell itself.',
        'Muchas simulaciones actualizan una cuadrícula paso a paso, en **generaciones**, con reglas sobre los vecinos de cada celda. Las 8 celdas alrededor de `(r, c)` se encuentran con dos desplazamientos, `dr` y `dc`, cada uno de −1 a 1, saltando `(0, 0)`, que es la propia celda.',
        'Muitas simulações atualizam uma grade passo a passo, em **gerações**, com regras sobre os vizinhos de cada célula. As 8 células em volta de `(r, c)` são achadas com dois deslocamentos, `dr` e `dc`, cada um de −1 a 1, pulando `(0, 0)`, que é a própria célula.'),
      L('At the edges some neighbours do not exist. Check the **bounds** (`nr >= 0 && nr < rows && …`) before reading, or you get `ArrayIndexOutOfBoundsException`. A wider ring (the 16 cells two steps away) works the same with offsets from −2 to 2.',
        'En los bordes algunos vecinos no existen. Revisa los **límites** (`nr >= 0 && nr < rows && …`) antes de leer o tendrás `ArrayIndexOutOfBoundsException`. Un anillo más ancho (las 16 celdas a dos pasos) funciona igual con desplazamientos de −2 a 2.',
        'Nas bordas alguns vizinhos não existem. Confira os **limites** (`nr >= 0 && nr < rows && …`) antes de ler, senão vem `ArrayIndexOutOfBoundsException`. Um anel mais largo (as 16 células a dois passos) funciona igual com deslocamentos de −2 a 2.'),
      L('Write the new generation into a **new grid**. If you changed `bread` while scanning it, cells later in the scan would see a mix of old and new values and the rule would be wrong. When the step ends, the new grid replaces the old one.',
        'Escribe la nueva generación en una **cuadrícula nueva**. Si cambiaras `bread` mientras la recorres, las celdas posteriores verían una mezcla de valores viejos y nuevos y la regla fallaría. Al terminar el paso, la cuadrícula nueva reemplaza a la vieja.',
        'Escreva a nova geração numa **grade nova**. Se você mudasse `bread` enquanto a percorre, as células seguintes veriam uma mistura de valores velhos e novos e a regra falharia. No fim do passo, a grade nova substitui a velha.'),
    ],
    L('A generation is a class photo: everyone decides how to pose by looking at the others as they were a moment ago, and only then the new photo is taken.',
      'Una generación es una foto de clase: cada uno decide cómo posar mirando a los demás como estaban un momento antes, y solo entonces se toma la foto nueva.',
      'Uma geração é uma foto de turma: cada um decide como posar olhando os outros como estavam um instante antes, e só então a foto nova é tirada.'),
    [L('Neighbours: offsets −1..1 except (0, 0), with bounds checks.', 'Vecinos: desplazamientos −1..1 salvo (0, 0), revisando límites.', 'Vizinhos: deslocamentos −1..1 menos (0, 0), conferindo limites.'),
      L('Compute the next generation into a new grid.', 'Calcula la siguiente generación en una cuadrícula nueva.', 'Calcule a próxima geração numa grade nova.')],
    chk(L('After one step of `Mould`, how many mouldy cells are there?', 'Tras un paso de `Mould`, ¿cuántas celdas tienen moho?', 'Depois de um passo de `Mould`, quantas células têm mofo?'),
      [same('2'), same('4'), same('6')], 2,
      L('The two mouldy cells stay, and the 4 cells above and below them each have 2 mouldy neighbours.', 'Las dos celdas con moho siguen, y las 4 de arriba y abajo tienen 2 vecinas con moho cada una.', 'As duas células com mofo continuam, e as 4 de cima e de baixo têm 2 vizinhas com mofo cada uma.')),
    [pf(L('Updating the grid in place during the scan.', 'Actualizar la cuadrícula en el mismo recorrido.', 'Atualizar a grade no mesmo percurso.'),
      L('Read from the old grid, write to a new one, swap at the end.', 'Lee de la vieja, escribe en una nueva y cámbialas al final.', 'Leia da velha, escreva numa nova e troque no fim.'))],
    [ex('p1w4-ex-5-1', 1, L('Corner neighbours', 'Vecinos de una esquina', 'Vizinhos de um canto'),
      L('How many neighbours does a corner cell have? An edge cell? An inner cell?', '¿Cuántos vecinos tiene una celda de esquina? ¿Una de borde? ¿Una interior?', 'Quantos vizinhos tem uma célula de canto? Uma de borda? Uma interna?'),
      L('Draw a 3×3 block and cut it at the border.', 'Dibuja un bloque de 3×3 y córtalo en el borde.', 'Desenhe um bloco 3×3 e corte na borda.'), same('3, 5, 8.')),
    ex('p1w4-ex-5-2', 3, L('Two generations', 'Dos generaciones', 'Duas gerações'),
      L('Run the `Mould` rule twice. Which cells are still clean after generation 2?', 'Aplica la regla de `Mould` dos veces. ¿Qué celdas siguen limpias tras la generación 2?', 'Aplique a regra do `Mould` duas vezes. Que células continuam limpas depois da geração 2?'),
      L('After step 1 the two middle columns are fully mouldy.', 'Tras el paso 1 las dos columnas centrales están llenas de moho.', 'Depois do passo 1 as duas colunas do meio estão cheias de mofo.'),
      L('None: every cell of columns 0 and 3 now touches at least 2 mouldy cells, so the whole slice is mouldy.', 'Ninguna: cada celda de las columnas 0 y 3 toca ahora al menos 2 con moho, así que toda la rebanada tiene moho.', 'Nenhuma: cada célula das colunas 0 e 3 agora encosta em pelo menos 2 com mofo, então a fatia toda fica com mofo.'))]),

  lesson('p1w4-l6-debugging', L('Desk checking and debugging', 'Prueba de escritorio y depuración', 'Teste de mesa e depuração'), 20,
    text(L('A desk check (trace table) of a buggy average finds the bug before running.', 'Una prueba de escritorio (tabla de seguimiento) de un promedio con error encuentra el fallo antes de ejecutar.', 'Um teste de mesa (tabela de rastreio) de uma média com erro acha a falha antes de rodar.'),
      `int[] a = {4, 8, 6};
int sum = 0;
for (int i = 1; i < a.length; i++) { sum += a[i]; }   // bug: starts at 1
double avg = sum / a.length;                          // bug: int division

step   i   a[i]   sum   note
init   -    -      0
1      1    8      8    a[0] = 4 was skipped!
2      2    6     14
end    3    -     14    avg = 14 / 3 = 4  (expected 6.0)`),
    [
      L('Errors come in three kinds. **Syntax** errors stop `javac` (a missing `;`). **Runtime** errors crash a running program (`ArrayIndexOutOfBoundsException`, `NumberFormatException`). **Logic** errors run quietly and give wrong results, and they are the hardest to find.',
        'Los errores son de tres tipos. Los de **sintaxis** detienen a `javac` (un `;` faltante). Los de **ejecución** hacen fallar un programa en marcha (`ArrayIndexOutOfBoundsException`, `NumberFormatException`). Los de **lógica** corren sin aviso y dan resultados incorrectos, y son los más difíciles de encontrar.',
        'Os erros são de três tipos. Os de **sintaxe** param o `javac` (um `;` faltando). Os de **execução** quebram um programa rodando (`ArrayIndexOutOfBoundsException`, `NumberFormatException`). Os de **lógica** rodam calados e dão resultados errados, e são os mais difíceis de achar.'),
      L('A **desk check** traces the code by hand in a table: one column per variable, one row per step. Compare each value with what you expected, and the first difference points at the bug. Above, the table shows `a[0]` was skipped.',
        'Una **prueba de escritorio** recorre el código a mano en una tabla: una columna por variable y una fila por paso. Compara cada valor con lo esperado; la primera diferencia señala el error. Arriba, la tabla muestra que se saltó `a[0]`.',
        'Um **teste de mesa** percorre o código à mão numa tabela: uma coluna por variável e uma linha por passo. Compare cada valor com o esperado; a primeira diferença aponta o erro. Acima, a tabela mostra que `a[0]` foi pulado.'),
      L('A **debugger** does the same automatically. Click the margin to set a **breakpoint**, start with Debug instead of Run, then step over (next line) or step into (enter a method) while the Variables panel shows every value. Set program arguments in the same run configuration you use for Debug.',
        'Un **depurador** hace lo mismo automáticamente. Haz clic en el margen para poner un **punto de interrupción**, inicia con Debug en lugar de Run y avanza paso a paso (siguiente línea) o entra a un método mientras el panel de variables muestra cada valor. Los argumentos del programa van en la misma configuración que usas para Debug.',
        'Um **depurador** faz o mesmo automaticamente. Clique na margem para pôr um **ponto de parada**, inicie com Debug em vez de Run e avance passo a passo (próxima linha) ou entre num método enquanto o painel de variáveis mostra cada valor. Os argumentos do programa ficam na mesma configuração que você usa para Debug.'),
    ],
    L('A desk check is replaying a football match on paper, move by move; the debugger is the video replay with a pause button.',
      'Una prueba de escritorio es repetir un partido en papel jugada por jugada; el depurador es la repetición en video con botón de pausa.',
      'Um teste de mesa é repetir uma partida no papel lance por lance; o depurador é o replay em vídeo com botão de pausa.'),
    [L('Syntax, runtime, logic: three kinds of error.', 'Sintaxis, ejecución, lógica: tres tipos de error.', 'Sintaxe, execução, lógica: três tipos de erro.'),
      L('Trace table or breakpoints: find the first wrong value.', 'Tabla de seguimiento o puntos de interrupción: encuentra el primer valor incorrecto.', 'Tabela de rastreio ou pontos de parada: ache o primeiro valor errado.')],
    chk(L('Which kind of error is `double avg = sum / a.length;` with `int` values?', '¿Qué tipo de error es `double avg = sum / a.length;` con valores `int`?', 'Que tipo de erro é `double avg = sum / a.length;` com valores `int`?'),
      [L('Syntax', 'Sintaxis', 'Sintaxe'), L('Runtime', 'Ejecución', 'Execução'), L('Logic', 'Lógica', 'Lógica')], 2,
      L('It compiles and runs but gives 4 instead of 4.67: a logic error.', 'Compila y corre, pero da 4 en lugar de 4,67: un error de lógica.', 'Compila e roda, mas dá 4 em vez de 4,67: um erro de lógica.')),
    [pf(L('Changing code at random until it works.', 'Cambiar código al azar hasta que funcione.', 'Mudar o código ao acaso até funcionar.'),
      L('Reproduce, trace, find the first wrong value, then fix that one line.', 'Reproduce, recorre, encuentra el primer valor incorrecto y corrige esa línea.', 'Reproduza, percorra, ache o primeiro valor errado e corrija essa linha.'))],
    [ex('p1w4-ex-6-1', 1, L('Fix the average', 'Corrige el promedio', 'Corrija a média'),
      L('Fix both bugs in the traced code.', 'Corrige los dos errores del código recorrido.', 'Corrija os dois erros do código percorrido.'),
      L('Start index and division.', 'Índice inicial y división.', 'Índice inicial e divisão.'),
      L('Loop from `i = 0` and divide with `(double) sum / a.length` → 6.0.', 'Recorre desde `i = 0` y divide con `(double) sum / a.length` → 6,0.', 'Percorra a partir de `i = 0` e divida com `(double) sum / a.length` → 6,0.')),
    ex('p1w4-ex-6-2', 2, L('Desk-check a search', 'Prueba de escritorio de una búsqueda', 'Teste de mesa de uma busca'),
      L('Trace `found` and `i` for a search of 7 in `{3, 7, 7, 1}` with `break`. What is printed?', 'Recorre `found` e `i` buscando 7 en `{3, 7, 7, 1}` con `break`. ¿Qué se imprime?', 'Percorra `found` e `i` buscando 7 em `{3, 7, 7, 1}` com `break`. O que é impresso?'),
      L('`break` stops at the first match.', '`break` se detiene en la primera coincidencia.', '`break` para na primeira ocorrência.'),
      L('i = 0: no; i = 1: yes, `found = 1`, break. Prints 1.', 'i = 0: no; i = 1: sí, `found = 1`, break. Imprime 1.', 'i = 0: não; i = 1: sim, `found = 1`, break. Imprime 1.'))]),
];

const questions: Question[] = [
  mc('p1w4-q1', 'code', 'p1w4-l1-arrays', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('3 9'), same('3 5'), same('4 9')], 0,
    L('`length` is 3 and the last index is 2, holding 9.', '`length` vale 3 y el último índice es 2, con 9.', '`length` vale 3 e o último índice é 2, com 9.'), 'int[] a = {1, 5, 9};\nSystem.out.println(a.length + " " + a[a.length - 1]);'),
  mc('p1w4-q2', 'troubleshooting', 'p1w4-l1-arrays', L('`for (int i = 0; i <= a.length; i++)` crashes at the end. Why?', '`for (int i = 0; i <= a.length; i++)` falla al final. ¿Por qué?', '`for (int i = 0; i <= a.length; i++)` quebra no fim. Por quê?'),
    [L('`i` reaches `a.length`, which is not a valid index', '`i` llega a `a.length`, que no es un índice válido', '`i` chega a `a.length`, que não é um índice válido'), L('Arrays start at 1', 'Los arreglos empiezan en 1', 'Arrays começam em 1'), L('`length` needs parentheses', '`length` necesita paréntesis', '`length` precisa de parênteses')], 0,
    L('Use `<` so the last index is `length - 1`.', 'Usa `<` para que el último índice sea `length - 1`.', 'Use `<` para que o último índice seja `length - 1`.')),
  mc('p1w4-q3', 'code', 'p1w4-l2-traversal', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('-1'), same('-3'), same('0')], 0,
    L('It keeps the largest, starting from the first element: −1.', 'Guarda el mayor empezando por el primer elemento: −1.', 'Guarda o maior começando pelo primeiro elemento: −1.'), 'int[] t = {-4, -1, -3};\nint best = t[0];\nfor (int v : t) {\n    if (v > best) {\n        best = v;\n    }\n}\nSystem.out.println(best);'),
  fill('p1w4-q4', 'fill-blank', 'p1w4-l2-traversal', L('By convention, a linear search that finds nothing returns ____.', 'Por convención, una búsqueda lineal que no encuentra nada devuelve ____.', 'Por convenção, uma busca linear que não acha nada devolve ____.'), ['-1'],
    L('−1 can never be a valid index.', '−1 nunca puede ser un índice válido.', '−1 nunca pode ser um índice válido.')),
  tf('p1w4-q5', 'p1w4-l3-insert-delete', L('An array created with `new int[5]` can later hold 6 elements.', 'Un arreglo creado con `new int[5]` puede luego guardar 6 elementos.', 'Um array criado com `new int[5]` pode depois guardar 6 elementos.'), false,
    L('Its size is fixed; you need a new, bigger array (for example with `Arrays.copyOf`).', 'Su tamaño es fijo; necesitas un arreglo nuevo y más grande (por ejemplo con `Arrays.copyOf`).', 'O tamanho é fixo; você precisa de um array novo e maior (por exemplo com `Arrays.copyOf`).')),
  mc('p1w4-q6', 'code', 'p1w4-l4-matrices', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('2 3 6'), same('3 2 6'), same('2 3 4')], 0,
    L('2 rows, 3 columns; `m[1][2]` is row 1, column 2: 6.', '2 filas, 3 columnas; `m[1][2]` es fila 1, columna 2: 6.', '2 linhas, 3 colunas; `m[1][2]` é linha 1, coluna 2: 6.'), 'int[][] m = {{1, 2, 3}, {4, 5, 6}};\nSystem.out.println(m.length + " " + m[0].length + " " + m[1][2]);'),
  mc('p1w4-q7', 'code', 'p1w4-l4-matrices', L('What value does this store?', '¿Qué valor guarda?', 'Que valor guarda?'), [same('3'), same('51'), same("'3'")], 0,
    L('Subtracting `\'0\'` turns the digit character into its number.', 'Restar `\'0\'` convierte el carácter del dígito en su número.', 'Subtrair `\'0\'` transforma o caractere do dígito em seu número.'), 'String row = "0312";\nint v = row.charAt(1) - \'0\';'),
  mc('p1w4-q8', 'scenario', 'p1w4-l5-neighbours', L('A simulation changes cells in the same grid while scanning it, and results depend on scan order. What is the fix?', 'Una simulación cambia celdas en la misma cuadrícula mientras la recorre y el resultado depende del orden. ¿Cuál es la solución?', 'Uma simulação muda células na mesma grade enquanto a percorre e o resultado depende da ordem. Qual é a correção?'),
    [L('Write the next generation into a new grid', 'Escribir la siguiente generación en una cuadrícula nueva', 'Escrever a próxima geração numa grade nova'), L('Scan from right to left', 'Recorrer de derecha a izquierda', 'Percorrer da direita para a esquerda'), L('Check bounds', 'Revisar límites', 'Conferir limites')], 0,
    L('Every cell must see the old generation; only a separate grid guarantees that.', 'Cada celda debe ver la generación anterior; solo una cuadrícula aparte lo garantiza.', 'Cada célula deve ver a geração anterior; só uma grade separada garante isso.')),
  match('p1w4-q9', 'p1w4-l6-debugging', L('Match each problem with its kind of error.', 'Relaciona cada problema con su tipo de error.', 'Ligue cada problema ao seu tipo de erro.'),
    [L('Missing semicolon', 'Falta un punto y coma', 'Falta um ponto e vírgula'), L('Index 5 out of bounds for length 5', 'Índice 5 fuera de rango para largo 5', 'Índice 5 fora do limite para tamanho 5'), L('Average is 4 instead of 4.67', 'El promedio da 4 en lugar de 4,67', 'A média dá 4 em vez de 4,67')],
    [L('Logic', 'Lógica', 'Lógica'), L('Syntax', 'Sintaxis', 'Sintaxe'), L('Runtime', 'Ejecución', 'Execução')], [1, 2, 0],
    L('The compiler catches syntax; the JVM reports runtime errors; only tests reveal logic errors.', 'El compilador detecta la sintaxis; la JVM informa los de ejecución; solo las pruebas revelan los de lógica.', 'O compilador pega a sintaxe; a JVM informa os de execução; só os testes revelam os de lógica.')),
];

const activities: Activity[] = [
  { id: 'p1w4-act-fill-max', kind: 'code-fill', lessonId: 'p1w4-l2-traversal', title: L('Best so far', 'El mejor hasta ahora', 'O melhor até agora'),
    prompt: L('Complete the max pattern.', 'Completa el patrón del máximo.', 'Complete o padrão do máximo.'),
    template: 'int[] goals = {2, 5, 1, 4};\nint max = goals[{0}];\nfor (int i = 1; i < goals.{1}; i++) {\n    if (goals[i] {2} max) {\n        max = goals[i];\n    }\n}',
    blanks: ['0', 'length', '>'], explanation: L('Start from the first element and keep anything larger.', 'Empieza con el primer elemento y guarda lo que sea mayor.', 'Comece com o primeiro elemento e guarde o que for maior.') },
  { id: 'p1w4-act-order-insert', kind: 'order', lessonId: 'p1w4-l3-insert-delete', title: L('Insert at position p', 'Insertar en la posición p', 'Inserir na posição p'),
    prompt: L('Order the steps.', 'Ordena los pasos.', 'Ordene os passos.'),
    items: [L('Check that `size < capacity`', 'Comprobar que `size < capacidad`', 'Conferir que `size < capacidade`'), L('Shift elements right, from the end down to `p`', 'Mover elementos a la derecha, desde el final hasta `p`', 'Deslocar elementos à direita, do fim até `p`'), L('Write the new value at `p`', 'Escribir el valor nuevo en `p`', 'Escrever o valor novo em `p`'), L('Add 1 to `size`', 'Sumar 1 a `size`', 'Somar 1 a `size`')],
    explanation: L('Shifting from the end keeps every value safe.', 'Mover desde el final protege cada valor.', 'Deslocar a partir do fim protege cada valor.') },
  { id: 'p1w4-act-fill-grid', kind: 'code-fill', lessonId: 'p1w4-l4-matrices', title: L('Walk the grid', 'Recorre la cuadrícula', 'Percorra a grade'),
    prompt: L('Complete the nested loops that count 1s.', 'Completa los ciclos anidados que cuentan los 1.', 'Complete os laços aninhados que contam os 1.'),
    template: 'int[][] g = {{1, 0}, {1, 1}};\nint ones = 0;\nfor (int r = 0; r < g.{0}; r++) {\n    for (int c = 0; c < g[{1}].length; c++) {\n        if (g[r][{2}] == 1) {\n            ones++;\n        }\n    }\n}',
    blanks: ['length', 'r', 'c'], explanation: L('Rows: `g.length`; columns of row `r`: `g[r].length`.', 'Filas: `g.length`; columnas de la fila `r`: `g[r].length`.', 'Linhas: `g.length`; colunas da linha `r`: `g[r].length`.') },
  { id: 'p1w4-act-errors', kind: 'classify', lessonId: 'p1w4-l6-debugging', title: L('Which kind of error?', '¿Qué tipo de error?', 'Que tipo de erro?'),
    prompt: L('Sort each problem.', 'Clasifica cada problema.', 'Classifique cada problema.'),
    buckets: [L('Syntax', 'Sintaxis', 'Sintaxe'), L('Runtime', 'Ejecución', 'Execução'), L('Logic', 'Lógica', 'Lógica')],
    items: [
      { text: L('`System.out.println("Hi")` without `;`', '`System.out.println("Hi")` sin `;`', '`System.out.println("Hi")` sem `;`'), bucket: 0 },
      { text: same('NumberFormatException'), bucket: 1 },
      { text: L('Loop starts at 1 and skips the first element', 'El ciclo empieza en 1 y salta el primer elemento', 'O laço começa em 1 e pula o primeiro elemento'), bucket: 2 },
      { text: L('`int x = "five";`', '`int x = "five";`', '`int x = "five";`'), bucket: 0 },
      { text: same('ArrayIndexOutOfBoundsException'), bucket: 1 },
      { text: L('Uses `>` where the rule says `>=`', 'Usa `>` donde la regla dice `>=`', 'Usa `>` onde a regra diz `>=`'), bucket: 2 },
    ],
    explanation: L('The compiler stops syntax errors; the JVM throws runtime errors; logic errors need tests.', 'El compilador detiene los de sintaxis; la JVM lanza los de ejecución; los de lógica necesitan pruebas.', 'O compilador barra os de sintaxe; a JVM lança os de execução; os de lógica precisam de testes.') },
];

const labs: Lab[] = [
  { id: 'p1w4-lab1-arrays', level: 2, minutes: 45, title: L('Temperature statistics from arguments', 'Estadísticas de temperatura desde argumentos', 'Estatísticas de temperatura a partir de argumentos'),
    goal: L('Load `args` into an array and apply the traversal patterns.', 'Cargar `args` en un arreglo y aplicar los patrones de recorrido.', 'Carregar `args` num array e aplicar os padrões de percurso.'),
    steps: [
      { id: 'p1w4-lab1-s1', title: L('Create and run Temps.java', 'Crea y ejecuta Temps.java', 'Crie e rode Temps.java'), commands: ['mkdir -p ~/prog1/week4 && cd ~/prog1/week4', ...heredoc('Temps.java', TEMPS), 'javac Temps.java', 'java Temps 18.5 21 19.5 24 17'],
        expected: same('`days=5 min=17.0 max=24.0 avg=20.0 above=2`') },
      { id: 'p1w4-lab1-s2', title: L('Edge cases', 'Casos límite', 'Casos-limite'), commands: ['java Temps', 'java Temps 5', 'java Temps -3 -8 -1'],
        expected: L('Usage line; `days=1 min=5.0 max=5.0 avg=5.0 above=0`; `days=3 min=-8.0 max=-1.0 avg=-4.0 above=2` (max works with negatives because it starts at `t[0]`).', 'Línea de uso; `days=1 min=5.0 max=5.0 avg=5.0 above=0`; `days=3 min=-8.0 max=-1.0 avg=-4.0 above=2` (el máximo funciona con negativos porque empieza en `t[0]`).', 'Linha de uso; `days=1 min=5.0 max=5.0 avg=5.0 above=0`; `days=3 min=-8.0 max=-1.0 avg=-4.0 above=2` (o máximo funciona com negativos porque começa em `t[0]`).') },
      { id: 'p1w4-lab1-s3', title: L('Add a search and a delete', 'Agrega una búsqueda y una eliminación', 'Acrescente uma busca e uma remoção'), commands: ['# 1. print the first day (1-based) above 23, or "none"', '# 2. remove the coldest day by shifting left, then print the rest with Arrays.toString', 'java Temps 18.5 21 19.5 24 17'],
        expected: L('`first day above 23: 4` and `[18.5, 21.0, 19.5, 24.0]`.', '`first day above 23: 4` y `[18.5, 21.0, 19.5, 24.0]`.', '`first day above 23: 4` e `[18.5, 21.0, 19.5, 24.0]`.') },
    ] },
  { id: 'p1w4-lab2-grid', level: 3, minutes: 60, title: L('A grid from text, neighbours, and the debugger', 'Una cuadrícula desde texto, vecinos y el depurador', 'Uma grade a partir de texto, vizinhos e o depurador'),
    goal: L('Build a 2D array from an argument, count neighbours safely, and trace the program by hand and with the debugger.', 'Construir un arreglo 2D desde un argumento, contar vecinos con seguridad y recorrer el programa a mano y con el depurador.', 'Construir um array 2D a partir de um argumento, contar vizinhos com segurança e percorrer o programa à mão e com o depurador.'),
    steps: [
      { id: 'p1w4-lab2-s1', title: L('Seat map from an argument', 'Mapa de asientos desde un argumento', 'Mapa de poltronas a partir de um argumento'), commands: [...heredoc('Cinema.java', CINEMA), 'javac Cinema.java', 'java Cinema', 'java Cinema "01#2##1"'],
        expected: L('Default: `. X X .`, `R . . R`, `. - - .`, `6 free seats`. Second: 4 rows of width 2 (`. X`, `R .`, `. .`, `X .`) and `5 free seats`.', 'Por defecto: `. X X .`, `R . . R`, `. - - .`, `6 free seats`. Segundo: 4 filas de ancho 2 (`. X`, `R .`, `. .`, `X .`) y `5 free seats`.', 'Padrão: `. X X .`, `R . . R`, `. - - .`, `6 free seats`. Segundo: 4 linhas de largura 2 (`. X`, `R .`, `. .`, `X .`) e `5 free seats`.') },
      { id: 'p1w4-lab2-s2', title: L('Count taken neighbours', 'Cuenta vecinos ocupados', 'Conte vizinhos ocupados'), commands: ['# add: for every free seat, print how many of its 8 neighbours are taken (1)', '# use the dr/dc loops with a bounds check from Lesson 5', 'java Cinema'],
        expected: L('For the default map, seat (0,0) has 1 taken neighbour, (1,1) has 2, and (2,0) has 0. No exception at any edge.', 'Con el mapa por defecto, el asiento (0,0) tiene 1 vecino ocupado, el (1,1) tiene 2 y el (2,0) tiene 0. Sin excepciones en ningún borde.', 'Com o mapa padrão, a poltrona (0,0) tem 1 vizinho ocupado, a (1,1) tem 2 e a (2,0) tem 0. Nenhuma exceção em borda alguma.') },
      { id: 'p1w4-lab2-s3', title: L('Desk check', 'Prueba de escritorio', 'Teste de mesa'), commands: [],
        expected: L('On paper, make a table with `r`, `c`, `dr`, `dc`, `nr`, `nc`, `inside`, and the count for seat (1,1). Your final count must be 2.', 'En papel, haz una tabla con `r`, `c`, `dr`, `dc`, `nr`, `nc`, `inside` y el conteo para el asiento (1,1). Tu conteo final debe ser 2.', 'No papel, faça uma tabela com `r`, `c`, `dr`, `dc`, `nr`, `nc`, `inside` e a contagem para a poltrona (1,1). A contagem final deve ser 2.') },
      { id: 'p1w4-lab2-s4', title: L('Same trace in the debugger', 'El mismo recorrido en el depurador', 'O mesmo percurso no depurador'), commands: ['# IntelliJ / VS Code: set Program arguments to 0110#2002#0330', '# click the margin of the line "around++" (or your count line) to add a breakpoint', '# start Debug, then Step Over and watch r, c, nr, nc in the Variables panel'],
        expected: L('Execution pauses at the breakpoint each time a taken neighbour is found. The values match your desk check. Finish with Resume.', 'La ejecución se pausa en el punto de interrupción cada vez que se encuentra un vecino ocupado. Los valores coinciden con tu prueba de escritorio. Termina con Resume.', 'A execução pausa no ponto de parada cada vez que um vizinho ocupado é achado. Os valores batem com o teste de mesa. Termine com Resume.') },
    ] },
];

const resources: ExternalResource[] = [
  { id: 'p1w4-r1', title: 'Oracle Java Tutorials: Arrays', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Declaring, creating, copying, and multidimensional arrays.', 'Declarar, crear y copiar arreglos, y arreglos multidimensionales.', 'Declarar, criar e copiar arrays, e arrays multidimensionais.') },
  { id: 'p1w4-r2', title: 'W3Schools: Java Multi-Dimensional Arrays', url: 'https://www.w3schools.com/java/java_arrays_multi.asp', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short runnable 2D array examples.', 'Ejemplos cortos de arreglos 2D.', 'Exemplos curtos de arrays 2D.') },
  { id: 'p1w4-r3', title: 'IntelliJ IDEA: Debug code', url: 'https://www.jetbrains.com/help/idea/debugging-code.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Breakpoints, stepping, and watches.', 'Puntos de interrupción, pasos y expresiones vigiladas.', 'Pontos de parada, passos e expressões observadas.') },
  { id: 'p1w4-r4', title: 'Wikipedia: Cellular automaton', url: 'https://en.wikipedia.org/wiki/Cellular_automaton', kind: 'article', verifiedOn: '2026-11-04', note: L('Grids that change by neighbour rules, generation after generation.', 'Cuadrículas que cambian por reglas de vecinos, generación tras generación.', 'Grades que mudam por regras de vizinhos, geração após geração.') },
];

/** Programming 1, Week 4: arrays, matrices, and debugging. */
export const prog1Week4: WeekContent = {
  id: 'y1-t1-m1-prog-w4', year: 1, term: 1, module: 1, week: 4, subject: 'programming-1',
  title: L('Arrays, matrices, and debugging', 'Arreglos, matrices y depuración', 'Arrays, matrizes e depuração'),
  intro: L('Real programs handle many values at once. This week you store them in arrays, apply the classic traversal patterns, insert and delete by shifting, build 2D grids from a text argument, update a grid generation by generation using each cell’s neighbours, and find bugs with desk checks and the debugger.',
    'Los programas reales manejan muchos valores a la vez. Esta semana los guardas en arreglos, aplicas los patrones de recorrido clásicos, insertas y eliminas desplazando elementos, construyes cuadrículas 2D desde un argumento de texto, actualizas una cuadrícula generación a generación según los vecinos de cada celda y encuentras errores con pruebas de escritorio y el depurador.',
    'Programas reais lidam com muitos valores ao mesmo tempo. Nesta semana você os guarda em arrays, aplica os padrões de percurso clássicos, insere e remove deslocando elementos, monta grades 2D a partir de um argumento de texto, atualiza uma grade geração a geração conforme os vizinhos de cada célula e acha erros com testes de mesa e o depurador.'),
  objectives: [
    L('Create, index, and traverse one-dimensional arrays, including `args`.', 'Crear, indexar y recorrer arreglos de una dimensión, incluido `args`.', 'Criar, indexar e percorrer arrays de uma dimensão, incluindo `args`.'),
    L('Apply sum, max/min, search, and count patterns.', 'Aplicar los patrones de suma, máximo/mínimo, búsqueda y conteo.', 'Aplicar os padrões de soma, máximo/mínimo, busca e contagem.'),
    L('Insert and delete with shifting and a size counter.', 'Insertar y eliminar con desplazamientos y un contador de tamaño.', 'Inserir e remover com deslocamentos e um contador de tamanho.'),
    L('Build 2D grids from text and compute neighbour-based generations.', 'Construir cuadrículas 2D desde texto y calcular generaciones según vecinos.', 'Montar grades 2D a partir de texto e calcular gerações por vizinhos.'),
    L('Desk-check code and use breakpoints.', 'Hacer pruebas de escritorio y usar puntos de interrupción.', 'Fazer testes de mesa e usar pontos de parada.'),
  ],
  prerequisites: [L('Week 3: loops, nested loops, and validation.', 'Semana 3: ciclos, ciclos anidados y validación.', 'Semana 3: laços, laços aninhados e validação.')],
  keyConcepts: [L('Array and index', 'Arreglo e índice', 'Array e índice'), L('Traversal patterns', 'Patrones de recorrido', 'Padrões de percurso'), L('Capacity and size', 'Capacidad y tamaño', 'Capacidade e tamanho'), L('2D array', 'Arreglo 2D', 'Array 2D'), L('Neighbours and bounds', 'Vecinos y límites', 'Vizinhos e limites'), L('Desk check', 'Prueba de escritorio', 'Teste de mesa'), L('Breakpoint', 'Punto de interrupción', 'Ponto de parada')],
  estimatedMinutes: 360,
  sequence: [L('Lessons 1–3, then Lab 1.', 'Lecciones 1–3 y luego el Laboratorio 1.', 'Lições 1–3 e depois o Laboratório 1.'), L('Lessons 4–5: grids and neighbours.', 'Lecciones 4–5: cuadrículas y vecinos.', 'Lições 4–5: grades e vizinhos.'), L('Lesson 6 and Lab 2, then the quiz.', 'Lección 6 y Laboratorio 2, luego el cuestionario.', 'Lição 6 e Laboratório 2, depois o questionário.')],
  outcomes: [L('You process lists and grids of values with confidence.', 'Procesas listas y cuadrículas de valores con seguridad.', 'Você processa listas e grades de valores com segurança.'), L('You find a bug by tracing instead of guessing.', 'Encuentras un error recorriendo el código en lugar de adivinar.', 'Você acha um erro percorrendo o código em vez de adivinhar.')],
  checklist: [L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'), L('Finish both labs', 'Terminar los dos laboratorios', 'Terminar os dois laboratórios'), L('Use a breakpoint at least once', 'Usar un punto de interrupción al menos una vez', 'Usar um ponto de parada pelo menos uma vez')],
  commonMistakes: [
    { mistake: L('Off-by-one indexes.', 'Índices desfasados por uno.', 'Índices deslocados por um.'), fix: L('Valid indexes are 0 to `length - 1`.', 'Los índices válidos van de 0 a `length - 1`.', 'Os índices válidos vão de 0 a `length - 1`.') },
    { mistake: L('Reading neighbours outside the grid.', 'Leer vecinos fuera de la cuadrícula.', 'Ler vizinhos fora da grade.'), fix: L('Check `0 <= nr < rows` and `0 <= nc < cols` first.', 'Revisa primero `0 <= nr < rows` y `0 <= nc < cols`.', 'Confira primeiro `0 <= nr < rows` e `0 <= nc < cols`.') },
  ],
  lessons,
  flashcards: [
    fc('p1w4-fc-1', 'p1w4-l1-arrays', 'concept', L('Array', 'Arreglo', 'Array'), L('A fixed-size sequence of values of one type, indexed from 0.', 'Una secuencia de tamaño fijo de valores de un tipo, indexada desde 0.', 'Uma sequência de tamanho fixo de valores de um tipo, indexada a partir de 0.')),
    fc('p1w4-fc-2', 'p1w4-l1-arrays', 'command', same('new int[5]'), L('Five `int` cells, all 0.', 'Cinco celdas `int`, todas en 0.', 'Cinco células `int`, todas em 0.')),
    fc('p1w4-fc-3', 'p1w4-l2-traversal', 'concept', L('Linear search', 'Búsqueda lineal', 'Busca linear'), L('Check each element in order; return its index or −1.', 'Revisar cada elemento en orden; devolver su índice o −1.', 'Conferir cada elemento em ordem; devolver o índice ou −1.')),
    fc('p1w4-fc-4', 'p1w4-l2-traversal', 'concept', L('Max pattern', 'Patrón del máximo', 'Padrão do máximo'), L('Start with `a[0]`, keep any larger value.', 'Empezar con `a[0]` y guardar cualquier valor mayor.', 'Começar com `a[0]` e guardar qualquer valor maior.')),
    fc('p1w4-fc-5', 'p1w4-l3-insert-delete', 'distinction', L('Capacity vs size', 'Capacidad vs tamaño', 'Capacidade vs tamanho'), L('Capacity = `a.length`; size = how many cells are in use.', 'Capacidad = `a.length`; tamaño = cuántas celdas están en uso.', 'Capacidade = `a.length`; tamanho = quantas células estão em uso.')),
    fc('p1w4-fc-6', 'p1w4-l3-insert-delete', 'command', same('Arrays.copyOf(a, n)'), L('A new array with the first `n` elements (or padded if bigger).', 'Un arreglo nuevo con los primeros `n` elementos (o rellenado si es mayor).', 'Um array novo com os primeiros `n` elementos (ou completado se for maior).')),
    fc('p1w4-fc-7', 'p1w4-l4-matrices', 'concept', same('grid[r][c]'), L('Row `r`, column `c`; rows = `grid.length`, columns = `grid[r].length`.', 'Fila `r`, columna `c`; filas = `grid.length`, columnas = `grid[r].length`.', 'Linha `r`, coluna `c`; linhas = `grid.length`, colunas = `grid[r].length`.')),
    fc('p1w4-fc-8', 'p1w4-l4-matrices', 'command', same('text.split("#", -1)'), L('Splits at `#`, keeping empty pieces at the end.', 'Divide en `#` conservando los trozos vacíos del final.', 'Divide em `#` mantendo os pedaços vazios do fim.')),
    fc('p1w4-fc-9', 'p1w4-l5-neighbours', 'concept', L('The 8 neighbours', 'Los 8 vecinos', 'Os 8 vizinhos'), L('Offsets `dr`, `dc` from −1 to 1, except (0, 0), inside the bounds.', 'Desplazamientos `dr`, `dc` de −1 a 1, salvo (0, 0), dentro de los límites.', 'Deslocamentos `dr`, `dc` de −1 a 1, menos (0, 0), dentro dos limites.')),
    fc('p1w4-fc-10', 'p1w4-l5-neighbours', 'concept', L('Double buffering', 'Doble cuadrícula', 'Grade dupla'), L('Read the old generation, write the new one into a separate grid.', 'Leer la generación vieja y escribir la nueva en una cuadrícula aparte.', 'Ler a geração velha e escrever a nova numa grade separada.')),
    fc('p1w4-fc-11', 'p1w4-l6-debugging', 'concept', L('Desk check', 'Prueba de escritorio', 'Teste de mesa'), L('Tracing code by hand in a table of variables and steps.', 'Recorrer el código a mano en una tabla de variables y pasos.', 'Percorrer o código à mão numa tabela de variáveis e passos.')),
    fc('p1w4-fc-12', 'p1w4-l6-debugging', 'concept', L('Breakpoint', 'Punto de interrupción', 'Ponto de parada'), L('A line where the debugger pauses so you can inspect variables.', 'Una línea donde el depurador se pausa para inspeccionar variables.', 'Uma linha onde o depurador pausa para inspecionar variáveis.')),
  ],
  questions, activities, labs,
  plan: [
    day(1, 40, 'read', L('Lessons 1–2: arrays and traversal.', 'Lecciones 1–2: arreglos y recorridos.', 'Lições 1–2: arrays e percursos.')),
    day(2, 45, 'practice', L('Lesson 3 and Lab 1.', 'Lección 3 y Laboratorio 1.', 'Lição 3 e Laboratório 1.')),
    day(3, 50, 'read', L('Lessons 4–5: grids and generations.', 'Lecciones 4–5: cuadrículas y generaciones.', 'Lições 4–5: grades e gerações.')),
    day(4, 60, 'practice', L('Lesson 6 and Lab 2 with the debugger.', 'Lección 6 y Laboratorio 2 con el depurador.', 'Lição 6 e Laboratório 2 com o depurador.')),
    day(5, 25, 'review', L('Activities and flashcards.', 'Actividades y tarjetas.', 'Atividades e cartões.')),
    day(6, 30, 'quiz', L('Quiz; desk-check every code question you missed.', 'Cuestionario; haz la prueba de escritorio de cada pregunta de código fallada.', 'Questionário; faça teste de mesa de cada questão de código errada.')),
  ],
  resources, stories: [], tools: [], videos: [], documents: [],
};
