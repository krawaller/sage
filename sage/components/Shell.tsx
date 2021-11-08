import React, { ReactNode } from 'react'
import { SageSettings } from '../configTypes'
import { SageLink, SageResource } from '../processSource/processTypes'
import { BreadCrumbs } from './Breadcrumbs'
import { Controls } from './Controls'

export type SageShellProps = {
  resource: SageResource
  children: ReactNode
  linkMap: Record<string, SageLink>
  settings: SageSettings
}

import css from './Shell.module.css'

export const Shell = (props: SageShellProps) => {
  const { resource, children, linkMap, settings } = props
  return (
    <div className={css.shell}>
      <div className={css.topbar}>
        <BreadCrumbs linkMap={linkMap} resource={resource} />
        <Controls settings={settings} />
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}

export default Shell
