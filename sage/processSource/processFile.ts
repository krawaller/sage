import { SagePlugin } from '../types'
import fs from 'fs-extra'
import path from 'path'

type ProcessFileInput = {
  plugins: SagePlugin[]
  filePath: string
  root: string
}

export type ProcessFileOutput = {
  filePath: string
  name: string
  crumbs: string[]
  meta: Record<string, any>
  content: string
  type: string
  processed: any
}

export const processFile = async (
  input: ProcessFileInput
): Promise<ProcessFileOutput> => {
  const { plugins, filePath, root } = input
  const pluginId = filePath.split('/').slice(-1)[0].split('.')[0]
  const plugin = plugins.find((p) => p.id === pluginId)
  if (!plugin) {
    throw new Error(`No plugin to handle file ${filePath}`)
  }
  const [meta, buffer] = await Promise.all([
    getMeta(filePath),
    fs.readFile(filePath),
  ])
  const content = buffer.toString()
  const processed = await plugin.processor({
    content,
    meta,
    fileName: filePath,
  })
  return {
    filePath,
    name: path.basename(filePath).split('.').slice(1, -1).join('.'),
    crumbs: path
      .dirname(filePath.substr(root.length))
      .split('/')
      .filter(Boolean),
    meta,
    type: pluginId,
    content,
    processed,
  }
}

const getMeta = async (filePath: string) => {
  const metaPath = `${filePath.replace(/\.[^.]*$/, '')}.meta.json`
  if (await fs.pathExists(metaPath)) {
    const content = await fs.readFile(metaPath)
    return JSON.parse(content.toString())
  }
  return {}
}
