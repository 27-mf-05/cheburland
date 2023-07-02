import { MantineProvider } from '@mantine/core'

import { AppRoutes } from '@/app/routes'
import { theme } from '@/app/theme'

import QueryClientProvider from './api/QueryClientProvider'

const App = () => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <QueryClientProvider>
      <AppRoutes />
    </QueryClientProvider>
  </MantineProvider>
)

export default App
