from __future__ import annotations

from copy import deepcopy
from typing import Any

from .text import pause_between_words, slug


def compile_lessons(
    lesson_sources: list[dict[str, Any]],
    dictionary_source: dict[str, Any],
    map_sources: dict[str, dict[str, Any]],
    config: dict[str, Any],
) -> list[dict[str, Any]]:
    entries = {item["id"]: item for item in dictionary_source.get("words", [])}
    lessons = [
        compile_lesson(source, entries, map_sources, config)
        for source in sorted(lesson_sources, key=lambda item: (item.get("order", 9999), item.get("id", "")))
    ]
    return lessons


def compile_lesson(
    source: dict[str, Any],
    entries: dict[str, dict[str, Any]],
    map_sources: dict[str, dict[str, Any]],
    config: dict[str, Any],
) -> dict[str, Any]:
    item_ids = unique_list(source.get("newWords", []) + source.get("reviewWords", []))
    dictionary = [runtime_entry(entries[item_id], config) for item_id in item_ids if item_id in entries]
    lesson = {
      "id": source["id"],
      "order": source.get("order"),
      "title": source["title"],
      "level": source.get("level", ""),
      "dictionary": dictionary,
      "scenes": [],
      "units": []
    }

    for unit_source in source.get("units", []):
        lesson["units"].append(compile_unit(unit_source, source, entries, map_sources, config))

    return lesson


def compile_unit(
    unit_source: dict[str, Any],
    lesson_source: dict[str, Any],
    entries: dict[str, dict[str, Any]],
    map_sources: dict[str, dict[str, Any]],
    config: dict[str, Any],
) -> dict[str, Any]:
    unit = {
        "id": unit_source["id"],
        "title": unit_source["title"],
        "icon": unit_source.get("icon", "⭐"),
        "stages": [],
    }

    recipe = unit_source.get("recipe", {})
    if unit_source.get("comingSoon"):
        unit["comingSoon"] = True
        return unit

    if recipe.get("type") == "vocabulary":
        unit["stages"].extend(compile_vocabulary_stages(unit_source, lesson_source, entries, recipe, config))
    elif recipe.get("type") == "map":
        unit["stages"].append(compile_map_stage(unit_source, map_sources[recipe["mapId"]]))
    else:
        unit["stages"].extend(deepcopy(unit_source.get("stages", [])))

    return unit


def compile_vocabulary_stages(
    unit_source: dict[str, Any],
    lesson_source: dict[str, Any],
    entries: dict[str, dict[str, Any]],
    recipe: dict[str, Any],
    config: dict[str, Any],
) -> list[dict[str, Any]]:
    new_words = [entries[item_id] for item_id in lesson_source.get("newWords", []) if item_id in entries]
    review_words = [entries[item_id] for item_id in lesson_source.get("reviewWords", []) if item_id in entries]
    all_words = unique_entries(new_words + review_words)
    stages: list[dict[str, Any]] = []

    if recipe.get("intro", True):
        stages.append({
            "type": "intro",
            "title": "Слушай и смотри",
            "items": [item["id"] for item in new_words],
        })

    if recipe.get("tapCount", 0):
        stages.append({
            "type": "tap",
            "title": "Слушай и выбирай",
            "tasks": make_tap_tasks(unit_source["id"], all_words, recipe["tapCount"]),
        })

    if recipe.get("pictureChoiceCount", 0):
        stages.append({
            "type": "picture-choice",
            "title": "Картинка и слово",
            "tasks": make_picture_choice_tasks(unit_source["id"], all_words, recipe["pictureChoiceCount"]),
        })

    if recipe.get("yesNoCount", 0):
        stages.append({
            "type": "yes-no",
            "title": "Да или нет",
            "tasks": make_yes_no_tasks(unit_source["id"], all_words, recipe["yesNoCount"]),
        })

    return stages


def compile_map_stage(unit_source: dict[str, Any], map_source: dict[str, Any]) -> dict[str, Any]:
    tasks = []
    objects = map_source.get("objects", [])
    object_map = {item["id"]: item for item in objects}
    for index, command in enumerate(map_source.get("commands", []), 1):
        target = object_map[command["targetObject"]]
        tasks.append({
            "id": f"{unit_source['id']}-map-{index}",
            "text": command["text"],
            "emoji": command.get("emoji", target.get("emoji", "")),
            "audio": command["audio"],
            "width": map_source.get("width", 5),
            "height": map_source.get("height", 5),
            "start": map_source.get("start", {"x": 0, "y": 0}),
            "target": {"x": target["x"], "y": target["y"]},
            "objects": deepcopy(objects),
        })
    return {
        "type": "map-command-game",
        "title": map_source.get("title", unit_source["title"]),
        "tasks": tasks,
    }


