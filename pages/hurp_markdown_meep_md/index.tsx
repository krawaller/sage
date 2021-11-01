import React from 'react'
import Markdown from '../../sage/components/Markdown' // Populate in template
import type { SageFileComponent } from '../../sage/components'

const MarkdownPage: SageFileComponent = (props) => {
  return <Markdown {...props} />
}
MarkdownPage.resource = require('../../try.results.json').resources[
  'markdown.meep.md'
] // Inline in template

export default MarkdownPage
