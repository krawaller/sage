import Link from 'next/link'
import React from 'react'
import type { SageRootComponent } from './componentTypes'

export const Root: SageRootComponent = (props) => {
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
