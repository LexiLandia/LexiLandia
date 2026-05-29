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
      item: item || "thing",
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

  var meanings = {
    "утро": m("утро", "🌅"),
    "утром": m("утром", "🌅"),
    "день": m("день", "☀️"),
    "днём": m("днём", "☀️"),
    "вечер": m("вечер", "🌙"),
    "вечером": m("вечером", "🌙"),
    "мой": m("мой", "🙂"),
    "дома": m("дома", "🏠"),
    "домой": m("домой", "🏠"),
    "семья": m("семья", "👨‍👩‍👧"),
    "школа": m("школа", "🏫"),
    "школе": m("школе", "🏫"),
    "парк": m("парк", "🌳"),
    "парке": m("парке", "🌳"),
    "кафе": m("кафе", "🏢☕"),
    "сейчас": m("сейчас", "👀"),
    "потом": m("потом", "➡️"),
    "я": m("я", "🙂"),
    "мама": m("мама", "👩"),
    "папа": m("папа", "👨"),
    "кот": m("кот", "🐱"),
    "собака": m("собака", "🐶"),
    "мальчик": m("мальчик", "👦"),
    "девочка": m("девочка", "👧"),
    "спит": m("спит", "😴"),
    "пью": m("пью", "💧"),
    "пьёт": m("пьёт", "💧"),
    "ем": m("ем", "🍎"),
    "ест": m("ест", "🍎"),
    "читает": m("читает", "📖"),
    "играет": m("играет", "⚽"),
    "идёт": m("идёт", "🚶‍➡️"),
    "иду": m("иду", "🚶‍➡️"),
    "сидит": m("сидит", "🪑"),
    "вода": m("вода", "💧"),
    "воду": m("воду", "💧"),
    "яблоко": m("яблоко", "🍎"),
    "яблок": m("яблок", "🍎"),
    "книга": m("книга", "📖"),
    "книгу": m("книгу", "📖"),
    "книги": m("книги", "📚"),
    "стол": m("стол", "🪑"),
    "столе": m("столе", "🪑"),
    "под": m("под", "⬇️"),
    "рядом": m("рядом", "↔️"),
    "на": m("на", "⬆️"),
    "где": m("где", "❓📍"),
    "кто": m("кто", "❓👤"),
    "что": m("что", "❓"),
    "куда": m("куда", "🧭❓"),
    "сколько": m("сколько", "🔢"),
    "два": m("два", "2️⃣"),
    "две": m("две", "2️⃣"),
    "три": m("три", "3️⃣"),
    "красная": m("красная", "🔴"),
    "маленький": m("маленький", "🐭"),
    "есть": m("есть", "✅")
  };

  var dictionary = [
    entry("u9-utro", "утро", "🌅", "word", "utro.mp3"),
    entry("u9-utrom", "утром", "🌅", "word", "utrom.mp3"),
    entry("u9-den", "день", "☀️", "word", "den.mp3"),
    entry("u9-dnem", "днём", "☀️", "word", "dnem.mp3"),
    entry("u9-vecher", "вечер", "🌙", "word", "vecher.mp3"),
    entry("u9-vecherom", "вечером", "🌙", "word", "vecherom.mp3"),
    entry("u9-moy-den", "мой день", "🌅☀️🌙", "chunk", "moy_den.mp3"),
    entry("u9-doma", "дома", "🏠", "word", "doma.mp3"),
    entry("u9-domoy", "домой", "🏠", "word", "domoy.mp3"),
    entry("u9-semya", "семья", "👨‍👩‍👧", "word", "semya.mp3"),
    entry("u9-shkola", "школа", "🏫", "word", "shkola.mp3"),
    entry("u9-park", "парк", "🌳", "word", "park.mp3"),
    entry("u9-kafe", "кафе", "🏢☕", "word", "kafe.mp3"),
    entry("u9-seychas", "сейчас", "👀", "word", "seychas.mp3"),
    entry("u9-potom", "потом", "➡️", "word", "potom.mp3"),
    entry("u9-ya-doma", "я дома", "🙂🏠", "chunk", "ya_doma.mp3"),
    entry("u9-mama-doma", "мама дома", "👩🏠", "chunk", "mama_doma.mp3"),
    entry("u9-papa-doma", "папа дома", "👨🏠", "chunk", "papa_doma.mp3"),
    entry("u9-kot-spit", "кот спит", "🐱😴", "chunk", "kot_spit.mp3"),
    entry("u9-ya-em", "я ем", "🙂🍎", "chunk", "ya_em.mp3"),
    entry("u9-ya-pyu", "я пью", "🙂💧", "chunk", "ya_pyu.mp3")
  ];

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var timeOptions = [
    option("morning", "утро", "🌅"),
    option("day", "день", "☀️"),
    option("evening", "вечер", "🌙")
  ];

  var actionOptions = [
    option("est", "ест", "🍎"),
    option("pyot", "пьёт", "💧"),
    option("chitaet", "читает", "📖"),
    option("igraet", "играет", "⚽"),
    option("spit", "спит", "😴"),
    option("idyot", "идёт", "🚶‍➡️"),
    option("sidit", "сидит", "🪑")
  ];

  var placeOptions = [
    option("doma", "дома", "🏠"),
    option("school", "в школе", "🏫"),
    option("cafe", "в кафе", "🏢☕"),
    option("park", "в парке", "🌳"),
    option("under-table", "под столом", "⬇️🪑"),
    option("near-house", "рядом с домом", "↔️🏠")
  ];

  var lesson25Slides = [
    slide("u9-l25-1", "Утро", ["Утро."], focus(["🌅", "🏠"]), [line("Утро.", "u9_l25_utro.mp3")], null, true),
    slide("u9-l25-2", "я дома", ["Я дома."], focus(["🙂", "🏠"]), [line("Я дома.", "ya_doma.mp3")], null, true),
    slide("u9-l25-3", "мама дома", ["Мама дома.", "Папа дома."], focus(["👩", "👨", "🏠"]), [line("Мама дома. Папа дома.", "u9_l25_mama_papa_doma.mp3")], null, true),
    slide("u9-l25-4", "кот спит", ["Кот спит."], focus(["🐱", "😴"]), [line("Кот спит.", "kot_spit.mp3")], null, true),
    slide("u9-l25-5", "я пью", ["Я пью воду."], focus(["🙂", "💧"]), [line("Я пью воду.", "u9_l25_ya_pyu_vodu.mp3")], null, true),
    slide("u9-l25-6", "я ем", ["Я ем яблоко."], focus(["🙂", "🍎"]), [line("Я ем яблоко.", "u9_l25_ya_em_yabloko.mp3")], null, true),
    slide("u9-l25-7", "книга", ["У меня есть книга."], focus(["🙂", "✅", "📖"]), [line("У меня есть книга.", "u_menya_est_kniga.mp3")], null, true),
    slide("u9-l25-8", "два яблока", ["На столе два яблока."], focus(["🪑", "🍎", "🍎"]), [line("На столе два яблока.", "u9_l25_na_stole_dva_yabloka.mp3")], null, true),
    slide("u9-l25-9", "Где?", ["Где я?"], focus(["🙂", "🏠"]), [line("Где я?", "gde_ya.mp3")], [
      question("u9-l25-q1", "Где я?", [option("doma", "дома", "🏠"), option("school", "в школе", "🏫"), option("cafe", "в кафе", "🏢☕")], "doma", "🙂")
    ], true),
    slide("u9-l25-10", "Читай", ["Утро.", "Я дома.", "Мама дома.", "Кот спит.", "Я пью воду.", "На столе два яблока."], focus(["🌅🏠", "👩🏠", "🐱😴", "💧", "🪑🍎🍎"]), [line("Утро. Я дома. Мама дома. Кот спит. Я пью воду. На столе два яблока.", "u9_l25_text.mp3")], [
      question("u9-l25-q2", "Кто дома?", [option("mama", "мама", "👩"), option("dog", "собака", "🐶"), option("boy", "мальчик", "👦")], "mama", "🏠"),
      question("u9-l25-q3", "Что делает кот?", [option("spit", "спит", "😴"), option("idyot", "идёт", "🚶‍➡️"), option("est", "ест", "🍎")], "spit", "🐱"),
      question("u9-l25-q4", "Что я пью?", [option("vodu", "воду", "💧"), option("yabloko", "яблоко", "🍎"), option("hleb", "хлеб", "🍞")], "vodu", "🙂"),
      question("u9-l25-q5", "Сколько яблок?", [option("two", "два", "2️⃣"), option("one", "одно", "1️⃣"), option("three", "три", "3️⃣")], "two", "🍎🍎")
    ], true),
    slide("u9-l25-11", "Отлично!", ["Отлично! ✅", "утро", "дома", "кот спит"], wordList([{ text: "утро", emoji: "🌅" }, { text: "дома", emoji: "🏠" }, { text: "кот спит", emoji: "🐱😴" }]), [line("Отлично! Утро. Дома. Кот спит.", "u9_l25_final.mp3")], null, true)
  ];

  var lesson26Slides = [
    slide("u9-l26-1", "День", ["День."], focus(["☀️", "🏫", "🌳", "🏢☕"]), [line("День.", "u9_l26_den.mp3")], null, true),
    slide("u9-l26-2", "школа", ["Я иду в школу."], focus(["🙂", "🚶‍➡️", "🏫"]), [line("Я иду в школу.", "ya_idu_v_shkolu.mp3")], null, true),
    slide("u9-l26-3", "читает", ["Мальчик читает книгу."], focus(["👦", "📖"]), [line("Мальчик читает книгу.", "u9_l26_malchik_chitaet_knigu.mp3")], null, true),
    slide("u9-l26-4", "парк", ["Девочка играет в парке."], focus(["👧", "⚽", "🌳"]), [line("Девочка играет в парке.", "u9_l26_devochka_igraet_v_parke.mp3")], null, true),
    slide("u9-l26-5", "кафе", ["Мама пьёт воду в кафе."], focus(["👩", "💧", "🏢☕"]), [line("Мама пьёт воду в кафе.", "u9_l26_mama_pyot_vodu_v_kafe.mp3")], null, true),
    slide("u9-l26-6", "книга", ["На столе красная книга."], focus(["🪑", "🔴📖"]), [line("На столе красная книга.", "u9_l26_na_stole_krasnaya_kniga.mp3")], null, true),
    slide("u9-l26-7", "кот", ["Рядом маленький кот."], focus(["↔️", "🐱"]), [line("Рядом маленький кот.", "u9_l26_ryadom_malenkiy_kot.mp3")], null, true),
    slide("u9-l26-8", "Куда?", ["Куда я иду?"], focus(["🙂", "🚶‍➡️", "🏫"]), [line("Куда я иду?", "kuda_ya_idu.mp3")], [
      question("u9-l26-q1", "Куда я иду?", [option("school", "в школу", "🏫"), option("park", "в парк", "🌳"), option("cafe", "в кафе", "🏢☕")], "school", "🙂")
    ], true),
    slide("u9-l26-9", "Читай", ["День.", "Я иду в школу.", "В школе мальчик читает.", "В парке девочка играет.", "В кафе мама пьёт воду."], focus(["☀️", "🙂🚶‍➡️🏫", "👦📖", "👧⚽🌳", "👩💧🏢☕"]), [line("День. Я иду в школу. В школе мальчик читает. В парке девочка играет. В кафе мама пьёт воду.", "u9_l26_text.mp3")], [
      question("u9-l26-q2", "Где мальчик?", placeOptions, "school", "👦"),
      question("u9-l26-q3", "Что делает мальчик?", actionOptions, "chitaet", "👦"),
      question("u9-l26-q4", "Где девочка?", placeOptions, "park", "👧"),
      question("u9-l26-q5", "Что делает мама?", actionOptions, "pyot", "👩")
    ], true),
    slide("u9-l26-10", "Отлично!", ["Отлично! ✅", "день", "школа", "парк", "кафе"], wordList([{ text: "день", emoji: "☀️" }, { text: "школа", emoji: "🏫" }, { text: "парк", emoji: "🌳" }, { text: "кафе", emoji: "🏢☕" }]), [line("Отлично! День. Школа. Парк. Кафе.", "u9_l26_final.mp3")], null, true)
  ];

  var lesson27Slides = [
    slide("u9-l27-1", "Вечер", ["Вечер."], focus(["🌙", "🏠"]), [line("Вечер.", "u9_l27_vecher.mp3")], null, true),
    slide("u9-l27-2", "домой", ["Я иду домой."], focus(["🙂", "🚶‍➡️", "🏠"]), [line("Я иду домой.", "ya_idu_domoy.mp3")], null, true),
    slide("u9-l27-3", "семья", ["Дома мама и папа."], focus(["🏠", "👩", "👨"]), [line("Дома мама и папа.", "u9_l27_doma_mama_i_papa.mp3")], null, true),
    slide("u9-l27-4", "папа", ["Папа читает книгу."], focus(["👨", "📖"]), [line("Папа читает книгу.", "u9_l27_papa_chitaet_knigu.mp3")], null, true),
    slide("u9-l27-5", "мама", ["Мама ест яблоко."], focus(["👩", "🍎"]), [line("Мама ест яблоко.", "u9_l27_mama_est_yabloko.mp3")], null, true),
    slide("u9-l27-6", "кот", ["Кот рядом с домом."], focus(["🐱", "↔️", "🏠"]), [line("Кот рядом с домом.", "u9_l27_kot_ryadom_s_domom.mp3")], null, true),
    slide("u9-l27-7", "собака", ["Собака под столом."], focus(["🐶", "⬇️", "🪑"]), [line("Собака под столом.", "u9_l27_sobaka_pod_stolom.mp3")], null, true),
    slide("u9-l27-8", "три книги", ["На столе три книги."], focus(["🪑", "📖", "📖", "📖"]), [line("На столе три книги.", "u9_l27_na_stole_tri_knigi.mp3")], null, true),
    slide("u9-l27-9", "Читай", ["Вечер.", "Я иду домой.", "Дома мама и папа.", "Папа читает книгу.", "Мама ест яблоко.", "Собака под столом.", "На столе три книги."], focus(["🌙", "🙂🚶‍➡️🏠", "👩👨", "👨📖", "👩🍎", "🐶⬇️🪑", "📖📖📖"]), [line("Вечер. Я иду домой. Дома мама и папа. Папа читает книгу. Мама ест яблоко. Собака под столом. На столе три книги.", "u9_l27_text.mp3")], [
      question("u9-l27-q1", "Куда я иду?", [option("domoy", "домой", "🏠"), option("school", "в школу", "🏫"), option("park", "в парк", "🌳")], "domoy", "🙂"),
      question("u9-l27-q2", "Кто дома?", [option("mama-papa", "мама и папа", "👩👨"), option("cat-dog", "кот и собака", "🐱🐶"), option("boy-girl", "мальчик и девочка", "👦👧")], "mama-papa", "🏠"),
      question("u9-l27-q3", "Что делает папа?", actionOptions, "chitaet", "👨"),
      question("u9-l27-q4", "Где собака?", placeOptions, "under-table", "🐶"),
      question("u9-l27-q5", "Сколько книг?", [option("three", "три", "3️⃣"), option("two", "две", "2️⃣"), option("one", "одна", "1️⃣")], "three", "📖📖📖")
    ], true),
    slide("u9-l27-10", "Отлично!", ["Отлично! ✅", "вечер", "домой", "семья"], wordList([{ text: "вечер", emoji: "🌙" }, { text: "домой", emoji: "🏠" }, { text: "семья", emoji: "👨‍👩‍👧" }]), [line("Отлично! Вечер. Домой. Семья.", "u9_l27_final.mp3")], null, true)
  ];

  var timeGame = {
    id: "unit-9-game-time",
    gameSlug: "unit-9-game-time",
    kind: "day-choice",
    icon: "🌅",
    title: "Утро, день или вечер?",
    finalTitle: "Отлично! Мой день готов! ✅",
    finalText: "утро · день · вечер",
    finalWords: ["утро", "день", "вечер"],
    rounds: [
      choiceTask("u9-time-1", "Когда?", group("morning-home-cat", "Я дома. Кот спит.", "🌅🏠🐱😴", 1, "scene"), "u9_game_time_morning_home_cat.mp3", timeOptions, "morning", "Да! Утро.", "Нет. Смотри ещё."),
      choiceTask("u9-time-2", "Когда?", group("day-school", "Я иду в школу.", "☀️🙂🚶‍➡️🏫", 1, "scene"), "u9_game_time_day_school.mp3", timeOptions, "day", "Да! День.", "Нет. Смотри ещё."),
      choiceTask("u9-time-3", "Когда?", group("evening-home", "Я иду домой.", "🌙🙂🚶‍➡️🏠", 1, "scene"), "u9_game_time_evening_home.mp3", timeOptions, "evening", "Да! Вечер.", "Нет. Смотри ещё."),
      choiceTask("u9-time-4", "Когда?", group("day-cafe", "Мама пьёт воду в кафе.", "☀️👩💧🏢☕", 1, "scene"), "u9_game_time_day_cafe.mp3", timeOptions, "day", "Да! День.", "Нет. Смотри ещё."),
      choiceTask("u9-time-5", "Когда?", group("evening-papa", "Папа читает дома.", "🌙👨📖🏠", 1, "scene"), "u9_game_time_evening_papa.mp3", timeOptions, "evening", "Да! Вечер.", "Нет. Смотри ещё."),
      choiceTask("u9-time-6", "Когда?", group("morning-apple", "Я ем яблоко дома.", "🌅🙂🍎🏠", 1, "scene"), "u9_game_time_morning_apple.mp3", timeOptions, "morning", "Да! Утро.", "Нет. Смотри ещё.")
    ]
  };

  var myDayGame = {
    id: "unit-9-game-my-day",
    gameSlug: "unit-9-game-my-day",
    kind: "day-choice",
    icon: "🌅",
    title: "Мой день",
    finalTitle: "Хорошо! День по порядку! ✅",
    finalText: "утро → день → вечер",
    finalWords: ["утро", "день", "вечер"],
    rounds: [
      choiceTask("u9-myday-1", "Когда?", group("myday-water", "Я пью воду дома.", "🌅🙂💧🏠", 1, "scene"), "u9_myday_water_home.mp3", timeOptions, "morning", "Да! Утро.", "Нет. Смотри ещё."),
      choiceTask("u9-myday-2", "Когда?", group("myday-school", "Я иду в школу.", "☀️🙂🚶‍➡️🏫", 1, "scene"), "u9_myday_school.mp3", timeOptions, "day", "Да! День.", "Нет. Смотри ещё."),
      choiceTask("u9-myday-3", "Когда?", group("myday-home", "Я иду домой.", "🌙🙂🚶‍➡️🏠", 1, "scene"), "u9_myday_home.mp3", timeOptions, "evening", "Да! Вечер.", "Нет. Смотри ещё."),
      choiceTask("u9-myday-4", "Когда?", group("myday-park", "Девочка играет в парке.", "☀️👧⚽🌳", 1, "scene"), "u9_myday_park.mp3", timeOptions, "day", "Да! День.", "Нет. Смотри ещё."),
      choiceTask("u9-myday-5", "Когда?", group("myday-family", "Дома мама и папа.", "🌙🏠👩👨", 1, "scene"), "u9_myday_family.mp3", timeOptions, "evening", "Да! Вечер.", "Нет. Смотри ещё."),
      choiceTask("u9-myday-6", "Когда?", group("myday-cat", "Кот спит.", "🌅🐱😴", 1, "scene"), "u9_myday_cat.mp3", timeOptions, "morning", "Да! Утро.", "Нет. Смотри ещё.")
    ]
  };

  var actionGame = {
    id: "unit-9-game-actions",
    gameSlug: "unit-9-game-actions",
    kind: "day-choice",
    icon: "🎬",
    title: "Кто что делает?",
    finalTitle: "Отлично! Действия понятны! ✅",
    finalText: "ест · пьёт · читает · играет · спит",
    finalWords: ["мама пьёт", "папа читает", "кот спит"],
    rounds: [
      choiceTask("u9-action-1", "Что делает мама?", group("mama-drinks", "Мама пьёт воду.", "👩💧", 1, "scene"), "u9_action_mama_pyot.mp3", actionOptions, "pyot", "Да! Мама пьёт.", "Нет. Смотри ещё."),
      choiceTask("u9-action-2", "Что делает папа?", group("papa-reads", "Папа читает книгу.", "👨📖", 1, "scene"), "u9_action_papa_chitaet.mp3", actionOptions, "chitaet", "Да! Папа читает.", "Нет. Смотри ещё."),
      choiceTask("u9-action-3", "Что делает кот?", group("cat-sleeps", "Кот спит.", "🐱😴", 1, "scene"), "u9_action_kot_spit.mp3", actionOptions, "spit", "Да! Кот спит.", "Нет. Смотри ещё."),
      choiceTask("u9-action-4", "Что делает девочка?", group("girl-plays", "Девочка играет.", "👧⚽", 1, "scene"), "u9_action_devochka_igraet.mp3", actionOptions, "igraet", "Да! Девочка играет.", "Нет. Смотри ещё."),
      choiceTask("u9-action-5", "Что делает мальчик?", group("boy-walks", "Мальчик идёт в школу.", "👦🚶‍➡️🏫", 1, "scene"), "u9_action_malchik_idyot.mp3", actionOptions, "idyot", "Да! Мальчик идёт.", "Нет. Смотри ещё."),
      choiceTask("u9-action-6", "Что делает собака?", group("dog-sits", "Собака сидит.", "🐶🪑", 1, "scene"), "u9_action_sobaka_sidit.mp3", actionOptions, "sidit", "Да! Собака сидит.", "Нет. Смотри ещё.")
    ]
  };

  var placeGame = {
    id: "unit-9-game-places",
    gameSlug: "unit-9-game-places",
    kind: "day-choice",
    icon: "📍",
    title: "Где это?",
    finalTitle: "Супер! Места понятны! ✅",
    finalText: "дома · школа · кафе · парк",
    finalWords: ["дома", "в школе", "в кафе", "в парке"],
    rounds: [
      choiceTask("u9-place-1", "Где мама?", group("mama-home", "Мама дома.", "👩🏠", 1, "scene"), "u9_place_mama_doma.mp3", placeOptions, "doma", "Да! Мама дома.", "Нет. Смотри ещё."),
      choiceTask("u9-place-2", "Где мальчик?", group("boy-school", "Мальчик в школе.", "👦🏫", 1, "scene"), "u9_place_malchik_v_shkole.mp3", placeOptions, "school", "Да! В школе.", "Нет. Смотри ещё."),
      choiceTask("u9-place-3", "Где девочка?", group("girl-park", "Девочка в парке.", "👧🌳", 1, "scene"), "u9_place_devochka_v_parke.mp3", placeOptions, "park", "Да! В парке.", "Нет. Смотри ещё."),
      choiceTask("u9-place-4", "Где мама?", group("mama-cafe", "Мама в кафе.", "👩🏢☕", 1, "scene"), "u9_place_mama_v_kafe.mp3", placeOptions, "cafe", "Да! В кафе.", "Нет. Смотри ещё."),
      choiceTask("u9-place-5", "Где собака?", group("dog-under-table", "Собака под столом.", "🐶⬇️🪑", 1, "scene"), "u9_place_sobaka_pod_stolom.mp3", placeOptions, "under-table", "Да! Под столом.", "Нет. Смотри ещё."),
      choiceTask("u9-place-6", "Где кот?", group("cat-near-house", "Кот рядом с домом.", "🐱↔️🏠", 1, "scene"), "u9_place_kot_ryadom_s_domom.mp3", placeOptions, "near-house", "Да! Рядом с домом.", "Нет. Смотри ещё.")
    ]
  };

  var storySlides = [
    slide("u9-story-1", "История 1", ["Утро.", "Я дома.", "Кот спит.", "Я пью воду."], focus(["🌅", "🙂🏠", "🐱😴", "💧"]), [line("Утро. Я дома. Кот спит. Я пью воду.", "u9_story_1.mp3")], [
      question("u9-story-q1", "Где я?", [option("doma", "дома", "🏠"), option("school", "в школе", "🏫"), option("cafe", "в кафе", "🏢☕")], "doma", "🙂"),
      question("u9-story-q2", "Что делает кот?", actionOptions, "spit", "🐱"),
      question("u9-story-q3", "Что я пью?", [option("vodu", "воду", "💧"), option("hleb", "хлеб", "🍞"), option("yabloko", "яблоко", "🍎")], "vodu", "🙂")
    ], true),
    slide("u9-story-2", "История 2", ["День.", "Я иду в школу.", "В школе мальчик читает.", "На столе две книги."], focus(["☀️", "🙂🚶‍➡️🏫", "👦📖", "🪑📖📖"]), [line("День. Я иду в школу. В школе мальчик читает. На столе две книги.", "u9_story_2.mp3")], [
      question("u9-story-q4", "Куда я иду?", [option("school", "в школу", "🏫"), option("park", "в парк", "🌳"), option("home", "домой", "🏠")], "school", "🙂"),
      question("u9-story-q5", "Что делает мальчик?", actionOptions, "chitaet", "👦"),
      question("u9-story-q6", "Сколько книг?", [option("two", "две", "2️⃣"), option("three", "три", "3️⃣"), option("one", "одна", "1️⃣")], "two", "📖📖")
    ], true),
    slide("u9-story-3", "История 3", ["Вечер.", "Я иду домой.", "Дома мама и папа.", "Папа читает.", "Собака под столом."], focus(["🌙", "🙂🚶‍➡️🏠", "👩👨", "👨📖", "🐶⬇️🪑"]), [line("Вечер. Я иду домой. Дома мама и папа. Папа читает. Собака под столом.", "u9_story_3.mp3")], [
      question("u9-story-q7", "Куда я иду?", [option("home", "домой", "🏠"), option("school", "в школу", "🏫"), option("park", "в парк", "🌳")], "home", "🙂"),
      question("u9-story-q8", "Кто дома?", [option("mama-papa", "мама и папа", "👩👨"), option("cat-dog", "кот и собака", "🐱🐶"), option("boy-girl", "мальчик и девочка", "👦👧")], "mama-papa", "🏠"),
      question("u9-story-q9", "Где собака?", placeOptions, "under-table", "🐶")
    ], true),
    slide("u9-story-4", "Отлично!", ["Отлично! ✅", "Ты читаешь.", "Мой день."], wordList([{ text: "утро", emoji: "🌅" }, { text: "день", emoji: "☀️" }, { text: "вечер", emoji: "🌙" }]), [line("Отлично! Ты читаешь. Мой день.", "u9_story_final.mp3")], null, true)
  ];

  var dayMapGame = {
    id: "unit-9-game-day-map",
    gameSlug: "unit-9-game-day-map",
    kind: "day-map",
    icon: "🗺️",
    title: "Карта дня",
    mapTitle: "Карта дня",
    finalTitle: "Отлично! Карта дня готова! 🏆",
    finalText: "утро · день · вечер",
    finalWords: ["дом", "школа", "парк", "кафе"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("home", "дом", "🏠", 1, "place", 1, 4),
      group("school", "школа", "🏫", 1, "place", 4, 0),
      group("park", "парк", "🌳", 1, "place", 0, 1),
      group("cafe", "кафе", "🏢☕", 1, "place", 4, 3),
      group("table", "стол", "🪑", 1, "thing", 2, 2),
      group("cat", "кот", "🐱", 1, "animal", 1, 1),
      group("dog-under-table", "собака под столом", "🐶⬇️🪑", 1, "animal", 2, 3)
    ],
    rounds: [
      { id: "u9-map-1", command: "Утро. Иди в дом.", text: "Утро. Иди в дом.", audio: audio("u9_map_morning_go_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." },
      { id: "u9-map-2", command: "День. Иди в школу.", text: "День. Иди в школу.", audio: audio("u9_map_day_go_school.mp3"), target: "school", hint: "Нужна школа.", correctFeedback: "Да! Школа." },
      { id: "u9-map-3", command: "День. Иди в парк.", text: "День. Иди в парк.", audio: audio("u9_map_day_go_park.mp3"), target: "park", hint: "Нужен парк.", correctFeedback: "Да! Парк." },
      { id: "u9-map-4", command: "День. Иди в кафе.", text: "День. Иди в кафе.", audio: audio("u9_map_day_go_cafe.mp3"), target: "cafe", hint: "Нужно кафе.", correctFeedback: "Да! Кафе." },
      { id: "u9-map-5", command: "Вечер. Иди домой.", text: "Вечер. Иди домой.", audio: audio("u9_map_evening_go_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." },
      { id: "u9-map-6", command: "Найди кота.", text: "Найди кота.", audio: audio("u9_map_find_cat.mp3"), target: "cat", hint: "Нужен кот.", correctFeedback: "Да! Кот." },
      { id: "u9-map-7", command: "Найди собаку под столом.", text: "Найди собаку под столом.", audio: audio("u9_map_find_dog_under_table.mp3"), target: "dog-under-table", hint: "Нужна собака под столом.", correctFeedback: "Да! Собака под столом." }
    ]
  };

  var UNIT9_GAMES = {
    timeGame: timeGame,
    myDayGame: myDayGame,
    actionGame: actionGame,
    placeGame: placeGame,
    dayMapGame: dayMapGame
  };

  root.LexiLandUnit9Lesson = {
    id: "level-0-unit-9-my-day",
    order: 11,
    menuLabel: "Юнит 9",
    title: "Юнит 9: Мой день",
    subtitle: "Утро, день, вечер",
    level: "Уровень 0",
    coverEmoji: "🌅",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-25-morning", "Урок 25: Утро", "🌅", "Урок 25: Утро", lesson25Slides),
      unit("lesson-26-day", "Урок 26: День", "☀️", "Урок 26: День", lesson26Slides),
      unit("lesson-27-evening", "Урок 27: Вечер", "🌙", "Урок 27: Вечер", lesson27Slides),
      gameUnit("unit-9-game-time", "Игра: Утро, день или вечер?", "🌅", timeGame),
      gameUnit("unit-9-game-my-day", "Игра 2: Мой день", "🌅", myDayGame),
      gameUnit("unit-9-game-actions", "Игра 3: Кто что делает?", "🎬", actionGame),
      gameUnit("unit-9-game-places", "Игра 4: Где это?", "📍", placeGame),
      unit("unit-9-game-story", "Игра 5: Мини-история", "📖", "Игра 5: Мини-история", storySlides),
      gameUnit("unit-9-game-day-map", "Игра 6: Карта дня", "🗺️", dayMapGame)
    ]
  };

  root.LexiLandUnit9Games = UNIT9_GAMES;
  root.LexiLandUnit9 = root.LexiLandUnit9Lesson;
}(typeof window !== "undefined" ? window : globalThis));
