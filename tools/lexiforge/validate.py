from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

from .paths import ROOT
from .text import has_english_words, has_mojibake


LEARNER_TEXT_KEYS = {
    "title",
    "text",
    "correctFeedback",
    "wrongFeedback",
    "level",
}


@dataclass
class Finding:
    level: str
    path: str
    message: str


def validate_lessons(lessons: list[dict[str, Any]], strict_audio: bool = False) -> list[Finding]:
    findings: list[Finding] = []
    seen_lesson_ids: set[str] = set()

    for lesson_index, lesson in enumerate(lessons):
        lesson_path = f"lessons[{lesson_index}]"
        lesson_id = lesson.get("id")
        if not lesson_id:
            findings.append(Finding("error", lesson_path, "Lesson is missing id"))
        elif lesson_id in seen_lesson_ids:
            findings.append(Finding("error", lesson_path, f"Duplicate lesson id: {lesson_id}"))
        else:
            seen_lesson_ids.add(lesson_id)

        dictionary = {entry.get("id"): entry for entry in lesson.get("dictionary", []) if entry.get("id")}
        scenes = {scene.get("id"): scene for scene in lesson.get("scenes", []) if scene.get("id")}
        validate_tree_text(lesson, lesson_path, findings)
        validate_dictionary(lesson, dictionary, lesson_path, findings, strict_audio)
        validate_units(lesson, dictionary, scenes, lesson_path, findings, strict_audio)

    return findings


def validate_sources(
    lesson_sources: list[dict[str, Any]],
    dictionary: dict[str, Any],
    maps: dict[str, dict[str, Any]],
) -> list[Finding]:
    findings: list[Finding] = []
    word_ids = {item.get("id") for item in dictionary.get("words", [])}

    validate_tree_text(dictionary, "content/dictionary/ru.json", findings)

    for source in lesson_sources:
        source_path = source.get("_sourceFile", source.get("id", "lesson-source"))
        validate_tree_text(source, source_path, findings)

        new_words = source.get("newWords", [])
        if len(new_words) > 7:
            findings.append(Finding("warning", source_path, "More than 7 new words/chunks"))

        for item_id in source.get("newWords", []) + source.get("reviewWords", []):
            if item_id not in word_ids:
                findings.append(Finding("error", source_path, f"Unknown dictionary id: {item_id}"))

        for unit in source.get("units", []):
            recipe = unit.get("recipe", {})
            if recipe.get("type") == "map" and recipe.get("mapId") not in maps:
                findings.append(Finding("error", source_path, f"Unknown map id: {recipe.get('mapId')}"))

    for map_id, map_source in maps.items():
        validate_tree_text(map_source, map_source.get("_sourceFile", map_id), findings)
        validate_map_source(map_source, findings)

    return findings


def validate_dictionary(
    lesson: dict[str, Any],
    dictionary: dict[str, dict[str, Any]],
    lesson_path: str,
    findings: list[Finding],
    strict_audio: bool,
) -> None:
    for entry_id, entry in dictionary.items():
        entry_path = f"{lesson_path}.dictionary[{entry_id}]"
        if not entry.get("text"):
            findings.append(Finding("error", entry_path, "Dictionary entry missing text"))
        if not entry.get("emoji"):
            findings.append(Finding("error", entry_path, "Dictionary entry missing emoji"))
        check_audio(entry.get("audio"), entry_path, findings, strict_audio)


def validate_units(
    lesson: dict[str, Any],
    dictionary: dict[str, dict[str, Any]],
    scenes: dict[str, dict[str, Any]],
    lesson_path: str,
    findings: list[Finding],
    strict_audio: bool,
) -> None:
    units = lesson.get("units") or [{"id": "unit-words", "stages": lesson.get("stages", [])}]
    seen_unit_ids: set[str] = set()
    seen_task_ids: set[str] = set()

    for unit_index, unit in enumerate(units):
        unit_path = f"{lesson_path}.units[{unit_index}]"
        unit_id = unit.get("id")
        if not unit_id:
            findings.append(Finding("error", unit_path, "Unit missing id"))
        elif unit_id in seen_unit_ids:
            findings.append(Finding("error", unit_path, f"Duplicate unit id: {unit_id}"))
        else:
            seen_unit_ids.add(unit_id)

        if unit.get("comingSoon"):
            continue

        for stage_index, stage in enumerate(unit.get("stages", [])):
            stage_path = f"{unit_path}.stages[{stage_index}]"
            validate_stage(stage, dictionary, scenes, stage_path, findings, strict_audio, seen_task_ids)


def validate_stage(
    stage: dict[str, Any],
    dictionary: dict[str, dict[str, Any]],
    scenes: dict[str, dict[str, Any]],
    stage_path: str,
    findings: list[Finding],
    strict_audio: bool,
    seen_task_ids: set[str],
) -> None:
    stage_type = stage.get("type")
    if stage_type == "intro":
        for entry_id in stage.get("items", []):
            if entry_id not in dictionary:
                findings.append(Finding("error", stage_path, f"Intro references missing dictionary id: {entry_id}"))
        return

    for task_index, task in enumerate(stage.get("tasks", [])):
        task_path = f"{stage_path}.tasks[{task_index}]"
        task_id = task.get("id")
        if not task_id:
            findings.append(Finding("error", task_path, "Task missing id"))
        elif task_id in seen_task_ids:
            findings.append(Finding("error", task_path, f"Duplicate task id: {task_id}"))
        else:
            seen_task_ids.add(task_id)

        validate_task(stage_type, task, dictionary, scenes, task_path, findings, strict_audio)


