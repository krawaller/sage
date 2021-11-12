import React, { useEffect } from 'react'
import { useCurrentAuth } from '../services/service.auth'
import {
  useQuestionService,
  useQuestionAnswers,
  QuestionDef,
} from '../services/service.question'
import { SageFileComponent } from './componentTypes'

export const Question: SageFileComponent<Record<string, any>> = (props) => {
  const { resource } = props
  const { processed } = resource
  const answers = useQuestionAnswers(resource.processed.id)
  const user = useCurrentAuth()
  const questionService = useQuestionService()
  useEffect(() => {
    if (user) {
      // call will fail if we're not logged in
      questionService.setQurrentQuestion(processed as QuestionDef)
    }
  }, [user])
  return <pre>{JSON.stringify({ question: processed, answers }, null, 2)}</pre>
}

export default Question
