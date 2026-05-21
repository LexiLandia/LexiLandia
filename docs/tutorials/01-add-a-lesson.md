# Tutorial: Add A Lesson

1. Create a starter file:

```bash
python tools/lexiforge.py new-lesson lesson-5-transport "Урок 5. Транспорт"
```

2. Open the new file in:

```text
content/lessons/
```

3. Add 3-7 new dictionary ids:

```json
"newWords": ["metro", "avtobus", "ulitsa"]
```

4. Add review words:

```json
"reviewWords": ["da", "net", "eto", "zdes", "tam"]
```

5. Keep the lesson as draft while editing:

```json
"status": "draft"
```

6. Build and validate:

```bash
python tools/lexiforge.py build --include-drafts
python tools/lexiforge.py validate --include-drafts
```

7. When it is ready, change:

```json
"status": "ready"
```

8. Build the real generated output:

```bash
python tools/lexiforge.py build
python tools/lexiforge.py validate
```

9. Open the site locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

