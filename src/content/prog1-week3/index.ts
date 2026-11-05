import type { Activity, ExternalResource, Lab, Lesson, Question } from '../types';
import type { WeekContent } from '../weekContent';
import { L, chk, day, ex, fc, fill, heredoc, java, lesson, match, mc, pf, same, tf } from '../prog1-week1/h';

const TICKET = `public class Ticket {
    public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Usage: java Ticket <age> <day 1-7>");
            System.exit(1);
        }
        int age;
        int day;
        try {
            age = Integer.parseInt(args[0]);
            day = Integer.parseInt(args[1]);
        } catch (NumberFormatException e) {
            System.out.println("Age and day must be whole numbers.");
            return;
        }
        if (age < 0 || day < 1 || day > 7) {
            System.out.println("Out of range: age >= 0, day 1-7.");
            return;
        }
        double price;
        if (age < 3) {
            price = 0;
        } else if (age < 12 || age >= 65) {
            price = 5.0;
        } else {
            price = 8.0;
        }
        String kind = switch (day) {
            case 2 -> "half-price Tuesday";
            case 6, 7 -> "weekend";
            default -> "regular day";
        };
        if (day == 2) {
            price = price / 2;
        } else if (day >= 6 && price > 0) {
            price = price + 1.5;
        }
        System.out.printf("Age %d, %s: %.2f%n", age, kind, price);
    }
}`;

const PYRAMID = `public class Pyramid {
    public static void main(String[] args) {
        int height = args.length > 0 ? Integer.parseInt(args[0]) : 4;
        for (int row = 1; row <= height; row++) {
            for (int s = 0; s < height - row; s++) {
                System.out.print(" ");
            }
            for (int k = 0; k < 2 * row - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`;

