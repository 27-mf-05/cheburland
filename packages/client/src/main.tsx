import React from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from '@/app/App'

// import App from './App'
import AppServiceWorker from './AppServiceWorker'
AppServiceWorker.unregister()

const root = document.getElementById('root') as HTMLElement

hydrateRoot(
  root,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
