---
name: chatbot-mvp-distillation
description: Distill the chatgpt-vue3-light-mvp project into reusable architecture for building similar ChatGPT-style web products in other repositories. Use when designing or implementing streaming chatbot UIs, SSE/fetch response pipelines, model adapter contracts, typewriter rendering, Markdown/code/KaTeX/Mermaid rendering, reasoning-block display, or migration plans inspired by this Vue 3 MVP.
---

# Chatbot MVP Distillation

Use this skill to borrow the architectural lessons from `chatgpt-vue3-light-mvp` without copying the project blindly.

The source project is a Vue 3 + Vite + TypeScript MVP for single-turn LLM chat. Its reusable ideas are:

- split model-specific streaming formats from UI rendering
- normalize model deltas into plain text chunks before display
- render text with a typewriter buffer so network speed and UI speed are decoupled
- process Markdown, code highlighting, math, Mermaid diagrams, and reasoning blocks as a rendering pipeline
- keep mock streams available so downstream projects can develop without real API keys

## Workflow

1. Identify the target project's framework, state management, and API boundary.
2. Read [references/architecture.md](references/architecture.md) for the reusable component boundaries.
3. Read [references/streaming-sse.md](references/streaming-sse.md) when implementing fetch/SSE/ReadableStream handling.
4. Read [references/model-adapters.md](references/model-adapters.md) when adding providers or normalizing response formats.
5. Read [references/markdown-rendering.md](references/markdown-rendering.md) when implementing rich answer rendering.
6. Read [references/migration-checklist.md](references/migration-checklist.md) before proposing or editing code in another project.

## Output Expectations

When using this skill in another project:

- describe the adapted architecture before editing code
- keep provider adapters independent from UI components
- define a small stream delta contract before implementing providers
- include a mock stream path for local development
- call out target-project changes that differ from the Vue MVP
- verify streaming, abort, completion, Markdown, code blocks, math, and Mermaid behavior when feasible

## Source Anchors

Use these files as source examples from this repository:

- `src/views/chat.vue` for input, model selection, reader lifecycle, and stop behavior
- `src/store/business/index.ts` for the service/store boundary that creates readers
- `src/components/MarkdownPreview/transform/index.ts` for SSE and JSON chunk splitting
- `src/components/MarkdownPreview/models/index.ts` for provider adapters and delta transforms
- `src/components/MarkdownPreview/index.vue` for typewriter rendering and completion state
- `src/components/MarkdownPreview/plugins/markdown.ts` for Markdown, KaTeX, Mermaid, and reasoning-block rendering
