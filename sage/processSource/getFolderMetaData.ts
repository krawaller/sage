import path from 'path'
import fs from 'fs-extra'

export const getFolderMetaData = async (dirPath: string) => {
  const metaPath = path.join(dirPath, '_meta.json')
  if (await fs.pathExists(metaPath)) {
    const content = await fs.readFile(metaPath)
    return JSON.parse(content.toString()) as Record<string, any>
  }
  return {}
}
