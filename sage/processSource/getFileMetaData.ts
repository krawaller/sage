import fs from 'fs-extra'

export const getFileMetaData = async (filePath: string) => {
  const metaPath = `${filePath.replace(/\.[^.]*$/, '')}.meta.json`
  if (await fs.pathExists(metaPath)) {
    const content = await fs.readFile(metaPath)
    return JSON.parse(content.toString())
  }
  return {}
}
