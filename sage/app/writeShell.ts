import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'
import { SageLink } from '../processSource/processTypes'

const templatePath = path.join(__dirname, 'templates/_app.tsx.template')
const templateCssPath = path.join(
  __dirname,
  'templates/app.module.css.template'
)
const pagesPath = path.join(__dirname, '../../pages')

type WriteShellOpts = {
  linkMap: Record<string, SageLink>
  config: SageConfig
  sagePath: string
}

export const writeShell = async (opts: WriteShellOpts) => {
  const { config, linkMap, sagePath } = opts
  const appTemplate = (await fs.readFile(templatePath)).toString()
  const relBreadCrumbsPath = path.join(
    '../', // down 1 from 'pages'
    config.components.breadcrumbs
  )
  const relNavPath = path.join(
    '../', // down 1 from 'pages'
    config.components.nav
  )
  const relControlsPath = path.join(
    '../', // down 1 from 'pages'
    config.components.controls
  )
  const relBrainPath = path.join(
    '../', // down 1 from 'pages'
    config.components.brain
  )
  const relLogPath = path.join(
    '../', // down 1 from 'pages'
    config.components.log
  )
  const relSagePath = path.join('../', sagePath) // no need when npm package
  await fs.ensureDir(pagesPath)
  await fs.writeFile(
    path.join(pagesPath, '_app.tsx'),
    prettier.format(
      appTemplate
        .replace('__BREADCRUMBSPATH__', relBreadCrumbsPath)
        .replace('__NAVPATH__', relNavPath)
        .replace('__CONTROLSPATH__', relControlsPath)
        .replace('__BRAINPATH__', relBrainPath)
        .replace('__LOGPATH__', relLogPath)
        .replace(/__SAGEPATH__/g, relSagePath)
        .replace('__LINKMAP__', JSON.stringify(linkMap, null, 2))
        .replace('__SAGESETTINGS__', JSON.stringify(config.settings, null, 2)),
      { filepath: 'foo.ts' }
    )
  )
  await fs.copyFile(templateCssPath, path.join(pagesPath, 'app.module.css'))
}
