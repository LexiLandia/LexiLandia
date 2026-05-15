(function () {
  "use strict";

  function renderPictureChoiceGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var canAnswer = true;

    root.innerHTML =
      helpers.soundPanel(task) +
      '<div id="picture-feedback" class="feedback" aria-live="polite"></div>' +
      '<div class="picture-grid">' +
        task.options.map(function (sceneId) {
          return '<button class="scene-card" type="button" data-scene-answer="' + helpers.escape(sceneId) + '">' +
            helpers.scene(sceneId, true) +
          '</button>';
        }).join("") +
      '</div>';

    helpers.bindSound(root, task);
    helpers.playPrompt(task);

    Array.prototype.forEach.call(root.querySelectorAll("[data-scene-answer]"), function (button) {
      button.addEventListener("click", function () {
        if (!canAnswer) {
          return;
        }

        var selected = button.getAttribute("data-scene-answer");
        var feedback = root.querySelector("#picture-feedback");
        var correctButton = root.querySelector('[data-scene-answer="' + task.correctScene + '"]');

        helpers.clearSceneAnswers(root);

        if (selected === task.correctScene) {
          canAnswer = false;
          button.classList.add("is-correct");
          feedback.className = "feedback good";
          feedback.textContent = "Хорошо!";
          helpers.playFeedback("success");
          window.setTimeout(options.onCorrect, 900);
          return;
        }

        button.classList.add("is-wrong");
        correctButton.classList.add("show-correct");
        feedback.className = "feedback try";
        feedback.textContent = "Ещё раз";
        helpers.playFeedback("retry");
        window.setTimeout(function () {
          helpers.playPrompt(task);
        }, 760);
      });
    });
  }

  function renderYesNoGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var canAnswer = true;

    root.innerHTML =
      helpers.scene(task.scene, false) +
      helpers.soundPanel(task) +
      '<div id="yesno-feedback" class="feedback" aria-live="polite"></div>' +
      '<div class="yes-no-grid">' +
        helpers.entryButton("da") +
        helpers.entryButton("net") +
      '</div>';

    helpers.bindSound(root, task);
    helpers.playPrompt(task);

    Array.prototype.forEach.call(root.querySelectorAll("[data-answer]"), function (button) {
      button.addEventListener("click", function () {
        if (!canAnswer) {
          return;
        }

        var selected = button.getAttribute("data-answer");
        var feedback = root.querySelector("#yesno-feedback");
        var correctButton = root.querySelector('[data-answer="' + task.correct + '"]');

        helpers.clearAnswers(root);

        if (selected === task.correct) {
          canAnswer = false;
          button.classList.add("is-correct");
          feedback.className = "feedback good";
          feedback.textContent = "Хорошо!";
          helpers.playFeedback("success");
          window.setTimeout(options.onCorrect, 900);
          return;
        }

        button.classList.add("is-wrong");
        correctButton.classList.add("show-correct");
        feedback.className = "feedback try";
        feedback.textContent = "Ещё раз";
        helpers.playFeedback("retry");
        window.setTimeout(function () {
          helpers.playPrompt(task);
        }, 760);
      });
    });
  }

  function renderLocationGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var canAnswer = true;

    root.innerHTML =
      helpers.scene(task.scene, false) +
      helpers.soundPanel(task) +
      '<div id="location-feedback" class="feedback" aria-live="polite"></div>' +
      '<div class="zone-choice-grid">' +
        '<button class="zone-choice" type="button" data-zone="near">📍</button>' +
        '<button class="zone-choice" type="button" data-zone="far">👉</button>' +
      '</div>';

    helpers.bindSound(root, task);
    helpers.playPrompt(task);

    Array.prototype.forEach.call(root.querySelectorAll("[data-zone]"), function (button) {
      button.addEventListener("click", function () {
        if (!canAnswer) {
          return;
        }

        var selected = button.getAttribute("data-zone");
        var feedback = root.querySelector("#location-feedback");
        var correctButton = root.querySelector('[data-zone="' + task.correctZone + '"]');

        Array.prototype.forEach.call(root.querySelectorAll("[data-zone]"), function (zoneButton) {
          zoneButton.classList.remove("is-correct", "is-wrong", "show-correct");
        });

        if (selected === task.correctZone) {
          canAnswer = false;
          button.classList.add("is-correct");
          feedback.className = "feedback good";
          feedback.textContent = "Хорошо!";
          helpers.playFeedback("success");
          window.setTimeout(options.onCorrect, 900);
          return;
        }

        button.classList.add("is-wrong");
        correctButton.classList.add("show-correct");
        feedback.className = "feedback try";
        feedback.textContent = "Ещё раз";
        helpers.playFeedback("retry");
        window.setTimeout(function () {
          helpers.playPrompt(task);
        }, 760);
      });
    });
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderPictureChoiceGame = renderPictureChoiceGame;
  window.LexiLandGames.renderYesNoGame = renderYesNoGame;
  window.LexiLandGames.renderLocationGame = renderLocationGame;
}());
