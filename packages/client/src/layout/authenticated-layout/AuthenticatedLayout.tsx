import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteName, routes } from '@/app/routes'
import { withAuth, withAuthProps } from '@/hocs'
import { useAppSelector } from '@/hooks/useAppSelector'

const AuthenticatedLayoutComponent: FC<withAuthProps> = ({
  isAuthenticated,
}): JSX.Element => {
  const navigate = useNavigate()

  const user = useAppSelector(state => state.user.currentUser)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes[RouteName.Login].path)
    }
  }, [isAuthenticated])

  return <>{user && <Outlet />}</>
}

export const AuthenticatedLayout = withAuth(AuthenticatedLayoutComponent)
