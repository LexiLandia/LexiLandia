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

  function line(text, file) {
    return {
      text: text,
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

  function question(id, text, options, correct, visual) {
    return {
      id: id,
      text: text,
      visual: visual || "",
      options: options,
      correct: correct
    };
  }

  function slide(id, title, text, visual, audioItems, questions, reading) {
    var item = {
      id: id,
      title: title,
      text: Array.isArray(text) ? text : [text],
      visual: visual,
      audio: audioItems || []
    };

    if (questions && questions.length) {
      item.questions = questions;
    }

    if (reading) {
      item.reading = true;
      item.wordMeanings = meanings;
    }

    return item;
  }

  function unit(id, title, icon, stageTitle, slides) {
    return {
      id: id,
      title: title,
      icon: icon,
      stages: [
        {
          type: "slides",
          title: stageTitle,
          tasks: slides
        }
      ]
    };
  }

  function m(word, emojiText) {
    return {
      word: word,
      emoji: emojiText,
      translation: ""
    };
  }

  function emoji(emojiText) {
    return {
      type: "emoji",
      emoji: emojiText
    };
  }

  function focus(items) {
    return {
      type: "focus",
      items: items
    };
  }

  function wordList(items) {
    return {
      type: "word-list",
      items: items
    };
  }

  function loc(relation, objectEmoji, anchorEmoji, secondEmoji) {
    return {
      type: "location-scene",
      relation: relation,
      objectEmoji: objectEmoji,
      anchorEmoji: anchorEmoji || "",
      secondEmoji: secondEmoji || ""
    };
  }

  function scene(relation, objectEmoji, anchorEmoji, secondEmoji) {
    if (relation === "here" || relation === "there") {
      return {
        type: "here-there",
        here: relation === "here" ? objectEmoji : (secondEmoji || ""),
        there: relation === "there" ? objectEmoji : (secondEmoji || "")
      };
    }

    return {
      relation: relation,
      objectEmoji: objectEmoji,
      anchorEmoji: anchorEmoji || ""
    };
  }

  function gameOption(id, text, emojiText) {
    return option(id, text, emojiText);
  }

  function quizRound(id, questionText, sceneData, correct, options, file, correctFeedback) {
    return {
      id: id,
      type: "choice",
      title: questionText,
      question: questionText,
      text: questionText,
      audio: audio(file),
      scene: sceneData,
      correct: correct,
      options: options,
      correctFeedback: correctFeedback || "Да! ✅",
      wrongFeedback: "Попробуй ещё раз 🙂"
    };
  }

  function placeTask(id, command, objectText, objectEmoji, target, resultText, zones, file) {
    return {
      id: id,
      type: "place-object",
      title: "Положи предмет",
      command: command,
      text: command,
      audio: audio(file),
      objectId: id + "-object",
      objectText: objectText,
      objectEmoji: objectEmoji,
      target: target,
      zones: zones,
      correctFeedback: "Да! " + resultText,
      wrongFeedback: "Не туда 🙂 Посмотри ещё."
    };
  }

  function roomObject(id, word, emojiText, location) {
    return {
      id: id,
      word: word,
      emoji: emojiText,
      location: location
    };
  }

  function roomScene(id, title, objects, questions) {
    return {
      id: id,
      title: title,
      objects: objects,
      questions: questions
    };
  }

  function roomQuestion(type, id, text, correct, options, file, extra) {
    var item = Object.assign({
      id: id,
      type: type,
      question: text,
      text: text,
      audio: audio(file),
      correct: correct,
      options: options || [],
      correctFeedback: "Да! ✅",
      wrongFeedback: "Смотри ещё 🙂"
    }, extra || {});

    return item;
  }

  var meanings = {
    "где": m("где", "❓"),
    "тут": m("тут", "📍"),
    "там": m("там", "👉"),
    "в": m("в", "📦"),
    "на": m("на", "⬆️"),
    "под": m("под", "⬇️"),
    "рядом": m("рядом", "↔️"),
    "коробка": m("коробка", "📦"),
    "коробке": m("коробке", "📦"),
    "коробку": m("коробку", "📦"),
    "стол": m("стол", "🪑"),
    "столе": m("столе", "🪑"),
    "столом": m("столом", "🪑"),
    "стул": m("стул", "🪑"),
    "стуле": m("стуле", "🪑"),
    "дом": m("дом", "🏠"),
    "доме": m("доме", "🏠"),
    "домом": m("домом", "🏠"),
    "кафе": m("кафе", "🏢☕"),
    "кот": m("кот", "🐱"),
    "собака": m("собака", "🐶"),
    "мяч": m("мяч", "⚽"),
    "книга": m("книга", "📘"),
    "мама": m("мама", "👩"),
    "папа": m("папа", "👨"),
    "да": m("да", "✅"),
    "нет": m("нет", "❌")
  };

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var hereThereOptions = [
    option("tut", "тут", "📍"),
    option("tam", "там", "👉")
  ];

  var locationOptions = [
    option("in-box", "в коробке", "📦"),
    option("on-table", "на столе", "⬆️🪑"),
    option("under-table", "под столом", "⬇️🪑"),
    option("near-house", "рядом с домом", "↔️🏠")
  ];

  var dictionary = [
    entry("u6-gde", "где?", "❓", "word", "gde.mp3"),
    entry("u6-tut", "тут", "📍", "word", "tut.mp3"),
    entry("u6-tam", "там", "👉", "word", "tam.mp3"),
    entry("u6-v", "в", "📦", "word", "v.mp3"),
    entry("u6-na", "на", "⬆️", "word", "na.mp3"),
    entry("u6-pod", "под", "⬇️", "word", "pod.mp3"),
    entry("u6-ryadom", "рядом", "↔️", "word", "ryadom.mp3"),
    entry("u6-korobka", "коробка", "📦", "word", "korobka.mp3"),
    entry("u6-stol", "стол", "🪑", "word", "stol.mp3"),
    entry("u6-stul", "стул", "🪑", "word", "stul.mp3"),
    entry("u6-dom", "дом", "🏠", "word", "dom.mp3"),
    entry("u6-kot", "кот", "🐱", "word", "kot.mp3"),
    entry("u6-sobaka", "собака", "🐶", "word", "sobaka.mp3"),
    entry("u6-myach", "мяч", "⚽", "word", "myach.mp3"),
    entry("u6-kniga", "книга", "📘", "word", "kniga.mp3"),
    entry("u6-mama", "мама", "👩", "word", "mama.mp3"),
    entry("u6-papa", "папа", "👨", "word", "papa.mp3"),
    entry("u6-v-korobke", "в коробке", "📦", "chunk", "v_korobke.mp3"),
    entry("u6-na-stole", "на столе", "⬆️🪑", "chunk", "na_stole.mp3"),
    entry("u6-pod-stolom", "под столом", "⬇️🪑", "chunk", "pod_stolom.mp3"),
    entry("u6-ryadom-s-domom", "рядом с домом", "↔️🏠", "chunk", "ryadom_s_domom.mp3")
  ];

  var lesson16Slides = [
    slide("u6-l16-1", "Где?", ["Где?", "🔍 ❓"], emoji("🔍❓"), [line("Где?", "gde.mp3")], null, true),
    slide("u6-l16-2", "Где кот?", ["Где кот?"], loc("here", "🐱", "", "⚽"), [line("Где кот?", "gde_kot.mp3")], [question("u6-l16-q1", "Где кот?", [option("tut", "Кот тут.", "📍🐱"), option("tam", "Кот там.", "👉🐱")], "tut", "🐱")], true),
    slide("u6-l16-3", "Кот тут.", ["Кот тут."], loc("here", "🐱", "", ""), [line("Кот тут.", "kot_tut.mp3")], null, true),
    slide("u6-l16-4", "Кот там.", ["Кот там."], loc("there", "🐱", "", ""), [line("Кот там.", "kot_tam.mp3")], null, true),
    slide("u6-l16-5", "Где мяч?", ["Где мяч?"], loc("there", "⚽", "", "🐱"), [line("Где мяч?", "gde_myach.mp3")], [question("u6-l16-q2", "Где мяч?", hereThereOptions, "tam", "⚽")], true),
    slide("u6-l16-6", "Мяч тут.", ["Мяч тут."], loc("here", "⚽", "", ""), [line("Мяч тут.", "myach_tut.mp3")], null, true),
    slide("u6-l16-7", "Мяч там.", ["Мяч там."], loc("there", "⚽", "", ""), [line("Мяч там.", "myach_tam.mp3")], null, true),
    slide("u6-l16-8", "Где книга?", ["Где книга?"], loc("here", "📘", "", "🐶"), [line("Где книга?", "gde_kniga.mp3")], [question("u6-l16-q3", "Где книга?", hereThereOptions, "tut", "📘")], true),
    slide("u6-l16-9", "Да или нет", ["Кот тут."], loc("here", "🐱", "", ""), [line("Кот тут.", "kot_tut.mp3")], [question("u6-l16-q4", "Кот тут?", yesNoOptions, "da", "📍🐱")], true),
    slide("u6-l16-10", "Да или нет", ["Мяч тут."], loc("there", "⚽", "", ""), [line("Мяч тут.", "myach_tut.mp3")], [question("u6-l16-q5", "Мяч тут?", yesNoOptions, "net", "👉⚽")], true),
    slide("u6-l16-11", "Читай", ["Кот тут.", "Мяч там.", "Где кот?"], focus(["🐱📍", "⚽👉"]), [line("Кот тут. Мяч там. Где кот?", "u6_l16_text_1.mp3")], [question("u6-l16-q6", "Где кот?", hereThereOptions, "tut", "🐱")], true),
    slide("u6-l16-12", "Отлично!", ["Отлично! ✅", "где?", "тут", "там"], wordList([{ text: "где?", emoji: "❓" }, { text: "тут", emoji: "📍" }, { text: "там", emoji: "👉" }]), [line("Отлично! Где? Тут. Там.", "u6_l16_final.mp3")], null, true)
  ];

  var lesson17Slides = [
    slide("u6-l17-1", "в", ["в", "Мяч в коробке."], loc("in", "⚽", "📦"), [line("в. Мяч в коробке.", "u6_l17_v_myach_v_korobke.mp3")], null, true),
    slide("u6-l17-2", "на", ["на", "Мяч на столе."], loc("on", "⚽", "🪑"), [line("на. Мяч на столе.", "u6_l17_na_myach_na_stole.mp3")], null, true),
    slide("u6-l17-3", "под", ["под", "Мяч под столом."], loc("under", "⚽", "🪑"), [line("под. Мяч под столом.", "u6_l17_pod_myach_pod_stolom.mp3")], null, true),
    slide("u6-l17-4", "Где мяч?", ["Где мяч?"], loc("under", "⚽", "🪑"), [line("Где мяч?", "gde_myach.mp3")], [question("u6-l17-q1", "Где мяч?", locationOptions.slice(0, 3), "under-table", "⚽")], true),
    slide("u6-l17-5", "Где книга?", ["Где книга?"], loc("in", "📘", "📦"), [line("Где книга?", "gde_kniga.mp3")], [question("u6-l17-q2", "Где книга?", locationOptions.slice(0, 3), "in-box", "📘")], true),
    slide("u6-l17-6", "Книга на столе.", ["Книга на столе."], loc("on", "📘", "🪑"), [line("Книга на столе.", "kniga_na_stole.mp3")], null, true),
    slide("u6-l17-7", "Кот под столом.", ["Кот под столом."], loc("under", "🐱", "🪑"), [line("Кот под столом.", "kot_pod_stolom.mp3")], null, true),
    slide("u6-l17-8", "Кот в доме.", ["Кот в доме."], loc("in", "🐱", "🏠"), [line("Кот в доме.", "kot_v_dome.mp3")], null, true),
    slide("u6-l17-9", "Мяч на стуле.", ["Мяч на стуле."], loc("on", "⚽", "🪑"), [line("Мяч на стуле.", "myach_na_stule.mp3")], [question("u6-l17-q3", "Где мяч?", [option("on-chair", "на стуле", "⬆️🪑"), option("under-table", "под столом", "⬇️🪑"), option("in-box", "в коробке", "📦")], "on-chair", "⚽")], true),
    slide("u6-l17-10", "Да или нет", ["Книга в коробке."], loc("on", "📘", "🪑"), [line("Книга в коробке.", "kniga_v_korobke.mp3")], [question("u6-l17-q4", "Книга в коробке?", yesNoOptions, "net", "📘")], true),
    slide("u6-l17-11", "Читай", ["Кот под столом.", "Книга на столе.", "Мяч в коробке."], focus(["🐱⬇️🪑", "📘⬆️🪑", "⚽📦"]), [line("Кот под столом. Книга на столе. Мяч в коробке.", "u6_l17_text_1.mp3")], [question("u6-l17-q5", "Где кот?", locationOptions.slice(0, 3), "under-table", "🐱")], true),
    slide("u6-l17-12", "Отлично!", ["Отлично! ✅", "в", "на", "под"], wordList([{ text: "в", emoji: "📦" }, { text: "на", emoji: "⬆️" }, { text: "под", emoji: "⬇️" }]), [line("Отлично! В. На. Под.", "u6_l17_final.mp3")], null, true)
  ];

  var lesson18Slides = [
    slide("u6-l18-1", "рядом", ["рядом", "Кот рядом."], loc("near", "🐱", "🐶"), [line("рядом. Кот рядом.", "u6_l18_ryadom_kot_ryadom.mp3")], null, true),
    slide("u6-l18-2", "рядом с домом", ["Кот рядом с домом."], loc("near", "🐱", "🏠"), [line("Кот рядом с домом.", "kot_ryadom_s_domom.mp3")], null, true),
    slide("u6-l18-3", "Где кот?", ["Где кот?"], loc("near", "🐱", "🏠"), [line("Где кот?", "gde_kot.mp3")], [question("u6-l18-q1", "Где кот?", [option("near-house", "рядом с домом", "↔️🏠"), option("in-house", "в доме", "🏠"), option("under-table", "под столом", "⬇️🪑")], "near-house", "🐱")], true),
    slide("u6-l18-4", "Это рядом?", ["Это рядом?"], loc("there", "⚽", "", "🏠"), [line("Это рядом?", "eto_ryadom.mp3")], [question("u6-l18-q2", "Это рядом?", yesNoOptions, "net", "⚽ 👉 🏠")], true),
    slide("u6-l18-5", "Собака рядом.", ["Собака рядом."], loc("near", "🐶", "🐱"), [line("Собака рядом.", "sobaka_ryadom.mp3")], null, true),
    slide("u6-l18-6", "Мяч рядом с домом.", ["Мяч рядом с домом."], loc("near", "⚽", "🏠"), [line("Мяч рядом с домом.", "myach_ryadom_s_domom.mp3")], null, true),
    slide("u6-l18-7", "Кот рядом с мамой.", ["Кот рядом с мамой."], loc("near", "🐱", "👩"), [line("Кот рядом с мамой.", "kot_ryadom_s_mamoy.mp3")], null, true),
    slide("u6-l18-8", "Папа рядом с кафе.", ["Папа рядом с кафе."], loc("near", "👨", "🏢☕"), [line("Папа рядом с кафе.", "papa_ryadom_s_kafe.mp3")], null, true),
    slide("u6-l18-9", "Читай", ["Мама в доме.", "Папа рядом с домом.", "Где мама?"], focus(["👩🏠", "👨↔️🏠"]), [line("Мама в доме. Папа рядом с домом. Где мама?", "u6_l18_text_1.mp3")], [question("u6-l18-q3", "Где мама?", [option("in-house", "в доме", "🏠"), option("near-house", "рядом с домом", "↔️🏠"), option("tam", "там", "👉")], "in-house", "👩")], true),
    slide("u6-l18-10", "Читай", ["Кот рядом с собакой.", "Мяч под столом.", "Книга на столе.", "Где мяч?"], focus(["🐱↔️🐶", "⚽⬇️🪑", "📘⬆️🪑"]), [line("Кот рядом с собакой. Мяч под столом. Книга на столе. Где мяч?", "u6_l18_text_2.mp3")], [question("u6-l18-q4", "Где мяч?", locationOptions, "under-table", "⚽")], true),
    slide("u6-l18-11", "Отлично!", ["Отлично! ✅", "рядом", "в", "на", "под"], wordList([{ text: "рядом", emoji: "↔️" }, { text: "в", emoji: "📦" }, { text: "на", emoji: "⬆️" }, { text: "под", emoji: "⬇️" }]), [line("Отлично! Рядом. В. На. Под.", "u6_l18_final.mp3")], null, true)
  ];

  var catPhraseOptions = [
    gameOption("cat-on-table", "Кот на столе.", "⬆️🪑"),
    gameOption("cat-under-table", "Кот под столом.", "⬇️🪑"),
    gameOption("cat-in-box", "Кот в коробке.", "📦"),
    gameOption("cat-near", "Кот рядом.", "↔️")
  ];

  var catQuizGame = {
    id: "unit-6-game-gde-kot",
    gameSlug: "unit-6-game-gde-kot",
    kind: "cat-quiz",
    icon: "🐱",
    title: "Где кот?",
    finalTitle: "Отлично! Где кот? ✅",
    finalText: "Кот тут. Кот там. Кот рядом.",
    finalWords: ["Кот на столе.", "Кот под столом.", "Кот в коробке.", "Кот рядом."],
    rounds: [
      quizRound("u6-cat-1", "Где кот?", scene("on", "🐱", "🪑"), "cat-on-table", catPhraseOptions.slice(0, 3), "u6_cat_on_table.mp3", "Да! Кот на столе. 🐱"),
      quizRound("u6-cat-2", "Где кот?", scene("under", "🐱", "🪑"), "cat-under-table", catPhraseOptions.slice(0, 3), "u6_cat_under_table.mp3", "Да! Кот под столом. 🐱"),
      quizRound("u6-cat-3", "Где кот?", scene("in", "🐱", "📦"), "cat-in-box", catPhraseOptions.slice(0, 3), "u6_cat_in_box.mp3", "Да! Кот в коробке. 🐱"),
      quizRound("u6-cat-4", "Где кот?", scene("near", "🐱", "🏠"), "cat-near", [catPhraseOptions[3], catPhraseOptions[0], catPhraseOptions[1]], "u6_cat_near_house.mp3", "Да! Кот рядом. 🐱"),
      quizRound("u6-cat-5", "Где кот?", scene("in", "🐱", "🏠"), "cat-in-house", [gameOption("cat-in-house", "Кот в доме.", "🏠"), catPhraseOptions[1], catPhraseOptions[3]], "u6_cat_in_house.mp3", "Да! Кот в доме. 🐱"),
      quizRound("u6-cat-6", "Где кот?", scene("near", "🐱", "🐶"), "cat-near-dog", [gameOption("cat-near-dog", "Кот рядом с собакой.", "🐶"), catPhraseOptions[2], catPhraseOptions[0]], "u6_cat_near_dog.mp3", "Да! Кот рядом с собакой. 🐱"),
      quizRound("u6-cat-7", "Где кот?", scene("on", "🐱", "🪑"), "cat-on-chair", [gameOption("cat-on-chair", "Кот на стуле.", "🪑"), catPhraseOptions[1], catPhraseOptions[2]], "u6_cat_on_chair.mp3", "Да! Кот на стуле. 🐱"),
      quizRound("u6-cat-8", "Где кот?", scene("under", "🐱", "🪑"), "cat-under-chair", [gameOption("cat-under-chair", "Кот под стулом.", "🪑"), catPhraseOptions[0], catPhraseOptions[2]], "u6_cat_under_chair.mp3", "Да! Кот под стулом. 🐱"),
      quizRound("u6-cat-9", "Где кот?", scene("near", "🐱", "🪑"), "cat-near-table", [gameOption("cat-near-table", "Кот рядом со столом.", "↔️🪑"), catPhraseOptions[0], catPhraseOptions[1]], "u6_cat_near_table.mp3", "Да! Кот рядом. 🐱"),
      quizRound("u6-cat-10", "Где кот?", scene("there", "🐱", "", "⚽"), "cat-tam", [gameOption("cat-tam", "Кот там.", "👉"), gameOption("cat-tut", "Кот тут.", "📍"), catPhraseOptions[3]], "u6_cat_tam.mp3", "Да! Кот там. 🐱")
    ]
  };

  var placementGame = {
    id: "unit-6-game-polozhi-predmet",
    gameSlug: "unit-6-game-polozhi-predmet",
    kind: "place-object",
    icon: "📦",
    title: "Положи предмет",
    finalTitle: "Отлично! Предмет на месте! ✅",
    finalText: "в, на, под, рядом",
    finalWords: ["Мяч на столе.", "Книга в коробке.", "Кот под столом.", "Собака рядом."],
    tasks: [
      placeTask("u6-place-1", "Мяч — на стол.", "мяч", "⚽", "on_table", "Мяч на столе.", ["on_table", "in_box", "under_table", "near_house"], "u6_place_myach_na_stol.mp3"),
      placeTask("u6-place-2", "Книга — в коробку.", "книга", "📘", "in_box", "Книга в коробке.", ["in_box", "on_table", "under_table", "near_house"], "u6_place_kniga_v_korobku.mp3"),
      placeTask("u6-place-3", "Кот — под стол.", "кот", "🐱", "under_table", "Кот под столом.", ["under_table", "on_table", "in_box", "near_house"], "u6_place_kot_pod_stol.mp3"),
      placeTask("u6-place-4", "Мяч — рядом с домом.", "мяч", "⚽", "near_house", "Мяч рядом с домом.", ["near_house", "on_table", "in_box", "under_table"], "u6_place_myach_ryadom_s_domom.mp3"),
      placeTask("u6-place-5", "Книга — на стол.", "книга", "📘", "on_table", "Книга на столе.", ["on_table", "in_box", "under_table", "near_house"], "u6_place_kniga_na_stol.mp3"),
      placeTask("u6-place-6", "Мяч — в коробку.", "мяч", "⚽", "in_box", "Мяч в коробке.", ["in_box", "on_table", "under_table", "near_house"], "u6_place_myach_v_korobku.mp3"),
      placeTask("u6-place-7", "Кот — рядом с домом.", "кот", "🐱", "near_house", "Кот рядом с домом.", ["near_house", "in_box", "on_table", "under_table"], "u6_place_kot_ryadom_s_domom.mp3"),
      placeTask("u6-place-8", "Книга — под стол.", "книга", "📘", "under_table", "Книга под столом.", ["under_table", "on_table", "in_box", "near_house"], "u6_place_kniga_pod_stol.mp3"),
      placeTask("u6-place-9", "Собака — рядом с домом.", "собака", "🐶", "near_house", "Собака рядом с домом.", ["near_house", "in_box", "on_table", "under_table"], "u6_place_sobaka_ryadom_s_domom.mp3"),
      placeTask("u6-place-10", "Мяч — на стул.", "мяч", "⚽", "on_chair", "Мяч на стуле.", ["on_chair", "in_box", "under_table", "near_house"], "u6_place_myach_na_stul.mp3"),
      placeTask("u6-place-11", "Кот — в дом.", "кот", "🐱", "in_house", "Кот в доме.", ["in_house", "near_house", "on_table", "under_table"], "u6_place_kot_v_dom.mp3"),
      placeTask("u6-place-12", "Книга — на стул.", "книга", "📘", "on_chair", "Книга на стуле.", ["on_chair", "in_box", "under_table", "near_house"], "u6_place_kniga_na_stul.mp3")
    ]
  };

  var roomGame = {
    id: "unit-6-game-komnata",
    gameSlug: "unit-6-game-komnata",
    kind: "room",
    icon: "🏠",
    title: "Комната",
    finalTitle: "Супер! Комната понятна! 🏆",
    finalText: "Где? В. На. Под. Рядом.",
    finalWords: ["мяч", "книга", "кот", "собака", "стол", "коробка"],
    scenes: [
      roomScene("u6-room-easy", "Комната 1", [
        roomObject("ball", "мяч", "⚽", "under_table"),
        roomObject("book", "книга", "📘", "on_table"),
        roomObject("cat", "кот", "🐱", "in_box"),
        roomObject("dog", "собака", "🐶", "near_house")
      ], [
        roomQuestion("choice", "u6-room-1-q1", "Где мяч?", "under_table", [gameOption("on_table", "на столе", "⬆️🪑"), gameOption("under_table", "под столом", "⬇️🪑"), gameOption("in_box", "в коробке", "📦")], "u6_room_gde_myach.mp3"),
        roomQuestion("choice", "u6-room-1-q2", "Книга на столе.", "da", yesNoOptions, "u6_room_kniga_na_stole.mp3"),
        roomQuestion("room-find", "u6-room-1-q3", "Найди книгу.", "book", [], "u6_room_naydi_knigu.mp3"),
        roomQuestion("room-put", "u6-room-1-q4", "Мяч — в коробку.", "in_box", [], "u6_room_myach_v_korobku.mp3", { objectId: "ball", objectText: "мяч", objectEmoji: "⚽", target: "in_box", zones: ["in_box", "on_table", "under_table", "near_house"], correctFeedback: "Да! Мяч в коробке." })
      ]),
      roomScene("u6-room-cat-dog", "Комната 2", [
        roomObject("cat", "кот", "🐱", "under_table"),
        roomObject("dog", "собака", "🐶", "near_house"),
        roomObject("ball", "мяч", "⚽", "on_chair"),
        roomObject("book", "книга", "📘", "in_box")
      ], [
        roomQuestion("choice", "u6-room-2-q1", "Где кот?", "under_table", [gameOption("under_table", "под столом", "⬇️🪑"), gameOption("in_box", "в коробке", "📦"), gameOption("near_house", "рядом с домом", "↔️🏠")], "u6_room_gde_kot.mp3"),
        roomQuestion("choice", "u6-room-2-q2", "Собака рядом с домом.", "da", yesNoOptions, "u6_room_sobaka_ryadom_s_domom.mp3"),
        roomQuestion("room-find", "u6-room-2-q3", "Найди собаку.", "dog", [], "u6_room_naydi_sobaku.mp3"),
        roomQuestion("room-put", "u6-room-2-q4", "Книга — на стол.", "on_table", [], "u6_room_kniga_na_stol.mp3", { objectId: "book", objectText: "книга", objectEmoji: "📘", target: "on_table", zones: ["on_table", "in_box", "under_table", "near_house"], correctFeedback: "Да! Книга на столе." })
      ]),
      roomScene("u6-room-house", "Комната 3", [
        roomObject("mama", "мама", "👩", "in_house"),
        roomObject("papa", "папа", "👨", "near_house"),
        roomObject("cat", "кот", "🐱", "on_table"),
        roomObject("ball", "мяч", "⚽", "under_table")
      ], [
        roomQuestion("choice", "u6-room-3-q1", "Где мама?", "in_house", [gameOption("in_house", "в доме", "🏠"), gameOption("near_house", "рядом с домом", "↔️🏠"), gameOption("under_table", "под столом", "⬇️🪑")], "u6_room_gde_mama.mp3"),
        roomQuestion("choice", "u6-room-3-q2", "Папа в доме.", "net", yesNoOptions, "u6_room_papa_v_dome.mp3"),
        roomQuestion("room-find", "u6-room-3-q3", "Найди мяч.", "ball", [], "u6_room_naydi_myach.mp3"),
        roomQuestion("room-put", "u6-room-3-q4", "Кот — в коробку.", "in_box", [], "u6_room_kot_v_korobku.mp3", { objectId: "cat", objectText: "кот", objectEmoji: "🐱", target: "in_box", zones: ["in_box", "on_table", "under_table", "near_house"], correctFeedback: "Да! Кот в коробке." })
      ])
    ]
  };

  root.LexiLandUnit6Lesson = {
    id: "level-0-unit-6-location-room",
    order: 8,
    menuLabel: "Юнит 6",
    title: "Юнит 6: Где? В, на, под, рядом",
    subtitle: "Места: в коробке, на столе, под столом, рядом",
    level: "Уровень 0",
    coverEmoji: "📍",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-16-gde", "Урок 16: Где?", "❓", "Урок 16: Где?", lesson16Slides),
      unit("lesson-17-v-na-pod", "Урок 17: В, на, под", "📦", "Урок 17: В, на, под", lesson17Slides),
      unit("lesson-18-ryadom", "Урок 18: Рядом. Тут или там?", "↔️", "Урок 18: Рядом. Тут или там?", lesson18Slides),
      {
        id: "unit-6-game-gde-kot",
        title: "Игра: Где кот?",
        icon: "🐱",
        stages: [
          {
            type: "unit-6-location-game",
            title: "Игра: Где кот?",
            tasks: [catQuizGame]
          }
        ]
      },
      {
        id: "unit-6-game-polozhi-predmet",
        title: "Игра 2: Положи предмет",
        icon: "📦",
        stages: [
          {
            type: "unit-6-location-game",
            title: "Игра 2: Положи предмет",
            tasks: [placementGame]
          }
        ]
      },
      {
        id: "unit-6-game-komnata",
        title: "Игра 3: Комната",
        icon: "🏠",
        stages: [
          {
            type: "unit-6-location-game",
            title: "Игра 3: Комната",
            tasks: [roomGame]
          }
        ]
      }
    ]
  };

  root.LexiLandUnit6 = root.LexiLandUnit6Lesson;
}(typeof window !== "undefined" ? window : globalThis));
