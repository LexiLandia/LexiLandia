from __future__ import annotations

from typing import Any


def render_map_preview(map_source: dict[str, Any]) -> str:
    width = int(map_source.get("width", 5))
    height = int(map_source.get("height", 5))
    cells = [["·" for _ in range(width)] for _ in range(height)]
    start = map_source.get("start", {})
    if isinstance(start.get("x"), int) and isinstance(start.get("y"), int):
        cells[start["y"]][start["x"]] = "🙂"
    for item in map_source.get("objects", []):
        x = item.get("x")
        y = item.get("y")
        if isinstance(x, int) and isinstance(y, int) and 0 <= x < width and 0 <= y < height:
            cells[y][x] = item.get("emoji", "?")
    lines = [map_source.get("title", map_source.get("id", "map"))]
    lines.extend(" ".join(row) for row in cells)
    return "\n".join(lines)

