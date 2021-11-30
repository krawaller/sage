import fs from 'fs-extra'
import fm from 'front-matter'
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
  const fileContent = buffer.toString()
  const { body, attributes: frontMatterMeta } = fm(fileContent)
  const {
    output,
    additionalMeta,
    imports = {},
  } = await plugin.processor({
    content: body,
    meta,
    filePath,
  })
  const fullMeta = {
    ...(frontMatterMeta as Record<string, any>),
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
