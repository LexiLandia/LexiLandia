# Tutorial: Generate Audio

LexiForge plans audio. The existing audio generator creates mp3 files.

1. Check missing audio:

```bash
python tools/lexiforge.py audio-plan --missing-only
```

2. Install the generator dependency once:

```bash
python -m pip install edge-tts
```

3. Generate missing audio:

```bash
python tools/generate_audio.py
```

4. Regenerate all audio only when needed:

```bash
python tools/generate_audio.py --force
```

5. Validate:

```bash
python tools/lexiforge.py validate --strict-audio
```

Audio speed rules:

- letters: `-50%`
- syllables: `-50%`
- beginner words: `-40%`
- normal phrases: `-22%` or default

To add pauses without changing visible text, use `speechText`:

```json
{
  "text": "мама дом",
  "speechText": "мама. дом.",
  "audio": "assets/audio/ru/mama_dom.mp3",
  "rate": "-40%"
}
```

