import { useCallback } from 'react'

import { modals, ModalsProvider } from '@mantine/modals'

import { gameActions } from '@/app/redux/store/reducers'
import { GameOver } from '@/features/gameOver'
import { GameStart } from '@/features/gameStart'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { GameStatus } from '@/shared'

import { GameBoard, GameRules } from './components'

export const Game = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { startGame, finishGame, increaseScore } = gameActions
  const { status: gameStatus } = useAppSelector(({ game }) => game)

  const handleStartGame = useCallback(() => {
    modals.closeAll()

    dispatch(startGame())
  }, [])

  const handleOpenGameStartModal = useCallback(() => {
    modals.open({
      children: <GameStart onCountdownEnd={handleStartGame} />,
      centered: true,
    })
  }, [])

  const handleFinishGame = useCallback(() => {
    dispatch(finishGame())

    modals.openContextModal({
      modal: 'gameOver',
      innerProps: { onOpenGameStartModal: handleOpenGameStartModal },
      centered: true,
    })
  }, [])

  const handleIncreaseScore = useCallback(() => {
    dispatch(increaseScore())
  }, [])

  return (
    <ModalsProvider modals={{ gameOver: GameOver }}>
      {gameStatus === GameStatus.Started ? (
        <GameBoard
          onFinishGame={handleFinishGame}
          onIncreaseScore={handleIncreaseScore}
        />
      ) : (
        <GameRules onOpenGameStartModal={handleOpenGameStartModal} />
      )}
    </ModalsProvider>
  )
}
