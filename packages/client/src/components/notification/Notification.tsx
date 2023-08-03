import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useNotificationContext } from '@/app/context/notification-provider'
import { NotificationStatus } from '@/shared/types/notification'

export const NotificationComponent = () => {
  const { notificationStatus } = useNotificationContext()

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

    if (notificationStatus === NotificationStatus.GRANTED) {
      localStorage.setItem('notificationClosed', 'false')
    }
  }, [notificationStatus, notificationClosed])

  return null
}
