import { mockEventStreamText } from '@/data'
import { sleep } from '@/utils/request'

/**
 * 转义处理响应值为 data: 的 json 字符串
 * 如: 科大讯飞星火、Kimi Moonshot 等大模型的 response
 */
export const parseJsonLikeData = (content) => {
  // 若是终止信号，则直接结束
  if (content === '[DONE]') {
    return {
      done: true
    }
  }

  if (content.startsWith('data: ')) {
    const dataString = content.substring(6).trim()
    if (dataString === '[DONE]') {
      return {
        done: true
      }
    }
    try {
      return JSON.parse(dataString)
    } catch (error) {
      console.error('JSON 解析错误：', error)
    }
  }

  // 尝试直接解析 JSON 字符串
  try {
    const trimmedContent = content.trim()
    if (trimmedContent.startsWith('{') && trimmedContent.endsWith('}')) {
      return JSON.parse(trimmedContent)
    }
    if (trimmedContent.startsWith('[') && trimmedContent.endsWith(']')) {
      return JSON.parse(trimmedContent)
    }
  } catch (error) {
    console.error('尝试直接解析 JSON 失败：', error)
  }

  return null
}
type ContentResult = {
  content: any
} | {
  done: boolean
}

type DoneResult = {
  content: any
} & {
  done: boolean
}

export type CrossTransformFunction = (readValue: Uint8Array | string, textDecoder: TextDecoder) => DoneResult

export type TransformFunction = (readValue: Uint8Array | string, textDecoder: TextDecoder) => ContentResult

interface TypesModelLLM {
  // 模型昵称
  label: string
  // 模型标识符
  modelName: string
  // Stream 结果转换器
  transformStreamValue: TransformFunction
  // 每个大模型调用的 API 请求
  chatFetch: (text: string) => Promise<Response>
}


/** ---------------- 大模型映射列表 & Response Transform 用于处理不同类型流的值转换器 ---------------- */

/**
 * Mock 模拟模型的 name
 */
export const defaultMockModelName = 'standard'

/**
 * 项目默认使用模型，按需修改此字段即可
 */

// export const defaultModelName = 'spark'
export const defaultModelName = defaultMockModelName

export const modelMappingList: TypesModelLLM[] = [
  {
    label: '🧪 模拟数据模型',
    modelName: 'standard',
    transformStreamValue(readValue, textDecoder) {
      let content = ''
      if (readValue instanceof Uint8Array) {
        content = textDecoder.decode(readValue, {
          stream: true
        })
      } else {
        content = readValue
      }
      return {
        content
      }
    },
    // Mock Event Stream 用于模拟读取大模型接口 Mock 数据
    async chatFetch(text): Promise<Response> {
      // 模拟 res.body 的数据
      // 将 mockData 转换为 ReadableStream

      const mockReadableStream = new ReadableStream({
        start(controller) {
          // 将每一行数据作为单独的 chunk
          mockEventStreamText.split('\n').forEach(line => {
            controller.enqueue(new TextEncoder().encode(`${ line }\n`))
          })
          controller.close()
        }
      })
      await sleep(500)

      return new Promise((resolve) => {
        resolve({
          body: mockReadableStream
        } as Response)
      })
    }
  },
  {
    label: '🦙 Ollama 3 大模型',
    modelName: 'ollama3',
    transformStreamValue(readValue) {
      const stream = parseJsonLikeData(readValue)
      if (stream.done) {
        return {
          done: true
        }
      }
      return {
        content: stream.message.content
      }
    },
    // Event Stream 调用大模型接口 Ollama3 (Fetch 调用)
    chatFetch(text) {
      const url = new URL(`http://localhost:11434/api/chat`)
      const params = {
      }
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key])
      })

      const req = new Request(url, {
        mode: 'cors',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // 'model': 'deepseek-r1',
          'model': 'llama3',
          stream: true,
          messages: [
            {
              role: 'system',
              content: '全程使用中文回答问题。'
            },
            {
              role: 'user',
              content: text
            }
          ]
        })
      })
      return fetch(req)
    }
  },
  {
    label: '🌐 Spark 星火大模型',
    modelName: 'spark',
    transformStreamValue(readValue) {
      const stream = parseJsonLikeData(readValue)
      if (stream.done) {
        return {
          done: true
        }
      }
      return {
        content: stream.choices[0].delta.content || ''
      }
    },
    // Event Stream 调用大模型接口 Spark 星火认知大模型 (Fetch 调用)
    chatFetch(text) {
      const url = new URL(`${ location.origin }/spark/v1/chat/completions`)
      const params = {
      }
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key])
      })

      const req = new Request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ import.meta.env.VITE_SPARK_KEY }`
        },
        body: JSON.stringify({
          'model': 'generalv3.5',
          stream: true,
          messages: [
            {
              role: 'system',
              content: '你叫小明同学，喜欢探索新的前端知识，目前正在学习 AI 大模型。你可以解决任何前端方面的问题。'
            },
            {
              'role': 'user',
              'content': text
            }
          ]
        })
      })
      return fetch(req)
    }
  },
  {
    label: '🌐 SiliconFlow 硅基流动大模型',
    modelName: 'siliconflow',
    transformStreamValue(readValue) {
      // 与 spark 类似，直接复制
      const stream = parseJsonLikeData(readValue)
      if (stream.done) {
        return {
          done: true
        }
      }
      return {
        content: stream.choices[0].delta.content || ''
      }
    },
    // Event Stream 调用大模型接口 SiliconFlow 硅基流动大模型 (Fetch 调用)
    chatFetch(text) {
      const url = new URL(`${ location.origin }/siliconflow/v1/chat/completions`)
      const params = {
      }
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key])
      })

      const req = new Request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ import.meta.env.VITE_SILICONFLOW_KEY }`
        },
        body: JSON.stringify({
          // 集成了大部分模型，可以免费使用
          'model': 'deepseek-ai/DeepSeek-V2.5',
          stream: true,
          messages: [
            {
              'role': 'user',
              'content': text
            }
          ]
        })
      })
      return fetch(req)
    }
  },
  {
    label: '🌐 Kimi Moonshot 月之暗面大模型',
    modelName: 'moonshot',
    transformStreamValue(readValue) {
      // 与 spark 类似，直接复制
      const stream = parseJsonLikeData(readValue)
      if (stream.done) {
        return {
          done: true
        }
      }
      return {
        content: stream.choices[0].delta.content || ''
      }
    },
    // Event Stream 调用大模型接口 Kimi Moonshot 月之暗面大模型 (Fetch 调用)
    chatFetch (text) {
      const url = new URL(`${ location.origin }/moonshot/v1/chat/completions`)
      const params = {
      }
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key])
      })

      const req = new Request(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ import.meta.env.VITE_MOONSHOT_KEY }`
        },
        body: JSON.stringify({
          'model': 'moonshot-v1-8k',
          stream: true,
          messages: [
            {
              role: 'system',
              content: '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。'
            },
            {
              role: 'user',
              content: text
            }
          ]
        })
      })
      return fetch(req)
    }
  }
]
