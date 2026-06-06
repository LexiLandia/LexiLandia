(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-unit-17-kitchen-game";

  function renderUnit17KitchenGame(options) {
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

      if (!task) {
        drawFinal();
        return;
      }

      root.innerHTML =
        '<section class="stage-card unit17-game-card">' +
          renderDebugBadge(task) +
          '<div class="unit17-game-top">' +
            '<div class="unit17-game-mark" aria-hidden="true">' + helpers.escape(game.icon || "🍽️") + '</div>' +
            '<div>' +
              '<p class="unit17-game-label">' + helpers.escape(game.title || "Кухня") + '</p>' +
              '<h2 class="unit17-game-title">' + helpers.escape(task.title || task.text || game.title || "Кухня") + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="unit17-game-progress" aria-hidden="true"><span style="width:' + Math.round((state.taskIndex / total) * 100) + '%"></span></div>' +
          renderTask(task) +
          '<div id="unit17-feedback" class="feedback unit17-feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit17-game-nav">' +
          '<button class="secondary-button" type="button" data-unit17-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(task);
      bindAudio(task);
      if (shouldPlay !== false) {
        maybePlay(task);
      }
    }

    function renderDebugBadge(task) {
      if (!helpers.debugBadge) {
        return "";
      }

      var visible = "з" + (state.taskIndex + 1);
      var source = [
        game.id || game.gameSlug || game.kind || "",
        task && task.id || visible
      ].filter(Boolean).join(":");

      return helpers.debugBadge(visible, source, "game-debug-badge");
    }

    function renderTask(task) {
      if (game.kind === "set-table") {
        return renderSetTable(task);
      }

      if (game.kind === "kitchen-find") {
        return renderKitchenFind(task);
      }

      return renderTeaQuest(task);
    }

    function renderSetTable(task) {
      var objects = shuffleAvoidFirst(game.objects || [], task.correct);

      return '<div class="unit17-game-task unit17-table-task">' +
        '<p class="unit17-command">' + helpers.escape(task.text || "Положи.") + '</p>' +
        '<div class="unit17-table-scene">' +
          '<div class="unit17-table-area">' +
            '<span class="unit17-table-label">стол</span>' +
            '<div class="unit17-placed-row">' + renderPlacedObjects() + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="unit17-object-tray">' +
          objects.map(function (item) {
            return '<button class="unit17-object-button" type="button" data-unit17-object="' + helpers.escape(item.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' +
              '<strong>' + helpers.escape(item.text) + '</strong>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderPlacedObjects() {
      if (!state.placed.length) {
        return '<span class="unit17-table-placeholder">🍽️</span>';
      }

      return state.placed.map(function (id) {
        var item = findObject(id);
        return '<span class="unit17-placed-item" aria-label="' + helpers.escape(item ? item.text : id) + '">' +
          helpers.escape(item ? item.emoji : "✅") +
        '</span>';
      }).join("");
    }

    function renderKitchenFind(task) {
      var items = game.sceneItems || [];

      return '<div class="unit17-game-task unit17-find-task">' +
        '<p class="unit17-command">' + helpers.escape(task.text || "Найди.") + '</p>' +
        '<div class="unit17-kitchen-scene">' +
          '<div class="unit17-kitchen-wall">🪟</div>' +
          '<div class="unit17-kitchen-counter">стол</div>' +
          '<div class="unit17-kitchen-shelf">полка</div>' +
          items.map(function (item) {
            return '<button class="unit17-scene-object at-' + helpers.escape(item.id) + '" style="left:' + helpers.escape(item.x) + '%;top:' + helpers.escape(item.y) + '%" type="button" data-unit17-object="' + helpers.escape(item.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' +
              '<small>' + helpers.escape(item.text) + '</small>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderTeaQuest(task) {
      var objects = task.action === "continue" ? [] : shuffleAvoidFirst(game.objects || [], task.correct);

      return '<div class="unit17-game-task unit17-tea-task">' +
        '<p class="unit17-command">' + helpers.escape(task.text || "Чай.") + '</p>' +
        '<div class="unit17-tea-scene">' +
          '<div class="unit17-guest">' +
            '<span aria-hidden="true">😊</span>' +
            '<strong>гость</strong>' +
          '</div>' +
          '<div class="unit17-tea-table">' +
            '<span aria-hidden="true">🫖</span>' +
            '<div class="unit17-placed-row">' + renderTeaInventory() + '</div>' +
          '</div>' +
        '</div>' +
        (task.action === "continue" ?
          '<button class="primary-button unit17-wide-action" type="button" data-unit17-continue>Дальше</button>' :
          '<div class="unit17-object-tray">' +
            objects.map(function (item) {
              return '<button class="unit17-object-button" type="button" data-unit17-object="' + helpers.escape(item.id) + '">' +
                '<span aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' +
                '<strong>' + helpers.escape(item.text) + '</strong>' +
              '</button>';
            }).join("") +
          '</div>') +
      '</div>';
    }

    function renderTeaInventory() {
      if (!state.inventory.length) {
        return '<span class="unit17-table-placeholder">☕</span>';
      }

      return state.inventory.map(function (id) {
        var item = findObject(id);
        return '<span class="unit17-placed-item" aria-label="' + helpers.escape(item ? item.text : id) + '">' +
          helpers.escape(item ? item.emoji : "✅") +
        '</span>';
      }).join("");
    }

    function bindTask(task) {
      locked = false;

      var continueButton = root.querySelector("[data-unit17-continue]");
      if (continueButton) {
        continueButton.addEventListener("click", function () {
          completeTask(task, null);
        });
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-unit17-object]"), function (button) {
        button.addEventListener("click", function () {
          var selected = button.getAttribute("data-unit17-object");
          if (selected === task.correct) {
            completeTask(task, selected);
            return;
          }
          missTask(task);
        });
      });
    }

    function bindAudio(task) {
      var listen = root.querySelector("[data-unit17-action='listen']");
      if (!listen) {
        return;
      }

      listen.addEventListener("click", function () {
        helpers.playPrompt(task);
      });
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        helpers.playPrompt(task);
      }, 120);
    }

    function completeTask(task, selected) {
      if (locked) {
        return;
      }
      locked = true;

      if (helpers.recordAnswer) {
        helpers.recordAnswer(true, task, selected || "готово");
      }

      state.correct += 1;
      if (game.kind === "set-table" && selected && state.placed.indexOf(selected) === -1) {
        state.placed.push(selected);
      }
      if (game.kind === "tea-guest" && selected && state.inventory.indexOf(selected) === -1) {
        state.inventory.push(selected);
      }

      setFeedback(task.successText || "Да! ✅", "good");
      var done = playLine(task.successText || "Да!", task.successAudio);

      helpers.afterFeedback({ done: done }, function () {
        var tasks = getTasks(game);
        if (state.taskIndex >= tasks.length - 1) {
          state.completed = true;
          saveState(game, state);
          drawFinal();
          return;
        }

        state.taskIndex += 1;
        saveState(game, state);
        draw(true);
      });
    }

    function missTask(task) {
      if (locked) {
        return;
      }

      if (helpers.recordAnswer) {
        helpers.recordAnswer(false, task, "");
      }

      state.mistakes += 1;
      saveState(game, state);
      setFeedback(task.errorText || "Смотри ещё 🙂", "try");
      helpers.playFeedback("retry");
    }

    function drawFinal() {
      state.completed = true;
      saveState(game, state);

      root.innerHTML =
        '<section class="stage-card unit17-game-card unit17-final-card">' +
          '<div class="unit17-final-emoji" aria-hidden="true">' + helpers.escape(game.finalEmoji || game.icon || "🍽️") + '</div>' +
          '<h2 class="unit17-game-title">' + helpers.escape(game.finalTitle || "Готово!") + '</h2>' +
          '<p class="unit17-final-text">' + helpers.escape(game.finalText || "Отлично!") + '</p>' +
          (game.kind === "set-table" ? '<div class="unit17-table-scene is-final"><div class="unit17-table-area"><span class="unit17-table-label">стол</span><div class="unit17-placed-row">' + renderFinalObjects() + '</div></div></div>' : "") +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit17-game-nav">' +
          '<button class="secondary-button" type="button" data-unit17-final-listen>▶️ Слушать</button>' +
          '<button class="primary-button" type="button" data-unit17-final-done>Готово</button>' +
        '</div>';

      var finalListen = root.querySelector("[data-unit17-final-listen]");
      var finalDone = root.querySelector("[data-unit17-final-done]");

      if (finalListen) {
        finalListen.addEventListener("click", function () {
          playLine(game.finalText || "Готово.", game.finalAudio);
        });
      }
      if (finalDone) {
        finalDone.addEventListener("click", function () {
          options.onCorrect();
        });
      }

      playLine(game.finalText || "Готово.", game.finalAudio);
    }

    function renderFinalObjects() {
      var ids = state.placed.length ? state.placed : (game.objects || []).map(function (item) { return item.id; });
      return ids.map(function (id) {
        var item = findObject(id);
        return '<span class="unit17-placed-item" aria-label="' + helpers.escape(item ? item.text : id) + '">' +
          helpers.escape(item ? item.emoji : "✅") +
        '</span>';
      }).join("");
    }

    function playLine(text, audio) {
      if (!audio) {
        return Promise.resolve(false);
      }

      return helpers.playPrompt({
        text: text,
        audio: audio
      });
    }

    function setFeedback(text, kind) {
      var feedback = root.querySelector("#unit17-feedback");
      if (!feedback) {
        return;
      }
      feedback.textContent = text;
      feedback.className = "feedback unit17-feedback " + (kind === "good" ? "is-good" : "is-try");
    }

    function findObject(id) {
      var all = (game.objects || []).concat(game.sceneItems || []);
      for (var index = 0; index < all.length; index += 1) {
        if (all[index].id === id) {
          return all[index];
        }
      }
      return null;
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
      placed: [],
      inventory: []
    };
  }

  function loadState(game) {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY + ":" + game.gameSlug) || "null");
      if (parsed && typeof parsed.taskIndex === "number") {
        parsed.placed = parsed.placed || [];
        parsed.inventory = parsed.inventory || [];
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
  window.LexiLandGames.renderUnit17KitchenGame = renderUnit17KitchenGame;
}());
