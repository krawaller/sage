import { SagePlugin } from '../pluginTypes'
import { jsonProcessor } from './json-processor'

export const jsonPlugin: SagePlugin<Record<string, any>> = {
  processor: jsonProcessor,
}
