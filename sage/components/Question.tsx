import React from 'react'
import { useQuestionAnswers } from '../services/service.data'
import { SageFileComponent } from './componentTypes'

export const Question: SageFileComponent<Record<string, any>> = (props) => {
  const { resource } = props
  const { processed } = resource
  const answers = useQuestionAnswers(resource.processed.id)
  return <pre>{JSON.stringify({ question: processed, answers }, null, 2)}</pre>
}

export default Question
