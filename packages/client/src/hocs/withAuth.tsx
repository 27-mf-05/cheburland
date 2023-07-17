import { FC, useContext } from 'react'

import { AuthContext } from '@/app/context/AuthContextProvider'

export type withAuthProps = {
  isAuthenticated?: boolean
  login?: () => void
  logout?: () => void
}

export function withAuth<T>(Component: FC<T>): FC<T> {
  return function WithAuth(props: T) {
    const { isAuthenticated, login, logout } = useContext(AuthContext)

    return (
      <Component
        {...props}
        isAuthenticated={isAuthenticated}
        login={login}
        logout={logout}
      />
    )
  }
}
