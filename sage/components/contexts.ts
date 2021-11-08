import { createContext, useCallback, useContext, useState } from 'react'
import { SageConfig } from '../configTypes'
import { SageLink, SageResource } from '../processSource/processTypes'

export const SageLinkMapContext = createContext<Record<string, SageLink>>({})

export const useLinkMap = () => {
  return useContext(SageLinkMapContext)
}

export const SageResourceContext = createContext<SageResource>(
  {} as unknown as SageResource
)

export const useCurrentPage = () => {
  return useContext(SageResourceContext)
}

export const SageSettingsContext = createContext<SageConfig['settings']>({})

export const useSettings = () => {
  return useContext(SageSettingsContext)
}

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
