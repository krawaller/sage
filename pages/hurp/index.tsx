import React from 'react'
import Folder from '../../sage/components/Folder' // Populate in template
import type { SageFolderComponent } from '../../sage/components'

const FolderPage: SageFolderComponent = (props) => {
  return <Folder {...props} />
}
FolderPage.resource = require('../../try.results.json').resources['hurp'] // Inline in template

export default FolderPage
