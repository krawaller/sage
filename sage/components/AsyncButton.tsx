import { Button, ButtonProps } from '@blueprintjs/core'
import { ReactNode, useCallback, useState } from 'react'

type Evt = Parameters<NonNullable<ButtonProps['onClick']>>[0]

type AsyncButtonprops = Omit<ButtonProps, 'onClick'> & {
  onClick: (e: Evt) => Promise<unknown>
  children?: ReactNode
}

export const AsyncButton = (props: AsyncButtonprops) => {
  const { onClick: onClickInner } = props
  const [loading, setLoading] = useState(false)
  const onClick = useCallback(
    (e: Evt) => {
      setLoading(true)
      const promise = onClickInner(e)
      promise.finally(() => setLoading(false)) // TODO - check if mounted
      return promise
    },
    [onClickInner]
  )
  return <Button {...props} onClick={onClick} loading={loading} />
}
