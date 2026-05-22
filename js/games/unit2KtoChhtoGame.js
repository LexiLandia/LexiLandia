(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-unit-2-kto-chto-game";

  function renderUnit2KtoChhtoGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = loadState(game);
    var locked = false;

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
          '<div class="unit2-game-top">' +
            '<div class="unit2-game-mark" aria-hidden="true">❓</div>' +
            '<div>' +
              '<p class="unit2-game-label">' + helpers.escape(game.title) + '</p>' +
              '<h2 class="unit2-game-title">' + helpers.escape(stage.title) + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="unit2-game-progress" aria-hidden="true"><span style="width:' + Math.round((done / total) * 100) + '%"></span></div>' +
          '<p class="unit2-game-instruction">' + helpers.escape(stage.instruction) + '</p>' +
          renderTask(task, helpers) +
          '<div id="unit2-game-feedback" class="feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit2-game-nav">' +
          '<button class="secondary-button" type="button" data-unit2-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(task);
      bindAudio(task);
      maybePlay(task);
    }

    function renderTask(task, helpers) {
      return '<div class="unit2-game-task">' +
        renderVisual(task, helpers) +
        (task.question ? '<p class="unit2-game-question">' + helpers.escape(task.question) + '</p>' : "") +
        renderOptions(task.options || [], helpers, task.correct) +
      '</div>';
    }

    function renderVisual(task, helpers) {
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

    function bindTask(task) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-unit2-choice]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          checkAnswer(button.getAttribute("data-unit2-choice") === task.correct, button);
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

    function checkAnswer(isCorrect, button) {
      var feedback = root.querySelector("#unit2-game-feedback");
      locked = true;

      if (isCorrect) {
        state.correct += 1;
        button.classList.add("is-correct");
        feedback.className = "feedback good";
        var success = helpers.playFeedback("success");
        feedback.textContent = success.text || "✅ Отлично";
        saveState(game, state);
        helpers.afterFeedback(success, next);
        return;
      }

      state.mistakes += 1;
      button.classList.add("is-wrong");
      feedback.className = "feedback try";
      var retry = helpers.playFeedback("retry");
      feedback.textContent = retry.text || "❌ попробуй ещё";
      saveState(game, state);
      window.setTimeout(function () {
        locked = false;
        button.classList.remove("is-wrong");
        feedback.textContent = "";
      }, 920);
    }

    function next() {
      var stage = game.stages[state.stageIndex];
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

    function drawFinal() {
      var total = totalTasks(game);
      var percent = total ? state.correct / total : 0;
      var result = percent >= 0.9 ? "Отлично! ✅" : percent >= 0.6 ? "Хорошо! 👍" : "Попробуй ещё! 🔁";

      state.completed = true;
      saveState(game, state);

      root.innerHTML =
        '<section class="stage-card unit2-game-card unit2-game-final">' +
          '<div class="unit2-game-final-mark">✅</div>' +
          '<h2 class="unit2-game-title">' + result + '</h2>' +
          '<p class="unit2-game-big">Ты читаешь! 📖</p>' +
          '<div class="unit2-final-words">' +
            '<span>кто?</span><span>что?</span><span>где?</span><span>здесь</span><span>там</span>' +
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
      return window.LexiLandAudio.playAudio(task.audio, task.speechText || task.text || "", function () {
        var warning = root.querySelector("#audio-warning");
        if (warning) {
          warning.textContent = "Аудио скоро будет";
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
