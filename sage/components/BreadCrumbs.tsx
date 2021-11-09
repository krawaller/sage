import React from 'react'
import { SageLink, SageResource } from '../processSource/processTypes'
import { ResourceLink } from './ResourceLink'

import css from './Breadcrumbs.module.css'

type BreadCrumbProps = {
  linkMap: Record<string, SageLink>
  resource: SageResource
}

export const BreadCrumbs = (props: BreadCrumbProps) => {
  const { resource, linkMap } = props
  return (
    <nav className={css.nav}>
      {resource.crumbs.map((id) => (
        <ResourceLink key={id} link={linkMap[id]} />
      ))}
      <ResourceLink link={linkMap[resource.id]} naked />
    </nav>
  )
}

export default BreadCrumbs
