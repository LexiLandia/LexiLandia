from __future__ import annotations

import argparse
import subprocess
import sys
from typing import Any

from .audio import collect_audio_manifest
from .compile import compile_lessons
from .emit import emit_generated_lessons, emit_manifest
from .io import load_config, load_dictionary, load_lesson_sources, load_map_sources, load_runtime_lessons, write_json
from .maps import render_map_preview
from .paths import ROOT
from .summarize import OllamaSummaryError, command_summarize_lessons
from .validate import Finding, validate_lessons, validate_sources


def main(argv: list[str] | None = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = argparse.ArgumentParser(description="LexiForge static lesson factory.")
    sub = parser.add_subparsers(dest="command", required=True)

    build_parser = sub.add_parser("build", help="Compile ready source lessons into static JS.")
    build_parser.add_argument("--include-drafts", action="store_true", help="Also compile draft lesson sources.")

    validate_parser = sub.add_parser("validate", help="Validate sources and runtime lessons.")
    validate_parser.add_argument("--strict-audio", action="store_true", help="Fail when audio files are missing.")
    validate_parser.add_argument("--include-drafts", action="store_true", help="Validate draft lesson sources too.")

    audio_parser = sub.add_parser("audio-plan", help="Write and print the audio generation manifest.")
    audio_parser.add_argument("--missing-only", action="store_true", help="Print only missing files.")

    audio_generate_parser = sub.add_parser("audio-generate", help="Generate missing audio with the existing audio generator.")
    audio_generate_parser.add_argument("--force", action="store_true", help="Regenerate existing files too.")
    audio_generate_parser.add_argument("--voice", help="Override the Edge TTS voice.")

    map_parser = sub.add_parser("map-preview", help="Print a text preview of a map source.")
    map_parser.add_argument("map_id", nargs="?", help="Map id. Omit to print all maps.")

    agents_parser = sub.add_parser("agents", help="List or print available content agents.")
    agents_parser.add_argument("name", nargs="?", help="Optional agent name without .md")
    summarize_parser = sub.add_parser("summarize-lessons", help="Summarize current lessons with local Ollama.")
    summarize_parser.add_argument("--model", help="Ollama model name. Defaults to first installed model.")
    summarize_parser.add_argument("--base-url", default=None, help="Ollama base URL. Defaults to http://localhost:11434.")
    summarize_parser.add_argument("--output", default="docs/lesson-catalog-ai.md", help="Markdown output path.")
    summarize_parser.add_argument("--dry-run", action="store_true", help="Print compact lesson context without calling Ollama.")
    summarize_parser.add_argument("--timeout", type=int, default=300, help="Ollama request timeout in seconds.")
    sub.add_parser("status", help="Show runtime lesson and generated source status.")
    sub.add_parser("smoke", help="Run build, validate, and JavaScript/Python syntax checks.")

    new_parser = sub.add_parser("new-lesson", help="Create a starter lesson source.")
    new_parser.add_argument("lesson_id")
    new_parser.add_argument("title")

    args = parser.parse_args(argv)

    if args.command == "build":
        return command_build(args.include_drafts)
    if args.command == "validate":
        return command_validate(args.strict_audio, args.include_drafts)
    if args.command == "audio-plan":
        return command_audio_plan(args.missing_only)
    if args.command == "audio-generate":
        return command_audio_generate(args.force, args.voice)
    if args.command == "map-preview":
        return command_map_preview(args.map_id)
    if args.command == "agents":
        return command_agents(args.name)
    if args.command == "summarize-lessons":
        try:
            return command_summarize_lessons(args.model, args.base_url, args.output, args.dry_run, args.timeout)
        except OllamaSummaryError as exc:
            print(f"ERROR\t{exc}")
            return 1
    if args.command == "status":
        return command_status()
    if args.command == "smoke":
        return command_smoke()
    if args.command == "new-lesson":
        return command_new_lesson(args.lesson_id, args.title)

    return 1


def command_build(include_drafts: bool = False) -> int:
    config = load_config()
    dictionary = load_dictionary(config)
    maps = load_map_sources(config)
    lesson_sources = load_lesson_sources(config, include_drafts=include_drafts)

    source_findings = validate_sources(lesson_sources, dictionary, maps)
    errors = [item for item in source_findings if item.level == "error"]
    if errors:
        print_findings(source_findings)
        return 1

    generated = compile_lessons(lesson_sources, dictionary, maps, config)
    emit_generated_lessons(generated, config)

    runtime_lessons = load_runtime_lessons(include_generated=True)
    audio_manifest = collect_audio_manifest(runtime_lessons, config)
    emit_manifest(
        {
            "project": config["project"],
            "generatedLessonCount": len(generated),
            "runtimeLessons": lesson_summary(runtime_lessons),
            "audioCount": len(audio_manifest),
            "missingAudioCount": sum(1 for item in audio_manifest if not item["exists"]),
            "audio": audio_manifest,
        },
        config,
    )

    print(f"Built {len(generated)} generated lesson(s).")
    print(config["generatedLessonsFile"])
    print(config["manifestFile"])
    return 0


def command_validate(strict_audio: bool = False, include_drafts: bool = False) -> int:
    config = load_config()
    dictionary = load_dictionary(config)
    maps = load_map_sources(config)
    lesson_sources = load_lesson_sources(config, include_drafts=include_drafts)
    findings = validate_sources(lesson_sources, dictionary, maps)
    findings.extend(validate_lessons(load_runtime_lessons(include_generated=True), strict_audio=strict_audio))
    print_findings(findings)
    errors = [item for item in findings if item.level == "error"]
    return 1 if errors else 0


def command_audio_plan(missing_only: bool = False) -> int:
    config = load_config()
    lessons = load_runtime_lessons(include_generated=True)
    manifest = collect_audio_manifest(lessons, config)
    emit_manifest(
        {
            "project": config["project"],
            "runtimeLessons": lesson_summary(lessons),
            "audioCount": len(manifest),
            "missingAudioCount": sum(1 for item in manifest if not item["exists"]),
            "audio": manifest,
        },
        config,
    )
    rows = [item for item in manifest if item["exists"] is False] if missing_only else manifest
    for item in rows:
        status = "missing" if not item["exists"] else "ok"
        print(f"{status}\t{item['rate']}\t{item['audio']}\t{item['speechText']}")
    print(f"audio: {len(manifest)}; missing: {sum(1 for item in manifest if not item['exists'])}")
    return 0


def command_audio_generate(force: bool = False, voice: str | None = None) -> int:
    command = [sys.executable, "-B", "tools/generate_audio.py"]
    if force:
        command.append("--force")
    if voice:
        command.extend(["--voice", voice])
    return subprocess.run(command, cwd=ROOT).returncode


def command_map_preview(map_id: str | None) -> int:
    config = load_config()
    maps = load_map_sources(config)
    selected = [maps[map_id]] if map_id else list(maps.values())
    for item in selected:
        print(render_map_preview(item))
        print()
    return 0


def command_agents(name: str | None = None) -> int:
    config = load_config()
    agents_dir = ROOT / config["agentsDir"]
    if name:
        shared = agents_dir / "_shared.md"
        path = agents_dir / f"{name}.md"
        if not path.exists():
            print(f"Unknown agent: {name}")
            return 1
        if shared.exists():
            print(shared.read_text(encoding="utf-8").strip())
            print("\n---\n")
        print(path.read_text(encoding="utf-8").strip())
        return 0

    for path in sorted(agents_dir.glob("*.md")):
        if path.name.startswith("_"):
            continue
        print(path.relative_to(ROOT))
    return 0


def command_status() -> int:
    config = load_config()
    sources = load_lesson_sources(config, include_drafts=True)
    runtime_lessons = load_runtime_lessons(include_generated=True)
    print("Runtime lessons:")
    for lesson in runtime_lessons:
        print(f"{lesson.get('order', '')}\t{lesson.get('id')}\t{lesson.get('title')}")
    print()
    print("LexiForge lesson sources:")
    for source in sources:
        print(f"{source.get('status', 'ready')}\t{source.get('id')}\t{source.get('_sourceFile')}")
    return 0


def command_smoke() -> int:
    steps = [
        ("build", [sys.executable, "-B", "tools/lexiforge.py", "build"]),
        ("validate", [sys.executable, "-B", "tools/lexiforge.py", "validate"]),
        ("python_syntax", [sys.executable, "-B", "-c", "import ast, pathlib; files=list(pathlib.Path('tools/lexiforge').glob('*.py'))+[pathlib.Path('tools/lexiforge.py'), pathlib.Path('tools/generate_audio.py')]; [ast.parse(path.read_text(encoding='utf-8'), filename=str(path)) for path in files]"]),
        ("node_app", ["node", "--check", "js/app.js"]),
        ("node_generated", ["node", "--check", "js/lexiforgeGenerated.js"]),
    ]
    for label, command in steps:
        print(f"== {label}")
        result = subprocess.run(command, cwd=ROOT)
        if result.returncode:
            return result.returncode
    print("Smoke OK")
    return 0


def command_new_lesson(lesson_id: str, title: str) -> int:
    config = load_config()
    path = ROOT / "content" / "lessons" / f"{lesson_id}.lesson.json"
    if path.exists():
        print(f"Already exists: {path.relative_to(ROOT)}")
        return 1
    starter: dict[str, Any] = {
        "status": "draft",
        "id": lesson_id,
        "order": 999,
        "title": title,
        "level": "Уровень 1",
        "newWords": [],
        "reviewWords": ["da", "net", "eto", "zdes", "tam"],
        "units": [
            {
                "id": f"unit-{lesson_id}-words",
                "title": "Слова",
                "icon": "⭐",
                "recipe": {
                    "type": "vocabulary",
                    "intro": True,
                    "tapCount": 12,
                    "pictureChoiceCount": 8,
                    "yesNoCount": 8,
                },
            }
        ],
    }
    write_json(path, starter)
    print(path.relative_to(ROOT))
    return 0


def lesson_summary(lessons: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [
        {
            "id": lesson.get("id"),
            "order": lesson.get("order"),
            "title": lesson.get("title"),
            "unitCount": len(lesson.get("units", []) or []),
        }
        for lesson in lessons
    ]


def print_findings(findings: list[Finding]) -> None:
    if not findings:
        print("OK")
        return
    for item in findings:
        print(f"{item.level.upper()}\t{item.path}\t{item.message}")


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
