# Markdown Rendering

Use this reference when implementing rich answer rendering for streamed LLM output.

## Rendering Pipeline

The MVP renders accumulated text through this conceptual pipeline:

```text
displayText
-> transform reasoning blocks
-> normalize math delimiters
-> transform Mermaid fences
-> markdown-it render
-> post-render Mermaid process
```

Keep this as a pipeline so features can be added or removed without changing provider adapters.

## Markdown And Code

The source project uses:

- `markdown-it` for Markdown
- `markdown-it-highlightjs` and `highlight.js` for code highlighting
- a custom pre-wrapper plugin for code language labels and copy buttons

For other projects, the important pattern is not the exact library. The reusable requirement is:

- render fenced code blocks with stable wrappers
- expose a copy action per code block
- register languages needed by the product
- keep code styling separate from stream parsing

## Math

The MVP supports KaTeX with:

- `@vscode/markdown-it-katex`
- `katex`
- delimiter normalization from `\(...\)` / `\[...\]` to Markdown-friendly `$...$` / `$$...$$`

When migrating, verify the target bundler handles KaTeX CSS and ESM/CJS package shape.

## Mermaid

The MVP uses `@nzoth/toolkit` for Mermaid Markdown transformation and SSE-friendly re-rendering.

Portable rule:

- transform Mermaid fences before Markdown render if the library needs placeholders
- after each visible text update, trigger Mermaid rendering again
- after abort or final completion, trigger one final Mermaid render
- ensure partially streamed Mermaid blocks do not break the page

## Reasoning Blocks

The MVP turns provider reasoning deltas into `<think>...</think>`, then renders them into a styled wrapper. When adapting:

- keep reasoning display optional
- sanitize or escape script tags inside reasoning content
- visually separate reasoning from final answer
- reset reasoning parser state after every request lifecycle

## Safety

The MVP enables raw HTML in Markdown. In production or user-generated contexts, decide explicitly whether to allow HTML. If allowing HTML, add sanitization with a library such as DOMPurify and test script injection, image URLs, and link targets.
