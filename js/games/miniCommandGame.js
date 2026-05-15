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
      var isCorrectAction = action === task.correctAction;
      var isCorrectTarget = task.correctAction === "no" || selectedObject.id === task.correctTarget;

      if (isCorrectAction && isCorrectTarget) {
        canAnswer = false;
        feedback.className = "feedback good";
        feedback.textContent = "Хорошо!";
        root.querySelector(".mini-board").classList.add("success-pop");
        helpers.playFeedback("success");
        window.setTimeout(options.onCorrect, 950);
        return;
      }

      feedback.className = "feedback try";
      feedback.textContent = "Ещё раз";
      root.querySelector(".mini-board").classList.add("show-target");
      helpers.playFeedback("retry");
      window.setTimeout(function () {
        helpers.playPrompt(task);
      }, 760);
    }

    draw();
    helpers.playPrompt(task);
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderMiniCommandGame = renderMiniCommandGame;
}());
