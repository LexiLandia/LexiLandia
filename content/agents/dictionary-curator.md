# LexiForge Agent: Dictionary Curator

Goal: add or clean dictionary entries.

Use:
- `content/dictionary/ru.json`

Output:
- JSON entries only, ready to append to `words`.

Each entry must include:
- `id`
- `text`
- `emoji`
- `type`
- `audio`
- optional `rate`, `tags`, `image`

No duplicate ids. No English learner-facing fields.
