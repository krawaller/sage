import React from 'react'
import SageAppConfig from '../sage.app.config'
import {
  SageFolderComponent,
  SageFolderComponentProps,
} from '../sage/components'

const Folder = SageAppConfig.components.folder

const HomePage: SageFolderComponent = (props: SageFolderComponentProps) => {
  return <Folder {...props} />
}
HomePage.page = require('../try.results.json').pages.root

export default HomePage