const lessons: Lesson[] = [
  lesson('p1w3-l1-validate', L('Robust input: validating arguments', 'Entrada robusta: validar argumentos', 'Entrada robusta: validar argumentos'), 20,
    java(L('Check the count, then the format, then the range. Run: `java Receipt 4.50 3`.', 'Revisa la cantidad, luego el formato y luego el rango. Ejecuta: `java Receipt 4.50 3`.', 'Confira a quantidade, depois o formato e depois a faixa. Rode: `java Receipt 4.50 3`.'),
      `public class Receipt {
    public static void main(String[] args) {
        if (args.length != 2) {                         // 1. count
            System.out.println("Usage: java Receipt <unit price> <quantity>");
            System.exit(1);                             // non-zero = error
        }
        double price;
        int quantity;
        try {                                           // 2. format
            price = Double.parseDouble(args[0]);
            quantity = Integer.parseInt(args[1]);
        } catch (NumberFormatException e) {
            System.out.println("Not a valid number: " + e.getMessage());
            return;
        }
        if (price < 0 || quantity <= 0) {               // 3. range
            System.out.println("Price must be >= 0 and quantity > 0.");
            return;
        }
        double total = price * quantity;
        System.out.printf("Total: %.2f%n", total);
    }
}`),
    [
      L('Users mistype. A robust command-line program checks three things, in order: the **count** (`args.length`), the **format** (can each argument be parsed?), and the **range** (does the value make sense?). Each failed check prints a clear message and stops.',
        'Los usuarios se equivocan al escribir. Un programa de línea de comandos robusto revisa tres cosas, en orden: la **cantidad** (`args.length`), el **formato** (¿se puede convertir cada argumento?) y el **rango** (¿el valor tiene sentido?). Cada revisión fallida imprime un mensaje claro y se detiene.',
        'Usuários digitam errado. Um programa de linha de comando robusto confere três coisas, em ordem: a **quantidade** (`args.length`), o **formato** (dá para converter cada argumento?) e a **faixa** (o valor faz sentido?). Cada checagem que falha imprime uma mensagem clara e para.'),
      L('`Integer.parseInt("two")` throws `NumberFormatException`. Wrap the parsing in `try { … } catch (NumberFormatException e) { … }`: if any line in `try` fails, Java jumps to `catch` instead of crashing. `e.getMessage()` says which text failed.',
        '`Integer.parseInt("two")` lanza `NumberFormatException`. Envuelve la conversión en `try { … } catch (NumberFormatException e) { … }`: si una línea del `try` falla, Java salta al `catch` en lugar de terminar con error. `e.getMessage()` indica qué texto falló.',
        '`Integer.parseInt("two")` lança `NumberFormatException`. Envolva a conversão em `try { … } catch (NumberFormatException e) { … }`: se alguma linha do `try` falhar, Java pula para o `catch` em vez de quebrar. `e.getMessage()` diz qual texto falhou.'),
      L('`return` inside `main` ends the program; `System.exit(1)` ends it at once with an error code that scripts can detect. Many tools take **named options** such as `width=8`: split each one with `arg.split("=")` and compare the key with `equals`. You will build a full option parser in week 5.',
        '`return` dentro de `main` termina el programa; `System.exit(1)` lo termina de inmediato con un código de error que los scripts pueden detectar. Muchas herramientas usan **opciones con nombre** como `width=8`: divide cada una con `arg.split("=")` y compara la clave con `equals`. En la semana 5 construirás un analizador de opciones completo.',
        '`return` dentro do `main` encerra o programa; `System.exit(1)` encerra na hora com um código de erro que scripts conseguem detectar. Muitas ferramentas usam **opções nomeadas** como `width=8`: divida cada uma com `arg.split("=")` e compare a chave com `equals`. Na semana 5 você vai construir um analisador de opções completo.'),
    ],
    L('Validating is the airport check-in: right number of bags, a valid passport, the bag under the weight limit. Only then are you allowed onto the plane, which here is your calculation.',
      'Validar es como el control del aeropuerto: el número correcto de maletas, un pasaporte válido y la maleta bajo el peso límite. Solo entonces subes al avión, que aquí es tu cálculo.',
      'Validar é como o check-in do aeroporto: o número certo de malas, um passaporte válido e a mala abaixo do limite de peso. Só então você embarca, que aqui é o seu cálculo.'),
    [L('Count, then format (`try/catch`), then range.', 'Cantidad, luego formato (`try/catch`), luego rango.', 'Quantidade, depois formato (`try/catch`), depois faixa.'),
      L('Fail with a clear message, not a stack trace.', 'Falla con un mensaje claro, no con una traza de error.', 'Falhe com uma mensagem clara, não com um rastro de erro.')],
    chk(L('What happens with `java Receipt 4.50 two`?', '¿Qué pasa con `java Receipt 4.50 two`?', 'O que acontece com `java Receipt 4.50 two`?'),
      [L('It crashes', 'Termina con error', 'Quebra'), same('`Not a valid number: For input string: "two"`'), L('It prints the usage line', 'Imprime la línea de uso', 'Imprime a linha de uso')], 1,
      L('The count is right; `parseInt("two")` throws and `catch` prints the message.', 'La cantidad es correcta; `parseInt("two")` lanza la excepción y `catch` imprime el mensaje.', 'A quantidade está certa; `parseInt("two")` lança a exceção e o `catch` imprime a mensagem.')),
    [pf(L('Parsing before checking `args.length`.', 'Convertir antes de revisar `args.length`.', 'Converter antes de conferir `args.length`.'),
      L('Check the count first, or a missing argument crashes the program.', 'Revisa primero la cantidad o un argumento faltante hará fallar el programa.', 'Confira primeiro a quantidade, senão um argumento faltando quebra o programa.')),
      pf(L('Comparing keys with `==`.', 'Comparar claves con `==`.', 'Comparar chaves com `==`.'),
        L('Use `key.equals("width")`; `==` compares references, not text.', 'Usa `key.equals("width")`; `==` compara referencias, no texto.', 'Use `key.equals("width")`; `==` compara referências, não texto.'))],
    [ex('p1w3-ex-1-1', 1, L('Which check fails?', '¿Qué revisión falla?', 'Que checagem falha?'),
      L('For `Receipt`, which check stops each run: `java Receipt 3`, `java Receipt 3 -1`, `java Receipt 3,5 2`?', 'En `Receipt`, ¿qué revisión detiene cada ejecución: `java Receipt 3`, `java Receipt 3 -1`, `java Receipt 3,5 2`?', 'Em `Receipt`, que checagem para cada execução: `java Receipt 3`, `java Receipt 3 -1`, `java Receipt 3,5 2`?'),
      L('Java numbers use a point, not a comma.', 'Los números de Java usan punto, no coma.', 'Os números do Java usam ponto, não vírgula.'),
      L('Count (only 1 argument); range (quantity −1); format (`"3,5"` is not a valid `double`).', 'Cantidad (solo 1 argumento); rango (cantidad −1); formato (`"3,5"` no es un `double` válido).', 'Quantidade (só 1 argumento); faixa (quantidade −1); formato (`"3,5"` não é um `double` válido).')),
    ex('p1w3-ex-1-2', 2, L('Named options', 'Opciones con nombre', 'Opções nomeadas'),
      L('`java Box w=3 h=4`, in any order. Write the loop that sets `w` and `h` and reports unknown keys.', '`java Box w=3 h=4`, en cualquier orden. Escribe el ciclo que asigna `w` y `h` y avisa de claves desconocidas.', '`java Box w=3 h=4`, em qualquer ordem. Escreva o laço que define `w` e `h` e avisa sobre chaves desconhecidas.'),
      same('`for (String arg : args) { String[] p = arg.split("="); … }`'),
      same('`int w = 0, h = 0; for (String arg : args) { String[] p = arg.split("="); if (p.length != 2) { System.out.println("bad option: " + arg); } else if (p[0].equals("w")) { w = Integer.parseInt(p[1]); } else if (p[0].equals("h")) { h = Integer.parseInt(p[1]); } else { System.out.println("unknown option: " + p[0]); } }`'))]),

  lesson('p1w3-l2-output', L('Formatted output, and Scanner as an alternative', 'Salida con formato y Scanner como alternativa', 'Saída formatada e Scanner como alternativa'), 15,
    java(L('A small aligned table, and the same input read with `Scanner`.', 'Una tabla alineada y la misma entrada leída con `Scanner`.', 'Uma tabela alinhada e a mesma entrada lida com `Scanner`.'),
      `import java.util.Scanner;

public class Workout {
    public static void main(String[] args) {
        System.out.printf("%-10s %6s%n", "Exercise", "Reps");
        System.out.printf("%-10s %6d%n", "Squats", 20);
        System.out.printf("%-10s %6d%n", "Push-ups", 12);
        System.out.printf("Calories: %.1f%n", 143.75);   // 143.8

        Scanner in = new Scanner(System.in);              // alternative input
        System.out.print("Minutes of cardio: ");
        int minutes = in.nextInt();
        System.out.println("Total minutes: " + (minutes + 15));
    }
}`),
    [
      L('`println` prints and ends the line; `print` does not. `printf` formats with placeholders: `%d` integer, `%.2f` decimal with 2 places, `%s` text, `%n` new line. A width aligns columns: `%6d` uses 6 characters, `%-10s` left-aligns in 10.',
        '`println` imprime y termina la línea; `print` no. `printf` da formato con marcadores: `%d` entero, `%.2f` decimal con 2 cifras, `%s` texto, `%n` salto de línea. Un ancho alinea columnas: `%6d` usa 6 caracteres, `%-10s` alinea a la izquierda en 10.',
        '`println` imprime e termina a linha; `print` não. `printf` formata com marcadores: `%d` inteiro, `%.2f` decimal com 2 casas, `%s` texto, `%n` quebra de linha. Uma largura alinha colunas: `%6d` usa 6 caracteres, `%-10s` alinha à esquerda em 10.'),
      L('`printf` follows the system locale, so on a Spanish or Portuguese system `%.2f` may print `8,00`. `String.format(…)` builds the same text without printing it, which is handy for returning a line from a method.',
        '`printf` sigue la configuración regional del sistema, así que en un sistema en español `%.2f` puede imprimir `8,00`. `String.format(…)` arma el mismo texto sin imprimirlo, algo útil para devolver una línea desde un método.',
        '`printf` segue a localidade do sistema, então num sistema em português `%.2f` pode imprimir `8,00`. `String.format(…)` monta o mesmo texto sem imprimir, algo útil para devolver uma linha de um método.'),
      L('`Scanner` asks for input while the program runs: `new Scanner(System.in)`, then `nextInt()`, `nextDouble()`, or `nextLine()`. It suits menus, but `args` programs are easier to test and repeat, so this course uses `args` first. Trap: after `nextInt()`, call `nextLine()` once before reading text.',
        '`Scanner` pide datos mientras el programa corre: `new Scanner(System.in)` y luego `nextInt()`, `nextDouble()` o `nextLine()`. Sirve para menús, pero los programas con `args` se prueban y repiten más fácil, por eso el curso usa `args` primero. Trampa: después de `nextInt()`, llama una vez a `nextLine()` antes de leer texto.',
        '`Scanner` pede dados enquanto o programa roda: `new Scanner(System.in)` e depois `nextInt()`, `nextDouble()` ou `nextLine()`. Serve para menus, mas programas com `args` são mais fáceis de testar e repetir, por isso o curso usa `args` primeiro. Armadilha: depois de `nextInt()`, chame `nextLine()` uma vez antes de ler texto.'),
    ],
    L('`printf` is a form with blanks: the text is fixed and each `%` is a box to fill with a value of the right kind.',
      '`printf` es un formulario con espacios en blanco: el texto es fijo y cada `%` es una casilla para un valor del tipo correcto.',
      '`printf` é um formulário com lacunas: o texto é fixo e cada `%` é uma caixa para um valor do tipo certo.'),
    [L('`%d`, `%.2f`, `%s`, `%n`; widths align columns.', '`%d`, `%.2f`, `%s`, `%n`; los anchos alinean columnas.', '`%d`, `%.2f`, `%s`, `%n`; larguras alinham colunas.'),
      L('`Scanner` reads during the run; `args` is the default here.', '`Scanner` lee durante la ejecución; aquí `args` es lo predeterminado.', '`Scanner` lê durante a execução; aqui `args` é o padrão.')],
    chk(L('What does `System.out.printf("%5.1f|", 3.14159)` print?', '¿Qué imprime `System.out.printf("%5.1f|", 3.14159)`?', 'O que `System.out.printf("%5.1f|", 3.14159)` imprime?'),
      [same('`3.1|`'), same('`  3.1|`'), same('`3.14159|`')], 1,
      L('One decimal gives `3.1`, padded to 5 characters with two spaces.', 'Un decimal da `3.1`, completado a 5 caracteres con dos espacios.', 'Uma casa dá `3.1`, completado até 5 caracteres com dois espaços.')),
    [pf(L('An empty line from `nextLine()` right after `nextInt()`.', 'Una línea vacía con `nextLine()` justo después de `nextInt()`.', 'Uma linha vazia com `nextLine()` logo depois de `nextInt()`.'),
      L('Consume the leftover Enter with one extra `nextLine()`.', 'Consume el Enter sobrante con un `nextLine()` extra.', 'Consuma o Enter que sobrou com um `nextLine()` extra.'))],
    [ex('p1w3-ex-2-1', 1, L('Format a line', 'Da formato a una línea', 'Formate uma linha'),
      L('Print a product name left-aligned in 12 characters and its price with 2 decimals in 7.', 'Imprime el nombre de un producto alineado a la izquierda en 12 caracteres y su precio con 2 decimales en 7.', 'Imprima o nome de um produto alinhado à esquerda em 12 caracteres e o preço com 2 casas em 7.'),
      same('`%-12s` `%7.2f` `%n`'), same('`System.out.printf("%-12s%7.2f%n", name, price);`')),
    ex('p1w3-ex-2-2', 2, L('Scanner version', 'Versión con Scanner', 'Versão com Scanner'),
      L('Rewrite the start of `Receipt` so it asks for price and quantity with `Scanner`.', 'Reescribe el inicio de `Receipt` para pedir precio y cantidad con `Scanner`.', 'Reescreva o início de `Receipt` para pedir preço e quantidade com `Scanner`.'),
      L('`nextDouble()` then `nextInt()`.', '`nextDouble()` y luego `nextInt()`.', '`nextDouble()` e depois `nextInt()`.'),
      L('`Scanner in = new Scanner(System.in); double price = in.nextDouble(); int quantity = in.nextInt();` A wrong value now throws `InputMismatchException`.', '`Scanner in = new Scanner(System.in); double price = in.nextDouble(); int quantity = in.nextInt();` Un valor incorrecto ahora lanza `InputMismatchException`.', '`Scanner in = new Scanner(System.in); double price = in.nextDouble(); int quantity = in.nextInt();` Um valor errado agora lança `InputMismatchException`.'))]),

  lesson('p1w3-l3-if', L('Selection: if, else if, else', 'Selección: if, else if, else', 'Seleção: if, else if, else'), 20,
    java(L('Classify the air quality index from `args`. Run: `java AirQuality 120`.', 'Clasifica el índice de calidad del aire desde `args`. Ejecuta: `java AirQuality 120`.', 'Classifique o índice de qualidade do ar a partir de `args`. Rode: `java AirQuality 120`.'),
      `public class AirQuality {
    public static void main(String[] args) {
        int index = Integer.parseInt(args[0]);
        String level;
        if (index < 0 || index > 500) {       // guard: invalid first
            level = "invalid reading";
        } else if (index <= 50) {
            level = "good";
        } else if (index <= 100) {
            level = "moderate";
        } else if (index <= 200) {
            level = "unhealthy";
        } else {
            level = "hazardous";
        }
        System.out.println(index + ": " + level);
        String advice = index > 100 ? "wear a mask" : "enjoy the walk";  // ternary
        System.out.println(advice);
    }
}`),
    [
      L('`if (condition) { … }` runs a block only when the condition is `true`; `else` covers the other case. With several exclusive cases, chain `else if`: Java tests top to bottom and runs only the **first** true branch.',
        '`if (condición) { … }` ejecuta un bloque solo cuando la condición es `true`; `else` cubre el otro caso. Con varios casos excluyentes, encadena `else if`: Java prueba de arriba abajo y ejecuta solo la **primera** rama verdadera.',
        '`if (condição) { … }` executa um bloco só quando a condição é `true`; `else` cobre o outro caso. Com vários casos excludentes, encadeie `else if`: Java testa de cima para baixo e executa só o **primeiro** ramo verdadeiro.'),
      L('So order matters. Put invalid input first (a **guard**), then the ranges in order. Write ranges the Java way: `x > 0 && x < 10`, never `0 < x < 10`. Always use braces, even for one line.',
        'Por eso el orden importa. Pon primero la entrada inválida (una **guarda**) y luego los rangos en orden. Escribe los rangos a la manera de Java: `x > 0 && x < 10`, nunca `0 < x < 10`. Usa siempre llaves, aunque sea una línea.',
        'Por isso a ordem importa. Ponha a entrada inválida primeiro (uma **guarda**) e depois as faixas em ordem. Escreva faixas do jeito Java: `x > 0 && x < 10`, nunca `0 < x < 10`. Use sempre chaves, mesmo numa linha.'),
      L('The **ternary** operator chooses between two values: `condition ? a : b`. It is perfect for labels and plurals (`n == 1 ? "item" : "items"`), but switch to `if` when logic grows. Compare text with `equals`, as in `"yes".equals(answer)`.',
        'El operador **ternario** elige entre dos valores: `condición ? a : b`. Es ideal para etiquetas y plurales (`n == 1 ? "item" : "items"`), pero pasa a `if` cuando la lógica crece. Compara textos con `equals`, como en `"yes".equals(answer)`.',
        'O operador **ternário** escolhe entre dois valores: `condição ? a : b`. É ideal para rótulos e plurais (`n == 1 ? "item" : "items"`), mas passe para `if` quando a lógica crescer. Compare textos com `equals`, como em `"yes".equals(answer)`.'),
    ],
    L('An else-if chain is a coin sorter with holes of growing size: each coin drops through the first hole it fits, so the order of the holes decides where it lands.',
      'Una cadena else-if es un clasificador de monedas con agujeros cada vez más grandes: cada moneda cae por el primero en que cabe, así que el orden de los agujeros decide dónde termina.',
      'Uma cadeia else-if é um separador de moedas com furos cada vez maiores: cada moeda cai no primeiro furo em que cabe, então a ordem dos furos decide onde ela para.'),
    [L('Only the first true branch runs.', 'Solo se ejecuta la primera rama verdadera.', 'Só o primeiro ramo verdadeiro roda.'),
      L('Guard invalid input first; always use braces.', 'Protege primero contra la entrada inválida; usa siempre llaves.', 'Proteja primeiro contra entrada inválida; use sempre chaves.')],
    chk(L('What does `java AirQuality 100` print first?', '¿Qué imprime primero `java AirQuality 100`?', 'O que `java AirQuality 100` imprime primeiro?'),
      [same('`100: good`'), same('`100: moderate`'), same('`100: unhealthy`')], 1,
      L('100 is not ≤ 50 but is ≤ 100, so the chain stops at `moderate`.', '100 no es ≤ 50 pero sí ≤ 100, así que la cadena se detiene en `moderate`.', '100 não é ≤ 50 mas é ≤ 100, então a cadeia para em `moderate`.')),
    [pf(L('A semicolon after the condition: `if (x > 5); { … }`.', 'Un punto y coma tras la condición: `if (x > 5); { … }`.', 'Um ponto e vírgula depois da condição: `if (x > 5); { … }`.'),
      L('The `;` ends the `if`, so the block always runs. Remove it.', 'El `;` termina el `if` y el bloque se ejecuta siempre. Quítalo.', 'O `;` encerra o `if` e o bloco sempre roda. Tire-o.'))],
    [ex('p1w3-ex-3-1', 1, L('Thermostat', 'Termostato', 'Termostato'),
      L('`java Thermo 17` prints `heat on` below 18, `cool on` above 25, and `ok` otherwise.', '`java Thermo 17` imprime `heat on` por debajo de 18, `cool on` por encima de 25 y `ok` en otro caso.', '`java Thermo 17` imprime `heat on` abaixo de 18, `cool on` acima de 25 e `ok` caso contrário.'),
      L('Two conditions and an `else`.', 'Dos condiciones y un `else`.', 'Duas condições e um `else`.'),
      same('`int t = Integer.parseInt(args[0]); if (t < 18) { System.out.println("heat on"); } else if (t > 25) { System.out.println("cool on"); } else { System.out.println("ok"); }`')),
    ex('p1w3-ex-3-2', 2, L('Leap year in Java', 'Año bisiesto en Java', 'Ano bissexto em Java'),
      L('Write the week 1 leap-year rule as one `boolean` expression.', 'Escribe la regla del año bisiesto de la semana 1 como una sola expresión `boolean`.', 'Escreva a regra do ano bissexto da semana 1 como uma única expressão `boolean`.'),
      L('Divisible by 4 and not by 100, or divisible by 400.', 'Divisible entre 4 y no entre 100, o divisible entre 400.', 'Divisível por 4 e não por 100, ou divisível por 400.'),
      same('`boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;`')),
    ex('p1w3-ex-3-3', 2, L('Plural', 'Plural', 'Plural'),
      L('Print `1 seat left` or `N seats left` with a ternary.', 'Imprime `1 seat left` o `N seats left` con un ternario.', 'Imprima `1 seat left` ou `N seats left` com um ternário.'),
      L('Only the word changes.', 'Solo cambia la palabra.', 'Só a palavra muda.'),
      same('`System.out.println(seats + (seats == 1 ? " seat" : " seats") + " left");`'))]),

  lesson('p1w3-l4-switch', L('Choosing among many values: switch', 'Elegir entre muchos valores: switch', 'Escolher entre muitos valores: switch'), 15,
    java(L('Classic `switch` with `break`, and a switch expression with arrows (Java 14+).', '`switch` clásico con `break` y una expresión switch con flechas (Java 14+).', '`switch` clássico com `break` e uma expressão switch com setas (Java 14+).'),
      `public class Weekday {
    public static void main(String[] args) {
        int day = Integer.parseInt(args[0]);   // 1 = Monday ... 7 = Sunday
        switch (day) {                         // classic: needs break
            case 6:
            case 7:
                System.out.println("Weekend");
                break;
            case 1: case 2: case 3: case 4: case 5:
                System.out.println("Working day");
                break;
            default:
                System.out.println("No such day: " + day);
        }
        String gym = switch (day) {            // expression: gives a value
            case 1, 3, 5 -> "legs";
            case 2, 4 -> "arms";
            case 6 -> "swimming";
            default -> "rest";
        };
        System.out.println("Training: " + gym);
    }
}`),
    [
      L('When one variable is compared with many fixed values, `switch` is cleaner than a long else-if chain. It works with `int`, `char`, `String`, and enums, but not with `double` or ranges.',
        'Cuando una variable se compara con muchos valores fijos, `switch` es más limpio que una larga cadena else-if. Funciona con `int`, `char`, `String` y enums, pero no con `double` ni con rangos.',
        'Quando uma variável é comparada com muitos valores fixos, `switch` é mais limpo que uma longa cadeia else-if. Funciona com `int`, `char`, `String` e enums, mas não com `double` nem com faixas.'),
      L('In the classic form, Java jumps to the matching `case` and keeps running until a `break`. Without `break` it **falls through** into the next case. That lets labels share code, but a forgotten `break` is a common bug. `default` catches everything else.',
        'En la forma clásica, Java salta al `case` que coincide y sigue hasta un `break`. Sin `break` **cae** al siguiente caso. Eso permite que varias etiquetas compartan código, pero un `break` olvidado es un error común. `default` atrapa todo lo demás.',
        'Na forma clássica, Java pula para o `case` correspondente e continua até um `break`. Sem `break` ele **cai** no caso seguinte. Isso deixa rótulos compartilharem código, mas um `break` esquecido é um erro comum. `default` pega todo o resto.'),
      L('The arrow form (`case 2, 4 -> …`) never falls through. As an **expression** it returns a value and must cover every case, usually with `default`. A `switch` on `args[0]` is ideal for commands such as `add` or `list`.',
        'La forma con flecha (`case 2, 4 -> …`) nunca cae al siguiente caso. Como **expresión** devuelve un valor y debe cubrir todos los casos, normalmente con `default`. Un `switch` sobre `args[0]` es ideal para comandos como `add` o `list`.',
        'A forma com seta (`case 2, 4 -> …`) nunca cai no caso seguinte. Como **expressão** ela devolve um valor e precisa cobrir todos os casos, normalmente com `default`. Um `switch` sobre `args[0]` é ideal para comandos como `add` ou `list`.'),
    ],
    L('A `switch` is a lift panel: press a floor and you go straight there. The classic one is an old lift that keeps going down unless someone tells it to stop.',
      'Un `switch` es el panel de un ascensor: pulsas un piso y vas directo. El clásico es un ascensor viejo que sigue bajando si nadie le dice que pare.',
      'Um `switch` é o painel de um elevador: aperte um andar e vá direto. O clássico é um elevador velho que continua descendo se ninguém mandar parar.'),
    [L('Classic: `break` or fall through. Arrow: no fall-through.', 'Clásico: `break` o caída. Flecha: sin caída.', 'Clássico: `break` ou queda. Seta: sem queda.'),
      L('A switch expression returns a value and covers all cases.', 'Una expresión switch devuelve un valor y cubre todos los casos.', 'Uma expressão switch devolve um valor e cobre todos os casos.')],
    chk(L('In the classic switch, what prints for day 6 if the first `break` is deleted?', 'En el switch clásico, ¿qué se imprime para el día 6 si se borra el primer `break`?', 'No switch clássico, o que é impresso para o dia 6 se o primeiro `break` for apagado?'),
      [same('`Weekend`'), same('`Weekend` + `Working day`'), L('Nothing', 'Nada', 'Nada')], 1,
      L('Without `break`, execution falls into the next case until the next `break`.', 'Sin `break`, la ejecución cae al siguiente caso hasta el próximo `break`.', 'Sem `break`, a execução cai no caso seguinte até o próximo `break`.')),
    [pf(L('`switch` on a `double` price.', '`switch` sobre un precio `double`.', '`switch` sobre um preço `double`.'),
      L('Not allowed; use `if` for decimals and ranges.', 'No se permite; usa `if` para decimales y rangos.', 'Não é permitido; use `if` para decimais e faixas.'))],
    [ex('p1w3-ex-4-1', 2, L('Calculator', 'Calculadora', 'Calculadora'),
      L('`java Calc 6 x 7` prints 42.0. Support `+ - x /` with a switch on `args[1]` (use `x` because the shell expands `*`).', '`java Calc 6 x 7` imprime 42.0. Soporta `+ - x /` con un switch sobre `args[1]` (usa `x` porque la terminal expande `*`).', '`java Calc 6 x 7` imprime 42.0. Suporte `+ - x /` com um switch sobre `args[1]` (use `x` porque o terminal expande `*`).'),
      same('`double r = switch (args[1]) { case "+" -> a + b; … };`'),
      same('`double r = switch (args[1]) { case "+" -> a + b; case "-" -> a - b; case "x" -> a * b; case "/" -> a / b; default -> Double.NaN; };`')),
    ex('p1w3-ex-4-2', 2, L('Days in a month', 'Días de un mes', 'Dias de um mês'),
      L('Give the days of `month` (1–12) with a switch expression, ignoring leap years.', 'Da los días de `month` (1–12) con una expresión switch, sin contar bisiestos.', 'Dê os dias de `month` (1–12) com uma expressão switch, ignorando bissextos.'),
      L('Group the 30-day months.', 'Agrupa los meses de 30 días.', 'Agrupe os meses de 30 dias.'),
      same('`int days = switch (month) { case 2 -> 28; case 4, 6, 9, 11 -> 30; default -> 31; };`'))]),

  lesson('p1w3-l5-loops', L('Repetition: while, do-while, for, for-each', 'Repetición: while, do-while, for, for-each', 'Repetição: while, do-while, for, for-each'), 20,
    java(L('The four loops. Run: `java Loops red green`.', 'Los cuatro ciclos. Ejecuta: `java Loops red green`.', 'Os quatro laços. Rode: `java Loops red green`.'),
      `public class Loops {
    public static void main(String[] args) {
        for (int lap = 1; lap <= 3; lap++) {        // known count
            System.out.println("Lap " + lap);
        }
        int savings = 0, week = 0;
        while (savings < 50) {                      // unknown count
            savings += 15;
            week++;
        }
        System.out.println("Goal in week " + week + ": " + savings);
        int n = 4096, digits = 0;
        do {                                        // at least once
            digits++;
            n /= 10;
        } while (n > 0);
        System.out.println(digits + " digits");
        for (String arg : args) {                   // every element
            System.out.println("arg: " + arg);
        }
    }
}`),
    [
      L('`while (condition) { … }` checks before each pass, so it may run zero times. Something inside must eventually make the condition false, or the loop never ends (stop it with Ctrl+C). Use it when you do not know how many passes you need.',
        '`while (condición) { … }` revisa antes de cada vuelta, así que puede ejecutarse cero veces. Algo dentro debe volver falsa la condición o el ciclo nunca termina (detenlo con Ctrl+C). Úsalo cuando no sabes cuántas vueltas necesitas.',
        '`while (condição) { … }` confere antes de cada volta, então pode rodar zero vezes. Algo dentro precisa tornar a condição falsa, senão o laço nunca termina (pare com Ctrl+C). Use quando não sabe quantas voltas precisa.'),
      L('`do { … } while (condition);` checks after each pass, so it runs at least once. Counting digits fits it: even 0 has one digit. `for (start; condition; update)` packs a counting loop in one line; its variable exists only inside the loop.',
        '`do { … } while (condición);` revisa después de cada vuelta, así que se ejecuta al menos una vez. Contar dígitos le queda bien: incluso 0 tiene un dígito. `for (inicio; condición; actualización)` reúne un ciclo contador en una línea; su variable solo existe dentro del ciclo.',
        '`do { … } while (condição);` confere depois de cada volta, então roda pelo menos uma vez. Contar dígitos combina com ele: até 0 tem um dígito. `for (início; condição; atualização)` junta um laço contador numa linha; a variável só existe dentro do laço.'),
      L('`for (String arg : args)` (for-each) visits every element in order without an index. Choose: known count → `for`; unknown → `while`; at least once → `do-while`; every element → for-each.',
        '`for (String arg : args)` (for-each) recorre cada elemento en orden sin índice. Para elegir: cantidad conocida → `for`; desconocida → `while`; al menos una vez → `do-while`; cada elemento → for-each.',
        '`for (String arg : args)` (for-each) percorre cada elemento em ordem sem índice. Para escolher: quantidade conhecida → `for`; desconhecida → `while`; pelo menos uma vez → `do-while`; cada elemento → for-each.'),
    ],
    L('`while` is checking the fridge before cooking; `do-while` is tasting the soup and then deciding whether to add salt again; `for` is 20 push-ups; for-each is greeting every guest on the list.',
      '`while` es mirar la nevera antes de cocinar; `do-while` es probar la sopa y luego decidir si echar más sal; `for` son 20 flexiones; for-each es saludar a cada invitado de la lista.',
      '`while` é olhar a geladeira antes de cozinhar; `do-while` é provar a sopa e depois decidir se põe mais sal; `for` são 20 flexões; for-each é cumprimentar cada convidado da lista.'),
    [L('`while`: 0+ passes; `do-while`: 1+.', '`while`: 0 o más vueltas; `do-while`: 1 o más.', '`while`: 0 ou mais voltas; `do-while`: 1 ou mais.'),
      L('Make sure every loop can end.', 'Asegúrate de que todo ciclo pueda terminar.', 'Garanta que todo laço possa terminar.')],
    chk(L('How many times does the body run? `int k = 10; while (k < 10) { k++; }`', '¿Cuántas veces se ejecuta el cuerpo? `int k = 10; while (k < 10) { k++; }`', 'Quantas vezes o corpo roda? `int k = 10; while (k < 10) { k++; }`'),
      [same('0'), same('1'), same('10')], 0,
      L('`10 < 10` is false at the start; a `do-while` would run once.', '`10 < 10` es falso desde el inicio; un `do-while` se ejecutaría una vez.', '`10 < 10` é falso desde o início; um `do-while` rodaria uma vez.')),
    [pf(L('Off by one: `for (int i = 0; i <= 5; i++)` runs 6 times.', 'Error por uno: `for (int i = 0; i <= 5; i++)` se ejecuta 6 veces.', 'Erro por um: `for (int i = 0; i <= 5; i++)` roda 6 vezes.'),
      L('Start at 0 with `<`, or at 1 with `<=`; trace the first and last pass.', 'Empieza en 0 con `<` o en 1 con `<=`; recorre la primera y la última vuelta.', 'Comece em 0 com `<` ou em 1 com `<=`; percorra a primeira e a última volta.'))],
    [ex('p1w3-ex-5-1', 1, L('Countdown', 'Cuenta regresiva', 'Contagem regressiva'),
      L('`java Countdown 5` prints `5 4 3 2 1 Go!` on one line.', '`java Countdown 5` imprime `5 4 3 2 1 Go!` en una línea.', '`java Countdown 5` imprime `5 4 3 2 1 Go!` numa linha.'),
      L('Count down with `i--` and use `print`.', 'Cuenta hacia atrás con `i--` y usa `print`.', 'Conte para trás com `i--` e use `print`.'),
      same('`int n = Integer.parseInt(args[0]); for (int i = n; i >= 1; i--) { System.out.print(i + " "); } System.out.println("Go!");`')),
    ex('p1w3-ex-5-2', 2, L('A viral video', 'Un video viral', 'Um vídeo viral'),
      L('A video has 1 view on day 1 and its views double every day. With `while`, find the first day with at least 1000 views.', 'Un video tiene 1 vista el día 1 y sus vistas se duplican cada día. Con `while`, encuentra el primer día con al menos 1000 vistas.', 'Um vídeo tem 1 visualização no dia 1 e as visualizações dobram a cada dia. Com `while`, ache o primeiro dia com pelo menos 1000.'),
      L('Double and add a day while views < 1000.', 'Duplica y suma un día mientras views < 1000.', 'Dobre e some um dia enquanto views < 1000.'),
      L('`int views = 1, day = 1; while (views < 1000) { views *= 2; day++; }` → day 11 (1024 views).', '`int views = 1, day = 1; while (views < 1000) { views *= 2; day++; }` → día 11 (1024 vistas).', '`int views = 1, day = 1; while (views < 1000) { views *= 2; day++; }` → dia 11 (1024).')),
    ex('p1w3-ex-5-3', 2, L('Sum the arguments', 'Suma los argumentos', 'Some os argumentos'),
      L('`java Sum 4 10 -1` prints 13. Use a for-each over `args`.', '`java Sum 4 10 -1` imprime 13. Usa un for-each sobre `args`.', '`java Sum 4 10 -1` imprime 13. Use um for-each sobre `args`.'),
      L('Parse inside the loop.', 'Convierte dentro del ciclo.', 'Converta dentro do laço.'),
      same('`int sum = 0; for (String a : args) { sum += Integer.parseInt(a); } System.out.println(sum);`'))]),

  lesson('p1w3-l6-patterns', L('Counters, accumulators, and patterns', 'Contadores, acumuladores y patrones', 'Contadores, acumuladores e padrões'), 20,
    java(L('Statistics over the arguments, then a triangle. Run: `java Stats 4 -2 7 10 999 3`.', 'Estadísticas sobre los argumentos y luego un triángulo. Ejecuta: `java Stats 4 -2 7 10 999 3`.', 'Estatísticas sobre os argumentos e depois um triângulo. Rode: `java Stats 4 -2 7 10 999 3`.'),
      `public class Stats {
    public static void main(String[] args) {
        int count = 0, sum = 0, evens = 0;
        for (String arg : args) {
            int value = Integer.parseInt(arg);
            if (value < 0) {
                continue;            // skip, go to the next argument
            }
            if (value == 999) {
                break;               // sentinel: stop reading
            }
            count++;                 // counter
            sum += value;            // accumulator
            if (value % 2 == 0) {
                evens++;             // conditional counter
            }
        }
        System.out.println("count=" + count + " sum=" + sum + " evens=" + evens);
        if (count > 0) {
            System.out.printf("average=%.2f%n", (double) sum / count);
        }
        for (int row = 1; row <= 4; row++) {         // rows
            for (int col = 1; col <= row; col++) {   // columns
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`),
    [
      L('A **counter** starts at 0 and adds 1 when something happens (`count++`). An **accumulator** starts at a neutral value and combines each new value: 0 for a sum, 1 for a product, the first element for a maximum. Declare them before the loop.',
        'Un **contador** empieza en 0 y suma 1 cuando ocurre algo (`count++`). Un **acumulador** empieza en un valor neutro y combina cada valor nuevo: 0 para una suma, 1 para un producto, el primer elemento para un máximo. Decláralos antes del ciclo.',
        'Um **contador** começa em 0 e soma 1 quando algo acontece (`count++`). Um **acumulador** começa num valor neutro e combina cada valor novo: 0 para uma soma, 1 para um produto, o primeiro elemento para um máximo. Declare antes do laço.'),
      L('`break` leaves the loop now; `continue` skips to the next pass. A **sentinel** is a value that means “stop”, like 999 above. Before dividing by a counter, check that it is not 0.',
        '`break` sale del ciclo ya; `continue` salta a la siguiente vuelta. Un **centinela** es un valor que significa “parar”, como el 999 de arriba. Antes de dividir entre un contador, comprueba que no sea 0.',
        '`break` sai do laço agora; `continue` pula para a próxima volta. Uma **sentinela** é um valor que significa “parar”, como o 999 acima. Antes de dividir por um contador, confira que não é 0.'),
      L('**Nested loops** run the inner loop completely for each pass of the outer one. In patterns, the outer loop picks the row and the inner loop prints its characters. Find the rule: row 3 of the triangle has 3 stars. This row/column thinking returns with grids next week.',
        'En los **ciclos anidados**, el interno se ejecuta completo en cada vuelta del externo. En los patrones, el externo elige la fila y el interno imprime sus caracteres. Encuentra la regla: la fila 3 del triángulo tiene 3 estrellas. Este razonamiento de filas y columnas vuelve con las cuadrículas la próxima semana.',
        'Nos **laços aninhados**, o interno roda inteiro a cada volta do externo. Nos padrões, o externo escolhe a linha e o interno imprime seus caracteres. Ache a regra: a linha 3 do triângulo tem 3 estrelas. Esse raciocínio de linhas e colunas volta com as grades na semana que vem.'),
    ],
    L('A counter is the clicker at a stadium gate; an accumulator is the cash box. `break` is the final whistle; `continue` is skipping one penalty and taking the next.',
      'Un contador es el contador manual en la puerta del estadio; un acumulador es la caja registradora. `break` es el silbato final; `continue` es saltar un penal y tirar el siguiente.',
      'Um contador é o contador manual no portão do estádio; um acumulador é o caixa. `break` é o apito final; `continue` é pular um pênalti e bater o próximo.'),
    [L('Counter `count++`; accumulator `sum += value`.', 'Contador `count++`; acumulador `sum += value`.', 'Contador `count++`; acumulador `sum += value`.'),
      L('Nested loops: outer = rows, inner = columns.', 'Ciclos anidados: externo = filas, interno = columnas.', 'Laços aninhados: externo = linhas, interno = colunas.')],
    chk(L('What does `java Stats 4 -2 7 10 999 3` print first?', '¿Qué imprime primero `java Stats 4 -2 7 10 999 3`?', 'O que `java Stats 4 -2 7 10 999 3` imprime primeiro?'),
      [same('`count=4 sum=24 evens=2`'), same('`count=3 sum=21 evens=2`'), same('`count=5 sum=1021 evens=2`')], 1,
      L('−2 is skipped, 999 stops before 3: 4 + 7 + 10 = 21; 4 and 10 are even.', 'Se salta −2 y 999 detiene antes del 3: 4 + 7 + 10 = 21; 4 y 10 son pares.', '−2 é pulado e 999 para antes do 3: 4 + 7 + 10 = 21; 4 e 10 são pares.')),
    [pf(L('Declaring the accumulator inside the loop.', 'Declarar el acumulador dentro del ciclo.', 'Declarar o acumulador dentro do laço.'),
      L('It restarts every pass; declare it before the loop.', 'Se reinicia en cada vuelta; decláralo antes del ciclo.', 'Ele reinicia a cada volta; declare antes do laço.'))],
    [ex('p1w3-ex-6-1', 1, L('Times table', 'Tabla de multiplicar', 'Tabuada'),
      L('`java Table 7` prints `7 x 1 = 7` to `7 x 10 = 70`.', '`java Table 7` imprime de `7 x 1 = 7` a `7 x 10 = 70`.', '`java Table 7` imprime de `7 x 1 = 7` a `7 x 10 = 70`.'),
      L('One `for` from 1 to 10.', 'Un `for` de 1 a 10.', 'Um `for` de 1 a 10.'),
      same('`for (int i = 1; i <= 10; i++) { System.out.println(n + " x " + i + " = " + n * i); }`')),
    ex('p1w3-ex-6-2', 2, L('Hollow square', 'Cuadrado hueco', 'Quadrado vazado'),
      L('For `n` = 4, print a 4×4 square of `#` with spaces inside.', 'Para `n` = 4, imprime un cuadrado de 4×4 con `#` y espacios por dentro.', 'Para `n` = 4, imprima um quadrado 4×4 de `#` com espaços dentro.'),
      L('Print `#` on the first or last row or column.', 'Imprime `#` en la primera o última fila o columna.', 'Imprima `#` na primeira ou última linha ou coluna.'),
      same('`for (int r = 1; r <= n; r++) { for (int c = 1; c <= n; c++) { System.out.print(r == 1 || r == n || c == 1 || c == n ? "#" : " "); } System.out.println(); }`')),
    ex('p1w3-ex-6-3', 3, L('Next prime', 'Siguiente primo', 'Próximo primo'),
      L('`java NextPrime 20` prints 23. Loop over candidates; test divisors in an inner loop with `break`.', '`java NextPrime 20` imprime 23. Recorre candidatos y prueba divisores en un ciclo interno con `break`.', '`java NextPrime 20` imprime 23. Percorra candidatos e teste divisores num laço interno com `break`.'),
      L('p is prime if no d with d·d ≤ p divides it.', 'p es primo si ningún d con d·d ≤ p lo divide.', 'p é primo se nenhum d com d·d ≤ p o divide.'),
      same('`int p = Integer.parseInt(args[0]) + 1; while (true) { boolean prime = p > 1; for (int d = 2; d * d <= p; d++) { if (p % d == 0) { prime = false; break; } } if (prime) { break; } p++; } System.out.println(p);`'))]),
];

