import { FC, ReactNode } from 'react'

import { Flex } from '@mantine/core'

type GameBoardProps = {
  children: ReactNode
}

export const GameBoard: FC<GameBoardProps> = ({ children }): JSX.Element => (
  <Flex justify="center" align="center" direction="column" h="100vh">
    {children}
  </Flex>
)
