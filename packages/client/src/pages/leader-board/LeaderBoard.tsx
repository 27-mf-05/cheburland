import { useCallback, useEffect, useState } from 'react'

import { Flex, Paper, Title } from '@mantine/core'

import { useLeaderboard } from '@/hooks'
import { Leader } from '@/shared'

import { LeaderBoardTable } from './components/leader-board-table/LeaderBoardTable'

export const LeaderBoard = (): JSX.Element => {
  const { handleGetAllLeaderboard } = useLeaderboard()
  const [leaders, setLeaders] = useState<Leader[]>()

  const handleGetLeaderboard = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leaderboard: any = await handleGetAllLeaderboard()
    setLeaders(leaderboard)
  }, [handleGetAllLeaderboard])

  useEffect(() => {
    handleGetLeaderboard()
  }, [handleGetLeaderboard])

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
