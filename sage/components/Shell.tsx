import Link from 'next/link'
import React, { ReactNode } from 'react'
import { SageLink, SagePage } from '../processSource/processTypes'

type ShellProps = {
  page: SagePage
  children: ReactNode
  linkMap: Record<string, SageLink>
}

export const Shell = (props: ShellProps) => {
  const { page, children, linkMap } = props
  return (
    <div>
      <ul>
        {page.crumbs.map((id) => (
          <li key={id}>
            <Link href={linkMap[id].path}>{linkMap[id].short}</Link>
          </li>
        ))}
        <li>{linkMap[page.id].short}</li>
      </ul>
      <hr />
      {children}
    </div>
  )
}

export default Shell
