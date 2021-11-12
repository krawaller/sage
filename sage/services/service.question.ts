import { getDatabase, ref, onValue, set } from 'firebase/database'
import { FirebaseApp } from '@firebase/app'
import { useFirebaseApp } from './service.firebase'
import { useEffect, useMemo, useState } from 'react'
import { useSettings } from '../components/contexts'

export type QuestionDef = {
  id: string
  question: string
  options: Record<string, string>
}

export const makeQuestionService = (
  app: FirebaseApp,
  presentationId: string
) => {
  const db = getDatabase(app)
  return {
    quizAnswers(
      questionId: string,
      callback: (answers: Record<string, string | number>) => void
    ) {
      const answerRef = ref(
        db,
        `presentations/${presentationId}/questions/${questionId}/replies`
      )
      return onValue(answerRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
      })
    },
    currentQuestion(callback: (question: QuestionDef) => void) {
      const currentRef = ref(
        db,
        `presentations/${presentationId}/currentQuestion`
      )
      return onValue(currentRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
      })
    },
    setQurrentQuestion(question: QuestionDef) {
      const currentRef = ref(
        db,
        `presentations/${presentationId}/currentQuestion`
      )
      set(currentRef, question)
    },
  }
}

export const useQuestionService = () => {
  const app = useFirebaseApp()
  const { presentationId } = useSettings()
  return useMemo(
    () => makeQuestionService(app, presentationId),
    [app, presentationId]
  )
}

export const useQuestionAnswers = (questionId: string) => {
  const questionService = useQuestionService()
  const [answers, setAnswers] = useState<Record<string, string | number>>()
  useEffect(() => {
    return questionService.quizAnswers(questionId, setAnswers)
  }, [questionId, questionService])
  return answers
}

export const useCurrentQuestion = () => {
  const questionService = useQuestionService()
  const [question, setQuestion] = useState<QuestionDef | null>()
  useEffect(() => {
    return questionService.currentQuestion(setQuestion)
  }, [questionService])
  return question
}
