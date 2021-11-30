import dynamic from 'next/dynamic'
import React from 'react'
import { SageFileComponent } from '.'

const BrowserReactJsonView = dynamic(() => import('react-json-view'), {
  ssr: false,
})

export const Json: SageFileComponent<Record<string, any>> = (props) => {
  const { resource } = props
  const {
    processed: {
      name,
      json,
      collapsed = false,
      displayDataTypes = false,
      displayObjectSize = false,
      enableClipboard = false,
    },
  } = resource
  return (
    <BrowserReactJsonView
      name={name ?? false}
      src={json}
      collapsed={collapsed}
      displayDataTypes={displayDataTypes}
      displayObjectSize={displayObjectSize}
      enableClipboard={enableClipboard}
    />
  )
}

export default Json
