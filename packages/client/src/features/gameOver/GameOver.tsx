import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Text } from '@mantine/core'

import { ModalWrapper } from '@/components/modalWrapper'

export const GameOver = ({ isOpenned = false }) => {
  const [opened, setOpened] = useState(isOpenned)

  return (
    <ModalWrapper size="md" isOpenned={opened} title="Игра завершена">
      <Button
        mt="md"
        ml="33%"
        component={Link}
        to="/game"
        onClick={() => setOpened(false)}>
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
        onClick={() => setOpened(false)}>
        Вернуться в главное меню
      </Button>
    </ModalWrapper>
  )
}
