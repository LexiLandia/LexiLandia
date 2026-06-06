(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-world-mission-game";
  var freezeTimer = null;

  function renderWorldMissionGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var state = loadState(game);
    var locked = false;
    var selected = {};
    var selectedTiles = [];

    if (state.completed) {
      state = freshState();
      saveState(game, state);
    }

    draw(true);

    function draw(shouldPlay) {
      clearFreezeTimer();

      if (state.finished) {
        renderFinal();
        return;
      }

      selected = {};
      selectedTiles = [];
      locked = false;

      var stage = getStage();
      var task = getTask();
      var total = totalTasks(game);
      var done = completedCount();

      root.innerHTML =
        '<section class="stage-card world-game-card">' +
          renderDebugBadge(stage, task) +
          '<div class="world-game-top">' +
            '<div class="world-game-mark" aria-hidden="true">' + helpers.escape(game.icon || "🎮") + '</div>' +
            '<div>' +
              '<p class="world-game-label">' + helpers.escape(game.title || stage.title || "Игра") + '</p>' +
              '<h2 class="world-game-title">' + helpers.escape(stage.title || game.title || "Игра") + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="world-game-progress" aria-hidden="true"><span style="width:' + Math.round((done / Math.max(total, 1)) * 100) + '%"></span></div>' +
          '<p class="world-game-instruction">' + helpers.escape(task.command || task.question || stage.instruction || "Найди:") + '</p>' +
          renderTask(stage, task) +
          '<div id="world-game-feedback" class="feedback world-game-feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row world-game-nav">' +
          '<button class="secondary-button" type="button" data-world-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(stage, task);
      bindAudio(task);

      if (stage.type === "freeze") {
        startFreeze(task);
      }

      if (shouldPlay !== false) {
        maybePlay(task);
      }
    }

    function renderTask(stage, task) {
      if (stage.type === "freeze") {
        return renderFreeze(task);
      }
      if (stage.type === "director") {
        return renderDirector(task);
      }
      if (stage.type === "movie") {
        return renderMovie(task);
      }
      if (stage.type === "shop" || stage.type === "fast_orders") {
        return renderShop(task, stage.type === "fast_orders");
      }
      if (stage.type === "dialogue") {
        return renderDialogue(task);
      }
      if (stage.type === "build_phrase") {
        return renderBuildPhrase(task);
      }
      if (stage.type === "backpack") {
        return renderBackpack(task);
      }
      if (stage.type === "missing") {
        return renderMissing(task);
      }
      return renderSceneTap(task, stage.type === "stealth");
    }

    function renderSceneTap(task, stealth) {
      return '<div class="world-game-task">' +
        (task.sceneTitle ? '<p class="world-scene-title">' + helpers.escape(task.sceneTitle) + '</p>' : "") +
        '<div class="world-scene-grid' + (stealth ? " stealth-scene" : "") + '">' +
          (task.items || []).map(function (item) {
            return '<button class="world-scene-cell" type="button" data-world-target="' + helpers.escape(item.id) + '">' +
              '<span class="world-scene-emoji" aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
              (item.label ? '<span class="world-scene-label">' + helpers.escape(item.label) + '</span>' : "") +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderFreeze(task) {
      var current = getFreezeState(task);
      return '<div class="world-game-task world-freeze-task">' +
        '<button class="world-freeze-cell" type="button" data-world-freeze>' +
          '<span class="world-freeze-emoji" aria-hidden="true">' + helpers.escape(current.emoji || "") + '</span>' +
          '<span class="world-freeze-text">' + helpers.escape(current.text || "") + '</span>' +
        '</button>' +
        '<p class="world-soft-hint">🎬</p>' +
      '</div>';
    }

    function renderDirector(task) {
      return '<div class="world-game-task world-director-task">' +
        '<div class="world-director-scene" aria-live="polite">' +
          '<span class="world-director-placeholder">' + helpers.escape(task.resultEmoji || "🎬") + '</span>' +
        '</div>' +
        (task.groups || []).map(function (group) {
          return '<div class="world-builder-row">' +
            '<p>' + helpers.escape(group.title || "") + '</p>' +
            '<div class="world-tile-grid">' +
              shuffleObjects(group.options || [], task.correct && task.correct[group.key]).map(function (item) {
                return '<button class="world-tile-button" type="button" data-world-group="' + helpers.escape(group.key) + '" data-world-choice="' + helpers.escape(item.id) + '">' +
                  '<span aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
                  '<strong>' + helpers.escape(item.text || "") + '</strong>' +
                '</button>';
              }).join("") +
            '</div>' +
          '</div>';
        }).join("") +
        '<button class="primary-button world-check-button" type="button" data-world-action="check">✅ готово</button>' +
      '</div>';
    }

    function renderMovie(task) {
      var frameIndex = state.subStep || 0;
      var current = (task.frames || [])[frameIndex] || (task.frames || [])[0] || {};
      return '<div class="world-game-task world-movie-task">' +
        '<div class="world-movie-strip">' +
          (task.frames || []).map(function (frame, index) {
            return '<div class="world-movie-frame' + (index < frameIndex ? " is-done" : "") + '">' +
              '<span aria-hidden="true">' + (index < frameIndex ? helpers.escape(frame.emoji || "") : "🎞️") + '</span>' +
            '</div>';
          }).join("") +
        '</div>' +
        '<p class="world-movie-prompt">' + helpers.escape(current.text || task.text || "") + '</p>' +
        '<div class="world-option-grid">' +
          shuffleObjects(task.frames || [], current.id).map(function (frame) {
            return '<button class="world-option-button" type="button" data-world-choice="' + helpers.escape(frame.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(frame.emoji || "") + '</span>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderShop(task, fast) {
      return '<div class="world-game-task world-shop-task">' +
        '<div class="world-shop-scene" aria-hidden="true">' +
          '<span>🏪</span><span>' + helpers.escape(task.customer || "🙂") + '</span><span>🤲</span>' +
        '</div>' +
        '<div class="world-shelf' + (fast ? " fast-shelf" : "") + '">' +
          shuffleObjects(task.shelf || [], task.correctItem).map(function (item) {
            return '<button class="world-item-button" type="button" data-world-item="' + helpers.escape(item.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
              (item.text ? '<strong>' + helpers.escape(item.text) + '</strong>' : "") +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderDialogue(task) {
      return '<div class="world-game-task">' +
        '<div class="world-dialogue-scene">' +
          '<span aria-hidden="true">' + helpers.escape(task.visual || "💬") + '</span>' +
          '<p>' + helpers.escape(task.situation || "") + '</p>' +
        '</div>' +
        renderOptions(task.options || [], task.correct) +
      '</div>';
    }

    function renderBuildPhrase(task) {
      return '<div class="world-game-task world-build-task">' +
        '<div class="world-request-target" aria-hidden="true">' + helpers.escape(task.itemEmoji || "🤲") + '</div>' +
        '<div class="world-selected-row" data-world-selected></div>' +
        '<div class="world-tile-grid">' +
          shuffleObjects(task.tiles || [], "").map(function (tile) {
            return '<button class="world-tile-button" type="button" data-world-tile="' + helpers.escape(tileText(tile)) + '">' +
              '<strong>' + helpers.escape(tile.text || tile) + '</strong>' +
            '</button>';
          }).join("") +
        '</div>' +
        '<div class="button-row world-build-buttons">' +
          '<button class="secondary-button" type="button" data-world-action="clear">↩ очистить</button>' +
          '<button class="primary-button" type="button" data-world-action="check">✅ готово</button>' +
        '</div>' +
      '</div>';
    }

    function renderBackpack(task) {
      return '<div class="world-game-task world-backpack-task">' +
        '<div class="world-backpack">' +
          '<span class="world-backpack-icon" aria-hidden="true">🎒</span>' +
          '<div class="world-shelf">' +
            shuffleObjects(task.inventory || [], task.correctItem).map(function (item) {
              return '<button class="world-item-button" type="button" data-world-item="' + helpers.escape(item.id) + '">' +
                '<span aria-hidden="true">' + helpers.escape(item.emoji || "") + '</span>' +
                (item.text ? '<strong>' + helpers.escape(item.text) + '</strong>' : "") +
              '</button>';
            }).join("") +
            '<button class="world-item-button world-net-button" type="button" data-world-item="net"><span aria-hidden="true">❌</span><strong>нет</strong></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    function renderMissing(task) {
      return '<div class="world-game-task world-missing-task">' +
        '<div class="world-flow-box">' +
          '<p>' + helpers.escape(task.haveText || "") + '</p>' +
          '<p>' + helpers.escape(task.missingText || "") + '</p>' +
          '<p>' + helpers.escape(task.wantText || "") + '</p>' +
        '</div>' +
        renderOptions(task.options || [], task.correct) +
      '</div>';
    }

    function renderOptions(items, correct) {
      return '<div class="world-option-grid">' +
        shuffleObjects(items || [], correct).map(function (item) {
          return '<button class="world-option-button" type="button" data-world-choice="' + helpers.escape(item.id) + '">' +
            (item.emoji ? '<span aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' : "") +
            '<strong>' + helpers.escape(item.text || "") + '</strong>' +
          '</button>';
        }).join("") +
      '</div>';
    }

    function bindTask(stage, task) {
      if (stage.type === "scene_tap" || stage.type === "stealth") {
        bindSceneTap(task);
        return;
      }
      if (stage.type === "freeze") {
        var freezeButton = root.querySelector("[data-world-freeze]");
        freezeButton.addEventListener("click", function () {
          var current = getFreezeState(task);
          checkAnswer(current.id === task.correctState, freezeButton, task, current.id);
        });
        return;
      }
      if (stage.type === "director") {
        bindDirector(task);
        return;
      }
      if (stage.type === "movie") {
        bindChoiceButtons(task, function (choice) {
          var frameIndex = state.subStep || 0;
          var current = (task.frames || [])[frameIndex] || {};
          if (choice === current.id) {
            state.subStep = frameIndex + 1;
            if (state.subStep >= (task.frames || []).length) {
              state.subStep = 0;
              checkAnswer(true, null, task, choice);
              return;
            }
            saveState(game, state);
            draw(false);
            return;
          }
          checkAnswer(false, null, task, choice);
        });
        return;
      }
      if (stage.type === "shop" || stage.type === "fast_orders") {
        bindItemButtons(task, task.correctItem, true);
        return;
      }
      if (stage.type === "dialogue" || stage.type === "missing") {
        bindChoiceButtons(task, function (choice) {
          checkAnswer(choice === task.correct, null, task, choice);
        });
        return;
      }
      if (stage.type === "build_phrase") {
        bindBuildPhrase(task);
        return;
      }
      if (stage.type === "backpack") {
        bindItemButtons(task, task.correctItem || "net", false);
      }
    }

    function bindSceneTap(task) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-world-target]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          var target = button.getAttribute("data-world-target");
          if (target === task.forbiddenTarget) {
            button.classList.add("is-forbidden");
            showFeedback(task.forbiddenFeedback || "Тихо! Кот спит. 🙂", false);
            return;
          }
          checkAnswer(target === task.correctTarget, button, task, target);
        });
      });
    }

    function bindDirector(task) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-world-group]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          var key = button.getAttribute("data-world-group");
          selected[key] = button.getAttribute("data-world-choice");
          Array.prototype.forEach.call(root.querySelectorAll('[data-world-group="' + cssEscape(key) + '"]'), function (item) {
            item.classList.toggle("is-selected", item === button);
          });
        });
      });
      root.querySelector('[data-world-action="check"]').addEventListener("click", function () {
        var keys = Object.keys(task.correct || {});
        var ok = keys.every(function (key) {
          return selected[key] === task.correct[key];
        });
        if (ok) {
          var scene = root.querySelector(".world-director-scene");
          if (scene) {
            scene.innerHTML = '<span class="world-director-result" aria-hidden="true">' + helpers.escape(task.resultEmoji || "🎬") + '</span>';
          }
        }
        checkAnswer(ok, null, task, keys.map(function (key) { return selected[key] || ""; }).join("+"));
      });
    }

    function bindChoiceButtons(task, handler) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-world-choice]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          handler(button.getAttribute("data-world-choice"), button);
        });
      });
    }

    function bindItemButtons(task, correct, staged) {
      Array.prototype.forEach.call(root.querySelectorAll("[data-world-item]"), function (button) {
        button.addEventListener("click", function () {
          if (locked) {
            return;
          }
          checkAnswer(button.getAttribute("data-world-item") === correct, button, task, button.getAttribute("data-world-item"), staged);
        });
      });
    }

    function bindBuildPhrase(task) {
      var tileElements = Array.prototype.slice.call(root.querySelectorAll("[data-world-tile]"));
      tileElements.forEach(function (button) {
        button.addEventListener("click", function () {
          if (locked || button.disabled) {
            return;
          }
          var tile = button.getAttribute("data-world-tile");
          selectedTiles.push(tile);
          button.disabled = true;
          button.classList.add("is-selected");
          renderSelectedTiles();
        });
      });

      root.querySelector('[data-world-action="clear"]').addEventListener("click", function () {
        selectedTiles = [];
        tileElements.forEach(function (button) {
          button.disabled = false;
          button.classList.remove("is-selected");
        });
        renderSelectedTiles();
      });

      root.querySelector('[data-world-action="check"]').addEventListener("click", function () {
        var answer = selectedTiles.map(tileText);
        var correct = (task.correctTiles || []).map(tileText);
        checkAnswer(sameValues(answer, correct), null, task, answer.join(" "));
      });
    }

    function renderSelectedTiles() {
      var row = root.querySelector("[data-world-selected]");
      if (!row) {
        return;
      }
      row.innerHTML = selectedTiles.length ? selectedTiles.map(function (tile) {
        return '<span>' + helpers.escape(tileText(tile)) + '</span>';
      }).join("") : '<span class="world-placeholder">…</span>';
    }

    function checkAnswer(ok, button, task, answer, staged) {
      if (locked) {
        return;
      }
      locked = true;

      if (helpers.recordAnswer) {
        helpers.recordAnswer(ok, task, answer || "");
      }

      if (ok) {
        state.correct += 1;
        if (button) {
          button.classList.add("is-correct");
        }
        if (staged) {
          showShopSuccess(task);
          return;
        }
        showFeedback(task.successText || task.correctFeedback || "Да! ✅", true);
        var success = helpers.playFeedback("success");
        advanceAfter(success);
        return;
      }

      state.mistakes += 1;
      if (button) {
        button.classList.add("is-wrong");
      }
      showFeedback(task.errorText || task.wrongFeedback || "Смотри ещё 🙂", false);
      window.setTimeout(function () {
        locked = false;
        if (button) {
          button.classList.remove("is-wrong");
        }
      }, 850);
    }

    function showShopSuccess(task) {
      showFeedback(task.giveText || "На. ✅", true);
      if (helpers.playWord) {
        helpers.playWord("На");
      }
      window.setTimeout(function () {
        showFeedback(task.thanksText || "Спасибо! 😊", true);
        if (helpers.playWord) {
          helpers.playWord("Спасибо");
        }
        window.setTimeout(advance, 850);
      }, 850);
    }

    function advanceAfter(success) {
      if (helpers.afterFeedback) {
        helpers.afterFeedback(success, advance);
        return;
      }
      window.setTimeout(advance, 900);
    }

    function advance() {
      var stage = getStage();
      var taskCount = (stage.tasks || []).length;

      if (state.taskIndex < taskCount - 1) {
        state.taskIndex += 1;
        state.subStep = 0;
        saveState(game, state);
        draw(true);
        return;
      }

      if (state.stageIndex < (game.stages || []).length - 1) {
        state.stageIndex += 1;
        state.taskIndex = 0;
        state.subStep = 0;
        saveState(game, state);
        draw(true);
        return;
      }

      state.finished = true;
      state.completed = true;
      saveState(game, state);
      renderFinal();
    }

    function renderFinal() {
      clearFreezeTimer();
      root.innerHTML =
        '<section class="stage-card unit2-game-final world-game-final">' +
          '<div class="unit2-game-final-mark" aria-hidden="true">' + helpers.escape(game.finalIcon || game.icon || "🏆") + '</div>' +
          '<h2 class="unit2-game-big">' + helpers.escape(game.finalTitle || "Отлично! ✅") + '</h2>' +
          (game.finalText ? '<p class="world-final-text">' + helpers.escape(game.finalText) + '</p>' : "") +
          '<div class="unit2-final-words">' +
            (game.finalWords || []).map(function (word) {
              return '<span>' + helpers.escape(word) + '</span>';
            }).join("") +
          '</div>' +
          '<div class="unit2-score-row">' +
            '<span>✅ ' + state.correct + '</span>' +
            '<span>❌ ' + state.mistakes + '</span>' +
          '</div>' +
          '<button class="primary-button" type="button" data-world-action="done">✅ готово</button>' +
        '</section>';

      root.querySelector('[data-world-action="done"]').addEventListener("click", function () {
        state = freshState();
        saveState(game, state);
        options.onCorrect();
      });
    }

    function bindAudio(task) {
      var button = root.querySelector('[data-world-action="listen"]');
      if (!button) {
        return;
      }
      button.addEventListener("click", function () {
        playTask(task);
      });
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        playTask(task);
      }, 220);
    }

    function playTask(task) {
      var stage = getStage();
      if (stage.type === "movie" && task.frames && task.frames.length) {
        var frame = task.frames[state.subStep || 0] || task.frames[0];
        return helpers.playPrompt({
          text: frame.text || task.text || "",
          speechText: frame.speechText,
          audio: frame.audio || task.audio
        });
      }
      if (helpers.playPrompt) {
        return helpers.playPrompt({
          text: task.speechText || task.command || task.question || task.text || "",
          speechText: task.speechText,
          audio: task.audio
        });
      }
      return Promise.resolve(false);
    }

    function startFreeze(task) {
      clearFreezeTimer();
      freezeTimer = window.setInterval(function () {
        if (locked) {
          return;
        }
        state.freezeIndex = ((state.freezeIndex || 0) + 1) % Math.max((task.states || []).length, 1);
        saveState(game, state);
        var cell = root.querySelector(".world-freeze-cell");
        var current = getFreezeState(task);
        if (cell) {
          cell.innerHTML =
            '<span class="world-freeze-emoji" aria-hidden="true">' + helpers.escape(current.emoji || "") + '</span>' +
            '<span class="world-freeze-text">' + helpers.escape(current.text || "") + '</span>';
        }
      }, task.interval || 1900);
    }

    function clearFreezeTimer() {
      if (freezeTimer) {
        window.clearInterval(freezeTimer);
        freezeTimer = null;
      }
    }

    function getFreezeState(task) {
      var states = task.states || [];
      return states[state.freezeIndex || 0] || states[0] || {};
    }

    function showFeedback(text, good) {
      var feedback = root.querySelector("#world-game-feedback");
      if (!feedback) {
        return;
      }
      feedback.className = "feedback world-game-feedback " + (good ? "good" : "bad");
      feedback.textContent = text;
    }

    function renderDebugBadge(stage, task) {
      if (!helpers.debugBadge) {
        return "";
      }
      var visible = task && task.id ? task.id : "з" + (state.taskIndex + 1);
      var source = [
        game.id || game.gameSlug || "",
        stage && (stage.id || stage.type) || "",
        task && task.id || visible
      ].filter(Boolean).join(":");

      return helpers.debugBadge(visible, source, "game-debug-badge");
    }

    function getStage() {
      return (game.stages || [])[state.stageIndex] || { tasks: [] };
    }

    function getTask() {
      var stage = getStage();
      return (stage.tasks || [])[state.taskIndex] || {};
    }

    function totalTasks(gameData) {
      return (gameData.stages || []).reduce(function (sum, stage) {
        return sum + (stage.tasks || []).length;
      }, 0);
    }

    function completedCount() {
      var total = 0;
      (game.stages || []).forEach(function (stage, index) {
        if (index < state.stageIndex) {
          total += (stage.tasks || []).length;
        }
      });
      return total + state.taskIndex;
    }

    function loadState(gameData) {
      try {
        var raw = window.localStorage.getItem(storageKey(gameData));
        if (!raw) {
          return freshState();
        }
        return Object.assign(freshState(), JSON.parse(raw));
      } catch (error) {
        return freshState();
      }
    }

    function saveState(gameData, nextState) {
      try {
        window.localStorage.setItem(storageKey(gameData), JSON.stringify(nextState));
      } catch (error) {
        // The game still works if storage is unavailable.
      }
    }

    function storageKey(gameData) {
      return STORAGE_KEY + ":" + (gameData.gameSlug || gameData.id || "game");
    }

    function freshState() {
      return {
        stageIndex: 0,
        taskIndex: 0,
        subStep: 0,
        freezeIndex: 0,
        correct: 0,
        mistakes: 0,
        completed: false,
        finished: false
      };
    }

    function sameValues(a, b) {
      if (a.length !== b.length) {
        return false;
      }
      for (var index = 0; index < a.length; index += 1) {
        if (a[index] !== b[index]) {
          return false;
        }
      }
      return true;
    }

    function tileText(tile) {
      return typeof tile === "string" ? tile : tile.text;
    }

    function shuffleObjects(items, correctId) {
      var copy = (items || []).slice();
      for (var index = copy.length - 1; index > 0; index -= 1) {
        var swap = Math.floor(Math.random() * (index + 1));
        var temp = copy[index];
        copy[index] = copy[swap];
        copy[swap] = temp;
      }

      if (copy.length > 1 && correctId && copy[0] && String(copy[0].id) === String(correctId)) {
        var swapIndex = 1 + Math.floor(Math.random() * (copy.length - 1));
        var first = copy[0];
        copy[0] = copy[swapIndex];
        copy[swapIndex] = first;
      }

      return copy;
    }

    function cssEscape(value) {
      if (window.CSS && window.CSS.escape) {
        return window.CSS.escape(value);
      }
      return String(value).replace(/"/g, '\\"');
    }
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderWorldMissionGame = renderWorldMissionGame;
}());
