import { Provider } from 'react-redux'

import { MantineProvider } from '@mantine/core'

import { AuthContextProvider } from '@/app/context/AuthContextProvider'
import { setupStore } from '@/app/redux/store'
import { AppRoutes } from '@/app/routes'
import { theme } from '@/app/theme'

import QueryClientProvider from './api/QueryClientProvider'

const store = setupStore()

const App = () => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <QueryClientProvider>
      <Provider store={store}>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </Provider>
    </QueryClientProvider>
  </MantineProvider>
)

export default App
