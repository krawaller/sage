import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'
import { SageLink } from '../processSource/processTypes'

const templatePath = path.join(__dirname, 'templates/_app.tsx.template')
const pagesPath = path.join(__dirname, '../../pages')

type WriteAppOpts = {
  linkMap: Record<string, SageLink>
  config: SageConfig
}

export const writeApp = async (opts: WriteAppOpts) => {
  const { config, linkMap } = opts
  const appTemplate = (await fs.readFile(templatePath)).toString()
  const shellPath = path.join(
    '../', // down 1 from 'pages'
    config.components.shell
  )
  await fs.ensureDir(pagesPath)
  await fs.writeFile(
    path.join(pagesPath, '_app.tsx'),
    prettier.format(
      appTemplate
        .replace('__SHELLPATH__', shellPath)
        .replace('__LINKMAP__', JSON.stringify(linkMap, null, 2)),
      { filepath: 'foo.ts' }
    )
  )
}
