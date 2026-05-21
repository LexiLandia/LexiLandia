(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-lesson-3-reading-game";

  function renderReadingFindGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = loadState(game);
    var selectedTiles = [];
    var selectedTileIndexes = [];
    var locked = false;

    function draw(shouldPlay) {
      var stage = game.stages[state.stageIndex];
      var task = stage.tasks[state.taskIndex];
      var total = totalTasks(game);
      var done = completedCount(game, state.stageIndex, state.taskIndex);

      root.innerHTML =
        '<section class="stage-card reading-find-card">' +
          '<div class="reading-game-top">' +
            '<span class="reading-game-kid" aria-hidden="true">🙂</span>' +
            '<div>' +
              '<p class="reading-game-label">' + helpers.escape(game.title) + '</p>' +
              '<h2 class="reading-game-title">' + helpers.escape(stage.title) + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="reading-game-progress" aria-hidden="true"><span style="width:' + Math.round((done / total) * 100) + '%"></span></div>' +
          '<p class="reading-game-instruction">' + helpers.escape(stage.instruction) + '</p>' +
          renderTask(stage, task, helpers) +
          '<div id="reading-game-feedback" class="feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row reading-game-nav">' +
          '<button class="secondary-button" type="button" data-reading-action="listen">🔊</button>' +
          '<button class="secondary-button" type="button" data-reading-action="clear"' + (stage.type === "build_word" ? "" : " hidden") + '>↩ очистить</button>' +
        '</div>';

      bindTask(stage, task);
      bindCommon(task);
      if (shouldPlay !== false) {
        maybePlay(task);
      }
    }

    function drawFinal() {
      var total = totalTasks(game);
      var percent = total ? state.correct / total : 0;
      var result = percent >= 0.9 ? "Отлично! ✅" : percent >= 0.6 ? "Хорошо! 👍" : "Попробуй ещё! 🔁";

      state.completed = true;
      saveState(game, state);

      root.innerHTML =
        '<section class="stage-card reading-find-card reading-find-final">' +
          '<div class="reading-game-final-mark">✅</div>' +
          '<h2 class="reading-game-title">' + result + '</h2>' +
          '<p class="reading-game-big">Ты читаешь! 📖</p>' +
          '<div class="reading-final-words" aria-label="слова">' +
            '<span>мама</span><span>дом</span><span>там</span><span>он</span><span>она</span>' +
          '</div>' +
          '<div class="reading-score-row">' +
            '<span>✅ ' + state.correct + '</span>' +
            '<span>❌ ' + state.mistakes + '</span>' +
          '</div>' +
        '</section>' +
        '<div class="button-row reading-game-nav">' +
          '<button class="secondary-button" type="button" data-reading-action="restart">ещё раз</button>' +
          '<button class="primary-button" type="button" data-reading-action="done">✅ готово</button>' +
        '</div>';

      root.querySelector('[data-reading-action="restart"]').addEventListener("click", function () {
        state = freshState();
        selectedTiles = [];
        selectedTileIndexes = [];
        saveState(game, state);
        draw();
      });

      root.querySelector('[data-reading-action="done"]').addEventListener("click", function () {
        options.onCorrect();
      });
    }

    function renderTask(stage, task, helpers) {
      if (stage.type === "choose_text") {
        return renderAudioPrompt(helpers) + renderOptions(task.options, "text", helpers);
      }

      if (stage.type === "build_word") {
        return renderAudioPrompt(helpers) +
          '<div class="reading-build-row" aria-live="polite">' + (selectedTiles.length ? selectedTiles.map(helpers.escape).join(" + ") : "…") + '</div>' +
          '<div class="reading-tile-grid">' +
            task.tiles.map(function (tile, index) {
              return '<button class="reading-choice reading-tile" type="button" data-tile-index="' + index + '"' + (selectedTileIndexes.indexOf(index) !== -1 ? " disabled" : "") + '>' + helpers.escape(tile) + '</button>';
            }).join("") +
          '</div>' +
          '<button class="primary-button reading-check-button" type="button" data-reading-action="check">✅ проверить</button>';
      }

      if (stage.type === "word_to_image") {
        return renderAudioPrompt(helpers) + renderOptions(task.options, "emoji", helpers);
      }

      if (stage.type === "image_to_word") {
        return renderAudioPrompt(helpers) + renderOptions(task.options, "text", helpers);
      }

      return renderAudioPrompt(helpers) +
        '<p class="reading-question">' + helpers.escape(task.question || "") + '</p>' +
        renderOptions(task.options, "text", helpers);
    }

    function renderAudioPrompt(helpers) {
      return '<button class="reading-audio-prompt" type="button" data-reading-action="listen" aria-label="Слушать">' +
        '<span class="reading-audio-pulse" aria-hidden="true">🔊</span>' +
        '<strong>Слушай</strong>' +
      '</button>';
    }

    function renderTarget(text, emoji, helpers, emojiOnly) {
      return '<div class="reading-target-card">' +
        (emoji || emojiOnly ? '<span class="reading-target-emoji" aria-hidden="true">' + helpers.escape(emoji || text) + '</span>' : "") +
        (emojiOnly ? "" : '<strong>' + helpers.escape(text) + '</strong>') +
      '</div>';
    }

    function renderOptions(options, kind, helpers) {
      return '<div class="reading-choice-grid">' +
        options.map(function (item) {
          return '<button class="reading-choice ' + (kind === "emoji" ? "emoji-choice" : "") + '" type="button" data-choice="' + helpers.escape(item) + '">' +
            helpers.escape(item) +
          '</button>';
        }).join("") +
      '</div>';
    }

    function bindTask(stage, task) {
      if (stage.type === "build_word") {
        Array.prototype.forEach.call(root.querySelectorAll("[data-tile-index]"), function (button) {
          button.addEventListener("click", function () {
            if (locked) {
              return;
            }
            var tileIndex = Number(button.getAttribute("data-tile-index"));
            selectedTiles.push(task.tiles[tileIndex]);
            selectedTileIndexes.push(tileIndex);
            button.disabled = true;
            root.querySelector(".reading-build-row").textContent = selectedTiles.join(" + ");
          });
        });

        root.querySelector('[data-reading-action="check"]').addEventListener("click", function () {
          checkAnswer(arraysEqual(selectedTiles, task.correct));
        });
        return;
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-choice]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          var selected = button.getAttribute("data-choice");
          checkAnswer(selected === task.correct, button);
        });
      });
    }

    function bindCommon(task) {
      Array.prototype.forEach.call(root.querySelectorAll('[data-reading-action="listen"]'), function (listenButton) {
        listenButton.addEventListener("click", function () {
          playTask(task);
        });
      });

      var clearButton = root.querySelector('[data-reading-action="clear"]');
      if (clearButton) {
        clearButton.addEventListener("click", function () {
          selectedTiles = [];
          selectedTileIndexes = [];
          draw(false);
        });
      }
    }

    function checkAnswer(isCorrect, button) {
      var feedback = root.querySelector("#reading-game-feedback");
      locked = true;

      if (isCorrect) {
        state.correct += 1;
        feedback.className = "feedback good";
        feedback.textContent = "✅ отлично";
        if (button) {
          button.classList.add("is-correct");
        }
        saveState(game, state);
        window.setTimeout(next, 620);
        return;
      }

      state.mistakes += 1;
      feedback.className = "feedback try";
      feedback.textContent = "❌ попробуй ещё";
      if (button) {
        button.classList.add("is-wrong");
      }
      saveState(game, state);
      window.setTimeout(function () {
        locked = false;
        feedback.textContent = "";
        if (button) {
          button.classList.remove("is-wrong");
        }
      }, 720);
    }

    function next() {
      var stage = game.stages[state.stageIndex];
      selectedTiles = [];
      selectedTileIndexes = [];
      locked = false;

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

    function playTask(task) {
      if (!task.audio) {
        return Promise.resolve(false);
      }
      return window.LexiLandAudio.playAudio(task.audio, task.text || task.target || "", function () {
        var warning = root.querySelector("#audio-warning");
        if (warning) {
          warning.textContent = "Аудио скоро будет";
        }
      });
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        playTask(task);
      }, 120);
    }

    if (state.completed) {
      state = freshState();
      saveState(game, state);
    }

    draw();
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

  function arraysEqual(left, right) {
    if (left.length !== right.length) {
      return false;
    }
    for (var index = 0; index < left.length; index += 1) {
      if (left[index] !== right[index]) {
        return false;
      }
    }
    return true;
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderReadingFindGame = renderReadingFindGame;
}());
