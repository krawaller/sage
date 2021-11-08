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
import { useCssVars } from './contexts'
import { ResourceLink } from './ResourceLink'

export type SageShellProps = {
  resource: SageResource
  children: ReactNode
  linkMap: Record<string, SageLink>
  settings: SageSettings
}

import css from './Shell.module.css'

export const Shell = (props: SageShellProps) => {
  const { resource, children, linkMap, settings } = props
  const {
    controls: { zoomMin, zoomMax },
    emojis,
  } = settings
  const authService = useAuthService()
  const currentUser = useCurrentAuth()
  const { cssVars, updateCssVars } = useCssVars()
  const handleZoomChange = useCallback(
    (e) => updateCssVars({ zoom: e.target.value }),
    []
  )
  return (
    <div className={css.shell}>
      <div className={css.topbar}>
        <nav className={css.nav}>
          {resource.crumbs.map((id) => (
            <ResourceLink key={id} link={linkMap[id]} />
          ))}
          <ResourceLink link={linkMap[resource.id]} naked />
        </nav>
        <div className={css.controls}>
          <input
            className="zoomer"
            type="range"
            min={zoomMin}
            max={zoomMax}
            step=".1"
            value={cssVars['--zoom']}
            onChange={handleZoomChange}
          />

          <button
            onClick={() =>
              document.fullscreenElement
                ? document.exitFullscreen()
                : document.documentElement.requestFullscreen()
            }
          >
            {emojis.fullscreen} Fullscreen
          </button>
          {currentUser ? (
            <button onClick={authService.signOut}>
              {emojis.login} Log out
            </button>
          ) : (
            <button onClick={authService.signInWithGithubPopup}>
              {emojis.login} Log in
            </button>
          )}
        </div>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}

export default Shell
