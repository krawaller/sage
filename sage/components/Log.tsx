import { Classes, Drawer } from '@blueprintjs/core'
import dynamic from 'next/dynamic'
import { useSettings } from '../contexts'
import { useLogService } from '../services/service.log'

const BrowserReactJsonView = dynamic(() => import('react-json-view'), {
  ssr: false,
})

export const Log = () => {
  const { logIsOpen, closeLog, logs, clearLog } = useLogService()
  const { emojis } = useSettings()
  return (
    <Drawer
      title="Log"
      isOpen={logIsOpen}
      onClose={closeLog}
      icon={<span>{emojis.log}&nbsp;&nbsp;</span>}
    >
      <div className={Classes.DRAWER_BODY}>
        <div className={Classes.DIALOG_BODY}>
          {logs.map(({ log, category }, i) => (
            <div key={i}>
              <BrowserReactJsonView
                name={category}
                key={i}
                src={log}
                collapsed
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={Classes.DRAWER_FOOTER}>
        <button onClick={clearLog}>Clear</button>
      </div>
    </Drawer>
  )
}

export default Log
