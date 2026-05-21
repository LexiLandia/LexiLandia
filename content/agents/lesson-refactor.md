# LexiForge Agent: Lesson Refactor

Goal: improve one existing generated lesson source without changing its ids.

Rules:
- preserve lesson id;
- preserve unit ids unless asked;
- do not touch other lessons;
- keep progress compatibility when possible;
- make smaller, clearer tasks;
- improve audio paths and speechText.

Output:
- patch-style summary or complete replacement for one source file.
