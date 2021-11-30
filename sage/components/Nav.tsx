import classNames from 'classnames'
import { SageLink, SageResource } from '../processSource/processTypes'
import { ResourceLink } from './ResourceLink'

import css from './Nav.module.css'

type NavProps = {
  linkMap: Record<string, SageLink>
  resource: SageResource
}

export const Nav = (props: NavProps) => {
  const { resource, linkMap } = props
  const { crumbs } = resource
  const folderIds = crumbs.concat(
    resource.type === 'folder'
      ? resource.id
      : resource.type === 'root'
      ? 'root'
      : []
  )
  const currentFolderId = folderIds.slice(-1)[0]
  const fileIds = (linkMap[currentFolderId]?.contains ?? []).sort((id1, id2) =>
    linkMap[id1].sort < linkMap[id2].sort ? -1 : 1
  )
  return (
    <ul className={classNames('bp4-overflow-list bp4-breadcrumbs', css.nav)}>
      {folderIds.map((folderId) => (
        <li key={folderId}>
          <ResourceLink
            key={folderId}
            link={linkMap[folderId]}
            vertical
            active={folderId === resource.id}
          />
        </li>
      ))}
      <li className={css['nav-files']}>
        {fileIds.map((fileId) => (
          <ResourceLink
            key={fileId}
            link={linkMap[fileId]}
            vertical
            active={fileId === resource.id}
          />
        ))}
      </li>
    </ul>
  )
}

export default Nav
