import { Button, NavbarDivider, Slider } from '@blueprintjs/core'
import React, { useCallback, useState } from 'react'
import { SageSettings } from '../configTypes'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
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
  const handleZoomChange = useCallback((zoom) => {
    // filter out updates caused by remote
    zoom !== undefined && updateCssVars({ zoom })
  }, [])
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
    <>
      <Slider
        min={zoomMin}
        max={zoomMax}
        stepSize={0.1}
        value={cssVars['--zoom'] as number}
        onChange={handleZoomChange}
        labelRenderer={false}
      />
      <NavbarDivider />
      <Button minimal active={isFullscreen} onClick={handleToggleFullScreen}>
        {emojis.fullscreen}
      </Button>
      <NavbarDivider />
      {currentUser ? (
        <Button minimal active onClick={authService.signOut}>
          {emojis.login}
        </Button>
      ) : (
        <Button minimal onClick={authService.signInWithGithubPopup}>
          {emojis.login}
        </Button>
      )}
    </>
  )
}

export default Controls
