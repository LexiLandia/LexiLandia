(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-russian-progress-v2";
  var PROGRESS_VERSION = 1;
  var PROGRESS_COOKIE_KEY = "lexiland_progress_backup";
  var PROGRESS_DB_NAME = "lexiland-progress";
  var PROGRESS_STORE_NAME = "progress";
  var PROGRESS_RECORD_KEY = "main";
  var DEBUG_STORAGE_KEY = "lexiland-debug-mode";
  var appRoot = document.getElementById("app");
  var data = null;
  var lesson = null;
  var progressCache = null;
  var COURSE_SHORT_TITLES = {
    "Юнит 1": "Старт",
    "Юнит 2": "Кто и что",
    "Юнит 3": "Действия",
    "Юнит 4": "Фразы",
    "Юнит 5": "Движение",
    "Юнит 6": "Места",
    "Юнит 7": "Описание",
    "Юнит 8": "Счёт",
    "Юнит 9": "День",
    "Юнит 10": "Еда",
    "Юнит 11": "Одежда",
    "Юнит 12": "Погода",
    "Юнит 13": "Тело",
    "Юнит 14": "Семья",
    "Юнит 15": "Дом",
    "Юнит 16": "Город"
  };
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
  window.addEventListener("beforeunload", flushProgress);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      flushProgress();
    }
  });

  function init() {
    setupDebugMode();
    bindDebugBadgeCopy();
    loadLessonData().then(function (loadedData) {
      data = normalizeLessonData(loadedData);
      setCurrentLesson(0);
      return hydrateProgress();
    }).then(function () {
      restoreLastScreen();
    }).catch(function () {
      progressCache = createEmptyProgress();
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

    if (window.LexiLandUnit2Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit2Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit2Lesson]);
    }

    if (window.LexiLandUnit3Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit3Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit3Lesson]);
    }

    if (window.LexiLandUnit4Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit4Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit4Lesson]);
    }

    if (window.LexiLandUnit5Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit5Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit5Lesson]);
    }

    if (window.LexiLandUnit6Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit6Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit6Lesson]);
    }

    if (window.LexiLandUnit7Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit7Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit7Lesson]);
    }

    if (window.LexiLandUnit8Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit8Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit8Lesson]);
    }

    if (window.LexiLandUnit9Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit9Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit9Lesson]);
    }

    if (window.LexiLandUnit10Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit10Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit10Lesson]);
    }

    if (window.LexiLandUnit11Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit11Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit11Lesson]);
    }

    if (window.LexiLandUnit12Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit12Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit12Lesson]);
    }

    if (window.LexiLandUnit13Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit13Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit13Lesson]);
    }

    if (window.LexiLandUnit14Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit14Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit14Lesson]);
    }

    if (window.LexiLandUnit15Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit15Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit15Lesson]);
    }

    if (window.LexiLandUnit16Lesson && !lessons.some(function (item) { return item.id === window.LexiLandUnit16Lesson.id; })) {
      lessons = lessons.concat([window.LexiLandUnit16Lesson]);
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

  function setPlayMode(active) {
    appRoot.classList.toggle("play-shell", Boolean(active));
    document.body.classList.toggle("lesson-active", Boolean(active));
  }

  function renderHome() {
    var courses = getCourseGroups();

    setPlayMode(false);
    recordNavigation("home");

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
          '<p class="emoji-line">📍 🍎 💧 🚌 🏠</p>' +
        '</section>' +
        '<div class="course-list">' +
          courses.map(function (group, courseIndex) {
            return courseCard(group, courseIndex);
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

    Array.prototype.forEach.call(appRoot.querySelectorAll("[data-course]"), function (button) {
      button.addEventListener("click", function () {
        renderCoursePage(Number(button.getAttribute("data-course")));
      });
    });
    bindCourseImages();
  }

  function renderCoursePage(courseIndex) {
    var group = getCourseGroups()[courseIndex];

    if (!group) {
      renderHome();
      return;
    }

    if (!group.lessonIndexes) {
      renderUnitMenu(group.lessonIndex);
      return;
    }

    renderLessonGroupMenu(group);
  }

  function renderLessonGroupMenu(group) {
    var lessons = data.lessons || [];
    var childLessons = group.lessonIndexes.map(function (lessonIndex) {
      return {
        item: lessons[lessonIndex],
        lessonIndex: lessonIndex
      };
    }).filter(function (child) {
      return Boolean(child.item);
    });
    var complete = childLessons.length > 0 && childLessons.every(function (child) {
      return isLessonComplete(child.item);
    });

    setPlayMode(false);
    recordNavigation("course", {
      courseId: group.id,
      courseIndex: getCourseGroups().findIndex(function (item) { return item.id === group.id; }),
      unitLabel: group.menuLabel,
      unitTitle: group.shortTitle || group.title || group.menuLabel
    });

    appRoot.innerHTML =
      '<main class="screen">' +
        '<header class="topbar">' +
          '<div class="brand">' +
            '<button class="home-button" type="button" data-action="home" aria-label="Домой">🏠</button>' +
            '<div>' +
              '<h1>' + escapeHtml(group.menuLabel) + (complete ? " ✅" : "") + '</h1>' +
              '<small>' + escapeHtml(group.menuLabel) + '</small>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<section class="lesson-card unit-menu-card">' +
          '<div class="pill-row">' +
            '<span class="pill' + (complete ? " done" : "") + '">' + escapeHtml(complete ? "✅ Готово" : "Открыто") + '</span>' +
          '</div>' +
          renderCourseVisual(group) +
          '<h3>' + escapeHtml(group.menuLabel) + '</h3>' +
          '<div class="unit-list">' +
            childLessons.map(function (child) {
              return lessonMenuCard(child.item, child.lessonIndex);
            }).join("") +
          '</div>' +
        '</section>' +
      '</main>';

    appRoot.querySelector('[data-action="home"]').addEventListener("click", function () {
      recordNavigation("home");
      renderHome();
    });
    Array.prototype.forEach.call(appRoot.querySelectorAll("[data-lesson-menu]"), function (button) {
      button.addEventListener("click", function () {
        renderUnitMenu(Number(button.getAttribute("data-lesson-menu")));
      });
    });
    bindCourseImages();
  }

  function renderUnitMenu(lessonIndex) {
    var lessons = data.lessons || [];
    var item = lessons[lessonIndex] || lessons[0];
    var units = getUnits(item);
    var complete = isLessonComplete(item);
    var unlocked = isLessonUnlocked(lessonIndex);
    var labelNumber = getLessonOrder(item, lessonIndex);
    var label = item.menuLabel || "\u0423\u0440\u043e\u043a " + labelNumber;
    var displayTitle = getShellDisplayTitle(item, label);

    setCurrentLesson(lessonIndex);
    setPlayMode(false);
    recordNavigation("unit", {
      lessonIndex: lessonIndex,
      lessonId: item.id
    });

    appRoot.innerHTML =
      '<main class="screen">' +
        '<header class="topbar">' +
          '<div class="brand">' +
            '<button class="home-button" type="button" data-action="home" aria-label="Домой">🏠</button>' +
            '<div>' +
              '<h1>' + escapeHtml(label) + (complete ? " ✅" : "") + '</h1>' +
              '<small>' + escapeHtml(displayTitle) + '</small>' +
            '</div>' +
          '</div>' +
        '</header>' +
        '<section class="lesson-card unit-menu-card">' +
          '<div class="pill-row">' +
            '<span class="pill' + (complete ? " done" : "") + '">' + escapeHtml(complete ? "✅ Готово" : "Открыто") + '</span>' +
          '</div>' +
          renderCourseVisual(item) +
          '<h3>' + escapeHtml(displayTitle) + '</h3>' +
          '<div class="unit-list">' +
            units.map(function (unit, unitIndex) {
              return unitCard(unit, unitIndex, item, lessonIndex, unlocked);
            }).join("") +
          '</div>' +
        '</section>' +
      '</main>';

    appRoot.querySelector('[data-action="home"]').addEventListener("click", function () {
      recordNavigation("home");
      renderHome();
    });
    bindUnitButtons();
    bindCourseImages();
  }

  function bindUnitButtons() {
    Array.prototype.forEach.call(appRoot.querySelectorAll("[data-unit]"), function (button) {
      button.addEventListener("click", function () {
        var lessonIndex = Number(button.getAttribute("data-lesson"));
        var unitIndex = Number(button.getAttribute("data-unit"));
        setCurrentLesson(lessonIndex);
        var unit = getUnits()[unitIndex];
        recordNavigation("lesson", {
          lessonIndex: lessonIndex,
          lessonId: lesson.id,
          unitIndex: unitIndex,
          unitId: unit && unit.id,
          stageIndex: 0,
          taskIndex: 0
        });
        var saved = isUnitComplete(unit.id) ? {} : getUnitProgress(unit.id);
        startFrom(unitIndex, saved.stageIndex || 0, saved.taskIndex || 0);
      });
    });
  }

  function getCourseGroups() {
    var lessons = data.lessons || [];
    var unitOneIndexes = [];
    var groups = [];

    lessons.forEach(function (item, lessonIndex) {
      if (isUnitOneLesson(item, lessonIndex)) {
        unitOneIndexes.push(lessonIndex);
      }
    });

    if (unitOneIndexes.length) {
      groups.push({
        id: "unit-1-level-0-3",
        menuLabel: "Юнит 1",
        title: "Юнит 1: Первые шаги",
        shortTitle: COURSE_SHORT_TITLES["Юнит 1"],
        coverEmoji: "📖",
        lessonIndexes: unitOneIndexes
      });
    }

    lessons.forEach(function (item, lessonIndex) {
      if (unitOneIndexes.indexOf(lessonIndex) !== -1) {
        return;
      }

      groups.push({
        id: item.id,
        menuLabel: item.menuLabel || "\u0423\u0440\u043e\u043a " + getLessonOrder(item, lessonIndex),
        title: item.title,
        shortTitle: getCourseShortTitle(item),
        coverImage: item.coverImage,
        image: item.image,
        cardImage: item.cardImage,
        coverEmoji: item.coverEmoji || item.emoji,
        lessonIndex: lessonIndex
      });
    });

    return groups;
  }

  function isUnitOneLesson(item, lessonIndex) {
    var order = getLessonOrder(item, lessonIndex);
    return order >= 0 && order <= 3 && !item.menuLabel;
  }

  function courseCard(group, courseIndex) {
    var complete = isCourseComplete(group);
    var unlocked = true;
    var label = group.menuLabel + (complete ? " \u2705" : "");
    var readyCount = getCourseReadyCount(group);
    var countLabel = group.lessonIndexes ? formatLessonCount(readyCount) : formatItemCount(readyCount);
    var shortTitle = getCourseShortTitle(group);
    var debugId = getCourseDebugId(courseIndex);

    return '<button class="course-card" type="button" data-course="' + courseIndex + '" data-debug-id="' + escapeHtml(debugId) + '"' + (unlocked ? "" : " disabled") + '>' +
      renderDebugBadge(debugId, group.id || group.menuLabel) +
      renderCourseVisual(group) +
      '<div class="course-copy">' +
        '<span class="pill' + (complete ? " done" : "") + '">' + escapeHtml(unlocked ? label : label + " 🔒") + '</span>' +
        (shortTitle ? '<h3>' + escapeHtml(shortTitle) + '</h3>' : "") +
        '<small>' + escapeHtml(readyCount + " " + countLabel) + '</small>' +
      '</div>' +
    '</button>';
  }

  function renderDebugBadge(debugId, sourceId, extraClass) {
    if (!debugId) {
      return "";
    }

    return '<span class="debug-id-badge ' + escapeHtml(extraClass || "") + '" data-debug-id="' + escapeHtml(debugId) + '" data-debug-source="' + escapeHtml(sourceId || debugId) + '" title="Скопировать ID" aria-hidden="true">#' + escapeHtml(debugId) + '</span>';
  }

  function setupDebugMode() {
    var enabled = false;

    try {
      var params = new URLSearchParams(window.location.search || "");
      if (params.has("debug")) {
        enabled = params.get("debug") === "1";
        if (enabled) {
          window.localStorage.setItem(DEBUG_STORAGE_KEY, "1");
        } else {
          window.localStorage.removeItem(DEBUG_STORAGE_KEY);
        }
      } else {
        enabled = window.localStorage.getItem(DEBUG_STORAGE_KEY) === "1";
      }
    } catch (error) {
      enabled = false;
    }

    document.body.classList.toggle("debug-mode", enabled);
  }

  function bindDebugBadgeCopy() {
    document.addEventListener("click", function (event) {
      var target = event.target && event.target.closest ? event.target.closest(".debug-id-badge") : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      copyDebugId(target);
    }, true);
  }

  function copyDebugId(target) {
    var rawId = target.getAttribute("data-debug-id") || target.textContent || "";
    var debugId = rawId.charAt(0) === "#" ? rawId : "#" + rawId;

    copyText(debugId).then(function () {
      target.classList.add("is-copied");
      showDebugToast("ID скопирован: " + debugId);
      window.setTimeout(function () {
        target.classList.remove("is-copied");
      }, 900);
    }).catch(function () {
      showDebugToast("ID: " + debugId);
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "readonly");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();

      try {
        if (document.execCommand("copy")) {
          resolve(true);
        } else {
          reject(new Error("copy"));
        }
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  function showDebugToast(text) {
    var toast = document.getElementById("debug-copy-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "debug-copy-toast";
      toast.className = "debug-copy-toast";
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = text;
    toast.classList.add("is-visible");
    window.clearTimeout(showDebugToast.timer);
    showDebugToast.timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1300);
  }

  function getCourseDebugId(courseIndex) {
    return "\u044e" + (Number(courseIndex) + 1);
  }

  function getCourseNumberByLessonIndex(lessonIndex) {
    var groups = getCourseGroups();
    var index;

    for (index = 0; index < groups.length; index += 1) {
      if (groups[index].lessonIndexes && groups[index].lessonIndexes.indexOf(lessonIndex) !== -1) {
        return index + 1;
      }
      if (groups[index].lessonIndex === lessonIndex) {
        return index + 1;
      }
    }

    return Math.max(1, Number(lessonIndex) + 1);
  }

  function getLessonDebugId(targetLesson, lessonIndex) {
    return "\u044e" + getCourseNumberByLessonIndex(lessonIndex) + "-\u0443" + getLessonOrder(targetLesson, lessonIndex);
  }

  function getUnitDebugId(unit, index, targetLesson, lessonIndex) {
    var courseNumber = getCourseNumberByLessonIndex(lessonIndex);
    var lessonNumber = getUnitLessonNumber(unit);
    var gameNumber;

    if (lessonNumber !== null) {
      return "\u044e" + courseNumber + "-\u0443" + lessonNumber;
    }

    if (isGameUnit(unit)) {
      gameNumber = getGameNumberInLesson(unit, index, targetLesson);
      return "\u044e" + courseNumber + "-\u0438" + gameNumber;
    }

    return "\u044e" + courseNumber + "-\u0440" + (Number(index) + 1);
  }

  function getUnitLessonNumber(unit) {
    var match = String(unit && unit.id || "").match(/lesson-(\d+)/);

    if (match) {
      return Number(match[1]);
    }

    return null;
  }

  function getGameNumberInLesson(unit, index, targetLesson) {
    var units = getUnits(targetLesson);
    var count = 0;
    var cursor;

    for (cursor = 0; cursor <= index; cursor += 1) {
      if (isGameUnit(units[cursor])) {
        count += 1;
      }
    }

    return Math.max(1, count);
  }

  function getCurrentScreenDebug() {
    var unit = getCurrentUnit();
    var base = getUnitDebugId(unit, position.unitIndex, lesson, position.lessonIndex);
    var stage = unit && unit.stages && unit.stages[position.stageIndex];
    var task = getCurrentTaskForDebug(stage);
    var visible = base;
    var source = [
      "lesson:" + (lesson && lesson.id || ""),
      "unit:" + (unit && unit.id || "")
    ];

    if (stage) {
      visible += "-\u0441" + (position.stageIndex + 1);
      source.push("stage:" + (stage.id || stage.type || position.stageIndex));
    }

    if (task) {
      visible += "-\u0437" + (position.taskIndex + 1);
      source.push("task:" + (task.id || task.entryId || task.text || position.taskIndex));
    } else if (!stage) {
      visible += "-\u0444";
      source.push("finish");
    }

    return {
      visible: visible,
      source: source.join(" | ")
    };
  }

  function getCurrentTaskForDebug(stage) {
    if (!stage) {
      return null;
    }

    if (stage.type === "intro") {
      return {
        id: stage.items && stage.items[position.taskIndex] || "",
        entryId: stage.items && stage.items[position.taskIndex] || ""
      };
    }

    return (stage.tasks || [])[position.taskIndex] || null;
  }

  function getCourseShortTitle(item) {
    var label = item && item.menuLabel;
    var title = (item && item.shortTitle) || "";
    var rawTitle = (item && item.title) || "";
    var afterColon = rawTitle.indexOf(":") !== -1 ? rawTitle.split(":").slice(1).join(":").trim() : rawTitle;

    if (label && COURSE_SHORT_TITLES[label]) {
      return COURSE_SHORT_TITLES[label];
    }

    if (title) {
      return title;
    }

    if (afterColon && afterColon.length <= 14) {
      return afterColon;
    }

    return "";
  }

  function getShellDisplayTitle(item, fallback) {
    if (item && item.menuLabel && /^Юнит\s+\d+/.test(item.menuLabel)) {
      return getCourseShortTitle(item) || item.menuLabel;
    }

    return (item && item.title) || fallback || "";
  }

  function renderCourseVisual(item) {
    var image = item.coverImage || item.image || item.cardImage || "";
    var emoji = item.coverEmoji || item.emoji || (item.lessonIndexes ? "" : firstUnitIcon(item)) || "⭐";

    if (image) {
      return '<span class="course-visual course-image-visual" aria-hidden="true">' +
        '<img src="' + escapeHtml(image) + '" alt="" data-optional-image>' +
      '</span>';
    }

    return '<span class="course-visual" aria-hidden="true">' + escapeHtml(emoji) + '</span>';
  }

  function firstUnitIcon(item) {
    var units = getUnits(item);
    return units[0] && units[0].icon;
  }

  function lessonMenuCard(item, lessonIndex) {
    var complete = isLessonComplete(item);
    var labelNumber = getLessonOrder(item, lessonIndex);
    var label = item.menuLabel || "\u0423\u0440\u043e\u043a " + labelNumber;
    var readyCount = getReadyUnitCount(item);
    var debugId = getLessonDebugId(item, lessonIndex);

    return '<button class="unit-card lesson-menu-card" type="button" data-lesson-menu="' + lessonIndex + '" data-debug-id="' + escapeHtml(debugId) + '">' +
      renderDebugBadge(debugId, item.id) +
      '<span class="unit-icon">' + escapeHtml(item.coverEmoji || item.emoji || firstUnitIcon(item) || "⭐") + '</span>' +
      '<span class="unit-copy">' +
        '<strong>' + escapeHtml(label) + '</strong>' +
        '<small>' + escapeHtml((complete ? "✅ Готово" : "Открыто") + " · " + readyCount + " " + formatItemCount(readyCount)) + '</small>' +
      '</span>' +
      '<span class="unit-action">' + escapeHtml("Открыть") + '</span>' +
    '</button>';
  }

  function isCourseComplete(group) {
    var lessons = data.lessons || [];

    if (group.lessonIndexes) {
      return group.lessonIndexes.length > 0 && group.lessonIndexes.every(function (lessonIndex) {
        return isLessonComplete(lessons[lessonIndex]);
      });
    }

    return isLessonComplete(lessons[group.lessonIndex]);
  }

  function getCourseReadyCount(group) {
    var lessons = data.lessons || [];

    if (group.lessonIndexes) {
      return group.lessonIndexes.length;
    }

    return getReadyUnitCount(lessons[group.lessonIndex]);
  }

  function getReadyUnitCount(item) {
    return getUnits(item).filter(function (unit) {
      return !unit.comingSoon;
    }).length;
  }

  function formatItemCount(count) {
    var lastTwo = count % 100;
    var last = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) {
      return "разделов";
    }
    if (last === 1) {
      return "раздел";
    }
    if (last >= 2 && last <= 4) {
      return "раздела";
    }
    return "разделов";
  }

  function formatLessonCount(count) {
    var lastTwo = count % 100;
    var last = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) {
      return "уроков";
    }
    if (last === 1) {
      return "урок";
    }
    if (last >= 2 && last <= 4) {
      return "урока";
    }
    return "уроков";
  }

  function bindCourseImages() {
    Array.prototype.forEach.call(appRoot.querySelectorAll(".course-image-visual img"), function (image) {
      image.addEventListener("error", function () {
        image.closest(".course-image-visual").hidden = true;
      });
    });
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
    var passCount = getUnitPassCount(unit.id, targetLesson);
    var status = "🔒";
    var action = "";
    var disabled = true;

    if (unit.comingSoon) {
      status = "Скоро";
    } else if (complete) {
      status = "✅ " + formatPassCount(passCount);
      action = "Ещё раз";
      disabled = false;
    } else if (unlocked && hasProgress) {
      status = "Продолжить";
      action = "Продолжить";
      disabled = false;
    } else if (unlocked) {
      status = "Начать";
      action = unit.startLabel || "Начать";
      disabled = false;
    }

    var debugId = getUnitDebugId(unit, index, targetLesson, lessonIndex);

    return '<button class="unit-card" type="button" data-debug-id="' + escapeHtml(debugId) + '" ' + (disabled ? "disabled" : 'data-lesson="' + lessonIndex + '" data-unit="' + index + '"') + '>' +
      renderDebugBadge(debugId, unit.id) +
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

    setPlayMode(true);
    recordNavigation("lesson");

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

    if (stage.type === "reading-find-game") {
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen task-screen reading-game-screen">' +
          '<div id="game-root"></div>' +
        '</main>';

      window.LexiLandGames.renderReadingFindGame({
        root: document.getElementById("game-root"),
        task: task,
        helpers: gameHelpers(),
        onCorrect: nextTask
      });
      return;
    }

    if (stage.type === "unit-2-kto-chto-game") {
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen task-screen unit2-game-screen">' +
          '<div id="game-root"></div>' +
        '</main>';

      window.LexiLandGames.renderUnit2KtoChhtoGame({
        root: document.getElementById("game-root"),
        task: task,
        helpers: gameHelpers(),
        onCorrect: nextTask
      });
      return;
    }

    if (stage.type === "secret-picture-game") {
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen task-screen secret-picture-screen">' +
          '<div id="game-root"></div>' +
        '</main>';

      window.LexiLandGames.renderSecretPictureGame({
        root: document.getElementById("game-root"),
        task: task,
        helpers: gameHelpers(),
        onCorrect: nextTask
      });
      return;
    }

    if (stage.type === "unit-6-location-game") {
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen task-screen unit6-game-screen">' +
          '<div id="game-root"></div>' +
        '</main>';

      window.LexiLandGames.renderUnit6LocationGame({
        root: document.getElementById("game-root"),
        task: task,
        helpers: gameHelpers(),
        onCorrect: nextTask
      });
      return;
    }

    if (stage.type === "unit-7-description-game") {
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen task-screen unit7-game-screen">' +
          '<div id="game-root"></div>' +
        '</main>';

      window.LexiLandGames.renderUnit7DescriptionGame({
        root: document.getElementById("game-root"),
        task: task,
        helpers: gameHelpers(),
        onCorrect: nextTask
      });
      return;
    }

    if (stage.type === "unit-8-count-game") {
      appRoot.innerHTML =
        renderLessonHeader(stage.title) +
        '<main class="lesson-screen task-screen unit8-game-screen">' +
          '<div id="game-root"></div>' +
        '</main>';

      window.LexiLandGames.renderUnit8CountGame({
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
    var passCount = getUnitPassCount(unit.id);

    setPlayMode(true);

    appRoot.innerHTML =
      renderLessonHeader("✅ Готово") +
      '<main class="lesson-screen">' +
        '<section class="stage-card finish-card">' +
          '<div class="intro-emoji" aria-hidden="true">✅</div>' +
          '<h2 class="big-russian">Готово</h2>' +
          '<p class="unit-finish-title">' + escapeHtml(unit.title) + '</p>' +
          '<p class="unit-pass-count">✅ ' + escapeHtml(formatPassCount(passCount)) + '</p>' +
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

    appRoot.querySelector('[data-action="home"]').addEventListener("click", function () {
      recordNavigation("home");
      renderHome();
    });
    appRoot.querySelector('[data-action="again"]').addEventListener("click", function () {
      startFrom(position.unitIndex, 0, 0);
    });
  }

  function renderLessonHeader(title) {
    var percent = getProgressPercent();
    var unit = getCurrentUnit();
    var debug = getCurrentScreenDebug();
    return '<header class="topbar">' +
      '<div class="brand">' +
        '<button class="home-button" type="button" onclick="LexiLandApp.unit()" aria-label="Юнит">↩️</button>' +
        '<button class="home-button" type="button" onclick="LexiLandApp.home()" aria-label="Домой">🏠</button>' +
        '<div>' +
          '<h2>' + escapeHtml(unit.title) + '</h2>' +
          '<small>' + escapeHtml(title) + '</small>' +
        '</div>' +
      '</div>' +
      renderDebugBadge(debug.visible, debug.source, "lesson-debug-badge") +
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

  function getUnitPassCount(unitId, targetLesson) {
    var progress = getUnitProgress(unitId, targetLesson);

    if (typeof progress.completionCount === "number") {
      return progress.completionCount;
    }

    if (typeof progress.passCount === "number") {
      return progress.passCount;
    }

    return progress.complete ? 1 : 0;
  }

  function formatPassCount(count) {
    var value = Number(count) || 0;
    var lastTwo = value % 100;
    var last = value % 10;
    var word = "раз";

    if (lastTwo < 11 || lastTwo > 14) {
      if (last >= 2 && last <= 4) {
        word = "раза";
      }
    }

    return value + " " + word;
  }

  function isUnitUnlocked(index, targetLesson) {
    return true;
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
      playEntryId: playEntryId,
      playPrompt: playPrompt,
      playWord: playWord,
      playAudioList: playAudioList,
      recordAnswer: recordAnswer,
      debugBadge: renderDebugBadge,
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
      shuffleAvoidFirst: shuffleAvoidFirst,
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

  function playEntryId(entryId) {
    var entry = maps.entries[entryId];

    if (!entry) {
      return Promise.resolve(false);
    }

    return playWord(entry.text, entry.audio);
  }

  function playWord(text, audioPath) {
    var cleanText = cleanAudioLookupText(text);
    var path = audioPath || findAudioForText(cleanText);

    setWarning("");

    if (!path || !window.LexiLandAudio) {
      setWarning("Аудио скоро будет");
      return Promise.resolve(false);
    }

    return window.LexiLandAudio.playAudio(path, cleanText, setWarning);
  }

  function findAudioForText(text) {
    var normalized = normalizeAudioLookup(text);
    var lessons = data && data.lessons ? data.lessons : [];
    var local = findAudioInDictionary(lesson && lesson.dictionary, normalized);

    if (local) {
      return local;
    }

    for (var lessonIndex = 0; lessonIndex < lessons.length; lessonIndex += 1) {
      var found = findAudioInDictionary(lessons[lessonIndex].dictionary, normalized);
      if (found) {
        return found;
      }
    }

    return "";
  }

  function findAudioInDictionary(dictionary, normalizedText) {
    var entries = dictionary || [];

    for (var index = 0; index < entries.length; index += 1) {
      if (normalizeAudioLookup(entries[index].text) === normalizedText && entries[index].audio) {
        return entries[index].audio;
      }
    }

    return "";
  }

  function cleanAudioLookupText(text) {
    return String(text || "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.!?]+$/g, "");
  }

  function normalizeAudioLookup(text) {
    return cleanAudioLookupText(text)
      .replace(/[«»"“”]/g, "")
      .toLowerCase();
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

  function shuffleAvoidFirst(items, correct) {
    var copy = shuffle(items || []);

    if (copy.length > 1 && String(copy[0]) === String(correct)) {
      var swapIndex = 1 + Math.floor(Math.random() * (copy.length - 1));
      var first = copy[0];
      copy[0] = copy[swapIndex];
      copy[swapIndex] = first;
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

  function hydrateProgress() {
    var localProgress = normalizeProgressEnvelope(safeReadLocal(STORAGE_KEY));
    var cookieProgress = normalizeCookieProgress(readProgressCookie());

    return readIndexedProgress().then(function (indexedProgress) {
      progressCache = chooseFreshestProgress([
        localProgress,
        normalizeProgressEnvelope(indexedProgress),
        cookieProgress
      ]) || createEmptyProgress();
      persistProgress(progressCache);
      return progressCache;
    }).catch(function () {
      progressCache = chooseFreshestProgress([localProgress, cookieProgress]) || createEmptyProgress();
      persistProgress(progressCache);
      return progressCache;
    });
  }

  function restoreLastScreen() {
    var progress = getProgressEnvelope();
    var last = progress.last || {};
    var lessons = data.lessons || [];
    var lessonIndex = Number(last.lessonIndex);

    if ((!Number.isFinite(lessonIndex) || !lessons[lessonIndex]) && last.lessonId) {
      lessonIndex = lessons.findIndex(function (item) {
        return item && item.id === last.lessonId;
      });
    }

    if (Number.isFinite(lessonIndex) && lessons[lessonIndex]) {
      setCurrentLesson(lessonIndex);
      position.unitIndex = Number(last.unitIndex) || 0;
      position.stageIndex = Number(last.stageIndex) || 0;
      position.taskIndex = Number(last.taskIndex) || 0;
    }

    if (last.screen === "lesson" && lessons[position.lessonIndex]) {
      var unit = getUnits()[position.unitIndex];
      if (unit && !isUnitComplete(unit.id)) {
        startFrom(position.unitIndex, position.stageIndex, position.taskIndex);
        return;
      }
    }

    if (last.screen === "unit" && lessons[position.lessonIndex]) {
      renderUnitMenu(position.lessonIndex);
      return;
    }

    if (last.screen === "course" && typeof last.courseIndex === "number") {
      renderCoursePage(last.courseIndex);
      return;
    }

    renderHome();
  }

  function getProgressEnvelope() {
    if (!progressCache) {
      progressCache = normalizeProgressEnvelope(safeReadLocal(STORAGE_KEY)) || createEmptyProgress();
    }

    return progressCache;
  }

  function getProgress() {
    return getProgressEnvelope().lessons || {};
  }

  function savePosition() {
    var envelope = getProgressEnvelope();
    var progress = envelope.lessons || {};
    var existing = progress[lesson.id] || {};
    var unit = getCurrentUnit();
    var units = existing.units || {};
    var previousUnit = units[unit.id] || {};
    var now = new Date().toISOString();

    units[unit.id] = {
      complete: Boolean(previousUnit.complete),
      completedAt: previousUnit.completedAt,
      completionCount: getUnitPassCount(unit.id),
      stageIndex: position.stageIndex,
      taskIndex: position.taskIndex,
      attempts: Number(previousUnit.attempts) || 0,
      correctAnswers: Number(previousUnit.correctAnswers) || 0,
      mistakes: Number(previousUnit.mistakes) || 0,
      bestScore: Number(previousUnit.bestScore) || 0,
      openedAt: previousUnit.openedAt || now,
      updatedAt: now
    };

    progress[lesson.id] = {
      complete: Boolean(existing.complete),
      completedAt: existing.completedAt,
      updatedAt: now,
      units: units
    };

    envelope.lessons = progress;
    recordNavigation("lesson", null, envelope);
    updateUnitSummary(envelope, lesson);
    touchProgress(envelope, now);
    persistProgress(envelope);
  }

  function markUnitComplete() {
    var envelope = getProgressEnvelope();
    var progress = envelope.lessons || {};
    var existing = progress[lesson.id] || {};
    var units = existing.units || {};
    var unit = getCurrentUnit();
    var previousUnit = units[unit.id] || {};
    var now = new Date().toISOString();
    var completionCount = getUnitPassCount(unit.id) + 1;
    var attempts = Number(previousUnit.attempts) || 0;
    var correctAnswers = Number(previousUnit.correctAnswers) || 0;
    var mistakes = Number(previousUnit.mistakes) || 0;
    var score = attempts ? Math.round((correctAnswers / attempts) * 100) : 100;
    var bestScore = isGameUnit(unit) ? Math.max(Number(previousUnit.bestScore) || 0, score) : Number(previousUnit.bestScore) || 0;

    units[unit.id] = {
      complete: true,
      completedAt: now,
      updatedAt: now,
      completionCount: completionCount,
      attempts: attempts,
      correctAnswers: correctAnswers,
      mistakes: mistakes,
      bestScore: bestScore,
      stageIndex: 0,
      taskIndex: 0
    };

    progress[lesson.id] = {
      complete: getUnits().filter(function (item) {
        return !item.comingSoon;
      }).every(function (item) {
        return item.id === unit.id || Boolean(units[item.id] && units[item.id].complete);
      }),
      completedAt: now,
      updatedAt: now,
      units: units
    };

    envelope.lessons = progress;
    recordNavigation("finish", null, envelope);
    updateUnitSummary(envelope, lesson);
    touchProgress(envelope, now);
    persistProgress(envelope);
  }

  function recordAnswer(isCorrect, task, selected) {
    if (!lesson) {
      return;
    }

    var envelope = getProgressEnvelope();
    var progress = envelope.lessons || {};
    var existing = progress[lesson.id] || {};
    var units = existing.units || {};
    var unit = getCurrentUnit();
    var unitProgress = units[unit.id] || {};
    var now = new Date().toISOString();
    var stats = envelope.stats || {};

    unitProgress.attempts = (Number(unitProgress.attempts) || 0) + 1;
    unitProgress.correctAnswers = (Number(unitProgress.correctAnswers) || 0) + (isCorrect ? 1 : 0);
    unitProgress.mistakes = (Number(unitProgress.mistakes) || 0) + (isCorrect ? 0 : 1);
    unitProgress.lastAnswerAt = now;
    unitProgress.lastTaskId = task && task.id || "";
    unitProgress.stageIndex = position.stageIndex;
    unitProgress.taskIndex = position.taskIndex;
    unitProgress.complete = Boolean(unitProgress.complete);

    units[unit.id] = unitProgress;
    progress[lesson.id] = {
      complete: Boolean(existing.complete),
      completedAt: existing.completedAt,
      updatedAt: now,
      units: units
    };

    stats.attempts = (Number(stats.attempts) || 0) + 1;
    stats.correctAnswers = (Number(stats.correctAnswers) || 0) + (isCorrect ? 1 : 0);
    stats.mistakes = (Number(stats.mistakes) || 0) + (isCorrect ? 0 : 1);
    stats.lastAnswerAt = now;

    envelope.stats = stats;
    envelope.lessons = progress;
    envelope.lastAnswer = {
      lessonId: lesson.id,
      unitId: unit.id,
      taskId: task && task.id || "",
      selected: selected || "",
      correct: Boolean(isCorrect),
      updatedAt: now
    };

    recordNavigation("lesson", null, envelope);
    updateUnitSummary(envelope, lesson);
    touchProgress(envelope, now);
    persistProgress(envelope);
  }

  function recordNavigation(screen, extra, targetEnvelope) {
    var envelope = targetEnvelope || getProgressEnvelope();
    var now = new Date().toISOString();
    var currentLesson = lesson;
    var currentUnit = currentLesson ? getCurrentUnit() : null;
    var courseIndex = getCurrentCourseIndex();
    var course = courseIndex >= 0 ? getCourseGroups()[courseIndex] : null;
    var last = {
      screen: screen || "home",
      courseIndex: typeof courseIndex === "number" ? courseIndex : -1,
      courseId: course && course.id || "",
      unitLabel: course && course.menuLabel || "",
      unitTitle: course && (course.shortTitle || course.title || course.menuLabel) || "",
      lessonIndex: position.lessonIndex,
      lessonId: currentLesson && currentLesson.id || "",
      lessonTitle: currentLesson && currentLesson.title || "",
      unitIndex: position.unitIndex,
      unitId: currentUnit && currentUnit.id || "",
      lessonOrGameTitle: currentUnit && currentUnit.title || "",
      stageIndex: position.stageIndex,
      taskIndex: position.taskIndex,
      updatedAt: now
    };

    Object.keys(extra || {}).forEach(function (key) {
      last[key] = extra[key];
    });

    envelope.last = last;
    envelope.lastOpenedAt = now;
    touchProgress(envelope, now);
    persistProgress(envelope);
  }

  function updateUnitSummary(envelope, targetLesson) {
    if (!targetLesson) {
      return;
    }

    var units = getUnits(targetLesson).filter(function (unit) {
      return !unit.comingSoon;
    });
    var lessonProgress = (envelope.lessons || {})[targetLesson.id] || {};
    var completed = units.filter(function (unit) {
      return Boolean(lessonProgress.units && lessonProgress.units[unit.id] && lessonProgress.units[unit.id].complete);
    }).length;

    envelope.unitSummaries = envelope.unitSummaries || {};
    envelope.unitSummaries[targetLesson.id] = {
      title: targetLesson.title || "",
      menuLabel: targetLesson.menuLabel || "",
      total: units.length,
      completed: completed,
      percent: units.length ? Math.round((completed / units.length) * 100) : 0,
      updatedAt: new Date().toISOString()
    };
  }

  function isGameUnit(unit) {
    return Boolean(unit && (/Игра/.test(unit.title || "") || (unit.stages || []).some(function (stage) {
      return /game/.test(stage.type || "");
    })));
  }

  function getCurrentCourseIndex() {
    if (!data || !data.lessons) {
      return -1;
    }

    var groups = getCourseGroups();
    for (var index = 0; index < groups.length; index += 1) {
      if (groups[index].lessonIndexes && groups[index].lessonIndexes.indexOf(position.lessonIndex) !== -1) {
        return index;
      }
      if (groups[index].lessonIndex === position.lessonIndex) {
        return index;
      }
    }

    return -1;
  }

  function normalizeProgressEnvelope(raw) {
    if (!raw || typeof raw !== "object") {
      return null;
    }

    if (raw.progressVersion === PROGRESS_VERSION) {
      return {
        progressVersion: PROGRESS_VERSION,
        updatedAt: raw.updatedAt || latestDateFromLessons(raw.lessons) || new Date().toISOString(),
        lastOpenedAt: raw.lastOpenedAt || raw.updatedAt || "",
        last: raw.last || {},
        lastAnswer: raw.lastAnswer || {},
        lessons: raw.lessons || {},
        unitSummaries: raw.unitSummaries || {},
        stats: raw.stats || {}
      };
    }

    return {
      progressVersion: PROGRESS_VERSION,
      updatedAt: latestDateFromLessons(raw) || "1970-01-01T00:00:00.000Z",
      lastOpenedAt: "",
      last: {},
      lastAnswer: {},
      lessons: raw,
      unitSummaries: {},
      stats: {}
    };
  }

  function normalizeCookieProgress(raw) {
    if (!raw || typeof raw !== "object") {
      return null;
    }

    return {
      progressVersion: PROGRESS_VERSION,
      updatedAt: raw.updatedAt || "1970-01-01T00:00:00.000Z",
      lastOpenedAt: raw.updatedAt || "",
      last: raw.last || {},
      lastAnswer: {},
      lessons: {},
      unitSummaries: {},
      stats: {}
    };
  }

  function createEmptyProgress() {
    var now = new Date().toISOString();
    return {
      progressVersion: PROGRESS_VERSION,
      updatedAt: now,
      lastOpenedAt: "",
      last: {},
      lastAnswer: {},
      lessons: {},
      unitSummaries: {},
      stats: {}
    };
  }

  function chooseFreshestProgress(items) {
    return (items || []).filter(Boolean).sort(function (a, b) {
      return dateValue(b.updatedAt) - dateValue(a.updatedAt);
    })[0] || null;
  }

  function latestDateFromLessons(lessons) {
    var latest = 0;
    Object.keys(lessons || {}).forEach(function (lessonId) {
      var lessonProgress = lessons[lessonId] || {};
      latest = Math.max(latest, dateValue(lessonProgress.updatedAt), dateValue(lessonProgress.completedAt));
      Object.keys(lessonProgress.units || {}).forEach(function (unitId) {
        var unitProgress = lessonProgress.units[unitId] || {};
        latest = Math.max(latest, dateValue(unitProgress.updatedAt), dateValue(unitProgress.completedAt), dateValue(unitProgress.lastAnswerAt));
      });
    });
    return latest ? new Date(latest).toISOString() : "";
  }

  function dateValue(value) {
    var time = Date.parse(value || "");
    return Number.isFinite(time) ? time : 0;
  }

  function touchProgress(envelope, now) {
    envelope.progressVersion = PROGRESS_VERSION;
    envelope.updatedAt = now || new Date().toISOString();
  }

  function persistProgress(envelope) {
    progressCache = envelope || progressCache || createEmptyProgress();
    safeWriteLocal(STORAGE_KEY, progressCache);
    writeProgressCookie(progressCache);
    writeIndexedProgress(progressCache);
  }

  function flushProgress() {
    if (!progressCache) {
      return;
    }
    touchProgress(progressCache);
    safeWriteLocal(STORAGE_KEY, progressCache);
    writeProgressCookie(progressCache);
    writeIndexedProgress(progressCache);
  }

  function safeReadLocal(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function safeWriteLocal(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return false;
    }
    return true;
  }

  function readProgressCookie() {
    try {
      var prefix = PROGRESS_COOKIE_KEY + "=";
      var parts = String(document.cookie || "").split(";").map(function (part) {
        return part.trim();
      });
      var match = parts.filter(function (part) {
        return part.indexOf(prefix) === 0;
      })[0];
      return match ? JSON.parse(decodeURIComponent(match.slice(prefix.length))) : null;
    } catch (error) {
      return null;
    }
  }

  function writeProgressCookie(envelope) {
    try {
      var backup = {
        progressVersion: PROGRESS_VERSION,
        updatedAt: envelope.updatedAt,
        last: envelope.last || {},
        hash: progressHash(envelope)
      };
      document.cookie = PROGRESS_COOKIE_KEY + "=" + encodeURIComponent(JSON.stringify(backup)) + "; Max-Age=31536000; Path=/; SameSite=Lax";
    } catch (error) {
      return false;
    }
    return true;
  }

  function progressHash(envelope) {
    var source = [
      envelope.updatedAt || "",
      envelope.last && envelope.last.lessonId || "",
      envelope.last && envelope.last.unitId || "",
      envelope.stats && envelope.stats.attempts || 0
    ].join("|");
    var hash = 0;

    for (var index = 0; index < source.length; index += 1) {
      hash = ((hash << 5) - hash) + source.charCodeAt(index);
      hash |= 0;
    }

    return String(Math.abs(hash));
  }

  function openProgressDb() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) {
        reject(new Error("idb"));
        return;
      }

      var request = window.indexedDB.open(PROGRESS_DB_NAME, 1);
      request.onupgradeneeded = function () {
        var db = request.result;
        if (!db.objectStoreNames.contains(PROGRESS_STORE_NAME)) {
          db.createObjectStore(PROGRESS_STORE_NAME);
        }
      };
      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        reject(request.error || new Error("idb"));
      };
    });
  }

  function readIndexedProgress() {
    return openProgressDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var transaction = db.transaction(PROGRESS_STORE_NAME, "readonly");
        var store = transaction.objectStore(PROGRESS_STORE_NAME);
        var request = store.get(PROGRESS_RECORD_KEY);
        request.onsuccess = function () {
          db.close();
          resolve(request.result || null);
        };
        request.onerror = function () {
          db.close();
          reject(request.error || new Error("idb"));
        };
      });
    });
  }

  function writeIndexedProgress(envelope) {
    openProgressDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var transaction = db.transaction(PROGRESS_STORE_NAME, "readwrite");
        var store = transaction.objectStore(PROGRESS_STORE_NAME);
        var request = store.put(JSON.parse(JSON.stringify(envelope)), PROGRESS_RECORD_KEY);
        request.onsuccess = function () {
          db.close();
          resolve(true);
        };
        request.onerror = function () {
          db.close();
          reject(request.error || new Error("idb"));
        };
      });
    }).catch(function () {
      return false;
    });
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
      recordNavigation("home");
      renderHome();
    },
    unit: function () {
      window.LexiLandAudio.stopAudio();
      renderUnitMenu(position.lessonIndex);
    }
  };
}());
