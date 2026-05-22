# Answer Order QA

Check answer ordering only.

Rules:
- Correct answers must not always be first.
- Multiple-choice renderers must shuffle options at runtime.
- After shuffle, if the correct answer is first, move it to another position.
- Do not fix this by manually reordering hundreds of task options.
- Keep the fix in shared renderers whenever possible.

Read first:
- `docs/lexiland-renderer-rules.md`

Check:
- `js/games/slideLesson.js`
- `js/games/tapGame.js`
- `js/games/pictureChoiceGame.js`
- `js/games/readingFindGame.js`
- `js/games/unit2KtoChhtoGame.js`
