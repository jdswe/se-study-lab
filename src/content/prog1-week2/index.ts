import type { Activity, ExternalResource, Lab, Lesson, Question } from '../types';
import type { WeekContent } from '../weekContent';
import { L, chk, day, ex, fc, fill, heredoc, java, lesson, match, mc, pf, same, text, tf } from '../prog1-week1/h';

const CHEER = `/** Repeats a cheer. Run: java Cheer Sofia 3 */
public class Cheer {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java Cheer <name> <times>");
            return;
        }
        String name = args[0];
        int times = Integer.parseInt(args[1]);
        for (int i = 1; i <= times; i++) {
            System.out.println(i + ". Go, " + name + "!");
        }
    }
}`;

const CONVERTER = `public class Converter {
    public static void main(String[] args) {
        final double KM_PER_MILE = 1.609344;
        if (args.length != 2) {
            System.out.println("Usage: java Converter <km> <celsius>");
            return;
        }
        double km = Double.parseDouble(args[0]);
        double celsius = Double.parseDouble(args[1]);
        double miles = km / KM_PER_MILE;
        double fahrenheit = celsius * 9 / 5 + 32;
        System.out.println(km + " km = " + Math.round(miles * 100) / 100.0 + " miles");
        System.out.println(celsius + " C = " + fahrenheit + " F");
    }
}`;

