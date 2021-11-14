import React, { useMemo } from 'react'
import {
  Breadcrumbs as BreadcrumbsBP,
  Breadcrumb as BreadcrumbBP,
  BreadcrumbProps as BreadcrumbBPProps,
} from '@blueprintjs/core'
import { SageLink, SageResource } from '../processSource/processTypes'
import { ResourceLink } from './ResourceLink'

type BreadCrumbProps = {
  linkMap: Record<string, SageLink>
  resource: SageResource
}

export const BreadCrumbs = (props: BreadCrumbProps) => {
  const { resource, linkMap } = props
  const renderer = useMemo(() => makeBreadCrumbRenderer(linkMap), [linkMap])
  const bpProps = useMemo<BreadcrumbBPProps[]>(
    () =>
      resource.crumbs
        .map((id) => ({
          href: id,
          current: false,
        }))
        .concat({ href: resource.id, current: true }),
    [resource]
  )
  return <BreadcrumbsBP items={bpProps} breadcrumbRenderer={renderer} />
}

const makeBreadCrumbRenderer =
  (linkMap: Record<string, SageLink>) => (props: BreadcrumbBPProps) => {
    const { href, current } = props
    return (
      <BreadcrumbBP current={current}>
        <ResourceLink link={linkMap[href!]} naked={current} />
      </BreadcrumbBP>
    )
  }

export default BreadCrumbs
