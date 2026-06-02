(function () {
  "use strict";

  function renderMiniCommandGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var selectedIndex = task.startIndex || 0;
    var canAnswer = true;

    function draw() {
      root.innerHTML =
        helpers.soundPanel(task) +
        '<div id="mini-feedback" class="feedback" aria-live="polite"></div>' +
        '<div class="mini-board">' +
          '<div class="mini-zone"><span class="zone-mark">📍</span>' + renderObjects("near") + '</div>' +
          '<div class="mini-zone"><span class="zone-mark">👉</span>' + renderObjects("far") + '</div>' +
        '</div>' +
        '<div class="mini-controls">' +
          '<button class="control-button" type="button" data-move="-1">←</button>' +
          '<button class="control-button ok" type="button" data-action="yes">✅</button>' +
          '<button class="control-button no" type="button" data-action="no">❌</button>' +
          '<button class="control-button" type="button" data-move="1">→</button>' +
        '</div>';

      helpers.bindSound(root, task);

      Array.prototype.forEach.call(root.querySelectorAll("[data-move]"), function (button) {
        button.addEventListener("click", function () {
          if (!canAnswer) {
            return;
          }
          var step = Number(button.getAttribute("data-move"));
          selectedIndex = (selectedIndex + step + task.objects.length) % task.objects.length;
          draw();
        });
      });

      Array.prototype.forEach.call(root.querySelectorAll("[data-action]"), function (button) {
        button.addEventListener("click", function () {
          if (!canAnswer) {
            return;
          }
          checkAnswer(button.getAttribute("data-action"));
        });
      });
    }

    function renderObjects(zone) {
      return task.objects.map(function (object, index) {
        if (object.zone !== zone) {
          return "";
        }

        var selectedClass = index === selectedIndex ? " selected" : "";
        var correctClass = object.id === task.correctTarget ? " correct-target" : "";
        return '<button class="mini-object' + selectedClass + correctClass + '" type="button" data-object="' + helpers.escape(object.id) + '">' +
          '<span class="walker" aria-hidden="true">' + (index === selectedIndex ? "🙂" : "") + '</span>' +
          '<span class="mini-emoji">' + helpers.escape(object.emoji) + '</span>' +
        '</button>';
      }).join("");
    }

    function checkAnswer(action) {
      var selectedObject = task.objects[selectedIndex];
      var feedback = root.querySelector("#mini-feedback");
      var isOnTarget = selectedObject.id === task.correctTarget;
      var isCorrect = task.correctAction === "no"
        ? (action === "no" && !isOnTarget) || (action === "yes" && isOnTarget)
        : action === task.correctAction && isOnTarget;

      if (isCorrect) {
        if (helpers.recordAnswer) {
          helpers.recordAnswer(true, task, action + ":" + selectedObject.id);
        }
        canAnswer = false;
        feedback.className = "feedback good";
        var success = helpers.playFeedback("success");
        feedback.textContent = success.text;
        root.querySelector(".mini-board").classList.add("success-pop");
        helpers.afterFeedback(success, options.onCorrect);
        return;
      }

      if (helpers.recordAnswer) {
        helpers.recordAnswer(false, task, action + ":" + selectedObject.id);
      }
      feedback.className = "feedback try";
      var retry = helpers.playFeedback("retry");
      feedback.textContent = retry.text;
      root.querySelector(".mini-board").classList.add("show-target");
      helpers.afterFeedback(retry, function () {
        helpers.playPrompt(task);
      });
    }

    draw();
    helpers.playPrompt(task);
  }

  function renderMapCommandGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var player = {
      x: helpers.mapStart(task).x,
      y: helpers.mapStart(task).y
    };
    var canAnswer = true;

    function draw() {
      root.innerHTML =
        helpers.soundPanel(task, { visual: true }) +
        (task.roundLabel ? '<div class="question-step map-round-step">' + helpers.escape(task.roundLabel) + '</div>' : "") +
        '<div id="map-feedback" class="feedback" aria-live="polite"></div>' +
        '<div class="map-board" style="grid-template-columns: repeat(' + helpers.mapWidth(task) + ', 1fr);">' +
          renderTiles() +
        '</div>' +
        '<div class="map-controls">' +
          '<span></span>' +
          '<button class="control-button" type="button" data-dir="up">↑</button>' +
          '<span></span>' +
          '<button class="control-button" type="button" data-dir="left">←</button>' +
          '<button class="control-button ok map-check-button" type="button" data-check="yes">' + helpers.escape(task.checkLabel || "✅") + '</button>' +
          '<button class="control-button" type="button" data-dir="right">→</button>' +
          '<span></span>' +
          '<button class="control-button" type="button" data-dir="down">↓</button>' +
          '<span></span>' +
        '</div>';

      root.tabIndex = 0;
      root.onkeydown = function (event) {
        var keyMap = {
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
        var direction = keyMap[event.key];
        if (!direction || !canAnswer) {
          return;
        }
        event.preventDefault();
        move(direction);
        draw();
      };
      root.focus();

      helpers.bindSound(root, task);

      Array.prototype.forEach.call(root.querySelectorAll("[data-dir]"), function (button) {
        button.addEventListener("click", function () {
          if (!canAnswer) {
            return;
          }
          move(button.getAttribute("data-dir"));
          draw();
        });
      });

      root.querySelector('[data-check="yes"]').addEventListener("click", check);
    }

    function renderTiles() {
      var html = "";
      for (var y = 0; y < helpers.mapHeight(task); y += 1) {
        for (var x = 0; x < helpers.mapWidth(task); x += 1) {
          var hasPlayer = player.x === x && player.y === y;
          var targetClass = helpers.getMapTarget(task) && helpers.getMapTarget(task).x === x && helpers.getMapTarget(task).y === y ? " target-tile" : "";
          html += '<div class="map-tile' + helpers.mapTileClass(task, x, y) + targetClass + '" aria-label="' + helpers.escape(helpers.getMapAria(task, x, y)) + '">' +
            '<span class="map-object">' + helpers.escape(helpers.mapTileEmoji(task, x, y)) + '</span>' +
            '<span class="map-player">' + (hasPlayer ? "🙂" : "") + '</span>' +
          '</div>';
        }
      }
      return html;
    }

    function move(direction) {
      if (direction === "up") {
        player.y = Math.max(0, player.y - 1);
      }
      if (direction === "down") {
        player.y = Math.min(helpers.mapHeight(task) - 1, player.y + 1);
      }
      if (direction === "left") {
        player.x = Math.max(0, player.x - 1);
      }
      if (direction === "right") {
        player.x = Math.min(helpers.mapWidth(task) - 1, player.x + 1);
      }
    }

    function check() {
      if (!canAnswer) {
        return;
      }

      var feedback = root.querySelector("#map-feedback");
      var target = helpers.getMapTarget(task);
      if (target && player.x === target.x && player.y === target.y) {
        if (helpers.recordAnswer) {
          helpers.recordAnswer(true, task, player.x + "," + player.y);
        }
        canAnswer = false;
        feedback.className = "feedback good";
        var success = helpers.playFeedback("success");
        feedback.textContent = task.correctFeedback || success.text;
        root.querySelector(".map-board").classList.add("success-pop");
        helpers.afterFeedback(success, options.onCorrect);
        return;
      }

      if (helpers.recordAnswer) {
        helpers.recordAnswer(false, task, player.x + "," + player.y);
      }
      feedback.className = "feedback try";
      var retry = helpers.playFeedback("retry");
      feedback.textContent = task.wrongFeedback || retry.text;
      root.querySelector(".map-board").classList.add("show-target");
      helpers.afterFeedback(retry, function () {
        helpers.playPrompt(task);
      });
    }

    draw();
    helpers.playPrompt(task);
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderMiniCommandGame = renderMiniCommandGame;
  window.LexiLandGames.renderMapCommandGame = renderMapCommandGame;
}());
