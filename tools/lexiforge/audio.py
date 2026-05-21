from __future__ import annotations

from typing import Any

from .paths import ROOT


def collect_audio_manifest(lessons: list[dict[str, Any]], config: dict[str, Any]) -> list[dict[str, Any]]:
    items: dict[str, dict[str, Any]] = {}

    for lesson in lessons:
        source = lesson.get("id", "lesson")
        collect_from_tree(lesson, source, items, config)

    return [items[key] for key in sorted(items)]


def collect_from_tree(value: Any, source: str, items: dict[str, dict[str, Any]], config: dict[str, Any], fallback_text: str = "") -> None:
    if isinstance(value, dict):
        text = str(value.get("text") or fallback_text)
        audio = value.get("audio")
        if isinstance(audio, str) and text:
            item = {
                "audio": audio,
                "text": text,
                "speechText": value.get("speechText", text),
                "rate": value.get("rate") or infer_rate(value, config),
                "pitch": value.get("pitch") or config["defaultSpeech"]["pitch"],
                "voice": config["defaultSpeech"]["voice"],
                "source": source,
                "exists": (ROOT / audio).exists(),
            }
            items[audio] = item

        if isinstance(audio, list):
            for child in audio:
                collect_from_tree(child, source, items, config, text)

        for key, child in value.items():
            if key != "audio":
                collect_from_tree(child, source, items, config, text)
        return

    if isinstance(value, list):
        for child in value:
            collect_from_tree(child, source, items, config, fallback_text)


def infer_rate(value: dict[str, Any], config: dict[str, Any]) -> str:
    item_type = value.get("type")
    text = str(value.get("text") or "")
    defaults = config["defaultSpeech"]
    if item_type == "letter":
        return defaults["letterRate"]
    if item_type == "syllable":
        return defaults["syllableRate"]
    if len(text.split()) == 1:
        return defaults["wordRate"]
    return defaults["phraseRate"]

