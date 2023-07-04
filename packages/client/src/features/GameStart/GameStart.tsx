import { useEffect, useState } from 'react'

import { BackgroundImage, Flex, Text } from '@mantine/core'

import bgImage from '@/assets/images/cheburashka_background.jpg'

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
    <BackgroundImage src={bgImage}>
      <Flex align="center" justify="center" id="gameStart" h="100vh" w="100vw">
        <Text size="150px" weight={700} color="white">
          {count}
        </Text>
      </Flex>
    </BackgroundImage>
  )
}
