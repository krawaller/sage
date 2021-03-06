import path from 'path'

export const getFileDescription = (filePath: string, root: string) => ({
  id: path.basename(filePath),
  kind: filePath.split('/').slice(-1)[0].split('.')[0],
  name: path.basename(filePath).split('.').slice(1, -1).join('.'),
  crumbs: path.dirname(filePath.substr(root.length)).split('/').filter(Boolean),
})
