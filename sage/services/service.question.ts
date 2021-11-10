import { getDatabase, ref, onValue, set } from 'firebase/database'
import { FirebaseApp } from '@firebase/app'
import { useFirebaseApp } from './service.firebase'
import { useEffect, useMemo, useState } from 'react'
import { useSettings } from '../components/contexts'

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
    setQurrentQuestion(question: any) {
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
  const dataService = useQuestionService()
  const [answers, setAnswers] = useState<Record<string, string | number>>()
  useEffect(() => {
    return dataService.quizAnswers(questionId, setAnswers)
  }, [questionId, dataService])
  return answers
}
