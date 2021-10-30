import { SagePlugin } from '../types'
import { processDirectory } from './processDirectory'

type ProcessDirectoryInput = {
  plugins: SagePlugin[]
  sourcePath: string
}

export const processSource = (input: ProcessDirectoryInput) => {
  const { plugins, sourcePath } = input
  return processDirectory({ plugins, dirPath: sourcePath, root: sourcePath })
}
