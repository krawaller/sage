import React, { useEffect, useState } from 'react'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import {
  useCurrentQuestion,
  useMyReply,
  useRespond,
} from '../services/service.question'
import { AsyncButton } from './AsyncButton'
import { Emoji } from './Emoji'

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
      <h3 className="bp4-heading">{question}</h3>
      <div className={css.options}>
        {Object.entries(options).map(([optionId, { text, emoji }]) => (
          <AsyncButton
            active={myReply === optionId}
            onClick={() => respond(optionId)}
            key={optionId}
            icon={<Emoji emoji={emoji} />}
            text={text}
          />
        ))}
      </div>
    </>
  )
}

export default Voter
