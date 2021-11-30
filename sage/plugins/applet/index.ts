import { SagePlugin } from '../pluginTypes'
import { appletProcessor } from './applet-processor'
import { AppletDefinition } from './applet-types'

export const appletPlugin: SagePlugin<AppletDefinition> = {
  processor: appletProcessor,
}
