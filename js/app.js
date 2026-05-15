(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-russian-progress-v2";
  var appRoot = document.getElementById("app");
  var data = null;
  var lesson = null;
  var maps = {
    entries: {},
    scenes: {}
  };
  var position = {
    stageIndex: 0,
    taskIndex: 0
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    loadLessonData().then(function (loadedData) {
      data = loadedData;
      lesson = data.lessons[0];
      createMaps();
      renderHome();
    });
  }

  function loadLessonData() {
    return fetch("data/lessons.json", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("json");
        }
        return response.json();
      })
      .catch(function () {
        return buildFallbackData();
      });
  }

  function createMaps() {
    maps.entries = {};
    maps.scenes = {};

    lesson.dictionary.forEach(function (entry) {
      maps.entries[entry.id] = entry;
    });

    lesson.scenes.forEach(function (scene) {
      maps.scenes[scene.id] = scene;
    });
  }

  function renderHome() {
    var progress = getProgress()[lesson.id] || {};
    var complete = Boolean(progress.complete);
    var hasProgress = !complete && typeof progress.stageIndex === "number";

    appRoot.innerHTML =
      '<main class="screen">' +
        '<header class="topbar">' +
          '<div class="brand">' +
            '<div class="brand-mark" aria-hidden="true">Л</div>' +
            '<div>' +
              '<h1>ЛексиЛанд</h1>' +
              '<small>Русский для жизни</small>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<section class="hero">' +
          '<p class="hero-word">здесь</p>' +
          '<p class="emoji-line">📍 🍎 💧 🚌 🏠</p>' +
        '</section>' +
        '<section class="lesson-card">' +
          '<div class="pill-row">' +
            '<span class="pill">' + (complete ? "Урок 1 ✅" : "Урок 1") + '</span>' +
          '</div>' +
          '<h3>' + escapeHtml(lesson.title) + '</h3>' +
          '<button class="primary-button" type="button" data-action="start">' + (hasProgress ? "Продолжить" : "Начать") + '</button>' +
        '</section>' +
        '<section class="roadmap">' +
          '<h3 class="roadmap-title">Скоро</h3>' +
          '<div class="roadmap-card">' +
            '<span>🧭 🎒 💬</span>' +
            '<span class="pill locked">Скоро</span>' +
          '</div>' +
        '</section>' +
      '</main>';

    appRoot.querySelector('[data-action="start"]').addEventListener("click", function () {
      if (hasProgress) {
        startFrom(progress.stageIndex, progress.taskIndex);
        return;
      }
      startFrom(0, 0);
    });
  }

  function startFrom(stageIndex, taskIndex) {
    position.stageIndex = stageIndex || 0;
    position.taskIndex = taskIndex || 0;
    savePosition();
    renderStage();
  }

  function renderStage() {
    var stage = lesson.stages[position.stageIndex];

    if (!stage) {
      renderFinish();
      return;
    }

    if (stage.type === "intro") {
      renderIntro(stage);
      return;
    }

    renderGameStage(stage);
  }

  function renderIntro(stage) {
    var entryId = stage.items[position.taskIndex];
    var entry = maps.entries[entryId];

    appRoot.innerHTML =
      renderLessonHeader(stage.title) +
      '<main class="lesson-screen">' +
        '<section class="stage-card intro-card">' +
          '<div class="intro-emoji" aria-hidden="true">' + escapeHtml(entry.emoji) + '</div>' +
          '<h2 class="big-russian">' + escapeHtml(entry.text) + '</h2>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row">' +
          '<button class="secondary-button" type="button" data-action="listen">▶️ Слушать</button>' +
          '<button class="primary-button" type="button" data-action="next">Дальше</button>' +
        '</div>' +
      '</main>';

    appRoot.querySelector('[data-action="listen"]').addEventListener("click", function () {
      playEntry(entry);
    });

    appRoot.querySelector('[data-action="next"]').addEventListener("click", nextTask);
  }

  function renderGameStage(stage) {
    var task = stage.tasks[position.taskIndex];

    appRoot.innerHTML =
      renderLessonHeader(stage.title) +
      '<main class="lesson-screen">' +
        '<section class="stage-card">' +
          '<div id="game-root"></div>' +
        '</section>' +
      '</main>';

    var options = {
      root: document.getElementById("game-root"),
      task: task,
      helpers: gameHelpers(),
      onCorrect: nextTask
    };

    if (stage.type === "tap") {
      window.LexiLandGames.renderTapGame(options);
      return;
    }

    if (stage.type === "picture-choice") {
      window.LexiLandGames.renderPictureChoiceGame(options);
      return;
    }

    if (stage.type === "yes-no") {
      window.LexiLandGames.renderYesNoGame(options);
      return;
    }

    if (stage.type === "location") {
      window.LexiLandGames.renderLocationGame(options);
      return;
    }

    if (stage.type === "mini-command-game") {
      window.LexiLandGames.renderMiniCommandGame(options);
    }
  }

  function nextTask() {
    var stage = lesson.stages[position.stageIndex];
    var count = stage.type === "intro" ? stage.items.length : stage.tasks.length;

    if (position.taskIndex < count - 1) {
      position.taskIndex += 1;
      savePosition();
      renderStage();
      return;
    }

    position.stageIndex += 1;
    position.taskIndex = 0;
    savePosition();
    renderStage();
  }

  function renderFinish() {
    markComplete();

    appRoot.innerHTML =
      renderLessonHeader("✅ Готово") +
      '<main class="lesson-screen">' +
        '<section class="stage-card finish-card">' +
          '<div class="intro-emoji" aria-hidden="true">✅</div>' +
          '<h2 class="big-russian">Готово</h2>' +
          '<ul class="word-list">' +
            lesson.dictionary.filter(function (entry) {
              return entry.type === "word";
            }).map(function (entry) {
              return '<li>' + escapeHtml(entry.text) + '</li>';
            }).join("") +
          '</ul>' +
          '<button class="primary-button" type="button" data-action="home">Домой</button>' +
          '<button class="secondary-button" type="button" data-action="again">Ещё раз</button>' +
        '</section>' +
      '</main>';

    appRoot.querySelector('[data-action="home"]').addEventListener("click", renderHome);
    appRoot.querySelector('[data-action="again"]').addEventListener("click", function () {
      startFrom(0, 0);
    });
  }

  function renderLessonHeader(title) {
    var percent = getProgressPercent();
    return '<header class="topbar">' +
      '<div class="brand">' +
        '<button class="home-button" type="button" onclick="LexiLandApp.home()" aria-label="Домой">⌂</button>' +
        '<div>' +
          '<h2>Урок 1</h2>' +
          '<small>' + escapeHtml(title) + '</small>' +
        '</div>' +
      '</div>' +
      '</header>' +
      '<div class="progress-wrap" aria-label="Путь">' +
        '<div class="progress-label"><span>Путь</span><span>' + percent + '%</span></div>' +
        '<div class="progress-track"><div class="progress-fill" style="width: ' + percent + '%"></div></div>' +
      '</div>';
  }

  function getProgressPercent() {
    var total = getTotalCount();
    var done = 0;

    lesson.stages.forEach(function (stage, index) {
      var count = stage.type === "intro" ? stage.items.length : stage.tasks.length;
      if (index < position.stageIndex) {
        done += count;
      }
      if (index === position.stageIndex) {
        done += position.taskIndex;
      }
    });

    return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
  }

  function getTotalCount() {
    return lesson.stages.reduce(function (sum, stage) {
      return sum + (stage.type === "intro" ? stage.items.length : stage.tasks.length);
    }, 0);
  }

  function gameHelpers() {
    return {
      bindSound: bindSound,
      clearAnswers: clearAnswers,
      clearSceneAnswers: clearSceneAnswers,
      entryButton: entryButton,
      escape: escapeHtml,
      playPrompt: playPrompt,
      scene: renderScene,
      soundPanel: soundPanel
    };
  }

  function soundPanel(task) {
    return '<div class="sound-panel">' +
      '<div>' +
        '<div class="prompt-text">' + escapeHtml(task.text) + '</div>' +
        '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
      '</div>' +
      '<button class="audio-button" type="button" data-action="listen">▶️ Слушать</button>' +
    '</div>';
  }

  function bindSound(root, task) {
    var button = root.querySelector('[data-action="listen"]');
    if (!button) {
      return;
    }
    button.addEventListener("click", function () {
      playPrompt(task);
    });
  }

  function playPrompt(task) {
    setWarning("");
    window.LexiLandAudio.playAudio(task.audio, task.text, setWarning);
  }

  function playEntry(entry) {
    setWarning("");
    window.LexiLandAudio.playAudio(entry.audio, entry.text, setWarning);
  }

  function setWarning(message) {
    var warning = document.getElementById("audio-warning");
    if (warning) {
      warning.textContent = message || "";
    }
  }

  function entryButton(entryId) {
    var entry = maps.entries[entryId];
    return '<button class="answer-card" type="button" data-answer="' + escapeHtml(entry.id) + '">' +
      '<span class="answer-emoji" aria-hidden="true">' + escapeHtml(entry.emoji) + '</span>' +
      '<span class="answer-text">' + escapeHtml(entry.text) + '</span>' +
    '</button>';
  }

  function renderScene(sceneId, compact) {
    var scene = maps.scenes[sceneId];
    var compactClass = compact ? " compact" : "";

    if (!scene) {
      return '<div class="scene' + compactClass + '"></div>';
    }

    if (scene.mode === "focus") {
      return '<div class="scene' + compactClass + '">' +
        '<div class="focus-scene">' + renderSceneItems(scene.items) + '</div>' +
      '</div>';
    }

    return '<div class="scene' + compactClass + '">' +
      '<div class="scene-zones">' +
        '<div class="scene-zone"><span class="zone-mark">📍</span><div class="scene-items">' + renderSceneItems(scene.near) + '</div></div>' +
        '<div class="scene-zone"><span class="zone-mark">👉</span><div class="scene-items">' + renderSceneItems(scene.far) + '</div></div>' +
      '</div>' +
    '</div>';
  }

  function renderSceneItems(items) {
    return (items || []).map(function (item) {
      var repeated = "";
      var count = item.count || 1;
      for (var i = 0; i < count; i += 1) {
        repeated += '<span aria-hidden="true">' + escapeHtml(item.emoji) + '</span>';
      }
      return repeated;
    }).join("");
  }

  function clearAnswers(root) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-answer]"), function (button) {
      button.classList.remove("is-correct", "is-wrong", "show-correct");
    });
  }

  function clearSceneAnswers(root) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-scene-answer]"), function (button) {
      button.classList.remove("is-correct", "is-wrong", "show-correct");
    });
  }

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
      return {};
    }
  }

  function savePosition() {
    var progress = getProgress();
    var existing = progress[lesson.id] || {};
    progress[lesson.id] = {
      complete: Boolean(existing.complete),
      completedAt: existing.completedAt,
      stageIndex: position.stageIndex,
      taskIndex: position.taskIndex
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function markComplete() {
    var progress = getProgress();
    progress[lesson.id] = {
      complete: true,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function buildFallbackData() {
    var audioRoot = "assets/audio/ru/";

    function entry(id, text, emoji, type, file) {
      return {
        id: id,
        text: text,
        emoji: emoji,
        type: type,
        audio: audioRoot + file
      };
    }

    var dictionary = [
      entry("da", "да", "✅", "word", "da.mp3"),
      entry("net", "нет", "❌", "word", "net.mp3"),
      entry("zdes", "здесь", "📍", "word", "zdes.mp3"),
      entry("tam", "там", "👉", "word", "tam.mp3"),
      entry("eto", "это", "👀", "word", "eto.mp3"),
      entry("odin", "один", "1️⃣", "word", "odin.mp3"),
      entry("dva", "два", "2️⃣", "word", "dva.mp3"),
      entry("yabloko", "яблоко", "🍎", "word", "yabloko.mp3"),
      entry("voda", "вода", "💧", "word", "voda.mp3"),
      entry("avtobus", "автобус", "🚌", "word", "avtobus.mp3"),
      entry("dom", "дом", "🏠", "word", "dom.mp3"),
      entry("siniy", "синий", "🔵", "word", "siniy.mp3"),
      entry("krasniy", "красный", "🔴", "word", "krasniy.mp3"),
      entry("zdes_yabloko", "здесь яблоко", "📍🍎", "chunk", "zdes_yabloko.mp3"),
      entry("tam_yabloko", "там яблоко", "👉🍎", "chunk", "tam_yabloko.mp3"),
      entry("zdes_voda", "здесь вода", "📍💧", "chunk", "zdes_voda.mp3"),
      entry("tam_voda", "там вода", "👉💧", "chunk", "tam_voda.mp3"),
      entry("zdes_dom", "здесь дом", "📍🏠", "chunk", "zdes_dom.mp3"),
      entry("tam_dom", "там дом", "👉🏠", "chunk", "tam_dom.mp3"),
      entry("zdes_avtobus", "здесь автобус", "📍🚌", "chunk", "zdes_avtobus.mp3"),
      entry("tam_avtobus", "там автобус", "👉🚌", "chunk", "tam_avtobus.mp3"),
      entry("eto_yabloko", "это яблоко", "👀🍎", "chunk", "eto_yabloko.mp3"),
      entry("eto_voda", "это вода", "👀💧", "chunk", "eto_voda.mp3"),
      entry("eto_avtobus", "это автобус", "👀🚌", "chunk", "eto_avtobus.mp3"),
      entry("eto_dom", "это дом", "👀🏠", "chunk", "eto_dom.mp3"),
      entry("zdes_odin_yabloko", "здесь 1 яблоко", "📍1️⃣🍎", "chunk", "zdes_odin_yabloko.mp3"),
      entry("zdes_dva_yabloka", "здесь 2 яблока", "📍2️⃣🍎", "chunk", "zdes_dva_yabloka.mp3"),
      entry("tam_odin_avtobus", "там 1 автобус", "👉1️⃣🚌", "chunk", "tam_odin_avtobus.mp3"),
      entry("tam_dva_avtobusa", "там 2 автобуса", "👉2️⃣🚌", "chunk", "tam_dva_avtobusa.mp3"),
      entry("eto_siniy_avtobus", "это синий автобус", "👀🔵🚌", "chunk", "eto_siniy_avtobus.mp3"),
      entry("eto_krasnoe_yabloko", "это красное яблоко", "👀🔴🍎", "chunk", "eto_krasnoe_yabloko.mp3"),
      entry("eto_siniy_dom", "это синий дом", "👀🔵🏠", "chunk", "eto_siniy_dom.mp3"),
      entry("eto_krasniy_dom", "это красный дом", "👀🔴🏠", "chunk", "eto_krasniy_dom.mp3")
    ];

    var byId = {};
    dictionary.forEach(function (item) {
      byId[item.id] = item;
    });

    function item(emoji, count) {
      return { emoji: emoji, count: count || 1 };
    }

    function zones(id, near, far) {
      return { id: id, mode: "zones", near: near, far: far };
    }

    function focus(id, items) {
      return { id: id, mode: "focus", items: items };
    }

    var scenes = [
      focus("apple", [item("🍎")]),
      focus("water", [item("💧")]),
      focus("bus", [item("🚌")]),
      focus("house", [item("🏠")]),
      focus("blue-bus", [item("🔵"), item("🚌")]),
      focus("red-bus", [item("🔴"), item("🚌")]),
      focus("red-apple", [item("🔴"), item("🍎")]),
      focus("blue-apple", [item("🔵"), item("🍎")]),
      focus("blue-house", [item("🔵"), item("🏠")]),
      focus("red-house", [item("🔴"), item("🏠")]),
      zones("near-one-apple", [item("🍎")], []),
      zones("near-two-apples", [item("🍎", 2)], []),
      zones("far-one-apple", [], [item("🍎")]),
      zones("far-two-apples", [], [item("🍎", 2)]),
      zones("near-water", [item("💧")], []),
      zones("far-water", [], [item("💧")]),
      zones("near-house", [item("🏠")], []),
      zones("far-house", [], [item("🏠")]),
      zones("near-one-bus", [item("🚌")], []),
      zones("far-one-bus", [], [item("🚌")]),
      zones("far-two-buses", [], [item("🚌", 2)]),
      zones("near-apple-far-water", [item("🍎")], [item("💧")]),
      zones("near-house-far-bus", [item("🏠")], [item("🚌")]),
      zones("near-two-apples-far-house", [item("🍎", 2)], [item("🏠")]),
      zones("near-water-far-bus", [item("💧")], [item("🚌")]),
      zones("near-bus-far-house", [item("🚌")], [item("🏠")]),
      zones("near-bus-far-apple", [item("🚌")], [item("🍎")])
    ];

    function task(id, prompt, options, correct) {
      return {
        id: id,
        text: byId[prompt].text,
        audio: byId[prompt].audio,
        options: options,
        correct: correct || prompt
      };
    }

    function pic(id, prompt, correctScene, options) {
      return {
        id: id,
        text: byId[prompt].text,
        audio: byId[prompt].audio,
        correctScene: correctScene,
        options: options
      };
    }

    function yn(id, prompt, scene, correct) {
      return {
        id: id,
        text: byId[prompt].text,
        audio: byId[prompt].audio,
        scene: scene,
        correct: correct
      };
    }

    function loc(id, prompt, scene, correctZone) {
      return {
        id: id,
        text: byId[prompt].text,
        audio: byId[prompt].audio,
        scene: scene,
        correctZone: correctZone
      };
    }

    function mini(id, prompt, objects, correctTarget, correctAction, startIndex) {
      return {
        id: id,
        text: byId[prompt].text,
        audio: byId[prompt].audio,
        objects: objects,
        correctTarget: correctTarget,
        correctAction: correctAction,
        startIndex: startIndex || 0
      };
    }

    function obj(id, emoji, zone) {
      return { id: id, emoji: emoji, zone: zone };
    }

    return {
      lessons: [
        {
          id: "lesson-1",
          title: "Урок 1. Здесь, там, это",
          dictionary: dictionary,
          scenes: scenes,
          stages: [
            {
              type: "intro",
              title: "Слушай и смотри",
              items: ["da", "net", "zdes", "tam", "eto", "odin", "dva", "yabloko", "voda", "avtobus", "dom", "siniy", "krasniy"]
            },
            {
              type: "tap",
              title: "Слушай и выбирай",
              tasks: [
                task("tap-1", "da", ["da", "net", "eto"]),
                task("tap-2", "net", ["net", "da", "tam"]),
                task("tap-3", "zdes", ["zdes", "tam", "eto"]),
                task("tap-4", "tam", ["tam", "zdes", "eto"]),
                task("tap-5", "eto", ["eto", "zdes", "tam"]),
                task("tap-6", "odin", ["odin", "dva", "net"]),
                task("tap-7", "dva", ["dva", "odin", "da"]),
                task("tap-8", "yabloko", ["yabloko", "voda", "avtobus"]),
                task("tap-9", "voda", ["voda", "yabloko", "dom"]),
                task("tap-10", "avtobus", ["avtobus", "dom", "voda"]),
                task("tap-11", "dom", ["dom", "avtobus", "yabloko"]),
                task("tap-12", "siniy", ["siniy", "krasniy", "yabloko"]),
                task("tap-13", "krasniy", ["krasniy", "siniy", "dom"]),
                task("tap-14", "zdes_yabloko", ["zdes_yabloko", "tam_yabloko", "eto_yabloko"]),
                task("tap-15", "tam_yabloko", ["tam_yabloko", "zdes_yabloko", "eto_yabloko"]),
                task("tap-16", "zdes_voda", ["zdes_voda", "tam_voda", "eto_voda"]),
                task("tap-17", "tam_voda", ["tam_voda", "zdes_voda", "eto_voda"]),
                task("tap-18", "zdes_dom", ["zdes_dom", "tam_dom", "eto_dom"]),
                task("tap-19", "tam_avtobus", ["tam_avtobus", "zdes_avtobus", "eto_avtobus"]),
                task("tap-20", "eto_yabloko", ["eto_yabloko", "zdes_yabloko", "tam_yabloko"]),
                task("tap-21", "eto_voda", ["eto_voda", "zdes_voda", "tam_voda"]),
                task("tap-22", "eto_avtobus", ["eto_avtobus", "tam_avtobus", "eto_dom"]),
                task("tap-23", "eto_dom", ["eto_dom", "zdes_dom", "eto_avtobus"]),
                task("tap-24", "zdes_odin_yabloko", ["zdes_odin_yabloko", "zdes_dva_yabloka", "tam_yabloko"]),
                task("tap-25", "zdes_dva_yabloka", ["zdes_dva_yabloka", "zdes_odin_yabloko", "tam_yabloko"]),
                task("tap-26", "tam_odin_avtobus", ["tam_odin_avtobus", "tam_dva_avtobusa", "zdes_avtobus"]),
                task("tap-27", "tam_dva_avtobusa", ["tam_dva_avtobusa", "tam_odin_avtobus", "eto_avtobus"]),
                task("tap-28", "eto_siniy_avtobus", ["eto_siniy_avtobus", "eto_krasnoe_yabloko", "eto_avtobus"]),
                task("tap-29", "eto_krasnoe_yabloko", ["eto_krasnoe_yabloko", "eto_siniy_avtobus", "eto_yabloko"]),
                task("tap-30", "zdes_dva_yabloka", ["zdes_dva_yabloka", "tam_dva_avtobusa", "zdes_voda"])
              ]
            },
            {
              type: "picture-choice",
              title: "Картинка и слово",
              tasks: [
                pic("pic-1", "zdes_odin_yabloko", "near-one-apple", ["near-one-apple", "near-two-apples", "far-one-apple"]),
                pic("pic-2", "zdes_dva_yabloka", "near-two-apples", ["near-one-apple", "near-two-apples", "far-two-apples"]),
                pic("pic-3", "tam_odin_avtobus", "far-one-bus", ["far-one-bus", "near-one-bus", "far-two-buses"]),
                pic("pic-4", "tam_dva_avtobusa", "far-two-buses", ["far-two-buses", "far-one-bus", "near-one-bus"]),
                pic("pic-5", "zdes_voda", "near-water", ["near-water", "far-water", "near-house"]),
                pic("pic-6", "tam_voda", "far-water", ["far-water", "near-water", "far-house"]),
                pic("pic-7", "zdes_dom", "near-house", ["near-house", "far-house", "near-one-bus"]),
                pic("pic-8", "tam_avtobus", "far-one-bus", ["far-one-bus", "near-one-bus", "far-house"]),
                pic("pic-9", "eto_dom", "house", ["house", "bus", "apple"]),
                pic("pic-10", "eto_avtobus", "bus", ["bus", "house", "water"]),
                pic("pic-11", "eto_yabloko", "apple", ["apple", "water", "bus"]),
                pic("pic-12", "eto_voda", "water", ["water", "apple", "house"]),
                pic("pic-13", "eto_siniy_avtobus", "blue-bus", ["blue-bus", "red-bus", "bus"]),
                pic("pic-14", "eto_krasnoe_yabloko", "red-apple", ["red-apple", "blue-apple", "apple"]),
                pic("pic-15", "zdes_yabloko", "near-one-apple", ["near-one-apple", "far-one-apple", "near-water"]),
                pic("pic-16", "tam_yabloko", "far-one-apple", ["far-one-apple", "near-one-apple", "far-water"]),
                pic("pic-17", "zdes_avtobus", "near-one-bus", ["near-one-bus", "far-one-bus", "near-house"]),
                pic("pic-18", "tam_dom", "far-house", ["far-house", "near-house", "far-one-bus"]),
                pic("pic-19", "zdes_dva_yabloka", "near-two-apples", ["near-two-apples", "near-one-apple", "far-two-apples"]),
                pic("pic-20", "tam_odin_avtobus", "far-one-bus", ["far-one-bus", "far-two-buses", "near-one-bus"]),
                pic("pic-21", "eto_siniy_dom", "blue-house", ["blue-house", "red-house", "house"]),
                pic("pic-22", "eto_krasniy_dom", "red-house", ["red-house", "blue-house", "house"]),
                pic("pic-23", "zdes_voda", "near-water-far-bus", ["near-water-far-bus", "near-bus-far-house", "near-apple-far-water"]),
                pic("pic-24", "tam_avtobus", "near-house-far-bus", ["near-house-far-bus", "near-water-far-bus", "near-bus-far-house"]),
                pic("pic-25", "eto_krasnoe_yabloko", "red-apple", ["red-apple", "blue-bus", "red-house"])
              ]
            },
            {
              type: "yes-no",
              title: "Да или нет",
              tasks: [
                yn("yn-1", "eto_yabloko", "apple", "da"),
                yn("yn-2", "eto_yabloko", "bus", "net"),
                yn("yn-3", "eto_siniy_avtobus", "blue-bus", "da"),
                yn("yn-4", "eto_siniy_avtobus", "red-apple", "net"),
                yn("yn-5", "eto_krasnoe_yabloko", "red-apple", "da"),
                yn("yn-6", "zdes_dva_yabloka", "near-two-apples", "da"),
                yn("yn-7", "tam_avtobus", "far-house", "net"),
                yn("yn-8", "tam_avtobus", "far-one-bus", "da"),
                yn("yn-9", "zdes_voda", "near-water", "da"),
                yn("yn-10", "zdes_voda", "far-water", "net"),
                yn("yn-11", "eto_dom", "house", "da"),
                yn("yn-12", "eto_avtobus", "water", "net"),
                yn("yn-13", "eto_krasniy_dom", "red-house", "da"),
                yn("yn-14", "eto_siniy_dom", "blue-house", "da"),
                yn("yn-15", "zdes_dva_yabloka", "near-one-apple", "net")
              ]
            },
            {
              type: "location",
              title: "Где?",
              tasks: [
                loc("loc-1", "zdes_yabloko", "near-apple-far-water", "near"),
                loc("loc-2", "tam_voda", "near-apple-far-water", "far"),
                loc("loc-3", "zdes_dom", "near-house-far-bus", "near"),
                loc("loc-4", "tam_avtobus", "near-house-far-bus", "far"),
                loc("loc-5", "zdes_dva_yabloka", "near-two-apples-far-house", "near"),
                loc("loc-6", "tam_odin_avtobus", "near-water-far-bus", "far"),
                loc("loc-7", "zdes_voda", "near-water-far-bus", "near"),
                loc("loc-8", "tam_dom", "near-bus-far-house", "far"),
                loc("loc-9", "zdes_avtobus", "near-bus-far-apple", "near"),
                loc("loc-10", "tam_yabloko", "near-bus-far-apple", "far")
              ]
            },
            {
              type: "mini-command-game",
              title: "Мини-игра",
              tasks: [
                mini("mini-1", "zdes_yabloko", [obj("near-apple", "🍎", "near"), obj("far-bus", "🚌", "far"), obj("far-house", "🏠", "far")], "near-apple", "yes", 0),
                mini("mini-2", "tam_avtobus", [obj("near-water", "💧", "near"), obj("near-apple", "🍎", "near"), obj("far-bus", "🚌", "far")], "far-bus", "yes", 0),
                mini("mini-3", "eto_voda", [obj("near-apple", "🍎", "near"), obj("near-water", "💧", "near"), obj("far-house", "🏠", "far")], "near-water", "yes", 0),
                mini("mini-4", "eto_dom", [obj("near-water", "💧", "near"), obj("far-house", "🏠", "far"), obj("far-bus", "🚌", "far")], "far-house", "yes", 0),
                mini("mini-5", "eto_siniy_avtobus", [obj("near-blue-bus", "🔵🚌", "near"), obj("far-red-apple", "🔴🍎", "far"), obj("far-house", "🏠", "far")], "near-blue-bus", "yes", 0),
                mini("mini-6", "eto_krasnoe_yabloko", [obj("near-blue-bus", "🔵🚌", "near"), obj("far-red-apple", "🔴🍎", "far"), obj("far-water", "💧", "far")], "far-red-apple", "yes", 0),
                mini("mini-7", "eto_yabloko", [obj("near-bus", "🚌", "near"), obj("far-apple", "🍎", "far"), obj("far-house", "🏠", "far")], "far-apple", "no", 0),
                mini("mini-8", "zdes_dva_yabloka", [obj("near-two-apples", "🍎🍎", "near"), obj("far-bus", "🚌", "far"), obj("far-water", "💧", "far")], "near-two-apples", "yes", 0)
              ]
            }
          ]
        }
      ]
    };
  }

  window.LexiLandApp = {
    home: function () {
      window.LexiLandAudio.stopAudio();
      renderHome();
    }
  };
}());
