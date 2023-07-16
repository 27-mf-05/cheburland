import type { FC } from 'react'

import { Button, Flex, Image, Paper, Stack, Text } from '@mantine/core'

import cheburashka from '@/assets/images/cheburashka.png'
import maze from '@/assets/images/maze.png'
import { gameDescription } from '@/pages/game/constants'

type GameRulesProps = {
  onOpenGameStartModal: () => void
}

export const GameRules: FC<GameRulesProps> = ({
  onOpenGameStartModal,
}): JSX.Element => {
  return (
    <Stack id="game" h="100%">
      <Paper shadow="xs" py="md" px="xl" h="100%">
        <Stack p={32}>
          <Text>{gameDescription}</Text>
          <Flex>
            <Image width={240} mx="auto" src={cheburashka} alt="Cheburashka" />
            <Image
              width={240}
              mx="auto"
              mt="lg"
              mb="xl"
              src={maze}
              alt="Maze"
            />
          </Flex>
          <Button mx="auto" mt="xl" size="lg" onClick={onOpenGameStartModal}>
            Начать
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
