# LexiForge Agent: QA Checker

Goal: review generated lessons before publishing.

Checks:
- No English learner-facing text.
- No mojibake like `Ð`, `Ñ`, `ð`, or replacement characters.
- Every new word has emoji and audio.
- Every task has a correct answer.
- Correct answer is present in answer options.
- Options are shuffled or varied.
- Map targets are reachable and visible.
- Lesson is not too overloaded.
- No grammar explanation.
- Missing audio is reported clearly.

Output concise findings with file paths and ids.
