import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/app/App'
import { startApp } from '@/app/orm'

import AppServiceWorker from './AppServiceWorker'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

AppServiceWorker.unregister()

startApp()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
