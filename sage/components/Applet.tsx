import React from 'react'
import { SageFileComponent } from './componentTypes'

import '../../node_modules/highlight.js/styles/github.css'
import type { AppletImports } from '../plugins/applet/applet-types'

export const Code: SageFileComponent<Record<string, any>, AppletImports> = (
  props
) => {
  const {
    resource,
    imports: { Component },
  } = props
  const { processed } = resource
  return <Component {...processed} />
}

export default Code
