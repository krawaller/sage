import { Processor } from '../pluginTypes'
import { AppletDefinition } from './applet-types'

export const appletProcessor: Processor<AppletDefinition> = async (input) => {
  const { content } = input
  const data = JSON.parse(content)
  return data
}