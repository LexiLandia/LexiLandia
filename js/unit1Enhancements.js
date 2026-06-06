(function (root) {
  "use strict";

  var audioRoot = "assets/audio/ru/";

  function audio(file) {
    return audioRoot + file;
  }

  function entry(id, text, emoji, type, file) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      type: type || "word",
      audio: audio(file)
    };
  }

  function option(id, text, emoji) {
    return {
      id: id,
      text: text,
      emoji: emoji || ""
    };
  }

  function readingUnit(id, title, icon, game) {
    return {
      id: id,
      title: title,
      icon: icon,
      stages: [
        {
          type: "reading-find-game",
          title: title,
          tasks: [game]
        }
      ]
    };
  }

  function sceneUnit(id, title, icon, game) {
    return {
      id: id,
      title: title,
      icon: icon,
      stages: [
        {
          type: "unit-2-kto-chto-game",
          title: title,
          tasks: [game]
        }
      ]
    };
  }

  var wordOptions = ["мама", "дом", "кот", "сок", "нос", "рот"];

  var openWordGame = {
    id: "unit-1-game-open-word-data",
    gameSlug: "unit-1-game-open-word",
    title: "Открой слово",
    finalTitle: "Слова открыты! ✅",
    finalText: "Ты читаешь слова! 📖",
    finalWords: wordOptions,
    stages: [
      {
        id: "u1-open-stage-1",
        type: "build_word",
        title: "Собери слово",
        instruction: "Собери:",
        tasks: [
          { id: "u1-open-1", text: "мама", target: "мама", emoji: "👩‍👧", audio: audio("mama.mp3"), tiles: ["ма", "ма", "мо"], correct: ["ма", "ма"] },
          { id: "u1-open-2", text: "дом", target: "дом", emoji: "🏠", audio: audio("dom.mp3"), tiles: ["д", "о", "м", "а"], correct: ["д", "о", "м"] },
          { id: "u1-open-3", text: "кот", target: "кот", emoji: "🐱", audio: audio("kot.mp3"), tiles: ["к", "о", "т", "м"], correct: ["к", "о", "т"] },
          { id: "u1-open-4", text: "сок", target: "сок", emoji: "🧃", audio: audio("sok.mp3"), tiles: ["с", "о", "к", "т"], correct: ["с", "о", "к"] },
          { id: "u1-open-5", text: "нос", target: "нос", emoji: "👃", audio: audio("nos.mp3"), tiles: ["н", "о", "с", "р"], correct: ["н", "о", "с"] },
          { id: "u1-open-6", text: "рот", target: "рот", emoji: "👄", audio: audio("rot.mp3"), tiles: ["р", "о", "т", "с"], correct: ["р", "о", "т"] }
        ]
      }
    ]
  };

  var whoAppearedGame = {
    id: "unit-1-game-who-appeared-data",
    gameSlug: "unit-1-game-who-appeared",
    title: "Кто появился?",
    finalTitle: "Отлично! ✅",
    finalText: "Маленький мир открыт! 🏠",
    finalWords: ["мама", "дом", "кот", "тут", "дома"],
    stages: [
      {
        id: "u1-who-stage-1",
        type: "mini_reading",
        title: "Кто появился?",
        instruction: "Смотри и читай:",
        tasks: [
          {
            id: "u1-appeared-1",
            text: "Тут дом.",
            scene: { near: ["🏠"], far: [] },
            question: "Что тут?",
            audio: audio("u1_appeared_tut_dom.mp3"),
            options: [option("dom", "дом", "🏠"), option("kot", "кот", "🐱")],
            correct: "dom"
          },
          {
            id: "u1-appeared-2",
            text: "Тут кот.",
            scene: { near: ["🐱"], far: [] },
            question: "Кто тут?",
            audio: audio("u1_appeared_tut_kot.mp3"),
            options: [option("kot", "кот", "🐱"), option("mama", "мама", "👩‍👧")],
            correct: "kot"
          },
          {
            id: "u1-appeared-3",
            text: "Мама дома.",
            scene: { near: ["🏠", "👩‍👧"], far: [] },
            question: "Кто дома?",
            audio: audio("u1_appeared_mama_doma.mp3"),
            options: [option("mama", "мама", "👩‍👧"), option("kot", "кот", "🐱")],
            correct: "mama"
          },
          {
            id: "u1-appeared-4",
            text: "Тут дом.\nТут кот.\nМама дома.",
            scene: { near: ["🏠", "🐱", "👩‍👧"], far: [] },
            question: "Кто тут?",
            audio: audio("u1_appeared_full.mp3"),
            options: [option("kot", "кот", "🐱"), option("dom", "дом", "🏠")],
            correct: "kot"
          },
          {
            id: "u1-appeared-5",
            text: "Тут дом.\nТут кот.\nМама дома.",
            scene: { near: ["🏠", "🐱", "👩‍👧"], far: [] },
            question: "Что тут?",
            audio: audio("u1_appeared_full.mp3"),
            options: [option("dom", "дом", "🏠"), option("mama", "мама", "👩‍👧")],
            correct: "dom"
          }
        ]
      }
    ]
  };

  var syllableRoadGame = {
    id: "unit-1-game-syllable-road-data",
    gameSlug: "unit-1-game-syllable-road",
    title: "Слоговая дорожка",
    finalTitle: "Дорожка готова! ✅",
    finalText: "Слоги стали словами! 📖",
    finalWords: wordOptions,
    stages: [
      {
        id: "u1-road-stage-1",
        type: "syllable_road",
        title: "Слоговая дорожка",
        instruction: "Читай дорожку:",
        tasks: [
          { id: "u1-road-1", text: "мама", path: ["ма", "ма"], emoji: "👩‍👧", audio: audio("mama.mp3"), options: wordOptions, correct: "мама" },
          { id: "u1-road-2", text: "дом", path: ["до", "м"], emoji: "🏠", audio: audio("dom.mp3"), options: wordOptions, correct: "дом" },
          { id: "u1-road-3", text: "кот", path: ["ко", "т"], emoji: "🐱", audio: audio("kot.mp3"), options: wordOptions, correct: "кот" },
          { id: "u1-road-4", text: "сок", path: ["со", "к"], emoji: "🧃", audio: audio("sok.mp3"), options: wordOptions, correct: "сок" },
          { id: "u1-road-5", text: "нос", path: ["но", "с"], emoji: "👃", audio: audio("nos.mp3"), options: wordOptions, correct: "нос" },
          { id: "u1-road-6", text: "рот", path: ["ро", "т"], emoji: "👄", audio: audio("rot.mp3"), options: wordOptions, correct: "рот" }
        ]
      }
    ]
  };

  var listenWordGame = {
    id: "unit-1-listen-word-data",
    gameSlug: "unit-1-listen-word",
    title: "Слушай слово",
    finalTitle: "Ты слышишь слова! ✅",
    finalText: "Слушай и читай! 🔊",
    finalWords: ["мама", "дом", "кот", "сок", "вода"],
    stages: [
      {
        id: "u1-listen-stage-1",
        type: "choose_text",
        title: "Слушай слово",
        instruction: "Слушай и выбери:",
        tasks: [
          { id: "u1-listen-word-1", text: "мама", target: "мама", audio: audio("mama.mp3"), options: ["мама", "дом", "кот", "сок"], correct: "мама" },
          { id: "u1-listen-word-2", text: "дом", target: "дом", audio: audio("dom.mp3"), options: ["дом", "кот", "сок", "вода"], correct: "дом" },
          { id: "u1-listen-word-3", text: "кот", target: "кот", audio: audio("kot.mp3"), options: ["кот", "мама", "дом", "вода"], correct: "кот" },
          { id: "u1-listen-word-4", text: "сок", target: "сок", audio: audio("sok.mp3"), options: ["сок", "вода", "дом", "кот"], correct: "сок" },
          { id: "u1-listen-word-5", text: "вода", target: "вода", audio: audio("voda.mp3"), options: ["вода", "сок", "мама", "дом"], correct: "вода" }
        ]
      }
    ]
  };

  var littleWorldGame = {
    id: "unit-1-final-little-world-data",
    gameSlug: "unit-1-final-little-world",
    title: "Маленький мир",
    finalTitle: "Отлично! ✅",
    finalText: "Ты понял маленькую историю! 📖",
    finalWords: ["дом", "мама", "кот", "тут", "спит"],
    stages: [
      {
        id: "u1-little-world-stage-1",
        type: "mini_reading",
        title: "Маленький мир",
        instruction: "Читай:",
        tasks: [
          {
            id: "u1-little-world-1",
            text: "Тут дом.\nМама дома.\nКот тут.\nКот спит.",
            scene: { near: ["🏠", "👩‍👧", "🐱💤"], far: [] },
            question: "Что тут?",
            audio: audio("u1_little_world_full.mp3"),
            options: [option("dom", "дом", "🏠"), option("sok", "сок", "🧃"), option("voda", "вода", "💧")],
            correct: "dom"
          },
          {
            id: "u1-little-world-2",
            text: "Тут дом.\nМама дома.\nКот тут.\nКот спит.",
            scene: { near: ["🏠", "👩‍👧", "🐱💤"], far: [] },
            question: "Кто дома?",
            speechText: "Кто дома?",
            audio: audio("u1_little_world_kto_doma.mp3"),
            options: [option("mama", "мама", "👩‍👧"), option("kot", "кот", "🐱"), option("dom", "дом", "🏠")],
            correct: "mama"
          },
          {
            id: "u1-little-world-3",
            text: "Тут дом.\nМама дома.\nКот тут.\nКот спит.",
            scene: { near: ["🏠", "👩‍👧", "🐱💤"], far: [] },
            question: "Кто тут?",
            speechText: "Кто тут?",
            audio: audio("u1_little_world_kto_tut.mp3"),
            options: [option("kot", "кот", "🐱"), option("mama", "мама", "👩‍👧"), option("dom", "дом", "🏠")],
            correct: "kot"
          },
          {
            id: "u1-little-world-4",
            text: "Тут дом.\nМама дома.\nКот тут.\nКот спит.",
            scene: { near: ["🏠", "👩‍👧", "🐱💤"], far: [] },
            question: "Кто спит?",
            speechText: "Кто спит?",
            audio: audio("u1_little_world_kto_spit.mp3"),
            options: [option("kot", "кот", "🐱"), option("mama", "мама", "👩‍👧")],
            correct: "kot"
          }
        ]
      }
    ]
  };

  root.LexiLandUnit1Enhancements = {
    id: "unit-1-reading-world-games",
    order: 4,
    unitOne: true,
    menuLabel: "Игры чтения",
    title: "Игры чтения",
    level: "Уровень 0",
    coverEmoji: "🔓",
    dictionary: [
      entry("u1e-mama", "мама", "👩‍👧", "word", "mama.mp3"),
      entry("u1e-dom", "дом", "🏠", "word", "dom.mp3"),
      entry("u1e-kot", "кот", "🐱", "word", "kot.mp3"),
      entry("u1e-sok", "сок", "🧃", "word", "sok.mp3"),
      entry("u1e-nos", "нос", "👃", "word", "nos.mp3"),
      entry("u1e-rot", "рот", "👄", "word", "rot.mp3"),
      entry("u1e-voda", "вода", "💧", "word", "voda.mp3"),
      entry("u1e-tut", "тут", "📍", "word", "tut.mp3"),
      entry("u1e-doma", "дома", "🏠📍", "word", "doma.mp3"),
      entry("u1e-spit", "спит", "😴", "word", "spit.mp3")
    ],
    scenes: [],
    units: [
      readingUnit("unit-1-game-open-word", "Игра: Открой слово", "🔓", openWordGame),
      sceneUnit("unit-1-game-who-appeared", "Игра 2: Кто появился?", "🏠", whoAppearedGame),
      readingUnit("unit-1-game-syllable-road", "Игра 3: Слоговая дорожка", "🛤️", syllableRoadGame),
      readingUnit("unit-1-listen-word", "Игра 4: Слушай слово", "🔊", listenWordGame),
      sceneUnit("unit-1-final-little-world", "Игра 5: Маленький мир", "🌍", littleWorldGame)
    ]
  };
}(typeof window !== "undefined" ? window : globalThis));
