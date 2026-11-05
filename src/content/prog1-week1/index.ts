import type { Activity, ExternalResource, Lab, Lesson, Question } from '../types';
import type { WeekContent } from '../weekContent';
import { L, chk, day, ex, fc, fill, java, lesson, match, mc, pf, same, text, tf } from './h';

const lessons: Lesson[] = [
  lesson('p1w1-l1-thinking', L('Computational thinking', 'Pensamiento computacional', 'Pensamento computacional'), 15,
    text(L('The four habits applied to planning a weekend trip.', 'Los cuatro hábitos aplicados a planear un viaje de fin de semana.', 'Os quatro hábitos aplicados ao planejamento de uma viagem de fim de semana.'),
      `Problem: plan a weekend trip for 4 friends

Decomposition     transport | lodging | meals | budget
Patterns          every meal = choose place, split bill
Abstraction       keep: price, time, distance
                  ignore: colour of the bus, hotel wallpaper
Algorithm         1. fix the budget  2. book transport
                  3. book lodging    4. plan meals  5. check total`),
    [
      L('Programming is solving a problem so precisely that a machine can carry out the solution. Before any code, you must **understand the problem**: what goes in, what must come out, and which rules connect them.',
        'Programar es resolver un problema con tanta precisión que una máquina pueda ejecutar la solución. Antes de escribir código hay que **entender el problema**: qué entra, qué debe salir y qué reglas unen ambas cosas.',
        'Programar é resolver um problema com tanta precisão que uma máquina consiga executar a solução. Antes de qualquer código, é preciso **entender o problema**: o que entra, o que deve sair e que regras ligam as duas coisas.'),
      L('**Computational thinking** attacks a problem with four habits: decomposition (split it into smaller problems), pattern recognition (spot what repeats), abstraction (keep only the details that matter), and algorithm design (write the exact steps).',
        'El **pensamiento computacional** ataca un problema con cuatro hábitos: descomposición (dividirlo en problemas más pequeños), reconocimiento de patrones (ver lo que se repite), abstracción (quedarse solo con los detalles que importan) y diseño de algoritmos (escribir los pasos exactos).',
        'O **pensamento computacional** ataca um problema com quatro hábitos: decomposição (dividir em problemas menores), reconhecimento de padrões (ver o que se repete), abstração (ficar só com os detalhes que importam) e projeto de algoritmos (escrever os passos exatos).'),
      L('The work is a loop: specify the problem, express a solution, implement it, and test it. Testing often sends you back to the specification. That is normal: each pass makes the solution better.',
        'El trabajo es un ciclo: especificar el problema, expresar una solución, implementarla y probarla. Las pruebas suelen devolverte a la especificación. Es normal: cada vuelta mejora la solución.',
        'O trabalho é um ciclo: especificar o problema, expressar uma solução, implementá-la e testá-la. Os testes muitas vezes levam de volta à especificação. É normal: cada volta melhora a solução.'),
    ],
    L('A good cook reads the whole recipe, splits the work into stations, ignores the colour of the bowls, and follows the steps in order. That is computational thinking in an apron.',
      'Un buen cocinero lee toda la receta, divide el trabajo en estaciones, ignora el color de los tazones y sigue los pasos en orden. Eso es pensamiento computacional con delantal.',
      'Um bom cozinheiro lê a receita inteira, divide o trabalho em estações, ignora a cor das tigelas e segue os passos em ordem. Isso é pensamento computacional de avental.'),
    [L('Inputs, outputs, and rules come before code.', 'Entradas, salidas y reglas van antes del código.', 'Entradas, saídas e regras vêm antes do código.'),
      L('Decompose, find patterns, abstract, write the algorithm.', 'Descomponer, buscar patrones, abstraer, escribir el algoritmo.', 'Decompor, achar padrões, abstrair, escrever o algoritmo.')],
    chk(L('A shipping app ignores the colour of each parcel and keeps only its weight. Which habit is that?', 'Una aplicación de envíos ignora el color de cada paquete y solo guarda su peso. ¿Qué hábito es?', 'Um aplicativo de entregas ignora a cor de cada pacote e guarda só o peso. Que hábito é esse?'),
      [L('Decomposition', 'Descomposición', 'Decomposição'), L('Abstraction', 'Abstracción', 'Abstração'), L('Pattern recognition', 'Reconocimiento de patrones', 'Reconhecimento de padrões')], 1,
      L('Abstraction keeps only the details that matter for the problem.', 'La abstracción conserva solo los detalles que importan para el problema.', 'A abstração guarda só os detalhes que importam para o problema.')),
    [pf(L('Coding before you know the expected output.', 'Programar sin saber cuál es la salida esperada.', 'Programar sem saber qual é a saída esperada.'),
      L('Write two input/output examples by hand first.', 'Escribe primero a mano dos ejemplos de entrada y salida.', 'Escreva primeiro à mão dois exemplos de entrada e saída.'))],
    [ex('p1w1-ex-1-1', 1, L('Inputs and outputs', 'Entradas y salidas', 'Entradas e saídas'),
      L('A gym wants to know how many full teams of 5 it can form from the people who arrived, and how many are left out. Name the inputs and outputs.', 'Un gimnasio quiere saber cuántos equipos completos de 5 puede formar con las personas que llegaron y cuántas quedan fuera. Indica entradas y salidas.', 'Uma academia quer saber quantos times completos de 5 consegue formar com as pessoas que chegaram e quantas ficam de fora. Diga as entradas e as saídas.'),
      L('What must someone tell you, and what do you answer?', '¿Qué te tienen que decir y qué respondes?', 'O que precisam te dizer e o que você responde?'),
      L('Input: number of people (5 per team is a fixed rule). Outputs: full teams and people left out. 23 people → 4 teams, 3 left.', 'Entrada: cantidad de personas (5 por equipo es una regla fija). Salidas: equipos completos y personas sobrantes. 23 personas → 4 equipos, sobran 3.', 'Entrada: número de pessoas (5 por time é uma regra fixa). Saídas: times completos e pessoas que sobram. 23 pessoas → 4 times, sobram 3.')),
    ex('p1w1-ex-1-2', 2, L('Test cases first', 'Primero los casos de prueba', 'Primeiro os casos de teste'),
      L('Write three test cases for the team problem, including an edge case.', 'Escribe tres casos de prueba para el problema de los equipos, incluido un caso límite.', 'Escreva três casos de teste para o problema dos times, incluindo um caso-limite.'),
      L('Edge cases live at 0 and at exact multiples.', 'Los casos límite están en 0 y en los múltiplos exactos.', 'Os casos-limite ficam no 0 e nos múltiplos exatos.'),
      L('23 → 4 and 3; 20 → 4 and 0 (exact multiple); 3 → 0 and 3 (not even one team).', '23 → 4 y 3; 20 → 4 y 0 (múltiplo exacto); 3 → 0 y 3 (ni un equipo).', '23 → 4 e 3; 20 → 4 e 0 (múltiplo exato); 3 → 0 e 3 (nem um time).'))]),

  lesson('p1w1-l2-algorithms', L('Algorithms and pseudocode', 'Algoritmos y pseudocódigo', 'Algoritmos e pseudocódigo'), 20,
    text(L('Pseudocode for a leap year, traced with three inputs.', 'Pseudocódigo de un año bisiesto, probado con tres entradas.', 'Pseudocódigo de ano bissexto, testado com três entradas.'),
      `START
  READ year
  IF year divisible by 400 THEN leap <- true
  ELSE IF year divisible by 100 THEN leap <- false
  ELSE IF year divisible by 4 THEN leap <- true
  ELSE leap <- false
  WRITE leap
END

Trace: 2024 -> true   1900 -> false   2000 -> true`),
    [
      L('An **algorithm** is a finite list of clear, ordered steps that turns inputs into the required output. Each step must mean one thing and be doable. “Add salt to taste” is fine for a person but useless for a computer; “add 5 g of salt” works.',
        'Un **algoritmo** es una lista finita de pasos claros y ordenados que convierte entradas en la salida requerida. Cada paso debe significar una sola cosa y poder hacerse. “Sal al gusto” sirve para una persona, pero no para una computadora; “agrega 5 g de sal” sí.',
        'Um **algoritmo** é uma lista finita de passos claros e ordenados que transforma entradas na saída exigida. Cada passo deve significar uma coisa só e ser possível. “Sal a gosto” serve para uma pessoa, mas não para um computador; “adicione 5 g de sal” serve.'),
      L('**Pseudocode** writes an algorithm in structured plain language: keywords such as `READ`, `WRITE`, `IF … THEN … ELSE`, `WHILE`, and an arrow `<-` for “store this value”. It has no strict grammar, so you think about the solution, not the syntax.',
        'El **pseudocódigo** escribe un algoritmo en lenguaje llano estructurado: palabras clave como `READ`, `WRITE`, `IF … THEN … ELSE`, `WHILE` y una flecha `<-` para “guardar este valor”. No tiene gramática estricta, así que piensas en la solución y no en la sintaxis.',
        'O **pseudocódigo** escreve um algoritmo em linguagem simples e estruturada: palavras-chave como `READ`, `WRITE`, `IF … THEN … ELSE`, `WHILE` e uma seta `<-` para “guardar este valor”. Não tem gramática rígida, então você pensa na solução e não na sintaxe.'),
      L('Always **trace** before trusting: pick inputs, follow every step, and write the values down. Choose inputs that reach every branch, as the three years above do. That habit is the beginning of testing.',
        'Antes de confiar, **recorre** siempre el algoritmo: elige entradas, sigue cada paso y anota los valores. Escoge entradas que pasen por todas las ramas, como los tres años de arriba. Ese hábito es el comienzo de las pruebas.',
        'Antes de confiar, sempre **percorra** o algoritmo: escolha entradas, siga cada passo e anote os valores. Escolha entradas que passem por todos os caminhos, como os três anos acima. Esse hábito é o começo dos testes.'),
    ],
    L('Pseudocode is the handwritten directions to your house: anyone can follow them, and later you can translate them into any language.',
      'El pseudocódigo son las indicaciones escritas a mano para llegar a tu casa: cualquiera puede seguirlas y después puedes traducirlas a cualquier idioma.',
      'O pseudocódigo são as instruções escritas à mão para chegar à sua casa: qualquer um consegue segui-las e depois dá para traduzi-las para qualquer idioma.'),
    [L('Algorithm = finite, unambiguous, ordered steps.', 'Algoritmo = pasos finitos, inequívocos y ordenados.', 'Algoritmo = passos finitos, inequívocos e ordenados.'),
      L('Trace with inputs that hit every branch.', 'Recorre con entradas que pasen por cada rama.', 'Percorra com entradas que passem por cada caminho.')],
    chk(L('The leap-year pseudocode reads 1900. What does it write?', 'El pseudocódigo del año bisiesto lee 1900. ¿Qué escribe?', 'O pseudocódigo do ano bissexto lê 1900. O que ele escreve?'),
      [same('true'), same('false'), L('Nothing', 'Nada', 'Nada')], 1,
      L('1900 is divisible by 100 but not by 400, so `leap <- false` before the test for 4.', '1900 es divisible entre 100 pero no entre 400, así que `leap <- false` antes de la prueba del 4.', '1900 é divisível por 100 mas não por 400, então `leap <- false` antes do teste do 4.')),
    [pf(L('Steps that need judgement, such as “cook until it looks good”.', 'Pasos que requieren criterio, como “cocinar hasta que se vea bien”.', 'Passos que exigem julgamento, como “cozinhar até ficar bom”.'),
      L('Use measurable conditions: “cook 12 minutes” or “until it reaches 75 °C”.', 'Usa condiciones medibles: “cocinar 12 minutos” o “hasta llegar a 75 °C”.', 'Use condições mensuráveis: “cozinhar 12 minutos” ou “até chegar a 75 °C”.'))],
    [ex('p1w1-ex-2-1', 1, L('Smallest of three', 'El menor de tres', 'O menor de três'),
      L('Write pseudocode that reads three race times and writes the fastest (smallest).', 'Escribe pseudocódigo que lea tres tiempos de carrera y escriba el más rápido (el menor).', 'Escreva um pseudocódigo que leia três tempos de corrida e escreva o mais rápido (o menor).'),
      L('Keep a “best so far” and compare it with each new time.', 'Guarda un “mejor hasta ahora” y compáralo con cada tiempo nuevo.', 'Guarde um “melhor até agora” e compare com cada tempo novo.'),
      L('`READ a, b, c; best <- a; IF b < best THEN best <- b; IF c < best THEN best <- c; WRITE best`. Trace 31, 28, 30 → 28.', '`READ a, b, c; best <- a; IF b < best THEN best <- b; IF c < best THEN best <- c; WRITE best`. Prueba con 31, 28, 30 → 28.', '`READ a, b, c; best <- a; IF b < best THEN best <- b; IF c < best THEN best <- c; WRITE best`. Teste com 31, 28, 30 → 28.')),
    ex('p1w1-ex-2-2', 2, L('Repeat until zero', 'Repetir hasta cero', 'Repetir até zero'),
      L('Write pseudocode that adds the prices of songs bought until the user enters 0, then writes the total.', 'Escribe pseudocódigo que sume los precios de canciones compradas hasta que el usuario ingrese 0 y luego escriba el total.', 'Escreva um pseudocódigo que some os preços das músicas compradas até o usuário digitar 0 e depois escreva o total.'),
      L('Read once before the loop and again at the end of it.', 'Lee una vez antes del ciclo y otra vez al final de cada vuelta.', 'Leia uma vez antes do laço e de novo no fim de cada volta.'),
      L('`total <- 0; READ p; WHILE p ≠ 0: total <- total + p; READ p; END; WRITE total`. Input 2, 3, 0 → 5.', '`total <- 0; READ p; WHILE p ≠ 0: total <- total + p; READ p; END; WRITE total`. Entrada 2, 3, 0 → 5.', '`total <- 0; READ p; WHILE p ≠ 0: total <- total + p; READ p; END; WRITE total`. Entrada 2, 3, 0 → 5.'))]),

  lesson('p1w1-l3-flowcharts', L('Flowcharts', 'Diagramas de flujo', 'Fluxogramas'), 15,
    text(L('The standard shapes, and a parking fee drawn with them.', 'Las figuras estándar y una tarifa de estacionamiento dibujada con ellas.', 'As formas padrão e uma tarifa de estacionamento desenhada com elas.'),
      `Shape            Meaning              Example
( oval )         start / end          ( START )
/ parallelogram/ input / output       / READ hours /
[ rectangle ]    process              [ fee <- (hours - 1) * 3 ]
< diamond >      decision (yes / no)  < hours <= 1 ? >
  arrows         flow of control

( START ) -> / READ hours / -> < hours <= 1 ? >
     yes -> [ fee <- 0 ] ---------------------+
     no  -> [ fee <- (hours - 1) * 3 ]        |
            -> < fee > 20 ? > yes -> [ fee <- 20 ]
                                     -> / WRITE fee / -> ( END )`),
    [
      L('A **flowchart** draws an algorithm with standard shapes joined by arrows. It shows branches and loops at a glance, which makes it great for explaining a solution to someone else.',
        'Un **diagrama de flujo** dibuja un algoritmo con figuras estándar unidas por flechas. Muestra de un vistazo las ramas y los ciclos, por eso es ideal para explicar una solución a otra persona.',
        'Um **fluxograma** desenha um algoritmo com formas padrão ligadas por setas. Ele mostra desvios e laços de relance, por isso é ótimo para explicar uma solução a outra pessoa.'),
      L('The oval starts and ends, the parallelogram reads or writes, the rectangle computes, and the diamond asks a yes/no question with exactly two exits. A loop is simply an arrow that goes back up to an earlier diamond.',
        'El óvalo inicia y termina, el paralelogramo lee o escribe, el rectángulo calcula y el rombo hace una pregunta de sí o no con exactamente dos salidas. Un ciclo es simplemente una flecha que regresa a un rombo anterior.',
        'O oval começa e termina, o paralelogramo lê ou escreve, o retângulo calcula e o losango faz uma pergunta de sim ou não com exatamente duas saídas. Um laço é só uma seta que volta para um losango anterior.'),
      L('Pseudocode is faster to write and closer to code; a flowchart is easier to read. Use whichever explains the idea best, and keep both consistent if you draw both.',
        'El pseudocódigo se escribe más rápido y se parece más al código; el diagrama se lee más fácil. Usa el que mejor explique la idea y, si haces ambos, que digan lo mismo.',
        'O pseudocódigo é mais rápido de escrever e mais parecido com código; o fluxograma é mais fácil de ler. Use o que explicar melhor a ideia e, se fizer os dois, que digam a mesma coisa.'),
    ],
    L('Pseudocode is the written route; the flowchart is the map with the forks in the road drawn in.',
      'El pseudocódigo es la ruta escrita; el diagrama de flujo es el mapa con los cruces dibujados.',
      'O pseudocódigo é o caminho escrito; o fluxograma é o mapa com as bifurcações desenhadas.'),
    [L('Oval = start/end, parallelogram = I/O, rectangle = process, diamond = decision.', 'Óvalo = inicio/fin, paralelogramo = E/S, rectángulo = proceso, rombo = decisión.', 'Oval = início/fim, paralelogramo = E/S, retângulo = processo, losango = decisão.'),
      L('A loop is an arrow back to an earlier decision.', 'Un ciclo es una flecha que vuelve a una decisión anterior.', 'Um laço é uma seta que volta a uma decisão anterior.')],
    chk(L('With the parking flowchart, what fee is written for 9 hours?', 'Con el diagrama del estacionamiento, ¿qué tarifa se escribe para 9 horas?', 'Com o fluxograma do estacionamento, que tarifa é escrita para 9 horas?'),
      [same('24'), same('20'), same('27')], 1,
      L('(9 − 1) × 3 = 24, which is more than 20, so the cap gives 20.', '(9 − 1) × 3 = 24, que supera 20, así que el tope deja 20.', '(9 − 1) × 3 = 24, que passa de 20, então o teto deixa 20.')),
    [pf(L('A diamond with only one exit.', 'Un rombo con una sola salida.', 'Um losango com uma única saída.'),
      L('Every decision needs a yes path and a no path.', 'Toda decisión necesita un camino para sí y otro para no.', 'Toda decisão precisa de um caminho para sim e outro para não.'))],
    [ex('p1w1-ex-3-1', 1, L('Bus fare', 'Pasaje de bus', 'Passagem de ônibus'),
      L('Children under 6 ride free, ages 6–17 pay 1, everyone else pays 2. List the shapes in order.', 'Los menores de 6 viajan gratis, de 6 a 17 pagan 1 y el resto paga 2. Enumera las figuras en orden.', 'Menores de 6 viajam de graça, de 6 a 17 pagam 1 e o resto paga 2. Liste as formas em ordem.'),
      L('Two diamonds, three rectangles.', 'Dos rombos y tres rectángulos.', 'Dois losangos e três retângulos.'),
      L('START → READ age → age < 6? yes: fare <- 0; no → age <= 17? yes: fare <- 1; no: fare <- 2 → WRITE fare → END.', 'INICIO → LEER edad → ¿edad < 6? sí: pasaje <- 0; no → ¿edad <= 17? sí: pasaje <- 1; no: pasaje <- 2 → ESCRIBIR pasaje → FIN.', 'INÍCIO → LER idade → idade < 6? sim: tarifa <- 0; não → idade <= 17? sim: tarifa <- 1; não: tarifa <- 2 → ESCREVER tarifa → FIM.')),
    ex('p1w1-ex-3-2', 2, L('Draw a loop', 'Dibuja un ciclo', 'Desenhe um laço'),
      L('Draw a flowchart that writes a countdown from n to 1 and then “Go”.', 'Dibuja un diagrama que escriba una cuenta regresiva de n a 1 y luego “¡Ya!”.', 'Desenhe um fluxograma que escreva uma contagem regressiva de n a 1 e depois “Já!”.'),
      L('The diamond is n > 0; its yes arrow returns after n <- n − 1.', 'El rombo es n > 0; su flecha de sí regresa después de n <- n − 1.', 'O losango é n > 0; a seta do sim volta depois de n <- n − 1.'),
      L('START → READ n → n > 0? yes: WRITE n → n <- n − 1 → back to the diamond; no: WRITE “Go” → END. n = 3 gives 3, 2, 1, Go.', 'INICIO → LEER n → ¿n > 0? sí: ESCRIBIR n → n <- n − 1 → volver al rombo; no: ESCRIBIR “¡Ya!” → FIN. Con n = 3: 3, 2, 1, ¡Ya!', 'INÍCIO → LER n → n > 0? sim: ESCREVER n → n <- n − 1 → volta ao losango; não: ESCREVER “Já!” → FIM. Com n = 3: 3, 2, 1, Já!'))]),

  lesson('p1w1-l4-computer', L('How a computer runs a program', 'Cómo ejecuta una computadora un programa', 'Como um computador executa um programa'), 15,
    text(L('A toy machine adds 7 and 5. Program and data share the memory.', 'Una máquina de juguete suma 7 y 5. Programa y datos comparten la memoria.', 'Uma máquina de brinquedo soma 7 e 5. Programa e dados dividem a memória.'),
      `Address  Content      Meaning
0        LOAD_A 20    register A <- memory[20]   (A = 7)
1        LOAD_B 21    register B <- memory[21]   (B = 5)
2        ADD A B      A <- A + B in the ALU      (A = 12)
3        STORE_A 22   memory[22] <- A
4        HALT
20       7
21       5
22       12           <- result`),
    [
      L('Every computer accepts **input**, **processes** it by following instructions mechanically, and produces **output**. What sets it apart from a calculator is that it is programmable: change the instructions and the same hardware does a new job.',
        'Toda computadora recibe **entradas**, las **procesa** siguiendo instrucciones de forma mecánica y produce **salidas**. Lo que la distingue de una calculadora es que es programable: cambias las instrucciones y el mismo hardware hace otro trabajo.',
        'Todo computador recebe **entradas**, as **processa** seguindo instruções de forma mecânica e produz **saídas**. O que o diferencia de uma calculadora é ser programável: mude as instruções e o mesmo hardware faz outro trabalho.'),
      L('In the **stored-program** design, the program sits in memory (RAM) next to its data. The CPU’s control unit fetches the next instruction, the arithmetic logic unit (ALU) computes, and a few registers hold the values in use. RAM forgets everything without power; files live on disk.',
        'En el diseño de **programa almacenado**, el programa está en la memoria (RAM) junto a sus datos. La unidad de control de la CPU trae la siguiente instrucción, la unidad aritmético-lógica (ALU) calcula y unos pocos registros guardan los valores en uso. La RAM lo olvida todo sin energía; los archivos viven en el disco.',
        'No projeto de **programa armazenado**, o programa fica na memória (RAM) junto com os dados. A unidade de controle da CPU busca a próxima instrução, a unidade lógica e aritmética (ULA) calcula e alguns registradores guardam os valores em uso. A RAM esquece tudo sem energia; os arquivos ficam no disco.'),
      L('The CPU repeats one cycle billions of times per second: fetch, decode, execute. Each machine instruction is tiny, as the toy program shows. Writing real software like that would be slow and error-prone, which is why programming languages exist.',
        'La CPU repite un ciclo miles de millones de veces por segundo: traer, decodificar, ejecutar. Cada instrucción de máquina es diminuta, como muestra el programa de juguete. Escribir software real así sería lento y lleno de errores; por eso existen los lenguajes de programación.',
        'A CPU repete um ciclo bilhões de vezes por segundo: buscar, decodificar, executar. Cada instrução de máquina é minúscula, como mostra o programa de brinquedo. Escrever software de verdade assim seria lento e cheio de erros; por isso existem as linguagens de programação.'),
    ],
    L('The CPU is a fast but literal cook, RAM is the counter where the recipe card and the ingredients lie, and the registers are the cook’s two hands.',
      'La CPU es un cocinero rápido pero literal, la RAM es la mesada donde están la tarjeta de la receta y los ingredientes, y los registros son sus dos manos.',
      'A CPU é um cozinheiro rápido mas literal, a RAM é a bancada onde ficam o cartão da receita e os ingredientes, e os registradores são as duas mãos dele.'),
    [L('Input → process → output.', 'Entrada → proceso → salida.', 'Entrada → processo → saída.'),
      L('Program and data share RAM; the CPU loops fetch–decode–execute.', 'Programa y datos comparten la RAM; la CPU repite traer–decodificar–ejecutar.', 'Programa e dados dividem a RAM; a CPU repete buscar–decodificar–executar.')],
    chk(L('Which part of the CPU actually adds two numbers?', '¿Qué parte de la CPU suma realmente dos números?', 'Que parte da CPU realmente soma dois números?'),
      [L('Control unit', 'Unidad de control', 'Unidade de controle'), L('ALU', 'ALU', 'ULA'), same('RAM')], 1,
      L('The control unit organises; the ALU computes; RAM only stores.', 'La unidad de control organiza; la ALU calcula; la RAM solo almacena.', 'A unidade de controle organiza; a ULA calcula; a RAM só armazena.')),
    [pf(L('Thinking RAM keeps data after the program closes.', 'Creer que la RAM conserva los datos al cerrar el programa.', 'Achar que a RAM guarda os dados depois que o programa fecha.'),
      L('RAM is temporary; save to a file to keep data.', 'La RAM es temporal; guarda en un archivo para conservarlos.', 'A RAM é temporária; salve num arquivo para mantê-los.'))],
    [ex('p1w1-ex-4-1', 1, L('In or out?', '¿Entra o sale?', 'Entra ou sai?'),
      L('Classify: microphone, printer, barcode scanner, speaker, touchscreen.', 'Clasifica: micrófono, impresora, lector de códigos de barras, parlante, pantalla táctil.', 'Classifique: microfone, impressora, leitor de código de barras, alto-falante, tela sensível ao toque.'),
      L('Does data flow into the computer or out of it?', '¿Los datos entran o salen de la computadora?', 'Os dados entram ou saem do computador?'),
      L('Input: microphone, scanner. Output: printer, speaker. The touchscreen is both.', 'Entrada: micrófono, lector. Salida: impresora, parlante. La pantalla táctil es ambas.', 'Entrada: microfone, leitor. Saída: impressora, alto-falante. A tela sensível ao toque é as duas.')),
    ex('p1w1-ex-4-2', 2, L('Subtract on the toy machine', 'Resta en la máquina de juguete', 'Subtraia na máquina de brinquedo'),
      L('Change the program to compute memory[20] − memory[21] with `SUB A B`. With 15 and 6, what ends in memory[22]?', 'Cambia el programa para calcular memoria[20] − memoria[21] con `SUB A B`. Con 15 y 6, ¿qué queda en memoria[22]?', 'Mude o programa para calcular memória[20] − memória[21] com `SUB A B`. Com 15 e 6, o que fica em memória[22]?'),
      L('Only the third instruction changes.', 'Solo cambia la tercera instrucción.', 'Só a terceira instrução muda.'),
      L('`LOAD_A 20; LOAD_B 21; SUB A B; STORE_A 22; HALT` → 9.', '`LOAD_A 20; LOAD_B 21; SUB A B; STORE_A 22; HALT` → 9.', '`LOAD_A 20; LOAD_B 21; SUB A B; STORE_A 22; HALT` → 9.'))]),

  lesson('p1w1-l5-translators', L('Compilers, interpreters, and the JVM', 'Compiladores, intérpretes y la JVM', 'Compiladores, interpretadores e a JVM'), 20,
    text(L('Java compiles once to bytecode; a JVM on each system runs it.', 'Java compila una vez a bytecode; una JVM en cada sistema lo ejecuta.', 'Java compila uma vez para bytecode; uma JVM em cada sistema o executa.'),
      `Translator    Input              Output / behaviour
assembler     assembly           machine code
compiler      whole program      machine code (before running)
interpreter   one statement      runs it immediately
transpiler    language A         language B

Java:  Ticket.java --javac--> Ticket.class (bytecode) --java--> JVM
                                    |-> Windows  |-> macOS  |-> Linux`),
    [
      L('Machine code is what the CPU runs; **assembly** gives each instruction a readable name but is tied to one processor. **High-level languages** such as Java read like English and maths and run on many machines, but someone must translate them.',
        'El código de máquina es lo que ejecuta la CPU; el **ensamblador** da a cada instrucción un nombre legible, pero depende de un procesador. Los **lenguajes de alto nivel** como Java se leen casi como inglés y matemáticas y funcionan en muchas máquinas, pero hay que traducirlos.',
        'O código de máquina é o que a CPU executa; o **assembly** dá a cada instrução um nome legível, mas depende de um processador. As **linguagens de alto nível** como Java se leem quase como inglês e matemática e rodam em muitas máquinas, mas alguém precisa traduzi-las.'),
      L('A **compiler** translates the whole program before it runs and catches many errors early. An **interpreter** translates and runs one statement at a time: it starts fast but runs slower and finds some errors only when that line runs.',
        'Un **compilador** traduce todo el programa antes de ejecutarlo y detecta muchos errores temprano. Un **intérprete** traduce y ejecuta sentencia por sentencia: arranca rápido, pero es más lento y algunos errores solo aparecen al llegar a esa línea.',
        'Um **compilador** traduz o programa inteiro antes de rodar e pega muitos erros cedo. Um **interpretador** traduz e executa uma instrução por vez: começa rápido, mas é mais lento e alguns erros só aparecem quando a linha roda.'),
      L('Java does both. `javac` compiles `Ticket.java` into **bytecode** in `Ticket.class`; then `java Ticket` starts the **JVM** (Java Virtual Machine), which interprets the bytecode and compiles the busy parts to native code while running. Any system with a JVM runs the same `.class` file.',
        'Java hace ambas cosas. `javac` compila `Ticket.java` a **bytecode** en `Ticket.class`; luego `java Ticket` inicia la **JVM** (máquina virtual de Java), que interpreta el bytecode y compila a código nativo las partes más usadas mientras se ejecuta. Cualquier sistema con una JVM ejecuta el mismo `.class`.',
        'Java faz as duas coisas. `javac` compila `Ticket.java` para **bytecode** em `Ticket.class`; depois `java Ticket` inicia a **JVM** (máquina virtual Java), que interpreta o bytecode e compila para código nativo as partes mais usadas durante a execução. Qualquer sistema com uma JVM roda o mesmo `.class`.'),
    ],
    L('A compiler translates a whole book before printing it; an interpreter translates a speech sentence by sentence. Java first translates the book into a universal shorthand that a local reader in every country reads aloud.',
      'Un compilador traduce un libro entero antes de imprimirlo; un intérprete traduce un discurso frase por frase. Java primero traduce el libro a una taquigrafía universal que un lector local de cada país lee en voz alta.',
      'Um compilador traduz um livro inteiro antes de imprimir; um intérprete traduz um discurso frase por frase. Java primeiro traduz o livro para uma taquigrafia universal que um leitor local de cada país lê em voz alta.'),
    [L('Compiler: all first. Interpreter: line by line.', 'Compilador: todo primero. Intérprete: línea por línea.', 'Compilador: tudo antes. Interpretador: linha por linha.'),
      L('`javac` → `.class` (bytecode) → `java` (JVM).', '`javac` → `.class` (bytecode) → `java` (JVM).', '`javac` → `.class` (bytecode) → `java` (JVM).')],
    chk(L('What does `javac Ticket.java` produce?', '¿Qué produce `javac Ticket.java`?', 'O que `javac Ticket.java` produz?'),
      [L('A Windows `.exe`', 'Un `.exe` de Windows', 'Um `.exe` do Windows'), L('`Ticket.class` with bytecode', '`Ticket.class` con bytecode', '`Ticket.class` com bytecode'), L('Assembly code', 'Código ensamblador', 'Código assembly')], 1,
      L('`javac` writes bytecode; the JVM runs it anywhere.', '`javac` escribe bytecode; la JVM lo ejecuta en cualquier sistema.', '`javac` escreve bytecode; a JVM o executa em qualquer sistema.')),
    [pf(L('Running `java Ticket.class`.', 'Ejecutar `java Ticket.class`.', 'Rodar `java Ticket.class`.'),
      L('Give the class name only: `java Ticket`.', 'Da solo el nombre de la clase: `java Ticket`.', 'Dê só o nome da classe: `java Ticket`.'))],
    [ex('p1w1-ex-5-1', 1, L('Which translator?', '¿Qué traductor?', 'Qual tradutor?'),
      L('Name it: (a) turns TypeScript into JavaScript; (b) runs a script line by line; (c) builds an executable from a C file.', 'Nómbralo: (a) convierte TypeScript en JavaScript; (b) ejecuta un script línea por línea; (c) crea un ejecutable desde un archivo C.', 'Diga qual: (a) transforma TypeScript em JavaScript; (b) roda um script linha por linha; (c) gera um executável de um arquivo C.'),
      L('High-level to high-level has its own name.', 'De alto nivel a alto nivel tiene nombre propio.', 'De alto nível para alto nível tem nome próprio.'),
      L('(a) transpiler; (b) interpreter; (c) compiler, plus a linker.', '(a) transpilador; (b) intérprete; (c) compilador, más un enlazador.', '(a) transpilador; (b) interpretador; (c) compilador, mais um ligador.')),
    ex('p1w1-ex-5-2', 2, L('Why portable?', '¿Por qué es portable?', 'Por que é portável?'),
      L('Explain in one sentence why one `.class` file runs on Windows and Linux.', 'Explica en una frase por qué un mismo `.class` funciona en Windows y Linux.', 'Explique numa frase por que um mesmo `.class` roda no Windows e no Linux.'),
      L('Who reads the bytecode?', '¿Quién lee el bytecode?', 'Quem lê o bytecode?'),
      L('It holds bytecode, not machine code, and each system has its own JVM that runs that bytecode.', 'Contiene bytecode y no código de máquina, y cada sistema tiene su propia JVM que ejecuta ese bytecode.', 'Ele contém bytecode e não código de máquina, e cada sistema tem sua própria JVM que executa esse bytecode.'))]),

  lesson('p1w1-l6-blocks', L('Paradigms and the three building blocks', 'Paradigmas y los tres bloques', 'Paradigmas e os três blocos'), 20,
    java(L('Sequence, selection, and repetition in one Java program. You will learn every line in the coming weeks.', 'Secuencia, selección y repetición en un programa Java. Aprenderás cada línea en las próximas semanas.', 'Sequência, seleção e repetição em um programa Java. Você vai aprender cada linha nas próximas semanas.'),
      `public class Blocks {
    public static void main(String[] args) {
        // Sequence: one statement after another
        int songs = 3;
        int minutesEach = 4;
        int total = songs * minutesEach;
        System.out.println("Playlist minutes: " + total);

        // Selection: choose one path
        if (total > 10) {
            System.out.println("Long enough for the bus ride");
        } else {
            System.out.println("Add more songs");
        }

        // Repetition: the same step several times
        for (int song = 1; song <= songs; song++) {
            System.out.println("Playing song " + song);
        }
    }
}`),
    [
      L('A **paradigm** is a style of organising solutions. **Imperative** code says how, step by step, changing stored values. **Declarative** code says what you want and lets the system find the steps, as SQL or spreadsheet formulas do.',
        'Un **paradigma** es un estilo de organizar soluciones. El código **imperativo** dice cómo, paso a paso, cambiando valores guardados. El **declarativo** dice qué quieres y deja que el sistema encuentre los pasos, como hacen SQL o las fórmulas de una hoja de cálculo.',
        'Um **paradigma** é um estilo de organizar soluções. O código **imperativo** diz como, passo a passo, mudando valores guardados. O **declarativo** diz o que você quer e deixa o sistema achar os passos, como fazem SQL ou as fórmulas de uma planilha.'),
      L('Inside the imperative family, **modular** programming splits a program into reusable procedures, and **object-oriented** programming groups data with its operations. Java supports both: you start modular and move to objects in week 6.',
        'Dentro de la familia imperativa, la programación **modular** divide un programa en procedimientos reutilizables y la **orientada a objetos** agrupa los datos con sus operaciones. Java admite ambas: empiezas con la modular y pasas a objetos en la semana 6.',
        'Dentro da família imperativa, a programação **modular** divide um programa em procedimentos reutilizáveis e a **orientada a objetos** agrupa dados com suas operações. Java aceita as duas: você começa pela modular e passa aos objetos na semana 6.'),
      L('Structured code needs only three blocks: **sequence** (in order), **selection** (choose a path with `if`), and **repetition** (loop with `for` or `while`). Every program in this course, including the final project, combines these three.',
        'El código estructurado solo necesita tres bloques: **secuencia** (en orden), **selección** (elegir un camino con `if`) y **repetición** (ciclo con `for` o `while`). Todos los programas del curso, incluido el proyecto final, combinan estos tres.',
        'O código estruturado só precisa de três blocos: **sequência** (em ordem), **seleção** (escolher um caminho com `if`) e **repetição** (laço com `for` ou `while`). Todos os programas do curso, inclusive o projeto final, combinam esses três.'),
    ],
    L('Sequence is walking down a corridor, selection is choosing a door, and repetition is walking laps until the step counter says 5000.',
      'La secuencia es caminar por un pasillo, la selección es elegir una puerta y la repetición es dar vueltas hasta que el podómetro marque 5000.',
      'A sequência é andar por um corredor, a seleção é escolher uma porta e a repetição é dar voltas até o contador de passos marcar 5000.'),
    [L('Imperative = how; declarative = what.', 'Imperativo = cómo; declarativo = qué.', 'Imperativo = como; declarativo = o quê.'),
      L('Sequence, selection, repetition build every algorithm.', 'Secuencia, selección y repetición construyen cualquier algoritmo.', 'Sequência, seleção e repetição constroem qualquer algoritmo.')],
    chk(L('How many lines starting with `Playing` does `Blocks` print?', '¿Cuántas líneas que empiezan con `Playing` imprime `Blocks`?', 'Quantas linhas começando com `Playing` o `Blocks` imprime?'),
      [same('1'), same('3'), same('12')], 1,
      L('`song` takes 1, 2, 3 because the loop runs while `song <= songs` and `songs` is 3.', '`song` toma 1, 2, 3 porque el ciclo sigue mientras `song <= songs` y `songs` vale 3.', '`song` vale 1, 2, 3 porque o laço roda enquanto `song <= songs` e `songs` é 3.')),
    [pf(L('Thinking a language allows only one paradigm.', 'Creer que un lenguaje solo admite un paradigma.', 'Achar que uma linguagem só aceita um paradigma.'),
      L('Most modern languages are multi-paradigm; the style is your choice.', 'La mayoría de los lenguajes modernos son multiparadigma; el estilo lo eliges tú.', 'A maioria das linguagens modernas é multiparadigma; o estilo é escolha sua.'))],
    [ex('p1w1-ex-6-1', 1, L('Name the block', 'Nombra el bloque', 'Diga o bloco'),
      L('(a) water each plant in a row; (b) if it rained, skip watering; (c) fill the can, then walk to the garden.', '(a) regar cada planta de una fila; (b) si llovió, no regar; (c) llenar la regadera y luego ir al jardín.', '(a) regar cada planta de uma fileira; (b) se choveu, não regar; (c) encher o regador e depois ir ao jardim.'),
      L('Look for “each”, “if”, and “then”.', 'Busca “cada”, “si” y “luego”.', 'Procure “cada”, “se” e “depois”.'),
      L('(a) repetition; (b) selection; (c) sequence.', '(a) repetición; (b) selección; (c) secuencia.', '(a) repetição; (b) seleção; (c) sequência.')),
    ex('p1w1-ex-6-2', 2, L('Predict the output', 'Predice la salida', 'Preveja a saída'),
      L('If `songs` were 2 in `Blocks`, what would it print?', 'Si `songs` valiera 2 en `Blocks`, ¿qué imprimiría?', 'Se `songs` valesse 2 em `Blocks`, o que ele imprimiria?'),
      L('Recompute `total`, then the decision, then the loop.', 'Calcula `total`, luego la decisión y luego el ciclo.', 'Calcule `total`, depois a decisão e depois o laço.'),
      L('`Playlist minutes: 8`, `Add more songs`, `Playing song 1`, `Playing song 2`.', '`Playlist minutes: 8`, `Add more songs`, `Playing song 1`, `Playing song 2`.', '`Playlist minutes: 8`, `Add more songs`, `Playing song 1`, `Playing song 2`.'))]),
];

