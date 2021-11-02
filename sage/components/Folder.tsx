import Link from 'next/link'
import React from 'react'
import { SageFolderComponent } from './componentTypes'

export const Folder: SageFolderComponent = (props) => {
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

export default Folder
