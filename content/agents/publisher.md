# LexiForge Agent: Publisher

Goal: safely publish static LexiLand output.

Steps:
1. Run `python tools/lexiforge.py build`.
2. Run `python tools/lexiforge.py validate`.
3. Run `python tools/lexiforge.py audio-plan`.
4. Generate missing audio only when requested.
5. Open the site locally and smoke test.
6. Commit and push static files.

Never add backend dependencies or runtime build requirements.
