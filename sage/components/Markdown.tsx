import React from 'react'
import { SageFileComponentProps } from './componentTypes'

type MarkdownProps = SageFileComponentProps<string>

export const Markdown = (props: MarkdownProps) => {
  const { processed } = props
  return <div dangerouslySetInnerHTML={{ __html: processed }}></div>
}

export default Markdown
