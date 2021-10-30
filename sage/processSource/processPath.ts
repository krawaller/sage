import fs from 'fs-extra'
import { processDirectory } from './processDirectory'
import { processFile } from './processFile'
import { SagePlugin } from '../types'
import { ProcessFileOutput } from './processTypes'

type ProcessPathInput = {
  plugins: SagePlugin[]
  path: string
  root: string
}

export const processPath = async (
  input: ProcessPathInput
): Promise<ProcessFileOutput[]> => {
  const { path, plugins, root } = input
  const lstat = await fs.lstat(path)
  // If path is a directory we need to process everything inside it
  if (lstat.isDirectory()) {
    return processDirectory({ plugins, dirPath: path, root })
  }
  // If this is a meta file we ignore it
  if (path.match(/meta\.json$/)) {
    return []
  }
  // If it is a regular file we process it!
  const fileResult = await processFile({ plugins, filePath: path, root })
  return [fileResult]
}
