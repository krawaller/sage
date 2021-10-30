import { SagePlugin } from '../../types'
import { markdownProcessor } from './markdown-processor'

export const markdownPlugin: SagePlugin<string> = {
  id: 'markdown',
  processor: markdownProcessor,
}
