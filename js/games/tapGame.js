(function () {
  "use strict";

  function renderTapGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var canAnswer = true;

    root.innerHTML =
      helpers.soundPanel(task) +
      '<div id="tap-feedback" class="feedback" aria-live="polite"></div>' +
      '<div class="answer-grid">' +
        task.options.map(function (entryId) {
          return helpers.entryButton(entryId);
        }).join("") +
      '</div>';

    helpers.bindSound(root, task);
    helpers.playPrompt(task);

    Array.prototype.forEach.call(root.querySelectorAll("[data-answer]"), function (button) {
      button.addEventListener("click", function () {
        if (!canAnswer) {
          return;
        }

        var selected = button.getAttribute("data-answer");
        var feedback = root.querySelector("#tap-feedback");
        var correctButton = root.querySelector('[data-answer="' + task.correct + '"]');

        helpers.clearAnswers(root);

        if (selected === task.correct) {
          canAnswer = false;
          button.classList.add("is-correct");
          feedback.className = "feedback good";
          feedback.textContent = "Хорошо!";
          window.setTimeout(options.onCorrect, 520);
          return;
        }

        button.classList.add("is-wrong");
        correctButton.classList.add("show-correct");
        feedback.className = "feedback try";
        feedback.textContent = "Ещё раз";
        helpers.playPrompt(task);
      });
    });
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderTapGame = renderTapGame;
}());
