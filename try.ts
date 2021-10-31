import fs from 'fs-extra'
import path from 'path'
import { processSource } from './sage'
import config from './sage.config'

const seed = path.join(__dirname, 'seed')

;(async () => {
  console.log('LETS SEE...')
  const result = await processSource({
    sourcePath: seed,
    plugins: config.processors,
  })
  fs.writeFile('try.results.json', JSON.stringify(result, null, 2))
  console.log('WEE!')
})()
