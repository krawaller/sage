import { SagePlugin } from '../plugins'
import { getFlatList } from './getFlatList'
import { getLinkRecord } from './getLinkRecord'
import { getResourceRecord } from './getResourceRecord'
import { processDirectory } from './processDirectory'

type ProcessSourceInput = {
  plugins: Record<string, SagePlugin>
  sourcePath: string
}

export const processSource = async (input: ProcessSourceInput) => {
  const { plugins, sourcePath } = input
  const tree = await processDirectory({
    plugins,
    dirPath: sourcePath,
    root: sourcePath,
  })
  const list = getFlatList(tree, true)
  const resources = getResourceRecord(list)
  const links = getLinkRecord(resources)
  return {
    resources,
    links,
  }
}
