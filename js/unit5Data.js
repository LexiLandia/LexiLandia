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
      kind: kind || "object"
    };
  }

  function mapTask(id, text, emojiText, file, start, target, objects, phrase) {
    return {
      id: id,
      text: text,
      emoji: emojiText,
      audio: audio(file),
      width: 5,
      height: 5,
      start: start,
      target: target,
      objects: objects || [],
      checkLabel: "✅ Проверить",
      correctFeedback: "Да! " + (phrase || text) + " ✅",
      wrongFeedback: "Не здесь. Попробуй ещё раз."
    };
  }

  function gameTask(id, visual, questionText, file, options, correct, speechText, correctFeedback, wrongFeedback) {
    return {
      id: id,
      visual: visual,
      text: speechText || questionText,
      question: questionText,
      audio: audio(file),
      options: options,
      correct: correct,
      correctFeedback: correctFeedback || "",
      wrongFeedback: wrongFeedback || ""
    };
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

  var meanings = {
    "иди": m("иди", "🚶"),
    "стой": m("стой", "🛑"),
    "сюда": m("сюда", "👈🙂"),
    "туда": m("туда", "👉"),
    "вверх": m("вверх", "⬆️"),
    "вниз": m("вниз", "⬇️"),
    "налево": m("налево", "⬅️"),
    "направо": m("направо", "➡️"),
    "прямо": m("прямо", "⬆️"),
    "шаг": m("шаг", "👣"),
    "шага": m("шага", "👣"),
    "один": m("один", "1️⃣"),
    "два": m("два", "2️⃣"),
    "три": m("три", "3️⃣"),
    "куда": m("куда", "🧭❓"),
    "я": m("я", "🙂👈"),
    "ты": m("ты", "🙂👉"),
    "иду": m("иду", "🙂🚶"),
    "идёшь": m("идёшь", "🧑🚶"),
    "идёт": m("идёт", "🚶"),
    "домой": m("домой", "🏠"),
    "дом": m("дом", "🏠"),
    "магазин": m("магазин", "🏪"),
    "парк": m("парк", "🌳🌳🌳"),
    "кафе": m("кафе", "🏢☕"),
    "мама": m("мама", "👩"),
    "папа": m("папа", "👨"),
    "мальчик": m("мальчик", "👦"),
    "девочка": m("девочка", "👧"),
    "кот": m("кот", "🐱"),
    "собака": m("собака", "🐶"),
    "вода": m("вода", "💧"),
    "хлеб": m("хлеб", "🍞"),
    "мяч": m("мяч", "⚽"),
    "да": m("да", "✅"),
    "нет": m("нет", "❌")
  };

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var placeOptions = [
    option("dom", "дом", "🏠"),
    option("magazin", "магазин", "🏪"),
    option("park", "парк", "🌳🌳🌳"),
    option("kafe", "кафе", "🏢☕")
  ];

  var placeEmojiOptions = [
    option("dom", "", "🏠"),
    option("magazin", "", "🏪"),
    option("park", "", "🌳🌳🌳"),
    option("kafe", "", "🏢☕")
  ];

  var arrowOptions = [
    option("up", "", "⬆️"),
    option("down", "", "⬇️"),
    option("left", "", "⬅️"),
    option("right", "", "➡️"),
    option("stop", "", "🛑")
  ];

  var directionWordOptions = [
    option("up", "вверх", "⬆️"),
    option("down", "вниз", "⬇️"),
    option("left", "налево", "⬅️"),
    option("right", "направо", "➡️"),
    option("straight", "прямо", "⬆️")
  ];

  var dictionary = [
    entry("u5-idi", "иди", "🚶", "word", "idi.mp3"),
    entry("u5-stoy", "стой", "🛑", "word", "stoy.mp3"),
    entry("u5-syuda", "сюда", "👈🙂", "word", "syuda.mp3"),
    entry("u5-tuda", "туда", "👉", "word", "tuda.mp3"),
    entry("u5-vverh", "вверх", "⬆️", "word", "vverh.mp3"),
    entry("u5-vniz", "вниз", "⬇️", "word", "vniz.mp3"),
    entry("u5-nalevo", "налево", "⬅️", "word", "nalevo.mp3"),
    entry("u5-napravo", "направо", "➡️", "word", "napravo.mp3"),
    entry("u5-pryamo", "прямо", "⬆️", "word", "pryamo.mp3"),
    entry("u5-shag", "шаг", "👣", "word", "shag.mp3"),
    entry("u5-shaga", "шага", "👣", "word", "shaga.mp3"),
    entry("u5-odin", "один", "1️⃣", "word", "odin.mp3"),
    entry("u5-dva", "два", "2️⃣", "word", "dva.mp3"),
    entry("u5-tri", "три", "3️⃣", "word", "tri.mp3"),
    entry("u5-kuda", "куда?", "🧭❓", "chunk", "kuda.mp3"),
    entry("u5-ya-idu", "я иду", "🙂🚶", "chunk", "ya_idu.mp3"),
    entry("u5-ty-idesh", "ты идёшь", "🧑🚶", "chunk", "ty_idyosh.mp3"),
    entry("u5-on-idyot", "он идёт", "👦🚶", "chunk", "on_idyot.mp3"),
    entry("u5-ona-idyot", "она идёт", "👧🚶", "chunk", "ona_idyot.mp3"),
    entry("u5-domoy", "домой", "🏠", "word", "domoy.mp3"),
    entry("u5-dom", "дом", "🏠", "word", "dom.mp3"),
    entry("u5-magazin", "магазин", "🏪", "word", "magazin.mp3"),
    entry("u5-park", "парк", "🌳🌳🌳", "word", "park.mp3"),
    entry("u5-kafe", "кафе", "🏢☕", "word", "kafe.mp3"),
    entry("u5-da", "да", "✅", "word", "da.mp3"),
    entry("u5-net", "нет", "❌", "word", "net.mp3")
  ];

  var lesson13Slides = [
    slide("u5-l13-1", "Иди", ["Иди."], focus(["🙂", "→", "🏠"]), [line("Иди.", "idi.mp3")], null, true),
    slide("u5-l13-2", "иди", ["иди", "Иди."], focus(["🙂", "🚶"]), [line("иди", "idi.mp3")], null, true),
    slide("u5-l13-3", "стой", ["Стой."], emoji("🛑"), [line("Стой.", "stoy.mp3")], null, true),
    slide("u5-l13-4", "сюда", ["Иди сюда."], focus(["👋", "←", "🙂"]), [line("Иди сюда.", "idi_syuda.mp3")], null, true),
    slide("u5-l13-5", "туда", ["Иди туда."], focus(["🙂", "→", "🏠"]), [line("Иди туда.", "idi_tuda.mp3")], null, true),
    slide("u5-l13-6", "места", ["дом", "магазин", "парк", "кафе"], wordList([{ text: "дом", emoji: "🏠" }, { text: "магазин", emoji: "🏪" }, { text: "парк", emoji: "🌳🌳🌳" }, { text: "кафе", emoji: "🏢☕" }]), [line("дом. магазин. парк. кафе.", "dom_magazin_park_kafe.mp3")], null, true),
    slide("u5-l13-7", "в дом", ["Иди в дом."], focus(["🙂", "→", "🏠"]), [line("Иди в дом.", "idi_v_dom.mp3")], null, true),
    slide("u5-l13-8", "в магазин", ["Иди в магазин."], focus(["🙂", "→", "🏪"]), [line("Иди в магазин.", "idi_v_magazin.mp3")], null, true),
    slide("u5-l13-9", "в парк", ["Иди в парк."], focus(["🙂", "→", "🌳🌳🌳"]), [line("Иди в парк.", "idi_v_park.mp3")], null, true),
    slide("u5-l13-10", "в кафе", ["Иди в кафе."], focus(["🙂", "→", "🏢☕"]), [line("Иди в кафе.", "idi_v_kafe.mp3")], null, true),
    slide("u5-l13-11", "Найди", ["Иди в дом."], focus(["🙂", "→", "🏠"]), [line("Иди в дом.", "idi_v_dom.mp3")], [question("u5-l13-q1", "Куда?", placeEmojiOptions, "dom", "🏠")], true),
    slide("u5-l13-12", "Найди", ["Иди в магазин."], focus(["🙂", "→", "🏪"]), [line("Иди в магазин.", "idi_v_magazin.mp3")], [question("u5-l13-q2", "Куда?", placeEmojiOptions, "magazin", "🏪")], true),
    slide("u5-l13-13", "Найди", ["Иди в парк."], focus(["🙂", "→", "🌳🌳🌳"]), [line("Иди в парк.", "idi_v_park.mp3")], [question("u5-l13-q3", "Куда?", placeEmojiOptions, "park", "🌳🌳🌳")], true),
    slide("u5-l13-14", "Найди", ["Иди в кафе."], focus(["🙂", "→", "🏢☕"]), [line("Иди в кафе.", "idi_v_kafe.mp3")], [question("u5-l13-q4", "Куда?", placeEmojiOptions, "kafe", "🏢☕")], true),
    slide("u5-l13-15", "Да или нет", ["Иди в дом."], focus(["🏠", "✅"]), [line("Иди в дом.", "idi_v_dom.mp3")], [question("u5-l13-q5", "Иди в дом?", yesNoOptions, "da", "🏠")], true),
    slide("u5-l13-16", "Да или нет", ["Иди в парк."], focus(["🏪", "❌"]), [line("Иди в парк.", "idi_v_park.mp3")], [question("u5-l13-q6", "Иди в парк?", yesNoOptions, "net", "🏪")], true),
    slide("u5-l13-17", "Читай", ["Иди в дом.", "Иди в магазин.", "Иди в парк.", "Стой."], focus(["🏠", "🏪", "🌳🌳🌳", "🛑"]), [line("Иди в дом. Иди в магазин. Иди в парк. Стой.", "lesson_13_text.mp3")], [
      question("u5-l13-q7", "Куда?", placeOptions, "dom", "🏠"),
      question("u5-l13-q8", "Стой?", yesNoOptions, "da", "🛑")
    ], true),
    slide("u5-l13-18", "Отлично!", ["Отлично! ✅", "Иди.", "Стой.", "Иди сюда.", "Иди туда."], wordList([{ text: "иди", emoji: "🚶" }, { text: "стой", emoji: "🛑" }, { text: "сюда", emoji: "👈🙂" }, { text: "туда", emoji: "👉" }]), [line("Отлично! Иди. Стой.", "u5_l13_final.mp3")], null, true)
  ];

  var lesson14Slides = [
    slide("u5-l14-1", "Вверх, вниз, налево, направо", ["⬆️ вверх", "⬇️ вниз", "⬅️ налево", "➡️ направо"], wordList([{ text: "вверх", emoji: "⬆️" }, { text: "вниз", emoji: "⬇️" }, { text: "налево", emoji: "⬅️" }, { text: "направо", emoji: "➡️" }]), [line("вверх. вниз. налево. направо.", "vverh_vniz_nalevo_napravo.mp3")], null, true),
    slide("u5-l14-2", "вверх", ["Иди вверх."], focus(["🙂", "⬆️"]), [line("Иди вверх.", "idi_vverh.mp3")], null, true),
    slide("u5-l14-3", "вниз", ["Иди вниз."], focus(["🙂", "⬇️"]), [line("Иди вниз.", "idi_vniz.mp3")], null, true),
    slide("u5-l14-4", "налево", ["Иди налево."], focus(["⬅️", "🙂"]), [line("Иди налево.", "idi_nalevo.mp3")], null, true),
    slide("u5-l14-5", "направо", ["Иди направо."], focus(["🙂", "➡️"]), [line("Иди направо.", "idi_napravo.mp3")], null, true),
    slide("u5-l14-6", "прямо", ["Иди прямо."], focus(["🙂", "⬆️", "⭐"]), [line("Иди прямо.", "idi_pryamo.mp3")], null, true),
    slide("u5-l14-7", "шаг", ["один шаг", "два шага", "три шага"], focus(["1️⃣👣", "2️⃣👣", "3️⃣👣"]), [line("один шаг. два шага. три шага.", "odin_shag_dva_shaga_tri_shaga.mp3")], null, true),
    slide("u5-l14-8", "слушай", ["Иди один шаг вверх.", "Иди два шага направо.", "Иди три шага вниз."], wordList([{ text: "один шаг вверх", emoji: "1️⃣⬆️" }, { text: "два шага направо", emoji: "2️⃣➡️" }, { text: "три шага вниз", emoji: "3️⃣⬇️" }]), [line("Иди один шаг вверх. Иди два шага направо. Иди три шага вниз.", "u5_l14_steps.mp3")], null, true),
    slide("u5-l14-9", "Найди", ["Иди вверх."], focus(["🙂", "⬆️"]), [line("Иди вверх.", "idi_vverh.mp3")], [question("u5-l14-q1", "Куда?", arrowOptions, "up", "⬆️")], true),
    slide("u5-l14-10", "Найди", ["Иди вниз."], focus(["🙂", "⬇️"]), [line("Иди вниз.", "idi_vniz.mp3")], [question("u5-l14-q2", "Куда?", arrowOptions, "down", "⬇️")], true),
    slide("u5-l14-11", "Найди", ["Иди налево."], focus(["⬅️", "🙂"]), [line("Иди налево.", "idi_nalevo.mp3")], [question("u5-l14-q3", "Куда?", arrowOptions, "left", "⬅️")], true),
    slide("u5-l14-12", "Найди", ["Иди направо."], focus(["🙂", "➡️"]), [line("Иди направо.", "idi_napravo.mp3")], [question("u5-l14-q4", "Куда?", arrowOptions, "right", "➡️")], true),
    slide("u5-l14-13", "Читай", ["Иди вверх.", "Иди направо.", "Иди вниз.", "Стой."], focus(["⬆️", "➡️", "⬇️", "🛑"]), [line("Иди вверх. Иди направо. Иди вниз. Стой.", "lesson_14_text.mp3")], [question("u5-l14-q5", "Стой?", arrowOptions, "stop", "🛑")], true)
  ];

  var lesson14MoveTasks = [
    mapTask("u5-l14-map-1", "Иди вверх.", "⬆️", "idi_vverh.mp3", { x: 2, y: 2 }, { x: 2, y: 1 }, [mapObj("goal", "⭐", 2, 1, "object")], "Иди вверх."),
    mapTask("u5-l14-map-2", "Иди вниз.", "⬇️", "idi_vniz.mp3", { x: 2, y: 2 }, { x: 2, y: 3 }, [mapObj("goal", "⭐", 2, 3, "object")], "Иди вниз."),
    mapTask("u5-l14-map-3", "Иди налево.", "⬅️", "idi_nalevo.mp3", { x: 2, y: 2 }, { x: 1, y: 2 }, [mapObj("goal", "⭐", 1, 2, "object")], "Иди налево."),
    mapTask("u5-l14-map-4", "Иди направо.", "➡️", "idi_napravo.mp3", { x: 2, y: 2 }, { x: 3, y: 2 }, [mapObj("goal", "⭐", 3, 2, "object")], "Иди направо."),
    mapTask("u5-l14-map-5", "Иди два шага вверх.", "2️⃣⬆️", "idi_dva_shaga_vverh.mp3", { x: 2, y: 4 }, { x: 2, y: 2 }, [mapObj("goal", "⭐", 2, 2, "object")], "Иди два шага вверх."),
    mapTask("u5-l14-map-6", "Иди три шага направо.", "3️⃣➡️", "idi_tri_shaga_napravo.mp3", { x: 0, y: 2 }, { x: 3, y: 2 }, [mapObj("goal", "⭐", 3, 2, "object")], "Иди три шага направо.")
  ];
  lesson14MoveTasks.forEach(function (task, index) {
    task.roundLabel = (index + 1) + " / " + lesson14MoveTasks.length;
  });

  var lesson14Finish = [
    slide("u5-l14-14", "Отлично!", ["Отлично! ✅", "вверх", "вниз", "налево", "направо", "прямо"], wordList([{ text: "вверх", emoji: "⬆️" }, { text: "вниз", emoji: "⬇️" }, { text: "налево", emoji: "⬅️" }, { text: "направо", emoji: "➡️" }, { text: "прямо", emoji: "⬆️" }]), [line("Отлично! вверх. вниз. налево. направо.", "u5_l14_final.mp3")], null, true)
  ];

  var lesson15Slides = [
    slide("u5-l15-1", "Куда?", ["Куда?", "🗺️ ❓"], focus(["🙂", "→", "🏠"]), [line("Куда?", "kuda.mp3")], null, true),
    slide("u5-l15-2", "я иду", ["Я иду домой."], focus(["🙂", "→", "🏠"]), [line("Я иду домой.", "ya_idu_domoy.mp3")], null, true),
    slide("u5-l15-3", "в дом", ["Я иду в дом."], focus(["🙂", "→", "🏠"]), [line("Я иду в дом.", "ya_idu_v_dom.mp3")], null, true),
    slide("u5-l15-4", "в магазин", ["Я иду в магазин."], focus(["🙂", "→", "🏪"]), [line("Я иду в магазин.", "ya_idu_v_magazin.mp3")], null, true),
    slide("u5-l15-5", "в парк", ["Я иду в парк."], focus(["🙂", "→", "🌳🌳🌳"]), [line("Я иду в парк.", "ya_idu_v_park.mp3")], null, true),
    slide("u5-l15-6", "в кафе", ["Я иду в кафе."], focus(["🙂", "→", "🏢☕"]), [line("Я иду в кафе.", "ya_idu_v_kafe.mp3")], null, true),
    slide("u5-l15-7", "мама", ["Мама идёт в магазин."], focus(["👩", "→", "🏪"]), [line("Мама идёт в магазин.", "mama_idyot_v_magazin.mp3")], null, true),
    slide("u5-l15-8", "папа", ["Папа идёт домой."], focus(["👨", "→", "🏠"]), [line("Папа идёт домой.", "papa_idyot_domoy.mp3")], null, true),
    slide("u5-l15-9", "кот", ["Кот идёт туда."], focus(["🐱", "→", "👉"]), [line("Кот идёт туда.", "kot_idyot_tuda.mp3")], null, true),
    slide("u5-l15-10", "Найди", ["Я иду в магазин."], focus(["🙂", "→", "🏪"]), [line("Я иду в магазин.", "ya_idu_v_magazin.mp3")], [question("u5-l15-q1", "Куда я иду?", [option("ya-magazin", "Я иду в магазин.", "🏪"), option("ya-park", "Я иду в парк.", "🌳🌳🌳"), option("ya-domoy", "Я иду домой.", "🏠")], "ya-magazin", "🙂 → 🏪")], true),
    slide("u5-l15-11", "Найди", ["Мама идёт в парк."], focus(["👩", "→", "🌳🌳🌳"]), [line("Мама идёт в парк.", "mama_idyot_v_park.mp3")], [question("u5-l15-q2", "Куда мама идёт?", [option("mama-park", "Мама идёт в парк.", "🌳🌳🌳"), option("mama-kafe", "Мама идёт в кафе.", "🏢☕"), option("mama-dom", "Мама идёт в дом.", "🏠")], "mama-park", "👩 → 🌳🌳🌳")], true),
    slide("u5-l15-12", "Куда?", ["Куда я иду?"], focus(["🙂", "→", "🏢☕"]), [line("Куда я иду?", "kuda_ya_idu.mp3")], [question("u5-l15-q3", "Куда?", [option("kafe", "в кафе", "🏢☕"), option("dom", "в дом", "🏠"), option("park", "в парк", "🌳🌳🌳")], "kafe", "🙂 → 🏢☕")], true),
    slide("u5-l15-13", "Куда?", ["Куда кот идёт?"], focus(["🐱", "→", "👉"]), [line("Куда кот идёт?", "kuda_kot_idyot.mp3")], [question("u5-l15-q4", "Куда?", [option("tuda", "туда", "👉"), option("syuda", "сюда", "👈🙂"), option("domoy", "домой", "🏠")], "tuda", "🐱 → 👉")], true),
    slide("u5-l15-14", "Читай", ["Я иду в парк.", "Мама идёт в магазин.", "Папа идёт домой.", "Кот идёт туда."], focus(["🙂🌳🌳🌳", "👩🏪", "👨🏠", "🐱👉"]), [line("Я иду в парк. Мама идёт в магазин. Папа идёт домой. Кот идёт туда.", "lesson_15_text.mp3")], [
      question("u5-l15-q5", "Куда я иду?", [option("park", "в парк", "🌳🌳🌳"), option("magazin", "в магазин", "🏪"), option("domoy", "домой", "🏠")], "park", "🙂"),
      question("u5-l15-q6", "Куда папа идёт?", [option("domoy", "домой", "🏠"), option("kafe", "в кафе", "🏢☕"), option("tuda", "туда", "👉")], "domoy", "👨")
    ], true),
    slide("u5-l15-15", "Отлично!", ["Отлично! ✅", "Куда?", "Я иду.", "домой", "в парк"], wordList([{ text: "куда?", emoji: "🧭❓" }, { text: "я иду", emoji: "🙂🚶" }, { text: "домой", emoji: "🏠" }, { text: "в парк", emoji: "🌳🌳🌳" }]), [line("Отлично! Куда? Я иду домой.", "u5_l15_final.mp3")], null, true)
  ];

  var commandGame = {
    id: "unit-5-game-idi-pravilno",
    gameSlug: "unit-5-game-idi-pravilno",
    title: "Игра: Иди правильно",
    finalTitle: "Отлично! ✅",
    finalText: "Иди правильно",
    finalWords: ["Иди вверх.", "Иди вниз.", "Иди налево.", "Иди направо.", "Стой."],
    stages: [
      {
        type: "choose_arrow",
        title: "Иди правильно",
        instruction: "Читай:",
        tasks: [
          gameTask("u5g1-1", "Иди вверх.", "Куда?", "idi_vverh.mp3", arrowOptions, "up", "Иди вверх.", "✅ Да! Иди вверх.", "❌ Нет. Читай ещё раз."),
          gameTask("u5g1-2", "Иди вниз.", "Куда?", "idi_vniz.mp3", arrowOptions, "down", "Иди вниз.", "✅ Да! Иди вниз.", "❌ Нет. Читай ещё раз."),
          gameTask("u5g1-3", "Иди налево.", "Куда?", "idi_nalevo.mp3", arrowOptions, "left", "Иди налево.", "✅ Да! Иди налево.", "❌ Нет. Читай ещё раз."),
          gameTask("u5g1-4", "Иди направо.", "Куда?", "idi_napravo.mp3", arrowOptions, "right", "Иди направо.", "✅ Да! Иди направо.", "❌ Нет. Читай ещё раз."),
          gameTask("u5g1-5", "Иди прямо.", "Куда?", "idi_pryamo.mp3", arrowOptions, "up", "Иди прямо.", "✅ Да! Иди прямо.", "❌ Нет. Читай ещё раз."),
          gameTask("u5g1-6", "Стой.", "Что?", "stoy.mp3", arrowOptions, "stop", "Стой.", "✅ Да! Стой.", "❌ Нет. Читай ещё раз.")
        ]
      }
    ]
  };

  var mapGameTasks = [
    mapTask("u5-map-1", "Иди вверх 2.", "2️⃣⬆️", "idi_vverh_dva.mp3", { x: 2, y: 4 }, { x: 2, y: 2 }, [mapObj("goal", "⭐", 2, 2, "object"), mapObj("dom", "🏠", 4, 0, "house")], "Иди вверх 2."),
    mapTask("u5-map-2", "Иди направо 3.", "3️⃣➡️", "idi_napravo_tri.mp3", { x: 0, y: 3 }, { x: 3, y: 3 }, [mapObj("goal", "⭐", 3, 3, "object"), mapObj("park", "🌳🌳🌳", 1, 0, "park")], "Иди направо 3."),
    mapTask("u5-map-3", "Иди вниз 1.", "1️⃣⬇️", "idi_vniz_odin.mp3", { x: 2, y: 1 }, { x: 2, y: 2 }, [mapObj("goal", "⭐", 2, 2, "object"), mapObj("voda", "💧", 4, 4, "water")], "Иди вниз 1."),
    mapTask("u5-map-4", "Иди налево 2.", "2️⃣⬅️", "idi_nalevo_dva.mp3", { x: 4, y: 2 }, { x: 2, y: 2 }, [mapObj("goal", "⭐", 2, 2, "object"), mapObj("hleb", "🍞", 0, 4, "food")], "Иди налево 2."),
    mapTask("u5-map-5", "Иди в дом.", "🏠", "idi_v_dom.mp3", { x: 0, y: 4 }, { x: 4, y: 1 }, [mapObj("dom", "🏠", 4, 1, "house"), mapObj("magazin", "🏪", 1, 1, "shop"), mapObj("park", "🌳🌳🌳", 3, 4, "park"), mapObj("kafe", "🏢☕", 0, 0, "cafe")], "Иди в дом."),
    mapTask("u5-map-6", "Иди в магазин.", "🏪", "idi_v_magazin.mp3", { x: 4, y: 4 }, { x: 1, y: 2 }, [mapObj("magazin", "🏪", 1, 2, "shop"), mapObj("dom", "🏠", 4, 0, "house"), mapObj("park", "🌳🌳🌳", 0, 4, "park"), mapObj("myach", "⚽", 2, 0, "object")], "Иди в магазин."),
    mapTask("u5-map-7", "Иди в парк.", "🌳🌳🌳", "idi_v_park.mp3", { x: 2, y: 4 }, { x: 0, y: 1 }, [mapObj("park", "🌳🌳🌳", 0, 1, "park"), mapObj("kafe", "🏢☕", 4, 1, "cafe"), mapObj("dom", "🏠", 2, 0, "house"), mapObj("voda", "💧", 3, 3, "water")], "Иди в парк."),
    mapTask("u5-map-8", "Иди в кафе.", "🏢☕", "idi_v_kafe.mp3", { x: 0, y: 0 }, { x: 4, y: 3 }, [mapObj("kafe", "🏢☕", 4, 3, "cafe"), mapObj("magazin", "🏪", 2, 1, "shop"), mapObj("park", "🌳🌳🌳", 0, 4, "park"), mapObj("hleb", "🍞", 3, 0, "food")], "Иди в кафе."),
    mapTask("u5-map-9", "Иди вверх 2. Иди направо 1.", "2️⃣⬆️ 1️⃣➡️", "route_vverh_2_napravo_1.mp3", { x: 1, y: 4 }, { x: 2, y: 2 }, [mapObj("goal", "⭐", 2, 2, "object"), mapObj("telefon", "📱", 4, 4, "object")], "Ты здесь!"),
    mapTask("u5-map-10", "Иди вниз 1. Иди налево 2.", "1️⃣⬇️ 2️⃣⬅️", "route_vniz_1_nalevo_2.mp3", { x: 4, y: 1 }, { x: 2, y: 2 }, [mapObj("goal", "⭐", 2, 2, "object"), mapObj("voda", "💧", 0, 0, "water")], "Ты здесь!"),
    mapTask("u5-map-11", "Иди направо 3. Иди вверх 1. Стой.", "3️⃣➡️ 1️⃣⬆️ 🛑", "route_napravo_3_vverh_1_stoy.mp3", { x: 0, y: 3 }, { x: 3, y: 2 }, [mapObj("goal", "⭐", 3, 2, "object"), mapObj("kafe", "🏢☕", 4, 4, "cafe")], "Стой."),
    mapTask("u5-map-12", "Иди вверх 2. Иди направо 2. Иди в дом.", "2️⃣⬆️ 2️⃣➡️ 🏠", "route_vverh_2_napravo_2_dom.mp3", { x: 0, y: 4 }, { x: 2, y: 2 }, [mapObj("dom", "🏠", 2, 2, "house"), mapObj("magazin", "🏪", 4, 4, "shop"), mapObj("park", "🌳🌳🌳", 1, 0, "park")], "Иди в дом.")
  ];
  mapGameTasks.forEach(function (task, index) {
    task.roundLabel = (index + 1) + " / " + mapGameTasks.length;
  });

  var routeChallengeTasks = [
    mapTask("u5-route-1", "Вверх 2. Направо 1. Вниз 1.", "⬆️2 ➡️1 ⬇️1", "route_vverh_2_napravo_1_vniz_1.mp3", { x: 1, y: 4 }, { x: 2, y: 3 }, [mapObj("goal", "⭐", 2, 3, "object")], "Ты здесь!"),
    mapTask("u5-route-2", "Направо 2. Вверх 2. Налево 1.", "➡️2 ⬆️2 ⬅️1", "route_napravo_2_vverh_2_nalevo_1.mp3", { x: 0, y: 4 }, { x: 1, y: 2 }, [mapObj("goal", "⭐", 1, 2, "object")], "Ты здесь!"),
    mapTask("u5-route-3", "Вниз 1. Направо 2. Вверх 1.", "⬇️1 ➡️2 ⬆️1", "route_vniz_1_napravo_2_vverh_1.mp3", { x: 1, y: 1 }, { x: 3, y: 1 }, [mapObj("goal", "⭐", 3, 1, "object")], "Ты здесь!")
  ];
  routeChallengeTasks.forEach(function (task, index) {
    task.roundLabel = (index + 1) + " / " + routeChallengeTasks.length;
  });

  var destinationGame = {
    id: "unit-5-game-kuda-ya-idu",
    gameSlug: "unit-5-game-kuda-ya-idu",
    title: "Игра 3: Куда я иду?",
    finalTitle: "Отлично! Куда? 🏆",
    finalText: "Я иду",
    finalWords: ["Я иду в магазин.", "Мама идёт в парк.", "Папа идёт домой."],
    stages: [
      {
        type: "destination",
        title: "Куда я иду?",
        instruction: "Куда?",
        tasks: [
          gameTask("u5g3-1", "🙂 → 🏪", "Куда я иду?", "ya_idu_v_magazin.mp3", [option("ya-magazin", "Я иду в магазин.", "🏪"), option("ya-park", "Я иду в парк.", "🌳🌳🌳"), option("ya-domoy", "Я иду домой.", "🏠")], "ya-magazin", "Я иду в магазин.", "✅ Да!", "❌ Читай ещё раз."),
          gameTask("u5g3-2", "🙂 → 🌳🌳🌳", "Куда я иду?", "ya_idu_v_park.mp3", [option("ya-park", "Я иду в парк.", "🌳🌳🌳"), option("ya-kafe", "Я иду в кафе.", "🏢☕"), option("ya-magazin", "Я иду в магазин.", "🏪")], "ya-park", "Я иду в парк.", "✅ Да!", "❌ Читай ещё раз."),
          gameTask("u5g3-3", "👩 → 🌳🌳🌳", "Куда мама идёт?", "mama_idyot_v_park.mp3", [option("mama-park", "Мама идёт в парк.", "🌳🌳🌳"), option("mama-kafe", "Мама идёт в кафе.", "🏢☕"), option("mama-dom", "Мама идёт в дом.", "🏠")], "mama-park", "Мама идёт в парк.", "✅ Да!", "❌ Читай ещё раз."),
          gameTask("u5g3-4", "👨 → 🏠", "Куда папа идёт?", "papa_idyot_domoy.mp3", [option("papa-domoy", "Папа идёт домой.", "🏠"), option("papa-magazin", "Папа идёт в магазин.", "🏪"), option("papa-park", "Папа идёт в парк.", "🌳🌳🌳")], "papa-domoy", "Папа идёт домой.", "✅ Да!", "❌ Читай ещё раз."),
          gameTask("u5g3-5", "👧 → 🏢☕", "Куда девочка идёт?", "devochka_idyot_v_kafe.mp3", [option("devochka-kafe", "Девочка идёт в кафе.", "🏢☕"), option("devochka-dom", "Девочка идёт в дом.", "🏠"), option("devochka-park", "Девочка идёт в парк.", "🌳🌳🌳")], "devochka-kafe", "Девочка идёт в кафе.", "✅ Да!", "❌ Читай ещё раз."),
          gameTask("u5g3-6", "🐱 → 👉", "Куда кот идёт?", "kot_idyot_tuda.mp3", [option("kot-tuda", "Кот идёт туда.", "👉"), option("kot-domoy", "Кот идёт домой.", "🏠"), option("kot-kafe", "Кот идёт в кафе.", "🏢☕")], "kot-tuda", "Кот идёт туда.", "✅ Да!", "❌ Читай ещё раз.")
        ]
      }
    ]
  };

  var lesson14Unit = {
    id: "lesson-14-directions",
    title: "Урок 14: Вверх, вниз, налево, направо",
    icon: "🧭",
    stages: [
      {
        type: "slides",
        title: "Урок 14: Вверх, вниз, налево, направо",
        tasks: lesson14Slides
      },
      {
        type: "map-command-game",
        title: "Иди по стрелкам",
        tasks: lesson14MoveTasks
      },
      {
        type: "slides",
        title: "Урок 14: Вверх, вниз, налево, направо",
        tasks: lesson14Finish
      }
    ]
  };

  root.LexiLandUnit5Lesson = {
    id: "level-0-unit-5-movement-map",
    order: 7,
    menuLabel: "Юнит 5",
    title: "Юнит 5: Иди. Вверх, вниз, налево, направо",
    subtitle: "Карта и команды: иди, стой, куда, домой",
    level: "Уровень 0",
    coverEmoji: "🧭",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-13-idi", "Урок 13: Иди", "🚶", "Урок 13: Иди", lesson13Slides),
      lesson14Unit,
      unit("lesson-15-kuda", "Урок 15: Куда?", "🗺️", "Урок 15: Куда?", lesson15Slides),
      {
        id: "unit-5-game-idi-pravilno",
        title: "Игра: Иди правильно",
        icon: "⬆️",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра: Иди правильно",
            tasks: [commandGame]
          }
        ]
      },
      {
        id: "unit-5-game-karta-komand",
        title: "Игра 2: Карта команд",
        icon: "🗺️",
        stages: [
          {
            type: "map-command-game",
            title: "Игра 2: Карта команд",
            tasks: mapGameTasks
          },
          {
            type: "map-command-game",
            title: "Маршрут",
            tasks: routeChallengeTasks
          },
          {
            type: "slides",
            title: "Игра 2: Карта команд",
            tasks: [
              slide("u5-map-final", "Ты здесь! ✅", ["Отлично! 🏆", "Иди вверх.", "Иди направо.", "Иди в дом."], wordList([{ text: "вверх", emoji: "⬆️" }, { text: "направо", emoji: "➡️" }, { text: "дом", emoji: "🏠" }, { text: "стой", emoji: "🛑" }]), [line("Отлично! Ты здесь!", "u5_map_final.mp3")], null, true)
            ]
          }
        ]
      },
      {
        id: "unit-5-game-kuda-ya-idu",
        title: "Игра 3: Куда я иду?",
        icon: "🏁",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра 3: Куда я иду?",
            tasks: [destinationGame]
          }
        ]
      }
    ]
  };

  root.LexiLandUnit5 = root.LexiLandUnit5Lesson;
}(typeof window !== "undefined" ? window : globalThis));
