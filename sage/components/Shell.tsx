import Link from 'next/link'
import React, { ReactNode } from 'react'
import { SageSettings } from '../configTypes'
import { SageLink, SageResource } from '../processSource/processTypes'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import { ResourceLink } from './ResourceLink'

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
            <ResourceLink key={id} link={linkMap[id]} />
          ))}
          <ResourceLink link={linkMap[resource.id]} naked />
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
