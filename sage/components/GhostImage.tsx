import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useRegisterGhost, useUnregisterGhost } from './Ghost.hook'

import css from './Ghost.module.css'

type GhostImageProps = {
  prefix: string
  src: string
  className: string
}

export const GhostImage = (props: GhostImageProps) => {
  const { src, className, prefix } = props
  const [elem, setElem] = useState<HTMLImageElement | null>()
  const registerGhost = useRegisterGhost(elem, prefix)
  const unregisterGhost = useUnregisterGhost(prefix)
  useEffect(() => unregisterGhost, [])
  useEffect(() => {
    if (elem) {
      window.addEventListener('resize', registerGhost)
      return () => {
        window.removeEventListener('resize', registerGhost)
      }
    }
  }, [elem])
  return (
    <img
      ref={setElem}
      onLoad={registerGhost}
      src={elem ? src : undefined}
      className={classNames(className, css.ghost)}
    />
  )
}
