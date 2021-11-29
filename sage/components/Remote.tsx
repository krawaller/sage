import { Button } from '@blueprintjs/core'
import React, { useCallback, useState } from 'react'
import { useAuthService, useCurrentAuth } from '../services/service.auth'
import {
  useRemoteLog,
  useSetRemoteLog,
  useSetRemotePath,
  useSetRemoteZoom,
} from '../services/service.remote'
import { useCssVars } from '../services/service.css-vars'
import { useLinkMap, useSettings } from '../contexts'

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
  const [logIsOpen, setLogIsOpen] = useState(false)
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
  const setRemoteLog = useSetRemoteLog()
  const handleToggleLog = useCallback(() => {
    setLogIsOpen((curr) => {
      setRemoteLog(!curr)
      return !curr
    })
  }, [])
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
      <Button minimal active={logIsOpen} onClick={handleToggleLog}>
        {emojis.log}
      </Button>
      <div className={css['remote-links']}>
        {Object.values(linkMap).map((link) => (
          <Button key={link.path} onClick={() => setRemotePath(link.path)}>
            <ResourceLink link={link} naked />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Remote
