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
    lessonIndex: 0,
    unitIndex: 0,
    stageIndex: 0,
    taskIndex: 0
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    loadLessonData().then(function (loadedData) {
      data = normalizeLessonData(loadedData);
      setCurrentLesson(0);
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

  function normalizeLessonData(loadedData) {
    var lessons = loadedData.lessons || [];

    if (window.LexiLandLevel0 && !lessons.some(function (item) { return item.id === window.LexiLandLevel0.id; })) {
      lessons = [window.LexiLandLevel0].concat(lessons);
    }

    if (window.LexiLandLesson3 && !lessons.some(function (item) { return item.id === window.LexiLandLesson3.id; })) {
      lessons = lessons.concat([window.LexiLandLesson3]);
    }

    if (Array.isArray(window.LexiForgeGeneratedLessons)) {
      window.LexiForgeGeneratedLessons.forEach(function (generatedLesson) {
        if (generatedLesson && !lessons.some(function (item) { return item.id === generatedLesson.id; })) {
          lessons.push(generatedLesson);
        }
      });
    }

    loadedData.lessons = lessons;
    return loadedData;
  }

  function createMaps() {
    maps.entries = {};
    maps.scenes = {};

    (lesson.dictionary || []).forEach(function (entry) {
      maps.entries[entry.id] = entry;
    });

    (lesson.scenes || []).forEach(function (scene) {
      maps.scenes[scene.id] = scene;
    });
  }

  function setCurrentLesson(index) {
    position.lessonIndex = index || 0;
    lesson = (data.lessons || [])[position.lessonIndex] || data.lessons[0];
    createMaps();
  }

  function renderHome() {
    var lessons = data.lessons || [];

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
        '<div class="lesson-list">' +
          lessons.map(function (item, lessonIndex) {
            return lessonCard(item, lessonIndex);
          }).join("") +
        '</div>' +
        '<section class="roadmap">' +
          '<h3 class="roadmap-title">Скоро</h3>' +
          '<div class="roadmap-card">' +
            '<span>🧭 🎒 💬</span>' +
            '<span class="pill locked">Скоро</span>' +
          '</div>' +
        '</section>' +
      '</main>';

    Array.prototype.forEach.call(appRoot.querySelectorAll("[data-unit]"), function (button) {
      button.addEventListener("click", function () {
        var lessonIndex = Number(button.getAttribute("data-lesson"));
        var unitIndex = Number(button.getAttribute("data-unit"));
        setCurrentLesson(lessonIndex);
        var unit = getUnits()[unitIndex];
        var saved = isUnitComplete(unit.id) ? {} : getUnitProgress(unit.id);
        startFrom(unitIndex, saved.stageIndex || 0, saved.taskIndex || 0);
      });
    });
  }

  function lessonCard(item, lessonIndex) {
    var units = getUnits(item);
    var complete = isLessonComplete(item);
    var unlocked = isLessonUnlocked(lessonIndex);
    var labelNumber = getLessonOrder(item, lessonIndex);
    var label = "\u0423\u0440\u043e\u043a " + labelNumber + (complete ? " \u2705" : "");

    return '<section class="lesson-card">' +
      '<div class="pill-row">' +
        '<span class="pill' + (complete ? " done" : "") + '">' + escapeHtml(unlocked ? label : label + " 🔒") + '</span>' +
      '</div>' +
      '<h3>' + escapeHtml(item.title) + '</h3>' +
      '<div class="unit-list">' +
        units.map(function (unit, unitIndex) {
          return unitCard(unit, unitIndex, item, lessonIndex, unlocked);
        }).join("") +
      '</div>' +
    '</section>';
  }

  function getLessonOrder(item, fallbackIndex) {
    var match = String(item.id || "").match(/^lesson-(\d+)/);

    if (typeof item.order === "number") {
      return item.order;
    }

    if (match) {
      return Number(match[1]);
    }

    return fallbackIndex + 1;
  }

  function unitCard(unit, index, targetLesson, lessonIndex, lessonUnlocked) {
    var complete = isUnitComplete(unit.id, targetLesson);
    var progress = getUnitProgress(unit.id, targetLesson);
    var hasProgress = !complete && typeof progress.stageIndex === "number";
    var unlocked = lessonUnlocked && isUnitUnlocked(index, targetLesson);
    var status = "🔒";
    var action = "";
    var disabled = true;

    if (unit.comingSoon) {
      status = "Скоро";
    } else if (complete) {
      status = "✅ Готово";
      action = "Ещё раз";
      disabled = false;
    } else if (unlocked && hasProgress) {
      status = "Продолжить";
      action = "Продолжить";
      disabled = false;
    } else if (unlocked) {
      status = "Начать";
      action = "Начать";
      disabled = false;
    }

    return '<button class="unit-card" type="button" ' + (disabled ? "disabled" : 'data-lesson="' + lessonIndex + '" data-unit="' + index + '"') + '>' +
      '<span class="unit-icon">' + escapeHtml(unit.icon || "⭐") + '</span>' +
      '<span class="unit-copy">' +
        '<strong>' + escapeHtml(unit.title) + '</strong>' +
        '<small>' + escapeHtml(status) + '</small>' +
      '</span>' +
      '<span class="unit-action">' + escapeHtml(action || status) + '</span>' +
    '</button>';
  }

  function startFrom(unitIndex, stageIndex, taskIndex) {
    position.unitIndex = unitIndex || 0;
    position.stageIndex = stageIndex || 0;
    position.taskIndex = taskIndex || 0;
    clampPosition();
    savePosition();
    renderStage();
  }

  function renderStage() {
    var unit = getCurrentUnit();
    clampPosition();
    var stage = unit.stages[position.stageIndex];

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

  function clampPosition() {
    var unit = getCurrentUnit();
    var stages = unit.stages || [];
    var stage = stages[position.stageIndex];
    var count = 0;

    if (!stage) {
      position.stageIndex = Math.max(0, stages.length);
      position.taskIndex = 0;
      return;
    }

    count = stage.type === "intro" ? stage.items.length : stage.tasks.length;
    if (position.taskIndex >= count) {
      position.taskIndex = Math.max(0, count - 1);
    }
  }

  function renderIntro(stage) {
    var entryId = stage.items[position.taskIndex];
    var entry = maps.entries[entryId];
    var concept = position.taskIndex === 0 ? renderHereThereConcept() : "";

    appRoot.innerHTML =
      renderLessonHeader(stage.title) +
      '<main class="lesson-screen info-screen">' +
        concept +
        '<section class="stage-card intro-card info-card">' +
          '<div class="mode-badge info-badge">&#8505;&#65039; &#1057;&#1084;&#1086;&#1090;&#1088;&#1080;</div>' +
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

    if (stage.type === "slides") {
      var slideHasQuestions = Boolean((task.questions && task.questions.length) || (task.visual && task.visual.type === "copy-line"));
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen ' + (slideHasQuestions ? "task-screen" : "info-screen") + '">' +
          '<div id="game-root" class="slide-stage-root"></div>' +
        '</main>';

      window.LexiLandGames.renderSlideLesson({
        root: document.getElementById("game-root"),
        task: task,
        helpers: gameHelpers(),
        onCorrect: nextTask
      });
      return;
    }

    appRoot.innerHTML =
      renderLessonHeader(stage.title) +
      '<main class="lesson-screen task-screen">' +
        '<section class="stage-card task-card">' +
          '<div class="mode-badge task-badge">&#10067; &#1042;&#1099;&#1073;&#1077;&#1088;&#1080;</div>' +
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
      return;
    }

    if (stage.type === "map-command-game") {
      window.LexiLandGames.renderMapCommandGame(options);
    }
  }

  function nextTask() {
    var stage = getCurrentUnit().stages[position.stageIndex];
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
    markUnitComplete();
    var unit = getCurrentUnit();

    appRoot.innerHTML =
      renderLessonHeader("✅ Готово") +
      '<main class="lesson-screen">' +
        '<section class="stage-card finish-card">' +
          '<div class="intro-emoji" aria-hidden="true">✅</div>' +
          '<h2 class="big-russian">Готово</h2>' +
          '<p class="unit-finish-title">' + escapeHtml(unit.title) + '</p>' +
          '<ul class="word-list">' +
            lesson.dictionary.filter(function (entry) {
              return entry.type === "word";
            }).map(function (entry) {
              return '<li>' +
                '<span class="word-list-emoji" aria-hidden="true">' + escapeHtml(entry.emoji) + '</span>' +
                '<span>' + escapeHtml(entry.text) + '</span>' +
              '</li>';
            }).join("") +
          '</ul>' +
          '<button class="primary-button" type="button" data-action="home">🏠 Домой</button>' +
          '<button class="secondary-button" type="button" data-action="again">↩️ Ещё раз</button>' +
        '</section>' +
      '</main>';

    appRoot.querySelector('[data-action="home"]').addEventListener("click", renderHome);
    appRoot.querySelector('[data-action="again"]').addEventListener("click", function () {
      startFrom(0, 0);
    });
  }

  function renderLessonHeader(title) {
    var percent = getProgressPercent();
    var unit = getCurrentUnit();
    return '<header class="topbar">' +
      '<div class="brand">' +
        '<button class="home-button" type="button" onclick="LexiLandApp.home()" aria-label="Домой">🏠</button>' +
        '<div>' +
          '<h2>' + escapeHtml(unit.title) + '</h2>' +
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

    getCurrentUnit().stages.forEach(function (stage, index) {
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
    return getCurrentUnit().stages.reduce(function (sum, stage) {
      return sum + (stage.type === "intro" ? stage.items.length : stage.tasks.length);
    }, 0);
  }

  function getUnits(targetLesson) {
    var source = targetLesson || lesson;

    if (source.units && source.units.length) {
      return source.units;
    }

    return [
      {
        id: "unit-words",
        title: "Слова",
        icon: "🎧",
        stages: source.stages || []
      }
    ].concat(source.extraUnits || []);
  }

  function getCurrentUnit() {
    return getUnits()[position.unitIndex] || getUnits()[0];
  }

  function getLessonProgress(targetLesson) {
    var source = targetLesson || lesson;
    return getProgress()[source.id] || {};
  }

  function getUnitProgress(unitId, targetLesson) {
    var lessonProgress = getLessonProgress(targetLesson);
    var unitProgress = lessonProgress.units && lessonProgress.units[unitId];
    return unitProgress || {};
  }

  function isUnitComplete(unitId, targetLesson) {
    return Boolean(getUnitProgress(unitId, targetLesson).complete);
  }

  function isUnitUnlocked(index, targetLesson) {
    var units = getUnits(targetLesson);

    if (index === 0) {
      return true;
    }

    return isUnitComplete(units[index - 1].id, targetLesson);
  }

  function isLessonComplete(targetLesson) {
    return Boolean(getLessonProgress(targetLesson).complete);
  }

  function isLessonUnlocked(index) {
    return true;
  }

  function gameHelpers() {
    return {
      bindSound: bindSound,
      clearAnswers: clearAnswers,
      clearSceneAnswers: clearSceneAnswers,
      entryButton: entryButton,
      escape: escapeHtml,
      afterFeedback: afterFeedback,
      playFeedback: playFeedback,
      playPrompt: playPrompt,
      playAudioList: playAudioList,
      getMapAria: getMapAria,
      getMapTarget: getMapTarget,
      mapHeight: mapHeight,
      mapObjectAt: mapObjectAt,
      mapStart: mapStart,
      mapTileClass: mapTileClass,
      mapTileEmoji: mapTileEmoji,
      mapWidth: mapWidth,
      scene: renderScene,
      shuffle: shuffle,
      soundPanel: soundPanel
    };
  }

  function soundPanel(task, options) {
    var showVisual = options && options.visual === true;

    return '<div class="sound-panel">' +
      '<div>' +
        (showVisual && task.emoji ? '<div class="prompt-visual" aria-hidden="true">' + escapeHtml(task.emoji) + '</div>' : "") +
        '<div class="prompt-text">' + escapeHtml(task.text) + '</div>' +
        '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
      '</div>' +
      '<button class="audio-button" type="button" data-action="listen">▶️ Слушать</button>' +
    '</div>';
  }

  function renderHereThereConcept() {
    return '<section class="concept-card concept-image-card" aria-label="здесь там">' +
      '<img class="concept-image" src="assets/img/zdes-tam-concept.svg" alt="Здесь. Там.">' +
    '</section>';
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
    if (!task.audio) {
      return Promise.resolve(false);
    }
    if (Array.isArray(task.audio)) {
      return playAudioList(task.audio);
    }
    return window.LexiLandAudio.playAudio(task.audio, task.speechText || task.text, setWarning);
  }

  function playEntry(entry) {
    setWarning("");
    window.LexiLandAudio.playAudio(entry.audio, entry.speechText || entry.text, setWarning);
  }

  function playAudioList(items) {
    var queue = (items || []).slice();
    var chain = Promise.resolve(false);

    queue.forEach(function (item) {
      chain = chain.then(function () {
        return window.LexiLandAudio.playAudio(item.audio, item.speechText || item.text, setWarning);
      });
    });

    return chain;
  }

  function playFeedback(kind) {
    var feedbackList = lesson.feedbackAudio && lesson.feedbackAudio[kind];
    if (!feedbackList) {
      feedbackList = getSharedFeedback(kind);
    }
    var feedback = chooseFeedback(feedbackList);
    if (!feedback) {
      return {
        text: kind === "retry" ? "Ещё раз" : "Хорошо!",
        done: Promise.resolve(false)
      };
    }

    var variant = chooseFeedback(feedback.variants) || feedback;
    if (!variant.audio) {
      return {
        text: (feedback.emoji ? feedback.emoji + " " : "") + feedback.text,
        done: Promise.resolve(false)
      };
    }

    setWarning("");
    var done = window.LexiLandAudio.playAudio(variant.audio, feedback.text, setWarning);
    return {
      text: (feedback.emoji ? feedback.emoji + " " : "") + feedback.text,
      done: done
    };
  }

  function getSharedFeedback(kind) {
    var lessons = data.lessons || [];

    for (var i = 0; i < lessons.length; i += 1) {
      if (lessons[i].feedbackAudio && lessons[i].feedbackAudio[kind]) {
        return lessons[i].feedbackAudio[kind];
      }
    }

    return null;
  }

  function afterFeedback(feedbackResult, callback) {
    var done = feedbackResult && feedbackResult.done;

    if (!done || typeof done.then !== "function") {
      window.setTimeout(callback, 700);
      return;
    }

    done.then(function () {
      window.setTimeout(callback, 140);
    });
  }

  function chooseFeedback(options) {
    if (!options) {
      return null;
    }

    if (!Array.isArray(options)) {
      return options;
    }

    if (!options.length) {
      return null;
    }

    return options[Math.floor(Math.random() * options.length)];
  }

  function shuffle(items) {
    var copy = items.slice();

    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }

    return copy;
  }

  function getEntrySizeClass(text) {
    if (text.length > 20) {
      return " compact-text";
    }

    if (text.length > 13) {
      return " medium-text";
    }

    return "";
  }

  function getMapObject(task, objectId) {
    return (task.objects || []).filter(function (object) {
      return object.id === objectId;
    })[0];
  }

  function getMapTarget(task) {
    if (task.target) {
      return task.target;
    }

    var targetObject = getMapObject(task, task.correctTarget);
    if (targetObject) {
      return {
        x: targetObject.x,
        y: targetObject.y
      };
    }

    return null;
  }

  function isMapTarget(task, x, y) {
    var target = getMapTarget(task);

    if (!target) {
      return false;
    }

    return target.x === x && target.y === y;
  }

  function mapObjectAt(task, x, y) {
    return (task.objects || []).filter(function (object) {
      return object.x === x && object.y === y;
    })[0];
  }

  function mapTileClass(task, x, y) {
    var object = mapObjectAt(task, x, y);
    if (object && object.kind) {
      return " " + object.kind;
    }

    if (task.home && task.home.x === x && task.home.y === y) {
      return " home-tile";
    }

    if (task.exit && task.exit.x === x && task.exit.y === y) {
      return " exit-tile";
    }

    return "";
  }

  function mapTileEmoji(task, x, y) {
    var object = mapObjectAt(task, x, y);
    if (object) {
      return object.emoji;
    }

    if (task.exit && task.exit.x === x && task.exit.y === y) {
      return "🚪";
    }

    return "";
  }

  function mapStart(task) {
    return task.start || { x: 0, y: 0 };
  }

  function mapWidth(task) {
    return task.width || 5;
  }

  function mapHeight(task) {
    return task.height || 5;
  }

  function getMapAria(task, x, y) {
    if (isMapTarget(task, x, y)) {
      return "цель";
    }

    return "";
  }

  function setWarning(message) {
    var warning = document.getElementById("audio-warning");
    if (warning) {
      warning.textContent = message || "";
    }
  }

  function entryButton(entryId) {
    var entry = maps.entries[entryId];
    return '<button class="answer-card' + getEntrySizeClass(entry.text) + '" type="button" data-answer="' + escapeHtml(entry.id) + '">' +
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
    var unit = getCurrentUnit();
    var units = existing.units || {};
    units[unit.id] = {
      complete: Boolean(units[unit.id] && units[unit.id].complete),
      completedAt: units[unit.id] && units[unit.id].completedAt,
      stageIndex: position.stageIndex,
      taskIndex: position.taskIndex
    };
    progress[lesson.id] = {
      complete: Boolean(existing.complete),
      completedAt: existing.completedAt,
      units: units
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function markUnitComplete() {
    var progress = getProgress();
    var existing = progress[lesson.id] || {};
    var units = existing.units || {};
    var unit = getCurrentUnit();
    units[unit.id] = {
      complete: true,
      completedAt: new Date().toISOString()
    };
    progress[lesson.id] = {
      complete: getUnits().filter(function (item) {
        return !item.comingSoon;
      }).every(function (item) {
        return item.id === unit.id || Boolean(units[item.id] && units[item.id].complete);
      }),
      completedAt: new Date().toISOString(),
      units: units
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
      entry("zeleniy", "зелёный", "🟢", "word", "zeleniy.mp3"),
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
      entry("zdes_odno_yabloko", "здесь одно яблоко", "📍1️⃣🍎", "chunk", "zdes_odno_yabloko.mp3"),
      entry("zdes_dva_yabloka", "здесь два яблока", "📍2️⃣🍎", "chunk", "zdes_dva_yabloka.mp3"),
      entry("tam_odin_avtobus", "там один автобус", "👉1️⃣🚌", "chunk", "tam_odin_avtobus.mp3"),
      entry("tam_dva_avtobusa", "там два автобуса", "👉2️⃣🚌", "chunk", "tam_dva_avtobusa.mp3"),
      entry("eto_siniy_avtobus", "это синий автобус", "👀🔵🚌", "chunk", "eto_siniy_avtobus.mp3"),
      entry("eto_krasnoe_yabloko", "это красное яблоко", "👀🔴🍎", "chunk", "eto_krasnoe_yabloko.mp3"),
      entry("eto_siniy_dom", "это синий дом", "👀🔵🏠", "chunk", "eto_siniy_dom.mp3"),
      entry("eto_krasniy_dom", "это красный дом", "👀🔴🏠", "chunk", "eto_krasniy_dom.mp3"),
      entry("idi_k_avtobusu", "иди к автобусу", "➡️🚌", "command", "idi_k_avtobusu.mp3"),
      entry("naydi_zelyonoe_yabloko", "найди зелёное яблоко", "🟢🍎", "command", "naydi_zelyonoe_yabloko.mp3"),
      entry("naydi_krasnye_yabloki", "найди красные яблоки", "🔴🍎🍎", "command", "naydi_krasnye_yabloki.mp3"),
      entry("idi_v_dom", "иди в дом", "➡️🏠", "command", "idi_v_dom.mp3"),
      entry("vyyidi_iz_doma", "выйди из дома", "🏠➡️", "command", "vyyidi_iz_doma.mp3"),
      entry("idi_k_vode", "иди к воде", "➡️💧", "command", "idi_k_vode.mp3"),
      entry("idi_k_sinemu_avtobusu", "иди к синему автобусу", "➡️🔵🚌", "command", "idi_k_sinemu_avtobusu.mp3"),
      entry("idi_k_krasnomu_domu", "иди к красному дому", "➡️🔴🏠", "command", "idi_k_krasnomu_domu.mp3")
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
        emoji: byId[prompt].emoji,
        audio: byId[prompt].audio,
        options: options,
        correct: correct || prompt
      };
    }

    function pic(id, prompt, correctScene, options) {
      return {
        id: id,
        text: byId[prompt].text,
        emoji: byId[prompt].emoji,
        audio: byId[prompt].audio,
        correctScene: correctScene,
        options: options
      };
    }

    function yn(id, prompt, scene, correct) {
      return {
        id: id,
        text: byId[prompt].text,
        emoji: byId[prompt].emoji,
        audio: byId[prompt].audio,
        scene: scene,
        correct: correct
      };
    }

    function loc(id, prompt, scene, correctZone) {
      return {
        id: id,
        text: byId[prompt].text,
        emoji: byId[prompt].emoji,
        audio: byId[prompt].audio,
        scene: scene,
        correctZone: correctZone
      };
    }

    function mini(id, prompt, objects, correctTarget, correctAction, startIndex) {
      return {
        id: id,
        text: byId[prompt].text,
        emoji: byId[prompt].emoji,
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

    function mapObj(id, emoji, x, y, kind) {
      return { id: id, emoji: emoji, x: x, y: y, kind: kind || "" };
    }

    function mapTask(id, prompt, start, target, objects) {
      return {
        id: id,
        text: byId[prompt].text,
        emoji: byId[prompt].emoji,
        audio: byId[prompt].audio,
        width: 5,
        height: 5,
        start: start,
        target: target,
        objects: objects
      };
    }

    function feedback(id, emoji, text) {
      return {
        id: id,
        emoji: emoji,
        text: text,
        variants: [
          { audio: audioRoot + "feedback_" + id + "_1.mp3", rate: "-6%", pitch: "+0Hz" },
          { audio: audioRoot + "feedback_" + id + "_2.mp3", rate: "+0%", pitch: "+3Hz" },
          { audio: audioRoot + "feedback_" + id + "_3.mp3", rate: "+5%", pitch: "+6Hz" }
        ]
      };
    }

    return {
      lessons: [
        {
          id: "lesson-1",
          title: "Урок 1. Здесь, там, это",
          feedbackAudio: {
            success: [
              feedback("pravilno", "✅", "Правильно!"),
              feedback("molodets", "🎉", "Молодец!"),
              feedback("horosho", "👍", "Хорошо!"),
              feedback("otlichno", "⭐", "Отлично!"),
              feedback("verno", "😊", "Верно!"),
              feedback("super", "🚀", "Супер!"),
              feedback("idealno", "🏆", "Идеально!"),
              feedback("vsyo_pravilno", "👏", "Всё правильно!"),
              feedback("klass", "🔥", "Класс!"),
              feedback("da_eto_verniy_otvet", "✅", "Да, это верный ответ!")
            ],
            retry: [
              feedback("davay", "💪", "Давай!"),
              feedback("eshche_raz", "↩️", "Ещё раз"),
              feedback("poprobuy_eshche", "🙂", "Попробуй ещё")
            ]
          },
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
                task("tap-24", "zdes_odno_yabloko", ["zdes_odno_yabloko", "zdes_dva_yabloka", "tam_yabloko"]),
                task("tap-25", "zdes_dva_yabloka", ["zdes_dva_yabloka", "zdes_odno_yabloko", "tam_yabloko"]),
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
                pic("pic-1", "zdes_odno_yabloko", "near-one-apple", ["near-one-apple", "near-two-apples", "far-one-apple"]),
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
          ],
          extraUnits: [
            {
              id: "unit-map-game",
              title: "Игра",
              icon: "🕹️",
              stages: [
                {
                  type: "map-command-game",
                  title: "Карта",
                  tasks: [
                    mapTask("map-1", "idi_k_avtobusu", { x: 0, y: 4 }, { x: 4, y: 3 }, [
                      mapObj("bus", "🚌", 4, 3, "bus"),
                      mapObj("water", "💧", 1, 1, "water"),
                      mapObj("house", "🏠", 3, 0, "house")
                    ]),
                    mapTask("map-2", "naydi_zelyonoe_yabloko", { x: 2, y: 4 }, { x: 0, y: 1 }, [
                      mapObj("green-apple", "🟢🍎", 0, 1, "apple"),
                      mapObj("red-apple", "🔴🍎", 4, 1, "apple"),
                      mapObj("bus", "🚌", 3, 3, "bus")
                    ]),
                    mapTask("map-3", "naydi_krasnye_yabloki", { x: 0, y: 4 }, { x: 3, y: 1 }, [
                      mapObj("red-apples", "🔴🍎🍎", 3, 1, "apple"),
                      mapObj("green-apple", "🟢🍎", 1, 2, "apple"),
                      mapObj("house", "🏠", 4, 4, "house")
                    ]),
                    mapTask("map-4", "idi_v_dom", { x: 1, y: 4 }, { x: 2, y: 1 }, [
                      mapObj("house", "🏠", 2, 1, "house"),
                      mapObj("water", "💧", 0, 3, "water"),
                      mapObj("apple", "🍎", 4, 4, "apple")
                    ]),
                    mapTask("map-5", "vyyidi_iz_doma", { x: 2, y: 1 }, { x: 2, y: 3 }, [
                      mapObj("house", "🏠", 2, 1, "house"),
                      mapObj("door", "🚪", 2, 3, "exit"),
                      mapObj("bus", "🚌", 4, 2, "bus")
                    ]),
                    mapTask("map-6", "idi_k_vode", { x: 4, y: 4 }, { x: 1, y: 0 }, [
                      mapObj("water", "💧", 1, 0, "water"),
                      mapObj("red-apples", "🔴🍎🍎", 3, 2, "apple"),
                      mapObj("house", "🏠", 0, 4, "house")
                    ]),
                    mapTask("map-7", "idi_k_sinemu_avtobusu", { x: 0, y: 0 }, { x: 4, y: 4 }, [
                      mapObj("blue-bus", "🔵🚌", 4, 4, "bus"),
                      mapObj("red-house", "🔴🏠", 1, 3, "house"),
                      mapObj("green-apple", "🟢🍎", 3, 1, "apple")
                    ]),
                    mapTask("map-8", "idi_k_krasnomu_domu", { x: 4, y: 0 }, { x: 0, y: 3 }, [
                      mapObj("red-house", "🔴🏠", 0, 3, "house"),
                      mapObj("blue-bus", "🔵🚌", 2, 2, "bus"),
                      mapObj("water", "💧", 4, 4, "water")
                    ])
                  ]
                }
              ]
            },
            {
              id: "unit-text",
              title: "Текст",
              icon: "📖",
              comingSoon: true,
              stages: []
            },
            {
              id: "unit-video",
              title: "Видео",
              icon: "🎬",
              comingSoon: true,
              stages: []
            }
          ]
        }
      ].concat(window.LexiLandLesson2 ? [window.LexiLandLesson2] : [])
    };
  }

  window.LexiLandApp = {
    home: function () {
      window.LexiLandAudio.stopAudio();
      renderHome();
    }
  };
}());
