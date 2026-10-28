import type { Lab } from '../types';

/**
 * Practice labs. Every command works inside ~/se-lab-sandbox or a sibling
 * bare repository created for the lab. None of them touch real projects.
 */
export const week1Labs: Lab[] = [
  {
    id: 'lab-1-init-and-commit',
    level: 1,
    minutes: 20,
    title: { en: 'Initialise a repository and make your first commit', es: 'Inicializar un repositorio y hacer tu primer commit' },
    goal: { en: 'Create a repository, check its status, stage a file, and record a commit.', es: 'Crear un repositorio, revisar su estado, preparar un archivo y registrar un commit.' },
    steps: [
      {
        id: 'l1-s1', title: { en: 'Create the sandbox folder', es: 'Crear la carpeta de prueba' },
        commands: [
          'mkdir -p ~/se-lab-sandbox && cd ~/se-lab-sandbox',
          'git init -b main',
          'git config user.name "Lab Student"',
          'git config user.email "student@example.com"',
        ],
        expected: { en: 'A message says the empty repository was initialised with main as the branch.', es: 'Un mensaje indica que se inicializó un repositorio vacío con main como rama.' },
      },
      {
        id: 'l1-s2', title: { en: 'Create a file and check status', es: 'Crear un archivo y revisar el estado' },
        commands: [
          'echo "# Sandbox" > README.md',
          'git status',
        ],
        expected: { en: 'README.md is listed under "Untracked files".', es: 'README.md aparece en "Untracked files".' },
      },
      {
        id: 'l1-s3', title: { en: 'Stage and commit', es: 'Preparar y hacer commit' },
        commands: [
          'git add README.md',
          'git status',
          'git commit -m "add README"',
          'git log --oneline',
        ],
        expected: { en: 'One commit appears with the message "add README". The status is clean afterwards.', es: 'Aparece un commit con el mensaje "add README". El estado queda limpio.' },
      },
    ],
  },
  {
    id: 'lab-2-history-and-branches',
    level: 2,
    minutes: 30,
    title: { en: 'Read history and work on a branch', es: 'Leer el historial y trabajar en una rama' },
    goal: { en: 'Inspect history, create a feature branch, commit on it, and merge it back.', es: 'Revisar el historial, crear una rama de funcionalidad, hacer commit en ella y fusionarla.' },
    steps: [
      {
        id: 'l2-s1', title: { en: 'Create a feature branch', es: 'Crear una rama de funcionalidad' },
        commands: [
          'cd ~/se-lab-sandbox',
          'git switch -c feature-sum',
          'git branch',
        ],
        expected: { en: 'The current branch, marked with *, is feature-sum.', es: 'La rama actual, marcada con *, es feature-sum.' },
      },
      {
        id: 'l2-s2', title: { en: 'Commit a small feature', es: 'Hacer commit de una pequeña funcionalidad' },
        commands: [
          'printf "def add(a, b):\\n    return a + b\\n" > calc.py',
          'git add calc.py',
          'git commit -m "add sum functionality"',
        ],
        expected: { en: 'The commit appears only on feature-sum. main does not contain calc.py yet.', es: 'El commit aparece solo en feature-sum. main todavía no tiene calc.py.' },
      },
      {
        id: 'l2-s3', title: { en: 'Merge into main', es: 'Fusionar con main' },
        commands: [
          'git switch main',
          'git merge feature-sum',
          'git log --oneline --graph --all',
        ],
        expected: { en: 'A fast-forward merge is reported. The graph shows main and feature-sum at the same commit.', es: 'Git informa de una fusión fast-forward. El grafo muestra main y feature-sum en el mismo commit.' },
      },
    ],
  },
  {
    id: 'lab-3-resolve-conflict',
    level: 2,
    minutes: 30,
    title: { en: 'Resolve a merge conflict', es: 'Resolver un conflicto de fusión' },
    goal: { en: 'Create two conflicting edits on purpose, resolve them, and commit the result.', es: 'Crear dos ediciones en conflicto a propósito, resolverlas y registrar el resultado.' },
    steps: [
      {
        id: 'l3-s1', title: { en: 'Create the conflict', es: 'Crear el conflicto' },
        commands: [
          'cd ~/se-lab-sandbox && git switch main',
          'echo "Version from main" > greeting.txt && git add greeting.txt && git commit -m "add greeting from main"',
          'git switch -c feature-greeting HEAD~1',
          'echo "Version from feature" > greeting.txt && git add greeting.txt && git commit -m "add greeting from feature"',
          'git switch main',
          'git merge feature-greeting || true',
        ],
        expected: { en: 'Git reports "CONFLICT (add/add)" and greeting.txt contains <<<<<<< markers.', es: 'Git informa "CONFLICT (add/add)" y greeting.txt contiene marcadores <<<<<<<.' },
      },
      {
        id: 'l3-s2', title: { en: 'Resolve and commit', es: 'Resolver y hacer commit' },
        commands: [
          'printf "Final greeting\\n" > greeting.txt',
          'git add greeting.txt',
          'git commit -m "resolve greeting conflict"',
          'git status',
        ],
        expected: { en: 'The merge completes. Status is clean and the markers are gone.', es: 'La fusión termina. El estado queda limpio y los marcadores desaparecen.' },
      },
    ],
  },
  {
    id: 'lab-4-remote-and-review',
    level: 3,
    minutes: 40,
    title: { en: 'Connect to a remote and simulate a review', es: 'Conectar un remoto y simular una revisión' },
    goal: {
      en: 'Use a local bare repository as "origin", push a branch, and practise the fetch and pull difference. Real GitHub steps are listed afterwards.',
      es: 'Usa un repositorio bare local como "origin", sube una rama y practica la diferencia entre fetch y pull. Los pasos reales de GitHub se explican después.',
    },
    steps: [
      {
        id: 'l4-s1', title: { en: 'Create a local bare remote', es: 'Crear un remoto bare local' },
        commands: [
          'cd ~ && git init --bare se-lab-remote.git',
          'cd ~/se-lab-sandbox && git remote add origin ~/se-lab-remote.git',
          'git push -u origin main',
        ],
        expected: { en: 'main is uploaded and tracks origin/main.', es: 'main se sube y sigue a origin/main.' },
      },
      {
        id: 'l4-s2', title: { en: 'Push a feature branch', es: 'Subir una rama de funcionalidad' },
        commands: [
          'cd ~/se-lab-sandbox && git switch -c feature-docs',
          'echo "Docs for sum" > DOCS.md && git add DOCS.md && git commit -m "add docs for sum"',
          'git push -u origin feature-docs',
          'git branch -r',
        ],
        expected: { en: 'origin/feature-docs appears in the remote branch list. In GitHub, you would open a pull request from this branch.', es: 'origin/feature-docs aparece en la lista de ramas remotas. En GitHub abrirías una solicitud de cambio desde esta rama.' },
      },
      {
        id: 'l4-s3', title: { en: 'Fetch versus pull', es: 'Fetch frente a pull' },
        commands: [
          'git fetch origin',
          'git status',
          'git pull origin main',
        ],
        expected: { en: 'fetch updates origin/* references; pull integrates origin/main into the current branch.', es: 'fetch actualiza las referencias origin/*; pull integra origin/main en la rama actual.' },
      },
    ],
  },
];
