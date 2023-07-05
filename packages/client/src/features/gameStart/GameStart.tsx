import { useEffect, useState } from 'react'

import { Flex, Text } from '@mantine/core'

export const GameStart = (): JSX.Element => {
  const [count, setCount] = useState(3)

  useEffect(() => {
    let startTimestamp: number | null = null
    let animationFrameId: number | null = null

    const animate = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp
      }

      const progress = timestamp - startTimestamp

      if (progress >= 1000) {
        setCount(prevCount => {
          if (prevCount === 1) {
            cancelAnimationFrame(animationFrameId as number)
            //здесь можно сделать переход на страницу игры
          }
          startTimestamp = timestamp
          return prevCount - 1
        })
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <Flex align="center" justify="center">
      <Text size="150px" weight={700} color="brand.2">
        {count}
      </Text>
    </Flex>
  )
}
