import type { Activity, ExternalResource, Lab, Lesson, Question } from '../types';
import type { WeekContent } from '../weekContent';
import { L, chk, day, ex, fc, fill, heredoc, java, lesson, match, mc, pf, same, tf } from '../prog1-week1/h';

const POMODORO = `/** A study-timer planner. Run: java Pomodoro work=25 rounds=4 pause=5 */
public class Pomodoro {
    static final int[] ALLOWED_WORK = {15, 20, 25, 30, 45, 50};

    public static void main(String[] args) {
        int work = 25, rounds = 4, pause = 5;              // defaults
        for (String arg : args) {
            String[] kv = arg.split("=");
            if (kv.length != 2) {
                fail("bad option '" + arg + "', expected key=value");
            }
            switch (kv[0]) {
                case "work" -> work = parseIn(kv[1], "work", 1, 120);
                case "rounds" -> rounds = parseIn(kv[1], "rounds", 1, 12);
                case "pause" -> pause = parseIn(kv[1], "pause", 0, 30);
                default -> fail("unknown option '" + kv[0] + "'");
            }
        }
        if (!contains(ALLOWED_WORK, work)) {
            fail("work must be one of 15, 20, 25, 30, 45, 50");
        }
        System.out.println(rounds + " rounds of " + work + " min, total "
                + total(work, rounds, pause) + " min");
    }

    /**
     * Parses a whole number and checks that it is in range.
     * @param text the value written after '='
     * @param name the option name, for error messages
     * @param min smallest allowed value
     * @param max largest allowed value
     * @return the parsed number
     */
    static int parseIn(String text, String name, int min, int max) {
        int value = 0;
        try {
            value = Integer.parseInt(text);
        } catch (NumberFormatException e) {
            fail(name + " must be a whole number, got '" + text + "'");
        }
        if (value < min || value > max) {
            fail(name + " must be between " + min + " and " + max);
        }
        return value;
    }

    /** Returns true if x is one of the values. */
    static boolean contains(int[] values, int x) {
        for (int v : values) {
            if (v == x) {
                return true;
            }
        }
        return false;
    }

    /** Total minutes: work blocks plus the pauses between them. */
    static int total(int work, int rounds, int pause) {
        return rounds * work + (rounds - 1) * pause;
    }

    /** Prints an error and the usage line, then stops with exit code 1. */
    static void fail(String message) {
        System.out.println("Error: " + message);
        System.out.println("Usage: java Pomodoro [work=25] [rounds=4] [pause=5]");
        System.exit(1);
    }
}`;

const TOOLKIT = `public class Toolkit {
    static boolean isLeap(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    static int maxOf(int[] a) {
        int best = a[0];
        for (int v : a) {
            if (v > best) {
                best = v;
            }
        }
        return best;
    }

    static int countVowels(String s) {
        int n = 0;
        for (int i = 0; i < s.length(); i++) {
            if ("aeiou".indexOf(Character.toLowerCase(s.charAt(i))) >= 0) {
                n++;
            }
        }
        return n;
    }

    static String reverse(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            sb.append(s.charAt(i));
        }
        return sb.toString();
    }

    static void check(String what, boolean ok) {
        System.out.println((ok ? "ok   " : "FAIL ") + what);
    }

    public static void main(String[] args) {
        check("2024 is leap", isLeap(2024));
        check("1900 is not leap", !isLeap(1900));
        check("max of {3, 9, 2}", maxOf(new int[] {3, 9, 2}) == 9);
        check("vowels in murcielago", countVowels("murcielago") == 5);
        check("reverse of java", reverse("java").equals("avaj"));
    }
}`;

