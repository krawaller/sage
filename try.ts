import fs from 'fs-extra'
import path from 'path'
import { processSource } from './sage'
import config from './sage.config'
import { writeApp } from './sage/app/writeApp'
import { writeRoot } from './sage/app/writeRoot'
import { SageRootResource } from './sage/processSource/processTypes'

const seed = path.join(__dirname, 'seed')

;(async () => {
  console.log('LETS SEE...')
  const result = await processSource({
    sourcePath: seed,
    plugins: config.processors,
  })
  fs.writeFile('try.results.json', JSON.stringify(result, null, 2))
  fs.writeFile('sage.link-map.json', JSON.stringify(result.links, null, 2))
  writeApp({ linkMap: result.links, config })
  writeRoot({ config, resource: result.resources.root as SageRootResource })
  console.log('WEE!')
})()
