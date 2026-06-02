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

  function gameUnit(id, title, icon, game) {
    return {
      id: id,
      title: title,
      icon: icon,
      stages: [
        {
          type: "unit-8-count-game",
          title: title,
          tasks: [game]
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

  function group(id, text, emoji, count, item, x, y) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      count: count || 1,
      item: item || "body",
      x: x,
      y: y
    };
  }

  function choiceTask(id, questionText, visual, audioFile, options, correct, successText, errorText) {
    return {
      id: id,
      question: questionText,
      text: questionText,
      visual: visual,
      audio: audio(audioFile),
      options: options,
      correct: correct,
      correctFeedback: successText,
      wrongFeedback: errorText || "Нет. Смотри ещё."
    };
  }

  function commandTask(id, command, audioFile, items, correct, successText, errorText) {
    return {
      id: id,
      command: command,
      text: command,
      audio: audio(audioFile),
      items: items,
      correct: correct,
      correctFeedback: successText,
      wrongFeedback: errorText || "Нет. Смотри ещё."
    };
  }

  var meanings = {
    "тело": m("тело", "🧍"),
    "голова": m("голова", "🙂"),
    "рука": m("рука", "✋"),
    "нога": m("нога", "🦶"),
    "глаз": m("глаз", "👁️"),
    "ухо": m("ухо", "👂"),
    "рот": m("рот", "👄"),
    "нос": m("нос", "👃"),
    "живот": m("живот", "🤰"),
    "болит": m("болит", "🤕"),
    "мне": m("мне", "🙂"),
    "хорошо": m("хорошо", "🙂"),
    "плохо": m("плохо", "🙁"),
    "устал": m("устал", "😴"),
    "сядь": m("сядь", "🪑"),
    "покажи": m("покажи", "👉"),
    "вода": m("вода", "💧"),
    "домой": m("домой", "🏠"),
    "дома": m("дома", "🏠"),
    "школе": m("школе", "🏫"),
    "утро": m("утро", "🌅"),
    "день": m("день", "☀️"),
    "вечер": m("вечер", "🌙"),
    "кот": m("кот", "🐱"),
    "чай": m("чай", "🍵")
  };

  var dictionary = [
    entry("u13-telo", "тело", "🧍", "word", "telo.mp3"),
    entry("u13-golova", "голова", "🙂", "word", "golova.mp3"),
    entry("u13-ruka", "рука", "✋", "word", "ruka.mp3"),
    entry("u13-noga", "нога", "🦶", "word", "noga.mp3"),
    entry("u13-glaz", "глаз", "👁️", "word", "glaz.mp3"),
    entry("u13-uho", "ухо", "👂", "word", "uho.mp3"),
    entry("u13-rot", "рот", "👄", "word", "rot.mp3"),
    entry("u13-nos", "нос", "👃", "word", "nos.mp3"),
    entry("u13-zhivot", "живот", "🤰", "word", "zhivot.mp3"),
    entry("u13-bolit", "болит", "🤕", "word", "bolit.mp3"),
    entry("u13-golova-bolit", "голова болит", "🤕🙂", "chunk", "golova_bolit.mp3"),
    entry("u13-ruka-bolit", "рука болит", "🤕✋", "chunk", "ruka_bolit.mp3"),
    entry("u13-noga-bolit", "нога болит", "🤕🦶", "chunk", "noga_bolit.mp3"),
    entry("u13-zhivot-bolit", "живот болит", "🤕", "chunk", "zhivot_bolit.mp3"),
    entry("u13-u-menya-bolit-golova", "у меня болит голова", "🤕🙂", "chunk", "u_menya_bolit_golova.mp3"),
    entry("u13-u-menya-bolit-zhivot", "у меня болит живот", "🤕", "chunk", "u_menya_bolit_zhivot.mp3"),
    entry("u13-mne-horosho", "мне хорошо", "🙂", "chunk", "mne_horosho.mp3"),
    entry("u13-mne-ploho", "мне плохо", "🙁", "chunk", "mne_ploho.mp3"),
    entry("u13-ya-ustal", "я устал", "😴", "chunk", "ya_ustal.mp3"),
    entry("u13-ya-hochu-vodu", "я хочу воду", "🙂🙏💧", "chunk", "ya_hochu_vodu.mp3"),
    entry("u13-ya-hochu-domoy", "я хочу домой", "🙂🙏🏠", "chunk", "ya_hochu_domoy.mp3"),
    entry("u13-syad", "сядь", "🪑", "word", "syad.mp3"),
    entry("u13-pokazhi", "покажи", "👉", "word", "pokazhi.mp3"),
    entry("u13-igray", "играй", "⚽", "word", "igray.mp3"),
    entry("u13-chto-bolit", "что болит", "❓🤕", "chunk", "chto_bolit.mp3"),
    entry("u13-pokazhi-golovu", "покажи голову", "👉🙂", "chunk", "pokazhi_golovu.mp3"),
    entry("u13-pokazhi-ruku", "покажи руку", "👉✋", "chunk", "pokazhi_ruku.mp3"),
    entry("u13-pokazhi-nogu", "покажи ногу", "👉🦶", "chunk", "pokazhi_nogu.mp3"),
    entry("u13-pokazhi-nos", "покажи нос", "👉👃", "chunk", "pokazhi_nos.mp3")
  ];

  var yesNoOptions = [
    option("net", "нет", "❌"),
    option("da", "да", "✅")
  ];

  var bodyOptions = [
    option("ruka", "рука", "✋"),
    option("golova", "голова", "🙂"),
    option("noga", "нога", "🦶"),
    option("glaz", "глаз", "👁️"),
    option("uho", "ухо", "👂"),
    option("rot", "рот", "👄"),
    option("nos", "нос", "👃"),
    option("zhivot", "живот", "🤰")
  ];

  var painOptions = [
    option("zhivot", "живот", "🤰"),
    option("golova", "голова", "🙂"),
    option("ruka", "рука", "✋"),
    option("noga", "нога", "🦶")
  ];

  var feelOptions = [
    option("bad", "мне плохо", "🙁"),
    option("good", "мне хорошо", "🙂")
  ];

  var helpOptions = [
    option("home", "иди домой", "🏠"),
    option("water", "вода", "💧"),
    option("sit", "сядь", "🪑"),
    option("jacket", "надень куртку", "🧥"),
    option("play", "играй", "⚽")
  ];

  var placeOptions = [
    option("school", "в школе", "🏫"),
    option("home", "дома", "🏠"),
    option("park", "в парке", "🌳")
  ];

  var bodyItems = [
    group("golova", "голова", "🙂", 1, "body"),
    group("ruka", "рука", "✋", 1, "body"),
    group("noga", "нога", "🦶", 1, "body"),
    group("glaz", "глаз", "👁️", 1, "body"),
    group("uho", "ухо", "👂", 1, "body"),
    group("rot", "рот", "👄", 1, "body"),
    group("nos", "нос", "👃", 1, "body"),
    group("zhivot", "живот", "🤰", 1, "body")
  ];

  var lesson37Slides = [
    slide("u13-l37-1", "Тело", ["Тело."], focus(["🧍", "🙂", "✋", "🦶"]), [line("Тело.", "telo.mp3")], null, true),
    slide("u13-l37-2", "Голова", ["Голова."], focus(["🙂"]), [line("Голова.", "golova.mp3")], null, true),
    slide("u13-l37-3", "Рука", ["Рука."], focus(["✋"]), [line("Рука.", "ruka.mp3")], null, true),
    slide("u13-l37-4", "Нога", ["Нога."], focus(["🦶"]), [line("Нога.", "noga.mp3")], null, true),
    slide("u13-l37-5", "Глаз", ["Глаз."], focus(["👁️"]), [line("Глаз.", "glaz.mp3")], null, true),
    slide("u13-l37-6", "Ухо", ["Ухо."], focus(["👂"]), [line("Ухо.", "uho.mp3")], null, true),
    slide("u13-l37-7", "Рот", ["Рот."], focus(["👄"]), [line("Рот.", "rot.mp3")], null, true),
    slide("u13-l37-8", "Нос", ["Нос."], focus(["👃"]), [line("Нос.", "nos.mp3")], null, true),
    slide("u13-l37-9", "Живот", ["Живот."], focus(["🤰"]), [line("Живот.", "zhivot.mp3")], null, true),
    slide("u13-l37-10", "Что это?", ["Что это?"], focus(["✋"]), [line("Что это? Рука.", "u13_l37_chto_eto_ruka.mp3")], [
      question("u13-l37-q1", "Что это?", bodyOptions, "ruka", "✋")
    ], true),
    slide("u13-l37-11", "Да или нет", ["Это голова?"], focus(["🙂", "✅"]), [line("Это голова?", "u13_l37_eto_golova.mp3")], [
      question("u13-l37-q2", "Это голова?", yesNoOptions, "da", "🙂")
    ], true),
    slide("u13-l37-12", "Да или нет", ["Это нога?"], focus(["👂", "❌"]), [line("Это нога?", "u13_l37_eto_noga.mp3")], [
      question("u13-l37-q3", "Это нога?", yesNoOptions, "net", "👂")
    ], true),
    slide("u13-l37-13", "Читай", ["Вот голова.", "Вот рука.", "Вот нога.", "У меня есть нос.", "У меня есть рот."], focus(["👉🙂", "👉✋", "👉🦶", "🙂✅👃", "🙂✅👄"]), [line("Вот голова. Вот рука. Вот нога. У меня есть нос. У меня есть рот.", "u13_l37_text.mp3")], [
      question("u13-l37-q4", "Что это?", bodyOptions, "golova", "🙂"),
      question("u13-l37-q5", "Что есть?", bodyOptions, "nos", "🙂✅"),
      question("u13-l37-q6", "Это рот?", yesNoOptions, "da", "👄")
    ], true),
    slide("u13-l37-14", "Отлично!", ["Отлично! ✅", "голова", "рука", "нога", "нос"], wordList([{ text: "голова", emoji: "🙂" }, { text: "рука", emoji: "✋" }, { text: "нога", emoji: "🦶" }, { text: "нос", emoji: "👃" }]), [line("Отлично! Голова. Рука. Нога. Нос.", "u13_l37_final.mp3")], null, true)
  ];

  var lesson38Slides = [
    slide("u13-l38-1", "Болит", ["Болит."], focus(["🤕"]), [line("Болит.", "bolit.mp3")], null, true),
    slide("u13-l38-2", "Голова болит", ["Голова болит."], focus(["🤕", "🙂"]), [line("Голова болит.", "golova_bolit.mp3")], null, true),
    slide("u13-l38-3", "Рука болит", ["Рука болит."], focus(["🤕", "✋"]), [line("Рука болит.", "ruka_bolit.mp3")], null, true),
    slide("u13-l38-4", "Нога болит", ["Нога болит."], focus(["🤕", "🦶"]), [line("Нога болит.", "noga_bolit.mp3")], null, true),
    slide("u13-l38-5", "Живот болит", ["Живот болит."], focus(["🤕", "🤰"]), [line("Живот болит.", "zhivot_bolit.mp3")], null, true),
    slide("u13-l38-6", "У меня", ["У меня болит голова."], focus(["🙂", "🤕", "🙂"]), [line("У меня болит голова.", "u_menya_bolit_golova.mp3")], [
      question("u13-l38-q1", "Что болит?", painOptions, "golova", "🤕🙂")
    ], true),
    slide("u13-l38-7", "У меня", ["У меня болит живот."], focus(["🙂", "🤕", "🤰"]), [line("У меня болит живот.", "u_menya_bolit_zhivot.mp3")], [
      question("u13-l38-q2", "Что болит?", painOptions, "zhivot", "🤕🤰")
    ], true),
    slide("u13-l38-8", "Плохо", ["Мне плохо."], focus(["🙁"]), [line("Мне плохо.", "mne_ploho.mp3")], null, true),
    slide("u13-l38-9", "Вода", ["Я хочу воду."], focus(["🙂", "🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], [
      question("u13-l38-q3", "Что я хочу?", [option("water", "вода", "💧"), option("tea", "чай", "🍵"), option("apple", "яблоко", "🍎")], "water", "🙂🙏")
    ], true),
    slide("u13-l38-10", "Читай", ["Утро.", "Я дома.", "У меня болит голова.", "Мне плохо.", "Я хочу воду."], focus(["🌅", "🙂🏠", "🤕🙂", "🙁", "💧"]), [line("Утро. Я дома. У меня болит голова. Мне плохо. Я хочу воду.", "u13_l38_text.mp3")], [
      question("u13-l38-q4", "Где я?", placeOptions, "home", "🙂"),
      question("u13-l38-q5", "Что болит?", painOptions, "golova", "🤕"),
      question("u13-l38-q6", "Мне хорошо?", yesNoOptions, "net", "🙁")
    ], true),
    slide("u13-l38-11", "Отлично!", ["Отлично! ✅", "болит", "голова болит", "живот болит"], wordList([{ text: "болит", emoji: "🤕" }, { text: "голова болит", emoji: "🤕🙂" }, { text: "живот болит", emoji: "🤕" }]), [line("Отлично! Болит. Голова болит. Живот болит.", "u13_l38_final.mp3")], null, true)
  ];

  var lesson39Slides = [
    slide("u13-l39-1", "Мне хорошо", ["Мне хорошо."], focus(["🙂", "✅"]), [line("Мне хорошо.", "mne_horosho.mp3")], null, true),
    slide("u13-l39-2", "Мне плохо", ["Мне плохо."], focus(["🙁", "❌"]), [line("Мне плохо.", "mne_ploho.mp3")], null, true),
    slide("u13-l39-3", "Я устал", ["Я устал."], focus(["🙂", "😴"]), [line("Я устал.", "ya_ustal.mp3")], null, true),
    slide("u13-l39-4", "Вода", ["Я хочу воду."], focus(["🙂", "🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], null, true),
    slide("u13-l39-5", "Домой", ["Я хочу домой."], focus(["🙂", "🙏", "🏠"]), [line("Я хочу домой.", "ya_hochu_domoy.mp3")], null, true),
    slide("u13-l39-6", "Сядь", ["Сядь."], focus(["🪑", "🙂"]), [line("Сядь.", "syad.mp3")], null, true),
    slide("u13-l39-7", "Стой", ["Стой."], focus(["🛑", "🙂"]), [line("Стой.", "stoy.mp3")], null, true),
    slide("u13-l39-8", "Домой", ["Иди домой."], focus(["🙂", "🚶‍➡️", "🏠"]), [line("Иди домой.", "idi_domoy.mp3")], null, true),
    slide("u13-l39-9", "Диалог", ["Мне плохо.", "Что болит?", "Голова болит.", "Я хочу воду."], focus(["🙁", "❓🤕", "🤕🙂", "💧"]), [line("Мне плохо. Что болит? Голова болит. Я хочу воду.", "u13_l39_dialog.mp3")], [
      question("u13-l39-q1", "Что болит?", painOptions, "golova", "🤕"),
      question("u13-l39-q2", "Что я хочу?", [option("water", "вода", "💧"), option("home", "домой", "🏠"), option("sit", "сядь", "🪑")], "water", "🙂🙏")
    ], true),
    slide("u13-l39-10", "Читай", ["День.", "Я в школе.", "Я устал.", "Мне плохо.", "Я хочу домой."], focus(["☀️", "🙂🏫", "😴", "🙁", "🏠"]), [line("День. Я в школе. Я устал. Мне плохо. Я хочу домой.", "u13_l39_text.mp3")], [
      question("u13-l39-q3", "Где я?", placeOptions, "school", "🙂"),
      question("u13-l39-q4", "Мне хорошо?", yesNoOptions, "net", "🙁"),
      question("u13-l39-q5", "Что я хочу?", [option("home", "домой", "🏠"), option("water", "вода", "💧"), option("play", "играй", "⚽")], "home", "🙂🙏")
    ], true),
    slide("u13-l39-11", "Отлично!", ["Отлично! ✅", "мне хорошо", "мне плохо", "я устал", "сядь"], wordList([{ text: "мне хорошо", emoji: "🙂" }, { text: "мне плохо", emoji: "🙁" }, { text: "я устал", emoji: "😴" }, { text: "сядь", emoji: "🪑" }]), [line("Отлично! Мне хорошо. Мне плохо. Я устал. Сядь.", "u13_l39_final.mp3")], null, true)
  ];

  var whatIsItGame = {
    id: "unit-13-game-what-is-it",
    gameSlug: "unit-13-game-what-is-it",
    kind: "body-choice",
    icon: "🧍",
    title: "Что это?",
    finalTitle: "Отлично! Тело понятно! ✅",
    finalText: "тело",
    finalWords: ["голова", "рука", "нога", "нос"],
    rounds: [
      choiceTask("u13-what-1", "Что это?", group("golova", "голова", "🙂", 1, "body"), "u13_game_what_golova.mp3", bodyOptions, "golova", "Да! Голова.", "Нет. Это голова."),
      choiceTask("u13-what-2", "Что это?", group("ruka", "рука", "✋", 1, "body"), "u13_game_what_ruka.mp3", bodyOptions, "ruka", "Да! Рука.", "Нет. Это рука."),
      choiceTask("u13-what-3", "Что это?", group("noga", "нога", "🦶", 1, "body"), "u13_game_what_noga.mp3", bodyOptions, "noga", "Да! Нога.", "Нет. Это нога."),
      choiceTask("u13-what-4", "Что это?", group("glaz", "глаз", "👁️", 1, "body"), "u13_game_what_glaz.mp3", bodyOptions, "glaz", "Да! Глаз.", "Нет. Это глаз."),
      choiceTask("u13-what-5", "Что это?", group("uho", "ухо", "👂", 1, "body"), "u13_game_what_uho.mp3", bodyOptions, "uho", "Да! Ухо.", "Нет. Это ухо."),
      choiceTask("u13-what-6", "Что это?", group("rot", "рот", "👄", 1, "body"), "u13_game_what_rot.mp3", bodyOptions, "rot", "Да! Рот.", "Нет. Это рот."),
      choiceTask("u13-what-7", "Что это?", group("nos", "нос", "👃", 1, "body"), "u13_game_what_nos.mp3", bodyOptions, "nos", "Да! Нос.", "Нет. Это нос."),
      choiceTask("u13-what-8", "Что это?", group("zhivot", "живот", "🤰", 1, "body"), "u13_game_what_zhivot.mp3", bodyOptions, "zhivot", "Да! Живот.", "Нет. Это живот.")
    ]
  };

  var painGame = {
    id: "unit-13-game-pain",
    gameSlug: "unit-13-game-pain",
    kind: "pain-choice",
    icon: "🤕",
    title: "Что болит?",
    finalTitle: "Отлично! Болит понятно! ✅",
    finalText: "что болит",
    finalWords: ["голова", "рука", "нога", "живот"],
    rounds: [
      choiceTask("u13-pain-1", "Что болит?", group("golova-bolit", "голова болит", "🤕🙂", 1, "body"), "u13_pain_golova_bolit.mp3", painOptions, "golova", "Да! Голова болит.", "Нет. Болит голова."),
      choiceTask("u13-pain-2", "Что болит?", group("ruka-bolit", "рука болит", "🤕✋", 1, "body"), "u13_pain_ruka_bolit.mp3", painOptions, "ruka", "Да! Рука болит.", "Нет. Болит рука."),
      choiceTask("u13-pain-3", "Что болит?", group("noga-bolit", "нога болит", "🤕🦶", 1, "body"), "u13_pain_noga_bolit.mp3", painOptions, "noga", "Да! Нога болит.", "Нет. Болит нога."),
      choiceTask("u13-pain-4", "Что болит?", group("zhivot-bolit", "живот болит", "🤕🤰", 1, "body"), "u13_pain_zhivot_bolit.mp3", painOptions, "zhivot", "Да! Живот болит.", "Нет. Болит живот."),
      choiceTask("u13-pain-5", "Что болит?", group("u-menya-golova", "у меня болит голова", "🙂🤕🙂", 1, "body"), "u13_pain_u_menya_golova.mp3", painOptions, "golova", "Да! Голова болит.", "Нет. Болит голова."),
      choiceTask("u13-pain-6", "Что болит?", group("u-menya-zhivot", "у меня болит живот", "🙂🤕🤰", 1, "body"), "u13_pain_u_menya_zhivot.mp3", painOptions, "zhivot", "Да! Живот болит.", "Нет. Болит живот.")
    ]
  };

  var feelGame = {
    id: "unit-13-game-feel",
    gameSlug: "unit-13-game-feel",
    kind: "health-feel",
    icon: "🙂",
    title: "Хорошо или плохо?",
    finalTitle: "Отлично! Хорошо и плохо понятно! ✅",
    finalText: "мне хорошо · мне плохо",
    finalWords: ["мне хорошо", "мне плохо", "я устал"],
    rounds: [
      choiceTask("u13-feel-1", "Как?", group("good-smile", "мне хорошо", "🙂✅", 1, "health"), "u13_feel_good_smile.mp3", feelOptions, "good", "Да! Мне хорошо.", "Нет. Мне хорошо."),
      choiceTask("u13-feel-2", "Как?", group("bad-sad", "мне плохо", "🙁", 1, "health"), "u13_feel_bad_sad.mp3", feelOptions, "bad", "Да! Мне плохо.", "Нет. Мне плохо."),
      choiceTask("u13-feel-3", "Как?", group("water-good", "вода", "💧🙂", 1, "health"), "u13_feel_water_good.mp3", feelOptions, "good", "Да! Мне хорошо.", "Нет. Мне хорошо."),
      choiceTask("u13-feel-4", "Как?", group("head-bad", "голова болит", "🤕🙂", 1, "health"), "u13_feel_head_bad.mp3", feelOptions, "bad", "Да! Мне плохо.", "Нет. Мне плохо."),
      choiceTask("u13-feel-5", "Как?", group("park-good", "парк", "🌳⚽🙂", 1, "health"), "u13_feel_park_good.mp3", feelOptions, "good", "Да! Мне хорошо.", "Нет. Мне хорошо."),
      choiceTask("u13-feel-6", "Как?", group("tired-bad", "я устал", "😴🙁", 1, "health"), "u13_feel_tired_bad.mp3", feelOptions, "bad", "Да! Мне плохо.", "Нет. Мне плохо.")
    ]
  };

  var helpGame = {
    id: "unit-13-game-help",
    gameSlug: "unit-13-game-help",
    kind: "health-help",
    icon: "💧",
    title: "Помоги",
    finalTitle: "Отлично! Помощь понятна! ✅",
    finalText: "вода · сядь · домой",
    finalWords: ["вода", "сядь", "иди домой"],
    rounds: [
      choiceTask("u13-help-1", "Мне плохо. Я хочу воду.", group("want-water", "я хочу воду", "🙁💧", 1, "health"), "u13_help_want_water.mp3", helpOptions, "water", "Да! Вода.", "Нет. Нужна вода."),
      choiceTask("u13-help-2", "Я устал.", group("tired", "я устал", "😴", 1, "health"), "u13_help_tired_sit.mp3", helpOptions, "sit", "Да! Сядь.", "Нет. Сядь."),
      choiceTask("u13-help-3", "Холодно.", group("cold", "холодно", "🥶", 1, "weather"), "u13_help_cold_jacket.mp3", helpOptions, "jacket", "Да! Надень куртку.", "Нет. Надень куртку."),
      choiceTask("u13-help-4", "Голова болит.", group("head-pain", "голова болит", "🤕🙂", 1, "body"), "u13_help_head_home.mp3", helpOptions, "home", "Да! Иди домой.", "Нет. Иди домой."),
      choiceTask("u13-help-5", "Живот болит.", group("belly-pain", "живот болит", "🤕🤰", 1, "body"), "u13_help_belly_home.mp3", helpOptions, "home", "Да! Иди домой.", "Нет. Иди домой."),
      choiceTask("u13-help-6", "Мне хорошо.", group("good", "мне хорошо", "🙂⚽", 1, "health"), "u13_help_good_play.mp3", helpOptions, "play", "Да! Играй.", "Нет. Играй.")
    ]
  };

  var storySlides = [
    slide("u13-story-1", "История 1", ["Утро.", "Я дома.", "У меня болит голова.", "Я хочу воду."], focus(["🌅", "🙂🏠", "🤕🙂", "💧"]), [line("Утро. Я дома. У меня болит голова. Я хочу воду.", "u13_story_1.mp3")], [
      question("u13-story-q1", "Где я?", placeOptions, "home", "🙂"),
      question("u13-story-q2", "Что болит?", painOptions, "golova", "🤕"),
      question("u13-story-q3", "Что я хочу?", [option("water", "вода", "💧"), option("home", "домой", "🏠"), option("tea", "чай", "🍵")], "water", "🙂🙏")
    ], true),
    slide("u13-story-2", "История 2", ["День.", "Я в школе.", "Я устал.", "Мне плохо.", "Я хочу домой."], focus(["☀️", "🙂🏫", "😴", "🙁", "🏠"]), [line("День. Я в школе. Я устал. Мне плохо. Я хочу домой.", "u13_story_2.mp3")], [
      question("u13-story-q4", "Где я?", placeOptions, "school", "🙂"),
      question("u13-story-q5", "Мне хорошо?", yesNoOptions, "net", "🙁"),
      question("u13-story-q6", "Что я хочу?", [option("home", "домой", "🏠"), option("water", "вода", "💧"), option("sit", "сядь", "🪑")], "home", "🙂🙏")
    ], true),
    slide("u13-story-3", "История 3", ["Вечер.", "Я дома.", "Мне хорошо.", "Кот рядом.", "Я пью чай."], focus(["🌙", "🙂🏠", "🙂", "🐱↔️", "🍵"]), [line("Вечер. Я дома. Мне хорошо. Кот рядом. Я пью чай.", "u13_story_3.mp3")], [
      question("u13-story-q7", "Где я?", placeOptions, "home", "🙂"),
      question("u13-story-q8", "Мне хорошо?", yesNoOptions, "da", "🙂"),
      question("u13-story-q9", "Что я пью?", [option("tea", "чай", "🍵"), option("water", "вода", "💧"), option("juice", "сок", "🧃")], "tea", "🙂")
    ], true),
    slide("u13-story-4", "Отлично!", ["Отлично! ✅", "Ты читаешь.", "Тело и здоровье."], wordList([{ text: "мне хорошо", emoji: "🙂" }, { text: "мне плохо", emoji: "🙁" }, { text: "болит", emoji: "🤕" }]), [line("Отлично! Ты читаешь. Тело и здоровье.", "u13_story_final.mp3")], null, true)
  ];

  var healthMapGame = {
    id: "unit-13-game-health-map",
    gameSlug: "unit-13-game-health-map",
    kind: "health-map",
    icon: "🗺️",
    title: "Карта здоровья",
    mapTitle: "Карта здоровья",
    finalTitle: "Отлично! Карта здоровья готова! 🏆",
    finalText: "тело · вода · дом",
    finalWords: ["голова", "рука", "нога", "живот"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("home", "дом", "🏠", 1, "place", 0, 4),
      group("school", "школа", "🏫", 1, "place", 4, 0),
      group("park", "парк", "🌳", 1, "place", 0, 1),
      group("water", "вода", "💧", 1, "thing", 2, 3),
      group("golova", "голова", "🙂", 1, "body", 1, 1),
      group("ruka", "рука", "✋", 1, "body", 3, 1),
      group("noga", "нога", "🦶", 1, "body", 4, 3),
      group("zhivot", "живот", "🤰", 1, "body", 2, 1),
      group("jacket", "куртка", "🧥", 1, "clothes", 1, 3),
      group("hat", "шапка", "🧢", 1, "clothes", 3, 4)
    ],
    rounds: [
      { id: "u13-map-1", command: "Найди голову.", text: "Найди голову.", audio: audio("u13_map_find_golova.mp3"), target: "golova", hint: "Нужна голова.", correctFeedback: "Да! Голова." },
      { id: "u13-map-2", command: "Найди руку.", text: "Найди руку.", audio: audio("u13_map_find_ruka.mp3"), target: "ruka", hint: "Нужна рука.", correctFeedback: "Да! Рука." },
      { id: "u13-map-3", command: "Найди ногу.", text: "Найди ногу.", audio: audio("u13_map_find_noga.mp3"), target: "noga", hint: "Нужна нога.", correctFeedback: "Да! Нога." },
      { id: "u13-map-4", command: "Найди живот.", text: "Найди живот.", audio: audio("u13_map_find_zhivot.mp3"), target: "zhivot", hint: "Нужен живот.", correctFeedback: "Да! Живот." },
      { id: "u13-map-5", command: "Мне плохо. Иди домой.", text: "Мне плохо. Иди домой.", audio: audio("u13_map_bad_go_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." },
      { id: "u13-map-6", command: "Я хочу воду. Найди воду.", text: "Я хочу воду. Найди воду.", audio: audio("u13_map_want_water.mp3"), target: "water", hint: "Нужна вода.", correctFeedback: "Да! Вода." },
      { id: "u13-map-7", command: "Холодно. Найди куртку.", text: "Холодно. Найди куртку.", audio: audio("u13_map_cold_jacket.mp3"), target: "jacket", hint: "Нужна куртка.", correctFeedback: "Да! Куртка." },
      { id: "u13-map-8", command: "Снег. Найди шапку.", text: "Снег. Найди шапку.", audio: audio("u13_map_snow_hat.mp3"), target: "hat", hint: "Нужна шапка.", correctFeedback: "Да! Шапка." }
    ]
  };

  var showGame = {
    id: "unit-13-game-show",
    gameSlug: "unit-13-game-show",
    kind: "health-find",
    icon: "👉",
    title: "Покажи",
    findTitle: "Покажи",
    finalTitle: "Отлично! Покажи понятно! ✅",
    finalText: "покажи",
    finalWords: ["голова", "рука", "нога", "нос"],
    rounds: [
      commandTask("u13-show-1", "Покажи голову.", "pokazhi_golovu.mp3", bodyItems, "golova", "Да! Голова.", "Нет. Нужна голова."),
      commandTask("u13-show-2", "Покажи руку.", "pokazhi_ruku.mp3", bodyItems, "ruka", "Да! Рука.", "Нет. Нужна рука."),
      commandTask("u13-show-3", "Покажи ногу.", "pokazhi_nogu.mp3", bodyItems, "noga", "Да! Нога.", "Нет. Нужна нога."),
      commandTask("u13-show-4", "Покажи глаз.", "u13_show_glaz.mp3", bodyItems, "glaz", "Да! Глаз.", "Нет. Нужен глаз."),
      commandTask("u13-show-5", "Покажи ухо.", "u13_show_uho.mp3", bodyItems, "uho", "Да! Ухо.", "Нет. Нужно ухо."),
      commandTask("u13-show-6", "Покажи нос.", "pokazhi_nos.mp3", bodyItems, "nos", "Да! Нос.", "Нет. Нужен нос."),
      commandTask("u13-show-7", "Покажи рот.", "u13_show_rot.mp3", bodyItems, "rot", "Да! Рот.", "Нет. Нужен рот."),
      commandTask("u13-show-8", "Покажи живот.", "u13_show_zhivot.mp3", bodyItems, "zhivot", "Да! Живот.", "Нет. Нужен живот.")
    ]
  };

  var UNIT13_GAMES = {
    whatIsItGame: whatIsItGame,
    painGame: painGame,
    feelGame: feelGame,
    helpGame: helpGame,
    healthMapGame: healthMapGame,
    showGame: showGame
  };

  root.LexiLandUnit13Lesson = {
    id: "level-0-unit-13-body-health",
    order: 15,
    menuLabel: "Юнит 13",
    title: "Юнит 13: Тело и здоровье",
    subtitle: "Тело, болит, мне хорошо",
    level: "Уровень 0",
    coverEmoji: "🧍",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-37-body", "Урок 37: Тело", "🧍", "Урок 37: Тело", lesson37Slides),
      unit("lesson-38-bolit", "Урок 38: Болит", "🤕", "Урок 38: Болит", lesson38Slides),
      unit("lesson-39-mne-horosho-ploho", "Урок 39: Мне хорошо / мне плохо", "🙂", "Урок 39: Мне хорошо / мне плохо", lesson39Slides),
      gameUnit("unit-13-game-what-is-it", "Игра: Что это?", "🧍", whatIsItGame),
      gameUnit("unit-13-game-pain", "Игра 2: Что болит?", "🤕", painGame),
      gameUnit("unit-13-game-feel", "Игра 3: Хорошо или плохо?", "🙂", feelGame),
      gameUnit("unit-13-game-help", "Игра 4: Помоги", "💧", helpGame),
      unit("unit-13-game-story", "Игра 5: Мини-история", "📖", "Игра 5: Мини-история", storySlides),
      gameUnit("unit-13-game-health-map", "Игра 6: Карта здоровья", "🗺️", healthMapGame),
      gameUnit("unit-13-game-show", "Игра 7: Покажи", "👉", showGame)
    ]
  };

  root.LexiLandUnit13Games = UNIT13_GAMES;
  root.LexiLandUnit13 = root.LexiLandUnit13Lesson;
}(typeof window !== "undefined" ? window : globalThis));
