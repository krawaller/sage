import marked from 'marked'
import { Processor } from '../pluginTypes'

export const markdownProcessor: Processor<string> = async (input) => {
  const { content, filePath, meta } = input
  const html = marked(content)
  return html
}
