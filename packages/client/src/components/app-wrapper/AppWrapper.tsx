import { FC, ReactNode } from 'react'

import { Container, SimpleGrid } from '@mantine/core'

export const AppWrapper: FC<{
  children: ReactNode
  columns: number
}> = ({ children, columns }) => (
  <Container
    fluid
    h="100vh"
    px={0}
    sx={theme => ({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    })}>
    <SimpleGrid cols={columns} sx={{ gap: 'initial' }}>
      {children}
    </SimpleGrid>
  </Container>
)
