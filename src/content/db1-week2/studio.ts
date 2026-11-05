import type { Localized } from '../types';
import type { StudioScenario } from '../db1-week1/studio';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

/** Design Studio scenarios for Databases 1, Week 2: 1:1, 1:N, N:M, and weak entities. */
export const dbWeek2StudioScenarios: StudioScenario[] = [
  {
    id: 'streaming',
    title: L('Music streaming', 'Streaming de música', 'Streaming de música'),
    brief: L(
      'A streaming service stores artists (id, name, country) and their albums (id, title, release year); each album is by one artist. Each song (id, title, duration) appears on one album. Listeners (id, email, display name) can save many songs, and a song can be saved by many listeners; each save records the date. The service also shows how many times a song was played, counted from the play log it already has.',
      'Un servicio de streaming guarda artistas (id, nombre, país) y sus álbumes (id, título, año de lanzamiento); cada álbum es de un artista. Cada canción (id, título, duración) aparece en un álbum. Los oyentes (id, correo, nombre visible) pueden guardar muchas canciones, y una canción puede ser guardada por muchos oyentes; cada guardado registra la fecha. El servicio también muestra cuántas veces se reprodujo una canción, contadas a partir del registro de reproducciones que ya tiene.',
      'Um serviço de streaming guarda artistas (id, nome, país) e seus álbuns (id, título, ano de lançamento); cada álbum é de um artista. Cada música (id, título, duração) aparece em um álbum. Ouvintes (id, e-mail, nome de exibição) podem salvar muitas músicas, e uma música pode ser salva por muitos ouvintes; cada salvamento registra a data. O serviço também mostra quantas vezes uma música foi tocada, contadas a partir do registro de reproduções que ele já tem.',
    ),
    entities: [
      { id: 'artist', name: L('Artist', 'Artista', 'Artista'), attributes: ['artist_id', 'name', 'country'], pk: 'artist_id' },
      { id: 'album', name: L('Album', 'Álbum', 'Álbum'), attributes: ['album_id', 'title', 'release_year', 'artist_id'], pk: 'album_id' },
      { id: 'song', name: L('Song', 'Canción', 'Música'), attributes: ['song_id', 'title', 'duration_s', 'album_id'], pk: 'song_id' },
      { id: 'listener', name: L('Listener', 'Oyente', 'Ouvinte'), attributes: ['listener_id', 'email', 'display_name'], pk: 'listener_id' },
      { id: 'saved_song', name: L('Saved song', 'Canción guardada', 'Música salva'), attributes: ['listener_id', 'song_id', 'saved_on'],
        keyOptions: ['listener_id', 'song_id', 'saved_on', 'listener_id + song_id'], pk: 'listener_id + song_id' },
      { id: 'play_count', name: L('Play count', 'Contador de reproducciones', 'Contador de reproduções'), attributes: ['song_id', 'plays'], pk: 'song_id',
        distractor: L('The count is derived from the play log. Storing it separately means two numbers that can disagree.', 'El conteo se deriva del registro de reproducciones. Guardarlo aparte significa dos números que pueden no coincidir.', 'A contagem deriva do registro de reproduções. Guardá-la à parte significa dois números que podem não bater.') },
      { id: 'speaker', name: L('Listener\'s speaker', 'Parlante del oyente', 'Caixa de som do ouvinte'), attributes: ['speaker_id', 'brand'], pk: 'speaker_id',
        distractor: L('The brief never asks about devices. Model only what the service must remember.', 'El enunciado nunca pregunta por dispositivos. Modela solo lo que el servicio debe recordar.', 'O enunciado nunca pergunta por dispositivos. Modele só o que o serviço precisa lembrar.') },
    ],
    solution: [
      { from: 'artist', to: 'album', card: '1:N' },
      { from: 'album', to: 'song', card: '1:N' },
      { from: 'listener', to: 'saved_song', card: '1:N' },
      { from: 'song', to: 'saved_song', card: '1:N' },
    ],
  },
  {
    id: 'bike-share',
    title: L('Bike sharing', 'Bicicletas compartidas', 'Bicicletas compartilhadas'),
    brief: L(
      'A city bike-sharing system has stations (id, name, capacity). Each bike (id, model) is docked at one station at a time, and a station holds many bikes. Riders (id, email, name) each get exactly one membership card (card number, issue date), and each card belongs to one rider. Every trip records which rider took which bike, when it started, and when it ended; riders take many trips and bikes are used in many trips. Trip length is calculated from start and end times.',
      'Un sistema de bicicletas compartidas de una ciudad tiene estaciones (id, nombre, capacidad). Cada bicicleta (id, modelo) está anclada en una estación a la vez, y una estación tiene muchas bicicletas. Cada ciclista (id, correo, nombre) recibe exactamente una tarjeta de socio (número, fecha de emisión), y cada tarjeta pertenece a un ciclista. Cada viaje registra qué ciclista usó qué bicicleta, cuándo empezó y cuándo terminó; los ciclistas hacen muchos viajes y las bicicletas se usan en muchos viajes. La duración del viaje se calcula con las horas de inicio y fin.',
      'Um sistema de bicicletas compartilhadas de uma cidade tem estações (id, nome, capacidade). Cada bicicleta (id, modelo) fica em uma estação por vez, e uma estação tem muitas bicicletas. Cada ciclista (id, e-mail, nome) recebe exatamente um cartão de sócio (número, data de emissão), e cada cartão pertence a um ciclista. Cada viagem registra qual ciclista usou qual bicicleta, quando começou e quando terminou; ciclistas fazem muitas viagens e bicicletas são usadas em muitas viagens. A duração da viagem é calculada pelos horários de início e fim.',
    ),
    entities: [
      { id: 'station', name: L('Station', 'Estación', 'Estação'), attributes: ['station_id', 'name', 'capacity'], pk: 'station_id' },
      { id: 'bike', name: L('Bike', 'Bicicleta', 'Bicicleta'), attributes: ['bike_id', 'model', 'station_id'], pk: 'bike_id' },
      { id: 'rider', name: L('Rider', 'Ciclista', 'Ciclista'), attributes: ['rider_id', 'email', 'name'], pk: 'rider_id' },
      { id: 'card', name: L('Membership card', 'Tarjeta de socio', 'Cartão de sócio'), attributes: ['card_no', 'issued_on', 'rider_id'], pk: 'card_no' },
      { id: 'trip', name: L('Trip', 'Viaje', 'Viagem'), attributes: ['trip_id', 'rider_id', 'bike_id', 'started_at', 'ended_at'], pk: 'trip_id' },
      { id: 'trip_length', name: L('Trip length', 'Duración del viaje', 'Duração da viagem'), attributes: ['trip_id', 'minutes'], pk: 'trip_id',
        distractor: L('Trip length is derived from started_at and ended_at. Calculate it in queries.', 'La duración se deriva de started_at y ended_at. Calcúlala en las consultas.', 'A duração deriva de started_at e ended_at. Calcule-a nas consultas.') },
      { id: 'city_council', name: L('City council', 'Concejo municipal', 'Câmara municipal'), attributes: ['council_id', 'mayor'], pk: 'council_id',
        distractor: L('There is one city and the brief stores nothing about it: it is the mini-world, not an entity.', 'Hay una sola ciudad y el enunciado no guarda nada sobre ella: es el minimundo, no una entidad.', 'Há uma só cidade e o enunciado não guarda nada sobre ela: é o minimundo, não uma entidade.') },
    ],
    solution: [
      { from: 'station', to: 'bike', card: '1:N' },
      { from: 'rider', to: 'card', card: '1:1' },
      { from: 'rider', to: 'trip', card: '1:N' },
      { from: 'bike', to: 'trip', card: '1:N' },
    ],
  },
  {
    id: 'vet',
    title: L('Vet clinic', 'Clínica veterinaria', 'Clínica veterinária'),
    brief: L(
      'A vet clinic records owners (id, name, phone) and their pets (id, name, species, birth date); each pet has one owner and an owner can have several pets. Vets (id, name, licence number) see many pets and a pet can see many vets: each visit stores the pet, the vet, the date, and the reason. Vaccine doses are numbered 1, 2, 3… within each pet and store the vaccine and the date given. Staff often ask for a pet\'s age.',
      'Una clínica veterinaria registra dueños (id, nombre, teléfono) y sus mascotas (id, nombre, especie, fecha de nacimiento); cada mascota tiene un dueño y un dueño puede tener varias mascotas. Los veterinarios (id, nombre, número de matrícula) atienden muchas mascotas y una mascota puede ver a muchos veterinarios: cada visita guarda la mascota, el veterinario, la fecha y el motivo. Las dosis de vacuna se numeran 1, 2, 3… dentro de cada mascota y guardan la vacuna y la fecha de aplicación. El personal pregunta a menudo la edad de una mascota.',
      'Uma clínica veterinária registra tutores (id, nome, telefone) e seus pets (id, nome, espécie, data de nascimento); cada pet tem um tutor e um tutor pode ter vários pets. Os veterinários (id, nome, número de registro) atendem muitos pets e um pet pode ver muitos veterinários: cada visita guarda o pet, o veterinário, a data e o motivo. As doses de vacina são numeradas 1, 2, 3… dentro de cada pet e guardam a vacina e a data de aplicação. A equipe pergunta com frequência a idade de um pet.',
    ),
    entities: [
      { id: 'owner', name: L('Owner', 'Dueño', 'Tutor'), attributes: ['owner_id', 'name', 'phone'], pk: 'owner_id' },
      { id: 'pet', name: L('Pet', 'Mascota', 'Pet'), attributes: ['pet_id', 'name', 'species', 'birth_date', 'owner_id'], pk: 'pet_id' },
      { id: 'vet', name: L('Vet', 'Veterinario', 'Veterinário'), attributes: ['vet_id', 'name', 'licence_no'], pk: 'vet_id' },
      { id: 'visit', name: L('Visit', 'Visita', 'Visita'), attributes: ['pet_id', 'vet_id', 'visited_on', 'reason'],
        keyOptions: ['pet_id', 'vet_id', 'visited_on', 'pet_id + vet_id', 'pet_id + vet_id + visited_on'], pk: 'pet_id + vet_id + visited_on' },
      { id: 'dose', name: L('Vaccine dose (weak)', 'Dosis de vacuna (débil)', 'Dose de vacina (fraca)'), attributes: ['pet_id', 'dose_no', 'vaccine', 'given_on'],
        keyOptions: ['pet_id', 'dose_no', 'vaccine', 'pet_id + dose_no'], pk: 'pet_id + dose_no' },
      { id: 'pet_age', name: L('Pet age', 'Edad de la mascota', 'Idade do pet'), attributes: ['pet_id', 'age'], pk: 'pet_id',
        distractor: L('Age is derived from the birth date; a stored age is wrong after every birthday.', 'La edad se deriva de la fecha de nacimiento; una edad guardada queda mal tras cada cumpleaños.', 'A idade deriva da data de nascimento; uma idade guardada fica errada a cada aniversário.') },
    ],
    solution: [
      { from: 'owner', to: 'pet', card: '1:N' },
      { from: 'pet', to: 'visit', card: '1:N' },
      { from: 'vet', to: 'visit', card: '1:N' },
      { from: 'pet', to: 'dose', card: '1:N' },
    ],
  },
  {
    id: 'timetable',
    title: L('School timetable', 'Horario escolar', 'Horário escolar'),
    brief: L(
      'A school builds its weekly timetable. Teachers (id, name) and class groups (id, label) are related in two ways: each group has exactly one tutor teacher, and a teacher tutors at most one group. Subjects have a code, a title, and weekly hours; rooms have an id and a number of seats. Each timetable slot (id, weekday, period) places one group with one subject, one teacher, and one room. The school bell schedule is fixed and is not part of the data.',
      'Un colegio arma su horario semanal. Los profesores (id, nombre) y los grupos (id, etiqueta) se relacionan de dos formas: cada grupo tiene exactamente un profesor tutor, y un profesor es tutor de un grupo como máximo. Las asignaturas tienen código, título y horas semanales; las aulas tienen id y número de asientos. Cada bloque del horario (id, día, período) ubica a un grupo con una asignatura, un profesor y un aula. El horario del timbre es fijo y no forma parte de los datos.',
      'Uma escola monta seu horário semanal. Professores (id, nome) e turmas (id, rótulo) se relacionam de duas formas: cada turma tem exatamente um professor tutor, e um professor é tutor de no máximo uma turma. Disciplinas têm código, título e horas semanais; salas têm id e número de lugares. Cada horário (id, dia, período) coloca uma turma com uma disciplina, um professor e uma sala. O horário do sinal é fixo e não faz parte dos dados.',
    ),
    entities: [
      { id: 'teacher', name: L('Teacher', 'Profesor', 'Professor'), attributes: ['teacher_id', 'name'], pk: 'teacher_id' },
      { id: 'class_group', name: L('Class group', 'Grupo', 'Turma'), attributes: ['group_id', 'label', 'tutor_id'], pk: 'group_id' },
      { id: 'subject', name: L('Subject', 'Asignatura', 'Disciplina'), attributes: ['subject_code', 'title', 'weekly_hours'], pk: 'subject_code' },
      { id: 'room', name: L('Room', 'Aula', 'Sala'), attributes: ['room_id', 'seats'], pk: 'room_id' },
      { id: 'slot', name: L('Timetable slot', 'Bloque del horario', 'Horário'), attributes: ['slot_id', 'weekday', 'period', 'group_id', 'subject_code', 'teacher_id', 'room_id'], pk: 'slot_id' },
      { id: 'bell', name: L('School bell', 'Timbre', 'Sinal da escola'), attributes: ['bell_id', 'sound'], pk: 'bell_id',
        distractor: L('The brief says the bell schedule is not part of the data.', 'El enunciado dice que el horario del timbre no forma parte de los datos.', 'O enunciado diz que o horário do sinal não faz parte dos dados.') },
    ],
    solution: [
      { from: 'teacher', to: 'class_group', card: '1:1' },
      { from: 'class_group', to: 'slot', card: '1:N' },
      { from: 'subject', to: 'slot', card: '1:N' },
      { from: 'teacher', to: 'slot', card: '1:N' },
      { from: 'room', to: 'slot', card: '1:N' },
    ],
  },
];
