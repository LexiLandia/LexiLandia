from __future__ import annotations

import json
from typing import Any

from .io import project_path, write_json


def emit_generated_lessons(lessons: list[dict[str, Any]], config: dict[str, Any]) -> None:
    path = project_path(config["generatedLessonsFile"])
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(lessons, ensure_ascii=False, indent=2)
    path.write_text(
        "(function (root) {\n"
        "  \"use strict\";\n\n"
        "  root.LexiForgeGeneratedLessons = "
        + payload.replace("\n", "\n  ")
        + ";\n"
        "}(typeof window !== \"undefined\" ? window : globalThis));\n",
        encoding="utf-8",
    )


def emit_manifest(manifest: dict[str, Any], config: dict[str, Any]) -> None:
    write_json(project_path(config["manifestFile"]), manifest)

