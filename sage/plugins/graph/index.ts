import { SagePlugin } from '../../types'
import { graphProcessor } from './graph-processor'

export const graphPlugin: SagePlugin<string> = {
  id: 'graph',
  processor: graphProcessor,
}
