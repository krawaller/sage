import { excludeMetaFromJson, pickMetaFromJson } from '../../utils/metaFromJson'
import { Processor } from '../pluginTypes'

export const jsonProcessor: Processor<Record<string, any>> = async (input) => {
  const { content } = input
  const data = JSON.parse(content)
  if (!data.json) {
    throw new Error('JSON object should contain "json" property!')
  }
  return {
    output: excludeMetaFromJson(data),
    additionalMeta: pickMetaFromJson(data),
  }
}
