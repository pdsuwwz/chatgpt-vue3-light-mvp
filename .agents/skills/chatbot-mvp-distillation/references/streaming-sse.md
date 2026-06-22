# Streaming And SSE

Use this reference when implementing streaming response rendering.

## Source Pattern

The MVP uses `fetch`, not `EventSource`, because chat completion APIs usually need POST bodies and auth headers.

Portable pipeline:

```ts
const reader = response.body
  ?.pipeThrough(new TextDecoderStream())
  .pipeThrough(splitStream('\n'))
  .getReader()
```

The splitter handles three common response styles:

- SSE lines such as `data: {...}` and `data: [DONE]`
- JSON or JSON-line payloads such as Ollama chat chunks
- plain text chunks for mock/local streams

## Chunk Rules

Implement stream splitting defensively:

- keep a buffer across `transform()` calls because JSON can arrive as half packets
- ignore empty lines
- strip the `data:` prefix only at the stream boundary
- preserve non-JSON text for mock streams
- treat `[DONE]` as completion, not display text
- surface keep-alive signals separately so the UI can show queue/wait state

## Abort And Completion

The UI lifecycle should distinguish:

- **abort**: user stops generation; cancel the reader, stop animation frames, clear pending state
- **network done**: reader has no more chunks; continue flushing the UI text buffer
- **render done**: buffer is empty and final Markdown render has completed
- **failed**: parsing or reader failure; reset parser state and expose retry UI

The source project uses `reader.cancel()` for abort, then resets parser state through `triggerModelTermination()`.

## Typewriter Buffer

Do not append every network chunk directly to rendered Markdown. Use two buffers:

- `textBuffer`: raw normalized text waiting to be displayed
- `displayText`: visible accumulated answer

On each animation frame, move a small slice from `textBuffer` to `displayText`. This keeps fast provider bursts from causing visible jumps and gives slow providers a consistent typing effect.

## Verification Checklist

Test these cases in the target project:

- provider sends `data: [DONE]`
- provider sends keep-alive lines before content
- provider sends multiple JSON objects in one chunk
- provider splits one JSON object across chunks
- user aborts before the first content chunk
- user aborts while Markdown or Mermaid output is partially written
- stream completes while `textBuffer` still contains pending text
