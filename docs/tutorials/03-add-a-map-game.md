# Tutorial: Add A Map Game

Create a map source in:

```text
content/maps/
```

Example:

```json
{
  "id": "park-map-1",
  "title": "Парк",
  "width": 5,
  "height": 5,
  "start": { "x": 0, "y": 4 },
  "objects": [
    { "id": "park", "emoji": "🌳🌳🌳", "x": 4, "y": 1, "kind": "place" },
    { "id": "bus", "emoji": "🚌", "x": 1, "y": 2, "kind": "transport" }
  ],
  "commands": [
    {
      "id": "go-park",
      "text": "иди в парк",
      "emoji": "🌳🌳🌳",
      "audio": "assets/audio/ru/idi_v_park.mp3",
      "targetObject": "park"
    }
  ]
}
```

Preview:

```bash
python tools/lexiforge.py map-preview park-map-1
```

Use the map in a lesson:

```json
{
  "id": "unit-lesson-5-map",
  "title": "Карта",
  "icon": "🗺️",
  "recipe": {
    "type": "map",
    "mapId": "park-map-1"
  }
}
```

Build:

```bash
python tools/lexiforge.py build
python tools/lexiforge.py validate
```

