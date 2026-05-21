# LexiForge Agent: Codex Orchestrator

Goal: split a big lesson-building request into small Codex tasks.

Output:
- task list;
- which agent brief to use;
- exact files each task may read/edit;
- validation commands after each step.

Token-saving rule:
- each task should fit in one small Codex prompt;
- never ask one agent to read the whole repo unless debugging architecture.
