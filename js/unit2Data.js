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

  function slide(id, title, text, visual, audioItems, questions, reading, reveal) {
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

    if (reveal) {
      item.reveal = reveal;
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

  function scene(near, far) {
    return {
      type: "scene",
      near: near,
      far: far
    };
  }

  function wordList(items) {
    return {
      type: "word-list",
      items: items
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
    "где": m("где", "❓📍"),
    "это": m("это", "👉"),
    "здесь": m("здесь", "📍"),
    "там": m("там", "👉"),
    "я": m("я", "🙂👈"),
    "ты": m("ты", "🙂👉"),
    "он": m("он", "👦"),
    "она": m("она", "👧"),
    "мама": m("мама", "👩‍👧"),
    "папа": m("папа", "👨"),
    "мальчик": m("мальчик", "👦"),
    "девочка": m("девочка", "👧"),
    "кот": m("кот", "🐱"),
    "собака": m("собака", "🐶"),
    "мяч": m("мяч", "⚽"),
    "книга": m("книга", "📖"),
    "и": m("и", "➕"),
    "дом": m("дом", "🏠"),
    "дома": m("дома", "🏠📍"),
    "парк": m("парк", "🌳🌳🌳"),
    "кафе": m("кафе", "🏢☕"),
    "вода": m("вода", "💧"),
    "яблоко": m("яблоко", "🍎"),
    "да": m("да", "✅"),
    "нет": m("нет", "❌")
  };

  var whoOptions = [
    option("mama", "мама", "👩‍👧"),
    option("papa", "папа", "👨"),
    option("malchik", "мальчик", "👦"),
    option("devochka", "девочка", "👧")
  ];

  var whoShortOptions = [
    option("on", "он", "👦"),
    option("ona", "она", "👧")
  ];

  var whatOptions = [
    option("kot", "кот", "🐱"),
    option("sobaka", "собака", "🐶"),
    option("myach", "мяч", "⚽"),
    option("kniga", "книга", "📖")
  ];

  var hereThereOptions = [
    option("zdes", "здесь", "📍"),
    option("tam", "там", "👉")
  ];

  var dictionary = [
    entry("u2-kto", "кто", "❓👤", "word", "kto.mp3"),
    entry("u2-chto", "что", "❓📦", "word", "chto.mp3"),
    entry("u2-i", "и", "➕", "word", "i.mp3"),
    entry("u2-mama", "мама", "👩‍👧", "word", "mama.mp3"),
    entry("u2-papa", "папа", "👨", "word", "papa.mp3"),
    entry("u2-malchik", "мальчик", "👦", "word", "malchik.mp3"),
    entry("u2-devochka", "девочка", "👧", "word", "devochka.mp3"),
    entry("u2-on", "он", "👦", "word", "on.mp3"),
    entry("u2-ona", "она", "👧", "word", "ona.mp3"),
    entry("u2-kot", "кот", "🐱", "word", "kot.mp3"),
    entry("u2-sobaka", "собака", "🐶", "word", "sobaka.mp3"),
    entry("u2-myach", "мяч", "⚽", "word", "myach.mp3"),
    entry("u2-kniga", "книга", "📖", "word", "kniga.mp3"),
    entry("u2-eto-mama", "Это мама.", "👉👩‍👧", "chunk", "eto_mama.mp3"),
    entry("u2-eto-papa", "Это папа.", "👉👨", "chunk", "eto_papa.mp3"),
    entry("u2-eto-malchik", "Это мальчик.", "👉👦", "chunk", "eto_malchik.mp3"),
    entry("u2-eto-devochka", "Это девочка.", "👉👧", "chunk", "eto_devochka.mp3"),
    entry("u2-eto-kot", "Это кот.", "👉🐱", "chunk", "eto_kot.mp3"),
    entry("u2-eto-sobaka", "Это собака.", "👉🐶", "chunk", "eto_sobaka.mp3"),
    entry("u2-eto-myach", "Это мяч.", "👉⚽", "chunk", "eto_myach.mp3"),
    entry("u2-eto-kniga", "Это книга.", "👉📖", "chunk", "eto_kniga.mp3"),
    entry("u2-on-zdes", "Он здесь.", "👦📍", "chunk", "on_zdes.mp3"),
    entry("u2-ona-tam", "Она там.", "👧👉", "chunk", "ona_tam.mp3"),
    entry("u2-kot-zdes", "Кот здесь.", "🐱📍", "chunk", "kot_zdes.mp3"),
    entry("u2-sobaka-tam", "Собака там.", "🐶👉", "chunk", "sobaka_tam.mp3"),
    entry("u2-myach-zdes", "Мяч здесь.", "⚽📍", "chunk", "myach_zdes.mp3"),
    entry("u2-kniga-tam", "Книга там.", "📖👉", "chunk", "kniga_tam.mp3"),
    entry("u2-mama-i-papa", "мама и папа", "👩‍👧➕👨", "chunk", "mama_i_papa.mp3"),
    entry("u2-kot-i-sobaka", "кот и собака", "🐱➕🐶", "chunk", "kot_i_sobaka.mp3"),
    entry("u2-myach-i-kniga", "мяч и книга", "⚽➕📖", "chunk", "myach_i_kniga.mp3"),
    entry("u2-dom-i-park", "дом и парк", "🏠➕🌳🌳🌳", "chunk", "dom_i_park.mp3")
  ];

  var lesson4Slides = [
    slide("u2-l4-1", "Урок 4", ["Кто?", "❓👤"], emoji("❓👤"), [line("Урок 4", "urok_4.mp3"), line("Кто?", "kto.mp3")], null, true),
    slide("u2-l4-2", "Кто?", ["кто? ❓👤", "Кто?"], emoji("❓👤"), [line("Кто?", "kto.mp3")], null, true),
    slide("u2-l4-3", "мама", ["мама 👩‍👧", "Это мама."], focus(["👩‍👧", "👉 👩‍👧"]), [line("мама", "mama.mp3"), line("Это мама.", "eto_mama.mp3")], null, true),
    slide("u2-l4-4", "папа", ["папа 👨", "Это папа."], focus(["👨", "👉 👨"]), [line("папа", "papa.mp3"), line("Это папа.", "eto_papa.mp3")], null, true),
    slide("u2-l4-5", "мальчик", ["мальчик 👦", "Это мальчик."], focus(["👦", "👉 👦"]), [line("мальчик", "malchik.mp3"), line("Это мальчик.", "eto_malchik.mp3")], null, true),
    slide("u2-l4-6", "девочка", ["девочка 👧", "Это девочка."], focus(["👧", "👉 👧"]), [line("девочка", "devochka.mp3"), line("Это девочка.", "eto_devochka.mp3")], null, true),
    slide("u2-l4-7", "он", ["он 👦", "Он здесь."], scene(["👦"], []), [line("он", "on.mp3"), line("Он здесь.", "on_zdes.mp3")], null, true),
    slide("u2-l4-8", "она", ["она 👧", "Она там."], scene([], ["👧"]), [line("она", "ona.mp3"), line("Она там.", "ona_tam.mp3")], null, true),
    slide("u2-l4-9", "Кто это?", ["Кто это?"], emoji("👩‍👧"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q1", "Кто это?", whoOptions, "mama")], true),
    slide("u2-l4-10", "Кто это?", ["Кто это?"], emoji("👨"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q2", "Кто это?", [option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧"), option("ona", "она", "👧"), option("on", "он", "👦")], "papa")], true),
    slide("u2-l4-11", "Кто это?", ["Кто это?"], emoji("👦"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q3", "Кто это?", [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧"), option("mama", "мама", "👩‍👧"), option("papa", "папа", "👨")], "malchik")], true),
    slide("u2-l4-12", "Кто это?", ["Кто это?"], emoji("👧"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q4", "Кто это?", [option("devochka", "девочка", "👧"), option("malchik", "мальчик", "👦"), option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧")], "devochka")], true),
    slide("u2-l4-13", "Читай", ["Это мама.", "Мама здесь."], scene(["👩‍👧"], []), [line("Это мама. Мама здесь.", "u2_l4_mama_zdes.mp3")], [question("u2-l4-q5", "Кто здесь?", [option("mama", "мама", "👩‍👧"), option("papa", "папа", "👨")], "mama")], true),
    slide("u2-l4-14", "Читай", ["Это папа.", "Папа там."], scene([], ["👨"]), [line("Это папа. Папа там.", "u2_l4_papa_tam.mp3")], [question("u2-l4-q6", "Кто там?", [option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧")], "papa")], true),
    slide("u2-l4-15", "Читай", ["Он здесь.", "Она там."], scene(["👦"], ["👧"]), [line("Он здесь. Она там.", "u2_l4_on_zdes_ona_tam.mp3")], [question("u2-l4-q7", "Кто здесь?", whoShortOptions, "on")], true),
    slide("u2-l4-16", "Читай", ["Мальчик здесь.", "Девочка там."], scene(["👦"], ["👧"]), [line("Мальчик здесь. Девочка там.", "u2_l4_malchik_zdes_devochka_tam.mp3")], [question("u2-l4-q8", "Кто там?", [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧")], "devochka")], true),
    slide("u2-l4-17", "Читай", ["Мама здесь.", "Папа там.", "", "Он здесь.", "Она там.", "", "Мальчик здесь.", "Девочка там."], scene(["👩‍👧", "👦"], ["👨", "👧"]), [line("Мама здесь. Папа там. Он здесь. Она там. Мальчик здесь. Девочка там.", "lesson_4_text.mp3")], null, true),
    slide("u2-l4-18", "Отлично!", ["Отлично! ✅", "", "Кто?", "мама", "папа", "он", "она"], wordList([{ text: "кто", emoji: "❓👤" }, { text: "мама", emoji: "👩‍👧" }, { text: "папа", emoji: "👨" }, { text: "он", emoji: "👦" }, { text: "она", emoji: "👧" }]), [line("Отлично!", "otlichno.mp3"), line("Кто?", "kto.mp3")], null, true)
  ];

  var lesson5Slides = [
    slide("u2-l5-1", "Урок 5", ["Что?", "❓📦"], emoji("❓📦"), [line("Урок 5", "urok_5.mp3"), line("Что?", "chto.mp3")], null, true),
    slide("u2-l5-2", "Что?", ["что? ❓📦", "Что?"], emoji("❓📦"), [line("Что?", "chto.mp3")], null, true),
    slide("u2-l5-3", "кот", ["кот 🐱", "Это кот."], focus(["🐱", "👉 🐱"]), [line("кот", "kot.mp3"), line("Это кот.", "eto_kot.mp3")], null, true),
    slide("u2-l5-4", "собака", ["собака 🐶", "Это собака."], focus(["🐶", "👉 🐶"]), [line("собака", "sobaka.mp3"), line("Это собака.", "eto_sobaka.mp3")], null, true),
    slide("u2-l5-5", "мяч", ["мяч ⚽", "Это мяч."], focus(["⚽", "👉 ⚽"]), [line("мяч", "myach.mp3"), line("Это мяч.", "eto_myach.mp3")], null, true),
    slide("u2-l5-6", "книга", ["книга 📖", "Это книга."], focus(["📖", "👉 📖"]), [line("книга", "kniga.mp3"), line("Это книга.", "eto_kniga.mp3")], null, true),
    slide("u2-l5-7", "Что это?", ["Что это?"], emoji("🐱"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q1", "Что это?", whatOptions, "kot")], true),
    slide("u2-l5-8", "Что это?", ["Что это?"], emoji("🐶"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q2", "Что это?", [option("sobaka", "собака", "🐶"), option("kot", "кот", "🐱"), option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "sobaka")], true),
    slide("u2-l5-9", "Что это?", ["Что это?"], emoji("⚽"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q3", "Что это?", [option("myach", "мяч", "⚽"), option("kot", "кот", "🐱"), option("dom", "дом", "🏠"), option("voda", "вода", "💧")], "myach")], true),
    slide("u2-l5-10", "Что это?", ["Что это?"], emoji("📖"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q4", "Что это?", [option("kniga", "книга", "📖"), option("yabloko", "яблоко", "🍎"), option("myach", "мяч", "⚽"), option("dom", "дом", "🏠")], "kniga")], true),
    slide("u2-l5-11", "Где?", ["Кот здесь."], scene(["🐱"], []), [line("Кот здесь.", "kot_zdes.mp3")], [question("u2-l5-q5", "Где кот?", hereThereOptions, "zdes")], true),
    slide("u2-l5-12", "Где?", ["Собака там."], scene([], ["🐶"]), [line("Собака там.", "sobaka_tam.mp3")], [question("u2-l5-q6", "Где собака?", hereThereOptions, "tam")], true),
    slide("u2-l5-13", "Что здесь?", ["Мяч здесь."], scene(["⚽"], []), [line("Мяч здесь.", "myach_zdes.mp3")], [question("u2-l5-q7", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach")], true),
    slide("u2-l5-14", "Что там?", ["Книга там."], scene([], ["📖"]), [line("Книга там.", "kniga_tam.mp3")], [question("u2-l5-q8", "Что там?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "kniga")], true),
    slide("u2-l5-15", "Читай", ["Это кот.", "Кот здесь.", "", "Это собака.", "Собака там."], scene(["🐱"], ["🐶"]), [line("Это кот. Кот здесь. Это собака. Собака там.", "u2_l5_kot_sobaka.mp3")], [question("u2-l5-q9", "Что здесь?", [option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶")], "kot")], true),
    slide("u2-l5-16", "Читай", ["Это мяч.", "Мяч там.", "", "Это книга.", "Книга здесь."], scene(["📖"], ["⚽"]), [line("Это мяч. Мяч там. Это книга. Книга здесь.", "u2_l5_myach_kniga.mp3")], [question("u2-l5-q10", "Что там?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach")], true),
    slide("u2-l5-17", "Читай", ["Кот здесь.", "Собака там.", "", "Мяч здесь.", "Книга там.", "", "Здесь кот и мяч.", "Там собака и книга."], scene(["🐱", "⚽"], ["🐶", "📖"]), [line("Кот здесь. Собака там. Мяч здесь. Книга там. Здесь кот и мяч. Там собака и книга.", "lesson_5_text.mp3")], null, true),
    slide("u2-l5-18", "Отлично!", ["Отлично! ✅", "", "Что?", "кот", "собака", "мяч", "книга"], wordList([{ text: "что", emoji: "❓📦" }, { text: "кот", emoji: "🐱" }, { text: "собака", emoji: "🐶" }, { text: "мяч", emoji: "⚽" }, { text: "книга", emoji: "📖" }]), [line("Отлично!", "otlichno.mp3"), line("Что?", "chto.mp3")], null, true)
  ];

  var lesson6Slides = [
    slide("u2-l6-1", "Урок 6", ["Кто и что?", "❓👤 ➕ ❓📦"], emoji("❓👤 ➕ ❓📦"), [line("Урок 6", "urok_6.mp3"), line("Кто и что?", "kto_i_chto.mp3")], null, true),
    slide("u2-l6-2", "и", ["и ➕", "мама и папа"], focus(["👩‍👧", "➕", "👨"]), [line("и", "i.mp3"), line("мама и папа", "mama_i_papa.mp3")], null, true),
    slide("u2-l6-3", "и", ["кот и собака"], focus(["🐱", "➕", "🐶"]), [line("кот и собака", "kot_i_sobaka.mp3")], null, true),
    slide("u2-l6-4", "и", ["мяч и книга"], focus(["⚽", "➕", "📖"]), [line("мяч и книга", "myach_i_kniga.mp3")], null, true),
    slide("u2-l6-5", "и", ["дом и парк"], focus(["🏠", "➕", "🌳🌳🌳"]), [line("дом и парк", "dom_i_park.mp3")], null, true),
    slide("u2-l6-6", "Найди", ["мама и папа"], emoji("👩‍👧 ➕ 👨"), [line("мама и папа", "mama_i_papa.mp3")], [question("u2-l6-q1", "Найди:", [option("mama-papa", "", "👩‍👧 + 👨"), option("kot-sobaka", "", "🐱 + 🐶"), option("myach-kniga", "", "⚽ + 📖")], "mama-papa")], true),
    slide("u2-l6-7", "Найди", ["кот и собака"], emoji("🐱 ➕ 🐶"), [line("кот и собака", "kot_i_sobaka.mp3")], [question("u2-l6-q2", "Найди:", [option("kot-sobaka", "", "🐱 + 🐶"), option("malchik-devochka", "", "👦 + 👧"), option("dom-park", "", "🏠 + 🌳🌳🌳")], "kot-sobaka")], true),
    slide("u2-l6-8", "Найди", ["мяч и книга"], emoji("⚽ ➕ 📖"), [line("мяч и книга", "myach_i_kniga.mp3")], [question("u2-l6-q3", "Найди:", [option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶"), option("kafe-voda", "", "🏢☕ + 💧")], "myach-kniga")], true),
    slide("u2-l6-9", "Читай", ["Мама здесь.", "Папа здесь."], scene(["👩‍👧", "👨"], []), [line("Мама здесь. Папа здесь.", "u2_l6_mama_papa_zdes.mp3")], [question("u2-l6-q4", "Кто здесь?", [option("mama-papa", "мама и папа", "👩‍👧➕👨"), option("kot-sobaka", "кот и собака", "🐱➕🐶")], "mama-papa")], true, { text: "Мама и папа здесь.", audio: audio("u2_l6_mama_i_papa_zdes.mp3") }),
    slide("u2-l6-10", "Читай", ["Кот там.", "Собака там."], scene([], ["🐱", "🐶"]), [line("Кот там. Собака там.", "u2_l6_kot_sobaka_tam.mp3")], [question("u2-l6-q5", "Кто там?", [option("kot-sobaka", "кот и собака", "🐱➕🐶"), option("myach-kniga", "мяч и книга", "⚽➕📖")], "kot-sobaka")], true, { text: "Кот и собака там.", audio: audio("u2_l6_kot_i_sobaka_tam.mp3") }),
    slide("u2-l6-11", "Читай", ["Мяч здесь.", "Книга там."], scene(["⚽"], ["📖"]), [line("Мяч здесь. Книга там.", "u2_l6_myach_zdes_kniga_tam.mp3")], [question("u2-l6-q6", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach")], true),
    slide("u2-l6-12", "Читай", ["Дом там.", "Парк здесь."], scene(["🌳🌳🌳"], ["🏠"]), [line("Дом там. Парк здесь.", "u2_l6_dom_tam_park_zdes.mp3")], [question("u2-l6-q7", "Где дом?", hereThereOptions, "tam")], true),
    slide("u2-l6-13", "Читай", ["Мама здесь.", "Папа там.", "", "Кот здесь.", "Собака там.", "", "Здесь мама и кот.", "Там папа и собака."], scene(["👩‍👧", "🐱"], ["👨", "🐶"]), [line("Мама здесь. Папа там. Кот здесь. Собака там. Здесь мама и кот. Там папа и собака.", "lesson_6_text_1.mp3")], [
      question("u2-l6-q8", "Кто здесь?", [option("mama", "мама", "👩‍👧"), option("papa", "папа", "👨")], "mama"),
      question("u2-l6-q9", "Кто там?", [option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧")], "papa"),
      question("u2-l6-q10", "Что здесь?", [option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶")], "kot"),
      question("u2-l6-q11", "Что там?", [option("sobaka", "собака", "🐶"), option("kot", "кот", "🐱")], "sobaka")
    ], true),
    slide("u2-l6-14", "Читай", ["Мальчик здесь.", "Девочка там.", "", "Мяч здесь.", "Книга там.", "", "Здесь мальчик и мяч.", "Там девочка и книга."], scene(["👦", "⚽"], ["👧", "📖"]), [line("Мальчик здесь. Девочка там. Мяч здесь. Книга там. Здесь мальчик и мяч. Там девочка и книга.", "lesson_6_text_2.mp3")], [
      question("u2-l6-q12", "Кто здесь?", [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧")], "malchik"),
      question("u2-l6-q13", "Кто там?", [option("devochka", "девочка", "👧"), option("malchik", "мальчик", "👦")], "devochka"),
      question("u2-l6-q14", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach"),
      question("u2-l6-q15", "Что там?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "kniga")
    ], true),
    slide("u2-l6-15", "Картинка", ["Мама здесь.", "Кот здесь.", "Папа там.", "Собака там."], scene(["👩‍👧", "🐱"], ["👨", "🐶"]), [line("Мама здесь. Кот здесь. Папа там. Собака там.", "u2_l6_picture_1.mp3")], [question("u2-l6-q16", "Выбери правду.", [option("mama-zdes", "Мама здесь.", "👩‍👧📍"), option("papa-zdes", "Папа здесь.", "👨📍"), option("sobaka-zdes", "Собака здесь.", "🐶📍")], "mama-zdes")], true),
    slide("u2-l6-16", "Картинка", ["Мальчик здесь.", "Мяч здесь.", "Девочка там.", "Книга там."], scene(["👦", "⚽"], ["👧", "📖"]), [line("Мальчик здесь. Мяч здесь. Девочка там. Книга там.", "u2_l6_picture_2.mp3")], [question("u2-l6-q17", "Выбери правду.", [option("kniga-tam", "Книга там.", "📖👉"), option("myach-tam", "Мяч там.", "⚽👉"), option("devochka-zdes", "Девочка здесь.", "👧📍")], "kniga-tam")], true),
    slide("u2-l6-17", "Читай", ["Здесь мама и кот.", "Там папа и собака.", "", "Здесь мальчик и мяч.", "Там девочка и книга."], scene(["👩‍👧", "🐱", "👦", "⚽"], ["👨", "🐶", "👧", "📖"]), [line("Здесь мама и кот. Там папа и собака. Здесь мальчик и мяч. Там девочка и книга.", "u2_l6_final_text.mp3")], [
      question("u2-l6-q18", "Кто здесь?", [option("mama-kot", "мама и кот", "👩‍👧➕🐱"), option("papa-sobaka", "папа и собака", "👨➕🐶")], "mama-kot"),
      question("u2-l6-q19", "Кто там?", [option("papa-sobaka", "папа и собака", "👨➕🐶"), option("mama-kot", "мама и кот", "👩‍👧➕🐱")], "papa-sobaka"),
      question("u2-l6-q20", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach"),
      question("u2-l6-q21", "Что там?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "kniga")
    ], true),
    slide("u2-l6-18", "Отлично!", ["Отлично! ✅", "", "Кто?", "Что?", "Где?", "", "Ты читаешь! 📖"], wordList([{ text: "кто", emoji: "❓👤" }, { text: "что", emoji: "❓📦" }, { text: "где", emoji: "❓📍" }]), [line("Отлично!", "otlichno.mp3"), line("Кто?", "kto.mp3"), line("Что?", "chto.mp3"), line("Где?", "gde.mp3")], null, true)
  ];

  var unit2Game = {
    id: "unit-2-game-kto-chto-gde",
    gameSlug: "unit-2-game-kto-chto-gde",
    title: "Игра: Кто? Что? Где?",
    stages: [
      {
        type: "image_to_word",
        title: "Кто это?",
        instruction: "Кто это?",
        tasks: [
          { id: "u2g-1-1", visual: "👩‍👧", text: "мама", audio: audio("mama.mp3"), options: [option("mama", "мама", "👩‍👧"), option("papa", "папа", "👨"), option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧")], correct: "mama" },
          { id: "u2g-1-2", visual: "👨", text: "папа", audio: audio("papa.mp3"), options: [option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧"), option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧")], correct: "papa" },
          { id: "u2g-1-3", visual: "👦", text: "мальчик", audio: audio("malchik.mp3"), options: [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧"), option("mama", "мама", "👩‍👧"), option("papa", "папа", "👨")], correct: "malchik" },
          { id: "u2g-1-4", visual: "👧", text: "девочка", audio: audio("devochka.mp3"), options: [option("devochka", "девочка", "👧"), option("malchik", "мальчик", "👦"), option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧")], correct: "devochka" }
        ]
      },
      {
        type: "image_to_word",
        title: "Что это?",
        instruction: "Что это?",
        tasks: [
          { id: "u2g-2-1", visual: "🐱", text: "кот", audio: audio("kot.mp3"), options: [option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶"), option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], correct: "kot" },
          { id: "u2g-2-2", visual: "🐶", text: "собака", audio: audio("sobaka.mp3"), options: [option("sobaka", "собака", "🐶"), option("kot", "кот", "🐱"), option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], correct: "sobaka" },
          { id: "u2g-2-3", visual: "⚽", text: "мяч", audio: audio("myach.mp3"), options: [option("myach", "мяч", "⚽"), option("kot", "кот", "🐱"), option("kniga", "книга", "📖"), option("sobaka", "собака", "🐶")], correct: "myach" },
          { id: "u2g-2-4", visual: "📖", text: "книга", audio: audio("kniga.mp3"), options: [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽"), option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶")], correct: "kniga" }
        ]
      },
      {
        type: "reading",
        title: "Где?",
        instruction: "Где?",
        tasks: [
          { id: "u2g-3-1", text: "Кот здесь.", audio: audio("kot_zdes.mp3"), question: "Где кот?", options: hereThereOptions, correct: "zdes" },
          { id: "u2g-3-2", text: "Собака там.", audio: audio("sobaka_tam.mp3"), question: "Где собака?", options: hereThereOptions, correct: "tam" },
          { id: "u2g-3-3", text: "Мяч здесь.", audio: audio("myach_zdes.mp3"), question: "Где мяч?", options: hereThereOptions, correct: "zdes" },
          { id: "u2g-3-4", text: "Книга там.", audio: audio("kniga_tam.mp3"), question: "Где книга?", options: hereThereOptions, correct: "tam" }
        ]
      },
      {
        type: "pair_to_image",
        title: "И",
        instruction: "Найди:",
        tasks: [
          { id: "u2g-4-1", text: "мама и папа", audio: audio("mama_i_papa.mp3"), options: [option("mama-papa", "", "👩‍👧 + 👨"), option("kot-sobaka", "", "🐱 + 🐶"), option("myach-kniga", "", "⚽ + 📖")], correct: "mama-papa" },
          { id: "u2g-4-2", text: "кот и собака", audio: audio("kot_i_sobaka.mp3"), options: [option("kot-sobaka", "", "🐱 + 🐶"), option("malchik-devochka", "", "👦 + 👧"), option("dom-park", "", "🏠 + 🌳🌳🌳")], correct: "kot-sobaka" },
          { id: "u2g-4-3", text: "мяч и книга", audio: audio("myach_i_kniga.mp3"), options: [option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶"), option("mama-papa", "", "👩‍👧 + 👨")], correct: "myach-kniga" },
          { id: "u2g-4-4", text: "дом и парк", audio: audio("dom_i_park.mp3"), options: [option("dom-park", "", "🏠 + 🌳🌳🌳"), option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶")], correct: "dom-park" }
        ]
      },
      {
        type: "mini_reading",
        title: "Мини-чтение",
        instruction: "Читай:",
        tasks: [
          { id: "u2g-5-1", text: "Мама здесь.\nКот здесь.", audio: audio("u2_game_mama_kot_zdes.mp3"), question: "Кто здесь?", options: [option("mama-kot", "мама и кот", "👩‍👧➕🐱"), option("papa-sobaka", "папа и собака", "👨➕🐶")], correct: "mama-kot" },
          { id: "u2g-5-2", text: "Папа там.\nСобака там.", audio: audio("u2_game_papa_sobaka_tam.mp3"), question: "Кто там?", options: [option("papa-sobaka", "папа и собака", "👨➕🐶"), option("mama-kot", "мама и кот", "👩‍👧➕🐱")], correct: "papa-sobaka" },
          { id: "u2g-5-3", text: "Мальчик здесь.\nМяч здесь.", audio: audio("u2_game_malchik_myach_zdes.mp3"), question: "Что здесь?", options: [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], correct: "myach" },
          { id: "u2g-5-4", text: "Девочка там.\nКнига там.", audio: audio("u2_game_devochka_kniga_tam.mp3"), question: "Что там?", options: [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], correct: "kniga" }
        ]
      }
    ]
  };

  var unit2 = {
    id: "unit-2-kto-chto-malenkiy-mir",
    title: "Юнит 2: Кто? Что? Маленький мир",
    icon: "❓",
    stages: [
      {
        type: "slides",
        title: "Урок 4: Кто?",
        tasks: lesson4Slides
      },
      {
        type: "slides",
        title: "Урок 5: Что?",
        tasks: lesson5Slides
      },
      {
        type: "slides",
        title: "Урок 6: Кто и что здесь?",
        tasks: lesson6Slides
      },
      {
        type: "unit-2-kto-chto-game",
        title: "Игра: Кто? Что? Где?",
        tasks: [unit2Game]
      }
    ]
  };

  root.LexiLandUnit2 = unit2;
  root.LexiLandUnit2AudioLesson = {
    id: "unit-2-kto-chto-malenkiy-mir-audio",
    title: "Юнит 2",
    dictionary: dictionary,
    units: [unit2]
  };

  if (root.LexiLandLesson3) {
    root.LexiLandLesson3.dictionary = root.LexiLandLesson3.dictionary || [];
    dictionary.forEach(function (item) {
      var exists = root.LexiLandLesson3.dictionary.some(function (entryItem) {
        return entryItem.id === item.id;
      });
      if (!exists) {
        root.LexiLandLesson3.dictionary.push(item);
      }
    });

    root.LexiLandLesson3.units = root.LexiLandLesson3.units || [];
    var hasUnit = root.LexiLandLesson3.units.some(function (item) {
      return item.id === unit2.id;
    });
    if (!hasUnit) {
      root.LexiLandLesson3.units.push(unit2);
    }
  }
}(typeof window !== "undefined" ? window : globalThis));
