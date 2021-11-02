import React from 'react'
import { SageFileComponent } from './componentTypes'

export const Question: SageFileComponent<Record<string, any>> = (props) => {
  const { resource } = props
  const { processed } = resource
  return <pre>{JSON.stringify(processed, null, 2)}</pre>
}

export default Question
