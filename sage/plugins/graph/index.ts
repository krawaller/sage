import { SagePlugin } from '../pluginTypes'
import { graphProcessor } from './graph-processor'

export const graphPlugin: SagePlugin<string> = {
  processor: graphProcessor,
}
