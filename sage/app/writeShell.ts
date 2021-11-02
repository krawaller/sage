import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'
import { SageLink } from '../processSource/processTypes'

const templatePath = path.join(__dirname, 'templates/_app.tsx.template')
const pagesPath = path.join(__dirname, '../../pages')

type WriteShellOpts = {
  linkMap: Record<string, SageLink>
  config: SageConfig
  sagePath: string
}

export const writeShell = async (opts: WriteShellOpts) => {
  const { config, linkMap, sagePath } = opts
  const appTemplate = (await fs.readFile(templatePath)).toString()
  const relShellPath = path.join(
    '../', // down 1 from 'pages'
    config.components.shell
  )
  const relSagePath = path.join('../', sagePath) // no need when npm package
  await fs.ensureDir(pagesPath)
  await fs.writeFile(
    path.join(pagesPath, '_app.tsx'),
    prettier.format(
      appTemplate
        .replace('__SHELLPATH__', relShellPath)
        .replace(/__SAGEPATH__/g, relSagePath)
        .replace('__LINKMAP__', JSON.stringify(linkMap, null, 2)),
      { filepath: 'foo.ts' }
    )
  )
}
