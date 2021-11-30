import marked from 'marked'
import { imageClass } from '../../utils/imageClass'
import { Processor } from '../pluginTypes'

export const markdownProcessor: Processor<string> = async (input) => {
  const { content, filePath, meta } = input
  const html = marked(content).replace(
    /<img src="([^"]*)"/g,
    (m, src) => `<img class="${imageClass(src)}" src="${src}"`
  )
  return html
}
