import { SagePlugin } from '../pluginTypes'
import { markdownProcessor } from './markdown-processor'

export const markdownPlugin: SagePlugin<string> = {
  processor: markdownProcessor,
}
