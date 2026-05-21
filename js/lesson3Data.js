(function (root) {
  "use strict";

  var audioRoot = "assets/audio/ru/";
  var imageRoot = "assets/img/lesson3/";
  var READING_RATE = "-22%";
  var PHONICS_RATE = "-50%";

  function audio(file) {
    return audioRoot + file;
  }

  function image(file) {
    return imageRoot + file;
  }

  function line(text, file, rate) {
    return {
      text: text,
      audio: audio(file),
      rate: rate || READING_RATE
    };
  }

  function phonicsLine(text, file) {
    return line(text, file, PHONICS_RATE);
  }

  function entry(id, word, translation, emoji, type, file, imageFile) {
    return {
      id: id,
      text: word,
      word: word,
      translation: translation,
      emoji: emoji,
      type: type || "word",
      audio: audio(file || id + ".mp3"),
      image: imageFile ? image(imageFile) : ""
    };
  }

  function option(id, text, emoji) {
    return {
      id: id,
      text: text,
      emoji: emoji
    };
  }

  function readingQuestion(id, text, options, correct, correctFeedback) {
    return {
      id: id,
      text: text,
      options: options,
      correct: correct,
      mode: "reading-check",
      correctFeedback: correctFeedback,
      wrongFeedback: "Смотри ещё 👀"
    };
  }

  function card(item) {
    return {
      text: item.text,
      emoji: item.emoji,
      image: item.image
    };
  }

  function imageCards(items) {
    return {
      type: "image-cards",
      items: items.map(card)
    };
  }

  function focus(items) {
    return {
      type: "image-cards",
      items: items.map(card)
    };
  }

  function slide(id, title, text, visual, audioItems, questions) {
    var task = {
      id: id,
      title: title,
      text: text,
      visual: visual,
      audio: audioItems || [],
      reading: true,
      wordMeanings: wordMeanings
    };

    if (questions && questions.length) {
      task.questions = questions;
    }

    return task;
  }

  var dictionary = [
    entry("l3-ma", "ма", "", "👄", "syllable", "ma.mp3", "mouth.svg"),
    entry("l3-mo", "мо", "", "👄", "syllable", "mo.mp3", "mouth.svg"),
    entry("l3-am", "ам", "", "🍽️", "syllable", "am.mp3", "plate.svg"),
    entry("l3-om", "ом", "", "🕉️", "syllable", "om.mp3", "om.svg"),
    entry("l3-mama", "мама", "", "👩", "word", "mama.mp3", "mama.svg"),
    entry("l3-dom", "дом", "", "🏠", "word", "dom.mp3", "house.svg"),
    entry("l3-doma", "дома", "", "🏠", "word", "doma.mp3", "home.svg"),
    entry("l3-tam", "там", "", "👉", "word", "tam.mp3", "there.svg"),
    entry("l3-on", "он", "", "👦", "word", "on.mp3", "boy.svg"),
    entry("l3-ona", "она", "", "👧", "word", "ona.mp3", "girl.svg")
  ];

  var byWord = {};
  dictionary.forEach(function (item) {
    byWord[item.text] = item;
  });

  var wordMeanings = {};
  Object.keys(byWord).forEach(function (word) {
    var item = byWord[word];
    wordMeanings[word] = {
      word: item.text,
      emoji: item.emoji,
      translation: item.translation,
      image: item.image
    };
  });

  var slides = [
    slide(
      "l3-slide-1",
      "Ты читаешь!",
      [
        "ма мо ам ом",
        "мама дом там он она",
        "👆 👀 🔁"
      ],
      imageCards([byWord["мама"], byWord["дом"], byWord["там"], byWord["он"], byWord["она"]]),
      [line("мама дом там он она", "l3_intro_words.mp3")]
    ),
    slide(
      "l3-slide-2",
      "Медленно",
      ["ма ма ма", "м + а = ма"],
      focus([byWord["ма"], byWord["мама"]]),
      [phonicsLine("ма ма ма", "l3_ma_warmup.mp3")]
    ),
    slide(
      "l3-slide-3",
      "Ещё звук",
      ["мо мо мо", "м + о = мо"],
      focus([byWord["мо"]]),
      [phonicsLine("мо мо мо", "l3_mo_warmup.mp3")]
    ),
    slide(
      "l3-slide-4",
      "Слоги",
      ["ма", "мо", "ам", "ом"],
      imageCards([byWord["ма"], byWord["мо"], byWord["ам"], byWord["ом"]]),
      [phonicsLine("ма мо ам ом", "l3_syllables.mp3")]
    ),
    slide(
      "l3-slide-5",
      "Первое слово",
      ["мама", "ма + ма = мама"],
      focus([byWord["мама"]]),
      [phonicsLine("ма ма мама", "l3_mama_first.mp3")]
    ),
    slide(
      "l3-slide-6",
      "Читай",
      ["мама", "мама", "мама", "👩 👩 👩"],
      imageCards([byWord["мама"], byWord["мама"], byWord["мама"]]),
      [line("мама мама мама", "l3_mama_repeat.mp3")]
    ),
    slide(
      "l3-slide-7",
      "Маленькое слово",
      ["дом", "д + о + м = дом"],
      focus([byWord["дом"]]),
      [line("дом", "l3_dom_first.mp3")]
    ),
    slide(
      "l3-slide-8",
      "Два слова",
      ["мама", "дом"],
      imageCards([byWord["мама"], byWord["дом"]]),
      [line("мама дом", "l3_mama_dom.mp3")]
    ),
    slide(
      "l3-slide-9",
      "Смотри и читай",
      ["там", "👉"],
      focus([byWord["там"]]),
      [line("там", "l3_tam_first.mp3")]
    ),
    slide(
      "l3-slide-10",
      "Мини-чтение",
      ["мама там."],
      imageCards([byWord["мама"], byWord["там"]]),
      [line("мама там", "l3_mama_tam.mp3")],
      [
        readingQuestion("l3-q10", "Кто там?", [
          option("mama", "мама", "👩"),
          option("dom", "дом", "🏠")
        ], "mama", "Да: мама 👩")
      ]
    ),
    slide(
      "l3-slide-11",
      "Маленькое слово",
      ["он"],
      focus([byWord["он"]]),
      [line("он", "l3_on.mp3")]
    ),
    slide(
      "l3-slide-12",
      "Ещё слово",
      ["она"],
      focus([byWord["она"]]),
      [line("она", "l3_ona.mp3")]
    ),
    slide(
      "l3-slide-13",
      "Смотри и читай",
      ["он 👦", "она 👧", "👀"],
      imageCards([byWord["он"], byWord["она"]]),
      [line("он она", "l3_on_ona.mp3")]
    ),
    slide(
      "l3-slide-14",
      "Мини-чтение",
      ["она там."],
      imageCards([byWord["она"], byWord["там"]]),
      [line("она там", "l3_ona_tam.mp3")],
      [
        readingQuestion("l3-q14", "Кто там?", [
          option("ona", "она", "👧"),
          option("on", "он", "👦")
        ], "ona", "Да: она там. 👧👉")
      ]
    ),
    slide(
      "l3-slide-15",
      "Читай",
      ["он дома."],
      imageCards([byWord["он"], byWord["дома"]]),
      [line("он дома", "l3_on_doma.mp3")],
      [
        readingQuestion("l3-q15", "Где он?", [
          option("doma", "дома", "🏠"),
          option("tam", "там", "👉")
        ], "doma", "Да: дома 🏠")
      ]
    ),
    slide(
      "l3-slide-16",
      "дом → дома",
      ["дом 🏠", "дома 🏠", "🏠", "🏠👦"],
      imageCards([byWord["дом"], byWord["дома"]]),
      [line("дом дома", "l3_dom_doma.mp3")]
    ),
    slide(
      "l3-slide-17",
      "Маленькая история",
      ["мама дома.", "она там."],
      imageCards([byWord["мама"], byWord["дома"], byWord["она"], byWord["там"]]),
      [line("мама дома. она там", "l3_story_1.mp3")],
      [
        readingQuestion("l3-q17-1", "Кто дома?", [
          option("mama", "мама", "👩"),
          option("ona", "она", "👧")
        ], "mama", "Да: мама 👩"),
        readingQuestion("l3-q17-2", "Кто там?", [
          option("ona", "она", "👧"),
          option("mama", "мама", "👩")
        ], "ona", "Да: она 👧")
      ]
    ),
    slide(
      "l3-slide-18",
      "Ты читаешь!",
      [
        "мама",
        "дом",
        "дома",
        "там",
        "он",
        "она",
        "👆 👀 🔁",
        "Отлично! ✅"
      ],
      imageCards([byWord["мама"], byWord["дом"], byWord["дома"], byWord["там"], byWord["он"], byWord["она"]]),
      [line("мама дом дома там он она", "l3_final_words.mp3")]
    )
  ];

  root.LexiLandLesson3 = {
    id: "lesson-3-mama-dom-tam",
    order: 3,
    title: "Урок 3: мама, дом, там",
    level: "Уровень 0",
    dictionary: dictionary,
    scenes: [],
    units: [
      {
        id: "unit-lesson-3-reading",
        title: "Чтение 1",
        icon: "📖",
        stages: [
          {
            type: "slides",
            title: "ма, мо, мама",
            tasks: slides
          }
        ]
      }
    ]
  };
}(typeof window !== "undefined" ? window : globalThis));
