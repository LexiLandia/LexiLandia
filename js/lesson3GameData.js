(function (root) {
  "use strict";

  var audioRoot = "assets/audio/ru/";

  function audio(file) {
    return audioRoot + file;
  }

  root.LexiLandLesson3ReadingGame = {
    id: "lesson-3-reading-game",
    lessonOrder: 3,
    gameSlug: "lesson-3-reading-game",
    title: "Игра 3: Слушай и найди",
    stages: [
      {
        type: "choose_text",
        title: "Слушай",
        instruction: "Найди:",
        tasks: [
          { id: "l3g-1-1", target: "ма", emoji: "👄", audio: audio("ma.mp3"), options: ["ма", "мо", "ам", "ом"], correct: "ма" },
          { id: "l3g-1-2", target: "мо", emoji: "👄", audio: audio("mo.mp3"), options: ["ма", "мо", "ам", "ом"], correct: "мо" },
          { id: "l3g-1-3", target: "ам", emoji: "😋", audio: audio("am.mp3"), options: ["ма", "ом", "ам", "мо"], correct: "ам" },
          { id: "l3g-1-4", target: "ом", emoji: "🔊", audio: audio("om.mp3"), options: ["ом", "ма", "мо", "ам"], correct: "ом" },
          { id: "l3g-1-5", target: "ма", emoji: "👄", audio: audio("ma.mp3"), options: ["мо", "ам", "ма", "ом"], correct: "ма" }
        ]
      },
      {
        type: "build_word",
        title: "Собери слово",
        instruction: "Собери:",
        tasks: [
          { id: "l3g-2-1", target: "мама", emoji: "👩‍👧", audio: audio("mama.mp3"), tiles: ["ма", "ма", "мо"], correct: ["ма", "ма"] },
          { id: "l3g-2-2", target: "дом", emoji: "🏠", audio: audio("dom.mp3"), tiles: ["д", "о", "м", "а"], correct: ["д", "о", "м"] },
          { id: "l3g-2-3", target: "там", emoji: "👉", audio: audio("tam.mp3"), tiles: ["т", "а", "м", "о"], correct: ["т", "а", "м"] },
          { id: "l3g-2-4", target: "он", emoji: "👦", audio: audio("on.mp3"), tiles: ["о", "н", "м"], correct: ["о", "н"] },
          { id: "l3g-2-5", target: "она", emoji: "👧", audio: audio("ona.mp3"), tiles: ["о", "н", "а", "м"], correct: ["о", "н", "а"] }
        ]
      },
      {
        type: "word_to_image",
        title: "Слушай → картинка",
        instruction: "Слушай:",
        tasks: [
          { id: "l3g-3-1", target: "мама", emoji: "👩‍👧", audio: audio("mama.mp3"), options: ["👩‍👧", "🏠", "👉", "👦"], correct: "👩‍👧" },
          { id: "l3g-3-2", target: "дом", emoji: "🏠", audio: audio("dom.mp3"), options: ["🏠", "👧", "👩‍👧", "👉"], correct: "🏠" },
          { id: "l3g-3-3", target: "там", emoji: "👉", audio: audio("tam.mp3"), options: ["👉", "🏠", "👦", "👧"], correct: "👉" },
          { id: "l3g-3-4", target: "он", emoji: "👦", audio: audio("on.mp3"), options: ["👦", "👧", "🏠", "👩‍👧"], correct: "👦" },
          { id: "l3g-3-5", target: "она", emoji: "👧", audio: audio("ona.mp3"), options: ["👧", "👦", "👉", "🏠"], correct: "👧" }
        ]
      },
      {
        type: "image_to_word",
        title: "Слушай → слово",
        instruction: "Слушай:",
        tasks: [
          { id: "l3g-4-1", target: "👩‍👧", audio: audio("mama.mp3"), options: ["мама", "дом", "там", "он"], correct: "мама" },
          { id: "l3g-4-2", target: "🏠", audio: audio("dom.mp3"), options: ["дом", "мама", "она", "там"], correct: "дом" },
          { id: "l3g-4-3", target: "👉", audio: audio("tam.mp3"), options: ["там", "дом", "он", "мама"], correct: "там" },
          { id: "l3g-4-4", target: "👦", audio: audio("on.mp3"), options: ["он", "она", "дом", "там"], correct: "он" },
          { id: "l3g-4-5", target: "👧", audio: audio("ona.mp3"), options: ["она", "он", "мама", "дом"], correct: "она" }
        ]
      },
      {
        type: "mini_reading",
        title: "Слушай и выбери",
        instruction: "Слушай:",
        tasks: [
          { id: "l3g-5-1", text: "Мама дома.", audio: audio("mama_doma.mp3"), question: "Где мама?", options: ["дома", "там"], correct: "дома" },
          { id: "l3g-5-2", text: "Он там.", audio: audio("on_tam.mp3"), question: "Где он?", options: ["там", "дома"], correct: "там" },
          { id: "l3g-5-3", text: "Она там.", audio: audio("ona_tam.mp3"), question: "Где она?", options: ["там", "дом"], correct: "там" },
          { id: "l3g-5-4", text: "Там дом.", audio: audio("tam_dom.mp3"), question: "Что там?", options: ["дом", "мама"], correct: "дом" },
          { id: "l3g-5-5", text: "Мама там.\nДом там.", audio: audio("l3_story_1.mp3"), question: "Что там?", options: ["мама и дом", "он и она"], correct: "мама и дом" }
        ]
      }
    ]
  };

  if (root.LexiLandLesson3 && Array.isArray(root.LexiLandLesson3.units)) {
    var hasGame = root.LexiLandLesson3.units.some(function (unit) {
      return unit.id === "unit-lesson-3-reading-game";
    });

    if (!hasGame) {
      root.LexiLandLesson3.units.push({
        id: "unit-lesson-3-reading-game",
        title: "Игра",
        icon: "🕹️",
        stages: [
          {
            type: "reading-find-game",
            title: "Игра 3: Слушай и найди",
            tasks: [root.LexiLandLesson3ReadingGame]
          }
        ]
      });
    }
  }
}(typeof window !== "undefined" ? window : globalThis));
