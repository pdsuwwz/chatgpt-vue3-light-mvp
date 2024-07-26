# chatgpt-vue3-light-mvp

💭 一个 Chat Bot 对话 Web 端轻量级 MVP 原型模板, 基于 Vue3、TypeScript、Naive UI 、UnoCSS 等主流技术构建, 💡 简单集成大语言模型 API, 前端接口直连, 采用单轮 AI 对话模式, 每次提问独立响应, 无需上下文, 集成 markdown-it 预览, 易于定制二次开发和快速搭建 Chat 产品


__[🌈 Live Demo 在线体验](https://pdsuwwz.github.io/chatgpt-vue3-light-mvp)__


## 前置条件

* Vue 3.x
* Node >= 18.12.x
* Pnpm 9.x
* **VS Code 插件 `dbaeumer.vscode-eslint` >= v3.0.5 (pre-release)**

## 运行效果

![image](https://github.com/user-attachments/assets/6a066e66-1501-4816-880f-df37db658934)
![image](https://github.com/user-attachments/assets/71515bdc-1831-4421-b8df-127577d8a24d)


https://github.com/user-attachments/assets/42e8254f-d1bc-42e0-88dd-90279d040ae0


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
  ```


## 🦙 大模型 API 密钥获取指南

### 国内在线大模型

**1. Spark 星火认知大模型**：

- **注册**：访问 [星火大模型 API](https://xinghuo.xfyun.cn/sparkapi) 进行注册并登录
- **获取 API 密钥**：访问 [控制台](https://console.xfyun.cn/services/bm4) 获取 `APIKey` 和 `APISecret`

![image](https://github.com/user-attachments/assets/8761d59d-b4c3-41d5-9c58-14a5b0f4389c)

- **接口说明**：[spark HTTP 调用文档](https://www.xfyun.cn/doc/spark/HTTP%E8%B0%83%E7%94%A8%E6%96%87%E6%A1%A3.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E)

![image](https://github.com/user-attachments/assets/71334353-b6c1-4778-ae21-95e98860d2b1)

- **配置到本仓库**：将创建的 `APIKey` 和 `APISecret` 密钥用冒号 `:` 拼接填入到 `.env` 文件中的 `VITE_SPARK_KEY` 环境变量


**2. SiliconFlow 大模型**：
- **注册**：访问 [SiliconFlow 官网](https://siliconflow.cn/zh-cn/siliconcloud) 进行注册登录并创建 API 密钥
- **创建 API 密钥**：访问 [账户管理 - API 密钥](https://cloud.siliconflow.cn/account/ak) 创建新 API 密钥

![image](https://github.com/user-attachments/assets/31e1ef13-869a-4695-a7c0-054d2c3e877f)

- **接口说明**：[官方 Chat Completions 在线调试](https://docs.siliconflow.cn/reference/chat-completions-3)
- **配置到本仓库**：将创建的 API 密钥填入 `.env` 文件中的 `VITE_SILICONFLOW_KEY` 环境变量
- **SiliconFlow现已支持的大模型**：[模型列表](https://siliconflow.cn/zh-cn/models)

![image](https://github.com/user-attachments/assets/f320f495-cb17-48ff-99c4-aaedbf87fc84)


### 使用本地 Ollama 大模型

**Ollama3 大模型**：
- **安装**：Ollama3 不需要 API 密钥，只需要在本地安装并运行 Ollama 即可。请参考 Ollama 官方文档进行安装：[Ollama GitHub](https://github.com/ollama/ollama)
- **运行**：运行 Ollama3 服务，直接执行 `ollama run llama3`, 运行后确保其在 `http://localhost:11434` 运行

![image](https://github.com/user-attachments/assets/f3955060-a22d-4db8-b162-7393c10403f6)

- **查看运行状态**：执行 `ollama list`命令可查看当前正在运行的 Ollama 模型

![image](https://github.com/user-attachments/assets/8c6cf637-fd5b-45b5-93c2-f58927b7110c)



## 🌹 反馈与支持

如果你喜欢这个项目或发现有用，可以点右上角 "Star" 支持一下，你的支持是我们不断改进的动力，感谢！ ^_^ 


## 😎 Awesome

* [awesome-vite](https://github.com/pdsuwwz/awesome-vite)
