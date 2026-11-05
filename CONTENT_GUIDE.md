# Content guide

How every week on SE Study Lab is written. Quality beats quantity: a learner should finish a lesson
in 10–15 minutes, remember its one big idea, and want to open the next one.

## Shape of a week

- **4–6 lessons**, each about **one idea**. Split a lesson that needs two headings.
- **Body: 3–4 short paragraphs**, each one idea, at most about 60 words. No walls of text.
- **One visual per lesson**: a diagram (`diagram`), a short code block (`code`), a table in a code
  block, or a display formula. If a picture explains it faster, draw it.
- **Takeaways: 2–3**, each one line. **Pitfalls: 1–2.** **Exercises: 2–3**, from easy to harder.
- Flashcards ~10–12, quiz ~8–10, activities 3–4, labs 1–2. Fewer, better items.
- `minutes` is realistic (most lessons 15–25).

## Writing

- Short sentences, active voice, second person ("you"). Define a term the first time, in bold:
  `**discriminant**`.
- Explain *why* before *how*. One worked example per idea, then the general rule.
- **Every language is natural.** Spanish is Latin-American and Portuguese is Brazilian, written as a
  native teacher would write them, not translated word by word. Use the local decimal comma in
  es/pt prose (`3,5`), and inside math write `3{,}5`.
- **No English inside Spanish or Portuguese text**, including names in examples. Use names and
  places that work in all three languages (Lucía, Mateo, Sofía, Tomás, Ana Paula), or translate the
  scenario (a bakery is "panadería" / "padaria"). Code identifiers and commands stay in English.
- **Vary examples.** Do not reuse the same scenario across lessons of a week or across subjects.
  Draw from everyday life and software: transport, music, sport, health, games, money, school,
  apps, weather, cooking. Never reuse the class's own exercises, data, or scenarios.

## Markup inside text

Every content string supports light markup, rendered on the site and in the PDFs:

| Markup | Use for | Example |
| --- | --- | --- |
| `$…$` | inline math (TeX) | `$x^2 - 5x + 6 \\le 0$` |
| `$$…$$` | a displayed formula on its own line | `$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$` |
| `` `…` `` | inline code, commands, file names | `` `git add .` `` |
| `**…**` | a key term, once | `**tautology**` |

- **All mathematics goes in `$…$`**, never as plain text: variables (`$x$`, `$p$`), formulas,
  inequalities, intervals (`$[2, 3)$`), sets (`$A \\cup B$`), logic (`$p \\to q$`,
  `$\\neg p \\land q$`), sums, fractions (`\\frac{a}{b}`), roots (`\\sqrt{x}`), `\\le`, `\\ge`,
  `\\neq`, `\\in`, `\\mathbb{R}`, `\\infty`. In TypeScript strings, backslashes are doubled: `'$\\frac{1}{2}$'`.
- Units and plain numbers in prose can stay as text ("3 s", "47 m"), but an expression is math.
- A literal dollar sign is `\\$`. Prices like "$12" without a closing `$` are left alone.
- Logic notation: `\\neg`, `\\land`, `\\lor`, `\\to`, `\\leftrightarrow`, `\\top`, `\\bot`,
  `\\models`, `\\vdash`, `\\forall`, `\\exists`. Truth values: T/F in English, V/F in es/pt.
- Code blocks (`code.source`) stay plain text: no markup there.
- Anything that is code goes in backticks: commands (`git commit -m "msg"`), SQL, identifiers, file names, paths, flags. The site also formats the obvious cases automatically (git commands, `SELECT …;` statements, `name()` calls, `--flags`, `/paths`, `File.java`), but write backticks yourself.
- Lessons show a summary first (the takeaways), then a visual, then the first two body paragraphs; the rest folds under "Keep reading". Put the most important paragraphs first and keep takeaways to one line each.

## Reference

`src/content/calc1-week1/lessons.ts`, lesson `calc1-l2-quadratic-parabola`, is the model lesson:
four short paragraphs, a displayed formula, inline math everywhere, a real-life example, short
takeaways, and exercises written in math markup.

## Before committing

`npx tsc --noEmit`, `npx vitest run`, `npm run build`, `npm run check:privacy`, and look at the week
in the browser (`npm run preview`) in Spanish.
