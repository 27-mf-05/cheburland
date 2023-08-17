import { createStyles } from '@mantine/core'

export const styles = createStyles(theme => ({
  gameItem: {
    backgroundColor: 'brand.2',
    '&:hover': {
      backgroundColor: theme.colors.brand[9],
    },
    '&[data-hovered]': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors[theme.primaryColor]
          : theme.colors.brand[2],
      color: theme.white,
      '&:hover': {
        backgroundColor: theme.colors.brand[9],
      },
    },
  },
  otherItem: {
    backgroundColor: theme.colors.brand[3],
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.brand[7]
          : theme.colors.brand[7],
    },
    '&[data-hovered]': {
      backgroundColor: theme.colors.brand[3],
      color: theme.primaryColor,
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.brand[7]
            : theme.colors.brand[7],
      },
    },
  },
}))
