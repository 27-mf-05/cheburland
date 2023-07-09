import { Button, Flex, Image, Stack, Text } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import cheburashka from '@/assets/images/cheburashka.png'
import maze from '@/assets/images/maze.png'

import { gameDescription } from './constants'

export const Game = (): JSX.Element => (
  <ModalsProvider>
    <Flex justify="center" p="lg">
      <Stack id="game" w="500px">
        <Text>{gameDescription}</Text>
        <Flex>
          <Image
            width={240}
            mx="auto"
            src={cheburashka}
            alt="Cheburashka image"
          />
          <Image
            width={240}
            mx="auto"
            mt="lg"
            mb="xl"
            src={maze}
            alt="Maze image"
          />
        </Flex>
        <Button w="300px" mx="auto" mt="xl" size="lg">
          Начать
        </Button>
      </Stack>
    </Flex>
  </ModalsProvider>
)
