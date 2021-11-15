import { Importer } from '../pluginTypes'
import { AppletDefinition } from './applet-types'

export const appletImporter: Importer<AppletDefinition> = (input) => {
  const { processed } = input
  return {
    Component: processed.componentPath,
  }
}
