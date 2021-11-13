import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'

const templatePath = path.join(__dirname, 'templates/vote.tsx.template')
const pagesPath = path.join(__dirname, '../../pages')

type WriteVoteOpts = {
  config: SageConfig
  sagePath: string
}

export const writeVoter = async (opts: WriteVoteOpts) => {
  const { config, sagePath } = opts
  const voterTemplate = (await fs.readFile(templatePath)).toString()
  const comp = config.components.voter
  const relSagePath = path.join('../', sagePath) // no need when npm package
  if (!comp) {
    throw new Error(`No configured component for "voter"`)
  }
  await fs.ensureDir(pagesPath)
  await fs.writeFile(
    path.join(pagesPath, 'vote.tsx'),
    prettier.format(
      voterTemplate
        .replace(/__VOTERPATH__/g, path.join('../', comp))
        .replace(/__SAGEPATH__/g, relSagePath),
      { filepath: 'foo.tsx' }
    )
  )
}
