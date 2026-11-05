import type { Activity, ExternalResource, Lab, Lesson, Question } from '../types';
import type { WeekContent } from '../weekContent';
import { L, chk, day, ex, fc, fill, heredoc, java, lesson, match, mc, pf, same, text, tf } from '../prog1-week1/h';

const SONG = `public class Song {
    private final String title;
    private final int seconds;

    public Song(String title, int seconds) {
        if (seconds <= 0) {
            throw new IllegalArgumentException("seconds must be positive");
        }
        this.title = title;
        this.seconds = seconds;
    }

    public String getTitle() {
        return title;
    }

    public int getSeconds() {
        return seconds;
    }

    @Override
    public String toString() {
        return String.format("%s (%d:%02d)", title, seconds / 60, seconds % 60);
    }
}`;

const PLAYLIST = `public class Playlist {
    private final String name;
    private final Song[] songs = new Song[50];
    private int size = 0;

    public Playlist(String name) {
        this.name = name;
    }

    public boolean add(Song song) {
        if (size == songs.length) {
            return false;
        }
        songs[size] = song;
        size++;
        return true;
    }

    public int totalSeconds() {
        int total = 0;
        for (int i = 0; i < size; i++) {
            total += songs[i].getSeconds();
        }
        return total;
    }

    public void print() {
        System.out.println(name + " - " + size + " songs");
        for (int i = 0; i < size; i++) {
            System.out.println("  " + (i + 1) + ". " + songs[i]);
        }
        int t = totalSeconds();
        System.out.printf("Total %d:%02d%n", t / 60, t % 60);
    }
}`;

const PLAYLIST_APP = `public class PlaylistApp {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java PlaylistApp <title:seconds> ...");
            return;
        }
        Playlist trip = new Playlist("Road trip");
        for (String arg : args) {
            String[] p = arg.split(":");
            trip.add(new Song(p[0], Integer.parseInt(p[1])));
        }
        trip.print();
    }
}`;

const GRID = `/** A rectangular grid of whole numbers with safe access at the edges. */
public class Grid {
    private final int[][] cells;

    public Grid(int rows, int cols) {
        cells = new int[rows][cols];
    }

    /** Builds a grid from rows separated by '#', e.g. "010#111". */
    public static Grid fromMap(String map) {
        String[] lines = map.split("#", -1);
        int cols = 0;
        for (String line : lines) {
            cols = Math.max(cols, line.length());
        }
        Grid g = new Grid(lines.length, Math.max(cols, 1));
        for (int r = 0; r < lines.length; r++) {
            for (int c = 0; c < lines[r].length(); c++) {
                g.set(r, c, lines[r].charAt(c) - '0');
            }
        }
        return g;
    }

    public int rows() {
        return cells.length;
    }

    public int cols() {
        return cells[0].length;
    }

    public boolean inside(int r, int c) {
        return r >= 0 && r < rows() && c >= 0 && c < cols();
    }

    /** Value at (r, c), or 0 outside the grid. */
    public int get(int r, int c) {
        return inside(r, c) ? cells[r][c] : 0;
    }

    public void set(int r, int c, int value) {
        if (inside(r, c)) {
            cells[r][c] = value;
        }
    }

    /** How many of the 8 neighbours of (r, c) hold the given value. */
    public int countAround(int r, int c, int value) {
        int n = 0;
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if ((dr != 0 || dc != 0) && inside(r + dr, c + dc) && get(r + dr, c + dc) == value) {
                    n++;
                }
            }
        }
        return n;
    }

    /** Next generation: a cell becomes 1 if it is 1 or has 2+ neighbours that are 1. */
    public Grid next() {
        Grid result = new Grid(rows(), cols());
        for (int r = 0; r < rows(); r++) {
            for (int c = 0; c < cols(); c++) {
                boolean on = get(r, c) == 1 || countAround(r, c, 1) >= 2;
                result.set(r, c, on ? 1 : 0);
            }
        }
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int[] row : cells) {
            for (int v : row) {
                sb.append(v == 1 ? "o " : ". ");
            }
            sb.append(System.lineSeparator());
        }
        return sb.toString();
    }
}`;

const GRID_APP = `public class GridApp {
    public static void main(String[] args) {
        String map = args.length > 0 ? args[0] : "0000#0110#0000";
        int steps = args.length > 1 ? Integer.parseInt(args[1]) : 2;
        Grid grid = Grid.fromMap(map);
        for (int s = 0; s <= steps; s++) {
            System.out.println("Generation " + s);
            System.out.print(grid);
            grid = grid.next();
        }
    }
}`;

