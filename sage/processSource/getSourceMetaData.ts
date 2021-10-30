import path from 'path'
import fs from 'fs-extra'

export const getSourceMetaData = async (sourcePath: string) => {
  const metaPath = path.join(sourcePath, 'meta.json')
  const meta = JSON.parse((await fs.readFile(metaPath)).toString())
  return meta
}
