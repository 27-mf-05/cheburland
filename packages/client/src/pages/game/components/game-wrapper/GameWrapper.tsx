import { FC, ReactNode } from 'react'

import { Stack } from '@mantine/core'

type GameBoardProps = {
  children: ReactNode
}

export const GameWrapper: FC<GameBoardProps> = ({ children }): JSX.Element => (
  <Stack justify="center" align="center" h="100%" mt="auto" mb="auto">
    {children}
  </Stack>
)
