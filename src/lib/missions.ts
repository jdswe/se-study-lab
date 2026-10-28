import type { Localized } from '../content/types';
import { logOf, type RepoState } from './gitSim';

export interface Mission {
  id: string;
  title: Localized;
  hint: string;
  done: (s: RepoState) => boolean;
}

const commitsOn = (s: RepoState, branch: string) => s.commits.filter((c) => c.branch === branch && c.parents.length === 1);

/** Ordered missions for the Git playground. Each check reads only the graph. */
export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: { en: 'Make two commits on main', es: 'Haz dos commits en main', pt: 'Faça dois commits em main' },
    hint: 'git commit -m "add README"',
    done: (s) => logOf(s, 'main').length >= 3,
  },
  {
    id: 'm2',
    title: { en: 'Create a branch called feature and switch to it', es: 'Crea una rama llamada feature y cámbiate a ella', pt: 'Crie uma branch chamada feature e mude para ela' },
    hint: 'git switch -c feature',
    done: (s) => Boolean(s.branches.feature),
  },
  {
    id: 'm3',
    title: { en: 'Commit twice on feature', es: 'Haz dos commits en feature', pt: 'Faça dois commits em feature' },
    hint: 'git commit -m "add login form"',
    done: (s) => commitsOn(s, 'feature').length >= 2,
  },
  {
    id: 'm4',
    title: { en: 'Go back to main and commit once more', es: 'Vuelve a main y haz un commit más', pt: 'Volte para main e faça mais um commit' },
    hint: 'git switch main',
    done: (s) => {
      const firstFeature = commitsOn(s, 'feature')[0];
      return Boolean(firstFeature) && commitsOn(s, 'main').some((c) => c.seq > firstFeature.seq);
    },
  },
  {
    id: 'm5',
    title: { en: 'Merge feature into main with a merge commit', es: 'Fusiona feature en main con un commit de fusión', pt: 'Faça o merge de feature em main com um commit de merge' },
    hint: 'git merge feature',
    done: (s) => (s.commits.find((c) => c.id === s.branches.main)?.parents.length ?? 0) === 2,
  },
];
