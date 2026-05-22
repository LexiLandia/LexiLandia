# LexiLand Structure Memory

Use this file before adding or moving content.

## Home Page

The first screen should show only big top-level unit/course cards. Do not expand all lessons on the first screen.

When the learner taps a top-level card, open the page for that major unit.

Current home cards should be major unit shells:
- `Юнит 1`
- `Юнит 2`
- future `Юнит 3`, `Юнит 4`, etc.

`Юнит 1` is a virtual shell in `js/app.js`. It wraps the existing top-level lessons:
- `Урок 0`
- `Урок 1`
- `Урок 2`
- `Урок 3`

Do not move those lesson data objects into one giant lesson. Keep them separate and only group them for the menu.

Do not put a new major unit inside the previous lesson block.

Top-level card image fields are optional. The UI supports:
- `coverImage`
- `image`
- `cardImage`
- `coverEmoji`

If no image is set, the card uses an emoji fallback.

## Unit Layout

Inside a major unit page, show separate lesson/game/text/video buttons.

For `Юнит 1`, the first page opens lesson cards:
- `Урок 0. Учимся читать`
- `Урок 1. Здесь, там, это`
- `Урок 2: Где? Здесь или там?`
- `Урок 3: мама, дом, там`

After tapping one of those lessons, open its own `units[]` page.

For `Юнит 2` and future generated major units, the top-level object can directly use `units[]` for separate playable buttons:
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
