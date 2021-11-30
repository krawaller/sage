import { pickMetaFromJson } from '../../utils/pickMetaFromJson'
import { Processor } from '../pluginTypes'

export const questionProcessor: Processor<Record<string, any>> = async (
  input
) => {
  const { content } = input
  const data = JSON.parse(content)
  return {
    output: {
      ...data,
      options: Object.fromEntries(
        Object.entries(data.options).map(
          ([i, { id, emoji, text }]: [string, any]) => [id, { text, emoji }]
        )
      ),
    },
    additionalMeta: pickMetaFromJson(data),
  }
}
