import React from 'react'
import { Folder } from '.'
import { SageFolderResource } from '../processSource/processTypes'
import type { SageRootComponent } from './componentTypes'

export const Root: SageRootComponent = (props) => {
  const { resource } = props
  const folder: SageFolderResource = {
    ...resource,
    type: 'folder',
  }
  return <Folder {...props} resource={folder} />
}

export default Root
