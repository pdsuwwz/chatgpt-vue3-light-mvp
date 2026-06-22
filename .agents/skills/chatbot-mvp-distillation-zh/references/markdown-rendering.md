# Markdown 渲染

为流式 LLM 输出实现富文本回答时阅读这份参考。

## 渲染管线

MVP 会把累计文本经过这个概念管线渲染：

```text
displayText
-> transform reasoning blocks
-> normalize math delimiters
-> transform Mermaid fences
-> markdown-it render
-> post-render Mermaid process
```

保持管线化设计，可以在不修改模型适配器的情况下增加或移除渲染能力。

## Markdown 与代码块

源项目使用：

- `markdown-it` 渲染 Markdown
- `markdown-it-highlightjs` 和 `highlight.js` 做代码高亮
- 自定义 pre-wrapper plugin 提供代码语言标签和复制按钮

迁移到其他项目时，重点不是完全复刻库选择，而是保留这些要求：

- fenced code block 要有稳定 wrapper
- 每个代码块提供复制动作
- 注册产品需要的语言
- 代码样式和流式解析保持分离

## 数学公式

MVP 使用 KaTeX：

- `@vscode/markdown-it-katex`
- `katex`
- 将 `\(...\)` / `\[...\]` 规范化为 Markdown 友好的 `$...$` / `$$...$$`

迁移时要验证目标构建工具能正确处理 KaTeX CSS 以及相关包的 ESM/CJS 形态。

## Mermaid

MVP 使用 `@nzoth/toolkit` 处理 Mermaid Markdown 转换和适配 SSE 的重复渲染。

可迁移规则：

- 如果 Mermaid 库需要占位符，在 Markdown 渲染前转换 Mermaid fence
- 每次可见文本更新后，再触发 Mermaid 渲染
- 停止生成或最终完成后，再触发一次 Mermaid 渲染
- 确保部分流式输出的 Mermaid 块不会破坏页面

## 推理块

MVP 会把供应商 reasoning delta 转成 `<think>...</think>`，再渲染成独立样式块。迁移时：

- 推理展示应保持可选
- 对推理内容中的 script 标签做转义或清洗
- 在视觉上区分推理过程和最终回答
- 每次请求结束、停止或失败后重置推理 parser 状态

## 安全

MVP 在 Markdown 中开启了原始 HTML。生产环境或用户生成内容场景中，必须明确决定是否允许 HTML。如果允许 HTML，应加入 DOMPurify 等清洗库，并测试脚本注入、图片 URL 和链接目标。
