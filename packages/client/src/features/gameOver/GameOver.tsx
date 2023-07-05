import { Link } from 'react-router-dom'

import { Button, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'

export const GameOver = ({
  context,
  id,
}: ContextModalProps<{ id: string }>) => {
  return (
    <>
      <Button
        mt="md"
        ml="33%"
        component={Link}
        to="/game"
        onClick={() => context.closeModal(id)}>
        Начать заново
      </Button>
      <Text fz="md" mt="md" ta="center">
        Счет игры: 12
      </Text>
      <Button
        mt="lg"
        mb="xl"
        ml="22%"
        variant="outline"
        component={Link}
        to="/"
        onClick={() => context.closeModal(id)}>
        Вернуться в главное меню
      </Button>
    </>
  )
}
