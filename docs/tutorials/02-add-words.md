# Tutorial: Add Words

Open:

```text
content/dictionary/ru.json
```

Add a word to the `words` array:

```json
{
  "id": "moloko",
  "text": "молоко",
  "emoji": "🥛",
  "type": "word",
  "audio": "assets/audio/ru/moloko.mp3",
  "rate": "-40%",
  "tags": ["food"]
}
```

Rules:

- `id` must be unique.
- `text` must be Russian.
- `emoji` is required.
- `audio` is required.
- Use `rate: "-50%"` for letters and syllables.
- Use `rate: "-40%"` for beginner reading words.

Run:

```bash
python tools/lexiforge.py validate --include-drafts
python tools/lexiforge.py audio-plan --missing-only
```

