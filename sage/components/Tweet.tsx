import { Spinner } from '@blueprintjs/core'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { SageFileComponent } from './componentTypes'

import css from './Tweet.module.css'

export const Tweet: SageFileComponent<Record<string, any>> = (props) => {
  const [elem, setElem] = useState<HTMLDivElement | null>()
  const [loaded, setLoaded] = useState(false)
  const { statusId } = props.resource.processed
  useEffect(() => {
    if (elem) {
      // @ts-ignore
      twttr.widgets
        .createTweet(statusId.toString(), elem, {
          align: 'left',
        })
        .then(() => setLoaded(true))
    }
  }, [elem])
  return (
    <>
      <div
        className={classNames(
          css['sage-tweet'],
          !loaded && css['tweet-loading']
        )}
        ref={setElem}
      />
      {!loaded && <Spinner />}
    </>
  )
}

export default Tweet
