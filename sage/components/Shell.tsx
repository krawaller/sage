import Link from 'next/link'
import React, { ReactNode } from 'react'
import { SageLink, SageResource } from '../processSource/processTypes'

type ShellProps = {
  resource: SageResource
  children: ReactNode
  linkMap: Record<string, SageLink>
}

export const Shell = (props: ShellProps) => {
  const { resource, children, linkMap } = props
  return (
    <div>
      <ul>
        {resource.crumbs.map((id) => (
          <li key={id}>
            <Link href={linkMap[id].path}>{linkMap[id].short}</Link>
          </li>
        ))}
        <li>{linkMap[resource.id].short}</li>
      </ul>
      <hr />
      {children}
    </div>
  )
}

export default Shell
