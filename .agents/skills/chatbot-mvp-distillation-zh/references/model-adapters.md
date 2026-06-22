# 模型适配器

增加 LLM 供应商或设计供应商抽象时阅读这份参考。

## 适配器职责

模型适配器负责：

- 展示标签和稳定模型 id
- 请求 URL 和 method
- 供应商特有 headers 和鉴权
- 请求体结构
- stream 开关
- 把 chunk 转换成共享 delta 契约

渲染器不负责这些内容。

## 常见供应商响应形态

### OpenAI 兼容 SSE

DeepSeek、Spark、SiliconFlow、Moonshot 等供应商通常会流式返回：

```json
{"choices":[{"delta":{"content":"text"}}]}
```

转换为：

```ts
{ content: stream.choices[0].delta.content || '' }
```

### 推理模型

DeepSeek 推理类响应可能返回：

```json
{"choices":[{"delta":{"reasoning_content":"thinking","content":null}}]}
```

源项目会把推理 chunk 包成 `<think>...</think>`，并在普通回答内容开始时关闭该块。

可迁移规则：

- 推理开始时，输出推理块开始标记
- 持续追加 reasoning 文本
- 当答案正文开始时，输出推理块结束标记，再输出正常内容
- 在完成、停止或失败后重置推理 parser

### Ollama JSON Lines

Ollama chat 可以流式返回带 message content 的普通 JSON 对象：

```json
{"message":{"content":"text"},"done":false}
```

转换为：

```ts
stream.done ? { done: true } : { content: stream.message.content }
```

### Mock Streams

保留一个 Mock 适配器，用 fixture 文本构造 `ReadableStream`。这对 UI 开发、测试、演示和无 API Key 的 CI 环境都很有用。

## 供应商映射

优先使用单一映射：

```ts
const modelAdapters: ChatModelAdapter[] = [
  mockAdapter,
  deepSeekAdapter,
  ollamaAdapter
]
```

根据 id 解析当前选中的适配器。避免在聊天页面里写供应商特有分支。

## 安全说明

源项目是纯前端 MVP。生产系统不要把供应商 API Key 暴露在浏览器 bundle 中。优先使用后端路由、Serverless Function、Edge Function 或可信代理，在服务端注入凭据。
