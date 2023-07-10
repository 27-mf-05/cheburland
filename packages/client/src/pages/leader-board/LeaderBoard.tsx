import { Flex, Paper, Title } from '@mantine/core'

import { LeaderBoardTable } from './components/leader-board-table/LeaderBoardTable'
import type { Leader } from './types'

const leaders: Leader[] = [
  { id: '1', rank: 1, avatar: null, name: 'Player 1', score: 1000 },
  { id: '2', rank: 2, avatar: null, name: 'Player 2', score: 800 },
  { id: '3', rank: 3, avatar: null, name: 'Player 3', score: 500 },
  { id: '4', rank: 4, avatar: null, name: 'Player 4', score: 300 },
]

export const LeaderBoard = (): JSX.Element => {
  return (
    <Flex id="leader-board" py={16} mih={50} justify="center" align="center">
      <Paper shadow="xs" p="md">
        <Title mb="xl" ta="center">
          Лидерборд
        </Title>
        <LeaderBoardTable leaders={leaders} />
      </Paper>
    </Flex>
  )
}
