import { useCallback, useEffect } from 'react'

import { modals, ModalsProvider } from '@mantine/modals'

import {
  NotificationProvider,
  useNotificationContext,
} from '@/app/context/notification-provider'
import { gameActions } from '@/app/redux/store/reducers'
import { FullScreenSwitcher } from '@/components'
import { NotificationComponent } from '@/components/notification'
import { Scene } from '@/core'
import { GameOver, GameStart } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useNotificationApi } from '@/hooks/useNotificationApi'
import { GAME_DURATION, GameStatus } from '@/shared'

import { GameInfo, GameWrapper } from './components'

export const Game = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { startGame, finishGame, increaseScore } = gameActions
  const { status: gameStatus } = useAppSelector(({ game }) => game)
  const { score: gameScore } = useAppSelector(({ game }) => game)

  const { notificationStatus } = useNotificationContext()
  const { notifyUser } = useNotificationApi()

  useEffect(() => {
    console.log(notificationStatus, gameStatus === GameStatus.Finished)

    if (notificationStatus && gameStatus === GameStatus.Finished) {
      notifyUser(gameScore)
    }
  }, [gameScore, gameStatus, notificationStatus, notifyUser])

  console.log(gameScore, gameStatus)

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
      }, GAME_DURATION)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [gameStatus, handleFinishGame])

  const content =
    gameStatus === GameStatus.Started ? (
      <>
        <FullScreenSwitcher />
        <Scene onIncreaseScore={handleIncreaseScore} />
      </>
    ) : (
      <>
        <NotificationComponent />
        <GameInfo onModalStart={handleModalStart} />
      </>
    )

  return (
    <ModalsProvider modals={{ gameOver: GameOver }}>
      <GameWrapper>{content}</GameWrapper>
    </ModalsProvider>
  )
}
