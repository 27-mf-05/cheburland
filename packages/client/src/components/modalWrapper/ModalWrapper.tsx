import { FC, ReactNode } from 'react'

import { Modal } from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'

export const ModalWrapper: FC<{
  size: string
  title: string
  openned: boolean
  close: () => void
  children: ReactNode
}> = ({ title = '', size = 'md', openned = false, close, children }) => {
  // const [openned] = useDisclosure(isOpenned)

  return (
    <Modal size={size} opened={openned} onClose={close} title={title} centered>
      {children}
    </Modal>
  )
}
