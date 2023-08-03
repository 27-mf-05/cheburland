import { useState } from 'react'

import { NotificationStatus } from '@/shared/types/notification'

export const useNotificationApi = () => {
  const [notificationStatus, setNotificationStatus] = useState('granted')
  const notifyUser = (score: number) => {
    const notification = new Notification('Поздравляем!', {
      body: `Ваш новый рекорд - ${score}`,
      icon: '/cheburashka.png',
    })

    setTimeout(() => {
      notification.close()
    }, 3000)
  }

  const getPermission = (): string => {
    if ('Notification' in window) {
      Notification.requestPermission().then(
        (res: NotificationPermission): void => {
          // Обновить условие, после добавления функционала с рекордом
          if (res === 'granted') {
            setNotificationStatus(NotificationStatus.GRANTED)
          } else if (res === 'denied') {
            setNotificationStatus(NotificationStatus.DENIED)
          } else if (res === 'default') {
            setNotificationStatus(NotificationStatus.DEFAULT)
          }
        }
      )
    } else {
      setNotificationStatus(NotificationStatus.INVALID)
    }
    return notificationStatus
  }

  return {
    getPermission: getPermission,
    notifyUser: notifyUser,
  }
}
