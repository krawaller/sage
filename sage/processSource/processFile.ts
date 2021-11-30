import fs from 'fs-extra'
import { SagePlugin } from '../plugins'
import { getFileDescription } from './getFileDescription'
import { getFileMetaData } from './getFileMetaData'
import { ProcessFileOutput } from './processTypes'

type ProcessFileInput = {
  plugins: Record<string, SagePlugin>
  filePath: string
  root: string
}

export const processFile = async (
  input: ProcessFileInput
): Promise<ProcessFileOutput> => {
  const { plugins, filePath, root } = input
  const fileData = getFileDescription(filePath, root)
  const { kind } = fileData
  const plugin = plugins[kind]
  if (!plugin) {
    throw new Error(`No plugin to handle file ${filePath}`)
  }
  const [meta, buffer] = await Promise.all([
    getFileMetaData(filePath),
    fs.readFile(filePath),
  ])
  const content = buffer.toString()
  const {
    output,
    additionalMeta,
    imports = {},
  } = await plugin.processor({
    content,
    meta,
    filePath,
  })
  const fullMeta = {
    ...meta,
    ...additionalMeta,
  }
  return {
    ...fileData,
    meta: fullMeta,
    processed: output,
    imports,
  }
}
