import Link from 'next/link'
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
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

import css from './Shell.module.css'

export const Shell = (props: SageShellProps) => {
  const { resource, children, linkMap } = props
  const authService = useAuthService()
  const currentUser = useCurrentAuth()
  const [zoom, setZoom] = useState(0)
  const handleZoomChange = useCallback((evt) => {
    setZoom(Number(evt.target.value))
  }, [])
  const styles = useMemo<CSSProperties & { '--zoom': number }>(
    () => ({
      '--zoom': zoom + 1,
    }),
    [zoom]
  )
  return (
    <div className={css.shell} style={styles}>
      <div className={css.controls}>
        <nav className={css.nav}>
          {resource.crumbs.map((id) => (
            <ResourceLink key={id} link={linkMap[id]} />
          ))}
          <ResourceLink link={linkMap[resource.id]} naked />
        </nav>
        <div>
          <input
            className="zoomer"
            type="range"
            min="0"
            max="2"
            step=".1"
            value={zoom}
            onChange={handleZoomChange}
          />
          {currentUser ? (
            <button onClick={authService.signOut}>
              Log out {currentUser.displayName}
            </button>
          ) : (
            <button onClick={authService.signInWithGithubPopup}>Log in</button>
          )}
        </div>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}

export default Shell
