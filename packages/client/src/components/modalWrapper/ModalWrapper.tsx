import { FC, ReactNode } from 'react'

import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export const ModalWrapper: FC<{
  size: string
  title: string
  isOpenned: boolean
  children: ReactNode
}> = ({ title = '', size = 'md', isOpenned = false, children }) => {
  const [opened, { close }] = useDisclosure(isOpenned)

  return (
    <Modal
      size={size}
      opened={opened}
      onClose={close}
      title={title}
      centered
      closeOnEscape={true}>
      {children}
    </Modal>
  )
}
