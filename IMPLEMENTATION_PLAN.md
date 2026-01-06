# Implementation Plan: Claude Code Workflows Repository

## Overview

This repository provides template workflows (slash commands, subagents, hooks, permissions) inspired by Boris Cherny's Claude Code workflow, shared for a tutorial video.

**Goal:** Create a minimal but complete demo repository that viewers can fork and customize.

---

## Files to Create (in order)

### Phase 1: Slash Commands

#### 1. `.claude/commands/commit-push-pr.md`
Boris's "inner loop" example. Automates: stage → commit → push → create PR.

```markdown
# Commit, Push, and Create PR

Stage all changes, create a commit with a descriptive message, push to the current branch, and open a pull request.

## Instructions
1. Run `git status` to see all changes
2. Stage relevant files with `git add`
3. Create a commit with a clear, descriptive message following conventional commits
4. Push to the current branch
5. Create a pull request with a summary of changes

## Notes
- Do not push to main/master directly
- Include a clear PR description summarizing the changes
```

#### 2. `.claude/commands/create-command.md`
Meta command to create new slash commands.

```markdown
# Create a New Slash Command

Help the user create a new slash command for their workflow.

## Instructions
1. Ask the user what workflow they want to automate
2. Ask what they want to name the command
3. Create a new file at `.claude/commands/[name].md`
4. Include clear instructions for Claude to follow
5. Suggest the user test the command

## Best Practices to Include
- Keep commands focused on one workflow
- Include step-by-step instructions
- Add notes for edge cases
- Commands should be reusable across projects when possible
```

#### 3. `.claude/commands/create-agent.md`
Meta command to create new subagents.

```markdown
# Create a New Subagent

Help the user create a new subagent for their workflow.

## Instructions
1. Ask the user what role the agent should play
2. Ask what they want to name the agent
3. Create a new file at `.claude/agents/[name].md`
4. Define the agent's role clearly (role-based, not task-based)
5. Include guidance on when to invoke this agent

## Best Practices to Include
- Agents are role-based (who they are) not task-based (what they do once)
- Keep the role focused and specific
- Include clear success criteria
- Agents should validate/verify output, not just produce it
```

---

### Phase 2: Subagents

#### 4. `.claude/agents/code-simplifier.md`
Simplifies code after Claude is done working.

```markdown
# Code Simplifier Agent

You are a code simplification specialist. Your role is to review code that was just written or modified and simplify it without changing functionality.

## Your Role
- Review recent changes for unnecessary complexity
- Simplify verbose or redundant code
- Improve readability
- Remove dead code or unused imports
- Ensure code follows DRY principles

## What NOT to Do
- Do not change functionality
- Do not add new features
- Do not refactor architecture
- Do not modify code outside the recent changes

## Process
1. Identify the files that were recently modified
2. Review each file for simplification opportunities
3. Make focused, minimal changes
4. Verify the code still works (run tests if available)
5. Summarize what was simplified
```

#### 5. `.claude/agents/verify-app.md`
End-to-end verification of the application.

```markdown
# Application Verification Agent

You are a verification specialist. Your role is to verify that the application works correctly after changes have been made.

## Your Role
- Run the test suite and ensure all tests pass
- Verify the application builds successfully
- Check for type errors and linting issues
- Validate that the changes work as intended

## Verification Steps
1. Run `npm test` (or equivalent) - all tests must pass
2. Run `npm run build` - build must succeed
3. Run `npm run lint` - no linting errors
4. Run `npm run typecheck` (if available) - no type errors

## Reporting
- If all checks pass: Report success with a summary
- If any check fails: Report the specific failure and suggest fixes
- Do not mark verification as complete until ALL checks pass

## Important
This agent verifies, it does not fix. If issues are found, report them clearly so they can be addressed.
```

#### 6. `.claude/agents/build-validator.md`
Validates builds pass before considering work done.

```markdown
# Build Validator Agent

You are a build validation specialist. Your role is to ensure the project builds successfully and is ready for CI/CD.

## Your Role
- Validate the project builds without errors
- Check for TypeScript/compilation errors
- Ensure no breaking changes to the build process
- Verify build output is correct

## Validation Steps
1. Run `npm run build` (or equivalent build command)
2. Check for any build errors or warnings
3. Verify build artifacts are created correctly
4. Run type checking if available

## Success Criteria
- Build completes with exit code 0
- No TypeScript errors
- No critical warnings
- Build artifacts exist in expected location

## On Failure
Report the exact error and the file/line where it occurred. Do not attempt to fix - just report clearly.
```

