import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'

import AuthService from '@/app/api/services/auth.service'

interface AuthContextProps {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  fetchUser: () => void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  }
  const logout = () => {
    setIsAuthenticated(false)
  }

  const fetchUser = async () => {
    try {
      await AuthService.getUser()
      login()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}
