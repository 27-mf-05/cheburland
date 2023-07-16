import type { FC } from 'react'
import { useEffect } from 'react'

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

  return <Game onCollision={onIncreaseScore} />
}