const lessons: Lesson[] = [
  lesson('p1w6-l1-why', L('Why objects? Modular vs object-oriented', '¿Por qué objetos? Modular frente a orientado a objetos', 'Por que objetos? Modular versus orientado a objetos'), 15,
    text(L('The same library app, organised two ways.', 'La misma aplicación de biblioteca, organizada de dos formas.', 'O mesmo aplicativo de biblioteca, organizado de dois jeitos.'),
      `Modular (procedural)                Object-oriented
---------------------------------   ---------------------------------
String[] titles; boolean[] lent;    class Book {
static void lend(int i) { ... }        String title; boolean lent;
static void giveBack(int i) {...}      void lend() { ... }
static void print(int i) { ... }       void giveBack() { ... }
data and functions are separate      }
                                    data and behaviour travel together`),
    [
      L('Modular code keeps data in variables and arrays and passes them to methods. It works well for small programs, but as they grow, many methods touch the same arrays and one change can break code far away.',
        'El código modular guarda los datos en variables y arreglos y los pasa a métodos. Funciona bien en programas pequeños, pero al crecer, muchos métodos tocan los mismos arreglos y un cambio puede romper código lejano.',
        'O código modular guarda os dados em variáveis e arrays e os passa para métodos. Funciona bem em programas pequenos, mas quando eles crescem muitos métodos mexem nos mesmos arrays e uma mudança pode quebrar código distante.'),
      L('**Object-oriented programming** (OOP) groups the data and the operations on it into **objects**. A book knows its title and whether it is lent, and only its own methods change that. Code mirrors the problem: students, songs, orders, buses.',
        'La **programación orientada a objetos** (POO) agrupa los datos y sus operaciones en **objetos**. Un libro conoce su título y si está prestado, y solo sus propios métodos lo cambian. El código refleja el problema: estudiantes, canciones, pedidos, buses.',
        'A **programação orientada a objetos** (POO) agrupa os dados e as operações sobre eles em **objetos**. Um livro sabe seu título e se está emprestado, e só os métodos dele mudam isso. O código espelha o problema: alunos, músicas, pedidos, ônibus.'),
      L('OOP makes large programs easier to change, reuse, and test, but it adds more files and some ceremony, and it is not always faster. To think in objects, read the problem statement: nouns suggest classes and fields, verbs suggest methods.',
        'La POO facilita cambiar, reutilizar y probar programas grandes, pero agrega más archivos y algo de ceremonia, y no siempre es más rápida. Para pensar en objetos, lee el enunciado: los sustantivos sugieren clases y campos, y los verbos, métodos.',
        'A POO facilita mudar, reutilizar e testar programas grandes, mas acrescenta mais arquivos e alguma cerimônia, e nem sempre é mais rápida. Para pensar em objetos, leia o enunciado: substantivos sugerem classes e campos, verbos sugerem métodos.'),
    ],
    L('Modular code is a shared toolbox in the middle of the room; OOP gives every appliance its own buttons, so nobody opens the washing machine to change the oven’s temperature.',
      'El código modular es una caja de herramientas compartida en medio del cuarto; la POO le da a cada aparato sus propios botones, así nadie abre la lavadora para cambiar la temperatura del horno.',
      'O código modular é uma caixa de ferramentas compartilhada no meio da sala; a POO dá a cada aparelho seus próprios botões, assim ninguém abre a máquina de lavar para mudar a temperatura do forno.'),
    [L('Objects bundle data with the methods that use it.', 'Los objetos agrupan los datos con los métodos que los usan.', 'Objetos agrupam os dados com os métodos que os usam.'),
      L('Nouns → classes and fields; verbs → methods.', 'Sustantivos → clases y campos; verbos → métodos.', 'Substantivos → classes e campos; verbos → métodos.')],
    chk(L('In “a member borrows a book and returns it later”, which are likely classes?', 'En “un socio pide prestado un libro y lo devuelve después”, ¿qué serían probablemente clases?', 'Em “um sócio pega um livro emprestado e o devolve depois”, o que provavelmente são classes?'),
      [L('borrows, returns', 'pide prestado, devuelve', 'pega emprestado, devolve'), L('Member, Book', 'Socio, Libro', 'Sócio, Livro'), L('later', 'después', 'depois')], 1,
      L('Nouns become classes; the verbs become their methods.', 'Los sustantivos son clases; los verbos, sus métodos.', 'Substantivos viram classes; os verbos, seus métodos.')),
    [pf(L('Making a class for every word, even “later”.', 'Hacer una clase por cada palabra, incluso “después”.', 'Fazer uma classe para cada palavra, até “depois”.'),
      L('A class needs its own data and behaviour; otherwise it is a field or a method.', 'Una clase necesita datos y comportamiento propios; si no, es un campo o un método.', 'Uma classe precisa de dados e comportamento próprios; senão é um campo ou um método.'))],
    [ex('p1w6-ex-1-1', 1, L('Find the objects', 'Encuentra los objetos', 'Ache os objetos'),
      L('“A gym has members. Each member books classes; a class has a coach and a maximum of 20 people.” List classes, fields, and methods.', '“Un gimnasio tiene socios. Cada socio reserva clases; una clase tiene un entrenador y un máximo de 20 personas.” Enumera clases, campos y métodos.', '“Uma academia tem sócios. Cada sócio reserva aulas; uma aula tem um instrutor e no máximo 20 pessoas.” Liste classes, campos e métodos.'),
      L('Nouns and verbs.', 'Sustantivos y verbos.', 'Substantivos e verbos.'),
      L('Classes: Gym, Member, FitnessClass, Coach. Fields: members, coach, capacity = 20, bookings. Methods: `book(member)`, `isFull()`.', 'Clases: Gym, Member, FitnessClass, Coach. Campos: socios, entrenador, capacidad = 20, reservas. Métodos: `book(member)`, `isFull()`.', 'Classes: Gym, Member, FitnessClass, Coach. Campos: sócios, instrutor, capacidade = 20, reservas. Métodos: `book(member)`, `isFull()`.')),
    ex('p1w6-ex-1-2', 2, L('Pros and cons', 'Ventajas y desventajas', 'Prós e contras'),
      L('Give one advantage and one drawback of OOP for a 30-line script.', 'Da una ventaja y una desventaja de la POO para un script de 30 líneas.', 'Dê uma vantagem e uma desvantagem da POO para um script de 30 linhas.'),
      L('Think about size.', 'Piensa en el tamaño.', 'Pense no tamanho.'),
      L('Advantage: clearer names and reusable pieces. Drawback: extra classes and files that a tiny script does not need.', 'Ventaja: nombres más claros y piezas reutilizables. Desventaja: clases y archivos extra que un script pequeño no necesita.', 'Vantagem: nomes mais claros e peças reutilizáveis. Desvantagem: classes e arquivos extras de que um script pequeno não precisa.'))]),

  lesson('p1w6-l2-objects', L('Classes and objects: state, behaviour, identity', 'Clases y objetos: estado, comportamiento, identidad', 'Classes e objetos: estado, comportamento, identidade'), 20,
    java(L('One class, several objects. Each keeps its own state.', 'Una clase, varios objetos. Cada uno guarda su propio estado.', 'Uma classe, vários objetos. Cada um guarda seu próprio estado.'),
      `class Song {
    String title;          // state: fields
    int seconds;
    int plays;

    void play() {          // behaviour: methods
        plays++;
        System.out.println("Playing " + title);
    }
}

public class Radio {
    public static void main(String[] args) {
        Song a = new Song();       // a new object on the heap
        a.title = "Sunrise";
        a.seconds = 210;
        Song b = new Song();       // a second, independent object
        b.title = "Sunrise";
        a.play();
        a.play();
        System.out.println(a.plays + " " + b.plays); // 2 0
        System.out.println(a == b);                  // false: two objects
        Song c = a;                                  // same object as a
        c.play();
        System.out.println(a.plays);                 // 3
    }
}`),
    [
      L('A **class** is a template; an **object** (or **instance**) is one thing built from it with `new`. Every object has **state** (the values of its fields), **behaviour** (its methods), and **identity** (it is itself, even if another object has equal values).',
        'Una **clase** es una plantilla; un **objeto** (o **instancia**) es una cosa construida a partir de ella con `new`. Todo objeto tiene **estado** (los valores de sus campos), **comportamiento** (sus métodos) e **identidad** (es él mismo, aunque otro objeto tenga valores iguales).',
        'Uma **classe** é um molde; um **objeto** (ou **instância**) é uma coisa construída a partir dela com `new`. Todo objeto tem **estado** (os valores dos campos), **comportamento** (os métodos) e **identidade** (é ele mesmo, mesmo que outro objeto tenha valores iguais).'),
      L('A variable of a class type holds a **reference** to the object, like an array variable. `Song c = a;` copies the reference, not the object, so `c.play()` changes the same song. `a == b` compares identity; to compare contents, a class defines an `equals` method.',
        'Una variable de tipo clase guarda una **referencia** al objeto, igual que una variable de arreglo. `Song c = a;` copia la referencia, no el objeto, así que `c.play()` cambia la misma canción. `a == b` compara identidad; para comparar contenidos, la clase define un método `equals`.',
        'Uma variável de tipo classe guarda uma **referência** ao objeto, como uma variável de array. `Song c = a;` copia a referência, não o objeto, então `c.play()` muda a mesma música. `a == b` compara identidade; para comparar conteúdo, a classe define um método `equals`.'),
      L('Inside the class, methods use fields directly. Outside, you use the dot: `a.title`, `a.play()`. A variable that refers to nothing holds `null`; calling a method on it throws `NullPointerException`.',
        'Dentro de la clase, los métodos usan los campos directamente. Afuera se usa el punto: `a.title`, `a.play()`. Una variable que no apunta a nada vale `null`; llamar a un método sobre ella lanza `NullPointerException`.',
        'Dentro da classe, os métodos usam os campos diretamente. Fora, usa-se o ponto: `a.title`, `a.play()`. Uma variável que não aponta para nada vale `null`; chamar um método nela lança `NullPointerException`.'),
    ],
    L('A class is a cookie cutter and objects are the cookies: same shape, but each cookie gets its own icing, and eating one does not eat the others.',
      'Una clase es un molde de galletas y los objetos son las galletas: misma forma, pero cada una tiene su propia cobertura, y comerte una no se come las demás.',
      'Uma classe é um cortador de biscoito e os objetos são os biscoitos: mesma forma, mas cada um tem sua cobertura, e comer um não come os outros.'),
    [L('Class = template; object = instance made with `new`.', 'Clase = plantilla; objeto = instancia creada con `new`.', 'Classe = molde; objeto = instância criada com `new`.'),
      L('Variables hold references; `==` compares identity.', 'Las variables guardan referencias; `==` compara identidad.', 'Variáveis guardam referências; `==` compara identidade.')],
    chk(L('What would `System.out.println(b.plays)` print at the end of `Radio`?', '¿Qué imprimiría `System.out.println(b.plays)` al final de `Radio`?', 'O que `System.out.println(b.plays)` imprimiria no fim de `Radio`?'),
      [same('0'), same('2'), same('3')], 0,
      L('`b` is a separate object that was never played.', '`b` es un objeto aparte que nunca se reprodujo.', '`b` é um objeto separado que nunca tocou.')),
    [pf(L('Thinking `Song c = a;` makes a copy.', 'Creer que `Song c = a;` hace una copia.', 'Achar que `Song c = a;` faz uma cópia.'),
      L('It copies the reference; use `new` to get a second object.', 'Copia la referencia; usa `new` para tener un segundo objeto.', 'Copia a referência; use `new` para ter um segundo objeto.'))],
    [ex('p1w6-ex-2-1', 1, L('A class of your own', 'Una clase propia', 'Uma classe sua'),
      L('Write a class `Counter` with a field `count` and a method `click()` that adds 1. Create two counters and click one twice.', 'Escribe una clase `Counter` con un campo `count` y un método `click()` que suma 1. Crea dos contadores y pulsa uno dos veces.', 'Escreva uma classe `Counter` com um campo `count` e um método `click()` que soma 1. Crie dois contadores e clique um duas vezes.'),
      L('Each object keeps its own `count`.', 'Cada objeto guarda su propio `count`.', 'Cada objeto guarda seu próprio `count`.'),
      same('`class Counter { int count; void click() { count++; } }` … `Counter a = new Counter(), b = new Counter(); a.click(); a.click();` → `a.count` = 2, `b.count` = 0.')),
    ex('p1w6-ex-2-2', 2, L('Null trouble', 'Problemas con null', 'Problemas com null'),
      L('`Song s = null; s.play();` What happens and how do you prevent it?', '`Song s = null; s.play();` ¿Qué pasa y cómo se evita?', '`Song s = null; s.play();` O que acontece e como evitar?'),
      L('There is no object yet.', 'Todavía no hay objeto.', 'Ainda não há objeto.'),
      L('`NullPointerException`. Create the object with `new` first, or check `if (s != null)`.', '`NullPointerException`. Crea antes el objeto con `new` o revisa `if (s != null)`.', '`NullPointerException`. Crie antes o objeto com `new` ou confira `if (s != null)`.'))]),

  lesson('p1w6-l3-constructors', L('Constructors and this', 'Constructores y this', 'Construtores e this'), 15,
    java(L('Constructors give every object a valid starting state.', 'Los constructores dan a cada objeto un estado inicial válido.', 'Os construtores dão a cada objeto um estado inicial válido.'),
      `class Thermostat {
    String room;
    double target;

    Thermostat(String room, double target) {  // same name as the class, no return type
        this.room = room;                     // this.room is the field
        this.target = target;
    }

    Thermostat(String room) {                 // overloaded constructor
        this(room, 21.0);                     // reuse the other one
    }

    void raise(double degrees) {
        target += degrees;
    }

    @Override
    public String toString() {
        return room + " at " + target + " C";
    }
}

public class Home {
    public static void main(String[] args) {
        Thermostat kitchen = new Thermostat("kitchen", 19.5);
        Thermostat office = new Thermostat("office");
        office.raise(1.5);
        System.out.println(kitchen);   // kitchen at 19.5 C
        System.out.println(office);    // office at 22.5 C
    }
}`),
    [
      L('A **constructor** runs when you write `new`. It has the class name and no return type, and its job is to fill the fields so the object starts valid. If you write none, Java adds an empty one; once you write one, that default disappears.',
        'Un **constructor** se ejecuta al escribir `new`. Lleva el nombre de la clase y no tiene tipo de retorno; su trabajo es llenar los campos para que el objeto empiece en un estado válido. Si no escribes ninguno, Java agrega uno vacío; en cuanto escribes uno, ese desaparece.',
        'Um **construtor** roda quando você escreve `new`. Tem o nome da classe e nenhum tipo de retorno, e seu trabalho é preencher os campos para o objeto começar válido. Se você não escrever nenhum, Java acrescenta um vazio; quando você escreve um, esse some.'),
      L('`this` means “the current object”. When a parameter has the same name as a field, `this.room = room;` copies the parameter into the field. `this(…)` on the first line calls another constructor of the same class, so defaults live in one place.',
        '`this` significa “el objeto actual”. Cuando un parámetro se llama igual que un campo, `this.room = room;` copia el parámetro en el campo. `this(…)` en la primera línea llama a otro constructor de la misma clase, así los valores por defecto viven en un solo lugar.',
        '`this` significa “o objeto atual”. Quando um parâmetro tem o mesmo nome de um campo, `this.room = room;` copia o parâmetro para o campo. `this(…)` na primeira linha chama outro construtor da mesma classe, assim os padrões ficam num só lugar.'),
      L('Override `toString()` to describe the object as text: `println(kitchen)` calls it automatically. Without it, Java prints something like `Thermostat@1b6d3586`.',
        'Sobrescribe `toString()` para describir el objeto como texto: `println(kitchen)` lo llama automáticamente. Sin él, Java imprime algo como `Thermostat@1b6d3586`.',
        'Sobrescreva `toString()` para descrever o objeto como texto: `println(kitchen)` o chama automaticamente. Sem ele, Java imprime algo como `Thermostat@1b6d3586`.'),
    ],
    L('A constructor is the setup screen of a new phone: before you use it, it asks for a language and a name, so it never starts half-configured.',
      'Un constructor es la pantalla de configuración de un celular nuevo: antes de usarlo te pide idioma y nombre, así nunca arranca a medio configurar.',
      'Um construtor é a tela de configuração de um celular novo: antes de usar, ele pede idioma e nome, então nunca começa meio configurado.'),
    [L('Constructor: class name, no return type, runs with `new`.', 'Constructor: nombre de la clase, sin tipo de retorno, se ejecuta con `new`.', 'Construtor: nome da classe, sem tipo de retorno, roda com `new`.'),
      L('`this.field = param`; `toString()` describes the object.', '`this.campo = parámetro`; `toString()` describe el objeto.', '`this.campo = parâmetro`; `toString()` descreve o objeto.')],
    chk(L('In the constructor, what happens if you write `room = room;` instead of `this.room = room;`?', 'En el constructor, ¿qué pasa si escribes `room = room;` en lugar de `this.room = room;`?', 'No construtor, o que acontece se você escrever `room = room;` em vez de `this.room = room;`?'),
      [L('Same result', 'El mismo resultado', 'O mesmo resultado'), L('The field stays `null`; the parameter is assigned to itself', 'El campo queda en `null`; el parámetro se asigna a sí mismo', 'O campo fica `null`; o parâmetro é atribuído a si mesmo'), L('Compile error', 'Error de compilación', 'Erro de compilação')], 1,
      L('Inside the constructor, `room` alone means the parameter.', 'Dentro del constructor, `room` a secas es el parámetro.', 'Dentro do construtor, `room` sozinho é o parâmetro.')),
    [pf(L('Writing `void Thermostat(…)`.', 'Escribir `void Thermostat(…)`.', 'Escrever `void Thermostat(…)`.'),
      L('With a return type it is an ordinary method, not a constructor. Remove `void`.', 'Con tipo de retorno es un método común, no un constructor. Quita `void`.', 'Com tipo de retorno é um método comum, não um construtor. Tire o `void`.'))],
    [ex('p1w6-ex-3-1', 1, L('Write a constructor', 'Escribe un constructor', 'Escreva um construtor'),
      L('Class `Course` with `name` and `credits`. Write a constructor with both, and one with only `name` that uses 4 credits.', 'Clase `Course` con `name` y `credits`. Escribe un constructor con ambos y otro solo con `name` que use 4 créditos.', 'Classe `Course` com `name` e `credits`. Escreva um construtor com os dois e outro só com `name` que use 4 créditos.'),
      L('Use `this(…)`.', 'Usa `this(…)`.', 'Use `this(…)`.'),
      same('`Course(String name, int credits) { this.name = name; this.credits = credits; } Course(String name) { this(name, 4); }`')),
    ex('p1w6-ex-3-2', 2, L('A useful toString', 'Un toString útil', 'Um toString útil'),
      L('Give `Course` a `toString()` that returns `Physics (4 credits)`.', 'Dale a `Course` un `toString()` que devuelva `Physics (4 credits)`.', 'Dê a `Course` um `toString()` que devolva `Physics (4 credits)`.'),
      L('Return a string; do not print.', 'Devuelve un string; no imprimas.', 'Devolva uma string; não imprima.'),
      same('`@Override public String toString() { return name + " (" + credits + " credits)"; }`'))]),

  lesson('p1w6-l4-encapsulation', L('Encapsulation: private fields, getters, and setters', 'Encapsulamiento: campos privados, getters y setters', 'Encapsulamento: campos privados, getters e setters'), 20,
    java(L('A gift card protects its balance with rules.', 'Una tarjeta de regalo protege su saldo con reglas.', 'Um cartão-presente protege o saldo com regras.'),
      `class GiftCard {
    private final String code;     // private: only GiftCard can touch it
    private double balance;

    GiftCard(String code, double balance) {
        if (balance < 0) {
            throw new IllegalArgumentException("negative balance");
        }
        this.code = code;
        this.balance = balance;
    }

    public String getCode() {       // accessor (getter)
        return code;
    }

    public double getBalance() {
        return balance;
    }

    public boolean spend(double amount) {   // mutator with a rule
        if (amount <= 0 || amount > balance) {
            return false;
        }
        balance -= amount;
        return true;
    }
}

public class Shop {
    public static void main(String[] args) {
        GiftCard card = new GiftCard("GC-204", 50);
        System.out.println(card.spend(30));     // true
        System.out.println(card.spend(30));     // false: only 20 left
        System.out.println(card.getBalance());  // 20.0
        // card.balance = 1000;                 // compile error: private
    }
}`),
    [
      L('**Encapsulation** hides an object’s fields and lets the outside change them only through methods that enforce the rules. Mark fields `private`; then no other class can set a negative balance or an empty name by accident.',
        'El **encapsulamiento** oculta los campos de un objeto y solo permite cambiarlos desde afuera mediante métodos que hacen cumplir las reglas. Marca los campos como `private`; así ninguna otra clase puede poner por error un saldo negativo o un nombre vacío.',
        'O **encapsulamento** esconde os campos de um objeto e só deixa mudá-los de fora por métodos que fazem cumprir as regras. Marque os campos como `private`; assim nenhuma outra classe põe por engano um saldo negativo ou um nome vazio.'),
      L('An **accessor** (getter, `getBalance()`) returns a value. A **mutator** (setter or action, `spend(amount)`) changes state after checking the rule. Do not add a setter for every field: offer only the operations the object should allow. `final` fields can never change.',
        'Un **método de acceso** (getter, `getBalance()`) devuelve un valor. Un **modificador** (setter o acción, `spend(amount)`) cambia el estado tras revisar la regla. No agregues un setter para cada campo: ofrece solo las operaciones que el objeto debe permitir. Los campos `final` nunca cambian.',
        'Um **método de acesso** (getter, `getBalance()`) devolve um valor. Um **modificador** (setter ou ação, `spend(amount)`) muda o estado depois de conferir a regra. Não crie um setter para cada campo: ofereça só as operações que o objeto deve permitir. Campos `final` nunca mudam.'),
      L('A constructor that receives impossible values can refuse to build the object with `throw new IllegalArgumentException(…)`. The access modifiers are `private` (this class), no modifier (this package), and `public` (everyone).',
        'Un constructor que recibe valores imposibles puede negarse a construir el objeto con `throw new IllegalArgumentException(…)`. Los modificadores de acceso son `private` (esta clase), sin modificador (este paquete) y `public` (todos).',
        'Um construtor que recebe valores impossíveis pode se recusar a construir o objeto com `throw new IllegalArgumentException(…)`. Os modificadores de acesso são `private` (esta classe), sem modificador (este pacote) e `public` (todos).'),
    ],
    L('Encapsulation is a cash machine: you cannot open it and grab notes; you press buttons, and it checks your balance before giving anything out.',
      'El encapsulamiento es un cajero automático: no puedes abrirlo y sacar billetes; aprietas botones y él revisa tu saldo antes de entregar algo.',
      'O encapsulamento é um caixa eletrônico: você não pode abri-lo e pegar notas; aperta botões e ele confere seu saldo antes de entregar qualquer coisa.'),
    [L('Fields `private`; access through methods that check rules.', 'Campos `private`; acceso mediante métodos que revisan reglas.', 'Campos `private`; acesso por métodos que conferem regras.'),
      L('Getters read; mutators change after validating.', 'Los getters leen; los modificadores cambian tras validar.', 'Getters leem; modificadores mudam depois de validar.')],
    chk(L('What is the main benefit of a private `balance` with a `spend` method?', '¿Cuál es el principal beneficio de un `balance` privado con un método `spend`?', 'Qual é o principal benefício de um `balance` privado com um método `spend`?'),
      [L('The program runs faster', 'El programa corre más rápido', 'O programa roda mais rápido'), L('No code can break the rule “balance never below 0”', 'Ningún código puede romper la regla “el saldo nunca baja de 0”', 'Nenhum código consegue quebrar a regra “o saldo nunca fica abaixo de 0”'), L('It saves memory', 'Ahorra memoria', 'Economiza memória')], 1,
      L('Every change goes through `spend`, which checks the rule.', 'Todo cambio pasa por `spend`, que revisa la regla.', 'Toda mudança passa por `spend`, que confere a regra.')),
    [pf(L('Public fields “because it is quicker”.', 'Campos públicos “porque es más rápido”.', 'Campos públicos “porque é mais rápido”.'),
      L('Any line anywhere can then break the object; make them private.', 'Así cualquier línea en cualquier lugar puede romper el objeto; hazlos privados.', 'Aí qualquer linha em qualquer lugar pode quebrar o objeto; deixe-os privados.'))],
    [ex('p1w6-ex-4-1', 1, L('Top up', 'Recarga', 'Recarga'),
      L('Add `boolean topUp(double amount)` to `GiftCard`: only positive amounts, and the balance may not exceed 500.', 'Agrega `boolean topUp(double amount)` a `GiftCard`: solo montos positivos y el saldo no puede pasar de 500.', 'Acrescente `boolean topUp(double amount)` a `GiftCard`: só valores positivos e o saldo não pode passar de 500.'),
      L('Check, then change, then return `true`.', 'Revisa, cambia y devuelve `true`.', 'Confira, mude e devolva `true`.'),
      same('`if (amount <= 0 || balance + amount > 500) { return false; } balance += amount; return true;`')),
    ex('p1w6-ex-4-2', 2, L('Validated setter', 'Setter validado', 'Setter validado'),
      L('A class `Player` has a private `int level` from 1 to 99. Write `setLevel` that ignores invalid values and returns whether it changed.', 'Una clase `Player` tiene un `int level` privado de 1 a 99. Escribe `setLevel` que ignore valores inválidos y devuelva si cambió.', 'Uma classe `Player` tem um `int level` privado de 1 a 99. Escreva `setLevel` que ignore valores inválidos e devolva se mudou.'),
      L('Same pattern as `spend`.', 'El mismo patrón que `spend`.', 'O mesmo padrão de `spend`.'),
      same('`public boolean setLevel(int level) { if (level < 1 || level > 99) { return false; } this.level = level; return true; }`'))]),

  lesson('p1w6-l5-static', L('Static vs instance, and programs with several files', 'Static frente a instancia, y programas con varios archivos', 'Static versus instância, e programas com vários arquivos'), 20,
    java(L('A shared counter numbers every order. Run: `java Kitchen soup salad arepa`.', 'Un contador compartido numera cada pedido. Ejecuta: `java Kitchen soup salad arepa`.', 'Um contador compartilhado numera cada pedido. Rode: `java Kitchen soup salad arepa`.'),
      `class Order {
    private static int nextNumber = 1;  // one copy, shared by all orders
    private final int number;           // one copy per order
    private final String dish;

    Order(String dish) {
        this.dish = dish;
        this.number = nextNumber;
        nextNumber++;
    }

    static int created() {              // static: called on the class
        return nextNumber - 1;
    }

    @Override
    public String toString() {
        return "#" + number + " " + dish;
    }
}

public class Kitchen {
    public static void main(String[] args) {
        for (String dish : args) {
            System.out.println(new Order(dish));
        }
        System.out.println(Order.created() + " orders today");
    }
}`),
    [
      L('An **instance** field belongs to each object (every order has its own `number`). A `static` field belongs to the class: one copy shared by all objects (`nextNumber`). A static method is called on the class (`Order.created()`, `Math.max`) and cannot use instance fields.',
        'Un campo de **instancia** pertenece a cada objeto (cada pedido tiene su propio `number`). Un campo `static` pertenece a la clase: una sola copia compartida por todos los objetos (`nextNumber`). Un método estático se llama sobre la clase (`Order.created()`, `Math.max`) y no puede usar campos de instancia.',
        'Um campo de **instância** pertence a cada objeto (cada pedido tem seu próprio `number`). Um campo `static` pertence à classe: uma única cópia compartilhada por todos os objetos (`nextNumber`). Um método estático é chamado na classe (`Order.created()`, `Math.max`) e não pode usar campos de instância.'),
      L('That is why `main` is static: the JVM calls it before any object exists. Until now your helper methods were static; from now on, methods that work with an object’s data are instance methods.',
        'Por eso `main` es estático: la JVM lo llama antes de que exista algún objeto. Hasta ahora tus métodos auxiliares eran estáticos; desde ahora, los métodos que trabajan con los datos de un objeto son de instancia.',
        'Por isso o `main` é estático: a JVM o chama antes de existir qualquer objeto. Até agora seus métodos auxiliares eram estáticos; daqui em diante, métodos que trabalham com os dados de um objeto são de instância.'),
      L('Real programs put each `public class` in its own file: `Order.java`, `Kitchen.java`. Compile them together with `javac *.java` and run the class that has `main`: `java Kitchen soup salad`. In an IDE, keep the files in `src` and set the main class and program arguments in the run configuration.',
        'Los programas reales ponen cada `public class` en su propio archivo: `Order.java`, `Kitchen.java`. Compílalos juntos con `javac *.java` y ejecuta la clase que tiene `main`: `java Kitchen soup salad`. En un IDE, deja los archivos en `src` y define la clase principal y los argumentos en la configuración de ejecución.',
        'Programas reais põem cada `public class` em seu próprio arquivo: `Order.java`, `Kitchen.java`. Compile juntos com `javac *.java` e rode a classe que tem o `main`: `java Kitchen soup salad`. Numa IDE, deixe os arquivos em `src` e defina a classe principal e os argumentos na configuração de execução.'),
    ],
    L('A static field is the ticket dispenser at a bakery counter, shared by everyone; an instance field is the number printed on your own ticket.',
      'Un campo estático es el dispensador de turnos de una panadería, compartido por todos; un campo de instancia es el número impreso en tu propio turno.',
      'Um campo estático é o dispensador de senhas de uma padaria, compartilhado por todos; um campo de instância é o número impresso na sua senha.'),
    [L('Instance: one per object. Static: one per class.', 'Instancia: uno por objeto. Estático: uno por clase.', 'Instância: um por objeto. Estático: um por classe.'),
      L('One public class per file; `javac *.java`, then `java Main`.', 'Una clase pública por archivo; `javac *.java` y luego `java Main`.', 'Uma classe pública por arquivo; `javac *.java` e depois `java Main`.')],
    chk(L('What does `java Kitchen soup salad arepa` print last?', '¿Qué imprime al final `java Kitchen soup salad arepa`?', 'O que `java Kitchen soup salad arepa` imprime por último?'),
      [same('`1 orders today`'), same('`3 orders today`'), same('`#3 arepa`')], 1,
      L('The shared counter reached 4, so `created()` returns 3.', 'El contador compartido llegó a 4, así que `created()` devuelve 3.', 'O contador compartilhado chegou a 4, então `created()` devolve 3.')),
    [pf(L('Making every field static “so main can use it”.', 'Hacer estáticos todos los campos “para que main pueda usarlos”.', 'Deixar todos os campos estáticos “para o main poder usar”.'),
      L('Then all objects share one value. Create an object and call its methods.', 'Entonces todos los objetos comparten un valor. Crea un objeto y llama a sus métodos.', 'Aí todos os objetos dividem um valor. Crie um objeto e chame os métodos dele.'))],
    [ex('p1w6-ex-5-1', 1, L('Static or instance?', '¿Estático o de instancia?', 'Estático ou de instância?'),
      L('For a class `Student`: name, total number of students created, average grade, the school’s maximum grade (20).', 'Para una clase `Student`: nombre, total de estudiantes creados, nota promedio, nota máxima del colegio (20).', 'Para uma classe `Student`: nome, total de alunos criados, nota média, nota máxima da escola (20).'),
      L('Is it per student or shared?', '¿Es por estudiante o compartido?', 'É por aluno ou compartilhado?'),
      L('Instance: name, average. Static: total created; `static final int MAX_GRADE = 20`.', 'De instancia: nombre, promedio. Estático: total creado; `static final int MAX_GRADE = 20`.', 'Instância: nome, média. Estático: total criado; `static final int MAX_GRADE = 20`.')),
    ex('p1w6-ex-5-2', 2, L('Two files', 'Dos archivos', 'Dois arquivos'),
      L('Split `Kitchen` into `Order.java` and `Kitchen.java`. Which commands compile and run it?', 'Divide `Kitchen` en `Order.java` y `Kitchen.java`. ¿Qué comandos lo compilan y ejecutan?', 'Divida `Kitchen` em `Order.java` e `Kitchen.java`. Que comandos compilam e rodam?'),
      L('Make `Order` public in its own file.', 'Haz pública a `Order` en su propio archivo.', 'Deixe `Order` pública no próprio arquivo.'),
      same('`javac Order.java Kitchen.java` (or `javac *.java`), then `java Kitchen soup salad`.'))]),

  lesson('p1w6-l6-pillars', L('The four pillars: abstraction, encapsulation, inheritance, polymorphism', 'Los cuatro pilares: abstracción, encapsulamiento, herencia y polimorfismo', 'Os quatro pilares: abstração, encapsulamento, herança e polimorfismo'), 20,
    java(L('Every vehicle quotes a fare its own way. Run: `java Trips 5`.', 'Cada vehículo calcula la tarifa a su manera. Ejecuta: `java Trips 5`.', 'Cada veículo calcula a tarifa do seu jeito. Rode: `java Trips 5`.'),
      `abstract class Vehicle {                  // abstraction: what all vehicles share
    private final String id;              // encapsulation
    Vehicle(String id) {
        this.id = id;
    }
    String getId() {
        return id;
    }
    abstract double fare(int km);         // each kind decides how
}

class Bike extends Vehicle {              // inheritance: a Bike is a Vehicle
    Bike(String id) {
        super(id);
    }
    @Override
    double fare(int km) {
        return 1.0 + 0.2 * km;
    }
}

class Taxi extends Vehicle {
    Taxi(String id) {
        super(id);
    }
    @Override
    double fare(int km) {
        return 3.5 + 1.1 * km;
    }
}

public class Trips {
    public static void main(String[] args) {
        int km = args.length > 0 ? Integer.parseInt(args[0]) : 5;
        Vehicle[] fleet = {new Bike("B-1"), new Taxi("T-7")};
        for (Vehicle v : fleet) {         // polymorphism: one call, many behaviours
            System.out.printf("%s: %.2f%n", v.getId(), v.fare(km));
        }
    }
}`),
    [
      L('**Abstraction** shows what an object does and hides how: callers ask any `Vehicle` for `fare(km)`. **Encapsulation** keeps each object’s data private behind methods, as last lesson showed.',
        'La **abstracción** muestra qué hace un objeto y oculta cómo: quien llama le pide a cualquier `Vehicle` su `fare(km)`. El **encapsulamiento** mantiene privados los datos de cada objeto detrás de métodos, como vimos en la lección anterior.',
        'A **abstração** mostra o que um objeto faz e esconde como: quem chama pede a qualquer `Vehicle` sua `fare(km)`. O **encapsulamento** mantém privados os dados de cada objeto atrás de métodos, como na lição anterior.'),
      L('**Inheritance** builds a class from another with `extends`: a `Bike` is a `Vehicle`, gets its fields and methods, and calls the parent constructor with `super(id)`. Use it only for true “is a” relations, not just to reuse a few lines.',
        'La **herencia** construye una clase a partir de otra con `extends`: una `Bike` es un `Vehicle`, recibe sus campos y métodos y llama al constructor del padre con `super(id)`. Úsala solo para relaciones reales de “es un”, no para reutilizar unas pocas líneas.',
        'A **herança** constrói uma classe a partir de outra com `extends`: uma `Bike` é um `Vehicle`, recebe seus campos e métodos e chama o construtor do pai com `super(id)`. Use só em relações reais de “é um”, não para reaproveitar umas poucas linhas.'),
      L('**Polymorphism** means one call behaves differently depending on the object: `v.fare(km)` runs the bike rule or the taxi rule. Subclasses **override** the method (mark it `@Override`). This course only introduces these ideas; Programming 2 goes deeper.',
        'El **polimorfismo** significa que una misma llamada se comporta distinto según el objeto: `v.fare(km)` ejecuta la regla de la bici o la del taxi. Las subclases **sobrescriben** el método (márcalo con `@Override`). Este curso solo presenta estas ideas; Programación 2 las profundiza.',
        'O **polimorfismo** significa que a mesma chamada se comporta diferente conforme o objeto: `v.fare(km)` roda a regra da bicicleta ou a do táxi. As subclasses **sobrescrevem** o método (marque com `@Override`). Este curso só apresenta essas ideias; Programação 2 as aprofunda.'),
    ],
    L('A ride app shows one “price” button (abstraction); each vehicle type computes it its own way (polymorphism); every type is a vehicle with a plate (inheritance); and you cannot edit the meter yourself (encapsulation).',
      'Una aplicación de viajes muestra un solo botón de “precio” (abstracción); cada tipo de vehículo lo calcula a su manera (polimorfismo); todos son vehículos con placa (herencia); y no puedes tocar el taxímetro (encapsulamiento).',
      'Um aplicativo de corridas mostra um só botão de “preço” (abstração); cada tipo de veículo o calcula do seu jeito (polimorfismo); todos são veículos com placa (herança); e você não pode mexer no taxímetro (encapsulamento).'),
    [L('Abstraction: what, not how. Encapsulation: private data.', 'Abstracción: qué, no cómo. Encapsulamiento: datos privados.', 'Abstração: o quê, não como. Encapsulamento: dados privados.'),
      L('Inheritance: `extends` for “is a”. Polymorphism: one call, many behaviours.', 'Herencia: `extends` para “es un”. Polimorfismo: una llamada, muchos comportamientos.', 'Herança: `extends` para “é um”. Polimorfismo: uma chamada, muitos comportamentos.')],
    chk(L('What does `java Trips 10` print for the taxi?', '¿Qué imprime `java Trips 10` para el taxi?', 'O que `java Trips 10` imprime para o táxi?'),
      [same('`T-7: 3.00`'), same('`T-7: 14.50`'), same('`T-7: 11.00`')], 1,
      L('3.5 + 1.1 × 10 = 14.5; the taxi’s own `fare` runs.', '3,5 + 1,1 × 10 = 14,5; se ejecuta el `fare` propio del taxi.', '3,5 + 1,1 × 10 = 14,5; roda a `fare` própria do táxi.')),
    [pf(L('Inheriting just to reuse code (“a Song extends Playlist”).', 'Heredar solo para reutilizar código (“una Song extends Playlist”).', 'Herdar só para reaproveitar código (“uma Song extends Playlist”).'),
      L('A song is not a playlist; give the playlist a field with songs instead.', 'Una canción no es una lista; mejor dale a la lista un campo con canciones.', 'Uma música não é uma playlist; dê à playlist um campo com músicas.'))],
    [ex('p1w6-ex-6-1', 1, L('Name the pillar', 'Nombra el pilar', 'Diga o pilar'),
      L('(a) `private double balance`; (b) `class Scooter extends Vehicle`; (c) the same `fare` call gives different results; (d) callers do not know how the fare is computed.', '(a) `private double balance`; (b) `class Scooter extends Vehicle`; (c) la misma llamada `fare` da resultados distintos; (d) quien llama no sabe cómo se calcula la tarifa.', '(a) `private double balance`; (b) `class Scooter extends Vehicle`; (c) a mesma chamada `fare` dá resultados diferentes; (d) quem chama não sabe como a tarifa é calculada.'),
      L('One pillar each.', 'Un pilar cada uno.', 'Um pilar cada.'),
      L('(a) encapsulation; (b) inheritance; (c) polymorphism; (d) abstraction.', '(a) encapsulamiento; (b) herencia; (c) polimorfismo; (d) abstracción.', '(a) encapsulamento; (b) herança; (c) polimorfismo; (d) abstração.')),
    ex('p1w6-ex-6-2', 2, L('Add a vehicle', 'Agrega un vehículo', 'Acrescente um veículo'),
      L('Add `Bus`: fixed fare 0.9 whatever the distance. Add it to the fleet.', 'Agrega `Bus`: tarifa fija de 0,9 sin importar la distancia. Súmalo a la flota.', 'Acrescente `Bus`: tarifa fixa de 0,9 qualquer que seja a distância. Inclua na frota.'),
      L('Same shape as `Bike`.', 'La misma forma que `Bike`.', 'O mesmo formato de `Bike`.'),
      same('`class Bus extends Vehicle { Bus(String id) { super(id); } @Override double fare(int km) { return 0.9; } }` and `new Bus("U-3")` in the array.'))]),
];

