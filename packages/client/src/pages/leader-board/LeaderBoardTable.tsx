import type { FC } from 'react'

import { Avatar, Button, Table } from '@mantine/core'

import type { Leader, SortConfig } from './types'

type LeaderBoardTableProps = {
  data: Leader[]
  sortConfig: SortConfig
  handleSort: (column: string) => void
}

// Функция для определения цвета кнопки
const getButtonColor = (column: string, sortConfig: SortConfig) => {
  return sortConfig.column === column ? 'brand.2' : 'brand.1'
}

// Функция для определения символа сортировки
const getSortSymbol = (column: string, sortConfig: SortConfig) => {
  if (sortConfig.column === column) {
    return sortConfig.direction === 'asc' ? '▲' : '▼'
  }

  return ''
}

export const LeaderBoardTable: FC<LeaderBoardTableProps> = ({
  data,
  sortConfig,
  handleSort,
}): JSX.Element => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th style={{ width: '1%' }}>
            <Button
              variant="subtle"
              color={getButtonColor('rank', sortConfig)}
              onClick={() => handleSort('rank')}
              compact
              uppercase>
              № {getSortSymbol('rank', sortConfig)}
            </Button>
          </th>
          <th style={{ width: '1%' }}></th>
          <th>
            <Button
              variant="subtle"
              color={getButtonColor('name', sortConfig)}
              onClick={() => handleSort('name')}
              compact
              uppercase>
              Имя {getSortSymbol('name', sortConfig)}
            </Button>
          </th>
          <th>
            <Button
              variant="subtle"
              color={getButtonColor('score', sortConfig)}
              onClick={() => handleSort('score')}
              compact
              uppercase>
              Счет {getSortSymbol('score', sortConfig)}
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ rank, avatar, name, score }) => (
          <tr key={rank}>
            <td>{rank}</td>
            <td>{<Avatar src={avatar} alt={name} radius="xl" size="lg" />}</td>
            <td>{name}</td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
