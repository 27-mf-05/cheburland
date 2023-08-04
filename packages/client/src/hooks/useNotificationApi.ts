import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useAppSelector } from '@/hooks/useAppSelector'
import { GameStatus } from '@/shared'
import { NotificationStatus } from '@/shared/types/notification'

export const useNotificationApi = (gameScore: number) => {
  const [notificationStatus, setNotificationStatus] = useState('')
  const [notificationClosed, setNotificationClosed] = useState(
    localStorage.getItem('notificationClosed') === 'true'
  )
  const { status: gameStatus } = useAppSelector(({ game }) => game)

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(
        (res: NotificationPermission): void => {
          // Обновить условие, после добавления функционала с рекордом
          if (res === 'granted' && gameStatus === GameStatus.Finished) {
            setNotificationStatus(NotificationStatus.GRANTED)
            notifyUser(gameScore)
          } else if (res === 'denied') {
            setNotificationStatus(NotificationStatus.DENIED)
          } else if (res === 'default') {
            localStorage.setItem('notificationClosed', 'false')
            setNotificationStatus(NotificationStatus.DEFAULT)
          }
        }
      )
    }
  }, [gameScore, gameStatus])

  useEffect(() => {
    if (
      notificationStatus === NotificationStatus.DEFAULT &&
      !notificationClosed
    ) {
      toast.warn('Включите уведомления, чтобы получить информацию об игре!', {
        position: 'top-right',
        autoClose: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }, [notificationClosed, notificationStatus])

  const handleNotificationClose = () => {
    setNotificationClosed(true)
    localStorage.setItem('notificationClosed', 'true')
  }

  toast.onChange(e => {
    e.status === 'removed' ? handleNotificationClose() : {}
  })

  const notifyUser = (score: number) => {
    const notification = new Notification('Поздравляем!', {
      body: `Ваш новый рекорд - ${score}`,
      icon: '/cheburashka.png',
    })

    setTimeout(() => {
      notification.close()
    }, 3000)
  }
}
