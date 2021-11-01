import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
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
  const { Component: NextComponent, pageProps } = props
  const Component = NextComponent as unknown as SageComponent
  const { resource } = Component
  return (
    <SageLinkMapContext.Provider value={sageLinkMap}>
      <SagePageContext.Provider value={resource}>
        {resource && (
          <>
            <Head>
              <title>{sageLinkMap[resource.id].short}</title>
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <Shell
              linkMap={sageLinkMap as Record<string, SageLink>}
              resource={resource}
            >
              <Component
                {...pageProps}
                resource={resource}
                linkMap={sageLinkMap}
              />
            </Shell>
          </>
        )}
      </SagePageContext.Provider>
    </SageLinkMapContext.Provider>
  )
}

export default SageApp
