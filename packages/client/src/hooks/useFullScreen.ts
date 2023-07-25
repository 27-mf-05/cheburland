import { useCallback, useEffect, useState } from 'react'

type FullScreen = {
  isFullScreen: boolean | undefined
  open: () => void
  close: () => void
  toggle: () => void
}

export const useFullScreen = (fsElement?: Element | null): FullScreen => {
  const isFullScreenElement = (
    element?: Element | null
  ): boolean | undefined => {
    if (typeof window === 'undefined') {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = document as any
    if (element) {
      return Boolean(
        d.fullscreenElement == element ||
          d.mozFullScreenElement == element ||
          d.webkitFullscreenElement == element ||
          d.msFullscreenElement == element
      )
    }
    return Boolean(
      d.fullscreenElement ||
        d.mozFullScreenElement ||
        d.webkitFullscreenElement ||
        d.msFullscreenElement ||
        d.mozFullScreen ||
        d.mozFullScreenEnabled ||
        d.webkitIsFullScreen ||
        d.fullScreenMode
    )
  }

  const [isFullScreen, setFullScreen] = useState<boolean | undefined>(() =>
    isFullScreenElement(fsElement)
  )

  const openFullScreen = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = fsElement || (document.documentElement as any)

    const requestFullScreen =
      element.requestFullscreen ||
      element.mozRequestFullScreen ||
      element.webkitRequestFullscreen ||
      element.msRequestFullscreen

    return requestFullScreen.call(element)
  }, [fsElement])

  const closeFullScreen = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = document as any
    const requestCloseFullScreen =
      d.webkitExitFullscreen ||
      d.exitFullscreen ||
      d.msExitFullscreen ||
      d.mozCancelFullScreen

    requestCloseFullScreen.call(d)
  }, [])

  const handleChange = useCallback(() => {
    setFullScreen(isFullScreenElement(fsElement))
  }, [fsElement])

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', handleChange, false)
    document.addEventListener('mozfullscreenchange', handleChange, false)
    document.addEventListener('msfullscreenchange', handleChange, false)
    document.addEventListener('MSFullscreenChange', handleChange, false)

    document.addEventListener('fullscreenchange', handleChange, false)

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleChange)
      document.removeEventListener('mozfullscreenchange', handleChange)
      document.removeEventListener('msfullscreenchange', handleChange)
      document.removeEventListener('MSFullscreenChange', handleChange)

      document.removeEventListener('fullscreenchange', handleChange)
    }
  }, [fsElement, handleChange])

  return {
    isFullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: isFullScreen ? closeFullScreen : openFullScreen,
  }
}