const questions: Question[] = [
  mc('p1w6-q1', 'scenario', 'p1w6-l1-why', L('A program has 12 methods that all read and write the same 4 arrays, and every change breaks something. What helps most?', 'Un programa tiene 12 métodos que leen y escriben los mismos 4 arreglos, y cada cambio rompe algo. ¿Qué ayuda más?', 'Um programa tem 12 métodos que leem e escrevem os mesmos 4 arrays, e cada mudança quebra algo. O que ajuda mais?'),
    [L('Group data and the methods that use it into classes', 'Agrupar los datos y los métodos que los usan en clases', 'Agrupar os dados e os métodos que os usam em classes'), L('Make all arrays bigger', 'Agrandar todos los arreglos', 'Aumentar todos os arrays'), L('Put everything in `main`', 'Poner todo en `main`', 'Pôr tudo no `main`')], 0,
    L('Objects own their data, so changes stay local.', 'Los objetos son dueños de sus datos, así los cambios quedan localizados.', 'Objetos são donos dos seus dados, então as mudanças ficam localizadas.')),
  mc('p1w6-q2', 'code', 'p1w6-l2-objects', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('5 5'), same('5 0'), same('0 5')], 0,
    L('`b = a` copies the reference: both names point to one object.', '`b = a` copia la referencia: ambos nombres apuntan a un objeto.', '`b = a` copia a referência: os dois nomes apontam para um objeto.'),
    'class Box {\n    int items;\n}\npublic class Q {\n    public static void main(String[] args) {\n        Box a = new Box();\n        Box b = a;\n        b.items = 5;\n        System.out.println(a.items + " " + b.items);\n    }\n}'),
  tf('p1w6-q3', 'p1w6-l3-constructors', L('A constructor must declare the return type `void`.', 'Un constructor debe declarar el tipo de retorno `void`.', 'Um construtor deve declarar o tipo de retorno `void`.'), false,
    L('Constructors have no return type at all.', 'Los constructores no tienen ningún tipo de retorno.', 'Construtores não têm tipo de retorno nenhum.')),
  fill('p1w6-q4', 'fill-blank', 'p1w6-l3-constructors', L('Inside a method, the keyword that means “the current object” is ____.', 'Dentro de un método, la palabra clave que significa “el objeto actual” es ____.', 'Dentro de um método, a palavra-chave que significa “o objeto atual” é ____.'), ['this'],
    L('`this.room = room;` assigns the field from the parameter.', '`this.room = room;` asigna el campo desde el parámetro.', '`this.room = room;` atribui o campo a partir do parâmetro.')),
  mc('p1w6-q5', 'troubleshooting', 'p1w6-l4-encapsulation', L('`card.balance = 1000;` gives “balance has private access in GiftCard”. What should the caller do?', '`card.balance = 1000;` da “balance has private access in GiftCard”. ¿Qué debe hacer quien llama?', '`card.balance = 1000;` dá “balance has private access in GiftCard”. O que quem chama deve fazer?'),
    [L('Make `balance` public', 'Hacer público `balance`', 'Deixar `balance` público'), L('Use the class’s methods, such as `topUp` or `spend`', 'Usar los métodos de la clase, como `topUp` o `spend`', 'Usar os métodos da classe, como `topUp` ou `spend`'), L('Remove `private` from all fields', 'Quitar `private` de todos los campos', 'Tirar `private` de todos os campos')], 1,
    L('The error is the protection working; go through the methods that enforce the rules.', 'El error es la protección funcionando; usa los métodos que hacen cumplir las reglas.', 'O erro é a proteção funcionando; use os métodos que fazem cumprir as regras.')),
  mc('p1w6-q6', 'code', 'p1w6-l5-static', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('1 1'), same('2 2'), same('1 2')], 1,
    L('`made` is static: both objects share it, so it reaches 2.', '`made` es estático: ambos objetos lo comparten y llega a 2.', '`made` é estático: os dois objetos o compartilham e ele chega a 2.'),
    'class Ticket {\n    static int made = 0;\n    Ticket() {\n        made++;\n    }\n}\npublic class Q {\n    public static void main(String[] args) {\n        new Ticket();\n        System.out.print(Ticket.made + " ");\n        new Ticket();\n        System.out.println(Ticket.made);\n    }\n}'),
  match('p1w6-q7', 'p1w6-l6-pillars', L('Match each pillar with its idea.', 'Relaciona cada pilar con su idea.', 'Ligue cada pilar à sua ideia.'),
    [L('Abstraction', 'Abstracción', 'Abstração'), L('Encapsulation', 'Encapsulamiento', 'Encapsulamento'), L('Inheritance', 'Herencia', 'Herança'), L('Polymorphism', 'Polimorfismo', 'Polimorfismo')],
    [L('A subclass reuses and extends a parent class', 'Una subclase reutiliza y amplía una clase padre', 'Uma subclasse reutiliza e amplia uma classe pai'), L('One call, different behaviour per object', 'Una llamada, comportamiento distinto según el objeto', 'Uma chamada, comportamento diferente por objeto'), L('Show what, hide how', 'Mostrar qué, ocultar cómo', 'Mostrar o quê, esconder como'), L('Private data behind methods', 'Datos privados detrás de métodos', 'Dados privados atrás de métodos')],
    [2, 3, 0, 1], L('The four pillars of OOP.', 'Los cuatro pilares de la POO.', 'Os quatro pilares da POO.')),
  mc('p1w6-q8', 'code', 'p1w6-l6-pillars', L('What does this print?', '¿Qué imprime?', 'O que imprime?'), [same('...'), same('Woof'), same('Woof...')], 1,
    L('The object is a `Dog`, so its overriding method runs.', 'El objeto es un `Dog`, así que se ejecuta su método sobrescrito.', 'O objeto é um `Dog`, então roda o método sobrescrito dele.'),
    'class Animal {\n    String sound() {\n        return "...";\n    }\n}\nclass Dog extends Animal {\n    @Override\n    String sound() {\n        return "Woof";\n    }\n}\npublic class Q {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        System.out.println(a.sound());\n    }\n}'),
];

