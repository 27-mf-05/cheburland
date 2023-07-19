import { Provider } from 'react-redux'

import { MantineProvider } from '@mantine/core'

import { AuthProvider } from '@/app/context'
import { setupStore } from '@/app/redux/store'
import { AppRoutes } from '@/app/routes'
import { theme } from '@/app/theme'

const store = setupStore()

const App = () => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  </MantineProvider>
)

export default App
