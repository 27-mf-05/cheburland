import { useCallback, useEffect, useState } from 'react'

export const isFullScreenElement = (
  element?: Element | null
): boolean | undefined => {
  if (typeof window === 'undefined') {
    return
  }
  const d = document
  if (element) {
    return Boolean(
      d.fullscreenElement == element ||
        // @ts-ignore
        d.mozFullScreenElement == element ||
        // @ts-ignore
        d.webkitFullscreenElement == element ||
        // @ts-ignore
        d.msFullscreenElement == element
    )
  }
  return Boolean(
    d.fullscreenElement ||
      // @ts-ignore
      d.mozFullScreenElement ||
      // @ts-ignore
      d.webkitFullscreenElement ||
      // @ts-ignore
      d.msFullscreenElement ||
      // @ts-ignore
      d.mozFullScreen ||
      // @ts-ignore
      d.webkitIsFullScreen ||
      // @ts-ignore
      d.fullScreenMode
  )
}

type FullScreen = {
  isFullScreen: boolean | undefined
  open: () => void
  close: () => void
  toggle: () => void
}

export const useFullScreen = (fsElement?: Element | null): FullScreen => {
  const [isFullScreen, setFullScreen] = useState(() =>
    isFullScreenElement(fsElement)
  )

  const openFullScreen = () => {
    const element = fsElement || document.documentElement

    const requestFullScreen =
      element.requestFullscreen ||
      // @ts-ignore
      element.mozRequestFullScreen ||
      // @ts-ignore
      element.webkitRequestFullscreen ||
      // @ts-ignore
      element.msRequestFullscreen

    return requestFullScreen.call(element)
  }

  const closeFullScreen = () => {
    const requestCloseFullScreen =
      // @ts-ignore
      document.webkitExitFullscreen ||
      document.exitFullscreen ||
      // @ts-ignore
      document.mozCancelFullScreen ||
      // @ts-ignore
      document.msExitFullscreen

    requestCloseFullScreen.call(document)
  }

  const handleChange = useCallback(() => {
    setFullScreen(isFullScreenElement(fsElement))
  }, [fsElement])

  useEffect(() => {
    setFullScreen(isFullScreenElement(fsElement))
  }, [])

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
