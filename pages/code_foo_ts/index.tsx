import React from 'react'
import Code from '../../sage/components/Code' // Populate in template
import type { SageFileComponent } from '../../sage/components'

const CodePage: SageFileComponent = (props) => {
  return <Code {...props} />
}
CodePage.resource = require('../../try.results.json').resources['code.foo.ts'] // Inline in template

export default CodePage
