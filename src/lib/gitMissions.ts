import type { Localized } from '../content/types';
import type { RepoState } from './gitSim';

/** A practical step in the Git Playground, checked against the simulated repository. */
export interface GitMission {
  id: string;
  title: Localized;
  /** What to type, shown when the mission is the next one. */
  hint: string;
  done: (s: RepoState) => boolean;
}
