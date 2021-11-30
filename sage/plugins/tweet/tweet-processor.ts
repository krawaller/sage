import { excludeMetaFromJson, pickMetaFromJson } from '../../utils/metaFromJson'
import { Processor } from '../pluginTypes'

export const tweetProcessor: Processor<Record<string, any>> = async (input) => {
  const { content } = input
  const data = JSON.parse(content)
  if (!data.statusId) {
    throw new Error(`Tweet data must contain statusId!`)
  }
  return {
    output: excludeMetaFromJson(data),
    additionalMeta: pickMetaFromJson(data),
  }
}