const lessons: Lesson[] = [
  lesson('p1w5-l1-methods', L('Methods: signature, parameters, return', 'Métodos: firma, parámetros y retorno', 'Métodos: assinatura, parâmetros e retorno'), 20,
    java(L('A health helper split into small methods.', 'Un ayudante de salud dividido en métodos pequeños.', 'Um ajudante de saúde dividido em métodos pequenos.'),
      `public class Health {
    // return type, name, parameters = the signature
    static double bmi(double kg, double metres) {
        return kg / (metres * metres);
    }

    static String category(double bmi) {
        if (bmi < 18.5) {
            return "underweight";
        } else if (bmi < 25) {
            return "normal";
        }
        return "above normal";
    }

    static void report(String name, double kg, double metres) { // void: no result
        double value = bmi(kg, metres);
        System.out.printf("%s: %.1f (%s)%n", name, value, category(value));
    }

    public static void main(String[] args) {
        report("Sofia", 58, 1.65);     // Sofia: 21.3 (normal)
        report("Tomas", 90, 1.75);     // Tomas: 29.4 (above normal)
    }
}`),
    [
      L('A **method** is a named block of code you can call many times. It avoids repeating code, lets you test one piece at a time, and gives a name to an idea, so `main` reads like a summary of the program.',
        'Un **método** es un bloque de código con nombre que puedes llamar muchas veces. Evita repetir código, permite probar una pieza a la vez y le pone nombre a una idea, así `main` se lee como un resumen del programa.',
        'Um **método** é um bloco de código com nome que você pode chamar muitas vezes. Evita repetir código, deixa testar uma peça por vez e dá nome a uma ideia, então o `main` se lê como um resumo do programa.'),
      L('The **signature** is the return type, the name, and the parameter list: `static double bmi(double kg, double metres)`. **Parameters** are the inputs; the values you pass in a call are the **arguments**: `bmi(58, 1.65)`.',
        'La **firma** es el tipo de retorno, el nombre y la lista de parámetros: `static double bmi(double kg, double metres)`. Los **parámetros** son las entradas; los valores que pasas en una llamada son los **argumentos**: `bmi(58, 1.65)`.',
        'A **assinatura** é o tipo de retorno, o nome e a lista de parâmetros: `static double bmi(double kg, double metres)`. Os **parâmetros** são as entradas; os valores que você passa numa chamada são os **argumentos**: `bmi(58, 1.65)`.'),
      L('`return` ends the method and hands back a value of the declared type. A `void` method returns nothing and is used for its effect, such as printing. Until week 6, mark your methods `static` so `main` can call them directly.',
        '`return` termina el método y devuelve un valor del tipo declarado. Un método `void` no devuelve nada y se usa por su efecto, como imprimir. Hasta la semana 6, marca tus métodos como `static` para que `main` los llame directamente.',
        '`return` encerra o método e devolve um valor do tipo declarado. Um método `void` não devolve nada e é usado pelo efeito, como imprimir. Até a semana 6, marque seus métodos como `static` para que o `main` os chame diretamente.'),
    ],
    L('A method is a kitchen appliance: a blender takes fruit (parameters), does one job, and gives back a smoothie (return value). You do not need to know its motor to use it.',
      'Un método es un electrodoméstico: la licuadora recibe fruta (parámetros), hace un trabajo y devuelve un batido (valor de retorno). No necesitas conocer su motor para usarla.',
      'Um método é um eletrodoméstico: o liquidificador recebe fruta (parâmetros), faz um trabalho e devolve uma vitamina (valor de retorno). Você não precisa conhecer o motor para usá-lo.'),
    [L('Signature = return type + name + parameters.', 'Firma = tipo de retorno + nombre + parámetros.', 'Assinatura = tipo de retorno + nome + parâmetros.'),
      L('`return` gives a value; `void` gives none.', '`return` devuelve un valor; `void` no devuelve nada.', '`return` devolve um valor; `void` não devolve nada.')],
    chk(L('Which signature fits a method that receives a price and a discount percentage and gives the final price?', '¿Qué firma corresponde a un método que recibe un precio y un porcentaje de descuento y da el precio final?', 'Que assinatura corresponde a um método que recebe um preço e um percentual de desconto e dá o preço final?'),
      [same('`static void finalPrice(double price, int pct)`'), same('`static double finalPrice(double price, int pct)`'), same('`static double finalPrice()`')], 1,
      L('It needs two parameters and returns a `double`.', 'Necesita dos parámetros y devuelve un `double`.', 'Precisa de dois parâmetros e devolve um `double`.')),
    [pf(L('Printing inside a method that should return a value.', 'Imprimir dentro de un método que debería devolver un valor.', 'Imprimir dentro de um método que deveria devolver um valor.'),
      L('Return the value; let the caller decide what to do with it.', 'Devuelve el valor; que quien llama decida qué hacer con él.', 'Devolva o valor; quem chama decide o que fazer com ele.'))],
    [ex('p1w5-ex-1-1', 1, L('Write a method', 'Escribe un método', 'Escreva um método'),
      L('Write `static double finalPrice(double price, int pct)`; `finalPrice(80, 25)` returns 60.0.', 'Escribe `static double finalPrice(double price, int pct)`; `finalPrice(80, 25)` devuelve 60.0.', 'Escreva `static double finalPrice(double price, int pct)`; `finalPrice(80, 25)` devolve 60.0.'),
      L('Use `100.0`.', 'Usa `100.0`.', 'Use `100.0`.'), same('`return price * (1 - pct / 100.0);`')),
    ex('p1w5-ex-1-2', 2, L('Use it from args', 'Úsalo desde args', 'Use a partir de args'),
      L('`java Shop 80 25` prints 60.0 by calling `finalPrice`.', '`java Shop 80 25` imprime 60.0 llamando a `finalPrice`.', '`java Shop 80 25` imprime 60.0 chamando `finalPrice`.'),
      L('Parse both arguments, then call the method.', 'Convierte ambos argumentos y luego llama al método.', 'Converta os dois argumentos e depois chame o método.'),
      same('`System.out.println(finalPrice(Double.parseDouble(args[0]), Integer.parseInt(args[1])));`'))]),

  lesson('p1w5-l2-passing', L('Passing values, arrays, and overloading', 'Paso de valores, arreglos y sobrecarga', 'Passagem de valores, arrays e sobrecarga'), 20,
    java(L('A primitive argument is copied; an array argument shares the same object.', 'Un argumento primitivo se copia; un arreglo comparte el mismo objeto.', 'Um argumento primitivo é copiado; um array compartilha o mesmo objeto.'),
      `import java.util.Arrays;

public class Passing {
    static void addBonus(int points) {        // receives a copy of the value
        points += 10;
    }

    static void addBonusAll(int[] points) {   // receives a copy of the reference
        for (int i = 0; i < points.length; i++) {
            points[i] += 10;
        }
    }

    static int twice(int x) {
        return 2 * x;
    }

    static double twice(double x) {           // overload: same name, other types
        return 2 * x;
    }

    public static void main(String[] args) {
        int mine = 50;
        addBonus(mine);
        System.out.println(mine);                     // 50: unchanged
        int[] team = {50, 70};
        addBonusAll(team);
        System.out.println(Arrays.toString(team));    // [60, 80]: changed
        System.out.println(twice(4) + " " + twice(1.5)); // 8 3.0
    }
}`),
    [
      L('Java always passes arguments **by value**: the method gets a copy. For a primitive (`int`, `double`), changing the copy never changes the caller’s variable. If a method should produce a new number, return it.',
        'Java siempre pasa los argumentos **por valor**: el método recibe una copia. Con un primitivo (`int`, `double`), cambiar la copia nunca cambia la variable de quien llama. Si un método debe producir un número nuevo, devuélvelo.',
        'Java sempre passa os argumentos **por valor**: o método recebe uma cópia. Com um primitivo (`int`, `double`), mudar a cópia nunca muda a variável de quem chamou. Se um método deve produzir um número novo, devolva-o.'),
      L('An array variable holds a **reference** (an address on the heap). The copy points to the same array, so a method can change its elements and the caller sees the change. This is how a method can update a whole grid.',
        'Una variable de arreglo guarda una **referencia** (una dirección en el heap). La copia apunta al mismo arreglo, así que un método puede cambiar sus elementos y quien llama ve el cambio. Así un método puede actualizar una cuadrícula entera.',
        'Uma variável de array guarda uma **referência** (um endereço no heap). A cópia aponta para o mesmo array, então um método pode mudar os elementos e quem chamou vê a mudança. É assim que um método atualiza uma grade inteira.'),
      L('**Overloading** means several methods share a name but differ in parameter types or count: `twice(int)` and `twice(double)`. Java picks the one that matches the arguments. `System.out.println` itself is overloaded many times.',
        'La **sobrecarga** consiste en que varios métodos compartan nombre pero difieran en el tipo o la cantidad de parámetros: `twice(int)` y `twice(double)`. Java elige el que coincide con los argumentos. El propio `System.out.println` está sobrecargado muchas veces.',
        '**Sobrecarga** é quando vários métodos compartilham o nome mas diferem no tipo ou na quantidade de parâmetros: `twice(int)` e `twice(double)`. Java escolhe o que bate com os argumentos. O próprio `System.out.println` é sobrecarregado muitas vezes.'),
    ],
    L('Passing an `int` is handing someone a photocopy of your ticket: they can scribble on it, yours stays clean. Passing an array is handing them your house address: they can go and rearrange the furniture.',
      'Pasar un `int` es darle a alguien una fotocopia de tu entrada: puede rayarla y la tuya sigue limpia. Pasar un arreglo es darle la dirección de tu casa: puede ir y mover los muebles.',
      'Passar um `int` é entregar a alguém uma fotocópia do seu ingresso: ele pode rabiscar e o seu continua limpo. Passar um array é dar o endereço da sua casa: ele pode ir lá e mudar os móveis.'),
    [L('Primitives: the method changes only its copy.', 'Primitivos: el método solo cambia su copia.', 'Primitivos: o método só muda a cópia dele.'),
      L('Arrays: the copy is a reference, so elements can change.', 'Arreglos: la copia es una referencia, así que los elementos pueden cambiar.', 'Arrays: a cópia é uma referência, então os elementos podem mudar.')],
    chk(L('What does `Passing` print first?', '¿Qué imprime primero `Passing`?', 'O que `Passing` imprime primeiro?'), [same('50'), same('60'), same('10')], 0,
      L('`addBonus` changed only its own copy of `mine`.', '`addBonus` solo cambió su propia copia de `mine`.', '`addBonus` só mudou a própria cópia de `mine`.')),
    [pf(L('Expecting `swap(a, b)` with two `int` values to swap the caller’s variables.', 'Esperar que `swap(a, b)` con dos `int` intercambie las variables de quien llama.', 'Esperar que `swap(a, b)` com dois `int` troque as variáveis de quem chamou.'),
      L('It cannot; swap elements inside an array instead.', 'No puede; intercambia elementos dentro de un arreglo.', 'Não dá; troque elementos dentro de um array.'))],
    [ex('p1w5-ex-2-1', 1, L('Predict', 'Predice', 'Preveja'),
      L('`static void reset(int[] a) { a[0] = 0; }` and `static void reset(int x) { x = 0; }`. After `int[] v = {5}; int n = 5; reset(v); reset(n);`, what are `v[0]` and `n`?', '`static void reset(int[] a) { a[0] = 0; }` y `static void reset(int x) { x = 0; }`. Tras `int[] v = {5}; int n = 5; reset(v); reset(n);`, ¿cuánto valen `v[0]` y `n`?', '`static void reset(int[] a) { a[0] = 0; }` e `static void reset(int x) { x = 0; }`. Depois de `int[] v = {5}; int n = 5; reset(v); reset(n);`, quanto valem `v[0]` e `n`?'),
      L('One shares the array, one copies the number.', 'Uno comparte el arreglo y otro copia el número.', 'Um compartilha o array e o outro copia o número.'), L('`v[0]` = 0, `n` = 5. It is also an overload.', '`v[0]` = 0, `n` = 5. También es una sobrecarga.', '`v[0]` = 0, `n` = 5. Também é uma sobrecarga.')),
    ex('p1w5-ex-2-2', 2, L('Swap in an array', 'Intercambio en un arreglo', 'Troca num array'),
      L('Write `static void swap(int[] a, int i, int j)`.', 'Escribe `static void swap(int[] a, int i, int j)`.', 'Escreva `static void swap(int[] a, int i, int j)`.'),
      L('Use a temporary variable.', 'Usa una variable temporal.', 'Use uma variável temporária.'), same('`int tmp = a[i]; a[i] = a[j]; a[j] = tmp;`'))]),

  lesson('p1w5-l3-scope', L('Scope, the stack, and recursion', 'Ámbito, la pila y recursión', 'Escopo, a pilha e recursão'), 20,
    java(L('Where each variable lives, and a method that calls itself.', 'Dónde vive cada variable y un método que se llama a sí mismo.', 'Onde cada variável vive e um método que chama a si mesmo.'),
      `public class Scope {
    static final double VAT = 0.18;      // class constant: visible in every method
    static int calls = 0;                // static field: lives the whole run

    static double withVat(double price) { // price: parameter, local to the method
        calls++;
        double tax = price * VAT;         // tax: local, gone after return
        return price + tax;
    }

    static int factorial(int n) {
        if (n <= 1) {
            return 1;                     // base case stops the chain
        }
        return n * factorial(n - 1);      // recursive case
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 2; i++) {
            double p = withVat(10 * i);   // p exists only inside this loop body
            System.out.println(p);        // 11.8, then 23.6
        }
        System.out.println("calls = " + calls);       // 2
        System.out.println("4! = " + factorial(4));   // 24
    }
}`),
    [
      L('A variable’s **scope** is the region where its name exists: from its declaration to the closing brace of its block. Parameters and local variables belong to one method; a loop variable belongs to the loop. Two methods can each have a local `count` without clashing.',
        'El **ámbito** de una variable es la región donde su nombre existe: desde su declaración hasta la llave que cierra su bloque. Los parámetros y variables locales pertenecen a un método; la variable de un ciclo pertenece al ciclo. Dos métodos pueden tener cada uno un `count` local sin chocar.',
        'O **escopo** de uma variável é a região onde o nome existe: da declaração até a chave que fecha o bloco. Parâmetros e variáveis locais pertencem a um método; a variável de um laço pertence ao laço. Dois métodos podem ter cada um um `count` local sem conflito.'),
      L('Each call gets a **frame** on the stack with its parameters and locals; the frame disappears on `return`. Objects such as arrays live on the heap and survive as long as something refers to them. A `static` field lives for the whole run and is shared by all methods.',
        'Cada llamada recibe un **marco** en la pila con sus parámetros y variables locales; el marco desaparece con `return`. Los objetos como los arreglos viven en el heap y duran mientras algo los referencie. Un campo `static` vive toda la ejecución y lo comparten todos los métodos.',
        'Cada chamada ganha um **quadro** na pilha com seus parâmetros e variáveis locais; o quadro some no `return`. Objetos como arrays vivem no heap e duram enquanto algo os referenciar. Um campo `static` vive a execução inteira e é compartilhado por todos os métodos.'),
      L('**Recursion** is a method calling itself on a smaller problem. It needs a **base case** that stops without recursing; otherwise frames pile up until `StackOverflowError`. `factorial(4)` = 4 × 3 × 2 × 1 = 24.',
        'La **recursión** es un método que se llama a sí mismo con un problema más pequeño. Necesita un **caso base** que termine sin volver a llamarse; si no, los marcos se acumulan hasta `StackOverflowError`. `factorial(4)` = 4 × 3 × 2 × 1 = 24.',
        '**Recursão** é um método chamando a si mesmo com um problema menor. Precisa de um **caso base** que pare sem chamar de novo; senão os quadros se acumulam até `StackOverflowError`. `factorial(4)` = 4 × 3 × 2 × 1 = 24.'),
    ],
    L('Each call is a sticky note added on top of a pile: it holds that call’s numbers and is thrown away when the call finishes. Recursion is a pile of sticky notes that must end with one that says “stop”.',
      'Cada llamada es una nota adhesiva que se pone encima de una pila: guarda los números de esa llamada y se tira al terminar. La recursión es una pila de notas que debe terminar con una que diga “parar”.',
      'Cada chamada é um bilhete adesivo colocado no topo de uma pilha: guarda os números daquela chamada e vai para o lixo quando ela termina. A recursão é uma pilha de bilhetes que precisa terminar com um que diga “pare”.'),
    [L('Scope: from declaration to the end of the block.', 'Ámbito: desde la declaración hasta el fin del bloque.', 'Escopo: da declaração até o fim do bloco.'),
      L('Recursion needs a base case.', 'La recursión necesita un caso base.', 'A recursão precisa de um caso base.')],
    chk(L('After the loop in `main`, can you print `p`?', 'Después del ciclo en `main`, ¿puedes imprimir `p`?', 'Depois do laço no `main`, dá para imprimir `p`?'),
      [L('Yes, it keeps the last value', 'Sí, conserva el último valor', 'Sim, guarda o último valor'), L('No, `p` is out of scope: compile error', 'No, `p` está fuera de su ámbito: error de compilación', 'Não, `p` está fora do escopo: erro de compilação'), L('Yes, but it prints 0', 'Sí, pero imprime 0', 'Sim, mas imprime 0')], 1,
      L('`p` was declared inside the loop body, so its name ends at that brace.', '`p` se declaró dentro del cuerpo del ciclo, así que su nombre termina en esa llave.', '`p` foi declarada dentro do corpo do laço, então o nome termina naquela chave.')),
    [pf(L('A recursive method without a base case.', 'Un método recursivo sin caso base.', 'Um método recursivo sem caso base.'),
      L('Write the base case first and check each call moves towards it.', 'Escribe primero el caso base y verifica que cada llamada se acerque a él.', 'Escreva primeiro o caso base e confira que cada chamada se aproxima dele.'))],
    [ex('p1w5-ex-3-1', 1, L('Find the scope error', 'Encuentra el error de ámbito', 'Ache o erro de escopo'),
      L('`for (int i = 0; i < 3; i++) { int sq = i * i; } System.out.println(sq);` Why does it fail, and how do you fix it?', '`for (int i = 0; i < 3; i++) { int sq = i * i; } System.out.println(sq);` ¿Por qué falla y cómo se arregla?', '`for (int i = 0; i < 3; i++) { int sq = i * i; } System.out.println(sq);` Por que falha e como corrigir?'),
      L('Where is `sq` declared?', '¿Dónde se declara `sq`?', 'Onde `sq` é declarada?'),
      L('`sq` only exists inside the loop. Declare `int sq = 0;` before the loop and assign inside it; it prints 4.', '`sq` solo existe dentro del ciclo. Declara `int sq = 0;` antes del ciclo y asígnalo dentro; imprime 4.', '`sq` só existe dentro do laço. Declare `int sq = 0;` antes do laço e atribua dentro; imprime 4.')),
    ex('p1w5-ex-3-2', 2, L('Recursive sum of digits', 'Suma recursiva de dígitos', 'Soma recursiva de dígitos'),
      L('Write `static int digitSum(int n)`; `digitSum(4096)` returns 19.', 'Escribe `static int digitSum(int n)`; `digitSum(4096)` devuelve 19.', 'Escreva `static int digitSum(int n)`; `digitSum(4096)` devolve 19.'),
      L('Last digit `n % 10`, rest `n / 10`.', 'Último dígito `n % 10`, resto `n / 10`.', 'Último dígito `n % 10`, resto `n / 10`.'),
      same('`if (n < 10) { return n; } return n % 10 + digitSum(n / 10);`'))]),

  lesson('p1w5-l4-strings', L('Strings and wrapper classes', 'Strings y clases envoltorio', 'Strings e classes empacotadoras'), 20,
    java(L('Build a username from a full name.', 'Crear un nombre de usuario a partir de un nombre completo.', 'Criar um nome de usuário a partir de um nome completo.'),
      `public class Username {
    public static void main(String[] args) {
        String full = args.length > 0 ? args[0] : "  Ana Paula Rojas ";
        String clean = full.trim().toLowerCase();       // "ana paula rojas"
        String[] parts = clean.split(" ");
        String user = parts[0].charAt(0) + parts[parts.length - 1]; // "arojas"
        System.out.println(user + " (" + user.length() + " chars)");
        System.out.println(clean.contains("paula"));    // true
        System.out.println(clean.indexOf('p'));         // 4
        System.out.println(clean.substring(0, 3));      // ana
        System.out.println("arojas".equals(user));      // true

        StringBuilder initials = new StringBuilder();
        for (String p : parts) {
            initials.append(Character.toUpperCase(p.charAt(0)));
        }
        System.out.println(initials);                   // APR
        System.out.println(Integer.MAX_VALUE + " " + Integer.parseInt("-7"));
    }
}`),
    [
      L('A `String` is an object with many methods: `length()`, `charAt(i)`, `substring(a, b)` (from `a` up to, not including, `b`), `indexOf`, `contains`, `trim`, `toLowerCase`, `split`, and `replace`. Indexes start at 0, as in arrays.',
        'Un `String` es un objeto con muchos métodos: `length()`, `charAt(i)`, `substring(a, b)` (desde `a` hasta `b`, sin incluirlo), `indexOf`, `contains`, `trim`, `toLowerCase`, `split` y `replace`. Los índices empiezan en 0, como en los arreglos.',
        'Uma `String` é um objeto com muitos métodos: `length()`, `charAt(i)`, `substring(a, b)` (de `a` até `b`, sem incluí-lo), `indexOf`, `contains`, `trim`, `toLowerCase`, `split` e `replace`. Os índices começam em 0, como nos arrays.'),
      L('Strings are **immutable**: methods return a new string and never change the original, so write `name = name.trim();`. Compare text with `equals`, never `==`, which only checks whether two references point to the same object.',
        'Los strings son **inmutables**: los métodos devuelven un string nuevo y nunca cambian el original, así que escribe `name = name.trim();`. Compara textos con `equals`, nunca con `==`, que solo revisa si dos referencias apuntan al mismo objeto.',
        'Strings são **imutáveis**: os métodos devolvem uma string nova e nunca mudam a original, então escreva `name = name.trim();`. Compare textos com `equals`, nunca com `==`, que só confere se duas referências apontam para o mesmo objeto.'),
      L('Building text in a loop with `+` creates many throwaway strings; `StringBuilder` with `append` is the efficient way. Each primitive has a **wrapper class** (`Integer`, `Double`, `Character`, `Boolean`) with helpers such as `Integer.parseInt`, `Integer.MAX_VALUE`, and `Character.isDigit`.',
        'Construir texto en un ciclo con `+` crea muchos strings descartables; `StringBuilder` con `append` es la forma eficiente. Cada primitivo tiene una **clase envoltorio** (`Integer`, `Double`, `Character`, `Boolean`) con ayudas como `Integer.parseInt`, `Integer.MAX_VALUE` y `Character.isDigit`.',
        'Montar texto num laço com `+` cria muitas strings descartáveis; `StringBuilder` com `append` é o jeito eficiente. Cada primitivo tem uma **classe empacotadora** (`Integer`, `Double`, `Character`, `Boolean`) com ajudas como `Integer.parseInt`, `Integer.MAX_VALUE` e `Character.isDigit`.'),
    ],
    L('A String is a printed label: you cannot edit it, only print a new one. A StringBuilder is a whiteboard you keep writing on.',
      'Un String es una etiqueta impresa: no puedes editarla, solo imprimir una nueva. Un StringBuilder es una pizarra en la que sigues escribiendo.',
      'Uma String é uma etiqueta impressa: não dá para editar, só imprimir outra. Um StringBuilder é um quadro branco em que você continua escrevendo.'),
    [L('Strings are immutable; reassign the result.', 'Los strings son inmutables; reasigna el resultado.', 'Strings são imutáveis; reatribua o resultado.'),
      L('Text equality: `equals`; building text: `StringBuilder`.', 'Igualdad de texto: `equals`; construir texto: `StringBuilder`.', 'Igualdade de texto: `equals`; montar texto: `StringBuilder`.')],
    chk(L('What is `"football".substring(4, 8)`?', '¿Cuánto vale `"football".substring(4, 8)`?', 'Quanto vale `"football".substring(4, 8)`?'),
      [same('`"ball"`'), same('`"tball"`'), same('`"bal"`')], 0,
      L('Indexes 4, 5, 6, 7: b, a, l, l.', 'Índices 4, 5, 6, 7: b, a, l, l.', 'Índices 4, 5, 6, 7: b, a, l, l.')),
    [pf(L('Calling `name.toUpperCase();` and expecting `name` to change.', 'Llamar a `name.toUpperCase();` y esperar que `name` cambie.', 'Chamar `name.toUpperCase();` e esperar que `name` mude.'),
      L('Assign it: `name = name.toUpperCase();`.', 'Asígnalo: `name = name.toUpperCase();`.', 'Atribua: `name = name.toUpperCase();`.'))],
    [ex('p1w5-ex-4-1', 1, L('Count a letter', 'Cuenta una letra', 'Conte uma letra'),
      L('Write `static int count(String s, char c)`; `count("banana", \'a\')` returns 3.', 'Escribe `static int count(String s, char c)`; `count("banana", \'a\')` devuelve 3.', 'Escreva `static int count(String s, char c)`; `count("banana", \'a\')` devolve 3.'),
      L('Loop over `charAt(i)`.', 'Recorre con `charAt(i)`.', 'Percorra com `charAt(i)`.'),
      same("`int n = 0; for (int i = 0; i < s.length(); i++) { if (s.charAt(i) == c) { n++; } } return n;`")),
    ex('p1w5-ex-4-2', 2, L('Palindrome', 'Palíndromo', 'Palíndromo'),
      L('Write `static boolean isPalindrome(String s)` ignoring case: `"Reconocer"` → true.', 'Escribe `static boolean isPalindrome(String s)` sin distinguir mayúsculas: `"Reconocer"` → true.', 'Escreva `static boolean isPalindrome(String s)` ignorando maiúsculas: `"Reconocer"` → true.'),
      L('Compare with the reversed text.', 'Compara con el texto invertido.', 'Compare com o texto invertido.'),
      same('`String t = s.toLowerCase(); return new StringBuilder(t).reverse().toString().equals(t);`'))]),

  lesson('p1w5-l5-options', L('Command-line options as methods, with Javadoc', 'Opciones de línea de comandos como métodos, con Javadoc', 'Opções de linha de comando como métodos, com Javadoc'), 25,
    java(L('A planner with named options, defaults, allowed values, and clear errors. Run: `java Pomodoro work=50 rounds=2`.', 'Un planificador con opciones con nombre, valores por defecto, valores permitidos y errores claros. Ejecuta: `java Pomodoro work=50 rounds=2`.', 'Um planejador com opções nomeadas, valores padrão, valores permitidos e erros claros. Rode: `java Pomodoro work=50 rounds=2`.'), POMODORO),
    [
      L('Real tools read options like `work=50 rounds=2` in any order, use **defaults** for missing ones, and reject bad values with a message that names the option. Put each job in a method: parse one value, check a list of allowed values, compute, and fail.',
        'Las herramientas reales leen opciones como `work=50 rounds=2` en cualquier orden, usan **valores por defecto** para las que faltan y rechazan valores incorrectos con un mensaje que nombra la opción. Pon cada tarea en un método: convertir un valor, revisar una lista de valores permitidos, calcular y fallar.',
        'Ferramentas reais leem opções como `work=50 rounds=2` em qualquer ordem, usam **valores padrão** para as que faltam e recusam valores errados com uma mensagem que nomeia a opção. Ponha cada tarefa num método: converter um valor, conferir uma lista de valores permitidos, calcular e falhar.'),
      L('`fail` prints the error and the usage line, then calls `System.exit(1)`. Because every check calls it, error messages are consistent and `main` stays short. Required options work the same way: start them at a “missing” value such as −1 and check after the loop.',
        '`fail` imprime el error y la línea de uso, y luego llama a `System.exit(1)`. Como todas las revisiones la usan, los mensajes son coherentes y `main` queda corto. Las opciones obligatorias funcionan igual: empiézalas en un valor de “falta”, como −1, y revisa después del ciclo.',
        '`fail` imprime o erro e a linha de uso e depois chama `System.exit(1)`. Como todas as checagens a usam, as mensagens ficam consistentes e o `main` fica curto. Opções obrigatórias funcionam igual: comece com um valor de “falta”, como −1, e confira depois do laço.'),
      L('**Javadoc** comments (`/** … */`) above a method describe what it does, each `@param`, and the `@return` value. Editors show them when you hover over a call, and `javadoc Pomodoro.java -d docs` turns them into web pages.',
        'Los comentarios **Javadoc** (`/** … */`) sobre un método describen lo que hace, cada `@param` y el valor `@return`. Los editores los muestran al pasar el ratón sobre una llamada, y `javadoc Pomodoro.java -d docs` los convierte en páginas web.',
        'Os comentários **Javadoc** (`/** … */`) acima de um método descrevem o que ele faz, cada `@param` e o valor `@return`. Os editores os mostram ao passar o mouse sobre uma chamada, e `javadoc Pomodoro.java -d docs` os transforma em páginas web.'),
    ],
    L('An option parser is a hotel receptionist with a checklist: it accepts the guest’s requests in any order, fills in the standard choices for what was not asked, and politely says which request cannot be met.',
      'Un analizador de opciones es un recepcionista de hotel con una lista: acepta los pedidos del huésped en cualquier orden, completa lo estándar para lo que no se pidió y dice con cortesía qué pedido no se puede cumplir.',
      'Um analisador de opções é um recepcionista de hotel com uma lista: aceita os pedidos do hóspede em qualquer ordem, preenche o padrão para o que não foi pedido e diz com educação qual pedido não dá para atender.'),
    [L('key=value options: defaults, ranges, allowed lists, clear errors.', 'Opciones clave=valor: valores por defecto, rangos, listas permitidas y errores claros.', 'Opções chave=valor: padrões, faixas, listas permitidas e erros claros.'),
      L('Document methods with `/** … */`, `@param`, `@return`.', 'Documenta los métodos con `/** … */`, `@param`, `@return`.', 'Documente os métodos com `/** … */`, `@param`, `@return`.')],
    chk(L('What does `java Pomodoro work=40` print?', '¿Qué imprime `java Pomodoro work=40`?', 'O que `java Pomodoro work=40` imprime?'),
      [same('`4 rounds of 40 min, total 175 min`'), same('`Error: work must be one of 15, 20, 25, 30, 45, 50`'), same('`Error: unknown option \'work\'`')], 1,
      L('40 is in range but not in the allowed list.', '40 está en el rango pero no en la lista permitida.', '40 está na faixa mas não na lista permitida.')),
    [pf(L('Repeating the same error-printing code in every check.', 'Repetir el mismo código de error en cada revisión.', 'Repetir o mesmo código de erro em cada checagem.'),
      L('Write one `fail(message)` method and call it everywhere.', 'Escribe un solo método `fail(message)` y llámalo en todos lados.', 'Escreva um único método `fail(message)` e chame em todo lugar.'))],
    [ex('p1w5-ex-5-1', 1, L('Predict the runs', 'Predice las ejecuciones', 'Preveja as execuções'),
      L('What do `java Pomodoro`, `java Pomodoro rounds=0`, and `java Pomodoro pause=10 rounds=3` print?', '¿Qué imprimen `java Pomodoro`, `java Pomodoro rounds=0` y `java Pomodoro pause=10 rounds=3`?', 'O que imprimem `java Pomodoro`, `java Pomodoro rounds=0` e `java Pomodoro pause=10 rounds=3`?'),
      L('Defaults are 25, 4, 5.', 'Los valores por defecto son 25, 4 y 5.', 'Os padrões são 25, 4 e 5.'),
      same('`4 rounds of 25 min, total 115 min`; `Error: rounds must be between 1 and 12` + usage; `3 rounds of 25 min, total 95 min`.')),
    ex('p1w5-ex-5-2', 2, L('A required option', 'Una opción obligatoria', 'Uma opção obrigatória'),
      L('Add a required option `name=…`. If it is missing, fail with `name is required`.', 'Agrega una opción obligatoria `name=…`. Si falta, falla con `name is required`.', 'Acrescente uma opção obrigatória `name=…`. Se faltar, falhe com `name is required`.'),
      L('Start it as `null` and check after the loop.', 'Empiézala en `null` y revísala después del ciclo.', 'Comece com `null` e confira depois do laço.'),
      same('`String name = null;` … `case "name" -> name = kv[1];` … `if (name == null) { fail("name is required"); }`'))]),

  lesson('p1w5-l6-modular', L('Modular design: from main to small methods', 'Diseño modular: de main a métodos pequeños', 'Projeto modular: do main a métodos pequenos'), 20,
    java(L('A dice race organised top-down; `Random` with a seed repeats the same race. Run: `java DiceRace 3 500`.', 'Una carrera de dados organizada de arriba abajo; `Random` con semilla repite la misma carrera. Ejecuta: `java DiceRace 3 500`.', 'Uma corrida de dados organizada de cima para baixo; `Random` com semente repete a mesma corrida. Rode: `java DiceRace 3 500`.'),
      `import java.util.Random;

public class DiceRace {
    public static void main(String[] args) {
        int rounds = args.length > 0 ? Integer.parseInt(args[0]) : 3;
        int delay = args.length > 1 ? Integer.parseInt(args[1]) : 0;
        Random dice = new Random(42);          // fixed seed: same race every run
        int[] score = new int[2];
        for (int round = 1; round <= rounds; round++) {
            playRound(dice, score);
            printBoard(round, score);
            pause(delay);
        }
        announce(score);
    }

    static void playRound(Random dice, int[] score) {
        score[0] += dice.nextInt(6) + 1;        // 1..6
        score[1] += dice.nextInt(6) + 1;
    }

    static void printBoard(int round, int[] score) {
        System.out.println("Round " + round + ": Lucia " + score[0] + " - Mateo " + score[1]);
    }

    static void pause(int ms) {
        try {
            Thread.sleep(ms);                    // wait between rounds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    static void announce(int[] score) {
        if (score[0] > score[1]) {
            System.out.println("Lucia wins");
        } else if (score[1] > score[0]) {
            System.out.println("Mateo wins");
        } else {
            System.out.println("Draw");
        }
    }
}`),
    [
      L('**Modular programming** splits a program into methods that each do one job. Design it **top-down**: write `main` as a list of calls (read input, set up, loop, report), then write each method, splitting again whenever a method grows beyond about 20 lines.',
        'La **programación modular** divide un programa en métodos que hacen una sola tarea cada uno. Diséñalo **de arriba abajo**: escribe `main` como una lista de llamadas (leer entrada, preparar, repetir, informar) y luego cada método, dividiendo otra vez cuando uno pase de unas 20 líneas.',
        'A **programação modular** divide um programa em métodos que fazem uma tarefa cada. Projete **de cima para baixo**: escreva o `main` como uma lista de chamadas (ler entrada, preparar, repetir, relatar) e depois cada método, dividindo de novo quando um passar de umas 20 linhas.'),
      L('Good methods have a clear name (a verb: `playRound`, `printBoard`), few parameters, and either compute a value or do one effect. Keeping calculation apart from printing makes the calculation easy to test.',
        'Los buenos métodos tienen un nombre claro (un verbo: `playRound`, `printBoard`), pocos parámetros y calculan un valor o producen un efecto. Separar el cálculo de la impresión hace que el cálculo sea fácil de probar.',
        'Bons métodos têm um nome claro (um verbo: `playRound`, `printBoard`), poucos parâmetros e calculam um valor ou fazem um efeito. Separar o cálculo da impressão deixa o cálculo fácil de testar.'),
      L('Two library tools appear in simulations. `new Random(seed)` gives pseudo-random numbers (`nextInt(6)` is 0–5); a fixed seed repeats the same sequence, which is perfect for testing. `Thread.sleep(ms)` pauses between steps so a person can watch, and must sit inside `try/catch`.',
        'Dos herramientas de la biblioteca aparecen en las simulaciones. `new Random(seed)` da números pseudoaleatorios (`nextInt(6)` va de 0 a 5); una semilla fija repite la misma secuencia, ideal para probar. `Thread.sleep(ms)` hace una pausa entre pasos para que una persona pueda mirar y debe ir dentro de `try/catch`.',
        'Duas ferramentas da biblioteca aparecem em simulações. `new Random(seed)` dá números pseudoaleatórios (`nextInt(6)` vai de 0 a 5); uma semente fixa repete a mesma sequência, ótimo para testar. `Thread.sleep(ms)` faz uma pausa entre passos para uma pessoa acompanhar e precisa ficar dentro de `try/catch`.'),
    ],
    L('A modular program is a restaurant kitchen: `main` is the head chef calling out orders, and each method is a station that does one dish well.',
      'Un programa modular es la cocina de un restaurante: `main` es el jefe que canta los pedidos y cada método es una estación que prepara bien un solo plato.',
      'Um programa modular é a cozinha de um restaurante: o `main` é o chef que chama os pedidos e cada método é uma estação que faz bem um único prato.'),
    [L('Top-down: `main` lists the steps; methods do them.', 'De arriba abajo: `main` enumera los pasos; los métodos los hacen.', 'De cima para baixo: o `main` lista os passos; os métodos os fazem.'),
      L('`Random(seed)` repeats results; `Thread.sleep` paces output.', '`Random(seed)` repite resultados; `Thread.sleep` marca el ritmo de la salida.', '`Random(seed)` repete resultados; `Thread.sleep` dá ritmo à saída.')],
    chk(L('Why use `new Random(42)` instead of `new Random()` while testing?', '¿Por qué usar `new Random(42)` en lugar de `new Random()` al probar?', 'Por que usar `new Random(42)` em vez de `new Random()` ao testar?'),
      [L('It is faster', 'Es más rápido', 'É mais rápido'), L('Every run gives the same numbers, so results can be checked', 'Cada ejecución da los mismos números, así que se pueden comprobar los resultados', 'Cada execução dá os mesmos números, então dá para conferir os resultados'), L('It gives numbers up to 42', 'Da números hasta 42', 'Dá números até 42')], 1,
      L('A seed fixes the sequence: same input, same output.', 'Una semilla fija la secuencia: misma entrada, misma salida.', 'Uma semente fixa a sequência: mesma entrada, mesma saída.')),
    [pf(L('One huge `main` with everything inside.', 'Un `main` enorme con todo adentro.', 'Um `main` enorme com tudo dentro.'),
      L('If you need a comment to explain a block, make it a method with that name.', 'Si necesitas un comentario para explicar un bloque, conviértelo en un método con ese nombre.', 'Se precisa de um comentário para explicar um bloco, transforme-o num método com esse nome.'))],
    [ex('p1w5-ex-6-1', 1, L('Name the methods', 'Nombra los métodos', 'Nomeie os métodos'),
      L('A program reads a list of exam grades from `args`, computes the average and the highest, and prints a report. Write the `main` as calls only.', 'Un programa lee una lista de notas desde `args`, calcula el promedio y la más alta e imprime un informe. Escribe el `main` solo con llamadas.', 'Um programa lê uma lista de notas de `args`, calcula a média e a maior e imprime um relatório. Escreva o `main` só com chamadas.'),
      L('One verb per step.', 'Un verbo por paso.', 'Um verbo por passo.'),
      same('`int[] g = parseGrades(args); double avg = average(g); int best = maxOf(g); printReport(g, avg, best);`')),
    ex('p1w5-ex-6-2', 2, L('Trace the race', 'Recorre la carrera', 'Percorra a corrida'),
      L('With seed 42 the six dice are 3, 4, 1, 3, 1, 2. What does `java DiceRace 3` print?', 'Con la semilla 42 los seis dados son 3, 4, 1, 3, 1, 2. ¿Qué imprime `java DiceRace 3`?', 'Com a semente 42 os seis dados são 3, 4, 1, 3, 1, 2. O que `java DiceRace 3` imprime?'),
      L('Lucía rolls first in each round.', 'Lucía tira primero en cada ronda.', 'Lucía joga primeiro em cada rodada.'),
      same('`Round 1: Lucia 3 - Mateo 4`, `Round 2: Lucia 4 - Mateo 7`, `Round 3: Lucia 5 - Mateo 9`, `Mateo wins`.'))]),
];

