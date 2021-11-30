import { useCallback } from 'react'
import { useCssVars } from '../services/service.css-vars'

export const useRegisterGhost = (
  elem: HTMLElement | null | undefined,
  prefix: string | undefined
) => {
  const { updateCssVars } = useCssVars()
  return useCallback(() => {
    if (elem && prefix) {
      const { x, y, width, height } = elem.getBoundingClientRect()
      updateCssVars({
        [`--${prefix}-x`]: x,
        [`--${prefix}-y`]: y,
        [`--${prefix}-width`]: width,
        [`--${prefix}-height`]: height,
      })
    }
  }, [prefix, elem])
}

export const useUnregisterGhost = (prefix: string) => {
  const { updateCssVars } = useCssVars()
  return useCallback(() => {
    updateCssVars({
      [`--${prefix}-x`]: undefined,
      [`--${prefix}-y`]: undefined,
      [`--${prefix}-width`]: undefined,
      [`--${prefix}-height`]: undefined,
    })
  }, [prefix])
}
