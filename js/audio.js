const USE_TTS_FALLBACK = false;

(function () {
  "use strict";

  var currentAudio = null;
  var currentRequest = null;

  function playAudio(path, text, onMissing) {
    stopAudio();

    currentRequest = {
      path: path,
      text: text || "",
      onMissing: onMissing
    };

    if (!path) {
      handleMissing(currentRequest);
      return Promise.resolve(false);
    }

    return new Promise(function (resolve) {
      var settled = false;
      var audio = new Audio(path);
      currentAudio = audio;
      audio.preload = "auto";

      function finish(value) {
        if (settled) {
          return;
        }
        settled = true;
        resolve(value);
      }

      audio.addEventListener("ended", function () {
        finish(true);
      });

      audio.addEventListener("error", function () {
        handleMissing(currentRequest);
        finish(false);
      });

      audio.play().then(function () {
        finish(true);
      }).catch(function () {
        handleMissing(currentRequest);
        finish(false);
      });
    });
  }

  function replayCurrent() {
    if (!currentRequest) {
      return Promise.resolve(false);
    }
    return playAudio(currentRequest.path, currentRequest.text, currentRequest.onMissing);
  }

  function stopAudio() {
    if (!currentAudio) {
      return;
    }
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  function handleMissing(request) {
    if (request && typeof request.onMissing === "function") {
      request.onMissing("Аудио скоро будет");
    }

    if (USE_TTS_FALLBACK && request && request.text) {
      speakForTesting(request.text);
    }
  }

  function speakForTesting(text) {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }

  window.LexiLandAudio = {
    playAudio: playAudio,
    replayCurrent: replayCurrent,
    stopAudio: stopAudio
  };
}());
