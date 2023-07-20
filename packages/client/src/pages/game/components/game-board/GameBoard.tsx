import type { FC } from 'react'
import { useEffect } from 'react'

import { Flex } from '@mantine/core'

import { Game } from '@/core'
import { gameDuration } from '@/pages/game/constants'

type GameBoardProps = {
  onFinishGame: () => void
  onIncreaseScore: () => void
}

export const GameBoard: FC<GameBoardProps> = ({
  onFinishGame,
  onIncreaseScore,
}): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinishGame()
    }, gameDuration)

    return () => {
      clearTimeout(timer)
    }
  }, [onFinishGame])

  return (
    <Flex justify="center" align="center" w="100wv" h="100vh">
      <Game
        onCollision={onIncreaseScore}
        rowsAndColumns={9}
        cellSize={65}
        erasers={10}
      />
    </Flex>
  )
}