const questions: Question[] = [
  mc('p1w5-q1', 'code', 'p1w5-l1-methods', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('7'), same('10'), same('12')], 2,
    L('`area(3, 4)` returns 12.', '`area(3, 4)` devuelve 12.', '`area(3, 4)` devolve 12.'), 'static int area(int w, int h) {\n    return w * h;\n}\npublic static void main(String[] args) {\n    System.out.println(area(3, 4));\n}'),
  fill('p1w5-q2', 'fill-blank', 'p1w5-l1-methods', L('A method that returns nothing has the return type ____.', 'Un método que no devuelve nada tiene el tipo de retorno ____.', 'Um método que não devolve nada tem o tipo de retorno ____.'), ['void'],
    L('`void` methods are used for their effect, such as printing.', 'Los métodos `void` se usan por su efecto, como imprimir.', 'Métodos `void` são usados pelo efeito, como imprimir.')),
  mc('p1w5-q3', 'code', 'p1w5-l2-passing', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('1 99'), same('99 99'), same('1 1')], 0,
    L('The `int` copy changes alone; the array is shared.', 'La copia del `int` cambia sola; el arreglo se comparte.', 'A cópia do `int` muda sozinha; o array é compartilhado.'),
    'static void change(int x, int[] a) {\n    x = 99;\n    a[0] = 99;\n}\npublic static void main(String[] args) {\n    int n = 1;\n    int[] v = {1};\n    change(n, v);\n    System.out.println(n + " " + v[0]);\n}'),
  tf('p1w5-q4', 'p1w5-l2-passing', L('Two methods may share a name if their parameter types differ.', 'Dos métodos pueden compartir nombre si sus tipos de parámetros son distintos.', 'Dois métodos podem ter o mesmo nome se os tipos de parâmetros forem diferentes.'), true,
    L('That is overloading.', 'Eso es sobrecarga.', 'Isso é sobrecarga.')),
  mc('p1w5-q5', 'code', 'p1w5-l3-scope', L('What does `f(3)` return?', '¿Qué devuelve `f(3)`?', 'O que `f(3)` devolve?'), [same('3'), same('6'), same('9')], 1,
    L('f(3) = 3 + f(2) = 3 + 2 + f(1) = 3 + 2 + 1 = 6.', 'f(3) = 3 + f(2) = 3 + 2 + f(1) = 3 + 2 + 1 = 6.', 'f(3) = 3 + f(2) = 3 + 2 + f(1) = 3 + 2 + 1 = 6.'), 'static int f(int n) {\n    if (n == 1) {\n        return 1;\n    }\n    return n + f(n - 1);\n}'),
  mc('p1w5-q6', 'troubleshooting', 'p1w5-l3-scope', L('A recursive method throws `StackOverflowError`. The most likely cause?', 'Un método recursivo lanza `StackOverflowError`. ¿La causa más probable?', 'Um método recursivo lança `StackOverflowError`. A causa mais provável?'),
    [L('A missing or unreachable base case', 'Un caso base faltante o inalcanzable', 'Um caso base ausente ou inalcançável'), L('Too many parameters', 'Demasiados parámetros', 'Parâmetros demais'), L('A `void` return type', 'Un tipo de retorno `void`', 'Um tipo de retorno `void`')], 0,
    L('Calls never stop, so frames fill the stack.', 'Las llamadas nunca paran y los marcos llenan la pila.', 'As chamadas nunca param e os quadros enchem a pilha.')),
  mc('p1w5-q7', 'code', 'p1w5-l4-strings', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('false true'), same('true true'), same('true false')], 0,
    L('`toUpperCase` returned a new string that was ignored, so `s` is still `"hola"`.', '`toUpperCase` devolvió un string nuevo que se ignoró, así que `s` sigue siendo `"hola"`.', '`toUpperCase` devolveu uma string nova que foi ignorada, então `s` continua `"hola"`.'),
    'String s = "hola";\ns.toUpperCase();\nSystem.out.println(s.equals("HOLA") + " " + s.equals("hola"));'),
  mc('p1w5-q8', 'scenario', 'p1w5-l5-options', L('`java Pomodoro rounds=three` should fail. Which message is best?', '`java Pomodoro rounds=three` debe fallar. ¿Qué mensaje es el mejor?', '`java Pomodoro rounds=three` deve falhar. Qual mensagem é a melhor?'),
    [same('`Exception in thread "main" java.lang.NumberFormatException`'), same("`Error: rounds must be a whole number, got 'three'` + usage line"), same('`Error`')], 1,
    L('Name the option, show the bad value, and show how to run it.', 'Nombra la opción, muestra el valor incorrecto y explica cómo ejecutarlo.', 'Nomeie a opção, mostre o valor errado e explique como rodar.')),
  match('p1w5-q9', 'p1w5-l5-options', L('Match each Javadoc tag with its meaning.', 'Relaciona cada etiqueta Javadoc con su significado.', 'Ligue cada marcador Javadoc ao seu significado.'),
    [same('@param'), same('@return'), same('/** … */')], [L('A documentation comment', 'Un comentario de documentación', 'Um comentário de documentação'), L('Describes one parameter', 'Describe un parámetro', 'Descreve um parâmetro'), L('Describes the value returned', 'Describe el valor devuelto', 'Descreve o valor devolvido')], [1, 2, 0],
    L('The `javadoc` tool turns these into web pages.', 'La herramienta `javadoc` los convierte en páginas web.', 'A ferramenta `javadoc` os transforma em páginas web.')),
];

