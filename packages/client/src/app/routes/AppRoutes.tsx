import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  AppLayout,
  AuthenticatedLayout,
  NotAuthenticatedLayout,
} from '@/layout'
import { RouteConfig } from './types'
import {
  authenticatedRoutes,
  commonRoutes,
  notAuthenticatedRoutes,
} from './helper'
import { routes } from './routes'

export const AppRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route element={<AuthenticatedLayout />}>
            {authenticatedRoutes(routes).map(
              ({ title, component: Element, path }: RouteConfig) => (
                <Route key={title} element={<Element />} path={path} />
              )
            )}
          </Route>
          <Route element={<NotAuthenticatedLayout />}>
            {notAuthenticatedRoutes(routes).map(
              ({ title, component: Element, path }: RouteConfig) => {
                return <Route key={title} element={<Element />} path={path} />
              }
            )}
          </Route>
          {commonRoutes(routes).map(
            ({ title, component: Element, path }: RouteConfig) => (
              <Route key={title} element={<Element />} path={path} />
            )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
