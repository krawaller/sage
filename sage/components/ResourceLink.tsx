import classNames from 'classnames'
import Link from 'next/link'
import { SageLink } from '../processSource/processTypes'
import { useSettings } from '../contexts'

import styles from './ResourceLink.module.css'

type ResourceLinkProps = {
  link: SageLink
  naked?: boolean
  vertical?: boolean
  active?: boolean
}

export const ResourceLink = (props: ResourceLinkProps) => {
  const { emojis } = useSettings()
  const { link, naked, vertical, active } = props
  const emoji = emojis[link.type] || emojis[link.kind]
  const inner = (
    <span
      className={classNames(
        styles[naked ? 'resource-link-naked' : 'resource-link-next'],
        vertical && styles['resource-link-vertical'],
        active && styles['resource-link-active']
      )}
    >
      {emoji && <span className={styles['resource-link-emoji']}>{emoji}</span>}
      <span className={styles['resource-link-short']}>{link.short}</span>
    </span>
  )
  return <span>{naked ? inner : <Link href={link.path}>{inner}</Link>}</span>
}
