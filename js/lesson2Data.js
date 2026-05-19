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
      type: type,
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

  function scene(near, far) {
    return {
      type: "scene",
      near: near,
      far: far
    };
  }

  function mapObj(id, emoji, x, y, kind) {
    return {
      id: id,
      emoji: emoji,
      x: x,
      y: y,
      kind: kind || ""
    };
  }

  function cityTask(id, text, emoji, file, start, target, objects) {
    return {
      id: id,
      text: text,
      emoji: emoji,
      audio: audio(file),
      width: 5,
      height: 5,
      start: start,
      target: target,
      objects: objects
    };
  }

  var yesNo = [
    option("da", "да", "✅"),
    option("net", "нет", "❌")
  ];

  var hereThere = [
    option("zdes", "здесь", "📍"),
    option("tam", "там", "👈")
  ];

  var readingOne = {
    "я": "🙂👈",
    "здесь": "📍",
    "ты": "🙂👉",
    "там": "👈",
    "кафе": "🏢☕",
    "магазин": "🏪",
    "вода": "💧",
    "яблоко": "🍎"
  };

  var readingTwo = {
    "это": "👉",
    "парк": "🌳🌳🌳",
    "я": "🙂👈",
    "здесь": "📍",
    "метро": "🚇",
    "ты": "🙂👉",
    "там": "👈",
    "один": "1️⃣",
    "автобус": "🚌",
    "два": "2️⃣",
    "дома": "🏠"
  };

  root.LexiLandLesson2 = {
    id: "lesson-2-gde-zdes-tam",
    order: 2,
    title: "Урок 2: Где? Здесь или там?",
    dictionary: [
      entry("gde", "где", "📍🗺️❓", "word", "gde.mp3"),
      entry("ya", "я", "🙂👈", "word", "ya.mp3"),
      entry("ty", "ты", "🙂👉", "word", "ty.mp3"),
      entry("magazin", "магазин", "🏪", "word", "magazin.mp3"),
      entry("park", "парк", "🌳🌳🌳", "word", "park.mp3"),
      entry("metro", "метро", "🚇", "word", "metro.mp3"),
      entry("kafe", "кафе", "🏢☕", "word", "kafe.mp3"),
      entry("shkola", "школа", "🏫", "word", "shkola.mp3"),
      entry("ulitsa", "улица", "🛣️", "word", "ulitsa.mp3"),
      entry("zdes", "здесь", "📍", "word", "zdes.mp3"),
      entry("tam", "там", "👈", "word", "tam.mp3"),
      entry("eto", "это", "👉", "word", "eto.mp3"),
      entry("da", "да", "✅", "word", "da.mp3"),
      entry("net", "нет", "❌", "word", "net.mp3"),
      entry("odin", "один", "1️⃣", "word", "odin.mp3"),
      entry("dva", "два", "2️⃣", "word", "dva.mp3"),
      entry("yabloko", "яблоко", "🍎", "word", "yabloko.mp3"),
      entry("voda", "вода", "💧", "word", "voda.mp3"),
      entry("avtobus", "автобус", "🚌", "word", "avtobus.mp3"),
      entry("dom", "дом", "🏠", "word", "dom.mp3"),
      entry("siniy", "синий", "🔵", "word", "siniy.mp3"),
      entry("krasniy", "красный", "🔴", "word", "krasniy.mp3"),
      entry("gde_ya", "Где я?", "📍🗺️❓🙂👈", "chunk", "gde_ya.mp3"),
      entry("gde_ty", "Где ты?", "📍🗺️❓🙂👉", "chunk", "gde_ty.mp3"),
      entry("ya_zdes", "Я здесь.", "🙂👈📍", "chunk", "ya_zdes.mp3"),
      entry("ya_tam", "Я там.", "🙂👈👈", "chunk", "ya_tam.mp3"),
      entry("ty_zdes", "Ты здесь.", "🙂👉📍", "chunk", "ty_zdes.mp3"),
      entry("ty_tam", "Ты там.", "🙂👉👈", "chunk", "ty_tam.mp3"),
      entry("eto_magazin", "Это магазин.", "👉🏪", "chunk", "eto_magazin.mp3"),
      entry("eto_park", "Это парк.", "👉🌳🌳🌳", "chunk", "eto_park.mp3"),
      entry("eto_metro", "Это метро.", "👉🚇", "chunk", "eto_metro.mp3"),
      entry("eto_kafe", "Это кафе.", "👉🏢☕", "chunk", "eto_kafe.mp3"),
      entry("eto_shkola", "Это школа.", "👉🏫", "chunk", "eto_shkola.mp3"),
      entry("eto_ulitsa", "Это улица.", "👉🛣️", "chunk", "eto_ulitsa.mp3"),
      entry("zdes_magazin", "Здесь магазин.", "📍🏪", "chunk", "zdes_magazin.mp3"),
      entry("tam_magazin", "Там магазин.", "👈🏪", "chunk", "tam_magazin.mp3"),
      entry("zdes_park", "Здесь парк.", "📍🌳🌳🌳", "chunk", "zdes_park.mp3"),
      entry("tam_park", "Там парк.", "👈🌳🌳🌳", "chunk", "tam_park.mp3"),
      entry("zdes_metro", "Здесь метро.", "📍🚇", "chunk", "zdes_metro.mp3"),
      entry("tam_metro", "Там метро.", "👈🚇", "chunk", "tam_metro.mp3"),
      entry("zdes_kafe", "Здесь кафе.", "📍🏢☕", "chunk", "zdes_kafe.mp3"),
      entry("tam_kafe", "Там кафе.", "👈🏢☕", "chunk", "tam_kafe.mp3"),
      entry("zdes_shkola", "Здесь школа.", "📍🏫", "chunk", "zdes_shkola.mp3"),
      entry("tam_ulitsa", "Там улица.", "👈🛣️", "chunk", "tam_ulitsa.mp3"),
      entry("gde_magazin", "Где магазин?", "📍🗺️❓🏪", "question", "gde_magazin.mp3"),
      entry("gde_park", "Где парк?", "📍🗺️❓🌳🌳🌳", "question", "gde_park.mp3"),
      entry("gde_kafe", "Где кафе?", "📍🗺️❓🏢☕", "question", "gde_kafe.mp3"),
      entry("gde_metro", "Где метро?", "📍🗺️❓🚇", "question", "gde_metro.mp3"),
      entry("gde_shkola", "Где школа?", "📍🗺️❓🏫", "question", "gde_shkola.mp3"),
      entry("gde_ulitsa", "Где улица?", "📍🗺️❓🛣️", "question", "gde_ulitsa.mp3"),
      entry("gde_avtobus", "Где автобус?", "📍🗺️❓🚌", "question", "gde_avtobus.mp3"),
      entry("gde_dom", "Где дом?", "📍🗺️❓🏠", "question", "gde_dom.mp3"),
      entry("tam_avtobus", "Там автобус.", "👈🚌", "chunk", "tam_avtobus.mp3"),
      entry("zdes_voda", "Здесь вода.", "📍💧", "chunk", "zdes_voda.mp3"),
      entry("tam_yabloko", "Там яблоко.", "👈🍎", "chunk", "tam_yabloko.mp3"),
      entry("zdes_voda_tam_yabloko", "Здесь вода. Там яблоко.", "📍💧👈🍎", "chunk", "zdes_voda_tam_yabloko.mp3"),
      entry("text_2_full", "Я здесь. Ты там. Здесь кафе. Там магазин. Здесь вода. Там яблоко.", "🙂📍🏢☕🏪💧🍎", "text", "text_2_full.mp3"),
      entry("text_2_extra", "Это парк. Я здесь. Это метро. Ты там. Здесь один автобус. Там два дома.", "🌳🌳🌳📍🚇👈1️⃣🚌2️⃣🏠", "text", "text_2_extra.mp3"),
      entry("otlichno", "Отлично!", "✅", "feedback", "otlichno.mp3")
    ],
    scenes: [],
    units: [
      {
        id: "unit-lesson-2-slides",
        title: "Урок 2",
        icon: "📍🗺️❓",
        stages: [
          {
            type: "slides",
            title: "Где?",
            tasks: [
              {
                id: "l2-slide-1",
                title: "Урок 2",
                text: ["Где?", "📍🗺️❓"],
                visual: { type: "emoji", emoji: "📍🗺️❓" },
                audio: [line("Урок 2", "urok_2.mp3"), line("где", "gde.mp3")]
              },
              {
                id: "l2-slide-2",
                text: ["здесь 📍", "там 👈"],
                visual: { type: "here-there" },
                audio: [line("здесь", "zdes.mp3"), line("там", "tam.mp3")]
              },
              {
                id: "l2-slide-3",
                text: ["где? 📍🗺️❓", "Где?"],
                visual: { type: "person-question" },
                audio: [line("где", "gde.mp3")]
              },
              {
                id: "l2-slide-4",
                text: ["я 🙂👈", "Я здесь."],
                visual: { type: "self-here" },
                audio: [line("я", "ya.mp3"), line("Я здесь.", "ya_zdes.mp3")]
              },
              {
                id: "l2-slide-5",
                text: ["ты 🙂👉", "Ты там."],
                visual: { type: "you-there" },
                audio: [line("ты", "ty.mp3"), line("Ты там.", "ty_tam.mp3")]
              },
              {
                id: "l2-slide-6",
                text: ["Где я?"],
                visual: { type: "self-here" },
                reveal: line("Я здесь.", "ya_zdes.mp3"),
                audio: [line("Где я?", "gde_ya.mp3")],
                questions: [
                  question("l2-q6", "Где я?", [
                    option("ya_zdes", "Я здесь.", "🙂👈📍"),
                    option("ya_tam", "Я там.", "🙂👈👈")
                  ], "ya_zdes")
                ]
              },
              {
                id: "l2-slide-7",
                text: ["Где ты?"],
                visual: { type: "you-there" },
                reveal: line("Ты там.", "ty_tam.mp3"),
                audio: [line("Где ты?", "gde_ty.mp3"), line("Ты там.", "ty_tam.mp3")]
              },
              {
                id: "l2-slide-8",
                text: ["магазин 🏪", "Это магазин."],
                visual: { type: "focus", items: ["🏪"] },
                audio: [line("магазин", "magazin.mp3"), line("Это магазин.", "eto_magazin.mp3")]
              },
              {
                id: "l2-slide-9",
                text: ["парк 🌳🌳🌳", "Это парк."],
                visual: { type: "focus", items: ["🌳", "🌳", "🌳"] },
                audio: [line("парк", "park.mp3"), line("Это парк.", "eto_park.mp3")]
              },
              {
                id: "l2-slide-10",
                text: ["метро 🚇", "Это метро."],
                visual: { type: "focus", items: ["🚇"] },
                audio: [line("метро", "metro.mp3"), line("Это метро.", "eto_metro.mp3")]
              },
              {
                id: "l2-slide-11",
                text: ["кафе 🏢☕", "Это кафе."],
                visual: { type: "focus", items: ["🏢", "☕"] },
                audio: [line("кафе", "kafe.mp3"), line("Это кафе.", "eto_kafe.mp3")]
              },
              {
                id: "l2-slide-12",
                text: ["Здесь магазин."],
                visual: scene(["🏪"], []),
                audio: [line("Здесь магазин.", "zdes_magazin.mp3")],
                questions: [
                  question("l2-q12", "Здесь магазин?", yesNo, "da")
                ]
              },
              {
                id: "l2-slide-13",
                text: ["Там парк."],
                visual: scene([], ["🌳", "🌳", "🌳"]),
                audio: [line("Там парк.", "tam_park.mp3")],
                questions: [
                  question("l2-q13", "Там парк?", yesNo, "da")
                ]
              },
              {
                id: "l2-slide-14",
                text: ["Там автобус."],
                visual: scene([], ["🚌"]),
                audio: [line("Там автобус.", "tam_avtobus.mp3")],
                questions: [
                  question("l2-q14", "Где автобус?", hereThere, "tam")
                ]
              },
              {
                id: "l2-slide-15",
                text: ["Здесь вода.", "Там яблоко."],
                visual: scene(["💧"], ["🍎"]),
                audio: [
                  line("Здесь вода.", "zdes_voda.mp3"),
                  line("Там яблоко.", "tam_yabloko.mp3"),
                  line("Здесь вода. Там яблоко.", "zdes_voda_tam_yabloko.mp3")
                ],
                questions: [
                  question("l2-q15", "Где вода?", hereThere, "zdes")
                ]
              },
              {
                id: "l2-slide-16",
                text: ["Я здесь.", "Ты там.", "", "Здесь кафе.", "Там магазин.", "", "Здесь вода.", "Там яблоко."],
                reading: true,
                wordMeanings: readingOne,
                audio: [line("Я здесь. Ты там. Здесь кафе. Там магазин. Здесь вода. Там яблоко.", "text_2_full.mp3")]
              },
              {
                id: "l2-slide-17",
                text: ["Я здесь.", "Ты там.", "Здесь кафе.", "Там магазин.", "Здесь вода.", "Там яблоко."],
                visual: scene(["🏢☕", "💧"], ["🏪", "🍎"]),
                questions: [
                  question("l2-q17-1", "Где я?", hereThere, "zdes"),
                  question("l2-q17-2", "Где ты?", hereThere, "tam"),
                  question("l2-q17-3", "Что здесь?", [
                    option("kafe", "кафе", "🏢☕"),
                    option("magazin", "магазин", "🏪")
                  ], "kafe"),
                  question("l2-q17-4", "Что там?", [
                    option("magazin", "магазин", "🏪"),
                    option("kafe", "кафе", "🏢☕")
                  ], "magazin"),
                  question("l2-q17-5", "Где вода?", hereThere, "zdes")
                ]
              },
              {
                id: "l2-slide-18",
                text: ["Это парк.", "Я здесь.", "", "Это метро.", "Ты там.", "", "Здесь один автобус.", "Там два дома."],
                reading: true,
                wordMeanings: readingTwo,
                audio: [line("Это парк. Я здесь. Это метро. Ты там. Здесь один автобус. Там два дома.", "text_2_extra.mp3")]
              },
              {
                id: "l2-slide-19",
                text: ["школа 🏫", "Это школа."],
                visual: { type: "focus", items: ["🏫"] },
                audio: [line("школа", "shkola.mp3"), line("Это школа.", "eto_shkola.mp3")]
              },
              {
                id: "l2-slide-20",
                text: ["улица 🛣️", "Это улица."],
                visual: { type: "focus", items: ["🛣️"] },
                audio: [line("улица", "ulitsa.mp3"), line("Это улица.", "eto_ulitsa.mp3")]
              },
              {
                id: "l2-slide-21",
                text: ["Здесь школа.", "Там улица."],
                visual: scene(["🏫"], ["🛣️"]),
                audio: [line("Здесь школа.", "zdes_shkola.mp3"), line("Там улица.", "tam_ulitsa.mp3")],
                questions: [
                  question("l2-q21-1", "Где школа?", hereThere, "zdes"),
                  question("l2-q21-2", "Где улица?", hereThere, "tam")
                ]
              },
              {
                id: "l2-slide-22",
                text: ["Где?"],
                visual: scene(["🏪", "🚇"], ["🌳", "🌳", "🌳", "🚌"]),
                questions: [
                  question("l2-q19-1", "Где магазин?", hereThere, "zdes"),
                  question("l2-q19-2", "Где парк?", hereThere, "tam"),
                  question("l2-q19-3", "Где метро?", hereThere, "zdes"),
                  question("l2-q19-4", "Где автобус?", hereThere, "tam")
                ]
              },
              {
                id: "l2-slide-23",
                text: ["Отлично! ✅", "Я здесь.", "Ты там.", "Где?"],
                visual: { type: "emoji", emoji: "✅📍🗺️❓" },
                audio: [
                  line("Отлично!", "otlichno.mp3"),
                  line("Я здесь.", "ya_zdes.mp3"),
                  line("Ты там.", "ty_tam.mp3"),
                  line("где", "gde.mp3")
                ]
              }
            ]
          }
        ]
      },
      {
        id: "unit-lesson-2-city-game",
        title: "Карта",
        icon: "🗺️",
        stages: [
          {
            type: "map-command-game",
            title: "Город",
            tasks: [
              cityTask("l2-city-1", "Где магазин?", "📍🗺️❓🏪", "gde_magazin.mp3", { x: 0, y: 4 }, { x: 4, y: 0 }, [
                mapObj("magazin", "🏪", 4, 0, "shop"),
                mapObj("park", "🌳🌳🌳", 0, 0, "park"),
                mapObj("kafe", "🏢☕", 2, 2, "cafe"),
                mapObj("metro", "🚇", 4, 4, "metro")
              ]),
              cityTask("l2-city-2", "Где парк?", "📍🗺️❓🌳🌳🌳", "gde_park.mp3", { x: 4, y: 4 }, { x: 0, y: 0 }, [
                mapObj("park", "🌳🌳🌳", 0, 0, "park"),
                mapObj("magazin", "🏪", 4, 0, "shop"),
                mapObj("dom", "🏠", 1, 4, "house"),
                mapObj("avtobus", "🚌", 3, 3, "bus")
              ]),
              cityTask("l2-city-3", "Где кафе?", "📍🗺️❓🏢☕", "gde_kafe.mp3", { x: 0, y: 0 }, { x: 2, y: 2 }, [
                mapObj("kafe", "🏢☕", 2, 2, "cafe"),
                mapObj("metro", "🚇", 4, 1, "metro"),
                mapObj("voda", "💧", 0, 4, "water"),
                mapObj("yabloko", "🍎", 3, 4, "apple")
              ]),
              cityTask("l2-city-4", "Где метро?", "📍🗺️❓🚇", "gde_metro.mp3", { x: 1, y: 4 }, { x: 4, y: 1 }, [
                mapObj("metro", "🚇", 4, 1, "metro"),
                mapObj("kafe", "🏢☕", 2, 2, "cafe"),
                mapObj("park", "🌳🌳🌳", 0, 0, "park"),
                mapObj("school", "🏫", 1, 1, "school")
              ]),
              cityTask("l2-city-5", "Где школа?", "📍🗺️❓🏫", "gde_shkola.mp3", { x: 4, y: 0 }, { x: 1, y: 1 }, [
                mapObj("school", "🏫", 1, 1, "school"),
                mapObj("street", "🛣️", 2, 4, "street"),
                mapObj("bus", "🚌", 4, 3, "bus"),
                mapObj("home", "🏠", 0, 4, "house")
              ]),
              cityTask("l2-city-6", "Где улица?", "📍🗺️❓🛣️", "gde_ulitsa.mp3", { x: 0, y: 0 }, { x: 2, y: 4 }, [
                mapObj("street", "🛣️", 2, 4, "street"),
                mapObj("magazin", "🏪", 4, 0, "shop"),
                mapObj("park", "🌳🌳🌳", 0, 2, "park"),
                mapObj("metro", "🚇", 4, 4, "metro")
              ]),
              cityTask("l2-city-7", "Где автобус?", "📍🗺️❓🚌", "gde_avtobus.mp3", { x: 2, y: 0 }, { x: 4, y: 3 }, [
                mapObj("bus", "🚌", 4, 3, "bus"),
                mapObj("kafe", "🏢☕", 1, 1, "cafe"),
                mapObj("school", "🏫", 0, 4, "school"),
                mapObj("yabloko", "🍎", 3, 1, "apple")
              ]),
              cityTask("l2-city-8", "Где дом?", "📍🗺️❓🏠", "gde_dom.mp3", { x: 4, y: 4 }, { x: 0, y: 4 }, [
                mapObj("home", "🏠", 0, 4, "house"),
                mapObj("metro", "🚇", 4, 0, "metro"),
                mapObj("magazin", "🏪", 1, 0, "shop"),
                mapObj("park", "🌳🌳🌳", 2, 2, "park")
              ])
            ]
          }
        ]
      }
    ]
  };
}(typeof window !== "undefined" ? window : globalThis));
