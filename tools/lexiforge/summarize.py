from __future__ import annotations

import json
import os
import re
import urllib.error
import urllib.request
from typing import Any

from .io import load_runtime_lessons
from .paths import ROOT


DEFAULT_BASE_URL = "http://localhost:11434"
DEFAULT_OUTPUT = "docs/lesson-catalog-ai.md"


class OllamaSummaryError(RuntimeError):
    pass


def command_summarize_lessons(
    model: str | None = None,
    base_url: str | None = None,
    output: str = DEFAULT_OUTPUT,
    dry_run: bool = False,
    timeout: int = 300,
) -> int:
    base_url = (base_url or os.environ.get("OLLAMA_BASE_URL") or DEFAULT_BASE_URL).rstrip("/")
    selected_model = model or os.environ.get("LEXILAND_OLLAMA_MODEL") or pick_ollama_model(base_url)
    payload = build_summary_payload(load_runtime_lessons(include_generated=True))

    if dry_run:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0

    markdown = summarize_with_ollama(payload, selected_model, base_url, timeout)
    validate_summary_markdown(markdown)
    target = ROOT / output
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(markdown.strip() + "\n", encoding="utf-8")
    print(f"Wrote {target.relative_to(ROOT)} with {selected_model}")
    return 0


def pick_ollama_model(base_url: str) -> str:
    try:
        with urllib.request.urlopen(f"{base_url}/api/tags", timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))
    except (OSError, urllib.error.URLError, json.JSONDecodeError) as exc:
        raise OllamaSummaryError(
            "Ollama is not reachable. Start Ollama, then run this command again."
        ) from exc

    models = data.get("models") or []
    if not models:
        raise OllamaSummaryError(
            "Ollama is running, but no models are installed. Run: ollama pull llama3.2:3b"
        )

    return str(models[0].get("name") or models[0].get("model"))


def summarize_with_ollama(payload: dict[str, Any], model: str, base_url: str, timeout: int) -> str:
    lessons = payload.get("уроки") if isinstance(payload.get("уроки"), list) else []
    blocks = ["# ИИ-каталог уроков ЛексиЛанд", ""]

    for lesson in lessons:
        if not isinstance(lesson, dict):
            continue
        title = str(lesson.get("название") or "Без названия").strip()
        blocks.append(f"## {title}")
        blocks.extend(summarize_one_item_with_fallback(lesson, model, base_url, timeout))
        blocks.append("")

        inner = lesson.get("внутри") if isinstance(lesson.get("внутри"), list) else []
        if title.startswith("Юнит"):
            for unit in inner:
                if not isinstance(unit, dict):
                    continue
                unit_title = str(unit.get("название") or "Без названия").strip()
                blocks.append(f"### {unit_title}")
                blocks.extend(summarize_one_item_with_fallback(unit, model, base_url, timeout))
                blocks.append("")

    return "\n".join(blocks)


def summarize_one_item_with_fallback(item: dict[str, Any], model: str, base_url: str, timeout: int) -> list[str]:
    for attempt in range(2):
        try:
            block = summarize_one_item(item, model, base_url, timeout, attempt)
            validate_summary_markdown(block)
            if "..." in block or "…" in block or has_placeholder_text(block):
                raise OllamaSummaryError("Ollama produced ellipses instead of content.")
            lines = [line.strip() for line in block.splitlines() if line.strip()]
            bullets = [line for line in lines if line.startswith("- ")]
            expected_prefixes = ("- Учит:", "- Слова:", "- Формат:")
            if len(bullets) >= 3 and all(bullets[index].startswith(prefix) for index, prefix in enumerate(expected_prefixes)):
                return bullets[:3]
        except OllamaSummaryError:
            continue

    return deterministic_summary(item)


