import React from 'react'
import { SageFileComponentProps } from './componentTypes'

type GraphProps = SageFileComponentProps<string>

export const Graph = (props: GraphProps) => {
  const { resource } = props
  const { processed } = resource
  return <div dangerouslySetInnerHTML={{ __html: processed }}></div>
}

export default Graph
