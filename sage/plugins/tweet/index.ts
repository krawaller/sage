import { SagePlugin } from '../pluginTypes'
import { tweetProcessor } from './tweet-processor'

export const tweetPlugin: SagePlugin<Record<string, any>> = {
  processor: tweetProcessor,
}
