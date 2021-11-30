import classNames from 'classnames'
import Link from 'next/link'
import { SageLink } from '../processSource/processTypes'
import { useSettings } from '../contexts'

import styles from './ResourceLink.module.css'
import { useEffect, useState } from 'react'
import { useRegisterGhost } from './Ghost.hook'

type ResourceLinkProps = {
  link: SageLink
  naked?: boolean
  vertical?: boolean
  active?: boolean
  prefix?: string
}

export const ResourceLink = (props: ResourceLinkProps) => {
  const [elem, setElem] = useState<HTMLElement | null>()
  const { emojis } = useSettings()
  const { link, naked, vertical, active, prefix } = props
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
  const registerGhost = useRegisterGhost(elem, prefix)
  useEffect(() => {
    if (prefix && elem) {
      registerGhost()
    }
  }, [prefix, elem])
  return (
    <span ref={setElem}>
      {naked ? inner : <Link href={link.path}>{inner}</Link>}
    </span>
  )
}
