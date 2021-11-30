import React, { FunctionComponent } from 'react'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'
import { useSelector } from 'react-redux'
import { AppState } from '../redux'
import { SetSelector } from './SetSelector'
import { Guess } from './Guess'

type MainProps = {
  version: string
}

export const Main: FunctionComponent<MainProps> = ({ version }) => {
  const { currentThemeId, currentSetId } = useSelector(({ ui }: AppState) => ui)
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h3
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Super Castle Lego piece guesser</span>
        <small style={{ fontWeight: 'normal', marginTop: '5px' }}>
          ({version})
        </small>
      </h3>
      <div style={{ display: 'flex' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ThemeSelector />
            {currentThemeId && <SetSelector />}
          </div>
          <Theme />
        </div>
        {currentSetId && (
          <div style={{ width: '200px' }}>
            <Guess />
          </div>
        )}
      </div>
    </div>
  )
}