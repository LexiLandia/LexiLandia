from __future__ import annotations

import glob
import json
import subprocess
from pathlib import Path
from typing import Any

from .paths import CONFIG_PATH, ROOT


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def load_config() -> dict[str, Any]:
    return read_json(CONFIG_PATH)


def project_path(relative: str) -> Path:
    return ROOT / relative


def glob_project(pattern: str) -> list[Path]:
    return [Path(item) for item in glob.glob(str(ROOT / pattern))]


def load_dictionary(config: dict[str, Any]) -> dict[str, Any]:
    return read_json(project_path(config["dictionaryFile"]))


def load_map_sources(config: dict[str, Any]) -> dict[str, dict[str, Any]]:
    maps: dict[str, dict[str, Any]] = {}
    for path in sorted(glob_project(config["mapSourceGlob"])):
        source = read_json(path)
        source["_sourceFile"] = str(path.relative_to(ROOT))
        maps[source["id"]] = source
    return maps


def load_lesson_sources(config: dict[str, Any], include_drafts: bool = False) -> list[dict[str, Any]]:
    lessons: list[dict[str, Any]] = []
    for path in sorted(glob_project(config["lessonSourceGlob"])):
        source = read_json(path)
        source["_sourceFile"] = str(path.relative_to(ROOT))
        if source.get("status") == "draft" and not include_drafts:
            continue
        lessons.append(source)
    return lessons


def load_js_global(path: Path, global_name: str) -> Any:
    if not path.exists():
        return None

    script = (
        f"require('./{path.relative_to(ROOT).as_posix()}');"
        f"process.stdout.write(JSON.stringify(globalThis.{global_name} || null));"
    )
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return json.loads(result.stdout or "null")


def load_runtime_lessons(include_generated: bool = True) -> list[dict[str, Any]]:
    data = read_json(ROOT / "data" / "lessons.json")
    lessons = list(data.get("lessons", []))

    level0 = load_js_global(ROOT / "js" / "level0Data.js", "LexiLandLevel0")
    if isinstance(level0, dict) and not any(item.get("id") == level0.get("id") for item in lessons):
        lessons.insert(0, level0)

    lesson3 = load_js_global(ROOT / "js" / "lesson3Data.js", "LexiLandLesson3")
    if isinstance(lesson3, dict) and not any(item.get("id") == lesson3.get("id") for item in lessons):
        lessons.append(lesson3)

    if include_generated:
        generated = load_js_global(ROOT / "js" / "lexiforgeGenerated.js", "LexiForgeGeneratedLessons")
        if isinstance(generated, list):
            for lesson in generated:
                if isinstance(lesson, dict) and not any(item.get("id") == lesson.get("id") for item in lessons):
                    lessons.append(lesson)

    return lessons