const lessons: Lesson[] = [
  lesson('p1w2-l1-platform', L('The Java platform: JDK, JRE, JVM', 'La plataforma Java: JDK, JRE y JVM', 'A plataforma Java: JDK, JRE e JVM'), 15,
    text(L('What each piece contains.', 'Qué contiene cada pieza.', 'O que cada peça contém.'),
      `JDK  (to develop)  = JRE + javac, jshell, javadoc, jar, debugger
JRE  (to run)      = JVM + class library (String, Math, Scanner...)
JVM  (the engine)  = loads .class files, verifies, interprets + JIT,
                     manages stack and heap, runs the garbage collector`),
    [
      L('Java appeared in the mid-1990s with one promise: write a program once and run it anywhere. It is high-level, imperative, object-oriented, and comes with a huge standard library. You will use **Java SE**, the general-purpose edition.',
        'Java nació a mediados de los noventa con una promesa: escribir un programa una vez y ejecutarlo en cualquier lugar. Es de alto nivel, imperativo, orientado a objetos y trae una biblioteca estándar enorme. Usarás **Java SE**, la edición de propósito general.',
        'Java surgiu em meados dos anos 1990 com uma promessa: escrever um programa uma vez e rodá-lo em qualquer lugar. É de alto nível, imperativo, orientado a objetos e vem com uma biblioteca padrão enorme. Você vai usar o **Java SE**, a edição de uso geral.'),
      L('The **JVM** runs bytecode. The **JRE** adds the class library: enough to run programs. The **JDK** adds the developer tools, such as `javac` and `jshell`. To write programs you install a JDK, for example Temurin or Oracle OpenJDK.',
        'La **JVM** ejecuta bytecode. El **JRE** agrega la biblioteca de clases: lo justo para ejecutar programas. El **JDK** suma las herramientas de desarrollo, como `javac` y `jshell`. Para programar instalas un JDK, por ejemplo Temurin u Oracle OpenJDK.',
        'A **JVM** executa bytecode. O **JRE** acrescenta a biblioteca de classes: o suficiente para rodar programas. O **JDK** soma as ferramentas de desenvolvimento, como `javac` e `jshell`. Para programar você instala um JDK, por exemplo Temurin ou Oracle OpenJDK.'),
      L('The JVM also manages memory. Local variables live on the **stack** while their method runs; objects live on the **heap**. When nothing refers to an object any more, the **garbage collector** frees it, so you never free memory by hand.',
        'La JVM también administra la memoria. Las variables locales viven en la **pila** (stack) mientras corre su método; los objetos viven en el **montón** (heap). Cuando nada apunta ya a un objeto, el **recolector de basura** lo libera, así que nunca liberas memoria a mano.',
        'A JVM também cuida da memória. Variáveis locais vivem na **pilha** (stack) enquanto o método roda; objetos vivem no **heap**. Quando nada mais aponta para um objeto, o **coletor de lixo** o libera, então você nunca libera memória à mão.'),
    ],
    L('The JVM is a games console, bytecode is the game disc, the JRE is the console with its cables, and the JDK is the studio kit for making new games.',
      'La JVM es una consola de videojuegos, el bytecode es el disco del juego, el JRE es la consola con sus cables y el JDK es el kit de estudio para crear juegos nuevos.',
      'A JVM é um console de videogame, o bytecode é o disco do jogo, o JRE é o console com os cabos e o JDK é o kit de estúdio para criar jogos novos.'),
    [L('JDK ⊃ JRE ⊃ JVM; developers install the JDK.', 'JDK ⊃ JRE ⊃ JVM; quien programa instala el JDK.', 'JDK ⊃ JRE ⊃ JVM; quem programa instala o JDK.'),
      L('The garbage collector frees objects nobody refers to.', 'El recolector de basura libera los objetos a los que nadie apunta.', 'O coletor de lixo libera objetos para os quais ninguém aponta.')],
    chk(L('A friend only needs to run your finished `.class` files. What is the minimum?', 'Una amiga solo necesita ejecutar tus `.class` terminados. ¿Qué es lo mínimo?', 'Uma amiga só precisa rodar seus `.class` prontos. Qual é o mínimo?'),
      [same('JDK'), L('A runtime (JRE)', 'Un entorno de ejecución (JRE)', 'Um ambiente de execução (JRE)'), same('javac')], 1,
      L('Running needs the JVM and the library: the JRE. A JDK also works because it contains one.', 'Ejecutar requiere la JVM y la biblioteca: el JRE. Un JDK también sirve porque lo contiene.', 'Rodar exige a JVM e a biblioteca: o JRE. Um JDK também serve porque o contém.')),
    [pf(L('`javac` is “not found” after installing Java.', '`javac` “no se encuentra” después de instalar Java.', '`javac` “não encontrado” depois de instalar o Java.'),
      L('You installed only a runtime; install a JDK and check `javac -version`.', 'Instalaste solo un entorno de ejecución; instala un JDK y revisa `javac -version`.', 'Você instalou só um ambiente de execução; instale um JDK e confira `javac -version`.'))],
    [ex('p1w2-ex-1-1', 1, L('Which piece?', '¿Qué pieza?', 'Qual peça?'),
      L('Which piece do you need to (a) compile, (b) run a `.class`, (c) free unused objects?', '¿Qué pieza necesitas para (a) compilar, (b) ejecutar un `.class`, (c) liberar objetos sin uso?', 'Que peça você precisa para (a) compilar, (b) rodar um `.class`, (c) liberar objetos sem uso?'),
      L('Compiling is a developer tool.', 'Compilar es una herramienta de desarrollo.', 'Compilar é uma ferramenta de desenvolvimento.'),
      L('(a) JDK; (b) JRE or JDK; (c) the JVM garbage collector.', '(a) JDK; (b) JRE o JDK; (c) el recolector de basura de la JVM.', '(a) JDK; (b) JRE ou JDK; (c) o coletor de lixo da JVM.')),
    ex('p1w2-ex-1-2', 2, L('Try jshell', 'Prueba jshell', 'Experimente o jshell'),
      L('Type `jshell`, then `7 / 2` and `7 / 2.0`. Why do the results differ?', 'Escribe `jshell` y luego `7 / 2` y `7 / 2.0`. ¿Por qué difieren los resultados?', 'Digite `jshell` e depois `7 / 2` e `7 / 2.0`. Por que os resultados são diferentes?'),
      L('One division uses only whole numbers.', 'Una de las divisiones usa solo enteros.', 'Uma das divisões usa só inteiros.'),
      L('3 and 3.5: two `int` values give integer division; one `double` gives a decimal result. Leave with `/exit`.', '3 y 3,5: dos `int` dan división entera; un `double` da un resultado decimal. Sal con `/exit`.', '3 e 3,5: dois `int` dão divisão inteira; um `double` dá resultado decimal. Saia com `/exit`.'))]),

  lesson('p1w2-l2-anatomy', L('Anatomy of a Java program', 'Anatomía de un programa Java', 'Anatomia de um programa Java'), 15,
    java(L('Every part of a small program, labelled.', 'Cada parte de un programa pequeño, señalada.', 'Cada parte de um programa pequeno, indicada.'),
      `/** Documentation comment: what the class does. */
public class StepGoal {                         // class name = file name
    public static void main(String[] args) {    // execution starts here
        final int DAILY_GOAL = 8000;            // constant: UPPER_SNAKE_CASE
        int stepsToday = 6500;                  // variable: camelCase
        int missing = DAILY_GOAL - stepsToday;  // statement ends with ;
        System.out.println("Steps missing: " + missing);
    }                                           // braces close blocks
}`),
    [
      L('Every Java program lives in a **class**. The file `StepGoal.java` holds `public class StepGoal`, and the names must match exactly, capitals included. Execution starts in `public static void main(String[] args)`.',
        'Todo programa Java vive en una **clase**. El archivo `StepGoal.java` contiene `public class StepGoal`, y los nombres deben coincidir exactamente, incluidas las mayúsculas. La ejecución empieza en `public static void main(String[] args)`.',
        'Todo programa Java vive numa **classe**. O arquivo `StepGoal.java` contém `public class StepGoal`, e os nomes devem ser idênticos, inclusive maiúsculas. A execução começa em `public static void main(String[] args)`.'),
      L('Braces `{ }` mark blocks and each statement ends with `;`. Comments are ignored by the compiler: `//` to the end of the line, `/* … */` over several lines, and `/** … */` for documentation that `javadoc` turns into web pages.',
        'Las llaves `{ }` marcan bloques y cada sentencia termina en `;`. El compilador ignora los comentarios: `//` hasta el final de la línea, `/* … */` en varias líneas y `/** … */` para la documentación que `javadoc` convierte en páginas web.',
        'Chaves `{ }` marcam blocos e cada instrução termina com `;`. O compilador ignora comentários: `//` até o fim da linha, `/* … */` em várias linhas e `/** … */` para a documentação que o `javadoc` transforma em páginas web.'),
      L('Words like `public`, `class`, `int`, and `if` are **keywords**: reserved and always lower case. Java is case-sensitive. The conventions: classes in PascalCase (`StepGoal`), variables and methods in camelCase (`stepsToday`), constants in UPPER_SNAKE_CASE (`DAILY_GOAL`).',
        'Palabras como `public`, `class`, `int` e `if` son **palabras clave**: reservadas y siempre en minúscula. Java distingue mayúsculas de minúsculas. Las convenciones: clases en PascalCase (`StepGoal`), variables y métodos en camelCase (`stepsToday`), constantes en UPPER_SNAKE_CASE (`DAILY_GOAL`).',
        'Palavras como `public`, `class`, `int` e `if` são **palavras-chave**: reservadas e sempre minúsculas. Java diferencia maiúsculas de minúsculas. As convenções: classes em PascalCase (`StepGoal`), variáveis e métodos em camelCase (`stepsToday`), constantes em UPPER_SNAKE_CASE (`DAILY_GOAL`).'),
    ],
    L('A class is an envelope with a name on the front; `main` is the first sheet the JVM reads when it opens the envelope.',
      'Una clase es un sobre con un nombre al frente; `main` es la primera hoja que lee la JVM al abrirlo.',
      'Uma classe é um envelope com um nome na frente; `main` é a primeira folha que a JVM lê ao abri-lo.'),
    [L('File name = public class name; execution starts in `main`.', 'Nombre del archivo = clase pública; la ejecución empieza en `main`.', 'Nome do arquivo = classe pública; a execução começa no `main`.'),
      L('PascalCase classes, camelCase variables, UPPER_SNAKE_CASE constants.', 'Clases en PascalCase, variables en camelCase, constantes en UPPER_SNAKE_CASE.', 'Classes em PascalCase, variáveis em camelCase, constantes em UPPER_SNAKE_CASE.')],
    chk(L('`Main.java` contains `public class main`. What happens?', '`Main.java` contiene `public class main`. ¿Qué pasa?', '`Main.java` contém `public class main`. O que acontece?'),
      [L('It compiles fine', 'Compila sin problema', 'Compila sem problema'), L('Compile error: the class must be called `Main`', 'Error de compilación: la clase debe llamarse `Main`', 'Erro de compilação: a classe deve se chamar `Main`'), L('It runs but prints nothing', 'Se ejecuta pero no imprime nada', 'Roda mas não imprime nada')], 1,
      L('Java is case-sensitive, so `main` and `Main` are different names.', 'Java distingue mayúsculas, así que `main` y `Main` son nombres distintos.', 'Java diferencia maiúsculas, então `main` e `Main` são nomes diferentes.')),
    [pf(L('Names that say nothing, such as `x2` or `temp1`.', 'Nombres que no dicen nada, como `x2` o `temp1`.', 'Nomes que não dizem nada, como `x2` ou `temp1`.'),
      L('Name what the value means: `stepsToday`, `ticketPrice`.', 'Nombra lo que significa el valor: `stepsToday`, `ticketPrice`.', 'Nomeie o que o valor significa: `stepsToday`, `ticketPrice`.'))],
    [ex('p1w2-ex-2-1', 1, L('Fix the names', 'Corrige los nombres', 'Corrija os nomes'),
      L('Rename by convention: class `shopping_cart`, variable `Total_Price`, constant `maxItems`, method `PrintTicket`.', 'Renombra según la convención: clase `shopping_cart`, variable `Total_Price`, constante `maxItems`, método `PrintTicket`.', 'Renomeie pela convenção: classe `shopping_cart`, variável `Total_Price`, constante `maxItems`, método `PrintTicket`.'),
      L('Only classes start with a capital.', 'Solo las clases empiezan con mayúscula.', 'Só classes começam com maiúscula.'),
      same('`ShoppingCart`, `totalPrice`, `MAX_ITEMS`, `printTicket`.')),
    ex('p1w2-ex-2-2', 2, L('Find the four errors', 'Encuentra los cuatro errores', 'Ache os quatro erros'),
      L('In `Hello.java`: `public class hello { public void main(String args) { System.out.println("Hi") } }`.', 'En `Hello.java`: `public class hello { public void main(String args) { System.out.println("Hi") } }`.', 'Em `Hello.java`: `public class hello { public void main(String args) { System.out.println("Hi") } }`.'),
      L('Check the class name, `static`, the parameter type, and the semicolon.', 'Revisa el nombre de la clase, `static`, el tipo del parámetro y el punto y coma.', 'Confira o nome da classe, `static`, o tipo do parâmetro e o ponto e vírgula.'),
      L('`hello` → `Hello`; add `static`; `String args` → `String[] args`; add `;` after the `println` call.', '`hello` → `Hello`; agrega `static`; `String args` → `String[] args`; agrega `;` después de `println`.', '`hello` → `Hello`; acrescente `static`; `String args` → `String[] args`; acrescente `;` depois do `println`.'))]),

  lesson('p1w2-l3-args', L('Command-line arguments: String[] args', 'Argumentos de línea de comandos: String[] args', 'Argumentos de linha de comando: String[] args'), 25,
    java(L('`Cheer` reads its input from the command line: `java Cheer Sofia 3`.', '`Cheer` lee su entrada desde la línea de comandos: `java Cheer Sofia 3`.', '`Cheer` lê a entrada pela linha de comando: `java Cheer Sofia 3`.'), CHEER),
    [
      L('`String[] args` is how a program gets input when it starts. Every word after the class name becomes one element: `java Cheer Sofia 3` gives `args[0]` = `"Sofia"`, `args[1]` = `"3"`, and `args.length` = 2. Quote a value with spaces: `java Cheer "Ana Paula" 2`.',
        '`String[] args` es la forma en que un programa recibe entrada al arrancar. Cada palabra después del nombre de la clase es un elemento: `java Cheer Sofia 3` da `args[0]` = `"Sofia"`, `args[1]` = `"3"` y `args.length` = 2. Pon entre comillas un valor con espacios: `java Cheer "Ana Paula" 2`.',
        '`String[] args` é como um programa recebe entrada ao iniciar. Cada palavra depois do nome da classe vira um elemento: `java Cheer Sofia 3` dá `args[0]` = `"Sofia"`, `args[1]` = `"3"` e `args.length` = 2. Use aspas num valor com espaços: `java Cheer "Ana Paula" 2`.'),
      L('Arguments are always text. To use one as a number, convert it: `Integer.parseInt(args[1])` or `Double.parseDouble(args[1])`. Without that, `args[1] + 1` joins text and gives `"31"`.',
        'Los argumentos siempre son texto. Para usar uno como número, conviértelo: `Integer.parseInt(args[1])` o `Double.parseDouble(args[1])`. Sin eso, `args[1] + 1` une texto y da `"31"`.',
        'Argumentos são sempre texto. Para usar um como número, converta: `Integer.parseInt(args[1])` ou `Double.parseDouble(args[1])`. Sem isso, `args[1] + 1` junta texto e dá `"31"`.'),
      L('Reading `args[1]` when only one argument arrived crashes with `ArrayIndexOutOfBoundsException`. So check `args.length` first and print a **usage line** that shows how to run the program, as `Cheer` does.',
        'Leer `args[1]` cuando solo llegó un argumento termina en `ArrayIndexOutOfBoundsException`. Por eso revisa primero `args.length` e imprime una **línea de uso** que muestre cómo ejecutar el programa, como hace `Cheer`.',
        'Ler `args[1]` quando só chegou um argumento quebra com `ArrayIndexOutOfBoundsException`. Por isso confira `args.length` primeiro e imprima uma **linha de uso** que mostre como rodar o programa, como `Cheer` faz.'),
      L('In an IDE, arguments go in the run configuration: in IntelliJ, `Run → Edit Configurations… → Program arguments`; in VS Code, `"args": ["Sofia", "3"]` in `.vscode/launch.json`. Since Java 11, `java Cheer.java Sofia 3` compiles and runs a one-file program in one step.',
        'En un IDE, los argumentos van en la configuración de ejecución: en IntelliJ, `Run → Edit Configurations… → Program arguments`; en VS Code, `"args": ["Sofia", "3"]` en `.vscode/launch.json`. Desde Java 11, `java Cheer.java Sofia 3` compila y ejecuta un programa de un archivo en un solo paso.',
        'Numa IDE, os argumentos ficam na configuração de execução: no IntelliJ, `Run → Edit Configurations… → Program arguments`; no VS Code, `"args": ["Sofia", "3"]` em `.vscode/launch.json`. Desde o Java 11, `java Cheer.java Sofia 3` compila e roda um programa de um arquivo num passo só.'),
    ],
    L('Arguments are the order slips handed to the kitchen when the restaurant opens: the cook reads slip 0, slip 1, and so on. Reaching for a slip that is not there stops the kitchen.',
      'Los argumentos son las comandas que se entregan a la cocina al abrir el restaurante: el cocinero lee la comanda 0, la 1, y así. Buscar una que no existe detiene la cocina.',
      'Os argumentos são as comandas entregues à cozinha quando o restaurante abre: o cozinheiro lê a comanda 0, a 1, e assim por diante. Procurar uma que não existe para a cozinha.'),
    [L('`java Main a b` → `args[0]` = `"a"`, `args.length` = 2.', '`java Main a b` → `args[0]` = `"a"`, `args.length` = 2.', '`java Main a b` → `args[0]` = `"a"`, `args.length` = 2.'),
      L('Always text: parse numbers with `Integer.parseInt`.', 'Siempre texto: convierte números con `Integer.parseInt`.', 'Sempre texto: converta números com `Integer.parseInt`.'),
      L('Check `args.length` before reading `args[i]`.', 'Revisa `args.length` antes de leer `args[i]`.', 'Confira `args.length` antes de ler `args[i]`.')],
    chk(L('You run `java Cheer Leo 2 x`. What is `args.length`?', 'Ejecutas `java Cheer Leo 2 x`. ¿Cuánto vale `args.length`?', 'Você roda `java Cheer Leo 2 x`. Quanto vale `args.length`?'),
      [same('2'), same('3'), same('4')], 1,
      L('The class name is not an argument: `{"Leo", "2", "x"}`.', 'El nombre de la clase no es un argumento: `{"Leo", "2", "x"}`.', 'O nome da classe não é argumento: `{"Leo", "2", "x"}`.')),
    [pf(L('Counting the class name as `args[0]`.', 'Contar el nombre de la clase como `args[0]`.', 'Contar o nome da classe como `args[0]`.'),
      L('`args[0]` is the first word after the class name.', '`args[0]` es la primera palabra después del nombre de la clase.', '`args[0]` é a primeira palavra depois do nome da classe.'))],
    [ex('p1w2-ex-3-1', 1, L('Read the arguments', 'Lee los argumentos', 'Leia os argumentos'),
      L('For `java Trip Quito Cuenca 460`, give `args.length`, `args[0]`, and `args[2]`.', 'Para `java Trip Quito Cuenca 460`, da `args.length`, `args[0]` y `args[2]`.', 'Para `java Trip Quito Cuenca 460`, dê `args.length`, `args[0]` e `args[2]`.'),
      L('Indexes start at 0.', 'Los índices empiezan en 0.', 'Os índices começam em 0.'),
      L('3, `"Quito"`, `"460"` (still text until parsed).', '3, `"Quito"`, `"460"` (sigue siendo texto hasta convertirlo).', '3, `"Quito"`, `"460"` (ainda texto até converter).')),
    ex('p1w2-ex-3-2', 2, L('Echo', 'Eco', 'Eco'),
      L('Write `Echo`: it prints how many arguments arrived and the first one, or `no arguments` when there are none.', 'Escribe `Echo`: imprime cuántos argumentos llegaron y el primero, o `no arguments` si no hay ninguno.', 'Escreva `Echo`: imprime quantos argumentos chegaram e o primeiro, ou `no arguments` se não houver nenhum.'),
      L('`if (args.length == 0) { … } else { … }`', '`if (args.length == 0) { … } else { … }`', '`if (args.length == 0) { … } else { … }`'),
      same('`System.out.println(args.length + " argument(s)"); if (args.length == 0) { System.out.println("no arguments"); } else { System.out.println("first: " + args[0]); }`')),
    ex('p1w2-ex-3-3', 2, L('Double it', 'El doble', 'O dobro'),
      L('`java Twice 21` must print 42. Write the body of `main`.', '`java Twice 21` debe imprimir 42. Escribe el cuerpo de `main`.', '`java Twice 21` deve imprimir 42. Escreva o corpo do `main`.'),
      L('Parse first, then multiply.', 'Convierte primero y luego multiplica.', 'Converta primeiro e depois multiplique.'),
      same('`int n = Integer.parseInt(args[0]); System.out.println(n * 2);`'))]),

  lesson('p1w2-l4-types', L('Variables, types, and constants', 'Variables, tipos y constantes', 'Variáveis, tipos e constantes'), 20,
    text(L('The eight primitive types, plus String.', 'Los ocho tipos primitivos, más String.', 'Os oito tipos primitivos, mais String.'),
      `Type     Size     Example literal       Use for
byte     8 bit    (byte) 12             tiny whole numbers
short    16 bit   (short) 3000          small whole numbers
int      32 bit   42                    whole numbers (default)
long     64 bit   8_100_000_000L        very large whole numbers
float    32 bit   2.5f                  decimals, less precise
double   64 bit   19.99                 decimals (default)
char     16 bit   'A'                   one character
boolean  -        true / false          yes or no
String   (class)  "Lima"                text (a reference type)`),
    [
      L('A **variable** is a named place in memory with a fixed type. Declare and assign it: `int seats = 120;`. Java checks types when it compiles, so storing the wrong kind of value is an error before the program even runs.',
        'Una **variable** es un lugar con nombre en la memoria y un tipo fijo. Se declara y se asigna: `int seats = 120;`. Java revisa los tipos al compilar, así que guardar un valor del tipo equivocado es un error antes de ejecutar.',
        'Uma **variável** é um lugar com nome na memória e um tipo fixo. Declare e atribua: `int seats = 120;`. Java confere os tipos ao compilar, então guardar um valor do tipo errado é erro antes mesmo de rodar.'),
      L('Use `int` for whole numbers and `double` for decimals unless you have a reason not to. `char` uses single quotes (`\'A\'`), `String` uses double quotes (`"Lima"`), and `boolean` holds `true` or `false`. `final` makes a **constant**: `final double VAT = 0.18;`.',
        'Usa `int` para enteros y `double` para decimales salvo que tengas un motivo. `char` usa comillas simples (`\'A\'`), `String` usa comillas dobles (`"Lima"`) y `boolean` guarda `true` o `false`. `final` crea una **constante**: `final double VAT = 0.18;`.',
        'Use `int` para inteiros e `double` para decimais, a menos que haja motivo. `char` usa aspas simples (`\'A\'`), `String` usa aspas duplas (`"Lima"`) e `boolean` guarda `true` ou `false`. `final` cria uma **constante**: `final double VAT = 0.18;`.'),
      L('Widening (`int` to `double`) is automatic. Narrowing needs a **cast**: `(int) 9.99` cuts the decimals and gives 9. Text to number is a method call, not a cast: `Integer.parseInt("42")`. Number to text: `String.valueOf(42)` or `"" + 42`.',
        'La ampliación (`int` a `double`) es automática. La reducción necesita un **cast**: `(int) 9.99` corta los decimales y da 9. De texto a número es una llamada a un método, no un cast: `Integer.parseInt("42")`. De número a texto: `String.valueOf(42)` o `"" + 42`.',
        'A ampliação (`int` para `double`) é automática. A redução exige um **cast**: `(int) 9.99` corta os decimais e dá 9. De texto para número é uma chamada de método, não um cast: `Integer.parseInt("42")`. De número para texto: `String.valueOf(42)` ou `"" + 42`.'),
    ],
    L('Types are box shapes: an egg box (`int`) cannot hold soup (`double`) without spilling some, and a cast is pouring away the extra.',
      'Los tipos son formas de caja: una huevera (`int`) no puede guardar sopa (`double`) sin derramar algo, y un cast es tirar lo que sobra.',
      'Os tipos são formatos de caixa: uma caixa de ovos (`int`) não guarda sopa (`double`) sem derramar, e um cast é jogar fora o que sobra.'),
    [L('Default choices: `int` and `double`.', 'Opciones por defecto: `int` y `double`.', 'Escolhas padrão: `int` e `double`.'),
      L('`final` = constant; `(int)` truncates; `parseInt` reads text.', '`final` = constante; `(int)` trunca; `parseInt` lee texto.', '`final` = constante; `(int)` trunca; `parseInt` lê texto.')],
    chk(L('Which declaration does not compile?', '¿Qué declaración no compila?', 'Que declaração não compila?'),
      [same('`double d = 7;`'), same('`int n = 7.5;`'), same('`long big = 7;`')], 1,
      L('7.5 is a `double`; storing it in an `int` loses data, so Java demands a cast.', '7,5 es `double`; guardarlo en un `int` pierde datos, así que Java exige un cast.', '7,5 é `double`; guardá-lo num `int` perde dados, então Java exige um cast.')),
    [pf(L('Expecting `(int) 2.9` to round to 3.', 'Esperar que `(int) 2.9` redondee a 3.', 'Esperar que `(int) 2.9` arredonde para 3.'),
      L('A cast truncates to 2; use `Math.round(2.9)` to round.', 'El cast trunca a 2; usa `Math.round(2.9)` para redondear.', 'O cast trunca para 2; use `Math.round(2.9)` para arredondar.'))],
    [ex('p1w2-ex-4-1', 1, L('Pick a type', 'Elige un tipo', 'Escolha um tipo'),
      L('Choose a type: players on a team, a coffee price, whether the light is on, a blood type letter, the world population.', 'Elige un tipo: jugadores de un equipo, el precio de un café, si la luz está encendida, la letra de un grupo sanguíneo, la población mundial.', 'Escolha um tipo: jogadores de um time, o preço de um café, se a luz está acesa, a letra de um tipo sanguíneo, a população mundial.'),
      L('The world population is over 8 billion.', 'La población mundial supera los 8000 millones.', 'A população mundial passa de 8 bilhões.'),
      same('`int`, `double`, `boolean`, `char`, `long`.')),
    ex('p1w2-ex-4-2', 2, L('Fuel use', 'Consumo de combustible', 'Consumo de combustível'),
      L('`java Fuel 420 35.5` gives kilometres and litres. Store them as numbers and compute km per litre.', '`java Fuel 420 35.5` da kilómetros y litros. Guárdalos como números y calcula km por litro.', '`java Fuel 420 35.5` dá quilômetros e litros. Guarde como números e calcule km por litro.'),
      L('The second value has decimals.', 'El segundo valor tiene decimales.', 'O segundo valor tem decimais.'),
      L('`int km = Integer.parseInt(args[0]); double litres = Double.parseDouble(args[1]); double perLitre = km / litres;` → about 11.83.', '`int km = Integer.parseInt(args[0]); double litres = Double.parseDouble(args[1]); double perLitre = km / litres;` → unos 11,83.', '`int km = Integer.parseInt(args[0]); double litres = Double.parseDouble(args[1]); double perLitre = km / litres;` → cerca de 11,83.'))]),

  lesson('p1w2-l5-operators', L('Operators and expressions', 'Operadores y expresiones', 'Operadores e expressões'), 20,
    java(L('Arithmetic, assignment, comparison, and logic in one program.', 'Aritmética, asignación, comparación y lógica en un programa.', 'Aritmética, atribuição, comparação e lógica num programa.'),
      `public class BusRide {
    public static void main(String[] args) {
        int minutes = 135;
        int hours = minutes / 60;        // 2  (integer division)
        int rest = minutes % 60;         // 15 (remainder)
        double exact = minutes / 60.0;   // 2.25
        System.out.println(hours + " h " + rest + " min = " + exact + " h");

        int stops = 10;
        stops += 5;                      // 15
        stops++;                         // 16
        boolean student = true;
        boolean night = false;
        boolean discount = student && !night;   // true
        System.out.println(stops + " stops, discount: " + discount);
        System.out.println("Fare: " + 2 + 3);   // Fare: 23
        System.out.println("Fare: " + (2 + 3)); // Fare: 5
    }
}`),
    [
      L('Arithmetic uses `+ - * /` and `%` (remainder). With two `int` values, `/` is **integer division**: `7 / 2` is 3. If one side is a `double`, the result is decimal: `7 / 2.0` is 3.5. `n % 2 == 0` tests whether `n` is even.',
        'La aritmética usa `+ - * /` y `%` (resto). Con dos `int`, `/` es **división entera**: `7 / 2` da 3. Si un lado es `double`, el resultado es decimal: `7 / 2.0` da 3,5. `n % 2 == 0` prueba si `n` es par.',
        'A aritmética usa `+ - * /` e `%` (resto). Com dois `int`, `/` é **divisão inteira**: `7 / 2` dá 3. Se um lado for `double`, o resultado é decimal: `7 / 2.0` dá 3,5. `n % 2 == 0` testa se `n` é par.'),
      L('Precedence works as in maths: `* / %` before `+ -`, parentheses first. `total += price` means `total = total + price`; `count++` adds 1. Use `++` as a statement on its own while you learn.',
        'La precedencia es como en matemáticas: `* / %` antes que `+ -`, y primero los paréntesis. `total += price` significa `total = total + price`; `count++` suma 1. Mientras aprendes, usa `++` como sentencia aparte.',
        'A precedência é como na matemática: `* / %` antes de `+ -`, e parênteses primeiro. `total += price` significa `total = total + price`; `count++` soma 1. Enquanto aprende, use `++` como instrução separada.'),
      L('Comparisons (`== != < <= > >=`) give a `boolean`. `&&` (and), `||` (or), and `!` (not) combine them, and `&&`/`||` stop as soon as the answer is known (**short-circuit**). Do not confuse `=` (assign) with `==` (compare).',
        'Las comparaciones (`== != < <= > >=`) dan un `boolean`. `&&` (y), `||` (o) y `!` (no) las combinan, y `&&`/`||` se detienen en cuanto se conoce la respuesta (**cortocircuito**). No confundas `=` (asignar) con `==` (comparar).',
        'As comparações (`== != < <= > >=`) dão um `boolean`. `&&` (e), `||` (ou) e `!` (não) as combinam, e `&&`/`||` param assim que a resposta é conhecida (**curto-circuito**). Não confunda `=` (atribuir) com `==` (comparar).'),
      L('`+` also joins text, left to right: `"Fare: " + 2 + 3` gives `Fare: 23`. Wrap the maths in parentheses. The `Math` class adds `Math.pow`, `Math.sqrt`, `Math.max`, `Math.min`, `Math.abs`, and `Math.round`.',
        '`+` también une texto, de izquierda a derecha: `"Fare: " + 2 + 3` da `Fare: 23`. Pon la cuenta entre paréntesis. La clase `Math` suma `Math.pow`, `Math.sqrt`, `Math.max`, `Math.min`, `Math.abs` y `Math.round`.',
        '`+` também junta texto, da esquerda para a direita: `"Fare: " + 2 + 3` dá `Fare: 23`. Ponha a conta entre parênteses. A classe `Math` traz `Math.pow`, `Math.sqrt`, `Math.max`, `Math.min`, `Math.abs` e `Math.round`.'),
    ],
    L('Integer division is sharing sweets: 7 sweets for 2 children is 3 each (`7 / 2`) and 1 left in the bag (`7 % 2`).',
      'La división entera es repartir caramelos: 7 caramelos para 2 niños son 3 para cada uno (`7 / 2`) y queda 1 en la bolsa (`7 % 2`).',
      'A divisão inteira é repartir balas: 7 balas para 2 crianças dão 3 para cada uma (`7 / 2`) e sobra 1 no saco (`7 % 2`).'),
    [L('`int / int` drops the fraction; `%` is the remainder.', '`int / int` descarta la fracción; `%` es el resto.', '`int / int` descarta a fração; `%` é o resto.'),
      L('`=` assigns, `==` compares; parenthesise maths inside text.', '`=` asigna, `==` compara; pon entre paréntesis las cuentas dentro de un texto.', '`=` atribui, `==` compara; ponha entre parênteses as contas dentro de um texto.')],
    chk(L('What is `17 % 5 + 17 / 5`?', '¿Cuánto vale `17 % 5 + 17 / 5`?', 'Quanto vale `17 % 5 + 17 / 5`?'),
      [same('5'), same('5.4'), same('2')], 0,
      L('`17 % 5` = 2 and `17 / 5` = 3, so 5.', '`17 % 5` = 2 y `17 / 5` = 3, así que 5.', '`17 % 5` = 2 e `17 / 5` = 3, então 5.')),
    [pf(L('`double avg = (a + b) / 2;` with `int` values gives 3.0 for 3 and 4.', '`double avg = (a + b) / 2;` con valores `int` da 3.0 para 3 y 4.', '`double avg = (a + b) / 2;` com valores `int` dá 3.0 para 3 e 4.'),
      L('Divide by `2.0` so the division itself is decimal.', 'Divide entre `2.0` para que la división sea decimal.', 'Divida por `2.0` para que a divisão seja decimal.'))],
    [ex('p1w2-ex-5-1', 1, L('Evaluate', 'Evalúa', 'Avalie'),
      same('`10 - 4 * 2`, `(10 - 4) * 2`, `9 / 4`, `9 / 4.0`, `9 % 4`'),
      L('Multiplication first; watch integer division.', 'Primero la multiplicación; cuidado con la división entera.', 'Multiplicação primeiro; cuidado com a divisão inteira.'),
      L('2, 12, 2, 2.25, 1.', '2, 12, 2, 2,25, 1.', '2, 12, 2, 2,25, 1.')),
    ex('p1w2-ex-5-2', 2, L('Seconds to clock', 'Segundos a reloj', 'Segundos para relógio'),
      L('From `int total = 7385`, compute hours, minutes, and seconds with `/` and `%`.', 'A partir de `int total = 7385`, calcula horas, minutos y segundos con `/` y `%`.', 'A partir de `int total = 7385`, calcule horas, minutos e segundos com `/` e `%`.'),
      L('3600 seconds per hour; work on the remainder.', '3600 segundos por hora; trabaja con el resto.', '3600 segundos por hora; trabalhe com o resto.'),
      same('`int h = total / 3600; int m = total % 3600 / 60; int s = total % 60;` → 2:03:05.')),
    ex('p1w2-ex-5-3', 2, L('Write the condition', 'Escribe la condición', 'Escreva a condição'),
      L('A museum is free for visitors under 12 or aged 65 and over, but never on holidays (`holiday`). Write the `boolean`.', 'Un museo es gratis para menores de 12 o mayores de 65 años inclusive, pero nunca en feriados (`holiday`). Escribe el `boolean`.', 'Um museu é grátis para menores de 12 ou pessoas de 65 anos ou mais, mas nunca em feriados (`holiday`). Escreva o `boolean`.'),
      L('Group the age part in parentheses.', 'Agrupa la parte de la edad entre paréntesis.', 'Agrupe a parte da idade entre parênteses.'),
      same('`boolean free = (age < 12 || age >= 65) && !holiday;`'))]),

  lesson('p1w2-l6-translate', L('From pseudocode to Java', 'Del pseudocódigo a Java', 'Do pseudocódigo ao Java'), 15,
    java(L('How many pizzas for a group? Each pizza has 8 slices. Run: `java Pizza 11 3`.', '¿Cuántas pizzas para un grupo? Cada pizza tiene 8 porciones. Ejecuta: `java Pizza 11 3`.', 'Quantas pizzas para um grupo? Cada pizza tem 8 fatias. Rode: `java Pizza 11 3`.'),
      `/** READ people, slicesEach; pizzas <- ceil(people * slicesEach / 8); WRITE pizzas */
public class Pizza {
    public static void main(String[] args) {
        final int SLICES_PER_PIZZA = 8;
        if (args.length != 2) {
            System.out.println("Usage: java Pizza <people> <slices each>");
            return;
        }
        int people = Integer.parseInt(args[0]);          // READ people
        int slicesEach = Integer.parseInt(args[1]);      // READ slicesEach
        int slices = people * slicesEach;
        int pizzas = (slices + SLICES_PER_PIZZA - 1) / SLICES_PER_PIZZA; // round up
        int spare = pizzas * SLICES_PER_PIZZA - slices;
        System.out.println(pizzas + " pizzas, " + spare + " spare slices"); // WRITE
    }
}`),
    [
      L('Translating pseudocode is mostly mechanical. `START/END` become `main`; `READ x` becomes reading and parsing an argument; `x <- …` becomes a typed assignment; `WRITE` becomes `System.out.println`. Keep the pseudocode as comments while you translate.',
        'Traducir pseudocódigo es casi mecánico. `START/END` se vuelven `main`; `READ x` se vuelve leer y convertir un argumento; `x <- …` es una asignación con tipo; `WRITE` es `System.out.println`. Conserva el pseudocódigo como comentarios mientras traduces.',
        'Traduzir pseudocódigo é quase mecânico. `START/END` viram `main`; `READ x` vira ler e converter um argumento; `x <- …` é uma atribuição com tipo; `WRITE` é `System.out.println`. Mantenha o pseudocódigo como comentários enquanto traduz.'),
      L('Fixed rules from the problem (8 slices per pizza) become named `final` constants instead of magic numbers. The trick `(slices + 7) / 8` rounds a whole division up: 33 slices need 5 pizzas, not 4.',
        'Las reglas fijas del problema (8 porciones por pizza) se vuelven constantes `final` con nombre en lugar de números mágicos. El truco `(slices + 7) / 8` redondea hacia arriba una división entera: 33 porciones necesitan 5 pizzas, no 4.',
        'Regras fixas do problema (8 fatias por pizza) viram constantes `final` com nome em vez de números mágicos. O truque `(slices + 7) / 8` arredonda para cima uma divisão inteira: 33 fatias precisam de 5 pizzas, não 4.'),
      L('Then test with the cases you planned: `java Pizza 11 3` prints `5 pizzas, 7 spare slices`; `java Pizza 4 2` prints `1 pizzas, 0 spare slices` (a plural you could fix next week). Compare any wrong line with the pseudocode it came from.',
        'Luego prueba con los casos planeados: `java Pizza 11 3` imprime `5 pizzas, 7 spare slices`; `java Pizza 4 2` imprime `1 pizzas, 0 spare slices` (un plural que podrás corregir la próxima semana). Compara cualquier línea errónea con el pseudocódigo del que salió.',
        'Depois teste com os casos planejados: `java Pizza 11 3` imprime `5 pizzas, 7 spare slices`; `java Pizza 4 2` imprime `1 pizzas, 0 spare slices` (um plural que dá para corrigir na semana que vem). Compare qualquer linha errada com o pseudocódigo de origem.'),
    ],
    L('Pseudocode is the sketch and Java is the building plan: same rooms, but every measurement now has units and an inspector (the compiler) checks them.',
      'El pseudocódigo es el boceto y Java es el plano: las mismas habitaciones, pero ahora cada medida tiene unidades y un inspector (el compilador) las revisa.',
      'O pseudocódigo é o esboço e o Java é a planta: os mesmos cômodos, mas agora cada medida tem unidade e um fiscal (o compilador) confere.'),
    [L('READ → `args` + parse; WRITE → `println`.', 'READ → `args` + conversión; WRITE → `println`.', 'READ → `args` + conversão; WRITE → `println`.'),
      L('Fixed rules become `final` constants; test the planned cases.', 'Las reglas fijas son constantes `final`; prueba los casos planeados.', 'Regras fixas viram constantes `final`; teste os casos planejados.')],
    chk(L('What does `java Pizza 3 3` print?', '¿Qué imprime `java Pizza 3 3`?', 'O que `java Pizza 3 3` imprime?'),
      [same('`1 pizzas, 1 spare slices`'), same('`2 pizzas, 7 spare slices`'), same('`1 pizzas, 0 spare slices`')], 1,
      L('9 slices → (9 + 7) / 8 = 2 pizzas, 16 − 9 = 7 spare.', '9 porciones → (9 + 7) / 8 = 2 pizzas, sobran 16 − 9 = 7.', '9 fatias → (9 + 7) / 8 = 2 pizzas, sobram 16 − 9 = 7.')),
    [pf(L('Hard-coding the input and editing the code for each test.', 'Fijar la entrada en el código y editarlo para cada prueba.', 'Fixar a entrada no código e editá-lo a cada teste.'),
      L('Read it from `args`: each test is just a new command.', 'Léela desde `args`: cada prueba es solo un comando nuevo.', 'Leia de `args`: cada teste é só um comando novo.'))],
    [ex('p1w2-ex-6-1', 2, L('Rectangle', 'Rectángulo', 'Retângulo'),
      L('Translate `READ w, h; area <- w × h; perimeter <- 2 × (w + h); WRITE both` with `double` arguments.', 'Traduce `READ w, h; area <- w × h; perimeter <- 2 × (w + h); WRITE ambos` con argumentos `double`.', 'Traduza `READ w, h; area <- w × h; perimeter <- 2 × (w + h); WRITE os dois` com argumentos `double`.'),
      same('`Double.parseDouble(args[0])`'),
      L('`java Rect 3 4.5` → `Area: 13.5`, `Perimeter: 15.0`.', '`java Rect 3 4.5` → `Area: 13.5`, `Perimeter: 15.0`.', '`java Rect 3 4.5` → `Area: 13.5`, `Perimeter: 15.0`.')),
    ex('p1w2-ex-6-2', 3, L('Split the bill', 'Divide la cuenta', 'Divida a conta'),
      L('`java Split 87.50 4 10`: a bill of 87.50 shared by 4 people with a 10% tip. Write the calculation.', '`java Split 87.50 4 10`: una cuenta de 87,50 entre 4 personas con 10% de propina. Escribe el cálculo.', '`java Split 87.50 4 10`: uma conta de 87,50 dividida por 4 pessoas com 10% de gorjeta. Escreva o cálculo.'),
      L('Use `100.0`, not `100`.', 'Usa `100.0`, no `100`.', 'Use `100.0`, não `100`.'),
      L('`double each = bill * (1 + tip / 100.0) / people;` → 24.0625 each.', '`double each = bill * (1 + tip / 100.0) / people;` → 24,0625 por persona.', '`double each = bill * (1 + tip / 100.0) / people;` → 24,0625 por pessoa.'))]),
];

