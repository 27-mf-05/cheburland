import type { FC } from 'react'

import { Avatar } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

import type { Leader } from './types'

type LeaderBoardTableProps = {
  data: Leader[]
}

export const LeaderBoardTable: FC<LeaderBoardTableProps> = ({
  data,
}): JSX.Element => {
  return (
    <DataTable
      striped
      records={data}
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
