import { MantineProvider } from '@mantine/core'
import { AppRoutes } from '@/app/routes'

const App = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <AppRoutes />
  </MantineProvider>
)

export default App
