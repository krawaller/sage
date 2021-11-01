import React from 'react'
import Graph from '../../sage/components/Graph' // Populate in template
import type { SageFileComponent } from '../../sage/components'

const GraphPage: SageFileComponent = (props) => {
  return <Graph {...props} />
}
GraphPage.resource = require('../../try.results.json').resources[
  'graph.fnerp.dot'
] // Inline in template

export default GraphPage
