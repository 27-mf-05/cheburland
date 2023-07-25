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
      <Stack align="center" justify="center" h="100vh" p={32}>
        <Flex p={32}>
          <Stack w={'50%'}>
            <Flex p={32}>
              <Text align="center">{GAME_DESCRIPTION}</Text>
            </Flex>

            <Flex p={32}>
              <Image maw={240} mx="auto" src={cheburashka} alt="Cheburashka" />
              <Image maw={240} mx="auto" src={maze} alt="Maze" />
            </Flex>
            <Flex p={32}>
              <Button fullWidth size="lg" onClick={onModalStart}>
                Начать
              </Button>
            </Flex>
          </Stack>

          {/* TODO: add game settings block */}
          <Stack w="50%" h="100%">
            <Text p={32} align="center">
              Game settings block
            </Text>
          </Stack>
        </Flex>
      </Stack>
    )
  }
)
