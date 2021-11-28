import { useCallback, useEffect } from 'react'
import { QuestionDef, useQuestionService } from '../services/service.question'
import { useObeyRemotePath, useRemoteZoom } from '../services/service.remote'
import { useCssVars } from '../services/service.css-vars'
import { useCurrentPage } from '../contexts'

export const Brain = () => {
  useObeyRemotePath()
  const resource = useCurrentPage()
  const questionService = useQuestionService()
  const { cssVars, updateCssVars } = useCssVars()
  useEffect(() => {
    if (resource.type === 'file' && resource.kind === 'question') {
      questionService.setQurrentQuestion(resource.processed as QuestionDef)
    } else {
      questionService.setQurrentQuestion(null)
    }
  }, [resource])
  const handleRemoteZoomChange = useCallback(
    (zoom) => updateCssVars({ zoom }),
    [updateCssVars]
  )
  useRemoteZoom(handleRemoteZoomChange)
  return null
}

export default Brain
