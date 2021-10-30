import { renderGraphFromSource } from 'graphviz-cli'
import { Processor } from '../pluginTypes'

export const graphProcessor: Processor<string> = async (input) => {
  const { content, filePath, meta } = input
  const svg = await renderGraphFromSource({ input: content }, { format: 'svg' })
  return svg
}
