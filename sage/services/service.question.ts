import { getDatabase, ref, onValue, set, remove } from 'firebase/database'
import { FirebaseApp } from '@firebase/app'
import { useFirebaseApp } from './service.firebase'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSettings } from '../components/contexts'
import { useCurrentAuth } from './service.auth'

export type QuestionDef = {
  id: string
  question: string
  options: Record<string, { text: string; emoji: string }>
}

export const makeQuestionService = (
  app: FirebaseApp,
  presentationId: string
) => {
  const db = getDatabase(app)
  return {
    subcribeToReplies(
      questionId: string,
      callback: (answers: Record<string, string | number>) => void
    ) {
      const answerRef = ref(
        db,
        `presentations/${presentationId}/replies/${questionId}`
      )
      return onValue(answerRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
      })
    },
    respond(userId: string, questionId: string, optionId: string) {
      const responseRef = ref(
        db,
        `presentations/${presentationId}/replies/${questionId}/${userId}`
      )
      return set(responseRef, optionId)
    },
    subscribeToCurrentQuestion(callback: (question: QuestionDef) => void) {
      const currentRef = ref(
        db,
        `presentations/${presentationId}/currentQuestion`
      )
      return onValue(currentRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
      })
    },
    setQurrentQuestion(question: QuestionDef | null) {
      const currentRef = ref(
        db,
        `presentations/${presentationId}/currentQuestion`
      )
      return question ? set(currentRef, question) : remove(currentRef)
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

export const useQuestionAnswers = (questionId?: string) => {
  const questionService = useQuestionService()
  const [answers, setAnswers] = useState<Record<string, string | number>>()
  useEffect(() => {
    if (questionId) {
      return questionService.subcribeToReplies(questionId, setAnswers)
    }
  }, [questionId, questionService])
  return answers
}

export const useCurrentQuestion = () => {
  const questionService = useQuestionService()
  const [question, setQuestion] = useState<QuestionDef | null>()
  useEffect(() => {
    return questionService.subscribeToCurrentQuestion(setQuestion)
  }, [questionService])
  return question
}

export const useMyReply = () => {
  const question = useCurrentQuestion()
  const questionService = useQuestionService()
  const [myReply, setMyReply] = useState<string | number | null | undefined>()
  const auth = useCurrentAuth()
  const answers = useQuestionAnswers(question?.id)
  return answers?.[auth?.uid ?? '']
}

export const useRespond = () => {
  const question = useCurrentQuestion()
  const questionService = useQuestionService()
  const auth = useCurrentAuth()
  return useCallback(
    (optionId: string) => {
      if (question && auth) {
        return questionService.respond(auth.uid, question.id, optionId)
      }
      return Promise.reject(new Error('No question!'))
    },
    [question, questionService, auth]
  )
}
