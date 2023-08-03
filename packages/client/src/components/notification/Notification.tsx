import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useAppSelector } from '@/hooks'
import { NotificationStatus } from '@/shared/types/notification'

export const NotificationComponent = () => {
  const { notificationStatus } = useAppSelector(state => state.notification)

  const [notificationClosed, setNotificationClosed] = useState(
    localStorage.getItem('notificationClosed') === 'true'
  )

  const handleNotificationClose = () => {
    setNotificationClosed(true)
    localStorage.setItem('notificationClosed', 'true')
  }

  useEffect(() => {
    if (
      notificationStatus !== NotificationStatus.GRANTED &&
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

    toast.onChange(e => {
      e.status === 'removed' ? handleNotificationClose() : {}
    })
  }, [notificationStatus, notificationClosed])

  return null
}
