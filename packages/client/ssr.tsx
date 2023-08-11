import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import {
  createStaticRouter,
  StaticRouterProvider as Router,
} from 'react-router-dom/server'

import { MantineProvider } from '@mantine/core'
import { createStaticHandler } from '@remix-run/router'
import type * as express from 'express'

import { AuthProvider } from '@/app/context'
import { store } from '@/app/redux'
import {
  AuthenticatedRoutes,
  NotAuthenticatedRoutes,
} from '@/app/routes/routes-wrapper'
import { theme } from '@/app/theme'

export const render = async (request: express.Request) => {
  console.log(request)
  const { query } = createStaticHandler(NotAuthenticatedRoutes)
  const remixRequest = createFetchRequest(request)
  const context = await query(remixRequest)

  if (context instanceof Response) {
    throw context
  }
  const router = createStaticRouter(AuthenticatedRoutes, context)

  // const router = createStaticRouter(NotAuthenticatedRoutes, context)

  return renderToString(
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <AuthProvider>
          <Router router={router} context={context} nonce="the-nonce" />
        </AuthProvider>
      </Provider>
    </MantineProvider>
  )
}

export const createFetchRequest = (req: express.Request): Request => {
  const origin = `${req.protocol}://${req.get('host')}`
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()

  req.on('close', () => {
    controller.abort()
  })

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}

export const createFetchHeaders = (
  requestHeaders: express.Request['headers']
): Headers => {
  const headers = new Headers()

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  return headers
}
