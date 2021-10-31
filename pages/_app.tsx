import React from 'react'
import App, { AppProps } from 'next/app'
import SageAppConfig from '../sage.app.config'

import sageLinkMap from '../sage.link-map.json'
import { SageLink, SagePage } from '../sage/processSource/processTypes'

const Shell = SageAppConfig.components.shell

type SageComponent = AppProps['Component'] & { page: SagePage }

const SageApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const { page } = Component as SageComponent
  return (
    <Shell linkMap={sageLinkMap as Record<string, SageLink>} page={page}>
      <Component {...pageProps} {...page} linkMap={sageLinkMap} />
    </Shell>
  )
}

export default SageApp
