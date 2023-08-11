import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { AppLayout } from '@/layout'

import { notAuthenticatedRoutes } from '../helper'
import { RouteConfig, RouteName } from '../types'

export const NotAuthenticatedRoutes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    {notAuthenticatedRoutes()?.map(
      ({ title, component: Element, path }: RouteConfig) => {
        return <Route key={title} element={<Element />} path={path} />
      }
    )}
    <Route key={-1} path="*" element={<Navigate to={RouteName.Login} />} />
  </Route>
)
