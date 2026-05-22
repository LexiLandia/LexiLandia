# LexiLand Structure Memory

Use this file before adding or moving content.

## Home Blocks

The app calls top-level menu cards `lessons` in code, but visually they can be:
- `Урок 0`
- `Урок 1`
- `Урок 2`
- `Урок 3`
- `Юнит 2`
- future `Юнит 3`, `Юнит 4`, etc.

Do not put a new major unit inside the previous lesson block.

## Unit Layout

Inside each top-level home block, use `units[]` for separate playable buttons:
- one button per lesson
- one button per game
- one button per text section
- one button per video section

Good example:
- Home card: `Юнит 2: Кто? Что? Маленький мир`
- Buttons:
  - `Урок 4: Кто?`
  - `Урок 5: Что?`
  - `Урок 6: Кто и что здесь?`
  - `Игра: Кто? Что? Где?`

Bad example:
- Put `Юнит 2` as a unit inside `Урок 3`.
- Put `Урок 4`, `Урок 5`, `Урок 6`, and the game as stages inside one giant button.

## Current Runtime Modules

- `js/level0Data.js`: `Урок 0`
- `data/lessons.json`: early static lessons
- `js/lesson2Data.js`: `Урок 2`
- `js/lesson3Data.js`: `Урок 3`
- `js/lesson3GameData.js`: appends only the Lesson 3 game to Lesson 3
- `js/unit2Data.js`: separate top-level `Юнит 2`
- `js/lexiforgeGenerated.js`: generated future lessons

If a new major unit is added in JS, it should become its own top-level object and be inserted in `normalizeLessonData()`.

## Progress

All units are open. Do not lock units behind previous completion.

When a unit is completed, localStorage tracks `completionCount`. The UI should show repeat counts like:
- `✅ 1 раз`
- `✅ 2 раза`
- `✅ 5 раз`

Older saved completions without `completionCount` count as `1 раз`.
