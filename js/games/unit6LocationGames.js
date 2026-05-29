(function () {
  "use strict";

  var STORAGE_KEY = "lexiland-unit-6-location-game";

  function renderUnit6LocationGame(options) {
    var root = options.root;
    var game = options.task;
    var helpers = options.helpers;
    var tasks = buildTasks(game);
    var state = loadState(game);
    var locked = false;

    if (state.completed || state.taskIndex >= tasks.length) {
      state = freshState();
      saveState(game, state);
    }

    draw();

    function draw() {
      var task = tasks[state.taskIndex];
      var done = Math.max(0, state.taskIndex);
      var total = tasks.length || 1;

      root.innerHTML =
        '<section class="stage-card unit6-game-card">' +
          '<div class="unit6-game-top">' +
            '<div class="unit6-game-mark" aria-hidden="true">' + helpers.escape(game.icon || "📍") + '</div>' +
            '<div>' +
              '<p class="unit6-game-label">' + helpers.escape(game.title || "Где?") + '</p>' +
              '<h2 class="unit6-game-title">' + helpers.escape(task.title || game.title || "Где?") + '</h2>' +
            '</div>' +
          '</div>' +
          '<div class="unit6-game-progress" aria-hidden="true"><span style="width:' + Math.round((done / total) * 100) + '%"></span></div>' +
          renderTask(task) +
          '<div id="unit6-feedback" class="feedback" aria-live="polite"></div>' +
          '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
        '</section>' +
        '<div class="button-row unit6-game-nav">' +
          '<button class="secondary-button" type="button" data-unit6-action="listen">▶️ Слушать</button>' +
        '</div>';

      bindTask(task);
      bindAudio(task);
      maybePlay(task);
    }

    function renderTask(task) {
      if (task.type === "place-object") {
        return renderPlacementTask(task);
      }

      if (task.type === "room-find" || task.type === "room-put") {
        return renderRoomTask(task);
      }

      return '<div class="unit6-game-task">' +
        (task.scene && task.scene.objects ? renderRoom(task.scene, false) : renderScene(task.scene)) +
        '<p class="unit6-game-question">' + helpers.escape(task.question || task.text || "Где?") + '</p>' +
        renderOptions(task.options || [], task.correct) +
      '</div>';
    }

    function renderPlacementTask(task) {
      return '<div class="unit6-game-task">' +
        '<p class="unit6-game-question">' + helpers.escape(task.command) + '</p>' +
        '<button class="unit6-place-object" type="button" data-unit6-object="' + helpers.escape(task.objectId) + '">' +
          '<span aria-hidden="true">' + helpers.escape(task.objectEmoji) + '</span>' +
          '<strong>' + helpers.escape(task.objectText) + '</strong>' +
        '</button>' +
        '<div class="unit6-zone-grid">' +
          getZones(task.zones).map(function (zone) {
            return '<button class="unit6-zone-button" type="button" data-unit6-zone="' + helpers.escape(zone.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(zone.emoji) + '</span>' +
              '<strong>' + helpers.escape(zone.text) + '</strong>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderRoomTask(task) {
      return '<div class="unit6-game-task">' +
        renderRoom(task.scene, task.type === "room-find") +
        '<p class="unit6-game-question">' + helpers.escape(task.question || task.text || "Где?") + '</p>' +
        (task.type === "room-find" ? "" : task.type === "room-put" ? renderRoomPutZones(task) : renderOptions(task.options || [], task.correct)) +
      '</div>';
    }

    function renderRoomPutZones(task) {
      return '<div class="unit6-room-put">' +
        '<button class="unit6-place-object" type="button" data-unit6-object="' + helpers.escape(task.objectId) + '">' +
          '<span aria-hidden="true">' + helpers.escape(task.objectEmoji) + '</span>' +
          '<strong>' + helpers.escape(task.objectText) + '</strong>' +
        '</button>' +
        '<div class="unit6-zone-grid compact">' +
          getZones(task.zones).map(function (zone) {
            return '<button class="unit6-zone-button" type="button" data-unit6-zone="' + helpers.escape(zone.id) + '">' +
              '<span aria-hidden="true">' + helpers.escape(zone.emoji) + '</span>' +
              '<strong>' + helpers.escape(zone.text) + '</strong>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
    }

    function renderScene(scene) {
      if (!scene) {
        return "";
      }

      if (scene.type === "here-there") {
        return '<div class="unit6-scene here-there-location">' +
          '<div class="location-zone is-here"><span class="location-zone-mark">📍</span><span class="location-zone-object">' + helpers.escape(scene.here || "") + '</span></div>' +
          '<div class="location-zone is-there"><span class="location-zone-mark">👉</span><span class="location-zone-object">' + helpers.escape(scene.there || "") + '</span></div>' +
        '</div>';
      }

      return '<div class="unit6-scene location-scene-visual relation-' + helpers.escape(scene.relation || "near") + '">' +
        '<div class="location-picture">' +
          '<span class="location-anchor">' + helpers.escape(scene.anchorEmoji || "") + '</span>' +
          '<span class="location-object">' + helpers.escape(scene.objectEmoji || "") + '</span>' +
        '</div>' +
      '</div>';
    }

    function renderRoom(scene, clickable) {
      var objects = scene.objects || [];

      return '<div class="unit6-room-scene">' +
        '<div class="unit6-room-anchor unit6-table">стол</div>' +
        '<div class="unit6-room-anchor unit6-box">📦</div>' +
        '<div class="unit6-room-anchor unit6-house">🏠</div>' +
        '<div class="unit6-room-anchor unit6-chair">🪑</div>' +
        objects.map(function (object) {
          var tag = clickable ? "button" : "span";
          var attrs = clickable ? ' type="button" data-unit6-room-object="' + helpers.escape(object.id) + '"' : "";
          return '<' + tag + attrs + ' class="unit6-room-object at-' + helpers.escape(object.location) + '">' +
            '<span aria-hidden="true">' + helpers.escape(object.emoji) + '</span>' +
            '<small>' + helpers.escape(object.word) + '</small>' +
          '</' + tag + '>';
        }).join("") +
      '</div>';
    }

    function renderOptions(items, correct) {
      var shuffled = shuffleOptions(items, correct);

      return '<div class="unit6-option-grid">' +
        shuffled.map(function (item) {
          return '<button class="unit2-game-option" type="button" data-unit6-choice="' + helpers.escape(item.id) + '">' +
            (item.emoji ? '<span class="unit2-option-emoji" aria-hidden="true">' + helpers.escape(item.emoji) + '</span>' : "") +
            '<span class="unit2-option-text">' + helpers.escape(item.text || "") + '</span>' +
          '</button>';
        }).join("") +
      '</div>';
    }

    function bindTask(task) {
      if (task.type === "place-object" || task.type === "room-put") {
        bindPlacement(task);
        return;
      }

      if (task.type === "room-find") {
        Array.prototype.forEach.call(root.querySelectorAll("[data-unit6-room-object]"), function (button) {
          button.addEventListener("click", function () {
            check(button.getAttribute("data-unit6-room-object") === task.correct, button, task);
          });
        });
        return;
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-unit6-choice]"), function (button) {
        button.addEventListener("click", function () {
          check(button.getAttribute("data-unit6-choice") === task.correct, button, task);
        });
      });
    }

    function bindPlacement(task) {
      var selected = false;
      var objectButton = root.querySelector("[data-unit6-object]");

      if (objectButton) {
        objectButton.addEventListener("click", function () {
          selected = true;
          objectButton.classList.add("is-selected");
          setFeedback("Выбери место.", "try");
        });
      }

      Array.prototype.forEach.call(root.querySelectorAll("[data-unit6-zone]"), function (button) {
        button.addEventListener("click", function () {
          if (!selected) {
            setFeedback("Сначала предмет 🙂", "try");
            return;
          }
          check(button.getAttribute("data-unit6-zone") === task.target, button, task);
        });
      });
    }

    function bindAudio(task) {
      var button = root.querySelector('[data-unit6-action="listen"]');
      if (!button) {
        return;
      }
      button.addEventListener("click", function () {
        playTask(task);
      });
    }

    function check(isCorrect, button, task) {
      var feedback = root.querySelector("#unit6-feedback");

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
        feedback.textContent = task.correctFeedback || success.text || "Да! ✅";
        saveState(game, state);
        helpers.afterFeedback(success, next);
        return;
      }

      state.mistakes += 1;
      if (button) {
        button.classList.add("is-wrong");
      }
      feedback.className = "feedback try";
      feedback.textContent = task.wrongFeedback || "Не туда 🙂";
      helpers.playFeedback("retry");
      saveState(game, state);
      window.setTimeout(function () {
        locked = false;
        if (button) {
          button.classList.remove("is-wrong");
        }
        feedback.textContent = "";
      }, 920);
    }

    function next() {
      locked = false;

      if (state.taskIndex < tasks.length - 1) {
        state.taskIndex += 1;
        saveState(game, state);
        draw();
        return;
      }

      drawFinal();
    }

    function drawFinal() {
      state.completed = true;
      saveState(game, state);

      root.innerHTML =
        '<section class="stage-card unit6-game-card unit6-game-final">' +
          '<div class="unit6-final-mark" aria-hidden="true">🏆</div>' +
          '<h2 class="unit6-game-title">' + helpers.escape(game.finalTitle || "Отлично! ✅") + '</h2>' +
          '<p class="unit6-game-big">' + helpers.escape(game.finalText || "Где? Тут. Там.") + '</p>' +
          '<div class="unit2-score-row"><span>✅ ' + state.correct + '</span><span>❌ ' + state.mistakes + '</span></div>' +
          '<div class="unit6-final-words">' +
            (game.finalWords || ["в", "на", "под", "рядом"]).map(function (word) {
              return '<span>' + helpers.escape(word) + '</span>';
            }).join("") +
          '</div>' +
        '</section>' +
        '<div class="button-row unit6-game-nav">' +
          '<button class="secondary-button" type="button" data-unit6-restart>Ещё раз</button>' +
          '<button class="primary-button" type="button" data-unit6-done>✅ Готово</button>' +
        '</div>';

      root.querySelector("[data-unit6-restart]").addEventListener("click", function () {
        state = freshState();
        saveState(game, state);
        draw();
      });
      root.querySelector("[data-unit6-done]").addEventListener("click", options.onCorrect);
    }

    function playTask(task) {
      if (!task.audio || !window.LexiLandAudio) {
        return Promise.resolve(false);
      }
      return window.LexiLandAudio.playAudio(task.audio, task.speechText || task.text || task.question || task.command || "", function () {
        var warning = root.querySelector("#audio-warning");
        if (warning) {
          warning.textContent = "Аудио скоро будет";
        }
      });
    }

    function maybePlay(task) {
      window.setTimeout(function () {
        playTask(task);
      }, 150);
    }

    function setFeedback(text, kind) {
      var feedback = root.querySelector("#unit6-feedback");
      if (feedback) {
        feedback.className = "feedback " + (kind || "");
        feedback.textContent = text;
      }
    }
  }

  function buildTasks(game) {
    if (game.kind === "room") {
      return flattenRoomScenes(game.scenes || []);
    }

    return (game.rounds || game.tasks || []).slice();
  }

  function flattenRoomScenes(scenes) {
    var tasks = [];

    scenes.forEach(function (scene) {
      (scene.questions || []).forEach(function (question) {
        var task = Object.assign({}, question);
        task.scene = scene;
        task.title = scene.title;
        tasks.push(task);
      });
    });

    return tasks;
  }

  function getZones(ids) {
    var zones = {
      in_box: { id: "in_box", text: "в коробку", emoji: "📦" },
      on_table: { id: "on_table", text: "на стол", emoji: "⬆️🪑" },
      under_table: { id: "under_table", text: "под стол", emoji: "⬇️🪑" },
      near_house: { id: "near_house", text: "рядом с домом", emoji: "↔️🏠" },
      in_house: { id: "in_house", text: "в дом", emoji: "🏠" },
      on_chair: { id: "on_chair", text: "на стул", emoji: "⬆️🪑" }
    };

    return (ids || ["in_box", "on_table", "under_table", "near_house"]).map(function (id) {
      return zones[id];
    }).filter(Boolean);
  }

  function freshState() {
    return {
      taskIndex: 0,
      correct: 0,
      mistakes: 0,
      completed: false
    };
  }

  function loadState(game) {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY + ":" + game.gameSlug) || "null");
      if (parsed && typeof parsed.taskIndex === "number") {
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
  window.LexiLandGames.renderUnit6LocationGame = renderUnit6LocationGame;
}());