const questions: Question[] = [
  mc('p1w3-q1', 'troubleshooting', 'p1w3-l1-validate', L('`java Pace 5 abc` crashes with `NumberFormatException`. What is the right fix?', '`java Pace 5 abc` falla con `NumberFormatException`. ¿Cuál es la solución correcta?', '`java Pace 5 abc` quebra com `NumberFormatException`. Qual é a correção certa?'),
    [L('Wrap the parsing in `try/catch` and print a message', 'Envolver la conversión en `try/catch` e imprimir un mensaje', 'Envolver a conversão em `try/catch` e imprimir uma mensagem'), L('Check `args.length` again', 'Revisar otra vez `args.length`', 'Conferir `args.length` de novo'), L('Use `Double.parseDouble`', 'Usar `Double.parseDouble`', 'Usar `Double.parseDouble`')], 0,
    L('The count is fine; the format is not. Catch the exception.', 'La cantidad está bien; el formato no. Captura la excepción.', 'A quantidade está certa; o formato não. Capture a exceção.')),
  fill('p1w3-q2', 'fill-blank', 'p1w3-l1-validate', L('`"speed=90".split("=")[1]` is ____.', '`"speed=90".split("=")[1]` es ____.', '`"speed=90".split("=")[1]` é ____.'), ['90', '"90"'],
    L('`split` gives `{"speed", "90"}`; index 1 is the value, still text.', '`split` da `{"speed", "90"}`; el índice 1 es el valor, todavía texto.', '`split` dá `{"speed", "90"}`; o índice 1 é o valor, ainda texto.')),
  mc('p1w3-q3', 'code', 'p1w3-l2-output', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('`Ana   |  7.50`'), same('`Ana|7.5`'), same('`  Ana|7.50`')], 0,
    L('`%-6s` left-aligns in 6; `%6.2f` right-aligns with 2 decimals.', '`%-6s` alinea a la izquierda en 6; `%6.2f` alinea a la derecha con 2 decimales.', '`%-6s` alinha à esquerda em 6; `%6.2f` alinha à direita com 2 casas.'), 'System.out.printf("%-6s|%6.2f%n", "Ana", 7.5);'),
  mc('p1w3-q4', 'code', 'p1w3-l3-if', L('What does this print for `t = 30`?', '¿Qué imprime con `t = 30`?', 'O que imprime com `t = 30`?'), [same('hot'), same('warm'), same('hot warm')], 0,
    L('The first true branch (`t > 25`) runs and the rest are skipped.', 'Se ejecuta la primera rama verdadera (`t > 25`) y se saltan las demás.', 'O primeiro ramo verdadeiro (`t > 25`) roda e o resto é pulado.'),
    'int t = 30;\nif (t > 25) {\n    System.out.println("hot");\n} else if (t > 15) {\n    System.out.println("warm");\n} else {\n    System.out.println("cold");\n}'),
  tf('p1w3-q5', 'p1w3-l3-if', L('`if (0 < x < 10)` is valid Java.', '`if (0 < x < 10)` es Java válido.', '`if (0 < x < 10)` é Java válido.'), false,
    L('Write `x > 0 && x < 10`.', 'Escribe `x > 0 && x < 10`.', 'Escreva `x > 0 && x < 10`.')),
  mc('p1w3-q6', 'code', 'p1w3-l4-switch', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('B'), same('BC'), same('BCD')], 2,
    L('Case 2 matches and, without `break`, falls through to 3 and `default`.', 'Coincide el caso 2 y, sin `break`, cae al 3 y a `default`.', 'O caso 2 bate e, sem `break`, cai no 3 e no `default`.'),
    'int n = 2;\nswitch (n) {\n    case 1: System.out.print("A");\n    case 2: System.out.print("B");\n    case 3: System.out.print("C");\n    default: System.out.print("D");\n}'),
  match('p1w3-q7', 'p1w3-l5-loops', L('Match each situation with the best loop.', 'Relaciona cada situación con el mejor ciclo.', 'Ligue cada situação ao melhor laço.'),
    [L('Print 1 to 100', 'Imprimir de 1 a 100', 'Imprimir de 1 a 100'), L('Keep saving until a goal', 'Ahorrar hasta llegar a una meta', 'Economizar até atingir uma meta'), L('Show a menu, then ask', 'Mostrar un menú y luego preguntar', 'Mostrar um menu e depois perguntar'), L('Visit every argument', 'Recorrer cada argumento', 'Percorrer cada argumento')],
    [same('do-while'), same('for'), same('for-each'), same('while')], [1, 3, 0, 2],
    L('Known count → `for`; unknown → `while`; at least once → `do-while`; every element → for-each.', 'Cantidad conocida → `for`; desconocida → `while`; al menos una vez → `do-while`; cada elemento → for-each.', 'Quantidade conhecida → `for`; desconhecida → `while`; pelo menos uma vez → `do-while`; cada elemento → for-each.')),
  mc('p1w3-q8', 'code', 'p1w3-l6-patterns', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('1 2 4 5'), same('1 2'), same('1 2 3 4 5')], 0,
    L('`continue` skips 3; nothing breaks the loop.', '`continue` salta el 3; nada rompe el ciclo.', '`continue` pula o 3; nada interrompe o laço.'),
    'for (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        continue;\n    }\n    System.out.print(i + " ");\n}'),
  mc('p1w3-q9', 'code', 'p1w3-l6-patterns', L('How many stars does this print?', '¿Cuántas estrellas imprime?', 'Quantas estrelas imprime?'), [same('6'), same('9'), same('12')], 2,
    L('The inner loop runs 4 times for each of the 3 rows: 12.', 'El ciclo interno corre 4 veces por cada una de las 3 filas: 12.', 'O laço interno roda 4 vezes para cada uma das 3 linhas: 12.'),
    'for (int r = 0; r < 3; r++) {\n    for (int c = 0; c < 4; c++) {\n        System.out.print("*");\n    }\n    System.out.println();\n}'),
];

