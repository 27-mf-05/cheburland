import { type FC, memo } from 'react'

import { Button, Flex, Image, Stack, Text } from '@mantine/core'

import cheburashka from '@/assets/images/cheburashka.png'
import maze from '@/assets/images/maze.png'
import { GAME_DESCRIPTION } from '@/shared'

type GameInfoProps = {
  onModalStart: () => void
}

export const GameInfo: FC<GameInfoProps> = memo(
  ({ onModalStart }): JSX.Element => {
    return (
      <Stack p={32}>
        <Flex p={32} w={'50%'} m={'auto'}>
          <Text align="center">{GAME_DESCRIPTION}</Text>
        </Flex>
        <Flex p={32}>
          <Image maw={240} mx="auto" src={cheburashka} alt="Cheburashka" />
          <Image maw={240} mx="auto" src={maze} alt="Maze" />
        </Flex>
        <Flex p={32}>
          <Button w={'50%'} m={'auto'} size="lg" onClick={onModalStart}>
            Начать
          </Button>
        </Flex>
      </Stack>
    )
  }
)
