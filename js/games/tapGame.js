(function () {
  "use strict";

  function renderTapGame(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var answers = helpers.shuffleAvoidFirst(task.options, task.correct);
    var canAnswer = true;

    root.innerHTML =
      helpers.soundPanel(task) +
      '<div id="tap-feedback" class="feedback" aria-live="polite"></div>' +
      '<div class="answer-grid">' +
        answers.map(function (entryId) {
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
          var success = helpers.playFeedback("success");
          feedback.textContent = success.text;
          helpers.afterFeedback(success, options.onCorrect);
          return;
        }

        button.classList.add("is-wrong");
        correctButton.classList.add("show-correct");
        feedback.className = "feedback try";
        var retry = helpers.playFeedback("retry");
        feedback.textContent = retry.text;
        helpers.afterFeedback(retry, function () {
          helpers.playPrompt(task);
        });
      });
    });
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderTapGame = renderTapGame;
}());
