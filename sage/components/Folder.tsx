import React from 'react'
import { SageFolderComponent } from './componentTypes'
import { ResourceLink } from './ResourceLink'
import styles from './Folder.module.css'

export const Folder: SageFolderComponent = (props) => {
  const { linkMap, resource } = props
  const { contains, meta } = resource
  return (
    <div className={styles.folder}>
      {meta.title && <h3 className="bp4-heading">{meta.title}</h3>}
      <div>
        {contains
          .sort((id1, id2) => (linkMap[id1].sort < linkMap[id2].sort ? -1 : 1))
          .map((id) => (
            <ResourceLink key={id} link={linkMap[id]} vertical />
          ))}
      </div>
    </div>
  )
}

export default Folder
