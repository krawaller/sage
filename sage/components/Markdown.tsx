import React from 'react'
import { SageFileComponentProps } from './componentTypes'

type MarkdownProps = SageFileComponentProps<string>

export const Markdown = (props: MarkdownProps) => {
  const { resource } = props
  const { processed } = resource
  return <div dangerouslySetInnerHTML={{ __html: processed }} />
}

export default Markdown
