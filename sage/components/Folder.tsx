import Link from 'next/link'
import React from 'react'
import { SageFolderComponentProps } from './componentTypes'

export const Folder = (props: SageFolderComponentProps) => {
  const { linkMap, contains } = props
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
