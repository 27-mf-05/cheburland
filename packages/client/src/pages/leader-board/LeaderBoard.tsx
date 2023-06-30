import { useCallback, useState } from 'react'

import { Container, Title } from '@mantine/core'

import { LeaderBoardTable } from './LeaderBoardTable'
import type { Leader, SortConfig } from './types'

export const LeaderBoard = (): JSX.Element => {
  const [leaders, setLeaders] = useState<Leader[]>([
    { rank: 1, avatar: null, name: 'Player 1', score: 1000 },
    { rank: 2, avatar: null, name: 'Player 2', score: 800 },
    { rank: 3, avatar: null, name: 'Player 3', score: 500 },
    { rank: 4, avatar: null, name: 'Player 4', score: 300 },
  ])

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: 'asc',
  })

  const handleSort = useCallback(
    (column: string) => {
      let direction: 'asc' | 'desc' = 'asc'

      if (sortConfig.column === column && sortConfig.direction === 'asc') {
        direction = 'desc'
      }

      const sortedLeaders = [...leaders].sort((a, b) => {
        const valueA = a[column as keyof Leader]
        const valueB = b[column as keyof Leader]

        if (valueA === null) {
          return direction === 'asc' ? 1 : -1
        }

        if (valueB === null) {
          return direction === 'asc' ? -1 : 1
        }

        if (valueA < valueB) {
          return direction === 'asc' ? -1 : 1
        }

        if (valueA > valueB) {
          return direction === 'asc' ? 1 : -1
        }

        return 0
      })

      setLeaders(sortedLeaders)
      setSortConfig({ column, direction })
    },
    [leaders, sortConfig]
  )

  return (
    <Container size="xl">
      <Title mb="xl">Лидерборд</Title>
      <LeaderBoardTable
        data={leaders}
        sortConfig={sortConfig}
        handleSort={handleSort}
      />
    </Container>
  )
}
