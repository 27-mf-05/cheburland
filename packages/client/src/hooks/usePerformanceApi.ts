import { useCallback, useState } from 'react'

export const usePerformanceApi = () => {
  const [fps, setFps] = useState(0)
  let lastCalledTime: number

  const getFps = useCallback((now: number) => {
    if (!lastCalledTime) {
      lastCalledTime = now
      setFps(0)
    } else {
      const delta = (now - lastCalledTime) / 1000
      lastCalledTime = now
      setFps(1 / delta)
    }
  }, [])

  return {
    fps: fps.toFixed(),
    getFps: getFps,
  }
}
