import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'
import { SageLink, SageRootResource } from '../processSource/processTypes'

const templatePath = path.join(__dirname, 'templates/index.tsx.template')
const pagesPath = path.join(__dirname, '../../pages')

type WriteRootOpts = {
  resource: SageRootResource
  config: SageConfig
}

export const writeRoot = async (opts: WriteRootOpts) => {
  const { config, resource } = opts
  const rootTemplate = (await fs.readFile(templatePath)).toString()
  const folderPath = path.join(
    '../', // down 1 from 'pages'
    config.components.root
  )
  await fs.ensureDir(pagesPath)
  await fs.writeFile(
    path.join(pagesPath, 'index.tsx'),
    prettier.format(
      rootTemplate
        .replace('__ROOTPATH__', folderPath)
        .replace('__ROOTRESOURCE__', JSON.stringify(resource, null, 2)),
      { filepath: 'foo.tsx' }
    )
  )
}
