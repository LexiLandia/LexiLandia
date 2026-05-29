(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-secret-picture-game";
  // Grid coordinates are zero-based: row 0 / col 0 is the top-left cell.
  // A command moves one cell at a time using these vectors.
  var DIRS = {
    up: { dr: -1, dc: 0, label: "⬆️" },
    down: { dr: 1, dc: 0, label: "⬇️" },
    left: { dr: 0, dc: -1, label: "⬅️" },
    right: { dr: 0, dc: 1, label: "➡️" }
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

  function renderSecretPictureGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = createState(game);
    var startedAt = Date.now();
    var locked = false;
    var lastAutoAudioKey = "";

    saveStats("started", {});
    draw();

    function createState(source) {
      var hasTraining = Boolean(source.training && source.training.commands && source.training.commands.length);
      var start = hasTraining ? source.training.start : ((source.levels && source.levels[0] && source.levels[0].start) || { row: 5, col: 2 });
      return {
        mode: hasTraining ? "training" : "picture",
        trainingIndex: 0,
        levelIndex: 0,
        commandIndex: 0,
        stepIndex: 0,
        mistakes: 0,
        completedPictures: [],
        questionAnswered: false,
        message: "",
        player: clonePoint(start),
        path: [clonePoint(start)]
      };
    }

    function draw() {
      var level = currentLevel();
      var command = currentCommand(level);
      var progressText = state.mode === "training"
        ? "Тренировка"
        : (state.levelIndex + 1) + " / " + (game.levels || []).length;

      root.innerHTML =
        '<section class="stage-card secret-picture-card">' +
          '<div class="secret-top">' +
            '<div class="secret-mark" aria-hidden="true">' + helpers.escape(state.mode === "training" ? "🧭" : "✏️") + '</div>' +
            '<div>' +
              '<p class="secret-label">' + helpers.escape(game.title || "Секретная картинка") + '</p>' +
              '<h2 class="secret-title">' + helpers.escape(state.mode === "training" ? "Тренировка" : level.hiddenTitle) + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="secret-progress">' + helpers.escape(progressText) + '</div>' +
          renderInstruction(command, helpers) +
          '<div id="secret-feedback" class="feedback ' + (state.message ? "try" : "") + '" aria-live="polite">' + helpers.escape(state.message) + '</div>' +
          renderGrid(level, helpers) +
          renderControls(helpers) +
        '</section>';

      bindControls(command);
      bindKeyboard(command);
      autoPlayCommand(command);
    }

    function currentLevel() {
      if (state.mode === "training") {
        return {
          id: "training",
          hiddenTitle: "Тренировка",
          gridSize: (game.training && game.training.gridSize) || 8,
          start: (game.training && game.training.start) || { row: 5, col: 2 },
          commands: (game.training && game.training.commands) || []
        };
      }
      return (game.levels || [])[state.levelIndex] || (game.levels || [])[0];
    }

    function currentCommand(level) {
      return level && level.commands ? level.commands[state.commandIndex] : null;
    }

    function renderInstruction(command, helpers) {
      if (!command) {
        return "";
      }

      var total = Number(command.steps) || 1;
      var done = Math.min(state.stepIndex, total);
      return '<div class="secret-command">' +
        '<span class="secret-command-label">Читай:</span>' +
        '<strong>' + helpers.escape(command.display || command.text) + '</strong>' +
        '<span class="secret-step">' + done + " / " + total + '</span>' +
      '</div>';
    }

    function renderGrid(level, helpers, reveal) {
      var size = Number(level.gridSize) || 8;
      var pathPoints = state.path.map(function (point) {
        return (point.col + 0.5) + "," + (point.row + 0.5);
      }).join(" ");
      var decorations = reveal ? (level.decorations || []) : [];
      var cells = "";

      for (var row = 0; row < size; row += 1) {
        for (var col = 0; col < size; col += 1) {
          var isStart = row === level.start.row && col === level.start.col;
          var isPlayer = row === state.player.row && col === state.player.col;
          var decoration = decorations.find(function (item) {
            return item.row === row && item.col === col;
          });
          var isTrail = state.path.some(function (point) {
            return point.row === row && point.col === col;
          });
          cells += '<div class="secret-cell' + (isStart ? " is-start" : "") + (isTrail ? " is-trail" : "") + '">' +
            (decoration ? '<span class="secret-cell-decoration">' + helpers.escape(decoration.emoji || "") + '</span>' : "") +
            (isStart ? '<span class="secret-start">●</span>' : "") +
            (isPlayer ? '<span class="secret-player">🙂</span>' : "") +
          '</div>';
        }
      }

      return '<div class="secret-grid-wrap">' +
        '<div class="secret-grid" style="grid-template-columns: repeat(' + size + ', 1fr);">' +
          cells +
          '<svg class="secret-line" viewBox="0 0 ' + size + " " + size + '" preserveAspectRatio="none" aria-hidden="true">' +
            '<polyline class="secret-line-halo" points="' + helpers.escape(pathPoints) + '"></polyline>' +
            '<polyline class="secret-line-main" points="' + helpers.escape(pathPoints) + '"></polyline>' +
          '</svg>' +
        '</div>' +
      '</div>';
    }

    function renderControls() {
      return '<div class="secret-controls">' +
        '<span></span>' +
        '<button class="control-button" type="button" data-secret-dir="up">↑</button>' +
        '<span></span>' +
        '<button class="control-button" type="button" data-secret-dir="left">←</button>' +
        '<button class="control-button ok" type="button" data-secret-action="listen">▶️</button>' +
        '<button class="control-button" type="button" data-secret-dir="right">→</button>' +
        '<span></span>' +
        '<button class="control-button" type="button" data-secret-dir="down">↓</button>' +
        '<span></span>' +
      '</div>';
    }

    function bindControls(command) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-secret-dir]"), function (button) {
        button.addEventListener("click", function () {
          handleDirection(button.getAttribute("data-secret-dir"), command);
        });
      });

      var listen = root.querySelector('[data-secret-action="listen"]');
      if (listen) {
        listen.addEventListener("click", function () {
          playCommand(command);
        });
      }
    }

    function bindKeyboard(command) {
      root.tabIndex = 0;
      root.onkeydown = function (event) {
        var dir = KEY_TO_DIR[event.key];
        if (!dir) {
          return;
        }
        event.preventDefault();
        handleDirection(dir, command);
      };
      root.focus();
    }

    function handleDirection(direction, command) {
      var level = currentLevel();
      var vector = DIRS[direction];
      var size = Number(level.gridSize) || 8;
      var next;

      if (locked || !command || !vector) {
        return;
      }

      if (direction !== command.dir) {
        state.mistakes += 1;
        state.message = choose(["Попробуй ещё раз 🙂", "Не туда 🙂", "Посмотри на стрелку " + DIRS[command.dir].label]);
        saveStats("mistake", { reason: "direction", levelId: level.id });
        drawSoft();
        return;
      }

      next = {
        row: state.player.row + vector.dr,
        col: state.player.col + vector.dc
      };

      if (next.row < 0 || next.col < 0 || next.row >= size || next.col >= size) {
        state.mistakes += 1;
        state.message = "Стой! Край карты.";
        saveStats("mistake", { reason: "edge", levelId: level.id });
        drawSoft();
        return;
      }

      state.player = next;
      state.path.push(clonePoint(next));
      state.stepIndex += 1;
      state.message = "";

      if (state.stepIndex >= (Number(command.steps) || 1)) {
        state.commandIndex += 1;
        state.stepIndex = 0;
      }

      if (state.commandIndex >= level.commands.length) {
        completeLevel(level);
        return;
      }

      drawSoft();
    }

    function drawSoft() {
      locked = true;
      window.setTimeout(function () {
        locked = false;
        draw();
      }, 120);
    }

    function completeLevel(level) {
      if (state.mode === "training") {
        renderTrainingDone();
        return;
      }
      if (state.completedPictures.indexOf(level.id) === -1) {
        state.completedPictures.push(level.id);
      }
      saveStats("level-completed", {
        levelId: level.id,
        mistakes: state.mistakes,
        timeSpentMs: Date.now() - startedAt
      });
      renderReveal(level);
    }

    function renderTrainingDone() {
      root.onkeydown = null;
      root.innerHTML =
        '<section class="stage-card secret-picture-card secret-reveal-card">' +
          '<div class="secret-reveal-emoji" aria-hidden="true">✅</div>' +
          '<h2 class="secret-title">Тренировка готова!</h2>' +
          '<p class="secret-reveal-text">Теперь картинка.</p>' +
          renderGrid(currentLevel(), helpers, true) +
          '<button class="primary-button secret-wide-button" type="button" data-secret-next>Секретная картинка</button>' +
        '</section>';

      root.querySelector("[data-secret-next]").addEventListener("click", function () {
        state.mode = "picture";
        state.levelIndex = 0;
        resetLevel((game.levels || [])[0]);
        draw();
      });
    }

    function renderReveal(level) {
      var question = level.finalQuestion;
      root.onkeydown = null;
      root.innerHTML =
        '<section class="stage-card secret-picture-card secret-reveal-card">' +
          '<div class="secret-reveal-emoji" aria-hidden="true">' + helpers.escape(level.emoji || "✨") + '</div>' +
          '<h2 class="secret-title">Ого! ' + helpers.escape(level.revealText || "Готово!") + ' ' + helpers.escape(level.emoji || "") + '</h2>' +
          '<p class="secret-reveal-text">' + helpers.escape(level.hiddenTitle) + '</p>' +
          renderGrid(level, helpers, true) +
          (question ? renderQuestion(question, helpers) : "") +
          '<div class="secret-reveal-actions">' +
            '<button class="secondary-button" type="button" data-secret-repeat>Ещё раз</button>' +
            '<button class="primary-button" type="button" data-secret-next>' + helpers.escape(nextLevelLabel()) + '</button>' +
          '</div>' +
        '</section>';

      bindQuestion(question);
      root.querySelector("[data-secret-repeat]").addEventListener("click", function () {
        resetLevel(level);
        draw();
      });
      root.querySelector("[data-secret-next]").addEventListener("click", function () {
        if (state.levelIndex >= (game.levels || []).length - 1) {
          renderGameDone();
          return;
        }
        state.levelIndex += 1;
        resetLevel((game.levels || [])[state.levelIndex]);
        draw();
      });
    }

    function renderQuestion(question, helpers) {
      var options = shuffleOptions(question.options || [], question.correct);
      return '<div class="secret-question">' +
        '<p>' + helpers.escape(question.text || "Что это?") + '</p>' +
        '<div class="secret-question-options">' +
          options.map(function (item) {
            return '<button class="unit2-game-option" type="button" data-secret-answer="' + helpers.escape(item.id) + '">' +
              '<span class="unit2-option-emoji">' + helpers.escape(item.emoji || "") + '</span>' +
              '<span class="unit2-option-text">' + helpers.escape(item.text || "") + '</span>' +
            '</button>';
          }).join("") +
        '</div>' +
        '<div class="secret-question-feedback" aria-live="polite"></div>' +
      '</div>';
    }

    function bindQuestion(question) {
      if (!question) {
        return;
      }
      Array.prototype.forEach.call(root.querySelectorAll("[data-secret-answer]"), function (button) {
        button.addEventListener("click", function () {
          var feedback = root.querySelector(".secret-question-feedback");
          var selected = button.getAttribute("data-secret-answer");

          Array.prototype.forEach.call(root.querySelectorAll("[data-secret-answer]"), function (item) {
            item.classList.remove("is-correct", "is-wrong");
          });

          if (selected === question.correct) {
            button.classList.add("is-correct");
            state.questionAnswered = true;
            feedback.className = "secret-question-feedback good";
            feedback.textContent = "Да! ✅";
            return;
          }

          button.classList.add("is-wrong");
          feedback.className = "secret-question-feedback try";
          feedback.textContent = "Посмотри ещё 🙂";
        });
      });
    }

    function renderGameDone() {
      root.onkeydown = null;
      saveStats("game-completed", {
        mistakes: state.mistakes,
        timeSpentMs: Date.now() - startedAt,
        completedPictures: state.completedPictures.slice()
      });
      root.innerHTML =
        '<section class="stage-card secret-picture-card secret-reveal-card">' +
          '<div class="secret-reveal-emoji" aria-hidden="true">🏆</div>' +
          '<h2 class="secret-title">Все картинки готовы!</h2>' +
          '<p class="secret-reveal-text">Ты читаешь маршрут.</p>' +
          '<div class="secret-final-words">' +
            '<span>дом 🏠</span><span>дерево 🌳</span><span>рыба 🐟</span><span>кот 🐱</span><span>солнце ☀️</span>' +
          '</div>' +
          '<button class="primary-button secret-wide-button" type="button" data-secret-done>✅ Готово</button>' +
        '</section>';

      root.querySelector("[data-secret-done]").addEventListener("click", options.onCorrect);
    }

    function nextLevelLabel() {
      return state.levelIndex >= (game.levels || []).length - 1 ? "✅ Готово" : "Следующая картинка";
    }

    function resetLevel(level) {
      state.commandIndex = 0;
      state.stepIndex = 0;
      state.questionAnswered = false;
      state.message = "";
      state.player = clonePoint(level.start);
      state.path = [clonePoint(level.start)];
      lastAutoAudioKey = "";
    }

    function autoPlayCommand(command) {
      var level = currentLevel();
      var key = [state.mode, level && level.id, state.commandIndex].join(":");

      if (key === lastAutoAudioKey) {
        return;
      }

      lastAutoAudioKey = key;
      playCommand(command);
    }

    function playCommand(command) {
      if (!command || !command.audio || !window.LexiLandAudio) {
        return;
      }
      window.LexiLandAudio.playAudio(command.audio, command.display || command.text, function () {});
    }

    function saveStats(eventName, payload) {
      try {
        var stats = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
        var gameStats = stats[game.gameSlug] || {
          started: 0,
          completed: 0,
          completedPictures: [],
          mistakes: 0,
          timeSpentMs: 0,
          events: []
        };
        var event = {
          event: eventName,
          at: new Date().toISOString(),
          payload: payload || {}
        };

        if (eventName === "started") {
          gameStats.started += 1;
        }
        if (eventName === "mistake") {
          gameStats.mistakes += 1;
        }
        if (eventName === "level-completed" && payload && payload.levelId && gameStats.completedPictures.indexOf(payload.levelId) === -1) {
          gameStats.completedPictures.push(payload.levelId);
        }
        if (eventName === "game-completed") {
          gameStats.completed += 1;
          gameStats.timeSpentMs += payload.timeSpentMs || 0;
        }

        gameStats.events = gameStats.events.concat([event]).slice(-30);
        stats[game.gameSlug] = gameStats;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
      } catch (error) {
        return;
      }
    }
  }

  function clonePoint(point) {
    return {
      row: point.row,
      col: point.col
    };
  }

  function shuffleOptions(items, correct) {
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

  function choose(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderSecretPictureGame = renderSecretPictureGame;
}());