const activities: Activity[] = [
  { id: 'p1w5-act-signature', kind: 'scramble', lessonId: 'p1w5-l1-methods', title: L('Build a signature', 'Arma una firma', 'Monte uma assinatura'),
    prompt: L('A method that returns the larger of two `int` values.', 'Un método que devuelve el mayor de dos `int`.', 'Um método que devolve o maior de dois `int`.'),
    tokens: ['static', 'int', 'larger', '(int a,', 'int b)'], explanation: L('Modifier, return type, name, parameters.', 'Modificador, tipo de retorno, nombre, parámetros.', 'Modificador, tipo de retorno, nome, parâmetros.') },
  { id: 'p1w5-act-fill', kind: 'code-fill', lessonId: 'p1w5-l3-scope', title: L('Complete the recursion', 'Completa la recursión', 'Complete a recursão'),
    prompt: L('`power(2, 5)` returns 32.', '`power(2, 5)` devuelve 32.', '`power(2, 5)` devolve 32.'),
    template: 'static int power(int base, int exp) {\n    if (exp == {0}) {\n        return 1;\n    }\n    return base * {1}(base, exp - 1);\n}',
    blanks: ['0', 'power'], explanation: L('Base case at exponent 0; each call lowers the exponent.', 'Caso base con exponente 0; cada llamada baja el exponente.', 'Caso base com expoente 0; cada chamada diminui o expoente.') },
  { id: 'p1w5-act-classify', kind: 'classify', lessonId: 'p1w5-l2-passing', title: L('Can the method change it?', '¿El método puede cambiarlo?', 'O método pode mudar isso?'),
    prompt: L('Can a method change what the caller sees?', '¿Un método puede cambiar lo que ve quien llama?', 'Um método pode mudar o que quem chamou vê?'),
    buckets: [L('Yes', 'Sí', 'Sim'), L('No', 'No', 'Não')],
    items: [
      { text: L('The elements of an `int[]` argument', 'Los elementos de un argumento `int[]`', 'Os elementos de um argumento `int[]`'), bucket: 0 },
      { text: L('An `int` argument', 'Un argumento `int`', 'Um argumento `int`'), bucket: 1 },
      { text: L('A `String` argument (it is immutable)', 'Un argumento `String` (es inmutable)', 'Um argumento `String` (é imutável)'), bucket: 1 },
      { text: L('The cells of an `int[][]` grid', 'Las celdas de una cuadrícula `int[][]`', 'As células de uma grade `int[][]`'), bucket: 0 },
    ],
    explanation: L('Only objects that can change, reached by reference, show the change.', 'Solo los objetos modificables, alcanzados por referencia, muestran el cambio.', 'Só objetos mutáveis, alcançados por referência, mostram a mudança.') },
  { id: 'p1w5-act-order', kind: 'order', lessonId: 'p1w5-l6-modular', title: L('Top-down main', 'main de arriba abajo', 'main de cima para baixo'),
    prompt: L('Order the calls of a simulation’s `main`.', 'Ordena las llamadas del `main` de una simulación.', 'Ordene as chamadas do `main` de uma simulação.'),
    items: [same('parseOptions(args)'), same('buildGrid(options)'), same('printGrid(grid)'), same('for each step: grid = nextGeneration(grid)'), same('printSummary(grid)')],
    explanation: L('Read input, set up, show, loop, report.', 'Leer entrada, preparar, mostrar, repetir, informar.', 'Ler entrada, preparar, mostrar, repetir, relatar.') },
];

