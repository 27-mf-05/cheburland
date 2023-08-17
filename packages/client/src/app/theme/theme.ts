import { MantineThemeOverride } from '@mantine/core'

const commonStyles: MantineThemeOverride = {
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

export const themeLight: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'yellow',
  ...commonStyles,
}

export const themeDark: MantineThemeOverride = {
  colorScheme: 'dark',
  primaryColor: 'orange',
  ...commonStyles,
}