const activities: Activity[] = [
  { id: 'p1w3-act-validate', kind: 'order', lessonId: 'p1w3-l1-validate', title: L('Validate in order', 'Valida en orden', 'Valide em ordem'),
    prompt: L('Order the steps of a robust `main`.', 'Ordena los pasos de un `main` robusto.', 'Ordene os passos de um `main` robusto.'),
    items: [L('Check `args.length`', 'Revisar `args.length`', 'Conferir `args.length`'), L('Parse inside `try`', 'Convertir dentro de `try`', 'Converter dentro do `try`'), L('Catch `NumberFormatException`', 'Capturar `NumberFormatException`', 'Capturar `NumberFormatException`'), L('Check the ranges', 'Revisar los rangos', 'Conferir as faixas'), L('Compute and print', 'Calcular e imprimir', 'Calcular e imprimir')],
    explanation: L('Count, format, range, and only then the real work.', 'Cantidad, formato, rango y solo después el trabajo real.', 'Quantidade, formato, faixa e só depois o trabalho de verdade.') },
  { id: 'p1w3-act-fill', kind: 'code-fill', lessonId: 'p1w3-l1-validate', title: L('Catch the bad number', 'Captura el número inválido', 'Capture o número inválido'),
    prompt: L('Complete the parsing block.', 'Completa el bloque de conversión.', 'Complete o bloco de conversão.'),
    template: 'int laps = 0;\n{0} {\n    laps = Integer.parseInt(args[0]);\n} {1} (NumberFormatException e) {\n    System.out.println("Not a number: " + args[0]);\n}',
    blanks: ['try', 'catch'], explanation: L('`try` holds the risky line; `catch` handles the error.', '`try` contiene la línea riesgosa; `catch` maneja el error.', '`try` contém a linha arriscada; `catch` trata o erro.') },
  { id: 'p1w3-act-classify', kind: 'classify', lessonId: 'p1w3-l5-loops', title: L('if, switch, or loop?', '¿if, switch o ciclo?', 'if, switch ou laço?'),
    prompt: L('Which construct fits each task best?', '¿Qué estructura encaja mejor con cada tarea?', 'Que estrutura combina melhor com cada tarefa?'),
    buckets: [same('if / else'), same('switch'), L('Loop', 'Ciclo', 'Laço')],
    items: [
      { text: L('Price depends on an age range', 'El precio depende de un rango de edad', 'O preço depende de uma faixa de idade'), bucket: 0 },
      { text: L('Command is “add”, “list”, or “quit”', 'El comando es “add”, “list” o “quit”', 'O comando é “add”, “list” ou “quit”'), bucket: 1 },
      { text: L('Add up every argument', 'Sumar todos los argumentos', 'Somar todos os argumentos'), bucket: 2 },
      { text: L('Month number to month name', 'Número de mes a nombre de mes', 'Número do mês para nome do mês'), bucket: 1 },
      { text: L('Print a 5-row triangle', 'Imprimir un triángulo de 5 filas', 'Imprimir um triângulo de 5 linhas'), bucket: 2 },
      { text: L('Warn if the battery is under 20%', 'Avisar si la batería está bajo 20%', 'Avisar se a bateria está abaixo de 20%'), bucket: 0 },
    ],
    explanation: L('Ranges and combined conditions → `if`; one value vs fixed options → `switch`; repetition → loop.', 'Rangos y condiciones combinadas → `if`; un valor frente a opciones fijas → `switch`; repetición → ciclo.', 'Faixas e condições combinadas → `if`; um valor contra opções fixas → `switch`; repetição → laço.') },
  { id: 'p1w3-act-scramble', kind: 'scramble', lessonId: 'p1w3-l5-loops', title: L('Build the loop header', 'Arma el encabezado del ciclo', 'Monte o cabeçalho do laço'),
    prompt: L('Count from 10 down to 1.', 'Cuenta de 10 a 1.', 'Conte de 10 até 1.'),
    tokens: ['for', '(int i = 10;', 'i >= 1;', 'i--)'], explanation: L('Start, condition, update.', 'Inicio, condición, actualización.', 'Início, condição, atualização.') },
];

