import React from 'react'
import Folder from '../sage/components/Folder' // Populate in template
import type {
  SageFolderComponent,
  SageFolderComponentProps,
} from '../sage/components'

const HomePage: SageFolderComponent = (props: SageFolderComponentProps) => {
  return <Folder {...props} />
}
HomePage.page = require('../try.results.json').pages.root

export default HomePage
