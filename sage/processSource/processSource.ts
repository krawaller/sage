import { SagePlugin } from '../plugins'
import { getFlatList } from './getFlatList'
import { processDirectory } from './processDirectory'
import { SagePage } from './processTypes'

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
  return list.reduce<Record<string, SagePage>>((memo, page) => {
    if (memo[page.id]) {
      throw new Error(`Duplicate pages have identifier "${page.id}"`)
    }
    memo[page.id] = page
    return memo
  }, {})
}
