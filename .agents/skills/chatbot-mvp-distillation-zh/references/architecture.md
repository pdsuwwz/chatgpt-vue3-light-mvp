# 架构

当你要把这个 MVP 的经验迁移到其他应用架构中时，优先阅读这份参考。

## 可复用边界

源项目可以拆成五层理解：

1. **聊天页面**：负责用户输入、当前模型、加载状态、开始/停止命令和输入框焦点。
2. **对话 service/store**：调用当前模型适配器，把响应体转换成 reader，并暴露错误状态。
3. **模型适配器**：负责供应商 URL、请求体、鉴权头，以及供应商特有的增量响应格式。
4. **流式转换管线**：解码字节流，拆分 SSE 或 JSON-line chunk，并输出可解析的单位。
5. **回答渲染器**：读取 chunk，把模型 delta 归一化成文本，缓存输出，渲染 Markdown，并管理完成态。

这组边界比 Vue 组件本身更值得复用。迁移到其他项目时，即使框架不同，也尽量保留这些职责划分。

## 推荐契约

写 UI 代码前，先定义供应商适配器契约：

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

UI 不应该解析供应商特有的响应 schema。UI 只消费 `content`、`done`，以及类似 `isWaitQueuing` 这样的可选状态。

## 状态流

可迁移的状态流是：

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

网络读取和视觉打字要分开。源项目把网络读到的内容放入 `textBuffer`，再通过 `requestAnimationFrame` 小批量移动到 `displayText`。

## 应复用的部分

优先复用这些思路：

- 使用模型映射数组，避免到处写供应商分支判断
- Mock 模型和真实模型走同一套 reader 路径
- 显式设计 abort/reset 生命周期
- 渲染组件只接收 reader 和 transform function
- 保留本地 Mock Stream，方便开发和演示

不要盲目复制这些内容：

- 在纯前端生产部署中暴露供应商密钥
- 固定的供应商 URL 和代理前缀
- 当前项目的 UI 文案、模型标签和单轮对话假设
- 当目标项目不是 Vue 时，直接照搬 Vue 的 ref/expose 写法
