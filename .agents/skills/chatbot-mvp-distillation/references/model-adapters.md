# Model Adapters

Use this reference when adding LLM providers or designing the provider abstraction.

## Adapter Responsibility

A model adapter owns:

- display label and stable model id
- request URL and method
- provider-specific headers and auth
- request body shape
- streaming flag
- chunk transformation into the shared delta contract

The renderer owns none of these.

## Common Provider Shapes

### OpenAI-compatible SSE

Providers such as DeepSeek, Spark, SiliconFlow, and Moonshot commonly stream:

```json
{"choices":[{"delta":{"content":"text"}}]}
```

Transform to:

```ts
{ content: stream.choices[0].delta.content || '' }
```

### Reasoning Models

DeepSeek reasoning-style responses may stream:

```json
{"choices":[{"delta":{"reasoning_content":"thinking","content":null}}]}
```

The source project wraps reasoning chunks in `<think>...</think>` and closes the block when normal content begins.

Portable rule:

- when reasoning starts, emit an opening reasoning marker
- append reasoning text while present
- when answer content starts, emit a closing marker and then normal content
- reset the reasoning parser after completion, abort, or failure

### Ollama JSON Lines

Ollama chat can stream plain JSON objects with message content:

```json
{"message":{"content":"text"},"done":false}
```

Transform to:

```ts
stream.done ? { done: true } : { content: stream.message.content }
```

### Mock Streams

Keep a mock adapter that returns a `ReadableStream` from fixture text. This is useful for UI development, tests, demos, and CI environments without API keys.

## Provider Mapping

Prefer a single mapping:

```ts
const modelAdapters: ChatModelAdapter[] = [
  mockAdapter,
  deepSeekAdapter,
  ollamaAdapter
]
```

The selected adapter should be resolved by id. Avoid provider-specific branches in the chat screen.

## Security Notes

The source project is a frontend MVP. For production systems, avoid exposing provider API keys in browser bundles. Prefer a backend route, serverless function, edge function, or trusted proxy that injects credentials server-side.
