import { FC, ReactNode } from 'react'

import { BackgroundImage, Flex } from '@mantine/core'

import bgImage from '@/assets/images/cheburashka_background.jpg'

export const BgWrapper: FC<{
  children: ReactNode
}> = ({ children }) => (
  <BackgroundImage src={bgImage}>
    <Flex
      align="center"
      justify="center"
      id="gameStart"
      h="100vh"
      w="100vw"
      sx={() => ({ background: 'rgba(0,0,0,0.4)' })}>
      {children}
    </Flex>
  </BackgroundImage>
)
