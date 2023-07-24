import { FC, ReactNode, useEffect } from 'react'

import { Box, Flex } from '@mantine/core'
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react'

import { useFullScreen } from '@/hooks'
import { useAppSelector } from '@/hooks'
import { GameStatus } from '@/shared'

type GameBoardProps = {
  children: ReactNode
  gameInfo: ReactNode
}

export const GameBoard: FC<GameBoardProps> = ({
  children,
  gameInfo,
}): JSX.Element => {
  const { open, close, isFullScreen } = useFullScreen()
  const { status: gameStatus } = useAppSelector(({ game }) => game)

  useEffect(() => {
    console.info(gameStatus)
    console.info(isFullScreen)

    gameStatus === GameStatus.Finished && isFullScreen && close()
  }, [gameStatus, isFullScreen])
  return (
    <Flex justify="center" align="center" direction="column" h="100vh">
      <Box>
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
        {children}
      </Box>
    </Flex>
  )
}
