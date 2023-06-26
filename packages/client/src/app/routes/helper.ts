import { PageType, RoutesType } from './types'

export const commonRoutes = (routes: RoutesType) =>
  Object.values(routes).filter(route => route.type === PageType.common)

export const authenticatedRoutes = (routes: RoutesType) =>
  Object.values(routes).filter(route => route.type === PageType.authenticated)

export const notAuthenticatedRoutes = (routes: RoutesType) =>
  Object.values(routes).filter(
    route => route.type === PageType.notAuthenticated
  )
