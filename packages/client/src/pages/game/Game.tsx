import { Button, Flex, Image, Paper, Stack, Text } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import cheburashka from '@/assets/images/cheburashka.png'
import maze from '@/assets/images/maze.png'

import { gameDescription } from './constants'

export const Game = (): JSX.Element => (
  <ModalsProvider>
    <Paper id="game" shadow="xs" py="md" px="xl">
      <Flex
        py={16}
        justify="center"
        align="center"
        direction="column"
        h="100vh">
        <Stack id="game" w="500px">
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
      </Flex>
    </Paper>
  </ModalsProvider>
)
