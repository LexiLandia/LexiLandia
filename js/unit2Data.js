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
    "стол": m("стол", "🟫"),
    "стул": m("стул", "🪑"),
    "телефон": m("телефон", "📱"),
    "хлеб": m("хлеб", "🍞"),
    "сок": m("сок", "🧃"),
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
    option("devochka", "девочка", "👧"),
    option("kot", "кот", "🐱"),
    option("sobaka", "собака", "🐶")
  ];

  var peopleOptions = [
    option("mama", "мама", "👩‍👧"),
    option("papa", "папа", "👨"),
    option("malchik", "мальчик", "👦"),
    option("devochka", "девочка", "👧")
  ];

  var animalOptions = [
    option("kot", "кот", "🐱"),
    option("sobaka", "собака", "🐶")
  ];

  var whoShortOptions = [
    option("on", "он", "👦"),
    option("ona", "она", "👧")
  ];

  var whatOptions = [
    option("myach", "мяч", "⚽"),
    option("kniga", "книга", "📖"),
    option("stol", "стол", "🟫"),
    option("stul", "стул", "🪑")
  ];

  var objectOptions = [
    option("myach", "мяч", "⚽"),
    option("kniga", "книга", "📖"),
    option("stol", "стол", "🟫"),
    option("stul", "стул", "🪑"),
    option("telefon", "телефон", "📱"),
    option("voda", "вода", "💧"),
    option("yabloko", "яблоко", "🍎"),
    option("hleb", "хлеб", "🍞")
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
    entry("u2-stol", "стол", "🟫", "word", "stol.mp3"),
    entry("u2-stul", "стул", "🪑", "word", "stul.mp3"),
    entry("u2-telefon", "телефон", "📱", "word", "telefon.mp3"),
    entry("u2-hleb", "хлеб", "🍞", "word", "hleb.mp3"),
    entry("u2-voda", "вода", "💧", "word", "voda.mp3"),
    entry("u2-yabloko", "яблоко", "🍎", "word", "yabloko.mp3"),
    entry("u2-sok", "сок", "🧃", "word", "sok.mp3"),
    entry("u2-eto-mama", "Это мама.", "👉👩‍👧", "chunk", "eto_mama.mp3"),
    entry("u2-eto-papa", "Это папа.", "👉👨", "chunk", "eto_papa.mp3"),
    entry("u2-eto-malchik", "Это мальчик.", "👉👦", "chunk", "eto_malchik.mp3"),
    entry("u2-eto-devochka", "Это девочка.", "👉👧", "chunk", "eto_devochka.mp3"),
    entry("u2-eto-kot", "Это кот.", "👉🐱", "chunk", "eto_kot.mp3"),
    entry("u2-eto-sobaka", "Это собака.", "👉🐶", "chunk", "eto_sobaka.mp3"),
    entry("u2-eto-myach", "Это мяч.", "👉⚽", "chunk", "eto_myach.mp3"),
    entry("u2-eto-kniga", "Это книга.", "👉📖", "chunk", "eto_kniga.mp3"),
    entry("u2-eto-stol", "Это стол.", "👉🟫", "chunk", "eto_stol.mp3"),
    entry("u2-eto-stul", "Это стул.", "👉🪑", "chunk", "eto_stul.mp3"),
    entry("u2-eto-telefon", "Это телефон.", "👉📱", "chunk", "eto_telefon.mp3"),
    entry("u2-eto-hleb", "Это хлеб.", "👉🍞", "chunk", "eto_hleb.mp3"),
    entry("u2-eto-sok", "Это сок.", "👉🧃", "chunk", "eto_sok.mp3"),
    entry("u2-on-zdes", "Он здесь.", "👦📍", "chunk", "on_zdes.mp3"),
    entry("u2-ona-tam", "Она там.", "👧👉", "chunk", "ona_tam.mp3"),
    entry("u2-kot-zdes", "Кот здесь.", "🐱📍", "chunk", "kot_zdes.mp3"),
    entry("u2-sobaka-tam", "Собака там.", "🐶👉", "chunk", "sobaka_tam.mp3"),
    entry("u2-myach-zdes", "Мяч здесь.", "⚽📍", "chunk", "myach_zdes.mp3"),
    entry("u2-kniga-tam", "Книга там.", "📖👉", "chunk", "kniga_tam.mp3"),
    entry("u2-stol-zdes", "Стол здесь.", "🟫📍", "chunk", "stol_zdes.mp3"),
    entry("u2-stul-tam", "Стул там.", "🪑👉", "chunk", "stul_tam.mp3"),
    entry("u2-telefon-zdes", "Телефон здесь.", "📱📍", "chunk", "telefon_zdes.mp3"),
    entry("u2-hleb-tam", "Хлеб там.", "🍞👉", "chunk", "hleb_tam.mp3"),
    entry("u2-voda-tam", "Вода там.", "💧👉", "chunk", "voda_tam.mp3"),
    entry("u2-yabloko-zdes", "Яблоко здесь.", "🍎📍", "chunk", "yabloko_zdes.mp3"),
    entry("u2-mama-i-papa", "мама и папа", "👩‍👧➕👨", "chunk", "mama_i_papa.mp3"),
    entry("u2-kot-i-sobaka", "кот и собака", "🐱➕🐶", "chunk", "kot_i_sobaka.mp3"),
    entry("u2-myach-i-kniga", "мяч и книга", "⚽➕📖", "chunk", "myach_i_kniga.mp3"),
    entry("u2-malchik-i-devochka", "мальчик и девочка", "👦➕👧", "chunk", "malchik_i_devochka.mp3"),
    entry("u2-stol-i-stul", "стол и стул", "🟫➕🪑", "chunk", "stol_i_stul.mp3"),
    entry("u2-telefon-i-voda", "телефон и вода", "📱➕💧", "chunk", "telefon_i_voda.mp3"),
    entry("u2-yabloko-i-hleb", "яблоко и хлеб", "🍎➕🍞", "chunk", "yabloko_i_hleb.mp3"),
    entry("u2-dom-i-park", "дом и парк", "🏠➕🌳🌳🌳", "chunk", "dom_i_park.mp3")
  ];

  var lesson4Slides = [
    slide("u2-l4-1", "Урок 4", ["Кто?", "❓👤"], emoji("❓👤"), [line("Урок 4", "urok_4.mp3"), line("Кто?", "kto.mp3")], null, true),
    slide("u2-l4-2", "Кто?", ["кто? ❓👤", "Кто?"], emoji("❓👤"), [line("Кто?", "kto.mp3")], null, true),
    slide("u2-l4-3", "мама", ["мама 👩‍👧", "Это мама."], focus(["👩‍👧", "👉 👩‍👧"]), [line("мама", "mama.mp3"), line("Это мама.", "eto_mama.mp3")], null, true),
    slide("u2-l4-4", "папа", ["папа 👨", "Это папа."], focus(["👨", "👉 👨"]), [line("папа", "papa.mp3"), line("Это папа.", "eto_papa.mp3")], null, true),
    slide("u2-l4-5", "мальчик", ["мальчик 👦", "Это мальчик."], focus(["👦", "👉 👦"]), [line("мальчик", "malchik.mp3"), line("Это мальчик.", "eto_malchik.mp3")], null, true),
    slide("u2-l4-6", "девочка", ["девочка 👧", "Это девочка."], focus(["👧", "👉 👧"]), [line("девочка", "devochka.mp3"), line("Это девочка.", "eto_devochka.mp3")], null, true),
    slide("u2-l4-7", "кот", ["кот 🐱", "Это кот."], focus(["🐱", "👉 🐱"]), [line("кот", "kot.mp3"), line("Это кот.", "eto_kot.mp3")], null, true),
    slide("u2-l4-8", "собака", ["собака 🐶", "Это собака."], focus(["🐶", "👉 🐶"]), [line("собака", "sobaka.mp3"), line("Это собака.", "eto_sobaka.mp3")], null, true),
    slide("u2-l4-9", "он", ["он 👦", "Он здесь."], scene(["👦"], []), [line("он", "on.mp3"), line("Он здесь.", "on_zdes.mp3")], null, true),
    slide("u2-l4-10", "она", ["она 👧", "Она там."], scene([], ["👧"]), [line("она", "ona.mp3"), line("Она там.", "ona_tam.mp3")], null, true),
    slide("u2-l4-11", "Кто это?", ["Кто это?"], emoji("👩‍👧"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q1", "Кто это?", peopleOptions, "mama")], true),
    slide("u2-l4-12", "Кто это?", ["Кто это?"], emoji("👨"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q2", "Кто это?", peopleOptions, "papa")], true),
    slide("u2-l4-13", "Кто это?", ["Кто это?"], emoji("👦"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q3", "Кто это?", peopleOptions, "malchik")], true),
    slide("u2-l4-14", "Кто это?", ["Кто это?"], emoji("👧"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q4", "Кто это?", peopleOptions, "devochka")], true),
    slide("u2-l4-15", "Кто это?", ["Кто это?"], emoji("🐱"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q5", "Кто это?", [option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶"), option("mama", "мама", "👩‍👧"), option("malchik", "мальчик", "👦")], "kot")], true),
    slide("u2-l4-16", "Кто это?", ["Кто это?"], emoji("🐶"), [line("Кто это?", "kto_eto.mp3")], [question("u2-l4-q6", "Кто это?", [option("sobaka", "собака", "🐶"), option("kot", "кот", "🐱"), option("papa", "папа", "👨"), option("devochka", "девочка", "👧")], "sobaka")], true),
    slide("u2-l4-17", "Где?", ["Кот здесь."], scene(["🐱"], []), [line("Кот здесь.", "kot_zdes.mp3")], [question("u2-l4-q7", "Кто здесь?", animalOptions, "kot")], true),
    slide("u2-l4-18", "Где?", ["Собака там."], scene([], ["🐶"]), [line("Собака там.", "sobaka_tam.mp3")], [question("u2-l4-q8", "Кто там?", animalOptions, "sobaka")], true),
    slide("u2-l4-19", "Читай", ["Это мама.", "Мама здесь.", "", "Это папа.", "Папа там."], scene(["👩‍👧"], ["👨"]), [line("Это мама. Мама здесь. Это папа. Папа там.", "u2_l4_mama_zdes_papa_tam.mp3")], [
      question("u2-l4-q9", "Кто здесь?", [option("mama", "мама", "👩‍👧"), option("papa", "папа", "👨")], "mama"),
      question("u2-l4-q10", "Кто там?", [option("papa", "папа", "👨"), option("mama", "мама", "👩‍👧")], "papa")
    ], true),
    slide("u2-l4-20", "Читай", ["Он здесь.", "Она там."], scene(["👦"], ["👧"]), [line("Он здесь. Она там.", "u2_l4_on_zdes_ona_tam.mp3")], [
      question("u2-l4-q11", "Кто здесь?", whoShortOptions, "on"),
      question("u2-l4-q12", "Кто там?", whoShortOptions, "ona")
    ], true),
    slide("u2-l4-21", "Читай", ["Кот здесь.", "Собака там."], scene(["🐱"], ["🐶"]), [line("Кот здесь. Собака там.", "u2_l4_kot_zdes_sobaka_tam.mp3")], [
      question("u2-l4-q13", "Кто здесь?", animalOptions, "kot"),
      question("u2-l4-q14", "Кто там?", animalOptions, "sobaka")
    ], true),
    slide("u2-l4-22", "Читай", ["Мальчик здесь.", "Девочка там.", "Кот там."], scene(["👦"], ["👧", "🐱"]), [line("Мальчик здесь. Девочка там. Кот там.", "u2_l4_malchik_devochka_kot.mp3")], [
      question("u2-l4-q15", "Кто здесь?", [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧"), option("kot", "кот", "🐱")], "malchik"),
      question("u2-l4-q16", "Кто там?", [option("devochka-kot", "девочка и кот", "👧➕🐱"), option("malchik", "мальчик", "👦")], "devochka-kot")
    ], true),
    slide("u2-l4-23", "Читай", ["Мама здесь.", "Папа там.", "", "Кот здесь.", "Собака там.", "", "Мальчик здесь.", "Девочка там."], scene(["👩‍👧", "🐱", "👦"], ["👨", "🐶", "👧"]), [line("Мама здесь. Папа там. Кот здесь. Собака там. Мальчик здесь. Девочка там.", "lesson_4_text_animals.mp3")], [
      question("u2-l4-q17", "Кто здесь?", [option("mama-kot-malchik", "мама, кот, мальчик", "👩‍👧🐱👦"), option("papa-sobaka-devochka", "папа, собака, девочка", "👨🐶👧")], "mama-kot-malchik"),
      question("u2-l4-q18", "Кто там?", [option("papa-sobaka-devochka", "папа, собака, девочка", "👨🐶👧"), option("mama-kot-malchik", "мама, кот, мальчик", "👩‍👧🐱👦")], "papa-sobaka-devochka")
    ], true),
    slide("u2-l4-24", "Отлично!", ["Отлично! ✅", "", "Кто?", "мама", "папа", "кот", "собака", "он", "она"], wordList([{ text: "кто", emoji: "❓👤" }, { text: "мама", emoji: "👩‍👧" }, { text: "папа", emoji: "👨" }, { text: "кот", emoji: "🐱" }, { text: "собака", emoji: "🐶" }, { text: "он", emoji: "👦" }, { text: "она", emoji: "👧" }]), [line("Отлично!", "otlichno.mp3"), line("Кто?", "kto.mp3")], null, true)
  ];

  var lesson5Slides = [
    slide("u2-l5-1", "Урок 5", ["Что?", "❓📦"], emoji("❓📦"), [line("Урок 5", "urok_5.mp3"), line("Что?", "chto.mp3")], null, true),
    slide("u2-l5-2", "Что?", ["что? ❓📦", "Что?"], emoji("❓📦"), [line("Что?", "chto.mp3")], null, true),
    slide("u2-l5-3", "мяч", ["мяч ⚽", "Это мяч."], focus(["⚽", "👉 ⚽"]), [line("мяч", "myach.mp3"), line("Это мяч.", "eto_myach.mp3")], null, true),
    slide("u2-l5-4", "книга", ["книга 📖", "Это книга."], focus(["📖", "👉 📖"]), [line("книга", "kniga.mp3"), line("Это книга.", "eto_kniga.mp3")], null, true),
    slide("u2-l5-5", "стол", ["стол 🟫", "Это стол."], focus(["🟫", "👉 🟫"]), [line("стол", "stol.mp3"), line("Это стол.", "eto_stol.mp3")], null, true),
    slide("u2-l5-6", "стул", ["стул 🪑", "Это стул."], focus(["🪑", "👉 🪑"]), [line("стул", "stul.mp3"), line("Это стул.", "eto_stul.mp3")], null, true),
    slide("u2-l5-7", "телефон", ["телефон 📱", "Это телефон."], focus(["📱", "👉 📱"]), [line("телефон", "telefon.mp3"), line("Это телефон.", "eto_telefon.mp3")], null, true),
    slide("u2-l5-8", "вода", ["вода 💧", "Это вода."], focus(["💧", "👉 💧"]), [line("вода", "voda.mp3"), line("Это вода.", "eto_voda.mp3")], null, true),
    slide("u2-l5-9", "яблоко", ["яблоко 🍎", "Это яблоко."], focus(["🍎", "👉 🍎"]), [line("яблоко", "yabloko.mp3"), line("Это яблоко.", "eto_yabloko.mp3")], null, true),
    slide("u2-l5-10", "хлеб", ["хлеб 🍞", "Это хлеб."], focus(["🍞", "👉 🍞"]), [line("хлеб", "hleb.mp3"), line("Это хлеб.", "eto_hleb.mp3")], null, true),
    slide("u2-l5-11", "Что это?", ["Что это?"], emoji("⚽"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q1", "Что это?", whatOptions, "myach")], true),
    slide("u2-l5-12", "Что это?", ["Что это?"], emoji("📖"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q2", "Что это?", whatOptions, "kniga")], true),
    slide("u2-l5-13", "Что это?", ["Что это?"], emoji("🟫"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q3", "Что это?", whatOptions, "stol")], true),
    slide("u2-l5-14", "Что это?", ["Что это?"], emoji("🪑"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q4", "Что это?", whatOptions, "stul")], true),
    slide("u2-l5-15", "Что это?", ["Что это?"], emoji("📱"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q5", "Что это?", [option("telefon", "телефон", "📱"), option("kniga", "книга", "📖"), option("stol", "стол", "🟫"), option("myach", "мяч", "⚽")], "telefon")], true),
    slide("u2-l5-16", "Что это?", ["Что это?"], emoji("💧"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q6", "Что это?", [option("voda", "вода", "💧"), option("yabloko", "яблоко", "🍎"), option("hleb", "хлеб", "🍞"), option("sok", "сок", "🧃")], "voda")], true),
    slide("u2-l5-17", "Что это?", ["Что это?"], emoji("🍎"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q7", "Что это?", [option("yabloko", "яблоко", "🍎"), option("voda", "вода", "💧"), option("hleb", "хлеб", "🍞"), option("sok", "сок", "🧃")], "yabloko")], true),
    slide("u2-l5-18", "Что это?", ["Что это?"], emoji("🍞"), [line("Что это?", "chto_eto.mp3")], [question("u2-l5-q8", "Что это?", [option("hleb", "хлеб", "🍞"), option("yabloko", "яблоко", "🍎"), option("voda", "вода", "💧"), option("telefon", "телефон", "📱")], "hleb")], true),
    slide("u2-l5-19", "Что здесь?", ["Мяч здесь."], scene(["⚽"], []), [line("Мяч здесь.", "myach_zdes.mp3")], [question("u2-l5-q9", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach")], true),
    slide("u2-l5-20", "Что там?", ["Книга там."], scene([], ["📖"]), [line("Книга там.", "kniga_tam.mp3")], [question("u2-l5-q10", "Что там?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "kniga")], true),
    slide("u2-l5-21", "Что здесь?", ["Стол здесь."], scene(["🟫"], []), [line("Стол здесь.", "stol_zdes.mp3")], [question("u2-l5-q11", "Что здесь?", [option("stol", "стол", "🟫"), option("stul", "стул", "🪑")], "stol")], true),
    slide("u2-l5-22", "Что там?", ["Стул там."], scene([], ["🪑"]), [line("Стул там.", "stul_tam.mp3")], [question("u2-l5-q12", "Что там?", [option("stul", "стул", "🪑"), option("stol", "стол", "🟫")], "stul")], true),
    slide("u2-l5-23", "Что здесь?", ["Телефон здесь."], scene(["📱"], []), [line("Телефон здесь.", "telefon_zdes.mp3")], [question("u2-l5-q13", "Что здесь?", [option("telefon", "телефон", "📱"), option("kniga", "книга", "📖")], "telefon")], true),
    slide("u2-l5-24", "Что там?", ["Хлеб там."], scene([], ["🍞"]), [line("Хлеб там.", "hleb_tam.mp3")], [question("u2-l5-q14", "Что там?", [option("hleb", "хлеб", "🍞"), option("yabloko", "яблоко", "🍎")], "hleb")], true),
    slide("u2-l5-25", "Читай", ["Это мяч.", "Мяч здесь.", "", "Это книга.", "Книга там."], scene(["⚽"], ["📖"]), [line("Это мяч. Мяч здесь. Это книга. Книга там.", "u2_l5_myach_zdes_kniga_tam.mp3")], [
      question("u2-l5-q15", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach"),
      question("u2-l5-q16", "Что там?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "kniga")
    ], true),
    slide("u2-l5-26", "Читай", ["Стол здесь.", "Стул там.", "Телефон здесь."], scene(["🟫", "📱"], ["🪑"]), [line("Стол здесь. Стул там. Телефон здесь.", "u2_l5_stol_stul_telefon.mp3")], [
      question("u2-l5-q17", "Что здесь?", [option("stol-telefon", "стол и телефон", "🟫➕📱"), option("stul", "стул", "🪑")], "stol-telefon"),
      question("u2-l5-q18", "Что там?", [option("stul", "стул", "🪑"), option("telefon", "телефон", "📱")], "stul")
    ], true),
    slide("u2-l5-27", "Читай", ["Здесь вода и яблоко.", "Там хлеб и книга."], scene(["💧", "🍎"], ["🍞", "📖"]), [line("Здесь вода и яблоко. Там хлеб и книга.", "u2_l5_voda_yabloko_hleb_kniga.mp3")], [
      question("u2-l5-q19", "Что здесь?", [option("voda-yabloko", "вода и яблоко", "💧➕🍎"), option("hleb-kniga", "хлеб и книга", "🍞➕📖")], "voda-yabloko"),
      question("u2-l5-q20", "Что там?", [option("hleb-kniga", "хлеб и книга", "🍞➕📖"), option("voda-yabloko", "вода и яблоко", "💧➕🍎")], "hleb-kniga")
    ], true),
    slide("u2-l5-28", "Читай", ["Мяч здесь.", "Книга там.", "", "Стол здесь.", "Стул там.", "", "Телефон здесь.", "Хлеб там."], scene(["⚽", "🟫", "📱"], ["📖", "🪑", "🍞"]), [line("Мяч здесь. Книга там. Стол здесь. Стул там. Телефон здесь. Хлеб там.", "lesson_5_text_objects.mp3")], [
      question("u2-l5-q21", "Что здесь?", [option("myach-stol-telefon", "мяч, стол, телефон", "⚽🟫📱"), option("kniga-stul-hleb", "книга, стул, хлеб", "📖🪑🍞")], "myach-stol-telefon"),
      question("u2-l5-q22", "Что там?", [option("kniga-stul-hleb", "книга, стул, хлеб", "📖🪑🍞"), option("myach-stol-telefon", "мяч, стол, телефон", "⚽🟫📱")], "kniga-stul-hleb")
    ], true),
    slide("u2-l5-29", "Отлично!", ["Отлично! ✅", "", "Что?", "мяч", "книга", "стол", "стул", "телефон", "хлеб"], wordList([{ text: "что", emoji: "❓📦" }, { text: "мяч", emoji: "⚽" }, { text: "книга", emoji: "📖" }, { text: "стол", emoji: "🟫" }, { text: "стул", emoji: "🪑" }, { text: "телефон", emoji: "📱" }, { text: "хлеб", emoji: "🍞" }]), [line("Отлично!", "otlichno.mp3"), line("Что?", "chto.mp3")], null, true)
  ];

  var lesson6Slides = [
    slide("u2-l6-1", "Урок 6", ["Кто и что?", "❓👤 ➕ ❓📦"], emoji("❓👤 ➕ ❓📦"), [line("Урок 6", "urok_6.mp3"), line("Кто и что?", "kto_i_chto.mp3")], null, true),
    slide("u2-l6-2", "и", ["и ➕", "мама и папа"], focus(["👩‍👧", "➕", "👨"]), [line("и", "i.mp3"), line("мама и папа", "mama_i_papa.mp3")], null, true),
    slide("u2-l6-3", "и", ["кот и собака"], focus(["🐱", "➕", "🐶"]), [line("кот и собака", "kot_i_sobaka.mp3")], null, true),
    slide("u2-l6-4", "и", ["мальчик и девочка"], focus(["👦", "➕", "👧"]), [line("мальчик и девочка", "malchik_i_devochka.mp3")], null, true),
    slide("u2-l6-5", "и", ["мяч и книга"], focus(["⚽", "➕", "📖"]), [line("мяч и книга", "myach_i_kniga.mp3")], null, true),
    slide("u2-l6-6", "и", ["стол и стул"], focus(["🟫", "➕", "🪑"]), [line("стол и стул", "stol_i_stul.mp3")], null, true),
    slide("u2-l6-7", "и", ["телефон и вода"], focus(["📱", "➕", "💧"]), [line("телефон и вода", "telefon_i_voda.mp3")], null, true),
    slide("u2-l6-8", "и", ["яблоко и хлеб"], focus(["🍎", "➕", "🍞"]), [line("яблоко и хлеб", "yabloko_i_hleb.mp3")], null, true),
    slide("u2-l6-9", "Найди", ["мама и папа"], emoji("👩‍👧 ➕ 👨"), [line("мама и папа", "mama_i_papa.mp3")], [question("u2-l6-q1", "Найди:", [option("mama-papa", "", "👩‍👧 + 👨"), option("kot-sobaka", "", "🐱 + 🐶"), option("myach-kniga", "", "⚽ + 📖")], "mama-papa")], true),
    slide("u2-l6-10", "Найди", ["кот и собака"], emoji("🐱 ➕ 🐶"), [line("кот и собака", "kot_i_sobaka.mp3")], [question("u2-l6-q2", "Найди:", [option("kot-sobaka", "", "🐱 + 🐶"), option("malchik-devochka", "", "👦 + 👧"), option("stol-stul", "", "🟫 + 🪑")], "kot-sobaka")], true),
    slide("u2-l6-11", "Найди", ["мяч и книга"], emoji("⚽ ➕ 📖"), [line("мяч и книга", "myach_i_kniga.mp3")], [question("u2-l6-q3", "Найди:", [option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶"), option("telefon-voda", "", "📱 + 💧")], "myach-kniga")], true),
    slide("u2-l6-12", "Найди", ["стол и стул"], emoji("🟫 ➕ 🪑"), [line("стол и стул", "stol_i_stul.mp3")], [question("u2-l6-q4", "Найди:", [option("stol-stul", "", "🟫 + 🪑"), option("mama-papa", "", "👩‍👧 + 👨"), option("yabloko-hleb", "", "🍎 + 🍞")], "stol-stul")], true),
    slide("u2-l6-13", "Найди", ["телефон и вода"], emoji("📱 ➕ 💧"), [line("телефон и вода", "telefon_i_voda.mp3")], [question("u2-l6-q5", "Найди:", [option("telefon-voda", "", "📱 + 💧"), option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶")], "telefon-voda")], true),
    slide("u2-l6-14", "Найди", ["яблоко и хлеб"], emoji("🍎 ➕ 🍞"), [line("яблоко и хлеб", "yabloko_i_hleb.mp3")], [question("u2-l6-q6", "Найди:", [option("yabloko-hleb", "", "🍎 + 🍞"), option("stol-stul", "", "🟫 + 🪑"), option("malchik-devochka", "", "👦 + 👧")], "yabloko-hleb")], true),
    slide("u2-l6-15", "Читай", ["Мама здесь.", "Кот здесь.", "Мяч здесь.", "", "Папа там.", "Собака там.", "Книга там."], scene(["👩‍👧", "🐱", "⚽"], ["👨", "🐶", "📖"]), [line("Мама здесь. Кот здесь. Мяч здесь. Папа там. Собака там. Книга там.", "lesson_6_text_1_who_what.mp3")], [
      question("u2-l6-q7", "Кто здесь?", [option("mama-kot", "мама и кот", "👩‍👧➕🐱"), option("papa-sobaka", "папа и собака", "👨➕🐶")], "mama-kot"),
      question("u2-l6-q8", "Кто там?", [option("papa-sobaka", "папа и собака", "👨➕🐶"), option("mama-kot", "мама и кот", "👩‍👧➕🐱")], "papa-sobaka"),
      question("u2-l6-q9", "Что здесь?", [option("myach", "мяч", "⚽"), option("kniga", "книга", "📖")], "myach"),
      question("u2-l6-q10", "Что там?", [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], "kniga")
    ], true),
    slide("u2-l6-16", "Читай", ["Мальчик здесь.", "Телефон здесь.", "Стол здесь.", "", "Девочка там.", "Стул там.", "Хлеб там."], scene(["👦", "📱", "🟫"], ["👧", "🪑", "🍞"]), [line("Мальчик здесь. Телефон здесь. Стол здесь. Девочка там. Стул там. Хлеб там.", "lesson_6_text_2_objects.mp3")], [
      question("u2-l6-q11", "Кто здесь?", [option("malchik", "мальчик", "👦"), option("devochka", "девочка", "👧")], "malchik"),
      question("u2-l6-q12", "Кто там?", [option("devochka", "девочка", "👧"), option("malchik", "мальчик", "👦")], "devochka"),
      question("u2-l6-q13", "Что здесь?", [option("telefon-stol", "телефон и стол", "📱➕🟫"), option("stul-hleb", "стул и хлеб", "🪑➕🍞")], "telefon-stol"),
      question("u2-l6-q14", "Что там?", [option("stul-hleb", "стул и хлеб", "🪑➕🍞"), option("telefon-stol", "телефон и стол", "📱➕🟫")], "stul-hleb")
    ], true),
    slide("u2-l6-17", "Читай", ["Кот здесь.", "Собака здесь.", "", "Мяч там.", "Книга там."], scene(["🐱", "🐶"], ["⚽", "📖"]), [line("Кот здесь. Собака здесь. Мяч там. Книга там.", "u2_l6_kto_zdes_chto_tam.mp3")], [
      question("u2-l6-q15", "Кто здесь?", [option("kot-sobaka", "кот и собака", "🐱➕🐶"), option("myach-kniga", "мяч и книга", "⚽➕📖")], "kot-sobaka"),
      question("u2-l6-q16", "Что там?", [option("myach-kniga", "мяч и книга", "⚽➕📖"), option("telefon-voda", "телефон и вода", "📱➕💧")], "myach-kniga")
    ], true),
    slide("u2-l6-18", "Картинка", ["Мама здесь.", "Кот здесь.", "Мяч здесь.", "Папа там.", "Собака там.", "Книга там."], scene(["👩‍👧", "🐱", "⚽"], ["👨", "🐶", "📖"]), [line("Мама здесь. Кот здесь. Мяч здесь. Папа там. Собака там. Книга там.", "u2_l6_picture_1_who_what.mp3")], [question("u2-l6-q17", "Выбери правду.", [option("mama-zdes", "Мама здесь.", "👩‍👧📍"), option("papa-zdes", "Папа здесь.", "👨📍"), option("kniga-zdes", "Книга здесь.", "📖📍")], "mama-zdes")], true),
    slide("u2-l6-19", "Картинка", ["Мальчик здесь.", "Стол здесь.", "Девочка там.", "Стул там."], scene(["👦", "🟫"], ["👧", "🪑"]), [line("Мальчик здесь. Стол здесь. Девочка там. Стул там.", "u2_l6_picture_2_objects.mp3")], [question("u2-l6-q18", "Выбери правду.", [option("stul-tam", "Стул там.", "🪑👉"), option("stol-tam", "Стол там.", "🟫👉"), option("devochka-zdes", "Девочка здесь.", "👧📍")], "stul-tam")], true),
    slide("u2-l6-20", "Читай", ["Здесь мама и кот.", "Там папа и собака.", "", "Здесь телефон и вода.", "Там яблоко и хлеб."], scene(["👩‍👧", "🐱", "📱", "💧"], ["👨", "🐶", "🍎", "🍞"]), [line("Здесь мама и кот. Там папа и собака. Здесь телефон и вода. Там яблоко и хлеб.", "u2_l6_final_text_who_what.mp3")], [
      question("u2-l6-q19", "Кто здесь?", [option("mama-kot", "мама и кот", "👩‍👧➕🐱"), option("papa-sobaka", "папа и собака", "👨➕🐶")], "mama-kot"),
      question("u2-l6-q20", "Кто там?", [option("papa-sobaka", "папа и собака", "👨➕🐶"), option("mama-kot", "мама и кот", "👩‍👧➕🐱")], "papa-sobaka"),
      question("u2-l6-q21", "Что здесь?", [option("telefon-voda", "телефон и вода", "📱➕💧"), option("yabloko-hleb", "яблоко и хлеб", "🍎➕🍞")], "telefon-voda"),
      question("u2-l6-q22", "Что там?", [option("yabloko-hleb", "яблоко и хлеб", "🍎➕🍞"), option("telefon-voda", "телефон и вода", "📱➕💧")], "yabloko-hleb")
    ], true),
    slide("u2-l6-21", "Отлично!", ["Отлично! ✅", "", "Кто?", "Что?", "Где?", "", "Ты читаешь! 📖"], wordList([{ text: "кто", emoji: "❓👤" }, { text: "что", emoji: "❓📦" }, { text: "где", emoji: "❓📍" }, { text: "кот", emoji: "🐱" }, { text: "мяч", emoji: "⚽" }]), [line("Отлично!", "otlichno.mp3"), line("Кто?", "kto.mp3"), line("Что?", "chto.mp3"), line("Где?", "gde.mp3")], null, true)
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
          { id: "u2g-1-1", visual: "👩‍👧", text: "мама", audio: audio("mama.mp3"), options: peopleOptions, correct: "mama" },
          { id: "u2g-1-2", visual: "👨", text: "папа", audio: audio("papa.mp3"), options: peopleOptions, correct: "papa" },
          { id: "u2g-1-3", visual: "👦", text: "мальчик", audio: audio("malchik.mp3"), options: peopleOptions, correct: "malchik" },
          { id: "u2g-1-4", visual: "👧", text: "девочка", audio: audio("devochka.mp3"), options: peopleOptions, correct: "devochka" },
          { id: "u2g-1-5", visual: "🐱", text: "кот", audio: audio("kot.mp3"), options: [option("kot", "кот", "🐱"), option("sobaka", "собака", "🐶"), option("mama", "мама", "👩‍👧"), option("malchik", "мальчик", "👦")], correct: "kot" },
          { id: "u2g-1-6", visual: "🐶", text: "собака", audio: audio("sobaka.mp3"), options: [option("sobaka", "собака", "🐶"), option("kot", "кот", "🐱"), option("papa", "папа", "👨"), option("devochka", "девочка", "👧")], correct: "sobaka" }
        ]
      },
      {
        type: "image_to_word",
        title: "Что это?",
        instruction: "Что это?",
        tasks: [
          { id: "u2g-2-1", visual: "⚽", text: "мяч", audio: audio("myach.mp3"), options: whatOptions, correct: "myach" },
          { id: "u2g-2-2", visual: "📖", text: "книга", audio: audio("kniga.mp3"), options: whatOptions, correct: "kniga" },
          { id: "u2g-2-3", visual: "🟫", text: "стол", audio: audio("stol.mp3"), options: whatOptions, correct: "stol" },
          { id: "u2g-2-4", visual: "🪑", text: "стул", audio: audio("stul.mp3"), options: whatOptions, correct: "stul" },
          { id: "u2g-2-5", visual: "📱", text: "телефон", audio: audio("telefon.mp3"), options: [option("telefon", "телефон", "📱"), option("kniga", "книга", "📖"), option("stol", "стол", "🟫"), option("myach", "мяч", "⚽")], correct: "telefon" },
          { id: "u2g-2-6", visual: "🍞", text: "хлеб", audio: audio("hleb.mp3"), options: [option("hleb", "хлеб", "🍞"), option("yabloko", "яблоко", "🍎"), option("voda", "вода", "💧"), option("telefon", "телефон", "📱")], correct: "hleb" }
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
          { id: "u2g-3-4", text: "Книга там.", audio: audio("kniga_tam.mp3"), question: "Где книга?", options: hereThereOptions, correct: "tam" },
          { id: "u2g-3-5", text: "Стол здесь.", audio: audio("stol_zdes.mp3"), question: "Где стол?", options: hereThereOptions, correct: "zdes" },
          { id: "u2g-3-6", text: "Хлеб там.", audio: audio("hleb_tam.mp3"), question: "Где хлеб?", options: hereThereOptions, correct: "tam" }
        ]
      },
      {
        type: "pair_to_image",
        title: "И",
        instruction: "Найди:",
        tasks: [
          { id: "u2g-4-1", text: "мама и папа", audio: audio("mama_i_papa.mp3"), options: [option("mama-papa", "", "👩‍👧 + 👨"), option("kot-sobaka", "", "🐱 + 🐶"), option("myach-kniga", "", "⚽ + 📖")], correct: "mama-papa" },
          { id: "u2g-4-2", text: "кот и собака", audio: audio("kot_i_sobaka.mp3"), options: [option("kot-sobaka", "", "🐱 + 🐶"), option("malchik-devochka", "", "👦 + 👧"), option("stol-stul", "", "🟫 + 🪑")], correct: "kot-sobaka" },
          { id: "u2g-4-3", text: "мяч и книга", audio: audio("myach_i_kniga.mp3"), options: [option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶"), option("mama-papa", "", "👩‍👧 + 👨")], correct: "myach-kniga" },
          { id: "u2g-4-4", text: "стол и стул", audio: audio("stol_i_stul.mp3"), options: [option("stol-stul", "", "🟫 + 🪑"), option("myach-kniga", "", "⚽ + 📖"), option("kot-sobaka", "", "🐱 + 🐶")], correct: "stol-stul" },
          { id: "u2g-4-5", text: "телефон и вода", audio: audio("telefon_i_voda.mp3"), options: [option("telefon-voda", "", "📱 + 💧"), option("mama-papa", "", "👩‍👧 + 👨"), option("yabloko-hleb", "", "🍎 + 🍞")], correct: "telefon-voda" },
          { id: "u2g-4-6", text: "яблоко и хлеб", audio: audio("yabloko_i_hleb.mp3"), options: [option("yabloko-hleb", "", "🍎 + 🍞"), option("stol-stul", "", "🟫 + 🪑"), option("kot-sobaka", "", "🐱 + 🐶")], correct: "yabloko-hleb" }
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
          { id: "u2g-5-4", text: "Девочка там.\nКнига там.", audio: audio("u2_game_devochka_kniga_tam.mp3"), question: "Что там?", options: [option("kniga", "книга", "📖"), option("myach", "мяч", "⚽")], correct: "kniga" },
          { id: "u2g-5-5", text: "Кот здесь.\nСобака здесь.\nТелефон там.", audio: audio("u2_game_kot_sobaka_telefon.mp3"), question: "Кто здесь?", options: [option("kot-sobaka", "кот и собака", "🐱➕🐶"), option("telefon", "телефон", "📱")], correct: "kot-sobaka" },
          { id: "u2g-5-6", text: "Стол здесь.\nСтул там.\nХлеб там.", audio: audio("u2_game_stol_stul_hleb.mp3"), question: "Что там?", options: [option("stul-hleb", "стул и хлеб", "🪑➕🍞"), option("stol", "стол", "🟫")], correct: "stul-hleb" }
        ]
      }
    ]
  };

  var lesson4Unit = {
    id: "lesson-4-kto",
    title: "Урок 4: Кто?",
    icon: "❓👤",
    stages: [
      {
        type: "slides",
        title: "Урок 4: Кто?",
        tasks: lesson4Slides
      }
    ]
  };

  var lesson5Unit = {
    id: "lesson-5-chto",
    title: "Урок 5: Что?",
    icon: "❓📦",
    stages: [
      {
        type: "slides",
        title: "Урок 5: Что?",
        tasks: lesson5Slides
      }
    ]
  };

  var lesson6Unit = {
    id: "lesson-6-kto-i-chto-zdes",
    title: "Урок 6: Кто и что здесь?",
    icon: "➕",
    stages: [
      {
        type: "slides",
        title: "Урок 6: Кто и что здесь?",
        tasks: lesson6Slides
      }
    ]
  };

  var gameUnit = {
    id: "unit-2-game-kto-chto-gde",
    title: "Игра: Кто? Что? Где?",
    icon: "🕹️",
    stages: [
      {
        type: "unit-2-kto-chto-game",
        title: "Игра: Кто? Что? Где?",
        tasks: [unit2Game]
      }
    ]
  };

  root.LexiLandUnit2Lesson = {
    id: "level-0-unit-2-kto-chto-malenkiy-mir",
    order: 4,
    menuLabel: "Юнит 2",
    title: "Юнит 2: Кто? Что? Маленький мир",
    level: "Уровень 0",
    dictionary: dictionary,
    scenes: [],
    units: [lesson4Unit, lesson5Unit, lesson6Unit, gameUnit]
  };
  root.LexiLandUnit2 = root.LexiLandUnit2Lesson;
  root.LexiLandUnit2AudioLesson = root.LexiLandUnit2Lesson;
}(typeof window !== "undefined" ? window : globalThis));
