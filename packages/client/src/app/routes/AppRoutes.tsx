import { Center, Loader } from '@mantine/core'

import { useAuth } from '@/app/context'

import { AuthenticatedRoutes } from './routes-wrapper'
import { NotAuthenticatedRoutes } from './routes-wrapper'

export const AppRoutes = (): JSX.Element => {
  const { authenticated, initializing } = useAuth()

  if (initializing) {
    return (
      <Center sx={{ width: '100vw', height: '100vh' }}>
        <Loader size="lg" variant="bars" />
      </Center>
    )
  }

  const RouteComponent = authenticated
    ? AuthenticatedRoutes
    : NotAuthenticatedRoutes

  return <RouteComponent />
}
