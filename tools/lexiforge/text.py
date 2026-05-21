from __future__ import annotations

import re


CYRILLIC_TO_LATIN = {
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "yo",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "й": "y",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "ts",
    "ч": "ch",
    "ш": "sh",
    "щ": "shch",
    "ъ": "",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
}

MOJIBAKE_RE = re.compile(r"[ÐÑðâ�]")
ASCII_WORD_RE = re.compile(r"[A-Za-z]{2,}")


def slug(text: str) -> str:
    parts = []
    for char in str(text).lower():
        if char in CYRILLIC_TO_LATIN:
            parts.append(CYRILLIC_TO_LATIN[char])
        elif char.isascii() and char.isalnum():
            parts.append(char)
        else:
            parts.append("_")
    return re.sub(r"_+", "_", "".join(parts)).strip("_") or "item"


def pause_between_words(text: str) -> str:
    words = [part for part in re.sub(r"[.!?;:]+", " ", str(text)).split() if part]
    if len(words) < 2:
        return text
    return ". ".join(words) + "."


def has_mojibake(text: object) -> bool:
    return isinstance(text, str) and bool(MOJIBAKE_RE.search(text))


def has_english_words(text: object) -> bool:
    return isinstance(text, str) and bool(ASCII_WORD_RE.search(text))

