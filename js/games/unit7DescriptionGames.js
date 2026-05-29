(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-unit-7-description-game";
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

  function renderUnit7DescriptionGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = loadState(game);
    var locked = false;

    if (state.completed) {
      state = freshState(game);
      saveState(game, state);
    }

    draw();

    function draw() {
      var tasks = getTasks(game);
      var task = tasks[state.taskIndex];
      var total = tasks.length || 1;

      root.innerHTML =
        '<section class="stage-card unit7-game-card">' +
          '<div class="unit7-game-top">' +
            '<div class="unit7-game-mark" aria-hidden="true">' + helpers.escape(game.icon || "🎨") + '</div>' +
            '<div>' +
              '<p class="unit7-game-label">' + helpers.escape(game.title || "Какой?") + '</p>' +
              '<h2 class="unit7-game-title">' + helpers.escape(taskTitle(task)) + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="unit7-game-progress" aria-hidden="true"><span style="width:' + Math.round((state.taskIndex / total) * 100) + '%"></span></div>' +
          renderTask(task) +
          '<div id="unit7-feedback" class="feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit7-game-nav">' +
          '<button class="secondary-button" type="button" data-unit7-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(task);
      bindAudio(task);
      maybePlay(task);
    }

    function renderTask(task) {
      if (game.kind === "find-color") {
        return renderFindColorTask(task);
      }

      if (game.kind === "color-map") {
        return renderColorMapTask(task);
      }

      if (game.kind === "change") {
        return renderChangeTask(task);
      }

      return renderSizeTask(task);
    }

    function renderSizeTask(task) {
      return '<div class="unit7-game-task">' +
        '<p class="unit7-game-prompt">' + helpers.escape(task.prompt || "Какой?") + '</p>' +
        '<div class="unit7-game-object-wrap">' + renderObject(task.visual, true) + '</div>' +
        renderOptions(task.options || [], task.correct) +
      '</div>';
    }

    function renderChangeTask(task) {
      return '<div class="unit7-game-task">' +
        '<p class="unit7-game-prompt">' + helpers.escape(task.command || "Что изменилось?") + '</p>' +
        '<div class="unit7-change-scenes">' +
          renderChangeScene(task.beforeLabel || "было", task.before || []) +
          '<div class="unit7-change-arrow" aria-hidden="true">→</div>' +
          renderChangeScene(task.afterLabel || "стало", task.after || []) +
        '</div>' +
        renderOptions(task.options || [], task.correct) +
      '</div>';
    }

    function renderChangeScene(label, items) {
      return '<div class="unit7-change-scene">' +
        '<span class="unit7-change-label">' + helpers.escape(label) + '</span>' +
        '<div class="unit7-change-objects">' +
          items.map(function (item) {
            return renderObject(item, false);
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderFindColorTask(task) {
      var items = shuffleAvoidFirst(task.items || [], task.correct);
      return '<div class="unit7-game-task">' +
        '<p class="unit7-game-prompt">' + helpers.escape(task.command || "Найди") + '</p>' +
        '<div class="unit7-find-grid">' +
          items.map(function (item) {
            return '<button class="unit7-find-item" type="button" data-unit7-choice="' + helpers.escape(item.id) + '">' +
              renderObject(item, false) +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderColorMapTask(task) {
      return '<div class="unit7-game-task unit7-map-task">' +
        '<p class="unit7-game-prompt">' + helpers.escape(task.command || "Иди") + '</p>' +
        renderMap() +
        '<div class="unit7-map-controls">' +
          '<span></span>' +
          '<button class="control-button" type="button" data-unit7-dir="up">↑</button>' +
          '<span></span>' +
          '<button class="control-button" type="button" data-unit7-dir="left">←</button>' +
          '<button class="control-button ok" type="button" data-unit7-check>✅</button>' +
          '<button class="control-button" type="button" data-unit7-dir="right">→</button>' +
          '<span></span>' +
          '<button class="control-button" type="button" data-unit7-dir="down">↓</button>' +
          '<span></span>' +
        '</div>' +
      '</div>';
    }

    function renderOptions(items, correct) {
      var shuffled = shuffleAvoidFirst(items || [], correct);
      return '<div class="unit7-option-grid">' +
        shuffled.map(function (item) {
          return '<button class="unit2-game-option" type="button" data-unit7-choice="' + helpers.escape(item.id) + '">' +
            '<span class="unit2-option-emoji" aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
            '<span class="unit2-option-text">' + helpers.escape(item.text || "") + '</span>' +
          '</button>';
        }).join("") +
      '</div>';
    }

    function renderMap() {
      var size = game.gridSize || 5;
      var cells = "";

      for (var y = 0; y < size; y += 1) {
        for (var x = 0; x < size; x += 1) {
          var item = objectAt(x, y);
          var isPlayer = state.player.x === x && state.player.y === y;
          cells += '<div class="unit7-map-cell">' +
            (item ? '<span class="unit7-map-object">' + renderObject(item, false) + '</span>' : "") +
            (isPlayer ? '<span class="unit7-map-player">🙂</span>' : "") +
          '</div>';
        }
      }

      return '<div class="unit7-color-map" style="grid-template-columns: repeat(' + size + ', 1fr);">' + cells + '</div>';
    }

    function renderObject(item, showText) {
      if (!item) {
        return "";
      }

      return '<span class="unit7-object-card' + (showText ? " with-text" : "") + '">' +
        '<span class="unit7-object unit7-kind-' + helpers.escape(item.kind || "thing") + ' unit7-color-' + helpers.escape(item.color || "none") + ' is-' + helpers.escape(item.size || "normal") + '">' +
          '<span aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
        '</span>' +
        (showText && item.text ? '<strong>' + helpers.escape(item.text) + '</strong>' : "") +
      '</span>';
    }

    function bindTask(task) {
      if (game.kind === "color-map") {
        bindMap(task);
        return;
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-unit7-choice]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          check(button.getAttribute("data-unit7-choice") === task.correct, button, task);
        });
      });
    }

    function bindMap(task) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-unit7-dir]"), function (button) {
        button.addEventListener("click", function () {
          movePlayer(button.getAttribute("data-unit7-dir"));
        });
      });

      var checkButton = root.querySelector("[data-unit7-check]");
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
      draw();
    }

    function bindAudio(task) {
      var button = root.querySelector('[data-unit7-action="listen"]');
      if (!button) {
        return;
      }
      button.addEventListener("click", function () {
        playTask(task);
      });
    }

    function check(isCorrect, button, task) {
      var feedback = root.querySelector("#unit7-feedback");

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
        var success = helpers.playFeedback("success");
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
      feedback.textContent = task.wrongFeedback || (task.hint ? "Смотри: " + task.hint : "Попробуй ещё раз 🙂");
      helpers.playFeedback("retry");
      saveState(game, state);
      window.setTimeout(function () {
        locked = false;
        if (button) {
          button.classList.remove("is-wrong");
        }
        feedback.textContent = "";
      }, 980);
    }

    function next() {
      var tasks = getTasks(game);
      locked = false;
      root.onkeydown = null;

      if (state.taskIndex < tasks.length - 1) {
        state.taskIndex += 1;
        if (game.kind === "color-map") {
          state.player = clonePoint(game.start || { x: 0, y: 0 });
        }
        saveState(game, state);
        draw();
        return;
      }

      drawFinal();
    }

    function drawFinal() {
      state.completed = true;
      saveState(game, state);
      root.onkeydown = null;

      root.innerHTML =
        '<section class="stage-card unit7-game-card unit7-game-final">' +
          '<div class="unit7-final-mark" aria-hidden="true">🏆</div>' +
          '<h2 class="unit7-game-title">' + helpers.escape(game.finalTitle || "Отлично! ✅") + '</h2>' +
          '<p class="unit7-game-big">' + helpers.escape(game.finalText || "Какой?") + '</p>' +
          '<div class="unit2-score-row"><span>✅ ' + state.correct + '</span><span>❌ ' + state.mistakes + '</span></div>' +
          '<div class="unit7-final-words">' +
            (game.finalWords || ["какой?", "большой", "маленький", "красный"]).map(function (word) {
              return '<span>' + helpers.escape(word) + '</span>';
            }).join("") +
          '</div>' +
        '</section>' +
        '<div class="button-row unit7-game-nav">' +
          '<button class="secondary-button" type="button" data-unit7-restart>Ещё раз</button>' +
          '<button class="primary-button" type="button" data-unit7-done>✅ Готово</button>' +
        '</div>';

      root.querySelector("[data-unit7-restart]").addEventListener("click", function () {
        state = freshState(game);
        saveState(game, state);
        draw();
      });
      root.querySelector("[data-unit7-done]").addEventListener("click", options.onCorrect);
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        playTask(task);
      }, 140);
    }

    function playTask(task) {
      if (!task || !task.audio || !window.LexiLandAudio) {
        return Promise.resolve(false);
      }
      return window.LexiLandAudio.playAudio(task.audio, task.speechText || task.text || task.prompt || task.command || "", function () {
        var warning = root.querySelector("#audio-warning");
        if (warning) {
          warning.textContent = "Аудио скоро будет";
        }
      });
    }

    function setFeedback(text, kind) {
      var feedback = root.querySelector("#unit7-feedback");
      if (feedback) {
        feedback.className = "feedback " + (kind || "");
        feedback.textContent = text;
      }
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
      if (game.kind === "find-color") {
        return "Найди цвет";
      }
      if (game.kind === "color-map") {
        return "Цветная карта";
      }
      if (game.kind === "phrase") {
        return "Собери фразу";
      }
      if (game.kind === "change") {
        return "Что изменилось?";
      }
      return task && task.prompt ? task.prompt : (game.title || "Какой?");
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
        if (!parsed.player) {
          parsed.player = clonePoint(game.start || { x: 0, y: 0 });
        }
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
  window.LexiLandGames.renderUnit7DescriptionGame = renderUnit7DescriptionGame;
}());