const activities: Activity[] = [
  { id: 'p1w6-act-classify', kind: 'classify', lessonId: 'p1w6-l1-why', title: L('Class, field, or method?', '¿Clase, campo o método?', 'Classe, campo ou método?'),
    prompt: L('“A cyclist rides a bike; the bike has a speed and can brake.”', '“Una ciclista anda en una bici; la bici tiene una velocidad y puede frenar.”', '“Uma ciclista anda de bicicleta; a bicicleta tem uma velocidade e pode frear.”'),
    buckets: [L('Class', 'Clase', 'Classe'), L('Field', 'Campo', 'Campo'), L('Method', 'Método', 'Método')],
    items: [
      { text: L('Cyclist', 'Ciclista', 'Ciclista'), bucket: 0 }, { text: L('Bike', 'Bici', 'Bicicleta'), bucket: 0 }, { text: L('speed', 'velocidad', 'velocidade'), bucket: 1 },
      { text: L('brake()', 'frenar()', 'frear()'), bucket: 2 }, { text: L('ride()', 'andar()', 'andar()'), bucket: 2 }, { text: L('name', 'nombre', 'nome'), bucket: 1 },
    ],
    explanation: L('Things become classes, their properties fields, and their actions methods.', 'Las cosas son clases, sus propiedades campos y sus acciones métodos.', 'Coisas viram classes, suas propriedades campos e suas ações métodos.') },
  { id: 'p1w6-act-fill', kind: 'code-fill', lessonId: 'p1w6-l3-constructors', title: L('Complete the class', 'Completa la clase', 'Complete a classe'),
    prompt: L('A `Pet` with a private name and a constructor.', 'Un `Pet` con nombre privado y un constructor.', 'Um `Pet` com nome privado e um construtor.'),
    template: 'public class Pet {\n    {0} String name;\n\n    public {1}(String name) {\n        {2}.name = name;\n    }\n\n    public String getName() {\n        return name;\n    }\n}',
    blanks: ['private', 'Pet', 'this'], explanation: L('Private field, constructor named like the class, `this` for the field.', 'Campo privado, constructor con el nombre de la clase y `this` para el campo.', 'Campo privado, construtor com o nome da classe e `this` para o campo.') },
  { id: 'p1w6-act-order', kind: 'order', lessonId: 'p1w6-l5-static', title: L('Run a two-file program', 'Ejecuta un programa de dos archivos', 'Rode um programa de dois arquivos'),
    prompt: L('Order the steps.', 'Ordena los pasos.', 'Ordene os passos.'),
    items: [L('Put each public class in its own `.java` file', 'Poner cada clase pública en su propio archivo `.java`', 'Pôr cada classe pública no próprio arquivo `.java`'), same('`javac *.java`'), L('Check that both `.class` files exist', 'Comprobar que existen ambos `.class`', 'Conferir que os dois `.class` existem'), L('`java Kitchen soup salad` (the class with `main`)', '`java Kitchen soup salad` (la clase con `main`)', '`java Kitchen soup salad` (a classe com `main`)')],
    explanation: L('Compile all files together, then run the class that contains `main`.', 'Compila todos los archivos juntos y luego ejecuta la clase que contiene `main`.', 'Compile todos os arquivos juntos e depois rode a classe que contém o `main`.') },
  { id: 'p1w6-act-scramble', kind: 'scramble', lessonId: 'p1w6-l6-pillars', title: L('Declare a subclass', 'Declara una subclase', 'Declare uma subclasse'),
    prompt: L('A scooter is a vehicle.', 'Un monopatín es un vehículo.', 'Um patinete é um veículo.'),
    tokens: ['class', 'Scooter', 'extends', 'Vehicle', '{'], explanation: L('`extends` names the parent class.', '`extends` nombra la clase padre.', '`extends` nomeia a classe pai.') },
];