const questions: Question[] = [
  mc('p1w1-q1', 'multiple-choice', 'p1w1-l1-thinking', L('A recipe app reuses the same “weigh, mix, bake” steps for every cake. Which habit is it using?', 'Una aplicación de recetas reutiliza los mismos pasos “pesar, mezclar, hornear” para cada pastel. ¿Qué hábito usa?', 'Um aplicativo de receitas reutiliza os mesmos passos “pesar, misturar, assar” para todo bolo. Que hábito ele usa?'),
    [L('Pattern recognition', 'Reconocimiento de patrones', 'Reconhecimento de padrões'), L('Abstraction', 'Abstracción', 'Abstração'), L('Compilation', 'Compilación', 'Compilação')], 0,
    L('Seeing that many problems share the same steps is pattern recognition.', 'Ver que muchos problemas comparten pasos es reconocimiento de patrones.', 'Perceber que muitos problemas compartilham passos é reconhecimento de padrões.')),
  tf('p1w1-q2', 'p1w1-l2-algorithms', L('“Stir until it feels right” is a good algorithm step for a computer.', '“Revolver hasta que se sienta bien” es un buen paso de algoritmo para una computadora.', '“Mexer até parecer certo” é um bom passo de algoritmo para um computador.'), false,
    L('It is ambiguous; a computer needs a measurable condition.', 'Es ambiguo; una computadora necesita una condición medible.', 'É ambíguo; um computador precisa de uma condição mensurável.')),
  match('p1w1-q3', 'p1w1-l3-flowcharts', L('Match each flowchart shape with its job.', 'Relaciona cada figura con su función.', 'Ligue cada forma à sua função.'),
    [L('Oval', 'Óvalo', 'Oval'), L('Parallelogram', 'Paralelogramo', 'Paralelogramo'), L('Rectangle', 'Rectángulo', 'Retângulo'), L('Diamond', 'Rombo', 'Losango')],
    [L('Decision', 'Decisión', 'Decisão'), L('Start or end', 'Inicio o fin', 'Início ou fim'), L('Process', 'Proceso', 'Processo'), L('Input or output', 'Entrada o salida', 'Entrada ou saída')], [1, 3, 2, 0],
    L('Oval = terminal, parallelogram = I/O, rectangle = process, diamond = decision.', 'Óvalo = terminal, paralelogramo = E/S, rectángulo = proceso, rombo = decisión.', 'Oval = terminal, paralelogramo = E/S, retângulo = processo, losango = decisão.')),
  fill('p1w1-q4', 'fill-blank', 'p1w1-l4-computer', L('The fast storage slots inside the CPU are called ____.', 'Los espacios de almacenamiento rápidos dentro de la CPU se llaman ____.', 'Os espaços de armazenamento rápidos dentro da CPU se chamam ____.'),
    ['registers', 'register', 'registros', 'registradores'], L('Registers hold the values the ALU works on.', 'Los registros guardan los valores con los que trabaja la ALU.', 'Os registradores guardam os valores com que a ULA trabalha.')),
  mc('p1w1-q5', 'code', 'p1w1-l5-translators', L('In which order do you run these commands for a new program?', '¿En qué orden ejecutas estos comandos con un programa nuevo?', 'Em que ordem você roda estes comandos num programa novo?'),
    [L('`java` first, then `javac`', 'Primero `java`, luego `javac`', 'Primeiro `java`, depois `javac`'), L('`javac` first, then `java`', 'Primero `javac`, luego `java`', 'Primeiro `javac`, depois `java`'), L('Either order', 'Cualquier orden', 'Qualquer ordem')], 1,
    L('`javac` creates `Ticket.class`; only then can `java` run it.', '`javac` crea `Ticket.class`; solo entonces `java` puede ejecutarlo.', '`javac` cria `Ticket.class`; só então `java` consegue rodá-lo.'), 'java Ticket\njavac Ticket.java'),
  fill('p1w1-q6', 'short-answer', 'p1w1-l5-translators', L('Why can the same `.class` file run on Windows and on Linux?', '¿Por qué el mismo `.class` puede ejecutarse en Windows y en Linux?', 'Por que o mesmo `.class` pode rodar no Windows e no Linux?'),
    ['jvm|virtual', 'bytecode|byte code'], L('It holds bytecode, which the JVM on each system runs.', 'Contiene bytecode, que la JVM de cada sistema ejecuta.', 'Ele contém bytecode, que a JVM de cada sistema executa.')),
  mc('p1w1-q7', 'code', 'p1w1-l6-blocks', L('What does this fragment print?', '¿Qué imprime este fragmento?', 'O que este trecho imprime?'),
    [same('1 2 3 4'), same('2 4 6 8'), same('2 4 6')], 1,
    L('`i` goes from 1 to 4 and each value is doubled.', '`i` va de 1 a 4 y cada valor se duplica.', '`i` vai de 1 a 4 e cada valor é dobrado.'), 'for (int i = 1; i <= 4; i++) {\n    System.out.print(i * 2 + " ");\n}'),
  mc('p1w1-q8', 'scenario', 'p1w1-l6-blocks', L('Which statement describes declarative programming?', '¿Qué afirmación describe la programación declarativa?', 'Que afirmação descreve a programação declarativa?'),
    [L('You list each step that changes variables', 'Enumeras cada paso que cambia variables', 'Você lista cada passo que muda variáveis'), L('You describe the result; the system finds the steps', 'Describes el resultado; el sistema encuentra los pasos', 'Você descreve o resultado; o sistema acha os passos'), L('You write machine code', 'Escribes código de máquina', 'Você escreve código de máquina')], 1,
    L('SQL is typical: you say which rows you want, not how to find them.', 'SQL es típico: dices qué filas quieres, no cómo encontrarlas.', 'SQL é típico: você diz que linhas quer, não como achá-las.')),
];

