(function () {
  "use strict";

  function renderSlideLesson(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var answered = {};
    var questions = task.questions || [];
    var currentQuestionIndex = 0;
    var hasQuestions = Boolean(questions.length);
    var hasAudio = Boolean(task.audio && (!Array.isArray(task.audio) || task.audio.length));

    root.innerHTML =
      '<section class="stage-card slide-card ' + (hasQuestions ? "task-card" : "info-card") + '">' +
        '<div class="mode-badge ' + (hasQuestions ? "task-badge" : "info-badge") + '">' +
          (hasQuestions ? "&#10067; &#1042;&#1099;&#1073;&#1077;&#1088;&#1080;" : "&#8505;&#65039; &#1057;&#1084;&#1086;&#1090;&#1088;&#1080;") +
        '</div>' +
        renderSlideContent(task, helpers) +
        '<div id="slide-feedback" class="feedback" aria-live="polite"></div>' +
        '<div id="slide-questions" class="slide-questions"></div>' +
      '</section>' +
      '<div class="button-row slide-nav">' +
        (hasAudio ? '<button class="secondary-button" type="button" data-action="listen">▶️ Слушать</button>' : '<span></span>') +
        '<button class="primary-button" type="button" data-action="next"' + (questions.length ? " disabled" : "") + '>Дальше</button>' +
      '</div>';

    bindReveal(root, task, helpers);
    bindReading(root);
    drawQuestion();

    if (hasAudio) {
      root.querySelector('[data-action="listen"]').addEventListener("click", function () {
        helpers.playPrompt(task);
      });
    }

    root.querySelector('[data-action="next"]').addEventListener("click", function () {
      options.onCorrect();
    });

    if (hasAudio) {
      helpers.playPrompt(task);
    }

    function drawQuestion() {
      var holder = root.querySelector("#slide-questions");
      if (!questions.length) {
        holder.innerHTML = "";
        return;
      }

      holder.innerHTML = renderQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions.length, helpers);
      bindQuestion(root, questions, answered, helpers, currentQuestionIndex, function () {
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex += 1;
          drawQuestion();
          return;
        }
        updateNext(root, questions, answered);
      });
    }
  }

  function renderSlideContent(task, helpers) {
    return '<div class="slide-content">' +
      (task.title ? '<h2 class="slide-title">' + helpers.escape(task.title) + '</h2>' : "") +
      renderVisual(task.visual, helpers) +
      renderText(task, helpers) +
      renderReveal(task, helpers) +
      '<div id="word-feedback" class="word-feedback" aria-live="polite"></div>' +
      '<div id="audio-warning" class="audio-warning" aria-live="polite"></div>' +
    '</div>';
  }

  function renderText(task, helpers) {
    var lines = task.text || [];
    if (task.reading) {
      return '<div class="reading-text">' + lines.map(function (line) {
        return '<p>' + renderClickableLine(line, task.wordMeanings || {}, helpers) + '</p>';
      }).join("") + '</div>';
    }

    return '<div class="slide-lines">' + lines.map(function (line) {
      return line ? '<p>' + helpers.escape(line) + '</p>' : '<span class="slide-space"></span>';
    }).join("") + '</div>';
  }

  function renderClickableLine(line, meanings, helpers) {
    if (!line) {
      return '<span class="slide-space"></span>';
    }

    return line.split(/(\s+)/).map(function (part) {
      var key = part.replace(/[.,!?;:]/g, "").toLowerCase();
      if (meanings[key]) {
        return '<button class="read-word" type="button" data-meaning="' + helpers.escape(meanings[key]) + '">' + helpers.escape(part) + '</button>';
      }
      return helpers.escape(part);
    }).join("");
  }

  function renderReveal(task, helpers) {
    if (!task.reveal) {
      return "";
    }

    return '<div class="reveal-box">' +
      '<button class="secondary-button" type="button" data-action="reveal">Показать</button>' +
      '<p class="reveal-text" hidden>' + helpers.escape(task.reveal.text) + '</p>' +
    '</div>';
  }

  function renderQuestion(question, questionIndex, questionCount, helpers) {
      return '<div class="slide-question active-question" data-question="' + questionIndex + '">' +
        (questionCount > 1 ? '<div class="question-step">' + (questionIndex + 1) + " / " + questionCount + '</div>' : "") +
        '<p class="question-text">' + helpers.escape(question.text) + '</p>' +
        '<div class="slide-answer-grid">' +
          question.options.map(function (answer) {
            return '<button class="answer-card slide-answer" type="button" data-question-index="' + questionIndex + '" data-choice="' + helpers.escape(answer.id) + '">' +
              '<span class="answer-emoji" aria-hidden="true">' + helpers.escape(answer.emoji) + '</span>' +
              '<span class="answer-text">' + helpers.escape(answer.text) + '</span>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';
  }

  function bindReveal(root, task, helpers) {
    var button = root.querySelector('[data-action="reveal"]');
    if (!button || !task.reveal) {
      return;
    }

    button.addEventListener("click", function () {
      var text = root.querySelector(".reveal-text");
      text.hidden = false;
      button.disabled = true;
      if (task.reveal.audio) {
        helpers.playPrompt(task.reveal);
      }
    });
  }

  function bindReading(root) {
    Array.prototype.forEach.call(root.querySelectorAll(".read-word"), function (button) {
      button.addEventListener("click", function () {
        var feedback = root.querySelector("#word-feedback");
        feedback.textContent = button.getAttribute("data-meaning") || "";
        Array.prototype.forEach.call(root.querySelectorAll(".read-word"), function (item) {
          item.classList.remove("is-open");
        });
        button.classList.add("is-open");
      });
    });
  }

  function bindQuestion(root, questions, answered, helpers, questionIndex, onDone) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-choice]"), function (button) {
      button.addEventListener("click", function () {
        var question = questions[questionIndex];
        var selected = button.getAttribute("data-choice");
        var feedback = root.querySelector("#slide-feedback");
        var questionRoot = root.querySelector('[data-question="' + questionIndex + '"]');
        var correctButton = questionRoot.querySelector('[data-choice="' + helpers.escape(question.correct) + '"]');

        Array.prototype.forEach.call(questionRoot.querySelectorAll("[data-choice]"), function (item) {
          item.classList.remove("is-correct", "is-wrong", "show-correct");
        });

        if (selected === question.correct) {
          answered[question.id] = true;
          button.classList.add("is-correct");
          feedback.className = "feedback good";
          var success = helpers.playFeedback("success");
          feedback.textContent = success.text;
          helpers.afterFeedback(success, onDone);
          return;
        }

        button.classList.add("is-wrong");
        if (correctButton) {
          correctButton.classList.add("show-correct");
        }
        feedback.className = "feedback try";
        feedback.textContent = helpers.playFeedback("retry").text;
      });
    });
  }

  function updateNext(root, questions, answered) {
    var complete = questions.every(function (question) {
      return answered[question.id];
    });

    root.querySelector('[data-action="next"]').disabled = !complete;
  }

  function renderVisual(visual, helpers) {
    if (!visual) {
      return "";
    }

    if (visual.type === "emoji") {
      return '<div class="slide-visual emoji-visual" aria-hidden="true">' + helpers.escape(visual.emoji) + '</div>';
    }

    if (visual.type === "focus") {
      return '<div class="slide-visual focus-visual" aria-hidden="true">' + renderItems(visual.items, helpers) + '</div>';
    }

    if (visual.type === "scene") {
      return '<div class="slide-visual slide-scene" aria-hidden="true">' +
        '<div class="slide-zone"><span class="zone-mark">📍</span><div class="slide-zone-items">' + renderItems(visual.near, helpers) + '</div></div>' +
        '<div class="slide-zone"><span class="zone-mark">👈</span><div class="slide-zone-items">' + renderItems(visual.far, helpers) + '</div></div>' +
      '</div>';
    }

    if (visual.type === "here-there") {
      return '<div class="slide-visual concept-sketch" aria-hidden="true">' +
        '<div class="sketch-side"><strong>здесь</strong>' + stickman() + '<span class="sketch-pin">📍</span></div>' +
        '<div class="sketch-side"><strong>там</strong><span class="sketch-arrow">→</span></div>' +
      '</div>';
    }

    if (visual.type === "person-question") {
      return '<div class="slide-visual person-sketch" aria-hidden="true">' + stickman() + '<span class="sketch-mark">📍🗺️❓</span></div>';
    }

    if (visual.type === "self-here") {
      return '<div class="slide-visual person-sketch" aria-hidden="true">' + stickman() + '<span class="self-arrow">←</span><span class="sketch-pin">📍</span></div>';
    }

    if (visual.type === "you-there") {
      return '<div class="slide-visual concept-sketch" aria-hidden="true">' +
        '<div class="sketch-side">' + stickman() + '<span class="sketch-arrow">→</span></div>' +
        '<div class="sketch-side">' + stickman() + '<span class="sketch-mark">👈</span></div>' +
      '</div>';
    }

    return "";
  }

  function renderItems(items, helpers) {
    return (items || []).map(function (item) {
      return '<span>' + helpers.escape(item) + '</span>';
    }).join("");
  }

  function stickman() {
    return '<span class="stickman"><span></span><span></span><span></span><span></span></span>';
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderSlideLesson = renderSlideLesson;
}());
