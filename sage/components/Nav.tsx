import classNames from 'classnames'
import { SageLink, SageResource } from '../processSource/processTypes'
import { ResourceLink } from './ResourceLink'

import css from './Nav.module.css'
import { Possessor } from './Possessor'

type NavProps = {
  linkMap: Record<string, SageLink>
  resource: SageResource
}

const prefixes = ['nav-highlight']

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
    <>
      <Possessor prefixes={prefixes}>
        <div className={css['nav-highlight']} />
      </Possessor>
      <ul className={classNames('bp4-overflow-list bp4-breadcrumbs', css.nav)}>
        {folderIds.map((folderId) => (
          <li key={folderId}>
            <ResourceLink
              key={folderId}
              link={linkMap[folderId]}
              vertical
              prefix={folderId === resource.id ? 'nav-highlight' : undefined}
            />
          </li>
        ))}
        <li className={css['nav-files']}>
          {fileIds.map((fileId) => (
            <ResourceLink
              key={fileId}
              link={linkMap[fileId]}
              vertical
              prefix={fileId === resource.id ? 'nav-highlight' : undefined}
            />
          ))}
        </li>
      </ul>
    </>
  )
}

export default Nav
