import { FC, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { AuthContext } from '@/app/context/AuthContextProvider'
import { RouteName, routes } from '@/app/routes'

export const NotAuthenticatedLayout: FC = (): JSX.Element => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes[RouteName.Main].path)
    }
  }, [isAuthenticated])

  return <Outlet />
}
