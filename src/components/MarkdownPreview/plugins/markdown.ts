import MarkdownIt from 'markdown-it'
import hljs from './highlight'

import markdownItHighlight from 'markdown-it-highlightjs'
import { preWrapperPlugin } from './preWrapper'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

md.use(markdownItHighlight, {
  hljs
}).use(preWrapperPlugin, {
  hasSingleTheme: true
})

export default md
