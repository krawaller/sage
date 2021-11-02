import fs from 'fs-extra'
import path from 'path'
import prettier from 'prettier'
import { SageConfig } from '../configTypes'
import { SageLink, SageResource } from '../processSource/processTypes'

const templatePath = path.join(__dirname, 'templates/resource.tsx.template')
const pagesPath = path.join(__dirname, '../../pages')

type WriteResourceOpts = {
  resource: SageResource
  linkMap: Record<string, SageLink>
  config: SageConfig
  sagePath: string
}

export const writeResource = async (opts: WriteResourceOpts) => {
  const { config, resource, sagePath, linkMap } = opts
  const rootTemplate = (await fs.readFile(templatePath)).toString()
  const tsType = `Sage${capitalise(resource.type)}Component`
  const compKind =
    resource.type === 'root'
      ? 'root'
      : resource.type === 'folder'
      ? 'folder'
      : resource.kind
  if (!config.components[compKind]) {
    throw new Error(`No configured component for "${compKind}"`)
  }
  const link = linkMap[resource.id]
  if (!link) {
    throw new Error(`No link entry for resource "${resource.id}"`)
  }
  const depth = link.path
    .split('/')
    .slice(resource.type === 'root' ? 1 : 0)
    .map(() => '..')
    .join('/')
  const relInnerPath = path.join(depth, config.components[compKind])
  const relSagePath = path.join(depth, sagePath) // no need when npm package
  const outFolder =
    resource.type === 'root'
      ? pagesPath
      : path.join(pagesPath, link.path.replace(/^\//, ''))
  await fs.ensureDir(outFolder)
  await fs.writeFile(
    path.join(outFolder, 'index.tsx'),
    prettier.format(
      rootTemplate
        .replace(/__INNERPATH__/g, relInnerPath)
        .replace(/__SAGEPATH__/g, relSagePath)
        .replace(/__COMPONENTTYPE__/g, tsType)
        .replace(/__INNERNAME__/g, capitalise(compKind))
        .replace(/__COMPONENTNAME__/g, capitalise(compKind) + 'Page')
        .replace(/__RESOURCE__/g, JSON.stringify(resource, null, 2)),
      { filepath: 'foo.tsx' }
    )
  )
}

const capitalise = (str: string) => str[0].toUpperCase() + str.substr(1)
