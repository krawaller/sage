import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import {
  useCurrentQuestion,
  useMyReply,
  useRespond,
} from '../services/service.question'

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
  return (
    <div className={css.voter}>
      {auth ? <VoterInner /> : err ? 'Nooo, went boom :(' : '...loading...'}
    </div>
  )
}

const VoterInner = () => {
  const currentQuestion = useCurrentQuestion()
  const respond = useRespond()
  const myReply = useMyReply()
  if (!currentQuestion) {
    return <p>Waiting for question...</p>
  }
  const { question, options } = currentQuestion
  return (
    <>
      <p>{question}</p>
      <div className={css.options}>
        {Object.entries(options).map(([optionId, { text, emoji }]) => (
          <button
            className={classNames(myReply === optionId && 'pressed')}
            onClick={() => respond(optionId)}
            key={optionId}
          >
            {emoji} {text}
          </button>
        ))}
      </div>
    </>
  )
}

export default Voter
