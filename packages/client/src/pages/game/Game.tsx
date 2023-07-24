import { useCallback, useEffect } from 'react'

import { modals, ModalsProvider } from '@mantine/modals'

import { gameActions } from '@/app/redux/store/reducers'
import { FullScreenSwitcher } from '@/components'
import { Scene } from '@/core'
import { GameOver, GameStart } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { GameStatus } from '@/shared'

import { GameBoard, GameInfo } from './components'
import { gameDuration } from './constants'

export const Game = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { startGame, finishGame, increaseScore } = gameActions
  const { status: gameStatus } = useAppSelector(({ game }) => game)

  const handleStartGame = useCallback(() => {
    modals.closeAll()

    dispatch(startGame())
  }, [])

  const handleModalStart = useCallback(() => {
    modals.open({
      children: <GameStart start={handleStartGame} />,
      centered: true,
    })
  }, [])

  const handleFinishGame = useCallback(() => {
    dispatch(finishGame())

    modals.openContextModal({
      modal: 'gameOver',
      innerProps: { startGame: handleModalStart },
      centered: true,
    })
  }, [])

  const handleCollision = useCallback(() => {
    dispatch(increaseScore())
  }, [])

  useEffect(() => {
    if (gameStatus === GameStatus.Started) {
      const timer = setTimeout(() => {
        handleFinishGame()
      }, gameDuration)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [gameStatus])

  const content =
    gameStatus === GameStatus.Started ? (
      <>
        <FullScreenSwitcher />
        <Scene
          onCollision={handleCollision}
          rowsAndColumns={9}
          cellSize={65}
          erasers={10}
        />
      </>
    ) : (
      <GameInfo handleModalStart={handleModalStart} />
    )

  return (
    <ModalsProvider modals={{ gameOver: GameOver }}>
      <GameBoard>{content}</GameBoard>
    </ModalsProvider>
  )
}
