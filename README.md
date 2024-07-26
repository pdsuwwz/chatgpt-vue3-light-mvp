# chatgpt-vue3-light-mvp

欢迎使用 **chatgpt-vue3-light-mvp**，一个基于 Vue 3 的轻量级 MVP 项目。该项目旨在演示如何将 ChatGPT 等 AI 大模型能力集成到 Vue3 应用中。

## 前置条件

* Vue 3.x
* Node >= 18.12.x
* Pnpm 9.x
* **VS Code 插件 `dbaeumer.vscode-eslint` >= v3.0.5 (pre-release)**


## 环境变量修改 API 密钥

在运行项目之前，需要设置大语言模型的 API 密钥：

1. 执行以下命令，自动创建环境变量模板文件 `.env` 文件：
    ```sh
    cp .env.template .env
    ```

2. 编辑 `.env` 文件，填入你的 API 密钥

  ```sh
  VITE_SPARK_KEY=你的_SiliconFlow_API_Key # 需要拼接，如 key123456:secret123456
  VITE_SILICONFLOW_KEY=你的_SiliconFlow_API_Key # 如 sk-xxxxxx

  ```

## 安装和运行

* 安装依赖

```bash
pnpm i
```

* 本地开发

```bash
pnpm dev
```

本地运行后，可以通过访问 [http://localhost:2048](http://localhost:2048) 来查看应用。

## 大模型配置

🚧 待编写

## 反馈与支持

如果你喜欢这个项目或发现有用，您可以点右上角 "Star" 支持一下 ⭐️，你的支持是我们不断改进的动力，非常感谢！ ^_^ 

