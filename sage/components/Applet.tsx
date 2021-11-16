import React from 'react'
import { SageFileComponent } from './componentTypes'

import '../../node_modules/highlight.js/styles/github.css'
import type {
  AppletDefinition,
  AppletImports,
} from '../plugins/applet/applet-types'

export const Code: SageFileComponent<
  AppletDefinition,
  AppletImports<{ version: string }>
> = (props) => {
  const {
    resource,
    imports: { Component },
  } = props
  const { processed } = resource
  return <Component version={processed.props.version} />
}

export default Code
