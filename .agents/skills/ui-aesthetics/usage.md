# Usage Patterns

This repository ships one shared knowledge base plus platform-specific entrypoints.

## Common request shapes

- **Generation**: “Make this dashboard feel cleaner and more product-grade without changing the information density.”
- **Review**: “Explain why this page feels generic and list the highest-impact fixes.”
- **Refactor**: “Rewrite this settings panel so it feels calmer, more precise, and less template-like.”
- **Component polish**: “Improve the buttons, cards, and table states without redesigning the page.”
- **State / motion**: “Tighten hover, focus, selected, loading, and success behavior.”
- **Depth / lighting**: “Fix the dark-mode layering and shadow logic so the UI stops feeling foggy.”

## Platform entrypoints in this repo

- **Codex**: `.codex/skills/ui-aesthetics/`
- **Claude Code**: `.claude/skills/ui-aesthetics/`
- **OpenCode**: `.opencode/skills/ui-aesthetics/` and `.opencode/commands/ui-aesthetics.md`
- **Cursor**: `.cursor/rules/ui-aesthetics.mdc`
- **Windsurf**: `.windsurf/skills/ui-aesthetics/` and `.windsurf/workflows/ui-aesthetics.md`
- **Gemini CLI**: `.gemini/skills/ui-aesthetics/`
- **Qoder**: `.qoder/skills/ui-aesthetics/`
- **Kiro**: `.kiro/steering/ui-aesthetics.md`
- **GitHub Copilot**: `.github/prompts/ui-aesthetics.prompt.md`
- **Shared aliases / compatibility**: `.agents/skills/`, `.agent/workflows/`, `.roo/commands/`, `.codebuddy/commands/`

## Expected output shape

A good invocation should usually produce:

1. the route (`generation`, `review`, `refactor`, etc.)
2. a short visual thesis (`quiet precision`, `enterprise polish`, `calm product clarity`, etc.)
3. the highest-impact structural corrections first
4. component/state/color/depth/motion refinements only after structure is stable
5. concise, actionable guidance or implementation-ready edits

## Good guardrails to preserve

- keep requested scope unchanged
- preserve copy footprint unless asked otherwise
- avoid fake luxury cues, decorative glow, and choreography-heavy motion
- prefer balanced layouts over forced asymmetry