import Link from 'next/link'
import React from 'react'
import { SageRootComponentProps } from './componentTypes'

export const Root = (props: SageRootComponentProps) => {
  const { linkMap, resource } = props
  const { contains } = resource
  return (
    <ul>
      {contains.map((id) => (
        <li key={id}>
          <Link href={linkMap[id].path}>{linkMap[id].short}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Root
