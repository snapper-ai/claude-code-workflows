# Claude Code Workflows

A curated, evolving collection of **Claude Code workflows, subagents, slash commands, and configuration patterns** — designed to help you get better results faster with Claude Code.

This repo focuses on **practical, real-world setups**, inspired by how Claude Code is actually used in production, not just toy examples.

## What you'll find here

- ✅ Example **subagents** (verification, simplification, validation, etc.)
- ✅ Reusable **slash commands** for common inner-loop workflows
- ✅ Safe permission setups and hooks
- ✅ A minimal **demo app** for testing workflows
- ✅ Workflow examples you can fork and adapt

Everything here is meant to be:
- Easy to understand
- Easy to fork
- Easy to extend

## Getting Started

1. **Fork or clone this repo** as a starting point for your own workflows
2. **Copy the `.claude/` directory** into your project, or cherry-pick the commands and agents you want
3. **Customize the workflows** to match your stack and preferences
4. **Create your own `CLAUDE.md`** with project-specific instructions

### Using Slash Commands

Invoke commands in Claude Code by typing `/` followed by the command name:
- `/commit-push-pr` — Commit, push, and create a pull request
- `/security-check` — Scan for secrets and vulnerabilities
- `/create-agent` — Create a new subagent
- `/create-command` — Create a new slash command

### Using Subagents

Subagents are invoked automatically by Claude Code when relevant, or you can reference them in your prompts:
- `verify-app` — Runs tests, build, lint, and typecheck
- `code-simplifier` — Reviews recent changes for simplification opportunities

## Philosophy

Claude Code works best when:
- It has clear, repeatable workflows
- Verification is built into the loop
- Common tasks are automated, not re-prompted

This repo is about **encoding those habits into the tooling itself**.

## Attribution

> **Note:** These agents and commands are inspired by workflows shared by Boris Cherny (creator of Claude Code). They're designed as starting templates — customize them for your own projects.

## Living Repository

This is a **living repository** — we'll continue adding best practices, optimal configurations, and new subagents and slash commands as we discover what works well. Star and watch this repo to stay updated.

**Stay connected:**
- 📬 Newsletter: https://snapperai.io
- 🎥 YouTube: https://www.youtube.com/@snapperAI — Subscribe for tutorials and walkthroughs
- 𝕏 Twitter/X: https://x.com/SnapperAI — Follow for updates and tips
