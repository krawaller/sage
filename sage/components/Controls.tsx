import React, { useCallback } from 'react'
import { SageSettings } from '../configTypes'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import { useCssVars } from './contexts'
import css from './Controls.module.css'

export type ControlsProps = {
  settings: SageSettings
}

export const Controls = (props: ControlsProps) => {
  const { settings } = props
  const { cssVars, updateCssVars } = useCssVars()
  const handleZoomChange = useCallback(
    (e) => updateCssVars({ zoom: e.target.value }),
    []
  )
  const {
    controls: { zoomMin, zoomMax },
    emojis,
  } = settings
  const authService = useAuthService()
  const currentUser = useCurrentAuth()
  return (
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
        <button onClick={authService.signOut}>{emojis.login} Log out</button>
      ) : (
        <button onClick={authService.signInWithGithubPopup}>
          {emojis.login} Log in
        </button>
      )}
    </div>
  )
}

export default Controls
