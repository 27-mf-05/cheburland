import { ReactNode } from 'react'
import {
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { useRoutes } from '@/hooks'
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
