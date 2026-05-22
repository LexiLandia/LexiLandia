"""Generate Russian lesson audio from data/lessons.json and JS lesson modules.

This script is for content production only. The website itself does not depend
on Python, packages, or network services at runtime.

Preferred generator: edge-tts with Russian neural voices.

Install:
    python -m pip install edge-tts

Run:
    python tools/generate_audio.py
    python tools/generate_audio.py --force
    python tools/generate_audio.py --voice ru-RU-DmitryNeural
"""

from __future__ import annotations

import argparse
import asyncio
import json
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LESSONS_PATH = ROOT / "data" / "lessons.json"
LEVEL0_PATH = ROOT / "js" / "level0Data.js"
LESSON3_PATH = ROOT / "js" / "lesson3Data.js"
LESSON3_GAME_PATH = ROOT / "js" / "lesson3GameData.js"
UNIT2_PATH = ROOT / "js" / "unit2Data.js"
GENERATED_LESSONS_PATH = ROOT / "js" / "lexiforgeGenerated.js"
JS_LESSON_MODULES = [
    (LEVEL0_PATH, "LexiLandLevel0", "before"),
    (LESSON3_PATH, "LexiLandLesson3", "after"),
    (LESSON3_GAME_PATH, "LexiLandLesson3ReadingGame", "after"),
    (UNIT2_PATH, "LexiLandUnit2AudioLesson", "after"),
    (GENERATED_LESSONS_PATH, "LexiForgeGeneratedLessons", "after"),
]
DEFAULT_VOICE = "ru-RU-SvetlanaNeural"
DEFAULT_RATE = "-4%"
DEFAULT_PITCH = "+0Hz"


@dataclass(frozen=True)
class AudioLine:
    text: str
    path: Path
    rate: str | None = None
    pitch: str | None = None


def load_audio_lines() -> list[AudioLine]:
    data = json.loads(LESSONS_PATH.read_text(encoding="utf-8"))
    lessons = list(data["lessons"])
    for path, global_name, position in JS_LESSON_MODULES:
        js_lessons = normalize_js_lessons(load_js_lesson(path, global_name))
        for js_lesson in js_lessons:
            if js_lesson and not any(lesson.get("id") == js_lesson.get("id") for lesson in lessons):
                if position == "before":
                    lessons.insert(0, js_lesson)
                else:
                    lessons.append(js_lesson)

    lines: dict[str, AudioLine] = {}

    for lesson in lessons:
        for feedback_group in (lesson.get("feedbackAudio") or {}).values():
            for feedback in normalize_feedback_group(feedback_group):
                for variant in feedback.get("variants", []):
                    add_line(
                        lines,
                        feedback["text"],
                        variant["audio"],
                        rate=variant.get("rate"),
                        pitch=variant.get("pitch"),
                    )

                if feedback.get("audio"):
                    add_line(lines, feedback["text"], feedback["audio"])

        for entry in lesson.get("dictionary", []):
            add_line(
                lines,
                entry["text"],
                entry["audio"],
                rate=entry.get("rate"),
                pitch=entry.get("pitch"),
                speech_text=entry.get("speechText"),
            )

        for stage in iter_stages(lesson):
            for task in stage.get("tasks", []):
                collect_audio(lines, task)

    return sorted(lines.values(), key=lambda line: str(line.path))


def load_js_lesson(path: Path, global_name: str) -> object:
    if not path.exists():
        return None

    script = (
        f"require('./{path.relative_to(ROOT).as_posix()}');"
        f"process.stdout.write(JSON.stringify(globalThis.{global_name} || null));"
    )

    try:
        result = subprocess.run(
            ["node", "-e", script],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
    except (subprocess.CalledProcessError, FileNotFoundError) as exc:
        raise SystemExit(f"Could not load {path.relative_to(ROOT)} with Node.js") from exc

    loaded = json.loads(result.stdout or "null")
    return loaded


def normalize_js_lessons(value: object) -> list[dict]:
    if isinstance(value, dict):
        return [value]

    if isinstance(value, list):
        return [item for item in value if isinstance(item, dict)]

    return []


def normalize_feedback_group(group: object) -> list[dict]:
    if isinstance(group, list):
        return [item for item in group if isinstance(item, dict)]

    if isinstance(group, dict):
        return [group]

    return []


def iter_stages(lesson: dict) -> list[dict]:
    stages = list(lesson.get("stages", []))
    for unit in lesson.get("units", []):
        stages.extend(unit.get("stages", []))
    for unit in lesson.get("extraUnits", []):
        stages.extend(unit.get("stages", []))
    return stages


def add_line(
    lines: dict[str, AudioLine],
    text: str,
    audio_path: str,
    *,
    rate: str | None = None,
    pitch: str | None = None,
    speech_text: str | None = None,
) -> None:
    target = ROOT / audio_path
    existing = lines.get(str(target))
    if existing and existing.rate and not rate:
        return

    lines[str(target)] = AudioLine(text=speech_text or text, path=target, rate=rate, pitch=pitch)


def collect_audio(lines: dict[str, AudioLine], value: object, fallback_text: str = "") -> None:
    if isinstance(value, dict):
        text = str(value.get("text") or fallback_text)
        audio_value = value.get("audio")

        if isinstance(audio_value, str) and text:
            add_line(
                lines,
                text,
                audio_value,
                rate=value.get("rate"),
                pitch=value.get("pitch"),
                speech_text=value.get("speechText"),
            )

        if isinstance(audio_value, list):
            for item in audio_value:
                collect_audio(lines, item, text)

        for key, child in value.items():
            if key != "audio":
                collect_audio(lines, child, text)
        return

    if isinstance(value, list):
        for item in value:
            collect_audio(lines, item, fallback_text)


async def generate_with_edge_tts(
    lines: list[AudioLine],
    *,
    voice: str,
    rate: str,
    pitch: str,
    force: bool,
) -> None:
    try:
        import edge_tts
    except ImportError as exc:
        raise SystemExit(
            "Missing package: edge-tts\n"
            "Install it with: python -m pip install edge-tts"
        ) from exc

    created = 0
    skipped = 0

    for line in lines:
        if line.path.exists() and not force:
            skipped += 1
            continue

        line.path.parent.mkdir(parents=True, exist_ok=True)
        communicate = edge_tts.Communicate(
            text=line.text,
            voice=voice,
            rate=line.rate or rate,
            pitch=line.pitch or pitch,
        )
        await communicate.save(str(line.path))
        created += 1
        print(f"ok  {line.path.relative_to(ROOT)}  {line.text}")

    print(f"\ncreated: {created}")
    print(f"skipped: {skipped}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate Russian MP3 audio for LexiLand.")
    parser.add_argument("--force", action="store_true", help="Regenerate files that already exist.")
    parser.add_argument("--voice", default=DEFAULT_VOICE, help="Edge TTS Russian voice name.")
    parser.add_argument("--rate", default=DEFAULT_RATE, help="Speech rate, for example -4% or +0%.")
    parser.add_argument("--pitch", default=DEFAULT_PITCH, help="Speech pitch, for example +0Hz.")
    parser.add_argument("--list", action="store_true", help="List target files without generating audio.")
    return parser.parse_args()


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    args = parse_args()
    lines = load_audio_lines()

    if args.list:
        for line in lines:
            print(f"{line.path.relative_to(ROOT)}\t{line.text}")
        print(f"\nfiles: {len(lines)}")
        return

    asyncio.run(
        generate_with_edge_tts(
            lines,
            voice=args.voice,
            rate=args.rate,
            pitch=args.pitch,
            force=args.force,
        )
    )


if __name__ == "__main__":
    main()
