import { useMemo } from 'react'
import { useSettings } from '../contexts'
import { GhostImage } from './GhostImage'
import css from './Logo.module.css'
import { Possessor } from './Possessor'

const prefixes = ['root_logo', 'corner_logo']
const prefixes2 = ['root_logo_2', 'corner_logo_2']

export const Logo = () => {
  const {
    main: { logo, logo2 },
  } = useSettings()
  return (
    <>
      {logo && (
        <>
          <GhostImage prefix="corner_logo" src={logo} className={css.logo_1} />
          <Possessor prefixes={prefixes}>
            <img src={logo} />
          </Possessor>
        </>
      )}
      {logo2 && (
        <>
          <GhostImage
            prefix="corner_logo_2"
            src={logo2}
            className={css.logo_2}
          />
          <Possessor prefixes={prefixes2}>
            <img src={logo2} />
          </Possessor>
        </>
      )}
    </>
  )
}

export default Logo
