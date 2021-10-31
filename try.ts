import fs from 'fs-extra'
import path from 'path'
import { codePlugin, graphPlugin, markdownPlugin, processSource } from './sage'

const seed = path.join(__dirname, 'seed')
const plugins = [graphPlugin, codePlugin, markdownPlugin]

;(async () => {
  console.log('LETS SEE...')
  const result = await processSource({
    sourcePath: seed,
    plugins,
  })
  fs.writeFile('try.results.json', JSON.stringify(result, null, 2))
  console.log('WEE!')
})()