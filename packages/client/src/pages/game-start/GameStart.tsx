import { useEffect, useState } from 'react'

import { Text } from '@mantine/core'

import { BgWrapper } from '@/components/bgWrapper'

export const GameStart = (): JSX.Element => {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => {
        if (count === 1) {
          clearInterval(interval)
          //сюда можно прописать переключение экрана на страницу игры
        }
        return --count
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <BgWrapper>
      <Text size="150px" weight={700} color="white">
        {count}
      </Text>
    </BgWrapper>
  )
}
