# Claude review notes — SE Study Lab

Please read this note with the current diff. The working branch started from `origin/main` at `19c2dcf` (`Add Graph Lab, Ruffini Lab, and clearer Calculus 1 Week 1`). The requested follow-up was to finish the remaining Claude-session work in the repository's existing style, keep examples distinct from class assignments, and leave a review handoff.

## Work completed

- **Calculus 1, Week 1:** added a short foundations lesson on number sets, intervals, real-number properties, algebra, and absolute value. Added matching flashcards, shifted the study sequence to nine lessons, corrected the checklist count, and included domain restrictions for fractions, zero and negative powers, and even roots. The existing Graph Lab and Ruffini Lab were already part of the base commit; their three-language handouts have been regenerated with the updated course material.
- **Databases 1, Week 1:** replaced the clinic/hospital ER practice case with a makerspace (members, machines, reservations, rooms, workbenches, and contact methods) so it does not duplicate the class assignment. Added MySQL/PostgreSQL comparison and local installation/connect instructions for Ubuntu/Debian and Windows, with official resource links and a `study_lab` practice database. Updated the Studio, questions, flashcards, lessons, ER diagram, sequence, and plan. Regenerated English, Spanish, and Portuguese PDFs, DOCX worksheets, and slide decks.
- **Software Development 1, Week 1:** limited published Week 1 content to the six in-scope lessons; the requirements and detailed-modelling source lessons remain available in `lessonsExtra.ts` for later weeks. Clarified GitLab as the class host while retaining GitHub as an alternative. Added local Git author configuration and an optional SSH push to a personal empty GitLab sandbox. The lab does not ask students to reuse or push the class assignment. Updated translations, resources, study plan, and generated handouts.
- **Review tooling:** taught the privacy scanner to recognize the exact public `git@gitlab.com` SSH endpoint as host syntax rather than an email address. This exception is deliberately exact; ordinary email checks remain active.

## Review checklist

1. Confirm that the six-lesson Software Development 1 scope matches the current course schedule and that requirements/modelling should stay reserved for later weeks.
2. Check the SQL dialect and setup instructions against the intended MySQL/PostgreSQL versions and the University's Windows/Linux environment; the instructions use official download pages and local defaults.
3. Review the GitLab SSH lab wording, especially key reuse, keeping the private key secret, and pushing only `feature-docs` to a newly created personal sandbox project.
4. Check Spanish and Portuguese phrasing and the exported handouts for any line-wrap or layout issues. The revised English ER slide was rendered and inspected; the derived label fits.
5. If content changes are made, regenerate the affected handouts with `npm run docs -- <week-id>` and rerun the checks below.

## Checks run for this handoff

- `npm run build` — passed. Vite still reports the existing large JavaScript chunk warning (>500 kB).
- `node scripts/i18n-missing.mjs` — zero missing Portuguese strings in the audited areas.
- `npm run check:privacy` — passed; 247 files scanned.
- `git diff --check` — passed.
- Course documents regenerated for all three published weeks in English, Spanish, and Portuguese.
- The test suite was not run during this follow-up.

The local `.claude/launch.json` contains a workstation-specific preview path; it is intentionally not part of the project changes.
