import React from 'react'
import { SageFileComponentProps } from './componentTypes'

type CodeProps = SageFileComponentProps<string>

export const Code = (props: CodeProps) => {
  const { processed } = props
  return <div dangerouslySetInnerHTML={{ __html: processed }}></div>
}
