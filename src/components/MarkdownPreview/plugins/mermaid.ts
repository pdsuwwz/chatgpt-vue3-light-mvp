import mermaid from 'mermaid'
import CryptoJs from 'crypto-js'

export const processMermaid = {
  fn: () => {}
}

const computeHash = (str) => {
  return CryptoJs.SHA256(str).toString(CryptoJs.enc.Hex)
}

const verifyMermaid = (content: string) => {
  return new Promise<{ isValid: boolean; }>((resolve) => {
    mermaid.parse(content)
      .then(() => {
        resolve({
          isValid: true
        })
      }).catch((err) => {
        resolve({
          isValid: false
        })
      })
  })
}

export const mermaidPlugin = (md, options = {}) => {
  // 缓存渲染结果
  const cache = new Map()
  // 记录正在渲染中的图表
  const pendingQueue = new Map()

  const defaultFence = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx]

    if (token.info.trim() !== 'mermaid') {
      return defaultFence(tokens, idx, opts, env, self)
    }


    const content = token.content
    const hash = computeHash(content)
    const encodedContent = encodeURIComponent(content)


    if (cache.has(hash)) {
      return `<div data-mermaid-hash="${ hash }">${ cache.get(hash) }</div>`
    }

    return `
      <div
        data-mermaid-hash="${ hash }"
        data-mermaid-content="${ encodedContent }"
        data-mermaid-status="pending"
        class="mermaid-wrapper"
      >
        <pre>⏳ Mermaid 流程图正在加载，请稍候...</pre>
      </div>
    `
  }

  // 后处理渲染 mermaid
  const renderMermaid = async (container) => {
    const encodedContent = container.dataset.mermaidContent
    const content = decodeURIComponent(encodedContent)
    const hash = container.dataset.mermaidHash


    // 如果已经在渲染队列中，则直接返回
    if (pendingQueue.has(hash)) return

    try {
      pendingQueue.set(hash, true)
      let svg

      // 检查缓存
      if (cache.has(hash)) {
        svg = cache.get(hash)
      } else {
        const { isValid } = await verifyMermaid(content)

        if (!isValid) {
          return
        }

        // 使用唯一 ID 渲染（避免图表冲突）
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${ hash }`, content)
        svg = renderedSvg
        cache.set(hash, svg)
      }

      const fragment = document.createDocumentFragment()
      const wrapper = document.createElement('div')
      wrapper.innerHTML = svg
      fragment.appendChild(wrapper)

      container.replaceWith(fragment)
    } catch (err) {
      // console.error('Mermaid 渲染失败:', err)
      container.dataset.mermaidStatus = 'error'
    } finally {
      pendingQueue.delete(hash)
    }
  }

  // 全局渲染控制器
  const processContainers = () => {
    const containers = document.querySelectorAll(`
      div[data-mermaid-status="pending"],
      div[data-mermaid-hash]:not([data-mermaid-status])
    `) as NodeListOf<HTMLElement>


    containers.forEach(container => {
      if (!document.body.contains(container)) {
        return
      }

      if (container.dataset.mermaidStatus !== 'pending') {
        container.dataset.mermaidStatus = 'pending'
      }
      renderMermaid(container)
    })
  }

  // 初始化 Mermaid
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'antiscript',
    markdownAutoWrap: true,
    suppressErrorRendering: true,
    ...options
  })

  // 触发 Mermaid 图表渲染 export
  processMermaid.fn = () => {
    requestAnimationFrame(processContainers)
  }
}

