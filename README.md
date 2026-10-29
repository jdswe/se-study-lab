# SE Study Lab

A study platform for a software engineering program, in **English (default), Spanish, and Portuguese**.
It is a static site: no server, no accounts, no tracking. Progress is stored only in the learner's browser.

**Structure:** Program → 8 terms → 3 modules per term → subjects → weeks.
The global header only holds home, language, theme, and settings. Everything for studying lives inside each week,
with that week's own content: overview, lessons, flashcards, quiz, labs, the week's tools, study plan, progress, and resources.

Each week has lessons with analogies and diagrams, animated mini stories, one-minute videos (when rendered),
exercises with worked solutions, interactive activities, spaced-repetition flashcards, a mixed-type quiz, labs,
a study plan, and five short downloadable documents in all three languages, each with an in-page preview.

Week tools (a week lists the ones its topic needs in `tools`, with their data in `toolData`):
- **Git Playground** (Software Development 1): a terminal with real files, staging, branches, merges, and conflicts, with missions.
- **SQL Lab** (Databases 1): a real SQLite database in the browser, with self-checking tasks (queries, DDL, and DML).
- **Design Studio** (Databases 1): ER design on preset scenarios, with feedback and export to draw.io.
- **Inequality Lab** (Calculus 1): solve inequalities in interval notation, with a live number line, value testing,
  sign charts, and a free solver for any inequality in x.

Documents (generated per week and language, never a copy of the lessons): a one- or two-page summary, a cheat sheet
(commands or formulas), a worksheet with an answer key (PDF and editable Word), and one-idea-per-slide slides
(PowerPoint, with a PDF twin for previews). Diagrams in documents are the website's own components rendered to SVG.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Development server (slower; for editing only) |
| `npm run preview` | Serve the production build locally (use this to judge speed) |
| `npm test` | Unit tests, content integrity, Portuguese coverage, SQL tasks, design checks |
| `npm run build` | Type check and production build into `dist/` |
| `npm run docs` | Regenerate the documents in `public/downloads/<locale>/<week>/` — needs Google Chrome. Pass week ids to limit it, e.g. `npm run docs -- y1-t1-m3-calc-w1` |
| `npm run videos` | Render the one-minute videos with ElevenLabs narration — see below |
| `npm run check:privacy` | Scan source, public files, build output, and document text for institutional or personal identifiers |
| `node scripts/i18n-missing.mjs` | List content strings that still lack Portuguese |

## Architecture

```
src/
  content/                 Content only (no UI)
    types.ts               Content types: Localized text, lessons, cards, questions, labs, activities, stories, videos
    curriculum.ts          Program → terms → modules → subjects → weeks; term colours and subject themes/tools
    weekContent.ts         Shape of one week
    index.ts               Registry of published weeks (Portuguese is applied here)
    localize.ts            Portuguese overlay: fills `pt` from src/content/pt/*.json
    pt/                    English source text → Portuguese translation, per area
    week1/                 Software Development 1, Week 1 (also Git Playground missions)
    db1-week1/             Databases 1, Week 1 (also SQL tasks and Design Studio scenarios)
    calc1-week1/           Calculus 1, Week 1 (also Inequality Lab problems)
  i18n/                    Interface dictionaries: en.ts (source of truth), es.ts, pt.ts
  lib/                     Pure logic: SRS, grading, Git simulator, inequality solver, SQL helpers, ER checks, stats, store
  components/              UI pieces: lessons, diagrams, deck, quiz, labs, activities, stories, videos, PDF viewer, backdrops
  sections/                Week sections: planner, progress
  tools/                   Week tools, loaded on demand: Git Playground, SQL Lab, Design Studio, Inequality Lab
  pages/                   Routes: home, term, module, subject, week, settings
public/downloads/          Generated documents: <locale>/<week id>/
public/media/              Rendered videos: <locale>/<video id>.mp4/.vtt/.jpg
scripts/                   Document and video generators, i18n helpers, privacy checker
```

Key decisions:

- **Static build with hash routing**, so GitHub Pages can serve it under any repository path.
- **Content is data.** Components render any subject and week; adding one never changes UI code.
- **Languages.** Content is written as `{ en, es }`; Portuguese is an overlay keyed by the English text, and a test
  fails if any string is untranslated. Missing translations fall back to English with a visible note.
- **Previews everywhere.** Word and PowerPoint files get a PDF twin; PDFs render with PDF.js, so previews work on phones too.
- **Responsive tools.** Week tools adapt to the width of the week column (CSS container queries), not the window.
- **Performance.** PDF.js, SQLite, and every week tool load only when opened. Background motion uses compositor
  transforms only, and all motion respects "reduce motion".

## Adding a subject or a week

1. In `src/content/curriculum.ts`, add the subject to its module: `slug`, `title`, `theme`, `plannedWeeks` (8 or 10), `tools`, and `weeks` with their ids.
2. Create `src/content/<folder>/` following `week1/`, `db1-week1/`, or `calc1-week1/`. Export a `WeekContent` with the same id
   and `subject` slug, and set `tools` and `toolData` for the tools this week's topic needs.
3. Register it in `src/content/index.ts`.
4. Run `node scripts/i18n-missing.mjs`, translate the listed strings into `src/content/pt/`, then `npm test`.
5. Run `npm run docs`, `npm run build`, and `npm run check:privacy`.

## Videos (ElevenLabs)

Put a key in `.env.local` (never committed): `ELEVENLABS_API_KEY=…`. Use a key limited to Text to Speech and Music.
`npm run videos` renders every video in English, Spanish, and Portuguese with a warm, friendly voice chosen per language
(override with `ELEVENLABS_VOICE_EN`, `_ES`, `_PT`). Narration is cached in `.cache/`, so re-rendering spends no credits.
`npm run videos -- --dry-run` renders silent previews without a key.

## Content rules

- Source materials are read locally and never published. Explanations, examples, and exercises are written in new words.
- No institution names, course codes, instructor names, private links, or screenshots. `.gitignore` blocks any PDF, Word,
  or PowerPoint file outside `public/downloads/`.
- External links are listed with the date they were last checked.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: install, test, build, privacy check, then publish `dist/` to GitHub Pages.
