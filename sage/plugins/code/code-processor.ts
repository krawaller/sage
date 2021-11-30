import hljs from 'highlight.js'
import { Processor } from '../pluginTypes'

export const codeProcessor: Processor<string> = async (input) => {
  const { content, filePath, meta } = input
  const language = meta.language || filePath.match(/\.([^.]*)$/)![1]
  const html = hljs.highlight(content, { language }).value
  return { output: html }
}
