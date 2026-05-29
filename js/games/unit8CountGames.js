(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-unit-8-count-game";
  var DIRS = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
  };
  var KEY_TO_DIR = {
    ArrowUp: "up",
    w: "up",
    W: "up",
    ArrowDown: "down",
    s: "down",
    S: "down",
    ArrowLeft: "left",
    a: "left",
    A: "left",
    ArrowRight: "right",
    d: "right",
    D: "right"
  };

  function renderUnit8CountGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = loadState(game);
    var locked = false;

    if (state.completed) {
      state = freshState(game);
      saveState(game, state);
    }

    draw(true);

    function draw(shouldPlay) {
      var tasks = getTasks(game);
      var task = tasks[state.taskIndex];
      var total = tasks.length || 1;

      root.innerHTML =
        '<section class="stage-card unit8-game-card">' +
          '<div class="unit8-game-top">' +
            '<div class="unit8-game-mark" aria-hidden="true">' + helpers.escape(game.icon || "🔢") + '</div>' +
            '<div>' +
              '<p class="unit8-game-label">' + helpers.escape(game.title || "Сколько?") + '</p>' +
              '<h2 class="unit8-game-title">' + helpers.escape(taskTitle(task)) + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="unit8-game-progress" aria-hidden="true"><span style="width:' + Math.round((state.taskIndex / total) * 100) + '%"></span></div>' +
          renderTask(task) +
          '<div id="unit8-feedback" class="feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit8-game-nav">' +
          '<button class="secondary-button" type="button" data-unit8-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(task);
      bindAudio(task);
      if (shouldPlay !== false) {
        maybePlay(task);
      }
    }

    function renderTask(task) {
      if (game.kind === "basket") {
        return renderBasketTask(task);
      }
      if (isMapGame()) {
        return renderMapTask(task);
      }
      if (isFindGame()) {
        return renderFindTask(task);
      }
      return renderChoiceTask(task);
    }

    function renderChoiceTask(task) {
      return '<div class="unit8-game-task">' +
        '<p class="unit8-game-prompt">' + helpers.escape(task.question || "Сколько?") + '</p>' +
        '<div class="unit8-group-wrap">' + renderGroup(task.visual, true) + '</div>' +
        renderOptions(task.options || [], task.correct) +
      '</div>';
    }

    function renderFindTask(task) {
      var items = shuffleAvoidFirst(task.items || [], task.correct);

      return '<div class="unit8-game-task">' +
        renderFindScene() +
        '<p class="unit8-game-prompt">' + helpers.escape(task.command || "Найди") + '</p>' +
        '<div class="unit8-find-grid">' +
          items.map(function (item) {
            return '<button class="unit8-find-item" type="button" data-unit8-choice="' + helpers.escape(item.id) + '">' +
              renderGroup(item, true) +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderFindScene() {
      if (game.kind === "shop-count") {
        return '<div class="unit8-shop-scene" aria-hidden="true"><span>🏪</span><span>🙂</span><span>🤲</span></div>';
      }
      if (game.kind === "cafe-order") {
        return '<div class="unit8-shop-scene" aria-hidden="true"><span>🏢☕</span><span>🙂</span><span>🤲</span></div>';
      }
      if (game.kind === "table-build") {
        return '<div class="unit8-shop-scene" aria-hidden="true"><span>🪑</span><span>🍽️</span><span>🙂</span></div>';
      }
      if (game.kind === "clothing-shop") {
        return '<div class="unit8-shop-scene" aria-hidden="true"><span>🏪</span><span>👕</span><span>🙂</span><span>🤲</span></div>';
      }
      if (game.kind === "clothing-build") {
        return '<div class="unit8-shop-scene" aria-hidden="true"><span>🙂</span><span>👕</span><span>🧢</span><span>🧥</span></div>';
      }
      if (game.kind === "clothing-find" || game.kind === "clothing-color-find") {
        return '<div class="unit8-shop-scene" aria-hidden="true"><span>👕</span><span>🧥</span><span>🧢</span><span>🧣</span></div>';
      }
      return "";
    }

    function renderBasketTask(task) {
      var items = shuffleAvoidFirst(game.items || [], task.item);

      return '<div class="unit8-game-task unit8-basket-task">' +
        '<p class="unit8-game-prompt">' + helpers.escape(task.command || "Положи") + '</p>' +
        '<div class="unit8-basket-box">' +
          '<div class="unit8-basket-icon" aria-hidden="true">🧺</div>' +
          '<div class="unit8-basket-counts">' +
            (game.items || []).map(function (item) {
              var count = getBasketCount(item.id);
              return '<span>' + helpers.escape(item.emoji) + ' × ' + count + '</span>';
            }).join("") +
          '</div>' +
        '</div>' +
        '<div class="unit8-basket-actions">' +
          items.map(function (item) {
            return '<button class="unit8-add-button" type="button" data-unit8-add="' + helpers.escape(item.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' +
              '<strong>+ ' + helpers.escape(item.text) + '</strong>' +
            '</button>';
          }).join("") +
        '</div>' +
        '<div class="button-row unit8-basket-buttons">' +
          '<button class="secondary-button" type="button" data-unit8-clear>↩ очистить</button>' +
          '<button class="primary-button" type="button" data-unit8-check>✅ готово</button>' +
        '</div>' +
      '</div>';
    }

    function renderMapTask(task) {
      return '<div class="unit8-game-task unit8-map-task">' +
        '<p class="unit8-game-prompt">' + helpers.escape(task.command || "Иди") + '</p>' +
        renderMap() +
        '<div class="unit8-map-controls">' +
          '<span></span>' +
          '<button class="control-button" type="button" data-unit8-dir="up">↑</button>' +
          '<span></span>' +
          '<button class="control-button" type="button" data-unit8-dir="left">←</button>' +
          '<button class="control-button ok" type="button" data-unit8-check>✅</button>' +
          '<button class="control-button" type="button" data-unit8-dir="right">→</button>' +
          '<span></span>' +
          '<button class="control-button" type="button" data-unit8-dir="down">↓</button>' +
          '<span></span>' +
        '</div>' +
      '</div>';
    }

    function renderOptions(items, correct) {
      var shuffled = shuffleAvoidFirst(items || [], correct);
      return '<div class="unit8-option-grid">' +
        shuffled.map(function (item) {
          return '<button class="unit2-game-option" type="button" data-unit8-choice="' + helpers.escape(item.id) + '">' +
            '<span class="unit2-option-emoji" aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
            '<span class="unit2-option-text">' + helpers.escape(item.text || "") + '</span>' +
          '</button>';
        }).join("") +
      '</div>';
    }

    function renderGroup(item, showText) {
      if (!item) {
        return "";
      }

      return '<span class="unit8-group-card' + (showText ? " with-text" : "") + '">' +
        '<span class="unit8-group-emojis" aria-hidden="true">' + renderRepeatedEmoji(item) + '</span>' +
        (showText && item.text ? '<strong>' + helpers.escape(item.text) + '</strong>' : "") +
      '</span>';
    }

    function renderRepeatedEmoji(item) {
      var count = Math.max(1, Math.min(Number(item.count) || 1, 8));
      var parts = [];
      for (var index = 0; index < count; index += 1) {
        parts.push(item.emoji || "");
      }
      return helpers.escape(parts.join(" "));
    }

    function renderMap() {
      var size = game.gridSize || 5;
      var cells = "";

      for (var y = 0; y < size; y += 1) {
        for (var x = 0; x < size; x += 1) {
          var item = objectAt(x, y);
          var isPlayer = state.player.x === x && state.player.y === y;
          cells += '<div class="unit8-map-cell">' +
            (item ? '<span class="unit8-map-object">' + renderGroup(item, false) + '</span>' : "") +
            (isPlayer ? '<span class="unit8-map-player">🙂</span>' : "") +
          '</div>';
        }
      }

      return '<div class="unit8-count-map" style="grid-template-columns: repeat(' + size + ', 1fr);">' + cells + '</div>';
    }

    function bindTask(task) {
      if (game.kind === "basket") {
        bindBasket(task);
        return;
      }
      if (isMapGame()) {
        bindMap(task);
        return;
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-unit8-choice]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          check(button.getAttribute("data-unit8-choice") === String(task.correct), button, task);
        });
      });
    }

    function bindBasket(task) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-unit8-add]"), function (button) {
        button.addEventListener("click", function () {
          var item = button.getAttribute("data-unit8-add");
          state.basket[item] = Math.min(9, getBasketCount(item) + 1);
          saveState(game, state);
          draw(false);
        });
      });

      var clearButton = root.querySelector("[data-unit8-clear]");
      var checkButton = root.querySelector("[data-unit8-check]");
      if (clearButton) {
        clearButton.addEventListener("click", function () {
          state.basket = {};
          saveState(game, state);
          draw(false);
        });
      }
      if (checkButton) {
        checkButton.addEventListener("click", function () {
          check(isBasketCorrect(task), checkButton, task);
        });
      }
    }

    function bindMap(task) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-unit8-dir]"), function (button) {
        button.addEventListener("click", function () {
          movePlayer(button.getAttribute("data-unit8-dir"));
        });
      });

      var checkButton = root.querySelector("[data-unit8-check]");
      if (checkButton) {
        checkButton.addEventListener("click", function () {
          var target = findObject(task.target);
          check(target && target.x === state.player.x && target.y === state.player.y, checkButton, task);
        });
      }

      root.tabIndex = 0;
      root.onkeydown = function (event) {
        var dir = KEY_TO_DIR[event.key];
        if (!dir) {
          return;
        }
        event.preventDefault();
        movePlayer(dir);
      };
      root.focus();
    }

    function movePlayer(direction) {
      var vector = DIRS[direction];
      var size = game.gridSize || 5;
      var next;

      if (locked || !vector) {
        return;
      }

      next = {
        x: state.player.x + vector.dx,
        y: state.player.y + vector.dy
      };

      if (next.x < 0 || next.y < 0 || next.x >= size || next.y >= size) {
        setFeedback("Стой! Край карты.", "try");
        return;
      }

      state.player = next;
      saveState(game, state);
      draw(false);
    }

    function bindAudio(task) {
      var button = root.querySelector('[data-unit8-action="listen"]');
      if (!button) {
        return;
      }
      button.addEventListener("click", function () {
        playTask(task);
      });
    }

    function check(isCorrect, button, task) {
      var feedback = root.querySelector("#unit8-feedback");
      var success;

      if (locked) {
        return;
      }

      locked = true;
      if (isCorrect) {
        state.correct += 1;
        if (button) {
          button.classList.add("is-correct");
        }
        feedback.className = "feedback good";
        success = helpers.playFeedback("success");
        feedback.textContent = task.correctFeedback || "Да! ✅";
        saveState(game, state);
        helpers.afterFeedback(success, next);
        return;
      }

      state.mistakes += 1;
      if (button) {
        button.classList.add("is-wrong");
      }
      feedback.className = "feedback try";
      feedback.textContent = task.wrongFeedback || (task.hint ? "Нет. " + task.hint : "Нет. Смотри ещё.");
      helpers.playFeedback("retry");
      saveState(game, state);
      window.setTimeout(function () {
        locked = false;
        if (button) {
          button.classList.remove("is-wrong");
        }
        feedback.textContent = "";
      }, 1100);
    }

    function next() {
      var tasks = getTasks(game);
      locked = false;
      root.onkeydown = null;

      if (state.taskIndex < tasks.length - 1) {
        state.taskIndex += 1;
        state.basket = {};
        if (isMapGame()) {
          state.player = clonePoint(game.start || { x: 0, y: 0 });
        }
        saveState(game, state);
        draw(true);
        return;
      }

      drawFinal();
    }

    function drawFinal() {
      state.completed = true;
      saveState(game, state);
      root.onkeydown = null;

      root.innerHTML =
        '<section class="stage-card unit8-game-card unit8-game-final">' +
          '<div class="unit8-final-mark" aria-hidden="true">🏆</div>' +
          '<h2 class="unit8-game-title">' + helpers.escape(game.finalTitle || "Отлично! ✅") + '</h2>' +
          '<p class="unit8-game-big">' + helpers.escape(game.finalText || "Сколько?") + '</p>' +
          '<div class="unit2-score-row"><span>✅ ' + state.correct + '</span><span>❌ ' + state.mistakes + '</span></div>' +
          '<div class="unit8-final-words">' +
            (game.finalWords || ["один", "два", "три"]).map(function (word) {
              return '<span>' + helpers.escape(word) + '</span>';
            }).join("") +
          '</div>' +
        '</section>' +
        '<div class="button-row unit8-game-nav">' +
          '<button class="secondary-button" type="button" data-unit8-restart>Ещё раз</button>' +
          '<button class="primary-button" type="button" data-unit8-done>✅ Готово</button>' +
        '</div>';

      root.querySelector("[data-unit8-restart]").addEventListener("click", function () {
        state = freshState(game);
        saveState(game, state);
        draw(true);
      });
      root.querySelector("[data-unit8-done]").addEventListener("click", options.onCorrect);
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        playTask(task);
      }, 150);
    }

    function playTask(task) {
      var warning = root.querySelector("#audio-warning");
      if (warning) {
        warning.textContent = "";
      }
      if (!task || !task.audio || !window.LexiLandAudio) {
        return Promise.resolve(false);
      }
      return window.LexiLandAudio.playAudio(task.audio, task.speechText || task.text || task.question || task.command || "", function () {
        if (warning) {
          warning.textContent = "Аудио скоро будет";
        }
      });
    }

    function setFeedback(text, kind) {
      var feedback = root.querySelector("#unit8-feedback");
      if (feedback) {
        feedback.className = "feedback " + (kind || "");
        feedback.textContent = text;
      }
    }

    function getBasketCount(id) {
      state.basket = state.basket || {};
      return Number(state.basket[id]) || 0;
    }

    function isBasketCorrect(task) {
      return (game.items || []).every(function (item) {
        var expected = item.id === task.item ? task.count : 0;
        return getBasketCount(item.id) === expected;
      });
    }

    function objectAt(x, y) {
      return (game.objects || []).filter(function (item) {
        return item.x === x && item.y === y;
      })[0];
    }

    function findObject(id) {
      return (game.objects || []).filter(function (item) {
        return item.id === id;
      })[0];
    }

    function taskTitle(task) {
      if (isFindGame()) {
        return game.findTitle || game.title || "Найди";
      }
      if (game.kind === "basket") {
        return "Корзина";
      }
      if (game.kind === "shop-count") {
        return "Магазин 2";
      }
      if (isMapGame()) {
        return game.mapTitle || "Карта количества";
      }
      if (game.kind === "many-few") {
        return "Много или мало";
      }
      return task && task.question ? task.question : (game.title || "Сколько?");
    }

    function isMapGame() {
      return game.kind === "count-map" || game.kind === "day-map" || game.kind === "cafe-map" || game.kind === "clothing-map";
    }

    function isFindGame() {
      return game.kind === "find-count" || game.kind === "shop-count" || game.kind === "cafe-order" || game.kind === "table-build" || game.kind === "clothing-find" || game.kind === "clothing-color-find" || game.kind === "clothing-shop" || game.kind === "clothing-build";
    }
  }

  function getTasks(game) {
    return (game.rounds || game.tasks || []).slice();
  }

  function freshState(game) {
    return {
      taskIndex: 0,
      correct: 0,
      mistakes: 0,
      completed: false,
      basket: {},
      player: clonePoint((game && game.start) || { x: 0, y: 0 })
    };
  }

  function clonePoint(point) {
    return {
      x: point.x,
      y: point.y
    };
  }

  function loadState(game) {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY + ":" + game.gameSlug) || "null");
      if (parsed && typeof parsed.taskIndex === "number") {
        parsed.basket = parsed.basket || {};
        parsed.player = parsed.player || clonePoint(game.start || { x: 0, y: 0 });
        return parsed;
      }
    } catch (error) {
      return freshState(game);
    }
    return freshState(game);
  }

  function saveState(game, state) {
    try {
      window.localStorage.setItem(STORAGE_KEY + ":" + game.gameSlug, JSON.stringify(state));
    } catch (error) {
      return;
    }
  }

  function shuffleAvoidFirst(items, correct) {
    var shuffled = (items || []).slice();

    for (var index = shuffled.length - 1; index > 0; index -= 1) {
      var target = Math.floor(Math.random() * (index + 1));
      var item = shuffled[index];
      shuffled[index] = shuffled[target];
      shuffled[target] = item;
    }

    if (shuffled.length > 1 && String(shuffled[0].id) === String(correct)) {
      var swapIndex = 1 + Math.floor(Math.random() * (shuffled.length - 1));
      var first = shuffled[0];
      shuffled[0] = shuffled[swapIndex];
      shuffled[swapIndex] = first;
    }

    return shuffled;
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderUnit8CountGame = renderUnit8CountGame;
}());
