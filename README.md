# chatgpt-vue3-light-mvp

💭 一个可二次开发 Chat Bot 对话 Web 端原型模板, 基于 Vue3、Vite 6、TypeScript、Naive UI、Pinia、UnoCSS 等主流技术构建, 🧤简单集成大模型 API, 采用单轮 AI 问答对话模式, 每次提问独立响应, 无需上下文, 支持打字机效果流式输出, 集成 markdown-it, highlight.js, 数学公式语法高亮预览, 💼 易于定制和快速搭建 Chat 类大语言模型产品


__[🌈 Live Demo 在线体验](https://pdsuwwz.github.io/chatgpt-vue3-light-mvp)__


## 🎉 特性

* 🛠️ **核心技术栈**：__Vite 6 + Vue 3 + TypeScript + Pinia(v3) + ESLint (v9)__
* 🎨 **UI 框架**：__Naive UI 2.x__
* 🪄 **解放双手**：内置 **Unplugin Auto Import**，支持组件按需自动导入，提升开发效率
* 🌟 **图标支持**：内置 **UnoCSS + Iconify**，实现原子化样式内联和图标按需自动导入
* 💬 **AI 对话**：支持单轮对话，用户输入即得 AI 独立响应回复，无需上下文
* 📝 **Markdown 预览**：支持多种编程语言代码高亮，集成 `markdown-it` 和 `highlight.js`
* 🧪 **模拟开发模式**：提供本地模拟开发模式，无需真实 API 即可开始开发
* 🔑 **环境变量管理**：通过 `.env` 文件管理 API 密钥，支持不同大模型的配置
* 🌍 **大语言模型 API**：兼容 Spark 星火认知大模型、Kimi Moonshot 月之暗面大模型、SiliconFlow、Ollama 等，允许自由扩展
* 🚀 **灵活扩展**：轻量级模块化 MVP 设计，纯前端开发，项目结构清晰，快速搭建 AI 对话原型

### 🧠 已支持的模型

详见 [这里](#-大模型响应处理)

| 模型名称 | 模型标识符 | 需要 API Key | 可否本地运行 | 备注 |
|----------|----------|----------|----------|----------|
| （默认类型）模拟数据模型 | `standard` | × | ✅ | 开发环境默认使用 |
| Ollama (Llama 3) 大模型 | `ollama3` | × | ✅ | 需本地安装运行 Ollama 服务 |
| DeepSeek-V3 | `deepseek-v3` | ✅ | × | 需配置 `VITE_DEEPSEEK_KEY` |
| DeepSeek-R1 (推理模型) | `deepseek-deep` | ✅ | × | 需配置 `VITE_DEEPSEEK_KEY` |
| Spark 星火大模型 | `spark` | ✅ | × | 需配置 `VITE_SPARK_KEY` |
| SiliconFlow 硅基流动大模型 | `siliconflow` | ✅ | × | 需配置 `VITE_SILICONFLOW_KEY` |
| Kimi Moonshot 月之暗面大模型 | `moonshot` | ✅ | × | 需配置 `VITE_MOONSHOT_KEY` |


## 前置条件

* Vue 3.x
* Node >= 18.12.x
* Pnpm 9.x
* **VS Code 插件 `dbaeumer.vscode-eslint` >= v3.0.5 (pre-release)**

## 运行效果

![image](https://github.com/user-attachments/assets/95b6c478-2522-4b6d-997f-6dabe29cf9d5)
![image](https://github.com/user-attachments/assets/4f0b250b-beab-4076-a5a1-d2fe447f0a50)

* Deepseek 深度思考响应结果

![image](https://github.com/user-attachments/assets/9309fafc-c1b7-4cd3-95ed-def1275072b7)



https://github.com/user-attachments/assets/01063217-13ae-4ecd-b451-5b2e4e954afc




## 安装和运行

* 安装依赖

```bash
pnpm i
```

* 本地开发

```bash
pnpm dev
```

本地运行后，可以通过访问 `http://localhost:2048` 来查看应用。


## 🔑 配置 API 密钥

在运行项目之前，需要设置大语言模型的 API 密钥：

1. 执行以下命令，自动创建环境变量模板文件 `.env` 文件：
    ```sh
    cp .env.template .env
    ```

2. 编辑 `.env` 文件，填入你的 API 密钥

  ```sh
  VITE_SPARK_KEY=你的_星火_API_Key # 需要用冒号拼接key和secret，格式如 `key123456:secret123456`
  VITE_SILICONFLOW_KEY=你的_SiliconFlow_API_Key # 通常以 `sk-` 开头，如 `sk-xxxxxx`
  VITE_MOONSHOT_KEY=你的_Moonshot_API_Key # 通常以 `sk-` 开头，如 `sk-xxxxxx`
  VITE_DEEPSEEK_KEY=你的_DeepSeek_API_Key # 通常以 `sk-` 开头，如 `sk-xxxxxx`
  ```


## 🛠️ API 代理配置说明

本项目采用纯前端架构，所有后端服务均由外部或本地其他服务提供。为解决开发环境中的跨域问题，项目使用了 `Vite` 的代理功能 `server.proxy`（详见[官方文档](https://vite.dev/config/server-options.html#server-proxy)）

以下是当前仓库的[代理配置](./vite.config.ts#L23)

```ts
server: {
  // ...
  proxy: {
    '/spark': {
      target: 'https://spark-api-open.xf-yun.com',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/spark/, '')
    },
    '/siliconflow': {
      target: 'https://api.siliconflow.cn',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/siliconflow/, '')
    },
    '/moonshot': {
      target: 'https://api.moonshot.cn',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/moonshot/, '')
    },
    '/deepseek': {
      target: 'https://api.deepseek.com',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/deepseek/, '')
    }
  }
},
// ...
```

### 注意事项

1. **环境限制**: 该代理配置仅在开发环境（`development`）中生效。若生产环境部署时请根据实际情况调整服务器配置

2. **路径匹配**: 请求路径需要与配置的代理路径前缀匹配，例如本地访问 `/spark/v1/chat/completions` 会被直接代理到 `https://spark-api-open.xf-yun.com/v1/chat/completions`

### 生产环境部署

生产环境建议使用以下方案之一：

- 配置正确的 `CORS` 响应头
- 使用 `Nginx` 反向代理
- 统一域名和端口，避免跨域问题


## 🌍 模拟/真实 API 模式切换

本项目提供了一个模拟开发模式，用于在本地开发环境或 Github 等部署环境中模拟调用大模型相关策略，无需调用真实 API 接口。该模式在 [src/config/env.ts](src/config/env.ts) 文件中定义，由以下代码控制：

```ts
// src/config/env.ts

/**
 * TODO: 若是 Github 演示部署环境，则仅模拟大模型相关策略，不调接口
 */
export const isGithubDeployed = process.env.VITE_ROUTER_MODE === 'hash'

```
### 默认配置

默认情况下，在开发环境，`isGithubDeployed` 会被设置为 `false`, 这意味着应用将默认使用模拟数据，但也可按照需求自行切换其他大模型 API 接口。

当部署在演示环境时，也就是本项目在线预览地址中，则使用 `hash` 路由模式, `isGithubDeployed` 会被设置为 `true`, 这意味着真实的大模型 API 接口将被禁用。

### 切换至真实 API

如果想在所有环境中使用真实的 API，你有两个选择：

1. **取消注释**：将最后一行的代码注释取消，设置 `isGithubDeployed = false`

2. **修改逻辑**：全局搜索 `isGithubDeployed`, 并修改相应的 if 判断逻辑，使其默认使用真实接口

**请注意，无论选择哪种方式，都需要确保项目已经正确配置了 `.env` API 密钥**

### 接口函数修改

请求的函数已经针对目前项目内置的所有模型的响应结果做了统一处理，在（[src/store/business/index.ts](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp/blob/main/src/store/business/index.ts#L30)）的 [`createAssistantWriterStylized`](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp/blob/main/src/store/business/index.ts#L30) 函数，一般情况下，不需要修改此函数，除非遇到极个别模型比较特殊的响应结果格式，需要再额外处理下。


---

## 🦙 接入大语言模型 API

<details>
<summary>国内在线大模型配置</summary><br>


**1. DeepSeek 深度求索大模型**：
- **官方开放平台**：访问 [DeepSeek 官方文档](https://api-docs.deepseek.com/zh-cn) 查看使用手册
- **注册**：访问 [DeepSeek 开放平台控制台](https://platform.deepseek.com/usage) 进行注册登录
- **模型 & 价格**：访问 [模型 & 价格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing) 查看模型价格
- **Token 购买**：访问 [账户信息 - Top up 管理](https://platform.deepseek.com/top_up) 请按需购买 API 所需 Token（一般 10 块就够了，能用好久）
- **创建 API 密钥**：访问 [账户信息 - API Key 管理](https://platform.deepseek.com/api_keys) 新建 API 密钥

![image](https://github.com/user-attachments/assets/f3ad036f-9938-4ff5-b301-7ca645346517)

- **接口说明**：[首次调用 API](https://api-docs.deepseek.com/zh-cn)
- **在线调试**：[官方 Chat Completions 在线调试](https://api-docs.deepseek.com/zh-cn/api/create-chat-completion)
- **配置到本仓库**：将创建的 API 密钥填入 `.env` 文件中的 `VITE_DEEPSEEK_KEY` 环境变量
- **DeepSeek 现已支持的大模型**：[模型 & 价格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
- **DeepSeek 现已支持的大模型-接口调用查看**：[通过接口查看](https://api-docs.deepseek.com/zh-cn/api/list-models)

![image](https://github.com/user-attachments/assets/8aa98691-94ac-4516-a9c4-18ac2da92c01)


**2. Spark 星火认知大模型**：

- **注册**：访问 [星火大模型 API](https://xinghuo.xfyun.cn/sparkapi) 进行注册并登录
- **获取 API 密钥**：访问 [控制台](https://console.xfyun.cn/services/bm4) 获取 `APIKey` 和 `APISecret`

![image](https://github.com/user-attachments/assets/8761d59d-b4c3-41d5-9c58-14a5b0f4389c)

- **接口说明**：[spark HTTP 调用文档](https://www.xfyun.cn/doc/spark/HTTP%E8%B0%83%E7%94%A8%E6%96%87%E6%A1%A3.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E)

![image](https://github.com/user-attachments/assets/71334353-b6c1-4778-ae21-95e98860d2b1)

- **配置到本仓库**：将创建的 `APIKey` 和 `APISecret` 密钥用冒号 `:` 拼接填入到 `.env` 文件中的 `VITE_SPARK_KEY` 环境变量


**3. SiliconFlow 大模型**：
- **注册**：访问 [SiliconFlow 官网](https://siliconflow.cn/zh-cn/siliconcloud) 进行注册登录并创建 API 密钥
- **创建 API 密钥**：访问 [账户管理 - API 密钥](https://cloud.siliconflow.cn/account/ak) 创建新 API 密钥

![image](https://github.com/user-attachments/assets/31e1ef13-869a-4695-a7c0-054d2c3e877f)

- **接口说明**：[官方 Chat Completions 在线调试](https://docs.siliconflow.cn/reference/chat-completions-3)
- **配置到本仓库**：将创建的 API 密钥填入 `.env` 文件中的 `VITE_SILICONFLOW_KEY` 环境变量
- **SiliconFlow现已支持的大模型**：[模型列表](https://siliconflow.cn/zh-cn/models)

![image](https://github.com/user-attachments/assets/f320f495-cb17-48ff-99c4-aaedbf87fc84)


**4. Kimi Moonshot 月之暗面大模型**：
- **官方开放平台**：访问 [Moonshot 开放平台](https://platform.moonshot.cn/docs/intro) 查看使用手册
- **注册**：访问 [Moonshot 开放平台控制台](https://platform.moonshot.cn/console) 进行注册登录
- **创建 API 密钥**：访问 [账户信息 - API Key 管理](https://platform.moonshot.cn/console/api-keys) 新建 API 密钥

![image](https://github.com/user-attachments/assets/718994f4-c05f-49e3-af4f-f36358413215)


- **接口说明**：[官方示例代码 Chat Completion](https://platform.moonshot.cn/docs/api/chat#chat-completion)
- **配置到本仓库**：将创建的 API 密钥填入 `.env` 文件中的 `VITE_MOONSHOT_KEY` 环境变量
- **Moonshot现已支持的大模型**：[模型列表](https://platform.moonshot.cn/docs/api/chat#list-models)

![image](https://github.com/user-attachments/assets/5d615123-20c3-44cd-a7cb-17f4ed42ced9)

</details>

<details>
<summary>使用本地 Ollama 大模型</summary><br>

**Ollama 大模型**：
- **安装**：Ollama3 不需要 API 密钥，只需要在本地安装并运行 Ollama 即可。请参考 Ollama 官方文档进行安装：[Ollama GitHub](https://github.com/ollama/ollama)
- **Ollama现已支持的大模型**：[模型列表](https://ollama.com/search)
- **运行**：运行 Ollama3 服务，直接执行 `ollama run <模型名称>`, 如： `ollama run llama3`, 运行后确保其在 `http://localhost:11434` 运行

![image](https://github.com/user-attachments/assets/f3955060-a22d-4db8-b162-7393c10403f6)

- **查看运行状态**：执行 `ollama list`命令可查看当前正在运行的 Ollama 模型

![image](https://github.com/user-attachments/assets/8c6cf637-fd5b-45b5-93c2-f58927b7110c)


</details>

---

## 🔌 大模型响应处理

由于不同大模型的 API 响应数据结构存在差异，本项目通过**统一的模型映射机制**和**响应转换函数**实现了多模型的无缝集成。核心逻辑封装在 [详见代码](src/components/MarkdownPreview/models/index.ts#L85) 中，支持灵活扩展和定制

### 核心设计

<details>
<summary>1、模型映射机制</summary><br>

通过 `modelMappingList` 定义支持的模型列表，每个模型包含以下关键属性：

| 属性名称 | 类型 | 说明
|----------|----------|----------|
| label | string | 模型展示名称（仅用于 UI 显示） |
| modelName | string | 模型唯一标识符（用于逻辑判断）|
| transformStreamValue | TransformFunction | 流式响应数据的转换函数，用于解析不同模型的响应结构 |
| chatFetch | (text: string) => Promise<Response> | 模型 API 请求函数，封装了请求参数和调用逻辑 |

</details>

<details>
<summary>2、响应转换函数</summary><br>

每个模型通过 `transformStreamValue` 函数处理流式响应数据，核心逻辑包括：

* 解析原始响应数据（`Uint8Array` 或 `string`）
* 提取有效内容字段（如 `content`）
* 处理特殊终止信号（如 `[DONE]`）

</details>


<details>
<summary>3、统一接口</summary><br>

通过 `createAssistantWriterStylized` 方法封装模型调用逻辑，不用太关心底层实现细节，只需通过 `modelName` 切换模型。

* 解析原始响应数据（`Uint8Array` 或 `string`）
* 提取有效内容字段（如 `content`）
* 处理特殊终止信号（如 `[DONE]`）

</details>

👉 可在 [src/store/business/index.ts](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp/blob/main/src/store/business/index.ts) 中查看更多实现细节

### 🧠 已支持的模型

| 模型名称 | 模型标识符 | 需要 API Key | 可否本地运行 | 备注 |
|----------|----------|----------|----------|----------|
| （默认类型）模拟数据模型 | `standard` | × | ✅ | 开发环境默认使用 |
| Ollama (Llama 3) 大模型 | `ollama3` | × | ✅ | 需本地安装运行 Ollama 服务 |
| DeepSeek-V3 | `deepseek-v3` | ✅ | × | 需配置 `VITE_DEEPSEEK_KEY` |
| DeepSeek-R1 (推理模型) | `deepseek-deep` | ✅ | × | 需配置 `VITE_DEEPSEEK_KEY` |
| Spark 星火大模型 | `spark` | ✅ | × | 需配置 `VITE_SPARK_KEY` |
| SiliconFlow 硅基流动大模型 | `siliconflow` | ✅ | × | 需配置 `VITE_SILICONFLOW_KEY` |
| Kimi Moonshot 月之暗面大模型 | `moonshot` | ✅ | × | 需配置 `VITE_MOONSHOT_KEY` |


### 🔬 主要实现

- **modelMappingList**: 定义了支持的每个大模型的 modelName, 响应结果的处理以及请求 API 函数，[详见代码](src/components/MarkdownPreview/models/index.ts#L199)
  - **transformStreamValue**: 包含了针对各种模型的响应结果转换函数，[详见代码](src/components/MarkdownPreview/models/index.ts#L199)
- **MarkdownPreview 组件**: 接收 `model` 和 `transformStreamFn` props 属性，根据不同模型类型处理流式响应，[详见代码](src/components/MarkdownPreview/index.vue#L9)

> 本项目的 `MarkdownPreview` 组件接收 `model` props 属性是为了回显不同的 `Placeholder`，如果你不需要可直接删掉该 props 参数及对应的回显逻辑

### 📚 使用示例

在使用 [`MarkdownPreview`](src/components/MarkdownPreview/index.vue) 组件时，通过设置 `model` 和 `transformStreamFn` 属性来指定当前使用的大模型类型：

```html
<MarkdownPreview
  ref="refReaderMarkdownPreview"
  v-model:reader="outputTextReader"
  :model="businessStore.currentModelItem?.modelName"
  :transform-stream-fn="businessStore.currentModelItem?.transformStreamValue"
  @failed="onFailedReader"
  @completed="onCompletedReader"
/>
```

其中 `model` 和 `transformStreamFn` 的值会根据用户选择的下拉框选项自动映射到对应的模型，并实时由全局 pinia [src/store/business/index.ts](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp/blob/main/src/store/business/index.ts#L22) 状态管理来管控：

```ts
export const useBusinessStore = defineStore('business-store', {
  state: (): BusinessState => {
    return {
      systemModelName: defaultModelName
    }
  },
  getters: {
    currentModelItem (state) {
      return modelMappingList.find(v => v.modelName === state.systemModelName)
    }
  },
  actions: {
    // ...
  }
})
```

在模拟开发环境下，默认使用 `standard` 模型，同时也可以自定义修改为指定模型（尝试基于本项目二次开发的话，可以重点看下这个文件 [models/index.ts](src/components/MarkdownPreview/models/index.ts#L190)），具体的模型类型可以根据需求进行自己二次配置:

```ts
/**
 * Mock 模拟模型的 name
 */
export const defaultMockModelName = 'standard'

/**
 * 项目默认使用模型，按需修改此字段即可
 */

// export const defaultModelName = 'spark'
export const defaultModelName = defaultMockModelName
```


#### 💡 提示

> `currentModelItem` 计算属性会根据模型映射自动选择对应的模型，也可以手动指定模型
> 
> 如果后端返回的是可直接渲染的纯字符串（而非 JSON），`standard` 模型将适用于所有这种情况

## 🌹 支持

如果你喜欢这个项目或发现有用，可以点右上角 [`Star`](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp) 支持一下，你的支持是我们不断改进的动力，感谢！ ^_^ 


## 😎 Awesome

* [awesome-vite](https://github.com/pdsuwwz/awesome-vite)

## License

[MIT](./LICENSE) License | Copyright © 2020-PRESENT [Wisdom](https://github.com/pdsuwwz)

