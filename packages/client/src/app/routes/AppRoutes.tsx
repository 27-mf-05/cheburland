import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import {
  AppLayout,
  AuthenticatedLayout,
  NotAuthenticatedLayout,
} from '@/layout'

import { authenticatedRoutes, notAuthenticatedRoutes } from './helper'
import { RouteConfig, RouteName } from './types'

export const appRoutes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route element={<AuthenticatedLayout />}>
      {authenticatedRoutes()?.map(
        ({ title, component: Element, path }: RouteConfig) => (
          <Route key={title} element={<Element />} path={path} />
        )
      )}
      <Route key={-1} path="*" element={<Navigate to={RouteName.Main} />} />
    </Route>
    <Route element={<NotAuthenticatedLayout />}>
      {notAuthenticatedRoutes()?.map(
        ({ title, component: Element, path }: RouteConfig) => {
          return <Route key={title} element={<Element />} path={path} />
        }
      )}
      <Route key={-1} path="*" element={<Navigate to={RouteName.Login} />} />
    </Route>
  </Route>
)