---

### Phase 3: Configuration

#### 7. `.claude/settings.json`
Permissions for safe autonomy.

```json
{
  "permissions": {
    "allow": [
      "npm test",
      "npm run build",
      "npm run lint",
      "npm run format",
      "npm run typecheck",
      "git status",
      "git diff",
      "git log"
    ]
  }
}
```

#### 8. `examples/hooks/post-tool-use-formatter.json`
Example hook for auto-formatting.

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "npm run format || true"
        }
      ]
    }
  ]
}
```

---

### Phase 4: Project Context

#### 9. `CLAUDE.md`
Project context for Claude Code.

```markdown
# Claude Code Workflows

This repository contains example workflows, subagents, and slash commands for Claude Code.

## Purpose
- Provide templates for common Claude Code workflows
- Demonstrate slash commands, subagents, hooks, and permissions
- Serve as a starting point for users to fork and customize

## Structure
- `.claude/commands/` - Slash commands for common workflows
- `.claude/agents/` - Subagents for role-based automation
- `.claude/settings.json` - Permission configuration
- `examples/hooks/` - Example hook configurations
- `demo-app/` - Minimal Next.js app for testing workflows

## Demo App
The demo-app is a minimal Next.js application used to demonstrate the workflows. It includes:
- Simple utility functions
- Tests for verification
- Build and lint scripts

## Attribution
Workflows inspired by Boris Cherny's Claude Code workflow.
```

---

### Phase 5: Demo Application

#### 10. `demo-app/package.json`

```json
{
  "name": "demo-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "prettier": "^3.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "vitest": "^1.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

#### 11. `demo-app/tsconfig.json`
Standard Next.js TypeScript config.

#### 12. `demo-app/next.config.js`
Minimal Next.js config.

#### 13. `demo-app/src/app/layout.tsx`
Basic Next.js layout.

#### 14. `demo-app/src/app/page.tsx`
Simple home page.

#### 15. `demo-app/src/lib/utils.ts`
Simple utility functions (intentionally slightly verbose for code-simplifier demo).

```typescript
// Example utilities - intentionally verbose for demo purposes

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount === null || amount === undefined) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  const result = formatter.format(amount);
  return result;
}

export function calculateTotal(items: { price: number; quantity: number }[]): number {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemTotal = item.price * item.quantity;
    total = total + itemTotal;
  }

  return total;
}

export function isValidEmail(email: string): boolean {
  if (!email) {
    return false;
  }

  if (email.length === 0) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return isValid;
}
```

#### 16. `demo-app/__tests__/utils.test.ts`
Tests for the utilities.

```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateTotal, isValidEmail } from '../src/lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('handles decimals', () => {
    expect(formatCurrency(99.99)).toBe('$99.99');
  });

  it('returns empty string for null/undefined', () => {
    expect(formatCurrency(null as any)).toBe('');
  });
});

describe('calculateTotal', () => {
  it('calculates total correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35);
  });

  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});

describe('isValidEmail', () => {
  it('validates correct email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});
```

#### 17. `demo-app/vitest.config.ts`
Vitest configuration.

#### 18. Additional config files
- `demo-app/.eslintrc.json`
- `demo-app/.prettierrc`

---

## Build Order Summary

1. Create directory structure
2. `.claude/commands/commit-push-pr.md`
3. `.claude/commands/create-command.md`
4. `.claude/commands/create-agent.md`
5. `.claude/agents/code-simplifier.md`
6. `.claude/agents/verify-app.md`
7. `.claude/agents/build-validator.md`
8. `.claude/settings.json`
9. `examples/hooks/post-tool-use-formatter.json`
10. `CLAUDE.md`
11. Demo app files (package.json first, then rest)
12. Update `README.md` with attribution note

---

## After Building

1. Run `cd demo-app && npm install`
2. Run `npm test` to verify tests pass
3. Run `npm run build` to verify build works
4. Commit all files
5. Push to branch `claude/claude-code-workflow-tutorial-4ZyNL`