const labs: Lab[] = [
  { id: 'p1w6-lab1-playlist', level: 2, minutes: 50, title: L('A playlist with two classes and three files', 'Una lista de reproducción con dos clases y tres archivos', 'Uma playlist com duas classes e três arquivos'),
    goal: L('Write encapsulated classes in separate files, compile them together, and drive them from `args`.', 'Escribir clases encapsuladas en archivos separados, compilarlas juntas y manejarlas desde `args`.', 'Escrever classes encapsuladas em arquivos separados, compilá-las juntas e conduzi-las a partir de `args`.'),
    steps: [
      { id: 'p1w6-lab1-s1', title: L('Song.java', 'Song.java', 'Song.java'), commands: ['mkdir -p ~/prog1/week6/playlist && cd ~/prog1/week6/playlist', ...heredoc('Song.java', SONG)],
        expected: L('A class with private final fields, a validating constructor, getters, and `toString`.', 'Una clase con campos privados y finales, un constructor que valida, getters y `toString`.', 'Uma classe com campos privados e finais, um construtor que valida, getters e `toString`.') },
      { id: 'p1w6-lab1-s2', title: L('Playlist.java and PlaylistApp.java', 'Playlist.java y PlaylistApp.java', 'Playlist.java e PlaylistApp.java'), commands: [...heredoc('Playlist.java', PLAYLIST), ...heredoc('PlaylistApp.java', PLAYLIST_APP)],
        expected: L('Three `.java` files in the folder.', 'Tres archivos `.java` en la carpeta.', 'Três arquivos `.java` na pasta.') },
      { id: 'p1w6-lab1-s3', title: L('Compile together and run', 'Compila todo junto y ejecuta', 'Compile tudo junto e rode'), commands: ['javac *.java', 'java PlaylistApp Intro:95 Sunrise:210 Finale:180'],
        expected: same('`Road trip - 3 songs`, `1. Intro (1:35)`, `2. Sunrise (3:30)`, `3. Finale (3:00)`, `Total 8:05`') },
      { id: 'p1w6-lab1-s4', title: L('Break the rules', 'Rompe las reglas', 'Quebre as regras'), commands: ['java PlaylistApp Intro:0', '# add to PlaylistApp: trip.songs = null;  then compile'],
        expected: L('The first throws `IllegalArgumentException: seconds must be positive`. The second does not compile: `songs has private access in Playlist`. Remove that line.', 'La primera lanza `IllegalArgumentException: seconds must be positive`. La segunda no compila: `songs has private access in Playlist`. Quita esa línea.', 'A primeira lança `IllegalArgumentException: seconds must be positive`. A segunda não compila: `songs has private access in Playlist`. Tire essa linha.') },
      { id: 'p1w6-lab1-s5', title: L('Extend it', 'Amplíalo', 'Amplie'), commands: ['# add Playlist.longest() returning the longest Song, and print it', 'javac *.java && java PlaylistApp Intro:95 Sunrise:210 Finale:180'],
        expected: same('`Longest: Sunrise (3:30)`') },
    ] },
  { id: 'p1w6-lab2-grid', level: 3, minutes: 60, title: L('Refactor a grid simulation into a class', 'Refactoriza una simulación de cuadrícula en una clase', 'Refatore uma simulação de grade numa classe'),
    goal: L('Turn last week’s mould grid into a reusable `Grid` class with safe access, a neighbour counter, and a `next()` generation.', 'Convertir la cuadrícula de moho de la semana pasada en una clase `Grid` reutilizable con acceso seguro, un contador de vecinos y una generación `next()`.', 'Transformar a grade de mofo da semana passada numa classe `Grid` reutilizável com acesso seguro, um contador de vizinhos e uma geração `next()`.'),
    steps: [
      { id: 'p1w6-lab2-s1', title: L('Grid.java and GridApp.java', 'Grid.java y GridApp.java', 'Grid.java e GridApp.java'), commands: ['mkdir -p ~/prog1/week6/grid && cd ~/prog1/week6/grid', ...heredoc('Grid.java', GRID), ...heredoc('GridApp.java', GRID_APP), 'javac *.java'],
        expected: L('Both compile. `get` returns 0 outside the grid, so neighbour counting needs no extra checks.', 'Ambos compilan. `get` devuelve 0 fuera de la cuadrícula, así contar vecinos no necesita revisiones extra.', 'Os dois compilam. `get` devolve 0 fora da grade, então contar vizinhos não precisa de checagens extras.') },
      { id: 'p1w6-lab2-s2', title: L('Run generations', 'Ejecuta generaciones', 'Rode gerações'), commands: ['java GridApp', 'java GridApp "1#0#0#1" 1'],
        expected: L('Default: generation 0 has `o o` in the middle row, generation 1 fills the two middle columns, generation 2 fills the whole grid. Second: a single column where nothing changes (no cell has 2 neighbours).', 'Por defecto: la generación 0 tiene `o o` en la fila del medio, la 1 llena las dos columnas centrales y la 2 llena toda la cuadrícula. Segundo: una sola columna donde nada cambia (ninguna celda tiene 2 vecinas).', 'Padrão: a geração 0 tem `o o` na linha do meio, a 1 enche as duas colunas centrais e a 2 enche a grade inteira. Segundo: uma única coluna em que nada muda (nenhuma célula tem 2 vizinhas).') },
      { id: 'p1w6-lab2-s3', title: L('Add a counter method', 'Agrega un método contador', 'Acrescente um método contador'), commands: ['# add Grid.count(int value) and print "cells on: N" after each generation', 'javac *.java && java GridApp'],
        expected: same('`cells on: 2`, `cells on: 6`, `cells on: 12`') },
      { id: 'p1w6-lab2-s4', title: L('Same program in the IDE', 'El mismo programa en el IDE', 'O mesmo programa na IDE'), commands: ['# open the folder; set main class GridApp and Program arguments: 0000#0110#0000 3'],
        expected: L('`Run` shows generations 0 to 3. Set a breakpoint in `next()` and step into `countAround` to watch one cell being decided.', '`Run` muestra las generaciones 0 a 3. Pon un punto de interrupción en `next()` y entra a `countAround` para ver cómo se decide una celda.', '`Run` mostra as gerações 0 a 3. Ponha um ponto de parada em `next()` e entre em `countAround` para ver uma célula sendo decidida.') },
    ] },
];

