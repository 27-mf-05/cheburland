import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { matchRoutes } from 'react-router-dom'

import App from '@/app/App'
import { appRoutes } from '@/app/routes'

// import App from './App'
import AppServiceWorker from './AppServiceWorker'
AppServiceWorker.unregister()

const root = document.getElementById('root') as HTMLElement

hydrate()

async function hydrate() {
  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(appRoutes, window.location)?.filter(
    m => m.route.lazy
  )

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async m => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const routeModule = await m.route.lazy!()
        Object.assign(m.route, { ...routeModule, lazy: undefined })
      })
    )
  }

  hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}