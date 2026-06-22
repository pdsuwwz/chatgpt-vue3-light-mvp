---
name: chatbot-mvp-distillation-zh
description: 将 chatgpt-vue3-light-mvp 项目蒸馏为可迁移到其他项目的中文架构指南。适用于设计或实现类似 ChatGPT 的 Web 对话产品，包括 SSE/fetch 流式响应、模型适配器契约、打字机渲染、Markdown/代码/KaTeX/Mermaid 渲染、推理过程展示，以及从本 Vue 3 MVP 迁移到其他项目的方案规划。
---

# Chatbot MVP 蒸馏 zh

使用这个 Skill，把 `chatgpt-vue3-light-mvp` 的工程经验迁移到其他项目，而不是机械复制当前仓库代码。

源项目是一个基于 Vue 3 + Vite + TypeScript 的单轮大模型对话 MVP。它最值得复用的经验是：

- 将模型特有的流式协议和 UI 渲染解耦
- 先把不同模型的增量响应归一化为文本块，再交给界面展示
- 使用打字机缓冲区，让网络读取速度和视觉输出速度分离
- 将 Markdown、代码高亮、数学公式、Mermaid 图表和推理块组织成独立渲染管线
- 保留 Mock Stream，让其他项目在没有真实 API Key 时也能开发和验证界面

## 使用流程

1. 先识别目标项目的前端框架、状态管理方式和 API 边界。
2. 设计整体模块边界时，阅读 [references/architecture.md](references/architecture.md)。
3. 实现 fetch/SSE/ReadableStream 流式处理时，阅读 [references/streaming-sse.md](references/streaming-sse.md)。
4. 增加模型供应商或统一响应格式时，阅读 [references/model-adapters.md](references/model-adapters.md)。
5. 实现富文本回答渲染时，阅读 [references/markdown-rendering.md](references/markdown-rendering.md)。
6. 在其他项目落地前，阅读 [references/migration-checklist.md](references/migration-checklist.md) 做迁移检查。

## 输出要求

在其他项目使用这个 Skill 时：

- 先描述适配后的架构，再动代码
- 保持模型适配器和 UI 组件相互独立
- 在实现供应商之前，先定义小而稳定的流式增量契约
- 保留一条本地 Mock Stream 路径，方便开发和演示
- 明确指出目标项目和当前 Vue MVP 的差异
- 在可行时验证流式读取、停止生成、完成态、Markdown、代码块、数学公式和 Mermaid 图表

## 源码锚点

可以把这些文件作为源项目案例阅读：

- `src/views/chat.vue`：输入、模型选择、reader 生命周期和停止生成行为
- `src/store/business/index.ts`：创建 reader 的 service/store 边界
- `src/components/MarkdownPreview/transform/index.ts`：SSE 与 JSON chunk 拆包
- `src/components/MarkdownPreview/models/index.ts`：模型适配器和增量响应转换
- `src/components/MarkdownPreview/index.vue`：打字机渲染和完成状态
- `src/components/MarkdownPreview/plugins/markdown.ts`：Markdown、KaTeX、Mermaid 和推理块渲染