const resources: ExternalResource[] = [
  { id: 'p1w6-r1', title: 'Oracle Java Tutorials: Object-Oriented Programming Concepts', url: 'https://docs.oracle.com/javase/tutorial/java/concepts/index.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Objects, classes, inheritance, and interfaces in plain words.', 'Objetos, clases, herencia e interfaces en palabras simples.', 'Objetos, classes, herança e interfaces em palavras simples.') },
  { id: 'p1w6-r2', title: 'Oracle Java Tutorials: Classes and Objects', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/index.html', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Constructors, `this`, access control, and static members.', 'Constructores, `this`, control de acceso y miembros estáticos.', 'Construtores, `this`, controle de acesso e membros estáticos.') },
  { id: 'p1w6-r3', title: 'dev.java: Classes and objects', url: 'https://dev.java/learn/classes-objects/', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('The official modern tutorial.', 'El tutorial oficial moderno.', 'O tutorial oficial moderno.') },
  { id: 'p1w6-r4', title: 'W3Schools: Java Encapsulation', url: 'https://www.w3schools.com/java/java_encapsulation.asp', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Getters and setters with runnable examples.', 'Getters y setters con ejemplos ejecutables.', 'Getters e setters com exemplos executáveis.') },
];

/** Programming 1, Week 6: introduction to object-oriented programming. */
export const prog1Week6: WeekContent = {
  id: 'y1-t1-m1-prog-w6', year: 1, term: 1, module: 1, week: 6, subject: 'programming-1',
  title: L('Introduction to object-oriented programming', 'Introducción a la programación orientada a objetos', 'Introdução à programação orientada a objetos'),
  intro: L('This week you move from methods that share arrays to objects that own their data. You compare the modular and object-oriented paradigms, write classes with fields, constructors, and methods, protect state with encapsulation, separate static from instance members, split a program into several files, and meet the four pillars of OOP.',
    'Esta semana pasas de métodos que comparten arreglos a objetos que son dueños de sus datos. Comparas los paradigmas modular y orientado a objetos, escribes clases con campos, constructores y métodos, proteges el estado con encapsulamiento, separas miembros estáticos de los de instancia, divides un programa en varios archivos y conoces los cuatro pilares de la POO.',
    'Nesta semana você passa de métodos que compartilham arrays a objetos donos dos seus dados. Compara os paradigmas modular e orientado a objetos, escreve classes com campos, construtores e métodos, protege o estado com encapsulamento, separa membros estáticos dos de instância, divide um programa em vários arquivos e conhece os quatro pilares da POO.'),
  objectives: [
    L('Compare modular and object-oriented design and find classes in a problem statement.', 'Comparar el diseño modular y el orientado a objetos y encontrar clases en un enunciado.', 'Comparar o projeto modular e o orientado a objetos e achar classes num enunciado.'),
    L('Write classes with fields, constructors, methods, and `toString`.', 'Escribir clases con campos, constructores, métodos y `toString`.', 'Escrever classes com campos, construtores, métodos e `toString`.'),
    L('Encapsulate state with `private` fields, accessors, and validating mutators.', 'Encapsular el estado con campos `private`, métodos de acceso y modificadores que validan.', 'Encapsular o estado com campos `private`, métodos de acesso e modificadores que validam.'),
    L('Use static members correctly and compile programs made of several files.', 'Usar bien los miembros estáticos y compilar programas de varios archivos.', 'Usar bem membros estáticos e compilar programas de vários arquivos.'),
    L('Explain abstraction, encapsulation, inheritance, and polymorphism with an example.', 'Explicar abstracción, encapsulamiento, herencia y polimorfismo con un ejemplo.', 'Explicar abstração, encapsulamento, herança e polimorfismo com um exemplo.'),
  ],
  prerequisites: [L('Week 5: methods, references, and scope.', 'Semana 5: métodos, referencias y ámbito.', 'Semana 5: métodos, referências e escopo.')],
  keyConcepts: [L('Class and object', 'Clase y objeto', 'Classe e objeto'), L('State, behaviour, identity', 'Estado, comportamiento, identidad', 'Estado, comportamento, identidade'), L('Constructor', 'Constructor', 'Construtor'), L('Encapsulation', 'Encapsulamiento', 'Encapsulamento'), L('Static vs instance', 'Estático vs instancia', 'Estático vs instância'), L('Inheritance', 'Herencia', 'Herança'), L('Polymorphism', 'Polimorfismo', 'Polimorfismo')],
  estimatedMinutes: 360,
  sequence: [L('Lessons 1–4, then Lab 1.', 'Lecciones 1–4 y luego el Laboratorio 1.', 'Lições 1–4 e depois o Laboratório 1.'), L('Lessons 5–6.', 'Lecciones 5–6.', 'Lições 5–6.'), L('Lab 2 and the quiz.', 'Laboratorio 2 y el cuestionario.', 'Laboratório 2 e o questionário.')],
  outcomes: [L('You model a small problem as cooperating classes.', 'Modelas un problema pequeño como clases que cooperan.', 'Você modela um problema pequeno como classes que cooperam.'), L('You build, compile, and run multi-file programs.', 'Construyes, compilas y ejecutas programas de varios archivos.', 'Você constrói, compila e roda programas de vários arquivos.')],
  checklist: [L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'), L('Finish both labs', 'Terminar los dos laboratorios', 'Terminar os dois laboratórios'), L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário')],
  commonMistakes: [
    { mistake: L('Public fields everywhere.', 'Campos públicos por todas partes.', 'Campos públicos em todo lugar.'), fix: L('Make fields private and expose only the operations you need.', 'Haz privados los campos y expón solo las operaciones necesarias.', 'Deixe os campos privados e exponha só as operações necessárias.') },
    { mistake: L('Running `java Song` when `main` is in another class.', 'Ejecutar `java Song` cuando `main` está en otra clase.', 'Rodar `java Song` quando o `main` está em outra classe.'), fix: L('Run the class that contains `main`.', 'Ejecuta la clase que contiene `main`.', 'Rode a classe que contém o `main`.') },
  ],
  lessons,
  flashcards: [
    fc('p1w6-fc-1', 'p1w6-l1-why', 'distinction', L('Modular vs OOP', 'Modular vs POO', 'Modular vs POO'), L('Modular: data and functions apart. OOP: objects bundle data with behaviour.', 'Modular: datos y funciones separados. POO: los objetos agrupan datos y comportamiento.', 'Modular: dados e funções separados. POO: objetos agrupam dados e comportamento.')),
    fc('p1w6-fc-2', 'p1w6-l2-objects', 'distinction', L('Class vs object', 'Clase vs objeto', 'Classe vs objeto'), L('A class is a template; an object is one instance made with `new`.', 'Una clase es una plantilla; un objeto es una instancia creada con `new`.', 'Uma classe é um molde; um objeto é uma instância criada com `new`.')),
    fc('p1w6-fc-3', 'p1w6-l2-objects', 'concept', L('State, behaviour, identity', 'Estado, comportamiento, identidad', 'Estado, comportamento, identidade'), L('Field values, methods, and being one specific object.', 'Valores de los campos, métodos y ser un objeto concreto.', 'Valores dos campos, métodos e ser um objeto específico.')),
    fc('p1w6-fc-4', 'p1w6-l3-constructors', 'concept', L('Constructor', 'Constructor', 'Construtor'), L('Runs with `new`; same name as the class; no return type.', 'Se ejecuta con `new`; mismo nombre que la clase; sin tipo de retorno.', 'Roda com `new`; mesmo nome da classe; sem tipo de retorno.')),
    fc('p1w6-fc-5', 'p1w6-l3-constructors', 'command', same('this.name = name;'), L('Copies the parameter into the field of the current object.', 'Copia el parámetro en el campo del objeto actual.', 'Copia o parâmetro para o campo do objeto atual.')),
    fc('p1w6-fc-6', 'p1w6-l4-encapsulation', 'concept', L('Encapsulation', 'Encapsulamiento', 'Encapsulamento'), L('Private fields changed only through methods that enforce rules.', 'Campos privados que solo cambian mediante métodos que hacen cumplir reglas.', 'Campos privados que só mudam por métodos que fazem cumprir regras.')),
    fc('p1w6-fc-7', 'p1w6-l4-encapsulation', 'distinction', L('Accessor vs mutator', 'Acceso vs modificador', 'Acesso vs modificador'), L('Accessor (getter) reads; mutator changes state after validating.', 'El de acceso (getter) lee; el modificador cambia el estado tras validar.', 'O de acesso (getter) lê; o modificador muda o estado depois de validar.')),
    fc('p1w6-fc-8', 'p1w6-l5-static', 'distinction', L('static vs instance', 'static vs instancia', 'static vs instância'), L('Static: one per class, shared. Instance: one per object.', 'Estático: uno por clase, compartido. Instancia: uno por objeto.', 'Estático: um por classe, compartilhado. Instância: um por objeto.')),
    fc('p1w6-fc-9', 'p1w6-l5-static', 'command', same('javac *.java'), L('Compiles every class of a multi-file program at once.', 'Compila de una vez todas las clases de un programa de varios archivos.', 'Compila de uma vez todas as classes de um programa de vários arquivos.')),
    fc('p1w6-fc-10', 'p1w6-l6-pillars', 'concept', L('Inheritance', 'Herencia', 'Herança'), L('`class B extends A`: B is an A and reuses its members; `super(…)` calls A’s constructor.', '`class B extends A`: B es un A y reutiliza sus miembros; `super(…)` llama al constructor de A.', '`class B extends A`: B é um A e reutiliza seus membros; `super(…)` chama o construtor de A.')),
    fc('p1w6-fc-11', 'p1w6-l6-pillars', 'concept', L('Polymorphism', 'Polimorfismo', 'Polimorfismo'), L('The same call runs the overriding method of the actual object.', 'La misma llamada ejecuta el método sobrescrito del objeto real.', 'A mesma chamada roda o método sobrescrito do objeto real.')),
  ],
  questions, activities, labs,
  plan: [
    day(1, 40, 'read', L('Lessons 1–2: why objects; classes and objects.', 'Lecciones 1–2: por qué objetos; clases y objetos.', 'Lições 1–2: por que objetos; classes e objetos.')),
    day(2, 40, 'read', L('Lessons 3–4: constructors and encapsulation.', 'Lecciones 3–4: constructores y encapsulamiento.', 'Lições 3–4: construtores e encapsulamento.')),
    day(3, 50, 'practice', L('Lab 1: the playlist in three files.', 'Laboratorio 1: la lista en tres archivos.', 'Laboratório 1: a playlist em três arquivos.')),
    day(4, 40, 'read', L('Lessons 5–6: static members and the four pillars.', 'Lecciones 5–6: miembros estáticos y los cuatro pilares.', 'Lições 5–6: membros estáticos e os quatro pilares.')),
    day(5, 60, 'practice', L('Lab 2: the Grid class.', 'Laboratorio 2: la clase Grid.', 'Laboratório 2: a classe Grid.')),
    day(6, 30, 'quiz', L('Flashcards and quiz.', 'Tarjetas y cuestionario.', 'Cartões e questionário.')),
  ],
  resources, stories: [], tools: [], videos: [], documents: [],
};
