# LexiLand Russian

LexiLand Russian is a free static GitHub Pages game for survival Russian vocabulary. The first lesson teaches beginners to react to useful Russian words and chunks through audio, emoji pictures, action, repetition, and short situations.

The app is intentionally simple:

- HTML, CSS, and vanilla JavaScript.
- No backend, database, login, React, Next.js, npm, or build step.
- Data-driven lesson content in `data/lessons.json`.
- Progress saved in `localStorage`.
- Natural audio-first design using normal `<audio>` playback.

## Current Lessons

Lesson 1: `Урок 1. Здесь, там, это`

The lesson includes:

- 13 introduction cards.
- 30 tap-what-you-hear tasks.
- 25 picture-choice tasks.
- 15 yes/no tasks.
- 10 location tasks.
- 8 final mini-game commands.
- An unlockable 2D map game unit.
- Empty text and video unit placeholders for later content.

Lesson 2: `Урок 2: Где? Здесь или там?`

The lesson includes:

- 23 focused slide tasks.
- Location words, simple places, and a small city map game.
- Clickable micro-reading words.
- Yes/no and здесь/там checks.
- Audio references for every new word, phrase, and reading.

Learner-facing UI text is Russian only.

## Open Locally

You can open `index.html` directly in a browser.

For behavior closest to GitHub Pages, serve the folder with a simple static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If a browser blocks `data/lessons.json` when opened directly from disk, `js/app.js` includes fallback lesson data so the app still works from `index.html`.

## Publish On GitHub Pages

1. Create a public GitHub repository named `lexilandia`.
2. Push these files to the default branch.
3. Open the repository settings on GitHub.
4. Go to `Pages`.
5. Choose `Deploy from a branch`.
6. Choose the default branch and `/ (root)`.
7. Save.

No build command is required.

## Audio Files

Natural Russian audio files belong in:

```text
assets/audio/ru/
```

Every word, chunk, and task has an audio path in `data/lessons.json`, for example:

```text
assets/audio/ru/da.mp3
assets/audio/ru/net.mp3
assets/audio/ru/zdes.mp3
assets/audio/ru/tam.mp3
assets/audio/ru/eto.mp3
assets/audio/ru/zdes_dva_yabloka.mp3
assets/audio/ru/tam_odin_avtobus.mp3
```

The app uses real audio files first. If a file is missing, the learner can continue and the page shows `Аудио скоро будет`.

Correct and retry feedback use varied audio files. Each phrase has three generated intonation variants:

```text
assets/audio/ru/feedback_pravilno_1.mp3
assets/audio/ru/feedback_pravilno_2.mp3
assets/audio/ru/feedback_pravilno_3.mp3
assets/audio/ru/feedback_davay_1.mp3
assets/audio/ru/feedback_davay_2.mp3
assets/audio/ru/feedback_davay_3.mp3
```

Generate lesson audio with the production helper:

```bash
python -m pip install edge-tts
python tools/generate_audio.py
```

Useful options:

```bash
python tools/generate_audio.py --list
python tools/generate_audio.py --force
python tools/generate_audio.py --voice ru-RU-DmitryNeural
```

The generator reads `data/lessons.json`, finds every `audio` path and feedback variant, and creates missing `.mp3` files. It is a content-production script only; the website still has no build step and no runtime dependencies.

`js/audio.js` contains:

```js
const USE_TTS_FALLBACK = false;
```

Set it to `true` only for hidden developer testing. Browser speech is not the main voice.

## Add More Tasks

Edit `data/lessons.json`.

Main lesson pieces:

- `dictionary`: words and chunks with Russian text, emoji, type, and audio path.
- `scenes`: reusable emoji scenes for picture tasks.
- `stages`: task lists for intro, tap, picture-choice, yes/no, location, mini-command-game, map-command-game, and slides.
- `extraUnits`: unlockable unit content such as the 2D map game, text, and video placeholders.

To add a task, copy a nearby task in the same stage and change:

- `id`
- `text`
- `audio`
- `options`
- `correct`, `correctScene`, or `correctZone`
- scene or mini-game object data as needed

## Add A New Lesson

Add another object to the `lessons` array in `data/lessons.json`.

Keep new lessons small and review-heavy. Introduce only a few new words or chunks at a time, then reuse them in many tasks.

## Progress

Progress is stored in `localStorage` under:

```text
lexiland-russian-progress-v2
```

The home screen shows completion for each lesson after its finish screen is reached.
