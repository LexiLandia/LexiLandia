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
    "еда": m("еда", "🍽️"),
    "напиток": m("напиток", "🥤"),
    "я": m("я", "🙂"),
    "ем": m("ем", "🍽️"),
    "пью": m("пью", "🥤"),
    "он": m("он", "👦"),
    "она": m("она", "👧"),
    "ест": m("ест", "🍽️"),
    "пьёт": m("пьёт", "🥤"),
    "хлеб": m("хлеб", "🍞"),
    "яблоко": m("яблоко", "🍎"),
    "суп": m("суп", "🍲"),
    "каша": m("каша", "🥣"),
    "сыр": m("сыр", "🧀"),
    "вкусно": m("вкусно", "😋"),
    "вода": m("вода", "💧"),
    "воду": m("воду", "💧"),
    "сок": m("сок", "🧃"),
    "чай": m("чай", "🍵"),
    "молоко": m("молоко", "🥛"),
    "кофе": m("кофе", "☕"),
    "кафе": m("кафе", "🏢☕"),
    "хочу": m("хочу", "🙏"),
    "дай": m("дай", "🤲"),
    "пожалуйста": m("пожалуйста", "🙏"),
    "на": m("на", "🤲➡️🙂"),
    "спасибо": m("спасибо", "😊"),
    "столе": m("столе", "🪑"),
    "стол": m("стол", "🪑"),
    "утро": m("утро", "🌅"),
    "день": m("день", "☀️"),
    "вечер": m("вечер", "🌙"),
    "дома": m("дома", "🏠"),
    "школа": m("школа", "🏫"),
    "школе": m("школе", "🏫"),
    "мама": m("мама", "👩"),
    "папа": m("папа", "👨"),
    "мальчик": m("мальчик", "👦"),
    "девочка": m("девочка", "👧"),
    "два": m("два", "2️⃣"),
    "и": m("и", "➕"),
    "где": m("где", "❓📍"),
    "что": m("что", "❓")
  };

  var dictionary = [
    entry("u10-eda", "еда", "🍽️", "word", "eda.mp3"),
    entry("u10-napitok", "напиток", "🥤", "word", "napitok.mp3"),
    entry("u10-ya-em", "я ем", "🍽️", "chunk", "ya_em.mp3"),
    entry("u10-ya-pyu", "я пью", "🥤", "chunk", "ya_pyu.mp3"),
    entry("u10-on-est", "он ест", "🍽️", "chunk", "on_est.mp3"),
    entry("u10-ona-est", "она ест", "🍽️", "chunk", "ona_est.mp3"),
    entry("u10-on-pyot", "он пьёт", "🥤", "chunk", "on_pyot.mp3"),
    entry("u10-ona-pyot", "она пьёт", "🥤", "chunk", "ona_pyot.mp3"),
    entry("u10-hleb", "хлеб", "🍞", "word", "hleb.mp3"),
    entry("u10-sup", "суп", "🍲", "word", "sup.mp3"),
    entry("u10-kasha", "каша", "🥣", "word", "kasha.mp3"),
    entry("u10-syr", "сыр", "🧀", "word", "syr.mp3"),
    entry("u10-sok", "сок", "🧃", "word", "sok.mp3"),
    entry("u10-chay", "чай", "🍵", "word", "chay.mp3"),
    entry("u10-moloko", "молоко", "🥛", "word", "moloko.mp3"),
    entry("u10-kofe", "кофе", "☕", "word", "kofe.mp3"),
    entry("u10-vkusno", "вкусно", "😋", "word", "vkusno.mp3")
  ];

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var foodOptions = [
    option("hleb", "хлеб", "🍞"),
    option("yabloko", "яблоко", "🍎"),
    option("sup", "суп", "🍲"),
    option("kasha", "каша", "🥣"),
    option("syr", "сыр", "🧀")
  ];

  var drinkOptions = [
    option("voda", "вода", "💧"),
    option("sok", "сок", "🧃"),
    option("chay", "чай", "🍵"),
    option("moloko", "молоко", "🥛"),
    option("kofe", "кофе", "☕")
  ];

  var categoryOptions = [
    option("food", "еда", "🍽️"),
    option("drink", "напиток", "🥤")
  ];

  var cafeItems = [
    group("sup", "суп", "🍲", 1, "food"),
    group("hleb", "хлеб", "🍞", 1, "food"),
    group("yabloko", "яблоко", "🍎", 1, "food"),
    group("voda", "вода", "💧", 1, "drink"),
    group("sok", "сок", "🧃", 1, "drink"),
    group("chay", "чай", "🍵", 1, "drink")
  ];

  var tableItems = [
    group("hleb", "хлеб", "🍞", 1, "food"),
    group("yabloko", "яблоко", "🍎", 1, "food"),
    group("two-apples", "два яблока", "🍎", 2, "food"),
    group("sup", "суп", "🍲", 1, "food"),
    group("kasha", "каша", "🥣", 1, "food"),
    group("voda", "вода", "💧", 1, "drink"),
    group("sok", "сок", "🧃", 1, "drink"),
    group("chay", "чай", "🍵", 1, "drink")
  ];

  var lesson28Slides = [
    slide("u10-l28-1", "Я ем", ["Я ем."], focus(["🙂", "🍽️"]), [line("Я ем.", "u10_l28_ya_em.mp3")], null, true),
    slide("u10-l28-2", "хлеб", ["Я ем хлеб."], focus(["🙂", "🍞"]), [line("Я ем хлеб.", "u10_l28_ya_em_hleb.mp3")], null, true),
    slide("u10-l28-3", "яблоко", ["Я ем яблоко."], focus(["🙂", "🍎"]), [line("Я ем яблоко.", "u10_l28_ya_em_yabloko.mp3")], null, true),
    slide("u10-l28-4", "суп", ["Мама ест суп."], focus(["👩", "🍲"]), [line("Мама ест суп.", "u10_l28_mama_est_sup.mp3")], null, true),
    slide("u10-l28-5", "каша", ["Папа ест кашу."], focus(["👨", "🥣"]), [line("Папа ест кашу.", "u10_l28_papa_est_kashu.mp3")], null, true),
    slide("u10-l28-6", "сыр", ["Мальчик ест сыр."], focus(["👦", "🧀"]), [line("Мальчик ест сыр.", "u10_l28_malchik_est_syr.mp3")], null, true),
    slide("u10-l28-7", "вкусно", ["Это вкусно."], focus(["😋", "🍞", "🍎", "🍲"]), [line("Это вкусно.", "u10_l28_eto_vkusno.mp3")], null, true),
    slide("u10-l28-8", "на столе", ["На столе хлеб."], focus(["🪑", "🍞"]), [line("На столе хлеб.", "u10_l28_na_stole_hleb.mp3")], null, true),
    slide("u10-l28-9", "в кафе", ["В кафе суп."], focus(["🏢☕", "🍲"]), [line("В кафе суп.", "u10_l28_v_kafe_sup.mp3")], null, true),
    slide("u10-l28-10", "Найди", ["Я ем хлеб."], focus(["🙂", "🍞"]), [line("Я ем хлеб.", "u10_l28_ya_em_hleb.mp3")], [
      question("u10-l28-q1", "Что я ем?", foodOptions, "hleb", "🙂")
    ], true),
    slide("u10-l28-11", "Да или нет", ["Это суп?"], focus(["🍎", "❌"]), [line("Это суп?", "u10_l28_eto_sup.mp3")], [
      question("u10-l28-q2", "Это суп?", yesNoOptions, "net", "🍎")
    ], true),
    slide("u10-l28-12", "Читай", ["Утро.", "Я дома.", "Я ем кашу.", "Мама ест хлеб.", "На столе яблоко.", "Это вкусно."], focus(["🌅🏠", "🙂🥣", "👩🍞", "🪑🍎", "😋"]), [line("Утро. Я дома. Я ем кашу. Мама ест хлеб. На столе яблоко. Это вкусно.", "u10_l28_text.mp3")], [
      question("u10-l28-q3", "Что я ем?", foodOptions, "kasha", "🙂"),
      question("u10-l28-q4", "Кто ест хлеб?", [option("mama", "мама", "👩"), option("papa", "папа", "👨"), option("malchik", "мальчик", "👦")], "mama", "🍞"),
      question("u10-l28-q5", "Где яблоко?", [option("stol", "на столе", "🪑"), option("cafe", "в кафе", "🏢☕"), option("home", "дома", "🏠")], "stol", "🍎")
    ], true),
    slide("u10-l28-13", "Отлично!", ["Отлично! ✅", "я ем", "хлеб", "суп", "каша"], wordList([{ text: "я ем", emoji: "🍽️" }, { text: "хлеб", emoji: "🍞" }, { text: "суп", emoji: "🍲" }, { text: "каша", emoji: "🥣" }]), [line("Отлично! Я ем. Хлеб. Суп. Каша.", "u10_l28_final.mp3")], null, true)
  ];

  var lesson29Slides = [
    slide("u10-l29-1", "Я пью", ["Я пью."], focus(["🙂", "🥤"]), [line("Я пью.", "u10_l29_ya_pyu.mp3")], null, true),
    slide("u10-l29-2", "вода", ["Я пью воду."], focus(["🙂", "💧"]), [line("Я пью воду.", "u10_l29_ya_pyu_vodu.mp3")], null, true),
    slide("u10-l29-3", "сок", ["Я пью сок."], focus(["🙂", "🧃"]), [line("Я пью сок.", "u10_l29_ya_pyu_sok.mp3")], null, true),
    slide("u10-l29-4", "чай", ["Мама пьёт чай."], focus(["👩", "🍵"]), [line("Мама пьёт чай.", "u10_l29_mama_pyot_chay.mp3")], null, true),
    slide("u10-l29-5", "кофе", ["Папа пьёт кофе."], focus(["👨", "☕"]), [line("Папа пьёт кофе.", "u10_l29_papa_pyot_kofe.mp3")], null, true),
    slide("u10-l29-6", "молоко", ["Девочка пьёт молоко."], focus(["👧", "🥛"]), [line("Девочка пьёт молоко.", "u10_l29_devochka_pyot_moloko.mp3")], null, true),
    slide("u10-l29-7", "кафе", ["В кафе чай."], focus(["🏢☕", "🍵"]), [line("В кафе чай.", "u10_l29_v_kafe_chay.mp3")], null, true),
    slide("u10-l29-8", "на столе", ["На столе сок."], focus(["🪑", "🧃"]), [line("На столе сок.", "u10_l29_na_stole_sok.mp3")], null, true),
    slide("u10-l29-9", "хочу", ["Я хочу воду."], focus(["🙂🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], null, true),
    slide("u10-l29-10", "Найди", ["Я пью сок."], focus(["🙂", "🧃"]), [line("Я пью сок.", "u10_l29_ya_pyu_sok.mp3")], [
      question("u10-l29-q1", "Что я пью?", drinkOptions, "sok", "🙂")
    ], true),
    slide("u10-l29-11", "Да или нет", ["Это вода?"], focus(["💧", "✅"]), [line("Это вода?", "u10_l29_eto_voda.mp3")], [
      question("u10-l29-q2", "Это вода?", yesNoOptions, "da", "💧")
    ], true),
    slide("u10-l29-12", "Читай", ["День.", "Я в кафе.", "Я пью сок.", "Мама пьёт чай.", "На столе вода."], focus(["☀️", "🙂🏢☕", "🧃", "👩🍵", "🪑💧"]), [line("День. Я в кафе. Я пью сок. Мама пьёт чай. На столе вода.", "u10_l29_text.mp3")], [
      question("u10-l29-q3", "Что я пью?", drinkOptions, "sok", "🙂"),
      question("u10-l29-q4", "Кто пьёт чай?", [option("mama", "мама", "👩"), option("papa", "папа", "👨"), option("devochka", "девочка", "👧")], "mama", "🍵"),
      question("u10-l29-q5", "Где сок?", [option("cafe", "в кафе", "🏢☕"), option("stol", "на столе", "🪑"), option("school", "в школе", "🏫")], "cafe", "🧃")
    ], true),
    slide("u10-l29-13", "Отлично!", ["Отлично! ✅", "я пью", "вода", "сок", "чай"], wordList([{ text: "я пью", emoji: "🥤" }, { text: "вода", emoji: "💧" }, { text: "сок", emoji: "🧃" }, { text: "чай", emoji: "🍵" }]), [line("Отлично! Я пью. Вода. Сок. Чай.", "u10_l29_final.mp3")], null, true)
  ];

  var lesson30Slides = [
    slide("u10-l30-1", "В кафе", ["В кафе."], focus(["🏢☕", "🙂", "🤲"]), [line("В кафе.", "u10_l30_v_kafe.mp3")], null, true),
    slide("u10-l30-2", "хочу", ["Я хочу суп."], focus(["🙂🙏", "🍲"]), [line("Я хочу суп.", "u10_l30_ya_hochu_sup.mp3")], null, true),
    slide("u10-l30-3", "дай", ["Дай суп, пожалуйста."], focus(["🤲", "🍲", "🙏"]), [line("Дай суп, пожалуйста.", "u10_l30_dai_sup_pozhaluysta.mp3")], null, true),
    slide("u10-l30-4", "на", ["На."], focus(["🤲➡️🙂", "🍲"]), [line("На.", "na_take.mp3")], null, true),
    slide("u10-l30-5", "спасибо", ["Спасибо."], focus(["😊"]), [line("Спасибо.", "spasibo.mp3")], null, true),
    slide("u10-l30-6", "чай", ["Я хочу чай.", "Дай чай, пожалуйста."], focus(["🙂🙏🍵", "🤲🍵🙏"]), [line("Я хочу чай. Дай чай, пожалуйста.", "u10_l30_ya_hochu_chay_dai_chay.mp3")], null, true),
    slide("u10-l30-7", "хлеб и сок", ["Я хочу хлеб и сок."], focus(["🙂🙏", "🍞", "➕", "🧃"]), [line("Я хочу хлеб и сок.", "u10_l30_ya_hochu_hleb_i_sok.mp3")], null, true),
    slide("u10-l30-8", "мама", ["В кафе мама пьёт чай."], focus(["🏢☕", "👩", "🍵"]), [line("В кафе мама пьёт чай.", "u10_l30_v_kafe_mama_pyot_chay.mp3")], null, true),
    slide("u10-l30-9", "Диалог", ["Я хочу суп.", "Дай суп, пожалуйста.", "На.", "Спасибо."], focus(["🙂🙏🍲", "🤲🍲🙏", "🤲➡️🙂", "😊"]), [line("Я хочу суп. Дай суп, пожалуйста. На. Спасибо.", "u10_l30_dialog_sup.mp3")], [
      question("u10-l30-q1", "Что я хочу?", [option("sup", "суп", "🍲"), option("chay", "чай", "🍵"), option("sok", "сок", "🧃")], "sup", "🙂"),
      question("u10-l30-q2", "После «На»?", [option("spasibo", "спасибо", "😊"), option("dai", "дай", "🤲"), option("hochu", "хочу", "🙏")], "spasibo", "🤲➡️🙂")
    ], true),
    slide("u10-l30-10", "Читай", ["Вечер.", "Я в кафе.", "Я хочу суп.", "Мама хочет чай.", "На столе хлеб и сок."], focus(["🌙", "🙂🏢☕", "🍲", "👩🍵", "🪑🍞🧃"]), [line("Вечер. Я в кафе. Я хочу суп. Мама хочет чай. На столе хлеб и сок.", "u10_l30_text.mp3")], [
      question("u10-l30-q3", "Где я?", [option("cafe", "в кафе", "🏢☕"), option("home", "дома", "🏠"), option("school", "в школе", "🏫")], "cafe", "🙂"),
      question("u10-l30-q4", "Что я хочу?", [option("sup", "суп", "🍲"), option("hleb", "хлеб", "🍞"), option("sok", "сок", "🧃")], "sup", "🙂"),
      question("u10-l30-q5", "Что хочет мама?", [option("chay", "чай", "🍵"), option("kofe", "кофе", "☕"), option("voda", "вода", "💧")], "chay", "👩"),
      question("u10-l30-q6", "Что на столе?", [option("hleb-sok", "хлеб и сок", "🍞🧃"), option("sup-chay", "суп и чай", "🍲🍵"), option("kasha-syr", "каша и сыр", "🥣🧀")], "hleb-sok", "🪑")
    ], true),
    slide("u10-l30-11", "Отлично!", ["Отлично! ✅", "кафе", "дай", "спасибо"], wordList([{ text: "кафе", emoji: "🏢☕" }, { text: "дай", emoji: "🤲" }, { text: "спасибо", emoji: "😊" }]), [line("Отлично! Кафе. Дай. Спасибо.", "u10_l30_final.mp3")], null, true)
  ];

  var eatGame = {
    id: "unit-10-game-eat",
    gameSlug: "unit-10-game-eat",
    kind: "food-choice",
    icon: "🍽️",
    title: "Что я ем?",
    finalTitle: "Отлично! Еда понятна! ✅",
    finalText: "я ем",
    finalWords: ["хлеб", "яблоко", "суп", "каша", "сыр"],
    rounds: [
      choiceTask("u10-eat-1", "Что я ем?", group("eat-hleb", "Я ем хлеб.", "🙂🍞", 1, "scene"), "u10_game_eat_hleb.mp3", foodOptions, "hleb", "Да! Хлеб.", "Нет. Это хлеб."),
      choiceTask("u10-eat-2", "Что я ем?", group("eat-yabloko", "Я ем яблоко.", "🙂🍎", 1, "scene"), "u10_game_eat_yabloko.mp3", foodOptions, "yabloko", "Да! Яблоко.", "Нет. Это яблоко."),
      choiceTask("u10-eat-3", "Что мама ест?", group("eat-mama-sup", "Мама ест суп.", "👩🍲", 1, "scene"), "u10_game_eat_mama_sup.mp3", foodOptions, "sup", "Да! Суп.", "Нет. Это суп."),
      choiceTask("u10-eat-4", "Что папа ест?", group("eat-papa-kasha", "Папа ест кашу.", "👨🥣", 1, "scene"), "u10_game_eat_papa_kasha.mp3", foodOptions, "kasha", "Да! Каша.", "Нет. Это каша."),
      choiceTask("u10-eat-5", "Что мальчик ест?", group("eat-boy-syr", "Мальчик ест сыр.", "👦🧀", 1, "scene"), "u10_game_eat_boy_syr.mp3", foodOptions, "syr", "Да! Сыр.", "Нет. Это сыр."),
      choiceTask("u10-eat-6", "Что девочка ест?", group("eat-girl-apple", "Девочка ест яблоко.", "👧🍎", 1, "scene"), "u10_game_eat_girl_yabloko.mp3", foodOptions, "yabloko", "Да! Яблоко.", "Нет. Это яблоко.")
    ]
  };

  var drinkGame = {
    id: "unit-10-game-drink",
    gameSlug: "unit-10-game-drink",
    kind: "drink-choice",
    icon: "🥤",
    title: "Что я пью?",
    finalTitle: "Отлично! Напитки понятны! ✅",
    finalText: "я пью",
    finalWords: ["вода", "сок", "чай", "молоко", "кофе"],
    rounds: [
      choiceTask("u10-drink-1", "Что я пью?", group("drink-voda", "Я пью воду.", "🙂💧", 1, "scene"), "u10_game_drink_voda.mp3", drinkOptions, "voda", "Да! Вода.", "Нет. Это вода."),
      choiceTask("u10-drink-2", "Что я пью?", group("drink-sok", "Я пью сок.", "🙂🧃", 1, "scene"), "u10_game_drink_sok.mp3", drinkOptions, "sok", "Да! Сок.", "Нет. Это сок."),
      choiceTask("u10-drink-3", "Что мама пьёт?", group("drink-mama-chay", "Мама пьёт чай.", "👩🍵", 1, "scene"), "u10_game_drink_mama_chay.mp3", drinkOptions, "chay", "Да! Чай.", "Нет. Это чай."),
      choiceTask("u10-drink-4", "Что папа пьёт?", group("drink-papa-kofe", "Папа пьёт кофе.", "👨☕", 1, "scene"), "u10_game_drink_papa_kofe.mp3", drinkOptions, "kofe", "Да! Кофе.", "Нет. Это кофе."),
      choiceTask("u10-drink-5", "Что девочка пьёт?", group("drink-girl-milk", "Девочка пьёт молоко.", "👧🥛", 1, "scene"), "u10_game_drink_girl_moloko.mp3", drinkOptions, "moloko", "Да! Молоко.", "Нет. Это молоко."),
      choiceTask("u10-drink-6", "Что мальчик пьёт?", group("drink-boy-voda", "Мальчик пьёт воду.", "👦💧", 1, "scene"), "u10_game_drink_boy_voda.mp3", drinkOptions, "voda", "Да! Вода.", "Нет. Это вода.")
    ]
  };

  var categoryGame = {
    id: "unit-10-game-food-or-drink",
    gameSlug: "unit-10-game-food-or-drink",
    kind: "category-choice",
    icon: "🍽️",
    title: "Еда или напиток?",
    finalTitle: "Супер! Еда и напитки понятны! ✅",
    finalText: "еда · напиток",
    finalWords: ["еда", "напиток"],
    rounds: [
      choiceTask("u10-cat-1", "Еда или напиток?", group("cat-hleb", "хлеб", "🍞", 1, "food"), "u10_cat_hleb.mp3", categoryOptions, "food", "Да! Еда.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-2", "Еда или напиток?", group("cat-yabloko", "яблоко", "🍎", 1, "food"), "u10_cat_yabloko.mp3", categoryOptions, "food", "Да! Еда.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-3", "Еда или напиток?", group("cat-sup", "суп", "🍲", 1, "food"), "u10_cat_sup.mp3", categoryOptions, "food", "Да! Еда.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-4", "Еда или напиток?", group("cat-kasha", "каша", "🥣", 1, "food"), "u10_cat_kasha.mp3", categoryOptions, "food", "Да! Еда.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-5", "Еда или напиток?", group("cat-voda", "вода", "💧", 1, "drink"), "u10_cat_voda.mp3", categoryOptions, "drink", "Да! Напиток.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-6", "Еда или напиток?", group("cat-sok", "сок", "🧃", 1, "drink"), "u10_cat_sok.mp3", categoryOptions, "drink", "Да! Напиток.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-7", "Еда или напиток?", group("cat-chay", "чай", "🍵", 1, "drink"), "u10_cat_chay.mp3", categoryOptions, "drink", "Да! Напиток.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-8", "Еда или напиток?", group("cat-moloko", "молоко", "🥛", 1, "drink"), "u10_cat_moloko.mp3", categoryOptions, "drink", "Да! Напиток.", "Нет. Смотри ещё."),
      choiceTask("u10-cat-9", "Еда или напиток?", group("cat-kofe", "кофе", "☕", 1, "drink"), "u10_cat_kofe.mp3", categoryOptions, "drink", "Да! Напиток.", "Нет. Смотри ещё.")
    ]
  };

  var cafeGame = {
    id: "unit-10-game-cafe",
    gameSlug: "unit-10-game-cafe",
    kind: "cafe-order",
    icon: "🏢☕",
    title: "Кафе",
    findTitle: "Кафе",
    finalTitle: "Отлично! Кафе готово! 🏢☕",
    finalText: "На. Спасибо.",
    finalWords: ["суп", "чай", "сок"],
    rounds: [
      commandTask("u10-cafe-1", "Я хочу суп.", "u10_cafe_ya_hochu_sup.mp3", cafeItems, "sup", "На. Спасибо. Да! Суп.", "Нет. Нужен суп."),
      commandTask("u10-cafe-2", "Я хочу хлеб.", "u10_cafe_ya_hochu_hleb.mp3", cafeItems, "hleb", "На. Спасибо. Да! Хлеб.", "Нет. Нужен хлеб."),
      commandTask("u10-cafe-3", "Я хочу яблоко.", "u10_cafe_ya_hochu_yabloko.mp3", cafeItems, "yabloko", "На. Спасибо. Да! Яблоко.", "Нет. Нужно яблоко."),
      commandTask("u10-cafe-4", "Я хочу воду.", "u10_cafe_ya_hochu_vodu.mp3", cafeItems, "voda", "На. Спасибо. Да! Вода.", "Нет. Нужна вода."),
      commandTask("u10-cafe-5", "Я хочу сок.", "u10_cafe_ya_hochu_sok.mp3", cafeItems, "sok", "На. Спасибо. Да! Сок.", "Нет. Нужен сок."),
      commandTask("u10-cafe-6", "Я хочу чай.", "u10_cafe_ya_hochu_chay.mp3", cafeItems, "chay", "На. Спасибо. Да! Чай.", "Нет. Нужен чай."),
      commandTask("u10-cafe-7", "Дай суп, пожалуйста.", "u10_cafe_dai_sup_pozhaluysta.mp3", cafeItems, "sup", "На. Спасибо. Да! Суп.", "Нет. Нужен суп."),
      commandTask("u10-cafe-8", "Дай сок, пожалуйста.", "u10_cafe_dai_sok_pozhaluysta.mp3", cafeItems, "sok", "На. Спасибо. Да! Сок.", "Нет. Нужен сок."),
      commandTask("u10-cafe-9", "Дай чай, пожалуйста.", "u10_cafe_dai_chay_pozhaluysta.mp3", cafeItems, "chay", "На. Спасибо. Да! Чай.", "Нет. Нужен чай.")
    ]
  };

  var tableGame = {
    id: "unit-10-game-table",
    gameSlug: "unit-10-game-table",
    kind: "table-build",
    icon: "🪑",
    title: "Собери стол",
    findTitle: "Собери стол",
    finalTitle: "Отлично! Стол готов! ✅",
    finalText: "на столе",
    finalWords: ["хлеб", "суп", "чай"],
    rounds: [
      commandTask("u10-table-1", "Положи хлеб на стол.", "u10_table_hleb.mp3", tableItems, "hleb", "Да! Хлеб на столе.", "Нет. Нужен хлеб."),
      commandTask("u10-table-2", "Положи яблоко на стол.", "u10_table_yabloko.mp3", tableItems, "yabloko", "Да! Яблоко на столе.", "Нет. Нужно яблоко."),
      commandTask("u10-table-3", "Положи два яблока на стол.", "u10_table_two_apples.mp3", tableItems, "two-apples", "Да! Два яблока на столе.", "Нет. Нужны два яблока."),
      commandTask("u10-table-4", "Положи суп на стол.", "u10_table_sup.mp3", tableItems, "sup", "Да! Суп на столе.", "Нет. Нужен суп."),
      commandTask("u10-table-5", "Положи кашу на стол.", "u10_table_kasha.mp3", tableItems, "kasha", "Да! Каша на столе.", "Нет. Нужна каша."),
      commandTask("u10-table-6", "Положи воду на стол.", "u10_table_voda.mp3", tableItems, "voda", "Да! Вода на столе.", "Нет. Нужна вода."),
      commandTask("u10-table-7", "Положи сок на стол.", "u10_table_sok.mp3", tableItems, "sok", "Да! Сок на столе.", "Нет. Нужен сок."),
      commandTask("u10-table-8", "Положи чай на стол.", "u10_table_chay.mp3", tableItems, "chay", "Да! Чай на столе.", "Нет. Нужен чай.")
    ]
  };

  var cafeMapGame = {
    id: "unit-10-game-cafe-map",
    gameSlug: "unit-10-game-cafe-map",
    kind: "cafe-map",
    icon: "🗺️",
    title: "Карта кафе",
    mapTitle: "Карта кафе",
    finalTitle: "Супер! Карта кафе готова! 🏆",
    finalText: "кафе · стол · суп · чай",
    finalWords: ["кафе", "суп", "чай", "домой"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("home", "дом", "🏠", 1, "place", 0, 4),
      group("school", "школа", "🏫", 1, "place", 4, 0),
      group("cafe", "кафе", "🏢☕", 1, "place", 3, 1),
      group("table", "стол", "🪑", 1, "thing", 2, 2),
      group("hleb", "хлеб", "🍞", 1, "food", 1, 2),
      group("sup", "суп", "🍲", 1, "food", 3, 2),
      group("voda", "вода", "💧", 1, "drink", 4, 4),
      group("chay", "чай", "🍵", 1, "drink", 2, 0),
      group("sok", "сок", "🧃", 1, "drink", 1, 0),
      group("two-apples", "два яблока", "🍎", 2, "food", 4, 2)
    ],
    rounds: [
      { id: "u10-map-1", command: "Иди в кафе.", text: "Иди в кафе.", audio: audio("u10_map_go_cafe.mp3"), target: "cafe", hint: "Нужно кафе.", correctFeedback: "Да! Кафе." },
      { id: "u10-map-2", command: "Найди суп.", text: "Найди суп.", audio: audio("u10_map_find_sup.mp3"), target: "sup", hint: "Нужен суп.", correctFeedback: "Да! Суп." },
      { id: "u10-map-3", command: "Найди чай.", text: "Найди чай.", audio: audio("u10_map_find_chay.mp3"), target: "chay", hint: "Нужен чай.", correctFeedback: "Да! Чай." },
      { id: "u10-map-4", command: "Иди к столу.", text: "Иди к столу.", audio: audio("u10_map_go_table.mp3"), target: "table", hint: "Нужен стол.", correctFeedback: "Да! Стол." },
      { id: "u10-map-5", command: "Найди два яблока.", text: "Найди два яблока.", audio: audio("u10_map_find_two_apples.mp3"), target: "two-apples", hint: "Нужны два яблока.", correctFeedback: "Да! Два яблока." },
      { id: "u10-map-6", command: "Иди домой.", text: "Иди домой.", audio: audio("u10_map_go_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." }
    ]
  };

  var UNIT10_GAMES = {
    eatGame: eatGame,
    drinkGame: drinkGame,
    categoryGame: categoryGame,
    cafeGame: cafeGame,
    tableGame: tableGame,
    cafeMapGame: cafeMapGame
  };

  root.LexiLandUnit10Lesson = {
    id: "level-0-unit-10-food-drinks",
    order: 12,
    menuLabel: "Юнит 10",
    title: "Юнит 10: Еда и напитки",
    subtitle: "Еда, напитки, кафе",
    level: "Уровень 0",
    coverEmoji: "🍽️",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-28-ya-em", "Урок 28: Я ем", "🍽️", "Урок 28: Я ем", lesson28Slides),
      unit("lesson-29-ya-pyu", "Урок 29: Я пью", "🥤", "Урок 29: Я пью", lesson29Slides),
      unit("lesson-30-v-kafe", "Урок 30: В кафе", "🏢☕", "Урок 30: В кафе", lesson30Slides),
      gameUnit("unit-10-game-eat", "Игра: Что я ем?", "🍽️", eatGame),
      gameUnit("unit-10-game-drink", "Игра 2: Что я пью?", "🥤", drinkGame),
      gameUnit("unit-10-game-food-or-drink", "Игра 3: Еда или напиток?", "🍽️", categoryGame),
      gameUnit("unit-10-game-cafe", "Игра 4: Кафе", "🏢☕", cafeGame),
      gameUnit("unit-10-game-table", "Игра 5: Собери стол", "🪑", tableGame),
      gameUnit("unit-10-game-cafe-map", "Игра 6: Карта кафе", "🗺️", cafeMapGame)
    ]
  };

  root.LexiLandUnit10Games = UNIT10_GAMES;
  root.LexiLandUnit10 = root.LexiLandUnit10Lesson;
}(typeof window !== "undefined" ? window : globalThis));
