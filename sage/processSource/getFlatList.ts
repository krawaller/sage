import { ProcessDirectoryOutput, SageResource } from './processTypes'

export const getFlatList = (
  dir: ProcessDirectoryOutput,
  isRoot?: boolean
): SageResource[] => {
  const { files, folders, ...rest } = dir
  const current: SageResource = {
    ...rest,
    contains: folders.map((f) => f.id).concat(files.map((f) => f.id)),
    crumbs: ['root'].concat(rest.crumbs),
    type: 'folder',
    ...(isRoot && { id: 'root', type: 'root', crumbs: [] }),
  }
  const containedFiles: SageResource[] = dir.files.map((file) => ({
    ...file,
    type: 'file',
    crumbs: ['root'].concat(file.crumbs),
  }))
  const recursive = dir.folders.flatMap((f) => getFlatList(f))
  return [current, ...containedFiles, ...recursive]
}
