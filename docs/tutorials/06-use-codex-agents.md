# Tutorial: Use Codex With LexiForge Agents

The fastest workflow is to give Codex one small job at a time.

Do not ask Codex to rewrite the whole app. Ask it to edit one source file in `content/`, then run LexiForge validation.

## List Agents

```bash
python tools/lexiforge.py agents
```

## Print One Agent Brief

```bash
python tools/lexiforge.py agents lesson-recipe-writer
```

This prints the shared LexiForge rules plus the selected role.

## Cheap Codex Prompt Pattern

Use this shape:

```text
Use content/agents/lesson-recipe-writer.md.
Read only:
- content/dictionary/ru.json
- content/lessons/lesson-4-sample.lesson.json

Create a draft lesson about transport.
Edit only content/lessons/lesson-5-transport.lesson.json.
After editing, run:
python tools/lexiforge.py build --include-drafts
python tools/lexiforge.py validate --include-drafts
```

## Recommended Agent Chain

1. `curriculum-planner`
   Plan lesson order and new words.

2. `dictionary-curator`
   Add missing words to `content/dictionary/ru.json`.

3. `lesson-recipe-writer`
   Create compact lesson source in `content/lessons/`.

4. `drill-generator`
   Improve drill counts or explicit tasks.

5. `map-game-writer`
   Add a map source in `content/maps/`.

6. `audio-producer`
   Check `speechText`, rates, and missing audio.

7. `russian-qa`
   Catch unnatural Russian.

8. `no-english-qa`
   Catch English learner text.

9. `mobile-qa`
   Catch layout risks.

10. `validator-runner`
    Run build, validate, audio-plan, smoke.

11. `publisher`
    Commit and push.

## Big Lesson Workflow

For a big lesson, ask the `codex-orchestrator` agent to split the job first:

```text
Use content/agents/codex-orchestrator.md.
I want a lesson about buying food in a shop.
Create small Codex tasks with file scopes and validation commands.
Do not edit files yet.
```

Then run each task separately.

## Why This Saves Tokens

- Each agent reads fewer files.
- Each output is a small source artifact.
- LexiForge validation catches mechanical mistakes.
- You avoid long conversations where Codex keeps the entire project in context.

