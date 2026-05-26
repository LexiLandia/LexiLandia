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

  function m(word, emojiText) {
    return {
      word: word,
      emoji: emojiText,
      translation: ""
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

  var meanings = {
    "я": m("я", "🙂👈"),
    "ты": m("ты", "🙂👉"),
    "хочу": m("хочу", "🙏"),
    "дай": m("дай", "🤲"),
    "пожалуйста": m("пожалуйста", "🙏"),
    "на": m("на", "🤲➡️🙂"),
    "спасибо": m("спасибо", "😊"),
    "у": m("у", "🎒"),
    "меня": m("меня", "🙂"),
    "есть": m("есть", "✅"),
    "нет": m("нет", "❌"),
    "воду": m("воду", "💧"),
    "воды": m("воды", "💧❌"),
    "вода": m("вода", "💧"),
    "хлеб": m("хлеб", "🍞"),
    "хлеба": m("хлеба", "🍞❌"),
    "яблоко": m("яблоко", "🍎"),
    "яблока": m("яблока", "🍎❌"),
    "мяч": m("мяч", "⚽"),
    "мяча": m("мяча", "⚽❌"),
    "книга": m("книга", "📚"),
    "книгу": m("книгу", "📚"),
    "книги": m("книги", "📚❌"),
    "телефон": m("телефон", "📱"),
    "телефона": m("телефона", "📱❌"),
    "магазин": m("магазин", "🏪"),
    "что": m("что", "❓📦"),
    "да": m("да", "✅")
  };

  var yesNoOptions = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var objectOptions = [
    option("vodu", "воду", "💧"),
    option("hleb", "хлеб", "🍞"),
    option("yabloko", "яблоко", "🍎"),
    option("myach", "мяч", "⚽"),
    option("knigu", "книгу", "📚"),
    option("telefon", "телефон", "📱")
  ];

  var objectEmojiOptions = [
    option("vodu", "", "💧"),
    option("hleb", "", "🍞"),
    option("yabloko", "", "🍎"),
    option("myach", "", "⚽"),
    option("knigu", "", "📚"),
    option("telefon", "", "📱")
  ];

  var wantPhraseOptions = [
    option("ya-hochu-vodu", "Я хочу воду.", "💧"),
    option("ya-hochu-hleb", "Я хочу хлеб.", "🍞"),
    option("ya-hochu-yabloko", "Я хочу яблоко.", "🍎"),
    option("ya-hochu-myach", "Я хочу мяч.", "⚽"),
    option("ya-hochu-knigu", "Я хочу книгу.", "📚"),
    option("ya-hochu-telefon", "Я хочу телефон.", "📱")
  ];

  var politeOptions = [
    option("dai-vodu", "Дай воду, пожалуйста.", "💧"),
    option("dai-hleb", "Дай хлеб, пожалуйста.", "🍞"),
    option("dai-yabloko", "Дай яблоко, пожалуйста.", "🍎"),
    option("dai-knigu", "Дай книгу, пожалуйста.", "📚"),
    option("dai-myach", "Дай мяч, пожалуйста.", "⚽"),
    option("dai-telefon", "Дай телефон, пожалуйста.", "📱")
  ];

  var thanksOptions = [
    option("spasibo", "Спасибо.", "😊"),
    option("dai", "Дай.", "🤲"),
    option("ya-hochu", "Я хочу.", "🙋🙏")
  ];

  var havePhraseOptions = [
    option("est-telefon", "У меня есть телефон.", "📱"),
    option("est-kniga", "У меня есть книга.", "📚"),
    option("est-myach", "У меня есть мяч.", "⚽"),
    option("est-voda", "У меня есть вода.", "💧"),
    option("net-vody", "У меня нет воды.", "💧❌"),
    option("net-myacha", "У меня нет мяча.", "⚽❌"),
    option("net-knigi", "У меня нет книги.", "📚❌"),
    option("net-telefona", "У меня нет телефона.", "📱❌")
  ];

  var dictionary = [
    entry("u4-ya", "я", "🙂👈", "word", "ya.mp3"),
    entry("u4-hochu", "хочу", "🙏", "word", "hochu.mp3"),
    entry("u4-ya-hochu", "я хочу", "🙋🙏", "chunk", "ya_hochu.mp3"),
    entry("u4-dai", "дай", "🤲", "word", "dai.mp3"),
    entry("u4-pozhaluysta", "пожалуйста", "🙏", "word", "pozhaluysta.mp3"),
    entry("u4-na", "на", "🤲➡️🙂", "word", "na_take.mp3"),
    entry("u4-spasibo", "спасибо", "😊", "word", "spasibo.mp3"),
    entry("u4-u-menya-est", "у меня есть", "🎒✅", "chunk", "u_menya_est.mp3"),
    entry("u4-u-menya-net", "у меня нет", "🎒❌", "chunk", "u_menya_net.mp3"),
    entry("u4-voda", "вода", "💧", "word", "voda.mp3"),
    entry("u4-vodu", "воду", "💧", "word", "vodu.mp3"),
    entry("u4-vody", "воды", "💧❌", "word", "vody.mp3"),
    entry("u4-hleb", "хлеб", "🍞", "word", "hleb.mp3"),
    entry("u4-hleba", "хлеба", "🍞❌", "word", "hleba.mp3"),
    entry("u4-yabloko", "яблоко", "🍎", "word", "yabloko.mp3"),
    entry("u4-yabloka", "яблока", "🍎❌", "word", "yabloka.mp3"),
    entry("u4-kniga", "книга", "📚", "word", "kniga.mp3"),
    entry("u4-knigu", "книгу", "📚", "word", "knigu.mp3"),
    entry("u4-knigi", "книги", "📚❌", "word", "knigi.mp3"),
    entry("u4-myach", "мяч", "⚽", "word", "myach.mp3"),
    entry("u4-myacha", "мяча", "⚽❌", "word", "myacha.mp3"),
    entry("u4-telefon", "телефон", "📱", "word", "telefon.mp3"),
    entry("u4-telefona", "телефона", "📱❌", "word", "telefona.mp3"),
    entry("u4-magazin", "магазин", "🏪", "word", "magazin.mp3"),
    entry("u4-da", "да", "✅", "word", "da.mp3"),
    entry("u4-net", "нет", "❌", "word", "net.mp3")
  ];

  function phraseOptions(correct, others) {
    var lookup = {};
    wantPhraseOptions.forEach(function (item) {
      lookup[item.id] = item;
    });
    return [lookup[correct]].concat((others || []).map(function (id) {
      return lookup[id];
    }));
  }

  function politeChoice(correct, others) {
    var lookup = {};
    politeOptions.forEach(function (item) {
      lookup[item.id] = item;
    });
    return [lookup[correct]].concat((others || []).map(function (id) {
      return lookup[id];
    }));
  }

  function haveChoice(correct, others) {
    var lookup = {};
    havePhraseOptions.forEach(function (item) {
      lookup[item.id] = item;
    });
    return [lookup[correct]].concat((others || []).map(function (id) {
      return lookup[id];
    }));
  }

  var lesson10Slides = [
    slide("u4-l10-1", "Я хочу", ["Я хочу."], focus(["🙂👈", "🙏", "💧", "🍞", "🍎", "⚽"]), [line("Я хочу.", "ya_hochu.mp3")], null, true),
    slide("u4-l10-2", "я", ["я", "я здесь"], focus(["🙂👈", "📍"]), [line("я", "ya.mp3"), line("я здесь", "ya_zdes.mp3")], null, true),
    slide("u4-l10-3", "хочу", ["хочу", "🙂 🙏"], focus(["🙂", "🙏", "💧"]), [line("хочу", "hochu.mp3")], null, true),
    slide("u4-l10-4", "я хочу", ["я", "хочу", "Я хочу."], focus(["🙂👈", "➕", "🙏"]), [line("я хочу", "ya_hochu.mp3")], null, true),
    slide("u4-l10-5", "воду", ["Я хочу воду."], focus(["🙂🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], null, true),
    slide("u4-l10-6", "хлеб", ["Я хочу хлеб."], focus(["🙂🙏", "🍞"]), [line("Я хочу хлеб.", "ya_hochu_hleb.mp3")], null, true),
    slide("u4-l10-7", "яблоко", ["Я хочу яблоко."], focus(["🙂🙏", "🍎"]), [line("Я хочу яблоко.", "ya_hochu_yabloko.mp3")], null, true),
    slide("u4-l10-8", "мяч", ["Я хочу мяч."], focus(["🙂🙏", "⚽"]), [line("Я хочу мяч.", "ya_hochu_myach.mp3")], null, true),
    slide("u4-l10-9", "Найди", ["Я хочу воду."], focus(["🙂🙏", "💧"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], [question("u4-l10-q1", "Что?", objectEmojiOptions.slice(0, 4), "vodu", "💧")], true),
    slide("u4-l10-10", "Найди", ["Я хочу хлеб."], focus(["🙂🙏", "🍞"]), [line("Я хочу хлеб.", "ya_hochu_hleb.mp3")], [question("u4-l10-q2", "Что?", [option("hleb", "", "🍞"), option("vodu", "", "💧"), option("yabloko", "", "🍎"), option("myach", "", "⚽")], "hleb", "🍞")], true),
    slide("u4-l10-11", "Найди", ["Я хочу яблоко."], focus(["🙂🙏", "🍎"]), [line("Я хочу яблоко.", "ya_hochu_yabloko.mp3")], [question("u4-l10-q3", "Что?", [option("yabloko", "", "🍎"), option("hleb", "", "🍞"), option("telefon", "", "📱"), option("vodu", "", "💧")], "yabloko", "🍎")], true),
    slide("u4-l10-12", "Найди", ["Я хочу мяч."], focus(["🙂🙏", "⚽"]), [line("Я хочу мяч.", "ya_hochu_myach.mp3")], [question("u4-l10-q4", "Что?", [option("myach", "", "⚽"), option("knigu", "", "📚"), option("vodu", "", "💧"), option("yabloko", "", "🍎")], "myach", "⚽")], true),
    slide("u4-l10-13", "Да или нет", ["Я хочу воду."], focus(["💧", "✅"]), [line("Я хочу воду.", "ya_hochu_vodu.mp3")], [question("u4-l10-q5", "Я хочу воду?", yesNoOptions, "da", "💧")], true),
    slide("u4-l10-14", "Да или нет", ["Я хочу хлеб."], focus(["🍎", "❌"]), [line("Я хочу хлеб.", "ya_hochu_hleb.mp3")], [question("u4-l10-q6", "Я хочу хлеб?", yesNoOptions, "net", "🍎")], true),
    slide("u4-l10-15", "Читай", ["Я хочу воду.", "Я хочу хлеб.", "Я хочу яблоко.", "Я хочу мяч."], focus(["💧", "🍞", "🍎", "⚽"]), [line("Я хочу воду. Я хочу хлеб. Я хочу яблоко. Я хочу мяч.", "lesson_10_text.mp3")], [
      question("u4-l10-q7", "Что я хочу?", objectOptions.slice(0, 4), "vodu", "💧"),
      question("u4-l10-q8", "Что я хочу?", [option("hleb", "хлеб", "🍞"), option("yabloko", "яблоко", "🍎"), option("vodu", "воду", "💧")], "hleb", "🍞"),
      question("u4-l10-q9", "Я хочу мяч?", yesNoOptions, "da", "⚽")
    ], true),
    slide("u4-l10-16", "Отлично!", ["Отлично! ✅", "Я хочу", "воду", "хлеб", "яблоко", "мяч"], wordList([{ text: "Я хочу", emoji: "🙋🙏" }, { text: "воду", emoji: "💧" }, { text: "хлеб", emoji: "🍞" }, { text: "яблоко", emoji: "🍎" }, { text: "мяч", emoji: "⚽" }]), [line("Отлично! Я хочу.", "u4_l10_final.mp3")], null, true)
  ];

  var lesson11Slides = [
    slide("u4-l11-1", "Дай, пожалуйста", ["Дай, пожалуйста."], focus(["🤲", "🙏", "💧"]), [line("Дай, пожалуйста.", "dai_pozhaluysta.mp3")], null, true),
    slide("u4-l11-2", "дай", ["Дай."], emoji("🤲"), [line("Дай.", "dai.mp3")], null, true),
    slide("u4-l11-3", "пожалуйста", ["пожалуйста"], emoji("🙏"), [line("пожалуйста", "pozhaluysta.mp3")], null, true),
    slide("u4-l11-4", "воду", ["Дай воду, пожалуйста."], focus(["🤲", "💧", "🙏"]), [line("Дай воду, пожалуйста.", "dai_vodu_pozhaluysta.mp3")], null, true),
    slide("u4-l11-5", "хлеб", ["Дай хлеб, пожалуйста."], focus(["🤲", "🍞", "🙏"]), [line("Дай хлеб, пожалуйста.", "dai_hleb_pozhaluysta.mp3")], null, true),
    slide("u4-l11-6", "яблоко", ["Дай яблоко, пожалуйста."], focus(["🤲", "🍎", "🙏"]), [line("Дай яблоко, пожалуйста.", "dai_yabloko_pozhaluysta.mp3")], null, true),
    slide("u4-l11-7", "мяч", ["Дай мяч, пожалуйста."], focus(["🤲", "⚽", "🙏"]), [line("Дай мяч, пожалуйста.", "dai_myach_pozhaluysta.mp3")], null, true),
    slide("u4-l11-8", "книгу", ["Дай книгу, пожалуйста."], focus(["🤲", "📚", "🙏"]), [line("Дай книгу, пожалуйста.", "dai_knigu_pozhaluysta.mp3")], null, true),
    slide("u4-l11-9", "телефон", ["Дай телефон, пожалуйста."], focus(["🤲", "📱", "🙏"]), [line("Дай телефон, пожалуйста.", "dai_telefon_pozhaluysta.mp3")], null, true),
    slide("u4-l11-10", "На", ["На."], focus(["🤲➡️🙂", "💧"]), [line("На.", "na_take.mp3")], null, true),
    slide("u4-l11-11", "Спасибо", ["Спасибо."], emoji("😊"), [line("Спасибо.", "spasibo.mp3")], null, true),
    slide("u4-l11-12", "Диалог", ["А: Дай воду, пожалуйста.", "Б: На.", "А: Спасибо."], focus(["🤲💧🙏", "🤲➡️🙂", "😊"]), [line("А: Дай воду, пожалуйста. Б: На. А: Спасибо.", "dialog_dai_vodu_na_spasibo.mp3")], [
      question("u4-l11-q1", "Что дать?", [option("vodu", "воду", "💧"), option("hleb", "хлеб", "🍞"), option("myach", "мяч", "⚽")], "vodu", "💧"),
      question("u4-l11-q2", "После «На»?", [option("spasibo", "спасибо", "😊"), option("dai", "дай", "🤲"), option("hochu", "хочу", "🙏")], "spasibo", "🤲➡️🙂")
    ], true),
    slide("u4-l11-13", "Найди", ["Дай хлеб, пожалуйста."], focus(["🤲", "🍞", "🙏"]), [line("Дай хлеб, пожалуйста.", "dai_hleb_pozhaluysta.mp3")], [question("u4-l11-q3", "Что?", [option("hleb", "", "🍞"), option("voda", "", "💧"), option("kniga", "", "📚"), option("myach", "", "⚽")], "hleb", "🍞")], true),
    slide("u4-l11-14", "Найди", ["Дай мяч, пожалуйста."], focus(["🤲", "⚽", "🙏"]), [line("Дай мяч, пожалуйста.", "dai_myach_pozhaluysta.mp3")], [question("u4-l11-q4", "Что?", [option("myach", "", "⚽"), option("hleb", "", "🍞"), option("telefon", "", "📱"), option("yabloko", "", "🍎")], "myach", "⚽")], true),
    slide("u4-l11-15", "Порядок", ["Дай воду, пожалуйста.", "На.", "Спасибо."], wordList([{ text: "Дай воду, пожалуйста.", emoji: "🤲💧🙏" }, { text: "На.", emoji: "🤲➡️🙂" }, { text: "Спасибо.", emoji: "😊" }]), [line("Дай воду, пожалуйста. На. Спасибо.", "dai_vodu_na_spasibo.mp3")], [
      question("u4-l11-q5", "1", [option("dai-vodu", "Дай воду, пожалуйста.", "🤲"), option("na", "На.", "🤲➡️🙂"), option("spasibo", "Спасибо.", "😊")], "dai-vodu"),
      question("u4-l11-q6", "2", [option("na", "На.", "🤲➡️🙂"), option("spasibo", "Спасибо.", "😊"), option("dai-vodu", "Дай воду, пожалуйста.", "🤲")], "na"),
      question("u4-l11-q7", "3", [option("spasibo", "Спасибо.", "😊"), option("dai-vodu", "Дай воду, пожалуйста.", "🤲"), option("na", "На.", "🤲➡️🙂")], "spasibo")
    ], true),
    slide("u4-l11-16", "Читай", ["Я хочу воду.", "Дай воду, пожалуйста.", "На.", "Спасибо."], focus(["🙂🙏💧", "🤲💧🙏", "🤲➡️🙂", "😊"]), [line("Я хочу воду. Дай воду, пожалуйста. На. Спасибо.", "dialog_ya_hochu_vodu_dai_na_spasibo.mp3")], [
      question("u4-l11-q8", "Что я хочу?", [option("vodu", "воду", "💧"), option("hleb", "хлеб", "🍞"), option("telefon", "телефон", "📱")], "vodu", "💧")
    ], true),
    slide("u4-l11-17", "Отлично!", ["Отлично! ✅", "дай", "пожалуйста", "на", "спасибо"], wordList([{ text: "дай", emoji: "🤲" }, { text: "пожалуйста", emoji: "🙏" }, { text: "на", emoji: "🤲➡️🙂" }, { text: "спасибо", emoji: "😊" }]), [line("Отлично! Спасибо.", "u4_l11_final.mp3")], null, true)
  ];

  var lesson12Slides = [
    slide("u4-l12-1", "У меня есть / нет", ["У меня есть.", "У меня нет."], focus(["🙂🎒✅", "🙂🎒❌"]), [line("У меня есть. У меня нет.", "u_menya_est_u_menya_net.mp3")], null, true),
    slide("u4-l12-2", "телефон", ["У меня есть телефон."], focus(["✅", "🙂", "📱"]), [line("У меня есть телефон.", "u_menya_est_telefon.mp3")], null, true),
    slide("u4-l12-3", "книга", ["У меня есть книга."], focus(["✅", "🙂", "📚"]), [line("У меня есть книга.", "u_menya_est_kniga.mp3")], null, true),
    slide("u4-l12-4", "мяч", ["У меня есть мяч."], focus(["✅", "🙂", "⚽"]), [line("У меня есть мяч.", "u_menya_est_myach.mp3")], null, true),
    slide("u4-l12-5", "телефона", ["У меня нет телефона."], focus(["❌", "📱"]), [line("У меня нет телефона.", "u_menya_net_telefona.mp3")], null, true),
    slide("u4-l12-6", "книги", ["У меня нет книги."], focus(["❌", "📚"]), [line("У меня нет книги.", "u_menya_net_knigi.mp3")], null, true),
    slide("u4-l12-7", "мяча", ["У меня нет мяча."], focus(["❌", "⚽"]), [line("У меня нет мяча.", "u_menya_net_myacha.mp3")], null, true),
    slide("u4-l12-8", "воды", ["У меня нет воды."], focus(["❌", "💧"]), [line("У меня нет воды.", "u_menya_net_vody.mp3")], null, true),
    slide("u4-l12-9", "Смотри", ["У меня есть мяч.", "У меня нет мяча."], focus(["✅⚽", "❌⚽"]), [line("У меня есть мяч. У меня нет мяча.", "u_menya_est_myach_u_menya_net_myacha.mp3")], null, true),
    slide("u4-l12-10", "Да или нет", ["У меня есть телефон."], focus(["📱", "✅"]), [line("У меня есть телефон.", "u_menya_est_telefon.mp3")], [question("u4-l12-q1", "У меня есть телефон?", yesNoOptions, "da", "📱")], true),
    slide("u4-l12-11", "Да или нет", ["У меня есть книга."], focus(["🍎", "⚽", "❌📚"]), [line("У меня есть книга.", "u_menya_est_kniga.mp3")], [question("u4-l12-q2", "У меня есть книга?", yesNoOptions, "net", "🍎⚽")], true),
    slide("u4-l12-12", "Найди", ["У меня есть мяч."], focus(["🙂", "⚽"]), [line("У меня есть мяч.", "u_menya_est_myach.mp3")], [question("u4-l12-q3", "Что?", haveChoice("est-myach", ["net-myacha", "est-voda"]), "est-myach", "⚽")], true),
    slide("u4-l12-13", "Найди", ["У меня нет воды."], focus(["🙂", "❌", "💧"]), [line("У меня нет воды.", "u_menya_net_vody.mp3")], [question("u4-l12-q4", "Что?", haveChoice("net-vody", ["est-voda", "est-telefon"]), "net-vody", "❌💧")], true),
    slide("u4-l12-14", "Читай", ["У меня есть телефон.", "У меня есть книга.", "У меня нет мяча.", "Я хочу мяч."], focus(["📱", "📚", "❌⚽", "🙂🙏⚽"]), [line("У меня есть телефон. У меня есть книга. У меня нет мяча. Я хочу мяч.", "lesson_12_text.mp3")], [
      question("u4-l12-q5", "Что есть?", [option("telefon", "телефон", "📱"), option("myach", "мяч", "⚽"), option("voda", "вода", "💧")], "telefon", "📱"),
      question("u4-l12-q6", "Чего нет?", [option("myacha", "мяча", "⚽❌"), option("knigi", "книги", "📚❌"), option("hleba", "хлеба", "🍞❌")], "myacha", "❌⚽")
    ], true),
    slide("u4-l12-15", "Читай", ["У меня нет воды.", "Я хочу воду."], focus(["❌💧", "🙂🙏💧"]), [line("У меня нет воды. Я хочу воду.", "u_menya_net_vody_ya_hochu_vodu.mp3")], [
      question("u4-l12-q7", "Что я хочу?", [option("vodu", "воду", "💧"), option("hleb", "хлеб", "🍞"), option("telefon", "телефон", "📱")], "vodu", "💧")
    ], true),
    slide("u4-l12-16", "Отлично!", ["Отлично! ✅", "У меня есть", "У меня нет", "Я хочу"], wordList([{ text: "у меня есть", emoji: "🎒✅" }, { text: "у меня нет", emoji: "🎒❌" }, { text: "Я хочу", emoji: "🙋🙏" }, { text: "телефон", emoji: "📱" }, { text: "книга", emoji: "📚" }]), [line("Отлично! У меня есть. У меня нет. Я хочу.", "u4_l12_final.mp3")], null, true)
  ];

  var game1Tasks = [
    gameTask("u4g1-1", "Я хочу воду.", "Найди:", "ya_hochu_vodu.mp3", objectEmojiOptions.slice(0, 4), "vodu", "Я хочу воду.", "✅ Да! Я хочу воду.", "❌ Нет. Читай ещё раз."),
    gameTask("u4g1-2", "Я хочу хлеб.", "Найди:", "ya_hochu_hleb.mp3", [option("hleb", "", "🍞"), option("vodu", "", "💧"), option("yabloko", "", "🍎"), option("telefon", "", "📱")], "hleb", "Я хочу хлеб.", "✅ Да! Я хочу хлеб.", "❌ Нет. Читай ещё раз."),
    gameTask("u4g1-3", "Я хочу яблоко.", "Найди:", "ya_hochu_yabloko.mp3", [option("yabloko", "", "🍎"), option("myach", "", "⚽"), option("knigu", "", "📚"), option("hleb", "", "🍞")], "yabloko", "Я хочу яблоко.", "✅ Да! Я хочу яблоко.", "❌ Нет. Читай ещё раз."),
    gameTask("u4g1-4", "Я хочу мяч.", "Найди:", "ya_hochu_myach.mp3", [option("myach", "", "⚽"), option("vodu", "", "💧"), option("telefon", "", "📱"), option("yabloko", "", "🍎")], "myach", "Я хочу мяч.", "✅ Да! Я хочу мяч.", "❌ Нет. Читай ещё раз."),
    gameTask("u4g1-5", "Я хочу книгу.", "Найди:", "ya_hochu_knigu.mp3", [option("knigu", "", "📚"), option("telefon", "", "📱"), option("hleb", "", "🍞"), option("myach", "", "⚽")], "knigu", "Я хочу книгу.", "✅ Да! Я хочу книгу.", "❌ Нет. Читай ещё раз."),
    gameTask("u4g1-6", "Я хочу телефон.", "Найди:", "ya_hochu_telefon.mp3", [option("telefon", "", "📱"), option("knigu", "", "📚"), option("vodu", "", "💧"), option("yabloko", "", "🍎")], "telefon", "Я хочу телефон.", "✅ Да! Я хочу телефон.", "❌ Нет. Читай ещё раз.")
  ];

  var game1 = {
    id: "unit-4-game-ya-hochu",
    gameSlug: "unit-4-game-ya-hochu",
    title: "Игра: Я хочу",
    finalTitle: "Отлично! Ты говоришь: Я хочу! 🏆",
    finalText: "Я хочу",
    finalWords: ["Я хочу воду.", "Я хочу хлеб.", "Я хочу яблоко.", "Я хочу мяч."],
    stages: [
      {
        type: "read_to_image",
        title: "Я хочу",
        instruction: "Читай:",
        tasks: game1Tasks
      }
    ]
  };

  var shopRounds = [
    ["vodu", "💧", "ya-hochu-vodu", "dai-vodu", "Я хочу воду.", "Дай воду, пожалуйста.", "ya_hochu_vodu.mp3", "dai_vodu_pozhaluysta.mp3"],
    ["hleb", "🍞", "ya-hochu-hleb", "dai-hleb", "Я хочу хлеб.", "Дай хлеб, пожалуйста.", "ya_hochu_hleb.mp3", "dai_hleb_pozhaluysta.mp3"],
    ["yabloko", "🍎", "ya-hochu-yabloko", "dai-yabloko", "Я хочу яблоко.", "Дай яблоко, пожалуйста.", "ya_hochu_yabloko.mp3", "dai_yabloko_pozhaluysta.mp3"],
    ["myach", "⚽", "ya-hochu-myach", "dai-myach", "Я хочу мяч.", "Дай мяч, пожалуйста.", "ya_hochu_myach.mp3", "dai_myach_pozhaluysta.mp3"],
    ["knigu", "📚", "ya-hochu-knigu", "dai-knigu", "Я хочу книгу.", "Дай книгу, пожалуйста.", "ya_hochu_knigu.mp3", "dai_knigu_pozhaluysta.mp3"],
    ["telefon", "📱", "ya-hochu-telefon", "dai-telefon", "Я хочу телефон.", "Дай телефон, пожалуйста.", "ya_hochu_telefon.mp3", "dai_telefon_pozhaluysta.mp3"]
  ];

  var shopTasks = [];
  var requestPracticeTasks = [];
  shopRounds.forEach(function (round, index) {
    var wantOtherIds = wantPhraseOptions.map(function (item) { return item.id; }).filter(function (id) { return id !== round[2]; });
    var politeOtherIds = politeOptions.map(function (item) { return item.id; }).filter(function (id) { return id !== round[3]; });

    shopTasks.push(gameTask("u4g2-want-" + round[0], "🏪 🧑‍💼 🙂 " + round[1], "Что ты хочешь?", "chto_ty_hochesh.mp3", phraseOptions(round[2], [wantOtherIds[index % wantOtherIds.length], wantOtherIds[(index + 2) % wantOtherIds.length]]), round[2], "Что ты хочешь?", "✅ Да!", "❌ Читай ещё раз."));
    shopTasks.push(gameTask("u4g2-request-" + round[0], "🏪 🤲 " + round[1], "Попроси:", round[7], politeChoice(round[3], [politeOtherIds[index % politeOtherIds.length], politeOtherIds[(index + 1) % politeOtherIds.length]]), round[3], round[5], "✅ Да! " + round[5], "❌ Попробуй ещё."));
    shopTasks.push(gameTask("u4g2-thanks-" + round[0], "🏪 🤲➡️🙂 " + round[1], "Б: На. А:", "na_take.mp3", thanksOptions, "spasibo", "На.", "✅ Спасибо!", "❌ Ещё раз."));

    requestPracticeTasks.push(gameTask("u4g2-request-practice-" + round[0], round[1], "Попроси правильно:", round[7], politeChoice(round[3], [politeOtherIds[(index + 2) % politeOtherIds.length], politeOtherIds[(index + 4) % politeOtherIds.length]]), round[3], round[5], "✅ Да! " + round[5], "❌ Попробуй ещё."));
  });

  var game2 = {
    id: "unit-4-game-shop",
    gameSlug: "unit-4-game-shop",
    title: "Игра 2: Магазин",
    finalTitle: "Ты был в магазине! 🏪🏆",
    finalText: "На. Спасибо.",
    finalWords: ["Я хочу воду.", "Дай хлеб, пожалуйста.", "На.", "Спасибо."],
    stages: [
      {
        type: "dialogue",
        title: "Магазин",
        instruction: "Магазин",
        tasks: shopTasks
      },
      {
        type: "request",
        title: "Попроси правильно",
        instruction: "Попроси:",
        tasks: requestPracticeTasks
      }
    ]
  };

  var haveGameTasks = [
    gameTask("u4g3-1", "💧 🍞 📱", "У меня есть вода.", "u_menya_est_voda.mp3", yesNoOptions, "da", "У меня есть вода.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-2", "🍎 ⚽", "У меня есть книга.", "u_menya_est_kniga.mp3", yesNoOptions, "net", "У меня есть книга.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-3", "📚 📱", "У меня нет мяча.", "u_menya_net_myacha.mp3", yesNoOptions, "da", "У меня нет мяча.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-4", "⚽ 🍞", "У меня нет хлеба.", "u_menya_net_hleba.mp3", yesNoOptions, "net", "У меня нет хлеба.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-5", "📱 🍎 💧", "У меня есть телефон.", "u_menya_est_telefon.mp3", yesNoOptions, "da", "У меня есть телефон.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-6", "🍞 ⚽", "У меня есть вода.", "u_menya_est_voda.mp3", yesNoOptions, "net", "У меня есть вода.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-7", "💧 📚", "У меня нет книги.", "u_menya_net_knigi.mp3", yesNoOptions, "net", "У меня нет книги.", "✅ Да!", "❌ Смотри ещё."),
    gameTask("u4g3-8", "🍞 📱", "У меня нет яблока.", "u_menya_net_yabloka.mp3", yesNoOptions, "da", "У меня нет яблока.", "✅ Да!", "❌ Смотри ещё.")
  ];

  var game3 = {
    id: "unit-4-game-have",
    gameSlug: "unit-4-game-have",
    title: "Игра 3: У меня есть?",
    finalTitle: "Супер! Ты знаешь: есть и нет! 🏆",
    finalText: "есть / нет",
    finalWords: ["У меня есть телефон.", "У меня нет книги.", "да", "нет"],
    stages: [
      {
        type: "yes_no",
        title: "У меня есть?",
        instruction: "Правда?",
        tasks: haveGameTasks
      }
    ]
  };

  root.LexiLandUnit4Lesson = {
    id: "level-0-unit-4-personal-phrases",
    order: 6,
    menuLabel: "Юнит 4",
    title: "Юнит 4: Я хочу. Дай. У меня есть.",
    subtitle: "Первые личные фразы: хочу, дай, есть, нет",
    level: "Уровень 0",
    coverEmoji: "🙋",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-10-ya-hochu", "Урок 10: Я хочу", "🙋🙏", "Урок 10: Я хочу", lesson10Slides),
      unit("lesson-11-dai-pozhaluysta", "Урок 11: Дай, пожалуйста", "🤲🙏", "Урок 11: Дай, пожалуйста", lesson11Slides),
      unit("lesson-12-u-menya-est-net", "Урок 12: У меня есть / нет", "🎒✅", "Урок 12: У меня есть / нет", lesson12Slides),
      {
        id: "unit-4-game-ya-hochu",
        title: "Игра: Я хочу",
        icon: "🙋",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра: Я хочу",
            tasks: [game1]
          }
        ]
      },
      {
        id: "unit-4-game-magazin",
        title: "Игра 2: Магазин",
        icon: "🏪",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра 2: Магазин",
            tasks: [game2]
          }
        ]
      },
      {
        id: "unit-4-game-u-menya-est",
        title: "Игра 3: У меня есть?",
        icon: "🎒",
        stages: [
          {
            type: "unit-2-kto-chto-game",
            title: "Игра 3: У меня есть?",
            tasks: [game3]
          }
        ]
      }
    ]
  };

  root.LexiLandUnit4 = root.LexiLandUnit4Lesson;
}(typeof window !== "undefined" ? window : globalThis));
