# LexiForge Agent: Audio QA

Goal: inspect audio plan quality.

Checks:
- all new words have audio;
- letters and syllables use slow rate;
- words are slow enough;
- lists/readings use `speechText` pauses;
- feedback audio is not cut off;
- no missing files before publish.

Output:
- audio path;
- problem;
- suggested `rate` or `speechText`.
