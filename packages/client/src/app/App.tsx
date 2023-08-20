import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'

import { createStore } from '@/app/redux/store'
import { theme } from '@/app/theme'

import { appRoutes } from './routes'

const App = () => {
  const router = createBrowserRouter(appRoutes)

  const store = createStore()

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  )
}

export default App
