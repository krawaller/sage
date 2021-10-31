import path from 'path'
import { SagePlugin } from '../plugins'
import { ProcessDirectoryOutput } from './processTypes'
import { processFile } from './processFile'
import { getFolderDescription } from './getFolderDescription'
import { getFolderContent } from './getFolderContent'
import { getFolderMetaData } from './getFolderMetaData'

type ProcessDirectoryInput = {
  plugins: SagePlugin[]
  root: string
  dirPath: string
}

export const processDirectory = async (
  input: ProcessDirectoryInput
): Promise<ProcessDirectoryOutput> => {
  const { dirPath, plugins, root } = input
  const [content, meta] = await Promise.all([
    getFolderContent(dirPath),
    getFolderMetaData(dirPath),
  ])
  const filePromises = content.files
    .filter((p) => !p.match(/meta\.json$/))
    .map((p) => path.join(dirPath, p))
    .map((filePath) => processFile({ plugins, root, filePath }))
  const folderPromises = content.folders.map((d) =>
    processDirectory({ dirPath: path.join(dirPath, d), plugins, root })
  )
  const [files, folders] = await Promise.all([
    Promise.all(filePromises),
    Promise.all(folderPromises),
  ])
  return {
    ...getFolderDescription(dirPath, root),
    meta,
    files,
    folders,
  }
}
