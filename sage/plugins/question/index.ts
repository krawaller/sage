import { SagePlugin } from '../pluginTypes'
import { questionProcessor } from './question-processor'

export const questionPlugin: SagePlugin<Record<string, any>> = {
  processor: questionProcessor,
}
