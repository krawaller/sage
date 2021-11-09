import path from 'path'
import fs from 'fs-extra'

type SeedPublicOpts = {
  sagePath: string
}

const templatePath = path.join(__dirname, './templates/global.css.template')
const publicPath = path.join(__dirname, '../../public')
const globalCssPath = path.join(publicPath, 'global.css')

export const seedPublic = async (opts: SeedPublicOpts) => {
  await fs.ensureDir(publicPath)
  if (!(await fs.pathExists(globalCssPath))) {
    await fs.copyFile(templatePath, globalCssPath)
  }
}