def summarize_one_item(item: dict[str, Any], model: str, base_url: str, timeout: int, attempt: int) -> str:
    warning = ""
    if attempt:
        warning = "Предыдущий ответ был неправильный. Не используй многоточия и латиницу. "

    request = {
        "model": model,
        "stream": False,
        "options": {
            "temperature": 0.1,
            "num_ctx": 2048,
        },
        "messages": [
            {
                "role": "system",
                "content": (
                    "Ты локальный ИИ-агент ЛексиЛанд. Пиши только по-русски. "
                    "Не используй латиницу. Не используй многоточия. Не придумывай "
                    "новые слова или задания. Не повторяй название урока как содержание. "
                    "Отвечай коротко."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"{warning}"
                    "По данным ниже напиши ровно три строки, без заголовка:\n"
                    "- Учит: коротко что тренируется\n"
                    "- Слова: главные русские слова через запятую\n"
                    "- Формат: слайды, выбор, чтение, карта или игра\n\n"
                    f"{json.dumps(item, ensure_ascii=False, indent=2)}"
                ),
            },
        ],
    }

    try:
        encoded = json.dumps(request, ensure_ascii=False).encode("utf-8")
        http_request = urllib.request.Request(
            f"{base_url}/api/chat",
            data=encoded,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(http_request, timeout=timeout) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise OllamaSummaryError(f"Ollama returned HTTP {exc.code}: {body}") from exc
    except (OSError, urllib.error.URLError, json.JSONDecodeError) as exc:
        raise OllamaSummaryError(f"Ollama summary failed: {exc}") from exc

    content = (data.get("message") or {}).get("content")
    if not isinstance(content, str) or not content.strip():
        raise OllamaSummaryError("Ollama returned an empty summary.")

    return content


def deterministic_summary(item: dict[str, Any]) -> list[str]:
    texts = [value for value in as_list(item.get("тексты")) if isinstance(value, str)]
    words = [value for value in as_list(item.get("словарь")) if isinstance(value, str)]
    formats = [value for value in as_list(item.get("форматы")) if isinstance(value, str)]
    count = item.get("примерно_заданий")
    word_candidates = [value for value in texts if is_word_candidate(value)]

    teach_source = texts[:3] or [str(item.get("название") or "материал")]
    teach = ", ".join(clean_summary_piece(value) for value in teach_source if clean_summary_piece(value))
    word_source = words[:8] or word_candidates[:8]
    word_text = ", ".join(clean_summary_piece(value) for value in word_source if clean_summary_piece(value))
    format_text = ", ".join(clean_summary_piece(value) for value in formats if clean_summary_piece(value))

    if count:
        format_text = f"{format_text}, примерно {count} заданий" if format_text else f"примерно {count} заданий"

    return [
        f"- Учит: {teach or 'короткое чтение и понимание'}",
        f"- Слова: {word_text or 'слова из текущего урока'}",
        f"- Формат: {format_text or 'слайды и короткие задания'}",
    ]


def clean_summary_piece(value: str) -> str:
    value = normalize_text(value)
    value = value.replace("...", "").replace("…", "").strip(" ,.;")
    return value


def is_word_candidate(value: str) -> bool:
    text = clean_summary_piece(value)
    if not text:
        return False
    if text.startswith(("Урок", "Игра", "Юнит")):
        return False
    if text in {"Смотри", "Читай", "Слушай", "Выбери", "Найди"}:
        return False
    letters = re.findall(r"[А-Яа-яЁё]+", text)
    return 1 <= len(letters) <= 3


def build_summary_payload(lessons: list[dict[str, Any]]) -> dict[str, Any]:
    return {
        "проект": "ЛексиЛанд",
        "цель": "краткая память для автора о текущих уроках и играх",
        "уроки": [compact_lesson(item) for item in sorted_lessons(lessons)],
    }


def sorted_lessons(lessons: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return sorted(
        lessons,
        key=lambda item: (
            lesson_sort_order(item),
            str(item.get("title") or item.get("id") or ""),
        ),
    )


def lesson_sort_order(item: dict[str, Any]) -> float:
    order = item.get("order")
    if isinstance(order, (int, float)):
        return float(order)

    lesson_id = str(item.get("id") or "")
    match = re.search(r"lesson-(\d+)", lesson_id)
    if match:
        return float(match.group(1))

    return 9999.0


def compact_lesson(lesson: dict[str, Any]) -> dict[str, Any]:
    units = as_list(lesson.get("units"))
    stages = as_list(lesson.get("stages"))
    top_level = {
        key: value
        for key, value in lesson.items()
        if key not in {"units", "stages", "dictionary"}
    }
    unit_titles = [
        str(unit.get("title")).strip()
        for unit in units
        if isinstance(unit, dict) and str(unit.get("title") or "").strip()
    ]
    lesson_texts = collect_texts(top_level if units else lesson, limit=5)
    if unit_titles:
        lesson_texts = unique(unit_titles + lesson_texts)[:8]

    return {
        "порядок": lesson_sort_order(lesson),
        "название": lesson.get("title"),
        "уровень": lesson.get("level"),
        "словарь": compact_dictionary(lesson.get("dictionary")),
        "форматы": stage_types(stages),
        "тексты": lesson_texts,
        "внутри": [compact_unit(unit) for unit in units],
    }


def compact_unit(unit: dict[str, Any]) -> dict[str, Any]:
    stages = as_list(unit.get("stages"))
    return {
        "название": unit.get("title"),
        "иконка": unit.get("icon"),
        "форматы": stage_types(stages),
        "примерно_заданий": count_tasks(unit),
        "тексты": collect_texts(unit, limit=12),
    }


def compact_dictionary(value: Any) -> list[str]:
    words: list[str] = []
    for item in as_list(value):
        if not isinstance(item, dict):
            continue
        text = item.get("text") or item.get("word")
        emoji = item.get("emoji") or ""
        if isinstance(text, str) and text.strip() and not re.search(r"[A-Za-z]", text):
            words.append(f"{text.strip()} {str(emoji).strip()}".strip())
    return unique(words)[:12]


def stage_types(stages: list[Any]) -> list[str]:
    labels = {
        "intro": "вводные карточки",
        "tap": "слушай и выбирай",
        "picture-choice": "картинка и выбор",
        "yes-no": "да или нет",
        "location": "где",
        "mini-command-game": "мини-игра с командами",
        "slides": "слайды",
        "map-command-game": "карта с движением",
        "reading-find-game": "игра на чтение",
        "unit-2-kto-chto-game": "проверочная игра",
    }
    result: list[str] = []
    for stage in stages:
        if isinstance(stage, dict):
            label = str(stage.get("type") or stage.get("title") or "").strip()
            if label:
                result.append(labels.get(label, label))
    return unique(result)


def count_tasks(value: Any) -> int:
    total = 0

    def walk(node: Any) -> None:
        nonlocal total
        if isinstance(node, dict):
            for key in ("tasks", "questions", "items", "slides"):
                item = node.get(key)
                if isinstance(item, list):
                    total += len(item)
            for child in node.values():
                if isinstance(child, (dict, list)):
                    walk(child)
        elif isinstance(node, list):
            for child in node:
                walk(child)

    walk(value)
    return total


def collect_texts(value: Any, limit: int = 40) -> list[str]:
    result: list[str] = []
    keys = {
        "title",
        "text",
        "instruction",
        "prompt",
        "question",
        "correct",
        "target",
        "word",
        "speechText",
    }

    def add_text(text: Any) -> None:
        if len(result) >= limit:
            return
        if isinstance(text, str):
            cleaned = normalize_text(text)
            if cleaned:
                result.append(cleaned)
        elif isinstance(text, list):
            for item in text:
                add_text(item)
        elif isinstance(text, dict):
            for key in keys:
                if key in text:
                    add_text(text[key])

    def walk(node: Any) -> None:
        if len(result) >= limit:
            return
        if isinstance(node, dict):
            for key in keys:
                if key in node:
                    add_text(node[key])
            for key in ("units", "stages", "tasks", "questions", "slides", "items", "options", "visual", "reveal"):
                if key in node:
                    walk(node[key])
        elif isinstance(node, list):
            for child in node:
                walk(child)

    walk(value)
    return unique(result)[:limit]


def normalize_text(value: str) -> str:
    text = re.sub(r"\s+", " ", value.replace("\n", " ")).strip()
    if not text:
        return ""
    if text.startswith("assets/") or text.endswith(".mp3"):
        return ""
    if re.search(r"[A-Za-z]", text):
        return ""
    return text[:140]


def validate_summary_markdown(markdown: str) -> None:
    bad = sorted(set(re.findall(r"[A-Za-z]{2,}", markdown)))
    if bad:
        sample = ", ".join(bad[:12])
        raise OllamaSummaryError(
            f"Ollama produced Latin text in the summary: {sample}. Try another model or rerun."
        )
    if has_placeholder_text(markdown):
        raise OllamaSummaryError("Ollama copied prompt placeholder text into the summary.")


def has_placeholder_text(markdown: str) -> bool:
    lowered = markdown.casefold()
    return any(
        phrase in lowered
        for phrase in (
            "коротко что тренируется",
            "главные русские слова",
            "слайды, выбор, чтение, карта или игра",
        )
    )


def unique(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        key = value.casefold()
        if key in seen:
            continue
        seen.add(key)
        result.append(value)
    return result


def as_list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []
