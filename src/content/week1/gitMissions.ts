import type { GitMission } from '../../lib/gitMissions';
import { fileStatus, logOf } from '../../lib/gitSim';

const ran = (h: string[], re: RegExp) => h.some((x) => re.test(x));

/**
 * Week 1 scenario: you join a team and make your first contribution, from
 * checking the status to resolving a real merge conflict.
 */
export const week1GitMissions: GitMission[] = [
  {
    id: 'gm1', hint: 'git status',
    title: { en: 'Look before you act: check the status', es: 'Mira antes de actuar: revisa el estado', pt: 'Olhe antes de agir: confira o status' },
    done: (s) => ran(s.history, /^git status$/),
  },
  {
    id: 'gm2', hint: 'edit README.md "Setup steps" · git add README.md',
    title: { en: 'Edit README.md and stage it', es: 'Edita README.md y prepáralo', pt: 'Edite README.md e prepare-o' },
    done: (s) => s.commits.some((c) => c.seq > 0) || fileStatus(s).staged.includes('README.md'),
  },
  {
    id: 'gm3', hint: 'git commit -m "add setup steps"',
    title: { en: 'Record it with a clear commit message', es: 'Regístralo con un mensaje de commit claro', pt: 'Registre com uma mensagem de commit clara' },
    done: (s) => logOf(s, 'main').length >= 2,
  },
  {
    id: 'gm4', hint: 'git switch -c feature',
    title: { en: 'Start a feature branch', es: 'Empieza una rama de funcionalidad', pt: 'Comece uma branch de funcionalidade' },
    done: (s) => Boolean(s.branches.feature),
  },
  {
    id: 'gm5', hint: 'touch notes.txt · git add notes.txt · git commit -m "add notes"',
    title: { en: 'Add a new file on the branch and commit it', es: 'Agrega un archivo nuevo en la rama y haz commit', pt: 'Adicione um arquivo novo na branch e faça commit' },
    done: (s) => Boolean(s.branches.feature) && 'notes.txt' in (s.commits.find((c) => c.id === s.branches.feature)?.tree ?? {}),
  },
  {
    id: 'gm6', hint: 'git switch main · git merge feature',
    title: { en: 'Bring the feature into main', es: 'Lleva la funcionalidad a main', pt: 'Leve a funcionalidade para a main' },
    done: (s) => 'notes.txt' in (s.commits.find((c) => c.id === s.branches.main)?.tree ?? {}),
  },
  {
    id: 'gm7', hint: 'edit app.js on both branches · git merge · resolve app.js · git add · git commit',
    title: { en: 'Challenge: cause a conflict in app.js and resolve it', es: 'Desafío: provoca un conflicto en app.js y resuélvelo', pt: 'Desafio: provoque um conflito em app.js e resolva-o' },
    done: (s) => ran(s.history, /^resolve app\.js$/) && s.commits.some((c) => c.parents.length === 2 && c.tree['app.js'] !== undefined && !s.merging),
  },
];
