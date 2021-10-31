import { SagePage } from './processTypes'

export const getPageRecord = (pages: SagePage[]) => {
  return pages.reduce<Record<string, SagePage>>((memo, page) => {
    if (memo[page.id]) {
      throw new Error(`Duplicate pages have identifier "${page.id}"`)
    }
    memo[page.id] = page
    return memo
  }, {})
}
