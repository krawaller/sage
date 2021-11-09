import React, { useEffect } from 'react'
import { useCurrentAuth } from '../services/service.auth'
import { useDataService, useQuestionAnswers } from '../services/service.data'
import { SageFileComponent } from './componentTypes'

export const Question: SageFileComponent<Record<string, any>> = (props) => {
  const { resource } = props
  const { processed } = resource
  const answers = useQuestionAnswers(resource.processed.id)
  const user = useCurrentAuth()
  const dataService = useDataService()
  useEffect(() => {
    if (user) {
      dataService.setQurrentQuestion(processed)
    }
  }, [user])
  return <pre>{JSON.stringify({ question: processed, answers }, null, 2)}</pre>
}

export default Question
