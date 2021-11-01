import React from 'react'
import { SageFileComponentProps } from './componentTypes'

type CodeProps = SageFileComponentProps<string>

export const Code = (props: CodeProps) => {
  const { resource } = props
  const { processed } = resource
  return <div dangerouslySetInnerHTML={{ __html: processed }}></div>
}

export default Code