const labs: Lab[] = [
  { id: 'p1w3-lab1-ticket', level: 2, minutes: 50, title: L('Cinema ticket calculator', 'Calculadora de entradas de cine', 'Calculadora de ingressos de cinema'),
    goal: L('Combine validation, `if`, `switch`, and `printf` in one command-line program.', 'Combinar validación, `if`, `switch` y `printf` en un programa de línea de comandos.', 'Combinar validação, `if`, `switch` e `printf` num programa de linha de comando.'),
    steps: [
      { id: 'p1w3-lab1-s1', title: L('Create and compile Ticket.java', 'Crea y compila Ticket.java', 'Crie e compile Ticket.java'), commands: ['mkdir -p ~/prog1/week3 && cd ~/prog1/week3', ...heredoc('Ticket.java', TICKET), 'javac Ticket.java'],
        expected: L('It compiles with no messages.', 'Compila sin mensajes.', 'Compila sem mensagens.') },
      { id: 'p1w3-lab1-s2', title: L('Normal runs', 'Ejecuciones normales', 'Execuções normais'), commands: ['java Ticket 30 3', 'java Ticket 8 2', 'java Ticket 70 7', 'java Ticket 2 6'],
        expected: L('`Age 30, regular day: 8.00`, `Age 8, half-price Tuesday: 2.50`, `Age 70, weekend: 6.50`, `Age 2, weekend: 0.00` (a comma instead of a point on a Spanish or Portuguese system).', '`Age 30, regular day: 8.00`, `Age 8, half-price Tuesday: 2.50`, `Age 70, weekend: 6.50`, `Age 2, weekend: 0.00` (con coma en lugar de punto en un sistema en español).', '`Age 30, regular day: 8.00`, `Age 8, half-price Tuesday: 2.50`, `Age 70, weekend: 6.50`, `Age 2, weekend: 0.00` (com vírgula em vez de ponto num sistema em português).') },
      { id: 'p1w3-lab1-s3', title: L('Invalid runs', 'Ejecuciones inválidas', 'Execuções inválidas'), commands: ['java Ticket', 'java Ticket ten 3', 'java Ticket 30 9', 'echo $?'],
        expected: L('Usage line; `Age and day must be whole numbers.`; `Out of range: age >= 0, day 1-7.`. After the usage run, `echo $?` would show 1 (the exit code).', 'Línea de uso; `Age and day must be whole numbers.`; `Out of range: age >= 0, day 1-7.`. Tras la ejecución con la línea de uso, `echo $?` mostraría 1 (el código de salida).', 'Linha de uso; `Age and day must be whole numbers.`; `Out of range: age >= 0, day 1-7.`. Depois da execução com a linha de uso, `echo $?` mostraria 1 (o código de saída).') },
      { id: 'p1w3-lab1-s4', title: L('Extend it', 'Amplíalo', 'Amplie'), commands: ['# add a third optional argument: student=yes gives 20% off', 'java Ticket 20 3 student=yes'],
        expected: L('`Age 20, regular day: 6.40`. Without the third argument the price is unchanged.', '`Age 20, regular day: 6.40`. Sin el tercer argumento el precio no cambia.', '`Age 20, regular day: 6.40`. Sem o terceiro argumento o preço não muda.') },
    ] },
  { id: 'p1w3-lab2-patterns', level: 2, minutes: 45, title: L('Loops and patterns', 'Ciclos y patrones', 'Laços e padrões'),
    goal: L('Print patterns with nested loops and compute statistics over arguments.', 'Imprimir patrones con ciclos anidados y calcular estadísticas sobre argumentos.', 'Imprimir padrões com laços aninhados e calcular estatísticas sobre argumentos.'),
    steps: [
      { id: 'p1w3-lab2-s1', title: L('A centred pyramid', 'Una pirámide centrada', 'Uma pirâmide centrada'), commands: [...heredoc('Pyramid.java', PYRAMID), 'javac Pyramid.java', 'java Pyramid 3'],
        expected: L('Three rows: 2 spaces + 1 star, 1 space + 3 stars, 5 stars. Without an argument it uses height 4.', 'Tres filas: 2 espacios + 1 estrella, 1 espacio + 3 estrellas, 5 estrellas. Sin argumento usa altura 4.', 'Três linhas: 2 espaços + 1 estrela, 1 espaço + 3 estrelas, 5 estrelas. Sem argumento usa altura 4.') },
      { id: 'p1w3-lab2-s2', title: L('Your own pattern', 'Tu propio patrón', 'Seu próprio padrão'), commands: ['# write Diamond.java: java Diamond 3 prints the pyramid and then its mirror', 'java Diamond 3'],
        expected: L('Five rows: 1, 3, 5, 3, 1 stars, centred. Hint: a second loop with `row` going down.', 'Cinco filas: 1, 3, 5, 3, 1 estrellas, centradas. Pista: un segundo ciclo con `row` hacia abajo.', 'Cinco linhas: 1, 3, 5, 3, 1 estrelas, centradas. Dica: um segundo laço com `row` descendo.') },
      { id: 'p1w3-lab2-s3', title: L('Statistics', 'Estadísticas', 'Estatísticas'), commands: ['# save Stats.java from Lesson 6', 'javac Stats.java', 'java Stats 4 -2 7 10 999 3', 'java Stats -5'],
        expected: L('First: `count=3 sum=21 evens=2`, `average=7.00` and the triangle. Second: `count=0 sum=0 evens=0`, no average line, then the triangle.', 'Primero: `count=3 sum=21 evens=2`, `average=7.00` y el triángulo. Segundo: `count=0 sum=0 evens=0`, sin línea de promedio, y el triángulo.', 'Primeiro: `count=3 sum=21 evens=2`, `average=7.00` e o triângulo. Segundo: `count=0 sum=0 evens=0`, sem linha de média, e o triângulo.') },
      { id: 'p1w3-lab2-s4', title: L('Optional: the Scanner version', 'Opcional: la versión con Scanner', 'Opcional: a versão com Scanner'), commands: ['# write SumInput.java: read numbers with Scanner until 0 and print the total', 'java SumInput'],
        expected: L('Typing 5, 8, 0 prints `Total: 13`. Compare how much easier `java Stats 5 8` is to repeat.', 'Al escribir 5, 8, 0 imprime `Total: 13`. Compara lo fácil que es repetir `java Stats 5 8`.', 'Digitando 5, 8, 0 imprime `Total: 13`. Compare como é mais fácil repetir `java Stats 5 8`.') },
    ] },
];

