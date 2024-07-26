import { mockEventStreamText } from '@/data'
import { currentHost } from '@/utils/location'
import request from '@/utils/request'


/**
 * Get 请求示例
 */
export function getXxxxPrompt (params) {
  return request.get(`/xxxxxx/test/prompt`, params)
}


/**
 * Mock Event Stream 用于模拟读取大模型接口 Mock 数据
 */
export function createMockReadStreamRaw() {
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

  return new Promise((resolve) => {
    resolve({
      body: mockReadableStream
    })
  })
}


/**
 * Event Stream 调用大模型接口 Ollama3 (Fetch 调用)
*/
export async function createOllama3Stylized (text) {
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

/**
 * Event Stream 调用大模型接口 Spark 星火认知大模型 (Fetch 调用)
*/
export async function createSparkStylized (text) {
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
      'model': 'generalv4.0Ultra',
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


/**
 * Event Stream 调用大模型接口 SiliconFlow 硅基流动大模型 (Fetch 调用)
*/
export async function createSiliconFlowStylized (text) {
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
      'model': 'Qwen/Qwen1.5-110B-Chat',
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
