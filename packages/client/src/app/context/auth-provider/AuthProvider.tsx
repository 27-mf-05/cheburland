import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import AuthService from '@/app/api/services/auth.service'
import { userActions } from '@/app/redux/store/reducers'
import { useAppDispatch } from '@/hooks/useAppDispatch'

interface AuthContextProps {
  initializing: boolean
  authenticated: boolean
  unauthenticated: boolean
  login: () => void
  logout: () => void
  fetchUser: () => void
  setInitializing: () => void
}

const AuthContext = createContext<AuthContextProps>({
  initializing: true,
  authenticated: false,
  unauthenticated: false,
  logout: () => null,
  login: () => null,
  fetchUser: () => null,
  setInitializing: () => null,
})

const { Provider } = AuthContext

interface AuthContextProviderProps {
  children: ReactNode
}

enum AuthStatus {
  Initializing = 'Initializing',
  Authenticated = 'Authenticated',
  Unauthenticated = 'Unauthenticated',
}

const AuthProvider: FC<AuthContextProviderProps> = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Initializing)

  const login = () => {
    setStatus(AuthStatus.Authenticated)
  }
  const logout = () => {
    setStatus(AuthStatus.Unauthenticated)
  }

  const setInitializing = (): void => {
    setStatus(AuthStatus.Initializing)
  }

  const inStatus = (s: AuthStatus): boolean => {
    return status === s
  }

  const dispatch = useAppDispatch()
  const { addUser, deleteUser } = userActions

  const fetchUser = async () => {
    try {
      const user = await AuthService.getUser()
      dispatch(addUser(user))
      login()
    } catch (e) {
      console.error(e)
      dispatch(deleteUser())
      logout()
    }
  }

  useEffect(() => {
    setInitializing()
    fetchUser()
  }, [])
  // console.log(isAuthenticated)

  const value: AuthContextProps = {
    initializing: inStatus(AuthStatus.Initializing),
    authenticated: inStatus(AuthStatus.Authenticated),
    unauthenticated: inStatus(AuthStatus.Unauthenticated),
    login,
    logout,
    fetchUser,
    setInitializing,
  }

  return <Provider value={value}>{children}</Provider>
}

const useAuth = (): AuthContextProps => {
  return useContext(AuthContext)
}

export { AuthProvider, AuthContext, useAuth }
