import { SageResource } from './processTypes'

export const getResourceRecord = (pages: SageResource[]) => {
  return pages.reduce<Record<string, SageResource>>((memo, page) => {
    if (memo[page.id]) {
      throw new Error(`Duplicate pages have identifier "${page.id}"`)
    }
    memo[page.id] = page
    return memo
  }, {})
}
