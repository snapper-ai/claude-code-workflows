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