const questions: Question[] = [
  mc('p1w2-q1', 'multiple-choice', 'p1w2-l1-platform', L('Which tool is in the JDK but not in a plain runtime?', '¿Qué herramienta está en el JDK pero no en un entorno de ejecución simple?', 'Que ferramenta está no JDK mas não num ambiente de execução simples?'),
    [L('The JVM', 'La JVM', 'A JVM'), same('`javac`'), L('The `String` class', 'La clase `String`', 'A classe `String`')], 1,
    L('`javac` is a development tool.', '`javac` es una herramienta de desarrollo.', '`javac` é uma ferramenta de desenvolvimento.')),
  mc('p1w2-q2', 'code', 'p1w2-l3-args', L('The program runs as `java Show red 7`. What does it print?', 'El programa se ejecuta como `java Show red 7`. ¿Qué imprime?', 'O programa roda como `java Show red 7`. O que imprime?'),
    [same('2 7red'), same('3 red7'), same('2 red7')], 0,
    L('Two arguments; `args[1]` is `"7"`, `args[0]` is `"red"`, joined as text.', 'Dos argumentos; `args[1]` es `"7"` y `args[0]` es `"red"`, unidos como texto.', 'Dois argumentos; `args[1]` é `"7"` e `args[0]` é `"red"`, juntados como texto.'),
    'public class Show {\n    public static void main(String[] args) {\n        System.out.println(args.length + " " + args[1] + args[0]);\n    }\n}'),
  mc('p1w2-q3', 'troubleshooting', 'p1w2-l3-args', L('`java Cheer Ana` crashes with `ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1`. Best fix?', '`java Cheer Ana` falla con `ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1`. ¿La mejor solución?', '`java Cheer Ana` quebra com `ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1`. Melhor correção?'),
    [L('Check `args.length` and print a usage line', 'Revisar `args.length` e imprimir una línea de uso', 'Conferir `args.length` e imprimir uma linha de uso'), L('Use `args[2]` instead', 'Usar `args[2]`', 'Usar `args[2]`'), L('Reinstall the JDK', 'Reinstalar el JDK', 'Reinstalar o JDK')], 0,
    L('Only one argument (index 0) arrived; validate the count.', 'Solo llegó un argumento (índice 0); valida la cantidad.', 'Só chegou um argumento (índice 0); valide a quantidade.')),
  fill('p1w2-q4', 'fill-blank', 'p1w2-l3-args', L('The number of arguments received is `args.____`.', 'La cantidad de argumentos recibidos es `args.____`.', 'A quantidade de argumentos recebidos é `args.____`.'), ['length'],
    L('Arrays have a `length` field, with no parentheses.', 'Los arreglos tienen un campo `length`, sin paréntesis.', 'Arrays têm um campo `length`, sem parênteses.')),
  match('p1w2-q5', 'p1w2-l4-types', L('Match each value with the best type.', 'Relaciona cada valor con el mejor tipo.', 'Ligue cada valor ao melhor tipo.'),
    [same("'x'"), same('19.99'), same('false'), same('"Lima"'), same('120')], [same('int'), same('String'), same('char'), same('double'), same('boolean')], [2, 3, 4, 1, 0],
    L('Single quotes: `char`; decimals: `double`; true/false: `boolean`; double quotes: `String`; whole number: `int`.', 'Comillas simples: `char`; decimales: `double`; true/false: `boolean`; comillas dobles: `String`; entero: `int`.', 'Aspas simples: `char`; decimais: `double`; true/false: `boolean`; aspas duplas: `String`; inteiro: `int`.')),
  mc('p1w2-q6', 'code', 'p1w2-l4-types', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('10.99'), same('10'), same('11')], 1,
    L('The cast truncates 9.99 to 9; 9 + 1 = 10.', 'El cast trunca 9,99 a 9; 9 + 1 = 10.', 'O cast trunca 9,99 para 9; 9 + 1 = 10.'), 'double price = 9.99;\nint whole = (int) price;\nSystem.out.println(whole + 1);'),
  mc('p1w2-q7', 'code', 'p1w2-l5-operators', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('3.5 1 3.5'), same('3 1 3.5'), same('3 1 3.0')], 1,
    L('7 / 2 = 3, 7 % 2 = 1, and casting before dividing gives 3.5.', '7 / 2 = 3, 7 % 2 = 1, y el cast antes de dividir da 3,5.', '7 / 2 = 3, 7 % 2 = 1, e o cast antes de dividir dá 3,5.'), 'int a = 7, b = 2;\nSystem.out.println(a / b + " " + a % b + " " + (double) a / b);'),
  tf('p1w2-q8', 'p1w2-l5-operators', L('In `false && (10 / 0 > 1)`, the division by zero is never evaluated.', 'En `false && (10 / 0 > 1)`, la división entre cero nunca se evalúa.', 'Em `false && (10 / 0 > 1)`, a divisão por zero nunca é avaliada.'), true,
    L('`&&` short-circuits: a false left side decides the result.', '`&&` hace cortocircuito: un lado izquierdo falso decide el resultado.', '`&&` faz curto-circuito: um lado esquerdo falso decide o resultado.')),
  mc('p1w2-q9', 'scenario', 'p1w2-l6-translate', L('Pseudocode: `READ price; tax <- price × 0.18; WRITE price + tax`. Which Java is right for `java Tax 50`?', 'Pseudocódigo: `READ price; tax <- price × 0.18; WRITE price + tax`. ¿Qué Java es correcto para `java Tax 50`?', 'Pseudocódigo: `READ price; tax <- price × 0.18; WRITE price + tax`. Que Java está certo para `java Tax 50`?'),
    [same('`double price = args[0];`'), same('`double price = Double.parseDouble(args[0]); System.out.println(price + price * 0.18);`'), same('`int price = Integer.parseInt(args[1]);`')], 1,
    L('`args[0]` is text and must be parsed; the only argument is at index 0. Output: 59.0.', '`args[0]` es texto y hay que convertirlo; el único argumento está en el índice 0. Salida: 59.0.', '`args[0]` é texto e precisa ser convertido; o único argumento está no índice 0. Saída: 59.0.')),
];

