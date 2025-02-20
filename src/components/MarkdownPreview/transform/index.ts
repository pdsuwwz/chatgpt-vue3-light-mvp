// 处理SSE格式的数据
const processSSE = (buffer, controller, splitOn) => {
  const parts = buffer.split(splitOn)
  const lastPart = parts.pop()

  for (const part of parts) {
    const trimmedPart = part.trim()
    if (!trimmedPart) continue

    if (trimmedPart.startsWith('data:')) {
      const content = trimmedPart.replace(/^data: /, '').trim()
      if (content) {
        try {
          JSON.parse(content)
          controller.enqueue(content)
        } catch (e) {
          // 不是JSON，发送原文本
          controller.enqueue(content)
        }
      }
    } else {
      controller.enqueue(trimmedPart)
    }
  }

  return lastPart
}

// 处理可能包含多个JSON对象的数据
const processJSON = (buffer, controller) => {
  let remaining = buffer
  let processed = false

  // 尝试找出所有完整的JSON对象
  while (remaining.trim() !== '') {
    let validJSON = ''
    let validJSONEndIndex = -1

    // 寻找第一个有效的JSON对象
    for (let i = 0; i <= remaining.length; i++) {
      try {
        const possibleJSON = remaining.substring(0, i)
        if (possibleJSON.endsWith('}')) {
          JSON.parse(possibleJSON)
          validJSON = possibleJSON
          validJSONEndIndex = i
          break
        }
      } catch (e) {
        // 继续尝试
      }
    }

    if (validJSON) {
      try {
        JSON.parse(validJSON)
        controller.enqueue(validJSON)
        remaining = remaining.substring(validJSONEndIndex).trim()
        processed = true
      } catch (e) {
        // 如果最终解析出错，跳出循环
        break
      }
    } else {
      // 没找到有效JSON，退出循环
      break
    }
  }

  return processed ? remaining : buffer
}

export const splitStream = (splitOn) => {
  let buffer = ''

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk
      const trimmedBuffer = buffer.trim()

      // 根据内容格式选择处理方法
      if (trimmedBuffer.startsWith('data:')) {
        // SSE格式
        buffer = processSSE(buffer, controller, splitOn)
      } else if (trimmedBuffer.startsWith('{') && (
        trimmedBuffer.includes('"model"') ||
          trimmedBuffer.includes('"message"') ||
          trimmedBuffer.includes('"done"'))) {
        const newBuffer = processJSON(buffer, controller)

        // 如果JSON处理没有成功，当作普通文本处理
        if (newBuffer === buffer) {
          controller.enqueue(chunk)
          buffer = ''
        } else {
          buffer = newBuffer
        }
      } else {
        // 普通文本格式
        controller.enqueue(chunk)
        buffer = ''
      }
    },

    flush(controller) {
      if (buffer.trim() !== '') {
        // 最后尝试处理为JSON
        try {
          controller.enqueue(buffer.trim())
        } catch (e) {
          // 不是JSON，发送原文本
          controller.enqueue(buffer)
        }
      }
    }
  })
}
