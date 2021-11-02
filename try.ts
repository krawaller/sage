import path from 'path'
import fs from 'fs-extra'
import { processSource } from './sage'
import config from './sage.config'
import { writeNextApp } from './sage/app'

const seed = path.join(__dirname, 'seed')

;(async () => {
  console.log('LETS SEE...')
  const result = await processSource({
    sourcePath: seed,
    plugins: config.processors,
  })
  await fs.remove(path.join(__dirname, 'pages'))
  await writeNextApp({
    config,
    linkMap: result.links,
    resources: Object.values(result.resources),
    sagePath: './sage',
  })
  console.log('WEE!')
})()
