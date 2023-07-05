import { Button, Flex, Stack, Text } from '@mantine/core'
import { ContextModalProps, modals, ModalsProvider } from '@mantine/modals'

import { GameOver } from '@/features'

import { gameDescription } from './constants'

const TestModal = ({ context, id }: ContextModalProps<{ id: string }>) => (
  <>
    <Text size="sm">Test</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
)

export const Game = (): JSX.Element => (
  <ModalsProvider modals={{ gameOver: GameOver, test: TestModal }}>
    {/* TODO: add styling for page */}
    <Stack id="game">
      {/* game board component */}
      <Flex bg="brand.0">
        <Text>{gameDescription}</Text>
      </Flex>
      <Flex>
        <Button>Начать</Button>

        {/* TODO: just gor test. Should be removed */}
        <Button
          onClick={() =>
            modals.openContextModal({
              modal: 'gameOver',
              title: '',
              innerProps: null,
            })
          }>
          Завершить игру
        </Button>
      </Flex>
    </Stack>
  </ModalsProvider>
)
