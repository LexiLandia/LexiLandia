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

  function m(word, emojiText, file) {
    return {
      word: word,
      emoji: emojiText,
      translation: "",
      audio: file ? audio(file) : ""
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
      item: item || "object",
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
    "город": m("город", "🏙️", "gorod.mp3"),
    "улица": m("улица", "🛣️", "ulitsa.mp3"),
    "улице": m("улице", "🛣️", "na_ulitse.mp3"),
    "остановка": m("остановка", "🚏", "ostanovka.mp3"),
    "остановке": m("остановке", "🚏", "avtobus_na_ostanovke.mp3"),
    "транспорт": m("транспорт", "🚌", "transport.mp3"),
    "автобус": m("автобус", "🚌", "avtobus.mp3"),
    "метро": m("метро", "🚇", "metro.mp3"),
    "машина": m("машина", "🚗", "mashina.mp3"),
    "школа": m("школа", "🏫", "shkola.mp3"),
    "школу": m("школу", "🏫", "ya_idu_v_shkolu.mp3"),
    "магазин": m("магазин", "🏪", "magazin.mp3"),
    "парк": m("парк", "🌳", "park.mp3"),
    "кафе": m("кафе", "☕", "kafe.mp3"),
    "дом": m("дом", "🏠", "dom.mp3"),
    "домой": m("домой", "🏠", "domoy.mp3"),
    "рядом": m("рядом", "↔️", "ryadom.mp3"),
    "куда": m("куда", "🧭❓", "kuda.mp3"),
    "иду": m("иду", "🚶‍➡️", "idu.mp3"),
    "еду": m("еду", "🚌", "edu.mp3"),
    "идёт": m("идёт", "🚶‍➡️", "idyot.mp3"),
    "едет": m("едет", "🚗", "edet.mp3"),
    "мама": m("мама", "👩", "mama.mp3"),
    "папа": m("папа", "👨", "papa.mp3"),
    "я": m("я", "🙂", "ya.mp3"),
    "найди": m("найди", "🔎", "naydi.mp3"),
    "на": m("на", "⬆️", "na.mp3"),
    "в": m("в", "📦", "v.mp3")
  };

  var dictionary = [
    entry("u16-gorod", "город", "🏙️", "word", "gorod.mp3"),
    entry("u16-ulitsa", "улица", "🛣️", "word", "ulitsa.mp3"),
    entry("u16-ostanovka", "остановка", "🚏", "word", "ostanovka.mp3"),
    entry("u16-transport", "транспорт", "🚌", "word", "transport.mp3"),
    entry("u16-mashina", "машина", "🚗", "word", "mashina.mp3"),
    entry("u16-ya-edu", "я еду", "🙂🚌", "chunk", "ya_edu.mp3"),
    entry("u16-edu-domoy", "еду домой", "🚌🏠", "chunk", "edu_domoy.mp3"),
    entry("u16-ya-edu-domoy", "я еду домой", "🙂🚌🏠", "chunk", "ya_edu_domoy.mp3"),
    entry("u16-ya-edu-v-shkolu", "я еду в школу", "🙂🚌🏫", "chunk", "ya_edu_v_shkolu.mp3"),
    entry("u16-avtobus-na-ostanovke", "автобус на остановке", "🚌🚏", "chunk", "avtobus_na_ostanovke.mp3"),
    entry("u16-mashina-na-ulitse", "машина на улице", "🚗🛣️", "chunk", "mashina_na_ulitse.mp3"),
    entry("u16-metro-ryadom", "метро рядом", "🚇↔️", "chunk", "metro_ryadom.mp3"),
    entry("u16-idu", "иду", "🚶‍➡️", "word", "idu.mp3"),
    entry("u16-edu", "еду", "🚌", "word", "edu.mp3"),
    entry("u16-idyot", "идёт", "🚶‍➡️", "word", "idyot.mp3"),
    entry("u16-edet", "едет", "🚗", "word", "edet.mp3"),
    entry("u16-ya-idu-v-shkolu", "я иду в школу", "🙂🚶‍➡️🏫", "chunk", "ya_idu_v_shkolu.mp3"),
    entry("u16-ya-idu-v-park", "я иду в парк", "🙂🚶‍➡️🌳", "chunk", "ya_idu_v_park.mp3"),
    entry("u16-ya-idu-v-magazin", "я иду в магазин", "🙂🚶‍➡️🏪", "chunk", "ya_idu_v_magazin.mp3"),
    entry("u16-mama-idyot-v-magazin", "мама идёт в магазин", "👩🚶‍➡️🏪", "chunk", "mama_idyot_v_magazin.mp3"),
    entry("u16-papa-edet-domoy", "папа едет домой", "👨🚗🏠", "chunk", "papa_edet_domoy.mp3"),
    entry("u16-naydi-shkolu", "найди школу", "🔎🏫", "chunk", "u16_naydi_shkolu.mp3"),
    entry("u16-naydi-ostanovku", "найди остановку", "🔎🚏", "chunk", "u16_naydi_ostanovku.mp3"),
    entry("u16-naydi-avtobus", "найди автобус", "🔎🚌", "chunk", "u16_naydi_avtobus.mp3"),
    entry("u16-naydi-metro", "найди метро", "🔎🚇", "chunk", "u16_naydi_metro.mp3"),
    entry("u16-naydi-mashinu", "найди машину", "🔎🚗", "chunk", "u16_naydi_mashinu.mp3")
  ];

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var cityOptions = [
    option("gorod", "город", "🏙️"),
    option("ulitsa", "улица", "🛣️"),
    option("ostanovka", "остановка", "🚏"),
    option("avtobus", "автобус", "🚌"),
    option("metro", "метро", "🚇"),
    option("mashina", "машина", "🚗"),
    option("shkola", "школа", "🏫"),
    option("magazin", "магазин", "🏪"),
    option("park", "парк", "🌳"),
    option("kafe", "кафе", "☕")
  ];

  var placeOptions = [
    option("shkola", "школа", "🏫"),
    option("magazin", "магазин", "🏪"),
    option("park", "парк", "🌳"),
    option("kafe", "кафе", "☕"),
    option("dom", "дом", "🏠"),
    option("ulitsa", "улица", "🛣️"),
    option("ostanovka", "остановка", "🚏")
  ];

  var transportOptions = [
    option("avtobus", "автобус", "🚌"),
    option("metro", "метро", "🚇"),
    option("mashina", "машина", "🚗"),
    option("avtobus-stop", "автобус на остановке", "🚌🚏"),
    option("mashina-street", "машина на улице", "🚗🛣️"),
    option("metro-ryadom", "метро рядом", "🚇↔️")
  ];

  var goRideOptions = [
    option("idu", "иду", "🚶‍➡️"),
    option("edu", "еду", "🚌")
  ];

  var thirdGoRideOptions = [
    option("idyot", "идёт", "🚶‍➡️"),
    option("edet", "едет", "🚗")
  ];

  var destinationOptions = [
    option("v-shkolu", "в школу", "🏫"),
    option("v-magazin", "в магазин", "🏪"),
    option("v-park", "в парк", "🌳"),
    option("v-kafe", "в кафе", "☕"),
    option("domoy", "домой", "🏠")
  ];

  var cityItems = [
    group("gorod", "город", "🏙️"),
    group("ulitsa", "улица", "🛣️"),
    group("ostanovka", "остановка", "🚏"),
    group("shkola", "школа", "🏫"),
    group("magazin", "магазин", "🏪"),
    group("park", "парк", "🌳🌳🌳"),
    group("kafe", "кафе", "🏢☕"),
    group("dom", "дом", "🏠")
  ];

  var transportItems = [
    group("avtobus", "автобус", "🚌"),
    group("metro", "метро", "🚇"),
    group("mashina", "машина", "🚗"),
    group("avtobus-stop", "автобус на остановке", "🚌🚏"),
    group("mashina-street", "машина на улице", "🚗🛣️"),
    group("metro-ryadom", "метро рядом", "🚇↔️")
  ];

  var lesson46Slides = [
    slide("u16-l46-1", "Город", ["Город."], focus(["🏙️"]), [line("Город.", "gorod.mp3")], null, true),
    slide("u16-l46-2", "Улица", ["Улица."], focus(["🛣️"]), [line("Улица.", "ulitsa.mp3")], null, true),
    slide("u16-l46-3", "Остановка", ["Остановка."], focus(["🚏"]), [line("Остановка.", "ostanovka.mp3")], null, true),
    slide("u16-l46-4", "Школа", ["Школа."], focus(["🏫"]), [line("Школа.", "shkola.mp3")], null, true),
    slide("u16-l46-5", "Магазин", ["Магазин."], focus(["🏪"]), [line("Магазин.", "magazin.mp3")], null, true),
    slide("u16-l46-6", "Парк", ["Парк."], focus(["🌳", "🌳", "🌳"]), [line("Парк.", "park.mp3")], null, true),
    slide("u16-l46-7", "Кафе", ["Кафе."], focus(["🏢", "☕"]), [line("Кафе.", "kafe.mp3")], null, true),
    slide("u16-l46-8", "Дом", ["Дом."], focus(["🏠"]), [line("Дом.", "dom.mp3")], null, true),
    slide("u16-l46-9", "Что это?", ["Что это?"], focus(["🚏"]), [line("Что это? Остановка.", "u16_l46_chto_eto_ostanovka.mp3")], [
      question("u16-l46-q1", "Что это?", placeOptions, "ostanovka", "🚏")
    ], true),
    slide("u16-l46-10", "Да или нет", ["Это парк?"], focus(["🏫", "❌"]), [line("Это парк?", "u16_l46_eto_park.mp3")], [
      question("u16-l46-q2", "Это парк?", yesNoOptions, "net", "🏫")
    ], true),
    slide("u16-l46-11", "Читай", ["Это город.", "Тут улица.", "Там школа.", "Рядом парк.", "На улице остановка."], focus(["🏙️", "📍🛣️", "👉🏫", "↔️🌳🌳🌳", "🛣️🚏"]), [line("Это город. Тут улица. Там школа. Рядом парк. На улице остановка.", "u16_l46_text.mp3")], [
      question("u16-l46-q3", "Где школа?", [option("tam", "там", "👉"), option("tut", "тут", "📍"), option("ryadom", "рядом", "↔️")], "tam", "🏫"),
      question("u16-l46-q4", "Что на улице?", placeOptions, "ostanovka", "🛣️")
    ], true),
    slide("u16-l46-12", "Отлично!", ["Отлично! ✅", "город", "улица", "остановка"], wordList([{ text: "город", emoji: "🏙️" }, { text: "улица", emoji: "🛣️" }, { text: "остановка", emoji: "🚏" }]), [line("Отлично! Город. Улица. Остановка.", "u16_l46_final.mp3")], null, true)
  ];

  var lesson47Slides = [
    slide("u16-l47-1", "Транспорт", ["Транспорт."], focus(["🚌", "🚇", "🚗"]), [line("Транспорт.", "transport.mp3")], null, true),
    slide("u16-l47-2", "Автобус", ["Автобус."], focus(["🚌"]), [line("Автобус.", "avtobus.mp3")], null, true),
    slide("u16-l47-3", "Метро", ["Метро."], focus(["🚇"]), [line("Метро.", "metro.mp3")], null, true),
    slide("u16-l47-4", "Машина", ["Машина."], focus(["🚗"]), [line("Машина.", "mashina.mp3")], null, true),
    slide("u16-l47-5", "Остановка", ["Автобус на остановке."], focus(["🚌", "🚏"]), [line("Автобус на остановке.", "avtobus_na_ostanovke.mp3")], null, true),
    slide("u16-l47-6", "Улица", ["Машина на улице."], focus(["🚗", "🛣️"]), [line("Машина на улице.", "mashina_na_ulitse.mp3")], null, true),
    slide("u16-l47-7", "Рядом", ["Метро рядом."], focus(["🚇", "↔️", "🙂"]), [line("Метро рядом.", "metro_ryadom.mp3")], null, true),
    slide("u16-l47-8", "Я еду", ["Я еду."], focus(["🙂", "🚌"]), [line("Я еду.", "ya_edu.mp3")], null, true),
    slide("u16-l47-9", "Домой", ["Я еду домой."], focus(["🙂", "🚌", "🏠"]), [line("Я еду домой.", "ya_edu_domoy.mp3")], null, true),
    slide("u16-l47-10", "Что это?", ["Что это?"], focus(["🚗"]), [line("Что это? Машина.", "u16_l47_chto_eto_mashina.mp3")], [
      question("u16-l47-q1", "Что это?", transportOptions, "mashina", "🚗")
    ], true),
    slide("u16-l47-11", "Читай", ["Я на улице.", "Автобус на остановке.", "Машина на улице.", "Я еду домой."], focus(["🙂🛣️", "🚌🚏", "🚗🛣️", "🙂🚌🏠"]), [line("Я на улице. Автобус на остановке. Машина на улице. Я еду домой.", "u16_l47_text.mp3")], [
      question("u16-l47-q2", "Что на остановке?", transportOptions, "avtobus-stop", "🚏"),
      question("u16-l47-q3", "Где машина?", [option("na-ulitse", "на улице", "🛣️"), option("ryadom", "рядом", "↔️"), option("domoy", "домой", "🏠")], "na-ulitse", "🚗")
    ], true),
    slide("u16-l47-12", "Отлично!", ["Отлично! ✅", "автобус", "метро", "машина"], wordList([{ text: "автобус", emoji: "🚌" }, { text: "метро", emoji: "🚇" }, { text: "машина", emoji: "🚗" }]), [line("Отлично! Автобус. Метро. Машина.", "u16_l47_final.mp3")], null, true)
  ];

  var lesson48Slides = [
    slide("u16-l48-1", "Куда?", ["Куда?"], focus(["🧭", "❓"]), [line("Куда?", "kuda.mp3")], null, true),
    slide("u16-l48-2", "Школа", ["Я иду в школу."], focus(["🙂", "🚶‍➡️", "🏫"]), [line("Я иду в школу.", "ya_idu_v_shkolu.mp3")], null, true),
    slide("u16-l48-3", "Парк", ["Я иду в парк."], focus(["🙂", "🚶‍➡️", "🌳🌳🌳"]), [line("Я иду в парк.", "ya_idu_v_park.mp3")], null, true),
    slide("u16-l48-4", "Магазин", ["Я иду в магазин."], focus(["🙂", "🚶‍➡️", "🏪"]), [line("Я иду в магазин.", "ya_idu_v_magazin.mp3")], null, true),
    slide("u16-l48-5", "Домой", ["Я еду домой."], focus(["🙂", "🚌", "🏠"]), [line("Я еду домой.", "ya_edu_domoy.mp3")], null, true),
    slide("u16-l48-6", "Школа", ["Я еду в школу."], focus(["🙂", "🚌", "🏫"]), [line("Я еду в школу.", "ya_edu_v_shkolu.mp3")], null, true),
    slide("u16-l48-7", "Мама", ["Мама идёт в магазин."], focus(["👩", "🚶‍➡️", "🏪"]), [line("Мама идёт в магазин.", "mama_idyot_v_magazin.mp3")], null, true),
    slide("u16-l48-8", "Папа", ["Папа едет домой."], focus(["👨", "🚗", "🏠"]), [line("Папа едет домой.", "papa_edet_domoy.mp3")], null, true),
    slide("u16-l48-9", "Автобус", ["Автобус едет в город."], focus(["🚌", "➡️", "🏙️"]), [line("Автобус едет в город.", "avtobus_edet_v_gorod.mp3")], null, true),
    slide("u16-l48-10", "Куда?", ["Куда я иду?"], focus(["🙂", "🚶‍➡️", "🏫"]), [line("Куда я иду?", "u16_l48_kuda_ya_idu.mp3")], [
      question("u16-l48-q1", "Куда я иду?", destinationOptions, "v-shkolu", "🏫")
    ], true),
    slide("u16-l48-11", "Читай", ["Утро.", "Я иду в школу.", "День.", "Мама идёт в магазин.", "Вечер.", "Папа едет домой.", "Автобус на остановке."], focus(["🌅", "🙂🚶‍➡️🏫", "☀️", "👩🚶‍➡️🏪", "🌙", "👨🚗🏠", "🚌🚏"]), [line("Утро. Я иду в школу. День. Мама идёт в магазин. Вечер. Папа едет домой. Автобус на остановке.", "u16_l48_text.mp3")], [
      question("u16-l48-q2", "Куда мама идёт?", destinationOptions, "v-magazin", "👩"),
      question("u16-l48-q3", "Куда папа едет?", destinationOptions, "domoy", "👨"),
      question("u16-l48-q4", "Что на остановке?", transportOptions, "avtobus-stop", "🚏")
    ], true),
    slide("u16-l48-12", "Отлично!", ["Отлично! ✅", "иду", "еду", "домой"], wordList([{ text: "иду", emoji: "🚶‍➡️" }, { text: "еду", emoji: "🚌" }, { text: "домой", emoji: "🏠" }]), [line("Отлично! Иду. Еду. Домой.", "u16_l48_final.mp3")], null, true)
  ];

  var whatGame = {
    id: "unit-16-game-what-task",
    kind: "city-choice",
    gameSlug: "unit-16-game-what-city",
    icon: "🏙️",
    title: "Что это?",
    finalTitle: "Отлично! Город понятен! ✅",
    finalText: "город",
    finalWords: ["улица", "автобус", "метро"],
    rounds: [
      choiceTask("u16-what-1", "Что это?", group("gorod", "город", "🏙️"), "u16_game_what_gorod.mp3", cityOptions, "gorod", "Да! Город.", "Нет. Это город."),
      choiceTask("u16-what-2", "Что это?", group("ulitsa", "улица", "🛣️"), "u16_game_what_ulitsa.mp3", cityOptions, "ulitsa", "Да! Улица.", "Нет. Это улица."),
      choiceTask("u16-what-3", "Что это?", group("ostanovka", "остановка", "🚏"), "u16_game_what_ostanovka.mp3", cityOptions, "ostanovka", "Да! Остановка.", "Нет. Это остановка."),
      choiceTask("u16-what-4", "Что это?", group("avtobus", "автобус", "🚌"), "u16_game_what_avtobus.mp3", cityOptions, "avtobus", "Да! Автобус.", "Нет. Это автобус."),
      choiceTask("u16-what-5", "Что это?", group("metro", "метро", "🚇"), "u16_game_what_metro.mp3", cityOptions, "metro", "Да! Метро.", "Нет. Это метро."),
      choiceTask("u16-what-6", "Что это?", group("mashina", "машина", "🚗"), "u16_game_what_mashina.mp3", cityOptions, "mashina", "Да! Машина.", "Нет. Это машина."),
      choiceTask("u16-what-7", "Что это?", group("shkola", "школа", "🏫"), "u16_game_what_shkola.mp3", cityOptions, "shkola", "Да! Школа.", "Нет. Это школа."),
      choiceTask("u16-what-8", "Что это?", group("magazin", "магазин", "🏪"), "u16_game_what_magazin.mp3", cityOptions, "magazin", "Да! Магазин.", "Нет. Это магазин."),
      choiceTask("u16-what-9", "Что это?", group("park", "парк", "🌳🌳🌳"), "u16_game_what_park.mp3", cityOptions, "park", "Да! Парк.", "Нет. Это парк."),
      choiceTask("u16-what-10", "Что это?", group("kafe", "кафе", "🏢☕"), "u16_game_what_kafe.mp3", cityOptions, "kafe", "Да! Кафе.", "Нет. Это кафе.")
    ]
  };

  var findPlaceGame = {
    id: "unit-16-game-find-place-task",
    kind: "city-find",
    gameSlug: "unit-16-game-find-place",
    icon: "🔎",
    title: "Найди место",
    findTitle: "Найди место",
    finalTitle: "Супер! Места найдены! ✅",
    finalText: "найди",
    finalWords: ["школа", "парк", "кафе"],
    rounds: [
      commandTask("u16-place-1", "Найди школу.", "u16_naydi_shkolu.mp3", cityItems, "shkola", "Да! Школа.", "Нет. Нужна школа."),
      commandTask("u16-place-2", "Найди магазин.", "u16_naydi_magazin.mp3", cityItems, "magazin", "Да! Магазин.", "Нет. Нужен магазин."),
      commandTask("u16-place-3", "Найди парк.", "u16_naydi_park.mp3", cityItems, "park", "Да! Парк.", "Нет. Нужен парк."),
      commandTask("u16-place-4", "Найди кафе.", "u16_naydi_kafe.mp3", cityItems, "kafe", "Да! Кафе.", "Нет. Нужно кафе."),
      commandTask("u16-place-5", "Найди дом.", "u16_naydi_dom.mp3", cityItems, "dom", "Да! Дом.", "Нет. Нужен дом."),
      commandTask("u16-place-6", "Найди улицу.", "u16_naydi_ulitsu.mp3", cityItems, "ulitsa", "Да! Улица.", "Нет. Нужна улица."),
      commandTask("u16-place-7", "Найди остановку.", "u16_naydi_ostanovku.mp3", cityItems, "ostanovka", "Да! Остановка.", "Нет. Нужна остановка.")
    ]
  };

  var findTransportGame = {
    id: "unit-16-game-find-transport-task",
    kind: "city-find",
    gameSlug: "unit-16-game-find-transport",
    icon: "🚌",
    title: "Найди транспорт",
    findTitle: "Найди транспорт",
    finalTitle: "Отлично! Транспорт найден! ✅",
    finalText: "транспорт",
    finalWords: ["автобус", "метро", "машина"],
    rounds: [
      commandTask("u16-transport-1", "Найди автобус.", "u16_naydi_avtobus.mp3", transportItems, "avtobus", "Да! Автобус.", "Нет. Нужен автобус."),
      commandTask("u16-transport-2", "Найди метро.", "u16_naydi_metro.mp3", transportItems, "metro", "Да! Метро.", "Нет. Нужно метро."),
      commandTask("u16-transport-3", "Найди машину.", "u16_naydi_mashinu.mp3", transportItems, "mashina", "Да! Машина.", "Нет. Нужна машина."),
      commandTask("u16-transport-4", "Найди автобус на остановке.", "u16_naydi_avtobus_na_ostanovke.mp3", transportItems, "avtobus-stop", "Да! Автобус на остановке.", "Нет. Нужен автобус на остановке."),
      commandTask("u16-transport-5", "Найди машину на улице.", "u16_naydi_mashinu_na_ulitse.mp3", transportItems, "mashina-street", "Да! Машина на улице.", "Нет. Нужна машина на улице."),
      commandTask("u16-transport-6", "Найди метро рядом.", "u16_naydi_metro_ryadom.mp3", transportItems, "metro-ryadom", "Да! Метро рядом.", "Нет. Нужно метро рядом.")
    ]
  };

  var goRideGame = {
    id: "unit-16-game-go-or-ride-task",
    kind: "city-choice",
    gameSlug: "unit-16-game-go-or-ride",
    icon: "🚶‍➡️",
    title: "Иду или еду?",
    finalTitle: "Отлично! Иду и еду! ✅",
    finalText: "иду · еду",
    finalWords: ["иду", "еду", "едет"],
    rounds: [
      choiceTask("u16-go-1", "Я иду или еду?", group("walk-school", "я иду в школу", "🙂🚶‍➡️🏫"), "u16_go_school.mp3", goRideOptions, "idu", "Да! Иду.", "Нет. Иду."),
      choiceTask("u16-go-2", "Я иду или еду?", group("walk-park", "я иду в парк", "🙂🚶‍➡️🌳"), "u16_go_park.mp3", goRideOptions, "idu", "Да! Иду.", "Нет. Иду."),
      choiceTask("u16-go-3", "Я иду или еду?", group("walk-shop", "я иду в магазин", "🙂🚶‍➡️🏪"), "u16_go_shop.mp3", goRideOptions, "idu", "Да! Иду.", "Нет. Иду."),
      choiceTask("u16-go-4", "Я иду или еду?", group("ride-bus", "я еду", "🙂🚌"), "u16_ride_bus.mp3", goRideOptions, "edu", "Да! Еду.", "Нет. Еду."),
      choiceTask("u16-go-5", "Я иду или еду?", group("ride-car", "я еду", "🙂🚗"), "u16_ride_car.mp3", goRideOptions, "edu", "Да! Еду.", "Нет. Еду."),
      choiceTask("u16-go-6", "Я иду или еду?", group("ride-metro", "я еду", "🙂🚇"), "u16_ride_metro.mp3", goRideOptions, "edu", "Да! Еду.", "Нет. Еду."),
      choiceTask("u16-go-7", "Мама идёт или едет?", group("mama-walk", "мама идёт", "👩🚶‍➡️🏪"), "u16_mama_idet.mp3", thirdGoRideOptions, "idyot", "Да! Идёт.", "Нет. Идёт."),
      choiceTask("u16-go-8", "Папа идёт или едет?", group("papa-rides", "папа едет", "👨🚗🏠"), "u16_papa_edet.mp3", thirdGoRideOptions, "edet", "Да! Едет.", "Нет. Едет.")
    ]
  };

  var whereToGame = {
    id: "unit-16-game-kuda-task",
    kind: "city-choice",
    gameSlug: "unit-16-game-kuda",
    icon: "🧭",
    title: "Куда?",
    finalTitle: "Отлично! Маршрут понятен! ✅",
    finalText: "куда?",
    finalWords: ["в школу", "в парк", "домой"],
    rounds: [
      choiceTask("u16-kuda-1", "Куда я иду?", group("to-school", "я иду в школу", "🙂🚶‍➡️🏫"), "u16_kuda_ya_idu_v_shkolu.mp3", destinationOptions, "v-shkolu", "Да! В школу.", "Нет. В школу."),
      choiceTask("u16-kuda-2", "Куда я иду?", group("to-park", "я иду в парк", "🙂🚶‍➡️🌳"), "u16_kuda_ya_idu_v_park.mp3", destinationOptions, "v-park", "Да! В парк.", "Нет. В парк."),
      choiceTask("u16-kuda-3", "Куда я иду?", group("to-shop", "я иду в магазин", "🙂🚶‍➡️🏪"), "u16_kuda_ya_idu_v_magazin.mp3", destinationOptions, "v-magazin", "Да! В магазин.", "Нет. В магазин."),
      choiceTask("u16-kuda-4", "Куда я иду?", group("to-cafe", "я иду в кафе", "🙂🚶‍➡️☕"), "u16_kuda_ya_idu_v_kafe.mp3", destinationOptions, "v-kafe", "Да! В кафе.", "Нет. В кафе."),
      choiceTask("u16-kuda-5", "Куда я еду?", group("ride-home", "я еду домой", "🙂🚌🏠"), "u16_kuda_ya_edu_domoy.mp3", destinationOptions, "domoy", "Да! Домой.", "Нет. Домой."),
      choiceTask("u16-kuda-6", "Куда я еду?", group("ride-school", "я еду в школу", "🙂🚌🏫"), "u16_kuda_ya_edu_v_shkolu.mp3", destinationOptions, "v-shkolu", "Да! В школу.", "Нет. В школу."),
      choiceTask("u16-kuda-7", "Куда мама идёт?", group("mama-shop", "мама идёт в магазин", "👩🚶‍➡️🏪"), "u16_kuda_mama_idyot_v_magazin.mp3", destinationOptions, "v-magazin", "Да! В магазин.", "Нет. В магазин."),
      choiceTask("u16-kuda-8", "Куда папа едет?", group("papa-home", "папа едет домой", "👨🚗🏠"), "u16_kuda_papa_edet_domoy.mp3", destinationOptions, "domoy", "Да! Домой.", "Нет. Домой.")
    ]
  };

  var citySceneSlides = [
    slide("u16-scene-1", "Городская сцена", ["Это город.", "На улице автобус.", "Автобус на остановке.", "Я еду домой."], focus(["🏙️", "🛣️🚌", "🚌🚏", "🙂🚌🏠"]), [line("Это город. На улице автобус. Автобус на остановке. Я еду домой.", "u16_scene_1.mp3")], [
      question("u16-scene-q1", "Что на улице?", transportOptions, "avtobus", "🛣️"),
      question("u16-scene-q2", "Где автобус?", [option("na-ostanovke", "на остановке", "🚏"), option("ryadom", "рядом", "↔️"), option("domoy", "домой", "🏠")], "na-ostanovke", "🚌"),
      question("u16-scene-q3", "Куда я еду?", destinationOptions, "domoy", "🙂")
    ], true),
    slide("u16-scene-2", "Городская сцена", ["Утро.", "Я иду в школу.", "Мама идёт в магазин.", "Парк рядом."], focus(["🌅", "🙂🚶‍➡️🏫", "👩🚶‍➡️🏪", "🌳↔️"]), [line("Утро. Я иду в школу. Мама идёт в магазин. Парк рядом.", "u16_scene_2.mp3")], [
      question("u16-scene-q4", "Куда я иду?", destinationOptions, "v-shkolu", "🙂"),
      question("u16-scene-q5", "Куда мама идёт?", destinationOptions, "v-magazin", "👩"),
      question("u16-scene-q6", "Что рядом?", placeOptions, "park", "↔️")
    ], true),
    slide("u16-scene-3", "Городская сцена", ["Вечер.", "Папа едет домой.", "Машина на улице.", "Кафе рядом."], focus(["🌙", "👨🚗🏠", "🚗🛣️", "☕↔️"]), [line("Вечер. Папа едет домой. Машина на улице. Кафе рядом.", "u16_scene_3.mp3")], [
      question("u16-scene-q7", "Кто едет домой?", [option("papa", "папа", "👨"), option("mama", "мама", "👩"), option("ya", "я", "🙂")], "papa", "🚗"),
      question("u16-scene-q8", "Где машина?", [option("na-ulitse", "на улице", "🛣️"), option("v-kafe", "в кафе", "☕"), option("v-parke", "в парке", "🌳")], "na-ulitse", "🚗"),
      question("u16-scene-q9", "Что рядом?", placeOptions, "kafe", "↔️")
    ], true),
    slide("u16-scene-4", "Отлично!", ["Отлично! ✅", "город", "улица", "транспорт"], wordList([{ text: "город", emoji: "🏙️" }, { text: "улица", emoji: "🛣️" }, { text: "транспорт", emoji: "🚌" }]), [line("Отлично! Город. Улица. Транспорт.", "u16_scene_final.mp3")], null, true)
  ];

  var cityMapGame = {
    id: "unit-16-game-city-map-task",
    kind: "city-map",
    gameSlug: "unit-16-game-city-map",
    icon: "🗺️",
    title: "Карта города",
    mapTitle: "Карта города",
    finalTitle: "Отлично! Карта города готова! 🏆",
    finalText: "город · транспорт",
    finalWords: ["школа", "автобус", "метро"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("dom", "дом", "🏠", 1, "place", 0, 4),
      group("shkola", "школа", "🏫", 1, "place", 4, 0),
      group("magazin", "магазин", "🏪", 1, "place", 3, 1),
      group("park", "парк", "🌳", 1, "place", 1, 1),
      group("kafe", "кафе", "☕", 1, "place", 2, 4),
      group("ulitsa", "улица", "🛣️", 1, "place", 2, 2),
      group("ostanovka", "остановка", "🚏", 1, "place", 0, 1),
      group("avtobus", "автобус", "🚌", 1, "transport", 0, 2),
      group("metro", "метро", "🚇", 1, "transport", 4, 3),
      group("mashina", "машина", "🚗", 1, "transport", 3, 3)
    ],
    rounds: [
      { id: "u16-map-1", command: "Иди в школу.", text: "Иди в школу.", audio: audio("u16_map_go_school.mp3"), target: "shkola", hint: "Нужна школа.", correctFeedback: "Да! Школа." },
      { id: "u16-map-2", command: "Иди в парк.", text: "Иди в парк.", audio: audio("u16_map_go_park.mp3"), target: "park", hint: "Нужен парк.", correctFeedback: "Да! Парк." },
      { id: "u16-map-3", command: "Иди в магазин.", text: "Иди в магазин.", audio: audio("u16_map_go_magazin.mp3"), target: "magazin", hint: "Нужен магазин.", correctFeedback: "Да! Магазин." },
      { id: "u16-map-4", command: "Иди в кафе.", text: "Иди в кафе.", audio: audio("u16_map_go_kafe.mp3"), target: "kafe", hint: "Нужно кафе.", correctFeedback: "Да! Кафе." },
      { id: "u16-map-5", command: "Иди домой.", text: "Иди домой.", audio: audio("idi_domoy.mp3"), target: "dom", hint: "Нужен дом.", correctFeedback: "Да! Дом." },
      { id: "u16-map-6", command: "Найди автобус.", text: "Найди автобус.", audio: audio("u16_naydi_avtobus.mp3"), target: "avtobus", hint: "Нужен автобус.", correctFeedback: "Да! Автобус." },
      { id: "u16-map-7", command: "Найди метро.", text: "Найди метро.", audio: audio("u16_naydi_metro.mp3"), target: "metro", hint: "Нужно метро.", correctFeedback: "Да! Метро." },
      { id: "u16-map-8", command: "Найди машину.", text: "Найди машину.", audio: audio("u16_naydi_mashinu.mp3"), target: "mashina", hint: "Нужна машина.", correctFeedback: "Да! Машина." },
      { id: "u16-map-9", command: "Найди остановку.", text: "Найди остановку.", audio: audio("u16_naydi_ostanovku.mp3"), target: "ostanovka", hint: "Нужна остановка.", correctFeedback: "Да! Остановка." },
      { id: "u16-map-10", command: "Автобус на остановке. Найди автобус.", text: "Автобус на остановке. Найди автобус.", audio: audio("u16_map_find_bus_stop.mp3"), target: "avtobus", hint: "Нужен автобус.", correctFeedback: "Да! Автобус." },
      { id: "u16-map-11", command: "Машина на улице. Найди машину.", text: "Машина на улице. Найди машину.", audio: audio("u16_map_find_car_street.mp3"), target: "mashina", hint: "Нужна машина.", correctFeedback: "Да! Машина." }
    ]
  };

  root.LexiLandUnit16Lesson = {
    id: "level-0-unit-16-city-transport",
    order: 18,
    menuLabel: "Юнит 16",
    shortTitle: "Город",
    title: "Юнит 16: Город и транспорт",
    subtitle: "Город, места, транспорт",
    level: "Уровень 0",
    coverEmoji: "🏙️",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-46-city", "Урок 46: Город", "🏙️", "Урок 46: Город", lesson46Slides),
      unit("lesson-47-transport", "Урок 47: Транспорт", "🚌", "Урок 47: Транспорт", lesson47Slides),
      unit("lesson-48-where-am-i-going", "Урок 48: Куда я еду?", "🧭", "Урок 48: Куда я еду?", lesson48Slides),
      gameUnit("unit-16-game-what", "Игра: Что это?", "🏙️", whatGame),
      gameUnit("unit-16-game-find-place", "Игра 2: Найди место", "🔎", findPlaceGame),
      gameUnit("unit-16-game-find-transport", "Игра 3: Найди транспорт", "🚌", findTransportGame),
      gameUnit("unit-16-game-go-or-ride", "Игра 4: Иду или еду?", "🚶‍➡️", goRideGame),
      gameUnit("unit-16-game-kuda", "Игра 5: Куда?", "🧭", whereToGame),
      unit("unit-16-game-city-scene", "Игра 6: Городская сцена", "📖", "Игра 6: Городская сцена", citySceneSlides),
      gameUnit("unit-16-game-city-map", "Игра 7: Карта города", "🗺️", cityMapGame)
    ]
  };

  root.LexiLandUnit16Games = {
    whatGame: whatGame,
    findPlaceGame: findPlaceGame,
    findTransportGame: findTransportGame,
    goRideGame: goRideGame,
    whereToGame: whereToGame,
    cityMapGame: cityMapGame
  };
  root.LexiLandUnit16 = root.LexiLandUnit16Lesson;
}(typeof window !== "undefined" ? window : globalThis));
