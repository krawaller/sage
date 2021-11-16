import React, { FunctionComponent } from 'react'

import { AppState, selectCurrentThemeSets } from '../redux'
import { useSelector } from 'react-redux'

import { Set } from './Set'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId } = useSelector((state: AppState) => ({
    ...state.ui,
    sets: selectCurrentThemeSets(state),
  }))

  if (!currentThemeId) {
    return null
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {currentSetId && <Set key={currentSetId} />}
    </div>
  )
}
