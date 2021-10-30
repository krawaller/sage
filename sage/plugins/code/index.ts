import { SagePlugin } from '../../types'
import { codeProcessor } from './code-processor'

export const codePlugin: SagePlugin<string> = {
  id: 'code',
  processor: codeProcessor,
}
