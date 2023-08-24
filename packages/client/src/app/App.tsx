import { Provider } from 'react-redux'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import { MantineProvider } from '@mantine/core'

import { UserService } from '@/app/redux/api/userService'
import { createStore } from '@/app/redux/store'
import { theme } from '@/app/theme'

import { YandexAPIRepository } from '../repository/YandexAPIRepository'
import { appRoutes } from './routes'

const App = () => {
  const router = createBrowserRouter(appRoutes)

  const initialState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__

  const store = createStore(
    new UserService(new YandexAPIRepository()),
    initialState
  )

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <BrowserRouter>
          <RouterProvider router={router} />
        </BrowserRouter>
      </Provider>
    </MantineProvider>
  )
}

export default App
