(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-unit-2-kto-chto-game";

  function renderUnit2KtoChhtoGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = loadState(game);
    var locked = false;
    var selectedCells = [];

    if (state.completed) {
      state = freshState();
      saveState(game, state);
    }

    draw();

    function draw() {
      var stage = game.stages[state.stageIndex];
      var task = stage.tasks[state.taskIndex];
      var total = totalTasks(game);
      var done = completedCount(game, state.stageIndex, state.taskIndex);

      root.innerHTML =
        '<section class="stage-card unit2-game-card">' +
          renderDebugBadge(stage, task) +
          '<div class="unit2-game-top">' +
            '<div class="unit2-game-mark" aria-hidden="true">❓</div>' +
            '<div>' +
              '<p class="unit2-game-label">' + helpers.escape(game.title) + '</p>' +
              '<h2 class="unit2-game-title">' + helpers.escape(stage.title) + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="unit2-game-progress" aria-hidden="true"><span style="width:' + Math.round((done / total) * 100) + '%"></span></div>' +
          '<p class="unit2-game-instruction">' + helpers.escape(stage.instruction) + '</p>' +
          renderTask(stage, task, helpers) +
          '<div id="unit2-game-feedback" class="feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit2-game-nav">' +
          '<button class="secondary-button" type="button" data-unit2-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(stage, task);
      bindAudio(task);
      maybePlay(task);
    }

    function renderTask(stage, task, helpers) {
      if (stage.type === "select_many") {
        return '<div class="unit2-game-task">' +
          renderPairMap(task, helpers) +
          (task.question ? '<p class="unit2-game-question">' + helpers.escape(task.question) + '</p>' : "") +
          '<button class="primary-button unit2-pair-check" type="button" data-unit2-action="check">✅ проверить</button>' +
        '</div>';
      }

      return '<div class="unit2-game-task">' +
        renderVisual(task, helpers) +
        (task.question ? '<p class="unit2-game-question">' + helpers.escape(task.question) + '</p>' : "") +
        renderOptions(task.options || [], helpers, task.correct) +
      '</div>';
    }

    function renderDebugBadge(stage, task) {
      if (!helpers.debugBadge) {
        return "";
      }

      var visible = "р" + (state.stageIndex + 1) + "-з" + (state.taskIndex + 1);
      var source = [
        game.id || game.gameSlug || "",
        stage && stage.id || "",
        task && task.id || visible
      ].filter(Boolean).join(":");

      return helpers.debugBadge(visible, source, "game-debug-badge");
    }

    function renderVisual(task, helpers) {
      if (task.scene) {
        return '<div class="unit2-scene-visual">' +
          renderSceneZone("📍", task.scene.near || [], helpers) +
          renderSceneZone("👉", task.scene.far || [], helpers) +
        '</div>' +
        (task.text ? '<div class="unit2-scene-text">' +
          String(task.text).split("\n").map(function (line) {
            return '<p>' + helpers.escape(line) + '</p>';
          }).join("") +
        '</div>' : "");
      }

      if (task.visual) {
        return '<div class="unit2-game-visual" aria-hidden="true">' + helpers.escape(task.visual) + '</div>';
      }

      if (task.text) {
        return '<div class="unit2-game-text">' +
          String(task.text).split("\n").map(function (line) {
            return '<p>' + helpers.escape(line) + '</p>';
          }).join("") +
        '</div>';
      }

      return "";
    }

    function renderSceneZone(label, items, helpers) {
      return '<div class="unit2-scene-zone">' +
        '<strong aria-hidden="true">' + label + '</strong>' +
        '<div class="unit2-scene-items">' +
          items.map(function (item) {
            return '<span>' + helpers.escape(typeof item === "string" ? item : item.emoji || "") + '</span>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderPairMap(task, helpers) {
      var cells = shuffleOptions((task.cells || []).map(function (cell) {
        return {
          id: cell.id,
          text: cell.text || "",
          emoji: cell.emoji || ""
        };
      }), "");

      return '<div class="unit2-pair-map">' +
        cells.map(function (cell) {
          return '<button class="unit2-pair-cell" type="button" data-unit2-cell="' + helpers.escape(cell.id) + '">' +
            '<span aria-hidden="true">' + helpers.escape(cell.emoji) + '</span>' +
            (cell.text ? '<small>' + helpers.escape(cell.text) + '</small>' : "") +
          '</button>';
        }).join("") +
      '</div>';
    }

    function renderOptions(items, helpers, correct) {
      var shuffled = shuffleOptions(items || [], correct);

      return '<div class="unit2-game-options">' +
        shuffled.map(function (item) {
          return '<button class="unit2-game-option" type="button" data-unit2-choice="' + helpers.escape(item.id) + '">' +
            (item.emoji ? '<span class="unit2-option-emoji" aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' : "") +
            (item.text ? '<span class="unit2-option-text">' + helpers.escape(item.text) + '</span>' : "") +
          '</button>';
        }).join("") +
      '</div>';
    }

    function bindTask(stage, task) {
      if (stage.type === "select_many") {
        Array.prototype.forEach.call(root.querySelectorAll("[data-unit2-cell]"), function (button) {
          button.addEventListener("click", function () {
            if (locked) {
              return;
            }
            var cellId = button.getAttribute("data-unit2-cell");
            var selectedIndex = selectedCells.indexOf(cellId);

            if (selectedIndex !== -1) {
              selectedCells.splice(selectedIndex, 1);
              button.classList.remove("is-selected");
              return;
            }

            if (selectedCells.length >= (task.targetIds || []).length) {
              return;
            }

            selectedCells.push(cellId);
            button.classList.add("is-selected");
          });
        });

        root.querySelector('[data-unit2-action="check"]').addEventListener("click", function () {
          var targetIds = (task.targetIds || []).slice().sort();
          var answerIds = selectedCells.slice().sort();
          checkAnswer(sameValues(targetIds, answerIds), this, task, selectedCells.join("+"));
        });
        return;
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-unit2-choice]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          checkAnswer(button.getAttribute("data-unit2-choice") === task.correct, button, task);
        });
      });
    }

    function bindAudio(task) {
      var button = root.querySelector('[data-unit2-action="listen"]');
      if (!button) {
        return;
      }
      button.addEventListener("click", function () {
        playTask(task);
      });
    }

    function checkAnswer(isCorrect, button, task, selectedValue) {
      var feedback = root.querySelector("#unit2-game-feedback");
      locked = true;

      if (isCorrect) {
        if (helpers.recordAnswer) {
          helpers.recordAnswer(true, task, selectedValue || (button ? button.getAttribute("data-unit2-choice") : ""));
        }
        state.correct += 1;
        if (button) {
          button.classList.add("is-correct");
        }
        feedback.className = "feedback good";
        var success = helpers.playFeedback("success");
        feedback.textContent = task.correctFeedback || success.text || "✅ Отлично";
        saveState(game, state);
        helpers.afterFeedback(success, next);
        return;
      }

      if (helpers.recordAnswer) {
        helpers.recordAnswer(false, task, selectedValue || (button ? button.getAttribute("data-unit2-choice") : ""));
      }
      state.mistakes += 1;
      if (button) {
        button.classList.add("is-wrong");
      }
      feedback.className = "feedback try";
      var retry = helpers.playFeedback("retry");
      feedback.textContent = task.wrongFeedback || retry.text || "❌ попробуй ещё";
      saveState(game, state);
      window.setTimeout(function () {
        locked = false;
        selectedCells = [];
        Array.prototype.forEach.call(root.querySelectorAll(".unit2-pair-cell"), function (cell) {
          cell.classList.remove("is-selected");
        });
        if (button) {
          button.classList.remove("is-wrong");
        }
        feedback.textContent = "";
      }, 920);
    }

    function next() {
      var stage = game.stages[state.stageIndex];
      locked = false;
      selectedCells = [];

      if (state.taskIndex < stage.tasks.length - 1) {
        state.taskIndex += 1;
        saveState(game, state);
        draw();
        return;
      }

      if (state.stageIndex < game.stages.length - 1) {
        state.stageIndex += 1;
        state.taskIndex = 0;
        saveState(game, state);
        draw();
        return;
      }

      drawFinal();
    }

    function drawFinal() {
      var total = totalTasks(game);
      var percent = total ? state.correct / total : 0;
      var result = game.finalTitle || (percent >= 0.9 ? "Отлично! ✅" : percent >= 0.6 ? "Хорошо! 👍" : "Попробуй ещё! 🔁");
      var finalText = game.finalText || "Ты читаешь! 📖";
      var finalWords = game.finalWords || ["кто?", "что?", "где?", "здесь", "там"];

      state.completed = true;
      saveState(game, state);

      root.innerHTML =
        '<section class="stage-card unit2-game-card unit2-game-final">' +
          '<div class="unit2-game-final-mark">✅</div>' +
          '<h2 class="unit2-game-title">' + result + '</h2>' +
          '<p class="unit2-game-big">' + helpers.escape(finalText) + '</p>' +
          '<div class="unit2-final-words">' +
            finalWords.map(function (word) {
              return '<span>' + helpers.escape(word) + '</span>';
            }).join("") +
          '</div>' +
          '<div class="unit2-score-row">' +
            '<span>✅ ' + state.correct + '</span>' +
            '<span>❌ ' + state.mistakes + '</span>' +
          '</div>' +
        '</section>' +
        '<div class="button-row unit2-game-nav">' +
          '<button class="secondary-button" type="button" data-unit2-action="restart">ещё раз</button>' +
          '<button class="primary-button" type="button" data-unit2-action="done">✅ готово</button>' +
        '</div>';

      root.querySelector('[data-unit2-action="restart"]').addEventListener("click", function () {
        state = freshState();
        saveState(game, state);
        draw();
      });

      root.querySelector('[data-unit2-action="done"]').addEventListener("click", function () {
        options.onCorrect();
      });
    }

    function playTask(task) {
      if (!task.audio) {
        return Promise.resolve(false);
      }
      var warning = root.querySelector("#audio-warning");
      if (warning) {
        warning.textContent = "";
      }
      return window.LexiLandAudio.playAudio(task.audio, task.speechText || task.text || "", function (message) {
        if (warning) {
          warning.textContent = message || "Аудио скоро будет";
        }
      });
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        playTask(task);
      }, 140);
    }
  }

  function freshState() {
    return {
      stageIndex: 0,
      taskIndex: 0,
      correct: 0,
      mistakes: 0,
      completed: false
    };
  }

  function loadState(game) {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY + ":" + game.gameSlug) || "null");
      if (parsed && typeof parsed.stageIndex === "number" && typeof parsed.taskIndex === "number") {
        return parsed;
      }
    } catch (error) {
      return freshState();
    }
    return freshState();
  }

  function saveState(game, state) {
    try {
      window.localStorage.setItem(STORAGE_KEY + ":" + game.gameSlug, JSON.stringify(state));
    } catch (error) {
      return;
    }
  }

  function totalTasks(game) {
    return game.stages.reduce(function (sum, stage) {
      return sum + stage.tasks.length;
    }, 0);
  }

  function completedCount(game, stageIndex, taskIndex) {
    var count = 0;
    for (var index = 0; index < stageIndex; index += 1) {
      count += game.stages[index].tasks.length;
    }
    return count + taskIndex;
  }

  function sameValues(left, right) {
    if (left.length !== right.length) {
      return false;
    }
    return left.every(function (item, index) {
      return item === right[index];
    });
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

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderUnit2KtoChhtoGame = renderUnit2KtoChhtoGame;
}());
