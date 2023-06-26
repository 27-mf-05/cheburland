import { ReactNode, FC } from 'react'
import { Container, SimpleGrid } from '@mantine/core'

export const PageWrapper: FC<{
  children: ReactNode
  columns: number
}> = ({ children, columns }) => (
  <Container fluid p={0} m={0}>
    <SimpleGrid cols={columns} sx={{ gap: 'initial' }}>
      {children}
    </SimpleGrid>
  </Container>
)
