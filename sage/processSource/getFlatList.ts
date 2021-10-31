import { ProcessDirectoryOutput, SagePage } from './processTypes'

export const getFlatList = (
  dir: ProcessDirectoryOutput,
  isRoot?: boolean
): SagePage[] => {
  const { files, folders, ...rest } = dir
  const current: SagePage = {
    ...rest,
    contains: folders.map((f) => f.id).concat(files.map((f) => f.id)),
    crumbs: ['root'].concat(rest.crumbs),
    type: 'folder',
    ...(isRoot && { id: 'root', type: 'root', crumbs: [] }),
  }
  const containedFiles: SagePage[] = dir.files.map((file) => ({
    ...file,
    type: 'file',
    crumbs: ['root'].concat(file.crumbs),
  }))
  const recursive = dir.folders.flatMap((f) => getFlatList(f))
  return [current, ...containedFiles, ...recursive]
}
