import type { SubjectTheme } from '../content/types';

/** One accent colour per subject theme, used for the week number and progress strip. */
export const SUBJECT_ACCENT: Record<SubjectTheme, string> = {
  'version-control': '#2F6F73',
  databases: '#3A4E74',
  math: '#7A6A8C',
  logic: '#8A5A6E',
  programming: '#B0652F',
  systems: '#4F6B4A',
  history: '#8C6D3F',
  discrete: '#5B5F97',
  default: '#5E8C7A',
};
