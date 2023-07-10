import { Button, Flex, Image, Paper, Stack, Text } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import cheburashka from '@/assets/images/cheburashka.png'
import maze from '@/assets/images/maze.png'

import { gameDescription } from './constants'

export const Game = (): JSX.Element => (
  <ModalsProvider>
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
          <Button mx="auto" mt="xl" size="lg">
            Начать
          </Button>
        </Stack>
      </Paper>
    </Stack>
  </ModalsProvider>
)
