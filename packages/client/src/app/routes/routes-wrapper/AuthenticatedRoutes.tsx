import { Navigate, Route, Routes } from 'react-router-dom'

import { useRoutes } from '@/hooks'
import { AppLayout } from '@/layout'

import { authenticatedRoutes } from '../helper'
import { RouteConfig } from '../types'

export function AuthenticatedRoutes(): JSX.Element {
  const { paths } = useRoutes()
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {authenticatedRoutes().map(
          ({ title, component: Element, path }: RouteConfig) => (
            <Route key={title} element={<Element />} path={path} />
          )
        )}
        <Route key={-1} path="*" element={<Navigate to={paths.Main} />} />
      </Route>
    </Routes>
  )
}
