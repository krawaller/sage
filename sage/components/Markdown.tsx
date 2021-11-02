import React from 'react'
import { SageFileComponent } from './componentTypes'

export const Markdown: SageFileComponent<string> = (props) => {
  const { resource } = props
  const { processed } = resource
  return <div dangerouslySetInnerHTML={{ __html: processed }} />
}

export default Markdown
