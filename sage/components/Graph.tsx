import React from 'react'
import { SageFileComponent } from './componentTypes'

export const Graph: SageFileComponent<string> = (props) => {
  const { resource } = props
  const { processed } = resource
  return <div dangerouslySetInnerHTML={{ __html: processed }}></div>
}

export default Graph
