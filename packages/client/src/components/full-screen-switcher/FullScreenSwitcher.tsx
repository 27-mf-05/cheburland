import { useEffect } from 'react'

import { Box } from '@mantine/core'
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react'

import { useFullScreen } from '@/hooks'

export const FullScreenSwitcher = (): JSX.Element => {
  const { open, close, isFullScreen } = useFullScreen()

  useEffect(() => {
    return () => {
      isFullScreen && close()
    }
  }, [close, isFullScreen])

  return (
    <Box
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
    </Box>
  )
}