def validate_task(
    stage_type: str,
    task: dict[str, Any],
    dictionary: dict[str, dict[str, Any]],
    scenes: dict[str, dict[str, Any]],
    task_path: str,
    findings: list[Finding],
    strict_audio: bool,
) -> None:
    collect_audio_paths(task, task_path, findings, strict_audio)

    if stage_type == "tap":
        option_ids = option_id_set(task.get("options", []))
        if task.get("correct") not in option_ids:
            findings.append(Finding("error", task_path, "Tap correct answer is not in options"))

    if stage_type == "picture-choice":
        option_ids = option_id_set(task.get("options", []))
        if task.get("correctScene") not in option_ids:
            findings.append(Finding("error", task_path, "Picture correctScene is not in options"))

    if stage_type == "yes-no" and task.get("correct") not in {"da", "net"}:
        findings.append(Finding("error", task_path, "Yes/no correct must be da or net"))

    if stage_type == "location" and task.get("correctZone") not in {"near", "far"}:
        findings.append(Finding("error", task_path, "Location correctZone must be near or far"))

    if stage_type == "mini-command-game":
        object_ids = {item.get("id") for item in task.get("objects", [])}
        if task.get("correctTarget") not in object_ids:
            findings.append(Finding("error", task_path, "Mini-game correctTarget missing from objects"))
        if task.get("correctAction") not in {"yes", "no"}:
            findings.append(Finding("error", task_path, "Mini-game correctAction must be yes or no"))

    if stage_type == "map-command-game":
        validate_runtime_map_task(task, task_path, findings)

    if stage_type == "slides":
        for question_index, question in enumerate(task.get("questions", [])):
            option_ids = option_id_set(question.get("options", []))
            if question.get("correct") not in option_ids:
                findings.append(Finding("error", f"{task_path}.questions[{question_index}]", "Slide question correct answer is not in options"))


def validate_runtime_map_task(task: dict[str, Any], task_path: str, findings: list[Finding]) -> None:
    width = int(task.get("width", 5))
    height = int(task.get("height", 5))
    points = [("start", task.get("start")), ("target", task.get("target"))]
    for object_item in task.get("objects", []):
        points.append((f"object:{object_item.get('id')}", object_item))
    for label, point in points:
        if not isinstance(point, dict):
            findings.append(Finding("error", task_path, f"Map {label} missing point"))
            continue
        x = point.get("x")
        y = point.get("y")
        if not isinstance(x, int) or not isinstance(y, int) or x < 0 or y < 0 or x >= width or y >= height:
            findings.append(Finding("error", task_path, f"Map {label} is out of bounds"))


def validate_map_source(map_source: dict[str, Any], findings: list[Finding]) -> None:
    path = map_source.get("_sourceFile", map_source.get("id", "map"))
    width = int(map_source.get("width", 5))
    height = int(map_source.get("height", 5))
    object_ids = {item.get("id") for item in map_source.get("objects", [])}
    for object_item in map_source.get("objects", []):
        if object_item.get("x", -1) < 0 or object_item.get("x", width) >= width or object_item.get("y", -1) < 0 or object_item.get("y", height) >= height:
            findings.append(Finding("error", path, f"Map object out of bounds: {object_item.get('id')}"))
    for command in map_source.get("commands", []):
        if command.get("targetObject") not in object_ids:
            findings.append(Finding("error", path, f"Command targetObject missing: {command.get('targetObject')}"))


def option_id_set(options: list[Any]) -> set[str]:
    result: set[str] = set()
    for item in options:
        if isinstance(item, str):
            result.add(item)
        elif isinstance(item, dict) and item.get("id"):
            result.add(item["id"])
    return result


def validate_tree_text(value: Any, path: str, findings: list[Finding]) -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            child_path = f"{path}.{key}"
            if key in LEARNER_TEXT_KEYS and isinstance(child, str):
                validate_visible_text(child, child_path, findings)
            else:
                validate_tree_text(child, child_path, findings)
        return

    if isinstance(value, list):
        for index, child in enumerate(value):
            validate_tree_text(child, f"{path}[{index}]", findings)


def validate_visible_text(text: str, path: str, findings: list[Finding]) -> None:
    if has_mojibake(text):
        findings.append(Finding("error", path, "Mojibake detected"))
    if has_english_words(text):
        findings.append(Finding("warning", path, "English-looking word detected"))


def collect_audio_paths(value: Any, path: str, findings: list[Finding], strict_audio: bool) -> None:
    if isinstance(value, dict):
        audio = value.get("audio")
        if isinstance(audio, str):
            check_audio(audio, path, findings, strict_audio)
        for key, child in value.items():
            if key != "audio":
                collect_audio_paths(child, f"{path}.{key}", findings, strict_audio)
        return

    if isinstance(value, list):
        for index, child in enumerate(value):
            collect_audio_paths(child, f"{path}[{index}]", findings, strict_audio)


def check_audio(audio_path: object, path: str, findings: list[Finding], strict_audio: bool) -> None:
    if not audio_path:
        findings.append(Finding("warning", path, "Missing audio path"))
        return
    if not isinstance(audio_path, str):
        return
    full_path = ROOT / audio_path
    if not full_path.exists():
        findings.append(Finding("error" if strict_audio else "warning", path, f"Audio file does not exist: {audio_path}"))
