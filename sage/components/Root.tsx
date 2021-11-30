import classNames from 'classnames'
import { useSettings } from '../contexts'
import { imageClass } from '../utils/imageClass'
import type { SageRootComponent } from './componentTypes'
import { GhostImage } from './GhostImage'

import css from './Root.module.css'

export const Root: SageRootComponent = (props) => {
  const {
    resource: {
      meta: { tagLine },
    },
  } = props
  const {
    main: { logo, logo2 },
  } = useSettings()
  return (
    <div className={css.rootContainer}>
      {logo && (
        <GhostImage
          prefix="root_logo"
          src={logo}
          className={classNames('root_logo', imageClass(logo), css.logo_1)}
        />
      )}
      {tagLine && (
        <h4 className={classNames(css.tagLine, 'bp4-heading')}>{tagLine}</h4>
      )}
      {logo2 && (
        <GhostImage
          prefix="root_logo_2"
          src={logo2}
          className={classNames('root_logo', imageClass(logo2), css.logo_2)}
        />
      )}
    </div>
  )
}

export default Root
