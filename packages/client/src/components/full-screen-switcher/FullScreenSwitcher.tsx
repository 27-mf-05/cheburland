import { useEffect } from 'react'

import { Flex } from '@mantine/core'
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react'

import { useFullScreen } from '@/hooks'

export const FullScreenSwitcher = (): JSX.Element => {
  const { open, close, isFullScreen } = useFullScreen()

  useEffect(() => {
    return () => {
      close()
    }
  }, [close])

  return (
    <Flex
      justify="center"
      sx={theme => ({
        color: theme.colors.gray[4],
        '&:hover': {
          color: theme.colors.gray[9],
          cursor: 'pointer',
        },
      })}>
      {isFullScreen ? (
        <IconArrowsMinimize onClick={close} />
      ) : (
        <IconArrowsMaximize onClick={open} />
      )}
    </Flex>
  )
}
