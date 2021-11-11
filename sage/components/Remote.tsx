import React, { useCallback } from 'react'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import { useSetRemoteZoom } from '../services/service.remote'
import { useCssVars, useSettings } from './contexts'

import css from './Remote.module.css'

const Remote = () => {
  const auth = useCurrentAuth()
  return (
    <div className={css.remote}>{auth ? <RemoteInner /> : <RemoteLogin />}</div>
  )
}

const RemoteLogin = () => {
  const authService = useAuthService()
  const { emojis } = useSettings()
  return (
    <button onClick={authService.signInWithGithubPopup}>
      {emojis.login} Log in
    </button>
  )
}

const RemoteInner = () => {
  const setRemoteZoom = useSetRemoteZoom()
  const handleZoomChange = useCallback((e) => {
    e?.target?.value !== undefined && setRemoteZoom(e.target.value)
  }, [])
  const {
    controls: { zoomMin, zoomMax },
  } = useSettings()
  const { cssVars } = useCssVars()
  return (
    <div>
      <input
        className="zoomer"
        type="range"
        min={zoomMin}
        max={zoomMax}
        step=".1"
        defaultValue={cssVars['--zoom']}
        onChange={handleZoomChange}
      />
    </div>
  )
}

export default Remote
