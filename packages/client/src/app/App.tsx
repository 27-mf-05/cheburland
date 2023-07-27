import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'

import { AuthProvider } from '@/app/context'
import { setupStore } from '@/app/redux/store'
import { AppRoutes } from '@/app/routes'
import { theme } from '@/app/theme'

const store = setupStore()

const App = () => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </Provider>
  </MantineProvider>
)

export default App
