import path from 'path'
import fs from 'fs-extra'
import { processPath } from './processPath'
import { SagePlugin } from '../types'
import { ProcessFileOutput } from './processFile'

type ProcessDirectoryInput = {
  plugins: SagePlugin[]
  root: string
  dirPath: string
}

export const processDirectory = async (
  input: ProcessDirectoryInput
): Promise<ProcessFileOutput[]> => {
  const { dirPath, plugins, root } = input
  const list = await fs.readdir(dirPath)
  const promises = list.flatMap((p) =>
    processPath({ path: path.join(dirPath, p), plugins, root })
  )
  return (await Promise.all(promises)).flat()
}
