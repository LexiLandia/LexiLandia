# LexiForge Shared Rules

Project: LexiLand Russian, a static GitHub Pages learner app.

Hard rules:
- Static output only.
- No backend in the learner app.
- No database in the learner app.
- No login in the learner app.
- No frameworks or build step for the learner app.
- Learner-facing UI must be Russian, emoji, image, or action only.
- No English on learner screens.
- No grammar explanations.
- Every new word/chunk needs emoji and audio path.
- Keep each lesson small, review-heavy, and mobile-first.
- Edit source files in `content/`, not generated output, unless debugging.
- Run `python tools/lexiforge.py validate` after changes.

Token-saving mode:
- Read only the files named in the task.
- Output only the requested artifact.
- Prefer compact JSON.
- Do not paste existing lessons back unless asked.
- Do not rewrite current lessons.
