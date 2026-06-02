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
    "дом": m("дом", "🏠", "dom.mp3"),
    "дома": m("дома", "🏠", "doma.mp3"),
    "комната": m("комната", "🛏️", "komnata.mp3"),
    "комнате": m("комнате", "🛏️", "v_komnate.mp3"),
    "кухня": m("кухня", "🍽️", "kuhnya.mp3"),
    "кухне": m("кухне", "🍽️", "na_kuhne.mp3"),
    "ванная": m("ванная", "🛁", "vannaya.mp3"),
    "ванной": m("ванной", "🛁", "v_vannoy.mp3"),
    "дверь": m("дверь", "🚪", "dver.mp3"),
    "двери": m("двери", "🚪", "u_dveri.mp3"),
    "окно": m("окно", "🪟", "okno.mp3"),
    "окна": m("окна", "🪟", "u_okna.mp3"),
    "кровать": m("кровать", "🛏️", "krovat.mp3"),
    "кроватью": m("кроватью", "🛏️", "pod_krovatyu.mp3"),
    "шкаф": m("шкаф", "🗄️", "shkaf.mp3"),
    "шкафу": m("шкафу", "🗄️", "v_shkafu.mp3"),
    "стол": m("стол", "🪑", "stol.mp3"),
    "столе": m("столе", "🪑", "na_stole.mp3"),
    "стул": m("стул", "🪑", "stul.mp3"),
    "мама": m("мама", "👩", "mama.mp3"),
    "папа": m("папа", "👨", "papa.mp3"),
    "брат": m("брат", "👦", "brat.mp3"),
    "сестра": m("сестра", "👧", "sestra.mp3"),
    "кот": m("кот", "🐱", "kot.mp3"),
    "собака": m("собака", "🐶", "sobaka.mp3"),
    "книга": m("книга", "📖", "kniga.mp3"),
    "мяч": m("мяч", "⚽", "myach.mp3"),
    "шапка": m("шапка", "🧢", "shapka.mp3"),
    "куртка": m("куртка", "🧥", "kurtka.mp3"),
    "обувь": m("обувь", "👟", "obuv.mp3"),
    "найди": m("найди", "🔎", "naydi.mp3"),
    "иди": m("иди", "🚶‍➡️", "idi.mp3")
  };

  var dictionary = [
    entry("u15-komnata", "комната", "🛏️", "word", "komnata.mp3"),
    entry("u15-kuhnya", "кухня", "🍽️", "word", "kuhnya.mp3"),
    entry("u15-vannaya", "ванная", "🛁", "word", "vannaya.mp3"),
    entry("u15-dver", "дверь", "🚪", "word", "dver.mp3"),
    entry("u15-okno", "окно", "🪟", "word", "okno.mp3"),
    entry("u15-krovat", "кровать", "🛏️", "word", "krovat.mp3"),
    entry("u15-shkaf", "шкаф", "🗄️", "word", "shkaf.mp3"),
    entry("u15-v-komnate", "в комнате", "🛏️", "chunk", "v_komnate.mp3"),
    entry("u15-na-kuhne", "на кухне", "🍽️", "chunk", "na_kuhne.mp3"),
    entry("u15-v-vannoy", "в ванной", "🛁", "chunk", "v_vannoy.mp3"),
    entry("u15-u-okna", "у окна", "🪟", "chunk", "u_okna.mp3"),
    entry("u15-u-dveri", "у двери", "🚪", "chunk", "u_dveri.mp3"),
    entry("u15-na-stole", "на столе", "🪑", "chunk", "na_stole.mp3"),
    entry("u15-pod-krovatyu", "под кроватью", "🛏️", "chunk", "pod_krovatyu.mp3"),
    entry("u15-ryadom-so-shkafom", "рядом со шкафом", "🗄️", "chunk", "ryadom_so_shkafom.mp3"),
    entry("u15-v-shkafu", "в шкафу", "🗄️", "chunk", "v_shkafu.mp3"),
    entry("u15-idi-v-komnatu", "иди в комнату", "🚶‍➡️🛏️", "chunk", "idi_v_komnatu.mp3"),
    entry("u15-idi-na-kuhnyu", "иди на кухню", "🚶‍➡️🍽️", "chunk", "idi_na_kuhnyu.mp3"),
    entry("u15-idi-v-vannuyu", "иди в ванную", "🚶‍➡️🛁", "chunk", "idi_v_vannuyu.mp3"),
    entry("u15-idi-k-dveri", "иди к двери", "🚶‍➡️🚪", "chunk", "idi_k_dveri.mp3"),
    entry("u15-idi-k-oknu", "иди к окну", "🚶‍➡️🪟", "chunk", "idi_k_oknu.mp3"),
    entry("u15-naydi-krovat", "найди кровать", "🔎🛏️", "chunk", "naydi_krovat.mp3"),
    entry("u15-naydi-shkaf", "найди шкаф", "🔎🗄️", "chunk", "naydi_shkaf.mp3"),
    entry("u15-naydi-stol", "найди стол", "🔎🪑", "chunk", "naydi_stol.mp3"),
    entry("u15-mama-na-kuhne", "мама на кухне", "👩🍽️", "chunk", "mama_na_kuhne.mp3"),
    entry("u15-papa-v-komnate", "папа в комнате", "👨🛏️", "chunk", "papa_v_komnate.mp3"),
    entry("u15-kot-pod-krovatyu", "кот под кроватью", "🐱🛏️", "chunk", "kot_pod_krovatyu.mp3"),
    entry("u15-kniga-na-stole", "книга на столе", "📖🪑", "chunk", "kniga_na_stole.mp3"),
    entry("u15-sobaka-u-dveri", "собака у двери", "🐶🚪", "chunk", "sobaka_u_dveri.mp3")
  ];

  var yesNoOptions = [
    option("net", "нет", "❌"),
    option("da", "да", "✅")
  ];

  var homePlaceOptions = [
    option("komnata", "комната", "🛏️"),
    option("kuhnya", "кухня", "🍽️"),
    option("vannaya", "ванная", "🛁"),
    option("dver", "дверь", "🚪"),
    option("okno", "окно", "🪟"),
    option("krovat", "кровать", "🛏️"),
    option("shkaf", "шкаф", "🗄️"),
    option("stol", "стол", "🪑"),
    option("stul", "стул", "🪑"),
    option("dom", "дом", "🏠")
  ];

  var locationOptions = [
    option("na-kuhne", "на кухне", "🍽️"),
    option("v-komnate", "в комнате", "🛏️"),
    option("v-vannoy", "в ванной", "🛁"),
    option("u-dveri", "у двери", "🚪"),
    option("u-okna", "у окна", "🪟"),
    option("pod-krovatyu", "под кроватью", "🛏️")
  ];

  var objectLocationOptions = [
    option("na-stole", "на столе", "🪑"),
    option("pod-krovatyu", "под кроватью", "🛏️"),
    option("v-shkafu", "в шкафу", "🗄️"),
    option("u-dveri", "у двери", "🚪"),
    option("u-okna", "у окна", "🪟"),
    option("na-krovati", "на кровати", "🛏️")
  ];

  var moveOptions = [
    option("komnata", "в комнату", "🛏️"),
    option("kuhnya", "на кухню", "🍽️"),
    option("vannaya", "в ванную", "🛁"),
    option("dver", "к двери", "🚪"),
    option("okno", "к окну", "🪟"),
    option("krovat", "кровать", "🛏️"),
    option("shkaf", "шкаф", "🗄️"),
    option("stol", "стол", "🪑")
  ];

  var homeItems = [
    group("komnata", "комната", "🛏️", 1, "place"),
    group("kuhnya", "кухня", "🍽️", 1, "place"),
    group("vannaya", "ванная", "🛁", 1, "place"),
    group("dver", "дверь", "🚪", 1, "object"),
    group("okno", "окно", "🪟", 1, "object"),
    group("krovat", "кровать", "🛏️", 1, "object"),
    group("shkaf", "шкаф", "🗄️", 1, "object"),
    group("stol", "стол", "🪑", 1, "object"),
    group("stul", "стул", "🪑", 1, "object")
  ];

  var lesson43Slides = [
    slide("u15-l43-1", "Дом", ["Дом."], focus(["🏠"]), [line("Дом.", "dom.mp3")], null, true),
    slide("u15-l43-2", "Комната", ["Комната."], focus(["🛏️"]), [line("Комната.", "komnata.mp3")], null, true),
    slide("u15-l43-3", "Кухня", ["Кухня."], focus(["🍽️"]), [line("Кухня.", "kuhnya.mp3")], null, true),
    slide("u15-l43-4", "Ванная", ["Ванная."], focus(["🛁"]), [line("Ванная.", "vannaya.mp3")], null, true),
    slide("u15-l43-5", "Дверь", ["Дверь."], focus(["🚪"]), [line("Дверь.", "dver.mp3")], null, true),
    slide("u15-l43-6", "Окно", ["Окно."], focus(["🪟"]), [line("Окно.", "okno.mp3")], null, true),
    slide("u15-l43-7", "Кровать", ["Кровать."], focus(["🛏️"]), [line("Кровать.", "krovat.mp3")], null, true),
    slide("u15-l43-8", "Шкаф", ["Шкаф."], focus(["🗄️"]), [line("Шкаф.", "shkaf.mp3")], null, true),
    slide("u15-l43-9", "Что это?", ["Что это?"], focus(["🚪"]), [line("Что это? Дверь.", "u15_l43_chto_eto_dver.mp3")], [
      question("u15-l43-q1", "Что это?", homePlaceOptions, "dver", "🚪")
    ], true),
    slide("u15-l43-10", "Да или нет", ["Это кухня?"], focus(["🛁", "❌"]), [line("Это кухня?", "u15_l43_eto_kuhnya.mp3")], [
      question("u15-l43-q2", "Это кухня?", yesNoOptions, "net", "🛁")
    ], true),
    slide("u15-l43-11", "Читай", ["Это дом.", "Тут комната.", "Там кухня.", "В комнате кровать.", "Рядом окно."], focus(["🏠", "📍🛏️", "👉🍽️", "🛏️🛏️", "↔️🪟"]), [line("Это дом. Тут комната. Там кухня. В комнате кровать. Рядом окно.", "u15_l43_text.mp3")], [
      question("u15-l43-q3", "Что это?", homePlaceOptions, "dom", "🏠"),
      question("u15-l43-q4", "Где кровать?", locationOptions, "v-komnate", "🛏️"),
      question("u15-l43-q5", "Где окно?", [option("ryadom", "рядом", "↔️"), option("tam", "там", "👉"), option("tut", "тут", "📍")], "ryadom", "🪟")
    ], true),
    slide("u15-l43-12", "Отлично!", ["Отлично! ✅", "дом", "комната", "кухня", "ванная"], wordList([{ text: "дом", emoji: "🏠" }, { text: "комната", emoji: "🛏️" }, { text: "кухня", emoji: "🍽️" }, { text: "ванная", emoji: "🛁" }]), [line("Отлично! Дом. Комната. Кухня. Ванная.", "u15_l43_final.mp3")], null, true)
  ];

  var lesson44Slides = [
    slide("u15-l44-1", "На кухне", ["Мама на кухне."], focus(["👩", "🍽️"]), [line("Мама на кухне.", "mama_na_kuhne.mp3")], null, true),
    slide("u15-l44-2", "В комнате", ["Папа в комнате."], focus(["👨", "🛏️"]), [line("Папа в комнате.", "papa_v_komnate.mp3")], null, true),
    slide("u15-l44-3", "В ванной", ["Брат в ванной."], focus(["👦", "🛁"]), [line("Брат в ванной.", "u15_brat_v_vannoy.mp3")], null, true),
    slide("u15-l44-4", "Под кроватью", ["Кот под кроватью."], focus(["🐱", "⬇️", "🛏️"]), [line("Кот под кроватью.", "kot_pod_krovatyu.mp3")], null, true),
    slide("u15-l44-5", "На столе", ["Книга на столе."], focus(["📖", "⬆️", "🪑"]), [line("Книга на столе.", "kniga_na_stole.mp3")], null, true),
    slide("u15-l44-6", "У двери", ["Собака у двери."], focus(["🐶", "🚪"]), [line("Собака у двери.", "sobaka_u_dveri.mp3")], null, true),
    slide("u15-l44-7", "У окна", ["Стул у окна."], focus(["🪑", "🪟"]), [line("Стул у окна.", "u15_stul_u_okna.mp3")], null, true),
    slide("u15-l44-8", "У шкафа", ["Мяч рядом со шкафом."], focus(["⚽", "↔️", "🗄️"]), [line("Мяч рядом со шкафом.", "u15_myach_ryadom_so_shkafom.mp3")], null, true),
    slide("u15-l44-9", "Где?", ["Где мама?"], focus(["👩", "🍽️"]), [line("Где мама?", "u15_l44_gde_mama.mp3")], [
      question("u15-l44-q1", "Где мама?", locationOptions, "na-kuhne", "👩")
    ], true),
    slide("u15-l44-10", "Что?", ["Что на столе?"], focus(["📖", "🪑"]), [line("Что на столе?", "u15_l44_chto_na_stole.mp3")], [
      question("u15-l44-q2", "Что на столе?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽"), option("shapka", "шапка", "🧢")], "kniga", "🪑")
    ], true),
    slide("u15-l44-11", "Читай", ["Мама на кухне.", "Папа в комнате.", "Кот под кроватью.", "Книга на столе.", "Собака у двери."], focus(["👩🍽️", "👨🛏️", "🐱⬇️🛏️", "📖🪑", "🐶🚪"]), [line("Мама на кухне. Папа в комнате. Кот под кроватью. Книга на столе. Собака у двери.", "u15_l44_text.mp3")], [
      question("u15-l44-q3", "Где папа?", locationOptions, "v-komnate", "👨"),
      question("u15-l44-q4", "Где кот?", locationOptions, "pod-krovatyu", "🐱"),
      question("u15-l44-q5", "Что на столе?", [option("kniga", "книга", "📖"), option("stul", "стул", "🪑"), option("okno", "окно", "🪟")], "kniga", "🪑")
    ], true),
    slide("u15-l44-12", "Отлично!", ["Отлично! ✅", "на кухне", "в комнате", "под кроватью"], wordList([{ text: "на кухне", emoji: "🍽️" }, { text: "в комнате", emoji: "🛏️" }, { text: "под кроватью", emoji: "⬇️🛏️" }]), [line("Отлично! На кухне. В комнате. Под кроватью.", "u15_l44_final.mp3")], null, true)
  ];

  var lesson45Slides = [
    slide("u15-l45-1", "Иди", ["Иди в комнату."], focus(["🙂", "🚶‍➡️", "🛏️"]), [line("Иди в комнату.", "idi_v_komnatu.mp3")], null, true),
    slide("u15-l45-2", "Кухня", ["Иди на кухню."], focus(["🙂", "🚶‍➡️", "🍽️"]), [line("Иди на кухню.", "idi_na_kuhnyu.mp3")], null, true),
    slide("u15-l45-3", "Ванная", ["Иди в ванную."], focus(["🙂", "🚶‍➡️", "🛁"]), [line("Иди в ванную.", "idi_v_vannuyu.mp3")], null, true),
    slide("u15-l45-4", "Дверь", ["Иди к двери."], focus(["🙂", "🚶‍➡️", "🚪"]), [line("Иди к двери.", "idi_k_dveri.mp3")], null, true),
    slide("u15-l45-5", "Окно", ["Иди к окну."], focus(["🙂", "🚶‍➡️", "🪟"]), [line("Иди к окну.", "idi_k_oknu.mp3")], null, true),
    slide("u15-l45-6", "Найди", ["Найди кровать."], focus(["🔎", "🛏️"]), [line("Найди кровать.", "naydi_krovat.mp3")], null, true),
    slide("u15-l45-7", "Найди", ["Найди шкаф."], focus(["🔎", "🗄️"]), [line("Найди шкаф.", "naydi_shkaf.mp3")], null, true),
    slide("u15-l45-8", "Найди", ["Найди стол."], focus(["🔎", "🪑"]), [line("Найди стол.", "naydi_stol.mp3")], null, true),
    slide("u15-l45-9", "Куда?", ["Иди на кухню."], focus(["🏠", "🍽️", "🛏️", "🛁"]), [line("Иди на кухню.", "idi_na_kuhnyu.mp3")], [
      question("u15-l45-q1", "Куда идти?", moveOptions, "kuhnya", "🍽️")
    ], true),
    slide("u15-l45-10", "Кого?", ["Найди кота."], focus(["🐱", "🛏️"]), [line("Найди кота.", "u15_l45_naydi_kota.mp3")], [
      question("u15-l45-q2", "Кого найти?", [option("kot", "кота", "🐱"), option("sobaka", "собаку", "🐶"), option("mama", "маму", "👩")], "kot", "🐱")
    ], true),
    slide("u15-l45-11", "Читай", ["Утро.", "Я дома.", "Мама на кухне.", "Кот в комнате.", "Иди в комнату.", "Найди кота."], focus(["🌅", "🙂🏠", "👩🍽️", "🐱🛏️", "🚶‍➡️🛏️", "🔎🐱"]), [line("Утро. Я дома. Мама на кухне. Кот в комнате. Иди в комнату. Найди кота.", "u15_l45_text.mp3")], [
      question("u15-l45-q3", "Где я?", [option("doma", "дома", "🏠"), option("park", "в парке", "🌳"), option("kafe", "в кафе", "☕")], "doma", "🙂"),
      question("u15-l45-q4", "Где мама?", locationOptions, "na-kuhne", "👩"),
      question("u15-l45-q5", "Куда идти?", moveOptions, "komnata", "🚶‍➡️")
    ], true),
    slide("u15-l45-12", "Отлично!", ["Отлично! ✅", "иди в комнату", "иди на кухню", "найди кровать"], wordList([{ text: "иди в комнату", emoji: "🛏️" }, { text: "иди на кухню", emoji: "🍽️" }, { text: "найди кровать", emoji: "🔎🛏️" }]), [line("Отлично! Иди в комнату. Иди на кухню. Найди кровать.", "u15_l45_final.mp3")], null, true)
  ];

  var whatGame = {
    id: "unit-15-game-what",
    gameSlug: "unit-15-game-what",
    kind: "home-choice",
    icon: "🏠",
    title: "Что это?",
    finalTitle: "Отлично! Дом понятен! ✅",
    finalText: "дом",
    finalWords: ["комната", "кухня", "дверь"],
    rounds: [
      choiceTask("u15-what-1", "Что это?", group("dom", "дом", "🏠"), "u15_game_what_dom.mp3", homePlaceOptions, "dom", "Да! Дом.", "Нет. Это дом."),
      choiceTask("u15-what-2", "Что это?", group("komnata", "комната", "🛏️"), "u15_game_what_komnata.mp3", homePlaceOptions, "komnata", "Да! Комната.", "Нет. Это комната."),
      choiceTask("u15-what-3", "Что это?", group("kuhnya", "кухня", "🍽️"), "u15_game_what_kuhnya.mp3", homePlaceOptions, "kuhnya", "Да! Кухня.", "Нет. Это кухня."),
      choiceTask("u15-what-4", "Что это?", group("vannaya", "ванная", "🛁"), "u15_game_what_vannaya.mp3", homePlaceOptions, "vannaya", "Да! Ванная.", "Нет. Это ванная."),
      choiceTask("u15-what-5", "Что это?", group("dver", "дверь", "🚪"), "u15_game_what_dver.mp3", homePlaceOptions, "dver", "Да! Дверь.", "Нет. Это дверь."),
      choiceTask("u15-what-6", "Что это?", group("okno", "окно", "🪟"), "u15_game_what_okno.mp3", homePlaceOptions, "okno", "Да! Окно.", "Нет. Это окно."),
      choiceTask("u15-what-7", "Что это?", group("krovat", "кровать", "🛏️"), "u15_game_what_krovat.mp3", homePlaceOptions, "krovat", "Да! Кровать.", "Нет. Это кровать."),
      choiceTask("u15-what-8", "Что это?", group("shkaf", "шкаф", "🗄️"), "u15_game_what_shkaf.mp3", homePlaceOptions, "shkaf", "Да! Шкаф.", "Нет. Это шкаф."),
      choiceTask("u15-what-9", "Что это?", group("stol", "стол", "🪑"), "u15_game_what_stol.mp3", homePlaceOptions, "stol", "Да! Стол.", "Нет. Это стол."),
      choiceTask("u15-what-10", "Что это?", group("stul", "стул", "🪑"), "u15_game_what_stul.mp3", homePlaceOptions, "stul", "Да! Стул.", "Нет. Это стул.")
    ]
  };

  var findHomeGame = {
    id: "unit-15-game-find-home",
    gameSlug: "unit-15-game-find-home",
    kind: "home-find",
    icon: "🔎",
    title: "Найди в доме",
    findTitle: "Найди в доме",
    finalTitle: "Супер! Дом найден! ✅",
    finalText: "найди",
    finalWords: ["кухня", "окно", "шкаф"],
    rounds: [
      commandTask("u15-find-1", "Найди комнату.", "u15_find_komnatu.mp3", homeItems, "komnata", "Да! Комната.", "Нет. Нужна комната."),
      commandTask("u15-find-2", "Найди кухню.", "u15_find_kuhnyu.mp3", homeItems, "kuhnya", "Да! Кухня.", "Нет. Нужна кухня."),
      commandTask("u15-find-3", "Найди ванную.", "u15_find_vannuyu.mp3", homeItems, "vannaya", "Да! Ванная.", "Нет. Нужна ванная."),
      commandTask("u15-find-4", "Найди дверь.", "u15_find_dver.mp3", homeItems, "dver", "Да! Дверь.", "Нет. Нужна дверь."),
      commandTask("u15-find-5", "Найди окно.", "u15_find_okno.mp3", homeItems, "okno", "Да! Окно.", "Нет. Нужно окно."),
      commandTask("u15-find-6", "Найди кровать.", "naydi_krovat.mp3", homeItems, "krovat", "Да! Кровать.", "Нет. Нужна кровать."),
      commandTask("u15-find-7", "Найди шкаф.", "naydi_shkaf.mp3", homeItems, "shkaf", "Да! Шкаф.", "Нет. Нужен шкаф."),
      commandTask("u15-find-8", "Найди стол.", "naydi_stol.mp3", homeItems, "stol", "Да! Стол.", "Нет. Нужен стол."),
      commandTask("u15-find-9", "Найди стул.", "u15_find_stul.mp3", homeItems, "stul", "Да! Стул.", "Нет. Нужен стул.")
    ]
  };

  var wherePeopleGame = {
    id: "unit-15-game-where-people",
    gameSlug: "unit-15-game-where-people",
    kind: "home-where-people",
    icon: "👨‍👩‍👧‍👦",
    title: "Где кто?",
    finalTitle: "Отлично! Люди в доме! ✅",
    finalText: "где?",
    finalWords: ["на кухне", "в комнате", "у двери"],
    rounds: [
      choiceTask("u15-where-1", "Где мама?", group("mama-kitchen", "мама на кухне", "👩🍽️"), "u15_where_mama.mp3", locationOptions, "na-kuhne", "Да! На кухне.", "Нет. Мама на кухне."),
      choiceTask("u15-where-2", "Где папа?", group("papa-room", "папа в комнате", "👨🛏️"), "u15_where_papa.mp3", locationOptions, "v-komnate", "Да! В комнате.", "Нет. Папа в комнате."),
      choiceTask("u15-where-3", "Где брат?", group("brat-bath", "брат в ванной", "👦🛁"), "u15_where_brat.mp3", locationOptions, "v-vannoy", "Да! В ванной.", "Нет. Брат в ванной."),
      choiceTask("u15-where-4", "Где сестра?", group("sestra-window", "сестра у окна", "👧🪟"), "u15_where_sestra.mp3", locationOptions, "u-okna", "Да! У окна.", "Нет. Сестра у окна."),
      choiceTask("u15-where-5", "Где кот?", group("cat-bed", "кот под кроватью", "🐱⬇️🛏️"), "u15_where_kot.mp3", locationOptions, "pod-krovatyu", "Да! Под кроватью.", "Нет. Кот под кроватью."),
      choiceTask("u15-where-6", "Где собака?", group("dog-door", "собака у двери", "🐶🚪"), "u15_where_sobaka.mp3", locationOptions, "u-dveri", "Да! У двери.", "Нет. Собака у двери."),
      choiceTask("u15-where-7", "Где бабушка?", group("grandma-kitchen", "бабушка на кухне", "👵🍽️"), "u15_where_babushka.mp3", locationOptions, "na-kuhne", "Да! На кухне.", "Нет. Бабушка на кухне."),
      choiceTask("u15-where-8", "Где дедушка?", group("grandpa-room", "дедушка в комнате", "👴🛏️"), "u15_where_dedushka.mp3", locationOptions, "v-komnate", "Да! В комнате.", "Нет. Дедушка в комнате.")
    ]
  };

  var whatWhereGame = {
    id: "unit-15-game-what-where",
    gameSlug: "unit-15-game-what-where",
    kind: "home-what-where",
    icon: "📖",
    title: "Что где?",
    finalTitle: "Отлично! Вещи на месте! ✅",
    finalText: "что где",
    finalWords: ["на столе", "в шкафу", "у двери"],
    rounds: [
      choiceTask("u15-thing-1", "Где книга?", group("book-table", "книга на столе", "📖🪑"), "u15_thing_kniga.mp3", objectLocationOptions, "na-stole", "Да! На столе.", "Нет. Книга на столе."),
      choiceTask("u15-thing-2", "Где мяч?", group("ball-bed", "мяч под кроватью", "⚽⬇️🛏️"), "u15_thing_myach.mp3", objectLocationOptions, "pod-krovatyu", "Да! Под кроватью.", "Нет. Мяч под кроватью."),
      choiceTask("u15-thing-3", "Где шапка?", group("hat-closet", "шапка в шкафу", "🧢🗄️"), "u15_thing_shapka.mp3", objectLocationOptions, "v-shkafu", "Да! В шкафу.", "Нет. Шапка в шкафу."),
      choiceTask("u15-thing-4", "Где куртка?", group("jacket-closet", "куртка в шкафу", "🧥🗄️"), "u15_thing_kurtka.mp3", objectLocationOptions, "v-shkafu", "Да! В шкафу.", "Нет. Куртка в шкафу."),
      choiceTask("u15-thing-5", "Где обувь?", group("shoes-door", "обувь у двери", "👟🚪"), "u15_thing_obuv.mp3", objectLocationOptions, "u-dveri", "Да! У двери.", "Нет. Обувь у двери."),
      choiceTask("u15-thing-6", "Где стул?", group("chair-window", "стул у окна", "🪑🪟"), "u15_thing_stul.mp3", objectLocationOptions, "u-okna", "Да! У окна.", "Нет. Стул у окна."),
      choiceTask("u15-thing-7", "Где кот?", group("cat-bed-top", "кот на кровати", "🐱🛏️"), "u15_thing_kot.mp3", objectLocationOptions, "na-krovati", "Да! На кровати.", "Нет. Кот на кровати."),
      choiceTask("u15-thing-8", "Где собака?", group("dog-door", "собака у двери", "🐶🚪"), "u15_thing_sobaka.mp3", objectLocationOptions, "u-dveri", "Да! У двери.", "Нет. Собака у двери.")
    ]
  };

  var goRoomGame = {
    id: "unit-15-game-go-room",
    gameSlug: "unit-15-game-go-room",
    kind: "home-find",
    icon: "🚶‍➡️",
    title: "Иди в комнату",
    findTitle: "Иди в комнату",
    finalTitle: "Отлично! Дом открыт! ✅",
    finalText: "иди",
    finalWords: ["комната", "кухня", "дверь"],
    rounds: [
      commandTask("u15-go-1", "Иди в комнату.", "idi_v_komnatu.mp3", homeItems, "komnata", "Да! Комната.", "Нет. Нужна комната."),
      commandTask("u15-go-2", "Иди на кухню.", "idi_na_kuhnyu.mp3", homeItems, "kuhnya", "Да! Кухня.", "Нет. Нужна кухня."),
      commandTask("u15-go-3", "Иди в ванную.", "idi_v_vannuyu.mp3", homeItems, "vannaya", "Да! Ванная.", "Нет. Нужна ванная."),
      commandTask("u15-go-4", "Иди к двери.", "idi_k_dveri.mp3", homeItems, "dver", "Да! Дверь.", "Нет. Нужна дверь."),
      commandTask("u15-go-5", "Иди к окну.", "idi_k_oknu.mp3", homeItems, "okno", "Да! Окно.", "Нет. Нужно окно."),
      commandTask("u15-go-6", "Найди кровать.", "naydi_krovat.mp3", homeItems, "krovat", "Да! Кровать.", "Нет. Нужна кровать."),
      commandTask("u15-go-7", "Найди шкаф.", "naydi_shkaf.mp3", homeItems, "shkaf", "Да! Шкаф.", "Нет. Нужен шкаф."),
      commandTask("u15-go-8", "Найди стол.", "naydi_stol.mp3", homeItems, "stol", "Да! Стол.", "Нет. Нужен стол.")
    ]
  };

  var roomSceneSlides = [
    slide("u15-room-1", "Комната", ["Это комната.", "В комнате кровать.", "Кот под кроватью.", "Книга на столе."], focus(["🛏️", "🛏️", "🐱⬇️🛏️", "📖🪑"]), [line("Это комната. В комнате кровать. Кот под кроватью. Книга на столе.", "u15_room_scene_1.mp3")], [
      question("u15-room-q1", "Где кот?", locationOptions, "pod-krovatyu", "🐱"),
      question("u15-room-q2", "Что на столе?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽"), option("okno", "окно", "🪟")], "kniga", "🪑"),
      question("u15-room-q3", "Что в комнате?", homePlaceOptions, "krovat", "🛏️")
    ], true),
    slide("u15-room-2", "Кухня", ["Это кухня.", "Мама на кухне.", "На столе суп.", "Рядом чай."], focus(["🍽️", "👩🍽️", "🪑🍲", "↔️🍵"]), [line("Это кухня. Мама на кухне. На столе суп. Рядом чай.", "u15_room_scene_2.mp3")], [
      question("u15-room-q4", "Где мама?", locationOptions, "na-kuhne", "👩"),
      question("u15-room-q5", "Что на столе?", [option("soup", "суп", "🍲"), option("tea", "чай", "🍵"), option("book", "книга", "📖")], "soup", "🪑"),
      question("u15-room-q6", "Что рядом?", [option("tea", "чай", "🍵"), option("ball", "мяч", "⚽"), option("hat", "шапка", "🧢")], "tea", "↔️")
    ], true),
    slide("u15-room-3", "Дверь", ["Я дома.", "Собака у двери.", "Шапка в шкафу.", "Окно рядом."], focus(["🙂🏠", "🐶🚪", "🧢🗄️", "🪟↔️"]), [line("Я дома. Собака у двери. Шапка в шкафу. Окно рядом.", "u15_room_scene_3.mp3")], [
      question("u15-room-q7", "Где собака?", locationOptions, "u-dveri", "🐶"),
      question("u15-room-q8", "Где шапка?", objectLocationOptions, "v-shkafu", "🧢"),
      question("u15-room-q9", "Что рядом?", homePlaceOptions, "okno", "↔️")
    ], true),
    slide("u15-room-4", "Отлично!", ["Отлично! ✅", "комната", "кухня", "дверь"], wordList([{ text: "комната", emoji: "🛏️" }, { text: "кухня", emoji: "🍽️" }, { text: "дверь", emoji: "🚪" }]), [line("Отлично! Комната. Кухня. Дверь.", "u15_room_final.mp3")], null, true)
  ];

  var homeMapGame = {
    id: "unit-15-game-home-map",
    gameSlug: "unit-15-game-home-map",
    kind: "home-map",
    icon: "🗺️",
    title: "Карта дома",
    mapTitle: "Карта дома",
    finalTitle: "Отлично! Карта дома готова! 🏆",
    finalText: "дом · комнаты",
    finalWords: ["комната", "кухня", "окно"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("komnata", "комната", "🛏️", 1, "place", 1, 3),
      group("kuhnya", "кухня", "🍽️", 1, "place", 3, 3),
      group("vannaya", "ванная", "🛁", 1, "place", 4, 1),
      group("dver", "дверь", "🚪", 1, "object", 0, 4),
      group("okno", "окно", "🪟", 1, "object", 0, 1),
      group("krovat", "кровать", "🛏️", 1, "object", 2, 1),
      group("shkaf", "шкаф", "🗄️", 1, "object", 4, 4),
      group("stol", "стол", "🪑", 1, "object", 2, 3),
      group("mama", "мама", "👩", 1, "person", 3, 2),
      group("papa", "папа", "👨", 1, "person", 1, 1),
      group("kot", "кот", "🐱", 1, "animal", 2, 2),
      group("sobaka", "собака", "🐶", 1, "animal", 0, 3)
    ],
    rounds: [
      { id: "u15-map-1", command: "Иди в комнату.", text: "Иди в комнату.", audio: audio("idi_v_komnatu.mp3"), target: "komnata", hint: "Нужна комната.", correctFeedback: "Да! Комната." },
      { id: "u15-map-2", command: "Иди на кухню.", text: "Иди на кухню.", audio: audio("idi_na_kuhnyu.mp3"), target: "kuhnya", hint: "Нужна кухня.", correctFeedback: "Да! Кухня." },
      { id: "u15-map-3", command: "Иди в ванную.", text: "Иди в ванную.", audio: audio("idi_v_vannuyu.mp3"), target: "vannaya", hint: "Нужна ванная.", correctFeedback: "Да! Ванная." },
      { id: "u15-map-4", command: "Иди к двери.", text: "Иди к двери.", audio: audio("idi_k_dveri.mp3"), target: "dver", hint: "Нужна дверь.", correctFeedback: "Да! Дверь." },
      { id: "u15-map-5", command: "Иди к окну.", text: "Иди к окну.", audio: audio("idi_k_oknu.mp3"), target: "okno", hint: "Нужно окно.", correctFeedback: "Да! Окно." },
      { id: "u15-map-6", command: "Найди кровать.", text: "Найди кровать.", audio: audio("naydi_krovat.mp3"), target: "krovat", hint: "Нужна кровать.", correctFeedback: "Да! Кровать." },
      { id: "u15-map-7", command: "Найди шкаф.", text: "Найди шкаф.", audio: audio("naydi_shkaf.mp3"), target: "shkaf", hint: "Нужен шкаф.", correctFeedback: "Да! Шкаф." },
      { id: "u15-map-8", command: "Мама на кухне. Найди маму.", text: "Мама на кухне. Найди маму.", audio: audio("u15_map_find_mama.mp3"), target: "mama", hint: "Нужна мама.", correctFeedback: "Да! Мама." },
      { id: "u15-map-9", command: "Кот под кроватью. Найди кота.", text: "Кот под кроватью. Найди кота.", audio: audio("u15_map_find_kot.mp3"), target: "kot", hint: "Нужен кот.", correctFeedback: "Да! Кот." },
      { id: "u15-map-10", command: "Собака у двери. Найди собаку.", text: "Собака у двери. Найди собаку.", audio: audio("u15_map_find_sobaka.mp3"), target: "sobaka", hint: "Нужна собака.", correctFeedback: "Да! Собака." }
    ]
  };

  root.LexiLandUnit15Lesson = {
    id: "level-0-unit-15-home-rooms",
    order: 17,
    menuLabel: "Юнит 15",
    shortTitle: "Дом",
    title: "Юнит 15: Дом и комнаты",
    subtitle: "Дом, комнаты, предметы",
    level: "Уровень 0",
    coverEmoji: "🏠",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-43-home", "Урок 43: Дом", "🏠", "Урок 43: Дом", lesson43Slides),
      unit("lesson-44-where-in-home", "Урок 44: Где в доме?", "🛏️", "Урок 44: Где в доме?", lesson44Slides),
      unit("lesson-45-go-to-room", "Урок 45: Иди в комнату", "🚶‍➡️", "Урок 45: Иди в комнату", lesson45Slides),
      gameUnit("unit-15-game-what", "Игра: Что это?", "🏠", whatGame),
      gameUnit("unit-15-game-find-home", "Игра 2: Найди в доме", "🔎", findHomeGame),
      gameUnit("unit-15-game-where-people", "Игра 3: Где кто?", "👨‍👩‍👧‍👦", wherePeopleGame),
      gameUnit("unit-15-game-what-where", "Игра 4: Что где?", "📖", whatWhereGame),
      gameUnit("unit-15-game-go-room", "Игра 5: Иди в комнату", "🚶‍➡️", goRoomGame),
      unit("unit-15-game-room", "Игра 6: Комната", "🛏️", "Игра 6: Комната", roomSceneSlides),
      gameUnit("unit-15-game-home-map", "Игра 7: Карта дома", "🗺️", homeMapGame)
    ]
  };

  root.LexiLandUnit15Games = {
    whatGame: whatGame,
    findHomeGame: findHomeGame,
    wherePeopleGame: wherePeopleGame,
    whatWhereGame: whatWhereGame,
    goRoomGame: goRoomGame,
    homeMapGame: homeMapGame
  };
  root.LexiLandUnit15 = root.LexiLandUnit15Lesson;
}(typeof window !== "undefined" ? window : globalThis));
