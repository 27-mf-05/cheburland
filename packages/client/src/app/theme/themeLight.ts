import { MantineThemeOverride } from '@mantine/core'

export const themeLight: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    brand: [
      '#4C4B16',
      '#898121',
      '#E7B10A',
      '#F7F1E5',
      '#A4907C',
      '#B5C99A',
      '#862B0D',
      '#FFF9C9',
      '#FFC95F',
      '#F1C93B',
    ],
  },
  primaryColor: 'yellow',
  white: '#fff',
  black: '#000',
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Verdana, sans-serif', fontWeight: 500 },
  fontSizes: {
    xs: '0.6rem',
    sm: '0.75rem',
    md: '0.9rem',
    lg: '1rem',
    xl: '1.2rem',
  },
  components: {
    Button: {
      styles: {
        label: {
          fontSize: '0.9rem',
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          padding: 0,
        },
      },
    },
    ColorSchemeProvider: {
      styles: {
        main: {
          padding: 0,
        },
      },
    },
  },
}
