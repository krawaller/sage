import { SageConfig } from '../configTypes'
import { SageLink, SageResource } from '../processSource/processTypes'
import { writeShell } from './writeShell'
import { writeResource } from './writeResource'

type WriteOpts = {
  resources: SageResource[]
  linkMap: Record<string, SageLink>
  config: SageConfig
  sagePath: string
}

export const writeNextApp = async (opts: WriteOpts) => {
  const { resources, linkMap, config, sagePath } = opts
  await Promise.all([
    writeShell({ sagePath, config, linkMap }),
    ...resources.map((resource) =>
      writeResource({ linkMap, resource, sagePath, config })
    ),
  ])
}
