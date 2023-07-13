import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteName, routes } from '@/app/routes'
import { withAuth, withAuthProps } from '@/hocs'

const AuthenticatedLayoutComponent: FC<withAuthProps> = ({
  isAuthenticated,
}): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes[RouteName.Login].path)
    }
  }, [isAuthenticated])

  return <Outlet />
}

export const AuthenticatedLayout = withAuth(AuthenticatedLayoutComponent)