const activities: Activity[] = [
  { id: 'p1w2-act-args', kind: 'code-fill', lessonId: 'p1w2-l3-args', title: L('Read two arguments', 'Lee dos argumentos', 'Leia dois argumentos'),
    prompt: L('Complete the program so `java Area 4 5` prints 20.', 'Completa el programa para que `java Area 4 5` imprima 20.', 'Complete o programa para que `java Area 4 5` imprima 20.'),
    template: 'public class Area {\n    public static void main(String[] {0}) {\n        int w = Integer.{1}(args[0]);\n        int h = Integer.parseInt(args[{2}]);\n        System.out.println(w * h);\n    }\n}',
    blanks: ['args', 'parseInt', '1'], explanation: L('`main` receives `String[] args`; `parseInt` converts; the second argument is index 1.', '`main` recibe `String[] args`; `parseInt` convierte; el segundo argumento es el índice 1.', '`main` recebe `String[] args`; `parseInt` converte; o segundo argumento é o índice 1.') },
  { id: 'p1w2-act-types', kind: 'classify', lessonId: 'p1w2-l4-types', title: L('Primitive or reference?', '¿Primitivo o referencia?', 'Primitivo ou referência?'),
    prompt: L('Sort each type.', 'Clasifica cada tipo.', 'Classifique cada tipo.'), buckets: [L('Primitive', 'Primitivo', 'Primitivo'), L('Reference', 'Referencia', 'Referência')],
    items: [{ text: same('int'), bucket: 0 }, { text: same('String'), bucket: 1 }, { text: same('boolean'), bucket: 0 }, { text: same('String[]'), bucket: 1 }, { text: same('char'), bucket: 0 }, { text: same('double'), bucket: 0 }],
    explanation: L('The eight primitives are lower-case keywords; `String` and arrays are objects.', 'Los ocho primitivos son palabras clave en minúscula; `String` y los arreglos son objetos.', 'Os oito primitivos são palavras-chave minúsculas; `String` e arrays são objetos.') },
  { id: 'p1w2-act-run', kind: 'order', lessonId: 'p1w2-l3-args', title: L('From file to output', 'Del archivo a la salida', 'Do arquivo à saída'),
    prompt: L('Order the steps to run `Cheer` with arguments.', 'Ordena los pasos para ejecutar `Cheer` con argumentos.', 'Ordene os passos para rodar `Cheer` com argumentos.'),
    items: [L('Save the code as `Cheer.java`', 'Guardar el código como `Cheer.java`', 'Salvar o código como `Cheer.java`'), same('`javac Cheer.java`'), L('Check that `Cheer.class` exists', 'Comprobar que existe `Cheer.class`', 'Conferir que `Cheer.class` existe'), same('`java Cheer Sofia 3`'), L('Compare the output with the expected one', 'Comparar la salida con la esperada', 'Comparar a saída com a esperada')],
    explanation: L('Compile first, then run the class with its arguments.', 'Primero se compila y luego se ejecuta la clase con sus argumentos.', 'Primeiro compila, depois roda a classe com os argumentos.') },
  { id: 'p1w2-act-cond', kind: 'scramble', lessonId: 'p1w2-l5-operators', title: L('Build the condition', 'Arma la condición', 'Monte a condição'),
    prompt: L('Free shipping for members or orders of at least 100.', 'Envío gratis para socios o pedidos de al menos 100.', 'Frete grátis para sócios ou pedidos de pelo menos 100.'),
    tokens: ['boolean', 'free', '=', 'member', '||', 'total', '>=', '100', ';'],
    explanation: L('`||` is true if at least one side is true.', '`||` es verdadero si al menos un lado lo es.', '`||` é verdadeiro se pelo menos um lado for.') },
];

