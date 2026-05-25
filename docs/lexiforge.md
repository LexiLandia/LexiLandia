# LexiForge

LexiForge is the static lesson factory for LexiLand Russian.

The learner website is still plain static HTML/CSS/JavaScript. LexiForge is only a creator tool that helps you build lesson data, validate it, plan audio, generate map-game tasks, and publish static output.

## What It Creates

LexiForge reads:

```text
content/dictionary/ru.json
content/lessons/*.lesson.json
content/maps/*.map.json
content/lexiforge.config.json
```

Then it writes:

```text
js/lexiforgeGenerated.js
data/lexiforge_manifest.json
```

`index.html` loads `js/lexiforgeGenerated.js` before `js/app.js`. If there are no ready generated lessons, the file simply exports an empty list and the current app works as before.

## Commands

```bash
python tools/lexiforge.py build
python tools/lexiforge.py validate
python tools/lexiforge.py audio-plan
python tools/lexiforge.py audio-plan --missing-only
python tools/lexiforge.py audio-generate
python tools/lexiforge.py map-preview
python tools/lexiforge.py agents
python tools/lexiforge.py agents lesson-recipe-writer
python tools/lexiforge.py summarize-lessons --model llama3.2:3b
python tools/lexiforge.py status
python tools/lexiforge.py smoke
python tools/lexiforge.py new-lesson lesson-5-transport "Урок 5. Транспорт"
```

## Current Lessons

The factory coexists with the lessons already in the site:

- `data/lessons.json`: Lesson 1 and Lesson 2.
- `js/level0Data.js`: Урок 0.
- `js/lesson3Data.js`: Lesson 3.
- `js/lexiforgeGenerated.js`: new generated lessons.

The shipped lesson registry is:

```text
content/registry/current-lessons.json
```

Do not manually edit generated output unless debugging. Edit files in `content/`.

## Lesson Source

A compact lesson source looks like this:

```json
{
  "status": "ready",
  "id": "lesson-4-magazin",
  "order": 4,
  "title": "Урок 4. Магазин",
  "level": "Уровень 1",
  "newWords": ["hleb", "sok", "voda", "magazin"],
  "reviewWords": ["da", "net", "eto", "zdes", "tam"],
  "units": [
    {
      "id": "unit-lesson-4-words",
      "title": "Слова",
      "icon": "🏪",
      "recipe": {
        "type": "vocabulary",
        "intro": true,
        "tapCount": 8,
        "pictureChoiceCount": 6,
        "yesNoCount": 6
      }
    }
  ]
}
```

Use `"status": "draft"` while working. Change it to `"ready"` when you want the lesson to appear in the app.

## Audio

LexiForge writes an audio manifest to:

```text
data/lexiforge_manifest.json
```

The manifest lists every audio path, visible text, speech text, rate, pitch, voice, and whether the file exists.

For slow reading, visible text can stay normal while `speechText` adds pauses:

```json
{
  "text": "мама дом",
  "speechText": "мама. дом.",
  "rate": "-40%"
}
```

The existing generator still makes mp3 files:

```bash
python tools/generate_audio.py
python tools/generate_audio.py --force
```

## Validation

Run:

```bash
python tools/lexiforge.py validate
```

It checks:

- mojibake like `Ð` or `Ñ`;
- English-looking learner text;
- missing emoji;
- missing audio paths;
- bad answer references;
- map coordinates and targets;
- duplicate ids.

Use strict audio before publishing:

```bash
python tools/lexiforge.py validate --strict-audio
```

## Agents

Agent prompts live in:

```text
content/agents/
```

They define the jobs for lesson writing, map-game writing, audio production, QA, and publishing. AI can draft content, but LexiForge validation decides whether the output is safe.

Print a compact brief for Codex:

```bash
python tools/lexiforge.py agents lesson-recipe-writer
```

The recommended token-saving workflow is documented in:

```text
docs/tutorials/06-use-codex-agents.md
```

## Ollama Lesson Summaries

LexiForge can use a local Ollama model to regenerate a short author-facing catalog of all current lessons and games:

```bash
ollama serve
ollama pull llama3.2:3b
python tools/lexiforge.py summarize-lessons --model llama3.2:3b
```

The output is:

```text
docs/lesson-catalog-ai.md
```

This command does not touch learner lesson data. It only reads the current runtime lessons and writes a Markdown memory file.

To inspect the compact context before sending it to Ollama:

```bash
python tools/lexiforge.py summarize-lessons --dry-run
```
