import { SagePlugin } from '../plugins'
import { processDirectory } from './processDirectory'
import { getSourceMetaData } from './getSourceMetaData'

type ProcessSourceInput = {
  plugins: SagePlugin[]
  sourcePath: string
}

export const processSource = async (input: ProcessSourceInput) => {
  const { plugins, sourcePath } = input
  const metaPromise = getSourceMetaData(sourcePath)
  const filesPromise = processDirectory({
    plugins,
    dirPath: sourcePath,
    root: sourcePath,
  })
  const [meta, files] = await Promise.all([metaPromise, filesPromise])
  return {
    meta,
    files,
  }
}
