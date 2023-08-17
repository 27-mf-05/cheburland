import { useMemo } from 'react'

import { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

import { themeDark, themeLight } from '@/app/theme'

export const useTheme = () => {
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
  return {
    colorScheme,
    toggleColorScheme,
    theme,
  }
}
