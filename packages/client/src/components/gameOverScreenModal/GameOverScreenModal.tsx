import { Link } from 'react-router-dom'

import { Button, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import './index.css'

export const GameOverScreenModal = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        size="md"
        opened={opened}
        onClose={close}
        title="Игра завершена"
        centered>
        <Button mt="md" ml="30%" component={Link} to="/game" onClick={close}>
          Начать заново
        </Button>
        <Text fz="md" mt="md" ta="center">
          Счет игры: 12
        </Text>
        <Button
          mt="md"
          mb="md"
          ml="22%"
          component={Link}
          to="/"
          onClick={close}>
          Вернуться в главное меню
        </Button>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  )
}
