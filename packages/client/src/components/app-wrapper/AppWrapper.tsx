import { FC, ReactNode } from 'react'

import { AppShell, Container } from '@mantine/core'

export const AppWrapper: FC<{
  children: ReactNode
}> = ({ children }) => (
  <Container
    fluid
    h="100%"
    px={0}
    sx={theme => ({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    })}>
    <AppShell>{children}</AppShell>
  </Container>
)
