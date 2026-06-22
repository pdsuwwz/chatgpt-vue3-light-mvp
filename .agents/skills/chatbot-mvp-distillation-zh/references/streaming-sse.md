# 流式响应与 SSE

实现流式回答渲染时阅读这份参考。

## 源项目模式

这个 MVP 使用 `fetch`，而不是 `EventSource`。原因是大多数 Chat Completions API 需要 POST 请求体和鉴权头。

可迁移的管线如下：

```ts
const reader = response.body
  ?.pipeThrough(new TextDecoderStream())
  .pipeThrough(splitStream('\n'))
  .getReader()
```

拆包器需要兼容三类响应：

- SSE 行，例如 `data: {...}` 和 `data: [DONE]`
- JSON 或 JSON-line 数据，例如 Ollama 的聊天 chunk
- Mock 或本地流使用的纯文本 chunk

## Chunk 处理规则

流式拆包要防御式实现：

- 在 `transform()` 调用之间保留 buffer，因为 JSON 可能半包到达
- 忽略空行
- 只在流边界剥离 `data:` 前缀
- 为 Mock Stream 保留非 JSON 文本
- 把 `[DONE]` 作为完成信号，而不是展示文本
- 单独暴露 keep-alive 信号，让 UI 可以展示排队或等待状态

## 停止与完成

UI 生命周期应区分这些状态：

- **abort**：用户停止生成；取消 reader、停止 animation frame、清理 pending 状态
- **network done**：reader 已无更多 chunk；继续把 UI 文本缓冲区刷完
- **render done**：buffer 为空，最终 Markdown 渲染完成
- **failed**：解析或 reader 失败；重置 parser 状态并展示可重试 UI

源项目使用 `reader.cancel()` 停止读取，然后通过 `triggerModelTermination()` 重置 parser 状态。

## 打字机缓冲区

不要把每个网络 chunk 直接追加到已渲染 Markdown。使用两个缓冲区：

- `textBuffer`：已归一化、等待展示的原始文本
- `displayText`：用户当前可见的累计回答

每一帧从 `textBuffer` 移动一小段到 `displayText`。这样可以避免供应商快速突发返回时界面跳变，也能让慢速供应商保持稳定的打字效果。

## 验证清单

在目标项目中测试这些情况：

- 供应商发送 `data: [DONE]`
- 供应商在内容前发送 keep-alive 行
- 一个 chunk 中包含多个 JSON 对象
- 一个 JSON 对象被拆到多个 chunk 中
- 用户在第一段内容返回前停止生成
- 用户在 Markdown 或 Mermaid 输出未完成时停止生成
- 流已经结束，但 `textBuffer` 里还有待展示文本
