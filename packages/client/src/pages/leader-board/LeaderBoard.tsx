import { Container, Flex, Title } from '@mantine/core'

import { BackButton } from '@/components/back-button'

import { LeaderBoardTable } from './LeaderBoardTable'
import type { Leader } from './types'

const leaders: Leader[] = [
  { id: '1', rank: 1, avatar: null, name: 'Player 1', score: 1000 },
  { id: '2', rank: 2, avatar: null, name: 'Player 2', score: 800 },
  { id: '3', rank: 3, avatar: null, name: 'Player 3', score: 500 },
  { id: '4', rank: 4, avatar: null, name: 'Player 4', score: 300 },
]

export const LeaderBoard = (): JSX.Element => {
  return (
    <Container size="xl">
      <Title mb="xl" ta="center">
        Лидерборд
      </Title>
      <Flex mb="xl">
        <BackButton />
      </Flex>
      <LeaderBoardTable leaders={leaders} />
    </Container>
  )
}
