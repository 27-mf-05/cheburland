import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteName, routes } from '@/app/routes'
import { withAuth, withAuthProps } from '@/hocs'

const NotAuthenticatedLayoutComponent: FC<withAuthProps> = ({
  isAuthenticated,
}): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes[RouteName.Main].path)
    }
  }, [isAuthenticated])

  return <Outlet />
}

export const NotAuthenticatedLayout = withAuth(NotAuthenticatedLayoutComponent)
