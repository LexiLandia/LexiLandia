# LexiLand Agent Briefs

Use these small roles to save Codex context. Ask for one role at a time instead of giving Codex the whole project.

## Structure Guardian

Job:
- Check that new major units are separate home blocks.
- Check that lessons/games/text/video inside a unit are separate `units[]` buttons.
- Check that older lessons were not edited.

Reads:
- `docs/lexiland-structure.md`
- `js/app.js`
- the new lesson/unit file only

## Lesson Writer

Job:
- Draft slide data for one lesson.
- Use only Russian learner-facing text.
- Keep one idea per slide.
- Include emoji and audio paths.

Reads:
- `docs/lexiland-content-patterns.md`
- the current unit data file
- `content/dictionary/ru.json` if needed

## Drill Generator

Job:
- Create short task arrays from known words.
- Ensure correct answers are not always first in source data, even though renderers shuffle too.
- Recycle earlier vocabulary.

Reads:
- `docs/lexiland-content-patterns.md`
- the target unit file

## Audio Producer

Job:
- Run audio plan.
- Generate missing audio.
- Verify strict audio.

Commands:

```bash
python -B tools/lexiforge.py audio-plan --missing-only
python -B tools/generate_audio.py
python -B tools/lexiforge.py validate --strict-audio
```

## QA Checker

Job:
- Run smoke tests.
- Browser-check the relevant home block and first screen.
- Check no English appears in learner-facing screens.
- Check no console errors.

Commands:

```bash
python -B tools/lexiforge.py smoke
```

## Lesson Summarizer

Job:
- Read the current runtime lessons.
- Use local Ollama to write a short author-facing lesson catalog.
- Keep the summary in Russian and do not invent content.

Command:

```bash
python -B tools/lexiforge.py summarize-lessons --model llama3.2:3b
```

Output:
- `docs/lesson-catalog-ai.md`
