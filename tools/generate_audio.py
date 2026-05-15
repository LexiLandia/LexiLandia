"""Generate Russian lesson audio from data/lessons.json.

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
import sys
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LESSONS_PATH = ROOT / "data" / "lessons.json"
DEFAULT_VOICE = "ru-RU-SvetlanaNeural"
DEFAULT_RATE = "-4%"
DEFAULT_PITCH = "+0Hz"


@dataclass(frozen=True)
class AudioLine:
    text: str
    path: Path


def load_audio_lines() -> list[AudioLine]:
    data = json.loads(LESSONS_PATH.read_text(encoding="utf-8"))
    lines: dict[str, AudioLine] = {}

    for lesson in data["lessons"]:
        for feedback in (lesson.get("feedbackAudio") or {}).values():
            add_line(lines, feedback["text"], feedback["audio"])

        for entry in lesson.get("dictionary", []):
            add_line(lines, entry["text"], entry["audio"])

        for stage in lesson.get("stages", []):
            for task in stage.get("tasks", []):
                if task.get("text") and task.get("audio"):
                    add_line(lines, task["text"], task["audio"])

    return sorted(lines.values(), key=lambda line: str(line.path))


def add_line(lines: dict[str, AudioLine], text: str, audio_path: str) -> None:
    target = ROOT / audio_path
    lines[str(target)] = AudioLine(text=text, path=target)


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
            rate=rate,
            pitch=pitch,
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
