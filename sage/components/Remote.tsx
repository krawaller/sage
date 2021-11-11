import React, { useCallback } from 'react'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import { useSetRemotePath, useSetRemoteZoom } from '../services/service.remote'
import { useCssVars, useLinkMap, useSettings } from './contexts'

import css from './Remote.module.css'
import { ResourceLink } from './ResourceLink'

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
    emojis,
    controls: { zoomMin, zoomMax },
  } = useSettings()
  const { cssVars } = useCssVars()
  const linkMap = useLinkMap()
  const setRemotePath = useSetRemotePath()
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
      <div className={css['remote-links']}>
        {Object.values(linkMap).map((link) => (
          <button key={link.path} onClick={() => setRemotePath(link.path)}>
            <ResourceLink link={link} naked />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Remote
