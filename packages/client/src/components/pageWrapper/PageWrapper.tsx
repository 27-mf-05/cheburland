import { FC, ReactNode } from 'react'

import { Container, SimpleGrid } from '@mantine/core'

import { GameOverScreenModal } from '@/components'

export const PageWrapper: FC<{
  children: ReactNode
  columns: number
}> = ({ children, columns }) => (
  <Container
    fluid
    py={16}
    sx={theme => ({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    })}>
    <GameOverScreenModal isOpenned={true}></GameOverScreenModal>
    <SimpleGrid cols={columns} sx={{ gap: 'initial' }}>
      {children}
    </SimpleGrid>
  </Container>
)
