import { MantineProvider } from '@mantine/core'

import { AppRoutes } from '@/app/routes'
import { theme } from '@/app/theme'

const App = () => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <AppRoutes />
  </MantineProvider>
)

export default App
