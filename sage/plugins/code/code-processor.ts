import hljs from 'highlight.js'
import { Processor } from '../../types'

export const codeProcessor: Processor<string> = async (input) => {
  const { content, fileName, meta } = input
  const language = meta.language || fileName.match(/\.([^.]*)$/)![1]
  const html = hljs.highlight(content, { language }).value
  return html
}
