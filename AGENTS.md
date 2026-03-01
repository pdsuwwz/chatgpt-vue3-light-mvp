# AGENTS

[Context]

- Project: chatgpt-vue3-light-mvp
- Stack: Vue 3, Vite 6/7, TypeScript, Pinia, Naive UI, UnoCSS
- Package manager: pnpm (see `packageManager` in `package.json`)
- Entry: `src/main.ts`, root HTML `index.html`
- Styling: UnoCSS + Sass
- Linting: ESLint (flat config), Stylelint

[Conventions]

- Prefer `<script setup lang="tsx">` in Vue SFCs.
- Keep changes small and follow existing project structure.
- Update docs when behavior changes.

[Commands]

- Install: `pnpm i`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Preview: `pnpm preview`
- Lint: `pnpm lint`
- Lint fix: `pnpm lint:fix`
- Stylelint: `pnpm stylelint`
- Stylelint fix: `pnpm stylelint:fix`
