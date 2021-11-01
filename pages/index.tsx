import React from 'react'
import Folder from '../sage/components/Folder' // Populate in template
import type { SageFolderComponent } from '../sage/components'

const HomePage: SageFolderComponent = (props) => {
  return <Folder {...props} />
}
HomePage.resource = require('../try.results.json').resources.root // Inline in template

export default HomePage
