import { Link } from 'react-router-dom'

import { Button, Text } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'

import { useAppSelector, useRoutes } from '@/hooks'
import { useNotificationApi } from '@/hooks/useNotificationApi'

type GameOverProps = ContextModalProps<{
  id: string
  startGame: () => void
}>

export const GameOver = ({ context, id, innerProps }: GameOverProps) => {
  const { paths } = useRoutes()
  const { score: gameScore } = useAppSelector(({ game }) => game)
  const { startGame } = innerProps
  useNotificationApi(gameScore)

  return (
    <>
      <Button mt="md" ml="33%" onClick={startGame}>
        Начать заново
      </Button>
      <Text fz="md" mt="md" ta="center">
        Счет игры: {gameScore}
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
