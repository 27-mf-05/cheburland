import { FC, ReactNode } from 'react'

import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export const ModalWrapper: FC<{
  size: string
  title: string
  isOpened: boolean
  setOpened: any
  children: ReactNode
}> = ({ title = '', size = 'md', isOpened = false, setOpened, children }) => {
  const [, { close }] = useDisclosure(isOpened)

  const onClose = () => {
    if (setOpened) setOpened(false)
    close()
  }

  return (
    <Modal
      size={size}
      opened={isOpened}
      onClose={onClose}
      title={title}
      centered
      closeOnEscape={true}
      closeButtonProps={{ 'aria-label': 'Close modal' }}>
      {children}
    </Modal>
  )
}