const activities: Activity[] = [
  { id: 'p1w1-act-order', kind: 'order', lessonId: 'p1w1-l1-thinking', title: L('From problem to program', 'Del problema al programa', 'Do problema ao programa'),
    prompt: L('Put the stages in order.', 'Ordena las etapas.', 'Coloque as etapas em ordem.'),
    items: [L('Understand inputs, outputs, and rules', 'Entender entradas, salidas y reglas', 'Entender entradas, saídas e regras'), L('Design the algorithm', 'Diseñar el algoritmo', 'Projetar o algoritmo'), L('Write it in Java', 'Escribirlo en Java', 'Escrevê-lo em Java'), L('Compile and run', 'Compilar y ejecutar', 'Compilar e executar'), L('Test and look back', 'Probar y revisar', 'Testar e revisar')],
    explanation: L('Understanding comes first; testing closes the loop.', 'Entender va primero; probar cierra el ciclo.', 'Entender vem primeiro; testar fecha o ciclo.') },
  { id: 'p1w1-act-shapes', kind: 'classify', lessonId: 'p1w1-l3-flowcharts', title: L('Which shape?', '¿Qué figura?', 'Qual forma?'),
    prompt: L('Sort each step into its flowchart shape.', 'Clasifica cada paso según su figura.', 'Classifique cada passo pela forma.'),
    buckets: [L('Parallelogram (I/O)', 'Paralelogramo (E/S)', 'Paralelogramo (E/S)'), L('Rectangle (process)', 'Rectángulo (proceso)', 'Retângulo (processo)'), L('Diamond (decision)', 'Rombo (decisión)', 'Losango (decisão)')],
    items: [
      { text: L('Read the temperature', 'Leer la temperatura', 'Ler a temperatura'), bucket: 0 }, { text: same('total <- total + price'), bucket: 1 },
      { text: L('Is the age at least 18?', '¿La edad es al menos 18?', 'A idade é pelo menos 18?'), bucket: 2 }, { text: L('Show the bill', 'Mostrar la cuenta', 'Mostrar a conta'), bucket: 0 },
      { text: same('average <- sum / 3'), bucket: 1 }, { text: L('Is the cart empty?', '¿El carrito está vacío?', 'O carrinho está vazio?'), bucket: 2 },
    ],
    explanation: L('Reading and showing are I/O; assignments are processes; questions are decisions.', 'Leer y mostrar son E/S; las asignaciones son procesos; las preguntas son decisiones.', 'Ler e mostrar são E/S; atribuições são processos; perguntas são decisões.') },
  { id: 'p1w1-act-translators', kind: 'classify', lessonId: 'p1w1-l5-translators', title: L('Compiler or interpreter?', '¿Compilador o intérprete?', 'Compilador ou interpretador?'),
    prompt: L('Sort each statement.', 'Clasifica cada afirmación.', 'Classifique cada afirmação.'),
    buckets: [L('Compiler', 'Compilador', 'Compilador'), L('Interpreter', 'Intérprete', 'Interpretador')],
    items: [
      { text: L('Translates the whole program first', 'Traduce todo el programa primero', 'Traduz o programa inteiro antes'), bucket: 0 },
      { text: L('Runs statement by statement', 'Ejecuta sentencia por sentencia', 'Executa instrução por instrução'), bucket: 1 },
      { text: L('Produces a file you run many times', 'Produce un archivo que ejecutas muchas veces', 'Produz um arquivo que você roda muitas vezes'), bucket: 0 },
      { text: L('Finds some errors only when the line runs', 'Encuentra algunos errores solo al ejecutar la línea', 'Acha alguns erros só quando a linha roda'), bucket: 1 },
    ],
    explanation: L('Java uses both: `javac` compiles, the JVM interprets and compiles on the fly.', 'Java usa ambos: `javac` compila y la JVM interpreta y compila sobre la marcha.', 'Java usa os dois: `javac` compila e a JVM interpreta e compila durante a execução.') },
  { id: 'p1w1-act-fill', kind: 'code-fill', lessonId: 'p1w1-l5-translators', title: L('Compile and run', 'Compilar y ejecutar', 'Compilar e executar'),
    prompt: L('Complete the two commands for `Blocks.java`.', 'Completa los dos comandos para `Blocks.java`.', 'Complete os dois comandos para `Blocks.java`.'),
    template: '{0} Blocks.java\n{1} Blocks', blanks: ['javac', 'java'],
    explanation: L('`javac` compiles; `java` runs the class by name.', '`javac` compila; `java` ejecuta la clase por su nombre.', '`javac` compila; `java` roda a classe pelo nome.') },
];

