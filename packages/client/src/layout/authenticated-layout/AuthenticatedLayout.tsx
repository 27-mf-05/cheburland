import React, { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Center, Loader } from '@mantine/core'

import { useAuth } from '@/app/context'
import { RouteName } from '@/app/routes'

export const AuthenticatedLayout: FC = (): JSX.Element => {
  const { authenticated, initializing } = useAuth()
  const location = useLocation()
  if (initializing) {
    return (
      <Center sx={{ width: '100vw', height: '100vh' }}>
        <Loader size="lg" variant="bars" />
      </Center>
    )
  }
  if (!authenticated) {
    return <Navigate to={RouteName.Login} state={{ from: location }} replace />
  }

  return <Outlet />
}
