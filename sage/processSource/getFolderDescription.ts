import path from 'path'

export const getFolderDescription = (dirPath: string, root: string) => ({
  name: path.basename(dirPath).split('/').slice(-1)[0],
  crumbs: path
    .dirname(dirPath.substr(root.length))
    .split('/')
    .filter((c) => c && c !== '.')
    .slice(-1),
})
