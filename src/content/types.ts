/** Locales the platform supports. English is the default. */
export type Locale = 'en' | 'es' | 'pt';

/**
 * Text that may be translated. `es` is optional: when a translation does not
 * exist yet, the UI falls back to English and says so.
 */
export interface Localized {
  en: string;
  es?: string;
  pt?: string;
}

export type WeekStatus = 'published' | 'planned';

export interface WeekMeta {
  /** Content id, also the key for progress records, e.g. y1-t1-m3-w1. */
  id: string;
  number: number;
  title: Localized;
  status: WeekStatus;
}

/** Visual theme of a subject; decides the decoration of its pages and weeks. */
export type SubjectTheme = 'version-control' | 'databases' | 'default';

/** Interactive tools a subject can offer in its own navigation. */
export type SubjectTool = 'git-playground' | 'design-studio' | 'sql-lab';

/** A subject (course) taught inside a module, with its own weeks and tools. */
export interface SubjectMeta {
  slug: string;
  title: Localized;
  theme: SubjectTheme;
  /** Planned length. Usually 8 weeks; some subjects have 10. */
  plannedWeeks: number;
  tools: SubjectTool[];
  weeks: WeekMeta[];
}

export interface ModuleMeta {
  number: number;
  /** Subjects taught in this module. Empty until their materials are added. */
  subjects: SubjectMeta[];
}

/** Terms are numbered 1 to 8 across the whole program; two per year. */
export interface TermMeta {
  number: number;
  year: number;
  /** Hue (0–360) that colours this term's cards and pages. */
  hue: number;
  modules: ModuleMeta[];
}

export interface Lesson {
  id: string;
  title: Localized;
  /** Estimated minutes of study. */
  minutes: number;
  /** Plain-language explanation, one paragraph per entry. */
  body: Localized[];
  /** Key takeaways shown at the end of the lesson. */
  takeaways: Localized[];
  /** Short inline check that appears after the lesson body. */
  check?: KnowledgeCheck;
  /** Optional diagram key rendered by the lesson view. */
  diagram?: 'lifecycle' | 'git-areas' | 'branch-merge' | 'requirements' | 'context' | 'files-vs-dbms' | 'er-store' | 'three-schema';
  /** Optional code example, always shown in English. */
  code?: { language: string; caption: Localized; source: string };
  /** A plain-language analogy that makes the core idea concrete. */
  analogy?: Localized;
  /** Hands-on exercises with a hint and a worked solution. */
  exercises?: Exercise[];
  /** Common mistakes, each with a fix. */
  pitfalls?: { mistake: Localized; fix: Localized }[];
}

export interface Exercise {
  id: string;
  title: Localized;
  prompt: Localized;
  hint: Localized;
  solution: Localized;
  /** 1 = warm-up, 2 = practice, 3 = challenge. */
  level: 1 | 2 | 3;
}

export interface KnowledgeCheck {
  question: Localized;
  options: Localized[];
  answer: number;
  explanation: Localized;
}

export interface Flashcard {
  id: string;
  /** Lesson the card belongs to, used for cross-linking. */
  lessonId: string;
  front: Localized;
  back: Localized;
  /** Tag such as "concept", "command", or "distinction". */
  kind: 'concept' | 'command' | 'distinction';
}

export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-blank'
  | 'short-answer'
  | 'matching'
  | 'code'
  | 'scenario'
  | 'troubleshooting';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  lessonId: string;
  prompt: Localized;
  explanation: Localized;
  /** Per-option explanations; used to explain why wrong alternatives are wrong. */
  whyWrong?: Localized[];
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice' | 'true-false' | 'code' | 'scenario' | 'troubleshooting';
  options: Localized[];
  /** Index of the correct option. */
  answer: number;
  /** Optional code block shown above the options. */
  code?: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank' | 'short-answer';
  /**
   * Accepted answers, compared case-insensitively after trimming. For
   * short-answer questions, each entry is a group of keywords separated by
   * "|" that must all appear in the response (for example "branch|rama").
   */
  accepted: string[];
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  left: Localized[];
  right: Localized[];
  /** answer[i] is the index in `right` that matches `left[i]`. */
  answer: number[];
}

