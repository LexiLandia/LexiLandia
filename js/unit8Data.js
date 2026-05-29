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

  function repeat(emoji, count) {
    var result = [];
    for (var index = 0; index < count; index += 1) {
      result.push(emoji);
    }
    return result.join(" ");
  }

  function group(id, text, emoji, count, item, x, y) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      count: count,
      item: item || "thing",
      x: x,
      y: y
    };
  }

  function countTask(id, questionText, visual, audioFile, options, correct, successText, errorText) {
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

  function basketTask(id, command, audioFile, item, count, successText, errorText) {
    return {
      id: id,
      command: command,
      text: command,
      audio: audio(audioFile),
      item: item,
      count: count,
      correctFeedback: successText,
      wrongFeedback: errorText
    };
  }

  var meanings = {
    "сколько": m("сколько", "🔢"),
    "один": m("один", "1️⃣"),
    "одна": m("одна", "1️⃣"),
    "одно": m("одно", "1️⃣"),
    "два": m("два", "2️⃣"),
    "две": m("две", "2️⃣"),
    "три": m("три", "3️⃣"),
    "четыре": m("четыре", "4️⃣"),
    "пять": m("пять", "5️⃣"),
    "много": m("много", "🔵🔵🔵"),
    "мало": m("мало", "🔵"),
    "мяч": m("мяч", "⚽"),
    "мяча": m("мяча", "⚽"),
    "мячей": m("мячей", "⚽"),
    "книга": m("книга", "📘"),
    "книги": m("книги", "📚"),
    "книг": m("книг", "📚"),
    "яблоко": m("яблоко", "🍎"),
    "яблока": m("яблока", "🍎"),
    "яблок": m("яблок", "🍎"),
    "кот": m("кот", "🐱"),
    "котов": m("котов", "🐱"),
    "собака": m("собака", "🐶"),
    "собак": m("собак", "🐶"),
    "дом": m("дом", "🏠"),
    "дома": m("дома", "🏠"),
    "домов": m("домов", "🏠"),
    "стол": m("стол", "🪑"),
    "столе": m("столе", "🪑"),
    "рядом": m("рядом", "↔️"),
    "под": m("под", "⬇️"),
    "на": m("на", "⬆️"),
    "положи": m("положи", "🧺"),
    "дай": m("дай", "🤲"),
    "пожалуйста": m("пожалуйста", "🙏"),
    "на.": m("на", "🤲➡️"),
    "спасибо": m("спасибо", "😊")
  };

  var dictionary = [
    entry("u8-skolko", "сколько?", "🔢", "word", "skolko.mp3"),
    entry("u8-odin", "один", "1️⃣", "word", "odin.mp3"),
    entry("u8-odna", "одна", "1️⃣", "word", "odna.mp3"),
    entry("u8-odno", "одно", "1️⃣", "word", "odno.mp3"),
    entry("u8-dva", "два", "2️⃣", "word", "dva.mp3"),
    entry("u8-dve", "две", "2️⃣", "word", "dve.mp3"),
    entry("u8-tri", "три", "3️⃣", "word", "tri.mp3"),
    entry("u8-chetyre", "четыре", "4️⃣", "word", "chetyre.mp3"),
    entry("u8-pyat", "пять", "5️⃣", "word", "pyat.mp3"),
    entry("u8-mnogo", "много", "🔵🔵🔵", "word", "mnogo.mp3"),
    entry("u8-malo", "мало", "🔵", "word", "malo.mp3"),
    entry("u8-myachey", "мячей", "⚽", "word", "myachey.mp3"),
    entry("u8-knig", "книг", "📚", "word", "knig.mp3"),
    entry("u8-yablok", "яблок", "🍎", "word", "yablok.mp3"),
    entry("u8-domov", "домов", "🏠", "word", "domov.mp3"),
    entry("u8-kotov", "котов", "🐱", "word", "kotov.mp3"),
    entry("u8-sobak", "собак", "🐶", "word", "sobak.mp3")
  ];

  var numberOptions = [
    option("one", "один", "1️⃣"),
    option("two", "два", "2️⃣"),
    option("three", "три", "3️⃣"),
    option("four", "четыре", "4️⃣"),
    option("five", "пять", "5️⃣")
  ];

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var oneTwoThreeOptions = [
    option("one-ball", "один мяч", "1️⃣⚽"),
    option("two-balls", "два мяча", "2️⃣⚽"),
    option("three-balls", "три мяча", "3️⃣⚽")
  ];

  var bookOptions = [
    option("one-book", "одна книга", "1️⃣📘"),
    option("two-books", "две книги", "2️⃣📚"),
    option("three-books", "три книги", "3️⃣📚")
  ];

  var appleOptions = [
    option("one-apple", "одно яблоко", "1️⃣🍎"),
    option("two-apples", "два яблока", "2️⃣🍎"),
    option("three-apples", "три яблока", "3️⃣🍎")
  ];

  var manyFewOptions = [
    option("many", "много", "🔵🔵🔵"),
    option("few", "мало", "🔵")
  ];

  var lesson22Slides = [
    slide("u8-l22-1", "Один, два, три", ["один", "два", "три"], focus([repeat("⚽", 1), repeat("⚽", 2), repeat("⚽", 3)]), [line("Один. Два. Три.", "u8_l22_odin_dva_tri.mp3")], null, true),
    slide("u8-l22-2", "один мяч", ["Один мяч."], focus([repeat("⚽", 1)]), [line("Один мяч.", "u8_l22_odin_myach.mp3")], null, true),
    slide("u8-l22-3", "два мяча", ["Два мяча."], focus([repeat("⚽", 2)]), [line("Два мяча.", "u8_l22_dva_myacha.mp3")], null, true),
    slide("u8-l22-4", "три мяча", ["Три мяча."], focus([repeat("⚽", 3)]), [line("Три мяча.", "u8_l22_tri_myacha.mp3")], null, true),
    slide("u8-l22-5", "книга", ["Одна книга.", "Две книги.", "Три книги."], focus([repeat("📘", 1), repeat("📘", 2), repeat("📘", 3)]), [line("Одна книга. Две книги. Три книги.", "u8_l22_knigi_1_2_3.mp3")], null, true),
    slide("u8-l22-6", "яблоко", ["Одно яблоко.", "Два яблока.", "Три яблока."], focus([repeat("🍎", 1), repeat("🍎", 2), repeat("🍎", 3)]), [line("Одно яблоко. Два яблока. Три яблока.", "u8_l22_yabloki_1_2_3.mp3")], null, true),
    slide("u8-l22-7", "Сколько?", ["Сколько мячей?"], focus([repeat("⚽", 1)]), [line("Сколько мячей?", "u8_l22_skolko_myachey.mp3")], [question("u8-l22-q1", "Сколько мячей?", oneTwoThreeOptions, "one-ball", "⚽")], true),
    slide("u8-l22-8", "Сколько?", ["Сколько книг?"], focus([repeat("📘", 2)]), [line("Сколько книг?", "u8_l22_skolko_knig.mp3")], [question("u8-l22-q2", "Сколько книг?", bookOptions, "two-books", "📘 📘")], true),
    slide("u8-l22-9", "Сколько?", ["Сколько яблок?"], focus([repeat("🍎", 3)]), [line("Сколько яблок?", "u8_l22_skolko_yablok.mp3")], [question("u8-l22-q3", "Сколько яблок?", appleOptions, "three-apples", "🍎 🍎 🍎")], true),
    slide("u8-l22-10", "Да или нет", ["Это два мяча?"], focus([repeat("⚽", 3)]), [line("Это два мяча?", "u8_l22_eto_dva_myacha.mp3")], [question("u8-l22-q4", "Это два мяча?", yesNoOptions, "net", "⚽ ⚽ ⚽")], true),
    slide("u8-l22-11", "Да или нет", ["Это одна книга?"], focus([repeat("📘", 1)]), [line("Это одна книга?", "u8_l22_eto_odna_kniga.mp3")], [question("u8-l22-q5", "Это одна книга?", yesNoOptions, "da", "📘")], true),
    slide("u8-l22-12", "Читай", ["Тут мяч.", "Один мяч.", "Там книги.", "Две книги.", "На столе три яблока."], focus(["📍 ⚽", "👉 📘 📘", "⬆️ 🪑 🍎 🍎 🍎"]), [line("Тут мяч. Один мяч. Там книги. Две книги. На столе три яблока.", "u8_l22_text_1.mp3")], [question("u8-l22-q6", "Сколько мячей?", [option("one", "один", "1️⃣"), option("two", "два", "2️⃣"), option("three", "три", "3️⃣")], "one", "⚽"), question("u8-l22-q7", "Сколько книг?", [option("two", "две", "2️⃣"), option("one", "одна", "1️⃣"), option("three", "три", "3️⃣")], "two", "📘 📘"), question("u8-l22-q8", "Сколько яблок?", [option("three", "три", "3️⃣"), option("two", "два", "2️⃣"), option("one", "одно", "1️⃣")], "three", "🍎 🍎 🍎")], true),
    slide("u8-l22-13", "Отлично!", ["Отлично! ✅", "один", "два", "три"], wordList([{ text: "один", emoji: "1️⃣" }, { text: "два", emoji: "2️⃣" }, { text: "три", emoji: "3️⃣" }]), [line("Отлично! Один. Два. Три.", "u8_l22_final.mp3")], null, true)
  ];

  var lesson23Slides = [
    slide("u8-l23-1", "Сколько?", ["Сколько?"], focus(["🔢", repeat("⚽", 2), repeat("📘", 3), repeat("🍎", 5)]), [line("Сколько?", "u8_l23_skolko.mp3")], null, true),
    slide("u8-l23-2", "Сколько мячей?", ["Сколько мячей?"], focus([repeat("⚽", 2)]), [line("Сколько мячей?", "u8_l22_skolko_myachey.mp3")], [question("u8-l23-q1", "Сколько мячей?", numberOptions, "two", "⚽ ⚽")], true),
    slide("u8-l23-3", "Сколько книг?", ["Сколько книг?"], focus([repeat("📘", 3)]), [line("Сколько книг?", "u8_l22_skolko_knig.mp3")], [question("u8-l23-q2", "Сколько книг?", numberOptions, "three", "📘 📘 📘")], true),
    slide("u8-l23-4", "Сколько котов?", ["Сколько котов?"], focus([repeat("🐱", 1)]), [line("Сколько котов?", "u8_l23_skolko_kotov.mp3")], [question("u8-l23-q3", "Сколько котов?", numberOptions, "one", "🐱")], true),
    slide("u8-l23-5", "Сколько собак?", ["Сколько собак?"], focus([repeat("🐶", 2)]), [line("Сколько собак?", "u8_l23_skolko_sobak.mp3")], [question("u8-l23-q4", "Сколько собак?", numberOptions, "two", "🐶 🐶")], true),
    slide("u8-l23-6", "Сколько яблок?", ["Сколько яблок?"], focus([repeat("🍎", 4)]), [line("Сколько яблок?", "u8_l22_skolko_yablok.mp3")], [question("u8-l23-q5", "Сколько яблок?", numberOptions, "four", "🍎 🍎 🍎 🍎")], true),
    slide("u8-l23-7", "Сколько домов?", ["Сколько домов?"], focus([repeat("🏠", 5)]), [line("Сколько домов?", "u8_l23_skolko_domov.mp3")], [question("u8-l23-q6", "Сколько домов?", numberOptions, "five", "🏠 🏠 🏠 🏠 🏠")], true),
    slide("u8-l23-8", "Да или нет", ["Тут три книги?"], focus([repeat("📘", 3)]), [line("Тут три книги?", "u8_l23_tut_tri_knigi.mp3")], [question("u8-l23-q7", "Тут три книги?", yesNoOptions, "da", "📘 📘 📘")], true),
    slide("u8-l23-9", "Да или нет", ["Тут два кота?"], focus([repeat("🐱", 1)]), [line("Тут два кота?", "u8_l23_tut_dva_kota.mp3")], [question("u8-l23-q8", "Тут два кота?", yesNoOptions, "net", "🐱")], true),
    slide("u8-l23-10", "Читай", ["Тут стол.", "На столе три яблока.", "Рядом две книги.", "Под столом один мяч."], focus(["🪑 🍎 🍎 🍎", "↔️ 📘 📘", "⬇️ ⚽"]), [line("Тут стол. На столе три яблока. Рядом две книги. Под столом один мяч.", "u8_l23_text_1.mp3")], [question("u8-l23-q9", "Сколько яблок?", numberOptions, "three", "🍎 🍎 🍎"), question("u8-l23-q10", "Сколько книг?", numberOptions, "two", "📘 📘"), question("u8-l23-q11", "Где мяч?", [option("under", "под столом", "⬇️🪑"), option("on", "на столе", "⬆️🪑"), option("near", "рядом", "↔️")], "under", "⚽")], true),
    slide("u8-l23-11", "Отлично!", ["Отлично! ✅", "сколько?", "четыре", "пять"], wordList([{ text: "сколько?", emoji: "🔢" }, { text: "четыре", emoji: "4️⃣" }, { text: "пять", emoji: "5️⃣" }]), [line("Отлично! Сколько? Четыре. Пять.", "u8_l23_final.mp3")], null, true)
  ];

  var lesson24Slides = [
    slide("u8-l24-1", "Много / мало", ["мало", "много"], focus([repeat("⚽", 1), repeat("⚽", 5)]), [line("Мало. Много.", "u8_l24_malo_mnogo.mp3")], null, true),
    slide("u8-l24-2", "мало мячей", ["Мало мячей."], focus([repeat("⚽", 1)]), [line("Мало мячей.", "u8_l24_malo_myachey.mp3")], null, true),
    slide("u8-l24-3", "много мячей", ["Много мячей."], focus([repeat("⚽", 6)]), [line("Много мячей.", "u8_l24_mnogo_myachey.mp3")], null, true),
    slide("u8-l24-4", "книги", ["Мало книг.", "Много книг."], focus([repeat("📘", 1), repeat("📘", 5)]), [line("Мало книг. Много книг.", "u8_l24_knigi_malo_mnogo.mp3")], null, true),
    slide("u8-l24-5", "яблоки", ["Мало яблок.", "Много яблок."], focus([repeat("🍎", 1), repeat("🍎", 6)]), [line("Мало яблок. Много яблок.", "u8_l24_yabloki_malo_mnogo.mp3")], null, true),
    slide("u8-l24-6", "коты / собаки", ["Много котов.", "Мало собак."], focus([repeat("🐱", 5), repeat("🐶", 1)]), [line("Много котов. Мало собак.", "u8_l24_koty_sobaki.mp3")], null, true),
    slide("u8-l24-7", "Сколько?", ["Много или мало?"], focus([repeat("⚽", 6)]), [line("Много или мало?", "u8_l24_mnogo_ili_malo.mp3")], [question("u8-l24-q1", "Много или мало?", manyFewOptions, "many", "⚽ ⚽ ⚽ ⚽ ⚽ ⚽")], true),
    slide("u8-l24-8", "Да или нет", ["Тут мало книг?"], focus([repeat("📘", 5)]), [line("Тут мало книг?", "u8_l24_tut_malo_knig.mp3")], [question("u8-l24-q2", "Тут мало книг?", yesNoOptions, "net", "📘 📘 📘 📘 📘")], true),
    slide("u8-l24-9", "Читай", ["Тут много яблок.", "Там мало книг.", "Рядом один кот.", "Под столом два мяча."], focus([repeat("🍎", 6), repeat("📘", 1), "↔️ 🐱", "⬇️ ⚽ ⚽"]), [line("Тут много яблок. Там мало книг. Рядом один кот. Под столом два мяча.", "u8_l24_text_1.mp3")], [question("u8-l24-q3", "Сколько яблок?", [option("many", "много", "🔵🔵🔵"), option("few", "мало", "🔵")], "many", "🍎 🍎 🍎 🍎 🍎 🍎"), question("u8-l24-q4", "Сколько книг?", [option("few", "мало", "🔵"), option("many", "много", "🔵🔵🔵")], "few", "📘")], true),
    slide("u8-l24-10", "Отлично!", ["Отлично! ✅", "много", "мало"], wordList([{ text: "много", emoji: "🔵🔵🔵" }, { text: "мало", emoji: "🔵" }]), [line("Отлично! Много. Мало.", "u8_l24_final.mp3")], null, true)
  ];

  var countGame = {
    id: "unit-8-game-count",
    gameSlug: "unit-8-game-count",
    kind: "count-choice",
    icon: "🔢",
    title: "Сколько здесь?",
    finalTitle: "Отлично! Ты считаешь! ✅",
    finalText: "один / два / три / четыре / пять",
    finalWords: ["один мяч", "две книги", "пять яблок"],
    rounds: [
      countTask("u8-count-1", "Сколько мячей?", group("one-ball", "один мяч", "⚽", 1, "ball"), "u8_count_one_ball.mp3", numberOptions, "one", "Да! Один мяч.", "Нет. Тут один мяч."),
      countTask("u8-count-2", "Сколько мячей?", group("two-balls", "два мяча", "⚽", 2, "ball"), "u8_count_two_balls.mp3", numberOptions, "two", "Да! Два мяча.", "Нет. Тут два мяча."),
      countTask("u8-count-3", "Сколько мячей?", group("three-balls", "три мяча", "⚽", 3, "ball"), "u8_count_three_balls.mp3", numberOptions, "three", "Да! Три мяча.", "Нет. Тут три мяча."),
      countTask("u8-count-4", "Сколько книг?", group("one-book", "одна книга", "📘", 1, "book"), "u8_count_one_book.mp3", numberOptions, "one", "Да! Одна книга.", "Нет. Тут одна книга."),
      countTask("u8-count-5", "Сколько книг?", group("two-books", "две книги", "📘", 2, "book"), "u8_count_two_books.mp3", numberOptions, "two", "Да! Две книги.", "Нет. Тут две книги."),
      countTask("u8-count-6", "Сколько книг?", group("three-books", "три книги", "📘", 3, "book"), "u8_count_three_books.mp3", numberOptions, "three", "Да! Три книги.", "Нет. Тут три книги."),
      countTask("u8-count-7", "Сколько яблок?", group("one-apple", "одно яблоко", "🍎", 1, "apple"), "u8_count_one_apple.mp3", numberOptions, "one", "Да! Одно яблоко.", "Нет. Тут одно яблоко."),
      countTask("u8-count-8", "Сколько яблок?", group("two-apples", "два яблока", "🍎", 2, "apple"), "u8_count_two_apples.mp3", numberOptions, "two", "Да! Два яблока.", "Нет. Тут два яблока."),
      countTask("u8-count-9", "Сколько яблок?", group("four-apples", "четыре яблока", "🍎", 4, "apple"), "u8_count_four_apples.mp3", numberOptions, "four", "Да! Четыре яблока.", "Нет. Тут четыре яблока."),
      countTask("u8-count-10", "Сколько яблок?", group("five-apples", "пять яблок", "🍎", 5, "apple"), "u8_count_five_apples.mp3", numberOptions, "five", "Да! Пять яблок.", "Нет. Тут пять яблок.")
    ]
  };

  var findCountGame = {
    id: "unit-8-game-find-count",
    gameSlug: "unit-8-game-find-count",
    kind: "find-count",
    icon: "🔎",
    title: "Найди количество",
    finalTitle: "Отлично! Количество найдено! ✅",
    finalText: "найди",
    finalWords: ["один мяч", "три книги", "пять яблок"],
    rounds: [
      commandTask("u8-find-1", "Найди один мяч.", "u8_find_one_ball.mp3", [group("one-ball", "один мяч", "⚽", 1, "ball"), group("two-balls", "два мяча", "⚽", 2, "ball"), group("three-balls", "три мяча", "⚽", 3, "ball")], "one-ball", "Да! Один мяч.", "Нет. Нужен один мяч."),
      commandTask("u8-find-2", "Найди два мяча.", "u8_find_two_balls.mp3", [group("one-ball", "один мяч", "⚽", 1, "ball"), group("two-balls", "два мяча", "⚽", 2, "ball"), group("three-balls", "три мяча", "⚽", 3, "ball")], "two-balls", "Да! Два мяча.", "Нет. Нужны два мяча."),
      commandTask("u8-find-3", "Найди три мяча.", "u8_find_three_balls.mp3", [group("two-balls", "два мяча", "⚽", 2, "ball"), group("three-balls", "три мяча", "⚽", 3, "ball"), group("one-ball", "один мяч", "⚽", 1, "ball")], "three-balls", "Да! Три мяча.", "Нет. Нужны три мяча."),
      commandTask("u8-find-4", "Найди одну книгу.", "u8_find_one_book.mp3", [group("one-book", "одна книга", "📘", 1, "book"), group("two-books", "две книги", "📘", 2, "book"), group("three-books", "три книги", "📘", 3, "book")], "one-book", "Да! Одна книга.", "Нет. Нужна одна книга."),
      commandTask("u8-find-5", "Найди две книги.", "u8_find_two_books.mp3", [group("three-books", "три книги", "📘", 3, "book"), group("two-books", "две книги", "📘", 2, "book"), group("one-book", "одна книга", "📘", 1, "book")], "two-books", "Да! Две книги.", "Нет. Нужны две книги."),
      commandTask("u8-find-6", "Найди три книги.", "u8_find_three_books.mp3", [group("two-books", "две книги", "📘", 2, "book"), group("three-books", "три книги", "📘", 3, "book"), group("one-book", "одна книга", "📘", 1, "book")], "three-books", "Да! Три книги.", "Нет. Нужны три книги."),
      commandTask("u8-find-7", "Найди одно яблоко.", "u8_find_one_apple.mp3", [group("one-apple", "одно яблоко", "🍎", 1, "apple"), group("two-apples", "два яблока", "🍎", 2, "apple"), group("five-apples", "пять яблок", "🍎", 5, "apple")], "one-apple", "Да! Одно яблоко.", "Нет. Нужно одно яблоко."),
      commandTask("u8-find-8", "Найди два яблока.", "u8_find_two_apples.mp3", [group("three-apples", "три яблока", "🍎", 3, "apple"), group("two-apples", "два яблока", "🍎", 2, "apple"), group("one-apple", "одно яблоко", "🍎", 1, "apple")], "two-apples", "Да! Два яблока.", "Нет. Нужны два яблока."),
      commandTask("u8-find-9", "Найди четыре яблока.", "u8_find_four_apples.mp3", [group("four-apples", "четыре яблока", "🍎", 4, "apple"), group("two-apples", "два яблока", "🍎", 2, "apple"), group("five-apples", "пять яблок", "🍎", 5, "apple")], "four-apples", "Да! Четыре яблока.", "Нет. Нужны четыре яблока."),
      commandTask("u8-find-10", "Найди пять яблок.", "u8_find_five_apples.mp3", [group("three-apples", "три яблока", "🍎", 3, "apple"), group("five-apples", "пять яблок", "🍎", 5, "apple"), group("four-apples", "четыре яблока", "🍎", 4, "apple")], "five-apples", "Да! Пять яблок.", "Нет. Нужно пять яблок.")
    ]
  };

  var basketGame = {
    id: "unit-8-game-basket",
    gameSlug: "unit-8-game-basket",
    kind: "basket",
    icon: "🧺",
    title: "Корзина",
    finalTitle: "Отлично! Корзина готова! ✅",
    finalText: "положи",
    finalWords: ["два яблока", "три мяча", "две книги"],
    items: [
      { id: "apple", text: "яблоко", emoji: "🍎" },
      { id: "ball", text: "мяч", emoji: "⚽" },
      { id: "book", text: "книга", emoji: "📘" }
    ],
    rounds: [
      basketTask("u8-basket-1", "Положи одно яблоко.", "u8_basket_one_apple.mp3", "apple", 1, "Да! Одно яблоко.", "Нет. Нужно одно яблоко."),
      basketTask("u8-basket-2", "Положи два яблока.", "u8_basket_two_apples.mp3", "apple", 2, "Да! Два яблока.", "Нет. Нужны два яблока."),
      basketTask("u8-basket-3", "Положи три яблока.", "u8_basket_three_apples.mp3", "apple", 3, "Да! Три яблока.", "Нет. Нужны три яблока."),
      basketTask("u8-basket-4", "Положи один мяч.", "u8_basket_one_ball.mp3", "ball", 1, "Да! Один мяч.", "Нет. Нужен один мяч."),
      basketTask("u8-basket-5", "Положи два мяча.", "u8_basket_two_balls.mp3", "ball", 2, "Да! Два мяча.", "Нет. Нужны два мяча."),
      basketTask("u8-basket-6", "Положи три мяча.", "u8_basket_three_balls.mp3", "ball", 3, "Да! Три мяча.", "Нет. Нужны три мяча."),
      basketTask("u8-basket-7", "Положи одну книгу.", "u8_basket_one_book.mp3", "book", 1, "Да! Одна книга.", "Нет. Нужна одна книга."),
      basketTask("u8-basket-8", "Положи две книги.", "u8_basket_two_books.mp3", "book", 2, "Да! Две книги.", "Нет. Нужны две книги."),
      basketTask("u8-basket-9", "Положи три книги.", "u8_basket_three_books.mp3", "book", 3, "Да! Три книги.", "Нет. Нужны три книги.")
    ]
  };

  var shopCountGame = {
    id: "unit-8-game-shop-count",
    gameSlug: "unit-8-game-shop-count",
    kind: "shop-count",
    icon: "🏪",
    title: "Магазин 2",
    finalTitle: "Отлично! Магазин готов! 🏪",
    finalText: "Дай..., пожалуйста.",
    finalWords: ["Дай два яблока", "На", "Спасибо"],
    rounds: [
      commandTask("u8-shop-1", "Дай одно яблоко, пожалуйста.", "u8_shop_one_apple.mp3", [group("one-apple", "одно яблоко", "🍎", 1, "apple"), group("two-apples", "два яблока", "🍎", 2, "apple"), group("three-apples", "три яблока", "🍎", 3, "apple")], "one-apple", "На. Спасибо. Да! Одно яблоко.", "Нет. Нужно одно яблоко."),
      commandTask("u8-shop-2", "Дай два яблока, пожалуйста.", "u8_shop_two_apples.mp3", [group("one-apple", "одно яблоко", "🍎", 1, "apple"), group("two-apples", "два яблока", "🍎", 2, "apple"), group("three-apples", "три яблока", "🍎", 3, "apple")], "two-apples", "На. Спасибо. Да! Два яблока.", "Нет. Нужны два яблока."),
      commandTask("u8-shop-3", "Дай три яблока, пожалуйста.", "u8_shop_three_apples.mp3", [group("three-apples", "три яблока", "🍎", 3, "apple"), group("two-apples", "два яблока", "🍎", 2, "apple"), group("one-apple", "одно яблоко", "🍎", 1, "apple")], "three-apples", "На. Спасибо. Да! Три яблока.", "Нет. Нужны три яблока."),
      commandTask("u8-shop-4", "Дай один мяч, пожалуйста.", "u8_shop_one_ball.mp3", [group("one-ball", "один мяч", "⚽", 1, "ball"), group("two-balls", "два мяча", "⚽", 2, "ball"), group("three-balls", "три мяча", "⚽", 3, "ball")], "one-ball", "На. Спасибо. Да! Один мяч.", "Нет. Нужен один мяч."),
      commandTask("u8-shop-5", "Дай два мяча, пожалуйста.", "u8_shop_two_balls.mp3", [group("three-balls", "три мяча", "⚽", 3, "ball"), group("two-balls", "два мяча", "⚽", 2, "ball"), group("one-ball", "один мяч", "⚽", 1, "ball")], "two-balls", "На. Спасибо. Да! Два мяча.", "Нет. Нужны два мяча."),
      commandTask("u8-shop-6", "Дай три мяча, пожалуйста.", "u8_shop_three_balls.mp3", [group("two-balls", "два мяча", "⚽", 2, "ball"), group("three-balls", "три мяча", "⚽", 3, "ball"), group("one-ball", "один мяч", "⚽", 1, "ball")], "three-balls", "На. Спасибо. Да! Три мяча.", "Нет. Нужны три мяча."),
      commandTask("u8-shop-7", "Дай одну книгу, пожалуйста.", "u8_shop_one_book.mp3", [group("one-book", "одна книга", "📘", 1, "book"), group("two-books", "две книги", "📘", 2, "book"), group("three-books", "три книги", "📘", 3, "book")], "one-book", "На. Спасибо. Да! Одна книга.", "Нет. Нужна одна книга."),
      commandTask("u8-shop-8", "Дай две книги, пожалуйста.", "u8_shop_two_books.mp3", [group("three-books", "три книги", "📘", 3, "book"), group("two-books", "две книги", "📘", 2, "book"), group("one-book", "одна книга", "📘", 1, "book")], "two-books", "На. Спасибо. Да! Две книги.", "Нет. Нужны две книги."),
      commandTask("u8-shop-9", "Дай три книги, пожалуйста.", "u8_shop_three_books.mp3", [group("two-books", "две книги", "📘", 2, "book"), group("three-books", "три книги", "📘", 3, "book"), group("one-book", "одна книга", "📘", 1, "book")], "three-books", "На. Спасибо. Да! Три книги.", "Нет. Нужны три книги.")
    ]
  };

  var countMapGame = {
    id: "unit-8-game-count-map",
    gameSlug: "unit-8-game-count-map",
    kind: "count-map",
    icon: "🗺️",
    title: "Карта количества",
    finalTitle: "Супер! Карта количества готова! 🏆",
    finalText: "иди и считай",
    finalWords: ["два мяча", "три книги", "два дома"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("one-red-ball", "один красный мяч", "🔴⚽", 1, "ball", 2, 4),
      group("two-red-balls", "два красных мяча", "🔴⚽", 2, "ball", 4, 2),
      group("three-blue-books", "три синие книги", "🔵📘", 3, "book", 1, 0),
      group("one-apple", "одно яблоко", "🍎", 1, "apple", 0, 2),
      group("two-apples", "два яблока", "🍎", 2, "apple", 3, 0),
      group("three-apples", "три яблока", "🍎", 3, "apple", 4, 4),
      group("one-big-house", "один большой дом", "🏠", 1, "house", 2, 1),
      group("two-small-houses", "два маленьких дома", "🏠", 2, "house", 1, 3)
    ],
    rounds: [
      { id: "u8-map-1", command: "Иди к двум мячам.", text: "Иди к двум мячам.", audio: audio("u8_map_go_two_balls.mp3"), target: "two-red-balls", hint: "Нужны два мяча.", correctFeedback: "Да! Два мяча." },
      { id: "u8-map-2", command: "Иди к трём книгам.", text: "Иди к трём книгам.", audio: audio("u8_map_go_three_books.mp3"), target: "three-blue-books", hint: "Нужны три книги.", correctFeedback: "Да! Три книги." },
      { id: "u8-map-3", command: "Иди к одному яблоку.", text: "Иди к одному яблоку.", audio: audio("u8_map_go_one_apple.mp3"), target: "one-apple", hint: "Нужно одно яблоко.", correctFeedback: "Да! Одно яблоко." },
      { id: "u8-map-4", command: "Иди к двум маленьким домам.", text: "Иди к двум маленьким домам.", audio: audio("u8_map_go_two_small_houses.mp3"), target: "two-small-houses", hint: "Нужны два маленьких дома.", correctFeedback: "Да! Два маленьких дома." },
      { id: "u8-map-5", command: "Иди к двум яблокам.", text: "Иди к двум яблокам.", audio: audio("u8_map_go_two_apples.mp3"), target: "two-apples", hint: "Нужны два яблока.", correctFeedback: "Да! Два яблока." },
      { id: "u8-map-6", command: "Иди к трём яблокам.", text: "Иди к трём яблокам.", audio: audio("u8_map_go_three_apples.mp3"), target: "three-apples", hint: "Нужны три яблока.", correctFeedback: "Да! Три яблока." },
      { id: "u8-map-7", command: "Иди к одному дому.", text: "Иди к одному дому.", audio: audio("u8_map_go_one_house.mp3"), target: "one-big-house", hint: "Нужен один дом.", correctFeedback: "Да! Один дом." }
    ]
  };

  var manyFewGame = {
    id: "unit-8-game-many-few",
    gameSlug: "unit-8-game-many-few",
    kind: "many-few",
    icon: "🔵",
    title: "Много или мало",
    finalTitle: "Отлично! Много и мало понятно! ✅",
    finalText: "много / мало",
    finalWords: ["много мячей", "мало книг", "много яблок"],
    rounds: [
      countTask("u8-many-1", "Много или мало?", group("few-balls", "мало мячей", "⚽", 1, "ball"), "u8_many_few_balls.mp3", manyFewOptions, "few", "Да! Мало мячей.", "Нет. Тут мало мячей."),
      countTask("u8-many-2", "Много или мало?", group("many-balls", "много мячей", "⚽", 6, "ball"), "u8_many_many_balls.mp3", manyFewOptions, "many", "Да! Много мячей.", "Нет. Тут много мячей."),
      countTask("u8-many-3", "Много или мало?", group("few-books", "мало книг", "📘", 1, "book"), "u8_many_few_books.mp3", manyFewOptions, "few", "Да! Мало книг.", "Нет. Тут мало книг."),
      countTask("u8-many-4", "Много или мало?", group("many-books", "много книг", "📘", 5, "book"), "u8_many_many_books.mp3", manyFewOptions, "many", "Да! Много книг.", "Нет. Тут много книг."),
      countTask("u8-many-5", "Много или мало?", group("few-apples", "мало яблок", "🍎", 1, "apple"), "u8_many_few_apples.mp3", manyFewOptions, "few", "Да! Мало яблок.", "Нет. Тут мало яблок."),
      countTask("u8-many-6", "Много или мало?", group("many-apples", "много яблок", "🍎", 6, "apple"), "u8_many_many_apples.mp3", manyFewOptions, "many", "Да! Много яблок.", "Нет. Тут много яблок."),
      countTask("u8-many-7", "Много или мало?", group("few-cats", "мало котов", "🐱", 1, "cat"), "u8_many_few_cats.mp3", manyFewOptions, "few", "Да! Мало котов.", "Нет. Тут мало котов."),
      countTask("u8-many-8", "Много или мало?", group("many-dogs", "много собак", "🐶", 5, "dog"), "u8_many_many_dogs.mp3", manyFewOptions, "many", "Да! Много собак.", "Нет. Тут много собак.")
    ]
  };

  var UNIT8_GAMES = {
    countGame: countGame,
    findCountGame: findCountGame,
    basketGame: basketGame,
    shopCountGame: shopCountGame,
    countMapGame: countMapGame,
    manyFewGame: manyFewGame
  };

  root.LexiLandUnit8Lesson = {
    id: "level-0-unit-8-counting",
    order: 10,
    menuLabel: "Юнит 8",
    title: "Юнит 8: Сколько? Один, два, три",
    subtitle: "Количество: один, два, три, много, мало",
    level: "Уровень 0",
    coverEmoji: "🔢",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-22-one-two-three", "Урок 22: Один, два, три", "1️⃣", "Урок 22: Один, два, три", lesson22Slides),
      unit("lesson-23-skolko", "Урок 23: Сколько?", "🔢", "Урок 23: Сколько?", lesson23Slides),
      unit("lesson-24-many-few", "Урок 24: Много / мало", "🔵", "Урок 24: Много / мало", lesson24Slides),
      gameUnit("unit-8-game-count", "Игра: Сколько здесь?", "🔢", countGame),
      gameUnit("unit-8-game-find-count", "Игра 2: Найди количество", "🔎", findCountGame),
      gameUnit("unit-8-game-basket", "Игра 3: Корзина", "🧺", basketGame),
      gameUnit("unit-8-game-shop-count", "Игра 4: Магазин 2", "🏪", shopCountGame),
      gameUnit("unit-8-game-count-map", "Игра 5: Карта количества", "🗺️", countMapGame),
      gameUnit("unit-8-game-many-few", "Игра 6: Много или мало", "🔵", manyFewGame)
    ]
  };

  root.LexiLandUnit8Games = UNIT8_GAMES;
  root.LexiLandUnit8 = root.LexiLandUnit8Lesson;
}(typeof window !== "undefined" ? window : globalThis));
