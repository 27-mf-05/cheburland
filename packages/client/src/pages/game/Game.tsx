import { useCallback, useEffect } from 'react'

import { modals, ModalsProvider } from '@mantine/modals'

import { gameActions } from '@/app/redux/store/reducers'
import { FullScreenSwitcher } from '@/components'
import { Scene } from '@/core'
import { GameOver, GameStart } from '@/features'
import { useAppDispatch, useAppSelector, useLeaderboard } from '@/hooks'
import { GAME_DURATION, GameStatus } from '@/shared'

import { GameInfo, GameWrapper } from './components'

export const Game = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { handleAddUserToLeaderboard } = useLeaderboard()
  const { startGame, finishGame, increaseScore } = gameActions
  const { status: gameStatus } = useAppSelector(({ game }) => game)
  const { score: gameScore } = useAppSelector(({ game }) => game)
  const user = useAppSelector(state => state.user.currentUser)

  const handleStartGame = useCallback(() => {
    modals.closeAll()

    dispatch(startGame())
  }, [dispatch, startGame])

  const handleModalStart = useCallback(() => {
    modals.open({
      children: <GameStart onStart={handleStartGame} />,
      centered: true,
    })
  }, [handleStartGame])

  const handleFinishGame = useCallback(() => {
    dispatch(finishGame())

    modals.openContextModal({
      modal: 'gameOver',
      innerProps: { startGame: handleModalStart },
      centered: true,
    })
  }, [dispatch, finishGame, handleModalStart])

  const handleIncreaseScore = useCallback(() => {
    dispatch(increaseScore())
  }, [dispatch, increaseScore])

  useEffect(() => {
    if (gameStatus === GameStatus.Started) {
      const timer = setTimeout(() => {
        handleFinishGame()

        const userName = `${user?.first_name} ${user?.second_name}`
        handleAddUserToLeaderboard({
          id: user?.id,
          gameEndDate: new Date().valueOf(),
          scoreCheburland: gameScore,
          userName,
          avatar: user?.avatar,
        })
      }, GAME_DURATION)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [gameStatus, handleFinishGame, gameScore])

  const content =
    gameStatus === GameStatus.Started ? (
      <>
        <FullScreenSwitcher />
        <Scene onIncreaseScore={handleIncreaseScore} />
      </>
    ) : (
      <GameInfo onModalStart={handleModalStart} />
    )

  return (
    <ModalsProvider modals={{ gameOver: GameOver }}>
      <GameWrapper>{content}</GameWrapper>
    </ModalsProvider>
  )
}
