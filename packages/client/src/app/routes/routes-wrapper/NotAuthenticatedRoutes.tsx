import { Navigate, Route, Routes } from 'react-router-dom'

import { useRoutes } from '@/hooks'
import { AppLayout } from '@/layout'

import { notAuthenticatedRoutes } from '../helper'
import { RouteConfig } from '../types'

export function NotAuthenticatedRoutes(): JSX.Element {
  const { paths } = useRoutes()

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {notAuthenticatedRoutes().map(
          ({ title, component: Element, path }: RouteConfig) => {
            return <Route key={title} element={<Element />} path={path} />
          }
        )}
        <Route key={-1} path="*" element={<Navigate to={paths.Login} />} />
      </Route>
    </Routes>
  )
}
