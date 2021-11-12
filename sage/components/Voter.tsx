import React, { useEffect, useState } from 'react'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import { useCurrentQuestion } from '../services/service.question'

import css from './Voter.module.css'

export const Voter = () => {
  const auth = useCurrentAuth()
  const [err, setErr] = useState<Error>()
  const authService = useAuthService()
  useEffect(() => {
    if (!auth) {
      authService.signInAnonymously().then((res) => {
        if (res.error) {
          setErr(res.error as Error)
        }
      })
    }
  }, [auth])
  if (auth) {
    return <VoterInner />
  }
  return (
    <div className={css.voter}>
      {auth ? <VoterInner /> : err ? 'Nooo, went boom :(' : '...loading...'}
    </div>
  )
}

const VoterInner = () => {
  const currentQuestion = useCurrentQuestion()
  return (
    <div className={css.voter}>
      <pre>{JSON.stringify(currentQuestion, null, 2)}</pre>
    </div>
  )
}

export default Voter