const resources: ExternalResource[] = [
  { id: 'p1w3-r1', title: 'Oracle Java Tutorials: Control Flow Statements', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('`if`, `switch`, `while`, `for`, `break`, and `continue`.', '`if`, `switch`, `while`, `for`, `break` y `continue`.', '`if`, `switch`, `while`, `for`, `break` e `continue`.') },
  { id: 'p1w3-r2', title: 'dev.java: Formatting output with printf', url: 'https://dev.java/learn/numbers-strings/formatting-numeric-print-output/', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Format specifiers and widths.', 'Especificadores de formato y anchos.', 'Especificadores de formato e larguras.') },
  { id: 'p1w3-r3', title: 'W3Schools: Java Switch', url: 'https://www.w3schools.com/java/java_switch.asp', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short runnable examples.', 'Ejemplos cortos ejecutables.', 'Exemplos curtos executáveis.') },
  { id: 'p1w3-r4', title: 'Exercism: Java track', url: 'https://exercism.org/tracks/java', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Loop and condition exercises with tests.', 'Ejercicios de ciclos y condiciones con pruebas.', 'Exercícios de laços e condições com testes.') },
];

/** Programming 1, Week 3: input, decisions, and loops. */
export const prog1Week3: WeekContent = {
  id: 'y1-t1-m1-prog-w3', year: 1, term: 1, module: 1, week: 3, subject: 'programming-1',
  title: L('Decisions and loops', 'Decisiones y ciclos', 'Decisões e laços'),
  intro: L('Programs become useful when they react to their input and repeat work. This week you make `args` input robust, format output, choose paths with `if` and `switch`, repeat with four kinds of loop, and combine counters, accumulators, and nested loops to compute statistics and print patterns.',
    'Los programas se vuelven útiles cuando reaccionan a su entrada y repiten trabajo. Esta semana haces robusta la entrada con `args`, das formato a la salida, eliges caminos con `if` y `switch`, repites con cuatro tipos de ciclo y combinas contadores, acumuladores y ciclos anidados para calcular estadísticas e imprimir patrones.',
    'Programas ficam úteis quando reagem à entrada e repetem trabalho. Nesta semana você torna robusta a entrada com `args`, formata a saída, escolhe caminhos com `if` e `switch`, repete com quatro tipos de laço e combina contadores, acumuladores e laços aninhados para calcular estatísticas e imprimir padrões.'),
  objectives: [
    L('Validate arguments: count, format with `try/catch`, and range.', 'Validar argumentos: cantidad, formato con `try/catch` y rango.', 'Validar argumentos: quantidade, formato com `try/catch` e faixa.'),
    L('Format output with `printf` and read input with `Scanner` when needed.', 'Dar formato con `printf` y leer con `Scanner` cuando haga falta.', 'Formatar com `printf` e ler com `Scanner` quando preciso.'),
    L('Choose paths with `if`, `else if`, the ternary, and `switch`.', 'Elegir caminos con `if`, `else if`, el ternario y `switch`.', 'Escolher caminhos com `if`, `else if`, o ternário e `switch`.'),
    L('Repeat with `while`, `do-while`, `for`, and for-each, using counters, accumulators, `break`, and `continue`.', 'Repetir con `while`, `do-while`, `for` y for-each, usando contadores, acumuladores, `break` y `continue`.', 'Repetir com `while`, `do-while`, `for` e for-each, usando contadores, acumuladores, `break` e `continue`.'),
  ],
  prerequisites: [L('Week 2: `args`, types, and operators.', 'Semana 2: `args`, tipos y operadores.', 'Semana 2: `args`, tipos e operadores.')],
  keyConcepts: [same('try / catch'), same('printf'), same('if / else if'), same('switch'), same('while / do-while / for'), L('Counter and accumulator', 'Contador y acumulador', 'Contador e acumulador'), L('Nested loops', 'Ciclos anidados', 'Laços aninhados')],
  estimatedMinutes: 330,
  sequence: [L('Lessons 1–2: robust input and output.', 'Lecciones 1–2: entrada y salida robustas.', 'Lições 1–2: entrada e saída robustas.'), L('Lessons 3–4 and Lab 1.', 'Lecciones 3–4 y Laboratorio 1.', 'Lições 3–4 e Laboratório 1.'), L('Lessons 5–6 and Lab 2, then the quiz.', 'Lecciones 5–6 y Laboratorio 2, luego el cuestionario.', 'Lições 5–6 e Laboratório 2, depois o questionário.')],
  outcomes: [L('Your programs reject bad input politely.', 'Tus programas rechazan con cortesía la entrada inválida.', 'Seus programas recusam com educação a entrada inválida.'), L('You write loops that end and patterns that match the rule.', 'Escribes ciclos que terminan y patrones que siguen la regla.', 'Você escreve laços que terminam e padrões que seguem a regra.')],
  checklist: [L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'), L('Finish both labs, including the extension', 'Terminar ambos laboratorios, incluida la ampliación', 'Terminar os dois laboratórios, incluindo a ampliação'), L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário')],
  commonMistakes: [
    { mistake: L('Testing ranges in the wrong order in an else-if chain.', 'Probar rangos en el orden equivocado en una cadena else-if.', 'Testar faixas na ordem errada numa cadeia else-if.'), fix: L('Go from the most specific (or invalid) case to the most general.', 'Ve del caso más específico (o inválido) al más general.', 'Vá do caso mais específico (ou inválido) ao mais geral.') },
    { mistake: L('Loops that never end.', 'Ciclos que nunca terminan.', 'Laços que nunca terminam.'), fix: L('Point at the line that moves the loop towards its end.', 'Señala la línea que acerca el ciclo a su final.', 'Aponte a linha que leva o laço ao fim.') },
  ],
  lessons,
  flashcards: [
    fc('p1w3-fc-1', 'p1w3-l1-validate', 'concept', L('Three checks for arguments', 'Tres revisiones de argumentos', 'Três checagens de argumentos'), L('Count (`args.length`), format (`try/catch`), range.', 'Cantidad (`args.length`), formato (`try/catch`), rango.', 'Quantidade (`args.length`), formato (`try/catch`), faixa.')),
    fc('p1w3-fc-2', 'p1w3-l1-validate', 'command', same('catch (NumberFormatException e)'), L('Handles text that `parseInt` or `parseDouble` cannot convert.', 'Maneja el texto que `parseInt` o `parseDouble` no pueden convertir.', 'Trata o texto que `parseInt` ou `parseDouble` não conseguem converter.')),
    fc('p1w3-fc-3', 'p1w3-l1-validate', 'command', same('System.exit(1)'), L('Ends the program at once with error code 1.', 'Termina el programa de inmediato con código de error 1.', 'Encerra o programa na hora com código de erro 1.')),
    fc('p1w3-fc-4', 'p1w3-l2-output', 'command', same('printf("%-10s %6.2f%n", name, x)'), L('Text left-aligned in 10, number in 6 with 2 decimals, new line.', 'Texto alineado a la izquierda en 10, número en 6 con 2 decimales, salto de línea.', 'Texto alinhado à esquerda em 10, número em 6 com 2 casas, quebra de linha.')),
    fc('p1w3-fc-5', 'p1w3-l2-output', 'distinction', L('`args` vs `Scanner`', '`args` vs `Scanner`', '`args` vs `Scanner`'), L('`args`: input at start, easy to repeat. `Scanner`: asks while running.', '`args`: entrada al arrancar, fácil de repetir. `Scanner`: pregunta durante la ejecución.', '`args`: entrada no início, fácil de repetir. `Scanner`: pergunta durante a execução.')),
    fc('p1w3-fc-6', 'p1w3-l3-if', 'concept', L('else-if chain', 'Cadena else-if', 'Cadeia else-if'), L('Tested top to bottom; only the first true branch runs.', 'Se prueba de arriba abajo; solo corre la primera rama verdadera.', 'Testada de cima para baixo; só o primeiro ramo verdadeiro roda.')),
    fc('p1w3-fc-7', 'p1w3-l3-if', 'command', same('cond ? a : b'), L('The ternary: `a` if `cond` is true, otherwise `b`.', 'El ternario: `a` si `cond` es verdadera; si no, `b`.', 'O ternário: `a` se `cond` for verdadeira; senão, `b`.')),
    fc('p1w3-fc-8', 'p1w3-l4-switch', 'concept', L('Fall-through', 'Caída en switch', 'Queda no switch'), L('In a classic `switch` without `break`, execution continues into the next case.', 'En un `switch` clásico sin `break`, la ejecución sigue en el siguiente caso.', 'Num `switch` clássico sem `break`, a execução continua no caso seguinte.')),
    fc('p1w3-fc-9', 'p1w3-l5-loops', 'distinction', same('while vs do-while'), L('`while` may run 0 times; `do-while` runs at least once.', '`while` puede correr 0 veces; `do-while` corre al menos una.', '`while` pode rodar 0 vezes; `do-while` roda pelo menos uma.')),
    fc('p1w3-fc-10', 'p1w3-l6-patterns', 'distinction', same('break vs continue'), L('`break` leaves the loop; `continue` skips to the next pass.', '`break` sale del ciclo; `continue` salta a la siguiente vuelta.', '`break` sai do laço; `continue` pula para a próxima volta.')),
    fc('p1w3-fc-11', 'p1w3-l6-patterns', 'concept', L('Accumulator', 'Acumulador', 'Acumulador'), L('A variable that combines values across passes, such as `sum += value`.', 'Una variable que combina valores entre vueltas, como `sum += value`.', 'Uma variável que combina valores entre voltas, como `sum += value`.')),
  ],
  questions, activities, labs,
  plan: [
    day(1, 40, 'read', L('Lessons 1–2: validation and output.', 'Lecciones 1–2: validación y salida.', 'Lições 1–2: validação e saída.')),
    day(2, 40, 'read', L('Lessons 3–4: `if` and `switch`.', 'Lecciones 3–4: `if` y `switch`.', 'Lições 3–4: `if` e `switch`.')),
    day(3, 50, 'practice', L('Lab 1: the ticket calculator.', 'Laboratorio 1: la calculadora de entradas.', 'Laboratório 1: a calculadora de ingressos.')),
    day(4, 40, 'read', L('Lessons 5–6: loops and patterns.', 'Lecciones 5–6: ciclos y patrones.', 'Lições 5–6: laços e padrões.')),
    day(5, 45, 'practice', L('Lab 2: patterns and statistics.', 'Laboratorio 2: patrones y estadísticas.', 'Laboratório 2: padrões e estatísticas.')),
    day(6, 30, 'quiz', L('Flashcards and quiz.', 'Tarjetas y cuestionario.', 'Cartões e questionário.')),
  ],
  resources, stories: [], tools: [], videos: [], documents: [],
};
