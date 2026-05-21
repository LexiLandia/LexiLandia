# LexiForge Lesson Sources

Put new generated lesson source files here as `*.lesson.json`.

Run:

```bash
python tools/lexiforge.py build
python tools/lexiforge.py validate
python tools/lexiforge.py audio-plan
```

The factory writes generated static lessons to:

```text
js/lexiforgeGenerated.js
data/lexiforge_manifest.json
```

Existing hand-built lessons remain where they are:

- Lesson 1 and Lesson 2: `data/lessons.json`
- Level 0: `js/level0Data.js`
- Lesson 3: `js/lesson3Data.js`
