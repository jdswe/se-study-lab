import type { Exercise, Flashcard, KnowledgeCheck, Lesson, Localized, Question } from '../types';

/** Small builders shared by the Programming 1 weeks, so each week reads as content. */
export const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });

export const ex = (id: string, level: 1 | 2 | 3, title: Localized, prompt: Localized, hint: Localized, solution: Localized): Exercise =>
  ({ id, level, title, prompt, hint, solution });

export const pf = (mistake: Localized, fix: Localized) => ({ mistake, fix });

export const chk = (question: Localized, options: Localized[], answer: number, explanation: Localized): KnowledgeCheck =>
  ({ question, options, answer, explanation });

type Visual = { code: { language: string; caption: Localized; source: string } } | { diagram: Lesson['diagram'] };

export const java = (caption: Localized, source: string): Visual => ({ code: { language: 'java', caption, source } });
export const text = (caption: Localized, source: string): Visual => ({ code: { language: 'text', caption, source } });

export function lesson(id: string, title: Localized, minutes: number, visual: Visual, body: Localized[], analogy: Localized,
  takeaways: Localized[], check: KnowledgeCheck, pitfalls: { mistake: Localized; fix: Localized }[], exercises: Exercise[]): Lesson {
  return { id, title, minutes, ...visual, body, analogy, takeaways, check, pitfalls, exercises };
}

export const fc = (id: string, lessonId: string, kind: Flashcard['kind'], front: Localized, back: Localized): Flashcard =>
  ({ id, lessonId, kind, front, back });

const TF = [L('True', 'Verdadero', 'Verdadeiro'), L('False', 'Falso', 'Falso')];

export const mc = (id: string, type: 'multiple-choice' | 'code' | 'scenario' | 'troubleshooting', lessonId: string, prompt: Localized,
  options: Localized[], answer: number, explanation: Localized, code?: string): Question =>
  ({ id, type, lessonId, prompt, options, answer, explanation, ...(code ? { code } : {}) });

export const tf = (id: string, lessonId: string, prompt: Localized, isTrue: boolean, explanation: Localized): Question =>
  ({ id, type: 'true-false', lessonId, prompt, options: TF, answer: isTrue ? 0 : 1, explanation });

export const fill = (id: string, type: 'fill-blank' | 'short-answer', lessonId: string, prompt: Localized, accepted: string[], explanation: Localized): Question =>
  ({ id, type, lessonId, prompt, accepted, explanation });

export const match = (id: string, lessonId: string, prompt: Localized, left: Localized[], right: Localized[], answer: number[], explanation: Localized): Question =>
  ({ id, type: 'matching', lessonId, prompt, left, right, answer, explanation });

/** The same text in all three languages (code, commands, numbers). */
export const same = (s: string): Localized => ({ en: s, es: s, pt: s });

export const day = (n: number, minutes: number, kind: 'read' | 'practice' | 'review' | 'quiz', focus: Localized) => ({ day: `Day ${n}`, minutes, kind, focus });

/** Lines of a shell step that writes a Java file with a heredoc. */
export const heredoc = (file: string, source: string): string[] => [`cat > ${file} <<'EOF'`, ...source.split('\n'), 'EOF'];
