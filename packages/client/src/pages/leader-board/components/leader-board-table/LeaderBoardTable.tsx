import type { FC } from 'react'

import { Avatar } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

import type { Leader } from '../../types'

type LeaderBoardTableProps = {
  leaders: Leader[]
}

export const LeaderBoardTable: FC<LeaderBoardTableProps> = ({
  leaders,
}): JSX.Element => {
  return (
    <DataTable
      striped
      records={leaders}
      columns={[
        { accessor: 'rank', title: '№', width: '1%' },
        {
          accessor: 'avatar',
          title: '',
          width: '1%',
          render: ({ avatar, name }) => (
            <Avatar src={avatar} alt={name} radius="xl" size="lg" />
          ),
        },
        { accessor: 'name', title: 'Имя' },
        { accessor: 'score', title: 'Счет' },
      ]}
    />
  )
}