def runtime_entry(entry: dict[str, Any], config: dict[str, Any]) -> dict[str, Any]:
    result = {
        "id": entry["id"],
        "text": entry["text"],
        "emoji": entry["emoji"],
        "type": entry.get("type", "word"),
        "audio": entry.get("audio") or config["audioRoot"] + slug(entry["text"]) + ".mp3",
    }
    for key in ("rate", "pitch", "speechText", "image"):
        if entry.get(key):
            result[key] = entry[key]
    return result


def audio_item(entry: dict[str, Any]) -> dict[str, Any]:
    text = entry["text"]
    item = {
        "text": text,
        "audio": entry["audio"],
    }
    if entry.get("rate"):
        item["rate"] = entry["rate"]
    if entry.get("pitch"):
        item["pitch"] = entry["pitch"]
    speech_text = entry.get("speechText") or pause_between_words(text)
    if speech_text != text:
        item["speechText"] = speech_text
    return item


def make_tap_tasks(prefix: str, words: list[dict[str, Any]], count: int) -> list[dict[str, Any]]:
    tasks = []
    if not words:
        return tasks
    for index in range(count):
        correct = words[index % len(words)]
        options = rotate_options(words, index, 4)
        if correct not in options:
            options[-1] = correct
        tasks.append({
            "id": f"{prefix}-tap-{index + 1}",
            "text": correct["text"],
            "emoji": correct["emoji"],
            "audio": correct["audio"],
            "options": [option_from_entry(item) for item in stable_shuffle(options, index)],
            "correct": correct["id"],
        })
    return tasks


def make_picture_choice_tasks(prefix: str, words: list[dict[str, Any]], count: int) -> list[dict[str, Any]]:
    tasks = []
    if not words:
        return tasks
    for index in range(count):
        correct = words[index % len(words)]
        option_entries = stable_shuffle(rotate_options(words, index, 3), index + 13)
        tasks.append({
            "id": f"{prefix}-picture-{index + 1}",
            "text": correct["text"],
            "emoji": correct["emoji"],
            "audio": correct["audio"],
            "options": [
                {
                    "id": item["id"],
                    "emoji": item["emoji"],
                    "text": item["text"],
                    "items": [{"emoji": item["emoji"]}],
                }
                for item in option_entries
            ],
            "correctScene": correct["id"],
        })
    return tasks


def make_yes_no_tasks(prefix: str, words: list[dict[str, Any]], count: int) -> list[dict[str, Any]]:
    tasks = []
    if not words:
        return tasks
    for index in range(count):
        correct = words[index % len(words)]
        shown = correct if index % 2 == 0 else words[(index + 1) % len(words)]
        tasks.append({
            "id": f"{prefix}-yesno-{index + 1}",
            "text": "это " + correct["text"],
            "emoji": correct["emoji"],
            "audio": make_phrase_audio(prefix, f"eto-{correct['id']}", "это " + correct["text"]),
            "scene": {
                "mode": "focus",
                "items": [{"emoji": shown["emoji"]}],
            },
            "correct": "da" if shown["id"] == correct["id"] else "net",
        })
    return tasks


def make_phrase_audio(prefix: str, key: str, text: str) -> str:
    return "assets/audio/ru/" + slug(prefix + "-" + key) + ".mp3"


def option_from_entry(entry: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": entry["id"],
        "text": entry["text"],
        "emoji": entry["emoji"],
    }


def rotate_options(words: list[dict[str, Any]], start: int, size: int) -> list[dict[str, Any]]:
    return [words[(start + offset) % len(words)] for offset in range(min(size, len(words)))]


def stable_shuffle(items: list[dict[str, Any]], seed: int) -> list[dict[str, Any]]:
    result = list(items)
    for index in range(len(result) - 1, 0, -1):
        swap_index = (seed + index * 7) % (index + 1)
        result[index], result[swap_index] = result[swap_index], result[index]
    return result


def unique_list(items: list[str]) -> list[str]:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result


def unique_entries(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    seen = set()
    result = []
    for item in items:
        if item["id"] not in seen:
            seen.add(item["id"])
            result.append(item)
    return result

