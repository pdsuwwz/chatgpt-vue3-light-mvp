import MarkdownIt from 'markdown-it'
import hljs from './highlight'
import markdownItHighlight from 'markdown-it-highlightjs'
import { preWrapperPlugin } from './preWrapper'

import markdownItKatex from '@vscode/markdown-it-katex'
import splitAtDelimiters from 'katex/contrib/auto-render/splitAtDelimiters'

import 'katex/dist/katex.min.css'
import 'katex/dist/contrib/mhchem.min.js'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const transformMathMarkdown = (markdownText: string) => {
  const data = splitAtDelimiters(markdownText, [
    {
      left: '\\[',
      right: '\\]',
      display: true
    },
    {
      left: '\\(',
      right: '\\)',
      display: false
    }
  ])

  return data.reduce((result, segment: any) => {
    if (segment.type === 'text') {
      return result + segment.data
    }
    const math = segment.display ? `$$${ segment.data }$$` : `$${ segment.data }$`
    return result + math
  }, '')
}


md.use(markdownItHighlight, {
  hljs
}).use(preWrapperPlugin, {
  hasSingleTheme: true
}).use(markdownItKatex)

export const renderMarkdownText = (content: string) => {
  const transformedContent = transformMathMarkdown(content)
  return md.render(transformedContent)
}