export type Question = ChoiceQuestion | FillBlankQuestion | MatchingQuestion;

export interface LabStep {
  id: string;
  title: Localized;
  /** Copyable shell commands, executed inside a sandbox directory only. */
  commands: string[];
  expected: Localized;
}

export interface Lab {
  id: string;
  /** Where the steps run: a shell sandbox (default), the SQL Lab, or the Design Studio / draw.io. */
  kind?: 'shell' | 'sql' | 'design';
  level: 1 | 2 | 3;
  title: Localized;
  goal: Localized;
  minutes: number;
  steps: LabStep[];
}

export interface StudyPlanDay {
  day: string;
  focus: Localized;
  minutes: number;
  kind: 'read' | 'practice' | 'review' | 'quiz';
}

export interface ExternalResource {
  id: string;
  title: string;
  url: string;
  kind: 'article' | 'video' | 'tutorial' | 'book';
  /** Date of the last availability check, or undefined when not yet verified. */
  verifiedOn?: string;
  note: Localized;
}

/**
 * Interactive activities. Each one is a small puzzle that teaches by doing.
 * - order: put steps in the right sequence.
 * - code-fill: type the missing word(s) of a command.
 * - scramble: rebuild a command from shuffled tokens.
 */
export type Activity = OrderActivity | CodeFillActivity | ScrambleActivity | ClassifyActivity;

interface ActivityBase {
  id: string;
  lessonId: string;
  title: Localized;
  prompt: Localized;
  explanation: Localized;
}

export interface OrderActivity extends ActivityBase {
  kind: 'order';
  /** Items in their correct order. The UI shuffles them before display. */
  items: Localized[];
}

export interface CodeFillActivity extends ActivityBase {
  kind: 'code-fill';
  /** Code with {0}, {1} ... placeholders for each blank. */
  template: string;
  /** Accepted answers per blank, as "|"-separated alternatives. */
  blanks: string[];
}

export interface ScrambleActivity extends ActivityBase {
  kind: 'scramble';
  /** The exact command, split into tokens in order. */
  tokens: string[];
}

/**
 * A short animated story: a token travels between stations while captions
 * explain each step. Stations are drawn left to right; scenes point at one.
 */
export interface Story {
  id: string;
  lessonId: string;
  title: Localized;
  stations: { label: Localized; glyph: string }[];
  scenes: { at: number; caption: Localized; mood?: 'ok' | 'alert' }[];
}

/** Sort each item into one of two or more labelled buckets. */
export interface ClassifyActivity extends ActivityBase {
  kind: 'classify';
  buckets: Localized[];
  /** Each item with the index of its correct bucket. */
  items: { text: Localized; bucket: number }[];
}

/** What a video frame shows. Each kind is drawn by scripts/build-videos.mjs. */
export type VideoVisual =
  | { kind: 'title' }
  | { kind: 'timeline'; commits: number; highlight?: number }
  | { kind: 'distributed' }
  | { kind: 'areas'; active: 0 | 1 | 2; arrow?: 'add' | 'commit' }
  | { kind: 'branch'; step: 0 | 1 | 2 | 3 | 4 }
  | { kind: 'pipeline'; set: 'lifecycle' | 'requirements'; active: number[] }
  | { kind: 'split'; reveal: 1 | 2 }
  | { kind: 'files'; step: 0 | 1 | 2 }
  | { kind: 'tables'; step: 0 | 1 | 2 | 3 }
  | { kind: 'transaction'; step: 0 | 1 | 2 | 3 | 4; failed?: boolean };

export interface VideoScene {
  visual: VideoVisual;
  /** Short headline drawn on the frame. */
  onScreen: Localized;
  /** What the narrator says; also used for captions. */
  narration: Localized;
}

/** A one-minute concept video, rendered per language with its own narration. */
export interface Video {
  id: string;
  lessonId: string;
  title: Localized;
  summary: Localized;
  scenes: VideoScene[];
}
