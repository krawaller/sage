import { createContext, useContext } from 'react'
import { SageLink, SagePage } from '../processSource/processTypes'

export const SageLinkMapContext = createContext<Record<string, SageLink>>({})

export const SagePageContext = createContext<SagePage>(
  {} as unknown as SagePage
)

export const useLinkMap = () => {
  return useContext(SageLinkMapContext)
}

export const useCurrentPage = () => {
  return useContext(SagePageContext)
}
