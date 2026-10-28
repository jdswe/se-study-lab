import type { Activity, Story, Flashcard, Lab, Lesson, Localized, Question, StudyPlanDay, ExternalResource } from './types';

/** Everything the UI needs for one week. Adding a week means adding one of these. */
export interface WeekContent {
  /** Stable key, used for progress records. Must be unique across the platform. */
  id: string;
  /** Path segments in the curriculum, e.g. y1/t1/m3/w1. */
  year: number;
  term: number;
  module: number;
  week: number;
  title: Localized;
  intro: Localized;
  objectives: Localized[];
  prerequisites: Localized[];
  keyConcepts: Localized[];
  estimatedMinutes: number;
  sequence: Localized[];
  outcomes: Localized[];
  checklist: Localized[];
  commonMistakes: { mistake: Localized; fix: Localized }[];
  lessons: Lesson[];
  flashcards: Flashcard[];
  questions: Question[];
  labs: Lab[];
  plan: StudyPlanDay[];
  resources: ExternalResource[];
  /** Original downloadable documents. Empty until they are authored and checked. */
  activities: Activity[];
  stories: Story[];
  documents: { title: Localized; file: string; kind: 'pdf' | 'docx' | 'pptx' }[];
}