const labs: Lab[] = [
  { id: 'p1w5-lab1-toolkit', level: 2, minutes: 45, title: L('A toolkit of tested methods', 'Una caja de herramientas de métodos probados', 'Uma caixa de ferramentas de métodos testados'),
    goal: L('Write small methods and check each one with a `check` helper.', 'Escribir métodos pequeños y comprobar cada uno con un ayudante `check`.', 'Escrever métodos pequenos e conferir cada um com um ajudante `check`.'),
    steps: [
      { id: 'p1w5-lab1-s1', title: L('Create and run Toolkit.java', 'Crea y ejecuta Toolkit.java', 'Crie e rode Toolkit.java'), commands: ['mkdir -p ~/prog1/week5 && cd ~/prog1/week5', ...heredoc('Toolkit.java', TOOLKIT), 'javac Toolkit.java', 'java Toolkit'],
        expected: L('Five lines starting with `ok`.', 'Cinco líneas que empiezan con `ok`.', 'Cinco linhas começando com `ok`.') },
      { id: 'p1w5-lab1-s2', title: L('Break a method', 'Rompe un método', 'Quebre um método'), commands: ['# in maxOf, change v > best to v < best', 'javac Toolkit.java && java Toolkit'],
        expected: L('`FAIL max of {3, 9, 2}` while the rest stay `ok`. Restore the line.', '`FAIL max of {3, 9, 2}` y el resto sigue en `ok`. Restaura la línea.', '`FAIL max of {3, 9, 2}` e o resto continua `ok`. Restaure a linha.') },
      { id: 'p1w5-lab1-s3', title: L('Add your own', 'Agrega los tuyos', 'Acrescente os seus'), commands: ['# add isPalindrome(String) and digitSum(int) with two checks each', 'javac Toolkit.java && java Toolkit'],
        expected: L('Nine `ok` lines, for example `isPalindrome("Reconocer")` and `digitSum(4096) == 19`.', 'Nueve líneas `ok`, por ejemplo `isPalindrome("Reconocer")` y `digitSum(4096) == 19`.', 'Nove linhas `ok`, por exemplo `isPalindrome("Reconocer")` e `digitSum(4096) == 19`.') },
    ] },
  { id: 'p1w5-lab2-options', level: 3, minutes: 50, title: L('A command-line tool with named options', 'Una herramienta de línea de comandos con opciones con nombre', 'Uma ferramenta de linha de comando com opções nomeadas'),
    goal: L('Parse `key=value` options with defaults, ranges, and allowed lists, and generate Javadoc.', 'Analizar opciones `clave=valor` con valores por defecto, rangos y listas permitidas, y generar Javadoc.', 'Analisar opções `chave=valor` com padrões, faixas e listas permitidas, e gerar Javadoc.'),
    steps: [
      { id: 'p1w5-lab2-s1', title: L('Create and compile Pomodoro.java', 'Crea y compila Pomodoro.java', 'Crie e compile Pomodoro.java'), commands: [...heredoc('Pomodoro.java', POMODORO), 'javac Pomodoro.java'],
        expected: L('No messages.', 'Sin mensajes.', 'Sem mensagens.') },
      { id: 'p1w5-lab2-s2', title: L('Valid runs', 'Ejecuciones válidas', 'Execuções válidas'), commands: ['java Pomodoro', 'java Pomodoro rounds=2 work=50', 'java Pomodoro pause=0 work=15 rounds=12'],
        expected: same('`4 rounds of 25 min, total 115 min`; `2 rounds of 50 min, total 105 min`; `12 rounds of 15 min, total 180 min`.') },
      { id: 'p1w5-lab2-s3', title: L('Invalid runs', 'Ejecuciones inválidas', 'Execuções inválidas'), commands: ['java Pomodoro work=40', 'java Pomodoro rounds=x', 'java Pomodoro colour=red', 'java Pomodoro rounds'],
        expected: L('Each prints one `Error:` line naming the problem, then the usage line: allowed list, whole number, unknown option, `expected key=value`.', 'Cada una imprime una línea `Error:` que nombra el problema y luego la línea de uso: lista permitida, número entero, opción desconocida, `expected key=value`.', 'Cada uma imprime uma linha `Error:` que nomeia o problema e depois a linha de uso: lista permitida, número inteiro, opção desconhecida, `expected key=value`.') },
      { id: 'p1w5-lab2-s4', title: L('Add a live countdown', 'Agrega una cuenta regresiva en vivo', 'Acrescente uma contagem regressiva ao vivo'), commands: ['# add option demo=ms: for each round print "Round i" and call Thread.sleep(ms)', 'java Pomodoro rounds=3 demo=500'],
        expected: L('`Round 1`, `Round 2`, `Round 3` appear half a second apart, then the summary.', '`Round 1`, `Round 2` y `Round 3` aparecen con medio segundo de diferencia y luego el resumen.', '`Round 1`, `Round 2` e `Round 3` aparecem com meio segundo de intervalo e depois o resumo.') },
      { id: 'p1w5-lab2-s5', title: L('Generate the documentation', 'Genera la documentación', 'Gere a documentação'), commands: ['javadoc -private -d docs Pomodoro.java', 'ls docs'],
        expected: L('`docs` contains `index.html`; open it and find `parseIn` with its parameters and return value.', '`docs` contiene `index.html`; ábrelo y busca `parseIn` con sus parámetros y su valor de retorno.', '`docs` contém `index.html`; abra e procure `parseIn` com os parâmetros e o valor de retorno.') },
    ] },
];

