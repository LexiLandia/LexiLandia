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

  function question(id, text, options, correct) {
    return {
      id: id,
      text: text,
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

  function mapObj(id, emojiText, x, y, kind) {
    return {
      id: id,
      emoji: emojiText,
      x: x,
      y: y,
      kind: kind || "action"
    };
  }

  function mapTask(id, text, emojiText, file, start, target, objects, correctPhrase) {
    return {
      id: id,
      text: text,
      emoji: emojiText,
      audio: audio(file),
      width: 5,
      height: 5,
      start: start,
      target: target,
      objects: objects,
      checkLabel: "✅ Проверить",
      correctFeedback: "Да! " + correctPhrase + " ✅",
      wrongFeedback: "Нет. Попробуй ещё 🙂"
    };
  }

  function m(word, emojiText) {
    return {
      word: word,
      emoji: emojiText,
      translation: ""
    };
  }

  var meanings = {
    "кто": m("кто", "❓👤"),
    "что": m("что", "❓📦"),
    "живой": m("живой", "🌍"),
    "мир": m("мир", "🌍"),
    "найди": m("найди", "🔎"),
    "где": m("где", "❓📍"),
    "делает": m("делает", "🎬"),
    "мама": m("мама", "👩"),
    "папа": m("папа", "👨"),
    "мальчик": m("мальчик", "👦"),
    "девочка": m("девочка", "👧"),
    "кот": m("кот", "🐱"),
    "собака": m("собака", "🐶"),
    "здесь": m("здесь", "👇"),
    "там": m("там", "👉"),
    "спит": m("спит", "😴"),
    "сидит": m("сидит", "🪑"),
    "идёт": m("идёт", "🚶"),
    "стоит": m("стоит", "🧍"),
    "ест": m("ест", "🍞"),
    "пьёт": m("пьёт", "💧"),
    "читает": m("читает", "📖"),
    "играет": m("играет", "⚽"),
    "хлеб": m("хлеб", "🍞"),
    "воду": m("воду", "💧"),
    "вода": m("вода", "💧"),
    "книгу": m("книгу", "📖"),
    "книга": m("книга", "📖"),
    "мяч": m("мяч", "⚽"),
    "не": m("не", "❌"),
    "видит": m("видит", "👀"),
    "дом": m("дом", "🏠"),
    "телефон": m("телефон", "📱"),
    "да": m("да", "✅"),
    "нет": m("нет", "❌")
  };

  var whoOptions = [
    option("mama", "мама", "👩"),
    option("papa", "папа", "👨"),
    option("malchik", "мальчик", "👦"),
    option("devochka", "девочка", "👧"),
    option("kot", "кот", "🐱"),
    option("sobaka", "собака", "🐶")
  ];

  var actionOptions = [
    option("spit", "спит", "😴"),
    option("sidit", "сидит", "🪑"),
    option("idyot", "идёт", "🚶"),
    option("stoit", "стоит", "🧍")
  ];

  var dailyActionOptions = [
    option("est", "ест", "🍞"),
    option("pyot", "пьёт", "💧"),
    option("chitaet", "читает", "📖"),
    option("igraet", "играет", "⚽")
  ];

  var allActionOptions = actionOptions.concat(dailyActionOptions);
  var yesNoOptions = [option("da", "да", "✅"), option("net", "нет", "❌")];

  var dictionary = [
    entry("u3-chto-delaet", "что делает?", "❓🎬", "chunk", "chto_delaet.mp3"),
    entry("u3-zhivoy-mir", "живой мир", "🌍", "chunk", "zhivoy_mir.mp3"),
    entry("u3-naydi", "найди", "🔎", "word", "naydi.mp3"),
    entry("u3-spit", "спит", "😴", "word", "spit.mp3"),
    entry("u3-sidit", "сидит", "🪑", "word", "sidit.mp3"),
    entry("u3-idyot", "идёт", "🚶", "word", "idyot.mp3"),
    entry("u3-stoit", "стоит", "🧍", "word", "stoit.mp3"),
    entry("u3-est", "ест", "🍞", "word", "est.mp3"),
    entry("u3-pyot", "пьёт", "💧", "word", "pyot.mp3"),
    entry("u3-chitaet", "читает", "📖", "word", "chitaet.mp3"),
    entry("u3-igraet", "играет", "⚽", "word", "igraet.mp3"),
    entry("u3-vodu", "воду", "💧", "word", "vodu.mp3"),
    entry("u3-knigu", "книгу", "📖", "word", "knigu.mp3"),
    entry("u3-ne", "не", "❌", "word", "ne.mp3"),
    entry("u3-vidit", "видит", "👀", "word", "vidit.mp3"),
    entry("u3-mama", "мама", "👩", "word", "mama.mp3"),
    entry("u3-papa", "папа", "👨", "word", "papa.mp3"),
    entry("u3-malchik", "мальчик", "👦", "word", "malchik.mp3"),
    entry("u3-devochka", "девочка", "👧", "word", "devochka.mp3"),
    entry("u3-kot", "кот", "🐱", "word", "kot.mp3"),
    entry("u3-sobaka", "собака", "🐶", "word", "sobaka.mp3"),
    entry("u3-hleb", "хлеб", "🍞", "word", "hleb.mp3"),
    entry("u3-voda", "вода", "💧", "word", "voda.mp3"),
    entry("u3-kniga", "книга", "📖", "word", "kniga.mp3"),
    entry("u3-myach", "мяч", "⚽", "word", "myach.mp3"),
    entry("u3-dom", "дом", "🏠", "word", "dom.mp3"),
    entry("u3-telefon", "телефон", "📱", "word", "telefon.mp3"),
    entry("u3-da", "да", "✅", "word", "da.mp3"),
    entry("u3-net", "нет", "❌", "word", "net.mp3")
  ];

  var lesson7Slides = [
    slide("u3-l7-1", "Что делает?", ["Кто здесь?", "Что делает?"], emoji("❓👀🎬"), [line("Что делает?", "chto_delaet.mp3")], null, true),
    slide("u3-l7-2", "спит", ["Кот спит."], focus(["🐱", "😴"]), [line("Кот спит.", "kot_spit.mp3")], null, true),
    slide("u3-l7-3", "сидит", ["Папа сидит."], focus(["👨", "🪑"]), [line("Папа сидит.", "papa_sidit.mp3")], null, true),
    slide("u3-l7-4", "идёт", ["Мама идёт."], focus(["👩", "🚶"]), [line("Мама идёт.", "mama_idyot.mp3")], null, true),
    slide("u3-l7-5", "стоит", ["Собака стоит."], focus(["🐶", "🧍"]), [line("Собака стоит.", "sobaka_stoit.mp3")], null, true),
    slide("u3-l7-6", "Читай", ["Кот спит.", "Папа сидит.", "Мама идёт.", "Собака здесь."], focus(["🐱😴", "👨🪑", "👩🚶", "🐶👇"]), [line("Кот спит. Папа сидит. Мама идёт. Собака здесь.", "lesson_7_text.mp3")], [
      question("u3-l7-q1", "Кто спит?", [option("kot", "кот", "🐱"), option("papa", "папа", "👨"), option("mama", "мама", "👩")], "kot"),
      question("u3-l7-q2", "Кто сидит?", [option("papa", "папа", "👨"), option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶")], "papa"),
      question("u3-l7-q3", "Кто идёт?", [option("mama", "мама", "👩"), option("papa", "папа", "👨"), option("sobaka", "собака", "🐶")], "mama")
    ], true),
    slide("u3-l7-7", "Найди", ["Кот спит."], emoji("❓"), [line("Кот спит.", "kot_spit.mp3")], [question("u3-l7-q4", "Найди:", [option("kot-spit", "", "🐱😴"), option("kot-idyot", "", "🐱🚶"), option("papa-sidit", "", "👨🪑")], "kot-spit")], true),
    slide("u3-l7-8", "Действие", ["Папа сидит."], focus(["👨", "🪑"]), [line("Папа сидит.", "papa_sidit.mp3")], [question("u3-l7-q5", "Что делает?", actionOptions, "sidit")], true),
    slide("u3-l7-9", "Да или нет", ["Кот спит?"], focus(["🐱", "😴"]), [line("Кот спит?", "kot_spit_q.mp3")], [question("u3-l7-q6", "Кот спит?", yesNoOptions, "da")], true),
    slide("u3-l7-10", "Да или нет", ["Собака спит?"], focus(["🐶", "🧍"]), [line("Собака спит?", "sobaka_spit_q.mp3")], [question("u3-l7-q7", "Собака спит?", yesNoOptions, "net")], true),
    slide("u3-l7-11", "Кто?", ["Мама идёт.", "Собака стоит."], focus(["👩🚶", "🐶🧍"]), [line("Мама идёт. Собака стоит.", "u3_l7_mama_sobaka.mp3")], [question("u3-l7-q8", "Кто стоит?", [option("sobaka", "собака", "🐶"), option("mama", "мама", "👩"), option("papa", "папа", "👨")], "sobaka")], true),
    slide("u3-l7-12", "Отлично!", ["Отлично! ✅", "Что делает?", "спит", "сидит", "идёт", "стоит"], wordList([{ text: "спит", emoji: "😴" }, { text: "сидит", emoji: "🪑" }, { text: "идёт", emoji: "🚶" }, { text: "стоит", emoji: "🧍" }]), [line("Отлично!", "otlichno.mp3"), line("Что делает?", "chto_delaet.mp3")], null, true)
  ];

  var lesson8Slides = [
    slide("u3-l8-1", "Ест. Пьёт. Читает.", ["Что делает?"], emoji("🍞💧📖"), [line("Что делает?", "chto_delaet.mp3")], null, true),
    slide("u3-l8-2", "ест", ["Мальчик ест хлеб."], focus(["👦", "🍞"]), [line("Мальчик ест хлеб.", "malchik_est_hleb.mp3")], null, true),
    slide("u3-l8-3", "пьёт", ["Девочка пьёт воду."], focus(["👧", "💧"]), [line("Девочка пьёт воду.", "devochka_pyot_vodu.mp3")], null, true),
    slide("u3-l8-4", "читает", ["Мама читает книгу."], focus(["👩", "📖"]), [line("Мама читает книгу.", "mama_chitaet_knigu.mp3")], null, true),
    slide("u3-l8-5", "играет", ["Кот играет."], focus(["🐱", "⚽"]), [line("Кот играет.", "kot_igraet.mp3")], null, true),
    slide("u3-l8-6", "Читай", ["Мальчик ест хлеб.", "Девочка пьёт воду.", "Мама читает книгу.", "Кот играет."], focus(["👦🍞", "👧💧", "👩📖", "🐱⚽"]), [line("Мальчик ест хлеб. Девочка пьёт воду. Мама читает книгу. Кот играет.", "lesson_8_text.mp3")], [
      question("u3-l8-q1", "Кто ест хлеб?", [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧"), option("mama", "мама", "👩")], "malchik"),
      question("u3-l8-q2", "Кто пьёт воду?", [option("devochka", "девочка", "👧"), option("malchik", "мальчик", "👦"), option("kot", "кот", "🐱")], "devochka"),
      question("u3-l8-q3", "Что делает мама?", dailyActionOptions, "chitaet"),
      question("u3-l8-q4", "Кто играет?", [option("kot", "кот", "🐱"), option("mama", "мама", "👩"), option("malchik", "мальчик", "👦")], "kot")
    ], true),
    slide("u3-l8-7", "Найди", ["Мальчик ест хлеб."], emoji("❓"), [line("Мальчик ест хлеб.", "malchik_est_hleb.mp3")], [question("u3-l8-q5", "Найди:", [option("malchik-est", "", "👦🍞"), option("devochka-pyot", "", "👧💧"), option("mama-chitaet", "", "👩📖")], "malchik-est")], true),
    slide("u3-l8-8", "Действие", ["Девочка пьёт воду."], focus(["👧", "💧"]), [line("Девочка пьёт воду.", "devochka_pyot_vodu.mp3")], [question("u3-l8-q6", "Что делает?", dailyActionOptions, "pyot")], true),
    slide("u3-l8-9", "Кто?", ["Мама читает книгу."], focus(["👩", "📖"]), [line("Мама читает книгу.", "mama_chitaet_knigu.mp3")], [question("u3-l8-q7", "Кто читает?", [option("mama", "мама", "👩"), option("devochka", "девочка", "👧"), option("malchik", "мальчик", "👦")], "mama")], true),
    slide("u3-l8-10", "Да или нет", ["Кот играет?"], focus(["🐱", "⚽"]), [line("Кот играет?", "kot_igraet_q.mp3")], [question("u3-l8-q8", "Кот играет?", yesNoOptions, "da")], true),
    slide("u3-l8-11", "Отлично!", ["Отлично! ✅", "ест", "пьёт", "читает", "играет"], wordList([{ text: "ест", emoji: "🍞" }, { text: "пьёт", emoji: "💧" }, { text: "читает", emoji: "📖" }, { text: "играет", emoji: "⚽" }]), [line("Отлично!", "otlichno.mp3")], null, true)
  ];

  var lesson9Slides = [
    slide("u3-l9-1", "Не", ["не ❌"], emoji("❌"), [line("не", "ne.mp3")], null, true),
    slide("u3-l9-2", "не", ["Кот не спит.", "Кот идёт."], focus(["🐱", "❌😴", "🚶"]), [line("Кот не спит. Кот идёт.", "kot_ne_spit_kot_idyot.mp3")], null, true),
    slide("u3-l9-3", "не", ["Папа не идёт.", "Папа сидит."], focus(["👨", "❌🚶", "🪑"]), [line("Папа не идёт. Папа сидит.", "papa_ne_idyot_papa_sidit.mp3")], null, true),
    slide("u3-l9-4", "видит", ["Мама видит дом."], focus(["👩", "👀", "🏠"]), [line("Мама видит дом.", "mama_vidit_dom.mp3")], null, true),
    slide("u3-l9-5", "видит", ["Девочка видит мяч."], focus(["👧", "👀", "⚽"]), [line("Девочка видит мяч.", "devochka_vidit_myach.mp3")], null, true),
    slide("u3-l9-6", "Читай", ["Мама здесь.", "Мама видит дом.", "Папа сидит.", "Кот не спит.", "Кот идёт."], focus(["👩👇", "👀🏠", "👨🪑", "🐱❌😴", "🐱🚶"]), [line("Мама здесь. Мама видит дом. Папа сидит. Кот не спит. Кот идёт.", "lesson_9_text.mp3")], [
      question("u3-l9-q1", "Кто видит дом?", [option("mama", "мама", "👩"), option("papa", "папа", "👨"), option("kot", "кот", "🐱")], "mama"),
      question("u3-l9-q2", "Что делает папа?", actionOptions, "sidit"),
      question("u3-l9-q3", "Кот спит?", yesNoOptions, "net"),
      question("u3-l9-q4", "Кто идёт?", [option("kot", "кот", "🐱"), option("papa", "папа", "👨"), option("mama", "мама", "👩")], "kot")
    ], true),
    slide("u3-l9-7", "Да или нет", ["Кот спит?"], focus(["🐱", "🚶"]), [line("Кот спит?", "kot_spit_q.mp3")], [question("u3-l9-q5", "Кот спит?", yesNoOptions, "net")], true),
    slide("u3-l9-8", "Действие", ["Папа сидит."], focus(["👨", "🪑"]), [line("Папа сидит.", "papa_sidit.mp3")], [question("u3-l9-q6", "Что делает папа?", actionOptions, "sidit")], true),
    slide("u3-l9-9", "Кто?", ["Кот идёт."], focus(["🐱", "🚶"]), [line("Кот идёт.", "kot_idyot.mp3")], [question("u3-l9-q7", "Кто идёт?", whoOptions, "kot")], true),
    slide("u3-l9-10", "Что?", ["Девочка видит мяч."], focus(["👧", "👀", "⚽"]), [line("Девочка видит мяч.", "devochka_vidit_myach.mp3")], [question("u3-l9-q8", "Что видит девочка?", [option("myach", "мяч", "⚽"), option("telefon", "телефон", "📱"), option("dom", "дом", "🏠")], "myach")], true),
    slide("u3-l9-11", "Отлично!", ["Отлично! ✅", "не", "видит", "Что делает?"], wordList([{ text: "не", emoji: "❌" }, { text: "видит", emoji: "👀" }, { text: "спит", emoji: "😴" }, { text: "идёт", emoji: "🚶" }]), [line("Отлично!", "otlichno.mp3"), line("Что делает?", "chto_delaet.mp3")], null, true)
  ];

  var game1 = {
    id: "unit-3-game-actions",
    gameSlug: "unit-3-game-actions",
    title: "Игра: Что делает?",
    finalTitle: "Отлично! Маленький мир живёт! 🏆",
    finalText: "Что делает?",
    finalWords: ["спит", "сидит", "идёт", "стоит", "ест", "пьёт", "читает", "играет"],
    stages: [
      {
        type: "image_to_word",
        title: "Что делает?",
        instruction: "Что делает?",
        tasks: [
          { id: "u3g1-1", visual: "🐱😴", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "spit" },
          { id: "u3g1-2", visual: "👨🪑", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "sidit" },
          { id: "u3g1-3", visual: "👩🚶", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "idyot" },
          { id: "u3g1-4", visual: "🐶🧍", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "stoit" },
          { id: "u3g1-5", visual: "👦🍞", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: dailyActionOptions, correct: "est" },
          { id: "u3g1-6", visual: "👧💧", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: dailyActionOptions, correct: "pyot" },
          { id: "u3g1-7", visual: "👩📖", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: dailyActionOptions, correct: "chitaet" },
          { id: "u3g1-8", visual: "🐱⚽", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: dailyActionOptions, correct: "igraet" },
          { id: "u3g1-extra-1", visual: "🐶😴", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "spit" },
          { id: "u3g1-extra-2", visual: "👦🚶", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "idyot" },
          { id: "u3g1-extra-3", visual: "👩🪑", text: "Что делает?", audio: audio("chto_delaet.mp3"), options: actionOptions, correct: "sidit" }
        ]
      }
    ]
  };

  var game2 = {
    id: "unit-3-game-truth",
    gameSlug: "unit-3-game-truth",
    title: "Игра 2: Правда или нет?",
    finalTitle: "Ты читаешь действия! 🏆",
    finalText: "да / нет",
    finalWords: ["Кот спит.", "Мама видит дом.", "Девочка пьёт воду."],
    stages: [
      {
        type: "yes_no",
        title: "Правда или нет?",
        instruction: "Правда?",
        tasks: [
          { id: "u3g2-1", visual: "🐱😴", text: "Кот спит.", audio: audio("kot_spit.mp3"), question: "Кот спит.", options: yesNoOptions, correct: "da" },
          { id: "u3g2-2", visual: "🐱😴", text: "Кот идёт.", audio: audio("kot_idyot.mp3"), question: "Кот идёт.", options: yesNoOptions, correct: "net" },
          { id: "u3g2-3", visual: "👨🪑", text: "Папа сидит.", audio: audio("papa_sidit.mp3"), question: "Папа сидит.", options: yesNoOptions, correct: "da" },
          { id: "u3g2-4", visual: "👩🚶", text: "Мама сидит.", audio: audio("mama_sidit.mp3"), question: "Мама сидит.", options: yesNoOptions, correct: "net" },
          { id: "u3g2-5", visual: "👧💧", text: "Девочка пьёт воду.", audio: audio("devochka_pyot_vodu.mp3"), question: "Девочка пьёт воду.", options: yesNoOptions, correct: "da" },
          { id: "u3g2-6", visual: "👦🍞", text: "Мальчик читает книгу.", audio: audio("malchik_chitaet_knigu.mp3"), question: "Мальчик читает книгу.", options: yesNoOptions, correct: "net" },
          { id: "u3g2-7", visual: "👩👀🏠", text: "Мама видит дом.", audio: audio("mama_vidit_dom.mp3"), question: "Мама видит дом.", options: yesNoOptions, correct: "da" },
          { id: "u3g2-8", visual: "👧👀⚽", text: "Девочка видит телефон.", audio: audio("devochka_vidit_telefon.mp3"), question: "Девочка видит телефон.", options: yesNoOptions, correct: "net" }
        ]
      }
    ]
  };

  var game3MapTasks = [
    mapTask("u3-map-1", "Найди: кот спит.", "🔎🐱💤", "naydi_kot_spit.mp3", { x: 0, y: 4 }, { x: 3, y: 1 }, [
      mapObj("kot-spit", "🐱💤", 3, 1, "animal"),
      mapObj("mama-chitaet", "👩📖", 1, 0, "person"),
      mapObj("malchik-est", "👦🍞", 4, 3, "person"),
      mapObj("sobaka-igraet", "🐶⚽", 0, 2, "animal"),
      mapObj("telefon", "📱", 2, 4, "object")
    ], "Кот спит."),
    mapTask("u3-map-2", "Найди: мама читает.", "🔎👩📖", "naydi_mama_chitaet.mp3", { x: 4, y: 4 }, { x: 1, y: 1 }, [
      mapObj("mama-chitaet", "👩📖", 1, 1, "person"),
      mapObj("kot-spit", "🐱💤", 4, 0, "animal"),
      mapObj("devochka-pyot", "👧💧", 2, 3, "person"),
      mapObj("papa-sidit", "👨🪑", 0, 4, "person"),
      mapObj("myach", "⚽", 3, 2, "object")
    ], "Мама читает."),
    mapTask("u3-map-3", "Найди: мальчик ест хлеб.", "🔎👦🍞", "naydi_malchik_est_hleb.mp3", { x: 2, y: 4 }, { x: 4, y: 1 }, [
      mapObj("malchik-est", "👦🍞", 4, 1, "person"),
      mapObj("devochka-pyot", "👧💧", 0, 1, "person"),
      mapObj("mama-idyot", "👩🚶", 2, 0, "person"),
      mapObj("kot-igraet", "🐱⚽", 1, 3, "animal"),
      mapObj("kniga", "📖", 3, 4, "object")
    ], "Мальчик ест хлеб."),
    mapTask("u3-map-4", "Найди: девочка пьёт воду.", "🔎👧💧", "naydi_devochka_pyot_vodu.mp3", { x: 0, y: 0 }, { x: 3, y: 3 }, [
      mapObj("devochka-pyot", "👧💧", 3, 3, "person"),
      mapObj("malchik-est", "👦🍞", 1, 1, "person"),
      mapObj("sobaka-stoit", "🐶🧍", 4, 0, "animal"),
      mapObj("mama-chitaet", "👩📖", 0, 4, "person"),
      mapObj("hleb", "🍞", 2, 2, "food")
    ], "Девочка пьёт воду."),
    mapTask("u3-map-5", "Найди: собака играет.", "🔎🐶⚽", "naydi_sobaka_igraet.mp3", { x: 4, y: 0 }, { x: 1, y: 4 }, [
      mapObj("sobaka-igraet", "🐶⚽", 1, 4, "animal"),
      mapObj("kot-spit", "🐱💤", 3, 2, "animal"),
      mapObj("papa-sidit", "👨🪑", 0, 1, "person"),
      mapObj("devochka-pyot", "👧💧", 4, 4, "person"),
      mapObj("dom", "🏠", 2, 0, "house")
    ], "Собака играет."),
    mapTask("u3-map-6", "Кто сидит?", "❓🪑", "kto_sidit.mp3", { x: 0, y: 4 }, { x: 2, y: 2 }, [
      mapObj("papa-sidit", "👨🪑", 2, 2, "person"),
      mapObj("mama-idyot", "👩🚶", 4, 3, "person"),
      mapObj("kot-spit", "🐱💤", 0, 0, "animal"),
      mapObj("devochka-pyot", "👧💧", 3, 0, "person")
    ], "Папа сидит."),
    mapTask("u3-map-7", "Кто идёт?", "❓🚶", "kto_idyot.mp3", { x: 4, y: 4 }, { x: 1, y: 2 }, [
      mapObj("mama-idyot", "👩🚶", 1, 2, "person"),
      mapObj("papa-sidit", "👨🪑", 4, 1, "person"),
      mapObj("sobaka-stoit", "🐶🧍", 0, 4, "animal"),
      mapObj("malchik-est", "👦🍞", 2, 0, "person")
    ], "Мама идёт."),
    mapTask("u3-map-8", "Кто видит дом?", "❓👀🏠", "kto_vidit_dom.mp3", { x: 2, y: 4 }, { x: 4, y: 2 }, [
      mapObj("devochka-vidit-dom", "👧👀🏠", 4, 2, "person"),
      mapObj("mama-chitaet", "👩📖", 0, 1, "person"),
      mapObj("kot-igraet", "🐱⚽", 2, 0, "animal"),
      mapObj("telefon", "📱", 1, 3, "object"),
      mapObj("dom", "🏠", 3, 4, "house")
    ], "Девочка видит дом."),
    mapTask("u3-map-9", "Найди: кот не спит.", "🔎🐱❌😴", "naydi_kot_ne_spit.mp3", { x: 0, y: 0 }, { x: 3, y: 4 }, [
      mapObj("kot-ne-spit", "🐱🚶", 3, 4, "animal"),
      mapObj("kot-spit", "🐱💤", 1, 1, "animal"),
      mapObj("sobaka-igraet", "🐶⚽", 4, 0, "animal"),
      mapObj("mama-idyot", "👩🚶", 0, 3, "person"),
      mapObj("myach", "⚽", 2, 2, "object")
    ], "Кот не спит. Кот идёт."),
    mapTask("u3-map-10", "Найди: папа не идёт.", "🔎👨❌🚶", "naydi_papa_ne_idyot.mp3", { x: 4, y: 4 }, { x: 0, y: 2 }, [
      mapObj("papa-ne-idyot", "👨🪑", 0, 2, "person"),
      mapObj("mama-idyot", "👩🚶", 3, 0, "person"),
      mapObj("devochka-vidit-dom", "👧👀🏠", 2, 3, "person"),
      mapObj("kot-spit", "🐱💤", 4, 1, "animal"),
      mapObj("voda", "💧", 1, 4, "water")
    ], "Папа не идёт. Папа сидит.")
  ];
  game3MapTasks.forEach(function (task, index) {
    task.roundLabel = (index + 1) + " / " + game3MapTasks.length;
  });

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

  function worldUnit(id, title, icon, game) {
    return {
      id: id,
      title: title,
      icon: icon,
      stages: [
        {
          type: "world-mission-game",
          title: title,
          tasks: [game]
        }
      ]
    };
  }

  function worldStage(id, type, title, instruction, tasks) {
    return {
      id: id,
      type: type,
      title: title,
      instruction: instruction,
      tasks: tasks
    };
  }

  function sceneItem(id, emojiText, label) {
    return {
      id: id,
      emoji: emojiText,
      label: label || ""
    };
  }

  var yardItems = [
    sceneItem("kot", "🐱💤", "кот"),
    sceneItem("mama", "👩📖", "мама"),
    sceneItem("malchik", "👦🍞", "мальчик"),
    sceneItem("devochka", "👧💧", "девочка"),
    sceneItem("papa", "👨🪑", "папа"),
    sceneItem("sobaka", "🐶⚽", "собака")
  ];

  var yardMoveItems = [
    sceneItem("kot", "🐱🚶", "кот"),
    sceneItem("mama", "👩👀🏠", "мама"),
    sceneItem("malchik", "👦🍞", "мальчик"),
    sceneItem("devochka", "👧💧", "девочка"),
    sceneItem("papa", "👨🪑", "папа"),
    sceneItem("sobaka", "🐶⚽", "собака")
  ];

  function sceneTapTask(id, command, file, items, correctTarget, successText) {
    return {
      id: id,
      command: command,
      text: command,
      audio: audio(file),
      items: items,
      correctTarget: correctTarget,
      successText: successText || "Да! ✅",
      errorText: "Смотри ещё 🙂"
    };
  }

  function freezeTask(id, command, file, correctState, states) {
    return {
      id: id,
      command: command,
      text: command,
      audio: audio(file),
      correctState: correctState,
      states: states,
      interval: 1900,
      successText: "Поймал! ✅",
      errorText: "Ещё кадр 🙂"
    };
  }

  function directorTask(id, phrase, file, groups, correct, resultEmoji) {
    return {
      id: id,
      command: phrase,
      text: phrase,
      audio: audio(file),
      groups: groups,
      correct: correct,
      resultEmoji: resultEmoji,
      successText: "Сцена готова! ✅",
      errorText: "Собери ещё 🙂"
    };
  }

  function movieTask(id, title, file, frames) {
    return {
      id: id,
      command: title,
      text: title,
      audio: audio(file),
      frames: frames,
      successText: "Кадр готов! ✅",
      errorText: "Смотри фильм ещё 🙂"
    };
  }

  var directorWho = [
    option("kot", "кот", "🐱"),
    option("mama", "мама", "👩"),
    option("papa", "папа", "👨"),
    option("malchik", "мальчик", "👦"),
    option("devochka", "девочка", "👧"),
    option("sobaka", "собака", "🐶")
  ];

  var directorActions = [
    option("spit", "спит", "😴"),
    option("sidit", "сидит", "🪑"),
    option("chitaet", "читает", "📖"),
    option("est", "ест", "🍞"),
    option("pyot", "пьёт", "💧"),
    option("igraet", "играет", "⚽"),
    option("idyot", "идёт", "🚶"),
    option("vidit", "видит", "👀")
  ];

  var directorObjects = [
    option("kniga", "книга", "📖"),
    option("hleb", "хлеб", "🍞"),
    option("voda", "вода", "💧"),
    option("myach", "мяч", "⚽"),
    option("dom", "дом", "🏠")
  ];

  function directorGroups(includeObject) {
    var groups = [
      { key: "who", title: "Кто?", options: directorWho },
      { key: "action", title: "Что делает?", options: directorActions }
    ];

    if (includeObject) {
      groups.push({ key: "object", title: "Что?", options: directorObjects });
    }

    return groups;
  }

  dictionary.push(
    entry("u3-zhivoy-dvor", "живой двор", "🌳", "chunk", "zhivoy_dvor.mp3"),
    entry("u3-poimay", "поймай", "🎬", "word", "poimay.mp3"),
    entry("u3-ne-trogay-kota", "не трогай кота", "🐱💤", "chunk", "ne_trogay_kota.mp3"),
    entry("u3-rezhissyor", "режиссёр", "🎬", "word", "rezhissyor.mp3"),
    entry("u3-malenkiy-film", "маленький фильм", "🎥", "chunk", "malenkiy_film.mp3")
  );

  var livingYardGame = {
    id: "unit-3-game-living-yard-data",
    gameSlug: "unit-3-game-living-yard",
    title: "Игра: Живой двор",
    icon: "🌳",
    finalTitle: "Двор живёт! 🏆",
    finalText: "Кто что делает?",
    finalWords: ["кот спит", "мама читает", "мальчик ест", "девочка пьёт"],
    stages: [
      worldStage("u3-yard-stage", "scene_tap", "Живой двор", "Найди:", [
        sceneTapTask("u3-yard-1", "Кто спит?", "kto_spit.mp3", yardItems, "kot", "Да! Кот спит. ✅"),
        sceneTapTask("u3-yard-2", "Кто читает?", "kto_chitaet.mp3", yardItems, "mama", "Да! Мама читает. ✅"),
        sceneTapTask("u3-yard-3", "Кто ест хлеб?", "kto_est_hleb.mp3", yardItems, "malchik", "Да! Мальчик ест хлеб. ✅"),
        sceneTapTask("u3-yard-4", "Кто пьёт воду?", "kto_pyot_vodu.mp3", yardItems, "devochka", "Да! Девочка пьёт воду. ✅"),
        sceneTapTask("u3-yard-5", "Кто сидит?", "kto_sidit.mp3", yardItems, "papa", "Да! Папа сидит. ✅"),
        sceneTapTask("u3-yard-6", "Кто играет?", "kto_igraet.mp3", yardItems, "sobaka", "Да! Собака играет. ✅"),
        sceneTapTask("u3-yard-7", "Кто видит дом?", "kto_vidit_dom.mp3", yardMoveItems, "mama", "Да! Мама видит дом. ✅"),
        sceneTapTask("u3-yard-8", "Кто идёт?", "kto_idyot.mp3", yardMoveItems, "kot", "Да! Кот идёт. ✅")
      ])
    ]
  };

  var freezeGame = {
    id: "unit-3-game-freeze-data",
    gameSlug: "unit-3-game-freeze",
    title: "Игра: Стоп-кадр",
    icon: "🎬",
    finalTitle: "Кадры пойманы! 🏆",
    finalText: "Стоп-кадр",
    finalWords: ["кот спит", "мама читает", "папа сидит"],
    stages: [
      worldStage("u3-freeze-stage", "freeze", "Стоп-кадр", "Поймай:", [
        freezeTask("u3-freeze-1", "Поймай: кот спит.", "poimay_kot_spit.mp3", "spit", [
          { id: "spit", emoji: "🐱💤", text: "Кот спит." },
          { id: "idyot", emoji: "🐱🚶", text: "Кот идёт." },
          { id: "igraet", emoji: "🐱⚽", text: "Кот играет." }
        ]),
        freezeTask("u3-freeze-2", "Поймай: мама читает.", "poimay_mama_chitaet.mp3", "chitaet", [
          { id: "idyot", emoji: "👩🚶", text: "Мама идёт." },
          { id: "chitaet", emoji: "👩📖", text: "Мама читает." },
          { id: "vidit", emoji: "👩👀🏠", text: "Мама видит дом." }
        ]),
        freezeTask("u3-freeze-3", "Поймай: папа сидит.", "poimay_papa_sidit.mp3", "sidit", [
          { id: "idyot", emoji: "👨🚶", text: "Папа идёт." },
          { id: "sidit", emoji: "👨🪑", text: "Папа сидит." },
          { id: "chitaet", emoji: "👨📖", text: "Папа читает." }
        ]),
        freezeTask("u3-freeze-4", "Поймай: собака стоит.", "poimay_sobaka_stoit.mp3", "stoit", [
          { id: "igraet", emoji: "🐶⚽", text: "Собака играет." },
          { id: "stoit", emoji: "🐶🧍", text: "Собака стоит." },
          { id: "sidit", emoji: "🐶🪑", text: "Собака сидит." }
        ]),
        freezeTask("u3-freeze-5", "Поймай: девочка пьёт воду.", "poimay_devochka_pyot_vodu.mp3", "pyot", [
          { id: "igraet", emoji: "👧⚽", text: "Девочка играет." },
          { id: "pyot", emoji: "👧💧", text: "Девочка пьёт воду." },
          { id: "chitaet", emoji: "👧📖", text: "Девочка читает." }
        ]),
        freezeTask("u3-freeze-6", "Поймай: мальчик ест хлеб.", "poimay_malchik_est_hleb.mp3", "est", [
          { id: "idyot", emoji: "👦🚶", text: "Мальчик идёт." },
          { id: "est", emoji: "👦🍞", text: "Мальчик ест хлеб." },
          { id: "pyot", emoji: "👦💧", text: "Мальчик пьёт воду." }
        ])
      ])
    ]
  };

  var sleepyCatItems = [
    sceneItem("kot-spit", "🐱💤", "кот"),
    sceneItem("mama", "👩📖", "мама"),
    sceneItem("myach", "⚽", "мяч"),
    sceneItem("sobaka", "🐶⚽", "собака")
  ];

  var awakeCatItems = [
    sceneItem("kot", "🐱🚶", "кот"),
    sceneItem("mama", "👩📖", "мама"),
    sceneItem("myach", "⚽", "мяч"),
    sceneItem("sobaka", "🐶⚽", "собака")
  ];

  var dontWakeCatGame = {
    id: "unit-3-game-dont-wake-cat-data",
    gameSlug: "unit-3-game-dont-wake-cat",
    title: "Игра: Не разбуди кота",
    icon: "🐱💤",
    finalTitle: "Тихо и точно! 🏆",
    finalText: "Кот спит. Кот идёт.",
    finalWords: ["не трогай кота", "найди маму", "найди мяч"],
    stages: [
      worldStage("u3-cat-stage", "stealth", "Не разбуди кота", "Тихо:", [
        Object.assign(sceneTapTask("u3-cat-1", "Кот спит. Найди маму.", "kot_spit_naydi_mamu.mp3", sleepyCatItems, "mama", "Да! Мама. ✅"), { forbiddenTarget: "kot-spit", forbiddenFeedback: "Тихо! Кот спит. 🙂" }),
        Object.assign(sceneTapTask("u3-cat-2", "Кот спит. Найди мяч.", "kot_spit_naydi_myach.mp3", sleepyCatItems, "myach", "Да! Мяч. ✅"), { forbiddenTarget: "kot-spit", forbiddenFeedback: "Тихо! Кот спит. 🙂" }),
        Object.assign(sceneTapTask("u3-cat-3", "Кот спит. Найди собаку.", "kot_spit_naydi_sobaku.mp3", sleepyCatItems, "sobaka", "Да! Собака. ✅"), { forbiddenTarget: "kot-spit", forbiddenFeedback: "Тихо! Кот спит. 🙂" }),
        sceneTapTask("u3-cat-4", "Кот не спит. Найди кота.", "kot_ne_spit_naydi_kota.mp3", awakeCatItems, "kot", "Да! Кот не спит. ✅"),
        sceneTapTask("u3-cat-5", "Кот идёт. Где кот?", "kot_idyot_gde_kot.mp3", awakeCatItems, "kot", "Да! Кот идёт. ✅"),
        sceneTapTask("u3-cat-6", "Кот играет. Найди кота.", "kot_igraet_naydi_kota.mp3", [sceneItem("kot", "🐱⚽", "кот"), sceneItem("mama", "👩📖", "мама"), sceneItem("myach", "⚽", "мяч"), sceneItem("sobaka", "🐶🧍", "собака")], "kot", "Да! Кот играет. ✅")
      ])
    ]
  };

  var directorGame = {
    id: "unit-3-game-director-data",
    gameSlug: "unit-3-game-director",
    title: "Игра: Режиссёр",
    icon: "🎬",
    finalTitle: "Фильм готов! 🏆",
    finalText: "Режиссёр",
    finalWords: ["кот спит", "мама читает", "девочка видит мяч"],
    stages: [
      worldStage("u3-director-stage", "director", "Режиссёр", "Собери сцену:", [
        directorTask("u3-director-1", "Кот спит.", "kot_spit.mp3", directorGroups(false), { who: "kot", action: "spit" }, "🐱💤"),
        directorTask("u3-director-2", "Папа сидит.", "papa_sidit.mp3", directorGroups(false), { who: "papa", action: "sidit" }, "👨🪑"),
        directorTask("u3-director-3", "Мама читает книгу.", "mama_chitaet_knigu.mp3", directorGroups(true), { who: "mama", action: "chitaet", object: "kniga" }, "👩📖"),
        directorTask("u3-director-4", "Мальчик ест хлеб.", "malchik_est_hleb.mp3", directorGroups(true), { who: "malchik", action: "est", object: "hleb" }, "👦🍞"),
        directorTask("u3-director-5", "Девочка пьёт воду.", "devochka_pyot_vodu.mp3", directorGroups(true), { who: "devochka", action: "pyot", object: "voda" }, "👧💧"),
        directorTask("u3-director-6", "Собака играет.", "sobaka_igraet.mp3", directorGroups(false), { who: "sobaka", action: "igraet" }, "🐶⚽"),
        directorTask("u3-director-7", "Кот не спит. Кот идёт.", "kot_ne_spit_kot_idyot.mp3", directorGroups(false), { who: "kot", action: "idyot" }, "🐱🚶"),
        directorTask("u3-director-8", "Девочка видит мяч.", "devochka_vidit_myach.mp3", directorGroups(true), { who: "devochka", action: "vidit", object: "myach" }, "👧👀⚽")
      ])
    ]
  };

  var movieGame = {
    id: "unit-3-game-movie-scene-data",
    gameSlug: "unit-3-game-movie-scene",
    title: "Игра: Маленький фильм",
    icon: "🎥",
    finalTitle: "Маленький фильм готов! 🏆",
    finalText: "Кадр за кадром",
    finalWords: ["кот спит", "кот идёт", "мама идёт"],
    stages: [
      worldStage("u3-movie-stage", "movie", "Маленький фильм", "Выбери кадр:", [
        movieTask("u3-movie-1", "Фильм: кот", "film_kot.mp3", [
          { id: "kot-spit", text: "Кот спит.", emoji: "🐱💤", audio: audio("kot_spit.mp3") },
          { id: "kot-ne-spit", text: "Кот не спит.", emoji: "🐱❌💤", audio: audio("kot_ne_spit.mp3") },
          { id: "kot-idyot", text: "Кот идёт.", emoji: "🐱🚶", audio: audio("kot_idyot.mp3") }
        ]),
        movieTask("u3-movie-2", "Фильм: мальчик", "film_malchik.mp3", [
          { id: "malchik-est", text: "Мальчик ест хлеб.", emoji: "👦🍞", audio: audio("malchik_est_hleb.mp3") },
          { id: "malchik-pyot", text: "Мальчик пьёт воду.", emoji: "👦💧", audio: audio("malchik_pyot_vodu.mp3") },
          { id: "malchik-igraet", text: "Мальчик играет.", emoji: "👦⚽", audio: audio("malchik_igraet.mp3") }
        ]),
        movieTask("u3-movie-3", "Фильм: мама", "film_mama.mp3", [
          { id: "mama-chitaet", text: "Мама читает книгу.", emoji: "👩📖", audio: audio("mama_chitaet_knigu.mp3") },
          { id: "mama-vidit-dom", text: "Мама видит дом.", emoji: "👩👀🏠", audio: audio("mama_vidit_dom.mp3") },
          { id: "mama-idyot", text: "Мама идёт.", emoji: "👩🚶", audio: audio("mama_idyot.mp3") }
        ])
      ])
    ]
  };

  root.LexiLandUnit3Lesson = {
    id: "level-0-unit-3-actions",
    order: 5,
    menuLabel: "Юнит 3",
    title: "Юнит 3: Что делает? Маленький мир живёт",
    subtitle: "Действия: спит, идёт, сидит, ест, пьёт, читает",
    level: "Уровень 0",
    coverEmoji: "🏃",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-7-chto-delaet", "Урок 7: Что делает?", "❓🎬", "Урок 7: Что делает?", lesson7Slides),
      unit("lesson-8-est-pyot-chitaet", "Урок 8: Ест, пьёт, читает", "🍞💧📖", "Урок 8: Ест, пьёт, читает", lesson8Slides),
      unit("lesson-9-ne-vidit-kto-chto-delaet", "Урок 9: Не. Видит. Кто что делает?", "❌👀", "Урок 9: Не. Видит. Кто что делает?", lesson9Slides),
      {
        id: "unit-3-game-chto-delaet",
        title: "Игра: Что делает?",
        icon: "🎬",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра: Что делает?",
            tasks: [game1]
          }
        ]
      },
      {
        id: "unit-3-game-pravda-ili-net",
        title: "Игра 2: Правда или нет?",
        icon: "✅",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра 2: Правда или нет?",
            tasks: [game2]
          }
        ]
      },
      {
        id: "unit-3-game-zhivoy-mir",
        title: "Игра 3: Живой мир",
        icon: "🌍",
        stages: [
          {
            type: "map-command-game",
            title: "Игра 3: Живой мир",
            tasks: game3MapTasks
          },
          {
            type: "slides",
            title: "Игра 3: Живой мир",
            tasks: [
              slide("u3-game3-final", "Ты нашёл все действия! 🏆", ["Кто спит?", "Кто идёт?", "Кто читает?", "Ты знаешь!"], wordList([{ text: "кот спит", emoji: "🐱💤" }, { text: "мама читает", emoji: "👩📖" }, { text: "мальчик ест", emoji: "👦🍞" }, { text: "девочка пьёт", emoji: "👧💧" }]), [line("Отлично! Маленький мир живёт!", "u3_game3_final.mp3")], null, true)
            ]
          }
        ]
      },
      worldUnit("unit-3-game-living-yard", "Игра: Живой двор", "🌳", livingYardGame),
      worldUnit("unit-3-game-freeze", "Игра: Стоп-кадр", "🎬", freezeGame),
      worldUnit("unit-3-game-dont-wake-cat", "Игра: Не разбуди кота", "🐱💤", dontWakeCatGame),
      worldUnit("unit-3-game-director", "Игра: Режиссёр", "🎬", directorGame),
      worldUnit("unit-3-game-movie-scene", "Игра: Маленький фильм", "🎥", movieGame)
    ]
  };

  root.LexiLandUnit3 = root.LexiLandUnit3Lesson;
}(typeof window !== "undefined" ? window : globalThis));
