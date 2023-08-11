import { ReactNode } from 'react'
import {
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AppLayout } from '@/layout'

import { authenticatedRoutes } from '../helper'
import { RouteConfig, RouteName } from '../types'

export const AuthenticatedRoutes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    {authenticatedRoutes()?.map(
      ({ title, component: Element, path }: RouteConfig) => (
        <Route key={title} element={<Element />} path={path} />
      )
    )}
    <Route key={-1} path="*" element={<Navigate to={RouteName.Main} />} />
  </Route>
)
