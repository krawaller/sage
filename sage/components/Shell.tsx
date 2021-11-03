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

export const Shell = (props: SageShellProps) => {
  const { resource, children, linkMap } = props
  const authService = useAuthService()
  const currentUser = useCurrentAuth()
  return (
    <div>
      {currentUser ? (
        <div>
          Hello {currentUser.displayName}!{' '}
          <button onClick={authService.signOut}>Log out</button>
        </div>
      ) : (
        <button onClick={authService.signInWithGithubPopup}>Log in</button>
      )}
      <hr />
      <ul>
        {resource.crumbs.map((id) => (
          <li key={id}>
            <Link href={linkMap[id].path}>{linkMap[id].short}</Link>
          </li>
        ))}
        <li>{linkMap[resource.id].short}</li>
      </ul>
      <hr />
      {children}
    </div>
  )
}

export default Shell
