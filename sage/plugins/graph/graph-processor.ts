import { renderGraphFromSource } from 'graphviz-cli'
import { Processor } from '../../types'

export const graphProcessor: Processor<string> = async (input) => {
  const { content, fileName, meta } = input
  const svg = await renderGraphFromSource({ input: content }, { format: 'svg' })
  return svg
}
