import { generatePath, Params } from 'react-router-dom'

import { routes } from './routes'
import { PageType, RouteName } from './types'

export const commonRoutes = () =>
  Object.values(routes).filter(route => route.type === PageType.common)

export const authenticatedRoutes = () =>
  Object.values(routes).filter(route => route.type === PageType.authenticated)

export const notAuthenticatedRoutes = () =>
  Object.values(routes).filter(
    route => route.type === PageType.notAuthenticated
  )

export const generateRoutePath = ({
  name,
  params,
}: {
  name: RouteName
  params?: Params<string>
}): string => {
  const route = routes[name]
  return generatePath(route.path, params)
}
