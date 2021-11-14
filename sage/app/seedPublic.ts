import path from 'path'
import fs from 'fs-extra'

type SeedPublicOpts = {
  sagePath: string
}

const templatePath = path.join(__dirname, './templates/global.css.template')
const publicPath = path.join(__dirname, '../../public')
const stylesPath = path.join(publicPath, 'styles')
const globalCssPath = path.join(stylesPath, 'global.css')

export const seedPublic = async (opts: SeedPublicOpts) => {
  await fs.ensureDir(stylesPath)
  if (!(await fs.pathExists(globalCssPath))) {
    await fs.copyFile(templatePath, globalCssPath)
  }
  await Promise.all([
    // TODO - no normalize in v4?
    // fs.copyFile(
    //   path.resolve('@blueprintjs/core/lib/css/normalize.css'),
    //   path.join(publicPath, 'normalize.css')
    // ),
    fs.copyFile(
      path.resolve('node_modules/@blueprintjs/core/lib/css/blueprint.css'),
      path.join(stylesPath, 'blueprint.css')
    ),
  ])
}
