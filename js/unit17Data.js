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

  function option(id, text, emoji, file) {
    var item = {
      id: id,
      text: text,
      emoji: emoji || ""
    };

    if (file) {
      item.audio = audio(file);
    }

    return item;
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
          type: "unit-17-kitchen-game",
          title: title,
          tasks: [game]
        }
      ]
    };
  }

  function m(word, emojiText, file) {
    return {
      word: word,
      text: word,
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

  var meanings = {
    "кухня": m("кухня", "🍽️", "kuhnya.mp3"),
    "кухне": m("кухне", "🍽️", "kuhne.mp3"),
    "посуда": m("посуда", "🍽️", "posuda.mp3"),
    "стол": m("стол", "🟫", "stol.mp3"),
    "столе": m("столе", "🟫", "stole.mp3"),
    "стул": m("стул", "🪑", "stul.mp3"),
    "шкаф": m("шкаф", "🗄️", "shkaf.mp3"),
    "шкафу": m("шкафу", "🗄️", "shkafu.mp3"),
    "полка": m("полка", "📚", "polka.mp3"),
    "полке": m("полке", "📚", "polke.mp3"),
    "дверь": m("дверь", "🚪", "dver.mp3"),
    "окно": m("окно", "🪟", "okno.mp3"),
    "холодильник": m("холодильник", "🧊", "holodilnik.mp3"),
    "плита": m("плита", "🔥🍳", "plita.mp3"),
    "раковина": m("раковина", "🚰", "rakovina.mp3"),
    "тарелка": m("тарелка", "🍽️", "tarelka.mp3"),
    "тарелкой": m("тарелкой", "🍽️", "tarelkoy.mp3"),
    "чашка": m("чашка", "☕", "chashka.mp3"),
    "чашке": m("чашке", "☕", "chashke.mp3"),
    "чашку": m("чашку", "☕", "chashku.mp3"),
    "стакан": m("стакан", "🥛", "stakan.mp3"),
    "ложка": m("ложка", "🥄", "lozhka.mp3"),
    "ложку": m("ложку", "🥄", "lozhku.mp3"),
    "вилка": m("вилка", "🍴", "vilka.mp3"),
    "вилки": m("вилки", "🍴", "vilki.mp3"),
    "нож": m("нож", "🔪", "nozh.mp3"),
    "миска": m("миска", "🥣", "miska.mp3"),
    "кастрюля": m("кастрюля", "🍲", "kastryulya.mp3"),
    "сковорода": m("сковорода", "🍳", "skovoroda.mp3"),
    "чайник": m("чайник", "🫖", "chaynik.mp3"),
    "бутылка": m("бутылка", "🧴", "butylka.mp3"),
    "салфетка": m("салфетка", "◻️", "salfetka.mp3"),
    "чай": m("чай", "🫖", "chay.mp3"),
    "лежит": m("лежит", "📍", "lezhit.mp3"),
    "на": m("на", "⬆️", "na.mp3"),
    "в": m("в", "📦", "v.mp3"),
    "рядом": m("рядом", "↔️", "ryadom.mp3"),
    "с": m("с", "↔️", "s.mp3"),
    "тут": m("тут", "📍", "tut.mp3"),
    "там": m("там", "👉", "tam.mp3"),
    "здесь": m("здесь", "📍", "zdes.mp3"),
    "это": m("это", "👉", "eto.mp3"),
    "где": m("где", "❓", "gde.mp3"),
    "что": m("что", "❓", "chto.mp3"),
    "дай": m("дай", "🤲", "dai.mp3"),
    "пожалуйста": m("пожалуйста", "🙏", "pozhaluysta.mp3"),
    "у": m("у", "🙂", "u.mp3"),
    "меня": m("меня", "🙂", "menya.mp3"),
    "есть": m("есть", "✅", "est_yes.mp3"),
    "нет": m("нет", "❌", "net.mp3"),
    "я": m("я", "🙂", "ya.mp3"),
    "хочу": m("хочу", "🙏", "hochu.mp3"),
    "спасибо": m("спасибо", "😊", "spasibo.mp3"),
    "отлично": m("отлично", "✅", "otlichno.mp3"),
    "положи": m("положи", "👇", "polozhi.mp3"),
    "найди": m("найди", "🔎", "naydi.mp3"),
    "гость": m("гость", "😊", "gost.mp3"),
    "готов": m("готов", "✅", "gotov.mp3")
  };

  var dictionary = [
    entry("u17-kuhnya", "кухня", "🍽️", "word", "kuhnya.mp3"),
    entry("u17-posuda", "посуда", "🍽️☕🥄", "word", "posuda.mp3"),
    entry("u17-stol", "стол", "🟫", "word", "stol.mp3"),
    entry("u17-stul", "стул", "🪑", "word", "stul.mp3"),
    entry("u17-shkaf", "шкаф", "🗄️", "word", "shkaf.mp3"),
    entry("u17-polka", "полка", "📚", "word", "polka.mp3"),
    entry("u17-dver", "дверь", "🚪", "word", "dver.mp3"),
    entry("u17-okno", "окно", "🪟", "word", "okno.mp3"),
    entry("u17-holodilnik", "холодильник", "🧊", "word", "holodilnik.mp3"),
    entry("u17-plita", "плита", "🔥🍳", "word", "plita.mp3"),
    entry("u17-rakovina", "раковина", "🚰", "word", "rakovina.mp3"),
    entry("u17-tarelka", "тарелка", "🍽️", "word", "tarelka.mp3"),
    entry("u17-chashka", "чашка", "☕", "word", "chashka.mp3"),
    entry("u17-stakan", "стакан", "🥛", "word", "stakan.mp3"),
    entry("u17-lozhka", "ложка", "🥄", "word", "lozhka.mp3"),
    entry("u17-vilka", "вилка", "🍴", "word", "vilka.mp3"),
    entry("u17-nozh", "нож", "🔪", "word", "nozh.mp3"),
    entry("u17-miska", "миска", "🥣", "word", "miska.mp3"),
    entry("u17-kastryulya", "кастрюля", "🍲", "word", "kastryulya.mp3"),
    entry("u17-skovoroda", "сковорода", "🍳", "word", "skovoroda.mp3"),
    entry("u17-chaynik", "чайник", "🫖", "word", "chaynik.mp3"),
    entry("u17-butylka", "бутылка", "🧴", "word", "butylka.mp3"),
    entry("u17-salfetka", "салфетка", "◻️", "word", "salfetka.mp3"),
    entry("u17-chay", "чай", "🫖", "word", "chay.mp3"),
    entry("u17-lezhit", "лежит", "📍", "word", "lezhit.mp3"),
    entry("u17-na-kuhne", "на кухне", "🍽️", "chunk", "na_kuhne.mp3"),
    entry("u17-na-stole", "на столе", "🟫⬆️", "chunk", "na_stole.mp3"),
    entry("u17-v-chashke", "в чашке", "☕📦", "chunk", "v_chashke.mp3"),
    entry("u17-v-shkafu", "в шкафу", "🗄️", "chunk", "v_shkafu.mp3"),
    entry("u17-na-polke", "на полке", "📚⬆️", "chunk", "na_polke.mp3"),
    entry("u17-ryadom-s-tarelkoy", "рядом с тарелкой", "↔️🍽️", "chunk", "ryadom_s_tarelkoy.mp3"),
    entry("u17-dai-chashku", "дай чашку, пожалуйста", "🤲☕🙏", "chunk", "dai_chashku_pozhaluysta.mp3"),
    entry("u17-dai-lozhku", "дай ложку, пожалуйста", "🤲🥄🙏", "chunk", "dai_lozhku_pozhaluysta.mp3"),
    entry("u17-u-menya-est-lozhka", "у меня есть ложка", "🙂✅🥄", "chunk", "u_menya_est_lozhka.mp3"),
    entry("u17-u-menya-net-vilki", "у меня нет вилки", "🙂❌🍴", "chunk", "u_menya_net_vilki.mp3"),
    entry("u17-ya-hochu-chay", "я хочу чай", "🙂🙏🫖", "chunk", "ya_hochu_chay.mp3"),
    entry("u17-chashka-na-stole", "чашка на столе", "☕🟫", "chunk", "chashka_na_stole.mp3"),
    entry("u17-lozhka-v-chashke", "ложка в чашке", "🥄☕", "chunk", "lozhka_v_chashke.mp3"),
    entry("u17-nozh-ryadom-s-tarelkoy", "нож рядом с тарелкой", "🔪↔️🍽️", "chunk", "nozh_ryadom_s_tarelkoy.mp3"),
    entry("u17-polozhi", "положи", "👇", "word", "polozhi.mp3"),
    entry("u17-naydi", "найди", "🔎", "word", "naydi.mp3"),
    entry("u17-gost", "гость", "😊", "word", "gost.mp3"),
    entry("u17-gotov", "готов", "✅", "word", "gotov.mp3"),
    entry("u17-polozhi-tarelku", "положи тарелку", "👇🍽️", "chunk", "u17_polozhi_tarelku.mp3"),
    entry("u17-polozhi-chashku", "положи чашку", "👇☕", "chunk", "u17_polozhi_chashku.mp3"),
    entry("u17-polozhi-lozhku", "положи ложку", "👇🥄", "chunk", "u17_polozhi_lozhku.mp3"),
    entry("u17-polozhi-vilku", "положи вилку", "👇🍴", "chunk", "u17_polozhi_vilku.mp3"),
    entry("u17-polozhi-nozh", "положи нож", "👇🔪", "chunk", "u17_polozhi_nozh.mp3"),
    entry("u17-polozhi-stakan", "положи стакан", "👇🥛", "chunk", "u17_polozhi_stakan.mp3"),
    entry("u17-polozhi-salfetku", "положи салфетку", "👇◻️", "chunk", "u17_polozhi_salfetku.mp3"),
    entry("u17-stol-gotov", "стол готов", "🟫✅", "chunk", "u17_stol_gotov.mp3"),
    entry("u17-naydi-chashku", "найди чашку", "🔎☕", "chunk", "u17_naydi_chashku.mp3"),
    entry("u17-naydi-lozhku", "найди ложку", "🔎🥄", "chunk", "u17_naydi_lozhku.mp3"),
    entry("u17-naydi-tarelku", "найди тарелку", "🔎🍽️", "chunk", "u17_naydi_tarelku.mp3"),
    entry("u17-naydi-nozh", "найди нож", "🔎🔪", "chunk", "u17_naydi_nozh.mp3"),
    entry("u17-naydi-vilku", "найди вилку", "🔎🍴", "chunk", "u17_naydi_vilku.mp3"),
    entry("u17-naydi-chaynik", "найди чайник", "🔎🫖", "chunk", "u17_naydi_chaynik.mp3"),
    entry("u17-naydi-holodilnik", "найди холодильник", "🔎🧊", "chunk", "u17_naydi_holodilnik.mp3"),
    entry("u17-naydi-rakovinu", "найди раковину", "🔎🚰", "chunk", "u17_naydi_rakovinu.mp3"),
    entry("u17-gost-zdes", "гость здесь", "😊🚪", "chunk", "u17_gost_zdes.mp3"),
    entry("u17-gde-chaynik", "где чайник", "❓🫖", "chunk", "u17_gde_chaynik.mp3"),
    entry("u17-chay-gotov", "чай готов", "🫖✅", "chunk", "u17_chay_gotov.mp3"),
    entry("u17-table-success-tarelka", "да, на столе тарелка", "✅🍽️", "feedback", "u17_table_na_stole_tarelka.mp3"),
    entry("u17-table-success-chashka", "да, на столе чашка", "✅☕", "feedback", "u17_table_na_stole_chashka.mp3"),
    entry("u17-table-success-lozhka", "да, на столе ложка", "✅🥄", "feedback", "u17_table_na_stole_lozhka.mp3"),
    entry("u17-table-success-vilka", "да, на столе вилка", "✅🍴", "feedback", "u17_table_na_stole_vilka.mp3"),
    entry("u17-table-success-nozh", "да, на столе нож", "✅🔪", "feedback", "u17_table_na_stole_nozh.mp3"),
    entry("u17-table-success-stakan", "да, на столе стакан", "✅🥛", "feedback", "u17_table_na_stole_stakan.mp3"),
    entry("u17-table-success-salfetka", "да, на столе салфетка", "✅◻️", "feedback", "u17_table_na_stole_salfetka.mp3"),
    entry("u17-table-final", "отлично, стол готов", "🍽️✅", "feedback", "u17_table_final_stol_gotov.mp3"),
    entry("u17-find-vot-chashka", "вот чашка", "✅☕", "feedback", "u17_find_vot_chashka.mp3"),
    entry("u17-find-vot-lozhka", "вот ложка", "✅🥄", "feedback", "u17_find_vot_lozhka.mp3"),
    entry("u17-find-vot-tarelka", "вот тарелка", "✅🍽️", "feedback", "u17_find_vot_tarelka.mp3"),
    entry("u17-find-vot-nozh", "вот нож", "✅🔪", "feedback", "u17_find_vot_nozh.mp3"),
    entry("u17-find-vot-vilka", "вот вилка", "✅🍴", "feedback", "u17_find_vot_vilka.mp3"),
    entry("u17-find-vot-chaynik", "вот чайник", "✅🫖", "feedback", "u17_find_vot_chaynik.mp3"),
    entry("u17-find-vot-holodilnik", "вот холодильник", "✅🧊", "feedback", "u17_find_vot_holodilnik.mp3"),
    entry("u17-find-vot-rakovina", "вот раковина", "✅🚰", "feedback", "u17_find_vot_rakovina.mp3"),
    entry("u17-find-vot-butylka", "вот бутылка", "✅🧴", "feedback", "u17_find_vot_butylka.mp3"),
    entry("u17-find-final", "отлично, ты нашёл всё на кухне", "🔎✅", "feedback", "u17_find_final.mp3"),
    entry("u17-tea-chay", "чай", "🫖", "feedback", "u17_tea_chay.mp3"),
    entry("u17-tea-vot-chashka", "вот чашка", "✅☕", "feedback", "u17_tea_vot_chashka.mp3"),
    entry("u17-tea-vot-lozhka", "вот ложка", "✅🥄", "feedback", "u17_tea_vot_lozhka.mp3"),
    entry("u17-tea-vot-chaynik", "вот чайник", "✅🫖", "feedback", "u17_tea_vot_chaynik.mp3"),
    entry("u17-tea-final", "чай готов, спасибо", "🫖😊", "feedback", "u17_tea_final_chay_gotov_spasibo.mp3")
  ];

  var placeOptions = [
    option("na-kuhne", "на кухне", "🍽️", "na_kuhne.mp3"),
    option("tam", "там", "👉", "tam.mp3"),
    option("net", "нет", "❌", "net.mp3")
  ];

  var kitchenObjects = [
    option("holodilnik", "холодильник", "🧊", "holodilnik.mp3"),
    option("okno", "окно", "🪟", "okno.mp3"),
    option("stul", "стул", "🪑", "stul.mp3"),
    option("plita", "плита", "🔥🍳", "plita.mp3"),
    option("rakovina", "раковина", "🚰", "rakovina.mp3"),
    option("shkaf", "шкаф", "🗄️", "shkaf.mp3"),
    option("stol", "стол", "🟫", "stol.mp3")
  ];

  var tablewareOptions = [
    option("tarelka", "тарелка", "🍽️", "tarelka.mp3"),
    option("chashka", "чашка", "☕", "chashka.mp3"),
    option("lozhka", "ложка", "🥄", "lozhka.mp3"),
    option("vilka", "вилка", "🍴", "vilka.mp3"),
    option("nozh", "нож", "🔪", "nozh.mp3"),
    option("stakan", "стакан", "🥛", "stakan.mp3"),
    option("miska", "миска", "🥣", "miska.mp3"),
    option("butylka", "бутылка", "🧴", "butylka.mp3")
  ];

  var objectLocationOptions = [
    option("na-stole", "на столе", "🟫⬆️", "na_stole.mp3"),
    option("v-chashke", "в чашке", "☕📦", "v_chashke.mp3"),
    option("v-shkafu", "в шкафу", "🗄️", "v_shkafu.mp3"),
    option("na-polke", "на полке", "📚⬆️", "na_polke.mp3"),
    option("ryadom", "рядом", "↔️", "ryadom.mp3"),
    option("tam", "там", "👉", "tam.mp3")
  ];

  var giveOptions = [
    option("lozhku", "ложку", "🥄", "lozhku.mp3"),
    option("chashku", "чашку", "☕", "chashku.mp3"),
    option("tarelku", "тарелку", "🍽️", "tarelku.mp3")
  ];

  var wantOptions = [
    option("chay", "чай", "🫖", "chay.mp3"),
    option("vodu", "воду", "💧", "vodu.mp3"),
    option("hleb", "хлеб", "🍞", "hleb.mp3")
  ];

  var lesson49Slides = [
    slide("u17-l49-1", "Кухня", ["Кухня."], focus(["🍽️", "🏠"]), [line("Кухня.", "kuhnya.mp3")], null, true),
    slide("u17-l49-2", "На кухне", ["На кухне стол."], focus(["🍽️", "🟫"]), [line("На кухне стол.", "u17_l49_na_kuhne_stol.mp3")], null, true),
    slide("u17-l49-3", "Стул", ["На кухне стул."], focus(["🍽️", "🪑"]), [line("На кухне стул.", "u17_l49_na_kuhne_stul.mp3")], null, true),
    slide("u17-l49-4", "Шкаф", ["Тут шкаф."], focus(["📍", "🗄️"]), [line("Тут шкаф.", "u17_l49_tut_shkaf.mp3")], null, true),
    slide("u17-l49-5", "Полка", ["Там полка."], focus(["👉", "📚"]), [line("Там полка.", "u17_l49_tam_polka.mp3")], null, true),
    slide("u17-l49-6", "Холодильник", ["Это холодильник."], focus(["🧊"]), [line("Это холодильник.", "u17_l49_eto_holodilnik.mp3")], null, true),
    slide("u17-l49-7", "Плита", ["Это плита."], focus(["🔥", "🍳"]), [line("Это плита.", "u17_l49_eto_plita.mp3")], null, true),
    slide("u17-l49-8", "Раковина", ["Это раковина."], focus(["🚰"]), [line("Это раковина.", "u17_l49_eto_rakovina.mp3")], null, true),
    slide("u17-l49-9", "Дверь", ["Дверь здесь."], focus(["🚪", "📍"]), [line("Дверь здесь.", "u17_l49_dver_zdes.mp3")], null, true),
    slide("u17-l49-10", "Окно", ["Окно там."], focus(["🪟", "👉"]), [line("Окно там.", "u17_l49_okno_tam.mp3")], null, true),
    slide("u17-l49-11", "Читай", ["Это кухня.", "На кухне стол.", "Тут холодильник.", "Там окно."], focus(["🍽️", "🟫", "📍🧊", "👉🪟"]), [
      line("Это кухня. На кухне стол. Тут холодильник. Там окно.", "u17_l49_text_1.mp3")
    ], [
      question("u17-l49-q1", "Где стол?", placeOptions, "na-kuhne", "🟫"),
      question("u17-l49-q2", "Что тут?", [kitchenObjects[2], kitchenObjects[0], kitchenObjects[1]], "holodilnik", "📍"),
      question("u17-l49-q3", "Что там?", [kitchenObjects[3], kitchenObjects[1], kitchenObjects[4]], "okno", "👉")
    ], true),
    slide("u17-l49-12", "Что это?", ["Что это?"], focus(["🧊"]), [line("Что это?", "chto_eto.mp3")], [
      question("u17-l49-q4", "Что это?", [kitchenObjects[3], kitchenObjects[0], kitchenObjects[6]], "holodilnik", "🧊")
    ], true),
    slide("u17-l49-13", "Что это?", ["Что это?"], focus(["🚰"]), [line("Что это?", "chto_eto.mp3")], [
      question("u17-l49-q5", "Что это?", [kitchenObjects[1], kitchenObjects[5], kitchenObjects[4]], "rakovina", "🚰")
    ], true),
    slide("u17-l49-14", "Отлично", ["Отлично!", "Кухня.", "Стол.", "Стул.", "Холодильник.", "Плита.", "Раковина."], wordList([
      { text: "кухня", emoji: "🍽️" },
      { text: "стол", emoji: "🟫" },
      { text: "стул", emoji: "🪑" },
      { text: "холодильник", emoji: "🧊" },
      { text: "плита", emoji: "🔥🍳" },
      { text: "раковина", emoji: "🚰" }
    ]), [line("Отлично! Кухня. Стол. Стул. Холодильник. Плита. Раковина.", "u17_l49_final.mp3")], null, true)
  ];

  var lesson50Slides = [
    slide("u17-l50-1", "Посуда", ["Посуда."], focus(["🍽️", "☕", "🥄"]), [line("Посуда.", "posuda.mp3")], null, true),
    slide("u17-l50-2", "Тарелка", ["Это тарелка."], focus(["🍽️"]), [line("Это тарелка.", "u17_l50_eto_tarelka.mp3")], null, true),
    slide("u17-l50-3", "Чашка", ["Это чашка."], focus(["☕"]), [line("Это чашка.", "u17_l50_eto_chashka.mp3")], null, true),
    slide("u17-l50-4", "Ложка", ["Это ложка."], focus(["🥄"]), [line("Это ложка.", "u17_l50_eto_lozhka.mp3")], null, true),
    slide("u17-l50-5", "Вилка", ["Это вилка."], focus(["🍴"]), [line("Это вилка.", "u17_l50_eto_vilka.mp3")], null, true),
    slide("u17-l50-6", "Нож", ["Это нож."], focus(["🔪"]), [line("Это нож.", "u17_l50_eto_nozh.mp3")], null, true),
    slide("u17-l50-7", "Стакан", ["Это стакан."], focus(["🥛"]), [line("Это стакан.", "u17_l50_eto_stakan.mp3")], null, true),
    slide("u17-l50-8", "Миска", ["Это миска."], focus(["🥣"]), [line("Это миска.", "u17_l50_eto_miska.mp3")], null, true),
    slide("u17-l50-9", "Чайник", ["Это чайник."], focus(["🫖"]), [line("Это чайник.", "u17_l50_eto_chaynik.mp3")], null, true),
    slide("u17-l50-10", "Бутылка", ["Это бутылка."], focus(["🧴"]), [line("Это бутылка.", "u17_l50_eto_butylka.mp3")], null, true),
    slide("u17-l50-11", "На столе", ["На столе тарелка."], focus(["🟫", "🍽️"]), [line("На столе тарелка.", "u17_l50_na_stole_tarelka.mp3")], null, true),
    slide("u17-l50-12", "Чашка и ложка", ["Чашка и ложка."], focus(["☕", "➕", "🥄"]), [line("Чашка и ложка.", "u17_l50_chashka_i_lozhka.mp3")], null, true),
    slide("u17-l50-13", "Дай", ["Дай чашку, пожалуйста."], focus(["🤲", "☕", "🙏"]), [line("Дай чашку, пожалуйста.", "dai_chashku_pozhaluysta.mp3")], null, true),
    slide("u17-l50-14", "У меня есть", ["У меня есть ложка."], focus(["🙂", "✅", "🥄"]), [line("У меня есть ложка.", "u_menya_est_lozhka.mp3")], null, true),
    slide("u17-l50-15", "У меня нет", ["У меня нет вилки."], focus(["🙂", "❌", "🍴"]), [line("У меня нет вилки.", "u_menya_net_vilki.mp3")], null, true),
    slide("u17-l50-16", "Читай", ["На столе тарелка.", "Тут чашка.", "У меня есть ложка.", "У меня нет вилки."], focus(["🟫🍽️", "📍☕", "🙂✅🥄", "🙂❌🍴"]), [
      line("На столе тарелка. Тут чашка. У меня есть ложка. У меня нет вилки.", "u17_l50_text_1.mp3")
    ], [
      question("u17-l50-q1", "Что на столе?", [tablewareOptions[1], tablewareOptions[4], tablewareOptions[0]], "tarelka", "🟫"),
      question("u17-l50-q2", "Что тут?", [tablewareOptions[7], tablewareOptions[1], tablewareOptions[6]], "chashka", "📍"),
      question("u17-l50-q3", "Что есть?", [tablewareOptions[3], tablewareOptions[2], tablewareOptions[4]], "lozhka", "✅"),
      question("u17-l50-q4", "Чего нет?", [option("chashki", "чашки", "☕", "chashki.mp3"), option("vilki", "вилки", "🍴", "vilki.mp3"), option("tarelki", "тарелки", "🍽️", "tarelki.mp3")], "vilki", "❌")
    ], true),
    slide("u17-l50-17", "Отлично", ["Отлично!", "Тарелка.", "Чашка.", "Ложка.", "Вилка.", "Нож.", "Стакан."], wordList([
      { text: "тарелка", emoji: "🍽️" },
      { text: "чашка", emoji: "☕" },
      { text: "ложка", emoji: "🥄" },
      { text: "вилка", emoji: "🍴" },
      { text: "нож", emoji: "🔪" },
      { text: "стакан", emoji: "🥛" }
    ]), [line("Отлично! Тарелка. Чашка. Ложка. Вилка. Нож. Стакан.", "u17_l50_final.mp3")], null, true)
  ];

  var lesson51Slides = [
    slide("u17-l51-1", "Где?", ["Где чашка?"], focus(["❓", "☕"]), [line("Где чашка?", "u17_l51_gde_chashka.mp3")], null, true),
    slide("u17-l51-2", "На столе", ["Чашка на столе."], focus(["☕", "⬆️", "🟫"]), [line("Чашка на столе.", "chashka_na_stole.mp3")], null, true),
    slide("u17-l51-3", "В чашке", ["Ложка в чашке."], focus(["🥄", "📦", "☕"]), [line("Ложка в чашке.", "lozhka_v_chashke.mp3")], null, true),
    slide("u17-l51-4", "На столе", ["Тарелка на столе."], focus(["🍽️", "⬆️", "🟫"]), [line("Тарелка на столе.", "u17_l51_tarelka_na_stole.mp3")], null, true),
    slide("u17-l51-5", "Рядом", ["Нож рядом с тарелкой."], focus(["🔪", "↔️", "🍽️"]), [line("Нож рядом с тарелкой.", "nozh_ryadom_s_tarelkoy.mp3")], null, true),
    slide("u17-l51-6", "В шкафу", ["Вилка в шкафу."], focus(["🍴", "📦", "🗄️"]), [line("Вилка в шкафу.", "u17_l51_vilka_v_shkafu.mp3")], null, true),
    slide("u17-l51-7", "На полке", ["Стакан на полке."], focus(["🥛", "⬆️", "📚"]), [line("Стакан на полке.", "u17_l51_stakan_na_polke.mp3")], null, true),
    slide("u17-l51-8", "Здесь", ["Чайник здесь."], focus(["🫖", "📍"]), [line("Чайник здесь.", "u17_l51_chaynik_zdes.mp3")], null, true),
    slide("u17-l51-9", "Там", ["Бутылка там."], focus(["🧴", "👉"]), [line("Бутылка там.", "u17_l51_butylka_tam.mp3")], null, true),
    slide("u17-l51-10", "Читай", ["Чашка на столе.", "Ложка в чашке.", "Нож рядом с тарелкой."], focus(["☕🟫", "🥄☕", "🔪↔️🍽️"]), [
      line("Чашка на столе. Ложка в чашке. Нож рядом с тарелкой.", "u17_l51_text_1.mp3")
    ], [
      question("u17-l51-q1", "Где чашка?", [objectLocationOptions[2], objectLocationOptions[0], objectLocationOptions[5]], "na-stole", "☕"),
      question("u17-l51-q2", "Где ложка?", [objectLocationOptions[3], objectLocationOptions[4], objectLocationOptions[1]], "v-chashke", "🥄"),
      question("u17-l51-q3", "Что рядом с тарелкой?", [tablewareOptions[1], tablewareOptions[4], tablewareOptions[5]], "nozh", "🍽️")
    ], true),
    slide("u17-l51-11", "Читай", ["Вилка в шкафу.", "Стакан на полке.", "Чайник здесь.", "Бутылка там."], focus(["🍴🗄️", "🥛📚", "🫖📍", "🧴👉"]), [
      line("Вилка в шкафу. Стакан на полке. Чайник здесь. Бутылка там.", "u17_l51_text_2.mp3")
    ], [
      question("u17-l51-q4", "Где вилка?", [objectLocationOptions[0], objectLocationOptions[2], objectLocationOptions[1]], "v-shkafu", "🍴"),
      question("u17-l51-q5", "Где стакан?", [objectLocationOptions[2], objectLocationOptions[3], objectLocationOptions[4]], "na-polke", "🥛"),
      question("u17-l51-q6", "Что здесь?", [tablewareOptions[4], option("chaynik", "чайник", "🫖", "chaynik.mp3"), tablewareOptions[7]], "chaynik", "📍"),
      question("u17-l51-q7", "Что там?", [tablewareOptions[2], tablewareOptions[1], tablewareOptions[7]], "butylka", "👉")
    ], true),
    slide("u17-l51-12", "Маленькая кухня", ["Это кухня.", "На столе чашка.", "В чашке ложка.", "Рядом тарелка."], focus(["🍽️", "🟫☕", "☕🥄", "↔️🍽️"]), [
      line("Это кухня. На столе чашка. В чашке ложка. Рядом тарелка.", "u17_l51_small_kitchen.mp3")
    ], [
      question("u17-l51-q8", "Что на столе?", [tablewareOptions[4], kitchenObjects[5], tablewareOptions[1]], "chashka", "🟫"),
      question("u17-l51-q9", "Что в чашке?", [tablewareOptions[3], tablewareOptions[5], tablewareOptions[2]], "lozhka", "☕"),
      question("u17-l51-q10", "Что рядом?", [kitchenObjects[0], kitchenObjects[5], tablewareOptions[0]], "tarelka", "↔️")
    ], true),
    slide("u17-l51-13", "Дай", ["Дай ложку, пожалуйста."], focus(["🤲", "🥄", "🙏"]), [line("Дай ложку, пожалуйста.", "dai_lozhku_pozhaluysta.mp3")], [
      question("u17-l51-q11", "Что дать?", giveOptions, "lozhku", "🤲")
    ], true),
    slide("u17-l51-14", "Я хочу", ["Я хочу чай."], focus(["🙂", "🙏", "🫖"]), [line("Я хочу чай.", "ya_hochu_chay.mp3")], [
      question("u17-l51-q12", "Что я хочу?", wantOptions, "chay", "🙂")
    ], true),
    slide("u17-l51-15", "Финальный текст", ["Я на кухне.", "На столе чашка.", "В чашке ложка.", "Я хочу чай.", "Дай чашку, пожалуйста.", "Спасибо."], focus(["🙂🍽️", "🟫☕", "☕🥄", "🙂🙏🫖", "🤲☕🙏", "😊"]), [
      line("Я на кухне. На столе чашка. В чашке ложка. Я хочу чай. Дай чашку, пожалуйста. Спасибо.", "u17_l51_final_text.mp3")
    ], [
      question("u17-l51-q13", "Где я?", [option("v-gorode", "в городе", "🏙️", "v_gorode.mp3"), option("na-kuhne", "на кухне", "🍽️", "na_kuhne.mp3"), option("v-shkole", "в школе", "🏫", "v_shkole.mp3")], "na-kuhne", "🙂"),
      question("u17-l51-q14", "Что на столе?", [option("telefon", "телефон", "📱", "telefon.mp3"), tablewareOptions[1], option("myach", "мяч", "⚽", "myach.mp3")], "chashka", "🟫"),
      question("u17-l51-q15", "Что я хочу?", [option("knigu", "книгу", "📖", "knigu.mp3"), option("myach", "мяч", "⚽", "myach.mp3"), wantOptions[0]], "chay", "🙂")
    ], true),
    slide("u17-l51-16", "Отлично", ["Отлично!", "Кухня.", "Чашка.", "Ложка.", "Тарелка.", "На столе.", "В чашке."], wordList([
      { text: "кухня", emoji: "🍽️" },
      { text: "чашка", emoji: "☕" },
      { text: "ложка", emoji: "🥄" },
      { text: "тарелка", emoji: "🍽️" },
      { text: "на столе", emoji: "🟫⬆️" },
      { text: "в чашке", emoji: "☕📦" }
    ]), [line("Отлично! Кухня. Чашка. Ложка. Тарелка. На столе. В чашке.", "u17_l51_final.mp3")], null, true)
  ];

  var unit17TableObjects = [
    { id: "tarelka", text: "тарелка", emoji: "🍽️" },
    { id: "chashka", text: "чашка", emoji: "☕" },
    { id: "lozhka", text: "ложка", emoji: "🥄" },
    { id: "vilka", text: "вилка", emoji: "🍴" },
    { id: "nozh", text: "нож", emoji: "🔪" },
    { id: "stakan", text: "стакан", emoji: "🥛" },
    { id: "salfetka", text: "салфетка", emoji: "◻️" }
  ];

  var unit17KitchenSceneObjects = [
    { id: "chashka", text: "чашка", emoji: "☕", x: 34, y: 57 },
    { id: "lozhka", text: "ложка", emoji: "🥄", x: 52, y: 64 },
    { id: "tarelka", text: "тарелка", emoji: "🍽️", x: 21, y: 67 },
    { id: "nozh", text: "нож", emoji: "🔪", x: 67, y: 66 },
    { id: "vilka", text: "вилка", emoji: "🍴", x: 79, y: 65 },
    { id: "chaynik", text: "чайник", emoji: "🫖", x: 56, y: 30 },
    { id: "holodilnik", text: "холодильник", emoji: "🧊", x: 84, y: 36 },
    { id: "rakovina", text: "раковина", emoji: "🚰", x: 14, y: 42 },
    { id: "butylka", text: "бутылка", emoji: "🧴", x: 38, y: 30 },
    { id: "stakan", text: "стакан", emoji: "🥛", x: 47, y: 50 }
  ];

  var unit17TeaObjects = [
    { id: "chashka", text: "чашка", emoji: "☕" },
    { id: "lozhka", text: "ложка", emoji: "🥄" },
    { id: "chaynik", text: "чайник", emoji: "🫖" },
    { id: "tarelka", text: "тарелка", emoji: "🍽️" },
    { id: "stakan", text: "стакан", emoji: "🥛" },
    { id: "butylka", text: "бутылка", emoji: "🧴" }
  ];

  var setTableGame = {
    id: "unit-17-game-set-table-data",
    gameSlug: "unit-17-game-set-table",
    kind: "set-table",
    title: "Игра: Накрой стол",
    icon: "🍽️",
    objects: unit17TableObjects,
    finalEmoji: "🍽️✅",
    finalTitle: "Стол готов",
    finalText: "Отлично! Стол готов.",
    finalAudio: audio("u17_table_final_stol_gotov.mp3"),
    rounds: [
      { id: "u17-table-1", title: "Накрой стол", text: "Положи тарелку.", audio: audio("u17_table_polozhi_tarelku.mp3"), correct: "tarelka", successText: "Да! На столе тарелка.", successAudio: audio("u17_table_na_stole_tarelka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-table-2", title: "Накрой стол", text: "Положи чашку.", audio: audio("u17_table_polozhi_chashku.mp3"), correct: "chashka", successText: "Да! На столе чашка.", successAudio: audio("u17_table_na_stole_chashka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-table-3", title: "Накрой стол", text: "Положи ложку.", audio: audio("u17_table_polozhi_lozhku.mp3"), correct: "lozhka", successText: "Да! На столе ложка.", successAudio: audio("u17_table_na_stole_lozhka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-table-4", title: "Накрой стол", text: "Положи вилку.", audio: audio("u17_table_polozhi_vilku.mp3"), correct: "vilka", successText: "Да! На столе вилка.", successAudio: audio("u17_table_na_stole_vilka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-table-5", title: "Накрой стол", text: "Положи нож.", audio: audio("u17_table_polozhi_nozh.mp3"), correct: "nozh", successText: "Да! На столе нож.", successAudio: audio("u17_table_na_stole_nozh.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-table-6", title: "Накрой стол", text: "Положи стакан.", audio: audio("u17_table_polozhi_stakan.mp3"), correct: "stakan", successText: "Да! На столе стакан.", successAudio: audio("u17_table_na_stole_stakan.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-table-7", title: "Накрой стол", text: "Положи салфетку.", audio: audio("u17_table_polozhi_salfetku.mp3"), correct: "salfetka", successText: "Да! На столе салфетка.", successAudio: audio("u17_table_na_stole_salfetka.mp3"), errorText: "Смотри ещё 🙂" }
    ]
  };

  var kitchenFindGame = {
    id: "unit-17-game-kitchen-find-data",
    gameSlug: "unit-17-game-kitchen-find",
    kind: "kitchen-find",
    title: "Игра: Найди на кухне",
    icon: "🔎🍽️",
    sceneItems: unit17KitchenSceneObjects,
    finalEmoji: "🔎✅",
    finalTitle: "Кухня",
    finalText: "Отлично! Ты нашёл всё на кухне.",
    finalAudio: audio("u17_find_final.mp3"),
    rounds: [
      { id: "u17-find-1", title: "Найди", text: "Найди чашку.", audio: audio("u17_find_naydi_chashku.mp3"), correct: "chashka", successText: "Вот чашка. ✅", successAudio: audio("u17_find_vot_chashka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-2", title: "Найди", text: "Найди ложку.", audio: audio("u17_find_naydi_lozhku.mp3"), correct: "lozhka", successText: "Вот ложка. ✅", successAudio: audio("u17_find_vot_lozhka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-3", title: "Найди", text: "Найди тарелку.", audio: audio("u17_find_naydi_tarelku.mp3"), correct: "tarelka", successText: "Вот тарелка. ✅", successAudio: audio("u17_find_vot_tarelka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-4", title: "Найди", text: "Найди нож.", audio: audio("u17_find_naydi_nozh.mp3"), correct: "nozh", successText: "Вот нож. ✅", successAudio: audio("u17_find_vot_nozh.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-5", title: "Найди", text: "Найди вилку.", audio: audio("u17_find_naydi_vilku.mp3"), correct: "vilka", successText: "Вот вилка. ✅", successAudio: audio("u17_find_vot_vilka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-6", title: "Найди", text: "Найди чайник.", audio: audio("u17_find_naydi_chaynik.mp3"), correct: "chaynik", successText: "Вот чайник. ✅", successAudio: audio("u17_find_vot_chaynik.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-7", title: "Найди", text: "Найди холодильник.", audio: audio("u17_find_naydi_holodilnik.mp3"), correct: "holodilnik", successText: "Вот холодильник. ✅", successAudio: audio("u17_find_vot_holodilnik.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-8", title: "Найди", text: "Найди раковину.", audio: audio("u17_find_naydi_rakovinu.mp3"), correct: "rakovina", successText: "Вот раковина. ✅", successAudio: audio("u17_find_vot_rakovina.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-9", title: "Где?", text: "Где чашка?", audio: audio("u17_find_gde_chashka.mp3"), correct: "chashka", successText: "Вот чашка. ✅", successAudio: audio("u17_find_vot_chashka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-find-10", title: "Где?", text: "Где бутылка?", audio: audio("u17_find_gde_butylka.mp3"), correct: "butylka", successText: "Вот бутылка. ✅", successAudio: audio("u17_find_vot_butylka.mp3"), errorText: "Смотри ещё 🙂" }
    ]
  };

  var teaGuestGame = {
    id: "unit-17-game-tea-guest-data",
    gameSlug: "unit-17-game-tea-guest",
    kind: "tea-guest",
    title: "Игра: Чай для гостя",
    icon: "🫖😊",
    objects: unit17TeaObjects,
    finalEmoji: "🫖😊",
    finalTitle: "Чай готов",
    finalText: "Чай готов. Спасибо!",
    finalAudio: audio("u17_tea_final_chay_gotov_spasibo.mp3"),
    rounds: [
      { id: "u17-tea-1", title: "Гость", text: "Гость здесь.", audio: audio("u17_tea_gost_zdes.mp3"), action: "continue", successText: "Гость здесь.", successAudio: audio("u17_tea_gost_zdes.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-2", title: "Чай", text: "Я хочу чай.", audio: audio("u17_tea_ya_hochu_chay.mp3"), correct: "chaynik", successText: "Чай. ✅", successAudio: audio("u17_tea_chay.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-3", title: "Найди", text: "Найди чашку.", audio: audio("u17_tea_naydi_chashku.mp3"), correct: "chashka", successText: "Вот чашка. ✅", successAudio: audio("u17_tea_vot_chashka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-4", title: "Найди", text: "Найди ложку.", audio: audio("u17_tea_naydi_lozhku.mp3"), correct: "lozhka", successText: "Вот ложка. ✅", successAudio: audio("u17_tea_vot_lozhka.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-5", title: "Найди", text: "Найди чайник.", audio: audio("u17_tea_naydi_chaynik.mp3"), correct: "chaynik", successText: "Вот чайник. ✅", successAudio: audio("u17_tea_vot_chaynik.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-6", title: "Дай", text: "Дай чашку, пожалуйста.", audio: audio("u17_tea_dai_chashku_pozhaluysta.mp3"), correct: "chashka", successText: "На.", successAudio: audio("na.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-7", title: "На", text: "На.", audio: audio("na.mp3"), action: "continue", successText: "На.", successAudio: audio("na.mp3"), errorText: "Смотри ещё 🙂" },
      { id: "u17-tea-8", title: "Спасибо", text: "Спасибо.", audio: audio("spasibo.mp3"), action: "continue", successText: "Спасибо.", successAudio: audio("spasibo.mp3"), errorText: "Смотри ещё 🙂" }
    ]
  };

  root.LexiLandUnit17Lesson = {
    id: "level-0-unit-17-kitchen-things",
    order: 19,
    menuLabel: "Юнит 17",
    shortTitle: "Кухня",
    title: "Юнит 17: Кухня и вещи вокруг",
    subtitle: "Обычные предметы дома",
    level: "Уровень 0",
    coverEmoji: "🍽️",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-49-kitchen", "Урок 49: Кухня", "🍽️", "Урок 49: Кухня", lesson49Slides),
      unit("lesson-50-tableware", "Урок 50: Посуда", "☕", "Урок 50: Посуда", lesson50Slides),
      unit("lesson-51-where-is-it", "Урок 51: Где лежит?", "📍", "Урок 51: Где лежит?", lesson51Slides),
      gameUnit("unit-17-game-set-table", "Игра: Накрой стол", "🍽️", setTableGame),
      gameUnit("unit-17-game-kitchen-find", "Игра 2: Найди на кухне", "🔎🍽️", kitchenFindGame),
      gameUnit("unit-17-game-tea-guest", "Игра 3: Чай для гостя", "🫖😊", teaGuestGame)
    ]
  };

  root.LexiLandUnit17 = root.LexiLandUnit17Lesson;
}(typeof window !== "undefined" ? window : globalThis));
