import Link from 'next/link'
import React, { ReactNode } from 'react'
import { SageSettings } from '../configTypes'
import { SageLink, SageResource } from '../processSource/processTypes'
import { useAuthService, useCurrentAuth } from '../services/service.auth'

export type SageShellProps = {
  resource: SageResource
  children: ReactNode
  linkMap: Record<string, SageLink>
  settings: SageSettings
}

import styles from './Shell.module.css'

export const Shell = (props: SageShellProps) => {
  const { resource, children, linkMap } = props
  const authService = useAuthService()
  const currentUser = useCurrentAuth()
  return (
    <div className={styles.shell}>
      <div className={styles.controls}>
        <nav className={styles.nav}>
          {resource.crumbs.map((id) => (
            <Link key={id} href={linkMap[id].path}>
              {linkMap[id].short}
            </Link>
          ))}
          <span>{linkMap[resource.id].short}</span>
        </nav>
        {currentUser ? (
          <button onClick={authService.signOut}>
            Log out {currentUser.displayName}
          </button>
        ) : (
          <button onClick={authService.signInWithGithubPopup}>Log in</button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Shell
