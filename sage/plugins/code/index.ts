import { SagePlugin } from '../pluginTypes'
import { codeProcessor } from './code-processor'

export const codePlugin: SagePlugin<string> = {
  processor: codeProcessor,
}
