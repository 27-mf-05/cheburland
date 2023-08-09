import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

import { AuthProvider } from '@/app/context'
import { setupStore } from '@/app/redux/store'
import { AppRoutes } from '@/app/routes'
import { themeDark, themeLight } from '@/app/theme'
import { ThemeSwitch } from '@/components/theme-switch'

const store = setupStore()

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const theme = useMemo(() => {
    if (colorScheme === 'light') {
      return themeLight
    }

    if (colorScheme === 'dark') {
      return themeDark
    }

    return themeLight
  }, [colorScheme])

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
