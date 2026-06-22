# Architecture

Use this reference to adapt the MVP into another application architecture.

## Reusable Boundary

The source project is best understood as five layers:

1. **Chat screen**: owns user input, selected model, loading state, start/stop commands, and focus behavior.
2. **Conversation service/store**: calls the selected model adapter, converts the response body into a reader, and exposes errors.
3. **Model adapters**: know provider URLs, request payloads, auth headers, and provider-specific delta formats.
4. **Stream transform pipeline**: decodes bytes, splits SSE or JSON-line chunks, and emits parseable units.
5. **Answer renderer**: reads chunks, normalizes deltas into text, buffers output, renders Markdown, and manages completion UI.

This boundary is more reusable than the exact Vue component layout. In another project, keep the same responsibilities even if the framework changes.

## Recommended Contract

Define a provider adapter contract before writing UI code:

```ts
interface ChatModelAdapter {
  label: string
  id: string
  fetchStream: (input: string) => Promise<Response>
  transformChunk: (chunk: string | Uint8Array, decoder: TextDecoder) => {
    content?: string
    done?: boolean
    isWaitQueuing?: boolean
  }
}
```

The UI should not parse provider-specific response schemas. It should only consume `content`, `done`, and optional UI flags such as `isWaitQueuing`.

## State Flow

The portable flow is:

```text
input submit
-> selected adapter.fetchStream(input)
-> response.body
-> TextDecoderStream
-> stream splitter
-> reader
-> adapter.transformChunk
-> text buffer
-> display text
-> Markdown renderer
```

Keep network reading and visual typing separate. The source project stores incoming content in `textBuffer`, then moves small slices into `displayText` via `requestAnimationFrame`.

## What To Reuse

Reuse these ideas:

- a provider mapping array instead of scattered provider conditionals
- one stream reader path for mock and real providers
- explicit abort/reset lifecycle
- a renderer component that only receives a reader and transform function
- local mock stream for development and demos

Avoid copying these blindly:

- provider secrets in frontend-only production deployments
- fixed provider URLs and proxy prefixes
- UI copy, model labels, and single-turn-only assumptions
- framework-specific refs/exposes if the target project is not Vue
