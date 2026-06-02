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
      item: item || "person",
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
    "семья": m("семья", "👨‍👩‍👧‍👦"),
    "моя": m("моя", "🙂"),
    "мой": m("мой", "🙂"),
    "мама": m("мама", "👩"),
    "папа": m("папа", "👨"),
    "брат": m("брат", "👦"),
    "сестра": m("сестра", "👧"),
    "бабушка": m("бабушка", "👵"),
    "дедушка": m("дедушка", "👴"),
    "друг": m("друг", "🙂"),
    "подруга": m("подруга", "🙂"),
    "помогает": m("помогает", "🤝"),
    "рисует": m("рисует", "🎨"),
    "читает": m("читает", "📖"),
    "играет": m("играет", "⚽"),
    "пьёт": m("пьёт", "🥤"),
    "ест": m("ест", "🍲"),
    "идёт": m("идёт", "🚶‍➡️"),
    "дома": m("дома", "🏠"),
    "парке": m("парке", "🌳"),
    "чай": m("чай", "🍵"),
    "суп": m("суп", "🍲"),
    "мяч": m("мяч", "⚽"),
    "книга": m("книга", "📖"),
    "вода": m("вода", "💧")
  };

  var dictionary = [
    entry("u14-semya", "семья", "👨‍👩‍👧‍👦", "word", "semya.mp3"),
    entry("u14-moya-semya", "моя семья", "👨‍👩‍👧‍👦", "chunk", "moya_semya.mp3"),
    entry("u14-mama", "мама", "👩", "word", "mama.mp3"),
    entry("u14-papa", "папа", "👨", "word", "papa.mp3"),
    entry("u14-brat", "брат", "👦", "word", "brat.mp3"),
    entry("u14-sestra", "сестра", "👧", "word", "sestra.mp3"),
    entry("u14-babushka", "бабушка", "👵", "word", "babushka.mp3"),
    entry("u14-dedushka", "дедушка", "👴", "word", "dedushka.mp3"),
    entry("u14-drug", "друг", "🙂", "word", "drug.mp3"),
    entry("u14-podruga", "подруга", "🙂", "word", "podruga.mp3"),
    entry("u14-moy-papa", "мой папа", "👨", "chunk", "moy_papa.mp3"),
    entry("u14-moya-mama", "моя мама", "👩", "chunk", "moya_mama.mp3"),
    entry("u14-moy-brat", "мой брат", "👦", "chunk", "moy_brat.mp3"),
    entry("u14-moya-sestra", "моя сестра", "👧", "chunk", "moya_sestra.mp3"),
    entry("u14-moya-babushka", "моя бабушка", "👵", "chunk", "moya_babushka.mp3"),
    entry("u14-moy-dedushka", "мой дедушка", "👴", "chunk", "moy_dedushka.mp3"),
    entry("u14-moy-drug", "мой друг", "🙂", "chunk", "moy_drug.mp3"),
    entry("u14-moya-podruga", "моя подруга", "🙂", "chunk", "moya_podruga.mp3"),
    entry("u14-u-menya-est-brat", "у меня есть брат", "🙂✅👦", "chunk", "u_menya_est_brat.mp3"),
    entry("u14-u-menya-est-sestra", "у меня есть сестра", "🙂✅👧", "chunk", "u_menya_est_sestra.mp3"),
    entry("u14-u-menya-est-babushka", "у меня есть бабушка", "🙂✅👵", "chunk", "u_menya_est_babushka.mp3"),
    entry("u14-u-menya-est-dedushka", "у меня есть дедушка", "🙂✅👴", "chunk", "u_menya_est_dedushka.mp3"),
    entry("u14-u-menya-net-brata", "у меня нет брата", "🙂❌👦", "chunk", "u_menya_net_brata.mp3"),
    entry("u14-u-menya-net-sestry", "у меня нет сестры", "🙂❌👧", "chunk", "u_menya_net_sestry.mp3"),
    entry("u14-pomogaet", "помогает", "🤝", "word", "pomogaet.mp3"),
    entry("u14-risuet", "рисует", "🎨", "word", "risuet.mp3"),
    entry("u14-mama-pomogaet", "мама помогает", "👩🤝", "chunk", "mama_pomogaet.mp3"),
    entry("u14-papa-chitaet", "папа читает", "👨📖", "chunk", "papa_chitaet.mp3"),
    entry("u14-brat-igraet", "брат играет", "👦⚽", "chunk", "brat_igraet.mp3"),
    entry("u14-sestra-risuet", "сестра рисует", "👧🎨", "chunk", "sestra_risuet.mp3"),
    entry("u14-babushka-pyot-chay", "бабушка пьёт чай", "👵🍵", "chunk", "babushka_pyot_chay.mp3"),
    entry("u14-dedushka-est-sup", "дедушка ест суп", "👴🍲", "chunk", "dedushka_est_sup.mp3"),
    entry("u14-drug-idyot-v-park", "друг идёт в парк", "🙂🚶‍➡️🌳", "chunk", "drug_idyot_v_park.mp3"),
    entry("u14-podruga-chitaet-knigu", "подруга читает книгу", "🙂📖", "chunk", "podruga_chitaet_knigu.mp3")
  ];

  var yesNoOptions = [
    option("net", "нет", "❌"),
    option("da", "да", "✅")
  ];

  var peopleOptions = [
    option("mama", "мама", "👩"),
    option("papa", "папа", "👨"),
    option("brat", "брат", "👦"),
    option("sestra", "сестра", "👧"),
    option("babushka", "бабушка", "👵"),
    option("dedushka", "дедушка", "👴"),
    option("drug", "друг", "🙂"),
    option("podruga", "подруга", "🙂")
  ];

  var familyCoreOptions = [
    option("papa", "папа", "👨"),
    option("mama", "мама", "👩"),
    option("brat", "брат", "👦"),
    option("sestra", "сестра", "👧"),
    option("babushka", "бабушка", "👵"),
    option("dedushka", "дедушка", "👴")
  ];

  var actionOptions = [
    option("chitaet", "читает", "📖"),
    option("igraet", "играет", "⚽"),
    option("pyot", "пьёт", "🍵"),
    option("est", "ест", "🍲"),
    option("spit", "спит", "😴"),
    option("pomogaet", "помогает", "🤝"),
    option("risuet", "рисует", "🎨"),
    option("idyot", "идёт", "🚶‍➡️")
  ];

  var helpOptions = [
    option("water", "вода", "💧"),
    option("tea", "чай", "🍵"),
    option("soup", "суп", "🍲"),
    option("ball", "мяч", "⚽"),
    option("book", "книга", "📖"),
    option("sit", "сядь", "🪑"),
    option("jacket", "куртка", "🧥")
  ];

  var placeOptions = [
    option("home", "дома", "🏠"),
    option("park", "в парке", "🌳"),
    option("school", "в школе", "🏫")
  ];

  var familyItems = [
    group("mama", "мама", "👩", 1, "person"),
    group("papa", "папа", "👨", 1, "person"),
    group("brat", "брат", "👦", 1, "person"),
    group("sestra", "сестра", "👧", 1, "person"),
    group("babushka", "бабушка", "👵", 1, "person"),
    group("dedushka", "дедушка", "👴", 1, "person"),
    group("drug", "друг", "🙂", 1, "person"),
    group("podruga", "подруга", "🙂", 1, "person")
  ];

  var lesson40Slides = [
    slide("u14-l40-1", "Моя семья", ["Моя семья."], focus(["👨‍👩‍👧‍👦"]), [line("Моя семья.", "moya_semya.mp3")], null, true),
    slide("u14-l40-2", "Мама", ["Это мама."], focus(["👩"]), [line("Это мама.", "eto_mama.mp3")], null, true),
    slide("u14-l40-3", "Папа", ["Это папа."], focus(["👨"]), [line("Это папа.", "eto_papa.mp3")], null, true),
    slide("u14-l40-4", "Брат", ["Это брат."], focus(["👦"]), [line("Это брат.", "eto_brat.mp3")], null, true),
    slide("u14-l40-5", "Сестра", ["Это сестра."], focus(["👧"]), [line("Это сестра.", "eto_sestra.mp3")], null, true),
    slide("u14-l40-6", "Бабушка", ["Это бабушка."], focus(["👵"]), [line("Это бабушка.", "eto_babushka.mp3")], null, true),
    slide("u14-l40-7", "Дедушка", ["Это дедушка."], focus(["👴"]), [line("Это дедушка.", "eto_dedushka.mp3")], null, true),
    slide("u14-l40-8", "Дома", ["Мама и папа дома."], focus(["👩", "👨", "🏠"]), [line("Мама и папа дома.", "u14_l40_mama_i_papa_doma.mp3")], [
      question("u14-l40-q1", "Кто дома?", familyCoreOptions, "mama", "👩👨🏠")
    ], true),
    slide("u14-l40-9", "Кто это?", ["Кто это?"], focus(["👦"]), [line("Кто это? Брат.", "u14_l40_kto_eto_brat.mp3")], [
      question("u14-l40-q2", "Кто это?", familyCoreOptions, "brat", "👦")
    ], true),
    slide("u14-l40-10", "Да или нет", ["Это брат?"], focus(["👧", "❌"]), [line("Это брат?", "u14_l40_eto_brat.mp3")], [
      question("u14-l40-q3", "Это брат?", yesNoOptions, "net", "👧")
    ], true),
    slide("u14-l40-11", "Читай", ["Это моя семья.", "Тут мама.", "Тут папа.", "Там брат.", "Там сестра.", "Все дома."], focus(["👨‍👩‍👧‍👦", "📍👩", "📍👨", "👉👦", "👉👧", "🏠"]), [line("Это моя семья. Тут мама. Тут папа. Там брат. Там сестра. Все дома.", "u14_l40_text.mp3")], [
      question("u14-l40-q4", "Где мама?", [option("tut", "тут", "📍"), option("tam", "там", "👉")], "tut", "👩"),
      question("u14-l40-q5", "Кто там?", familyCoreOptions, "brat", "👉"),
      question("u14-l40-q6", "Это моя семья?", yesNoOptions, "da", "👨‍👩‍👧‍👦")
    ], true),
    slide("u14-l40-12", "Отлично!", ["Отлично! ✅", "мама", "папа", "брат", "сестра"], wordList([{ text: "мама", emoji: "👩" }, { text: "папа", emoji: "👨" }, { text: "брат", emoji: "👦" }, { text: "сестра", emoji: "👧" }]), [line("Отлично! Мама. Папа. Брат. Сестра.", "u14_l40_final.mp3")], null, true)
  ];

  var lesson41Slides = [
    slide("u14-l41-1", "Брат", ["У меня есть брат."], focus(["🙂", "✅", "👦"]), [line("У меня есть брат.", "u_menya_est_brat.mp3")], null, true),
    slide("u14-l41-2", "Сестра", ["У меня есть сестра."], focus(["🙂", "✅", "👧"]), [line("У меня есть сестра.", "u_menya_est_sestra.mp3")], null, true),
    slide("u14-l41-3", "Бабушка", ["У меня есть бабушка."], focus(["🙂", "✅", "👵"]), [line("У меня есть бабушка.", "u_menya_est_babushka.mp3")], null, true),
    slide("u14-l41-4", "Дедушка", ["У меня есть дедушка."], focus(["🙂", "✅", "👴"]), [line("У меня есть дедушка.", "u_menya_est_dedushka.mp3")], null, true),
    slide("u14-l41-5", "Нет", ["У меня нет брата."], focus(["🙂", "❌", "👦"]), [line("У меня нет брата.", "u_menya_net_brata.mp3")], null, true),
    slide("u14-l41-6", "Нет", ["У меня нет сестры."], focus(["🙂", "❌", "👧"]), [line("У меня нет сестры.", "u_menya_net_sestry.mp3")], null, true),
    slide("u14-l41-7", "Мама и папа", ["У меня есть мама и папа."], focus(["🙂", "✅", "👩", "👨"]), [line("У меня есть мама и папа.", "u14_l41_mama_i_papa.mp3")], [
      question("u14-l41-q1", "Кто есть?", familyCoreOptions, "mama", "🙂✅")
    ], true),
    slide("u14-l41-8", "Семья", ["У меня есть семья."], focus(["🙂", "✅", "👨‍👩‍👧‍👦"]), [line("У меня есть семья.", "u14_l41_est_semya.mp3")], [
      question("u14-l41-q2", "Это моя семья?", yesNoOptions, "da", "👨‍👩‍👧‍👦")
    ], true),
    slide("u14-l41-9", "Да или нет", ["У меня есть брат."], focus(["🙂", "✅", "👦"]), [line("У меня есть брат.", "u_menya_est_brat.mp3")], [
      question("u14-l41-q3", "У меня есть брат?", yesNoOptions, "da", "👦")
    ], true),
    slide("u14-l41-10", "Да или нет", ["У меня есть сестра."], focus(["🙂", "❌", "👧"]), [line("У меня есть сестра.", "u14_l41_est_sestra_no.mp3")], [
      question("u14-l41-q4", "У меня есть сестра?", yesNoOptions, "net", "❌👧")
    ], true),
    slide("u14-l41-11", "Читай", ["У меня есть семья.", "У меня есть мама.", "У меня есть папа.", "У меня есть брат.", "У меня нет сестры."], focus(["👨‍👩‍👧‍👦", "🙂✅👩", "🙂✅👨", "🙂✅👦", "🙂❌👧"]), [line("У меня есть семья. У меня есть мама. У меня есть папа. У меня есть брат. У меня нет сестры.", "u14_l41_text.mp3")], [
      question("u14-l41-q5", "Кто у меня есть?", familyCoreOptions, "brat", "🙂✅"),
      question("u14-l41-q6", "У меня есть сестра?", yesNoOptions, "net", "🙂❌👧"),
      question("u14-l41-q7", "У меня есть семья?", yesNoOptions, "da", "👨‍👩‍👧‍👦")
    ], true),
    slide("u14-l41-12", "Отлично!", ["Отлично! ✅", "у меня есть брат", "у меня есть сестра", "у меня нет сестры"], wordList([{ text: "у меня есть брат", emoji: "✅👦" }, { text: "у меня есть сестра", emoji: "✅👧" }, { text: "у меня нет сестры", emoji: "❌👧" }]), [line("Отлично! У меня есть брат. У меня есть сестра. У меня нет сестры.", "u14_l41_final.mp3")], null, true)
  ];

  var lesson42Slides = [
    slide("u14-l42-1", "Помогает", ["Мама помогает."], focus(["👩", "🤝"]), [line("Мама помогает.", "mama_pomogaet.mp3")], null, true),
    slide("u14-l42-2", "Читает", ["Папа читает."], focus(["👨", "📖"]), [line("Папа читает.", "papa_chitaet.mp3")], null, true),
    slide("u14-l42-3", "Играет", ["Брат играет."], focus(["👦", "⚽"]), [line("Брат играет.", "brat_igraet.mp3")], null, true),
    slide("u14-l42-4", "Рисует", ["Сестра рисует."], focus(["👧", "🎨"]), [line("Сестра рисует.", "sestra_risuet.mp3")], null, true),
    slide("u14-l42-5", "Чай", ["Бабушка пьёт чай."], focus(["👵", "🍵"]), [line("Бабушка пьёт чай.", "babushka_pyot_chay.mp3")], null, true),
    slide("u14-l42-6", "Суп", ["Дедушка ест суп."], focus(["👴", "🍲"]), [line("Дедушка ест суп.", "dedushka_est_sup.mp3")], null, true),
    slide("u14-l42-7", "Друг", ["Друг идёт в парк."], focus(["🙂", "🚶‍➡️", "🌳"]), [line("Друг идёт в парк.", "drug_idyot_v_park.mp3")], null, true),
    slide("u14-l42-8", "Подруга", ["Подруга читает книгу."], focus(["🙂", "📖"]), [line("Подруга читает книгу.", "podruga_chitaet_knigu.mp3")], null, true),
    slide("u14-l42-9", "Что делает?", ["Что делает мама?"], focus(["👩", "🤝"]), [line("Что делает мама?", "u14_l42_chto_delaet_mama.mp3")], [
      question("u14-l42-q1", "Что делает мама?", actionOptions, "pomogaet", "👩")
    ], true),
    slide("u14-l42-10", "Кто?", ["Кто читает?"], focus(["👨", "📖"]), [line("Кто читает?", "u14_l42_kto_chitaet.mp3")], [
      question("u14-l42-q2", "Кто читает?", peopleOptions, "papa", "📖")
    ], true),
    slide("u14-l42-11", "Читай", ["Вечер.", "Моя семья дома.", "Мама помогает.", "Папа читает.", "Брат играет.", "Бабушка пьёт чай."], focus(["🌙", "👨‍👩‍👧‍👦🏠", "👩🤝", "👨📖", "👦⚽", "👵🍵"]), [line("Вечер. Моя семья дома. Мама помогает. Папа читает. Брат играет. Бабушка пьёт чай.", "u14_l42_text.mp3")], [
      question("u14-l42-q3", "Кто помогает?", peopleOptions, "mama", "🤝"),
      question("u14-l42-q4", "Что делает папа?", actionOptions, "chitaet", "👨"),
      question("u14-l42-q5", "Что пьёт бабушка?", [option("tea", "чай", "🍵"), option("soup", "суп", "🍲"), option("water", "вода", "💧")], "tea", "👵")
    ], true),
    slide("u14-l42-12", "Отлично!", ["Отлично! ✅", "помогает", "читает", "играет", "рисует"], wordList([{ text: "помогает", emoji: "🤝" }, { text: "читает", emoji: "📖" }, { text: "играет", emoji: "⚽" }, { text: "рисует", emoji: "🎨" }]), [line("Отлично! Помогает. Читает. Играет. Рисует.", "u14_l42_final.mp3")], null, true)
  ];

  var whoGame = {
    id: "unit-14-game-who",
    gameSlug: "unit-14-game-who",
    kind: "family-choice",
    icon: "👨‍👩‍👧‍👦",
    title: "Кто это?",
    finalTitle: "Отлично! Семья понятна! ✅",
    finalText: "семья",
    finalWords: ["мама", "папа", "брат", "сестра"],
    rounds: [
      choiceTask("u14-who-1", "Кто это?", group("mama", "мама", "👩", 1, "person"), "u14_game_who_mama.mp3", peopleOptions, "mama", "Да! Мама.", "Нет. Это мама."),
      choiceTask("u14-who-2", "Кто это?", group("papa", "папа", "👨", 1, "person"), "u14_game_who_papa.mp3", peopleOptions, "papa", "Да! Папа.", "Нет. Это папа."),
      choiceTask("u14-who-3", "Кто это?", group("brat", "брат", "👦", 1, "person"), "u14_game_who_brat.mp3", peopleOptions, "brat", "Да! Брат.", "Нет. Это брат."),
      choiceTask("u14-who-4", "Кто это?", group("sestra", "сестра", "👧", 1, "person"), "u14_game_who_sestra.mp3", peopleOptions, "sestra", "Да! Сестра.", "Нет. Это сестра."),
      choiceTask("u14-who-5", "Кто это?", group("babushka", "бабушка", "👵", 1, "person"), "u14_game_who_babushka.mp3", peopleOptions, "babushka", "Да! Бабушка.", "Нет. Это бабушка."),
      choiceTask("u14-who-6", "Кто это?", group("dedushka", "дедушка", "👴", 1, "person"), "u14_game_who_dedushka.mp3", peopleOptions, "dedushka", "Да! Дедушка.", "Нет. Это дедушка."),
      choiceTask("u14-who-7", "Кто это?", group("drug", "друг", "🙂", 1, "person"), "u14_game_who_drug.mp3", peopleOptions, "drug", "Да! Друг.", "Нет. Это друг."),
      choiceTask("u14-who-8", "Кто это?", group("podruga", "подруга", "🙂", 1, "person"), "u14_game_who_podruga.mp3", peopleOptions, "podruga", "Да! Подруга.", "Нет. Это подруга.")
    ]
  };

  var findFamilyGame = {
    id: "unit-14-game-family-find",
    gameSlug: "unit-14-game-family-find",
    kind: "family-find",
    icon: "🔎",
    title: "Моя семья",
    findTitle: "Моя семья",
    finalTitle: "Супер! Семья найдена! ✅",
    finalText: "моя семья",
    finalWords: ["мама", "папа", "брат", "сестра"],
    rounds: [
      commandTask("u14-find-1", "Найди маму.", "u14_find_mamu.mp3", familyItems, "mama", "Да! Мама.", "Нет. Нужна мама."),
      commandTask("u14-find-2", "Найди папу.", "u14_find_papu.mp3", familyItems, "papa", "Да! Папа.", "Нет. Нужен папа."),
      commandTask("u14-find-3", "Найди брата.", "u14_find_brata.mp3", familyItems, "brat", "Да! Брат.", "Нет. Нужен брат."),
      commandTask("u14-find-4", "Найди сестру.", "u14_find_sestru.mp3", familyItems, "sestra", "Да! Сестра.", "Нет. Нужна сестра."),
      commandTask("u14-find-5", "Найди бабушку.", "u14_find_babushku.mp3", familyItems, "babushka", "Да! Бабушка.", "Нет. Нужна бабушка."),
      commandTask("u14-find-6", "Найди дедушку.", "u14_find_dedushku.mp3", familyItems, "dedushka", "Да! Дедушка.", "Нет. Нужен дедушка."),
      commandTask("u14-find-7", "Найди друга.", "u14_find_druga.mp3", familyItems, "drug", "Да! Друг.", "Нет. Нужен друг."),
      commandTask("u14-find-8", "Найди подругу.", "u14_find_podrugu.mp3", familyItems, "podruga", "Да! Подруга.", "Нет. Нужна подруга.")
    ]
  };

  var haveGame = {
    id: "unit-14-game-have",
    gameSlug: "unit-14-game-have",
    kind: "family-have",
    icon: "🎒",
    title: "У меня есть?",
    finalTitle: "Отлично! Семья есть и нет! ✅",
    finalText: "у меня есть",
    finalWords: ["брат", "сестра", "бабушка"],
    rounds: [
      choiceTask("u14-have-1", "У меня есть брат.", group("have-brother", "у меня есть брат", "🙂✅👦", 1, "scene"), "u14_have_brat.mp3", yesNoOptions, "da", "Да! Брат есть.", "Нет. Брат есть."),
      choiceTask("u14-have-2", "У меня есть сестра.", group("have-sister", "у меня есть сестра", "🙂✅👧", 1, "scene"), "u14_have_sestra.mp3", yesNoOptions, "da", "Да! Сестра есть.", "Нет. Сестра есть."),
      choiceTask("u14-have-3", "У меня нет брата.", group("no-brother", "у меня нет брата", "🙂❌👦", 1, "scene"), "u14_no_brata.mp3", yesNoOptions, "da", "Да! Брата нет.", "Нет. Брата нет."),
      choiceTask("u14-have-4", "У меня нет сестры.", group("no-sister", "у меня нет сестры", "🙂❌👧", 1, "scene"), "u14_no_sestry.mp3", yesNoOptions, "da", "Да! Сестры нет.", "Нет. Сестры нет."),
      choiceTask("u14-have-5", "У меня есть бабушка.", group("have-grandma", "у меня есть бабушка", "🙂✅👵", 1, "scene"), "u14_have_babushka.mp3", yesNoOptions, "da", "Да! Бабушка есть.", "Нет. Бабушка есть."),
      choiceTask("u14-have-6", "У меня есть дедушка.", group("have-grandpa", "у меня есть дедушка", "🙂✅👴", 1, "scene"), "u14_have_dedushka.mp3", yesNoOptions, "da", "Да! Дедушка есть.", "Нет. Дедушка есть."),
      choiceTask("u14-have-7", "У меня есть мама и папа.", group("have-parents", "мама и папа", "🙂✅👩👨", 1, "scene"), "u14_have_mama_papa.mp3", yesNoOptions, "da", "Да! Мама и папа.", "Нет. Мама и папа есть."),
      choiceTask("u14-have-8", "У меня есть семья.", group("have-family", "семья", "🙂✅👨‍👩‍👧‍👦", 1, "scene"), "u14_have_family.mp3", yesNoOptions, "da", "Да! Семья есть.", "Нет. Семья есть.")
    ]
  };

  var actionGame = {
    id: "unit-14-game-actions",
    gameSlug: "unit-14-game-actions",
    kind: "family-action",
    icon: "🎬",
    title: "Кто что делает?",
    finalTitle: "Отлично! Семья действует! ✅",
    finalText: "кто что делает",
    finalWords: ["помогает", "читает", "играет"],
    rounds: [
      choiceTask("u14-action-1", "Что делает мама?", group("mama-help", "мама помогает", "👩🤝", 1, "scene"), "u14_action_mama.mp3", actionOptions, "pomogaet", "Да! Помогает.", "Нет. Мама помогает."),
      choiceTask("u14-action-2", "Что делает папа?", group("papa-read", "папа читает", "👨📖", 1, "scene"), "u14_action_papa.mp3", actionOptions, "chitaet", "Да! Читает.", "Нет. Папа читает."),
      choiceTask("u14-action-3", "Что делает брат?", group("brat-play", "брат играет", "👦⚽", 1, "scene"), "u14_action_brat.mp3", actionOptions, "igraet", "Да! Играет.", "Нет. Брат играет."),
      choiceTask("u14-action-4", "Что делает сестра?", group("sestra-draw", "сестра рисует", "👧🎨", 1, "scene"), "u14_action_sestra.mp3", actionOptions, "risuet", "Да! Рисует.", "Нет. Сестра рисует."),
      choiceTask("u14-action-5", "Что делает бабушка?", group("babushka-tea", "бабушка пьёт чай", "👵🍵", 1, "scene"), "u14_action_babushka.mp3", actionOptions, "pyot", "Да! Пьёт.", "Нет. Бабушка пьёт."),
      choiceTask("u14-action-6", "Что делает дедушка?", group("dedushka-soup", "дедушка ест суп", "👴🍲", 1, "scene"), "u14_action_dedushka.mp3", actionOptions, "est", "Да! Ест.", "Нет. Дедушка ест."),
      choiceTask("u14-action-7", "Что делает друг?", group("drug-park", "друг идёт в парк", "🙂🚶‍➡️🌳", 1, "scene"), "u14_action_drug.mp3", actionOptions, "idyot", "Да! Идёт.", "Нет. Друг идёт."),
      choiceTask("u14-action-8", "Что делает подруга?", group("podruga-read", "подруга читает книгу", "🙂📖", 1, "scene"), "u14_action_podruga.mp3", actionOptions, "chitaet", "Да! Читает.", "Нет. Подруга читает.")
    ]
  };

  var sceneSlides = [
    slide("u14-scene-1", "Сцена 1", ["Это моя семья.", "Мама дома.", "Папа читает.", "Брат играет."], focus(["👨‍👩‍👧‍👦", "👩🏠", "👨📖", "👦⚽"]), [line("Это моя семья. Мама дома. Папа читает. Брат играет.", "u14_scene_1.mp3")], [
      question("u14-scene-q1", "Кто дома?", peopleOptions, "mama", "🏠"),
      question("u14-scene-q2", "Что делает папа?", actionOptions, "chitaet", "👨"),
      question("u14-scene-q3", "Кто играет?", peopleOptions, "brat", "⚽")
    ], true),
    slide("u14-scene-2", "Сцена 2", ["Бабушка пьёт чай.", "Дедушка ест суп.", "Сестра рисует.", "Мне хорошо."], focus(["👵🍵", "👴🍲", "👧🎨", "🙂"]), [line("Бабушка пьёт чай. Дедушка ест суп. Сестра рисует. Мне хорошо.", "u14_scene_2.mp3")], [
      question("u14-scene-q4", "Кто пьёт чай?", peopleOptions, "babushka", "🍵"),
      question("u14-scene-q5", "Что ест дедушка?", [option("soup", "суп", "🍲"), option("tea", "чай", "🍵"), option("water", "вода", "💧")], "soup", "👴"),
      question("u14-scene-q6", "Что делает сестра?", actionOptions, "risuet", "👧")
    ], true),
    slide("u14-scene-3", "Сцена 3", ["День.", "Друг в парке.", "Подруга читает книгу.", "Я иду в парк."], focus(["☀️", "🙂🌳", "🙂📖", "🙂🚶‍➡️🌳"]), [line("День. Друг в парке. Подруга читает книгу. Я иду в парк.", "u14_scene_3.mp3")], [
      question("u14-scene-q7", "Где друг?", placeOptions, "park", "🙂"),
      question("u14-scene-q8", "Что делает подруга?", actionOptions, "chitaet", "🙂"),
      question("u14-scene-q9", "Куда я иду?", [option("park", "в парк", "🌳"), option("home", "домой", "🏠"), option("school", "в школу", "🏫")], "park", "🙂")
    ], true),
    slide("u14-scene-4", "Отлично!", ["Отлично! ✅", "Ты читаешь.", "Семья."], wordList([{ text: "моя семья", emoji: "👨‍👩‍👧‍👦" }, { text: "мама", emoji: "👩" }, { text: "папа", emoji: "👨" }]), [line("Отлично! Ты читаешь. Семья.", "u14_scene_final.mp3")], null, true)
  ];

  var helpGame = {
    id: "unit-14-game-help-family",
    gameSlug: "unit-14-game-help-family",
    kind: "family-help",
    icon: "🤝",
    title: "Помоги семье",
    finalTitle: "Отлично! Семье помогли! ✅",
    finalText: "помоги",
    finalWords: ["чай", "суп", "вода"],
    rounds: [
      choiceTask("u14-help-1", "Бабушка хочет чай.", group("grandma-tea", "бабушка хочет чай", "👵🍵", 1, "scene"), "u14_help_babushka_tea.mp3", helpOptions, "tea", "Да! Чай.", "Нет. Нужен чай."),
      choiceTask("u14-help-2", "Дедушка хочет суп.", group("grandpa-soup", "дедушка хочет суп", "👴🍲", 1, "scene"), "u14_help_dedushka_soup.mp3", helpOptions, "soup", "Да! Суп.", "Нет. Нужен суп."),
      choiceTask("u14-help-3", "Брат хочет мяч.", group("brother-ball", "брат хочет мяч", "👦⚽", 1, "scene"), "u14_help_brat_ball.mp3", helpOptions, "ball", "Да! Мяч.", "Нет. Нужен мяч."),
      choiceTask("u14-help-4", "Сестра хочет книгу.", group("sister-book", "сестра хочет книгу", "👧📖", 1, "scene"), "u14_help_sestra_book.mp3", helpOptions, "book", "Да! Книга.", "Нет. Нужна книга."),
      choiceTask("u14-help-5", "Мама говорит: дай воду, пожалуйста.", group("mama-water", "дай воду, пожалуйста", "👩💧", 1, "scene"), "u14_help_mama_water.mp3", helpOptions, "water", "Да! Вода.", "Нет. Нужна вода."),
      choiceTask("u14-help-6", "Папа устал.", group("papa-tired", "папа устал", "👨😴", 1, "scene"), "u14_help_papa_sit.mp3", helpOptions, "sit", "Да! Сядь.", "Нет. Сядь."),
      choiceTask("u14-help-7", "Мне холодно.", group("cold", "холодно", "🥶", 1, "scene"), "u14_help_cold_jacket.mp3", helpOptions, "jacket", "Да! Куртка.", "Нет. Нужна куртка."),
      choiceTask("u14-help-8", "Мне плохо.", group("bad", "мне плохо", "🙁", 1, "scene"), "u14_help_bad_water.mp3", helpOptions, "water", "Да! Вода.", "Нет. Нужна вода.")
    ]
  };

  var familyMapGame = {
    id: "unit-14-game-family-map",
    gameSlug: "unit-14-game-family-map",
    kind: "family-map",
    icon: "🗺️",
    title: "Карта семьи",
    mapTitle: "Карта семьи",
    finalTitle: "Отлично! Карта семьи готова! 🏆",
    finalText: "семья · места",
    finalWords: ["мама", "папа", "брат", "сестра"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("home", "дом", "🏠", 1, "place", 0, 4),
      group("park", "парк", "🌳", 1, "place", 4, 0),
      group("school", "школа", "🏫", 1, "place", 0, 0),
      group("cafe", "кафе", "🏢☕", 1, "place", 4, 4),
      group("mama", "мама", "👩", 1, "person", 1, 3),
      group("papa", "папа", "👨", 1, "person", 2, 2),
      group("brat", "брат", "👦", 1, "person", 3, 1),
      group("sestra", "сестра", "👧", 1, "person", 1, 1),
      group("babushka", "бабушка", "👵", 1, "person", 3, 3),
      group("dedushka", "дедушка", "👴", 1, "person", 2, 0),
      group("drug", "друг", "🙂", 1, "person", 4, 2),
      group("podruga", "подруга", "🙂", 1, "person", 2, 4)
    ],
    rounds: [
      { id: "u14-map-1", command: "Найди маму.", text: "Найди маму.", audio: audio("u14_map_find_mama.mp3"), target: "mama", hint: "Нужна мама.", correctFeedback: "Да! Мама." },
      { id: "u14-map-2", command: "Найди папу.", text: "Найди папу.", audio: audio("u14_map_find_papa.mp3"), target: "papa", hint: "Нужен папа.", correctFeedback: "Да! Папа." },
      { id: "u14-map-3", command: "Найди брата.", text: "Найди брата.", audio: audio("u14_map_find_brat.mp3"), target: "brat", hint: "Нужен брат.", correctFeedback: "Да! Брат." },
      { id: "u14-map-4", command: "Найди сестру.", text: "Найди сестру.", audio: audio("u14_map_find_sestra.mp3"), target: "sestra", hint: "Нужна сестра.", correctFeedback: "Да! Сестра." },
      { id: "u14-map-5", command: "Найди бабушку.", text: "Найди бабушку.", audio: audio("u14_map_find_babushka.mp3"), target: "babushka", hint: "Нужна бабушка.", correctFeedback: "Да! Бабушка." },
      { id: "u14-map-6", command: "Найди дедушку.", text: "Найди дедушку.", audio: audio("u14_map_find_dedushka.mp3"), target: "dedushka", hint: "Нужен дедушка.", correctFeedback: "Да! Дедушка." },
      { id: "u14-map-7", command: "Иди к другу.", text: "Иди к другу.", audio: audio("u14_map_go_drug.mp3"), target: "drug", hint: "Нужен друг.", correctFeedback: "Да! Друг." },
      { id: "u14-map-8", command: "Иди к подруге.", text: "Иди к подруге.", audio: audio("u14_map_go_podruga.mp3"), target: "podruga", hint: "Нужна подруга.", correctFeedback: "Да! Подруга." },
      { id: "u14-map-9", command: "Мама дома. Иди домой.", text: "Мама дома. Иди домой.", audio: audio("u14_map_mama_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." },
      { id: "u14-map-10", command: "Друг в парке. Иди в парк.", text: "Друг в парке. Иди в парк.", audio: audio("u14_map_drug_park.mp3"), target: "park", hint: "Нужен парк.", correctFeedback: "Да! Парк." }
    ]
  };

  var UNIT14_GAMES = {
    whoGame: whoGame,
    findFamilyGame: findFamilyGame,
    haveGame: haveGame,
    actionGame: actionGame,
    helpGame: helpGame,
    familyMapGame: familyMapGame
  };

  root.LexiLandUnit14Lesson = {
    id: "level-0-unit-14-family-people",
    order: 16,
    menuLabel: "Юнит 14",
    shortTitle: "Семья",
    title: "Юнит 14: Семья и люди",
    subtitle: "Семья, люди, действия",
    level: "Уровень 0",
    coverEmoji: "👨‍👩‍👧‍👦",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-40-my-family", "Урок 40: Моя семья", "👨‍👩‍👧‍👦", "Урок 40: Моя семья", lesson40Slides),
      unit("lesson-41-u-menya-est-brat", "Урок 41: У меня есть брат", "👦", "Урок 41: У меня есть брат", lesson41Slides),
      unit("lesson-42-family-actions", "Урок 42: Кто что делает?", "🎬", "Урок 42: Кто что делает?", lesson42Slides),
      gameUnit("unit-14-game-who", "Игра: Кто это?", "👨‍👩‍👧‍👦", whoGame),
      gameUnit("unit-14-game-family-find", "Игра 2: Моя семья", "🔎", findFamilyGame),
      gameUnit("unit-14-game-have", "Игра 3: У меня есть?", "🎒", haveGame),
      gameUnit("unit-14-game-actions", "Игра 4: Кто что делает?", "🎬", actionGame),
      unit("unit-14-game-scene", "Игра 5: Семейная сцена", "📖", "Игра 5: Семейная сцена", sceneSlides),
      gameUnit("unit-14-game-help-family", "Игра 6: Помоги семье", "🤝", helpGame),
      gameUnit("unit-14-game-family-map", "Игра 7: Карта семьи", "🗺️", familyMapGame)
    ]
  };

  root.LexiLandUnit14Games = UNIT14_GAMES;
  root.LexiLandUnit14 = root.LexiLandUnit14Lesson;
}(typeof window !== "undefined" ? window : globalThis));
