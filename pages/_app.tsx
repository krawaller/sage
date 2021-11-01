import React from 'react'
import { AppProps } from 'next/app'
import type { SageLink } from '../sage/processSource/processTypes'
import Shell from '../sage/components/Shell' // Populate in template
import type { SageComponent } from '../sage/components'
import {
  SageLinkMapContext,
  SagePageContext,
} from '../sage/components/contexts'

// INLINE
import _sageLinkMap from '../sage.link-map.json'
const sageLinkMap = _sageLinkMap as Record<string, SageLink>

const SageApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const { resource } = Component as unknown as SageComponent // Won't be needed after inlining!
  return (
    <SageLinkMapContext.Provider value={sageLinkMap}>
      <SagePageContext.Provider value={resource}>
        {resource && (
          <Shell
            linkMap={sageLinkMap as Record<string, SageLink>}
            resource={resource}
          >
            <Component {...pageProps} {...resource} linkMap={sageLinkMap} />
          </Shell>
        )}
      </SagePageContext.Provider>
    </SageLinkMapContext.Provider>
  )
}

export default SageApp
