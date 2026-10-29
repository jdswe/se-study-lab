import type { SubjectTheme } from '../content/types';

/** One accent colour per subject theme, used for the week number and progress strip. */
export const SUBJECT_ACCENT: Record<SubjectTheme, string> = {
  'version-control': '#2F6F73',
  databases: '#3A4E74',
  math: '#7A6A8C',
  default: '#5E8C7A',
};
