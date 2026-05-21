(function (root) {
  "use strict";

  var audioRoot = "assets/audio/ru/";
  var dictionaryMap = {};
  var dictionary = [];

  function audio(file) {
    return audioRoot + file;
  }

  function entry(id, text, emoji, type, file) {
    var item = {
      id: id,
      text: text,
      emoji: emoji,
      type: type,
      audio: audio(file || id + ".mp3")
    };

    if (!dictionaryMap[id]) {
      dictionaryMap[id] = item;
      dictionary.push(item);
    }

    return dictionaryMap[id];
  }

  function line(text, file) {
    return {
      text: text,
      audio: audio(file),
      rate: "-22%"
    };
  }

  function option(id, text, emoji) {
    return {
      id: id,
      text: text,
      emoji: emoji
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

  function slide(id, title, text, visual, audioItems, questions) {
    var task = {
      id: id,
      title: title || "",
      text: text || [],
      visual: visual || null,
      audio: audioItems || []
    };

    if (questions && questions.length) {
      task.questions = questions;
    }

    return task;
  }

  var CYRILLIC_TO_LATIN = {
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "yo",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "й": "y",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "ts",
    "ч": "ch",
    "ш": "sh",
    "щ": "shch",
    "ъ": "",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya"
  };

  function slug(text) {
    return String(text || "")
      .toLowerCase()
      .split("")
      .map(function (letter) {
        if (CYRILLIC_TO_LATIN[letter] !== undefined) {
          return CYRILLIC_TO_LATIN[letter];
        }
        return /[a-z0-9]/.test(letter) ? letter : "_";
      })
      .join("")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }

  function letterEntry(letter) {
    return entry("l0-letter-" + letter[0], letter[1] + " " + letter[2], letter[3], "letter", letter[0] + ".mp3");
  }

  function syllableEntry(text) {
    return entry("l0-syllable-" + slug(text), text, "🔶", "syllable", slug(text) + ".mp3");
  }

  function wordEntry(word) {
    return entry("l0-word-" + word[0], word[1], word[2], "word", word[0] + ".mp3");
  }

  function textEntry(id, text, emoji) {
    return entry("l0-text-" + id, text, emoji, "text", id + ".mp3");
  }

  function asOption(item) {
    return option(item.id, item.text, item.emoji);
  }

  function letterSlide(unitId, index, letter) {
    var item = letterEntry(letter);
    return slide(
      unitId + "-letter-" + letter[0],
      "Буква",
      ["Смотри", "Читай"],
      { type: "letter-card", upper: letter[1], lower: letter[2], emoji: letter[3] },
      [line(letter[1], letter[0] + ".mp3")]
    );
  }

  function syllableSlide(unitId, index, items) {
    items.forEach(syllableEntry);
    return slide(
      unitId + "-syllables-" + index,
      "Слоги",
      ["Читай", "Повтори"],
      { type: "syllable-grid", items: items },
      [line(items.join(" "), items.map(slug).join("_") + ".mp3")]
    );
  }

  function wordSlide(unitId, index, words) {
    var entries = words.map(wordEntry);
    return slide(
      unitId + "-words-" + index,
      "Слова",
      ["Читай"],
      {
        type: "word-list",
        items: entries.map(function (item) {
          return { text: item.text, emoji: item.emoji };
        })
      },
      [line(entries.map(function (item) { return item.text; }).join(" "), unitId + "_words_" + index + ".mp3")]
    );
  }

  function readingSlide(unitId, index, title, lines, meanings, questions) {
    var text = lines.join(" ");
    textEntry(unitId + "_reading_" + index, text, "📖");
    var task = slide(
      unitId + "-reading-" + index,
      title || "Читай",
      lines,
      { type: "word-list", items: [] },
      [line(text, unitId + "_reading_" + index + ".mp3")],
      questions
    );
    task.reading = true;
    task.wordMeanings = meanings || {};
    return task;
  }

  function chunk(items, size) {
    var chunks = [];
    for (var i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  }

  var GROUPS = [
    {
      id: "letters-1",
      title: "Буквы 1",
      icon: "🅰️",
      letters: [
        ["a", "А", "а", "🅰️"],
        ["o", "О", "о", "⭕"],
        ["m", "М", "м", "👄"],
        ["t", "Т", "т", "🔨"],
        ["k", "К", "к", "🐱"],
        ["s", "С", "с", "🐍"],
        ["n", "Н", "н", "👃"],
        ["r", "Р", "р", "🚀"]
      ],
      syllables: ["ма", "мо", "му", "та", "то", "ту", "ка", "ко", "ку", "са", "со", "су", "на", "но", "ну", "ра", "ро", "ру"],
      words: [
        ["mama", "мама", "👩"],
        ["tam", "там", "👈"],
        ["tut", "тут", "📍"],
        ["kot", "кот", "🐱"],
        ["kom", "ком", "⚪"],
        ["sok", "сок", "🧃"],
        ["nos", "нос", "👃"],
        ["rot", "рот", "👄"]
      ],
      copy: "мама",
      questionType: "letter"
    },
    {
      id: "letters-2",
      title: "Буквы 2",
      icon: "🔤",
      letters: [
        ["p", "П", "п", "👨"],
        ["b", "Б", "б", "🏦"],
        ["d", "Д", "д", "🏠"],
        ["g", "Г", "г", "📅"],
        ["l", "Л", "л", "💡"],
        ["v", "В", "в", "💧"],
        ["z", "З", "з", "🦷"],
        ["i", "И", "и", "➕"],
        ["u", "У", "у", "🦆"],
        ["e", "Э", "э", "↩️"]
      ],
      syllables: ["па", "по", "пу", "ба", "бо", "бу", "да", "до", "ду", "ла", "ло", "лу", "ва", "во", "ву", "за", "зо", "зу"],
      words: [
        ["papa", "папа", "👨"],
        ["dom", "дом", "🏠"],
        ["dub", "дуб", "🌳"],
        ["god", "год", "📅"],
        ["luk", "лук", "🧅"],
        ["zal", "зал", "🏛️"],
        ["zub", "зуб", "🦷"],
        ["voda", "вода", "💧"],
        ["lampa", "лампа", "💡"],
        ["banka", "банка", "🏦"]
      ],
      copy: "дом",
      questionType: "word"
    },
    {
      id: "syllables",
      title: "Слоги",
      icon: "🧩",
      letters: [],
      syllableRows: [
        ["ма", "мо", "му", "мэ", "ми", "мы"],
        ["та", "то", "ту", "тэ", "ти", "ты"],
        ["па", "по", "пу", "пэ", "пи", "пы"],
        ["ла", "ло", "лу", "лэ", "ли", "лы"],
        ["на", "но", "ну", "нэ", "ни", "ны"]
      ],
      words: [
        ["mama", "мама", "👩"],
        ["papa", "папа", "👨"],
        ["lampa", "лампа", "💡"],
        ["voda", "вода", "💧"],
        ["dom", "дом", "🏠"],
        ["kot", "кот", "🐱"]
      ],
      copy: "папа",
      questionType: "syllable"
    },
    {
      id: "soft",
      title: "Мягко",
      icon: "🧸",
      letters: [
        ["ye", "Е", "е", "📘"],
        ["yo", "Ё", "ё", "🎄"],
        ["yu", "Ю", "ю", "🌀"],
        ["ya", "Я", "я", "🙂👈"],
        ["soft", "Ь", "ь", "🧸"]
      ],
      syllableRows: [
        ["ма", "мя"],
        ["мо", "мё"],
        ["му", "мю"],
        ["мэ", "ме"],
        ["на", "ня"],
        ["та", "тя"],
        ["ла", "ля"]
      ],
      words: [
        ["myach", "мяч", "⚽"],
        ["pyat", "пять", "5️⃣"],
        ["den", "день", "☀️"],
        ["kon", "конь", "♞"],
        ["semya", "семья", "👨‍👩‍👧"],
        ["tyotya", "тётя", "👩"],
        ["lyuba", "Люба", "👧"],
        ["lyonya", "Лёня", "👦"]
      ],
      copy: "мяч",
      questionType: "word"
    },
    {
      id: "hard",
      title: "Трудные буквы",
      icon: "⚡",
      letters: [
        ["zh", "Ж", "ж", "🐞"],
        ["sh", "Ш", "ш", "🎈"],
        ["ch", "Ч", "ч", "☕"],
        ["shch", "Щ", "щ", "🥣"],
        ["ts", "Ц", "ц", "🎪"],
        ["h", "Х", "х", "🍞"],
        ["f", "Ф", "ф", "📷"],
        ["y", "Й", "й", "🧃"],
        ["hard", "Ъ", "ъ", "🪨"]
      ],
      syllables: ["жа", "шо", "чу", "щи", "ца", "хо", "фо", "мой", "под"],
      words: [
        ["zhuk", "жук", "🐞"],
        ["shar", "шар", "🎈"],
        ["chay", "чай", "☕"],
        ["shchi", "щи", "🥣"],
        ["tsirk", "цирк", "🎪"],
        ["hleb", "хлеб", "🍞"],
        ["foto", "фото", "📷"],
        ["moy", "мой", "🙂👈"],
        ["podezd", "подъезд", "🏢"]
      ],
      copy: "чай",
      questionType: "word"
    },
    {
      id: "words",
      title: "Слова",
      icon: "📦",
      letters: [],
      categories: [
        {
          title: "Люди",
          words: [
            ["mama", "мама", "👩"],
            ["papa", "папа", "👨"],
            ["brat", "брат", "👦"],
            ["sestra", "сестра", "👧"],
            ["drug", "друг", "🙂"],
            ["on", "он", "👦"],
            ["ona", "она", "👧"]
          ]
        },
        {
          title: "Места",
          words: [
            ["dom", "дом", "🏠"],
            ["park", "парк", "🌳🌳🌳"],
            ["klass", "класс", "🏫"],
            ["shkola", "школа", "🏫"],
            ["kafe", "кафе", "🏢☕"]
          ]
        },
        {
          title: "Вещи",
          words: [
            ["stol", "стол", "🪑"],
            ["stul", "стул", "🪑"],
            ["kniga", "книга", "📘"],
            ["telefon", "телефон", "📱"],
            ["voda", "вода", "💧"],
            ["sok", "сок", "🧃"],
            ["hleb", "хлеб", "🍞"]
          ]
        },
        {
          title: "Действия",
          words: [
            ["idyot", "идёт", "🚶"],
            ["est", "ест", "🍽️"],
            ["pyot", "пьёт", "🥤"],
            ["chitaet", "читает", "📖"],
            ["spit", "спит", "😴"]
          ]
        }
      ],
      copy: "книга",
      questionType: "word"
    }
  ];

  var MINI_TEXTS = [
    {
      id: "text-1",
      lines: ["Это мама.", "Мама дома.", "Тут кот."],
      meanings: { "это": "👉", "мама": "👩", "дома": "🏠", "тут": "📍", "кот": "🐱" },
      question: question("l0-text-q-1", "Кто дома?", [
        option("mama", "мама", "👩"),
        option("kot", "кот", "🐱")
      ], "mama"),
      copy: "Тут кот."
    },
    {
      id: "text-2",
      lines: ["Это парк.", "Там папа.", "Папа пьёт сок."],
      meanings: { "это": "👉", "парк": "🌳🌳🌳", "там": "👈", "папа": "👨", "пьёт": "🥤", "сок": "🧃" },
      question: question("l0-text-q-2", "Где папа?", [
        option("park", "парк", "🌳🌳🌳"),
        option("dom", "дом", "🏠")
      ], "park"),
      copy: "Папа пьёт сок."
    },
    {
      id: "text-3",
      lines: ["Это школа.", "Тут Анна.", "Анна читает."],
      meanings: { "это": "👉", "школа": "🏫", "тут": "📍", "анна": "👧", "читает": "📖" },
      question: question("l0-text-q-3", "Что делает Анна?", [
        option("chitaet", "читает", "📖"),
        option("spit", "спит", "😴")
      ], "chitaet"),
      copy: "Анна читает."
    },
    {
      id: "text-4",
      lines: ["У меня есть дом.", "В доме кот.", "Кот спит."],
      meanings: { "у": "🙂👈", "меня": "🙂👈", "есть": "✅", "дом": "🏠", "в": "🏠", "доме": "🏠", "кот": "🐱", "спит": "😴" },
      question: question("l0-text-q-4", "Кто спит?", [
        option("kot", "кот", "🐱"),
        option("mama", "мама", "👩")
      ], "kot"),
      copy: "Кот спит."
    }
  ];

  var EXTRA_WORDS = [
    ["eto", "это", "👉"],
    ["doma", "дома", "🏠"],
    ["anna", "Анна", "👧"],
    ["u", "у", "🙂👈"],
    ["menya", "меня", "🙂👈"],
    ["est_yes", "есть", "✅"],
    ["v", "в", "➡️"],
    ["dome", "доме", "🏠"],
    ["kto", "кто", "❓🙂"],
    ["gde", "где", "❓📍"],
    ["chto", "что", "❓"]
  ];

  EXTRA_WORDS.forEach(wordEntry);

  function successSlide(unitId) {
    return slide(
      unitId + "-success",
      "Отлично",
      ["Отлично ✅"],
      { type: "emoji", emoji: "✅" },
      [line("Отлично", "otlichno.mp3")]
    );
  }

  function goalSlide(unitId, group) {
    return slide(
      unitId + "-goal",
      group.title,
      ["Смотри", "Читай", "Слушай"],
      { type: "emoji", emoji: group.icon },
      [line(group.title, unitId + "_goal.mp3")]
    );
  }

  function makeQuickQuestion(unitId, group, unitNumber) {
    if (group.questionType === "letter" && group.letters.length) {
      var correctLetter = letterEntry(group.letters[0]);
      return slide(
        unitId + "-question-letter",
        "Выбери",
        ["Выбери"],
        { type: "letter-card", upper: group.letters[0][1], lower: group.letters[0][2], emoji: group.letters[0][3] },
        [line(group.letters[0][1], group.letters[0][0] + ".mp3")],
        [
          question("l0-u" + unitNumber + "-q-letter", "Где " + group.letters[0][1] + "?", group.letters.slice(0, 3).map(function (letter) {
            return asOption(letterEntry(letter));
          }), correctLetter.id)
        ]
      );
    }

    if (group.questionType === "syllable") {
      var syllable = syllableEntry("ма");
      return slide(
        unitId + "-question-syllable",
        "Выбери",
        ["Выбери"],
        { type: "syllable-grid", items: ["ма", "мо", "му"] },
        [line("ма", "ma.mp3")],
        [
          question("l0-u" + unitNumber + "-q-syllable", "Выбери ма", ["ма", "мо", "му"].map(function (text) {
            return asOption(syllableEntry(text));
          }), syllable.id)
        ]
      );
    }

    var firstWord = wordEntry((group.words || group.categories[0].words)[0]);
    var optionWords = (group.words || group.categories[0].words).slice(0, 3).map(function (word) {
      return asOption(wordEntry(word));
    });
    return slide(
      unitId + "-question-word",
      "Выбери",
      ["Выбери"],
      { type: "word-list", items: [{ text: firstWord.text, emoji: firstWord.emoji }] },
      [line(firstWord.text, firstWord.audio.replace(audioRoot, ""))],
      [
        question("l0-u" + unitNumber + "-q-word", "Выбери " + firstWord.text, optionWords, firstWord.id)
      ]
    );
  }

  function makeBasicUnit(group, unitNumber) {
    var unitId = "l0-u" + unitNumber;
    var tasks = [goalSlide(unitId, group)];

    (group.letters || []).forEach(function (letter, index) {
      tasks.push(letterSlide(unitId, index + 1, letter));
    });

    if (group.syllableRows) {
      group.syllableRows.forEach(function (row, index) {
        tasks.push(syllableSlide(unitId, index + 1, row));
      });
    } else if (group.syllables) {
      chunk(group.syllables, 6).slice(0, 3).forEach(function (items, index) {
        tasks.push(syllableSlide(unitId, index + 1, items));
      });
    }

    if (group.categories) {
      group.categories.forEach(function (category, index) {
        tasks.push(wordSlide(unitId, index + 1, category.words));
      });
      group.categories[3].words.forEach(function (word, index) {
        tasks.push(wordSlide(unitId, "action-" + index, [word]));
      });
    } else {
      chunk(group.words || [], 4).slice(0, 2).forEach(function (words, index) {
        tasks.push(wordSlide(unitId, index + 1, words));
      });
    }

    tasks.push(makeQuickQuestion(unitId, group, unitNumber));
    tasks.push(successSlide(unitId));

    return {
      id: "unit-l0-" + group.id,
      title: group.title,
      icon: group.icon,
      stages: [
        {
          type: "slides",
          title: group.title,
          tasks: tasks
        }
      ]
    };
  }

  function makeTextUnit() {
    var unitId = "l0-u7";
    var tasks = [
      slide(unitId + "-goal", "Мини-тексты", ["Читай", "Смотри", "Выбери"], { type: "emoji", emoji: "📖" }, [line("Мини-тексты", "mini_teksty.mp3")]),
      wordSlide(unitId, "review-1", [
        ["mama", "мама", "👩"],
        ["papa", "папа", "👨"],
        ["kot", "кот", "🐱"],
        ["dom", "дом", "🏠"]
      ]),
      wordSlide(unitId, "review-2", [
        ["park", "парк", "🌳🌳🌳"],
        ["shkola", "школа", "🏫"],
        ["sok", "сок", "🧃"],
        ["chitaet", "читает", "📖"]
      ])
    ];

    MINI_TEXTS.forEach(function (item, index) {
      tasks.push(readingSlide(unitId, index + 1, "Читай", item.lines, item.meanings, [item.question]));
    });

    tasks.push(successSlide(unitId));

    return {
      id: "unit-l0-mini-texts",
      title: "Мини-тексты",
      icon: "📖",
      stages: [
        {
          type: "slides",
          title: "Мини-тексты",
          tasks: tasks
        }
      ]
    };
  }

  function makeFinalUnit() {
    var unitId = "l0-u8";
    var letterA = letterEntry(["a", "А", "а", "🅰️"]);
    var syllableMa = syllableEntry("ма");
    var wordMama = wordEntry(["mama", "мама", "👩"]);
    var wordDom = wordEntry(["dom", "дом", "🏠"]);
    var finalMeanings = { "это": "👉", "мама": "👩", "тут": "📍", "дом": "🏠", "кот": "🐱", "спит": "😴" };

    return {
      id: "unit-l0-final",
      title: "Проверка",
      icon: "✅",
      stages: [
        {
          type: "slides",
          title: "Проверка",
          tasks: [
            slide(unitId + "-goal", "Проверка", ["Читай", "Выбери", "Слушай"], { type: "emoji", emoji: "✅" }, [line("Проверка", "proverka.mp3")]),
            slide(unitId + "-letter", "Буква", ["Выбери"], { type: "letter-card", upper: "А", lower: "а", emoji: "🅰️" }, [line("А", "a.mp3")], [
              question("l0-final-q-letter", "Где А?", [
                asOption(letterA),
                asOption(letterEntry(["o", "О", "о", "⭕"])),
                asOption(letterEntry(["m", "М", "м", "👄"]))
              ], letterA.id)
            ]),
            slide(unitId + "-syllable", "Слог", ["Выбери"], { type: "syllable-grid", items: ["ма", "мо", "му"] }, [line("ма", "ma.mp3")], [
              question("l0-final-q-syllable", "Выбери ма", [
                asOption(syllableMa),
                asOption(syllableEntry("мо")),
                asOption(syllableEntry("му"))
              ], syllableMa.id)
            ]),
            slide(unitId + "-word", "Слово", ["Выбери"], { type: "word-list", items: [{ text: "мама", emoji: "👩" }] }, [line("мама", "mama.mp3")], [
              question("l0-final-q-word", "Выбери мама", [
                asOption(wordMama),
                asOption(wordDom),
                asOption(wordEntry(["kot", "кот", "🐱"]))
              ], wordMama.id)
            ]),
            readingSlide(unitId, 1, "Читай", ["Это мама.", "Тут дом.", "Кот спит."], finalMeanings, [
              question("l0-final-q-text", "Кто спит?", [
                option("kot", "кот", "🐱"),
                option("mama", "мама", "👩")
              ], "kot")
            ]),
            slide(unitId + "-same-letter", "Выбери", ["Выбери"], { type: "letter-card", upper: "М", lower: "м", emoji: "👄" }, [line("М", "m.mp3")], [
              question("l0-final-q-m", "Где М?", [
                asOption(letterEntry(["m", "М", "м", "👄"])),
                asOption(letterEntry(["t", "Т", "т", "🔨"])),
                asOption(letterEntry(["r", "Р", "р", "🚀"]))
              ], "l0-letter-m")
            ]),
            slide(unitId + "-same-word", "Выбери", ["Выбери"], { type: "word-list", items: [{ text: "дом", emoji: "🏠" }] }, [line("дом", "dom.mp3")], [
              question("l0-final-q-dom", "Выбери дом", [
                asOption(wordDom),
                asOption(wordEntry(["sok", "сок", "🧃"])),
                asOption(wordEntry(["voda", "вода", "💧"]))
              ], wordDom.id)
            ]),
            slide(unitId + "-same-syllable-2", "Слог", ["Выбери"], { type: "syllable-grid", items: ["ла", "ло", "лу"] }, [line("ло", "lo.mp3")], [
              question("l0-final-q-lo", "Выбери ло", [
                asOption(syllableEntry("ла")),
                asOption(syllableEntry("ло")),
                asOption(syllableEntry("лу"))
              ], "l0-syllable-lo")
            ]),
            slide(unitId + "-same-word-2", "Слово", ["Выбери"], { type: "word-list", items: [{ text: "вода", emoji: "💧" }] }, [line("вода", "voda.mp3")], [
              question("l0-final-q-voda", "Выбери вода", [
                asOption(wordEntry(["voda", "вода", "💧"])),
                asOption(wordEntry(["dom", "дом", "🏠"])),
                asOption(wordEntry(["hleb", "хлеб", "🍞"]))
              ], "l0-word-voda")
            ]),
            successSlide(unitId)
          ]
        }
      ]
    };
  }

  var units = GROUPS.map(function (group, index) {
    return makeBasicUnit(group, index + 1);
  });
  units.push(makeTextUnit());
  units.push(makeFinalUnit());

  root.LexiLandLevel0 = {
    id: "lesson-0-reading",
    order: 0,
    title: "Урок 0. Учимся читать",
    dictionary: dictionary,
    scenes: [],
    units: units
  };
}(typeof window !== "undefined" ? window : globalThis));
