import path from 'path'
import fs from 'fs-extra'
import { processSource } from './sage'
import config from './sage.config'
import { writeNextApp } from './sage/app'

const sourcePath = path.join(__dirname, 'presentation')

;(async () => {
  console.log('LETS SEE...')
  const result = await processSource({
    sourcePath,
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
