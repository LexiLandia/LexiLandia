(function () {
  "use strict";

  function renderSlideLesson(options) {
    var root = options.root;
    var task = options.task;
    var helpers = options.helpers;
    var answered = {};
    var questions = task.questions || [];
    var currentQuestionIndex = 0;
    var hasCopy = isCopyTask(task);
    var hasQuestions = Boolean(questions.length);
    var isTask = hasQuestions || hasCopy;
    var hasAudio = Boolean(task.audio && (!Array.isArray(task.audio) || task.audio.length));

    root.innerHTML =
      '<section class="stage-card slide-card ' + (isTask ? "task-card" : "info-card") + '">' +
        '<div class="mode-badge ' + (isTask ? "task-badge" : "info-badge") + '">' +
          (isTask ? "&#10067; &#1042;&#1099;&#1073;&#1077;&#1088;&#1080;" : "&#8505;&#65039; &#1057;&#1084;&#1086;&#1090;&#1088;&#1080;") +
        '</div>' +
        renderSlideContent(task, helpers) +
        '<div id="slide-feedback" class="feedback" aria-live="polite"></div>' +
        '<div id="slide-questions" class="slide-questions"></div>' +
      '</section>' +
      '<div class="button-row slide-nav">' +
        (hasAudio ? '<button class="secondary-button" type="button" data-action="listen">▶️ Слушать</button>' : '<span></span>') +
        '<button class="primary-button" type="button" data-action="next"' + (isTask ? " disabled" : "") + '>Дальше</button>' +
      '</div>';

    bindReveal(root, task, helpers);
    bindReading(root);
    bindOptionalImages(root);
    bindCopy(root, task, helpers);
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
        var meaning = normalizeMeaning(meanings[key], key);
        return '<button class="read-word" type="button"' +
          ' data-word="' + helpers.escape(meaning.word || key) + '"' +
          ' data-emoji="' + helpers.escape(meaning.emoji || "") + '"' +
          ' data-translation="' + helpers.escape(meaning.translation || "") + '"' +
          ' data-image="' + helpers.escape(meaning.image || "") + '">' +
          helpers.escape(part) +
        '</button>';
      }
      return helpers.escape(part);
    }).join("");
  }

  function normalizeMeaning(value, fallbackWord) {
    if (typeof value === "string") {
      return {
        word: fallbackWord,
        emoji: value,
        translation: "",
        image: ""
      };
    }

    return {
      word: value.word || value.text || fallbackWord,
      emoji: value.emoji || "",
      translation: value.translation || value.meaning || "",
      image: value.image || ""
    };
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
        var word = button.getAttribute("data-word") || button.textContent || "";
        var emoji = button.getAttribute("data-emoji") || "";
        var translation = button.getAttribute("data-translation") || "";
        var image = button.getAttribute("data-image") || "";

        feedback.textContent = "";

        var card = document.createElement("div");
        card.className = "word-popover";

        var title = document.createElement("strong");
        title.className = "word-popover-word";
        title.textContent = word;
        card.appendChild(title);

        if (emoji) {
          var emojiNode = document.createElement("span");
          emojiNode.className = "word-popover-emoji";
          emojiNode.setAttribute("aria-hidden", "true");
          emojiNode.textContent = emoji;
          card.appendChild(emojiNode);
        }

        if (translation) {
          var translationNode = document.createElement("span");
          translationNode.className = "word-popover-meaning";
          translationNode.textContent = translation;
          card.appendChild(translationNode);
        }

        if (image) {
          var imageNode = document.createElement("img");
          imageNode.className = "word-popover-image";
          imageNode.src = image;
          imageNode.alt = word;
          imageNode.addEventListener("error", function () {
            imageNode.remove();
          });
          card.appendChild(imageNode);
        }

        feedback.appendChild(card);
        Array.prototype.forEach.call(root.querySelectorAll(".read-word"), function (item) {
          item.classList.remove("is-open");
        });
        button.classList.add("is-open");
      });
    });
  }

  function bindOptionalImages(root) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-optional-image]"), function (image) {
      image.addEventListener("error", function () {
        image.hidden = true;
      });
    });
  }

  function bindCopy(root, task, helpers) {
    if (!isCopyTask(task)) {
      return;
    }

    var box = root.querySelector("[data-copy-target]");
    var input = root.querySelector("[data-copy-input]");
    var button = root.querySelector("[data-copy-check]");
    var feedback = root.querySelector("[data-copy-feedback]");
    var nextButton = root.querySelector('[data-action="next"]');

    if (!box || !input || !button || !feedback || !nextButton) {
      return;
    }

    function check() {
      var target = box.getAttribute("data-copy-target") || "";
      var isCorrect = normalizeCopy(input.value) === normalizeCopy(target);

      if (isCorrect) {
        var success = helpers.playFeedback("success");
        feedback.className = "copy-feedback good";
        feedback.textContent = success.text || "✅ Отлично";
        input.disabled = true;
        button.disabled = true;
        nextButton.disabled = false;
        return;
      }

      var retry = helpers.playFeedback("retry");
      feedback.className = "copy-feedback try";
      feedback.textContent = retry.text || "↩️ Ещё раз";
    }

    button.addEventListener("click", check);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        check();
      }
    });
    input.addEventListener("input", function () {
      feedback.className = "copy-feedback";
      feedback.textContent = "";
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
          if (question.mode === "reading-check") {
            feedback.textContent = question.correctFeedback || "Yes";
            window.setTimeout(onDone, 520);
            return;
          }
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
        if (question.mode === "reading-check") {
          feedback.textContent = question.wrongFeedback || "Look again 👀";
          return;
        }
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

    if (visual.type === "letter-card") {
      return '<div class="slide-visual letter-card-visual" aria-hidden="true">' +
        '<div class="big-letter-pair">' + helpers.escape(visual.upper) + " " + helpers.escape(visual.lower) + '</div>' +
        '<div class="letter-card-emoji">' + helpers.escape(visual.emoji || "") + '</div>' +
      '</div>';
    }

    if (visual.type === "syllable-grid") {
      return '<div class="slide-visual syllable-grid" aria-hidden="true">' +
        (visual.items || []).map(function (item) {
          return '<span class="syllable-chip">' + helpers.escape(item) + '</span>';
        }).join("") +
      '</div>';
    }

    if (visual.type === "word-list") {
      if (!visual.items || !visual.items.length) {
        return "";
      }

      return '<div class="slide-visual word-card-grid" aria-hidden="true">' +
        visual.items.map(function (item) {
          if (typeof item === "string") {
            return '<span class="word-card">' + helpers.escape(item) + '</span>';
          }
          return '<span class="word-card"><span>' + helpers.escape(item.emoji || "") + '</span><strong>' + helpers.escape(item.text || "") + '</strong></span>';
        }).join("") +
      '</div>';
    }

    if (visual.type === "image-cards") {
      if (!visual.items || !visual.items.length) {
        return "";
      }

      return '<div class="slide-visual image-card-grid" aria-hidden="true">' +
        visual.items.map(function (item) {
          return '<span class="image-word-card">' +
            (item.image ? '<img class="image-card-img" src="' + helpers.escape(item.image) + '" alt="" data-optional-image>' : "") +
            '<span class="image-card-emoji">' + helpers.escape(item.emoji || "") + '</span>' +
            '<strong class="image-card-label">' + helpers.escape(item.text || "") + '</strong>' +
          '</span>';
        }).join("") +
      '</div>';
    }

    if (visual.type === "copy-line") {
      return '<div class="slide-visual reading-copy-box" data-copy-target="' + helpers.escape(visual.text || "") + '">' +
        '<p class="copy-original">' + helpers.escape(visual.text || "") + '</p>' +
        '<input class="copy-input" data-copy-input type="text" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Напиши здесь">' +
        '<button class="secondary-button copy-check-button" type="button" data-copy-check>Проверить</button>' +
        '<div class="copy-feedback" data-copy-feedback aria-live="polite"></div>' +
      '</div>';
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

  function isCopyTask(task) {
    return Boolean(task.visual && task.visual.type === "copy-line");
  }

  function normalizeCopy(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.!?]+$/g, "")
      .toLowerCase();
  }

  window.LexiLandGames = window.LexiLandGames || {};
  window.LexiLandGames.renderSlideLesson = renderSlideLesson;
}());