const labs: Lab[] = [
  { id: 'p1w2-lab1-args', level: 1, minutes: 40, title: L('Your first program with arguments', 'Tu primer programa con argumentos', 'Seu primeiro programa com argumentos'),
    goal: L('Create, compile, and run a program that reads `args`, in the terminal and in the IDE.', 'Crear, compilar y ejecutar un programa que lee `args`, en la terminal y en el IDE.', 'Criar, compilar e rodar um programa que lê `args`, no terminal e na IDE.'),
    steps: [
      { id: 'p1w2-lab1-s1', title: L('Create Cheer.java', 'Crea Cheer.java', 'Crie Cheer.java'), commands: ['mkdir -p ~/prog1/week2 && cd ~/prog1/week2', ...heredoc('Cheer.java', CHEER)],
        expected: L('`Cheer.java` exists. On Windows, create it in your editor with the lines between the `EOF` markers.', 'Existe `Cheer.java`. En Windows, créalo en tu editor con las líneas que están entre los marcadores `EOF`.', '`Cheer.java` existe. No Windows, crie no editor com as linhas entre os marcadores `EOF`.') },
      { id: 'p1w2-lab1-s2', title: L('Compile and run with arguments', 'Compila y ejecuta con argumentos', 'Compile e rode com argumentos'), commands: ['javac Cheer.java', 'java Cheer Sofia 3', 'java Cheer "Ana Paula" 1'],
        expected: same('`1. Go, Sofia!` `2. Go, Sofia!` `3. Go, Sofia!` and `1. Go, Ana Paula!`') },
      { id: 'p1w2-lab1-s3', title: L('Run it wrong on purpose', 'Ejecútalo mal a propósito', 'Rode errado de propósito'), commands: ['java Cheer', 'java Cheer Sofia', 'java Cheer Sofia three'],
        expected: L('The first two print the usage line. The third crashes with `NumberFormatException: For input string: "three"`. Next week you will catch it.', 'Las dos primeras imprimen la línea de uso. La tercera falla con `NumberFormatException: For input string: "three"`. La próxima semana la capturarás.', 'As duas primeiras imprimem a linha de uso. A terceira quebra com `NumberFormatException: For input string: "three"`. Na próxima semana você vai capturá-la.') },
      { id: 'p1w2-lab1-s4', title: L('One step, no javac', 'Un paso, sin javac', 'Um passo, sem javac'), commands: ['java Cheer.java Tomas 2'],
        expected: L('`1. Go, Tomas!` `2. Go, Tomas!` — compiled in memory, no `.class` written.', '`1. Go, Tomas!` `2. Go, Tomas!` — se compila en memoria y no se escribe ningún `.class`.', '`1. Go, Tomas!` `2. Go, Tomas!` — compilado em memória, sem gravar `.class`.') },
      { id: 'p1w2-lab1-s5', title: L('Arguments in the IDE', 'Argumentos en el IDE', 'Argumentos na IDE'), commands: ['# IntelliJ IDEA: Run > Edit Configurations... > Program arguments: Mateo 2', '# VS Code, .vscode/launch.json, inside the configuration:', '#   "args": ["Mateo", "2"]'],
        expected: L('`Run` prints `1. Go, Mateo!` and `2. Go, Mateo!`. With empty arguments you see the usage line, as in the terminal.', '`Run` imprime `1. Go, Mateo!` y `2. Go, Mateo!`. Con los argumentos vacíos ves la línea de uso, como en la terminal.', '`Run` imprime `1. Go, Mateo!` e `2. Go, Mateo!`. Com argumentos vazios aparece a linha de uso, como no terminal.') },
    ] },
  { id: 'p1w2-lab2-converter', level: 2, minutes: 45, title: L('Unit converter and clock', 'Conversor de unidades y reloj', 'Conversor de unidades e relógio'),
    goal: L('Practise types, constants, operators, and parsing numbers from `args`.', 'Practicar tipos, constantes, operadores y conversión de números desde `args`.', 'Praticar tipos, constantes, operadores e conversão de números de `args`.'),
    steps: [
      { id: 'p1w2-lab2-s1', title: L('Write and run Converter.java', 'Escribe y ejecuta Converter.java', 'Escreva e rode Converter.java'), commands: [...heredoc('Converter.java', CONVERTER), 'javac Converter.java', 'java Converter 10 25'],
        expected: same('`10.0 km = 6.21 miles` / `25.0 C = 77.0 F`') },
      { id: 'p1w2-lab2-s2', title: L('Test the edges', 'Prueba los extremos', 'Teste os extremos'), commands: ['java Converter 0 -40', 'java Converter 42.195 100'],
        expected: L('`0.0 km = 0.0 miles`, `-40.0 C = -40.0 F` (both scales meet at −40); then `42.195 km = 26.22 miles`, `100.0 C = 212.0 F`.', '`0.0 km = 0.0 miles`, `-40.0 C = -40.0 F` (las escalas coinciden en −40); luego `42.195 km = 26.22 miles`, `100.0 C = 212.0 F`.', '`0.0 km = 0.0 miles`, `-40.0 C = -40.0 F` (as escalas se encontram em −40); depois `42.195 km = 26.22 miles`, `100.0 C = 212.0 F`.') },
      { id: 'p1w2-lab2-s3', title: L('The integer-division trap', 'La trampa de la división entera', 'A armadilha da divisão inteira'), commands: ['# change the formula to: celsius * (9 / 5) + 32', 'javac Converter.java', 'java Converter 10 25'],
        expected: L('Now 25 C gives `57.0 F`: `9 / 5` is 1. Restore the formula or write `9.0 / 5`.', 'Ahora 25 C da `57.0 F`: `9 / 5` vale 1. Vuelve a la fórmula original o escribe `9.0 / 5`.', 'Agora 25 C dá `57.0 F`: `9 / 5` vale 1. Volte à fórmula original ou escreva `9.0 / 5`.') },
      { id: 'p1w2-lab2-s4', title: L('Write Clock.java yourself', 'Escribe Clock.java por tu cuenta', 'Escreva Clock.java sozinho'), commands: ['# java Clock <seconds> prints h, min and s', 'javac Clock.java', 'java Clock 7385', 'java Clock 59'],
        expected: L('`2 h 3 min 5 s`, then `0 h 0 min 59 s`.', '`2 h 3 min 5 s` y luego `0 h 0 min 59 s`.', '`2 h 3 min 5 s` e depois `0 h 0 min 59 s`.') },
    ] },
];

