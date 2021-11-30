import { useMemo } from 'react'
import { useCssVars } from '../services/service.css-vars'
import css from './Possessor.module.css'

type PossessorProps = {
  prefixes: string[]
  children: JSX.Element
}

const getVar = (
  vars: Record<string, string | number | undefined>,
  prefixes: string[],
  prop: string
) =>
  prefixes
    .map((prefix) => `--${prefix}-${prop}`)
    .map((key) => vars[key])
    .filter((val) => val !== undefined)[0] || 0

export const Possessor = (props: PossessorProps) => {
  const { prefixes, children } = props
  const { cssVars } = useCssVars()
  const styles = useMemo(
    () => ({
      left: getVar(cssVars, prefixes, 'x'),
      top: getVar(cssVars, prefixes, 'y'),
      width: getVar(cssVars, prefixes, 'width'),
      height: getVar(cssVars, prefixes, 'height'),
    }),
    [cssVars, prefixes]
  )
  return (
    <div style={styles} className={css.possessor}>
      {children}
    </div>
  )
}
