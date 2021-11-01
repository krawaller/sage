import { SageLink, SageResource } from './processTypes'

export const getLinkRecord = (
  pageMap: Record<string, SageResource>
): Record<string, SageLink> => {
  return Object.fromEntries(
    Object.entries(pageMap).map(([id, page]): [string, SageLink] => [
      id,
      {
        type: page.type,
        kind: page.type === 'file' ? page.kind : 'folder',
        path:
          id === 'root'
            ? '/'
            : '/' +
              page.crumbs
                .slice(1)
                .concat(page.id)
                .join('_')
                .replace(/\./g, '_'),
        short:
          page.meta.short || (page.type === 'file' && page.name) || page.id,
      },
    ])
  )
}
