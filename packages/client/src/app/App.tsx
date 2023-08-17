import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'

import { AuthProvider } from '@/app/context'
import { setupStore } from '@/app/redux/store'
import { AppRoutes } from '@/app/routes'
import { ThemeSwitch } from '@/components/theme-switch'
import { useTheme } from '@/hooks'

const store = setupStore()

const App = () => {
  const { colorScheme, toggleColorScheme, theme } = useTheme()
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Provider store={store}>
          <Router>
            <ThemeSwitch />
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </Router>
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