const labs: Lab[] = [
  { id: 'p1w1-lab1-setup', level: 1, minutes: 60,
    title: L('Install a JDK and an editor, run your first program', 'Instala un JDK y un editor y ejecuta tu primer programa', 'Instale um JDK e um editor e rode seu primeiro programa'),
    goal: L('Get `javac` and `java` working on Linux or Windows, then compile and run `Blocks.java` in the terminal and in the IDE.', 'Lograr que `javac` y `java` funcionen en Linux o Windows, y compilar y ejecutar `Blocks.java` en la terminal y en el IDE.', 'Fazer `javac` e `java` funcionarem no Linux ou no Windows e compilar e rodar `Blocks.java` no terminal e na IDE.'),
    steps: [
      { id: 'p1w1-lab1-s1', title: L('Linux (Debian/Ubuntu): install the JDK', 'Linux (Debian/Ubuntu): instala el JDK', 'Linux (Debian/Ubuntu): instale o JDK'),
        commands: ['sudo apt update', 'sudo apt install -y openjdk-21-jdk', 'java -version', 'javac -version'],
        expected: L('Both print a version starting with 21 (or newer). On Fedora: `sudo dnf install java-21-openjdk-devel`.', 'Ambos muestran una versión que empieza por 21 (o más nueva). En Fedora: `sudo dnf install java-21-openjdk-devel`.', 'Os dois mostram uma versão que começa com 21 (ou mais nova). No Fedora: `sudo dnf install java-21-openjdk-devel`.') },
      { id: 'p1w1-lab1-s2', title: L('Windows: install the JDK in PowerShell', 'Windows: instala el JDK en PowerShell', 'Windows: instale o JDK no PowerShell'),
        commands: ['winget install EclipseAdoptium.Temurin.21.JDK', '# close PowerShell and open a new one', 'java -version', 'javac -version'],
        expected: L('Both print version 21. If `javac` is “not recognized”, open a new terminal; if it persists, add the JDK `bin` folder to the `Path` variable, or reinstall from adoptium.net ticking “Add to PATH”.', 'Ambos muestran la versión 21. Si `javac` “no se reconoce”, abre una terminal nueva; si sigue, agrega la carpeta `bin` del JDK a la variable `Path` o reinstala desde adoptium.net marcando “Add to PATH”.', 'Os dois mostram a versão 21. Se `javac` “não é reconhecido”, abra um terminal novo; se continuar, adicione a pasta `bin` do JDK à variável `Path` ou reinstale pelo adoptium.net marcando “Add to PATH”.') },
      { id: 'p1w1-lab1-s3', title: L('Install an editor', 'Instala un editor', 'Instale um editor'),
        commands: ['# Option A: Visual Studio Code with the Java extensions', 'code --install-extension vscjava.vscode-java-pack', '# Option B: IntelliJ IDEA Community Edition (free), from jetbrains.com/idea'],
        expected: L('The editor colours `.java` files and underlines errors. In IntelliJ choose New Project → Java and select JDK 21.', 'El editor colorea los archivos `.java` y subraya errores. En IntelliJ elige New Project → Java y selecciona el JDK 21.', 'O editor colore os arquivos `.java` e sublinha erros. No IntelliJ escolha New Project → Java e selecione o JDK 21.') },
      { id: 'p1w1-lab1-s4', title: L('Create, compile, and run Blocks.java', 'Crea, compila y ejecuta Blocks.java', 'Crie, compile e rode Blocks.java'),
        commands: ['mkdir -p ~/prog1/week1 && cd ~/prog1/week1', '# save the program from Lesson 6 as Blocks.java', 'javac Blocks.java', 'ls', 'java Blocks'],
        expected: L('`ls` shows `Blocks.java` and `Blocks.class`. Output: `Playlist minutes: 12`, `Long enough for the bus ride`, then `Playing song 1` to `Playing song 3`.', '`ls` muestra `Blocks.java` y `Blocks.class`. Salida: `Playlist minutes: 12`, `Long enough for the bus ride` y luego de `Playing song 1` a `Playing song 3`.', '`ls` mostra `Blocks.java` e `Blocks.class`. Saída: `Playlist minutes: 12`, `Long enough for the bus ride` e depois de `Playing song 1` a `Playing song 3`.') },
      { id: 'p1w1-lab1-s5', title: L('Break it on purpose', 'Rómpelo a propósito', 'Quebre de propósito'),
        commands: ['# delete one semicolon in Blocks.java, save, then:', 'javac Blocks.java'],
        expected: L('`javac` stops with `error: \';\' expected` and the line number. Fix it and compile again. Reading compiler messages calmly is a core skill.', '`javac` se detiene con `error: \';\' expected` y el número de línea. Corrígelo y vuelve a compilar. Leer con calma los mensajes del compilador es clave.', '`javac` para com `error: \';\' expected` e o número da linha. Corrija e compile de novo. Ler com calma as mensagens do compilador é essencial.') },
      { id: 'p1w1-lab1-s6', title: L('Run it from the IDE', 'Ejecútalo desde el IDE', 'Rode pela IDE'), commands: [],
        expected: L('Open the folder, open `Blocks.java`, and click the green `Run` arrow next to `main`. The Run panel shows the same output as the terminal.', 'Abre la carpeta, abre `Blocks.java` y pulsa la flecha verde `Run` junto a `main`. El panel muestra la misma salida que la terminal.', 'Abra a pasta, abra `Blocks.java` e clique na seta verde `Run` ao lado de `main`. O painel mostra a mesma saída do terminal.') },
    ] },
  { id: 'p1w1-lab2-paper', kind: 'math', level: 2, minutes: 40,
    title: L('Algorithms on paper', 'Algoritmos en papel', 'Algoritmos no papel'),
    goal: L('Specify, write pseudocode, draw a flowchart, and trace three small problems.', 'Especificar, escribir pseudocódigo, dibujar el diagrama y recorrer tres problemas pequeños.', 'Especificar, escrever pseudocódigo, desenhar o fluxograma e percorrer três problemas pequenos.'),
    steps: [
      { id: 'p1w1-lab2-s1', title: L('Phone data plan', 'Plan de datos del celular', 'Plano de dados do celular'),
        commands: [], expected: L('Read the GB used. Up to 5 GB costs 10; each extra GB costs 3. Trace: 4 → 10, 5 → 10, 8 → 19.', 'Lee los GB usados. Hasta 5 GB cuesta 10; cada GB extra cuesta 3. Prueba: 4 → 10, 5 → 10, 8 → 19.', 'Leia os GB usados. Até 5 GB custa 10; cada GB extra custa 3. Teste: 4 → 10, 5 → 10, 8 → 19.') },
      { id: 'p1w1-lab2-s2', title: L('Countdown', 'Cuenta regresiva', 'Contagem regressiva'),
        commands: [], expected: L('A `WHILE n > 0` loop that writes `n` and then does `n <- n - 1`. Its flowchart has an arrow back to the diamond. n = 3 → 3, 2, 1.', 'Un ciclo `WHILE n > 0` que escribe `n` y luego hace `n <- n - 1`. Su diagrama tiene una flecha que vuelve al rombo. n = 3 → 3, 2, 1.', 'Um laço `WHILE n > 0` que escreve `n` e depois faz `n <- n - 1`. O fluxograma tem uma seta de volta ao losango. n = 3 → 3, 2, 1.') },
      { id: 'p1w1-lab2-s3', title: L('Rainiest day', 'El día más lluvioso', 'O dia mais chuvoso'),
        commands: [], expected: L('Read 7 rainfall values and write the largest and its day. Trace 3, 0, 12, 5, 12, 1, 0 → 12 on day 3 (a later tie does not replace it because the test is `>`).', 'Lee 7 valores de lluvia y escribe el mayor y su día. Prueba 3, 0, 12, 5, 12, 1, 0 → 12 el día 3 (un empate posterior no lo reemplaza porque la prueba es `>`).', 'Leia 7 valores de chuva e escreva o maior e seu dia. Teste 3, 0, 12, 5, 12, 1, 0 → 12 no dia 3 (um empate depois não substitui porque o teste é `>`).') },
    ] },
];

