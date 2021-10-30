import { SagePlugin } from '../pluginTypes'
import { codeProcessor } from './code-processor'

export const codePlugin: SagePlugin<string> = {
  id: 'code',
  processor: codeProcessor,
}
