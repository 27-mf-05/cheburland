import { Link } from 'react-router-dom'

import { Button, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export const GameOverScreenModal = ({ isOpenned = false }) => {
  const [opened, { close }] = useDisclosure(isOpenned)

  return (
    <Modal
      size="md"
      opened={opened}
      onClose={close}
      title="Игра завершена"
      centered>
      <Button mt="md" ml="33%" component={Link} to="/game" onClick={close}>
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
        onClick={close}>
        Вернуться в главное меню
      </Button>
    </Modal>
  )
}
