import { createContext, useContext } from 'react'
import { SageLink, SageResource } from '../processSource/processTypes'

export const SageLinkMapContext = createContext<Record<string, SageLink>>({})

export const SagePageContext = createContext<SageResource>(
  {} as unknown as SageResource
)

export const useLinkMap = () => {
  return useContext(SageLinkMapContext)
}

export const useCurrentPage = () => {
  return useContext(SagePageContext)
}
