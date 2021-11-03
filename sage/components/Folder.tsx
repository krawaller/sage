import React from 'react'
import { SageFolderComponent } from './componentTypes'
import { ResourceLink } from './ResourceLink'
import styles from './Folder.module.css'

export const Folder: SageFolderComponent = (props) => {
  const { linkMap, resource } = props
  const { contains } = resource
  return (
    <div className={styles.folder}>
      {contains.map((id) => (
        <ResourceLink key={id} link={linkMap[id]} vertical />
      ))}
    </div>
  )
}

export default Folder
