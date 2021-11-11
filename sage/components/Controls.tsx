import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import { SageSettings } from '../configTypes'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import { useRemoteZoom } from '../services/service.remote'
import { useCssVars } from './contexts'
import css from './Controls.module.css'

export type ControlsProps = {
  settings: SageSettings
}

export const Controls = (props: ControlsProps) => {
  const { settings } = props
  const {
    controls: { zoomMin, zoomMax },
    emojis,
  } = settings
  const { cssVars, updateCssVars } = useCssVars()
  const handleZoomChange = useCallback((e) => {
    // filter out updates caused by remote
    e?.target?.value !== undefined && updateCssVars({ zoom: e.target.value })
  }, [])
  const handleRemoteZoomChange = useCallback(
    (zoom) =>
      updateCssVars({ zoom: Math.max(zoomMin, Math.min(zoom, zoomMax)) }),
    [updateCssVars]
  )
  useRemoteZoom(handleRemoteZoomChange)
  const authService = useAuthService()
  const currentUser = useCurrentAuth()
  const [isFullscreen, setIsFullScreen] = useState(
    typeof document !== 'undefined' && Boolean(document.fullscreenElement)
  )
  const handleToggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullScreen(false)
    } else {
      document.documentElement.requestFullscreen()
      setIsFullScreen(true)
    }
  }, [])
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
        className={classNames(isFullscreen && 'pressed')}
        onClick={handleToggleFullScreen}
      >
        {emojis.fullscreen}
      </button>
      {currentUser ? (
        <button className="pressed" onClick={authService.signOut}>
          {emojis.login}
        </button>
      ) : (
        <button onClick={authService.signInWithGithubPopup}>
          {emojis.login}
        </button>
      )}
    </div>
  )
}

export default Controls
