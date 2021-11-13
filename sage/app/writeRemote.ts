import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'

const templatePath = path.join(__dirname, 'templates/remote.tsx.template')
const pagesPath = path.join(__dirname, '../../pages')

type WriteResourceOpts = {
  config: SageConfig
  sagePath: string
}

export const writeRemote = async (opts: WriteResourceOpts) => {
  const { config, sagePath } = opts
  const remoteTemplate = (await fs.readFile(templatePath)).toString()
  const comp = config.components.remote
  const relSagePath = path.join('../', sagePath) // no need when npm package
  if (!comp) {
    throw new Error(`No configured component for "Remote"`)
  }
  await fs.ensureDir(pagesPath)
  await fs.writeFile(
    path.join(pagesPath, 'remote.tsx'),
    prettier.format(
      remoteTemplate
        .replace(/__REMOTEPATH__/g, path.join('../', comp))
        .replace(/__SAGEPATH__/g, relSagePath),
      { filepath: 'foo.tsx' }
    )
  )
}
