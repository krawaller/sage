import Link from 'next/link'
import { SageLink } from '../processSource/processTypes'

import styles from './ResourceLink.module.css'

const emojis: Record<string, string> = {
  folder: '📁',
  root: '🏠',
  code: '💻',
  question: '🙋',
  diagram: '💭',
  markdown: '📖',
}

type ResourceLinkProps = {
  link: SageLink
  naked?: boolean
}

export const ResourceLink = (props: ResourceLinkProps) => {
  const { link, naked } = props
  const emoji = emojis[link.type] || emojis[link.kind]
  const inner = (
    <span
      className={styles[naked ? 'resource-link-naked' : 'resource-link-next']}
    >
      {emoji && <span className={styles['resource-link-emoji']}>{emoji}</span>}
      {link.short}
    </span>
  )
  return <span>{naked ? inner : <Link href={link.path}>{inner}</Link>}</span>
}
