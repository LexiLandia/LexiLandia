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
      item: item || "weather",
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
    "погода": m("погода", "🌦️"),
    "какая": m("какая", "❓"),
    "сегодня": m("сегодня", "📅"),
    "улице": m("улице", "🏙️"),
    "солнце": m("солнце", "☀️"),
    "дождь": m("дождь", "🌧️"),
    "снег": m("снег", "❄️"),
    "ветер": m("ветер", "💨"),
    "тепло": m("тепло", "🌤️"),
    "холодно": m("холодно", "🥶"),
    "жарко": m("жарко", "🥵"),
    "мокро": m("мокро", "💧"),
    "сухо": m("сухо", "🏜️"),
    "надень": m("надень", "🧍"),
    "куртку": m("куртку", "🧥"),
    "шапку": m("шапку", "🧢"),
    "шарф": m("шарф", "🧣"),
    "футболку": m("футболку", "👕"),
    "обувь": m("обувь", "👟"),
    "я": m("я", "🙂"),
    "иду": m("иду", "🚶‍➡️"),
    "парк": m("парк", "🌳"),
    "школу": m("школу", "🏫"),
    "домой": m("домой", "🏠"),
    "дом": m("дом", "🏠"),
    "кафе": m("кафе", "🏢☕"),
    "есть": m("есть", "✅")
  };

  var dictionary = [
    entry("u12-pogoda", "погода", "🌦️", "word", "pogoda.mp3"),
    entry("u12-kakaya-pogoda", "какая погода", "🌦️❓", "chunk", "kakaya_pogoda.mp3"),
    entry("u12-segodnya", "сегодня", "📅", "word", "segodnya.mp3"),
    entry("u12-na-ulitse", "на улице", "🏙️", "chunk", "na_ulitse.mp3"),
    entry("u12-solntse", "солнце", "☀️", "word", "solntse.mp3"),
    entry("u12-dozhd", "дождь", "🌧️", "word", "dozhd.mp3"),
    entry("u12-sneg", "снег", "❄️", "word", "sneg.mp3"),
    entry("u12-veter", "ветер", "💨", "word", "veter.mp3"),
    entry("u12-teplo", "тепло", "🌤️", "word", "teplo.mp3"),
    entry("u12-holodno", "холодно", "🥶", "word", "holodno.mp3"),
    entry("u12-zharko", "жарко", "🥵", "word", "zharko.mp3"),
    entry("u12-mokro", "мокро", "💧", "word", "mokro.mp3"),
    entry("u12-suho", "сухо", "🏜️", "word", "suho.mp3"),
    entry("u12-naden-kurtku", "надень куртку", "🧥", "chunk", "naden_kurtku.mp3"),
    entry("u12-naden-shapku", "надень шапку", "🧢", "chunk", "naden_shapku.mp3"),
    entry("u12-naden-sharf", "надень шарф", "🧣", "chunk", "naden_sharf.mp3"),
    entry("u12-naden-futbolku", "надень футболку", "👕", "chunk", "naden_futbolku.mp3"),
    entry("u12-naden-obuv", "надень обувь", "👟", "chunk", "naden_obuv.mp3"),
    entry("u12-segodnya-solntse", "сегодня солнце", "📅☀️", "chunk", "segodnya_solntse.mp3"),
    entry("u12-segodnya-dozhd", "сегодня дождь", "📅🌧️", "chunk", "segodnya_dozhd.mp3"),
    entry("u12-na-ulitse-sneg", "на улице снег", "🏙️❄️", "chunk", "na_ulitse_sneg.mp3"),
    entry("u12-na-ulitse-veter", "на улице ветер", "🏙️💨", "chunk", "na_ulitse_veter.mp3"),
    entry("u12-na-ulitse-teplo", "на улице тепло", "🏙️🌤️", "chunk", "na_ulitse_teplo.mp3"),
    entry("u12-na-ulitse-holodno", "на улице холодно", "🏙️🥶", "chunk", "na_ulitse_holodno.mp3"),
    entry("u12-na-ulitse-zharko", "на улице жарко", "🏙️🥵", "chunk", "na_ulitse_zharko.mp3"),
    entry("u12-na-ulitse-mokro", "на улице мокро", "🏙️💧", "chunk", "na_ulitse_mokro.mp3"),
    entry("u12-na-ulitse-suho", "на улице сухо", "🏙️🏜️", "chunk", "na_ulitse_suho.mp3")
  ];

  var yesNoOptions = [
    option("net", "нет", "❌"),
    option("da", "да", "✅")
  ];

  var weatherOptions = [
    option("rain", "дождь", "🌧️"),
    option("snow", "снег", "❄️"),
    option("sun", "солнце", "☀️"),
    option("wind", "ветер", "💨")
  ];

  var feelOptions = [
    option("cold", "холодно", "🥶"),
    option("wet", "мокро", "💧"),
    option("warm", "тепло", "🌤️"),
    option("hot", "жарко", "🥵"),
    option("dry", "сухо", "🏜️")
  ];

  var clothingOptions = [
    option("jacket", "куртка", "🧥"),
    option("hat", "шапка", "🧢"),
    option("scarf", "шарф", "🧣"),
    option("shirt", "футболка", "👕"),
    option("shoes", "обувь", "👟")
  ];

  var wearPhraseOptions = [
    option("jacket", "надень куртку", "🧥"),
    option("hat", "надень шапку", "🧢"),
    option("scarf", "надень шарф", "🧣"),
    option("shirt", "надень футболку", "👕"),
    option("shoes", "надень обувь", "👟")
  ];

  var weatherItems = [
    group("rain", "дождь", "🌧️", 1, "weather"),
    group("sun", "солнце", "☀️", 1, "weather"),
    group("snow", "снег", "❄️", 1, "weather"),
    group("wind", "ветер", "💨", 1, "weather"),
    group("warm", "тепло", "🌤️", 1, "weather"),
    group("cold", "холодно", "🥶", 1, "weather")
  ];

  var lesson34Slides = [
    slide("u12-l34-1", "Погода", ["Какая погода?", "🌦️❓"], focus(["🌦️", "❓", "👀"]), [line("Какая погода?", "kakaya_pogoda.mp3")], null, true),
    slide("u12-l34-2", "Солнце", ["Солнце."], focus(["☀️"]), [line("Солнце.", "solntse.mp3")], null, true),
    slide("u12-l34-3", "Дождь", ["Дождь."], focus(["🌧️"]), [line("Дождь.", "dozhd.mp3")], null, true),
    slide("u12-l34-4", "Снег", ["Снег."], focus(["❄️"]), [line("Снег.", "sneg.mp3")], null, true),
    slide("u12-l34-5", "Ветер", ["Ветер."], focus(["💨"]), [line("Ветер.", "veter.mp3")], null, true),
    slide("u12-l34-6", "Сегодня", ["Сегодня солнце."], focus(["📅", "☀️"]), [line("Сегодня солнце.", "segodnya_solntse.mp3")], [
      question("u12-l34-q1", "Что сегодня?", weatherOptions, "sun", "📅☀️")
    ], true),
    slide("u12-l34-7", "Сегодня", ["Сегодня дождь."], focus(["📅", "🌧️"]), [line("Сегодня дождь.", "segodnya_dozhd.mp3")], [
      question("u12-l34-q2", "Это дождь?", yesNoOptions, "da", "🌧️")
    ], true),
    slide("u12-l34-8", "На улице", ["На улице снег."], focus(["🏙️", "❄️"]), [line("На улице снег.", "na_ulitse_sneg.mp3")], [
      question("u12-l34-q3", "Какая погода?", weatherOptions, "snow", "🏙️❄️")
    ], true),
    slide("u12-l34-9", "На улице", ["На улице ветер."], focus(["🏙️", "💨"]), [line("На улице ветер.", "na_ulitse_veter.mp3")], [
      question("u12-l34-q4", "Что на улице?", weatherOptions, "wind", "🏙️💨")
    ], true),
    slide("u12-l34-10", "Читай", ["Сегодня солнце.", "На улице тепло.", "Я иду в парк.", "У меня есть футболка."], focus(["📅☀️", "🏙️🌤️", "🙂🚶‍➡️🌳", "🙂✅👕"]), [line("Сегодня солнце. На улице тепло. Я иду в парк. У меня есть футболка.", "u12_l34_text.mp3")], [
      question("u12-l34-q5", "Какая погода?", weatherOptions, "sun", "☀️"),
      question("u12-l34-q6", "Где тепло?", [option("outside", "на улице", "🏙️"), option("home", "дома", "🏠"), option("cafe", "в кафе", "🏢☕")], "outside", "🌤️"),
      question("u12-l34-q7", "Что есть?", clothingOptions, "shirt", "🙂✅")
    ], true),
    slide("u12-l34-11", "Отлично!", ["Отлично! ✅", "солнце", "дождь", "снег", "ветер"], wordList([{ text: "солнце", emoji: "☀️" }, { text: "дождь", emoji: "🌧️" }, { text: "снег", emoji: "❄️" }, { text: "ветер", emoji: "💨" }]), [line("Отлично! Солнце. Дождь. Снег. Ветер.", "u12_l34_final.mp3")], null, true)
  ];

  var lesson35Slides = [
    slide("u12-l35-1", "Тепло / холодно", ["Тепло.", "Холодно."], focus(["🌤️", "🥶"]), [line("Тепло. Холодно.", "u12_l35_teplo_holodno.mp3")], null, true),
    slide("u12-l35-2", "Тепло", ["На улице тепло."], focus(["🏙️", "🌤️", "👕"]), [line("На улице тепло.", "na_ulitse_teplo.mp3")], null, true),
    slide("u12-l35-3", "Холодно", ["На улице холодно."], focus(["🏙️", "🥶", "🧥"]), [line("На улице холодно.", "na_ulitse_holodno.mp3")], null, true),
    slide("u12-l35-4", "Жарко", ["На улице жарко."], focus(["🏙️", "☀️", "🥵"]), [line("На улице жарко.", "na_ulitse_zharko.mp3")], null, true),
    slide("u12-l35-5", "Мокро", ["На улице мокро."], focus(["🏙️", "🌧️", "💧"]), [line("На улице мокро.", "na_ulitse_mokro.mp3")], null, true),
    slide("u12-l35-6", "Сухо", ["На улице сухо."], focus(["🏙️", "☀️", "🏜️"]), [line("На улице сухо.", "na_ulitse_suho.mp3")], null, true),
    slide("u12-l35-7", "Дождь", ["Дождь.", "Мокро."], focus(["🌧️", "💧"]), [line("Дождь. Мокро.", "u12_l35_dozhd_mokro.mp3")], [
      question("u12-l35-q1", "Дождь. Как?", feelOptions, "wet", "🌧️")
    ], true),
    slide("u12-l35-8", "Снег", ["Снег.", "Холодно."], focus(["❄️", "🥶"]), [line("Снег. Холодно.", "u12_l35_sneg_holodno.mp3")], [
      question("u12-l35-q2", "Снег. Как?", feelOptions, "cold", "❄️")
    ], true),
    slide("u12-l35-9", "Солнце", ["Солнце.", "Тепло."], focus(["☀️", "🌤️"]), [line("Солнце. Тепло.", "u12_l35_solntse_teplo.mp3")], [
      question("u12-l35-q3", "Солнце. Как?", feelOptions, "warm", "☀️")
    ], true),
    slide("u12-l35-10", "Читай", ["На улице дождь.", "На улице мокро.", "Я дома.", "У меня есть куртка."], focus(["🏙️🌧️", "💧", "🙂🏠", "🙂✅🧥"]), [line("На улице дождь. На улице мокро. Я дома. У меня есть куртка.", "u12_l35_text.mp3")], [
      question("u12-l35-q4", "Какая погода?", weatherOptions, "rain", "🌧️"),
      question("u12-l35-q5", "Как на улице?", feelOptions, "wet", "🏙️"),
      question("u12-l35-q6", "Что есть?", clothingOptions, "jacket", "🙂✅")
    ], true),
    slide("u12-l35-11", "Отлично!", ["Отлично! ✅", "тепло", "холодно", "мокро", "сухо"], wordList([{ text: "тепло", emoji: "🌤️" }, { text: "холодно", emoji: "🥶" }, { text: "мокро", emoji: "💧" }, { text: "сухо", emoji: "🏜️" }]), [line("Отлично! Тепло. Холодно. Мокро. Сухо.", "u12_l35_final.mp3")], null, true)
  ];

  var lesson36Slides = [
    slide("u12-l36-1", "Что надеть?", ["Что надеть?", "🧥 🧢 🧣 👕"], focus(["❓", "🧥", "🧢", "🧣", "👕"]), [line("Что надеть?", "u12_l36_chto_nadet.mp3")], null, true),
    slide("u12-l36-2", "Куртка", ["Холодно.", "Надень куртку."], focus(["🥶", "🧥"]), [line("Холодно. Надень куртку.", "u12_l36_holodno_naden_kurtku.mp3")], [
      question("u12-l36-q1", "Что надеть?", wearPhraseOptions, "jacket", "🥶")
    ], true),
    slide("u12-l36-3", "Шапка", ["Снег.", "Надень шапку."], focus(["❄️", "🧢"]), [line("Снег. Надень шапку.", "u12_l36_sneg_naden_shapku.mp3")], [
      question("u12-l36-q2", "Что надеть?", wearPhraseOptions, "hat", "❄️")
    ], true),
    slide("u12-l36-4", "Шарф", ["Ветер.", "Надень шарф."], focus(["💨", "🧣"]), [line("Ветер. Надень шарф.", "u12_l36_veter_naden_sharf.mp3")], [
      question("u12-l36-q3", "Что надеть?", wearPhraseOptions, "scarf", "💨")
    ], true),
    slide("u12-l36-5", "Футболка", ["Тепло.", "Надень футболку."], focus(["🌤️", "👕"]), [line("Тепло. Надень футболку.", "u12_l36_teplo_naden_futbolku.mp3")], [
      question("u12-l36-q4", "Что надеть?", wearPhraseOptions, "shirt", "🌤️")
    ], true),
    slide("u12-l36-6", "Дождь", ["Дождь.", "Надень куртку."], focus(["🌧️", "🧥"]), [line("Дождь. Надень куртку.", "u12_l36_dozhd_naden_kurtku.mp3")], [
      question("u12-l36-q5", "Что надеть?", wearPhraseOptions, "jacket", "🌧️")
    ], true),
    slide("u12-l36-7", "Школа", ["Я иду в школу.", "Холодно."], focus(["🙂🚶‍➡️🏫", "🥶"]), [line("Я иду в школу. Холодно.", "u12_l36_idu_v_shkolu_holodno.mp3")], [
      question("u12-l36-q6", "Что надеть?", wearPhraseOptions, "jacket", "🥶")
    ], true),
    slide("u12-l36-8", "Парк", ["Я иду в парк.", "Тепло."], focus(["🙂🚶‍➡️🌳", "🌤️"]), [line("Я иду в парк. Тепло.", "u12_l36_idu_v_park_teplo.mp3")], [
      question("u12-l36-q7", "Что надеть?", wearPhraseOptions, "shirt", "🌤️")
    ], true),
    slide("u12-l36-9", "Читай", ["Утро.", "На улице холодно.", "Я иду в школу.", "Надень куртку.", "Надень шапку."], focus(["🌅", "🏙️🥶", "🙂🚶‍➡️🏫", "🧥", "🧢"]), [line("Утро. На улице холодно. Я иду в школу. Надень куртку. Надень шапку.", "u12_l36_text.mp3")], [
      question("u12-l36-q8", "Как на улице?", feelOptions, "cold", "🏙️"),
      question("u12-l36-q9", "Куда я иду?", [option("school", "в школу", "🏫"), option("park", "в парк", "🌳"), option("home", "домой", "🏠")], "school", "🙂"),
      question("u12-l36-q10", "Что надеть?", wearPhraseOptions, "hat", "🧢")
    ], true),
    slide("u12-l36-10", "Отлично!", ["Отлично! ✅", "надень куртку", "надень шапку", "надень шарф", "надень футболку"], wordList([{ text: "надень куртку", emoji: "🧥" }, { text: "надень шапку", emoji: "🧢" }, { text: "надень шарф", emoji: "🧣" }, { text: "надень футболку", emoji: "👕" }]), [line("Отлично! Надень куртку. Надень шапку. Надень шарф. Надень футболку.", "u12_l36_final.mp3")], null, true)
  ];

  var weatherChoiceGame = {
    id: "unit-12-game-weather-choice",
    gameSlug: "unit-12-game-weather-choice",
    kind: "weather-choice",
    icon: "🌦️",
    title: "Какая погода?",
    finalTitle: "Отлично! Погода понятна! ✅",
    finalText: "солнце · дождь · снег · ветер",
    finalWords: ["солнце", "дождь", "снег", "ветер"],
    rounds: [
      choiceTask("u12-weather-1", "Какая погода?", group("sun", "солнце", "☀️", 1, "weather"), "u12_game_weather_sun.mp3", weatherOptions, "sun", "Да! Солнце.", "Нет. Это солнце."),
      choiceTask("u12-weather-2", "Какая погода?", group("rain", "дождь", "🌧️", 1, "weather"), "u12_game_weather_rain.mp3", weatherOptions, "rain", "Да! Дождь.", "Нет. Это дождь."),
      choiceTask("u12-weather-3", "Какая погода?", group("snow", "снег", "❄️", 1, "weather"), "u12_game_weather_snow.mp3", weatherOptions, "snow", "Да! Снег.", "Нет. Это снег."),
      choiceTask("u12-weather-4", "Какая погода?", group("wind", "ветер", "💨", 1, "weather"), "u12_game_weather_wind.mp3", weatherOptions, "wind", "Да! Ветер.", "Нет. Это ветер."),
      choiceTask("u12-weather-5", "Что сегодня?", group("today-sun", "сегодня солнце", "📅☀️", 1, "weather"), "u12_game_today_sun.mp3", weatherOptions, "sun", "Да! Сегодня солнце.", "Нет. Сегодня солнце."),
      choiceTask("u12-weather-6", "Что сегодня?", group("today-rain", "сегодня дождь", "📅🌧️", 1, "weather"), "u12_game_today_rain.mp3", weatherOptions, "rain", "Да! Сегодня дождь.", "Нет. Сегодня дождь."),
      choiceTask("u12-weather-7", "Что на улице?", group("outside-snow", "на улице снег", "🏙️❄️", 1, "weather"), "u12_game_outside_snow.mp3", weatherOptions, "snow", "Да! Снег.", "Нет. На улице снег."),
      choiceTask("u12-weather-8", "Что на улице?", group("outside-wind", "на улице ветер", "🏙️💨", 1, "weather"), "u12_game_outside_wind.mp3", weatherOptions, "wind", "Да! Ветер.", "Нет. На улице ветер.")
    ]
  };

  var feelGame = {
    id: "unit-12-game-feel",
    gameSlug: "unit-12-game-feel",
    kind: "weather-feel",
    icon: "🌡️",
    title: "Тепло или холодно?",
    finalTitle: "Отлично! На улице понятно! ✅",
    finalText: "тепло · холодно · мокро",
    finalWords: ["тепло", "холодно", "мокро", "жарко"],
    rounds: [
      choiceTask("u12-feel-1", "Как на улице?", group("sun-warm", "солнце", "☀️🌤️", 1, "weather"), "u12_feel_sun_warm.mp3", feelOptions, "warm", "Да! Тепло.", "Нет. Тут тепло."),
      choiceTask("u12-feel-2", "Как на улице?", group("snow-cold", "снег", "❄️🥶", 1, "weather"), "u12_feel_snow_cold.mp3", feelOptions, "cold", "Да! Холодно.", "Нет. Тут холодно."),
      choiceTask("u12-feel-3", "Как на улице?", group("rain-wet", "дождь", "🌧️💧", 1, "weather"), "u12_feel_rain_wet.mp3", feelOptions, "wet", "Да! Мокро.", "Нет. Тут мокро."),
      choiceTask("u12-feel-4", "Как на улице?", group("big-sun-hot", "солнце", "☀️🥵", 1, "weather"), "u12_feel_hot.mp3", feelOptions, "hot", "Да! Жарко.", "Нет. Тут жарко."),
      choiceTask("u12-feel-5", "Как на улице?", group("wind-snow-cold", "ветер и снег", "💨❄️🥶", 1, "weather"), "u12_feel_wind_snow_cold.mp3", feelOptions, "cold", "Да! Холодно.", "Нет. Тут холодно."),
      choiceTask("u12-feel-6", "Как на улице?", group("sun-dry", "солнце", "☀️🏜️", 1, "weather"), "u12_feel_sun_dry.mp3", feelOptions, "dry", "Да! Сухо.", "Нет. Тут сухо.")
    ]
  };

  var clothingGame = {
    id: "unit-12-game-clothing",
    gameSlug: "unit-12-game-clothing",
    kind: "weather-clothing",
    icon: "🧥",
    title: "Что надеть?",
    finalTitle: "Отлично! Одежда по погоде! ✅",
    finalText: "надень",
    finalWords: ["куртка", "шапка", "шарф", "футболка"],
    rounds: [
      choiceTask("u12-clothes-1", "Что надеть?", group("cold", "холодно", "🥶", 1, "weather"), "u12_clothes_cold_jacket.mp3", clothingOptions, "jacket", "Да! Куртка.", "Нет. Нужна куртка."),
      choiceTask("u12-clothes-2", "Что надеть?", group("snow", "снег", "❄️", 1, "weather"), "u12_clothes_snow_hat.mp3", clothingOptions, "hat", "Да! Шапка.", "Нет. Нужна шапка."),
      choiceTask("u12-clothes-3", "Что надеть?", group("wind", "ветер", "💨", 1, "weather"), "u12_clothes_wind_scarf.mp3", clothingOptions, "scarf", "Да! Шарф.", "Нет. Нужен шарф."),
      choiceTask("u12-clothes-4", "Что надеть?", group("warm", "тепло", "🌤️", 1, "weather"), "u12_clothes_warm_shirt.mp3", clothingOptions, "shirt", "Да! Футболка.", "Нет. Нужна футболка."),
      choiceTask("u12-clothes-5", "Что надеть?", group("rain", "дождь", "🌧️", 1, "weather"), "u12_clothes_rain_jacket.mp3", clothingOptions, "jacket", "Да! Куртка.", "Нет. Нужна куртка."),
      choiceTask("u12-clothes-6", "Что надеть?", group("wet", "мокро", "💧", 1, "weather"), "u12_clothes_wet_shoes.mp3", clothingOptions, "shoes", "Да! Обувь.", "Нет. Нужна обувь.")
    ]
  };

  var findWeatherGame = {
    id: "unit-12-game-find-weather",
    gameSlug: "unit-12-game-find-weather",
    kind: "weather-find",
    icon: "🔎",
    title: "Найди погоду",
    findTitle: "Найди погоду",
    finalTitle: "Супер! Погода найдена! ✅",
    finalText: "найди погоду",
    finalWords: ["солнце", "дождь", "снег", "ветер"],
    rounds: [
      commandTask("u12-find-1", "Найди солнце.", "u12_find_sun.mp3", weatherItems, "sun", "Да! Солнце.", "Нет. Нужно солнце."),
      commandTask("u12-find-2", "Найди дождь.", "u12_find_rain.mp3", weatherItems, "rain", "Да! Дождь.", "Нет. Нужен дождь."),
      commandTask("u12-find-3", "Найди снег.", "u12_find_snow.mp3", weatherItems, "snow", "Да! Снег.", "Нет. Нужен снег."),
      commandTask("u12-find-4", "Найди ветер.", "u12_find_wind.mp3", weatherItems, "wind", "Да! Ветер.", "Нет. Нужен ветер."),
      commandTask("u12-find-5", "Найди тепло.", "u12_find_warm.mp3", weatherItems, "warm", "Да! Тепло.", "Нет. Нужно тепло."),
      commandTask("u12-find-6", "Найди холодно.", "u12_find_cold.mp3", weatherItems, "cold", "Да! Холодно.", "Нет. Нужно холодно.")
    ]
  };

  var phraseGame = {
    id: "unit-12-game-weather-clothing",
    gameSlug: "unit-12-game-weather-clothing",
    kind: "weather-phrase",
    icon: "👕",
    title: "Погода и одежда",
    finalTitle: "Отлично! Погода и одежда вместе! ✅",
    finalText: "погода · одежда",
    finalWords: ["холодно", "куртка", "ветер", "шарф"],
    rounds: [
      choiceTask("u12-phrase-1", "Выбери.", group("cold-jacket", "холодно", "🥶🧥", 1, "weather"), "u12_phrase_cold_jacket.mp3", wearPhraseOptions, "jacket", "Да! Надень куртку.", "Нет. Надень куртку."),
      choiceTask("u12-phrase-2", "Выбери.", group("snow-hat", "снег", "❄️🧢", 1, "weather"), "u12_phrase_snow_hat.mp3", wearPhraseOptions, "hat", "Да! Надень шапку.", "Нет. Надень шапку."),
      choiceTask("u12-phrase-3", "Выбери.", group("wind-scarf", "ветер", "💨🧣", 1, "weather"), "u12_phrase_wind_scarf.mp3", wearPhraseOptions, "scarf", "Да! Надень шарф.", "Нет. Надень шарф."),
      choiceTask("u12-phrase-4", "Выбери.", group("warm-shirt", "тепло", "🌤️👕", 1, "weather"), "u12_phrase_warm_shirt.mp3", wearPhraseOptions, "shirt", "Да! Надень футболку.", "Нет. Надень футболку."),
      choiceTask("u12-phrase-5", "Выбери.", group("rain-jacket", "дождь", "🌧️🧥", 1, "weather"), "u12_phrase_rain_jacket.mp3", wearPhraseOptions, "jacket", "Да! Надень куртку.", "Нет. Надень куртку."),
      choiceTask("u12-phrase-6", "Выбери.", group("wet-shoes", "мокро", "💧👟", 1, "weather"), "u12_phrase_wet_shoes.mp3", wearPhraseOptions, "shoes", "Да! Надень обувь.", "Нет. Надень обувь.")
    ]
  };

  var weatherMapGame = {
    id: "unit-12-game-weather-map",
    gameSlug: "unit-12-game-weather-map",
    kind: "weather-map",
    icon: "🗺️",
    title: "Карта погоды",
    mapTitle: "Карта погоды",
    finalTitle: "Отлично! Карта погоды готова! 🏆",
    finalText: "погода · одежда · карта",
    finalWords: ["солнце", "дождь", "снег", "ветер"],
    gridSize: 5,
    start: { x: 0, y: 4 },
    objects: [
      group("home", "дом", "🏠", 1, "place", 0, 4),
      group("school", "школа", "🏫", 1, "place", 4, 0),
      group("park", "парк", "🌳", 1, "place", 0, 1),
      group("cafe", "кафе", "🏢☕", 1, "place", 4, 4),
      group("sun", "солнце", "☀️", 1, "weather", 2, 0),
      group("rain", "дождь", "🌧️", 1, "weather", 3, 2),
      group("snow", "снег", "❄️", 1, "weather", 1, 2),
      group("wind", "ветер", "💨", 1, "weather", 4, 2),
      group("jacket", "куртка", "🧥", 1, "clothes", 2, 3),
      group("hat", "шапка", "🧢", 1, "clothes", 1, 0),
      group("scarf", "шарф", "🧣", 1, "clothes", 3, 4),
      group("shirt", "футболка", "👕", 1, "clothes", 0, 3)
    ],
    rounds: [
      { id: "u12-map-1", command: "Иди к солнцу.", text: "Иди к солнцу.", audio: audio("u12_map_go_sun.mp3"), target: "sun", hint: "Нужно солнце.", correctFeedback: "Да! Солнце." },
      { id: "u12-map-2", command: "Найди дождь.", text: "Найди дождь.", audio: audio("u12_map_find_rain.mp3"), target: "rain", hint: "Нужен дождь.", correctFeedback: "Да! Дождь." },
      { id: "u12-map-3", command: "Найди снег.", text: "Найди снег.", audio: audio("u12_map_find_snow.mp3"), target: "snow", hint: "Нужен снег.", correctFeedback: "Да! Снег." },
      { id: "u12-map-4", command: "Найди ветер.", text: "Найди ветер.", audio: audio("u12_map_find_wind.mp3"), target: "wind", hint: "Нужен ветер.", correctFeedback: "Да! Ветер." },
      { id: "u12-map-5", command: "Холодно. Найди куртку.", text: "Холодно. Найди куртку.", audio: audio("u12_map_cold_find_jacket.mp3"), target: "jacket", hint: "Нужна куртка.", correctFeedback: "Да! Куртка." },
      { id: "u12-map-6", command: "Снег. Найди шапку.", text: "Снег. Найди шапку.", audio: audio("u12_map_snow_find_hat.mp3"), target: "hat", hint: "Нужна шапка.", correctFeedback: "Да! Шапка." },
      { id: "u12-map-7", command: "Ветер. Найди шарф.", text: "Ветер. Найди шарф.", audio: audio("u12_map_wind_find_scarf.mp3"), target: "scarf", hint: "Нужен шарф.", correctFeedback: "Да! Шарф." },
      { id: "u12-map-8", command: "Тепло. Найди футболку.", text: "Тепло. Найди футболку.", audio: audio("u12_map_warm_find_shirt.mp3"), target: "shirt", hint: "Нужна футболка.", correctFeedback: "Да! Футболка." },
      { id: "u12-map-9", command: "Иди в школу.", text: "Иди в школу.", audio: audio("u12_map_go_school.mp3"), target: "school", hint: "Нужна школа.", correctFeedback: "Да! Школа." },
      { id: "u12-map-10", command: "Иди домой.", text: "Иди домой.", audio: audio("u12_map_go_home.mp3"), target: "home", hint: "Нужен дом.", correctFeedback: "Да! Дом." }
    ]
  };

  var todayGame = {
    id: "unit-12-game-today",
    gameSlug: "unit-12-game-today",
    kind: "today-weather",
    icon: "📅",
    title: "Сегодня",
    finalTitle: "Отлично! Сегодня понятно! ✅",
    finalText: "сегодня",
    finalWords: ["сегодня солнце", "сегодня дождь", "сегодня снег"],
    rounds: [
      choiceTask("u12-today-1", "Сегодня солнце.", group("today-sun", "сегодня", "📅☀️", 1, "weather"), "u12_today_sun.mp3", weatherOptions, "sun", "Да! Сегодня солнце.", "Нет. Сегодня солнце."),
      choiceTask("u12-today-2", "Сегодня дождь.", group("today-rain", "сегодня", "📅🌧️", 1, "weather"), "u12_today_rain.mp3", weatherOptions, "rain", "Да! Сегодня дождь.", "Нет. Сегодня дождь."),
      choiceTask("u12-today-3", "Сегодня снег.", group("today-snow", "сегодня", "📅❄️", 1, "weather"), "u12_today_snow.mp3", weatherOptions, "snow", "Да! Сегодня снег.", "Нет. Сегодня снег."),
      choiceTask("u12-today-4", "Сегодня ветер.", group("today-wind", "сегодня", "📅💨", 1, "weather"), "u12_today_wind.mp3", weatherOptions, "wind", "Да! Сегодня ветер.", "Нет. Сегодня ветер."),
      choiceTask("u12-today-5", "На улице тепло.", group("today-warm", "на улице", "🏙️🌤️", 1, "weather"), "u12_today_warm.mp3", feelOptions, "warm", "Да! Тепло.", "Нет. На улице тепло."),
      choiceTask("u12-today-6", "На улице холодно.", group("today-cold", "на улице", "🏙️🥶", 1, "weather"), "u12_today_cold.mp3", feelOptions, "cold", "Да! Холодно.", "Нет. На улице холодно.")
    ]
  };

  var UNIT12_GAMES = {
    weatherChoiceGame: weatherChoiceGame,
    feelGame: feelGame,
    clothingGame: clothingGame,
    findWeatherGame: findWeatherGame,
    phraseGame: phraseGame,
    weatherMapGame: weatherMapGame,
    todayGame: todayGame
  };

  root.LexiLandUnit12Lesson = {
    id: "level-0-unit-12-weather",
    order: 14,
    menuLabel: "Юнит 12",
    title: "Юнит 12: Погода",
    subtitle: "Погода, улица, одежда",
    level: "Уровень 0",
    coverEmoji: "🌦️",
    dictionary: dictionary,
    scenes: [],
    units: [
      unit("lesson-34-kakaya-pogoda", "Урок 34: Какая погода?", "🌦️", "Урок 34: Какая погода?", lesson34Slides),
      unit("lesson-35-teplo-holodno", "Урок 35: Тепло / холодно", "🌡️", "Урок 35: Тепло / холодно", lesson35Slides),
      unit("lesson-36-chto-nadet", "Урок 36: Что надеть?", "🧥", "Урок 36: Что надеть?", lesson36Slides),
      gameUnit("unit-12-game-weather-choice", "Игра: Какая погода?", "🌦️", weatherChoiceGame),
      gameUnit("unit-12-game-feel", "Игра 2: Тепло или холодно?", "🌡️", feelGame),
      gameUnit("unit-12-game-clothing", "Игра 3: Что надеть?", "🧥", clothingGame),
      gameUnit("unit-12-game-find-weather", "Игра 4: Найди погоду", "🔎", findWeatherGame),
      gameUnit("unit-12-game-weather-clothing", "Игра 5: Погода и одежда", "👕", phraseGame),
      gameUnit("unit-12-game-weather-map", "Игра 6: Карта погоды", "🗺️", weatherMapGame),
      gameUnit("unit-12-game-today", "Игра 7: Сегодня", "📅", todayGame)
    ]
  };

  root.LexiLandUnit12Games = UNIT12_GAMES;
  root.LexiLandUnit12 = root.LexiLandUnit12Lesson;
}(typeof window !== "undefined" ? window : globalThis));