const resources: ExternalResource[] = [
  { id: 'p1w1-r1', title: 'dev.java: Getting started with Java', url: 'https://dev.java/learn/getting-started/', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Official guide to installing a JDK and running a first program.', 'Guía oficial para instalar un JDK y ejecutar un primer programa.', 'Guia oficial para instalar um JDK e rodar um primeiro programa.') },
  { id: 'p1w1-r2', title: 'Eclipse Adoptium (Temurin JDK)', url: 'https://adoptium.net/', kind: 'tutorial', verifiedOn: '2026-11-04', note: L('Free JDK builds for Windows, macOS, and Linux.', 'JDK gratuitos para Windows, macOS y Linux.', 'JDK gratuitos para Windows, macOS e Linux.') },
  { id: 'p1w1-r3', title: 'Wikipedia: Flowchart', url: 'https://en.wikipedia.org/wiki/Flowchart', kind: 'article', verifiedOn: '2026-11-04', note: L('The standard shapes with examples.', 'Las figuras estándar con ejemplos.', 'As formas padrão com exemplos.') },
  { id: 'p1w1-r4', title: 'Wikipedia: Programming paradigm', url: 'https://en.wikipedia.org/wiki/Programming_paradigm', kind: 'article', verifiedOn: '2026-11-04', note: L('Imperative, declarative, and their families.', 'Imperativo, declarativo y sus familias.', 'Imperativo, declarativo e suas famílias.') },
];

/** Programming 1, Week 1: introduction to programming. */
export const prog1Week1: WeekContent = {
  id: 'y1-t1-m1-prog-w1', year: 1, term: 1, module: 1, week: 1, subject: 'programming-1',
  title: L('Introduction to programming', 'Introducción a la programación', 'Introdução à programação'),
  intro: L('This week lays the foundation: attack a problem with computational thinking, write the solution as pseudocode or a flowchart, see what a computer does when it runs a program, and learn how Java turns your code into something any computer can run. You also install a JDK and an editor and run your first program.',
    'Esta semana pone los cimientos: atacar un problema con pensamiento computacional, escribir la solución en pseudocódigo o en un diagrama de flujo, ver qué hace una computadora al ejecutar un programa y entender cómo Java convierte tu código en algo que cualquier computadora puede ejecutar. Además instalas un JDK y un editor y ejecutas tu primer programa.',
    'Esta semana monta a base: atacar um problema com pensamento computacional, escrever a solução em pseudocódigo ou fluxograma, ver o que um computador faz ao rodar um programa e entender como Java transforma seu código em algo que qualquer computador executa. Você também instala um JDK e um editor e roda seu primeiro programa.'),
  objectives: [
    L('Apply decomposition, patterns, abstraction, and algorithms to everyday problems.', 'Aplicar descomposición, patrones, abstracción y algoritmos a problemas cotidianos.', 'Aplicar decomposição, padrões, abstração e algoritmos a problemas do dia a dia.'),
    L('Write and trace algorithms as pseudocode and flowcharts.', 'Escribir y recorrer algoritmos en pseudocódigo y diagramas de flujo.', 'Escrever e percorrer algoritmos em pseudocódigo e fluxogramas.'),
    L('Explain input–process–output, the CPU, and memory.', 'Explicar entrada–proceso–salida, la CPU y la memoria.', 'Explicar entrada–processo–saída, a CPU e a memória.'),
    L('Distinguish compilers and interpreters and describe how Java runs.', 'Distinguir compiladores e intérpretes y describir cómo se ejecuta Java.', 'Distinguir compiladores e interpretadores e descrever como o Java roda.'),
    L('Compile and run a Java program from the terminal and an IDE.', 'Compilar y ejecutar un programa Java desde la terminal y un IDE.', 'Compilar e rodar um programa Java pelo terminal e por uma IDE.'),
  ],
  prerequisites: [L('None. Knowing how to use files, folders, and a terminal window helps.', 'Ninguno. Ayuda saber usar archivos, carpetas y una terminal.', 'Nenhum. Ajuda saber usar arquivos, pastas e um terminal.')],
  keyConcepts: [L('Computational thinking', 'Pensamiento computacional', 'Pensamento computacional'), L('Algorithm', 'Algoritmo', 'Algoritmo'), L('Pseudocode', 'Pseudocódigo', 'Pseudocódigo'), L('Flowchart', 'Diagrama de flujo', 'Fluxograma'), L('Compiler and interpreter', 'Compilador e intérprete', 'Compilador e interpretador'), L('Bytecode and JVM', 'Bytecode y JVM', 'Bytecode e JVM'), L('Sequence, selection, repetition', 'Secuencia, selección, repetición', 'Sequência, seleção, repetição')],
  estimatedMinutes: 280,
  sequence: [L('Lessons 1–3, then Lab 2 on paper.', 'Lecciones 1–3 y luego el Laboratorio 2 en papel.', 'Lições 1–3 e depois o Laboratório 2 no papel.'), L('Lessons 4–5, then Lab 1.', 'Lecciones 4–5 y luego el Laboratorio 1.', 'Lições 4–5 e depois o Laboratório 1.'), L('Lesson 6, activities, and the quiz.', 'Lección 6, actividades y cuestionario.', 'Lição 6, atividades e questionário.')],
  outcomes: [L('You turn a small problem into a traced algorithm.', 'Conviertes un problema pequeño en un algoritmo probado.', 'Você transforma um problema pequeno num algoritmo testado.'), L('Your computer compiles and runs Java.', 'Tu computadora compila y ejecuta Java.', 'Seu computador compila e roda Java.')],
  checklist: [L('Read the six lessons', 'Leer las seis lecciones', 'Ler as seis lições'), L('Finish both labs', 'Terminar los dos laboratorios', 'Terminar os dois laboratórios'), L('Score at least 80% on the quiz', 'Obtener al menos 80% en el cuestionario', 'Tirar pelo menos 80% no questionário')],
  commonMistakes: [
    { mistake: L('Coding before understanding the problem.', 'Programar antes de entender el problema.', 'Programar antes de entender o problema.'), fix: L('Write inputs, outputs, and two examples first.', 'Escribe primero entradas, salidas y dos ejemplos.', 'Escreva primeiro entradas, saídas e dois exemplos.') },
    { mistake: L('A file name that differs from the class name.', 'Un archivo con un nombre distinto al de la clase.', 'Um arquivo com nome diferente da classe.'), fix: L('`public class Blocks` lives in `Blocks.java`, same capitals.', '`public class Blocks` va en `Blocks.java`, con las mismas mayúsculas.', '`public class Blocks` fica em `Blocks.java`, com as mesmas maiúsculas.') },
  ],
  lessons,
  flashcards: [
    fc('p1w1-fc-1', 'p1w1-l1-thinking', 'concept', L('Computational thinking', 'Pensamiento computacional', 'Pensamento computacional'), L('Decomposition, pattern recognition, abstraction, and algorithms, so a computer could run the solution.', 'Descomposición, reconocimiento de patrones, abstracción y algoritmos, para que una computadora pueda ejecutar la solución.', 'Decomposição, reconhecimento de padrões, abstração e algoritmos, para que um computador possa executar a solução.')),
    fc('p1w1-fc-2', 'p1w1-l1-thinking', 'concept', L('Abstraction', 'Abstracción', 'Abstração'), L('Keeping only the details that matter.', 'Quedarse solo con los detalles que importan.', 'Ficar só com os detalhes que importam.')),
    fc('p1w1-fc-3', 'p1w1-l2-algorithms', 'concept', L('Algorithm', 'Algoritmo', 'Algoritmo'), L('A finite, unambiguous, ordered list of steps from inputs to output.', 'Una lista finita, inequívoca y ordenada de pasos de las entradas a la salida.', 'Uma lista finita, inequívoca e ordenada de passos das entradas à saída.')),
    fc('p1w1-fc-4', 'p1w1-l2-algorithms', 'concept', L('Tracing', 'Recorrer un algoritmo', 'Percorrer um algoritmo'), L('Following each step by hand with chosen inputs and writing the values down.', 'Seguir cada paso a mano con entradas elegidas y anotar los valores.', 'Seguir cada passo à mão com entradas escolhidas e anotar os valores.')),
    fc('p1w1-fc-5', 'p1w1-l3-flowcharts', 'concept', L('Flowchart diamond', 'Rombo del diagrama', 'Losango do fluxograma'), L('A yes/no decision with two exits.', 'Una decisión de sí o no con dos salidas.', 'Uma decisão de sim ou não com duas saídas.')),
    fc('p1w1-fc-6', 'p1w1-l4-computer', 'concept', L('Stored-program design', 'Diseño de programa almacenado', 'Projeto de programa armazenado'), L('Program and data live in memory; the CPU fetches instructions from there.', 'Programa y datos viven en la memoria; la CPU trae de allí las instrucciones.', 'Programa e dados ficam na memória; a CPU busca as instruções de lá.')),
    fc('p1w1-fc-7', 'p1w1-l4-computer', 'distinction', L('Control unit vs ALU', 'Unidad de control vs ALU', 'Unidade de controle vs ULA'), L('The control unit fetches and decodes; the ALU computes.', 'La unidad de control trae y decodifica; la ALU calcula.', 'A unidade de controle busca e decodifica; a ULA calcula.')),
    fc('p1w1-fc-8', 'p1w1-l5-translators', 'distinction', L('Compiler vs interpreter', 'Compilador vs intérprete', 'Compilador vs interpretador'), L('A compiler translates everything first; an interpreter runs statement by statement.', 'El compilador traduce todo primero; el intérprete ejecuta sentencia por sentencia.', 'O compilador traduz tudo antes; o interpretador executa instrução por instrução.')),
    fc('p1w1-fc-9', 'p1w1-l5-translators', 'command', same('javac Blocks.java'), L('Compiles the source into `Blocks.class` (bytecode).', 'Compila el código a `Blocks.class` (bytecode).', 'Compila o código para `Blocks.class` (bytecode).')),
    fc('p1w1-fc-10', 'p1w1-l5-translators', 'command', same('java Blocks'), L('Starts the JVM and runs the class `Blocks`.', 'Inicia la JVM y ejecuta la clase `Blocks`.', 'Inicia a JVM e roda a classe `Blocks`.')),
    fc('p1w1-fc-11', 'p1w1-l6-blocks', 'concept', L('The three building blocks', 'Los tres bloques', 'Os três blocos'), L('Sequence, selection, repetition.', 'Secuencia, selección, repetición.', 'Sequência, seleção, repetição.')),
  ],
  questions, activities, labs,
  plan: [
    day(1, 45, 'read', L('Lessons 1–3: thinking, algorithms, flowcharts.', 'Lecciones 1–3: pensamiento, algoritmos, diagramas.', 'Lições 1–3: pensamento, algoritmos, fluxogramas.')),
    day(2, 40, 'practice', L('Lab 2 on paper and the lesson exercises.', 'Laboratorio 2 en papel y ejercicios de las lecciones.', 'Laboratório 2 no papel e exercícios das lições.')),
    day(3, 35, 'read', L('Lessons 4–5: the computer and the JVM.', 'Lecciones 4–5: la computadora y la JVM.', 'Lições 4–5: o computador e a JVM.')),
    day(4, 60, 'practice', L('Lab 1: install and run your first program.', 'Laboratorio 1: instala y ejecuta tu primer programa.', 'Laboratório 1: instale e rode seu primeiro programa.')),
    day(5, 30, 'review', L('Lesson 6, activities, and flashcards.', 'Lección 6, actividades y tarjetas.', 'Lição 6, atividades e cartões.')),
    day(6, 25, 'quiz', L('Quiz. Aim for 80%.', 'Cuestionario. Apunta al 80%.', 'Questionário. Mire em 80%.')),
  ],
  resources, stories: [], tools: [], videos: [], documents: [],
};
