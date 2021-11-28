import { createContext, useContext } from 'react'
import { SageConfig } from './configTypes'
import { SageLink, SageResource } from './processSource/processTypes'

export const SageDomainContext = createContext('unknown')

export const useDomain = () => {
  return useContext(SageDomainContext)
}

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
