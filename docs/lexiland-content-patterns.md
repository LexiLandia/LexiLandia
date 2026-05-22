# LexiLand Content Patterns

Use this file to avoid rethinking the same lesson structure.

## Learner-Facing Rules

- Learner-facing UI is Russian plus emoji/images only.
- No English inside lessons, games, buttons, feedback, or popovers.
- No grammar explanations.
- Meaning comes from audio, emoji, simple images, situation, and repetition.
- Use short Russian text and one idea per slide.

## Lesson Pattern

For reading lessons:
1. Intro slide with title and concept emoji.
2. New word slides.
3. Short phrase slides.
4. Tiny task slides.
5. Micro-reading slide.
6. Finish slide.

For unit groups:
1. Make a separate top-level home block for the unit.
2. Make each lesson a separate `units[]` button.
3. Make game/text/video separate `units[]` buttons.

## Data Pattern

Use small helper functions:
- `audio(file)`
- `entry(id, text, emoji, type, file)`
- `line(text, file)`
- `option(id, text, emoji)`
- `question(id, text, options, correct)`
- `slide(...)`

Every important word/chunk should have:
- `id`
- `text`
- `emoji`
- `type`
- `audio`

## Reuse Pattern

Before adding new vocabulary, reuse:
- previous words
- previous locations
- previous people/objects
- existing feedback audio
- existing renderers

Do not create a new renderer if `slides`, `reading-find-game`, or `unit-2-kto-chto-game` can do the job with data.

## Audio Pattern

Always include audio paths in data.

Run:

```bash
python -B tools/lexiforge.py audio-plan --missing-only
python -B tools/generate_audio.py
python -B tools/lexiforge.py validate --strict-audio
```

The static site must still work if audio is missing, but committed lesson data should validate with zero missing audio whenever possible.
