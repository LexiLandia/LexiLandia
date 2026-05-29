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
      item: item || "clothes",
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
    "одежда": m("одежда", "👕"),
    "футболка": m("футболка", "👕"),
    "куртка": m("куртка", "🧥"),
    "куртки": m("куртки", "🧥❌"),
    "шапка": m("шапка", "🧢"),
    "шапку": m("шапку", "🧢"),
    "шапки": m("шапки", "🧢❌"),
    "штаны": m("штаны", "👖"),
    "обувь": m("обувь", "👟"),
    "платье": m("платье", "👗"),
    "платья": m("платья", "👗❌"),
    "носки": m("носки", "🧦"),
    "шарф": m("шарф", "🧣"),
    "шарфа": m("шарфа", "🧣❌"),
    "надень": m("надень", "🧍"),
    "красная": m("красная", "🔴"),
    "синяя": m("синяя", "🔵"),
    "чёрная": m("чёрная", "⚫"),
    "белые": m("белые", "⚪"),
    "жёлтый": m("жёлтый", "🟡"),
    "зелёное": m("зелёное", "🟢"),
    "красную": m("красную", "🔴"),
    "синюю": m("синюю", "🔵"),
    "чёрную": m("чёрную", "⚫"),
    "у": m("у", "🎒"),
    "меня": m("меня", "🙂"),
    "есть": m("есть", "✅"),
    "нет": m("нет", "❌"),
    "хочу": m("хочу", "🙏"),
    "дай": m("дай", "🤲"),
    "пожалуйста": m("пожалуйста", "🙏"),
    "на": m("на", "🤲➡️🙂"),
    "спасибо": m("спасибо", "😊"),
    "вот": m("вот", "👉"),
    "тут": m("тут", "📍"),
    "там": m("там", "👉"),
    "рядом": m("рядом", "↔️"),
    "стуле": m("стуле", "🪑"),
    "коробке": m("коробке", "📦"),
    "утро": m("утро", "🌅"),
    "магазин": m("магазин", "🏪"),
    "домой": m("домой", "🏠")
  };

  var dictionary = [
    entry("u11-odezhda", "одежда", "👕", "word", "odezhda.mp3"),
    entry("u11-futbolka", "футболка", "👕", "word", "futbolka.mp3"),
    entry("u11-kurtka", "куртка", "🧥", "word", "kurtka.mp3"),
    entry("u11-shapka", "шапка", "🧢", "word", "shapka.mp3"),
    entry("u11-shtany", "штаны", "👖", "word", "shtany.mp3"),
    entry("u11-obuv", "обувь", "👟", "word", "obuv.mp3"),
    entry("u11-plate", "платье", "👗", "word", "plate.mp3"),
    entry("u11-noski", "носки", "🧦", "word", "noski.mp3"),
    entry("u11-sharf", "шарф", "🧣", "word", "sharf.mp3"),
    entry("u11-naden", "надень", "🧍", "word", "naden.mp3"),
    entry("u11-red-shirt", "красная футболка", "🔴👕", "chunk", "krasnaya_futbolka.mp3"),
    entry("u11-blue-hat", "синяя шапка", "🔵🧢", "chunk", "sinyaya_shapka.mp3"),
    entry("u11-black-jacket", "чёрная куртка", "⚫🧥", "chunk", "chernaya_kurtka.mp3"),
    entry("u11-white-socks", "белые носки", "⚪🧦", "chunk", "belye_noski.mp3"),
    entry("u11-yellow-scarf", "жёлтый шарф", "🟡🧣", "chunk", "zheltyy_sharf.mp3"),
    entry("u11-green-dress", "зелёное платье", "🟢👗", "chunk", "zelenoe_plate.mp3"),
    entry("u11-have-shirt", "у меня есть футболка", "🙂✅👕", "chunk", "u11_u_menya_est_futbolka.mp3"),
    entry("u11-no-jacket", "у меня нет куртки", "🙂❌🧥", "chunk", "u11_u_menya_net_kurtki.mp3"),
    entry("u11-want-hat", "я хочу шапку", "🙂🙏🧢", "chunk", "u11_ya_hochu_shapku.mp3"),
    entry("u11-give-scarf", "дай шарф, пожалуйста", "🤲🧣🙏", "chunk", "u11_dai_sharf_pozhaluysta.mp3")
  ];

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var clothingOptions = [
    option("futbolka", "футболка", "👕"),
    option("kurtka", "куртка", "🧥"),
    option("shapka", "шапка", "🧢"),
    option("shtany", "штаны", "👖"),
    option("obuv", "обувь", "👟"),
    option("plate", "платье", "👗"),
    option("noski", "носки", "🧦"),
    option("sharf", "шарф", "🧣")
  ];

  var coloredOptions = [
    option("red-shirt", "красная футболка", "🔴👕"),
    option("blue-hat", "синяя шапка", "🔵🧢"),
    option("black-jacket", "чёрная куртка", "⚫🧥"),
    option("white-socks", "белые носки", "⚪🧦"),
    option("green-dress", "зелёное платье", "🟢👗"),
    option("yellow-scarf", "жёлтый шарф", "🟡🧣")
  ];

  var placeOptions = [
    option("tut", "тут", "📍"),
    option("tam", "там", "👉"),
    option("stul", "на стуле", "🪑"),
    option("box", "в коробке", "📦"),
    option("ryadom", "рядом", "↔️")
  ];

  var clothingItems = [
    group("futbolka", "футболка", "👕", 1, "clothes"),
    group("kurtka", "куртка", "🧥", 1, "clothes"),
    group("shapka", "шапка", "🧢", 1, "clothes"),
    group("shtany", "штаны", "👖", 1, "clothes"),
    group("obuv", "обувь", "👟", 1, "clothes"),
    group("plate", "платье", "👗", 1, "clothes"),
    group("noski", "носки", "🧦", 1, "clothes"),
    group("sharf", "шарф", "🧣", 1, "clothes")
  ];

  var coloredClothingItems = [
    group("red-shirt", "красная футболка", "🔴👕", 1, "clothes"),
    group("blue-hat", "синяя шапка", "🔵🧢", 1, "clothes"),
    group("black-jacket", "чёрная куртка", "⚫🧥", 1, "clothes"),
    group("white-socks", "белые носки", "⚪🧦", 1, "clothes"),
    group("green-dress", "зелёное платье", "🟢👗", 1, "clothes"),
    group("yellow-scarf", "жёлтый шарф", "🟡🧣", 1, "clothes"),
    group("red-pants", "красные штаны", "🔴👖", 1, "clothes"),
    group("black-shoes", "чёрная обувь", "⚫👟", 1, "clothes")
  ];

  var shopItems = clothingItems.concat(coloredClothingItems.slice(0, 3));
  var buildItems = [
    group("shapka", "шапка", "🧢", 1, "clothes"),
    group("kurtka", "куртка", "🧥", 1, "clothes"),
    group("sharf", "шарф", "🧣", 1, "clothes"),
    group("obuv", "обувь", "👟", 1, "clothes"),
    group("red-shirt", "красная футболка", "🔴👕", 1, "clothes"),
    group("blue-hat", "синяя шапка", "🔵🧢", 1, "clothes"),
    group("black-jacket", "чёрная куртка", "⚫🧥", 1, "clothes"),
    group("white-socks", "белые носки", "⚪🧦", 1, "clothes")
  ];

  var lesson31Slides = [
    slide("u11-l31-1", "Одежда", ["Одежда."], focus(["👕", "🧥", "🧢", "👖", "👟", "👗", "🧦", "🧣"]), [line("Одежда.", "odezhda.mp3")], null, true),
    slide("u11-l31-2", "Футболка", ["Футболка."], focus(["👕"]), [line("Футболка.", "futbolka.mp3")], null, true),
    slide("u11-l31-3", "Куртка", ["Куртка."], focus(["🧥"]), [line("Куртка.", "kurtka.mp3")], null, true),
    slide("u11-l31-4", "Шапка", ["Шапка."], focus(["🧢"]), [line("Шапка.", "shapka.mp3")], null, true),
    slide("u11-l31-5", "Штаны", ["Штаны."], focus(["👖"]), [line("Штаны.", "shtany.mp3")], null, true),
    slide("u11-l31-6", "Обувь", ["Обувь."], focus(["👟"]), [line("Обувь.", "obuv.mp3")], null, true),
    slide("u11-l31-7", "Платье", ["Платье."], focus(["👗"]), [line("Платье.", "plate.mp3")], null, true),
    slide("u11-l31-8", "Носки", ["Носки."], focus(["🧦"]), [line("Носки.", "noski.mp3")], null, true),
    slide("u11-l31-9", "Шарф", ["Шарф."], focus(["🧣"]), [line("Шарф.", "sharf.mp3")], null, true),
    slide("u11-l31-10", "Что это?", ["Что это?"], focus(["🧥"]), [line("Что это? Куртка.", "u11_l31_chto_eto_kurtka.mp3")], [
      question("u11-l31-q1", "Что это?", clothingOptions, "kurtka", "🧥")
    ], true),
    slide("u11-l31-11", "Да или нет", ["Это куртка?"], focus(["🧢", "❌"]), [line("Это куртка?", "u11_l31_eto_kurtka.mp3")], [
      question("u11-l31-q2", "Это куртка?", yesNoOptions, "net", "🧢")
    ], true),
    slide("u11-l31-12", "Читай", ["Тут одежда.", "Вот футболка.", "Вот шапка.", "Там куртка.", "У меня есть шарф."], focus(["📍👕🧢", "👉🧥", "🙂✅🧣"]), [line("Тут одежда. Вот футболка. Вот шапка. Там куртка. У меня есть шарф.", "u11_l31_text.mp3")], [
      question("u11-l31-q3", "Что это?", clothingOptions, "futbolka", "👕"),
      question("u11-l31-q4", "Где шапка?", placeOptions, "tut", "🧢"),
      question("u11-l31-q5", "У меня есть шарф?", yesNoOptions, "da", "🙂✅🧣")
    ], true),
    slide("u11-l31-13", "Отлично!", ["Отлично! ✅", "футболка", "куртка", "шапка", "шарф"], wordList([{ text: "футболка", emoji: "👕" }, { text: "куртка", emoji: "🧥" }, { text: "шапка", emoji: "🧢" }, { text: "шарф", emoji: "🧣" }]), [line("Отлично! Футболка. Куртка. Шапка. Шарф.", "u11_l31_final.mp3")], null, true)
  ];

  var lesson32Slides = [
    slide("u11-l32-1", "Цветная одежда", ["Цветная одежда."], focus(["🔴👕", "🔵🧢", "⚫🧥", "⚪🧦", "🟢👗", "🟡🧣"]), [line("Цветная одежда.", "u11_l32_tsvetnaya_odezhda.mp3")], null, true),
    slide("u11-l32-2", "Красная футболка", ["Красная футболка."], focus(["🔴", "👕"]), [line("Красная футболка.", "krasnaya_futbolka.mp3")], null, true),
    slide("u11-l32-3", "Синяя шапка", ["Синяя шапка."], focus(["🔵", "🧢"]), [line("Синяя шапка.", "sinyaya_shapka.mp3")], null, true),
    slide("u11-l32-4", "Чёрная куртка", ["Чёрная куртка."], focus(["⚫", "🧥"]), [line("Чёрная куртка.", "chernaya_kurtka.mp3")], null, true),
    slide("u11-l32-5", "Белые носки", ["Белые носки."], focus(["⚪", "🧦"]), [line("Белые носки.", "belye_noski.mp3")], null, true),
    slide("u11-l32-6", "Зелёное платье", ["Зелёное платье."], focus(["🟢", "👗"]), [line("Зелёное платье.", "zelenoe_plate.mp3")], null, true),
    slide("u11-l32-7", "Жёлтый шарф", ["Жёлтый шарф."], focus(["🟡", "🧣"]), [line("Жёлтый шарф.", "zheltyy_sharf.mp3")], null, true),
    slide("u11-l32-8", "Найди", ["Найди синюю шапку."], focus(["🔴👕", "🔵🧢", "⚫🧥"]), [line("Найди синюю шапку.", "u11_l32_find_blue_hat.mp3")], [
      question("u11-l32-q1", "Найди:", coloredOptions, "blue-hat", "🔵🧢")
    ], true),
    slide("u11-l32-9", "Да или нет", ["Это зелёное платье?"], focus(["🟢👗", "✅"]), [line("Это зелёное платье?", "u11_l32_eto_zelenoe_plate.mp3")], [
      question("u11-l32-q2", "Это зелёное платье?", yesNoOptions, "da", "🟢👗")
    ], true),
    slide("u11-l32-10", "Читай", ["На стуле красная футболка.", "Рядом синяя шапка.", "В коробке белые носки.", "У меня есть чёрная куртка."], focus(["🪑🔴👕", "↔️🔵🧢", "📦⚪🧦", "🙂✅⚫🧥"]), [line("На стуле красная футболка. Рядом синяя шапка. В коробке белые носки. У меня есть чёрная куртка.", "u11_l32_text.mp3")], [
      question("u11-l32-q3", "Где красная футболка?", placeOptions, "stul", "🔴👕"),
      question("u11-l32-q4", "Какая шапка?", coloredOptions, "blue-hat", "🧢"),
      question("u11-l32-q5", "Что в коробке?", coloredOptions, "white-socks", "📦")
    ], true),
    slide("u11-l32-11", "Отлично!", ["Отлично! ✅", "красная футболка", "синяя шапка", "чёрная куртка"], wordList([{ text: "красная футболка", emoji: "🔴👕" }, { text: "синяя шапка", emoji: "🔵🧢" }, { text: "чёрная куртка", emoji: "⚫🧥" }]), [line("Отлично! Красная футболка. Синяя шапка. Чёрная куртка.", "u11_l32_final.mp3")], null, true)
  ];

  var lesson33Slides = [
    slide("u11-l33-1", "У меня есть", ["У меня есть футболка."], focus(["🙂", "✅", "👕"]), [line("У меня есть футболка.", "u11_u_menya_est_futbolka.mp3")], null, true),
    slide("u11-l33-2", "У меня нет", ["У меня нет куртки."], focus(["🙂", "❌", "🧥"]), [line("У меня нет куртки.", "u11_u_menya_net_kurtki.mp3")], null, true),
    slide("u11-l33-3", "Я хочу", ["Я хочу шапку."], focus(["🙂", "🙏", "🧢"]), [line("Я хочу шапку.", "u11_ya_hochu_shapku.mp3")], null, true),
    slide("u11-l33-4", "Дай", ["Дай шарф, пожалуйста."], focus(["🤲", "🧣", "🙏"]), [line("Дай шарф, пожалуйста.", "u11_dai_sharf_pozhaluysta.mp3")], null, true),
    slide("u11-l33-5", "На", ["На."], focus(["🤲➡️🙂", "🧢"]), [line("На.", "na_take.mp3")], null, true),
    slide("u11-l33-6", "Спасибо", ["Спасибо."], focus(["😊"]), [line("Спасибо.", "spasibo.mp3")], null, true),
    slide("u11-l33-7", "Цвет", ["У меня есть красная футболка."], focus(["🙂", "✅", "🔴👕"]), [line("У меня есть красная футболка.", "u11_l33_have_red_shirt.mp3")], null, true),
    slide("u11-l33-8", "Нет", ["У меня нет синей шапки."], focus(["🙂", "❌", "🔵🧢"]), [line("У меня нет синей шапки.", "u11_l33_no_blue_hat.mp3")], null, true),
    slide("u11-l33-9", "Диалог", ["Я хочу шапку.", "Дай шапку, пожалуйста.", "На.", "Спасибо."], focus(["🙂🙏🧢", "🤲🧢🙏", "🤲➡️🙂", "😊"]), [line("Я хочу шапку. Дай шапку, пожалуйста. На. Спасибо.", "u11_l33_dialog.mp3")], [
      question("u11-l33-q1", "Что я прошу?", clothingOptions, "shapka", "🤲")
    ], true),
    slide("u11-l33-10", "Читай", ["Утро.", "У меня есть футболка.", "У меня есть шапка.", "У меня нет куртки.", "Я хочу куртку."], focus(["🌅", "🙂✅👕", "🙂✅🧢", "🙂❌🧥", "🙂🙏🧥"]), [line("Утро. У меня есть футболка. У меня есть шапка. У меня нет куртки. Я хочу куртку.", "u11_l33_text.mp3")], [
      question("u11-l33-q2", "Что у меня есть?", clothingOptions, "futbolka", "🙂✅"),
      question("u11-l33-q3", "Чего у меня нет?", clothingOptions, "kurtka", "🙂❌"),
      question("u11-l33-q4", "Что я хочу?", clothingOptions, "kurtka", "🙂🙏")
    ], true),
    slide("u11-l33-11", "Отлично!", ["Отлично! ✅", "у меня есть", "у меня нет", "я хочу", "дай"], wordList([{ text: "у меня есть", emoji: "✅🎒" }, { text: "у меня нет", emoji: "❌🎒" }, { text: "я хочу", emoji: "🙏" }, { text: "дай", emoji: "🤲" }]), [line("Отлично! У меня есть. У меня нет. Я хочу. Дай.", "u11_l33_final.mp3")], null, true)
  ];

  var whatIsItGame = {
    id: "unit-11-game-what-is-it",
    gameSlug: "unit-11-game-what-is-it",
    kind: "clothing-choice",
    icon: "👕",
    title: "Что это?",
    finalTitle: "Отлично! Одежда понятна! ✅",
    finalText: "одежда",
    finalWords: ["футболка", "куртка", "шапка", "шарф"],
    rounds: [
      choiceTask("u11-what-1", "Что это?", group("futbolka", "футболка", "👕", 1, "clothes"), "u11_game_what_futbolka.mp3", clothingOptions, "futbolka", "Да! Футболка.", "Нет. Это футболка."),
      choiceTask("u11-what-2", "Что это?", group("kurtka", "куртка", "🧥", 1, "clothes"), "u11_game_what_kurtka.mp3", clothingOptions, "kurtka", "Да! Куртка.", "Нет. Это куртка."),
      choiceTask("u11-what-3", "Что это?", group("shapka", "шапка", "🧢", 1, "clothes"), "u11_game_what_shapka.mp3", clothingOptions, "shapka", "Да! Шапка.", "Нет. Это шапка."),
      choiceTask("u11-what-4", "Что это?", group("shtany", "штаны", "👖", 1, "clothes"), "u11_game_what_shtany.mp3", clothingOptions, "shtany", "Да! Штаны.", "Нет. Это штаны."),
      choiceTask("u11-what-5", "Что это?", group("obuv", "обувь", "👟", 1, "clothes"), "u11_game_what_obuv.mp3", clothingOptions, "obuv", "Да! Обувь.", "Нет. Это обувь."),
      choiceTask("u11-what-6", "Что это?", group("plate", "платье", "👗", 1, "clothes"), "u11_game_what_plate.mp3", clothingOptions, "plate", "Да! Платье.", "Нет. Это платье."),
      choiceTask("u11-what-7", "Что это?", group("noski", "носки", "🧦", 1, "clothes"), "u11_game_what_noski.mp3", clothingOptions, "noski", "Да! Носки.", "Нет. Это носки."),
      choiceTask("u11-what-8", "Что это?", group("sharf", "шарф", "🧣", 1, "clothes"), "u11_game_what_sharf.mp3", clothingOptions, "sharf", "Да! Шарф.", "Нет. Это шарф.")
    ]
  };

  var findClothesGame = {
    id: "unit-11-game-find-clothes",
    gameSlug: "unit-11-game-find-clothes",
    kind: "clothing-find",
    icon: "🔎",
    title: "Найди одежду",
    findTitle: "Найди одежду",
    finalTitle: "Супер! Ты нашёл одежду! ✅",
    finalText: "найди",
    finalWords: ["футболка", "куртка", "шапка", "шарф"],
    rounds: [
      commandTask("u11-find-1", "Найди футболку.", "u11_find_futbolka.mp3", clothingItems, "futbolka", "Да! Футболка.", "Нет. Нужна футболка."),
      commandTask("u11-find-2", "Найди куртку.", "u11_find_kurtka.mp3", clothingItems, "kurtka", "Да! Куртка.", "Нет. Нужна куртка."),
      commandTask("u11-find-3", "Найди шапку.", "u11_find_shapka.mp3", clothingItems, "shapka", "Да! Шапка.", "Нет. Нужна шапка."),
      commandTask("u11-find-4", "Найди штаны.", "u11_find_shtany.mp3", clothingItems, "shtany", "Да! Штаны.", "Нет. Нужны штаны."),
      commandTask("u11-find-5", "Найди обувь.", "u11_find_obuv.mp3", clothingItems, "obuv", "Да! Обувь.", "Нет. Нужна обувь."),
      commandTask("u11-find-6", "Найди платье.", "u11_find_plate.mp3", clothingItems, "plate", "Да! Платье.", "Нет. Нужно платье."),
      commandTask("u11-find-7", "Найди носки.", "u11_find_noski.mp3", clothingItems, "noski", "Да! Носки.", "Нет. Нужны носки."),
      commandTask("u11-find-8", "Найди шарф.", "u11_find_sharf.mp3", clothingItems, "sharf", "Да! Шарф.", "Нет. Нужен шарф.")
    ]
  };

  var findColorClothesGame = {
    id: "unit-11-game-find-color-clothes",
    gameSlug: "unit-11-game-find-color-clothes",
    kind: "clothing-color-find",
    icon: "🔴",
    title: "Найди цветную одежду",
    findTitle: "Найди цветную одежду",
    finalTitle: "Отлично! Цветная одежда найдена! ✅",
    finalText: "цветная одежда",
    finalWords: ["красная футболка", "синяя шапка", "чёрная куртка"],
    rounds: [
      commandTask("u11-color-1", "Найди красную футболку.", "u11_find_red_shirt.mp3", coloredClothingItems, "red-shirt", "Да! Красная футболка.", "Нет. Нужна красная футболка."),
      commandTask("u11-color-2", "Найди синюю шапку.", "u11_find_blue_hat.mp3", coloredClothingItems, "blue-hat", "Да! Синяя шапка.", "Нет. Нужна синяя шапка."),
      commandTask("u11-color-3", "Найди чёрную куртку.", "u11_find_black_jacket.mp3", coloredClothingItems, "black-jacket", "Да! Чёрная куртка.", "Нет. Нужна чёрная куртка."),
      commandTask("u11-color-4", "Найди белые носки.", "u11_find_white_socks.mp3", coloredClothingItems, "white-socks", "Да! Белые носки.", "Нет. Нужны белые носки."),
      commandTask("u11-color-5", "Найди зелёное платье.", "u11_find_green_dress.mp3", coloredClothingItems, "green-dress", "Да! Зелёное платье.", "Нет. Нужно зелёное платье."),
      commandTask("u11-color-6", "Найди жёлтый шарф.", "u11_find_yellow_scarf.mp3", coloredClothingItems, "yellow-scarf", "Да! Жёлтый шарф.", "Нет. Нужен жёлтый шарф."),
      commandTask("u11-color-7", "Найди красные штаны.", "u11_find_red_pants.mp3", coloredClothingItems, "red-pants", "Да! Красные штаны.", "Нет. Нужны красные штаны."),
      commandTask("u11-color-8", "Найди чёрную обувь.", "u11_find_black_shoes.mp3", coloredClothingItems, "black-shoes", "Да! Чёрная обувь.", "Нет. Нужна чёрная обувь.")
    ]
  };

  var haveClothesGame = {
    id: "unit-11-game-have-clothes",
    gameSlug: "unit-11-game-have-clothes",
    kind: "clothing-have",
    icon: "🎒",
    title: "У меня есть?",
    finalTitle: "Отлично! Есть и нет понятно! ✅",
    finalText: "у меня есть · у меня нет",
    finalWords: ["футболка", "куртка", "шапка"],
    rounds: [
      choiceTask("u11-have-1", "У меня есть футболка.", group("have-shirt", "У меня есть футболка.", "🙂✅👕", 1, "scene"), "u11_have_futbolka.mp3", yesNoOptions, "da", "Да! Футболка есть.", "Нет. Футболка есть."),
      choiceTask("u11-have-2", "У меня нет куртки.", group("no-jacket", "У меня нет куртки.", "🙂❌🧥", 1, "scene"), "u11_no_kurtki.mp3", yesNoOptions, "da", "Да! Куртки нет.", "Нет. Куртки нет."),
      choiceTask("u11-have-3", "У меня есть шапка.", group("have-hat", "У меня есть шапка.", "🙂✅🧢", 1, "scene"), "u11_have_shapka.mp3", yesNoOptions, "da", "Да! Шапка есть.", "Нет. Шапка есть."),
      choiceTask("u11-have-4", "У меня есть шарф.", group("no-scarf", "У меня нет шарфа.", "🙂❌🧣", 1, "scene"), "u11_have_sharf_no.mp3", yesNoOptions, "net", "Да! Шарфа нет.", "Нет. Шарфа нет."),
      choiceTask("u11-have-5", "У меня есть белые носки.", group("have-socks", "У меня есть белые носки.", "🙂✅⚪🧦", 1, "scene"), "u11_have_white_socks.mp3", yesNoOptions, "da", "Да! Белые носки есть.", "Нет. Белые носки есть."),
      choiceTask("u11-have-6", "У меня есть синяя шапка.", group("no-blue-hat", "У меня нет синей шапки.", "🙂❌🔵🧢", 1, "scene"), "u11_have_blue_hat_no.mp3", yesNoOptions, "net", "Да! Синей шапки нет.", "Нет. Синей шапки нет."),
      choiceTask("u11-have-7", "У меня есть чёрная куртка.", group("have-black-jacket", "У меня есть чёрная куртка.", "🙂✅⚫🧥", 1, "scene"), "u11_have_black_jacket.mp3", yesNoOptions, "da", "Да! Чёрная куртка есть.", "Нет. Чёрная куртка есть."),
      choiceTask("u11-have-8", "У меня нет зелёного платья.", group("no-green-dress", "У меня нет зелёного платья.", "🙂❌🟢👗", 1, "scene"), "u11_no_green_dress.mp3", yesNoOptions, "da", "Да! Зелёного платья нет.", "Нет. Зелёного платья нет.")
    ]
  };

  var clothingShopGame = {
    id: "unit-11-game-clothing-shop",
    gameSlug: "unit-11-game-clothing-shop",
    kind: "clothing-shop",
    icon: "🏪",
    title: "Магазин одежды",
    findTitle: "Магазин одежды",
    finalTitle: "Супер! Магазин одежды готов! 🏪",
    finalText: "На. Спасибо.",
    finalWords: ["шапка", "куртка", "футболка"],
    rounds: [
      commandTask("u11-shop-1", "Я хочу шапку.", "u11_shop_want_shapka.mp3", shopItems, "shapka", "На. Спасибо. Да! Шапка.", "Нет. Нужна шапка."),
      commandTask("u11-shop-2", "Я хочу куртку.", "u11_shop_want_kurtka.mp3", shopItems, "kurtka", "На. Спасибо. Да! Куртка.", "Нет. Нужна куртка."),
      commandTask("u11-shop-3", "Я хочу футболку.", "u11_shop_want_futbolka.mp3", shopItems, "futbolka", "На. Спасибо. Да! Футболка.", "Нет. Нужна футболка."),
      commandTask("u11-shop-4", "Дай шарф, пожалуйста.", "u11_shop_dai_sharf.mp3", shopItems, "sharf", "На. Спасибо. Да! Шарф.", "Нет. Нужен шарф."),
      commandTask("u11-shop-5", "Дай носки, пожалуйста.", "u11_shop_dai_noski.mp3", shopItems, "noski", "На. Спасибо. Да! Носки.", "Нет. Нужны носки."),
      commandTask("u11-shop-6", "Я хочу красную футболку.", "u11_shop_want_red_shirt.mp3", shopItems, "red-shirt", "На. Спасибо. Да! Красная футболка.", "Нет. Нужна красная футболка."),
      commandTask("u11-shop-7", "Я хочу синюю шапку.", "u11_shop_want_blue_hat.mp3", shopItems, "blue-hat", "На. Спасибо. Да! Синяя шапка.", "Нет. Нужна синяя шапка."),
      commandTask("u11-shop-8", "Дай чёрную куртку, пожалуйста.", "u11_shop_dai_black_jacket.mp3", shopItems, "black-jacket", "На. Спасибо. Да! Чёрная куртка.", "Нет. Нужна чёрная куртка.")
    ]
  };

  var buildClothesGame = {
    id: "unit-11-game-build-clothes",
    gameSlug: "unit-11-game-build-clothes",
    kind: "clothing-build",
    icon: "🧍",
    title: "Собери одежду",
    findTitle: "Собери одежду",
    finalTitle: "Отлично! Одежда готова! ✅",
    finalText: "надень",
    finalWords: ["шапка", "куртка", "шарф", "обувь"],
    rounds: [
      commandTask("u11-build-1", "Надень шапку.", "u11_build_shapka.mp3", buildItems, "shapka", "Да! Шапка.", "Нет. Нужна шапка."),
      commandTask("u11-build-2", "Надень куртку.", "u11_build_kurtka.mp3", buildItems, "kurtka", "Да! Куртка.", "Нет. Нужна куртка."),
      commandTask("u11-build-3", "Надень шарф.", "u11_build_sharf.mp3", buildItems, "sharf", "Да! Шарф.", "Нет. Нужен шарф."),
      commandTask("u11-build-4", "Надень обувь.", "u11_build_obuv.mp3", buildItems, "obuv", "Да! Обувь.", "Нет. Нужна обувь."),
      commandTask("u11-build-5", "Надень красную футболку.", "u11_build_red_shirt.mp3", buildItems, "red-shirt", "Да! Красная футболка.", "Нет. Нужна красная футболка."),
      commandTask("u11-build-6", "Надень синюю шапку.", "u11_build_blue_hat.mp3", buildItems, "blue-hat", "Да! Синяя шапка.", "Нет. Нужна синяя шапка."),
      commandTask("u11-build-7", "Надень чёрную куртку.", "u11_build_black_jacket.mp3", buildItems, "black-jacket", "Да! Чёрная куртка.", "Нет. Нужна чёрная куртка."),
      commandTask("u11-build-8", "Надень белые носки.", "u11_build_white_socks.mp3", buildItems, "white-socks", "Да! Белые носки.", "Нет. Нужны белые носки.")
    ]
  };

  var clothingMapGame = {
    id: "unit-11-game-clothing-map",
    gameSlug: "unit-11-game-clothing-map",
    kind: "clothing-map",
    icon: "🗺️",
    title: "Карта одежды",
    mapTitle: "Карта одежды",
    finalTitle: "Отлично! Карта одежды готова! 🏆",
    finalText: "одежда · цвет · карта",
    finalWords: ["красная футболка", "синяя шапка", "чёрная куртка"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("home", "дом", "🏠", 1, "place", 0, 4),
      group("shop", "магазин", "🏪", 1, "place", 4, 0),
      group("red-shirt", "красная футболка", "🔴👕", 1, "clothes", 2, 1),
      group("blue-hat", "синяя шапка", "🔵🧢", 1, "clothes", 1, 0),
      group("black-jacket", "чёрная куртка", "⚫🧥", 1, "clothes", 3, 3),
      group("white-socks", "белые носки", "⚪🧦", 1, "clothes", 4, 2),
      group("yellow-scarf", "жёлтый шарф", "🟡🧣", 1, "clothes", 1, 3),
      group("green-dress", "зелёное платье", "🟢👗", 1, "clothes", 3, 1)
    ],
    rounds: [
      { id: "u11-map-1", command: "Иди к красной футболке.", text: "Иди к красной футболке.", audio: audio("u11_map_go_red_shirt.mp3"), target: "red-shirt", hint: "Нужна красная футболка.", correctFeedback: "Да! Красная футболка." },
      { id: "u11-map-2", command: "Найди синюю шапку.", text: "Найди синюю шапку.", audio: audio("u11_map_find_blue_hat.mp3"), target: "blue-hat", hint: "Нужна синяя шапка.", correctFeedback: "Да! Синяя шапка." },
      { id: "u11-map-3", command: "Найди чёрную куртку.", text: "Найди чёрную куртку.", audio: audio("u11_map_find_black_jacket.mp3"), target: "black-jacket", hint: "Нужна чёрная куртка.", correctFeedback: "Да! Чёрная куртка." },
      { id: "u11-map-4", command: "Найди белые носки.", text: "Найди белые носки.", audio: audio("u11_map_find_white_socks.mp3"), target: "white-socks", hint: "Нужны белые носки.", correctFeedback: "Да! Белые носки." },
      { id: "u11-map-5", command: "Иди в магазин.", text: "Иди в магазин.", audio: audio("u11_map_go_shop.mp3"), target: "shop", hint: "Нужен магазин.", correctFeedback: "Да! Магазин." },
      { id: "u11-map-6", command: "Иди домой.", text: "Иди домой.", audio: audio("u11_map_go_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." }
    ]
  };

  var UNIT11_GAMES = {
    whatIsItGame: whatIsItGame,
    findClothesGame: findClothesGame,
    findColorClothesGame: findColorClothesGame,
    haveClothesGame: haveClothesGame,
    clothingShopGame: clothingShopGame,
    buildClothesGame: buildClothesGame,
    clothingMapGame: clothingMapGame
  };

  root.LexiLandUnit11Lesson = {
    id: "level-0-unit-11-clothes-colors",
    order: 13,
    menuLabel: "Юнит 11",
    title: "Юнит 11: Одежда и цвета",
    subtitle: "Одежда, цвета, магазин",
    level: "Уровень 0",
    coverEmoji: "👕",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-31-odezhda", "Урок 31: Одежда", "👕", "Урок 31: Одежда", lesson31Slides),
      unit("lesson-32-tsvetnaya-odezhda", "Урок 32: Цветная одежда", "🔴", "Урок 32: Цветная одежда", lesson32Slides),
      unit("lesson-33-u-menya-est-odezhda", "Урок 33: У меня есть одежда", "🎒", "Урок 33: У меня есть одежда", lesson33Slides),
      gameUnit("unit-11-game-what-is-it", "Игра: Что это?", "👕", whatIsItGame),
      gameUnit("unit-11-game-find-clothes", "Игра 2: Найди одежду", "🔎", findClothesGame),
      gameUnit("unit-11-game-find-color-clothes", "Игра 3: Найди цветную одежду", "🔴", findColorClothesGame),
      gameUnit("unit-11-game-have-clothes", "Игра 4: У меня есть?", "🎒", haveClothesGame),
      gameUnit("unit-11-game-clothing-shop", "Игра 5: Магазин одежды", "🏪", clothingShopGame),
      gameUnit("unit-11-game-build-clothes", "Игра 6: Собери одежду", "🧍", buildClothesGame),
      gameUnit("unit-11-game-clothing-map", "Игра 7: Карта одежды", "🗺️", clothingMapGame)
    ]
  };

  root.LexiLandUnit11Games = UNIT11_GAMES;
  root.LexiLandUnit11 = root.LexiLandUnit11Lesson;
}(typeof window !== "undefined" ? window : globalThis));
