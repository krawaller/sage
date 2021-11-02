import { Processor } from '../pluginTypes'

export const questionProcessor: Processor<Record<string, any>> = async (
  input
) => {
  const { content } = input
  return JSON.parse(content)
}
