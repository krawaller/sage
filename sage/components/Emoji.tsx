import React from 'react'
import css from './Emoji.module.css'

type EmojiProps = {
  emoji: string
}

export const Emoji = ({ emoji }: EmojiProps) => (
  <span className={css.emoji}>{emoji}</span>
)
