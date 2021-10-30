import { SagePlugin } from '../pluginTypes'
import { graphProcessor } from './graph-processor'

export const graphPlugin: SagePlugin<string> = {
  id: 'graph',
  processor: graphProcessor,
}
