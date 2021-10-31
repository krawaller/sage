import path from 'path'
import fs from 'fs-extra'

/*
General utility that lists files and subfolders in the given folder
*/
export const getFolderContent = async (dirPath: string) => {
  const list = await fs.readdir(dirPath)
  const full = list.map((p) => path.join(dirPath, p))
  const lstats = await Promise.all(full.map((p) => fs.lstat(p)))
  return list.reduce<{ files: string[]; folders: string[] }>(
    (memo, p, i) => {
      memo[lstats[i].isDirectory() ? 'folders' : 'files'].push(p)
      return memo
    },
    { files: [], folders: [] }
  )
}
