import { createContext, useCallback, useContext, useState } from 'react'

type CssVars = Record<string, string | number>

export const SageCssVarsContext = createContext({
  cssVars: {} as CssVars,
  updateCssVars: (vars: CssVars) => {},
})

export const useCssVars = () => {
  return useContext(SageCssVarsContext)
}

// Should only be consumed at top of pyramid
export const useCssVarsTopLevel = (initial: CssVars) => {
  const [cssVars, setCssVars] = useState(hyphenateKeys(initial))
  const updateCssVars = useCallback((updatedVars) => {
    const processed = hyphenateKeys(updatedVars)
    setCssVars((current) => ({ ...current, ...processed }))
  }, [])
  return { cssVars, updateCssVars }
}

const hyphenateKeys = (vars: CssVars) =>
  Object.fromEntries(
    Object.entries(vars).map(([key, val]) =>
      key.startsWith('--') ? [key, val] : [`--${key}`, val]
    )
  ) as CssVars
