# SE Study Lab

A bilingual (English default, Spanish) study platform for a software engineering program.
It is a static site: no server, no accounts, no tracking. Progress is stored only in the learner's browser.

The site is organised as **Program → Term (1–8) → Module (3 per term) → Week**.
Each week has lessons with analogies and diagrams, animated mini stories, exercises with worked solutions,
interactive activities, spaced-repetition flashcards, a mixed-type quiz, sandbox labs, a study plan, and
downloadable documents (PDF, Word, PowerPoint) in both languages. A Git Playground simulates commits,
branches, and merges with missions.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Development server (slower; for editing only) |
| `npm run preview` | Serve the production build locally (use this to judge speed) |
| `npm test` | Unit tests and content integrity checks |
| `npm run build` | Type check and production build into `dist/` |
| `npm run docs` | Regenerate PDF, Word, and PowerPoint documents in `public/downloads/<locale>/` (needs Google Chrome) |
| `npm run check:privacy` | Scan source, public files, build output, and document text for institutional or personal identifiers |

## Architecture

```
src/
  content/              Content only (no UI)
    types.ts            Content types: Localized text, lessons, cards, questions, labs, activities, stories
    curriculum.ts       Program → 8 terms → 3 modules → weeks; per-term colour and per-subject theme
    weekContent.ts      Shape of one week's learning environment
    index.ts            Registry of published weeks
    week1/              Week 1: lessons, translations, exercises, activities, stories, flashcards, questions, labs, plan, resources
  i18n/                 Interface dictionaries (en.ts is the source of truth; es.ts must match its type)
  lib/                  Pure logic: SRS scheduling, grading, Git simulator, missions, stats, progress store
  components/           UI pieces: lesson, deck, quiz, labs, activities, story player, commit graph, backdrops
  pages/                Routes: home, term, module, week, playground, flashcards, quizzes, labs, planner, progress, resources, settings
  styles/               Design tokens (light/dark palette) and application CSS
public/downloads/       Generated documents, one folder per language
scripts/build-docs.mjs  Document generator (reads the same content as the site)
scripts/check-privacy.mjs
```

Key decisions:

- **Static build with hash routing.** GitHub Pages serves static files only. Hash routes work under any repository path.
- **Content is data.** Components render any week, so adding a week never changes UI code.
- **Localisation.** Every content string is `{ en, es? }`. A missing Spanish string falls back to English with a visible note. Documents are generated per language from the same data.
- **Performance.** Background animation runs on compositor-friendly transforms only (no blur filters). Diagram animations stop after a few cycles. All motion respects "reduce motion".
- **Progress.** One versioned `localStorage` record. Every access is wrapped, so blocked storage never breaks the app.

## Adding a subject or a week

1. In `src/content/curriculum.ts`, give the module a `subject`, a `theme`, and `plannedWeeks` (8 or 10).
2. Create `src/content/<week-folder>/` following `week1/`. Export a `WeekContent` with id `y<year>-t<term>-m<module>-w<week>`.
3. Register the week in `src/content/index.ts` and list it in the module's `weeks` in `curriculum.ts`.
4. Run `npm run docs`, `npm test`, `npm run build`, and `npm run check:privacy`.

The integrity tests check unique ids, valid answers, explanations on every question, and that every published week appears in the curriculum.

## Content rules

- Source materials are read locally and never published. Explanations, examples, and exercises are written in new words.
- No institution names, course codes, instructor names, private links, or screenshots.
- External links are listed with the date they were last checked.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: install, test, build, privacy check, then publish `dist/` to GitHub Pages.
