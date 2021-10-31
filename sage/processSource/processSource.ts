import { SagePlugin } from '../plugins'
import { processDirectory } from './processDirectory'

type ProcessSourceInput = {
  plugins: Record<string, SagePlugin>
  sourcePath: string
}

export const processSource = async (input: ProcessSourceInput) => {
  const { plugins, sourcePath } = input
  return await processDirectory({
    plugins,
    dirPath: sourcePath,
    root: sourcePath,
  })
}
