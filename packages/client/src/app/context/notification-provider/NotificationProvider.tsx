import React, { createContext, FC, ReactNode, useContext } from 'react'

import { useNotificationApi } from '@/hooks/useNotificationApi'

interface NotificationContextProviderProps {
  children: ReactNode
}

interface NotificationContextProps {
  notificationStatus: string | undefined
}

const NotificationContext = createContext<NotificationContextProps>({
  notificationStatus: undefined,
})

const { Provider } = NotificationContext
export const useNotificationContext = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider: FC<NotificationContextProviderProps> = ({
  children,
}) => {
  const { getPermission } = useNotificationApi()
  const notificationStatus = getPermission()

  const value: NotificationContextProps = {
    notificationStatus: notificationStatus,
  }

  return <Provider value={value}>{children}</Provider>
}
