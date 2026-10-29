import type { Activity, Story, Video, SubjectTool, Flashcard, Lab, Lesson, Localized, Question, StudyPlanDay, ExternalResource } from './types';

import type { GitMission } from '../lib/gitMissions';
import type { SqlTask } from './db1-week1/sqlTasks';
import type { StudioScenario } from './db1-week1/studio';
import type { InequalityProblem } from '../lib/inequality';

export interface ToolData {
  gitMissions?: GitMission[];
  sqlTasks?: SqlTask[];
  studioScenarios?: StudioScenario[];
  inequalityProblems?: InequalityProblem[];
}

/** Everything the UI needs for one week. Adding a week means adding one of these. */
export interface WeekContent {
  /** Stable key, used for progress records. Must be unique across the platform. */
  id: string;
  /** Path segments in the curriculum, e.g. y1/t1/m3/w1. */
  year: number;
  term: number;
  module: number;
  week: number;
  /** Slug of the subject this week belongs to (see curriculum.ts). */
  subject: string;
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
  /** Interactive tools for this week's topics, in the order they appear in the week. */
  tools: SubjectTool[];
  /** Week-specific exercises for those tools. */
  toolData?: ToolData;
  /** One-minute concept videos; shown only once rendered (see generated/videoManifest.json). */
  videos: Video[];
  /** `preview` names a PDF twin used for in-page preview of Word and PowerPoint files. */
  documents: { title: Localized; file: string; kind: 'pdf' | 'docx' | 'pptx'; preview?: string }[];
}
