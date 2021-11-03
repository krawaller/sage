import React from 'react'
import { SageFileComponent } from './componentTypes'

import '../../node_modules/highlight.js/styles/github.css'

export const Code: SageFileComponent<string> = (props) => {
  const { resource } = props
  const { processed } = resource
  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: processed }}></code>
    </pre>
  )
}

export default Code
