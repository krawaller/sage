import classNames from 'classnames'
import React, { CSSProperties, useEffect } from 'react'
import { useSettings } from '../contexts'
import { useCurrentAuth } from '../services/service.auth'
import {
  useQuestionService,
  QuestionDef,
  useQuestionStats,
} from '../services/service.question'
import { SageFileComponent } from './componentTypes'

import css from './Question.module.css'

export const Question: SageFileComponent<Record<string, any>> = (props) => {
  const { resource } = props
  const questionDef = resource.processed as QuestionDef
  const { options, question } = questionDef
  const { total, perOption } = useQuestionStats(resource.processed.id)
  const user = useCurrentAuth()
  const questionService = useQuestionService()
  const settings = useSettings()
  useEffect(() => {
    if (user) {
      // call will fail if we're not logged in
      questionService.setQurrentQuestion(questionDef)
    }
  }, [user])
  return (
    <div
      className={css.questionContainer}
      style={{ '--total': total || 1 } as CSSProperties}
    >
      <h3 className={classNames('bp4-heading', css.question)}>{question}</h3>
      <div className={css.options}>
        {Object.entries(options).map(([id, { text, emoji }]) => (
          <div
            key={id}
            className={css.optionContainer}
            style={{ '--count': perOption[id] || 0 } as CSSProperties}
          >
            <div>
              {text} {emoji}
            </div>
            <div>{perOption[id] || 0}</div>
          </div>
        ))}
      </div>
      <div className={css.url}>
        <a href={settings.voting.url}>{settings.voting.url}</a>
      </div>
    </div>
  )
}

export default Question
