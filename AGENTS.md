# AGENTS

[Context]

- Project: chatgpt-vue3-light-mvp
- Stack: Vue 3, Vite 8, TypeScript, Pinia, Naive UI, UnoCSS
- Package manager: pnpm (see `packageManager` in `package.json`)
- Entry: `src/main.ts`, root HTML `index.html`
- Styling: UnoCSS + Sass
- Linting: ESLint (flat config), Stylelint

[Conventions]

- Prefer `<script setup lang="tsx">` in Vue SFCs.
- Keep changes small and follow existing project structure.
- Update docs when behavior changes.

[Local Skills]

- Project-local Skills live under `.agents/skills/`.
- `chatbot-mvp-distillation` distills this MVP into reusable architecture for other projects. Use it when designing or implementing similar streaming chatbot products, especially SSE/fetch streaming, model adapters, typewriter rendering, Markdown/code/math/Mermaid rendering, and migration checklists.
- `chatbot-mvp-distillation-zh` is the Chinese version of the same distillation. Prefer it for Chinese-first project handoff or implementation planning.
- Keep Skill resources concise and prefer `references/` for detailed architecture notes. Do not put Skill folders directly under `.agents/`; use `.agents/skills/<skill-name>/`.

[Commands]

- Install: `pnpm i`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Preview: `pnpm preview`
- Lint: `pnpm lint`
- Lint fix: `pnpm lint:fix`
- Stylelint: `pnpm stylelint`
- Stylelint fix: `pnpm stylelint:fix`
