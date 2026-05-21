# Tutorial: Publish

1. Build generated lessons:

```bash
python tools/lexiforge.py build
```

2. Validate:

```bash
python tools/lexiforge.py validate --strict-audio
```

3. Test locally:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

4. Check:

- Home screen loads.
- Current lessons still appear.
- Generated lessons appear after existing lessons when their source status is `ready`.
- Buttons work.
- Audio plays.
- Progress saves.

5. Commit and push.

GitHub Pages will serve the static files. No backend or build step is needed for the learner site.

