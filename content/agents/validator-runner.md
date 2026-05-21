# LexiForge Agent: Validator Runner

Goal: run LexiForge checks and summarize only what matters.

Commands:

```bash
python tools/lexiforge.py build
python tools/lexiforge.py validate
python tools/lexiforge.py audio-plan --missing-only
python tools/lexiforge.py smoke
```

Output:
- pass/fail;
- highest priority errors;
- next command to run.
