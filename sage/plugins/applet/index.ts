import { SagePlugin } from '../pluginTypes'
import { appletImporter } from './applet-importer'
import { appletProcessor } from './applet-processor'
import { AppletDefinition } from './applet-types'

export const appletPlugin: SagePlugin<AppletDefinition> = {
  processor: appletProcessor,
  importer: appletImporter,
}
