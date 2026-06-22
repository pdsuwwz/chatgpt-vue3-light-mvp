# Migration Checklist

Use this checklist before implementing a similar chatbot in another project.

## Product Scope

- Decide single-turn or multi-turn conversation.
- Decide whether reasoning content is shown, hidden, or collapsible.
- Decide whether answers need Markdown, code copy, math, and Mermaid.
- Decide whether model switching is user-facing or config-only.

## Technical Boundary

- Define the adapter contract.
- Add a mock stream adapter first.
- Keep provider response parsing outside UI components.
- Keep stream splitting outside provider request code.
- Keep Markdown rendering outside model adapters.

## Runtime And Security

- Use a backend/proxy for API keys in production.
- Define CORS and proxy behavior for local development.
- Support request abort.
- Reset parser state after abort, failure, and completion.
- Handle provider rate-limit or queue keep-alive messages.

## UI Behavior

- Disable submit or convert it to stop while streaming.
- Preserve focus after completion or failure.
- Continue flushing display buffer after network completion.
- Auto-scroll only when the user is near the bottom.
- Show empty, waiting, streaming, completed, failed, and aborted states.
- Provide copy support for full answer and code blocks.

## Rendering Verification

- Plain text stream renders incrementally.
- OpenAI-compatible SSE renders correctly.
- JSON-line stream renders correctly.
- Reasoning content opens and closes cleanly.
- Markdown lists and tables render correctly.
- Code blocks include language labels and copy actions.
- KaTeX inline and block math render correctly.
- Mermaid diagrams render after incremental updates.
- Abort works during plain text, code block, math, and Mermaid output.
