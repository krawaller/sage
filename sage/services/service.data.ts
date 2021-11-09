import { getDatabase, ref, onValue } from 'firebase/database'
import { FirebaseApp } from '@firebase/app'
import { useFirebaseApp } from './service.firebase'
import { useEffect, useMemo, useState } from 'react'
import { useSettings } from '../components/contexts'

export const makeDataService = (app: FirebaseApp, presentationId: string) => {
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
  }
}

export const useDataService = () => {
  const app = useFirebaseApp()
  const { presentationId } = useSettings()
  return useMemo(
    () => makeDataService(app, presentationId),
    [app, presentationId]
  )
}

export const useQuestionAnswers = (questionId: string) => {
  const dataService = useDataService()
  const [answers, setAnswers] = useState<Record<string, string | number>>()
  useEffect(() => {
    return dataService.quizAnswers(questionId, setAnswers)
  }, [questionId])
  return answers
}
