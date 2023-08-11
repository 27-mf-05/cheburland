import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Center, Loader, MantineProvider } from '@mantine/core'

import { AuthProvider, useAuth } from '@/app/context'
import { store } from '@/app/redux/store'
import { theme } from '@/app/theme'

import {
  AuthenticatedRoutes,
  NotAuthenticatedRoutes,
} from './routes/routes-wrapper'

const App = () => {
  // const { authenticated, initializing } = useAuth()
  const initializing = false
  const authenticated = true

  if (initializing) {
    return (
      <Center sx={{ width: '100vw', height: '100vh' }}>
        <Loader size="lg" variant="bars" />
      </Center>
    )
  }
  const routes = authenticated ? AuthenticatedRoutes : NotAuthenticatedRoutes
  // const routes = NotAuthenticatedRoutes

  const router = createBrowserRouter(routes)

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </MantineProvider>
  )
}

export default App