const resources: ExternalResource[] = [
  { id: 'p1w2-r1', title: 'Oracle Java Tutorials: Language Basics', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Variables, primitive types, and operators.', 'Variables, tipos primitivos y operadores.', 'Variáveis, tipos primitivos e operadores.') },
  { id: 'p1w2-r2', title: 'Oracle Java Tutorials: Command-Line Arguments', url: 'https://docs.oracle.com/javase/tutorial/essential/environment/cmdLineArgs.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('How `args` works and how to parse numbers.', 'Cómo funciona `args` y cómo convertir números.', 'Como `args` funciona e como converter números.') },
  { id: 'p1w2-r3', title: 'W3Schools: Java Data Types', url: 'https://www.w3schools.com/java/java_data_types.asp', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Short examples you can run in the browser.', 'Ejemplos cortos que puedes ejecutar en el navegador.', 'Exemplos curtos para rodar no navegador.') },
  { id: 'p1w2-r4', title: 'Exercism: Java track', url: 'https://exercism.org/tracks/java', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Free practice with automatic tests.', 'Práctica gratuita con pruebas automáticas.', 'Prática gratuita com testes automáticos.') },
];

/** Programming 1, Week 2: Java basics. */
export const prog1Week2: WeekContent = {
  id: 'y1-t1-m1-prog-w2', year: 1, term: 1, module: 1, week: 2, subject: 'programming-1',
  title: L('Java basics: arguments, types, and operators', 'Fundamentos de Java: argumentos, tipos y operadores', 'Fundamentos de Java: argumentos, tipos e operadores'),
  intro: L('This week you meet Java properly: what the JDK, JRE, and JVM are, how a Java file is structured and named, how a program receives its input from the command line through `String[] args` (the main input technique of this course), and the vocabulary of every program: types, variables, constants, and operators.',
    'Esta semana conoces Java de verdad: qué son el JDK, el JRE y la JVM, cómo se estructura y se nombra un archivo Java, cómo recibe un programa su entrada desde la línea de comandos con `String[] args` (la técnica de entrada principal del curso) y el vocabulario de todo programa: tipos, variables, constantes y operadores.',
    'Nesta semana você conhece o Java de verdade: o que são o JDK, o JRE e a JVM, como um arquivo Java é estruturado e nomeado, como um programa recebe a entrada pela linha de comando com `String[] args` (a técnica de entrada principal do curso) e o vocabulário de todo programa: tipos, variáveis, constantes e operadores.'),
  objectives: [
    L('Explain the JDK, JRE, JVM, bytecode, and garbage collector.', 'Explicar el JDK, el JRE, la JVM, el bytecode y el recolector de basura.', 'Explicar o JDK, o JRE, a JVM, o bytecode e o coletor de lixo.'),
    L('Write a correctly structured and named program.', 'Escribir un programa con estructura y nombres correctos.', 'Escrever um programa com estrutura e nomes corretos.'),
    L('Pass arguments in the terminal and the IDE, read `args`, and parse numbers.', 'Pasar argumentos en la terminal y el IDE, leer `args` y convertir números.', 'Passar argumentos no terminal e na IDE, ler `args` e converter números.'),
    L('Choose types, declare constants, and evaluate expressions.', 'Elegir tipos, declarar constantes y evaluar expresiones.', 'Escolher tipos, declarar constantes e avaliar expressões.'),
  ],
  prerequisites: [L('Week 1: pseudocode and a working JDK.', 'Semana 1: pseudocódigo y un JDK funcionando.', 'Semana 1: pseudocódigo e um JDK funcionando.')],
  keyConcepts: [same('JDK, JRE, JVM'), same('String[] args'), same('Integer.parseInt'), L('Primitive types', 'Tipos primitivos', 'Tipos primitivos'), L('Constants', 'Constantes', 'Constantes'), L('Integer division', 'División entera', 'Divisão inteira'), L('Logical operators', 'Operadores lógicos', 'Operadores lógicos')],
  estimatedMinutes: 300,
  sequence: [L('Lessons 1–3, then Lab 1.', 'Lecciones 1–3 y luego el Laboratorio 1.', 'Lições 1–3 e depois o Laboratório 1.'), L('Lessons 4–5 with `jshell` open.', 'Lecciones 4–5 con `jshell` abierto.', 'Lições 4–5 com o `jshell` aberto.'), L('Lesson 6, Lab 2, and the quiz.', 'Lección 6, Laboratorio 2 y cuestionario.', 'Lição 6, Laboratório 2 e questionário.')],
  outcomes: [L('You write programs that take numbers from the command line.', 'Escribes programas que reciben números por la línea de comandos.', 'Você escreve programas que recebem números pela linha de comando.'), L('You predict expressions, including integer division.', 'Predices expresiones, incluida la división entera.', 'Você prevê expressões, inclusive a divisão inteira.')],
  checklist: [L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'), L('Run `Cheer` in the terminal and the IDE', 'Ejecutar `Cheer` en la terminal y en el IDE', 'Rodar `Cheer` no terminal e na IDE'), L('Finish Lab 2, including `Clock.java`', 'Terminar el Laboratorio 2, incluido `Clock.java`', 'Terminar o Laboratório 2, incluindo `Clock.java`')],
  commonMistakes: [
    { mistake: L('Using an argument as a number without parsing it.', 'Usar un argumento como número sin convertirlo.', 'Usar um argumento como número sem convertê-lo.'), fix: L('`Integer.parseInt` or `Double.parseDouble` first.', 'Primero `Integer.parseInt` o `Double.parseDouble`.', 'Primeiro `Integer.parseInt` ou `Double.parseDouble`.') },
    { mistake: L('Dividing two `int` values and expecting decimals.', 'Dividir dos `int` y esperar decimales.', 'Dividir dois `int` e esperar decimais.'), fix: L('Make one side a `double`.', 'Haz que un lado sea `double`.', 'Faça um lado ser `double`.') },
  ],
  lessons,
  flashcards: [
    fc('p1w2-fc-1', 'p1w2-l1-platform', 'distinction', same('JDK vs JRE vs JVM'), L('JVM runs bytecode; JRE = JVM + library; JDK = JRE + tools such as `javac`.', 'La JVM ejecuta bytecode; JRE = JVM + biblioteca; JDK = JRE + herramientas como `javac`.', 'A JVM executa bytecode; JRE = JVM + biblioteca; JDK = JRE + ferramentas como `javac`.')),
    fc('p1w2-fc-2', 'p1w2-l1-platform', 'concept', L('Garbage collector', 'Recolector de basura', 'Coletor de lixo'), L('Frees heap objects that nothing refers to.', 'Libera los objetos del heap a los que nada apunta.', 'Libera objetos do heap para os quais nada aponta.')),
    fc('p1w2-fc-3', 'p1w2-l2-anatomy', 'concept', same('public static void main(String[] args)'), L('The entry point; the JVM passes the arguments in `args`.', 'El punto de entrada; la JVM pasa los argumentos en `args`.', 'O ponto de entrada; a JVM passa os argumentos em `args`.')),
    fc('p1w2-fc-4', 'p1w2-l2-anatomy', 'concept', L('Naming conventions', 'Convenciones de nombres', 'Convenções de nomes'), L('PascalCase classes, camelCase variables and methods, UPPER_SNAKE_CASE constants.', 'Clases en PascalCase, variables y métodos en camelCase, constantes en UPPER_SNAKE_CASE.', 'Classes em PascalCase, variáveis e métodos em camelCase, constantes em UPPER_SNAKE_CASE.')),
    fc('p1w2-fc-5', 'p1w2-l3-args', 'command', same('java Cheer Sofia 3'), L('`args[0]` = `"Sofia"`, `args[1]` = `"3"`, `args.length` = 2.', '`args[0]` = `"Sofia"`, `args[1]` = `"3"`, `args.length` = 2.', '`args[0]` = `"Sofia"`, `args[1]` = `"3"`, `args.length` = 2.')),
    fc('p1w2-fc-6', 'p1w2-l3-args', 'command', same('Integer.parseInt(args[0])'), L('Converts the first argument from text to `int`.', 'Convierte el primer argumento de texto a `int`.', 'Converte o primeiro argumento de texto para `int`.')),
    fc('p1w2-fc-7', 'p1w2-l3-args', 'concept', L('Arguments in IntelliJ', 'Argumentos en IntelliJ', 'Argumentos no IntelliJ'), same('Run → Edit Configurations… → Program arguments')),
    fc('p1w2-fc-8', 'p1w2-l4-types', 'concept', L('The eight primitive types', 'Los ocho tipos primitivos', 'Os oito tipos primitivos'), same('byte, short, int, long, float, double, char, boolean')),
    fc('p1w2-fc-9', 'p1w2-l4-types', 'distinction', L('Cast vs parse', 'Cast vs conversión de texto', 'Cast vs conversão de texto'), L('`(int) 9.7` converts between number types (9); `Integer.parseInt("9")` converts text.', '`(int) 9.7` convierte entre tipos numéricos (9); `Integer.parseInt("9")` convierte texto.', '`(int) 9.7` converte entre tipos numéricos (9); `Integer.parseInt("9")` converte texto.')),
    fc('p1w2-fc-10', 'p1w2-l5-operators', 'distinction', same('/ vs %'), L('With `int`: `17 / 5` = 3 (quotient), `17 % 5` = 2 (remainder).', 'Con `int`: `17 / 5` = 3 (cociente), `17 % 5` = 2 (resto).', 'Com `int`: `17 / 5` = 3 (quociente), `17 % 5` = 2 (resto).')),
    fc('p1w2-fc-11', 'p1w2-l5-operators', 'distinction', same('= vs =='), L('`=` stores a value; `==` compares and gives a `boolean`.', '`=` guarda un valor; `==` compara y da un `boolean`.', '`=` guarda um valor; `==` compara e dá um `boolean`.')),
  ],
  questions, activities, labs,
  plan: [
    day(1, 40, 'read', L('Lessons 1–3: platform, anatomy, arguments.', 'Lecciones 1–3: plataforma, anatomía, argumentos.', 'Lições 1–3: plataforma, anatomia, argumentos.')),
    day(2, 40, 'practice', L('Lab 1 in the terminal and the IDE.', 'Laboratorio 1 en la terminal y el IDE.', 'Laboratório 1 no terminal e na IDE.')),
    day(3, 40, 'read', L('Lessons 4–5: types and operators, testing in `jshell`.', 'Lecciones 4–5: tipos y operadores, probando en `jshell`.', 'Lições 4–5: tipos e operadores, testando no `jshell`.')),
    day(4, 45, 'practice', L('Lesson 6 and Lab 2.', 'Lección 6 y Laboratorio 2.', 'Lição 6 e Laboratório 2.')),
    day(5, 25, 'review', L('Activities and flashcards.', 'Actividades y tarjetas.', 'Atividades e cartões.')),
    day(6, 25, 'quiz', L('Quiz; run any code question you missed.', 'Cuestionario; ejecuta las preguntas de código que fallaste.', 'Questionário; rode as questões de código que errou.')),
  ],
  resources, stories: [], tools: [], videos: [], documents: [],
};
