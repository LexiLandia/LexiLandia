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

  function cards(items) {
    return {
      type: "description-cards",
      items: items
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

  function obj(id, text, emoji, kind, color, size) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      kind: kind,
      color: color || "",
      size: size || "normal"
    };
  }

  function gameTask(id, prompt, visual, audioFile, options, correct, correctFeedback, wrongFeedback) {
    return {
      id: id,
      prompt: prompt,
      text: prompt,
      visual: visual,
      audio: audio(audioFile),
      options: options,
      correct: correct,
      correctFeedback: correctFeedback || "Да! ✅",
      wrongFeedback: wrongFeedback || "Попробуй ещё раз 🙂"
    };
  }

  function colorItem(id, text, emoji, kind, color, x, y) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      kind: kind,
      color: color,
      x: x,
      y: y
    };
  }

  function mapObject(id, text, emoji, kind, color, size, x, y) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      kind: kind,
      color: color || "",
      size: size || "normal",
      x: x,
      y: y
    };
  }

  var meanings = {
    "какой": m("какой", "❓"),
    "какая": m("какая", "❓"),
    "какое": m("какое", "❓"),
    "большой": m("большой", "🐘"),
    "большая": m("большая", "🐘"),
    "большое": m("большое", "🐘"),
    "маленький": m("маленький", "🐭"),
    "маленькая": m("маленькая", "🐭"),
    "маленькое": m("маленькое", "🐭"),
    "красный": m("красный", "🔴"),
    "красная": m("красная", "🔴"),
    "красное": m("красное", "🔴"),
    "синий": m("синий", "🔵"),
    "синяя": m("синяя", "🔵"),
    "синее": m("синее", "🔵"),
    "зелёный": m("зелёный", "🟢"),
    "зелёная": m("зелёная", "🟢"),
    "зелёное": m("зелёное", "🟢"),
    "жёлтый": m("жёлтый", "🟡"),
    "жёлтая": m("жёлтая", "🟡"),
    "жёлтое": m("жёлтое", "🟡"),
    "чёрный": m("чёрный", "⚫"),
    "чёрная": m("чёрная", "⚫"),
    "чёрное": m("чёрное", "⚫"),
    "белый": m("белый", "⚪"),
    "белая": m("белая", "⚪"),
    "белое": m("белое", "⚪"),
    "дом": m("дом", "🏠"),
    "кот": m("кот", "🐱"),
    "собака": m("собака", "🐶"),
    "мяч": m("мяч", "⚽"),
    "книга": m("книга", "📘"),
    "яблоко": m("яблоко", "🍎"),
    "стол": m("стол", "🪑"),
    "стул": m("стул", "🪑"),
    "тут": m("тут", "📍"),
    "там": m("там", "👉"),
    "в": m("в", "📦"),
    "на": m("на", "⬆️"),
    "под": m("под", "⬇️"),
    "рядом": m("рядом", "↔️"),
    "да": m("да", "✅"),
    "нет": m("нет", "❌")
  };

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var sizeOptions = [
    option("big", "большой", "🐘"),
    option("small", "маленький", "🐭")
  ];

  var colorOptions = [
    option("red", "красный", "🔴"),
    option("blue", "синий", "🔵"),
    option("green", "зелёный", "🟢"),
    option("yellow", "жёлтый", "🟡")
  ];

  var dictionary = [
    entry("u7-kakoy", "какой?", "❓", "word", "kakoy.mp3"),
    entry("u7-kakaya", "какая?", "❓", "word", "kakaya.mp3"),
    entry("u7-kakoe", "какое?", "❓", "word", "kakoe.mp3"),
    entry("u7-bolshoy", "большой", "🐘", "word", "bolshoy.mp3"),
    entry("u7-bolshaya", "большая", "🐘", "word", "bolshaya.mp3"),
    entry("u7-bolshoe", "большое", "🐘", "word", "bolshoe.mp3"),
    entry("u7-malenkiy", "маленький", "🐭", "word", "malenkiy.mp3"),
    entry("u7-malenkaya", "маленькая", "🐭", "word", "malenkaya.mp3"),
    entry("u7-malenkoe", "маленькое", "🐭", "word", "malenkoe.mp3"),
    entry("u7-krasnyy", "красный", "🔴", "word", "krasnyy.mp3"),
    entry("u7-krasnaya", "красная", "🔴", "word", "krasnaya.mp3"),
    entry("u7-krasnoe", "красное", "🔴", "word", "krasnoe.mp3"),
    entry("u7-siniy", "синий", "🔵", "word", "siniy.mp3"),
    entry("u7-sinyaya", "синяя", "🔵", "word", "sinyaya.mp3"),
    entry("u7-sinee", "синее", "🔵", "word", "sinee.mp3"),
    entry("u7-zelenyy", "зелёный", "🟢", "word", "zelenyy.mp3"),
    entry("u7-zelenaya", "зелёная", "🟢", "word", "zelenaya.mp3"),
    entry("u7-zelenoe", "зелёное", "🟢", "word", "zelenoe.mp3"),
    entry("u7-zheltyy", "жёлтый", "🟡", "word", "zheltyy.mp3"),
    entry("u7-zheltaya", "жёлтая", "🟡", "word", "zheltaya.mp3"),
    entry("u7-zheltoe", "жёлтое", "🟡", "word", "zheltoe.mp3"),
    entry("u7-chernyy", "чёрный", "⚫", "word", "chernyy.mp3"),
    entry("u7-chernaya", "чёрная", "⚫", "word", "chernaya.mp3"),
    entry("u7-chernoe", "чёрное", "⚫", "word", "chernoe.mp3"),
    entry("u7-belyy", "белый", "⚪", "word", "belyy.mp3"),
    entry("u7-belaya", "белая", "⚪", "word", "belaya.mp3"),
    entry("u7-beloe", "белое", "⚪", "word", "beloe.mp3"),
    entry("u7-dom", "дом", "🏠", "word", "dom.mp3"),
    entry("u7-kot", "кот", "🐱", "word", "kot.mp3"),
    entry("u7-sobaka", "собака", "🐶", "word", "sobaka.mp3"),
    entry("u7-myach", "мяч", "⚽", "word", "myach.mp3"),
    entry("u7-kniga", "книга", "📘", "word", "kniga.mp3"),
    entry("u7-yabloko", "яблоко", "🍎", "word", "yabloko.mp3"),
    entry("u7-stol", "стол", "🪑", "word", "stol.mp3"),
    entry("u7-stul", "стул", "🪑", "word", "stul.mp3")
  ];

  var lesson19Slides = [
    slide("u7-l19-1", "Большой / маленький", ["большой", "маленький"], cards([obj("big-house", "большой дом", "🏠", "house", "blue", "big"), obj("small-house", "маленький дом", "🏠", "house", "blue", "small")]), [line("большой. маленький.", "u7_l19_big_small.mp3")], null, true),
    slide("u7-l19-2", "дом", ["Большой дом.", "Маленький дом."], cards([obj("big-house", "Большой дом.", "🏠", "house", "blue", "big"), obj("small-house", "Маленький дом.", "🏠", "house", "blue", "small")]), [line("Большой дом. Маленький дом.", "u7_l19_dom_big_small.mp3")], null, true),
    slide("u7-l19-3", "кот", ["Большой кот.", "Маленький кот."], cards([obj("big-cat", "Большой кот.", "🐱", "cat", "orange", "big"), obj("small-cat", "Маленький кот.", "🐱", "cat", "orange", "small")]), [line("Большой кот. Маленький кот.", "u7_l19_kot_big_small.mp3")], null, true),
    slide("u7-l19-4", "мяч", ["Большой мяч.", "Маленький мяч."], cards([obj("big-ball", "Большой мяч.", "⚽", "ball", "red", "big"), obj("small-ball", "Маленький мяч.", "⚽", "ball", "red", "small")]), [line("Большой мяч. Маленький мяч.", "u7_l19_myach_big_small.mp3")], null, true),
    slide("u7-l19-5", "Какой дом?", ["Какой дом?"], cards([obj("big-house", "дом", "🏠", "house", "blue", "big")]), [line("Какой дом?", "u7_l19_kakoy_dom.mp3")], [question("u7-l19-q1", "Какой дом?", sizeOptions, "big", "🏠")], true),
    slide("u7-l19-6", "Какой кот?", ["Какой кот?"], cards([obj("small-cat", "кот", "🐱", "cat", "orange", "small")]), [line("Какой кот?", "u7_l19_kakoy_kot.mp3")], [question("u7-l19-q2", "Какой кот?", sizeOptions, "small", "🐱")], true),
    slide("u7-l19-7", "Да или нет", ["Это маленький кот?"], cards([obj("big-cat", "кот", "🐱", "cat", "orange", "big")]), [line("Это маленький кот?", "u7_l19_eto_malenkiy_kot.mp3")], [question("u7-l19-q3", "Это маленький кот?", yesNoOptions, "net", "🐱")], true),
    slide("u7-l19-8", "Да или нет", ["Это большой мяч?"], cards([obj("big-ball", "мяч", "⚽", "ball", "green", "big")]), [line("Это большой мяч?", "u7_l19_eto_bolshoy_myach.mp3")], [question("u7-l19-q4", "Это большой мяч?", yesNoOptions, "da", "⚽")], true),
    slide("u7-l19-9", "книга", ["Большая книга.", "Маленькая книга."], cards([obj("big-book", "Большая книга.", "📘", "book", "blue", "big"), obj("small-book", "Маленькая книга.", "📘", "book", "blue", "small")]), [line("Большая книга. Маленькая книга.", "u7_l19_kniga_big_small.mp3")], null, true),
    slide("u7-l19-10", "стол / стул", ["Большой стол.", "Маленький стул."], cards([obj("big-table", "Большой стол.", "🪑", "table", "yellow", "big"), obj("small-chair", "Маленький стул.", "🪑", "chair", "yellow", "small")]), [line("Большой стол. Маленький стул.", "u7_l19_stol_stul.mp3")], null, true),
    slide("u7-l19-11", "Читай", ["Тут дом.", "Дом большой.", "Там кот.", "Кот маленький."], focus(["📍 🏠🐘", "👉 🐱🐭"]), [line("Тут дом. Дом большой. Там кот. Кот маленький.", "u7_l19_text_1.mp3")], [question("u7-l19-q5", "Какой дом?", [option("big", "большой", "🐘"), option("small", "маленький", "🐭")], "big", "🏠"), question("u7-l19-q6", "Какой кот?", [option("small", "маленький", "🐭"), option("big", "большой", "🐘")], "small", "🐱")], true),
    slide("u7-l19-12", "Отлично!", ["Отлично! ✅", "большой", "маленький", "какой?"], wordList([{ text: "большой", emoji: "🐘" }, { text: "маленький", emoji: "🐭" }, { text: "какой?", emoji: "❓" }]), [line("Отлично! Большой. Маленький. Какой?", "u7_l19_final.mp3")], null, true)
  ];

  var lesson20Slides = [
    slide("u7-l20-1", "Цвета", ["красный", "синий", "зелёный", "жёлтый"], cards([obj("red-ball", "красный", "⚽", "ball", "red", "normal"), obj("blue-ball", "синий", "⚽", "ball", "blue", "normal"), obj("green-ball", "зелёный", "⚽", "ball", "green", "normal"), obj("yellow-ball", "жёлтый", "⚽", "ball", "yellow", "normal")]), [line("красный. синий. зелёный. жёлтый.", "u7_l20_colors_1.mp3")], null, true),
    slide("u7-l20-2", "красный мяч", ["Красный мяч."], cards([obj("red-ball", "Красный мяч.", "⚽", "ball", "red", "normal")]), [line("Красный мяч.", "u7_l20_krasnyy_myach.mp3")], null, true),
    slide("u7-l20-3", "синий мяч", ["Синий мяч."], cards([obj("blue-ball", "Синий мяч.", "⚽", "ball", "blue", "normal")]), [line("Синий мяч.", "u7_l20_siniy_myach.mp3")], null, true),
    slide("u7-l20-4", "зелёный мяч", ["Зелёный мяч."], cards([obj("green-ball", "Зелёный мяч.", "⚽", "ball", "green", "normal")]), [line("Зелёный мяч.", "u7_l20_zelenyy_myach.mp3")], null, true),
    slide("u7-l20-5", "жёлтый мяч", ["Жёлтый мяч."], cards([obj("yellow-ball", "Жёлтый мяч.", "⚽", "ball", "yellow", "normal")]), [line("Жёлтый мяч.", "u7_l20_zheltyy_myach.mp3")], null, true),
    slide("u7-l20-6", "Какой мяч?", ["Какой мяч?"], cards([obj("green-ball", "мяч", "⚽", "ball", "green", "normal")]), [line("Какой мяч?", "u7_l20_kakoy_myach.mp3")], [question("u7-l20-q1", "Какой мяч?", colorOptions, "green", "⚽")], true),
    slide("u7-l20-7", "Где красный мяч?", ["Где красный мяч?"], cards([obj("red-ball", "мяч", "⚽", "ball", "red", "normal"), obj("blue-ball", "мяч", "⚽", "ball", "blue", "normal"), obj("yellow-ball", "мяч", "⚽", "ball", "yellow", "normal")]), [line("Где красный мяч?", "u7_l20_gde_krasnyy_myach.mp3")], [question("u7-l20-q2", "Где красный мяч?", [option("red", "красный мяч", "🔴⚽"), option("blue", "синий мяч", "🔵⚽"), option("yellow", "жёлтый мяч", "🟡⚽")], "red", "🔴⚽")], true),
    slide("u7-l20-8", "книга", ["Красная книга.", "Синяя книга."], cards([obj("red-book", "Красная книга.", "📘", "book", "red", "normal"), obj("blue-book", "Синяя книга.", "📘", "book", "blue", "normal")]), [line("Красная книга. Синяя книга.", "u7_l20_kniga_colors.mp3")], null, true),
    slide("u7-l20-9", "дом", ["Жёлтый дом.", "Зелёный дом."], cards([obj("yellow-house", "Жёлтый дом.", "🏠", "house", "yellow", "normal"), obj("green-house", "Зелёный дом.", "🏠", "house", "green", "normal")]), [line("Жёлтый дом. Зелёный дом.", "u7_l20_dom_colors.mp3")], null, true),
    slide("u7-l20-10", "кот / собака", ["Белый кот.", "Чёрная собака."], cards([obj("white-cat", "Белый кот.", "🐱", "cat", "white", "normal"), obj("black-dog", "Чёрная собака.", "🐶", "dog", "black", "normal")]), [line("Белый кот. Чёрная собака.", "u7_l20_kot_sobaka_colors.mp3")], null, true),
    slide("u7-l20-11", "яблоко", ["Красное яблоко.", "Синее яблоко."], cards([obj("red-apple", "Красное яблоко.", "🍎", "apple", "red", "normal"), obj("blue-apple", "Синее яблоко.", "🍎", "apple", "blue", "normal")]), [line("Красное яблоко. Синее яблоко.", "u7_l20_yabloko_colors.mp3")], null, true),
    slide("u7-l20-12", "Да или нет", ["Это зелёная книга?"], cards([obj("green-book", "книга", "📘", "book", "green", "normal")]), [line("Это зелёная книга?", "u7_l20_eto_zelenaya_kniga.mp3")], [question("u7-l20-q3", "Это зелёная книга?", yesNoOptions, "da", "🟢📘")], true),
    slide("u7-l20-13", "Отлично!", ["Отлично! ✅", "красный", "синий", "зелёный", "жёлтый"], wordList([{ text: "красный", emoji: "🔴" }, { text: "синий", emoji: "🔵" }, { text: "зелёный", emoji: "🟢" }, { text: "жёлтый", emoji: "🟡" }]), [line("Отлично! Цвета.", "u7_l20_final.mp3")], null, true)
  ];

  var lesson21Slides = [
    slide("u7-l21-1", "Какой?", ["Какой?", "Какая?", "Какое?"], wordList([{ text: "Какой?", emoji: "❓" }, { text: "Какая?", emoji: "❓" }, { text: "Какое?", emoji: "❓" }]), [line("Какой? Какая? Какое?", "u7_l21_kakoy_kakaya_kakoe.mp3")], null, true),
    slide("u7-l21-2", "Какой мяч?", ["Какой мяч?"], cards([obj("red-ball", "мяч", "⚽", "ball", "red", "normal")]), [line("Какой мяч?", "u7_l20_kakoy_myach.mp3")], [question("u7-l21-q1", "Какой мяч?", [option("red", "красный", "🔴"), option("blue", "синий", "🔵"), option("small", "маленький", "🐭")], "red", "⚽")], true),
    slide("u7-l21-3", "Какая книга?", ["Какая книга?"], cards([obj("blue-book", "книга", "📘", "book", "blue", "normal")]), [line("Какая книга?", "u7_l21_kakaya_kniga.mp3")], [question("u7-l21-q2", "Какая книга?", [option("blue", "синяя", "🔵"), option("red", "красная", "🔴"), option("big", "большая", "🐘")], "blue", "📘")], true),
    slide("u7-l21-4", "Какой дом?", ["Какой дом?"], cards([obj("big-house", "дом", "🏠", "house", "yellow", "big")]), [line("Какой дом?", "u7_l19_kakoy_dom.mp3")], [question("u7-l21-q3", "Какой дом?", [option("big", "большой", "🐘"), option("small", "маленький", "🐭"), option("blue", "синий", "🔵")], "big", "🏠")], true),
    slide("u7-l21-5", "Где маленький кот?", ["Где маленький кот?"], focus(["🐱🐭", "⬇️🪑"]), [line("Где маленький кот?", "u7_l21_gde_malenkiy_kot.mp3")], [question("u7-l21-q4", "Где маленький кот?", [option("under", "под столом", "⬇️🪑"), option("on", "на столе", "⬆️🪑"), option("near", "рядом", "↔️")], "under", "🐱")], true),
    slide("u7-l21-6", "Где красный мяч?", ["Где красный мяч?"], focus(["🔴⚽", "⬆️🪑"]), [line("Где красный мяч?", "u7_l20_gde_krasnyy_myach.mp3")], [question("u7-l21-q5", "Где красный мяч?", [option("on", "на столе", "⬆️🪑"), option("under", "под столом", "⬇️🪑"), option("box", "в коробке", "📦")], "on", "🔴⚽")], true),
    slide("u7-l21-7", "Где большая книга?", ["Где большая книга?"], focus(["📘🐘", "📦"]), [line("Где большая книга?", "u7_l21_gde_bolshaya_kniga.mp3")], [question("u7-l21-q6", "Где большая книга?", [option("box", "в коробке", "📦"), option("on", "на столе", "⬆️🪑"), option("there", "там", "👉")], "box", "📘")], true),
    slide("u7-l21-8", "Читай", ["Тут дом.", "Дом большой.", "Рядом кот.", "Кот маленький."], focus(["📍🏠🐘", "↔️🐱🐭"]), [line("Тут дом. Дом большой. Рядом кот. Кот маленький.", "u7_l21_text_1.mp3")], [question("u7-l21-q7", "Какой дом?", [option("big", "большой", "🐘"), option("small", "маленький", "🐭")], "big", "🏠")], true),
    slide("u7-l21-9", "Читай", ["На столе красный мяч.", "Под столом синяя книга."], focus(["⬆️🪑 🔴⚽", "⬇️🪑 🔵📘"]), [line("На столе красный мяч. Под столом синяя книга.", "u7_l21_text_2.mp3")], [question("u7-l21-q8", "Какой мяч?", [option("red", "красный", "🔴"), option("blue", "синий", "🔵")], "red", "⚽"), question("u7-l21-q9", "Где книга?", [option("under", "под столом", "⬇️🪑"), option("on", "на столе", "⬆️🪑")], "under", "📘")], true),
    slide("u7-l21-10", "Да или нет", ["Это большой дом?"], cards([obj("big-house", "дом", "🏠", "house", "yellow", "big")]), [line("Это большой дом?", "u7_l21_eto_bolshoy_dom.mp3")], [question("u7-l21-q10", "Это большой дом?", yesNoOptions, "da", "🏠")], true),
    slide("u7-l21-11", "Да или нет", ["Это синяя книга?"], cards([obj("blue-book", "книга", "📘", "book", "blue", "normal")]), [line("Это синяя книга?", "u7_l21_eto_sinyaya_kniga.mp3")], [question("u7-l21-q11", "Это синяя книга?", yesNoOptions, "da", "📘")], true),
    slide("u7-l21-12", "Отлично!", ["Отлично! ✅", "Какой?", "цвет", "большой", "маленький"], wordList([{ text: "какой?", emoji: "❓" }, { text: "красный", emoji: "🔴" }, { text: "большой", emoji: "🐘" }, { text: "маленький", emoji: "🐭" }]), [line("Отлично! Какой? Цвет. Большой. Маленький.", "u7_l21_final.mp3")], null, true)
  ];

  var sizeGame = {
    id: "unit-7-game-size",
    gameSlug: "unit-7-game-size",
    kind: "size",
    icon: "🐘",
    title: "Большой или маленький?",
    finalTitle: "Отлично! Размер понятен! ✅",
    finalText: "большой / маленький",
    finalWords: ["большой дом", "маленький кот", "большой мяч"],
    rounds: [
      gameTask("u7-size-1", "Какой дом?", obj("big-house", "большой дом", "🏠", "house", "blue", "big"), "u7_game_big_house.mp3", sizeOptions, "big", "Да! Большой дом."),
      gameTask("u7-size-2", "Какой дом?", obj("small-house", "маленький дом", "🏠", "house", "blue", "small"), "u7_game_small_house.mp3", sizeOptions, "small", "Да! Маленький дом."),
      gameTask("u7-size-3", "Какой кот?", obj("big-cat", "большой кот", "🐱", "cat", "orange", "big"), "u7_game_big_cat.mp3", sizeOptions, "big", "Да! Большой кот."),
      gameTask("u7-size-4", "Какой кот?", obj("small-cat", "маленький кот", "🐱", "cat", "orange", "small"), "u7_game_small_cat.mp3", sizeOptions, "small", "Да! Маленький кот."),
      gameTask("u7-size-5", "Какой мяч?", obj("big-ball", "большой мяч", "⚽", "ball", "red", "big"), "u7_game_big_ball.mp3", sizeOptions, "big", "Да! Большой мяч."),
      gameTask("u7-size-6", "Какой мяч?", obj("small-ball", "маленький мяч", "⚽", "ball", "green", "small"), "u7_game_small_ball.mp3", sizeOptions, "small", "Да! Маленький мяч."),
      gameTask("u7-size-7", "Какая книга?", obj("big-book", "большая книга", "📘", "book", "blue", "big"), "u7_game_big_book.mp3", [option("big", "большая", "🐘"), option("small", "маленькая", "🐭")], "big", "Да! Большая книга."),
      gameTask("u7-size-8", "Какая книга?", obj("small-book", "маленькая книга", "📘", "book", "blue", "small"), "u7_game_small_book.mp3", [option("big", "большая", "🐘"), option("small", "маленькая", "🐭")], "small", "Да! Маленькая книга."),
      gameTask("u7-size-9", "Какой стол?", obj("big-table", "большой стол", "🪑", "table", "yellow", "big"), "u7_game_big_table.mp3", sizeOptions, "big", "Да! Большой стол."),
      gameTask("u7-size-10", "Какой стул?", obj("small-chair", "маленький стул", "🪑", "chair", "yellow", "small"), "u7_game_small_chair.mp3", sizeOptions, "small", "Да! Маленький стул.")
    ]
  };

  var colorFindGame = {
    id: "unit-7-game-find-color",
    gameSlug: "unit-7-game-find-color",
    kind: "find-color",
    icon: "🎨",
    title: "Найди цвет",
    finalTitle: "Отлично! Цвет найден! ✅",
    finalText: "красный / синий / зелёный",
    finalWords: ["красный мяч", "синяя книга", "жёлтый дом"],
    rounds: [
      { id: "u7-color-1", command: "Найди красный мяч.", audio: audio("u7_find_red_ball.mp3"), correct: "red-ball", items: [colorItem("red-ball", "красный мяч", "⚽", "ball", "red"), colorItem("blue-ball", "синий мяч", "⚽", "ball", "blue"), colorItem("yellow-ball", "жёлтый мяч", "⚽", "ball", "yellow")] },
      { id: "u7-color-2", command: "Найди синий мяч.", audio: audio("u7_find_blue_ball.mp3"), correct: "blue-ball", items: [colorItem("green-ball", "зелёный мяч", "⚽", "ball", "green"), colorItem("blue-ball", "синий мяч", "⚽", "ball", "blue"), colorItem("red-ball", "красный мяч", "⚽", "ball", "red")] },
      { id: "u7-color-3", command: "Найди зелёный мяч.", audio: audio("u7_find_green_ball.mp3"), correct: "green-ball", items: [colorItem("yellow-ball", "жёлтый мяч", "⚽", "ball", "yellow"), colorItem("green-ball", "зелёный мяч", "⚽", "ball", "green"), colorItem("blue-ball", "синий мяч", "⚽", "ball", "blue")] },
      { id: "u7-color-4", command: "Найди жёлтый мяч.", audio: audio("u7_find_yellow_ball.mp3"), correct: "yellow-ball", items: [colorItem("red-ball", "красный мяч", "⚽", "ball", "red"), colorItem("green-ball", "зелёный мяч", "⚽", "ball", "green"), colorItem("yellow-ball", "жёлтый мяч", "⚽", "ball", "yellow")] },
      { id: "u7-color-5", command: "Найди красную книгу.", audio: audio("u7_find_red_book.mp3"), correct: "red-book", items: [colorItem("red-book", "красная книга", "📘", "book", "red"), colorItem("blue-book", "синяя книга", "📘", "book", "blue"), colorItem("green-book", "зелёная книга", "📘", "book", "green")] },
      { id: "u7-color-6", command: "Найди синюю книгу.", audio: audio("u7_find_blue_book.mp3"), correct: "blue-book", items: [colorItem("yellow-book", "жёлтая книга", "📘", "book", "yellow"), colorItem("blue-book", "синяя книга", "📘", "book", "blue"), colorItem("red-book", "красная книга", "📘", "book", "red")] },
      { id: "u7-color-7", command: "Найди белого кота.", audio: audio("u7_find_white_cat.mp3"), correct: "white-cat", items: [colorItem("white-cat", "белый кот", "🐱", "cat", "white"), colorItem("black-cat", "чёрный кот", "🐱", "cat", "black"), colorItem("orange-cat", "кот", "🐱", "cat", "orange")] },
      { id: "u7-color-8", command: "Найди чёрную собаку.", audio: audio("u7_find_black_dog.mp3"), correct: "black-dog", items: [colorItem("white-dog", "белая собака", "🐶", "dog", "white"), colorItem("black-dog", "чёрная собака", "🐶", "dog", "black"), colorItem("yellow-dog", "собака", "🐶", "dog", "yellow")] },
      { id: "u7-color-9", command: "Найди зелёный дом.", audio: audio("u7_find_green_house.mp3"), correct: "green-house", items: [colorItem("green-house", "зелёный дом", "🏠", "house", "green"), colorItem("yellow-house", "жёлтый дом", "🏠", "house", "yellow"), colorItem("blue-house", "синий дом", "🏠", "house", "blue")] },
      { id: "u7-color-10", command: "Найди красное яблоко.", audio: audio("u7_find_red_apple.mp3"), correct: "red-apple", items: [colorItem("red-apple", "красное яблоко", "🍎", "apple", "red"), colorItem("green-apple", "зелёное яблоко", "🍎", "apple", "green"), colorItem("yellow-apple", "жёлтое яблоко", "🍎", "apple", "yellow")] }
    ]
  };

  var phraseGame = {
    id: "unit-7-game-build-phrase",
    gameSlug: "unit-7-game-build-phrase",
    kind: "phrase",
    icon: "🧩",
    title: "Собери фразу",
    finalTitle: "Отлично! Фразы готовы! ✅",
    finalText: "цвет + предмет",
    finalWords: ["красный мяч", "синяя книга", "маленький дом"],
    rounds: [
      gameTask("u7-phrase-1", "Собери фразу.", obj("red-ball", "красный мяч", "⚽", "ball", "red", "normal"), "u7_phrase_red_ball.mp3", [option("red-ball", "красный мяч", "🔴⚽"), option("blue-ball", "синий мяч", "🔵⚽"), option("red-book", "красная книга", "🔴📘"), option("small-house", "маленький дом", "🐭🏠")], "red-ball", "Да! Красный мяч."),
      gameTask("u7-phrase-2", "Собери фразу.", obj("blue-ball", "синий мяч", "⚽", "ball", "blue", "normal"), "u7_phrase_blue_ball.mp3", [option("blue-ball", "синий мяч", "🔵⚽"), option("red-ball", "красный мяч", "🔴⚽"), option("blue-book", "синяя книга", "🔵📘"), option("big-house", "большой дом", "🐘🏠")], "blue-ball", "Да! Синий мяч."),
      gameTask("u7-phrase-3", "Собери фразу.", obj("green-ball", "зелёный мяч", "⚽", "ball", "green", "normal"), "u7_phrase_green_ball.mp3", [option("green-ball", "зелёный мяч", "🟢⚽"), option("yellow-ball", "жёлтый мяч", "🟡⚽"), option("green-book", "зелёная книга", "🟢📘"), option("small-cat", "маленький кот", "🐭🐱")], "green-ball", "Да! Зелёный мяч."),
      gameTask("u7-phrase-4", "Собери фразу.", obj("yellow-ball", "жёлтый мяч", "⚽", "ball", "yellow", "normal"), "u7_phrase_yellow_ball.mp3", [option("yellow-ball", "жёлтый мяч", "🟡⚽"), option("green-ball", "зелёный мяч", "🟢⚽"), option("yellow-house", "жёлтый дом", "🟡🏠"), option("big-ball", "большой мяч", "🐘⚽")], "yellow-ball", "Да! Жёлтый мяч."),
      gameTask("u7-phrase-5", "Собери фразу.", obj("red-book", "красная книга", "📘", "book", "red", "normal"), "u7_phrase_red_book.mp3", [option("red-book", "красная книга", "🔴📘"), option("blue-book", "синяя книга", "🔵📘"), option("red-ball", "красный мяч", "🔴⚽"), option("big-book", "большая книга", "🐘📘")], "red-book", "Да! Красная книга."),
      gameTask("u7-phrase-6", "Собери фразу.", obj("blue-book", "синяя книга", "📘", "book", "blue", "normal"), "u7_phrase_blue_book.mp3", [option("blue-book", "синяя книга", "🔵📘"), option("green-book", "зелёная книга", "🟢📘"), option("blue-ball", "синий мяч", "🔵⚽"), option("small-book", "маленькая книга", "🐭📘")], "blue-book", "Да! Синяя книга."),
      gameTask("u7-phrase-7", "Собери фразу.", obj("big-house", "большой дом", "🏠", "house", "yellow", "big"), "u7_phrase_big_house.mp3", [option("big-house", "большой дом", "🐘🏠"), option("small-house", "маленький дом", "🐭🏠"), option("yellow-house", "жёлтый дом", "🟡🏠"), option("big-ball", "большой мяч", "🐘⚽")], "big-house", "Да! Большой дом."),
      gameTask("u7-phrase-8", "Собери фразу.", obj("small-house", "маленький дом", "🏠", "house", "blue", "small"), "u7_phrase_small_house.mp3", [option("small-house", "маленький дом", "🐭🏠"), option("big-house", "большой дом", "🐘🏠"), option("small-cat", "маленький кот", "🐭🐱"), option("blue-house", "синий дом", "🔵🏠")], "small-house", "Да! Маленький дом."),
      gameTask("u7-phrase-9", "Собери фразу.", obj("white-cat", "белый кот", "🐱", "cat", "white", "normal"), "u7_phrase_white_cat.mp3", [option("white-cat", "белый кот", "⚪🐱"), option("black-cat", "чёрный кот", "⚫🐱"), option("white-dog", "белая собака", "⚪🐶"), option("small-cat", "маленький кот", "🐭🐱")], "white-cat", "Да! Белый кот."),
      gameTask("u7-phrase-10", "Собери фразу.", obj("black-dog", "чёрная собака", "🐶", "dog", "black", "normal"), "u7_phrase_black_dog.mp3", [option("black-dog", "чёрная собака", "⚫🐶"), option("white-dog", "белая собака", "⚪🐶"), option("black-cat", "чёрный кот", "⚫🐱"), option("big-dog", "большая собака", "🐘🐶")], "black-dog", "Да! Чёрная собака."),
      gameTask("u7-phrase-11", "Собери фразу.", obj("green-apple", "зелёное яблоко", "🍎", "apple", "green", "normal"), "u7_phrase_green_apple.mp3", [option("green-apple", "зелёное яблоко", "🟢🍎"), option("red-apple", "красное яблоко", "🔴🍎"), option("green-ball", "зелёный мяч", "🟢⚽"), option("small-apple", "маленькое яблоко", "🐭🍎")], "green-apple", "Да! Зелёное яблоко."),
      gameTask("u7-phrase-12", "Собери фразу.", obj("big-apple", "большое яблоко", "🍎", "apple", "red", "big"), "u7_phrase_big_apple.mp3", [option("big-apple", "большое яблоко", "🐘🍎"), option("small-apple", "маленькое яблоко", "🐭🍎"), option("red-apple", "красное яблоко", "🔴🍎"), option("big-house", "большой дом", "🐘🏠")], "big-apple", "Да! Большое яблоко.")
    ]
  };

  var colorMapGame = {
    id: "unit-7-game-color-map",
    gameSlug: "unit-7-game-color-map",
    kind: "color-map",
    icon: "🗺️",
    title: "Цветная карта",
    finalTitle: "Супер! Цветная карта готова! 🏆",
    finalText: "Иди и найди",
    finalWords: ["красный мяч", "маленький дом", "синяя книга"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      mapObject("big-house", "большой дом", "🏠", "house", "yellow", "big", 4, 0),
      mapObject("small-house", "маленький дом", "🏠", "house", "blue", "small", 1, 1),
      mapObject("red-ball", "красный мяч", "⚽", "ball", "red", "normal", 3, 3),
      mapObject("blue-ball", "синий мяч", "⚽", "ball", "blue", "normal", 0, 1),
      mapObject("green-book", "зелёная книга", "📘", "book", "green", "normal", 2, 0),
      mapObject("yellow-house", "жёлтый дом", "🏠", "house", "yellow", "normal", 4, 4),
      mapObject("small-cat", "маленький кот", "🐱", "cat", "orange", "small", 2, 3),
      mapObject("big-dog", "большая собака", "🐶", "dog", "black", "big", 1, 4)
    ],
    rounds: [
      { id: "u7-map-1", command: "Иди к красному мячу.", audio: audio("u7_map_go_red_ball.mp3"), target: "red-ball", hint: "Нужен красный мяч." },
      { id: "u7-map-2", command: "Иди к маленькому дому.", audio: audio("u7_map_go_small_house.mp3"), target: "small-house", hint: "Нужен маленький дом." },
      { id: "u7-map-3", command: "Иди к зелёной книге.", audio: audio("u7_map_go_green_book.mp3"), target: "green-book", hint: "Нужна зелёная книга." },
      { id: "u7-map-4", command: "Иди к большому дому.", audio: audio("u7_map_go_big_house.mp3"), target: "big-house", hint: "Нужен большой дом." },
      { id: "u7-map-5", command: "Иди к синему мячу.", audio: audio("u7_map_go_blue_ball.mp3"), target: "blue-ball", hint: "Нужен синий мяч." },
      { id: "u7-map-6", command: "Иди к маленькому коту.", audio: audio("u7_map_go_small_cat.mp3"), target: "small-cat", hint: "Нужен маленький кот." },
      { id: "u7-map-7", command: "Иди к большой собаке.", audio: audio("u7_map_go_big_dog.mp3"), target: "big-dog", hint: "Нужна большая собака." },
      { id: "u7-map-8", command: "Иди к жёлтому дому.", audio: audio("u7_map_go_yellow_house.mp3"), target: "yellow-house", hint: "Нужен жёлтый дом." }
    ]
  };

  var changeGame = {
    id: "unit-7-game-what-changed",
    gameSlug: "unit-7-game-what-changed",
    kind: "change",
    icon: "👀",
    title: "Что изменилось?",
    finalTitle: "Отлично! Ты видишь изменения! ✅",
    finalText: "цвет / размер / место",
    finalWords: ["мяч большой", "мяч синий", "кот на столе"],
    rounds: [
      {
        id: "u7-change-1",
        command: "Что изменилось?",
        audio: audio("u7_change_what_changed.mp3"),
        beforeLabel: "было",
        afterLabel: "стало",
        before: [obj("small-ball", "мяч маленький", "⚽", "ball", "red", "small")],
        after: [obj("big-ball", "мяч большой", "⚽", "ball", "red", "big")],
        correct: "ball-big",
        options: [option("ball-big", "мяч большой", "🐘⚽"), option("ball-small", "мяч маленький", "🐭⚽"), option("ball-blue", "мяч синий", "🔵⚽")],
        correctFeedback: "Да! Мяч большой.",
        wrongFeedback: "Нет. Смотри ещё."
      },
      {
        id: "u7-change-2",
        command: "Что изменилось?",
        audio: audio("u7_change_what_changed.mp3"),
        beforeLabel: "было",
        afterLabel: "стало",
        before: [obj("red-ball", "красный мяч", "⚽", "ball", "red", "normal")],
        after: [obj("blue-ball", "синий мяч", "⚽", "ball", "blue", "normal")],
        correct: "ball-blue",
        options: [option("ball-blue", "мяч синий", "🔵⚽"), option("ball-red", "мяч красный", "🔴⚽"), option("book-green", "книга зелёная", "🟢📘")],
        correctFeedback: "Да! Мяч синий.",
        wrongFeedback: "Нет. Смотри ещё."
      },
      {
        id: "u7-change-3",
        command: "Что изменилось?",
        audio: audio("u7_change_what_changed.mp3"),
        beforeLabel: "было",
        afterLabel: "стало",
        before: [obj("blue-book", "синяя книга", "📘", "book", "blue", "normal")],
        after: [obj("green-book", "зелёная книга", "📘", "book", "green", "normal")],
        correct: "book-green",
        options: [option("book-green", "книга зелёная", "🟢📘"), option("book-blue", "книга синяя", "🔵📘"), option("ball-big", "мяч большой", "🐘⚽")],
        correctFeedback: "Да! Книга зелёная.",
        wrongFeedback: "Нет. Смотри ещё."
      },
      {
        id: "u7-change-4",
        command: "Что изменилось?",
        audio: audio("u7_change_what_changed.mp3"),
        beforeLabel: "было",
        afterLabel: "стало",
        before: [obj("cat-under", "кот под столом", "🐱", "cat", "orange", "normal"), obj("table", "стол", "🪑", "table", "yellow", "normal")],
        after: [obj("cat-on", "кот на столе", "🐱", "cat", "orange", "normal"), obj("table", "стол", "🪑", "table", "yellow", "normal")],
        correct: "cat-on",
        options: [option("cat-on", "кот на столе", "⬆️🐱"), option("cat-under", "кот под столом", "⬇️🐱"), option("house-small", "дом маленький", "🐭🏠")],
        correctFeedback: "Да! Кот на столе.",
        wrongFeedback: "Нет. Смотри ещё."
      },
      {
        id: "u7-change-5",
        command: "Что изменилось?",
        audio: audio("u7_change_what_changed.mp3"),
        beforeLabel: "было",
        afterLabel: "стало",
        before: [obj("big-house", "дом большой", "🏠", "house", "yellow", "big")],
        after: [obj("small-house", "дом маленький", "🏠", "house", "yellow", "small")],
        correct: "house-small",
        options: [option("house-small", "дом маленький", "🐭🏠"), option("house-big", "дом большой", "🐘🏠"), option("ball-blue", "мяч синий", "🔵⚽")],
        correctFeedback: "Да! Дом маленький.",
        wrongFeedback: "Нет. Смотри ещё."
      },
      {
        id: "u7-change-6",
        command: "Что изменилось?",
        audio: audio("u7_change_what_changed.mp3"),
        beforeLabel: "было",
        afterLabel: "стало",
        before: [obj("white-cat", "белый кот", "🐱", "cat", "white", "normal")],
        after: [obj("black-cat", "чёрный кот", "🐱", "cat", "black", "normal")],
        correct: "cat-black",
        options: [option("cat-black", "кот чёрный", "⚫🐱"), option("cat-white", "кот белый", "⚪🐱"), option("dog-black", "собака чёрная", "⚫🐶")],
        correctFeedback: "Да! Кот чёрный.",
        wrongFeedback: "Нет. Смотри ещё."
      }
    ]
  };

  var UNIT7_GAMES = {
    sizeGame: sizeGame,
    colorFindGame: colorFindGame,
    phraseGame: phraseGame,
    colorMapGame: colorMapGame,
    changeGame: changeGame
  };

  [colorFindGame, colorMapGame, changeGame].forEach(function (game) {
    game.rounds.forEach(function (round) {
      if (round.command && !round.text) {
        round.text = round.command;
      }
    });
  });

  root.LexiLandUnit7Lesson = {
    id: "level-0-unit-7-descriptions-colors",
    order: 9,
    menuLabel: "Юнит 7",
    title: "Юнит 7: Какой? Большой, маленький, цвета",
    subtitle: "Описание: размер, цвет, какой?",
    level: "Уровень 0",
    coverEmoji: "🎨",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-19-big-small", "Урок 19: Большой / маленький", "🐘", "Урок 19: Большой / маленький", lesson19Slides),
      unit("lesson-20-colors", "Урок 20: Цвета", "🎨", "Урок 20: Цвета", lesson20Slides),
      unit("lesson-21-kakoy", "Урок 21: Какой?", "❓", "Урок 21: Какой?", lesson21Slides),
      {
        id: "unit-7-game-size",
        title: "Игра: Большой или маленький?",
        icon: "🐘",
        stages: [
          {
            type: "unit-7-description-game",
            title: "Игра: Большой или маленький?",
            tasks: [sizeGame]
          }
        ]
      },
      {
        id: "unit-7-game-find-color",
        title: "Игра 2: Найди цвет",
        icon: "🎨",
        stages: [
          {
            type: "unit-7-description-game",
            title: "Игра 2: Найди цвет",
            tasks: [colorFindGame]
          }
        ]
      },
      {
        id: "unit-7-game-build-phrase",
        title: "Игра 3: Собери фразу",
        icon: "🧩",
        stages: [
          {
            type: "unit-7-description-game",
            title: "Игра 3: Собери фразу",
            tasks: [phraseGame]
          }
        ]
      },
      {
        id: "unit-7-game-color-map",
        title: "Игра 4: Цветная карта",
        icon: "🗺️",
        stages: [
          {
            type: "unit-7-description-game",
            title: "Игра 4: Цветная карта",
            tasks: [colorMapGame]
          }
        ]
      },
      {
        id: "unit-7-game-what-changed",
        title: "Игра 5: Что изменилось?",
        icon: "👀",
        stages: [
          {
            type: "unit-7-description-game",
            title: "Игра 5: Что изменилось?",
            tasks: [changeGame]
          }
        ]
      }
    ]
  };

  root.LexiLandUnit7Games = UNIT7_GAMES;
  root.LexiLandUnit7 = root.LexiLandUnit7Lesson;
}(typeof window !== "undefined" ? window : globalThis));