const resources: ExternalResource[] = [
  { id: 'p1w5-r1', title: 'Oracle Java Tutorials: Defining Methods', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Signatures, overloading, and parameters.', 'Firmas, sobrecarga y parámetros.', 'Assinaturas, sobrecarga e parâmetros.') },
  { id: 'p1w5-r2', title: 'Oracle Java Tutorials: Strings', url: 'https://docs.oracle.com/javase/tutorial/java/data/strings.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('String methods and StringBuilder.', 'Métodos de String y StringBuilder.', 'Métodos de String e StringBuilder.') },
  { id: 'p1w5-r3', title: 'W3Schools: Java Recursion', url: 'https://www.w3schools.com/java/java_recursion.asp', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short recursion examples.', 'Ejemplos cortos de recursión.', 'Exemplos curtos de recursão.') },
  { id: 'p1w5-r4', title: 'Oracle: The javadoc command', url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/javadoc.html', kind: 'article', verifiedOn: '2026-11-04', note: L('Options and tags of the documentation tool.', 'Opciones y etiquetas de la herramienta de documentación.', 'Opções e marcadores da ferramenta de documentação.') },
];

/** Programming 1, Week 5: methods and modular programming. */
export const prog1Week5: WeekContent = {
  id: 'y1-t1-m1-prog-w5', year: 1, term: 1, module: 1, week: 5, subject: 'programming-1',
  title: L('Methods and modular programming', 'Métodos y programación modular', 'Métodos e programação modular'),
  intro: L('This week you stop writing everything in `main`. You define methods with parameters and return values, learn how Java passes values and arrays, where variables live (scope, stack, heap), and how recursion works. You use String and wrapper methods, build a real command-line option parser out of small methods, and design whole programs top-down.',
    'Esta semana dejas de escribir todo en `main`. Defines métodos con parámetros y valores de retorno, aprendes cómo Java pasa valores y arreglos, dónde viven las variables (ámbito, pila, heap) y cómo funciona la recursión. Usas métodos de String y de las clases envoltorio, construyes un verdadero analizador de opciones de línea de comandos con métodos pequeños y diseñas programas completos de arriba abajo.',
    'Nesta semana você para de escrever tudo no `main`. Define métodos com parâmetros e valores de retorno, aprende como o Java passa valores e arrays, onde as variáveis vivem (escopo, pilha, heap) e como a recursão funciona. Usa métodos de String e das classes empacotadoras, constrói um analisador de opções de linha de comando de verdade com métodos pequenos e projeta programas inteiros de cima para baixo.'),
  objectives: [
    L('Write methods with clear signatures, parameters, and return values.', 'Escribir métodos con firmas, parámetros y valores de retorno claros.', 'Escrever métodos com assinaturas, parâmetros e retornos claros.'),
    L('Explain pass-by-value for primitives and arrays, scope, and the stack.', 'Explicar el paso por valor con primitivos y arreglos, el ámbito y la pila.', 'Explicar a passagem por valor com primitivos e arrays, o escopo e a pilha.'),
    L('Write simple recursive methods with a base case.', 'Escribir métodos recursivos sencillos con caso base.', 'Escrever métodos recursivos simples com caso base.'),
    L('Parse and validate `key=value` options with methods and document them with Javadoc.', 'Analizar y validar opciones `clave=valor` con métodos y documentarlas con Javadoc.', 'Analisar e validar opções `chave=valor` com métodos e documentá-las com Javadoc.'),
    L('Design a program top-down as a set of small methods.', 'Diseñar un programa de arriba abajo como un conjunto de métodos pequeños.', 'Projetar um programa de cima para baixo como um conjunto de métodos pequenos.'),
  ],
  prerequisites: [L('Weeks 3–4: validation, loops, and arrays.', 'Semanas 3–4: validación, ciclos y arreglos.', 'Semanas 3–4: validação, laços e arrays.')],
  keyConcepts: [L('Method signature', 'Firma de un método', 'Assinatura de método'), L('Pass-by-value', 'Paso por valor', 'Passagem por valor'), L('Scope', 'Ámbito', 'Escopo'), L('Recursion', 'Recursión', 'Recursão'), L('Immutable String', 'String inmutable', 'String imutável'), L('Option parsing', 'Análisis de opciones', 'Análise de opções'), same('Javadoc'), L('Top-down design', 'Diseño de arriba abajo', 'Projeto de cima para baixo')],
  estimatedMinutes: 360,
  sequence: [L('Lessons 1–3, then Lab 1.', 'Lecciones 1–3 y luego el Laboratorio 1.', 'Lições 1–3 e depois o Laboratório 1.'), L('Lessons 4–5, then Lab 2.', 'Lecciones 4–5 y luego el Laboratorio 2.', 'Lições 4–5 e depois o Laboratório 2.'), L('Lesson 6 and the quiz.', 'Lección 6 y el cuestionario.', 'Lição 6 e o questionário.')],
  outcomes: [L('Your `main` reads like a summary.', 'Tu `main` se lee como un resumen.', 'Seu `main` se lê como um resumo.'), L('You can build a polished command-line interface.', 'Puedes construir una interfaz de línea de comandos cuidada.', 'Você consegue construir uma interface de linha de comando caprichada.')],
  checklist: [L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'), L('Finish both labs, including Javadoc', 'Terminar los dos laboratorios, incluido Javadoc', 'Terminar os dois laboratórios, incluindo o Javadoc'), L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário')],
  commonMistakes: [
    { mistake: L('Expecting a method to change an `int` argument.', 'Esperar que un método cambie un argumento `int`.', 'Esperar que um método mude um argumento `int`.'), fix: L('Return the new value and assign it.', 'Devuelve el valor nuevo y asígnalo.', 'Devolva o valor novo e atribua.') },
    { mistake: L('Comparing Strings with `==`.', 'Comparar Strings con `==`.', 'Comparar Strings com `==`.'), fix: L('Use `equals`.', 'Usa `equals`.', 'Use `equals`.') },
  ],
  lessons,
  flashcards: [
    fc('p1w5-fc-1', 'p1w5-l1-methods', 'concept', L('Method signature', 'Firma de un método', 'Assinatura de método'), L('Return type, name, and parameter list.', 'Tipo de retorno, nombre y lista de parámetros.', 'Tipo de retorno, nome e lista de parâmetros.')),
    fc('p1w5-fc-2', 'p1w5-l1-methods', 'distinction', L('Parameter vs argument', 'Parámetro vs argumento', 'Parâmetro vs argumento'), L('A parameter is the variable in the signature; an argument is the value passed in the call.', 'El parámetro es la variable de la firma; el argumento es el valor que se pasa en la llamada.', 'O parâmetro é a variável da assinatura; o argumento é o valor passado na chamada.')),
    fc('p1w5-fc-3', 'p1w5-l2-passing', 'concept', L('Pass-by-value', 'Paso por valor', 'Passagem por valor'), L('The method gets a copy; for arrays, a copy of the reference.', 'El método recibe una copia; en los arreglos, una copia de la referencia.', 'O método recebe uma cópia; nos arrays, uma cópia da referência.')),
    fc('p1w5-fc-4', 'p1w5-l2-passing', 'concept', L('Overloading', 'Sobrecarga', 'Sobrecarga'), L('Same method name, different parameter types or count.', 'Mismo nombre de método, distintos tipos o cantidad de parámetros.', 'Mesmo nome de método, tipos ou quantidade de parâmetros diferentes.')),
    fc('p1w5-fc-5', 'p1w5-l3-scope', 'concept', L('Scope', 'Ámbito', 'Escopo'), L('From the declaration to the end of the enclosing block.', 'Desde la declaración hasta el fin del bloque que la contiene.', 'Da declaração até o fim do bloco que a contém.')),
    fc('p1w5-fc-6', 'p1w5-l3-scope', 'concept', L('Base case', 'Caso base', 'Caso base'), L('The condition where a recursive method stops calling itself.', 'La condición en que un método recursivo deja de llamarse.', 'A condição em que um método recursivo para de chamar a si mesmo.')),
    fc('p1w5-fc-7', 'p1w5-l4-strings', 'concept', L('Immutable String', 'String inmutable', 'String imutável'), L('String methods return new strings; the original never changes.', 'Los métodos de String devuelven strings nuevos; el original nunca cambia.', 'Os métodos de String devolvem strings novas; a original nunca muda.')),
    fc('p1w5-fc-8', 'p1w5-l4-strings', 'command', same('s.substring(a, b)'), L('Characters from `a` up to, but not including, `b`.', 'Los caracteres desde `a` hasta `b`, sin incluirlo.', 'Os caracteres de `a` até `b`, sem incluí-lo.')),
    fc('p1w5-fc-9', 'p1w5-l5-options', 'concept', L('Option parser', 'Analizador de opciones', 'Analisador de opções'), L('Loop over `args`, split `key=value`, switch on the key, apply defaults, validate, fail clearly.', 'Recorrer `args`, dividir `clave=valor`, hacer switch sobre la clave, aplicar valores por defecto, validar y fallar con claridad.', 'Percorrer `args`, dividir `chave=valor`, fazer switch na chave, aplicar padrões, validar e falhar com clareza.')),
    fc('p1w5-fc-10', 'p1w5-l5-options', 'command', same('/** @param … @return … */'), L('Javadoc: documents a method for editors and the `javadoc` tool.', 'Javadoc: documenta un método para los editores y la herramienta `javadoc`.', 'Javadoc: documenta um método para os editores e a ferramenta `javadoc`.')),
    fc('p1w5-fc-11', 'p1w5-l6-modular', 'command', same('new Random(42).nextInt(6)'), L('A repeatable pseudo-random number from 0 to 5.', 'Un número pseudoaleatorio repetible de 0 a 5.', 'Um número pseudoaleatório repetível de 0 a 5.')),
    fc('p1w5-fc-12', 'p1w5-l6-modular', 'command', same('Thread.sleep(ms)'), L('Pauses the program; must be inside `try/catch (InterruptedException e)`.', 'Pausa el programa; debe ir dentro de `try/catch (InterruptedException e)`.', 'Pausa o programa; precisa ficar dentro de `try/catch (InterruptedException e)`.')),
  ],
  questions, activities, labs,
  plan: [
    day(1, 40, 'read', L('Lessons 1–2: methods and passing values.', 'Lecciones 1–2: métodos y paso de valores.', 'Lições 1–2: métodos e passagem de valores.')),
    day(2, 40, 'read', L('Lesson 3: scope and recursion.', 'Lección 3: ámbito y recursión.', 'Lição 3: escopo e recursão.')),
    day(3, 45, 'practice', L('Lab 1: the toolkit.', 'Laboratorio 1: la caja de herramientas.', 'Laboratório 1: a caixa de ferramentas.')),
    day(4, 45, 'read', L('Lessons 4–5: strings and option parsing.', 'Lecciones 4–5: strings y análisis de opciones.', 'Lições 4–5: strings e análise de opções.')),
    day(5, 50, 'practice', L('Lab 2 and Lesson 6.', 'Laboratorio 2 y Lección 6.', 'Laboratório 2 e Lição 6.')),
    day(6, 30, 'quiz', L('Flashcards and quiz.', 'Tarjetas y cuestionario.', 'Cartões e questionário.')),
  ],
  resources, stories: [], tools: [], videos: [], documents: [],
};
