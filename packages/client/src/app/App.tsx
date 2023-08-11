import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'

import { store } from '@/app/redux/store'
import { theme } from '@/app/theme'

import { appRoutes } from './routes'

const App = () => {
  const router = createBrowserRouter(appRoutes)

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  )
}

export default App
