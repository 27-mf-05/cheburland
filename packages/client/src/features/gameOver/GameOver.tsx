import { Link } from 'react-router-dom'

import { Button, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'

import { useRoutes } from '@/hooks'

export const GameOver = ({
  context,
  id,
}: ContextModalProps<{ id: string }>) => {
  const { paths } = useRoutes()
  return (
    <>
      <Button
        mt="md"
        ml="33%"
        component={Link}
        to={paths.Game}
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
        to={paths.Main}
        onClick={() => context.closeModal(id)}>
        Вернуться в главное меню
      </Button>
    </>
  )
}
