import { pickMetaFromJson } from '../../utils/pickMetaFromJson'
import { Processor } from '../pluginTypes'
import { AppletDefinition } from './applet-types'

export const appletProcessor: Processor<AppletDefinition> = async (input) => {
  const { content } = input
  const data = JSON.parse(content)
  return {
    output: data.props || {},
    additionalMeta: pickMetaFromJson(data),
    imports: {
      Component: data.componentPath,
    },
  }
}
