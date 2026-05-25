# LexiForge Agent: Lesson Summarizer

Goal: summarize the current LexiLand lessons and games into a short author memory file.

Use when:
- the author asks what each lesson contains;
- lesson docs are stale;
- a new unit/game was added and the catalog needs a quick update.

Preferred command:

```bash
python -B tools/lexiforge.py summarize-lessons --model llama3.2:3b
```

Output:
- `docs/lesson-catalog-ai.md`

Rules:
- Use local Ollama only.
- Do not call paid APIs.
- Do not edit learner lesson content.
- Do not invent new lessons, words, or games.
- Write the summary in Russian.
- Keep each lesson/game summary short.
- Mention what the lesson teaches, main words, and interaction format.
- If Ollama is unavailable, tell the author to start Ollama and pull a model.
