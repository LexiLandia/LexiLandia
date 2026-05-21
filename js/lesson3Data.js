(function (root) {
  "use strict";

  var audioRoot = "assets/audio/ru/";
  var imageRoot = "assets/img/lesson3/";

  function audio(file) {
    return audioRoot + file;
  }

  function image(file) {
    return imageRoot + file;
  }

  function line(text, file) {
    return {
      text: text,
      audio: audio(file)
    };
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
      wrongFeedback: "Look again 👀"
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
    entry("l3-ma", "ма", "ma sound", "👄", "syllable", "ma.mp3", "mouth.svg"),
    entry("l3-mo", "мо", "mo sound", "👄", "syllable", "mo.mp3", "mouth.svg"),
    entry("l3-am", "ам", "am sound", "🍽️", "syllable", "am.mp3", "plate.svg"),
    entry("l3-om", "ом", "om sound", "🕉️", "syllable", "om.mp3", "om.svg"),
    entry("l3-mama", "мама", "mom / mother", "👩", "word", "mama.mp3", "mama.svg"),
    entry("l3-dom", "дом", "house / home", "🏠", "word", "dom.mp3", "house.svg"),
    entry("l3-doma", "дома", "at home", "🏠", "word", "doma.mp3", "home.svg"),
    entry("l3-tam", "там", "there", "👉", "word", "tam.mp3", "there.svg"),
    entry("l3-on", "он", "he", "👦", "word", "on.mp3", "boy.svg"),
    entry("l3-ona", "она", "she", "👧", "word", "ona.mp3", "girl.svg")
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
      "Today you read real words!",
      [
        "Today we read small Russian words.",
        "мама дом там он она",
        "Click the words. Look at emoji. Read again."
      ],
      imageCards([byWord["мама"], byWord["дом"], byWord["там"], byWord["он"], byWord["она"]]),
      [line("мама дом там он она", "l3_intro_words.mp3")]
    ),
    slide(
      "l3-slide-2",
      "Read slowly",
      ["ма ма ма", "м + а = ма"],
      focus([byWord["ма"], byWord["мама"]]),
      [line("ма ма ма", "l3_ma_warmup.mp3")]
    ),
    slide(
      "l3-slide-3",
      "Another sound",
      ["мо мо мо", "м + о = мо"],
      focus([byWord["мо"]]),
      [line("мо мо мо", "l3_mo_warmup.mp3")]
    ),
    slide(
      "l3-slide-4",
      "Read the syllables",
      ["ма", "мо", "ам", "ом"],
      imageCards([byWord["ма"], byWord["мо"], byWord["ам"], byWord["ом"]]),
      [line("ма мо ам ом", "l3_syllables.mp3")]
    ),
    slide(
      "l3-slide-5",
      "First real word",
      ["мама", "ма + ма = мама"],
      focus([byWord["мама"]]),
      [line("ма ма мама", "l3_mama_first.mp3")]
    ),
    slide(
      "l3-slide-6",
      "Read",
      ["мама", "мама", "мама", "Same word. Read with confidence."],
      imageCards([byWord["мама"], byWord["мама"], byWord["мама"]]),
      [line("мама мама мама", "l3_mama_repeat.mp3")]
    ),
    slide(
      "l3-slide-7",
      "A small word",
      ["дом", "д + о + м = дом"],
      focus([byWord["дом"]]),
      [line("дом", "l3_dom_first.mp3")]
    ),
    slide(
      "l3-slide-8",
      "Read two words",
      ["мама", "дом"],
      imageCards([byWord["мама"], byWord["дом"]]),
      [line("мама дом", "l3_mama_dom.mp3")]
    ),
    slide(
      "l3-slide-9",
      "Point and read",
      ["там", "там = there"],
      focus([byWord["там"]]),
      [line("там", "l3_tam_first.mp3")]
    ),
    slide(
      "l3-slide-10",
      "Mini reading",
      ["мама там."],
      imageCards([byWord["мама"], byWord["там"]]),
      [line("мама там", "l3_mama_tam.mp3")],
      [
        readingQuestion("l3-q10", "Who is there?", [
          option("mama", "мама", "👩"),
          option("dom", "дом", "🏠")
        ], "mama", "Yes: мама 👩")
      ]
    ),
    slide(
      "l3-slide-11",
      "Read a tiny word",
      ["он"],
      focus([byWord["он"]]),
      [line("он", "l3_on.mp3")]
    ),
    slide(
      "l3-slide-12",
      "Read another tiny word",
      ["она"],
      focus([byWord["она"]]),
      [line("она", "l3_ona.mp3")]
    ),
    slide(
      "l3-slide-13",
      "Look and read",
      ["он 👦", "она 👧", "One small letter changes the word."],
      imageCards([byWord["он"], byWord["она"]]),
      [line("он она", "l3_on_ona.mp3")]
    ),
    slide(
      "l3-slide-14",
      "Mini reading",
      ["она там."],
      imageCards([byWord["она"], byWord["там"]]),
      [line("она там", "l3_ona_tam.mp3")],
      [
        readingQuestion("l3-q14", "Who is there?", [
          option("ona", "она", "👧"),
          option("on", "он", "👦")
        ], "ona", "Yes: она там. 👧👉")
      ]
    ),
    slide(
      "l3-slide-15",
      "Read",
      ["он дома."],
      imageCards([byWord["он"], byWord["дома"]]),
      [line("он дома", "l3_on_doma.mp3")],
      [
        readingQuestion("l3-q15", "Where is he?", [
          option("doma", "дома", "🏠"),
          option("tam", "там", "👉")
        ], "doma", "Yes: дома 🏠")
      ]
    ),
    slide(
      "l3-slide-16",
      "дом → дома",
      ["дом 🏠", "дома 🏠", "дом = house", "дома = at home"],
      imageCards([byWord["дом"], byWord["дома"]]),
      [line("дом дома", "l3_dom_doma.mp3")]
    ),
    slide(
      "l3-slide-17",
      "Read a tiny story",
      ["мама дома.", "она там."],
      imageCards([byWord["мама"], byWord["дома"], byWord["она"], byWord["там"]]),
      [line("мама дома. она там", "l3_story_1.mp3")],
      [
        readingQuestion("l3-q17-1", "Who is at home?", [
          option("mama", "мама", "👩"),
          option("ona", "она", "👧")
        ], "mama", "Yes: мама 👩"),
        readingQuestion("l3-q17-2", "Who is there?", [
          option("ona", "она", "👧"),
          option("mama", "мама", "👩")
        ], "ona", "Yes: она 👧")
      ]
    ),
    slide(
      "l3-slide-18",
      "You can read!",
      [
        "мама",
        "дом",
        "дома",
        "там",
        "он",
        "она",
        "Read again. Click any word.",
        "Great! You read real Russian words."
      ],
      imageCards([byWord["мама"], byWord["дом"], byWord["дома"], byWord["там"], byWord["он"], byWord["она"]]),
      [line("мама дом дома там он она", "l3_final_words.mp3")]
    )
  ];

  root.LexiLandLesson3 = {
    id: "lesson-3-mama-dom-tam",
    order: 3,
    title: "Lesson 3: мама, дом, там",
    level: "Level 0",
    dictionary: dictionary,
    scenes: [],
    units: [
      {
        id: "unit-lesson-3-reading",
        title: "Unit 1 — First Russian Reading",
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
