# Context Guide: Claude Code Workflows Tutorial

This document provides full context for building this repository. Read this before starting implementation.

---

## Project Purpose

This repository is being created for a **YouTube tutorial video** about advanced Claude Code workflows. The video is Part 2 of a series, covering:

1. Slash Commands - automating the "inner loop"
2. Subagents - scaling common workflows
3. Verification loops - giving Claude feedback
4. Hooks - handling the last 10% automatically
5. Permissions - safe autonomy

---

## Source Material

The workflows are **inspired by Boris Cherny's Twitter/X thread** (Boris is the creator of Claude Code). He shared:

- **Slash commands** in `.claude/commands/` (example: `/commit-push-pr`)
- **Subagents** in `.claude/agents/` (examples: `code-simplifier`, `verify-app`, `build-validator`, `code-architect`, `oncall-guide`)
- **PostToolUse hooks** for formatting code automatically
- **Verification philosophy**: "Give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."

**Important:** We do NOT have Boris's exact file contents. We are creating **template versions** based on the names and purposes he shared. This is intentional - the specific implementation should be tailored to each project.

### Attribution Line for README

> **Note:** These agents and commands are inspired by workflows shared by Boris Cherny (creator of Claude Code). They're designed as starting templates — customize them for your own projects.

---

## Key Decisions Made

### Technology Choices
- **Demo app**: TypeScript + Next.js (most accessible to viewers)
- **Testing**: Vitest (modern, fast)
- **Formatting**: Prettier

### Content Scope
- **Slash commands**: 3 total
  - `commit-push-pr.md` - Boris's example
  - `create-command.md` - Meta creator (high value for forking)
  - `create-agent.md` - Meta creator (high value for forking)

- **Subagents**: 3 total (from Boris's list)
  - `code-simplifier.md`
  - `verify-app.md`
  - `build-validator.md`

- **Demo app**: Minimal but runnable
  - Must build successfully
  - Must have passing tests
  - Must have lint/format scripts
  - Utils are intentionally slightly verbose (for code-simplifier demo)

---

## Video Outline (for context)

The tutorial covers:

1. **Intro** (~1 min) - Position as Part 2, set scope
2. **Slash Commands** (~4-5 min) - Show folder, open commit-push-pr, mention meta creators
3. **Subagents** (~5-6 min) - Show folder, open code-simplifier, explain role-based thinking
4. **Verification Loops** (~4-5 min) - Philosophy discussion, reference verify-app
5. **Hooks** (~1-1.5 min) - Show PostToolUse formatter example
6. **Permissions** (~1-1.5 min) - Show settings.json, explain pre-approvals
7. **Outro** (~1 min) - Recap, tease future videos

Target length: 18-22 minutes

---

## Philosophy to Embed

### Slash Commands
- Replace repeated prompting
- Automate "inner loop" workflows you do daily
- Checked into git, shareable with team
- Claude can invoke them itself

### Subagents
- **Role-based**, not task-based
- They are "who they are", not "what they do once"
- Used to refine and validate after Claude does the main work
- Think: "Claude does the work, subagents refine and validate it"

### Verification
- Most important concept from Boris's thread
- Claude needs a way to verify its own output
- Verification varies by domain: tests, bash commands, browser checks, simulators
- "Without verification, Claude guesses. With verification, it improves."

### Hooks
- Handle the "last 10%" automatically
- Prevent CI failures from formatting issues
- Run after tool use (PostToolUse)
- Keep it simple: `npm run format || true`

### Permissions
- Avoid `--dangerously-skip-permissions`
- Pre-approve known-safe commands
- Move faster without losing control

---

## Repository Structure

```
claude-code-workflows/
├── README.md                              # Update with attribution
├── CLAUDE.md                              # Project context
├── IMPLEMENTATION_PLAN.md                 # This plan (can delete after)
├── CONTEXT_GUIDE.md                       # This guide (can delete after)
│
├── .claude/
│   ├── commands/
│   │   ├── commit-push-pr.md              # Inner loop automation
│   │   ├── create-command.md              # Meta: create new commands
│   │   └── create-agent.md                # Meta: create new agents
│   │
│   ├── agents/
│   │   ├── code-simplifier.md             # Simplify code after work
│   │   ├── verify-app.md                  # E2E verification
│   │   └── build-validator.md             # Build validation
│   │
│   └── settings.json                      # Permissions
│
├── examples/
│   └── hooks/
│       └── post-tool-use-formatter.json   # Hook example
│
└── demo-app/                              # Minimal Next.js app
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── vitest.config.ts
    ├── .eslintrc.json
    ├── .prettierrc
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   └── lib/
    │       └── utils.ts                   # Utilities (slightly verbose)
    └── __tests__/
        └── utils.test.ts                  # Tests for utils
```

---

## Git Information

- **Branch to use**: `claude/claude-code-workflow-tutorial-4ZyNL`
- **Remote**: `origin` → `git@github.com:snapper-ai/claude-code-workflows.git`
- **After building**: Commit all files and push to the branch above

---

## Quality Checklist

Before considering the build complete:

- [ ] All slash commands created in `.claude/commands/`
- [ ] All subagents created in `.claude/agents/`
- [ ] Settings and hooks examples created
- [ ] CLAUDE.md created
- [ ] Demo app created with all config files
- [ ] `npm install` succeeds in demo-app
- [ ] `npm test` passes in demo-app
- [ ] `npm run build` succeeds in demo-app
- [ ] README.md updated with attribution
- [ ] All files committed
- [ ] Pushed to correct branch

---

## Notes for Implementation

1. **Create directories first** before writing files to them
2. **Demo app utils should be slightly verbose** - this gives the code-simplifier something to improve
3. **Tests should pass** - verification agents need green tests to demonstrate
4. **Keep files focused** - don't over-engineer, this is a demo/template repo
5. **Meta creators (create-command, create-agent) are high value** - they encourage forking and customization

---

## Prompt to Start CLI Session

When starting the CLI session, you can say:

> "Read IMPLEMENTATION_PLAN.md and CONTEXT_GUIDE.md, then build all the files according to the plan. Use accept-edits mode. After building, run npm install and verify tests pass, then commit and push."

Or simply:

> "Build this repo according to the implementation plan."
