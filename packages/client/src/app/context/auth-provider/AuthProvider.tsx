import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { addUser, deleteUser, useGetCurrentUserQuery } from '@/app/redux'
import { RouteName } from '@/app/routes'
import { useAppDispatch, useOAuth, useRoutes } from '@/hooks'
import { User } from '@/shared'

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
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Initializing)
  const { handleOAuthSignin } = useOAuth()
  // const navigate = useNavigate()
  // const { paths } = useRoutes()

  // const [searchParams] = useSearchParams()
  // const code = searchParams.get('code')

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
  const { refetch } = useGetCurrentUserQuery()

  const fetchUser = async () => {
    const { data, isError } = await refetch()

    if (!isError) {
      dispatch(addUser(data as User))
      login()
    } else {
      dispatch(deleteUser())
      logout()
    }
  }

  // const auth = async () => {
  //   if (code) {
  //     await handleOAuthSignin(code)
  //     navigate(paths.Main)
  //   }
  //   await fetchUser()
  // }

  const auth = async () => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      handleOAuthSignin(code)
    }
    await fetchUser()
  }

  useEffect(() => {
    setInitializing()
    auth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
