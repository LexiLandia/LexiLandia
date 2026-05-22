# LexiLand Renderer Rules

Use this file before editing game or slide renderers.

## Answer Order

Never render answers in source order.

All multiple-choice renderers should:
1. copy the options
2. shuffle the copy
3. if the correct answer is first and there is more than one option, swap it with another random option

This prevents the learner from learning "tap the first card."

Current places with this rule:
- `js/games/slideLesson.js`
- `js/games/tapGame.js`
- `js/games/pictureChoiceGame.js`
- `js/games/readingFindGame.js`
- `js/games/unit2KtoChhtoGame.js`

## Audio-First Games

For listening games, do not show the target answer as a big visual hint before the learner answers.

Good:
- show `🔊 Слушай`
- play audio
- show answer choices

Bad:
- show the correct word at the top
- ask the learner to tap the same word below

## Feedback

Correct feedback should leave enough time to hear the phrase.

Use `helpers.playFeedback("success")` and `helpers.afterFeedback(...)` where possible. Avoid moving to the next task immediately if success audio is playing.

Wrong feedback should be gentle:
- `❌ попробуй ещё`
- `Смотри ещё 👀`
- no shame language

## Open Progress

Renderers should call their `onCorrect`/done callback when a unit/game is finished so `markUnitComplete()` can increment repeat counts.

Do not create a separate progress system unless the app-level localStorage cannot handle the case.
